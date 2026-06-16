import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Heart, Award } from "lucide-react";

interface FooterProps {
  onNavClick: (sectId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans" id="contact">
      
      {/* Upper footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 font-bold text-white text-sm">
                BR24
              </div>
              <span className="font-sans font-bold text-xl tracking-tight text-white">
                busrent<span className="text-orange-500">24</span>.pl
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Profesjonalny wynajem krótkoterminowy i długoterminowy samochodów dostawczych, furgonów towarowych (blaszaków), kontenerów z windą oraz autolawet. Zapewniamy najniższe kaucje w regionie świętokrzyskim, brak limitów dla stałych firm i nienaganny stan techniczny.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <Award className="h-3.5 w-3.5 text-orange-500" />
              <span>Flota rocznik 2024 / 2025</span>
            </div>
          </div>

          {/* Szybkie linki column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Szybka nawigacja
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavClick("fleet")} 
                  className="hover:text-orange-500 transition text-left"
                >
                  Wybierz pojazd (Flota)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick("booking-calculator")} 
                  className="hover:text-orange-500 transition text-left"
                >
                  Kalkulator ceny rentu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick("why-us")} 
                  className="hover:text-orange-500 transition text-left"
                >
                  Nasze atuty i opinie
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick("faq")} 
                  className="hover:text-orange-500 transition text-left"
                >
                  Pytania i odpowiedzi (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Nasze Bazy / Delivery Centers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Zasięg świadczenia usług
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Skarżysko-Kamienna (Baza Główna)</li>
              <li>• Kielce (Krakowska / Warszawska)</li>
              <li>• Radom (Dojazd ekspresówką S7)</li>
              <li>• Starachowice i Szydłowiec</li>
              <li>• Końskie i Suchedniów</li>
              <li>• Dowóz pod dom / plac budowy (D2D)</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              Dane kontaktowe
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <a 
                href="tel:+48500600700" 
                className="flex items-center space-x-2 hover:text-orange-500 transition"
                id="footer-call"
              >
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="font-semibold">+48 500 600 700</span>
              </a>

              <a 
                href="mailto:rezerwacje@busrent24.pl" 
                className="flex items-center space-x-2 hover:text-orange-500 transition"
                id="footer-mail"
              >
                <Mail className="h-4 w-4 text-orange-500" />
                <span>rezerwacje@busrent24.pl</span>
              </a>

              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>BR24 Skarżysko</strong><br />
                  ul. Legionów 122<br />
                  26-110 Skarżysko-Kamienna
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-slate-500">
                Świadczymy usługi najmu na terenie Unii Europejskiej. Każdy pojazd posiada zieloną kartę oraz międzynarodowe assistance.
              </p>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} busrent24.pl. Wszystkie prawa zastrzeżone.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">
              Wypożyczalnia samochodów dostawczych i autolawet w Skarżysku-Kamiennej, Starachowicach, Końskich oraz Kielcach.
            </p>
          </div>
          
          {/* Note explaining local template framework */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-1">
            <span>Struktura portalu oparta na technologii React & Tailwind.</span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          </div>
        </div>

      </div>

    </footer>
  );
}
