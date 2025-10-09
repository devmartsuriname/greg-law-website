import { useParams, Navigate, Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { services } from '../data/services';

export default function ServicesDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <PageTitle
        title="Services Detail"
        breadcrumbs={[{ label: 'Services', path: '/services' }, { label: service.title }]}
        metaTitle={`${service.title} | Greg Law`}
        metaDescription={service.description}
      />

      <section className="services-detail-section">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src={service.image} alt={service.title} />
                </div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt id mauris id auctor. Donec
                  at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. Praesent feugiat sem
                  mattis lorem fringilla, vitae varius nisi ultrices.
                </p>
                <div className="text">
                  <p>
                    The argument in favor of using filler text goes something like this: If you use real content in the
                    design process, anytime you reach a review point you'll end up reviewing and negotiating the
                    content itself and not the design.
                  </p>
                </div>
              </div>
            </div>

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget services-widget">
                  <div className="widget-content">
                    <ul className="service-list">
                      {services.map((s) => (
                        <li key={s.id} className={s.id === service.id ? 'current' : ''}>
                          <Link to={`/services/${s.id}`}>
                            <span className={s.icon}></span>
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
