import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Calendar, 
  MessageSquare, 
  Award,
  TrendingUp,
  HelpCircle 
} from 'lucide-react';

interface QuickLink {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  color: string;
  bgColor: string;
}

export const QuickLinks = () => {
  const quickLinks: QuickLink[] = [
    {
      title: 'Blogs',
      description: 'Read latest articles',
      icon: FileText,
      path: '/blogs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Events',
      description: 'Upcoming activities',
      icon: Calendar,
      path: '/events',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Communities',
      description: 'Join groups',
      icon: Users,
      path: '/communities',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Projects',
      description: 'View all projects',
      icon: TrendingUp,
      path: '/projects',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Learning Resources',
      description: 'Study materials',
      icon: BookOpen,
      path: '/resources',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Messages',
      description: 'Check messages',
      icon: MessageSquare,
      path: '/messages',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Achievements',
      description: 'Your progress',
      icon: Award,
      path: '/achievements',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Help Center',
      description: 'Get support',
      icon: HelpCircle,
      path: '/help',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group p-4 rounded-lg border border-gray-200 hover:border-[#5773da] hover:shadow-md transition-all"
          >
            <div className={`w-12 h-12 ${link.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <link.icon className={`w-6 h-6 ${link.color}`} />
            </div>
            <h4 className="font-medium text-sm text-gray-900 mb-1">{link.title}</h4>
            <p className="text-xs text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
