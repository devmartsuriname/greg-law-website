import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Greg Law</title>
        <meta name="description" content="The page you are looking for does not exist" />
      </Helmet>

      <section className="error-section">
        <div className="container">
          <div className="content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <div className="text">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</div>
            <Link to="/" className="theme-btn btn-style-one">
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
