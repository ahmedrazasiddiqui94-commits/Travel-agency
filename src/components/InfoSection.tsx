import { useState } from 'react';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';
import type { ListingCategory, ListingItem } from '../data/karnelData';

type InfoTopic = 'tourist-spots' | 'travel-info' | 'hotel-info' | 'restaurant-info' | 'resorts-info';

interface InfoSectionProps {
  topic: InfoTopic;
  listings: ListingItem[];
  onSwitchTopic: (topic: InfoTopic) => void;
  onGoSearch: (cat: ListingCategory) => void;
}

interface CityHighlightGuide {
  id: string;
  city: string;
  region: string;
  bestSeason: string;
  accessRoute: string;
  summary: string;
  highlights: string[];
  recommendedStays: string[];
}

const TRAVEL_FACILITIES = [
  {
    number: '01.',
    title: 'Domestic Flights (Karachi, Lahore, Islamabad → Skardu & Gilgit)',
    detail: 'Coordinated PIA, Airblue, and SereneAir domestic flight bookings with flexible weather-rescheduling support for northern routes.',
  },
  {
    number: '02.',
    title: '4x4 Prado & Karakoram Highway Transfers',
    detail: 'Experienced mountain drivers with 4x4 Toyota Prado, Land Cruiser, and Hiace Grand Cabin vehicles for Hunza, Skardu, Fairy Meadows, and Kalam.',
  },
  {
    number: '03.',
    title: 'Motorway Executive Coaches (Lahore · Islamabad · Swat)',
    detail: 'Seamless M-2 / M-1 / Swat Motorway travel between Lahore, Islamabad, and Kalam backed by our 24/7 Pakistani WhatsApp concierge.',
  },
  {
    number: '04.',
    title: 'Azad Kashmir & Galiyat Hill Transfers',
    detail: 'Private sedan and 4x4 transfers from Islamabad to Murree, Nathia Gali, Muzaffarabad, and Neelum Valley.',
  },
  {
    number: '05.',
    title: 'Makran Coastal Highway & Balochistan Tours',
    detail: 'Air-conditioned 4x4 and executive coaster departures from Karachi to Kund Malir, Hingol National Park, and Gwadar.',
  },
];

const CITY_HIGHLIGHT_GUIDES: CityHighlightGuide[] = [
  {
    id: 'skardu',
    city: 'Skardu',
    region: 'Baltistan · Gilgit-Baltistan',
    bestSeason: 'May – Oct',
    accessRoute: '1h 05m flight from Islamabad (KDU) or Jaglot–Skardu Highway',
    summary: 'High-altitude gateway to the Karakoram giants, emerald glacial lakes, and ancient Balti forts.',
    highlights: [
      'Upper & Lower Kachura (Shangrila) Lakes',
      'Deosai National Park & Sheosar Lake',
      'Shigar Fort Heritage Residence & Sarfaranga Cold Desert',
      'Manthokha Waterfall & Satpara Lake',
    ],
    recommendedStays: [
      'Shangrila Lakeside Chalet Resort (Lower & Upper Kachura)',
      'Serena Shigar Fort Heritage Hotel',
      'Kachura Alpine Timber Lodges',
    ],
  },
  {
    id: 'hunza',
    city: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    bestSeason: 'Apr – Oct',
    accessRoute: 'Flight to Gilgit (GIL) + 2h scenic drive along Karakoram Highway',
    summary: 'Turquoise alpine lakes, terraced apricot orchards, and 7,000m snow peaks visible from every courtyard.',
    highlights: [
      'Attabad Lake Boating & Passu Cones Viewpoint',
      'Baltit Fort & Altit Royal Gardens in Karimabad',
      'Eagle Nest Duikar Sunrise & Sunset Deck',
      'Hussaini Suspension Bridge & Khunjerab Pass',
    ],
    recommendedStays: [
      'Luxus Hunza Attabad Hotel',
      'Eagle Nest Duikar Resort',
      'Serena Altit Fort Residence',
    ],
  },
  {
    id: 'murree',
    city: 'Murree & Galiyat',
    region: 'Punjab & KPK Hill Stations',
    bestSeason: 'Year-Round (Snow: Dec – Feb)',
    accessRoute: '1h 30m via Islamabad–Murree Expressway (E-75)',
    summary: 'Misty cedar ridges, colonial hill trails, and family-friendly alpine resorts close to the capital.',
    highlights: [
      'Nathia Gali Pine Forests & Mushkpuri Top Trek',
      'Patriata (New Murree) Chairlift & Cable Car',
      'Bhurban Golf Course & Kashmir Point',
      'Ayubia National Park Pipeline Track',
    ],
    recommendedStays: [
      'Bhurban Alpine Golf Resort',
      'Nathia Gali Pine Crest Resort',
      'Shangrila Resort Hotel Murree',
    ],
  },
  {
    id: 'peshawar',
    city: 'Peshawar',
    region: 'Khyber Pakhtunkhwa',
    bestSeason: 'Oct – Mar',
    accessRoute: '2h via M-1 Motorway from Islamabad',
    summary: 'One of South Asia’s oldest living cities, renowned for Gandhara history, bazaars, and legendary cuisine.',
    highlights: [
      'Qissa Khwani Bazaar & Sethi Heritage Mohalla',
      'Peshawar Museum (Gandhara Art Collection)',
      'Namak Mandi Karahi & Chapli Kabab Dining',
      'Bala Hisar Fort & Mahabat Khan Mosque',
    ],
    recommendedStays: [
      'Pearl-Continental Hotel Peshawar',
      'Shelton’s Rezidor Peshawar',
      'Fort Continental Cantonment Suites',
    ],
  },
];

export function InfoSection({ topic, listings, onSwitchTopic, onGoSearch }: InfoSectionProps) {
  const [selectedCityId, setSelectedCityId] = useState<string>('skardu');

  const topics: Array<{ id: InfoTopic; label: string }> = [
    { id: 'tourist-spots', label: 'Tourist Spots' },
    { id: 'travel-info', label: 'Travel Information' },
    { id: 'hotel-info', label: 'Hotel Information' },
    { id: 'restaurant-info', label: 'Restaurant Information' },
    { id: 'resorts-info', label: 'Resorts Information' },
  ];

  const categoryMap: Partial<Record<InfoTopic, ListingCategory>> = {
    'tourist-spots': 'spots',
    'hotel-info': 'hotels',
    'restaurant-info': 'restaurants',
    'resorts-info': 'resorts',
  };

  const activeCategory = categoryMap[topic];
  const relevantItems = activeCategory
    ? listings.filter((item) => item.category === activeCategory)
    : [];

  const activeCityGuide =
    CITY_HIGHLIGHT_GUIDES.find((c) => c.id === selectedCityId) ?? CITY_HIGHLIGHT_GUIDES[0];

  return (
    <section className="py-16 md:py-24 bg-[#F5F2EA] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-mono text-[#111111]/60 mb-2">KARNEL INFORMATION HUB · PAKISTAN</p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111]">
            {topics.find((t) => t.id === topic)?.label}
          </h1>
        </div>

        {/* Sub-navigation */}
        <div className="flex flex-wrap gap-2 mb-12">
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSwitchTopic(t.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border-[1.5px] transition-colors cursor-pointer ${
                topic === t.id
                  ? 'bg-[#111111] text-[#C7F000] border-[#111111]'
                  : 'bg-white text-[#111111] border-[#111111]/25 hover:border-[#111111]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {topic === 'travel-info' ? (
          <div className="space-y-10">
            {/* Transport & Corridors */}
            <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#111111] divide-y divide-[#D9D7D0]">
              {TRAVEL_FACILITIES.map((item) => (
                <div key={item.number} className="p-7 md:p-9 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2 font-mono text-sm text-[#111111]/55">{item.number}</div>
                  <div className="md:col-span-10">
                    <h2 className="font-display text-2xl font-semibold text-[#111111]">{item.title}</h2>
                    <p className="mt-2 text-sm sm:text-base text-[#111111]/75 max-w-2xl leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Pakistan City Local Highlights Explorer */}
            <div className="bg-[#111111] text-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#C7F000] p-7 md:p-9">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/15">
                <div>
                  <p className="text-xs font-mono text-[#C7F000] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>REGIONAL LOCAL HIGHLIGHTS</span>
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-1.5">
                    Skardu, Hunza, Murree & Peshawar Guides
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {CITY_HIGHLIGHT_GUIDES.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setSelectedCityId(city.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        selectedCityId === city.id
                          ? 'bg-[#C7F000] text-[#111111]'
                          : 'bg-white/10 text-white/80 hover:text-white'
                      }`}
                    >
                      {city.city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs font-mono text-white/60 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C7F000]" />
                    <span>{activeCityGuide.region}</span>
                  </p>
                  <h3 className="font-display text-3xl font-semibold">{activeCityGuide.city}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{activeCityGuide.summary}</p>
                  <div className="pt-3 space-y-1.5 text-xs text-white/70">
                    <p>
                      <strong className="text-white">Best Season:</strong> {activeCityGuide.bestSeason}
                    </p>
                    <p>
                      <strong className="text-white">How to Reach:</strong> {activeCityGuide.accessRoute}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCityGuide.highlights.map((hl, idx) => (
                      <div
                        key={hl}
                        className="rounded-xl bg-white/5 border border-white/12 p-4 flex items-start gap-3"
                      >
                        <span className="font-mono text-xs text-[#C7F000] mt-0.5">0{idx + 1}.</span>
                        <p className="text-sm text-white/90">{hl}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono text-[#C7F000] mb-1.5">RECOMMENDED LOCAL STAYS</p>
                      <p className="text-xs text-white/80">
                        {activeCityGuide.recommendedStays.join(' · ')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onGoSearch('resorts')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C7F000] text-[#111111] text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Browse Stays</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {relevantItems.map((item) => (
              <article
                key={item.id}
                className="bg-white border-[1.5px] border-[#111111] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-4 aspect-[4/3] lg:aspect-auto bg-[#111111]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-8 p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono text-[#111111]/60">
                      {item.location} · {item.quality}.0 Stars · Available {item.availableFrom} to {item.availableTo}
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#111111] mt-2">
                      {item.name}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-[#111111]/75 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-4 text-xs text-[#111111]/60">
                      Highlights: <span className="text-[#111111] font-medium">{item.amenities.join(' · ')}</span>
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#D9D7D0] flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold tabular-nums">
                      Rs. {item.price.toLocaleString()} {item.priceUnit}
                    </span>
                    {activeCategory && (
                      <button
                        type="button"
                        onClick={() => onGoSearch(activeCategory)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] underline underline-offset-4 cursor-pointer"
                      >
                        <span>Filter & Book in Search</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
