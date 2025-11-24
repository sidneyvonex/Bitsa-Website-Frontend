import { ShoppingBag, Search, Shirt, HeadphonesIcon as Cap, Shirt as HoodieIcon } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const Marketplace = () => {
    // BITSA branded merchandise - replace with actual API data when available
    const marketplaceItems = [
        {
            id: 1,
            title: 'BITSA Official T-Shirt',
            description: 'Premium quality cotton t-shirt with official BITSA logo. Available in multiple sizes and colors.',
            price: 'KSh 1,500',
            category: 'T-Shirts',
            image: 'https://res.cloudinary.com/di2rxdqgr/image/upload/v1763841125/bitsa-shirt_blzukm.png',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Blue', 'White', 'Black'],
            icon: Shirt,
        },
        {
            id: 2,
            title: 'BITSA Branded Hoodie',
            description: 'Comfortable and warm hoodie perfect for campus life. Features embroidered BITSA logo.',
            price: 'KSh 3,500',
            category: 'Hoodies',
            image: 'https://res.cloudinary.com/di2rxdqgr/image/upload/v1763841133/bitsa-hoddie_zvq7zu.png',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Navy Blue', 'Gray', 'Black'],
            icon: HoodieIcon,
        },
        {
            id: 3,
            title: 'BITSA Cap',
            description: 'Stylish cap with embroidered BITSA logo. Perfect for outdoor events and daily wear.',
            price: 'KSh 1,200',
            category: 'Caps',
            image: 'https://res.cloudinary.com/di2rxdqgr/image/upload/v1763841138/bitsa-cap_ms9fkn.png',
            sizes: ['One Size'],
            colors: ['Navy Blue', 'Black', 'White'],
            icon: Cap,
        },
        {
            id: 4,
            title: 'BITSA Polo Shirt',
            description: 'Classic polo shirt with BITSA branding. Ideal for formal events and presentations.',
            price: 'KSh 2,000',
            category: 'T-Shirts',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Navy Blue', 'White'],
            icon: Shirt,
        },
        {
            id: 5,
            title: 'BITSA Zip-Up Hoodie',
            description: 'Premium zip-up hoodie with full-zip closure and side pockets. Great for layering.',
            price: 'KSh 3,800',
            category: 'Hoodies',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a4?w=800&q=80',
            sizes: ['M', 'L', 'XL', 'XXL'],
            colors: ['Navy Blue', 'Black'],
            icon: HoodieIcon,
        },
        {
            id: 6,
            title: 'BITSA Snapback Cap',
            description: 'Adjustable snapback cap with embroidered BITSA logo. Modern and trendy design.',
            price: 'KSh 1,300',
            category: 'Caps',
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
            sizes: ['One Size'],
            colors: ['Navy Blue', 'Black', 'Gray'],
            icon: Cap,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
            {/* Full-page SVG background (from Leaders page) */}
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
            <main className="flex-1 py-10 relative z-10">
                {/* Hero Section */}
                <section className="relative text-center mb-16 pt-4 overflow-hidden">
                    {/* SVG Pattern Background */}
                    <svg className="absolute top-0 left-0 w-full h-64 z-0" viewBox="0 0 1440 256" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.13 }}>
                        <path d="M0 80 Q 360 160 720 80 T 1440 80" stroke="#60a5fa" strokeWidth="2" fill="none" />
                        <path d="M0 120 Q 360 200 720 120 T 1440 120" stroke="#818cf8" strokeWidth="2" fill="none" />
                        <circle cx="200" cy="60" r="32" fill="#f59e0b" opacity="0.12" />
                        <circle cx="1240" cy="180" r="24" fill="#f59e0b" opacity="0.12" />
                    </svg>
                    <div className="relative flex flex-col items-center gap-4 z-10">
                        <span className="inline-block px-6 py-2 rounded-full font-semibold text-white text-sm tracking-wide bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 shadow-md mb-2">BITSA MARKETPLACE</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Shop BITSA Merchandise & Swag
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                            Discover official BITSA gear, apparel, and accessories. Show your pride, support the community, and look great doing it!
                        </p>
                        <a href="#marketplace-items" className="inline-block px-8 py-3 rounded-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold text-lg shadow-lg transition">Shop Now</a>
                    </div>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="marketplace-items">
     

                    {/* Search Bar */}
                    <section className="mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for products or services..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Categories */}
                    <section className="mb-8">
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                                All Items
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                                <Shirt className="w-4 h-4" />
                                T-Shirts
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                                <HoodieIcon className="w-4 h-4" />
                                Hoodies
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                                <Cap className="w-4 h-4" />
                                Caps
                            </button>
                        </div>
                    </section>

                    {/* Marketplace Items Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {marketplaceItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
                                            }}
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                        {/* Sizes and Colors */}
                                        <div className="mb-4 space-y-2">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 mb-1">Sizes:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.sizes.map((size) => (
                                                        <span
                                                            key={size}
                                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                                                        >
                                                            {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 mb-1">Colors:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.colors.map((color) => (
                                                        <span
                                                            key={color}
                                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                                                        >
                                                            {color}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price and Action */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                                                <span>{item.price}</span>
                                            </div>
                                            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {marketplaceItems.length === 0 && (
                        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-800 mb-2">No merchandise available</p>
                            <p className="text-gray-600">Check back soon for new BITSA branded items!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Marketplace;