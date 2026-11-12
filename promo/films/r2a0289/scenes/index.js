// r2a0289: star_advice, ADVICE ROLLCALL, "Each sign's | *travel style.*" (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line about how each sign travels, each with a light visual gag. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ sprint to the gate, then breathe at the view · ♉ the map is all food pins (smart) · ♊ ten cities, savour one
//              · ♋ packed their own pillow · ♌ an outfit per photo spot, look up too · ♍ sanitiser in every pocket, also: fun
//              · ♎ can't choose? spin the globe · ♏ off the map, share your location · ♐ booked at midnight, text when you land
//              · ♑ out of office: ON · ♒ skipped the landmark, found the spoon museum · ♓ cried at every sunset
//  49.2        "Twelve ways | *to see the world.*"
//  52.4        LESSON: "Go slow. | Come home *full.*"  TRIP: TREASURED
//  58.3        "Window seat? | *All yours.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SUN = '#ffb34a', RED = '#e23d4e', BLUE = '#3d8fd8', GREEN = '#5fd068', BROWN = '#c98f5a'

// ── props
function screenBox(x, cx, cy, k, w, h, col, draw, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  draw(x)
  x.restore()
}
/** a folded map with pins */
function map(x, cx, cy, k, lt) {
  screenBox(x, cx, cy, k, 360, 300, '#e9f2d8', x => {
    x.fillStyle = '#cfe3b0'; x.fillRect(-60, -150, 120, 300)
    x.fillStyle = '#9fd0f0'; x.beginPath(); x.moveTo(-180, 60); x.quadraticCurveTo(-40, 20, 180, 110); x.lineTo(180, 150); x.lineTo(-180, 150); x.fill()
    x.strokeStyle = '#c9bfae'; x.lineWidth = 6; x.beginPath(); x.moveTo(-160, -120); x.lineTo(150, 40); x.moveTo(-100, 120); x.lineTo(120, -130); x.stroke()
    const PINS = [[-110, -70], [40, -90], [120, 10], [-40, 20], [70, 80], [-140, 40]]
    PINS.forEach(([px, py], i) => {
      const a = clamp((lt - 0.4 - i * 0.12) / 0.15)
      if (a <= 0) return
      x.globalAlpha = a
      x.fillStyle = INK; x.beginPath(); x.arc(px, py - 22, 22, 0, Math.PI * 2); x.fill()
      x.fillStyle = RED; x.beginPath(); x.arc(px, py - 22, 17, 0, Math.PI * 2); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.arc(px, py - 22, 7, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK; x.fillRect(px - 3, py - 4, 6, 14)
      x.globalAlpha = 1
    })
  })
}
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWPWWWWWWPWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWWPWWWWWWPWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const CAMERA = ['....KKKK......', 'KKKKKKKKKKKKKK', 'KGGGGKKKKGGGGK', 'KGGGKBBBBKGGGK', 'KGGKBWBBBBKGGK', 'KGGKBBBBBBKGGK', 'KGGKBBBBBBKGGK', 'KGGGKBBBBKGGGK', 'KGGGGKKKKGGGGK', 'KKKKKKKKKKKKKK']
const BOTTLE = ['.KKK.', '.KWK.', 'KKKKK', 'KMMMK', 'KMWMK', 'KMMMK', 'KMMMK', 'KKKKK']
/** a globe spinning on its stand */
function globe(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 140, 16, 50); x.fillRect(-80, 184, 160, 16)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 160, Math.PI * 0.6, Math.PI * 1.4); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = BLUE; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.clip()
  const sp = lt < 1.5 ? lt * 900 : 1.5 * 900
  for (let i = 0; i < 4; i++) { const px = ((i * 140 + sp) % 560) - 280; x.fillStyle = GREEN; x.fillRect(px - 40, -70 + (i % 2) * 60, 80 + (i % 3) * 20, 60 + (i % 2) * 30) }
  x.restore()
  if (lt > 1.5) { x.fillStyle = RED; x.beginPath(); x.moveTo(30, -40); x.lineTo(46, -6); x.lineTo(14, -6); x.fill(); x.fillStyle = INK; x.fillRect(27, -6, 6, 20) }
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 }); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    label(x, cx, cy, from, 1, { size, bg: fromBg, rot: -0.04, font: MONO, weight: 700 })
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 170, cy + 10); x.lineTo(cx - 170 + 340 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  label(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), { size, bg: toBg, rot: 0.04, font: MONO, weight: 700 })
}
function sunset(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const y = cy + 50 * clamp((lt - 0.3) / 1.6)
  x.save(); x.globalAlpha = clamp(k)
  x.beginPath(); x.rect(cx - 180, cy - 200, 360, 240); x.clip()
  x.fillStyle = '#ff9a5a'; x.beginPath(); x.arc(cx, y, 130, 0, 7); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(cx, y, 90, 0, 7); x.fill()
  x.restore()
  x.save(); x.globalAlpha = clamp(k); x.fillStyle = BLUE; x.fillRect(cx - 180, cy + 40, 360, 70)
  x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(cx - 160 + i * 90, cy + 60 + (i % 2) * 22, 50, 6)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sprint to the gate. | Then *breathe* at the view.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 680, 'GATE CLOSES: 1 MIN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.1) { screenBox(x, 790, 940, pop01(t, P.t0 + 1.1, 0.3, 2), 300, 200, '#9fd0f0', x => { x.fillStyle = '#fff8ea'; x.beginPath(); x.ellipse(-50, 10, 70, 26, 0, 0, 7); x.ellipse(60, -30, 60, 22, 0, 0, 7); x.fill(); x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(-150, 100); x.lineTo(-40, 20); x.lineTo(60, 100); x.fill() }) }
      bubble(x, 450, 640, 'wow.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Plans the trip around food. | *Honestly? Smart.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'EVERY PIN: DINNER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ten cities in a week? | *Savour one.*', mood: lt => lt > 1.6 ? 'happy' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.11))
      for (let i = 0; i < Math.min(n, 5); i++) screenBox(x, 760 + i * 14, 900 - i * 22, 1, 280, 140, i % 2 ? SKYB : GOLD, x => { x.fillStyle = INK; x.font = `700 26px ${MONO}`; if (i === Math.min(n, 5) - 1) x.fillText(`TICKET ${n}/10`, 0, 0) }, -0.08 + i * 0.04)
      label(x, 790, 660, lt > 1.6 ? 'STAY A WHILE ♡' : 'NEXT TRAIN: 8 MIN', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: lt > 1.6 ? MINT : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed their own pillow. | *Home travels too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: '#fff8ea', P: PINK }, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 790, 680, 'CARRY-ON: PILLOW', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'An outfit per photo spot. | *Look up too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, G: '#9aa5c4', B: '#2a2350', W: BONE }, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.8 && lt < 1.0) { x.save(); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 790, 1090, 'OUTFIT 6 OF 9', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: SUN, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.4) { x.save(); x.fillStyle = BONE; for (let i = 0; i < 12; i++) x.fillRect(560 + (i * 97) % 400, 520 + (i * 53) % 80, 6, 6); x.restore() }
      bubble(x, 760, 650, 'oh. the stars.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Sanitiser in every pocket. | *Also: have fun.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, BOTTLE, { K: INK, W: BONE, M: MINT }, 650 + (i % 3) * 120, 820 + Math.floor(i / 3) * 170, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: (i % 2 ? 1 : -1) * 0.12 })
      label(x, 790, 650, 'SANITISER: 6', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'FUN: PACKED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick a destination? | *Spin the globe.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      globe(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lt)
      label(x, 800, 640, lt > 1.5 ? 'DECIDED ✓' : 'WHEREVER IT STOPS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: lt > 1.5 ? MINT : PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Off the map, always. | *Share your location though.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BEST FRIEND', headCol: '#c97bff', lines: [
        ['where are u??', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['location: on', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2), true],
        ['ok. stay safe', BONE, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: 'sagittarius', cap: 'Booked it at midnight. | *Text home when you land.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 700, 'BOOKED: 12:03 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: SUN, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 900, 'landed! ♡', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 56, col: MINT, tail: 'bl' })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 5 })
    } },
  { sign: 'capricorn', cap: 'Checking work emails abroad? | *Out of office: on.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 860, lt, 0.9, 'INBOX: 214', 'OUT OF OFFICE: ON', { size: 40 })
      if (lt > 1.4) sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 220, 0.4)
    } },
  { sign: 'aquarius', cap: 'Skipped the famous tower. | Found *the spoon museum.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      screenBox(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 340, 150, '#fff8ea', x => {
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('MUSEUM OF', 0, -26); x.font = `800 46px ${INTER}`; x.fillText('SPOONS', 0, 26)
      }, -0.03)
      if (lt > 0.9) { x.save(); x.translate(790, 1010); x.rotate(0.5); x.fillStyle = INK; x.fillRect(-12, -10, 24, 160); x.beginPath(); x.ellipse(0, -40, 42, 58, 0, 0, 7); x.fill(); x.fillStyle = '#c9d3e8'; x.fillRect(-6, -6, 12, 150); x.beginPath(); x.ellipse(0, -40, 34, 50, 0, 0, 7); x.fill(); x.restore() }
      label(x, 600, 640, 'VISITORS: 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the sunset. | *Every single night.*', mood: 'heart', tears: lt => lt > 0.6 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sunset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.4, 1.6), lt)
      label(x, 770, 1100, 'SUNSETS: 7 · TISSUES: 70', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0289', key: 'E', accent: SUN, ending: 'lesson',
  title: 'Each sign’s | *travel style.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to see the world.*' },
  lesson: { text: 'Go slow. | Come home *full.*', chip: 'TRIP: TREASURED' },
  last: {
    text: 'Window seat? | *All yours.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
