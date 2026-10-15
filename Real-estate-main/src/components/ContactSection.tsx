import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Building,
} from 'lucide-react';

interface ContactSectionProps {
  initialServiceOrProperty?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceOrProperty,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'Lahore',
    propertyType: 'Luxury Villas',
    budget: '10to20',
    message: initialServiceOrProperty ? `I am interested in inquiry regarding: ${initialServiceOrProperty}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid phone number with country code (e.g. +92 300 1234567).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#080c14] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Info & Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 mb-3">
                Bhatti Real Estate · Direct Communication
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Connect With CEO Haji Fayyaz
              </h2>
              <p className="text-slate-400 mt-4 text-sm font-light leading-relaxed">
                Whether acquiring your flagship residence, listing an estate, or structuring property investments, <strong className="text-white font-medium">CEO Haji Fayyaz</strong> and the <strong className="text-white font-medium">Bhatti Real Estate</strong> executive team are at your disposal.
              </p>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-900/60 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Instant WhatsApp Support
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/923084476211?text=Hello%20Bhatti%20Real%20Estate,%20I%20would%20like%20to%20schedule%20a%20private%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 text-xs font-mono font-bold text-white transition-colors"
                  >
                    <span>0308 4476211</span>
                  </a>
                  <a
                    href="https://wa.me/923054911007?text=Hello%20Bhatti%20Real%20Estate,%20I%20would%20like%20to%20schedule%20a%20private%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 text-xs font-mono font-bold text-white transition-colors"
                  >
                    <span>0305 4911007</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1422] border border-slate-800 text-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-950/60 flex items-center justify-center text-sky-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Direct Executive Lines
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="tel:03084476211"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-white border border-slate-800 transition-colors"
                  >
                    <span>0308 4476211</span>
                  </a>
                  <a
                    href="tel:03054911007"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-white border border-slate-800 transition-colors"
                  >
                    <span>0305 4911007</span>
                  </a>
                </div>
              </div>

              <a
                href="mailto:inquiry@bhattirealestate.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0e1422] border border-slate-800 hover:border-slate-700 text-slate-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    inquiry@bhattirealestate.com
                  </div>
                </div>
              </a>
            </div>

            {/* Tri-City Offices */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Principal Advisory Offices:
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Lahore (Head Office):</strong> Broadway Commercial, Sector K, DHA Phase 8, Lahore.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Islamabad:</strong> Beverly Centre, Jinnah Avenue, Blue Area & F-7, Islamabad.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Karachi:</strong> Marine Promenade, Ocean Tower, Block 4, Clifton, Karachi.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0e1422] border border-slate-800 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-white font-medium">{formData.name}</strong>. A senior partner from our {formData.preferredLocation} office will review your specifications and contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        preferredLocation: 'Lahore',
                        propertyType: 'Luxury Villas',
                        budget: '10to20',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-800/80 pb-4 mb-2">
                    <h3 className="font-heading text-xl font-bold text-white">
                      Request a Confidential Consultation
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Our managing partners provide tailored guidance with discretion.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Email & Preferred Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tariq@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Preferred Location
                      </label>
                      <select
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="Lahore">Lahore (DHA, Gulberg)</option>
                        <option value="Islamabad">Islamabad (Sector E-7, F-6, F-7)</option>
                        <option value="Karachi">Karachi (Clifton, DHA Phase 8)</option>
                        <option value="Overseas Diaspora">Overseas Pakistani Investor</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Property Category
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="Luxury Villas">Luxury Villas (1-2 Kanal)</option>
                        <option value="Houses">Modern Houses & Mansions</option>
                        <option value="Apartments">Apartments & Penthouses</option>
                        <option value="Commercial">Commercial Properties</option>
                        <option value="Plots">Prime Residential Plots</option>
                        <option value="Investment Properties">Investment Portfolios</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1.5">
                        Budget Allocation (PKR)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="under10">Under PKR 10 Crore</option>
                        <option value="10to20">PKR 10 - 20 Crore</option>
                        <option value="20to35">PKR 20 - 35 Crore</option>
                        <option value="above35">Above PKR 35 Crore</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Specific Requirements / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify your preferred sector, desired move-in timeframe, or investment objectives..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-xl shadow-sky-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>SENDING INQUIRY...</span>
                    ) : (
                      <>
                        <span>SEND INQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
