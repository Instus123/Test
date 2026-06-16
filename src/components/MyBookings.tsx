import React, { useState } from "react";
import { Booking } from "../types";
import { Search, Calendar, MapPin, Shield, Check, XCircle, FileText, Sparkles, ChevronRight } from "lucide-react";

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onClose: () => void;
}

export default function MyBookings({ bookings, onCancelBooking, onClose }: MyBookingsProps) {
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const code = searchCode.trim().toUpperCase();
    const found = bookings.find((b) => b.bookingCode === code);
    setSearchResult(found || null);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6" id="my-bookings-panel">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-sans font-black text-xl sm:text-2xl text-white">
            Panel Klienta <span className="text-orange-500 font-bold">busrent24.pl</span>
          </h3>
          <p className="text-xs text-slate-400">
            Wyszukaj, zweryfikuj lub anuluj swoją rezerwację online.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-400 hover:text-white border border-slate-700 py-1.5 px-3 rounded-lg transition"
          id="close-bookings-btn"
        >
          Powrót
        </button>
      </div>

      {/* Row grid: Search and All Created Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Search Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center space-x-1.5">
              <Search className="h-4 w-4 text-orange-500" />
              <span>Wyszukaj kod rezerwacji</span>
            </h4>
            <p className="text-[11px] text-slate-400 mb-4">
              Wprowadź 10-znakowy kod otrzymany po przesłaniu wniosku o rezerwację (np. BR24-XXXXX).
            </p>

            <form onSubmit={handleSearch} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="np. BR24-AB123"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm uppercase tracking-wider text-white font-mono placeholder:lowercase"
                  id="search-code-input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2.5 rounded-lg transition"
                id="search-booking-submit"
              >
                Szukaj rezerwacji
              </button>
            </form>
          </div>

          {/* List of active session bookings (quick shortcut) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Twoje rezerwacje w tej sesji ({bookings.length})
            </h4>
            
            {bookings.length === 0 ? (
              <p className="text-xs text-slate-500 italic bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
                Brak zarejestrowanych rezerwacji. Skorzystaj z kalkulatora, aby przesłać zapytanie.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setSearchCode(b.bookingCode);
                      setSearchResult(b);
                      setHasSearched(true);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer text-left transition ${
                      searchResult?.id === b.id
                        ? "border-orange-500 bg-orange-500/10 text-white"
                        : "border-slate-800 bg-slate-950 hover:bg-slate-900"
                    }`}
                    id={`active-booking-shortcut-${b.bookingCode}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-orange-400 uppercase">
                        {b.bookingCode}
                      </span>
                      <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 mt-1">
                      {b.vehicle.brand} {b.vehicle.model}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {b.pickupDate} do {b.returnDate} ({b.days} dni)
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Results Display Sheet / Detailed Mock Invoice */}
        <div className="lg:col-span-7">
          {hasSearched ? (
            searchResult ? (
              <div className="bg-white text-slate-900 rounded-xl border border-slate-300 p-6 sm:p-8 space-y-6 relative overflow-hidden" id="sheet-result">
                
                {/* Visual Status Stamp watermark */}
                <div className="absolute top-4 right-4 transform rotate-12 border-2 border-orange-600 rounded px-3 py-1 text-xs font-black uppercase tracking-widest text-orange-600 opacity-80 font-mono">
                  {searchResult.status}
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-semibold">
                    Karta rezerwacji klienta
                  </p>
                  <h4 className="text-xl font-black text-slate-950 font-sans mt-1">
                    KOD: {searchResult.bookingCode}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Złożona: {new Date(searchResult.createdAt).toLocaleString("pl-PL")}
                  </p>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Główny Kierowca</span>
                    <p className="font-bold text-slate-850">
                      {searchResult.customerDetails.firstName} {searchResult.customerDetails.lastName}
                    </p>
                    <p className="text-slate-500 mt-0.5">{searchResult.customerDetails.email}</p>
                    <p className="text-slate-500">{searchResult.customerDetails.phone}</p>
                  </div>
                  {searchResult.customerDetails.isCompany && (
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase">Faktura na firmę</span>
                      <p className="font-bold text-slate-850">
                        {searchResult.customerDetails.companyName}
                      </p>
                      <p className="text-slate-500 mt-0.5">NIP: {searchResult.customerDetails.companyNip}</p>
                    </div>
                  )}
                </div>

                {/* Locations and Schedule */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-1.5">
                      <MapPin className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Odbiór pojazdu</span>
                        <p className="font-bold text-slate-800">{searchResult.pickupLocation.name}</p>
                        <p className="text-slate-400 text-[10px] leading-tight">{searchResult.pickupLocation.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[9px] uppercase font-bold">Data startu</span>
                      <p className="font-mono font-bold text-slate-800">{searchResult.pickupDate}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-start border-t border-slate-200 pt-3">
                    <div className="flex items-start space-x-1.5">
                      <MapPin className="h-4 w-4 text-range-600 mt-0.5" />
                      <div>
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Zwrot pojazdu</span>
                        <p className="font-bold text-slate-800">{searchResult.returnLocation.name}</p>
                        <p className="text-slate-400 text-[10px] leading-tight">{searchResult.returnLocation.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[9px] uppercase font-bold">Data końca</span>
                      <p className="font-mono font-bold text-slate-800">{searchResult.returnDate}</p>
                    </div>
                  </div>
                </div>

                {/* Specific details inside the card */}
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                    Skonfigurowany pojazd
                  </h5>
                  <div className="flex justify-between text-xs text-slate-800 border-b border-slate-100 pb-1.5">
                    <span className="font-bold">{searchResult.vehicle.brand} {searchResult.vehicle.model}</span>
                    <span>{searchResult.days} dni x {searchResult.vehicle.basePricePerDay} zł</span>
                  </div>

                  {/* Extras nested list */}
                  {searchResult.extras && searchResult.extras.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {searchResult.extras.map((ex: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs text-slate-500">
                          <span>+ {ex.name}</span>
                          <span>{ex.price} zł</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Insurance level detail */}
                  <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                    <span>Ochrona: {searchResult.insuranceType === "premium" ? "Pakiet Premium Gold" : "Standard"}</span>
                    <span>{searchResult.insurancePrice} zł</span>
                  </div>
                </div>

                {/* Cost breakup block */}
                <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest">
                      Ostateczna Cena (Netto)
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Brutto: {Math.round(searchResult.totalPrice * 1.23)} PLN z VAT
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-mono text-orange-500">
                      {searchResult.totalPrice} PLN
                    </span>
                  </div>
                </div>

                {/* Customer Actions for self-simulated cancelation */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-[10px] text-slate-400 italic">
                    * Zmiana terminu lub usunięcie rezerwacji jest bezpłatne przed fizycznym podpisaniem umowy.
                  </p>
                  {searchResult.status !== "Anulowane" && (
                    <button
                      type="button"
                      onClick={() => {
                        onCancelBooking(searchResult.id);
                        // update locally
                        setSearchResult({ ...searchResult, status: "Anulowane" });
                      }}
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-1.5 px-3 rounded-lg border border-red-200 transition"
                      id="cancel-reservation-btn"
                    >
                      Anuluj zapytanie
                    </button>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-3" id="no-result">
                <XCircle className="h-12 w-12 text-rose-500 mx-auto" />
                <h4 className="text-md font-bold text-white">
                  Nie odnaleziono podanej rezerwacji
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Sprawdź, czy kod nie zawiera literówki (np. BR24-XXXXX). Pamiętaj, że rezerwacja zrobiona na stronie zapisuje się w pamięci Twojej przeglądarki.
                </p>
              </div>
            )
          ) : (
            <div className="bg-slate-950/50 p-12 rounded-xl border border-slate-850 text-center flex flex-col justify-center items-center h-full min-h-[300px]" id="prompt-select">
              <FileText className="h-10 w-10 text-slate-600 mb-2" />
              <p className="text-xs text-slate-400">
                Wybierz aktywną rezerwację z listy po lewej stronie lub wpisz kod rezerwacji, aby uzyskać szczegółową specyfikację oraz status.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
