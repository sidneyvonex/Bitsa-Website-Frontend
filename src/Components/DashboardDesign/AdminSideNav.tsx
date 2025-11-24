import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Tag,
  BarChart3,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  userRole?: 'Admin';
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
  onToggle?: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const adminNavSections: NavSection[] = [
  {
    title: 'Management',
    items: [
      { name: 'Overview', path: '/admindashboard', icon: LayoutDashboard },
      { name: 'Blogs', path: '/admindashboard/blogs', icon: FileText },
      { name: 'Events', path: '/admindashboard/events', icon: Calendar },
      { name: 'Communities', path: '/admindashboard/communities', icon: Users },
      { name: 'Projects', path: '/admindashboard/projects', icon: BarChart3 },
      { name: 'Interests', path: '/admindashboard/interests', icon: Tag },
      { name: 'Reports', path: '/admindashboard/reports', icon: FileText },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Profile', path: '/admindashboard/profile', icon: User },
      { name: 'Settings', path: '/admindashboard/settings', icon: Settings },
    ],
  },
];

export const AdminSideNav: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileMenuOpen = false,
  onMobileMenuClose,
  onToggle,
}) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email?.split('@')[0] || 'Admin';
  const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=ffffff&size=128`;

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      if (onMobileMenuClose) onMobileMenuClose();
      else if (onToggle) onToggle();
    }
  };

  const handleLogout = () => {
    if (isMobileMenuOpen) {
      if (onMobileMenuClose) onMobileMenuClose();
      else if (onToggle) onToggle();
    }
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => {
            if (onMobileMenuClose) onMobileMenuClose();
            else if (onToggle) onToggle();
          }}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 bg-[#5773da] transition-all duration-300 ease-in-out shadow-xl ${isCollapsed ? 'w-20' : 'w-64'
          } ${isMobileMenuOpen ? 'translate-x-0 z-50' : '-translate-x-full md:translate-x-0 z-30'} md:z-30`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* User profile */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              {!isCollapsed ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                    <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{userName}</p>
                    <p className="text-white/60 text-xs">{user?.role || 'Admin'}</p>
                  </div>
                </>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700 mx-auto">
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 overflow-y-auto px-0 pt-2">
            {adminNavSections.map((section, idx) => (
              <div key={section.title} className={idx > 0 ? 'mt-6' : 'mt-2'}>
                {!isCollapsed && (
                  <h3 className="px-4 mb-3 text-white/50 text-xs font-semibold uppercase tracking-wide">{section.title}</h3>
                )}

                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-6 py-3 transition-all relative ${isActive
                            ? 'bg-white/10 text-white font-medium border-l-4 border-white'
                            : 'text-white/80 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-white/70'}`} />
                            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Logout area */}
          <div className="p-4 mx-4 mb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 justify-center bg-white/5 hover:bg-white/10 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors border border-white/10"
            >
              <LogOut className="w-4 h-4 text-white/90" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
