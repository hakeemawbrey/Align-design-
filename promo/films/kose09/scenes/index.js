// kose09 — OVERTHINKING SIMULATOR, Ep 9: "'hey.' not 'hey you'" (13 s vertical, star_talk, lofi · G). Hard cut.
//   0.0  FRAME 0: Aquarius mid-squint, a giant magnifier over "hey."; hook on screen.  0.35 whip.
//   2.2 last week "hey you :)" vs today "hey."  4.6–8.0 two lab results, DELETED.  8.2 "hey you* sorry, typing on the bus".
//   11.3 "“hey” was “hey you” | in a hurry."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK } from '../../kose01/scenes/simkit.js'
const CRUSH = 'cancer'
const glass = (x, t, px, py) => { const r = 120; x.save(); x.translate(px + Math.sin(t * 2) * 14, py + Math.cos(t * 2.4) * 8); x.strokeStyle = INK; x.lineWidth = 28; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 18; x.stroke(); x.fillStyle = 'rgba(127,227,255,0.14)'; x.fill(); x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.moveTo(r * 0.75, r * 0.75); x.lineTo(r * 1.7, r * 1.7); x.stroke(); x.lineWidth = 22; x.strokeStyle = '#b9875a'; x.stroke(); x.restore() }
export const CFG = {
  ep: 9, sign: 'aquarius', duration: 13, ending: 'cut',
  hook: '“hey.” Not *“hey you.”* | Why.',
  heads: [
    { t: 2.15, text: 'Comparing the | *evidence…*', color: GOLD },
    { t: 4.55, text: 'Running a word | *analysis…*', color: CYAN },
    { t: 11.3, text: '“hey” was “hey you” | *in a hurry.*', color: GOLD, slam: true, size: 92 },
  ],
  bar: { label: 'Analysing “hey.”…', keys: [[0, 51], [0.4, 51], [2.2, 56], [8.0, 99]], err: [[0, 0.4]], labels: [[0, 'Analysing “hey.”…'], [8.2, 'Correction received']] },
  panels: [
    { t0: -1, t1: 2.15, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'L', text: 'hey.', size: 130 }] },
    { t0: 2.2, t1: 4.55, kind: 'scene', title: 'Last week vs *today*', items: [
      { text: 'LAST WEEK', x: 0.5, y: 0.2, size: 34, font: "'Space Mono', monospace", weight: 700 }, { text: '“hey you :)”', x: 0.5, y: 0.3, size: 72, color: '#bff5cf', at: 2.4 },
      { text: 'TODAY', x: 0.5, y: 0.56, size: 34, font: "'Space Mono', monospace", weight: 700, color: PINK }, { text: '“hey.”', x: 0.5, y: 0.66, size: 72, color: PINK, at: 2.9 },
    ] },
    { t0: 4.6, t1: 6.3, kind: 'theory', chip: 'LAB RESULT 1/2', title: 'The *“you”* is missing. | Where did it go?', size: 52, del: 5.75, scene: { items: [{ sign: 'aquarius', x: 0.5, y: 0.74, s: 160, mood: 'squint' }] } },
    { t0: 6.3, t1: 8.0, kind: 'theory', chip: 'LAB RESULT 2/2', title: 'The period is *new.* | Suspicious.', size: 52, del: 7.45, scene: { items: [{ sign: 'aquarius', x: 0.5, y: 0.74, s: 160, mood: 'wide' }] } },
    { t0: 8.25, t1: 14, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 8.25, side: 'L', text: 'hey.' },
      { at: 8.35, side: 'L', text: 'hey you*', col: '#bff5cf', size: 64 },
      { at: 9.2, side: 'L', text: 'sorry, typing on the bus', col: '#bff5cf' },
    ] },
  ],
  draw: { over: (x, t) => { if (t < 2.15) glass(x, t, 300, 900) } },
  notifs: [{ t: 8.2, d: 2.0, from: 'THEM · now', text: 'hey you — sorry, typing on the bus', sign: CRUSH }],
  says: [
    { t: 0.8, who: 'sign', text: 'a period. after HEY.', d: 1.3 },
    { t: 6.6, who: 'sup', text: 'it’s so small though', d: 1.3 },
    { t: 9.8, who: 'sign', text: 'the bus. of course. the bus.', d: 1.5 },
  ],
  moods: [[0, 'squint', [0.2, -1]], [2.2, 'wide', [0.4, -1]], [4.6, 'squint', [0.4, -1]], [8.2, 'wide', [0.5, -1]], [9.0, 'happy']],
  squash: [[0, 0.12], [0.4, 0]], steam: [[0, 0.5], [6.3, 8.0]], panic: [[0, 0.4]],
  sup: { moods: [[0, 'wide'], [9.0, 'sparkle']], tears: [[0, 2], [9.0, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.35, kind: 'flash', color: '#7fe3ff', d: 0.22 }, { t: 8.2, kind: 'whip', from: 1.15 }],
  music: { style: 'lofi', key: 'G', seed: 809, drop: 0.35, sections: { lift: [8.2] }, hits: [8.2] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
