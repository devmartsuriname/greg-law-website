-- Update about_enhanced section structure for better data consistency
-- This fixes field name mismatches and adds missing optional fields

UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{2,data}',
  jsonb_build_object(
    'sectionLabel', 'About the Vice President',
    'title', 'Leading with <span>Vision & Purpose</span>',
    'content', '<p>Gregory Allan Rusland serves as Vice President, dedicated to advancing economic development and democratic governance.</p><p>With decades of experience in public service, Vice President Rusland brings visionary leadership to Suriname.</p>',
    'features', ARRAY['Economic Development', 'Social Progress', 'International Relations', 'Democratic Governance'],
    'metrics', jsonb_build_array(
      jsonb_build_object('label', 'Satisfied Citizens', 'value', 1250, 'suffix', '+'),
      jsonb_build_object('label', 'Initiatives Completed', 'value', 89, 'suffix', ''),
      jsonb_build_object('label', 'International Awards', 'value', 15, 'suffix', ''),
      jsonb_build_object('label', 'Success Rate', 'value', 98, 'suffix', '%')
    ),
    'phone', '+597 472-051',
    'phone2', '+597 472-000',
    'signature_name', 'Gregory Allan Rusland',
    'signature_title', 'Vice President of Suriname',
    'signature_image', '/images/resource/signature.png',
    'videoImage', '/images/resource/video-img.jpg',
    'videoUrl', 'https://www.youtube.com/watch?v=example'
  )
)
WHERE slug = 'home' AND sections->2->>'type' = 'about_enhanced';