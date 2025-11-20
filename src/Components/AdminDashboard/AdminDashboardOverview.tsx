import { useState } from 'react';
import {
    Users,
    Calendar,
    FileText,
    Globe,
    CheckCircle,
    AlertCircle,
    Eye,
    Clock,
} from 'lucide-react';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
    useGetUserStatsQuery,
    useGetAllUsersQuery,
} from '../../features/api/userApi';
import {
    useGetEventStatsQuery,
    useGetUpcomingEventsQuery,
} from '../../features/api/EventApi';
import {
    useGetBlogStatsQuery,
    useGetLatestBlogsQuery,
} from '../../features/api/blogsApi';
import {
    useGetCommunityStatsQuery,
} from '../../features/api/communitiesApi';

export const AdminDashboardOverview = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const [selectedTimeRange, setSelectedTimeRange] = useState('week');

    // Fetch stats from APIs
    const { data: userStats, isLoading: loadingUserStats } = useGetUserStatsQuery();
    const { data: eventStats, isLoading: loadingEventStats } = useGetEventStatsQuery();
    const { data: blogStats, isLoading: loadingBlogStats } = useGetBlogStatsQuery();
    const { data: communityStats, isLoading: loadingCommunityStats } = useGetCommunityStatsQuery();

    // Fetch recent data
    const { data: recentUsers } = useGetAllUsersQuery({ page: 1, limit: 5 });
    const { data: upcomingEvents } = useGetUpcomingEventsQuery(5);
    const { data: latestBlogs } = useGetLatestBlogsQuery(5);

    const isLoading = loadingUserStats || loadingEventStats || loadingBlogStats || loadingCommunityStats;

    // Stats cards data
    const statsCards = [
        {
            label: 'Total Users',
            value: userStats?.data?.totalUsers || 0,
            change: '+12.5%',
            icon: Users,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Active Events',
            value: eventStats?.data?.upcomingEvents || 0,
            change: '+8.2%',
            icon: Calendar,
            color: 'bg-green-500',
            lightColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            label: 'Published Blogs',
            value: blogStats?.data?.publishedBlogs || 0,
            change: '+15.3%',
            icon: FileText,
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
        {
            label: 'Communities',
            value: communityStats?.data?.totalCommunities || 0,
            change: '+5.1%',
            icon: Globe,
            color: 'bg-orange-500',
            lightColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5773da]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Hey, {currentUser?.firstName || 'Admin'}!
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Welcome back to your dashboard</p>
                </div>

                {/* Time Range Pills */}
                <div className="flex gap-2">
                    {['Today', 'Week', 'Month'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setSelectedTimeRange(range.toLowerCase())}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedTimeRange === range.toLowerCase()
                                    ? 'bg-[#5773da] text-white shadow-lg shadow-[#5773da]/30'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#5773da] hover:text-[#5773da]'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards - Clean Professional Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 ${stat.lightColor} rounded-xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Users Table - Clean Design */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                        <button className="text-[#5773da] hover:text-[#4861c9] text-sm font-medium">
                            See All →
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">User</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Email</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Role</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers?.data?.slice(0, 6).map((user) => (
                                    <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#5773da] to-[#4861c9] flex items-center justify-center text-white font-semibold text-sm">
                                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                                </div>
                                                <span className="font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{user.email}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-medium text-gray-700">{user.role}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {user.isVerified ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Today's Requests & Active Projects */}
                <div className="space-y-6">
                    {/* Today's Requests */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
                            <div className="w-7 h-7 bg-[#5773da] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                    {upcomingEvents?.data?.events?.length || 0}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {upcomingEvents?.data?.events?.slice(0, 3).map((event) => (
                                <div
                                    key={event._id}
                                    className="p-3 border border-gray-200 rounded-xl hover:border-[#5773da] hover:shadow-sm transition-all cursor-pointer"
                                >
                                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                                        {event.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2">{event.location}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                                            {event.status}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {event.registeredCount}/{event.capacity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Projects */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">System Overview</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">Communities</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{communityStats?.data?.totalCommunities || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Events</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{eventStats?.data?.totalEvents || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-gray-700">Blogs</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{blogStats?.data?.totalBlogs || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium text-gray-700">Total Users</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{userStats?.data?.totalUsers || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Blog Posts - Clean Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Latest Content</h2>
                    <button className="text-[#5773da] hover:text-[#4861c9] text-sm font-medium">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestBlogs?.data?.blogs?.slice(0, 3).map((blog) => (
                        <div
                            key={blog._id}
                            className="border border-gray-200 rounded-xl p-4 hover:border-[#5773da] hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                                    {blog.category}
                                </span>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="text-xs">{blog.views}</span>
                                </div>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {blog.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">{blog.excerpt}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">
                                    By {blog.author?.firstName || 'Unknown'}
                                </span>
                                {blog.isPublished ? (
                                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                        <CheckCircle className="w-3 h-3" />
                                        Published
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs text-orange-600">
                                        <Clock className="w-3 h-3" />
                                        Draft
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Verified Users</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {userStats?.data?.verifiedUsers || 0}
                            </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Events</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {eventStats?.data?.totalEvents || 0}
                            </p>
                        </div>
                        <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Blogs</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {blogStats?.data?.totalBlogs || 0}
                            </p>
                        </div>
                        <FileText className="w-8 h-8 text-purple-500" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Members</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {communityStats?.data?.totalMembers || 0}
                            </p>
                        </div>
                        <Users className="w-8 h-8 text-orange-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};
