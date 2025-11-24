import { useState, useEffect } from 'react';
import { useGetAllBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useGetBlogByIdQuery } from '../../features/api/blogsApi';
import { useGenerateBlogContentMutation } from '../../features/api/aiApi';
import { Loader2, Plus, Sparkles, Search, Bold, Italic, List, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { BlogCard } from './BlogCard';

export const AdminBlogs = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: blogsData, isLoading, refetch } = useGetAllBlogsQuery({ page, limit: 10, search: searchQuery });
  const { data: blogDetailsData } = useGetBlogByIdQuery(editingId || '', { skip: !editingId });
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [generateBlogContent] = useGenerateBlogContentMutation();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    image: '',
    tags: '',
    isPublished: false,
  });

  // Load blog data when editing
  useEffect(() => {
    if (editingId && blogDetailsData?.data) {
      const blog = blogDetailsData.data;
      let tagsString = '';
      if (blog.tags && Array.isArray(blog.tags)) {
        tagsString = blog.tags.join(', ');
      } else if (typeof blog.tags === 'string') {
        tagsString = blog.tags;
      }
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        category: blog.category || '',
        image: blog.coverImage || '',
        tags: tagsString,
        isPublished: blog.isPublished || false,
      });
    }
  }, [editingId, blogDetailsData]);

  const handleCloudinaryUpload = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      console.log('Upload started for file:', file.name);
      console.log('Cloud Name:', cloudName);
      console.log('Upload Preset:', uploadPreset);

      if (!cloudName || !uploadPreset) {
        console.error('Missing Cloudinary config - Cloud Name:', cloudName, 'Preset:', uploadPreset);
        toast.error('Cloudinary not configured');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      console.log('Starting Cloudinary upload...');

      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', uploadPreset);

      // Use XMLHttpRequest to track upload progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
            console.log('Upload progress:', progress + '%');
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log('Upload successful, URL:', data.secure_url);
            setUploadProgress(100);
            setFormData(prev => ({ ...prev, image: data.secure_url }));
            toast.success('Image uploaded successfully');
            
            // Delay reset to allow image preview to render
            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
            }, 500);
            
            resolve(data);
          } else {
            const errorData = JSON.parse(xhr.responseText);
            console.error('Cloudinary error response:', errorData);
            toast.error(`Upload failed: ${xhr.statusText}`);
            setIsUploading(false);
            setUploadProgress(0);
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener('error', () => {
          console.error('Upload error');
          toast.error('Failed to upload image');
          setIsUploading(false);
          setUploadProgress(0);
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
        xhr.send(formDataCloud);
      });
    } catch (error) {
      console.error('Cloudinary error:', error);
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const applyFormatting = (formatType: 'bold' | 'italic' | 'bullet') => {
    const textarea = document.querySelector('textarea[placeholder*="Write the main"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || 'text';
    let newText = '';

    switch (formatType) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'bullet':
        newText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
        break;
    }

    const updatedContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: updatedContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleAIGenerate = async () => {
    if (!formData.title || !formData.category) {
      toast.error('Please enter title and category');
      return;
    }

    setAiGenerating(true);
    try {
      const result = await generateBlogContent({
        topic: formData.title,
        category: formData.category,
        tone: 'formal',
      }).unwrap();

      let tagsString = '';
      if (result.data?.suggestedTags && Array.isArray(result.data.suggestedTags)) {
        tagsString = result.data.suggestedTags.join(', ');
      }

      setFormData(prev => ({
        ...prev,
        content: result.data?.content || '',
        excerpt: result.data?.excerpt || '',
        tags: tagsString,
      }));

      toast.success('Blog content generated!');
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('Failed to generate content');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const blogPayload = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        image: formData.image,
        coverImage: formData.image,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        isPublished: formData.isPublished,
      };

      console.log('Sending blog payload:', blogPayload);

      if (editingId) {
        await updateBlog({
          id: editingId,
          data: blogPayload,
        }).unwrap();
        toast.success('Blog updated successfully!');
      } else {
        await createBlog(blogPayload).unwrap();
        toast.success('Blog published successfully!');
      }
      setFormData({ title: '', content: '', excerpt: '', category: '', image: '', tags: '', isPublished: false });
      setShowCreate(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Blog?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5773da',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBlog(id).unwrap();
      toast.success('Blog deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blogs Management</h2>
          <p className="text-gray-600 mt-2">Create and manage blog posts</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 bg-[#5773da] text-white px-4 py-2 rounded-lg hover:bg-[#4861c9] transition"
        >
          <Plus className="w-5 h-5" />
          New Blog
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-[#5773da] bg-white text-gray-900 placeholder-gray-700"
          />
        </div>
      </div>

      {/* Create/Edit Form - LinkedIn Article Style */}
      {showCreate && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Article' : 'Publish new article'}
            </h3>
            <button
              onClick={() => {
                setShowCreate(false);
                setEditingId(null);
                setFormData({ title: '', content: '', excerpt: '', category: '', image: '', tags: '', isPublished: false });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0">
            {/* Cover Image Upload Section */}
            <div className="border-b border-gray-200 p-8 bg-gray-50">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition">
                {formData.image ? (
                  <div className="space-y-4">
                    <img src={formData.image} alt="Cover preview" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isUploading ? (
                      <>
                        <div className="flex justify-center">
                          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        </div>
                        <div className="text-gray-700 font-medium">Uploading... {uploadProgress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <Upload className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className="text-gray-700 font-medium">Add a cover image or video to your article</div>
                        <button
                          type="button"
                          onClick={() => document.getElementById('cover-image-input')?.click()}
                          className="inline-flex items-center gap-2 bg-white border border-gray-400 px-4 py-2 rounded-full hover:bg-gray-50 transition font-medium text-gray-700"
                        >
                          <Upload className="w-4 h-4" />
                          Upload from computer
                        </button>
                        <input
                          id="cover-image-input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files && handleCloudinaryUpload(e.target.files[0])}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Title</label>
                <input
                  type="text"
                  placeholder="Give your article a clear, compelling title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-3xl font-bold px-4 py-3 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#5773da]"
                  required
                />
                <p className="text-xs text-gray-500">Recommended: 40-60 characters</p>
              </div>

              {/* Metadata Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <input
                    type="text"
                    placeholder="Enter article category (e.g., Technology, Business, Education)"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#5773da]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Excerpt</label>
                  <input
                    type="text"
                    placeholder="Brief summary for preview"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    maxLength={160}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#5773da]"
                  />
                  <p className="text-xs text-gray-500">{formData.excerpt.length}/160 characters</p>
                </div>
              </div>

              {/* Content with formatting toolbar */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Article Content</label>
                <div className="border border-gray-400 rounded-lg overflow-hidden bg-white">
                  {/* Formatting Toolbar */}
                  <div className="flex gap-1 p-3 border-b border-gray-200 bg-gray-50 flex-wrap">
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        applyFormatting('bold');
                      }}
                      className="p-2 hover:bg-gray-200 active:bg-gray-300 rounded transition text-gray-700" 
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        applyFormatting('italic');
                      }}
                      className="p-2 hover:bg-gray-200 active:bg-gray-300 rounded transition text-gray-700" 
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        applyFormatting('bullet');
                      }}
                      className="p-2 hover:bg-gray-200 active:bg-gray-300 rounded transition text-gray-700" 
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Textarea */}
                  <textarea
                    placeholder="Write the main content of your article here. You can include multiple paragraphs, lists, and more."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none resize-none h-64 bg-white"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">{formData.content.length} characters</p>
              </div>

              {/* AI Generate */}
              <button
                type="button"
                onClick={handleAIGenerate}
                disabled={aiGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition font-medium"
              >
                {aiGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {aiGenerating ? 'Generating...' : 'Generate Content with AI'}
              </button>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., technology, AI, business)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#5773da]"
                />
              </div>

              {/* Publish Status */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <input
                  type="checkbox"
                  id="publish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="publish" className="flex-1 cursor-pointer">
                  <div className="font-medium text-gray-900">Publish immediately</div>
                  <p className="text-xs text-gray-600">Make this article visible to your audience</p>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#5773da] text-white px-6 py-3 rounded-lg hover:bg-[#4861c9] disabled:bg-[#4861c9] disabled:opacity-75 transition font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {editingId ? 'Updating...' : 'Publishing...'}
                    </>
                  ) : (
                    editingId ? 'Update Article' : 'Publish Article'
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setShowCreate(false);
                    setEditingId(null);
                    setFormData({ title: '', content: '', excerpt: '', category: '', image: '', tags: '', isPublished: false });
                  }}
                  className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List - Grid Layout */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
          </div>
        ) : blogsData?.data?.blogs?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsData.data.blogs.map(blog => (
              <BlogCard
                key={blog.id || blog._id}
                blog={blog}
                onEdit={(id) => {
                  setEditingId(id);
                  setShowCreate(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">No blogs found</div>
        )}
      </div>
    </div>
  );
};
