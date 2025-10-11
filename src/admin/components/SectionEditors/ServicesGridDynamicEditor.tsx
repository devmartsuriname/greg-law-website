import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

interface ServicesGridDynamicEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const ServicesGridDynamicEditor = ({ data, onChange }: ServicesGridDynamicEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateService = (index: number, field: string, value: any) => {
    const services = [...(data.services || [])];
    services[index] = { ...services[index], [field]: value };
    updateField('services', services);
  };

  const addService = () => {
    updateField('services', [
      ...(data.services || []),
      { title: '', description: '', icon: '', slug: '' },
    ]);
  };

  const removeService = (index: number) => {
    const services = [...(data.services || [])];
    services.splice(index, 1);
    updateField('services', services);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          Services ({(data.services || []).length})
          <Button size="sm" variant="outline-primary" onClick={addService}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Service
          </Button>
        </Form.Label>
      </Form.Group>

      {(data.services || []).map((service: any, index: number) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Service #{index + 1}</h6>
              <Button size="sm" variant="outline-danger" onClick={() => removeService(index)}>
                <Icon icon="mingcute:delete-line" />
              </Button>
            </div>

            <Form.Group className="mb-2">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={service.title || ''}
                onChange={(e) => updateService(index, 'title', e.target.value)}
                placeholder="Service title"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={service.description || ''}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                placeholder="Service description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Icon Class</Form.Label>
                  <Form.Control
                    type="text"
                    value={service.icon || ''}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                    placeholder="flaticon-balance"
                  />
                  <Form.Text>e.g., flaticon-balance, flaticon-law</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Slug (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    value={service.slug || ''}
                    onChange={(e) => updateService(index, 'slug', e.target.value)}
                    placeholder="family-law"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <hr className="my-4" />
      <h6>Side Image (Experience Years Badge)</h6>

      <Form.Group className="mb-3">
        <Form.Label>Side Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.sideImage?.url || ''}
          onChange={(e) => updateField('sideImage', { ...data.sideImage, url: e.target.value })}
          placeholder="/images/resource/image-5.jpg"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Alt Text</Form.Label>
        <Form.Control
          type="text"
          value={data.sideImage?.alt || ''}
          onChange={(e) => updateField('sideImage', { ...data.sideImage, alt: e.target.value })}
          placeholder="Image description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Overlay Text (Experience Badge)</Form.Label>
        <Form.Control
          type="text"
          value={data.sideImage?.overlay || ''}
          onChange={(e) => updateField('sideImage', { ...data.sideImage, overlay: e.target.value })}
          placeholder="<span>35</span> Years<br /> Experience"
        />
        <Form.Text>Use HTML for multi-line text</Form.Text>
      </Form.Group>
    </>
  );
};
