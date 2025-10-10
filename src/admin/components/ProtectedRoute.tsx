import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type AppRole = 'admin' | 'editor' | 'viewer';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
}

const roleHierarchy: Record<AppRole, number> = {
  admin: 3,
  editor: 2,
  viewer: 1,
};

function hasPermission(userRole: AppRole | null, requiredRole?: AppRole): boolean {
  if (!requiredRole) return true;
  if (!userRole) return false;
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasPermission(role, requiredRole)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You don't have permission to access this page.</p>
          <hr />
          <p className="mb-0">
            Required role: <strong>{requiredRole}</strong> | Your role: <strong>{role || 'none'}</strong>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
