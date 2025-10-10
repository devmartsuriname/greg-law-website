import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { usersService, User } from '../../api/users';
import { useAuth } from '../../hooks/useAuth';

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { role } = useAuth();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id]);

  const loadUser = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersService.get(userId);
      if (data) {
        setUser(data);
      } else {
        setError('User not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await usersService.remove(id);
      navigate('/admin/users');
    } catch (err: any) {
      alert('Error deleting user: ' + err.message);
    }
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

  if (error || !user) {
    return (
      <Alert variant="danger">
        {error || 'User not found'}
      </Alert>
    );
  }

  return (
    <>
      <div className="page-title-box mb-4 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">User Details</h4>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/admin/users')}>
            <i className="mdi mdi-arrow-left me-1"></i> Back
          </Button>
          {role === 'admin' && (
            <>
              <Button 
                variant="primary" 
                onClick={() => navigate(`/admin/users/${id}/edit`)}
              >
                <i className="mdi mdi-pencil me-1"></i> Edit
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
              >
                <i className="mdi mdi-delete me-1"></i> Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.full_name}
                    className="rounded-circle me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '80px', height: '80px', fontSize: '32px' }}
                  >
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="mb-1">{user.full_name}</h4>
                  <Badge 
                    bg={user.role === 'admin' ? 'danger' : user.role === 'editor' ? 'primary' : 'secondary'}
                    className="me-2"
                  >
                    {user.role}
                  </Badge>
                  <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
              </div>

              <hr />

              <Row className="mb-3">
                <Col sm={4} className="fw-medium">Email:</Col>
                <Col sm={8}>{user.email}</Col>
              </Row>

              {user.phone && (
                <Row className="mb-3">
                  <Col sm={4} className="fw-medium">Phone:</Col>
                  <Col sm={8}>{user.phone}</Col>
                </Row>
              )}

              <Row className="mb-3">
                <Col sm={4} className="fw-medium">Created:</Col>
                <Col sm={8}>{new Date(user.created_at).toLocaleString()}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="fw-medium">Last Login:</Col>
                <Col sm={8}>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="fw-medium">User ID:</Col>
                <Col sm={8}>
                  <code className="text-muted">{user.id}</code>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <h5 className="card-title mb-3">Quick Actions</h5>
              <div className="d-grid gap-2">
                {role === 'admin' && (
                  <>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/admin/users/${id}/edit`)}
                    >
                      <i className="mdi mdi-pencil me-1"></i> Edit Profile
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={handleDelete}
                    >
                      <i className="mdi mdi-delete me-1"></i> Delete User
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <h5 className="card-title mb-3">Permissions</h5>
              {user.role === 'admin' && (
                <ul className="mb-0">
                  <li>Full system access</li>
                  <li>User management</li>
                  <li>Content management</li>
                  <li>Settings configuration</li>
                </ul>
              )}
              {user.role === 'editor' && (
                <ul className="mb-0">
                  <li>Content management</li>
                  <li>Media uploads</li>
                  <li>News & projects</li>
                  <li>Limited settings</li>
                </ul>
              )}
              {user.role === 'viewer' && (
                <ul className="mb-0">
                  <li>Read-only access</li>
                  <li>View content</li>
                  <li>View reports</li>
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserDetail;
