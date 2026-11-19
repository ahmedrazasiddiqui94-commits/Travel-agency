import { ArrowUpRight } from 'lucide-react';
import type { ListingCategory, ListingItem } from '../data/karnelData';

type InfoTopic = 'tourist-spots' | 'travel-info' | 'hotel-info' | 'restaurant-info' | 'resorts-info';

interface InfoSectionProps {
  topic: InfoTopic;
  listings: ListingItem[];
  onSwitchTopic: (topic: InfoTopic) => void;
  onGoSearch: (cat: ListingCategory) => void;
}

const TRAVEL_FACILITIES = [
  {
    number: '01.',
    title: 'Air & Private Charter Transfers',
    detail: 'Direct airport tarmac transfers, domestic charter connections, and flexible multi-airline ticketing across 42 countries.',
  },
  {
    number: '02.',
    title: 'High-Speed Rail & Scenic Coaches',
    detail: 'Reserved Shinkansen green-car passes in Japan, Swiss panoramic rail, and private Mercedes Sprinter transfers.',
  },
  {
    number: '03.',
    title: 'Visa, Insurance & 24/7 Assistance',
    detail: 'Pre-departure documentation briefings, comprehensive travel protection, and direct WhatsApp flight desk support.',
  },
];

export function InfoSection({ topic, listings, onSwitchTopic, onGoSearch }: InfoSectionProps) {
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

  return (
    <section className="py-16 md:py-24 bg-[#F5F2EA] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-mono text-[#111111]/60 mb-2">KARNEL INFORMATION HUB</p>
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
                      ${item.price} {item.priceUnit}
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
