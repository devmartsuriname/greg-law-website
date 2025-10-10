import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../admin/components/ProtectedRoute';
import { AuthProvider } from '../admin/hooks/useAuth';

// Lazy load admin pages
const AdminLogin = lazy(() => import('../admin/pages/Login'));
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
const MenusList = lazy(() => import('../admin/pages/menus/MenusList'));
const Settings = lazy(() => import('../admin/pages/settings/Settings'));

export const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/new" element={<NewsForm />} />
          <Route path="news/:id" element={<NewsForm />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectsForm />} />
          <Route path="projects/:id" element={<ProjectsForm />} />
          <Route path="speeches" element={<SpeechesList />} />
          <Route path="speeches/new" element={<SpeechesForm />} />
          <Route path="speeches/:id" element={<SpeechesForm />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="users" element={<UsersList />} />
          <Route path="menus" element={<MenusList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
