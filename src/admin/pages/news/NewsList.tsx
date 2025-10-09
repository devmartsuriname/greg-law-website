import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { newsService, NewsItem } from '../../api/news';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const data = await newsService.list();
    setNews(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await newsService.remove(id);
      loadNews();
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Delete ${selectedItems.length} selected items?`)) {
      for (const id of selectedItems) {
        await newsService.remove(id);
      }
      setSelectedItems([]);
      loadNews();
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">News Articles</h4>
        <Link to="/admin/news/new">
          <Button variant="primary">
            <Icon icon="mingcute:add-line" className="me-2" />
            Add New
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: '300px' }}
                />
                {selectedItems.length > 0 && (
                  <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                    Delete Selected ({selectedItems.length})
                  </Button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '50px' }}>
                          <Form.Check type="checkbox" />
                        </th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Published</th>
                        <th>Updated</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNews.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleSelect(item.id)}
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>
                            <Badge bg={item.published ? 'success' : 'warning'}>
                              {item.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td>{item.publishedAt || '-'}</td>
                          <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/news/${item.id}`)}
                            >
                              <Icon icon="mingcute:edit-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Icon icon="mingcute:delete-line" width={18} />
                            </Button>
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

export default NewsList;
