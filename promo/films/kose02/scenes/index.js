// kose02 — OVERTHINKING SIMULATOR, Ep 2: "Seen at 9:41" (16 s vertical, star_talk, lofi · Em). Seamless loop.
//   0.0  FRAME 0: Cancer mid-gasp, "Seen 9:41" stamped red under their text, the bar glitching; hook on screen.
//   0.5  record scratch + freeze: "it’s been *one minute.*"   1.9–9.6 the sim fast-forwards: 9:42 sad violin ·
//   9:50 a farewell poem · 9:58 knitting a scarf for the memory (each DELETED).  9.8 the reply drops in:
//   "sorry!! was making pasta". Cancer + Pisces both cry (happy). 11.8 "Cause of silence: | pasta."  15.55 loop.
import { simFilm, GOLD, PINK, RED, CYAN, ICONS } from '../../kose01/scenes/simkit.js'
const CRUSH = 'taurus'
const scarf = (x, t, px, py, k) => { for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#ff8fb1' : '#f2c75c'; const yy = py - 120 + i * 28; x.fillRect(px - 40 + Math.sin(t * 3 + i) * 4, yy, 80, 26) } x.fillStyle = '#c9a6ff'; x.fillRect(px + 30, py - 150, 8, 90); x.fillRect(px + 50, py - 150, 8, 90) }
export const CFG = {
  ep: 2, sign: 'cancer', duration: 16, ending: 'loop',
  hook: 'Seen *9:41.* No reply. | SIMULATING.',
  heads: [
    { t: 1.95, text: 'Fast-forwarding | the *worst case…*', color: GOLD },
    { t: 11.8, text: 'Cause of silence: | *pasta.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Waiting for a reply…', keys: [[0, 12], [0.5, 12], [1.9, 18], [9.6, 97]], err: [[0, 0.5]], labels: [[0, 'Waiting for a reply…'], [9.8, 'Reply received!']] },
  panels: [
    { t0: -1, t1: 1.9, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'how was your day? :)', size: 64, circle: -1 }], seen: { at: -1, text: 'Seen 9:41 PM' } },
    { t0: 1.95, t1: 4.5, kind: 'theory', chip: '9:42 PM', title: 'Cue the *sad violin.*', scene: { items: [{ sign: 'cancer', x: 0.34, y: 0.62, s: 200, mood: 'sleepy', tears: 2 }, { icon: 'note', x: 0.64, y: 0.5, cell: 12, bob: 1 }, { icon: 'note', x: 0.76, y: 0.66, cell: 9, bob: 1 }] } },
    { t0: 4.5, t1: 7.05, kind: 'theory', chip: '9:50 PM', title: 'Writing them a | *farewell poem.*', size: 54, scene: { items: [{ sign: 'cancer', x: 0.34, y: 0.66, s: 200, mood: 'squint', tears: 2 }, { text: '“Roses were red…', x: 0.68, y: 0.48, size: 34, font: "'EB Garamond', Georgia, serif", weight: 500, maxW: 300 }, { icon: 'broken', x: 0.68, y: 0.74, cell: 11 }] } },
    { t0: 7.05, t1: 9.6, kind: 'theory', chip: '9:58 PM', title: 'Knitting a scarf | *for the memory.*', size: 54, scene: { items: [{ sign: 'cancer', x: 0.32, y: 0.66, s: 200, mood: 'sparkle', tears: 3 }, { draw: scarf, x: 0.68, y: 0.72 }] } },
    { t0: 9.8, t1: 17, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 9.8, side: 'R', text: 'how was your day? :)' },
      { at: 9.95, side: 'L', text: 'sorry!! was making pasta', col: '#bff5cf', size: 56 },
      { at: 10.7, side: 'L', text: 'want the recipe? :)', col: '#bff5cf' },
    ] },
  ],
  notifs: [{ t: 9.75, d: 2.0, from: 'THEM · 10:01 PM', text: 'sorry!! was making pasta', sign: CRUSH }],
  says: [
    { t: 2.6, who: 'sup', text: 'not the violin', d: 1.6 },
    { t: 10.9, who: 'sign', text: 'PASTA. it was pasta.', d: 1.8 },
    { t: 12.9, who: 'sup', text: 'I love pasta', d: 1.7 },
  ],
  moods: [[0, 'wide', [1, -1]], [1.9, 'wide', [0.4, -1]], [4.5, 'squint', [0.4, -1]], [9.8, 'wide', [0.5, -1]], [10.6, 'sparkle'], [12.4, 'happy']],
  tears: [[0, 1], [9.8, 0], [10.6, 2], [15.4, 1]],
  squash: [[0, 0.13], [0.5, 0]],
  steam: [[0, 0.5]], panic: [[0, 0.5]],
  sup: { moods: [[0, 'wide'], [10.4, 'sparkle'], [12.8, 'happy']], tears: [[0, 2], [7.1, 3], [10.4, 3], [15.3, 2]] },
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 0.5, kind: 'scratch', d: 1.3, caption: 'it’s been *one minute.*', top: 1470 }, { t: 9.75, kind: 'whip', from: 1.15 }],
  music: { style: 'lofi', key: 'Em', seed: 802, drop: 1.9, sections: { breakdown: [9.0], lift: [9.8] }, hits: [11.8], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
