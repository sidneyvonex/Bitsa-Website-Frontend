import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '../Components/DashboardDesign/AllDashboardLayout'

const AdminDashboard = () => {
  console.log('🔵 AdminDashboard component rendering');

  return (
    <DashboardLayout userRole="Admin">
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;