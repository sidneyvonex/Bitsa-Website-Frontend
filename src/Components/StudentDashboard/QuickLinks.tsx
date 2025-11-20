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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-[#5773da] rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="group relative p-5 rounded-xl border-2 border-gray-100 hover:border-[#5773da] hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50/30 hover:scale-105"
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className={`w-14 h-14 ${link.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <link.icon className={`w-7 h-7 ${link.color}`} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-gray-900 mb-1">{link.title}</h4>
                                <p className="text-xs text-gray-500">{link.description}</p>
                            </div>
                        </div>
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-[#5773da]/0 group-hover:bg-[#5773da]/5 rounded-xl transition-all duration-300"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
