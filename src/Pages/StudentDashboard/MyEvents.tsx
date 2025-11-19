import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ExternalLink, RefreshCw, Filter } from 'lucide-react';
import { useGetAllEventsQuery } from '../../features/api/EventApi';

const skeletonItems = Array.from({ length: 6 });

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
    <div className="h-4 w-full bg-gray-100 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-100 rounded" />
  </div>
);

export const MyEvents = () => {
  const [eventType, setEventType] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: eventsData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetAllEventsQuery({
    page: currentPage,
    limit: 12,
  });

  const allEvents = eventsData?.events || [];
  const now = new Date();

  const filteredEvents = allEvents.filter((event) => {
    if (eventType === 'all') return true;
    if (!event.startDate) return false;
    const eventDate = new Date(event.startDate);
    if (eventType === 'upcoming') return eventDate >= now;
    return eventDate < now;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <p className="text-gray-600 mt-1">View and manage your event registrations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter Events:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setEventType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              eventType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setEventType('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              eventType === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setEventType('past')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              eventType === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl">
          <p>We couldn&apos;t load events. Please try again.</p>
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

      {/* Events Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skeletonItems.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">
            {eventType === 'upcoming'
              ? "You don't have any upcoming events registered."
              : eventType === 'past'
                ? "You don't have any past events."
                : "You haven't registered for any events yet."}
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
            const eventDate = event.startDate ? new Date(event.startDate) : null;
            const isUpcoming = eventDate && eventDate >= now;

            return (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                  </div>
                  {isUpcoming && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  {eventDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{eventDate.toLocaleDateString()}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/events/${event._id}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

