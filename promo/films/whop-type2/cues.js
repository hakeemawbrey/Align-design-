// whop-type2 score (teaser-sound format) · 96 bpm, calm and confident.
// The bar grid starts on the first bracket pop (3.6 s) so the big visual moments sit on beats:
//   pill 6.1 · send 9.225 · deck 9.85 · bracket 13.6 · card 15.475 · pixel wipe 17.975 · REVEAL 18.6 (downbeat)
//   badge 20.475 · talk 21.725 · tagline 24.6 · end wipe 26.725
// Harmony: I – vi – IV – Vsus – V │ I (reveal) – IV – V │ I (end mark). Electric-piano stabs mark each change,
// a warm bass and a laid-back kit (kick 1 · &2 · 3, snaps on 2 and 4, swung shaker) carry the middle,
// everything breathes out for "card first · face last" and the pixel wipe, then lands on the reveal.
// The mix is side-chained to the kick, then mastered to −14 LUFS / −1.5 dBTP (teaser-sound `master`).
import { DURATION, CUES } from './scenes/index.js'
import { rng } from '../../src/lib.js'

const B = 60 / 96, E8 = B / 2, G0 = 3.6
const beat = (n) => G0 + n * B
const bar = (k) => G0 + 4 * k * B

// chord voicings: pad (wide), keys (mid, rootless-ish), bass root
const CH = {
  Dmaj9: { pad: [146.83, 220, 329.63, 369.99, 554.37], keys: [293.66, 369.99, 440, 554.37], root: 73.42 },
  Bm9:   { pad: [123.47, 185, 293.66, 329.63, 440], keys: [246.94, 293.66, 369.99, 440, 554.37], root: 61.74 },
  Gmaj9: { pad: [98, 196, 293.66, 369.99, 493.88], keys: [246.94, 293.66, 369.99, 440], root: 98 },
  Asus:  { pad: [110, 220, 293.66, 329.63, 493.88], keys: [220, 293.66, 329.63, 493.88], root: 110 },
  Aadd9: { pad: [110, 220, 277.18, 329.63, 493.88], keys: [220, 277.18, 329.63, 493.88], root: 110 },
  Dres:  { pad: [146.83, 220, 293.66, 369.99, 440, 659.25], keys: [293.66, 369.99, 440, 587.33], root: 73.42 },
}
const PLAN = [
  [0, beat(4), 'Dmaj9'],            // the stars have aligned · now in Houston
  [beat(4), beat(10), 'Bm9'],       // the pill
  [beat(10), beat(16), 'Gmaj9'],    // the deck
  [beat(16), beat(19), 'Asus'],     // card first · face last (held breath)
  [beat(19), beat(24), 'Aadd9'],    // the mystery card
  [beat(24), beat(29), 'Dmaj9'],    // REVEAL: founders card
  [beat(29), 24.6, 'Gmaj9'],        // talk cards
  [24.6, beat(37), 'Aadd9'],        // tagline
  [beat(37), DURATION, 'Dres'],     // end mark
]
const chordAt = (t) => CH[(PLAN.find(([a, b]) => t >= a && t < b) || PLAN[PLAN.length - 1])[2]]

// groove level per 8th-note step (0 = silent, 1 = pulse only, 2 = light, 3 = full)
const levelAt = (t) => {
  if (t < G0 - 0.01) return 0
  if (t < beat(4)) return 1         // bracket 1
  if (t < beat(10)) return 2        // pill + typing
  if (t < beat(15.5)) return 3      // the deck (drums drop out half a beat before the bracket)
  if (t < beat(19)) return 0        // card first · face last
  if (t < beat(23)) return 2        // mystery card
  if (t < beat(24)) return 0        // pixel wipe: hold your breath
  if (t < 24.45) return 3           // reveal → talk
  if (t < beat(36)) return 1        // tagline
  return 0
}

const r = rng(9)
const pre = [], drums = [], kicks = []
// warm opening: a low D and a soft keys chord under the nebula
pre.push(['bass', 0.05, 73.42, 3.3, 0.05], ['keys', 0.32, CH.Dmaj9.keys, 3.0, 0.016, 0.03])
// keys stabs on every change (strummed a touch), quieter re-stabs on bar heads in the full sections
for (const [a, , name] of PLAN.slice(1)) pre.push(['keys', a, CH[name].keys, 2.2, name === 'Dmaj9' || name === 'Dres' ? 0.03 : 0.024, 0.014])
for (let k = 0; k < 10; k++) { const t = bar(k); if (levelAt(t) === 3 && !PLAN.some(([a]) => Math.abs(a - t) < 0.05)) pre.push(['keys', t, chordAt(t).keys, 1.4, 0.014, 0.01]) }
// a quiet arp in the full sections (8ths, from the pad voicing)
const ARP_CHORDS = PLAN.map(([a, b, n]) => [a, b, CH[n].pad])
pre.push(['arp', ARP_CHORDS, 96, beat(10), beat(15.5), 0.011], ['arp', ARP_CHORDS, 96, beat(24), 24.45, 0.011])

for (let s = 0; G0 + s * E8 < DURATION; s++) {
  const t0 = G0 + s * E8, lv = levelAt(t0), pos = s % 8, off = s % 2 === 1
  const t = t0 + (off ? 0.022 : 0)  // light swing on the off-8ths
  const ch = chordAt(t0)
  if (lv === 0) continue
  // kick: 1 (+3 from level 2), the "and" of 2 in full sections
  if (pos === 0 || (pos === 4 && lv >= 2) || (pos === 3 && lv === 3)) {
    const g = pos === 0 ? 0.15 : pos === 4 ? 0.12 : 0.085
    drums.push(['kick', t, g * (lv === 1 ? 0.8 : 1)]); kicks.push(t)
  }
  // snaps on 2 and 4 (only on 4 at level 2)
  if ((pos === 2 && lv === 3) || (pos === 6 && lv >= 2)) drums.push(['snap', t, (lv === 3 ? 0.055 : 0.04) * (0.92 + 0.12 * r()), pos === 2 ? -0.15 : 0.15])
  // shaker 8ths, offbeats accented
  if (lv >= 2 || (lv === 1 && off)) drums.push(['shaker', t, (off ? 0.022 : 0.012) * (lv === 3 ? 1 : 0.7) * (0.85 + 0.3 * r()), off ? 0.25 : -0.25])
  // bass follows the kick, a passing fifth on the last 8th of full bars
  if (pos === 0) pre.push(['bass', t, ch.root, lv === 1 ? 2 * B - 0.05 : lv === 2 ? 1.5 * B : B * 0.9, lv === 1 ? 0.075 : 0.09])
  else if (pos === 4 && lv >= 2) pre.push(['bass', t, ch.root, lv === 2 ? 1.6 * B : B * 0.9, 0.08])
  else if (pos === 3 && lv === 3) pre.push(['bass', t, ch.root, E8 * 0.9, 0.07])
  else if (pos === 7 && lv === 3) pre.push(['bass', t, ch.root * 1.5, E8 * 0.85, 0.055])
}
// long held bass notes where the kit drops out
pre.push(['bass', beat(16), 110, 3 * B - 0.05, 0.07], ['bass', beat(23), 110, B - 0.04, 0.06], ['bass', beat(37), 73.42, 2.6, 0.08])
// the downbeats that land a moment
drums.push(['kick', beat(24), 0.24], ['kick', beat(37), 0.18]); kicks.push(beat(24), beat(37))
// swells into the arrivals
drums.push(['swell', beat(17.5), beat(19), 0.05], ['swell', beat(22.6), beat(24), 0.07], ['swell', beat(35.4), beat(37), 0.06])

// the visual SFX from the scene, with the reveal's boom moved onto the downbeat
// sit them under the music: one trim for all of them (index of each instrument's gain argument)
const GAIN_ARG = { pop: 3, whoosh: 3, tick: 2, bell: 3, pluck: 3, riser: 3 }, SFX_TRIM = 0.7
const SFX = CUES.map(c => c[0] === 'boom' ? ['boom', beat(24), 0.12] : c).map(c => {
  const i = GAIN_ARG[c[0]]; if (!i) return c
  const d = [...c]; d[i] = (d[i] ?? ({ pop: 0.06, whoosh: 0.16, tick: 0.08, bell: 0.1, pluck: 0.05, riser: 0.1 })[c[0]]) * SFX_TRIM; return d
})

export default {
  id: 'whop-type2', duration: DURATION,
  music: {
    padGain: 0.026,
    chords: PLAN.map(([a, b, n]) => [a, b, CH[n].pad]),
  },
  cues: [...pre, ['duck', kicks, 0.26, 0.26], ...drums, ...SFX],
  master: { lufs: -14, tp: -1.5 },
}
