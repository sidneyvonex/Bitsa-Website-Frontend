import { ArrowRight, Users } from 'lucide-react';
import type { Community } from '../../features/api/communitiesApi';

type CommunityStyle = {
  gradient: string;
  iconBg: string;
  iconColor: string;
  defaultMembers: number;
  emoji: string;
};

const styleMap: Record<string, CommunityStyle> = {
  web: {
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    defaultMembers: 150,
    emoji: '🌐',
  },
  mobile: {
    gradient: 'from-green-500 to-green-600',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    defaultMembers: 95,
    emoji: '📱',
  },
  ai: {
    gradient: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    defaultMembers: 120,
    emoji: '🧠',
  },
  cyber: {
    gradient: 'from-red-500 to-red-600',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    defaultMembers: 80,
    emoji: '🛡️',
  },
  data: {
    gradient: 'from-amber-500 to-yellow-500',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    defaultMembers: 110,
    emoji: '📊',
  },
  cloud: {
    gradient: 'from-cyan-500 to-cyan-600',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    defaultMembers: 70,
    emoji: '☁️',
  },
  default: {
    gradient: 'from-indigo-500 to-blue-600',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    defaultMembers: 60,
    emoji: '🤝',
  },
};

const resolveStyleKey = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('web')) return 'web';
  if (normalized.includes('mobile')) return 'mobile';
  if (normalized.includes('ai') || normalized.includes('machine') || normalized.includes('ml')) return 'ai';
  if (normalized.includes('cyber')) return 'cyber';
  if (normalized.includes('data')) return 'data';
  if (normalized.includes('cloud') || normalized.includes('devops')) return 'cloud';
  return 'default';
};

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard = ({ community }: CommunityCardProps) => {
  const style = styleMap[resolveStyleKey(community.name)];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient}`} />

      <div className="flex items-center justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${style.gradient} text-3xl`}>
          {style.emoji}
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full">
          <Users className="w-4 h-4" />
          <span className="font-semibold text-gray-700">
            {community.memberCount ?? style.defaultMembers}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{community.name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{community.description}</p>

      <a
        href={community.whatsappLink ?? '#'}
        target={community.whatsappLink ? '_blank' : '_self'}
        rel="noreferrer"
        className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all"
      >
        Join Community
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};
