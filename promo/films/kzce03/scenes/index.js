// kzce03: ZODIAC COURTROOM, "The Cozy Ex" (15 s vertical, Month 2 boost m06 #3, jazzy · Bb). Hard cut.
//   0.00  frame 0: ♉ Taurus mid-dive into a giant plaid blanket labelled THE EX; gavel mid-slam; whip zoom in.
//         Hook: "Taurus went back | to the ex. *Again.*"
//   1.0   CHARGE: WENT BACK TO THE EX BECAUSE IT FELT COZY   1.3 JUDGE: "exhibit A: the *blanket.*"
//   2.9   EXHIBIT A: the blanket. cozy ✓ · familiar ✓ · a little scratchy now ✗ · the same Sunday fight ✗ (gasp)
//   6.8   WITNESS: THE EX: "we're cozy… not *happy.*"   9.7 TAURUS: "I just missed *feeling* close."
//  11.6   NOT GUILTY (OF MISSING THEM) · 12.2 sentence: "miss them. don't go back."   Pisces fountains.
//  13.7   last line "Familiar isn't the same | as *right.*" holds to 15.0, hard cut.
import { makeCourt, label, box, R, clamp, prog, ease, INK, RED, GREEN, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { ex: 6.8, back: 9.5, ng: 11.6, last: 13.7 }
function blanket(x, t, cx, cy, w, h, rot = 0, tag = true) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  R(x, '#c8634a', -w / 2, -h / 2, w, h)
  for (let i = 0; i < w / 40; i++) R(x, 'rgba(255,230,190,0.35)', -w / 2 + i * 40 + 12, -h / 2, 10, h)
  for (let j = 0; j < h / 40; j++) R(x, 'rgba(60,20,30,0.30)', -w / 2, -h / 2 + j * 40 + 14, w, 10)
  for (let i = 0; i < w / 16; i++) R(x, '#f4e8cc', -w / 2 + i * 16 + 3, h / 2, 6, 14)
  if (tag) { box(x, -78, -26, 156, 52, '#f4e8cc', { b: 4, hi: null }); label(x, 'THE EX', 0, 0, { size: 30, col: RED, weight: 900, shadow: false }) }
  x.restore()
}
const CHECKS = [['cozy', true, 3.4], ['familiar', true, 3.9], ['a little scratchy now', false, 4.6], ['the same Sunday fight', false, 5.35]]

const CFG = {
  id: 'kzce03', dur: 15, ending: 'cut',
  hook: { at: -1, text: 'Taurus went back | to the ex. *Again.*', out: [2.7, 2.9], accentColor: '#e9b24a', size: 98 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 1.35, T.ng],
  gasps: [-0.25, 5.4, T.ng + 0.1],
  jury: ['scorpio', 'aries', 'leo', 'pisces', 'capricorn', 'virgo'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.ng + 0.3 ? 'happy' : t > T.ex ? 'wide' : undefined
    if (t > T.ex + 0.3 && t < T.back) return 'wide'
    if (t > T.ng + 0.5) return 'happy'
  },
  judge: {
    mood: t => t < 0.6 ? 'squint' : t < T.ex ? 'neutral' : t < T.back ? 'wide' : t < T.ng ? 'sparkle' : 'happy',
    look: t => t > 2.9 && t < 6.6 ? [0, 1] : t > T.ex && t < 11 ? [-1, 1] : [0, 0.3],
  },
  dock: [
    { who: 'taurus', to: T.ex,
      mood: t => t < 0.7 ? 'happy' : t < 2.8 ? 'heart' : t < 5.4 ? 'neutral' : 'wide',
      look: t => t > 2.9 && t < 6.6 ? [1, -0.6] : undefined,
      prop: (x, t, P) => { if (t < 2.9) { const dive = ease.outCubic(clamp((t + 0.4) / 0.7)); blanket(x, t, P.x + 10, P.y + 125 - dive * 20, 340, 150, -0.08 + 0.06 * Math.sin(t * 3)) } } },
    { who: 'ex', from: T.ex, to: T.back, plate: 'WITNESS', mood: t => t < T.ex + 0.6 ? 'neutral' : 'squint', look: () => [1, -0.4] },
    { who: 'taurus', from: T.back, mood: t => t < T.ng + 0.1 ? 'neutral' : t < 12.6 ? 'wide' : 'happy', look: t => t < T.ng ? [1, -1] : undefined, hops: [12.8, 13.1], tears: t => t > 9.6 && t < 11.6 ? 1 : 0 },
  ],
  heads: [{ text: "Familiar isn't the same | as *right.*", at: T.last, late: 1, lateAt: T.last + 0.35, accent: '#e9b24a', size: 94 }],
  ticker: { at: 1.0, out: [13.4, 13.7], label: 'CHARGE', text: 'WENT BACK TO THE EX BECAUSE IT FELT COZY' },
  boxes: [
    { open: 1.2, close: 2.85, lines: [{ t: 1.35, who: 'JUDGE', text: 'exhibit A: the *blanket.*' }] },
    { open: 6.95, close: 9.45, lines: [{ t: 7.1, who: 'ex', text: "we're cozy… not *happy.*" }] },
    { open: 9.6, close: 11.5, lines: [{ t: 9.7, who: 'taurus', text: 'I just missed *feeling* close.' }] },
  ],
  exhibits: [{
    at: 2.9, out: [6.4, 6.7], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      blanket(x, t, B.cx, B.cy - 150, 560, 300, 0.04)
      CHECKS.forEach(([txt, ok, a], i) => {
        if (t < a) return
        const kk = ease.outBack(clamp(prog(t, a, a + 0.22)))
        x.save(); x.translate(B.cx, B.cy + 70 + i * 74); x.scale(kk, kk)
        label(x, (ok ? '✓ ' : '✗ ') + txt, 0, 0, { size: 44, col: ok ? GREEN : '#ff6b7f', weight: 900 })
        x.restore()
      })
    },
  }],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', sub: 'OF MISSING THEM', color: '#2fae6a', out: [13.4, 13.7], y: 860, size: 118 }],
  sentence: { at: 12.2, out: [13.4, 13.7], text: "miss them. don't go back." },
  cues: [
    ...CHECKS.map(([, ok, a]) => ok ? ['pop', a, 1174.66, 0.04, 0] : ['pluck', a, 392, 0.05, 0.5, 0]),
    ['pluck', T.ex + 0.1, 587.33, 0.04, 0.6, -0.3], ['pluck', T.ng + 0.6, 1318.51, 0.035, 0.5, 0.45],
    ...popWords(T.last + 0.35, 1, 0.1, 5, 0.045),
  ],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
