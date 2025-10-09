import PageTitle from '../components/PageTitle';

export default function About() {
  return (
    <>
      <PageTitle
        title="About Us"
        breadcrumbs={[{ label: 'About Us' }]}
        metaTitle="About Us | LawSight"
        metaDescription="Learn about our law firm and our experienced team"
      />

      <section className="about-section">
        <div className="image-layer" style={{ backgroundImage: 'url(/images/resource/about-1.jpg)' }}></div>
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">about us</div>
                  <h3>
                    We are here to fight against any violance with <span>experience</span>
                  </h3>
                </div>

                <div className="text">
                  <p>
                    The argument in favor of using filler text goes something like this: If you use real content in
                    the <span>design process,</span> anytime you reach a review point you'll end up reviewing and
                    negotiating the content itself and not the design.
                  </p>
                  <p>
                    Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque
                    interdum, quis porta sem finibus.
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
                  Call to ask <a href="#">any question</a> <strong>540-325-1523</strong> <span className="or">or</span>{' '}
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
    </>
  );
}
