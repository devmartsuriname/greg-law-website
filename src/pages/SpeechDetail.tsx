import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import PageTitle from '../components/PageTitle';
import { speechesService, Speech } from '../admin/api/speeches';

export default function SpeechDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [relatedSpeeches, setRelatedSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadSpeech();
    }
  }, [slug]);

  const loadSpeech = async () => {
    try {
      const speechData = await speechesService.get(slug!);
      setSpeech(speechData);

      // Load related speeches
      const allSpeeches = await speechesService.list();
      const related = allSpeeches
        .filter(s => s.published && s.id !== speechData.id)
        .slice(0, 3);
      setRelatedSpeeches(related);
    } catch (error) {
      console.error('Error loading speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!speech) {
    return (
      <div className="text-center py-5">
        <h3>Speech not found</h3>
        <Link to="/speeches" className="theme-btn btn-style-one mt-3">
          Back to Speeches
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title={speech.title}
        breadcrumbs={[{ label: 'Speeches', path: '/speeches' }, { label: speech.title }]}
        metaTitle={`${speech.title} | Gregory Allan Rusland`}
        metaDescription={speech.description || ''}
      />

      <section className="blog-single">
        <div className="container">
          <div className="row clearfix">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-detail">
                <div className="inner-box">
                  <div className="lower-content">
                    <ul className="post-meta">
                      <li>
                        <span className="icon flaticon-calendar"></span>
                        {format(new Date(speech.date), 'MMMM dd, yyyy')}
                      </li>
                      {speech.location && (
                        <li>
                          <span className="icon flaticon-map-marker"></span>
                          {speech.location}
                        </li>
                      )}
                      {speech.category && (
                        <li>
                          <span className="icon flaticon-tag"></span>
                          {speech.category}
                        </li>
                      )}
                    </ul>
                    <h2>{speech.title}</h2>

                    {speech.youtube_url && (
                      <div className="video-container mb-4">
                        <iframe
                          width="100%"
                          height="450"
                          src={getYouTubeEmbedUrl(speech.youtube_url)}
                          title={speech.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {speech.description && (
                      <div className="text mb-4">
                        <p><strong>{speech.description}</strong></p>
                      </div>
                    )}

                    {speech.content && (
                      <div className="text" dangerouslySetInnerHTML={{ __html: speech.content }} />
                    )}

                    {speech.document_url && (
                      <div className="mt-4">
                        <a
                          href={speech.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-one"
                        >
                          <span className="icon fa fa-download mr-2"></span>
                          Download Full Transcript (PDF)
                        </a>
                      </div>
                    )}

                    {speech.tags && speech.tags.length > 0 && (
                      <div className="post-share-options mt-4">
                        <div className="tags">
                          {speech.tags.map((tag, idx) => (
                            <span key={idx} className="badge badge-secondary mr-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <aside className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <div className="sidebar">
                {relatedSpeeches.length > 0 && (
                  <div className="sidebar-widget popular-posts">
                    <div className="sidebar-title">
                      <h3>Related Speeches</h3>
                    </div>
                    {relatedSpeeches.map((related) => (
                      <article key={related.id} className="post">
                        <div className="post-inner">
                          <div className="text">
                            <Link to={`/speeches/${related.slug}`}>{related.title}</Link>
                          </div>
                          <div className="post-date">
                            {format(new Date(related.date), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
