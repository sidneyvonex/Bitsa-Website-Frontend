import { useState, useMemo } from 'react';
import { Search, Loader2, Users, MessageCircle } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllCommunitiesQuery } from '../features/api';

export const Communities = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading } = useGetAllCommunitiesQuery();

    const filteredCommunities = useMemo(() => {
        const allCommunities = data?.data?.communities || [];
        return (allCommunities as any[]).filter((community: any) => {
            const matchesSearch = !searchQuery ||
                community.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                community.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [data, searchQuery]);

    return (
        <div className="min-h-screen bg-[#f5f6f7] relative overflow-hidden">
            {/* SVG Background */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1440 1200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="bg1" cx="50%" cy="30%" r="60%" fx="50%" fy="30%" gradientTransform="rotate(30)">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="1440" height="1200" fill="url(#bg1)" />
                <ellipse cx="200" cy="200" rx="180" ry="80" fill="#60a5fa" opacity="0.08" />
                <ellipse cx="1240" cy="1000" rx="140" ry="60" fill="#818cf8" opacity="0.09" />
                <path d="M0 900 Q 360 1100 720 900 T 1440 900" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.13" />
                <circle cx="900" cy="300" r="90" fill="#f59e0b" opacity="0.07" />
                <circle cx="400" cy="1000" r="60" fill="#60a5fa" opacity="0.07" />
            </svg>

            <Topbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center space-y-3 mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        Communities
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join vibrant communities and connect with students passionate about tech, innovation, and growth
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Communities Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-[#5773da]" />
                    </div>
                ) : filteredCommunities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCommunities.map((community: any, idx: number) => (
                            <div
                                key={community.id || community._id || `community-${idx}`}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden hover:border-[#5773da]"
                            >
                                <div className="p-6 space-y-4">
                                    {/* Header with icon */}
                                    <div className="flex items-start justify-between">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#5773da] to-[#4861c9] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Community Name */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {community.name}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                                            {community.description}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{community.membersCount || community.memberCount || 0} members</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {community.whatsappLink && (
                                        <a
                                            href={community.whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mt-4 px-4 py-2.5 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Join on WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg text-gray-600">No communities found matching your search</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Communities;
