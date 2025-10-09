import PageTitle from '../components/PageTitle';

export default function PortfolioMasonry() {
  const portfolioItems = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: `/images/gallery/${i + 1}.jpg`,
    title: `Portfolio Item ${i + 1}`,
    category: 'Category',
  }));

  return (
    <>
      <PageTitle
        title="Portfolio Masonry"
        breadcrumbs={[{ label: 'Portfolio' }, { label: 'Masonry' }]}
        metaTitle="Portfolio Masonry | Greg Law"
        metaDescription="Our portfolio showcasing successful legal cases and client victories"
      />

      <section className="gallery-section">
        <div className="container">
          <div className="row clearfix">
            {portfolioItems.map((item) => (
              <div key={item.id} className="gallery-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <figure className="image-box">
                    <img src={item.image} alt={item.title} />
                    <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <a
                            href={item.image}
                            className="lightbox-image"
                            data-fancybox="gallery"
                            title={item.title}
                          >
                            <span className="icon flaticon-cross"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
