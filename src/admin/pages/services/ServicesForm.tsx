import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { servicesService } from '../../api/services';

// Common icon options for services
const ICON_OPTIONS = [
  'mingcute:bank-line',
  'mingcute:briefcase-line',
  'mingcute:document-line',
  'mingcute:building-1-line',
  'mingcute:user-3-line',
  'mingcute:scales-line',
  'mingcute:home-3-line',
  'mingcute:shield-line',
  'mingcute:certificate-line',
  'mingcute:chart-line-line',
  'mingcute:contract-line',
  'mingcute:group-line',
];

const ServicesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    category: '',
    featured: false,
    published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    if (id) {
      try {
        const data = await servicesService.get(id);
        if (data) {
          setFormData({
            title: data.title,
            description: data.description || '',
            icon: data.icon || '',
            category: data.category || '',
            featured: data.featured,
            published: data.published,
          });
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id && id !== 'new') {
        await servicesService.update(id, formData);
      } else {
        await servicesService.create(formData);
      }
      navigate('/admin/services');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">{id === 'new' ? 'Add New Service' : 'Edit Service'}</h4>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Service Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Legal, Consulting, Administrative"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Icon</Form.Label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {ICON_OPTIONS.map((iconName) => (
                      <div
                        key={iconName}
                        onClick={() => setFormData({ ...formData, icon: iconName })}
                        style={{
                          cursor: 'pointer',
                          padding: '8px',
                          border: formData.icon === iconName ? '2px solid #0d6efd' : '1px solid #dee2e6',
                          borderRadius: '4px',
                          backgroundColor: formData.icon === iconName ? '#e7f1ff' : 'transparent',
                        }}
                      >
                        <Icon icon={iconName} width={24} />
                      </div>
                    ))}
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Or enter custom Iconify icon name"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                  />
                  {formData.icon && (
                    <div className="mt-2 text-center">
                      <Icon icon={formData.icon} width={48} />
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  <small className="text-muted">
                    Featured services appear prominently on the homepage
                  </small>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Service'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/admin/services')}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ServicesForm;
