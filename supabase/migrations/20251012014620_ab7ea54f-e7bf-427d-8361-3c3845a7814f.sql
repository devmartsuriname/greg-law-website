-- Fix metrics counter on preview/home page

-- Step 1: Add KPIs to the about_enhanced section (index 2) in preview/home
UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{2,data,kpis}',
  '[
    {"value": 15, "suffix": "+", "label": "Years of Service", "description": "Public service dedication"},
    {"value": 6, "suffix": "+", "label": "Policy Initiatives", "description": "Development programs"},
    {"value": 10, "suffix": "K+", "label": "Citizens Impacted", "description": "Community reach"}
  ]'::jsonb
)
WHERE slug = 'preview/home';

-- Step 2: Remove standalone metrics_counter section and reorder
UPDATE pages
SET sections = (
  SELECT jsonb_agg(
    jsonb_set(
      elem,
      '{order}',
      to_jsonb(
        CASE 
          WHEN (elem->>'order')::int > 3 THEN (elem->>'order')::int - 1
          ELSE (elem->>'order')::int
        END
      )
    )
  )
  FROM jsonb_array_elements(sections) AS elem
  WHERE elem->>'type' != 'metrics_counter'
)
WHERE slug = 'preview/home';

-- Verify the changes
SELECT 
  slug,
  jsonb_array_length(sections) as section_count,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'order', s->>'order',
        'type', s->>'type',
        'has_kpis', CASE WHEN s->'data'->'kpis' IS NOT NULL THEN 'yes' ELSE 'no' END
      )
    )
    FROM jsonb_array_elements(sections) AS s
  ) as sections_summary
FROM pages 
WHERE slug = 'preview/home';