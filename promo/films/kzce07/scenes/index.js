// kzce07: ZODIAC COURTROOM, "Forty Minutes of 'I Don't Mind'" (18 s vertical, Month 2 boost m06 #7, pop · C). Hard cut.
//   0.00  frame 0: ♎ Libra mid-spin in the dock between two menus (TACOS / PASTA); gavel mid-slam. 0.25 colour flash + whip.
//         Hook: "Libra couldn't pick a restaurant. | *Again.*"
//   1.0   CHARGE: FORTY MINUTES OF "I DON'T MIND"   1.4 JUDGE: "the court calls… the *date.*"
//   3.0   WITNESS ♉ Taurus: "I said 'I don't mind' *too.*" (gasp)
//   6.6   EXHIBIT A: the chat. tacos? · I don't mind · pasta? · I don't mind either · you pick · no YOU pick · 7:41 PM
//  10.0   JUDGE: "the court finds… *both* of you."   12.0 GUILTY (BOTH OF YOU) · 12.6 "one picks. the other says yes."
//  13.9   Libra and Taurus side by side point at the same menu: "TACOS!" "TACOS!"  Pisces fountains.
//  16.6   last line "Somebody pick. | Anybody. *Please.*" holds to 18.0, hard cut.
import { makeCourt, drawChat, label, box, star, clamp, prog, ease, INK, RED, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { wit: 3.0, ex: 6.6, back: 9.9, guilty: 12.0, duo: 13.9, tacos: 14.4, last: 16.6 }
function menu(x, cx, cy, txt, rot, col) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -90, 140, 180, col, { b: 5 }); box(x, -56, -60, 112, 130, '#fffaf0', { b: 3, hi: null })
  label(x, txt, 0, -76, { size: 22, col: '#fff', weight: 900 })
  for (let i = 0; i < 4; i++) x.fillStyle = '#c9bca2', x.fillRect(-40, -40 + i * 28, 80, 8)
  x.restore()
}
const CFG = {
  id: 'kzce07', dur: 18, ending: 'cut',
  hook: { at: -1, text: "Libra couldn't pick a restaurant. | *Again.*", out: [2.8, 3.0], accentColor: '#e163d6', size: 86 },
  fx: { whips: [{ at: 0.25, from: 1.25 }, { at: T.guilty + 0.08, from: 1.2 }], flashes: [[0.25, '#ff9fe8'], [T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, 1.45, T.guilty],
  gasps: [-0.2, 4.4, T.guilty + 0.1, T.tacos],
  jury: ['aquarius', 'scorpio', 'leo', 'pisces', 'sagittarius', 'gemini'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.tacos + 0.3 ? 'happy' : undefined; if (t > T.tacos + 0.5) return 'happy'; if (t > T.ex + 1 && t < T.back) return 'sleepy' },
  judge: {
    mood: t => t < 0.5 ? 'squint' : t < T.ex ? 'neutral' : t < T.back ? 'sleepy' : t < T.tacos ? 'squint' : 'happy',
    look: t => t > T.ex && t < 9.6 ? [0, 1] : t > T.wit && t < T.back ? [-1, 1] : [0, 0.3],
  },
  dock: [
    { who: 'libra', to: T.wit, mood: t => t < 0.8 ? 'wide' : 'neutral', look: t => [Math.sin(t * 9) > 0 ? 1 : -1, 0], hops: [0.0, 0.3, 0.6],
      prop: (x, t, P) => { const sw = Math.sin(t * 9); menu(x, P.x - 150, P.y - 40, 'TACOS', -0.2 + 0.1 * sw, '#f0603a'); menu(x, P.x + 150, P.y - 40, 'PASTA', 0.2 + 0.1 * sw, '#2fc79a') } },
    { who: 'taurus', from: T.wit, to: T.back, plate: 'WITNESS', mood: t => t < 3.5 ? 'neutral' : 'happy', look: () => [1, -0.3] },
    { who: 'libra', from: T.back, to: T.duo, mood: t => t < T.guilty + 0.1 ? 'wide' : 'squint' },
    { who: 'libra', from: T.duo, x: 170, s: 210, mood: t => t < T.tacos ? 'neutral' : 'sparkle', look: () => [1, -0.4], hops: [T.tacos, T.tacos + 0.3],
      prop: (x, t, P) => {
        star(x, t, { x: 400, y: 1080, s: 200, pop: ease.outBack(clamp(prog(t, T.duo, T.duo + 0.3))) }, { who: 'taurus', mood: t < T.tacos ? 'neutral' : 'sparkle', look: [-1, -0.4], hops: [T.tacos, T.tacos + 0.3], seed: 7 })
        if (t > T.tacos) { const k = ease.outBack(clamp(prog(t, T.tacos, T.tacos + 0.2))); label(x, 'TACOS!', 170, 900, { size: 54 * k, col: GOLD, weight: 900, rot: -0.12 }); label(x, 'TACOS!', 410, 890, { size: 54 * k, col: GOLD, weight: 900, rot: 0.12 }) }
      } },
  ],
  heads: [{ text: 'Somebody pick. | Anybody. *Please.*', at: T.last, late: 1, lateAt: T.last + 0.35, accent: '#e163d6', size: 96 }],
  ticker: { at: 1.0, out: [16.3, 16.6], label: 'CHARGE', text: 'FORTY MINUTES OF "I DON\'T MIND"' },
  boxes: [
    { open: 1.3, close: 2.95, lines: [{ t: 1.45, who: 'JUDGE', text: 'the court calls… the *date.*' }] },
    { open: 3.15, close: 6.5, lines: [{ t: 3.3, who: 'taurus', text: "I said 'I don't mind' *too.*" }] },
    { open: 9.95, close: 11.9, lines: [{ t: 10.05, who: 'JUDGE', text: 'the court finds… *both* of you.' }] },
  ],
  exhibits: [{
    at: T.ex, out: [9.5, 9.8], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♎︎ + ♉︎  dinner??', size: 32, msgs: [
        { at: 6.85, side: 'R', text: 'tacos?', meta: '7:01 PM' }, { at: 7.25, side: 'L', text: "I don't mind" }, { at: 7.65, side: 'R', text: 'pasta?' },
        { at: 8.0, side: 'L', text: "I don't mind either" }, { at: 8.35, side: 'R', text: 'you pick' }, { at: 8.65, side: 'L', text: 'no YOU pick' },
        { at: 9.0, side: 'C', text: '7:41 PM · still hungry' }] })
    },
  }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'BOTH OF YOU', color: RED, out: [13.5, 13.8], y: 860 }],
  sentence: { at: 12.6, out: [13.5, 13.8], text: 'one picks. the other says yes.' },
  cues: [...[6.85, 7.25, 7.65, 8.0, 8.35, 8.65, 9.0].map((a, i) => ['pop', a, [880, 659.25, 987.77, 739.99, 1174.66, 880, 440][i], 0.04, i % 2 ? -0.2 : 0.2]),
    ['pop', T.duo, 987.77, 0.04, 0], ['pop', T.tacos, 1318.51, 0.05, -0.3], ['pop', T.tacos + 0.02, 1318.51, 0.05, 0.3], ['glitter', T.tacos, T.tacos + 0.5],
    ['pluck', T.tacos + 0.6, 1318.51, 0.035, 0.5, 0.45], ...popWords(T.last + 0.35, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
