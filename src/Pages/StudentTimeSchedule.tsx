import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';

export default function StudentTimeSchedule() {
    return (
        <DashboardLayout userRole="Student">
            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Time Schedule</h1>
                    <p className="text-gray-600">Your class schedule and timetable will appear here.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
