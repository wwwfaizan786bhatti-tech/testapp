import React from 'react';
import { BhattiLogo } from './BhattiLogo';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onSelectCategory: (cat: string) => void;
  onSelectCity: (city: 'Lahore' | 'Islamabad' | 'Karachi') => void;
  onShowGallery?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onSelectCategory,
  onSelectCity,
  onShowGallery,
}) => {
  return (
    <footer className="bg-[#060910] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <BhattiLogo size="md" lightText={true} />
            <div className="text-xs font-semibold text-sky-400 tracking-wider uppercase pt-1">
              Chief Executive Officer (CEO): <span className="text-white">Haji Fayyaz</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              <strong className="text-slate-200 font-medium">Bhatti Real Estate</strong>, led by <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong>, is the premier luxury brokerage catering to executives, business owners, and high-net-worth investors across Lahore, Islamabad, and Karachi.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/923084476211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  aria-label="WhatsApp (0308 4476211)"
                  title="WhatsApp: 0308 4476211"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="tel:03084476211"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 hover:border-sky-500/40 transition-colors"
                  aria-label="Call 0308 4476211"
                  title="Call 0308 4476211"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:inquiry@bhattirealestate.com"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:border-slate-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-2">
                <a href="tel:03084476211" className="hover:text-sky-400">0308 4476211</a>
                <span className="text-slate-600">·</span>
                <a href="tel:03054911007" className="hover:text-sky-400">0305 4911007</a>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Certified Real Estate Member & DHA Registered Agency</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-white transition-colors">
                  Featured Properties
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Flagship Projects
                </a>
              </li>
              <li>
                <a
                  href="#house-gallery"
                  onClick={(e) => {
                    if (onShowGallery) {
                      e.preventDefault();
                      onShowGallery();
                    }
                  }}
                  className="hover:text-white transition-colors text-sky-400 font-medium"
                >
                  Gallery (40+ DHA & Bahria Houses)
                </a>
              </li>
              <li>
                <a href="#custom-3d-designer" className="hover:text-white transition-colors">
                  3D House Studio
                </a>
              </li>
              <li>
                <a href="#construction-calculator" className="hover:text-white transition-colors">
                  Cost Estimator (5M/10M/1K)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Advisory Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Firm
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Offices
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white">
              Society Houses
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('5 Marla Houses')}
                  className="hover:text-white transition-colors text-left"
                >
                  5 Marla Houses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('10 Marla Houses')}
                  className="hover:text-white transition-colors text-left"
                >
                  10 Marla Houses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('1 Kanal Houses')}
                  className="hover:text-white transition-colors text-left"
                >
                  1 Kanal Houses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Apartments')}
                  className="hover:text-white transition-colors text-left"
                >
                  Apartments & Penthouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Commercial')}
                  className="hover:text-white transition-colors text-left"
                >
                  Commercial Properties
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Support */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white">
              Prime Cities
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCity('Lahore')}
                  className="hover:text-white transition-colors text-left"
                >
                  Lahore (DHA & Gulberg)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity('Islamabad')}
                  className="hover:text-white transition-colors text-left"
                >
                  Islamabad (E-7 & F-6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity('Karachi')}
                  className="hover:text-white transition-colors text-left"
                >
                  Karachi (Clifton & DHA 8)
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-3 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 text-sky-400 border border-sky-500/20 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                REQUEST CONSULTATION
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Clean Copyright and Legal Notices */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Bhatti Real Estate. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Regulatory Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
