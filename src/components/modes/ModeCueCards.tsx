import React, { useState } from 'react';
import { Eye, EyeOff, Key, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { SPEECH_SECTIONS } from '../../data/speechData';

interface ModeCueCardsProps {
  masteredSections: Record<string, boolean>;
  onToggleMastered: (id: string) => void;
}

export const ModeCueCards: React.FC<ModeCueCardsProps> = ({
  masteredSections,
  onToggleMastered
}) => {
  const [peekSectionId, setPeekSectionId] = useState<string | null>(null);

  const togglePeek = (id: string) => {
    setPeekSectionId(peekSectionId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Intro info box */}
      <div className="bg-red-50 dark:bg-red-950/40 rounded-xl p-4 border border-red-200 dark:border-red-900/60 flex items-center gap-3 text-xs text-red-950 dark:text-red-200">
        <Key className="w-5 h-5 text-red-700 dark:text-red-400 shrink-0" />
        <div>
          <span className="font-bold">Mode 4 – Uji Hafalan (Kartu Petunjuk Kata Kunci): </span>
          <span>
            Naskah utama disembunyikan. Ujilah daya ingat Anda hanya dengan membaca kata kunci di bawah ini. Jika Anda lupa atau ragu, klik tombol <em>&ldquo;Intip Naskah Asli&rdquo;</em> untuk mengecek.
          </span>
        </div>
      </div>

      {/* Grid of Cue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SPEECH_SECTIONS.map((section) => {
          const isMastered = !!masteredSections[section.id];
          const isPeeking = peekSectionId === section.id;

          return (
            <article
              key={section.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between ${
                isMastered
                  ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-red-700 text-white">
                      BAGIAN {section.number}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Est. {section.estimatedMinutes}m
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleMastered(section.id)}
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors ${
                      isMastered
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Hafal' : 'Tandai Hafal'}</span>
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {section.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 italic">
                  &ldquo;{section.keyTakeaway}&rdquo;
                </p>

                {/* Cues List */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Alur Kata Kunci:
                  </div>
                  <ul className="space-y-1.5">
                    {section.cues.map((cue, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Peek Drawer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => togglePeek(section.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  {isPeeking ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isPeeking ? 'Tutup Kembali Naskah' : 'Intip Naskah Asli'}</span>
                </button>

                {isPeeking && (
                  <div className="mt-3 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 max-h-64 overflow-y-auto">
                    {section.paragraphs.map((p) => (
                      <p key={p.id} className="whitespace-pre-line">
                        {p.cleanText}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
