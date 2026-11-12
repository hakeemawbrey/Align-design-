// r2a0754: star_advice, ADVICE SOLO, "Sagittarius, commitment | *isn't a cage.*" (~51 s vertical, signs3kit social cut,
// music: lofi · E). One sign the whole way, 9 cards: a relatable Sagittarius worry about commitment + a warm reframe.
//   signed a 12-month lease (the windows still open) · Saturday plans booked (bring the surprise) · got a plant (it just
//   wants water) · someone said "forever" (breathe, it's a hug) · a favourite café (regulars get extra) · same person,
//   new adventures (bring them along) · matching keys (a door, not a lock) · stuck with a hobby (that's growth)
//   · roots let you reach further
//  37.8  "Free spirit. | *Big heart.*"   41.0  LESSON "Love that stays | *can still explore.*" FREEDOM: INTACT
//  46.9  "Commit to them. | *Then road trip.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, fitTitleScenes, sheet, bits, swapLabel, SPROUT, SPROUT_C, POT, POT_C, FLOWER, FLOWER_C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'sagittarius', ACC = '#ff9a4a', ST = { x: -170 }

// a window with the sky outside, shutters swing open
function windowFrame(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -140, 256, 296)
  x.fillStyle = INK; x.fillRect(-136, -156, 272, 312)
  x.fillStyle = '#8fd0ff'; x.fillRect(-120, -140, 240, 280)
  x.fillStyle = '#ffffff'; x.fillRect(-80 + Math.sin(t * 0.6) * 10, -90, 70, 22); x.fillRect(-64 + Math.sin(t * 0.6) * 10, -106, 40, 18)
  x.fillStyle = GOLD; x.beginPath(); x.arc(60, -70, 26, 0, 7); x.fill()
  x.fillStyle = '#5fd068'; x.fillRect(-120, 80, 240, 60)
  const w = 120 * (1 - 0.8 * open)
  x.fillStyle = '#c98f5a'; x.fillRect(-120, -140, w, 280); x.fillRect(120 - w, -140, w, 280)
  x.fillStyle = INK; x.fillRect(-6, -140, 12, 280 * (1 - open))
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Signed a 12-month lease? | *Windows still open.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      windowFrame(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.8, 1.3)))
      L(x, 800, 650, 'LEASE: 12 MONTHS', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1090, 'FRESH AIR: INCLUDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Saturday’s booked? | *Bring the surprise.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'SATURDAY', headBg: ACC, headInk: INK, lines: ['10am brunch', '2pm market', lt > 1.2 ? ['4pm ??? ✦', '#c0306a'] : '4pm free'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 0.8) })
      sparkles(x, t, 860, 930, P.t0 + 1.3, 6, 120, 0.4)
      L(x, 800, 1100, 'SPONTANEITY: BOOKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Got a plant? | *It just wants water.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, POT_C, 800, 1020, 18 * k)
      drawBits(x, SPROUT, SPROUT_C, 800, 920, 18 * k)
      bubble(x, 800, 700, 'no pressure :)', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: '#d6ffd6', tail: 'bc' })
    } },
  { sign: S, cap: 'They said “forever”? | *Breathe. It’s a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 950, 200 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 800, 690, 'forever? ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: '#bfe6ff', tail: 'br' })
      hearts(x, t, 640, 830, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A favourite café? | *Regulars get extra.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 780, 880, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'COOKIE', 900, 980, 12 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 800, 660, '“the usual, Sag?”', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1110, 'REGULAR PERKS ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Same person? | *New adventures.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 760, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 1010, 170 * k, { mood: 'sparkle', seed: 23, glyph: false, hops: [P.t0 + 1.3] })
      L(x, 920, 1130, 'PARTY OF 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Matching keys? | *A door, not a lock.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KEY', 790, 800, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.2 })
      bits(x, 'KEY', 810, 940, 24 * pop01(t, P.t0 + 0.6, 0.35, 2), { rot: 0.2 })
      L(x, 800, 1100, 'COME + GO ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Stuck with a hobby? | *That’s growth.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.1) * 99)
      L(x, 800, 680, `DAY ${n} ✦`, pop01(t, P.t0 + 0.2, 0.3, 2), ACC, 0.05, 44)
      bits(x, 'TROPHY', 800, 930, 16 * pop01(t, P.t0 + 1.3, 0.35, 2.2))
      sparkles(x, t, 800, 930, P.t0 + 1.4, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Roots let you | *reach further.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), g = ease.outCubic(prog(lt, 0.4, 1.3))
      drawBits(x, POT, POT_C, 800, 1060, 18 * k)
      drawBits(x, FLOWER, FLOWER_C, 800, 1060 - 60 - 110 * g, 12 + 12 * g)
      L(x, 800, 650, 'ROOTS + WINGS', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0754', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sagittarius, commitment | *isn’t a cage.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Love that stays | *can still explore.*', chip: 'FREEDOM: INTACT' },
  last: {
    text: 'Commit to them. | *Then road trip.*',
    draw(x, t, lt) {
      bits(x, 'MAP', 800, 1110, 16 * pop01(t, t - lt + 0.8, 0.35, 2), { rot: 0.06 })
      hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
