import React from 'react';
import { ParagraphItem } from '../types';

interface ParagraphViewProps {
  paragraph: ParagraphItem;
  isActive: boolean;
  showTags: boolean;
  fontSizeClass?: string;
}

export const ParagraphView: React.FC<ParagraphViewProps> = ({
  paragraph,
  isActive,
  showTags,
  fontSizeClass = 'text-base sm:text-lg leading-relaxed'
}) => {
  // Renders text with inline intonation chips if showTags is true
  const renderFormattedContent = () => {
    if (!showTags) {
      return (
        <p className={`${fontSizeClass} text-slate-800 dark:text-slate-100 whitespace-pre-line`}>
          {paragraph.cleanText}
        </p>
      );
    }

    // Split text by intonation tags
    const regex = /(\[(?:TEGAS|JEDA|LEMBUT|TEKANAN|SEMANGAT|RENUNGAN)\])/g;
    const parts = paragraph.rawText.split(regex);

    return (
      <p className={`${fontSizeClass} text-slate-800 dark:text-slate-100 whitespace-pre-line`}>
        {parts.map((part, idx) => {
          if (part === '[TEGAS]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-red-700 text-white align-baseline select-none shadow-2xs">
                TEGAS
              </span>
            );
          }
          if (part === '[JEDA]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-600 text-white align-baseline select-none shadow-2xs">
                JEDA
              </span>
            );
          }
          if (part === '[LEMBUT]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-400 align-baseline select-none shadow-2xs">
                LEMBUT
              </span>
            );
          }
          if (part === '[TEKANAN]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-blue-700 text-white align-baseline select-none shadow-2xs">
                TEKANAN
              </span>
            );
          }
          if (part === '[SEMANGAT]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-orange-600 text-white align-baseline select-none shadow-2xs">
                SEMANGAT
              </span>
            );
          }
          if (part === '[RENUNGAN]') {
            return (
              <span key={idx} className="inline-block mx-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-purple-700 text-white align-baseline select-none shadow-2xs">
                RENUNGAN
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div
      className={`transition-all duration-300 rounded-lg p-3 sm:p-4 ${
        isActive
          ? 'bg-amber-50 dark:bg-amber-950/30 ring-2 ring-amber-500 shadow-md'
          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
      }`}
    >
      {renderFormattedContent()}
      {showTags && paragraph.deliveryTip && (
        <div className="mt-2 text-xs italic text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span className="font-semibold text-red-700 dark:text-red-400">Tips Pembina:</span>
          <span>{paragraph.deliveryTip}</span>
        </div>
      )}
    </div>
  );
};
