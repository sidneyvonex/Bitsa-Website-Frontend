/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../features/app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {
    useGetAllEventsQuery,
    useGetAllCommunitiesQuery,
    useGetAllBlogsQuery,
    useGetMyInterestsQuery,
    useGetAllProjectsQuery,
    type Event,
} from '../../features/api';
import {
    FileText,
    Calendar,
    Heart,
    BookOpen,
    Users,
    TrendingUp,
    Loader2,
    Sparkles,
    Target,
    BookMarked
} from 'lucide-react';
import { CalendarWidget } from './CalendarWidget';

export const StudentDashboardOverview = () => {
    const user = useAppSelector(selectCurrentUser);

    const { data: eventsData, isLoading: eventsLoading } = useGetAllEventsQuery({ page: 1, limit: 5 });
    const { data: communitiesData, isLoading: communitiesLoading } = useGetAllCommunitiesQuery();
    const { data: blogsData, isLoading: blogsLoading } = useGetAllBlogsQuery({ page: 1, limit: 5 });
    const { data: myInterestsData } = useGetMyInterestsQuery();
    const { data: projectsData, isLoading: projectsLoading } = useGetAllProjectsQuery({ page: 1, limit: 5 });

    const userName = user?.firstName || 'Student';
    
    // Normalize interests data from API - handle both {interestName} and {name} structures
    const rawInterests = myInterestsData?.interests || myInterestsData?.data || [];
  
    const myInterests = rawInterests.map((interest: any) => {
        // If it's already a string, return it
        if (typeof interest === 'string') return interest;
        // Otherwise extract the name from the object (interestName, name, or the whole object)
        return interest.interestName || interest.name || '';
    }).filter(Boolean); // Remove any empty strings

    const eventsCount = eventsData?.data?.events?.length || 0;
    const blogsCount = blogsData?.data?.blogs?.length || 0;
    const communitiesCount = communitiesData?.data?.length || 0;
    const projectsCount = projectsData?.data?.projects?.length || 0;

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Welcome Hero Section */}
            <div className="bg-gradient-to-br from-[#5773da] to-[#4861c9] rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {userName}!</h1>
                        </div>
                        <p className="text-white/90 text-sm sm:text-base mb-4">
                            Ready to continue your learning journey? Explore events, join communities, and grow your skills.
                        </p>
                        <Link to="/dashboard/events" className="inline-block px-6 py-2.5 bg-white text-[#5773da] hover:bg-gray-100 rounded-lg font-medium transition-colors shadow-md">
                            Explore Events
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Link to="/dashboard/events" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md hover:border-[#5773da] transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        {eventsLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{eventsCount}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Events Available</p>
                </Link>

                <Link to="/dashboard/blogs" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md hover:border-[#5773da] transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        {blogsLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{blogsCount}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Blogs to Read</p>
                </Link>

                <Link to="/dashboard/communities" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md hover:border-[#5773da] transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        {communitiesLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{communitiesCount}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Communities</p>
                </Link>

                <Link to="/dashboard/projects" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md hover:border-[#5773da] transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                        </div>
                        {projectsLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{projectsCount}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Projects</p>
                </Link>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Sidebar - Calendar & Quick Stats */}
                <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                    <CalendarWidget />
                    
                    {/* My Interests Card */}
                    {myInterests.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Heart className="w-5 h-5 text-rose-600" />
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">My Interests</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {myInterests.slice(0, 6).map((interest: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs sm:text-sm font-medium">
                                        {interest}
                                    </span>
                                ))}
                                {myInterests.length > 6 && (
                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
                                        +{myInterests.length - 6} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-[#5773da]" />
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="space-y-2">
                            <Link to="/dashboard/blogs" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Browse Blogs</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-[#5773da]">→</span>
                            </Link>
                            <Link to="/dashboard/help" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <BookMarked className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Get Help</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-[#5773da]">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Content - Events & Activity Feed */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Upcoming Events</h3>
                            </div>
                            <Link to="/dashboard/events" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium flex items-center gap-1">
                                View All <span className="hidden sm:inline">→</span>
                            </Link>
                        </div>
                        {eventsLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-[#5773da]" />
                            </div>
                        ) : eventsData?.data?.events && eventsData.data.events.length > 0 ? (
                            <div className="space-y-2 sm:space-y-3">
                                {eventsData.data.events.slice(0, 4).map((event: Event) => (
                                    <Link 
                                        key={event.id} 
                                        to={`/dashboard/events/${event.id}`}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <span className="text-xs sm:text-sm font-bold text-purple-600">
                                                {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="text-lg sm:text-xl font-bold text-purple-900">
                                                {new Date(event.startDate).getDate()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-purple-700">{event.title}</p>
                                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 mt-1">{event.location || 'Online'}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">No upcoming events at the moment</p>
                                <Link to="/dashboard/events" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium mt-2 inline-block">
                                    Explore All Events →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Latest Blogs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Latest Blogs</h3>
                            </div>
                            <Link to="/dashboard/blogs" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium flex items-center gap-1">
                                View All <span className="hidden sm:inline">→</span>
                            </Link>
                        </div>
                        {blogsLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-[#5773da]" />
                            </div>
                        ) : blogsData?.data?.blogs && blogsData.data.blogs.length > 0 ? (
                            <div className="space-y-2 sm:space-y-3">
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                {blogsData.data.blogs.slice(0, 3).map((blog: any) => (
                                    <Link 
                                        key={blog._id} 
                                        to={`/dashboard/blogs/${blog.slug || blog._id}`}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all group"
                                    >
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-blue-700">{blog.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(blog.createdAt || blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">No blogs available yet</p>
                                <Link to="/dashboard/blogs" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium mt-2 inline-block">
                                    Explore Blogs →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Active Communities */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-600" />
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Communities</h3>
                            </div>
                            <Link to="/dashboard/communities" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium flex items-center gap-1">
                                View All <span className="hidden sm:inline">→</span>
                            </Link>
                        </div>
                        {communitiesLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-[#5773da]" />
                            </div>
                        ) : communitiesData?.data && communitiesData.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
                                {communitiesData.data.slice(0, 4).map((community: any) => (
                                    <Link 
                                        key={community._id} 
                                        to="/dashboard/communities"
                                        className="p-3 rounded-lg bg-gray-50 hover:bg-green-50 hover:border-green-200 border border-transparent transition-all group"
                                    >
                                        <p className="font-medium text-gray-900 text-sm group-hover:text-green-700 line-clamp-1">{community.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{community.membersCount || 0} members</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">No communities available</p>
                                <Link to="/dashboard/communities" className="text-sm text-[#5773da] hover:text-[#4861c9] font-medium mt-2 inline-block">
                                    Explore Communities →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
