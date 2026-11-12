// r2t0033: star_talk BELIKE, "Zodiacs explaining | their chart be like." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order explaining their birth chart, each the most extreme version of itself:
//   ♈ explained it in four seconds, left · ♉ moon in Taurus: explains the snacks · ♊ has two charts, uses both
//   · ♋ framed the chart, hung it in the hall · ♌ every planet? in Leo · ♍ brought a forty-slide deck
//   · ♎ can't pick a favourite placement · ♏ started with Pluto, still there · ♐ booked a flight mid-explanation
//   · ♑ the chart has quarterly goals · ♒ found a thirteenth sign · ♓ cried at their own moon
//  49.2   GROUP ending: "Twelve charts. | *Nobody listened.*"  group photo, Q&A cancelled
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e'
const WHEEL_COLS = ['#ff6b5a', '#9fd8a8', GOLD, SKYB, '#ffb34a', MINT, PINK, LAV, '#ff9a4a', '#9aa5c4', '#8fe3ff', '#b7a6ff']
/** a birth-chart wheel: 12 coloured houses, a dark centre, aspect lines */
function chart(x, cx, cy, r, k, t, { spin = 0.25, cols = WHEEL_COLS, n = 12, redact = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * spin)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < n; i++) { x.fillStyle = cols[i % cols.length]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / n * Math.PI * 2, (i + 1) / n * Math.PI * 2); x.closePath(); x.fill() }
  x.strokeStyle = INK; x.lineWidth = 3; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-r * 0.4, -r * 0.2); x.lineTo(r * 0.35, r * 0.3); x.moveTo(-r * 0.2, r * 0.38); x.lineTo(r * 0.3, -r * 0.35); x.stroke()
  x.restore()
}
function card(x, cx, cy, w, h, k, rot = 0, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const COOKIE = ['..CCCC..', '.CCKCCC.', 'CCCCCKCC', 'CKCCCCCC', 'CCCCKCCC', '.CCCCCK.', '..CCCC..']
const COOKIE_C = { C: '#e8b06a', K: '#5a3a24' }
const PLANE = ['......W.......', '.....WW.......', 'WWWWWWWWWWWWW.', '.WWWWWWWWWWWWW', '.....WW.......', '......W.......']
const MOON = ['..MMMM..', '.MMMM...', 'MMMM....', 'MMMM....', 'MMMM....', '.MMMM...', '..MMMM..']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Explained it in four seconds. | *Left.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.15, 0.3, 2), t, { spin: 2 })
      label(x, 790, 1080, '0:04', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 60, bg: '#ff6b5a', font: MONO, weight: 700 })
      bubble(x, 430, 620, 'any questions? bye!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Moon in Taurus. | *Explains the snacks.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, COOKIE, COOKIE_C, 720 + (i % 3) * 80 + (i > 2 ? 40 : 0), 960 - (i > 2 ? 70 : 0), 14 * pop01(t, P.t0 + 0.6 + i * 0.12, 0.3, 2))
      label(x, 790, 700, '☽ IN TAURUS', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 42, bg: '#9fd8a8', font: MONO, weight: 700 })
      bubble(x, 800, 1140, 'it’s in my chart.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Has two charts. | *Uses both.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 50, s: 260 },
    front(x, t, lt, P) {
      chart(x, 270, 700, 100, pop01(t, P.t0 + 0.2, 0.3, 2), t, { spin: 0.6 })
      chart(x, 810, 700, 100, pop01(t, P.t0 + 0.5, 0.3, 2), t, { spin: -0.6 })
      label(x, 540, 1160, 'CHART A / CHART B', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Framed their chart. | *Next to family photos.*', mood: 'heart', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 790, 330, 330, k, 0.03, WOOD)
      card(x, 790, 790, 270, 270, k, 0.03, '#140c30')
      chart(x, 790, 790, 110, k, t, { spin: 0 })
      hearts(x, t, 790, 700, P.t0 + 1.0, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
      label(x, 790, 1110, 'FAMILY WALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Every planet? | *In Leo, obviously.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      chart(x, 790, 800, 140, pop01(t, P.t0 + 0.15, 0.3, 2), t, { cols: lt > 0.9 ? [GOLD, '#ffb34a'] : WHEEL_COLS })
      sparkles(x, t, 790, 800, P.t0 + 1.2, 10, 200, 0.2)
      label(x, 790, 1090, 'ALL LEO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Brought | *a forty-slide deck.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(39, Math.floor(Math.max(0, lt - 0.4) * 22))
      card(x, 790, 790, 360, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0, '#2a2350')
      chart(x, 720, 790, 80, pop01(t, P.t0 + 0.3, 0.3, 2), t, { spin: 0 })
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = '#9aa5c4'; for (let i = 0; i < 4; i++) x.fillRect(830, 720 + i * 40, 110 - i * 15, 12); x.restore() }
      label(x, 790, 1060, `SLIDE ${n}/40`, k, { size: 40, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Favourite placement? | *Can’t pick one.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sw = Math.sin(lt * 5) * 0.16
      x.save(); x.translate(790, 760); x.rotate(sw); x.translate(-790, -760)
      x.fillStyle = INK; x.fillRect(630, 752, 320 * k, 16)
      x.restore()
      chart(x, 650 + Math.sin(sw) * 0, 700 - sw * 160, 60, k, t, { spin: 0 })
      chart(x, 930, 700 + sw * 160, 60, k, t, { spin: 0, cols: [PINK, LAV] })
      x.fillStyle = INK; x.fillRect(782, 760, 16, 260 * k)
      label(x, 790, 1110, 'SUN? MOON? BOTH?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Started with Pluto. | *We’re still there.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 800); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7d86a8'; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9aa5c4'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-50 + (i * 47) % 100, -40 + (i * 61) % 90, 14 + i * 3, 0, Math.PI * 2); x.fill() } x.restore() }
      label(x, 790, 640, 'PLUTO: PART 1', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: LAV, font: MONO, weight: 700 })
      label(x, 790, 1060, 'HOUR 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 48, bg: '#c97bff', color: BONE, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Mid-explanation, | *booked a flight.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      chart(x, 760, 900, 100, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - 0.4 * ease.inCubic(prog(lt, 0.9, 1.3))), t)
      const fly = ease.inOutCubic(prog(lt, 0.9, 2.2))
      drawBits(x, PLANE, { W: BONE }, lerp(640, 960, fly), lerp(720, 560, fly), 14 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.3 })
      label(x, 790, 1120, 'TO: ANYWHERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their chart? | *Has quarterly goals.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 820, 340, 320, k, 0, BONE)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k); x.fillStyle = INK; x.fillRect(-140, 120, 280, 6); x.fillRect(-140, -130, 6, 256)
        const p = prog(lt, 0.4, 1.6), pts = [[-120, 100], [-60, 60], [0, 40], [60, -20], [120, -100]]
        x.strokeStyle = '#3c7a3a'; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); pts.forEach(([a, b], i) => { if (i / 4 <= p + 0.01) i ? x.lineTo(a, b) : x.moveTo(a, b) }); x.stroke()
        x.restore()
      }
      label(x, 790, 1100, 'Q4: AHEAD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: '#9fd8a8', font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Found | *a thirteenth sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 140, pop01(t, P.t0 + 0.15, 0.3, 2), t, { n: lt > 0.9 ? 13 : 12, spin: 0.15 })
      label(x, 900, 650, '13?!', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 52, bg: SKYB, font: MONO, weight: 700, rot: 0.1 })
      bubble(x, 790, 1080, 'trust me.', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 44, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at | *their own moon.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#fff1b0' }, 800, 760, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1060, '☽ IN PISCES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 42, bg: LAV, font: MONO, weight: 700 })
      bubble(x, 800, 1180, 'it’s so me.', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0033', key: 'G', accent: LAV, ending: 'group',
  title: 'Zodiacs explaining | their chart *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve charts. | *Nobody listened.*',
    draw(x, t, lt) { label(x, 540, 700, 'Q&A: CANCELLED', pop01(t, t - lt + 2.0, 0.3, 2.4), { size: 44, bg: GOLD, font: MONO, weight: 700, rot: -0.04 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
