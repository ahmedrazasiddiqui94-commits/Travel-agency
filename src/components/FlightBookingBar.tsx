import { useState, type FormEvent } from 'react';
import { ArrowLeftRight, Calendar, CheckCircle2, Plane, Users } from 'lucide-react';
import { POPULAR_AIRPORTS } from '../data/travelData';

type TripType = 'round-trip' | 'one-way' | 'multi-city';
type CabinClass = 'Business' | 'First' | 'Private Charter';

interface FlightRequestSummary {
  tripType: TripType;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  cabin: CabinClass;
}

export function FlightBookingBar() {
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [origin, setOrigin] = useState('LHR — London Heathrow');
  const [destination, setDestination] = useState('HND — Tokyo Haneda');
  const [departureDate, setDepartureDate] = useState('2026-12-10');
  const [returnDate, setReturnDate] = useState('2026-12-19');
  const [passengers, setPassengers] = useState(2);
  const [cabin, setCabin] = useState<CabinClass>('Business');
  const [error, setError] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<FlightRequestSummary | null>(null);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!origin.trim() || !destination.trim()) {
      setError('Please select both an origin and a destination airport.');
      return;
    }
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError('Origin and destination must be different.');
      return;
    }
    if (!departureDate) {
      setError('Please choose a departure date.');
      return;
    }
    if (tripType === 'round-trip' && returnDate && returnDate < departureDate) {
      setError('Return date must be on or after the departure date.');
      return;
    }

    setSubmittedRequest({
      tripType,
      origin,
      destination,
      departureDate,
      returnDate: tripType === 'one-way' ? '' : returnDate,
      passengers,
      cabin,
    });
  };

  const whatsappFlightUrl = submittedRequest
    ? `https://wa.me/41445802910?text=${encodeURIComponent(
        `Hello Meridian Flight Desk, I would like a ${submittedRequest.cabin} itinerary quote (${submittedRequest.tripType}) from ${submittedRequest.origin} to ${submittedRequest.destination}, departing ${submittedRequest.departureDate}${
          submittedRequest.returnDate ? ` and returning ${submittedRequest.returnDate}` : ''
        } for ${submittedRequest.passengers} traveler(s).`
      )}`
    : '#inquire';

  return (
    <div className="bg-white border border-[#D9D7D0] rounded-2xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9D7D0]">
        <div>
          <h2 className="text-lg font-semibold text-[#111111] tracking-tight">
            Flight Desk Inquiry
          </h2>
          <p className="text-sm text-[#111111]/65 mt-0.5">
            Commercial first/business routing and private charter quotes prepared by our aviation advisors.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Trip type"
          className="inline-flex items-center p-1 bg-[#F5F2EA] rounded-lg border border-[#D9D7D0] self-start sm:self-auto"
        >
          {(
            [
              { id: 'round-trip', label: 'Round-Trip' },
              { id: 'one-way', label: 'One-Way' },
              { id: 'multi-city', label: 'Multi-City' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tripType === tab.id}
              onClick={() => {
                setTripType(tab.id);
                setSubmittedRequest(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                tripType === tab.id
                  ? 'bg-[#111111] text-white'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Origin */}
          <div className="md:col-span-3">
            <label htmlFor="flight-origin" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
              From
            </label>
            <div className="relative">
              <Plane className="w-4 h-4 text-[#111111]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="flight-origin"
                list="airport-list"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="City or IATA code"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                required
              />
            </div>
          </div>

          {/* Swap button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap origin and destination"
              className="w-10 h-10 rounded-xl border border-[#D9D7D0] bg-[#F5F2EA] hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-3">
            <label htmlFor="flight-destination" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
              To
            </label>
            <div className="relative">
              <Plane className="w-4 h-4 text-[#111111]/45 absolute left-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              <input
                id="flight-destination"
                list="airport-list"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City or IATA code"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className={tripType === 'one-way' ? 'md:col-span-3' : 'md:col-span-2'}>
            <label htmlFor="flight-departure" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
              Departure
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#111111]/45 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="flight-departure"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full pl-9 pr-2.5 py-2.5 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          {tripType !== 'one-way' && (
            <div className="md:col-span-3">
              <label htmlFor="flight-return" className="block text-xs font-medium text-[#111111]/70 mb-1.5">
                Return
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#111111]/45 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="flight-return"
                  type="date"
                  value={returnDate}
                  min={departureDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-9 pr-2.5 py-2.5 text-sm tabular-nums bg-[#F5F2EA]/60 border border-[#D9D7D0] rounded-xl text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        <datalist id="airport-list">
          {POPULAR_AIRPORTS.map((airport) => (
            <option key={airport} value={airport} />
          ))}
        </datalist>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#111111]/55" />
              <label htmlFor="flight-passengers" className="text-xs font-medium text-[#111111]/70">
                Travelers
              </label>
              <select
                id="flight-passengers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="px-3 py-1.5 text-sm tabular-nums bg-[#F5F2EA] border border-[#D9D7D0] rounded-lg text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              {(['Business', 'First', 'Private Charter'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setCabin(tier)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    cabin === tier
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white text-[#111111]/75 border-[#D9D7D0] hover:border-[#111111]'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="magnetic-btn px-6 py-3 rounded-xl bg-[#C7F000] hover:bg-[#b8de00] text-[#111111] text-sm font-semibold transition-transform whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Flight Options
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {error}
          </p>
        )}

        {submittedRequest && (
          <div className="mt-4 p-5 rounded-xl bg-[#111111] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C7F000] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">
                  Flight desk request prepared — no ticket has been charged.
                </p>
                <p className="text-xs text-white/75 mt-1 tabular-nums">
                  {submittedRequest.origin} → {submittedRequest.destination} · {submittedRequest.departureDate}
                  {submittedRequest.returnDate ? ` to ${submittedRequest.returnDate}` : ''} · {submittedRequest.passengers}{' '}
                  {submittedRequest.passengers === 1 ? 'traveler' : 'travelers'} · {submittedRequest.cabin}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={whatsappFlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#C7F000] text-[#111111] text-xs font-semibold hover:bg-[#b8de00] transition-colors whitespace-nowrap"
              >
                Send via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSubmittedRequest(null)}
                className="px-3 py-2 rounded-lg border border-white/20 text-xs text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
