import React, { useState } from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize2, MapPin, ArrowUpRight, ShieldCheck, Video } from 'lucide-react';
import { Tilt3DCard } from './Tilt3DCard';
import { DroneAerialPlayer } from './DroneAerialPlayer';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  currency: 'PKR' | 'USD';
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onSelectProperty,
  currency,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Conversion rate approx 1 USD = 280 PKR
  const formatPrice = (prop: Property) => {
    if (currency === 'USD') {
      const usdAmount = Math.round(prop.pricePKR / 280);
      return `$${usdAmount.toLocaleString()} USD`;
    }
    return prop.priceDisplay;
  };

  return (
    <section id="properties" className="py-24 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-sky-400" />
              <span>Bhatti Real Estate · DHA & Bahria Town Houses</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              DHA & Bahria Town Houses
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
              Explore decent, modern houses in <strong className="text-emerald-400 font-medium">5 Marla</strong>, <strong className="text-sky-400 font-medium">10 Marla</strong>, and <strong className="text-amber-400 font-medium">1 Kanal</strong> sizes commonly found in regular housing societies like DHA Lahore, Bahria Town, and Islamabad. Verified by <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono bg-[#0e1422] border border-slate-800 px-3.5 py-2 rounded-lg">
              {properties.length} Active Society Houses
            </span>
          </div>
        </div>

        {/* Property Grid with 3D Perspective Tilt & Auto-Playing 3D Drone Aerial Video on Hover/Click */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const isHovered = hoveredId === property.id;
            return (
              <Tilt3DCard key={property.id} intensity={7} className="h-full">
                <article
                  onMouseEnter={() => setHoveredId(property.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group bg-[#0e1422] border border-slate-800 hover:border-sky-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-950/40 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* House Image / Live 3D Drone Aerial Video Container */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => onSelectProperty(property)}
                    >
                      <DroneAerialPlayer
                        images={property.images}
                        title={property.title}
                        location={property.location}
                        price={formatPrice(property)}
                        isHovered={isHovered}
                        onExpandClick={() => onSelectProperty(property)}
                      />

                      {/* Clean location & purpose badges when not hovering */}
                      {!isHovered && (
                        <>
                          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 pointer-events-none">
                            <MapPin className="w-3.5 h-3.5 text-sky-400" />
                            <span>{property.city}</span>
                          </div>

                          <div className="absolute top-4 right-4 z-10 text-xs font-semibold tracking-wider uppercase text-sky-300 bg-sky-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-sky-500/20 pointer-events-none">
                            For {property.purpose}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                      {/* Category & Location Line */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${
                          property.area.includes('5 Marla')
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : property.area.includes('10 Marla')
                            ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                            : property.area.includes('1 Kanal')
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {property.area.split(' ')[0]} {property.area.split(' ')[1] || ''}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="truncate">{property.location}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-heading text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-1"
                        onClick={() => onSelectProperty(property)}
                      >
                        {property.title}
                      </h3>

                      {/* Price */}
                      <div className="text-2xl font-bold text-sky-400 font-mono tabular-nums mb-4 tracking-tight">
                        {formatPrice(property)}
                      </div>

                      {/* Specs Line */}
                      <div className="flex items-center justify-between py-3.5 border-y border-slate-800/80 text-xs text-slate-300 font-mono tabular-nums">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Bed className="w-4 h-4 text-slate-500" />
                            <span>{property.bedrooms} Beds</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-slate-500" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-4 h-4 text-slate-500" />
                          <span>{property.area}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="mt-4 text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {property.shortDescription}
                      </p>

                      {/* Executive Verification Line */}
                      <div className="mt-3 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                          <span>CEO: {property.agent.name}</span>
                        </span>
                        <span className="font-mono text-sky-400">{property.agent.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Property & 3D Drone Video CTA Button */}
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => onSelectProperty(property)}
                      className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-sky-600/20 text-slate-200 hover:text-sky-300 border border-slate-700 hover:border-sky-500/50 text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-sky-500/60"
                    >
                      <Video className="w-4 h-4 text-sky-400" />
                      <span>LAUNCH 3D DRONE TOUR & DETAILS</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              </Tilt3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
