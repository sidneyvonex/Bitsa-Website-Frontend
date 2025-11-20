import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminUserManagement } from './AdminUserManagement';

export default function AdminUsersPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminUserManagement />
        </DashboardLayout>
    );
}
