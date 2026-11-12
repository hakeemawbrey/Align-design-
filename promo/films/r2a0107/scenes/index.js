// r2a0107: star_advice, ADVICE SOLO, "Aquarius, the right people | will stay." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, the right people | *will stay.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              too weird for some, perfect for others (the odd puzzle piece clicks in) · went quiet, real ones still knock
//              · your 3am space rant: they want part two · cancelled to recharge: they saved your seat
//              · your odd snack combo: they tried it too · a match who gets your jokes: keep them
//              · you don't have to shrink to fit (the tiny box bursts) · some people drift, that's okay (a paper boat)
//              · stay you, your people are coming (three friends arrive)
//  37.8        "Truly you. | *Truly loved.*"  Aquarius comes back, big.
//  41.2        "The seat they saved? | *Still yours.*"  The RESERVED chair comes back; Aquarius sits in it (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#5ad8ff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'
const S = 'aquarius'

// ── props
const PIECE = [
  '...PP.....',
  '..PPPP....',
  'PPPPPPPPP.',
  'PPPPPPPPPP',
  'PPPPPPPPP.',
  'PPPPPPPPP.',
  'PPPPPPPPPP',
  'PPPPPPPPP.',
  '....PP....',
]
const PIECE_C = { P: AQUA }
const DOOR = [
  'KKKKKKKKKK',
  'KWWWWWWWWK',
  'KWDDDDDDWK',
  'KWDDDDDDWK',
  'KWWWWWWWWK',
  'KWWWWWWYWK',
  'KWDDDDDDWK',
  'KWDDDDDDWK',
  'KWWWWWWWWK',
  'KWWWWWWWWK',
]
const DOOR_C = { K: INK, W: '#c98f6a', D: '#a8714a', Y: GOLD }
const SCOPE = [
  '........KK',
  '......KBBK',
  '....KBBBK.',
  '..KBBBBK..',
  'KBBBBBK...',
  '.KKBKK....',
  '...KK.....',
  '..K..K....',
  '.K....K...',
]
const SCOPE_C = { K: INK, B: '#9aa5c4' }
const CHAIR = [
  '.RRRRRR.',
  '.RRRRRR.',
  '.RRRRRR.',
  '.RRRRRR.',
  'WWWWWWWW',
  'W......W',
  'W......W',
  'W......W',
]
const CHAIR_C = { R: '#7a5cff', W: WOOD }
const BOWL = ['P.....IIII', 'P...IIIIII', 'PP.IIIIIII', '.PBBBBBBBB', '..BBBBBBB.', '...BBBBB..']
const BOWL_C = { P: '#7ac142', I: '#ffe1ec', B: SKYB }
const BOAT = ['....W....', '...WW....', '..WWW....', '.WWWW....', '....K....', 'BBBBBBBBB', '.BBBBBBB.']
const BOAT_C = { W: '#ffffff', K: INK, B: CREAM }
const BOX = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const BOX_C = { K: INK, W: '#c98f6a' }

// a phone chat with a match
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 296, 400)
  x.fillStyle = INK; x.fillRect(-154, -204, 308, 408); x.fillStyle = '#2a2350'; x.fillRect(-144, -194, 288, 388)
  x.fillStyle = '#140c30'; x.fillRect(-132, -170, 264, 340)
  x.fillStyle = MINT; x.fillRect(-120, -156, 240, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 16 : -16, -60 + i * 76); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`
    const ls = txt.split('|'), w = Math.max(...ls.map(l => x.measureText(l).width)) + 28, h = ls.length * 30 + 16
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = INK
    ls.forEach((l, j) => x.fillText(l, 0, -h / 2 + 8 + 15 + j * 30))
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Too weird for some? | *Perfect for others.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(760, 880); x.scale(1.3 * k, 1.3 * k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = '#2a2350'; x.fillRect(-142, -122, 284, 244)
        x.fillStyle = '#140c30'; x.fillRect(-48, -46, 96, 84); x.fillRect(-14, -62, 24, 18)
        x.restore()
      }
      const slide = ease.inOutCubic(prog(lt, 0.5, 1.3))
      drawBits(x, PIECE, PIECE_C, lerp(900, 766, slide), lerp(640, 882, slide), 15.6 * k, { rot: lerp(0.6, 0, slide) })
      label(x, 760, 1110, 'FITS. PERFECTLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 880, P.t0 + 1.35, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Went quiet for a week? | *Real ones still knock.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const knock = lt > 0.5 && lt < 1.3 ? Math.abs(Math.sin(lt * 18)) : 0
      drawBits(x, DOOR, DOOR_C, 800 + knock * 6, 880, 32 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 640, 'KNOCK KNOCK', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'brought soup ♡', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Your 3am space rant? | *They want part two.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 800, 920, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 650, '…and THAT’S why | the moon wobbles', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 32, col: SKYB, tail: 'bl' })
      bubble(x, 790, 650, 'wait. part two??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      label(x, 790, 1130, 'TIME: 3:12 AM', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skipped it to recharge? | *Seat: saved.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 800, 960, 34 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 850, 'RESERVED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 640, 'whenever | you’re ready', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Your odd snack combo? | *They tried it too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 800, 900, 27 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 690, 'PICKLE + ICE CREAM', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, '…weirdly good?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Gets your jokes? | *Keep that match.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 780, 860, 1.2 * pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['aliens built | the moon', AQUA, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['obviously. | which ones?', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['♡ ♡ ♡', AQUA, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ])
    } },
  { sign: S, cap: 'You don’t have to | *shrink to fit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: lt => lt > 1.2 ? [0, 0] : [1, 0], star: { x: 0, y: 10, s: 300 },
    squash: lt => lt < 1.1 ? 0.25 : 0, hops: [1.15],
    back(x, t, lt, P) {
      const burst = ease.outCubic(prog(lt, 1.1, 1.5))
      if (lt < 1.1) drawBits(x, BOX, BOX_C, 540, 1000, 28 * pop01(t, P.t0 + 0.1, 0.3, 2))
      else for (const [d, r] of [[-1, -0.6], [1, 0.6]]) drawBits(x, ['KKKKK', 'KWWWK', 'KKKKK'], BOX_C, 540 + d * lerp(60, 330, burst), lerp(1000, 1120, burst), 22, { rot: r * burst, alpha: 1 - 0.3 * burst })
    },
    front(x, t, lt, P) {
      label(x, 540, 610, 'SIZE: FULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: AQUA, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 880, P.t0 + 1.1, 8, 240, 0.4)
    } },
  { sign: S, cap: 'Some people drift. | *That’s okay.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      x.fillStyle = 'rgba(143,227,255,0.35)'; x.fillRect(560, 1030, 400, 18); x.fillRect(600, 1062, 340, 10)
      const drift = ease.inOutSine ? ease.inOutSine(prog(lt, 0.4, 2.4)) : prog(lt, 0.4, 2.4)
      drawBits(x, BOAT, BOAT_C, lerp(640, 870, drift), 975 + Math.sin(t * 3) * 6, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 2.4) * 0.08 })
      bubble(x, 800, 700, 'safe travels!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1150, 'NO HARD FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stay you. | *Your people are coming.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      const IDS = ['gemini', 'libra', 'sagittarius']
      IDS.forEach((id, i) => {
        const walk = ease.outCubic(prog(lt, 0.3 + i * 0.25, 1.2 + i * 0.25))
        if (walk > 0.01) signChar(x, t, id, lerp(1040, 600 + i * 140, walk), 980 - (i % 2) * 40, 150, { mood: walk >= 1 ? 'happy' : 'sparkle', look: [-1, 0], seed: 40 + i, glyph: false, alpha: Math.min(1, walk * 3) })
      })
      label(x, 760, 660, 'YOUR PEOPLE: ARRIVING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 760, 860, P.t0 + 1.6, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0107', key: 'F', accent: AQUA, solo: S, ending: 'callback',
  title: 'Aquarius, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Truly you. | *Truly loved.*', mood: 'sparkle' },
  last: {
    text: 'The seat they saved? | *Still yours.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CHAIR, CHAIR_C, 540, 1120, 40 * pop01(t, t0 + 0.4, 0.4, 2))
      const sit = ease.outCubic(prog(lt, 0.9, 1.4))
      if (lt > 0.9) signChar(x, t, S, 540, lerp(700, 960, sit), 260, { mood: lt > 1.5 ? 'heart' : 'sparkle', seed: 9, hops: [t0 + 1.4] })
      label(x, 540, 1300, 'RESERVED: AQUARIUS', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1000, t0 + 1.45, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
