export const Partners = () => {
    const partners = [
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" },
        { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png" },
        { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/512px-Cisco_logo_blue_2016.svg.png" },
        { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png" },
        { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png" },
        { name: "Intel", logo: "https://www.intel.com/content/dam/logos/intel-header-logo.svg" },
        { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png" },
        { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png" },
        { name: "Huawei", logo: "https://www.huawei.com/-/media/hcomponent-header/1.0.1.20251023120200/component/img/huawei_logo.png" },
        { name: "Safaricom", logo: "https://www.safaricom.co.ke/images/main.png" },
        { name: "Google Developer Groups", logo: "https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-goog/contentbuilder/GDG-Lockup-1Line-Black_vMWBFT9.svg" }
    ];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Trusted Global Partners & Clients</h2>
                    <p className="text-gray-600 text-lg">Collaborating with leading tech companies and organizations worldwide</p>
                </div>

                {/* Infinite Scrolling Partners */}
                <div className="relative partner-carousel">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                    {/* Scrolling Container */}
                    <div className="flex overflow-hidden py-8">
                        {/* First Set */}
                        <div className="flex animate-scroll gap-16 items-center">
                            {partners.map((partner, index) => (
                                <div
                                    key={`first-${index}`}
                                    className="flex-shrink-0 transition-transform duration-300 partner-logo"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-12 w-auto object-contain px-8 min-w-[120px] max-w-[160px]"
                                        title={partner.name}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Duplicate Set for Seamless Loop */}
                        <div className="flex animate-scroll gap-16 items-center" aria-hidden="true">
                            {partners.map((partner, index) => (
                                <div
                                    key={`second-${index}`}
                                    className="flex-shrink-0 transition-transform duration-300 partner-logo"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-12 w-auto object-contain px-8 min-w-[120px] max-w-[160px]"
                                        title={partner.name}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Partnership Info */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Interested in partnering with BITSA?</p>
                    <a
                        href="/partnership"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-orange-500 transition-colors group"
                    >
                        Become a Partner
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .partner-carousel:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};
