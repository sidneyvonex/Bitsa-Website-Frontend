
import { Mail } from 'lucide-react';


export interface Leader {
  _id: string;
  fullName: string;
  position: string;
  email?: string;
  academicYear?: string;
  profilePicture?: string;
}

interface LeaderCardProps {
  leader: Leader;
}

export const LeaderCard = ({ leader }: LeaderCardProps) => {
  if (!leader) {
    return (
      <div className="rounded-3xl bg-gray-100 p-6 text-center text-gray-500">
        <p>No leader data available.</p>
      </div>
    );
  }

  const initials = leader.fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Leader photo */}
      <div className="aspect-[4/5] w-full bg-gray-100 relative overflow-hidden">
        {leader.profilePicture ? (
          <img
            src={leader.profilePicture}
            alt={leader.fullName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]"></div>
            <span className="text-white text-5xl font-bold drop-shadow-2xl relative z-10">{initials}</span>
          </div>
        )}
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>

      {/* Animated gradient overlay on hover */}
         <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 opacity-0 group-hover:opacity-35 transition-all duration-300 z-10" />

      {/* Info that slides up on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            <p className="text-xs font-bold tracking-widest uppercase text-white">
              {leader.position}
            </p>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
            {leader.fullName}
          </h3>
          
          {leader.academicYear && (
            <p className="text-sm text-white/90 font-medium">
              Academic Year: {leader.academicYear}
            </p>
          )}

          {leader.email && (
            <div className="pt-2 pointer-events-auto">
              <a
                href={`mailto:${leader.email}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 rounded-full font-semibold text-sm hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom label visible when not hovering */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-linear-to-t from-black/80 via-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-500">
        <h3 className="text-white font-bold text-lg mb-0.5 drop-shadow-lg">
          {leader.fullName}
        </h3>
        <p className="text-white/90 text-sm font-medium">
          {leader.position}
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-white/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
    </div>
  );
};

