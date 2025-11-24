import { Edit2, Trash2, Eye, Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import type { Blog } from '../../features/api/blogsApi';

interface BlogCardProps {
  blog: Blog;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BlogCard = ({ blog, onEdit, onDelete }: BlogCardProps) => {
  const blogId = blog.id || blog._id || '';
  const authorName = blog.authorFirstName && blog.authorLastName 
    ? `${blog.authorFirstName} ${blog.authorLastName}` 
    : 'Unknown Author';
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Cover Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {blog.coverImage ? (
          <img 
            src={blog.coverImage} 
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            blog.isPublished 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition">
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-700">{authorName}</span>
            {blog.authorRole && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {blog.authorRole}
              </span>
            )}
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
            </div>
            
            {blog.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
            )}

            {blog.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views} views</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onEdit(blogId)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-medium text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(blogId)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
