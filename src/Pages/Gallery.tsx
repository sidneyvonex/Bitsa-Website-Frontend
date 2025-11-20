import { Image, Camera } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const Gallery = () => {
    // Placeholder gallery items - replace with actual API data when available
    const galleryItems = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Event ${i + 1}`,
        image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&q=80`,
    }));

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

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=800&q=80';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <p className="font-semibold">{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State (if no items) */}
                    {galleryItems.length === 0 && (
                        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-800 mb-2">No gallery items yet</p>
                            <p className="text-gray-600">Check back soon for photos from our events and activities.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Gallery;