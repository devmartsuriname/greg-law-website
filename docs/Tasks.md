# VP Website — Task Breakdown & Implementation Checklist

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md)  
**Status Legend:** ❌ Not Started | 🟡 In Progress | ✅ Completed | 🔒 Blocked

---

## Phase 0: Supabase Foundation (CRITICAL)

**Duration:** 3-5 days  
**Priority:** CRITICAL  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD (Definition of Done) |
|---|------|--------|----------|--------------------------|
| 0.1 | Enable Lovable Cloud (Supabase) | ❌ | Dev | Supabase project created in Lovable |
| 0.2 | Install @supabase/supabase-js | ❌ | Dev | Package installed and imported |
| 0.3 | Create Supabase client configuration | ❌ | Dev | `src/lib/supabase.ts` created with proper env vars |
| 0.4 | Create `app_role` enum (admin, editor, viewer) | ❌ | Dev | Enum exists in database |
| 0.5 | Create `user_roles` table with RLS | ❌ | Dev | Table created, RLS policies applied |
| 0.6 | Create `profiles` table linked to auth.users | ❌ | Dev | Table created, trigger for auto-profile creation |
| 0.7 | Create security definer function `has_role()` | ❌ | Dev | Function exists and tested |
| 0.8 | Create `pages` table with RLS | ❌ | Dev | Table + policies tested |
| 0.9 | Create `news` table with RLS | ❌ | Dev | Table + policies tested |
| 0.10 | Create `projects` table with RLS | ❌ | Dev | Table + policies tested |
| 0.11 | Create `speeches` table with RLS | ❌ | Dev | Table + policies tested |
| 0.12 | Create `quotes` table with RLS | ❌ | Dev | Table + policies tested |
| 0.13 | Create `services` table with RLS | ❌ | Dev | Table + policies tested |
| 0.14 | Create `events` table with RLS | ❌ | Dev | Table + policies tested |
| 0.15 | Create `media` table with RLS | ❌ | Dev | Table + policies tested |
| 0.16 | Create `appointments` table with RLS | ❌ | Dev | Table + policies tested |
| 0.17 | Create `contact_submissions` table with RLS | ❌ | Dev | Table + policies tested |
| 0.18 | Create `audit_logs` table with RLS | ❌ | Dev | Table + policies tested |
| 0.19 | Create storage bucket `media-uploads` | ❌ | Dev | Bucket created with RLS policies |
| 0.20 | Create storage bucket `documents` | ❌ | Dev | Bucket created with RLS policies |
| 0.21 | Replace localStorage auth with Supabase Auth | ❌ | Dev | Login works with Supabase |
| 0.22 | Update ProtectedRoute to use Supabase session | ❌ | Dev | Routes protected by real auth |
| 0.23 | Implement role-based route guards | ❌ | Dev | Routes check user roles correctly |
| 0.24 | Add logout functionality | ❌ | Dev | Logout clears session and redirects |
| 0.25 | Test authentication flow end-to-end | ❌ | Dev | Login, protected routes, logout working |

**Phase 0 Deliverables:**
- ✅ Supabase project fully configured
- ✅ Complete database schema with all tables
- ✅ RLS policies on all tables tested
- ✅ Authentication system working
- ✅ Role-based access control implemented

---

## Phase 1: Pages Management Module (HIGH)

**Duration:** 2-3 days  
**Priority:** HIGH  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 1.1 | Create PagesList admin component | ❌ | Dev | List view shows all pages |
| 1.2 | Create PageForm admin component | ❌ | Dev | Form for create/edit pages |
| 1.3 | Implement pages CRUD API (Supabase) | ❌ | Dev | Create, read, update, delete working |
| 1.4 | Add section builder UI (add/remove/reorder) | ❌ | Dev | Dynamic sections work |
| 1.5 | Implement SEO meta fields | ❌ | Dev | Title, description editable |
| 1.6 | Add publish/unpublish toggle | ❌ | Dev | Published flag works |
| 1.7 | Create preview functionality | ❌ | Dev | Preview shows page before publish |
| 1.8 | Update frontend Home.tsx to use Supabase | ❌ | Dev | Home page shows dynamic content |
| 1.9 | Create usePage() hook for frontend | ❌ | Dev | Hook fetches page by slug |
| 1.10 | Test full pages workflow | ❌ | Dev | Edit page in admin, see changes on frontend |

**Phase 1 Deliverables:**
- ✅ Pages admin interface working
- ✅ Homepage dynamically rendered from database
- ✅ Content editable without code changes

---

## Phase 2: Core Content Modules (HIGH)

**Duration:** 4-6 days  
**Priority:** HIGH  
**Status:** ❌ Not Started

### Tasks — News Module

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 2.1 | Update NewsList to use Supabase | ❌ | Dev | Fetch news from database |
| 2.2 | Update NewsForm to use Supabase | ❌ | Dev | Create/edit works with DB |
| 2.3 | Add image upload to Supabase Storage | ❌ | Dev | Featured image uploads work |
| 2.4 | Implement category filtering | ❌ | Dev | Filter by category in admin |
| 2.5 | Add search functionality | ❌ | Dev | Search by title/content |
| 2.6 | Update frontend Blog pages to use Supabase | ❌ | Dev | Blog shows real news data |

### Tasks — Projects Module

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 2.7 | Update ProjectsList to use Supabase | ❌ | Dev | Fetch projects from DB |
| 2.8 | Update ProjectsForm to use Supabase | ❌ | Dev | CRUD operations work |
| 2.9 | Add progress tracking field | ❌ | Dev | Percentage complete editable |
| 2.10 | Add image gallery support | ❌ | Dev | Multiple images per project |
| 2.11 | Update frontend Portfolio to use Supabase | ❌ | Dev | Projects show on frontend |

### Tasks — Speeches Module

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 2.12 | Update SpeechesList to use Supabase | ❌ | Dev | Fetch from DB |
| 2.13 | Update SpeechesForm to use Supabase | ❌ | Dev | CRUD works |
| 2.14 | Add PDF upload functionality | ❌ | Dev | Upload PDFs to storage |
| 2.15 | Add YouTube video embed support | ❌ | Dev | Embed video URLs |
| 2.16 | Implement full-text search | ❌ | Dev | Search speeches by content |
| 2.17 | Update frontend Speeches page | ❌ | Dev | Frontend shows real data |

**Phase 2 Deliverables:**
- ✅ All three modules (News, Projects, Speeches) working with Supabase
- ✅ File uploads functional
- ✅ Frontend pages showing real data

---

## Phase 3: Quotes & Services Modules (MEDIUM)

**Duration:** 2-3 days  
**Priority:** MEDIUM  
**Status:** ❌ Not Started

### Tasks — Quotes Module

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 3.1 | Create QuotesList admin component | ❌ | Dev | List all quotes |
| 3.2 | Create QuoteForm admin component | ❌ | Dev | Create/edit quotes |
| 3.3 | Implement quotes CRUD API | ❌ | Dev | Supabase CRUD works |
| 3.4 | Add featured toggle | ❌ | Dev | Mark quotes as featured |
| 3.5 | Add drag-and-drop reordering | ❌ | Dev | Reorder display_order |
| 3.6 | Update homepage to show featured quotes | ❌ | Dev | Quotes carousel on homepage |

### Tasks — Services Module

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 3.7 | Create ServicesList admin component | ❌ | Dev | List services |
| 3.8 | Create ServiceForm admin component | ❌ | Dev | CRUD form |
| 3.9 | Implement services CRUD API | ❌ | Dev | Supabase CRUD works |
| 3.10 | Add icon picker | ❌ | Dev | Select icon for service |
| 3.11 | Add category management | ❌ | Dev | Categorize services |
| 3.12 | Update frontend Services page | ❌ | Dev | Dynamic services on frontend |

**Phase 3 Deliverables:**
- ✅ Quotes management working
- ✅ Services management working
- ✅ Homepage sections dynamic

---

## Phase 4: Engagement Features (MEDIUM)

**Duration:** 3-4 days  
**Priority:** MEDIUM  
**Status:** ❌ Not Started

### Tasks — Appointments System

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 4.1 | Create public appointment form component | ❌ | Dev | Form on frontend |
| 4.2 | Add form validation (React Hook Form + Yup) | ❌ | Dev | Validation working |
| 4.3 | Create AppointmentsList admin component | ❌ | Dev | View all appointments |
| 4.4 | Create appointment detail/review view | ❌ | Dev | Review individual requests |
| 4.5 | Implement status workflow (pending/approved/rejected) | ❌ | Dev | Update status in admin |
| 4.6 | Add admin notes field | ❌ | Dev | Staff can add notes |
| 4.7 | Create calendar view in admin | ❌ | Dev | View appointments in calendar |
| 4.8 | Add rate limiting to public form | ❌ | Dev | Prevent spam (max 3/hour) |

### Tasks — Contact Form

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 4.9 | Create public contact form component | ❌ | Dev | Form on Contact page |
| 4.10 | Add spam protection (honeypot) | ❌ | Dev | Honeypot field implemented |
| 4.11 | Create ContactsList admin component | ❌ | Dev | Admin inbox view |
| 4.12 | Add status tracking (new/read/responded) | ❌ | Dev | Mark submissions |
| 4.13 | Implement search and filtering | ❌ | Dev | Search by email/subject |

**Phase 4 Deliverables:**
- ✅ Appointment booking system live
- ✅ Contact form with admin management
- ✅ Spam protection working

---

## Phase 5: Media Gallery & YouTube Integration (MEDIUM)

**Duration:** 3-4 days  
**Priority:** MEDIUM  
**Status:** ❌ Not Started

### Tasks — Media Library

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 5.1 | Replace mock MediaLibrary with Supabase | ❌ | Dev | Fetch from DB |
| 5.2 | Implement drag-and-drop file upload | ❌ | Dev | Upload to Supabase Storage |
| 5.3 | Add image optimization (resize, compress) | ❌ | Dev | Auto-optimize on upload |
| 5.4 | Create thumbnail generation | ❌ | Dev | Generate thumbnails |
| 5.5 | Add category and tag management | ❌ | Dev | Organize media |
| 5.6 | Implement bulk upload | ❌ | Dev | Upload multiple files |
| 5.7 | Create media selector for other modules | ❌ | Dev | Reusable media picker |

### Tasks — YouTube Integration

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 5.8 | Create Supabase Edge Function for YouTube API | ❌ | Dev | Function deployed |
| 5.9 | Implement YouTube channel sync logic | ❌ | Dev | Fetch latest videos |
| 5.10 | Store video metadata in media table | ❌ | Dev | Title, thumbnail, views saved |
| 5.11 | Add scheduled refresh (daily cron) | ❌ | Dev | Auto-sync videos |
| 5.12 | Create YouTube admin interface | ❌ | Dev | View/manage synced videos |
| 5.13 | Update frontend media gallery | ❌ | Dev | Show YouTube videos |

**Phase 5 Deliverables:**
- ✅ Media library fully functional
- ✅ YouTube channel synced
- ✅ Public media gallery working

---

## Phase 6: Google Calendar Integration (LOW)

**Duration:** 2 days  
**Priority:** LOW  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 6.1 | Create Edge Function for Google Calendar API | ❌ | Dev | Function deployed |
| 6.2 | Implement calendar event sync | ❌ | Dev | Fetch public events |
| 6.3 | Store events in events table | ❌ | Dev | Events saved to DB |
| 6.4 | Add admin visibility controls | ❌ | Dev | Hide specific events |
| 6.5 | Create frontend calendar view | ❌ | Dev | Display events on frontend |
| 6.6 | Add iCal export functionality | ❌ | Dev | Export button works |

**Phase 6 Deliverables:**
- ✅ Google Calendar synced
- ✅ Events displayed on frontend
- ✅ Admin controls working

---

## Phase 7: Audit Logs & Security (HIGH)

**Duration:** 3-4 days  
**Priority:** HIGH  
**Status:** ❌ Not Started

### Tasks — Audit Logging

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 7.1 | Create audit logging utility function | ❌ | Dev | logAudit() function |
| 7.2 | Add logging to all CRUD operations | ❌ | Dev | All actions logged |
| 7.3 | Create AuditLogsList admin component | ❌ | Dev | View all logs |
| 7.4 | Add filtering (user, action, table, date) | ❌ | Dev | Filters work |
| 7.5 | Implement audit log export | ❌ | Dev | Export to CSV |
| 7.6 | Add IP and user agent tracking | ❌ | Dev | Track request metadata |

### Tasks — Security Hardening

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 7.7 | Implement Zod schemas for all forms | ❌ | Dev | Input validation |
| 7.8 | Add XSS protection (sanitize HTML) | ❌ | Dev | Rich text sanitized |
| 7.9 | Implement rate limiting on public forms | ❌ | Dev | Max requests/hour |
| 7.10 | Add file upload validation (type, size) | ❌ | Dev | Validate uploads |
| 7.11 | Review and test all RLS policies | ❌ | Dev | RLS tested thoroughly |
| 7.12 | Implement HTTPS enforcement | ❌ | Dev | Redirect HTTP to HTTPS |
| 7.13 | Add password strength requirements | ❌ | Dev | Strong passwords enforced |
| 7.14 | Run security audit (automated scan) | ❌ | Dev | No critical issues |

**Phase 7 Deliverables:**
- ✅ Complete audit trail
- ✅ Security hardening complete
- ✅ No critical vulnerabilities

---

## Phase 8: Analytics & Dashboard (LOW)

**Duration:** 2 days  
**Priority:** LOW  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 8.1 | Create dashboard statistics queries | ❌ | Dev | Count queries work |
| 8.2 | Add content counts (news, projects, etc.) | ❌ | Dev | Dashboard shows counts |
| 8.3 | Add recent appointments widget | ❌ | Dev | Show latest 5 |
| 8.4 | Add recent contacts widget | ❌ | Dev | Show latest 5 |
| 8.5 | Create publication stats chart | ❌ | Dev | ApexCharts visualization |
| 8.6 | Add user activity summary | ❌ | Dev | Show active users |
| 8.7 | Implement most viewed content | ❌ | Dev | Track page views |

**Phase 8 Deliverables:**
- ✅ Enhanced dashboard with metrics
- ✅ Charts and visualizations

---

## Phase 9: Content Migration (MEDIUM)

**Duration:** 3-5 days  
**Priority:** MEDIUM  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 9.1 | Conduct content audit of gregrusland.com | ❌ | Content Team | Inventory complete |
| 9.2 | Map content to new modules | ❌ | Content Team | Mapping documented |
| 9.3 | Extract text content | ❌ | Content Team | Text files prepared |
| 9.4 | Download and optimize images | ❌ | Content Team | Images ready |
| 9.5 | Import About page content | ❌ | Content Team | Pages module populated |
| 9.6 | Import Services/Solutions | ❌ | Content Team | Services module populated |
| 9.7 | Import Quotes | ❌ | Content Team | Quotes module populated |
| 9.8 | Import Projects/Initiatives | ❌ | Content Team | Projects module populated |
| 9.9 | Import Speeches/Events | ❌ | Content Team | Speeches module populated |
| 9.10 | Import Media gallery | ❌ | Content Team | Media module populated |
| 9.11 | Verify all links and media | ❌ | Content Team | No broken links |
| 9.12 | Migrate SEO meta data | ❌ | Content Team | Meta fields populated |
| 9.13 | Final content review and approval | ❌ | VP Office | Content approved |

**Phase 9 Deliverables:**
- ✅ All content migrated from old site
- ✅ No placeholder or demo content remaining
- ✅ Content approved by VP office

---

## Phase 10: Performance & Optimization (MEDIUM)

**Duration:** 2-3 days  
**Priority:** MEDIUM  
**Status:** ❌ Not Started

### Tasks

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 10.1 | Implement image lazy loading | ❌ | Dev | Lazy load working |
| 10.2 | Add code splitting for routes | ❌ | Dev | Lazy routes implemented |
| 10.3 | Optimize bundle size | ❌ | Dev | Bundle analyzed and reduced |
| 10.4 | Implement Supabase query caching | ❌ | Dev | React Query setup |
| 10.5 | Add CDN for static assets | ❌ | Dev | Assets on CDN |
| 10.6 | Run Lighthouse performance audit | ❌ | Dev | Score >90 |
| 10.7 | Test mobile responsiveness | ❌ | Dev | All pages responsive |
| 10.8 | Optimize SEO (meta tags, structured data) | ❌ | Dev | SEO score >90 |
| 10.9 | Test on multiple browsers | ❌ | Dev | Chrome, Firefox, Safari tested |
| 10.10 | Run load testing (500+ concurrent users) | ❌ | Dev | Performance acceptable |

**Phase 10 Deliverables:**
- ✅ Lighthouse score >90
- ✅ Mobile-optimized
- ✅ Fast load times (<3s)

---

## Phase 11: Testing & Deployment (CRITICAL)

**Duration:** 4-6 days  
**Priority:** CRITICAL  
**Status:** ❌ Not Started

### Tasks — Testing

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 11.1 | Security audit (RLS policies) | ❌ | Dev | No vulnerabilities |
| 11.2 | Test all RLS policies with different roles | ❌ | Dev | Permissions correct |
| 11.3 | User acceptance testing (UAT) | ❌ | VP Team | UAT approved |
| 11.4 | Cross-browser testing | ❌ | Dev | All browsers work |
| 11.5 | Mobile device testing (iOS, Android) | ❌ | Dev | Mobile works |
| 11.6 | Load testing (simulate traffic) | ❌ | Dev | Handles load |
| 11.7 | Test backup and restore procedures | ❌ | Dev | Backup/restore works |

### Tasks — Deployment

| # | Task | Status | Assignee | DoD |
|---|------|--------|----------|-----|
| 11.8 | Export project from Lovable to GitHub | ❌ | Dev | Code on GitHub |
| 11.9 | Configure Docker or PM2 setup | ❌ | DevOps | Process manager ready |
| 11.10 | Create NGINX configuration | ❌ | DevOps | Routing configured |
| 11.11 | Set up staging environment | ❌ | DevOps | Staging live |
| 11.12 | Deploy to staging and test | ❌ | Dev | Staging works |
| 11.13 | Configure SSL certificate (Let's Encrypt) | ❌ | DevOps | HTTPS working |
| 11.14 | Set environment variables on VPS | ❌ | DevOps | Env vars configured |
| 11.15 | Deploy to production | ❌ | DevOps | Production live |
| 11.16 | Configure DNS | ❌ | DevOps | Domain points to VPS |
| 11.17 | Set up monitoring and logging | ❌ | DevOps | Monitoring active |
| 11.18 | Create deployment documentation | ❌ | Dev | Docs complete |
| 11.19 | Train VP team on admin panel | ❌ | Dev | Team trained |

**Phase 11 Deliverables:**
- ✅ Live production website
- ✅ Staging environment working
- ✅ Monitoring and logging active
- ✅ Team trained and onboarded

---

## Overall Project Status

| Phase | Status | Progress | Notes |
|-------|--------|----------|-------|
| Phase 0: Supabase Foundation | ❌ | 0% | **BLOCKED: Start here** |
| Phase 1: Pages Module | ❌ | 0% | Depends on Phase 0 |
| Phase 2: Core Content | ❌ | 0% | Depends on Phase 0 |
| Phase 3: Quotes & Services | ❌ | 0% | Depends on Phase 0 |
| Phase 4: Engagement | ❌ | 0% | Depends on Phase 0 |
| Phase 5: Media & YouTube | ❌ | 0% | Depends on Phase 0 |
| Phase 6: Google Calendar | ❌ | 0% | Depends on Phase 0 |
| Phase 7: Audit & Security | ❌ | 0% | Depends on Phase 0 |
| Phase 8: Analytics | ❌ | 0% | Depends on Phase 0 |
| Phase 9: Content Migration | ❌ | 0% | Depends on Phases 1-8 |
| Phase 10: Performance | ❌ | 0% | Depends on Phase 9 |
| Phase 11: Deployment | ❌ | 0% | Depends on Phase 10 |

**Next Action:** Begin Phase 0 — Supabase Foundation

---

**Document Control:**  
**Last Updated:** 2025-10-09  
**Update Frequency:** Daily during active development
