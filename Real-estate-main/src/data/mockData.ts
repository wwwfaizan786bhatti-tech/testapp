import { Property, Project, ServiceItem, LocationItem, Testimonial } from '../types';

import dhaModernHouseImg from '../assets/images/dha_modern_house_1791956638176.jpg';
import bahriaModernHouseImg from '../assets/images/bahria_modern_house_1791956638668.jpg';
import dhaFiveMarlaImg from '../assets/images/dha_five_marla_house_1791956639420.jpg';
import bahriaProjectImg from '../assets/images/bahria_project_development_1791956639086.jpg';
import dhaOneKanalImg from '../assets/images/dha_one_kanal_residence_1791956639531.jpg';

// Backward compatibility exports mapped to authentic DHA & Bahria Town Pakistani images
export const heroImg = dhaModernHouseImg;
export const showcaseImg = dhaOneKanalImg;
export const lahoreVillaImg = bahriaModernHouseImg;
export const islamabadVillaImg = dhaFiveMarlaImg;
export const karachiPenthouseImg = bahriaProjectImg;

export {
  dhaModernHouseImg,
  bahriaModernHouseImg,
  dhaFiveMarlaImg,
  bahriaProjectImg,
  dhaOneKanalImg,
};

export const propertiesData: Property[] = [
  {
    id: 'prop-1',
    title: '5 Marla Modern Spanish Elevation House',
    slug: '5-marla-modern-spanish-house-bahria-town-lahore',
    location: 'Bahria Town Lahore, Sector C (Near Grand Jamia Mosque)',
    city: 'Lahore',
    pricePKR: 36500000,
    priceDisplay: 'PKR 3.65 Crore',
    propertyType: '5 Marla Houses',
    purpose: 'Buy',
    bedrooms: 3,
    bathrooms: 4,
    area: '5 Marla (1,125 Sq Ft)',
    featured: true,
    shortDescription: 'Brand new 5 Marla double-storey Spanish elevation house with car porch, designer fall ceilings, and imported Spanish bathroom tiles.',
    fullDescription: 'Located in the prime Sector C of Bahria Town Lahore within walking distance of the Grand Jamia Mosque, this 5 Marla modern Spanish residence offers turnkey comfort. Features 3 master bedrooms with attached baths, open-concept dirty & show kitchen with Turkish acrylic UV sheets, solid ash wood doors, dedicated car porch, and Bahria 24/7 security with zero load-shedding.',
    images: [
      lahoreVillaImg,
      heroImg,
      showcaseImg
    ],
    features: [
      'Authentic Spanish Terracotta Roof Accents',
      'Double Storey Layout with Independent Option',
      'Spanish Porcelain 60x120 Floor Tiles',
      'Imported Turkish Kitchen with UV Acrylic Cabinets',
      'Solid Ash Wood Doors & Tempered Glass Balcony',
      'Dedicated Car Porch for SUV',
      'Servant / Storage Quarter on Roof',
      'Zero Load-Shedding Bahria Power Grid'
    ],
    amenities: [
      '24/7 Gated Security & Rapid Response Unit',
      'Dedicated Car Porch',
      'Community Park & Grand Jamia Mosque Nearby',
      'Underground Electricity & Fiber Optic Internet',
      'Solar Geyser Piping Ready',
      'Water Filtration Plant Access'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0308 4476211',
      whatsapp: '923084476211',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-2',
    title: '5 Marla Ultra-Modern Designer House',
    slug: '5-marla-ultra-modern-designer-house-dha-phase-9-lahore',
    location: 'DHA Phase 9 Prism, Sector C, Lahore',
    city: 'Lahore',
    pricePKR: 38500000,
    priceDisplay: 'PKR 3.85 Crore',
    propertyType: '5 Marla Houses',
    purpose: 'Buy',
    bedrooms: 3,
    bathrooms: 4,
    area: '5 Marla (1,125 Sq Ft)',
    featured: true,
    shortDescription: 'Modern cubist double-storey house in DHA Phase 9 Prism with double glazed front glass, LED profile lights, and Grohe fittings.',
    fullDescription: 'A bespoke 5 Marla designer home in DHA Phase 9 Prism Lahore. Built with A-plus grade bricks, steel, and fittings. Features an open-plan living and dining space, double-height staircase with floating wooden treads, Italian quartz kitchen island, 3 en-suite bedrooms, and rooftop patio.',
    images: [
      heroImg,
      lahoreVillaImg,
      islamabadVillaImg
    ],
    features: [
      'Modern Cubist Front Elevation with Textured Stone',
      'Grohe Sanitary Ware & Rain Showers',
      'Double Glazed Aluminum Glass Windows',
      'Solar Net-Metering Ready (5kW)',
      'Designer LED Profile Ambience Lighting',
      'Rooftop BBQ Sitting & Viewing Terrace'
    ],
    amenities: [
      'DHA Phase 9 Prism Gated Perimeter',
      'Underground Infrastructure & Green Belts',
      'Car Porch with Heavy Duty Granite Flooring',
      'DHA Security Patrol 24/7',
      'High-Speed Internet Ready'
    ],
    yearBuilt: 2025,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0305 4911007',
      whatsapp: '923054911007',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-3',
    title: '10 Marla Contemporary Corner House',
    slug: '10-marla-contemporary-corner-house-dha-phase-6-lahore',
    location: 'DHA Phase 6, Sector J, Lahore',
    city: 'Lahore',
    pricePKR: 66500000,
    priceDisplay: 'PKR 6.65 Crore',
    propertyType: '10 Marla Houses',
    purpose: 'Buy',
    bedrooms: 5,
    bathrooms: 6,
    area: '10 Marla (2,250 Sq Ft)',
    featured: true,
    shortDescription: 'Prime corner 10 Marla house with double frontage, dual car porches, 5 master suites, and double unit flexibility.',
    fullDescription: 'Prime 10 Marla corner plot house in DHA Phase 6 Sector J Lahore. Designed for elevated modern living with warm exterior stone accents, dual TV lounges, dirty & main display kitchens, 5 spacious bedrooms with imported sanitary fittings, and separate servant quarter. Walking distance to sector commercial and DHA Raya perimeter.',
    images: [
      showcaseImg,
      lahoreVillaImg,
      heroImg
    ],
    features: [
      'Prime Corner Plot with Dual Street Frontage',
      'Dual Car Porch (Fits 2 Large SUVs + 2 Sedans)',
      '5 Master Bedrooms with Attached Spanish Baths',
      'Imported Italian Quartz Countertops',
      'Solid Deodar Woodwork & Architectural Louvers',
      'Double Unit Configuration (Separate Upper Unit Entry)',
      '10kW Solar Inverter & Battery Setup Ready'
    ],
    amenities: [
      'Wide Corner Green Belt',
      'DHA Phase 6 24/7 Armed Patrol',
      'Commercial Sector & Parks within 200m',
      'CCTV Camera Security Pre-Wired',
      'High-Capacity Water Filtration'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0308 4476211',
      whatsapp: '923084476211',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-4',
    title: '10 Marla Spanish Villa & Terrace Garden',
    slug: '10-marla-spanish-villa-bahria-town-phase-7-islamabad',
    location: 'Bahria Town Phase 7 (Near River View), Islamabad / Rawalpindi',
    city: 'Islamabad',
    pricePKR: 54000000,
    priceDisplay: 'PKR 5.40 Crore',
    propertyType: '10 Marla Houses',
    purpose: 'Buy',
    bedrooms: 5,
    bathrooms: 6,
    area: '10 Marla (2,250 Sq Ft)',
    featured: true,
    shortDescription: 'Magnificent 10 Marla Spanish facade with terracotta tile roofing, imported bathroom fixtures, spacious terrace garden, and mountain views.',
    fullDescription: 'Nestled in Bahria Town Phase 7 along scenic riverfront avenues, this 10 Marla Spanish house combines traditional elegance with modern comfort. Features arched porticos, front lawn, 2 family lounges, 5 master bedrooms, rooftop gazebo with mountain vistas, and independent servant quarters.',
    images: [
      islamabadVillaImg,
      showcaseImg,
      heroImg
    ],
    features: [
      'Spanish Arch Elevation with Terracotta Trim',
      'Spacious Front Lawn & Side Passage',
      '2 Full Designer Kitchens with Imported Hoods',
      'Jacuzzi Tub in Master Bathroom Suite',
      'Scenic Terrace Garden Overlooking Foothills',
      'Solar Water Heating System Installed'
    ],
    amenities: [
      'Bahria Phase 7 Gated Security & Surveillance',
      '2-Car Covered Porch',
      'River View Promenade Nearby',
      'Uninterrupted Civic Amenities (Gas/Water/Power)',
      'Nearby International Schools'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0305 4911007',
      whatsapp: '923054911007',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-5',
    title: '1 Kanal Executive Modern Residence',
    slug: '1-kanal-executive-modern-residence-dha-phase-5-lahore',
    location: 'DHA Phase 5, Sector C, Lahore',
    city: 'Lahore',
    pricePKR: 118000000,
    priceDisplay: 'PKR 11.80 Crore',
    propertyType: '1 Kanal Houses',
    purpose: 'Buy',
    bedrooms: 5,
    bathrooms: 6,
    area: '1 Kanal (4,500 Sq Ft)',
    featured: true,
    shortDescription: 'Statement 1 Kanal home in prime DHA Phase 5 with double-height glass facade, lush front lawn, imported travertine marble, and smart automation.',
    fullDescription: 'Commanding a prestigious address in DHA Phase 5 Lahore, this 1 Kanal contemporary masterpiece features 24-foot double-height foyer ceilings, imported Turkish travertine exterior, 5 palatial bedroom suites with walk-in closets, heated plunge pool in courtyard, basement home theater room, and 4-vehicle motor court.',
    images: [
      lahoreVillaImg,
      heroImg,
      showcaseImg
    ],
    features: [
      'Double Height 24ft Entrance Foyer with Chandelier',
      'Turkish Travertine Stone Exterior Cladding',
      'Italian Valcucine Kitchen with German Appliances',
      'Private Heated Courtyard Plunge Pool',
      'Dedicated Basement Home Theatre & Lounge',
      '4-Car Covered Motor Porch',
      '15kW Solar Hybrid Power System with Batteries'
    ],
    amenities: [
      'Prime DHA Phase 5 Boulevard Access',
      'Full Smart Home Lighting & Climate Controls',
      'Independent 2-Bed Staff Wing with Separate Staircase',
      'Automated Garage Gate & Video Intercom',
      'Lush Landscaped Lawn with Irrigation Sprinklers'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0308 4476211',
      whatsapp: '923084476211',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-6',
    title: '1 Kanal Royal Spanish Palace Residence',
    slug: '1-kanal-royal-spanish-palace-bahria-town-lahore',
    location: 'Bahria Town Lahore, Sector B (Near Safari Villas)',
    city: 'Lahore',
    pricePKR: 107500000,
    priceDisplay: 'PKR 10.75 Crore',
    propertyType: '1 Kanal Houses',
    purpose: 'Buy',
    bedrooms: 6,
    bathrooms: 7,
    area: '1 Kanal (4,500 Sq Ft)',
    featured: true,
    shortDescription: 'Spectacular 1 Kanal Spanish residence featuring hand-carved pillars, dual master suites with jacuzzi baths, and manicured landscaping.',
    fullDescription: 'A trophy 1 Kanal Spanish residence in Bahria Town Lahore Sector B. Features authentic Spanish tiles, wrought iron spiral railings, large front lawn with gazebo fountain, 6 massive bedrooms with attached baths, two drawing rooms, spacious dining hall, and rooftop terrace.',
    images: [
      showcaseImg,
      lahoreVillaImg,
      heroImg
    ],
    features: [
      'Authentic Hand-Carved Spanish Archways & Pillars',
      'Expansive Manicured Front Lawn with Stone Gazebo',
      'Dual Master Suites with Jacuzzi Showers',
      '2 Full Sized Designer Kitchens + Butler Pantry',
      'Solid Teak & Deodar Hand-Finished Woodwork',
      '3-4 Car Covered Parking Porch'
    ],
    amenities: [
      'Bahria Town Sector B Gated Security',
      'Zero Load-Shedding Bahria Power Network',
      'Walking Distance to Commercial & Safari Club',
      'Full CCTV Surveillance System Installed',
      'Dual Independent Servant Quarters'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0305 4911007',
      whatsapp: '923054911007',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-7',
    title: '10 Marla Modern Double Unit House',
    slug: '10-marla-modern-double-unit-dha-phase-2-islamabad',
    location: 'DHA Phase 2, Sector B, Islamabad',
    city: 'Islamabad',
    pricePKR: 61500000,
    priceDisplay: 'PKR 6.15 Crore',
    propertyType: '10 Marla Houses',
    purpose: 'Buy',
    bedrooms: 5,
    bathrooms: 6,
    area: '10 Marla (2,250 Sq Ft)',
    featured: true,
    shortDescription: 'Solid-built 10 Marla double-storey house in DHA Phase 2 Islamabad close to Giga Mall and central commercial.',
    fullDescription: 'Centrally located in DHA Phase 2 Islamabad, this 10 Marla double-unit house is ideal for families seeking convenience and high rental potential. Features 5 bedrooms with attached baths, 2 imported kitchens, marble flooring, 2-car porch, and rooftop pergola overlooking the Margalla silhouette.',
    images: [
      islamabadVillaImg,
      heroImg,
      showcaseImg
    ],
    features: [
      'Double Unit Layout with Separate Electricity Meters',
      'Solid Ash Wood Doors & Italian Porcelain Tiles',
      'Solar Net-Metering Installed (10kW)',
      '2-Car Covered Porch with Electric Gate',
      'Separate Servant Room with Washroom'
    ],
    amenities: [
      'Direct Access to GT Road & Islamabad Expressway',
      'DHA Phase 2 24/7 Security & Patrol',
      'Near Giga Mall, Parks & International Schools',
      'Underground Fiber Optic Internet'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0308 4476211',
      whatsapp: '923084476211',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  },
  {
    id: 'prop-8',
    title: '5 Marla Solid Built House in Safari Valley',
    slug: '5-marla-solid-house-bahria-safari-valley-rawalpindi',
    location: 'Bahria Safari Valley, Sector Rafi, Rawalpindi / Islamabad',
    city: 'Islamabad',
    pricePKR: 35000000,
    priceDisplay: 'PKR 3.50 Crore',
    propertyType: '5 Marla Houses',
    purpose: 'Buy',
    bedrooms: 3,
    bathrooms: 4,
    area: '5 Marla (1,125 Sq Ft)',
    featured: true,
    shortDescription: 'Well-built 5 Marla home with smart interior layout, solid wood doors, energy-efficient LED fixtures, and commercial access.',
    fullDescription: 'Affordable modern living in Bahria Safari Valley. Brand new 5 Marla double-storey house with open kitchen, 3 en-suite bedrooms, TV lounge, car porch, and balcony sitting area. Clean title, inspected and verified by Bhatti Real Estate (CEO Haji Fayyaz).',
    images: [
      heroImg,
      lahoreVillaImg,
      islamabadVillaImg
    ],
    features: [
      'Solid A-Grade Red Brick Construction',
      'Modern False Ceilings with Warm Concealed Lighting',
      'UV Acrylic Kitchen Cabinets with Quartz Counter',
      'Car Porch for Sedan or Compact SUV',
      'Ready for Immediate Possession'
    ],
    amenities: [
      'Gated Sector with Guard Posts',
      'Bahria Safari Park & Hospital Nearby',
      'Continuous Electricity, Gas & Water Supply',
      'High Return on Investment (Rent Ready)'
    ],
    yearBuilt: 2024,
    agent: {
      name: 'Haji Fayyaz',
      phone: '0305 4911007',
      whatsapp: '923054911007',
      email: 'hajifayyaz@bhattirealestate.com'
    }
  }
];

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    name: 'DHA Phase 9 Prism Modern Living Project',
    location: 'DHA Phase 9 Prism, Main Boulevard, Lahore',
    city: 'Lahore',
    propertyType: '5 Marla & 10 Marla Modern Double-Storey Homes',
    startingPrice: 'Starting PKR 3.60 Crore',
    completionDate: 'Possession Ready 2024 - 2025',
    image: dhaFiveMarlaImg,
    shortDescription: 'Flagship residential sector developed by DHA Lahore, featuring wide 150ft boulevards, underground electrification, modern family homes, and commercial civic centres.',
    highlights: [
      'Authentic DHA Lahore Allotment & Clean Verified Deeds',
      'Underground Electrification, Fiber Optics & Sui Gas Network',
      'Sector Parks, DHA Commercial Zone & Civic Centre',
      'Direct Deal Finalization with CEO Haji Fayyaz'
    ]
  },
  {
    id: 'proj-2',
    name: 'Bahria Town Executive Avenue & Jasmine Residences',
    location: 'Sector C & Jasmine Block, Bahria Town Lahore',
    city: 'Lahore',
    propertyType: '10 Marla & 1 Kanal Modern Designer Houses',
    startingPrice: 'Starting PKR 5.45 Crore',
    completionDate: 'Ready for Immediate Possession & Living',
    image: bahriaProjectImg,
    shortDescription: 'Prestigious family residential community close to Grand Jamia Mosque and Eiffel Tower replica, with lush green avenues, gated security, and uninterrupted Bahria power.',
    highlights: [
      'Walking Distance to Grand Jamia Mosque & Commercial Sector',
      'Zero Load-Shedding Independent Bahria Grid Supply',
      'Modern Spanish & Contemporary Double-Storey Elevations',
      '24/7 Gated Security & Dedicated Patrolling Squads'
    ]
  },
  {
    id: 'proj-3',
    name: 'DHA Phase 2 & Bahria Safari Master Community',
    location: 'DHA Phase 2 / Bahria Safari Valley, Islamabad & Rawalpindi',
    city: 'Islamabad',
    propertyType: '5 Marla, 10 Marla & 1 Kanal Turnkey Houses',
    startingPrice: 'Starting PKR 3.50 Crore',
    completionDate: '100% Inhabited & Ready Possession',
    image: dhaOneKanalImg,
    shortDescription: 'Master-planned twin-city community with seamless direct connectivity to Islamabad Expressway and GT Road, close to Giga Mall and top educational institutions.',
    highlights: [
      'Direct Access to Islamabad Expressway & GT Road',
      '24/7 Monitored Gated Security with DHA / Bahria Patrols',
      'Modern Architectural Elevations with Double Car Porches',
      'Direct On-Site Consultation with Bhatti Real Estate'
    ]
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Property Buying',
    shortDescription: 'Help clients discover properties matching their requirements.',
    detailedDescription: 'We represent high-net-worth buyers and overseas investors to source off-market luxury residences, verified title deeds, and prime plots across Lahore, Islamabad, and Karachi.',
    icon: 'Key',
    features: ['Off-Market Property Access', 'Comprehensive Title & NOC Vetting', 'Confidential Negotiation Strategy', 'Turnkey Handover Management']
  },
  {
    id: 'srv-2',
    title: 'Property Selling',
    shortDescription: 'Professional presentation and marketing of properties.',
    detailedDescription: 'We engineer bespoke marketing campaigns targeting verified high-income buyers, utilizing 8K architectural videography, private network previews, and international buyer showcases.',
    icon: 'TrendingUp',
    features: ['High-Fidelity Architectural Photography', 'Targeted Executive Investor Reach', 'Discreet Private Showings', 'Legal Documentation Closure']
  },
  {
    id: 'srv-3',
    title: 'Property Investment',
    shortDescription: 'Property research and investment guidance.',
    detailedDescription: 'Data-driven capital allocation in high-growth corridors of Pakistan. We identify pre-launch opportunities, commercial yields (8-11% net), and long-term land bank appreciation.',
    icon: 'BarChart3',
    features: ['Capital Growth Modeling', 'Rental Yield Optimization', 'Macroeconomic Corridor Analysis', 'Portfolio Diversification Advisory']
  },
  {
    id: 'srv-4',
    title: 'Property Consultation',
    shortDescription: 'Personalized assistance for property decisions.',
    detailedDescription: 'One-on-one strategic advisory for corporate leaders, expatriates, and legacy families navigating Pakistani property regulations, tax structures, and generational wealth planning.',
    icon: 'Compass',
    features: ['Overseas Pakistani Remittance Structuring', 'Tax & FBR Regulatory Guidance', 'Bespoke Architectural Feasibility', 'Family Trust Asset Structuring']
  },
  {
    id: 'srv-5',
    title: 'Project Marketing',
    shortDescription: 'Professional marketing for real estate projects.',
    detailedDescription: 'End-to-end sales and marketing infrastructure for premier developers. From brand identity and showroom design to digital lead generation and overseas roadshows.',
    icon: 'Megaphone',
    features: ['Master Brand Positioning', 'High-Converting Sales Pavilions', 'International Diaspora Roadshows', 'CRM Sales Velocity Optimization']
  },
  {
    id: 'srv-6',
    title: 'Property Management',
    shortDescription: 'Professional support for property owners.',
    detailedDescription: 'Complete asset preservation for busy executives and overseas owners. We manage corporate tenant screening, maintenance supervision, rent collection, and annual asset health audits.',
    icon: 'ShieldCheck',
    features: ['Corporate & Multinational Tenant Placement', 'Bi-Monthly Asset Inspection Reports', '24/7 Emergency Maintenance Dispatch', 'Transparent Online Financial Ledgers']
  }
];

export const locationsData: LocationItem[] = [
  {
    city: 'Lahore',
    tagline: 'The Cultural & Architectural Heart of Pakistan',
    description: 'Home to the country’s most vibrant luxury lifestyle communities. From the contemporary architectural marvels of DHA Phase 6 and 8 to the bustling commercial corridors of Gulberg III.',
    image: lahoreVillaImg,
    primeAreas: ['DHA Phase 6, 7 & 8', 'Gulberg III & Zafar Ali Road', 'Model Town Blocks A & G', 'Askari 10 & 11'],
    activeListings: 142,
    avgYield: '6.8% - 8.2%'
  },
  {
    city: 'Islamabad',
    tagline: 'The Serene Capital & Diplomatic Center',
    description: 'Renowned for world-class urban planning, mountain panoramas, and diplomatic security. Prime sectors offer peerless tranquility, lush green belts, and stable capital appreciation.',
    image: islamabadVillaImg,
    primeAreas: ['Sector E-7 & F-6', 'Sector F-7 & F-8', 'Bahria Golf City', 'Chak Shahzad Farmhouses'],
    activeListings: 98,
    avgYield: '7.2% - 9.1%'
  },
  {
    city: 'Karachi',
    tagline: 'Pakistan’s Financial Capital & Coastal Metropolis',
    description: 'The economic powerhouse of the country. High-end real estate centers on waterfront luxury, iconic skyline duplexes, and prestigious legacy addresses in Clifton and DHA.',
    image: karachiPenthouseImg,
    primeAreas: ['Clifton Blocks 2, 4 & 5', 'DHA Phase 8 & Beach Avenue', 'Creek Vistas & Marina', 'Bath Island'],
    activeListings: 115,
    avgYield: '8.5% - 10.4%'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'M. Tariq Malik',
    profession: 'Managing Founder, Enterprise Technology Group',
    city: 'Lahore',
    review: 'Bhatti Real Estate and CEO Haji Fayyaz handled the acquisition of our DHA Phase 8 villa with total discretion and professionalism. Their verification of ownership documents and direct access to off-market inventory saved us valuable time.',
    propertyPurchased: '1-Kanal Designer Villa, DHA Phase 8'
  },
  {
    id: 'test-2',
    clientName: 'Dr. Zeeshan Abbasi',
    profession: 'Managing Director & Venture Partner',
    city: 'Islamabad',
    review: 'Navigating prime real estate in Sector E-7 requires deep local roots and technical acumen. CEO Haji Fayyaz and the team at Bhatti Real Estate delivered exceptional market insight and transparent negotiation from start to final registry.',
    propertyPurchased: '2-Kanal Margalla Estate, Sector E-7'
  },
  {
    id: 'test-3',
    clientName: 'Ayesha Haroon',
    profession: 'Partner, Private Equity Advisory',
    city: 'Karachi',
    review: 'For an overseas transaction, transparency is paramount. Under the personal supervision of CEO Haji Fayyaz, Bhatti Real Estate facilitated every legal deed, wire verification, and property inspection seamlessly.',
    propertyPurchased: 'Duplex Oceanfront Penthouse, Clifton'
  }
];
