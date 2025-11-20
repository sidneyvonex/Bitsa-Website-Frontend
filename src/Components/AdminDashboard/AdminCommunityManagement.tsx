import { useState } from 'react';
import {
    Globe,
    Search,
    Users,
    Plus,
    Edit2,
    Trash2,
    X,
    Save,
} from 'lucide-react';
import {
    useGetAllCommunitiesQuery,
    useCreateCommunityMutation,
    useUpdateCommunityMutation,
    useDeleteCommunityMutation,
} from '../../features/api/communitiesApi';
import { toast } from 'sonner';

export const AdminCommunityManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCommunity, setEditingCommunity] = useState<{
        _id: string;
        name: string;
        description: string;
        icon: string;
        category: string;
    } | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '',
        category: '',
    });

    const { data: communitiesData, isLoading, refetch } = useGetAllCommunitiesQuery();
    const [createCommunity] = useCreateCommunityMutation();
    const [updateCommunity] = useUpdateCommunityMutation();
    const [deleteCommunity] = useDeleteCommunityMutation();

    const communities = communitiesData?.data || [];

    const filteredCommunities = communities.filter((community) =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async () => {
        if (!formData.name || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            await createCommunity(formData).unwrap();
            toast.success('Community created successfully');
            setShowCreateModal(false);
            resetForm();
            refetch();
        } catch (error) {
            toast.error('Failed to create community');
        }
    };

    const handleUpdate = async () => {
        if (!editingCommunity) return;

        try {
            await updateCommunity({
                id: editingCommunity._id,
                data: formData,
            }).unwrap();

            toast.success('Community updated successfully');
            setShowEditModal(false);
            setEditingCommunity(null);
            resetForm();
            refetch();
        } catch (error) {
            toast.error('Failed to update community');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this community?')) return;

        try {
            await deleteCommunity(id).unwrap();
            toast.success('Community deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete community');
        }
    };

    const handleEdit = (community: typeof editingCommunity) => {
        if (!community) return;
        setEditingCommunity(community);
        setFormData({
            name: community.name,
            description: community.description,
            icon: community.icon || '',
            category: community.category || '',
        });
        setShowEditModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            icon: '',
            category: '',
        });
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
                        <Globe className="w-8 h-8 text-[#5773da]" />
                        Community Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage platform communities</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create Community
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search communities by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                    <div
                        key={community._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-br from-[#5773da] to-[#4861c9] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                                    {community.icon || community.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{community.name}</h3>
                                    <span className="text-xs text-gray-600">{community.category}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{community.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{community.memberCount} members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(community)}
                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(community._id)}
                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {showCreateModal ? 'Create New Community' : 'Edit Community'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setShowEditModal(false);
                                    resetForm();
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Community Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="Enter community name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="Enter community description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon (emoji or URL)
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="🎨 or https://example.com/icon.png"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="e.g., Technology, Design, Business"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setShowEditModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={showCreateModal ? handleCreate : handleUpdate}
                                    className="flex-1 px-4 py-2 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    {showCreateModal ? 'Create Community' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
