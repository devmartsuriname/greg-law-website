import PageTitle from '../components/PageTitle';

export default function PortfolioTwoColumn() {
  const portfolioItems = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    image: `/images/gallery/${i + 1}.jpg`,
    title: `Portfolio Item ${i + 1}`,
    category: 'Category',
  }));

  return (
    <>
      <PageTitle
        title="Portfolio Two Column"
        breadcrumbs={[{ label: 'Portfolio' }, { label: 'Two Column' }]}
        metaTitle="Portfolio Two Column | Greg Law"
        metaDescription="Our portfolio showcasing successful legal cases and client victories"
      />

      <section className="gallery-section">
        <div className="container">
          <div className="row clearfix">
            {portfolioItems.map((item) => (
              <div key={item.id} className="gallery-block col-lg-6 col-md-12 col-sm-12">
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
