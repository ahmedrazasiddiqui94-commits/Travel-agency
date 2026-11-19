export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  duration: string;
  startingRate: string;
  season: string;
  summary: string;
  highlights: string[];
  image: string;
  spanClass: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  trip: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_amalfi_villa_1795068049695.jpg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto-ryokan',
    name: 'Kyoto Sanctuary',
    country: 'Japan',
    region: 'East Asia',
    duration: '8 Nights',
    startingRate: 'From $9,400',
    season: 'Mar – May · Oct – Nov',
    summary: 'Private architectural ryokans, after-hours temple gardens, and kaiseki dining curated with local historians.',
    highlights: ['Private cedar pavilion in Arashiyama', 'After-hours Zen garden access', 'Chauffeured bullet-train transfers'],
    image: '/src/assets/images/dest_kyoto_ryokan_1795068050439.jpg',
    spanClass: 'lg:col-span-2',
  },
  {
    id: 'patagonia-peaks',
    name: 'Torres del Paine',
    country: 'Chile',
    region: 'South America',
    duration: '7 Nights',
    startingRate: 'From $11,200',
    season: 'Nov – Mar',
    summary: 'Helicopter-assisted glacier traverses and minimalist timber lodges overlooking granite spires.',
    highlights: ['Private glacial lake navigation', 'Dedicated alpine expedition guide', 'Charter flight from Santiago'],
    image: '/src/assets/images/dest_patagonia_peaks_1795068049621.jpg',
    spanClass: 'lg:col-span-1',
  },
  {
    id: 'iceland-black-sand',
    name: 'Reynisfjara & Highlands',
    country: 'Iceland',
    region: 'North Atlantic',
    duration: '6 Nights',
    startingRate: 'From $8,800',
    season: 'Jun – Sep · Jan – Mar',
    summary: 'Super-jeep highland expeditions, private geothermal lagoons, and volcanic basalt coastlines.',
    highlights: ['Private highland super-jeep', 'Geothermal architectural retreat', 'Private aurora flight charter'],
    image: '/src/assets/images/dest_iceland_black_sand_1795068049576.jpg',
    spanClass: 'lg:col-span-1',
  },
  {
    id: 'marrakech-riad',
    name: 'Marrakech & Atlas',
    country: 'Morocco',
    region: 'North Africa',
    duration: '5 Nights',
    startingRate: 'From $6,900',
    season: 'Mar – May · Sep – Nov',
    summary: 'Exclusive-use travertine riads, private desert astronomy camps, and Atlas Mountain helicopter lunches.',
    highlights: ['Exclusive-use architectural riad', 'Private desert camp under Atlas', 'Curated gallery & artisan access'],
    image: '/src/assets/images/dest_marrakech_riad_1795068049314.jpg',
    spanClass: 'lg:col-span-2',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01.',
    title: 'Private Aviation & Commercial Routing',
    description: 'End-to-end flight architecture across commercial first-class cabins, empty-leg charters, and multi-continent private aviation.',
    deliverable: 'Dedicated 24/7 flight desk & tarmac transfer coordination',
  },
  {
    number: '02.',
    title: 'Architectural Stays & Private Estates',
    description: 'Direct access to off-market villas, modernist sanctuaries, and design-led boutique hotels rarely listed on public platforms.',
    deliverable: 'Pre-inspected properties with private household staff',
  },
  {
    number: '03.',
    title: 'Expedition & Cultural Access',
    description: 'After-hours museum openings, private marine charters, and field specialists who open doors beyond standard tourism.',
    deliverable: 'Bespoke daily dossier with local fixer support',
  },
  {
    number: '04.',
    title: 'Executive Retreats & Sabbaticals',
    description: 'Long-horizon family sabbaticals and leadership offsites engineered with seamless logistics, security, and connectivity.',
    deliverable: 'Single-point itinerary director from briefing to return',
  },
];

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '14 min',
    label: 'Median Response Time',
    context: 'Direct WhatsApp & flight desk resolution during active travel (2025–2026)',
  },
  {
    value: '42',
    label: 'Partner Countries',
    context: 'Vetted on-the-ground architectural stays and private aviation operators',
  },
  {
    value: '96%',
    label: 'Returning Travelers',
    context: 'Clients booking two or more bespoke itineraries within 24 months',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Before Meridian, multi-leg family trips meant days of conflicting spreadsheets. They coordinated our private transfers across Kyoto and Naoshima down to the minute—we never once waited in a terminal.',
    author: 'claire Lindqvist',
    role: 'Managing Partner',
    organization: 'Nordic Venture Studio',
    trip: 'Kyoto & Seto Inland Sea · 10 Nights',
  },
  {
    quote: 'When volcanic weather shifted our Patagonia charter window, our advisor re-routed the helicopter and lodge sequence before we finished breakfast. That level of calm execution is rare.',
    author: 'Henrik Alverez',
    role: 'Principal Architect',
    organization: 'Alverez & Partners Zurich',
    trip: 'Torres del Paine · 7 Nights',
  },
  {
    quote: 'We asked for a quiet, design-focused week in Marrakech without tourist crowds. Meridian secured an off-market travertine riad and arranged private studio visits we could never have found alone.',
    author: 'Nadia Mansour',
    role: 'Creative Director',
    organization: 'Atelier Solis London',
    trip: 'Marrakech & Atlas · 6 Nights',
  },
];

export const POPULAR_AIRPORTS = [
  'LHR — London Heathrow',
  'JFK — New York JFK',
  'ZRH — Zurich Airport',
  'DXB — Dubai International',
  'HND — Tokyo Haneda',
  'KIX — Osaka Kansai',
  'SCL — Santiago Arturo Merino',
  'KEF — Reykjavik Keflavik',
  'RAK — Marrakech Menara',
  'NAP — Naples International',
];
