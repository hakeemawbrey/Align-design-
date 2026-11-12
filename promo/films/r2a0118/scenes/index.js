// r2a0118: ADVICE SOLO, "Taurus, celebrate | the small wins." (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, celebrate | *the small wins.*"
//   3.6–37.8   made the bed (that's a win) · watered the plant (it said thx) · drank some water (gold star sticker)
//              · cooked at home (chef Taurus) · said no to plans (peace: protected) · finished the book (the end ✓)
//              · saved a little (the piggy bank is proud) · answered one email (hero) · took a slow walk (flowers noticed)
//  37.8        "Small wins | *still count.*"
//  41.2        CALLBACK: "The plant? | *Blooming now.*"  Taurus and the plant, now with a big flower.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', DGREEN = '#3fa85a', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const S = 'taurus'

const BED = ['P..........P', 'PPPPPPPPPPPP', 'PWWWBBBBBBBP', 'PWWWBBBBBBBP', 'PPPPPPPPPPPP', 'K..........K']
const GLASS = ['K......K', 'KSSSSSSK', 'KSWSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', '.KKKKKK.']
const STAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YY...YY.']
const POT = ['....S.S....', '.....S.....', 'KKKKKKKKKKK', 'KPPPPPPPPPK', 'KPPPPPPPPPK', '.KPPPPPPPK.', '..KKKKKKK..']
const BOOK = ['KKKKKKKKKKKK', 'KRRRRRRRRRRK', 'KRWWWWWWWWRK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK']
const PIG = ['.....PP.....', '..PPPPPPPP..', '.PPPPPPPPPP.', 'PPPKPPPPPPPP', 'PPPPPPPPPPNN', 'PPPPPPPPPPNN', '.PPPPPPPPPP.', '..PP....PP..']
const COIN = ['.YYYY.', 'YYWYYY', 'YYYYYY', '.YYYY.']
const MAIL = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KKWWWWWWWWKK', 'KWKKWWWWKKWK', 'KWWWKKKKWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const COUCH = ['.LLLLLLLLLLL.', 'LLLLLLLLLLLLL', 'LLWWWWWWWWWLL', 'LLWWWWWWWWWLL', 'LLLLLLLLLLLLL', 'K...........K']

// a potted plant that grows (and, in the callback, blooms)
function plant(x, t, cx, cy, k, grow, bloom = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = lerp(50, 170, grow)
  x.fillStyle = INK; x.fillRect(-12, -h - 4, 24, h + 8)
  x.fillStyle = DGREEN; x.fillRect(-7, -h, 14, h)
  const leaf = (lx, ly, d) => { x.fillStyle = INK; x.beginPath(); x.ellipse(lx, ly, 46, 24, d * 0.5, 0, Math.PI * 2); x.fill(); x.fillStyle = GREEN; x.beginPath(); x.ellipse(lx, ly, 40, 18, d * 0.5, 0, Math.PI * 2); x.fill() }
  leaf(-40, -h * 0.4, 1); leaf(40, -h * 0.65, -1); if (grow > 0.6) leaf(-36, -h * 0.85, 1)
  if (bloom > 0.01) {
    x.save(); x.translate(0, -h - 10); x.scale(bloom, bloom); x.rotate(t * 0.6)
    for (let i = 0; i < 6; i++) { x.rotate(Math.PI / 3); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -36, 24, 36, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = PINK; x.beginPath(); x.ellipse(0, -36, 18, 30, 0, 0, Math.PI * 2); x.fill() }
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  x.fillStyle = INK; x.fillRect(-74, -6, 148, 96); x.fillStyle = '#c96a3a'; x.fillRect(-66, 0, 132, 84); x.fillStyle = '#e8875a'; x.fillRect(-74, -6, 148, 22)
  x.restore()
}
function flowers(x, t, cx, cy, k, n) {
  for (let i = 0; i < n; i++) {
    const fx = cx + (i - (n - 1) / 2) * 120
    x.save(); x.translate(fx, cy); x.scale(k * 1.6, k * 1.6)
    x.fillStyle = DGREEN; x.fillRect(-4, 0, 8, 80)
    const c = [PINK, GOLD, LAV, SKYB][i % 4]
    for (let j = 0; j < 5; j++) { const a = j / 5 * Math.PI * 2 + t * 0.5; x.fillStyle = c; x.beginPath(); x.arc(Math.cos(a) * 18, Math.sin(a) * 18, 14, 0, Math.PI * 2); x.fill() }
    x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 11, 0, Math.PI * 2); x.fill()
    x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Made your bed? | *That’s a win.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, { P: BROWN, W: '#fff4e2', B: GREEN, K: INK }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'BED: MADE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.1, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Watered the plant? | *It noticed.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plant(x, t, 790, 1010, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.5, 1.5)))
      bubble(x, 860, 680, 'thx!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, col: GREEN, tail: 'bl' })
    } },
  { sign: S, cap: 'Drank some water? | *Gold star.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK, S: SKYB, W: '#fff' }, 760, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, STAR, { Y: GOLD }, 860, 780, 18 * pop01(t, P.t0 + 1.1, 0.3, 2.6), { rot: 0.2 })
      sparkles(x, t, 860, 780, P.t0 + 1.2, 6, 110, 0.4)
    } },
  { sign: S, cap: 'Cooked at home? | *Chef’s kiss.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, P: '#9aa5c4', S: BONE }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 740, 'CHEF TAURUS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Said no to plans? | *Peace protected.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, { L: LAV, W: '#fff4e2', K: INK }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'PEACE: PROTECTED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finished the book? | *Ten points.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, R: RED, W: GOLD }, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(1, 0.6, ease.inOutCubic(prog(lt, 0.8, 1.1))) })
      label(x, 790, 1100, 'THE END ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saved a little? | *Piggy’s proud.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PIG, { P: PINK, K: INK, N: '#ff4f86' }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.inQuad(prog(lt, 0.7, 1.1))
      if (lt > 0.6 && d < 1) drawBits(x, COIN, { Y: GOLD, W: '#fff' }, 790, lerp(680, 900, d), 16)
      bubble(x, 850, 760, 'oink!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Answered one email? | *Hero behavior.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.8, 1.3))
      drawBits(x, MAIL, { K: INK, W: '#fff4e2' }, lerp(790, 1000, fly), lerp(900, 700, fly), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - fly })
      label(x, 790, 900, 'SENT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 60, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Took a slow walk? | *Flowers noticed.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      flowers(x, t, 790, 950, pop01(t, P.t0 + 0.4, 0.35, 2), 3)
      bubble(x, 790, 760, 'hi Taurus!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0118', key: 'C', accent: GREEN, solo: 'taurus', ending: 'callback',
  title: 'Taurus, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins | *still count.*', mood: 'sparkle' },
  last: {
    text: 'The plant? | *Blooming now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1060, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      plant(x, t, 720, 1130, 1.5 * pop01(t, t - lt + 0.6, 0.35, 2), 1, pop01(t, t - lt + 1.1, 0.45, 2))
      sparkles(x, t, 700, 900, t - lt + 1.2, 7, 160, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
