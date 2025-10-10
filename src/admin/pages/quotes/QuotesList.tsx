import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { quotesService, QuoteItem } from '../../api/quotes';

const QuotesList = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await quotesService.list();
      setQuotes(data);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      try {
        await quotesService.remove(id);
        loadQuotes();
      } catch (error) {
        console.error('Error deleting quote:', error);
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

    const newQuotes = [...quotes];
    const draggedItem = newQuotes[dragIndex];
    newQuotes.splice(dragIndex, 1);
    newQuotes.splice(dropIndex, 0, draggedItem);

    // Update display_order
    const reorderedQuotes = newQuotes.map((quote, index) => ({
      id: quote.id,
      display_order: index,
    }));

    setQuotes(newQuotes);
    setDragging(false);

    try {
      await quotesService.reorder(reorderedQuotes);
    } catch (error) {
      console.error('Error reordering quotes:', error);
      loadQuotes();
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await quotesService.update(id, { featured: !featured });
      loadQuotes();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      await quotesService.update(id, { published: !published });
      loadQuotes();
    } catch (error) {
      console.error('Error toggling published:', error);
    }
  };

  return (
    <>
      <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Quotes Management</h4>
        <Link to="/admin/quotes/new">
          <Button variant="primary">
            <Icon icon="mingcute:add-line" className="me-2" />
            Add New Quote
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : quotes.length === 0 ? (
                <div className="text-center py-5">
                  <p>No quotes found. Create your first quote!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="table-centered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '50px' }}>Order</th>
                        <th>Quote Text</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th style={{ width: '150px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote, index) => (
                        <tr
                          key={quote.id}
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
                            <div style={{ maxWidth: '300px' }}>
                              {quote.quote_text.substring(0, 100)}
                              {quote.quote_text.length > 100 && '...'}
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{quote.author_name}</strong>
                              <br />
                              <small className="text-muted">{quote.author_title}</small>
                            </div>
                          </td>
                          <td>{quote.date_spoken || '-'}</td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => handleToggleFeatured(quote.id, quote.featured)}
                            >
                              <Icon
                                icon={quote.featured ? 'mingcute:star-fill' : 'mingcute:star-line'}
                                width={20}
                                className={quote.featured ? 'text-warning' : 'text-muted'}
                              />
                            </Button>
                          </td>
                          <td>
                            <Badge
                              bg={quote.published ? 'success' : 'warning'}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleTogglePublished(quote.id, quote.published)}
                            >
                              {quote.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon"
                              onClick={() => navigate(`/admin/quotes/${quote.id}`)}
                            >
                              <Icon icon="mingcute:edit-line" width={18} />
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="action-icon text-danger"
                              onClick={() => handleDelete(quote.id)}
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

export default QuotesList;
