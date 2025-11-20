import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';
import { Mail } from 'lucide-react';

export default function StudentContact() {
    return (
        <DashboardLayout userRole="Student">
            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
                    </div>
                    <p className="text-gray-600">Contact form and support information will appear here.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
