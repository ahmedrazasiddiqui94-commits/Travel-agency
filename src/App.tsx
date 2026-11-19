import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import {
  BANNER_SLIDES,
  CUSTOMER_REVIEWS,
  HOME_FEATURES,
  INITIAL_BOOKINGS,
  INITIAL_LISTINGS,
  TEAM_MEMBERS,
  TRAVEL_PACKAGES,
  type BookingRecord,
  type BookingStatus,
  type ListingItem,
  type UserAccount,
} from './data/karnelData';
import { Navbar, type PageRoute } from './components/Navbar';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { OrbitalCanvas } from './components/OrbitalCanvas';

const DEFAULT_CUSTOMER: UserAccount = {
  name: 'Amina Khan',
  email: 'customer@karneltravels.com',
  phone: '+92 300 555 0192',
  city: 'Karachi',
  password: 'password123',
  role: 'customer',
};

const DEFAULT_ADMIN: UserAccount = {
  name: 'Hamza Karnel',
  email: 'admin@karneltravels.com',
  phone: '+92 21 555 0100',
  city: 'Karachi',
  password: 'admin123',
  role: 'admin',
};

export default function App() {
  const [route, setRoute] = useState<PageRoute>({ page: 'home' });
  const [bannerIndex, setBannerIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('karnel_bookings_v1');
      return saved ? (JSON.parse(saved) as BookingRecord[]) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [users, setUsers] = useState<UserAccount[]>([DEFAULT_CUSTOMER, DEFAULT_ADMIN]);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Booking Form State
  const [bookCheckIn, setBookCheckIn] = useState('2026-12-20');
  const [bookCheckOut, setBookCheckOut] = useState('2026-12-23');
  const [bookGuests, setBookGuests] = useState(2);
  const [bookSuccessId, setBookSuccessId] = useState<string | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('karnel_bookings_v1', JSON.stringify(bookings));
    } catch {
      // ignore storage quota errors
    }
  }, [bookings]);

  // Auto-advance hero banner slider every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((i) => (i + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleBookNow = (itemId: string) => {
    setBookSuccessId(null);
    setRoute({ page: 'booking', itemId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'register') {
      if (!authName.trim() || !authEmail.trim() || authPassword.length < 6) {
        setAuthError('Please enter your name, email, and a password of at least 6 characters.');
        return;
      }
      if (users.some((u) => u.email.toLowerCase() === authEmail.trim().toLowerCase())) {
        setAuthError('An account with this email already exists.');
        return;
      }
      const created: UserAccount = {
        name: authName.trim(),
        email: authEmail.trim(),
        phone: '',
        city: '',
        password: authPassword,
        role: 'customer',
      };
      setUsers((prev) => [...prev, created]);
      setCurrentUser(created);
      setRoute({ page: 'customer-dashboard' });
    } else {
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === authEmail.trim().toLowerCase() &&
          u.password === authPassword
      );
      if (!found) {
        setAuthError('Invalid email or password. Use the quick demo buttons below to preview.');
        return;
      }
      setCurrentUser(found);
      setRoute({ page: found.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard' });
    }
  };

  const handleConfirmBooking = (e: FormEvent, item: { id: string; name: string; category: string; location: string; price: number }) => {
    e.preventDefault();
    const activeUser = currentUser ?? DEFAULT_CUSTOMER;
    if (!currentUser) {
      setCurrentUser(DEFAULT_CUSTOMER);
    }
    const newBooking: BookingRecord = {
      id: `KT-${Math.floor(1050 + Math.random() * 8900)}`,
      customerEmail: activeUser.email,
      customerName: activeUser.name,
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      location: item.location,
      checkIn: bookCheckIn,
      checkOut: bookCheckOut,
      guests: bookGuests,
      totalPrice: item.price * Math.max(1, bookGuests),
      status: 'Upcoming',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setBookings((prev) => [newBooking, ...prev]);
    setBookSuccessId(newBooking.id);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
  };

  const handleUpdateProfile = (updated: UserAccount) => {
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.email === updated.email ? updated : u)));
  };

  const currentSlide = BANNER_SLIDES[bannerIndex];

  // Resolve booking target (either a ListingItem or a TravelPackage)
  const bookingTarget =
    route.page === 'booking'
      ? listings.find((l) => l.id === route.itemId) ||
        (() => {
          const pkg = TRAVEL_PACKAGES.find((p) => p.id === route.itemId);
          return pkg
            ? {
                id: pkg.id,
                name: pkg.name,
                category: 'Packages',
                location: pkg.location,
                price: pkg.price,
                image: pkg.image,
                description: pkg.summary,
              }
            : null;
        })()
      : null;

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#111111] flex flex-col">
      <Navbar route={route} onNavigate={setRoute} currentUser={currentUser} />

      <main className="flex-1">
        {/* HOME PAGE */}
        {route.page === 'home' && (
          <>
            {/* 1. Banner Section with Image Slider & 3D Floating Sculpture */}
            <section className="py-12 md:py-16">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-mono text-[#111111]/60 mb-4">
                        {currentSlide.kicker}
                      </p>
                      <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight text-balance">
                        {currentSlide.title}
                      </h1>
                      <p className="mt-5 text-base text-[#111111]/70 max-w-xl leading-relaxed">
                        {currentSlide.subtitle}
                      </p>
                      <p className="mt-4 text-xs font-semibold text-[#111111]">
                        Current Offer: <span className="bg-[#C7F000] px-2 py-0.5">{currentSlide.offer}</span>
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setRoute({ page: 'search', category: 'hotels' })}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] text-white text-sm font-semibold border border-[#111111] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#C7F000] transition-all cursor-pointer"
                        >
                          <span>Explore & Book</span>
                          <ArrowUpRight className="w-4 h-4 text-[#C7F000]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setRoute({ page: 'info', topic: 'travel-info' })}
                          className="text-sm font-medium underline underline-offset-4 cursor-pointer"
                        >
                          Travel Information
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Previous slide"
                          onClick={() =>
                            setBannerIndex((i) => (i - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)
                          }
                          className="w-10 h-10 rounded-xl border-[1.5px] border-[#111111] bg-white hover:bg-[#C7F000] flex items-center justify-center cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next slide"
                          onClick={() => setBannerIndex((i) => (i + 1) % BANNER_SLIDES.length)}
                          className="w-10 h-10 rounded-xl border-[1.5px] border-[#111111] bg-white hover:bg-[#C7F000] flex items-center justify-center cursor-pointer"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative">
                    <div className="relative h-full min-h-[340px] lg:min-h-[440px] rounded-2xl overflow-hidden border-[1.5px] border-[#111111] shadow-[6px_6px_0px_#111111] bg-[#111111]">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90 font-mono">
                        <span>0{bannerIndex + 1} / 0{BANNER_SLIDES.length}</span>
                        <span className="text-[#C7F000]">KARNEL VERIFIED</span>
                      </div>
                    </div>

                    {/* 3D Floating Orbital Sculpture */}
                    <div className="hidden md:block absolute -bottom-8 -left-10 w-36 h-36 rounded-full bg-[#F5F2EA] border-[1.5px] border-[#111111] shadow-[4px_4px_0px_#111111] overflow-hidden">
                      <OrbitalCanvas className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Our Features */}
            <section className="py-20 bg-white border-y-[1.5px] border-[#111111]">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                  <p className="text-xs font-mono text-[#111111]/60 mb-2">OUR FEATURES</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    Everything you need for seamless global travel.
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {HOME_FEATURES.map((feat) => (
                    <div
                      key={feat.number}
                      className="rounded-2xl bg-[#F5F2EA] border-[1.5px] border-[#111111] p-6 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#111111]"
                    >
                      <p className="font-mono text-xs text-[#111111]/55">{feat.number}</p>
                      <h3 className="font-display text-xl font-semibold mt-3">{feat.title}</h3>
                      <p className="text-sm text-[#111111]/70 mt-2 leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Packages (Dark Bento Showcase) */}
            <section className="py-24 bg-[#111111] text-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <p className="text-xs font-mono text-[#C7F000] mb-2">CURATED PACKAGES</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                      Signature Karnel Travels Packages
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'search', category: 'resorts' })}
                    className="text-xs font-semibold text-[#C7F000] underline underline-offset-4 self-start md:self-auto cursor-pointer"
                  >
                    View All Resorts & Stays
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {TRAVEL_PACKAGES.map((pkg) => (
                    <article
                      key={pkg.id}
                      className="group rounded-2xl overflow-hidden border border-white/15 bg-[#1A1A1A] flex flex-col"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <p className="text-xs text-white/60">
                            {pkg.location} · {pkg.duration}
                          </p>
                          <h3 className="font-display text-2xl font-semibold mt-1.5">{pkg.name}</h3>
                          <p className="text-sm text-white/70 mt-2">{pkg.summary}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-xl font-semibold text-[#C7F000] tabular-nums">
                            ${pkg.price.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleBookNow(pkg.id)}
                            className="px-4 py-2 rounded-xl bg-[#C7F000] text-[#111111] text-xs font-semibold hover:bg-[#b8de00] cursor-pointer"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Why Choose Us + 5. Customer Reviews Slider */}
            <section className="py-24 bg-[#F5F2EA]">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5">
                  <p className="text-xs font-mono text-[#111111]/60 mb-2">WHY CHOOSE US</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    Built for clarity, speed, and verified hospitality.
                  </h2>
                  <ul className="mt-6 space-y-3 text-sm text-[#111111]/75">
                    <li>01. Direct partner rates with zero hidden booking fees.</li>
                    <li>02. Dedicated Customer Dashboard to track confirmed & upcoming trips.</li>
                    <li>03. Curated hotels, restaurants, tourist spots, and resorts under one roof.</li>
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#111111] p-8">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-xs font-mono text-[#111111]/60">CUSTOMER REVIEWS</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Previous review"
                          onClick={() =>
                            setReviewIndex((i) => (i - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length)
                          }
                          className="w-9 h-9 rounded-lg border border-[#111111] hover:bg-[#C7F000] flex items-center justify-center cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next review"
                          onClick={() => setReviewIndex((i) => (i + 1) % CUSTOMER_REVIEWS.length)}
                          className="w-9 h-9 rounded-lg border border-[#111111] hover:bg-[#C7F000] flex items-center justify-center cursor-pointer"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <blockquote className="space-y-5">
                      <p className="text-lg sm:text-xl font-medium leading-relaxed text-[#111111]">
                        “{CUSTOMER_REVIEWS[reviewIndex].quote}”
                      </p>
                      <footer className="pt-4 border-t border-[#D9D7D0]">
                        <p className="text-sm font-semibold">{CUSTOMER_REVIEWS[reviewIndex].author}</p>
                        <p className="text-xs text-[#111111]/60">
                          {CUSTOMER_REVIEWS[reviewIndex].role} · {CUSTOMER_REVIEWS[reviewIndex].trip}
                        </p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ABOUT PAGE */}
        {route.page === 'about' && (
          <section className="py-16 md:py-24 bg-[#F5F2EA]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
              {/* Banner Slider */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6">
                  <p className="text-xs font-mono text-[#111111]/60 mb-3">ABOUT KARNEL TRAVELS</p>
                  <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                    Modern travel architecture rooted in reliability.
                  </h1>
                  <p className="mt-4 text-base text-[#111111]/70 leading-relaxed">
                    Karnel Travels connects discerning travelers with verified hotels, fine restaurants, iconic tourist spots, and serene resorts—backed by real-time booking management.
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border-[1.5px] border-[#111111] shadow-[5px_5px_0px_#111111] aspect-[16/10]">
                    <img
                      src={BANNER_SLIDES[bannerIndex].image}
                      alt="Karnel Travels Showcase"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-8">
                  <p className="text-xs font-mono text-[#111111]/55 mb-2">OUR VISION</p>
                  <h2 className="font-display text-2xl font-semibold">Effortless global discovery</h2>
                  <p className="mt-3 text-sm text-[#111111]/75 leading-relaxed">
                    To become the most trusted minimalist travel platform where every hotel, restaurant, resort, and tour is vetted for quality and booked with total transparency.
                  </p>
                </div>
                <div className="bg-[#111111] text-white border-[1.5px] border-[#111111] rounded-2xl p-8">
                  <p className="text-xs font-mono text-[#C7F000] mb-2">OUR MISSION</p>
                  <h2 className="font-display text-2xl font-semibold">Design-led hospitality & service</h2>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">
                    To simplify trip planning through structured information, instant filtering, and responsive customer and admin dashboards that keep every itinerary on schedule.
                  </p>
                </div>
              </div>

              {/* Our Services */}
              <div>
                <h2 className="font-display text-3xl font-semibold mb-6">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {HOME_FEATURES.map((s) => (
                    <div key={s.number} className="bg-white border border-[#111111]/25 rounded-2xl p-6">
                      <p className="font-mono text-xs text-[#111111]/55">{s.number}</p>
                      <h3 className="font-display text-xl font-semibold mt-2">{s.title}</h3>
                      <p className="text-sm text-[#111111]/70 mt-2">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Team */}
              <div>
                <h2 className="font-display text-3xl font-semibold mb-6">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TEAM_MEMBERS.map((member) => (
                    <div
                      key={member.name}
                      className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6"
                    >
                      <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                      <p className="text-xs font-mono text-[#111111]/60 mt-1">{member.role}</p>
                      <p className="text-sm text-[#111111]/75 mt-3 leading-relaxed">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEARCH PAGES (Hotels, Restaurants, Tourist Spots, Resorts) */}
        {route.page === 'search' && (
          <SearchSection
            category={route.category}
            listings={listings}
            onSwitchCategory={(cat) => setRoute({ page: 'search', category: cat })}
            onBookNow={handleBookNow}
          />
        )}

        {/* INFORMATION PAGES */}
        {route.page === 'info' && (
          <InfoSection
            topic={route.topic}
            listings={listings}
            onSwitchTopic={(topic) => setRoute({ page: 'info', topic })}
            onGoSearch={(cat) => setRoute({ page: 'search', category: cat })}
          />
        )}

        {/* CONTACT PAGE */}
        {route.page === 'contact' && (
          <section className="py-16 md:py-24 bg-[#F5F2EA]">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <p className="text-xs font-mono text-[#111111]/60 mb-2">CONTACT KARNEL TRAVELS</p>
                <h1 className="font-display text-4xl font-semibold tracking-tight">
                  Speak with our travel advisors.
                </h1>
                <p className="mt-4 text-sm text-[#111111]/70 leading-relaxed">
                  Have questions about packages, hotel availability, or group bookings? Send us a message or reach our WhatsApp desk directly.
                </p>
                <div className="mt-8 space-y-2 text-sm">
                  <p><strong>Email:</strong> concierge@karneltravels.com</p>
                  <p><strong>Phone:</strong> +92 21 555 0192</p>
                  <p><strong>Office:</strong> Clifton Block 4, Karachi</p>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#111111] p-7">
                {contactSent ? (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-[#111111]" />
                    <h2 className="font-display text-2xl font-semibold">Message Sent</h2>
                    <p className="text-sm text-[#111111]/70">
                      Thank you, {contactName}. Our team will reply to {contactEmail} shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSent(false);
                        setContactMessage('');
                      }}
                      className="px-4 py-2 rounded-xl border border-[#111111] text-xs font-semibold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (contactName.trim() && contactEmail.trim()) setContactSent(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Message</label>
                      <textarea
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#C7F000] border border-[#111111] text-[#111111] text-xs font-semibold cursor-pointer"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* REGISTER / LOGIN PAGE */}
        {route.page === 'auth' && (
          <section className="py-16 md:py-24 bg-[#F5F2EA]">
            <div className="max-w-md mx-auto px-6">
              <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[6px_6px_0px_#111111] p-8">
                <div className="flex gap-2 p-1 bg-[#F5F2EA] rounded-xl border border-[#D9D7D0] mb-6">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
                      authMode === 'login' ? 'bg-[#111111] text-[#C7F000]' : 'text-[#111111]/70'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
                      authMode === 'register' ? 'bg-[#111111] text-[#C7F000]' : 'text-[#111111]/70'
                    }`}
                  >
                    Register
                  </button>
                </div>

                <h1 className="font-display text-2xl font-semibold text-[#111111] mb-4">
                  {authMode === 'login' ? 'Sign in to Karnel Travels' : 'Create Customer Account'}
                </h1>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Password</label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                      required
                    />
                  </div>
                  {authError && <p className="text-xs text-red-700">{authError}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C7F000] border border-[#111111] text-[#111111] text-xs font-semibold cursor-pointer"
                  >
                    {authMode === 'login' ? 'Login' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-[#D9D7D0] space-y-2">
                  <p className="text-xs font-mono text-[#111111]/55">QUICK DASHBOARD ACCESS</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser(DEFAULT_CUSTOMER);
                        setRoute({ page: 'customer-dashboard' });
                      }}
                      className="py-2 px-3 rounded-xl bg-[#111111] text-white text-xs font-semibold cursor-pointer"
                    >
                      Customer Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser(DEFAULT_ADMIN);
                        setRoute({ page: 'admin-dashboard' });
                      }}
                      className="py-2 px-3 rounded-xl border border-[#111111] text-[#111111] text-xs font-semibold hover:bg-[#F5F2EA] cursor-pointer"
                    >
                      Admin Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BOOKING PAGE */}
        {route.page === 'booking' && bookingTarget && (
          <section className="py-16 md:py-24 bg-[#F5F2EA]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[6px_6px_0px_#111111] overflow-hidden grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-5 bg-[#111111] text-white flex flex-col">
                  <img
                    src={bookingTarget.image}
                    alt={bookingTarget.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 md:h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 p-7 md:p-9">
                  {bookSuccessId ? (
                    <div className="space-y-4 py-6">
                      <CheckCircle2 className="w-10 h-10 text-[#111111]" />
                      <h1 className="font-display text-2xl font-semibold">Booking Recorded</h1>
                      <p className="text-sm text-[#111111]/75">
                        Reference <strong>{bookSuccessId}</strong> for <strong>{bookingTarget.name}</strong> has been added to your Customer Dashboard.
                      </p>
                      <button
                        type="button"
                        onClick={() => setRoute({ page: 'customer-dashboard' })}
                        className="px-5 py-2.5 rounded-xl bg-[#111111] text-[#C7F000] text-xs font-semibold cursor-pointer"
                      >
                        View in Customer Dashboard
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => handleConfirmBooking(e, bookingTarget)}
                      className="space-y-4"
                    >
                      <p className="text-xs font-mono text-[#111111]/55">KARNEL BOOKING DESK</p>
                      <h1 className="font-display text-2xl font-semibold">{bookingTarget.name}</h1>
                      <p className="text-xs text-[#111111]/65">{bookingTarget.location}</p>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-medium text-[#111111]/70 mb-1">Check-In / Date</label>
                          <input
                            type="date"
                            value={bookCheckIn}
                            onChange={(e) => setBookCheckIn(e.target.value)}
                            className="w-full px-3 py-2 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#111111]/70 mb-1">Check-Out</label>
                          <input
                            type="date"
                            value={bookCheckOut}
                            onChange={(e) => setBookCheckOut(e.target.value)}
                            className="w-full px-3 py-2 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#111111]/70 mb-1">Guests</label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={bookGuests}
                          onChange={(e) => setBookGuests(Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                          required
                        />
                      </div>

                      <div className="pt-3 border-t border-[#D9D7D0] flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#111111]/60">Estimated Total</p>
                          <p className="font-display text-2xl font-semibold tabular-nums">
                            ${(bookingTarget.price * Math.max(1, bookGuests)).toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-[#C7F000] border border-[#111111] text-[#111111] text-xs font-semibold cursor-pointer"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CUSTOMER DASHBOARD */}
        {route.page === 'customer-dashboard' && currentUser && (
          <CustomerDashboard
            user={currentUser}
            bookings={bookings}
            onCancelBooking={(id) => handleUpdateBookingStatus(id, 'Cancelled')}
            onUpdateProfile={handleUpdateProfile}
            onLogout={() => {
              setCurrentUser(null);
              setRoute({ page: 'home' });
            }}
            onBrowseSearch={() => setRoute({ page: 'search', category: 'hotels' })}
          />
        )}

        {/* ADMIN DASHBOARD */}
        {route.page === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            user={currentUser}
            bookings={bookings}
            listings={listings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onAddListing={(item) => setListings((prev) => [item, ...prev])}
            onLogout={() => {
              setCurrentUser(null);
              setRoute({ page: 'home' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">KARNEL TRAVELS</p>
            <p className="text-xs text-white/55 mt-1">
              Hotels · Restaurants · Tourist Spots · Resorts · Packages
            </p>
          </div>
          <a
            href="https://wa.me/92215550192?text=Hello%20Karnel%20Travels%2C%20I%20would%20like%20assistance%20with%20a%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C7F000] text-[#111111] text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
