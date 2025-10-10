import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { quotesService } from '../../api/quotes';

const QuotesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    quote_text: '',
    author_name: 'Gregory Allan Rusland',
    author_title: 'Vice President of Suriname',
    context: '',
    date_spoken: '',
    featured: false,
    published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadQuote();
    }
  }, [id]);

  const loadQuote = async () => {
    if (id) {
      try {
        const data = await quotesService.get(id);
        if (data) {
          setFormData({
            quote_text: data.quote_text,
            author_name: data.author_name,
            author_title: data.author_title,
            context: data.context || '',
            date_spoken: data.date_spoken || '',
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
        await quotesService.update(id, formData);
      } else {
        await quotesService.create(formData);
      }
      navigate('/admin/quotes');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">{id === 'new' ? 'Add New Quote' : 'Edit Quote'}</h4>
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
                  <Form.Label>Quote Text *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={formData.quote_text}
                    onChange={(e) =>
                      setFormData({ ...formData, quote_text: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Author Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.author_name}
                    onChange={(e) =>
                      setFormData({ ...formData, author_name: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Author Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.author_title}
                    onChange={(e) =>
                      setFormData({ ...formData, author_title: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Context (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Where/when was this said? Any additional context..."
                    value={formData.context}
                    onChange={(e) =>
                      setFormData({ ...formData, context: e.target.value })
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
                  <Form.Label>Date Spoken</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date_spoken}
                    onChange={(e) =>
                      setFormData({ ...formData, date_spoken: e.target.value })
                    }
                  />
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
                    Featured quotes appear on the homepage
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
                    {loading ? 'Saving...' : 'Save Quote'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/admin/quotes')}
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

export default QuotesForm;
