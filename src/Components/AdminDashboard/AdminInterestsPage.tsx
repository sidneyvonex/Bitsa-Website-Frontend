import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import AdminInterestsManagement from './AdminInterestsManagement';

export default function AdminInterestsPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminInterestsManagement />
        </DashboardLayout>
    );
}
