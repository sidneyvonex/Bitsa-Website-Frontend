import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DashboardTopbar } from '../DashboardDesign/DashboardTopbar';
import { Sidebar } from '../DashboardDesign/StudentSideNav';
import { StudentDashboardOverview } from '../StudentDashboard/StudentDashboardOverview';
import { StudentEvents } from '../StudentDashboard/Events';
import { StudentCommunities } from '../StudentDashboard/Communities';
import { StudentProjects } from '../StudentDashboard/Projects';
import { StudentProfile } from '../StudentDashboard/Profile';
import { StudentSettings } from '../StudentDashboard/Settings';
import { InterestSelectionModal } from '../InterestSelectionModal';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useCheckMyInterestsQuery } from '../../features/api';
import {Blogs} from '../../Pages/Blogs';
import BlogDetails from '../../Pages/BlogDetails';
import Help from '../../Pages/Help';

export const DashboardRouter = () => {
    const user = useAppSelector(selectCurrentUser);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        // Track viewport size for mobile detection
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobileView(e.matches);
        };
        
        // Set initial value
        handleChange(mediaQuery);
        
        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Topbar */}
                <DashboardTopbar
                    onToggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                    isMobileView={isMobileView}
                    onToggleMobileMenu={toggleMobileMenu}
                />

                <div className="flex">
                    {/* Sidebar */}
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        userRole={user?.role as 'Student' | 'Admin' | 'SuperAdmin' || 'Student'}
                        isMobileMenuOpen={isMobileMenuOpen}
                        onMobileMenuClose={closeMobileMenu}
                    />

                    {/* Main Content */}
                    <main
                        className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${
                            isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                        }`}
                    >
                        <div className="p-4 sm:p-6 lg:p-8">
                            <Routes>
                                {/* Main Dashboard */}
                                <Route path="/" element={<StudentDashboardOverview />} />
                                
                                {/* Learning Section */}
                                <Route path="/events" element={<StudentEvents />} />
                                <Route path="/communities" element={<StudentCommunities />} />
                                <Route path="/blogs" element={<Blogs />} />
                                <Route path="/blogs/:slug" element={<BlogDetails />} />
                                <Route path="/projects" element={<StudentProjects />} />
                                
                                {/* Account Section */}
                                <Route path="/profile" element={<StudentProfile />} />
                                <Route path="/settings" element={<StudentSettings />} />
                                
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
