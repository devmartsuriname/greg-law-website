# VP Website — Backend Documentation

**Version:** v1.1  
**Last Updated:** 2025-10-10 (Post-Auth Implementation)  
**Related PRD:** [PRD.md](./PRD.md) | [Architecture.md](./Architecture.md) | [Security.md](./Security.md)

---

## 📝 Table of Contents
1. [Database Schema](#1-database-schema)
2. [Authentication System](#2-authentication-system)
3. [RLS Policies](#3-row-level-security-rls)
4. [Edge Functions](#4-edge-functions)
5. [Storage Configuration](#5-storage-configuration)

---

## 2. Authentication System

### 2.1 Overview
The VP Website uses Supabase Authentication with email/password sign-up and login. Authentication is handled entirely by Supabase with custom triggers for profile creation.

### 2.2 Authentication Pages

#### Sign-Up (`/admin/sign-up`)
- **Location**: `src/admin/pages/auth/SignUp.tsx`
- **Template**: Darkone authentication design
- **Features**:
  - Email/password validation (Yup schema)
  - Password requirements: 8+ chars, uppercase, lowercase, numbers
  - Full name field (stored in user metadata)
  - Terms & Conditions checkbox
  - Error handling for duplicate emails, weak passwords
  - Success messages with auto-redirect
  - Auto-redirect if already authenticated

#### Login (`/admin/login`)
- **Location**: `src/admin/pages/Login.tsx`
- **Template**: Darkone authentication design
- **Features**:
  - Email/password authentication
  - "Remember me" checkbox
  - Error handling for invalid credentials
  - Role-based dashboard redirect
  - Links to sign-up and forgot password

#### Forgot Password (`/admin/forgot-password`)
- **Location**: `src/admin/pages/auth/ForgotPassword.tsx`
- **Template**: Darkone authentication design
- **Features**:
  - Email validation
  - Password reset email via Supabase
  - Success message with auto-redirect
  - Link back to login

### 2.3 Authentication Flow

```typescript
// Sign-Up
const { data, error } = await supabase.auth.signUp({
  email: values.email,
  password: values.password,
  options: {
    emailRedirectTo: `${window.location.origin}/admin/login`,
    data: {
      full_name: values.name,
    },
  },
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: values.email,
  password: values.password,
});

// Password Reset
const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
  redirectTo: `${window.location.origin}/admin/login`,
});
```

### 2.4 Session Management
- **Storage**: localStorage (Supabase default)
- **Persistence**: Enabled (`persistSession: true`)
- **Auto-Refresh**: Enabled (`autoRefreshToken: true`)
- **Location**: `src/integrations/supabase/client.ts`

```typescript
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
```

### 2.5 Auth Context Provider
- **Location**: `src/admin/hooks/useAuth.tsx`
- **Features**:
  - Manages user, session, and role state
  - Listens for auth state changes
  - Fetches user role from `user_roles` table
  - Provides `signIn`, `signOut`, `refreshRole` methods

```typescript
const { user, session, role, loading, signIn, signOut } = useAuth();
```

### 2.6 Protected Routes
- **Location**: `src/admin/components/ProtectedRoute.tsx`
- **Features**:
  - Redirects unauthenticated users to `/admin/login`
  - Enforces role-based access control
  - Shows loading spinner during auth check
  - Displays "Access Denied" for insufficient permissions

```typescript
<ProtectedRoute requiredRole="editor">
  <NewsForm />
</ProtectedRoute>
```

### 2.7 Role Assignment

**⚠️ CRITICAL: First Admin User**
New users have NO role by default. The first admin must be created manually:

```sql
-- After user signs up, get their UUID from Supabase Dashboard
-- Then run this SQL:
INSERT INTO public.user_roles (user_id, role)
VALUES ('[user-uuid-here]', 'admin'::app_role);
```

**Subsequent Role Assignments:**
Once an admin user exists, they can assign roles via the Users page in the admin panel.

---

## 1. Database Schema

### 1.1 Enums

```sql
-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');
```

---

### 1.2 Core Tables

#### user_roles

```sql
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'viewer',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- RLS Policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  USING (has_role('admin'));

CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);
```

#### profiles

```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Automatically create profile on user signup
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (has_role('admin'));
```

---

### 1.3 Content Tables

#### pages

```sql
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_published ON public.pages(published);
CREATE INDEX idx_pages_sections ON public.pages USING gin(sections);

-- RLS Policies
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage pages"
  ON public.pages FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### news

```sql
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  category text,
  tags text[],
  author_id uuid REFERENCES auth.users(id),
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published ON public.news(published);
CREATE INDEX idx_news_featured ON public.news(featured);
CREATE INDEX idx_news_category ON public.news(category);
CREATE INDEX idx_news_published_at ON public.news(published_at DESC);

-- RLS Policies
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news"
  ON public.news FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage news"
  ON public.news FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### projects

```sql
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  featured_image text,
  image_gallery text[],
  category text,
  status text DEFAULT 'active', -- active, completed, on-hold
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date date,
  end_date date,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_published ON public.projects(published);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_category ON public.projects(category);

-- RLS Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage projects"
  ON public.projects FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### speeches

```sql
CREATE TABLE public.speeches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  date date NOT NULL,
  location text,
  youtube_url text,
  document_url text, -- PDF or Word doc
  category text,
  tags text[],
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_speeches_slug ON public.speeches(slug);
CREATE INDEX idx_speeches_published ON public.speeches(published);
CREATE INDEX idx_speeches_date ON public.speeches(date DESC);
CREATE INDEX idx_speeches_category ON public.speeches(category);

-- RLS Policies
ALTER TABLE public.speeches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published speeches"
  ON public.speeches FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage speeches"
  ON public.speeches FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### quotes

```sql
CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_text text NOT NULL,
  author_name text NOT NULL DEFAULT 'Gregory Allan Rusland',
  author_title text DEFAULT 'Vice President of Suriname',
  context text,
  date_spoken date,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_quotes_published ON public.quotes(published);
CREATE INDEX idx_quotes_featured ON public.quotes(featured);
CREATE INDEX idx_quotes_display_order ON public.quotes(display_order);

-- RLS Policies
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published quotes"
  ON public.quotes FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage quotes"
  ON public.quotes FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### services

```sql
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text, -- Iconify icon name (e.g., 'mdi:account-group')
  category text,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_services_published ON public.services(published);
CREATE INDEX idx_services_featured ON public.services(featured);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_display_order ON public.services(display_order);

-- RLS Policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage services"
  ON public.services FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### events

```sql
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  location text,
  category text,
  google_calendar_id text, -- If synced from Google Calendar
  visible boolean DEFAULT true,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_events_start_time ON public.events(start_time DESC);
CREATE INDEX idx_events_published ON public.events(published);
CREATE INDEX idx_events_visible ON public.events(visible);

-- RLS Policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  USING (published = true AND visible = true);

CREATE POLICY "Editors can manage events"
  ON public.events FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

#### media

```sql
CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  caption text,
  alt_text text,
  file_path text, -- Supabase Storage path (for images)
  file_url text, -- Public URL
  thumbnail_url text,
  type text NOT NULL CHECK (type IN ('image', 'video', 'youtube')),
  youtube_id text, -- If type = 'youtube'
  youtube_title text,
  youtube_description text,
  youtube_thumbnail text,
  youtube_published_at timestamptz,
  category text,
  tags text[],
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_media_type ON public.media(type);
CREATE INDEX idx_media_published ON public.media(published);
CREATE INDEX idx_media_category ON public.media(category);
CREATE INDEX idx_media_display_order ON public.media(display_order);

-- RLS Policies
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published media"
  ON public.media FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage media"
  ON public.media FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

---

### 1.4 Engagement Tables

#### appointments

```sql
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  organization text,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  preferred_date date,
  preferred_time time,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes text, -- Admin notes
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX idx_appointments_preferred_date ON public.appointments(preferred_date);

-- RLS Policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Editors can view and manage appointments"
  ON public.appointments FOR ALL
  USING (has_role('editor') OR has_role('admin') OR has_role('viewer'));
```

#### contact_submissions

```sql
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  responded_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_contact_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_created_at ON public.contact_submissions(created_at DESC);

-- RLS Policies
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Editors can view and manage contact submissions"
  ON public.contact_submissions FOR ALL
  USING (has_role('editor') OR has_role('admin') OR has_role('viewer'));
```

---

### 1.5 Audit & System Tables

#### audit_logs

```sql
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL, -- 'create', 'update', 'delete', 'publish', 'unpublish', 'login', 'logout'
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_audit_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_action ON public.audit_logs(action);
CREATE INDEX idx_audit_table_name ON public.audit_logs(table_name);
CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at DESC);

-- RLS Policies
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (has_role('admin'));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);
```

---

## 2. Security Definer Functions

### has_role()

**Status:** ✅ Implemented

```sql
CREATE OR REPLACE FUNCTION public.has_role(required_role public.app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = required_role
  );
END;
$$;
```

**Purpose:** Security definer function that checks if the current user has a specific role. Uses `SET search_path = public` to prevent recursive RLS issues.

**Usage in RLS Policies:**
```sql
CREATE POLICY "Editors can manage news"
  ON public.news FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));
```

### log_audit()

```sql
CREATE OR REPLACE FUNCTION public.log_audit(
  p_action text,
  p_table_name text,
  p_record_id uuid,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address,
    user_agent
  )
  VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values,
    inet_client_addr(),
    current_setting('request.headers')::json->>'user-agent'
  );
END;
$$;
```

---

## 3. Storage Buckets

**Status:** ✅ Implemented

### media-uploads

**Purpose:** Store uploaded images, photos, and media files  
**Public:** Yes (read-only)  
**Size Limit:** 5MB per file

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media-uploads', 'media-uploads', true);

-- RLS Policies (✅ Implemented)
CREATE POLICY "Public can view uploaded media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media-uploads');

CREATE POLICY "Editors can upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media-uploads'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );

CREATE POLICY "Editors can update media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'media-uploads'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );

CREATE POLICY "Editors can delete media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'media-uploads'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );
```

### documents

**Purpose:** Store PDF files, Word documents, and other document types  
**Public:** Yes (read-only)  
**Size Limit:** 10MB per file

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- RLS Policies (same as media-uploads) - ✅ Implemented
CREATE POLICY "Public can view documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Editors can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );

CREATE POLICY "Editors can update documents"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'documents'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );

CREATE POLICY "Editors can delete documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents'
    AND (public.has_role('editor') OR public.has_role('admin'))
  );
```

---

## 4. Supabase Edge Functions

### youtube-sync

**Purpose:** Sync latest videos from VP's YouTube channel

**File:** `supabase/functions/youtube-sync/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  try {
    // Fetch latest videos from YouTube Data API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
    );
    
    const data = await response.json();
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Insert/update videos in media table
    for (const item of data.items) {
      const { id, snippet } = item;
      
      await supabase
        .from('media')
        .upsert({
          youtube_id: id.videoId,
          type: 'youtube',
          title: snippet.title,
          youtube_title: snippet.title,
          youtube_description: snippet.description,
          youtube_thumbnail: snippet.thumbnails.high.url,
          youtube_published_at: snippet.publishedAt,
          category: 'YouTube',
          published: true,
        }, {
          onConflict: 'youtube_id'
        });
    }
    
    return new Response(
      JSON.stringify({ success: true, count: data.items.length }),
      { headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

**Cron Trigger:** Daily at 6:00 AM

```sql
-- Schedule Edge Function to run daily
SELECT cron.schedule(
  'youtube-sync-daily',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url:='https://[PROJECT_REF].functions.supabase.co/youtube-sync',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer [SERVICE_ROLE_KEY]"}'::jsonb
  );
  $$
);
```

---

### calendar-sync

**Purpose:** Sync Google Calendar events

**File:** `supabase/functions/calendar-sync/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GOOGLE_CALENDAR_API_KEY = Deno.env.get('GOOGLE_CALENDAR_API_KEY');
const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  try {
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // Next 90 days
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
    );
    
    const data = await response.json();
    
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    for (const event of data.items) {
      await supabase
        .from('events')
        .upsert({
          google_calendar_id: event.id,
          title: event.summary,
          description: event.description,
          start_time: event.start.dateTime || event.start.date,
          end_time: event.end.dateTime || event.end.date,
          location: event.location,
          category: 'Official',
          visible: true,
          published: true,
        }, {
          onConflict: 'google_calendar_id'
        });
    }
    
    return new Response(
      JSON.stringify({ success: true, count: data.items.length }),
      { headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

**Cron Trigger:** Hourly

---

## 5. API Service Layer Examples

### News API Service

**File:** `src/admin/api/news.ts`

```typescript
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type News = Database['public']['Tables']['news']['Row'];
type NewsInsert = Database['public']['Tables']['news']['Insert'];
type NewsUpdate = Database['public']['Tables']['news']['Update'];

export const newsApi = {
  // Fetch all news (with pagination)
  async getAll(page = 1, limit = 10) {
    const { data, error, count } = await supabase
      .from('news')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    if (error) throw error;
    return { data, count };
  },

  // Fetch single news by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create news
  async create(news: NewsInsert) {
    const { data, error } = await supabase
      .from('news')
      .insert(news)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update news
  async update(id: string, news: NewsUpdate) {
    const { data, error } = await supabase
      .from('news')
      .update({ ...news, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete news
  async delete(id: string) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Upload featured image
  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media-uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media-uploads')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};
```

---

## 6. Database Migrations

All schema changes should be managed via Supabase migrations.

**Create migration:**
```bash
supabase migration new init_schema
```

**Apply migrations:**
```bash
supabase db push
```

**Migration file example:** `supabase/migrations/20250101000000_init_schema.sql`

```sql
-- Full schema from sections above
-- (Copy all CREATE TABLE, CREATE POLICY, etc. statements)
```

---

**Document Control:**  
**Author:** Development Team  
**Next Review:** After Phase 0 completion  
**Change Log:** Initial version — 2025-10-09
