// whop-remix cue sheet + score settings (teaser-sound format: [kind, t, ...args] for promo/scripts/synth.mjs)
// The feature's harmony (Dmaj9 → Bm9 → Gmaj7 → A add9 → D) at its 96 bpm: a soft pulse under the story, an arp
// through the deck / founder / talk sections, the visuals landing on their own phrasing rather than every beat.
import { HOOK_START, hookCharT, GLITCH } from './s1-hook.js'
import { T as B } from './s2-bracket.js'
import { DEAL_T } from './s4-deck.js'
import { S5 } from './s5-founder.js'
import { answerTypedAt } from './s6-talk.js'
import { T_TYPE, PER } from './s7-tagline.js'
import { END0, END_K } from './s8-end.js'

const BEAT = 60 / 96, b = (n) => 3.55 + n * BEAT
const Dmaj9 = [146.83, 220.0, 329.63, 369.99, 554.37], Bm9 = [123.47, 185.0, 293.66, 329.63, 440.0], Gmaj7 = [98.0, 196.0, 293.66, 369.99, 493.88]
const Aadd9 = [110.0, 220.0, 277.18, 329.63, 493.88], Dres = [146.83, 220.0, 293.66, 369.99, 440.0, 659.25]
export const MUSIC = {
  padGain: 0.022,
  chords: [[0, 6.9, Dmaj9], [6.9, 14.05, Bm9], [14.05, 22.4, Gmaj7], [22.4, 25.6, Aadd9], [25.6, 29.1, Dres]],
  tempo: [
    { from: b(0), to: b(11) - 0.01, bpm: 96, pulseGain: 0.18 },
    { from: b(11), to: b(30) - 0.01, bpm: 96, pulseGain: 0.22, hatGain: 0.026, arpGain: 0.011 },
    { from: b(30), to: b(34) + 0.3, bpm: 96, pulseGain: 0.2, hatGain: 0.022 },
  ],
}
const E = (tt) => END0 + (tt - 26.95) / END_K           // feature end-card time → remix time
const PENTA = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98]
export const CUES = [
  // S1 · hook: a slow shimmer under the first words, a soft pluck per word
  ['riser', 0.05, 1.3, 0.04],
  ...hookCharT.map((t0, i) => [t0, i]).filter(([t0, i]) => t0 >= 0 && (i === 0 || hookCharT[i - 1] < 0)).map(([t0], k) => ['pluck', HOOK_START + t0, [293.66, 369.99, 440, 493.88, 587.33, 659.25, 739.99][k % 7], 0.035, 0.7, ((k % 3) - 1) * 0.3]),
  ...GLITCH.map(([a]) => ['tick', a, 0.05]),
  ['whoosh', 2.9, 0.75, 0.1], ...[0, 1, 2, 3, 4].map(k => ['tick', 3.0 + k * 0.11, 0.03]),
  ...[1.2, 9.35, 24.1].map(t => ['whoosh', t, 0.6, 0.025]),   // shooting stars
  // S2 · bracket line
  ['pop', B.wIn, 660, 0.04, -0.2], ['pop', B.wYour, 740, 0.035, 0], ['pop', B.wStars, 880, 0.04, 0.2],
  ...[0, 1, 2, 3, 4, 5].map(i => ['bell', 3.8 + i * 0.06 + 0.1, PENTA[i + 1], 0.016, 0.8, (i - 2.5) * 0.25]),
  ['whoosh', B.collapse - 0.05, 0.35, 0.05], ['pop', B.intro, 587.33, 0.045, 0], ['pop', B.open, 880, 0.04, 0.1],
  ...[0, 1, 2, 3, 4, 5].map(k => ['tick', B.open + 0.1 + k * 0.1, 0.018]),
  ['pop', B.align, 739.99, 0.045, 0.2], ['pop', B.close, 440, 0.03, 0],
  // pixel mound → mystery card
  ['whoosh', 6.15, 0.8, 0.09], ['glitter', 6.25, 6.95], ['boom', 6.9, 0.28],
  // S3
  ['whoosh', 7.05, 1.4, 0.05], ['bell', 8.15, 659.25, 0.035, 1.6, 0.2], ['glitter', 8.6, 9.5], ['whoosh', 10.0, 0.7, 0.09],
  // S4 · the deal
  ...DEAL_T.map((t, i) => ['pluck', t + 0.05, [293.66, 369.99, 440, 587.33][i % 4], 0.028, 0.35, ((i % 2) - 0.5) * 0.5]),
  ...DEAL_T.slice(1).map(t => ['tick', t, 0.022]),
  ['bell', 11.75, 739.99, 0.03, 1.6, -0.2], ['bell', 12.05, 880, 0.03, 1.6, 0.2],
  ...[13.3, 13.58, 13.86].map(t => ['tick', t, 0.02]),
  ['whoosh', 14.0, 0.8, 0.08],
  // S5 · the flip, the reveal, the badge push
  ['whoosh', S5.flip[0], 0.8, 0.09],
  ['boom', S5.flip[1] - 0.05, 0.22],
  ...[293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25].map((f, i) => ['bell', S5.flip[1] - 0.05 + i * 0.055, f * 2, 0.03, 1.8, (i - 3) * 0.14]),
  ['glitter', S5.flip[1], S5.flip[1] + 1.1],
  ['bell', S5.flip[1] + 0.2, 739.99, 0.03, 2.0, 0],
  ...[0, 1, 2].map(i => ['bell', S5.flip[1] + 0.6 + i * 0.22, [1174.66, 1318.51, 1479.98][i], 0.022, 1.4, (i - 1) * 0.4]),   // Libra · Gemini · Aquarius glyphs
  ['whoosh', S5.start + 2.9, 1.1, 0.06], ['bell', S5.start + 3.6, 587.33, 0.04, 2.2, -0.3], ['bell', S5.start + 3.75, 880, 0.03, 2.2, 0.3],
  ['whoosh', S5.end - 0.45, 0.6, 0.07],
  // S6 · talk cards + the pill
  ...[0, 1, 2].map(i => ['pop', 18.85 + i * 0.15, [587.33, 739.99, 880][i], 0.03, (i - 1) * 0.4]),
  ['bell', 19.25, 659.25, 0.03, 1.6, 0.2], ['pop', 19.9, 523.25, 0.03, 0.3],
  ['whoosh', 20.1, 0.55, 0.06],
  ...answerTypedAt().map(t => ['tick', t, 0.05]),
  ['whoosh', 21.65, 0.55, 0.05], ['tick', 22.27, 0.12], ['pop', 22.28, 987.77, 0.05, 0.3],
  ['whoosh', 22.3, 0.8, 0.1],
  // S7 · tagline
  ['boom', 22.45, 0.25], ['riser', 22.4, 22.9, 0.04],
  ...[...'Dating, dealt by the stars'].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.03]).filter(Boolean),
  ...Array.from({ length: 13 }, (_, k) => ['bell', 22.9 + k * 0.1 + 0.05, PENTA[k % 8], 0.014, 0.9, ((k % 5) - 2) * 0.2]),
  ['glitter', 23.6, 24.4],
  ['whoosh', 25.2, 0.6, 0.09], ...[0, 1, 2, 3].map(k => ['tick', 25.28 + k * 0.09, 0.03]),
  // S8 · end card (the feature's chimes, on the stretched clock)
  ['whoosh', E(26.95), 0.7, 0.06],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', E(27.4 + i * 0.07), f, 0.05, 2.2, (i - 3) * 0.12]),
  ['bell', E(27.9), 587.33, 0.04, 2.6, 0], ['bell', E(28.25), 880, 0.03, 2.4, 0.2],
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99].map((f, i) => ['bell', E(28.45 + i * 0.075), f, 0.02, 1.2, (i - 4) * 0.1]),
  ['bell', E(29.05), 293.66, 0.05, 2.5], ['bell', E(29.07), 880, 0.03, 2.5],
]
