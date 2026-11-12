// r2t0261: star_talk, SOLO, "How to spot | a Taurus." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine field-guide clues, each the most extreme (and lovable) Taurus version.
//   0.0–3.6    "How to spot | *a Taurus.*"
//   3.6–37.8   nine cards: parked by the snacks · ordered dinner for later too · same hoodie forever · plans changed? no
//              · daily nap, non-negotiable · forty candles, lights none · nine pillows, all essential
//              · new match, first question "can you cook?" · borrowed the good blanket, never seen again
//  37.8        ending 'group': "Easy to spot. | *Hard to move.*"  the big Taurus, half asleep.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7fd46a'
const ST = { x: -170 }

const BOWL = ['..YYYYYYYY..', '.YYoYYYoYYY.', 'YYYYYYYYYYYY', 'KKKKKKKKKKKK', '.KBBBBBBBBK.', '..KBBBBBBK..', '...KKKKKK...']
const BOWL_C = { Y: '#ffd86b', o: '#e8a93a', K: INK, B: '#e23d4e' }
const CHEESE = ['....YY', '..YYYY', 'YYYoYY', 'YoYYYY', 'YYYYoY']
const BOX = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const HOODIE = [
  '...GGGGGG...', '..GGGKKGGG..', '.GGGGGGGGGG.', 'GGGGGGGGGGGG', 'GGPPGGGGGGGG', 'GGPPGGGGYYGG', 'GG.GGGGGYYGG',
  'GG.GGGGGGG.G', 'GG.GGGGGGG.G', '...GGWWGGG..', '...GGGGGGG..',
]
const HOODIE_C = { G: '#6b8f5a', K: '#3e5a34', P: PINK, Y: GOLD, W: '#8fb07e' }
const CANDLE = ['..F..', '.FYF.', '..K..', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC']
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const PILLOW_COLS = ['#ff8fb1', '#ffd86b', '#7dffb0', '#c9a6ff', '#8fe3ff', '#ffb34a', '#ffffff', '#ff6b5a', '#9fd0a0']

const CAMEOS = [
  { sign: 'taurus', cap: 'At the party? | *By the snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1040, 340, 40, k, { bg: WOOD, rot: 0 })
      drawBits(x, BOWL, BOWL_C, 740, 970, 14 * k)
      drawBits(x, CHEESE, { Y: '#ffe27a', o: '#e8b84a' }, 890, 985, 11 * k)
      label(x, 790, 700, 'SNACK GUARD', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 840, 'I live here now', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ordered dinner. | And *dinner for later.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.1) * 3)
      for (let i = 0; i < 3; i++) if (i < n || i === 0) drawBits(x, BOX, { W: CREAM, K: RED }, 790, 1050 - i * 70, 16 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2))
      label(x, 790, 720, `TO-GO: ${Math.max(1, n)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 860, 'for breakfast', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Same hoodie | since *forever.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 790, 650, 'STILL PERFECT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 860, 1120, 'patch #14', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 26, bg: PINK, rot: 0.06 })
    } },
  { sign: 'taurus', cap: 'Plans changed? | *Absolutely not.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-150, -150, 300, 70)
        txt(x, 'SATURDAY', 0, -114, { size: 32, color: CREAM })
        txt(x, 'THE PLAN', 0, -10, { size: 40 })
        txt(x, '(agreed.)', 0, 50, { size: 28, font: MONO, weight: 700, color: '#6b62a8' })
      })
      label(x, 790, 1080, 'NO EDITS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 760, 620, 'we AGREED.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Daily nap. | *Non-negotiable.*', mood: 'sleepy', star: { x: -170, y: 20 }, squash: 0.06,
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 2, 0)
      label(x, 790, 1040, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 620, '2:00 = NAP', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Owns forty candles. | Lights *none.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = ['#ffb3c7', '#c9a6ff', '#fff4e2', '#9fd0a0', '#ffd86b']
      card(x, 790, 1010, 380, 26, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: WOOD, rot: 0 })
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.25 + i * 0.12, 0.3, 2)
        drawBits(x, ['..K..', ...CANDLE.slice(3)], { K: INK, C: cols[i] }, 640 + i * 75, 950 - (i % 2) * 14, 12 * k)
      }
      label(x, 790, 760, 'TOO NICE TO USE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'NEW ONE: ORDERED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Nine pillows on the bed. | *All essential.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 9))
      for (let i = 0; i < n; i++) drawBits(x, PILLOW, { P: PILLOW_COLS[i] }, 790 + (i % 2 ? 14 : -14), 1100 - i * 52, 15, { rot: (i % 3 - 1) * 0.06 })
      label(x, 790, 560, `PILLOWS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'New match? | First text: *“Can you cook?”*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ NEW MATCH', headCol: PINK, size: 26, lines: [
        ['hi! ♉︎ ?', LAV, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['can you cook?', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2)],
        ['pasta?', MINT, pop01(t, P.t0 + 1.5, 0.25, 2)],
        ['ok marry me', PINK, pop01(t, P.t0 + 1.9, 0.25, 2)],
      ] })
    } },
  { sign: 'taurus', cap: 'Borrowed the good blanket. | *Never seen again.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 70); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-160, -70, 320, 170, 40); x.fill()
        x.fillStyle = '#c97bff'; x.beginPath(); x.roundRect(-152, -62, 304, 154, 34); x.fill()
        x.fillStyle = '#e4c4ff'; for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) x.fillRect(-130 + i * 72 + (j % 2) * 36, -40 + j * 60, 28, 28)
        x.restore()
      }
      label(x, 790, 760, 'BURRITO MODE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'it’s mine now', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0261', key: 'C', accent: ACC, solo: 'taurus', ending: 'group',
  title: 'How to spot | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Easy to spot. | *Hard to move.*', mood: 'sleepy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
