import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import PageTitle from '../components/PageTitle';
import { projectsService, Project } from '../admin/api/projects';

export default function PortfolioSingle() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProject();
    }
  }, [slug]);

  const loadProject = async () => {
    try {
      const projectData = await projectsService.get(slug!);
      setProject(projectData);

      // Load related projects from the same category
      const allProjects = await projectsService.list();
      const related = allProjects
        .filter(p => p.published && p.category === projectData.category && p.id !== projectData.id)
        .slice(0, 3);
      setRelatedProjects(related);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
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

  if (!project) {
    return (
      <div className="text-center py-5">
        <h3>Project not found</h3>
        <Link to="/portfolio" className="theme-btn btn-style-one mt-3">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title={project.title}
        breadcrumbs={[{ label: 'Portfolio', path: '/portfolio' }, { label: project.title }]}
        metaTitle={`${project.title} | Gregory Allan Rusland`}
        metaDescription={project.description || ''}
      />

      <section className="portfolio-single-section">
        <div className="container">
          <div className="section-title centered">
            <div className="title">Project Details</div>
            <h3>
              {project.title.split(' ').slice(0, 3).join(' ')}{' '}
              <span>{project.title.split(' ').slice(3).join(' ')}</span>
            </h3>
          </div>

          <div className="row clearfix">
            <div className="image-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src={project.featured_image || '/images/gallery/default.jpg'} alt={project.title} />
                </div>
              </div>
            </div>

            <div className="content-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <h3>{project.title}</h3>
                <div className="text">
                  <p>{project.description}</p>
                  {project.content && (
                    <div dangerouslySetInnerHTML={{ __html: project.content }} />
                  )}
                </div>
                <ul className="project-list">
                  <li>
                    <span className="icon fa fa-tag"></span> <strong>Category: </strong>
                    {project.category}
                  </li>
                  <li>
                    <span className="icon fa fa-signal"></span> <strong>Status: </strong>
                    {project.status}
                  </li>
                  {project.start_date && (
                    <li>
                      <span className="icon fa fa-calendar"></span> <strong>Start Date: </strong>
                      {format(new Date(project.start_date), 'MMM dd, yyyy')}
                    </li>
                  )}
                  {project.progress > 0 && (
                    <li>
                      <span className="icon fa fa-chart-line"></span> <strong>Progress: </strong>
                      {project.progress}%
                      <div className="progress mt-2" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {project.image_gallery && project.image_gallery.length > 0 && (
            <div className="gallery-section mt-5">
              <h4>Project Gallery</h4>
              <div className="row clearfix">
                {project.image_gallery.map((img, idx) => (
                  <div key={idx} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="image">
                      <img src={img} alt={`${project.title} - Image ${idx + 1}`} className="img-fluid" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedProjects.length > 0 && (
            <div className="lower-section">
              <h4>Related Projects</h4>
              <div className="row clearfix">
                {relatedProjects.map((relProject) => (
                  <div key={relProject.id} className="portfolio-block-two col-lg-4 col-md-6 col-sm-12">
                    <div className="inner-box">
                      <div className="image">
                        <img src={relProject.featured_image || '/images/gallery/default.jpg'} alt={relProject.title} />
                        <div className="overlay-box">
                          <Link to={`/portfolio/${relProject.slug}`} className="plus flaticon-plus"></Link>
                        </div>
                      </div>
                      <div className="lower-content">
                        <h5>
                          <Link to={`/portfolio/${relProject.slug}`}>{relProject.title}</Link>
                        </h5>
                        <div className="designation">{relProject.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
