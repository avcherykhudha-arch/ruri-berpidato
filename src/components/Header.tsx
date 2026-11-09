import React from 'react';
import { Maximize2, Minimize2, Sun, Moon, Printer, CheckSquare, Sparkles } from 'lucide-react';
import { PracticeMode } from '../types';

interface HeaderProps {
  activeMode: PracticeMode;
  onSelectMode: (mode: PracticeMode) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenChecklist: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  onSelectMode,
  isDarkTheme,
  onToggleTheme,
  isFullscreen,
  onToggleFullscreen,
  onOpenChecklist,
  onPrint,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm tracking-wider">HP</span>
            </div>
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
            >
              SPEECH COACH 2026
            </a>
          </div>

          {/* Zone 2: Navigation Links / Fast Mode Access */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectMode('read')}
              className={`hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'read' ? 'text-red-700 dark:text-red-400 font-semibold' : ''
              }`}
            >
              Baca & Dengarkan
            </button>
            <button
              onClick={() => onSelectMode('step')}
              className={`hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'step' ? 'text-red-700 dark:text-red-400 font-semibold' : ''
              }`}
            >
              Hafalan Bertahap
            </button>
            <button
              onClick={() => onSelectMode('cloze')}
              className={`hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'cloze' ? 'text-red-700 dark:text-red-400 font-semibold' : ''
              }`}
            >
              Sembunyikan Kalimat
            </button>
            <button
              onClick={() => onSelectMode('cue')}
              className={`hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'cue' ? 'text-red-700 dark:text-red-400 font-semibold' : ''
              }`}
            >
              Uji Hafalan
            </button>
            <button
              onClick={onOpenChecklist}
              className="hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <CheckSquare className="w-4 h-4 text-red-600" />
              <span>Checklist</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onPrint}
              aria-label="Cetak naskah pidato"
              title="Cetak Naskah Pidato"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? 'Keluar layar penuh' : 'Layar penuh'}
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hidden sm:inline-flex"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onToggleTheme}
              aria-label={isDarkTheme ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={isDarkTheme ? 'Mode Terang' : 'Mode Gelap'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onSelectMode('podium')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeMode === 'podium'
                  ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                  : 'bg-red-700 hover:bg-red-800 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mode Podium</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
