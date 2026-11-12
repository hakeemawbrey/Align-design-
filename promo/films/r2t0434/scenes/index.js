// r2t0434: star_talk, BE LIKE, "Zodiacs trying on clothes | *be like.*" (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order in the changing room, each the most extreme version of itself. Ending: lesson.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ bought it without trying it on · ♉ petted every sweater, bought the softest · ♊ two outfits, wore both
//              · ♋ tried on new clothes, bought the same old hoodie · ♌ asked the mirror, the mirror clapped · ♍ found the one crooked seam
//              · ♎ two shirts, forty minutes · ♏ all black, different black · ♐ tried on hiking boots, hiked home
//              · ♑ found the perfect blazer, bought six · ♒ wore the curtain as a cape · ♓ jeans didn't fit, cried in the changing room
//  49.2        "Nobody left | *empty-handed.*" · 52.4 LESSON: "Wear what feels | like *you.*"  STYLE: YOURS
//  58.3        "The hoodie | *always wins.*"  Cancer's hoodie comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const SHIRT = ['.CC....CC.', 'CCCC..CCCC', 'CCCCCCCCCC', '.CCCCCCCC.', '..CCCCCC..', '..CCCCCC..', '..CCCCCC..', '..CCCCCC..']
const shirt = c => ({ C: c })
const HOODIE = ['...HHHH...', '..HH..HH..', '.HHHHHHHH.', 'HHHHHHHHHH', 'HH.HHHH.HH', 'HH.HPPH.HH', 'HH.HHHH.HH', '...HHHH...', '...HHHH...']
const HOODIE_C = { H: '#8a8fb0', P: '#6b6f90' }
const BOOT = ['.KKKK....', '.KBBK....', '.KBBK....', '.KBBK....', '.KBBBKKK.', 'KBBBBBBBK', 'KKKKKKKKK']
const BOOT_C = { K: INK, B: '#a0673a' }
const CAPE = ['RRRRRRRRRR', 'RWRRWRRWRR', 'RRRRRRRRRR', 'RRWRRWRRWR', 'RRRRRRRRRR', 'RWRRWRRWRR', 'RRRRRRRRRR', 'RRWRRWRRWR']
const CAPE_C = { R: '#ff8fb1', W: '#ffd1e0' }
const JEANS = ['BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB', 'BBB..BBB', 'BBB..BBB', 'BBB..BBB', 'BBB..BBB', 'BBB..BBB']
const JEANS_C = { B: '#4a6fc0' }
const BAG = ['..KKKK..', '.K....K.', 'GGGGGGGG', 'GGGGGGGG', 'GGWWWWGG', 'GGGGGGGG', 'GGGGGGGG']
const BAG_C = { K: INK, G: GOLD, W: CREAM }
const MIRROR = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSWSSSSSSK', 'KSSWSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK']
const MIRROR_C = { K: '#c98f5a', S: '#cfe8ff', W: '#ffffff' }
const BLACKS = ['#151020', '#1b1430', '#211a2c']

const CAMEOS = [
  { sign: 'aries', cap: 'Didn’t try it on. | *Already bought it.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bits(x, t, BAG, BAG_C, 790, 880, 24, P.t0 + 0.2)
      label(x, 790, 660, 'SOLD! (4 SEC)', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SIZE: WHO CARES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Petted every sweater. | *Bought the softest.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      ;[SAND, PINK, MINT].forEach((c, i) => bits(x, t, SHIRT, shirt(c), 690 + i * 100, 860 + (i % 2) * 30, 11, P.t0 + 0.2 + i * 0.25))
      label(x, 790, 680, 'SOFTNESS: 11/10', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'like a cloud', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Two outfits. | *Wore both.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P, F) {
      bits(x, t, SHIRT, shirt(GOLD), 720, 860, 16, P.t0 + 0.2)
      bits(x, t, SHIRT, shirt(SKYB), 850, 880, 16, P.t0 + 0.5)
      label(x, 790, 1080, 'LAYERED: ×2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Tried on new clothes. | *Bought the same hoodie.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, HOODIE, HOODIE_C, 790, 880, 24, P.t0 + 0.2)
      label(x, 790, 640, 'HOODIE #7', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'it’s home', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Asked the mirror. | *The mirror clapped.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, t, MIRROR, MIRROR_C, 790, 860, 30, P.t0 + 0.2)
      bubble(x, 790, 620, 'STUNNING', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 200, 0.2)
      label(x, 790, 1110, 'APPLAUSE: LOUD', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Found the one | *crooked seam.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, SHIRT, shirt(BONE), 790, 880, 22, P.t0 + 0.2)
      if (lt > 0.8) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(850, 940, 46, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 660, 'DEFECT FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: '#b6e08a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, '(it’s 1 mm)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two shirts. | *Forty minutes.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const L = Math.floor(lt * 2.4) % 2
      bits(x, t, SHIRT, shirt(PINK), 710, 860, L ? 14 : 18, P.t0 + 0.2)
      bits(x, t, SHIRT, shirt(LAV), 870, 860, L ? 18 : 14, P.t0 + 0.3)
      label(x, 790, 1080, `MINUTE ${1 + Math.floor(clamp((lt - 0.3) / 1.8) * 39)}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'All black. | *Different black.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['BLACK', 'BLACKER', 'VOID'].forEach((n, i) => {
        bits(x, t, SHIRT, { C: BLACKS[i] }, 690 + i * 100, 830, 10, P.t0 + 0.2 + i * 0.3, { outline: BONE })
        label(x, 690 + i * 100, 960 + (i % 2) * 40, n, pop01(t, P.t0 + 0.5 + i * 0.35, 0.3, 2.2), { size: 22, bg: BONE, rot: (i - 1) * 0.06, font: MONO, weight: 700 })
      })
      bubble(x, 800, 1110, 'huge difference', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tried on hiking boots. | *Hiked home.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, t, BOOT, BOOT_C, 760, 900, 18, P.t0 + 0.2)
      bits(x, t, BOOT, BOOT_C, 860, 920, 18, P.t0 + 0.35)
      label(x, 790, 680, 'MILES: 9', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'RECEIPT: STILL ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Found the perfect blazer. | *Bought six.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) bits(x, t, SHIRT, shirt('#4b5a78'), 700 + (i % 3) * 90, 780 + Math.floor(i / 3) * 140, 9, P.t0 + 0.2 + i * 0.15)
      label(x, 790, 1100, 'MON–SAT: SORTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wore the curtain. | *As a cape.*', mood: 'sparkle', look: [1, -1], star: { x: -60 }, hops: [1.4],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CAPE, CAPE_C, F.x + 150, F.cy + 40, 30 * k, { rot: 0.18 + 0.06 * Math.sin(t * 5) })
    },
    front(x, t, lt, P) {
      label(x, 760, 650, 'FROM CHANGING ROOM 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 26, bg: '#6fd6ff', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 1110, 'it’s couture', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Jeans didn’t fit. | *Cried in the changing room.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, JEANS, JEANS_C, 790, 880, 24, P.t0 + 0.2)
      label(x, 790, 650, 'SIZE: LIES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s the jeans, | not me', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0434', key: 'D', accent: PINK, ending: 'lesson',
  title: 'Zodiacs trying on clothes | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody left | *empty-handed.*' },
  lesson: { text: 'Wear what feels | like *you.*', chip: 'STYLE: YOURS' },
  last: {
    text: 'The hoodie | *always wins.*',
    draw(x, t, lt) { drawBits(x, HOODIE, HOODIE_C, 540, 1580, 22 * pop01(t, t - lt + 0.5, 0.4, 2)); sparkles(x, t, 540, 1580, t - lt + 0.8, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-140px', width: '1360px', transformOrigin: '50% 0', transform: 'scale(0.78)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
