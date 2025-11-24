import { useState } from 'react';
import { Search, Clock, User, Activity } from 'lucide-react';

export const AuditLogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAction, setFilterAction] = useState<string>('all');
    const [filterUser, setFilterUser] = useState<string>('all');

    // Mock audit logs
    const mockLogs = [
        { id: '1', user: 'John Doe', action: 'Created Event', resource: 'Tech Career Fair 2024', timestamp: '2024-11-24 10:30 AM', status: 'success' },
        { id: '2', user: 'Jane Smith', action: 'Updated Blog', resource: 'React Best Practices', timestamp: '2024-11-24 09:45 AM', status: 'success' },
        { id: '3', user: 'Bob Wilson', action: 'Deleted Community', resource: 'Blockchain Dev', timestamp: '2024-11-24 08:20 AM', status: 'success' },
        { id: '4', user: 'Alice Johnson', action: 'Created Project', resource: 'BITSA Website v2', timestamp: '2024-11-24 07:15 AM', status: 'success' },
        { id: '5', user: 'System', action: 'Backup', resource: 'Database', timestamp: '2024-11-24 06:00 AM', status: 'success' },
        { id: '6', user: 'Charlie Brown', action: 'Failed Login', resource: 'Admin Panel', timestamp: '2024-11-23 11:30 PM', status: 'failed' },
        { id: '7', user: 'John Doe', action: 'Exported Report', resource: 'Monthly Analytics', timestamp: '2024-11-23 10:45 PM', status: 'success' },
        { id: '8', user: 'Jane Smith', action: 'Updated Settings', resource: 'System Config', timestamp: '2024-11-23 09:30 PM', status: 'success' },
    ];

    const [logs] = useState(mockLogs);

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAction = filterAction === 'all' || log.action === filterAction;
        const matchesUser = filterUser === 'all' || log.user === filterUser;
        return matchesSearch && matchesAction && matchesUser;
    });

    const uniqueActions = Array.from(new Set(logs.map(l => l.action)));
    const uniqueUsers = Array.from(new Set(logs.map(l => l.user)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Audit Logs</h2>
                <p className="text-gray-600 mt-2">Monitor all system activities and user actions</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="all">All Actions</option>
                        {uniqueActions.map(action => (
                            <option key={action} value={action}>{action}</option>
                        ))}
                    </select>
                    <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="all">All Users</option>
                        {uniqueUsers.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>

                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredLogs.length}</span> of <span className="font-semibold">{logs.length}</span> logs
                </p>
            </div>

            {/* Logs Timeline */}
            <div className="space-y-4">
                {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                        <div key={log.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${log.status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <Activity className={`w-5 h-5 ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900">{log.action}</span>
                                                <span className="text-sm text-gray-600">{log.resource}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <User className="w-3 h-3" />
                                                    {log.user}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <Clock className="w-3 h-3" />
                                                    {log.timestamp}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                log.status === 'success'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {log.status === 'success' ? '✓ Success' : '✗ Failed'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-500">No audit logs found</p>
                    </div>
                )}
            </div>
        </div>
    );
};
