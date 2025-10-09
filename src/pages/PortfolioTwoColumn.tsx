import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function PortfolioTwoColumn() {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      image: '/images/gallery/6.jpg',
      title: 'Domestic Violence',
      designation: 'Personal Law',
      categories: ['civil'],
    },
    {
      id: 2,
      image: '/images/gallery/7.jpg',
      title: 'Marriage & Divorce',
      designation: 'Personal Law',
      categories: ['criminal', 'others'],
    },
    {
      id: 3,
      image: '/images/gallery/8.jpg',
      title: 'Physical Violence',
      designation: 'Personal Law',
      categories: ['civil', 'business'],
    },
    {
      id: 4,
      image: '/images/gallery/9.jpg',
      title: 'Mental Torture',
      designation: 'Personal Law',
      categories: ['criminal', 'personal'],
    },
    {
      id: 5,
      image: '/images/gallery/10.jpg',
      title: 'Plan Management',
      designation: 'Personal Law',
      categories: ['business', 'criminal'],
    },
    {
      id: 6,
      image: '/images/gallery/11.jpg',
      title: 'Physical Violence',
      designation: 'Personal Law',
      categories: ['civil', 'personal', 'business'],
    },
  ];

  const filters = ['all', 'business', 'criminal', 'civil', 'personal', 'others'];

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.categories.includes(activeFilter));

  return (
    <>
      <PageTitle
        title="Project"
        breadcrumbs={[{ label: 'Project Col 2' }]}
        metaTitle="Portfolio Two Column | Greg Law"
        metaDescription="We are here to fight against any violence with Project experience"
      />

      <section className="portfolio-section-two">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Projects</div>
            <h3>
              We are here to fight against any <br /> violance with Project <span>experience</span>
            </h3>
          </div>

          <div className="mixitup-gallery">
            <div className="filters clearfix">
              <ul className="filter-tabs filter-btns text-center clearfix">
                {filters.map((filter) => (
                  <li
                    key={filter}
                    className={`filter ${activeFilter === filter ? 'active' : ''}`}
                    data-role="button"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-list row clearfix">
              {filteredItems.map((item) => (
                <div key={item.id} className="portfolio-block-two col-lg-6 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="image">
                      <img src={item.image} alt={item.title} />
                      <div className="overlay-box">
                        <a
                          href={item.image}
                          data-fancybox="gallery-1"
                          data-caption=""
                          className="plus flaticon-plus"
                        ></a>
                      </div>
                    </div>
                    <div className="lower-content">
                      <h5>
                        <Link to="/portfolio/1">{item.title}</Link>
                      </h5>
                      <div className="designation">{item.designation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="button-box text-center">
            <a href="#" className="theme-btn btn-style-one">
              Load More
            </a>
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
