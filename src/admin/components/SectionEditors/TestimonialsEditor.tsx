import { Form } from 'react-bootstrap';

interface TestimonialsEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const TestimonialsEditor = ({ data, onChange }: TestimonialsEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Section Label</Form.Label>
        <Form.Control
          type="text"
          value={data.sectionLabel || ''}
          onChange={(e) => updateField('sectionLabel', e.target.value)}
          placeholder="e.g., Testimonials"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={data.sectionTitle || ''}
          onChange={(e) => updateField('sectionTitle', e.target.value)}
          placeholder="e.g., What Our Clients Say"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Quotes to Display</Form.Label>
        <Form.Control
          type="number"
          value={data.limit || 3}
          onChange={(e) => updateField('limit', parseInt(e.target.value) || 3)}
          placeholder="3"
        />
        <Form.Text>Maximum number of featured quotes to show</Form.Text>
      </Form.Group>

      <div className="alert alert-info mt-3">
        <small>
          <strong>Note:</strong> This section automatically pulls featured quotes from the Quotes database.
          Manage quotes in the Quotes section of the admin panel.
        </small>
      </div>
    </>
  );
};
