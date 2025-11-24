import { useParams, useNavigate } from 'react-router-dom';
import { useGetBlogBySlugQuery } from '../../features/api';
import { Calendar, ArrowLeft, Loader2, User } from 'lucide-react';

export const StudentBlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: blogData, isLoading, error } = useGetBlogBySlugQuery(slug || '');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
            </div>
        );
    }

    if (error || !blogData) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-[#5773da] hover:text-[#4861c9]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </button>
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-600">Blog not found</p>
                </div>
            </div>
        );
    }

    const blog = blogData.data || blogData;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-[#5773da] hover:text-[#4861c9] font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
            </button>

            <article className="bg-white rounded-lg shadow overflow-hidden">
                {blog.coverImage && (
                    <div className="relative h-96 overflow-hidden">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(blog.createdAt || (blog as any).publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            {blog.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {typeof blog.author === 'string' ? blog.author : `${blog.author.firstName} ${blog.author.lastName}`}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};
