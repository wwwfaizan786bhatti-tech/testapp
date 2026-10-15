import React, { useState } from 'react';
import { locationsData } from '../data/mockData';
import { MapPin, ArrowUpRight, TrendingUp, Video } from 'lucide-react';
import { DroneAerialPlayer } from './DroneAerialPlayer';
import { DroneTourItem } from './DroneCinemaModal';

interface LocationsSectionProps {
  onSelectCity: (cityName: 'Lahore' | 'Islamabad' | 'Karachi') => void;
  onLaunchDroneTour?: (item: DroneTourItem) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onSelectCity,
  onLaunchDroneTour,
}) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3 flex items-center gap-2">
            <Video className="w-4 h-4 text-sky-400" />
            <span>Bhatti Real Estate · 3D Drone Sector Flyovers</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Bhatti Real Estate Prime Markets
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Hover over or click any city corridor below for a <strong className="text-sky-400 font-medium">live 3D drone aerial view</strong> curated by <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong> across Lahore, Islamabad, and Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locationsData.map((loc) => {
            const isHovered = hoveredCity === loc.city;
            const handleOpenDrone = () => {
              if (onLaunchDroneTour) {
                onLaunchDroneTour({
                  title: `${loc.city} Luxury Enclaves`,
                  subtitle: loc.primeAreas.join(' · '),
                  price: `${loc.avgYield} Avg Yield`,
                  images: [loc.image],
                });
              }
            };

            return (
              <div
                key={loc.city}
                onMouseEnter={() => setHoveredCity(loc.city)}
                onMouseLeave={() => setHoveredCity(null)}
                className="group bg-[#0e1422] border border-slate-800 hover:border-sky-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header with Live 3D Drone Video on Hover/Click */}
                  <div
                    onClick={handleOpenDrone}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <DroneAerialPlayer
                      images={[loc.image]}
                      title={`${loc.city} Prime Enclaves`}
                      location={loc.primeAreas.join(', ')}
                      price={`${loc.avgYield} Yield`}
                      isHovered={isHovered}
                      onExpandClick={handleOpenDrone}
                    />

                    {!isHovered && (
                      <>
                        <div className="absolute top-4 left-4 z-10 text-xs font-bold tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 flex items-center gap-1.5 pointer-events-none">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>{loc.city}</span>
                        </div>

                        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-slate-200 pointer-events-none">
                          <span className="flex items-center gap-1 text-[11px] text-slate-200 bg-black/65 px-2.5 py-1 rounded border border-white/10">
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                            <span>{loc.avgYield} Yield</span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      {loc.city}
                    </h3>

                    <div className="text-xs text-sky-400 font-medium mb-3">
                      {loc.tagline}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                      {loc.description}
                    </p>

                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Premier Enclaves:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.primeAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-slate-300 bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectCity(loc.city)}
                    className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-sky-600/20 text-slate-200 hover:text-sky-300 border border-slate-700 hover:border-sky-500/50 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explore {loc.city} Properties</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
