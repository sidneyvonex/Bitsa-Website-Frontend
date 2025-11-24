import { useParams, useNavigate } from 'react-router-dom';
import { useGetEventByIdQuery, useGetEventGalleryQuery } from '../../features/api';
import { Calendar, MapPin, Clock, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

export const StudentEventDetail = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    
    const { data: eventData, isLoading, error, refetch } = useGetEventByIdQuery(eventId || '');
    const { data: galleryData, isLoading: galleryLoading } = useGetEventGalleryQuery(eventId || '');

    const event = useMemo(() => (eventData?.data || eventData) as any, [eventData]);
    const galleryImages = useMemo(() => (galleryData?.data ?? []) as any[], [galleryData]);

    const handleRegister = () => {
        toast.success('Registered for event successfully!');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-[#5773da] hover:text-[#4861c9] font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Unable to load this event</h2>
                    <p className="text-gray-600">Please check the link or try refreshing the page.</p>
                    <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#5773da] text-white font-semibold"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const heroImage = event.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80';

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#5773da]"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left: Event Info */}
                    <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between min-w-[320px]">
                        <div>
                            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{event.title}</h1>
                            
                            <h2 className="text-lg font-bold mb-4 text-[#5773da]">Date & Location</h2>
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-gray-700 gap-3">
                                    <Calendar className="w-5 h-5 text-[#5773da]" />
                                    <span>{new Date(event.startDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center text-gray-700 gap-3">
                                    <Clock className="w-5 h-5 text-[#5773da]" />
                                    <span>{new Date(event.startDate).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</span>
                                </div>
                                {event.location && (
                                    <div className="flex items-center text-gray-700 gap-3">
                                        <MapPin className="w-5 h-5 text-[#5773da]" />
                                        <span>{event.location}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <span className="block text-lg font-bold text-green-600">Free Event</span>
                            </div>

                            <button
                                onClick={handleRegister}
                                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                            >
                                Register for Event
                            </button>
                        </div>
                    </div>

                    {/* Right: Map */}
                    <div className="flex-1 min-w-[320px] p-4 flex items-center justify-center">
                        {(event.latitude && event.longitude) || event.location ? (
                            <div className="w-full h-96 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                <iframe
                                    title="Event location map"
                                    src={(() => {
                                        if (event.latitude && event.longitude) {
                                            const lat = encodeURIComponent(event.latitude);
                                            const lng = encodeURIComponent(event.longitude);
                                            return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                                        }
                                        const query = encodeURIComponent(event.location || '');
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

                {/* Event Image */}
                <div className="w-full">
                    <img
                        src={heroImage}
                        alt={event.title}
                        className="w-full h-80 object-cover"
                    />
                </div>
            </div>

            {/* Description Section */}
            {event.description && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">About this event</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{event.description}</p>
                </div>
            )}

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Event Gallery</h3>
                    {galleryLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={`gallery-skeleton-${i}`} className="h-32 bg-gray-200 rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryImages.map((image: any, idx: number) => (
                                <img
                                    key={image._id || idx}
                                    src={image.imageUrl}
                                    alt={image.caption || 'Event gallery'}
                                    className="h-32 w-full object-cover rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
