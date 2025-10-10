import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { Icon } from '@iconify/react';
import { mediaService, MediaItem } from '../admin/api/media';
import { useEffect } from 'react';

export default function Gallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'youtube'>('all');

  useEffect(() => {
    loadMedia();
  }, [filter]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await mediaService.list(
        filter === 'all' ? undefined : filter,
        undefined
      );
      setMedia(data.filter(m => m.published));
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media;

  return (
    <>
      <PageTitle
        title="Media Gallery"
        breadcrumbs={[{ label: 'Gallery' }]}
        metaTitle="Media Gallery | VP Office"
        metaDescription="Official photos and videos from the Vice President's office"
      />

      <section className="gallery-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-title centered mb-5">
            <div className="title">Gallery</div>
            <h3>
              Official Photos & <span>Videos</span>
            </h3>
          </div>

          {/* Filters */}
          <div className="text-center mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All Media
              </button>
              <button
                type="button"
                className={`btn ${filter === 'image' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('image')}
              >
                Photos
              </button>
              <button
                type="button"
                className={`btn ${filter === 'youtube' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('youtube')}
              >
                Videos
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No media available at this time.</p>
            </div>
          ) : (
            <div className="row clearfix">
              {filteredMedia.map((item) => (
                <div key={item.id} className="gallery-block col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="image">
                      {item.type === 'youtube' ? (
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${item.youtube_id}`}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              border: 'none',
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <>
                          <img
                            src={item.file_url || item.thumbnail_url}
                            alt={item.alt_text || item.title}
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                          />
                          <div className="overlay-box">
                            <a
                              href={item.file_url}
                              data-fancybox="gallery"
                              data-caption={item.caption}
                              className="plus flaticon-plus"
                            ></a>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="lower-content">
                      <h5>{item.title}</h5>
                      {item.caption && <p className="text">{item.caption}</p>}
                      {item.category && (
                        <span className="badge bg-primary">{item.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe-section">
        <div className="container">
          <div className="inner-container" style={{ backgroundImage: 'url(/images/background/3.jpg)' }}>
            <h2>
              Subscribe Your Email for Newsletter <br /> & Updates
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
