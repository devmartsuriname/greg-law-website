import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge, ButtonGroup } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { mediaService, MediaItem } from '../../api/media';

const MediaLibrary = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadMetadata, setUploadMetadata] = useState({
    category: '',
    tags: '',
    published: true,
  });

  useEffect(() => {
    loadMedia();
  }, [typeFilter]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await mediaService.list(typeFilter || undefined);
      setMedia(data);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this file?')) {
      try {
        await mediaService.remove(id);
        loadMedia();
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
      'video/*': ['.mp4', '.webm'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;

    setUploading(true);
    try {
      const tags = uploadMetadata.tags
        ? uploadMetadata.tags.split(',').map(t => t.trim()).filter(t => t)
        : undefined;

      if (uploadFiles.length === 1) {
        await mediaService.upload(uploadFiles[0], {
          ...uploadMetadata,
          tags,
        });
      } else {
        await mediaService.bulkUpload(uploadFiles, {
          ...uploadMetadata,
          tags,
        });
      }

      setShowUpload(false);
      setUploadFiles([]);
      setUploadMetadata({ category: '', tags: '', published: true });
      loadMedia();
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
    }
  };

  const stats = {
    total: media.length,
    images: media.filter(m => m.type === 'image').length,
    videos: media.filter(m => m.type === 'video').length,
    youtube: media.filter(m => m.type === 'youtube').length,
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Media Library</h4>
        <Button variant="primary" onClick={() => setShowUpload(true)}>
          <Icon icon="mingcute:upload-line" className="me-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <h3>{stats.total}</h3>
              <small className="text-muted">Total Files</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <h3>{stats.images}</h3>
              <small className="text-muted">Images</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <h3>{stats.videos}</h3>
              <small className="text-muted">Videos</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <h3>{stats.youtube}</h3>
              <small className="text-muted">YouTube</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <div className="mb-3">
        <ButtonGroup>
          <Button
            variant={typeFilter === '' ? 'primary' : 'outline-primary'}
            onClick={() => setTypeFilter('')}
          >
            All
          </Button>
          <Button
            variant={typeFilter === 'image' ? 'primary' : 'outline-primary'}
            onClick={() => setTypeFilter('image')}
          >
            Images
          </Button>
          <Button
            variant={typeFilter === 'video' ? 'primary' : 'outline-primary'}
            onClick={() => setTypeFilter('video')}
          >
            Videos
          </Button>
          <Button
            variant={typeFilter === 'youtube' ? 'primary' : 'outline-primary'}
            onClick={() => setTypeFilter('youtube')}
          >
            YouTube
          </Button>
        </ButtonGroup>
      </div>

      {/* Media Grid */}
      <Row>
        {loading ? (
          <Col><div className="text-center py-5">Loading...</div></Col>
        ) : media.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <Icon icon="mingcute:pic-line" width={60} className="text-muted mb-3" />
              <p>No media files found. Upload your first file!</p>
            </div>
          </Col>
        ) : (
          media.map((file) => (
            <Col md={6} lg={3} key={file.id}>
              <Card>
                <Card.Body className="text-center">
                  {file.type === 'image' && file.file_url ? (
                    <img src={file.file_url} alt={file.alt_text || file.title} className="img-fluid rounded mb-2" style={{ maxHeight: '150px', objectFit: 'cover' }} />
                  ) : file.type === 'youtube' && file.youtube_thumbnail ? (
                    <img src={file.youtube_thumbnail} alt={file.youtube_title || file.title} className="img-fluid rounded mb-2" />
                  ) : (
                    <div className="py-5">
                      <Icon icon="mingcute:file-line" width={48} />
                    </div>
                  )}
                  <p className="mb-1 small text-truncate" title={file.title}>{file.title}</p>
                  {file.category && (
                    <Badge bg="info" className="mb-2">{file.category}</Badge>
                  )}
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

      {/* Upload Modal */}
      <Modal show={showUpload} onHide={() => setShowUpload(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            {...getRootProps()}
            style={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
              marginBottom: '20px',
            }}
          >
            <input {...getInputProps()} />
            <Icon icon="mingcute:upload-line" width={48} className="mb-3 text-muted" />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <div>
                <p>Drag & drop files here, or click to select</p>
                <small className="text-muted">Images and videos up to 10MB</small>
              </div>
            )}
          </div>

          {uploadFiles.length > 0 && (
            <div className="mb-3">
              <strong>Selected Files ({uploadFiles.length}):</strong>
              <ul className="mt-2">
                {uploadFiles.map((file, idx) => (
                  <li key={idx}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                ))}
              </ul>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Events, Projects, News"
              value={uploadMetadata.category}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, category: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 2024, official, press"
              value={uploadMetadata.tags}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, tags: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="switch"
              label="Published"
              checked={uploadMetadata.published}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, published: e.target.checked })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpload(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={uploading || uploadFiles.length === 0}
          >
            {uploading ? 'Uploading...' : `Upload ${uploadFiles.length} File(s)`}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MediaLibrary;
