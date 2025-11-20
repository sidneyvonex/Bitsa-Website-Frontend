import { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    UserPlus,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    X,
    Save,
} from 'lucide-react';
import {
    useGetAllUsersQuery,
    useUpdateUserBySchoolIdMutation,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useActivateUserMutation,
    useDeactivateUserMutation,
} from '../../features/api/userApi';
import { toast } from 'sonner';

interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    schoolId: string;
    role: 'Student' | 'Admin' | 'SuperAdmin';
    major: string;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
}

export const AdminUserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [page, setPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // API hooks
    const { data: usersData, isLoading, refetch } = useGetAllUsersQuery({
        page,
        limit: 10,
        role: roleFilter || undefined,
    });

    const [updateUser] = useUpdateUserBySchoolIdMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [activateUser] = useActivateUserMutation();
    const [deactivateUser] = useDeactivateUserMutation();

    const users = usersData?.data || [];

    // Filter users by search term
    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.schoolId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        if (!editingUser) return;

        try {
            await updateUser({
                schoolId: editingUser.schoolId,
                data: {
                    firstName: editingUser.firstName,
                    lastName: editingUser.lastName,
                    major: editingUser.major,
                },
            }).unwrap();

            toast.success('User updated successfully');
            setShowEditModal(false);
            setEditingUser(null);
            refetch();
        } catch (error) {
            toast.error('Failed to update user');
            console.error(error);
        }
    };

    const handleDelete = async (schoolId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(schoolId).unwrap();
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete user');
            console.error(error);
        }
    };

    const handleToggleActive = async (user: User) => {
        try {
            if (user.isActive) {
                await deactivateUser(user.schoolId).unwrap();
                toast.success('User deactivated');
            } else {
                await activateUser(user.schoolId).unwrap();
                toast.success('User activated');
            }
            refetch();
        } catch (error) {
            toast.error('Failed to update user status');
            console.error(error);
        }
    };

    const handleRoleChange = async (user: User, newRole: 'Student' | 'Admin' | 'SuperAdmin') => {
        if (!confirm(`Change ${user.firstName}'s role to ${newRole}?`)) return;

        try {
            await updateUserRole({
                schoolId: user.schoolId,
                role: newRole,
            }).unwrap();
            toast.success('User role updated');
            refetch();
        } catch (error) {
            toast.error('Failed to update user role');
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5773da]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-8 h-8 text-[#5773da]" />
                        User Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage all platform users</p>
                </div>
                <button className="px-4 py-2 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <UserPlus className="w-5 h-5" />
                    Add New User
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users by name, email, or school ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">All Roles</option>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">School ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Major</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#5773da] flex items-center justify-center text-white font-semibold">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-900 font-mono">{user.schoolId}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-900">{user.major || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value as 'Student' | 'Admin' | 'SuperAdmin')}
                                            className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                        >
                                            <option value="Student">Student</option>
                                            <option value="Admin">Admin</option>
                                            <option value="SuperAdmin">SuperAdmin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                {user.isVerified ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                )}
                                                <span className="text-xs text-gray-600">
                                                    {user.isVerified ? 'Verified' : 'Unverified'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleToggleActive(user)}
                                                className={`text-xs px-2 py-1 rounded ${
                                                    user.isActive
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                title="Edit user"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.schoolId)}
                                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                title="Delete user"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Showing {filteredUsers.length} users
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.firstName}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, firstName: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.lastName}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, lastName: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Major
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.major}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, major: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="flex-1 px-4 py-2 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
