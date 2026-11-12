// r2a0146: star_advice, ADVICE SOLO, "Leo, you're allowed | to say no." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): Leo's big yes-to-everything heart, gently reframed.
//   0.0–3.6    "Leo, you’re allowed | *to say no.*"
//   3.6–37.8   nine cards (3.8 s each):
//              three parties one night, pick one · running everyone's birthday, let them run yours · "I'm fine!" at
//              midnight, crown off · lending your spotlight, keep some glow · ten favours in the chat, "not today" is kind
//              · week booked solid, cancel one · saying no feels scary, practise in the mirror · hate disappointing people,
//              the right ones understand · said no once, still adored
//  37.8        group ending: "Your no | is still *golden.*"  Leo comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'leo'
const ST = { x: -190 }

const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CAKE = ['...F..F..F...', '...C..C..C...', '.PPPPPPPPPPP.', '.PWPWPWPWPWP.', '.PPPPPPPPPPP.', 'BBBBBBBBBBBBB', 'BWBBWBBWBBWBB', 'BBBBBBBBBBBBB']
const CAKE_C = { F: GOLD, C: SKYB, P: PINK, W: '#fff4e2', B: '#c98f6a' }
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const PARTY = ['..G..', '.GGG.', 'GGGGG', '..B..', '..B..']

/** a week planner: seven day columns, `fill` blocks booked, `x` (0…1) strikes one out */
function week(x, cx, cy, k, booked, strike) {
  card(x, cx, cy, 380, 300, k, { bg: CREAM, rot: 0.04 }, () => {
    x.fillStyle = RED; x.fillRect(-190, -150, 380, 54)
    txt(x, 'THIS WEEK', 0, -122, { size: 28, font: MONO, weight: 700, color: CREAM })
    const COLS = [PINK, MINT, SKYB, GOLD, LAV, ORANGE, PINK]
    for (let d = 0; d < 7; d++) {
      txt(x, 'MTWTFSS'[d], -156 + d * 52, -70, { size: 22, font: MONO, weight: 700 })
      for (let r = 0; r < 4; r++) if (d * 4 + r < booked) { x.fillStyle = COLS[(d + r) % 7]; x.fillRect(-176 + d * 52, -48 + r * 46, 40, 38) }
    }
    if (strike > 0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(52, -50); x.lineTo(52 + 52 * strike, 130 * strike - 50); x.stroke(); x.beginPath(); x.moveTo(104, -50); x.lineTo(104 - 52 * strike, 130 * strike - 50); x.stroke() }
  })
}
/** a gold-framed mirror; fn draws the reflection */
function mirror(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 200, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 142, 192, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b9e6f2'; x.beginPath(); x.ellipse(0, 0, 118, 168, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(0, 0, 118, 168, 0, 0, Math.PI * 2); x.clip(); fn()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-90, -140, 24, 120); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Three parties tonight? | *Pick one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 820, 360, 260, k, { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'SATURDAY', 0, -90, { size: 34, font: MONO, weight: 700 })
        const pick = lt > 1.2
        for (let i = 0; i < 3; i++) {
          const off = pick && i !== 1, y = -30 + i * 60
          txt(x, `8 PM · PARTY ${'ABC'[i]}`, 0, y, { size: 30, font: MONO, weight: 700, color: off ? '#b9b0a0' : INK })
          if (off) { x.fillStyle = RED; x.fillRect(-150, y - 3, 300 * ease.outCubic(prog(lt, 1.2 + i * 0.1, 1.45 + i * 0.1)), 6) }
          if (!off && pick) { x.strokeStyle = GREEN; x.lineWidth = 6; x.strokeRect(-165, y - 26, 330, 52) }
        }
      })
      label(x, 790, 1060, 'ONE IS PLENTY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Running everyone’s birthday? | *Let them run yours.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'PARTY PLANNER: LEO', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'our turn!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: '“I’m fine!” at midnight? | *Rest. Crown off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PILLOW, { L: LAV }, 790, 980, 20 * k)
      const d = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, CROWN, CROWN_C, lerp(F.x, 790, d), lerp(F.top - 30, 930, d) - Math.sin(Math.PI * d) * 120, 14, { rot: lerp(0, 0.2, d) })
      label(x, 790, 700, 'CROWN: RESTING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lending your spotlight again? | *Keep some glow.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    back(x, t, lt, P) {
      const split = ease.inOutCubic(prog(lt, 0.9, 1.4))
      beam(x, 360, 480, 350, 1150, 200 * (1 - 0.45 * split), 1)
      if (split > 0.01) beam(x, 760, 480, 790, 1150, 110 * split, 1)
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 1000, 180 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 12, glyph: false })
      label(x, 790, 700, 'SHARED, NOT GIVEN AWAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten favours in the chat? | *“Not today” is kind.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const L = ['help me move?', 'can u host?', 'plan my date?', 'not today, love']
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: ORANGE, lines: L.map((s, i) => [s, i === 3 ? MINT : BONE, pop01(t, P.t0 + 0.4 + i * (i === 3 ? 0.45 : 0.25), 0.25, 2)]) })
      label(x, 790, 1130, 'SENT WITH LOVE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Week booked solid? | *Cancel one. Breathe.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      week(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 28, ease.outCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 1100, 'FRIDAY: FREE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saying no feels scary? | *Practise in the mirror.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mirror(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => signChar(x, t, S, 0, 20, 170, { mood: lt > 1.2 ? 'wink' : 'squint', look: [-1, 0], seed: 61, glyph: false, glow: 0.4 }))
      bubble(x, 800, 610, 'no… NO! nailed it.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 7, 190, 0.5)
    } },
  { sign: S, cap: 'Hate letting people down? | The right ones *understand.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 980, 200 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 420, 620, 'can’t make it…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      bubble(x, 800, 720, 'no worries! next time', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: MINT, tail: 'bc' })
      if (lt > 1.2) hearts(x, t, 800, 900, P.t0 + 1.2 * 1.29, { n: 5, life: 1.7, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Said no once. | *Still adored.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      label(x, 790, 760, 'STILL A MATCH', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 950, 'STILL ROYAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0146', key: 'D', accent: ORANGE, solo: S, ending: 'group',
  title: 'Leo, you’re allowed | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Your no | is still *golden.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
