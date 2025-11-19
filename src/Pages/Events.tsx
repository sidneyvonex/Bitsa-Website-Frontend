import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, RefreshCw } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { EventCard } from '../Components/events/evencards';
import { useGetPastEventsQuery, useGetUpcomingEventsQuery } from '../features/api';
import type { EventListResponse } from '../features/api/EventApi';

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse h-full">
        <div className="h-56 bg-gray-200" />
        <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
        </div>
    </div>
);

const getEventsFromResponse = (response?: EventListResponse) => response?.events ?? [];

export const Events = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>(() =>
        location.pathname.endsWith('/past') ? 'past' : 'upcoming',
    );

    useEffect(() => {
        if (location.pathname.endsWith('/past')) {
            setActiveTab('past');
        } else {
            setActiveTab('upcoming');
        }
    }, [location.pathname]);

    const {
        data: upcomingData,
        isLoading: loadingUpcoming,
        isError: errorUpcoming,
        refetch: refetchUpcoming,
    } = useGetUpcomingEventsQuery(20);

    const {
        data: pastData,
        isLoading: loadingPast,
        isError: errorPast,
        refetch: refetchPast,
    } = useGetPastEventsQuery({ page: 1, limit: 20 });

    const activeEvents = activeTab === 'upcoming'
        ? getEventsFromResponse(upcomingData)
        : getEventsFromResponse(pastData);

    const isLoading = activeTab === 'upcoming' ? loadingUpcoming : loadingPast;
    const isError = activeTab === 'upcoming' ? errorUpcoming : errorPast;
    const refetch = activeTab === 'upcoming' ? refetchUpcoming : refetchPast;

    const filteredEvents = useMemo(() => {
        const normalizedQuery = searchTerm.trim().toLowerCase();
        if (!normalizedQuery) return activeEvents;

        return activeEvents.filter((event) => {
            const haystack = `${event.title} ${event.description} ${event.locationName}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [activeEvents, searchTerm]);

    const handleTabChange = (tab: 'upcoming' | 'past') => {
        setActiveTab(tab);
        if (tab === 'past') {
            navigate('/events/past');
        } else {
            navigate('/events/upcoming');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Topbar />

            <section className="bg-gradient-to-b from-[#e0e7ff] to-transparent py-16">
                <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                        BITSA Community
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Upcoming & Past Events
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore hackathons, workshops, talks, and networking sessions curated by BITSA. Stay inspired, build projects, and connect with the brightest minds on campus.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleTabChange('upcoming')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${activeTab === 'upcoming'
                                ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#1e3a8a]'}`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => handleTabChange('past')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${activeTab === 'past'
                                ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#1e3a8a]'}`}
                        >
                            Past Events
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-1/2">
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by title, topic, or venue"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-200 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>
                                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                            </span>
                            {isError && (
                                <button
                                    onClick={() => refetch()}
                                    className="inline-flex items-center gap-1 text-red-600 font-semibold"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Retry
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonCard key={`event-skeleton-${index}`} />
                        ))}
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                variant={activeTab === 'past' ? 'past' : 'upcoming'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-700 text-2xl font-bold">
                            ☕
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            No events match your search
                        </h3>
                        <p className="text-gray-600">
                            Try a different keyword or check back later for more BITSA happenings.
                        </p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="text-[#1e3a8a] font-semibold underline underline-offset-4"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

