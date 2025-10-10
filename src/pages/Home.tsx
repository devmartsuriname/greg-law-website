import { Helmet } from 'react-helmet-async';
import { usePage } from '@/hooks/usePages';
import { PageSection } from '@/components/PageSection';

export default function Home() {
  const { page, loading, error } = usePage('home');

  if (loading) {
    return (
      <div className="preloader-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Page</h4>
          <p>Unable to load the homepage content. Please try again later.</p>
          <hr />
          <p className="mb-0 text-muted">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Page Not Found</h4>
          <p>The homepage has not been configured yet. Please contact the administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title || 'Home'}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </Helmet>

      {page.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <PageSection key={section.id} section={section} />
        ))}
    </>
  );
}
