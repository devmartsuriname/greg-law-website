import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import { AdminRoutes } from './router/admin';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServicesDetail = lazy(() => import('./pages/ServicesDetail'));
const PortfolioSingle = lazy(() => import('./pages/PortfolioSingle'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogSingle = lazy(() => import('./pages/BlogSingle'));
const Contact = lazy(() => import('./pages/Contact'));
const Appointments = lazy(() => import('./pages/Appointments'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServicesDetail />} />
            <Route path="portfolio/:id" element={<PortfolioSingle />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogSingle />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
