import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, Trash2 } from 'lucide-react';

interface NotesModalProps {
  isOpen: boolean;
  sectionId: string | null;
  sectionTitle: string;
  initialNote: string;
  onClose: () => void;
  onSaveNote: (sectionId: string, note: string) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  sectionId,
  sectionTitle,
  initialNote,
  onClose,
  onSaveNote
}) => {
  const [noteText, setNoteText] = useState(initialNote);

  useEffect(() => {
    setNoteText(initialNote);
  }, [initialNote, sectionId]);

  if (!isOpen || !sectionId) return null;

  const handleSave = () => {
    onSaveNote(sectionId, noteText.trim());
    onClose();
  };

  const handleClear = () => {
    setNoteText('');
    onSaveNote(sectionId, '');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Catatan Pribadi Bu Ruri
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {sectionTitle}
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

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Tuliskan pengingat vokal, pandangan mata, atau kata-kata yang dirasa masih sulit dihafalkan:
          </p>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Contoh: Beri jeda 3 detik setelah menyebut nama pahlawan Surabaya. Tatap langsung barisan kelas 12..."
            rows={5}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden transition-all"
          />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Catatan</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Catatan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
