-- Remove duplicate quotes carousel section from homepage (order 9, below blog section)
DELETE FROM public.pages 
WHERE slug = 'home' 
AND sections @> '[{"type": "quotes_carousel", "order": 9}]'::jsonb;

-- Alternative: Update the sections array to remove the quotes_carousel section at order 9
UPDATE public.pages
SET sections = (
  SELECT jsonb_agg(section)
  FROM jsonb_array_elements(sections) AS section
  WHERE NOT (section->>'type' = 'quotes_carousel' AND (section->>'order')::int = 9)
)
WHERE slug = 'home';