import test from 'node:test';
import assert from 'node:assert/strict';
import {
  stripIntonationTags,
  calculateWordCount,
  estimateSpeechDurationMinutes,
  formatTime,
  getDurationStatus,
  generateClozeTokens
} from './speechUtils';

test('stripIntonationTags removes all bracketed cues cleanly', () => {
  const input = '[TEGAS] Kita tidak boleh menyerah! [JEDA] [RENUNGAN] Renungkanlah pengorbanan mereka.';
  const output = stripIntonationTags(input);
  assert.equal(output.includes('[TEGAS]'), false);
  assert.equal(output.includes('[RENUNGAN]'), false);
  assert.equal(output.includes('[JEDA]'), false);
  assert.equal(output.includes('Kita tidak boleh menyerah!'), true);
  assert.equal(output.includes('Renungkanlah pengorbanan mereka.'), true);
});

test('calculateWordCount calculates words accurately excluding tags', () => {
  const input = '[SEMANGAT] Merdeka! Merdeka! Merdeka! [JEDA] [TEGAS] Maju terus!';
  // Words: Merdeka! Merdeka! Merdeka! Maju terus! -> 5 words
  const count = calculateWordCount(input);
  assert.equal(count, 5);
});

test('estimateSpeechDurationMinutes computes ceremonial duration', () => {
  // 2100 words at 105 wpm -> 20.0 minutes
  const est = estimateSpeechDurationMinutes(2100, 105);
  assert.equal(est, 20.0);
});

test('formatTime formats seconds to MM:SS correctly', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(1200), '20:00');
});

test('getDurationStatus identifies target zones accurately', () => {
  // < 15 min (< 900s) -> too_fast
  assert.equal(getDurationStatus(600).status, 'too_fast');
  // 15-18 min (900 - 1079s) -> need_slow
  assert.equal(getDurationStatus(1000).status, 'need_slow');
  // 18-22 min (1080 - 1320s) -> on_target
  assert.equal(getDurationStatus(1200).status, 'on_target');
  // > 22 min (> 1320s) -> too_slow
  assert.equal(getDurationStatus(1400).status, 'too_slow');
});

test('generateClozeTokens creates blanks for memorization without crashing', () => {
  const sample = 'Pahlawan bangsa telah gugur memperjuangkan kemerdekaan Indonesia dengan segenap tumpah darah.';
  const tokens = generateClozeTokens(sample);
  assert.ok(tokens.length > 0);
  const blanks = tokens.filter(t => t.isBlank);
  assert.ok(blanks.length > 0);
  assert.equal(blanks[0].word, '________');
  assert.ok(blanks[0].original.length > 0);
});
