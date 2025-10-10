import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newsService } from '../../api/news';
import { useDropzone } from 'react-dropzone';

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: '',
    tags: [] as string[],
    published: false,
    featured: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadNews();
    }
  }, [id]);

  const loadNews = async () => {
    if (id) {
      try {
        const data = await newsService.get(id);
        if (data) {
          setFormData({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            featured_image: data.featured_image || '',
            category: data.category || '',
            tags: data.tags || [],
            published: data.published,
            featured: data.featured,
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
        await newsService.update(id, formData);
      } else {
        await newsService.create(formData);
      }
      navigate('/admin/news');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const file = acceptedFiles[0];
      const url = await newsService.uploadImage(file);
      setFormData({ ...formData, featured_image: url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleTagsChange = (value: string) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags: tagsArray });
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">{id === 'new' ? 'Add New Article' : 'Edit Article'}</h4>
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
                  <div
                    {...getRootProps()}
                    style={{
                      border: '2px dashed #ccc',
                      borderRadius: '4px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
                    }}
                  >
                    <input {...getInputProps()} />
                    {uploading ? (
                      <p>Uploading...</p>
                    ) : (
                      <p>Drag & drop an image, or click to select</p>
                    )}
                  </div>
                  {formData.featured_image && (
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="img-fluid mt-2 rounded"
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Legal News, Updates"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tags (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., law, policy, reform"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                  />
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

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
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
