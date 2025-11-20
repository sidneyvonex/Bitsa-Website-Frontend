import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import { AdminBlogManagement } from './AdminBlogManagement';

export default function AdminBlogsPage() {
    return (
        <DashboardLayout userRole="Admin">
            <AdminBlogManagement />
        </DashboardLayout>
    );
}
