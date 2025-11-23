import { Image, Camera, Calendar, Users } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllGalleryImagesQuery, type GalleryImage } from '../features/api/eventApi';
import { useMemo, useState } from 'react';

export const Gallery = () => {
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const limit = 12;

    const { data, isLoading, isError, refetch, isFetching } = useGetAllGalleryImagesQuery({ page, limit });

    const images = useMemo(() => data?.images ?? [], [data]);
    const pagination = data?.pagination;

    const groupedByEvent = useMemo(() => {
        const groups: Record<string, { eventTitle: string; eventDate?: string; images: GalleryImage[] }> = {};
        images.forEach((img) => {
            const key = img.eventId || 'unknown';
            if (!groups[key]) {
                groups[key] = {
                    eventTitle: img.eventTitle || 'BITSA Event',
                    eventDate: img.eventDate,
                    images: [],
                };
            }
            groups[key].images.push(img);
        });
        return groups;
    }, [images]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
            {/* Subtle SVG background to match Leaders page */}
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
            <main className="min-h-screen py-16 relative z-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <section className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-blue-100 rounded-full">
                                <Camera className="w-12 h-12 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Resources</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Explore moments from our events, workshops, hackathons, and community gatherings. See BITSA in action!
                        </p>
                    </section>

                    {/* Error state */}
                    {isError && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-center justify-between">
                            <p className="text-red-700">
                                We couldn&apos;t load the gallery right now. Please try again.
                            </p>
                            <button
                                onClick={() => refetch()}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                            >
                                <Camera className="w-4 h-4" />
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Gallery by event sections */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <div
                                    key={`gallery-skeleton-${idx}`}
                                    className="aspect-square rounded-2xl bg-gray-200 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : images.length === 0 ? (
                        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-800 mb-2">No gallery items yet</p>
                            <p className="text-gray-600">Photos from BITSA events will appear here once uploaded.</p>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {Object.entries(groupedByEvent).map(([eventId, group]) => (
                                <section key={eventId} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-blue-600" />
                                                {group.eventTitle}
                                            </h2>
                                            {group.eventDate && (
                                                <p className="text-sm text-gray-500">
                                                    {new Date(group.eventDate).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {group.images.length} photo{group.images.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {group.images.map((img) => (
                                            <figure
                                                key={img.id}
                                                className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300"
                                                onClick={() => {
                                                    setSelectedImage(img);
                                                    setSelectedEventId(img.eventId || 'unknown');
                                                }}
                                            >
                                                <img
                                                    src={`${img.imageUrl}?w=800&q=80`}
                                                    alt={img.title || group.eventTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                {/* Only show the image title as caption, no 'By ...' */}
                                                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                                                    <p className="font-semibold line-clamp-1">
                                                        {img.title || group.eventTitle}
                                                    </p>
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}

                    {/* Pagination footer */}
                    {pagination && images.length > 0 && (
                        <div className="flex items-center justify-between mt-10 text-sm text-gray-500 flex-wrap gap-3">
                            <p>
                                Page {pagination.page} of {pagination.totalPages} &middot;{' '}
                                {pagination.total} photos
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1 || isFetching}
                                    className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setPage((p) =>
                                            pagination ? Math.min(pagination.totalPages, p + 1) : p + 1,
                                        )
                                    }
                                    disabled={pagination && (page >= pagination.totalPages || isFetching)}
                                    className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>


            {/* Lightbox Modal - Only Image, No Captions, With Navigation */}
            {selectedImage && selectedEventId && (() => {
                // Find all images for the selected event
                const eventImages = Object.values(groupedByEvent).find(
                    (g) => (selectedImage.eventId || 'unknown') === (g.images[0]?.eventId || 'unknown')
                )?.images || [];
                const currentIndex = eventImages.findIndex((img) => img.id === selectedImage.id);
                const showPrev = currentIndex > 0;
                const showNext = currentIndex < eventImages.length - 1;
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
                                    onClick={() => setSelectedImage(eventImages[currentIndex - 1])}
                                    className="absolute left-2 md:left-4 z-10 rounded-full bg-black/70 text-white px-3 py-2 text-2xl hover:bg-black/90"
                                    aria-label="Previous image"
                                >
                                    &#8592;
                                </button>
                            )}
                            <img
                                src={`${selectedImage.imageUrl}?w=1400&q=90`}
                                alt="Gallery preview"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl mx-auto"
                            />
                            {showNext && (
                                <button
                                    onClick={() => setSelectedImage(eventImages[currentIndex + 1])}
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


export default Gallery;