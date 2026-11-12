// r2a0206: star_advice, ADVICE SOLO, "Virgo, leave the dishes | for tonight." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the tidiest sign, gently given the night off.
//   0.0–3.6    "Virgo, leave the | dishes *for tonight.*"
//   3.6–37.8   nine cards (3.8 s each): dishes can wait till morning (a blanket tucks them in) · wiping a clean counter
//              · socks don't match, your feet don't mind · one brown leaf, the plant is thriving · unmade bed is a nest
//              · aisle-ordered grocery list, add a treat · guests left crumbs, proof of fun · tracking everything, log a
//              nap · bedtime at ten sharp, one more chapter
//  37.8        "Tidy heart. | *Tired hands.*"  Virgo comes back, big.
//  41.0        LESSON UNLOCKED: "You hold it all together. | *Rest is allowed.*"  STATUS: OFF DUTY
//  46.9        "The dishes? | *Still fine.*"  the plate stack returns, tucked in under its blanket.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'virgo', ACC = MINT
const ST = { x: -190 }

/** a stack of n plates (bottom at cy), optional blanket tucked over them (0…1) */
function plates(x, cx, cy, n, k, blanket = 0, wob = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    const ox = Math.sin(i * 1.7 + wob) * 10 * (i / n)
    x.fillStyle = INK; x.fillRect(-96 + ox, -i * 30 - 26, 192, 28)
    x.fillStyle = i % 2 ? '#fff4e2' : '#e6eef8'; x.fillRect(-90 + ox, -i * 30 - 22, 180, 20)
    x.fillStyle = '#9aa5c4'; x.fillRect(-60 + ox, -i * 30 - 16, 120, 6)
  }
  if (blanket > 0.01) {
    const h = n * 18 + 20, top = -n * 30 - 30, y0 = top + (1 - blanket) * -200
    x.globalAlpha = clamp(blanket * 2)
    x.fillStyle = INK; x.fillRect(-76, y0 - 6, 152, h + 12)
    x.fillStyle = LAV; x.fillRect(-70, y0, 140, h)
    x.fillStyle = '#b48cf0'; for (let j = 0; j < h; j += 30) x.fillRect(-70, y0 + j, 140, 10)
    x.fillStyle = INK; x.fillRect(-56, top - 34, 112, 40); x.fillStyle = '#fff4e2'; x.fillRect(-50, top - 28, 100, 28)
  }
  x.restore()
}
const SOCK_A = ['.PPPP.', '.PPPP.', '.PWPP.', '.PPPP.', '.PPPP.', '.PPPPPPP', 'PPPPPPPP', 'PPPPPPP.']
const SOCK_B = ['.GGGG.', '.YYYY.', '.GGGG.', '.YYYY.', '.GGGG.', '.YYYYYYY', 'GGGGGGGG', 'YYYYYYY.']
const PLANT = ['...L....L...', '..LLL..LLL..', '..LLLLLLLL..', '...LLLLLB...', '....LLLBB...', '.....LL.....', '.....SS.....', '..PPPPPPPP..', '..PPPPPPPP..', '...PPPPPP...', '...PPPPPP...']
const PLANT_C = { L: GREEN, B: '#b9773a', S: '#3f8f45', P: '#e0784a' }
const BED = ['WW..............', 'WWBBBBBBBBBBBBBB', 'WWBbBBBBbBBBbBBB', 'WWBBBBBBBBBBBBBB', 'NNNNNNNNNNNNNNNN', 'N..............N']
const COOKIE = ['..CCCC..', '.CCDCCC.', 'CCCCCDCC', 'CDCCCCCC', 'CCCCDCCC', '.CCCCCC.', '..CCCC..']
const COOKIE_C = { C: '#e8a24a', D: '#6b3a1e' }
const BOOK = ['RRRRRRRWRRRRRRR', 'RWWWWWWKWWWWWWR', 'RWKKKKWKWKKKKWR', 'RWWWWWWKWWWWWWR', 'RWKKKKWKWKKKWWR', 'RWWWWWWKWWWWWWR', 'RRRRRRRKRRRRRRR']
const BOOK_C = { R: '#5a8fd8', W: '#fff4e2', K: '#6b62a8' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

const CAMEOS = [
  { sign: S, cap: 'Dishes piled up? | *They’ll keep till morning.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plates(x, 790, 1130, 9, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 1.0, 1.5)), lt < 1.0 ? t * 6 : 0)
      label(x, 790, 640, lt > 1.3 ? 'DISHES: ASLEEP' : 'DISHES: 9', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt > 1.3 ? LAV : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wiping a clean counter? | *It’s already sparkling.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1000, 400, 60, k, { bg: '#e6eef8', rot: 0 })
      const wx = 790 + Math.sin(lt * 9) * 120 * (lt < 1.3 ? 1 : 0)
      card(x, wx, 950, 110, 40, k, { bg: SKYB, rot: 0 })
      label(x, 790, 720, 'WIPED: 4 TIMES', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 980, P.t0 + 1.4 * 1.29, 7, 170, 0.2)
      label(x, 790, 1120, 'ALREADY CLEAN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Socks don’t match? | *Your feet don’t mind.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SOCK_A, { P: PINK, W: '#fff' }, 700, 880, 18 * k, { rot: -0.1 })
      drawBits(x, SOCK_B, { G: GREEN, Y: GOLD }, 880, 880, 18 * k, { rot: 0.1 })
      label(x, 790, 1100, 'STILL A MATCH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 790, 820, P.t0 + 1.3 * 1.29, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'One brown leaf? | *The plant is thriving.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'LEAF 14: BROWN', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'LEAVES 1–13: GREAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bed’s not made? | *Now it’s a cozy nest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BED, { W: '#fff4e2', B: '#7dd8a8', b: '#5fb88a', N: '#8a4a2e' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lt > 0.8 ? 0.03 * Math.sin(lt * 5) : 0 })
      label(x, 790, 700, lt > 1.1 ? 'NEST MODE: ON' : 'BED: UNMADE', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt > 1.1 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'List sorted by aisle? | *Add one treat.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'AISLE 1–9', 0, -140, { size: 28, font: MONO, weight: 700 })
        ;['1 · oats', '4 · rice', '7 · soap'].forEach((s, i) => txt(x, s, 0, -70 + i * 56, { size: 32 }))
        if (lt > 1.1) txt(x, '+ cookies!', 0, 110, { size: 34, color: '#d0453a' })
      })
      drawBits(x, COOKIE, COOKIE_C, 920, 1080, 16 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: S, cap: 'Guests left crumbs? | *Proof they had fun.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1010, 420, 50, k, { bg: '#c98f2a', rot: 0 })
      x.fillStyle = '#e8a24a'; for (let i = 0; i < 14 * k; i++) x.fillRect(620 + ((i * 97) % 340), 960 - (i % 3) * 8, 12, 10)
      label(x, 790, 720, 'CRUMBS: 41', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'FUN: CONFIRMED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tracking every little thing? | *Log a nap.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TODAY', headCol: MINT, lines: [['steps ✓', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['water ✓', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['chores ✓', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)], ['nap? ✓✓', LAV, pop01(t, P.t0 + 1.4, 0.25, 2.4)]] })
    } },
  { sign: S, cap: 'Bed at ten sharp? | *One more chapter.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 900, 650, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOOK, BOOK_C, 790, 900, 18 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.05 })
      label(x, 760, 1110, lt > 1.2 ? '10:01 · CHAPTER 2' : '10:00 · LIGHTS OUT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: lt > 1.2 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0206', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Virgo, leave the | dishes *for tonight.*',
  cameos: CAMEOS,
  group: { cap: 'Tidy heart. | *Tired hands.*', mood: 'sleepy' },
  lesson: { text: 'You hold it all together. | *Rest is allowed.*', chip: 'STATUS: OFF DUTY' },
  last: {
    text: 'The dishes? | *Still fine.*',
    draw(x, t, lt) {
      plates(x, 800, 1330, 7, pop01(t, t - lt + 0.3, 0.35, 2), ease.outCubic(prog(lt, 0.9, 1.4)))
      label(x, 800, 1440, 'SEE YOU TOMORROW', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
