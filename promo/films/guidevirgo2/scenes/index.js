// guidevirgo2 (15 s vertical Align ad, Star Talk "Your Star Guide", note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.20  "What you *need*, Virgo."  ♍ your star, a little frazzled (sweat drop), beside a to-do scroll that unrolls
//              to the floor: every line ticked.
//   2.35–5.30  YOUR STAR: "someone who notices how much you do…"  A lavender star pops in, reads the scroll, "wow."
//              Chip: Virgo, natural ruler of the 6th house (daily routines).
//   5.30–8.05  YOUR STAR: "and actually says thank you."  It pins a gold THANK YOU rosette on Virgo. Virgo blushes.
//   8.12–10.6  card flip · "Your effort *deserves* thanks."  The same scroll as frame 0, and a ribbon.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm, bubble } from './guidefilm.js'
import { INK, MONO, SERIF, drawBits, pop01 } from './kit.js'

const T = {
  hookOut: [1.9, 2.2], open: 2.2, l1: 2.35, enter: 2.9, wow: 3.55, fact: [4.05, 3.5],
  l2: 5.3, pin: 6.05, close: 8.05, cut: 8.12, last: 8.2, lastLand: 8.65, out: [10.1, 10.45],
}
export const CPS = 32
const HERO = { x: 560, y: 1080, size: 290 }
const PAL = { x: 880, y: 1120, size: 190, c: '#c9b8f0' }
const SCROLL = { x: 205, top: 630, w: 300 }
const TODO = ['dishes', 'laundry', 'bills', 'gift for mom', 'fixed wifi', 'their dentist', 'your dentist']
const TICK = ['.....GG', '....GG.', 'G..GG..', 'GGGG...', '.GG....']
const DROP = ['.B.', 'BBB', 'BWB', '.B.']

function drawScroll(x, t, ok) {
  const { x: cx, top, w } = SCROLL
  const h = 620
  x.save(); x.globalAlpha = ok; x.translate(cx, top); x.rotate(0.03)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -6, w + 12, h + 12)
  x.fillStyle = '#f5eedf'; x.fillRect(-w / 2, 0, w, h)
  x.fillStyle = '#d8c9a8'; x.beginPath(); x.roundRect(-w / 2 - 18, -26, w + 36, 40, 18); x.fill()
  x.fillStyle = '#7a6aa8'; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('TO DO (DONE)', -w / 2 + 22, 40)
  TODO.forEach((s, i) => {
    const y = 104 + i * 72
    x.fillStyle = '#3d3170'; x.font = `italic 500 40px ${SERIF}`; x.fillText(s, -w / 2 + 70, y)
    drawBits(x, TICK, { G: '#3fae6a' }, -w / 2 + 38, y, 5, { outline: null })
  })
  // the curl at the bottom, on the floor
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, h + 10, w / 2 + 8, 26, 0, 0, 7); x.fill()
  x.fillStyle = '#e6dcc4'; x.beginPath(); x.ellipse(0, h + 10, w / 2, 18, 0, 0, 7); x.fill()
  x.restore()
}

/** the gold rosette ribbon; (cx, cy) its centre */
function rosette(x, cx, cy, s, rot) {
  if (s <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  for (const sd of [-1, 1]) {
    x.save(); x.rotate(sd * 0.28)
    x.fillStyle = INK; x.fillRect(-26, 30, 52, 140); x.fillStyle = sd < 0 ? '#e6a92a' : '#f2c75c'; x.fillRect(-20, 30, 40, 128)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-20, 158); x.lineTo(0, 140); x.lineTo(20, 158); x.closePath(); x.fill()
    x.restore()
  }
  x.fillStyle = INK; x.beginPath()
  for (let i = 0; i < 32; i++) { const a = i * Math.PI / 16, rr = i % 2 ? 82 : 96; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  x.closePath(); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath()
  for (let i = 0; i < 32; i++) { const a = i * Math.PI / 16, rr = i % 2 ? 74 : 88; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  x.closePath(); x.fill()
  x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(0, 0, 62, 0, 7); x.fill()
  x.fillStyle = '#9a5b12'; x.font = `700 27px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('THANK', 0, -14); x.fillText('YOU', 0, 18)
  x.restore()
}

function mood(t) {
  if (t < T.wow) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.pin + 0.3) return { mood: 'wide', look: [1, 0] }
  return { mood: 'heart', blush: 1 }
}
const palX = t => lerp(1220, PAL.x, easeOutBack(prog(t, T.enter, T.enter + 0.45), 1.6)) + lerp(0, -150, ease.inOutQuad(prog(t, T.pin - 0.45, T.pin))) - lerp(0, -150, ease.inOutQuad(prog(t, T.pin + 0.4, T.pin + 0.8)))

const film = guideFilm({
  duration: 15, sign: 'virgo', n: 2, seed: 3, cps: CPS,
  hook: 'What you *need,* | Virgo.',
  lines: [{ t: T.l1, text: 'someone who notices how much *you do…*' }, { t: T.l2, text: 'and actually says *thank you.*' }],
  T, fact: 'VIRGO IS THE NATURAL RULER OF THE|6TH HOUSE (DAILY ROUTINES)', factY: 1320,
  last: 'Your effort | *deserves* thanks.', lastLate: 0, lastSize: 112, lastAccent: 150, lastTop: 150, hero: HERO, mood,
  side: -1,
  hops: [T.wow + 0.1, T.pin + 0.05],
  back(x, t, S) { drawScroll(x, t, S.ok) },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    // sweat drop while frazzled
    if (t < T.pin) {
      const ph = (t * 0.9) % 1
      drawBits(x, DROP, { B: '#7fd0ff', W: '#e6f7ff' }, r.x + 120, r.y - 120 + ph * 40, 7, { alpha: Math.sin(Math.PI * ph) * ok })
    }
    if (t > T.enter - 0.1) drawStarChar(x, palX(t), PAL.y, PAL.size, t, { color: PAL.c, mood: t < T.wow ? 'wide' : t < T.pin + 0.3 ? 'sparkle' : 'happy', look: t < T.pin - 0.5 ? [-1, -1] : [-1, 0], seed: 6, glow: 0.8, pop: ok, hops: [T.enter + 0.4, T.wow, T.pin] })
    bubble(x, PAL.x - 20, PAL.y - 250, pop01(t, T.wow, 0.3, 2.4) * (1 - prog(t, T.pin - 0.6, T.pin - 0.4)), 'wow.', { size: 62, color: '#5b4a9a', tail: 'br' })
    // the rosette: from the friend's tip to Virgo's chest
    const pp = prog(t, T.pin - 0.3, T.pin)
    if (pp > 0) {
      const land = t > T.pin ? 1 + 0.18 * Math.exp(-(t - T.pin) * 7) * Math.sin((t - T.pin) * 30) : 1
      rosette(x, lerp(palX(t) - 60, r.x + 105, ease.outCubic(pp)), lerp(PAL.y - 40, r.y + 85, ease.outCubic(pp)), 0.72 * land * ok, -0.12 + 0.05 * Math.sin(t * 2))
    }
  },
  cues: [
    ['tick', 0.2, 0.02], ['tick', 0.5, 0.02], ['tick', 0.8, 0.02],
    ['whoosh', T.enter, 0.35, 0.03], ['pop', T.enter + 0.4, 880, 0.04, 0.4], ['pop', T.wow, 987.77, 0.04, 0.3],
    ['whoosh', T.pin - 0.3, 0.25, 0.025], ['pop', T.pin, 1174.66, 0.05, 0], ['bell', T.pin + 0.05, 1760, 0.035, 1.3, 0], ['glitter', T.pin, T.pin + 1.0],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
void clamp
