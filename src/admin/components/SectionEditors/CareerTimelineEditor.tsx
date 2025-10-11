import { Form, Button, Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

interface CareerTimelineEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const CareerTimelineEditor = ({ data, onChange }: CareerTimelineEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const items = [...(data.items || [])];
    items[index] = { ...items[index], [field]: value };
    updateField('items', items);
  };

  const addItem = () => {
    updateField('items', [
      ...(data.items || []),
      { period: '', title: '', text: '' },
    ]);
  };

  const removeItem = (index: number) => {
    const items = [...(data.items || [])];
    items.splice(index, 1);
    updateField('items', items);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          Timeline Items
          <Button size="sm" variant="outline-primary" onClick={addItem}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Period
          </Button>
        </Form.Label>
      </Form.Group>

      {(data.items || []).map((item: any, index: number) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Period #{index + 1}</h6>
              <Button size="sm" variant="outline-danger" onClick={() => removeItem(index)}>
                <Icon icon="mingcute:delete-line" />
              </Button>
            </div>

            <Form.Group className="mb-2">
              <Form.Label>Period / Years *</Form.Label>
              <Form.Control
                type="text"
                value={item.period || ''}
                onChange={(e) => updateItem(index, 'period', e.target.value)}
                placeholder="e.g., 1985-1992"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={item.title || ''}
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                placeholder="e.g., Crown Prosecutor"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={item.text || ''}
                onChange={(e) => updateItem(index, 'text', e.target.value)}
                placeholder="Brief description of this period"
              />
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
