import { Code2, GraduationCap, Network, Shield, BarChart3, Target } from 'lucide-react';


export const WhoAreWe = () => {

    const programs = [
        {
            name: "Software Engineering",
            icon: Code2,
            description: "Full-stack development, Agile methodologies"
        },
        {
            name: "BBIT",
            icon: GraduationCap,
            description: "Business technology integration, IT management"
        },
        {
            name: "Networking",
            icon: Network,
            description: "Network administration, Infrastructure design"
        },
        {
            name: "Cyber Security",
            icon: Shield,
            description: "Ethical hacking, Security protocols"
        },
        {
            name: "Data Analytics",
            icon: BarChart3,
            description: "Data visualization, Business intelligence"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Side by Side Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Who Are We Text */}
                    <div className="order-1 lg:order-1">
                        <div className="sticky top-24">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                <span className="border-l-4 border-[#f59e0b] pl-4">Who Are We?</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                We are the Bachelor of Information Technology Students Association (BITSA), a vibrant community of passionate tech students dedicated to excellence in technology education and innovation.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Our mission is to empower students through collaborative learning, industry partnerships, and hands-on projects that bridge the gap between academia and real-world tech challenges.
                            </p>
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 text-[#1e3a8a] font-semibold text-lg hover:text-[#f59e0b] transition-colors group"
                            >
                                Learn More
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Tree Structure */}
                    <div className="order-2 lg:order-2">
                        <div className="max-w-2xl mx-auto">
                            {/* Root - BITSA Club */}
                            <div className="flex justify-center mb-12">
                                <div className="relative group">
                                    <div className="bg-white border-2 border-blue-600 px-12 py-8 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-full shadow-md">
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-blue-600 mb-2 mt-2">BITSA CLUB</h3>
                                        <p className="text-sm text-gray-600 font-medium">Bachelor of IT Students Association</p>
                                    </div>
                                    {/* Vertical Line Down */}
                                    <div className="absolute left-1/2 -bottom-12 w-0.5 h-12 bg-gradient-to-b from-blue-600 to-orange-500 transform -translate-x-1/2"></div>
                                </div>
                            </div>

                            {/* Connector Node */}
                            <div className="flex justify-center mb-12">
                                <div className="w-4 h-4 bg-[#f59e0b] rounded-full"></div>
                            </div>

                            {/* Programs/Specializations */}
                            <div className="relative">
                                {/* Horizontal Line */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent"></div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                                    {programs.map((program, index) => {
                                        const Icon = program.icon;
                                        return (
                                            <div key={index} className="relative">
                                                {/* Vertical Line Up */}
                                                <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-[#f59e0b] transform -translate-x-1/2"></div>

                                                {/* Program Card */}
                                                <div className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 p-4 text-center group transition-all duration-300 h-full relative overflow-hidden">
                                                    {/* Accent Line */}
                                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                                                    <div className="relative z-10">
                                                        <div className="bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                                                            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 mb-1 text-xs">
                                                            {program.name}
                                                        </h4>
                                                        <p className="text-[10px] text-gray-600 leading-relaxed">
                                                            {program.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};