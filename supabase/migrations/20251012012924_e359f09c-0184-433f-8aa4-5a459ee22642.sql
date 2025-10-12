-- Step 1: Move metrics data from metrics_counter section to about_enhanced section's kpis field
UPDATE pages
SET sections = (
  SELECT jsonb_agg(elem ORDER BY (elem->>'order')::int)
  FROM (
    SELECT 
      CASE 
        -- Update about_enhanced section to include kpis
        WHEN elem->>'type' = 'about_enhanced' THEN
          jsonb_set(
            elem,
            '{data,kpis}',
            '[
              {"value": 25, "suffix": "+", "label": "Years of Service", "description": "Public service dedication"},
              {"value": 150, "suffix": "+", "label": "Policy Initiatives", "description": "Development programs"},
              {"value": 98, "suffix": "%", "label": "Citizens Impacted", "description": "Community reach"}
            ]'::jsonb
          )
        ELSE elem
      END as elem
    FROM jsonb_array_elements(sections) elem
    WHERE elem->>'type' != 'metrics_counter'
  ) filtered
)
WHERE slug = 'home';

-- Step 2: Reorder sections after removal
WITH numbered_sections AS (
  SELECT 
    elem,
    ROW_NUMBER() OVER (ORDER BY (elem->>'order')::int) - 1 as new_order
  FROM pages, jsonb_array_elements(sections) elem
  WHERE slug = 'home'
)
UPDATE pages
SET sections = (
  SELECT jsonb_agg(
    jsonb_set(elem, '{order}', to_jsonb(new_order))
    ORDER BY new_order
  )
  FROM numbered_sections
)
WHERE slug = 'home';

-- Step 3: Verify the update
SELECT 
  elem->>'type' as section_type,
  elem->>'order' as section_order,
  CASE 
    WHEN elem->>'type' = 'about_enhanced' THEN elem->'data'->'kpis'
    ELSE NULL
  END as kpis
FROM pages, jsonb_array_elements(sections) elem
WHERE slug = 'home'
ORDER BY (elem->>'order')::int;