export enum VehicleCategory {
  MINIBUS = "MINIBUS", // 9-osobowe
  CARGO = "CARGO",     // Dostawcze / Furgony
  SPECIAL = "SPECIAL"  // Autolawety / Specjalistyczne
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  image: string;
  seats: number;
  engine: string;
  fuel: string;
  gearbox: "manualna" | "automatyczna";
  cargoVolume?: string; // e.g. "13 m³" / "L3H2"
  payload?: string; // e.g. "1200 kg"
  basePricePerDay: number; // in PLN
  deposit: number; // in PLN
  shortDescription: string;
  specs: string[];
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  isOneTime: boolean; // true if fixed price regardless of duration
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  deliveryFee: number; // delivery fee if different from main base
}

export interface Booking {
  id: string;
  bookingCode: string;
  vehicle: Vehicle;
  pickupLocation: BranchLocation;
  returnLocation: BranchLocation;
  pickupDate: string;
  returnDate: string;
  days: number;
  extras: { optionId: string; price: number; name: string }[];
  insuranceType: "standard" | "premium";
  insurancePrice: number;
  totalPrice: number;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isCompany: boolean;
    companyName?: string;
    companyNip?: string;
    comments?: string;
  };
  status: "Oczekuje na zatwierdzenie" | "Potwierdzone" | "W realizacji" | "Zakończone" | "Anulowane";
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
