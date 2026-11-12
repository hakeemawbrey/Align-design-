// r2a0326: star_advice, ADVICE SOLO (aquarius), "Aquarius, protect | your peace." (signs3kit social cut, music: lofi · D).
// Nine warm cards, each a relatable Aquarius truth + a kind reframe, one visual gag each. Ending: lesson.
//   a day offline · the 400-message group chat · not every debate needs you · the 3 a.m. rhythm · saving the world
//   (with breaks) · cancelled plans, secretly thrilled · love some people from a distance · your own corner · different
//   is your gift.   Group: "Quiet mode: on. | Heart: still open."   Lesson: "Your peace isn't selfish. | It's how you shine."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ACC = '#6fc3ff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …]; badge = a red count */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, badge = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  if (badge) {
    x.font = `800 40px ${INTER}`; const w = Math.max(80, x.measureText(badge).width + 36)
    x.fillStyle = INK; x.fillRect(110 - w / 2 - 6, -236, w + 12, 76); x.fillStyle = RED; x.fillRect(110 - w / 2, -230, w, 64)
    x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText(badge, 110, -196)
  }
  x.restore()
}
/** a sticker crossed out, then swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
const MOON = ['...YYYY.', '..YYY...', '.YYY....', 'YYYY....', 'YYYY....', 'YYYY....', '.YYY....', '..YYY...', '...YYYY.']
const GLOBE = ['...BBBBB...', '.BBGGBBBBB.', 'BBGGGGBBGBB', 'BGGGGBBGGGB', 'BBGGBBBGGGB', 'BBBBBBBBGBB', 'BBBGGBBBBBB', '.BBGGGBBBB.', '...BBBBB...']
const BATT = ['KKKKKKKKKKKK.', 'K..........KK', 'K..........KK', 'K..........KK', 'KKKKKKKKKKKK.']
const SHIELD = ['YYYYYYYYYYY', 'YBBBBBBBBBY', 'YBBBBWBBBBY', 'YBBBWWWBBBY', 'YBBWWWWWBBY', 'YBBBWWWBBBY', '.YBBBWBBBY.', '..YBBBBBY..', '...YBBBY...', '....YYY....']
const CAL = ['RRRRRRRRRR', 'RRRRRRRRRR', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const ST = { x: -170 }
const S = 'aquarius'

const CAMEOS = [
  { sign: S, cap: 'Need a day offline? | *Take it.* No essay.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'STATUS', headCol: ACC, lines: [
        ['offline today', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['enjoy it!', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['see u tmrw ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      L(x, 800, 1120, 'EXPLANATION: NONE', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Group chat at 400? | *Mute is self-care.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const n = lt < 1.3 ? 400 + Math.floor(lt * 30) : null
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: PINK, badge: n ? String(n) : null, lines: [
        ['did u see', BONE, 1], ['omg', BONE, 1, true], ['wait WHAT', BONE, 1],
      ] })
      L(x, 800, 1130, 'MUTED. BLISS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Not every debate | needs *your reply.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'well, actually…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: '#c9c9d8', tail: 'bl' })
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) swapLabel(x, 790, 900, lt, 0.9, 'TYPING ESSAY…', 'LOG OFF. SMILE.', { size: 34, toBg: ACC })
    } },
  { sign: S, cap: 'Awake at 3 a.m. again? | *Your rhythm counts.*', mood: 'sparkle', look: [1, -1], star: ST,
    back(x, t, lt, P) { drawBits(x, MOON, { Y: '#ffe76a' }, 820, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 800, 860, '3:07 AM', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, 0.03, 52)
      bubble(x, 800, 1040, 'peak genius hour', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Fixing the whole world? | *Breaks are allowed.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GLOBE, { B: '#4a8ee0', G: '#5fd068' }, 800, 830, 22 * k, { rot: 0.1 * Math.sin(t * 1.5) })
      L(x, 870, 700, 'BRB', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.12, 40)
      L(x, 800, 1100, 'WORLD: STILL HERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Plans cancelled? | *Secretly thrilled.* That’s fine.', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAL, { R: RED, W: CREAM }, 800, 830, 26 * k)
      if (k > 0.5) {
        x.save(); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('PARTY 8PM', 800, 860); x.restore()
        const p = clamp((lt - 0.7) / 0.3)
        if (p > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(680, 870); x.lineTo(680 + 240 * p, 830); x.stroke(); x.restore() }
      }
      L(x, 800, 1080, 'NEW PLAN: PAJAMAS', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Some people drain you? | *Love them from afar.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      drawBits(x, BATT, { K: INK }, 800, 820, 24 * k)
      const lvl = lt < 1.0 ? 0.15 : clamp(0.15 + (lt - 1.0) * 0.7)
      x.save(); x.fillStyle = lvl < 0.3 ? RED : MINT; x.fillRect(800 - 6.5 * 24 + 24, 820 - 2.5 * 24 + 24, 10 * 24 * lvl * k, 3 * 24 * k); x.restore()
      L(x, 800, 1000, lt < 1.0 ? 'BATTERY: 15%' : 'RECHARGING ♡', 1, lt < 1.0 ? '#c9c9d8' : MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Need your own corner? | *Claim it.*', mood: 'happy', look: [1, 0], star: { x: -150, y: 40, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(390, 1110); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 10); x.lineTo(0, -430); x.lineTo(250, 10); x.closePath(); x.fill()
      x.fillStyle = PINK; x.beginPath(); x.moveTo(-234, 0); x.lineTo(0, -410); x.lineTo(234, 0); x.closePath(); x.fill()
      x.fillStyle = '#ffd1e0'; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-180 + i * 120, 0); x.lineTo(-40 + i * 30, -330); x.lineTo(-10 + i * 30, -330); x.lineTo(-120 + i * 120, 0); x.closePath(); x.fill() }
      x.fillStyle = '#2a1c50'; x.beginPath(); x.moveTo(-130, 0); x.lineTo(0, -240); x.lineTo(130, 0); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      if (lt > 0.9) notesFloat(x, t, 560, 760)
      L(x, 790, 760, 'BLANKET FORT', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 790, 1000, 'AQUARIUS ZONE ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, -0.04, 36)
    } },
  { sign: S, cap: 'Different is your gift. | *Guard it gently.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHIELD, { Y: GOLD, B: ACC, W: '#ffffff' }, 800, 840, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 840, P.t0 + 0.6, 8, 170, 0.4)
      L(x, 800, 1080, 'ONE OF ONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
    } },
]
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function notesFloat(x, t, cx, cy) {
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; drawBits(x, NOTE, { X: i % 2 ? GOLD : BONE }, cx + i * 50, cy - ph * 160, 8, { alpha: Math.sin(Math.PI * ph) }) }
}

const F = makeFilm({
  id: 'r2a0326', key: 'D', accent: ACC, solo: 'aquarius', ending: 'lesson',
  title: 'Aquarius, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet mode: on. | *Heart: still open.*', mood: 'heart' },
  lesson: { text: 'Your peace isn’t selfish. | It’s *how you shine.*', chip: 'PEACE: PROTECTED' },
  last: { text: 'Recharged. | *Weirder than ever.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
