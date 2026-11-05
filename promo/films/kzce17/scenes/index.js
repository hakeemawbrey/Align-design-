// kzce17: ZODIAC COURTROOM, "The Case of the Early Dog" (72 s vertical, Month 2 boost m06 #17, long, funk · G). Hard cut.
//   0.0   frame 0: ♈ Aries in the dock holding a long list of DOG NAMES; gavel mid-slam. 0.25 record scratch: "date *three.*"
//         Hook: "Aries suggested a dog. | On *date three.*"   3.2 the promise: "The ending, *though.*"
//   CH.1 OPENING (5.4): JUDGE: "is fast a *crime?*" · ♍ prosecution: "they named the dog. there *is* no dog." ·
//         "it's called *Biscuit.*" (gasp) · ♊ defence: "my client is just *enthusiastic!*" · "enthusiasm is *cute!*"
//   CH.2 EVIDENCE (18.5): A the dog-name list (Biscuit, Waffles, Captain, Pancake, Noodle… + forty more) ·
//         B the chat: "what do you think about getting a dog together" · "we've met three times" · "so that's a yes?" (gasp)
//   CH.3 WITNESSES (32.0): ♑ the date: "I liked it… I just wanted to be *asked.*" · surprise witness THE EX:
//         "the speed was *cute.*" · "the not asking *wasn't.*" (gasp)
//   CH.4 CLOSING (44.0): Aries + ♑ side by side: "…is this too fast?" · "a little. but I like that you *asked.*" ·
//         "medium fast?" · "medium fast is *ok.*"
//   CH.5 THE VERDICT (55.0): NOT GUILTY (OF SPEED) · GUILTY (OF NOT CHECKING IN) · "ask first. then go fast together."
//         · 62.0 the twist: ♑ "also… I already have a *dog.*" · a pixel dog trots in: WAFFLES (gasp, hearts)
//         · JUDGE: "court is… *adorable.* adjourned."
//   70.6  last line "Fast is fine. | *Check in* first." holds to 72.0, hard cut.   Pisces cries the whole trial.
import { makeCourt, drawChat, star, label, box, R, drawBits, clamp, prog, ease, INK, RED, GOLD, PINK, popWords } from '../../kzce01/scenes/courtkit.js'

const seq = (t, list) => { let v = list[0][1]; for (const [a, m] of list) if (t >= a) v = m; return v }
const T = { pros: 7.7, def: 12.8, evA: 18.8, evB: 24.6, date: 32.2, wit: 38.4, close: 44.0, ng: 55.6, g2: 57.6, twist: 62.0, dog: 63.4, adj: 69.0, last: 70.6 }
const CH = [
  { at: 5.4, out: [18.2, 18.5], title: 'OPENING STATEMENTS' }, { at: 18.5, out: [31.7, 32.0], title: 'THE EVIDENCE' },
  { at: 32.0, out: [43.7, 44.0], title: 'THE WITNESSES' }, { at: 44.0, out: [54.7, 55.0], title: 'CLOSING' }, { at: 55.0, out: [70.3, 70.6], title: 'THE VERDICT' },
]
const NAMES = ['Biscuit', 'Waffles', 'Captain', 'Pancake', 'Noodle', 'Sir Fluff']
const DOG = ['.BB.....BB.', 'BBB.....BBB', '.BBBBBBBBB.', '.BWKBBBKWB.', '.BBBBBBBBB.', '..BBBNBBB..', '...BBPBB...', '..BBBBBBB..', '.BBBBBBBBB.', '.BB.BBB.BB.']
function nameList(x, t, P) {
  x.save(); x.translate(P.x + 120, P.y - 60); x.rotate(0.12)
  box(x, -60, -90, 120, 250, '#fffaf0', { b: 5, hi: null }); label(x, 'DOG NAMES', 0, -70, { size: 18, col: RED, weight: 900, shadow: false })
  for (let i = 0; i < 8; i++) R(x, '#7a8bb8', -44, -44 + i * 24, i % 2 ? 70 : 88, 6)
  x.restore()
}
function duo(x, t) {
  const aM = seq(t, [[0, 'neutral'], [47.8, 'sparkle'], [T.ng, 'wide'], [T.g2 + 0.3, 'neutral'], [T.twist, 'wide'], [T.dog, 'heart']])
  const cM = seq(t, [[0, 'neutral'], [47.8, 'happy'], [T.ng, 'neutral'], [T.twist - 0.2, 'wink'], [T.dog, 'happy']])
  star(x, t, { x: 165, y: 1080, s: 200 }, { who: 'aries', mood: aM, look: [1, -0.2], seed: 61, hops: [44.4, 44.8, 51.2, 51.5, T.dog + 0.2, T.dog + 0.5, T.dog + 0.8] })
  star(x, t, { x: 395, y: 1080, s: 200 }, { who: 'capricorn', mood: cM, look: [-1, -0.2], seed: 63, hops: [47.8, 48.2, 53.0, 53.3, T.twist + 0.2] })
}
function dog(x, t) {
  if (t < T.dog) return
  const k = clamp(prog(t, T.dog, T.dog + 0.9)), dx = 1180 - 640 * ease.outCubic(k)
  drawBits(x, DOG, { B: '#c98a4a', W: '#fff', K: INK, N: INK, P: PINK }, dx, 1150 - 10 * Math.abs(Math.sin(t * 10)), 14)
  box(x, dx - 70, 1225, 140, 40, GOLD, { b: 4, hi: null }); label(x, 'WAFFLES', dx, 1245, { size: 24, col: INK, weight: 900, shadow: false })
  const wag = Math.sin(t * 18) * 0.5; x.save(); x.translate(dx + 80, 1140); x.rotate(wag); R(x, INK, -4, -36, 14, 40); R(x, '#c98a4a', -1, -33, 8, 34); x.restore()
}
const CFG = {
  id: 'kzce17', dur: 72, ending: 'cut',
  hook: { at: -1, text: 'Aries suggested a dog. | On *date three.*', out: [3.0, 3.2], accentColor: '#f0603a', size: 96 },
  heads: [
    { text: 'The ending, *though.*', at: 3.2, out: [5.2, 5.4], accent: GOLD, size: 104, late: 1, lateAt: 3.5 },
    { text: 'Fast is fine. | *Check in* first.', at: T.last, late: 2, lateAt: T.last + 0.25, accent: '#f0603a', size: 104 },
  ],
  chapters: CH,
  fx: { recs: [{ at: 0.25, len: 1.0, caption: 'date *three.*', top: 1480 }], whips: [{ at: T.evA - 0.05, from: 1.15 }, { at: T.wit, from: 1.3 }, { at: T.ng + 0.08, from: 1.2 }, { at: T.dog, from: 1.15 }],
    flashes: [[T.wit, '#ffffff'], [T.ng + 0.1, '#c9ffd9'], [T.g2 + 0.1, '#ffd0d8'], [T.dog, '#ffe9a8']] },
  gavels: [0.05, 5.5, T.wit - 1.2, T.ng, T.g2, T.adj],
  gasps: [11.3, 28.0, 42.0, T.ng + 0.1, T.g2 + 0.1, T.twist + 1.2, T.dog + 0.3],
  jury: ['scorpio', 'taurus', 'leo', 'pisces', 'libra', 'aquarius'],
  tears: () => 3,
  juryTears: t => t > T.dog + 0.4 ? 1 : 0,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.dog ? 'heart' : undefined; if (t > T.dog + 0.3) return 'heart'; if (t > 15.6 && t < 18) return 'heart' },
  judge: { mood: t => seq(t, [[0, 'wide'], [1.4, 'neutral'], [11.3, 'wide'], [12.8, 'neutral'], [18.8, 'squint'], [28, 'wide'], [32, 'neutral'], [T.wit, 'wide'], [44, 'sparkle'], [T.ng, 'neutral'], [T.twist + 1.2, 'wide'], [T.dog + 0.5, 'heart']]),
    tears: t => t > T.dog + 0.8 ? 2 : 0, look: t => (t > T.evA && t < 31.6) ? [0, 1] : t > T.dog ? [-0.5, 1] : t > 5.5 ? [-1, 1] : [0, 0.3] },
  dock: [
    { who: 'aries', to: T.pros, mood: t => t < 1.3 ? 'wide' : 'sparkle', prop: (x, t, P) => nameList(x, t, P) },
    { who: 'virgo', from: T.pros, to: T.def, plate: 'PROSECUTION', mood: t => t < 10.4 ? 'squint' : 'wide', look: () => [1, -0.4] },
    { who: 'gemini', from: T.def, to: T.evA, plate: 'DEFENCE', mood: t => t < 15.5 ? 'happy' : 'sparkle', look: () => [1, -0.4] },
    { who: 'aries', from: T.evA, to: T.date, mood: t => t < 28 ? 'neutral' : 'wide' },
    { who: 'capricorn', from: T.date, to: T.wit, plate: 'THE DATE', mood: t => t < 35.6 ? 'neutral' : 'happy', look: () => [1, -0.4] },
    { who: 'ex', from: T.wit, to: T.close, plate: 'WITNESS', mood: t => t < 40.8 ? 'happy' : 'squint', look: () => [1, -0.3] },
    { who: { color: '#000', tag: '' }, from: T.close, s: 1, plate: 'THE COUPLE', prop: (x, t) => duo(x, t) },
  ],
  ticker: { at: 1.0, out: [70.3, 70.6], label: 'CHARGE', text: 'SUGGESTED GETTING A DOG TOGETHER ON DATE THREE' },
  boxes: [
    { open: 1.4, close: 3.15, lines: [{ t: 1.55, who: 'JUDGE', text: 'order! stay for the *ending.*' }] },
    { open: 5.6, close: 7.6, lines: [{ t: 5.7, who: 'JUDGE', text: 'the question: is fast a *crime?*' }] },
    { open: 7.85, close: 12.7, lines: [{ t: 7.95, who: 'virgo', text: 'they named the dog. there *is* no dog.' }, { t: 10.6, who: 'virgo', text: "it's called *Biscuit.*" }] },
    { open: 12.95, close: 18.3, lines: [{ t: 13.05, who: 'gemini', text: 'my client is just *enthusiastic!*' }, { t: 15.6, who: 'gemini', text: 'enthusiasm is *cute!*' }] },
    { open: 32.35, close: 36.8, lines: [{ t: 32.45, who: 'capricorn', text: 'I liked it… I just wanted to be *asked.*' }] },
    { open: 36.9, close: 38.3, lines: [{ t: 37.0, who: 'JUDGE', text: 'the court calls… a *surprise witness.*' }] },
    { open: 38.6, close: 43.8, lines: [{ t: 38.8, who: 'ex', text: 'the speed was *cute.*' }, { t: 41.0, who: 'ex', text: 'the not asking *wasn’t.*' }] },
    { open: 44.3, close: 54.8, lines: [{ t: 44.4, who: 'aries', text: '…is this too fast?' }, { t: 47.8, who: 'capricorn', text: 'a little. but I like that you *asked.*' }, { t: 51.2, who: 'aries', text: 'medium fast?' }, { t: 53.0, who: 'capricorn', text: 'medium fast is *ok.*' }] },
    { open: 61.8, close: 70.4, lines: [{ t: 62.0, who: 'capricorn', text: 'also… I already have a *dog.*' }, { t: 66.6, who: 'JUDGE', text: 'court is… *adorable.* adjourned.' }] },
  ],
  exhibits: [
    { at: T.evA, out: [24.0, 24.3], label: 'EXHIBIT A', draw(x, t, k, B) {
      box(x, B.cx - 310, B.cy - 330, 620, 660, '#fffaf0', { b: 6, hi: null }); label(x, 'DOG NAMES (DRAFT)', B.cx, B.cy - 280, { size: 38, col: RED, weight: 900, shadow: false })
      NAMES.forEach((n, i) => { const a = 19.3 + i * 0.5; if (t < a) return; const kk = ease.outBack(clamp(prog(t, a, a + 0.2))); x.save(); x.translate(B.cx, B.cy - 190 + i * 72); x.scale(kk, kk); label(x, `${i + 1}. ${n}`, 0, 0, { size: 42, col: INK, weight: 800, shadow: false }); x.restore() })
      if (t > 22.6) label(x, '+ forty more', B.cx, B.cy + 270, { size: 44, col: RED, weight: 900, shadow: false, rot: -0.05, alpha: clamp(prog(t, 22.6, 22.8)) })
    } },
    { at: T.evB, out: [31.4, 31.7], label: 'EXHIBIT B', draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♈︎ + ♑︎', size: 38, msgs: [{ at: 25.0, side: 'R', text: 'what do you think about getting a dog together' }, { at: 26.2, side: 'L', text: "we've met three times" }, { at: 27.4, side: 'R', text: "so that's a yes?" }, { at: 28.9, side: 'L', text: '…haha' }] })
    } },
  ],
  stamps: [
    { at: T.ng, text: 'NOT GUILTY', sub: 'OF SPEED', color: '#2fae6a', out: [57.3, 57.55], y: 860, size: 118 },
    { at: T.g2, text: 'GUILTY', sub: 'OF NOT CHECKING IN', color: RED, out: [61.3, 61.6], y: 860 },
  ],
  sentence: { at: 58.4, out: [61.3, 61.6], text: 'ask first. then go fast together.' },
  over(x, t) { dog(x, t) },
  cues: [...NAMES.map((_, i) => ['pop', +(19.3 + i * 0.5).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1567.98, 1760][i], 0.035, i % 2 ? 0.2 : -0.2]), ['pop', 22.6, 523.25, 0.05, 0],
    ['pop', 25.0, 880, 0.04, 0.2], ['pop', 26.2, 659.25, 0.04, -0.2], ['pop', 27.4, 987.77, 0.04, 0.2], ['pop', 28.9, 587.33, 0.04, -0.2], ['riser', 37.0, T.wit, 0.04],
    ['whoosh', T.dog, 0.5, 0.05], ...[0, 0.25, 0.5].map(d => ['pop', T.dog + 0.6 + d, 1318.51 - d * 300, 0.04, 0.3]), ['glitter', T.dog + 0.3, T.dog + 1.2],
    ...popWords(T.last + 0.25, 2, 0.12, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
