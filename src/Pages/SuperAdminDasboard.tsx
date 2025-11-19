import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import {
  Users,
  Calendar,
  Settings,
  BarChart3,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Shield,
  Database,
  Activity,
  Lock
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Admins', value: '18', icon: Shield, color: 'bg-purple-500' },
    { label: 'System Events', value: '156', icon: Calendar, color: 'bg-green-500' },
    { label: 'Critical Alerts', value: '3', icon: AlertCircle, color: 'bg-red-500' },
    { label: 'Database Size', value: '2.4GB', icon: Database, color: 'bg-indigo-500' },
    { label: 'API Calls (24h)', value: '12.5K', icon: Activity, color: 'bg-orange-500' },
  ];

  const systemLogs = [
    { type: 'Security', message: 'New admin account created', severity: 'info', time: '1 hour ago' },
    { type: 'System', message: 'Database backup completed', severity: 'success', time: '3 hours ago' },
    { type: 'Security', message: 'Failed login attempt detected', severity: 'warning', time: '5 hours ago' },
    { type: 'System', message: 'Server maintenance scheduled', severity: 'info', time: '1 day ago' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Full system access and control. Welcome back, {user?.firstName || 'Super Admin'}!
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Controls */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Controls
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border-2 border-purple-200">
                  <Shield className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">User Roles</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border-2 border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">All Users</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border-2 border-green-200">
                  <Database className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Database</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border-2 border-orange-200">
                  <Activity className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Analytics</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border-2 border-indigo-200">
                  <BarChart3 className="w-8 h-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Reports</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border-2 border-red-200">
                  <Lock className="w-8 h-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Security</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors border-2 border-yellow-200">
                  <Calendar className="w-8 h-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Events</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200">
                  <Settings className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Config</span>
                </button>
              </div>

              {/* Admin Management Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Admin Management
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-linear-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-all border border-purple-200">
                    <p className="font-medium text-gray-900">Create New Admin Account</p>
                    <p className="text-sm text-gray-600">Grant admin privileges to users</p>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200">
                    <p className="font-medium text-gray-900">View All Administrators</p>
                    <p className="text-sm text-gray-600">Manage existing admin accounts</p>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-linear-to-r from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all border border-orange-200">
                    <p className="font-medium text-gray-900">Audit Log Viewer</p>
                    <p className="text-sm text-gray-600">Review system audit trails</p>
                  </button>
                </div>
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                System Logs
              </h2>
              <div className="space-y-4">
                {systemLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className={`w-3 h-3 ${getSeverityColor(log.severity)} rounded-full mt-2 shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase">{log.type}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 wrap-break-word">{log.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                View All Logs
              </button>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="mt-8 bg-linear-to-r from-purple-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Super Admin Account
                </h3>
                <p className="text-sm text-purple-100 mt-1">
                  Role: <span className="font-medium">{user?.role}</span> |
                  Email: <span className="font-medium">{user?.email}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SuperAdminDashboard;
