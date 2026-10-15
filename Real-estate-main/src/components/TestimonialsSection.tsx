import React from 'react';
import { testimonialsData } from '../data/mockData';
import { Quote, Building } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
            Client Experiences
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Trusted by Leaders & Investors
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Reflections from corporate founders, senior professionals, and overseas Pakistanis who entrust us with their prime property acquisitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#0e1422] border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-sky-500/40 mb-6" />

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80">
                <div className="font-heading text-base font-bold text-white">
                  {item.clientName}
                </div>
                <div className="text-xs text-sky-400 font-medium">
                  {item.profession}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{item.propertyPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
