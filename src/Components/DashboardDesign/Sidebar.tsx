import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
    LayoutDashboard,
    Calendar,
    Users,
    FileText,
    Settings,
    HelpCircle,
    Shield,
    Database,
    Activity,
    Globe,
    User,
    Briefcase
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    userRole: 'Student' | 'Admin' | 'SuperAdmin';
}

interface NavItem {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
}

const studentNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Communities', path: '/communities', icon: Users },
    { name: 'Blogs', path: '/blogs', icon: FileText },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Help', path: '/help', icon: HelpCircle },
];

const adminNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Communities', path: '/admin/communities', icon: Globe },
    { name: 'Reports', path: '/admin/reports', icon: Activity },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const superAdminNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/superadmin', icon: LayoutDashboard },
    { name: 'User Management', path: '/superadmin/users', icon: Users },
    { name: 'Admin Management', path: '/superadmin/admins', icon: Shield },
    { name: 'Events', path: '/superadmin/events', icon: Calendar },
    { name: 'Content', path: '/superadmin/content', icon: FileText },
    { name: 'Database', path: '/superadmin/database', icon: Database },
    { name: 'Analytics', path: '/superadmin/analytics', icon: Activity },
    { name: 'System Settings', path: '/superadmin/settings', icon: Settings },
];

export const Sidebar = ({ isCollapsed, userRole }: SidebarProps) => {
    const user = useAppSelector(selectCurrentUser);

    const getNavItems = () => {
        switch (userRole) {
            case 'Student':
                return studentNavItems;
            case 'Admin':
                return adminNavItems;
            case 'SuperAdmin':
                return superAdminNavItems;
            default:
                return studentNavItems;
        }
    };

    const navItems = getNavItems();

    // Get user data from Redux
    const userName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.email?.split('@')[0] || 'Student';

    const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=d1d5db&color=1f2937&size=128`;

    return (
        <aside
            className={`fixed left-0 top-16 bottom-0 bg-[#5773da] transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex flex-col h-full">
                {/* User Profile - Light blue/gray background */}
                {!isCollapsed && (
                    <div className="px-4 py-4 bg-[#e8ecf4]">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-gray-900 font-semibold text-sm">{userName}</p>
                                <p className="text-gray-600 text-xs">{user?.role || 'Student'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation - Constant blue background */}
                <nav className="flex-1 overflow-y-auto bg-[#5773da] pt-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-white/20 text-white font-medium'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-white/80'
                                                    }`}
                                            />
                                            {!isCollapsed && (
                                                <span className="text-sm">{item.name}</span>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Upgrade Section */}
                {!isCollapsed && userRole === 'Student' && (
                    <div className="p-4 m-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                        <p className="text-white text-xs mb-3 leading-relaxed">
                            Upgrade to <span className="font-bold">PRO</span> for<br />
                            more resources
                        </p>
                        <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors">
                            Upgrade
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};
