/**
 * Utilities for speech text processing, timing, intonation stripping, and memorization cloze generation.
 */

export interface SpeechDurationStatus {
  status: 'too_fast' | 'need_slow' | 'on_target' | 'too_slow';
  label: string;
  colorClass: string;
  recommendation: string;
}

/**
 * Strips intonation tags like [TEGAS], [JEDA], [LEMBUT], [TEKANAN], [SEMANGAT], [RENUNGAN]
 * so Web Speech API TTS speaks natural Indonesian without reading bracketed cues.
 */
export function stripIntonationTags(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[(?:TEGAS|JEDA|LEMBUT|TEKANAN|SEMANGAT|RENUNGAN)\]/gi, '')
    // Clean up multiple spaces
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/**
 * Counts words in a string.
 */
export function calculateWordCount(text: string): number {
  if (!text) return 0;
  const clean = text.replace(/\[.*?\]/g, ' ').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Estimates reading duration in minutes based on words per minute (WPM).
 * For ceremonial speeches in Indonesian, normal dignified pace is ~100-110 WPM.
 */
export function estimateSpeechDurationMinutes(wordCount: number, wpm: number = 105): number {
  if (wordCount <= 0 || wpm <= 0) return 0;
  return Number((wordCount / wpm).toFixed(1));
}

/**
 * Formats seconds into MM:SS format.
 */
export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Evaluates speech duration against the 20-minute target:
 * Target: 20 minutes (1,200 seconds)
 * - < 15 min (< 900s): Terlalu cepat
 * - 15–18 min (900s - 1079s): Perlu memperlambat
 * - 18–22 min (1080s - 1320s): Sesuai target
 * - > 22 min (> 1320s): Perlu menyesuaikan durasi
 */
export function getDurationStatus(seconds: number): SpeechDurationStatus {
  if (seconds < 900) {
    return {
      status: 'too_fast',
      label: 'Terlalu Cepat (< 15 menit)',
      colorClass: 'text-amber-700 bg-amber-50 border-amber-300 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800',
      recommendation: 'Perlambat tempo, perpanjang jeda di bagian emosional dan renungan agar pesan meresap.'
    };
  } else if (seconds < 1080) {
    return {
      status: 'need_slow',
      label: 'Perlu Memperlambat (15–18 menit)',
      colorClass: 'text-sky-700 bg-sky-50 border-sky-300 dark:text-sky-300 dark:bg-sky-950/40 dark:border-sky-800',
      recommendation: 'Tempo sudah cukup baik, tambahkan penekanan intonasi dan kontak mata dengan siswa.'
    };
  } else if (seconds <= 1320) {
    return {
      status: 'on_target',
      label: 'Sesuai Target Ideal (18–22 menit)',
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800',
      recommendation: 'Luar biasa! Durasi ini sangat pas untuk upacara resmi Hari Pahlawan 10 November.'
    };
  } else {
    return {
      status: 'too_slow',
      label: 'Perlu Menyesuaikan Durasi (> 22 menit)',
      colorClass: 'text-rose-700 bg-rose-50 border-rose-300 dark:text-rose-300 dark:bg-rose-950/40 dark:border-rose-800',
      recommendation: 'Sedikit terlalu panjang. Jaga agar tidak terlalu bertele-tele agar konsentrasi siswa tetap terjaga.'
    };
  }
}

/**
 * Creates cloze blanks for memorization (replaces every 3rd or 4th substantial word).
 */
export function generateClozeTokens(text: string): { word: string; isBlank: boolean; original: string }[] {
  const clean = text.replace(/\[.*?\]/g, '');
  const tokens = clean.split(/(\s+)/);
  let meaningfulWordIndex = 0;

  return tokens.map(token => {
    // If it's whitespace or punctuation only
    if (/^\s+$/.test(token) || token.length === 0) {
      return { word: token, isBlank: false, original: token };
    }

    // Clean word for length check
    const lettersOnly = token.replace(/[^\w]/g, '');
    if (lettersOnly.length >= 4) {
      meaningfulWordIndex++;
      // Hide every 3rd substantial word
      if (meaningfulWordIndex % 3 === 0) {
        return {
          word: '________',
          isBlank: true,
          original: token
        };
      }
    }

    return { word: token, isBlank: false, original: token };
  });
}
