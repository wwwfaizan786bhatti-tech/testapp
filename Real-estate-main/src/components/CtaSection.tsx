import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CtaSectionProps {
  onBookConsultation: () => void;
  onViewProperties: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onBookConsultation,
  onViewProperties,
}) => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#080c14] to-[#0a0f1d] border-t border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-at-c from-sky-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-4">
          Direct Strategic Access
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          READY TO FIND YOUR NEXT PROPERTY?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Talk to our property specialists and discover opportunities that match your requirements across Lahore, Islamabad, and Karachi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-xl shadow-sky-950/50 transition-all duration-200 active:scale-95 group"
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onViewProperties}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-lg backdrop-blur-md transition-all active:scale-95"
          >
            VIEW PROPERTIES
          </button>
        </div>
      </div>
    </section>
  );
};
