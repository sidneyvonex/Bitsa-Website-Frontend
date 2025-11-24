/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Search, Loader2 } from 'lucide-react';
import { useGetAllEventsQuery } from '../../features/api';
import { Link } from 'react-router-dom';

export const StudentEvents = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState<'upcoming' | 'past'>('upcoming');
    const { data: eventsData, isLoading } = useGetAllEventsQuery({ page: 1, limit: 50 });

    const filteredEvents = useMemo(() => {
        const allEvents = eventsData?.data?.events || [];
        const now = new Date();

        return allEvents.filter((event: any) => {
            const eventDate = new Date(event.startDate);
            const matchesType = eventType === 'upcoming' ? eventDate >= now : eventDate < now;
            const matchesSearch = !searchQuery || 
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [eventsData, searchQuery, eventType]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
                <p className="text-gray-600">Discover and attend tech events and workshops</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['upcoming', 'past'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setEventType(type as 'upcoming' | 'past')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                                    eventType === type
                                        ? 'bg-[#5773da] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
                </div>
            ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event: any) => (
                        <Link
                            key={event.id}
                            to={`/dashboard/events/${event.id}`}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden group"
                        >
                            {event.image && (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#5773da]">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-3">
                                    {event.description}
                                </p>
                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(event.startDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(event.startDate).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {event.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No {eventType} events found</p>
                </div>
            )}
        </div>
    );
};
