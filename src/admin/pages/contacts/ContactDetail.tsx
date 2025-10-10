import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { contactsService, ContactItem } from '../../api/contacts';
import { format } from 'date-fns';

const ContactDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState<ContactItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      loadContact();
    }
  }, [id]);

  const loadContact = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await contactsService.get(id);
      setContact(data);
    } catch (error) {
      console.error('Error loading contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!id || !contact) return;
    
    setUpdating(true);
    try {
      await contactsService.updateStatus(id, status);
      await loadContact();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      new: { bg: 'primary', text: 'New' },
      read: { bg: 'info', text: 'Read' },
      responded: { bg: 'success', text: 'Responded' },
    };
    return badges[status] || badges.new;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <Alert variant="danger">
        Contact submission not found.
        <Button variant="link" onClick={() => navigate('/admin/contacts')}>
          Back to list
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Contact Details</h4>
          <small className="text-muted">Submission #{contact.id.slice(0, 8)}</small>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate('/admin/contacts')}>
          <Icon icon="mingcute:arrow-left-line" className="me-2" />
          Back to List
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Contact Information</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Name:</strong>
                  <p>{contact.name}</p>
                </Col>
                <Col md={6}>
                  <strong>Email:</strong>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Phone:</strong>
                  <p>
                    {contact.phone ? (
                      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                    ) : (
                      '-'
                    )}
                  </p>
                </Col>
                <Col md={6}>
                  <strong>Subject:</strong>
                  <p>{contact.subject || '-'}</p>
                </Col>
              </Row>

              <div>
                <strong>Message:</strong>
                <Card className="mt-2">
                  <Card.Body>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{contact.message}</p>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your inquiry'}`}
                >
                  <Icon icon="mingcute:mail-send-line" className="me-2" />
                  Reply via Email
                </Button>
                {contact.phone && (
                  <Button
                    variant="outline-primary"
                    href={`tel:${contact.phone}`}
                  >
                    <Icon icon="mingcute:phone-line" className="me-2" />
                    Call
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Current Status:</strong>
                <div className="mt-2">
                  <Badge bg={getStatusBadge(contact.status).bg} className="fs-6">
                    {getStatusBadge(contact.status).text}
                  </Badge>
                </div>
              </div>

              <div className="d-grid gap-2">
                {contact.status !== 'read' && contact.status !== 'new' && (
                  <Button
                    variant="info"
                    onClick={() => handleStatusUpdate('read')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:eye-line" className="me-2" />
                    Mark as Read
                  </Button>
                )}
                {contact.status !== 'responded' && (
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate('responded')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:check-circle-line" className="me-2" />
                    Mark as Responded
                  </Button>
                )}
                {contact.status === 'responded' && (
                  <Button
                    variant="warning"
                    onClick={() => handleStatusUpdate('read')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:arrow-left-circle-line" className="me-2" />
                    Reopen
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Metadata</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Submitted:</strong>
                <p className="text-muted small">
                  {format(new Date(contact.created_at), 'MMM dd, yyyy hh:mm a')}
                </p>
              </div>

              {contact.responded_at && (
                <div>
                  <strong>Responded:</strong>
                  <p className="text-muted small">
                    {format(new Date(contact.responded_at), 'MMM dd, yyyy hh:mm a')}
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ContactDetail;
