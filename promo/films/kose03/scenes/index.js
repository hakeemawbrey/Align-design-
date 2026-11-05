// kose03 — OVERTHINKING SIMULATOR, Ep 3: "One heart, not two" (14 s vertical, star_talk, pop · D). Hard cut.
//   0.0  FRAME 0: Libra mid-shriek, the HEART COUNT graph crashing from 2 to 1; hook "They sent ONE heart. | Not two."
//   0.35 colour flash.  2.6 last night (two hearts) vs tonight (one), caught in red.  4.0–8.9 three drafts typed and
//   DELETED.  9.0 "thumb slipped lol" + three hearts, the graph rockets.  12.3 "Heart count restored. | Panic still loading."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, icon } from '../../kose01/scenes/simkit.js'
const CRUSH = 'sagittarius'
const hearts = (n, x0, y, cell, t0) => Array.from({ length: n }, (_, i) => ({ icon: 'heart', x: x0 + i * 0.12, y, cell, at: t0 + i * 0.12 }))
export const CFG = {
  ep: 3, sign: 'libra', duration: 14, ending: 'cut',
  hook: 'They sent *ONE* heart. | Not two.',
  heads: [
    { t: 3.95, text: 'Drafting a *calm* | reply…', color: GOLD },
    { t: 12.3, text: 'Heart count *restored.* | Panic still loading.', color: GOLD, slam: true, size: 88 },
  ],
  bar: { label: 'Counting hearts…', keys: [[0, 50], [2.6, 50], [8.9, 96], [9.0, 30], [12.3, 64], [14, 70]], err: [[0, 0.45]], labels: [[0, 'Counting hearts…'], [12.3, 'Panic still loading…']] },
  panels: [
    { t0: -1, t1: 2.55, kind: 'meter', style: 'graph', label: 'HEART *COUNT*', keys: [[-1.4, 2], [-0.4, 2], [0.9, 1.0], [2.5, 1]], max: 2.4, col: PINK, fmt: v => `${v.toFixed(1)} hearts` },
    { t0: 2.6, t1: 3.95, kind: 'scene', title: 'Last night vs *tonight*', items: [
      { text: 'LAST NIGHT', x: 0.5, y: 0.25, size: 36, font: "'Space Mono', monospace", weight: 700 }, ...hearts(2, 0.44, 0.42, 12, 2.7),
      { text: 'TONIGHT', x: 0.5, y: 0.58, size: 36, font: "'Space Mono', monospace", weight: 700, color: PINK }, { icon: 'heart', x: 0.5, y: 0.76, cell: 12, at: 3.0 },
      { draw: (x, t, px, py) => { if (t < 3.2) return; const k = Math.min(1, (t - 3.2) / 0.35); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(px, py, 120, 80, -0.1, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); x.stroke() }, x: 0.5, y: 0.76 },
    ] },
    { t0: 4.0, t1: 5.65, kind: 'theory', chip: 'DRAFT 1/3', title: '“Is everything | *ok??*”', del: 5.1, scene: { items: [{ sign: 'libra', x: 0.5, y: 0.7, s: 170, mood: 'wide' }] } },
    { t0: 5.65, t1: 7.3, kind: 'theory', chip: 'DRAFT 2/3', title: '“Cool. *One heart.* | Noted.”', del: 6.75, scene: { items: [{ sign: 'libra', x: 0.5, y: 0.7, s: 170, mood: 'squint' }] } },
    { t0: 7.3, t1: 8.95, kind: 'theory', chip: 'DRAFT 3/3', title: '“Did I do | *something??*”', del: 8.4, scene: { items: [{ sign: 'libra', x: 0.5, y: 0.7, s: 170, mood: 'wide' }] } },
    { t0: 9.0, t1: 15, kind: 'scene', keep: true, title: '“thumb slipped *lol*”', items: [...hearts(3, 0.38, 0.4, 15, 9.35), { sign: CRUSH, x: 0.5, y: 0.75, s: 170, mood: 'happy', at: 9.2 }] },
  ],
  notifs: [{ t: 8.95, d: 2.0, from: 'THEM · now', text: 'thumb slipped lol', sign: CRUSH }],
  says: [
    { t: 0.7, who: 'sign', text: 'ONE. there were always TWO.', d: 1.9 },
    { t: 6.0, who: 'sup', text: 'not draft two', d: 1.4 },
    { t: 10.3, who: 'sign', text: 'three?! we’re so back.', d: 1.9 },
  ],
  moods: [[0, 'wide', [1, -1]], [2.6, 'wide', [0.3, -1]], [9.1, 'wide', [0.4, -1]], [9.7, 'heart'], [11.5, 'happy']],
  squash: [[0, 0.15], [0.55, 0]], steam: [[0, 0.8], [7.3, 8.95]], panic: [[0, 0.6]],
  sup: { moods: [[0, 'wide'], [9.6, 'sparkle'], [11.6, 'happy']], tears: [[0, 2], [9.6, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.35, kind: 'flash', color: '#ff8fb1', d: 0.25 }, { t: 0.37, kind: 'shake', d: 0.35 }, { t: 8.95, kind: 'whip', from: 1.15 }],
  music: { style: 'pop', key: 'D', seed: 803, drop: 0.35, sections: { breakdown: [7.3], lift: [9.0] }, hits: [9.0] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
