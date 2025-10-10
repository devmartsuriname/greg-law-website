import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Badge, Table, Form, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { appointmentsService, AppointmentItem } from '../../api/appointments';
import { format } from 'date-fns';

const AppointmentsList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAppointments();
    }, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, searchTerm]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await appointmentsService.list(statusFilter || undefined, searchTerm || undefined);
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this appointment request?')) {
      try {
        await appointmentsService.remove(id);
        loadAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
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

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Appointment Requests</h4>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Total</h6>
                  <h3 className="mb-0">{stats.total}</h3>
                </div>
                <Icon icon="mingcute:calendar-line" width={40} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Pending</h6>
                  <h3 className="mb-0">{stats.pending}</h3>
                </div>
                <Icon icon="mingcute:time-line" width={40} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Approved</h6>
                  <h3 className="mb-0">{stats.approved}</h3>
                </div>
                <Icon icon="mingcute:check-circle-line" width={40} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Rejected</h6>
                  <h3 className="mb-0">{stats.rejected}</h3>
                </div>
                <Icon icon="mingcute:close-circle-line" width={40} className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3 gap-2">
                <Form.Control
                  type="search"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: '400px' }}
                />
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ maxWidth: '200px' }}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </div>

              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-5">
                  <Icon icon="mingcute:calendar-line" width={60} className="text-muted mb-3" />
                  <p className="text-muted">No appointment requests found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="table-centered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Applicant</th>
                        <th>Subject</th>
                        <th>Preferred Date</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>
                            <div>
                              <strong>{appointment.full_name}</strong>
                              <br />
                              <small className="text-muted">{appointment.email}</small>
                              {appointment.organization && (
                                <>
                                  <br />
                                  <small className="text-muted">{appointment.organization}</small>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: '250px' }}>
                              {appointment.subject}
                            </div>
                          </td>
                          <td>
                            {appointment.preferred_date ? (
                              <div>
                                {format(new Date(appointment.preferred_date), 'MMM dd, yyyy')}
                                {appointment.preferred_time && (
                                  <>
                                    <br />
                                    <small className="text-muted">{appointment.preferred_time}</small>
                                  </>
                                )}
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>
                            <Badge bg={getStatusBadge(appointment.status).bg}>
                              {getStatusBadge(appointment.status).text}
                            </Badge>
                          </td>
                          <td>{format(new Date(appointment.created_at), 'MMM dd, yyyy')}</td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/appointments/${appointment.id}`)}
                            >
                              <Icon icon="mingcute:eye-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(appointment.id)}
                            >
                              <Icon icon="mingcute:delete-line" width={18} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentsList;
