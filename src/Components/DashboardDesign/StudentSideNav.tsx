import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Globe,
  User,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { useGetCurrentUserQuery } from '../../features/api/userApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userRole: 'Student';
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const learningNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Communities', path: '/communities', icon: Users },
  { name: 'Blogs', path: '/blogs', icon: FileText },
  { name: 'Projects', path: '/projects', icon: Globe },
];

const accountNavItems: NavItem[] = [
  { name: 'Profile', path: '/dashboard/profile', icon: User },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

// Helper to get initials from user name
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  const initials = parts
    .map((part) => part[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
  return initials;
};

export const StudentSidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { data } = useGetCurrentUserQuery();
  const user = data?.data;

  const userName =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : 'BenSidney Ndungu';

  const userRole = user?.role || 'Student';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Overlay for mobile - click to close sidebar */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 text-white ${
          isCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
        } flex flex-col shadow-xl z-50 transition-transform duration-300 ease-in-out`}
        style={{ backgroundColor: '#3B5BBF' }}
      >
        {/* Close button for mobile */}
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 md:hidden text-white hover:bg-[#4A6BD4] p-2 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Profile - Lighter blue with curved bottom */}
        <div 
          className="px-4 py-4 pb-6 flex items-center gap-3 rounded-br-[60px]"
          style={{ backgroundColor: '#5B7FE8' }}
        >
          {!isCollapsed || window.innerWidth >= 768 ? (
            <>
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shrink-0"
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ color: '#4169E1' }}
                >
                  {getInitials(userName)}
                </div>
              )}
              {(!isCollapsed || window.innerWidth < 768) && (
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-semibold text-sm truncate">
                    {userName}
                  </span>
                  <span className="text-blue-100 text-xs">{userRole}</span>
                </div>
              )}
            </>
          ) : (
            <div 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-sm mx-auto"
              style={{ color: '#4169E1' }}
            >
              {getInitials(userName)}
            </div>
          )}
        </div>

        {/* Scrollable Nav Content - Darker blue */}
        <nav
          className="flex-1 overflow-y-auto px-0 pt-6"
          style={{ 
            backgroundColor: '#3B5BBF',
            scrollbarWidth: 'thin'
          }}
        >
          {/* Learning Section */}
          {(!isCollapsed || window.innerWidth < 768) && (
            <h3 className="px-4 mb-2 text-blue-100 uppercase text-xs font-semibold tracking-wide">
              Learning
            </h3>
          )}
          <ul className="space-y-1 px-2">
            {learningNavItems.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'text-white font-medium shadow-md'
                        : 'text-blue-50 hover:text-white'
                    }`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#5B7FE8' : 'transparent'
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.classList.contains('font-medium')) {
                      e.currentTarget.style.backgroundColor = '#4A6BD4';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.classList.contains('font-medium')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {(!isCollapsed || window.innerWidth < 768) && <span className="text-sm">{name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Account Section */}
          {(!isCollapsed || window.innerWidth < 768) && (
            <h3 className="px-4 mt-6 mb-2 text-blue-100 uppercase text-xs font-semibold tracking-wide">
              Account
            </h3>
          )}
          <ul className="space-y-1 px-2">
            {accountNavItems.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'text-white font-medium shadow-md'
                        : 'text-blue-50 hover:text-white'
                    }`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#5B7FE8' : 'transparent'
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.classList.contains('font-medium')) {
                      e.currentTarget.style.backgroundColor = '#4A6BD4';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.classList.contains('font-medium')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {(!isCollapsed || window.innerWidth < 768) && <span className="text-sm">{name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 m-3 mt-auto rounded-lg text-white hover:bg-[#6A8EF0] transition-colors shadow-md"
          style={{ backgroundColor: '#5B7FE8' }}
        >
          <LogOut className="w-5 h-5" />
          {(!isCollapsed || window.innerWidth < 768) && <span className="text-sm font-medium">Logout</span>}
        </button>
      </aside>
    </>
  );
};