import PageTitle from "../components/PageTitle";

export default function About() {
  return (
    <>
      <PageTitle
        title="About Us"
        breadcrumbs={[{ label: "About Us" }]}
        metaTitle="About Us | Greg Law"
        metaDescription="Learn about our law firm and our experienced legal team dedicated to your success"
      />

      <section className="about-section">
        <div className="image-layer" style={{ backgroundImage: "url(/images/resource/about-1.jpg)" }}></div>
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">Biography</div>
                  <h3>
                    Dedicated to <span>Public Service</span>
                  </h3>
                </div>

                <div className="text">
                  <p>
                    Gregory Allan Rusland has dedicated his career to serving the people of Suriname with integrity and
                    vision. As <span>Vice President,</span>
                    he brings over 15 years of experience in public service, having served in various capacities from
                    Minister of Natural Resources to Member of Parliament.
                  </p>
                  <p>
                    His leadership focuses on sustainable development, youth empowerment, and strengthening
                    international partnerships to ensure a prosperous future for all Surinamese citizens.
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
                  Contact the <a href="#">VP Office</a> <strong>+597 472-000</strong> <span className="or">or</span>{" "}
                  <strong>+597 472-001</strong>
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

            <div className="image-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                <div className="image">
                  <img src="/images/resource/about-2.jpg" alt="" />
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

      {/* Feature Section Two - Timeline */}
      <section className="feature-section-two">
        <div className="container">
          <div className="inner-container">
            <div className="row clearfix">
              {[
                {
                  year: "2016",
                  title: "Started Journey",
                  text: "Founded with a vision to provide exceptional legal services to our community.",
                },
                {
                  year: "2017",
                  title: "We employed lawyers",
                  text: "Expanded our team with experienced attorneys in various legal specialties.",
                },
                {
                  year: "2018",
                  title: "Winning best awards",
                  text: "Recognized for excellence in legal practice and client satisfaction.",
                },
                {
                  year: "2019",
                  title: "Improved team",
                  text: "Continued growth and development of our professional legal team.",
                },
              ].map((item, index) => (
                <div key={index} className="feature-block-two col-lg-3 col-md-6 col-sm-12">
                  <div className="fill-line"></div>
                  <div className="inner-box">
                    <div className="year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <div className="text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter-section style-two">
        <div className="container">
          <div className="title-box">
            <div className="section-title">
              <div className="row clearfix">
                <div className="column col-lg-6 col-md-12 col-sm-12">
                  <div className="title">Fun fact</div>
                  <h3>
                    We feel very proud for our <br /> great <span>achievement</span>
                  </h3>
                </div>
                <div className="column col-lg-6 col-md-12 col-sm-12">
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <p>
                        Our commitment to excellence has resulted in outstanding outcomes for our clients across diverse
                        legal matters.
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <p>
                        We pride ourselves on our track record of success and the lasting relationships we build with
                        our clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fact-counter">
            <div className="row clearfix">
              {[
                { count: "1825", title: "Completed works" },
                { count: "532", title: "Satisfied clients" },
                { count: "69", title: "Winning awards" },
                { count: "32", title: "Team members" },
              ].map((counter, index) => (
                <div key={index} className="column counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                    <div className="count-outer count-box">
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

      {/* Subscribe Section */}
      <section className="subscribe-section">
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
