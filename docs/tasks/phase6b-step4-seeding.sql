-- ============================================
-- Phase 6B Step 4: Database Seeding Script
-- ============================================
-- Run this script in Supabase SQL Editor
-- https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new

-- 1. Create backup of current pages table
CREATE TABLE IF NOT EXISTS pages_backup_20251210 AS 
SELECT * FROM pages WHERE slug = 'home';

-- Verify backup created
SELECT 'Backup created successfully' as status, 
       COUNT(*) as records_backed_up 
FROM pages_backup_20251210;

-- ============================================
-- 2. Update Section 6: Testimonials
-- ============================================
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{5,data}',
  '{
    "sectionLabel": "Leadership Vision",
    "sectionTitle": "Words that guide our <span>vision</span>",
    "limit": 3
  }'::jsonb
)
WHERE slug = 'home';

-- Verify testimonials section
SELECT 'Testimonials section updated' as status,
       jsonb_pretty(sections->'5') as section_data
FROM pages WHERE slug = 'home';

-- ============================================
-- 3. Update Section 7: Team Grid
-- ============================================
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{6,data}',
  '{
    "sectionLabel": "Our Team",
    "sectionTitle": "We feel very proud for our <br /> great <span>achievement</span>",
    "description": "Our experienced professionals are dedicated to providing exceptional service and achieving the best possible outcomes.",
    "limit": 4
  }'::jsonb
)
WHERE slug = 'home';

-- Verify team section
SELECT 'Team section updated' as status,
       jsonb_pretty(sections->'6') as section_data
FROM pages WHERE slug = 'home';

-- ============================================
-- 4. Update Section 8: News Preview
-- ============================================
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{7,data}',
  '{
    "sectionLabel": "Latest News",
    "sectionTitle": "Stay informed with<br /> our latest <span>news</span>",
    "description": "Stay updated with the latest announcements, initiatives, and achievements from the Office of Vice President Gregory Allan Rusland.",
    "limit": 3,
    "cta": {
      "text": "View All News",
      "link": "/blog"
    }
  }'::jsonb
)
WHERE slug = 'home';

-- Verify news section
SELECT 'News section updated' as status,
       jsonb_pretty(sections->'7') as section_data
FROM pages WHERE slug = 'home';

-- ============================================
-- 5. Verification: Check all sections
-- ============================================
SELECT 
  'All sections verification' as status,
  jsonb_array_length(sections) as total_sections,
  (
    SELECT COUNT(*) 
    FROM jsonb_array_elements(sections) as section
    WHERE section->>'data' != '{}'
  ) as sections_with_data
FROM pages WHERE slug = 'home';

-- ============================================
-- 6. Check related table data
-- ============================================
-- Check services
SELECT 'Services check' as table_name, 
       COUNT(*) as published_count 
FROM services WHERE published = true;

-- Check team members
SELECT 'Team members check' as table_name, 
       COUNT(*) as published_count 
FROM team_members WHERE published = true;

-- Check news
SELECT 'News check' as table_name, 
       COUNT(*) as published_count 
FROM news WHERE published = true;

-- Check quotes (for testimonials)
SELECT 'Quotes check' as table_name, 
       COUNT(*) as published_count 
FROM quotes WHERE published = true;

-- ============================================
-- 7. Full homepage sections overview
-- ============================================
SELECT 
  section->>'id' as section_id,
  section->>'type' as section_type,
  section->>'order' as section_order,
  CASE 
    WHEN section->'data' = '{}'::jsonb THEN 'Empty'
    WHEN jsonb_typeof(section->'data') = 'object' AND jsonb_array_length(jsonb_object_keys(section->'data')::jsonb) > 0 THEN 'Has Data'
    ELSE 'Unknown'
  END as data_status
FROM pages, jsonb_array_elements(sections) as section
WHERE slug = 'home'
ORDER BY (section->>'order')::int;

-- ============================================
-- ROLLBACK (if needed)
-- ============================================
-- Uncomment and run this to rollback to backup:
/*
UPDATE pages 
SET sections = (SELECT sections FROM pages_backup_20251210 LIMIT 1)
WHERE slug = 'home';

SELECT 'Rollback completed' as status;
*/

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 
  '✅ Phase 6B Step 4 Complete' as message,
  'All homepage sections seeded successfully' as details,
  'Visit /preview/home to test' as next_step;
