import { ExternalLink, CheckCircle, Code2, Users, Github } from 'lucide-react';
import { useGetFeaturedProjectsQuery, useGetAllProjectsQuery, type Project } from '../../features/api/projectsApi';

const FeaturedProjectCard = ({ project }: { project: Project }) => {
    const authorName =
        [project.authorFirstName, project.authorLastName].filter(Boolean).join(' ') || project.authorEmail || 'BITSA Member';

    return (
        <article className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-6 pb-4 flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-900 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        {project.status.replace('-', ' ')}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{project.techStack.split(',')[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{project.description}</p>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between text-sm text-gray-500">
                <div>
                    <p className="font-semibold text-gray-900">{authorName}</p>
                    <p className="text-xs text-gray-400">{project.authorSchoolId}</p>
                </div>
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-900 border border-blue-100 rounded-full hover:bg-blue-50"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                )}
            </div>
        </article>
    );
};

export const Projects = () => {
    const { data: featuredData, isLoading: loadingFeatured } = useGetFeaturedProjectsQuery({ limit: 4 });
    const { data: fallbackData, isLoading: loadingFallback } = useGetAllProjectsQuery({ limit: 4 });

    const projects =
        featuredData?.data?.projects?.slice(0, 4) ||
        fallbackData?.data?.projects?.slice(0, 4) ||
        [];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Content */}
                    <div className="order-2 lg:order-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-900 mb-3">
                            Student innovation
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Discover real-world projects built by{' '}
                            <span className="text-blue-900 italic">BITSA innovators.</span>
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Learn from peer-built solutions across AI, Cyber Security, IoT, Mobile, and Web.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Every showcase includes GitHub source, tech stack, and the student behind the build.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-900 mt-1 shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    Filter hundreds of BITSA projects by status, technology, or author.
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

                    {/* Featured projects list */}
                    <div className="order-1 lg:order-2 relative w-full">
                        <div className="rounded-[2rem] bg-gradient-to-br from-blue-900 to-black text-white p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-sm text-blue-100 uppercase tracking-wide">Featured showcase</p>
                                    <h3 className="text-2xl font-bold">BITSA Projects</h3>
                                </div>
                                <div className="flex gap-4 text-center">
                                    <div>
                                        <span className="text-3xl font-extrabold">50+</span>
                                        <p className="text-xs text-blue-200">Projects</p>
                                    </div>
                                    <div>
                                        <span className="text-3xl font-extrabold">100+</span>
                                        <p className="text-xs text-blue-200">Contributors</p>
                                    </div>
                                </div>
                            </div>

                            {loadingFeatured || (projects.length === 0 && loadingFallback) ? (
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, idx) => (
                                        <div key={idx} className="h-28 rounded-2xl bg-white/10 animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {projects.map((project) => (
                                        <FeaturedProjectCard key={project.id || project._id} project={project} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Decorative accent */}
                        <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                            <Code2 className="w-8 h-8" />
                            <div>
                                <p className="text-xs uppercase tracking-wide">Live demos</p>
                                <p className="text-sm font-semibold">Updated weekly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
