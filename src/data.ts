import { Vehicle, VehicleCategory, ExtraOption, BranchLocation, FaqItem } from "./types";

export const BRANCH_LOCATIONS: BranchLocation[] = [
  { id: "SK", name: "Skarżysko-Kamienna (Centrala & Baza Główna - ul. Legionów)", city: "Skarżysko-Kamienna", address: "ul. Legionów 122, 26-110 Skarżysko-Kamienna", deliveryFee: 0 },
  { id: "KIE", name: "Kielce (Dostawa pod adres)", city: "Kielce", address: "Dostawa na terenie Kielc", deliveryFee: 60 },
  { id: "RAD", name: "Radom (Dostawa pod adres)", city: "Radom", address: "Dostawa na terenie Radomia", deliveryFee: 70 },
  { id: "STW", name: "Starachowice (Dostawa pod adres)", city: "Starachowice", address: "Dostawa na terenie Starachowic", deliveryFee: 40 },
  { id: "SZD", name: "Szydłowiec (Dostawa pod adres)", city: "Szydłowiec", address: "Dostawa na terenie Szydłowca", deliveryFee: 40 },
  { id: "KON", name: "Końskie (Dostawa pod adres)", city: "Końskie", address: "Dostawa na terenie Końskich", deliveryFee: 50 },
  { id: "D2D", name: "Inna lokalizacja (Województwo Świętokrzyskie / Mazowieckie)", city: "Dowolny Adres", address: "Dostawa pod wskazany dom lub firmę", deliveryFee: 99 }
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  { id: "driver", name: "Dodatkowy kierowca", description: "Upoważnienie drugiego pracownika/kierowcy do prowadzenia pojazdu", pricePerDay: 15, isOneTime: false },
  { id: "gps", name: "Nawigacja GPS z trasami ciężarowymi", description: "Unikanie zbyt niskich wiaduktów i dróg o ograniczonym tonażu", pricePerDay: 10, isOneTime: false },
  { id: "straps", name: "Pasy transportowe ściągające (zestaw 4 szt.)", description: "Profesjonalne pasy Ergo do mocowania ładunków na pace", pricePerDay: 20, isOneTime: true },
  { id: "trolley", name: "Dwuosobowy wózek schodowy / paleciak", description: "Ułatwia załadunek ciężkich AGD, mebli i europalet", pricePerDay: 40, isOneTime: true },
  { id: "abroad", name: "Wyjazd za granicę (Kraje UE)", description: "Pakiet ubezpieczeń Assistance Europa Cargo i pełna zgoda pisemna", pricePerDay: 149, isOneTime: true },
  { id: "clean", name: "Brak konieczności mycia i sprzątania paki", description: "Zwróć zabrudzone auto dostawcze bez ponoszenia dodatkowych kar", pricePerDay: 99, isOneTime: true }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "renault-master",
    brand: "Renault",
    model: "Master Furgon L3H2",
    name: "Renault Master Furgon L3H2 (Klasyczny Dostawczak)",
    category: VehicleCategory.CARGO,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    seats: 3,
    engine: "2.3 dCi (165 KM) TwinTurbo",
    fuel: "Diesel",
    gearbox: "manualna",
    cargoVolume: "13.5 m³",
    payload: "1250 kg",
    basePricePerDay: 179,
    deposit: 1000,
    shortDescription: "Najpopularniejszy i najbardziej niezawodny furgon do przeprowadzek i przewozu towarów gabarytowych. Posiada idealną długość paki - 3.7 metra.",
    specs: ["Wymiary przestrzeni: 3.73m (dł.) x 1.76m (szer.) x 1.89m (wys.)", "Mieści 4 europalety", "Klimatyzacja sprawna", "Kamera cofania i czujniki tylne", "Wzmocniona antypoślizgowa podłoga", "Uchwyty mocujące na pasy transportowe"],
  },
  {
    id: "fiat-ducato",
    brand: "Fiat",
    model: "Ducato Furgon Maxi L4H2",
    name: "Fiat Ducato Maxi L4H2 (Najdłuższy Furgon)",
    category: VehicleCategory.CARGO,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    seats: 3,
    engine: "2.2 MultiJet3 (180 KM)",
    fuel: "Diesel",
    gearbox: "manualna",
    cargoVolume: "17.0 m³",
    payload: "1450 kg",
    basePricePerDay: 199,
    deposit: 1100,
    shortDescription: "Niezrównany pod względem pojemności furgon roboczy. Długość podłogi paki wynosi aż 4.07 metra, co pozwala na transport nawet najdłuższych profili roboczych czy belek.",
    specs: ["Wymiary przestrzeni: 4.07m (dł.) x 1.87m (szer.) x 1.93m (wys.)", "Mieści aż 5 europalet", "Silnik nowej generacji o mocy 180 KM", "Pneumatyczny fotel kierowcy", "Tempomat i asystent bocznego wiatru", "Oświetlenie LED nad drzwiami paki"],
  },
  {
    id: "peugeot-boxer",
    brand: "Peugeot",
    model: "Boxer L2H2",
    name: "Peugeot Boxer L2H2 (Zwinny Miejski)",
    category: VehicleCategory.CARGO,
    image: "https://images.unsplash.com/photo-1551816258-fcbc6c3f7fcb?auto=format&fit=crop&w=800&q=80",
    seats: 3,
    engine: "2.2 BlueHDi (140 KM)",
    fuel: "Diesel",
    gearbox: "manualna",
    cargoVolume: "11.5 m³",
    payload: "1180 kg",
    basePricePerDay: 159,
    deposit: 800,
    shortDescription: "Średniej wielkości dostawczak, niesamowicie zwinny w manewrowaniu na ciasnych osiedlach Skarżyska-Kamiennej. Idealny pod szybkie zakupy budowlane.",
    specs: ["Wymiary przestrzeni: 3.12m (dł.) x 1.87m (szer.) x 1.93m (wys.)", "Mieści 3 europalety", "Klimatyzacja kabiny", "System ułatwiający ruszanie pod górę", "Bardzo ekonomiczne spalanie (ok. 7.5L/100km)", "Radio z systemem Bluetooth / AUX"],
  },
  {
    id: "iveco-daily",
    brand: "Iveco",
    model: "Daily 35S18 Skrzyniowy z Windą",
    name: "Iveco Daily Skrzyniowy z Windą Załadunkową",
    category: VehicleCategory.SPECIAL,
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    seats: 3,
    engine: "3.0 HPI (180 KM) Heavy Duty",
    fuel: "Diesel",
    gearbox: "manualna",
    cargoVolume: "20.0 m³",
    payload: "1100 kg",
    basePricePerDay: 269,
    deposit: 1500,
    shortDescription: "Profesjonalny kontener skrzyniowy wyposażony w hydrauliczną windę załadunkową Dhollandia (udźwig 750 kg). Stworzony do najcięższych materiałów i maszyn.",
    specs: ["Wymiary kontenera: 4.20m (dł.) x 2.20m (szer.) x 2.10m (wys.)", "Mieści aż 8 europalet", "Sterowanie windą z pilota na kablu", "Paleciak w cenie wynajmu na życzenie", "Trwały, kultowy silnik 3.0 L", "Otwierane boczne kurtyny"],
  },
  {
    id: "sprinter-laweta",
    brand: "Mercedes-Benz",
    model: "Sprinter 319 CDI Autolaweta Alu",
    name: "Mercedes Sprinter Autolaweta (Kategoria B)",
    category: VehicleCategory.SPECIAL,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
    seats: 3,
    engine: "3.0 V6 (190 KM)",
    fuel: "Diesel",
    gearbox: "automatyczna",
    payload: "1350 kg",
    basePricePerDay: 320,
    deposit: 1500,
    shortDescription: "Szybka, niezawodna autolaweta z najazdem aluminiowym o długości 4.6 m i mocną wyciągarką elektryczną na pilota. Nie wymaga prawa jazdy ciężarowego - jedziesz na kat. B.",
    specs: ["Wyciągarka elektryczna Dragon Winch 5.5 t", "Najazd aluminiowy o długości 4.60m", "Tylne zawieszenie pneumatyczne (regulowane)", "Pasy transportowe 3-punktowe w standardzie", "Komfortowa automatyczna skrzynia biegów", "Mocny silnik V6 idealny pod ciężki załadunek"]
  }
];

export const INSURANCE_TIERS = {
  standard: {
    name: "Ubezpieczenie Standard",
    description: "Standardowe zabezpieczenie OC/AC z udziałem własnym w szkodzie do 3500 PLN.",
    pricePerDay: 0,
    depositMultiplier: 1.0,
    features: ["Pełny pakiet drogowy OC/AC", "Assistance na terenie Polski", "Udział własny do 3500 PLN"]
  },
  premium: {
    name: "Pakiet Premium Gold (Rekomendowany dla Firm)",
    description: "Pełne zniesienie udziału własnego w szkodach do zera (0 PLN). Kaucja zwrotna obniżona o połowę (50%) oraz opieka techniczna Assistance na całą Europę.",
    pricePerDay: 49,
    depositMultiplier: 0.5,
    features: ["Zniesienie udziału w szkodach drogowym (0 PLN)", "Gwarancja podstawienia busa zastępczego w 24h", "Assistance cała Europa Cargo 24/7", "Kaucja zabezpieczająca obniżona o 50%"]
  }
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Gdzie dokładnie znajduje się Wasza baza w Skarżysku-Kamiennej?",
    answer: "Nasza główna baza mieści się przy ul. Legionów 122 w Skarżysku-Kamiennej, blisko węzła drogi ekspresowej S7. Umożliwia to błyskawiczny dojazd klientów z całego regionu (Kielce, Radom, Szydłowiec, Starachowice). Oferujemy również bezpłatny parking na czas trwania wynajmu dla Twojego prywatnego samochodu."
  },
  {
    question: "Czy autami dostawczymi można kierować posiadając prawo jazdy kategorii B?",
    answer: "Tak, oczywiście! Wszystkie oferowane przez nas furgony dostawcze oraz specjalistyczne (w tym Iveco z windą oraz autolaweta Mercedes) mają dopuszczalną masę całkowitą (DMC) do 3.5 tony. Do ich legalnego prowadzenia wystarczy zwykłe prawo jazdy kat. B posiadane od co najmniej 2 lat."
  },
  {
    question: "Jak wygląda sprawa kaucji zabezpieczającej i jej zwrotu?",
    answer: "Kaucja (depozyt) pobierana jest na wypadek uszkodzeń mechanicznych, braków paliwa lub ponadnormatywnego zabrudzenia. Wynosi od 800 do 1500 PLN w zależności od wybranego pojazdu. Wybierając pakiet ubezpieczeń Premium Gold, obniżasz tę kwotę rzetelnie o połowę. Kaucję możesz wnieść gotówką przy odbiorze lub poprzez szybką autoryzację na karcie. Zwracamy ją w całości natychmiast przy zdaniu nieuszkodzonego pojazdu."
  },
  {
    question: "Czy busy posiadają limit przejechanych kilometrów?",
    answer: "Dla wynajmów krótkoterminowych (1-3 dni) obowiązuje optymalny limit 400 km na dobę (sumowany na cały okres, np. 2 dni = 800 km limitu). Przekroczenie limitu rozliczane jest w stawce zaledwie 0.35 PLN za każdy kilometr. Przy wynajmie długoterminowym lub dla firm istnieje możliwość całkowitego zniesienia limitu (bez limitu kilometrów)."
  },
  {
    question: "Czy wystawiacie pełne faktury VAT 23% dla firm?",
    answer: "Tak, na każdą usługę wynajmu wystawiamy pełną polską fakturę VAT 23%. Koszt wynajmu pojazdu dostawczego wraz z paliwem stanowi dla przedsiębiorcy 100% kosztu uzyskania przychodu oraz pozwala na pełne odliczenie podatku VAT."
  },
  {
    question: "W jakich godzinach można odebrać pojazd w Skarżysku?",
    answer: "Standardowe wydania i zwroty realizujemy w biurze bazy głównej od godziny 7:00 do 21:00 siedem dni w tygodniu (również w niedziele niehandlowe). Po wcześniejszym uzgodnieniu telefonicznym lub w komentarzu zamówienia możliwy jest odbiór całodobowy (24/7) o dowolnej godzinie nocnej."
  }
];
