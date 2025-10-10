-- Populate missing section data for the homepage
UPDATE pages
SET sections = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(
                sections,
                '{0,data}',
                '{"title": "Leading with <br><span class=\"theme_color\">Vision</span> and <span class=\"theme_color\">Purpose</span>", "subtitle": "Dedicated to building a stronger, more prosperous Suriname through democratic values, economic development, and social progress.", "buttonText": "Learn More", "buttonLink": "/about", "image": "/images/main-slider/image-1.png", "backgroundImage": "/images/main-slider/pattern-1.png"}'::jsonb
              ),
              '{1,data}',
              '{"sectionTitle": "About Gregory Rusland", "mainTitle": "Dedicated to <span class=\"theme_color\">Service</span> and <span class=\"theme_color\">Progress</span>", "paragraphs": ["Gregory Allan Rusland serves as Vice President of Suriname, bringing decades of experience in public service and leadership.", "His vision focuses on economic development, democratic governance, and improving the quality of life for all Surinamese citizens."], "features": ["Economic Development", "Democratic Governance", "Social Progress", "International Relations"], "contactText": "Call to ask any question", "phone1": "+597 472 000", "phone2": "+597 473 000", "signatureImage": "/images/resource/signature-1.png", "signatureName": "Gregory Allan Rusland", "signatureTitle": "Vice President of Suriname", "videoImage": "/images/resource/video-img.jpg", "videoUrl": "https://www.youtube.com/watch?v=kxPCFljwJws"}'::jsonb
            ),
            '{2,data}',
            '{"experienceYears": "25+", "experienceText": "Years Experience", "experienceImage": "/images/resource/about-2.jpg"}'::jsonb
          ),
          '{4,data}',
          '{"metrics": [{"value": 25, "label": "Years Experience", "suffix": "+"}, {"value": 150, "label": "Projects Completed", "suffix": "+"}, {"value": 98, "label": "Satisfaction Rate", "suffix": "%"}]}'::jsonb
        ),
        '{7,data}',
        '{}'::jsonb
      ),
      '{8,data}',
      '{"title": "Get in Touch", "heading": "Have a Question? <br><span class=\"theme_color\">Contact Us</span>", "address": "Onafhankelijkheidsplein, Paramaribo, Suriname", "phone": "+597 472 000", "email": "info@vicepresident.sr", "mapLat": "5.8520", "mapLng": "-55.2038", "mapTitle": "Office of the Vice President", "mapContent": "Onafhankelijkheidsplein, Paramaribo", "subscribeBackground": "/images/background/pattern-6.png", "subscribeHeading": "Subscribe to Our <span class=\"theme_color\">Newsletter</span>"}'::jsonb
    ),
    '{5,data}',
    '{}'::jsonb
  ),
  '{6,data}',
  '{}'::jsonb
)
WHERE slug = 'home';