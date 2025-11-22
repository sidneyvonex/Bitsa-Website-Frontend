import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    RefreshCw,
    Search,
    User,
} from 'lucide-react';

import  Topbar  from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import {
    type Blog,
    useGetAllBlogsQuery,
    useGetBlogCategoriesQuery,
    useGetLatestBlogsQuery,
} from '../Features/api/BlogsApi';

const FALLBACK_IMAGES: Record<string, string> = {
    'ai/ml': 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=900&q=80',
    'web dev': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
    security: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80',
    design: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=900&q=80',
};

const getImage = (blog: Blog) => {
    if (blog.coverImage) return blog.coverImage;
    const key = blog.category?.toLowerCase();
    return (key && FALLBACK_IMAGES[key]) ?? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80';
};

const formatDate = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const LatestSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse h-full">
        <div className="h-48 bg-gray-200" />
        <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
    </div>
);

const BlogSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse h-full flex flex-col">
        <div className="h-48 bg-gray-200" />
        <div className="p-6 space-y-4 flex-1">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-10 bg-gray-200 rounded" />
        </div>
    </div>
);

const BlogCard = ({ blog }: { blog: Blog }) => {
    const authorName =
        [blog.authorFirstName, blog.authorLastName].filter(Boolean).join(' ') || 'BITSA Editorial';

    return (
        <Link to={`/blogs/${blog.slug || blog.id}`} className="group">
            <article className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                        src={getImage(blog)}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    {blog.category && (
                        <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded">
                            {blog.category}
                        </span>
                    )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 flex-1">{blog.content?.substring(0, 120) || ''}</p>
                    <div className="pt-5 border-t border-gray-100 mt-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{authorName}</span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{blog.readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export const Blogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [page, setPage] = useState(1);
    const limit = 6;

    const queryParams = useMemo(
        () => ({
            page,
            limit,
            search: searchTerm.trim() ? searchTerm.trim() : undefined,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            sortBy: 'createdAt',
            sortOrder: 'desc',
        }),
        [page, limit, searchTerm, selectedCategory],
    );

    const {
        data: latestData,
        isLoading: loadingLatest,
        isError: latestError,
        refetch: refetchLatest,
    } = useGetLatestBlogsQuery(3);

    const {
        data: categoriesData,
        isLoading: loadingCategories,
    } = useGetBlogCategoriesQuery();

    const {
        data: blogsData,
        isLoading: loadingBlogs,
        isFetching: fetchingBlogs,
        isError: blogsError,
        refetch: refetchBlogs,
    } = useGetAllBlogsQuery(queryParams);

    const latestBlogs = latestData?.data?.blogs ?? [];
    const blogs = blogsData?.data?.blogs ?? [];
    const pagination = blogsData?.data?.pagination;
    const totalPages = pagination?.totalPages ?? 1;
    const totalBlogs = pagination?.total ?? blogs.length;
    const currentStart = blogs.length > 0 ? (page - 1) * limit + 1 : 0;
    const currentEnd = blogs.length > 0 ? currentStart + blogs.length - 1 : 0;

    const categories = useMemo(() => ['All', ...(categoriesData?.data ?? [])], [categoriesData]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        if (page !== 1) setPage(1);
    };

    const handleCategorySelect = (categoryValue: string) => {
        setSelectedCategory(categoryValue);
        if (page !== 1) setPage(1);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Topbar />
            <main className="flex-1">
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                                    BITSA Insights
                                </p>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
                                    Latest Blogs
                                </h1>
                                <p className="text-lg text-gray-600 mt-3 max-w-2xl">
                                    Insights and stories from our tech community. Stay ahead with emerging trends,
                                    tutorials, and community highlights curated by BITSA members.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        placeholder="Search articles..."
                                        className="pl-12 pr-4 py-3 w-full sm:w-80 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    />
                                </div>
                                <a
                                    href="#all-blogs"
                                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-xl hover:bg-blue-900 hover:text-white transition-colors whitespace-nowrap"
                                >
                                    View All Blogs
                                </a>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingLatest ? (
                                Array.from({ length: 3 }).map((_, idx) => <LatestSkeleton key={`latest-${idx}`} />)
                            ) : latestError ? (
                                <div className="col-span-full bg-white border border-red-100 rounded-2xl p-6 text-center text-red-600 flex flex-col items-center gap-3">
                                    <p>We couldn&apos;t load the latest blogs right now.</p>
                                    <button
                                        onClick={() => refetchLatest()}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-600"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Retry
                                    </button>
                                </div>
                            ) : latestBlogs.length === 0 ? (
                                <div className="col-span-full bg-white border border-gray-100 rounded-2xl p-8 text-center">
                                    <p className="text-gray-600">No blogs have been published yet.</p>
                                </div>
                            ) : (
                                latestBlogs.map((blog) => (
                                    <Link key={blog.id} to={`/blogs/${blog.slug}`} className="block h-full">
                                        <BlogCard blog={blog} />
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                <section id="all-blogs" className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                                        All Articles
                                    </p>
                                    <h2 className="text-3xl font-bold text-gray-900 mt-1">Explore every story</h2>
                                    <p className="text-gray-500">
                                        {currentStart > 0 ? (
                                            <>
                                                Showing <span className="font-semibold text-gray-900">{currentStart}</span>-
                                                <span className="font-semibold text-gray-900">{currentEnd}</span> of{' '}
                                                <span className="font-semibold text-gray-900">{totalBlogs}</span> articles
                                            </>
                                        ) : (
                                            'Filter by category to discover topics you love'
                                        )}
                                    </p>
                                </div>
                                {(fetchingBlogs || loadingBlogs) && (
                                    <span className="text-sm text-gray-400 animate-pulse">Updating feed...</span>
                                )}
                                {blogsError && (
                                    <button
                                        onClick={() => refetchBlogs()}
                                        className="inline-flex items-center gap-2 text-red-600 font-semibold"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Retry
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3 overflow-x-auto pb-1">
                                {categories.map((category) => {
                                    const value = category.toLowerCase() === 'all' ? 'all' : category;
                                    const isActive = selectedCategory === value;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => handleCategorySelect(value)}
                                            disabled={loadingCategories && category !== 'All'}
                                            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${isActive
                                                ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-900'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {loadingBlogs ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, idx) => (
                                    <BlogSkeleton key={`blog-skeleton-${idx}`} />
                                ))}
                            </div>
                        ) : blogs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {blogs.map((blog) => (
                                        <Link key={blog.id} to={`/blogs/${blog.slug}`} className="block h-full">
                                            <BlogCard blog={blog} />
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
                                    <p className="text-sm text-gray-500">
                                        Page {page} of {totalPages}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={page === 1}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-900"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={page === totalPages}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-900"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-12 text-center space-y-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-700 text-2xl font-bold">
                                    ✨
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
                                <p className="text-gray-600 max-w-xl mx-auto">
                                    We couldn&apos;t find any blogs matching your filters. Try another keyword or pick a different category.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                        setPage(1);
                                    }}
                                    className="text-blue-900 font-semibold underline underline-offset-4"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blogs;