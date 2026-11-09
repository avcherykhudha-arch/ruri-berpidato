import React from 'react';
import { ChevronLeft, ChevronRight, Play, Check, Edit3, Award, Sparkles } from 'lucide-react';
import { SPEECH_SECTIONS } from '../../data/speechData';
import { ParagraphView } from '../ParagraphView';

interface ModeStepByStepProps {
  activeStepIndex: number;
  onSelectStep: (idx: number) => void;
  showTags: boolean;
  masteredSections: Record<string, boolean>;
  personalNotes: Record<string, string>;
  onToggleMastered: (id: string) => void;
  onOpenNotes: (id: string, title: string) => void;
  onPlaySection: (sectionIdx: number) => void;
  currentSectionIdx: number | null;
  currentParagraphIdx: number | null;
}

export const ModeStepByStep: React.FC<ModeStepByStepProps> = ({
  activeStepIndex,
  onSelectStep,
  showTags,
  masteredSections,
  personalNotes,
  onToggleMastered,
  onOpenNotes,
  onPlaySection,
  currentSectionIdx,
  currentParagraphIdx
}) => {
  const section = SPEECH_SECTIONS[activeStepIndex];
  const isMastered = !!masteredSections[section.id];
  const hasNote = !!personalNotes[section.id];
  const isCurrentSectionAudio = currentSectionIdx === activeStepIndex;

  const handlePrev = () => {
    if (activeStepIndex > 0) onSelectStep(activeStepIndex - 1);
  };

  const handleNext = () => {
    if (activeStepIndex < SPEECH_SECTIONS.length - 1) onSelectStep(activeStepIndex + 1);
  };

  return (
    <div className="space-y-6">
      {/* Step Navigator Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Progres Langkah: Bagian {activeStepIndex + 1} dari {SPEECH_SECTIONS.length}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {Object.keys(masteredSections).filter(k => masteredSections[k]).length} Bagian Sudah Dikuasai
          </span>
        </div>

        {/* 10 Step Buttons */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {SPEECH_SECTIONS.map((sec, idx) => {
            const stepMastered = !!masteredSections[sec.id];
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={sec.id}
                onClick={() => onSelectStep(idx)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? 'bg-red-700 text-white shadow-sm ring-2 ring-red-400'
                    : stepMastered
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={`Bagian ${sec.number}: ${sec.title}`}
              >
                <span>Bag. {sec.number}</span>
                {stepMastered && <span className="text-[10px] text-emerald-600 dark:text-emerald-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Card */}
      <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-red-700 text-white">
                BAGIAN {section.number} DARI 10
              </span>
              <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                {section.sectionCategory}
              </span>
              <span className="text-xs text-slate-400">
                · Est. {section.estimatedMinutes} menit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
              {section.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {section.keyTakeaway}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onPlaySection(activeStepIndex)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Dengarkan Audio Bagian Ini</span>
            </button>

            <button
              onClick={() => onOpenNotes(section.id, section.title)}
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Catatan pribadi"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleMastered(section.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                isMastered
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isMastered ? 'Sudah Dihafal' : 'Tandai Dikuasai'}</span>
            </button>
          </div>
        </div>

        {/* Paragraphs Content */}
        <div className="p-6 sm:p-8 space-y-4">
          {section.paragraphs.map((p, pIdx) => {
            const isActive = isCurrentSectionAudio && currentParagraphIdx === pIdx;
            return (
              <ParagraphView
                key={p.id}
                paragraph={p}
                isActive={isActive}
                showTags={showTags}
                fontSizeClass="text-lg sm:text-xl leading-relaxed"
              />
            );
          })}
        </div>

        {/* Quick cues footer */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Kata Kunci Ingatan Cepat (Memory Cues):
          </div>
          <div className="flex flex-wrap gap-2">
            {section.cues.map((cue, cIdx) => (
              <span
                key={cIdx}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-800 dark:text-slate-200 font-medium shadow-2xs"
              >
                {cIdx + 1}. {cue}
              </span>
            ))}
          </div>
        </div>

        {/* Personal Note Callout if present */}
        {hasNote && (
          <div className="px-6 pb-6 pt-2">
            <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
              <div className="font-bold flex items-center gap-1 mb-1 text-amber-800 dark:text-amber-400">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Catatan Pribadi Anda:</span>
              </div>
              <p className="whitespace-pre-wrap">{personalNotes[section.id]}</p>
            </div>
          </div>
        )}

        {/* Bottom Pagination controls */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bagian Sebelumnya</span>
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Gunakan tombol panah atau klik nomor bagian di atas
          </span>

          <button
            onClick={handleNext}
            disabled={activeStepIndex === SPEECH_SECTIONS.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-red-700 hover:bg-red-800 text-white shadow-xs"
          >
            <span>Bagian Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
};
