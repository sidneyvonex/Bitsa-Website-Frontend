import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCurrentUser, logout } from '../../features/auth/authSlice';
import { Menu, Search, Settings, LogOut, User, Clock } from 'lucide-react';
import { useState } from 'react';

interface DashboardTopbarProps {
    onToggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

export const DashboardTopbar = ({ onToggleSidebar }: DashboardTopbarProps) => {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    const userName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.email?.split('@')[0] || 'User';

    const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6366f1&color=fff&size=128`;

    return (
        <header className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-100 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Dashboard Title */}
                    <h1 className="text-lg font-bold text-gray-900 hidden sm:block">Dashboard</h1>
                </div>

                {/* Center - Search Bar */}
                <div className="hidden md:flex items-center relative flex-1 max-w-md mx-8">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Course"
                        className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Removed demo time badge and demo courses button */}

                    {/* Refresh Button */}
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative ml-2">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors p-1.5"
                        >
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="hidden lg:block text-left pr-2">
                                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-500">{user?.role}</p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowProfileMenu(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                            <Settings className="w-4 h-4" />
                                            Settings
                                        </button>
                                    </div>
                                    <div className="p-2 border-t border-gray-100">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
