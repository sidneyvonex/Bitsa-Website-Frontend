/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { FileText, Search, Loader2, Calendar } from 'lucide-react';
import { useGetAllBlogsQuery } from '../../features/api';
import { Link } from 'react-router-dom';

export const StudentBlogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: blogsData, isLoading } = useGetAllBlogsQuery({ page: 1, limit: 50 });

    const filteredBlogs = useMemo(() => {
        const allBlogs = (blogsData?.data?.blogs || blogsData?.data || []) as any[];
        return allBlogs.filter((blog: any) => {
            const matchesSearch = !searchQuery || 
                blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [blogsData, searchQuery]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Articles</h1>
                <p className="text-gray-600 text-lg">Read the latest articles and insights from BITSA</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
                </div>
            ) : filteredBlogs.length > 0 ? (
                <div className="space-y-6">
                    {filteredBlogs.map((blog: any) => (
                        <Link
                            key={blog._id}
                            to={`/dashboard/blogs/${blog.slug || blog._id}`}
                            className="group bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                        >
                            {blog.coverImage && (
                                <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                                    <img
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-[#5773da] mb-3 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2 mb-4">
                                        {blog.excerpt || blog.content?.substring(0, 200)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(blog.createdAt || blog.publishedAt).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric', 
                                            year: 'numeric' 
                                        })}
                                    </div>
                                    {blog.author && (
                                        <span>
                                            By {typeof blog.author === 'string' ? blog.author : `${blog.author.firstName} ${blog.author.lastName}`}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No articles found</p>
                </div>
            )}
        </div>
    );
};
