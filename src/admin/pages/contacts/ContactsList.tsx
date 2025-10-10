import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Badge, Table, Form, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { contactsService, ContactItem } from '../../api/contacts';
import { format } from 'date-fns';

const ContactsList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      loadContacts();
    }, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, searchTerm]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await contactsService.list(statusFilter || undefined, searchTerm || undefined);
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await contactsService.remove(id);
        loadContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
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

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    responded: contacts.filter(c => c.status === 'responded').length,
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Contact Submissions</h4>
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
                <Icon icon="mingcute:mail-line" width={40} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">New</h6>
                  <h3 className="mb-0">{stats.new}</h3>
                </div>
                <Icon icon="mingcute:notification-line" width={40} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Read</h6>
                  <h3 className="mb-0">{stats.read}</h3>
                </div>
                <Icon icon="mingcute:eye-line" width={40} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-2">Responded</h6>
                  <h3 className="mb-0">{stats.responded}</h3>
                </div>
                <Icon icon="mingcute:check-circle-line" width={40} className="text-success" />
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
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                </Form.Select>
              </div>

              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-5">
                  <Icon icon="mingcute:mail-line" width={60} className="text-muted mb-3" />
                  <p className="text-muted">No contact submissions found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="table-centered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Contact</th>
                        <th>Subject</th>
                        <th>Message Preview</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id} style={{ fontWeight: contact.status === 'new' ? 'bold' : 'normal' }}>
                          <td>
                            <div>
                              <strong>{contact.name}</strong>
                              <br />
                              <small className="text-muted">{contact.email}</small>
                              {contact.phone && (
                                <>
                                  <br />
                                  <small className="text-muted">{contact.phone}</small>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: '200px' }}>
                              {contact.subject || '-'}
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: '300px' }}>
                              {contact.message.substring(0, 100)}
                              {contact.message.length > 100 && '...'}
                            </div>
                          </td>
                          <td>
                            <Badge bg={getStatusBadge(contact.status).bg}>
                              {getStatusBadge(contact.status).text}
                            </Badge>
                          </td>
                          <td>{format(new Date(contact.created_at), 'MMM dd, yyyy')}</td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/contacts/${contact.id}`)}
                            >
                              <Icon icon="mingcute:eye-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(contact.id)}
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

export default ContactsList;
