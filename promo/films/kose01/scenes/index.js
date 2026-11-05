// kose01 — OVERTHINKING SIMULATOR, Ep 1: "Their 'ok.' had a period" (18 s vertical, star_talk, chiptune · A). Hard cut.
//   0.0   FRAME 0: Virgo mid-scream (steam), the bar glitching red at 37%, the thread with "ok." circled red,
//         hook "Their “ok.” had a | PERIOD."; ♓ tech support already sobbing.  0.35 whip zoom + flash (pattern break).
//   0.9   Virgo: "not ok. not ok! ok. WITH A PERIOD." (premise by 3 s)
//   3.0–12.2  four simulations, each rendered then DELETED: mad · bored · moving to the moon · phone died.
//  12.4   bar hits 99%, ERROR: too many feelings (shake, glitch, steam).
//  13.6   the real text drops in: "ok. see you at 7!!"  Virgo melts, Pisces sobs with relief.
//  16.9   last line "ERROR: it was just | punctuation." holds to the cut.
import { simFilm, GOLD, PINK, CYAN, RED } from '../../kose01/scenes/simkit.js'

const CRUSH = 'leo'
const crush = (mood, extra = []) => ({ items: [{ sign: CRUSH, x: 0.3, y: 0.62, s: 230, mood }, ...extra] })
export const CFG = {
  ep: 1, sign: 'virgo', duration: 18, ending: 'cut',
  hook: 'Their *“ok.”* had a | PERIOD.',
  heads: [
    { t: 2.95, text: 'Rendering *every* | possible meaning…', color: GOLD },
    { t: 12.4, text: '99%… *too many* | feelings.', color: RED },
    { t: 16.75, text: 'ERROR: it was just | *punctuation.*', color: GOLD, slam: true, size: 96 },
  ],
  bar: { label: 'Reading their “ok.”…', keys: [[0, 37], [0.5, 37], [2.9, 44], [5.6, 58], [8, 71], [10.2, 84], [12.3, 99]], err: [[0, 0.5], [12.35, 13.5]], labels: [[0, 'Reading their “ok.”…'], [13.5, 'Reading their new text…']] },
  panels: [
    { t0: -1, t1: 2.9, kind: 'chat', who: CRUSH, title: 'them', msgs: [
      { at: -1, side: 'R', text: 'dinner at 7 at the noodle place?' },
      { at: -1, side: 'L', text: 'ok.', circle: -1, size: 110 },
    ] },
    { t0: 2.95, t1: 5.6, kind: 'theory', n: 1, of: 4, title: 'They’re *mad* at you.', scene: crush('squint', [{ icon: 'bolt', x: 0.62, y: 0.5, cell: 14, wob: 1 }, { icon: 'bolt', x: 0.75, y: 0.66, cell: 10, wob: 1 }]) },
    { t0: 5.6, t1: 8.0, kind: 'theory', n: 2, of: 4, title: 'They’re *bored* of you.', scene: crush('sleepy', [{ icon: 'clock', x: 0.68, y: 0.58, cell: 16, bob: 1 }]) },
    { t0: 8.0, t1: 10.2, kind: 'theory', n: 3, of: 4, title: 'They’re moving to | *the moon.*', size: 54, scene: crush('happy', [{ icon: 'moon', x: 0.72, y: 0.5, cell: 18, bob: 1 }, { icon: 'bag', x: 0.48, y: 0.78, cell: 9 }]) },
    { t0: 10.2, t1: 12.3, kind: 'theory', n: 4, of: 4, title: 'Their phone *died* | mid-sentence.', size: 54, scene: crush('wide', [{ icon: 'phone', x: 0.68, y: 0.6, cell: 18, rot: 0.3, wob: 1 }]) },
    { t0: 12.4, t1: 13.5, kind: 'error', text: 'too many | *feelings.*' },
    { t0: 13.5, t1: 18.5, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 13.5, side: 'R', text: 'dinner at 7 at the noodle place?' },
      { at: 13.5, side: 'L', text: 'ok.' },
      { at: 13.65, side: 'L', text: 'ok. see you at 7!!', col: '#bff5cf' },
      { at: 14.5, side: 'L', text: 'can’t wait :)', col: '#bff5cf' },
    ] },
  ],
  notifs: [{ t: 13.6, d: 2.2, from: 'THEM · now', text: 'ok. see you at 7!!', sign: CRUSH }],
  says: [
    { t: 0.85, who: 'sign', text: 'not “ok!” not “okay.” “ok.” WITH A PERIOD.', d: 2.0 },
    { t: 6.3, who: 'sup', text: 'this is a lot', d: 1.6 },
    { t: 14.7, who: 'sign', text: 'oh. it’s just… how they type.', d: 2.1 },
    { t: 15.2, who: 'sup', text: 'happy tears!!', d: 1.6 },
  ],
  moods: [[0, 'wide', [1, -1]], [2.9, 'wide', [0.4, -1]], [5.6, 'squint', [0.4, -1]], [8.0, 'wide', [0.4, -1]], [12.4, 'wide', [0, 0]], [13.6, 'wide', [0.5, -1]], [14.5, 'sparkle'], [16.6, 'happy']],
  squash: [[0, 0.14], [0.6, 0], [12.4, 0.12], [13.0, 0]],
  steam: [[0, 1.2], [12.3, 13.6]],
  panic: [[0, 0.7], [12.4, 13.4]],
  sup: { moods: [[0, 'wide'], [13.8, 'sparkle'], [15.2, 'happy']], tears: [[0, 2], [12.4, 3], [13.8, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.32 }, { t: 0.4, kind: 'flash', color: '#ff3b4e', d: 0.22 }, { t: 0.42, kind: 'shake', d: 0.4 }, { t: 12.4, kind: 'shake' }, { t: 12.4, kind: 'glitch', d: 0.6 }, { t: 13.6, kind: 'whip', z: 0.12 }],
  music: { style: 'chiptune', key: 'A', seed: 801, drop: 0.35, sections: { breakdown: [12.4], lift: [13.6] }, hits: [13.6] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
