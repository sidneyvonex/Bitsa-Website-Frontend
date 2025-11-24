import { useState } from 'react';
import { Search, Edit3, Trash2, Plus, Shield, Clock, Mail, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');

    // Mock user data
    const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john@bitsa.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
        { id: '2', name: 'Jane Smith', email: 'jane@bitsa.com', role: 'User', status: 'active', joinDate: '2024-02-20' },
        { id: '3', name: 'Bob Wilson', email: 'bob@bitsa.com', role: 'Partner', status: 'inactive', joinDate: '2024-03-10' },
        { id: '4', name: 'Alice Johnson', email: 'alice@bitsa.com', role: 'User', status: 'active', joinDate: '2024-04-05' },
        { id: '5', name: 'Charlie Brown', email: 'charlie@bitsa.com', role: 'Admin', status: 'active', joinDate: '2024-05-12' },
    ];

    const [users, setUsers] = useState(mockUsers);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleEdit = (_id: string) => {
        // Edit user functionality
        toast.info('Edit feature coming soon');
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Delete User?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter(u => u.id !== id));
                toast.success('User deleted successfully');
            }
        });
    };

    const handleToggleStatus = (id: string) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
        ));
        toast.success('User status updated');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-600 mt-2">Manage platform users, admins, and partners</p>
                </div>
                <button
                    onClick={() => toast.info('Add user feature coming soon')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add User
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="all">All Roles</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Partner">Partner</option>
                    </select>
                </div>

                <p className="text-sm text-gray-600">
                    Found <span className="font-semibold">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Join Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.role === 'Admin' ? 'bg-orange-100 text-orange-700' :
                                                user.role === 'Partner' ? 'bg-purple-100 text-purple-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {user.role === 'Admin' || user.role === 'Partner' && <Shield className="w-3 h-3" />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${
                                                    user.status === 'active'
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {user.status === 'active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                {user.status === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {new Date(user.joinDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(user.id)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg transition"
                                                >
                                                    <Edit3 className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
