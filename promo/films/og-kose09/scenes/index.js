// og-kose09: social rework of kose09 (Overthinking Simulator, "'hey.' not 'hey you'"). Static HOOK (outline) 0–2.1
// replaces the animated hook; no series bug, no whips/flashes, no slam title, crazier Aquarius; ends on the bus reveal.
// The kit is a local copy (scenes/simkit.js) laid out inside the app's safe zones.
//   0.0  HOOK over Aquarius squinting through a giant magnifier at "hey."   2.2 last week "hey you :)" vs today "hey."
//   4.6–8.0 two lab results, DELETED.  8.25 "hey you* sorry, typing on the bus".  11.3 "“hey” was “hey you” | in a hurry."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK } from './simkit.js'
export const HOOK = 'They texted “hey.” | Not *“hey you.”*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.1
const CRUSH = 'cancer'
const glass = (x, t, px, py) => { const r = 120; x.save(); x.translate(px + Math.sin(t * 2) * 14, py + Math.cos(t * 2.4) * 8); x.strokeStyle = INK; x.lineWidth = 28; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 18; x.stroke(); x.fillStyle = 'rgba(127,227,255,0.14)'; x.fill(); x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.moveTo(r * 0.75, r * 0.75); x.lineTo(r * 1.7, r * 1.7); x.stroke(); x.lineWidth = 22; x.strokeStyle = '#b9875a'; x.stroke(); x.restore() }
export const CFG = {
  sign: 'aquarius', duration: 13, ending: 'cut',
  hook: '',
  heads: [
    { t: 2.15, text: 'Comparing the | *evidence…*', color: GOLD },
    { t: 4.55, text: 'Sending it to | *the lab…*', color: CYAN, end: 8.15 },
    { t: 11.3, text: '“hey” was “hey you” | *in a hurry.*', color: GOLD },
  ],
  bar: { label: 'Analysing “hey.”…', keys: [[0, 51], [0.4, 51], [2.2, 56], [8.0, 99]], err: [[0, 0.4]], labels: [[0, 'Analysing “hey.”…'], [4.6, 'Lab coat: ON'], [8.2, 'Correction received']] },
  panels: [
    { t0: -1, t1: 2.15, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'L', text: 'hey.', size: 130 }] },
    { t0: 2.2, t1: 4.55, kind: 'scene', title: 'Last week vs *today*', items: [
      { text: 'LAST WEEK', x: 0.5, y: 0.2, size: 34, font: "'Space Mono', monospace", weight: 700 }, { text: '“hey you :)”', x: 0.5, y: 0.3, size: 72, color: '#bff5cf', at: 2.4 },
      { text: 'TODAY', x: 0.5, y: 0.56, size: 34, font: "'Space Mono', monospace", weight: 700, color: PINK }, { text: '“hey.”', x: 0.5, y: 0.66, size: 72, color: PINK, at: 2.9 },
    ] },
    { t0: 4.6, t1: 6.3, kind: 'theory', chip: 'LAB RESULT 1/2', title: 'The *“you”* is missing. | It has been KIDNAPPED.', size: 50, del: 5.75, scene: { items: [{ sign: 'aquarius', x: 0.5, y: 0.76, s: 150, mood: 'squint' }] } },
    { t0: 6.3, t1: 8.0, kind: 'theory', chip: 'LAB RESULT 2/2', title: 'The period is *new.* | It is a FULL STOP. On us.', size: 50, del: 7.45, scene: { items: [{ sign: 'aquarius', x: 0.5, y: 0.76, s: 150, mood: 'wide' }] } },
    { t0: 8.25, t1: 14, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 8.25, side: 'L', text: 'hey.' },
      { at: 8.35, side: 'L', text: 'hey you*', col: '#bff5cf', size: 64 },
      { at: 9.2, side: 'L', text: 'sorry, typing on the bus', col: '#bff5cf' },
    ] },
  ],
  draw: { over: (x, t) => { if (t < 2.15) glass(x, t, 330, 900) } },
  notifs: [{ t: 8.2, d: 2.0, from: 'THEM · now', text: 'hey you — sorry, typing on the bus', sign: CRUSH }],
  says: [
    { t: 0.6, who: 'sign', text: 'a PERIOD. after HEY. I’m calling a lab.', d: 1.5 },
    { t: 6.6, who: 'sup', text: 'it’s a very small dot', d: 1.3 },
    { t: 9.8, who: 'sign', text: 'the bus. THE BUS. I forgive the bus.', d: 2.0 },
  ],
  moods: [[0, 'squint', [0.2, -1]], [2.2, 'wide', [0.4, -1]], [4.6, 'squint', [0.4, -1]], [8.2, 'wide', [0.5, -1]], [9.0, 'happy']],
  squash: [[0, 0.12], [0.4, 0]], steam: [[0, 0.5], [6.3, 8.0]], panic: [[0, 0.4]],
  sup: { moods: [[0, 'wide'], [9.0, 'sparkle']], tears: [[0, 2], [9.0, 3]] },
  fx: [],
  music: { style: 'lofi', key: 'G', seed: 809, drop: 0.35, sections: { lift: [8.2] }, hits: [8.2] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
