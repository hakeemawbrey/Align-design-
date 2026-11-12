// r2t0661: star_talk, BELIKE, "Found cash? | Zodiacs *be like.*" (topic: zodiacs finding money in a pocket) (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself the second it finds cash in old pants.
//   ♈ spent it mid-pull · ♉ ordered a feast · ♊ told every match · ♋ framed the dollar · ♌ acted rich all day
//   · ♍ made a budget · ♎ still deciding (day 6) · ♏ suspects a trap · ♐ planned a world trip on ten bucks
//   · ♑ invested it by noon · ♒ opened a coin museum · ♓ cried: the universe sent it
//   group "Small cash. | *Big feelings.*"  lesson "Tiny wins count. | *Celebrate them.*"  last "Check your pockets. | *Just in case.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#3fae6a', DGREEN = '#2a7a48', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
// a pixel banknote: green card, darker inner border, a big $ and the amount
function bill(x, cx, cy, k, rot = 0, amt = '10', s = 1) {
  box(x, cx, cy, 230 * s, 112 * s, k, rot, () => {
    x.fillStyle = DGREEN; x.fillRect(-103 * s, -44 * s, 206 * s, 88 * s)
    x.fillStyle = '#9be3b0'; x.fillRect(-95 * s, -36 * s, 190 * s, 72 * s)
    x.fillStyle = DGREEN; x.beginPath(); x.ellipse(0, 0, 30 * s, 30 * s, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#9be3b0'; x.font = `800 ${40 * s}px ${INTER}`; x.fillText('$', 0, 2 * s)
    x.fillStyle = DGREEN; x.font = `700 ${24 * s}px ${MONO}`; x.fillText(amt, -66 * s, -14 * s); x.fillText(amt, 66 * s, 16 * s)
  }, GREEN)
}
function coin(x, cx, cy, k, r = 46) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e0a93a'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-3, -3, r - 9, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b5801f'; x.font = `800 ${r}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('¢', 0, 3)
  x.restore()
}
const CAKE = ['....F....', '....W....', '.PPPPPPP.', 'PPWPPWPPP', 'CCCCCCCCC', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC', 'BBBBBBBBBBB'.slice(0, 9)]
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK, C: '#f2d29a', B: '#c9c9d8' }
const CASE = ['...KKKK...', '...K..K...', 'OOOOOOOOOO', 'OyOOOOOOyO', 'OOOOOOOOOO', 'OOOOOOOOOO', 'OyOOOOOOyO', 'OOOOOOOOOO', '.K......K.']
const CASE_C = { O: ORANGE, y: GOLD, K: '#2a2350' }
const PEDESTAL = ['.MMMMMMMM.', '..MMMMMM..', '..MMMMMM..', '..MMMMMM..', '..MMMMMM..', '.MMMMMMMM.', 'MMMMMMMMMM']
const PED_C = { M: '#d8dbe8' }

const CAMEOS = [
  { sign: 'aries', cap: 'Found twenty bucks. | Spent it *mid-pull.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.7, 1.2))
      if (fly < 1) bill(x, lerp(700, 1000, fly), lerp(880, 560, fly), pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - fly), -0.2 - fly * 1.5, '20')
      L(x, 790, 700, 'SOLD: NEW SNEAKERS', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, 0.05, 30)
      L(x, 790, 1090, 'HAND STILL IN POCKET', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.04, 26)
    } },
  { sign: 'taurus', cap: 'Found ten bucks. | Ordered *a feast.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bill(x, 790, 650, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.8, 1.0))), 0.06, '10', 0.8)
      const n = Math.min(3, Math.floor(clamp((lt - 0.8) / 0.9) * 3) + (lt > 0.8 ? 1 : 0))
      for (let i = 0; i < n; i++) drawBits(x, CAKE, CAKE_C, 680 + i * 110, 930 - (i % 2) * 40, 11 * pop01(t, P.t0 + 0.8 + i * 0.3, 0.3, 2))
      L(x, 790, 1100, 'TABLE FOR ONE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Found five bucks. | Told *every match.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 290, 440, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-126, -190, 252, 380)
        const n = Math.min(4, 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 4))
        for (let i = 0; i < n; i++) {
          x.fillStyle = [PINK, SKYB, MINT, GOLD][i]; x.fillRect(-112, -170 + i * 88, 224, 70)
          x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(['MATCH ♎︎', 'MATCH ♐︎', 'MATCH ♒︎', 'MATCH ♌︎'][i], 0, -152 + i * 88)
          x.font = `800 26px ${INTER}`; x.fillText('GUESS WHAT', 0, -124 + i * 88)
        }
      })
      L(x, 790, 1120, 'TOPIC: $5', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Found one dollar. | *Framed it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      box(x, 790, 850, 320, 220, pop01(t, P.t0 + 0.3, 0.35, 2), -0.04, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-140, -90, 280, 180)
        x.fillStyle = CREAM; x.fillRect(-124, -74, 248, 148)
      }, GOLD)
      bill(x, 790, 850, pop01(t, P.t0 + 0.5, 0.3, 2), -0.04, '1', 0.85)
      L(x, 790, 1100, 'FROM OUR FIRST JEANS', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 26)
      hearts(x, t, 790, 720, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Found one dollar. | Acted *rich all day.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bill(x, 760 + i * 30, 860 - i * 24, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), -0.3 + i * 0.3, '1', 0.75)
      L(x, 790, 660, 'TYCOON MODE', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.05, 38)
      bubble(x, 790, 1080, 'keep the change', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Found five bucks. | Made *a budget.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-130, -160, 260, 330)
        x.fillStyle = '#6b62a8'; x.fillRect(-50, -186, 100, 30)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'
        const rows = ['SAVINGS  $2.00', 'TREATS   $1.00', 'FUTURE   $1.00', 'CHAOS    $0.50', 'BUFFER   $0.50']
        const n = Math.min(5, 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 5))
        rows.slice(0, n).forEach((r, i) => x.fillText(r, -116, -110 + i * 56))
      }, BROWN)
      L(x, 790, 1110, 'BUDGET v7 (FINAL)', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Found ten bucks. | *Still deciding.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bill(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, '10', 0.9)
      const side = Math.floor(lt * 2.5) % 2
      bubble(x, 790, 680, side ? 'a plant?' : 'a candle?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: side ? MINT : PINK, tail: 'bl' })
      const day = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 5)
      L(x, 790, 1090, `DAY ${day}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Found cash. | Suspects *a trap.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const peek = Math.sin(t * 6) * 6
      bill(x, 790 + peek, 900, pop01(t, P.t0 + 0.15, 0.3, 2), 0.02, '20', 0.9)
      bubble(x, 800, 680, 'who planted this?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 1100, 'TOO EASY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: 'sagittarius', cap: 'Found ten bucks. | Planned *a world trip.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 870, 27 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'ROUTE: EVERYWHERE', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.05, 30)
      L(x, 790, 1100, 'BUDGET: $10', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Found five bucks. | Invested it *by noon.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = '#140c30'; x.fillRect(-140, -110, 280, 220)
        const p = clamp((lt - 0.3) / 1.4)
        x.strokeStyle = MINT; x.lineWidth = 8; x.beginPath()
        for (let i = 0; i <= 20 * p; i++) { const px = -120 + i * 12, py = 80 - i * 7 + (i % 3) * 8; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke()
      })
      L(x, 790, 660, 'PORTFOLIO: $5.02', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.05, 30)
      bubble(x, 800, 1090, 'patience.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Found a coin. | Opened *a museum.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PEDESTAL, PED_C, 790, 990, 18 * k)
      coin(x, 790, 860 + Math.sin(t * 3) * 6, pop01(t, P.t0 + 0.5, 0.3, 2.2))
      sparkles(x, t, 790, 860, P.t0 + 0.7, 6, 110, 0.2)
      L(x, 790, 660, 'THE COIN MUSEUM', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.05, 32)
      L(x, 790, 1120, 'ENTRY: FREE', pop01(t, P.t0 + 1.8, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Found ten bucks. | Cried. *A sign.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bill(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), -0.05, '10', 0.9)
      hearts(x, t, 560, 760, P.t0 + 0.6, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 6 })
      L(x, 790, 660, 'THE UNIVERSE CARES', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.05, 28)
      L(x, 790, 1100, 'CHART: CALLED IT', pop01(t, P.t0 + 1.7, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0661', key: 'C', accent: ACC, ending: 'lesson',
  title: 'Found cash? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Small cash. | *Big feelings.*' },
  lesson: { text: 'Tiny wins count. | *Celebrate them.*', chip: 'STATUS: LUCKY' },
  last: {
    text: 'Check your pockets. | *Just in case.*',
    draw(x, t, lt) {
      for (let i = 0; i < 5; i++) {
        const ph = ((lt * 0.35 + i * 0.21) % 1)
        bill(x, 200 + i * 170, 700 + ph * 300, pop01(t, t - lt + 0.4 + i * 0.12, 0.3, 2), Math.sin(t * 2 + i) * 0.4, '1', 0.6)
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
