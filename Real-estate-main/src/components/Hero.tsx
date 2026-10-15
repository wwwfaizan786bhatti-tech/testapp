import React from 'react';
import { motion } from 'motion/react';
import { heroImg } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBookConsultation: () => void;
  onShowGallery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBookConsultation,
  onShowGallery,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Continuous Natural Drone Glide Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury modern architectural villa at dusk in Pakistan"
          className="w-full h-full object-cover object-center animate-hero-drone"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/75 to-[#080c14]/45" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#080c14]/35 to-[#080c14]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left pt-8">
        <div className="max-w-3xl">
          {/* Subtle Location & Leadership Trust Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white">Bhatti Real Estate</span>
            <span className="text-slate-600">·</span>
            <span>CEO Haji Fayyaz</span>
            <span className="text-slate-600">·</span>
            <span>DHA & Bahria Town Pakistan Only</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance"
          >
            MODERN HOUSES IN DHA & BAHRIA TOWN
          </motion.h1>

          {/* Supporting Prose */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-10 text-balance"
          >
            Explore decent, modern double-storey homes in <strong className="text-white font-medium">5 Marla, 10 Marla, and 1 Kanal</strong> across prime sectors of DHA and Bahria Town in Pakistan. All listings and projects feature genuine local housing photos under the trusted supervision of <strong className="text-sky-400 font-medium">CEO Haji Fayyaz</strong>.
          </motion.p>

          {/* Master CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mb-14"
          >
            <button
              type="button"
              onClick={() => {
                if (onShowGallery) {
                  onShowGallery();
                } else {
                  window.dispatchEvent(new CustomEvent('show-dha-bahria-gallery'));
                  const el = document.getElementById('house-gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-xl shadow-sky-950/50 hover:shadow-sky-500/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <span>40+ DHA & BAHRIA HOUSES (GALLERY)</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-bold tracking-widest uppercase text-sky-300 bg-sky-950/70 hover:bg-sky-900/80 border border-sky-500/40 hover:border-sky-400 rounded-lg backdrop-blur-md transition-all duration-200 active:scale-95"
            >
              <span>5M · 10M · 1 KANAL PROPERTIES</span>
            </button>

            <button
              onClick={onBookConsultation}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-bold tracking-widest uppercase text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 rounded-lg backdrop-blur-md transition-all duration-200 active:scale-95"
            >
              CONTACT CEO HAJI FAYYAZ
            </button>
          </motion.div>

          {/* Quantitative Trust Markers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
                PKR 45B+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Bhatti Real Estate Portfolio
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
                Haji Fayyaz
              </div>
              <div className="text-xs text-sky-400 font-medium mt-1">
                Chief Executive Officer (CEO)
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono tabular-nums tracking-tight">
                100% Verified
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Titles & Clear Regulatory NOCs
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
