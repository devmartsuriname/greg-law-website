import { Form } from 'react-bootstrap';

interface NewsPreviewEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const NewsPreviewEditor = ({ data, onChange }: NewsPreviewEditorProps) => {
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
          placeholder="e.g., Latest News"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={data.sectionTitle || ''}
          onChange={(e) => updateField('sectionTitle', e.target.value)}
          placeholder="e.g., Recent Updates & News"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of News Items to Display</Form.Label>
        <Form.Control
          type="number"
          value={data.limit || 3}
          onChange={(e) => updateField('limit', parseInt(e.target.value) || 3)}
          placeholder="3"
        />
        <Form.Text>Maximum number of recent news articles to show</Form.Text>
      </Form.Group>

      <div className="alert alert-info mt-3">
        <small>
          <strong>Note:</strong> This section automatically pulls the latest published news from the News database.
          Manage news articles in the News section of the admin panel.
        </small>
      </div>
    </>
  );
};
