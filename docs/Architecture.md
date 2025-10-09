# VP Website — Technical Architecture

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md) | [Backend.md](./Backend.md) | [Frontend.md](./Frontend.md)

---

## 1. System Overview

The VP Website is a dual-application system consisting of a public-facing frontend (Lasight template) and an admin backend (Darkone template), both sharing a single Supabase backend infrastructure.

```
┌─────────────────────────────────────────────────────────────┐
│                     VP Website System                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐          ┌──────────────────┐         │
│  │  Frontend (/)    │          │  Backend (/admin)│         │
│  │  Lasight React   │          │  Darkone React   │         │
│  │  Public Website  │          │  Admin Panel     │         │
│  └────────┬─────────┘          └────────┬─────────┘         │
│           │                              │                   │
│           └──────────┬───────────────────┘                   │
│                      │                                       │
│           ┌──────────▼──────────┐                           │
│           │   Supabase Backend  │                           │
│           │  - PostgreSQL       │                           │
│           │  - Auth             │                           │
│           │  - Storage          │                           │
│           │  - Edge Functions   │                           │
│           └─────────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Lasight)

### 2.1 Technology Stack
- **Framework:** React 18.3.1 + TypeScript 5.9.3
- **Build Tool:** Vite 5.4.20
- **Routing:** React Router DOM 6.30.1
- **Styling:** Custom Lasight CSS + Tailwind CSS
- **SEO:** React Helmet Async 2.0.5
- **Data Fetching:** @supabase/supabase-js + React Query (recommended)
- **Forms:** React Hook Form 7.64.0 + Yup 1.7.1

### 2.2 Directory Structure
```
src/
├── pages/                    # Page components (public routes)
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Blog/                 # News/articles
│   ├── Portfolio/            # Projects/initiatives
│   ├── Services.tsx
│   ├── Contact.tsx
│   └── ...
├── components/               # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── QuotesCarousel.tsx
│   └── ...
├── layouts/                  # Layout wrappers
│   └── MainLayout.tsx
├── hooks/                    # Custom React hooks
│   ├── usePages.ts
│   ├── useNews.ts
│   └── ...
├── lib/                      # Utilities and configs
│   ├── supabase.ts           # Supabase client
│   └── utils.ts
├── types/                    # TypeScript interfaces
│   └── database.types.ts
└── router/                   # Route definitions
    └── index.tsx
```

### 2.3 Styling System
- **Primary:** `/public/css/*.css` (Lasight original styles)
- **Utility:** Tailwind CSS (configured independently)
- **Component Styles:** Scoped to Lasight theme
- **Global Tokens:** Defined in `/public/css/style.css`

**Critical Rule:** No imports from Darkone admin styles.

---

## 3. Backend Architecture (Darkone)

### 3.1 Technology Stack
- **Framework:** React 18.3.1 + TypeScript 5.9.3
- **UI Library:** React Bootstrap 2.10.10
- **Styling:** SCSS (Darkone theme) — completely separate from frontend
- **Forms:** React Hook Form 7.64.0 + Yup 1.7.1
- **Rich Text:** React Quill 2.0.0
- **Data Grid:** GridJS React 6.1.1
- **Charts:** React ApexCharts 1.7.0
- **Icons:** @iconify/react 5.2.1
- **File Upload:** React Dropzone 14.3.8
- **Date Picker:** React Flatpickr 3.10.13

### 3.2 Directory Structure
```
src/admin/
├── pages/                    # Admin page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── news/
│   │   ├── NewsList.tsx
│   │   └── NewsForm.tsx
│   ├── projects/
│   ├── speeches/
│   ├── quotes/
│   ├── services/
│   ├── media/
│   ├── users/
│   ├── menus/
│   └── settings/
├── layouts/                  # Admin layouts
│   └── AdminLayout.tsx
├── components/               # Admin-specific components
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── ...
├── api/                      # API/Supabase service layers
│   ├── news.ts
│   ├── projects.ts
│   ├── speeches.ts
│   └── ...
├── styles/                   # Admin SCSS
│   └── admin.scss
└── utils/                    # Admin utilities
    └── validation.ts
```

### 3.3 Styling System
- **Primary:** `src/admin/styles/admin.scss` (Darkone SCSS)
- **UI Framework:** React Bootstrap (independent theme)
- **Icons:** Iconify (Material Design, Remix Icon, etc.)

**Critical Rule:** No imports from Lasight frontend styles.

---

## 4. Supabase Backend Architecture

### 4.1 Database Schema Overview

```sql
-- Core Tables
- user_roles          # Role-based access control
- profiles            # Extended user profiles
- pages               # Static page content (JSONB sections)
- news                # News articles
- projects            # VP initiatives/projects
- speeches            # Speeches and documents
- quotes              # Featured quotes
- services            # Community solutions
- events              # Calendar events
- media               # Photos and videos (YouTube)
- appointments        # Citizen meeting requests
- contact_submissions # Contact form data
- audit_logs          # Admin action tracking
```

**See:** [Backend.md](./Backend.md) for complete schema definitions.

### 4.2 Authentication System

**Strategy:** Supabase Auth with email/password

```typescript
// Login flow
1. User submits email + password
2. Supabase Auth validates credentials
3. Session token stored in localStorage (httpOnly)
4. User profile fetched (including roles)
5. App redirects based on role
```

**Roles:**
- `admin` — Full access (create, edit, delete, publish)
- `editor` — Content management (create, edit, publish)
- `viewer` — Read-only access (view content, reports)

### 4.3 Row-Level Security (RLS)

**Policy Structure:**

```sql
-- Pattern: Public read, role-based write
CREATE POLICY "Public can view published content"
  ON public.news FOR SELECT
  USING (published = true);

CREATE POLICY "Editors can manage content"
  ON public.news FOR ALL
  USING (has_role('editor') OR has_role('admin'));
```

**Security Definer Function:**

```sql
CREATE FUNCTION public.has_role(required_role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = required_role
  );
END;
$$;
```

**See:** [Security.md](./Security.md) for complete RLS policies.

### 4.4 Storage Buckets

| Bucket Name | Purpose | RLS Policy |
|-------------|---------|------------|
| `media-uploads` | Photos, images | Public read, admin/editor write |
| `documents` | PDFs, Word docs | Public read (published), admin/editor write |

### 4.5 Edge Functions

| Function | Purpose | Trigger |
|----------|---------|---------|
| `youtube-sync` | Fetch latest videos from VP's YouTube channel | Scheduled (daily cron) |
| `calendar-sync` | Sync Google Calendar events | Scheduled (hourly) |
| `send-notification` | Send email notifications (appointments, contacts) | On database insert |

**See:** [Backend.md](./Backend.md) for Edge Function implementations.

---

## 5. Data Flow Diagrams

### 5.1 Content Publishing Flow

```
┌──────────────┐
│ Admin Panel  │
│ (Darkone)    │
└──────┬───────┘
       │
       │ 1. Create/Edit Content
       │
       ▼
┌─────────────────┐
│ Supabase DB     │
│ - Validate RLS  │
│ - Insert/Update │
│ - Log Audit     │
└──────┬──────────┘
       │
       │ 2. Fetch Published Content
       │
       ▼
┌──────────────┐
│ Frontend     │
│ (Lasight)    │
└──────────────┘
```

### 5.2 Authentication Flow

```
┌─────────────┐
│ Login Page  │
└──────┬──────┘
       │
       │ 1. Email + Password
       │
       ▼
┌──────────────────┐
│ Supabase Auth    │
│ - Validate       │
│ - Create Session │
└──────┬───────────┘
       │
       │ 2. Fetch User Profile + Roles
       │
       ▼
┌─────────────────┐
│ App State       │
│ - Store Session │
│ - Set User Role │
└──────┬──────────┘
       │
       │ 3. Route Based on Role
       │
       ▼
┌──────────────┐       ┌──────────────┐
│ Admin Panel  │  OR   │ Access Denied│
└──────────────┘       └──────────────┘
```

### 5.3 Media Upload Flow

```
┌──────────────┐
│ Admin Upload │
└──────┬───────┘
       │
       │ 1. Select Files (Drag & Drop)
       │
       ▼
┌─────────────────┐
│ Client-side     │
│ - Validate Type │
│ - Validate Size │
└──────┬──────────┘
       │
       │ 2. Upload to Supabase Storage
       │
       ▼
┌─────────────────┐
│ Supabase        │
│ Storage Bucket  │
└──────┬──────────┘
       │
       │ 3. Generate Public URL
       │
       ▼
┌─────────────────┐
│ Save Metadata   │
│ to media table  │
└─────────────────┘
```

---

## 6. CSS Separation Architecture

### 6.1 Independent Style Systems

```
Frontend (Lasight)              Backend (Darkone)
─────────────────────          ─────────────────────
/public/css/*.css               src/admin/styles/*.scss
  ├── style.css                   ├── admin.scss
  ├── bootstrap.min.css           ├── _variables.scss
  └── responsive.css              └── _components.scss

Tailwind Config                 React Bootstrap Theme
tailwind.config.ts (Lasight)   Custom SCSS variables

NO CROSS-IMPORTS ALLOWED ❌
```

### 6.2 Shared Utility Strategy

**Problem:** What if both apps need the same utility function or style?

**Solution:**
1. **Duplicate** simple utilities (preferred)
2. **Abstract** complex logic into shared `/src/lib/shared/` directory
3. **Document** all shared code in this file

**Current Shared Code:** None (as of v1.0)

---

## 7. Routing Architecture

### 7.1 Frontend Routes (Lasight)

```typescript
// Public routes (no authentication required)
/ → Home
/about → About VP
/services → Community Solutions
/blog → News & Articles
/blog/:slug → News Detail
/portfolio → Projects & Initiatives
/portfolio/:slug → Project Detail
/speeches → Speeches & Documents
/contact → Contact Form
/appointments → Book Appointment
```

### 7.2 Backend Routes (Darkone)

```typescript
// Admin routes (authentication required)
/admin/login → Login Page (public)
/admin → Dashboard (protected)
/admin/news → News Management
/admin/news/new → Create News
/admin/news/:id → Edit News
/admin/projects → Projects Management
/admin/speeches → Speeches Management
/admin/quotes → Quotes Management
/admin/services → Services Management
/admin/media → Media Library
/admin/users → User Management
/admin/menus → Menu Management
/admin/settings → Site Settings
```

### 7.3 Route Guards

```typescript
// ProtectedRoute Component
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role } = useAuth();
  
  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  
  if (requiredRole && !hasRole(role, requiredRole)) {
    return <Navigate to="/admin" />; // Insufficient permissions
  }
  
  return children;
};
```

---

## 8. Deployment Architecture (Hostinger VPS)

### 8.1 Server Structure

```
Hostinger VPS (Ubuntu 22.04)
├── NGINX (Reverse Proxy)
│   ├── / → Frontend (port 3000)
│   └── /admin → Backend (port 3001)
├── Docker Containers (Recommended)
│   ├── frontend-container
│   │   └── Vite build (static files)
│   └── backend-container
│       └── Vite build (static files)
├── SSL Certificate (Let's Encrypt)
└── PM2 (Alternative to Docker)
```

### 8.2 NGINX Configuration

```nginx
server {
    listen 80;
    server_name vp-suriname.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vp-suriname.com;

    ssl_certificate /etc/letsencrypt/live/vp-suriname.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vp-suriname.com/privkey.pem;

    # Frontend (Lasight)
    location / {
        root /var/www/vp-website/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend (Darkone)
    location /admin {
        alias /var/www/vp-website/backend/dist;
        try_files $uri $uri/ /admin/index.html;
    }

    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 8.3 Docker Compose (Recommended)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: always

  backend:
    build: ./backend
    ports:
      - "3001:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: always
```

**See:** [Deployment.md](./Deployment.md) for complete deployment guide.

---

## 9. Development Workflow

### 9.1 Local Development

```bash
# Start development server
npm run dev

# Frontend available at: http://localhost:8080
# Backend available at: http://localhost:8080/admin

# Both apps run in same Vite dev server (via routing)
```

### 9.2 Build Process

```bash
# Build both apps
npm run build

# Output:
# dist/           # Frontend build
# dist/admin/     # Backend build (if separate)
```

### 9.3 Git Workflow

```bash
# Feature branch workflow
1. Create feature branch: git checkout -b feature/pages-module
2. Make changes and commit frequently
3. Push to GitHub: git push origin feature/pages-module
4. Create Pull Request for review
5. Merge to main after approval
6. Deploy from main branch
```

---

## 10. Performance Considerations

### 10.1 Frontend Optimization
- Lazy loading for routes (React.lazy + Suspense)
- Image lazy loading (loading="lazy")
- Code splitting (Vite automatic)
- CDN for static assets
- Caching strategy (service worker)

### 10.2 Backend Optimization
- Supabase query optimization (indexes on frequently queried columns)
- React Query for data caching
- Pagination for large datasets
- Debounced search inputs

### 10.3 Database Optimization
- Indexes on foreign keys
- Indexes on commonly filtered columns (published, status, created_at)
- JSONB GIN indexes for pages.sections
- Regular VACUUM and ANALYZE

---

## 11. Monitoring & Logging

### 11.1 Application Monitoring
- **Tool:** PM2 monitoring or Docker logs
- **Metrics:** CPU, memory, uptime
- **Alerts:** Email on crash or high resource usage

### 11.2 Database Monitoring
- **Tool:** Supabase Dashboard
- **Metrics:** Query performance, connection pool
- **Alerts:** Slow queries, high disk usage

### 11.3 User Monitoring
- **Tool:** Google Analytics (frontend)
- **Metrics:** Page views, bounce rate, conversions
- **Custom Events:** Appointment submissions, contact forms

---

## 12. Backup & Disaster Recovery

### 12.1 Database Backups
- **Frequency:** Daily automated backups (Supabase)
- **Retention:** 7 days (free plan) or 30 days (paid)
- **Manual Backup:** Before major changes

### 12.2 Code Backups
- **Strategy:** Git version control (GitHub)
- **Branches:** main (production), staging, feature branches
- **Tags:** Version tags for releases (v1.0, v1.1, etc.)

### 12.3 Restore Procedures
1. Database restore from Supabase dashboard
2. Code rollback via Git revert or checkout
3. Redeploy from previous commit

---

## 13. Security Architecture

### 13.1 Authentication Security
- Email verification required
- Strong password requirements (min 8 chars, uppercase, lowercase, number)
- Session timeout (24 hours)
- Refresh token rotation

### 13.2 API Security
- Row-Level Security (RLS) on all tables
- API rate limiting (via Supabase)
- Input validation (Zod schemas)
- XSS protection (sanitize HTML)
- CSRF protection (SameSite cookies)

### 13.3 Infrastructure Security
- HTTPS enforced (SSL certificate)
- Firewall rules (allow only 80, 443, 22)
- Regular security updates (Ubuntu)
- SSH key authentication only (no password login)

**See:** [Security.md](./Security.md) for detailed security policies.

---

## 14. Scalability Considerations

### 14.1 Current Architecture Limits
- Supabase Free Tier: 500MB database, 1GB storage
- Hostinger VPS: 1-2 vCPU, 2-4GB RAM
- Expected Load: 10,000 monthly visitors

### 14.2 Scaling Strategy
1. **Phase 1 (0-50k visitors/month):** Current architecture sufficient
2. **Phase 2 (50k-200k visitors/month):** Upgrade Supabase plan, add CDN
3. **Phase 3 (200k+ visitors/month):** Load balancer, multiple VPS instances

### 14.3 Database Scaling
- Supabase automatic connection pooling
- Add read replicas for high read traffic
- Implement caching layer (Redis) if needed

---

## 15. Testing Strategy

### 15.1 Unit Testing
- **Tool:** Vitest (recommended)
- **Coverage:** Utility functions, hooks, validators
- **Run:** `npm run test`

### 15.2 Integration Testing
- **Tool:** Playwright or Cypress
- **Coverage:** User flows (login, create content, publish)
- **Run:** `npm run test:e2e`

### 15.3 Manual Testing
- **Checklist:** User acceptance testing (UAT) with VP team
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Devices:** Desktop, tablet, mobile

---

## 16. Documentation Maintenance

### 16.1 Update Frequency
- **Architecture.md:** After major structural changes
- **Backend.md:** After schema or API changes
- **Frontend.md:** After new pages or components
- **Tasks.md:** Daily during active development

### 16.2 Version Control
- Use semantic versioning (v1.0, v1.1, v2.0)
- Tag documentation versions matching code releases
- Keep changelog in `/docs/CHANGELOG.md`

---

## 17. Future Architecture Considerations

### 17.1 Multi-language Support
- Add `language` column to all content tables
- Implement i18n library (react-i18next)
- Language switcher component

### 17.2 Mobile App
- React Native app sharing Supabase backend
- Push notifications via Firebase
- Offline support with local database

### 17.3 Advanced Features
- Real-time updates (Supabase Realtime)
- Public commenting system (with moderation)
- Newsletter subscription (via Edge Function + email service)
- Social media feed aggregation

---

**Document Control:**  
**Author:** Development Team  
**Next Review Date:** After Phase 0 completion  
**Change Log:** Initial version — 2025-10-09
