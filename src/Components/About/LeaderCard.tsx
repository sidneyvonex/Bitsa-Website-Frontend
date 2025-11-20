import { Mail, Award } from 'lucide-react';
import type { Leader } from '../../features/api/leadersApi';

interface LeaderCardProps {
    leader: Leader;
}

export const LeaderCard = ({ leader }: LeaderCardProps) => {
    const initials = leader.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all p-6 group">
            <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative mb-4">
                    {leader.profilePicture ? (
                        <img
                            src={leader.profilePicture}
                            alt={leader.fullName}
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 group-hover:border-blue-200 transition-colors"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-100 group-hover:border-blue-200 transition-colors">
                            <span className="text-white text-2xl font-bold">
                                {initials}
                            </span>
                        </div>
                    )}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Leader
                    </div>
                </div>

                {/* Name and Position */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {leader.fullName}
                </h3>
                <p className="text-blue-600 font-medium text-sm mb-1">
                    {leader.position}
                </p>
                {leader.academicYear && (
                    <p className="text-gray-500 text-xs mb-4">
                        {leader.academicYear}
                    </p>
                )}

                {/* Social Links */}
                {leader.email && (
                    <div className="w-full pt-4 border-t border-gray-100 mt-4">
                        <a
                            href={`mailto:${leader.email}`}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                            title="Email"
                        >
                            <Mail className="w-4 h-4" />
                            Contact
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
