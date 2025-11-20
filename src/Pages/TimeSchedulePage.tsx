import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function TimeSchedulePage() {
    // Sample schedule data
    const scheduleItems = [
        {
            id: 1,
            title: 'Web Development Workshop',
            time: '09:00 AM - 11:00 AM',
            location: 'Room 301',
            type: 'Workshop',
            color: 'bg-blue-500'
        },
        {
            id: 2,
            title: 'React Fundamentals',
            time: '11:30 AM - 01:00 PM',
            location: 'Online',
            type: 'Class',
            color: 'bg-green-500'
        },
        {
            id: 3,
            title: 'Team Meeting',
            time: '02:00 PM - 03:00 PM',
            location: 'Conference Room A',
            type: 'Meeting',
            color: 'bg-purple-500'
        },
        {
            id: 4,
            title: 'Project Presentation',
            time: '03:30 PM - 05:00 PM',
            location: 'Auditorium',
            type: 'Presentation',
            color: 'bg-orange-500'
        },
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <DashboardLayout userRole="Student">
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Time Schedule</h1>
                            <p className="text-gray-600 text-sm">Manage your daily schedule and activities</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#5773da] text-white rounded-lg">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">{today}</span>
                        </div>
                    </div>
                </div>

                {/* Weekly View */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">This Week</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {days.map((day) => (
                            <div
                                key={day}
                                className={`text-center p-3 rounded-lg ${day === today
                                        ? 'bg-[#5773da] text-white'
                                        : 'bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <p className="text-xs font-medium">{day.slice(0, 3)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Today's Schedule</h2>
                    <div className="space-y-4">
                        {scheduleItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#5773da] hover:shadow-md transition-all"
                            >
                                <div className={`w-1 h-full ${item.color} rounded-full`}></div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <span className={`px-3 py-1 ${item.color} text-white text-xs font-medium rounded-full`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
