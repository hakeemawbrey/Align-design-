// r2a0106: star_advice, ADVICE SOLO, "How to thank | a Libra." (~48 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm way to say thanks.
//   0.0–3.6    "How to thank | *a Libra.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              smoothed out the drama (an iron flattens it: NOTICED) · wrapped your gift for hours (gasp, loudly)
//              · fixed your collar (compliment theirs back) · a handwritten note beats a quick text
//              · they hosted, you do the dishes · they asked about your day (ask back)
//              · they love pretty things (bring flowers) · they found your match (credit them forever)
//              · a simple thank-you makes their whole week
//  37.8        "Grace. Taste. | *Big heart.*"  Libra comes back, big.
//  41.2        "The thank-you note? | *Framed.*"  The handwritten note returns, in a gold frame (callback, no lesson).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ccf', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'
const S = 'libra'

// ── props
const IRON = [
  '....KKKKKK.',
  '...K.....K.',
  '..SSSSSSSSS',
  '.SSSSSSSSSS',
  'SSSSSSSSSSS',
  'MMMMMMMMMMM',
]
const IRON_C = { K: INK, S: SKYB, M: '#9aa5c4' }
const GIFT = [
  'R...R..R...R',
  '.R.R....R.R.',
  '..RR....RR..',
  'PPPPPRRPPPPP',
  'PPPPPRRPPPPP',
  'RRRRRRRRRRRR',
  'PPPPPRRPPPPP',
  'PPPPPRRPPPPP',
  'PPPPPRRPPPPP',
  'PPPPPRRPPPPP',
]
const GIFT_C = { P: ROSE, R: GOLD }
const BOWTIE = ['RR.....RR', 'RRRR.RRRR', 'RRRRKRRRR', 'RRRR.RRRR', 'RR.....RR']
const BOWTIE_C = { R: RED, K: '#a02a3a' }
const PLATE = ['..WWWWW..', '.WWBBBWW.', 'WWB...BWW', '.WWBBBWW.', '..WWWWW..']
const PLATE_C = { W: '#ffffff', B: SKYB }
const FLOWERS = [
  '.RR..YY..RR.',
  'RRRRYYYYRRRR',
  '.RR..YY..RR.',
  '..G..G...G..',
  '...G.G..G...',
  '....GGGG....',
  '....WWWW....',
  '...WWWWWW...',
  '...WWWWWW...',
  '....WWWW....',
]
const FLOWERS_C = { R: ROSE, Y: GOLD, G: '#5fd068', W: LAV }

// a crumpled "DRAMA" paper that an iron flattens
function drama(x, t, lt, P) {
  const k = pop01(t, P.t0 + 0.2, 0.3, 2)
  if (k <= 0.01) return
  const flat = ease.inOutCubic(prog(lt, 0.7, 1.5))
  x.save(); x.translate(790, 980); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -52, 300, 104); x.fillStyle = '#ffffff'; x.fillRect(-142, -44, 284, 88)
  if (flat < 1) { // crumple lines
    x.strokeStyle = `rgba(27,18,54,${(0.7 * (1 - flat)).toFixed(3)})`; x.lineWidth = 5
    x.beginPath(); for (let i = 0; i < 6; i++) { x.moveTo(-130 + i * 50, -40); x.lineTo(-105 + i * 50, 40) } x.stroke()
  }
  x.fillStyle = flat > 0.95 ? '#2fc79a' : RED; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.save(); x.rotate((1 - flat) * 0.12); x.fillText(flat > 0.95 ? 'all good' : 'DRAMA', 0, 3); x.restore()
  x.restore()
  const ix = lerp(980, 640, flat)
  drawBits(x, IRON, IRON_C, ix, 880, 19 * k)
}
// a cream envelope with a heart seal (opens to a handwritten note)
function note(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -90, 316, 200)
  x.fillStyle = INK; x.fillRect(-162, -102, 324, 204); x.fillStyle = CREAM; x.fillRect(-154, -94, 308, 188)
  if (open > 0.01) {
    const up = 150 * open
    x.fillStyle = INK; x.fillRect(-124, -94 - up - 8, 248, up + 20); x.fillStyle = '#ffffff'; x.fillRect(-116, -94 - up, 232, up + 10)
    x.fillStyle = INK; x.font = `italic 600 34px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if (open > 0.6) { x.fillText('thank you,', 0, -94 - up + 46); x.fillText('really ♡', 0, -94 - up + 92) }
  }
  x.strokeStyle = '#d8c7a8'; x.lineWidth = 5; x.beginPath(); x.moveTo(-154, -94); x.lineTo(0, 10); x.lineTo(154, -94); x.stroke()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 10, 9)
  x.restore()
}
// a match card: two stars and a little credit line
function matchCard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364); x.fillStyle = '#140c30'; x.fillRect(-154, -174, 308, 348)
  x.fillStyle = MINT; x.fillRect(-140, -160, 280, 50); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("IT'S A MATCH", 0, -134)
  signChar(x, t, 'taurus', -64, -10, 110, { mood: 'heart', seed: 31, glyph: false })
  signChar(x, t, 'cancer', 64, -10, 110, { mood: 'heart', seed: 32, glyph: false })
  if (lt > 1.2) { x.fillStyle = ROSE; x.font = `800 26px ${INTER}`; x.fillText('set up by: LIBRA', 0, 120) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Smoothed out the drama? | *Say you noticed.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      drama(x, t, lt, P)
      label(x, 790, 700, 'NOTICED ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 42, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wrapped your gift for hours? | *Gasp. Loudly.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 900, 19 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      label(x, 790, 1120, 'WRAPPING: 3 HRS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 660, 'GASP!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 54, col: PINK, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Fixed your collar? | *Compliment theirs back.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: 0, y: 40, s: 240 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const a = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (a > 0.01) signChar(x, t, 'virgo', 790, 980, 190 * a, { mood: lt > 0.9 ? 'happy' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
      const straight = ease.inOutCubic(prog(lt, 0.5, 0.9))
      drawBits(x, BOWTIE, BOWTIE_C, 790, 1060, 10 * a, { rot: lerp(0.6, 0, straight) })
      drawBits(x, BOWTIE, { R: GOLD, K: WOOD }, F.x, F.cy + 100, 10 * pop01(t, P.t0 + 1.2, 0.3, 2))
      bubble(x, 540, 620, 'love YOURS too', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 300, 1110, 'LOOKS: 10/10', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A handwritten note | *beats a quick text.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.6, 1.1)))
      label(x, 790, 640, 'KEPT FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'They hosted dinner? | *You do the dishes.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2)
        drawBits(x, PLATE, PLATE_C, 790 + Math.sin(i * 2.1) * 10, 1060 - i * 52, 16 * k, { sy: 0.55 })
      }
      bubble(x, 790, 680, 'sit. I got this.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 400, 640, 'FEET: UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.5, 6, 150, 0.4)
    } },
  { sign: S, cap: 'They asked about your day. | *Ask back.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 760, 690, 'how was | your day?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: ROSE, tail: 'bl' })
      bubble(x, 800, 930, 'good! and YOURS?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 790, 1110, 'HEART: MELTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 330, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'They love pretty things. | *Bring flowers.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -210 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      label(x, 790, 1110, 'AESTHETIC: PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 190, 0.3)
    } },
  { sign: S, cap: 'They found your match? | *Credit them forever.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      matchCard(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      hearts(x, t, 330, 760, P.t0 + 1.4, { n: 6, life: 1.8, spread: 160, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'A simple thank-you | *makes their whole week.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'thank you!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 60, col: PINK, tail: 'bl' })
      label(x, 790, 1040, 'WEEK: MADE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 330, 760, P.t0 + 1.0, { n: 7, life: 2.0, spread: 180, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0106', key: 'D', accent: ROSE, solo: S, ending: 'callback',
  title: 'How to thank | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Grace. Taste. | *Big heart.*', mood: 'sparkle' },
  last: {
    text: 'The thank-you note? | *Framed.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.5, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 1000); x.rotate(-0.03); x.scale(1.3 * k, 1.3 * k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-196, -150, 404, 316)
        x.fillStyle = INK; x.fillRect(-210, -164, 420, 328); x.fillStyle = GOLD; x.fillRect(-200, -154, 400, 308)
        x.fillStyle = WOOD; x.fillRect(-176, -130, 352, 260); x.fillStyle = '#ffffff'; x.fillRect(-166, -120, 332, 240)
        x.fillStyle = INK; x.font = `italic 600 46px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('thank you,', 0, -30); x.fillText('really ♡', 0, 40)
        x.restore()
      }
      signChar(x, t, S, 820, 1290, 260, { mood: 'heart', pop: pop01(t, t0 + 0.9, 0.4, 2), seed: 9, hops: [t0 + 1.3] })
      sparkles(x, t, 540, 1050, t0 + 1.0, 8, 240, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
