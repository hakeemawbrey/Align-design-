// kzce04: ZODIAC COURTROOM, "The One-Letter Essay" (13 s vertical, Month 2 boost m06 #4, synthwave · Em). Hard cut.
//   0.00  frame 0: a giant "k." mid-slam over the court, ♏ Scorpio arms-crossed in the dock; whip zoom in.
//         Hook: "Scorpio texted *'k.'* | The court has questions."
//   1.6   EXHIBIT A: the chat. "so… are we ok?" → "k."  3.2 the "k." unrolls into a scroll of what it meant
//         (hurt you cancelled · didn't want to seem needy · missed you · so: k.)  4.6 record scratch: "one letter. *four* lines."
//   6.4   SCORPIO: "it was *implied.*"   8.1 JUDGE: "the court can't read *minds.*"
//   9.8   GUILTY · 10.4 sentence: "say the essay. kindly."   Pisces fountains over the scroll.
//  11.7   last line "Say the essay. | Out *loud.*" holds to 13.0, hard cut.
import { makeCourt, drawChat, label, R, clamp, prog, ease, INK, RED, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { k: 2.3, unroll: 3.2, rec: 4.6, guilty: 9.8, last: 11.7 }
const ESSAY = ['I was hurt you cancelled', "didn't want to seem needy", 'I missed you', 'so: k.']
const CFG = {
  id: 'kzce04', dur: 13, ending: 'cut',
  hook: { at: -1, text: "Scorpio texted *'k.'* | The court has questions.", out: [1.45, 1.6], accentColor: '#e23d66', size: 92, top: 200 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.guilty + 0.08, from: 1.2 }], recs: [{ at: T.rec, len: 1.0, caption: 'one letter. *four* lines.', top: 1480 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, T.guilty],
  gasps: [-0.25, 4.2, T.guilty + 0.1],
  jury: ['cancer', 'libra', 'gemini', 'pisces', 'taurus', 'sagittarius'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.guilty + 0.3 ? 'happy' : t > 4 ? 'wide' : undefined; if (t > T.guilty + 0.5) return 'happy' },
  judge: {
    mood: t => t < 0.6 ? 'wide' : t < 6.2 ? 'squint' : t < 8 ? 'eyeroll' : t < T.guilty ? 'neutral' : t < T.last ? 'neutral' : 'happy',
    look: t => t > 1.6 && t < 6.2 ? [0, 1] : t > 6.3 && t < 9.6 ? [-1, 1] : [0, 0.3],
  },
  dock: [{ who: 'scorpio',
    mood: t => t < 1.5 ? 'squint' : t < 4.2 ? 'neutral' : t < 6.3 ? 'wide' : t < 8.1 ? 'squint' : t < T.guilty + 0.1 ? 'neutral' : t < 11 ? 'wide' : 'happy',
    look: t => t > 1.6 && t < 6.2 ? [1, -0.6] : t < 1.5 ? [1, 0] : undefined, hops: [11.2, 11.5] }],
  heads: [{ text: 'Say the essay. | Out *loud.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#e23d66', size: 100 }],
  ticker: { at: 1.0, out: [11.4, 11.7], label: 'CHARGE', text: 'SENT "K." AND MEANT A WHOLE ESSAY' },
  boxes: [{ open: 6.25, close: 9.7, lines: [{ t: 6.4, who: 'scorpio', text: 'it was *implied.*' }, { t: 8.1, who: 'JUDGE', text: "the court can't read *minds.*" }] }],
  exhibits: [{
    at: 1.6, out: [5.9, 6.2], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, { cx: B.cx, cy: B.cy, w: B.w, h: B.h }, { title: '♏︎ scorpio', msgs: [{ at: 1.85, side: 'R', text: 'so… are we ok?' }, { at: T.k, side: 'L', text: 'k.', meta: 'delivered' }] })
      // the scroll unrolls down out of the "k."
      const u = ease.outCubic(clamp(prog(t, T.unroll, T.unroll + 1.2)))
      if (u > 0) {
        const X = B.cx - 250, Y = B.cy - 110, h = 470 * u
        R(x, INK, X - 6, Y - 6, 512, h + 12); R(x, '#f4e8cc', X, Y, 500, h)
        R(x, INK, X - 14, Y + h - 6, 528, 28); R(x, '#e2cfa6', X - 10, Y + h - 2, 520, 20)
        ESSAY.forEach((s, i) => { const yy = Y + 70 + i * 104; if (yy < Y + h - 40) label(x, s, B.cx, yy, { size: i === 3 ? 52 : 36, col: i === 3 ? RED : INK, weight: 900, shadow: false }) })
      }
    },
  }],
  over(x, t) {
    // the giant "k." slam on frame 0
    if (t < 1.5) {
      const s = t < 0 ? 1 : 1 + 0.5 * Math.exp(-t * 3) * (t < 0.1 ? 1 : 1) - 0.25 * ease.inCubic(prog(t, 1.1, 1.5))
      x.save(); x.globalAlpha = 1 - prog(t, 1.15, 1.5); x.translate(540, 880); x.rotate(-0.08); x.scale(s, s)
      label(x, 'k.', 0, 0, { size: 420, col: '#e23d66', weight: 900 }); x.restore()
    }
  },
  stamps: [{ at: T.guilty, text: 'GUILTY', color: RED, out: [11.4, 11.7], y: 860 }],
  sentence: { at: 10.4, out: [11.4, 11.7], text: 'say the essay. kindly.' },
  cues: [['boom', 0.02, 0.2], ['pop', 1.85, 987.77, 0.04, 0.2], ['pop', T.k, 440, 0.06, -0.2], ['riser', T.unroll, T.unroll + 1.2, 0.03],
    ...ESSAY.map((_, i) => ['pop', +(T.unroll + 0.3 + i * 0.3).toFixed(2), [880, 987.77, 1174.66, 1318.51][i], 0.03, 0]),
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
