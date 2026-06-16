<?php
/**
 * Wypożyczalnia Samochodów Dostawczych Skarżysko-Kamienna - PHP & CSS template
 * Plik zintegrowany z interaktywnym kalkulatorem ceny i prostym systemem zapisu zapytań
 */

// Baza danych pojazdów
$vehicles = [
    [
        "id" => "renault-master",
        "brand" => "Renault",
        "model" => "Master Furgon L3H2",
        "name" => "Renault Master Furgon L3H2",
        "category" => "furgon",
        "image" => "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
        "seats" => 3,
        "engine" => "2.3 dCi (165 KM) TwinTurbo",
        "fuel" => "Diesel",
        "gearbox" => "manualna",
        "volume" => "13.5 m³",
        "payload" => "1250 kg",
        "price" => 179,
        "deposit" => 1000,
        "desc" => "Najpopularniejszy i najbardziej niezawodny furgon do przeprowadzek. Długość paki 3.7 m.",
        "specs" => [
            "Wymiary paki: 3.73m x 1.76m x 1.89m",
            "Mieści 4 europalety",
            "Kamera cofania i czujniki",
            "Antypoślizgowa podłoga"
        ]
    ],
    [
        "id" => "fiat-ducato",
        "brand" => "Fiat",
        "model" => "Ducato Furgon Maxi L4H2",
        "name" => "Fiat Ducato Maxi L4H2",
        "category" => "furgon",
        "image" => "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        "seats" => 3,
        "engine" => "2.2 MultiJet3 (180 KM)",
        "fuel" => "Diesel",
        "gearbox" => "manualna",
        "volume" => "17.0 m³",
        "payload" => "1450 kg",
        "price" => 199,
        "deposit" => 1100,
        "desc" => "Podwyższony i przedłużony blaszak roboczy. Przestrzeń ładunkowa o długości aż 4.07 m.",
        "specs" => [
            "Wymiary paki: 4.07m x 1.87m x 1.93m",
            "Mieści 5 europalet",
            "Pneumatyczny fotel kierowcy",
            "Mocny i elastyczny silnik 180 KM"
        ]
    ],
    [
        "id" => "peugeot-boxer",
        "brand" => "Peugeot",
        "model" => "Boxer L2H2",
        "name" => "Peugeot Boxer L2H2",
        "category" => "furgon",
        "image" => "https://images.unsplash.com/photo-1551816258-fcbc6c3f7fcb?auto=format&fit=crop&w=800&q=80",
        "seats" => 3,
        "engine" => "2.2 BlueHDi (140 KM)",
        "fuel" => "Diesel",
        "gearbox" => "manualna",
        "volume" => "11.5 m³",
        "payload" => "1180 kg",
        "price" => 159,
        "deposit" => 800,
        "desc" => "Lżejszy, łatwiejszy w manewrowaniu na ciasnych ulicach i osiedlach Skarżyska. Optymalnie ekonomiczny.",
        "specs" => [
            "Wymiary paki: 3.12m x 1.87m x 1.93m",
            "Spalanie zaledwie 7.5L / 100km",
            "Klimatyzacja sprawna",
            "Asystent ruszania pod górę"
        ]
    ],
    [
        "id" => "iveco-daily",
        "brand" => "Iveco",
        "model" => "Daily Skrzynia z Windą",
        "name" => "Iveco Daily Skrzyniowy z Windą",
        "category" => "specjalne",
        "image" => "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
        "seats" => 3,
        "engine" => "3.0 HPI (180 KM)",
        "fuel" => "Diesel",
        "gearbox" => "manualna",
        "volume" => "20.0 m³",
        "payload" => "1100 kg",
        "price" => 269,
        "deposit" => 1500,
        "desc" => "Kontener skrzyniowy wyposażony w hydrauliczną windę załadunkową Dhollandia (750 kg).",
        "specs" => [
            "Wymiary paki: 4.20m x 2.20m x 2.10m",
            "Mieści 8 europalet",
            "Sterowanie windą z pilota",
            "Paleciak dostępny na życzenie"
        ]
    ],
    [
        "id" => "sprinter-laweta",
        "brand" => "Mercedes-Benz",
        "model" => "Sprinter Autolaweta Alu",
        "name" => "Mercedes Sprinter Autolaweta",
        "category" => "specjalne",
        "image" => "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
        "seats" => 3,
        "engine" => "3.0 V6 (190 KM)",
        "fuel" => "Diesel",
        "gearbox" => "automatyczna",
        "volume" => "Długość 4.6 m",
        "payload" => "1350 kg",
        "price" => 320,
        "deposit" => 1500,
        "desc" => "Najazd aluminiowy o długości 4.6 m, mocna wyciągarka z bezprzewodowym pilotem. Bez ciężarowego prawa jazdy (kat. B).",
        "specs" => [
            "Wyciągarka Dragon Winch 5.5 t",
            "Poduszki pneumatyczne zawieszenia",
            "Pasy transportowe w zestawie",
            "Komfortowa skrzynia automatyczna"
        ]
    ]
];

// Oddziały
$branches = [
    ["id" => "SK", "name" => "Skarżysko-Kamienna (Baza)", "fee" => 0],
    ["id" => "KIE", "name" => "Kielce (Dostawa)", "fee" => 60],
    ["id" => "RAD", "name" => "Radom (Dostawa)", "fee" => 70],
    ["id" => "STW", "name" => "Starachowice (Dostawa)", "fee" => 40],
    ["id" => "SZD", "name" => "Szydłowiec (Dostawa)", "fee" => 40],
    ["id" => "KON", "name" => "Końskie (Dostawa)", "fee" => 50],
];

// Opcje dodatkowe
$extras = [
    ["id" => "driver", "name" => "Dodatkowy kierowca", "price" => 15, "one_time" => false],
    ["id" => "gps", "name" => "GPS dla ciężarówek (unikanie niskich wiaduktów)", "price" => 10, "one_time" => false],
    ["id" => "straps", "name" => "Pasy transportowe ściągające (zestaw 4 szt.)", "price" => 20, "one_time" => true],
    ["id" => "trolley", "name" => "Wózek schodowy do AGD/mebli", "price" => 40, "one_time" => true],
    ["id" => "abroad", "name" => "Zgoda na wyjazd UE + ubezpieczenie Assistance", "price" => 149, "one_time" => true],
];

// Obsługa wysłania formularza kontaktowego lub rezerwacji w PHP
$message_success = false;
$reservation_success = false;
$booking_code = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['action']) && $_POST['action'] === 'contact') {
        // Zapisz lead do lokalnego pliku JSON jako prosta baza danych
        $lead = [
            "id" => uniqid(),
            "name" => htmlspecialchars($_POST['name'] ?? ''),
            "phone" => htmlspecialchars($_POST['phone'] ?? ''),
            "message" => htmlspecialchars($_POST['message'] ?? ''),
            "date" => date("Y-m-d H:i:s")
        ];
        
        $leads_file = 'rezerwacje.json';
        $current_data = [];
        if (file_exists($leads_file)) {
            $current_data = json_decode(file_get_contents($leads_file), true) ?? [];
        }
        $current_data['leads'][] = $lead;
        file_put_contents($leads_file, json_encode($current_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $message_success = true;
    }
    
    if (isset($_POST['action']) && $_POST['action'] === 'book') {
        // Zapisz rezerwację do bazy JSON
        $booking_code = "BR24-" . strtoupper(substr(md5(time()), 0, 5));
        $booking = [
            "id" => uniqid(),
            "code" => $booking_code,
            "vehicle_id" => htmlspecialchars($_POST['vehicle_id'] ?? ''),
            "pickup_location" => htmlspecialchars($_POST['pickup_location'] ?? ''),
            "pickup_date" => htmlspecialchars($_POST['pickup_date'] ?? ''),
            "return_date" => htmlspecialchars($_POST['return_date'] ?? ''),
            "days" => intval($_POST['days_count'] ?? 1),
            "insurance" => htmlspecialchars($_POST['insurance_type'] ?? 'standard'),
            "total_price" => htmlspecialchars($_POST['total_price_val'] ?? '0'),
            "customer" => [
                "first_name" => htmlspecialchars($_POST['first_name'] ?? ''),
                "last_name" => htmlspecialchars($_POST['last_name'] ?? ''),
                "email" => htmlspecialchars($_POST['email'] ?? ''),
                "phone" => htmlspecialchars($_POST['phone'] ?? ''),
                "is_company" => isset($_POST['is_company']) ? true : false,
                "company_name" => htmlspecialchars($_POST['company_name'] ?? ''),
                "nip" => htmlspecialchars($_POST['company_nip'] ?? '')
            ],
            "date" => date("Y-m-d H:i:s")
        ];
        
        $leads_file = 'rezerwacje.json';
        $current_data = [];
        if (file_exists($leads_file)) {
            $current_data = json_decode(file_get_contents($leads_file), true) ?? [];
        }
        $current_data['bookings'][] = $booking;
        file_put_contents($leads_file, json_encode($current_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $reservation_success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wypożyczalnia Dostawczych Skarżysko | Samochody Dostawcze i Autolawety</title>
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 scroll-smooth">

    <!-- Header / Navbar -->
    <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <div class="h-9 w-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        SK
                    </div>
                    <span class="font-extrabold text-lg text-white">Dostawcze<span class="text-orange-500">Skarżysko</span>.pl</span>
                </div>
                <!-- Navigation -->
                <nav class="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
                    <a href="#hero" class="hover:text-orange-500 transition">Start</a>
                    <a href="#flota" class="hover:text-orange-500 transition">Flota pojazdów</a>
                    <a href="#kalkulator" class="hover:text-orange-500 transition">Kalkulator cen</a>
                    <a href="#kontakt" class="hover:text-orange-500 transition">Kontakt</a>
                </nav>
                <!-- Quick Contact -->
                <div class="flex items-center space-x-4">
                    <a href="tel:+48500600700" class="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-700 transition">
                        📞 +48 500 600 700
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="relative bg-slate-900 overflow-hidden py-20 lg:py-28 text-white">
        <!-- Background Overlay -->
        <div class="absolute inset-0 opacity-20 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <!-- Hero Left Info -->
                <div class="lg:col-span-7 space-y-6">
                    <div class="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold inline-block">
                        📍 Baza Główna: ul. Legionów 122, Skarżysko-Kamienna
                    </div>
                    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        Wypożyczalnia aut dostawczych <span class="text-orange-500">Skarżysko-Kamienna</span>
                    </h1>
                    <p class="text-base sm:text-lg text-slate-300">
                        Wynajmij niezawodne busy dostawcze (furgony blaszaki L2H2, L3H2, L4H2 Maxi), kontenery z hydrauliczną windą załadunkową oraz autolawety na kategorię B. Rzetelne rozliczenia, niskie kaucje, polskie faktury VAT 23%.
                    </p>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-xs font-medium text-slate-300">
                        <div class="flex items-center space-x-2">
                            <span class="text-xl">✓</span>
                            <span>Prawo jazdy kat. B</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-xl">✓</span>
                            <span>Asistance Polska & UE</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-xl">✓</span>
                            <span>Pasy i akcesoria w cenie</span>
                        </div>
                    </div>
                    <div class="pt-2">
                        <a href="#flota" class="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-orange-600/20 text-sm">
                            Wybierz busa i oblicz koszt →
                        </a>
                    </div>
                </div>

                <!-- Hero Right Calculator Widget -->
                <div class="lg:col-span-5 bg-white text-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200">
                    <h3 class="font-extrabold text-lg text-slate-950 mb-1">Skrócony kalkulator</h3>
                    <p class="text-xs text-slate-500 mb-4">Wybierz parametry, aby przejść do wyceny szczegółowej</p>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Wybierz pojazd</label>
                            <select id="quick_vehicle" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                                <?php foreach ($vehicles as $v): ?>
                                    <option value="<?= $v['id'] ?>" data-price="<?= $v['price'] ?>">
                                        <?= $v['name'] ?> — od <?= $v['price'] ?> zł/dobę
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Miejsce odbioru</label>
                            <select id="quick_loc" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                                <?php foreach ($branches as $b): ?>
                                    <option value="<?= $b['fee'] ?>"><?= $b['name'] ?> (<?= $b['fee'] > 0 ? '+'.$b['fee'].' zł' : 'Darmowy odbiór' ?>)</option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Ilość dób wynajmu</label>
                            <input type="number" id="quick_days" min="1" max="60" value="1" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="pt-2">
                            <button onclick="smoothScrollToCalculator()" class="w-full bg-slate-900 text-white rounded-lg py-3 font-bold text-xs hover:bg-orange-600 transition uppercase tracking-wider">
                                Przejdź do konfiguracji ceny
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Notifier system / Alert if forms are processed -->
    <?php if ($message_success): ?>
        <div class="bg-emerald-50 border-y border-emerald-200 py-4 text-center">
            <p class="text-sm font-semibold text-emerald-800">
                🚀 Dziękujemy! Twoja wiadomość została pomyślnie wysłana. Odpowiemy w ciągu 15 minut!
            </p>
        </div>
    <?php endif; ?>

    <?php if ($reservation_success): ?>
        <div class="bg-orange-50 border-y border-orange-200 py-6 text-center">
            <div class="max-w-xl mx-auto space-y-2">
                <p class="text-lg font-extrabold text-orange-900">🎉 Gwarancja rezerwacji wstępnej!</p>
                <p class="text-sm text-orange-850">
                    Pomyślnie wygenerowano zapytanie o wynajem o kodzie: <strong class="bg-orange-100 px-2 py-0.5 rounded text-orange-600 font-mono"><?= $booking_code ?></strong>
                </p>
                <p class="text-xs text-slate-600">Nasz pracownik z bazy w Skarżysku zadzwoni do Ciebie na wskazany numer telefonu w celu ostatecznego potwierdzenia.</p>
            </div>
        </div>
    <?php endif; ?>

    <!-- Fleet / Flota Section -->
    <section id="flota" class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Nasze samochody dostawcze</h2>
            <p class="mt-4 text-slate-500 text-sm">Flota regularnie sprawdzana, w pełni przygotowana do trudnej pracy. Wszystkie auta prowadzisz na kat. B!</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php foreach ($vehicles as $v): ?>
                <div class="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden flex flex-col justify-between">
                    <div>
                        <div class="relative bg-slate-100 aspect-video overflow-hidden">
                            <img src="<?= $v['image'] ?>" alt="<?= $v['name'] ?>" class="h-full w-full object-cover">
                            <div class="absolute bottom-3 left-3 bg-slate-900/90 text-white px-2 py-1 rounded text-xs font-bold">
                                Od <?= $v['price'] ?> zł/dobę
                            </div>
                        </div>
                        <div class="p-5">
                            <h3 class="font-extrabold text-slate-900 text-lg mb-1"><?= $v['name'] ?></h3>
                            <p class="text-xs text-slate-500 mb-4 line-clamp-2"><?= $v['desc'] ?></p>
                            
                            <!-- Key metrics -->
                            <div class="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 mb-4 text-center text-xs font-semibold text-slate-600">
                                <div class="border-r border-slate-100">
                                    <p class="text-[10px] text-slate-400 font-medium">Skrzynia</p>
                                    <p class="capitalize"><?= $v['gearbox'] ?></p>
                                </div>
                                <div class="border-r border-slate-100">
                                    <p class="text-[10px] text-slate-400 font-medium">Pojemność</p>
                                    <p><?= $v['volume'] ?></p>
                                </div>
                                <div>
                                    <p class="text-[10px] text-slate-400 font-medium">Ładowność</p>
                                    <p><?= $v['payload'] ?></p>
                                </div>
                            </div>

                            <!-- Bullet points -->
                            <ul class="space-y-1.5 mb-4 text-xs text-slate-600">
                                <?php foreach ($v['specs'] as $spec): ?>
                                    <li class="flex items-center space-x-1.5">
                                        <span class="text-emerald-500 font-bold">✓</span>
                                        <span><?= $spec ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>

                    <div class="p-5 pt-0">
                        <button onclick="selectVehicleForCalculator('<?= $v['id'] ?>', <?= $v['price'] ?>, <?= $v['deposit'] ?>, '<?= $v['name'] ?>')" class="w-full bg-slate-950 text-white text-xs py-3 rounded-lg font-black hover:bg-orange-600 hover:shadow-lg transition">
                            WYBIERZ DO KALKULATORA
                        </button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Detailed Interactive Calculator (PHP & JS Backend Integration) -->
    <section id="kalkulator" class="bg-slate-100 py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200">
            <div class="text-center max-w-xl mx-auto mb-8">
                <span class="text-orange-600 text-xs font-black uppercase tracking-wider">MODUŁ KALKULACJI KOSZTÓW</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Szybka wycena i rezerwacja</h2>
                <p class="text-xs text-slate-500 mt-2">Dostosuj ubezpieczenie i dodatki i wyślij zgłoszenie bezpośrednio do bazy w Skarżysku-Kamiennej.</p>
            </div>

            <form method="POST" action="" class="space-y-6">
                <input type="hidden" name="action" value="book">
                <!-- Prices input helpers for logic tracking -->
                <input type="hidden" name="total_price_val" id="total_price_val" value="0">
                <input type="hidden" name="days_count" id="days_count" value="1">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Column Left: Selections -->
                    <div class="space-y-4">
                        <!-- Vehicle Selection -->
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Pojazd dostawczy</label>
                            <select name="vehicle_id" id="calc_vehicle" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" onchange="calculatePrice()">
                                <?php foreach ($vehicles as $v): ?>
                                    <option value="<?= $v['id'] ?>" data-price="<?= $v['price'] ?>" data-deposit="<?= $v['deposit'] ?>">
                                        <?= $v['brand'] ?> <?= $v['model'] ?> (<?= $v['price'] ?> zł/doba)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <!-- Location Selection -->
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Miejsce odbioru i zwrotu</label>
                            <select name="pickup_location" id="calc_location" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" onchange="calculatePrice()">
                                <?php foreach ($branches as $b): ?>
                                    <option value="<?= $b['name'] ?>" data-fee="<?= $b['fee'] ?>">
                                        <?= $b['name'] ?> (<?= $b['fee'] > 0 ? '+'.$b['fee'].' zł opłata' : 'Darmowa Baza' ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <!-- Date selection -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Data odbioru</label>
                                <input type="date" name="pickup_date" id="calc_pickup_date" value="<?= date('Y-m-d', strtotime('+1 day')) ?>" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900" onchange="updateCalcDays()">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Data zwrotu</label>
                                <input type="date" name="return_date" id="calc_return_date" value="<?= date('Y-m-d', strtotime('+3 days')) ?>" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900" onchange="updateCalcDays()">
                            </div>
                        </div>

                        <!-- Extras checklist -->
                        <div>
                            <span class="block text-xs font-bold text-slate-700 uppercase mb-2">Akcesoria pomocnicze</span>
                            <div class="space-y-2 text-xs">
                                <?php foreach ($extras as $ex): ?>
                                    <label class="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150 cursor-pointer hover:bg-slate-100 transition">
                                        <input type="checkbox" name="extras[]" value="<?= $ex['id'] ?>" data-price="<?= $ex['price'] ?>" data-onetime="<?= $ex['one_time'] ? '1' : '0' ?>" class="calc-extra mt-0.5 rounded text-orange-600 focus:ring-orange-500" onchange="calculatePrice()">
                                        <div>
                                            <span class="font-bold text-slate-900"><?= $ex['name'] ?></span>
                                            <span class="text-slate-500 block"><?= $ex['price'] ?> zł / <?= $ex['one_time'] ? 'jednorazowo' : 'dobę' ?></span>
                                        </div>
                                    </label>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>

                    <!-- Column Right: Protection & Customer Contact details -->
                    <div class="space-y-4">
                        <!-- Insurance Multiplier -->
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1.5">Wybór pakietu ochrony</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label class="border-2 border-slate-200 rounded-xl p-3 flex flex-col justify-between cursor-pointer focus-within:border-orange-500 block relative" id="ins_standard_box">
                                    <input type="radio" name="insurance_type" value="standard" checked class="sr-only" onchange="calculatePrice()">
                                    <span class="font-extrabold text-sm text-slate-900">Standard</span>
                                    <span class="text-[11px] text-slate-400 mt-1">Udział własny do 3500 zł. Kaucja 100%.</span>
                                    <span class="text-xs font-bold text-orange-600 mt-2 block">0 zł / dobę</span>
                                </label>
                                <label class="border-2 border-orange-500 rounded-xl p-3 flex flex-col justify-between cursor-pointer relative bg-orange-50/10 block" id="ins_premium_box">
                                    <input type="radio" name="insurance_type" value="premium" class="sr-only" onchange="calculatePrice()">
                                    <span class="font-extrabold text-sm text-slate-900">Premium Gold</span>
                                    <span class="text-[11px] text-slate-400 mt-1">Brak udziału własnego. Kaucja obniżona o 50%.</span>
                                    <span class="text-xs font-bold text-orange-600 mt-2 block">49 zł / dobę</span>
                                </label>
                            </div>
                        </div>

                        <!-- Customer validation form fields -->
                        <div class="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-150">
                            <span class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dane kontaktowe kierowcy</span>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <input type="text" name="first_name" required placeholder="Imię" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500">
                                <input type="text" name="last_name" required placeholder="Nazwisko" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500">
                            </div>

                            <input type="email" name="email" required placeholder="Adres E-mail" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500">
                            <input type="tel" name="phone" required placeholder="Numer Telefonu (np. +48 501...)" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500">

                            <!-- Company Checkbox -->
                            <label class="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer pt-1">
                                <input type="checkbox" id="check_is_company" name="is_company" class="rounded text-orange-600" onchange="toggleCompanyFields()">
                                <span>Wynajem na firmę (Faktura VAT 23%)</span>
                            </label>

                            <!-- Hidden company details -->
                            <div id="company_fields" class="hidden space-y-2 pt-1 transition">
                                <input type="text" name="company_name" placeholder="Nazwa firmy" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-850">
                                <input type="text" name="company_nip" placeholder="NIP firmy" class="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-slate-850">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Live Price Indicator Box -->
                <div class="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <span class="text-xs text-slate-400">Wybrany okres: <strong id="summary_days">2</strong> dób</span>
                        <div class="text-2xl sm:text-3xl font-black text-orange-500 mt-1">
                            <span id="summary_total">---</span> zł brutto
                        </div>
                        <p class="text-[10px] text-slate-400 mt-1">Ostateczna kaucja zwracana przy zdaniu: <strong id="summary_deposit">---</strong> zł</p>
                    </div>

                    <div class="w-full sm:w-auto">
                        <button type="submit" class="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition shadow-lg shadow-orange-600/10">
                            Zgłoś zapytanie o busa
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- General FAQ Section -->
    <section class="py-16 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-extrabold text-slate-950 text-center mb-8">Często Zadawane Pytania (FAQ)</h2>
        <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
                <h4 class="font-bold text-sm text-slate-900">Gdzie dokładnie znajduje się baza w Skarżysku?</h4>
                <p class="text-xs text-slate-500 mt-1">Nasza główna baza mieści się przy ul. Legionów 122 w Skarżysku-Kamiennej, tuż przy obwodnicy S7. Dla wygody klientów oferujemy darmowy, bezpieczny parking na czas trwania wynajmu.</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
                <h4 class="font-bold text-sm text-slate-900">Czy busy są przygotowane do podróży międzynarodowych?</h4>
                <p class="text-xs text-slate-500 mt-1">Tak! Wszystkie nasze busy do 3.5 DMC posiadają pełne ubezpieczenie OC/AC oraz Assistance działające na terenie Unii Europejskiej. Wystarczy zaznaczyć odpowiednią opcję w formularzu.</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
                <h4 class="font-bold text-sm text-slate-900">Na jakich warunkach wynajmują firmy?</h4>
                <p class="text-xs text-slate-500 mt-1">Firma otrzymuje pełną fakturę VAT 23%. Koszt najmu oraz zużyte paliwo stanowią 100% kosztu uzyskania przychodu umożliwiającego optymalizację rozliczenia skarbowego.</p>
            </div>
        </div>
    </section>

    <!-- Contact Form with PHP Handler integration -->
    <section id="kontakt" class="bg-slate-900 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <!-- Info Left -->
                <div class="space-y-6">
                    <h2 class="text-2xl font-extrabold tracking-tight">Skontaktuj się ze Skarżyskiem</h2>
                    <p class="text-xs text-slate-400">Zadzwoń do nas, aby natychmiast dowiedzieć się, które busy dostawcze są wolne 'od ręki'.</p>
                    
                    <div class="space-y-4 text-xs">
                        <div class="flex items-center space-x-3">
                            <span class="text-orange-500 font-bold text-lg">☎</span>
                            <div>
                                <p class="text-slate-400 font-medium">Infolinia / Telefon</p>
                                <p class="font-bold text-white text-sm">+48 500 600 700</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-orange-500 font-bold text-lg">✉</span>
                            <div>
                                <p class="text-slate-400 font-medium">E-mail</p>
                                <p class="font-bold text-white">rezerwacje@dostawczeskarzysko.pl</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-orange-500 font-bold text-lg">📍</span>
                            <div>
                                <p class="text-slate-400 font-medium">Baza główna</p>
                                <p class="text-white">ul. Legionów 122, 26-110 Skarżysko-Kamienna</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Right -->
                <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <h3 class="font-bold text-base mb-3">Zostaw nam szybką wiadomość (Lead)</h3>
                    <form method="POST" action="">
                        <input type="hidden" name="action" value="contact">
                        <div class="space-y-3 text-xs">
                            <div>
                                <label class="block text-slate-400 mb-1">Imię / Nazwa Firmy</label>
                                <input type="text" name="name" required class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white">
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">Numer telefonu kontaktowego</label>
                                <input type="tel" name="phone" required class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white">
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">Treść zapytania / Jakiego auta szukasz?</label>
                                <textarea name="message" required rows="3" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" placeholder="np. Master L3H2 na przeprowadzkę do Kielc od jutra..."></textarea>
                            </div>
                            <button type="submit" class="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded font-black transition">
                                WYŚLIJ FORMULARZ SZYBKIEGO KONTAKTU
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Simple, Elegant Modern CSS Footer -->
    <footer class="bg-slate-950 text-slate-500 text-xs py-10 border-t border-slate-900">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-2">
            <p>© <?= date('Y') ?> DostawczeSkarzysko.pl. Wszystkie prawa zastrzeżone.</p>
            <p class="text-[10px] text-slate-600">Gotowy szablon w czystym PHP, HTML i CSS. Do poprawnego zapisu rezerwacji serwer musi posiadać uprawnienia zapisu pliku rezerwacje.json.</p>
        </div>
    </footer>

    <!-- Interactive JavaScript code calculation -->
    <script>
        function toggleCompanyFields() {
            const isCompany = document.getElementById("check_is_company").checked;
            const fields = document.getElementById("company_fields");
            if (isCompany) {
                fields.classList.remove("hidden");
            } else {
                fields.classList.add("hidden");
            }
        }

        function updateCalcDays() {
            const date1Str = document.getElementById("calc_pickup_date").value;
            const date2Str = document.getElementById("calc_return_date").value;
            
            if (date1Str && date2Str) {
                const date1 = new Date(date1Str);
                const date2 = new Date(date2Str);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const days = diffDays > 0 ? diffDays : 1;
                document.getElementById("days_count").value = days;
                document.getElementById("summary_days").innerText = days;
                calculatePrice();
            }
        }

        function calculatePrice() {
            const vehicleSelect = document.getElementById("calc_vehicle");
            const selectedOpt = vehicleSelect.options[vehicleSelect.selectedIndex];
            const basePrice = parseFloat(selectedOpt.getAttribute("data-price"));
            const baseDeposit = parseFloat(selectedOpt.getAttribute("data-deposit"));

            const locationSelect = document.getElementById("calc_location");
            const selectedLocOpt = locationSelect.options[locationSelect.selectedIndex];
            const deliveryFee = parseFloat(selectedLocOpt.getAttribute("data-fee"));

            const days = parseInt(document.getElementById("days_count").value) || 1;

            // Base pricing calculated
            let total = basePrice * days;

            // Apply extras
            const extrasCheckboxes = document.querySelectorAll(".calc-extra");
            extrasCheckboxes.forEach(chk => {
                if (chk.checked) {
                    const priceExt = parseFloat(chk.getAttribute("data-price"));
                    const isOneTime = chk.getAttribute("data-onetime") === "1";
                    if (isOneTime) {
                        total += priceExt;
                    } else {
                        total += priceExt * days;
                    }
                }
            });

            // Delivery charge
            total += deliveryFee;

            // Insurance Tier applied
            const insuranceInput = document.querySelector('input[name="insurance_type"]:checked');
            let depositMultiplier = 1.0;
            if (insuranceInput && insuranceInput.value === "premium") {
                total += 49 * days; // Premium is 49 zł / day
                depositMultiplier = 0.5; // obniża kaucję o 50%
                
                document.getElementById("ins_premium_box").classList.add("border-orange-500", "bg-orange-50/15");
                document.getElementById("ins_standard_box").classList.remove("border-orange-500");
            } else {
                document.getElementById("ins_standard_box").classList.add("border-orange-500");
                document.getElementById("ins_premium_box").classList.remove("border-orange-500", "bg-orange-50/15");
            }

            // Write outputs
            document.getElementById("summary_total").innerText = total;
            document.getElementById("total_price_val").value = total;
            document.getElementById("summary_deposit").innerText = baseDeposit * depositMultiplier;
        }

        function selectVehicleForCalculator(id, price, deposit, name) {
            const selectEl = document.getElementById("calc_vehicle");
            selectEl.value = id;
            calculatePrice();
            smoothScrollToCalculator();
        }

        function smoothScrollToCalculator() {
            document.getElementById("kalkulator").scrollIntoView({ behavior: "smooth" });
        }

        // Initialize calculations on document load
        document.addEventListener("DOMContentLoaded", () => {
            updateCalcDays();
        });
    </script>
</body>
</html>
