import { PageSection as PageSectionType } from '@/hooks/usePages';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface PageSectionProps {
  section: PageSectionType;
}

export const PageSection = ({ section }: PageSectionProps) => {
  const { type, data } = section;

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

  // About Enhanced section (with signature, phone, checklist, video, KPIs)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'about_enhanced') {
    if (!data || Object.keys(data).length === 0) return null;
    
    return (
      <section className="about-section style-two">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
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
                
                {data.phones && Array.isArray(data.phones) && data.phones.length > 0 && (
                  <div className="question">
                    Contact the<a href="#">{data.contactLabel || 'VP Office'}</a>{' '}
                    {data.phones.map((phone: string, index: number) => (
                      <span key={index}>
                        <strong>{phone}</strong>
                        {index < data.phones.length - 1 && <span className="or"> or </span>}
                      </span>
                    ))}
                  </div>
                )}
                
                {data.signature && (
                  <div className="signature">
                    {data.signature.image && (
                      <div className="signature-img">
                        <img src={data.signature.image} alt="Signature" />
                      </div>
                    )}
                    {data.signature.name && <h5>{data.signature.name}</h5>}
                    {data.signature.title && <div className="designation">({data.signature.title})</div>}
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

                {data.kpis && Array.isArray(data.kpis) && data.kpis.length > 0 && (
                  <div className="fact-counter style-two">
                    <div className="container">
                      <div className="row clearfix">
                        {data.kpis.map((kpi: any, index: number) => (
                          <div key={index} className="column counter-column col-lg-4 col-md-6 col-sm-12">
                            <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                              <div className="count-outer count-box">
                                <span className="count-text" data-speed="2000" data-stop={kpi.value}>
                                  0
                                </span>
                                {kpi.suffix && kpi.suffix}
                                <div className="counter-title">{kpi.label}</div>
                                {kpi.description && <div className="text">{kpi.description}</div>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Services Grid Dynamic (6 services + 1 side image with experience years)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'services_grid_dynamic') {
    if (!data || Object.keys(data).length === 0) return null;
    
    return (
      <section className="services-section-three">
        <div
          className="icon-one wow fadeInLeft"
          data-wow-delay="250ms"
          data-wow-duration="1500ms"
          style={{ backgroundImage: "url(/images/icons/icon-6.png)" }}
        ></div>
        <div
          className="icon-two wow fadeInRight"
          data-wow-delay="500ms"
          data-wow-duration="1500ms"
          style={{ backgroundImage: "url(/images/icons/icon-7.png)" }}
        ></div>
        <div className="container">
          <div className="row clearfix">
            <div className="blocks-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="row clearfix">
                  {data.services && Array.isArray(data.services) && data.services.map((service: any, index: number) => (
                    <div key={index} className="services-block-three col-lg-6 col-md-6 col-sm-12">
                      <div
                        className="inner-box wow fadeInUp"
                        data-wow-delay={`${(index % 2) * 300}ms`}
                        data-wow-duration="1500ms"
                      >
                        <div className="border-one"></div>
                        <div className="border-two"></div>
                        <div className="content">
                          <div className="icon-box">
                            {service.icon && <span className={`icon ${service.icon}`}></span>}
                          </div>
                          <h6>
                            {service.slug ? (
                              <Link to={`/services/${service.slug}`}>{service.title}</Link>
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
                    <img src={data.sideImage.url} alt={data.sideImage.alt || ''} />
                    {data.sideImage.overlay && (
                      <div className="overlay-box">
                        <div className="overlay-inner">
                          <div className="content">
                            <h2 dangerouslySetInnerHTML={{ __html: data.sideImage.overlay }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Career Timeline (3 period columns)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'career_timeline') {
    if (!data || !data.items || data.items.length === 0) return null;
    
    return (
      <section className="feature-section-two">
        <div className="container">
          <div className="inner-container">
            <div className="row clearfix">
              {data.items.map((item: any, index: number) => (
                <div key={index} className="feature-block-two col-lg-4 col-md-6 col-sm-12">
                  <div className="fill-line"></div>
                  <div className="inner-box">
                    <div className="year">{item.period}</div>
                    <h3>{item.title}</h3>
                    <div className="text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Metrics Counter (animated KPI counters)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'metrics_counter') {
    if (!data || !data.items || data.items.length === 0) return null;
    
    return (
      <section className="counter-section">
        <div className="container">
          <div className="fact-counter style-three">
            <div className="row clearfix">
              {data.items.map((item: any, index: number) => (
                <div key={index} className="column counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                    <div className="count-outer count-box">
                      {item.icon && <div className={`icon ${item.icon}`}></div>}
                      <span className="count-text" data-speed="3000" data-stop={item.value}>
                        0
                      </span>
                      {item.suffix && item.suffix}
                      <div className="counter-title">{item.label}</div>
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

  // Team Grid (fetch from team_members table)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'team_grid') {
    if (!data || !data.members || data.members.length === 0) return null;
    
    return (
      <section className="team-section">
        <div className="container">
          {(data.sectionTitle || data.sectionLabel) && (
            <div className="section-title light">
              <div className="clearfix">
                <div className="pull-left">
                  {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
                  <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle || '' }} />
                </div>
                {data.description && (
                  <div className="pull-right">
                    <div className="text">{data.description}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="clearfix">
            {data.members.map((member: any, index: number) => (
              <div key={index} className="team-block col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                  <div className="image">
                    <a href="#">
                      <img src={member.photo_url || member.image} alt={member.name} />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h3>
                      <a href="#">{member.name}</a>
                    </h3>
                    <div className="designation">{member.title || member.position}</div>
                    {member.social_links && (
                      <div className="overlay-box">
                        <div className="overlay-content">
                          <div className="title">Contact info</div>
                          <ul className="social-icons">
                            {member.social_links.facebook && (
                              <li>
                                <a href={member.social_links.facebook}>
                                  <span className="fa fa-facebook"></span>
                                </a>
                              </li>
                            )}
                            {member.social_links.twitter && (
                              <li>
                                <a href={member.social_links.twitter}>
                                  <span className="fa fa-twitter"></span>
                                </a>
                              </li>
                            )}
                            {member.social_links.linkedin && (
                              <li>
                                <a href={member.social_links.linkedin}>
                                  <span className="fa fa-linkedin"></span>
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // News Preview (latest 3 posts from news table)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'news_preview') {
    if (!data || !data.news || data.news.length === 0) return null;
    
    return (
      <section className="news-section style-two">
        <div className="container">
          {(data.sectionTitle || data.sectionLabel) && (
            <div className="section-title">
              <div className="clearfix">
                <div className="pull-left">
                  {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
                  <h3 dangerouslySetInnerHTML={{ __html: data.sectionTitle || '' }} />
                </div>
                {data.description && (
                  <div className="pull-right">
                    <div className="text">{data.description}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="row clearfix">
            {data.news.map((newsItem: any, index: number) => (
              <div key={index} className="news-block col-lg-4 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="image">
                    <img src={newsItem.featured_image || newsItem.image} alt={newsItem.title} />
                    <div className="overlay-box">
                      <a href={newsItem.featured_image || newsItem.image} data-fancybox="news" data-caption="" className="plus flaticon-plus"></a>
                    </div>
                  </div>
                  <div className="lower-content">
                    <ul className="post-meta">
                      {newsItem.published_at && (
                        <li>
                          <span className="fa fa-calendar"></span>
                          {new Date(newsItem.published_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </li>
                      )}
                      <li>
                        <span className="fa fa-user"></span>Admin
                      </li>
                    </ul>
                    <h5>
                      <Link to={`/news/${newsItem.slug}`}>{newsItem.title}</Link>
                    </h5>
                    <Link to={`/news/${newsItem.slug}`} className="theme-btn btn-style-two">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Contact CTA Enhanced (form + office info + map)
  // TODO: Connect dynamic data once useDynamicContent.ts is implemented (Phase 6B Step 2)
  if (type === 'contact_cta_enhanced') {
    if (!data || Object.keys(data).length === 0) return null;
    
    return (
      <section className="contact-form-section">
        {data.mapConfig && (
          <div className="map-section">
            <div className="map-outer">
              <div
                className="map-canvas"
                data-zoom={data.mapConfig.zoom || "12"}
                data-lat={data.mapConfig.lat}
                data-lng={data.mapConfig.lng}
                data-type={data.mapConfig.type || "roadmap"}
                data-hue={data.mapConfig.hue || "#ffc400"}
                data-title={data.mapConfig.title}
                data-icon-path={data.mapConfig.iconPath || "/images/icons/map-marker.png"}
                data-content={data.mapConfig.content}
              ></div>
            </div>
          </div>
        )}
        
        <div className="container">
          <div className="inner-container">
            <div className="upper-content">
              <div className="row clearfix">
                <div className="title-column col-lg-5 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="section-title">
                      {data.sectionLabel && <div className="title">{data.sectionLabel}</div>}
                      <h3 dangerouslySetInnerHTML={{ __html: data.title || '' }} />
                    </div>
                  </div>
                </div>

                {data.contacts && (
                  <div className="info-column col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="row clearfix">
                        {data.contacts.address && (
                          <div className="column col-lg-6 col-md-6 col-sm-12">
                            <ul className="list-style-two style-two">
                              <li>
                                <span className="icon flaticon-placeholder-1"></span>
                                {data.contacts.address}
                              </li>
                            </ul>
                          </div>
                        )}
                        <div className="column col-lg-6 col-md-6 col-sm-12">
                          <ul className="list-style-two style-two">
                            {data.contacts.phone && (
                              <li>
                                <span className="icon flaticon-phone-call"></span>
                                {data.contacts.phone}
                              </li>
                            )}
                            {data.contacts.email && (
                              <li>
                                <span className="icon flaticon-chat"></span>
                                {data.contacts.email}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="default-form style-two">
              <form method="post" action={data.formEndpoint || "/contact"}>
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
    );
  }

  // Default fallback
  return null;
};
