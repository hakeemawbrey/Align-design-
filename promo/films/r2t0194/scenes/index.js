// r2t0194: star_talk, ROLL CALL, "The signs | as baristas." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme barista version of itself.
//   0.0–3.6    "The signs | *as baristas.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries made it before you ordered · Taurus finished the oat milk · Gemini wrote three names on your cup
//              · Cancer remembers your mum's order too · Leo's latte art is a self-portrait · Virgo measures foam with a
//              ruler · Libra brought all nine milks · Scorpio guessed your order from your sign · Sagittarius serves from a
//              hot-air balloon · Capricorn sold you a 400-stamp loyalty card · Aquarius invented a moon latte
//              · Pisces spelled your name wrong and cried about it
//  49.2        "Your coffee? | *Eventually.*"  Group photo.
//  52.6        CALLBACK: "Capricorn’s loyalty card? | *Stamp 2 of 400.*"  The card comes back with its second stamp.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const COFFEE = '#c98f6a', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', TEAL = '#2fc79a'

// ── props
const CARTON = ['.WWWW.', 'WWWWWW', 'CCCCCC', 'CWWWWC', 'CWKKWC', 'CWWWWC', 'CCCCCC']
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYKYKYY', 'YKYYYKYYYKYYYKYYYKYY', 'YYYYYYYYYYYYYYYYYYYY']
const BALLOON = [
  '....RRRRRR....',
  '..RRWRRRRWRR..',
  '.RRRWRRRRWRRR.',
  'RRRRWRRRRWRRRR',
  'RRRRWRRRRWRRRR',
  '.RRRWRRRRWRRR.',
  '..RRWRRRRWRR..',
  '....RRRRRR....',
  '.....K..K.....',
  '.....K..K.....',
  '....BBBBBB....',
  '....BBBBBB....',
]
const BALLOON_C = { R: ORANGE, W: '#ffe27a', K: '#3a2a1a', B: BROWN }

// a takeaway cup with optional text on the sleeve and a foam top
function cup(x, cx, cy, k, { text = '', size = 26, sleeve = BROWN, ink = CREAM, top = CREAM, rot = 0, glow = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow) { x.shadowColor = glow; x.shadowBlur = 40 }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -130); x.lineTo(96, -130); x.lineTo(76, 130); x.lineTo(-76, 130); x.closePath(); x.fill()
  x.shadowBlur = 0
  x.fillStyle = '#f4efe6'; x.beginPath(); x.moveTo(-88, -122); x.lineTo(88, -122); x.lineTo(70, 122); x.lineTo(-70, 122); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-106, -150, 212, 34); x.fillStyle = top; x.fillRect(-100, -144, 200, 22)
  x.fillStyle = sleeve; x.fillRect(-84, -40, 168, 90)
  if (text) { x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, 5 + (i - (a.length - 1) / 2) * size * 1.1)) }
  x.restore()
}
// a mug seen from above with latte art: a little star face
function latteArt(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4efe6'; x.beginPath(); x.arc(0, 0, 162, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a5a3a'; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.restore()
  if (lt > 0.5) signChar(x, t, 'leo', cx, cy + 6, 170 * k * ease.outCubic(clamp((lt - 0.5) / 0.5)), { mood: 'wink', seed: 91, glyph: false, glow: 0.2, alpha: 0.85 })
}
// a loyalty card with stamp slots
function loyalty(x, cx, cy, k, n, { title = 'LOYALTY · 1 OF 400' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-176, -96, 360, 210)
  x.fillStyle = INK; x.fillRect(-186, -110, 372, 220); x.fillStyle = CREAM; x.fillRect(-178, -102, 356, 204)
  x.fillStyle = TEAL; x.fillRect(-178, -102, 356, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -76)
  for (let i = 0; i < 10; i++) {
    const px = -136 + (i % 5) * 68, py = -6 + Math.floor(i / 5) * 62
    x.strokeStyle = '#b9b0a0'; x.lineWidth = 4; x.beginPath(); x.arc(px, py, 24, 0, Math.PI * 2); x.stroke()
    if (i < n) { x.fillStyle = RED; x.beginPath(); x.arc(px, py, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.font = `800 20px ${INTER}`; x.fillText('✓', px, py + 1) }
  }
  x.restore()
}
// a sign profile card: "♉︎ TAURUS → oat latte"
function signCard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#2a2350'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = '#140c30'; x.fillRect(-128, -148, 256, 190)
  x.restore()
  signChar(x, t, 'taurus', cx + 6, cy - 50 * k, 150 * k, { mood: 'happy', seed: 92, glyph: false })
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = '#5fd068'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♉︎ TAURUS', 0, 80)
  x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.fillText('= oat latte', 0, 124)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Made your order | *before you spoke.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -200 }, hops: [0.3, 0.9],
    front(x, t, lt, P) {
      const s = ease.outCubic(clamp((lt - 0.2) / 0.4))
      cup(x, lerp(1000, 790, s), 880, pop01(t, P.t0 + 0.2, 0.25, 2), { text: 'DONE', size: 34, sleeve: '#f0603a', rot: lerp(0.4, 0.05, s) })
      bubble(x, 790, 610, 'hi, can I—', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      label(x, 790, 1110, '0.3 SECONDS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Out of oat milk. | Taurus *had it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tip = ease.inOutCubic(clamp((lt - 0.5) / 0.6))
      drawBits(x, CARTON, { W: CREAM, C: '#5fd068', K: '#b9b0a0' }, 790, 860, 26 * k, { rot: tip * 0.6 })
      label(x, 790, 1090, 'OAT MILK: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked your name. | Wrote *three.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const names = ['SAM?', 'SAM? JO?', 'SAM? JO? | ALEX?']
      cup(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { text: names[Math.min(2, Math.floor(clamp((lt - 0.4) / 1.2) * 3))], size: 30, sleeve: '#ffd23a', ink: INK })
      bubble(x, 790, 600, 'it’s Kim.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Remembers your order. | And *your mum’s.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      cup(x, 720, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'YOU', size: 34, sleeve: '#3fb6f0', ink: INK })
      cup(x, 880, 900, 0.8 * pop01(t, P.t0 + 0.8, 0.3, 2), { text: 'MUM', size: 34, sleeve: PINK, ink: INK })
      bubble(x, 780, 620, 'how’s her knee?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Latte art? | A *self-portrait.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -210 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      latteArt(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1090, 'SIGNED, OBVIOUSLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Measured the foam. | *With a ruler.*', mood: 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      cup(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), { sleeve: '#a8d86a' })
      drawBits(x, RULER, { Y: GOLD, K: INK }, 790, lerp(600, 740, ease.outCubic(clamp((lt - 0.5) / 0.4))), 11 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: Math.PI / 2 })
      label(x, 790, 1140, '1.0 CM. EXACTLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a milk. | Brought *all nine.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', star: { x: 0, y: -60, s: 250 }, hops: [1.5],
    front(x, t, lt, P) {
      const COLS = ['#5fd068', SKYB, PINK, GOLD, LAV, ORANGE, MINT, '#ff9ccf', '#c98f6a']
      for (let i = 0; i < 9; i++) drawBits(x, CARTON, { W: CREAM, C: COLS[i], K: '#b9b0a0' }, 190 + i * 87, 1080 + (i % 2) * 10, 13 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.25, 2.2))
    } },
  { sign: 'scorpio', cap: 'Guessed your order | from *your sign.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      signCard(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'CORRECT. AGAIN.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#e23d66', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Serves coffee | from a *hot-air balloon.*', mood: 'sparkle', star: { x: -120, y: -50, s: 170 }, hops: [],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.35, 2)
      drawBits(x, BALLOON, BALLOON_C, 420, 740, 30 * k)
    },
    front(x, t, lt, P) {
      drawBits(x, ['BBBBBBBB', 'BbBBbBBB', 'BBBBBBBB'], { B: BROWN, b: '#a65d38' }, 420, 945, 26 * pop01(t, P.t0 + 0.05, 0.35, 2))
      cup(x, 800, 1020, 0.6 * pop01(t, P.t0 + 0.9, 0.3, 2), { sleeve: '#b36cff' })
      bubble(x, 800, 790, 'catch!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Sold you a loyalty card. | *Four hundred* stamps.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      loyalty(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 1 : 0)
      label(x, 780, 1080, 'FREE COFFEE: SOON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a drink. | *Moon* latte.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      cup(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: '☾', size: 64, sleeve: '#6b62e8', top: '#c9a6ff', glow: '#c9a6ff' })
      label(x, 790, 1110, 'TASTES LIKE SPACE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 8, 190, 0.2, [LAV, SKYB, BONE])
    } },
  { sign: 'pisces', cap: 'Spelled your name wrong. | *Cried* about it.', mood: 'sparkle', tears: 3, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      cup(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { text: 'JSHO', size: 40, sleeve: '#7c74f0' })
      bubble(x, 790, 620, 'it’s fine!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
      label(x, 790, 1110, 'FREE COOKIE (SORRY)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0194', key: 'D', accent: COFFEE, ending: 'callback',
  title: 'The signs | *as baristas.*',
  cameos: CAMEOS,
  group: { cap: 'Your coffee? | *Eventually.*' },
  last: {
    text: 'Capricorn’s card? | *Stamp 2 of 400.*',
    draw(x, t, lt) {
      loyalty(x, 540, 980, 2.1 * pop01(t, t - lt + 0.5, 0.35, 2), lt > 1.4 ? 2 : 1, { title: 'LOYALTY · 2 OF 400' })
      sparkles(x, t, 600, 990, t - lt + 1.4, 7, 160, 0.3)
      signChar(x, t, 'capricorn', 540, 1340, 210, { mood: 'sparkle', pop: pop01(t, t - lt + 0.8, 0.4, 2), seed: 93, glyph: false, hops: [t - lt + 1.5] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
