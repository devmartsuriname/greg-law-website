# Backend Documentation

**Last Updated:** 2025-10-10  
**Version:** v1.0.0-phase2-5-stabilization

---

## 🏗️ Architecture Overview

This project uses **Supabase** as the backend platform, providing:
- PostgreSQL database with Row-Level Security (RLS)
- Authentication system
- File storage buckets
- Edge Functions (serverless)
- Real-time subscriptions

---

## 🗄️ Database Schema

### Core Tables

#### 1. **profiles**
Extends Supabase auth.users with additional user information.

**Columns:**
- `id` (uuid, PK) - References auth.users
- `full_name` (text)
- `email` (text)
- `phone` (text)
- `avatar_url` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Users can view/update their own profile
- Admins can view/update all profiles

---

#### 2. **user_roles**
Manages user permissions system.

**Columns:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → profiles)
- `role` (app_role enum: admin, editor, viewer)
- `created_at` (timestamp)
- `created_by` (uuid)

**RLS Policies:**
- Users can view their own role
- Admins can manage all roles

**Available Roles:**
- `admin` - Full system access
- `editor` - Content management access
- `viewer` - Read-only access

---

#### 3. **news**
News articles and blog posts.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `slug` (text, unique, required)
- `excerpt` (text)
- `content` (text, required)
- `featured_image` (text)
- `category` (text)
- `tags` (text[])
- `author_id` (uuid)
- `published` (boolean, default: false)
- `featured` (boolean, default: false)
- `published_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published news
- Editors/Admins can manage all news

---

#### 4. **projects**
Portfolio projects and initiatives.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `slug` (text, unique, required)
- `description` (text)
- `content` (text)
- `category` (text)
- `status` (text, default: 'active')
- `start_date` (date)
- `end_date` (date)
- `progress` (integer, 0-100)
- `featured_image` (text)
- `image_gallery` (text[])
- `featured` (boolean, default: false)
- `published` (boolean, default: false)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published projects
- Editors/Admins can manage all projects

**Features:**
- Image upload via `media-uploads` bucket
- Gallery support (multiple images)
- Progress tracking (percentage)
- Category filtering

---

#### 5. **speeches**
Speech library with PDFs and videos.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `slug` (text, unique, required)
- `description` (text)
- `content` (text)
- `location` (text)
- `date` (date, required)
- `category` (text)
- `tags` (text[])
- `youtube_url` (text)
- `document_url` (text)
- `featured` (boolean, default: false)
- `published` (boolean, default: false)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published speeches
- Editors/Admins can manage all speeches

**Features:**
- PDF upload via `documents` bucket
- YouTube video embedding
- Full-text search (title, description, content)
- Category and tag filtering

---

#### 6. **quotes**
Inspirational quotes and statements.

**Columns:**
- `id` (uuid, PK)
- `quote_text` (text, required)
- `author_name` (text, default: 'Gregory Allan Rusland')
- `author_title` (text, default: 'Vice President of Suriname')
- `context` (text)
- `date_spoken` (date)
- `featured` (boolean, default: false)
- `published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published quotes
- Editors/Admins can manage all quotes

---

#### 7. **services**
Services and responsibilities.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `description` (text)
- `icon` (text)
- `category` (text)
- `featured` (boolean, default: false)
- `published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published services
- Editors/Admins can manage all services

---

#### 8. **appointments**
Appointment booking requests.

**Columns:**
- `id` (uuid, PK)
- `full_name` (text, required)
- `email` (text, required)
- `phone` (text)
- `organization` (text)
- `subject` (text, required)
- `message` (text, required)
- `preferred_date` (date)
- `preferred_time` (time)
- `status` (text, default: 'pending')
- `notes` (text)
- `reviewed_by` (uuid)
- `reviewed_at` (timestamp)
- `ip_address` (inet)
- `user_agent` (text)
- `created_at` (timestamp)

**RLS Policies:**
- Anyone can create appointments
- Staff (admin/editor/viewer) can manage appointments

---

#### 9. **contact_submissions**
Contact form submissions.

**Columns:**
- `id` (uuid, PK)
- `name` (text, required)
- `email` (text, required)
- `phone` (text)
- `subject` (text)
- `message` (text, required)
- `status` (text, default: 'new')
- `responded_by` (uuid)
- `responded_at` (timestamp)
- `ip_address` (inet)
- `user_agent` (text)
- `created_at` (timestamp)

**RLS Policies:**
- Anyone can create submissions
- Staff can manage submissions

---

#### 10. **media**
Media library for images and videos.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `caption` (text)
- `alt_text` (text)
- `type` (text: image, video, document)
- `file_url` (text)
- `file_path` (text)
- `thumbnail_url` (text)
- `youtube_id` (text)
- `youtube_title` (text)
- `youtube_description` (text)
- `youtube_thumbnail` (text)
- `youtube_published_at` (timestamp)
- `category` (text)
- `tags` (text[])
- `published` (boolean, default: false)
- `featured` (boolean, default: false)
- `display_order` (integer, default: 0)
- `uploaded_by` (uuid)
- `uploaded_at` (timestamp)

**RLS Policies:**
- Public can view published media
- Editors/Admins can manage all media

---

#### 11. **events**
Calendar events and schedule.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `description` (text)
- `location` (text)
- `start_time` (timestamp, required)
- `end_time` (timestamp)
- `category` (text)
- `google_calendar_id` (text)
- `visible` (boolean, default: true)
- `published` (boolean, default: false)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published events
- Editors/Admins can manage all events

---

#### 12. **pages**
Dynamic page builder system.

**Columns:**
- `id` (uuid, PK)
- `title` (text, required)
- `slug` (text, unique, required)
- `meta_title` (text)
- `meta_description` (text)
- `sections` (jsonb, default: [])
- `published` (boolean, default: false)
- `created_by` (uuid)
- `updated_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published pages
- Editors/Admins can manage all pages

**Section Types (Phase 6B Extended):**

The `sections` field is a JSONB array containing page sections. Each section has:
```json
{
  "id": "uuid",
  "type": "section_type",
  "data": { /* section-specific data */ },
  "order": 0
}
```

**Supported Section Types:**

Core Sections (Existing):
- `hero` - Main hero banner with portrait and CTA
- `features` - 3 action tiles (Meeting / Services / Contact)
- `about` - Basic about section (legacy)
- `services_grid` - Static services grid (legacy)
- `testimonials` - Testimonials carousel
- `text` - Simple text section
- `image` - Simple image section

Enhanced Sections (Phase 6B New):
- `about_enhanced` - About with signature, phones, checklist, video, and KPIs
- `services_grid_dynamic` - 6 services + side image with experience overlay
- `career_timeline` - 3 career milestone periods
- `metrics_counter` - Animated KPI counters (standalone)
- `team_grid` - Team members display (fetches from `team_members` table)
- `news_preview` - Latest 3 news items (fetches from `news` table)
- `contact_cta_enhanced` - Contact form with office info and map

For detailed data structures and examples, see `docs/tasks/phase6b-section-types.md`.

**Implementation:**
- Rendered by `src/components/PageSection.tsx`
- Fetched via `usePage(slug)` hook from `src/hooks/usePages.ts`
- Dynamic data sourced from related tables (services, team_members, news, quotes)

**Preview Route (Phase 6B):**
- Dynamic homepage preview: `/preview/home` (renders `src/pages/HomeDynamic.tsx`)
- Static homepage (unchanged): `/` (renders `src/pages/Home.tsx`)
- Side-by-side comparison for QA before production cutover

---

#### 13. **team_members**
Team member profiles.

**Columns:**
- `id` (uuid, PK)
- `name` (text, required)
- `title` (text)
- `bio` (text)
- `photo_url` (text)
- `social_links` (jsonb)
- `display_order` (integer, default: 0)
- `published` (boolean, default: false)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published team members
- Editors/Admins can manage all team members

---

#### 14. **testimonials**
Client testimonials and reviews.

**Columns:**
- `id` (uuid, PK)
- `client_name` (text, required)
- `client_company` (text)
- `client_photo_url` (text)
- `testimonial_text` (text, required)
- `featured` (boolean, default: false)
- `published` (boolean, default: false)
- `display_order` (integer, default: 0)
- `created_by` (uuid)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS Policies:**
- Public can view published testimonials
- Editors/Admins can manage all testimonials

---

#### 15. **audit_logs**
System audit trail.

**Columns:**
- `id` (uuid, PK)
- `user_id` (uuid, required)
- `action` (text, required)
- `table_name` (text, required)
- `record_id` (uuid)
- `old_values` (jsonb)
- `new_values` (jsonb)
- `ip_address` (inet)
- `user_agent` (text)
- `created_at` (timestamp)

**RLS Policies:**
- Admins can view audit logs
- System can insert audit logs
- No updates or deletes allowed

---

## 🗂️ Storage Buckets

### 1. **media-uploads**
**Purpose:** Project images, featured images, gallery photos  
**Public:** Yes  
**Path Structure:** `projects/{random}.{ext}`

**RLS Policies:**
- Public can view all files
- Editors/Admins can upload/update/delete

---

### 2. **documents**
**Purpose:** Speech PDFs, downloadable documents  
**Public:** Yes  
**Path Structure:** `speeches/{random}.{ext}`

**RLS Policies:**
- Public can view all files
- Editors/Admins can upload/update/delete

---

## 🔐 Authentication & Authorization

### Authentication Methods
- ✅ Email/Password (enabled)
- ❌ Google OAuth (not configured)
- ❌ Magic Link (not configured)

### Authorization System
Uses custom `app_role` enum with three levels:
- `admin` - Full access to all features
- `editor` - Content management access
- `viewer` - Read-only admin panel access

**Permission Check Function:**
```sql
CREATE FUNCTION public.has_role(required_role app_role)
RETURNS boolean
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## ⚡ Edge Functions

### 1. **youtube-sync**
**Purpose:** Sync YouTube videos to media library  
**Status:** ⚠️ Requires API keys

**Required Secrets:**
- `YOUTUBE_API_KEY` - Not configured
- `YOUTUBE_CHANNEL_ID` - Not configured

**Endpoint:** `https://lokofoekwbjjxmzwyasa.supabase.co/functions/v1/youtube-sync`

**Invocation:**
```typescript
const { data, error } = await supabase.functions.invoke('youtube-sync', {
  body: { action: 'sync' }
});
```

---

## 🔧 Database Functions

### 1. **has_role()**
Checks if current user has a specific role.

```sql
SELECT has_role('admin'::app_role);
```

---

### 2. **handle_new_user()**
Trigger function to create profile when user signs up.

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 📡 API Integration Points

### Frontend Services

#### **Projects API** (`src/admin/api/projects.ts`)
```typescript
import { projectsService } from '@/admin/api/projects';

// List all projects
const projects = await projectsService.list();
```

#### **Dynamic Content Hooks** (`src/hooks/useDynamicContent.ts`) - Phase 6B
Lightweight Supabase hooks for fetching dynamic homepage content:

```typescript
import { 
  useDynamicServices, 
  useDynamicTeam, 
  useDynamicTestimonials, 
  useDynamicNews 
} from '@/hooks/useDynamicContent';

// Fetch published services
const { data: services, loading, error } = useDynamicServices();

// Fetch published team members (default limit: 4)
const { data: team, loading, error } = useDynamicTeam(4);

// Fetch published testimonials (default limit: 3)
const { data: testimonials, loading, error } = useDynamicTestimonials(3);

// Fetch published news (default limit: 3)
const { data: news, loading, error } = useDynamicNews(3);
```

**Hook Characteristics:**
- Pattern: `useDynamic[Entity](limit?)`
- Return: `{ data, loading, error }`
- Auto-fetch on mount with `useEffect`
- Filter: `published = true`
- Ordering: By `display_order` (team/services) or `published_at` (news)

// Get single project
const project = await projectsService.get(slugOrId);

// Create project
const newProject = await projectsService.create(projectData);

// Update project
const updated = await projectsService.update(id, projectData);

// Delete project
await projectsService.remove(id);

// Upload image
const imageUrl = await projectsService.uploadImage(file);

// Upload gallery images
const imageUrls = await projectsService.uploadGalleryImages(files);
```

---

#### **Speeches API** (`src/admin/api/speeches.ts`)
```typescript
import { speechesService } from '@/admin/api/speeches';

// List all speeches
const speeches = await speechesService.list();

// Get single speech
const speech = await speechesService.get(slugOrId);

// Create speech
const newSpeech = await speechesService.create(speechData);

// Update speech
const updated = await speechesService.update(id, speechData);

// Delete speech
await speechesService.remove(id);

// Upload document
const docUrl = await speechesService.uploadDocument(file);

// Search speeches
const results = await speechesService.search(query);
```

---

## 🚀 Deployment

### Supabase Configuration
**Project ID:** `lokofoekwbjjxmzwyasa`  
**Project URL:** `https://lokofoekwbjjxmzwyasa.supabase.co`  
**Region:** US East

### Environment Variables
All Supabase credentials are stored in `src/integrations/supabase/client.ts`:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

---

## 🛡️ Security Checklist

- ✅ RLS enabled on all tables
- ✅ Storage bucket policies configured
- ✅ Role-based access control implemented
- ✅ Auth trigger for profile creation
- ✅ Audit logging system in place
- ⚠️ Leaked password protection not enabled (recommended)

---

## 📊 Current Data Status

**Tables with Data:**
- news ✅
- quotes ✅
- services ✅
- contact_submissions ✅
- user_roles ✅
- profiles ✅

**Empty Tables (Ready for Content):**
- projects
- speeches
- appointments
- media
- events
- pages
- team_members
- testimonials
- audit_logs

---

## 🔄 Migration History

All database migrations are stored in `supabase/migrations/` directory:
- Initial schema setup
- RLS policies configuration
- Storage bucket creation
- User roles system
- Audit logging system

**Next Migration:** Phase 6 features (menus, settings, user management)

---

## 🐛 Known Issues & Limitations

1. **YouTube Sync** - Requires API key configuration
2. **Google Calendar** - Manual event entry only
3. **Email Notifications** - Not yet implemented
4. **Image Optimization** - No automatic thumbnail generation

---

## 📝 Future Enhancements

### Phase 6 Roadmap
- Menu management system
- Site settings panel
- User management interface
- Team members CRUD

### Advanced Features
- Email notifications (SendGrid/Resend)
- Real-time collaboration
- Image optimization pipeline
- Multi-language support
- Advanced search (Algolia/Meilisearch)

---

## 🔗 Integrations Configuration

**YouTube Sync**: Active (manual config required)  
**Google Calendar**: Placeholder (awaiting implementation)  

Config stored in `integrations_config` table with admin-only access via Settings > Integrations tab.

---

**For detailed implementation tasks, see:** `/docs/tasks/`  
**For restore points, see:** `/docs/restorepoints/`
