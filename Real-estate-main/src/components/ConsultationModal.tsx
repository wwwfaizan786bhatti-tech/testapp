import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, Send, MessageCircle } from 'lucide-react';
import { BhattiLogo } from './BhattiLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  presetTopic,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    format: 'In-Person (Private Office)',
    city: 'Lahore',
    datePreference: '',
    notes: presetTopic ? `Regarding: ${presetTopic}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (presetTopic) {
      setFormData((prev) => ({
        ...prev,
        notes: `Regarding: ${presetTopic}`,
      }));
    }
  }, [presetTopic]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#0e1422] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-[#0a0f1d]">
          <BhattiLogo size="sm" lightText={true} />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Consultation Confirmed
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our managing partner has received your schedule request for {formData.city}. You will receive a direct WhatsApp confirmation within the hour.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
                >
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 id="consultation-modal-title" className="font-heading text-xl font-bold text-white">
                  Schedule Private Consultation
                </h2>
                <p className="text-xs text-slate-400 font-light mt-1">
                  Confidential advisory session with a Bhatti Real Estate managing partner.
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Qureshi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Meeting Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="In-Person (Private Office)">In-Person Office</option>
                    <option value="Private Video (Zoom/Google)">Zoom / Google Meet</option>
                    <option value="WhatsApp Call">WhatsApp Call</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">City / Region</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Lahore">Lahore (DHA Phase 8)</option>
                    <option value="Islamabad">Islamabad (Blue Area / F-7)</option>
                    <option value="Karachi">Karachi (Clifton Block 4)</option>
                    <option value="Overseas Diaspora">Overseas Pakistani</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Notes / Specific Property</label>
                <textarea
                  rows={2}
                  placeholder="Tell us what you are looking for..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-lg shadow-sky-950/40 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'CONFIRMING...' : 'CONFIRM CONSULTATION REQUEST'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
