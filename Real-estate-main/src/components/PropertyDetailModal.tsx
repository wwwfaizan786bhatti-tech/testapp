import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import {
  X,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Share2,
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { DroneAerialPlayer } from './DroneAerialPlayer';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  currency: 'PKR' | 'USD';
  onRequestViewing: (propertyTitle: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  currency,
  onRequestViewing,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'drone3d' | 'photos'>('drone3d');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setViewMode('drone3d');
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!property) return;
      if (e.key === 'ArrowRight') {
        setViewMode('photos');
        setActiveImageIndex((prev) => (prev + 1) % property.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setViewMode('photos');
        setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, property]);

  if (!property) return null;

  const formatPrice = () => {
    if (currency === 'USD') {
      const usdAmount = Math.round(property.pricePKR / 280);
      return `$${usdAmount.toLocaleString()} USD`;
    }
    return property.priceDisplay;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${property.agent.name}, I just watched the 3D Drone Tour and would like a private viewing for: ${property.title} in ${property.location} (${property.priceDisplay}).`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in"
    >
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#0e1422] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800/80 bg-[#0a0f1a]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Verified Estate
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              Ref: BRE-{property.id.toUpperCase()}
            </span>
          </div>

          {/* Mode Toggle: 3D Drone Aerial Video vs Photo Gallery */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('drone3d')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'drone3d'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>3D Drone Video</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === 'photos'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos ({property.images.length})</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              title="Copy property link"
              aria-label="Share property link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] text-sky-400 font-medium animate-pulse">
                Copied!
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Media Section: 3D Drone Aerial Video OR High-Res Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              {viewMode === 'drone3d' ? (
                <DroneAerialPlayer
                  images={property.images}
                  title={property.title}
                  location={property.location}
                  price={formatPrice()}
                  autoPlayAlways={true}
                  showControls={true}
                />
              ) : (
                <>
                  <img
                    src={property.images[activeImageIndex]}
                    alt={`${property.title} view ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Prev / Next controls */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex(
                            (prev) => (prev - 1 + property.images.length) % property.images.length
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev + 1) % property.images.length)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-slate-300">
                    {activeImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip + 3D Drone Quick Tile */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setViewMode('drone3d')}
                className={`relative w-32 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 flex flex-col items-center justify-center bg-slate-900 ${
                  viewMode === 'drone3d'
                    ? 'border-sky-500 text-sky-400 shadow-md'
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4 mb-1 text-sky-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  3D Drone Tour
                </span>
              </button>

              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setViewMode('photos');
                    setActiveImageIndex(idx);
                  }}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    viewMode === 'photos' && activeImageIndex === idx
                      ? 'border-sky-500 scale-95'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Two-Column Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Property Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{property.location}</span>
                </div>
                <h1
                  id="modal-property-title"
                  className="font-heading text-2xl sm:text-4xl font-bold text-white leading-tight"
                >
                  {property.title}
                </h1>
                <div className="text-3xl font-bold text-sky-400 font-mono tabular-nums mt-3">
                  {formatPrice()}
                </div>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Bedrooms</span>
                  <span className="text-slate-100 font-bold text-sm">
                    {property.bedrooms > 0 ? property.bedrooms : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bathrooms</span>
                  <span className="text-slate-100 font-bold text-sm">{property.bathrooms}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Area</span>
                  <span className="text-slate-100 font-bold text-sm">{property.area}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Year Built</span>
                  <span className="text-slate-100 font-bold text-sm">{property.yearBuilt}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  Architectural Overview
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {property.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  Property Highlights & Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  Community & Compound Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Agent & Direct Conversion Card */}
            <div className="lg:col-span-1 space-y-5">
              <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 sticky top-4 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Bhatti Real Estate Leadership</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white">{property.agent.name}</h3>
                  <div className="text-xs text-sky-400 font-semibold">
                    Chief Executive Officer (CEO) · Bhatti Real Estate
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Executive Specialist: {property.city} Luxury Corridor
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onRequestViewing(property.title);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-sky-950/40 transition-all active:scale-95"
                  >
                    REQUEST A PRIVATE VIEWING
                  </button>

                  <a
                    href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>CONTACT ON WHATSAPP ({property.agent.phone})</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:03084476211"
                      className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      title="Call 0308 4476211"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>0308 4476211</span>
                    </a>
                    <a
                      href="tel:03054911007"
                      className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      title="Call 0305 4911007"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>0305 4911007</span>
                    </a>
                  </div>
                </div>

                {/* Trust Guarantee Note */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Verified Legal Title</span>
                  </div>
                  <p>
                    All documents, NOCs, and direct ownership rights verified by Bhatti Real Estate Legal Chambers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
