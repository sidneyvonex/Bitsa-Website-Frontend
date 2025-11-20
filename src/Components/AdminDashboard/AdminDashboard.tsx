import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminDashboardOverview } from './AdminDashboardOverview';

const AdminDashboard = () => {
  console.log('🔵 AdminDashboard component rendering');

  return (
    <DashboardLayout userRole="Admin">
      <AdminDashboardOverview />
    </DashboardLayout>
  );
};

export default AdminDashboard;
