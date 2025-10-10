-- Fix hero cards with correct LaSight/Flaticon classes and proper content
UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{1,data,cards}',
  jsonb_build_array(
    jsonb_build_object(
      'icon', 'flaticon-appointment',
      'title', 'Meeting',
      'subtitle', 'Schedule a meeting with our office',
      'link', '/appointments'
    ),
    jsonb_build_object(
      'icon', 'flaticon-portfolio',
      'title', 'Services',
      'subtitle', 'Explore our government services',
      'link', '/services'
    ),
    jsonb_build_object(
      'icon', 'flaticon-headphones',
      'title', 'VP Office',
      'subtitle', 'Contact the Vice President office',
      'link', '/contact'
    )
  )
)
WHERE slug = 'home' AND sections->1->>'type' = 'hero_cards';

-- Fix about section with complete content and correct field names
UPDATE pages 
SET sections = jsonb_set(
  sections,
  '{2,data}',
  jsonb_build_object(
    'sectionTitle', 'About the Vice President',
    'mainTitle', 'Serving Suriname with <span>Vision & Integrity</span>',
    'paragraphs', ARRAY[
      'Gregory Allan Rusland proudly serves as Vice President of the Republic of Suriname, bringing decades of dedicated public service and visionary leadership to advance the nation''s economic development, social progress, and democratic governance.',
      'With a distinguished career spanning multiple ministerial positions, Vice President Rusland has consistently demonstrated commitment to transparency, accountability, and inclusive governance. His leadership focuses on sustainable development, international cooperation, and creating opportunities for all citizens.',
      'Under his guidance, the Office of the Vice President works tirelessly to strengthen institutions, promote good governance, and ensure that the voices of all Surinamese citizens are heard in the halls of power.'
    ],
    'features', ARRAY[
      'Economic Development',
      'Social Progress', 
      'International Relations',
      'Democratic Governance'
    ],
    'contactText', 'Call for any questions:',
    'phone1', '+597 472-051',
    'phone2', '+597 472-000',
    'signatureImage', '/images/resource/signature.png',
    'signatureName', 'Gregory Allan Rusland',
    'signatureTitle', 'Vice President of Suriname',
    'videoImage', '/images/resource/video-img.jpg',
    'videoUrl', 'https://www.youtube.com/watch?v=example',
    'metrics', jsonb_build_array(
      jsonb_build_object('label', 'Satisfied Citizens', 'value', 1250, 'suffix', '+'),
      jsonb_build_object('label', 'Initiatives Completed', 'value', 89, 'suffix', ''),
      jsonb_build_object('label', 'International Awards', 'value', 15, 'suffix', ''),
      jsonb_build_object('label', 'Success Rate', 'value', 98, 'suffix', '%')
    )
  )
)
WHERE slug = 'home' AND sections->2->>'type' = 'about_enhanced';