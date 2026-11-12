// v3a059: zodiac.advice444, ADVICE SOLO, "Dear Gemini: | it's okay." (~49 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): a soft Gemini truth, a warm "it's okay", one gag each.
//   0.0–3.6    "Dear Gemini: | *it’s okay.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              an order slip: latte → tea → latte: FINAL ANSWER (FOR NOW) · yarn, paintbrush, ukulele: THREE HOBBIES. ALL VALID.
//              · a speech bubble that just says "…": SOCIAL BATTERY: LOW · half sun, half rain: BOTH REAL
//              · the party hat comes off: OFF THE CLOCK · a half-painted canvas: 60% DONE · a phone at night,
//              12 unread: TOMORROW · a stack of books, bookmarks in all of them · Cancer: "you're a great listener"
//  37.8        "Two sides. | *Both lovable.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "All of you | *is welcome here.*"  TWINS: HUGGED
//  46.9        "Changed your mind? | *Still okay.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEMON = '#ffe066', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'gemini'

// ── props
const YARN = ['..PPPP..', '.PpPPpP.', 'PPPpPPPP', 'PpPPPpPP', 'PPPpPPpP', '.PpPPPP.', '..PPPP.P', '.......P']
const YARN_C = { P: PINK, p: '#d9608a' }
const BRUSH = ['..CC', '..CC', '.WW.', '.WW.', 'WW..', 'WW..', 'W...']
const BRUSH_C = { C: '#5fd068', W: WOOD }
const UKE = ['......KK', '.....KK.', '....KK..', '.YYKK...', 'YYYYY...', 'YYKYYY..', 'YYYYYY..', '.YYYY...']
const UKE_C = { Y: '#e7b46a', K: '#5b2e1a' }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PPYPPPP.', 'PPPPPPPPP']
const HAT_C = { P: '#7a6cd8', Y: LEMON }

function slip(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 256, 316)
  x.fillStyle = INK; x.fillRect(-130, -160, 260, 320)
  x.fillStyle = '#fffaf0'; x.fillRect(-122, -152, 244, 304)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ORDER', 0, -118)
  x.font = `800 38px ${INTER}`
  const items = ['latte', 'tea', 'latte!']
  items.forEach((it, i) => {
    const p = clamp((lt - 0.4 - i * 0.35) * 4)
    if (p <= 0) return
    const y = -54 + i * 70
    x.globalAlpha = p; x.fillStyle = INK; x.fillText(it, 0, y)
    if (i < 2 && lt > 0.75 + i * 0.35) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-60, y); x.lineTo(60, y); x.stroke() }
    x.globalAlpha = 1
  })
  x.restore()
}
function splitWeather(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#8fd0ff'; x.fillRect(-160, -160, 160, 320)
  x.fillStyle = '#5a5a7a'; x.fillRect(0, -160, 160, 320)
  x.fillStyle = LEMON; x.beginPath(); x.arc(-70, -10, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b9b6cc'; x.beginPath(); x.arc(60, -40, 36, 0, Math.PI * 2); x.arc(100, -30, 30, 0, Math.PI * 2); x.arc(80, -60, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; x.fillRect(40 + (i % 3) * 30, 0 + ph * 120, 6, 18) }
  x.restore()
  x.fillStyle = INK; x.fillRect(-4, -170, 8, 340)
  x.restore()
}
function canvasHalf(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(-100, 240); x.lineTo(0, -170); x.lineTo(100, 240); x.stroke()
  x.strokeStyle = WOOD; x.lineWidth = 9; x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 230)
  x.fillStyle = '#fffaf0'; x.fillRect(-140, -140, 280, 210)
  x.save(); x.beginPath(); x.rect(-140, -140, 168, 210); x.clip()
  x.fillStyle = '#ffb38a'; x.fillRect(-140, -140, 280, 120); x.fillStyle = '#ff8fb1'; x.fillRect(-140, -20, 280, 90)
  x.fillStyle = LEMON; x.beginPath(); x.arc(-30, -40, 44, 0, Math.PI * 2); x.fill()
  x.restore()
  x.strokeStyle = '#c9c4dd'; x.lineWidth = 3; x.setLineDash([8, 8]); x.strokeRect(28, -130, 100, 190); x.setLineDash([])
  x.restore()
}
function nightPhone(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = '#140c30'; x.fillRect(-98, -146, 196, 292)
  x.fillStyle = '#fff2b0'; x.beginPath(); x.arc(0, -40, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(22, -56, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(70, -150, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff'; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('12', 70, -148)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('11:48 PM', 0, 70)
  x.restore()
}
function books(x, cx, cy, k) {
  if (k <= 0.01) return
  const cols = ['#7a6cd8', RED, MINT, '#ffb38a', SKYB]
  cols.forEach((c, i) => {
    const kk = k
    const y = cy - i * 54, w = 260 - (i % 2) * 30, off = (i % 3 - 1) * 14
    x.save(); x.translate(cx + off * kk, y * 1); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -28, w + 12, 56)
    x.fillStyle = c; x.fillRect(-w / 2, -22, w, 44)
    x.fillStyle = '#fffaf0'; x.fillRect(w / 2 - 20, -18, 14, 36)
    x.fillStyle = LEMON; x.fillRect(-w / 2 + 40 + i * 20, -40, 16, 30)
    x.restore()
  })
}

const CAMEOS = [
  { sign: S, cap: 'Changing your mind | *is okay.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      slip(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, 'FINAL ANSWER (FOR NOW)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Three new hobbies | *this week?* Okay.', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, YARN, YARN_C, 680, 990, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BRUSH, BRUSH_C, 800, 750, 26 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, UKE, UKE_C, 880, 970, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1140, 'ALL VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Being quiet | *is okay too.*', mood: 'sleepy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 680, 660, '…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 110, tail: 'bl' })
      label(x, 790, 1090, 'SOCIAL BATTERY: LOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two moods | *in one hour?* Okay.', mood: lt => (lt * 2.5) % 2 < 1 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -230 }, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      splitWeather(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'BOTH REAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: LEMON, rot: -0.04 })
    } },
  { sign: S, cap: 'You don’t have to | *be the fun one.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, HAT, HAT_C, lerp(F.x + 10, 800, off), lerp(F.top - 50, 1040, off), 20 * P.k, { rot: lerp(-0.15, 0.9, off) })
      label(x, 790, 720, 'OFF THE CLOCK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Unfinished projects | *still count.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      canvasHalf(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1140, '60% DONE. 100% FUN.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texting back | *tomorrow* is okay.', mood: 'sleepy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      nightPhone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'TOMORROW ME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LEMON, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Curious | *isn’t the same as flaky.*', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      books(x, 790, 1040, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, '5 BOOKS. 5 BOOKMARKS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re more | *than the chatty one.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 990, 200 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 730, 650, 'you’re a GREAT | listener, btw', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'br' })
      hearts(x, t, 560, 900, P.t0 + 1.3, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a059', key: 'G', accent: LEMON, solo: S, ending: 'lesson',
  title: 'Dear Gemini: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Two sides. | *Both lovable.*', mood: 'heart' },
  lesson: { text: 'All of you | *is welcome here.*', chip: 'TWINS: HUGGED' },
  last: { text: 'Changed your mind? | *Still okay.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
