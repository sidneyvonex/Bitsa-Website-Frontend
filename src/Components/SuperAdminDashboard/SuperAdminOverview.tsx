import { useMemo } from 'react';
import {
    Users,
    FileText,
    Calendar,
    Globe,
    TrendingUp,
    CheckCircle,
    Activity,
} from 'lucide-react';
import {
    PieChart, Pie, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell
} from 'recharts';

export const SuperAdminOverview = () => {
    // Simulated stats - replace with API calls
    const stats = useMemo(() => ({
        totalUsers: 1250,
        activeUsers: 892,
        adminCount: 15,
        partnerCount: 28,
        totalEvents: 156,
        totalBlogs: 342,
        totalCommunities: 45,
        systemHealth: 98.5,
    }), []);

    // Chart data
    const userGrowthData = [
        { month: 'Jan', users: 450, admins: 5, partners: 8 },
        { month: 'Feb', users: 620, admins: 8, partners: 12 },
        { month: 'Mar', users: 850, admins: 10, partners: 18 },
        { month: 'Apr', users: 1050, admins: 12, partners: 22 },
        { month: 'May', users: 1180, admins: 14, partners: 25 },
        { month: 'Jun', users: 1250, admins: 15, partners: 28 },
    ];

    const userRoleDistribution = [
        { name: 'Students', value: 1180, fill: '#3b82f6' },
        { name: 'Admins', value: 15, fill: '#f59e0b' },
        { name: 'Partners', value: 28, fill: '#10b981' },
        { name: 'Super Admins', value: 2, fill: '#8b5cf6' },
    ];

    const contentDistribution = [
        { name: 'Blogs', value: 342, fill: '#0ea5e9' },
        { name: 'Events', value: 156, fill: '#ec4899' },
        { name: 'Communities', value: 45, fill: '#f59e0b' },
        { name: 'Projects', value: 89, fill: '#10b981' },
    ];

    const activityData = [
        { time: '12 AM', activity: 45 },
        { time: '3 AM', activity: 28 },
        { time: '6 AM', activity: 35 },
        { time: '9 AM', activity: 82 },
        { time: '12 PM', activity: 156 },
        { time: '3 PM', activity: 198 },
        { time: '6 PM', activity: 245 },
        { time: '9 PM', activity: 198 },
    ];

    const statsCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50' },
        { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'bg-green-500', lightColor: 'bg-green-50' },
        { label: 'Admins', value: stats.adminCount, icon: CheckCircle, color: 'bg-orange-500', lightColor: 'bg-orange-50' },
        { label: 'Partners', value: stats.partnerCount, icon: TrendingUp, color: 'bg-purple-500', lightColor: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">SuperAdmin Overview</h2>
                    <p className="text-gray-600 mt-2">System-wide analytics and management</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                        <p className="text-sm font-semibold text-green-600">System Health</p>
                        <p className="text-xs text-green-600">{stats.systemHealth}%</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-200 hover:shadow-lg transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">{card.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className={`${card.lightColor} p-4 rounded-lg`}>
                                    <Icon className={`w-8 h-8 text-gray-900`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="admins" stroke="#f59e0b" strokeWidth={2} />
                            <Line type="monotone" dataKey="partners" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* System Activity Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">System Activity by Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                            <Bar dataKey="activity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* User Role Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Role Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={userRoleDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {userRoleDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Content Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Content Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={contentDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {contentDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Content Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Blogs', value: stats.totalBlogs, icon: FileText },
                        { label: 'Total Events', value: stats.totalEvents, icon: Calendar },
                        { label: 'Communities', value: stats.totalCommunities, icon: Globe },
                        { label: 'System Health', value: `${stats.systemHealth}%`, icon: TrendingUp },
                    ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <Icon className="w-8 h-8 text-gray-600" />
                                <div>
                                    <p className="text-xs text-gray-600">{item.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
