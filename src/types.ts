export interface ParagraphItem {
  id: string;
  rawText: string; // Contains tags like [TEGAS], [JEDA], etc.
  cleanText: string; // Stripped for TTS
  intonationFocus?: 'TEGAS' | 'JEDA' | 'LEMBUT' | 'TEKANAN' | 'SEMANGAT' | 'RENUNGAN';
  deliveryTip?: string;
}

export interface SpeechSection {
  id: string;
  number: number;
  title: string;
  sectionCategory: string;
  estimatedMinutes: number;
  paragraphs: ParagraphItem[];
  cues: string[]; // Key cues for Mode 4 (Uji Hafalan)
  keyTakeaway: string; // Summary cue for quick memory recall
}

export type PracticeMode = 'read' | 'step' | 'cloze' | 'cue' | 'podium';

export interface ReadinessChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Vokal & Suara' | 'Bahasa Tubuh' | 'Penguasaan Naskah' | 'Penampilan & Teknis';
  completed: boolean;
}

export interface SpeechAppState {
  activeMode: PracticeMode;
  activeSectionIndex: number;
  activeParagraphIndex: number;
  isTimerRunning: boolean;
  timerSeconds: number;
  masteredSections: Record<string, boolean>;
  personalNotes: Record<string, string>;
  checklist: ReadinessChecklistItem[];
  ttsRate: number; // 0.75, 1.0, 1.15
  ttsVolume: number; // 0 to 1
  ttsPlaying: boolean;
  ttsPaused: boolean;
  isDarkTheme: boolean;
  fontSizePodium: 'normal' | 'large' | 'huge';
  podiumAutoScroll: boolean;
  podiumScrollSpeed: number; // 1 to 5
}
