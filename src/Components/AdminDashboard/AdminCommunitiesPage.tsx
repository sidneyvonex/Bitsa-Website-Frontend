import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminCommunityManagement } from './AdminCommunityManagement';

export default function AdminCommunitiesPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminCommunityManagement />
        </DashboardLayout>
    );
}
