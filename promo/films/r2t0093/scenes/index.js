// r2t0093: star_talk, ROLL CALL, "The signs when | the clocks change." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself the night the clocks change.
//   0.0–3.6    "The signs when | *the clocks change.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each):
//              ♈ the clocks sprang forward, so did Aries · ♉ got an extra hour, napped for six · ♊ two clocks disagree, Gemini
//              believes both · ♋ clocks went back, Cancer went back to 2009 · ♌ golden hour, extended (new profile pic)
//              · ♍ reset fourteen clocks, synced to the second · ♎ spent the hour on skincare · ♏ checked the clock's birth
//              chart, still suspicious · ♐ an hour late, blamed the universe · ♑ changed the clocks a week early, to practise
//              · ♒ invented a time zone: it's 7:83 · ♓ said goodbye to 2 a.m. (tears)
//  49.2        "Nobody knows | *what time it is.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "An hour is a gift. | Spend it *on you.*"  TIME: YOURS
//  58.3        "Aquarius is still | on *7:83.*"  The 7:83 clock comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e'

// ── props
const SPRING = [
  'GGGGGGGG',
  '.G....G.',
  '..GGGG..',
  '.G....G.',
  '..GGGG..',
  '.G....G.',
  '..GGGG..',
  'GGGGGGGG',
]
const SPRING_C = { G: '#c9c9d8' }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const MIRROR = [
  '..FFFFF..',
  '.FSSSSSF.',
  'FSSWSSSSF',
  'FSWSSSSSF',
  'FSSSSSSSF',
  'FSSSSSSSF',
  '.FSSSSSF.',
  '..FFFFF..',
  '....F....',
  '...FFF...',
]
const MIRROR_C = { F: GOLD, S: SKYB, W: '#ffffff' }
const PLANET = [
  '.....OOOO.....',
  '...OOOOOOOO...',
  'RR.OOOOOOOO.RR',
  '.RRRRRRRRRRRR.',
  '...OOOOOOOO...',
  '.....OOOO.....',
]
const PLANET_C = { O: '#ffb34a', R: LAV }

/** an analog clock showing h:m (hours 0–12), optional face colour */
function clock(x, cx, cy, r, k, h, m, { face = CREAM, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(6, 8, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = face; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - r * 0.04, Math.sin(a) * r * 0.82 - r * 0.04, r * 0.08, r * 0.08) }
  const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = m / 60 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'square'
  x.lineWidth = r * 0.1; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * r * 0.48, Math.sin(ha) * r * 0.48); x.stroke()
  x.lineWidth = r * 0.06; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * r * 0.72, Math.sin(ma) * r * 0.72); x.stroke()
  x.restore()
}
/** a digital clock */
function digital(x, cx, cy, k, text, { col = MINT, size = 64, rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(text).width + 60, h = size + 46
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#0c0820'; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chartRing(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.lineWidth = r * 0.22
  for (let i = 0; i < 12; i++) { x.strokeStyle = WHEEL[i]; x.beginPath(); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'The clocks sprang forward. | So did *Aries.*', mood: 'sparkle', star: { x: -150, y: -60 }, hops: [0.6, 1.0, 1.4, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) {
      const sq = 1 - 0.35 * Math.max(0, Math.sin(lt * 9))
      drawBits(x, SPRING, SPRING_C, F.x, 1100, 18 * P.k, { sy: sq })
    },
    front(x, t, lt, P) {
      clock(x, 790, 760, 110, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.9 ? 3 : 2, 0)
      label(x, 790, 960, 'BOING.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Got an extra hour. | *Napped for six.*', mood: 'sleepy', star: { x: -170, y: 30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(400, 1060); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-230, -30, 460, 80); x.fillStyle = '#c97bff'; x.fillRect(-222, -22, 444, 64)
      x.fillStyle = CREAM; x.fillRect(-210, -60, 130, 50); x.restore()
    },
    front(x, t, lt, P) {
      const hrs = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 5)
      label(x, 790, 760, `BONUS NAP: ${hrs} HR${hrs > 1 ? 'S' : ''}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      clock(x, 790, 960, 90, pop01(t, P.t0 + 0.6, 0.3, 2), 1 + hrs, (lt * 200) % 60)
    } },
  { sign: 'gemini', cap: 'Two clocks disagree. | Gemini *believes both.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      clock(x, 250, 720, 95, pop01(t, P.t0 + 0.2, 0.3, 2), 2, 0, { rot: -0.08 })
      clock(x, 830, 720, 95, pop01(t, P.t0 + 0.35, 0.3, 2), 3, 0, { rot: 0.08 })
      label(x, 250, 870, 'SO, 2?', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 830, 870, 'ALSO 3!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#ffd23a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 540, 1150, 'both. it’s fine.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Clocks went back. | Cancer went *back to 2009.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -160, 296, 340)
        x.fillStyle = INK; x.fillRect(-152, -172, 304, 344); x.fillStyle = '#ffffff'; x.fillRect(-144, -164, 288, 328)
        x.fillStyle = '#ffd9a8'; x.fillRect(-124, -144, 248, 220)
        signChar(x, t, 'cancer', -40, -20, 120, { mood: 'happy', seed: 31, glyph: false, glow: 0.5 })
        signChar(x, t, 'leo', 60, -10, 100, { mood: 'wink', seed: 32, glyph: false, glow: 0.5 })
        x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2009', 0, 122)
        x.restore()
      }
      label(x, 790, 640, 'NOSTALGIA: MAX', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Got an extra hour. | *Golden hour, extended.*', mood: 'sparkle', star: { x: -150 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.9))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#ffcf6b'; x.fillRect(110, 480, 860, 740); x.restore()
      drawBits(x, SUN, { Y: GOLD }, 820, 640, 22 * k, { rot: t * 0.4 })
    },
    front(x, t, lt, P) {
      label(x, 790, 880, 'NEW PROFILE PIC', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, '(×200)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.2, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Reset fourteen clocks. | Synced *to the second.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      for (let i = 0; i < 12; i++) {
        const c = i % 3, r = Math.floor(i / 3), k = pop01(t, P.t0 + 0.15 + i * 0.06, 0.25, 2)
        const synced = lt > 1.2, m = synced ? 0 : (i * 23) % 60, h = synced ? 3 : (i * 5) % 12
        clock(x, 680 + c * 110, 640 + r * 115, 44, k, h, m)
      }
      label(x, 790, 1160, 'SYNC: PERFECT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Got an extra hour. | Spent it *on skincare.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, MIRROR, MIRROR_C, 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      // a little face mask on the star (cucumber slices)
      const m = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (m > 0.01) for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(F.x + d * 55, F.cy - 10, 30 * m, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9be38f'; x.beginPath(); x.arc(F.x + d * 55, F.cy - 10, 24 * m, 0, Math.PI * 2); x.fill() }
      label(x, 790, 1090, 'GLOW: +1 HOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 6, 150, 0.4)
    } },
  { sign: 'scorpio', cap: 'Checked the clock’s chart. | *Still suspicious.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      chartRing(x, 790, 820, 150, k, t)
      clock(x, 790, 820, 95, k, 3, 0)
      label(x, 790, 1060, 'TRUST: PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Showed up an hour late. | *Blamed the universe.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: 170 }, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 310, 700, 18 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.15 })
      bubble(x, 310, 880, 'blame | the cosmos', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 310, 1070, 'LATE: 60 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Changed the clocks early. | *To practise.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(310, 800); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = CREAM; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = '#2fc79a'; x.fillRect(-142, -142, 284, 54)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRILL WEEK', 0, -114)
        for (let d = 0; d < 7; d++) { const px = -110 + (d % 4) * 74, py = -40 + Math.floor(d / 4) * 90; x.fillStyle = '#d9cfbd'; x.fillRect(px - 30, py - 30, 60, 60); if (lt > 0.5 + d * 0.18) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(px - 22, py - 22); x.lineTo(px + 22, py + 22); x.moveTo(px + 22, py - 22); x.lineTo(px - 22, py + 22); x.stroke() } }
        x.restore()
      }
      label(x, 310, 1060, 'PREPARED: 7 DAYS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Made their own time zone. | It’s *7:83.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      digital(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.8 ? '7:83' : '3:00')
      label(x, 790, 960, 'ZONE: AQUARIUS STANDARD', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'it’s more fun', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Lost an hour. | Held a *farewell.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 760, 100, pop01(t, P.t0 + 0.2, 0.3, 2), 2, 0, { face: '#d9d2f0' })
      bubble(x, 790, 940, 'we had | 60 good minutes', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      label(x, 790, 1120, 'GOODBYE, 2 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0093', key: 'G', accent: SKYB, ending: 'lesson',
  title: 'The signs when | *the clocks change.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody knows | *what time it is.*' },
  lesson: { text: 'An hour is a gift. | Spend it *on you.*', chip: 'TIME: YOURS' },
  last: {
    text: 'Aquarius is still | on *7:83.*',
    draw(x, t, lt) {
      const t0 = t - lt
      digital(x, 540, 1560, pop01(t, t0 + 0.6, 0.35, 2), '7:83', { size: 90 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
