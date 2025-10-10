import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_photo_url?: string;
  testimonial_text: string;
  display_order: number;
}

export const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="testimonial-section">
        <div className="auto-container">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonial-section style-two">
      <div className="auto-container">
        <div className="sec-title text-center">
          <div className="sub-title">Testimonials</div>
          <h2>What Our Clients Say</h2>
        </div>

        <div className="testimonial-carousel owl-carousel owl-theme">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-block">
              <div className="inner-box">
                <div className="text">{testimonial.testimonial_text}</div>
                <div className="author-info">
                  {testimonial.client_photo_url && (
                    <div className="thumb">
                      <img src={testimonial.client_photo_url} alt={testimonial.client_name} />
                    </div>
                  )}
                  <div className="info">
                    <div className="name">{testimonial.client_name}</div>
                    {testimonial.client_company && (
                      <div className="designation">{testimonial.client_company}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
