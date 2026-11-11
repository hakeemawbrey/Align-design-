// v3t083: THE SIGNS AS… v3, "The signs | on vacation." (~61 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | *on vacation.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one holiday per sign (3.8 s each), each pushed to the extreme:
//              ♈ whole itinerary done by 10 a.m. · ♉ never left the hotel bed · ♊ befriended the entire beach
//              · ♋ day one, already homesick · ♌ posed with the sunset, the sunset lost · ♍ packed a bag for every bag
//              · ♎ couldn't pick a beach, checked compatibility · ♏ wore all black to the beach
//              · ♐ missed the flight home on purpose · ♑ work emails from the pool · ♒ skipped the tours, befriended a crab
//              · ♓ saw the ocean, cried twice
//  49.2        "Wish you | *were here.*"
//  52.4        LESSON UNLOCKED: "Take the trip. | You *deserve the view.*"  STATUS: RECHARGED
//  58.3        "Capricorn? | *Still on a call.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', CREAM = '#fff4e2', SAND = '#f2d49b', SEA = '#3fb6f0'

const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....OOOOO....',
  'Y..OOOOOOO..Y',
  '...OOOOOOO...',
  '...OOOOOOO...',
  'Y..OOOOOOO..Y',
  '....OOOOO....',
  '.Y.........Y.',
  '...Y..Y..Y...',
]
const BED = [
  'KK..........',
  'KK.WWWW.....',
  'KK.WWWW.....',
  'KKPPPPPPPPPP',
  'KKPPPPPPPPPP',
  'KKPPPPPPPPPP',
  'KKKKKKKKKKKK',
  'K..........K',
]
const BED_C = { K: BROWN, W: CREAM, P: PINK }
const HOUSE = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '..WWWWWWWW..',
  '..WYYWWDDW..',
  '..WYYWWDDW..',
  '..WWWWWDDW..',
]
const HOUSE_C = { R: RED, W: CREAM, Y: GOLD, D: BROWN }
const BAG = ['..KKKK..', '.K....K.', 'BBBBBBBB', 'BBBBBBBB', 'BBYYYYBB', 'BBBBBBBB', 'BBBBBBBB']
const UMB = [
  '....KKKKK....',
  '..KKKKKKKKK..',
  '.KKKKKKKKKKK.',
  'KKKKKKKKKKKKK',
  'K.K.K.K.K.K.K',
  '......W......',
  '......W......',
  '......W......',
  '......W......',
  '......W......',
]
const UMB_C = { K: '#1b1236', W: '#d8dbe8' }
const PLANE = [
  '......WW......',
  '......WWW.....',
  'R.....WWWW....',
  'RR..WWWWWWWWW.',
  'RRWWWWWWWWWWWW',
  'RR..WWWWWWWWW.',
  'R.....WWWW....',
  '......WWW.....',
  '......WW......',
]
const PLANE_C = { W: CREAM, R: RED }
const CRAB = [
  'R..........R',
  'RR........RR',
  '.R..W..W..R.',
  '.R..K..K..R.',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.R.R....R.R.',
]
const CRAB_C = { R: '#ff6a4d', W: '#ffffff', K: INK }
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSWWWWWWSK.',
  '.KSSSSSSSSK.',
  '.KSWWWWSSSK.',
  '.KKKKKKKKKK.',
  'GGGGGGGGGGGG',
]
const LAPTOP_C = { K: '#2a2350', S: SKYB, W: CREAM, G: '#9aa5c4' }

// a strip of sea + sand across the lower panel
function beach(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = SEA; x.fillRect(150, 1020, 780, 80)
  x.fillStyle = '#8fe3ff'; for (let i = 0; i < 12; i++) x.fillRect(160 + ((i * 70 + t * 40) % 760), 1030 + (i % 2) * 24, 40, 8)
  x.fillStyle = SAND; x.fillRect(150, 1100, 780, 110)
  x.restore()
}
function sign2(x, cx, cy, k, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = BROWN; x.fillRect(-8, -120, 16, 300)
  label(x, -40, -70, a, 1, { size: 32, bg: SKYB, rot: -0.12, font: MONO, weight: 700 })
  label(x, 40, 20, b, 1, { size: 32, bg: PINK, rot: 0.1, font: MONO, weight: 700 })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Whole itinerary done | by *10 a.m.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const items = ['✓ MUSEUM', '✓ HIKE', '✓ MARKET', '✓ SWIM']
      items.forEach((s, i) => label(x, 800, 650 + i * 100, s, pop01(t, P.t0 + 0.25 + i * 0.25, 0.25, 2.2), { size: 34, bg: [MINT, GOLD, SKYB, PINK][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      label(x, 800, 1110, 'TIME: 9:58 AM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Never left | *the hotel bed.*', mood: 'sleepy', star: { x: -40, y: -60, s: 260 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 540, 960, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 680, 'ROOM SERVICE ×9', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 330, 640, 'best trip ever', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Befriended | *the entire beach.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    back(x, t, lt, P) { beach(x, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const words = ['hi!', 'hey!!', 'besties', 'hiii']
      words.forEach((w, i) => bubble(x, 700 + (i % 2) * 190, 650 + Math.floor(i / 2) * 150, w, pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2), { size: 34, tail: i % 2 ? 'br' : 'bl' }))
      label(x, 790, 960, 'FRIENDS: 47', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Day one. | Already *homesick.*', mood: lt => lt > 1.0 ? 'neutral' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { for (let i = 0; i < 3; i++) { x.fillStyle = CREAM; x.fillRect(560 + i * 40, 800 - i * 40, 16 + i * 6, 16 + i * 6) }
        x.fillStyle = INK; x.fillRect(790 - 124 * k, 790 - 114 * k, 248 * k, 228 * k); x.fillStyle = CREAM; x.fillRect(790 - 116 * k, 790 - 106 * k, 232 * k, 212 * k); drawBits(x, HOUSE, HOUSE_C, 790, 790, 15 * k) }
      label(x, 790, 1100, 'MISS YOU, KITCHEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Posed with the sunset. | The sunset *lost.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const sink = ease.inOutCubic(prog(lt, 0.8, 2.0))
      x.save(); x.globalAlpha *= 1 - 0.6 * sink
      drawBits(x, SUN, { Y: GOLD, O: ORANGE }, 800, lerp(780, 960, sink), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      beach(x, t, pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'WINNER: LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 370, 850, P.t0 + 1.5, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Packed a bag | for *every bag.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BAG, { K: '#6b62a8', B: [PINK, LAV, SKYB, MINT][i], Y: GOLD }, 800, 1000 - i * 0, (26 - i * 5.5) * pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2))
      label(x, 800, 690, 'BAG 4 OF 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a beach. | Checked *compatibility.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sign2(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'BEACH A', 'BEACH B')
      label(x, 800, 1110, 'MATCH: 50 / 50', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Wore all black. | *To the beach.*', mood: 'squint', star: { x: -170, y: 20 },
    back(x, t, lt, P) { beach(x, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, UMB, UMB_C, 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { outline: '#6b62a8' })
      label(x, 800, 650, 'SPF: MYSTERY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Missed the flight home. | *On purpose.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, -1], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.3, 2.2))
      drawBits(x, PLANE, PLANE_C, lerp(680, 880, fly), lerp(1000, 720, fly), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.45 })
      label(x, 800, 1110, 'GATE CLOSED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'oh nooo :)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Answered work emails | *from the pool.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) { x.save(); x.globalAlpha *= pop01(t, P.t0 + 0.1, 0.3, 2); x.fillStyle = SEA; x.fillRect(150, 1040, 780, 170); x.fillStyle = '#8fe3ff'; for (let i = 0; i < 10; i++) x.fillRect(170 + ((i * 80 + t * 30) % 740), 1060 + (i % 3) * 40, 44, 8); x.restore() },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2), bob = 6 * Math.sin(t * 3)
      x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1010 + bob, 150 * k, 40 * k, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = PINK; x.beginPath(); x.ellipse(800, 1006 + bob, 140 * k, 32 * k, 0, 0, Math.PI * 2); x.fill(); x.restore()
      drawBits(x, LAPTOP, LAPTOP_C, 800, 930 + bob, 18 * k)
      label(x, 800, 680, 'OUT OF OFFICE: NO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Skipped the tours. | Befriended *a crab.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) { beach(x, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, CRAB, CRAB_C, 800 + 20 * Math.sin(t * 3), 990, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 760, 'his name is gary', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, tail: 'bc' })
      hearts(x, t, 800, 920, P.t0 + 1.4, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 5 })
    } },
  { sign: 'pisces', cap: 'Saw the ocean. | *Cried.* Twice.', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { beach(x, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'it’s so BIG', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 800, 900, 'TEARS: 2 OCEANS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t083', key: 'E', accent: SEA, ending: 'lesson',
  title: 'The signs | *on vacation.*',
  cameos: CAMEOS,
  group: { cap: 'Wish you | *were here.*' },
  lesson: { text: 'Take the trip. | You *deserve the view.*', chip: 'STATUS: RECHARGED' },
  last: {
    text: 'Capricorn? | *Still on a call.*',
    draw(x, t, lt) { drawBits(x, LAPTOP, LAPTOP_C, 540, 1500, 22 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
