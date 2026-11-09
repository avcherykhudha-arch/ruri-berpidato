import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { INTONATION_GUIDES } from '../data/speechData';

interface IntonationLegendProps {
  showTags: boolean;
  onToggleShowTags: () => void;
}

export const IntonationLegend: React.FC<IntonationLegendProps> = ({
  showTags,
  onToggleShowTags
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="no-print bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Panduan Tanda Intonasi &amp; Penjiwaan
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">
            (Hanya untuk panduan visual pembina, tidak dibacakan TTS)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleShowTags}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {showTags ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
            <span>{showTags ? 'Sembunyikan Label' : 'Tampilkan Label'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 hover:underline px-2 py-1"
          >
            <span>{isExpanded ? 'Tutup Detail' : 'Pelajari Detail'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mini Chips preview always visible */}
      <div className="mt-3 flex flex-wrap gap-2">
        {INTONATION_GUIDES.map((guide) => (
          <span
            key={guide.tag}
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase border ${guide.color}`}
          >
            [{guide.tag}] {guide.label.split(' ')[0]}
          </span>
        ))}
      </div>

      {/* Expanded detailed table */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INTONATION_GUIDES.map((guide) => (
            <div
              key={guide.tag}
              className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${guide.color}`}>
                  [{guide.tag}]
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {guide.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {guide.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
