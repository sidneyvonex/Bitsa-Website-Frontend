import { ExternalLink, CheckCircle, Code2, Users } from 'lucide-react';

export const Projects = () => {
    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 italic leading-tight">
                            Discover more than a classroom — join a{' '}
                            <span className="text-blue-900">tech community.</span>
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Access world-class student projects from{' '}
                                    <a href="/departments/software-engineering" className="text-blue-600 hover:underline font-medium">Software Engineering</a>,{' '}
                                    <a href="/departments/bbit" className="text-blue-600 hover:underline font-medium">BBIT</a>, and{' '}
                                    <a href="/departments/data-analytics" className="text-blue-600 hover:underline font-medium">Data Analytics</a> departments.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Learn from innovative BITSA student solutions in Web Development, Mobile Apps, AI, IoT, and Cyber Security.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Connect with BITSA's network of ambitious student developers and tech innovators.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Find a range of student projects covering diverse topics and technologies for all skill levels.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Engage with student projects via searchable filters, detailed showcases, and GitHub repositories.
                                </p>
                            </div>
                        </div>

                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                            Explore All Projects
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Right Side - Image with Diagonal Crop */}
                    <div className="order-1 lg:order-2 relative">
                        {/* Diagonal cropped image container */}
                        <div className="relative" style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}>
                            <div className="relative overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                                    alt="BITSA students collaborating on projects"
                                    className="w-full h-[500px] object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-transparent to-transparent"></div>

                                {/* Stats Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="flex items-center justify-between text-white">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">Student Projects</h3>
                                            <p className="text-blue-200 text-sm">Built by BITSA members</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="text-center">
                                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-2">
                                                    <Code2 className="w-5 h-5 text-orange-400" />
                                                    <span className="text-2xl font-bold">50+</span>
                                                </div>
                                                <p className="text-xs text-blue-200">Projects</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-2">
                                                    <Users className="w-5 h-5 text-orange-400" />
                                                    <span className="text-2xl font-bold">100+</span>
                                                </div>
                                                <p className="text-xs text-blue-200">Students</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Projects Badge */}
                        <div className="absolute -top-6 -right-6 bg-orange-500 text-white rounded-lg p-5 shadow-xl z-10">
                            <div className="text-center">
                                <Code2 className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-xs font-semibold">Featured</p>
                                <p className="text-xs">Showcase</p>
                            </div>
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-blue-900 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
