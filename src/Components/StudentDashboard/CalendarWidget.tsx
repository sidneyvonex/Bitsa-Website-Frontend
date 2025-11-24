import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useGetAllEventsQuery } from '../../features/api/eventApi';

export const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { data: eventsData } = useGetAllEventsQuery({ page: 1, limit: 100 });

    const events = eventsData?.data?.events || [];

    // Get month and year
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Navigate months
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Check if date has events
    const hasEvent = (day: number) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.some(event => {
            const eventDate = new Date(event.startDate).toISOString().split('T')[0];
            return eventDate === dateStr;
        });
    };

    // Get today
    const today = new Date();
    const isToday = (day: number) => {
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(
            <div
                key={day}
                className={`
          h-10 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer
          transition-all relative
          ${isToday(day)
                        ? 'bg-[#5773da] text-white font-bold'
                        : hasEvent(day)
                            ? 'bg-blue-50 text-[#5773da] hover:bg-blue-100'
                            : 'text-gray-700 hover:bg-gray-100'
                    }
        `}
            >
                {day}
                {hasEvent(day) && !isToday(day) && (
                    <div className="absolute bottom-1 w-1 h-1 bg-[#5773da] rounded-full"></div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#5773da]" />
                    <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
                        {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#5773da] rounded"></div>
                    <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
                    <span className="text-gray-600">Has Events</span>
                </div>
            </div>

            {/* Upcoming events summary */}
            {events.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Upcoming Events</p>
                    <div className="space-y-2">
                        {events.slice(0, 3).map((event) => (
                            <div key={event._id} className="flex items-center gap-2 text-xs">
                                <div className="w-1.5 h-1.5 bg-[#5773da] rounded-full"></div>
                                <span className="text-gray-600 truncate">{event.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
