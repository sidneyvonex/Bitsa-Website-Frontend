import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Event } from '../../features/api/EventApi';

interface EventCalendarProps {
    events: Event[];
    onDateSelect: (date: Date) => void;
    selectedDate?: Date;
}

export const EventCalendar = ({ events, onDateSelect, selectedDate }: EventCalendarProps) => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' });

    // Create calendar grid
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Group events by date
    const eventsByDate = useMemo(() => {
        const grouped: { [key: string]: Event[] } = {};
        events.forEach((event) => {
            const eventDate = new Date(event.startDate);
            const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(event);
        });
        return grouped;
    }, [events]);

    const days = [];
    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                        {monthName} {year}
                    </h3>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-2">
                    {dayLabels.map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        if (!day) {
                            return <div key={`empty-${index}`} className="p-2" />;
                        }

                        const dateKey = `${year}-${month}-${day}`;
                        const dayEvents = eventsByDate[dateKey] || [];
                        const isToday =
                            day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                        const isSelected =
                            selectedDate &&
                            day === selectedDate.getDate() &&
                            month === selectedDate.getMonth() &&
                            year === selectedDate.getFullYear();

                        return (
                            <button
                                key={day}
                                onClick={() => onDateSelect(new Date(year, month, day))}
                                className={`p-2 rounded-lg text-center transition-colors relative group ${isSelected
                                        ? 'bg-blue-600 text-white'
                                        : isToday
                                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                            : dayEvents.length > 0
                                                ? 'bg-green-50 text-gray-900'
                                                : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="text-sm font-semibold">{day}</div>
                                {dayEvents.length > 0 && (
                                    <div className="flex justify-center gap-1 mt-1">
                                        <span
                                            className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold ${isSelected ? 'bg-white text-blue-600' : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {dayEvents.length}
                                        </span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-600" />
                        <span className="text-gray-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span className="text-gray-600">Has events</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded border border-blue-200 bg-blue-50" />
                        <span className="text-gray-600">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
