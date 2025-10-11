import { Form } from 'react-bootstrap';

interface TeamGridEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const TeamGridEditor = ({ data, onChange }: TeamGridEditorProps) => {
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
          placeholder="e.g., Our Team"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={data.sectionTitle || ''}
          onChange={(e) => updateField('sectionTitle', e.target.value)}
          placeholder="e.g., Meet Our Expert Team"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Team Members to Display</Form.Label>
        <Form.Control
          type="number"
          value={data.limit || 6}
          onChange={(e) => updateField('limit', parseInt(e.target.value) || 6)}
          placeholder="6"
        />
        <Form.Text>Maximum number of team members to show</Form.Text>
      </Form.Group>

      <div className="alert alert-info mt-3">
        <small>
          <strong>Note:</strong> This section automatically pulls published team members from the Team database.
          Manage team members in the Team section of the admin panel.
        </small>
      </div>
    </>
  );
};
