import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
    useGetAllEventsQuery,
    useGetAllCommunitiesQuery,
    useGetAllBlogsQuery,
    useGetMyInterestsQuery
} from '../../features/api';
import {
    Search,
    Filter,
    ChevronRight,
    FileText,
    MessageSquare,
    Calendar,
    Trophy,
    Clock,
    Sparkles,
    Heart
} from 'lucide-react';
import { CalendarWidget } from './CalendarWidget';
import { QuickLinks } from './QuickLinks';

interface Course {
    id: string;
    subject: string;
    code: string;
    progress: number;
    color: string;
}

interface Result {
    subject: string;
    quiz: string;
    score: number;
    color: string;
}

export const StudentDashboardOverview = () => {
    const user = useAppSelector(selectCurrentUser);
    const [searchQuery, setSearchQuery] = useState('');

    const { data: eventsData } = useGetAllEventsQuery({ page: 1, limit: 5 });
    const { data: communitiesData } = useGetAllCommunitiesQuery();
    const { data: blogsData } = useGetAllBlogsQuery({ page: 1, limit: 5 });
    const { data: myInterestsData } = useGetMyInterestsQuery();

    const userName = user?.firstName || 'Student';
    const myInterests = myInterestsData?.data || [];

    // Mock course data - can be replaced with real API data
    const courses: Course[] = [
        { id: '1', subject: 'English', code: 'BCS-4A', progress: 70, color: 'bg-yellow-500' },
        { id: '2', subject: 'Science', code: 'BCS-4A', progress: 30, color: 'bg-red-500' },
        { id: '3', subject: 'Social', code: 'BCS-4A', progress: 50, color: 'bg-gray-500' },
        { id: '4', subject: 'Projects', code: 'BCS-4A', progress: 40, color: 'bg-orange-500' },
        { id: '5', subject: 'Arts', code: 'BCS-4A', progress: 100, color: 'bg-green-500' },
    ];

    // Mock results data - can be replaced with real API data
    const results: Result[] = [
        { subject: 'English', quiz: 'Quiz: 01', score: 37, color: 'bg-red-400' },
        { subject: 'English', quiz: 'Quiz: 02', score: 87, color: 'bg-green-400' },
        { subject: 'Science', quiz: 'Quiz: 01', score: 50, color: 'bg-gray-500' },
        { subject: 'English', quiz: 'Quiz: 01', score: 37, color: 'bg-red-400' },
        { subject: 'English', quiz: 'Quiz: 01', score: 100, color: 'bg-blue-500' },
    ];

    const overallProgress = 80;

    return (
        <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-blue-200/30 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute right-20 bottom-0 w-32 h-32 bg-blue-300/20 rounded-full -mb-10"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {userName}!
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base mb-1">
                            You have learned <span className="font-semibold text-blue-600">{overallProgress}%</span> of your course
                        </p>
                        <p className="text-gray-500 text-sm">
                            Continue learning and achieve your goals
                        </p>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                            Continue Learning
                        </button>
                    </div>

                    {/* Illustration */}
                    <div className="hidden md:flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Trophy className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* My Interests Section */}
            {myInterests.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#5773da]" />
                            <h3 className="text-lg font-semibold text-gray-900">Your Interests</h3>
                        </div>
                        <button className="text-[#5773da] hover:text-[#4861c9] text-sm font-medium transition-colors">
                            Edit Interests
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {myInterests.map((interest) => (
                            <div
                                key={interest._id}
                                className="px-4 py-2 bg-gradient-to-r from-[#5773da]/10 to-[#4861c9]/10 border border-[#5773da]/20 rounded-full flex items-center gap-2 hover:shadow-md transition-shadow"
                            >
                                {interest.icon && <span>{interest.icon}</span>}
                                <span className="text-sm font-medium text-gray-800">{interest.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Links */}
            <QuickLinks />

            {/* Calendar and Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Widget */}
                <div className="lg:col-span-1">
                    <CalendarWidget />
                </div>

                {/* Stats Cards */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{eventsData?.data?.events?.length || 0}</p>
                        <p className="text-sm text-gray-500">Events</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                            <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{blogsData?.data?.totalBlogs || 0}</p>
                        <p className="text-2xl font-bold text-gray-900">{blogsData?.data?.pagination?.totalBlogs || 0}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{communitiesData?.data?.length || 0}</p>
                        <p className="text-sm text-gray-500">Communities</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                            <Heart className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{myInterests.length}</p>
                        <p className="text-sm text-gray-500">Interests</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Your Courses Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Course"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Course List */}
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                                        {course.subject.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h3 className="font-semibold text-gray-800">{course.subject}</h3>
                                            <span className="text-sm text-gray-500">{course.code}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="font-medium">{course.progress}%</span>
                                            <div className="flex-1 max-w-xs">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${course.color}`}
                                                        style={{ width: `${course.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="ml-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                            View More
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                            Enroll Course
                        </button>
                    </div>
                </div>

                {/* Right Sidebar - Recent Results & Actions */}
                <div className="space-y-6">
                    {/* Recent Results */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Recent Results</h3>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                                View More
                            </button>
                        </div>
                        <div className="space-y-3">
                            {results.map((result, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{result.subject}</p>
                                        <p className="text-xs text-gray-500">{result.quiz}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${result.color}`}
                                                style={{ width: `${result.score}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 w-10 text-right">
                                            {result.score}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <button className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-800 text-sm">Leave</p>
                                    <p className="text-xs text-gray-500">Want's to take a Leave?</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>

                        <button className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-800 text-sm">Complaint</p>
                                    <p className="text-xs text-gray-500">Want's to complain against someone?</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Upcoming Events */}
                    {eventsData?.data?.events && eventsData.data.events.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-3">
                                {eventsData.data.events.slice(0, 3).map((event, index: number) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{event.title}</p>
                                            <p className="text-xs text-gray-500 flex items-center mt-1">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
