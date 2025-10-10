import { useTestimonials } from '@/hooks/useTestimonials';

export default function TestimonialsSection() {
  const { testimonials, loading, error } = useTestimonials();

  if (loading) {
    return (
      <section className="testimonial-section">
        <div className="container">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="section-title">
          <div className="title">Client Testimonials</div>
          <h3>
            What our clients<span> say about us</span>
          </h3>
        </div>

        <div className="testimonial-carousel owl-carousel owl-theme">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-block-two">
              <div className="inner-box">
                <div className="text">{testimonial.testimonial_text}</div>
                <div className="author-post">
                  {testimonial.client_photo_url && (
                    <div className="author-image">
                      <img src={testimonial.client_photo_url} alt={testimonial.client_name} />
                    </div>
                  )}
                  <div className="author-inner">
                    <h3>{testimonial.client_name}</h3>
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
}
