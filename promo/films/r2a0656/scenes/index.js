// r2a0656: star_advice, ADVICE SOLO (taurus), "Taurus, you're doing | *better than you think.*" (signs3kit social cut,
// music: lofi · D). Nine relatable Taurus truths, each with a warm reframe and one light gag. Ending: group.
//   slow progress (one new leaf) · stayed in again (battery recharging) · same mug, day four hundred · said no to plans
//   · still saving (coin stack) · bought the nice cookie · kept the old hoodie · steady finds steady (a match)
//   · feel behind? right on time.   group "Slow and steady. | *Still winning.*" (a little trophy)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'taurus', ST = { x: -180 }

// a clay pot with a sprout that grows one proud leaf
function sprout(x, t, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = lerp(20, 190, ease.outCubic(clamp(g)))
  x.fillStyle = INK; x.fillRect(-10, -h - 4, 20, h + 8)
  x.fillStyle = '#5fd068'; x.fillRect(-6, -h, 12, h)
  if (g > 0.6) {
    const lk = pop01(g, 0.6, 0.3, 2.4)
    x.save(); x.translate(6, -h + 40); x.rotate(-0.5); x.scale(lk, lk)
    x.fillStyle = INK; x.beginPath(); x.ellipse(44, 0, 56, 28, 0, 0, 7); x.fill()
    x.fillStyle = '#8fdc6a'; x.beginPath(); x.ellipse(44, 0, 50, 22, 0, 0, 7); x.fill(); x.restore()
  }
  x.fillStyle = INK; x.fillRect(-96, -6, 192, 30); x.fillRect(-80, 20, 160, 110)
  x.fillStyle = '#d9774a'; x.fillRect(-90, 0, 180, 20); x.fillStyle = '#c0603a'; x.fillRect(-74, 24, 148, 100)
  x.restore()
}
// a battery that fills while you rest
function battery(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillRect(130, -30, 26, 60)
  x.fillStyle = BONE; x.fillRect(-120, -60, 240, 120); x.fillRect(130, -22, 16, 44)
  x.fillStyle = NIGHT; x.fillRect(-108, -48, 216, 96)
  x.fillStyle = f > 0.6 ? MINT : GOLD; x.fillRect(-100, -40, 200 * clamp(f), 80)
  x.restore()
}
// a stack of gold coins that grows
function coins(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) { const y = -i * 30, dx = Math.sin(i * 2.1) * 6; x.fillStyle = INK; x.fillRect(-84 + dx, y - 18, 168, 36); x.fillStyle = GOLD; x.fillRect(-78 + dx, y - 14, 156, 22); x.fillStyle = '#c98f2a'; x.fillRect(-78 + dx, y + 6, 156, 6) }
  x.restore()
}
// a well-loved hoodie (with a patch)
const HOODIE = ['...HHHH...', '..HHHHHH..', 'HHHH..HHHH', 'HHHHHHHHHH', 'HHHHHHHHHH', '.HHHPPHHH.', '.HHHPPHHH.', '.HHHHHHHH.', '.HHHHHHHH.']

const CAMEOS = [
  { sign: S, cap: 'Slow progress? | *Still progress.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sprout(x, t, 800, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.4, 1.4))
      L(x, 800, 640, 'NEW LEAF: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 38)
      sparkles(x, t, 820, 820, P.t0 + 1.4, 6, 150, 0.3)
    } },
  { sign: S, cap: 'Stayed in again? | *Rest counts too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      battery(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.15, 1, ease.inOutCubic(prog(lt, 0.4, 1.8))))
      bits(x, 'BLANKET', 800, 1010, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 640, lt > 1.8 ? 'RECHARGED' : 'RECHARGING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.8 ? MINT : GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Same routine? | *That’s your strength.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 780, 760, { n: 3, h: 130 })
      L(x, 800, 1080, 'SAME MUG. DAY 400.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Said no to plans? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TONIGHT?', headCol: GOLD, lines: [['out at 11?', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['next time ♡', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true], ['ok! rest up', PINK, pop01(t, P.t0 + 1.8, 0.2, 2), false]], typing: lt > 0.8 && lt < 1.3 ? 1 : 0, size: 28 })
    } },
  { sign: S, cap: 'Still saving? | *Future you says thanks.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      coins(x, 800, 1040, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 9))
      bubble(x, 800, 640, 'thanks, past me', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Bought the nice cookie? | *You earned it.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 870, 34 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1090, 'RECEIPT: DESERVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      sparkles(x, t, 800, 870, P.t0 + 1.0, 7, 190, 0.6)
    } },
  { sign: S, cap: 'Still own that old hoodie? | *Loyal is lovely.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: '#9aa5c4', P: PINK }, 800, 870, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 640, 'HOODIE AGE: ANCIENT', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 800, 1100, 'STILL THE BEST ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Want someone steady? | *Steady finds steady.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♉ taurus', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['loves: naps', MINT, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['also naps', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 28 })
      hearts(x, t, 810, 780, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Feel behind? | *You’re right on time.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'TAURUS TIME ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
      sparkles(x, t, 800, 860, P.t0 + 1.35, 7, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0656', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Doing better than | you think, *Taurus.*',
  cameos: CAMEOS,
  group: {
    cap: 'Slow and steady. | *Still winning.*', mood: 'heart',
    draw(x, t, lt) { bits(x, 'TROPHY', 790, 1140, 14 * pop01(t, t - lt + 1.2, 0.35, 2.2), { rot: 0.08 }); sparkles(x, t, 790, 1140, t - lt + 1.3, 7, 130, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
