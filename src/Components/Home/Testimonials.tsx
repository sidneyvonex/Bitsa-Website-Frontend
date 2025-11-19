export const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Alice Wanjiru",
            role: "Software Engineer @ Safaricom",
            year: "Class of 2023",
            quote: "BITSA transformed my university experience. The hackathons and projects gave me real-world skills that landed me my dream job.",
            avatar: "AW"
        },
        {
            id: 2,
            name: "Brian Kipchoge",
            role: "Full-stack Developer @ Andela",
            year: "Class of 2024",
            quote: "The mentorship and community support at BITSA helped me grow from a beginner to a confident developer. Forever grateful!",
            avatar: "BK"
        },
        {
            id: 3,
            name: "Catherine Akinyi",
            role: "Data Scientist @ NCBA",
            year: "Class of 2022",
            quote: "Through BITSA, I discovered my passion for data science. The workshops and networking events opened doors I never imagined.",
            avatar: "CA"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 bg-[#f59e0b]"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Success Stories</h2>
                    </div>
                    <p className="text-gray-600 text-lg ml-4">What our members say about BITSA</p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md p-8 relative group transition-all duration-300 border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <div className="text-[#f59e0b] mb-6">
                                <svg className="w-10 h-10 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed italic">
                                "{testimonial.quote}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="w-12 h-12 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                                    <div className="text-xs text-[#f59e0b] font-medium mt-1">{testimonial.year}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
