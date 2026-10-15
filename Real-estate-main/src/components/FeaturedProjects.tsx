import React, { useState } from 'react';
import { Project } from '../types';
import { MapPin, Calendar, ArrowUpRight, CheckCircle2, Video } from 'lucide-react';
import { Tilt3DCard } from './Tilt3DCard';
import { DroneAerialPlayer } from './DroneAerialPlayer';
import { DroneTourItem } from './DroneCinemaModal';

interface FeaturedProjectsProps {
  projects: Project[];
  onConsultProject: (projectName: string) => void;
  onLaunchDroneTour?: (item: DroneTourItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onConsultProject,
  onLaunchDroneTour,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-sky-400" />
              <span>Bhatti Real Estate · DHA & Bahria Town Pakistan Projects</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured Pakistani Housing Projects
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
              Real local housing project pictures and <strong className="text-sky-400 font-medium">3D drone aerial views</strong> of prime residential communities in DHA and Bahria Town across Pakistan, curated by <strong className="text-slate-200 font-medium">Bhatti Real Estate</strong> under <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            const handleOpenDrone = () => {
              if (onLaunchDroneTour) {
                onLaunchDroneTour({
                  title: project.name,
                  subtitle: `${project.location}, ${project.city}`,
                  price: project.startingPrice,
                  images: [project.image],
                });
              }
            };

            return (
              <Tilt3DCard key={project.id} intensity={7} className="h-full">
                <div
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group bg-[#0e1422] border border-slate-800 hover:border-sky-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-950/30 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Project Image / Live 3D Drone Aerial Video */}
                    <div
                      onClick={handleOpenDrone}
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      <DroneAerialPlayer
                        images={[project.image]}
                        title={project.name}
                        location={`${project.location}, ${project.city}`}
                        price={project.startingPrice}
                        isHovered={isHovered}
                        onExpandClick={handleOpenDrone}
                      />

                      {!isHovered && (
                        <>
                          <div className="absolute top-4 left-4 z-10 text-xs font-semibold tracking-wider uppercase text-sky-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 pointer-events-none">
                            {project.city}
                          </div>

                          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 text-xs text-slate-300 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            <span>{project.completionDate}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-xs text-sky-400 font-medium mb-1">
                        {project.propertyType}
                      </div>

                      <h3
                        onClick={handleOpenDrone}
                        className="font-heading text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors cursor-pointer"
                      >
                        {project.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      <div className="text-xl font-bold text-white font-mono tabular-nums mb-4">
                        {project.startingPrice}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        {project.shortDescription}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-slate-800/80">
                        {project.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* View Project Action */}
                  <div className="p-6 pt-0 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleOpenDrone}
                      className="w-full py-2.5 px-4 rounded-lg bg-sky-950/60 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4 text-sky-400" />
                      <span>WATCH 3D DRONE AERIAL VIDEO</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onConsultProject(project.name)}
                      className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-sky-600/20 text-slate-200 hover:text-sky-300 border border-slate-700 hover:border-sky-500/50 text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-sky-500/60"
                    >
                      <span>INQUIRE ABOUT PROJECT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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
