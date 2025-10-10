import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import PageTitle from '../components/PageTitle';
import { useService } from '../hooks/useService';
import { useServices } from '../hooks/useServices';

export default function ServicesDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { service, loading } = useService(slug || '');
  const { services } = useServices({ limit: 6 });
  const [activeTab, setActiveTab] = useState('audit');

  if (loading) {
    return (
      <>
        <PageTitle
          title="Services"
          breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Loading...' }]}
        />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const currentIndex = services.findIndex((s) => s.id === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;
  const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 2);

  return (
    <>
      <PageTitle
        title="Services"
        breadcrumbs={[{ label: 'Services', path: '/services' }, { label: 'Services Detail' }]}
        metaTitle={`${service.title} | Greg Law`}
        metaDescription={service.description}
      />

      <div className="sidebar-page-container">
        <div className="container">
          <div className="row clearfix">
            {/* Sidebar Side */}
            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar padding-right">
                {/* Services List Widget */}
                <div className="sidebar-widget sidebar-blog-category">
                  <ul className="blog-cat">
                    {services.map((s) => (
                      <li key={s.id} className={s.id === service.id ? 'active' : ''}>
                        <Link to={`/services/${s.id}`}>{s.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Widget */}
                <div className="sidebar-widget contact-widget">
                  <div className="sidebar-title">
                    <h4>Contact</h4>
                  </div>
                  <ul>
                    <li>
                      <span className="icon flaticon-map-1"></span> 380 St Kilda Road <br /> Melbourne VIC 3004
                    </li>
                    <li>
                      <span className="icon flaticon-call-answer"></span> +123 (4567) 890 <br /> +123 (4567) 891
                    </li>
                    <li>
                      <span className="icon flaticon-comment"></span> info@greglaw.com
                    </li>
                  </ul>
                </div>

                {/* Brochures Widget */}
                <div className="sidebar-widget brochures-widget">
                  <div className="sidebar-title">
                    <h4>Brochures</h4>
                  </div>
                  <div className="text">
                    View our 2024 legal services brochure for an easy to read guide on all of the services we offer.
                  </div>
                  <ul className="files">
                    <li>
                      <a href="#">
                        <span className="flaticon-download-arrow"></span> Download Brochure
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="flaticon-pdf"></span> Service Details
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>

            {/* Content Side */}
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="services-single">
                <h4>{service.title}</h4>
                <div className="text">
                  {service.description ? (
                    <p>{service.description}</p>
                  ) : (
                    <>
                      <p>
                        Our {service.title.toLowerCase()} practice provides comprehensive legal solutions tailored to your specific needs. With years of experience and a proven track record, our attorneys are dedicated to protecting your rights and achieving the best possible outcomes.
                      </p>
                      <p>
                        We understand the complexities involved and work diligently to provide clear guidance throughout the entire legal process, ensuring you are informed and confident every step of the way.
                      </p>
                    </>
                  )}
                </div>
                <ul className="list-style-five">
                  <li>Expert legal consultation and representation</li>
                  <li>Comprehensive case evaluation and strategy</li>
                  <li>Dedicated attorney assigned to your case</li>
                  <li>Regular updates and transparent communication</li>
                </ul>

                {/* Services Gallery */}
                <div className="services-gallery">
                  <div className="services-carousel owl-carousel owl-theme">
                    {[2, 3, 2, 3, 2, 3].map((num, index) => (
                      <div key={index} className="slide">
                        <div className="image">
                          <img src={`/images/resource/service-${num}.jpg`} alt="Service" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Info Tabs */}
                <div className="Services-info-tabs">
                  <div className="service-tabs tabs-box">
                    {/* Tab Btns */}
                    <ul className="tab-btns tab-buttons clearfix">
                      <li
                        onClick={() => setActiveTab('audit')}
                        className={`tab-btn ${activeTab === 'audit' ? 'active-btn' : ''}`}
                      >
                        <i>Approach</i>
                      </li>
                      <li
                        onClick={() => setActiveTab('strategy')}
                        className={`tab-btn ${activeTab === 'strategy' ? 'active-btn' : ''}`}
                      >
                        <i>Strategy</i>
                      </li>
                      <li
                        onClick={() => setActiveTab('sustainability')}
                        className={`tab-btn ${activeTab === 'sustainability' ? 'active-btn' : ''}`}
                      >
                        <i>Results</i>
                      </li>
                    </ul>

                    {/* Tabs Container */}
                    <div className="tabs-content">
                      {/* Tab - Approach */}
                      <div className={`tab ${activeTab === 'audit' ? 'active-tab' : ''}`} id="prod-audit">
                        <div className="content">
                          <div className="text">
                            <p>
                              Our approach begins with a thorough understanding of your unique situation. We take the time to listen to your concerns, analyze all relevant factors, and develop a customized legal strategy that aligns with your goals and objectives.
                            </p>
                            <p>
                              We believe in proactive representation, anticipating challenges before they arise and positioning your case for the strongest possible outcome. Our team works collaboratively to ensure every aspect of your case receives the attention it deserves.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tab - Strategy */}
                      <div className={`tab ${activeTab === 'strategy' ? 'active-tab' : ''}`} id="prod-strategy">
                        <div className="content">
                          <div className="text">
                            <p>
                              Our strategic planning process involves comprehensive research, careful analysis of precedents, and innovative thinking to build the strongest possible case. We leverage our extensive experience and legal expertise to identify opportunities and mitigate risks.
                            </p>
                            <p>
                              Throughout the process, we maintain open communication with our clients, ensuring you understand each step and have input in critical decisions. Our strategies are designed to be both effective and efficient, maximizing value while minimizing unnecessary costs.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tab - Results */}
                      <div className={`tab ${activeTab === 'sustainability' ? 'active-tab' : ''}`} id="prod-sustainability">
                        <div className="content">
                          <div className="text">
                            <p>
                              Our track record speaks for itself. We have successfully represented hundreds of clients, achieving favorable outcomes in even the most challenging cases. Our commitment to excellence and client satisfaction has earned us recognition as a leading law firm.
                            </p>
                            <p>
                              Beyond immediate case resolution, we focus on long-term results that protect your interests and provide lasting peace of mind. Our clients trust us not just for our legal expertise, but for our dedication to their success.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Services */}
                <div className="row clearfix">
                  {relatedServices.map((relatedService) => (
                    <div key={relatedService.id} className="services-block-two style-two col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="icon-box">
                          {relatedService.icon ? (
                            <Icon icon={relatedService.icon} width={48} />
                          ) : (
                            <span className="icon flaticon-law"></span>
                          )}
                        </div>
                        <h3>{relatedService.title}</h3>
                        <div className="text">{relatedService.description}</div>
                        <div className="overlay-box" style={{ backgroundImage: 'url(/images/resource/service-1.jpg)' }}>
                          <div className="overlay-inner">
                            <div className="content">
                              {relatedService.icon ? (
                                <Icon icon={relatedService.icon} width={48} className="text-white" />
                              ) : (
                                <span className="icon flaticon-law"></span>
                              )}
                              <h4>
                                <Link to={`/services/${relatedService.id}`}>{relatedService.title}</Link>
                              </h4>
                              <Link to={`/services/${relatedService.id}`} className="theme-btn btn-style-one">
                                consult now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* More Services Navigation */}
                <div className="more-services">
                  <div className="clearfix">
                    <div className="pull-left">
                      {prevService && (
                        <Link to={`/services/${prevService.id}`}>
                          <span className="fa fa-angle-double-left"></span> Previous Service
                        </Link>
                      )}
                    </div>
                    <div className="pull-right">
                      {nextService && (
                        <Link to={`/services/${nextService.id}`}>
                          Next Service <span className="fa fa-angle-double-right"></span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <section className="subscribe-section">
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
