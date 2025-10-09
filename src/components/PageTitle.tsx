import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface PageTitleProps {
  title: string;
  breadcrumbs?: { label: string; path?: string }[];
  backgroundImage?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default function PageTitle({
  title,
  breadcrumbs = [],
  backgroundImage = '/images/background/4.jpg',
  metaTitle,
  metaDescription,
}: PageTitleProps) {
  return (
    <>
      <Helmet>
        <title>{metaTitle || `${title} | Greg Law`}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
      </Helmet>
      <section className="page-title" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container">
          <div className="content">
            <h1>{title}</h1>
            <ul className="page-breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index}>
                  {crumb.path ? <Link to={crumb.path}>{crumb.label}</Link> : crumb.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
