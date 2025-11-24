import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllEventsQuery } from '../features/api/eventApi';
import type { Event as EventType } from '../features/api/eventApi';
import { PuffLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export const EventsCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data, isLoading } = useGetAllEventsQuery({ page: 1, limit: 50 });

  const allEvents = useMemo(() => data?.data?.events || [], [data]);

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return allEvents.filter((event: EventType) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      return isSameDay(day, eventStartDate) || isSameDay(day, eventEndDate) || (day > eventStartDate && day < eventEndDate);
    });
  };

  // Calendar generation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get first day of week offset
  const firstDayOfWeek = monthStart.getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDate(null);
  };

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <PuffLoader color="#3b82f6" size={80} />
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Events Calendar</h1>
            <p className="text-xl text-gray-600">Browse all BITSA events in a calendar view. Colored badges indicate days with events.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {format(currentDate, 'MMMM yyyy')}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-700 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty days before month starts */}
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {/* Days of month */}
                  {daysInMonth.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isDayToday = isToday(day);

                    return (
                      <div
                        key={day.toISOString()}
                        onClick={() => isCurrentMonth && setSelectedDate(day)}
                        className={`
                          aspect-square rounded-lg p-2 relative cursor-pointer transition-all
                          ${!isCurrentMonth ? 'opacity-30 cursor-default' : 'hover:bg-blue-50'}
                          ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-400' : isCurrentMonth ? 'bg-gray-50 text-gray-900' : 'text-gray-400'}
                          ${isDayToday && !isSelected ? 'ring-2 ring-orange-400 bg-orange-50' : ''}
                        `}
                      >
                        <div className="text-sm font-semibold mb-1">{format(day, 'd')}</div>

                        {/* Event Indicators */}
                        <div className="flex flex-wrap gap-1">
                          {dayEvents.slice(0, 2).map((event, idx) => (
                            <div
                              key={idx}
                              className={`
                                w-1.5 h-1.5 rounded-full
                                ${idx % 3 === 0 ? 'bg-red-500' : idx % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'}
                              `}
                              title={event.title}
                            />
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs font-bold text-orange-600">+{dayEvents.length - 2}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Event Indicators:</p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Event 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Event 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Event 3+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full ring-2 ring-orange-400"></div>
                      <span className="text-sm text-gray-600">Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events for Selected Day */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {selectedDate
                    ? format(selectedDate, 'EEEE, MMMM d, yyyy')
                    : 'Select a day'}
                </h3>

                {selectedDate && selectedDayEvents.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No events on this day</p>
                  </div>
                )}

                {selectedDate && selectedDayEvents.length > 0 && (
                  <div className="space-y-4">
                    {selectedDayEvents.map((event: EventType) => (
                      <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="block p-4 border-l-4 border-blue-600 bg-blue-50 rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {event.description}
                        </p>
                        {event.location || event.locationName && (
                          <div className="flex items-center gap-1 mt-3 text-sm text-gray-700">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{event.location || event.locationName}</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {format(new Date(event.startDate), 'HH:mm')} - {format(new Date(event.endDate), 'HH:mm')}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {!selectedDate && (
                  <p className="text-gray-600 text-center py-8">Click on a day to view events</p>
                )}
              </div>
            </div>
          </div>

          {/* All Events List Section */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allEvents
                  .filter((event: EventType) => new Date(event.startDate) >= new Date())
                  .sort((a: EventType, b: EventType) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .slice(0, 6)
                  .map((event: EventType) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="group hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
                        {event.image && (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-1 mt-3 text-sm text-gray-700">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(event.startDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
