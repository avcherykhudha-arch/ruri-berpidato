import React from 'react';
import { Volume2, VolumeX, Play, Pause, Square, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import { SPEECH_SECTIONS } from '../data/speechData';

interface AudioControllerProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentSectionIdx: number | null;
  currentParagraphIdx: number | null;
  rate: number;
  volume: number;
  indonesianVoiceFound: boolean;
  voiceName: string;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  onPlayAll: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSetRate: (rate: number) => void;
  onSetVolume: (volume: number) => void;
  onSelectVoice: (uri: string) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  isPaused,
  currentSectionIdx,
  currentParagraphIdx,
  rate,
  volume,
  indonesianVoiceFound,
  voiceName,
  availableVoices,
  selectedVoiceURI,
  onPlayAll,
  onPause,
  onResume,
  onStop,
  onSetRate,
  onSetVolume,
  onSelectVoice
}) => {
  const currentSection = currentSectionIdx !== null ? SPEECH_SECTIONS[currentSectionIdx] : null;

  return (
    <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-colors mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Section Header & Voice Status */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className={`w-5 h-5 ${isPlaying ? 'text-red-600 animate-pulse' : 'text-slate-400'}`} />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Pelatih Suara (Text-to-Speech Narator)
            </h2>
            {indonesianVoiceFound ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-3 h-3" />
                <span>id-ID Terdeteksi</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="w-3 h-3" />
                <span>Suara Standar Browser</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dengarkan intonasi resmi, jeda khidmat, dan ritme pidato pembina upacara.
          </p>
        </div>

        {/* Right: Master Audio Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-3">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={onPlayAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Seluruh Pidato</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Lanjutkan</span>
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Jeda</span>
              </button>
            )}

            {isPlaying && (
              <button
                onClick={onStop}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all border border-slate-300 dark:border-slate-700"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Hentikan</span>
              </button>
            )}
          </div>

          {/* Speed Preset Segmented Control */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 px-2 font-medium">Tempo:</span>
            <button
              onClick={() => onSetRate(0.75)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                rate === 0.75
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              0.75x
            </button>
            <button
              onClick={() => onSetRate(1.0)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                rate === 1.0
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => onSetRate(1.15)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                rate === 1.15
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1.15x
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={() => onSetVolume(volume === 0 ? 1.0 : 0)}
              aria-label={volume === 0 ? 'Aktifkan suara' : 'Bisukan suara'}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onSetVolume(parseFloat(e.target.value))}
              aria-label="Volume audio"
              className="w-18 accent-red-700 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Voice Selection & Currently Playing Status Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {isPlaying && currentSection ? (
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>
              Sedang dibacakan: <strong>Bagian {currentSection.number} ({currentSection.title})</strong>
              {currentParagraphIdx !== null && ` · Paragraf ${currentParagraphIdx + 1}`}
            </span>
          </div>
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            TTS siap digunakan. Klik <em>&ldquo;Dengarkan Seluruh Pidato&rdquo;</em> atau tombol putar pada tiap bagian di bawah.
          </div>
        )}

        {/* Optional Voice Selector */}
        {availableVoices.length > 0 && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span>Pilihan Suara:</span>
            <select
              value={selectedVoiceURI}
              onChange={(e) => onSelectVoice(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-800 dark:text-slate-200 text-xs focus:ring-1 focus:ring-red-500 focus:outline-hidden max-w-xs truncate"
            >
              {availableVoices.map((v, idx) => (
                <option key={`voice-${idx}-${v.voiceURI || v.name}-${v.lang}`} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
