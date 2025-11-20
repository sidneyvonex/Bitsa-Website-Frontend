import { Mail } from 'lucide-react';
import type { Leader } from '../../features/api/leadersApi';

interface LeaderCardProps {
    leader: Leader;
}

export const LeaderCard = ({ leader }: LeaderCardProps) => {
    const initials = leader.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-300">
            {/* Speaker photo */}
            <div className="aspect-[4/5] w-full bg-gray-100">
                {leader.profilePicture ? (
                    <img
                        src={leader.profilePicture}
                        alt={leader.fullName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-red-500">
                        <span className="text-white text-4xl font-bold">{initials}</span>
                    </div>
                )}
            </div>

            {/* Dark overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Info card that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="pointer-events-none translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full max-w-xs mx-auto">
                    <div className="rounded-2xl bg-gradient-to-b from-amber-400 to-red-600 text-white px-6 py-4 text-center shadow-xl">
                        <p className="text-sm font-semibold tracking-wide uppercase mb-1">
                            {leader.position}
                        </p>
                        <h3 className="text-lg md:text-xl font-extrabold leading-snug mb-1">
                            {leader.fullName}
                        </h3>
                        {leader.academicYear && (
                            <p className="text-xs text-white/90 mb-2">
                                {leader.academicYear}
                            </p>
                        )}
                        {leader.email && (
                            <p className="text-[11px] text-white/90 mb-2">
                                {leader.email}
                            </p>
                        )}
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/95">
                            Hover to view bio
                        </p>
                    </div>
                </div>
            </div>

            {/* Small contact CTA below card on non-hover */}
            {leader.email && (
                <div className="absolute bottom-3 right-3">
                    <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-gray-700 shadow-sm hover:bg-white"
                    >
                        <Mail className="w-3 h-3" />
                        Contact
                    </a>
                </div>
            )}
        </div>
    );
};
