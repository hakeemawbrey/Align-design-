// r2t0195: star_talk, ROLL CALL, "Signs working | from home." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme work-from-home version of itself.
//   0.0–3.6    "Signs working | *from home.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries finished the week by Monday 9:05 · Taurus's office is the bed · Gemini in three meetings at once
//              · Cancer fed the team over video · Leo: camera on, ring light on · Virgo colour-coded every cable
//              · Libra changed backgrounds eleven times · Scorpio's camera is off, name is one dot · Sagittarius is
//              "home" on a mountain · Capricorn hired the cat as an intern · Aquarius invented a floating desk
//              · Pisces cried at a cloud on the ten-minute break
//  49.2        "Productive? | *Technically.*"  Group photo.
//  52.6        CALLBACK: "The cat intern? | Got *promoted.*"  The cat comes back with a MANAGER badge.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', TEAL = '#2fc79a', PEACH = '#ffb48a'

// ── props
const CAT = [
  'K.......K..',
  'KK.....KK..',
  'KKKKKKKKK..',
  'KGKKKKKGK..',
  'KKKKPKKKK.K',
  '.KKKKKKK..K',
  '.KKKKKKKKKK',
  '.KKKKKKKKK.',
  '.KK.KK.KK..',
]
const CAT_C = { K: '#8a8aa8', G: '#b9e07a', P: PINK }
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWwWWWWWWWWwWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const MOUNTAIN = [
  '.......W........',
  '......WWW.......',
  '.....WGGGW......',
  '....GGGGGGG.....',
  '...GGGGGGGGG....',
  '..GGGGGGGGGGGG..',
  '.GGGGGGGGGGGGGG.',
  'GGGGGGGGGGGGGGGG',
]
const FLAG = ['KRRR', 'KRRR', 'K...', 'K...']
const CLOUD = ['....GGGG......', '..GGGGGGGG.GG.', '.GGGGGGGGGGGGG', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.']
const BOWL = ['WWWWWWWWWW', 'WOOOOOOOOW', '.WWWWWWWW.', '..WWWWWW..']

// a laptop with a coloured screen and optional drawing on it
function laptop(x, cx, cy, k, { screen = '#140c30', draw = null, w = 300, h = 190 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = screen; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.fillStyle = INK; x.fillRect(-w / 2 - 40, h / 2 + 4, w + 80, 30); x.fillStyle = '#c9c9d8'; x.fillRect(-w / 2 - 32, h / 2 + 8, w + 64, 18)
  if (draw) { x.save(); x.beginPath(); x.rect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24); x.clip(); draw(x); x.restore() }
  x.restore()
}
// a small video tile with a person-blob in it
function tile(x, cx, cy, s, col, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-s / 2 - 6, -s * 0.36 - 6, s + 12, s * 0.72 + 12); x.fillStyle = '#1d2050'; x.fillRect(-s / 2, -s * 0.36, s, s * 0.72)
  x.fillStyle = col; x.beginPath(); x.arc(0, -s * 0.06, s * 0.14, 0, Math.PI * 2); x.fill(); x.fillRect(-s * 0.22, s * 0.12, s * 0.44, s * 0.24)
  x.restore()
}
// a glowing ring light
function ringLight(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.shadowColor = '#fff1b0'; x.shadowBlur = 50
  x.strokeStyle = '#fff8e2'; x.lineWidth = 30; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke()
  x.shadowBlur = 0; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 147, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 113, 0, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.fillRect(-6, 145, 12, 180)
  x.restore()
}
// colour-coded cables, neatly in a row, each with a label
function cables(x, t, lt, P) {
  const COLS = [RED, ORANGE, GOLD, MINT, SKYB, LAV, PINK]
  for (let i = 0; i < 7; i++) {
    const k = clamp((lt - 0.3 - i * 0.12) / 0.25)
    if (k <= 0) continue
    const px = 620 + i * 52
    x.fillStyle = INK; x.fillRect(px - 9, 640, 18, 420 * k + 4); x.fillStyle = COLS[i]; x.fillRect(px - 6, 640, 12, 420 * k)
    if (k >= 1) { x.fillStyle = INK; x.fillRect(px - 22, 1060, 44, 34); x.fillStyle = CREAM; x.fillRect(px - 18, 1064, 36, 26); x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(i + 1), px, 1078) }
  }
}
// a background frame that keeps changing scene
function background(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.floor(lt * 5) % 4
  const SCENES = [['#8fe3ff', '#ffd27a'], ['#5fd068', '#2a7a3a'], ['#140c30', '#c9a6ff'], ['#ff8fb1', '#ffb34a']]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -126, 340, 252)
  x.fillStyle = SCENES[n][0]; x.fillRect(-160, -116, 320, 232)
  x.fillStyle = SCENES[n][1]; x.fillRect(-160, 40, 320, 76)
  if (n === 2) { x.fillStyle = BONE; for (let i = 0; i < 9; i++) x.fillRect(-140 + (i * 67) % 280, -100 + (i * 41) % 120, 6, 6) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the week’s work. | *Monday, 9:05.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -200 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      const L = ['MON ✓', 'TUE ✓', 'WED ✓', 'THU ✓', 'FRI ✓']
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 840); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = CREAM; x.fillRect(-132, -172, 264, 344)
        x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        L.forEach((s, i) => { if (lt > 0.4 + i * 0.15) { x.fillStyle = '#2fc79a'; x.fillText(s, 0, -120 + i * 60) } })
        x.restore()
      }
      label(x, 780, 1090, '9:05 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The office? | *The bed.*', mood: 'sleepy', star: { x: -180, y: 30 }, hops: [],
    back(x, t, lt, P, F) { drawBits(x, PILLOW, { W: CREAM, w: '#e8dcc8' }, F.x, F.cy + 130, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      laptop(x, 790, 900, 0.8 * pop01(t, P.t0 + 0.3, 0.3, 2), { screen: '#3a3a6a' })
      label(x, 790, 650, 'DESK: BED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'In three meetings. | *At once.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.5) % 3 - 1, 0], star: { x: 0, y: 80, s: 240 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT]
      for (let i = 0; i < 3; i++) laptop(x, 240 + i * 300, 640, 0.65 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { draw: xx => tile(xx, 0, 0, 220, COLS[i], 1) })
      bubble(x, 540, 1130, 'yes! no! agreed!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Fed the whole team. | *Over video.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      laptop(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { draw: xx => { tile(xx, -70, -20, 120, PINK, 1); tile(xx, 70, -20, 120, MINT, 1) } })
      drawBits(x, BOWL, { W: CREAM, O: ORANGE }, lerp(560, 700, ease.outCubic(clamp((lt - 0.6) / 0.5))), 960, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 620, 'eat something!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Camera always on. | *Ring light* too.', mood: 'sparkle', star: { x: 0, y: -10 }, hops: [1.2],
    back(x, t, lt, P) { ringLight(x, t, 540, 820, 1.4 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) { label(x, 820, 1120, 'STANDUP: 1 HR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 }) } },
  { sign: 'virgo', cap: 'Colour-coded the cables. | *Numbered them.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -250 }, hops: [1.5],
    front(x, t, lt, P) { cables(x, t, lt, P) } },
  { sign: 'libra', cap: 'Changed the background | *eleven times.*', mood: lt => Math.floor(lt * 5) % 2 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      background(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, `BACKGROUND ${1 + Math.floor(clamp(lt / 2.2) * 10)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Camera off. | Name: *one dot.*', mood: 'squint', look: [1, 0], star: { x: -200 }, hops: [],
    front(x, t, lt, P) {
      laptop(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { screen: '#05040c', draw: xx => { xx.fillStyle = BONE; xx.font = `800 120px ${INTER}`; xx.textAlign = 'center'; xx.textBaseline = 'middle'; xx.fillText('•', 0, 0) } })
      bubble(x, 790, 620, 'great point.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Working from home? | *Home* is a mountain.', mood: 'sparkle', star: { x: 80, y: -170, s: 170 }, hops: [1.2],
    back(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { W: '#ffffff', G: '#6b62a8' }, 620, 960, 34 * pop01(t, P.t0 + 0.05, 0.35, 2))
      drawBits(x, FLAG, { K: INK, R: RED }, 720, 600, 16 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
    },
    front(x, t, lt, P) {
      laptop(x, 420, 1100, 0.5 * pop01(t, P.t0 + 0.3, 0.3, 2), { screen: '#3a3a6a' })
      label(x, 840, 1130, 'WIFI: 1 BAR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#b36cff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Hired the cat | as an *intern.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 1090, 'INTERN', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'first task: nap', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Invented a standing desk. | It *floats.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), fl = Math.sin(t * 2) * 16 - ease.outCubic(clamp((lt - 0.5) / 0.6)) * 70
      if (k > 0.01) {
        x.save(); x.translate(790, 980 + fl); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -20, 300, 40); x.fillStyle = '#5fd0e0'; x.fillRect(-142, -14, 284, 28)
        x.restore()
        laptop(x, 790, 880 + fl, 0.7 * k, { screen: '#8fe3ff' })
      }
      sparkles(x, t, 790, 1040, P.t0 + 0.9, 7, 140, 0.4, [SKYB, LAV, BONE])
      label(x, 790, 1140, 'GRAVITY: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Ten-minute break. | Cried *at a cloud.*', mood: 'sparkle', tears: 3, look: [1, -1], star: { x: -200, y: 40 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { G: '#ffffff' }, 790 + Math.sin(t) * 20, 720, 22 * pop01(t, P.t0 + 0.2, 0.4, 2))
      bubble(x, 790, 1060, 'it looked like a duck', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0195', key: 'F', accent: PEACH, ending: 'callback',
  title: 'Signs working | *from home.*',
  cameos: CAMEOS,
  group: { cap: 'Productive? | *Technically.*' },
  last: {
    text: 'The cat intern? | Got *promoted.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CAT, CAT_C, 540, 1060, 30 * pop01(t, t0 + 0.4, 0.4, 2))
      label(x, 540, 1260, 'MANAGER', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1060, t0 + 1.25, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
