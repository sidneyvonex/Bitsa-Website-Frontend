export const UpcomingEvents = () => {
    const events = [
        {
            id: 1,
            title: "BITSA CodeSprint Hackathon",
            date: "March 15-17, 2025",
            time: "9:00 AM - 6:00 PM",
            location: "UEAB Tech Hub",
            description: "48-hour coding marathon focused on AI for Social Good. Teams of 1-4 students compete for amazing prizes!",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
            category: "Hackathon",
            registrationOpen: true
        },
        {
            id: 2,
            title: "Web Development Workshop",
            date: "February 20, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Computer Lab A",
            description: "Learn modern web development with React, TypeScript, and Tailwind CSS. Hands-on session for beginners and intermediate developers.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
            category: "Workshop",
            registrationOpen: true
        },
        {
            id: 3,
            title: "Tech Talk: AI & Machine Learning",
            date: "February 28, 2025",
            time: "4:00 PM - 6:00 PM",
            location: "Main Auditorium",
            description: "Industry experts discuss the latest trends in AI/ML, career opportunities, and real-world applications.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            category: "Tech Talk",
            registrationOpen: true
        },
        {
            id: 4,
            title: "BITSA Networking Night",
            date: "March 5, 2025",
            time: "6:00 PM - 9:00 PM",
            location: "Student Center",
            description: "Connect with fellow tech enthusiasts, alumni, and industry professionals. Refreshments provided!",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop",
            category: "Networking",
            registrationOpen: true
        }
    ];

    return (
        <section className="pt-8 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Upcoming Events
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join us for exciting tech events, workshops, and networking opportunities. Stay connected with the BITSA community!
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100"
                        >
                            {/* Event Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-[#f59e0b] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                        {event.category}
                                    </span>
                                </div>
                            </div>

                            {/* Event Content */}
                            <div className="p-5">
                                {/* Date & Time */}
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                        />
                                    </svg>
                                    <span>{event.date}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                    {event.title}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                        />
                                    </svg>
                                    <span>{event.location}</span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {event.description}
                                </p>

                                {/* Register Button */}
                                <button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-2 px-4 rounded font-semibold text-sm transition-colors">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Events Button */}
                <div className="text-center">
                    <a
                        href="/events"
                        className="inline-flex items-center bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
                    >
                        View All Events
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 ml-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};
