// r2t0677: THE SIGNS AS… v3, "The signs in | long distance." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in a long-distance relationship, each pushed to the extreme. Ending: card.
//   ♈ "surprise, I'm outside" (drove 14 hrs) · ♉ mailed a whole lasagna · ♊ one video call, nine hours
//   · ♋ sleeps with their hoodie, it has a name · ♌ a selfie every hour · ♍ a countdown to the second
//   · ♎ couldn't pick a city, moved to the middle · ♏ secretly lives in your time zone · ♐ long distance = free trips
//   · ♑ a savings jar labelled "us" · ♒ a string phone across three states · ♓ cries at arrivals and departures
//   group "Far away. | *Never far.*"   LESSON "Distance is a test. | *Love shows up.*"
//   last "Libra: halfway. | *Aries: the rest.*" over the match card: Libra + Aries.
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, GREEN, SLATE } from '../props.js'

const L = { x: -170 }
const LASAGNA = [
  'BBBBBBBBBBBBB',
  'BYYRYYYRYYYRB',
  'BRRRRRRRRRRRB',
  'BYYYYYYYYYYYB',
  'BRRRRRRRRRRRB',
  'BYYYYYYYYYYYB',
  '.BBBBBBBBBBB.',
]
const LASAGNA_C = { B: '#9aa5c4', Y: '#ffe7a8', R: RED }
const HOODIE = [
  '....HHHHH....',
  '...HH...HH...',
  '.HHHH...HHHH.',
  'HHHHHHHHHHHHH',
  'HH.HHHWHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HHPPPHH.HH',
  '...HHHHHHH...',
  '...HHHHHHH...',
]
const HOODIE_C = { H: '#8fe3ff', W: BONE, P: '#6fc3ff' }
const PLANE = [
  '......W.......',
  '......WW......',
  'W.....WWW.....',
  'WW..WWWWWWWWW.',
  'WWWWWWWWWWWWWB',
  'WW..WWWWWWWWW.',
  'W.....WWW.....',
  '......WW......',
  '......W.......',
]
const JAR = [
  '.LLLLLLL.',
  '.LLLLLLL.',
  'GGGGGGGGG',
  'G.......G',
  'G.YY.Y..G',
  'G.YYYYY.G',
  'GYYYYYYYG',
  'GYYYYYYYG',
  '.GGGGGGG.',
]
const JAR_C = { L: WOOD, G: '#bfe8ff', Y: GOLD }
const CUP = ['RRRRR', 'RRRRR', '.RRR.', '.RRR.', '..R..']

/** a little map: two pins far apart and a house exactly between them */
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-182, -132, 380, 280)
  x.fillStyle = INK; x.fillRect(-196, -146, 392, 292)
  x.fillStyle = '#bfe0a8'; x.fillRect(-188, -138, 376, 276)
  x.fillStyle = '#8fc6e8'; x.beginPath(); x.ellipse(110, 80, 90, 50, 0.3, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(27,18,54,0.6)'; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(-140, -60); x.lineTo(140, -20); x.stroke(); x.setLineDash([])
  const pin = (px, py, c) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py - 30, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(px, py - 30, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(px - 4, py - 12, 8, 16) }
  pin(-140, -50, '#ff6b5a'); pin(140, -10, PINK)
  const h = pop01(lt, 1.0, 0.3, 2.2)
  if (h > 0.01) bits(x, 'house', 0, -20, 9 * h)
  x.restore()
}
/** two cups and a string between them that runs off-panel and back */
function stringPhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= Math.min(1, k)
  x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 140, cy + 20)
  for (let i = 0; i <= 20; i++) x.lineTo(cx - 140 + i * 15, cy + 20 - Math.sin(i / 20 * Math.PI) * 90 * k + Math.sin(t * 4 + i) * 3)
  x.stroke(); x.restore()
  drawBits(x, CUP, { R: '#ff6b5a' }, cx - 160, cy + 40, 18 * k, { rot: 0.6 })
  drawBits(x, CUP, { R: MINT }, cx + 175, cy + 40, 18 * k, { rot: -0.6 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Missed them once. | *Drove fourteen hours.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: L, hops: [0.6, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'surprise!! | i’m outside.', pop01(t, P.t0 + 0.3, 0.25, 2.3), { size: 46, tail: 'bl' })
      label(x, 790, 980, 'SLEEP: SKIPPED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: '#ff6b5a', rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 700, P.t0 + 0.45, 8, 200, 0.3)
    } },
  { sign: 'taurus', cap: 'Mailed them | *a whole lasagna.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, LASAGNA, LASAGNA_C, 790, 860, 22 * k)
      if (k > 0.9) { x.save(); x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 9; x.lineCap = 'round'; for (const dx of [-60, 0, 60]) { x.beginPath(); for (let j = 0; j <= 9; j++) { const yy = 760 - j * 10, xx = 790 + dx + Math.sin(j * 0.8 + t * 4 + dx) * 9; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() } x.restore() }
      label(x, 790, 1060, 'POSTAGE: WORTH IT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: '#5fd068', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One video call. | *Nine hours.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: L, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const h = Math.min(9, Math.floor(prog(lt, 0.3, 1.6) * 9))
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `${h}:0${Math.floor(lt * 7) % 10}`, head: 'ON CALL', msg: 'wait, one | more thing', bg: '#ffd23a' })
      label(x, 790, 1110, 'TOPIC #212', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Sleeps with their hoodie. | *It has a name.*', mood: 'sleepy', star: L,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      label(x, 790, 1080, 'THIS IS KEVIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 1 })
    } },
  { sign: 'leo', cap: 'Sends a selfie. | *Every single hour.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', star: L,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(prog(lt, 0.3, 1.8) * 23)
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♌︎', head: 'NEW PHOTO', msg: `selfie | #${n}`, bg: '#ffb34a' })
      label(x, 790, 1110, 'MISS ME YET?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made a countdown. | *To the second.*', mood: 'squint', star: L,
    front(x, t, lt, P) {
      const s = 59 - (Math.floor(lt * 6) % 60)
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), `41d 6h 12m | ${String(s).padStart(2, '0')}s`, { head: 'SEE YOU IN', headBg: MINT, size: 46, w: 380, font: MONO, weight: 700 })
      label(x, 790, 1080, 'ITINERARY v14', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a city. | *Moved to the middle.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', star: L,
    front(x, t, lt, P) {
      map(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'HOME: EXACTLY HALFWAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Secretly lives | *in your time zone.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 680, 'WATCH: SET TO YOURS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: '#c97bff', color: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'it’s 3 a.m. there. | go to sleep ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Long distance? | *Free vacations.*', mood: 'sparkle', star: L, hops: [1.2],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 1.8)
      drawBits(x, PLANE, { W: BONE, B: '#ff9a4a' }, 660 + 220 * p, 760 - 90 * Math.sin(p * Math.PI), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      label(x, 790, 1060, 'BAGS: NEVER UNPACKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Started a savings jar. | *Label: “us.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', star: L,
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 880, 'US', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 48, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.3, 6, 150, 0.6)
    } },
  { sign: 'aquarius', cap: 'Made a string phone. | *Across three states.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stringPhone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'can you | hear me?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1080, 'STRING: 900 MI', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: '#6fc3ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries at the airport. | *Both ways.*', mood: 'wide', star: L, tears: 3,
    front(x, t, lt, P) {
      const dep = lt > 1.2
      label(x, 790, 720, dep ? 'DEPARTURES' : 'ARRIVALS', pop01(t, P.t0 + (dep ? 1.2 : 0.2), 0.3, 2.2), { size: 48, bg: dep ? '#9aa5c4' : MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, dep ? 'already | miss you!!' : 'you’re | HERE!!', pop01(t, P.t0 + (dep ? 1.4 : 0.5), 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0677', key: 'E', accent: PINK, ending: 'card',
  title: 'The signs in | *long distance.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'ALIGNED' },
  group: { cap: 'Far away. | *Never far.*' },
  lesson: { text: 'Distance is a test. | *Love shows up.*', chip: 'MILES: WORTH IT' },
  last: { text: 'Libra: halfway. | *Aries: the rest.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
