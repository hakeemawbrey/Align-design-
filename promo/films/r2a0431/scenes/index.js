// r2a0431: star_advice, ADVICE SOLO, "Signs a Pisces | *trusts you.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): the soft, relatable ways a Pisces shows they trust you, one light gag each.
// Pisces cries in every card (happy tears count). Ending: callback.
//   0.0–3.6    hook · 3.6–37.8 nine cards:
//              the 6-minute voice note · you hear about the whale dream · happy tears in front of you · the secret playlist
//              · the sketchbook comes out · sorry count: zero · they take your advice · checked your sign, then relaxed
//              · comfy quiet
//  37.8        "Soft heart. | *Open door.*"
//  41.2        callback: "The whale dream? | *Part two tonight.*"  the whale comes back.
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
const S = 'pisces', SEA = '#7fa8ff'
const WHALE = [
  '..........W.W.......',
  '...........W........',
  '....BBBBBBBBB.......',
  '..BBBBBBBBBBBBB...BB',
  '.BBBKBBBBBBBBBBB.BB.',
  'BBBBBBBBBBBBBBBBBBB.',
  'BLLLLLBBBBBBBBBBBB..',
  '.LLLLLLLLLLLBBBB....',
  '..LLLLLLLLLLL.......',
]
const WHALE_C = { B: SEA, L: '#dbe6ff', K: INK, W: SKYB }
const TISSUE = ['...WWW...', '..WWWWW..', '.WWWWWWW.', 'BBBBBBBBB', 'BPPPPPPPB', 'BPWWWWWPB', 'BPPPPPPPB', 'BBBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: INK, P: PINK }
const BLANKET = ['LLLLLLLLLLLLLLLLLL', 'LMLLMLLMLLMLLMLLML', 'LLLLLLLLLLLLLLLLLL', 'LLMLLMLLMLLMLLMLLL', 'LLLLLLLLLLLLLLLLLL', 'LMLLMLLMLLMLLMLLML', 'LLLLLLLLLLLLLLLLLL']
const BLANKET_C = { L: LAV, M: PINK }
// a voice-note bar with a waveform
function voiceNote(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -60, 372, 132)
  x.fillStyle = INK; x.fillRect(-190, -70, 380, 140)
  x.fillStyle = MINT; x.fillRect(-182, -62, 364, 124)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -26); x.lineTo(-150, 26); x.lineTo(-110, 0); x.fill()
  for (let i = 0; i < 18; i++) { const h = 10 + 34 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-90 + i * 14, -h / 2, 8, h) }
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  x.restore()
}
// a sketchbook page with doodles (a star, a fish, a moon)
function sketchbook(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -170, 336, 356)
  x.fillStyle = INK; x.fillRect(-172, -182, 344, 364)
  x.fillStyle = CREAM; x.fillRect(-164, -174, 328, 348)
  x.fillStyle = '#9a90b8'; for (let i = 0; i < 8; i++) x.fillRect(-164, -150 + i * 42, 10, 6)
  x.strokeStyle = '#6b62a8'; x.lineWidth = 5
  x.beginPath(); x.arc(-60, -60, 50, 0.6, Math.PI * 1.7); x.stroke()
  x.beginPath(); x.ellipse(50, 40, 60, 32, 0, 0, Math.PI * 2); x.moveTo(110, 40); x.lineTo(150, 10); x.lineTo(150, 70); x.closePath(); x.stroke()
  x.fillStyle = '#6b62a8'; x.fillRect(20, 30, 10, 10)
  x.strokeStyle = PINK; x.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 4 / 5; const px = 70 + Math.cos(a) * 44, py = -90 + Math.sin(a) * 44; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.closePath(); x.stroke()
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('don’t laugh :)', 0, 140)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They send you | *the 6-minute voice note.*', mood: 'happy', tears: 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      voiceNote(x, t, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 960, '6:42', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 640, 'ok so…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'You hear about | *the whale dream.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'there was a whale | and it was my mom', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, tail: 'bl' })
      bits(x, t, WHALE, WHALE_C, 790, 950, 15, P.t0 + 0.8)
      label(x, 790, 1120, 'YOU: NODDING ♡', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They cry in front of you. | *Happy tears count.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, TISSUE, TISSUE_C, 790, 880, 22, P.t0 + 0.2)
      label(x, 790, 1090, 'TISSUES: SHARED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'They show you | *the secret playlist.*', mood: 'sparkle', tears: 1, star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♪ DO NOT OPEN', headCol: LAV, lines: [
        ['songs to cry to', LAV, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['songs to cry to 2', LAV, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['for you ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'The sketchbook | *comes out.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sketchbook(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 780, 860, P.t0 + 1.2, 7, 200, 0.6)
    } },
  { sign: S, cap: 'They stop saying sorry | *for their feelings.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', tears: 1, star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.max(0, 9 - Math.floor(clamp((lt - 0.3) / 1.1) * 9))
      label(x, 790, 800, `SORRY COUNT: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: n ? BONE : MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'i feel things. | that’s ok.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'They ask your advice. | *And take it.*', mood: 'happy', tears: 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'what would | you do?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'ADVICE: TAKEN ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They checked your sign. | *Then relaxed.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', tears: 1, look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.3 ? 0.06 : 0,
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 130)
      label(x, 790, 1060, 'YOU: SAFE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quiet with you? | *Comfy quiet.*', mood: 'sleepy', tears: 1, star: { x: -170, y: -20 },
    front(x, t, lt, P, F) {
      bits(x, t, BLANKET, BLANKET_C, F.x + 20, F.cy + 110, 18, P.t0 + 0.3)
      signChar(x, t, 'cancer', 790, 900, 200 * pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'sleepy', seed: 19, glyph: false })
      label(x, 790, 1110, 'SILENCE: COZY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0431', key: 'D', accent: SEA, solo: S, ending: 'callback',
  title: 'Signs a Pisces | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Open door.*', mood: 'heart' },
  last: {
    text: 'The whale dream? | *Part two tonight.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, WHALE, WHALE_C, 540 + 20 * Math.sin(t * 1.5), 1020, 26 * pop01(t, t0 + 0.5, 0.4, 2))
      bubble(x, 540, 1260, 'ok so the whale | is back', pop01(t, t0 + 1.2, 0.3, 2.2), { size: 44, tail: 'bc' })
      hearts(x, t, 540, 980, t0 + 1.4, { n: 6, life: 1.8, spread: 360, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
