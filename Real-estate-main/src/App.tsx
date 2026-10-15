import React, { useState, useMemo, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertySearch } from './components/PropertySearch';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { PropertyCategories } from './components/PropertyCategories';
import { FeaturedProjects } from './components/FeaturedProjects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HouseGallery } from './components/HouseGallery';
import { Interactive3DVilla } from './components/Interactive3DVilla';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { LocationsSection } from './components/LocationsSection';
import { ConstructionCalculator } from './components/ConstructionCalculator';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { DroneCinemaModal, DroneTourItem } from './components/DroneCinemaModal';
import { AutoLeadModal } from './components/AutoLeadModal';

import { propertiesData, projectsData } from './data/mockData';
import { Property, FilterState } from './types';

export default function App() {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [droneCinemaItem, setDroneCinemaItem] = useState<DroneTourItem | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState<string>('');
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  // Automatically trigger the client lead form when website opens
  useEffect(() => {
    // Check if client has dismissed it in this exact browser session
    const hasDismissed = sessionStorage.getItem('bhatti_lead_form_dismissed');
    if (!hasDismissed) {
      // Small graceful entrance delay (750ms) to allow page to load smoothly
      const timer = setTimeout(() => {
        setLeadModalOpen(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseLeadModal = () => {
    setLeadModalOpen(false);
    sessionStorage.setItem('bhatti_lead_form_dismissed', 'true');
  };

  const [filters, setFilters] = useState<FilterState>({
    city: 'All',
    propertyType: 'All',
    purpose: 'All',
    priceRange: 'All',
    bedrooms: 'All',
    searchQuery: '',
  });

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((prop) => {
      // City filter
      if (filters.city !== 'All' && prop.city !== filters.city) {
        return false;
      }
      // Property type filter
      if (filters.propertyType !== 'All' && prop.propertyType !== filters.propertyType) {
        return false;
      }
      // Purpose filter
      if (filters.purpose !== 'All' && prop.purpose !== filters.purpose) {
        return false;
      }
      // Bedrooms filter
      if (filters.bedrooms !== 'All') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (prop.bedrooms < minBeds) return false;
      }
      // Price range filter (PKR)
      if (filters.priceRange === '5marla' || filters.priceRange === 'under3') {
        if (prop.pricePKR < 35000000 || prop.pricePKR > 48000000) return false;
      } else if (filters.priceRange === '10marla' || filters.priceRange === '3to7') {
        if (prop.pricePKR < 50000000 || prop.pricePKR > 70000000) return false;
      } else if (filters.priceRange === '1kanal' || filters.priceRange === 'above7') {
        if (prop.pricePKR < 100000000 || prop.pricePKR > 125000000) return false;
      }
      return true;
    });
  }, [filters]);

  const [galleryResetSignal, setGalleryResetSignal] = useState(0);

  const handleShowFullGallery = () => {
    setGalleryResetSignal((prev) => prev + 1);
    const el = document.getElementById('house-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProperties = () => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConsultation = (topic?: string) => {
    setConsultationTopic(topic || '');
    setConsultationModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    if (category === '40+ DHA & Bahria Houses') {
      handleShowFullGallery();
      return;
    }
    setFilters((prev) => ({
      ...prev,
      propertyType: category,
    }));
    scrollToProperties();
  };

  const handleCitySelect = (city: 'Lahore' | 'Islamabad' | 'Karachi') => {
    setFilters((prev) => ({
      ...prev,
      city: city,
    }));
    scrollToProperties();
  };

  const handleRequestViewing = (propertyTitle: string) => {
    setSelectedProperty(null);
    handleOpenConsultation(`Private Viewing for ${propertyTitle}`);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col antialiased selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. Header / Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation('General Advisory')}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'PKR' ? 'USD' : 'PKR'))}
        onShowGallery={handleShowFullGallery}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={scrollToProperties}
          onBookConsultation={() => handleOpenConsultation('Executive Portfolio Tour')}
          onShowGallery={handleShowFullGallery}
        />

        {/* 3. Property Search Interface */}
        <PropertySearch
          filters={filters}
          onFilterChange={setFilters}
          onSearchSubmit={scrollToProperties}
          totalResultsCount={filteredProperties.length}
          onShowGallery={handleShowFullGallery}
        />

        {/* 4. Featured Properties Grid (Hover or Click any house for 3D Drone Aerial Video) */}
        <FeaturedProperties
          properties={filteredProperties}
          onSelectProperty={setSelectedProperty}
          currency={currency}
        />

        {/* Top Featured Housing Societies Gallery (40+ Pictures: 5 Marla, 10 Marla, 1 Kanal in DHA & Bahria Town) */}
        <HouseGallery
          onOpenConsultation={handleOpenConsultation}
          currency={currency}
          resetSignal={galleryResetSignal}
        />

        {/* Interactive 3D Architectural Villa Visualizer & Custom Deal Studio */}
        <Interactive3DVilla
          onBookConsultation={(topic) => handleOpenConsultation(topic)}
        />

        {/* 5. Property Categories (with 3D Drone Aerial Previews) */}
        <PropertyCategories
          onSelectCategory={handleCategorySelect}
          onLaunchDroneTour={(item) => setDroneCinemaItem(item)}
          onShowGallery={handleShowFullGallery}
        />

        {/* 6. Featured Projects (with 3D Drone Aerial Previews) */}
        <FeaturedProjects
          projects={projectsData}
          onConsultProject={(name) => handleOpenConsultation(`Flagship Project: ${name}`)}
          onLaunchDroneTour={(item) => setDroneCinemaItem(item)}
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 9. About Section */}
        <AboutSection onLaunchDroneTour={(item) => setDroneCinemaItem(item)} />

        {/* 10. Services Section */}
        <ServicesSection onOpenConsultation={handleOpenConsultation} />

        {/* 11. Locations Section */}
        <LocationsSection
          onSelectCity={handleCitySelect}
          onLaunchDroneTour={(item) => setDroneCinemaItem(item)}
        />

        {/* Turnkey Construction Cost Calculator (5 Marla, 10 Marla, 1 Kanal) */}
        <ConstructionCalculator
          currency={currency}
          onRequestBOQ={(summary) => handleOpenConsultation(summary)}
        />

        {/* Interactive Wealth & Yield Calculator */}
        <InvestmentCalculator />

        {/* 12. Testimonials Section */}
        <TestimonialsSection />

        {/* 13. Call To Action Section */}
        <CtaSection
          onBookConsultation={() => handleOpenConsultation('Acquisition Advisory')}
          onViewProperties={scrollToProperties}
        />

        {/* 14. Contact Section */}
        <ContactSection initialServiceOrProperty={consultationTopic} />
      </main>

      {/* 15. Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation('Advisory Services')}
        onSelectCategory={handleCategorySelect}
        onSelectCity={handleCitySelect}
        onShowGallery={handleShowFullGallery}
      />

      {/* Property Details Modal / Dedicated View (Opens with Live 3D Drone Aerial Video) */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        currency={currency}
        onRequestViewing={handleRequestViewing}
      />

      {/* Fullscreen 3D Drone Aerial Cinema Modal */}
      <DroneCinemaModal
        item={droneCinemaItem}
        onClose={() => setDroneCinemaItem(null)}
        onBookViewing={(title) => handleOpenConsultation(`Site Visit: ${title}`)}
      />

      {/* Quick Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        presetTopic={consultationTopic}
      />

      {/* Automatic Client Lead Form Modal (Appears automatically on visit with Cancel × and Skip options) */}
      <AutoLeadModal
        isOpen={leadModalOpen}
        onClose={handleCloseLeadModal}
        onSkip={handleCloseLeadModal}
      />

      {/* Floating Quick Lead Inquiry Button (Allows clients to reopen form anytime) */}
      {!leadModalOpen && (
        <button
          onClick={() => setLeadModalOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium text-xs sm:text-sm shadow-xl shadow-black/60 border border-emerald-400/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
          aria-label="Open client lead form"
          title="Submit inquiry to CEO Haji Fayyaz"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
          </span>
          <ClipboardList className="w-4 h-4 text-emerald-200 group-hover:rotate-6 transition-transform" />
          <span className="font-semibold tracking-wide">Inquire with CEO</span>
        </button>
      )}
    </div>
  );
}
