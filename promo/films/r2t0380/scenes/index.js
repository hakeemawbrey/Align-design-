// r2t0380: star_talk SOLO (sagittarius), "Sags on a trip | *be like.*" (~45 s vertical, signs3kit social cut, lofi · F)
// Nine travel moments, each the most extreme Sagittarius version:
//   packed in four minutes, one sock · no itinerary, just a wiggly map · befriended the whole hostel · tried every street
//   snack, twice · learned one phrase, used it everywhere · got lost, called it a detour · extended the trip three times
//   · the souvenir is a new hobby · home for a day, booked the next one
//  37.8   "Free spirit. | *Full passport.*"  Sagittarius comes back, big.
//  41.2   callback: "Day 94. | *“Almost home.”*"  the RETURN: TBD sign from the extended-trip card, now a beach.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff'
const PACK = [
  '...GGGG...',
  '..G....G..',
  '.GGGGGGGG.',
  'GGGGGGGGGG',
  'GGgggggGGG',
  'GGgGGGgGGG',
  'GGgggggGGG',
  'GGGGGGGGGG',
  '.GGGGGGGG.',
]
const PACK_C = { G: '#3e9e5b', g: '#5fd07a' }
const SOCK = ['.SS.', '.SS.', '.SS.', '.SSS', 'SSSS', 'SSS.']
const SKEWER = ['K', 'R', 'R', 'Y', 'Y', 'G', 'G', 'R', 'R', 'K', 'K', 'K']
const SKEWER_C = { K: '#a8743f', R: '#e2564e', Y: '#ffd23a', G: '#5fd07a' }
const SURF = ['..PP..', '.PPPP.', '.PWWP.', 'PPWWPP', 'PPWWPP', 'PPWWPP', 'PPWWPP', '.PWWP.', '.PPPP.', '..PP..']
const SURF_C = { P: '#ff8fb1', W: '#fff4e2' }
const PALM = [
  '.GG..GG..',
  'GGGGGGGGG',
  '.GG.T.GG.',
  '....T....',
  '....T....',
  '....T....',
  '...TT....',
  '...T.....',
]
const PALM_C = { G: '#3e9e5b', T: '#a8743f' }
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -136, 352, 272)
  x.fillStyle = '#fff1b0'; x.fillRect(-168, -128, 336, 256)
  x.fillStyle = '#c4f0ff'; x.fillRect(60, -128, 108, 120)
  x.fillStyle = '#9ee6c9'; x.fillRect(-168, 40, 120, 88)
  const p = clamp((lt - 0.3) / 1.6)
  x.fillStyle = '#e23d4e'
  for (let i = 0; i < 40 * p; i++) { const u = i / 40, px = -140 + u * 280, py = Math.sin(u * 14) * 70 + Math.cos(u * 5) * 30; x.fillRect(px - 4, py - 4, 8, 8) }
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 140, 60)
  x.restore()
}
function compass(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -74); x.fillText('S', 0, 76); x.fillText('E', 74, 2); x.fillText('W', -74, 2)
  x.rotate(t * 7)
  x.fillStyle = '#e23d4e'; x.beginPath(); x.moveTo(0, -64); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 64); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.restore()
}

const ST = { x: -170 }
const RET = ['RETURN: FRI', 'RETURN: MON', 'RETURN: JUNE?', 'RETURN: TBD']
const CAMEOS = [
  { sign: 'sagittarius', cap: 'Packed in four minutes. | *One sock.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SOCK, { S: '#ff9a4a' }, 900, 1070, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.3 })
      label(x, 790, 640, 'PACKED: 0:04', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The itinerary? | *Vibes and a map.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'ROUTE: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#ff9a4a', rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Befriended | *the whole hostel.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const IDS = ['aries', 'leo', 'gemini', 'aquarius', 'libra', 'pisces']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2); if (k > 0.01) signChar(x, t, id, 680 + (i % 3) * 120, 820 + Math.floor(i / 3) * 170, 120 * k, { mood: 'happy', look: [-1, 0], seed: 40 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 }) })
      label(x, 800, 1130, 'NEW FRIENDS: 23', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Tried every street snack. | *Twice.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, SKEWER, SKEWER_C, 680 + i * 56, 880, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2), { rot: (i - 2) * 0.1 })
      label(x, 790, 650, 'ROUND 2', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Learned one phrase. | *Used it everywhere.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const at = [[790, 680], [700, 880], [880, 1060]]
      at.forEach(([bx, by], i) => bubble(x, bx, by, 'bonjour!!', pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 42, col: [BONE, '#ffe36a', LAV][i], tail: 'bl' }))
    } },
  { sign: 'sagittarius', cap: 'Got lost. | *Called it a detour.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      compass(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'SCENIC ROUTE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Extended the trip. | *Three times.*', mood: lt => lt > 1.6 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [0.7, 1.2, 1.7],
    front(x, t, lt, P) {
      label(x, 790, 860, RET[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: lt > 1.65 ? PINK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The souvenir? | *A whole new hobby.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SURF, SURF_C, 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.25 })
      label(x, 790, 1110, 'SURFER NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Home for one day. | *Booked the next.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'HOME: DAY 1', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'NEXT TRIP: BOOKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0380', key: 'F', accent: ACC, solo: 'sagittarius', ending: 'callback',
  title: 'Sags on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Full passport.*', mood: 'sparkle' },
  last: {
    text: 'Day 94. | *“Almost home.”*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = '#e0c86a'; x.fillRect(120, 1300, 840, 90)
      x.fillStyle = '#6fc3ff'; x.fillRect(120, 1390, 840, 60)
      x.restore()
      drawBits(x, PALM, PALM_C, 820, 1150, 34 * k)
      if (k > 0.01) signChar(x, t, 'sagittarius', 460, 1180, 300 * k, { mood: lt > 1.4 ? 'wink' : 'sparkle', seed: 85, glyph: false, hops: [t - lt + 1.5] })
      label(x, 760, 900, 'RETURN: TBD', pop01(lt, 1.0, 0.3, 2.4), { size: 52, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
