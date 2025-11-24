import { useState, useMemo } from 'react';
import { Search, Loader2, Code, Github } from 'lucide-react';
import Topbar from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetAllProjectsQuery } from '../features/api';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const { data, isLoading } = useGetAllProjectsQuery({ page: 1, limit: 50 });

    const filteredProjects = useMemo(() => {
        const allProjects = data?.data?.projects || [];
        return (allProjects as any[]).filter((project: any) => {
            const matchesSearch = !searchQuery ||
                project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [data, searchQuery, statusFilter]);

    const statuses = ['all', 'completed', 'in-progress', 'submitted'];

    return (
        <div className="min-h-screen bg-[#f5f6f7] relative overflow-hidden">
            {/* SVG Background */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1440 1200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="bg1" cx="50%" cy="30%" r="60%" fx="50%" fy="30%" gradientTransform="rotate(30)">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="1440" height="1200" fill="url(#bg1)" />
                <ellipse cx="200" cy="200" rx="180" ry="80" fill="#60a5fa" opacity="0.08" />
                <ellipse cx="1240" cy="1000" rx="140" ry="60" fill="#818cf8" opacity="0.09" />
                <path d="M0 900 Q 360 1100 720 900 T 1440 900" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.13" />
                <circle cx="900" cy="300" r="90" fill="#f59e0b" opacity="0.07" />
                <circle cx="400" cy="1000" r="60" fill="#60a5fa" opacity="0.07" />
            </svg>

            <Topbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center space-y-3 mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        Student Projects
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore innovative projects created by BITSA students. Discover solutions, learn from peers, and get inspired.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4 mb-8">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-700 self-center">Filter by status:</span>
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                    statusFilter === status
                                        ? 'bg-[#5773da] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-[#5773da]" />
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project: any) => (
                            <div
                                key={project.id || project._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden hover:border-[#5773da]"
                            >
                                <div className="p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#5773da] to-[#4861c9] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Code className="w-6 h-6 text-white" />
                                        </div>
                                        {project.status && (
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Author Info */}
                                    <div className="pt-2 border-t border-gray-100">
                                        <p className="text-sm text-gray-600">
                                            By <span className="font-semibold text-gray-900">
                                                {project.authorFirstName} {project.authorLastName}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Links */}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mt-2 px-4 py-2.5 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            View on GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg text-gray-600">No projects found matching your search</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Projects;
