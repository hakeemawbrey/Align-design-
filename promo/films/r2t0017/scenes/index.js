// r2t0017: star_talk, SOLO, "How to spot | a Sagittarius." (~46 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: callback (the signpost from the last card returns).
//   0.0–3.6    "How to spot | *a Sagittarius.*"
//   3.6–37.8   laughing loudest at their own joke · hiking boots at a wedding · "one quick question" (question 40)
//              · a map open in the grocery store · mid-sentence? already left · zero calendars, lives by vibes
//              · profile status: "back in five years" · cooking? every spice · lost? calls it a shortcut
//  37.8        "Follow the laugh. | *Found one.*"
//  41.2        CALLBACK: "Last seen: | *taking a shortcut.*"  The signpost, and a dust cloud.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ff9a4a', BROWN = '#8a5a3a', GREEN = '#7ee08a', RED = '#e23d4e'

// ── props
const BOOT = [
  '..BBBB....',
  '..BLBB....',
  '..BBBB....',
  '..BLBB....',
  '..BBBBBB..',
  '.BBBBBBBBB',
  'KKKKKKKKKK',
]
const MAP = [
  'YYYYYYYYYYYYYY',
  'YGGYYYBBBYYYYY',
  'YGGGYYYBBYYRYY',
  'YYGYYYYYYYRRRY',
  'YYYYKYKYKYYRYY',
  'YBBYYYYYYKYYYY',
  'YBBBYYGGYYKYYY',
  'YYYYYGGGGYYKYY',
  'YYYYYYYYYYYYRY',
  'YYYYYYYYYYYYYY',
]
const MAP_C = { Y: '#f5e0a8', G: GREEN, B: SKYB, R: RED, K: '#8a5a3a' }
const DOOR = [
  'DDDDDDDD',
  'DWWWWWWD',
  'DWWWWWWD',
  'DWWWWWWD',
  'DWWWWWKD',
  'DWWWWWWD',
  'DWWWWWWD',
  'DWWWWWWD',
  'DWWWWWWD',
]
function dust(x, t, cx, cy, k, seed = 0) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  for (let i = 0; i < 6; i++) { const r = 26 + 14 * Math.sin(t * 6 + i + seed); x.fillStyle = i % 2 ? BONE : '#c9b8a8'; x.beginPath(); x.arc(cx + (i - 2.5) * 34, cy + Math.sin(i * 1.7) * 18, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function calendar(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -120, 260, 240); x.fillStyle = BONE; x.fillRect(-120, -110, 240, 220)
  x.fillStyle = RED; x.fillRect(-120, -110, 240, 50)
  x.fillStyle = '#c9b8a8'; for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) x.fillRect(-100 + i * 42, -40 + j * 36, 30, 24)
  if (cross > 0) { x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, -100); x.lineTo(-110 + 220 * cross, -100 + 200 * cross); x.stroke() }
  x.restore()
}
const JAR = ['.KK.', 'SSSS', 'SSSS', 'SSSS', 'SSSS']
function signpost(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(1.3 * k, 1.3 * k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 330); x.fillStyle = BROWN; x.fillRect(-8, -146, 16, 322)
  const arms = [[-0.15, ORANGE, 'THIS WAY'], [0.2, GOLD, 'NO, THIS'], [-0.05, MINT, 'BOTH?']]
  arms.forEach(([r, c, s], i) => {
    x.save(); x.translate(0, -120 + i * 74); x.rotate(r + 0.05 * Math.sin(t * 3 + i)); const d = i % 2 ? -1 : 1
    x.fillStyle = INK; x.fillRect(d > 0 ? -10 : -190, -28, 200, 56); x.fillStyle = c; x.fillRect(d > 0 ? -4 : -184, -22, 188, 44)
    x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, d * 90, 2)
    x.restore()
  })
  x.restore()
}

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Laughing the loudest. | At *their own joke.*', mood: 'happy', star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'HA HA HA!!', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 + 0.06 * Math.sin(t * 20)), { size: 56, col: ORANGE, tail: 'bl' })
      label(x, 790, 1000, 'VOLUME: 11', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wedding dress code? | *Hiking boots.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOT, { B: BROWN, L: GOLD, K: INK }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'BLACK TIE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'TRAIL-READY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“One quick question.” | *Asks forty.*', mood: 'wide', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.min(39, Math.floor(prog(lt, 0.3, 1.6) * 39.99))
      label(x, 790, 760, `QUESTION ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'but WHY | though?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'A map open | *in the grocery store.*', mood: 'sparkle', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1090, 'AISLE 7: EXPLORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mid-sentence? | *Already left.*', hideStar: false, mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, { D: BROWN, W: '#2a2350', K: GOLD }, 800, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 600, 600, 'so anyway I—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      dust(x, t, 800, 1040, pop01(t, P.t0 + 1.1, 0.3, 2), 1)
      label(x, 800, 1150, 'BYE!!', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 44, bg: ORANGE, rot: 0.06, font: MONO, weight: 700 })
    },
    look: [1, 0], squash: 0 },
  { sign: S, cap: 'Owns zero calendars. | Runs *on vibes.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.8, 1.2)))
      label(x, 790, 1100, 'PLANS: MAYBE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Profile status: | *“Back in five years.”*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#140c30'; x.fillRect(-140, -180, 280, 360)
        x.strokeStyle = ORANGE; x.lineWidth = 6; x.strokeRect(-140, -180, 280, 360)
        x.restore()
        signChar(x, t, S, 790, 790, 150 * k, { mood: 'happy', seed: 33, glyph: false })
      }
      label(x, 790, 960, 'STATUS: AWAY', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: ORANGE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1100, '✦ BACK IN 5 YRS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Following a recipe? | *Every spice. Every one.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const cols = [RED, GOLD, GREEN, ORANGE, LAV]
      cols.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2.2); drawBits(x, JAR, { K: INK, S: c }, 690 + i * 55 + Math.sin(t * 7 + i) * 6, 900 - (i % 2) * 80, 18 * k, { rot: Math.sin(t * 5 + i) * 0.3 }) })
      label(x, 790, 1100, 'RECIPE: IGNORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Totally lost? | *Calls it a shortcut.*', mood: 'sparkle', look: [1, -1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      signpost(x, 740, 880, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 800, 1160, 'SHORTCUT #9', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0017', key: 'E', accent: ORANGE, solo: 'sagittarius', ending: 'callback',
  title: 'How to spot | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Follow the laugh. | *Found one.*', mood: 'happy' },
  last: {
    text: 'Last seen: | *taking a shortcut.*',
    draw(x, t, lt) {
      signpost(x, 360, 1060, pop01(t, t - lt + 0.4, 0.35, 2), t)
      const run = ease.inCubic(prog(lt, 1.6, 2.6))
      const k = pop01(t, t - lt + 0.7, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, lerp(720, 1200, run), 1130, 220 * k, { mood: 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.0, t - lt + 1.6] })
      dust(x, t, 700, 1230, ease.outCubic(prog(lt, 1.7, 2.0)) * (1 - prog(lt, 3.0, 3.8)), 2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
