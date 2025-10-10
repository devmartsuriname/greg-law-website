import { Helmet } from 'react-helmet-async';
import { PageSection } from '@/components/PageSection';
import { usePage } from '@/hooks/usePages';

export default function HomeDynamic() {
  const { page, loading, error } = usePage('home');

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dynamic homepage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center py-5 mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Page</h4>
          <p>{error.message}</p>
          <hr />
          <p className="mb-0">Please check your database connection or contact support.</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container">
        <div className="alert alert-warning text-center py-5 mt-5" role="alert">
          <h4 className="alert-heading">Page Not Found</h4>
          <p>The homepage has not been configured yet.</p>
          <hr />
          <p className="mb-0">Please create a page with slug "home" in the admin panel.</p>
        </div>
      </div>
    );
  }

  // Sort sections by order property
  const sortedSections = [...(page.sections || [])].sort((a, b) => a.order - b.order);

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title || 'Home'}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </Helmet>

      {sortedSections.map((section) => (
        <PageSection key={section.id} section={section} />
      ))}
    </>
  );
}
