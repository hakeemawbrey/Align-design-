// r2t0107: star_talk, BELIKE, "Machine ate it? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme reaction when the vending machine eats their coin.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ fought the machine, machine won · ♉ not leaving without the chips (DAY 3) · ♊ texted every match
//              · ♋ feels bad for the machine · ♌ stared it down until it apologised · ♍ read the manual, found the flaw
//              · ♎ polled strangers: shake it? · ♏ never forgot, never forgave (the list) · ♐ booked a trip for better snacks
//              · ♑ filed a formal refund request · ♒ rewired it, free snacks for all · ♓ cried, the machine gave two back
//  49.2        "One coin. | *Twelve grudges.*"
//  52.6        "Taurus, day nine: | *got the chips.*"  The machine finally drops the bag; Taurus is still there (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#4fd1c5', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'

// ── props
const CHIPS = [
  '.YYYYYY.',
  'YYYYYYYY',
  'YRRRRRRY',
  'YRWWWWRY',
  'YRWWWWRY',
  'YRRRRRRY',
  'YYYYYYYY',
  '.YYYYYY.',
]
const CHIPS_C = { Y: ORANGE, R: RED, W: CREAM }
const COIN = ['.KKK.', 'KGGGK', 'KGgGK', 'KGGGK', '.KKK.']
const COIN_C = { K: INK, G: GOLD, g: '#ffe9a0' }
const PLANE = [
  '.....W......',
  '.....WW.....',
  'W....WWW....',
  'WWWWWWWWWWWB',
  'W....WWW....',
  '.....WW.....',
  '.....W......',
]
const PLANE_C = { W: '#ffffff', B: SKYB }

// a vending machine: a glass front of snacks, a coin slot and a tray. stuck = one bag hanging at the edge.
function machine(x, t, cx, cy, k, { shake = 0, stuck = 0, drop = 0, sad = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + Math.sin(t * 40) * shake * 10, cy); x.rotate(Math.sin(t * 31) * shake * 0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -200, 256, 416)
  x.fillStyle = INK; x.fillRect(-132, -212, 264, 424); x.fillStyle = TEAL; x.fillRect(-124, -204, 248, 408)
  x.fillStyle = '#140c30'; x.fillRect(-108, -186, 160, 270)
  const COLS = [RED, GOLD, PINK, MINT, LAV, ORANGE]
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    if (r === 3 && c === 1 && (stuck > 0 || drop > 0)) continue
    x.fillStyle = COLS[(r * 3 + c) % 6]; x.fillRect(-98 + c * 50, -172 + r * 64, 38, 44)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-98 + c * 50, -172 + r * 64, 38, 8)
    x.fillStyle = '#9aa5c4'; x.fillRect(-100 + c * 50, -126 + r * 64, 42, 5)
  }
  if (stuck > 0) { x.save(); x.translate(-52, -64 + 10); x.rotate(0.5); x.fillStyle = INK; x.fillRect(-21, -24, 42, 48); x.fillStyle = ORANGE; x.fillRect(-17, -20, 34, 40); x.restore() }
  // glass sheen
  x.fillStyle = 'rgba(143,227,255,0.12)'; x.fillRect(-108, -186, 160, 270)
  // keypad + slot
  x.fillStyle = '#140c30'; x.fillRect(64, -186, 44, 120)
  for (let i = 0; i < 6; i++) { x.fillStyle = BONE; x.fillRect(70 + (i % 2) * 18, -176 + Math.floor(i / 2) * 22, 12, 14) }
  x.fillStyle = INK; x.fillRect(76, -40, 20, 40); x.fillStyle = GOLD; x.fillRect(82, -34, 8, 28)
  // face on the panel (for the sorry / sad beats)
  if (sad > 0) { x.fillStyle = INK; x.fillRect(70, 30, 8, 8); x.fillRect(94, 30, 8, 8); x.fillRect(74, 50, 24, 6) }
  // tray
  x.fillStyle = INK; x.fillRect(-108, 104, 216, 70); x.fillStyle = '#2a2350'; x.fillRect(-100, 112, 200, 54)
  if (drop > 0) { const dy = lerp(-64, 132, ease.inQuad(Math.min(1, drop))); x.save(); x.translate(-52, dy); x.rotate(drop >= 1 ? 1.4 : 0); x.fillStyle = INK; x.fillRect(-25, -28, 50, 56); x.fillStyle = ORANGE; x.fillRect(-21, -24, 42, 48); x.fillStyle = RED; x.fillRect(-21, -6, 42, 12); x.restore() }
  x.restore()
}
// a phone with a few chat bubbles
function phone(x, cx, cy, k, { head = 'MATCHES', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -70 + i * 62); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a paper sheet with a title and lines (manual / grudge list / refund form)
function sheet(x, cx, cy, k, { title, rows = [], col = CREAM, rot = 0.04, lt = 9, stamp = null, stampAt = 1.4 }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -186, 292, 388)
  x.fillStyle = INK; x.fillRect(-150, -198, 300, 396); x.fillStyle = col; x.fillRect(-142, -190, 284, 380)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -146)
  x.fillRect(-116, -118, 232, 4)
  x.font = `800 28px ${INTER}`; x.textAlign = 'left'
  rows.forEach(([txt, c, at], i) => { if (lt > at) { x.fillStyle = c || INK; x.fillText(txt, -112, -76 + i * 52) } })
  if (stamp && lt > stampAt) {
    x.save(); x.translate(20, 120); x.rotate(-0.2); x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-110, -34, 220, 68)
    x.fillStyle = RED; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillText(stamp, 0, 2); x.restore()
  }
  x.restore()
}
// a poll card with two bars
function poll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#140c30'; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = BONE; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('shake it?', 0, -100)
  const a = ease.outCubic(prog(lt, 0.5, 1.6)), b = ease.outCubic(prog(lt, 0.6, 1.7))
  const row = (y, txt, w, c) => { x.fillStyle = '#2a2350'; x.fillRect(-140, y - 26, 280, 52); x.fillStyle = c; x.fillRect(-140, y - 26, 280 * w, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText(txt, -128, y + 2) }
  row(-20, 'YES', 0.5 * a, MINT); row(60, 'NO', 0.5 * b, PINK)
  x.fillStyle = PINK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; if (lt > 1.7) x.fillText('50 / 50. again.', 0, 120)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fought the machine. | *Machine won.*', mood: lt => lt > 1.4 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -200 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      machine(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { shake: lt > 0.3 && lt < 1.4 ? 1 : 0 })
      label(x, 790, 640, 'ROUND 7', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 400, 1130, 'MACHINE: 7 · ARIES: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Not leaving | *without the chips.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      machine(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { stuck: 1 })
      label(x, 390, 640, 'WAITING: DAY 3', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Texted every match: | *“I’ve been robbed.”*', mood: lt => lt > 1.2 ? 'wide' : 'wink', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 780, 860, 1.25 * pop01(t, P.t0 + 0.15, 0.3, 2), { lines: [
        ['I’ve been ROBBED', GOLD, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['by who??', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['a MACHINE', GOLD, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
        ['…', BONE, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Feels bad | *for the machine.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      machine(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { sad: 1 })
      bubble(x, 790, 610, 'it’s okay, buddy', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Stared it down | *until it apologised.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      machine(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { drop: prog(lt, 1.0, 1.3), sad: 1 })
      bubble(x, 790, 610, 'sorry, Leo', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 990, P.t0 + 1.35, 7, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Read the manual. | *Found the flaw.*', mood: 'squint', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), { title: 'MANUAL p.47', lt, rows: [['coin slot', INK, 0.3], ['spiral 3', INK, 0.5], ['sensor', INK, 0.7], ['bolt 12', RED, 1.0]], stamp: 'FOUND IT', stampAt: 1.5 })
    } },
  { sign: 'libra', cap: 'Polled strangers: | *“Should I shake it?”*', mood: lt => lt > 1.7 ? 'wide' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      poll(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
    } },
  { sign: 'scorpio', cap: 'Never forgot. | *Never forgave.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), { title: 'THE LIST', col: '#ead7a8', rot: -0.04, lt, rows: [['1. ex', INK, 0.3], ['2. ex’s cat', INK, 0.5], ['3. THE MACHINE', RED, 1.0]] })
      label(x, 790, 1120, 'GRUDGE: ACTIVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#c66bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booked a trip | *for better snacks.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.6, 2.2))
      drawBits(x, PLANE, PLANE_C, lerp(640, 920, fly), lerp(980, 700, fly), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      label(x, 760, 640, 'GATE: SNACKS ABROAD', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'bye, machine!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Filed a formal | *refund request.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), { title: 'FORM R-1', col: '#ffffff', lt, rows: [['amount: 1 coin', INK, 0.3], ['copies: 3', INK, 0.6], ['tone: firm', INK, 0.9]], stamp: 'URGENT', stampAt: 1.4 })
    } },
  { sign: 'aquarius', cap: 'Rewired it. | *Free snacks for all.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      machine(x, t, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), { shake: lt > 1.0 && lt < 1.3 ? 0.6 : 0 })
      if (lt > 1.2) for (let i = 0; i < 6; i++) { const ph = ((lt - 1.2) * 1.4 + i / 6) % 1; drawBits(x, CHIPS, CHIPS_C, 660 + i * 50, 1000 + ph * 150, 6, { rot: i * 0.7, alpha: 1 - ph }) }
      label(x, 790, 610, 'SNACK REVOLUTION', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried. The machine | *gave two back.*', mood: 'wide', tears: lt => lt > 0.5 ? 3 : 2, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      machine(x, t, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { sad: 1 })
      for (let i = 0; i < 2; i++) { const k = pop01(t, P.t0 + 1.0 + i * 0.25, 0.3, 2.2); drawBits(x, COIN, COIN_C, 760 + i * 70, 1000 - 20 * Math.sin(Math.PI * Math.min(1, k)), 12 * k) }
      label(x, 800, 610, 'PITY REFUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0107', key: 'E', accent: TEAL, ending: 'callback',
  title: 'Machine ate it? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One coin. | *Twelve grudges.*' },
  last: {
    text: 'Taurus, day nine: | *got the chips.*',
    draw(x, t, lt) {
      const t0 = t - lt
      machine(x, t, 700, 1060, 1.25 * pop01(t, t0 + 0.4, 0.4, 2), { drop: prog(lt, 1.2, 1.5) })
      signChar(x, t, 'taurus', 330, 1130, 290, { mood: lt > 1.6 ? 'heart' : 'sleepy', pop: pop01(t, t0 + 0.6, 0.4, 2), seed: 9, hops: [t0 + 1.7], look: [1, 0] })
      sparkles(x, t, 600, 1200, t0 + 1.6, 8, 180, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
