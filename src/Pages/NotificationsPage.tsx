import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';
import { Bell, Calendar, MessageSquare, User, Trophy } from 'lucide-react';

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'event',
            icon: Calendar,
            iconColor: 'bg-blue-500',
            title: 'New Event: BITSA Tech Summit 2024',
            message: 'Join us for an exciting tech summit next week!',
            time: '2 hours ago',
            unread: true
        },
        {
            id: 2,
            type: 'message',
            icon: MessageSquare,
            iconColor: 'bg-green-500',
            title: 'New Message from Admin',
            message: 'Important updates regarding upcoming activities.',
            time: '5 hours ago',
            unread: true
        },
        {
            id: 3,
            type: 'achievement',
            icon: Trophy,
            iconColor: 'bg-yellow-500',
            title: 'Achievement Unlocked!',
            message: 'You completed 10 courses this month!',
            time: '1 day ago',
            unread: false
        },
        {
            id: 4,
            type: 'profile',
            icon: User,
            iconColor: 'bg-purple-500',
            title: 'Profile Update',
            message: 'Your profile has been successfully updated.',
            time: '2 days ago',
            unread: false
        },
        {
            id: 5,
            type: 'event',
            icon: Calendar,
            iconColor: 'bg-blue-500',
            title: 'Event Reminder',
            message: 'Hackathon: Build the Future starts tomorrow!',
            time: '3 days ago',
            unread: false
        },
    ];

    return (
        <DashboardLayout userRole="Student">
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
                            <p className="text-gray-600 text-sm">Stay updated with your latest activities</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 text-[#5773da] hover:bg-[#5773da]/10 rounded-lg font-medium text-sm transition-colors">
                                Mark all as read
                            </button>
                            <div className="relative">
                                <Bell className="w-6 h-6 text-[#5773da]" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {notifications.filter(n => n.unread).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-5 hover:bg-gray-50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/50' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 ${notification.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                                        <notification.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                {notification.title}
                                                {notification.unread && (
                                                    <span className="ml-2 inline-block w-2 h-2 bg-[#5773da] rounded-full"></span>
                                                )}
                                            </h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{notification.message}</p>
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
