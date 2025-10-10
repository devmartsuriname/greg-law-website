import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import HeroCards from './sections/HeroCards';
import CareerTimeline from './sections/CareerTimeline';
import MetricsCounter from './sections/MetricsCounter';
import TeamGrid from './sections/TeamGrid';
import TestimonialsCarousel from './sections/TestimonialsCarousel';
import NewsPreview from './sections/NewsPreview';

interface PageSectionProps {
  section: {
    id: string;
    type: string;
    data: any;
  };
}

export default function PageSection({ section }: PageSectionProps) {
  const { type, data } = section;

  // Hero Banner
  if (type === 'hero') {
    return (
      <section className="banner-section-two" style={{ backgroundImage: `url(${data.backgroundImage})` }}>
        <div className="left-side">
          <div className="icon-image"></div>
        </div>
        <div className="container">
          <div className="main-slider-carousel owl-carousel owl-theme">
            {[1, 2, 3].map((num) => (
              <div key={num} className="slide">
                <div className="row clearfix">
                  <div className="image-column col-lg-7 col-md-12 col-sm-12">
                    <div className="image">
                      <img src={data.image} alt={data.title} />
                    </div>
                  </div>
                  <div className="content-column col-lg-5 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <h2 dangerouslySetInnerHTML={{ __html: data.title }} />
                      <div className="text">{data.subtitle}</div>
                      <Link to={data.buttonLink} className="theme-btn btn-style-one">
                        {data.buttonText}
                      </Link>
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

  // Hero Cards
  if (type === 'hero_cards') {
    return <HeroCards cards={data.cards} />;
  }

  // About Enhanced
  if (type === 'about_enhanced') {
    return (
      <section className="about-section style-two">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">{data.sectionTitle}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: data.mainTitle }} />
                </div>

                <div className="text">
                  {data.paragraphs?.map((paragraph: string, index: number) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>

                <div className="row clearfix">
                  {data.features?.map((feature: string, index: number) => (
                    <div key={index} className="column col-lg-6 col-md-6 col-sm-12">
                      <ul className="list-style-one">
                        <li>{feature}</li>
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="question">
                  {data.contactText} <strong>{data.phone1}</strong> <span className="or">or</span>{' '}
                  <strong>{data.phone2}</strong>
                </div>

                <div className="signature">
                  <div className="signature-img">
                    <img src={data.signatureImage} alt="Signature" />
                  </div>
                  <h5>{data.signatureName}</h5>
                  <div className="designation">{data.signatureTitle}</div>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="video-box">
                  <figure className="video-image">
                    <img src={data.videoImage} alt="" />
                  </figure>
                  <a href={data.videoUrl} className="lightbox-image overlay-box">
                    <span className="flaticon-play-button"></span>
                  </a>
                </div>

                {data.metrics && (
                  <MetricsCounter
                    metrics={data.metrics.map((m: any) => ({
                      count: m.value,
                      title: m.label,
                      suffix: m.suffix,
                      icon: m.icon || '',
                    }))}
                    variant="style-two"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Career Timeline
  if (type === 'career_timeline') {
    return <CareerTimeline events={data.events} />;
  }

  // Services Grid Dynamic
  if (type === 'services_grid_dynamic') {
    return <ServicesGrid data={data} />;
  }

  // Testimonials
  if (type === 'testimonials') {
    return <TestimonialsCarousel />;
  }

  // Team Grid
  if (type === 'team_grid') {
    return <TeamGrid />;
  }

  // News Preview
  if (type === 'news_preview') {
    return <NewsPreview />;
  }

  // Quotes Carousel
  if (type === 'quotes_carousel') {
    return <TestimonialsCarousel />;
  }

  // Contact CTA Enhanced
  if (type === 'contact_cta_enhanced') {
    return (
      <>
        <section className="contact-form-section">
          <div className="map-section">
            <div className="map-outer">
              <div
                className="map-canvas"
                data-zoom="12"
                data-lat={data.mapLat}
                data-lng={data.mapLng}
                data-type="roadmap"
                data-hue="#ffc400"
                data-title={data.mapTitle}
                data-icon-path="/images/icons/map-marker.png"
                data-content={data.mapContent}
              ></div>
            </div>
          </div>
          <div className="container">
            <div className="inner-container">
              <div className="upper-content">
                <div className="row clearfix">
                  <div className="title-column col-lg-5 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="section-title">
                        <div className="title">{data.title}</div>
                        <h3 dangerouslySetInnerHTML={{ __html: data.heading }} />
                      </div>
                    </div>
                  </div>

                  <div className="info-column col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="row clearfix">
                        <div className="column col-lg-6 col-md-6 col-sm-12">
                          <ul className="list-style-two style-two">
                            <li>
                              <span className="icon flaticon-placeholder-1"></span>
                              {data.address}
                            </li>
                          </ul>
                        </div>
                        <div className="column col-lg-6 col-md-6 col-sm-12">
                          <ul className="list-style-two style-two">
                            <li>
                              <span className="icon flaticon-phone-call"></span>
                              {data.phone}
                            </li>
                            <li>
                              <span className="icon flaticon-chat"></span>
                              {data.email}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="default-form style-two">
                <form method="post" action="/contact">
                  <div className="row clearfix">
                    <div className="form-group col-lg-4 col-md-6 col-sm-12">
                      <input type="text" name="firstname" placeholder="First name.." required />
                    </div>

                    <div className="form-group col-lg-4 col-md-6 col-sm-12">
                      <input type="text" name="lastname" placeholder="Last name.." required />
                    </div>

                    <div className="form-group col-lg-4 col-md-12 col-sm-12">
                      <input type="email" name="email" placeholder="Email Address.." required />
                    </div>

                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <textarea name="message" placeholder="Write your message..."></textarea>
                    </div>

                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="subscribe-section style-two">
          <div className="container">
            <div className="inner-container" style={{ backgroundImage: `url(${data.subscribeBackground})` }}>
              <h2 dangerouslySetInnerHTML={{ __html: data.subscribeHeading }} />
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

  // Default fallback
  return null;
}

// Services Grid Component
function ServicesGrid({ data }: { data: any }) {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <section className="services-section-three">
        <div className="container">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error || services.length === 0) {
    return null;
  }

  return (
    <section className="services-section-three">
      <div
        className="icon-one wow fadeInLeft"
        data-wow-delay="250ms"
        data-wow-duration="1500ms"
        style={{ backgroundImage: 'url(/images/icons/icon-6.png)' }}
      ></div>
      <div
        className="icon-two wow fadeInRight"
        data-wow-delay="500ms"
        data-wow-duration="1500ms"
        style={{ backgroundImage: 'url(/images/icons/icon-7.png)' }}
      ></div>
      <div className="container">
        <div className="row clearfix">
          <div className="blocks-column col-lg-8 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="row clearfix">
                {services.slice(0, 6).map((service, index) => (
                  <div key={service.id} className="services-block-three col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInUp"
                      data-wow-delay={`${(index % 2) * 300}ms`}
                      data-wow-duration="1500ms"
                    >
                      <div className="border-one"></div>
                      <div className="border-two"></div>
                      <div className="content">
                        <div className="icon-box">
                          <span className={`icon ${service.icon || 'fa fa-briefcase'}`}></span>
                        </div>
                        <h6>
                          <Link to={`/services/${service.id}`}>{service.title}</Link>
                        </h6>
                        <div className="text">{service.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="image-column col-lg-4 col-md-12 col-sm-12">
            <div className="inner-column clearfix">
              <div className="image">
                <img src={data.experienceImage || '/images/resource/about-2.jpg'} alt="Experience" />
                <div className="overlay-box">
                  <div className="overlay-inner">
                    <div className="content">
                      <h2>
                        {data.experienceYears} <span>{data.experienceText}</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
