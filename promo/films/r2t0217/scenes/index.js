// r2t0217: star_talk, ROLL CALL, "The signs | on a cruise." (~63 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself on a cruise ship.
//   0.0–3.6    "The signs | *on a cruise.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ off the boat before it docked · ♉ found the buffet, never left · ♊ knew everyone by lunch
//              · ♋ brought a photo of their couch · ♌ thinks they're the captain now · ♍ alphabetised the deck chairs
//              · ♎ an outfit for every sunset · ♏ stared at the sea, the sea looked away · ♐ missed the boat, swam
//              · ♑ checked the captain's birth chart first · ♒ a dolphin asked their sign · ♓ saw the ocean, cried one
//  49.2        "Same boat. | *Twelve vacations.*"  Group photo.
//  52.4        LESSON UNLOCKED: "Travel your way. | *Everyone's on board.*"  STATUS: SET SAIL
//  58.3        "Pisces is still | *crying. Happily.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, tearsCells, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const SEA = '#3aa0e8', FOAM = '#bfe9ff', NAVY = '#2a2350'

/** the sea: a few wavy bands across the bottom of the panel */
function sea(x, t, top, k = 1, { l = 110, r = 970, bottom = 1225 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.beginPath(); x.rect(l, top - 40, r - l, bottom - top + 40); x.clip()
  for (let b = 0; b < 3; b++) {
    const y0 = top + b * 34
    x.fillStyle = [FOAM, SEA, '#2577c4'][b]
    x.beginPath(); x.moveTo(l, bottom)
    for (let px = l; px <= r; px += 12) x.lineTo(px, y0 + Math.sin(px * 0.03 + t * 2.4 + b) * 10)
    x.lineTo(r, bottom); x.closePath(); x.fill()
  }
  x.restore()
}
const SHIP = [
  '.......RR.......',
  '.......RR.......',
  '....WWWWWWWW....',
  '....WBWBWBWW....',
  '..WWWWWWWWWWWW..',
  '..WBWBWBWBWBWW..',
  'NNNNNNNNNNNNNNNN',
  '.NNNNNNNNNNNNNN.',
  '..NNNNNNNNNNNN..',
]
const SHIP_C = { R: RED, W: CREAM, B: SKYB, N: NAVY }
const HAT = ['...WWWWWWW...', '..WWWWGWWWW..', '.WWWWGGGWWWW.', '.WWWWWGWWWWW.', 'KKKKKKKKKKKKK', '.KKKKKKKKKKK.']
const HAT_C = { W: '#ffffff', G: GOLD, K: NAVY }
const CHAIR = ['SSSSSS', 'S....S', 'SSSSSS', '.S..S.', 'SSSSSS', 'S....S']
const PLATE = ['..WWWWWWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const COUCH = ['..PPPPPPPPPP..', '.PPPPPPPPPPPP.', 'PPQQQQQQQQQQPP', 'PPQQQQQQQQQQPP', 'PPPPPPPPPPPPPP', 'B............B']
const COUCH_C = { P: '#c97bff', Q: '#b7a6ff', B: BROWN }
const DOLPHIN = [
  '......GG.......',
  '.....GGG.......',
  '...GGGGGGGG....',
  '..GGGGGGGGGGG..',
  '.GGWGGGGGGGGGG.',
  'GGGLLLLLLGGGGGG',
  '...LLLLLL...GGG',
  '.............GG',
]
const DOLPHIN_C = { G: '#7a9cc4', L: '#c9d8ea', W: INK }
const GOGGLES = ['KKKK.KKKK', 'KSSKKKSSK', 'KSSK.KSSK', 'KKKK.KKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Off the boat | *before it docked.*', mood: 'sparkle', star: { x: -160, y: -40 }, hops: [0.4, 0.9, 1.4],
    back(x, t, lt, P) { sea(x, t, 1110) },
    front(x, t, lt, P) {
      drawBits(x, SHIP, SHIP_C, 800, 1050, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'PORT: 2 MILES AWAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 380, 620, 'SEE YA!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Found the buffet. | Never *left.*', mood: lt => lt > 1.5 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(8, 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 7))
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { W: CREAM }, 790 + Math.sin(i * 1.7) * 8, 1120 - i * 34, 16)
      label(x, 790, 680, 'DAY 6: STILL HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Knew everyone | by *lunch.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const TAGS = [['HI, I’M BO', PINK], ['ROSA', MINT], ['THE CHEF', SKYB], ['DJ KIM', LAV], ['A SEAGULL', GOLD]]
      TAGS.forEach(([s, c], i) => label(x, 790 + (i % 2 ? 50 : -40), 650 + i * 95, s, pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2), { size: 32, bg: c, rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Brought a photo | of their *couch.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      card(x, 790, 840, 320, 280, k, { bg: GOLD, rot: 0.05 }, () => {
        x.fillStyle = CREAM; x.fillRect(-140, -120, 280, 240)
        drawBits(x, COUCH, COUCH_C, 0, 10, 15)
      })
      bubble(x, 790, 1090, 'miss you, buddy', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Thinks they’re | the *captain now.*', mood: 'sparkle', star: { x: -150 }, hops: [0.7],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 0.7))
      drawBits(x, HAT, HAT_C, F.x, lerp(F.top - 200, F.top - 20, d), 15, { alpha: clamp(d * 3), rot: -0.08 })
      bubble(x, 790, 700, 'FULL SPEED | AHEAD!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 960, 'REAL CAPTAIN: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Alphabetised | the *deck chairs.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const L = ['A', 'B', 'C', 'D', 'E', 'F']
      L.forEach((c, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2)
        const cx = 660 + (i % 3) * 130, cy = 800 + Math.floor(i / 3) * 220
        drawBits(x, CHAIR, { S: ['#ff8fb1', '#8fe3ff', '#7dffb0'][i % 3] }, cx, cy, 14 * k)
        label(x, cx, cy - 90, c, k, { size: 34, bg: CREAM, rot: 0, font: MONO, weight: 700 })
      })
      label(x, 790, 1170, 'SECTION A–F: DONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'An outfit | for *every sunset.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.35; const g = x.createLinearGradient(0, 480, 0, 1220); g.addColorStop(0, '#ff9a4a'); g.addColorStop(1, '#ff8fb1'); x.fillStyle = g; x.fillRect(120, 480, 840, 740); x.restore()
      sea(x, t, 1130)
    },
    front(x, t, lt, P, F) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.24))
      const SC = ['#ff8fb1', '#7dffb0', '#8fe3ff', '#ffd23a', '#c97bff', '#ff6b5a', '#ffffff', '#ffb34a', '#5fd068']
      x.save(); x.fillStyle = INK; x.fillRect(F.x - 120, F.cy + 40, 240, 26); x.fillStyle = SC[n - 1]; x.fillRect(F.x - 112, F.cy + 44, 224, 18); x.restore()
      label(x, 790, 720, `OUTFIT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: SC[n - 1], rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'SUNSET 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stared at the sea. | The sea *looked away.*', mood: 'squint', look: [1, 1], star: { x: -170, y: -30 },
    back(x, t, lt, P) { sea(x, t, 1060) },
    front(x, t, lt, P) {
      // two little eyes in the water, glancing back, then looking away
      const away = lt > 1.3
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      for (const d of [-1, 1]) {
        x.fillStyle = INK; x.fillRect(790 + d * 40 - 18 * k, 1090 - 18 * k, 36 * k, 36 * k)
        x.fillStyle = '#ffffff'; x.fillRect(790 + d * 40 - 14 * k, 1090 - 14 * k, 28 * k, 28 * k)
        x.fillStyle = INK; x.fillRect(790 + d * 40 + (away ? 2 : -12) * k, 1090 - 6 * k, 10 * k, 12 * k)
      }
      bubble(x, 800, 900, 'ok, ok…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: FOAM, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Missed the boat. | *Swam* to the next port.', mood: 'sparkle', look: [1, 0], star: { x: -120, y: 100, s: 260 }, hops: [],
    back(x, t, lt, P) {
      const p = prog(lt, 0, 2.4)
      drawBits(x, SHIP, SHIP_C, lerp(800, 900, p), 940, 9 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      sea(x, t, 1010)
      drawBits(x, GOGGLES, { K: INK, S: SKYB }, F.x, F.cy - 14, 13, { outline: null })
      label(x, 790, 650, 'SWIMMING: TO ITALY', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Checked the captain’s | *birth chart first.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 1060, 'CAPRICORN RISING: SAFE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'approved.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'A dolphin asked | their *sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P) { sea(x, t, 1080) },
    front(x, t, lt, P) {
      const j = ease.outCubic(prog(lt, 0.3, 0.8))
      drawBits(x, DOLPHIN, DOLPHIN_C, 800, lerp(1180, 960, j) + Math.sin(t * 3) * 6, 17, { rot: -0.2, alpha: clamp(j * 3) })
      bubble(x, 790, 700, 'what’s your | sign?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: FOAM, tail: 'bc' })
      label(x, 380, 640, 'IT’S A MATCH', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw the ocean. | *Cried an ocean.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -150, y: -40 }, hops: [],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { sea(x, t, lerp(1150, 980, ease.inOutCubic(prog(lt, 0.4, 2.2)))) },
    front(x, t, lt, P) {
      label(x, 790, 700, 'SEA LEVEL: RISING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'it’s so | beautiful!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0217', key: 'E', accent: SKYB, ending: 'lesson',
  title: 'The signs | *on a cruise.*',
  cameos: CAMEOS,
  group: { cap: 'Same boat. | *Twelve vacations.*' },
  lesson: { text: 'Travel your way. | *Everyone’s on board.*', chip: 'STATUS: SET SAIL' },
  last: {
    text: 'Pisces is still | *crying. Happily.*',
    draw(x, t, lt) {
      const t0 = t - lt
      hearts(x, t, 540 + 2.5 * 165, 1300, t0 + 0.8, { n: 6, life: 2.2, spread: 160, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
