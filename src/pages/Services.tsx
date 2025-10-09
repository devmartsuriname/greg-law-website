import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <PageTitle
        title="Services"
        breadcrumbs={[{ label: 'Services' }]}
        metaTitle="Our Services | Greg Law"
        metaDescription="Comprehensive legal services tailored to your specific needs and goals"
      />

      <section className="services-section-two" style={{ backgroundImage: 'url(/images/background/1.jpg)' }}>
        <div className="container">
          <div className="section-title light centered">
            <div className="title">Services</div>
            <h3>
              We are here to fight against any <br /> violance with <span>experience</span>
            </h3>
          </div>
          <div className="row clearfix">
            {services.map((service) => (
              <div key={service.id} className="services-block-two col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <span className={`icon ${service.icon}`}></span>
                  </div>
                  <h3>{service.title}</h3>
                  <div className="text">{service.description}</div>
                  <div className="overlay-box" style={{ backgroundImage: `url(${service.image})` }}>
                    <div className="overlay-inner">
                      <div className="content">
                        <span className={`icon ${service.icon}`}></span>
                        <h4>
                          <Link to={`/services/${service.id}`}>{service.title}</Link>
                        </h4>
                        <Link to={`/services/${service.id}`} className="theme-btn btn-style-one">
                          consult now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
