import { Helmet } from 'react-helmet-async';
import { usePage } from '@/hooks/usePage';
import PageSection from '@/components/PageSection';

export default function Home() {
  const { page, loading, error } = usePage('home');

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="error">Page not found</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description || ''} />
      </Helmet>

      <div className="home-page">
        {page.sections
          ?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((section: any) => (
            <PageSection key={section.id} section={section} />
          ))}
      </div>
    </>
  );
}
