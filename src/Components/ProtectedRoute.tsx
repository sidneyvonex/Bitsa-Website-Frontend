import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '../features/auth/authSlice';

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
  redirectTo = '/signin'
}: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if email is verified (if backend provides this info)
  // Note: Backend should block unverified logins, but this provides an extra client-side check
  // Uncomment if backend returns isEmailVerified field and you want to enforce it client-side:
  // if (user.isEmailVerified === false) {
  //   return <Navigate to="/verify-email" state={{ from: location }} replace />;
  // }

  // Check if user has required role
  if (requiredRole && !requiredRole.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'SuperAdmin'
      ? '/superadmin'
      : user.role === 'Admin'
        ? '/admin'
        : '/dashboard';
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
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
