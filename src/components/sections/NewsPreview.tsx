import { Link } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';

export default function NewsPreview() {
  const { news, loading, error } = useNews(3);

  if (loading) {
    return (
      <section className="news-section style-two">
        <div className="container">
          <div className="text-center">Loading news...</div>
        </div>
      </section>
    );
  }

  if (error || news.length === 0) {
    return null;
  }

  return (
    <>
      <section className="news-section style-two">
        <div className="container">
          <div className="section-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Latest News</div>
                <h3>
                  Stay informed with
                  <br /> our latest <span>news</span>
                </h3>
              </div>
              <div className="pull-right">
                <div className="text">
                  Stay updated with the latest announcements, initiatives, and achievements from the Office of Vice
                  President Gregory Allan Rusland.
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            {news.map((article, index) => (
              <div key={article.id} className="news-block col-lg-4 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="image">
                    <img src={article.featured_image || '/images/resource/news-1.jpg'} alt={article.title} />
                    <div className="overlay-box">
                      <a
                        href={article.featured_image || '/images/resource/news-1.jpg'}
                        data-fancybox="news"
                        data-caption=""
                        className="plus flaticon-plus"
                      ></a>
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
                              day: 'numeric',
                            })
                          : 'Recent'}
                      </li>
                      <li>
                        <span className="fa fa-user"></span>Admin
                      </li>
                    </ul>
                    <h5>
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h5>
                    <Link to={`/blog/${article.slug}`} className="theme-btn btn-style-two">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter-section">
        <div className="container">
          <div className="fact-counter style-three">
            <div className="row clearfix">
              {[
                { icon: 'fa fa-briefcase', count: '125', title: 'Community Programs' },
                { icon: 'flaticon-teamwork', count: '45', title: 'Policy Initiatives' },
                { icon: 'flaticon-ribbon-badge-award', count: '18', title: 'Regional Partnerships' },
                { icon: 'flaticon-multiple-users-silhouette', count: '85', title: 'Government Officials' },
              ].map((counter, index) => (
                <div key={index} className="column counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                    <div className="count-outer count-box">
                      <div className={`icon ${counter.icon}`}></div>
                      <span className="count-text" data-speed="3000" data-stop={counter.count}>
                        0
                      </span>
                      +<div className="counter-title">{counter.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
