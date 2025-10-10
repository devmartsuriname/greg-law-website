import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PageTitle from '../components/PageTitle';
import { speechesService, Speech } from '../admin/api/speeches';

export default function Speeches() {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadSpeeches();
  }, []);

  const loadSpeeches = async () => {
    try {
      const data = await speechesService.list();
      setSpeeches(data.filter(s => s.published));
    } catch (error) {
      console.error('Error loading speeches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadSpeeches();
      return;
    }

    try {
      setLoading(true);
      const results = await speechesService.search(searchQuery);
      setSpeeches(results);
    } catch (error) {
      console.error('Error searching speeches:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(speeches.map(s => s.category).filter(Boolean)))];
  
  const filteredSpeeches = filter === 'all' 
    ? speeches 
    : speeches.filter(s => s.category === filter);

  return (
    <>
      <PageTitle
        title="Speeches & Addresses"
        breadcrumbs={[{ label: 'Speeches' }]}
        metaTitle="Speeches & Addresses | Gregory Allan Rusland"
        metaDescription="Read and watch speeches and public addresses by Vice President Gregory Allan Rusland"
      />

      <section className="blog-page-section">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Public Addresses</div>
            <h3>
              Speeches & <span>Statements</span>
            </h3>
          </div>

          <div className="row clearfix mb-4">
            <div className="col-lg-8 col-md-12">
              <form onSubmit={handleSearch} className="search-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search speeches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="theme-btn btn-style-one">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="filters">
                <select 
                  className="form-control"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : filteredSpeeches.length === 0 ? (
            <div className="text-center py-5">
              <p>No speeches found.</p>
            </div>
          ) : (
            <div className="row clearfix">
              {filteredSpeeches.map((speech) => (
                <div key={speech.id} className="news-block col-lg-6 col-md-12 col-sm-12">
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
                      <h4>
                        <Link to={`/speeches/${speech.slug}`}>{speech.title}</Link>
                      </h4>
                      {speech.description && (
                        <div className="text">{speech.description}</div>
                      )}
                      <div className="d-flex gap-2 mt-3">
                        <Link to={`/speeches/${speech.slug}`} className="theme-btn btn-style-one">
                          Read More
                        </Link>
                        {speech.youtube_url && (
                          <a 
                            href={speech.youtube_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="theme-btn btn-style-two"
                          >
                            Watch Video
                          </a>
                        )}
                        {speech.document_url && (
                          <a 
                            href={speech.document_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="theme-btn btn-style-two"
                          >
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
