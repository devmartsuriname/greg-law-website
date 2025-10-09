import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { mediaService, MediaFile } from '../../api/media';

const MediaLibrary = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const data = await mediaService.list();
    setMedia(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this file?')) {
      await mediaService.remove(id);
      loadMedia();
    }
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Media Library</h4>
        <Button variant="primary">
          <Icon icon="mingcute:upload-line" className="me-2" />
          Upload Files
        </Button>
      </div>

      <Row>
        {loading ? (
          <Col><div className="text-center py-5">Loading...</div></Col>
        ) : (
          media.map((file) => (
            <Col md={6} lg={3} key={file.id}>
              <Card>
                <Card.Body className="text-center">
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.filename} className="img-fluid rounded mb-2" />
                  ) : (
                    <div className="py-5">
                      <Icon icon="mingcute:file-line" width={48} />
                    </div>
                  )}
                  <p className="mb-1 small text-truncate">{file.filename}</p>
                  <small className="text-muted">{(file.size / 1024).toFixed(2)} KB</small>
                  <div className="mt-2">
                    <Button variant="link" size="sm" className="text-danger" onClick={() => handleDelete(file.id)}>
                      <Icon icon="mingcute:delete-line" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default MediaLibrary;
