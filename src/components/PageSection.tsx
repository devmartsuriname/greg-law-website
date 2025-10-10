import { PageSection as PageSectionType } from '@/hooks/usePages';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { QuotesCarousel } from '@/components/QuotesCarousel';
import { ServicesGrid } from '@/components/ServicesGrid';
import { HeroCards } from '@/components/HeroCards';
import { CareerTimeline } from '@/components/CareerTimeline';
import { TeamGrid } from '@/components/TeamGrid';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { NewsPreview } from '@/components/NewsPreview';
import { MetricsCounter } from '@/components/MetricsCounter';

interface PageSectionProps {
  section: PageSectionType;
}

export const PageSection = ({ section }: PageSectionProps) => {
  const { type, data } = section;

  // Hero Cards section
  if (type === 'hero_cards') {
    return <HeroCards cards={data.cards || []} />;
  }

  // Hero section
  if (type === 'hero') {
    return (
      <section className="banner-section-two" style={{ backgroundImage: `url(${data.backgroundImage || '/images/main-slider/2.jpg'})` }}>
        <div className="left-side">
          <div className="icon-image"></div>
        </div>
        <div className="container">
          <div className="main-slider-carousel owl-carousel owl-theme">
            <div className="slide">
              <div className="row clearfix">
                <div className="image-column col-lg-7 col-md-12 col-sm-12">
                  <div className="image">
                    <img src={data.image || '/images/main-slider/content-image-1.png'} alt={data.title} />
                  </div>
                </div>
                <div className="content-column col-lg-5 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <h2 dangerouslySetInnerHTML={{ __html: data.title || '' }} />
                    <div className="text">{data.subtitle}</div>
                    {data.buttonText && data.buttonLink && (
                      <Link to={data.buttonLink} className="theme-btn btn-style-one">
                        {data.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // About section (enhanced with signature and metrics)
  if (type === 'about' || type === 'about_enhanced') {
    return (
      <section className="about-section style-two">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">{data.sectionLabel}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: data.title || '' }} />
                </div>
                <div className="text" dangerouslySetInnerHTML={{ __html: data.content || '' }} />
                {data.features && Array.isArray(data.features) && (
                  <div className="row clearfix">
                    {data.features.map((feature: string, index: number) => (
                      <div key={index} className="column col-lg-6 col-md-6 col-sm-12">
                        <ul className="list-style-one">
                          <li>{feature}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Signature and contact info for enhanced version */}
                {type === 'about_enhanced' && (
                  <div className="author-info">
                    {data.signature_name && (
                      <div className="signature">
                        <h4>{data.signature_name}</h4>
                        {data.signature_image && (
                          <img src={data.signature_image} alt="Signature" />
                        )}
                      </div>
                    )}
                    {data.phone && (
                      <div className="phone-info">
                        <Icon icon="mdi:phone" width="24" />
                        <span>Call for any questions: {data.phone}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                {data.videoImage && (
                  <div className="video-box">
                    <figure className="video-image">
                      <img src={data.videoImage} alt="" />
                    </figure>
                    {data.videoUrl && (
                      <a href={data.videoUrl} className="lightbox-image overlay-box">
                        <span className="flaticon-play-button"></span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Metrics row for enhanced version */}
          {type === 'about_enhanced' && data.metrics && Array.isArray(data.metrics) && (
            <div className="fact-counter">
              <div className="row">
                {data.metrics.map((metric: any, index: number) => (
                  <div key={index} className="column col-lg-3 col-md-6 col-sm-12">
                    <MetricsCounter 
                      value={metric.value} 
                      label={metric.label} 
                      suffix={metric.suffix || ''} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Services Grid section
  if (type === 'services_grid') {
    return (
      <section className="services-section-three">
        <div className="container">
          <div className="row clearfix">
            <div className="blocks-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="row clearfix">
                  {data.services && Array.isArray(data.services) && data.services.map((service: any, index: number) => (
                    <div key={index} className="services-block-three col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-box wow fadeInUp" data-wow-delay={`${(index % 2) * 300}ms`} data-wow-duration="1500ms">
                        <div className="border-one"></div>
                        <div className="border-two"></div>
                        <div className="content">
                          <div className="icon-box">
                            {service.icon && <Icon icon={service.icon} className="icon" />}
                          </div>
                          <h6>
                            {service.link ? (
                              <Link to={service.link}>{service.title}</Link>
                            ) : (
                              service.title
                            )}
                          </h6>
                          <div className="text">{service.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {data.sideImage && (
              <div className="image-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column clearfix">
                  <div className="image">
                    <img src={data.sideImage} alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Features section
  if (type === 'features') {
    return (
      <section className="feature-section">
        <div className="container">
          <div className="inner-container">
            <div className="clearfix">
              {data.features && Array.isArray(data.features) && data.features.map((feature: any, index: number) => (
                <div key={index} className="feature-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box">
                    {feature.icon && <div className={`big-icon ${feature.icon}`}></div>}
                    <div className="content">
                      {feature.icon && (
                        <div className="icon-box">
                          <span className={`icon ${feature.icon}`}></span>
                        </div>
                      )}
                      {feature.label && <div className="title">{feature.label}</div>}
                      <h4>{feature.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Career Timeline section
  if (type === 'career_timeline') {
    return <CareerTimeline events={data.events || []} />;
  }

  // Testimonials section (dynamic from DB)
  if (type === 'testimonials') {
    return <TestimonialsCarousel />;
  }

  // Team Grid section
  if (type === 'team_grid') {
    return <TeamGrid />;
  }

  // News Preview section
  if (type === 'news_preview') {
    return <NewsPreview />;
  }

  // Text section
  if (type === 'text') {
    return (
      <section className="text-section">
        <div className="container">
          {data.title && <h2>{data.title}</h2>}
          <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        </div>
      </section>
    );
  }

  // Image section
  if (type === 'image') {
    return (
      <section className="image-section">
        <div className="container">
          <img src={data.url} alt={data.alt || ''} className="img-fluid" />
          {data.caption && <p className="text-center mt-3">{data.caption}</p>}
        </div>
      </section>
    );
  }

  // Quotes carousel (dynamic from DB)
  if (type === 'quotes_carousel') {
    return (
      <section className="testimonial-section">
        <div className="container">
          {(data.sectionLabel || data.sectionTitle) && (
            <div className="section-title">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle || '' }} />}
            </div>
          )}
          <QuotesCarousel />
        </div>
      </section>
    );
  }

  // Services grid (dynamic from DB)
  if (type === 'services_grid_dynamic') {
    return (
      <section className="services-section-three">
        <div className="container">
          {(data.sectionLabel || data.sectionTitle) && (
            <div className="section-title text-center">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle || '' }} />}
            </div>
          )}
          <ServicesGrid featured={true} limit={6} />
        </div>
      </section>
    );
  }

  // Contact CTA (enhanced with full contact info)
  if (type === 'contact_cta' || type === 'contact_cta_enhanced') {
    return (
      <section 
        className="call-to-action-section" 
        style={{ backgroundImage: `url(${data.backgroundImage || ''})` }}
      >
        <div className="container">
          <div className="inner-container">
            <div className="row">
              <div className="content-column col-lg-6 col-md-12">
                <h2>{data.title}</h2>
                <div className="text">{data.content}</div>
                {data.buttonText && data.buttonLink && (
                  <Link to={data.buttonLink} className="theme-btn btn-style-one">
                    <span className="txt">{data.buttonText}</span>
                  </Link>
                )}
              </div>
              
              {type === 'contact_cta_enhanced' && data.contact_info && (
                <div className="info-column col-lg-6 col-md-12">
                  <ul className="contact-info-list">
                    {data.contact_info.address && (
                      <li>
                        <Icon icon="mdi:map-marker" width="24" />
                        <strong>Address:</strong> {data.contact_info.address}
                      </li>
                    )}
                    {data.contact_info.phone && (
                      <li>
                        <Icon icon="mdi:phone" width="24" />
                        <strong>Phone:</strong> {data.contact_info.phone}
                      </li>
                    )}
                    {data.contact_info.email && (
                      <li>
                        <Icon icon="mdi:email" width="24" />
                        <strong>Email:</strong> {data.contact_info.email}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default fallback
  return null;
};
