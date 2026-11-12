// r2t0086: star_talk ROLLCALL, "The signs | at mini golf." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order on a mini golf course, each the most extreme version of itself:
//   ♈ hole in one, wrong hole · ♉ skipped hole 3 (uphill) · ♊ two putters, two balls · ♋ adopted the lost ball
//   · ♌ bowed after every putt · ♍ measured the putt with a ruler · ♎ still choosing a ball colour
//   · ♏ score is classified · ♐ ball went over the fence, went with it · ♑ timed the windmill, made a chart
//   · ♒ built their own hole 19 · ♓ ball went in the pond, sobbed
//  49.2   "Par? | Never *heard of her.*"  group photo
//  52.6   CALLBACK: "The ball came back. | Pisces *cried again.*"  Pisces and the ball, bouncing home.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', TURF = '#2f9a52', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const BALL = ['.WWW.', 'WWWWW', 'WWgWW', 'WWWWW', '.WWW.']
const BALL_C = { W: '#ffffff', g: '#c9c9d8' }
const ball = (x, cx, cy, cell, col = '#ffffff', alpha = 1) => drawBits(x, BALL, { W: col, g: col === '#ffffff' ? '#c9c9d8' : INK }, cx, cy, cell, { alpha })
const PUTTER = ['..K', '..K', '..K', '..K', '..K', '..K', '..K', '..K', '..K', '..K', '..K', '..K', 'SSS', 'SSS']
const PUTTER_C = { K: '#c9c9d8', S: '#2a2350' }
const FLAG = ['KRRRR', 'KRRRRRR', 'KRRRR..', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......'].map(r => r.padEnd(7, '.'))
const FLAG_C = { K: BONE, R: RED }
const RULER = ['YYYYYYYYYYYYYYYYYYYYYYYY', 'YKYYYKYYYKYYYKYYYKYYYKYY', 'YKYYYYYYYKYYYYYYYKYYYYYY', 'YYYYYYYYYYYYYYYYYYYYYYYY']
const RULER_C = { Y: GOLD, K: INK }
const WINDMILL = [
  'B.......B',
  '.B.....B.',
  '..B...B..',
  '...BRB...',
  '..B.R.B..',
  '.B.RRR.B.',
  'B..RWR..B',
  '...RRR...',
  '..RRRRR..',
  '..RRDRR..',
  '..RRDRR..',
]
const WINDMILL_C = { B: BONE, R: '#c97bff', W: SKYB, D: INK }
const BLANKET = ['.PPPPPPP.', 'PPWPPPWPP', 'PPPPPPPPP', 'PWPPPWPPP', '.PPPPPPP.']

// a strip of turf with a hole in it
function green(x, cx, cy, w, k, { hole = true, flag = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -26, w + 12, 58)
  x.fillStyle = TURF; x.fillRect(-w / 2, -20, w, 46)
  x.fillStyle = GREEN; x.fillRect(-w / 2, -20, w, 14)
  if (hole) { x.fillStyle = INK; x.fillRect(w / 2 - 70, -16, 40, 12) }
  x.restore()
  if (flag) drawBits(x, FLAG, FLAG_C, cx + (w / 2 - 50) * k, cy - 80 * k, 12 * k)
}
// a scorecard with blacked-out rows
function scorecard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 256, 340)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352)
  x.fillStyle = BONE; x.fillRect(-128, -168, 256, 336)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SCORECARD', 0, -132)
  const n = Math.floor(clamp((lt - 0.3) / 1.0) * 6)
  for (let i = 0; i < 6; i++) {
    x.fillStyle = '#6b62a8'; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.fillText(`HOLE ${i + 1}`, -110, -82 + i * 44)
    x.fillStyle = i < n ? INK : '#c9c0b0'; x.fillRect(20, -98 + i * 44, 90, 30)
  }
  x.restore()
}
// a little bar chart on a clipboard
function chartBoard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -150, 260, 300)
  x.fillStyle = BONE; x.fillRect(-122, -142, 244, 284)
  x.fillStyle = BROWN; x.fillRect(-40, -160, 80, 28)
  const H = [60, 120, 90, 170, 140]
  for (let i = 0; i < 5; i++) {
    const h = H[i] * ease.outCubic(prog(lt, 0.4 + i * 0.12, 0.8 + i * 0.12))
    x.fillStyle = INK; x.fillRect(-98 + i * 42, 110 - h - 4, 34, h + 4)
    x.fillStyle = ['#c97bff', SKYB, GOLD, MINT, PINK][i]; x.fillRect(-94 + i * 42, 110 - h, 26, h)
  }
  x.fillStyle = INK; x.fillRect(-104, 110, 210, 5)
  x.restore()
}
// a tiny pond with ripples
function pond(x, t, cx, cy, k, lt, splashAt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 176, 66, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3a7bd5'; x.beginPath(); x.ellipse(0, 0, 166, 56, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; x.fillRect(-90, -16, 50, 8); x.fillRect(40, 14, 60, 8)
  const r = lt - splashAt
  if (r > 0 && r < 1.4) {
    x.strokeStyle = '#ffffff'; x.lineWidth = 5; x.globalAlpha = 1 - r / 1.4
    for (const q of [0, 0.35]) { const rr = Math.max(0, r - q) * 120; if (rr > 0) { x.beginPath(); x.ellipse(0, 0, rr, rr * 0.35, 0, 0, Math.PI * 2); x.stroke() } }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hole in one. | On the *wrong hole.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.4, 1.3],
    front(x, t, lt, P) {
      green(x, 790, 1100, 300, pop01(t, P.t0 + 0.1, 0.3, 2), { flag: true })
      const p = ease.inOutCubic(prog(lt, 0.3, 1.1))
      if (lt > 0.3) ball(x, lerp(460, 860, p), 1050 - Math.sin(Math.PI * p) * 420, 12)
      label(x, 790, 650, 'WE’RE ON HOLE 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 860, 1060, P.t0 + 1.0, 6, 110, 0.3)
    } },
  { sign: 'taurus', cap: 'Skipped hole 3. | It was *uphill.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 1100); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-190, 30); x.lineTo(170, -330); x.lineTo(190, -330); x.lineTo(190, 30); x.closePath(); x.fill()
        x.fillStyle = TURF; x.beginPath(); x.moveTo(-170, 20); x.lineTo(170, -316); x.lineTo(180, 20); x.closePath(); x.fill()
        x.restore()
        drawBits(x, FLAG, FLAG_C, 960, 690, 11 * k)
      }
      label(x, 760, 1150, 'HOLE 3: NOPE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Brought two putters. | Played *both teams.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PUTTER, PUTTER_C, F.x - 150, F.cy + 40, 16 * k, { rot: 0.3 })
      drawBits(x, PUTTER, PUTTER_C, F.x + 150, F.cy + 40, 16 * k, { rot: -0.3, sx: -1 })
      const n = 1 + Math.floor(Math.max(0, lt - 0.6) / 0.35) % 2
      label(x, 800, 650, n === 1 ? 'TEAM ME' : 'TEAM ALSO ME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Found a lost ball. | *Adopted it.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BLANKET, { P: PINK, W: '#fff4e2' }, 790, 950, 24 * k)
      ball(x, 790, 905, 16 * k)
      bubble(x, 790, 680, 'he’s family now', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 790, 880, P.t0 + 1.1, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Bowed after | *every putt.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.6],
    squash: lt => 0.12 * Math.max(0, Math.sin(Math.PI * clamp((lt - 0.6) / 0.8))),
    front(x, t, lt, P) {
      green(x, 790, 1110, 300, pop01(t, P.t0 + 0.1, 0.3, 2), { flag: true })
      label(x, 790, 680, 'APPLAUSE, PLEASE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
      label(x, 790, 820, 'PUTT 1 OF 41', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 450, 860, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Measured the putt | with a *ruler.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      green(x, 790, 1100, 320, k)
      ball(x, 680, 1060, 11 * k)
      drawBits(x, RULER, RULER_C, 800, 1010, 11 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 720, '3.2 IN. SLIGHT LEFT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking | a *ball colour.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = ['#ffffff', PINK, SKYB, GOLD, MINT, '#c97bff']
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.15 + i * 0.08, 0.25, 2)
        const sel = Math.floor(lt * 3) % 6 === i
        ball(x, 700 + (i % 3) * 100, 820 + Math.floor(i / 3) * 110 - (sel ? 20 : 0), 15 * k, COLS[i])
      }
      label(x, 790, 1100, 'HOLE 1 · HOUR 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Their score? | *Classified.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      scorecard(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1100, 'TOP SECRET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Ball went over the fence. | They *followed it.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2, 1.5, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(640 + i * 56, 960, 30, 170); x.fillStyle = BONE; x.fillRect(646 + i * 56, 966, 18, 158) }
      x.fillStyle = INK; x.fillRect(630, 1000, 330, 14); x.fillStyle = BONE; x.fillRect(634, 1003, 322, 8)
      x.restore()
    },
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.0))
      if (lt > 0.3 && p < 1) ball(x, lerp(520, 1000, p), 900 - Math.sin(Math.PI * p * 0.8) * 340, 11)
      bubble(x, 790, 700, 'BRB!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Timed the windmill. | Made *a chart.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, WINDMILL, WINDMILL_C, 700, 850, 22 * k, { rot: 0 })
      chartBoard(x, 860, 960, 0.75 * pop01(t, P.t0 + 0.6, 0.3, 2), lt)
      label(x, 760, 640, 'SPIN: 4.1 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Built their own | *hole 19.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 980); x.scale(k, k)
        // a loop-the-loop ramp
        x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.arc(0, -60, 120, 0, Math.PI * 2); x.stroke()
        x.strokeStyle = '#6fc3ff'; x.lineWidth = 18; x.beginPath(); x.arc(0, -60, 120, 0, Math.PI * 2); x.stroke()
        x.fillStyle = INK; x.fillRect(-200, 56, 400, 34); x.fillStyle = '#6fc3ff'; x.fillRect(-194, 62, 388, 22)
        x.restore()
        const a = lt * 5
        ball(x, 790 + Math.cos(a) * 120 * k, 920 + Math.sin(a) * 120 * k, 9 * k)
      }
      label(x, 790, 650, 'HOLE 19: MINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Ball went in the pond. | *Sobbed.*', mood: lt => lt < 1.0 ? 'wide' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pond(x, t, 790, 1060, pop01(t, P.t0 + 0.1, 0.3, 2), lt, 0.95)
      const p = ease.inQuad(prog(lt, 0.3, 0.95))
      if (lt > 0.3 && lt < 0.95) ball(x, lerp(560, 790, p), lerp(900, 1050, p) - Math.sin(Math.PI * p) * 140, 11)
      bubble(x, 790, 720, 'goodbye, friend', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0086', key: 'C', accent: GREEN, ending: 'callback',
  title: 'The signs | *at mini golf.*',
  cameos: CAMEOS,
  group: { cap: 'Par? | Never *heard of her.*' },
  last: {
    text: 'The ball came back. | Pisces *cried again.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 420, 1060, 280 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 40, tears: lt > 1.6 ? 3 : 2, hops: [t - lt + 1.7] })
      // the ball bounces home across the floor
      const p = prog(lt, 0.7, 1.7)
      if (lt > 0.7) ball(x, lerp(900, 640, ease.outCubic(p)), 1150 - Math.abs(Math.sin(p * Math.PI * 3)) * 140 * (1 - p), 13)
      hearts(x, t, 560, 980, t - lt + 1.7, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
