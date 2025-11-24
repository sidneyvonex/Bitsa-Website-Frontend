import { useState, useEffect } from 'react';
import { useGetAllCommunitiesQuery, useCreateCommunityMutation, useUpdateCommunityMutation, useDeleteCommunityMutation, useGetCommunityByIdQuery } from '../../features/api/communitiesApi';
import { Loader2, Plus, Search, Users, MessageCircle, Tag, Layers, X, Edit3, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminCommunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: communitiesData, isLoading, refetch } = useGetAllCommunitiesQuery();
  const { data: communityDetailsData } = useGetCommunityByIdQuery(editingId || '', { skip: !editingId });
  const [createCommunity] = useCreateCommunityMutation();
  const [updateCommunity] = useUpdateCommunityMutation();
  const [deleteCommunity] = useDeleteCommunityMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    whatsappLink: '',
    category: '',
    icon: '',
  });

  useEffect(() => {
    if (editingId && communityDetailsData?.data) {
      const community = communityDetailsData.data;
      setFormData({
        name: community.name || '',
        description: community.description || '',
        whatsappLink: community.whatsappLink || '',
        category: community.category || '',
        icon: community.icon || '',
      });
    }
  }, [editingId, communityDetailsData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateCommunity({
          id: editingId,
          data: formData,
        }).unwrap();
        toast.success('Community updated successfully!');
      } else {
        await createCommunity(formData).unwrap();
        toast.success('Community created successfully!');
      }
      setFormData({ name: '', description: '', whatsappLink: '', category: '', icon: '' });
      setShowCreate(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to save community');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Community?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCommunity(id).unwrap();
      toast.success('Community deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete community');
    }
  };

  const categoryOptions = ['Technology', 'Sports', 'Arts', 'Academic', 'Social', 'Gaming', 'Business', 'Other'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Communities Management</h2>
          <p className="text-gray-600 mt-2">Create and manage community groups</p>
        </div>
        <button
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingId(null);
            setFormData({ name: '', description: '', whatsappLink: '', category: '', icon: '' });
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="w-5 h-5" />
          New Community
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search communities by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-white text-gray-900 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Create/Edit Form - 2 Column Layout */}
      {showCreate && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              {editingId ? <Edit3 className="w-6 h-6 text-gray-700" /> : <Users className="w-6 h-6 text-gray-700" />}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Community' : 'Create Community'}</h3>
                <p className="text-sm text-gray-600 mt-1">{editingId ? 'Update community details' : 'Add a new community'}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowCreate(false);
                setEditingId(null);
                setFormData({ name: '', description: '', whatsappLink: '', category: '', icon: '' });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Visual & Icon */}
              <div className="space-y-6">
                {/* Icon Preview */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center min-h-60 flex flex-col items-center justify-center">
                  {formData.icon ? (
                    <div className="space-y-3 w-full">
                      <div className="text-6xl mb-2">{formData.icon}</div>
                      <input
                        type="text"
                        placeholder="Enter icon text or emoji"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full text-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: '' })}
                        className="w-full text-red-600 hover:text-red-700 font-medium py-2 hover:bg-red-50 rounded-lg transition"
                      >
                        Clear
                      </button>
                    </div>
                  ) : (
                    <>
                      <Users className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-700">Community Icon</p>
                      <p className="text-xs text-gray-600 mt-2">Enter text or emoji (optional)</p>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: 'Community' })}
                        className="mt-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                      >
                        Add Icon
                      </button>
                    </>
                  )}
                </div>

                {/* Category */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400 font-medium"
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-5">
                {/* Community Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Community Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Web Development Club"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 font-medium"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="What is this community about? Who should join?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 h-24 resize-none"
                    required
                  />
                </div>

                {/* WhatsApp Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Group Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://chat.whatsapp.com/..."
                    value={formData.whatsappLink}
                    onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-8 border-t border-gray-200 mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {editingId ? 'Update Community' : 'Create Community'}
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowCreate(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '', whatsappLink: '', category: '', icon: '' });
                }}
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Communities Grid Cards */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
        ) : communitiesData?.data?.communities?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communitiesData.data.communities.map(community => (
              <div
                key={(community.id || '') as string}
                className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
              >
                {/* Header with Icon & Category */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl flex items-center">{community.icon ? <span>{community.icon}</span> : <Users className="w-8 h-8 text-gray-400" />}</div>
                    {community.category && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {community.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{community.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3">{community.description}</p>

                  {/* WhatsApp Link */}
                  {community.whatsappLink && (
                    <a
                      href={community.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Join WhatsApp
                    </a>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditingId((community.id || '') as string);
                        setShowCreate(true);
                      }}
                      className="flex-1 px-4 py-2 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded font-medium text-sm transition flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete((community.id || '') as string)}
                      className="flex-1 px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded font-medium text-sm transition flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No communities yet</p>
            <p className="text-sm text-gray-500 mt-1">Create your first community to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
