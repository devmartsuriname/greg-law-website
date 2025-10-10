import { PageSection as PageSectionType } from '@/hooks/usePages';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDynamicServices, useDynamicTeam, useDynamicTestimonials, useDynamicNews, useDynamicQuotes } from '@/hooks/useDynamicContent';

interface PageSectionProps {
  section: PageSectionType;
}

export const PageSection = ({ section }: PageSectionProps) => {
  const { type, data } = section;

  // Dynamic data hooks
  const { data: services } = useDynamicServices();
  const { data: team } = useDynamicTeam();
  const { data: testimonials } = useDynamicTestimonials();
  const { data: news } = useDynamicNews(3);
  const { data: quotes } = useDynamicQuotes(1);

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

  // About section
  if (type === 'about') {
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

  // Testimonials/Quotes section
  if (type === 'testimonials') {
    return (
      <section className="testimonial-section">
        <div className="container">
          {data.sectionTitle && (
            <div className="section-title">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle || '' }} />
            </div>
          )}
          <div className="testimonial-carousel owl-carousel owl-theme">
            {data.testimonials && Array.isArray(data.testimonials) && data.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="testimonial-block-two">
                <div className="inner-box">
                  <div className="text">{testimonial.quote}</div>
                  <div className="author-post">
                    <div className="author-inner">
                      <h3>{testimonial.author}</h3>
                      <div className="designation">{testimonial.position}</div>
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

  // Services Grid Dynamic (fetch from database)
  if (type === 'services_grid_dynamic') {
    return (
      <section className="services-section-three">
        <div className="container">
          <div className="section-title centered">
            {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
            {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />}
          </div>
          <div className="row clearfix">
            {services && services.slice(0, data.limit || 6).map((service, index) => (
              <div key={service.id} className="services-block-three col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay={`${(index % 3) * 150}ms`} data-wow-duration="1500ms">
                  <div className="border-one"></div>
                  <div className="border-two"></div>
                  <div className="content">
                    <div className="icon-box">
                      {service.icon && <Icon icon={service.icon} className="icon" />}
                    </div>
                    <h6>{service.title}</h6>
                    <div className="text">{service.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Team Grid (fetch from database)
  if (type === 'team_grid') {
    return (
      <section className="team-section">
        <div className="container">
          {(data.sectionTitle || data.sectionLabel) && (
            <div className="section-title centered">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />}
            </div>
          )}
          <div className="row clearfix">
            {team && team.slice(0, data.limit || 4).map((member, index) => (
              <div key={member.id} className="team-block col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay={`${index * 150}ms`}>
                  <div className="image">
                    <img src={member.photo_url || '/images/team/default.jpg'} alt={member.name} />
                  </div>
                  <div className="lower-content">
                    <h6>{member.name}</h6>
                    <div className="designation">{member.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // News Preview (fetch latest from database)
  if (type === 'news_preview') {
    return (
      <section className="news-section">
        <div className="container">
          {(data.sectionTitle || data.sectionLabel) && (
            <div className="section-title">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />}
            </div>
          )}
          <div className="row clearfix">
            {news && news.map((article, index) => (
              <div key={article.id} className="news-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay={`${index * 150}ms`}>
                  {article.featured_image && (
                    <div className="image">
                      <Link to={`/news/${article.slug}`}>
                        <img src={article.featured_image} alt={article.title} />
                      </Link>
                    </div>
                  )}
                  <div className="lower-content">
                    <div className="post-date">
                      {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <h6>
                      <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </h6>
                    <div className="text">{article.excerpt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {data.showViewAll && (
            <div className="text-center mt-4">
              <Link to="/news" className="theme-btn btn-style-one">
                View All News
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Testimonials Dynamic (fetch from database)
  if (type === 'testimonials_dynamic') {
    return (
      <section className="testimonial-section">
        <div className="container">
          {(data.sectionTitle || data.sectionLabel) && (
            <div className="section-title">
              {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
              {data.sectionTitle && <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />}
            </div>
          )}
          <div className="testimonial-carousel owl-carousel owl-theme">
            {testimonials && testimonials.map((testimonial) => (
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
                      {testimonial.client_company && <div className="designation">{testimonial.client_company}</div>}
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

  // Quotes Dynamic (fetch from database)
  if (type === 'quotes_dynamic') {
    return (
      <section className="quote-section">
        <div className="container">
          {quotes && quotes.map((quote) => (
            <div key={quote.id} className="quote-box">
              <blockquote className="quote-text">
                <p>{quote.quote_text}</p>
                <footer>
                  <cite>
                    <strong>{quote.author_name}</strong>
                    {quote.author_title && <span className="d-block">{quote.author_title}</span>}
                    {quote.context && <span className="text-muted d-block">{quote.context}</span>}
                  </cite>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Metrics Counter
  if (type === 'metrics_counter') {
    return (
      <section className="counter-section">
        <div className="container">
          <div className="inner-container">
            <div className="row clearfix">
              {data.metrics && Array.isArray(data.metrics) && data.metrics.map((metric: any, index: number) => (
                <div key={index} className="counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInUp" data-wow-delay={`${index * 150}ms`}>
                    <div className="content">
                      {metric.icon && <div className={`icon ${metric.icon}`}></div>}
                      <div className="counter-title">{metric.label}</div>
                      <div className="count-outer count-box">
                        <span className="count-text" data-speed="2500" data-stop={metric.value}>
                          {metric.value}
                        </span>
                        {metric.suffix && <span>{metric.suffix}</span>}
                      </div>
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

  // Contact CTA
  if (type === 'contact_cta') {
    return (
      <section className="contact-cta-section" style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})` } : {}}>
        <div className="container">
          <div className="inner-container">
            <div className="row clearfix">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  {data.title && <h2>{data.title}</h2>}
                  {data.subtitle && <div className="text">{data.subtitle}</div>}
                </div>
              </div>
              <div className="button-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
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
      </section>
    );
  }

  // Default fallback
  return null;
};
