import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { speechesService, Speech } from '../../api/speeches';

const SpeechesList = () => {
  const navigate = useNavigate();
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpeeches();
  }, []);

  const loadSpeeches = async () => {
    const data = await speechesService.list();
    setSpeeches(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this speech?')) {
      await speechesService.remove(id);
      loadSpeeches();
    }
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Speeches</h4>
        <Link to="/admin/speeches/new">
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
                        <th>Location</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {speeches.map((speech) => (
                        <tr key={speech.id}>
                          <td>{speech.title}</td>
                          <td>{speech.location}</td>
                          <td>{speech.date}</td>
                          <td>
                            <Badge bg={speech.published ? 'success' : 'warning'}>
                              {speech.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/speeches/${speech.id}`)}
                            >
                              <Icon icon="mingcute:edit-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(speech.id)}
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

export default SpeechesList;
