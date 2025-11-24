import { useState, useEffect } from 'react';
import { useGetAllProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, useGetProjectByIdQuery } from '../../features/api/projectApi';
import { Loader2, Plus, Edit3, Trash2, Search, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminProjects = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: projectsData, isLoading, refetch } = useGetAllProjectsQuery({ page, limit: 10, search: searchQuery });
  const { data: projectDetailsData } = useGetProjectByIdQuery(editingId || '', { skip: !editingId });
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: '',
  });

  useEffect(() => {
    if (editingId && projectDetailsData?.data) {
      const project = projectDetailsData.data;
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies?.join(', ') || project.techStack || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        category: project.category || '',
      });
    }
  }, [editingId, projectDetailsData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.title.trim()) {
        toast.error('Project title is required');
        setIsSubmitting(false);
        return;
      }

      const techArray = formData.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t);

      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: techArray,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        category: formData.category || 'General',
      };

      if (editingId) {
        await updateProject({
          id: editingId,
          data: projectData,
        }).unwrap();
        toast.success('Project updated successfully!');
      } else {
        await createProject(projectData).unwrap();
        toast.success('Project created successfully!');
      }
      setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', category: '' });
      setShowCreate(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Project?',
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
      await deleteProject(id).unwrap();
      toast.success('Project deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const categoryOptions = ['Technical', 'Creative', 'Business', 'Academic', 'General', 'Other'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-gray-600 mt-2">Create and manage student projects</p>
        </div>
        <button
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingId(null);
            setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', category: '' });
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="w-5 h-5" />
          Create Project
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreate && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              {editingId ? <Edit3 className="w-6 h-6 text-gray-700" /> : <Plus className="w-6 h-6 text-gray-700" />}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Project' : 'Create Project'}</h3>
                <p className="text-sm text-gray-600 mt-1">{editingId ? 'Update project details' : 'Add a new project'}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowCreate(false);
                setEditingId(null);
                setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', category: '' });
              }}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
              <input
                type="text"
                placeholder="e.g., Social Media App"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 font-medium"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Describe your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 h-24 resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g., React, Node.js, MongoDB"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Live URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select category</option>
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {editingId ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowCreate(false);
                  setEditingId(null);
                  setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', category: '' });
                }}
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
        ) : projectsData?.data?.projects?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.data.projects.map((project: any) => (
              <div key={project.id || project._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">{project.title}</h3>
                    {project.category && (
                      <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

                  {/* Technologies */}
                  {project.technologies && Array.isArray(project.technologies) && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                        <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Status */}
                  {project.status && (
                    <div className="flex items-center gap-2">
                      <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        project.status === 'completed' || project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' || project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  )}

                  {/* GitHub Link */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium underline"
                    >
                      View on GitHub →
                    </a>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditingId((project.id || project._id) as string);
                        setShowCreate(true);
                      }}
                      className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded font-medium text-sm transition flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete((project.id || project._id) as string)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded font-medium text-sm transition flex items-center justify-center gap-1"
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
            <p className="text-gray-600 font-medium">No projects yet</p>
            <p className="text-sm text-gray-500 mt-1">Create your first project to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
