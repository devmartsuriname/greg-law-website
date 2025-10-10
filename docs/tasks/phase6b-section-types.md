# Phase 6B: Dynamic Homepage Section Types

## Overview
This document describes all section types available in `PageSection.tsx` for the dynamic homepage implementation.

**Last Updated:** Phase 6B Step 1 - Section Type Extension  
**Status:** ✅ Complete - All 9 section types implemented

---

## Section Types Reference

### 1. `hero` (existing)
**Purpose:** Main hero banner with portrait and CTA  
**Layout:** Left image, right content  
**Classes:** `.banner-section-two`

**Data Structure:**
```json
{
  "type": "hero",
  "data": {
    "backgroundImage": "/images/main-slider/2.jpg",
    "image": "/images/main-slider/content-image-1.png",
    "title": "Gregory Allan Rusland <br /> Vice President of the Republic of Suriname",
    "subtitle": "Serving Suriname with integrity, vision, and commitment to progress...",
    "buttonText": "ABOUT GREGORY",
    "buttonLink": "/contact"
  }
}
```

---

### 2. `about_enhanced` (NEW - Phase 6B)
**Purpose:** Enhanced about section with signature, phones, checklist, video, and KPIs  
**Layout:** Two columns - content left, video+KPIs right  
**Classes:** `.about-section.style-two`

**Data Structure:**
```json
{
  "type": "about_enhanced",
  "data": {
    "sectionLabel": "About Gregory",
    "title": "Serving Suriname with <span>vision & integrity</span>",
    "content": "<p>I am Gregory Allan Rusland...</p><p>Through collaborative leadership...</p>",
    "features": [
      "Economic development and growth.",
      "Youth empowerment and education.",
      "International partnerships.",
      "Sustainable development initiatives."
    ],
    "contactLabel": "VP Office",
    "phones": ["+597 472 000", "+597 472-001"],
    "signature": {
      "image": "/images/icons/signature.png",
      "name": "Gregory Allan Rusland",
      "title": "Vice President"
    },
    "videoImage": "/images/resource/video-img.jpg",
    "videoUrl": "https://www.youtube.com/watch?v=kxPCFljwJws",
    "kpis": [
      { "value": 15, "suffix": "", "label": "Years of Service", "description": "Public service dedication" },
      { "value": 50, "suffix": "+", "label": "Policy Initiatives", "description": "Development programs" },
      { "value": 100, "suffix": "", "label": "Citizens Impacted", "description": "Community reach" }
    ]
  }
}
```

**Animations:** `wow fadeInLeft` on KPI counters with staggered delays (0ms, 300ms, 600ms)

---

### 3. `services_grid_dynamic` (NEW - Phase 6B)
**Purpose:** 6 services in grid + side image with experience overlay  
**Layout:** 8-column services grid + 4-column side image  
**Classes:** `.services-section-three`

**Data Structure:**
```json
{
  "type": "services_grid_dynamic",
  "data": {
    "services": [
      {
        "icon": "fa fa-bullhorn",
        "title": "Economic Development",
        "slug": "economic-development",
        "description": "Driving sustainable growth..."
      }
    ],
    "sideImage": {
      "url": "/images/resource/about-2.jpg",
      "alt": "Legal Services Experience",
      "overlay": "15 <span>years of public service experience</span>"
    }
  }
}
```

**Animations:** 
- `wow fadeInUp` on service blocks (0ms, 300ms alternating)
- `wow fadeInLeft` on decorative icon-one (250ms)
- `wow fadeInRight` on decorative icon-two (500ms)

**TODO:** Connect to `useServices()` hook to fetch from `services` table

---

### 4. `career_timeline` (NEW - Phase 6B)
**Purpose:** 3 career milestone periods  
**Layout:** 3 equal columns  
**Classes:** `.feature-section-two`

**Data Structure:**
```json
{
  "type": "career_timeline",
  "data": {
    "items": [
      {
        "period": "2005-2010",
        "title": "Minister of Natural Resources",
        "text": "Led national resource management..."
      },
      {
        "period": "2010-2015",
        "title": "Member of Parliament, NPS",
        "text": "Represented constituents..."
      },
      {
        "period": "2020-Present",
        "title": "Vice President of Suriname",
        "text": "Leading national development..."
      }
    ]
  }
}
```

---

### 5. `metrics_counter` (NEW - Phase 6B)
**Purpose:** Animated KPI counters (standalone section)  
**Layout:** 4 equal columns  
**Classes:** `.counter-section`, `.fact-counter.style-three`

**Data Structure:**
```json
{
  "type": "metrics_counter",
  "data": {
    "items": [
      { "icon": "fa fa-briefcase", "value": 125, "suffix": "+", "label": "Community Programs" },
      { "icon": "flaticon-teamwork", "value": 45, "suffix": "+", "label": "Policy Initiatives" },
      { "icon": "flaticon-ribbon-badge-award", "value": 18, "suffix": "+", "label": "Regional Partnerships" },
      { "icon": "flaticon-multiple-users-silhouette", "value": 85, "suffix": "+", "label": "Government Officials" }
    ]
  }
}
```

**Animations:** `wow fadeInLeft` with staggered delays (0ms, 300ms, 600ms, 900ms)  
**Counter Animation:** Uses `data-speed` and `data-stop` attributes for counting effect

---

### 6. `team_grid` (NEW - Phase 6B)
**Purpose:** Display team members (fetch from `team_members` table)  
**Layout:** 4 columns  
**Classes:** `.team-section`

**Data Structure:**
```json
{
  "type": "team_grid",
  "data": {
    "sectionLabel": "Our Team",
    "sectionTitle": "We feel very proud for our <br /> great <span>achievement</span>",
    "description": "Our experienced professionals are dedicated...",
    "members": [
      {
        "name": "Gregory Law",
        "title": "Senior Attorney",
        "photo_url": "/images/resource/team-1.jpg",
        "social_links": {
          "facebook": "#",
          "twitter": "#",
          "linkedin": "#"
        }
      }
    ]
  }
}
```

**Animations:** `wow fadeInUp` with staggered delays (0ms, 300ms, 600ms, 900ms)

**TODO:** Connect to `useDynamicTeam()` hook to fetch from `team_members` table

---

### 7. `news_preview` (NEW - Phase 6B)
**Purpose:** Display latest 3 news items  
**Layout:** 3 equal columns  
**Classes:** `.news-section.style-two`

**Data Structure:**
```json
{
  "type": "news_preview",
  "data": {
    "sectionLabel": "Latest News",
    "sectionTitle": "Stay informed with<br /> our latest <span>news</span>",
    "description": "Stay updated with the latest announcements...",
    "news": [
      {
        "title": "New Economic Initiative Launched",
        "featured_image": "/images/resource/news-1.jpg",
        "published_at": "2024-12-15T00:00:00Z",
        "slug": "new-economic-initiative"
      }
    ]
  }
}
```

**Animations:** `wow fadeInLeft` with staggered delays (0ms, 300ms, 600ms)

**TODO:** Connect to `useDynamicNews()` hook to fetch from `news` table

---

### 8. `contact_cta_enhanced` (NEW - Phase 6B)
**Purpose:** Contact form with office info and map  
**Layout:** Full-width with embedded map  
**Classes:** `.contact-form-section`

**Data Structure:**
```json
{
  "type": "contact_cta_enhanced",
  "data": {
    "sectionLabel": "Contact us",
    "title": "Feel free to ask any <br /> question to <span>Us</span>",
    "formEndpoint": "/contact",
    "contacts": {
      "address": "380 St Kilda Road, Melbourne VIC 3004, Australia",
      "phone": "+123 (4567) 890",
      "email": "info@greglaw.com"
    },
    "mapConfig": {
      "zoom": "12",
      "lat": "-37.817085",
      "lng": "144.955631",
      "type": "roadmap",
      "hue": "#ffc400",
      "title": "Greg Law",
      "iconPath": "/images/icons/map-marker.png",
      "content": "Melbourne VIC 3000, Australia<br><a href='mailto:info@greglaw.com'>info@greglaw.com</a>"
    }
  }
}
```

---

### 9. `features` (existing)
**Purpose:** 3 action tiles (Meeting / Services / Contact)  
**Layout:** 3 equal columns  
**Classes:** `.feature-section`

**Data Structure:**
```json
{
  "type": "features",
  "data": {
    "features": [
      { "icon": "flaticon-calendar", "label": "Request a", "title": "Meeting" },
      { "icon": "flaticon-link-symbol", "label": "Citizen", "title": "Services" },
      { "icon": "flaticon-calendar", "label": "Contact", "title": "VP Office" }
    ]
  }
}
```

---

### 10-12. Other Existing Types

**`about`** - Basic about section (legacy, prefer `about_enhanced`)  
**`services_grid`** - Static services grid (legacy, prefer `services_grid_dynamic`)  
**`testimonials`** - Testimonials carousel (uses `quotes` table via `QuotesCarousel` component)  
**`text`** - Simple text section  
**`image`** - Simple image section

---

## Implementation Notes

### Animation Classes
All `wow` animations require the WOW.js library to be initialized:
- `wow fadeInLeft` - Fade in from left
- `wow fadeInUp` - Fade in from bottom
- `wow fadeInRight` - Fade in from right
- `data-wow-delay` - Delay in milliseconds
- `data-wow-duration` - Animation duration

### Icon Classes
- **Font Awesome:** `fa fa-[icon-name]`
- **Flaticon:** `flaticon-[icon-name]`
- **Iconify:** Use `<Icon icon="[collection]:[name]" />` component

### Data Validation
All new section types check for empty data and return `null` if:
```tsx
if (!data || Object.keys(data).length === 0) return null;
```

### Dynamic Data Hooks (Phase 6B Step 2)
The following hooks will be created in `src/hooks/useDynamicContent.ts`:
- `useDynamicServices()` - Fetch services from `services` table
- `useDynamicTeam()` - Fetch team members from `team_members` table
- `useDynamicNews()` - Fetch latest news from `news` table
- `useDynamicQuotes()` - Already exists as `useQuotes()`

---

## Next Steps

✅ **Step 1 Complete:** All section types implemented in `PageSection.tsx`

**Step 2:** Create `src/hooks/useDynamicContent.ts` with data fetching hooks  
**Step 3:** Create `src/pages/HomeDynamic.tsx` to render dynamic sections  
**Step 4:** Add preview route `/preview/home`  
**Step 5:** Seed database with homepage section data  
**Step 6:** QA testing and parity validation  
**Step 7:** Production cutover

---

## Rollback Procedure
If issues arise:
1. No changes to static `Home.tsx` - it remains functional
2. Database `pages.home.sections` can be edited via Admin CMS
3. Component accepts empty data gracefully (returns `null`)
4. No breaking changes to existing section types
