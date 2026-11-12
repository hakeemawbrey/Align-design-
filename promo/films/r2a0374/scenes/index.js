// r2a0374: star_advice, ADVICE ROLLCALL, "How to travel | *with each sign.*" (signs3kit social cut, music: lofi · E). Ending: callback.
//   ♈ let them lead the first hour · ♉ plan the trip around the food · ♊ leave room for detours · ♋ pack a taste of home
//   · ♌ take their photo, then ten more · ♍ let them hold the itinerary · ♎ book somewhere pretty, that's the trip
//   · ♏ find the hidden spot nobody knows · ♐ say yes to one wild plan · ♑ let them plan, then let them rest
//   · ♒ skip the tourist list, go weird · ♓ find them a view to cry at
//   Callback: Taurus is still at the first café.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#6fc3ff', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a paper map with pins (or an X) */
function paperMap(x, cx, cy, k, { pins = [], cross = null, n = 99 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -140, 356, 300)
  x.fillStyle = INK; x.fillRect(-180, -156, 360, 312); x.fillStyle = '#e9f3d2'; x.fillRect(-172, -148, 344, 296)
  x.fillStyle = '#8fe3ff'; x.fillRect(-172, 50, 130, 98); x.fillStyle = '#b9e09a'; x.fillRect(30, -148, 142, 110)
  x.strokeStyle = '#d8c9a8'; x.lineWidth = 3; for (let i = 1; i < 3; i++) { x.beginPath(); x.moveTo(-172 + i * 115, -148); x.lineTo(-172 + i * 115, 148); x.stroke() }
  pins.slice(0, n).forEach(([px, py, col, txt]) => {
    x.fillStyle = INK; x.fillRect(px - 15, py - 34, 30, 30); x.fillStyle = col; x.fillRect(px - 11, py - 30, 22, 22); x.fillStyle = INK; x.fillRect(px - 2, py - 6, 4, 14)
    if (txt) { x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(txt, px, py + 24) }
  })
  if (cross) { const [px, py, p] = cross; x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(px - 26, py - 26); x.lineTo(px - 26 + 52 * clamp(p * 2), py - 26 + 52 * clamp(p * 2)); if (p > 0.5) { x.moveTo(px + 26, py - 26); x.lineTo(px + 26 - 52 * clamp(p * 2 - 1), py - 26 + 52 * clamp(p * 2 - 1)) } x.stroke() }
  x.restore()
}
/** a wooden signpost with arrows */
function signpost(x, t, cx, cy, k, arrows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * 1.3, k * 1.3)
  x.fillStyle = INK; x.fillRect(-14, -230, 28, 440); x.fillStyle = BROWN; x.fillRect(-8, -224, 16, 428)
  arrows.forEach(([txt, dir, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(0, -190 + i * 74); x.rotate(dir * 0.06); x.scale(kk, kk)
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 40
    const x0 = dir > 0 ? 0 : -w
    x.fillStyle = INK; x.fillRect(x0 - 4, -26, w + 8, 52); x.fillStyle = col; x.fillRect(x0, -22, w, 44)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, x0 + w / 2, 2)
    x.restore()
  })
  x.restore()
}
/** a clipboard */
function clipboard(x, cx, cy, k, rows, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = BROWN; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = CREAM; x.fillRect(-124, -150, 248, 316)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -200, 100, 34)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.slice(0, n).forEach(([txt, col], i) => { x.fillStyle = col; x.fillRect(-110, -120 + i * 54, 20, 20); x.fillStyle = INK; x.fillText(txt, -78, -110 + i * 54) })
  x.restore()
}
const JAR = ['.KKKKK.', 'KLLLLLK', 'KKKKKKK', 'KSSSSSK', 'KSWSSSK', 'KSSSSSK', 'KSSSSSK', '.KKKKK.']
const CAMERA = ['..KKK.......', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGWWWWGGGK', 'KGGWSSSSWGGK', 'KGGWSSSSWGGK', 'KGGGWWWWGGGK', 'KKKKKKKKKKKK']
const BALLOON = ['...RRRRR...', '.RRYRRRYRR.', 'RRRYRRRYRRR', 'RRRYRRRYRRR', 'RRRYRRRYRRR', '.RRYRRRYRR.', '..RRYRYRR..', '...RRRRR...', '...K...K...', '...K...K...', '...BBBBB...', '...BBBBB...']
const HAMMOCK = ['K...............K', 'K...............K', '.K.............K.', '..WWWWWWWWWWWWW..', '...WMWMWMWMWMW...', '....WWWWWWWWW....']
const SPOON = ['..SSSSS..', '.SSSSSSS.', 'SSSSSSSSS', 'SSSSSSSSS', '.SSSSSSS.', '..SSSSS..', '....S....', '....S....', '....S....', '....S....', '....S....', '...SSS...']
const MUG = ['.S..S....', '..S..S...', 'KKKKKKK..', 'KMMMMMKKK', 'KMWMMMK.K', 'KMMMMMKKK', '.KKKKK...']

/** rolling waves along the bottom of the panel */
function waves(x, t, y) {
  x.save()
  for (let r = 0; r < 3; r++) {
    x.fillStyle = ['#6fc3ff', '#4f9ee0', '#3a78c0'][r]
    x.beginPath(); x.moveTo(120, 1220)
    for (let i = 0; i <= 42; i++) { const fx = 120 + i * 20; x.lineTo(fx, y + r * 46 + 12 * Math.sin(i * 0.6 + t * 2 + r)) }
    x.lineTo(960, 1220); x.closePath(); x.fill()
  }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Let them lead | *the first hour.*', mood: 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      signpost(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), [['THIS WAY!', 1, GOLD, pop01(t, P.t0 + 0.4, 0.25, 2)], ['NO, THIS WAY!', -1, ORANGE, pop01(t, P.t0 + 0.9, 0.25, 2)]])
      L(x, 800, 1150, 'PACE: SPRINT', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 30, CREAM)
    } },
  { sign: 'taurus', cap: 'Plan the trip | *around the food.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const PINS = [[-110, -60, ORANGE, 'café'], [-20, 30, PINK, 'bakery'], [80, -80, GOLD, 'café 2'], [110, 60, MINT, 'lunch'], [-110, 100, LAV, 'snack']]
      paperMap(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { pins: PINS, n: Math.floor(Math.max(0, lt - 0.3) / 0.25) + 1 })
      L(x, 790, 1080, 'SIGHTS: OPTIONAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Leave room | *for detours.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      signpost(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), [
        ['MUSEUM', 1, SKYB, pop01(t, P.t0 + 0.3, 0.25, 2)], ['A FAIR?!', -1, PINK, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['GOATS?!', 1, MINT, pop01(t, P.t0 + 0.9, 0.25, 2)], ['BOOKSHOP', -1, GOLD, pop01(t, P.t0 + 1.2, 0.25, 2)], ['…MUSEUM?', 1, LAV, pop01(t, P.t0 + 1.6, 0.25, 2)],
      ])
    } },
  { sign: 'cancer', cap: 'Pack them | *a taste of home.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, L: RED, S: '#ffd8a8', W: CREAM }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 900, 'HOME', pop01(t, P.t0 + 0.6, 0.3, 2), CREAM, 0.03, 30)
      bubble(x, 560, 620, 'smells like | my kitchen', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 860, 1060, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Take their photo. | *Then ten more.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, G: '#6b62a8', W: CREAM, S: SKYB }, 800, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (Math.floor(lt * 2.8) % 2 && lt > 0.5) { x.save(); x.globalAlpha = 0.12; x.fillStyle = '#fff'; x.fillRect(120, 480, 840, 740); x.restore() }
      const n = Math.min(11, 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 10))
      L(x, 800, 960, `PHOTO ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 40)
      L(x, 800, 1060, 'NEW PROFILE PIC ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Let them hold | *the itinerary.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), [['7:00 wake', MINT], ['7:12 coffee', GOLD], ['7:31 walk', SKYB], ['8:04 museum', PINK], ['8:05 joy', LAV]], Math.floor(Math.max(0, lt - 0.4) / 0.25) + 1)
      L(x, 790, 1130, 'COLOUR-CODED ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Book somewhere *pretty.* | That’s the trip.', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-150, -140, 300, 280)
        x.fillStyle = '#ffb7d0'; x.fillRect(-130, -120, 260, 130); x.fillStyle = '#6fc3ff'; x.fillRect(-130, 10, 260, 110)
        x.fillStyle = '#ffd23a'; x.fillRect(-20, -40, 40, 40); x.fillStyle = CREAM; x.fillRect(-4, -140, 8, 280); x.fillRect(-150, -4, 300, 8)
        x.restore()
      }
      L(x, 790, 1060, 'VIEW: 10/10', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 36)
      sparkles(x, t, 790, 820, P.t0 + 1.1, 8, 190, 0.3)
    } },
  { sign: 'scorpio', cap: 'Find the hidden spot | *nobody knows.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paperMap(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { cross: [60, 40, clamp((lt - 0.7) / 0.6)] })
      L(x, 790, 1080, 'SECRET COVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c97bff', -0.04, 34, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Say yes | to *one wild plan.*', mood: 'sparkle', star: ST, hops: [0.5, 1.5],
    front(x, t, lt, P) {
      const up = ease.inOutCubic(prog(lt, 0.4, 2.2))
      drawBits(x, BALLOON, { R: ORANGE, Y: GOLD, K: INK, B: BROWN }, 800, lerp(1000, 760, up) + 10 * Math.sin(t * 2), 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 560, 620, 'YES!!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 48, tail: 'bl' })
      L(x, 800, 1150, 'PLAN: UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Let them plan. | *Then let them rest.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HAMMOCK, { K: BROWN, W: CREAM, M: MINT }, 790, 900 + 6 * Math.sin(t * 2), 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'SCHEDULED: NAP', pop01(t, P.t0 + 0.8, 0.3, 2.4), '#2fc79a', -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Skip the tourist list. | *Go weird.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SPOON, { S: '#d8dbe8' }, 820, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      L(x, 790, 640, 'WORLD’S BIGGEST SPOON', pop01(t, P.t0 + 0.9, 0.3, 2.4), ACC, -0.04, 28)
      sparkles(x, t, 820, 820, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: 'pisces', cap: 'Find them | *a view to cry at.*', mood: 'heart', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170, y: -60 },
    back(x, t, lt, P) { waves(x, t, 1050) },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'the OCEAN…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      L(x, 800, 880, 'TEARS: HAPPY', pop01(t, P.t0 + 1.4, 0.3, 2.4), CREAM, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0374', key: 'E', accent: ACC, ending: 'callback',
  title: 'How to travel | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Pack snacks. | *Pack patience.*' },
  last: {
    text: 'And Taurus? | *Still at café one.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1060, 300 * k, { mood: lt > 1.0 ? 'heart' : 'happy', seed: 9, look: [1, 0] })
      drawBits(x, MUG, { K: INK, M: ORANGE, W: CREAM, S: 'rgba(255,255,255,0.55)' }, 770, 1080, 28 * pop01(t, t0 + 0.6, 0.35, 2))
      L(x, 780, 880, 'STOP 1 OF 14', pop01(t, t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
