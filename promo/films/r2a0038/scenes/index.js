// r2a0038: ADVICE SOLO, "Aries, let yourself | be loved." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
// Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Aries, let yourself | *be loved.*"
//   3.6–37.8   someone cooked (sit down: NO HELPING) · a compliment (no arguing: ACCEPTED) · always first to help (hand
//              over the toolbox) · hugs feel slow (three more seconds) · love isn't a race (no finish line) · feeling sick
//              (let them fuss) · they planned the date (passenger mode) · matched with a Cancer (let them baby you)
//              · fighting every feeling (the gloves come off: TRUCE)
//  37.8        "Tough outside. | *Hug-sized inside.*"
//  41.0        LESSON UNLOCKED: "Strong people | get *held* too."  GUARD: DOWN
//  46.9        "Aries let them. | *Best day ever.*" over the match card: Aries + Cancer (the match that babied them).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries', RED = '#e23d4e', CORAL = '#ff6b5c', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function dinner(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -190, 30, 380, 30, BROWN)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 130, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 10, 122, 33, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-60, -34, 120, 44); x.fillStyle = ORANGE; x.fillRect(-54, -28, 108, 34); x.fillStyle = MINT; x.fillRect(-20, -42, 40, 14)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 6; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); x.moveTo(-30 + i * 30, -60 - ph * 90); x.quadraticCurveTo(-14 + i * 30, -80 - ph * 90, -30 + i * 30, -100 - ph * 90); x.stroke() }
  x.restore()
}
function toolbox(x, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -130, -50, 260, 120); box(x, -130, -50, 260, 120, RED)
  x.strokeStyle = INK; x.lineWidth = 12; x.strokeRect(-50, -100, 100, 52); x.strokeStyle = '#8a8aa0'; x.lineWidth = 6; x.strokeRect(-50, -100, 100, 52)
  box(x, -20, -10, 40, 22, GOLD, 4)
  x.restore()
}
function timer(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -110, -110, 220, 220); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  box(x, -20, -146, 40, 30, GOLD, 4)
  txt(x, String(n), 0, 6, 110, RED, { font: MONO, weight: 700 })
  x.restore()
}
function ribbon(x, t, cx, cy, k, cut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, -170, 20, 300, '#d8dbe8', 4); box(x, 180, -170, 20, 300, '#d8dbe8', 4)
  txt(x, 'FINISH', 0, -150, 40, BONE, { font: MONO, weight: 700 })
  if (!cut) { box(x, -180, -60, 360, 24, RED, 4) }
  else { x.save(); x.rotate(0.25); box(x, -180, -60, 150, 24, RED, 4); x.restore(); x.save(); x.rotate(-0.25); box(x, 30, -60, 150, 24, RED, 4); x.restore() }
  x.restore()
}
function thermo(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.5); x.scale(k, k)
  box(x, -14, -120, 28, 200, '#e8ecf6'); x.fillStyle = RED; x.fillRect(-6, -40, 12, 120)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 100, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 100, 23, 0, Math.PI * 2); x.fill()
  x.restore()
}
function teaCup(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -40, 120, 90, PINK); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(70, 4, 26, -1.2, 1.2); x.stroke()
  x.fillStyle = BROWN; x.fillRect(-54, -34, 108, 14)
  x.restore()
}
function wheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.2); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#5a4a7a'; x.lineWidth = 22; x.stroke()
  x.fillStyle = INK; x.fillRect(-110, -16, 220, 32); x.fillRect(-16, 0, 32, 110)
  x.fillStyle = '#5a4a7a'; x.fillRect(-104, -10, 208, 20); x.fillRect(-10, 0, 20, 104)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.fill()
  x.restore()
}
const GLOVE = ['.RRRRR..', 'RRRRRRR.', 'RRRRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '.WWWWWW.', '.WWWWWW.']

const CAMEOS = [
  { sign: S, cap: 'Someone cooked for you? | *Sit. Down.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      dinner(x, t, 760, 940, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9)
      label(x, 790, 680, 'NO HELPING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got a compliment? | *Don’t argue with it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re amazing', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      bubble(x, 760, 880, 'no, YOU’RE—', pop01(t, P.t0 + 0.7, 0.25, 2.2) * (lt > 1.2 ? 0 : 1), { size: 36, tail: 'bl' })
      label(x, 790, 900, '✓ ACCEPTED', pop01(t, P.t0 + 1.25 * 3.1 / 2.4, 0.3, 2.6), { size: 48, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Always first to help? | *Let them help you.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.8, 1.5))
      toolbox(x, lerp(560, 800, p), 1080, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(-0.1, 0.1, p))
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 820, 180 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 820, 660, 'I got it!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Hugs feel too slow? | *Stay three more seconds.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.max(0, 3 - Math.floor(prog(lt, 0.4, 1.6) * 3))
      if (n > 0) timer(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      else { drawBits(x, HEART, { H: RED, W: '#fff' }, 790, 860, 26 * pop01(t, P.t0 + 1.6 * 3.1 / 2.4, 0.35, 2.4)); hearts(x, t, 790, 800, P.t0 + 2.1, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 }) }
      label(x, 790, 1100, 'HUG: EXTENDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Racing to win? | *Love isn’t a race.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      ribbon(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2)
      label(x, 790, 1100, 'NO FINISH LINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feeling sick? | *Let them fuss.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      thermo(x, F.x + 110, F.cy + 30, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.8)
      teaCup(x, t, 800, 930, pop01(t, P.t0 + 0.7, 0.3, 2) * 1.5)
      bubble(x, 800, 700, 'more tea? a pillow?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      label(x, 800, 1110, 'FUSS: ALLOWED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They planned the date? | *Don’t grab the wheel.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wheel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'PASSENGER MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Matched with a Cancer? | *Let them baby you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 36, bg: PINK, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 800, 1120, 'did you eat?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Fighting every feeling? | *Call a truce.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const off = ease.inOutCubic(prog(lt, 0.9, 1.5))
      drawBits(x, GLOVE, { R: RED, W: BONE }, 760, 860 + off * 160, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 - off * 0.8, alpha: 1 - off * 0.6 })
      drawBits(x, GLOVE, { R: RED, W: BONE }, 880, 880 + off * 160, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.2 + off * 0.8, sx: -1, alpha: 1 - off * 0.6 })
      label(x, 820, 680, 'TRUCE', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 54, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0038', key: 'C', accent: CORAL, solo: S, ending: 'card',
  title: 'Aries, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Tough outside. | *Hug-sized inside.*', mood: 'heart' },
  lesson: { text: 'Strong people | get *held* too.', chip: 'GUARD: DOWN' },
  last: {
    text: 'Aries let them. | *Best day ever.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
