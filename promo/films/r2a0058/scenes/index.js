// r2a0058: star_advice, ADVICE SOLO, "Taurus, you can | change your mind." (~47 s vertical, signs3kit, music: lofi · C)
// One sign the whole film (solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Taurus, you can | change *your mind.*"
//   3.6–37.8   ordered the usual (try the special) · same street for years (turn left once) · said "never" (never? maybe!)
//              · changed your mind = growing (a sprout) · want new paint (beige will forgive you) · liked a song you hated
//              (ON REPEAT) · pineapple on pizza (brave) · new haircut (a mirror, sparkles) · chart still Taurus, just updated
//  37.8        "Steady roots. | *Room to grow.*"
//  41.2        CALLBACK: "The beige wall? | *Pink now.*"  Taurus with a paint roller and a fresh pink wall.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', BROWN = '#8a4a2e', BEIGE = '#d9c8a6', YEL = '#ffe14a'

const PIZZA = ['YYYYYYYYYYY', '.YRYPYRYPY.', '..YYYYYYY..', '..YPYRYPY..', '...YYYYY...', '....YRY....', '.....Y.....']
const PIZZA_C = { Y: '#ffd27a', R: RED, P: YEL }
function sprout(x, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-74, 0, 148, 110); x.fillStyle = '#c96a3a'; x.fillRect(-66, 8, 132, 94); x.fillStyle = '#a4522a'; x.fillRect(-74, 0, 148, 24)
  const h = 30 + 170 * g
  x.fillStyle = INK; x.fillRect(-9, -h, 18, h); x.fillStyle = '#4fbf5a'; x.fillRect(-5, -h, 10, h)
  const leaf = (lx, ly, d) => { x.fillStyle = INK; x.fillRect(lx - 4 + (d < 0 ? -50 : 0), ly - 4, 58, 36); x.fillStyle = GREEN; x.fillRect(lx + (d < 0 ? -50 : 0), ly, 50, 28) }
  leaf(0, -h + 10, 1); if (g > 0.4) leaf(0, -h * 0.55, -1); if (g > 0.8) leaf(0, -h * 0.3, 1)
  x.restore()
}
function wall(x, cx, cy, w, h, k, p, { swatch = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BEIGE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = PINK; x.fillRect(-w / 2, -h / 2, w * p, h)
  if (p > 0.02 && p < 0.99) {                     // the roller on the paint edge
    const rx = -w / 2 + w * p
    x.fillStyle = INK; x.fillRect(rx - 18, -60, 36, 120); x.fillStyle = '#ff6f9c'; x.fillRect(rx - 12, -54, 24, 108)
    x.fillStyle = INK; x.fillRect(rx + 18, -6, 40, 12); x.fillRect(rx + 50, -6, 12, 120); x.fillStyle = BROWN; x.fillRect(rx + 48, 60, 16, 60)
  }
  x.restore()
}
function chart(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#1d4a2a'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GREEN; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 70, Math.sin(a) * 70); x.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); x.stroke() }
  x.fillStyle = BONE; x.font = `700 64px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♉︎', 0, 4)
  x.restore()
}
function mirror(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 112, 152, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 104, 144, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe8f5'; x.beginPath(); x.ellipse(0, 0, 84, 124, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-50, -80, 16, 70); x.fillRect(-26, -96, 10, 40)
  x.fillStyle = INK; x.fillRect(-8, 150, 16, 70); x.fillRect(-60, 214, 120, 14)
  x.restore()
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Ordered the usual? | *Try the special.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 740, 'THE USUAL', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: BEIGE, font: MONO, weight: 700 })
      label(x, 790, 900, '✦ THE SPECIAL', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 42, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Same street for years? | *Turn left once.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: lt => lt > 1.3 ? [-1, 0] : [1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(312, 760, 16, 360 * k); x.fillStyle = '#b8c2d0'; x.fillRect(316, 760, 8, 356 * k) }
      label(x, 320, 760, '← NEW STREET', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 880, 'OLD STREET →', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 28, bg: BEIGE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said "never" once? | *Never can retire.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'never.', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 54, tail: 'bl' })
      bubble(x, 790, 760, 'never? | maybe!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Changed your mind? | That’s *growing.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { sprout(x, 790, 1030, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.8))) } },
  { sign: S, cap: 'Want a new wall colour? | *Beige will cope.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 720, 840, 'BEIGE', k, { size: 36, bg: BEIGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 860, 940, 'PINK?!', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 44, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love a song you hated? | *Allowed.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: GREEN, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      label(x, 790, 740, '↻ ON REPEAT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Pineapple on pizza? | *Brave. Proud of you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIZZA, PIZZA_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'FIRST BITE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New haircut? | *Bold. We love it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      mirror(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 170, 0.5)
      label(x, 790, 1110, 'FRESH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still a Taurus. | *Just updated.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'CHART v2.0', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0058', key: 'C', accent: GREEN, solo: S, ending: 'callback',
  title: 'Taurus, you can | change *your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Steady roots. | *Room to grow.*', mood: 'heart' },
  last: {
    text: 'The beige wall? | *Pink now.*',
    draw(x, t, lt) {
      wall(x, 640, 1050, 460, 300, pop01(t, t - lt + 0.3, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 2.6)))
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 300, 1100, 230 * k, { mood: lt > 2.6 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 2.7] })
      sparkles(x, t, 640, 1050, t - lt + 2.7, 8, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
