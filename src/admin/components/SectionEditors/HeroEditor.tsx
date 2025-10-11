import { Form, Row, Col } from 'react-bootstrap';

interface HeroEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const HeroEditor = ({ data, onChange }: HeroEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Hero Title *</Form.Label>
        <Form.Control
          type="text"
          value={data.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Enter hero title (HTML allowed)"
        />
        <Form.Text>You can use HTML tags like &lt;span&gt; for styling</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Subtitle</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Enter hero subtitle"
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
              placeholder="e.g., Learn More"
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

      <Form.Group className="mb-3">
        <Form.Label>Hero Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.image || ''}
          onChange={(e) => updateField('image', e.target.value)}
          placeholder="/images/hero-image.png"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Background Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.backgroundImage || ''}
          onChange={(e) => updateField('backgroundImage', e.target.value)}
          placeholder="/images/background.jpg"
        />
      </Form.Group>
    </>
  );
};
