// kzce05: ZODIAC COURTROOM, "One Coffee, Zero Venues" (16 s vertical, Month 2 boost m06 #5, dreamy · G). Loop.
//   0.00  frame 0: ♋ Cancer mid-twirl in the dock holding up a wedding seating chart; gavel mid-slam. 0.3 whip.
//         Hook: "Cancer planned the wedding | after *one coffee.*"
//   1.0   CHARGE: PLANNED THE WEDDING AFTER ONE COFFEE   1.4 JUDGE: "the court has seen… the *mood board.*"
//   3.2   EXHIBIT A: the mood board: the coffee polaroid, flowers, a cat already named MOCHA, "VENUE???", a heart. Gasp.
//   6.8   WITNESS ♐ Sagittarius (the coffee date): "I just wanted a *second* coffee."
//   9.3   CANCER: "…a second coffee works *too.*"   11.2 NOT GUILTY (OF HOPE) · 11.8 "enjoy coffee number two."
//  13.6   last line "One coffee. | Zero *venues.*"; 15.6–16.0 eases back into frame 0 (seamless loop).
import { makeCourt, label, box, R, drawBits, clamp, prog, ease, INK, RED, PINK, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { wit: 6.8, back: 9.15, ng: 11.2, last: 13.6 }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const CAT = ['K...K', 'KK.KK', 'KKKKK', 'KWKWK', 'KKKKK', '.KKK.']
function chart(x, t, P) {
  const tw = Math.sin(t * 5) * 0.12
  x.save(); x.translate(P.x + 110, P.y - 90); x.rotate(0.15 + tw)
  box(x, -70, -90, 140, 170, '#f4e8cc', { b: 5, hi: null })
  label(x, 'SEATING', 0, -64, { size: 20, col: RED, weight: 900, shadow: false })
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { x.fillStyle = INK; x.beginPath(); x.arc(-34 + j * 68, -20 + i * 42, 16, 0, 6.3); x.fill(); x.fillStyle = '#e2cfa6'; x.beginPath(); x.arc(-34 + j * 68, -20 + i * 42, 12, 0, 6.3); x.fill() }
  x.restore()
}
const ITEMS = [3.5, 3.9, 4.3, 4.8, 5.3]
const CFG = {
  id: 'kzce05', dur: 16, ending: 'loop',
  hook: { at: -1, text: 'Cancer planned the wedding | after *one coffee.*', out: [3.0, 3.2], accentColor: '#3fb6f0', size: 88 },
  fx: { whips: [{ at: 0.3, from: 1.25 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 1.45, T.ng],
  gasps: [-0.2, 5.35, T.ng + 0.1],
  jury: ['virgo', 'aquarius', 'aries', 'pisces', 'leo', 'scorpio'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > 3.4 && t < 6.6 ? 'heart' : t > T.ng + 0.3 ? 'happy' : undefined; if (t > T.ng + 0.5) return 'happy' },
  judge: {
    mood: t => t < 0.5 ? 'squint' : t < 3.2 ? 'neutral' : t < 6.7 ? 'wide' : t < T.ng ? 'neutral' : 'sparkle',
    look: t => t > 3.2 && t < 6.6 ? [0, 1] : t > 6.8 && t < 11 ? [-1, 1] : [0, 0.3],
  },
  dock: [
    { who: 'cancer', to: T.wit, mood: t => t < 3 ? 'sparkle' : 'heart', look: t => t > 3.2 && t < 6.6 ? [1, -0.6] : undefined, hops: [0.0, 0.45, 0.9], prop: (x, t, P) => { if (t < 3.2) chart(x, t, P) } },
    { who: 'sagittarius', from: T.wit, to: T.back, plate: 'WITNESS', mood: t => t < 7.2 ? 'neutral' : 'happy', look: () => [1, -0.3] },
    { who: 'cancer', from: T.back, mood: t => t < 9.3 ? 'wide' : 'happy', hops: [T.ng + 0.3, T.ng + 0.6] },
  ],
  heads: [{ text: 'One coffee. | Zero *venues.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#3fb6f0', size: 104, out: [15.45, 15.6] }],
  ticker: { at: 1.0, out: [13.2, 13.5], label: 'CHARGE', text: 'PLANNED THE WEDDING AFTER ONE COFFEE' },
  boxes: [
    { open: 1.3, close: 3.15, lines: [{ t: 1.45, who: 'JUDGE', text: 'the court has seen… the *mood board.*' }] },
    { open: 6.95, close: 9.1, lines: [{ t: 7.1, who: 'sagittarius', text: 'I just wanted a *second* coffee.' }] },
    { open: 9.25, close: 11.1, lines: [{ t: 9.35, who: 'cancer', text: '…a second coffee works *too.*' }] },
  ],
  exhibits: [{
    at: 3.2, out: [6.5, 6.8], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      box(x, B.cx - 340, B.cy - 320, 680, 640, '#c79a6a', { b: 6 })
      for (let i = 0; i < 40; i++) R(x, 'rgba(90,50,30,0.25)', B.cx - 330 + (i * 83) % 660, B.cy - 310 + (i * 47) % 620, 8, 8)
      const pop = a => ease.outBack(clamp(prog(t, a, a + 0.22)))
      const at = (a, cx, cy, rot, fn) => { const kk = pop(a); if (kk <= 0) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(kk, kk); fn(); x.restore() }
      at(ITEMS[0], B.cx - 170, B.cy - 160, -0.1, () => { box(x, -110, -120, 220, 240, '#fffaf0', { b: 5, hi: null }); R(x, '#3a2a55', -94, -104, 188, 160); R(x, '#f4e8cc', -30, -60, 60, 70); R(x, '#7a4e34', -24, -54, 48, 20); label(x, 'first coffee!!', 0, 88, { size: 22, col: INK, weight: 800, shadow: false }) })
      at(ITEMS[1], B.cx + 170, B.cy - 170, 0.08, () => { for (let i = 0; i < 5; i++) drawBits(x, HEART, { H: [PINK, '#ff6b7f', '#ffc2d4'][i % 3] }, -80 + i * 40, -40 + (i % 2) * 40, 7) ; label(x, 'peonies?', 0, 70, { size: 30, col: INK, weight: 800, shadow: false }) })
      at(ITEMS[2], B.cx - 160, B.cy + 150, 0.06, () => { drawBits(x, CAT, { K: '#3a2f4a', W: GOLD }, 0, -30, 18); box(x, -80, 50, 160, 46, GOLD, { b: 4, hi: null }); label(x, 'MOCHA', 0, 73, { size: 30, col: INK, weight: 900, shadow: false }) })
      at(ITEMS[3], B.cx + 170, B.cy + 90, -0.06, () => { box(x, -120, -70, 240, 140, '#fff06a', { b: 5, hi: null }); label(x, 'VENUE???', 0, 0, { size: 40, col: RED, weight: 900, shadow: false }) })
      at(ITEMS[4], B.cx + 150, B.cy + 245, 0.05, () => { drawBits(x, HEART, { H: '#ff4f86' }, 0, 0, 22); label(x, '♋︎ + ♐︎', 0, -4, { size: 40, col: '#fff', weight: 900 }) })
    },
  }],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', sub: 'OF HOPE', color: '#2fae6a', out: [13.2, 13.5], y: 860, size: 118 }],
  sentence: { at: 11.8, out: [13.2, 13.5], text: 'enjoy coffee number two.' },
  cues: [...ITEMS.map((a, i) => ['pop', a, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.04, i % 2 ? 0.3 : -0.3]), ['bell', ITEMS[4] + 0.05, 1760, 0.03, 1, 0],
    ['pluck', T.wit + 0.1, 587.33, 0.04, 0.6, -0.3], ['pluck', T.ng + 0.6, 1318.51, 0.035, 0.5, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
