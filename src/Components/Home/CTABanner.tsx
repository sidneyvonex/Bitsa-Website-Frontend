export const CTABanner = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://ueab.ac.ke/wp-content/uploads/2023/06/Events-Diversity-4-800x868.png)'
                }}
            ></div>

            {/* Blue Transparent Overlay */}
            <div className="absolute inset-0 bg-blue-900/80"></div>

            {/* Optional Pattern for extra texture */}
            <div className="absolute inset-0 opacity-10">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                            <path d="M0 70 Q 25 45, 50 70 T 100 70" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
                            <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.1)" />
                            <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.1)" />
                            <circle cx="90" cy="80" r="2" fill="rgba(255,255,255,0.1)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#wave-pattern)" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Join BITSA?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Connect with fellow tech enthusiasts, build amazing projects, and advance your skills in information technology.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mb-10 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#f59e0b] mb-2">500+</div>
                        <div className="text-white/80 text-sm">Active Members</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#f59e0b] mb-2">50+</div>
                        <div className="text-white/80 text-sm">Events Annually</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#f59e0b] mb-2">100+</div>
                        <div className="text-white/80 text-sm">Projects Built</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="/join"
                        className="inline-block bg-white text-blue-900 font-bold px-10 py-4 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg rounded-lg"
                    >
                        Join BITSA Now
                    </a>
                    <a
                        href="/about"
                        className="inline-block bg-transparent border-2 border-white text-white font-bold px-10 py-4 hover:bg-white hover:text-blue-900 transition-all duration-300 text-lg rounded-lg"
                    >
                        Learn More
                    </a>
                </div>

                {/* Additional Info */}
                <p className="text-white/70 text-sm mt-8">
                    No membership fees • All IT students welcome • Year-round activities
                </p>
            </div>
        </section>
    );
};
