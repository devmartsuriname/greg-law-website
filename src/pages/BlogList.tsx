import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const blogPosts = [
  {
    id: 'sample-post',
    title: 'justice may be blind but she has wise',
    image: '/images/resource/news-1.jpg',
    author: 'Admin',
    date: '20 Oct, 2019',
    comments: 3,
    excerpt:
      'The argument in favor of using filler text goes something like this: If you use real content in the design process.',
  },
  // Add more posts as needed
];

export default function BlogList() {
  return (
    <>
      <PageTitle
        title="Blog"
        breadcrumbs={[{ label: 'Blog' }]}
        metaTitle="Blog | LawSight"
        metaDescription="Latest news and updates from our law firm"
      />

      <div className="sidebar-page-container">
        <div className="container">
          <div className="row clearfix">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-list">
                {blogPosts.map((post) => (
                  <div key={post.id} className="news-block">
                    <div className="inner-box">
                      <div className="image">
                        <Link to={`/blog/${post.id}`}>
                          <img src={post.image} alt={post.title} />
                        </Link>
                      </div>
                      <div className="lower-content">
                        <ul className="post-meta">
                          <li>
                            <span className="fa fa-user"></span>By {post.author}
                          </li>
                          <li>
                            <span className="fa fa-calendar"></span>
                            {post.date}
                          </li>
                          <li>
                            <span className="fa fa-comment"></span>
                            {post.comments} Comments
                          </li>
                        </ul>
                        <h3>
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <div className="text">{post.excerpt}</div>
                        <Link to={`/blog/${post.id}`} className="theme-btn btn-style-one">
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget search-box">
                  <form method="post" action="/blog">
                    <div className="form-group">
                      <input type="search" name="search-field" placeholder="Search..." required />
                      <button type="submit">
                        <span className="icon fa fa-search"></span>
                      </button>
                    </div>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
