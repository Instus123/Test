import React, { useState } from "react";
import { Vehicle, VehicleCategory } from "../types";
import { VEHICLES } from "../data";
import { Users, Gauge, Settings, Layers, Box, ChevronRight, Check } from "lucide-react";
import { motion } from "motion/react";

interface FleetProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  vehicles: Vehicle[];
}

export default function Fleet({ onSelectVehicle, vehicles }: FleetProps) {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | "all">("all");

  const filteredVehicles = selectedCategory === "all"
    ? vehicles
    : vehicles.filter(v => v.category === selectedCategory);

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200" id="fleet">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Poznaj naszą nowoczesną <span className="text-orange-600">flotę</span>
          </h2>
          <p className="mt-4 text-base text-slate-500 font-sans">
            Wszystkie nasze busy są regularnie serwisowane w autoryzowanych stacjach (ASO), posiadają pełny pakiet ubezpieczeń i są przygotowane do najdłuższych europejskich tras.
          </p>

          {/* Category Tabs Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
               id="fleet-tab-all"
               onClick={() => setSelectedCategory("all")}
               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                 selectedCategory === "all"
                   ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                   : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
               }`}
             >
               Wszystkie dostawczaki ({vehicles.length})
             </button>
             <button
               id="fleet-tab-cargo"
               onClick={() => setSelectedCategory(VehicleCategory.CARGO)}
               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                 selectedCategory === VehicleCategory.CARGO
                   ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                   : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
               }`}
             >
               Furgony / Blaszaki (kat. B)
             </button>
             <button
               id="fleet-tab-special"
               onClick={() => setSelectedCategory(VehicleCategory.SPECIAL)}
               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                 selectedCategory === VehicleCategory.SPECIAL
                   ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                   : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
               }`}
             >
               Kontenery z windą / Autolawety
             </button>
           </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              layout
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl transition duration-350"
              id={`vehicle-card-${vehicle.id}`}
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category tag */}
                <span className="absolute left-3 top-3 rounded-md bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {vehicle.category === VehicleCategory.MINIBUS ? "Pasażerski 9-os." : vehicle.category === VehicleCategory.CARGO ? "Dostawczy / Cargo" : "Specjalny / Laweta"}
                </span>

                {/* Direct price tag */}
                <div className="absolute right-0 bottom-3 bg-orange-600 px-3 py-1 text-xs font-bold text-white uppercase rounded-l-md font-mono shadow-md">
                  od {vehicle.basePricePerDay} PLN / doba
                </div>
              </div>

              {/* Vehicle specs and info */}
              <div className="flex flex-1 flex-col p-6">
                <div>
                  <h3 className="font-sans font-extrabold text-xl text-slate-900 group-hover:text-orange-600 transition">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {vehicle.shortDescription}
                  </p>
                </div>

                {/* Specification row icons */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-slate-600 text-xs">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Users className="h-4 w-4 text-orange-500 mb-1" />
                    <span className="font-semibold">{vehicle.seats} miejsc</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center border-x border-slate-100">
                    <Settings className="h-4 w-4 text-orange-500 mb-1" />
                    <span className="font-semibold capitalize">{vehicle.gearbox}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <Gauge className="h-4 w-4 text-orange-500 mb-1" />
                    <span className="font-semibold">{vehicle.fuel}</span>
                  </div>
                </div>

                {/* Secondary capacity for Cargo vehicles */}
                {(vehicle.cargoVolume || vehicle.payload) && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-orange-500/5 px-3 py-2 text-xs font-medium text-orange-700">
                    {vehicle.cargoVolume && (
                      <span className="flex items-center space-x-1">
                        <Box className="h-3.5 w-3.5 text-orange-600" />
                        <span>Pojemność: <strong>{vehicle.cargoVolume}</strong></span>
                      </span>
                    )}
                    {vehicle.payload && (
                      <span className="flex items-center space-x-1">
                        <Layers className="h-3.5 w-3.5 text-orange-600" />
                        <span>Ładowność: <strong>{vehicle.payload}</strong></span>
                      </span>
                    )}
                  </div>
                )}

                {/* Specs detail checklist */}
                <div className="mt-4 space-y-1.5 flex-1">
                  {vehicle.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex items-start text-xs text-slate-600">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mr-1.5 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Select button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectVehicle(vehicle)}
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-600/10 transition duration-200"
                    id={`select-btn-${vehicle.id}`}
                  >
                    <span>Skonfiguruj Rezerwację</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    Kaucja zwrotna zabezpieczająca: {vehicle.deposit} PLN
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
