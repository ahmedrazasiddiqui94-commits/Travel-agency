import { useState } from 'react';
import { ArrowUpRight, Check, MapPin, X } from 'lucide-react';
import { DESTINATIONS, type Destination } from '../data/travelData';

interface BentoDestinationsProps {
  onSelectDestination: (destinationName: string) => void;
}

export function BentoDestinations({ onSelectDestination }: BentoDestinationsProps) {
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selected, setSelected] = useState<Destination | null>(null);

  const regions = ['All', 'East Asia', 'South America', 'North Atlantic', 'North Africa'];

  const filtered =
    activeRegion === 'All'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === activeRegion);

  return (
    <section id="destinations" className="bg-[#111111] text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 reveal-section">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C7F000] tracking-wide mb-3">
              Curated Geography
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Destinations selected for architectural stillness and rare access.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl self-start lg:self-auto">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeRegion === region
                    ? 'bg-[#C7F000] text-[#111111]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <article
              key={dest.id}
              onClick={() => setSelected(dest)}
              className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-[#1A1A1A] cursor-pointer min-h-[380px] flex flex-col justify-end ${
                activeRegion === 'All' ? dest.spanClass : 'lg:col-span-1'
              }`}
            >
              <img
                src={dest.image}
                alt={`${dest.name}, ${dest.country}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>
                    {dest.country} <span aria-hidden="true">·</span> {dest.duration}
                  </span>
                  <span className="font-mono tabular-nums text-[#C7F000]">{dest.startingRate}</span>
                </div>

                <div className="mt-auto pt-24">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-white/75 mt-2 max-w-md line-clamp-2">
                        {dest.summary}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 group-hover:bg-[#C7F000] group-hover:text-[#111111] group-hover:border-[#C7F000] text-white flex items-center justify-center shrink-0 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Selected Destination Detail Panel */}
        {selected && (
          <div className="mt-8 rounded-2xl border border-white/15 bg-[#181818] p-7 md:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 overflow-hidden rounded-xl aspect-[4/3] bg-black">
              <img
                src={selected.image}
                alt={selected.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#C7F000] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {selected.country} · Best Season: {selected.season}
                    </span>
                  </p>
                  <h3 className="font-display text-3xl font-semibold mt-1.5">{selected.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close destination details"
                  className="p-2 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {selected.summary}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {selected.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-white/85 bg-white/5 border border-white/10 rounded-xl p-3.5"
                  >
                    <Check className="w-4 h-4 text-[#C7F000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/70 tabular-nums">
                  Suggested Duration: <strong className="text-white">{selected.duration}</strong> ·{' '}
                  <strong className="text-[#C7F000]">{selected.startingRate}</strong> per traveler
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectDestination(`${selected.name}, ${selected.country}`);
                    setSelected(null);
                    document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C7F000] text-[#111111] text-sm font-semibold hover:bg-[#b8de00] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Inquire About {selected.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
