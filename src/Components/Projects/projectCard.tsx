import { ExternalLink, Github, User, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../features/api/projectsApi';

interface ProjectCardProps {
    project: Project;
}

const getStatusColor = (status: Project['status']) => {
    switch (status) {
        case 'approved':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'pending':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'rejected':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

const getStatusLabel = (status: Project['status']) => {
    switch (status) {
        case 'approved':
            return 'Approved';
        case 'pending':
            return 'Pending Review';
        case 'rejected':
            return 'Not Selected';
        default:
            return status;
    }
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const authorName = `${project.student.firstName} ${project.student.lastName}`;
    const statusColor = getStatusColor(project.status);
    const statusLabel = getStatusLabel(project.status);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
            {/* Header with Status Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <Link to={`/projects/${project._id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                    </Link>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor} whitespace-nowrap ml-2`}>
                    {statusLabel}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {project.description}
            </p>

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Code2 className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">Tech Stack</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{project.technologies.join(', ')}</p>
                </div>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{authorName}</p>
                    <p className="text-xs text-gray-500 truncate">{project.student.schoolId}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                )}
                <Link
                    to={`/projects/${project._id}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium ml-auto"
                >
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};