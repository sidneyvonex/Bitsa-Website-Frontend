import { useState, useMemo } from 'react';
import { Calendar, Search, Filter, RefreshCw } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllEventsQuery } from '../features/api';
import { EventCard } from '../Components/Events/EventCard';
import type { Event as EventType } from '../features/api/EventApi';
import { EventCalendar } from '../Components/Events/EventCalendar';

const skeletonItems = Array.from({ length: 6 });

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-full bg-gray-100 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-100 rounded mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="h-10 w-full bg-gray-200 rounded" />
    </div>
);

const EmptyState = () => (
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-800 mb-2">No events found</p>
        <p className="text-gray-600">Check back soon for upcoming tech events and workshops.</p>
    </div>
);

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [eventType, setEventType] = useState<'upcoming' | 'past'>('upcoming');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const { data, isLoading, isError, refetch, isFetching } = useGetAllEventsQuery({ page: 1, limit: 50 });
    const filteredEvents = useMemo(() => {
        const allEvents = data?.data?.events || [];
        const now = new Date();

        // Filter by event type (upcoming or past)
        const typeFiltered = allEvents.filter((event: EventType) => {
            const eventDate = new Date(event.startDate);
            return eventType === 'upcoming' ? eventDate >= now : eventDate < now;
        });

        let filtered = typeFiltered;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((event: EventType) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Note: API events don't have a category field, so we can't filter by it
        // The category is derived from the title by EventCard component

        return filtered;
    }, [data, searchQuery, eventType]);

    // Extract unique categories (API doesn't return categories, so we'll use all)
    const categories = useMemo(() => {
        return ['all'];
    }, []);

    return (
        <div>
            <Topbar />
            <main className="min-h-screen bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <section className="text-center mb-12">
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Events</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {eventType === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
                        </h1>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            {eventType === 'upcoming'
                                ? 'Join us for workshops, hackathons, tech talks, and networking events. Connect with fellow tech enthusiasts and expand your knowledge.'
                                : 'Explore past events and learn about what we\'ve accomplished together. Check out photos and highlights from previous sessions.'}
                        </p>
                    </section>

                    {/* Event Type Tabs */}
                    <div className="flex gap-4 mb-8 justify-center">
                        <button
                            onClick={() => setEventType('upcoming')}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${eventType === 'upcoming'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setEventType('past')}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${eventType === 'past'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            Past Events
                        </button>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Error State */}
                    {isError && (
                        <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl mb-8">
                            <p>We couldn&apos;t load the events. Please try again.</p>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                onClick={() => refetch()}
                            >
                                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Calendar and Events Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Calendar Sidebar */}
                        <div className="lg:col-span-1">
                            <EventCalendar
                                events={data?.data?.events || []}
                                onDateSelect={setSelectedDate}
                                selectedDate={selectedDate}
                            />
                        </div>

                        {/* Events Grid */}
                        <div className="lg:col-span-3">
                            {isLoading ? (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {skeletonItems.map((_, index) => (
                                        <SkeletonCard key={`skeleton-${index}`} />
                                    ))}
                                </div>
                            ) : filteredEvents.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-gray-600">
                                            Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {filteredEvents.map((event: EventType) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
