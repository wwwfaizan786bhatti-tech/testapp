import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Phone,
  MessageCircle,
  Building,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  User,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';
import { BhattiLogo } from './BhattiLogo';

interface AutoLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip?: () => void;
}

export const AutoLeadModal: React.FC<AutoLeadModalProps> = ({
  isOpen,
  onClose,
  onSkip,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: '10 Marla House',
    society: 'DHA Lahore',
    purpose: 'Ready to Buy',
    budgetRange: '3.5 - 7 Crore PKR',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    if (onSkip) {
      onSkip();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your phone or WhatsApp number');
      return;
    }

    setIsSubmitting(true);

    // Persist lead to localStorage
    try {
      const existingLeads = JSON.parse(
        localStorage.getItem('bhatti_client_leads') || '[]'
      );
      const newLead = {
        ...formData,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'new',
      };
      existingLeads.unshift(newLead);
      localStorage.setItem(
        'bhatti_client_leads',
        JSON.stringify(existingLeads.slice(0, 50))
      );
    } catch (err) {
      console.warn('Could not store lead to localStorage', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    const text = `Assalam-o-Alaikum Haji Fayyaz Sahib,\nI am submitting my requirements via Bhatti Real Estate website:\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Interested In:* ${formData.propertyType}\n*Society:* ${formData.society}\n*Purpose:* ${formData.purpose}\n*Budget:* ${formData.budgetRange}${formData.requirements ? `\n*Notes:* ${formData.requirements}` : ''}\n\nPlease share available verified house options.`;
    return `https://wa.me/923084476211?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in"
    >
      {/* Background overlay click closes or skips */}
      <div
        className="fixed inset-0"
        onClick={handleDismiss}
        title="Click to dismiss"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xl bg-[#0b101d] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto animate-scale-up">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800/80 bg-[#070b14]">
          <div className="flex items-center gap-3">
            <BhattiLogo size="sm" lightText={true} />
            <div className="hidden xs:block border-l border-slate-700/80 pl-3">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                CEO: Haji Fayyaz
              </span>
              <span className="text-[10px] text-slate-400 block">
                Direct Client Desk
              </span>
            </div>
          </div>

          {/* Cancel (×) Button */}
          <button
            onClick={handleDismiss}
            className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            aria-label="Cancel and close dialog"
            title="Cancel (Close dialog)"
          >
            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200">
              Cancel
            </span>
            <X className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {!isSubmitted ? (
            <div>
              {/* Title & Trust Header */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome to Bhatti Real Estate</span>
                </div>
                <h2
                  id="lead-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug"
                >
                  Find Your Ideal House in DHA &amp; Bahria Town
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
                  Share your requirements below. <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong> and our executive property team will personally assist you with verified 5 Marla, 10 Marla, or 1 Kanal houses and custom designs.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone / WhatsApp <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="0300 1234567 / +92..."
                        className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* House / Property Size */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      House Size / Interest
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                      >
                        <option value="5 Marla House">5 Marla Modern House</option>
                        <option value="10 Marla House">10 Marla Modern House</option>
                        <option value="1 Kanal House">1 Kanal Luxury House</option>
                        <option value="Custom 3D House Design">Custom 3D House Design &amp; Build</option>
                        <option value="Residential Plot">Residential Plot (DHA / Bahria)</option>
                        <option value="Commercial Plaza">Commercial Property / Plaza</option>
                      </select>
                    </div>
                  </div>

                  {/* Society / Location */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Housing Society
                    </label>
                    <div className="relative">
                      <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.society}
                        onChange={(e) =>
                          setFormData({ ...formData, society: e.target.value })
                        }
                        className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                      >
                        <option value="DHA Lahore (Phase 5, 6, 7, 8, 9 Prism)">DHA Lahore (All Phases)</option>
                        <option value="Bahria Town Lahore (Sector C, B, Jasmine)">Bahria Town Lahore</option>
                        <option value="DHA Islamabad / Rawalpindi (Phase 2)">DHA Islamabad / Rawalpindi</option>
                        <option value="Bahria Safari Valley / Bahria Islamabad">Bahria Town Islamabad</option>
                        <option value="Flexible / Need CEO Guidance">Flexible / Need Recommendations</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Purpose */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Purpose
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                    >
                      <option value="Ready to Buy">Ready to Buy (Immediate Possession)</option>
                      <option value="Construction & Build">Constructing a New House</option>
                      <option value="Investment / ROI">Long-term Investment &amp; High Yield</option>
                      <option value="Site Viewing">Book an In-Person Site Viewing</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Estimated Budget (PKR)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all"
                    >
                      <option value="Under 3.5 Crore PKR">Under 3.5 Crore (5 Marla)</option>
                      <option value="3.5 - 7 Crore PKR">3.5 - 7 Crore (10 Marla)</option>
                      <option value="7 - 15 Crore PKR">7 - 15 Crore (1 Kanal)</option>
                      <option value="Above 15 Crore PKR">Above 15 Crore (Luxury / Commercial)</option>
                      <option value="Flexible / Negotiable">Flexible / Discuss with Haji Fayyaz</option>
                    </select>
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    placeholder="e.g. Corner house, 4 bedrooms, double car porch, immediate possession..."
                    className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition-all resize-none"
                  />
                </div>

                {/* Trust highlight */}
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Direct access to <strong className="text-white">Haji Fayyaz</strong> (CEO) · Guaranteed verified registry &amp; society transfers.
                  </span>
                </div>

                {/* Action Buttons: Submit + Skip option */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Skip Option */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="order-2 sm:order-1 px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 text-xs sm:text-sm font-medium transition-all text-center"
                  >
                    Skip for now, explore website →
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Details</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Submission Success State */
            <div className="py-4 text-center space-y-5 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Details Received Successfully!
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-emerald-400">{formData.fullName}</strong>. Your inquiry for a{' '}
                  <strong className="text-white">{formData.propertyType}</strong> in{' '}
                  <strong className="text-white">{formData.society}</strong> has been prioritized.
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  <strong className="text-slate-200">CEO Haji Fayyaz</strong> or our senior manager will contact you within 15 minutes.
                </p>
              </div>

              {/* Direct WhatsApp Call-to-action */}
              <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Instant Connect with CEO
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" /> Typically replies in 5m
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp CEO Haji Fayyaz</span>
                  </a>

                  <a
                    href="tel:03084476211"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs sm:text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>Call 0308 4476211</span>
                  </a>
                </div>
              </div>

              {/* Close / Continue browsing */}
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Continue browsing website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
