import { useMemo, useState } from 'react';
import { Calendar, MapPin, Search, Star } from 'lucide-react';
import type { ListingCategory, ListingItem } from '../data/karnelData';

interface SearchSectionProps {
  category: ListingCategory;
  listings: ListingItem[];
  onSwitchCategory: (cat: ListingCategory) => void;
  onBookNow: (itemId: string) => void;
}

const CATEGORY_META: Record<ListingCategory, { title: string; subtitle: string }> = {
  hotels: {
    title: 'Search Hotels',
    subtitle: 'Filter verified architectural hotels by location, nightly rate, available dates, and star quality.',
  },
  restaurants: {
    title: 'Search Restaurants',
    subtitle: 'Discover curated fine-dining rooms and local culinary landmarks with instant table reservations.',
  },
  spots: {
    title: 'Search Tourist Spots',
    subtitle: 'Explore guided natural wonders, heritage trails, and private excursions across our global network.',
  },
  resorts: {
    title: 'Search Resorts',
    subtitle: 'All-inclusive alpine, coastal, and desert resorts vetted for serenity and service.',
  },
};

export function SearchSection({
  category,
  listings,
  onSwitchCategory,
  onBookNow,
}: SearchSectionProps) {
  const [locationQuery, setLocationQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [selectedDate, setSelectedDate] = useState('2026-12-15');
  const [minQuality, setMinQuality] = useState<number>(0);

  const filtered = useMemo(() => {
    return listings.filter((item) => {
      if (item.category !== category) return false;
      if (
        locationQuery.trim() &&
        !item.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
        !item.name.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }
      if (item.price > maxPrice) return false;
      if (minQuality > 0 && item.quality < minQuality) return false;
      if (selectedDate && (selectedDate < item.availableFrom || selectedDate > item.availableTo)) {
        return false;
      }
      return true;
    });
  }, [listings, category, locationQuery, maxPrice, selectedDate, minQuality]);

  const meta = CATEGORY_META[category];

  return (
    <section className="py-16 md:py-24 bg-[#F5F2EA] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header & Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono text-[#111111]/60 mb-2">KARNEL SEARCH DIRECTORY</p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111]">
              {meta.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#111111]/70 max-w-2xl">{meta.subtitle}</p>
          </div>

          <div className="inline-flex flex-wrap gap-1.5 p-1.5 bg-white border-[1.5px] border-[#111111] rounded-xl self-start">
            {(
              [
                { id: 'hotels', label: 'Hotels' },
                { id: 'restaurants', label: 'Restaurants' },
                { id: 'spots', label: 'Tourist Spots' },
                { id: 'resorts', label: 'Resorts' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSwitchCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  category === tab.id
                    ? 'bg-[#111111] text-[#C7F000]'
                    : 'text-[#111111]/75 hover:bg-[#F5F2EA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar: Location, Price, Available Dates, Quality */}
        <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#111111] p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label htmlFor="filter-location" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
                Location or Name
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#111111]/45 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="filter-location"
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Kyoto, Amalfi, Patagonia, Iceland..."
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="filter-date" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
                Available Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#111111]/45 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="filter-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="filter-price" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
                Max Price: <span className="font-mono font-semibold text-[#111111]">${maxPrice}</span>
              </label>
              <input
                id="filter-price"
                type="range"
                min={50}
                max={600}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#111111] cursor-pointer"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="filter-quality" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
                Quality
              </label>
              <select
                id="filter-quality"
                value={minQuality}
                onChange={(e) => setMinQuality(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4+ Stars</option>
                <option value={5}>5 Stars Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#D9D7D0] rounded-2xl p-12 text-center">
            <p className="font-display text-xl font-semibold text-[#111111]">No matching listings found</p>
            <p className="text-sm text-[#111111]/65 mt-2">
              Try widening your price range, clearing the location filter, or selecting another date.
            </p>
            <button
              type="button"
              onClick={() => {
                setLocationQuery('');
                setMaxPrice(600);
                setMinQuality(0);
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group bg-white border-[1.5px] border-[#111111] rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_#111111]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#111111]/90 text-[#C7F000] text-xs font-mono tabular-nums flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#C7F000]" />
                    <span>{item.quality}.0</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs text-[#111111]/60 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </p>
                    <h2 className="font-display text-xl font-semibold text-[#111111] mt-1.5">
                      {item.name}
                    </h2>
                    <p className="text-sm text-[#111111]/70 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-xs text-[#111111]/55 mt-3">
                      {item.amenities.join(' · ')}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D9D7D0] flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-2xl font-semibold tabular-nums text-[#111111]">
                        ${item.price}
                      </p>
                      <p className="text-xs text-[#111111]/55">{item.priceUnit}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookNow(item.id)}
                      className="px-5 py-2.5 rounded-xl bg-[#C7F000] hover:bg-[#b5db00] border border-[#111111] text-[#111111] text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Book Now
                    </button>
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
