import React from 'react';
import { FilterState } from '../types';
import { Search, MapPin, Home, Key, DollarSign, Bed, RefreshCw } from 'lucide-react';

interface PropertySearchProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onSearchSubmit: () => void;
  totalResultsCount: number;
  onShowGallery?: () => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  totalResultsCount,
  onShowGallery,
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    if (key === 'propertyType' && value === '40+ DHA & Bahria Houses' && onShowGallery) {
      onShowGallery();
      return;
    }
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      city: 'All',
      propertyType: 'All',
      purpose: 'All',
      priceRange: 'All',
      bedrooms: 'All',
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    filters.city !== 'All' ||
    filters.propertyType !== 'All' ||
    filters.purpose !== 'All' ||
    filters.priceRange !== 'All' ||
    filters.bedrooms !== 'All' ||
    filters.searchQuery !== '';

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
      <div className="bg-[#0e1422]/95 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
        {/* Purpose Segmented Bar (Interactive tabs) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            {(['All', 'Buy', 'Rent', 'Invest'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleChange('purpose', p)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 whitespace-nowrap ${
                  filters.purpose === p
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'All' ? 'All Purposes' : p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                title="Reset all filters"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <span className="text-xs text-slate-400">
              Showing <strong className="text-white font-mono tabular-nums">{totalResultsCount}</strong> exclusive properties
            </span>
          </div>
        </div>

        {/* 5 Search Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          {/* 1. Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Location</span>
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="All">All Cities (Pakistan)</option>
              <option value="Lahore">Lahore (DHA, Bahria Town, Gulberg)</option>
              <option value="Islamabad">Islamabad / Rawalpindi (DHA, Bahria Town)</option>
              <option value="Karachi">Karachi (DHA Phase 8, Bahria Town, Clifton)</option>
            </select>
          </div>

          {/* 2. Property Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-sky-400" />
              <span>Property Type</span>
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="40+ DHA & Bahria Houses">★ 40+ DHA & Bahria Houses (Gallery)</option>
              <option value="5 Marla Houses">5 Marla Houses (Double Storey)</option>
              <option value="10 Marla Houses">10 Marla Houses (Spanish / Modern)</option>
              <option value="1 Kanal Houses">1 Kanal Houses (Executive / Corner)</option>
              <option value="Apartments">Apartments & Penthouses</option>
              <option value="Commercial">Commercial Properties</option>
              <option value="Plots">Prime Plots & Land</option>
            </select>
          </div>

          {/* 3. Price Range (PKR) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-sky-400" />
              <span>Price Range</span>
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleChange('priceRange', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="All">All Budgets</option>
              <option value="5marla">PKR 3.5 - 4.8 Crore (5 Marla Houses)</option>
              <option value="10marla">PKR 5.2 - 7.0 Crore (10 Marla Houses - Max 7 Cr)</option>
              <option value="1kanal">PKR 10 - 12 Crore (1 Kanal Luxury Houses)</option>
            </select>
          </div>

          {/* 4. Bedrooms */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-sky-400" />
              <span>Bedrooms</span>
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleChange('bedrooms', e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="All">Any Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
            </select>
          </div>

          {/* 5. Primary Search Button */}
          <div>
            <button
              type="button"
              onClick={onSearchSubmit}
              className="w-full h-[42px] inline-flex items-center justify-center gap-2 px-5 text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-lg shadow-sky-900/30 transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH PROPERTY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
