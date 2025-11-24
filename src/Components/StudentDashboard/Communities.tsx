/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Users, Search, Loader2, UserPlus } from 'lucide-react';
import { useGetAllCommunitiesQuery } from '../../features/api';

export const StudentCommunities = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: communitiesData, isLoading, error } = useGetAllCommunitiesQuery();

    const filteredCommunities = useMemo(() => {
        let allCommunities: any[] = [];
        
        if (!communitiesData) {
            allCommunities = [];
        } else if (communitiesData.data?.communities && Array.isArray(communitiesData.data.communities)) {
            allCommunities = communitiesData.data.communities;
        } else if (Array.isArray(communitiesData)) {
            allCommunities = communitiesData;
        } else if (Array.isArray(communitiesData.data)) {
            allCommunities = communitiesData.data;
        } else if (communitiesData.data && typeof communitiesData.data === 'object') {
            allCommunities = Object.values(communitiesData.data).filter(item => typeof item === 'object');
        }
        
        return allCommunities.filter((community: any) => {
            const matchesSearch = !searchQuery || 
                community.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                community.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [communitiesData, searchQuery]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Communities</h1>
                <p className="text-gray-600">Join communities and connect with like-minded students</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search communities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
                </div>
            ) : error ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-red-600">Failed to load communities. Please try again.</p>
                </div>
            ) : filteredCommunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCommunities.map((community: any, idx: number) => (
                        <div
                            key={community.id || idx}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden group"
                        >
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#5773da] mb-2">
                                    {community.name}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                    {community.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Users className="w-4 h-4" />
                                        <span>{community.membersCount || community.memberCount || 0} members</span>
                                    </div>
                                    {community.whatsappLink && (
                                        <a
                                            href={community.whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Join
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No communities found</p>
                </div>
            )}
        </div>
    );
};
