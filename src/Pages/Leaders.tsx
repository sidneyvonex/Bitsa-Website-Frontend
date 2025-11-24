import { Footer } from "../Components/Footer";
import Topbar from "../Components/Topbar";
import { LeaderCard } from "../Components/About/OurLeaders";
import type { Leader } from "../features/api/leadersApi";

import { useGetAllLeadersQuery } from "../features/api/leadersApi";
import { PuffLoader } from "react-spinners";


export const Leaders = () => {
  const { data, isLoading, error } = useGetAllLeadersQuery();
  const leaders = data?.data?.leaders || [];

  // Group leaders by academic year
  const groupedLeaders: Record<string, Leader[]> = {};
  leaders.forEach((leader: Leader) => {
    const year = leader.academicYear ? leader.academicYear : "Unknown";
    if (!groupedLeaders[year]) groupedLeaders[year] = [];
    groupedLeaders[year].push(leader);
  });

  // Find the latest academic year (current leaders)
  const allYears = Object.keys(groupedLeaders).filter(y => y !== "Unknown");
  const latestYear = allYears.sort((a, b) => b.localeCompare(a))[0];
  const currentLeaders = latestYear ? groupedLeaders[latestYear] : [];
  const pastLeadersByYear = Object.entries(groupedLeaders)
    .filter(([year]) => year !== latestYear)
    .sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Full-page SVG background */}
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
      <main className="flex-1 py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with SVG Pattern Background */}
          <section className="relative text-center mb-12 pt-4 overflow-hidden">
            {/* SVG Pattern Background */}
            <svg className="absolute top-0 left-0 w-full h-64 z-0" viewBox="0 0 1440 256" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.13 }}>
              <path d="M0 80 Q 360 160 720 80 T 1440 80" stroke="#60a5fa" strokeWidth="2" fill="none" />
              <path d="M0 120 Q 360 200 720 120 T 1440 120" stroke="#818cf8" strokeWidth="2" fill="none" />
              <circle cx="200" cy="60" r="32" fill="#f59e0b" opacity="0.12" />
              <circle cx="1240" cy="180" r="24" fill="#f59e0b" opacity="0.12" />
            </svg>
            <div className="relative flex flex-col items-center gap-4 z-10">
              <span className="inline-block px-6 py-2 rounded-full font-semibold text-white text-sm tracking-wide bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 shadow-md mb-2">SPEAKERS & LEADERS</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">Our Leadership Team</h1>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Meet the faces behind BITSA's vision. Hover over each leader to discover their role and contributions to our community.
              </p>
            </div>
          </section>
          {/* Current Leaders Section */}
          {isLoading ? null : error ? null : currentLeaders.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-bold text-xl text-blue-700">Current Leaders ({latestYear})</div>
                  <div className="text-gray-600 text-sm">Leading BITSA in the current academic year</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {currentLeaders.map((leader: Leader) => (
                  <LeaderCard key={leader._id || leader.id} leader={leader} />
                ))}
              </div>
            </section>
          )}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <PuffLoader color="#2563eb" size={64} />
              <span className="mt-4 text-blue-600 font-semibold">Loading leaders...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 font-semibold">Failed to load leaders.</div>
          ) : (
            <div className="space-y-8">
              {pastLeadersByYear.length > 0 && (
                <div className="mb-6">
                  <div className="font-bold text-xl text-gray-900 mb-2">Past Leaders</div>
                  <div className="text-gray-600 text-sm mb-4">Explore previous leadership teams by academic year</div>
                </div>
              )}
              {pastLeadersByYear.map(([year, leaders], idx) => (
                <div key={year} className="collapse collapse-plus bg-white border border-blue-100 rounded-xl shadow-sm">
                  <input type="radio" name="leaders-accordion" defaultChecked={idx === 0} />
                  <div className="collapse-title font-semibold text-lg text-blue-700 bg-white rounded-t-xl px-4 py-3 border-b border-blue-100">{year}</div>
                  <div className="collapse-content bg-white rounded-b-xl px-2 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {leaders.map((leader: Leader) => (
                        <LeaderCard key={leader._id || leader.id} leader={leader} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
