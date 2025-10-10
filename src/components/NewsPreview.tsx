import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Icon } from '@iconify/react';

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  category?: string;
}

export const NewsPreview = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id, slug, title, excerpt, featured_image, published_at, category')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="news-section">
        <div className="auto-container">
          <div className="text-center">Loading news...</div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section className="news-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <div className="sub-title">Latest News</div>
          <h2>
            Learn Something More from Our <span>Latest News</span>
          </h2>
        </div>

        <div className="row">
          {articles.map((article) => (
            <div key={article.id} className="news-block col-lg-4 col-md-6 col-sm-12">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link to={`/news/${article.slug}`}>
                      <img 
                        src={article.featured_image || '/images/news/default.jpg'} 
                        alt={article.title} 
                      />
                    </Link>
                  </figure>
                  {article.category && (
                    <div className="category">{article.category}</div>
                  )}
                </div>
                <div className="lower-content">
                  <ul className="post-meta">
                    {article.published_at && (
                      <li>
                        <Icon icon="mdi:calendar" width="16" />
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </li>
                    )}
                  </ul>
                  <h3>
                    <Link to={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  {article.excerpt && (
                    <div className="text">{article.excerpt}</div>
                  )}
                  <div className="link-btn">
                    <Link to={`/news/${article.slug}`} className="theme-btn">
                      Read More <Icon icon="mdi:arrow-right" width="18" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
