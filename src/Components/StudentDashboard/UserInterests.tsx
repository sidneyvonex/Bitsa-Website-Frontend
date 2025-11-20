import { Sparkles, Loader2, TrendingUp, Code, Palette } from 'lucide-react';
import { useGetMyInterestsQuery } from '../../features/api';

export const UserInterests = () => {
    const { data: myInterestsData, isLoading } = useGetMyInterestsQuery();

    // Extract interests from response
    let userInterests: Array<Record<string, string | number | boolean | undefined>> = [];

    if (myInterestsData) {
        if (Array.isArray(myInterestsData)) {
            userInterests = myInterestsData as Array<Record<string, string | number | boolean | undefined>>;
        } else if (myInterestsData.data && Array.isArray(myInterestsData.data)) {
            userInterests = myInterestsData.data as Array<Record<string, string | number | boolean | undefined>>;
        } else if (myInterestsData.interests && Array.isArray(myInterestsData.interests)) {
            userInterests = myInterestsData.interests as Array<Record<string, string | number | boolean | undefined>>;
        }
    }

    // Debug logging BEFORE filtering
    console.log('🎨 UserInterests - Raw Data:', myInterestsData);
    console.log('🎨 UserInterests - Extracted Array:', userInterests);
    console.log('🎨 UserInterests - First Interest:', userInterests[0]);

    // Filter out any interests without valid data
    // Check for various ID field names: id, _id, interestId
    userInterests = userInterests.filter(interest => {
        const hasId = interest?.id || interest?._id || interest?.interestId;
        const hasName = interest?.name || interest?.interestName;
        console.log('🎨 Interest Check:', { interest, hasId, hasName });
        return hasId && hasName;
    });

    console.log('🎨 UserInterests - Parsed Interests:', userInterests);
    console.log('🎨 UserInterests - Is Loading:', isLoading);

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-[#5773da] animate-spin" />
                </div>
            </div>
        );
    }

    // Show empty state instead of hiding completely
    if (!userInterests || userInterests.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 relative overflow-hidden">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-[#5773da] rounded-2xl shadow-md mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Interests Selected Yet</h3>
                    <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                        Select your interests to get personalized recommendations for events, blogs, and communities that match your passions!
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-[#5773da] hover:bg-[#4861c9] text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        Add Interests
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-white to-gray-50/50 rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5773da]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -ml-12 -mb-12"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#5773da] rounded-xl shadow-md">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">My Interests</h3>
                            <p className="text-sm text-gray-500">{userInterests.length} interest{userInterests.length !== 1 ? 's' : ''} selected</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {userInterests.map((interest, index) => {
                        const colors = [
                            { border: 'border-blue-500', bg: 'bg-blue-50', icon: 'text-blue-600' },
                            { border: 'border-purple-500', bg: 'bg-purple-50', icon: 'text-purple-600' },
                            { border: 'border-green-500', bg: 'bg-green-50', icon: 'text-green-600' },
                            { border: 'border-red-500', bg: 'bg-red-50', icon: 'text-red-600' },
                            { border: 'border-cyan-500', bg: 'bg-cyan-50', icon: 'text-cyan-600' },
                            { border: 'border-orange-500', bg: 'bg-orange-50', icon: 'text-orange-600' },
                            { border: 'border-pink-500', bg: 'bg-pink-50', icon: 'text-pink-600' },
                            { border: 'border-indigo-500', bg: 'bg-indigo-50', icon: 'text-indigo-600' },
                        ];
                        const colorScheme = colors[index % colors.length];

                        // Handle different field names from backend
                        const interestId = (interest.id || interest._id || interest.interestId) as string;
                        const interestName = (interest.name || interest.interestName || 'Unknown') as string;
                        const nameLower = interestName.toLowerCase();

                        // Determine icon based on interest name
                        let IconComponent = Code; // default
                        if (nameLower.includes('design') || nameLower.includes('ui') || nameLower.includes('ux')) {
                            IconComponent = Palette;
                        } else if (nameLower.includes('data') || nameLower.includes('science') || nameLower.includes('analytics')) {
                            IconComponent = TrendingUp;
                        } else if (nameLower.includes('machine') || nameLower.includes('ai') || nameLower.includes('intelligence')) {
                            IconComponent = Sparkles;
                        }

                        return (
                            <div
                                key={interestId}
                                className="group relative"
                            >
                                <div className={`
                                    bg-white ${colorScheme.border}
                                    rounded-xl p-4 
                                    border-2
                                    shadow-sm hover:shadow-lg 
                                    transform hover:scale-105 hover:-translate-y-1
                                    transition-all duration-300 
                                    cursor-pointer
                                `}>
                                    <div className="flex flex-col items-center text-center gap-2">
                                        {/* Icon based on interest name */}
                                        <div className={`w-10 h-10 ${colorScheme.bg} rounded-lg flex items-center justify-center`}>
                                            <IconComponent className={`w-5 h-5 ${colorScheme.icon}`} />
                                        </div>
                                        <h4 className="font-semibold text-xs text-gray-900 leading-tight">
                                            {interestName}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#5773da]" />
                        Your interests help us personalize your experience with relevant events, blogs, and communities.
                    </p>
                </div>
            </div>
        </div>
    );
};
