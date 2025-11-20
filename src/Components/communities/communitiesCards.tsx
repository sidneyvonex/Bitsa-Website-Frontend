import { Users, ArrowRight } from 'lucide-react';

interface CommunityCardProps {
    community: {
        _id: string;
        name: string;
        description: string;
        icon?: string;
        memberCount?: number;
        category?: string;
    };
}

export const CommunityCard = ({ community }: CommunityCardProps) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all p-6 group cursor-pointer">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                {community.icon || '👥'}
            </div>

            {/* Category Badge */}
            {community.category && (
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-2">
                    {community.category}
                </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {community.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {community.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{community.memberCount || 0} members</span>
                </div>
                <button className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Join
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
