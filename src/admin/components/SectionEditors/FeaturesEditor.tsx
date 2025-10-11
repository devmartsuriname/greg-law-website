import { Form, Button, Card, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Feature {
  icon: string;
  label: string;
  title: string;
  link?: string;
}

interface ValidationErrors {
  [key: number]: {
    icon?: string;
    label?: string;
    title?: string;
    link?: string;
  };
}

const CARD_TEMPLATES = [
  {
    name: 'Meeting Request',
    icon: 'flaticon-calendar',
    label: 'Request a',
    title: 'Meeting',
    link: '/appointments'
  },
  {
    name: 'Citizen Services',
    icon: 'flaticon-link-symbol',
    label: 'Citizen',
    title: 'Services',
    link: '/services'
  },
  {
    name: 'Contact Office',
    icon: 'flaticon-email',
    label: 'Contact',
    title: 'VP Office',
    link: '/contact'
  },
  {
    name: 'Documents',
    icon: 'flaticon-file',
    label: 'Browse',
    title: 'Documents',
    link: '/documents'
  },
  {
    name: 'News & Updates',
    icon: 'flaticon-news',
    label: 'Latest',
    title: 'News',
    link: '/news'
  }
];

interface FeaturesEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const FeaturesEditor = ({ data, onChange }: FeaturesEditorProps) => {
  const features: Feature[] = data.features || [];
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const updateFeatures = (newFeatures: Feature[]) => {
    onChange({ ...data, features: newFeatures });
  };

  const validateFeature = (feature: Feature, index: number) => {
    const errors: ValidationErrors[number] = {};
    
    if (!feature.icon || feature.icon.trim() === '') {
      errors.icon = 'Icon class is required';
    }
    
    if (!feature.label || feature.label.trim() === '') {
      errors.label = 'Label text is required';
    }
    
    if (!feature.title || feature.title.trim() === '') {
      errors.title = 'Title is required';
    }
    
    if (feature.link && feature.link.trim() !== '') {
      const urlPattern = /^(\/|https?:\/\/)/;
      if (!urlPattern.test(feature.link)) {
        errors.link = 'Link must start with "/" or "http://" or "https://"';
      }
    }
    
    return errors;
  };

  const validateAllFeatures = () => {
    const allErrors: ValidationErrors = {};
    features.forEach((feature, index) => {
      const errors = validateFeature(feature, index);
      if (Object.keys(errors).length > 0) {
        allErrors[index] = errors;
      }
    });
    setValidationErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const addFeature = () => {
    const newFeature: Feature = {
      icon: 'flaticon-calendar',
      label: 'New',
      title: 'Feature',
      link: '',
    };
    updateFeatures([...features, newFeature]);
  };

  const addFromTemplate = (template: typeof CARD_TEMPLATES[0]) => {
    const newFeature: Feature = {
      icon: template.icon,
      label: template.label,
      title: template.title,
      link: template.link,
    };
    updateFeatures([...features, newFeature]);
  };

  const duplicateFeature = (index: number) => {
    const featureToDuplicate = features[index];
    const duplicatedFeature: Feature = { ...featureToDuplicate };
    const newFeatures = [...features];
    newFeatures.splice(index + 1, 0, duplicatedFeature);
    updateFeatures(newFeatures);
  };

  const removeFeature = (index: number) => {
    updateFeatures(features.filter((_, i) => i !== index));
    // Clear validation errors for this index
    const newErrors = { ...validationErrors };
    delete newErrors[index];
    setValidationErrors(newErrors);
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updated = features.map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    );
    updateFeatures(updated);
    
    // Clear validation error for this field
    if (validationErrors[index]?.[field]) {
      const newErrors = { ...validationErrors };
      if (newErrors[index]) {
        delete newErrors[index][field];
        if (Object.keys(newErrors[index]).length === 0) {
          delete newErrors[index];
        }
      }
      setValidationErrors(newErrors);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const items = [...features];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    updateFeatures(items);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Quick Action Cards</h6>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" size="sm">
              <Icon icon="mingcute:star-line" className="me-1" />
              Add from Template
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {CARD_TEMPLATES.map((template, idx) => (
                <Dropdown.Item 
                  key={idx}
                  onClick={() => addFromTemplate(template)}
                >
                  <Icon icon="mingcute:grid-line" className="me-2" width={16} />
                  {template.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" size="sm" onClick={addFeature}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Card
          </Button>
        </div>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="warning" className="mb-3">
          <Icon icon="mingcute:alert-line" className="me-2" />
          Some cards have validation errors. Please fix them before saving.
        </Alert>
      )}

      {features.length === 0 && (
        <p className="text-muted text-center py-3">
          No cards yet. Click "Add Card" or use a template to create your first quick action card.
        </p>
      )}

      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="mb-3 border"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          style={{ cursor: 'move', opacity: draggedIndex === index ? 0.5 : 1 }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center bg-light">
            <div className="d-flex align-items-center">
              <Icon icon="mingcute:menu-line" className="me-2 text-muted" style={{ cursor: 'grab' }} />
              <strong>Card #{index + 1}</strong>
              {validationErrors[index] && Object.keys(validationErrors[index]).length > 0 && (
                <Icon icon="mingcute:alert-fill" className="ms-2 text-warning" width={16} />
              )}
            </div>
            <div className="d-flex gap-2">
              <Button 
                variant="link" 
                size="sm" 
                className="text-primary p-0"
                onClick={() => duplicateFeature(index)}
                title="Duplicate card"
              >
                <Icon icon="mingcute:copy-2-line" width={18} />
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="text-danger p-0"
                onClick={() => removeFeature(index)}
                title="Delete card"
              >
                <Icon icon="mingcute:delete-2-line" width={18} />
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small">Icon Class *</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Control
                  type="text"
                  size="sm"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                  placeholder="flaticon-calendar"
                  isInvalid={!!validationErrors[index]?.icon}
                  className="flex-grow-1"
                />
                {feature.icon && (
                  <div 
                    className="d-flex align-items-center justify-content-center border rounded p-2 bg-light"
                    style={{ minWidth: '40px', minHeight: '40px' }}
                    title="Icon preview"
                  >
                    <i className={feature.icon} style={{ fontSize: '20px' }}></i>
                  </div>
                )}
              </div>
              {validationErrors[index]?.icon ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {validationErrors[index].icon}
                </Form.Control.Feedback>
              ) : (
                <Form.Text>Flaticon class name (e.g., flaticon-calendar, flaticon-link-symbol)</Form.Text>
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Label Text *</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={feature.label}
                    onChange={(e) => updateFeature(index, 'label', e.target.value)}
                    placeholder="Request a"
                    isInvalid={!!validationErrors[index]?.label}
                  />
                  {validationErrors[index]?.label ? (
                    <Form.Control.Feedback type="invalid">
                      {validationErrors[index].label}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Text>Small text above the title</Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Title *</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Meeting"
                    isInvalid={!!validationErrors[index]?.title}
                  />
                  {validationErrors[index]?.title ? (
                    <Form.Control.Feedback type="invalid">
                      {validationErrors[index].title}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Text>Main heading text</Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-0">
              <Form.Label className="small">Link URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={feature.link || ''}
                onChange={(e) => updateFeature(index, 'link', e.target.value)}
                placeholder="/appointments"
                isInvalid={!!validationErrors[index]?.link}
              />
              {validationErrors[index]?.link ? (
                <Form.Control.Feedback type="invalid">
                  {validationErrors[index].link}
                </Form.Control.Feedback>
              ) : (
                <Form.Text>Make this card clickable (e.g., /appointments, /services)</Form.Text>
              )}
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
