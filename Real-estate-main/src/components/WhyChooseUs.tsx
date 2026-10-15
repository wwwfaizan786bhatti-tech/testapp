import React from 'react';
import { ShieldCheck, Award, Compass, MapPin, Building, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const trustPillars = [
    {
      icon: Building,
      title: 'Premium Properties',
      description:
        'Carefully presented residential and commercial properties. Each estate undergoes rigorous architectural vetting and title examination before listing.',
      metric: 'Top 1% Tier Properties',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Service',
      description:
        'Professional assistance throughout the property journey. Transparent transactional processes with institutional legal documentation and escrow safety.',
      metric: '100% Vetted Legal Deeds',
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description:
        'Experienced support for property decisions. Our partners possess over two decades of capital market acumen across Lahore, Islamabad, and Karachi.',
      metric: '18+ Years Leadership',
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description:
        'Exclusive properties in high-demand addresses including DHA Lahore, Islamabad Diplomatic Enclaves (E-7, F-6), and Clifton Karachi waterfront.',
      metric: 'Top Metro Hubs Only',
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
            The Bhatti Advantage
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Why Discerning Clients Choose Us
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Delivering the highest standard of discretion, legal integrity, and architectural discernment for Pakistan's corporate leadership and overseas diaspora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0e1422] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 text-xs font-mono font-medium text-sky-400">
                  {pillar.metric}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
