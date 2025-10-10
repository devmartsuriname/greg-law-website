# Phase 6B Step 4: Testing & Validation Checklist

## Overview
This checklist ensures visual parity between static (`/`) and dynamic (`/preview/home`) homepages after database seeding.

**Status:** ✅ Code integrated, ⏳ Database seeding pending  
**Last Updated:** Phase 6B Step 4

---

## Pre-Flight Checks

### Database Seeding
- [ ] Run SQL script in Supabase SQL Editor: `docs/tasks/phase6b-step4-seeding.sql`
- [ ] Verify backup table created: `pages_backup_20251210`
- [ ] Confirm all 9 sections have data (check query results)
- [ ] Verify related tables have published records:
  - [ ] Services: 6+ published records
  - [ ] Team members: 4+ published records
  - [ ] News: 3+ published records
  - [ ] Quotes: 3+ published records

---

## Visual Parity Testing

### Side-by-Side Comparison
Open two browser windows:
- **Window 1:** `http://localhost:8080/` (static)
- **Window 2:** `http://localhost:8080/preview/home` (dynamic)

### Section 1: Hero Banner
- [ ] Background image displays correctly
- [ ] Title matches exactly (with HTML formatting)
- [ ] Subtitle text matches
- [ ] CTA button present and functional
- [ ] Button link navigates correctly
- [ ] Portrait image visible

### Section 2: About Enhanced
- [ ] Section label displays
- [ ] Title with HTML spans renders correctly
- [ ] Two paragraphs of text match
- [ ] 4 features in checklist (2 columns)
- [ ] Phone numbers display with "or" separator
- [ ] Signature image visible
- [ ] Signature name and title present
- [ ] Video thumbnail displays
- [ ] Play button functional
- [ ] 3 KPI counters visible
- [ ] KPI animations work (count-up effect)

### Section 3: Services Grid Dynamic
- [ ] 6 service cards visible
- [ ] Icons display correctly (Font Awesome/Flaticon)
- [ ] Service titles match
- [ ] Descriptions present
- [ ] Service links functional
- [ ] Side image visible (experience years overlay)
- [ ] "25+ Years Experience" overlay text
- [ ] Decorative icons (icon-one, icon-two) animate in

### Section 4: Career Timeline
- [ ] 3-4 career period cards visible
- [ ] Period dates display (e.g., "2020", "2015-2020")
- [ ] Job titles match
- [ ] Descriptions present
- [ ] Cards align horizontally
- [ ] Fill line decorations visible

### Section 5: Metrics Counter
- [ ] 3-4 metric counters visible
- [ ] Icons display correctly
- [ ] Numbers animate (count-up effect)
- [ ] Suffixes display ("+", "%")
- [ ] Labels present under each counter
- [ ] Wow animations trigger on scroll

### Section 6: Testimonials (Quotes)
- [ ] Section title displays: "Leadership Vision"
- [ ] Subtitle: "Words that guide our vision"
- [ ] 3 quote cards visible
- [ ] Quote text displays correctly
- [ ] Author name: "Gregory Allan Rusland"
- [ ] Author title: "Vice President of Suriname"
- [ ] Carousel initialized (owl-carousel)

### Section 7: Team Grid
- [ ] Section title displays: "Our Team"
- [ ] Subtitle with HTML formatting
- [ ] Description text present
- [ ] 4 team member cards visible
- [ ] Photos display correctly (or fallback image)
- [ ] Names present
- [ ] Titles/positions display
- [ ] Social icons visible on hover
- [ ] Wow animations stagger correctly (0ms, 300ms, 600ms, 900ms)

### Section 8: News Preview
- [ ] Section title: "Latest News"
- [ ] Subtitle with HTML formatting
- [ ] Description text present
- [ ] 3 news cards visible
- [ ] Featured images display (or fallback)
- [ ] Publication dates formatted correctly
- [ ] Titles present
- [ ] "View more" buttons functional
- [ ] Links navigate to `/blog/{slug}`
- [ ] Plus icon overlay on images
- [ ] Wow animations stagger correctly

### Section 9: Contact CTA Enhanced
- [ ] Section title displays
- [ ] Contact form renders:
  - [ ] First name field
  - [ ] Last name field
  - [ ] Email field
  - [ ] Message textarea
  - [ ] Submit button
- [ ] Office information displays:
  - [ ] Address with map pin icon
  - [ ] Phone number with phone icon
  - [ ] Email with chat icon
- [ ] Map section visible (if configured)
- [ ] Form submission works

---

## Responsive Testing

### Desktop (1920px)
- [ ] All sections display correctly
- [ ] No horizontal scroll
- [ ] Images not distorted
- [ ] Text readable

### Tablet (768px)
- [ ] Services grid: 2 columns
- [ ] Team grid: 2 columns
- [ ] News grid: 2 columns then 1
- [ ] Text reflows properly
- [ ] Touch targets adequate size

### Mobile (375px)
- [ ] All grids stack to 1 column
- [ ] Images scale properly
- [ ] Text remains readable
- [ ] Buttons full-width
- [ ] Forms usable
- [ ] No overflow issues

---

## Browser Console Checks

### No Errors
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No Supabase query errors
- [ ] No 404 image errors

### Successful Data Fetches
- [ ] `usePage('home')` resolves
- [ ] `useDynamicTeam()` returns data
- [ ] `useDynamicNews()` returns data
- [ ] `useQuotes()` returns data
- [ ] All images load or fallback gracefully

---

## Performance Testing

### Lighthouse Audit
Run Lighthouse on `/preview/home`:
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 90
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 90

### Page Load Metrics
- [ ] First Contentful Paint: < 1.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Time to Interactive: < 3s
- [ ] Total page load: < 2s

### Network Analysis
- [ ] Check number of requests (should be similar to static)
- [ ] Check total page size (should be similar to static)
- [ ] Verify images lazy-load below fold
- [ ] Check Supabase query time (should be < 500ms)

---

## Functional Testing

### Navigation
- [ ] CTA buttons navigate correctly
- [ ] Service links work
- [ ] News links work
- [ ] Social links work (if applicable)
- [ ] Logo link works

### Forms
- [ ] Contact form accepts input
- [ ] Form validation works
- [ ] Submit triggers correctly
- [ ] Error messages display

### Animations
- [ ] Wow.js animations trigger on scroll
- [ ] Counter animations work
- [ ] Carousel auto-plays (if configured)
- [ ] Hover effects work

---

## SEO Validation

### Meta Tags
- [ ] `<title>` tag present and correct
- [ ] `<meta name="description">` present
- [ ] Title matches database `meta_title`
- [ ] Description matches database `meta_description`

### Heading Hierarchy
- [ ] Single H1 on page
- [ ] H2s and H3s properly nested
- [ ] Semantic HTML used (`<section>`, `<article>`)

### Images
- [ ] All images have `alt` attributes
- [ ] Alt text descriptive and relevant
- [ ] No missing or broken images

---

## Data Integrity Checks

### Database Queries
Run in Supabase SQL Editor:

```sql
-- Verify all sections have data
SELECT 
  section->>'type' as type,
  section->>'order' as order,
  CASE 
    WHEN section->'data' = '{}'::jsonb THEN '❌ Empty'
    ELSE '✅ Has Data'
  END as status
FROM pages, jsonb_array_elements(sections) as section
WHERE slug = 'home'
ORDER BY (section->>'order')::int;
```

Expected: All sections show "✅ Has Data"

```sql
-- Verify related tables
SELECT 
  'services' as table_name, COUNT(*) as count 
FROM services WHERE published = true
UNION ALL
SELECT 
  'team_members', COUNT(*) 
FROM team_members WHERE published = true
UNION ALL
SELECT 
  'news', COUNT(*) 
FROM news WHERE published = true
UNION ALL
SELECT 
  'quotes', COUNT(*) 
FROM quotes WHERE published = true;
```

Expected: All counts > 0

---

## Known Issues & Fixes

### Issue: Sections don't render
**Cause:** Data not seeded in database  
**Fix:** Run `docs/tasks/phase6b-step4-seeding.sql`

### Issue: Team/News sections empty
**Cause:** No published records in related tables  
**Fix:** Add published records via admin panel

### Issue: Animations not working
**Cause:** WOW.js not initialized  
**Fix:** Verify WOW.js script loaded in layout

### Issue: Images 404
**Cause:** Image paths incorrect or missing  
**Fix:** Update image URLs in database or add placeholder images

---

## Rollback Procedure

If critical issues found:

1. **Database rollback:**
```sql
UPDATE pages 
SET sections = (SELECT sections FROM pages_backup_20251210 LIMIT 1)
WHERE slug = 'home';
```

2. **Code rollback:**
   - Preview route still isolated at `/preview/home`
   - Static homepage at `/` unaffected
   - No code changes needed to rollback

---

## Sign-Off

### QA Lead
- [ ] All visual parity checks passed
- [ ] All functional tests passed
- [ ] All performance benchmarks met
- [ ] Ready for production cutover

**Signature:** ________________  
**Date:** ________________

### Technical Lead
- [ ] Code review completed
- [ ] Database backup verified
- [ ] Rollback procedure tested
- [ ] Documentation complete

**Signature:** ________________  
**Date:** ________________

---

## Next Steps

After all checks pass:

**Step 5:** Final parity verification and screenshot comparison  
**Step 6:** Prepare for production cutover  
**Step 7:** Execute cutover (rename files)  
**Step 8:** Post-deployment validation  
**Step 9:** Monitor analytics and user feedback

---

## Success Criteria

✅ **All sections render correctly**  
✅ **100% visual parity with static homepage**  
✅ **No console errors or warnings**  
✅ **Performance metrics meet targets**  
✅ **Responsive design works on all breakpoints**  
✅ **SEO metadata properly configured**  
✅ **All dynamic data loads successfully**  
✅ **Forms and interactions functional**

**Status:** ⏳ Pending database seeding and testing
