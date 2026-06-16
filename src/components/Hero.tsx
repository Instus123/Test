import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Truck, ShieldCheck, Milestone } from "lucide-react";
import { BRANCH_LOCATIONS } from "../data";
import { VehicleCategory } from "../types";

// Import our newly generated premium image
import heroImage from "../assets/images/rent_fleet_hero_1781648388409.jpg";

interface HeroProps {
  onStartBooking: (category: VehicleCategory | "all", pickupLocId: string, dateStr: string) => void;
}

export default function Hero({ onStartBooking }: HeroProps) {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | "all">("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("WAW");
  const [pickupDate, setPickupDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBooking(selectedCategory, selectedLocation, pickupDate);
  };

  return (
    <section className="relative overflow-hidden bg-slate-900" id="hero">
      {/* Background Graphic with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luksusowa flota busrent24.pl"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Accent/Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-1.5 rounded-full bg-orange-600/20 px-3 py-1 text-xs font-semibold text-orange-400 border border-orange-500/20"
            >
              <Milestone className="h-3 w-3" />
              <span>Darmowa rezygnacja do 48h przed terminem</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Wypożyczalnia aut dostawczych <span className="text-orange-500 font-black block sm:inline">Skarżysko-Kamienna</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 max-w-2xl font-sans"
            >
              Wynajem nowoczesnych busów dostawczych, furgonów typu blaszak, kontenerów z windą oraz autolawet na zwykłe prawo jazdy kategorii B. Szybki, lokalny wynajem rzetelnej floty z bazą w Skarżysku.
            </motion.p>

            {/* Micro Badges Panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-white"
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/35 border border-orange-500/30">
                  <Truck className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Prawo jazdy kat. B</p>
                  <p className="text-xs text-slate-400">Na wszystkie modele</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/35 border border-orange-500/30">
                  <ShieldCheck className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Ubezpieczenie AC/OC</p>
                  <p className="text-xs text-slate-400">Pomoc Assistance 24h</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/35 border border-orange-500/30">
                  <span className="font-mono text-base font-bold text-orange-400">0%</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Jasne zasady</p>
                  <p className="text-xs text-slate-400">Bez ukrytych dopłat</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Booking Calculator Side form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            id="quick-reservation-box"
          >
            <div className="mb-4">
              <h3 className="font-sans font-extrabold text-xl text-slate-900">
                Wybierz busa dla siebie
              </h3>
              <p className="text-xs text-slate-500">
                Zarezerwuj lub oblicz dokładną cenę natychmiast
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1">
                  Typ pojazdu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`text-xs py-2 px-1 rounded-md font-sans border text-center font-medium transition ${
                      selectedCategory === "all"
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    Wszystkie
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(VehicleCategory.CARGO)}
                    className={`text-xs py-2 px-1 rounded-md font-sans border text-center font-medium transition ${
                      selectedCategory === VehicleCategory.CARGO
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    Furgon
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(VehicleCategory.SPECIAL)}
                    className={`text-xs py-2 px-1 rounded-md font-sans border text-center font-medium transition ${
                      selectedCategory === VehicleCategory.SPECIAL
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    Specjalne / Autolaweta
                  </button>
                </div>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1.5 flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-orange-600" />
                  <span>Miejsce odbioru</span>
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none text-slate-800"
                  id="quick-pickup-location"
                >
                  {BRANCH_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} {loc.deliveryFee > 0 ? `(+${loc.deliveryFee} zł)` : "(Darmowa Baza)"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Single Date approximation */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1.5 flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-orange-600" />
                  <span>Zacznij od dnia</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none text-slate-800"
                  id="quick-pickup-date"
                />
              </div>

              {/* Submit to scroll to calculator */}
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-orange-600 active:bg-orange-700 hover:shadow-orange-600/10 transition duration-200"
                id="quick-search-submit"
              >
                Przejdź do kalkulatora ceny →
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
