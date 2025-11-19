import { useGetUpcomingEventsQuery } from '../../features/api';
import type { Event } from '../../features/api/EventApi';
import { EventCard } from '../events/evencards';

const fallbackEvents: Event[] = [
    {
        id: 'fallback-1',
        title: 'BITSA CodeSprint Hackathon',
        description: '48-hour coding marathon focused on AI for Social Good. Teams of 1-4 students compete for amazing prizes!',
        startDate: '2025-03-15T09:00:00.000Z',
        endDate: '2025-03-17T18:00:00.000Z',
        locationName: 'UEAB Tech Hub',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
        category: 'Hackathon',
    },
    {
        id: 'fallback-2',
        title: 'Web Development Workshop',
        description: 'Learn modern web development with React, TypeScript, and Tailwind CSS. Hands-on session for beginners and intermediate developers.',
        startDate: '2025-02-20T14:00:00.000Z',
        endDate: '2025-02-20T17:00:00.000Z',
        locationName: 'Computer Lab A',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
        category: 'Workshop',
    },
    {
        id: 'fallback-3',
        title: 'Tech Talk: AI & Machine Learning',
        description: 'Industry experts discuss the latest trends in AI/ML, career opportunities, and real-world applications.',
        startDate: '2025-02-28T16:00:00.000Z',
        endDate: '2025-02-28T18:00:00.000Z',
        locationName: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
        category: 'Tech Talk',
    },
    {
        id: 'fallback-4',
        title: 'BITSA Networking Night',
        description: 'Connect with fellow tech enthusiasts, alumni, and industry professionals. Refreshments provided!',
        startDate: '2025-03-05T18:00:00.000Z',
        endDate: '2025-03-05T21:00:00.000Z',
        locationName: 'Student Center',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
        category: 'Networking',
    },
];

const LoadingCard = () => (
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

export const UpcomingEvents = () => {
    const { data, isLoading, isError, refetch } = useGetUpcomingEventsQuery(4);
    const hasApiEvents = (data?.events?.length ?? 0) > 0;
    const eventsToRender = hasApiEvents ? data!.events.slice(0, 4) : fallbackEvents;

    return (
        <section className="pt-8 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Upcoming Events
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join us for exciting tech events, workshops, and networking opportunities. Stay connected with the BITSA community!
                    </p>
                    {isError && (
                        <div className="mt-4 inline-flex items-center gap-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 border border-red-100">
                            Unable to load events right now.
                            <button onClick={() => refetch()} className="font-semibold underline">
                                Try again
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => <LoadingCard key={`skeleton-${index}`} />)
                        : eventsToRender.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                variant="upcoming"
                            />
                        ))}
                </div>

                {!hasApiEvents && !isLoading && (
                    <p className="text-center text-sm text-gray-500 mb-6">
                        Showing curated sample events while we wait for live events from the BITSA API.
                    </p>
                )}

                <div className="text-center">
                    <a
                        href="/events/upcoming"
                        className="inline-flex items-center bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
                    >
                        View All Events
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 ml-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};
