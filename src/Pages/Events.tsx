import { useState, useMemo } from 'react';
import { PuffLoader } from 'react-spinners';
import { Calendar, Search, Filter, MapPin } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllEventsQuery } from '../features/api/eventApi';
import { Link } from 'react-router-dom';
import type { Event as EventType } from '../features/api/eventApi';


const EmptyState = () => (
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-800 mb-2">No events found</p>
        <p className="text-gray-600">Check back soon for upcoming tech events and workshops.</p>
    </div>
);


export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState<'upcoming' | 'past'>('upcoming');
    const [currentPage, setCurrentPage] = useState(1);
    const EVENTS_PER_PAGE = 6;
    const { data, isLoading } = useGetAllEventsQuery({ page: 1, limit: 50 });
    const filteredEvents = useMemo(() => {
        const allEvents = data?.data?.events || [];
        const now = new Date();
        // Filter by event type (upcoming or past)
        const typeFiltered = allEvents.filter((event: EventType) => {
            const eventDate = new Date(event.startDate);
            return eventType === 'upcoming' ? eventDate >= now : eventDate < now;
        });
        let filtered = typeFiltered;
        if (searchQuery) {
            filtered = filtered.filter((event: EventType) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [data, searchQuery, eventType]);

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE) || 1;
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    // Reset to page 1 when filters change
    // (useEffect is not needed for simple state, but can be added for robustness)
    // useEffect(() => { setCurrentPage(1); }, [searchQuery, eventType]);

    return (
        <div className="min-h-screen bg-[#f5f6f7] relative overflow-hidden">
            {/* Full-page SVG background (from Leaders page) */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1440 1200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="bg1" cx="50%" cy="30%" r="60%" fx="50%" fy="30%" gradientTransform="rotate(30)">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="1440" height="1200" fill="url(#bg1)" />
                <ellipse cx="200" cy="200" rx="180" ry="80" fill="#60a5fa" opacity="0.08" />
                <ellipse cx="1240" cy="1000" rx="140" ry="60" fill="#818cf8" opacity="0.09" />
                <path d="M0 900 Q 360 1100 720 900 T 1440 900" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.13" />
                <circle cx="900" cy="300" r="90" fill="#f59e0b" opacity="0.07" />
                <circle cx="400" cy="1000" r="60" fill="#60a5fa" opacity="0.07" />
            </svg>
            <Topbar />
            <main className="flex flex-col items-center justify-center py-8 min-h-[80vh]">
                <div className="w-full max-w-6xl bg-white rounded-3xl shadow-md px-4 sm:px-8 py-8 mt-6 mb-12 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Events</h1>
                    {/* Tabs for Upcoming/Past */}
                    <div className="flex gap-4 mb-8 justify-center">
                        <button
                            onClick={() => setEventType('upcoming')}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${eventType === 'upcoming'
                                ? 'bg-[#1e40af] text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1e40af]'
                                }`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setEventType('past')}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${eventType === 'past'
                                ? 'bg-[#1e40af] text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1e40af]'
                                }`}
                        >
                            Past Events
                        </button>
                    </div>
                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                        <div className="flex-1 w-full relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border-2 border-[#1e40af] focus:border-[#1e40af] rounded-lg focus:ring-2 focus:ring-[#1e40af]/80 text-lg bg-white text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-[#1e40af]/10 transition">
                            <Filter className="w-5 h-5 text-[#1e40af]" />
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold text-lg transition">Search</button>
                    </div>
                    {/* Events List */}
                    <div className="flex flex-col gap-6">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <PuffLoader color="#1e40af" size={64} />
                                <span className="mt-4 text-[#1e40af] font-semibold">Loading events...</span>
                            </div>
                        ) : filteredEvents.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {paginatedEvents.map((event: EventType) => (
                                    <div key={event.id} className="flex flex-col sm:flex-row items-start bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 gap-6">
                                        <img
                                            src={event.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'}
                                            alt={event.title}
                                            className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-4 sm:mb-0"
                                        />
                                        <div className="flex-1 flex flex-col gap-2">
                                            <h2 className="text-2xl font-extrabold mb-1 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{event.title}</h2>
                                            <p className="text-gray-700 text-base mb-1 line-clamp-2">{event.description}</p>
                                            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(event.startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}{event.endDate ? ` - ${new Date(event.endDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}</span>
                                                {event.time && <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg> {event.time}</span>}
                                                {event.locationName && <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#1e40af]" /> {event.locationName}</span>}
                                            </div>
                                            {/* No price field in Event type, so nothing here */}
                                            <Link to={`/events/${event.id}`} className="mt-2 w-max px-6 py-2 rounded-lg bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold text-base transition">View Event</Link>
                                        </div>
                                    </div>
                                ))}
                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-8">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded-lg font-medium border border-gray-200 bg-white text-gray-700 hover:bg-[#1e40af]/10 transition disabled:opacity-50`}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 rounded-lg font-medium border border-gray-200 ${currentPage === page ? 'bg-[#1e40af] text-white' : 'bg-white text-gray-700 hover:bg-[#1e40af]/10'} transition`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded-lg font-medium border border-gray-200 bg-white text-gray-700 hover:bg-[#1e40af]/10 transition disabled:opacity-50`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}