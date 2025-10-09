# VP Public Website — Product Requirements Document

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Project:** Gregory Allan Rusland — Vice President of the Republic of Suriname (Public Website)  
**Related Documents:** [Tasks.md](./Tasks.md) | [Architecture.md](./Architecture.md) | [Backend.md](./Backend.md)

---

## 1. Executive Summary

**Project Name:** VP Public Website (Gregory Allan Rusland)  
**Stack:** React + Tailwind (Lovable), Supabase (DB/Auth/Storage + Edge Functions)  
**Frontend Template:** Lasight  
**Backend/Admin Template:** Darkone React  
**Deployment Target:** Hostinger VPS (Docker or Node PM2 + NGINX)

**Important Update (October 2025):**
- Both **frontend (Lasight)** and **backend (Darkone)** templates have already been fully implemented and integrated into Lovable.
- **No layout or structural changes** should be made at this stage — only functional development and module implementation.
- **Frontend and backend CSS must remain completely separate.** There must be no mixing of styles, variables, or imports between Lasight and Darkone components.

---

## 2. Problem Statement

**Problem XYZ:** The previous VP website lacked modularity, was difficult to update, and required manual coding for all content changes. Media, quotes, and event management were fragmented and lacked integration with tools like YouTube and Google Calendar.

---

## 3. Goals & Objectives

### Primary Goals
1. Establish a **modular and maintainable system** that allows the VP's communications team to manage all content from an admin dashboard
2. Maintain **complete style fidelity** to the chosen templates
3. Ensure **no overlap between frontend and backend CSS or components**
4. Enable **Google Calendar** appointment sync and **YouTube channel integration** for media
5. Ensure **smooth migration** from Lovable to Hostinger VPS

### Success Criteria
- Non-technical staff can manage all website content without developer assistance
- Content updates are published instantly without code deployment
- System handles 10,000+ monthly visitors with <3s page load time
- 100% separation between frontend and backend styles maintained
- All sensitive data protected by Row-Level Security (RLS)

---

## 4. Target Users

### Primary Users
1. **VP Communications Team** (Admin/Editor roles)
   - Update news, speeches, projects, events
   - Manage media library and quotes
   - Review appointment requests and contact submissions
   
2. **VP Office Staff** (Viewer role)
   - View appointment requests
   - Access audit logs
   - Generate reports

3. **General Public** (Anonymous users)
   - Read news and view initiatives
   - Submit appointment requests
   - Contact VP office
   - View media gallery and speeches

---

## 5. Core Modules & Features

### 5.1 Pages Management Module
**Purpose:** Manage static page content (Home, About, Contact, etc.) through admin panel

**Features:**
- Dynamic section builder (hero, text blocks, images, etc.)
- WYSIWYG editor for content
- SEO meta fields (title, description)
- Publish/unpublish controls
- Preview before publishing

**Database Tables:** `pages`

---

### 5.2 News & Articles Module
**Purpose:** Publish news articles, press releases, and updates

**Features:**
- Create/edit/delete news articles
- Rich text editor with media embeds
- Category and tag management
- Featured articles
- Publication scheduling
- Archive functionality

**Database Tables:** `news`

---

### 5.3 Projects & Initiatives Module
**Purpose:** Showcase VP's projects, policies, and initiatives

**Features:**
- Project CRUD operations
- Progress tracking (percentage complete)
- Image galleries
- Category management
- Impact metrics
- Status workflow

**Database Tables:** `projects`

---

### 5.4 Speeches & Documents Module
**Purpose:** Manage speeches, presentations, and official documents

**Features:**
- Upload PDF/Word documents
- YouTube video embeds
- Full-text search
- Location and date tracking
- Category filtering
- Download tracking

**Database Tables:** `speeches`

---

### 5.5 Quotes Management Module
**Purpose:** Feature inspirational quotes from VP and others

**Features:**
- Quote CRUD operations
- Author attribution
- Featured toggle
- Display order management
- Context/source tracking
- Homepage carousel integration

**Database Tables:** `quotes`

---

### 5.6 Services Module
**Purpose:** Manage community solutions and services offered

**Features:**
- Service CRUD operations
- Icon management
- Category filtering
- Featured services
- Display order control
- Description with rich text

**Database Tables:** `services`

---

### 5.7 Events & Calendar Module
**Purpose:** Display VP's public schedule and events

**Features:**
- Manual event creation
- Google Calendar sync (via Edge Function)
- Event visibility controls
- Category filtering (official, community, etc.)
- Past events archive
- iCal export

**Database Tables:** `events`

---

### 5.8 Appointments System
**Purpose:** Allow citizens to request meetings with VP office

**Features:**
- Public appointment request form
- Admin review interface
- Status workflow (pending → approved/rejected → completed)
- Email notifications
- Calendar view
- Notes and follow-up tracking

**Database Tables:** `appointments`

---

### 5.9 Contact Form Module
**Purpose:** Handle general inquiries and messages

**Features:**
- Public contact form with validation
- Admin inbox interface
- Spam protection (rate limiting, honeypot)
- Status tracking (new, read, responded, archived)
- Email notifications
- Response templates

**Database Tables:** `contact_submissions`

---

### 5.10 Media Library & Gallery
**Purpose:** Professional media management with public gallery

**Features:**
- Drag-and-drop file upload
- Image optimization
- Category and tag management
- YouTube channel sync (via Edge Function)
- Bulk upload
- Featured media selection
- Public gallery page

**Database Tables:** `media`  
**Storage Buckets:** `media-uploads`, `documents`

---

### 5.11 User Management & RBAC
**Purpose:** Manage admin users and permissions

**Features:**
- User CRUD operations
- Role assignment (admin, editor, viewer)
- Profile management
- Password reset
- Activity tracking
- Session management

**Database Tables:** `user_roles`, `profiles`

---

### 5.12 Audit Logs
**Purpose:** Track all admin actions for transparency and security

**Features:**
- Automatic logging of all CRUD operations
- User activity tracking
- Filter by user, action, date, table
- Export audit reports
- IP and user agent tracking
- Security event alerts

**Database Tables:** `audit_logs`

---

## 6. Technical Requirements

### 6.1 Frontend (Lasight)
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Original Lasight CSS + Tailwind CSS
- **Routing:** React Router v6 with lazy loading
- **Data Fetching:** Supabase client + React Query (recommended)
- **Forms:** React Hook Form + Yup validation
- **SEO:** React Helmet Async
- **Performance:** Lighthouse score >90

### 6.2 Backend Admin (Darkone)
- **Framework:** React 18 + TypeScript
- **UI Library:** React Bootstrap
- **Styling:** Darkone SCSS (completely separate from frontend)
- **Forms:** React Hook Form + Yup
- **Rich Text:** React Quill
- **Charts:** ApexCharts
- **Data Grid:** GridJS React
- **Icons:** Iconify

### 6.3 Database & Backend (Supabase)
- **Database:** PostgreSQL 15+ with Row-Level Security
- **Authentication:** Supabase Auth (email/password, role-based)
- **Storage:** Supabase Storage (media, documents)
- **Edge Functions:** YouTube API, Google Calendar API, Email notifications
- **Real-time:** Supabase Realtime (optional for live updates)

### 6.4 Security Requirements
- Role-based access control (admin, editor, viewer)
- Row-Level Security policies on all tables
- Security definer function for role checking
- Input validation with Zod schemas
- XSS and SQL injection protection
- Rate limiting on public forms
- Audit logging for all admin actions
- HTTPS enforcement
- Strong password requirements

---

## 7. CSS Separation Policy

**Critical Rule:** Frontend and backend styles must remain 100% independent.

### Frontend (Lasight)
- Uses `/public/css/*` and Lasight-specific styles
- Tailwind configuration: default or Lasight-specific
- No imports from Darkone

### Backend (Darkone)
- Uses `src/admin/styles/admin.scss` and Darkone SCSS
- Independent React Bootstrap theme
- No imports from Lasight

### Enforcement
- No cross-imports between templates
- Separate component trees (`src/pages` vs `src/admin/pages`)
- Shared utilities (if any) must be duplicated or abstracted
- Document any exceptions in `docs/Architecture.md`

---

## 8. Integration Requirements

### 8.1 YouTube Integration
- Sync latest videos from VP's YouTube channel
- Store video metadata (title, description, thumbnail, views)
- Auto-refresh on schedule (daily)
- Embed videos on frontend media gallery

**Implementation:** Supabase Edge Function + YouTube Data API v3

### 8.2 Google Calendar Integration
- Fetch public calendar events
- Display on Events page
- Admin override capability (hide specific events)
- iCal export for users

**Implementation:** Supabase Edge Function + Google Calendar API v3

---

## 9. Content Migration Plan

**Source:** gregrusland.com  
**Target:** New VP Website modules

### Content Mapping
| Old Content | New Module | Notes |
|-------------|------------|-------|
| About page | Pages module | Dynamic sections |
| Services/Solutions | Services module | Icon + description |
| Quotes | Quotes module | Featured carousel |
| Projects/Initiatives | Projects module | Progress tracking |
| Events | Speeches module | YouTube embeds |
| Media gallery | Media module | YouTube sync |

### Migration Process
1. Content audit of gregrusland.com
2. Extract text, images, documents
3. Import into respective modules via admin panel
4. Verify all links and media
5. SEO meta data migration
6. Final review and approval

**See:** [ContentMapping.md](./ContentMapping.md) for detailed mapping

---

## 10. Deployment Requirements

### 10.1 Hosting Environment
- **Platform:** Hostinger VPS
- **OS:** Ubuntu 22.04 LTS
- **Web Server:** NGINX (reverse proxy)
- **Process Manager:** Docker or PM2
- **SSL:** Let's Encrypt (Certbot)

### 10.2 Routing Configuration
- `/` → Lasight frontend (public website)
- `/admin` → Darkone backend (admin panel)
- Separate build directories
- Independent `.env` configurations

### 10.3 CI/CD Pipeline
- GitHub Actions for automated builds
- Deploy on push to `main` branch
- Staging environment for testing
- Automated database migrations
- Health checks and monitoring

**See:** [Deployment.md](./Deployment.md) for step-by-step guide

---

## 11. Performance Requirements

- **Page Load Time:** <3 seconds (Lighthouse)
- **Mobile Performance:** >85 score
- **Accessibility:** WCAG 2.1 AA compliance
- **SEO:** >90 Lighthouse score
- **Uptime:** 99.9% availability
- **Concurrent Users:** Support 500+ simultaneous users

---

## 12. Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 13. Future Enhancements (Out of Scope for v1.0)

- Multi-language support (English, Dutch, Sranan Tongo)
- Newsletter subscription system
- Push notifications for news/events
- Public commenting system
- Social media feed integration
- Advanced analytics dashboard
- Mobile app (iOS/Android)

---

## 14. Success Metrics

### Technical Metrics
- All modules functional and tested
- Zero critical security vulnerabilities
- <3s page load time
- 99.9% uptime in first 3 months

### Business Metrics
- 50% reduction in content update time
- Zero code deployments required for content changes
- 100% of team trained and using admin panel
- Positive feedback from VP's communications team

---

## 15. Timeline & Phases

**See:** [Tasks.md](./Tasks.md) for detailed phase breakdown

**Summary:**
- **Phase 0:** Supabase Foundation (3-5 days) — CRITICAL
- **Phase 1-8:** Module Implementation (20-35 days)
- **Phase 9:** Content Migration (3-5 days)
- **Phase 10:** Performance & Optimization (2-3 days)
- **Phase 11:** Testing & Deployment (4-6 days)

**Total Estimated Time:** 33-49 working days (6-10 weeks)

---

## 16. Stakeholders & Approvals

| Role | Name | Responsibility |
|------|------|----------------|
| Project Owner | VP Office | Final approval |
| Technical Lead | Development Team | Implementation |
| Content Manager | Communications Team | Content migration |
| Security Auditor | TBD | Security review |

---

## 17. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| CSS mixing between templates | High | Strict separation policy, code reviews |
| RLS misconfiguration | Critical | Security audit, automated tests |
| Content migration delays | Medium | Early content audit, parallel work |
| VPS deployment issues | Medium | Staging environment, rollback plan |
| YouTube API rate limits | Low | Caching, scheduled sync |

---

## 18. References

- [Lasight Template Documentation](#)
- [Darkone React Documentation](#)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router v6 Guide](https://reactrouter.com/)
- [Hostinger VPS Setup](https://www.hostinger.com/tutorials/vps)

---

**Document Control:**  
**Author:** Development Team  
**Approved By:** VP Office  
**Next Review Date:** After Phase 0 completion
