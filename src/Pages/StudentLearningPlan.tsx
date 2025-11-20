import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';
import { BookOpen } from 'lucide-react';

export default function StudentLearningPlan() {
    return (
        <DashboardLayout userRole="Student">
            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Learning Plan</h1>
                    </div>
                    <p className="text-gray-600">Your personalized learning plan will appear here.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
