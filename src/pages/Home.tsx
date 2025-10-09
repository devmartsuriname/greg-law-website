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
                        Gregory Allan Rusland <br /> Vice President of the Republic of Suriname
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
                    <div className="title">Request a</div>
                    <h4>Meeting</h4>
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
                    <div className="title">Citizen</div>
                    <h4>Services</h4>
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
                    <div className="title">Contact</div>
                    <h4>VP Office</h4>
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
                  <div className="title">About Gregory</div>
                  <h3>
                    Serving Suriname with <span>vision & integrity</span>
                  </h3>
                </div>

                <div className="text">
                  <p>
                    I am Gregory Allan Rusland, Vice President of Suriname. With decades of experience in governance and{" "}
                    <span> public service,</span> I dedicate my work to advancing Suriname's development and creating
                    opportunities for all citizens.
                  </p>
                  <p>
                    Through collaborative leadership and strategic vision, we work together to build a stronger, more
                    prosperous Suriname that serves every community and every generation.
                  </p>
                </div>
                <div className="row clearfix">
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Economic development and growth.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Youth empowerment and education.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>International partnerships.</li>
                    </ul>
                  </div>
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <ul className="list-style-one">
                      <li>Sustainable development initiatives.</li>
                    </ul>
                  </div>
                </div>
                <div className="question">
                  Contact the<a href="#">VP Office</a> <strong>+597 472 000</strong> <span className="or">or</span>{" "}
                  <strong>+597 472-001</strong>
                </div>
                <div className="signature">
                  <div className="signature-img">
                    <img src="/images/icons/signature.png" alt="" />
                  </div>
                  <h5>Gregory AllanRusland</h5>
                  <div className="designation">(Vice President)</div>
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
                            <span className="count-text" data-speed="2000" data-stop="15">
                              0
                            </span>
                            <div className="counter-title">Years of Service</div>
                            <div className="text">Public service dedication</div>
                          </div>
                        </div>
                      </div>

                      <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                          <div className="count-outer count-box">
                            <span className="count-text" data-speed="3500" data-stop="50">
                              0
                            </span>
                            +<div className="counter-title">Policy Initiatives</div>
                            <div className="text">Development programs</div>
                          </div>
                        </div>
                      </div>

                      <div className="column counter-column col-lg-4 col-md-12 col-sm-12">
                        <div className="inner wow fadeInLeft" data-wow-delay="600ms" data-wow-duration="1500ms">
                          <div className="count-outer count-box">
                            <span className="count-text" data-speed="2000" data-stop="100">
                              0
                            </span>
                            <div className="counter-title">Citizens Impacted</div>
                            <div className="text">Community reach</div>
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
                {
                  year: "2005-2010",
                  title: "Minister of Natural Resources",
                  content:
                    "Led national resource management and sustainable development initiatives for Suriname's growth.",
                },
                {
                  year: "2010-2015",
                  title: "Member of Parliament, NPS",
                  content:
                    "Represented constituents and championed key legislative initiatives for national development.",
                },
                {
                  year: "2020-Present",
                  title: "Vice President of Suriname",
                  content:
                    "Leading national development initiatives and strengthening international partnerships for Suriname.",
                },
              ].map((item, index) => (
                <div key={index} className="feature-block-two col-lg-4 col-md-6 col-sm-12">
                  <div className="fill-line"></div>
                  <div className="inner-box">
                    <div className="year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <div className="text">{item.content}</div>
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
                    {
                      icon: "fa fa-bullhorn",
                      title: "Economic Development",
                      slug: "economic-development",
                      content:
                        "Driving sustainable growth and creating opportunities for all citizens through strategic economic initiatives.",
                    },
                    {
                      icon: "fa fa-suitcase",
                      title: "Social Projects",
                      slug: "social-projects",
                      content:
                        "Supporting community programs and advancing social welfare initiatives that strengthen our society.",
                    },
                    {
                      icon: "fa fa-area-chart",
                      title: "Youth & Education",
                      slug: "youth-education",
                      content:
                        "Investing in future leaders through education and youth empowerment programs across Suriname.",
                    },
                    {
                      icon: "fa fa-coffee",
                      title: "International Relations",
                      slug: "international-relation",
                      content:
                        "Strengthening global partnerships and diplomatic relationships to advance Suriname's interests worldwide.",
                    },
                    {
                      icon: "fa fa-building",
                      title: "Sustainable Development",
                      slug: "sustainable-development",
                      content:
                        "Promoting green energy and environmental stewardship initiatives for a sustainable future.",
                    },
                    {
                      icon: "fa fa-pie-chart",
                      title: "Public Service Excellence",
                      slug: "public-service",
                      content:
                        "Enhancing transparency and improving service delivery to citizens through government modernization.",
                    },
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
                          <div className="text">{service.content}</div>
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
                          15 <span>years of public service experience</span>
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
            <div className="title">Leadership Vision</div>
            <h3>
              Words that guide our<span>vision</span>
            </h3>
          </div>

          <div className="testimonial-carousel owl-carousel owl-theme">
            {[
              {
                name: "Gregory Allan Rusland",
                position: "Vice President of Suriname",
                content: "Leadership means serving people with vision, trust, and responsibility.",
              },
              {
                name: "Gregory Allan Rusland",
                position: "Vice President of Suriname",
                content: "Together we build a Suriname that offers opportunities for every generation.",
              },
              {
                name: "Gregory Allan Rusland",
                position: "Vice President of Suriname",
                content: "Together we build a Suriname that offers opportunities for every generation.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-block-two">
                <div className="inner-box">
                  <div className="text">{testimonial.content}</div>
                  <div className="author-post">
                    <div className="author-inner">
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
                <div className="title">Latest News</div>
                <h3>
                  Stay informed with
                  <br /> our latest <span>news</span>
                </h3>
              </div>
              <div className="pull-right">
                <div className="text">
                  Stay updated with the latest announcements, initiatives, and achievements from the Office of Vice
                  President Gregory Allan Rusland. Discover how our government is working to build a stronger, more
                  prosperous Suriname.
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            {[
              {
                title: "New Economic Initiative Launched",
                image: "/images/resource/news-1.jpg",
                date: "December 15, 2024",
                slug: "family-law-rights",
              },
              {
                title: "Youth Leadership Program Expansion",
                image: "/images/resource/news-2.jpg",
                date: "December 10, 2024",
                slug: "corporate-law-updates",
              },
              {
                title: "Regional Partnership Summit",
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
                { icon: "fa fa-briefcase", count: "125", title: "Community Programs" },
                { icon: "flaticon-teamwork", count: "45", title: "Policy Initiatives" },
                { icon: "flaticon-ribbon-badge-award", count: "18", title: "Regional Partnerships" },
                { icon: "flaticon-multiple-users-silhouette", count: "85", title: "Government Officials" },
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
