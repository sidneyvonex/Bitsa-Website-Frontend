import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminEventManagement } from './AdminEventManagement';

export default function AdminEventsPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminEventManagement />
        </DashboardLayout>
    );
}
