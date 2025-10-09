import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { settingsService, Settings as SettingsType } from '../../api/settings';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SettingsType>({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialMedia: {},
    seo: { metaTitle: '', metaDescription: '', metaKeywords: '' },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await settingsService.get();
    setFormData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await settingsService.update(formData);
    setLoading(false);
    alert('Settings saved!');
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">Settings</h4>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <Card>
              <Card.Header><h5 className="mb-0">General</h5></Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control type="text" value={formData.siteName} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Card.Header><h5 className="mb-0">SEO</h5></Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control type="text" value={formData.seo.metaTitle} onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </Form>
    </>
  );
};

export default Settings;
