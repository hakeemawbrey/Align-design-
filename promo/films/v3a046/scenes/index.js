// v3a046: star_advice, ADVICE SOLO, "What Capricorns | need in love." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (solo mode, 9 cards): what a Capricorn really needs in love, warm and specific, one gag each.
// Ending: 'callback' (no lesson): the date-night calendar from card 1 comes back, still booked in ink.
//   0.0–3.6    "What Capricorns | *need in love.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a partner who respects the calendar (DATE NIGHT, in ink) · "I'm proud of you." SAVED. FOREVER.
//              · someone who notices the tired (a mug of tea) · ding dong, 7:00 sharp · MIND GAMES go in the bin
//              · laughs at the spreadsheet pun · a five-year plan: US, every row · a hug, the briefcase dropped
//              · loves the secret goofball (party hat, noisemaker)
//  37.8        "Steady. | *And so sweet.*"  Capricorn comes back, big.
//  41.2        "Date night? | *Still in ink.*"  The calendar comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', SAGE = '#7fd4a8', BROWN = '#8a4a2e'
const S = 'capricorn'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// the week planner with DATE NIGHT written in (card 1 and the callback)
function planner(x, cx, cy, k, inked, heart, rot = 0.03) {
  if (!slab(x, cx, cy, 320, 360, k, { bg: '#fff4e2', rot })) return
  x.fillStyle = TEAL; x.fillRect(-160, -180, 320, 56); txt(x, 'FRIDAY', 0, -152, 32, '#fff4e2', MONO, 700)
  const rows = ['9:00  report', '12:00  lunch', '3:00  review']
  rows.forEach((r, i) => { x.fillStyle = '#d6cfc0'; x.fillRect(-140, -100 + i * 52 + 34, 280, 3); txt(x, r, 0, -100 + i * 52 + 14, 24, '#6b62a8', MONO, 700) })
  if (inked > 0) {
    x.save(); x.globalAlpha = clamp(inked); x.fillStyle = INK; x.fillRect(-140, 72, 280, 70); x.fillStyle = PINK; x.fillRect(-134, 78, 268, 58)
    txt(x, '7:00 DATE NIGHT', 0, 108, 28); x.restore()
  }
  if (heart > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 130, 70, 9 * heart, { rot: 0.2 })
  x.restore()
}
const MUG = ['.S.S.S..', '..S.S...', 'MMMMMM..', 'MmmmmMMM', 'MmmmmM.M', 'MmmmmMMM', 'MMMMMM..', '.MMMM...']
const MUG_C = { S: '#e6e6f0', M: SAGE, m: BROWN }
const HAT = ['...Y...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPYP.', 'PPPPPPP']
const BRIEF = ['..KKKK..', '..K..K..', 'BBBBBBBB', 'BBBBBBBB', 'BBBGGBBB', 'BBBBBBBB', 'BBBBBBBB']

const CAMEOS = [
  { sign: S, cap: 'Someone who | *respects the calendar.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      planner(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.7, 1.0), 0)
      label(x, 790, 1120, 'BOOKED. IN INK.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'To hear | *“I’m proud of you.”*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220, y: 30 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 71, glyph: false })
      bubble(x, 760, 650, "I'm proud | of you.", pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 420, 1140, 'SAVED. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
      hearts(x, t, 340, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Someone who notices | *the tired, too.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 840, 920, 190 * k, { mood: 'happy', look: [-1, 0], seed: 72, glyph: false })
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.5) drawBits(x, MUG, MUG_C, lerp(780, 560, d), lerp(1000, 1060, d), 14)
      label(x, 790, 640, 'TEA DELIVERED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone who shows up | *on time.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(820, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -230, 260, 470); x.fillStyle = '#8a4a2e'; x.fillRect(-120, -220, 240, 460)
        const op = ease.inOutCubic(prog(lt, 0.9, 1.3))
        if (op > 0) { x.fillStyle = '#fff1c4'; x.fillRect(-120, -220, 240 * op, 460) }
        x.fillStyle = GOLD; x.fillRect(80, 10, 20, 20)
        x.restore()
        const op2 = ease.inOutCubic(prog(lt, 0.9, 1.3))
        if (op2 > 0.3) signChar(x, t, 'taurus', 800, 900, 170 * op2, { mood: 'happy', look: [-1, 0], seed: 73, glyph: false })
      }
      bubble(x, 560, 640, 'ding dong!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 820, 1150, '7:00 SHARP. SWOON.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow and steady. | *No games.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 1030); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -90, 220, 190); x.fillStyle = '#9aa5c4'; x.fillRect(-100, -80, 200, 170); x.fillStyle = INK; for (let i = 0; i < 5; i++) x.fillRect(-80 + i * 40, -70, 8, 150); x.restore() }
      const d = ease.inCubic(prog(lt, 0.7, 1.2))
      if (slab(x, lerp(800, 800, d), lerp(760, 990, d), 240, 150, pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - 0.4 * d), { bg: '#c97bff', rot: lerp(-0.1, 0.5, d) })) {
        txt(x, 'MIND', 0, -26, 40, '#fff4e2'); txt(x, 'GAMES', 0, 26, 40, '#fff4e2'); x.restore()
      }
      label(x, 800, 650, 'NOT TODAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Someone who laughs | at the *spreadsheet puns.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 820, 330, 250, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#ffffff', rot: -0.03 })) {
        x.strokeStyle = '#b9b0a0'; x.lineWidth = 2
        for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(-165, -125 + i * 62); x.lineTo(165, -125 + i * 62); x.stroke() }
        for (let j = 0; j <= 3; j++) { x.beginPath(); x.moveTo(-165 + j * 110, -125); x.lineTo(-165 + j * 110, 125); x.stroke() }
        x.fillStyle = '#c9f7dd'; x.fillRect(-55, -1, 220, 62); txt(x, 'excel-lent', 55, 31, 30, INK, INTER, 800)
        txt(x, '412', -110, -94, 24, '#6b62a8', MONO, 700); txt(x, '98', 0, -94, 24, '#6b62a8', MONO, 700)
        x.restore()
      }
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 1060, 150 * k, { mood: lt > 1.1 ? 'happy' : 'neutral', look: [-1, -1], seed: 74, glyph: false, hops: lt > 1.1 ? [P.t0 + 1.4, P.t0 + 1.7, P.t0 + 2.0] : [] })
      label(x, 790, 630, 'HA! GOOD ONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A future | they can *plan around.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 860, 310, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.03 })) {
        txt(x, 'FIVE-YEAR PLAN', 0, -146, 28, INK, MONO, 700)
        const n = Math.floor(clamp((lt - 0.4) / 0.9) * 5)
        for (let i = 0; i < 5; i++) { x.fillStyle = '#d6cfc0'; x.fillRect(-130, -90 + i * 56, 80, 34); txt(x, `Y${i + 1}`, -90, -72 + i * 56, 22, INK, MONO, 700); if (i < n) txt(x, 'US ♥', 40, -72 + i * 56, 32, '#ff4f86') }
        x.restore()
      }
      label(x, 790, 1120, 'PLAN: US', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A hug | after *hard days.*', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -120 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const d = ease.inCubic(prog(lt, 0.4, 0.8))
      drawBits(x, BRIEF, { K: INK, B: BROWN, G: GOLD }, F.x + 120, lerp(F.cy + 20, 1120, d), 14, { rot: d * 0.5 })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2), hug = ease.outCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) signChar(x, t, 'pisces', lerp(900, 690, hug), 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 75, glyph: false, tears: 1 })
      label(x, 540, 1150, 'BRIEFCASE: DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 8, seed: 6 })
    } },
  { sign: S, cap: 'Someone who loves | the *secret goofball.*', mood: lt => lt > 0.9 ? 'wink' : 'neutral', star: { x: -150 }, hops: [0.9, 1.4, 1.9],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.7, 0.3, 2.4)
      if (k > 0.01) drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x + 10, F.top - 40, 16 * k, { rot: -0.15 })
      if (lt > 0.9) {
        const u = clamp((lt - 0.9) / 0.3) * (0.8 + 0.2 * Math.sin(t * 14))
        x.save(); x.fillStyle = INK; x.fillRect(F.x + 90, F.cy - 6, 30, 22); x.fillStyle = '#ffd23a'; x.fillRect(F.x + 120, F.cy - 4, 180 * u, 18); x.fillStyle = PINK; for (let i = 0; i < 4; i++) x.fillRect(F.x + 140 + i * 40 * u, F.cy - 8, 10, 26); x.restore()
      }
      label(x, 800, 650, 'SECRET GOOFBALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 850, P.t0 + 1.0, 8, 220, 0.4, [PINK, GOLD, MINT])
    } },
]

const F = makeFilm({
  id: 'v3a046', key: 'D', accent: SAGE, solo: S, ending: 'callback',
  title: 'What Capricorns | *need in love.*',
  cameos: CAMEOS,
  group: { cap: 'Steady. | *And so sweet.*', mood: 'sparkle' },
  last: {
    text: 'Date night? | *Still in ink.*',
    draw(x, t, lt) {
      planner(x, 540, 1000, 1.25 * pop01(t, t - lt + 0.5, 0.35, 2), 1, pop01(t, t - lt + 1.3, 0.3, 2.4), -0.03)
      hearts(x, t, 540, 760, t - lt + 1.4, { n: 8, life: 2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
