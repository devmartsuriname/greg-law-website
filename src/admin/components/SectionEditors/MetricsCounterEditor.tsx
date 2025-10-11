import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

interface MetricsCounterEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const MetricsCounterEditor = ({ data, onChange }: MetricsCounterEditorProps) => {
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
      { value: 0, suffix: '', label: '' },
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
          Counter Metrics
          <Button size="sm" variant="outline-primary" onClick={addItem}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Metric
          </Button>
        </Form.Label>
      </Form.Group>

      {(data.items || []).map((item: any, index: number) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Metric #{index + 1}</h6>
              <Button size="sm" variant="outline-danger" onClick={() => removeItem(index)}>
                <Icon icon="mingcute:delete-line" />
              </Button>
            </div>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Value *</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.value || 0}
                    onChange={(e) => updateItem(index, 'value', parseInt(e.target.value) || 0)}
                    placeholder="100"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Suffix</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.suffix || ''}
                    onChange={(e) => updateItem(index, 'suffix', e.target.value)}
                    placeholder="e.g., %, +, K"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Label *</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => updateItem(index, 'label', e.target.value)}
                    placeholder="e.g., Cases Won"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
