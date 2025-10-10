-- Update the career_timeline section with sample events data
UPDATE public.pages
SET sections = jsonb_set(
  sections,
  '{3,data}',
  '{
    "events": [
      {
        "year": "2020",
        "title": "Vice President",
        "description": "Elected as Vice President of Suriname"
      },
      {
        "year": "2015-2020",
        "title": "Political Leadership",
        "description": "Active in national politics and public service"
      },
      {
        "year": "2010-2015",
        "title": "Community Development",
        "description": "Led various community development initiatives"
      },
      {
        "year": "2000-2010",
        "title": "Early Career",
        "description": "Foundation in public service and leadership"
      }
    ]
  }'::jsonb
)
WHERE slug = 'home';