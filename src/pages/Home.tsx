import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Greg Law - Expert Legal Services | Home</title>
        <meta
          name="description"
          content="Professional legal services and consultation with experienced attorneys dedicated to your success"
        />
      </Helmet>

      {/* Banner Section Two */}
      <section className="banner-section-two" style={{ backgroundImage: "url(/images/main-slider/2.jpg)" }}>
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
                      <img src="/images/main-slider/content-image-1.png" alt="Greg Law Legal Services" />
                    </div>
                  </div>
                  <div className="content-column col-lg-5 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <h2>
                        Gregory Allan Rusland <br /> Vice President of the Republic of Suriname <br /> for Your Success
                      </h2>
                      <div className="text">
                        Serving Suriname with integrity, vision, and commitment to progress. Together we build a
                        stronger nation for every generation.
                      </div>
                      <Link to="/contact" className="theme-btn btn-style-one">
                        ABOUT GREGORY
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="container">
          <div className="inner-container">
            <div className="clearfix">
              <div className="feature-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="big-icon flaticon-calendar"></div>
                  <div className="content">
                    <div className="icon-box">
                      <span className="icon flaticon-calendar"></span>
                    </div>
                    <div className="title">Book an</div>
                    <h4>Appointment</h4>
                  </div>
                </div>
              </div>

              <div className="feature-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="big-icon flaticon-link-symbol"></div>
                  <div className="content">
                    <div className="icon-box">
                      <span className="icon flaticon-link-symbol"></span>
                    </div>
                    <div className="title">Join our</div>
                    <h4>Team member</h4>
                  </div>
                </div>
              </div>

              <div className="feature-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="big-icon flaticon-calendar"></div>
                  <div className="content">
                    <div className="icon-box">
                      <span className="icon flaticon-calendar"></span>
                    </div>
                    <div className="title">Book an</div>
                    <h4>Appointment</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section style-two">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">about us</div>
                  <h3>
                    We are here to fight against any violence with <span>experience</span>
                  </h3>
                </div>

                <div className="text">
                  <p>
                    The argument in favor of using filler text goes something like this: If you use real content in the{" "}
                    <span>design process,</span> anytime you reach a review point you'll end up reviewing and
                    negotiating the content itself and not the design.
                  </p>
                  <p>
                    Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum,
                    quis porta sem finibus.
                  </p>
                </div>
                <div className="row clearfix">
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Praesent feugiat sem mattis.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>A wonderful serenity.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Premium services beyond you.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Set a link back to this photo.</li>
                    </ul>
                  </div>
                </div>
                <div className="question">
                  Call to ask <a href="#">any question</a> <strong>540-325-1523</strong> <span className="or">or</span>{" "}
                  <strong>540-328-1265</strong>
                </div>
                <div className="signature">
                  <div className="signature-img">
                    <img src="/images/icons/signature.png" alt="" />
                  </div>
                  <h5>Natalia Duke</h5>
                  <div className="designation">(Chairman and founder)</div>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="video-box">
                  <figure className="video-image">
                    <img src="/images/resource/video-img.jpg" alt="" />
                  </figure>
                  <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image overlay-box">
                    <span className="flaticon-play-button"></span>
                  </a>
                </div>

                <div className="fact-counter style-two">
                  <div className="container">
                    <div className="row clearfix">
                      <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                          <div className="count-outer count-box">
                            <span className="count-text" data-speed="2000" data-stop="1235">
                              0
                            </span>
                            <div className="counter-title">Satisfied Clients</div>
                            <div className="text">Dolore magna aliq</div>
                          </div>
                        </div>
                      </div>

                      <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                          <div className="count-outer count-box">
                            <span className="count-text" data-speed="3500" data-stop="1402">
                              0
                            </span>
                            +<div className="counter-title">Completed works</div>
                            <div className="text">connstur adicing</div>
                          </div>
                        </div>
                      </div>

                      <div className="column counter-column col-lg-4 col-md-12 col-sm-12">
                        <div className="inner wow fadeInLeft" data-wow-delay="600ms" data-wow-duration="1500ms">
                          <div className="count-outer count-box">
                            <span className="count-text" data-speed="2000" data-stop="35">
                              0
                            </span>
                            <div className="counter-title">Winning Awards</div>
                            <div className="text">Lorem ipsum dolor</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section Two */}
      <section className="feature-section-two">
        <div className="container">
          <div className="inner-container">
            <div className="row clearfix">
              {[
                { year: "2016", title: "Started Journey" },
                { year: "2017", title: "We employed lawyers" },
                { year: "2018", title: "Winning best awards" },
                { year: "2019", title: "Improved team" },
              ].map((item, index) => (
                <div key={index} className="feature-block-two col-lg-3 col-md-6 col-sm-12">
                  <div className="fill-line"></div>
                  <div className="inner-box">
                    <div className="year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <div className="text">
                      Lorem ipsum dolor sit amet, con sectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Three */}
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
                  {[
                    { icon: "fa fa-bullhorn", title: "Market Law", slug: "market-law" },
                    { icon: "fa fa-suitcase", title: "Business Planning", slug: "business-planning" },
                    { icon: "fa fa-area-chart", title: "Investment Trade", slug: "investment-trade" },
                    { icon: "fa fa-coffee", title: "Fund Law", slug: "fund-law" },
                    { icon: "fa fa-building", title: "Home Law", slug: "home-law" },
                    { icon: "fa fa-pie-chart", title: "Insurance Law", slug: "insurance-law" },
                  ].map((service, index) => (
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
                            <span className={`icon ${service.icon}`}></span>
                          </div>
                          <h6>
                            <Link to={`/services/${service.slug}`}>{service.title}</Link>
                          </h6>
                          <div className="text">
                            Expert legal consultation and representation for your {service.title.toLowerCase()} needs.
                          </div>
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
                  <img src="/images/resource/about-2.jpg" alt="Legal Services Experience" />
                  <div className="overlay-box">
                    <div className="overlay-inner">
                      <div className="content">
                        <h2>
                          35 <span>years of experience</span>
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

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="section-title">
            <div className="title">Testimonial</div>
            <h3>
              Clients are very satisfied <br /> to work with <span>us</span>
            </h3>
          </div>

          <div className="testimonial-carousel owl-carousel owl-theme">
            {[
              { name: "Andrew Rob", position: "Business Owner", image: "/images/resource/author-3.jpg" },
              { name: "Nelli Johnson", position: "CEO", image: "/images/resource/author-4.jpg" },
              { name: "Michael Davis", position: "Entrepreneur", image: "/images/resource/author-3.jpg" },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-block-two">
                <div className="inner-box">
                  <div className="text">
                    Professional legal services with exceptional results. The team at Greg Law provided expert guidance
                    throughout our case and achieved outstanding outcomes. Highly recommended for their dedication and
                    expertise.
                  </div>
                  <div className="author-post">
                    <div className="author-inner">
                      <div className="image">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <h3>{testimonial.name}</h3>
                      <div className="designation">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-title light">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Our Team</div>
                <h3>
                  We feel very proud for our <br /> great <span>achievement</span>
                </h3>
              </div>
              <div className="pull-right">
                <div className="text">
                  Our experienced legal professionals are dedicated to providing exceptional service and achieving the
                  best possible outcomes for our clients.
                </div>
              </div>
            </div>
          </div>

          <div className="clearfix">
            {[
              { name: "Gregory Law", position: "Senior Attorney", image: "/images/resource/team-1.jpg" },
              { name: "Sarah Mitchell", position: "Family Law Specialist", image: "/images/resource/team-2.jpg" },
              { name: "Robert Chen", position: "Corporate Lawyer", image: "/images/resource/team-3.jpg" },
              { name: "Jessica Brown", position: "Criminal Defense Attorney", image: "/images/resource/team-4.jpg" },
            ].map((member, index) => (
              <div key={index} className="team-block col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                  <div className="image">
                    <a href="#">
                      <img src={member.image} alt={member.name} />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h3>
                      <a href="#">{member.name}</a>
                    </h3>
                    <div className="designation">{member.position}</div>
                    <div className="overlay-box">
                      <div className="overlay-content">
                        <div className="title">Contact info</div>
                        <ul className="social-icons">
                          <li>
                            <a href="#">
                              <span className="fa fa-facebook"></span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="fa fa-twitter"></span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="fa fa-linkedin"></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section style-two">
        <div className="container">
          <div className="section-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">News</div>
                <h3>
                  Learn something more from <br /> our latest <span>news</span>
                </h3>
              </div>
              <div className="pull-right">
                <div className="text">
                  Stay informed with the latest legal insights, case studies, and updates from our team of experienced
                  attorneys.
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            {[
              {
                title: "Understanding Your Legal Rights in Family Law Cases",
                image: "/images/resource/news-1.jpg",
                date: "December 15, 2024",
                slug: "family-law-rights",
              },
              {
                title: "Corporate Law Updates: What Businesses Need to Know",
                image: "/images/resource/news-2.jpg",
                date: "December 10, 2024",
                slug: "corporate-law-updates",
              },
              {
                title: "Protecting Your Interests in Real Estate Transactions",
                image: "/images/resource/news-3.jpg",
                date: "December 5, 2024",
                slug: "real-estate-protection",
              },
            ].map((news, index) => (
              <div key={index} className="news-block col-lg-4 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="image">
                    <img src={news.image} alt={news.title} />
                    <div className="overlay-box">
                      <a href={news.image} data-fancybox="news" data-caption="" className="plus flaticon-plus"></a>
                    </div>
                  </div>
                  <div className="lower-content">
                    <ul className="post-meta">
                      <li>
                        <span className="fa fa-calendar"></span>
                        {news.date}
                      </li>
                      <li>
                        <span className="fa fa-user"></span>Admin
                      </li>
                    </ul>
                    <h5>
                      <Link to={`/blog/${news.slug}`}>{news.title}</Link>
                    </h5>
                    <Link to={`/blog/${news.slug}`} className="theme-btn btn-style-two">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter-section">
        <div className="container">
          <div className="fact-counter style-three">
            <div className="row clearfix">
              {[
                { icon: "fa fa-briefcase", count: "1825", title: "Completed works" },
                { icon: "flaticon-teamwork", count: "532", title: "Satisfied clients" },
                { icon: "flaticon-ribbon-badge-award", count: "69", title: "Winning awards" },
                { icon: "flaticon-multiple-users-silhouette", count: "32", title: "Team members" },
              ].map((counter, index) => (
                <div key={index} className="column counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                    <div className="count-outer count-box">
                      <div className={`icon ${counter.icon}`}></div>
                      <span className="count-text" data-speed="3000" data-stop={counter.count}>
                        0
                      </span>
                      +<div className="counter-title">{counter.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="map-section">
          <div className="map-outer">
            <div
              className="map-canvas"
              data-zoom="12"
              data-lat="-37.817085"
              data-lng="144.955631"
              data-type="roadmap"
              data-hue="#ffc400"
              data-title="Greg Law"
              data-icon-path="/images/icons/map-marker.png"
              data-content="Melbourne VIC 3000, Australia<br><a href='mailto:info@greglaw.com'>info@greglaw.com</a>"
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
                      <div className="title">Contact us</div>
                      <h3>
                        Feel free to ask any <br /> question to <span>Us</span>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="info-column col-lg-7 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="row clearfix">
                      <div className="column col-lg-6 col-md-6 col-sm-12">
                        <ul className="list-style-two style-two">
                          <li>
                            <span className="icon flaticon-placeholder-1"></span>380 St Kilda Road, Melbourne VIC 3004,
                            Australia
                          </li>
                        </ul>
                      </div>
                      <div className="column col-lg-6 col-md-6 col-sm-12">
                        <ul className="list-style-two style-two">
                          <li>
                            <span className="icon flaticon-phone-call"></span>+123 (4567) 890
                          </li>
                          <li>
                            <span className="icon flaticon-chat"></span>info@greglaw.com
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

      {/* Subscribe Section */}
      <section className="subscribe-section style-two">
        <div className="container">
          <div className="inner-container" style={{ backgroundImage: "url(/images/background/3.jpg)" }}>
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
