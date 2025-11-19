import { useMemo } from 'react';
import { RefreshCw, Users, Award, Calendar } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { LeaderCard } from '../Components/About/LeaderCard';
import { useGetCurrentLeadersQuery, useGetPastLeadersQuery } from '../features/api/leadersApi';

const skeletonItems = Array.from({ length: 4 });

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
      <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-24 bg-gray-100 rounded mb-1" />
      <div className="h-3 w-20 bg-gray-100 rounded mb-4" />
      <div className="w-full pt-4 border-t border-gray-100">
        <div className="h-4 w-40 bg-gray-100 rounded mx-auto mb-2" />
        <div className="h-4 w-32 bg-gray-100 rounded mx-auto" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <p className="text-lg font-semibold text-gray-800 mb-2">No leaders found</p>
    <p className="text-gray-600">{message}</p>
  </div>
);

export const OurLeaders = () => {
  const {
    data: currentData,
    isLoading: isLoadingCurrent,
    isError: isErrorCurrent,
    refetch: refetchCurrent,
    isFetching: isFetchingCurrent,
  } = useGetCurrentLeadersQuery();

  const {
    data: pastData,
    isLoading: isLoadingPast,
    isError: isErrorPast,
    refetch: refetchPast,
    isFetching: isFetchingPast,
  } = useGetPastLeadersQuery();

  const currentLeaders = useMemo(() => currentData?.data.leaders ?? [], [currentData]);
  const pastLeaders = useMemo(() => pastData?.data.leaders ?? [], [pastData]);

  // Group past leaders by academic year
  const pastLeadersByYear = useMemo(() => {
    const grouped: Record<string, typeof pastLeaders> = {};
    pastLeaders.forEach((leader) => {
      if (!grouped[leader.academicYear]) {
        grouped[leader.academicYear] = [];
      }
      grouped[leader.academicYear].push(leader);
    });
    // Sort years in descending order
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .reduce((acc, year) => {
        acc[year] = grouped[year];
        return acc;
      }, {} as Record<string, typeof pastLeaders>);
  }, [pastLeaders]);

  return (
    <div>
      <Topbar />
      <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Leadership</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership Team</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Meet the dedicated individuals leading BITSA forward. Our leadership team is committed to fostering
            innovation, collaboration, and excellence in technology.
          </p>
        </section>

        {/* Current Leaders Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Current Leadership</h2>
              <p className="text-gray-600 text-sm">Leading BITSA in the current academic year</p>
            </div>
          </div>

          {isErrorCurrent && (
            <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl mb-8">
              <p>We couldn&apos;t load the current leaders. Please try again.</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                onClick={() => refetchCurrent()}
              >
                <RefreshCw className={`w-4 h-4 ${isFetchingCurrent ? 'animate-spin' : ''}`} />
                Retry
              </button>
            </div>
          )}

          {isLoadingCurrent ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {skeletonItems.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : currentLeaders.length === 0 ? (
            <EmptyState message="No current leaders available at this time." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentLeaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
          )}
        </section>

        {/* Past Leaders Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Past Leadership</h2>
              <p className="text-gray-600 text-sm">Previous leaders who have served BITSA</p>
            </div>
          </div>

          {isErrorPast && (
            <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl mb-8">
              <p>We couldn&apos;t load the past leaders. Please try again.</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                onClick={() => refetchPast()}
              >
                <RefreshCw className={`w-4 h-4 ${isFetchingPast ? 'animate-spin' : ''}`} />
                Retry
              </button>
            </div>
          )}

          {isLoadingPast ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {skeletonItems.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : Object.keys(pastLeadersByYear).length === 0 ? (
            <EmptyState message="No past leaders available at this time." />
          ) : (
            <div className="space-y-12">
              {Object.entries(pastLeadersByYear).map(([year, leaders]) => (
                <div key={year}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <h3 className="text-xl font-semibold text-gray-700 px-4">{year}</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {leaders.map((leader) => (
                      <LeaderCard key={leader.id} leader={leader} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default OurLeaders;

