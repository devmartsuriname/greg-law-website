import { Helmet } from "react-helmet-async";
import { usePage } from "@/hooks/usePages";
import { PageSection } from "@/components/PageSection";

export default function Home() {
  const { page, loading, error } = usePage('home');

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h3>Page not found</h3>
          <p>The homepage content is not yet available. Please configure it in the admin panel.</p>
        </div>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description || ''} />
      </Helmet>

      {sortedSections.map((section) => (
        <PageSection key={section.id} section={section} />
      ))}
    </>
  );
}
