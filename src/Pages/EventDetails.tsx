import { useMemo, useState } from 'react';
// Lightbox state for gallery
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, RefreshCw } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetEventByIdQuery, useGetEventGalleryQuery } from '../features/api/eventApi';

import type { Event, GalleryImage } from '../features/api/eventApi';

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

    // Lightbox state for gallery
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const { eventId } = useParams();
    const navigate = useNavigate();
    const {
        data: event,
        isLoading,
        isError,
        refetch
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
        <div className="bg-gray-50 min-h-screen relative overflow-hidden">
            {/* Full-page SVG background (copied from Leaders page) */}
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

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#1e3a8a]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                {isLoading ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse relative z-10">
                        <div className="h-96 bg-gray-200 rounded-t-3xl" />
                        <div className="p-8 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/3" />
                            <div className="h-10 bg-gray-200 rounded w-2/3" />
                            <div className="h-20 bg-gray-200 rounded" />
                        </div>
                    </div>
                ) : isError || !eventData ? (
                    <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center space-y-4 relative z-10">
                        <h2 className="text-2xl font-bold text-gray-900">Unable to load this event</h2>
                        <p className="text-gray-600">
                            Please check the link or try refreshing the page. It’s possible this event has been removed.
                        </p>
                        <button
                            onClick={() => event && refetch()}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1e3a8a] text-white font-semibold"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden relative z-10">
                        <div className="flex flex-col lg:flex-row">
                            {/* Left: Event Info */}
                            <div className="flex-1 p-10 flex flex-col justify-between min-w-[320px]">
                                <div>
                                    <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{eventData?.title}</h1>
                                    <h2 className="text-xl font-bold mb-4 text-blue-800">Date & Location</h2>
                                    <div className="flex items-center text-gray-700 mb-2">
                                        <Calendar className="w-5 h-5 mr-2 text-[#1e3a8a]" />
                                        <span>{formatDateRange(eventData?.startDate, eventData?.endDate)}{eventData?.startDate && `, ${formatTimeRange(eventData?.startDate, eventData?.endDate)}`}</span>
                                    </div>
                                    {/* Add to Calendar (placeholder) */}
                                    <div className="mb-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 font-semibold text-sm hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            onClick={() => {
                                                if (!eventData) return;
                                                const pad = (n: number) => n.toString().padStart(2, '0');
                                                const formatICSDate = (dateStr: string | number | Date) => {
                                                    if (!dateStr) return '';
                                                    const d = new Date(dateStr);
                                                    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
                                                };
                                                const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${eventData.title || ''}\nDESCRIPTION:${eventData.description || ''}\nLOCATION:${eventData.locationName || ''}\nDTSTART:${formatICSDate(eventData.startDate)}\nDTEND:${formatICSDate(eventData.endDate)}\nEND:VEVENT\nEND:VCALENDAR`;
                                                const blob = new Blob([icsContent], { type: 'text/calendar' });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `${eventData.title || 'event'}.ics`;
                                                document.body.appendChild(a);
                                                a.click();
                                                setTimeout(() => {
                                                    document.body.removeChild(a);
                                                    URL.revokeObjectURL(url);
                                                }, 100);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            Add to Calendar
                                        </button>
                                    </div>
                                    <div className="flex items-center text-gray-700 mb-2">
                                        <MapPin className="w-5 h-5 mr-2 text-[#1e3a8a]" />
                                        <span>{eventData?.locationName || 'Booking'}</span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="block font-bold text-green-700">Free</span>
                                    </div>
                                    <button className="px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold text-base transition w-max">Book Event</button>
                                </div>
                            </div>
                            {/* Right: Map */}
                            <div className="flex-1 min-w-[320px] p-4 flex items-center justify-center">
                                {(eventData?.latitude && eventData?.longitude) || eventData?.locationName ? (
                                    <div className="w-full h-96 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                        <iframe
                                            title="Event location map"
                                            src={(() => {
                                                if (eventData?.latitude && eventData?.longitude) {
                                                    const lat = encodeURIComponent(eventData.latitude);
                                                    const lng = encodeURIComponent(eventData.longitude);
                                                    return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                                                }
                                                const query = encodeURIComponent(eventData?.locationName || '');
                                                return `https://www.google.com/maps?q=${query}&z=15&output=embed`;
                                            })()}
                                            className="w-full h-full border-0"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {/* Event Image below info */}
                        <div className="w-full">
                            <img
                                src={heroImage}
                                alt={eventData?.title}
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                )}

                {!isLoading && eventData && (
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6 relative z-10">
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
                                        className="h-32 w-full object-cover rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                                        loading="lazy"
                                        onClick={() => setSelectedImage(image)}
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

            {/* Lightbox Modal for Event Gallery - outside <main> for valid JSX structure */}
            {selectedImage && (() => {
                const currentIndex = galleryImages.findIndex((img) => img._id === selectedImage._id);
                const showPrev = currentIndex > 0;
                const showNext = currentIndex < galleryImages.length - 1;
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
                        <div className="relative max-w-3xl w-full flex items-center justify-center">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-3 right-3 z-10 rounded-full bg-black/70 text-white px-4 py-2 text-lg hover:bg-black/90"
                            >
                                ×
                            </button>
                            {showPrev && (
                                <button
                                    onClick={() => setSelectedImage(galleryImages[currentIndex - 1])}
                                    className="absolute left-2 md:left-4 z-10 rounded-full bg-black/70 text-white px-3 py-2 text-2xl hover:bg-black/90"
                                    aria-label="Previous image"
                                >
                                    &#8592;
                                </button>
                            )}
                            <img
                                src={selectedImage.imageUrl}
                                alt="Gallery preview"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl mx-auto"
                            />
                            {showNext && (
                                <button
                                    onClick={() => setSelectedImage(galleryImages[currentIndex + 1])}
                                    className="absolute right-10 md:right-16 z-10 rounded-full bg-black/70 text-white px-3 py-2 text-2xl hover:bg-black/90"
                                    aria-label="Next image"
                                >
                                    &#8594;
                                </button>
                            )}
                        </div>
                    </div>
                );
            })()}
            <Footer />
        </div>
    );
};

export default EventDetails;