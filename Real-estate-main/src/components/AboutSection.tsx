import React, { useState } from 'react';
import { islamabadVillaImg } from '../data/mockData';
import { ShieldCheck, Users, Building2, Award } from 'lucide-react';
import { DroneAerialPlayer } from './DroneAerialPlayer';
import { DroneTourItem } from './DroneCinemaModal';

interface AboutSectionProps {
  onLaunchDroneTour?: (item: DroneTourItem) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLaunchDroneTour }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenDrone = () => {
    if (onLaunchDroneTour) {
      onLaunchDroneTour({
        title: 'Bhatti Real Estate Flagship Mansion',
        subtitle: 'Margalla Hills Foothills, Sector E-7 Islamabad',
        price: 'PKR 24.0 Crore',
        images: [islamabadVillaImg],
      });
    }
  };

  return (
    <section id="about" className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: House Image with Live 3D Drone Aerial Video on Hover/Click */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              onClick={handleOpenDrone}
              className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 hover:border-sky-500/50 bg-slate-900 cursor-pointer shadow-2xl transition-all"
            >
              <DroneAerialPlayer
                images={[islamabadVillaImg]}
                title="Bhatti Real Estate Flagship Estate"
                location="Sector E-7, Islamabad"
                price="CEO Haji Fayyaz Portfolio"
                isHovered={isHovered}
                onExpandClick={handleOpenDrone}
              />
            </div>

            {/* Quiet Attributable Stat Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 z-30 bg-[#0e1422]/95 border border-slate-700/80 rounded-xl p-5 shadow-2xl backdrop-blur-md max-w-xs pointer-events-none">
              <div className="text-xl font-bold font-heading text-white">
                CEO Haji Fayyaz
              </div>
              <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider mt-0.5">
                Bhatti Real Estate Heritage
              </div>
              <div className="text-[11px] text-slate-400 mt-2 font-light">
                18+ years advising founders, diplomats, and investors across Lahore, Islamabad, and Karachi.
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              Bhatti Real Estate · Leadership & Heritage
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Bhatti Real Estate — Led by CEO Haji Fayyaz
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Founded on the pillars of uncompromised transparency, legal thoroughness, and architectural discernment under the visionary leadership of <strong className="text-white font-medium">Chief Executive Officer (CEO) Haji Fayyaz</strong>, <strong className="text-white font-medium">Bhatti Real Estate</strong> is the premier luxury brokerage and development advisory in Lahore, Islamabad, and Karachi.
            </p>

            {/* CEO Leadership Callout */}
            <div className="p-5 rounded-xl bg-[#0e1422] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-bold text-white">
                  Haji Fayyaz
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Chief Executive Officer · Bhatti Real Estate
                </span>
              </div>
              <p className="text-xs text-slate-300 italic font-light leading-relaxed">
                "At Bhatti Real Estate, every property transaction is built on personal integrity, verified ownership, and long-term value creation for our clients and their families."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Absolute Legal Title Rigor
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Every property is pre-vetted with certified town planning authorities (DHA, CDA, KDA).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Overseas Diaspora Support
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Dedicated digital documentation and verified bank escrow channels for overseas Pakistanis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Architectural Excellence
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We select residences that balance timeless aesthetic beauty with long-term structural durability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Long-Term Stewardship
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Comprehensive post-acquisition management, corporate leasing, and portfolio growth advisory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
