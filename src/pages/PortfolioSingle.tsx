import { useParams, Navigate, Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function PortfolioSingle() {
  const { id } = useParams<{ id: string }>();

  const portfolio = {
    id: '1',
    title: 'Marriage & Divorce',
    image: '/images/gallery/20.jpg',
    description: 'Dut perspiciatis unde omnis iste natus error sit voluptatems accusantium doloremqu laudantiums ut, totams se aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae duis autems vell eums iriure dolors in hendrerit saep.',
    category: 'Strategy',
    client: 'Real Madrid C.F',
    date: '24/11/2017',
    website: 'www.madridista.esp',
  };

  const relatedProjects = [
    {
      id: 1,
      image: '/images/gallery/17.jpg',
      title: 'Business Management',
      designation: 'Sustainability',
    },
    {
      id: 2,
      image: '/images/gallery/18.jpg',
      title: 'Digital Analysis',
      designation: 'Strategy',
    },
    {
      id: 3,
      image: '/images/gallery/19.jpg',
      title: 'Fund Management',
      designation: 'Sustainability',
    },
  ];

  if (id !== portfolio.id) {
    return <Navigate to="/portfolio/masonry" replace />;
  }

  return (
    <>
      <PageTitle
        title="Project Single"
        breadcrumbs={[{ label: 'Project Single' }]}
        metaTitle={`${portfolio.title} | Greg Law`}
        metaDescription={portfolio.description}
      />

      <section className="portfolio-single-section">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Projects</div>
            <h3>
              We are here to fight against any <br /> violance with <span>experiance</span>
            </h3>
          </div>

          <div className="row clearfix">
            <div className="image-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src={portfolio.image} alt={portfolio.title} />
                </div>
              </div>
            </div>

            <div className="content-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <h3>{portfolio.title}</h3>
                <div className="text">
                  <p>{portfolio.description}</p>
                  <p>
                    Eveniet in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla
                    facilisis at seds eros sed et accumsan et iusto odio dignissim. Temporibus autem quibusdam et
                    aut officiis.
                  </p>
                </div>
                <ul className="project-list">
                  <li>
                    <span className="icon fa fa-tag"></span> <strong>Category: </strong>
                    {portfolio.category}
                  </li>
                  <li>
                    <span className="icon fa fa-user"></span> <strong>Client: </strong>
                    {portfolio.client}
                  </li>
                  <li>
                    <span className="icon fa fa-calendar"></span> <strong>Date: </strong>
                    {portfolio.date}
                  </li>
                  <li>
                    <span className="icon fa fa-external-link"></span> <strong>Website: </strong>
                    {portfolio.website}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lower-section">
            <div className="row clearfix">
              {relatedProjects.map((project) => (
                <div key={project.id} className="portfolio-block-two col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="image">
                      <img src={project.image} alt={project.title} />
                      <div className="overlay-box">
                        <a
                          href={project.image}
                          data-fancybox="gallery-2"
                          data-caption=""
                          className="plus flaticon-plus"
                        ></a>
                      </div>
                    </div>
                    <div className="lower-content">
                      <h5>
                        <Link to="/portfolio/1">{project.title}</Link>
                      </h5>
                      <div className="designation">{project.designation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
