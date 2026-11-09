import React from 'react';
import { Play, Check, Edit3, Volume2 } from 'lucide-react';
import { SPEECH_SECTIONS } from '../../data/speechData';
import { ParagraphView } from '../ParagraphView';

interface ModeFullReadProps {
  currentSectionIdx: number | null;
  currentParagraphIdx: number | null;
  showTags: boolean;
  masteredSections: Record<string, boolean>;
  personalNotes: Record<string, string>;
  onToggleMastered: (id: string) => void;
  onOpenNotes: (id: string, title: string) => void;
  onPlaySection: (sectionIdx: number) => void;
}

export const ModeFullRead: React.FC<ModeFullReadProps> = ({
  currentSectionIdx,
  currentParagraphIdx,
  showTags,
  masteredSections,
  personalNotes,
  onToggleMastered,
  onOpenNotes,
  onPlaySection
}) => {
  return (
    <div className="space-y-8">
      {SPEECH_SECTIONS.map((section, sIdx) => {
        const isMastered = !!masteredSections[section.id];
        const hasNote = !!personalNotes[section.id];
        const isCurrentSection = currentSectionIdx === sIdx;

        return (
          <article
            key={section.id}
            id={`section-${section.number}`}
            className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden ${
              isCurrentSection
                ? 'border-red-600 shadow-md ring-1 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Section Header */}
            <header className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-red-700 text-white tracking-wider">
                    BAGIAN {section.number}
                  </span>
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                    {section.sectionCategory}
                  </span>
                  <span className="text-xs text-slate-400">
                    · Est. {section.estimatedMinutes} menit
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {section.title}
                </h3>
              </div>

              {/* Action Buttons for this section */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onPlaySection(sIdx)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold transition-colors border border-red-200 dark:border-red-800"
                  title="Dengarkan pembacaan bagian ini"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar Bagian Ini</span>
                </button>

                <button
                  onClick={() => onOpenNotes(section.id, section.title)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    hasNote
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                  title="Tambah catatan khusus untuk bagian ini"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{hasNote ? 'Lihat Catatan' : 'Catatan'}</span>
                </button>

                <button
                  onClick={() => onToggleMastered(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    isMastered
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700'
                  }`}
                  title={isMastered ? 'Tandai belum hafal' : 'Tandai sudah dikuasai'}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isMastered ? 'Dikuasai' : 'Belum Hafal'}</span>
                </button>
              </div>
            </header>

            {/* Paragraphs */}
            <div className="p-4 sm:p-6 space-y-4">
              {section.paragraphs.map((p, pIdx) => {
                const isActive = isCurrentSection && currentParagraphIdx === pIdx;
                return (
                  <ParagraphView
                    key={p.id}
                    paragraph={p}
                    isActive={isActive}
                    showTags={showTags}
                  />
                );
              })}
            </div>

            {/* Personal Note Callout if present */}
            {hasNote && (
              <div className="px-6 pb-5 pt-0">
                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
                  <div className="font-bold flex items-center gap-1 mb-1 text-amber-800 dark:text-amber-400">
                    <Edit3 className="w-3 h-3" />
                    <span>Catatan Pribadi Bu Ruri:</span>
                  </div>
                  <p className="whitespace-pre-wrap">{personalNotes[section.id]}</p>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};
