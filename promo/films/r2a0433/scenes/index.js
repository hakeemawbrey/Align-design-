// r2a0433: star_advice, ADVICE SOLO, "Virgo, you notice everything. | *Notice yourself.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one light gag each.
// Ending: group.
//   0.0–3.6    hook · 3.6–37.8 nine cards:
//              you spot the typo, spot your wins too · you plan for everyone, pencil in you · you check on everyone, check in on you
//              · one crumb is allowed · rewrote the text six times, the first was fine · you see the flaw, you're not one
//              · done is also right · read your chart with kind eyes · you give great advice, take some
//  37.8        group (the ending): "You’re doing great. | *Really.*"  the Virgo star comes back, heart-eyed.
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
const S = 'virgo', VG = '#b6e08a'
const MIRROR = ['..KKKKKKK..', '.KSSSSSSSK.', 'KSSWSSSSSSK', 'KSWSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', '.KSSSSSSSK.', '..KKKKKKK..', '....KKK....', '..KKKKKKK..']
const MIRROR_C = { K: '#c98f5a', S: '#cfe8ff', W: '#ffffff' }
const PLATE = ['..KKKKKKKK..', '.KWWWWWWWWK.', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', '.KWWWWWWWWK.', '..KKKKKKKK..']
const PLATE_C = { K: INK, W: CREAM }

const CAMEOS = [
  { sign: S, cap: 'You spot every typo. | *Spot your wins too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 330, head: 'TODAY', headCol: VG, rows: [
        ['fixed 1 typo', INK, 1], ['helped 3 ppl', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['drank water', INK, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
      label(x, 780, 1100, 'WINS: 3 ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You plan for everyone. | *Pencil in you.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 380, head: 'SATURDAY', headCol: SLATE, rows: [
        ['10 mom’s move', INK, 1], ['1  sam’s cv', INK, 1], ['4  dog sitting', INK, 1], ['7  ME ♡', PINK, pop01(t, P.t0 + 1.2, 0.3, 2.4)],
      ] })
      sparkles(x, t, 780, 960, P.t0 + 1.2, 6, 120, 0.4)
    } },
  { sign: S, cap: 'You check on everyone. | *Check in on you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SENT', headCol: VG, lines: [
        ['you ok?', BONE, 1, true], ['you ok?', BONE, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['you ok?', BONE, pop01(t, P.t0 + 0.6, 0.2, 2), true], ['and me? ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'One crumb on the counter? | *It’s allowed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, PLATE, PLATE_C, 790, 920, 20, P.t0 + 0.2)
      x.fillStyle = '#c98f5a'; if (lt > 0.4) x.fillRect(840, 870, 14, 12)
      label(x, 790, 700, 'CRUMB: 1', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'STATUS: FINE ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rewrote the text six times? | *The first was fine.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.min(5, Math.floor(clamp((lt - 0.3) / 1.2) * 6))
      label(x, 790, 680, `DRAFT ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: SLATE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'sounds good!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1070, 'SEND IT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You see every flaw. | *You’re not one.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, t, MIRROR, MIRROR_C, 790, 860, 26, P.t0 + 0.2)
      if (k > 0.6) signChar(x, t, S, 790, 810, 140, { mood: lt > 1.2 ? 'heart' : 'neutral', seed: 31, glyph: false, glow: 0.4, alpha: clamp((k - 0.6) * 2.5) })
      bubble(x, 790, 610, 'hi, lovely', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Done right is great. | *Done is great too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.0)
      sheet(x, 780, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 200, head: 'PROGRESS', headCol: GOLD, scale: 1, size: 64, rows: [[`${Math.round(80 + 15 * p)}%`, INK, 1]] })
      label(x, 780, 1040, 'GOOD ENOUGH ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read your own chart | *with kind eyes.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 135)
      label(x, 790, 1070, 'NOTES: ALL NICE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: VG, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'You give great advice. | *Take some.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.3 ? 0.05 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'rest. | drink water.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, 'oh. me too?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      label(x, 790, 1090, 'ADVICE: TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0433', key: 'C', accent: VG, solo: S, ending: 'group',
  title: 'Virgo, you notice everything. | *Notice yourself.*',
  cameos: CAMEOS,
  group: {
    cap: 'You’re doing great. | *Really.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-200px', width: '1480px', transformOrigin: '50% 0', transform: 'scale(0.72)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
