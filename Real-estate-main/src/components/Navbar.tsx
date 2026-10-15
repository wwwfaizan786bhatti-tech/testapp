import React, { useState, useEffect } from 'react';
import { BhattiLogo } from './BhattiLogo';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
  onShowGallery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  currency,
  onToggleCurrency,
  onShowGallery,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Gallery', href: '#house-gallery' },
    { label: 'Properties', href: '#properties' },
    { label: '3D AI Studio', href: '#custom-3d-designer' },
    { label: 'Custom Cost Estimator', href: '#construction-calculator' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080c14]/92 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#080c14]/95 via-[#080c14]/65 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Aligned Brand Logo */}
          <a
            href="#home"
            className="flex items-center shrink-0 group transition-opacity hover:opacity-95"
            aria-label="Bhatti Real Estate Home"
          >
            <BhattiLogo size="md" lightText={true} />
          </a>

          {/* Zone 2: Single-Row Sleek Navigation Links with Balanced Spacing */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#house-gallery' && onShowGallery) {
                    e.preventDefault();
                    onShowGallery();
                  }
                }}
                className="text-[13px] font-medium tracking-[0.03em] text-slate-300 hover:text-white transition-colors relative py-1.5 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-sky-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Compact Executive Actions (Always Single Row) */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0 whitespace-nowrap">
            {/* Direct Phone Callout on Large Screens */}
            <a
              href="tel:03084476211"
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-sky-400 transition-colors px-2 py-1"
              title="Call CEO Haji Fayyaz: 0308 4476211 / 0305 4911007"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>0308 4476211</span>
            </a>

            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-md border border-slate-700/80 hover:border-slate-500 text-slate-300 transition-colors whitespace-nowrap"
              title="Toggle between Pakistani Rupee (PKR) and US Dollar (USD)"
            >
              <span className={currency === 'PKR' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
                PKR
              </span>
              <span className="mx-1 text-slate-600">/</span>
              <span className={currency === 'USD' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
                USD
              </span>
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href="https://wa.me/923084476211?text=Hello%20Bhatti%20Real%20Estate,%20I%20am%20interested%20in%20luxury%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-emerald-400 transition-colors border border-slate-800 rounded-lg hover:border-emerald-500/40 bg-slate-900/60 shrink-0"
              aria-label="Chat on WhatsApp (0308 4476211)"
              title="WhatsApp CEO Haji Fayyaz: 0308 4476211"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </a>

            {/* Primary Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              className="px-4 xl:px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg transition-all duration-200 shadow-lg shadow-sky-900/30 whitespace-nowrap hover:shadow-sky-500/25 active:scale-95"
            >
              GET A CONSULTATION
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2 shrink-0">
            <button
              onClick={onToggleCurrency}
              className="text-[11px] font-semibold px-2 py-1 rounded border border-slate-800 text-slate-300"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#0a0f1d] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <BhattiLogo size="sm" lightText={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.href === '#house-gallery' && onShowGallery) {
                        e.preventDefault();
                        onShowGallery();
                      }
                    }}
                    className="text-base font-medium tracking-wide text-slate-200 hover:text-sky-400 py-2.5 transition-colors border-b border-slate-800/50"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Display Currency:</span>
                <button
                  onClick={onToggleCurrency}
                  className="px-2 py-1 rounded bg-slate-800 text-sky-400 font-semibold"
                >
                  {currency}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="tel:03084476211"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-slate-200 hover:bg-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>0308 4476211</span>
                </a>
                <a
                  href="tel:03054911007"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-slate-200 hover:bg-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>0305 4911007</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-lg shadow-lg"
              >
                GET A CONSULTATION
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
