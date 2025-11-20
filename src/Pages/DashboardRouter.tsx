import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { DashboardTopbar } from '../Components/DashboardDesign/DashboardTopbar';
import { Sidebar } from '../Components/DashboardDesign/Sidebar';
import { StudentDashboardOverview } from '../Components/StudentDashboard/StudentDashboardOverview';
import { InterestSelectionModal } from '../Components/InterestSelectionModal';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useCheckMyInterestsQuery } from '../features/api';
import Events from './Events';
import Communities from './Communities';
import Blogs from './Blogs';
import Projects from './Projects';
import Help from './Help';

// Profile page component
const ProfilePage = () => (
    <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600 mb-6">Manage your profile information and preferences</p>
        
        <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
                <div className="pb-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white" placeholder="Enter first name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white" placeholder="Enter last name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white" placeholder="Enter email" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School ID</label>
                            <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white" placeholder="Enter school ID" />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// Settings page component
const SettingsPage = () => (
    <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>
        
        <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
                <div className="pb-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Settings</h2>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4" defaultChecked />
                            <span className="ml-3 text-gray-700">Show profile to other students</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4" defaultChecked />
                            <span className="ml-3 text-gray-700">Receive notifications</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="ml-3 text-gray-700">Email notifications</span>
                        </label>
                    </div>
                </div>

                <div className="pb-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
                    <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                        Change Password
                    </button>
                </div>

                <div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const DashboardRouter = () => {
    const user = useAppSelector(selectCurrentUser);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Check localStorage for completion status
    const [interestsCompleted, setInterestsCompleted] = useState(() => {
        const stored = localStorage.getItem('interestsCompleted');
        return stored === 'true';
    });

    // Check if user has selected interests
    const { data: interestsCheck, isLoading } = useCheckMyInterestsQuery(undefined, {
        skip: !user || user.role !== 'Student',
    });

    let hasInterests = false;
    if (interestsCheck) {
        hasInterests = interestsCheck.data?.hasInterests ?? interestsCheck.hasInterests ?? false;
    }

    const shouldShowModal = Boolean(
        user?.role === 'Student' &&
        !isLoading &&
        !interestsCompleted &&
        interestsCheck &&
        !hasInterests
    );

    const handleInterestModalClose = () => {
        console.log('Interest selection is required. Please select at least one interest.');
    };

    const handleInterestSelectionComplete = () => {
        setInterestsCompleted(true);
        localStorage.setItem('interestsCompleted', 'true');
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Topbar */}
                <DashboardTopbar
                    onToggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <div className="flex">
                    {/* Sidebar */}
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        userRole={user?.role as 'Student' | 'Admin' | 'SuperAdmin' || 'Student'}
                    />

                    {/* Main Content */}
                    <main
                        className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${
                            isSidebarCollapsed ? 'ml-20' : 'ml-64'
                        }`}
                    >
                        <div className="p-6 lg:p-8">
                            <Routes>
                                {/* Main Dashboard */}
                                <Route path="/" element={<StudentDashboardOverview />} />
                                
                                {/* Learning Section */}
                                <Route path="/events" element={<Events />} />
                                <Route path="/communities" element={<Communities />} />
                                <Route path="/blogs" element={<Blogs />} />
                                <Route path="/projects" element={<Projects />} />
                                
                                {/* Account Section */}
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                
                                {/* Help Section */}
                                <Route path="/help" element={<Help />} />
                                
                                {/* Catch-all redirect to dashboard */}
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>

            {user && user.role === 'Student' && (
                <InterestSelectionModal
                    isOpen={shouldShowModal}
                    onClose={handleInterestModalClose}
                    onComplete={handleInterestSelectionComplete}
                />
            )}
        </>
    );
};

export default DashboardRouter;
