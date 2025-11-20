import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Event } from '../../features/api/EventApi';

const categoryStyles: Record<
    string,
    { badge: string; text: string }
> = {
    hackathon: { badge: 'bg-orange-500/90 text-white', text: 'Hackathon' },
    workshop: { badge: 'bg-emerald-500/90 text-white', text: 'Workshop' },
    'tech talk': { badge: 'bg-indigo-500/90 text-white', text: 'Tech Talk' },
    networking: { badge: 'bg-amber-500/90 text-white', text: 'Networking' },
    default: { badge: 'bg-blue-600 text-white', text: 'Event' },
};

const getCategory = (event: Event) => {
    // Since the real API doesn't have a category field, we'll derive from title
    const title = event.title.toLowerCase();

    if (title.includes('hackathon')) return categoryStyles.hackathon;
    if (title.includes('workshop')) return categoryStyles.workshop;
    if (title.includes('talk')) return categoryStyles['tech talk'];
    if (title.includes('network')) return categoryStyles.networking;

    return categoryStyles.default;
};

const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return 'Date to be announced';

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (start && end) {
        const sameDay = start.toDateString() === end.toDateString();
        if (sameDay) {
            return formatter.format(start);
        }
        return `${formatter.format(start)} — ${formatter.format(end)}`;
    }

    return formatter.format((start ?? end)!);
};

interface EventCardProps {
    event: Event;
    variant?: 'upcoming' | 'past';
}

export const EventCard = ({ event, variant = 'upcoming' }: EventCardProps) => {
    const category = getCategory(event);
    const dateLabel = formatDateRange(event.startDate, event.endDate);
    const image = event.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80';

    return (
        <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                />
                <span className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${category.badge}`}>
                    {category.text}
                </span>
            </div>

            <div className="flex-1 flex flex-col p-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Calendar className="w-4 h-4 text-[#1e3a8a]" />
                    <span>{dateLabel}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                    {event.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin className="w-4 h-4 text-[#1e3a8a]" />
                    <span>{event.locationName || 'Location TBA'}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {event.description}
                </p>

                <Link
                    to={`/events/${event.id}`}
                    className={`mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold text-sm transition-colors ${variant === 'past'
                        ? 'border border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white'
                        : 'bg-[#1e3a8a] text-white hover:bg-[#1a2f6f]'
                        }`}
                >
                    {variant === 'past' ? 'View Highlights' : 'Register Now'}
                </Link>
            </div>
        </article>
    );
};