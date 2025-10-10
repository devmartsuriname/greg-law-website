import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { pagesService, Page } from '../../api/pages';
import { useToast } from '../../../hooks/use-toast';

const PagesList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await pagesService.getAll();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await pagesService.togglePublish(id, !currentStatus);
      toast({
        title: 'Success',
        description: `Page ${!currentStatus ? 'published' : 'unpublished'} successfully`,
      });
      fetchPages();
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast({
        title: 'Error',
        description: 'Failed to update page status',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      await pagesService.delete(id);
      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete page',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading pages...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Pages Management</h1>
          <p className="text-muted">Manage your website pages and content sections</p>
        </div>
        <Link to="/admin/pages/new">
          <Button variant="primary">
            <Icon icon="mingcute:add-line" className="me-1" />
            Create Page
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Body>
          {pages.length === 0 ? (
            <div className="text-center py-5">
              <Icon icon="mingcute:file-line" style={{ fontSize: '4rem', opacity: 0.3 }} />
              <p className="text-muted mt-3">No pages found. Create your first page!</p>
              <Link to="/admin/pages/new">
                <Button variant="primary">Create Page</Button>
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Sections</th>
                    <th>Updated</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td>
                        <strong>{page.title}</strong>
                        {page.meta_title && (
                          <small className="d-block text-muted">{page.meta_title}</small>
                        )}
                      </td>
                      <td>
                        <code>/{page.slug}</code>
                      </td>
                      <td>
                        <Badge bg={page.published ? 'success' : 'secondary'}>
                          {page.published ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg="info">{page.sections?.length || 0} sections</Badge>
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(page.updated_at).toLocaleDateString()}
                        </small>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/admin/pages/${page.id}`} className="btn btn-outline-primary">
                            <Icon icon="mingcute:edit-line" />
                          </Link>
                          <Button
                            variant={page.published ? 'outline-warning' : 'outline-success'}
                            onClick={() => handleTogglePublish(page.id, page.published)}
                            title={page.published ? 'Unpublish' : 'Publish'}
                          >
                            <Icon icon={page.published ? 'mingcute:eye-close-line' : 'mingcute:eye-line'} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(page.id)}
                            title="Delete"
                          >
                            <Icon icon="mingcute:delete-line" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PagesList;
