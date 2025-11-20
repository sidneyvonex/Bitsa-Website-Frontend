import { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { CommunityCard } from '../Components/communities/communitiesCards';
import { useGetAllCommunitiesQuery, type Community } from '../features/api/communitiesApi';

const skeletonItems = Array.from({ length: 6 });

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
        <div className="h-14 w-14 rounded-2xl bg-gray-200 mb-6" />
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-2/3 bg-gray-100 rounded mb-4" />
        <div className="h-3 w-full bg-gray-100 rounded mb-2" />
        <div className="h-3 w-11/12 bg-gray-100 rounded mb-4" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
    </div>
);

const EmptyState = () => (
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
        <p className="text-lg font-semibold text-gray-800 mb-2">No communities yet</p>
        <p className="text-gray-600">Check back soon for new tech communities to join.</p>
    </div>
);

export const Communities = () => {
    const { data, isLoading, isError, refetch, isFetching } = useGetAllCommunitiesQuery();

    const communities = useMemo(() => {
        if (!data) return [];
        // Handle both array response and nested data structure
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        return [];
    }, [data]);

    return (
        <div>
            <Topbar />
            <main className="min-h-screen bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="text-center mb-12">
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Communities</p>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Communities</h1>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Join specialized communities aligned with your interests and connect with like-minded tech enthusiasts.
                            Learn, build, and grow together across different domains.
                        </p>
                    </section>

                    {isError && (
                        <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl mb-8">
                            <p>We couldn&apos;t load the communities. Please try again.</p>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                onClick={() => refetch()}
                            >
                                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                                Retry
                            </button>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {skeletonItems.map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : communities.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {communities.map((community: Community) => (
                                <CommunityCard key={community._id} community={community} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Communities;