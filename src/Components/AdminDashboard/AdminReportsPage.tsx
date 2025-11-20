import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminReportsManagement } from './AdminReportsManagement';

export default function AdminReportsPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminReportsManagement />
        </DashboardLayout>
    );
}
