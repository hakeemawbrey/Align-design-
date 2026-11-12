// r2t0007: star_talk ROLLCALL, "The signs | doing the weather." (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order as TV weather forecasters, each the most extreme version of itself:
//   ♈ "SUNNY!" (didn't check; it's raining) · ♉ seven-day forecast: couch · ♊ sun, rain, snow, same sentence
//   · ♋ said bring a jacket, brought you one · ♌ pointed at the sun: "that's me." · ♍ rain at 3:07, not 3:08
//   · ♎ sun or rain? couldn't decide · ♏ cloudy, won't say why · ♐ wrong city, reporting live anyway
//   · ♑ forecast for the next decade · ♒ weather on another planet · ♓ forecast: rain, mostly from me
//  49.2   "Nobody checked | *the window.*"  group photo
//  52.4   LESSON UNLOCKED: "Some days rain. | Someone brings *the jacket.*"  FORECAST: CLEAR
//  58.3   "Tomorrow: | *sunny-ish.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SUNC = '#ffd23a'
const SUN = [
  '...Y..Y..Y...',
  '.Y..........Y',
  '....OOOOO....',
  '...OOOOOOO...',
  'Y.OOOOOOOOO.Y',
  '..OOOOOOOOO..',
  'Y.OOOOOOOOO.Y',
  '...OOOOOOO...',
  '....OOOOO....',
  'Y...........Y',
  '...Y..Y..Y...',
]
const SUN_C = { Y: SUNC, O: '#ffb34a' }
const CLOUD = [
  '....WWWW......',
  '..WWWWWWWW....',
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.GGGGGGGGGGGG.',
]
const CLOUD_C = { W: '#e8eef8', G: '#9aa5c4' }
const DARK_C = { W: '#6b62a8', G: '#4a3f86' }
const SNOW = ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..']
const JACKET = [
  '...YY.YY...',
  '.YYYY.YYYY.',
  'YYYYY.YYYYY',
  'YYYYYWYYYYY',
  'YY.YY.YY.YY',
  'YY.YYWYY.YY',
  'YY.YY.YY.YY',
  'YY.YYWYY.YY',
  '...YY.YY...',
  '...YYYYY...',
]
const JACKET_C = { Y: '#ffb34a', W: '#fff4e2' }
const COUCH = [
  'PP..........PP',
  'PPPPPPPPPPPPPP',
  'PPCCCCCCCCCCPP',
  'PPCCCCCCCCCCPP',
  'PPPPPPPPPPPPPP',
  'B............B',
]
const COUCH_C = { P: '#c96a3a', C: '#e8a24a', B: '#5a3a24' }
const PLANET = [
  '.......RRR..',
  '....PPPPR...',
  '...PPPPPPR..',
  '..PPPPPPPP..',
  'RRRRRRRRRRRR',
  '..PPPPPPPP..',
  '..RPPPPPP...',
  '.RR.PPPP....',
]
const PLANET_C = { P: '#ffd88a', R: '#c97bff' }

function rain(x, t, cx, top, w, h, n = 14, col = SKYB) {
  x.save(); x.fillStyle = col
  for (let i = 0; i < n; i++) { const ph = ((t * 1.3 + i * 0.37) % 1 + 1) % 1, px = cx - w / 2 + ((i * 53) % w); x.fillRect(px, top + ph * h, 6, 22) }
  x.restore()
}
/** the weather board behind the forecaster: a framed map with a grid */
function board(x, cx, cy, k, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -170, 380, 340)
  x.fillStyle = '#2e6fa8'; x.fillRect(-180, -160, 360, 320)
  x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-150, -40); x.lineTo(-40, -110); x.lineTo(90, -70); x.lineTo(150, 40); x.lineTo(40, 120); x.lineTo(-120, 90); x.closePath(); x.fill()
  if (title) { x.fillStyle = INK; x.fillRect(-180, -160, 360, 46); x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -136) }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Forecast: *sunny!* | Didn’t check.', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'SUNNY!', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 60, col: SUNC, tail: 'bl' })
      if (lt > 1.0) { drawBits(x, CLOUD, DARK_C, 370, 560, 18); rain(x, t, 370, 600, 300, 380, 12) }
      label(x, 790, 1050, 'IT’S POURING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Seven-day forecast: | *stay on the couch.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), '7-DAY')
      drawBits(x, COUCH, COUCH_C, 790, 790, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 1050, 'MON–SUN: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Sun. Rain. Snow. | *Same sentence.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55)), k = pop01(t, P.t0 + 0.3 + n * 0.71, 0.25, 2.2)
      if (n === 0) drawBits(x, SUN, SUN_C, 790, 780, 18 * k)
      if (n === 1) { drawBits(x, CLOUD, CLOUD_C, 790, 760, 18 * k); rain(x, t, 790, 810, 220, 160, 8) }
      if (n === 2) { drawBits(x, CLOUD, CLOUD_C, 790, 760, 18 * k); for (let i = 0; i < 4; i++) drawBits(x, SNOW, { W: '#fff' }, 700 + i * 60, 860 + 30 * Math.sin(t * 3 + i), 8 * k) }
      bubble(x, 780, 1060, ['sunny—', 'rain—', 'snow—'][n], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Said bring a jacket. | *Brought you one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'bring a jacket!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, JACKET, JACKET_C, 800, 920, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 800, 1160, 'IT’S YOUR SIZE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Pointed at the sun. | *“That’s me.”*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.3 })
      bubble(x, 790, 1050, 'that’s me.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 56, col: GOLD, tail: 'bl' })
      sparkles(x, t, 800, 760, P.t0 + 1.1, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Rain at 3:07. | *Not 3:08.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 650, 'RAIN: 3:07 PM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, CLOUD, CLOUD_C, 790, 860, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      if (lt > 1.4) rain(x, t, 790, 910, 220, 200, 8)
      label(x, 790, 1150, 'ON TIME.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Sun or rain? | *Couldn’t decide.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sw = Math.sin(lt * 5) * 0.15
      x.save(); x.translate(790, 760); x.rotate(sw); x.translate(-790, -760)
      x.fillStyle = INK; x.fillRect(620, 752, 340 * k, 16)
      drawBits(x, SUN, SUN_C, 650, 690, 11 * k)
      drawBits(x, CLOUD, CLOUD_C, 930, 700, 10 * k)
      x.restore()
      x.fillStyle = INK; x.fillRect(782, 760, 16, 240 * k)
      bubble(x, 790, 1100, 'sun-ish? | rain-ish?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Forecast: cloudy. | *Won’t say why.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CLOUD, DARK_C, 790, 740, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 960, 'you know why.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1150, 'SOURCES: SECRET', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: '#c97bff', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wrong city. | Reporting *live anyway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      board(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), 'YOUR CITY')
      const k = pop01(t, P.t0 + 0.8, 0.3, 2.2)
      if (k > 0.01) { x.save(); x.translate(790 + 120, 820); x.scale(k, k); x.fillStyle = '#ff6b5a'; x.beginPath(); x.arc(0, -40, 30, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-26, -26); x.lineTo(26, -26); x.lineTo(0, 20); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(0, -40, 10, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1060, 'LIVE: WRONG CONTINENT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: '#ff9a4a', rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Forecast for | *the next decade.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ys = ['2027: SUNNY', '2030: MILD', '2033: BREEZY', '2036: SUNNY']
      ys.forEach((s, i) => label(x, 790, 640 + i * 130, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), { size: 34, bg: i % 2 ? BONE : '#9aa5c4', rot: i % 2 ? 0.03 : -0.03, font: MONO, weight: 700 }))
    } },
  { sign: 'aquarius', cap: 'Did the weather | on *another planet.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 790, 1000, 'SATURN: BREEZY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
      bubble(x, 790, 1150, 'local news? boring.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Forecast: rain. | *Mostly from me.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOUD, CLOUD_C, 800, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      rain(x, t, 800, 770, 220, 200, 8)
      label(x, 790, 1060, 'CHANCE OF TEARS: YES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0007', key: 'E', accent: SKYB, ending: 'lesson',
  title: 'The signs | *doing the weather.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody checked | *the window.*' },
  lesson: { text: 'Some days rain. | Someone brings *the jacket.*', chip: 'FORECAST: CLEAR' },
  last: {
    text: 'Tomorrow: | *sunny-ish.*',
    draw(x, t, lt) { drawBits(x, SUN, SUN_C, 540, 740, 18 * pop01(lt, 0.6, 0.4, 2), { rot: t * 0.3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
