import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetAllEventsQuery, useGetAllCommunitiesQuery } from '../../features/api';
import {
    Calendar,
    Users,
    BookOpen,
    TrendingUp,
    Clock,
    MapPin,
    ArrowRight
} from 'lucide-react';

interface Event {
    _id: string;
    title: string;
    date: string;
    location: string;
}

interface Community {
    _id: string;
    name: string;
    description: string;
    icon?: string;
    memberCount?: number;
}

export const DashboardOverview = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data: eventsData } = useGetAllEventsQuery({ page: 1, limit: 3 });
    const { data: communitiesData } = useGetAllCommunitiesQuery();

    const upcomingEvents = Array.isArray(eventsData?.data?.events)
        ? eventsData.data.events.slice(0, 3)
        : [];

    const myCommunities = Array.isArray(communitiesData?.data)
        ? communitiesData.data.slice(0, 3)
        : [];

    const userName = user?.firstName || 'Student';

    // Stats data
    const stats = [
        {
            icon: <Calendar className="w-6 h-6" />,
            label: 'Registered Events',
            value: '5',
            change: '+2 this week',
            color: 'bg-blue-50 text-blue-600',
            iconBg: 'bg-blue-100',
        },
        {
            icon: <Users className="w-6 h-6" />,
            label: 'Communities',
            value: '3',
            change: '+1 this month',
            color: 'bg-purple-50 text-purple-600',
            iconBg: 'bg-purple-100',
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            label: 'Blogs Read',
            value: '12',
            change: '+4 this week',
            color: 'bg-green-50 text-green-600',
            iconBg: 'bg-green-100',
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            label: 'Points Earned',
            value: '450',
            change: '+50 today',
            color: 'bg-orange-50 text-orange-600',
            iconBg: 'bg-orange-100',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 relative overflow-hidden">
                {/* Decorative dots */}
                <div className="absolute top-6 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                <div className="absolute top-12 right-32 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
                <div className="absolute bottom-8 right-24 w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-16 left-32 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
                <div className="absolute top-20 left-40 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>

                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Hello {userName},
                        </h1>
                        <p className="text-gray-700 mb-1">
                            You have learned <span className="font-semibold text-blue-600">80%</span> of your course
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                            Keep it up and improve your grades to get scholarship
                        </p>
                        <button className="bg-[#4361c7] hover:bg-[#3651b7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                            View Result
                        </button>
                    </div>

                    {/* Illustration placeholder - Using emoji/icon as placeholder */}
                    <div className="hidden md:flex items-center justify-center w-64 h-48">
                        <div className="relative">
                            {/* Simplified illustration using shapes */}
                            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                                <div className="w-24 h-16 bg-gray-600 rounded-t-full"></div>
                            </div>
                            <div className="absolute -bottom-2 -left-8 w-12 h-16 bg-blue-500 rounded-lg transform -rotate-12 flex items-center justify-center text-2xl">
                                👍
                            </div>
                            <div className="absolute -top-2 -right-8 w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                                ☕
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${stat.iconBg} p-3 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</p>
                            <p className="text-xs mt-2 text-gray-500">{stat.change}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
                        <button className="text-sm text-[#4361c7] hover:text-[#3651b7] font-semibold flex items-center gap-1 transition-colors">
                            View More <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-3">
                            {upcomingEvents.map((event: Event) => (
                                <div key={event._id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100">
                                    <div className="shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                                            <Calendar className="w-5 h-5 text-[#4361c7]" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="shrink-0 px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                        View →
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-12">No upcoming events</p>
                    )}
                </div>
            </div>

            {/* My Communities */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">My Communities</h2>
                        <button className="text-sm text-[#4361c7] hover:text-[#3651b7] font-semibold flex items-center gap-1 transition-colors">
                            View More <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {myCommunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {myCommunities.map((community: Community) => (
                                <div key={community._id} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all bg-gradient-to-br from-white to-gray-50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-2xl border border-purple-200">
                                            {community.icon || '👥'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 truncate">{community.name}</h3>
                                            <p className="text-xs text-gray-500">{community.memberCount} members</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{community.description}</p>
                                    <button className="text-xs text-[#4361c7] hover:text-[#3651b7] font-semibold flex items-center gap-1">
                                        View Details →
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-12">No communities joined yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};
