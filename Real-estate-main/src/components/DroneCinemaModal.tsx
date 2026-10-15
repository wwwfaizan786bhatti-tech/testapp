import React from 'react';
import { X, Video, MapPin, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { DroneAerialPlayer } from './DroneAerialPlayer';

export interface DroneTourItem {
  title: string;
  subtitle?: string;
  price?: string;
  images: string[];
}

interface DroneCinemaModalProps {
  item: DroneTourItem | null;
  onClose: () => void;
  onBookViewing?: (title: string) => void;
}

export const DroneCinemaModal: React.FC<DroneCinemaModalProps> = ({
  item,
  onClose,
  onBookViewing,
}) => {
  if (!item) return null;

  const whatsappText = encodeURIComponent(
    `Assalam-o-Alaikum CEO Haji Fayyaz (Bhatti Real Estate), I just watched the 3D Drone Aerial Tour of "${item.title}" (${item.subtitle || 'Pakistan'}) and would like to schedule a site visit.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#0a0f1c] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#070b14]">
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Bhatti Real Estate · 3D Drone Aerial Cinema
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-xs text-slate-300 font-medium truncate max-w-xs">
              {item.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close 3D Drone Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main 16:9 3D Drone Viewport */}
        <div className="relative aspect-[16/9] w-full bg-[#050811]">
          <DroneAerialPlayer
            images={item.images}
            title={item.title}
            location={item.subtitle}
            price={item.price}
            autoPlayAlways={true}
            showControls={true}
          />
        </div>

        {/* Bottom Info & Conversion Bar */}
        <div className="p-5 bg-[#0e1422] border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.subtitle || 'Lahore · Islamabad · Karachi'}</span>
              {item.price && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="font-mono text-emerald-400">{item.price}</span>
                </>
              )}
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white mt-0.5">
              {item.title} — 360° Aerial & Exterior Inspection
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag inside the 3D viewport to manually tilt/rotate the drone gimbal, or switch between Orbit, 65m Aerial Nadir, Pool Glide, and 360° 3D modes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`https://wa.me/923084476211?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp CEO Haji Fayyaz</span>
            </a>

            {onBookViewing && (
              <button
                type="button"
                onClick={() => {
                  const t = item.title;
                  onClose();
                  onBookViewing(t);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
              >
                Book Site Visit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
