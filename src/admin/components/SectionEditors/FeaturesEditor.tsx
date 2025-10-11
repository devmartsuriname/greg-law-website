import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Feature {
  icon: string;
  label: string;
  title: string;
  link?: string;
}

interface FeaturesEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const FeaturesEditor = ({ data, onChange }: FeaturesEditorProps) => {
  const features: Feature[] = data.features || [];
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const updateFeatures = (newFeatures: Feature[]) => {
    onChange({ ...data, features: newFeatures });
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

  const removeFeature = (index: number) => {
    updateFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updated = features.map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    );
    updateFeatures(updated);
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
        <Button variant="primary" size="sm" onClick={addFeature}>
          <Icon icon="mingcute:add-line" className="me-1" />
          Add Card
        </Button>
      </div>

      {features.length === 0 && (
        <p className="text-muted text-center py-3">
          No cards yet. Click "Add Card" to create your first quick action card.
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
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-danger p-0"
              onClick={() => removeFeature(index)}
            >
              <Icon icon="mingcute:delete-2-line" width={18} />
            </Button>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small">Icon Class *</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={feature.icon}
                onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                placeholder="flaticon-calendar"
              />
              <Form.Text>Flaticon class name (e.g., flaticon-calendar, flaticon-link-symbol)</Form.Text>
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
                  />
                  <Form.Text>Small text above the title</Form.Text>
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
                  />
                  <Form.Text>Main heading text</Form.Text>
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
              />
              <Form.Text>Make this card clickable (e.g., /appointments, /services)</Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
