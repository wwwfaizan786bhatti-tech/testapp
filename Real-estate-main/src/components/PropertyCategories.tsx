import React, { useState } from 'react';
import { ArrowUpRight, Video } from 'lucide-react';
import {
  lahoreVillaImg,
  islamabadVillaImg,
  karachiPenthouseImg,
  showcaseImg,
  heroImg,
} from '../data/mockData';
import { Tilt3DCard } from './Tilt3DCard';
import { DroneAerialPlayer } from './DroneAerialPlayer';
import { DroneTourItem } from './DroneCinemaModal';

interface PropertyCategoriesProps {
  onSelectCategory: (category: string) => void;
  onLaunchDroneTour?: (item: DroneTourItem) => void;
  onShowGallery?: () => void;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  onSelectCategory,
  onLaunchDroneTour,
  onShowGallery,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = [
    {
      id: '5 Marla Houses',
      title: '5 Marla Modern Houses',
      description:
        'Modern double-storey family residences with car porch, Spanish/cubist elevations, and turnkey interiors in DHA & Bahria Town.',
      image: lahoreVillaImg,
      listingCount: '45+ Curated Homes',
      isGallery: false,
    },
    {
      id: '10 Marla Houses',
      title: '10 Marla Designer Houses',
      description:
        'Contemporary and Spanish residences featuring 5 master suites, double units, side passages, and 2-car porches in DHA & Bahria Town.',
      image: showcaseImg,
      listingCount: '38 Prime Houses',
      isGallery: false,
    },
    {
      id: '1 Kanal Houses',
      title: '1 Kanal Executive Residences',
      description:
        'Architectural statement residences with lush front lawns, double-height foyers, and 3-4 car covered motor porches in DHA Phase 5, 6 & Bahria.',
      image: heroImg,
      listingCount: '29 Grand Homes',
      isGallery: false,
    },
    {
      id: '40+ DHA & Bahria Houses',
      title: '40+ DHA & Bahria Town Houses',
      description:
        'Browse 40+ authentic local modern house designs from Pakistan in DHA Lahore, DHA Islamabad, and Bahria Town with full picture gallery.',
      image: karachiPenthouseImg,
      listingCount: '40+ Real House Pictures',
      isGallery: true,
    },
    {
      id: 'Commercial',
      title: 'DHA & Bahria Commercial Spaces',
      description:
        'High-value commercial plazas and retail shop spaces in DHA Commercial Broadways and Bahria Civic Centers.',
      image: islamabadVillaImg,
      listingCount: '16 Commercial Assets',
      isGallery: false,
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3 flex items-center gap-2">
            <Video className="w-4 h-4 text-sky-400" />
            <span>Bhatti Real Estate · Interactive 3D Drone Categories</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Property Categories
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Hover over any category to preview a <strong className="text-sky-400 font-medium">live 3D drone flyover</strong>, or click to explore curated portfolios by <strong className="text-slate-200 font-medium">Bhatti Real Estate</strong> (CEO Haji Fayyaz).
          </p>
        </div>

        {/* Dynamic Bento-inspired 3D visual grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const isHovered = hoveredId === cat.id;
            return (
              <Tilt3DCard
                key={cat.id}
                intensity={7}
                onClick={() => {
                  if (cat.isGallery && onShowGallery) {
                    onShowGallery();
                  } else {
                    onSelectCategory(cat.id);
                  }
                }}
                className={idx === 0 ? 'lg:col-span-2' : ''}
              >
                <div
                  onMouseEnter={() => setHoveredId(cat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0e1422] cursor-pointer transition-all duration-300 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-950/30 w-full ${
                    idx === 0 ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                >
                  {/* 3D Drone Aerial Player on Hover */}
                  <DroneAerialPlayer
                    images={[cat.image]}
                    title={cat.title}
                    location="Lahore · Islamabad · Karachi"
                    price={cat.listingCount}
                    isHovered={isHovered}
                    showControls={false}
                    onExpandClick={(e) => {
                      e.stopPropagation();
                      if (onLaunchDroneTour) {
                        onLaunchDroneTour({
                          title: `${cat.title} — 3D Aerial Showcase`,
                          subtitle: cat.listingCount,
                          images: [cat.image],
                        });
                      }
                    }}
                  />

                  {/* Measured dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/45 to-transparent opacity-85 pointer-events-none" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-sky-300 bg-sky-950/70 backdrop-blur-md px-3 py-1 rounded-md border border-sky-500/20">
                        {cat.listingCount}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-sky-500 group-hover:border-sky-500 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-light">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
