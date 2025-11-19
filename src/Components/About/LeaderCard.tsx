import { Mail, Phone } from 'lucide-react';
import type { Leader } from '../../features/api/leadersApi';

interface LeaderCardProps {
  leader: Leader;
}

export const LeaderCard = ({ leader }: LeaderCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <img
            src={leader.profilePicture || 'https://i.pravatar.cc/300?img=1'}
            alt={leader.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://i.pravatar.cc/300?img=1';
            }}
          />
          {leader.isCurrent && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>

        {/* Name and Position */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.fullName}</h3>
        <p className="text-blue-600 font-medium text-sm mb-3">{leader.position}</p>
        <p className="text-gray-500 text-xs mb-4">{leader.academicYear}</p>

        {/* Contact Information */}
        <div className="w-full space-y-2 pt-4 border-t border-gray-100">
          {leader.email && (
            <a
              href={`mailto:${leader.email}`}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="truncate">{leader.email}</span>
            </a>
          )}
          {leader.phone && (
            <a
              href={`tel:${leader.phone}`}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{leader.phone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

