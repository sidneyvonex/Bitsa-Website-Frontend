import { Image, Camera, Calendar, Users } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllGalleryImagesQuery, type GalleryImage } from '../features/api/EventApi';
import { useMemo, useState } from 'react';

export const Gallery = () => {
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
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
        <div>
            <Topbar />
            <main className="min-h-screen bg-gray-50 py-16">
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
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedImage(img)}
                                                    className="absolute inset-0"
                                                >
                                                    <span className="sr-only">
                                                        Open {img.title || group.eventTitle} photo
                                                    </span>
                                                </button>
                                                <img
                                                    src={`${img.imageUrl}?w=800&q=80`}
                                                    alt={img.title || group.eventTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                                                    <p className="font-semibold line-clamp-1">
                                                        {img.title || group.eventTitle}
                                                    </p>
                                                    {(img.uploaderFirstName || img.uploaderLastName) && (
                                                        <p className="text-xs text-white/80">
                                                            By{' '}
                                                            {[img.uploaderFirstName, img.uploaderLastName]
                                                                .filter(Boolean)
                                                                .join(' ')}
                                                        </p>
                                                    )}
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

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
                    <div className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-3 right-3 z-10 rounded-full bg-black/60 text-white px-3 py-1 text-sm hover:bg-black/80"
                        >
                            Close
                        </button>
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="bg-gray-900">
                                <img
                                    src={`${selectedImage.imageUrl}?w=1400&q=90`}
                                    alt={selectedImage.title || selectedImage.eventTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 md:p-8 space-y-4">
                                <div className="text-xs font-semibold uppercase text-blue-600">
                                    {selectedImage.eventTitle || 'BITSA Event'}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {selectedImage.title || selectedImage.eventTitle}
                                </h3>
                                {selectedImage.eventDate && (
                                    <p className="text-sm text-gray-500">
                                        {new Date(selectedImage.eventDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                )}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Captured by{' '}
                                    {[selectedImage.uploaderFirstName, selectedImage.uploaderLastName]
                                        .filter(Boolean)
                                        .join(' ') || 'BITSA Media Team'}
                                    {selectedImage.uploaderSchoolId ? ` (${selectedImage.uploaderSchoolId})` : ''}
                                </p>
                                {selectedImage.uploadedAt && (
                                    <p className="text-xs text-gray-400">
                                        Uploaded {new Date(selectedImage.uploadedAt).toLocaleDateString()}
                                    </p>
                                )}
                                <div className="pt-4">
                                    <a
                                        href={`/events/${selectedImage.eventId}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                        onClick={() => setSelectedImage(null)}
                                    >
                                        View event highlights →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Gallery;