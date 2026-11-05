// kzce16: ZODIAC COURTROOM, "The Trial of Playing It Cool" (74 s vertical, Month 2 boost m06 #16, long, cinematic · Dm). Hard cut.
//   0.0   frame 0: gavel mid-slam, ♏ Scorpio in sunglasses in the dock, the jury mid-gasp; whip zoom in.
//         Hook: "Scorpio played it cool. | *For three weeks.*"   3.2 the promise: "Wait for the *verdict.*"
//   CH.1 OPENING STATEMENTS (5.4): ♈ prosecution: "your honour, they *liked* them." · "and said *nothing!*" (gasp) ·
//         ♎ defence: "my client was being *mysterious.*" · "mystery is very *in.*" · Scorpio: "I don't even *like* them."
//         18.0 record scratch: "they *really* liked them."
//   CH.2 THE EVIDENCE (20.0): A the chat (food saturday? → "maybe", seen 11:58 PM) · B the deleted drafts (struck through)
//         · C the "lol" after "I had a really nice time" (circled, gasp)
//   CH.3 SURPRISE WITNESS (36.0): THE EX: "they did this with me *too.*" · "I never knew they liked me until we *ended.*"
//         · "just tell them. it's *scarier* not to."
//   CH.4 CLOSING (50.0): Scorpio takes the sunglasses off: "…okay. I like them. a *lot.*" · "I was scared they wouldn't
//         like me *back.*"
//   CH.5 THE VERDICT (60.0): GUILTY (OF PLAYING IT COOL) · sentence "tell them. kindly. this week." · 65.0 the crush
//         (♑) rises in the gallery holding SAME. · Scorpio: "…*same?*" · JUDGE: "court is *adjourned.*" (gavel)
//   72.9  last line "Cool is overrated. | *Say it.*" holds to 74.0, hard cut.   Pisces cries the whole trial.
import { makeCourt, drawChat, star, inSprite, label, box, R, clamp, prog, ease, INK, RED, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const seq = (t, list) => { let v = list[0][1]; for (const [a, m] of list) if (t >= a) v = m; return v }
const T = { pros: 5.6, def: 11.0, sc1: 16.4, rec: 18.0, evA: 20.4, evB: 25.8, evC: 31.0, wit: 37.8, close: 50.0, glasses: 51.0, guilty: 60.6, same: 65.0, adj: 70.6, last: 72.9 }
const CH = [
  { at: 5.4, out: [19.6, 19.9], title: 'OPENING STATEMENTS' }, { at: 20.0, out: [35.6, 35.9], title: 'THE EVIDENCE' },
  { at: 36.0, out: [49.6, 49.9], title: 'SURPRISE WITNESS' }, { at: 50.0, out: [59.6, 59.9], title: 'CLOSING' }, { at: 60.0, out: [72.6, 72.9], title: 'THE VERDICT' },
]
function shades(x, t, F, lift = 0) {
  inSprite(x, F, () => {
    x.save(); x.translate(0, -lift * 14)
    x.fillStyle = INK; x.fillRect(5, 15.5, 26, 1.6); x.fillRect(6, 15.5, 10, 6.5); x.fillRect(20, 15.5, 10, 6.5)
    x.fillStyle = '#2a2148'; x.fillRect(7, 17, 8, 4); x.fillRect(21, 17, 8, 4)
    x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(8, 17.5, 2, 1); x.fillRect(22, 17.5, 2, 1)
    x.restore()
  })
}
const DRAFTS = [["YES omg I'd love to", 26.4], ["I've liked you since the party", 27.4], ['can I call you?', 28.4]]
const scMood = t => seq(t, [[0, 'neutral'], [16.6, 'squint'], [T.rec, 'wide'], [19.5, 'neutral'], [T.close, 'neutral'], [T.glasses + 0.3, 'sparkle'], [55, 'wide'], [57.5, 'neutral'], [T.guilty + 0.1, 'wide'], [T.same, 'heart'], [69, 'happy']])
const scorpio = (from, to) => ({ who: 'scorpio', from, to, mood: scMood, look: t => t > T.same && t < 69 ? [1, 0.6] : undefined, hops: [T.same + 0.3, T.same + 0.6, 66.8],
  tears: t => t > 55 && t < T.guilty ? 1 : 0,
  prop: (x, t, P, F) => { if (t < T.glasses + 0.5) shades(x, t, F, ease.inCubic(clamp(prog(t, T.glasses, T.glasses + 0.5)))) } })
const CFG = {
  id: 'kzce16', dur: 74, ending: 'cut',
  hook: { at: -1, text: 'Scorpio played it cool. | *For three weeks.*', out: [3.0, 3.2], accentColor: '#e23d66', size: 94 },
  heads: [
    { text: 'Wait for the *verdict.*', at: 3.2, out: [5.2, 5.4], accent: GOLD, size: 104, late: 1, lateAt: 3.5 },
    { text: 'Cool is overrated. | *Say it.*', at: T.last, late: 2, lateAt: T.last + 0.25, accent: '#e23d66', size: 104 },
  ],
  chapters: CH,
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.evA - 0.05, from: 1.15 }, { at: T.wit, from: 1.3 }, { at: T.guilty + 0.08, from: 1.2 }, { at: T.same, from: 1.15 }],
    recs: [{ at: T.rec, len: 1.3, caption: 'they *really* liked them.', top: 1480 }], flashes: [[T.wit, '#ffffff'], [T.guilty + 0.1, '#ffd0d8'], [T.same, '#ffc2d4']] },
  gavels: [0.05, 1.45, T.wit - 1.0, T.guilty, T.adj],
  gasps: [-0.2, 9.0, 22.5, 29.0, 33.0, T.wit + 0.1, 47.5, T.guilty + 0.1, T.same + 0.3],
  jury: ['taurus', 'gemini', 'leo', 'pisces', 'cancer', 'sagittarius'],
  tears: () => 3,
  juryTears: t => t > 41 && t < 47 ? 2 : t > T.same + 0.4 ? 1 : 0,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.same + 0.3 ? 'happy' : t > 41 && t < 50 ? 'wide' : undefined
    if (t > 13.8 && t < 16.2) return 'eyeroll'
    if (t > T.same + 0.4) return 'heart'
  },
  judge: { mood: t => seq(t, [[0, 'squint'], [1.2, 'neutral'], [9, 'wide'], [11, 'neutral'], [13.8, 'eyeroll'], [16.4, 'squint'], [20.4, 'neutral'], [T.wit, 'wide'], [41, 'neutral'], [T.close, 'sparkle'], [T.guilty, 'neutral'], [T.same, 'heart'], [69, 'happy']]),
    tears: t => t > T.same + 0.5 ? 2 : 0,
    look: t => (t > T.evA && t < 35.6) ? [0, 1] : t > T.same && t < 68 ? [1, 1] : t > 5.5 ? [-1, 1] : [0, 0.3] },
  dock: [
    scorpio(-1, T.pros),
    { who: 'aries', from: T.pros, to: T.def, plate: 'PROSECUTION', mood: t => t < 8.4 ? 'squint' : 'wide', look: () => [1, -0.4] },
    { who: 'libra', from: T.def, to: T.sc1, plate: 'DEFENCE', mood: t => t < 13.8 ? 'sparkle' : 'wink', look: () => [1, -0.4] },
    scorpio(T.sc1, T.wit),
    { who: 'ex', from: T.wit, to: T.close, plate: 'WITNESS', mood: t => seq(t, [[0, 'neutral'], [41, 'squint'], [44.5, 'happy']]), look: () => [1, -0.3], tears: t => t > 41 && t < 44.3 ? 2 : 0 },
    scorpio(T.close, 1e9),
  ],
  ticker: { at: 1.0, out: [72.6, 72.9], label: 'CHARGE', text: 'PLAYED IT COOL WITH A CRUSH FOR THREE WEEKS' },
  boxes: [
    { open: 1.3, close: 3.15, lines: [{ t: 1.45, who: 'JUDGE', text: 'this trial ends in a *verdict.* stay.' }] },
    { open: 5.75, close: 10.9, lines: [{ t: 5.85, who: 'aries', text: 'your honour, they *liked* them.' }, { t: 8.4, who: 'aries', text: 'and said *nothing!*' }] },
    { open: 11.15, close: 16.3, lines: [{ t: 11.25, who: 'libra', text: 'my client was being *mysterious.*' }, { t: 13.8, who: 'libra', text: 'mystery is very *in.*' }] },
    { open: 16.55, close: 19.95, lines: [{ t: 16.65, who: 'scorpio', text: "I don't even *like* them." }] },
    { open: 36.2, close: 37.7, lines: [{ t: 36.3, who: 'JUDGE', text: 'the court calls… a *surprise witness.*' }] },
    { open: 38.1, close: 49.8, lines: [{ t: 38.3, who: 'ex', text: 'they did this with me *too.*' }, { t: 41.0, who: 'ex', text: 'I never knew they liked me until we *ended.*' }, { t: 44.5, who: 'ex', text: "just tell them. it's *scarier* not to." }] },
    { open: 51.8, close: 59.9, lines: [{ t: 52.0, who: 'scorpio', text: '…okay. I like them. a *lot.*' }, { t: 55.0, who: 'scorpio', text: "I was scared they wouldn't like me *back.*" }] },
    { open: 66.3, close: 72.7, lines: [{ t: 66.5, who: 'scorpio', text: '…*same?*' }, { t: 68.6, who: 'JUDGE', text: 'court is *adjourned.*' }] },
  ],
  exhibits: [
    { at: T.evA, out: [25.2, 25.5], label: 'EXHIBIT A', draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♏︎ scorpio', size: 40, msgs: [{ at: 20.8, side: 'L', text: 'want to get food saturday?' }, { at: 21.6, side: 'R', text: 'maybe', meta: 'seen 11:58 PM' }, { at: 23.4, side: 'L', text: 'no worries!' }] })
    } },
    { at: T.evB, out: [30.6, 30.9], label: 'EXHIBIT B', draw(x, t, k, B) {
      box(x, B.cx - 320, B.cy - 320, 640, 640, '#fff8d6', { b: 6, hi: null }); label(x, 'DRAFTS (DELETED)', B.cx, B.cy - 270, { size: 38, col: INK, weight: 900, shadow: false })
      DRAFTS.forEach(([s, a], i) => { if (t < a) return; const y = B.cy - 140 + i * 150, kk = ease.outBack(clamp(prog(t, a, a + 0.25)))
        x.save(); x.translate(B.cx, y); x.scale(kk, kk); label(x, s, 0, 0, { size: 38, col: INK, weight: 800, shadow: false }); x.restore()
        const u = clamp(prog(t, a + 0.45, a + 0.75)); R(x, RED, B.cx - 280, y - 4, 560 * u, 9) })
    } },
    { at: T.evC, out: [35.4, 35.7], label: 'EXHIBIT C', draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♏︎ scorpio', size: 42, msgs: [{ at: 31.4, side: 'L', text: 'I had a really nice time tonight' }, { at: 32.3, side: 'R', text: 'lol', meta: 'sent 1:12 AM' }] })
      if (t > 33.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(B.cx + 190, B.cy - 40, 120, 70, -0.05, 0, Math.PI * 2 * clamp(prog(t, 33.0, 33.35))); x.stroke(); x.restore() }
    } },
  ],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'OF PLAYING IT COOL', color: RED, out: [64.4, 64.7], y: 860 }],
  sentence: { at: 61.4, out: [64.4, 64.7], text: 'tell them. kindly. this week.' },
  over(x, t) {
    // the crush rises in the gallery with a sign
    if (t > T.same - 0.1 && t < T.last) {
      const k = ease.outBack(clamp(prog(t, T.same, T.same + 0.45)))
      const y = 1180 - 200 * k
      star(x, t, { x: 860, y: y + 20, s: 190 }, { who: 'capricorn', mood: 'heart', look: [-1, -0.5], seed: 51, hops: [66.0, 66.4] })
      x.save(); x.translate(860, y - 160); x.rotate(0.05 * Math.sin(t * 4))
      R(x, INK, -8, 40, 16, 110); box(x, -150, -60, 300, 110, '#fffaf0', { b: 6, hi: null }); label(x, 'SAME.', 0, -4, { size: 70, col: RED, weight: 900, shadow: false }); x.restore()
    }
  },
  cues: [['pop', 20.8, 987.77, 0.04, -0.2], ['pop', 21.6, 659.25, 0.04, 0.2], ['pop', 23.4, 880, 0.035, -0.2], ...DRAFTS.flatMap(([, a]) => [['pop', a, 1174.66, 0.035, 0], ['whoosh', a + 0.45, 0.25, 0.03]]),
    ['pop', 31.4, 987.77, 0.04, -0.2], ['pop', 32.3, 523.25, 0.05, 0.2], ['tick', 33.0, 0.05], ['tick', 33.1, 0.05], ['riser', 36.4, T.wit, 0.04],
    ['whoosh', T.glasses, 0.4, 0.04], ['bell', T.glasses + 0.3, 1760, 0.03, 1, 0], ...[41.2, 41.5, 41.8].map(a => ['pluck', a, 587.33, 0.03, 0.4, 0.45]),
    ['whoosh', T.same, 0.5, 0.05], ['pop', T.same + 0.4, 1318.51, 0.05, 0.3], ['glitter', T.same + 0.3, T.same + 1.2], ['bell', T.same + 0.5, 2349.32, 0.03, 1.4, 0.3],
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.25, 2, 0.12, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
