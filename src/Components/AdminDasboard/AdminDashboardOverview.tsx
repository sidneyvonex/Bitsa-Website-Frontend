import { useMemo } from 'react';
import {
    Calendar,
    FileText,
    Globe,
    TrendingUp,
} from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetAllBlogsQuery } from '../../features/api/blogsApi';
import { useGetAllEventsQuery } from '../../features/api/eventApi';
import { useGetAllCommunitiesQuery } from '../../features/api/communitiesApi';
import { useGetAllProjectsQuery } from '../../features/api/projectApi';
import { useGetAllInterestsQuery } from '../../features/api/interestsApi';

export const AdminDashboardOverview = () => {
    const currentUser = useAppSelector(selectCurrentUser);

    // Fetch all data from APIs
    const { data: blogsData, isLoading: loadingBlogs } = useGetAllBlogsQuery({ page: 1, limit: 100 });
    const { data: eventsData, isLoading: loadingEvents } = useGetAllEventsQuery({ page: 1, limit: 100 });
    const { data: communitiesData, isLoading: loadingCommunities } = useGetAllCommunitiesQuery();
    const { data: projectsData, isLoading: loadingProjects } = useGetAllProjectsQuery({ page: 1, limit: 100 });
    const { data: interestsData, isLoading: loadingInterests } = useGetAllInterestsQuery();

    const isLoading = loadingBlogs || loadingEvents || loadingCommunities || loadingProjects || loadingInterests;

    // Calculate stats from actual data
    const stats = useMemo(() => {
        const blogs = Array.isArray(blogsData?.data?.blogs) ? blogsData.data.blogs : [];
        const events = Array.isArray(eventsData?.data?.events) ? eventsData.data.events : [];
        const communities = Array.isArray(communitiesData?.data?.communities) ? communitiesData.data.communities : [];
        const projects = Array.isArray(projectsData?.projects) ? projectsData.projects : Array.isArray(projectsData?.data?.projects) ? projectsData.data.projects : [];
        const interests = Array.isArray(interestsData?.data) ? interestsData.data : Array.isArray(interestsData?.interests) ? interestsData.interests : [];

        // Count by category
        const eventsByCategory: Record<string, number> = {};
        events.forEach((event: any) => {
            const category = event.category || 'Uncategorized';
            eventsByCategory[category] = (eventsByCategory[category] || 0) + 1;
        });

        const interestsByCategory: Record<string, number> = {};
        const hasCategoriesSet = interests.some((i: any) => i.category);
        
        interests.forEach((interest: any) => {
            // If interests have categories, group by category, otherwise group by name
            const groupKey = hasCategoriesSet ? (interest.category || 'Uncategorized') : (interest.name || 'Unnamed');
            interestsByCategory[groupKey] = (interestsByCategory[groupKey] || 0) + 1;
        });

        return {
            totalBlogs: blogs.length,
            publishedBlogs: blogs.filter((b: any) => b.isPublished).length,
            draftBlogs: blogs.filter((b: any) => !b.isPublished).length,
            totalEvents: events.length,
            upcomingEvents: events.length,
            totalCommunities: communities.length,
            totalProjects: projects.length,
            eventsByCategory,
            interestsByCategory,
        };
    }, [blogsData, eventsData, communitiesData, projectsData, interestsData]);

    // Transform API data to chart data
    const eventCategoryData = Object.entries(stats.eventsByCategory).map(([name, value]) => ({
        name,
        value: value as number,
    }));

    const interestCategoryData = Object.entries(stats.interestsByCategory).map(([name, value]) => ({
        name,
        value: value as number,
        fill: ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Object.keys(stats.interestsByCategory).indexOf(name) % 5],
    }));

    const engagementData = [
        { day: 'Mon', blogs: 12, events: 8 },
        { day: 'Tue', blogs: 15, events: 10 },
        { day: 'Wed', blogs: 18, events: 12 },
        { day: 'Thu', blogs: 14, events: 11 },
        { day: 'Fri', blogs: 20, events: 15 },
        { day: 'Sat', blogs: 16, events: 9 },
        { day: 'Sun', blogs: 10, events: 7 },
    ];

    // Stats cards
    const statsCards = [
        {
            label: 'Total Blogs',
            value: stats.totalBlogs,
            change: '+12.5%',
            icon: FileText,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Active Events',
            value: stats.upcomingEvents,
            change: '+8.2%',
            icon: Calendar,
            color: 'bg-green-500',
            lightColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            label: 'Communities',
            value: stats.totalCommunities,
            change: '+5.1%',
            icon: Globe,
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
        {
            label: 'Projects',
            value: stats.totalProjects,
            change: '+3.2%',
            icon: TrendingUp,
            color: 'bg-orange-500',
            lightColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5773da]"></div>
                <p className="text-gray-600">Loading admin dashboard data...</p>
            </div>
        );
    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome back, {currentUser?.firstName || 'Admin'}!
                </h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your platform today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 ${stat.lightColor} rounded-lg`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interests Category Distribution */}
                {interestCategoryData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={interestCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {interestCategoryData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Event Category Distribution */}
                {eventCategoryData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={eventCategoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Engagement Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Engagement Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="blogs" stroke="#8b5cf6" strokeWidth={2} />
                        <Line type="monotone" dataKey="events" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Blogs */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Blogs</h3>
                        <a href="/admindashboard/blogs" className="text-[#5773da] text-sm font-medium hover:underline">
                            Manage All →
                        </a>
                    </div>
                    <div className="space-y-3">
                        {Array.isArray(blogsData?.data?.blogs) && blogsData.data.blogs.slice(0, 4).map((blog: any) => (
                            <div key={blog.id || blog._id} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 text-sm">{blog.title}</h4>
                                    <p className="text-xs text-gray-600 mt-1">{blog.category}</p>
                                </div>
                                <span className="text-xs text-gray-500 ml-2">{blog.views || 0} views</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="text-sm text-gray-700">Published Blogs</span>
                            <span className="font-bold text-gray-900">{stats.publishedBlogs}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <span className="text-sm text-gray-700">Upcoming Events</span>
                            <span className="font-bold text-gray-900">{stats.upcomingEvents}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <span className="text-sm text-gray-700">Communities</span>
                            <span className="font-bold text-gray-900">{stats.totalCommunities}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                            <span className="text-sm text-gray-700">Total Projects</span>
                            <span className="font-bold text-gray-900">{stats.totalProjects}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                    <a href="/admindashboard/events" className="text-[#5773da] text-sm font-medium hover:underline">
                        Manage All →
                    </a>
                </div>
                <div className="space-y-2">
                    {Array.isArray(eventsData?.data?.events) && eventsData.data.events.slice(0, 3).map((event: any) => (
                        <div key={event.id || event._id} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                            <div>
                                <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                                <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{event.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
