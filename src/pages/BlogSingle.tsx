import { useParams, Navigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function BlogSingle() {
  const { slug } = useParams<{ slug: string }>();

  // Mock blog post data
  const post = {
    id: 'sample-post',
    title: 'Justice may be blind but she has wise',
    image: '/images/resource/news-1.jpg',
    author: 'Admin',
    date: '20 Oct, 2019',
    comments: 3,
    content: `
      <p>The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you'll end up reviewing and negotiating the content itself and not the design.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus.</p>
    `,
  };

  if (slug !== post.id) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <PageTitle
        title={post.title}
        breadcrumbs={[{ label: 'Blog', path: '/blog' }, { label: post.title }]}
        metaTitle={`${post.title} | Greg Law`}
        metaDescription="Legal insights and expert analysis"
      />

      <div className="sidebar-page-container">
        <div className="container">
          <div className="row clearfix">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-single">
                <div className="inner-box">
                  <div className="image">
                    <img src={post.image} alt={post.title} />
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
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
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
