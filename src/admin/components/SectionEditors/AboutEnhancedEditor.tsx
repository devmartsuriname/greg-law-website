import { Form, Row, Col, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

interface AboutEnhancedEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const AboutEnhancedEditor = ({ data, onChange }: AboutEnhancedEditorProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateFeature = (index: number, value: string) => {
    const features = [...(data.features || [])];
    features[index] = value;
    updateField('features', features);
  };

  const addFeature = () => {
    updateField('features', [...(data.features || []), '']);
  };

  const removeFeature = (index: number) => {
    const features = [...(data.features || [])];
    features.splice(index, 1);
    updateField('features', features);
  };

  const updatePhone = (index: number, value: string) => {
    const phones = [...(data.phones || [])];
    phones[index] = value;
    updateField('phones', phones);
  };

  const addPhone = () => {
    updateField('phones', [...(data.phones || []), '']);
  };

  const removePhone = (index: number) => {
    const phones = [...(data.phones || [])];
    phones.splice(index, 1);
    updateField('phones', phones);
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const kpis = [...(data.kpis || [])];
    kpis[index] = { ...kpis[index], [field]: value };
    updateField('kpis', kpis);
  };

  const addKpi = () => {
    updateField('kpis', [...(data.kpis || []), { value: 0, suffix: '', label: '', description: '' }]);
  };

  const removeKpi = (index: number) => {
    const kpis = [...(data.kpis || [])];
    kpis.splice(index, 1);
    updateField('kpis', kpis);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Section Label</Form.Label>
        <Form.Control
          type="text"
          value={data.sectionLabel || ''}
          onChange={(e) => updateField('sectionLabel', e.target.value)}
          placeholder="e.g., About Us"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          value={data.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Enter section title (HTML allowed)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={data.content || ''}
          onChange={(e) => updateField('content', e.target.value)}
          placeholder="Enter section content (HTML allowed)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          Features / Bullet Points
          <Button size="sm" variant="outline-primary" onClick={addFeature}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Feature
          </Button>
        </Form.Label>
        {(data.features || []).map((feature: string, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2">
            <Form.Control
              type="text"
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder="Feature text"
            />
            <Button size="sm" variant="outline-danger" onClick={() => removeFeature(index)}>
              <Icon icon="mingcute:delete-line" />
            </Button>
          </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          Phone Numbers
          <Button size="sm" variant="outline-primary" onClick={addPhone}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add Phone
          </Button>
        </Form.Label>
        {(data.phones || []).map((phone: string, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2">
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => updatePhone(index, e.target.value)}
              placeholder="Phone number"
            />
            <Button size="sm" variant="outline-danger" onClick={() => removePhone(index)}>
              <Icon icon="mingcute:delete-line" />
            </Button>
          </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact Label</Form.Label>
        <Form.Control
          type="text"
          value={data.contactLabel || ''}
          onChange={(e) => updateField('contactLabel', e.target.value)}
          placeholder="e.g., VP Office"
        />
      </Form.Group>

      <hr className="my-4" />
      <h6>Video Section</h6>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Video Image URL</Form.Label>
            <Form.Control
              type="text"
              value={data.videoImage || ''}
              onChange={(e) => updateField('videoImage', e.target.value)}
              placeholder="/images/video-thumb.jpg"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              type="text"
              value={data.videoUrl || ''}
              onChange={(e) => updateField('videoUrl', e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />
      <h6>Signature</h6>

      <Form.Group className="mb-3">
        <Form.Label>Signature Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.signature?.image || ''}
          onChange={(e) => updateField('signature', { ...data.signature, image: e.target.value })}
          placeholder="/images/signature.png"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Signature Name</Form.Label>
            <Form.Control
              type="text"
              value={data.signature?.name || ''}
              onChange={(e) => updateField('signature', { ...data.signature, name: e.target.value })}
              placeholder="John Doe"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Signature Title</Form.Label>
            <Form.Control
              type="text"
              value={data.signature?.title || ''}
              onChange={(e) => updateField('signature', { ...data.signature, title: e.target.value })}
              placeholder="Vice President"
            />
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />
      <h6>KPIs / Metrics</h6>

      <Form.Group className="mb-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          Key Performance Indicators
          <Button size="sm" variant="outline-primary" onClick={addKpi}>
            <Icon icon="mingcute:add-line" className="me-1" />
            Add KPI
          </Button>
        </Form.Label>
        {(data.kpis || []).map((kpi: any, index: number) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>KPI {index + 1}</strong>
              <Button size="sm" variant="outline-danger" onClick={() => removeKpi(index)}>
                <Icon icon="mingcute:delete-line" />
              </Button>
            </div>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="number"
                    value={kpi.value || 0}
                    onChange={(e) => updateKpi(index, 'value', parseInt(e.target.value) || 0)}
                    placeholder="25"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Suffix</Form.Label>
                  <Form.Control
                    type="text"
                    value={kpi.suffix || ''}
                    onChange={(e) => updateKpi(index, 'suffix', e.target.value)}
                    placeholder="+, %, etc."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    type="text"
                    value={kpi.label || ''}
                    onChange={(e) => updateKpi(index, 'label', e.target.value)}
                    placeholder="Years of Service"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={kpi.description || ''}
                onChange={(e) => updateKpi(index, 'description', e.target.value)}
                placeholder="Public service dedication"
              />
            </Form.Group>
          </div>
        ))}
      </Form.Group>
    </>
  );
};
