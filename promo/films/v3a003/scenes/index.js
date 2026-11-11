// v3a003: zodiac.advice444, ADVICE SOLO, "Dear Capricorn: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a soft Capricorn truth with a warm "it's okay", one gag each.
// Ending: card (lesson, then the last line over the two-card match).
//   0.0–3.6    "Dear Capricorn: | *it’s okay.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the five-year plan unrolls: ??? (PLAN: TBD) · a tower of folders, Virgo takes half
//              · a calendar of WORK with one square circled: NOTHING · a propeller hat: NOBODY'S GRADING
//              · one tear at the movie (popcorn): ALLOWED · slow climb up the mountain, flag at step 3
//              · a match sees the soft side ("loves: spreadsheets, puppies") · a nap ticket: NO RECEIPT NEEDED
//              · a to-do list unrolls to the floor; the last line, BREATHE, gets ticked
//  37.8        "Strong. | *Soft too.*"  Capricorn comes back, big.
//  41.0        LESSON UNLOCKED: "You don’t have to | *earn rest.*"  PRESSURE: OFF
//  46.9        "Virgo took | *half the folders.*" over the match card: Capricorn + Virgo (the folder tower, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', SAGE = '#7fd6a4'
const S = 'capricorn'

// ── props
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'WYWWWYWW', 'RRWRRWRR', 'RRWRRWRR', '.RWRRWR.', '.RWRRWR.', '.RWRRWR.']
const POPCORN_C = { W: '#fff4e2', Y: '#ffd45c', R: RED }
const PROPELLER = ['RR.....BB', '.RR.K.BB.', '...KKK...', '....K....', '..YYYYY..', '.YRYBYRY.', 'YYYYYYYYY']
const PROPELLER_C = { R: RED, B: SKYB, K: INK, Y: GOLD }
function scroll(x, cx, top, k, len, rows, { w = 300, ticks = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, 0, w + 12, len + 6)
  x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, 0, w, len)
  x.fillStyle = INK; x.fillRect(-w / 2 - 16, -12, w + 32, 26); x.fillStyle = WOOD; x.fillRect(-w / 2 - 12, -8, w + 24, 18)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach((r, i) => {
    const y = 40 + i * 44; if (y > len - 16) return
    x.fillStyle = INK; x.fillRect(-w / 2 + 16, y - 12, 24, 24); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2 + 20, y - 8, 16, 16)
    if (i === ticks) { x.fillStyle = '#2f9e5b'; x.fillRect(-w / 2 + 18, y - 4, 8, 8); x.fillRect(-w / 2 + 24, y - 2, 6, 8); x.fillRect(-w / 2 + 28, y - 10, 8, 10) }
    x.fillStyle = INK; x.fillText(r, -w / 2 + 52, y + 1)
  })
  x.restore()
}
function folders(x, t, cx, base, n, k, lt) {
  for (let i = 0; i < n; i++) {
    const kk = pop01(t, t - lt + 0.2 + i * 0.05, 0.3, 2); if (kk <= 0.01) continue
    const wob = Math.sin(t * 3 + i * 0.4) * i * 0.6
    x.save(); x.translate(cx + wob, base - i * 30); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-80, -14, 160, 28); x.fillStyle = i % 2 ? '#f2c75c' : '#e7a84a'; x.fillRect(-76, -10, 152, 20)
    x.restore()
  }
}
function calendar(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -170, 380, 340)
  x.fillStyle = '#fffaf0'; x.fillRect(-182, -162, 364, 324)
  x.fillStyle = RED; x.fillRect(-182, -162, 364, 52)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -136)
  for (let i = 0; i < 9; i++) {
    const c = i % 3, r = Math.floor(i / 3), px = -120 + c * 120, py = -60 + r * 76
    x.fillStyle = i === 7 ? '#e9fff1' : '#efe6d6'; x.fillRect(px - 54, py - 32, 108, 64)
    x.fillStyle = INK; x.font = `700 ${i === 7 ? 18 : 20}px ${MONO}`; x.fillText(i === 7 ? 'NOTHING' : 'WORK', px, py + 2)
  }
  const ring = clamp((lt - 0.8) / 0.5)
  if (ring > 0) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(0, 92, 74, 44, 0, -Math.PI / 2, -Math.PI / 2 + ring * Math.PI * 2); x.stroke() }
  x.restore()
}
function mountain(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-230, 190); x.lineTo(0, -210); x.lineTo(230, 190); x.closePath(); x.fill()
  x.fillStyle = '#6b6290'; x.beginPath(); x.moveTo(-216, 182); x.lineTo(0, -192); x.lineTo(216, 182); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-50, -105); x.lineTo(0, -192); x.lineTo(50, -105); x.lineTo(20, -90); x.lineTo(0, -110); x.lineTo(-24, -88); x.closePath(); x.fill()
  x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 6; i++) x.fillRect(-150 + i * 26, 150 - i * 50, 18, 6)
  const step = Math.min(2, Math.floor(Math.max(0, lt - 0.6) * 2.4))
  const fx = -150 + (2 + step) * 26, fy = 150 - (2 + step) * 50
  x.fillStyle = INK; x.fillRect(fx - 3, fy - 70, 8, 72); x.fillStyle = SAGE; x.fillRect(fx + 4, fy - 68, 44, 28)
  x.restore()
}
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = MINT; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ IT’S A MATCH', 0, -122)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  x.fillText('LOVES:', -96, -60)
  x.fillStyle = SAGE; x.font = `800 30px ${INTER}`; x.fillText('spreadsheets', -96, -18)
  if (lt > 0.9) { x.fillStyle = PINK; x.fillText('& puppies', -96, 26) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'No five-year plan? | *That’s okay.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const len = 380 * ease.outCubic(prog(lt, 0.2, 1.0))
      scroll(x, 790, 560, pop01(t, P.t0 + 0.2, 0.3, 2), len, ['YEAR 1: ???', 'YEAR 2: ???', 'YEAR 3: ???', 'YEAR 4: ???', 'YEAR 5: ???', 'LUNCH: YES'], { w: 320 })
      label(x, 790, 1080, 'PLAN: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Asking for help | *isn’t failing.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, -1], star: { x: -240, y: 20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const take = ease.inOutCubic(prog(lt, 0.9, 1.4))
      const n = 14
      folders(x, t, 560, 1160, n - Math.round(7 * take), 1, lt)
      if (take > 0) folders(x, t, 820, 1160, Math.round(7 * take), 1, lt)
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1160 - 7 * 30 * take - 90, 150 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.9] })
      bubble(x, 790, 610, 'I got | half!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'A day off | *is still productive.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      calendar(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1130, 'BEST DAY ALL WEEK', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be silly. | *Nobody’s grading.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', star: { x: -180 }, hops: [1.3, 1.6],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      x.save(); x.translate(F.x, F.top - 26); x.rotate(Math.sin(t * 3) * 0.05)
      drawBits(x, PROPELLER, PROPELLER_C, 0, -20, 18 * k, { sx: Math.cos(t * 18) > 0 ? 1 : -1 })
      x.restore()
      label(x, 780, 760, 'NOBODY’S GRADING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 1060, 'FUN: UNLOCKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One tear at the movie? | *Allowed.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.0 ? 1 : 0, look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Slow climb? | *Still climbing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -240, y: 60, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { mountain(x, t, 760, 900, pop01(t, P.t0 + 0.1, 0.35, 2), lt) },
    front(x, t, lt, P) {
      label(x, 780, 1150, 'STEP 3 OF A LOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let your match | *see the soft side.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      hearts(x, t, 620, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Rest without | *earning it first.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -90, 340, 180); x.fillStyle = GOLD; x.fillRect(-162, -82, 324, 164)
        x.fillStyle = INK; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-162, -60 + i * 24, 7, 0, Math.PI * 2); x.arc(162, -60 + i * 24, 7, 0, Math.PI * 2); x.fill() }
        x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NAP', 0, -22)
        x.font = `700 22px ${MONO}`; x.fillText('ADMIT ONE CAPRICORN', 0, 40)
        x.restore()
      }
      label(x, 800, 1080, 'NO RECEIPT NEEDED', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 32, bg: RED, color: BONE, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re more | *than your to-do list.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const len = 580 * ease.outCubic(prog(lt, 0.2, 1.1))
      scroll(x, 790, 520, pop01(t, P.t0 + 0.2, 0.3, 2), len, ['EMAILS', 'TAXES', 'GYM', 'FIX LIFE', 'CALL MOM', 'MORE EMAILS', 'GOALS', 'GOALS 2', 'BREATHE'], { w: 300, ticks: lt > 1.6 ? 8 : -1 })
      sparkles(x, t, 720, 912, P.t0 + 1.6 * 1.29, 6, 80, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3a003', key: 'F', accent: SAGE, solo: S, ending: 'card',
  title: 'Dear Capricorn: | *it’s okay.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Strong. | *Soft too.*', mood: 'happy' },
  lesson: { text: 'You don’t have to | *earn rest.*', chip: 'PRESSURE: OFF' },
  last: { text: 'Virgo took | *half the folders.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
