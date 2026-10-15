export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  city: 'Lahore' | 'Islamabad' | 'Karachi';
  pricePKR: number; // in PKR
  priceDisplay: string; // e.g., "PKR 8.5 Crore"
  propertyType:
    | '5 Marla Houses'
    | '10 Marla Houses'
    | '1 Kanal Houses'
    | 'Houses'
    | 'Luxury Villas'
    | 'Apartments'
    | 'Commercial'
    | 'Plots'
    | 'Investment Properties'
    | string;
  purpose: 'Buy' | 'Rent' | 'Invest';
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g., "1 Kanal", "2 Kanal", "500 Sq Yds"
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: string[];
  amenities: string[];
  yearBuilt: number;
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    avatar?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  location: string;
  city: 'Lahore' | 'Islamabad' | 'Karachi';
  propertyType: string;
  startingPrice: string;
  completionDate: string;
  image: string;
  shortDescription: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  icon: string;
  features: string[];
}

export interface LocationItem {
  city: 'Lahore' | 'Islamabad' | 'Karachi';
  tagline: string;
  description: string;
  image: string;
  primeAreas: string[];
  activeListings: number;
  avgYield: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  profession: string;
  city: string;
  review: string;
  propertyPurchased: string;
}

export interface FilterState {
  city: string;
  propertyType: string;
  purpose: string;
  priceRange: string;
  bedrooms: string;
  searchQuery: string;
}
