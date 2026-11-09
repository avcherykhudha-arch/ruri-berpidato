import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Type, Clock, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { SPEECH_SECTIONS, EVENT_DETAILS } from '../../data/speechData';
import { formatTime } from '../../utils/speechUtils';

interface ModePodiumProps {
  onExitPodium: () => void;
  seconds: number;
  isTimerRunning: boolean;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResetTimer: () => void;
  isDarkTheme: boolean;
}

export const ModePodium: React.FC<ModePodiumProps> = ({
  onExitPodium,
  seconds,
  isTimerRunning,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  isDarkTheme
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('large');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1, 2, 3, 4
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: scrollSpeed,
          behavior: 'smooth'
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  // Escape key to exit podium mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExitPodium();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExitPodium]);

  const fontSizeClass = {
    normal: 'text-xl sm:text-2xl leading-relaxed',
    large: 'text-2xl sm:text-3xl lg:text-4xl leading-relaxed font-medium',
    huge: 'text-3xl sm:text-4xl lg:text-5xl leading-loose font-medium'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Top Floating Teleprompter HUD */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitPodium}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Mode Normal</span>
          </button>

          <div className="hidden md:block text-xs text-slate-400">
            <span>Podium Pembina: </span>
            <strong className="text-white">{EVENT_DETAILS.pembina}</strong>
          </div>
        </div>

        {/* Stopwatch In Teleprompter HUD */}
        <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-base sm:text-lg font-bold text-white tabular-nums">
            {formatTime(seconds)}
          </span>
          {isTimerRunning ? (
            <button
              onClick={onPauseTimer}
              className="p-1 hover:bg-white/10 rounded text-amber-300 transition-colors"
              title="Jeda timer"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              onClick={onStartTimer}
              className="p-1 hover:bg-white/10 rounded text-emerald-400 transition-colors"
              title="Mulai timer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
          <button
            onClick={onResetTimer}
            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Font Size & Auto Scroll Controls */}
        <div className="flex items-center gap-2">
          {/* Font size toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-red-700 text-white font-bold' : 'text-slate-300'}`}
              title="Huruf Sedang"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-red-700 text-white font-bold' : 'text-slate-300'}`}
              title="Huruf Besar"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('huge')}
              className={`px-2 py-1 rounded ${fontSize === 'huge' ? 'bg-red-700 text-white font-bold' : 'text-slate-300'}`}
              title="Huruf Sangat Besar"
            >
              A++
            </button>
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isAutoScrolling
                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden sm:inline">{isAutoScrolling ? 'Henti Gulir' : 'Auto Gulir'}</span>
          </button>

          {/* Scroll speed */}
          {isAutoScrolling && (
            <div className="flex items-center gap-1 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">
              <span className="text-slate-400">Kecepatan:</span>
              <button
                onClick={() => setScrollSpeed(Math.max(1, scrollSpeed - 1))}
                className="px-1 text-slate-300 hover:text-white"
              >
                -
              </button>
              <span className="font-bold text-amber-400">{scrollSpeed}x</span>
              <button
                onClick={() => setScrollSpeed(Math.min(5, scrollSpeed + 1))}
                className="px-1 text-slate-300 hover:text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Reading Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-24 py-12 space-y-16 max-w-5xl mx-auto scroll-smooth"
      >
        {/* Ceremonial Header on Teleprompter */}
        <div className="text-center border-b border-slate-800 pb-8 space-y-3">
          <div className="inline-block px-3 py-1 rounded bg-red-900/60 text-red-200 text-xs uppercase tracking-widest font-bold">
            SMAS TUNAS BARU JIN SEUNG BATAM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            UPACARA PERINGATAN HARI PAHLAWAN 2026
          </h1>
          <p className="text-amber-400 font-semibold text-sm sm:text-base">
            &ldquo;{EVENT_DETAILS.theme}&rdquo;
          </p>
          <div className="text-xs text-slate-400 pt-2">
            Pembina Upacara: <strong className="text-white">{EVENT_DETAILS.pembina}</strong> · Selasa, 10 November 2026
          </div>
        </div>

        {/* 10 Sections in large clear type */}
        {SPEECH_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-6 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-red-800 text-white font-mono text-xs font-bold uppercase tracking-wider">
                BAGIAN {section.number}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-amber-400">
                {section.title}
              </h2>
            </div>

            <div className="space-y-6">
              {section.paragraphs.map((p) => (
                <p key={p.id} className={`${fontSizeClass} text-slate-100 whitespace-pre-line tracking-wide`}>
                  {p.cleanText}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center py-12 border-t border-slate-800">
          <div className="text-amber-400 font-bold text-xl sm:text-2xl mb-2">
            MERDEKA! INDONESIA TETAP MERDEKA!
          </div>
          <p className="text-xs text-slate-500">
            Amanat selesai. Berikan hormat dan senyum hangat kepada seluruh peserta upacara sebelum menuruni podium.
          </p>
        </div>
      </div>
    </div>
  );
};
