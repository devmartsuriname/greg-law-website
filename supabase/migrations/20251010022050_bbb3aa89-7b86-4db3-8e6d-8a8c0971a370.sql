-- ============================================
-- VP Website Database Schema - Phase 0
-- ============================================

-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- 2. Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'viewer',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- 4. Create security definer function for role checking
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

-- 5. Create handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- 6. Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 7. Create pages table
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

CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_published ON public.pages(published);
CREATE INDEX idx_pages_sections ON public.pages USING gin(sections);

-- 8. Create news table
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

CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published ON public.news(published);
CREATE INDEX idx_news_featured ON public.news(featured);
CREATE INDEX idx_news_category ON public.news(category);
CREATE INDEX idx_news_published_at ON public.news(published_at DESC);

-- 9. Create projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  featured_image text,
  image_gallery text[],
  category text,
  status text DEFAULT 'active',
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date date,
  end_date date,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_published ON public.projects(published);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_category ON public.projects(category);

-- 10. Create speeches table
CREATE TABLE public.speeches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  date date NOT NULL,
  location text,
  youtube_url text,
  document_url text,
  category text,
  tags text[],
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_speeches_slug ON public.speeches(slug);
CREATE INDEX idx_speeches_published ON public.speeches(published);
CREATE INDEX idx_speeches_date ON public.speeches(date DESC);
CREATE INDEX idx_speeches_category ON public.speeches(category);

-- 11. Create quotes table
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

CREATE INDEX idx_quotes_published ON public.quotes(published);
CREATE INDEX idx_quotes_featured ON public.quotes(featured);
CREATE INDEX idx_quotes_display_order ON public.quotes(display_order);

-- 12. Create services table
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  category text,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_services_published ON public.services(published);
CREATE INDEX idx_services_featured ON public.services(featured);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_display_order ON public.services(display_order);

-- 13. Create events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  location text,
  category text,
  google_calendar_id text,
  visible boolean DEFAULT true,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_events_start_time ON public.events(start_time DESC);
CREATE INDEX idx_events_published ON public.events(published);
CREATE INDEX idx_events_visible ON public.events(visible);

-- 14. Create media table
CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  caption text,
  alt_text text,
  file_path text,
  file_url text,
  thumbnail_url text,
  type text NOT NULL CHECK (type IN ('image', 'video', 'youtube')),
  youtube_id text,
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

CREATE INDEX idx_media_type ON public.media(type);
CREATE INDEX idx_media_published ON public.media(published);
CREATE INDEX idx_media_category ON public.media(category);
CREATE INDEX idx_media_display_order ON public.media(display_order);

-- 15. Create appointments table
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
  notes text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX idx_appointments_preferred_date ON public.appointments(preferred_date);

-- 16. Create contact_submissions table
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

CREATE INDEX idx_contact_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_created_at ON public.contact_submissions(created_at DESC);

-- 17. Create audit_logs table
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_audit_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_action ON public.audit_logs(action);
CREATE INDEX idx_audit_table_name ON public.audit_logs(table_name);
CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at DESC);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role('admin'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.has_role('admin'));

-- User Roles RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role('admin'));

-- Pages RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage pages"
  ON public.pages FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- News RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news"
  ON public.news FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage news"
  ON public.news FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage projects"
  ON public.projects FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Speeches RLS
ALTER TABLE public.speeches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published speeches"
  ON public.speeches FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage speeches"
  ON public.speeches FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Quotes RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published quotes"
  ON public.quotes FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage quotes"
  ON public.quotes FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Services RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage services"
  ON public.services FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Events RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  USING (published = true AND visible = true);

CREATE POLICY "Editors can manage events"
  ON public.events FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Media RLS
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published media"
  ON public.media FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage media"
  ON public.media FOR ALL
  USING (public.has_role('editor') OR public.has_role('admin'));

-- Appointments RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can manage appointments"
  ON public.appointments FOR ALL
  USING (public.has_role('admin') OR public.has_role('editor') OR public.has_role('viewer'));

-- Contact Submissions RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can manage contact submissions"
  ON public.contact_submissions FOR ALL
  USING (public.has_role('admin') OR public.has_role('editor') OR public.has_role('viewer'));

-- Audit Logs RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.has_role('admin'));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create media-uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media-uploads', 'media-uploads', true);

-- Create documents bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- Media uploads storage policies
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

-- Documents storage policies
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

-- ============================================
-- SEED INITIAL DATA
-- ============================================

-- Seed pages (home, about, contact)
INSERT INTO public.pages (slug, title, sections, meta_title, meta_description, published)
VALUES 
  (
    'home',
    'Home',
    '[]'::jsonb,
    'Gregory Allan Rusland - Vice President of Suriname',
    'Official website of Gregory Allan Rusland, Vice President of the Republic of Suriname',
    true
  ),
  (
    'about',
    'About',
    '[]'::jsonb,
    'About Vice President Gregory Allan Rusland',
    'Learn about the life, career, and vision of Vice President Gregory Allan Rusland',
    true
  ),
  (
    'contact',
    'Contact',
    '[]'::jsonb,
    'Contact the Vice President Office',
    'Get in touch with the Office of the Vice President of Suriname',
    true
  );