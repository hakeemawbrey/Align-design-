// kose05 — OVERTHINKING SIMULATOR, Ep 5: "Typing… stopped" (12 s vertical, star_talk, chiptune · F). Seamless loop.
//   0.0  FRAME 0: Gemini mid-lean into the screen, the typing dots going; hook "Typing… stopped. | Typing… stopped."
//   0.7  record scratch + freeze: "minute *nine.*"  2.6–7.4 three guesses at what they deleted (DELETED).
//   7.5  the message lands: "hi".  8.4 "Nine minutes of typing. | “hi”."  11.55 loop back to the dots.
import { simFilm, GOLD, PINK, RED, CYAN } from '../../kose01/scenes/simkit.js'
const CRUSH = 'capricorn'
export const CFG = {
  ep: 5, sign: 'gemini', duration: 12, ending: 'loop',
  hook: 'Typing… *stopped.* | Typing… *stopped.*',
  heads: [
    { t: 2.55, text: 'What did they | *delete?*', color: GOLD },
    { t: 8.4, text: 'Nine minutes of typing. | *“hi”.*', color: GOLD, slam: true, size: 92 },
  ],
  bar: { label: 'Guessing the draft…', keys: [[0, 41], [0.7, 41], [2.6, 48], [7.4, 99]], err: [[0, 0.4]], labels: [[0, 'Guessing the draft…'], [7.5, 'Message received']] },
  panels: [
    { t0: -1, t1: 2.55, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'so what are you up to this weekend?' }], typing: [[-1, 0.7], [2.0, 2.55]] },
    { t0: 2.6, t1: 4.2, kind: 'theory', n: 1, of: 3, title: 'A *poem.* About me.', del: 3.65, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.68, s: 190, mood: 'sparkle' }, { icon: 'note', x: 0.66, y: 0.62, cell: 13, bob: 1 }] } },
    { t0: 4.2, t1: 5.8, kind: 'theory', n: 2, of: 3, title: 'A *confession.*', del: 5.25, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.68, s: 190, mood: 'heart' }, { icon: 'heart', x: 0.66, y: 0.62, cell: 13, bob: 1 }] } },
    { t0: 5.8, t1: 7.4, kind: 'theory', n: 3, of: 3, title: 'A whole *novel.*', del: 6.85, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.68, s: 190, mood: 'squint' }, { icon: 'bag', x: 0.66, y: 0.62, cell: 13, wob: 1 }] } },
    { t0: 7.45, t1: 13, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [{ at: 7.45, side: 'R', text: 'so what are you up to this weekend?' }, { at: 7.55, side: 'L', text: 'hi', size: 120, col: '#bff5cf', circle: 7.9 }] },
  ],
  says: [
    { t: 0.0, who: 'sign', text: 'they’re typing!! no. yes. NO.', d: 0.7 },
    { t: 5.9, who: 'sup', text: 'a NOVEL?', d: 1.3 },
    { t: 9.6, who: 'sign', text: 'hi!!! HI!!!', d: 1.6 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [2.6, 'sparkle', [0.4, -1]], [4.2, 'heart'], [5.8, 'wide', [0.4, -1]], [7.5, 'wide', [0.5, -1]], [8.2, 'happy'], [11.4, 'wide', [0.6, -1]]],
  squash: [[0, -0.12], [0.7, 0], [11.4, -0.12]], panic: [[0, 0.7], [11.5, 13]], steam: [[0, 0.7], [11.5, 13]],
  signAt: t => ({ x: 262 + (t < 0.7 || t > 11.5 ? 18 : 0), y: 1610, s: 320 }),
  sup: { moods: [[0, 'wide'], [7.6, 'sparkle'], [9.4, 'happy'], [11.4, 'wide']], tears: [[0, 2], [5.8, 3], [7.6, 3], [11.4, 2]] },
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 0.7, kind: 'scratch', d: 1.2, caption: 'minute *nine.*', top: 1470 }, { t: 7.5, kind: 'whip', from: 1.2 }],
  music: { style: 'chiptune', key: 'F', seed: 805, drop: 1.9, sections: { lift: [7.5] }, hits: [7.5], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
