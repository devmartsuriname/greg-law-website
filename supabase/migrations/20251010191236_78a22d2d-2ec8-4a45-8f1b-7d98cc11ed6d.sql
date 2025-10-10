-- Fix 1: Reduce metrics to 3 items (remove Success Rate)
UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{2,data,metrics}',
  jsonb_build_array(
    jsonb_build_object('label', 'Satisfied Citizens', 'value', 1250, 'suffix', '+'),
    jsonb_build_object('label', 'Initiatives Completed', 'value', 89, 'suffix', ''),
    jsonb_build_object('label', 'International Awards', 'value', 15, 'suffix', '')
  )
)
WHERE slug = 'home' AND sections->2->>'type' = 'about_enhanced';

-- Fix 2: Update Services Grid with section title
UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{4,data}',
  jsonb_build_object(
    'sectionLabel', 'Key Focus Areas',
    'sectionTitle', 'Working for <span>Suriname''s Future</span>',
    'experienceYears', '15',
    'experienceText', 'Years of Service',
    'experienceImage', '/images/resource/about-2.jpg'
  )
)
WHERE slug = 'home' AND sections->4->>'type' = 'services_grid_dynamic';