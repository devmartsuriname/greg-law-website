import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { usersService, User } from '../../api/users';
import { useAuth } from '../../hooks/useAuth';

const UsersForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { role } = useAuth();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    if (isEdit && id) {
      loadUser(id);
    }
  }, [id, isEdit]);

  const loadUser = async (userId: string) => {
    try {
      setLoading(true);
      const user = await usersService.get(userId);
      if (user) {
        setFormData({
          email: user.email,
          password: '',
          full_name: user.full_name,
          phone: user.phone || '',
          role: user.role,
          status: user.status,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.full_name) {
      setError('Email and name are required');
      return;
    }

    if (!isEdit && !formData.password) {
      setError('Password is required for new users');
      return;
    }

    try {
      setLoading(true);

      if (isEdit && id) {
        await usersService.update(id, {
          full_name: formData.full_name,
          phone: formData.phone,
          role: formData.role,
          status: formData.status,
        } as Partial<User>);
        setSuccess('User updated successfully');
      } else {
        await usersService.create(
          formData.email,
          formData.password,
          formData.full_name,
          formData.role
        );
        setSuccess('User created successfully');
      }

      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (role !== 'admin') {
    return (
      <div className="alert alert-danger">
        You don't have permission to access this page.
      </div>
    );
  }

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">{isEdit ? 'Edit User' : 'Create New User'}</h4>
      </div>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isEdit}
                    required
                  />
                  {isEdit && (
                    <Form.Text className="text-muted">
                      Email cannot be changed after user creation
                    </Form.Text>
                  )}
                </Form.Group>

                {!isEdit && (
                  <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                    <Form.Text className="text-muted">
                      Minimum 6 characters
                    </Form.Text>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role *</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                    required
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Admin: Full access | Editor: Can manage content | Viewer: Read-only
                  </Form.Text>
                </Form.Group>

                {isEdit && (
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {isEdit ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>{isEdit ? 'Update User' : 'Create User'}</>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => navigate('/admin/users')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UsersForm;
