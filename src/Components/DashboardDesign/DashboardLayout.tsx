import { useState } from 'react';
import type { ReactNode } from 'react';
import { DashboardTopbar } from './DashboardTopbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
    userRole: 'Student' | 'Admin' | 'SuperAdmin';
}

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
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
                    userRole={userRole}
                />

                {/* Main Content */}
                <main
                    className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'
                        }`}
                >
                    <div className="p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
