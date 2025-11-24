import { DashboardLayout } from '../Components/DashboardDesign/AllDashboardLayout';
import { SuperAdminOverview } from '../Components/SuperAdminDashboard/SuperAdminOverview';

const SuperAdminDashboard = () => {
    return (
        <DashboardLayout userRole="SuperAdmin">
            <div className="space-y-6">
                <SuperAdminOverview />
            </div>
        </DashboardLayout>
    );
};

export default SuperAdminDashboard;
