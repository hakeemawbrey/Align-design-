// kose13 — OVERTHINKING SIMULATOR, Ep 13: "Rain check?" (15 s vertical, star_talk, screwed · Am). Hard cut.
//   0.0  FRAME 0: Libra collapsed on the floor under a tiny rain cloud, "rain check?" circled; hook on screen.
//   0.35 glitch + flash.  2.0–9.2 three forecasts of a lonely future, DELETED.  9.3 "Thursday instead? I really want to see
//   you".  11.0 THURSDAY: BOOKED.  12.9 "Rain check redeemed: | Thursday."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon } from '../../kose01/scenes/simkit.js'
const CRUSH = 'cancer'
const rain = { mid: (x, t) => {
  const k = t < 9.6 ? 1 : Math.max(0, 1 - (t - 9.6) / 0.5)
  if (k <= 0) { if (t > 10.2) icon(x, 'star', 262, 1392 + Math.sin(t * 3) * 10, 12, { alpha: Math.min(1, (t - 10.2) * 3) }); return }
  const cx = 262 + Math.sin(t * 1.5) * 10, cy = 1392
  for (let i = 0; i < 14; i++) { const ph = (t * 1.6 + i / 14) % 1; x.fillStyle = `rgba(127,227,255,${0.9 * k})`; x.fillRect(cx - 110 + ((i * 37) % 220), cy + 30 + ph * 120, 6, 18) }
  icon(x, 'cloud', cx, cy, 16, { alpha: k })
} }
export const CFG = {
  ep: 13, sign: 'libra', duration: 15, ending: 'cut', draw: rain,
  hook: '“Rain check?” Running | *heartbreak.exe.*',
  heads: [
    { t: 1.95, text: 'Forecasting | *the future…*', color: CYAN },
    { t: 9.3, text: 'Update | *incoming.*', color: GOLD },
    { t: 12.9, text: 'Rain check redeemed: | *Thursday.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Loading heartbreak.exe…', keys: [[0, 46], [0.4, 46], [2, 52], [9.2, 99]], err: [[0, 0.5]], labels: [[0, 'Loading heartbreak.exe…'], [9.3, 'heartbreak.exe cancelled']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'still on for friday? :)' }, { at: -1, side: 'L', text: 'rain check?', size: 84, circle: -1 }] },
    { t0: 2.0, t1: 4.4, kind: 'theory', chip: 'FORECAST 1/3', title: 'Every Friday: | *grey and drizzly.*', size: 54, scene: { items: [{ sign: 'libra', x: 0.34, y: 0.72, s: 180, mood: 'sleepy' }, { icon: 'cloud', x: 0.66, y: 0.56, cell: 13, bob: 1 }, { icon: 'cloud', x: 0.8, y: 0.7, cell: 9, bob: 1 }] } },
    { t0: 4.4, t1: 6.8, kind: 'theory', chip: 'FORECAST 2/3', title: 'Adopting *a cat* | for every feeling.', size: 54, scene: { items: [{ sign: 'libra', x: 0.34, y: 0.72, s: 180, mood: 'squint' }, { icon: 'dog', x: 0.62, y: 0.68, cell: 9 }, { icon: 'dog', x: 0.74, y: 0.62, cell: 9 }, { icon: 'dog', x: 0.86, y: 0.7, cell: 9 }] } },
    { t0: 6.8, t1: 9.2, kind: 'theory', chip: 'FORECAST 3/3', title: 'Moving into | *the couch.* Forever.', size: 54, scene: { items: [{ sign: 'libra', x: 0.5, y: 0.7, s: 180, mood: 'sleepy', squash: 0.25 }] } },
    { t0: 9.35, t1: 16, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 9.35, side: 'L', text: 'rain check?' },
      { at: 9.45, side: 'L', text: 'Thursday instead? I really want to see you', col: '#bff5cf', size: 50 },
      { at: 10.6, side: 'R', text: 'YES. thursday!!' },
    ] },
  ],
  stamps: [{ t: 11.1, d: 1.6, text: 'THURSDAY: | BOOKED', color: '#7ff0a0', y: 760 }],
  notifs: [{ t: 9.3, d: 2.0, from: 'THEM · now', text: 'Thursday instead? I really want to see you', sign: CRUSH }],
  says: [
    { t: 0.8, who: 'sign', text: 'a rain check is a polite goodbye. right??', d: 1.2 },
    { t: 7.1, who: 'sup', text: 'the couch is nice though', d: 1.5 },
    { t: 11.4, who: 'sup', text: 'THURSDAY!!', d: 1.3 },
  ],
  moods: [[0, 'sleepy'], [0.4, 'wide', [0.4, -1]], [2.0, 'sleepy'], [4.4, 'squint', [0.4, -1]], [6.8, 'sleepy'], [9.3, 'wide', [0.5, -1]], [10.0, 'sparkle'], [11.4, 'happy']],
  tears: [[0, 1], [9.3, 0]],
  squash: [[0, 0.3], [0.5, 0.16], [9.3, 0]], steam: [[6.8, 9.2]], panic: [[0, 0.4]],
  sup: { moods: [[0, 'wide'], [10.2, 'sparkle'], [11.6, 'happy']], tears: [[0, 2], [10.2, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.35, kind: 'glitch', d: 0.45 }, { t: 0.36, kind: 'flash', color: '#7fe3ff', d: 0.2 }, { t: 9.3, kind: 'whip', from: 1.15 }],
  music: { style: 'screwed', key: 'Am', seed: 813, drop: 0.35, sections: { breakdown: [6.8], lift: [9.3] }, hits: [11.1] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
