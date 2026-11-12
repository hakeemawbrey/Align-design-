// r2a0709: star_advice, ADVICE SOLO (libra), "Libra, it's okay | *to start over.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine gentle fresh starts for a Libra who wants everything just right, each a relatable truth
// + a warm reframe with one light gag. Ending: callback (card 3's two-inch scarf comes back, a little longer).
//   changed your mind, that's growth · painted the room again · a new hobby at any age (scarf: two inches) · a blank
//   page · a new city, home grows back · let go of something, hands free · planted a new seed · day one again, brave
//   · every sunrise is a restart
//   last "The scarf? | *Three inches now.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffa6d8', S = 'libra', ST = { x: -190 }
const YARN = PINK, STRIPES = [PINK, MINT, LAV]

/** a yarn ball with two needles and a striped scarf of length len (px) hanging from it */
function knitting(x, t, cx, cy, k, len) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < Math.floor(len / 22); i++) { x.fillStyle = INK; x.fillRect(-54, 40 + i * 22, 108, 24); x.fillStyle = STRIPES[i % 3]; x.fillRect(-48, 42 + i * 22, 96, 20) }
  x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 74, 0, Math.PI * 2); x.fill()
  x.fillStyle = YARN; x.beginPath(); x.arc(0, -20, 66, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#ff6fa0'; x.lineWidth = 6; for (let i = -2; i <= 2; i++) { x.beginPath(); x.arc(0, -20, 66, -1.2 + i * 0.4, 1.2 + i * 0.4); x.stroke() }
  x.fillStyle = INK; x.save(); x.rotate(0.5); x.fillRect(-8, -150, 14, 160); x.restore(); x.save(); x.rotate(-0.5); x.fillRect(-6, -150, 14, 160); x.restore()
  x.fillStyle = GOLD; x.save(); x.rotate(0.5); x.fillRect(-4, -146, 6, 152); x.restore(); x.save(); x.rotate(-0.5); x.fillRect(-2, -146, 6, 152); x.restore()
  x.restore()
}
/** three paint swatches that repaint one by one */
function swatches(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const A = ['#9aa5c4', '#c9b8a0', '#b0c4a8'], B = [PINK, '#ffd98a', MINT]
  for (let i = 0; i < 3; i++) {
    const on = lt > 0.6 + i * 0.35
    x.save(); x.translate(cx + (i - 1) * 120, cy + (i % 2) * 20); x.rotate((i - 1) * 0.06); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-52, -110, 104, 220); x.fillStyle = on ? B[i] : A[i]; x.fillRect(-44, -102, 88, 204)
    x.restore()
  }
}
/** a balloon floating up and away from (cx, cy) as p goes 0…1 */
function balloon(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  const bx = cx + Math.sin(t * 2) * 14 + p * 60, by = cy - p * 260
  x.save(); x.globalAlpha = 1 - ease.inQuad(clamp((p - 0.6) / 0.4))
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(bx, by + 80 * k); x.quadraticCurveTo(bx - 20, by + 150, bx + 6, by + 220 * k); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 70 * k, 84 * k, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.ellipse(bx, by, 62 * k, 76 * k, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffffff'; x.fillRect(bx - 34 * k, by - 44 * k, 16 * k, 16 * k)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Changed your mind? | *That’s growth.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'OLD PLAN', 'NEW PLAN ✓', { size: 44, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1060, 'ALLOWED. ALWAYS.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Painted the room again? | *Fresh coat, fresh you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swatches(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1110, 'COAT #3: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'New hobby at any age? | *Cute on you.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      knitting(x, t, 800, 860, 1.4 * pop01(t, P.t0 + 0.2, 0.3, 2), 50)
      L(x, 800, 640, 'SCARF: 2 INCHES', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, 0.05, 32)
      L(x, 800, 1110, 'PROUD OF IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'A blank page? | *Room for better.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'DRAFT #2', headBg: ACC, headInk: INK, lines: [] })
      sparkles(x, t, 800, 900, P.t0 + 1.1, 7, 190, 0.3)
      L(x, 800, 1120, 'ANYTHING CAN GO HERE', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'New city? | *Home grows back.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      const g = clamp((lt - 0.7) / 0.8)
      bits(x, 'HOUSE', 800, 820 + (1 - g) * 40, 26 * g * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 650, 'NEW FAVOURITE CAFÉ: FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 24)
    } },
  { sign: S, cap: 'Let go of something? | *Your hands are free.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      balloon(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(clamp((lt - 0.6) / 1.5)))
      L(x, 800, 1110, 'HANDS: AVAILABLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Planted a new seed? | *Give it time.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = clamp((lt - 0.8) / 1.0)
      if (g < 0.5) bits(x, 'SEED', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else bits(x, 'FLOWER', 800, 940, 20 * pop01(t, P.t0 + 1.3, 0.3, 2))
      L(x, 800, 680, g < 0.5 ? 'DAY 1' : 'DAY 30', 1, g < 0.5 ? CREAM : MINT, 0.05, 38)
    } },
  { sign: S, cap: 'Day one again? | *Day one is brave.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 260, h: 280, head: 'DAY', headBg: RED, lines: [['1', INK]], size: 140 })
      L(x, 800, 1100, '(AGAIN) (THAT’S FINE)', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 28)
      sparkles(x, t, 800, 880, P.t0 + 1.25, 6, 170, 0.6)
    } },
  { sign: S, cap: 'Every sunrise | *is a restart.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const r = ease.outCubic(clamp((lt - 0.3) / 1.3))
      x.save(); x.beginPath(); x.rect(560, 600, 480, 440); x.clip()
      bits(x, 'SUN', 800, lerp(1080, 880, r), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      x.fillStyle = INK; x.fillRect(580, 1036, 440, 12); x.fillStyle = '#4fbf6a'; x.fillRect(580, 1040, 440, 6)
      L(x, 800, 1110, 'TODAY: BRAND NEW', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0709', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Libra, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Begin again. | *Whenever you need.*', mood: 'heart' },
  last: {
    text: 'The scarf? | *Three inches now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1150, 300 * k, { mood: 'heart', look: [1, 0], seed: 40, hops: [t - lt + 1.6] })
      knitting(x, t, 720, 1100, 1.2 * pop01(t, t - lt + 0.7, 0.4, 2), lerp(50, 120, ease.outCubic(clamp((lt - 0.9) / 1.2))))
      sparkles(x, t, 720, 1180, t - lt + 2.1, 7, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
