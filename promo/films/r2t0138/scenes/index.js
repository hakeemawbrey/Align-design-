// r2t0138: THE SIGNS AS… v3, "Every sign | at a potluck." (~62 s vertical, signs3kit social cut, lofi · G). Ending: 'lesson'.
//   0.0–3.6    "Every sign | *at a potluck.*"
//   3.6–49.2   ♈ chili, spice level illegal · ♉ brought one dish, left with six · ♊ asked everyone's sign, food went cold
//              · ♋ take-home plates for all · ♌ a cake with their own face · ♍ labelled everything, even the water
//              · ♎ couldn't pick a dish, brought napkins · ♏ the recipe card, fully redacted · ♐ late, with a bouncy castle
//              · ♑ seating chart by compatibility · ♒ a dish nobody can identify · ♓ someone liked the dip, sobbed
//  49.2        "Everyone brought | *something.*"
//  52.4        LESSON: "Bring what you've got. | There's *room for you.*"  STATUS: FED
//  58.3        "Taurus took | the *leftovers.*"  (the six tubs, back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', ORANGE = '#ff9a4a', GREEN = '#5fd068'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const POT = ['.KKKKKKKKK.', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.', '..KKKKKKK..']
const FLAME = ['..F..', '.FFF.', 'FFYFF', 'FYYYF', '.FYF.']
const TUB = ['KKKKKKKK', 'KLLLLLLK', 'KFFFFFFK', 'KFFFFFFK', 'KKKKKKKK']
const BOWL = ['WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']
const STEAM = ['.S.', 'S..', '.S.', '..S']
const PLATE = ['..FFFFF..', '.FFFFFFF.', 'FFFFFFFFF', '.FFFFFFF.', '..FFFFF..']
const NAPKIN = ['NNNNNN', 'NNNNNN', 'NNNNNN', 'NNNNNN']
const CASTLE = [
  'R.R.R..R.R.R',
  'RRRRR..RRRRR',
  'RYRYRRRRYRYR',
  'RRRRRRRRRRRR',
  'RRRRYYYYRRRR',
  'RRRRY..YRRRR',
  'RRRRY..YRRRR',
  'BBBBBBBBBBBB',
]
const BLOB = ['..PPPP..', '.PPgPPP.', 'PPPPPgPP', 'PgPPPPPP', 'PPPPPPPP', '.WWWWWW.', '..WWWW..']

const CAMEOS = [
  { sign: 'aries', cap: 'Brought chili. | Spice level: *illegal.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { K: INK, R: RED }, 790, 960, 22 * k)
      for (let i = 0; i < 3; i++) drawBits(x, FLAME, { F: ORANGE, Y: GOLD }, 730 + i * 60, 860 - 8 * Math.sin(t * 9 + i), 16 * pop01(t, P.t0 + 0.6 + i * 0.15, 0.25, 2))
      label(x, 790, 680, 'SPICE: 11/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought one dish. | Left with *six.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, TUB, { K: INK, L: SKYB, F: ['#e8a24a', GREEN, RED, PINK, ORANGE, '#c9a6ff'][i] }, 790 + (i % 2 ? 8 : -8), 1060 - i * 66, 18 * pop01(t, P.t0 + 0.3 + i * 0.22, 0.25, 2.2))
      label(x, 790, 610, 'TUBS: 6', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked everyone\'s sign. | Food went *cold.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const Q = ['what\'s your sign?', 'and YOUR sign?', 'rising? moon?', 'wait, you too?']
      bubble(x, 770, 660, Q[Math.min(3, Math.floor(lt / 0.5))], pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'bl' })
      const cold = lt > 1.5
      drawBits(x, BOWL, { W: '#fff4e2' }, 790, 960, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (!cold) drawBits(x, STEAM, { S: BONE }, 790, 870 - (t * 40 % 30), 12, { alpha: 0.7 })
      label(x, 790, 1090, cold ? 'SOUP: COLD' : 'SOUP: HOT', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: cold ? SKYB : ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made everyone | a *take-home plate.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.25, 2.2)
        drawBits(x, PLATE, { F: '#c9c9d8' }, 660 + (i % 3) * 130, 740 + Math.floor(i / 3) * 150, 13 * k)
        if (k > 0.5) label(x, 660 + (i % 3) * 130, 740 + Math.floor(i / 3) * 150, ['ARI', 'GEM', 'LEO', 'VIR', 'LIB', 'YOU'][i], 1, { size: 20, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      }
      bubble(x, 790, 1080, 'eat, eat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Brought a cake | with *their face* on it.', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      if (sheet(x, 790, 880, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: '#fff4e2' })) {
        x.fillStyle = PINK; x.fillRect(-150, 70, 300, 40)
        x.restore()
        signChar(x, t, 'leo', 790, 860, 150, { mood: 'wink', seed: 60, glyph: false, glow: 0.4 })
      }
      label(x, 790, 650, 'FOR ME, BY ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#ffb34a', rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Labelled every dish. | Even *the water.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const L = [['PASTA · GF', 640], ['SALAD · VEGAN', 760], ['WATER · H2O', 900]]
      L.forEach(([s, y], i) => label(x, 790, y, s, pop01(t, P.t0 + 0.3 + i * 0.5, 0.3, 2.2), { size: i === 2 ? 36 : 30, bg: i === 2 ? SKYB : MINT, rot: (i % 2 ? 1 : -1) * 0.05, font: MONO, weight: 700 }))
      bubble(x, 790, 1060, 'for clarity.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Couldn\'t pick a dish. | Brought *napkins.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const O = ['lasagna?', 'tacos?', 'pie?', 'napkins.']
      bubble(x, 770, 660, O[Math.min(3, Math.floor(lt / 0.45))], pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      for (let i = 0; i < 4; i++) drawBits(x, NAPKIN, { N: '#fff4e2' }, 790, 1040 - i * 30, 30 * pop01(t, P.t0 + 1.4 + i * 0.1, 0.25, 2), { rot: (i % 2 ? 0.08 : -0.06) })
      label(x, 790, 860, 'VERY BALANCED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Shared the recipe. | *Fully redacted.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 320, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: 'MY DIP', headBg: '#e23d66' })) {
        for (let j = 0; j < 6; j++) {
          const w = 230 - (j % 3) * 40, r = clamp((lt - 0.5 - j * 0.15) / 0.2)
          x.fillStyle = '#b9b0a0'; x.fillRect(-130, -110 + j * 46, w, 16)
          x.fillStyle = INK; x.fillRect(-134, -116 + j * 46, (w + 8) * r, 28)
        }
        x.restore()
      }
      bubble(x, 380, 620, 'enjoy.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Showed up late. | With a *bouncy castle.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      const b = Math.sin(t * 8) * 0.03
      drawBits(x, CASTLE, { R: '#a35cf0', Y: GOLD, B: '#6b3db0' }, 770, 900, 26 * k, { sy: 1 + b, sx: 1 - b })
    },
    front(x, t, lt, P) {
      label(x, 780, 640, 'WHO ORDERED THIS?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Made a seating chart. | *By compatibility.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 330, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03, bg: '#fff4e2', head: 'SEATING', headBg: '#2fc79a', headInk: INK })) {
        const PAIRS = [['♈︎', '♎︎'], ['♉︎', '♏︎'], ['♊︎', '♐︎'], ['♋︎', '♑︎']]
        x.font = `700 34px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
        PAIRS.forEach(([a, b], j) => {
          if (lt < 0.4 + j * 0.25) return
          x.fillStyle = '#d8d0bf'; x.fillRect(-110, -95 + j * 66, 220, 48)
          x.fillStyle = INK; x.fillText(a, -60, -70 + j * 66); x.fillText(b, 60, -70 + j * 66)
          x.fillStyle = PINK; x.fillRect(-12, -78 + j * 66, 24, 16)
        })
        x.restore()
      }
      label(x, 790, 1100, 'NO ARGUMENTS ALLOWED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Brought a dish | *nobody can identify.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const w = Math.sin(t * 5) * 0.06
      drawBits(x, BLOB, { P: '#7dffb0', g: '#2fc79a', W: '#fff4e2' }, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + w, sy: 1 - w })
      label(x, 790, 660, 'IS IT… SOUP?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05 })
      bubble(x, 790, 1080, 'trust me.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Someone liked the dip. | *Sobbed.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: '#c9a6ff' }, 790, 990, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 760, 'great dip!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 790, 1110, 'NEEDS A MINUTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0138', key: 'G', accent: ORANGE, ending: 'lesson',
  title: 'Every sign | *at a potluck.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone brought | *something.*' },
  lesson: { text: 'Bring what you\'ve got. | There\'s *room for you.*', chip: 'STATUS: FED' },
  last: {
    text: 'Taurus took | the *leftovers.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1560, 210 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      for (let i = 0; i < 6; i++) drawBits(x, TUB, { K: INK, L: SKYB, F: ['#e8a24a', GREEN, RED, PINK, ORANGE, '#c9a6ff'][i] }, 690 + (i % 2 ? 8 : -8), 1680 - i * 52, 14 * pop01(t, t - lt + 0.7 + i * 0.12, 0.25, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
