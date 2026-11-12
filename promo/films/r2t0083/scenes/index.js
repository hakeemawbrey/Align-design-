// r2t0083: star_talk, ROLLCALL, "Escape room | with every sign." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Escape room | *with every sign.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one escape room per sign (3.8 s each):
//              ♈ kicked the door, it was a pull door · ♉ ate the clue (a cookie) · ♊ solved it, argued with themself
//              · ♋ made the room cosy · ♌ one clue, a victory lap · ♍ didn't escape, organised the clues
//              · ♎ two doors, still choosing · ♏ found a secret room in the secret room · ♐ escaped through the window
//              · ♑ a five-step escape plan · ♒ read the room's birth chart · ♓ felt bad for the locked door
//  49.2        "Time’s up. | *Nobody escaped.*"  The twelve fly up into a group photo.
//  52.6        callback: "The exit? | *Also a pull door.*"  The door comes back: PULL.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#a0623a', DARKW = '#6a3a22'

// a wooden door with a sign; open (0..1) swings it, glow paints light behind
function door(x, cx, cy, k, { sign = null, signCol = GOLD, open = 0, w = 200, h = 330, glow = null, shake = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + shake, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 14)
  x.fillStyle = glow || '#0b0720'; x.fillRect(-w / 2, -h / 2, w, h)
  const dw = w * (1 - 0.8 * open)
  x.fillStyle = WOOD; x.fillRect(-w / 2, -h / 2, dw, h)
  x.fillStyle = DARKW; x.fillRect(-w / 2 + dw * 0.12, -h / 2 + 24, dw * 0.76, h * 0.36); x.fillRect(-w / 2 + dw * 0.12, -h / 2 + h * 0.5, dw * 0.76, h * 0.4)
  x.fillStyle = GOLD; x.fillRect(-w / 2 + dw - 34, 0, 16, 16)
  x.restore()
  if (sign) label(x, cx + shake, cy - h / 2 * k + 40 * k, sign, k, { size: 34, bg: signCol, rot: -0.04, font: MONO, weight: 700 })
}
const COOKIE = ['..CCCCC..', '.CCKCCCC.', 'CCCCCCKCC', 'CKCCCCCCC', 'CCCCKCCCC', '.CCCCCCK.', '..CCCCC..']
const COOKIE_C = { C: '#d9a05b', K: '#5a3420' }
const LAMP = ['.YYYYY.', 'YYYYYYY', '...K...', '...K...', '...K...', '..KKK..']
const TROPHY = ['YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '...Y...', '..YYY..', '.KKKKK.']
const WINDOW = [
  'KKKKKKKKKK',
  'KSSSSKSSSK',
  'KSSSSKSSSK',
  'KSSSSKSSSK',
  'KKKKKKKKKK',
  'KSSSSKSSSK',
  'KSSSSKSSSK',
  'KKKKKKKKKK',
]
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.45 - 6, Math.sin(a) * r * 0.45 - 6, 12, 12)
  x.restore()
}
function clipboard(x, cx, cy, k, lt, items) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = WOOD; x.fillRect(-132, -182, 264, 364)
  x.fillStyle = CREAM; x.fillRect(-116, -150, 232, 316); x.fillStyle = '#9aa5c4'; x.fillRect(-40, -196, 80, 30)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  items.forEach((it, i) => { if (lt > 0.3 + i * 0.25) x.fillText(`${i + 1}. ${it}`, -100, -110 + i * 62) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Kicked the door down. | *It was a pull door.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', star: { x: -170 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const shake = lt > 0.6 && lt < 1.2 ? Math.sin(t * 60) * 8 : 0
      door(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { shake })
      label(x, 790, 760, 'PULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ate the clue. | It was *a cookie.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const bite = Math.floor(prog(lt, 0.7, 1.5) * 3)
      const bm = COOKIE.map(r => r.split('').map((c, i) => i >= 9 - bite * 3 ? '.' : c).join(''))
      if (bite < 3) drawBits(x, bm, COOKIE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'CLUE #1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'what clue?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Solved it. | Then *argued with themself.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'squint' : 'wink', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'the code is 4!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 860, 'no, it’s 7', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      bubble(x, 760, 1060, 'says WHO?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made the room | *feel like home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.fillStyle = INK; x.fillRect(250, 1095, 420 * k, 46); x.fillStyle = PINK; x.fillRect(256, 1101, 408 * k, 34)
      x.fillStyle = CREAM; for (let i = 0; i < 6; i++) x.fillRect(270 + i * 66 * k, 1110, 28 * k, 16); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, LAMP, { Y: GOLD, K: '#c9cfe0' }, 820, 940, 30 * pop01(t, P.t0 + 0.6, 0.3, 2))
      hearts(x, t, 820, 880, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 6 })
      label(x, 800, 660, 'ROOM: COSY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Solved one clue. | Took *a victory lap.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, 800, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 * Math.sin(t * 5) })
      label(x, 800, 1090, 'CLUES LEFT: 11', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.7, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Didn’t escape. | *Organised the clues.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, GOLD, MINT]
      const L = ['KEYS', 'NOTES', 'CODES', 'MISC']
      L.forEach((l, i) => label(x, 790, 640 + i * 130, `${l} ✓`, pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2), { size: 40, bg: COLS[i], rot: 0, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Two doors. | *Still choosing.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 90, s: 230 },
    front(x, t, lt, P) {
      door(x, 280, 800, 0.8 * pop01(t, P.t0 + 0.15, 0.3, 2), { sign: 'A?', signCol: PINK })
      door(x, 800, 800, 0.8 * pop01(t, P.t0 + 0.3, 0.3, 2), { sign: 'B?', signCol: SKYB })
      label(x, 540, 610, 'TIMER: 0:01', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found a secret room | *in the secret room.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { open: ease.outCubic(prog(lt, 0.6, 1.0)), glow: '#5a2a8a' })
      if (lt > 1.0) door(x, 790, 920, 0.45 * pop01(t, P.t0 + 1.25, 0.3, 2), { open: ease.outCubic(prog(lt, 1.5, 1.9)), glow: '#c97bff' })
      label(x, 790, 660, 'LEVEL: DEEPER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Escaped. | Through *the window.*', mood: 'sparkle', star: { x: 120, y: -20 }, hops: [0.6, 1.2],
    back(x, t, lt, P) { drawBits(x, WINDOW, { K: WOOD, S: SKYB }, 660, 780, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 320, 1060, 'EXIT: CREATIVE', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 300, 700, 'bye, nerds!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Wrote a | *five-step escape plan.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) { clipboard(x, 320, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt, ['look', 'think', 'solve', 'exit', 'debrief']) } },
  { sign: 'aquarius', cap: 'Read the room’s | *birth chart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1040, 'ROOM: A GEMINI', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Felt bad for | *the locked door.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      door(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { sign: 'LOCKED', signCol: RED })
      bubble(x, 760, 620, 'it’s just | lonely', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 920, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0083', key: 'G', accent: '#ffb34a', ending: 'callback',
  title: 'Escape room | *with every sign.*',
  cameos: CAMEOS,
  group: { cap: 'Time’s up. | *Nobody escaped.*' },
  last: {
    text: 'The exit? | *Also a pull door.*',
    draw(x, t, lt) {
      door(x, 540, 1200, 1.6 * pop01(t, t - lt + 0.6, 0.35, 2), { open: ease.outCubic(prog(lt, 2.2, 2.8)), glow: '#fff1b0' })
      label(x, 540, 920, 'PULL', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 60, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
