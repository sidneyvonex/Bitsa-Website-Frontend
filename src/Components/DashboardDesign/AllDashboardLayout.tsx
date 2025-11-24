import { useState } from 'react';
import type { ReactNode } from 'react';
import { DashboardTopbar } from './DashboardTopbar';
import { StudentSidebar } from './StudentSideNav';
import { AdminSideNav } from './AdminSideNav';
import { SuperAdminSideNav } from './SuperAdminSideNav';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'Student' | 'Admin' | 'SuperAdmin';
}

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderSidebar = () => {
    switch (userRole) {
      case 'Admin':
        return <AdminSideNav isCollapsed={isSidebarCollapsed} userRole={userRole} />;
      case 'SuperAdmin':
        return <SuperAdminSideNav isCollapsed={isSidebarCollapsed} userRole={userRole} />;
      case 'Student':
      default:
        return <StudentSidebar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed} userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Topbar */}
      <DashboardTopbar toggleSidebar={toggleSidebar} toggleMobileSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        {renderSidebar()}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${
            isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};