import { useState, type FormEvent } from 'react';
import { CalendarCheck, CheckCircle2, LayoutDashboard, LogOut, User, XCircle } from 'lucide-react';
import type { BookingRecord, UserAccount } from '../data/karnelData';

type DashTab = 'overview' | 'bookings' | 'cancelled' | 'confirmed' | 'profile';

interface CustomerDashboardProps {
  user: UserAccount;
  bookings: BookingRecord[];
  onCancelBooking: (bookingId: string) => void;
  onUpdateProfile: (updated: UserAccount) => void;
  onLogout: () => void;
  onBrowseSearch: () => void;
}

export function CustomerDashboard({
  user,
  bookings,
  onCancelBooking,
  onUpdateProfile,
  onLogout,
  onBrowseSearch,
}: CustomerDashboardProps) {
  const [tab, setTab] = useState<DashTab>('overview');

  // Profile state
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [profileSaved, setProfileSaved] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const userBookings = bookings.filter(
    (b) => b.customerEmail.toLowerCase() === user.email.toLowerCase()
  );
  const totalCount = userBookings.length;
  const upcomingCount = userBookings.filter((b) => b.status === 'Upcoming').length;
  const confirmedCount = userBookings.filter((b) => b.status === 'Confirmed').length;
  const cancelledCount = userBookings.filter((b) => b.status === 'Cancelled').length;

  const displayedBookings =
    tab === 'cancelled'
      ? userBookings.filter((b) => b.status === 'Cancelled')
      : tab === 'confirmed'
      ? userBookings.filter((b) => b.status === 'Confirmed')
      : userBookings;

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ ...user, name: name.trim() || user.name, phone: phone.trim(), city: city.trim() });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (currentPassword !== user.password) {
      setPasswordMessage('Current password does not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters.');
      return;
    }
    onUpdateProfile({ ...user, password: newPassword });
    setCurrentPassword('');
    setNewPassword('');
    setPasswordMessage('Password updated successfully.');
  };

  return (
    <section className="py-12 md:py-16 bg-[#F5F2EA] min-h-[82vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-white border-[1.5px] border-[#111111] rounded-2xl shadow-[5px_5px_0px_#111111] p-5 space-y-2">
            <div className="pb-4 mb-2 border-b border-[#D9D7D0]">
              <p className="text-xs font-mono text-[#111111]/55">CUSTOMER PORTAL</p>
              <p className="font-display text-lg font-semibold text-[#111111] mt-1">{user.name}</p>
              <p className="text-xs text-[#111111]/60 truncate">{user.email}</p>
            </div>

            {(
              [
                { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
                { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
                { id: 'confirmed', label: 'Confirmed Bookings', icon: CheckCircle2 },
                { id: 'cancelled', label: 'Cancelled Bookings', icon: XCircle },
                { id: 'profile', label: 'Profile', icon: User },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    tab === item.id
                      ? 'bg-[#111111] text-[#C7F000]'
                      : 'text-[#111111]/80 hover:bg-[#F5F2EA]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-[#D9D7D0]">
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 space-y-6">
            {tab === 'overview' && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl font-semibold text-[#111111]">
                      Dashboard Overview
                    </h1>
                    <p className="text-sm text-[#111111]/65 mt-1">
                      Live summary of your Karnel Travels reservations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onBrowseSearch}
                    className="px-5 py-2.5 rounded-xl bg-[#C7F000] border border-[#111111] text-[#111111] text-xs font-semibold hover:bg-[#b8de00] transition-colors self-start cursor-pointer"
                  >
                    + New Booking
                  </button>
                </div>

                {/* 4 KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Bookings', value: totalCount, accent: 'bg-white' },
                    { label: 'Upcoming Bookings', value: upcomingCount, accent: 'bg-[#F5F2EA]' },
                    { label: 'Confirmed Bookings', value: confirmedCount, accent: 'bg-[#C7F000]/30' },
                    { label: 'Cancelled Bookings', value: cancelledCount, accent: 'bg-white' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`${stat.accent} border-[1.5px] border-[#111111] rounded-2xl p-6`}
                    >
                      <p className="text-xs font-medium text-[#111111]/65">{stat.label}</p>
                      <p className="font-display text-4xl font-semibold tabular-nums text-[#111111] mt-2">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity Preview */}
                <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6">
                  <h2 className="font-display text-xl font-semibold text-[#111111] mb-4">
                    Recent Bookings
                  </h2>
                  {userBookings.length === 0 ? (
                    <p className="text-sm text-[#111111]/65">No bookings yet. Explore our Search directory to book a stay or tour.</p>
                  ) : (
                    <div className="divide-y divide-[#D9D7D0]">
                      {userBookings.slice(0, 4).map((b) => (
                        <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#111111]">{b.itemName}</p>
                            <p className="text-xs text-[#111111]/60 tabular-nums mt-0.5">
                              {b.id} · {b.category} · {b.location} · {b.checkIn}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm font-semibold tabular-nums">Rs. {b.totalPrice.toLocaleString()}</span>
                            <span className="text-xs font-semibold text-[#111111]">{b.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {(tab === 'bookings' || tab === 'cancelled' || tab === 'confirmed') && (
              <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6 md:p-8">
                <h1 className="font-display text-2xl font-semibold text-[#111111] mb-6">
                  {tab === 'bookings'
                    ? 'All Bookings'
                    : tab === 'confirmed'
                    ? 'Confirmed Bookings'
                    : 'Cancelled Bookings'}
                </h1>

                {displayedBookings.length === 0 ? (
                  <p className="text-sm text-[#111111]/65">No bookings in this category.</p>
                ) : (
                  <div className="divide-y divide-[#D9D7D0]">
                    {displayedBookings.map((b) => (
                      <div
                        key={b.id}
                        className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-xs font-mono text-[#111111]/55">
                            {b.id} · {b.category} · Status: <strong className="text-[#111111]">{b.status}</strong>
                          </p>
                          <h2 className="font-display text-lg font-semibold text-[#111111] mt-1">
                            {b.itemName}
                          </h2>
                          <p className="text-xs text-[#111111]/65 mt-1 tabular-nums">
                            {b.location} · Check-in {b.checkIn} to {b.checkOut} · {b.guests} guest(s)
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono text-base font-semibold tabular-nums">
                            Rs. {b.totalPrice.toLocaleString()}
                          </span>
                          {b.status !== 'Cancelled' && (
                            <button
                              type="button"
                              onClick={() => onCancelBooking(b.id)}
                              className="px-3.5 py-2 rounded-lg border border-red-300 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6 md:p-8">
                  <h1 className="font-display text-2xl font-semibold text-[#111111] mb-6">
                    Personal Information
                  </h1>
                  <form onSubmit={handleProfileSave} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Email (Read-Only)</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA] border border-[#D9D7D0] rounded-xl text-[#111111]/60"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#C7F000] border border-[#111111] text-[#111111] text-xs font-semibold cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                    {profileSaved && (
                      <p className="text-xs font-medium text-emerald-700">Profile updated successfully.</p>
                    )}
                  </form>
                </div>

                <div className="bg-white border-[1.5px] border-[#111111] rounded-2xl p-6 md:p-8">
                  <h2 className="font-display text-xl font-semibold text-[#111111] mb-4">
                    Change / Reset Password
                  </h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111111]/70 mb-1.5">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold cursor-pointer"
                    >
                      Update Password
                    </button>
                    {passwordMessage && (
                      <p className="text-xs font-medium text-[#111111]">{passwordMessage}</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
