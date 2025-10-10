import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { projectsService, Project } from '../admin/api/projects';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsService.list();
      setProjects(data.filter(p => p.published));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <PageTitle
        title="Our Projects"
        breadcrumbs={[{ label: 'Portfolio' }]}
        metaTitle="Projects Portfolio | Gregory Allan Rusland"
        metaDescription="Explore the initiatives and projects undertaken by Vice President Gregory Allan Rusland for the development of Suriname"
      />

      <section className="gallery-section">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Portfolio</div>
            <h3>
              Building a Better <span>Suriname</span>
            </h3>
          </div>

          <div className="filters clearfix">
            <ul className="filter-tabs filter-btns clearfix">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`filter ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? 'All Projects' : cat}
                </li>
              ))}
            </ul>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-5">
              <p>No projects found.</p>
            </div>
          ) : (
            <div className="row clearfix">
              {filteredProjects.map((project) => (
                <div key={project.id} className="portfolio-block-two col-lg-4 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="image">
                      <img 
                        src={project.featured_image || '/images/gallery/default.jpg'} 
                        alt={project.title} 
                      />
                      <div className="overlay-box">
                        <Link to={`/portfolio/${project.slug}`} className="plus flaticon-plus"></Link>
                      </div>
                    </div>
                    <div className="lower-content">
                      <h5>
                        <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
                      </h5>
                      <div className="designation">{project.category}</div>
                      {project.progress > 0 && (
                        <div className="progress mt-2" style={{ height: '4px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${project.progress}%` }}
                            aria-valuenow={project.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      )}
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
