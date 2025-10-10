import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../admin/components/ProtectedRoute';
import { AuthProvider } from '../admin/hooks/useAuth';

// Lazy load admin pages
const AdminLogin = lazy(() => import('../admin/pages/Login'));
const AdminSignUp = lazy(() => import('../admin/pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('../admin/pages/auth/ForgotPassword'));
const AdminLayout = lazy(() => import('../admin/layouts/AdminLayout'));
const Dashboard = lazy(() => import('../admin/pages/Dashboard'));
const NewsList = lazy(() => import('../admin/pages/news/NewsList'));
const NewsForm = lazy(() => import('../admin/pages/news/NewsForm'));
const ProjectsList = lazy(() => import('../admin/pages/projects/ProjectsList'));
const ProjectsForm = lazy(() => import('../admin/pages/projects/ProjectsForm'));
const SpeechesList = lazy(() => import('../admin/pages/speeches/SpeechesList'));
const SpeechesForm = lazy(() => import('../admin/pages/speeches/SpeechesForm'));
const MediaLibrary = lazy(() => import('../admin/pages/media/MediaLibrary'));
const UsersList = lazy(() => import('../admin/pages/users/UsersList'));
const UsersForm = lazy(() => import('../admin/pages/users/UsersForm'));
const UserDetail = lazy(() => import('../admin/pages/users/UserDetail'));
const MenusList = lazy(() => import('../admin/pages/menus/MenusList'));
const Settings = lazy(() => import('../admin/pages/settings/Settings'));
const PagesList = lazy(() => import('../admin/pages/pages/PagesList'));
const PagesForm = lazy(() => import('../admin/pages/pages/PagesForm'));
const QuotesList = lazy(() => import('../admin/pages/quotes/QuotesList'));
const QuotesForm = lazy(() => import('../admin/pages/quotes/QuotesForm'));
const ServicesList = lazy(() => import('../admin/pages/services/ServicesList'));
const ServicesForm = lazy(() => import('../admin/pages/services/ServicesForm'));
const AppointmentsList = lazy(() => import('../admin/pages/appointments/AppointmentsList'));
const AppointmentDetail = lazy(() => import('../admin/pages/appointments/AppointmentDetail'));
const ContactsList = lazy(() => import('../admin/pages/contacts/ContactsList'));
const ContactDetail = lazy(() => import('../admin/pages/contacts/ContactDetail'));
const YouTubeSync = lazy(() => import('../admin/pages/media/YouTubeSync'));

export const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="sign-up" element={<AdminSignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/new" element={<PagesForm />} />
          <Route path="pages/:id" element={<PagesForm />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/new" element={<NewsForm />} />
          <Route path="news/:id" element={<NewsForm />} />
          <Route path="quotes" element={<QuotesList />} />
          <Route path="quotes/new" element={<QuotesForm />} />
          <Route path="quotes/:id" element={<QuotesForm />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/new" element={<ServicesForm />} />
          <Route path="services/:id" element={<ServicesForm />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="appointments/:id" element={<AppointmentDetail />} />
          <Route path="contacts" element={<ContactsList />} />
          <Route path="contacts/:id" element={<ContactDetail />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectsForm />} />
          <Route path="projects/:id" element={<ProjectsForm />} />
          <Route path="speeches" element={<SpeechesList />} />
          <Route path="speeches/new" element={<SpeechesForm />} />
          <Route path="speeches/:id" element={<SpeechesForm />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="media/youtube-sync" element={<YouTubeSync />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/new" element={<UsersForm />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="users/:id/edit" element={<UsersForm />} />
          <Route path="menus" element={<MenusList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
