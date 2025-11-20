import { useState } from 'react';
import {
    FileText,
    Search,
    Filter,
    PenSquare,
    Edit2,
    Trash2,
    Eye,
    Heart,
    X,
    Save,
} from 'lucide-react';
import {
    useGetAllBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} from '../../features/api/blogsApi';
import { toast } from 'sonner';

export const AdminBlogManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setcategoryFilter] = useState<string>('');
    const [page, setPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<{
        _id: string;
        title: string;
        content: string;
        excerpt: string;
        category: string;
        image?: string;
        tags: string[];
        isPublished: boolean;
    } | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        image: '',
        tags: [] as string[],
        isPublished: false,
    });

    const { data: blogsData, isLoading, refetch } = useGetAllBlogsQuery({
        page,
        limit: 12,
        category: categoryFilter || undefined,
    });

    const [createBlog] = useCreateBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    const blogs = blogsData?.data?.blogs || [];

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async () => {
        if (!formData.title || !formData.content || !formData.excerpt) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            await createBlog(formData).unwrap();
            toast.success('Blog created successfully');
            setShowCreateModal(false);
            resetForm();
            refetch();
        } catch (error) {
            toast.error('Failed to create blog');
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!editingBlog) return;

        try {
            await updateBlog({
                id: editingBlog._id,
                data: formData,
            }).unwrap();

            toast.success('Blog updated successfully');
            setShowEditModal(false);
            setEditingBlog(null);
            resetForm();
            refetch();
        } catch (error) {
            toast.error('Failed to update blog');
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            await deleteBlog(id).unwrap();
            toast.success('Blog deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete blog');
            console.error(error);
        }
    };

    const handleEdit = (blog: typeof editingBlog) => {
        if (!blog) return;
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            category: blog.category,
            image: blog.image || '',
            tags: blog.tags || [],
            isPublished: blog.isPublished,
        });
        setShowEditModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: '',
            image: '',
            tags: [],
            isPublished: false,
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
                        <FileText className="w-8 h-8 text-[#5773da]" />
                        Blog Management
                    </h1>
                    <p className="text-gray-600 mt-1">Create and manage blog posts</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <PenSquare className="w-5 h-5" />
                    Create Blog
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search blogs by title or excerpt..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setcategoryFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Career">Career</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {blog.image && (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                                    {blog.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                                    blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {blog.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {blog.views}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {blog.likes}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                                <div className="flex-1"></div>
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">Page {page}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!blogsData?.data?.pagination || page >= blogsData.data.pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 my-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {showCreateModal ? 'Create New Blog' : 'Edit Blog'}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    className="w-4 h-4 text-[#5773da] rounded focus:ring-2 focus:ring-[#5773da]"
                                />
                                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                                    Publish immediately
                                </label>
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
                                    {showCreateModal ? 'Create Blog' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
