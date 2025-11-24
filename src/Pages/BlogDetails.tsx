import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetBlogBySlugQuery, useGetAllBlogsQuery, type Blog } from '../features/api/blogsApi';

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
            const found = allBlogs.data.blogs.find(
                (b: Blog) => b.id === slug || b._id === slug || b.slug === slug
            );
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
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                            {/* Floating Share Options */}
                            <div className="hidden lg:block fixed top-1/3 left-8 z-40">
                                <div className="flex flex-col gap-3 bg-white/90 rounded-2xl shadow-lg p-3 border border-gray-200">
                                    <span className="text-gray-500 font-medium mb-1 text-xs text-center">Share</span>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition"
                                        title="Copy link"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656m-1.414-1.414a2 2 0 010-2.828m-2.828 2.828a4 4 0 010-5.656m1.414 1.414a2 2 0 010 2.828" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2" /></svg>
                                    </button>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-semibold transition"
                                        title="Share on Twitter"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 007.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022.46 6z" /></svg>
                                    </a>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-3 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold transition"
                                        title="Share on Facebook"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                                    </a>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-3 py-2 rounded-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition"
                                        title="Share on WhatsApp"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.96.99-3.59-.24-.37A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2c2.65 0 5.15 1.03 7.03 2.91A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" /></svg>
                                    </a>
                                </div>
                            </div>


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