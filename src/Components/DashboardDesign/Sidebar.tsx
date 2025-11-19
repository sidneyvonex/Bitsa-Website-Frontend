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
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'My Projects', path: '/dashboard/projects', icon: Briefcase },
    { name: 'My Events', path: '/dashboard/events', icon: Calendar },
    { name: 'Blogs', path: '/dashboard/blogs', icon: FileText },
    { name: 'Communities', path: '/communities', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
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

    // Use profile picture from Redux or generate avatar
    const userAvatar = user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=5773da&color=fff&size=128`;

    return (
        <aside
            className={`fixed left-0 top-16 bottom-0 bg-[#5773da] transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex flex-col h-full overflow-hidden">
                {/* Curved Profile Section */}
                {!isCollapsed && (
                    <div className="relative -mx-4 mb-6">
                        {/* Curved container with rounded bottom */}
                        <div className="bg-gradient-to-b from-[#4a63c4] via-[#5773da] to-[#5773da] rounded-b-3xl pt-6 pb-8 px-6">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg mb-3">
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-white font-bold text-base">{userName}</p>
                                <p className="text-white/80 text-xs mt-1">{user?.role || 'Student'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Sections */}
                <nav className="flex-1 overflow-y-auto px-4 pb-4">
                    {/* Learning Section */}
                    <div className="mb-6">
                        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
                            Learning
                        </h3>
                        <ul className="space-y-1">
                            {navItems.slice(0, 5).map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-white text-[#5773da] font-semibold shadow-md'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#5773da]' : 'text-white/80'
                                                        }`}
                                                />
                                                {!isCollapsed && (
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help & Support Section */}
                    <div className="mb-6">
                        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
                            Help & Support
                        </h3>
                        <ul className="space-y-1">
                            {navItems.slice(-3).map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-white text-[#5773da] font-semibold shadow-md'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#5773da]' : 'text-white/80'
                                                        }`}
                                                />
                                                {!isCollapsed && (
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Upgrade Section */}
                {!isCollapsed && userRole === 'Student' && (
                    <div className="p-4 mx-4 mb-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/30">
                        <p className="text-white text-xs mb-3 leading-relaxed font-medium">
                            Upgrade to <span className="font-bold">PRO</span> for<br />
                            more resources
                        </p>
                        <button className="w-full bg-white text-[#5773da] text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-white/90 transition-all shadow-md">
                            Upgrade
                        </button>
                    </div>
                )}

                {/* Collapsed state - show avatar only */}
                {isCollapsed && (
                    <div className="flex flex-col items-center py-4 px-2 mb-4">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
