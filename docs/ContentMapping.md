# VP Website — Content Mapping & Migration Guide

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md)  
**Source:** gregrusland.com  
**Target:** VP Website (Lasight + Darkone + Supabase)

---

## 1. Content Audit Summary

**Source URL:** https://gregrusland.com  
**Audit Date:** [TBD]  
**Total Pages:** [TBD]  
**Total Assets:** [TBD]  

---

## 2. Page-to-Module Mapping

| Old Page (gregrusland.com) | New Module | New Route | Notes |
|----------------------------|------------|-----------|-------|
| Home / Landing | Pages module (slug: 'home') | `/` | Dynamic sections (hero, about, quotes, services) |
| About Us | Pages module (slug: 'about') | `/about` | Biography, vision, mission |
| Services / Community Solutions | Services module | `/services` | Icon-based service cards |
| Projects / Initiatives | Projects module | `/portfolio` | Progress tracking, image galleries |
| Speeches / Events | Speeches module | `/speeches` | YouTube embeds, PDF downloads |
| News / Updates | News module | `/blog` | Articles with categories |
| Media Gallery | Media module | `/gallery` (TBD) | Photos + YouTube videos |
| Contact | Pages module (slug: 'contact') + Contact Form | `/contact` | Form submissions to `contact_submissions` table |
| Appointments | New feature | `/appointments` | Public appointment booking |

---

## 3. Content Type Mapping

### 3.1 Static Page Content

| Content Element | Current Location | Target Module | Target Field |
|----------------|------------------|---------------|--------------|
| Hero section (title, subtitle, CTA) | Home page HTML | Pages module | `sections` JSONB → `{type: 'hero', ...}` |
| About VP (biography) | About page | Pages module | `sections` JSONB → `{type: 'text', ...}` |
| Vision & Mission statements | About page | Pages module | `sections` JSONB → `{type: 'text', ...}` |
| Contact information | Contact page footer | Pages module | `sections` JSONB → `{type: 'contact_info', ...}` |

### 3.2 Dynamic Content

| Content Type | Current Location | Target Module | Target Table | Notes |
|--------------|------------------|---------------|--------------|-------|
| News articles | Blog/News page | News module | `news` | Categories, featured images |
| Projects/Initiatives | Projects page | Projects module | `projects` | Progress %, status |
| Speeches | Speeches page | Speeches module | `speeches` | YouTube URLs, PDFs |
| Quotes | Homepage carousel | Quotes module | `quotes` | Author, context, featured flag |
| Services | Services page | Services module | `services` | Icon, description |
| Events | Events page | Speeches module | `speeches` | Or create separate Events module |

### 3.3 Media Assets

| Asset Type | Current Location | Target Storage | Notes |
|------------|------------------|----------------|-------|
| Hero images | `/images/hero/` | Supabase Storage `media-uploads` | Optimize for web (WebP) |
| VP photos | `/images/profile/` | Supabase Storage `media-uploads` | High-res + thumbnail |
| Project images | `/images/projects/` | Supabase Storage `media-uploads` | Multiple per project |
| News featured images | `/images/news/` | Supabase Storage `media-uploads` | 1200x630 (social sharing) |
| PDFs (speeches, documents) | `/documents/` | Supabase Storage `documents` | Keep original filenames |
| Icons (services) | `/images/icons/` | Use Iconify library or upload to `media-uploads` | SVG preferred |

---

## 4. Detailed Content Migration Plan

### 4.1 Phase 1: Static Pages (Pages Module)

#### Homepage Sections
Extract from gregrusland.com homepage and map to JSONB sections:

```json
{
  "slug": "home",
  "title": "Home - Vice President Gregory Allan Rusland",
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "order": 1,
      "title": "Vice President of the Republic of Suriname",
      "subtitle": "Gregory Allan Rusland",
      "content": "[Extract from homepage]",
      "image": "hero-vp-office.jpg",
      "cta_text": "Learn More",
      "cta_link": "/about"
    },
    {
      "id": "about_preview",
      "type": "text_image",
      "order": 2,
      "title": "About the Vice President",
      "content": "[Extract from homepage about section]",
      "image": "vp-portrait.jpg",
      "cta_text": "Read Full Biography",
      "cta_link": "/about"
    },
    {
      "id": "quotes",
      "type": "quotes_carousel",
      "order": 3,
      "title": "Featured Quotes",
      "content": "Dynamic quotes from quotes module"
    },
    {
      "id": "services_preview",
      "type": "services_grid",
      "order": 4,
      "title": "Community Solutions",
      "content": "Dynamic services from services module",
      "cta_text": "View All Services",
      "cta_link": "/services"
    },
    {
      "id": "news_preview",
      "type": "news_list",
      "order": 5,
      "title": "Latest News",
      "content": "Dynamic news from news module (limit 3)",
      "cta_text": "All News",
      "cta_link": "/blog"
    },
    {
      "id": "cta_banner",
      "type": "cta",
      "order": 6,
      "title": "Schedule an Appointment",
      "content": "Meet with the Vice President's office to discuss community initiatives.",
      "cta_text": "Book Appointment",
      "cta_link": "/appointments"
    }
  ],
  "meta_title": "Gregory Allan Rusland - Vice President of Suriname",
  "meta_description": "Official website of Vice President Gregory Allan Rusland. Learn about initiatives, community solutions, and schedule appointments.",
  "published": true
}
```

**Migration Steps:**
1. Extract text content from gregrusland.com homepage
2. Download and optimize all hero/section images
3. Create homepage entry in Pages module via admin panel
4. Build each section using section builder
5. Preview before publishing

#### About Page

```json
{
  "slug": "about",
  "title": "About Vice President Gregory Allan Rusland",
  "sections": [
    {
      "id": "biography",
      "type": "text_image",
      "order": 1,
      "title": "Biography",
      "content": "[Full biography text from gregrusland.com/about]",
      "image": "vp-biography-photo.jpg"
    },
    {
      "id": "vision",
      "type": "text",
      "order": 2,
      "title": "Vision for Suriname",
      "content": "[Vision statement]"
    },
    {
      "id": "mission",
      "type": "text",
      "order": 3,
      "title": "Mission",
      "content": "[Mission statement]"
    }
  ],
  "meta_title": "About Gregory Allan Rusland - Vice President of Suriname",
  "meta_description": "Biography, vision, and mission of Vice President Gregory Allan Rusland.",
  "published": true
}
```

#### Contact Page

```json
{
  "slug": "contact",
  "title": "Contact the Vice President's Office",
  "sections": [
    {
      "id": "contact_intro",
      "type": "text",
      "order": 1,
      "title": "Get in Touch",
      "content": "We welcome inquiries from citizens..."
    },
    {
      "id": "contact_form",
      "type": "contact_form",
      "order": 2,
      "title": "Send a Message",
      "content": "Dynamic contact form component"
    },
    {
      "id": "contact_info",
      "type": "contact_info",
      "order": 3,
      "title": "Office Information",
      "content": {
        "address": "[Office address from gregrusland.com]",
        "phone": "[Phone number]",
        "email": "[Contact email]",
        "hours": "[Office hours]"
      }
    }
  ],
  "published": true
}
```

---

### 4.2 Phase 2: Services (Services Module)

Extract all services/solutions from gregrusland.com:

| Service Title | Description | Icon | Category | Featured |
|---------------|-------------|------|----------|----------|
| [Service 1] | [Description] | [icon-name] | [Category] | Yes/No |
| [Service 2] | [Description] | [icon-name] | [Category] | Yes/No |
| ... | ... | ... | ... | ... |

**Migration Steps:**
1. Create spreadsheet with all services
2. Choose icons from Iconify (e.g., Material Design Icons, Remix Icon)
3. Import services via admin panel Services module
4. Set featured services for homepage
5. Verify display on `/services` page

---

### 4.3 Phase 3: Quotes (Quotes Module)

Extract inspirational quotes from homepage and about page:

| Quote Text | Author | Title | Context | Date | Featured |
|------------|--------|-------|---------|------|----------|
| "[Quote 1]" | Gregory Allan Rusland | Vice President | [Event/speech] | YYYY-MM-DD | Yes |
| "[Quote 2]" | [Author] | [Title] | [Context] | YYYY-MM-DD | No |
| ... | ... | ... | ... | ... | ... |

**Migration Steps:**
1. Extract all quotes from old site
2. Add context and attribution
3. Import via Quotes module
4. Set 3-5 featured quotes for homepage carousel
5. Test carousel functionality

---

### 4.4 Phase 4: News & Articles (News Module)

Inventory all news articles from gregrusland.com/news or /blog:

| Title | Slug | Excerpt | Content | Featured Image | Category | Date | Published |
|-------|------|---------|---------|----------------|----------|------|-----------|
| [News 1] | news-1 | [Excerpt] | [Full text] | news1.jpg | Policy | YYYY-MM-DD | Yes |
| ... | ... | ... | ... | ... | ... | ... | ... |

**Migration Steps:**
1. Export all news articles (copy text to Word/Google Docs)
2. Download all featured images
3. Create categories (e.g., Policy, Community, Events)
4. Import articles via News module (one by one or bulk import if available)
5. Set featured articles for homepage
6. Verify article detail pages

---

### 4.5 Phase 5: Projects & Initiatives (Projects Module)

Extract all projects from gregrusland.com/projects:

| Title | Description | Category | Status | Progress % | Images | Start Date | End Date |
|-------|-------------|----------|--------|------------|--------|------------|----------|
| [Project 1] | [Desc] | Education | Active | 65% | [img1.jpg, img2.jpg] | YYYY-MM-DD | YYYY-MM-DD |
| ... | ... | ... | ... | ... | ... | ... | ... |

**Migration Steps:**
1. Create project inventory spreadsheet
2. Download project images (multiple per project)
3. Import via Projects module
4. Add progress tracking and status
5. Verify portfolio page display

---

### 4.6 Phase 6: Speeches & Documents (Speeches Module)

Extract speeches/events from gregrusland.com:

| Title | Date | Location | Description | YouTube URL | PDF Document | Category |
|-------|------|----------|-------------|-------------|--------------|----------|
| [Speech 1] | YYYY-MM-DD | [Location] | [Desc] | https://youtu.be/... | speech1.pdf | Official |
| ... | ... | ... | ... | ... | ... | ... |

**Migration Steps:**
1. Inventory all speeches
2. Download PDFs if available
3. Get YouTube video IDs
4. Import via Speeches module
5. Verify embeds and downloads work

---

### 4.7 Phase 7: Media Gallery (Media Module)

Inventory all media (photos, videos):

| Title | Caption | Type | File/URL | Category | Tags | Featured |
|-------|---------|------|----------|----------|------|----------|
| [Photo 1] | [Caption] | image | photo1.jpg | Official | vp, office | Yes |
| [Video 1] | [Caption] | youtube | https://youtu.be/... | Events | speech, 2024 | No |
| ... | ... | ... | ... | ... | ... | ... |

**Migration Steps:**
1. Download all photos from old site
2. Organize by category (Official, Events, Community)
3. Upload to Media Library
4. Add captions and tags
5. Set featured media
6. Configure YouTube channel sync for future videos

---

## 5. SEO Migration

### 5.1 Meta Data Mapping

| Old Page | Old Title | Old Description | New Title | New Description |
|----------|-----------|-----------------|-----------|-----------------|
| Home | [Old title] | [Old desc] | Gregory Allan Rusland - Vice President of Suriname | Official website of Vice President Gregory Allan Rusland... |
| About | [Old title] | [Old desc] | About Gregory Allan Rusland - Vice President | Biography, vision, and mission of Vice President... |
| ... | ... | ... | ... | ... |

### 5.2 URL Redirects (if domain changes)

| Old URL | New URL | Redirect Type |
|---------|---------|---------------|
| gregrusland.com/ | vp-suriname.com/ | 301 Permanent |
| gregrusland.com/about | vp-suriname.com/about | 301 Permanent |
| ... | ... | ... |

**Implementation:** Configure in NGINX or via redirect rules.

---

## 6. Asset Optimization Checklist

### 6.1 Images
- [ ] Resize images to appropriate dimensions (max 1920px width)
- [ ] Convert to WebP format (with JPEG fallback)
- [ ] Compress images (target: <200KB per image)
- [ ] Generate thumbnails for galleries
- [ ] Add descriptive alt text for accessibility

### 6.2 Documents
- [ ] Optimize PDF file sizes (compress if >5MB)
- [ ] Keep original filenames for SEO
- [ ] Add metadata (title, author, keywords)

### 6.3 Videos
- [ ] Ensure all YouTube videos are set to public or unlisted
- [ ] Create YouTube playlists by category
- [ ] Add video thumbnails to media library
- [ ] Verify embeds work on frontend

---

## 7. Content Migration Timeline

| Phase | Content Type | Duration | Dependencies | Assignee |
|-------|--------------|----------|--------------|----------|
| 1 | Static Pages (Home, About, Contact) | 1 day | Pages module implemented | Content Team |
| 2 | Services | 0.5 day | Services module implemented | Content Team |
| 3 | Quotes | 0.5 day | Quotes module implemented | Content Team |
| 4 | News & Articles | 1-2 days | News module implemented | Content Team |
| 5 | Projects & Initiatives | 1 day | Projects module implemented | Content Team |
| 6 | Speeches & Documents | 1 day | Speeches module implemented | Content Team |
| 7 | Media Gallery | 1 day | Media module + YouTube sync implemented | Content Team |

**Total Estimated Time:** 5-7 days (after all modules are implemented)

---

## 8. Content Review & Approval Process

### 8.1 Review Checklist
- [ ] All text content proofread for grammar and spelling
- [ ] All images display correctly (no broken links)
- [ ] All links work (internal and external)
- [ ] SEO meta data complete for all pages
- [ ] Contact information accurate and up-to-date
- [ ] Quotes attributed correctly
- [ ] Project statuses and progress accurate
- [ ] Speech dates and locations verified

### 8.2 Approval Workflow
1. **Content Team** imports content into admin panel
2. **Content Team** marks as "Draft" for review
3. **Communications Lead** reviews and provides feedback
4. **Content Team** makes revisions
5. **VP Office** gives final approval
6. **Content Team** publishes content

---

## 9. Post-Migration Verification

### 9.1 Functional Testing
- [ ] All pages load correctly
- [ ] All images display
- [ ] All videos embed properly
- [ ] All PDFs download correctly
- [ ] Contact form submits successfully
- [ ] Appointment form works
- [ ] Search functionality works (if implemented)

### 9.2 Content Accuracy
- [ ] Compare old site and new site side-by-side
- [ ] Verify all content migrated (no missing pages/sections)
- [ ] Check for typos introduced during migration
- [ ] Verify dates and numbers are accurate

### 9.3 SEO Verification
- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions
- [ ] All images have alt text
- [ ] Structured data (JSON-LD) implemented where applicable
- [ ] Sitemap generated and submitted to Google
- [ ] Google Analytics tracking working

---

## 10. Ongoing Content Management

### 10.1 Content Update Frequency
| Content Type | Update Frequency | Responsible Party |
|--------------|------------------|-------------------|
| News | Weekly or as needed | Communications Team |
| Projects | Monthly (progress updates) | Policy Team |
| Speeches | After each public event | Communications Team |
| Quotes | Monthly (rotate featured) | Communications Team |
| Services | Quarterly or as needed | Policy Team |
| Events | Weekly | Executive Assistant |

### 10.2 Content Calendar (Template)
| Date | Content Type | Title | Assignee | Status |
|------|--------------|-------|----------|--------|
| 2025-10-15 | News | [Article title] | [Name] | Draft |
| 2025-10-20 | Speech | [Speech title] | [Name] | Scheduled |
| ... | ... | ... | ... | ... |

---

## 11. Training Materials

### 11.1 Admin Panel User Guide
- **How to add a news article** (step-by-step with screenshots)
- **How to upload media** (drag-and-drop guide)
- **How to edit homepage sections** (section builder tutorial)
- **How to publish/unpublish content** (toggle guide)
- **How to review appointment requests** (workflow guide)

**Location:** `/docs/training/` (to be created)

### 11.2 Training Schedule
- **Session 1 (1 hour):** Overview of admin panel, navigation, dashboard
- **Session 2 (1 hour):** Content management (news, projects, speeches)
- **Session 3 (30 min):** Media library and uploads
- **Session 4 (30 min):** Appointment and contact management
- **Session 5 (30 min):** Q&A and best practices

---

**Document Control:**  
**Author:** Content Team  
**Next Review:** After content migration completion  
**Status:** Awaiting module implementation before migration begins
