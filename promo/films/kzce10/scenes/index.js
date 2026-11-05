// kzce10: ZODIAC COURTROOM, "Cried on the First Date" (16 s vertical, Month 2 boost m06 #10, dreamy · Eb). Loop.
//   0.00  frame 0: ♓ Pisces in the dock mid-sob (fountains), the whole jury already crying; gavel mid-slam. 0.3 whip.
//         Hook: "Pisces cried on the first date. | *Twice.*"
//   1.0   CHARGE: CRIED TWICE ON A FIRST DATE   1.4 JUDGE: "exhibit A… and *B.*"
//   3.0   EXHIBIT A: CRY #1 the dessert (a tiny heart on the cake) · 4.7 EXHIBIT B: CRY #2 a dog waiting outside (gasp)
//   6.8   WITNESS ♌ Leo (the date): "honestly? best date I've *had.*"   9.4 PISCES: "…can I cry about *that?*"
//  11.2   NOT GUILTY · 11.8 sentence: "cry as much as you need."  The judge cries too.
//  13.6   last line "Feelings are | not a *crime.*"; 15.6–16.0 eases back into frame 0 (seamless loop).
import { makeCourt, label, box, R, drawBits, clamp, prog, ease, INK, PINK, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { a: 3.0, b: 4.7, wit: 6.8, back: 9.25, ng: 11.2, last: 13.6 }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const DOG = ['.BB.....BB.', 'BBB.....BBB', '.BBBBBBBBB.', '.BWKBBBKWB.', '.BBBBBBBBB.', '..BBBNBBB..', '...BBBBB...', '..BBBBBBB..', '.BBBBBBBBB.', '.BB.BBB.BB.']
const CFG = {
  id: 'kzce10', dur: 16, ending: 'loop',
  hook: { at: -1, text: 'Pisces cried on the first date. | *Twice.*', out: [2.8, 3.0], accentColor: '#7c74f0', size: 86 },
  fx: { whips: [{ at: 0.3, from: 1.25 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 1.45, T.ng],
  gasps: [5.2, T.ng + 0.1],
  jury: ['aries', 'leo', 'gemini', 'taurus', 'virgo', 'capricorn'],
  juryTears: (t, id) => (t < 3 || t > T.wit + 0.5) ? (id === 'taurus' || id === 'leo' ? 3 : 2) : 1,
  juryMood: (t, id) => { if (t < 3) return 'sparkle'; if (t > T.wit + 0.5) return t > T.ng ? 'happy' : 'sparkle'; void id },
  judge: { mood: t => t < 0.5 ? 'squint' : t < T.ng ? 'neutral' : 'sparkle', tears: t => t > T.ng + 0.4 ? 3 : 0, look: t => t > 3 && t < 6.6 ? [0, 1] : t > 6.8 && t < 11 ? [-1, 1] : [0, 0.3] },
  dock: [
    { who: 'pisces', to: T.wit, mood: t => t < 3 ? 'sparkle' : 'wide', tears: () => 3, look: t => t > 3 && t < 6.6 ? [1, -0.6] : undefined },
    { who: 'leo', from: T.wit, to: T.back, plate: 'WITNESS', mood: t => t < 7.3 ? 'neutral' : 'heart', look: () => [1, -0.3] },
    { who: 'pisces', from: T.back, mood: t => t < 9.4 ? 'wide' : 'sparkle', tears: () => 3, hops: [T.ng + 0.3, T.ng + 0.6] },
  ],
  heads: [{ text: 'Feelings are | not a *crime.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#7c74f0', size: 104, out: [15.45, 15.6] }],
  ticker: { at: 1.0, out: [13.3, 13.6], label: 'CHARGE', text: 'CRIED TWICE ON A FIRST DATE' },
  boxes: [
    { open: 1.3, close: 2.95, lines: [{ t: 1.45, who: 'JUDGE', text: 'exhibit A… and *B.*' }] },
    { open: 6.95, close: 9.2, lines: [{ t: 7.05, who: 'leo', text: "honestly? best date I've *had.*" }] },
    { open: 9.3, close: 11.1, lines: [{ t: 9.4, who: 'pisces', text: '…can I cry about *that?*' }] },
  ],
  exhibits: [
    { at: T.a, out: [4.45, 4.7], label: 'EXHIBIT A', draw(x, t, k, B) {
      label(x, 'CRY #1: THE DESSERT', B.cx, B.cy - 250, { size: 44, col: GOLD, weight: 900 })
      x.save(); x.translate(B.cx, B.cy + 40); x.scale(1.45, 1.45); x.translate(-B.cx, -B.cy)
      box(x, B.cx - 200, B.cy - 40, 400, 180, '#f7d9b0', { b: 6 }); R(x, '#fff5f8', B.cx - 200, B.cy - 40, 400, 50); box(x, B.cx - 260, B.cy + 140, 520, 30, '#efe6d6', { b: 5, hi: null })
      drawBits(x, HEART, { H: PINK }, B.cx, B.cy + 70, 12); R(x, '#9fd8ff', B.cx - 6, B.cy - 110, 12, 70); R(x, '#ffd23a', B.cx - 8, B.cy - 150, 16, 26)
      x.restore()
    } },
    { at: T.b, out: [6.4, 6.7], label: 'EXHIBIT B', draw(x, t, k, B) {
      label(x, 'CRY #2: A DOG, OUTSIDE', B.cx, B.cy - 250, { size: 44, col: GOLD, weight: 900 })
      drawBits(x, DOG, { B: '#c98a4a', W: '#fff', K: INK, N: INK }, B.cx, B.cy + 20 + 6 * Math.abs(Math.sin(t * 8)), 36)
      label(x, '*waiting so patiently*', B.cx, B.cy + 230, { size: 34, col: '#efe6d6', weight: 800 })
    } },
  ],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', color: '#2fae6a', out: [13.3, 13.6], y: 860, size: 120 }],
  sentence: { at: 11.8, out: [13.3, 13.6], text: 'cry as much as you need.' },
  cues: [['pluck', 0.3, 659.25, 0.03, 0.4, -0.4], ['pluck', 0.6, 587.33, 0.03, 0.4, -0.4], ['pop', T.a + 0.3, 1174.66, 0.04, 0], ['pop', T.b + 0.3, 987.77, 0.04, 0], ['pop', 5.2, 1567.98, 0.04, 0],
    ['pluck', T.ng + 0.6, 1318.51, 0.035, 0.5, 0.45], ['pluck', T.ng + 0.9, 1174.66, 0.03, 0.5, 0], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
