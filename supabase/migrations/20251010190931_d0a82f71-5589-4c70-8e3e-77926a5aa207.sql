-- Add missing experience data to services section
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