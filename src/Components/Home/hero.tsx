import { useState, useEffect } from 'react';

// Slide data - you can customize these
const slides = [
    {
        id: 1,
        badge: "Hackathons",
        title: "Join BITSA Hackathons & Coding Competitions",
        description: "Participate in exciting hackathons and coding competitions hosted by BITSA throughout the year. Collaborate with fellow developers, solve real-world problems, and win amazing prizes while building your portfolio.",
        image: "https://ueab.ac.ke/wp-content/uploads/2018/08/academic.jpg",
        buttonText: "Explore Events",
        buttonLink: "/events"
    },
    {
        id: 2,
        badge: "Marketplace",
        title: "BITSA Tech Marketplace",
        description: "Shop exclusive BITSA merchandise, tech gadgets, and club essentials. Support your tech community while grabbing awesome gear. From hoodies to hardware - we've got you covered!",
        image: "https://ueab.ac.ke/wp-content/uploads/2023/05/slide3.jpg",
        buttonText: "Shop Now",
        buttonLink: "/marketplace"
    },
    {
        id: 3,
        badge: "Leadership",
        title: "Meet BITSA Leadership & Alumni",
        description: "Discover the inspiring leaders who have shaped BITSA over the years. Explore our leadership timeline, connect with alumni, and learn about the visionaries driving our tech community forward.",
        image: "https://ueab.ac.ke/wp-content/uploads/2018/08/IMG_7343-scaled.jpg",
        buttonText: "View Timeline",
        buttonLink: "/leadership"
    },
    {
        id: 4,
        badge: "Gallery",
        title: "Explore BITSA Moments",
        description: "Relive our most memorable tech events, hackathons, workshops, and community gatherings. Browse through photos and videos capturing the spirit of innovation and collaboration at BITSA.",
        image: "https://ielearning.ueab.ac.ke/pluginfile.php/1/theme_remui/slideimage3/1750924792/admin1.jpg",
        buttonText: "View Gallery",
        buttonLink: "/gallery"
    }
];

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative w-full h-[600px] overflow-hidden">
            {/* Slides Container */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                            <div className="max-w-3xl text-white space-y-6">
                                {/* Badge */}
                                <div className="inline-block">
                                    <span className="bg-[#f59e0b] text-white px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
                                        {slide.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    {slide.title}
                                </h1>

                                {/* Description */}
                                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                                    {slide.description}
                                </p>

                                {/* CTA Button */}
                                <div className="pt-4">
                                    <a
                                        href={slide.buttonLink}
                                        className="inline-block bg-white text-[#1e3a8a] px-8 py-3 rounded font-semibold text-lg hover:bg-gray-100 transition-colors"
                                    >
                                        {slide.buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                aria-label="Previous slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                aria-label="Next slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Bottom Wave Design */}
            <div className="absolute bottom-0 left-0 right-0 z-20 -mb-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full block">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};
