import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { ListingCategory, UserAccount } from '../data/karnelData';
import { KarnelLogo } from './KarnelLogo';

export type PageRoute =
  | { page: 'home' }
  | { page: 'about' }
  | { page: 'search'; category: ListingCategory }
  | { page: 'info'; topic: 'tourist-spots' | 'travel-info' | 'hotel-info' | 'restaurant-info' | 'resorts-info' }
  | { page: 'contact' }
  | { page: 'auth' }
  | { page: 'booking'; itemId: string }
  | { page: 'customer-dashboard' }
  | { page: 'admin-dashboard' };

interface NavbarProps {
  route: PageRoute;
  onNavigate: (next: PageRoute) => void;
  currentUser: UserAccount | null;
}

export function Navbar({ route, onNavigate, currentUser }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<'search' | 'info' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (next: PageRoute) => {
    onNavigate(next);
    setOpenDropdown(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardClick = () => {
    if (!currentUser) {
      go({ page: 'auth' });
    } else if (currentUser.role === 'admin') {
      go({ page: 'admin-dashboard' });
    } else {
      go({ page: 'customer-dashboard' });
    }
  };

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Floating Glassmorphism Bento Bar */}
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-[#F5F2EA]/75 backdrop-blur-xl border border-[#111111]/15 shadow-[0_10px_30px_rgba(17,17,17,0.06)]">
          {/* Segment 1: Branding (Logo Emblem Only) */}
          <div className="flex items-center rounded-xl bg-white/75 border border-[#111111]/10 p-1.5 shrink-0">
            <button
              type="button"
              onClick={() => go({ page: 'home' })}
              className="cursor-pointer flex items-center justify-center"
              aria-label="Karnel Travels Home"
            >
              <KarnelLogo variant="light" iconOnly />
            </button>
          </div>

          {/* Segment 2: Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center justify-center gap-6 flex-1 rounded-xl bg-white/60 border border-[#111111]/10 px-6 py-2 text-sm font-medium text-[#111111]"
          >
            <button
              type="button"
              onClick={() => go({ page: 'home' })}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.page === 'home'
                  ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#111111]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => go({ page: 'about' })}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.page === 'about'
                  ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#111111]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              About
            </button>

            {/* Search Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('search')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'search' ? null : 'search')}
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  route.page === 'search'
                    ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#111111]'
                    : 'text-[#111111]/70 hover:text-[#111111]'
                }`}
              >
                <span>Search</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'search' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-56">
                  <div className="bg-white/95 backdrop-blur-xl border border-[#111111]/15 rounded-2xl shadow-[0_14px_34px_rgba(17,17,17,0.12)] p-1.5 space-y-0.5">
                    {(
                      [
                        { cat: 'hotels', label: 'Search Hotels' },
                        { cat: 'restaurants', label: 'Search Restaurants' },
                        { cat: 'spots', label: 'Search Tourist Spots' },
                        { cat: 'resorts', label: 'Search Resorts' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.cat}
                        type="button"
                        onClick={() => go({ page: 'search', category: item.cat })}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium rounded-xl hover:bg-[#C7F000] text-[#111111] transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Information Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('info')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'info' ? null : 'info')}
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  route.page === 'info'
                    ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#111111]'
                    : 'text-[#111111]/70 hover:text-[#111111]'
                }`}
              >
                <span>Information</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'info' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-56">
                  <div className="bg-white/95 backdrop-blur-xl border border-[#111111]/15 rounded-2xl shadow-[0_14px_34px_rgba(17,17,17,0.12)] p-1.5 space-y-0.5">
                    {(
                      [
                        { topic: 'tourist-spots', label: 'Tourist Spots' },
                        { topic: 'travel-info', label: 'Travel Information' },
                        { topic: 'hotel-info', label: 'Hotel Information' },
                        { topic: 'restaurant-info', label: 'Restaurant Information' },
                        { topic: 'resorts-info', label: 'Resorts Information' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.topic}
                        type="button"
                        onClick={() => go({ page: 'info', topic: item.topic })}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium rounded-xl hover:bg-[#C7F000] text-[#111111] transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => go({ page: 'contact' })}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.page === 'contact'
                  ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-[#111111]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Segment 3: Dashboard Action */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleDashboardClick}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold border border-[#111111] hover:bg-[#C7F000] hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {currentUser
                ? currentUser.role === 'admin'
                  ? 'Admin Dashboard'
                  : 'Dashboard'
                : 'Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-xl bg-white/75 border border-[#111111]/15 text-[#111111]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Floating Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 rounded-2xl bg-[#F5F2EA]/95 backdrop-blur-xl border border-[#111111]/15 shadow-[0_14px_34px_rgba(17,17,17,0.12)] px-5 py-5 space-y-4">
            <div className="flex flex-col gap-2 text-sm font-medium">
              <button type="button" onClick={() => go({ page: 'home' })} className="text-left py-1.5">Home</button>
              <button type="button" onClick={() => go({ page: 'about' })} className="text-left py-1.5">About</button>
              <p className="text-xs font-mono text-[#111111]/50 pt-2">SEARCH</p>
              <button type="button" onClick={() => go({ page: 'search', category: 'hotels' })} className="text-left pl-3 py-1">Search Hotels</button>
              <button type="button" onClick={() => go({ page: 'search', category: 'restaurants' })} className="text-left pl-3 py-1">Search Restaurants</button>
              <button type="button" onClick={() => go({ page: 'search', category: 'spots' })} className="text-left pl-3 py-1">Search Tourist Spots</button>
              <button type="button" onClick={() => go({ page: 'search', category: 'resorts' })} className="text-left pl-3 py-1">Search Resorts</button>
              <p className="text-xs font-mono text-[#111111]/50 pt-2">INFORMATION</p>
              <button type="button" onClick={() => go({ page: 'info', topic: 'tourist-spots' })} className="text-left pl-3 py-1">Tourist Spots</button>
              <button type="button" onClick={() => go({ page: 'info', topic: 'travel-info' })} className="text-left pl-3 py-1">Travel Information</button>
              <button type="button" onClick={() => go({ page: 'info', topic: 'hotel-info' })} className="text-left pl-3 py-1">Hotel Information</button>
              <button type="button" onClick={() => go({ page: 'info', topic: 'restaurant-info' })} className="text-left pl-3 py-1">Restaurant Information</button>
              <button type="button" onClick={() => go({ page: 'info', topic: 'resorts-info' })} className="text-left pl-3 py-1">Resorts Information</button>
              <button type="button" onClick={() => go({ page: 'contact' })} className="text-left py-1.5 pt-2">Contact</button>
            </div>
            <button
              type="button"
              onClick={handleDashboardClick}
              className="w-full py-2.5 rounded-xl bg-[#111111] text-white text-sm font-semibold"
            >
              {currentUser ? 'Open Dashboard' : 'Dashboard'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
