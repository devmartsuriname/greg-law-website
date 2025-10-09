import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { projectsService, Project } from '../../api/projects';

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await projectsService.list();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await projectsService.remove(id);
      loadProjects();
    }
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Projects</h4>
        <Link to="/admin/projects/new">
          <Button variant="primary">
            <Icon icon="mingcute:add-line" className="me-2" />
            Add New
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>{project.title}</td>
                          <td>{project.category}</td>
                          <td>{project.client}</td>
                          <td>{project.date}</td>
                          <td>
                            <Badge bg={project.published ? 'success' : 'warning'}>
                              {project.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/projects/${project.id}`)}
                            >
                              <Icon icon="mingcute:edit-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(project.id)}
                            >
                              <Icon icon="mingcute:delete-line" width={18} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProjectsList;
