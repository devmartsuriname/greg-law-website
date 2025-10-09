import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newsService, NewsItem } from '../../api/news';

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadNews();
    }
  }, [id]);

  const loadNews = async () => {
    if (id) {
      const data = await newsService.get(id);
      if (data) {
        setFormData({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image || '',
          published: data.published,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id && id !== 'new') {
        await newsService.update(id, formData);
      } else {
        await newsService.create(formData);
      }
      navigate('/admin/news');
    } catch (error) {
      console.error('Error saving news:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">{id === 'new' ? 'Add New Article' : 'Edit Article'}</h4>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
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
                  <Form.Label>Excerpt</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content *</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    style={{ height: '300px', marginBottom: '50px' }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Featured Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="img-fluid mt-2 rounded"
                    />
                  )}
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
                    {loading ? 'Saving...' : 'Save Article'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/admin/news')}
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

export default NewsForm;
