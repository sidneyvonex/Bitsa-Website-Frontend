import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Tag, Users, TrendingUp } from 'lucide-react';
import {
    useGetAdminInterestsQuery,
    useCreateInterestMutation,
    useUpdateInterestMutation,
    useDeleteInterestMutation,
} from '../../features/api/interestsApi';
import type { Interest } from '../../features/api/interestsApi';
import { toast } from 'sonner';

export default function AdminInterestsManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingInterest, setEditingInterest] = useState<Interest | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'General',
        description: '',
        icon: '',
    });

    const { data: interestsData, isLoading, refetch } = useGetAdminInterestsQuery();
    const [createInterest, { isLoading: creating }] = useCreateInterestMutation();
    const [updateInterest, { isLoading: updating }] = useUpdateInterestMutation();
    const [deleteInterest] = useDeleteInterestMutation();

    const interests = interestsData?.data || interestsData?.interests || [];

    const filteredInterests = interests.filter((interest) =>
        interest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interest.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate statistics
    const totalInterests = interests.length;
    const totalUsers = interests.reduce((sum, interest) => sum + (interest.userCount || 0), 0);
    const categoriesCount = new Set(interests.map((i) => i.category)).size;

    const handleOpenModal = (interest?: Interest) => {
        if (interest) {
            setEditingInterest(interest);
            setFormData({
                name: interest.name,
                category: interest.category || '',
                description: interest.description || '',
                icon: interest.icon || '',
            });
        } else {
            setEditingInterest(null);
            setFormData({ name: '', category: 'General', description: '', icon: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingInterest(null);
        setFormData({ name: '', category: 'General', description: '', icon: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingInterest) {
                await updateInterest({
                    id: (editingInterest._id || editingInterest.id) as string,
                    data: formData,
                }).unwrap();
                toast.success('Interest updated successfully');
            } else {
                await createInterest(formData).unwrap();
                toast.success('Interest created successfully');
            }
            handleCloseModal();
            refetch();
        } catch (error) {
            const message = error && typeof error === 'object' && 'data' in error && 
                           error.data && typeof error.data === 'object' && 'message' in error.data
                           ? String(error.data.message)
                           : 'Operation failed';
            toast.error(message);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this interest?')) {
            try {
                await deleteInterest(id).unwrap();
                toast.success('Interest deleted successfully');
                refetch();
            } catch (error) {
                const message = error && typeof error === 'object' && 'data' in error && 
                               error.data && typeof error.data === 'object' && 'message' in error.data
                               ? String(error.data.message)
                               : 'Failed to delete interest';
                toast.error(message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5773da]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Interests Management</h1>
                    <p className="text-gray-600 mt-1">Manage user interests and categories</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5773da] text-white rounded-xl hover:bg-[#4861c9] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Interest
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Tag className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Interests</p>
                            <p className="text-2xl font-bold text-gray-900">{totalInterests}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Users with Interests</p>
                            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Categories</p>
                            <p className="text-2xl font-bold text-gray-900">{categoriesCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search interests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                    />
                </div>
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredInterests.map((interest) => (
                    <div
                        key={interest._id || interest.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {interest.icon ? (
                                    <span className="text-2xl">{interest.icon}</span>
                                ) : (
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Tag className="w-5 h-5 text-gray-600" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{interest.name}</h3>
                                    {interest.category && (
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                            {interest.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleOpenModal(interest)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete((interest._id || interest.id) as string)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {interest.description && (
                            <p className="text-sm text-gray-600 mb-3">{interest.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{interest.userCount || 0} users</span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredInterests.length === 0 && (
                <div className="text-center py-12">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No interests found</p>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingInterest ? 'Edit Interest' : 'Create Interest'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Interest Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="e.g., Machine Learning"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="e.g., Technology"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5773da] min-h-[100px]"
                                    placeholder="Brief description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon (Emoji)
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    placeholder="🤖"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating || updating}
                                    className="flex-1 px-4 py-2 bg-[#5773da] text-white rounded-xl hover:bg-[#4861c9] transition-colors disabled:opacity-50"
                                >
                                    {creating || updating ? 'Saving...' : editingInterest ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
