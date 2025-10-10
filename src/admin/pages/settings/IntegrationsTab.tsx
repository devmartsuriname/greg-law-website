import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { integrationsService, YouTubeConfig, GoogleCalendarConfig } from '../../api/integrations';

const IntegrationsTab = () => {
  const [loading, setLoading] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // YouTube config state
  const [youtubeConfig, setYoutubeConfig] = useState<YouTubeConfig>({
    apiKey: '',
    channelId: '',
    syncInterval: 'manual',
  });
  const [youtubeEnabled, setYoutubeEnabled] = useState(false);
  const [youtubeConfigured, setYoutubeConfigured] = useState(false);

  // Google Calendar config state
  const [calendarConfig, setCalendarConfig] = useState<GoogleCalendarConfig>({
    apiKey: '',
    calendarId: '',
  });
  const [calendarEnabled, setCalendarEnabled] = useState(false);
  const [calendarConfigured, setCalendarConfigured] = useState(false);

  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = async () => {
    setLoading(true);
    try {
      // Load YouTube config
      const youtubeData = await integrationsService.getYouTubeConfig();
      if (youtubeData) {
        setYoutubeConfig(youtubeData.config as YouTubeConfig);
        setYoutubeEnabled(youtubeData.enabled);
        setYoutubeConfigured(true);
      }

      // Load Calendar config
      const calendarData = await integrationsService.getCalendarConfig();
      if (calendarData) {
        setCalendarConfig(calendarData.config as GoogleCalendarConfig);
        setCalendarEnabled(calendarData.enabled);
        setCalendarConfigured(true);
      }
    } catch (error) {
      console.error('Error loading configurations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleYouTubeSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setYoutubeLoading(true);
    try {
      await integrationsService.updateYouTubeConfig(youtubeConfig, youtubeEnabled);
      setYoutubeConfigured(true);
      alert('YouTube configuration saved successfully!');
    } catch (error) {
      console.error('Error saving YouTube config:', error);
      alert('Error saving YouTube configuration. Please try again.');
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleCalendarSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalendarLoading(true);
    try {
      await integrationsService.updateCalendarConfig(calendarConfig, calendarEnabled);
      setCalendarConfigured(true);
      alert('Google Calendar configuration saved successfully!');
    } catch (error) {
      console.error('Error saving Calendar config:', error);
      alert('Error saving Google Calendar configuration. Please try again.');
    } finally {
      setCalendarLoading(false);
    }
  };

  const maskApiKey = (key: string): string => {
    if (!key || key.length < 8) return '••••••••';
    return '••••••••' + key.slice(-4);
  };

  const getStatusBadge = (configured: boolean, enabled: boolean) => {
    if (!configured) {
      return <Badge bg="danger">🔴 Not Configured</Badge>;
    }
    if (enabled) {
      return <Badge bg="success">🟢 Active</Badge>;
    }
    return <Badge bg="warning">🟡 Configured</Badge>;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Alert variant="info" className="mb-4">
        <strong>Manual Configuration Required:</strong> Integration API keys must be configured by a system administrator. 
        No automatic API calls will be made until credentials are saved and enabled.
      </Alert>

      <Row>
        {/* YouTube Sync Configuration */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">YouTube Sync</h5>
              {getStatusBadge(youtubeConfigured, youtubeEnabled)}
            </Card.Header>
            <Card.Body>
              <Alert variant="warning" className="small">
                <strong>Note:</strong> YouTube API configuration is stored securely. Manual update required by system administrator.
              </Alert>

              <Form onSubmit={handleYouTubeSave}>
                <Form.Group className="mb-3">
                  <Form.Label>YouTube API Key <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter YouTube API Key"
                    value={youtubeConfig.apiKey}
                    onChange={(e) => setYoutubeConfig({ ...youtubeConfig, apiKey: e.target.value })}
                    required
                    minLength={20}
                  />
                  {youtubeConfigured && youtubeConfig.apiKey && (
                    <Form.Text className="text-muted">
                      Current: {maskApiKey(youtubeConfig.apiKey)}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>YouTube Channel ID <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="UC..."
                    value={youtubeConfig.channelId}
                    onChange={(e) => setYoutubeConfig({ ...youtubeConfig, channelId: e.target.value })}
                    required
                    pattern="UC.*"
                  />
                  <Form.Text className="text-muted">
                    Must start with "UC"
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sync Interval</Form.Label>
                  <Form.Select
                    value={youtubeConfig.syncInterval}
                    onChange={(e) => setYoutubeConfig({ ...youtubeConfig, syncInterval: e.target.value as 'manual' | 'daily' | 'weekly' })}
                  >
                    <option value="manual">Manual</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Enable YouTube Sync"
                    checked={youtubeEnabled}
                    onChange={(e) => setYoutubeEnabled(e.target.checked)}
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={youtubeLoading}>
                    {youtubeLoading ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Connection testing will be available after implementation</Tooltip>}
                  >
                    <span className="d-inline-block">
                      <Button variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>
                        Test Connection
                      </Button>
                    </span>
                  </OverlayTrigger>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Google Calendar Configuration */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Google Calendar Sync</h5>
              {getStatusBadge(calendarConfigured, calendarEnabled)}
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="small">
                <strong>Coming Soon:</strong> Google Calendar synchronization is not yet active. 
                Please configure API keys to prepare for future implementation.
              </Alert>

              <Form onSubmit={handleCalendarSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Google Calendar API Key <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Google Calendar API Key"
                    value={calendarConfig.apiKey}
                    onChange={(e) => setCalendarConfig({ ...calendarConfig, apiKey: e.target.value })}
                    required
                    minLength={20}
                  />
                  {calendarConfigured && calendarConfig.apiKey && (
                    <Form.Text className="text-muted">
                      Current: {maskApiKey(calendarConfig.apiKey)}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Calendar ID <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@gmail.com or calendar-id@group.calendar.google.com"
                    value={calendarConfig.calendarId}
                    onChange={(e) => setCalendarConfig({ ...calendarConfig, calendarId: e.target.value })}
                    required
                  />
                  <Form.Text className="text-muted">
                    Usually an email address format
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Enable Calendar Sync"
                    checked={calendarEnabled}
                    onChange={(e) => setCalendarEnabled(e.target.checked)}
                    disabled
                  />
                  <Form.Text className="text-muted d-block mt-1">
                    (Will be enabled after implementation)
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={calendarLoading}>
                    {calendarLoading ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Calendar sync will be available after implementation</Tooltip>}
                  >
                    <span className="d-inline-block">
                      <Button variant="outline-secondary" disabled style={{ pointerEvents: 'none' }}>
                        Test Connection
                      </Button>
                    </span>
                  </OverlayTrigger>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Alert variant="secondary" className="mt-4">
        <h6>Security Notice</h6>
        <p className="mb-0 small">
          All API keys are stored securely in the database with Row-Level Security (RLS) policies. 
          Only administrators can modify integration settings. Editors and viewers have read-only access.
        </p>
      </Alert>
    </>
  );
};

export default IntegrationsTab;
