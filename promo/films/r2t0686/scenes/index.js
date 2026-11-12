// r2t0686: star_talk, ROLLCALL, "The signs as | *the oldest child.*" (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme oldest sibling:
//   ♈ challenged the newborn to a race · ♉ shared the room, never the snacks · ♊ blamed the dog (no dog)
//   · ♋ still packs the sibling's lunch, age 34 · ♌ blew out the sibling's birthday candles · ♍ performance review for mum and dad
//   · ♎ runs sibling court · ♏ knows who broke the vase, saving it · ♐ moved out at 18, postcard from a glacier
//   · ♑ third parent since age six · ♒ bedtime story: the baby's birth chart · ♓ cries at baby photos (the baby is 30).
// Ending: callback. group "Oldest child energy. | *All twelve.*", then "Who broke the vase? | *Scorpio did.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }

const VASE = ['...BBBB...', '...BWWB...', '....BB....', '..BBBBBB..', '.BBPBBPBB.', 'BBBBBBBBBB', 'BBPBBBBPBB', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..']
const vase = (x, cx, cy, cell, crack, o) => {
  drawBits(x, VASE, { B: '#6fc3ff', W: '#bfe6ff', P: CREAM }, cx, cy, cell, o)
  if (crack > 0.01) {
    x.save(); x.strokeStyle = INK; x.lineWidth = cell * 0.7; x.lineCap = 'square'; x.beginPath()
    const pts = [[-1, -2], [0.5, -0.5], [-0.8, 1], [0.6, 2.4], [-0.2, 3.6]]
    const n = Math.max(2, Math.ceil(pts.length * crack))
    pts.slice(0, n).forEach(([a, b], i) => i ? x.lineTo(cx + a * cell, cy + b * cell) : x.moveTo(cx + a * cell, cy + b * cell))
    x.stroke(); x.restore()
  }
}
const CAKE = ['..Y..Y..Y..', '..O..O..O..', '..W..W..W..', '..W..W..W..', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'PPPPPPPPPPP', 'CCCCCCCCCCC', 'KKKKKKKKKKK']
const cake = (x, cx, cy, cell, lit) => drawBits(x, lit ? CAKE : CAKE.map((r, j) => j < 2 ? r.replace(/[YO]/g, '.') : r), { Y: GOLD, O: '#ff8a3a', W: CREAM, P: PINK, C: '#fff4e2', K: STEEL }, cx, cy, cell)

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the newborn | to *a race.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 960, 130, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'sleepy' })
      L(x, 800, 860, 'BABY', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, 0.04, 26)
      bubble(x, 760, 650, 'ready… set…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1120, 'ARIES: 1 · BABY: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Shared a room. | Never *the snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BOX', 800, 900, 26 * k)
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 730 + i * 70, 800 - (i % 2) * 18, 9 * pop01(t, P.t0 + 0.5 + i * 0.12, 0.3, 2))
      L(x, 800, 1090, 'PROPERTY OF TAURUS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Blamed the dog. | *There is no dog.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: lt => [lt > 1.4 ? -1 : 1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it was the dog!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 960, 'DOGS OWNED: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.05, 44)
    } },
  { sign: 'cancer', cap: 'Still packs their sibling’s lunch. | *Sibling is 34.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RWRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRWR', 'RRRRRRRRRR'], { K: INK, R: '#c98f5a', W: '#e8b36a' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'eat ur veggies ♡', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      L(x, 800, 1080, 'NOTE #9,000', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
      hearts(x, t, 800, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Sibling’s birthday? | *Leo* blew out the candles.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      cake(x, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.2)
      if (lt > 1.2 && lt < 1.7) { x.save(); x.globalAlpha = 1 - (lt - 1.2) / 0.5; x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(740 + i * 60, 780 - (lt - 1.2) * 120, 12, 12); x.restore() }
      L(x, 800, 680, 'HAPPY BDAY, KIDDO', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, 0.04, 30)
      L(x, 800, 1100, 'WISH: ALSO LEO’S', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Gave mum and dad | a *performance review.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 330, head: 'PARENTING Q3', headBg: MINT, headInk: INK, lines: ['bedtimes: B−', 'snacks: C+', ['love: A+', '#c2185b']], size: 34, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1110, 'SEE ME AFTER', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Runs sibling court. | *Case 48: the remote.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'REMOTE', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      L(x, 800, 660, 'ORDER! ORDER!', pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 0.04, 38)
      L(x, 800, 1090, 'RULING: TAKE TURNS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knows who broke the vase. | *Saving it.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vase(x, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.5) / 0.4))
      L(x, 800, 1090, 'LEVERAGE: STORED', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Moved out at 18. | Postcard from *a glacier.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      sheet(x, 330, 840, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 330, h: 230, head: 'WISH U WERE HERE', headBg: SKYB, headInk: INK, lines: ['it’s cold!', 'back in 2031?'], size: 32, rot: 0.06 })
      L(x, 330, 1060, 'NEXT STOP: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Third parent | *since age six.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      sheet(x, 330, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: 'CHORE CHART', headBg: STEEL, headInk: INK, lines: ['dishes ✓', 'homework ✓', 'taxes ✓'], size: 34, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 330, 1100, 'AGE: 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'aquarius', cap: 'Bedtime story? | *The baby’s birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 850, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      bubble(x, 800, 640, 'mars is in…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1090, 'BABY: ASLEEP', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cries at baby photos. | *The baby is 30.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 810, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 260, h: 240, head: 'BABY PICS', headBg: PINK, headInk: INK, lines: ['look how', 'tiny ♡'], size: 32, rot: 0.06 })
      bits(x, 'TISSUE', 700, 1030, 13 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 860, 1080, 'THE BABY: 30', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0686', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs as | *the oldest child.*',
  cameos: CAMEOS,
  group: { cap: 'Oldest child energy. | *All twelve.*' },
  last: {
    text: 'Who broke the vase? | *Scorpio did.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 430, 1150, 300 * k, { mood: lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], seed: 7, hops: [t0 + 1.6] })
      vase(x, 720, 1140, 18 * pop01(t, t0 + 0.5, 0.35, 2), 1)
      L(x, 600, 1380, 'CASE CLOSED', pop01(t, t0 + 1.6, 0.3, 2.4), RED, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
