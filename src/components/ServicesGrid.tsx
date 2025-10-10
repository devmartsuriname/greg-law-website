import { useServices } from '@/hooks/useServices';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface ServicesGridProps {
  featured?: boolean;
  limit?: number;
}

export const ServicesGrid = ({ featured, limit }: ServicesGridProps) => {
  const { services, loading, error } = useServices({ featured, limit });

  if (loading) {
    return (
      <section className="services-section-three">
        <div className="container">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error || services.length === 0) {
    return null;
  }

  return (
    <section className="services-section-three">
      <div className="container">
        <div className="row clearfix">
          <div className="blocks-column col-lg-12 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="row clearfix">
                {services.map((service, index) => (
                  <div key={service.id} className="services-block-three col-lg-4 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInUp"
                      data-wow-delay={`${(index % 3) * 300}ms`}
                      data-wow-duration="1500ms"
                    >
                      <div className="border-one"></div>
                      <div className="border-two"></div>
                      <div className="content">
                        {service.icon && (
                          <div className="icon-box">
                            <Icon icon={service.icon} className="icon" />
                          </div>
                        )}
                        <h6>
                          <Link to={`/services/${service.id}`}>{service.title}</Link>
                        </h6>
                        {service.description && <div className="text">{service.description}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
