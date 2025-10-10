import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { useNewsArticle } from '../hooks/useNews';

export default function BlogSingle() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useNewsArticle(slug || '');

  if (loading) {
    return (
      <>
        <PageTitle
          title="Blog"
          breadcrumbs={[{ label: 'Blog', path: '/blog' }, { label: 'Loading...' }]}
        />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <PageTitle
          title="Article Not Found"
          breadcrumbs={[{ label: 'Blog', path: '/blog' }, { label: 'Not Found' }]}
        />
        <div className="container py-5">
          <div className="text-center">
            <h3>Article not found</h3>
            <Link to="/blog" className="theme-btn btn-style-one mt-3">
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const recentPosts = [
    { title: 'Business structured nontp frank team', image: '/images/resource/post-thumb-1.jpg', date: 'July 25, 2019' },
    { title: 'Meetups and parties at night for every...', image: '/images/resource/post-thumb-2.jpg', date: 'July 26, 2019' },
    { title: 'Always found him speakingas many...', image: '/images/resource/post-thumb-3.jpg', date: 'July 25, 2019' },
  ];

  const comments = [
    { name: 'Riva Collins', image: '/images/resource/author-7.jpg', date: 'November 19, 2019 at 11:00 am', text: "It's no secret that the digital industry is booming. From exciting startups to need ghor global and brands, companies are reaching out." },
    { name: 'Obila Doe', image: '/images/resource/author-8.jpg', date: 'November 22, 2019 at 10:00 pm', text: "It's no secret that the digital industry is booming. From exciting startups to need ghor hmiu global and brands, companies are reaching out." },
  ];

  return (
    <>
      <PageTitle
        title={article.title}
        breadcrumbs={[{ label: 'Blog', path: '/blog' }, { label: article.title }]}
        metaTitle={`${article.title} | Greg Law`}
        metaDescription={article.excerpt || "Legal insights and expert analysis"}
      />

      <div className="sidebar-page-container">
        <div className="container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-single">
                <div className="inner-box">
                  {article.featured_image && (
                    <div className="image">
                      <img src={article.featured_image} alt={article.title} />
                    </div>
                  )}
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
                    <h4>{article.title}</h4>
                    <div 
                      className="text" 
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                </div>

                {/* Post Share Options */}
                <div className="post-share-options">
                  <div className="post-share-inner clearfix">
                    {article.tags && article.tags.length > 0 && (
                      <div className="pull-left post-tags">
                        <span>Tags: </span>
                        {article.tags.map((tag, index) => (
                          <a key={index} href="#">{tag}</a>
                        ))}
                      </div>
                    )}
                    <ul className="pull-right social-links clearfix">
                      <li className="facebook"><a href="#" className="fa fa-facebook"></a></li>
                      <li className="twitter"><a href="#" className="fa fa-twitter"></a></li>
                      <li className="google-plus"><a href="#" className="fa fa-google-plus"></a></li>
                      <li className="dribble"><a href="#" className="fa fa-dribbble"></a></li>
                    </ul>
                  </div>
                </div>

                {/* New Posts Navigation */}
                <div className="new-posts">
                  <div className="clearfix">
                    <a className="prev-post pull-left" href="#"><span className="fa fa-angle-double-left"></span> Previous Post</a>
                    <a className="next-post pull-right" href="#">Next Post <span className="fa fa-angle-double-right"></span></a>
                  </div>
                </div>

                {/* Comments Area */}
                <div className="comments-area">
                  <div className="group-title">
                    <h6>Comments</h6>
                  </div>
                  {comments.map((comment, index) => (
                    <div key={index} className="comment-box">
                      <div className="comment">
                        <div className="author-thumb"><img src={comment.image} alt={comment.name} /></div>
                        <div className="comment-inner clearfix">
                          <div className="comment-info clearfix">
                            <strong>{comment.name}</strong>
                            <div className="comment-time"> {comment.date} </div>
                          </div>
                          <div className="text">{comment.text}</div>
                          <a className="comment-reply" href="#">Reply <span className="fa fa-angle-right"></span></a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="comment-form">
                  <div className="group-title">
                    <h6>Post A Comment</h6>
                    <div className="group-text">Your email address will not be published *</div>
                  </div>
                  <form method="post" action="/blog">
                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <textarea name="message" placeholder="your comment"></textarea>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 form-group">
                        <input type="text" name="username" placeholder="name*" required />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 form-group">
                        <input type="email" name="email" placeholder="email*" required />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 form-group">
                        <input type="text" name="text" placeholder="website*" required />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                        <button className="theme-btn btn-style-one" type="submit" name="submit-form">Post Comment</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar Side */}
            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar default-sidebar">
                {/* Search */}
                <div className="sidebar-widget search-box">
                  <form method="post" action="/blog">
                    <div className="form-group">
                      <input type="search" name="search-field" placeholder="Enter Your Keyword..." required />
                      <button type="submit"><span className="icon fa fa-search"></span></button>
                    </div>
                  </form>
                </div>

                {/* Blog Category Widget */}
                <div className="sidebar-widget sidebar-blog-category">
                  <div className="sidebar-title-two">
                    <h4>Categories</h4>
                  </div>
                  <ul className="blog-cat-two">
                    <li><a href="#">Consulting <span>(3)</span></a></li>
                    <li><a href="#">Technology <span>(4)</span></a></li>
                    <li><a href="#">Life style <span>(8)</span></a></li>
                  </ul>
                </div>

                {/* Popular Post Widget */}
                <div className="sidebar-widget popular-posts">
                  <div className="sidebar-title-two">
                    <h4>Recent News</h4>
                  </div>
                  {recentPosts.map((recentPost, index) => (
                    <article key={index} className="post">
                      <figure className="post-thumb">
                        <img src={recentPost.image} alt={recentPost.title} />
                        <Link to="/blog/sample" className="overlay-box"><span className="icon fa fa-link"></span></Link>
                      </figure>
                      <div className="text"><Link to="/blog/sample">{recentPost.title}</Link></div>
                      <div className="post-info">{recentPost.date}</div>
                    </article>
                  ))}
                </div>

                {/* Archive Widget */}
                <div className="sidebar-widget sidebar-blog-category archive-widget">
                  <div className="sidebar-title-two">
                    <h4>Archives</h4>
                  </div>
                  <ul className="blog-cat-two">
                    <li><a href="#">January 2019 <span>(3)</span></a></li>
                    <li><a href="#">February 2019 <span>(2)</span></a></li>
                    <li><a href="#">May 2019 <span>(6)</span></a></li>
                  </ul>
                </div>

                {/* Gallery Widget */}
                <div className="sidebar-widget instagram-widget">
                  <div className="sidebar-title-two">
                    <h4>Gallery</h4>
                  </div>
                  <div className="images-outer clearfix">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <figure key={num} className="image-box">
                        <a href={`/images/gallery/${num}.jpg`} className="lightbox-image" data-fancybox="images">
                          <span className="overlay-box flaticon-plus"></span>
                        </a>
                        <img src={`/images/gallery/instagram-${num}.jpg`} alt={`Gallery ${num}`} />
                      </figure>
                    ))}
                  </div>
                </div>

                {/* Tags Widget */}
                <div className="sidebar-widget popular-tags">
                  <div className="sidebar-title-two">
                    <h4>Tags</h4>
                  </div>
                  <a href="#">Apps</a>
                  <a href="#">Cloud</a>
                  <a href="#">Life style</a>
                  <a href="#">Hosting</a>
                  <a href="#">Business</a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

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
