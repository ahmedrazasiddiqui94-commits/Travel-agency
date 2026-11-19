export type ListingCategory = 'hotels' | 'restaurants' | 'spots' | 'resorts';
export type BookingStatus = 'Confirmed' | 'Upcoming' | 'Cancelled';

export interface ListingItem {
  id: string;
  category: ListingCategory;
  name: string;
  location: string;
  price: number;
  priceUnit: string;
  quality: number; // 1-5 stars
  availableFrom: string;
  availableTo: string;
  description: string;
  amenities: string[];
  image: string;
}

export interface TravelPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  summary: string;
  image: string;
}

export interface BookingRecord {
  id: string;
  customerEmail: string;
  customerName: string;
  itemId: string;
  itemName: string;
  category: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  role: 'customer' | 'admin';
}

const IMG_AMALFI = '/src/assets/images/hero_amalfi_villa_1795068049695.jpg';
const IMG_KYOTO = '/src/assets/images/dest_kyoto_ryokan_1795068050439.jpg';
const IMG_PATAGONIA = '/src/assets/images/dest_patagonia_peaks_1795068049621.jpg';
const IMG_ICELAND = '/src/assets/images/dest_iceland_black_sand_1795068049576.jpg';
const IMG_MARRAKECH = '/src/assets/images/dest_marrakech_riad_1795068049314.jpg';

export const BANNER_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'Karnel Travels · 2026–27 Collection',
    title: 'Explore architectural stays, curated resorts, and iconic routes.',
    subtitle: 'Book verified hotels, fine restaurants, scenic tourist spots, and luxury resorts from one unified travel desk.',
    offer: 'Save 15% on Early Winter Packages',
    image: IMG_AMALFI,
  },
  {
    id: 'slide-2',
    kicker: 'Kyoto & East Asia',
    title: 'Serene ryokan sanctuaries and private cultural trails.',
    subtitle: 'Handpicked heritage stays with seamless rail, airport transfer, and local guide coordination.',
    offer: 'Complimentary Airport Chauffeur Included',
    image: IMG_KYOTO,
  },
  {
    id: 'slide-3',
    kicker: 'Patagonia & Alpine Expeditions',
    title: 'High-altitude lodges overlooking glacial valleys.',
    subtitle: 'All-inclusive mountain resorts and guided alpine itineraries built for effortless exploration.',
    offer: 'Flexible Free Cancellation up to 7 Days',
    image: IMG_PATAGONIA,
  },
];

export const INITIAL_LISTINGS: ListingItem[] = [
  // Hotels
  {
    id: 'h-1',
    category: 'hotels',
    name: 'Amalfi Limestone Grand Hotel',
    location: 'Amalfi Coast, Italy',
    price: 420,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-06-30',
    description: 'Cliffside limestone suites with infinity sea terrace, private beach lift, and panoramic breakfast deck.',
    amenities: ['Infinity Pool', 'Sea View', 'Airport Transfer', 'Spa'],
    image: IMG_AMALFI,
  },
  {
    id: 'h-2',
    category: 'hotels',
    name: 'Arashiyama Cedar Ryokan',
    location: 'Kyoto, Japan',
    price: 360,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-08-31',
    description: 'Minimalist cedar pavilions surrounded by moss gardens and private natural hot-spring baths.',
    amenities: ['Private Onsen', 'Moss Garden', 'Kaiseki Dining', 'Concierge'],
    image: IMG_KYOTO,
  },
  {
    id: 'h-3',
    category: 'hotels',
    name: 'Dar Travertine Boutique Hotel',
    location: 'Marrakech, Morocco',
    price: 240,
    priceUnit: 'per night',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-09-30',
    description: 'Restored medina riad with sunlit stone courtyard, dark reflecting pool, and rooftop Atlas views.',
    amenities: ['Courtyard Pool', 'Rooftop Terrace', 'Hammam', 'Breakfast'],
    image: IMG_MARRAKECH,
  },

  // Restaurants
  {
    id: 'r-1',
    category: 'restaurants',
    name: 'Osteria Scogliera',
    location: 'Amalfi Coast, Italy',
    price: 95,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Coastal tasting menu featuring line-caught Mediterranean seafood and organic lemon grove pairings.',
    amenities: ['Cliffside Seating', 'Tasting Menu', 'Sommelier', 'Private Table'],
    image: IMG_AMALFI,
  },
  {
    id: 'r-2',
    category: 'restaurants',
    name: 'Kamo Kaiseki Pavilion',
    location: 'Kyoto, Japan',
    price: 130,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Eight-course seasonal kaiseki prepared over binchotan charcoal overlooking a lantern-lit garden.',
    amenities: ['Garden View', 'Seasonal Menu', 'Tea Pairing', 'Private Room'],
    image: IMG_KYOTO,
  },
  {
    id: 'r-3',
    category: 'restaurants',
    name: 'Atlas Courtyard Kitchen',
    location: 'Marrakech, Morocco',
    price: 65,
    priceUnit: 'per guest',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Contemporary Moroccan hearth cuisine served beneath olive trees and geometric stone arches.',
    amenities: ['Courtyard Dining', 'Live Hearth', 'Vegetarian Options', 'Halal'],
    image: IMG_MARRAKECH,
  },

  // Tourist Spots
  {
    id: 's-1',
    category: 'spots',
    name: 'Torres del Paine Glacier Circuit',
    location: 'Patagonia, Chile',
    price: 180,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-04-30',
    description: 'Guided dawn trek to granite spires and mirror glacial lakes with private 4x4 transport.',
    amenities: ['Certified Guide', '4x4 Transfer', 'Lunch Pack', 'Photo Stops'],
    image: IMG_PATAGONIA,
  },
  {
    id: 's-2',
    category: 'spots',
    name: 'Reynisfjara Basalt Coastline',
    location: 'Vik, Iceland',
    price: 145,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'Black volcanic sand beaches, hexagonal basalt sea stacks, and southern highland waterfall access.',
    amenities: ['Super-Jeep', 'Local Geologist', 'Hot Springs Stop', 'Small Group'],
    image: IMG_ICELAND,
  },
  {
    id: 's-3',
    category: 'spots',
    name: 'Kyoto Bamboo & Zen Heritage Trail',
    location: 'Kyoto, Japan',
    price: 110,
    priceUnit: 'per tour',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Early-morning guided walk through quiet Zen temples, cedar forests, and artisan tea houses.',
    amenities: ['Early Entry', 'Tea Ceremony', 'Historian Guide', 'Transfers'],
    image: IMG_KYOTO,
  },

  // Resorts
  {
    id: 'rs-1',
    category: 'resorts',
    name: 'Patagonia Horizon Eco-Resort',
    location: 'Patagonia, Chile',
    price: 540,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-05-31',
    description: 'All-inclusive architectural timber resort with panoramic glacier views, spa, and daily excursions.',
    amenities: ['All-Inclusive', 'Glacier View', 'Heated Spa', 'Daily Excursions'],
    image: IMG_PATAGONIA,
  },
  {
    id: 'rs-2',
    category: 'resorts',
    name: 'Nordic Basalt Geothermal Resort',
    location: 'Reykjavik South, Iceland',
    price: 490,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Private volcanic lagoon suites designed for northern lights viewing and Nordic hydrotherapy.',
    amenities: ['Geothermal Lagoon', 'Aurora Deck', 'Fine Dining', 'Private Suites'],
    image: IMG_ICELAND,
  },
  {
    id: 'rs-3',
    category: 'resorts',
    name: 'Palmeraie Sanctuary Resort',
    location: 'Marrakech, Morocco',
    price: 380,
    priceUnit: 'per night',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-11-30',
    description: 'Sprawling desert oasis resort with private plunge pools, palm groves, and Atlas mountain views.',
    amenities: ['Private Pool', 'Desert Spa', 'Shuttle Service', 'Family Villas'],
    image: IMG_MARRAKECH,
  },
];

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-1',
    name: 'Amalfi Architectural Escape',
    location: 'Amalfi Coast, Italy',
    duration: '6 Days / 5 Nights',
    price: 2450,
    summary: 'Cliffside hotel stay, private coastal boat charter, and curated Mediterranean dining.',
    image: IMG_AMALFI,
  },
  {
    id: 'pkg-2',
    name: 'Kyoto Zen & Culinary Retreat',
    location: 'Kyoto, Japan',
    duration: '7 Days / 6 Nights',
    price: 2890,
    summary: 'Cedar ryokan sanctuary, kaiseki dinners, bullet-train passes, and private temple tours.',
    image: IMG_KYOTO,
  },
  {
    id: 'pkg-3',
    name: 'Patagonia Glacier Expedition',
    location: 'Patagonia, Chile',
    duration: '5 Days / 4 Nights',
    price: 3150,
    summary: 'All-inclusive eco-resort, guided granite-spire treks, and glacial lake navigation.',
    image: IMG_PATAGONIA,
  },
];

export const HOME_FEATURES = [
  {
    number: '01.',
    title: 'Unified Multi-Category Search',
    description: 'Filter verified hotels, restaurants, tourist spots, and resorts by location, price, dates, and star quality.',
  },
  {
    number: '02.',
    title: 'Instant Online Booking',
    description: 'Book any stay, dining experience, or tour directly and track every status in your Customer Dashboard.',
  },
  {
    number: '03.',
    title: 'Verified Travel Information',
    description: 'Detailed transportation, seasonal weather, and destination guides curated by Karnel Travels specialists.',
  },
  {
    number: '04.',
    title: '24/7 Concierge & WhatsApp Desk',
    description: 'Real human advisors available around the clock for itinerary changes, transfers, and custom trips.',
  },
];

export const CUSTOMER_REVIEWS = [
  {
    quote: 'Karnel Travels made our Kyoto trip effortless. Filtering ryokans by dates and quality saved hours, and our booking dashboard kept every confirmation in one place.',
    author: 'Ayesha Siddiqui',
    role: 'Product Designer',
    trip: 'Kyoto Zen & Culinary Retreat',
  },
  {
    quote: 'We booked both our Patagonia eco-resort and guided glacier circuit through Karnel Travels. Every transfer arrived on time and the resort exceeded expectations.',
    author: 'Daniel Weber',
    role: 'Civil Architect',
    trip: 'Patagonia Glacier Expedition',
  },
  {
    quote: 'The Information section helped us plan transport across Iceland before we even landed. Best minimalist travel platform I have used.',
    author: 'Sana Tariq',
    role: 'Operations Lead',
    trip: 'Nordic Basalt Geothermal Resort',
  },
];

export const TEAM_MEMBERS = [
  { name: 'Hamza Karnel', role: 'Founder & Managing Director', bio: '14 years curating architectural hospitality and international tour operations.' },
  { name: 'Zara Mahmood', role: 'Head of Travel Operations', bio: 'Oversees global hotel partnerships, transport networks, and 24/7 guest support.' },
  { name: 'Omar Farooq', role: 'Lead Experience Architect', bio: 'Designs bespoke regional packages across Europe, East Asia, and South America.' },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'KT-1042',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 'h-2',
    itemName: 'Arashiyama Cedar Ryokan',
    category: 'Hotels',
    location: 'Kyoto, Japan',
    checkIn: '2026-12-12',
    checkOut: '2026-12-16',
    guests: 2,
    totalPrice: 1440,
    status: 'Confirmed',
    createdAt: '2026-11-10',
  },
  {
    id: 'KT-1048',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 's-1',
    itemName: 'Torres del Paine Glacier Circuit',
    category: 'Tourist Spots',
    location: 'Patagonia, Chile',
    checkIn: '2027-01-18',
    checkOut: '2027-01-19',
    guests: 2,
    totalPrice: 360,
    status: 'Upcoming',
    createdAt: '2026-11-15',
  },
  {
    id: 'KT-1031',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 'r-3',
    itemName: 'Atlas Courtyard Kitchen',
    category: 'Restaurants',
    location: 'Marrakech, Morocco',
    checkIn: '2026-11-28',
    checkOut: '2026-11-28',
    guests: 3,
    totalPrice: 195,
    status: 'Cancelled',
    createdAt: '2026-11-02',
  },
];
