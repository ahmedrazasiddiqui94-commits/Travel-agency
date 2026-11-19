import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { MapPin, X } from 'lucide-react';

interface HubInfo {
  code: string;
  city: string;
  province: string;
  bestSeason: string;
  x: number;
  y: number;
  progress: number;
  flightTime: string;
  note: string;
  highlights: string[];
}

const PAKISTAN_HUBS: HubInfo[] = [
  {
    code: 'KHI',
    city: 'Karachi',
    province: 'Sindh',
    bestSeason: 'Nov – Feb',
    x: 155,
    y: 265,
    progress: 0,
    flightTime: 'Origin Hub',
    note: 'Daily domestic departures to Lahore, Islamabad & Skardu',
    highlights: [
      'Clifton Coastline & French Beach',
      'Mohatta Palace & Frere Hall Heritage',
      'Do Darya Seaside Dining (Kolachi)',
    ],
  },
  {
    code: 'LHE',
    city: 'Lahore',
    province: 'Punjab',
    bestSeason: 'Oct – Mar',
    x: 278,
    y: 168,
    progress: 0.36,
    flightTime: '1h 45m from KHI',
    note: 'Walled City heritage stays & M-2 gateway to the North',
    highlights: [
      'Badshahi Mosque & Lahore Fort (Shahi Qila)',
      'Walled City Food Street & Haveli Rooftop',
      'Shalimar Gardens & Lahore Museum',
    ],
  },
  {
    code: 'ISB',
    city: 'Islamabad',
    province: 'Federal Capital',
    bestSeason: 'Feb – Apr · Sep – Nov',
    x: 256,
    y: 112,
    progress: 0.66,
    flightTime: '2h 00m from KHI',
    note: 'Margalla foothills & Karakoram Highway departure hub',
    highlights: [
      'Faisal Mosque & Margalla Hills Trail 5',
      'Daman-e-Koh & Pir Sohawa Viewpoints',
      'Pakistan Monument & Lok Virsa Museum',
    ],
  },
  {
    code: 'KDU',
    city: 'Skardu',
    province: 'Gilgit-Baltistan',
    bestSeason: 'May – Oct',
    x: 325,
    y: 52,
    progress: 1,
    flightTime: '1h 05m from ISB',
    note: 'Gateway to Shangrila, Deosai Plains & Hunza Valley',
    highlights: [
      'Upper & Lower Kachura (Shangrila) Lakes',
      'Deosai National Park & Sheosar Lake',
      'Shigar Fort & Sarfaranga Cold Desert',
    ],
  },
];

interface RouteLeg {
  id: string;
  label: string;
  stats: string;
  triggerAt: number;
  xPercent: number;
  yPercent: number;
  targetHubIndex: number;
}

const ROUTE_LEGS: RouteLeg[] = [
  {
    id: 'khi-lhe',
    label: 'Karachi → Lahore',
    stats: 'Flight Time: 1h 45m · Distance: 1,020 km',
    triggerAt: 0.22,
    xPercent: 56,
    yPercent: 72,
    targetHubIndex: 1,
  },
  {
    id: 'khi-isb',
    label: 'Karachi → Islamabad',
    stats: 'Flight Time: 2h 00m · Distance: 1,200 km',
    triggerAt: 0.52,
    xPercent: 28,
    yPercent: 44,
    targetHubIndex: 2,
  },
  {
    id: 'isb-kdu',
    label: 'Islamabad → Skardu',
    stats: 'Flight Time: 1h 05m · Distance: 315 km',
    triggerAt: 0.82,
    xPercent: 64,
    yPercent: 18,
    targetHubIndex: 3,
  },
];

export function AirplaneFlightPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const planeImgRef = useRef<HTMLImageElement>(null);
  const planeSvgRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const progressObj = useRef({ value: 0 });

  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [popupHub, setPopupHub] = useState<HubInfo | null>(null);

  const syncPlaneToProgress = (p: number) => {
    const plane = planeSvgRef.current;
    const trail = trailRef.current;
    if (!plane || !trail) return;

    const clamped = Math.max(0, Math.min(1, p));
    setCurrentProgress(clamped);

    const totalLength = trail.getTotalLength();
    const dist = clamped * totalLength;
    const point = trail.getPointAtLength(dist);
    const nextPoint = trail.getPointAtLength(Math.min(dist + 4, totalLength));
    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

    plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);
    trail.style.strokeDashoffset = `${totalLength * (1 - clamped)}`;

    // Determine closest hub for active indicator
    let nearest = 0;
    let minDiff = Infinity;
    PAKISTAN_HUBS.forEach((hub, idx) => {
      const diff = Math.abs(hub.progress - clamped);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = idx;
      }
    });
    setActiveHubIndex(nearest);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trail = trailRef.current;
    if (trail) {
      const totalLength = trail.getTotalLength();
      trail.style.strokeDasharray = `${totalLength}`;
      trail.style.strokeDashoffset = `${totalLength}`;
    }

    if (prefersReducedMotion) {
      syncPlaneToProgress(1);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Cinematic smooth floating + banking on the aerial airplane photo
      if (planeImgRef.current) {
        gsap.to(planeImgRef.current, {
          scale: 1.11,
          y: -10,
          rotation: 1.2,
          duration: 5.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // 2. ScrollTrigger-driven airplane along Pakistan map curved route
      if (sectionRef.current && trail) {
        syncPlaneToProgress(0.05);
        gsap.to(progressObj.current, {
          value: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'bottom 30%',
            scrub: 1.1,
          },
          onUpdate: () => syncPlaneToProgress(progressObj.current.value),
        });
      }
    }, sectionRef);

    // Subtle pointer-reactive 3D tilt on the cinematic airplane card
    const card = cardRef.current;
    const handleMove = (e: MouseEvent) => {
      if (!card || !planeImgRef.current) return;
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(planeImgRef.current, { x: nx * -16, duration: 0.6, ease: 'power2.out' });
      gsap.to(card, {
        rotateY: nx * 5,
        rotateX: -ny * 4,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      if (!card || !planeImgRef.current) return;
      gsap.to(planeImgRef.current, { x: 0, duration: 0.6, ease: 'power2.out' });
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
    };

    card?.addEventListener('mousemove', handleMove);
    card?.addEventListener('mouseleave', handleLeave);

    return () => {
      ctx.revert();
      card?.removeEventListener('mousemove', handleMove);
      card?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const flyToHub = (hub: HubInfo, openPopup = false) => {
    if (openPopup) {
      setPopupHub(hub);
    }
    gsap.to(progressObj.current, {
      value: hub.progress,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => syncPlaneToProgress(progressObj.current.value),
    });
  };

  const activeHub = PAKISTAN_HUBS[activeHubIndex];

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Cinematic Aerial Airplane Card */}
        <div
          ref={cardRef}
          className="lg:col-span-5 relative rounded-3xl overflow-hidden border-[1.5px] border-[#111111] shadow-[6px_6px_0px_#111111] bg-[#111111] min-h-[300px]"
        >
          <img
            ref={planeImgRef}
            src="/src/assets/images/pk_aerial_airplane_hd_1795072782713.jpg"
            alt="Commercial airliner ascending smoothly above golden-hour clouds and Karakoram peaks"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="text-xs font-mono text-[#C7F000]">DOMESTIC AVIATION</p>
              <p className="font-display text-xl sm:text-2xl font-semibold mt-0.5">
                Fly across Pakistan in comfort
              </p>
            </div>
            <span className="font-mono text-xs text-white/80 tabular-nums whitespace-nowrap">
              FL340 · KHI → KDU
            </span>
          </div>
        </div>

        {/* Interactive Scroll-Driven Pakistan Map Flight Corridor */}
        <div className="lg:col-span-7 bg-[#111111] text-white border-[1.5px] border-[#111111] rounded-3xl shadow-[6px_6px_0px_#C7F000] p-6 md:p-8 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[#C7F000]">PAKISTAN FLIGHT MAP · SCROLL TO FLY</span>
            <span className="text-white/65 tabular-nums">
              {activeHub.city.toUpperCase()} ({activeHub.code}) · {activeHub.flightTime}
            </span>
          </div>

          <div className="relative my-3">
            <svg
              viewBox="0 0 460 310"
              className="w-full h-64 md:h-72 overflow-visible"
              role="img"
              aria-label="Stylized map of Pakistan with animated airplane route from Karachi to Lahore, Islamabad, and Skardu"
            >
              {/* Stylized Minimalist Silhouette of Pakistan */}
              <path
                d="M 110 278 L 155 274 L 195 282 L 222 260 L 218 228 L 256 205 L 296 176 L 302 142 L 285 118 L 325 90 L 352 54 L 326 24 L 278 30 L 245 58 L 210 74 L 188 108 L 166 146 L 122 178 L 78 214 L 74 252 Z"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Subtle topographic latitude lines */}
              <line x1="40" y1="90" x2="420" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
              <line x1="40" y1="175" x2="420" y2="175" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
              <line x1="40" y1="255" x2="420" y2="255" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />

              {/* Dotted curved flight path: Karachi -> Lahore -> Islamabad -> Skardu */}
              <path
                d="M 155 265 C 215 245, 275 215, 278 168 C 280 140, 245 135, 256 112 C 266 90, 298 76, 325 52"
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="2"
                strokeDasharray="5 7"
              />

              {/* Active Neon-Lime Scroll-Progress Trail */}
              <path
                ref={trailRef}
                d="M 155 265 C 215 245, 275 215, 278 168 C 280 140, 245 135, 256 112 C 266 90, 298 76, 325 52"
                fill="none"
                stroke="#C7F000"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Hub Waypoints — Click to Activate Local Highlights Popup */}
              {PAKISTAN_HUBS.map((hub, idx) => {
                const isActive = idx === activeHubIndex;
                return (
                  <g
                    key={hub.code}
                    transform={`translate(${hub.x}, ${hub.y})`}
                    onClick={() => flyToHub(hub, true)}
                    className="cursor-pointer"
                  >
                    {isActive && <circle r="13" fill="#C7F000" fillOpacity="0.22" />}
                    <circle
                      r={isActive ? 6.5 : 5}
                      fill={isActive ? '#C7F000' : '#111111'}
                      stroke="#C7F000"
                      strokeWidth="2"
                    />
                    <text
                      x={hub.code === 'ISB' ? -14 : 12}
                      y={4}
                      textAnchor={hub.code === 'ISB' ? 'end' : 'start'}
                      fill={isActive ? '#C7F000' : 'rgba(255,255,255,0.85)'}
                      fontSize="11"
                      fontWeight={isActive ? '700' : '500'}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {hub.city} ({hub.code})
                    </text>
                  </g>
                );
              })}

              {/* Animated Airplane Icon */}
              <g ref={planeSvgRef} transform="translate(155, 265)">
                <circle r="15" fill="#C7F000" fillOpacity="0.2" />
                <path
                  d="M 13 0 L -7 -8.5 L -3.5 0 L -7 8.5 Z"
                  fill="#C7F000"
                  stroke="#111111"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {/* Interactive Route Transit Stat Labels (appear as airplane passes each leg) */}
            {ROUTE_LEGS.map((leg) => {
              const isPassed = currentProgress >= leg.triggerAt;
              return (
                <button
                  key={leg.id}
                  type="button"
                  onClick={() => flyToHub(PAKISTAN_HUBS[leg.targetHubIndex], true)}
                  style={{ left: `${leg.xPercent}%`, top: `${leg.yPercent}%` }}
                  className={`hidden sm:block absolute -translate-x-1/2 -translate-y-1/2 text-left px-3 py-2 rounded-xl border bg-[#161616]/95 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    isPassed
                      ? 'opacity-100 translate-y-0 border-[#C7F000]/75 shadow-[3px_3px_0px_#C7F000]'
                      : 'opacity-0 translate-y-2 pointer-events-none border-white/10'
                  }`}
                >
                  <p className="text-[11px] font-semibold text-[#C7F000] whitespace-nowrap">
                    {leg.label}
                  </p>
                  <p className="text-[10px] font-mono text-white/85 tabular-nums whitespace-nowrap mt-0.5">
                    {leg.stats}
                  </p>
                </button>
              );
            })}

            {/* Mobile-visible active route transit stats */}
            <div className="sm:hidden mt-3 flex flex-wrap gap-2">
              {ROUTE_LEGS.filter((leg) => currentProgress >= leg.triggerAt).map((leg) => (
                <button
                  key={leg.id}
                  type="button"
                  onClick={() => flyToHub(PAKISTAN_HUBS[leg.targetHubIndex], true)}
                  className="text-left px-3 py-1.5 rounded-xl border border-[#C7F000]/70 bg-[#161616] text-xs"
                >
                  <span className="font-semibold text-[#C7F000]">{leg.label}:</span>{' '}
                  <span className="font-mono text-[11px] text-white/80 tabular-nums">{leg.stats}</span>
                </button>
              ))}
            </div>
            {/* Click-to-Activate Local Highlights Popup Card */}
            {popupHub && (
              <div className="absolute left-3 right-3 sm:left-auto sm:right-3 bottom-2 z-20 sm:w-80 rounded-2xl bg-[#F5F2EA] text-[#111111] border-[1.5px] border-[#111111] shadow-[5px_5px_0px_#C7F000] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-[#111111]/60 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {popupHub.province} · Best: {popupHub.bestSeason}
                      </span>
                    </p>
                    <h3 className="font-display text-lg font-semibold text-[#111111] mt-0.5">
                      {popupHub.city} — Local Highlights
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPopupHub(null)}
                    aria-label="Close local highlights"
                    className="p-1 rounded-lg border border-[#111111]/20 hover:border-[#111111] text-[#111111] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <ul className="mt-3 space-y-1.5 text-xs text-[#111111]/85">
                  {popupHub.highlights.map((item, idx) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-semibold text-[#111111]/55 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Hub Selector Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-white/75">
              Click any city marker for Local Highlights · {activeHub.note}
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              {PAKISTAN_HUBS.map((hub, idx) => (
                <button
                  key={hub.code}
                  type="button"
                  onClick={() => flyToHub(hub, true)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                    idx === activeHubIndex
                      ? 'bg-[#C7F000] text-[#111111]'
                      : 'bg-white/10 text-white/75 hover:text-white'
                  }`}
                >
                  {hub.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
