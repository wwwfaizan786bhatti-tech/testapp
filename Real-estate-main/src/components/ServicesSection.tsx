import React from 'react';
import { servicesData } from '../data/mockData';
import {
  Key,
  TrendingUp,
  BarChart3,
  Compass,
  Megaphone,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenConsultation,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Key,
    TrendingUp,
    BarChart3,
    Compass,
    Megaphone,
    ShieldCheck,
  };

  return (
    <section id="services" className="py-24 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
              Comprehensive Capabilities
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
              Full-spectrum real estate advisory tailored for private clients, high-income families, and corporate enterprises across Pakistan.
            </p>
          </div>
        </div>

        {/* 6 Clean Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Key;
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="group p-8 rounded-2xl bg-[#0e1422] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-sky-950/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Natural human editorial numbering */}
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {indexNumber}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-sky-300/80 font-medium mb-4">
                    {service.shortDescription}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                    {service.detailedDescription}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800/80 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(service.title)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <span>Inquire Regarding {service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
