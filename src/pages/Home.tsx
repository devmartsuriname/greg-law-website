import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LawSight - Law Firm Template | Homepage</title>
        <meta name="description" content="Professional law firm template with modern design" />
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
                      <img src="/images/main-slider/content-image-1.png" alt="LawSight" />
                    </div>
                  </div>
                  <div className="content-column col-lg-5 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <h2>
                        Assign <br /> lawsightss <br /> for Satisfaction
                      </h2>
                      <div className="text">
                        Introduce with LawSight, Lorem ipsum dolor sit amet, <br /> consectetuer adipiscing elit. Aenean
                        commodo <br /> ligula eget dolor.
                      </div>
                      <Link to="/contact" className="theme-btn btn-style-one">
                        Contact us today
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
                    <h4>Appointmentss</h4>
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
                    We are here to fight against any violance with <span>experience</span>
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
