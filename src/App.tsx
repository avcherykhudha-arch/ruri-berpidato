import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SpeechTimer } from './components/SpeechTimer';
import { AudioController } from './components/AudioController';
import { IntonationLegend } from './components/IntonationLegend';
import { ModeFullRead } from './components/modes/ModeFullRead';
import { ModeStepByStep } from './components/modes/ModeStepByStep';
import { ModeCloze } from './components/modes/ModeCloze';
import { ModeCueCards } from './components/modes/ModeCueCards';
import { ModePodium } from './components/modes/ModePodium';
import { ReadinessChecklistModal } from './components/ReadinessChecklistModal';
import { NotesModal } from './components/NotesModal';
import { PrintView } from './components/PrintView';
import { useSpeechAudio } from './hooks/useSpeechAudio';
import { SPEECH_SECTIONS, READINESS_CHECKLIST_DEFAULT, EVENT_DETAILS } from './data/speechData';
import { calculateWordCount } from './utils/speechUtils';
import { PracticeMode, ReadinessChecklistItem } from './types';
import { BookOpen, Layers, EyeOff, Key, Sparkles, Printer } from 'lucide-react';

export default function App() {
  // Practice Mode state
  const [activeMode, setActiveMode] = useState<PracticeMode>('read');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [showTags, setShowTags] = useState<boolean>(true);

  // Stopwatch state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('speech_coach_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Modals state
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [notesModalState, setNotesModalState] = useState<{
    isOpen: boolean;
    sectionId: string | null;
    sectionTitle: string;
  }>({
    isOpen: false,
    sectionId: null,
    sectionTitle: ''
  });

  // LocalStorage-backed state: Mastered Sections
  const [masteredSections, setMasteredSections] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('speech_coach_mastered');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  // LocalStorage-backed state: Personal Notes
  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('speech_coach_notes');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  // LocalStorage-backed state: Checklist
  const [checklist, setChecklist] = useState<ReadinessChecklistItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('speech_coach_checklist');
        return saved ? JSON.parse(saved) : READINESS_CHECKLIST_DEFAULT;
      } catch {
        return READINESS_CHECKLIST_DEFAULT;
      }
    }
    return READINESS_CHECKLIST_DEFAULT;
  });

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('speech_coach_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('speech_coach_dark_mode', 'false');
    }
  }, [isDarkTheme]);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Save mastered sections
  useEffect(() => {
    localStorage.setItem('speech_coach_mastered', JSON.stringify(masteredSections));
  }, [masteredSections]);

  // Save personal notes
  useEffect(() => {
    localStorage.setItem('speech_coach_notes', JSON.stringify(personalNotes));
  }, [personalNotes]);

  // Save checklist
  useEffect(() => {
    localStorage.setItem('speech_coach_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Stopwatch interval timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Text to Speech hook
  const audio = useSpeechAudio();

  // Total word count
  const totalWords = useMemo(() => {
    return SPEECH_SECTIONS.reduce((acc, s) => {
      return acc + s.paragraphs.reduce((pAcc, p) => pAcc + calculateWordCount(p.rawText), 0);
    }, 0);
  }, []);

  const masteredCount = useMemo(() => {
    return Object.values(masteredSections).filter(Boolean).length;
  }, [masteredSections]);

  // Handlers
  const handleToggleTheme = () => setIsDarkTheme(prev => !prev);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleToggleMastered = (id: string) => {
    setMasteredSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenNotes = (id: string, title: string) => {
    setNotesModalState({
      isOpen: true,
      sectionId: id,
      sectionTitle: title
    });
  };

  const handleSaveNote = (sectionId: string, note: string) => {
    setPersonalNotes(prev => ({
      ...prev,
      [sectionId]: note
    }));
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleResetChecklist = () => {
    setChecklist(READINESS_CHECKLIST_DEFAULT);
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset seluruh progres hafalan dan catatan latihan Bu Ruri?')) {
      setMasteredSections({});
      setPersonalNotes({});
      setTimerSeconds(0);
      setIsTimerRunning(false);
      audio.stop();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Formal Header strictly complying with top bar contract */}
      <Header
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        isDarkTheme={isDarkTheme}
        onToggleTheme={handleToggleTheme}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Banner with Identity & Countdown */}
        <HeroBanner
          masteredCount={masteredCount}
          totalSections={SPEECH_SECTIONS.length}
          totalWords={totalWords}
          onResetProgress={handleResetProgress}
          onOpenChecklist={() => setIsChecklistOpen(true)}
        />

        {/* Stopwatch Card */}
        <SpeechTimer
          seconds={timerSeconds}
          isRunning={isTimerRunning}
          onStart={() => setIsTimerRunning(true)}
          onPause={() => setIsTimerRunning(false)}
          onReset={() => {
            setIsTimerRunning(false);
            setTimerSeconds(0);
          }}
          totalWords={totalWords}
        />

        {/* Text to Speech Narration Bar */}
        <AudioController
          isPlaying={audio.isPlaying}
          isPaused={audio.isPaused}
          currentSectionIdx={audio.currentSectionIdx}
          currentParagraphIdx={audio.currentParagraphIdx}
          rate={audio.rate}
          volume={audio.volume}
          indonesianVoiceFound={audio.indonesianVoiceFound}
          voiceName={audio.voiceName}
          availableVoices={audio.availableVoices}
          selectedVoiceURI={audio.selectedVoiceURI}
          onPlayAll={audio.playAll}
          onPause={audio.pause}
          onResume={audio.resume}
          onStop={audio.stop}
          onSetRate={audio.setRate}
          onSetVolume={audio.setVolume}
          onSelectVoice={audio.setSelectedVoiceURI}
        />

        {/* Intonation Legend & Toggle */}
        <IntonationLegend
          showTags={showTags}
          onToggleShowTags={() => setShowTags(prev => !prev)}
        />

        {/* 5 Modes Navigation Segmented Bar */}
        <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl p-1.5 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-wrap gap-1">
          <button
            onClick={() => setActiveMode('read')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'read'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mode 1: Baca & Dengarkan</span>
          </button>

          <button
            onClick={() => setActiveMode('step')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'step'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Mode 2: Hafalan Bertahap</span>
          </button>

          <button
            onClick={() => setActiveMode('cloze')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'cloze'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Mode 3: Sembunyikan Kalimat</span>
          </button>

          <button
            onClick={() => setActiveMode('cue')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'cue'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Mode 4: Uji Hafalan</span>
          </button>

          <button
            onClick={() => setActiveMode('podium')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'podium'
                ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
            <span>Mode 5: Mode Podium</span>
          </button>
        </div>

        {/* Active Mode Rendering */}
        <div className="transition-opacity duration-200">
          {activeMode === 'read' && (
            <ModeFullRead
              currentSectionIdx={audio.currentSectionIdx}
              currentParagraphIdx={audio.currentParagraphIdx}
              showTags={showTags}
              masteredSections={masteredSections}
              personalNotes={personalNotes}
              onToggleMastered={handleToggleMastered}
              onOpenNotes={handleOpenNotes}
              onPlaySection={audio.playSection}
            />
          )}

          {activeMode === 'step' && (
            <ModeStepByStep
              activeStepIndex={activeStepIndex}
              onSelectStep={setActiveStepIndex}
              showTags={showTags}
              masteredSections={masteredSections}
              personalNotes={personalNotes}
              onToggleMastered={handleToggleMastered}
              onOpenNotes={handleOpenNotes}
              onPlaySection={audio.playSection}
              currentSectionIdx={audio.currentSectionIdx}
              currentParagraphIdx={audio.currentParagraphIdx}
            />
          )}

          {activeMode === 'cloze' && <ModeCloze />}

          {activeMode === 'cue' && (
            <ModeCueCards
              masteredSections={masteredSections}
              onToggleMastered={handleToggleMastered}
            />
          )}

          {activeMode === 'podium' && (
            <ModePodium
              onExitPodium={() => setActiveMode('read')}
              seconds={timerSeconds}
              isTimerRunning={isTimerRunning}
              onStartTimer={() => setIsTimerRunning(true)}
              onPauseTimer={() => setIsTimerRunning(false)}
              onResetTimer={() => {
                setIsTimerRunning(false);
                setTimerSeconds(0);
              }}
              isDarkTheme={isDarkTheme}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              SMAS TUNAS BARU JIN SEUNG BATAM
            </span>
            <span aria-hidden="true">·</span>
            <span>Upacara Hari Pahlawan 10 November 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="hover:text-slate-800 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Naskah Resmi</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Pembina Upacara: {EVENT_DETAILS.pembina}</span>
          </div>
        </div>
      </footer>

      {/* Modals & Print Component */}
      <ReadinessChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        checklist={checklist}
        onToggleItem={handleToggleChecklistItem}
        onResetChecklist={handleResetChecklist}
      />

      <NotesModal
        isOpen={notesModalState.isOpen}
        sectionId={notesModalState.sectionId}
        sectionTitle={notesModalState.sectionTitle}
        initialNote={notesModalState.sectionId ? (personalNotes[notesModalState.sectionId] || '') : ''}
        onClose={() => setNotesModalState(prev => ({ ...prev, isOpen: false }))}
        onSaveNote={handleSaveNote}
      />

      {/* Formatted Paper Print View */}
      <PrintView />
    </div>
  );
}
