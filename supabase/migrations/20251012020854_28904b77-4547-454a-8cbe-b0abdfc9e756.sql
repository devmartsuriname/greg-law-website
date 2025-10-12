-- Fix About Enhanced section to match static homepage exactly
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{1,data}',
  jsonb_build_object(
    'sectionTitle', 'About Gregory',
    'mainTitle', 'Serving Suriname with <span>vision & integrity</span>',
    'paragraphs', jsonb_build_array(
      '<p>I am Gregory Allan Rusland, Vice President of Suriname. With decades of experience in governance and <span>public service,</span> I dedicate my work to advancing Suriname''s development and creating opportunities for all citizens.</p>',
      '<p>Through collaborative leadership and strategic vision, we work together to build a stronger, more prosperous Suriname that serves every community and every generation.</p>'
    ),
    'features', jsonb_build_array(
      'Economic development and growth.',
      'Youth empowerment and education.',
      'International partnerships.',
      'Sustainable development initiatives.'
    ),
    'contactText', 'Contact the',
    'phone1', '+597 472 000',
    'phone2', '+597 472-001',
    'videoImage', '/images/resource/video-img.jpg',
    'videoUrl', 'https://www.youtube.com/watch?v=kxPCFljwJws',
    'signatureImage', '/images/icons/signature.png',
    'signatureName', 'Gregory AllanRusland',
    'signatureTitle', '(Vice President)',
    'kpis', jsonb_build_array(
      jsonb_build_object('value', 15, 'suffix', '', 'label', 'Years of Service', 'description', 'Public service dedication'),
      jsonb_build_object('value', 50, 'suffix', '+', 'label', 'Policy Initiatives', 'description', 'Development programs'),
      jsonb_build_object('value', 100, 'suffix', '', 'label', 'Citizens Impacted', 'description', 'Community reach')
    )
  )
)
WHERE slug = 'home';

-- Verify the update
SELECT jsonb_pretty(sections->1) as about_section FROM pages WHERE slug = 'home';