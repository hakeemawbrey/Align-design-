// whop-remix2 cue sheet + score (teaser-sound format: [kind, t, ...args] for promo/scripts/synth.mjs)
// 96 bpm, calm and confident. The feature's harmony (Dmaj9 · Bm9 · Gmaj7 · A add9 → D) with a real arrangement:
//   pad (wide) + electric-piano keys (rootless voicings) + warm bass, a laid-back kit (kick 1 · &2 · 3, snaps on 2 & 4,
//   swung shaker) that only plays under the "doing" sections and breathes out for the reveals:
//   0.00 intro (no drums: pad, sub bass, a pluck per word) → 3.55 S2 light groove → drop + riser → 6.90 mound impact
//   6.90 S3 mystery (no drums: held keys, bell on the caption) → 10.36 the deal (groove; deal plucks sit on the
//   beat's triplet grid) → 14.05 breath for the glide + flip, swell → 15.50 REVEAL impact (groove restarts on it)
//   → talk deck, pill, typing → 20.55 breath, swell → 21.05 tagline impact (groove + arp) → 24.20 end mark, D resolves.
// Each groove section starts its own bar grid on its impact, so the big visual moments are downbeats.
// The mix is side-chained to the kick, then mastered to −14 LUFS / −1.5 dBTP by teaser-sound's opt-in `master`.
import { HOOK_START, hookCharT, GLITCH } from './s1-hook.js'
import { T as B } from './s2-bracket.js'
import { DEAL_T } from './s4-deck.js'
import { S5 } from './s5-founder.js'
import { answerTypedAt } from './s6-talk.js'
import { T_TYPE, PER } from './s7-tagline.js'
import { END0, END_K, END_LEN } from './s8-end.js'

const SHIFT = 1.4                                       // S6/S7 play 1.4 s earlier than their own clocks (see index.js)
const BEAT = 60 / 96, E8 = BEAT / 2, S16 = BEAT / 4
const END = END0 + END_LEN

// voicings: pad (wide), keys (mid, rootless), bass root
const CH = {
  D: { pad: [146.83, 220.0, 329.63, 369.99, 554.37], keys: [293.66, 369.99, 440.0, 554.37], root: 73.42 },
  Bm: { pad: [123.47, 185.0, 293.66, 329.63, 440.0], keys: [246.94, 293.66, 369.99, 440.0], root: 61.74 },
  G: { pad: [98.0, 196.0, 293.66, 369.99, 493.88], keys: [246.94, 293.66, 369.99, 440.0], root: 49.0 },
  A: { pad: [110.0, 220.0, 277.18, 329.63, 493.88], keys: [220.0, 277.18, 329.63, 493.88], root: 55.0 },
  Dres: { pad: [146.83, 220.0, 293.66, 369.99, 440.0, 659.25], keys: [293.66, 369.99, 440.0, 587.33], root: 73.42 },
}
// groove sections: [anchor (bar 1, beat 1), beats played, intensity 0..1]
const G_B = [3.55, 4, 0.45], G_D = [10.36, 6, 1], G_F = [S5.flip[1] - 0.05, 8, 0.9], G_G = [21.05, 5, 1]
const F0 = G_F[0], at = (g, n) => g[0] + n * BEAT
const PLAN = [
  [0, at(G_B, 4), 'D'],                 // the stars have aligned · { cards, not swipes }
  [at(G_B, 4), 6.9, 'G'],              // the mound rises
  [6.9, 8.6, 'Bm'],                    // Juniper's mystery card
  [8.6, G_D[0], 'G'],                  // "No photos until you both align."
  [G_D[0], at(G_D, 2), 'D'],           // the deal
  [at(G_D, 2), at(G_D, 4), 'A'],       // every night
  [at(G_D, 4), 14.05, 'Bm'],           // a new deck
  [14.05, F0, 'G'],                    // glide + flip (held breath)
  [F0, at(G_F, 2), 'D'],               // REVEAL
  [at(G_F, 2), at(G_F, 4), 'A'],       // "Both align. Then you see them."
  [at(G_F, 4), at(G_F, 6), 'Bm'],      // the talk deck
  [at(G_F, 6), at(G_F, 8), 'G'],       // the pill, typing
  [at(G_F, 8), G_G[0], 'A'],           // send (breath)
  [G_G[0], at(G_G, 2), 'D'],           // Dating, dealt by the stars
  [at(G_G, 2), at(G_G, 4), 'G'],
  [at(G_G, 4), END0, 'A'],
  [END0, END, 'Dres'],                 // the Align mark
]
export const MUSIC = { padGain: 0.016, chords: PLAN.map(([a, b, c]) => [a, b, CH[c].pad]) }

const chordAt = (t) => CH[(PLAN.find(([a, b]) => t >= a - 1e-6 && t < b) || PLAN[PLAN.length - 1])[2]]
const music = [], drums = [], kickT = []
// ── keys + bass
for (const [a, b, c] of PLAN) {
  const inGroove = [G_B, G_D, G_F, G_G].some(g => a >= g[0] - 0.01 && a < g[0] + g[1] * BEAT - 0.01)
  if (!inGroove) {
    // held voicing (sections without drums): a soft keys chord + a sustained bass root
    music.push(['keys', a + 0.02, CH[c].keys, Math.min(3.2, b - a + 0.6), 0.036, 0.02])
    if (a > 0.5) music.push(['bass', a, CH[c].root, b - a, 0.042])
  }
}
// intro: the bass enters under "Space City." (no sub boom on frame 1)
music.push(['bass', 1.3, CH.D.root, at(G_B, 0) - 1.3, 0.035])
for (const g of [G_B, G_D, G_F, G_G]) {
  const [g0, n, k] = g
  for (let i = 0; i < n; i++) {
    const t = g0 + i * BEAT, bt = i % 4, ch = chordAt(t + 0.01)
    // keys: comp on 1 (ring), the & of 2 and 4 (short)
    if (bt === 0) music.push(['keys', t + 0.01, ch.keys, 1.1, 0.036 * (0.7 + 0.3 * k), 0.014])
    if (bt === 1 && k > 0.6) music.push(['keys', t + E8, ch.keys.slice(1), 0.3, 0.02, 0.008])
    if (bt === 3 && k > 0.6) music.push(['keys', t, ch.keys.slice(1), 0.35, 0.022, 0.008])
    // bass: root on 1 and 3, a pickup on the & of 2 and the & of 4
    if (bt === 0 || bt === 2) music.push(['bass', t, ch.root, bt === 0 ? 0.52 : 0.46, 0.095 * (0.75 + 0.25 * k)])
    if ((bt === 1 || bt === 3) && k > 0.6) music.push(['bass', t + E8, bt === 3 ? ch.root * 2 : ch.root, 0.2, 0.065])
    // kit
    if (bt === 0 || bt === 2) { drums.push(['kick', t, 0.22 * (0.8 + 0.2 * k)]); kickT.push(t) }
    if (bt === 1 && k > 0.6) { drums.push(['kick', t + E8, 0.11]); kickT.push(t + E8) }
    if ((bt === 1 || bt === 3) && k > 0.6) drums.push(['snap', t, 0.065, 0.12])
    for (let s = 0; s < 4; s++) {
      const swing = s % 2 ? S16 * 0.18 : 0
      drums.push(['shaker', t + s * S16 + swing, (s === 2 ? 0.024 : s === 0 ? 0.017 : 0.011) * (0.6 + 0.4 * k), s % 2 ? 0.25 : -0.2])
    }
  }
}
// arpeggio for the tagline lift (8ths over the chords)
music.push(['arp', MUSIC.chords, 96, G_G[0], at(G_G, 5) - 0.02, 0.03])
music.push(['arp', MUSIC.chords, 96, at(G_F, 4), at(G_F, 8) - 0.02, 0.02])

const E = (tt) => END0 + (tt - 26.95) / END_K           // feature end-card time → remix time
const PENTA = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98]
const snapTo = (t, g, div = 3) => { const q = BEAT / div, n = Math.round((t - g) / q), tq = g + n * q; return Math.abs(tq - t) < 0.03 ? tq : t }
const sfx = [
  // S1 · hook: a slow shimmer under the first words, a soft pluck per word
  ['riser', 0.05, 1.3, 0.035],
  ...hookCharT.map((t0, i) => [t0, i]).filter(([t0, i]) => t0 >= 0 && (i === 0 || hookCharT[i - 1] < 0)).map(([t0], k) => ['pluck', HOOK_START + t0, [293.66, 369.99, 440, 493.88, 587.33, 659.25, 739.99][k % 7], 0.034, 0.7, ((k % 3) - 1) * 0.3]),
  ...GLITCH.map(([a]) => ['tick', a, 0.045]),
  ['whoosh', 2.9, 0.75, 0.09], ...[0, 1, 2, 3, 4].map(k => ['tick', 3.0 + k * 0.11, 0.026]),
  // S2 · bracket line
  ['pop', B.wIn, 660, 0.034, -0.2], ['pop', B.wYour, 740, 0.03, 0], ['pop', B.wStars, 880, 0.034, 0.2],
  ...[0, 1, 2, 3, 4, 5].map(i => ['bell', 3.8 + i * 0.06 + 0.1, PENTA[i + 1], 0.013, 0.8, (i - 2.5) * 0.25]),
  ['whoosh', B.collapse - 0.05, 0.35, 0.045], ['pop', B.intro, 587.33, 0.04, 0], ['pop', B.open, 880, 0.034, 0.1],
  ...[0, 1, 2, 3, 4, 5].map(k => ['tick', B.open + 0.1 + k * 0.1, 0.016]),
  ['pop', B.align, 739.99, 0.04, 0.2], ['pop', B.close, 440, 0.028, 0],
  // pixel mound → mystery card (a held breath, then the impact on the first clear frame)
  ['swell', 6.1, 6.9, 0.06], ['whoosh', 6.15, 0.8, 0.07], ['glitter', 6.25, 6.95], ['boom', 6.9, 0.26],
  ['bell', 6.92, 493.88, 0.03, 2.4, -0.15], ['bell', 6.95, 739.99, 0.022, 2.4, 0.15],
  // S3 · the camera eases back, glint, caption, foil, push into the card
  ['whoosh', 7.35, 1.4, 0.04], ['bell', 8.15, 659.25, 0.032, 1.8, 0.2], ['bell', 8.4, 987.77, 0.016, 1.6, -0.2], ['glitter', 8.6, 9.5],
  ['swell', 9.75, 10.36, 0.05], ['whoosh', 10.2, 0.7, 0.07],
  // S4 · the deal (plucks on the beat's triplet grid), the words, the cards tucked behind
  ...DEAL_T.map((t, i) => ['pluck', snapTo(t + 0.03, G_D[0]), [293.66, 369.99, 440, 587.33][i % 4], 0.026, 0.35, ((i % 2) - 0.5) * 0.5]),
  ...DEAL_T.slice(1).map(t => ['tick', snapTo(t, G_D[0]), 0.018]),
  ['bell', 11.77, 739.99, 0.026, 1.6, -0.2], ['bell', 12.08, 880, 0.026, 1.6, 0.2],
  ...[13.3, 13.58, 13.86].map(t => ['tick', t, 0.016]),
  ['whoosh', 14.1, 0.8, 0.06],
  // S5 · the glide, the flip, the reveal
  ['swell', S5.flip[0] - 0.2, F0, 0.07], ['whoosh', S5.flip[0] + 0.35, 0.8, 0.075],
  ['boom', F0, 0.24],
  ...[293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25].map((f, i) => ['bell', F0 + i * 0.055, f * 2, 0.026, 1.8, (i - 3) * 0.14]),
  ['glitter', S5.flip[1], S5.flip[1] + 1.1],
  ['bell', S5.flip[1] + 0.2, 739.99, 0.026, 2.0, 0],
  ['whoosh', S5.flip[1] + 1.45, 1.2, 0.035],          // the gold glint crossing her card
  ['whoosh', S5.end - 0.25, 0.6, 0.05],               // out to the talk deck
  // S6 · talk cards + the pill (cue times on S6's own clock, shifted)
  ...[0, 1, 2].map(i => ['pop', 18.85 - SHIFT + i * 0.15, [587.33, 739.99, 880][i], 0.026, (i - 1) * 0.4]),
  ['bell', 19.25 - SHIFT, 659.25, 0.026, 1.6, 0.2], ['pop', 19.9 - SHIFT, 523.25, 0.026, 0.3],
  ['whoosh', 20.55 - SHIFT, 0.8, 0.045],
  ...answerTypedAt().map(t => ['tick', t - SHIFT, 0.042]),
  ['whoosh', 22.0 - SHIFT, 0.55, 0.04], ['tick', 22.27 - SHIFT, 0.1], ['pop', 22.28 - SHIFT, 987.77, 0.045, 0.3],
  ['swell', 22.0 - SHIFT, G_G[0], 0.05], ['whoosh', 22.3 - SHIFT, 0.8, 0.08],
  // S7 · tagline
  ['boom', G_G[0], 0.24], ['riser', 21.0, 21.5, 0.03],
  ...[...'Dating, dealt by the stars'].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE - SHIFT + i * PER, 0.026]).filter(Boolean),
  ...Array.from({ length: 13 }, (_, k) => ['bell', 22.9 - SHIFT + k * 0.1 + 0.05, PENTA[k % 8], 0.011, 0.9, ((k % 5) - 2) * 0.2]),
  ['glitter', 23.6 - SHIFT, 24.4 - SHIFT],
  ['whoosh', 25.2 - SHIFT, 0.6, 0.075], ...[0, 1, 2, 3].map(k => ['tick', 25.28 - SHIFT + k * 0.09, 0.026]),
  // S8 · end card (the feature's chimes, on the stretched clock) — the D chord resolves under the mark
  ['boom', END0 + 0.02, 0.14], ['keys', END0 + 0.05, CH.Dres.keys, 3.6, 0.026, 0.03], ['bass', END0, CH.Dres.root, 3.0, 0.045],
  ['whoosh', E(26.95), 0.7, 0.05],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', E(27.4 + i * 0.07), f, 0.032, 2.2, (i - 3) * 0.12]),
  ['bell', E(27.9), 587.33, 0.026, 2.6, 0], ['bell', E(28.25), 880, 0.02, 2.4, 0.2],
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99].map((f, i) => ['bell', E(28.45 + i * 0.075), f, 0.013, 1.2, (i - 4) * 0.1]),
  ['bell', E(29.05), 293.66, 0.032, 3.0], ['bell', E(29.07), 880, 0.02, 3.0],
]
// order matters: the music bed is side-chained to the kick before the drums and sound design go in
export const CUES = [...music, ['duck', kickT, 0.3, 0.3], ...drums, ...sfx]
