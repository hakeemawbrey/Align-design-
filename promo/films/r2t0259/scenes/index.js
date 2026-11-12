// r2t0259: star_talk, ROLLCALL, "The signs as | flight attendants." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one the most extreme flight attendant they could possibly be.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ safety demo in four seconds · ♉ the snack cart, mostly eaten · ♊ the announcement, forty minutes
//              · ♋ tucked in every passenger · ♌ the safety demo got an encore · ♍ napkins folded into swans
//              · ♎ seated everyone by compatibility · ♏ knew your juice order before you boarded
//              · ♐ asked the pilot for a quick detour · ♑ ran the cabin like a board meeting · ♒ redesigned the safety card
//              · ♓ waved goodbye to every passenger, sobbing
//  49.2        group ending: "Please fasten | your *feelings.*"  A little "ding!" over the cabin crew photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const NAVY = '#5b7bd8', RED = '#e23d4e', CREAM = '#fff4e2', CLOUDC = '#d8e4ff'

// ── props
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const SWAN = [
  '..WW......',
  '.WWWK.....',
  '..WWO.....',
  '..WW......',
  '..WW......',
  '..WW...WW.',
  '..WWWWWWWW',
  '.WWWWWWWWW',
  'WWWWWWWWW.',
  '.WWWWWWW..',
]
const SWAN_C = { W: '#ffffff', K: INK, O: '#ffb34a' }
const BLANKET = ['..BBBBBB..', '.BbBBBBbB.', 'BBBBBBBBBB', 'BbBBBBBBbB', 'BBBBBBBBBB', '.BBBBBBBB.']
const CUP = ['WWWWWW', 'WOOOOW', 'WOOOOW', 'WOOOOW', '.WOOW.', '.WWWW.']
const CUP_C = { W: '#ffffff', O: '#ffd23a' }
const BAGSNACK = ['RRRRRRR', 'RYYYYYR', 'RYRRRYR', 'RYYYYYR', 'R.RRR.R', '.......']

// a little snack cart
function cart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -140, 240, 260)
  x.fillStyle = '#c9c9d8'; x.fillRect(-112, -132, 224, 244)
  x.fillStyle = '#8a8aa0'; x.fillRect(-112, -40, 224, 8); x.fillRect(-112, 40, 224, 8)
  const left = Math.max(0, 6 - Math.floor(clamp((lt - 0.4) / 1.4) * 6))
  for (let i = 0; i < 6; i++) {
    const r = Math.floor(i / 3), c = i % 3
    if (i < left) drawBits(x, BAGSNACK, { R: RED, Y: '#ffd23a' }, -66 + c * 66, -88 + r * 80, 7)
    else { x.fillStyle = '#e6dfd0'; x.fillRect(-84 + c * 66, -96 + r * 80, 36, 14) }
  }
  x.fillStyle = INK; x.beginPath(); x.arc(-80, 128, 14, 0, Math.PI * 2); x.arc(80, 128, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a seat map: rows of seats, hearts appear between matched pairs
function seats(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = '#2a2350'; x.fillRect(-154, -174, 308, 348)
  x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEAT MAP', 0, -148)
  const COLS = [PINK, SKYB, MINT, GOLD, LAV, '#ff9a4a']
  for (let r = 0; r < 4; r++) for (let s = 0; s < 4; s++) {
    const px = -110 + s * 64 + (s > 1 ? 28 : 0) - 14, py = -100 + r * 66
    x.fillStyle = COLS[(r * 2 + Math.floor(s / 2)) % 6]; x.fillRect(px - 24, py - 22, 48, 44)
    x.fillStyle = INK; x.fillRect(px - 24, py + 14, 48, 8)
  }
  for (let r = 0; r < 4; r++) for (let side = 0; side < 2; side++) {
    if (lt < 0.7 + (r * 2 + side) * 0.12) continue
    const px = side ? 64 : -110 + 32 - 14, py = -100 + r * 66
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, side ? 78 : -92, py, 4.5)
  }
  x.restore()
}
// a slide on a little easel: a bar chart titled Q3 SNACKS
function slide(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 230); x.fillRect(-6, 100, 12, 90); x.fillRect(-60, 180, 120, 10)
  x.fillStyle = CREAM; x.fillRect(-152, -122, 304, 214)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Q3 SNACKS', 0, -92)
  const g = ease.outCubic(prog(lt, 0.4, 1.2))
  ;[0.4, 0.65, 0.5, 0.95].forEach((h, i) => { x.fillStyle = [SKYB, MINT, LAV, GOLD][i]; x.fillRect(-110 + i * 60, 76 - 120 * h * g, 40, 120 * h * g) })
  x.fillStyle = INK; x.fillRect(-130, 76, 260, 4)
  x.restore()
}
// a safety card, redesigned as abstract shapes
function safetyCard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -170, 276, 356)
  x.fillStyle = INK; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = CREAM; x.fillRect(-134, -174, 268, 348)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAFETY CARD v2', 0, -148)
  const r = ease.outBack(clamp((lt - 0.5) / 0.6))
  if (r > 0.01) {
    x.fillStyle = PINK; x.beginPath(); x.arc(-40, -40, 60 * r, 0, Math.PI * 2); x.fill()
    x.fillStyle = SKYB; x.save(); x.translate(50, 20); x.rotate(t * 0.8); x.fillRect(-50 * r, -50 * r, 100 * r, 100 * r); x.restore()
    x.fillStyle = '#ffd23a'; x.beginPath(); x.moveTo(-90, 140); x.lineTo(-20, 40 + 100 * (1 - r)); x.lineTo(40, 140); x.closePath(); x.fill()
  }
  x.restore()
}
// a route map: a straight line that becomes a zig-zag
function route(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 276)
  x.fillStyle = INK; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = '#9fd8b0'; x.fillRect(-154, -134, 308, 268)
  x.fillStyle = SKYB; x.fillRect(-154, 30, 308, 104)
  const z = ease.inOutCubic(prog(lt, 0.6, 1.3))
  const P = [[-120, 90], [-60, lerp(54, -90, z)], [0, lerp(18, 80, z)], [60, lerp(-18, -100, z)], [120, -90]]
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke(); x.setLineDash([])
  x.fillStyle = INK; for (const [a, b] of [P[0], P[4]]) { x.beginPath(); x.arc(a, b, 12, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// clapping hands (two little pixel palms) around a point
function claps(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const HAND = ['.KK.KK.', 'KHHKHHK', 'KHHHHHK', 'KHHHHHK', '.KHHHK.', '..KKK..']
  for (let i = 0; i < 4; i++) {
    const a = i * 1.7, px = cx + Math.cos(a) * 230, py = cy + Math.sin(a) * 150
    const s = 1 + 0.2 * Math.sin(t * 18 + i)
    drawBits(x, HAND, { K: INK, H: '#ffcf9a' }, px, py, 7 * k * s, { outline: null })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Safety demo? | Done *in four seconds.*', mood: 'squint', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.7, 1.0, 1.3],
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.0) * 4))
      label(x, 800, 820, `0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 84, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 800, 1020, 'NEW RECORD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'ANY QUESTIONS? NO? GOOD.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 26, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'The snack cart? | *Mostly eaten.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      cart(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 650, 'QUALITY CHECK', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'The announcement? | *Forty minutes long.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy + 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.35 })
      const m = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 39)
      label(x, 800, 650, `MINUTE ${m}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1060, '…and ANOTHER thing', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Tucked in | *every single passenger.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      ;['taurus', 'libra', 'aquarius'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        if (k <= 0.01) return
        const cx = 650 + i * 120, cy = 980 - (i % 2) * 40
        signChar(x, t, id, cx, cy - 20, 120 * k, { mood: lt > 0.9 + i * 0.2 ? 'sleepy' : 'happy', seed: 60 + i, glyph: false, zzz: false })
        drawBits(x, BLANKET, { B: [SKYB, PINK, MINT][i], b: '#ffffff' }, cx, cy + 30, 10 * k)
      })
      label(x, 790, 660, 'NIGHT NIGHT ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The safety demo | *got an encore.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      if (lt > 0.6) claps(x, t, F.x + 180, F.cy - 20, pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 650, 'ENCORE!!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 50, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 1080, 'and the exits | are HERE ✦', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Folded the napkins | *into swans.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      ;[0, 1, 2].forEach(i => drawBits(x, SWAN, SWAN_C, 690 + i * 115, 900 - (i % 2) * 40, 11 * pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2), { sx: i % 2 ? -1 : 1 }))
      label(x, 800, 1080, 'ROW 1 OF 32', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Seated everyone | *by compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      seats(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1100, 'ROW 4: ALIGNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew your juice order | *before you boarded.*', mood: 'squint', look: [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 800, 880, 20 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 800, 660, 'APPLE. NO ICE.', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'right?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Asked the pilot | for a *quick detour.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      route(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1080, 'ETA: WHO KNOWS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ran the cabin | like *a board meeting.*', mood: 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      slide(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 420, 640, 'questions at the end', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 28, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'The safety card? | *Redesigned it.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      safetyCard(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1090, 'VERY CLEAR (?)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Waved goodbye to everyone. | *Sobbing.*', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 1, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'bye!! I’ll | miss you!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1060, 'FLIGHT: 50 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0259', key: 'D', accent: NAVY, ending: 'group',
  title: 'The signs as | *flight attendants.*',
  cameos: CAMEOS,
  group: {
    cap: 'Please fasten | *your feelings.*',
    draw(x, t, lt) {
      label(x, 540, 660, '✦ DING ✦', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
