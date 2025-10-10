# Phase 6B Step 3: Dynamic Homepage Preview Route

## Overview
This document describes the preview route implementation for the dynamic homepage.

**Created:** Phase 6B Step 3  
**Status:** ✅ Complete  
**Preview URL:** `/preview/home`  
**Static URL:** `/` (unchanged)

---

## Purpose
Create a safe, non-destructive preview of the dynamic homepage that allows side-by-side comparison with the static version before final cutover.

---

## Implementation

### 1. Component: `src/pages/HomeDynamic.tsx`

**Purpose:** Dynamic homepage component that fetches sections from database

**Key Features:**
- Uses `usePage('home')` hook to fetch page data from Supabase
- Renders sections using `PageSection` component
- Includes loading state with spinner
- Handles errors gracefully with user-friendly messages
- Supports SEO metadata from database (`meta_title`, `meta_description`)
- Sorts sections by `order` property before rendering

**Code Structure:**
```typescript
import { Helmet } from 'react-helmet-async';
import { PageSection } from '@/components/PageSection';
import { usePage } from '@/hooks/usePages';

export default function HomeDynamic() {
  const { page, loading, error } = usePage('home');
  
  // Loading state with spinner
  if (loading) return <LoadingSpinner />;
  
  // Error state with helpful message
  if (error) return <ErrorMessage />;
  
  // No page found state
  if (!page) return <NotFoundMessage />;
  
  // Render sections sorted by order
  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description} />
      </Helmet>
      
      {page.sections
        ?.sort((a, b) => a.order - b.order)
        .map((section) => (
          <PageSection key={section.id} section={section} />
        ))}
    </>
  );
}
```

---

### 2. Route Configuration: `src/App.tsx`

**Added:**
```typescript
// Import
const HomeDynamic = lazy(() => import('./pages/HomeDynamic'));

// Route
<Route path="preview/home" element={<HomeDynamic />} />
```

**Location:** Inside MainLayout, before other routes  
**Access:** `http://localhost:8080/preview/home`

---

## User Experience

### Loading State
```
┌─────────────────────────────────┐
│                                 │
│      ⟳  Loading spinner         │
│   Loading dynamic homepage...   │
│                                 │
└─────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────┐
│  ⚠️ Error Loading Page          │
│                                 │
│  [Error message from Supabase]  │
│                                 │
│  Please check your database     │
│  connection or contact support. │
└─────────────────────────────────┘
```

### Not Found State
```
┌─────────────────────────────────┐
│  ⚠️ Page Not Found              │
│                                 │
│  The homepage has not been      │
│  configured yet.                │
│                                 │
│  Please create a page with      │
│  slug "home" in the admin panel.│
└─────────────────────────────────┘
```

### Success State
Renders all sections from database in order, identical to static homepage.

---

## Testing Guide

### 1. Basic Functionality Test
1. Navigate to `/preview/home`
2. Verify page loads without errors
3. Check console for any warnings
4. Confirm all sections render correctly

### 2. Side-by-Side Comparison
Open two browser windows:
- Window 1: `http://localhost:8080/` (static)
- Window 2: `http://localhost:8080/preview/home` (dynamic)

**Compare:**
- [ ] Visual layout matches exactly
- [ ] All text content identical
- [ ] Images load correctly
- [ ] Animations work (wow.js)
- [ ] Links function properly
- [ ] Forms work correctly
- [ ] Spacing and typography match
- [ ] Colors and styling identical
- [ ] Responsive behavior consistent

### 3. Loading State Test
1. Throttle network to Slow 3G in DevTools
2. Refresh `/preview/home`
3. Verify loading spinner displays
4. Check loading message shows

### 4. Error State Test
1. Temporarily disable Supabase connection
2. Visit `/preview/home`
3. Verify error message displays
4. Check error is user-friendly

### 5. SEO Metadata Test
1. View page source on `/preview/home`
2. Verify `<title>` tag contains correct content
3. Check `<meta name="description">` is present
4. Confirm meta tags match database values

### 6. Section Order Test
1. In admin, edit page sections order
2. Change `order` values (e.g., swap section 1 and 2)
3. Refresh `/preview/home`
4. Verify sections render in new order

### 7. Performance Test
1. Open DevTools Performance tab
2. Record page load of `/preview/home`
3. Check metrics:
   - First Contentful Paint < 1s
   - Largest Contentful Paint < 2.5s
   - Time to Interactive < 3s
4. Compare with static `/` page performance

---

## Data Requirements

### Database: `pages` table must contain:
```sql
SELECT * FROM pages WHERE slug = 'home' AND published = true;
```

**Required fields:**
- `id` (uuid)
- `slug` = 'home'
- `title` (e.g., "Home")
- `meta_title` (e.g., "Gregory Allan Rusland - VP of Suriname")
- `meta_description` (SEO description)
- `sections` (JSONB array, see below)
- `published` = true

### Sections Structure:
```json
{
  "sections": [
    {
      "id": "uuid-1",
      "type": "hero",
      "order": 0,
      "data": { /* section-specific data */ }
    },
    {
      "id": "uuid-2",
      "type": "features",
      "order": 1,
      "data": { /* section-specific data */ }
    }
    // ... 7 more sections
  ]
}
```

**Required section types for homepage:**
1. `hero` (order: 0)
2. `features` (order: 1)
3. `about_enhanced` (order: 2)
4. `career_timeline` (order: 3)
5. `services_grid_dynamic` (order: 4)
6. `testimonials` (order: 5)
7. `team_grid` (order: 6)
8. `news_preview` (order: 7)
9. `contact_cta_enhanced` (order: 8)

---

## Known Limitations (Phase 6B)

### Current:
- ❌ No caching (re-fetches on every mount)
- ❌ No real-time updates (requires refresh)
- ❌ No optimistic UI updates
- ❌ No skeleton loaders (simple spinner only)
- ❌ Section enable/disable toggle not implemented

### Future Enhancements (Phase 7+):
- ✅ Add React Query for caching
- ✅ Implement stale-while-revalidate
- ✅ Add skeleton loaders per section type
- ✅ Real-time section updates via Supabase subscriptions
- ✅ Admin CMS live preview mode
- ✅ A/B testing capability
- ✅ Section visibility rules (auth-based)

---

## Troubleshooting

### Issue: "Page Not Found" message displays
**Cause:** No page with `slug = 'home'` exists in database  
**Solution:** 
1. Go to Admin → Pages
2. Create new page with slug "home"
3. Add all 9 sections (see data seeding docs)
4. Set `published = true`

### Issue: Blank sections render
**Cause:** Section `data` field is empty or malformed  
**Solution:**
1. Check `pages.sections[].data` in database
2. Verify JSON structure matches `docs/tasks/phase6b-section-types.md`
3. Ensure all required fields present

### Issue: Sections render in wrong order
**Cause:** `order` property not set correctly  
**Solution:**
1. Check `pages.sections[].order` values
2. Ensure sequential (0, 1, 2, 3, ...)
3. No duplicates or gaps

### Issue: Dynamic data not loading (team, news, services)
**Cause:** Related tables empty or RLS blocking access  
**Solution:**
1. Check tables have published records
2. Verify RLS policies allow public read access
3. Check browser console for Supabase errors

### Issue: Layout differs from static page
**Cause:** CSS classes or animations not matching  
**Solution:**
1. Compare HTML structure in DevTools
2. Check `PageSection.tsx` section type implementation
3. Verify `wow` animation classes present
4. Ensure Bootstrap classes match static version

---

## Success Metrics

✅ **Functional Requirements:**
- [ ] Preview route accessible at `/preview/home`
- [ ] Static route unchanged at `/`
- [ ] All 9 sections render correctly
- [ ] Loading state displays during fetch
- [ ] Error handling works properly
- [ ] SEO metadata applied correctly

✅ **Visual Parity:**
- [ ] Layout matches static homepage 100%
- [ ] Typography identical
- [ ] Spacing consistent
- [ ] Colors match exactly
- [ ] Images display correctly
- [ ] Animations work (wow.js)

✅ **Performance:**
- [ ] Page load < 2 seconds
- [ ] No console errors
- [ ] No layout shifts (CLS)
- [ ] Smooth animations
- [ ] Responsive on all breakpoints

✅ **Code Quality:**
- [ ] TypeScript compiles without errors
- [ ] No ESLint warnings
- [ ] Component properly typed
- [ ] Loading/error states handled
- [ ] SEO best practices followed

---

## Next Steps

**Step 4:** Seed database with homepage section data  
- Extract all content from static `Home.tsx`  
- Structure as JSONB for each section type  
- Insert into `pages.sections` field  
- Verify data integrity

**Step 5:** Visual QA and parity validation  
- Screenshot comparison (static vs dynamic)  
- Pixel-perfect validation  
- Cross-browser testing  
- Mobile responsiveness check

**Step 6:** Production cutover preparation  
- Create database backup  
- Create file backup of `Home.tsx`  
- Document rollback procedure  
- Get stakeholder approval

**Step 7:** Production cutover  
- Rename `Home.tsx` → `HomeStatic.backup.tsx`  
- Rename `HomeDynamic.tsx` → `Home.tsx`  
- Test production build  
- Monitor for issues

---

## Rollback Procedure
If issues arise:
1. Preview route is isolated - no impact on production
2. Static homepage at `/` remains fully functional
3. Can delete `/preview/home` route if needed
4. No database changes required
5. No user-facing impact

---

## Documentation Links
- Section Types: `docs/tasks/phase6b-section-types.md`
- Dynamic Hooks: `docs/tasks/phase6b-step2-hooks.md`
- Backend Schema: `docs/backend.md`
- Admin Guide: `docs/admin-guide.md`
