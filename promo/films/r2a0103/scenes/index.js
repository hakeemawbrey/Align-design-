// r2a0103: star_advice, ADVICE SOLO, "Capricorn, it's okay | to miss them." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): missing someone, for the sign that hates not being in control.
// Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Capricorn, it's okay | *to miss them.*"
//   3.6–37.8   nine cards (3.8 s each):
//              still using their mug · can't schedule missing someone (every day says "miss them") · working late to forget,
//              clock out · teared up at a song, strong people do · a text you won't send, it still counts · their favourite
//              snack, smile · strong for everyone, lean on someone · missing them means it mattered · healing takes time (hourglass)
//  37.8        "Strong. | *And soft too.*"  Capricorn comes back, big.
//  41.0        LESSON UNLOCKED: "Miss them gently. | *Then keep going.*"  STATUS: HEALING
//  46.9        "Someday, | *someone new.*" over the match card: Capricorn + Cancer (the shoulder to lean on, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAP = '#2fc79a', RED = '#e23d4e', SAND = '#f2c75c'
const S = 'capricorn'

// ── props
function mug(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -130, 240, 270); x.beginPath(); x.arc(130, 0, 70, 0, 7); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(130, 0, 36, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.fillRect(-110, -120, 220, 250)
  x.fillStyle = PINK; x.fillRect(-110, -60, 220, 70)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THEIRS', 0, -24)
  x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 6
  for (let i = 0; i < 2; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const py = -150 - j * 10, px = -30 + i * 60 + Math.sin(j * 0.8 + t * 4 + i) * 10; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -190, 360, 380); x.fillStyle = BONE; x.fillRect(-170, -180, 340, 360)
  x.fillStyle = CAP; x.fillRect(-170, -180, 340, 64)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -148)
  const n = Math.floor(clamp((lt - 0.3) / 1.5) * 12)
  for (let d = 0; d < 12; d++) {
    const px = -120 + (d % 3) * 120, py = -70 + Math.floor(d / 3) * 62
    x.fillStyle = '#d9d0c0'; x.fillRect(px - 52, py - 24, 104, 48)
    if (d < n) { x.fillStyle = PINK; x.fillRect(px - 52, py - 24, 104, 48); x.fillStyle = INK; x.font = `700 16px ${MONO}`; x.fillText('miss them', px, py + 1) }
  }
  x.restore()
}
function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-210, 70, 420, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-200, 74, 400, 20)
  x.save(); x.translate(0, 74); x.scale(1, Math.max(0.03, 1 - close))
  x.fillStyle = INK; x.fillRect(-180, -250, 360, 250); x.fillStyle = '#9aa5c4'; x.fillRect(-170, -240, 340, 230)
  x.fillStyle = '#140c30'; x.fillRect(-156, -226, 312, 202)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('11:58 P.M.', 0, -150); x.fillText('task 48 of 300', 0, -100)
  x.restore()
  x.restore()
}
const COOKIE = ['..BBBBB..', '.BBKBBBB.', 'BBBBBBKBB', 'BKBBBBBBB', 'BBBBKBBBB', 'BBBBBBBKB', '.BBKBBBB.', '..BBBBB..']
const COOKIE_C = { B: '#e8a24a', K: '#6b3a22' }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function frame(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 380); x.fillStyle = '#c98f2a'; x.fillRect(-160, -180, 320, 360)
  x.fillStyle = '#3d3470'; x.fillRect(-130, -150, 260, 300)
  x.restore()
  if (k > 0.5) { signChar(x, t, S, cx - 50, cy + 30, 120 * k, { mood: 'happy', seed: 51, glyph: false }); signChar(x, t, 'pisces', cx + 55, cy + 30, 120 * k, { mood: 'happy', seed: 52, glyph: false, tears: 1 }) }
}
function hourglass(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -220, 280, 34); x.fillRect(-140, 186, 280, 34)
  x.fillStyle = '#c98f2a'; x.fillRect(-132, -214, 264, 22); x.fillRect(-132, 192, 264, 22)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -186); x.lineTo(110, -186); x.lineTo(16, 0); x.lineTo(110, 186); x.lineTo(-110, 186); x.lineTo(-16, 0); x.closePath(); x.fill()
  x.fillStyle = 'rgba(200,230,255,0.25)'; x.beginPath(); x.moveTo(-98, -178); x.lineTo(98, -178); x.lineTo(8, 0); x.lineTo(98, 178); x.lineTo(-98, 178); x.lineTo(-8, 0); x.closePath(); x.fill()
  const top = 1 - p
  x.fillStyle = SAND
  x.beginPath(); x.moveTo(-90 * top, -10 - 160 * top); x.lineTo(90 * top, -10 - 160 * top); x.lineTo(8, -4); x.lineTo(-8, -4); x.closePath(); x.fill()
  x.beginPath(); x.moveTo(-98, 178); x.lineTo(98, 178); x.lineTo(98 * (1 - p * 0.6), 178 - 150 * p); x.lineTo(-98 * (1 - p * 0.6), 178 - 150 * p); x.closePath(); x.fill()
  x.fillRect(-3, 0, 6, 178 - 150 * p)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Still using their mug? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      mug(x, t, 750, 960, 1.25 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 680, 'TEA: STILL HOT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can’t schedule | *missing someone.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1130, 'PLAN: IGNORED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Working late to forget? | *Clock out.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      laptop(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 1.0, 1.4)))
      label(x, 790, 1110, 'LOGGED OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Teared up at a song? | *Strong people do.*', mood: 'wide', tears: lt => lt > 0.8 ? 1 : 0, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 6, cell: 13, col: GOLD, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      label(x, 790, 680, 'OUR SONG', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04 })
      label(x, 790, 1100, 'TISSUES: NEARBY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A text you won’t send? | *It still counts.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRAFT', 0, -130)
        const msg = 'hope you’re well'.slice(0, Math.floor(clamp((lt - 0.3) / 0.9) * 17))
        x.fillStyle = SKYB; x.fillRect(-96, -60, 192, 60); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText(msg, 0, -30)
      })
      label(x, 790, 1150, 'SAVED. NOT SENT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saw their favourite snack? | *Smile at it.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 790, 650, 'AISLE 4', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.1) hearts(x, t, 790, 900, P.t0 + 1.1 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Strong for everyone? | *Lean on someone.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.7, 1.1))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(880, 680, near), 950, 220 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.9] })
      bubble(x, 760, 620, 'I got you', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      if (lt > 1.2) hearts(x, t, 540, 820, P.t0 + 1.2 * 1.29, { n: 5, life: 1.8, spread: 240, cell: 8, seed: 4 })
    } },
  { sign: S, cap: 'Missing them means | *it mattered.*', mood: 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      frame(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'GOOD TIMES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Healing takes time. | *Even for you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hourglass(x, t, 790, 880, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.3) / 2))
      label(x, 790, 1140, 'NO DEADLINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: CAP, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0103', key: 'C', accent: CAP, solo: S, ending: 'card',
  title: 'Capricorn, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Strong. | *And soft too.*', mood: 'sparkle' },
  lesson: { text: 'Miss them gently. | *Then keep going.*', chip: 'STATUS: HEALING' },
  last: { text: 'Someday, | *someone new.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
