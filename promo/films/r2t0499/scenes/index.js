// r2t0499: star_talk, SOLO (cancer), "Your Cancer mom | *be like.*" (signs3kit social cut, music: lofi · D).
// Nine cards, one Cancer mom pushed to the most extreme (and lovable) version. Ending: callback.
//   packed you a lunch (you're thirty) · "call me, urgent" (a recipe) · kept every drawing · knitted three
//   sweaters · cried at kindergarten graduation · brought out the baby albums for your date · checked your match's
//   sign · you sneezed once: soup · you left at nine, leftovers for a week
//   group "Love, in | *containers.*"   last "The lunch note said | *“proud of you.”*" (the lunch, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const LUNCH = ['...KKKKKK...', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRWWWWWWWWRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const LUNCH_C = { K: INK, R: '#ff6b5a', W: CREAM }
const SWEATER = ['..SS....SS..', '.SSSSSSSSSS.', 'SSSSWWWWSSSS', 'SSSSSSSSSSSS', 'SS.SPSSPS.SS', 'SS.SSSSSS.SS', 'SS.SPSSPS.SS', '...SSSSSS...', '...SSSSSS...']
const BOWL = ['..W..W..W..', '...W..W....', 'KKKKKKKKKKK', 'KOOOOOOOOOK', '.KOOOOOOOK.', '..KKKKKKK..']
const TUB = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWOOOOOOWK', 'KWOOOOOOWK', 'KKKKKKKKKK']
const TISSUE = ['..WW..', '.WWWW.', 'KKKKKK', 'KBBBBK', 'KBBBBK', 'KKKKKK']

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Packed you a lunch. | *You’re thirty.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LUNCH, LUNCH_C, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 650, 'NAME: ON IT', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 790, 1110, 'CRUSTS: OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: '“Call me. Urgent.” | *It’s a recipe.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 280, 400, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-124, -180, 248, 360)
        x.fillStyle = PINK; x.fillRect(-112, -168, 224, 48); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('MOM', 0, -144)
        x.font = `800 28px ${INTER}`
        const R = [['CALL ME', BONE, 0.3], ['URGENT', RED, 0.7], ['ok so 2 cups', BONE, 1.4], ['of flour', BONE, 1.7]]
        R.forEach(([s, c, at], i) => { if (lt < at) return; const w = x.measureText(s).width + 28; x.fillStyle = c; x.fillRect(-108, -96 + i * 66, w, 50); x.fillStyle = INK; x.textAlign = 'left'; x.fillText(s, -94, -70 + i * 66); x.textAlign = 'center' })
      })
    } },
  { sign: S, cap: 'Kept every drawing. | *Every. One.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 400, pop01(t, P.t0 + 0.15, 0.3, 2), 0, () => {
        x.fillStyle = '#d8dbe8'; x.fillRect(-150, -200, 300, 400); x.fillStyle = INK; x.fillRect(-150, -40, 300, 6); x.fillRect(110, -170, 12, 80); x.fillRect(110, 0, 12, 120)
        const n = Math.min(9, 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 9))
        for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); x.save(); x.translate(-90 + c * 80, -140 + r * 110); x.rotate((i % 2 ? 0.1 : -0.08)); x.fillStyle = CREAM; x.fillRect(-34, -40, 68, 80); x.fillStyle = [RED, MINT, GOLD, SKYB][i % 4]; x.fillRect(-18, -16, 36, 30); x.restore() }
      }, '#d8dbe8')
      L(x, 790, 1110, 'AGE 4 TO 34', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Sweater weather? | *She knitted three.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 3))
      const C = [{ S: '#ff6b5a', W: CREAM, P: GOLD }, { S: MINT, W: CREAM, P: PINK }, { S: LAV, W: CREAM, P: GOLD }]
      for (let i = 0; i < n; i++) drawBits(x, SWEATER, C[i], 690 + i * 80, 860 + (i % 2) * 50, 14, { rot: (i - 1) * 0.12 })
      L(x, 790, 640, `SWEATER ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 790, 1120, 'IT’S 24°', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Cried at your graduation. | *Kindergarten.*', mood: 'wide', tears: lt => lt > 0.6 ? 2 : 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 790, 700, 'PRE-K GRADUATE', pop01(t, P.t0 + 0.2, 0.3, 2.2), GOLD, 0.05, 38)
      drawBits(x, TISSUE, { W: '#ffffff', K: INK, B: SKYB }, 790, 930, 22 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 1110, 'TISSUES: BOX 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.05, 30)
    } },
  { sign: S, cap: 'Your date came over. | *Out came the albums.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 320, 240, pop01(t, P.t0 + 0.15, 0.3, 2), -0.04, () => {
        x.fillStyle = '#5a3a7a'; x.fillRect(-160, -120, 320, 240); x.fillStyle = INK; x.fillRect(-4, -120, 8, 240)
        for (let i = 0; i < 4; i++) { x.fillStyle = CREAM; x.fillRect(-140 + (i % 2) * 70 + (i > 1 ? 160 : 0), -90 + 0, 56, 70); x.fillStyle = CREAM; x.fillRect(-140 + (i % 2) * 70 + (i > 1 ? 160 : 0), 10, 56, 70) }
      }, '#5a3a7a')
      L(x, 790, 650, 'BABY PHOTOS: VOL 4', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 30)
      bubble(x, 790, 1100, 'and this is the bath!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Checked your match’s sign. | *Approved.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 280, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = ACC; x.fillRect(-150, -140, 300, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('YOUR MATCH', 0, -112)
        x.fillStyle = BONE; x.font = `700 110px ${GLYPH_FONT}`; x.fillText('♉︎', 0, 20)
      })
      L(x, 790, 1100, lt > 1.4 ? 'MOM: APPROVED ✓' : 'MOM: REVIEWING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.4 ? MINT : BONE, -0.04, 32)
    } },
  { sign: S, cap: 'You sneezed once. | *Soup arrived.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 560, 640, 'achoo', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: SLATE, tail: 'br' })
      drawBits(x, BOWL, { W: '#ffffff', K: INK, O: ORANGE }, 800, 900, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1110, 'DELIVERED: 4 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'You left at nine. | *Leftovers for a week.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 6))
      for (let i = 0; i < n; i++) drawBits(x, TUB, { K: INK, B: [MINT, PINK, GOLD, SKYB][i % 4], W: 'rgba(255,255,255,0.6)', O: ORANGE }, 800 + (i % 2 ? 12 : -12), 1110 - i * 70, 14)
      L(x, 580, 640, 'TAKE IT!', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.05, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0499', key: 'D', accent: ACC, solo: S,
  title: 'Your Cancer mom | *be like.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Love, in | *containers.*', mood: 'heart' },
  last: {
    text: 'The lunch note said | *“proud of you.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, LUNCH, LUNCH_C, 540, 1150, 22 * k)
      box(x, 540, 960, 300, 140, pop01(t, t - lt + 1.1, 0.35, 2.2), -0.05, () => {
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('proud of you ♡', 0, -12); x.font = `700 22px ${MONO}`; x.fillText('– mom', 60, 38)
      }, CREAM)
      hearts(x, t, 540, 900, t - lt + 1.5, { n: 6, life: 1.8, spread: 360, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
