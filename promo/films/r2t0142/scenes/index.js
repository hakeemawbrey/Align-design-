// r2t0142: THE SIGNS AS… v3, ROLL CALL, "The signs | on horseback." (~57 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs | *on horseback.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one horse riding lesson per sign (3.8 s each), pushed to the extreme:
//              ♈ skipped the lesson, entered a race · ♉ brought carrots, ate them all · ♊ rode two horses at once
//              · ♋ ran a compatibility check with the horse · ♌ wanted a horse that matches their hair · ♍ brushed the
//              horse for two hours · ♎ still picking the horse's name · ♏ out-stared the horse · ♐ already gone, sent a
//              postcard · ♑ gave the horse a contract · ♒ rides backwards, on purpose · ♓ hugged the horse, both cried
//  49.2        "Lesson one: | *chaos.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Update: the horse | *got one carrot.*"  Taurus is back, sharing exactly one carrot.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a'

// ── the horse: a pixel horse head + neck in profile, facing left; mane colour and coat can change
const HORSE = [
  '.......BB.B.....',
  '......BBBBBM....',
  '.....BBBBBBMM...',
  '....BBKBBBBMMM..',
  '...BBBBBBBBBMMM.',
  '..BBBBBBBBBBBMMM',
  '.BBBBBBBBBBBBBMM',
  'BBBBBB..BBBBBBBM',
  'BNBBB....BBBBBBM',
  'BBBB.....BBBBBBB',
  '.BB......BBBBBBB',
  '.........BBBBBBB',
  '.........BBBBBBB',
  '........BBBBBBBB',
]
const HORSE_C = { B: '#b06a4a', M: '#4a2a1a', K: INK, N: '#4a2a1a' }
function horse(x, cx, cy, cell, { coat = '#b06a4a', mane = '#4a2a1a', flip = false, rot = 0, alpha = 1, tears = false, t = 0 } = {}) {
  if (cell <= 0.3) return
  drawBits(x, HORSE, { ...HORSE_C, B: coat, M: mane }, cx, cy, cell, { sx: flip ? -1 : 1, rot, alpha })
  if (tears) {
    // the eye sits at column 6, row 3 of 16 × 14
    const ex = cx + (flip ? -1 : 1) * (6.5 - 8) * cell, ey = cy + (3.5 - 7) * cell
    for (let q = 0; q < 3; q++) { const ph = ((t * 1.4 + q / 3) % 1); x.fillStyle = INK; x.fillRect(ex - cell * 0.45, ey + ph * cell * 6 - cell * 0.1, cell * 0.9, cell * 1.2); x.fillStyle = SKYB; x.fillRect(ex - cell * 0.35, ey + ph * cell * 6, cell * 0.7, cell) }
  }
}
const CARROT = ['...GG', '..GG.', '.OO..', 'OOO..', 'OO...', 'O....']
const CARROT_C = { G: '#5fd068', O: '#ff8a2a' }
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....']
const FLAG_C = { K: INK, W: '#fff4e2', P: '#9aa5c4' }
const BRUSH = ['WWWWWWWW', 'WWWWWWWW', 'KKKKKKKK', 'TTTTTTTT', '...TT...', '...TT...', '...TT...']
const BRUSH_C = { W: '#e8d8b0', K: INK, T: '#c98f2a' }
// a note card (bone paper, ink border, a header strip)
function note(x, cx, cy, k, lines, { w = 330, size = 32, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 56 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); y0 += 56 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the lesson. | *Entered a race.*', mood: lt => lt > 0.9 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, FLAG, FLAG_C, 860, 860, 22 * pop01(t, P.t0 + 0.7, 0.3, 2)) },
    front(x, t, lt, P) {
      const run = ease.outCubic(prog(lt, 0.2, 1.0))
      horse(x, lerp(980, 700, run), 990, 13 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 780, 640, 'DAY 1: RACING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought carrots. | *Ate them all.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      horse(x, 800, 900, 14 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const left = 4 - Math.min(4, Math.floor(clamp((lt - 0.5) / 1.2) * 5))
      for (let i = 0; i < left; i++) drawBits(x, CARROT, CARROT_C, 300 + i * 70, 1110, 12, { rot: 0.3 })
      bubble(x, 790, 660, 'munch munch', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1130, 'HORSE: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Rode two horses. | *At once.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: 0, y: -120 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      horse(x, 330, 1010, 12 * k, { coat: '#e8e0d0', mane: '#8a7f9e' })
      horse(x, 760, 1010, 12 * k, { flip: true, coat: '#3d3470', mane: '#c9a6ff' })
    },
    front(x, t, lt, P) { label(x, 540, 1180, 'MULTITASKING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 }) } },
  { sign: 'cancer', cap: 'Ran a compatibility | check *with the horse.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      horse(x, 810, 920, 13 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 640, 'CANCER + HORSE', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 620, 880, P.t0 + 1.3 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Wanted a horse that | *matches their hair.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      horse(x, 810, 920, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { coat: '#ffd23a', mane: '#ff8a2a' })
      label(x, 790, 1140, 'MANE: MATCHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Brushed the horse | for *two hours.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      horse(x, 820, 920, 13 * k, { coat: lt > 1.4 ? '#d4875e' : '#b06a4a' })
      if (k > 0.5) drawBits(x, BRUSH, BRUSH_C, 840 + Math.sin(t * 14) * 50, 980, 10, { rot: 0.3 })
      label(x, 790, 640, 'HOUR 2 OF 2', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.4) sparkles(x, t, 820, 900, P.t0 + 1.4 * 1.29, 7, 190, 0.6)
    } },
  { sign: 'libra', cap: 'Still picking | *the horse’s name.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      horse(x, 860, 1010, 10 * pop01(t, P.t0 + 0.15, 0.3, 2), { coat: '#e8e0d0', mane: '#8a7f9e' })
      note(x, 740, 760, pop01(t, P.t0 + 0.5, 0.3, 2), ['Buttercup?', 'Sir Trots?', 'Biscuit??'], { head: 'NAMES', headBg: PINK, w: 280, size: 32, rot: -0.05 })
      label(x, 760, 1170, 'LESSON: OVER', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Horse looked away. | Scorpio *won.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const away = ease.inOutCubic(prog(lt, 1.0, 1.3))
      horse(x, 810, 920, 13 * pop01(t, P.t0 + 0.15, 0.3, 2), { flip: away > 0.5, coat: '#3d3470', mane: '#140c30' })
      label(x, 790, 640, 'STARING CONTEST', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, 'WINNER ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Lesson one? | Sag’s *already gone.*', hideStar: true,
    back(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.3, 1.1)), bob = Math.abs(Math.sin(t * 10)) * 14
      if (go < 1) {
        horse(x, lerp(560, 1150, go), 1000 - bob, 13, { flip: true, coat: '#8a5a3a' })
        signChar(x, t, 'sagittarius', lerp(560, 1150, go) - 20, 850 - bob, 200 * pop01(t, P.t0 + 0.05, 0.4, 1.8), { mood: 'sparkle', seed: 11 })
      }
    },
    front(x, t, lt, P) {
      note(x, 540, 860, pop01(t, P.t0 + 1.1, 0.3, 2), ['wish you', 'were here!', '– sag'], { head: 'POSTCARD', headBg: SKYB, w: 300, size: 36, rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Gave the horse | *a contract.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      horse(x, 860, 1030, 10 * pop01(t, P.t0 + 0.15, 0.3, 2))
      note(x, 740, 760, pop01(t, P.t0 + 0.5, 0.3, 2), ['trot: 9 to 5', 'carrots: TBD', 'sign: ____'], { head: 'CONTRACT', headBg: '#2fc79a', w: 300, size: 30, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Rides backwards. | *On purpose.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: 60, y: -150 }, hops: [1.2],
    back(x, t, lt, P) { horse(x, 450, 1000, 14 * pop01(t, P.t0 + 0.1, 0.3, 2), { coat: '#e8e0d0', mane: '#6fc3ff' }) },
    front(x, t, lt, P) { label(x, 800, 1100, 'INNOVATION', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.05, font: MONO, weight: 700 }) } },
  { sign: 'pisces', cap: 'Hugged the horse. | They *both cried.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: { x: -130 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      horse(x, 760, 900, 13 * pop01(t, P.t0 + 0.15, 0.3, 2), { coat: '#d8d0e8', mane: '#8a7f9e', tears: lt > 1.0, t })
      hearts(x, t, 560, 800, P.t0 + 0.8, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
      bubble(x, 800, 1130, 'my best friend', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0142', key: 'E', accent: ORANGE, ending: 'callback',
  title: 'The signs | *on horseback.*',
  cameos: CAMEOS,
  group: { cap: 'Lesson one: | *chaos.*' },
  last: {
    text: 'Update: the horse | *got one carrot.*',
    draw(x, t, lt) {
      const t0 = t - lt
      horse(x, 760, 1080, 15 * pop01(t, t0 + 0.4, 0.4, 1.8))
      const k = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 330, 1130, 260 * k, { mood: lt > 1.6 ? 'happy' : 'squint', look: [1, 0], seed: 40, hops: [t0 + 1.6] })
      const give = ease.inOutCubic(prog(lt, 1.2, 1.8))
      drawBits(x, CARROT, CARROT_C, lerp(470, 610, give), lerp(1120, 1090, give), 14 * pop01(t, t0 + 0.9, 0.3, 2), { rot: 0.3 })
      label(x, 540, 1400, 'ONE. JUST ONE.', pop01(t, t0 + 2.0, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 2.0) hearts(x, t, 760, 960, t0 + 2.0, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
