import { useState } from 'react';
import { Download, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const userGrowthData = [
    { month: 'Jan', users: 400, active: 300 },
    { month: 'Feb', users: 600, active: 450 },
    { month: 'Mar', users: 800, active: 600 },
    { month: 'Apr', users: 1100, active: 820 },
    { month: 'May', users: 1600, active: 1200 },
    { month: 'Jun', users: 2543, active: 1829 },
];

const engagementData = [
    { name: 'Events Attended', value: 45, fill: '#3b82f6' },
    { name: 'Blogs Read', value: 32, fill: '#8b5cf6' },
    { name: 'Communities Joined', value: 18, fill: '#ec4899' },
    { name: 'Projects Viewed', value: 5, fill: '#f59e0b' },
];

const contentTypeData = [
    { type: 'Blogs', count: 423, views: 12540 },
    { type: 'Events', count: 156, views: 8920 },
    { type: 'Projects', count: 89, views: 5630 },
    { type: 'Communities', count: 12, views: 3200 },
];

const reportTypes = [
    { id: 'user-growth', name: 'User Growth', description: 'Track user registration and active user trends' },
    { id: 'engagement', name: 'User Engagement', description: 'Monitor how users interact with platform features' },
    { id: 'content', name: 'Content Performance', description: 'Analyze content views and performance metrics' },
    { id: 'events', name: 'Event Analytics', description: 'View event attendance and participation data' },
];

export const AdminReportsManagement = () => {
    const [selectedReport, setSelectedReport] = useState('user-growth');
    const [dateRange, setDateRange] = useState('month');

    const handleExportReport = () => {
        // In a real app, this would generate and download a PDF report
        alert(`Exporting ${selectedReport} report for the last ${dateRange}`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
                <p className="text-gray-600">View comprehensive reports and analytics about your platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-600 text-sm font-semibold mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-blue-900">2,543</p>
                            <p className="text-xs text-blue-600 mt-2">↑ 12% from last month</p>
                        </div>
                        <div className="bg-blue-600 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-600 text-sm font-semibold mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-green-900">1,829</p>
                            <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
                        </div>
                        <div className="bg-green-600 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.257 18.257a2 2 0 00.28 2.82l5.426 5.426a2 2 0 002.92-.28l10.9-15.251" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-600 text-sm font-semibold mb-1">Total Events</p>
                            <p className="text-3xl font-bold text-purple-900">156</p>
                            <p className="text-xs text-purple-600 mt-2">↑ 5 new this week</p>
                        </div>
                        <div className="bg-purple-600 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 002 2h8a2 2 0 002-2H6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-600 text-sm font-semibold mb-1">Total Blogs</p>
                            <p className="text-3xl font-bold text-orange-900">423</p>
                            <p className="text-xs text-orange-600 mt-2">↑ 28 new this month</p>
                        </div>
                        <div className="bg-orange-600 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Selection and Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Generate Reports</h2>
                        <p className="text-gray-600 text-sm">Select a report type to view detailed analytics</p>
                    </div>
                    <button
                        onClick={handleExportReport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>

                {/* Report Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {reportTypes.map((report) => (
                        <button
                            key={report.id}
                            onClick={() => setSelectedReport(report.id)}
                            className={`p-4 rounded-lg border-2 transition text-left ${
                                selectedReport === report.id
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                        >
                            <p className="font-semibold text-gray-900 text-sm">{report.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                        </button>
                    ))}
                </div>

                {/* Date Range Filter */}
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last Month</option>
                        <option value="quarter">Last Quarter</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
            </div>

            {/* User Growth Chart */}
            {selectedReport === 'user-growth' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Total Users"
                            />
                            <Line
                                type="monotone"
                                dataKey="active"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="Active Users"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Engagement Chart */}
            {selectedReport === 'engagement' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">User Activity Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={engagementData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }: any) => `${name || 'Unknown'}: ${value || 0}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {engagementData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Engagement Breakdown</h3>
                        <div className="space-y-4">
                            {engagementData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.fill }}
                                        />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content Performance */}
            {selectedReport === 'content' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Content Performance Metrics</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Content Type</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Count</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Views</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contentTypeData.map((item) => (
                                    <tr key={item.type} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-900 font-medium">{item.type}</td>
                                        <td className="py-3 px-4 text-gray-700">{item.count}</td>
                                        <td className="py-3 px-4 text-gray-700">{item.views.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-700 font-semibold">{Math.round(item.views / item.count)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Event Analytics */}
            {selectedReport === 'events' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Event Analytics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={contentTypeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8b5cf6" name="Total Items" />
                            <Bar dataKey="views" fill="#3b82f6" name="Total Views" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-600 text-sm mb-2">Platform Health</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Excellent
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-600 text-sm mb-2">Avg Session Duration</p>
                    <p className="text-2xl font-bold text-gray-900">12m 34s</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +2m 15s vs last month
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-600 text-sm mb-2">Bounce Rate</p>
                    <p className="text-2xl font-bold text-gray-900">24.5%</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> -3.2% improvement
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-600 text-sm mb-2">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">8.7%</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +1.2% improvement
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminReportsManagement;
