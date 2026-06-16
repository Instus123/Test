import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Fleet from "./components/Fleet";
import BookingCalculator from "./components/BookingCalculator";
import MyBookings from "./components/MyBookings";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import PhpTemplateBox from "./components/PhpTemplateBox";
import { FAQ_ITEMS, VEHICLES, BRANCH_LOCATIONS } from "./data";
import { Vehicle, Booking, VehicleCategory } from "./types";
import { Check, ShieldCheck, Star, Sparkles, MessageSquare, Info, Send, Phone, Clipboard, Bell } from "lucide-react";

export default function App() {
  // State for Booking persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("busrent24_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("busrent24_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Dynamic vehicles state
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem("busrent24_vehicles");
    return saved ? JSON.parse(saved) : VEHICLES;
  });

  useEffect(() => {
    localStorage.setItem("busrent24_vehicles", JSON.stringify(vehiclesList));
  }, [vehiclesList]);

  // Leads statistics lists
  const [leads, setLeads] = useState<Array<{ id: string; name: string; phone: string; message: string; date: string; resolved: boolean }>>(() => {
    const saved = localStorage.getItem("busrent24_leads");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "lead-1",
        name: "Andrzej Kowalski",
        phone: "+48 501 234 567",
        message: "Szukam dostawczaka Renault Master na 3 tygodnie do przeprowadzki biura do Niemiec. Czy zdejmujecie limit kilometrów?",
        date: "2026-06-15 11:20",
        resolved: false
      },
      {
        id: "lead-2",
        name: "TransPol Sp. z o.o.",
        phone: "+48 600 700 800",
        message: "Dzień dobry, interesuje nas wynajem 3 minibusów 9-osobowych (Toyota Proace) na wyjazd wakacyjny dla pracowników w sierpniu. Jaka cena brutto z pełnym pakietem Gold?",
        date: "2026-06-16 09:45",
        resolved: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("busrent24_leads", JSON.stringify(leads));
  }, [leads]);

  // UI state controllers
  const [preselectedVehicle, setPreselectedVehicle] = useState<Vehicle | null>(null);
  const [calculatorPickupLoc, setCalculatorPickupLoc] = useState<string>("WAW");
  const [calculatorPickupDate, setCalculatorPickupDate] = useState<string>("");

  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Completed booking modal notifier
  const [newBookingSuccess, setNewBookingSuccess] = useState<Booking | null>(null);

  // Simple customer contact form state
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Dynamic navigational scroll utility
  const handleScrollToSection = (sectionId: string) => {
    setShowMyBookings(false); // return to home views
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // When clicking on a vehicle card "Skonfiguruj"
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setPreselectedVehicle(vehicle);
    handleScrollToSection("booking-calculator");
  };

  // Start pricing from quick hero panel
  const handleHeroStartBooking = (category: VehicleCategory | "all", pickupLocId: string, dateStr: string) => {
    // Select first matching category vehicle if applicable
    if (category !== "all") {
      const match = vehiclesList.find((v) => v.category === category);
      if (match) setPreselectedVehicle(match);
    } else {
      setPreselectedVehicle(vehiclesList[0]); // default to first
    }
    setCalculatorPickupLoc(pickupLocId);
    setCalculatorPickupDate(dateStr);
    handleScrollToSection("booking-calculator");
  };

  // Submit complete booking logic
  const handleCompleteBooking = (details: any) => {
    // Generate distinct booking code
    const listChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codeBody = "";
    for (let i = 0; i < 5; i++) {
      codeBody += listChars.charAt(Math.floor(Math.random() * listChars.length));
    }
    const finalBookingCode = `BR24-${codeBody}`;

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      bookingCode: finalBookingCode,
      vehicle: details.vehicle,
      pickupLocation: details.pickupLocation,
      returnLocation: details.returnLocation,
      pickupDate: details.pickupDate,
      returnDate: details.returnDate,
      days: details.days,
      extras: details.extras,
      insuranceType: details.insuranceType,
      insurancePrice: details.insurancePrice,
      totalPrice: details.totalPrice,
      customerDetails: details.customerDetails,
      status: "Oczekuje na zatwierdzenie",
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setNewBookingSuccess(newBooking);
    
    // Auto clear configuration but scroll focus
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel booking action (updates status locally)
  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Anulowane" as const } : b))
    );
  };

  // Admin dynamic control hooks
  const handleUpdateBookingStatus = (id: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleUpdateVehiclePrice = (id: string, newPrice: number) => {
    setVehiclesList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, basePricePerDay: newPrice } : v))
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleResolveLead = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, resolved: true } : l))
    );
  };

  const handleGenerateSampleBooking = () => {
    const listFirstNames = ["Jan", "Tomasz", "Mateusz", "Krzysztof", "Anna", "Katarzyna", "Piotr", "Marek"];
    const listLastNames = ["Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Mazur", "Krawczyk", "Zając"];
    
    const randomFirstName = listFirstNames[Math.floor(Math.random() * listFirstNames.length)];
    const randomLastName = listLastNames[Math.floor(Math.random() * listLastNames.length)];
    const randomVehicle = vehiclesList[Math.floor(Math.random() * vehiclesList.length)];
    
    const dCount = Math.floor(Math.random() * 8) + 2; 
    const totalCost = randomVehicle.basePricePerDay * dCount + 150; 

    const listChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codeBody = "";
    for (let i = 0; i < 5; i++) {
      codeBody += listChars.charAt(Math.floor(Math.random() * listChars.length));
    }
    const sampleCode = `BR24-${codeBody}`;

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      bookingCode: sampleCode,
      vehicle: randomVehicle,
      pickupLocation: BRANCH_LOCATIONS[0],
      returnLocation: BRANCH_LOCATIONS[0],
      pickupDate: "2026-06-18",
      returnDate: "2026-06-22",
      days: dCount,
      extras: [{ optionId: "gps", name: "Nawigacja GPS", price: 40 }],
      insuranceType: "premium",
      insurancePrice: 200,
      totalPrice: totalCost,
      customerDetails: {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@test-mail.pl`,
        phone: `+48 ${Math.floor(Math.random() * 899 + 100)} ${Math.floor(Math.random() * 899 + 100)} ${Math.floor(Math.random() * 899 + 100)}`,
        isCompany: Math.random() > 0.5,
        companyName: Math.random() > 0.5 ? "Trans-Janusz S.A." : undefined,
        comments: "Szybka rezerwacja automatyczna dla testów bazy admina."
      },
      status: "Oczekuje na zatwierdzenie",
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: `lead-${Date.now()}`,
      name: contactName,
      phone: contactPhone,
      message: contactMsg,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      resolved: false
    };
    setLeads((prev) => [newLead, ...prev]);
    setContactSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactPhone("");
      setContactMsg("");
      setContactSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="web-root">
      
      {/* Top Warning regarding PHP server context */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-semibold select-none border-b border-amber-600/20">
        Wypożyczalnia samochodów <strong>busrent24.pl</strong>. 
        <span className="hidden md:inline"> Strona zbudowana w nowoczesnej technologii Single-Page React (TypeScript) – zapewnia błyskawiczny czas reakcji, pełny interaktywny kalkulator i zapamiętuje Twoje rezerwacje!</span>
      </div>

      <Navbar
        onNavClick={handleScrollToSection}
        onMyBookingsClick={() => { setShowMyBookings(true); setShowAdminPanel(false); }}
        onAdminClick={() => { setShowAdminPanel(!showAdminPanel); setShowMyBookings(false); }}
        isAdminActive={showAdminPanel}
        bookingsCount={bookings.filter(b => b.status !== "Anulowane").length}
      />

      {/* Main success popup notification */}
      {newBookingSuccess && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 text-slate-900" id="success-modal">
            
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-2xl tracking-tight text-slate-900">
                Zapytanie rezerwacyjne wysłane!
              </h3>
              <p className="text-sm text-slate-500">
                Twoje zgłoszenie oznaczono kodem:
              </p>
              <div className="inline-block bg-slate-100 rounded-lg px-4 py-2 border border-slate-300">
                <span className="font-mono text-xl font-bold tracking-widest text-orange-600">
                  {newBookingSuccess.bookingCode}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Wybrany Busa:</span>
                <span className="font-bold">{newBookingSuccess.vehicle.brand} {newBookingSuccess.vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Czas trwania:</span>
                <span className="font-semibold">{newBookingSuccess.days} {newBookingSuccess.days === 1 ? 'doba' : 'dni'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Zadeklarowany koszt:</span>
                <span className="font-mono font-bold text-orange-600">{newBookingSuccess.totalPrice} PLN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Miejsce odbioru:</span>
                <span className="font-medium text-slate-700">{newBookingSuccess.pickupLocation.city}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Dziękujemy za zaufanie do <strong>busrent24.pl</strong>! Nasz dyspozytor weryfikuje teraz status pojazdu i wyśle oficjalne potwierdzenie z instrukcjami kaucji na adres: <strong>{newBookingSuccess.customerDetails.email}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  setNewBookingSuccess(null);
                  setShowMyBookings(true);
                }}
                className="flex-1 bg-slate-900 text-white rounded-lg py-2.5 text-xs font-bold hover:bg-slate-800 transition"
                id="modal-btn-view"
              >
                Sprawdź status w panelu
              </button>
              <button
                onClick={() => setNewBookingSuccess(null)}
                className="flex-1 bg-orange-600 text-white rounded-lg py-2.5 text-xs font-bold hover:bg-orange-700 transition"
                id="modal-btn-close"
              >
                Zamknij i kontynuuj
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Main Body view routing */}
      <main className="flex-1">
        {showAdminPanel ? (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <AdminPanel
              bookings={bookings}
              vehicles={vehiclesList}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdateVehiclePrice={handleUpdateVehiclePrice}
              onDeleteBooking={handleDeleteBooking}
              onAddSampleBooking={handleGenerateSampleBooking}
              onClose={() => setShowAdminPanel(false)}
              leads={leads}
              onResolveLead={handleResolveLead}
            />
          </div>
        ) : showMyBookings ? (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <MyBookings
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onClose={() => setShowMyBookings(false)}
            />
          </div>
        ) : (
          <>
            {/* Hero Main Slider */}
            <Hero onStartBooking={handleHeroStartBooking} />

            {/* Middle Trust Pointers */}
            <section className="bg-white border-y border-slate-200 py-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-orange-600">2025</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Najnowsze modele busów</p>
                  </div>
                  <div className="space-y-1 border-l border-slate-200">
                    <p className="text-2xl font-black text-orange-600">15 min</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Czas reakcji na zapytanie</p>
                  </div>
                  <div className="space-y-1 border-l border-slate-200">
                    <p className="text-2xl font-black text-orange-600">0 zł</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Opłaty za rezygnację</p>
                  </div>
                  <div className="space-y-1 border-l border-slate-200">
                    <p className="text-2xl font-black text-orange-600">100%</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Zadowolonych klientów</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fleet section */}
            <Fleet onSelectVehicle={handleSelectVehicle} vehicles={vehiclesList} />

            {/* Booking calculator element */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="calculator-section">
              <BookingCalculator
                preselectedVehicle={preselectedVehicle}
                initialPickupLocId={calculatorPickupLoc}
                initialPickupDate={calculatorPickupDate}
                onBookingComplete={handleCompleteBooking}
                onResetVehicle={() => setPreselectedVehicle(null)}
                vehiclesList={vehiclesList}
              />
            </section>

            {/* Why choose us Section (Zalety busrent24.pl) */}
            <section className="bg-slate-900 text-white py-16 sm:py-24" id="why-us">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase bg-orange-600/10 border border-orange-500/20 px-3 py-1 rounded-full">
                    Atuty busrent24.pl
                  </span>
                  <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
                    Dlaczego warto wybrać naszą wypożyczalnię?
                  </h2>
                  <p className="mt-4 text-sm text-slate-400">
                    Dbamy o Twój komfort od momentu złożenia rezerwacji do bezpiecznego zwrotu pojazdu. Przekonaj się, dlaczego zaufały nam setki firm i klientów prywatnych.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/20 border border-orange-500/20 text-orange-400">
                      <Star className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      Najbardziej czytelny system
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Brak skomplikowanych umów i ukrytych opłat za ubezpieczenie. Wszystkie koszty (np. kaucja, bazy, opcje dodatkowe) generują się natychmiast na Twoim ekranie.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/20 border border-orange-500/20 text-orange-400">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      Przejrzyste ubezpieczenia
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Zalecany pakiet Premium Gold całkowicie znosi udział własny w jakichkolwiek szkodach i kolizjach drogowych. Wybierasz spokój ducha i podróżujesz bez stresu.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/20 border border-orange-500/20 text-orange-400">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      Nienaganny stan techniczny
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Każdy z naszych busów wraca najpierw na kompletną kontrolę techniczną i dezynfekcję. Samochód otrzymujesz czysty, pachnący i w 100% sprawny do drogowej eksploatacji.
                    </p>
                  </div>
                </div>

                {/* Real Testimonial blocks */}
                <div className="mt-16 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8">
                  <h3 className="text-center font-bold text-lg mb-6">Co o nas mówią nasi stali klienci?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                    <div className="space-y-2 pr-0 sm:pr-8">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 italic">
                        &quot;Wynająłem Renault Master na przeprowadzkę domu ze Skarżyska do Kielc. Auto wyjątkowo zadbane, czyste, pasy ściągające w cenie. Żadnych problemów z limitem kilometrów. Gorąco polecam!&quot;
                      </p>
                      <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">— Mariusz K., Skarżysko-Kamienna</p>
                    </div>

                    <div className="space-y-2 pt-6 sm:pt-0 sm:pl-8">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 italic">
                        &quot;Mocno polecam Fiat Ducato Maxi z tutejszej bazy. Służył nam przy hurtowym przewozie materiałów wykończeniowych dla naszej firmy. Świetny kontakt z obsługą na Legionów i natychmiastowy zwrot kaucji.&quot;
                      </p>
                      <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">— Barbara W., Radom</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* PHP & CSS Template Download module */}
            <PhpTemplateBox />

            {/* FAQ interactive grid */}
            <section className="bg-slate-50 py-16 sm:py-24 border-b border-rose-100" id="faq">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                
                <h3 className="text-center font-extrabold text-3xl text-slate-900 tracking-tight">
                  Najczęściej zadawane pytania (<span className="text-orange-600">FAQ</span>)
                </h3>
                <p className="text-center text-sm text-slate-500 mt-2">
                  Masz wątpliwości? Wszystko szczegółowo wyjaśniliśmy poniżej.
                </p>

                <div className="mt-10 space-y-4">
                  {FAQ_ITEMS.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden transition"
                      id={`faq-item-${index}`}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        className="w-full text-left px-5 py-4 focus:outline-none flex justify-between items-center bg-white hover:bg-slate-50 transition"
                      >
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.question}
                        </span>
                        <span className="text-orange-600 font-bold ml-4">
                          {activeFaq === index ? "−" : "+"}
                        </span>
                      </button>

                      {activeFaq === index && (
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Quick Contact & Ask form */}
            <section className="bg-white py-16">
              <div className="mx-auto max-w-xl px-4 text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900">
                  Potrzebujesz oferty dedykowanej?
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Chcesz wynająć busa na okres dłuższy niż miesiąc, wyjechać poza kraje UE lub potrzebujesz kierowcy? Zostaw kontakt, oddzwonimy.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-6 space-y-3 text-left">
                  <div>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Twoje imię lub nazwa firmy"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none text-slate-800"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Twój numer telefonu"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none text-slate-800"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      rows={3}
                      placeholder="Jakiego pojazdu potrzebujesz i na kiedy?"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none text-slate-800"
                    />
                  </div>

                  {contactSuccess && (
                    <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2.5 rounded border border-emerald-200">
                      ✓ Dziękujemy! Twoja wiadomość została wysłana. Nasz kierownik floty skontaktuje się z Tobą telefonicznie w ciągu 15 minut.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 text-xs transition"
                  >
                    Wyślij zapytanie indywidualne →
                  </button>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer onNavClick={handleScrollToSection} />

    </div>
  );
}
