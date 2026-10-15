import React, { useState, useMemo, useEffect } from 'react';
import {
  houseGalleryData,
  GalleryHouse,
} from '../data/houseGalleryData';
import {
  Search,
  Filter,
  Grid,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Car,
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  Video,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { DroneAerialPlayer } from './DroneAerialPlayer';

interface HouseGalleryProps {
  onOpenConsultation?: (topic: string) => void;
  currency?: 'PKR' | 'USD';
  resetSignal?: number;
}

type SizeFilter = 'All' | '5 Marla' | '10 Marla' | '1 Kanal';
type SocietyFilter = 'All' | 'DHA' | 'Bahria Town';

export const HouseGallery: React.FC<HouseGalleryProps> = ({
  onOpenConsultation,
  currency = 'PKR',
  resetSignal = 0,
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeFilter>('All');
  const [selectedSociety, setSelectedSociety] = useState<SocietyFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'size'>('featured');
  const [activeModalHouse, setActiveModalHouse] = useState<GalleryHouse | null>(null);
  const [modalDroneView, setModalDroneView] = useState(false);
  // Default to showing all 40+ houses immediately so clicking this option shows all house images
  const [visibleCount, setVisibleCount] = useState(houseGalleryData.length);

  // When resetSignal changes or on custom event, show all 40+ houses
  useEffect(() => {
    if (resetSignal > 0) {
      setSelectedSize('All');
      setSelectedSociety('All');
      setSearchQuery('');
      setVisibleCount(houseGalleryData.length);
    }
  }, [resetSignal]);

  // Global event listener to show full gallery from any button across the website
  useEffect(() => {
    const handleTrigger = () => {
      setSelectedSize('All');
      setSelectedSociety('All');
      setSearchQuery('');
      setVisibleCount(houseGalleryData.length);
      const el = document.getElementById('house-gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('show-dha-bahria-gallery', handleTrigger);
    return () => window.removeEventListener('show-dha-bahria-gallery', handleTrigger);
  }, []);

  const handleShowAllDhaBahriaHouses = () => {
    setSelectedSize('All');
    setSelectedSociety('All');
    setSearchQuery('');
    setVisibleCount(houseGalleryData.length);
  };

  // Format price
  const formatPrice = (house: GalleryHouse) => {
    if (currency === 'USD') {
      const usdAmount = Math.round(house.pricePKR / 280);
      return `$${usdAmount.toLocaleString()} USD`;
    }
    return house.priceDisplay;
  };

  // Filter and sort houses
  const filteredHouses = useMemo(() => {
    return houseGalleryData
      .filter((house) => {
        if (selectedSize !== 'All' && house.size !== selectedSize) {
          return false;
        }
        if (selectedSociety !== 'All' && house.society !== selectedSociety) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const match =
            house.title.toLowerCase().includes(q) ||
            house.societyFullName.toLowerCase().includes(q) ||
            house.city.toLowerCase().includes(q) ||
            house.architecturalStyle.toLowerCase().includes(q) ||
            house.features.some((f) => f.toLowerCase().includes(q));
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
        if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
        if (sortBy === 'size') {
          const order: Record<string, number> = { '5 Marla': 1, '10 Marla': 2, '1 Kanal': 3 };
          return order[a.size] - order[b.size];
        }
        return 0; // default featured
      });
  }, [selectedSize, selectedSociety, searchQuery, sortBy]);

  // Modal navigation
  const currentIndex = useMemo(() => {
    if (!activeModalHouse) return -1;
    return filteredHouses.findIndex((h) => h.id === activeModalHouse.id);
  }, [activeModalHouse, filteredHouses]);

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredHouses.length - 1) {
      setActiveModalHouse(filteredHouses[currentIndex + 1]);
    } else if (filteredHouses.length > 0) {
      setActiveModalHouse(filteredHouses[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModalHouse(filteredHouses[currentIndex - 1]);
    } else if (filteredHouses.length > 0) {
      setActiveModalHouse(filteredHouses[filteredHouses.length - 1]);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalHouse) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveModalHouse(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalHouse, currentIndex, filteredHouses]);

  const sizeBadgeColors: Record<string, string> = {
    '5 Marla': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    '10 Marla': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    '1 Kanal': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  };

  const createWhatsAppLink = (house: GalleryHouse) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Haji Fayyaz Sahab,\n\nI am interested in this house on Bhatti Real Estate website:\n*${house.title}*\n- Size: ${house.size}\n- Location: ${house.societyFullName}\n- Price: ${house.priceDisplay}\n\nPlease share more details and arrange a site visit.`
    );
    return `https://wa.me/923084476211?text=${text}`;
  };

  return (
    <section id="house-gallery" className="py-24 bg-[#090d16] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Bhatti Real Estate · 40+ DHA & Bahria Town Modern Houses</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              40+ Houses from DHA & Bahria Town
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg font-light leading-relaxed">
              Explore 40+ authentic local modern house designs from Pakistan — decent double-storey residences in <strong className="text-emerald-400 font-medium">5 Marla</strong>, <strong className="text-sky-400 font-medium">10 Marla</strong>, and <strong className="text-amber-400 font-medium">1 Kanal</strong> sizes in <strong className="text-white font-medium">DHA & Bahria Town in Pakistan only</strong>. Inspected & verified by <strong className="text-slate-200 font-medium">CEO Haji Fayyaz</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShowAllDhaBahriaHouses}
              className="bg-[#0e1422] hover:bg-sky-950/60 border border-slate-800 hover:border-sky-500/50 rounded-xl px-4 py-3 text-right transition-all group cursor-pointer"
              title="Click to display all 40+ DHA and Bahria Town house pictures"
            >
              <div className="text-2xl font-bold font-mono text-sky-400 group-hover:text-white flex items-center justify-end gap-1.5">
                <span>{houseGalleryData.length}+</span>
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-sky-300">
                Show All 40+ House Images
              </div>
            </button>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <div className="bg-[#0e1422]/95 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl backdrop-blur-md">
          {/* Top Row: Prominent 40+ DHA & Bahria Houses Master Option + Society & Size Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            {/* Primary '40+ DHA & Bahria Town Houses' Option Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleShowAllDhaBahriaHouses}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  selectedSize === 'All' && selectedSociety === 'All' && searchQuery === ''
                    ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg shadow-sky-950/50 ring-2 ring-sky-400/40'
                    : 'bg-slate-900/90 text-sky-300 hover:text-white hover:bg-slate-800 border border-sky-500/30'
                }`}
                title="Click to view all 40+ DHA and Bahria Town houses from Pakistan"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>40+ DHA & Bahria Houses (All {houseGalleryData.length})</span>
              </button>

              <div className="h-6 w-px bg-slate-800 hidden sm:block mx-1" />

              {/* Society Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:inline mr-1">
                  Society:
                </span>
                {(['DHA', 'Bahria Town'] as SocietyFilter[]).map((soc) => {
                  const count = houseGalleryData.filter((h) => h.society === soc).length;
                  const isActive = selectedSociety === soc;
                  return (
                    <button
                      key={soc}
                      type="button"
                      onClick={() => {
                        setSelectedSociety(isActive ? 'All' : soc);
                        setVisibleCount(houseGalleryData.length);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40 ring-1 ring-blue-400/50'
                          : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span>{soc}</span>
                      <span className="text-[10px] opacity-75 font-mono ml-1">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Size Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Size:
              </span>
              {(['5 Marla', '10 Marla', '1 Kanal'] as SizeFilter[]).map((size) => {
                const count = houseGalleryData.filter((h) => h.size === size).length;
                const isActive = selectedSize === size;
                const priceHint =
                  size === '5 Marla'
                    ? 'Min 3.5 Cr'
                    : size === '10 Marla'
                    ? 'Max 7.0 Cr'
                    : '10 - 12 Cr';
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(isActive ? 'All' : size);
                      setVisibleCount(houseGalleryData.length);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? size === '5 Marla'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/50'
                          : size === '10 Marla'
                          ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/40 ring-1 ring-sky-400/50'
                          : 'bg-amber-600 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50'
                        : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{size}</span>
                    <span className="text-[10px] opacity-75 font-mono">({count})</span>
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-black/30 text-white/90 font-medium">
                      {priceHint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DHA Phase 6, Bahria Sector C, Spanish, Corner..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size">Size: 5M → 10M → 1K</option>
                </select>
              </div>

              <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                Showing <strong className="text-sky-400">{Math.min(visibleCount, filteredHouses.length)}</strong> of <strong className="text-white">{filteredHouses.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 40+ Houses Gallery Grid */}
        {filteredHouses.length === 0 ? (
          <div className="text-center py-16 bg-[#0e1422] border border-slate-800 rounded-2xl p-8">
            <p className="text-slate-400 text-sm">No houses found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedSize('All');
                setSelectedSociety('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHouses.slice(0, visibleCount).map((house, idx) => {
              return (
                <div
                  key={house.id}
                  className="group bg-[#0e1422] border border-slate-800 hover:border-sky-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-950/40 flex flex-col justify-between"
                >
                  <div>
                    {/* Picture Container with Zoom on Hover */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => {
                        setActiveModalHouse(house);
                        setModalDroneView(false);
                      }}
                    >
                      <img
                        src={house.imageUrl}
                        alt={house.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                        {/* Size Badge */}
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border backdrop-blur-md uppercase tracking-wider ${
                            sizeBadgeColors[house.size] || 'bg-slate-800 text-slate-200 border-slate-700'
                          }`}
                        >
                          {house.size}
                        </span>

                        {/* Society Tag */}
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
                          {house.society}
                        </span>
                      </div>

                      {/* Bottom Image Hover Prompt */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-sky-600/90 text-white backdrop-blur-md flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" />
                          <span>View Full Photo</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/80 text-sky-300 backdrop-blur-md">
                          #{idx + 1} of {filteredHouses.length}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-xs text-sky-400 font-medium mb-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{house.societyFullName}</span>
                      </div>

                      <h3
                        className="font-heading text-base font-bold text-white mb-2 group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-1"
                        onClick={() => {
                          setActiveModalHouse(house);
                          setModalDroneView(false);
                        }}
                      >
                        {house.title}
                      </h3>

                      {/* Price */}
                      <div className="text-lg font-bold font-mono text-slate-100 mb-3 tabular-nums">
                        {formatPrice(house)}
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-800/80 text-[11px] text-slate-300 font-mono">
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-slate-500" />
                          <span>{house.bedrooms} Bed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-500" />
                          <span>{house.bathrooms} Bath</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">{house.carPorch.split(' ')[0]} Car</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {house.features.slice(0, 2).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalHouse(house);
                        setModalDroneView(false);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Inspect</span>
                    </button>

                    <a
                      href={createWhatsAppLink(house)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-950/40"
                      title="Direct WhatsApp with Haji Fayyaz"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Deal</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button if over visible count */}
        {filteredHouses.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredHouses.length))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-950/40 transition-all duration-200 active:scale-95"
            >
              <span>Load More Pictures ({filteredHouses.length - visibleCount} Remaining)</span>
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredHouses.length)}
              className="ml-3 inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <span>Show All {filteredHouses.length} Pictures</span>
            </button>
          </div>
        )}

        {/* CEO Contact Verification Footer */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#0e1422] via-[#101827] to-[#0e1422] border border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h4 className="text-white font-heading font-bold text-base">
                Looking for a specific 5M, 10M, or 1 Kanal House in DHA or Bahria Town?
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                CEO Haji Fayyaz holds direct owner listings across DHA Lahore (Phase 5 to 9), Bahria Town, and Islamabad.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:03084476211"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold tracking-wider"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>0308 4476211</span>
            </a>
            <a
              href="https://wa.me/923054911007?text=Assalam-o-Alaikum%20Haji%20Fayyaz%20Sahab,%20I%20would%20like%20to%20inquire%20about%20houses%20in%20DHA%20/%20Bahria%20Town."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>0305 4911007 (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rich Interactive Photo Inspection & Drone Video Modal */}
      {activeModalHouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#0e1422] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0a0f1a]">
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${
                    sizeBadgeColors[activeModalHouse.size]
                  }`}
                >
                  {activeModalHouse.size}
                </span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white line-clamp-1">
                    {activeModalHouse.title}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{activeModalHouse.societyFullName}</span>
                  </div>
                </div>
              </div>

              {/* Close & Mode Switch */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalDroneView(!modalDroneView)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    modalDroneView
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-sky-300" />
                  <span>{modalDroneView ? 'Photo Mode' : '3D Drone Living View'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalHouse(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Main Viewport: Photo or 3D Drone Aerial */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
              {modalDroneView ? (
                <div className="w-full h-full">
                  <DroneAerialPlayer
                    images={[activeModalHouse.imageUrl]}
                    title={activeModalHouse.title}
                    location={activeModalHouse.societyFullName}
                    price={formatPrice(activeModalHouse)}
                    isHovered={true}
                  />
                </div>
              ) : (
                <img
                  src={activeModalHouse.imageUrl}
                  alt={activeModalHouse.alt}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Prev / Next Nav Overlay */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-all z-20"
                aria-label="Previous house picture"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-all z-20"
                aria-label="Next house picture"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-200 font-mono">
                Photo {currentIndex + 1} of {filteredHouses.length}
              </div>
            </div>

            {/* Modal Bottom Details */}
            <div className="p-5 sm:p-6 overflow-y-auto bg-[#0e1422] flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">
                    {formatPrice(activeModalHouse)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Architectural Style: <strong className="text-slate-200">{activeModalHouse.architecturalStyle}</strong> · Status: <strong className="text-emerald-400">{activeModalHouse.status}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:03084476211`}
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>Call Haji Fayyaz</span>
                  </a>
                  <a
                    href={createWhatsAppLink(activeModalHouse)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Finalize Deal on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Specs & Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs font-mono">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Plot Size</span>
                  <span className="text-white font-bold text-sm">{activeModalHouse.size}</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Bedrooms</span>
                  <span className="text-white font-bold text-sm">{activeModalHouse.bedrooms} Beds Attached</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Bathrooms</span>
                  <span className="text-white font-bold text-sm">{activeModalHouse.bathrooms} Luxury Baths</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Car Parking</span>
                  <span className="text-white font-bold text-sm">{activeModalHouse.carPorch}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mt-2">
                {activeModalHouse.description}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {activeModalHouse.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
