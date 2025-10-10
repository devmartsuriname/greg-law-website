-- Insert sample featured services
INSERT INTO services (title, description, icon, category, featured, published, display_order) VALUES
  ('Economic Development', 'Driving sustainable economic growth and prosperity for all citizens of Suriname through strategic initiatives and policy reforms.', 'lucide:trending-up', 'Economy', true, true, 1),
  ('Social Progress', 'Advancing education, healthcare, and social welfare programs to improve quality of life for all Surinamese citizens.', 'lucide:heart', 'Social', true, true, 2),
  ('International Relations', 'Strengthening diplomatic ties and fostering partnerships with nations worldwide to enhance Suriname''s global standing.', 'lucide:globe', 'Foreign Affairs', true, true, 3),
  ('Democratic Governance', 'Promoting transparency, accountability, and citizen participation in government processes and decision-making.', 'lucide:balance-scale', 'Governance', true, true, 4),
  ('Infrastructure Development', 'Modernizing transportation, utilities, and public infrastructure to support national growth and connectivity.', 'lucide:building', 'Infrastructure', true, true, 5),
  ('Environmental Protection', 'Preserving Suriname''s natural resources and biodiversity while promoting sustainable development practices.', 'lucide:leaf', 'Environment', true, true, 6);

-- Insert sample featured quotes
INSERT INTO quotes (quote_text, author_name, author_title, context, featured, published, display_order) VALUES
  ('Our vision is to build a Suriname where every citizen has the opportunity to thrive, where economic growth is inclusive, and where democratic values guide our path forward.', 'Gregory Allan Rusland', 'Vice President of Suriname', 'National Address 2024', true, true, 1),
  ('The strength of a nation lies not in its resources alone, but in the unity, determination, and resilience of its people. Together, we will overcome any challenge.', 'Gregory Allan Rusland', 'Vice President of Suriname', 'Economic Summit 2024', true, true, 2),
  ('Good governance is the foundation upon which we build trust, prosperity, and a brighter future for generations to come.', 'Gregory Allan Rusland', 'Vice President of Suriname', 'Governance Conference 2024', true, true, 3);