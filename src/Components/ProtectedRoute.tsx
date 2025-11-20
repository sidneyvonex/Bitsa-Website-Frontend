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

  console.log('🛡️ PROTECTED ROUTE CHECK:', {
    path: location.pathname,
    authenticated: isAuthenticated,
    userRole: user?.role,
    requiredRole: requiredRole
  });

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    console.log('❌ Not authenticated, redirecting to signin');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  console.log('✅ User authenticated:', user.role);

  // Check if user has required role
  if (requiredRole && !requiredRole.includes(user.role)) {
    console.log('❌ Role check failed. User:', user.role, 'Required:', requiredRole);
    const redirectPath = user.role === 'SuperAdmin'
      ? '/superadmin'
      : user.role === 'Admin'
        ? '/admin'
        : '/dashboard';
    console.log('🔄 Redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log('✅ Role check passed');

  // Check if user can access the current route based on role
  const allowedRoutes = roleRouteAccess[user.role] || [];
  const isRouteAllowed = allowedRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  console.log('🔍 Route access check:', {
    allowedRoutes,
    currentPath: location.pathname,
    isAllowed: isRouteAllowed
  });

  if (requiredRole && !isRouteAllowed) {
    console.log('❌ Route not in allowed list, redirecting');
    const redirectPath = user.role === 'SuperAdmin'
      ? '/superadmin'
      : user.role === 'Admin'
        ? '/admin'
        : '/dashboard';
    console.log('🔄 Redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log('✅ Access granted to:', location.pathname);
  return <>{children}</>;
};
