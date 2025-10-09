import { useEffect, useState } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { usersService, User } from '../../api/users';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await usersService.list();
    setUsers(data);
    setLoading(false);
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">Users</h4>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">Loading...</div>
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
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td><Badge bg="primary">{user.role}</Badge></td>
                          <td><Badge bg={user.status === 'active' ? 'success' : 'secondary'}>{user.status}</Badge></td>
                          <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</td>
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
