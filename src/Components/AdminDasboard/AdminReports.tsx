import { useState, useEffect } from 'react';
import { useGetAllReportsQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation, useGetReportByIdQuery } from '../../features/api/reportsApi';
import { Loader2, Plus, Trash2, Download, Search, FileText, Check, X, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { data: reportsData, isLoading, refetch } = useGetAllReportsQuery();
  const { data: reportDetailsData } = useGetReportByIdQuery(editingId || '', { skip: !editingId });
  const [createReport] = useCreateReportMutation();
  const [updateReport] = useUpdateReportMutation();
  const [deleteReport] = useDeleteReportMutation();

  // Download handler - open file URL directly
  const handleDownload = (fileUrl: string) => {
    if (!fileUrl) {
      toast.error('No file to download');
      return;
    }

    try {
      // Open in new tab - browser handles download for documents
      window.open(fileUrl, '_blank');
      toast.success('Opening file...');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to open file');
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fileUrl: '',
  });

  // Auto-fill form when editing
  useEffect(() => {
    if (editingId && reportDetailsData?.data) {
      const report = reportDetailsData.data;
      setFormData({
        title: report.title || '',
        content: report.description || '',
        fileUrl: report.fileUrl || '',
      });
    }
  }, [editingId, reportDetailsData]);

  const handleCloudinaryUpload = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error('Cloudinary not configured');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', uploadPreset);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setUploadProgress(100);
            setFormData(prev => ({ ...prev, fileUrl: data.secure_url }));
            toast.success('File uploaded successfully');
            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
            }, 500);
            resolve(data.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          toast.error('Upload failed');
          setIsUploading(false);
          setUploadProgress(0);
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
        xhr.send(formDataCloud);
      });
    } catch (error) {
      toast.error('Failed to upload file');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.title.trim()) {
        toast.error('Report title is required');
        setIsSubmitting(false);
        return;
      }

      if (!formData.fileUrl) {
        toast.error('Please upload a file');
        setIsSubmitting(false);
        return;
      }

      if (editingId) {
        await updateReport({
          id: editingId,
          data: {
            title: formData.title,
            content: formData.content,
            fileUrl: formData.fileUrl,
          },
        }).unwrap();
        toast.success('Report updated successfully!');
      } else {
        await createReport({
          title: formData.title,
          content: formData.content,
          fileUrl: formData.fileUrl,
        }).unwrap();
        toast.success('Report created successfully!');
      }

      setFormData({ title: '', content: '', fileUrl: '' });
      setShowDrawer(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to save report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Report?',
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
      await deleteReport(id).unwrap();
      toast.success('Report deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditingId(null);
    setFormData({ title: '', content: '', fileUrl: '' });
    setUploadProgress(0);
    setIsUploading(false);
  };

  const filteredReports = (() => {
    const reports = reportsData?.data?.reports || [];
    return reports.filter((report: any) =>
      report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports Management</h2>
          <p className="text-gray-600 mt-2">Upload and manage reports, documents, and research materials</p>
        </div>
        <button
          onClick={() => {
            setShowDrawer(true);
            setEditingId(null);
            setFormData({ title: '', content: '', fileUrl: '' });
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="w-5 h-5" />
          New Report
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
        ) : filteredReports.length ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Downloads</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report: any) => (
                  <tr key={report._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{report.title}</p>
                          {report.description && (
                            <p className="text-xs text-gray-600 truncate">{report.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {report.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Download className="w-4 h-4" />
                        {report.downloads || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(report.fileUrl)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition flex items-center gap-1"
                          title="Download"
                          disabled={!report.fileUrl}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(report._id);
                            setShowDrawer(true);
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded transition flex items-center gap-1"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition flex items-center gap-1"
                          title="Delete"
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
        ) : (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No reports found</p>
            <p className="text-sm text-gray-500 mt-1">Upload your first report to get started</p>
          </div>
        )}
      </div>

      {/* Right-side Drawer */}
      {showDrawer && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 backdrop-blur-md bg-white/10 z-40"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0">
              <div className="flex items-center gap-3">
                {editingId ? <Edit3 className="w-6 h-6 text-gray-700" /> : <Plus className="w-6 h-6 text-gray-700" />}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Report' : 'New Report'}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{editingId ? 'Update report details' : 'Create a new report'}</p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Report Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Q4 2024 Financial Report"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 font-medium"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <textarea
                  placeholder="Write the report content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 h-24 resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">File Upload (PDF, DOC, etc.) *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    onChange={(e) => e.target.files && handleCloudinaryUpload(e.target.files[0])}
                    disabled={isUploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 disabled:opacity-50"
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && uploadProgress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Uploading...</span>
                      <span className="text-xs font-medium text-gray-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* File Uploaded Indicator */}
                {formData.fileUrl && !isUploading && (
                  <div className="mt-3 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-green-800 truncate">File uploaded successfully</p>
                      <a 
                        href={formData.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-green-700 hover:text-green-900 truncate block"
                      >
                        View file
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
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
                      {editingId ? 'Update Report' : 'Create Report'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || isUploading}
                  onClick={closeDrawer}
                  className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
