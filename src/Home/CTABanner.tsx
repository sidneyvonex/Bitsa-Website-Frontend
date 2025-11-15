export const CTABanner = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute transform rotate-45 -right-20 -top-20 w-80 h-80 border-2 border-white"></div>
                <div className="absolute transform rotate-45 -left-20 -bottom-20 w-80 h-80 border-2 border-white"></div>
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
                        className="inline-block bg-[#f59e0b] text-white font-bold px-10 py-4 hover:bg-white hover:text-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                    >
                        Join BITSA Now
                    </a>
                    <a
                        href="/about"
                        className="inline-block bg-transparent border-2 border-white text-white font-bold px-10 py-4 hover:bg-white hover:text-[#1e3a8a] transition-all duration-300 text-lg"
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
