import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../features/app/hooks';
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
    User
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

interface NavSection {
    title: string;
    items: NavItem[];
}

const studentNavSections: NavSection[] = [
    {
        title: 'Learning',
        items: [
            { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { name: 'Events', path: '/events', icon: Calendar },
            { name: 'Communities', path: '/communities', icon: Users },
            { name: 'Blogs', path: '/blogs', icon: FileText },
            { name: 'Projects', path: '/projects', icon: Globe },
        ]
    },
    {
        title: 'Account',
        items: [
            { name: 'Profile', path: '/dashboard/profile', icon: User },
            { name: 'Settings', path: '/dashboard/settings', icon: Settings },
        ]
    },
    {
        title: 'Help & Support',
        items: [
            { name: 'Help', path: '/help', icon: HelpCircle },
        ]
    }
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

    // Get user data from Redux
    const userName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.email?.split('@')[0] || 'Student';

    const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=ffffff&size=128`;

    // Render for Student with sections
    const renderStudentNav = () => (
        <>
            {/* User Profile - Matching Design */}
            <div className="px-4 py-4">
                <div className="flex items-center gap-3">
                    {!isCollapsed && (
                        <>
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{userName}</p>
                                <p className="text-white/60 text-xs">{user?.role || 'Student'}</p>
                            </div>
                        </>
                    )}
                    {isCollapsed && (
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700 mx-auto">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Sections - Matching Design */}
            <nav className="flex-1 overflow-y-auto">
                {studentNavSections.map((section, sectionIdx) => (
                    <div key={section.title} className={sectionIdx > 0 ? 'mt-6' : 'mt-2'}>
                        {!isCollapsed && (
                            <h3 className="px-4 mb-3 text-white/50 text-xs font-semibold uppercase tracking-wide">
                                {section.title}
                            </h3>
                        )}
                        <ul className="space-y-0.5">
                            {section.items.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-6 py-3 transition-all relative ${isActive
                                                ? 'bg-white/10 text-white font-medium border-l-4 border-white'
                                                : 'text-white/80 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-white/70'
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
                ))}
            </nav>

            {/* Upgrade Section - Matching Design */}
            {!isCollapsed && (
                <div className="p-4 mx-4 mb-4 bg-[#4861c9] rounded-xl border border-white/10">
                    <p className="text-white text-xs mb-3 leading-relaxed">
                        Upgrade to <span className="font-bold">PRO</span> for<br />
                        more resources
                    </p>
                    <button className="w-full bg-white hover:bg-gray-100 text-[#5773da] text-sm font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
                        Upgrade
                    </button>
                </div>
            )}
        </>
    );

    // Render for Admin/SuperAdmin with simple list
    const renderAdminNav = () => {
        const navItems = userRole === 'Admin' ? adminNavItems : superAdminNavItems;

        return (
            <>
                {/* User Profile - Matching Design */}
                <div className="px-4 py-4">
                    <div className="flex items-center gap-3">
                        {!isCollapsed && (
                            <>
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{userName}</p>
                                    <p className="text-white/60 text-xs">{user?.role || userRole}</p>
                                </div>
                            </>
                        )}
                        {isCollapsed && (
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700 mx-auto">
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto mt-2">
                    <ul className="space-y-0.5">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-6 py-3 transition-all relative ${isActive
                                            ? 'bg-white/10 text-white font-medium border-l-4 border-white'
                                            : 'text-white/80 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-white/70'
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
                </nav>
            </>
        );
    };

    return (
        <aside
            className={`fixed left-0 top-16 bottom-0 bg-[#5773da] transition-all duration-300 ease-in-out z-30 shadow-xl ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex flex-col h-full">
                {userRole === 'Student' ? renderStudentNav() : renderAdminNav()}
            </div>
        </aside>
    );
};
