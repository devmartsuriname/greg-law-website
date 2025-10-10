import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { useNews } from '../hooks/useNews';

export default function BlogList() {
  const { news, loading } = useNews();
  return (
    <>
      <PageTitle
        title="Blog"
        breadcrumbs={[{ label: 'Blog' }]}
        metaTitle="Blog | Greg Law"
        metaDescription="Latest legal insights, news and updates from our experienced attorneys"
      />

      {/* Blog Page Section */}
      <section className="blog-page-section">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-5">
              <p>No articles found.</p>
            </div>
          ) : (
            <div className="row clearfix">
              {news.map((article, index) => (
                <div key={article.id} className="news-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box wow fadeInLeft" data-wow-delay={`${(index % 3) * 300}ms`} data-wow-duration="1500ms">
                    <div className="image">
                      <img src={article.featured_image || '/images/resource/news-4.jpg'} alt={article.title} />
                      <div className="overlay-box">
                        <a href={article.featured_image || '/images/resource/news-4.jpg'} data-fancybox="news" data-caption="" className="plus flaticon-plus"></a>
                      </div>
                    </div>
                    <div className="lower-content">
                      <ul className="post-meta">
                        <li>
                          <span className="fa fa-calendar"></span>
                          {article.published_at 
                            ? new Date(article.published_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })
                            : new Date(article.created_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })
                          }
                        </li>
                        {article.category && (
                          <li>
                            <span className="fa fa-folder"></span>
                            {article.category}
                          </li>
                        )}
                      </ul>
                      <h5>
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h5>
                      {article.excerpt && (
                        <p className="text">{article.excerpt}</p>
                      )}
                      <Link to={`/blog/${article.slug}`} className="theme-btn btn-style-three">
                        View more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe-section style-two">
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
