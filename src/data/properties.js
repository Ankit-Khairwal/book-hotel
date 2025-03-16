export const propertyTypes = {
  HOTEL: "hotel",
  VILLA: "villa",
  RESORT: "resort",
  APARTMENT: "apartment",
  BOUTIQUE: "boutique",
  GUESTHOUSE: "guesthouse",
};

export const amenities = {
  WIFI: "wifi",
  POOL: "pool",
  SPA: "spa",
  GYM: "gym",
  RESTAURANT: "restaurant",
  BAR: "bar",
  PARKING: "parking",
  ROOM_SERVICE: "roomService",
  BEACH_ACCESS: "beachAccess",
  MOUNTAIN_VIEW: "mountainView",
  KITCHEN: "kitchen",
  AIR_CONDITIONING: "airConditioning",
  PET_FRIENDLY: "petFriendly",
  FAMILY_FRIENDLY: "familyFriendly",
};

export const properties = [
  {
    id: "luxury-beach-resort",
    name: "Luxury Beach Resort & Spa",
    type: propertyTypes.RESORT,
    location: {
      city: "Maldives",
      country: "Maldives",
      coordinates: { lat: 4.1755, lng: 73.5093 },
    },
    description:
      "Experience ultimate luxury in our overwater villas with private pools and direct ocean access.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    ],
    price: {
      base: 1200,
      currency: "USD",
    },
    rating: 4.9,
    reviews: 458,
    amenities: [
      amenities.POOL,
      amenities.SPA,
      amenities.BEACH_ACCESS,
      amenities.RESTAURANT,
      amenities.WIFI,
      amenities.ROOM_SERVICE,
    ],
    featured: true,
  },
  {
    id: "mountain-view-lodge",
    name: "Alpine Mountain Lodge",
    type: propertyTypes.HOTEL,
    location: {
      city: "Zermatt",
      country: "Switzerland",
      coordinates: { lat: 46.0207, lng: 7.7491 },
    },
    description:
      "Stunning mountain lodge with panoramic views of the Matterhorn and luxury spa facilities.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd",
      "https://images.unsplash.com/photo-1548704806-074b6d4e5e05",
    ],
    price: {
      base: 800,
      currency: "USD",
    },
    rating: 4.8,
    reviews: 325,
    amenities: [
      amenities.MOUNTAIN_VIEW,
      amenities.SPA,
      amenities.RESTAURANT,
      amenities.BAR,
      amenities.WIFI,
    ],
    featured: true,
  },
  {
    id: "tuscany-villa",
    name: "Villa Toscana",
    type: propertyTypes.VILLA,
    location: {
      city: "Florence",
      country: "Italy",
      coordinates: { lat: 43.7696, lng: 11.2558 },
    },
    description:
      "Historic Tuscan villa surrounded by vineyards with private pool and authentic Italian charm.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1542928658-22251e208ac1",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    ],
    price: {
      base: 950,
      currency: "USD",
    },
    rating: 4.7,
    reviews: 189,
    amenities: [
      amenities.POOL,
      amenities.KITCHEN,
      amenities.WIFI,
      amenities.PARKING,
      amenities.AIR_CONDITIONING,
    ],
    featured: true,
  },
  {
    id: "santorini-boutique",
    name: "Santorini Grace",
    type: propertyTypes.BOUTIQUE,
    location: {
      city: "Oia",
      country: "Greece",
      coordinates: { lat: 36.4618, lng: 25.3753 },
    },
    description:
      "Exclusive boutique hotel carved into Santorini's caldera with infinity pools and sunset views.",
    images: [
      "https://images.unsplash.com/photo-1570213489059-0aac6626cade",
      "https://images.unsplash.com/photo-1455587734955-081b22074882",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f",
    ],
    price: {
      base: 1100,
      currency: "USD",
    },
    rating: 4.9,
    reviews: 276,
    amenities: [
      amenities.POOL,
      amenities.SPA,
      amenities.RESTAURANT,
      amenities.BAR,
      amenities.WIFI,
    ],
    featured: true,
  },
  {
    id: "bali-villa-retreat",
    name: "Ubud Villa Retreat",
    type: propertyTypes.VILLA,
    location: {
      city: "Ubud",
      country: "Indonesia",
      coordinates: { lat: -8.5069, lng: 115.2625 },
    },
    description:
      "Secluded luxury villa in the heart of Bali's cultural center with private pool and rice field views.",
    images: [
      "https://images.unsplash.com/photo-1582610116397-edb318620e96",
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f",
      "https://images.unsplash.com/photo-1545579133-99bb5ab189bd",
    ],
    price: {
      base: 450,
      currency: "USD",
    },
    rating: 4.8,
    reviews: 234,
    amenities: [
      amenities.POOL,
      amenities.SPA,
      amenities.WIFI,
      amenities.AIR_CONDITIONING,
      amenities.ROOM_SERVICE,
    ],
    featured: true,
  },
  {
    id: "dubai-luxury-resort",
    name: "Palm Jumeirah Resort",
    type: propertyTypes.RESORT,
    location: {
      city: "Dubai",
      country: "UAE",
      coordinates: { lat: 25.1124, lng: 55.139 },
    },
    description:
      "Opulent beachfront resort with spectacular views of the Arabian Gulf and Dubai skyline.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    ],
    price: {
      base: 1500,
      currency: "USD",
    },
    rating: 4.9,
    reviews: 512,
    amenities: [
      amenities.POOL,
      amenities.SPA,
      amenities.GYM,
      amenities.BEACH_ACCESS,
      amenities.RESTAURANT,
      amenities.BAR,
    ],
    featured: true,
  },
  {
    id: "kyoto-ryokan",
    name: "Traditional Kyoto Ryokan",
    type: propertyTypes.GUESTHOUSE,
    location: {
      city: "Kyoto",
      country: "Japan",
      coordinates: { lat: 35.0116, lng: 135.7681 },
    },
    description:
      "Authentic Japanese ryokan with traditional gardens, onsen baths, and tea ceremony experiences.",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
      "https://images.unsplash.com/photo-1553653924-39b70295f8da",
    ],
    price: {
      base: 400,
      currency: "USD",
    },
    rating: 4.7,
    reviews: 189,
    amenities: [
      amenities.WIFI,
      amenities.AIR_CONDITIONING,
      amenities.RESTAURANT,
    ],
    featured: false,
  },
  {
    id: "paris-luxury-apartment",
    name: "Champs-Élysées Luxury Apartment",
    type: propertyTypes.APARTMENT,
    location: {
      city: "Paris",
      country: "France",
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    description:
      "Elegant Parisian apartment with stunning Eiffel Tower views and classic French architecture.",
    images: [
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14",
      "https://images.unsplash.com/photo-1551105378-78e609e1d468",
      "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7",
    ],
    price: {
      base: 750,
      currency: "USD",
    },
    rating: 4.6,
    reviews: 156,
    amenities: [
      amenities.WIFI,
      amenities.KITCHEN,
      amenities.AIR_CONDITIONING,
      amenities.PARKING,
    ],
    featured: true,
  },
  {
    id: "african-safari-lodge",
    name: "Serengeti Safari Lodge",
    type: propertyTypes.RESORT,
    location: {
      city: "Serengeti",
      country: "Tanzania",
      coordinates: { lat: -2.3333, lng: 34.8333 },
    },
    description:
      "Luxury tented camp in the heart of the Serengeti with private game drives and bush dining.",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      "https://images.unsplash.com/photo-1553653924-39b70295f8da",
    ],
    price: {
      base: 1800,
      currency: "USD",
    },
    rating: 4.9,
    reviews: 145,
    amenities: [
      amenities.POOL,
      amenities.RESTAURANT,
      amenities.WIFI,
      amenities.AIR_CONDITIONING,
    ],
    featured: true,
  },
  {
    id: "iceland-eco-lodge",
    name: "Northern Lights Eco Lodge",
    type: propertyTypes.BOUTIQUE,
    location: {
      city: "Reykjavik",
      country: "Iceland",
      coordinates: { lat: 64.147, lng: -21.9408 },
    },
    description:
      "Sustainable eco-lodge with glass roof for aurora viewing and geothermal hot springs.",
    images: [
      "https://images.unsplash.com/photo-1520681279154-51b3fb4ea0f0",
      "https://images.unsplash.com/photo-1517823382935-7c809c684223",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    ],
    price: {
      base: 900,
      currency: "USD",
    },
    rating: 4.8,
    reviews: 203,
    amenities: [
      amenities.WIFI,
      amenities.RESTAURANT,
      amenities.BAR,
      amenities.MOUNTAIN_VIEW,
    ],
    featured: true,
  },
];

export const getPropertyById = (id) => {
  return properties.find((property) => property.id === id);
};

export const getPropertiesByType = (type) => {
  return properties.filter((property) => property.type === type);
};

export const getFeaturedProperties = () => {
  return properties.filter((property) => property.featured);
};

export const searchProperties = (query) => {
  const searchTerm = query.toLowerCase();
  return properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm) ||
      property.location.city.toLowerCase().includes(searchTerm) ||
      property.location.country.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm)
  );
};

export const filterPropertiesByAmenities = (amenitiesList) => {
  return properties.filter((property) =>
    amenitiesList.every((amenity) => property.amenities.includes(amenity))
  );
};
