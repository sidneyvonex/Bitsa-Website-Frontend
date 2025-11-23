
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../features/app/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '../features/auth/authSlice';
import { toast } from 'sonner';

type UserRole = 'Student' | 'Admin' | 'SuperAdmin';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole[];
  redirectTo?: string;
}

// Route access mapping based on user roles
const roleRouteAccess: Record<UserRole, string[]> = {
  Student: ['/dashboard', '/profile', '/events', '/blogs', '/communities', '/help'],
  Admin: ['/admin', '/dashboard', '/profile', '/events', '/blogs', '/communities', '/help'],
  SuperAdmin: ['/superadmin', '/admin', '/dashboard', '/profile', '/events', '/blogs', '/communities', '/help'],
};

export const ProtectedRoute = ({
  children,
  requiredRole,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();



  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    toast.warning('You must be logged in to access this page.');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }



  // Check if user has required role
  if (requiredRole && !requiredRole.includes(user.role)) {
    const redirectPath = user.role === 'SuperAdmin'
      ? '/superadmin'
      : user.role === 'Admin'
        ? '/admin'
        : '/dashboard';
    toast.error('You do not have permission to access this page.');
    return <Navigate to={redirectPath} replace />;
  }



  // Check if user can access the current route based on role
  const allowedRoutes = roleRouteAccess[user.role] || [];
  const isRouteAllowed = allowedRoutes.some(route =>
    location.pathname.startsWith(route)
  );



  if (requiredRole && !isRouteAllowed) {
    const redirectPath = user.role === 'SuperAdmin'
      ? '/superadmin'
      : user.role === 'Admin'
        ? '/admin'
        : '/dashboard';
    toast.error('You are not allowed to access this route.');
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};