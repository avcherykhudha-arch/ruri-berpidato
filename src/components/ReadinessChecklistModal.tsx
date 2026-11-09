import React from 'react';
import { X, CheckSquare, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { ReadinessChecklistItem } from '../types';

interface ReadinessChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ReadinessChecklistItem[];
  onToggleItem: (id: string) => void;
  onResetChecklist: () => void;
}

export const ReadinessChecklistModal: React.FC<ReadinessChecklistModalProps> = ({
  isOpen,
  onClose,
  checklist,
  onToggleItem,
  onResetChecklist
}) => {
  if (!isOpen) return null;

  const completedCount = checklist.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const categories = ['Vokal & Suara', 'Penguasaan Naskah', 'Bahasa Tubuh', 'Penampilan & Teknis'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-700 dark:text-red-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Checklist Kesiapan Pembina Upacara
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verifikasi kesiapan Bu Ruri Okvawani sebelum 10 November 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Summary */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Status Kesiapan: {completedCount} dari {checklist.length} butir
            </span>
            <span className="font-bold text-red-700 dark:text-red-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist Items list grouped by category */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {categories.map(cat => {
            const items = checklist.filter(c => c.category === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {cat}
                </h3>

                <div className="space-y-2">
                  {items.map(item => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        item.completed
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200'
                          : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleItem(item.id)}
                        className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                      <div className="flex-1 text-xs sm:text-sm">
                        <span className={`font-semibold block ${item.completed ? 'text-emerald-900 dark:text-emerald-300 line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                          {item.title}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetChecklist}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Checklist</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
