// r2a0064: star_advice, ADVICE ROLL CALL, "Each sign in their | softest era." (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific soft-era moment each, one light visual gag each.
//   0.0–3.6    "Each sign in their | *softest era.*"
//   3.6–49.2   ♈ lets someone else go first · ♉ shares the last bite, willingly · ♊ listens to the whole story
//              · ♋ lets someone take care of them (a mug and blanket) · ♌ cheers loudest for a friend
//              · ♍ leaves one dish in the sink · ♎ leaves love notes for themself · ♏ says the feeling out loud
//              · ♐ stays home all weekend, loves it · ♑ takes a real lunch break · ♒ hugs first, on purpose
//              · ♓ happy tears only
//  49.2        "Soft looks | *good on everyone.*"  group photo.
//  52.6        CALLBACK: "Virgo’s one dish? | *Still there. Growth.*"  the plate in the sink, with a little heart.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb3c8', RED = '#e23d4e'

// ── props
const DOOR = [
  'KKKKKKKK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBYBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KBBBBBBK',
]
const DOOR_C = { K: INK, B: '#8a5a3a', Y: GOLD }
const CAKE = ['......CC', '....CCFF', '..CCFFFF', 'CCFFFFFF', 'CCCCCCCC', 'BBBBBBBB']
const CAKE_C = { C: '#fff4e2', F: PINK, B: '#c98f2a' }
const MUG = ['.S.S....', '..S.S...', 'WWWWWW..', 'WTTTTWWW', 'WTTTTW.W', 'WTTTTWWW', 'WWWWWW..', '.WWWW...']
const MUG_C = { S: '#ffffff', W: '#fff4e2', T: '#c98f2a' }
const SLIPPER = ['..PPPPPP', '.PPWWWPP', 'PPWWWWPP', 'PPPPPPPP']
const SLIPPER_C = { P: '#c9b8ff', W: '#ffffff' }

function sink(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#9aa5c4'; x.fillRect(-10, -150, 20, 70); x.fillRect(-10, -150, 70, 20)
  x.fillStyle = INK; x.fillRect(-170, -70, 340, 150)
  x.fillStyle = '#c9d2e8'; x.fillRect(-162, -62, 324, 134)
  x.fillStyle = '#7d88a8'; x.fillRect(-140, -40, 280, 96)
  // the one plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 6, 92, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 4, 84, 24, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8a24a'; x.fillRect(-20, 0, 18, 8); x.fillRect(16, -6, 12, 8)
  x.restore()
}
function note(x, cx, cy, k, text, rot = -0.08, bg = '#ffe27a') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-82, -72, 172, 160)
  x.fillStyle = bg; x.fillRect(-86, -80, 172, 160)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * 38))
  x.restore()
}
function blanket(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + 70); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -46, 300, 116)
  x.fillStyle = '#ff8fb1'; x.fillRect(-142, -38, 284, 100)
  x.fillStyle = '#ffd0de'; for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) x.fillRect(-142 + i * 40.5, -38 + j * 33, 40.5, 33)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Lets someone else | *go first.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 870, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 640, 'after you!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1130, 'PATIENCE: UNLOCKED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Shares the last bite. | *Willingly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), sp = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, CAKE, CAKE_C, 760 - 30 * sp, 880, 18 * k)
      drawBits(x, CAKE, CAKE_C, 820 + 60 * sp, 880, 18 * k, { alpha: sp > 0 ? 1 : 0 })
      label(x, 790, 680, 'HALF FOR YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Listens to the whole story. | *No interrupting.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 980, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 830, 740, '…and THEN—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: SKYB, tail: 'br' })
      bubble(x, 470, 620, 'and then?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Lets someone | *take care of them.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [0, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      blanket(x, F, pop01(t, P.t0 + 0.4, 0.35, 2))
      drawBits(x, MUG, MUG_C, 790, 880, 20 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 680, 'BEING LOOKED AFTER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Cheers the loudest. | *For a friend.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1000, 180 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 700, 'GO YOU!!!', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 820, 900, P.t0 + 1.0, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Leaves one dish | *in the sink.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sink(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'IT’S FINE ♥', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Leaves love notes | *for themself.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 720, 760, pop01(t, P.t0 + 0.3, 0.3, 2), 'you’re | cute', -0.08)
      note(x, 880, 900, pop01(t, P.t0 + 0.7, 0.3, 2), 'drink | water ♥', 0.07, '#ffd0de')
      note(x, 730, 1060, pop01(t, P.t0 + 1.1, 0.3, 2), 'proud | of you', -0.04, '#c8f5dc')
    } },
  { sign: 'scorpio', cap: 'Says the feeling | *out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'I missed you.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 980, 'NO RIDDLES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: '#e23d66', color: '#fff4e2', rot: -0.04 })
      hearts(x, t, 520, 780, P.t0 + 1.4, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Stays home all weekend. | *Loves it.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SLIPPER, SLIPPER_C, 400, 1110, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 780, 'PASSPORT: RESTING', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: LAV, rot: 0.04 })
      label(x, 800, 940, 'COZY: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Takes a real lunch break. | *A whole hour.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'OUT TO LUNCH', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: MINT, rot: -0.04 })
      label(x, 790, 920, 'BACK AT 2-ISH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, '(-ISH!!)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'aquarius', cap: 'Hugs first. | *On purpose.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) signChar(x, t, 'gemini', lerp(820, 650, near), 920, 220 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 16, glyph: false })
      label(x, 790, 660, 'HUG: INITIATED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
      hearts(x, t, 540, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
  { sign: 'pisces', cap: 'Cries. | *Happy tears only.*', mood: 'heart', tears: 3, look: [0, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 780, 'TEARS: HAPPY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04 })
      hearts(x, t, 790, 1050, P.t0 + 0.8, { n: 8, life: 2.0, spread: 220, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0064', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign in their | *softest era.*',
  cameos: CAMEOS,
  group: { cap: 'Soft looks | *good on everyone.*' },
  last: {
    text: 'Virgo’s one dish? | *Still there. Growth.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'virgo', 360, 1000, 280 * a, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 31, hops: [t0 + 1.3] })
      sink(x, 730, 1080, pop01(t, t0 + 0.7, 0.4, 2) * 1.1)
      hearts(x, t, 540, 1250, t0 + 1.3, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
