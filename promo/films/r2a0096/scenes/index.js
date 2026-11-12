// r2a0096: star_advice, ADVICE SOLO, "Scorpio, you don't have | to be perfect." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one gag each. Ending: lesson.
//   0.0–3.6    "Scorpio, you don’t have | *to be perfect.*"
//   3.6–37.8   rewrote the text six times (send draft one) · one typo (nobody noticed) · burnt toast (still breakfast)
//              · skipped a workout (rest counts) · called them the wrong name (laugh it off) · room a bit messy (lived in)
//              · you don't have to win every argument (tie: fine) · asked for help (strong too) · off days (still loved)
//  37.8        "Good enough | *is good.*"
//  41.0        LESSON UNLOCKED: "Perfect was never the deal. | *You are enough.*"  STATUS: ENOUGH
//  46.9        "Even the toast | *was enough.*"  the burnt toast, back, with a little heart.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PLUM = '#e07ab8', RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
// a phone with a message draft being rewritten, the counter climbing
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -220, 280, 440); x.fillStyle = '#2a2350'; x.fillRect(-130, -210, 260, 420)
  x.fillStyle = '#140c30'; x.fillRect(-116, -180, 232, 340)
  const n = 1 + Math.floor(clamp(lt / 1.6) * 5)
  const lines = [3, 2, 4, 1, 3, 2][n - 1]
  for (let i = 0; i < lines; i++) { x.fillStyle = BONE; x.fillRect(-96, 40 + i * 30, 190 - (i * 41) % 80, 16) }
  x.fillStyle = PLUM; x.fillRect(-96 + (190 - ((lines - 1) * 41) % 80) + 6, 40 + (lines - 1) * 30 - 2, 6, 20)
  text(x, `DRAFT ${n}`, 0, -130, 40, n >= 6 ? PLUM : '#9aa5c4', MONO, 700)
  x.restore()
}
const GLASS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKBB..', '......BBB.', '.......BBB', '........BB']
const GLASS_C = { K: INK, S: 'rgba(143,227,255,0.45)', W: '#ffffff', B: '#c98f2a' }
const TOAST = [
  '..CCCCCCC..',
  '.CCCCCCCCC.',
  'CCDDDDDDDCC',
  'CDDDDDDDDDC',
  'CDDDBDDDDDC',
  'CDDDDDDBDDC',
  'CDDDDDDDDDC',
  'CDBDDDDDDDC',
  'CDDDDDDDDDC',
  'CCCCCCCCCCC',
]
const TOAST_C = { C: '#3a2418', D: '#6b3f22', B: '#2a1a10' }
const DUMB = ['KK.......KK', 'KKK.....KKK', 'KKKGGGGGKKK', 'KKK.....KKK', 'KK.......KK']
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const SOCK = ['.SS.', '.SS.', '.SS.', '.SSS', 'SSSS', 'SSS.']
// a scoreboard: YOU 99 · THEM 0, then a tie
function scoreboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  card(x, cx, cy, 340, 220, '#140c30', { k, rot: -0.03 })
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  const tie = lt > 1.3
  text(x, 'YOU', -80, -60, 30, BONE, MONO, 700); text(x, 'THEM', 80, -60, 30, BONE, MONO, 700)
  text(x, tie ? '1' : '99', -80, 20, 80, tie ? MINT : RED, MONO, 700); text(x, tie ? '1' : '0', 80, 20, 80, tie ? MINT : '#9aa5c4', MONO, 700)
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'Rewrote it six times? | *Send draft one.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 1110, 'IT WAS FINE', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One typo in the email? | *Nobody noticed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 800, 860, 320, 300, CREAM, { k, rot: 0.03 })
      if (k > 0.5) {
        x.save(); x.translate(800, 860); x.rotate(0.03)
        for (let i = 0; i < 6; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-130, -110 + i * 40, 250 - (i * 37) % 90, 14) }
        x.fillStyle = RED; x.fillRect(-40, 6, 50, 6)
        x.restore()
      }
      drawBits(x, GLASS, GLASS_C, 820 + Math.sin(lt * 3) * 40, 840, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 1100, 'NOTICED BY: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the toast? | *Still breakfast.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pop = ease.outCubic(prog(lt, 0.3, 0.7))
      drawBits(x, TOAST, TOAST_C, 800, lerp(1000, 820, pop) - Math.sin(Math.PI * pop) * 80, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 * pop })
      x.save(); x.globalAlpha = 0.5 * clamp(lt - 0.5); x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(760 + i * 34 + Math.sin(t * 3 + i) * 8, 640 - ((t * 60 + i * 40) % 90), 14, 30); x.restore()
      label(x, 800, 1090, 'STILL COUNTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Skipped the gym? | *Rest counts too.*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DUMB, { K: INK, G: '#9aa5c4' }, 800, 760, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.1 })
      drawBits(x, PILLOW, { L: LAV, W: BONE }, 800, 960, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1110, 'RECOVERY DAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said the wrong name? | *Laugh it off.*', mood: lt => lt > 1.4 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 990, 200 * k, { mood: lt > 1.4 ? 'squint' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.9] })
      bubble(x, 560, 640, 'hi, Jen! | …Jess.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 820, 740, 'HA HA HA', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Room a little messy? | It looks *lived in.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const cols = [PINK, SKYB, MINT, GOLD, LAV]
      for (let i = 0; i < 5; i++) drawBits(x, SOCK, { S: cols[i] }, 700 + (i % 3) * 95, 930 - Math.floor(i / 3) * 80 - (i % 2) * 20, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2), { rot: (i - 2) * 0.3 })
      label(x, 800, 700, 'COZY, ACTUALLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t have to | *win every argument.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      scoreboard(x, 800, 840, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 1060, 'TIE: TOTALLY FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked for help? | *That’s strong too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 640, 1040, 200, 120, '#c98f2a', { k })
      if (k > 0.01) signChar(x, t, 'cancer', 820, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 820, 680, 'got you.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      hearts(x, t, 640, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Off days and all, | *still so loved.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', star: { x: 0, s: 280 }, hops: [1.1],
    front(x, t, lt, P) {
      const pals = [['libra', 320, 760], ['pisces', 760, 760]]
      pals.forEach(([id, px, py], i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.35, 2); if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: 'heart', seed: 50 + i, glyph: false, tears: id === 'pisces' ? 2 : 0 }) })
      hearts(x, t, 540, 820, P.t0 + 1.0, { n: 8, life: 2.0, spread: 420, cell: 7, seed: 6 })
      label(x, 540, 1130, 'STILL LOVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0096', key: 'D', accent: PLUM, solo: S, ending: 'lesson',
  title: 'Scorpio, you don’t | have *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Good enough | *is good.*', mood: 'happy' },
  lesson: { text: 'Perfect was never the deal. | *You are enough.*', chip: 'STATUS: ENOUGH' },
  last: {
    text: 'Even the toast | *was enough.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, TOAST, TOAST_C, 540, 980, 26 * k, { rot: 0.06 * Math.sin(t * 2) })
      hearts(x, t, 540, 900, t - lt + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
