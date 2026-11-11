// v3a093: star_advice, ADVICE SOLO, "How to love | an Aquarius." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love an Aquarius, one warm truth + one gag each.
//   0.0–3.6    "How to love | *an Aquarius.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              ask for more weird ideas (the cloud's name is Gerald) · give them space, they come back (with a moon rock)
//              · they fix things to say I love you (WIFI: FIXED) · best friend first (a friendship bracelet)
//              · say yes to the odd date (build a kite) · feelings load slowly (LOADING… READY!)
//              · love their causes, even the bees · their odd profile is honest · be a little weird together (antenna boppers)
//  37.8        "Odd. | *Loyal forever.*"  Aquarius comes back, big.
//  41.2        callback: "Gerald the cloud | *approves.*"  Gerald floats back in.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#38c4ec', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'aquarius'

const CLOUD = ['....WWWW......', '..WWWWWWWW.WW.', '.WWWWWWWWWWWWW', 'WWWkWWWWWkWWWW', 'WWWWWWWWWWWWWW', 'WWWWWmmmWWWWWW', '.WWWWWWWWWWWW.', '..WWWW..WWWW..']
const CLOUD_C = { W: '#f4f1ff', k: INK, m: PINK }
const ROCK = ['..GGGG..', '.GGgGGG.', 'GGGGGgGG', 'GgGGGGGG', 'GGGGgGGG', '.GGGGGG.']
const ROCK_C = { G: '#a9a3c0', g: '#6f6890' }
const WRENCH = ['.SS.SS.', '.SS.SS.', '.SSSSS.', '..SSS..', '..SSS..', '..SSS..', '..SSS..', '..SSS..', '..SSS..', '..SSS..']
const WRENCH_C = { S: '#cfd6e6' }
const KITE = ['....R....', '...RRR...', '..RRYRR..', '.RRYYYRR.', 'RRRRYRRRR', '.RRRYRRR.', '..RRYRR..', '...RRR...', '....R....']
const KITE_C = { R: PINK, Y: GOLD }
const BEE = ['..ww.ww..', '..ww.ww..', '.YKYKYK..', 'YYKYKYKYk', '.YKYKYK..']
const BEE_C = { Y: GOLD, K: INK, k: INK, w: 'rgba(255,255,255,0.85)' }

function bracelet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const COLS = [PINK, GOLD, MINT, SKYB, LAV, '#f0603a']
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2 + t * 0.6
    x.fillStyle = INK; x.fillRect(cx + Math.cos(a) * 110 * k - 17, cy + Math.sin(a) * 70 * k - 17, 34, 34)
    x.fillStyle = COLS[i % 6]; x.fillRect(cx + Math.cos(a) * 110 * k - 12, cy + Math.sin(a) * 70 * k - 12, 24, 24)
  }
}
function loading(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -40, 360, 80); x.fillStyle = '#2a2350'; x.fillRect(-172, -32, 344, 64)
  x.fillStyle = PINK; for (let i = 0; i < Math.floor(p * 10); i++) x.fillRect(-164 + i * 33.5, -24, 28, 48)
  x.restore()
}
function profile(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -200, 316, 420)
  x.fillStyle = INK; x.fillRect(-166, -216, 332, 432); x.fillStyle = '#140c30'; x.fillRect(-158, -208, 316, 416)
  x.fillStyle = AQ; x.fillRect(-140, -190, 280, 150)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♒︎ AQUARIUS', 0, -115)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('INTO:', -130, -10)
  x.font = `800 32px ${INTER}`; ['bees', 'robots', 'the moon', 'you?'].forEach((s, i) => x.fillText(s, -130, 34 + i * 42))
  x.restore()
}
// little alien-antenna headbands on a star frame
function boppers(x, F, t) {
  for (const d of [-1, 1]) {
    const bx = F.x + d * F.S * 0.12, by = F.top + 4
    const tx = bx + d * 26 + 6 * Math.sin(t * 6 + d), ty = by - 70
    x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.strokeStyle = MINT; x.lineWidth = 4; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.arc(tx, ty, 18, 0, 7); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(tx, ty, 12, 0, 7); x.fill()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Their weird ideas? | *Ask for more.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, CLOUD, CLOUD_C, 790 + 12 * Math.sin(t * 1.5), 760, 18 * pop01(t, P.t0 + 0.2, 0.35, 1.8))
      bubble(x, 600, 600, 'what if clouds | had names?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 790, 1040, 'THAT ONE’S GERALD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: AQ, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them space. | *They come back.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      if (lt < 1.1) label(x, 790, 760, 'BRB: SPACE', pop01(t, P.t0 + 0.2, 0.3, 2.4) * (lt < 1.0 ? 1 : 1 - (lt - 1.0) * 10), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      else {
        drawBits(x, ROCK, ROCK_C, 790, 930, 24 * pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2))
        bubble(x, 760, 690, 'brought you | a moon rock', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      }
      sparkles(x, t, 790, 920, P.t0 + 1.42, 7, 150, 0.5)
    } },
  { sign: S, cap: 'They fix things | to *say I love you.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, WRENCH, WRENCH_C, 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.5 + 0.3 * Math.sin(t * 9) * (lt < 1.4 ? 1 : 0) })
      label(x, 790, 1080, 'WIFI: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Be their | *best friend first.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 170 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      bracelet(x, t, 820, 760, pop01(t, P.t0 + 0.7, 0.35, 2))
      label(x, 600, 1140, 'MATCHING BRACELETS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say yes to | *the odd date.*', mood: 'sparkle', look: [1, -1], star: { x: -220 }, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      const kx = 800 + 30 * Math.sin(t * 1.3), ky = 760 + 20 * Math.sin(t * 2.1)
      if (k > 0.01) { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(400, 950); x.quadraticCurveTo(620, 1000, kx, ky + 90); x.stroke() }
      drawBits(x, KITE, KITE_C, kx, ky, 18 * k, { rot: 0.1 * Math.sin(t * 2) })
      label(x, 790, 1090, 'DATE: BUILD A KITE', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 32, bg: AQ, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feelings load slowly. | *They’re in there.*', mood: lt => lt > 1.9 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      loading(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), clamp(lt / 1.9))
      label(x, 790, 740, lt > 1.9 ? 'READY!' : 'LOADING…', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 36, bg: lt > 1.9 ? PINK : BONE, rot: -0.03, font: MONO, weight: 700 })
      if (lt > 1.9) hearts(x, t, 790, 900, P.t0 + 1.95, { n: 6, life: 1.4, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Love their causes. | *Even the bees.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05 * Math.sin(t * 3)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, 0, 28, 260); x.fillStyle = WOOD; x.fillRect(-8, 0, 16, 254)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 170); x.fillStyle = '#fff4e2'; x.fillRect(-162, -142, 324, 154)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BE KIND', 0, -94); x.fillText('TO BEES', 0, -36)
        x.restore()
      }
      drawBits(x, BEE, BEE_C, 630 + 40 * Math.sin(t * 3), 700 + 20 * Math.sin(t * 5), 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      drawBits(x, BEE, BEE_C, 900 + 20 * Math.sin(t * 4 + 1), 600 + 20 * Math.sin(t * 6), 13 * pop01(t, P.t0 + 1.0, 0.3, 2), { sx: -1 })
    } },
  { sign: S, cap: 'Their odd profile? | *It’s honest.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      profile(x, 750, 840, 0.92 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 750, 1130, 'MATCHED: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be a little weird. | *They’ll stay.*', mood: 'sparkle', star: { x: -170, y: 30, s: 260 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      if (lt > 0.4) boppers(x, F, t)
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const G = signChar(x, t, 'taurus', 800, 960, 220 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.7] })
        if (lt > 0.8) boppers(x, G, t)
      }
      label(x, 540, 610, 'TWO WEIRDOS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a093', key: 'F', accent: AQ, solo: S, ending: 'callback',
  title: 'How to love | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Odd. | *Loyal forever.*', mood: 'sparkle' },
  last: {
    text: 'Gerald the cloud | *approves.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      drawBits(x, CLOUD, CLOUD_C, 540 + 20 * Math.sin(t * 1.5), 960, 34 * k)
      label(x, 540, 1230, 'GERALD', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 44, bg: AQ, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 880, t - lt + 1.2, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
