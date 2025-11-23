import { DashboardLayout } from '../Components/DashboardDesign/AllDashboardLayout'
import { AdminDashboardOverview } from '../Components/AdminDasboard/AdminDashboardOverview';

const AdminDashboard = () => {
  console.log('🔵 AdminDashboard component rendering');

  return (
    <DashboardLayout userRole="Admin">
      <AdminDashboardOverview />
    </DashboardLayout>
  );
};

export default AdminDashboard;