import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Target, AlertCircle } from 'lucide-react';
import { formatTime, getDurationStatus } from '../utils/speechUtils';

interface SpeechTimerProps {
  seconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  totalWords: number;
}

export const SpeechTimer: React.FC<SpeechTimerProps> = ({
  seconds,
  isRunning,
  onStart,
  onPause,
  onReset,
  totalWords
}) => {
  const durationStatus = getDurationStatus(seconds);
  const targetSeconds = 20 * 60; // 1200s
  const progressRatio = Math.min(seconds / targetSeconds, 1.3);

  // Keyboard shortcut spacebar to toggle timer when not typing in text fields
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'KeyT') {
        if (isRunning) onPause();
        else onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, onPause, onStart]);

  return (
    <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-colors mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Header and target indicator */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Stopwatch Latihan Pidato
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              · Target 20 Menit (18–22m)
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Kendalikan tempo bicara, hembuskan napas, dan jaga ketenangan saat pergantian bagian pidato.
          </p>
        </div>

        {/* Center: Large Time & Controls */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {formatTime(seconds)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isRunning ? (
              <button
                onClick={onPause}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-xs sm:text-sm shadow-sm transition-all"
                title="Jeda stopwatch"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Jeda</span>
              </button>
            ) : (
              <button
                onClick={onStart}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium text-xs sm:text-sm shadow-sm transition-all"
                title="Mulai stopwatch"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai</span>
              </button>
            )}

            <button
              onClick={onReset}
              className="p-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
              title="Reset stopwatch ke 00:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Target Progress Bar & Zones */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          {/* Visual Target Zone marker (18m - 22m, corresponds to 90% to 110% of 20m) */}
          <div
            className="absolute top-0 bottom-0 bg-emerald-500/20 border-x border-emerald-500/40 pointer-events-none"
            style={{ left: '75%', width: '20%' }}
            title="Zona Ideal 18–22 Menit"
          />
          {/* Progress fill */}
          <div
            className={`h-full transition-all duration-300 ${
              seconds >= 1080 && seconds <= 1320
                ? 'bg-emerald-500'
                : seconds > 1320
                ? 'bg-rose-500'
                : 'bg-red-600'
            }`}
            style={{ width: `${Math.min(progressRatio * 100, 100)}%` }}
          />
        </div>

        {/* 4 Status Labels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className={`p-2 rounded border text-center ${seconds > 0 && seconds < 900 ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-bold' : 'text-slate-500 dark:text-slate-400 border-transparent'}`}>
            <span>&lt; 15m: Terlalu Cepat</span>
          </div>
          <div className={`p-2 rounded border text-center ${seconds >= 900 && seconds < 1080 ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 font-bold' : 'text-slate-500 dark:text-slate-400 border-transparent'}`}>
            <span>15–18m: Perlambat</span>
          </div>
          <div className={`p-2 rounded border text-center ${seconds >= 1080 && seconds <= 1320 ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold' : 'text-slate-500 dark:text-slate-400 border-transparent'}`}>
            <span className="flex items-center justify-center gap-1">
              <Target className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              18–22m: Sesuai Target
            </span>
          </div>
          <div className={`p-2 rounded border text-center ${seconds > 1320 ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 font-bold' : 'text-slate-500 dark:text-slate-400 border-transparent'}`}>
            <span>&gt; 22m: Sesuaikan Durasi</span>
          </div>
        </div>

        {/* Live Recommendation */}
        {seconds > 10 && (
          <div className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs ${durationStatus.colorClass}`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{durationStatus.label}: </span>
              <span>{durationStatus.recommendation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
