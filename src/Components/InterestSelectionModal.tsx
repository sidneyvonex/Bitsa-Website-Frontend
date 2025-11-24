import { useState } from 'react';
import { X, Check, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { useGetAllInterestsQuery, useAddMyInterestsMutation, type Interest } from '../features/api';
import { useAppDispatch } from '../features/app/hooks';
import { updateUser } from '../features/auth/authSlice';

interface InterestSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const InterestSelectionModal: React.FC<InterestSelectionModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const dispatch = useAppDispatch();
    const { data: interestsData, isLoading, error: apiError } = useGetAllInterestsQuery();
    const [addInterests, { isLoading: isSubmitting }] = useAddMyInterestsMutation();

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [error, setError] = useState('');

    // Handle multiple response formats
    // Format 1: { success: true, data: [...] }
    // Format 2: { interests: [...] } - Current backend format
    // Format 3: Direct array [...]
    let interests: Interest[] = [];

    if (interestsData) {
        if (Array.isArray(interestsData)) {
            interests = interestsData;
        } else if (interestsData.data && Array.isArray(interestsData.data)) {
            interests = interestsData.data;
        } else if (interestsData.interests && Array.isArray(interestsData.interests)) {
            interests = interestsData.interests;
        }
    }

    // Debug logging
    console.log('🎯 InterestSelectionModal - isOpen:', isOpen);
    console.log('🎯 InterestSelectionModal - Raw Response:', interestsData);
    console.log('🎯 InterestSelectionModal - Parsed Interests:', interests);
    console.log('🎯 InterestSelectionModal - Is Loading:', isLoading);
    console.log('🎯 InterestSelectionModal - API Error:', apiError);

    // Group interests by category
    // Backend doesn't return isActive or category, so we show all interests
    const interestsByCategory = interests.reduce((acc, interest) => {
        // Use a default category if not provided
        const category = interest.category || 'General';

        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(interest);
        return acc;
    }, {} as Record<string, typeof interests>);

    const toggleInterest = (interestId: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interestId)
                ? prev.filter((id) => id !== interestId)
                : [...prev, interestId]
        );
        setError('');
    };

    const handleSubmit = async () => {
        if (selectedInterests.length === 0) {
            setError('Please select at least one interest');
            return;
        }

        try {
            console.log('🎯 Submitting interests:', selectedInterests);
            const result = await addInterests({ interestIds: selectedInterests }).unwrap();
            console.log('🎯 Save success:', result);

            // Update user state to indicate interests have been selected
            dispatch(updateUser({ hasSelectedInterests: true }));

            onComplete();
        } catch (err) {
            console.error('🎯 Failed to save interests:', err);
            const error = err as { status?: number; data?: { message?: string }; message?: string };
            console.error('🎯 Error details:', {
                status: error?.status,
                data: error?.data,
                message: error?.data?.message || error?.message
            });

            // Show more specific error message if available
            const errorMessage = error?.data?.message || 'Failed to save your interests. Please try again.';
            setError(errorMessage);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-linear-to-r from-[#5773da] to-[#4861c9] p-4 sm:p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h2 className="text-lg sm:text-2xl font-bold">Welcome! Let's Personalize Your Experience</h2>
                            </div>
                            <p className="text-white/90 text-xs sm:text-sm">
                                Select your interests to get personalized content, events, and community recommendations
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors p-1"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5773da]"></div>
                        </div>
                    ) : Object.keys(interestsByCategory).length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-sm sm:text-base">No interests available at the moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-6">
                            {Object.entries(interestsByCategory).map(([category, categoryInterests]) => (
                                <div key={category}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-[#5773da]/10 rounded-lg">
                                            {category === 'Technology' && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#5773da]" />}
                                            {category === 'Arts' && <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#5773da]" />}
                                            {category !== 'Technology' && category !== 'Arts' && <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#5773da]" />}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{category}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                        {categoryInterests.map((interest) => (
                                            <button
                                                key={interest.id}
                                                onClick={() => toggleInterest(interest.id)}
                                                className={`
                          relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-left w-full
                          ${selectedInterests.includes(interest.id)
                                                        ? 'border-[#5773da] bg-[#5773da]/5 shadow-md'
                                                        : 'border-gray-200 hover:border-[#5773da]/50 hover:bg-gray-50'
                                                    }
                        `}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        {interest.icon && (
                                                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{interest.icon}</div>
                                                        )}
                                                        <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                                                            {interest.name}
                                                        </h4>
                                                        {interest.description && (
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2 hidden sm:block">
                                                                {interest.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {selectedInterests.includes(interest.id) && (
                                                        <div className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-[#5773da] rounded-full flex items-center justify-center">
                                                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm">
                            {error}
                        </div>
                    )}

                    {/* Selected Count */}
                    {selectedInterests.length > 0 && (
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs sm:text-sm text-blue-800">
                                <span className="font-semibold">{selectedInterests.length}</span> interest
                                {selectedInterests.length !== 1 ? 's' : ''} selected
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 sm:p-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                            You can always update your interests later in your profile settings
                        </p>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || selectedInterests.length === 0}
                            className="px-4 sm:px-6 py-2.5 bg-[#5773da] hover:bg-[#4861c9] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <Check className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};