-- Restore the homepage record that was accidentally deleted
INSERT INTO public.pages (slug, title, published, meta_title, meta_description, sections)
VALUES (
  'home',
  'Home',
  true,
  'Home - Gregory Allan Rusland',
  'Welcome to the official website',
  '[
    {"id": "hero-1", "type": "hero", "order": 1, "data": {}},
    {"id": "about-2", "type": "about_enhanced", "order": 2, "data": {}},
    {"id": "services-3", "type": "services_grid_dynamic", "order": 3, "data": {}},
    {"id": "career-4", "type": "career_timeline", "order": 4, "data": {}},
    {"id": "metrics-5", "type": "metrics_counter", "order": 5, "data": {}},
    {"id": "testimonials-6", "type": "testimonials", "order": 6, "data": {}},
    {"id": "team-7", "type": "team_grid", "order": 7, "data": {}},
    {"id": "news-8", "type": "news_preview", "order": 8, "data": {}},
    {"id": "contact-9", "type": "contact_cta_enhanced", "order": 9, "data": {}}
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET sections = EXCLUDED.sections,
    published = EXCLUDED.published,
    updated_at = now();