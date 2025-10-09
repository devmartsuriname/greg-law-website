import PageTitle from '../components/PageTitle';
import { testimonials } from '../data/testimonials';

export default function Testimonial() {
  return (
    <>
      <PageTitle
        title="Testimonial"
        breadcrumbs={[{ label: 'Testimonial' }]}
        metaTitle="Testimonials | Greg Law"
        metaDescription="Read what our satisfied clients have to say about our legal services"
      />

      <section className="testimonial-page-section">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Testimonial</div>
            <h3>
              We are here to manage your <br /> finance with <span>experience</span>
            </h3>
          </div>

          <div className="row clearfix">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-block-three col-lg-6 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="quote-icon flaticon-two-quotes"></div>
                  <div className="image-outer">
                    <div className="image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div className="text">{testimonial.text}</div>
                  <h5>{testimonial.name}</h5>
                  <div className="designation">{testimonial.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="subscribe-section style-two">
        <div className="container">
          <div className="inner-container" style={{ backgroundImage: 'url(/images/background/3.jpg)' }}>
            <h2>
              Subscribe Your Email for Newsletter <br /> & Promotion
            </h2>
            <div className="subscribe-form">
              <form method="post" action="/contact">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email address.." required />
                  <button type="submit" className="theme-btn subscribe-btn">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
