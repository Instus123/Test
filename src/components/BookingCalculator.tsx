import React, { useState, useEffect } from "react";
import { Vehicle, BranchLocation, ExtraOption } from "../types";
import { VEHICLES, BRANCH_LOCATIONS, EXTRA_OPTIONS, INSURANCE_TIERS } from "../data";
import { Calendar, MapPin, Sparkles, Check, Info, Shield, Plus, Minus, User, PlusCircle, CheckCircle } from "lucide-react";

interface BookingCalculatorProps {
  preselectedVehicle: Vehicle | null;
  initialPickupLocId?: string;
  initialPickupDate?: string;
  onBookingComplete: (bookingDetails: any) => void;
  onResetVehicle: () => void;
  vehiclesList?: Vehicle[];
}

export default function BookingCalculator({
  preselectedVehicle,
  initialPickupLocId = "WAW",
  initialPickupDate = "",
  onBookingComplete,
  onResetVehicle,
  vehiclesList
}: BookingCalculatorProps) {
  const vList = vehiclesList || VEHICLES;

  // Vehicle Selection
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(preselectedVehicle || vList[0]);

  // Sync state if preselectedVehicle changes from outer trigger
  useEffect(() => {
    if (preselectedVehicle) {
      setSelectedVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Main Rental Parameters
  const [pickupLocId, setPickupLocId] = useState(initialPickupLocId);
  const [returnLocId, setReturnLocId] = useState(initialPickupLocId);
  const [pickupDate, setPickupDate] = useState(() => {
    if (initialPickupDate) return initialPickupDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);
    return dayAfterTomorrow.toISOString().split("T")[0];
  });

  // Calculate Days
  const [days, setDays] = useState(2);

  useEffect(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffTime = end.getTime() - start.getTime();
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 1) diffDays = 1;
      setDays(diffDays);
    }
  }, [pickupDate, returnDate]);

  // Ensure return date is always at least 1 day after pickup date
  useEffect(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (end <= start) {
      const newReturn = new Date(start);
      newReturn.setDate(newReturn.getDate() + 2);
      setReturnDate(newReturn.toISOString().split("T")[0]);
    }
  }, [pickupDate]);

  // Selected Extras
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});

  // Insurance Level
  const [insuranceType, setInsuranceType] = useState<"standard" | "premium">("premium");

  // Customer Form Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNip, setCompanyNip] = useState("");
  const [comments, setComments] = useState("");

  const [validationError, setValidationError] = useState("");

  const pickupLocation = BRANCH_LOCATIONS.find((l) => l.id === pickupLocId) || BRANCH_LOCATIONS[0];
  const returnLocation = BRANCH_LOCATIONS.find((l) => l.id === returnLocId) || BRANCH_LOCATIONS[0];

  // Pricing calculations
  const freshVehicle = vList.find((v) => v.id === selectedVehicle.id) || selectedVehicle;
  const vehicleBasePrice = freshVehicle.basePricePerDay;
  const vehicleTotalBase = vehicleBasePrice * days;

  // Branch Delivery Fees (if locations are D2D or airports)
  const pickupFee = pickupLocation.deliveryFee;
  const returnFee = returnLocation.deliveryFee;
  const deliveryTotal = pickupFee + returnFee;

  // Selected Extras Prices
  const extrasTotal = EXTRA_OPTIONS.reduce((acc, option) => {
    if (selectedExtras[option.id]) {
      const price = option.isOneTime ? option.pricePerDay : option.pricePerDay * days;
      return acc + price;
    }
    return acc;
  }, 0);

  // Insurance pricing
  const insuranceTier = INSURANCE_TIERS[insuranceType];
  const insurancePricePerDay = insuranceTier.pricePerDay;
  const insuranceTotal = insurancePricePerDay * days;

  // Grand Total in PLN
  const grandTotal = vehicleTotalBase + deliveryTotal + extrasTotal + insuranceTotal;

  // Deposit Info (Reduced by 50% with premium insurance)
  const originalDeposit = selectedVehicle.deposit;
  const finalDeposit = originalDeposit * insuranceTier.depositMultiplier;

  const handleToggleExtra = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!firstName || !lastName || !email || !phone) {
      setValidationError("Proszę wypełnić wszystkie podstawowe dane kontaktowe.");
      return;
    }

    if (isCompany && (!companyName || !companyNip)) {
      setValidationError("Proszę podać nazwę firmy oraz numer NIP.");
      return;
    }

    // Prepare booking package
    const finalExtras = EXTRA_OPTIONS.filter((o) => selectedExtras[o.id]).map((o) => ({
      optionId: o.id,
      name: o.name,
      price: o.isOneTime ? o.pricePerDay : o.pricePerDay * days
    }));

    const bookingPayload = {
      vehicle: freshVehicle,
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
      days,
      extras: finalExtras,
      insuranceType,
      insurancePrice: insuranceTotal,
      totalPrice: grandTotal,
      customerDetails: {
        firstName,
        lastName,
        email,
        phone,
        isCompany,
        companyName: isCompany ? companyName : undefined,
        companyNip: isCompany ? companyNip : undefined,
        comments
      }
    };

    onBookingComplete(bookingPayload);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden" id="booking-calculator">
      
      {/* Banner design */}
      <div className="bg-slate-900 px-6 py-6 sm:px-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-wider text-orange-400 uppercase bg-orange-600/10 border border-orange-500/20 px-2.5 py-1 rounded">
            Interaktywny System Rezerwacji
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            Skalkuluj koszty wynajmu w 3 prostych krokach
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Rezerwacja nie zobowiązuje Cię do płatności - nasz konsultant zadzwoni w celu dogrania szczegółów.
          </p>
        </div>

        {preselectedVehicle && (
          <button
            onClick={onResetVehicle}
            className="text-xs font-semibold text-orange-400 hover:text-white border border-orange-500/35 hover:bg-orange-600/20 px-3 py-1.5 rounded-lg transition"
            id="re-select-vehicle-btn"
          >
            Zmień pojazd
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* Left Interactive Configurator Steps */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 sm:p-8 space-y-8">
          
          {/* Step 1: Vehicle & Main params */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white font-mono">
                1
              </span>
              <h4 className="font-sans font-extrabold text-lg text-slate-900">
                Pojazd i parametry podróży
              </h4>
            </div>

            {/* If not fixed, show local select */}
            {!preselectedVehicle && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase">Wybierz pojazd</label>
                <select
                  value={selectedVehicle.id}
                  onChange={(e) => {
                    const veh = vList.find((v) => v.id === e.target.value);
                    if (veh) setSelectedVehicle(veh);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
                  id="calc-vehicle-select"
                >
                  {vList.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} (od {v.basePricePerDay} PLN/doba)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {preselectedVehicle && (
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="h-14 w-20 object-cover rounded-md border border-slate-200"
                />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Wybrany Busa:</p>
                  <p className="text-sm font-bold text-slate-900">{selectedVehicle.brand} {selectedVehicle.model}</p>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">{selectedVehicle.seats} Miejsc | Skrzynia: {selectedVehicle.gearbox}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pickup location */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-orange-500" />
                  <span>Miejsce odbioru</span>
                </label>
                <select
                  value={pickupLocId}
                  onChange={(e) => setPickupLocId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
                  id="calc-pickup-loc"
                >
                  {BRANCH_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} {loc.deliveryFee > 0 ? `(+${loc.deliveryFee} zł)` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Return location */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-orange-500" />
                  <span>Miejsce zwrotu</span>
                </label>
                <select
                  value={returnLocId}
                  onChange={(e) => setReturnLocId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
                  id="calc-return-loc"
                >
                  {BRANCH_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} {loc.deliveryFee > 0 ? `(+${loc.deliveryFee} zł)` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pickup Date */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-orange-500" />
                  <span>Data odbioru</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
                  id="calc-pickup-date"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-orange-500" />
                  <span>Data zwrotu</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-orange-500 focus:outline-none"
                  id="calc-return-date"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Extras & Insurance Option */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white font-mono">
                2
              </span>
              <h4 className="font-sans font-extrabold text-lg text-slate-900">
                Ubezpieczenia i opcje dodatkowe
              </h4>
            </div>

            {/* Insurance Tier Box Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase">Wybierz pakiet ochrony</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Standard Insurance */}
                <div
                  onClick={() => setInsuranceType("standard")}
                  className={`cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                    insuranceType === "standard"
                      ? "border-slate-900 bg-slate-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  id="ins-standard-card"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-800">Wariant Standard</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Darmowy</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Podstawowe ubezpieczenie. Odpowiedzialność za szkody do 3000 PLN. Standardowa kaucja.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>Udział własny: 3000 zł</span>
                    {insuranceType === "standard" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Premium Gold Insurance */}
                <div
                  onClick={() => setInsuranceType("premium")}
                  className={`cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                    insuranceType === "premium"
                      ? "border-orange-500 bg-orange-500/5 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  id="ins-premium-card"
                >
                  <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-orange-600 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
                    ZALECANE
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-orange-950 flex items-center">
                        <Shield className="h-3.5 w-3.5 text-orange-600 mr-1" />
                        Premium Gold
                      </span>
                      <span className="text-xs font-semibold text-orange-700 font-mono">+49 zł / dzień</span>
                    </div>
                    <p className="text-[11px] text-orange-900/80 leading-snug">
                      <strong>Zniesienie udziału własnego</strong> do 0 PLN, pomoc Assistance w całej Europie oraz <strong>50% mniejsza kaucja zwrotna</strong>.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-orange-500/10 flex items-center justify-between text-[11px] text-orange-950 font-medium">
                    <span>Odpowiedzialność: 0 zł</span>
                    {insuranceType === "premium" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Extras checklist */}
            <div className="space-y-2 mt-4">
              <label className="text-xs font-semibold text-slate-700 uppercase">Usługi opcjonalne</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRA_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleToggleExtra(option.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition select-none ${
                      selectedExtras[option.id]
                        ? "border-orange-600 bg-orange-50/20"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                    id={`extra-option-${option.id}`}
                  >
                    <div className="pr-2">
                      <p className="text-xs font-bold text-slate-800">{option.name}</p>
                      <p className="text-[10px] text-slate-400 leading-tight">{option.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold font-mono text-slate-900">
                        +{option.pricePerDay} PLN
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium">
                        {option.isOneTime ? "Jednorazowo" : "/ doba"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Step 3: Customer Details & Comments */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white font-mono">
                3
              </span>
              <h4 className="font-sans font-extrabold text-lg text-slate-900">
                Dane osoby rezerwującej
              </h4>
            </div>

            {/* Private Person / Company selector toggle */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setIsCompany(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  !isCompany
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                id="toggle-person"
              >
                Osoba prywatna
              </button>
              <button
                type="button"
                onClick={() => setIsCompany(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  isCompany
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                id="toggle-company"
              >
                Firma (Faktura VAT)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Imię *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="np. Jan"
                  id="field-firstname"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Nazwisko *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="np. Kowalski"
                  id="field-lastname"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Adres E-mail *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="np. jan@domena.pl"
                  id="field-email"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Numer telefonu *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="np. +48 501 202 303"
                  id="field-phone"
                />
              </div>
            </div>

            {isCompany && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50/20 p-4 rounded-xl border border-orange-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pełna nazwa firmy *</label>
                  <input
                    type="text"
                    required={isCompany}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="np. Trans-Bus Sp. z o.o."
                    id="field-companyname"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Numer NIP *</label>
                  <input
                    type="text"
                    required={isCompany}
                    value={companyNip}
                    onChange={(e) => setCompanyNip(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="np. NIP 5250000000"
                    id="field-nip"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-600 mb-1">Uwagi lub życzenia specjalne (opcjonalnie)</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                placeholder="Jeżeli potrzebujesz nietypowych godzin odbioru lub masz dodatkowe pytania, pisz śmiało."
                id="field-comments"
              />
            </div>
          </div>

          {/* Validation Err alert */}
          {validationError && (
            <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-lg border border-red-200 font-semibold">
              ⚠️ {validationError}
            </div>
          )}

          {/* Submit Action wrapper */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-600 py-4 text-center font-sans font-extrabold text-white text-base shadow-lg hover:bg-orange-700 hover:shadow-orange-600/20 active:bg-orange-850 transition duration-200"
              id="calculator-submit-btn"
            >
              Potwierdzam Rezerwację (Bez Płatności Online)
            </button>
            <p className="mt-2.5 text-center text-[10px] text-slate-400 leading-snug">
              Klikając, wysyłasz bezpłatne zapytanie rezerwacyjne. Nasz zespół sprawdzi dostępność busa w wybranej bazie w ciągu maksymalnie 15 minut i prześle e-mail z oficjalną ofertą.
            </p>
          </div>

        </form>

        {/* Right Sticky Calculation Summary Receipt */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-sans font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-3">
              Podsumowanie kosztów
            </h4>

            {/* Vehicle Card summary snippet */}
            <div className="flex items-center space-x-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="h-16 w-24 object-cover rounded-lg border border-slate-100"
              />
              <div>
                <span className="inline-block bg-slate-900 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-1">
                  {selectedVehicle.category === "MINIBUS" ? "9 os." : "Cargo B"}
                </span>
                <p className="text-sm font-extrabold text-slate-900 leading-tight">
                  {selectedVehicle.brand} {selectedVehicle.model}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Silnik: {selectedVehicle.engine}
                </p>
              </div>
            </div>

            {/* Stepwise Summary Receipt List */}
            <div className="space-y-3.5 text-sm">
              
              {/* Duration & base cost */}
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Okres najmu:</span>
                <span className="font-semibold text-right">{days} {days === 1 ? 'doba' : days < 5 ? 'doby' : 'dni'}</span>
              </div>

              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Cena za dobę:</span>
                <span className="font-mono text-right">{selectedVehicle.basePricePerDay} PLN</span>
              </div>

              <div className="flex justify-between text-slate-800 font-medium">
                <span className="text-slate-500">Wynajem podstawowy:</span>
                <span className="font-mono text-right">{vehicleTotalBase} PLN</span>
              </div>

              {/* Delivery info */}
              <div className="border-t border-dashed border-slate-200 pt-3 space-y-2">
                <p className="text-xs font-bold text-slate-900 mb-1">Koszty logistyczne i bazy</p>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Odbiór: {pickupLocation.city}</span>
                  <span className="font-mono">{pickupLocation.deliveryFee} PLN</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Zwrot: {returnLocation.city}</span>
                  <span className="font-mono">{returnLocation.deliveryFee} PLN</span>
                </div>
              </div>

              {/* Insurance info */}
              <div className="border-t border-dashed border-slate-200 pt-3">
                <div className="flex justify-between text-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Ubezpieczenie i pomoc</p>
                    <p className="text-[10px] text-slate-500">{insuranceTier.name}</p>
                  </div>
                  <span className="font-mono shrink-0 text-right">{insuranceTotal} PLN</span>
                </div>
              </div>

              {/* Extras break up if any */}
              {EXTRA_OPTIONS.some((o) => selectedExtras[o.id]) && (
                <div className="border-t border-dashed border-slate-200 pt-3 space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-1">Wybrane opcje komforowe</p>
                  {EXTRA_OPTIONS.filter((o) => selectedExtras[o.id]).map((option) => {
                    const price = option.isOneTime ? option.pricePerDay : option.pricePerDay * days;
                    return (
                      <div key={option.id} className="flex justify-between text-xs text-slate-600">
                        <span>{option.name} {option.isOneTime ? "(jednorazowo)" : `(${days} dni)`}</span>
                        <span className="font-mono">{price} PLN</span>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

          {/* Grand totals panel */}
          <div className="mt-8 border-t border-slate-200 pt-6 space-y-4">
            
            {/* Refundable Deposit Warning */}
            <div className="bg-emerald-500/5 text-emerald-800 p-3 rounded-xl border border-emerald-500/10 text-xs leading-snug">
              <div className="font-bold flex items-center space-x-1 mb-0.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Kaucja zwrotna zabezpieczająca</span>
              </div>
              <p className="text-slate-600">
                Płacona przy odbiorze, zwracana w całości przy oddaniu czystego auta:{" "}
                <strong className="text-slate-900 font-mono text-sm">{finalDeposit} PLN</strong>{" "}
                {insuranceType === "premium" && (
                  <span className="text-emerald-700 font-medium">(Zmniejszona o 50%!)</span>
                )}
              </p>
            </div>

            {/* Massive Price Panel */}
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                  ŁĄCZNY KOSZT (NETTO)
                </p>
                <p className="text-xs text-slate-500">
                  Brutto: {Math.round(grandTotal * 1.23)} PLN (faktura VAT)
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900 font-mono" id="grand-total-amount">
                  {grandTotal} PLN
                </p>
                <p className="text-[9px] text-orange-600 font-bold">
                  Brak ukrytych opłat
                </p>
              </div>
            </div>

            {/* Safety pointers */}
            <div className="space-y-2 text-[10px] text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Nielimitowane ubezpieczenie OC/AC w pakiecie</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Anulowanie rezerwacji za darmo do 48h przed startem</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
