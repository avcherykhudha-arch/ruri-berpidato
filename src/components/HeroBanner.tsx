import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, Award, Shield, RotateCcw, CheckCircle2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/speechData';

interface HeroBannerProps {
  masteredCount: number;
  totalSections: number;
  totalWords: number;
  onResetProgress: () => void;
  onOpenChecklist: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  masteredCount,
  totalSections,
  totalWords,
  onResetProgress,
  onOpenChecklist
}) => {
  // Countdown to 10 November 2026
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.targetDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const masteryPercent = Math.round((masteredCount / totalSections) * 100);

  return (
    <section className="no-print relative overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-slate-900 text-white rounded-2xl shadow-xl border border-red-800/60 p-6 sm:p-8 lg:p-10 mb-8 transition-colors">
      {/* Background Patriotic Flag Waves & Subtle Watermark Emblem */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      <div className="absolute right-6 top-8 opacity-10 pointer-events-none hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Greeting & Identity */}
        <div className="lg:col-span-8 space-y-4">
          {/* Subtle National Ribbon */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-800/80 border border-red-700/60 rounded-md text-xs text-red-100 font-medium tracking-wide">
            {/* Indonesian flag icon */}
            <span className="inline-flex flex-col w-4 h-3 rounded overflow-hidden shadow-sm border border-white/20">
              <span className="h-1.5 bg-red-600 w-full" />
              <span className="h-1.5 bg-white w-full" />
            </span>
            <span>Upacara Hari Pahlawan Nasional 2026</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              SELAMAT DATANG, BU RURI OKVAWANI
            </h1>
            <p className="mt-2 text-base sm:text-lg text-red-100/90 leading-relaxed max-w-3xl">
              Persiapkan suara, hati, dan semangat untuk menjadi inspirasi bagi generasi penerus bangsa di podium upacara.
            </p>
          </div>

          {/* Theme Banner */}
          <div className="p-4 bg-black/35 backdrop-blur-sm rounded-xl border border-amber-500/30">
            <div className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Tema Resmi Amanat Upacara
            </div>
            <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
              &ldquo;{EVENT_DETAILS.theme}&rdquo;
            </p>
          </div>

          {/* Event Metadata Strip (clean unboxed text with typographic separators) */}
          <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-red-200/80">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{EVENT_DETAILS.dateFormatted}</span>
            </span>
            <span aria-hidden="true" className="text-red-400">·</span>
            <span className="flex items-center gap-1.5 text-white font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{EVENT_DETAILS.venue}</span>
            </span>
            <span aria-hidden="true" className="text-red-400">·</span>
            <span className="flex items-center gap-1.5 text-white font-medium">
              <User className="w-4 h-4 text-amber-400" />
              <span>{EVENT_DETAILS.pembina}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Countdown & Mastery Card */}
        <div className="lg:col-span-4 bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/10 space-y-5">
          {/* Countdown Clock */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-semibold uppercase tracking-wider text-amber-300">Menuju Upacara</span>
              <span className="tabular-nums font-mono text-slate-400">10 Nov 2026 · 07:30</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/10 rounded-lg p-2 border border-white/5">
                <span className="block text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Hari</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 border border-white/5">
                <span className="block text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Jam</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 border border-white/5">
                <span className="block text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Menit</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 border border-white/5">
                <span className="block text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider">Detik</span>
              </div>
            </div>
          </div>

          {/* Progress / Mastery Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Penguasaan Naskah</span>
              </span>
              <span className="font-semibold text-emerald-400 tabular-nums">
                {masteredCount} dari {totalSections} Bagian ({masteryPercent}%)
              </span>
            </div>
            <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div>
              <span className="block text-slate-400 text-[11px]">Total Naskah</span>
              <span className="font-bold text-white tabular-nums">
                {totalWords.toLocaleString('id-ID')} kata (~20 menit)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenChecklist}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors flex items-center gap-1"
                title="Buka checklist kesiapan"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kesiapan</span>
              </button>
              <button
                onClick={onResetProgress}
                className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                title="Reset seluruh progres hafalan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
