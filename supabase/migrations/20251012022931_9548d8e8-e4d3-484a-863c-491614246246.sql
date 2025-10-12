-- Add 3 hero slides to the home page
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{0,data}',
  jsonb_build_object(
    'backgroundImage', '/images/main-slider/2.jpg',
    'slides', jsonb_build_array(
      jsonb_build_object(
        'title', 'Gregory Allan Rusland <br /> Vice President of the Republic of Suriname',
        'subtitle', 'Serving Suriname with integrity, vision, and commitment to progress for all citizens.',
        'buttonText', 'ABOUT GREGORY',
        'buttonLink', '/contact',
        'image', '/images/main-slider/content-image-1.png'
      ),
      jsonb_build_object(
        'title', 'Building a Stronger <br /> Suriname Together',
        'subtitle', 'Through collaborative leadership and strategic vision, we create opportunities for every community.',
        'buttonText', 'OUR VISION',
        'buttonLink', '/about',
        'image', '/images/main-slider/content-image-1.png'
      ),
      jsonb_build_object(
        'title', 'Committed to <br /> Progress & Development',
        'subtitle', 'Advancing economic growth, education, and sustainable development for future generations.',
        'buttonText', 'LEARN MORE',
        'buttonLink', '/services',
        'image', '/images/main-slider/content-image-1.png'
      )
    )
  )
)
WHERE slug = 'home';

-- Verify the update
SELECT jsonb_pretty(sections->0) as hero_section FROM pages WHERE slug = 'home';