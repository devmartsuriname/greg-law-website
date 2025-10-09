import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const blogPosts = [
  {
    id: 'legal-rights-family-law',
    title: "Strategy for Norway's Pension Fund Global",
    image: '/images/resource/news-4.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
  {
    id: 'corporate-law-updates',
    title: 'What we are capable of usually gets discovered',
    image: '/images/resource/news-5.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
  {
    id: 'real-estate-protection',
    title: 'Food industry leaders often change their promoters',
    image: '/images/resource/news-6.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
  {
    id: 'chief-judge-statement',
    title: 'DiGENOVA: Chief judge statement blatantly political',
    image: '/images/resource/news-7.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
  {
    id: 'thanksgiving-cocktails',
    title: 'Thanksgiving-inspired cocktails that your guests',
    image: '/images/resource/news-8.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
  {
    id: 'jennifer-campaign',
    title: 'Dior call Jennifer campaign backlash not all justified',
    image: '/images/resource/news-9.jpg',
    author: 'Admin',
    date: 'September 12, 2019',
  },
];

export default function BlogList() {
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
          <div className="row clearfix">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="news-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box wow fadeInLeft" data-wow-delay={`${(index % 3) * 300}ms`} data-wow-duration="1500ms">
                  <div className="image">
                    <img src={post.image} alt={post.title} />
                    <div className="overlay-box">
                      <a href={post.image} data-fancybox="news" data-caption="" className="plus flaticon-plus"></a>
                    </div>
                  </div>
                  <div className="lower-content">
                    <ul className="post-meta">
                      <li>
                        <span className="fa fa-calendar"></span>
                        {post.date}
                      </li>
                      <li>
                        <span className="fa fa-user"></span>
                        {post.author}
                      </li>
                    </ul>
                    <h5>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h5>
                    <Link to={`/blog/${post.id}`} className="theme-btn btn-style-three">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
