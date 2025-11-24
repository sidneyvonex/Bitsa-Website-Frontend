import { useParams, Link } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../../features/api';
import { ArrowLeft, Loader2, Code, Users, ExternalLink } from 'lucide-react';

export const StudentProjectDetail = () => {
    const { projectId } = useParams();
    const { data: projectData, isLoading, error } = useGetProjectByIdQuery(projectId || '');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#5773da]" />
            </div>
        );
    }

    if (error || !projectData) {
        return (
            <div className="space-y-6">
                <Link to="/dashboard/projects" className="inline-flex items-center gap-2 text-[#5773da] hover:text-[#4861c9]">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-600">Project not found</p>
                </div>
            </div>
        );
    }

    const project = projectData.data || projectData;

    return (
        <div className="space-y-6">
            <Link to="/dashboard/projects" className="inline-flex items-center gap-2 text-[#5773da] hover:text-[#4861c9] font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </Link>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {(project.images?.[0] || (project as any).image) && (
                    <img
                        src={project.images?.[0] || (project as any).image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                    />
                )}
                
                <div className="p-6 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {project.technologies?.map((tech: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">About this project</h2>
                        <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                    </div>

                    {(project as any).teamMembers && (project as any).teamMembers.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Team Members
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {(project as any).teamMembers.map((member: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                        {member}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {(project.githubUrl || project.liveUrl) && (
                        <div className="pt-6 border-t flex flex-wrap gap-4">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    <Code className="w-4 h-4" />
                                    View Code
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] transition-colors font-medium"
                                >
                                    View Live Demo
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
