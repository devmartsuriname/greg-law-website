import { Form, Row, Col } from 'react-bootstrap';

interface ContactCTAEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const ContactCTAEditor = ({ data, onChange }: ContactCTAEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Background Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.backgroundImage || ''}
          onChange={(e) => updateField('backgroundImage', e.target.value)}
          placeholder="/images/background/1.jpg"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          value={data.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Contact Us Today"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Subtitle / Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Call to action description"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Button Text</Form.Label>
            <Form.Control
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => updateField('buttonText', e.target.value)}
              placeholder="e.g., Get in Touch"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Button Link</Form.Label>
            <Form.Control
              type="text"
              value={data.buttonLink || ''}
              onChange={(e) => updateField('buttonLink', e.target.value)}
              placeholder="/contact"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={data.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="info@example.com"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
