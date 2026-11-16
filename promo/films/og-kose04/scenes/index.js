// og-kose04: social rework of kose04 (static HOOK box 0–3.1 replaces the slam title; opening stretched 0.6 s with
// shiftAfter; softer alarm light, no flash / shakes / frame-0 whip / bug / show name; crazier lines; kit copy ./simkit.js).
// Times below are the original ones (before the stretch). Was: OVERTHINKING SIMULATOR, "Can we talk later?" (20 s vertical, star_talk, cinematic · Dm). Hard cut.
//   0.0  FRAME 0: Scorpio mid-spin under red alarm light, "can we talk later?" circled; hook on screen.
//   0.4  red flash + shake.  2.6–9.8 three worst cases rendered and DELETED.  9.8 Scorpio rehearses a defence to a
//   houseplant.  12.6 "later" arrives: "ok so. which snack for movie night".  18.6 "The talk was about | snacks."
import { simFilm, shiftAfter, GOLD, PINK, RED, CYAN, BONE } from './simkit.js'
const CRUSH = 'aries'
const alarm = { under: (x, t) => { const a = t < 1.8 ? 0.12 * (0.6 + 0.4 * Math.sin(t * 5)) : (t > 13.2 && t < 13.8 ? 0.1 : 0) /* og: a slow, soft alarm glow (times after the stretch) */; if (a > 0) { x.fillStyle = `rgba(255,40,60,${a})`; x.fillRect(0, 0, 1080, 1920) } } }
const CFG0 = {
  sign: 'scorpio', duration: 20, ending: 'cut', draw: alarm,
  hook: '“Can we talk *later?*” | LOADING…',
  heads: [
    { t: 2.55, text: 'Simulating *every* | possible talk…', color: GOLD },
    { t: 9.8, text: 'Preparing a | *defence…*', color: PINK },
    { t: 12.6, text: 'Later is | *now.*', color: GOLD },
    { t: 18.55, text: 'The talk was about | *snacks.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Decoding “later”…', keys: [[0, 23], [0.4, 23], [2.6, 30], [9.8, 88], [12.5, 99]], err: [[0, 0.5], [12.2, 12.6]], labels: [[0, 'Decoding “later”…'], [9.8, 'Rehearsing…'], [12.6, 'Later: arrived']] },
  panels: [
    { t0: -1, t1: 2.55, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'had fun today!' }, { at: -1, side: 'L', text: 'can we talk later?', size: 64, circle: -1 }] },
    { t0: 2.6, t1: 5.0, kind: 'theory', n: 1, of: 3, title: 'They found my | *seven* poetry accounts.', size: 54, scene: { items: [{ sign: CRUSH, x: 0.32, y: 0.68, s: 200, mood: 'wide' }, { icon: 'note', x: 0.66, y: 0.6, cell: 14, bob: 1 }] } },
    { t0: 5.0, t1: 7.4, kind: 'theory', n: 2, of: 3, title: 'They noticed I | *hum when I eat.*', size: 54, scene: { items: [{ sign: CRUSH, x: 0.32, y: 0.68, s: 200, mood: 'squint' }, { icon: 'bowl', x: 0.66, y: 0.64, cell: 13, wob: 1 }] } },
    { t0: 7.4, t1: 9.8, kind: 'theory', n: 3, of: 3, title: 'They’re ending it. | *(We’re not even dating.)*', size: 52, scene: { items: [{ sign: CRUSH, x: 0.32, y: 0.7, s: 200, mood: 'neutral' }, { icon: 'broken', x: 0.66, y: 0.64, cell: 13 }] } },
    { t0: 9.85, t1: 12.6, kind: 'scene', title: 'Defence, take *one*', items: [{ icon: 'tree', x: 0.5, y: 0.52, cell: 22, wob: 1 }, { text: 'THE JURY (a houseplant)', x: 0.5, y: 0.8, size: 32, font: "'Space Mono', monospace", weight: 700, color: CYAN }] },
    { t0: 12.65, t1: 21, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 12.65, side: 'L', text: 'can we talk later?' },
      { at: 12.8, side: 'L', text: 'ok so. which snack for movie night', col: '#bff5cf' },
      { at: 14.1, side: 'L', text: 'this is a serious talk', col: '#bff5cf' },
      { at: 15.4, side: 'R', text: '…popcorn?' },
      { at: 16.4, side: 'L', text: 'correct answer', col: '#bff5cf' },
    ] },
  ],
  notifs: [{ t: 12.6, d: 2.0, from: 'THEM · LATER', text: 'ok so. which snack for movie night', sign: CRUSH, y: 560 }],
  says: [
    { t: 0.9, who: 'sign', text: 'later WHEN? I’m opening an investigation.', d: 1.9 },
    { t: 10.3, who: 'sign', text: 'your honour, I can explain the humming.', d: 2.2 },
    { t: 11.0, who: 'sup', text: 'the plant is weeping', d: 1.5 },
    { t: 16.9, who: 'sup', text: 'snacks!! I’m crying', d: 1.6 },
  ],
  moods: [[0, 'wide', [-1, -1]], [2.6, 'squint', [0.4, -1]], [7.4, 'wide', [0.4, -1]], [9.8, 'squint', [0.6, -1]], [12.6, 'wide', [0.5, -1]], [13.6, 'eyeroll'], [15.4, 'happy'], [16.4, 'heart']],
  squash: [[0, 0.14], [0.6, 0]], steam: [[0, 0.7], [7.4, 9.8]], panic: [[0, 0.6], [12.2, 12.6]],
  signAt: t => t < 0.7 ? { x: 240 + Math.sin(t * 9) * 24, y: 1430, s: 236 } : { x: 240, y: 1430, s: 236 },   // og: the kit copy's safe-zone spot
  sup: { moods: [[0, 'wide'], [16.4, 'sparkle']], tears: [[0, 2], [7.4, 3], [12.6, 2], [16.4, 3]] },
  fx: [{ t: 12.6, kind: 'whip', from: 1.15 }],
  music: { style: 'cinematic', key: 'Dm', seed: 804, drop: 0.4, sections: { breakdown: [9.8], lift: [12.6] }, hits: [12.6] },
}
export const CFG = shiftAfter(CFG0, 2.5, 0.6)
const F = simFilm(CFG)
export const HOOK = '“Can we talk later?” | Scorpio: *spirals.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.1
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
