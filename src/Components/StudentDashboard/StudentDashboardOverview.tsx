import { Link } from 'react-router-dom';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
    useGetAllEventsQuery,
    useGetAllCommunitiesQuery,
    useGetAllBlogsQuery,
    useGetMyInterestsQuery,
    type Event,
} from '../../features/api';
import {
    FileText,
    MessageSquare,
    Calendar,
    Heart,
    Trophy,
    BookOpen,
    Users,
    TrendingUp,
    Award,
    HelpCircle
} from 'lucide-react';
// import { CalendarWidget } from './CalendarWidget';

export const StudentDashboardOverview = () => {
    const user = useAppSelector(selectCurrentUser);

    const { data: eventsData } = useGetAllEventsQuery({ page: 1, limit: 10 });
    const { data: communitiesData } = useGetAllCommunitiesQuery();
    const { data: blogsData } = useGetAllBlogsQuery({ page: 1, limit: 10 });
    const { data: myInterestsData } = useGetMyInterestsQuery();

    const userName = user?.firstName || 'Student';
    const myInterests = myInterestsData?.interests || myInterestsData?.data || [];

    const overallProgress = 80;
    const eventsCount = eventsData?.data?.events?.length || 3;
    const blogsCount = blogsData?.data?.blogs?.length || 0;
    const communitiesCount = communitiesData?.data?.length || 0;

    const quickLinks = [
        { title: 'Blogs', description: 'Read latest articles', icon: FileText, path: '/blogs', iconBg: 'bg-blue-600' },
        { title: 'Events', description: 'Upcoming activities', icon: Calendar, path: '/events', iconBg: 'bg-purple-600' },
        { title: 'Communities', description: 'Join groups', icon: Users, path: '/communities', iconBg: 'bg-green-600' },
        { title: 'Projects', description: 'View all projects', icon: TrendingUp, path: '/projects', iconBg: 'bg-orange-600' },
        { title: 'Learning Resources', description: 'Study materials', icon: BookOpen, path: '/resources', iconBg: 'bg-indigo-600' },
        { title: 'Messages', description: 'Check messages', icon: MessageSquare, path: '/messages', iconBg: 'bg-pink-600' },
        { title: 'Achievements', description: 'Your progress', icon: Award, path: '/achievements', iconBg: 'bg-yellow-600' },
        { title: 'Help Center', description: 'Get support', icon: HelpCircle, path: '/help', iconBg: 'bg-gray-600' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 flex items-center justify-between flex-wrap gap-6">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
                    <p className="text-gray-600 text-sm md:text-base mb-1">
                        You have learned <span className="font-bold text-[#5773da]">{overallProgress}%</span> of your course
                    </p>
                    <p className="text-gray-500 text-sm mb-4">Continue learning and achieve your goals</p>
                    <button className="px-6 py-2.5 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium transition-colors">Continue Learning</button>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-[#5773da] rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-[#5773da] hover:shadow-md transition-all group">
                            <div className={`w-12 h-12 ${link.iconBg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <link.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-semibold text-gray-900 text-sm text-center mb-1">{link.title}</p>
                            <p className="text-xs text-gray-500 text-center">{link.description}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    {/* <CalendarWidget /> */}
                    <div className="mt-6 space-y-4">
                        <div className="bg-blue-50 rounded-2xl shadow-sm p-5 border border-blue-100">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{eventsCount}</p>
                                    <p className="text-sm font-medium text-gray-600">Events</p>
                                </div>
                                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                    <Calendar className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-2xl shadow-sm p-5 border border-green-100">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{blogsCount}</p>
                                    <p className="text-sm font-medium text-gray-600">Blogs</p>
                                </div>
                                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
                                    <FileText className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-2xl shadow-sm p-5 border border-purple-100">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{communitiesCount}</p>
                                    <p className="text-sm font-medium text-gray-600">Communities</p>
                                </div>
                                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
                                    <MessageSquare className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-orange-50 rounded-2xl shadow-sm p-5 border border-orange-100">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{myInterests.length}</p>
                                    <p className="text-sm font-medium text-gray-600">Interests</p>
                                </div>
                                <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
                            <Link to="/events" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium">View All →</Link>
                        </div>
                        {eventsData?.data?.events && eventsData.data.events.length > 0 ? (
                            <div className="space-y-3">
                                {eventsData.data.events.slice(0, 3).map((event: Event) => (
                                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="w-2 h-2 bg-[#5773da] rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                                            <p className="text-xs text-gray-500">{new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-4">No upcoming events</p>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Learning Resources</h4>
                                    <p className="text-sm text-gray-500">Study materials</p>
                                </div>
                            </div>
                            <Link to="/resources" className="text-[#5773da] hover:text-[#4861c9]">→</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Messages</h4>
                                    <p className="text-sm text-gray-500">Check messages</p>
                                </div>
                            </div>
                            <Link to="/messages" className="text-[#5773da] hover:text-[#4861c9]">→</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Achievements</h4>
                                    <p className="text-sm text-gray-500">Your progress</p>
                                </div>
                            </div>
                            <Link to="/achievements" className="text-[#5773da] hover:text-[#4861c9]">→</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <HelpCircle className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Help Center</h4>
                                    <p className="text-sm text-gray-500">Get support</p>
                                </div>
                            </div>
                            <Link to="/help" className="text-[#5773da] hover:text-[#4861c9]">→</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">Leave</p>
                        <p className="text-xs text-gray-500">Submit absence request</p>
                    </div>
                </div>
                <button className="text-[#5773da] hover:text-[#4861c9]">→</button>
            </div>
        </div>
    );
};