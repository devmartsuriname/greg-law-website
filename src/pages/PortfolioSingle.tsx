import { useParams, Navigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function PortfolioSingle() {
  const { id } = useParams<{ id: string }>();
  
  const portfolio = {
    id: '1',
    title: 'Portfolio Project',
    image: '/images/gallery/1.jpg',
    description: 'Detailed portfolio project description goes here.',
  };

  if (id !== portfolio.id) {
    return <Navigate to="/portfolio/masonry" replace />;
  }

  return (
    <>
      <PageTitle
        title={portfolio.title}
        breadcrumbs={[
          { label: 'Portfolio', path: '/portfolio/masonry' },
          { label: portfolio.title },
        ]}
        metaTitle={`${portfolio.title} | Greg Law`}
        metaDescription={portfolio.description}
      />

      <section className="portfolio-single-section">
        <div className="container">
          <div className="row clearfix">
            <div className="content-column col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src={portfolio.image} alt={portfolio.title} />
                </div>
                <h2>{portfolio.title}</h2>
                <p>{portfolio.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt id mauris id auctor. Donec
                  at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
