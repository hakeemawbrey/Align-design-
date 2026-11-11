// v3t131: THE SIGNS AS… v3, BELIKE, "Zodiacs on a drive | be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Zodiacs on a drive | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one road-trip moment per sign (3.8 s each), pushed to the extreme:
//              ♈ "are we there yet?" at mile 0 · ♉ front seat, reclined all the way (Gemini squashed behind)
//              · ♊ in charge of music, skips every song · ♋ checks on everyone every ten minutes (water? snacks?)
//              · ♌ forty stops, all photo ops (new profile pic) · ♍ one crumb fell, pulled over (crumb detected)
//              · ♎ where should we eat? mile 300 (FOOD both ways) · ♏ knows a shortcut, won't say how (classified map)
//              · ♐ one quick detour, day three · ♑ split the gas to the penny (receipt) · ♒ no GPS, navigating by stars
//              · ♓ saw a cow, full tears
//  49.2        "Six hundred miles. | *Zero chill.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Finally there. | Aries: *“Home yet?”*"  Aries is back with the mile sign (MILE 600).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROAD = '#2f9e5b', RED = '#e23d4e', WOOD = '#c98f2a'

// ── props
// a green highway sign on a post
function roadSign(x, cx, cy, k, lines, { bg = ROAD, w = 300, size = 40 } = {}) {
  if (k <= 0.01) return
  const L = String(lines).split('|').map(s => s.trim()), h = L.length * size * 1.2 + 40
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 0, 28, 330); x.fillStyle = '#9aa0b4'; x.fillRect(-8, 0, 16, 326)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.strokeStyle = BONE; x.lineWidth = 4; x.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  L.forEach((l, i) => x.fillText(l, 0, -h / 2 + 20 + size * 1.2 * (i + 0.5) + 2))
  x.restore()
}
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#fff4e2', L: LAV }
const BOTTLE = ['.CC.', '.BB.', 'BWBB', 'BWBB', 'BBBB', 'BLLB', 'BLLB', 'BBBB']
const BOTTLE_C = { C: SKYB, B: '#bfe9ff', W: '#ffffff', L: '#5aa9e6' }
const CAMERA = [
  '...KKK.......',
  'KKKKKKKKKKKKK',
  'KGGGGGGGGGGRK',
  'KGGGLLLLLGGGK',
  'KGGLLWLLLLGGK',
  'KGGLLLLLLLGGK',
  'KGGLLLLLLLGGK',
  'KGGGLLLLLGGGK',
  'KGGGGGGGGGGGK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: '#3a3157', G: '#6b6290', L: SKYB, W: '#ffffff', R: RED }
const SPRAY = ['..RRR.', '..R...', '.WWW..', '.BBB..', 'BBBBB.', 'BBWBB.', 'BBWBB.', 'BBBBB.', 'BBBBB.']
const SPRAY_C = { R: RED, W: '#fff', B: MINT }
const TELESCOPE = [
  '..........GG',
  '........GGGG',
  '......GGGGG.',
  '....GGGGG...',
  '..GGGGG.....',
  '.GGGG.......',
  'GGG.........',
  '....K.......',
  '...K.K......',
  '..K...K.....',
  '.K.....K....',
]
const TELESCOPE_C = { G: GOLD, K: '#9aa0b4' }
const COW = [
  'H..........H',
  'HWWW....BWWH',
  '.WWBW..WWBWW',
  '.WWWWWWWWWWP',
  '.WWBBWWWWWPP',
  '.WWBBWWWBBW.',
  '.WWWWWWWBBW.',
  '..W.W..W.W..',
  '..K.K..K.K..',
]
const COW_C = { W: '#ffffff', B: '#3a3157', H: '#e7d7b0', P: PINK, K: '#3a3157' }
// a car stereo with a display that skips
function stereo(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -80, 340, 160)
  x.fillStyle = '#3a3157'; x.fillRect(-162, -72, 324, 144)
  x.fillStyle = '#0d2a1c'; x.fillRect(-140, -56, 280, 60)
  const n = 1 + Math.floor(Math.max(0, lt) * 5)
  x.fillStyle = MINT; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`TRACK ${n}`, 0, -25)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-130 + i * 70, 22, 50, 34); x.fillStyle = i === 3 && Math.floor(lt * 5) % 2 ? GOLD : '#9aa0b4'; x.fillRect(-126 + i * 70, 26, 42, 26) }
  x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText('▶▶', 105, 39)
  x.restore()
}
// a road map with a secret dotted route
function map(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -140, 360, 280)
  const C = ['#f3e3b8', '#e9d6a2', '#f3e3b8']
  for (let i = 0; i < 3; i++) { x.fillStyle = C[i]; x.fillRect(-172 + i * 115, -132, 113, 264) }
  x.strokeStyle = '#7bb7d8'; x.lineWidth = 14; x.beginPath(); x.moveTo(-170, 60); x.bezierCurveTo(-60, 20, 20, 110, 170, 40); x.stroke()
  x.strokeStyle = '#9aa0b4'; x.lineWidth = 10; x.beginPath(); x.moveTo(-150, -120); x.lineTo(-150, 120); x.moveTo(-170, -40); x.lineTo(170, -40); x.stroke()
  const p = clamp((lt - 0.5) / 0.9)
  x.save(); x.setLineDash([12, 10]); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath()
  for (let i = 0; i <= 30 * p; i++) { const u = i / 30, px = -140 + u * 280, py = 100 - u * 210 + 50 * Math.sin(u * 9); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
  if (p >= 1) { x.fillStyle = RED; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 140, -112) }
  x.restore()
}
// a long paper receipt
function receipt(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const h = 380 * clamp(0.3 + lt / 1.4)
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -200, 248, h + 10)
  x.fillStyle = '#fffaf0'; x.fillRect(-118, -194, 236, h - 2)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const rows = ['GAS ........ 41.20', 'PER SIGN .... 3.43', 'YOU ......... 3.43', 'LIBRA ....... 3.43', 'GUM ......... 0.00']
  rows.forEach((r, i) => { if (-170 + i * 44 < -194 + h - 30) x.fillText(r, -104, -166 + i * 44) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked “are we there yet?” | *In the driveway.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -200 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      roadSign(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), 'MILE | 0', { w: 240, size: 52 })
      bubble(x, 520, 600, 'ARE WE | THERE YET?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Front seat. | Reclined *all the way.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), rec = ease.inOutCubic(prog(lt, 0.5, 1.1))
      if (k <= 0.01) return
      x.save(); x.translate(470, 1060); x.rotate(rec * 0.9); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-60, -330, 120, 340); x.fillStyle = '#8a4a2e'; x.fillRect(-52, -322, 104, 324)
      x.fillStyle = INK; x.fillRect(-46, -390, 92, 64); x.fillStyle = '#a65a37'; x.fillRect(-40, -384, 80, 52)
      x.restore()
      drawBits(x, PILLOW, PILLOW_C, 370, 760, 12 * k, { rot: -0.3 })
    },
    front(x, t, lt, P) {
      const g = pop01(t, P.t0 + 0.4, 0.35, 2), squish = ease.outBack ? clamp(prog(lt, 0.9, 1.2)) : 0
      if (g > 0.01) signChar(x, t, 'gemini', 830, 1000, 170 * g, { mood: lt > 1.1 ? 'wide' : 'happy', seed: 31, glyph: false, squash: 0.25 * squish })
      bubble(x, 800, 720, 'my LEGS!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc', col: LAV })
      label(x, 540, 1170, 'SEAT: FULLY BACK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'In charge of music. | *Skips every song.*', mood: lt => Math.floor(lt * 5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stereo(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      notes(x, t, 780, 760, { n: 4, cell: 7, alpha: clamp(lt * 2) })
      label(x, 780, 1080, 'SKIPPED: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Checks on everyone | *every ten minutes.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOTTLE, BOTTLE_C, 720 + i * 90, 960, 16 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2.2), { rot: (i - 1) * 0.12 })
      bubble(x, 600, 640, 'everyone have | WATER? SNACKS?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 810, 1150, 'CHECK-IN #31', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Forty stops. | *All photo ops.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      for (const f of [0.9, 1.3, 1.7]) if (lt > f && lt < f + 0.1) { x.fillStyle = 'rgba(255,250,235,0.5)'; x.fillRect(110, 480, 860, 740) }
      label(x, 790, 680, 'PHOTO STOP #40', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 760, 1110, 'NEW PROFILE PIC', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'One crumb fell. | *Pulled over.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const c = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (c > 0.01) { x.fillStyle = INK; x.fillRect(716, 1056, 22, 18); x.fillStyle = '#e7b46a'; x.fillRect(720, 1060, 14, 10) }
      const r = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (r > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(727, 1065, 60 * r, 0, Math.PI * 2); x.stroke(); x.restore() }
      drawBits(x, SPRAY, SPRAY_C, 860, 900, 18 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.25 })
      sparkles(x, t, 727, 1065, P.t0 + 1.5, 6, 90, 0.4)
      label(x, 720, 680, 'CRUMB DETECTED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Where should we eat? | *Mile three hundred.*', mood: lt => lt > 1.5 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      roadSign(x, 790, 740, pop01(t, P.t0 + 0.2, 0.35, 2), '← FOOD | FOOD →', { w: 310, size: 44 })
      label(x, 540, 1170, 'MILE 300. STILL UNSURE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows a shortcut. | *Won’t say how.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      map(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1090, 'CLASSIFIED', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 44, bg: RED, color: BONE, rot: -0.12, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'One quick detour. | *Day three.*', mood: 'sparkle', star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      roadSign(x, 790, 720, pop01(t, P.t0 + 0.2, 0.35, 2), 'DETOUR →', { bg: '#e8892a', w: 300, size: 44 })
      const d = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.8) * 2))
      label(x, 780, 1090, `DAY ${d}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Split the gas | *to the penny.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      receipt(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 760, 1150, 'PAY BY FRIDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'No GPS. | Navigating *by the stars.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, TELESCOPE, TELESCOPE_C, 720, 950, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const pts = [[700, 600], [790, 650], [870, 590], [830, 720], [920, 760]]
      const n = clamp((lt - 0.5) / 0.8) * pts.length
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
      pts.forEach(([px, py], i) => { if (i < n) i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke(); x.restore()
      pts.forEach(([px, py], i) => { if (i < n + 1) { x.fillStyle = GOLD; x.fillRect(px - 8, py - 8, 16, 16); x.fillStyle = '#fff'; x.fillRect(px - 3, py - 3, 6, 6) } })
      label(x, 700, 1160, 'TURN LEFT AT ORION', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw a cow. | *Full tears.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 1, star: { x: -200 },
    keyCue: null,
    front(x, t, lt, P) {
      drawBits(x, COW, COW_C, 800, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 760, 690, 'A COW!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bc' })
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'v3t131', key: 'C', accent: GOLD, ending: 'callback',
  title: 'Zodiacs on a drive | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Six hundred miles. | *Zero chill.*' },
  last: {
    text: 'Finally there. | Aries: *“Home yet?”*',
    draw(x, t, lt) {
      roadSign(x, 760, 960, pop01(t, t - lt + 0.3, 0.35, 2), 'MILE | 600', { w: 260, size: 52 })
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 400, 1080, 260 * k, { mood: lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.0, t - lt + 1.3, t - lt + 1.6] })
      bubble(x, 420, 830, 'HOME YET?', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
