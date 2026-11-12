// r2a0143: star_advice, ADVICE SOLO, "Signs an Aquarius | needs a break." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable sign of Aquarius burnout + a warm reframe.
// Ending: group (the group beat is the punchline; no lesson, no last line).
//   0.0–3.6    "Signs an Aquarius | *needs a break.*"
//   3.6–37.8   nine cards (3.8 s each):
//              said "I'm fine" five times · saving the world all day (a globe on a 14-hour shift) · forty tabs open
//              · everyone left on read · the plant is drooping, so are you (water both) · hiding with the host's cat
//              · planning a revolution (protest sign: NAP FIRST) · mentally on another planet · the right match gives you space
//  37.8        "Rest is | *revolutionary* too."  Aquarius comes back, big.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#6fc3ff', RED = '#e23d4e'
const S = 'aquarius'

// ── props
const GLOBE = [
  '....BBBBB....',
  '..BBGGBBBBB..',
  '.BBGGGGBBGBB.',
  '.BGGGGBBBGGB.',
  'BBBGGBBBGGGBB',
  'BBBBBBBBGGGBB',
  'BBGBBBBBBGBBB',
  'BGGGBBBBBBBBB',
  '.BGGGBBBGGBB.',
  '.BBGBBBGGGBB.',
  '..BBBBBBGBB..',
  '....BBBBB....',
]
const GLOBE_C = { B: '#3d8fd8', G: '#5fd068' }
function browser(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-190, -130, 396, 280)
  x.fillStyle = INK; x.fillRect(-202, -142, 404, 284)
  x.fillStyle = '#d8dbe8'; x.fillRect(-194, -134, 388, 268)
  const w = 376 / Math.max(1, n)
  for (let i = 0; i < n; i++) { x.fillStyle = i % 2 ? '#9aa5c4' : '#b8bfd8'; x.fillRect(-188 + i * w, -128, Math.max(2, w - 2), 34) }
  x.fillStyle = BONE; x.fillRect(-188, -88, 376, 216)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 5; i++) x.fillRect(-160, -60 + i * 36, 260 - (i % 2) * 80, 12)
  x.restore()
}
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
// a potted plant that droops, then perks up when watered
function plant(x, t, cx, cy, k, perk) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-86, 0, 172, 150); x.fillStyle = '#c96a3a'; x.fillRect(-78, 8, 156, 134); x.fillStyle = '#a8542a'; x.fillRect(-78, 8, 156, 24)
  x.strokeStyle = INK; x.lineWidth = 14; x.lineCap = 'round'
  const droop = 1 - perk
  for (const s of [-1, 0, 1]) {
    x.beginPath(); x.moveTo(s * 20, 4)
    const tx = s * 70 + s * droop * 50, ty = -170 + droop * 150
    x.quadraticCurveTo(s * 30, -120, tx, ty); x.stroke()
    x.save(); x.strokeStyle = '#5fd068'; x.lineWidth = 8; x.beginPath(); x.moveTo(s * 20, 4); x.quadraticCurveTo(s * 30, -120, tx, ty); x.stroke(); x.restore()
    x.fillStyle = INK; x.beginPath(); x.ellipse(tx, ty, 34, 20, s * 0.6 + droop * s * 0.8, 0, 7); x.fill()
    x.fillStyle = '#5fd068'; x.beginPath(); x.ellipse(tx, ty, 27, 14, s * 0.6 + droop * s * 0.8, 0, 7); x.fill()
  }
  x.restore()
}
const CAN = ['......K.', '.....K..', 'BBBBBK..', 'BBBBBB..', 'BBBBBBBB', 'BBBBB...', 'BBBBB...']
const CAT = [
  'K...K.....',
  'KK.KK.....',
  'KKKKK.....',
  'KGKGK....K',
  'KKPKK...K.',
  '.KKKKKKKK.',
  '.KKKKKKKK.',
  '.KK.KK.KK.',
]
const CAT_C = { K: '#9a8fb0', G: MINT, P: PINK }
function sign(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06 + 0.04 * Math.sin(cx)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 40, 20, 240); x.fillStyle = '#c98f2a'; x.fillRect(-6, 44, 12, 232)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 160); x.fillStyle = BONE; x.fillRect(-162, -102, 324, 144)
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -30 + (i - (a.length - 1) / 2) * 52))
  x.restore()
}
function planet(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill()
  x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.fill()
  x.fillStyle = '#a07ce8'; x.beginPath(); x.arc(-30, -30, 24, 0, 7); x.arc(36, 30, 16, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.ellipse(0, 0, 180, 40, -0.25, 0, 7); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 7; x.beginPath(); x.ellipse(0, 0, 180, 40, -0.25, 0, 7); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Said “I’m fine” | *five times today?* Rest.', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['fine', 'fine!', 'totally fine', 'fine :)'].forEach((s, i) => bubble(x, 760 + (i % 2) * 60, 680 + i * 120, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2.2), { size: 34, col: i === 3 ? LAV : BONE, tail: 'bl' }))
    } },
  { sign: S, cap: 'Saving the world all day? | *It can wait.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 790, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      label(x, 790, 640, 'SHIFT: 14 HOURS', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'BACK TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty tabs open? | Your mind *deserves fewer.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = lt < 1.5 ? 4 + Math.floor(clamp(lt / 1.2) * 36) : 3
      browser(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      label(x, 790, 1080, `TABS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 34, bg: lt < 1.5 ? RED : MINT, color: lt < 1.5 ? '#fff4e2' : INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left everyone on read? | *Reply tomorrow.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = RED; x.beginPath(); x.arc(0, -40, 70, 0, 7); x.fill()
        x.fillStyle = '#fff4e2'; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(Math.min(37, 3 + Math.floor(lt * 18))), 0, -38)
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('UNREAD', 0, 70)
      })
      label(x, 790, 1130, 'THEY’LL WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plant’s drooping? | *So are you.* Water both.', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const perk = ease.outBack(prog(lt, 1.2, 1.7))
      plant(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), perk)
      const pour = prog(lt, 0.7, 1.4)
      if (pour > 0 && pour < 1) {
        drawBits(x, CAN, { B: SKYB, K: INK }, 640, 720, 14, { rot: 0.5 })
        x.fillStyle = SKYB; for (let i = 0; i < 4; i++) x.fillRect(700 + i * 10, 760 + ((t * 600 + i * 40) % 140), 8, 18)
      }
      if (lt > 1.4) bubble(x, 900, 640, 'ahh', pop01(t, P.t0 + 1.5 * 1.29, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Hiding with the host’s cat? | *Valid break.*', mood: 'heart', look: [1, 0], star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 780, 950, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      bubble(x, 780, 700, 'purr', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      label(x, 780, 1140, 'PARTY: LATER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planning a revolution? | *Nap first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      sign(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 'NAP | FIRST' : 'CHANGE | EVERYTHING')
    } },
  { sign: S, cap: 'Mentally on another planet? | *Come back gently.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      planet(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1060, 'WELCOME BACK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.6, 7, 200, 0.5)
    } },
  { sign: S, cap: 'The right match | *gives you space.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 860, 930, 200 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      label(x, 760, 680, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 700, 1130, '↔ PLENTY OF SPACE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0143', key: 'C', accent: AQ, solo: S, ending: 'group',
  title: 'Signs an Aquarius | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Rest is | *revolutionary* too.', mood: 'happy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
