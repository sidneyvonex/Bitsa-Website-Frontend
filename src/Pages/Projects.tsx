import { useState, useMemo } from 'react';
import { RefreshCw, Search, Filter, Code2 } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { ProjectCard } from '../Components/projects';
import { useGetAllProjectsQuery, useGetFeaturedProjectsQuery, type Project } from '../features/api/projectsApi';

const skeletonItems = Array.from({ length: 6 });

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
    <div className="h-4 w-full bg-gray-100 rounded mb-2" />
    <div className="h-4 w-5/6 bg-gray-100 rounded mb-4" />
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
      <div className="w-8 h-8 rounded-full bg-gray-200" />
      <div className="flex-1">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
    <Code2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <p className="text-lg font-semibold text-gray-800 mb-2">No projects found</p>
    <p className="text-gray-600">Try adjusting your search or filters.</p>
  </div>
);

export const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allProjectsData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    refetch: refetchAll,
    isFetching: isFetchingAll,
  } = useGetAllProjectsQuery({
    page: currentPage,
    limit: 20,
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const {
    data: featuredData,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
    refetch: refetchFeatured,
    isFetching: isFetchingFeatured,
  } = useGetFeaturedProjectsQuery({ limit: 20 });
  const projects = useMemo(() => {
    if (showFeatured) {
      return featuredData?.data?.projects ?? [];
    }
    return allProjectsData?.data?.projects ?? [];
  }, [showFeatured, allProjectsData, featuredData]);

  const pagination = useMemo(() => {
    if (showFeatured) {
      return null;
    }
    return allProjectsData?.data?.pagination;
  }, [showFeatured, allProjectsData]);

  const isLoading = showFeatured ? isLoadingFeatured : isLoadingAll;
  const isError = showFeatured ? isErrorFeatured : isErrorAll;
  const refetch = showFeatured ? refetchFeatured : refetchAll;
  const isFetching = showFeatured ? isFetchingFeatured : isFetchingAll;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  return (
    <div>
      <Topbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <section className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Resources</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Student Projects</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore innovative projects created by BITSA students. Discover solutions, learn from peers, and get
              inspired.
            </p>
          </section>

          {/* Search and Filters */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects by title, description, or tech stack..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                </div>
                <button
                  onClick={() => {
                    setShowFeatured(!showFeatured);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showFeatured
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Featured Only
                </button>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={showFeatured}
                >
                  <option value="all">All Status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </section>

          {/* Error State */}
          {isError && (
            <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl mb-8">
              <p>We couldn&apos;t load the projects. Please try again.</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                onClick={() => refetch()}
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                Retry
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skeletonItems.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {projects.map((project: Project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;