import { useState, useEffect, useRef } from 'react';
import { useGetAdminInterestsQuery, useCreateInterestMutation, useDeleteInterestMutation, useUpdateInterestMutation, useGetInterestByIdQuery } from '../../features/api/interestsApi';
import { Loader2, Plus, Edit3, Trash2, Search, Check, X, Users, Code, Palette, Zap, Lightbulb, Target, Cpu, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

// Icon options for interests
const iconOptions = [
  { id: 'code', label: 'Code', icon: Code },
  { id: 'palette', label: 'Design', icon: Palette },
  { id: 'zap', label: 'Energy', icon: Zap },
  { id: 'lightbulb', label: 'Ideas', icon: Lightbulb },
  { id: 'target', label: 'Target', icon: Target },
  { id: 'cpu', label: 'Tech', icon: Cpu },
  { id: 'users', label: 'Community', icon: Users },
];

export const AdminInterests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('code');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { data: interestsData, isLoading, refetch } = useGetAdminInterestsQuery();
  const { data: interestDetailsData } = useGetInterestByIdQuery(editingId || '', { skip: !editingId });
  const [createInterest] = useCreateInterestMutation();
  const [updateInterest] = useUpdateInterestMutation();
  const [deleteInterest] = useDeleteInterestMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });

  // Auto-fill form when editing
  useEffect(() => {
    if (editingId && interestDetailsData?.data) {
      const interest = interestDetailsData.data;
      setFormData({
        name: interest.name || '',
        description: interest.description || '',
        category: interest.category || '',
      });
      // Set icon from data or default
      const iconId = iconOptions.find(opt => opt.label === interest.icon)?.id || 'code';
      setSelectedIcon(iconId);
    }
  }, [editingId, interestDetailsData]);

  // Get icon component by id
  const getIconComponent = (iconId: string) => {
    const iconOption = iconOptions.find(opt => opt.id === iconId);
    return iconOption ? iconOption.icon : Code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.name.trim()) {
        toast.error('Interest name is required');
        setIsSubmitting(false);
        return;
      }

      const iconLabel = iconOptions.find(opt => opt.id === selectedIcon)?.label || 'Code';

      if (editingId) {
        await updateInterest({
          id: editingId,
          data: {
            name: formData.name,
            description: formData.description,
            icon: iconLabel,
            category: formData.category || 'General',
          },
        }).unwrap();
        toast.success('Interest updated successfully!');
      } else {
        await createInterest({
          name: formData.name,
          description: formData.description,
          icon: iconLabel,
          category: formData.category || 'General',
        }).unwrap();
        toast.success('Interest created successfully!');
      }

      setFormData({ name: '', description: '', category: '' });
      setSelectedIcon('code');
      setShowModal(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to save interest');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Interest?',
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
      await deleteInterest(id).unwrap();
      toast.success('Interest deleted');
      setOpenMenuId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to delete interest');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', description: '', category: '' });
    setSelectedIcon('code');
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setShowModal(true);
    setOpenMenuId(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isInside = false;
      for (const ref of Object.values(menuRefs.current)) {
        if (ref?.contains(event.target as Node)) {
          isInside = true;
          break;
        }
      }
      if (!isInside) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse response data
  let interests: any[] = [];
  if (interestsData) {
    if (Array.isArray(interestsData)) {
      interests = interestsData;
    } else if (interestsData.data && Array.isArray(interestsData.data)) {
      interests = interestsData.data;
    } else if (interestsData.interests && Array.isArray(interestsData.interests)) {
      interests = interestsData.interests;
    }
  }

  // Filter by search query
  const filteredInterests = interests.filter((interest) =>
    interest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interest.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Interests Management</h2>
          <p className="text-gray-600 mt-2">Create and manage student interests</p>
        </div>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setFormData({ name: '', description: '', category: '' });
            setSelectedIcon('code');
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="w-5 h-5" />
          New Interest
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              {editingId ? <Edit3 className="w-6 h-6 text-gray-700" /> : <Plus className="w-6 h-6 text-gray-700" />}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Interest' : 'Create Interest'}</h3>
                <p className="text-sm text-gray-600 mt-1">{editingId ? 'Update interest details' : 'Add a new student interest'}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Name *</label>
              <input
                type="text"
                placeholder="e.g., Web Development, AI/ML, Design"
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
                placeholder="What is this interest about?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 h-20 resize-none"
              />
            </div>

            {/* Icon Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Icon</label>
              <div className="grid grid-cols-4 gap-3">
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedIcon === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedIcon(option.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition ${
                        isSelected
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-gray-700 mb-1" />
                      <span className="text-xs font-medium text-gray-600">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                placeholder="e.g., Technical, Creative, General"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {editingId ? 'Update Interest' : 'Create Interest'}
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interests List */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
        ) : filteredInterests && filteredInterests.length ? (
          <div className="space-y-2">
            {filteredInterests.map((interest: any) => {
              const IconComponent = getIconComponent(
                iconOptions.find(opt => opt.label === interest.icon)?.id || 'code'
              );
              const interestId = interest.id || interest._id;
              const isMenuOpen = openMenuId === interestId;

              return (
                <div
                  key={interestId}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between p-4 relative">
                    {/* Left Side - Icon and Basic Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-700" />
                      </div>

                      {/* Name and Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{interest.name}</h3>
                          {interest.category && (
                            <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              {interest.category}
                            </span>
                          )}
                        </div>
                        {interest.description && (
                          <p className="text-xs text-gray-600 truncate">{interest.description}</p>
                        )}
                      </div>

                      {/* Member Count */}
                      <div className="flex-shrink-0 flex items-center gap-1 bg-blue-50 rounded-lg px-3 py-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">
                          {interest.userCount || 0}
                        </span>
                      </div>
                    </div>

                    {/* Right Side - Actions Menu */}
                    <div className="flex-shrink-0 relative ml-4">
                      <button
                        onClick={() => setOpenMenuId(isMenuOpen ? null : interestId)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          ref={(el) => {
                            if (el) menuRefs.current[interestId] = el;
                          }}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                        >
                          <button
                            onClick={() => handleEditClick(interestId)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 border-b border-gray-100"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(interestId)}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 font-medium">No interests yet</p>
            <p className="text-sm text-gray-500 mt-1">Create your first interest to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
