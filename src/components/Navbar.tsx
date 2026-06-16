import React from "react";
import { Phone, Calendar, Clock, Sparkles, Sliders } from "lucide-react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onMyBookingsClick: () => void;
  onAdminClick: () => void;
  isAdminActive: boolean;
  bookingsCount: number;
}

export default function Navbar({ onNavClick, onMyBookingsClick, onAdminClick, isAdminActive, bookingsCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavClick("hero")}
          className="flex cursor-pointer items-center space-x-2"
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 font-bold text-white shadow-md text-sm">
            SK
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xl tracking-tight text-slate-900">
              Dostawcze<span class="text-orange-600">Skarżysko</span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-medium -mt-1">
              Busy & Autolawety kat. B
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <button 
            id="nav-btn-fleet"
            onClick={() => onNavClick("fleet")} 
            className="hover:text-orange-600 transition"
          >
            Nasza Flota
          </button>
          <button 
            id="nav-btn-booking"
            onClick={() => onNavClick("booking-calculator")} 
            className="hover:text-orange-600 transition"
          >
            Kalkulator & Rezerwacja
          </button>
          <button 
            id="nav-btn-whyus"
            onClick={() => onNavClick("why-us")} 
            className="hover:text-orange-600 transition"
          >
            Dlaczego my
          </button>
          <button 
            id="nav-btn-faq"
            onClick={() => onNavClick("faq")} 
            className="hover:text-orange-600 transition"
          >
            FAQ
          </button>
          <button 
            id="nav-btn-contact"
            onClick={() => onNavClick("contact")} 
            className="hover:text-orange-600 transition"
          >
            Kontakt
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Quick Call */}
          <a 
            href="tel:+48500600700" 
            className="hidden sm:flex items-center space-x-2 text-slate-800 hover:text-orange-600 border border-slate-200 bg-slate-50 py-1.5 px-3 rounded-lg text-sm transition"
            id="nav-phone-link"
          >
            <Phone className="h-4 w-4 text-orange-600 animate-pulse" />
            <span className="font-semibold">+48 500 600 700</span>
          </a>

          {/* My Reservations Button */}
          <button
            onClick={onMyBookingsClick}
            className={`relative flex items-center space-x-1.5 rounded-lg border py-1.5 px-3 text-sm transition ${
              !isAdminActive && !bookingsCount ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50' : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
            id="nav-my-bookings"
          >
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>Moje Rezerwacje</span>
            {bookingsCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={onAdminClick}
            className={`relative flex items-center space-x-1.5 rounded-lg border py-1.5 px-3 text-sm font-bold transition ${
              isAdminActive
                ? "bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10"
                : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-orange-600"
            }`}
            id="nav-admin"
          >
            <Sliders className="h-4 w-4" />
            <span>Panel Admina</span>
          </button>
        </div>
      </div>
    </header>
  );
}
