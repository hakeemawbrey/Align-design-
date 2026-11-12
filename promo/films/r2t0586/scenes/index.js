// r2t0586: star_talk, BELIKE, "Zodiacs when summer ends | *be like.*" (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself the day summer ends. Ending: callback.
//   ♈ pool closed, cannonballs anyway · ♉ bought the whole ice cream truck · ♊ already loading a fall personality
//   · ♋ a scrapbook of every beach day · ♌ tan fading, called a press conference · ♍ sweaters out by 12:01
//   · ♎ summer or fall outfit? wore both · ♏ waited for dark evenings since June · ♐ booked another summer
//   · ♑ never had a summer (was working) · ♒ "it's July 94th." · ♓ wrote summer a goodbye letter
//   group "Summer: over. | *Feelings: not.*"   callback: "Taurus is still | *eating summer.*" (the cones come back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -160 }
const CONE = ['..PPPP..', '.PPWPPP.', 'PPPPPPPP', 'PPPPPPPP', 'CCCCCCCC', '.CKCCKC.', '.CCCCCC.', '..CKCC..', '..CCCC..', '...CC...', '...CC...']
const CONE_C = { P: PINK, W: '#ffffff', C: '#e8b36a', K: '#b5803a' }
const CONE2_C = { P: MINT, W: '#ffffff', C: '#e8b36a', K: '#b5803a' }
const CONE3_C = { P: '#ffe7a8', W: '#ffffff', C: '#e8b36a', K: '#b5803a' }
const SWEATER = ['..RR...RR..', '.RRRRRRRRR.', 'RRRRRRRRRRR', 'RRYRYRYRYRR', 'RR.RRRRR.RR', 'RR.RRRRR.RR', 'YY.RRRRR.YY', '...YYYYY...']
const SUNB = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const SCARF = ['RRRRRRRRRRRR', 'RWRWRWRWRWRR', 'RRRRRRRRRRRR', '.RRR....RRR.', '.RRR....RRR.', '.RWR....RWR.', '.RRR....RRR.', '.WWW....WWW.']
const SHORTS = ['BBBBBBBBB', 'BBBBBBBBB', 'BBBB.BBBB', 'BBB...BBB', 'BBB...BBB']
const cone = (x, cx, cy, cell, cols = CONE_C, o) => drawBits(x, CONE, cols, cx, cy, cell, o)

/** a blue pool rectangle with a splash bursting up at lt ≥ at */
function pool(x, t, cx, cy, k, lt, at) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -46, 352, 112)
  x.fillStyle = '#6fc3ff'; x.fillRect(-168, -38, 336, 96)
  x.fillStyle = '#bfe6ff'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 66 + 12 * Math.sin(t * 2 + i), -14 + (i % 2) * 30, 34, 6)
  const s = prog(lt, at, at + 0.7)
  if (s > 0 && s < 1) {
    x.globalAlpha = 1 - ease.inQuad(s)
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i / 9 - 0.5) * 2.0; x.fillStyle = i % 2 ? '#ffffff' : '#bfe6ff'; x.fillRect(Math.cos(a) * 200 * s - 9, -40 + Math.sin(a) * 220 * s + 160 * s * s - 9, 18, 18) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pool’s closed. | Aries *cannonballs anyway.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.9, 1.1],
    front(x, t, lt, P) {
      L(x, 800, 650, 'POOL CLOSED', pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.05, 38)
      pool(x, t, 800, 960, pop01(t, P.t0 + 0.3, 0.3, 2), lt, 1.1)
      L(x, 800, 1130, 'SPLASH: MANDATORY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Last ice cream truck. | Taurus *bought all of it.*', mood: lt => lt < 1.1 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [CONE_C, CONE2_C, CONE3_C]
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.25 + i * 0.16, 0.3, 2); cone(x, 680 + (i % 3) * 120 + (i > 2 ? 60 : 0), i > 2 ? 980 : 830, 14 * k, cols[i % 3], { rot: (i - 2) * 0.08 }) }
      L(x, 800, 1130, 'TRUCK: SOLD OUT', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Already loading | *a fall personality.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const p = clamp(prog(lt, 0.4, 1.6))
      x.save(); x.translate(800, 860); const k = pop01(t, P.t0 + 0.2, 0.3, 2); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = NIGHT; x.fillRect(-162, -32, 324, 64)
      x.fillStyle = '#ff9a4a'; x.fillRect(-156, -26, 312 * p, 52)
      x.restore()
      L(x, 800, 720, 'NEW ERA: LOADING', k, LAV, -0.04, 32)
      if (lt > 1.6) bubble(x, 800, 1040, 'cozy me | is here.', pop01(t, P.t0 + 1.6 * 1.29, 0.25, 2.2), { size: 40, col: '#ffb34a', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook | of *every beach day.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 330, h: 320, head: 'SUMMER VOL. 7', headBg: SKYB, headInk: INK, lines: [], rot: 0.04 })
      for (let i = 0; i < 4; i++) { const kk = pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2); x.save(); x.translate(720 + (i % 2) * 160, 880 + Math.floor(i / 2) * 110); x.rotate((i - 1.5) * 0.08); x.scale(kk, kk); x.fillStyle = INK; x.fillRect(-60, -44, 120, 88); x.fillStyle = '#ffffff'; x.fillRect(-54, -38, 108, 76); x.fillStyle = i % 2 ? '#6fc3ff' : '#ffe7a8'; x.fillRect(-46, -30, 92, 50); x.restore() }
      L(x, 800, 1120, 'DAY 63 OF 63', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Tan fading. | Leo *called a press conference.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 820, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 780, 640, 'no questions.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      L(x, 800, 1090, 'BREAKING: TAN UPDATE', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Summer ended at midnight. | *Sweaters out by 12:01.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 680, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, SWEATER, { R: [RED, '#ff9a4a', '#8a4a2e'][i], Y: GOLD }, 680 + i * 120, 920, 10 * pop01(t, P.t0 + 0.7 + i * 0.2, 0.3, 2))
      L(x, 800, 1150, 'FOLDED. LABELLED.', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Summer or fall outfit? | Libra *wore both.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SHORTS, { B: '#6fc3ff' }, 810, 980, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, SCARF, { R: '#ff9a4a', W: CREAM }, 810, 760, 18 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.08 })
      L(x, 800, 1130, 'SHORTS + SCARF', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Been waiting for | *dark evenings since June.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 810, 780, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 1020, 'finally.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 60, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Summer’s over? | Sag *booked another one.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.4, 1.6))
      bits(x, 'PLANE', lerp(680, 900, f), lerp(900, 680, f), 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.6 })
      L(x, 800, 1100, 'SUMMER 2: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'What summer? | *Capricorn was working.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 810, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'OUT OF OFFICE: NEVER', pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Refuses to accept | *the calendar.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 280, h: 280, head: 'TODAY', headBg: RED, lines: ['JULY', '94th'], size: 64, rot: 0.04 })
      bubble(x, 800, 1080, 'still summer.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Pisces wrote summer | *a goodbye letter.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', look: [1, 1], tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, lines: ['dear summer,', 'you were', 'everything.'], size: 36, rot: -0.04, progress: clamp(lt / 1.2) })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
      L(x, 800, 1110, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0586', key: 'C', accent: ACC, ending: 'callback',
  title: 'Summer ends. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Summer: over. | *Feelings: not.*' },
  last: {
    text: 'Taurus is still | *eating summer.*',
    draw(x, t, lt) {
      const cols = [CONE_C, CONE2_C, CONE3_C]
      for (let i = 0; i < 5; i++) cone(x, 300 + i * 120, 1080 + (i % 2) * 40, 16 * pop01(lt, 0.4 + i * 0.12, 0.3, 2), cols[i % 3], { rot: (i - 2) * 0.1 })
      hearts(x, t, 540, 960, t - lt + 1.0, { n: 6, life: 2.0, spread: 600, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
