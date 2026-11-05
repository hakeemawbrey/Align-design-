// kpsue06: PLANET TALK: THE SUN, Ep 6 "Virgo's Fix-Me-First List" (26 s vertical, star_advice post, jazzy · D). Loop.
// Frame 0: the Sun mid-slide into Virgo's desk, Virgo at the laptop spreadsheet, hook "VIRGO. Close the spreadsheet."
//   3.0 Virgo: I'll date once I fix everything · 5.9 FIX BEFORE DATING list · 8.6 Sun: you don't have to be finished
//   to be loved · 12.2 that loud laugh is someone's favourite sound (rows struck out) · 15.2 "what's left?"
//   17.6 THE LIST v2: "be nice to me" · 19.0 Pisces cries · 22.8 "Row one: be nice to me." → loops to the slide-in.
import { episode, drawPanel, rr, INK } from '../../kpsue01/sunkit.js'

const FIX = ['laughs too loud', 'texts too long', 'too many plants', 'cries at sad ads', '…and 43 more']
const ROWS = FIX.map((text, i) => ({ at: 6.1 + i * 0.4, text, strike: i < 4 ? 12.6 + i * 0.4 : 14.4 }))

function laptop(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(800, 1480); x.scale(k, k); x.rotate(-0.04)
  x.fillStyle = INK; rr(x, -170, -150, 340, 220, 18); x.fill()
  x.fillStyle = '#eaf6ea'; rr(x, -156, -136, 312, 192, 10); x.fill()
  x.strokeStyle = 'rgba(40,90,60,0.4)'; x.lineWidth = 2
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(-156, -136 + i * 24); x.lineTo(156, -136 + i * 24); x.stroke() }
  for (let j = 1; j < 4; j++) { x.beginPath(); x.moveTo(-156 + j * 78, -136); x.lineTo(-156 + j * 78, 56); x.stroke() }
  const sc = (t * 60) % 24
  x.fillStyle = '#c23a3a'; for (let i = 0; i < 7; i++) x.fillRect(-146, -128 + i * 24 - sc % 24 + 24, 60 + (i * 37) % 60, 8)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 70); x.lineTo(200, 70); x.lineTo(220, 100); x.lineTo(-220, 100); x.closePath(); x.fill()
  x.restore()
}

const E = episode({
  sign: 'virgo', duration: 26, ending: 'loop',
  entrance: { kind: 'slide', at: -0.45, x: 540, y: 620, size: 520 },
  hook: { text: 'VIRGO. Close the | *spreadsheet.*' },
  sun: { mood: [[0, 'wide'], [0.5, 'happy'], [6.1, 'wide'], [8.6, 'happy'], [12.2, 'love'], [15.2, 'happy'], [18.4, 'proud'], [20.6, 'love'], [22.8, 'happy']], hops: [8.6, 12.2, 18.4] },
  me: {
    base: { x: 420, y: 1420, size: 300 },
    mood: [[0, 'squint'], [1.0, 'wide'], [3.0, 'neutral'], [6.1, 'squint'], [8.6, 'wide'], [12.2, 'neutral'], [13.4, 'sparkle'], [15.2, 'neutral'], [18.0, 'sparkle'], [19.6, 'happy'], [25.0, 'squint']],
    look: [[0, [1, 0]], [1.0, [0, -1]], [3.0, [0, 0]], [6.1, [0, -1]], [25.0, [1, 0]]],
    tears: [[0, 0], [18.2, 1], [22.6, 0]],
    sweat: [[0, true], [3.0, false], [6.1, true], [8.6, false]],
  },
  bubbles: [
    { t0: 3.0, t1: 5.8, who: 'virgo', text: 'I’ll date once I fix *everything* on my list.' },
    { t0: 8.6, t1: 12.0, who: 'sun', text: 'Virgo! You don’t have to be *finished* to be loved.', y: 240, tailUp: false },
    { t0: 12.2, t1: 15.0, who: 'sun', text: 'That loud laugh? *Someone’s favourite sound.*', y: 240, tailUp: false },
    { t0: 15.2, t1: 17.4, who: 'virgo', text: 'Then what’s left on the *list?*' },
    { t0: 18.4, t1: 20.4, who: 'sun', text: 'Just one thing. *That.*', y: 240, tailUp: false },
    { t0: 20.6, t1: 22.6, who: 'pisces', text: 'Adding it to MY list. *Sobbing.*' },
    { t0: 22.8, t1: 25.5, who: 'virgo', text: 'Row one: *be nice to me.*', size: 54, x: 470, maxW: 700, tail: -40 },
  ],
  pisces: { at: 19.0, out: [25.3, 25.6], tears: [[19.0, 3]], hops: [20.6, 21.0] },
  front(x, t) {
    const lk = 1 - Math.min(1, Math.max(0, (t - 5.7) / 0.25))
    laptop(x, t, lk)
    const pv = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p1 = pv(5.9, 17.4)
    if (p1 > 0.01) drawPanel(x, t, { x: 540, y: 1030, w: 720, h: 420, title: 'FIX BEFORE DATING', color: '#9fd08a', pop: p1, rows: ROWS, size: 38 })
    const p2 = pv(17.6, 22.6)
    if (p2 > 0.01) drawPanel(x, t, { x: 540, y: 1030, w: 720, h: 230, title: 'THE LIST (v2)', color: '#f2c75c', pop: p2, rows: [{ at: 18.0, text: '1. be nice to me', serif: true, color: '#c23a6a' }], size: 44 })
  },
  cues: [...ROWS.map((r, i) => ['pop', r.at, 880 + i * 50, 0.03, 0.2]), ...ROWS.map(r => ['tick', +(r.strike + 0.05).toFixed(2), 0.05]), ['bell', 18.05, 1174.66, 0.04, 1.8, 0], ['glitter', 18.0, 18.6]],
})
export const { DURATION, SCENES, CUES } = E
