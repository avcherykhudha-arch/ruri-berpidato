import { useState, useEffect, useRef, useCallback } from 'react';
import { SPEECH_SECTIONS } from '../data/speechData';

export interface UseSpeechAudioReturn {
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
  playAll: () => void;
  playSection: (sectionIdx: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  setSelectedVoiceURI: (uri: string) => void;
}

export function useSpeechAudio(): UseSpeechAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState<number | null>(null);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState<number | null>(null);
  const [rate, setRateState] = useState<number>(1.0);
  const [volume, setVolumeState] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [indonesianVoiceFound, setIndonesianVoiceFound] = useState<boolean>(true);

  // Queue tracking ref
  const queueRef = useRef<{ sectionIdx: number; paragraphIdx: number }[]>([]);
  const currentQueueIndexRef = useRef<number>(0);
  const isStoppedRef = useRef<boolean>(false);
  const rateRef = useRef(rate);
  const volumeRef = useRef(volume);
  const selectedVoiceURIRef = useRef(selectedVoiceURI);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    selectedVoiceURIRef.current = selectedVoiceURI;
  }, [selectedVoiceURI]);

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIndonesianVoiceFound(false);
      return;
    }

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      setAvailableVoices(voices);

      // Look for id-ID (Indonesian)
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.toLowerCase().includes('indonesia'));
      if (idVoice) {
        setIndonesianVoiceFound(true);
        if (!selectedVoiceURIRef.current) {
          setSelectedVoiceURI(idVoice.voiceURI);
        }
      } else {
        setIndonesianVoiceFound(false);
        // Fallback to default or English
        const fallback = voices.find(v => v.default) || voices[0];
        if (fallback && !selectedVoiceURIRef.current) {
          setSelectedVoiceURI(fallback.voiceURI);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    isStoppedRef.current = true;
    queueRef.current = [];
    currentQueueIndexRef.current = 0;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSectionIdx(null);
    setCurrentParagraphIdx(null);
  }, []);

  const speakNextInQueue = useCallback(() => {
    if (isStoppedRef.current) return;
    if (currentQueueIndexRef.current >= queueRef.current.length) {
      // Completed entire queue
      stop();
      return;
    }

    const currentItem = queueRef.current[currentQueueIndexRef.current];
    const section = SPEECH_SECTIONS[currentItem.sectionIdx];
    if (!section) {
      stop();
      return;
    }

    const paragraph = section.paragraphs[currentItem.paragraphIdx];
    if (!paragraph) {
      // Advance to next
      currentQueueIndexRef.current += 1;
      speakNextInQueue();
      return;
    }

    setCurrentSectionIdx(currentItem.sectionIdx);
    setCurrentParagraphIdx(currentItem.paragraphIdx);

    const textToSpeak = paragraph.cleanText || paragraph.rawText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Apply voice
    if (availableVoices.length > 0) {
      const chosen = availableVoices.find(v => v.voiceURI === selectedVoiceURIRef.current);
      if (chosen) {
        utterance.voice = chosen;
        utterance.lang = chosen.lang;
      } else {
        utterance.lang = 'id-ID';
      }
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.rate = rateRef.current;
    utterance.volume = volumeRef.current;
    // Pitch slightly dignified and warm
    utterance.pitch = 1.05;

    utterance.onend = () => {
      if (isStoppedRef.current) return;
      currentQueueIndexRef.current += 1;
      // Brief pause between paragraphs for solemnity
      setTimeout(() => {
        speakNextInQueue();
      }, 350);
    };

    utterance.onerror = (e) => {
      // If cancelled or interrupted intentionally
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      currentQueueIndexRef.current += 1;
      speakNextInQueue();
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.speak(utterance);
    }
  }, [availableVoices, stop]);

  const playQueue = useCallback((items: { sectionIdx: number; paragraphIdx: number }[]) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    isStoppedRef.current = false;
    queueRef.current = items;
    currentQueueIndexRef.current = 0;
    setIsPlaying(true);
    setIsPaused(false);
    speakNextInQueue();
  }, [speakNextInQueue]);

  const playAll = useCallback(() => {
    const allItems: { sectionIdx: number; paragraphIdx: number }[] = [];
    SPEECH_SECTIONS.forEach((sec, sIdx) => {
      sec.paragraphs.forEach((_, pIdx) => {
        allItems.push({ sectionIdx: sIdx, paragraphIdx: pIdx });
      });
    });
    playQueue(allItems);
  }, [playQueue]);

  const playSection = useCallback((sectionIdx: number) => {
    const sec = SPEECH_SECTIONS[sectionIdx];
    if (!sec) return;
    const items = sec.paragraphs.map((_, pIdx) => ({
      sectionIdx,
      paragraphIdx: pIdx
    }));
    playQueue(items);
  }, [playQueue]);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const setRate = useCallback((newRate: number) => {
    setRateState(newRate);
  }, []);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const activeVoice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
  const voiceName = activeVoice ? `${activeVoice.name} (${activeVoice.lang})` : (indonesianVoiceFound ? 'Bahasa Indonesia (Default)' : 'Suara Default Browser');

  return {
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
    playAll,
    playSection,
    pause,
    resume,
    stop,
    setRate,
    setVolume,
    setSelectedVoiceURI
  };
}
