import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { menusService, MenuItem } from '../../api/menus';

const MenusList = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    const data = await menusService.list();
    setMenus(data);
    setLoading(false);
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">Menu Management</h4>
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
                        <th>Label</th>
                        <th>URL</th>
                        <th>Order</th>
                        <th>Published</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menus.map((item) => (
                        <tr key={item.id}>
                          <td>{item.label}</td>
                          <td>{item.url}</td>
                          <td>{item.order}</td>
                          <td>{item.published ? '✓' : '✗'}</td>
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

export default MenusList;
