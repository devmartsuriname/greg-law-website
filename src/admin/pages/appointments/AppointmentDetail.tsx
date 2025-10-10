import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Form, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { appointmentsService, AppointmentItem } from '../../api/appointments';
import { format } from 'date-fns';

const AppointmentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      loadAppointment();
    }
  }, [id]);

  const loadAppointment = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await appointmentsService.get(id);
      setAppointment(data);
      setNotes(data.notes || '');
    } catch (error) {
      console.error('Error loading appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!id || !appointment) return;
    
    setUpdating(true);
    try {
      await appointmentsService.updateStatus(id, status, notes);
      await loadAppointment();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'warning', text: 'Pending' },
      approved: { bg: 'success', text: 'Approved' },
      rejected: { bg: 'danger', text: 'Rejected' },
    };
    return badges[status] || badges.pending;
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

  if (!appointment) {
    return (
      <Alert variant="danger">
        Appointment not found.
        <Button variant="link" onClick={() => navigate('/admin/appointments')}>
          Back to list
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Appointment Details</h4>
          <small className="text-muted">Request #{appointment.id.slice(0, 8)}</small>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate('/admin/appointments')}>
          <Icon icon="mingcute:arrow-left-line" className="me-2" />
          Back to List
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Request Information</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Full Name:</strong>
                  <p>{appointment.full_name}</p>
                </Col>
                <Col md={6}>
                  <strong>Email:</strong>
                  <p>{appointment.email}</p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Phone:</strong>
                  <p>{appointment.phone || '-'}</p>
                </Col>
                <Col md={6}>
                  <strong>Organization:</strong>
                  <p>{appointment.organization || '-'}</p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Preferred Date:</strong>
                  <p>
                    {appointment.preferred_date
                      ? format(new Date(appointment.preferred_date), 'MMMM dd, yyyy')
                      : '-'}
                  </p>
                </Col>
                <Col md={6}>
                  <strong>Preferred Time:</strong>
                  <p>{appointment.preferred_time || '-'}</p>
                </Col>
              </Row>

              <div className="mb-3">
                <strong>Subject:</strong>
                <p>{appointment.subject}</p>
              </div>

              <div>
                <strong>Message:</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{appointment.message}</p>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Admin Notes</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Internal Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this appointment request..."
                />
              </Form.Group>
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
                  <Badge bg={getStatusBadge(appointment.status).bg} className="fs-6">
                    {getStatusBadge(appointment.status).text}
                  </Badge>
                </div>
              </div>

              <div className="d-grid gap-2">
                {appointment.status !== 'approved' && (
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:check-circle-line" className="me-2" />
                    Approve
                  </Button>
                )}
                {appointment.status !== 'pending' && (
                  <Button
                    variant="warning"
                    onClick={() => handleStatusUpdate('pending')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:time-line" className="me-2" />
                    Set as Pending
                  </Button>
                )}
                {appointment.status !== 'rejected' && (
                  <Button
                    variant="danger"
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={updating}
                  >
                    <Icon icon="mingcute:close-circle-line" className="me-2" />
                    Reject
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
                  {format(new Date(appointment.created_at), 'MMM dd, yyyy hh:mm a')}
                </p>
              </div>

              {appointment.reviewed_at && (
                <div>
                  <strong>Last Reviewed:</strong>
                  <p className="text-muted small">
                    {format(new Date(appointment.reviewed_at), 'MMM dd, yyyy hh:mm a')}
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

export default AppointmentDetail;
