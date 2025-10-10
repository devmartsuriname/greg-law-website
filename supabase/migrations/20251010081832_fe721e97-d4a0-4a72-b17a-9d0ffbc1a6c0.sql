-- Update homepage with complete sections array
UPDATE pages 
SET sections = '[
  {
    "id": "hero-1",
    "type": "hero",
    "order": 1,
    "data": {
      "title": "Gregory Allan <span>Rusland</span>",
      "subtitle": "Vice President of the Republic of Suriname",
      "backgroundImage": "/images/main-slider/2.jpg",
      "image": "/images/main-slider/content-image-1.png",
      "buttonText": "Learn More",
      "buttonLink": "/about"
    }
  },
  {
    "id": "about-1",
    "type": "about",
    "order": 2,
    "data": {
      "sectionLabel": "About the Vice President",
      "title": "Leading with <span>Vision & Purpose</span>",
      "content": "<p>Gregory Allan Rusland serves as Vice President of the Republic of Suriname, dedicated to advancing economic development, social progress, and democratic governance. With a commitment to serving the people of Suriname, the Vice President works tirelessly to build a brighter future for all citizens.</p>",
      "features": [
        "Economic Development",
        "Social Progress",
        "International Relations",
        "Democratic Governance"
      ],
      "videoImage": "/images/resource/video-img.jpg",
      "videoUrl": "https://www.youtube.com/watch?v=example"
    }
  },
  {
    "id": "services-1",
    "type": "services_grid_dynamic",
    "order": 3,
    "data": {
      "sectionLabel": "Key Focus Areas",
      "sectionTitle": "Working for <span>Suriname''s Future</span>"
    }
  },
  {
    "id": "quotes-1",
    "type": "quotes_carousel",
    "order": 4,
    "data": {
      "sectionLabel": "Leadership Vision",
      "sectionTitle": "Words that guide our <span>vision</span>"
    }
  },
  {
    "id": "cta-1",
    "type": "contact_cta",
    "order": 5,
    "data": {
      "title": "Have Questions or Concerns?",
      "content": "The Office of the Vice President is here to serve the people of Suriname.",
      "buttonText": "Contact Us",
      "buttonLink": "/contact",
      "backgroundImage": "/images/background/pattern-1.png"
    }
  }
]'::jsonb,
    updated_at = now()
WHERE slug = 'home';