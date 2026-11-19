import { useState, type FormEvent } from 'react';
import { Check, LogOut, Plus, X } from 'lucide-react';
import type { BookingRecord, BookingStatus, ListingCategory, ListingItem, UserAccount } from '../data/karnelData';

interface AdminDashboardProps {
  user: UserAccount;
  bookings: BookingRecord[];
  listings: ListingItem[];
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onAddListing: (item: ListingItem) => void;
  onLogout: () => void;
}

export function AdminDashboard({
  user,
  bookings,
  listings,
  onUpdateBookingStatus,
  onAddListing,
  onLogout,
}: AdminDashboardProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ListingCategory>('hotels');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(280);
  const [quality, setQuality] = useState(5);
  const [description, setDescription] = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    const newItem: ListingItem = {
      id: `custom-${Date.now()}`,
      category,
      name: name.trim(),
      location: location.trim(),
      price: Number(price) || 200,
      priceUnit: category === 'restaurants' ? 'per guest' : category === 'spots' ? 'per tour' : 'per night',
      quality,
      availableFrom: '2026-11-01',
      availableTo: '2027-12-31',
      description: description.trim() || 'Curated Karnel Travels property added by operations desk.',
      amenities: ['Verified Partner', 'Instant Booking', '24/7 Support'],
      image: '/src/assets/images/hero_amalfi_villa_1795068049695.jpg',
    };

    onAddListing(newItem);
    setName('');
    setLocation('');
    setDescription('');
    setAddedMsg(`Added "${newItem.name}" to ${category}.`);
    setTimeout(() => setAddedMsg(''), 3000);
  };

  return (
    <section className="py-12 md:py-16 bg-[#F5F2EA] min-h-[82vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-[#111111]/60">KARNEL TRAVELS OPERATIONS</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
              Admin Dashboard
            </h1>
            <p className="text-xs text-[#111111]/65 mt-1">Signed in as {user.email}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-[1.5px] border-[#111111] bg-white text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors self-start cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6">
            <p className="text-xs text-[#111111]/65">Total Platform Bookings</p>
            <p className="font-display text-4xl font-semibold tabular-nums mt-2">{bookings.length}</p>
          </div>
          <div className="bg-[#C7F000]/35 border-[1.5px] border-[#111111] rounded-2xl p-6">
            <p className="text-xs text-[#111111]/65">Confirmed Revenue</p>
            <p className="font-display text-4xl font-semibold tabular-nums mt-2">
              $
              {bookings
                .filter((b) => b.status === 'Confirmed')
                .reduce((sum, b) => sum + b.totalPrice, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6">
            <p className="text-xs text-[#111111]/65">Active Directory Listings</p>
            <p className="font-display text-4xl font-semibold tabular-nums mt-2">{listings.length}</p>
          </div>
        </div>

        {/* Manage Customer Bookings */}
        <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-[#111111] mb-5">
            Manage Customer Bookings
          </h2>
          <div className="divide-y divide-[#D9D7D0]">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-mono text-[#111111]/55">
                    {b.id} · {b.customerName} ({b.customerEmail}) · Status: <strong className="text-[#111111]">{b.status}</strong>
                  </p>
                  <p className="text-sm font-semibold text-[#111111] mt-1">
                    {b.itemName} — {b.location}
                  </p>
                  <p className="text-xs text-[#111111]/65 tabular-nums">
                    {b.checkIn} to {b.checkOut} · {b.guests} guest(s) · ${b.totalPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#C7F000] border border-[#111111] text-xs font-semibold text-[#111111] cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateBookingStatus(b.id, 'Cancelled')}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-red-300 text-xs font-semibold text-red-700 hover:bg-red-50 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Listing */}
        <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-[#111111] mb-5">
            Add New Listing to Directory
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ListingCategory)}
                className="w-full px-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
              >
                <option value="hotels">Hotels</option>
                <option value="restaurants">Restaurants</option>
                <option value="spots">Tourist Spots</option>
                <option value="resorts">Resorts</option>
              </select>
            </div>
            <div className="md:col-span-4">
              <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Property / Spot Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alpine Glass Chalet"
                className="w-full px-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Zermatt, Switzerland"
                className="w-full px-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
                required
              />
            </div>
            <div className="md:col-span-9">
              <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short architectural or travel summary..."
                className="w-full px-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl"
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-[#C7F000] text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Listing</span>
              </button>
            </div>
          </form>
          {addedMsg && <p className="text-xs font-medium text-emerald-700 mt-3">{addedMsg}</p>}
        </div>
      </div>
    </section>
  );
}
