import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, RefreshCw } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetEventByIdQuery, useGetEventGalleryQuery } from '../features/api/EventApi';
import type { Event, GalleryImage } from '../features/api/EventApi';

const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return 'Date to be announced';
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
        const sameDay = start.toDateString() === end.toDateString();
        if (sameDay) return formatter.format(start);
        return `${formatter.format(start)} — ${formatter.format(end)}`;
    }

    return formatter.format((start ?? end)!);
};

const formatTimeRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });

    if (endDate) {
        const end = new Date(endDate);
        return `${formatter.format(start)} — ${formatter.format(end)}`;
    }

    return formatter.format(start);
};

export const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const {
        data: event,
        isLoading,
        isError,
        refetch,
    } = useGetEventByIdQuery(eventId ?? '', {
        skip: !eventId,
    });

    const {
        data: galleryData,
        isLoading: galleryLoading,
    } = useGetEventGalleryQuery(eventId ?? '', {
        skip: !eventId,
    });

    const galleryImages = galleryData?.data ?? [];

    // Handle both wrapped and unwrapped responses
    const eventData = (event?.data || event) as Event | undefined;

    const heroImage = useMemo(
        () =>
            eventData?.image ||
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
        [eventData?.image],
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Topbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#1e3a8a]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                {isLoading ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-t-3xl" />
                        <div className="p-8 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/3" />
                            <div className="h-10 bg-gray-200 rounded w-2/3" />
                            <div className="h-20 bg-gray-200 rounded" />
                        </div>
                    </div>
                ) : isError || !eventData ? (
                    <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Unable to load this event</h2>
                        <p className="text-gray-600">
                            Please check the link or try refreshing the page. It’s possible this event has been removed.
                        </p>
                        <button
                            onClick={() => eventId && refetch()}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1e3a8a] text-white font-semibold"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src={heroImage}
                                alt={eventData?.title}
                                className="w-full h-[360px] object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white space-y-2">
                                <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                                    BITSA Event
                                </p>
                                <h1 className="text-3xl md:text-4xl font-extrabold max-w-3xl">
                                    {eventData?.title}
                                </h1>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-[#1e3a8a]">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Date
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {formatDateRange(eventData?.startDate, eventData?.endDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-[#1e3a8a]">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Time
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {formatTimeRange(eventData?.startDate, eventData?.endDate) || 'TBA'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-[#1e3a8a]">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Venue
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {eventData?.locationName || 'Location to be announced'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900">About this event</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {eventData?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!isLoading && eventData && (
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Gallery</h3>
                        {galleryLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={`gallery-skeleton-${index}`} className="h-32 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                        ) : galleryImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {galleryImages.map((image: GalleryImage) => (
                                    <img
                                        key={image._id}
                                        src={image.imageUrl}
                                        alt={image.caption || 'Event gallery'}
                                        className="h-32 w-full object-cover rounded-xl hover:scale-[1.02] transition-transform"
                                        loading="lazy"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                Photos for this event will appear here after the session.
                            </p>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default EventDetails;