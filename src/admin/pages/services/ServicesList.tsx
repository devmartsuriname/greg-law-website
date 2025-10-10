import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Table, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { servicesService, ServiceItem } from '../../api/services';

const ServicesList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    loadServices();
  }, [categoryFilter]);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await servicesService.list(categoryFilter || undefined);
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesService.remove(id);
        loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
    setDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    
    if (dragIndex === dropIndex) return;

    const newServices = [...services];
    const draggedItem = newServices[dragIndex];
    newServices.splice(dragIndex, 1);
    newServices.splice(dropIndex, 0, draggedItem);

    const reorderedServices = newServices.map((service, index) => ({
      id: service.id,
      display_order: index,
    }));

    setServices(newServices);
    setDragging(false);

    try {
      await servicesService.reorder(reorderedServices);
    } catch (error) {
      console.error('Error reordering services:', error);
      loadServices();
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await servicesService.update(id, { featured: !featured });
      loadServices();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      await servicesService.update(id, { published: !published });
      loadServices();
    } catch (error) {
      console.error('Error toggling published:', error);
    }
  };

  const categories = Array.from(new Set(services.map(s => s.category).filter(Boolean)));

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Services Management</h4>
        <Link to="/admin/services/new">
          <Button variant="primary">
            <Icon icon="mingcute:add-line" className="me-2" />
            Add New Service
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ maxWidth: '250px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : services.length === 0 ? (
                <div className="text-center py-5">
                  <p>No services found. Create your first service!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="table-centered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '50px' }}>Order</th>
                        <th>Icon</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th style={{ width: '150px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr
                          key={service.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          style={{ cursor: 'move', opacity: dragging ? 0.5 : 1 }}
                        >
                          <td>
                            <Icon icon="mingcute:menu-line" width={20} className="text-muted" />
                          </td>
                          <td>
                            {service.icon && (
                              <Icon icon={service.icon} width={24} />
                            )}
                          </td>
                          <td>
                            <strong>{service.title}</strong>
                            {service.description && (
                              <div className="text-muted small" style={{ maxWidth: '300px' }}>
                                {service.description.substring(0, 80)}
                                {service.description.length > 80 && '...'}
                              </div>
                            )}
                          </td>
                          <td>
                            {service.category && (
                              <Badge bg="info">{service.category}</Badge>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => handleToggleFeatured(service.id, service.featured)}
                            >
                              <Icon
                                icon={service.featured ? 'mingcute:star-fill' : 'mingcute:star-line'}
                                width={20}
                                className={service.featured ? 'text-warning' : 'text-muted'}
                              />
                            </Button>
                          </td>
                          <td>
                            <Badge
                              bg={service.published ? 'success' : 'warning'}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleTogglePublished(service.id, service.published)}
                            >
                              {service.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/services/${service.id}`)}
                            >
                              <Icon icon="mingcute:edit-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(service.id)}
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

export default ServicesList;
