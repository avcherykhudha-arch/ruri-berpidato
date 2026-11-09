import React from 'react';
import { SPEECH_SECTIONS, EVENT_DETAILS } from '../data/speechData';

export const PrintView: React.FC = () => {
  return (
    <div className="print-only text-black bg-white p-8 max-w-4xl mx-auto font-serif leading-relaxed text-sm">
      {/* Formal Ceremonial Letterhead */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wider">
          SMAS TUNAS BARU JIN SEUNG BATAM
        </h1>
        <p className="text-xs uppercase font-semibold">
          NASKAH AMANAT PEMBINA UPACARA PERINGATAN HARI PAHLAWAN NASIONAL
        </p>
        <p className="text-xs italic">
          Selasa, 10 November 2026 · Lapangan Upacara SMAS Tunas Baru Jin Seung Batam
        </p>
      </div>

      {/* Metadata Protocol */}
      <div className="mb-6 p-3 border border-black/40 text-xs space-y-1">
        <div><strong>Pembina Upacara:</strong> {EVENT_DETAILS.pembina}</div>
        <div><strong>Tema Resmi:</strong> &ldquo;{EVENT_DETAILS.theme}&rdquo;</div>
        <div><strong>Alokasi Waktu:</strong> ± 20 Menit (2.185 Kata)</div>
      </div>

      {/* 10 Sections Content */}
      <div className="space-y-6">
        {SPEECH_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-2">
            <h2 className="font-bold text-base uppercase border-b border-black/20 pb-1">
              Bagian {section.number}: {section.title}
            </h2>
            <div className="space-y-3 pl-2">
              {section.paragraphs.map((p) => (
                <p key={p.id} className="whitespace-pre-line text-justify leading-relaxed">
                  {p.cleanText}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Signature Section */}
      <div className="mt-12 pt-6 border-t border-black/40 flex justify-between text-xs">
        <div>
          <p>Mengetahui,</p>
          <p className="mt-12 font-bold underline">Kepala SMAS Tunas Baru Jin Seung</p>
        </div>
        <div className="text-right">
          <p>Batam, 10 November 2026</p>
          <p>Pembina Upacara,</p>
          <p className="mt-12 font-bold underline">{EVENT_DETAILS.pembina}</p>
        </div>
      </div>
    </div>
  );
};
