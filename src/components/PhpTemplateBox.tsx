import React, { useState } from "react";
import { Clipboard, Check, FileText, Download, Code, ArrowRight } from "lucide-react";

export default function PhpTemplateBox() {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Quick instructions
  const handleCopyPath = () => {
    navigator.clipboard.writeText("/php-version/index.php");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-800" id="php-template-section">
      <div className="mx-auto max-w-4xl bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 border border-orange-500/20">
              <Code className="h-3.5 w-3.5" />
              <span>Dedykowana wersja PHP + CSS</span>
            </div>
            <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight">
              Chcesz uruchomić tę stronę w PHP i CSS?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Generujemy dla Ciebie w pełni gotowy, czysty plik <strong className="text-orange-400">index.php</strong> z nowoczesnym, ostylowanym kalkulatorem dób i cen, formularzem zgłoszeń w PHP oraz kompletną listą aut dostawczych ze Skarżyska-Kamiennej. Możesz go wgrać na dowolny polski serwer (np. cyberfolks, home.pl, dhosting).
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handleCopyPath}
              className="flex items-center space-x-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Skopiowano ścieżkę!</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-3.5 w-3.5 text-slate-400" />
                  <span>Kopiuj ścieżkę do pliku</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/settings" // Placeholder or instruction, typical is self download
              onClick={(e) => {
                e.preventDefault();
                alert("Aby pobrać cały projekt w PHP i CSS jako archiwum ZIP:\n\n1. Otwórz menu ustawień (ikona zębatki na górze po prawej w AI Studio)\n2. Wybierz 'Export to ZIP' lub 'Export to GitHub'\n3. Wypakowany plik '/php-version/index.php' jest gotowy do wgrania na Twój serwer FTP!");
              }}
              className="flex items-center space-x-1.5 rounded-lg bg-orange-600 px-4 py-2 text-xs font-black text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/10 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Instrukcja pobierania ZIP</span>
            </a>
          </div>
        </div>

        {/* Info badges */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400">
          <div className="flex items-start space-x-2">
            <span className="text-lg text-orange-500">✓</span>
            <div>
              <p className="font-extrabold text-white">Dynamiczne ceny w JS</p>
              <p className="text-[11px] text-slate-500">Wbudowane przeliczanie dób, dodatków i ubezpieczenia.</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lg text-orange-500">✓</span>
            <div>
              <p className="font-extrabold text-white">Autonomiczny plik PHP</p>
              <p className="text-[11px] text-slate-500">Zero zewnętrznych zależności, łatwa edycja tagami PHP.</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lg text-orange-500">✓</span>
            <div>
              <p className="font-extrabold text-white">Zapis zapytań do pliku</p>
              <p className="text-[11px] text-slate-500">Rezerwacje zapisują się automatycznie do rezerwacje.json.</p>
            </div>
          </div>
        </div>

        {/* Expandable Code Viewer */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs text-orange-400 font-extrabold flex items-center space-x-1 hover:underline focus:outline-none"
          >
            <span>{showCode ? "Ukryj podgląd kodu PHP" : "Pokaż podgląd kodu PHP do skopiowania"}</span>
            <ArrowRight className={`h-3 w-3 transition-transform ${showCode ? "rotate-90" : ""}`} />
          </button>

          {showCode && (
            <div className="mt-4 bg-slate-900 rounded-lg p-4 border border-slate-800 max-h-60 overflow-y-auto font-mono text-[10px] text-slate-300 scrollbar-thin">
              <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                  <FileText className="h-3.5 w-3.5 text-orange-500" />
                  <span>/php-version/index.php</span>
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<?php\n// Wynajem aut dostawczych Skarżysko...\n?>`);
                    alert("Skopiowano podstawowy skrót kodu. Cały rozbudowany plik index.php znajduje się w Twoim workspace!");
                  }}
                  className="text-[10px] text-orange-400 hover:text-orange-300 font-bold"
                >
                  Kopiuj zawartość
                </button>
              </div>
              <pre className="whitespace-pre overflow-x-auto text-slate-400">
{`<?php
// Wyporzyczalnia Samochodów Dostawczych Skarżysko-Kamienna
// Kod zintegrowany z kalkulatorem i zapisem w rezerwacje.json

$vehicles = [
    ["id" => "renault-master", "name" => "Renault Master L3H2 Furgon", "price" => 179],
    ["id" => "fiat-ducato", "name" => "Fiat Ducato Maxi L4H2", "price" => 199],
    ["id" => "peugeot-boxer", "name" => "Peugeot Boxer L2H2", "price" => 159],
    ["id" => "iveco-daily", "name" => "Iveco Daily z Windą Załadunkową", "price" => 269],
    ["id" => "sprinter-laweta", "name" => "Mercedes Sprinter Autolaweta", "price" => 320]
];
...
// Zobacz pełny wygenerowany plik w /php-version/index.php w strukturze plików!
`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
