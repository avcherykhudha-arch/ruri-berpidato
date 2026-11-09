import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { SPEECH_SECTIONS } from '../../data/speechData';
import { generateClozeTokens } from '../../utils/speechUtils';

export const ModeCloze: React.FC = () => {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [revealedBlanks, setRevealedBlanks] = useState<Record<string, boolean>>({});

  const section = SPEECH_SECTIONS[selectedSectionIdx];

  // Tokenize paragraphs for cloze testing
  const processedParagraphs = useMemo(() => {
    return section.paragraphs.map((p, pIdx) => {
      const tokens = generateClozeTokens(p.cleanText);
      return {
        id: p.id,
        pIdx,
        tokens
      };
    });
  }, [section]);

  const toggleSingleBlank = (key: string) => {
    setRevealedBlanks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleAll = () => {
    setShowAllAnswers(!showAllAnswers);
  };

  const handleResetBlanks = () => {
    setShowAllAnswers(false);
    setRevealedBlanks({});
  };

  return (
    <div className="space-y-6">
      {/* Intro info box */}
      <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-4 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold">Latihan Sembunyikan Kalimat (Cloze Test): </span>
            <span>
              Kata-kata kunci telah disembunyikan dengan garis bawah. Tebak kata yang hilang dalam hati, lalu klik pada garis bawah untuk memeriksa kebenarannya.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
          >
            {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAllAnswers ? 'Sembunyikan Jawaban' : 'Tampilkan Semua Jawaban'}</span>
          </button>

          <button
            onClick={handleResetBlanks}
            className="flex items-center gap-1 px-2.5 py-1.5 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg text-amber-900 dark:text-amber-200 transition-colors"
            title="Reset ulang tebakan kata"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Section Selector Tabstrip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {SPEECH_SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => {
              setSelectedSectionIdx(idx);
              setRevealedBlanks({});
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedSectionIdx === idx
                ? 'bg-red-700 text-white font-bold shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Bagian {sec.number}
          </button>
        ))}
      </div>

      {/* Main Reading Card */}
      <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <header className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
            <span>BAGIAN {section.number} DARI 10</span>
            <span>·</span>
            <span>{section.sectionCategory}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {section.title}
          </h2>
        </header>

        <div className="space-y-6">
          {processedParagraphs.map(({ id, pIdx, tokens }) => (
            <div
              key={id}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-100"
            >
              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                {tokens.map((token, tIdx) => {
                  if (!token.isBlank) {
                    return <span key={tIdx}>{token.word}</span>;
                  }

                  const tokenKey = `${id}-${tIdx}`;
                  const isRevealed = showAllAnswers || !!revealedBlanks[tokenKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleSingleBlank(tokenKey)}
                      className={`inline-block px-1.5 py-0.5 rounded text-sm sm:text-base font-semibold transition-all cursor-pointer border ${
                        isRevealed
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                          : 'bg-amber-100/80 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border-dashed border-amber-400 hover:bg-amber-200'
                      }`}
                      title={isRevealed ? 'Klik untuk sembunyikan kembali' : 'Klik untuk melihat kata'}
                    >
                      {isRevealed ? token.original : '________'}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
