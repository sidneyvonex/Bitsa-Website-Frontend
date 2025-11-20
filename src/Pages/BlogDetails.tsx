import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetBlogBySlugQuery, useGetAllBlogsQuery } from '../features/api';

export const BlogDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Try to fetch by slug first, fallback to ID
    const {
        data: blogBySlug,
        isLoading: slugLoading,
        isError: slugError,
    } = useGetBlogBySlugQuery(slug ?? '', { skip: !slug });

    // Fallback: Get all blogs and find by ID if slug fails
    const {
        data: allBlogs,
        isLoading: allBlogsLoading,
    } = useGetAllBlogsQuery({ page: 1, limit: 1000 }, { skip: !slugError });

    const blog = useMemo(() => {
        if (blogBySlug?.data) return blogBySlug.data;
        if (allBlogs?.data?.blogs) {
            const found = allBlogs.data.blogs.find((b: typeof allBlogs.data.blogs[0]) => b.id === slug || b.slug === slug);
            return found;
        }
        return undefined;
    }, [blogBySlug, allBlogs, slug]);

    const authorName = useMemo(() => {
        if (!blog) return 'BITSA Editorial';
        return [blog.authorFirstName, blog.authorLastName].filter(Boolean).join(' ') || 'BITSA Editorial';
    }, [blog]);

    const isLoading = slugLoading && allBlogsLoading;
    const isError = slugError && !blog;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Topbar />
                <main className="py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-pulse">
                            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
                            <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isError || !blog) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Topbar />
                <main className="py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Unable to load this blog</h2>
                            <p className="text-gray-600">
                                Please check the link or try refreshing the page. It's possible this blog has been removed.
                            </p>
                            <button
                                onClick={() => navigate('/blogs')}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1e3a8a] text-white font-semibold"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blogs
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const coverImage = blog.coverImage || 'https://images.unsplash.com/photo-1500930599326-b227d5e66631?w=1200&q=80';

    const formatDate = (date: string | undefined) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Topbar />
            <main className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/blogs')}
                        className="mb-8 inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#1a2f6f] font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </button>

                    {/* Article */}
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Hero Image */}
                        <div className="relative h-96 overflow-hidden bg-gray-100">
                            <img
                                src={coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            {blog.category && (
                                <span className="absolute top-6 left-6 bg-[#1e3a8a] text-white text-xs font-semibold px-4 py-2 rounded">
                                    {blog.category}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-12">
                            {/* Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 mb-8">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <User className="w-4 h-4 text-[#1e3a8a]" />
                                    <span className="font-medium">{authorName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4 text-[#1e3a8a]" />
                                    <span>{formatDate(blog.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-[#1e3a8a]" />
                                    <span>{blog.readTime} min read</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="prose max-w-none">
                                <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                                    {blog.content}
                                </p>
                            </div>

                            {/* Author Contact */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] flex items-center justify-center text-white font-bold">
                                        {(blog.authorFirstName?.[0] || 'B') + (blog.authorLastName?.[0] || '')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{authorName}</h3>
                                        {blog.authorEmail && (
                                            <a
                                                href={`mailto:${blog.authorEmail}`}
                                                className="text-sm text-[#1e3a8a] hover:underline"
                                            >
                                                {blog.authorEmail}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogDetails;
