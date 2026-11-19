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

const IMG_HUNZA = '/src/assets/images/pk_hunza_valley_1795071224316.jpg';
const IMG_SKARDU = '/src/assets/images/pk_skardu_lake_1795071224387.jpg';
const IMG_SWAT = '/src/assets/images/pk_swat_kalam_1795071224765.jpg';
const IMG_LAHORE = '/src/assets/images/pk_lahore_heritage_1795071224446.jpg';

export const BANNER_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'Karnel Travels · Explore Pakistan',
    title: 'Discover Hunza, Skardu, Swat, and Lahore with curated comfort.',
    subtitle: 'Book verified Pakistani hotels, heritage restaurants, northern tourist spots, and mountain resorts from one unified platform.',
    offer: 'Save 15% on Early Winter Northern Packages',
    image: IMG_HUNZA,
  },
  {
    id: 'slide-2',
    kicker: 'Skardu & Baltistan',
    title: 'Emerald glacial lakes and Karakoram alpine chalets.',
    subtitle: 'Handpicked lakeside resorts in Upper Kachura and Skardu with Islamabad–Skardu flight and 4x4 Prado transfers.',
    offer: 'Complimentary Skardu Airport Pickup Included',
    image: IMG_SKARDU,
  },
  {
    id: 'slide-3',
    kicker: 'Swat & Kalam Valley',
    title: 'Pine-forested river lodges and misty highland trails.',
    subtitle: 'Family-friendly mountain resorts and guided Mahodand Lake tours designed for effortless travel across Pakistan.',
    offer: 'Free Cancellation up to 5 Days Before Check-In',
    image: IMG_SWAT,
  },
];

export const INITIAL_LISTINGS: ListingItem[] = [
  // Hotels (Pakistan Only)
  {
    id: 'h-1',
    category: 'hotels',
    name: 'Luxus Hunza Attabad Hotel',
    location: 'Attabad Lake, Hunza, Gilgit-Baltistan',
    price: 38000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'Lakefront stone suites overlooking turquoise Attabad waters with panoramic Karakoram balconies and heated floors.',
    amenities: ['Lake View', 'Heated Rooms', 'Breakfast', '4x4 Transfer'],
    image: IMG_HUNZA,
  },
  {
    id: 'h-2',
    category: 'hotels',
    name: 'Serena Hotel Islamabad',
    location: 'Khayaban-e-Suharwardy, Islamabad',
    price: 45000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Iconic Mughal-inspired luxury hotel at the foothills of Margalla with tranquil courtyards and executive dining.',
    amenities: ['Margalla Views', 'Swimming Pool', 'Spa', 'Airport Shuttle'],
    image: IMG_LAHORE,
  },
  {
    id: 'h-3',
    category: 'hotels',
    name: 'Swat Pine Valley Hotel',
    location: 'Mingora & Kalam Road, Swat, KPK',
    price: 22000,
    priceUnit: 'per night',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Boutique riverside timber hotel nestled among cedar forests with private decks along the Swat River.',
    amenities: ['River View', 'Bonfire Terrace', 'Family Suites', 'Free Parking'],
    image: IMG_SWAT,
  },
  {
    id: 'h-4',
    category: 'hotels',
    name: 'Pearl-Continental Hotel Lahore',
    location: 'Shahrah-e-Quaid-e-Azam, Lahore, Punjab',
    price: 42000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Five-star landmark hotel in the heart of Lahore with fine dining, landscaped pool, and executive suites.',
    amenities: ['City Center', 'Swimming Pool', 'Multiple Restaurants', 'Airport Shuttle'],
    image: IMG_LAHORE,
  },
  {
    id: 'h-5',
    category: 'hotels',
    name: 'Pearl-Continental Hotel Karachi',
    location: 'Club Road, Karachi, Sindh',
    price: 39000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Premier coastal metropolis hotel with business lounges, wellness club, and quick access to Clifton.',
    amenities: ['Executive Lounge', 'Health Club', '24/7 Concierge', 'Valet Parking'],
    image: IMG_LAHORE,
  },
  {
    id: 'h-6',
    category: 'hotels',
    name: 'Fairy Meadows Raikot Cottages',
    location: 'Fairy Meadows, Diamer, Gilgit-Baltistan',
    price: 26000,
    priceUnit: 'per night',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'Handcrafted alpine wooden cabins facing the dramatic snow face of Nanga Parbat (8,126m).',
    amenities: ['Nanga Parbat View', 'Bonfire', 'Guided Trek', 'Local Meals'],
    image: IMG_SKARDU,
  },

  // Restaurants (Pakistan Only)
  {
    id: 'r-1',
    category: 'restaurants',
    name: 'Haveli Restaurant Walled City',
    location: 'Food Street, Lahore, Punjab',
    price: 4500,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Historic sandstone haveli offering rooftop Lahori BBQ and traditional Mughlai cuisine facing Badshahi Mosque.',
    amenities: ['Badshahi View', 'Rooftop Dining', 'Live BBQ', 'Family Hall'],
    image: IMG_LAHORE,
  },
  {
    id: 'r-2',
    category: 'restaurants',
    name: 'Cafe de Hunza & Terrace',
    location: 'Karimabad, Hunza, Gilgit-Baltistan',
    price: 3200,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Famous walnut cake, organic Hunza apricot dishes, and specialty coffee overlooking Rakaposhi and Ultar Sar.',
    amenities: ['Mountain Terrace', 'Organic Menu', 'Local Specialties', 'Wi-Fi'],
    image: IMG_HUNZA,
  },
  {
    id: 'r-3',
    category: 'restaurants',
    name: 'Kachura Lakeside Kitchen',
    location: 'Upper Kachura, Skardu, Baltistan',
    price: 3800,
    priceUnit: 'per guest',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Freshly grilled Skardu trout, Balti mamtu, and warm Kashmiri chai served right on the lakeside deck.',
    amenities: ['Fresh Trout', 'Lakeside Deck', 'Halal', 'Private Cabins'],
    image: IMG_SKARDU,
  },
  {
    id: 'r-4',
    category: 'restaurants',
    name: 'Kolachi Do Darya',
    location: 'DHA Phase 8 Seafront, Karachi, Sindh',
    price: 4200,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Iconic Arabian Sea waterfront dining famous for Peshawari Karahi, sajji, and coastal evening breeze.',
    amenities: ['Oceanfront Deck', 'Live BBQ', 'Family Seating', 'Valet'],
    image: IMG_LAHORE,
  },
  {
    id: 'r-5',
    category: 'restaurants',
    name: 'Margalla Highland Terrace',
    location: 'Pir Sohawa, Islamabad',
    price: 4800,
    priceUnit: 'per guest',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Panoramic hilltop dining overlooking the entire Islamabad skyline with charcoal-grilled specialties.',
    amenities: ['City Panorama', 'Open-Air Terrace', 'Live Music', 'Halal'],
    image: IMG_HUNZA,
  },
  {
    id: 'r-6',
    category: 'restaurants',
    name: 'Namak Mandi Heritage Karahi',
    location: 'Namak Mandi, Peshawar, KPK',
    price: 2500,
    priceUnit: 'per guest',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Authentic Peshawari dumba karahi, chapli kabab, and green kahwa served in traditional sitting rooms.',
    amenities: ['Authentic Karahi', 'Peshawari Kahwa', 'Family Area', 'Halal'],
    image: IMG_LAHORE,
  },

  // Tourist Spots (Pakistan Only)
  {
    id: 's-1',
    category: 'spots',
    name: 'Attabad Lake & Passu Cones Tour',
    location: 'Gojal, Upper Hunza, Gilgit-Baltistan',
    price: 12000,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'Full-day guided excursion covering Attabad boat cruise, Hussaini Suspension Bridge, and Passu Glacier viewpoint.',
    amenities: ['4x4 Prado', 'Local Guide', 'Boat Ride', 'Photo Stops'],
    image: IMG_HUNZA,
  },
  {
    id: 's-2',
    category: 'spots',
    name: 'Deosai Plains & Upper Kachura',
    location: 'Skardu, Gilgit-Baltistan',
    price: 15500,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'High-altitude jeep safari across the Land of Giants, Sheosar Lake, and emerald Upper Kachura waters.',
    amenities: ['4x4 Jeep', 'Park Entry', 'Lunch Box', 'Certified Guide'],
    image: IMG_SKARDU,
  },
  {
    id: 's-3',
    category: 'spots',
    name: 'Mahodand Lake & Ushu Forest',
    location: 'Kalam Valley, Swat, KPK',
    price: 9500,
    priceUnit: 'per tour',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Scenic jeep drive through towering Ushu deodar forests to the glacial meadows of Mahodand Lake.',
    amenities: ['4x4 Transport', 'Guided Trek', 'River Stop', 'Tea Break'],
    image: IMG_SWAT,
  },
  {
    id: 's-4',
    category: 'spots',
    name: 'Neelum Valley & Ratti Gali Lake',
    location: 'Athmuqam & Dowarian, Azad Kashmir',
    price: 13500,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-10-31',
    description: 'Alpine glacial lake surrounded by wildflower meadows and emerald rivers in Azad Jammu & Kashmir.',
    amenities: ['4x4 Jeep', 'Local Guide', 'River Views', 'Camp Lunch'],
    image: IMG_SWAT,
  },
  {
    id: 's-5',
    category: 'spots',
    name: 'Badshahi Mosque & Shahi Qila',
    location: 'Walled City, Lahore, Punjab',
    price: 5500,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Guided architectural walk through Mughal-era Sheesh Mahal, Alamgiri Gate, and Badshahi courtyard.',
    amenities: ['Historian Guide', 'Entry Tickets', 'Golf Cart Ride', 'Food Street Stop'],
    image: IMG_LAHORE,
  },
  {
    id: 's-6',
    category: 'spots',
    name: 'Hingol National Park & Kund Malir',
    location: 'Makran Coastal Highway, Balochistan',
    price: 11000,
    priceUnit: 'per tour',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Golden desert cliffs meeting the Arabian Sea, Princess of Hope rock formation, and Chandragup mud volcano.',
    amenities: ['AC Coaster / 4x4', 'Sunset Beach', 'Refreshments', 'Karachi Pickup'],
    image: IMG_HUNZA,
  },

  // Resorts (Pakistan Only)
  {
    id: 'rs-1',
    category: 'resorts',
    name: 'Shangrila Lakeside Chalet Resort',
    location: 'Lower & Upper Kachura, Skardu',
    price: 52000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Private cedar lakeside chalets reflecting the Karakoram peaks with boating, bonfire evenings, and alpine dining.',
    amenities: ['Private Lake Access', 'Cedar Chalets', 'All Meals Option', 'Airport Transfer'],
    image: IMG_SKARDU,
  },
  {
    id: 'rs-2',
    category: 'resorts',
    name: 'Kalam Forest Sanctuary Resort',
    location: 'Kalam Valley, Swat, KPK',
    price: 34000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Secluded pine-forest cottages beside the glacial river with private lawn decks and guided valley excursions.',
    amenities: ['Riverfront Cottages', 'Heated Rooms', 'BBQ Nights', 'Family Friendly'],
    image: IMG_SWAT,
  },
  {
    id: 'rs-3',
    category: 'resorts',
    name: 'Eagle Nest Duikar Resort',
    location: 'Duikar, Hunza Valley, Gilgit-Baltistan',
    price: 41000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-11-30',
    description: 'Highest panoramic viewpoint resort in Hunza offering unforgettable sunrise and sunset views over seven 7,000m peaks.',
    amenities: ['360° Peak Views', 'Sunrise Deck', 'Local Cuisine', 'Private Parking'],
    image: IMG_HUNZA,
  },
  {
    id: 'rs-4',
    category: 'resorts',
    name: 'Nathia Gali Pine Crest Resort',
    location: 'Nathia Gali, Galiyat, KPK',
    price: 36000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Misty cedar-forest sanctuary just 2 hours from Islamabad with fireplace suites and Mushkpuri trail access.',
    amenities: ['Fireplace Suites', 'Pine Forest', 'Trail Access', 'Family Villas'],
    image: IMG_SWAT,
  },
  {
    id: 'rs-5',
    category: 'resorts',
    name: 'Bhurban Alpine Golf Resort',
    location: 'Bhurban, Murree Hills, Punjab',
    price: 48000,
    priceUnit: 'per night',
    quality: 5,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Five-star hill-station resort perched at 6,400 ft with Kashmir valley views, golf course, and heated pool.',
    amenities: ['Golf Course', 'Heated Pool', 'Kashmir Views', 'Fine Dining'],
    image: IMG_SKARDU,
  },
  {
    id: 'rs-6',
    category: 'resorts',
    name: 'Gwadar Koh-e-Batil Seafront Resort',
    location: 'Gwadar, Balochistan',
    price: 32000,
    priceUnit: 'per night',
    quality: 4,
    availableFrom: '2026-11-01',
    availableTo: '2027-12-31',
    description: 'Clifftop coastal resort overlooking Hammerhead bay and turquoise Arabian Sea sunsets.',
    amenities: ['Sea Cliff Views', 'Private Terrace', 'Seafood Grill', 'Airport Pickup'],
    image: IMG_HUNZA,
  },
];

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-1',
    name: 'Hunza & Attabad Luxury Escape',
    location: 'Hunza Valley, Gilgit-Baltistan',
    duration: '5 Days / 4 Nights',
    price: 85000,
    summary: 'Islamabad–Gilgit transfers, Attabad lakefront stay, Baltit Fort visit, and Passu Cones jeep tour.',
    image: IMG_HUNZA,
  },
  {
    id: 'pkg-2',
    name: 'Skardu & Shangrila Expedition',
    location: 'Skardu, Baltistan',
    duration: '6 Days / 5 Nights',
    price: 115000,
    summary: 'Lakeside chalet stay, Upper & Lower Kachura, Shigar Fort, Cold Desert, and 4x4 Prado transport.',
    image: IMG_SKARDU,
  },
  {
    id: 'pkg-3',
    name: 'Swat, Malam Jabba & Kalam Retreat',
    location: 'Swat Valley, KPK',
    duration: '4 Days / 3 Nights',
    price: 62000,
    summary: 'Riverside timber resort, Malam Jabba chairlift, Ushu Forest, and Mahodand Lake excursion.',
    image: IMG_SWAT,
  },
];

export const HOME_FEATURES = [
  {
    number: '01.',
    title: 'All-Pakistan Verified Search',
    description: 'Filter hotels, restaurants, tourist spots, and resorts across Hunza, Skardu, Swat, Lahore, Islamabad, and Karachi.',
  },
  {
    number: '02.',
    title: 'Instant Online Booking',
    description: 'Book any stay, dining table, or northern tour directly and track every status in your Customer Dashboard.',
  },
  {
    number: '03.',
    title: 'Pakistan Travel Information',
    description: 'Up-to-date domestic flight schedules, Karakoram Highway road updates, and seasonal weather briefings.',
  },
  {
    number: '04.',
    title: '24/7 Local WhatsApp Desk',
    description: 'Dedicated Pakistani travel coordinators available around the clock for 4x4 transfers and custom family trips.',
  },
];

export const CUSTOMER_REVIEWS = [
  {
    quote: 'Karnel Travels made our family trip to Hunza and Attabad Lake effortless. Filtering hotels by price and dates saved hours, and our dashboard kept every booking organized.',
    author: 'Ayesha Siddiqui',
    role: 'Product Designer · Karachi',
    trip: 'Hunza & Attabad Luxury Escape',
  },
  {
    quote: 'We booked our Skardu lakeside resort and Deosai jeep tour together. The 4x4 Prado was waiting at Skardu Airport right on time.',
    author: 'Bilal Ahmed',
    role: 'Civil Architect · Lahore',
    trip: 'Skardu & Shangrila Expedition',
  },
  {
    quote: 'The Information section helped us plan our Kalam and Mahodand Lake itinerary before leaving Islamabad. Cleanest travel site in Pakistan.',
    author: 'Sana Tariq',
    role: 'Operations Lead · Islamabad',
    trip: 'Swat, Malam Jabba & Kalam Retreat',
  },
];

export const TEAM_MEMBERS = [
  { name: 'Hamza Karnel', role: 'Founder & Managing Director', bio: '14 years curating northern Pakistan hospitality, domestic flights, and heritage tours.' },
  { name: 'Zara Mahmood', role: 'Head of Pakistan Operations', bio: 'Oversees partner hotels in Gilgit-Baltistan, KPK, Punjab, and Sindh with 24/7 guest support.' },
  { name: 'Omar Farooq', role: 'Lead Expedition Architect', bio: 'Designs family retreats and alpine itineraries across Hunza, Skardu, Swat, and Galiyat.' },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'KT-1042',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 'h-1',
    itemName: 'Luxus Hunza Attabad Hotel',
    category: 'Hotels',
    location: 'Attabad Lake, Hunza, Gilgit-Baltistan',
    checkIn: '2026-12-12',
    checkOut: '2026-12-15',
    guests: 2,
    totalPrice: 76000,
    status: 'Confirmed',
    createdAt: '2026-11-10',
  },
  {
    id: 'KT-1048',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 's-2',
    itemName: 'Deosai Plains & Upper Kachura',
    category: 'Tourist Spots',
    location: 'Skardu, Gilgit-Baltistan',
    checkIn: '2027-01-18',
    checkOut: '2027-01-19',
    guests: 2,
    totalPrice: 31000,
    status: 'Upcoming',
    createdAt: '2026-11-15',
  },
  {
    id: 'KT-1031',
    customerEmail: 'customer@karneltravels.com',
    customerName: 'Amina Khan',
    itemId: 'r-1',
    itemName: 'Haveli Restaurant Walled City',
    category: 'Restaurants',
    location: 'Food Street, Lahore, Punjab',
    checkIn: '2026-11-28',
    checkOut: '2026-11-28',
    guests: 4,
    totalPrice: 18000,
    status: 'Cancelled',
    createdAt: '2026-11-02',
  },
];
