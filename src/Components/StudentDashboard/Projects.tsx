import { useState, useMemo } from 'react';
import { Folder, Search, Code, Loader2 } from 'lucide-react';
import { useGetAllProjectsQuery } from '../../features/api';
import { Link } from 'react-router-dom';

export const StudentProjects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: projectsData, isLoading } = useGetAllProjectsQuery({ page: 1, limit: 50 });

    const filteredProjects = useMemo(() => {
        // Handle multiple possible API response structures
        let allProjects: any[] = [];
        if (!projectsData) {
            allProjects = [];
        } else if (Array.isArray(projectsData)) {
            allProjects = projectsData;
        } else if (Array.isArray(projectsData.data?.projects)) {
            allProjects = projectsData.data.projects;
        } else if (Array.isArray(projectsData.data)) {
            allProjects = projectsData.data;
        }
        
        return allProjects.filter((project: any) =>
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [projectsData, searchQuery]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
                <p className="text-gray-600">Explore student projects and collaborate</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project: any) => (
                        <Link
                            key={project.id}
                            to={`/dashboard/projects/${project.id}`}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden group"
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#5773da]">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Code className="w-4 h-4" />
                                    <span className="truncate">{project.technologies?.join(', ') || 'Various'}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No projects found</p>
                </div>
            )}
        </div>
    );
};
