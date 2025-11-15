export const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Campus Connect",
            description: "A social platform connecting students across departments",
            tech: ["React", "Node.js", "MongoDB"],
            author: "Team Alpha",
            stars: 45,
            link: "https://github.com"
        },
        {
            id: 2,
            title: "SmartAttendance AI",
            description: "Facial recognition attendance system using machine learning",
            tech: ["Python", "TensorFlow", "OpenCV"],
            author: "Team Beta",
            stars: 62,
            link: "https://github.com"
        },
        {
            id: 3,
            title: "EcoTrack",
            description: "Environmental monitoring and sustainability tracking app",
            tech: ["Flutter", "Firebase", "IoT"],
            author: "Team Gamma",
            stars: 38,
            link: "https://github.com"
        },
        {
            id: 4,
            title: "CodeMentor",
            description: "Peer-to-peer programming learning platform",
            tech: ["Vue.js", "Django", "PostgreSQL"],
            author: "Team Delta",
            stars: 51,
            link: "https://github.com"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 bg-[#f59e0b]"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Student Projects</h2>
                    </div>
                    <p className="text-gray-600 text-lg ml-4">Innovative solutions built by our members</p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md p-6 group transition-all duration-300 border border-gray-100"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#f59e0b] transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm font-semibold">{project.stars}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-4 text-sm">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1 border border-gray-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-sm text-gray-500">{project.author}</span>
                                <a
                                    href={project.link}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1e3a8a] hover:text-[#f59e0b] transition-colors"
                                >
                                    View Project
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[#1e3a8a] font-semibold hover:text-[#f59e0b] transition-colors group"
                    >
                        Explore All Projects
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};
