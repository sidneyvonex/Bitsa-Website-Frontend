import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, User, ExternalLink, RefreshCw, Search, Filter } from 'lucide-react';
import { useGetAllBlogsQuery, useGetBlogCategoriesQuery } from '../../features/api/blogsApi';
import type { Blog } from '../../features/api/blogsApi';

const skeletonItems = Array.from({ length: 6 });

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg mb-4" />
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-full bg-gray-100 rounded mb-2" />
    <div className="h-4 w-5/6 bg-gray-100 rounded" />
  </div>
);

const BlogCard = ({ blog }: { blog: Blog }) => {
  const blogImage = blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';
  const authorName = blog.author?.firstName && blog.author?.lastName
    ? `${blog.author.firstName} ${blog.author.lastName}`
    : blog.author?.email?.split('@')[0] || 'Anonymous';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Blog Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={blogImage}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';
          }}
        />
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt || blog.content?.substring(0, 150)}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{authorName}</span>
            </div>
            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Read More Link */}
        <Link
          to={`/blogs/${blog._id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read More
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export const MyBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogsData,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    refetch: refetchBlogs,
    isFetching: isFetchingBlogs,
  } = useGetAllBlogsQuery({
    page: currentPage,
    limit: 12,
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
  });

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
  } = useGetBlogCategoriesQuery();

  const blogs = useMemo(() => blogsData?.data?.blogs || [], [blogsData]);
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData]);
  const pagination = blogsData?.data?.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetchBlogs();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
        <p className="text-gray-600 mt-1">Read the latest articles and insights from BITSA</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Category Filters */}
        {!isLoadingCategories && categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error State */}
      {isErrorBlogs && (
        <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl">
          <p>We couldn&apos;t load blogs. Please try again.</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            onClick={() => refetchBlogs()}
          >
            <RefreshCw className={`w-4 h-4 ${isFetchingBlogs ? 'animate-spin' : ''}`} />
            Retry
          </button>
        </div>
      )}

      {/* Blogs Grid */}
      {isLoadingBlogs ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skeletonItems.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'No blogs available at this time.'}
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                disabled={currentPage === pagination.totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

