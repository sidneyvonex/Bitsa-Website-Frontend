import { Globe, Smartphone, Brain, Shield, Database, Cloud } from 'lucide-react';

export const Communities = () => {
    const communities = [
        {
            id: 1,
            name: "Web Development",
            icon: Globe,
            members: 150,
            description: "Frontend, Backend, Full-stack development",
            color: "from-blue-500 to-blue-600",
            iconColor: "text-blue-600"
        },
        {
            id: 2,
            name: "Mobile Development",
            icon: Smartphone,
            members: 95,
            description: "Android, iOS, Flutter, React Native",
            color: "from-green-500 to-green-600",
            iconColor: "text-green-600"
        },
        {
            id: 3,
            name: "AI & Machine Learning",
            icon: Brain,
            members: 120,
            description: "Deep Learning, NLP, Computer Vision",
            color: "from-purple-500 to-purple-600",
            iconColor: "text-purple-600"
        },
        {
            id: 4,
            name: "Cybersecurity",
            icon: Shield,
            members: 80,
            description: "Ethical Hacking, Network Security",
            color: "from-red-500 to-red-600",
            iconColor: "text-red-600"
        },
        {
            id: 5,
            name: "Data Science",
            icon: Database,
            members: 110,
            description: "Analytics, Visualization, Big Data",
            color: "from-yellow-500 to-yellow-600",
            iconColor: "text-yellow-600"
        },
        {
            id: 6,
            name: "Cloud & DevOps",
            icon: Cloud,
            members: 70,
            description: "AWS, Azure, Docker, Kubernetes",
            color: "from-cyan-500 to-cyan-600",
            iconColor: "text-cyan-600"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tech Communities</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join specialized communities aligned with your interests and connect with like-minded tech enthusiasts
                    </p>
                </div>

                {/* Communities Grid - New Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities.map((community) => {
                        const Icon = community.icon;
                        return (
                            <div
                                key={community.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md p-6 group cursor-pointer transition-all duration-300 border border-gray-100 overflow-hidden relative"
                            >
                                {/* Gradient Background Accent */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${community.color}`}></div>

                                {/* Icon Container */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {community.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        <span className="font-semibold">{community.members}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{community.description}</p>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                                    Join Community
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};