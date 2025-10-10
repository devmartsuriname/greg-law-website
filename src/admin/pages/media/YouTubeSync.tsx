import { useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { supabase } from '@/integrations/supabase/client';

const YouTubeSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('youtube-sync', {
        body: {},
      });

      if (invokeError) throw invokeError;
      setResult(data);
    } catch (err: any) {
      console.error('Sync error:', err);
      setError(err.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">YouTube Integration</h4>
      </div>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sync YouTube Videos</h5>
            </Card.Header>
            <Card.Body>
              <p>
                Sync the latest videos from your YouTube channel to the media library. This will
                automatically import video metadata including titles, descriptions, and thumbnails.
              </p>

              <div className="mb-4">
                <h6>Configuration Required:</h6>
                <ul>
                  <li>YouTube API Key (YOUTUBE_API_KEY)</li>
                  <li>YouTube Channel ID (YOUTUBE_CHANNEL_ID)</li>
                </ul>
                <small className="text-muted">
                  These should be configured as Edge Function secrets in Supabase.
                </small>
              </div>

              <Button
                variant="primary"
                onClick={handleSync}
                disabled={syncing}
                size="lg"
              >
                <Icon icon="mingcute:refresh-2-line" className="me-2" />
                {syncing ? 'Syncing...' : 'Sync YouTube Videos'}
              </Button>

              {result && (
                <Alert variant="success" className="mt-4">
                  <h6>Sync Complete!</h6>
                  <ul className="mb-0">
                    <li>Total Videos: {result.total}</li>
                    <li>Successfully Synced: {result.synced}</li>
                    <li>Errors: {result.errors}</li>
                  </ul>
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="mt-4">
                  <strong>Error:</strong> {error}
                  <br />
                  <small>
                    Make sure YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID are configured in Edge Function
                    secrets.
                  </small>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Setup Guide</h5>
            </Card.Header>
            <Card.Body>
              <h6>1. Get YouTube API Key</h6>
              <p className="small">
                Visit{' '}
                <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
                  Google Cloud Console
                </a>{' '}
                and create a YouTube Data API v3 key.
              </p>

              <h6 className="mt-3">2. Find Channel ID</h6>
              <p className="small">
                Go to your YouTube channel, click Settings → Advanced, and copy the Channel ID.
              </p>

              <h6 className="mt-3">3. Add Secrets</h6>
              <p className="small">
                Add YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID as Edge Function secrets in Supabase
                dashboard.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default YouTubeSync;
