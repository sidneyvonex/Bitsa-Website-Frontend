import { useState } from 'react';
import { Search, Calendar, Clock, User } from 'lucide-react';

export const FeaturedBlogs = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const blogs = [
        {
            id: 1,
            title: "The Future of AI in Software Development",
            excerpt: "Exploring how artificial intelligence is revolutionizing the way we write code and build applications.",
            author: "John Kamau",
            date: "Nov 10, 2025",
            readTime: "5 min read",
            category: "AI/ML",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
        },
        {
            id: 2,
            title: "Mastering React Hooks: A Complete Guide",
            excerpt: "Deep dive into React Hooks and how to use them effectively in your applications.",
            author: "Sarah Mwangi",
            date: "Nov 8, 2025",
            readTime: "8 min read",
            category: "Web Dev",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
        },
        {
            id: 3,
            title: "Cybersecurity Best Practices for Developers",
            excerpt: "Essential security practices every developer should implement in their projects.",
            author: "David Ochieng",
            date: "Nov 5, 2025",
            readTime: "6 min read",
            category: "Security",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
        }
    ];

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Blogs</h2>
                        <p className="text-gray-600 text-lg">Insights and stories from our tech community</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-3 w-64 md:w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* View All Button */}
                        <a
                            href="/blogs"
                            className="px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-900 hover:text-white transition-all whitespace-nowrap"
                        >
                            View All Blogs
                        </a>
                    </div>
                </div>

                {/* Blogs Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
                            <a
                                key={blog.id}
                                href={`/blogs/${blog.id}`}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative overflow-hidden h-48 bg-gray-50">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1.5 rounded">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                                            {blog.excerpt}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium">{blog.author}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{blog.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{blog.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
