// r2t0176: THE SIGNS AS… v3, ROLLCALL, "The signs as | the youngest child." (~62 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs as | *the youngest.*"
//   3.6–49.2   ♈ lost one race, demanded forty rematches · ♉ got the last cookie, every time · ♊ blamed the dog (no dog)
//              · ♋ moved out, still calls mom hourly · ♌ front and centre in every family photo · ♍ corrected the parents'
//              grocery list at six · ♎ settled sibling fights with compatibility charts · ♏ found every present's hiding spot
//              · ♐ siblings had curfew, Sag had a passport · ♑ the youngest, runs the family budget · ♒ invented a family
//              holiday, everyone attends · ♓ cried until they got the window seat
//  49.2        "The baby. | *Forever.*"  The twelve fly up into a group photo.
//  52.4        LESSON: "Every family needs | its *little star.*"  STATUS: SPOILED
//  58.3        "Still got | *the window seat.*" with Pisces' window back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a5a3a'

// ── props
const FLAG = ['KWBWBWB', 'KBWBWBW', 'KWBWBWB', 'KBWBWBW', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......']
const FLAG_C = { K: '#9aa5c4', W: '#fff', B: INK }
const JAR = ['..KKKKKK..', '.KKKKKKKK.', 'GGGGGGGGGG', 'G........G', 'G.CC.....G', 'G.CCC.CC.G', 'G..C..CCCG', 'G.....CC.G', 'G........G', 'GGGGGGGGGG']
const JAR_C = { K: RED, G: '#bfe8ff', C: '#c98f2a' }
const COOKIE = ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', 'CCCdCC', '.CCCC.']
const COOKIE_C = { C: '#e0a04a', d: '#5a3420' }
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKGKKK', 'KKKKKKK']
const PHONE_C = { K: '#2a2350', S: SKYB, G: '#6b62a8' }
const GIFT = ['...R..R...', '....RR....', 'PPPPRRPPPP', 'PPPPRRPPPP', 'PPPPRRPPPP', 'PPPPRRPPPP', 'PPPPRRPPPP', 'PPPPRRPPPP']
const GIFT_C = { P: PINK, R: GOLD }
const PASS = ['NNNNNNNN', 'NNNNNNNN', 'NNNYYNNN', 'NNYNNYNN', 'NNYNNYNN', 'NNNYYNNN', 'NNNNNNNN', 'NNYYYYNN', 'NNNNNNNN', 'NNNNNNNN']
const PASS_C = { N: '#2a4a9a', Y: GOLD }

function card(x, cx, cy, k, lines, { w = 330, size = 32, rot = 0.04, head = null, headBg = GOLD, strike = [] } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 56 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); y0 += 56 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    x.fillStyle = INK; x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5))
    const s = strike[i]
    if (s > 0) { const tw = x.measureText(l).width; x.fillStyle = RED; x.fillRect(-w / 2 + 18, y0 + lh * (i + 0.5) - 3, (tw + 12) * clamp(s), 7) }
  })
  x.restore()
}
function frame(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -140, 336, 296)
  x.fillStyle = INK; x.fillRect(-176, -156, 352, 312); x.fillStyle = '#c98f2a'; x.fillRect(-168, -148, 336, 296)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -120, 280, 240)
  x.restore()
  // the family: four tiny stars at the edges, Leo huge in the middle
  const ids = ['capricorn', 'cancer', 'virgo', 'taurus']
  const pos = [[-112, 70], [-60, 85], [60, 85], [112, 70]]
  if (k > 0.6) {
    x.save(); x.translate(cx, cy); x.rotate(0.05); x.translate(-cx, -cy)
    x.beginPath(); x.rect(cx - 140, cy - 120, 280, 240); x.clip()
    ids.forEach((id, i) => signChar(x, t, id, cx + pos[i][0], cy + pos[i][1], 52, { mood: 'happy', seed: 60 + i, glyph: false, glow: 0.4 }))
    signChar(x, t, 'leo', cx, cy - 10, 170, { mood: 'sparkle', seed: 64, glyph: false, glow: 0.7 })
    x.restore()
  }
}
function highChair(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK
  x.fillRect(-120, -20, 240, 40); x.fillRect(-104, 20, 30, 240); x.fillRect(74, 20, 30, 240)
  x.fillStyle = '#ff9fc0'; x.fillRect(-114, -14, 228, 28); x.fillRect(-98, 20, 18, 232); x.fillRect(80, 20, 18, 232)
  x.fillStyle = INK; x.fillRect(-90, 150, 180, 14)
  x.restore()
}
function chartWheel(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  const W = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.42 - 6, Math.sin(a) * r * 0.42 - 6, 12, 12)
  x.restore()
}
function calendar(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -142, 300, 300)
  x.fillStyle = INK; x.fillRect(-156, -156, 312, 312); x.fillStyle = BONE; x.fillRect(-148, -148, 296, 296)
  x.fillStyle = '#6fc3ff'; x.fillRect(-148, -148, 296, 70)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOLIDAY', 0, -112)
  x.font = `800 120px ${INTER}`; x.fillText('★', 0, 0)
  x.font = `800 32px ${INTER}`; x.fillText(text, 0, 100)
  x.restore()
}
function carWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-190, -150, 380, 300, 60); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.roundRect(-180, -140, 360, 280, 52); x.fill()
  x.save(); x.beginPath(); x.roundRect(-160, -120, 320, 240, 40); x.clip()
  x.fillStyle = '#8fe3ff'; x.fillRect(-160, -120, 320, 240)
  x.fillStyle = '#5fd068'; for (let i = 0; i < 5; i++) { const hx = ((i * 110 - t * 160) % 550 + 550) % 550 - 260; x.beginPath(); x.arc(hx, 120, 90, Math.PI, 0); x.fill() }
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(90, -60, 34, 0, Math.PI * 2); x.fill()
  x.restore(); x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Lost one race. | Demanded *forty rematches.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 5) })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.6) * 39)
      label(x, 790, 1120, `REMATCH #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'AGAIN!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 46, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'The last cookie? | *Every single time.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, JAR, JAR_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = ease.inOutCubic(prog(lt, 0.9, 1.5))
      if (lt > 0.9) drawBits(x, COOKIE, COOKIE_C, lerp(800, F.x + 120, m), lerp(860, F.cy + 30, m) - Math.sin(Math.PI * m) * 120, 16)
      label(x, 790, 1130, 'BABY PRIVILEGE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Blamed the dog. | They *don’t have a dog.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'the dog | did it!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 1020, 'DOGS OWNED: 0', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: '#ffd23a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Moved out. Still | calls mom *hourly.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, PHONE, PHONE_C, F.x + 150, F.cy - 10, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 })
      bubble(x, 800, 650, 'hi mom!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 8)
      label(x, 790, 1080, `CALL #${n} TODAY`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1170, 'MOM: ALSO A CANCER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Every family photo? | *Front and centre.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      frame(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2))
      sparkles(x, t, 790, 840, P.t0 + 1.0, 7, 200, 0.5)
      label(x, 790, 1110, 'THE FAMILY (LEO)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Age six. Corrected | the *grocery list.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = i => clamp((lt - 0.7 - i * 0.3) / 0.25)
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['candy', 'more candy', 'kale'], { head: 'MOM’S LIST', headBg: MINT, w: 300, size: 34, rot: 0.05, strike: [s(0), s(1), 0] })
      label(x, 790, 1120, 'REVISED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Settled sibling fights | with *compatibility charts.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: -80 },
    back(x, t, lt, P) { highChair(x, 370, 930, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      chartWheel(x, 790, 830, 130, pop01(t, P.t0 + 0.4, 0.35, 2), t)
      label(x, 790, 1080, 'SIBLINGS: ALIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found every | *present’s* hiding spot.', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, GIFT, GIFT_C, 700 + i * 95, 960 - (i % 2) * 70, 13 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.12 })
      label(x, 790, 700, 'IT’S A BIKE.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: '#c97bff', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'ACTS SURPRISED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Siblings had curfew. | Sag had *a passport.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      drawBits(x, PASS, PASS_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      const n = Math.floor(clamp((lt - 0.6) / 1.4) * 31)
      label(x, 790, 1110, `STAMPS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'back sunday!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'The youngest. Also | runs *the family budget.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ['rent: ok', 'snacks: cut', 'dad: on notice'], { head: 'FAMILY BUDGET', headBg: '#9aa5c4', w: 320, size: 30, rot: -0.05 })
      label(x, 790, 1120, 'CFO, AGE NINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a family holiday. | *Everyone attends.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 'BACKWARDS DAY')
      bubble(x, 790, 1120, 'socks on hands!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried until they got | *the window seat.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      carWindow(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, lt > 1.3 ? 'SEAT: WON' : 'SEAT: TAKEN', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: lt > 1.3 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0176', key: 'C', accent: PINK, ending: 'lesson',
  title: 'The signs as | *the youngest.*',
  cameos: CAMEOS,
  group: { cap: 'The baby. | *Forever.*' },
  lesson: { text: 'Every family needs | its *little star.*', chip: 'STATUS: SPOILED' },
  last: {
    text: 'Pisces still gets | *the window seat.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
