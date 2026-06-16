import React, { useState } from "react";
import { Booking, Vehicle, VehicleCategory } from "../types";
import { VEHICLES, BRANCH_LOCATIONS } from "../data";
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Layers,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Sliders,
  Bell,
  Sparkles,
  PhoneCall,
  Edit2,
  Lock,
  Download,
  Check,
  Plus,
  RefreshCw,
  Eye,
  Trash2
} from "lucide-react";

interface AdminPanelProps {
  bookings: Booking[];
  vehicles: Vehicle[];
  onUpdateBookingStatus: (id: string, newStatus: Booking["status"]) => void;
  onUpdateVehiclePrice: (id: string, newPrice: number) => void;
  onDeleteBooking: (id: string) => void;
  onAddSampleBooking: () => void;
  onClose: () => void;
  leads: Array<{ id: string; name: string; phone: string; message: string; date: string; resolved: boolean }>;
  onResolveLead: (id: string) => void;
}

export default function AdminPanel({
  bookings,
  vehicles,
  onUpdateBookingStatus,
  onUpdateVehiclePrice,
  onDeleteBooking,
  onAddSampleBooking,
  onClose,
  leads,
  onResolveLead
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "fleet" | "leads">("dashboard");
  const [bookingFilter, setBookingFilter] = useState<Booking["status"] | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Stats Calculations
  const approvedBookings = bookings.filter((b) => b.status === "Potwierdzone" || b.status === "W realizacji" || b.status === "Zakończone");
  const totalRevenue = approvedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const averageValue = approvedBookings.length > 0 ? Math.round(totalRevenue / approvedBookings.length) : 0;
  const pendingCount = bookings.filter((b) => b.status === "Oczekuje na zatwierdzenie").length;
  const activeRentalsCount = bookings.filter((b) => b.status === "W realizacji").length;

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === "ALL" || b.status === bookingFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchLower) ||
      b.customerDetails.firstName.toLowerCase().includes(searchLower) ||
      b.customerDetails.lastName.toLowerCase().includes(searchLower) ||
      b.customerDetails.email.toLowerCase().includes(searchLower) ||
      b.vehicle.brand.toLowerCase().includes(searchLower) ||
      b.vehicle.model.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  const handlePriceEditSave = (id: string) => {
    if (tempPrice > 0) {
      onUpdateVehiclePrice(id, tempPrice);
      setEditingVehicleId(null);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8" id="admin-panel-main">
      
      {/* Premium Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-black text-orange-500 uppercase bg-orange-600/10 border border-orange-500/20 px-2.5 py-1 rounded-md w-max">
            <Lock className="h-3 w-3 mr-1" />
            <span>Pulpit Administracyjny • BR24 CLOUD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
            Kierowanie Flotą <span className="text-orange-500">busrent24.pl</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Zautomatyzowane zestawienie przychodów, stanów zajętości bazy oraz interaktywny edytor cennika online.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onAddSampleBooking}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-850 px-4 py-2 text-xs font-extrabold text-white rounded-lg transition shadow-md shadow-orange-600/10"
            id="admin-btn-generate-mock"
          >
            <Plus className="h-4 w-4" />
            <span>Dodaj losową rezerwację</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 sm:flex-initial text-xs font-bold text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800/50 py-2 px-4 rounded-lg transition"
            id="admin-btn-exit"
          >
            Wyjdź z panelu
          </button>
        </div>
      </div>

      {/* Navigation Sub-Menu Tabs */}
      <div className="flex overflow-x-auto space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-850 w-max max-w-full">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center space-x-2 text-xs font-extrabold px-4 py-2 rounded-lg transition ${
            activeTab === "dashboard" ? "bg-slate-900 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
          }`}
          id="admin-tab-overview"
        >
          <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
          <span>Statystyki & Przychody</span>
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`relative flex items-center space-x-2 text-xs font-extrabold px-4 py-2 rounded-lg transition ${
            activeTab === "bookings" ? "bg-slate-900 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
          }`}
          id="admin-tab-bookings"
        >
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
          <span>Wnioski Najmu</span>
          {pendingCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-orange-600 text-[9px] font-bold text-white animate-bounce">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("fleet")}
          className={`flex items-center space-x-2 text-xs font-extrabold px-4 py-2 rounded-lg transition ${
            activeTab === "fleet" ? "bg-slate-900 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
          }`}
          id="admin-tab-fleet"
        >
          <Sliders className="h-3.5 w-3.5 text-orange-500" />
          <span>Cennik & Samochody</span>
        </button>
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center space-x-2 text-xs font-extrabold px-4 py-2 rounded-lg transition ${
            activeTab === "leads" ? "bg-slate-900 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
          }`}
          id="admin-tab-leads"
        >
          <Bell className="h-3.5 w-3.5 text-orange-500" />
          <span>Zapytania (Leads)</span>
          {leads.filter(l => !l.resolved).length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-[9px] font-bold text-white">
              {leads.filter(l => !l.resolved).length}
            </span>
          )}
        </button>
      </div>

      {/* Tabs Contents Switch */}
      {activeTab === "dashboard" && (
        <div className="space-y-8" id="tab-dashboard">
          
          {/* Main SaaS KPI Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1 */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Obroty Zatwierdzone</span>
                <p className="text-2xl font-black font-mono text-white mt-1">
                  {totalRevenue} PLN
                </p>
                <p className="text-[10px] text-emerald-500 font-semibold">
                  + 100% rdr (Sesja testowa)
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-400 shrink-0">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Wszystkie Umowy</span>
                <p className="text-2xl font-black font-mono text-white mt-1">
                  {bookings.length} szt.
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {pendingCount} oczekuje na weryfikację
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-400 shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">W drodze (Active)</span>
                <p className="text-2xl font-black font-mono text-white mt-1">
                  {activeRentalsCount} busów
                </p>
                <p className="text-[10px] text-orange-400 font-medium font-semibold">
                  Stopień zajętości bazy: {Math.round((activeRentalsCount / vehicles.length) * 100)}%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-400 shrink-0">
                <Layers className="h-6 w-6" />
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Średnie Zamówienie</span>
                <p className="text-2xl font-black font-mono text-white mt-1">
                  {averageValue} PLN
                </p>
                <p className="text-[10px] text-emerald-400">
                  Wybrany pakiet: Premium Gold 85%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 border border-orange-500/20 text-orange-400 shrink-0">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>

          </div>

          {/* Quick guide on simulated backend for the client to download */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-sans font-extrabold text-sm uppercase tracking-widest text-orange-400 flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Instrukcja wdrożenia i Pobrania kodu źródłowego (PHP)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Ta interaktywna aplikacja została napisana przy użyciu nowoczesnego, ultraszybkiego framworka React. Jest w pełni przygotowana do integracji z Twoim serwerem PHP lub klasyczną bazą danych SQL w celu trwałego gromadzenia rezerwacji klientów.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h5 className="font-bold text-white mb-1">Darmowy eksport kodu ZIP:</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Możesz natychmiast wygenerować i pobrać kompletną paczkę z kodem źródłowym całej witryny. W tym celu kliknij w koło zębate (<em>Settings</em>) w prawym górnym rogu platformy Google AI Studio i wybierz opcję <strong>Export to ZIP</strong>. Projekt zawiera w pełni skonfigurowane biblioteki Vite, Tailwind CSS i kompletny interfejs.
                </p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h5 className="font-bold text-white mb-1">Obsługa formularzy w PHP:</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Aby automatycznie przesyłać rezerwacje z kalkulatora pod e-mail lub do bazy MySQL w PHP, wystarczy przekierować przesyłany pakiet payload za pomocą prostej metody <code>fetch(&quot;/api/booking.php&quot;, &#123; method: &quot;POST&quot; &#125;)</code>. Na Twoim serwerze funkcja <code>mail()</code> prześle szczegółową specyfikację w ciągu milisekund.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === "bookings" && (
        <div className="space-y-6" id="tab-bookings">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-850">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Szukaj kodu, nazwiska lub busa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-750 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto overflow-x-auto justify-end">
              {(["ALL", "Oczekuje na zatwierdzenie", "Potwierdzone", "W realizacji", "Zakończone", "Anulowane"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setBookingFilter(status)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-md border transition ${
                    bookingFilter === status
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {status === "ALL" ? "Wszystkie" : status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table / Cards list */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-slate-950 p-12 rounded-xl text-center border border-slate-850">
                <p className="text-xs text-slate-500 italic">
                  Nie odnaleziono żadnej rezerwacji spełniającej kryteria wyszukiwania.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 shadow hover:border-slate-700 transition"
                    id={`admin-booking-card-${b.bookingCode}`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/40 pb-3 text-xs">
                      <div>
                        <span className="font-mono text-sm font-bold text-orange-400 bg-orange-600/10 px-2.5 py-1 rounded">
                          {b.bookingCode}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-2">
                          Złożona: {new Date(b.createdAt).toLocaleString("pl-PL")}
                        </span>
                      </div>
                      
                      {/* Dynamic status badge styling */}
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        b.status === "Oczekuje na zatwierdzenie" ? "bg-amber-500/10 text-amber-500 border border-amber-500/25" :
                        b.status === "Potwierdzone" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25" :
                        b.status === "W realizacji" ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/25" :
                        b.status === "Anulowane" ? "bg-rose-500/10 text-rose-500 border border-rose-500/25" : "bg-slate-800 text-slate-400"
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      
                      {/* Vehicle & Duration */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-black uppercase tracking-wider">Pojazd i Najem</span>
                        <p className="font-bold text-slate-200">
                          {b.vehicle.brand} {b.vehicle.model}
                        </p>
                        <p className="text-slate-400">
                          Okres: {b.pickupDate} do {b.returnDate}
                        </p>
                        <p className="text-slate-400">
                          Łączny okres: <strong>{b.days} dni</strong>
                        </p>
                      </div>

                      {/* Locations */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-black uppercase tracking-wider">Logistyka (Baza)</span>
                        <p className="text-slate-300">
                          Miejsce odbioru: <strong>{b.pickupLocation.city}</strong>
                        </p>
                        <p className="text-slate-300">
                          Miejsce zwrotu: <strong>{b.returnLocation.city}</strong>
                        </p>
                        <p className="text-slate-400">
                          Dodatkowe opcje: {b.extras.length > 0 ? b.extras.map(e => e.name).join(", ") : "Brak"}
                        </p>
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-black uppercase tracking-wider">Osoba / Firma</span>
                        <p className="font-bold text-slate-200">
                          {b.customerDetails.firstName} {b.customerDetails.lastName}
                        </p>
                        <p className="text-slate-400">{b.customerDetails.phone}</p>
                        <p className="text-slate-400">{b.customerDetails.email}</p>
                        {b.customerDetails.isCompany && (
                          <div className="bg-orange-500/5 px-2 py-0.5 rounded text-[10px] text-orange-400 w-max border border-orange-500/20">
                            Firma: {b.customerDetails.companyName}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Bottom Billing Info & Status Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 p-3 rounded-lg border border-slate-800/40 text-xs gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400">Przychód z rezerwacji:</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-base font-bold text-white font-mono">{b.totalPrice} PLN</span>
                          <span className="text-[10px] text-slate-500">Netto (+23% VAT: {Math.round(b.totalPrice * 1.23)} zł)</span>
                        </div>
                      </div>

                      {/* Status changes and action controls */}
                      <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                        {b.status === "Oczekuje na zatwierdzenie" && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, "Potwierdzone")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded transition"
                          >
                            Zatwierdź umowę
                          </button>
                        )}
                        {b.status === "Potwierdzone" && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, "W realizacji")}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded transition"
                          >
                            Wydaj kluczyki (W drodze)
                          </button>
                        )}
                        {b.status === "W realizacji" && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, "Zakończone")}
                            className="bg-slate-700 hover:bg-slate-600 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded transition"
                          >
                            Odbierz pojazd (Zamknij)
                          </button>
                        )}
                        {b.status !== "Anulowane" && b.status !== "Zakończone" && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, "Anulowane")}
                            className="bg-rose-950/40 hover:bg-rose-900 border border-rose-500/25 text-rose-400 font-extrabold text-[10px] px-2.5 py-1.5 rounded transition"
                          >
                            Anuluj
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          className="bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 p-1.5 rounded transition"
                          title="Usuń całkowicie"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "fleet" && (
        <div className="space-y-6" id="tab-fleet">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
            <h4 className="font-extrabold text-white mb-1">Modyfikowanie Globalnego Cennika Busa</h4>
            <p className="text-slate-400">
              Ustalaj stawki dobowe dla poszczególnych modeli pojazdów. Wszelkie zmiany cen natychmiast wpłyną na interaktywny kalkulator klienta na stronie głównej oraz na formularz rezerwacji.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4"
                id={`admin-edit-vehicle-${v.id}`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="h-14 w-20 object-cover rounded-lg border border-slate-750"
                  />
                  <div>
                    <span className="text-[9px] font-mono text-orange-500 tracking-wider uppercase font-bold bg-orange-600/10 px-2 rounded">
                      {v.category}
                    </span>
                    <h5 className="font-bold text-slate-200 text-sm mt-1">{v.brand} {v.model}</h5>
                    <p className="text-[11px] text-slate-400">Standardowa kaucja depozytu: {v.deposit} PLN</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400">Obecna stawka za dzień:</span>
                    <p className="text-lg font-black font-mono text-orange-500">{v.basePricePerDay} PLN</p>
                  </div>

                  {editingVehicleId === v.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center font-mono focus:outline-none"
                      />
                      <button
                        onClick={() => handlePriceEditSave(v.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded transition"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingVehicleId(null)}
                        className="bg-slate-800 hover:bg-slate-750 text-slate-400 p-1 rounded transition"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingVehicleId(v.id);
                        setTempPrice(v.basePricePerDay);
                      }}
                      className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded transition"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Zmień cenę</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "leads" && (
        <div className="space-y-6" id="tab-leads">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-slate-400">
            Zestawienie indywidualnych zapytań pochodzących z formularza kontaktowego. Możesz kliknąć &quot;Oznacz jako obsłużone&quot;, żeby przenieść do archiwum.
          </div>

          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="bg-slate-950 p-10 rounded-xl border border-slate-850 text-center text-slate-500 italic text-xs">
                Aktualnie brak dodatkowych zapytań o ofertę indywidualną.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className={`p-5 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition ${
                      l.resolved ? "bg-slate-950/45 border-slate-900 text-slate-500" : "bg-slate-950 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-sm">{l.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">({l.date})</span>
                        {l.resolved && (
                          <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold">
                            Rozwiązane
                          </span>
                        )}
                      </div>
                      <p className="flex items-center space-x-1.5 font-bold text-orange-400">
                        <PhoneCall className="h-3 w-3 shrink-0" />
                        <span>{l.phone}</span>
                      </p>
                      <p className="italic text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-850/60 leading-relaxed mt-2 text-[11px]">
                        &quot;{l.message}&quot;
                      </p>
                    </div>

                    {!l.resolved && (
                      <button
                        onClick={() => onResolveLead(l.id)}
                        className="bg-emerald-600/10 hover:bg-emerald-600 hover:text-white border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-lg transition shrink-0 self-end sm:self-center"
                      >
                        Oznacz jako obsłużone ✓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
