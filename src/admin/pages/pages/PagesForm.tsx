import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Row, Col, Spinner, Badge, Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { pagesService, Page, PageSection } from '../../api/pages';
import { useToast } from '../../../hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero Banner', icon: 'mingcute:star-line' },
  { value: 'about', label: 'About Section', icon: 'mingcute:information-line' },
  { value: 'services_grid', label: 'Services Grid', icon: 'mingcute:grid-line' },
  { value: 'features', label: 'Features', icon: 'mingcute:list-check-line' },
  { value: 'testimonials', label: 'Testimonials/Quotes', icon: 'mingcute:quote-left-line' },
  { value: 'text', label: 'Text Content', icon: 'mingcute:align-left-line' },
  { value: 'image', label: 'Image', icon: 'mingcute:pic-line' },
];

const PagesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    published: false,
    sections: [] as PageSection[],
  });

  useEffect(() => {
    if (id) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const page = await pagesService.getById(id!);
      setFormData({
        title: page.title,
        slug: page.slug,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        published: page.published,
        sections: page.sections || [],
      });
    } catch (error) {
      console.error('Error fetching page:', error);
      toast({
        title: 'Error',
        description: 'Failed to load page',
        variant: 'destructive',
      });
      navigate('/admin/pages');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !id ? generateSlug(title) : prev.slug,
    }));
  };

  const handleAddSection = (type: string) => {
    const newSection: PageSection = {
      id: uuidv4(),
      type: type as any,
      data: {},
      order: formData.sections.length,
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const handleRemoveSection = (sectionId: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...formData.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    newSections.forEach((section, idx) => {
      section.order = idx;
    });

    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  const handleSectionDataChange = (sectionId: string, data: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, data } : section
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug) {
      toast({
        title: 'Validation Error',
        description: 'Title and slug are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      if (id) {
        await pagesService.update(id, formData);
        toast({
          title: 'Success',
          description: 'Page updated successfully',
        });
      } else {
        await pagesService.create(formData);
        toast({
          title: 'Success',
          description: 'Page created successfully',
        });
      }
      navigate('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading page...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">{id ? 'Edit Page' : 'Create New Page'}</h1>
          <p className="text-muted">Manage page content and sections</p>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate('/admin/pages')}>
          <Icon icon="mingcute:arrow-left-line" className="me-1" />
          Back to Pages
        </Button>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Page Information</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Page Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter page title"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Slug *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="page-url-slug"
                    required
                  />
                  <Form.Text>URL path: /{formData.slug}</Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Page Sections</h5>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="primary" size="sm">
                    <Icon icon="mingcute:add-line" className="me-1" />
                    Add Section
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {SECTION_TYPES.map((type) => (
                      <Dropdown.Item 
                        key={type.value}
                        onClick={() => handleAddSection(type.value)}
                      >
                        <Icon icon={type.icon} className="me-2" />
                        {type.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                {formData.sections.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <Icon icon="mingcute:file-line" style={{ fontSize: '3rem', opacity: 0.3 }} />
                    <p className="mt-2">No sections added yet. Click "Add Section" to begin.</p>
                  </div>
                ) : (
                  <div className="sections-list">
                    {formData.sections.map((section, index) => (
                      <Card key={section.id} className="mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="secondary" className="me-2">
                              #{index + 1}
                            </Badge>
                            <span className="fw-bold">
                              {SECTION_TYPES.find((t) => t.value === section.type)?.label || section.type}
                            </span>
                          </div>
                          <div className="btn-group btn-group-sm">
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleMoveSection(index, 'up')}
                              disabled={index === 0}
                              title="Move up"
                            >
                              <Icon icon="mingcute:arrow-up-line" />
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleMoveSection(index, 'down')}
                              disabled={index === formData.sections.length - 1}
                              title="Move down"
                            >
                              <Icon icon="mingcute:arrow-down-line" />
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => handleRemoveSection(section.id)}
                              title="Delete"
                            >
                              <Icon icon="mingcute:delete-line" />
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Form.Group>
                            <Form.Label className="small text-muted">Section Data (JSON)</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={JSON.stringify(section.data, null, 2)}
                              onChange={(e) => {
                                try {
                                  const data = JSON.parse(e.target.value);
                                  handleSectionDataChange(section.id, data);
                                } catch (error) {
                                  // Invalid JSON, ignore
                                }
                              }}
                              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                            />
                            <Form.Text>Edit section data as JSON</Form.Text>
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">SEO Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="SEO title for search engines"
                  />
                  <Form.Text>{formData.meta_title.length}/60 characters</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder="SEO description for search engines"
                  />
                  <Form.Text>{formData.meta_description.length}/160 characters</Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Publish Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="switch"
                  id="published-switch"
                  label="Published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <Form.Text>
                  {formData.published
                    ? 'This page is visible to the public'
                    : 'This page is a draft and not visible to the public'}
                </Form.Text>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon icon="mingcute:check-line" className="me-1" />
                    {id ? 'Update Page' : 'Create Page'}
                  </>
                )}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/admin/pages')}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PagesForm;
