import { useState } from 'react';
import { X, Check, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { useGetAllInterestsQuery, useAddMyInterestsMutation } from '../features/api';
import { useAppDispatch } from '../app/hooks';
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
    const { data: interestsData, isLoading } = useGetAllInterestsQuery();
    const [addInterests, { isLoading: isSubmitting }] = useAddMyInterestsMutation();

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [error, setError] = useState('');

    const interests = interestsData?.data || [];

    // Group interests by category
    const interestsByCategory = interests.reduce((acc, interest) => {
        if (interest.isActive) {
            if (!acc[interest.category]) {
                acc[interest.category] = [];
            }
            acc[interest.category].push(interest);
        }
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
            await addInterests({ interestIds: selectedInterests }).unwrap();

            // Update user state to indicate interests have been selected
            dispatch(updateUser({ hasSelectedInterests: true }));

            onComplete();
        } catch (err) {
            console.error('Failed to save interests:', err);
            setError('Failed to save your interests. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-linear-to-r from-[#5773da] to-[#4861c9] p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">Welcome! Let's Personalize Your Experience</h2>
                            </div>
                            <p className="text-white/90 text-sm">
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
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5773da]"></div>
                        </div>
                    ) : Object.keys(interestsByCategory).length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No interests available at the moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(interestsByCategory).map(([category, categoryInterests]) => (
                                <div key={category}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-[#5773da]/10 rounded-lg">
                                            {category === 'Technology' && <TrendingUp className="w-4 h-4 text-[#5773da]" />}
                                            {category === 'Arts' && <Heart className="w-4 h-4 text-[#5773da]" />}
                                            {category !== 'Technology' && category !== 'Arts' && <Sparkles className="w-4 h-4 text-[#5773da]" />}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {categoryInterests.map((interest) => (
                                            <button
                                                key={interest._id}
                                                onClick={() => toggleInterest(interest._id)}
                                                className={`
                          relative p-4 rounded-xl border-2 transition-all text-left
                          ${selectedInterests.includes(interest._id)
                                                        ? 'border-[#5773da] bg-[#5773da]/5 shadow-md'
                                                        : 'border-gray-200 hover:border-[#5773da]/50 hover:bg-gray-50'
                                                    }
                        `}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        {interest.icon && (
                                                            <div className="text-2xl mb-2">{interest.icon}</div>
                                                        )}
                                                        <h4 className="font-medium text-sm text-gray-900 truncate">
                                                            {interest.name}
                                                        </h4>
                                                        {interest.description && (
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                                {interest.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {selectedInterests.includes(interest._id) && (
                                                        <div className="shrink-0 w-5 h-5 bg-[#5773da] rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
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
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Selected Count */}
                    {selectedInterests.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">{selectedInterests.length}</span> interest
                                {selectedInterests.length !== 1 ? 's' : ''} selected
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-gray-600">
                            You can always update your interests later in your profile settings
                        </p>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || selectedInterests.length === 0}
                            className="px-6 py-2.5 bg-[#5773da] hover:bg-[#4861c9] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
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
