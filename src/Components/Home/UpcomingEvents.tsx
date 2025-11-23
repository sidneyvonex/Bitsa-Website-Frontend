
import { useGetAllEventsQuery } from '../../features/api/eventApi';

export const UpcomingEvents = () => {
    const { data, isLoading } = useGetAllEventsQuery({ page: 1, limit: 50 });
    const now = new Date();
    const events = (data?.data?.events || [])
        .filter((event) => new Date(event.startDate) >= now)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 4); // Show only the next 4 upcoming events

    return (
        <section className="pt-8 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Upcoming Events
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join us for exciting tech events, workshops, and networking opportunities. Stay connected with the BITSA community!
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 h-96 animate-pulse" />
                        ))
                    ) : events.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">No upcoming events found.</div>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100"
                            >
                                {/* Event Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#f59e0b] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                            {event.category || 'Event'}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-5">
                                    {/* Date & Time */}
                                    <div className="flex items-center text-sm text-gray-600 mb-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                            />
                                        </svg>
                                        <span>{new Date(event.startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}{event.endDate ? ` - ${new Date(event.endDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                        {event.title}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center text-sm text-gray-600 mb-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                        <span>{event.locationName || event.location || 'TBA'}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    {/* Register Button */}
                                    <button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-2 px-4 rounded font-semibold text-sm transition-colors">
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View All Events Button */}
                <div className="text-center">
                    <a
                        href="/events"
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