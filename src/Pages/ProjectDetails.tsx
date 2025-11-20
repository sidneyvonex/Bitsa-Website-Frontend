import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, User, Calendar, ExternalLink, RefreshCw } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useGetProjectByIdQuery } from '../features/api/projectsApi';

export const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, refetch, isFetching } = useGetProjectByIdQuery(id || '');

    const project = data?.data;
    const authorName = project ? `${project.student.firstName} ${project.student.lastName}` : '';

    if (isLoading) {
        return (
            <div>
                <Topbar />
                <main className="min-h-screen bg-gray-50 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-pulse">
                            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
                            <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                            <div className="h-4 w-5/6 bg-gray-100 rounded" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isError || !project) {
        return (
            <div>
                <Topbar />
                <main className="min-h-screen bg-gray-50 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <p>We couldn&apos;t load the project. Please try again.</p>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                    onClick={() => refetch()}
                                >
                                    <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Topbar />
            <main className="min-h-screen bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    {/* Project Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium">
                                    {project.status === 'approved'
                                        ? 'Approved'
                                        : project.status === 'pending'
                                            ? 'Pending Review'
                                            : 'Not Selected'}
                                </span>
                            </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{authorName}</p>
                                <p className="text-sm text-gray-600">{project.student.schoolId}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>

                        {/* Problem Statement */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Category</h2>
                            <p className="text-gray-700 leading-relaxed">{project.category}</p>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Technologies</h2>
                            <p className="text-gray-700 leading-relaxed">{project.technologies.join(', ')}</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    View on GitHub
                                </a>
                            )}
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5" />
                                View All Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectDetails;