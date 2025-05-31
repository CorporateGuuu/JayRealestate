// Dubai Real Estate Database for JAY Real Estate
// Comprehensive off-plan development projects from reputable Dubai developers

export interface Property {
  id: number;
  projectName: string;
  developer: string;
  location: string;
  area: string;
  propertyTypes: string[];
  bedrooms: string[];
  amenities: string[];
  keyFeatures: string[];
  completionDate: string;
  image: string;
  featured: boolean;
  description: string;
  metroConnectivity?: string;
  nearbyLandmarks: string[];
}

export interface Developer {
  id: number;
  name: string;
  description: string;
  projects: string[];
}

export interface Location {
  id: number;
  name: string;
  area: string;
  description: string;
  landmarks: string[];
  metroStations?: string[];
}

// Dubai Developers Database
export const developers: Developer[] = [
  {
    id: 1,
    name: "Emaar Properties",
    description: "Leading real estate developer in Dubai",
    projects: ["Dubai Creek Harbour", "Downtown Dubai", "Dubai Hills Estate", "Emaar Beachfront"]
  },
  {
    id: 2,
    name: "DAMAC Properties",
    description: "Luxury real estate developer",
    projects: ["DAMAC Hills", "Business Bay", "DAMAC Lagoons", "DAMAC Bay"]
  },
  {
    id: 3,
    name: "Sobha Realty",
    description: "Premium residential developer",
    projects: ["Sobha Hartland", "MBR City", "Sobha One", "Sobha Creek Vistas"]
  },
  {
    id: 4,
    name: "Nakheel",
    description: "Master developer of iconic projects",
    projects: ["Palm Jumeirah", "Dubai Islands", "The World", "Dragon City"]
  },
  {
    id: 5,
    name: "Dubai Properties",
    description: "Government-backed developer",
    projects: ["Jumeirah Beach Residence", "Business Bay", "Marsa Al Arab", "1/JBR"]
  }
];

// Dubai Locations Database
export const locations: Location[] = [
  {
    id: 1,
    name: "Downtown Dubai",
    area: "Central Dubai",
    description: "The heart of modern Dubai",
    landmarks: ["Burj Khalifa", "Dubai Mall", "Dubai Fountain"],
    metroStations: ["Burj Khalifa/Dubai Mall", "Financial Centre"]
  },
  {
    id: 2,
    name: "Dubai Marina",
    area: "New Dubai",
    description: "Waterfront living with marina views",
    landmarks: ["Marina Walk", "JBR Beach", "Ain Dubai"],
    metroStations: ["DMCC", "Dubai Marina"]
  },
  {
    id: 3,
    name: "Palm Jumeirah",
    area: "Artificial Island",
    description: "Iconic palm-shaped island",
    landmarks: ["Atlantis The Palm", "Pointe", "Nakheel Mall"],
    metroStations: ["Palm Jumeirah Monorail"]
  },
  {
    id: 4,
    name: "Business Bay",
    area: "Central Dubai",
    description: "Dubai's business district",
    landmarks: ["Dubai Canal", "Business Bay Bridge"],
    metroStations: ["Business Bay"]
  },
  {
    id: 5,
    name: "Jumeirah Beach Residence",
    area: "New Dubai",
    description: "Beachfront community",
    landmarks: ["The Beach", "JBR Walk", "Bluewaters Island"],
    metroStations: ["Dubai Marina"]
  },
  {
    id: 6,
    name: "Dubai Hills Estate",
    area: "Mohammed Bin Rashid City",
    description: "Family-friendly community",
    landmarks: ["Dubai Hills Mall", "Dubai Hills Golf Club"],
    metroStations: ["Planned Metro Extension"]
  },
  {
    id: 7,
    name: "Arabian Ranches",
    area: "Dubailand",
    description: "Golf course community",
    landmarks: ["Arabian Ranches Golf Club", "Dubai Polo & Equestrian Club"],
    metroStations: ["Planned Metro Extension"]
  },
  {
    id: 8,
    name: "Dubai Creek Harbour",
    area: "Central Dubai",
    description: "Waterfront development",
    landmarks: ["Dubai Creek Tower", "Creek Beach"],
    metroStations: ["Creek Harbour (Under Construction)"]
  }
];

// Off-Plan Properties Database
export const properties: Property[] = [
  {
    id: 1,
    projectName: "Creek Gate",
    developer: "Emaar Properties",
    location: "Dubai Creek Harbour",
    area: "Central Dubai",
    propertyTypes: ["Apartment", "Penthouse"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom"],
    amenities: ["Swimming Pool", "Gym", "Kids Play Area", "BBQ Area", "Retail Outlets"],
    keyFeatures: ["Creek views", "Smart home technology", "Premium finishes", "24/7 security"],
    completionDate: "Q4 2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    description: "Modern waterfront living with stunning Dubai Creek views and world-class amenities.",
    metroConnectivity: "Creek Harbour Station (Under Construction)",
    nearbyLandmarks: ["Dubai Creek Tower", "Creek Beach", "Dubai Festival City"]
  },
  {
    id: 2,
    projectName: "DAMAC Bay by Cavalli",
    developer: "DAMAC Properties",
    location: "Dubai Marina",
    area: "New Dubai",
    propertyTypes: ["Apartment", "Penthouse"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom"],
    amenities: ["Infinity Pool", "Spa", "Fitness Center", "Concierge Service", "Valet Parking"],
    keyFeatures: ["Marina views", "Cavalli-designed interiors", "Premium location", "Luxury finishes"],
    completionDate: "Q2 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    description: "Luxury waterfront living designed by Roberto Cavalli in the heart of Dubai Marina.",
    metroConnectivity: "Dubai Marina Metro Station",
    nearbyLandmarks: ["Marina Walk", "JBR Beach", "Ain Dubai"]
  },
  {
    id: 3,
    projectName: "Sobha One",
    developer: "Sobha Realty",
    location: "Sobha Hartland",
    area: "Mohammed Bin Rashid City",
    propertyTypes: ["Apartment", "Duplex", "Penthouse"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom"],
    amenities: ["Golf Course Views", "Swimming Pool", "Tennis Court", "Jogging Track", "Kids Area"],
    keyFeatures: ["Green spaces", "Premium finishes", "Smart home features", "Golf course access"],
    completionDate: "Q1 2026",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    description: "Elegant tower offering panoramic views of Dubai's skyline and lush green landscapes.",
    metroConnectivity: "Healthcare City Metro Station",
    nearbyLandmarks: ["Ras Al Khor Wildlife Sanctuary", "Dubai Creek", "Meydan Racecourse"]
  },
  {
    id: 4,
    projectName: "Palm Beach Towers",
    developer: "Nakheel",
    location: "Palm Jumeirah",
    area: "Artificial Island",
    propertyTypes: ["Apartment", "Penthouse"],
    bedrooms: ["2 Bedroom", "3 Bedroom", "4 Bedroom"],
    amenities: ["Private Beach", "Swimming Pool", "Gym", "Spa", "Retail Plaza"],
    keyFeatures: ["Beach access", "Sea views", "Resort-style living", "Premium location"],
    completionDate: "Q3 2025",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    description: "Exclusive beachfront living on the iconic Palm Jumeirah with unparalleled luxury.",
    metroConnectivity: "Palm Jumeirah Monorail",
    nearbyLandmarks: ["Atlantis The Palm", "The Pointe", "Nakheel Mall"]
  },
  {
    id: 5,
    projectName: "1/JBR",
    developer: "Dubai Properties",
    location: "Jumeirah Beach Residence",
    area: "New Dubai",
    propertyTypes: ["Apartment", "Penthouse"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom"],
    amenities: ["Beach Access", "Swimming Pool", "Gym", "Retail Outlets", "Restaurants"],
    keyFeatures: ["Beachfront location", "Sea views", "Walking distance to attractions", "Modern design"],
    completionDate: "Q4 2025",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    description: "Contemporary beachfront living in the vibrant JBR community with direct beach access.",
    metroConnectivity: "Dubai Marina Metro Station",
    nearbyLandmarks: ["JBR Walk", "The Beach", "Bluewaters Island"]
  },
  {
    id: 6,
    projectName: "Dubai Hills Vista",
    developer: "Emaar Properties",
    location: "Dubai Hills Estate",
    area: "Mohammed Bin Rashid City",
    propertyTypes: ["Apartment", "Townhouse"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom"],
    amenities: ["Golf Course", "Swimming Pool", "Parks", "Shopping Mall", "Schools"],
    keyFeatures: ["Family-friendly", "Golf course views", "Green community", "Modern amenities"],
    completionDate: "Q2 2026",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    description: "Family-oriented community with golf course views and comprehensive amenities.",
    metroConnectivity: "Planned Metro Extension",
    nearbyLandmarks: ["Dubai Hills Mall", "Dubai Hills Golf Club", "Central Park"]
  },
  {
    id: 7,
    projectName: "DAMAC Lagoons",
    developer: "DAMAC Properties",
    location: "DAMAC Hills",
    area: "Dubailand",
    propertyTypes: ["Villa", "Townhouse"],
    bedrooms: ["3 Bedroom", "4 Bedroom", "5 Bedroom"],
    amenities: ["Lagoon", "Beach Club", "Water Sports", "Golf Course", "Retail Center"],
    keyFeatures: ["Waterfront living", "Lagoon access", "Resort-style amenities", "Spacious layouts"],
    completionDate: "Q1 2027",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    description: "Unique lagoon community offering waterfront villa living with Mediterranean vibes.",
    metroConnectivity: "Planned Metro Extension",
    nearbyLandmarks: ["DAMAC Hills Golf Club", "Trump International Golf Club"]
  },
  {
    id: 8,
    projectName: "Creek Vistas Reserve",
    developer: "Sobha Realty",
    location: "Sobha Hartland",
    area: "Mohammed Bin Rashid City",
    propertyTypes: ["Apartment", "Duplex"],
    bedrooms: ["1 Bedroom", "2 Bedroom", "3 Bedroom"],
    amenities: ["Creek Views", "Swimming Pool", "Gym", "Landscaped Gardens", "Retail Outlets"],
    keyFeatures: ["Creek frontage", "Green spaces", "Premium finishes", "Waterfront promenade"],
    completionDate: "Q3 2026",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    description: "Serene waterfront living with direct access to Dubai Creek and lush green spaces.",
    metroConnectivity: "Healthcare City Metro Station",
    nearbyLandmarks: ["Dubai Creek", "Ras Al Khor Wildlife Sanctuary", "Design District"]
  }
];

// Search suggestions data
export const searchSuggestions = {
  areas: [
    "Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", 
    "Jumeirah Beach Residence", "Dubai Hills Estate", "Arabian Ranches", 
    "Dubai Creek Harbour", "Sobha Hartland", "DAMAC Hills", "Emirates Hills",
    "Dubai International Financial Centre", "Mohammed Bin Rashid City"
  ],
  propertyTypes: [
    "Apartment", "Villa", "Townhouse", "Penthouse", "Studio", "Duplex"
  ],
  developers: [
    "Emaar Properties", "DAMAC Properties", "Sobha Realty", "Nakheel", "Dubai Properties"
  ],
  amenities: [
    "Swimming Pool", "Gym", "Beach Access", "Golf Course", "Metro Connectivity",
    "Shopping Mall", "Schools", "Parks", "Spa", "Tennis Court"
  ]
};
