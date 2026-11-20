// whop-club score: a 120 bpm four-on-the-floor house groove in D (I–V–vi–IV), claps on 2 & 4, offbeat hats and bass,
// a bright 8th-note arp; riser + snare roll into the drop at 12.0, half-time slow motion through the hero, back in at 16.0.
import { DURATION, KICKS, T } from './scenes/index.js'

const D = [146.83, 220, 293.66, 369.99, 440], A = [110, 220, 277.18, 329.63, 440], Bm = [123.47, 246.94, 293.66, 369.99, 440], G = [98, 196, 246.94, 293.66, 392]
const Gmaj7 = [98, 196, 293.66, 369.99, 440, 587.33]
const CHORDS = [[0, 2, D], [2, 4, A], [4, 6, Bm], [6, 8, G], [8, 10, D], [10, 12, A], [12, 16, Gmaj7], [16, 18, D], [18, 20, A], [20, 22, G], [22, DURATION, [...D, 659.25]]]
const ROOT = (t) => CHORDS.find(([a, b]) => t >= a && t < b)[2][0]
const inGroove = (t) => (t >= 0 && t < 12) || (t >= 16 && t < 23)

const cues = []
// kicks (one `pulse` hit each), the half-time ones a touch softer
for (const k of KICKS) cues.push(['pulse', k, k + 0.001, 120, k >= 12 && k < 16 ? 0.26 : 0.32])
// claps on 2 & 4 (three ticks smeared together), half-time claps in the hero
const clap = (t, g = 0.1) => { cues.push(['tick', t, g], ['tick', t + 0.011, g * 0.8], ['tick', t + 0.024, g * 0.6]) }
for (let t = 0.5; t < 23; t += 1) if (inGroove(t)) clap(t)
clap(13.0, 0.08); clap(15.0, 0.08)
// offbeat hats + quiet 16ths when it lifts
cues.push(['hats', 0, 12, 120, 0.05], ['hats', 16, 23, 120, 0.055])
for (let t = 8; t < 23; t += 0.125) if (inGroove(t) && Math.round(t * 8) % 2 === 1) cues.push(['tick', t, 0.018])
// offbeat bass plucks on the chord root
for (let t = 0.25; t < 23; t += 0.5) if (inGroove(t)) cues.push(['pluck', t, ROOT(t), 0.085, 0.16, 0])
// the bright arp
cues.push(['arp', CHORDS, 120, 0, 12, 0.026], ['arp', CHORDS, 120, 16, 23, 0.03])

// OPEN: a pop for every word, climbing
;[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0].forEach((t, i) => cues.push(['pop', t, [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51][i], 0.06, (i % 2 ? 0.3 : -0.3)]))
cues.push(['glitter', 3.0, 3.6], ['whoosh', T.deck, 0.5, 0.1])
// DECK: card slams on 8ths
;[4, 4.25, 4.5, 4.75, 5.0].forEach((t, i) => cues.push(['pop', t, [440, 523.25, 587.33, 659.25, 880][i], 0.07, (i - 2) * 0.25]))
;[5.0, 5.5, 6.0, 6.5, 7.0, 7.5].forEach((t, i) => cues.push(['pop', t + 0.02, 1567.98 + i * 100, 0.025, (i % 2 ? 0.5 : -0.5)]))
cues.push(['whoosh', T.grid, 0.5, 0.1])
// GRID: a pop as each panel lands, chips sprinkle, then the riser + snare roll into the drop
;[8, 8.5, 9, 9.5].forEach((t, i) => cues.push(['pop', t, [659.25, 739.99, 880, 987.77][i], 0.07, (i - 1.5) * 0.3]))
;[8.25, 8.75, 9.25, 9.75, 10.25, 10.75, 11.25, 11.5, 11.75].forEach((t, i) => cues.push(['pop', t, 1760 + (i % 3) * 200, 0.022, (i % 2 ? 0.5 : -0.5)]))
cues.push(['riser', 10.0, 12.0, 0.12])
for (let t = 11; t < 12; t += t < 11.5 ? 0.125 : 0.0625) cues.push(['tick', t, 0.04 + 0.08 * (t - 11)])
// HERO: the drop, a fast fall, the slow-motion hang, then out
cues.push(['whoosh', 12.25, 0.4, 0.14], ['boom', 12.3, 0.24], ['glitter', 12.3, 13.6])
;[[13.0, 880, -0.3], [13.4, 1108.73, 0.2], [14.0, 987.77, 0.3], [14.3, 739.99, -0.2], [14.75, 880, 0], [15.0, 1174.66, 0.2]].forEach(([t, f, p]) => cues.push(['bell', t, f, 0.045, 2.0, p]))
cues.push(['riser', 15.0, 16.0, 0.1], ['whoosh', 15.95, 0.5, 0.14])
for (let t = 15.5; t < 16; t += 0.0625) cues.push(['tick', t, 0.05 + 0.1 * (t - 15.5)])
// TALK: burst, spins
cues.push(['glitter', 16.0, 16.8], ['whoosh', 19.1, 0.4, 0.08], ['whoosh', 19.6, 0.4, 0.08], ['whoosh', T.end, 0.45, 0.1])
// END: chakra chimes as the mark draws, ticks as HOUSTON BETA types in, the last hit
;[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].forEach((f, i) => cues.push(['bell', T.end + 0.08 + i * 0.05, f, 0.05, 2.0, (i - 3) * 0.12]))
for (let i = 0; i < 12; i++) cues.push(['tick', T.end + 1.0 + i * 0.0625, 0.03])
cues.push(['boom', T.last, 0.22], ['glitter', T.last, T.last + 1.4])
;[146.83, 293.66, 369.99, 440, 587.33, 739.99, 880].forEach((f, i) => cues.push(['bell', T.last + i * 0.03, f, 0.028, 2.6, (i - 3) * 0.12]))

export default {
  id: 'whop-club', duration: DURATION,
  music: { chords: CHORDS, padGain: 0.02 },
  cues,
}
