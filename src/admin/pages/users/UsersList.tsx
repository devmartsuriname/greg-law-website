import { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usersService, User } from '../../api/users';
import { useAuth } from '../../hooks/useAuth';

const UsersList = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersService.list();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await usersService.remove(id);
      await loadUsers();
    } catch (err: any) {
      alert('Error deleting user: ' + err.message);
    }
  };

  return (
    <>
      <div className="page-title-box mb-4 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Users</h4>
        {role === 'admin' && (
          <Button variant="primary" onClick={() => navigate('/admin/users/new')}>
            <i className="mdi mdi-plus me-1"></i> Add User
          </Button>
        )}
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  No users found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {user.avatar_url && (
                                <img 
                                  src={user.avatar_url} 
                                  alt={user.full_name}
                                  className="rounded-circle me-2"
                                  style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                />
                              )}
                              <span>{user.full_name || '-'}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <Badge 
                              bg={user.role === 'admin' ? 'danger' : user.role === 'editor' ? 'primary' : 'secondary'}
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td>{user.last_login ? new Date(user.last_login).toLocaleString() : '-'}</td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-primary p-0 me-2"
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                              title="View Details"
                            >
                              <i className="mdi mdi-eye"></i>
                            </Button>
                            {role === 'admin' && (
                              <>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="text-info p-0 me-2"
                                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                                  title="Edit User"
                                >
                                  <i className="mdi mdi-pencil"></i>
                                </Button>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="text-danger p-0"
                                  onClick={() => handleDelete(user.id)}
                                  title="Delete User"
                                >
                                  <i className="mdi mdi-delete"></i>
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UsersList;
