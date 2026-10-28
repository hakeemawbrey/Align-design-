// st4ghostdate (15 s vertical Align ad, Star Talk season 4, EP 039, thread C3: the ghost dates honestly)
//   story 0–10.6, then the shared end card (JOIN THE HOUSTON BETA).
//   0.00–4.10  "The ghost's | *first* date."  A cozy late-night café table: one candle (the prop), two mugs, a window
//              of Houston lights. The ghost (stghost's sheet, still on) sits across from its date, a rosy "them" star.
//              THE DATE (sparkly, sweet): "can i see you?"  The ghost goes wide-eyed, grabs its hem and starts to lift
//              it… the star's two lower points peek out… then it tugs the sheet back down. Not yet.
//   4.15       card cut (flip).
//   4.25–7.35  "Not yet. | But *honest.*"  THE GHOST (blushing): "not yet. but i'll *tell* you how i feel."  A little
//              pixel heart floats up out of the sheet; the date's eyes go to hearts and it nods.
//   7.30–10.45 "Ready when | you're *ready.*"  THE STARS: "honesty first. the sheet can *wait.*"  The candle flares
//              warm; both of them happy, the ghost blushing hard. Out by 10.45.
// The ghost is the star of this one (drawGhostSheet), so no extra cameo. One canvas, DOM type + the box, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 39
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', ICE = '#bfe0ff'
const THEM = '#ffc7da'
const MONO = "'Space Mono', ui-monospace, monospace"

const DATE_TAG = '♡ THE DATE', GHOST_TAG = 'THE GHOST', SPEAK = 'THE STARS'
const CPS = 28
const LINES = [
  { t: 1.9, speaker: DATE_TAG, text: 'can i see you?', color: PINK },
  { t: 4.35, speaker: GHOST_TAG, text: "not yet. but i'll *tell* you how i feel.", color: ICE },
  { t: 7.3, speaker: SPEAK, text: 'honesty first. the sheet can *wait.*' },
]
const LT = lineTimes(LINES, { cps: CPS })

const T = {
  h0: 0.12, h0Out: [3.9, 4.08], room: 0.15, ghostIn: 0.35, dateIn: 0.55, open: 1.7,
  gasp: LT[0].done + 0.05, lift: [2.75, 3.25], down: [3.4, 3.75],
  cut: 4.15, h1: 4.25, h1Land: 4.65, h1Out: [7.12, 7.3],
  heart: LT[1].chars[24], nod: LT[1].done + 0.15,
  h2: 7.38, h2Land: 7.8, flare: LT[2].done, close: 10.35,
  out: [10.08, 10.45],
}
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

// ── layout
const G = { x: 320, y: 1100, cell: 11 }            // the ghost (sheet centre)
const D = { x: 775, y: 1120, size: 300 }          // the date
const TABLE_Y = 1262
const WIN = { x0: 120, x1: 960, y0: 600, y1: 970 }
const CANDLE = { x: 545, y: TABLE_Y }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const DATE_HOPS = [T.dateIn + 0.3, ...talkHops(LINES, DATE_TAG, { cps: CPS }), T.nod, T.nod + 0.3, T.h2Land + 0.1]

function drawBits(x, bm, cols, cx, cy, cell, alpha = 1) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha
  const ox = cx - w * cell / 2, oy = cy - h * cell / 2, on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

function ghostState(t) {
  if (t < LINES[0].t) return { look: [1, 0.4], wide: false, blush: 0.3 }
  if (t < T.gasp) return { look: [1, 0], wide: false, blush: 0.3 }
  if (t < T.lift[0]) return { look: [0, 0], wide: true, blink: false, blush: 0 }
  if (t < T.down[1]) return { look: [0, 1], wide: true, blink: false, blush: 0.5 }
  if (t < LINES[1].t) return { look: [-1, 0.4], wide: false, blush: 0.8 }
  if (t < T.nod) return { look: [1, 0], wide: false, blush: 1 }
  return { look: [1, -0.3], wide: false, blush: 1 }
}
function dateState(t) {
  if (t < LINES[0].t) return { mood: 'happy', look: [-1, 0] }
  if (t < T.lift[0]) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.down[1]) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.heart) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.h2Land) return { mood: 'heart' }
  return { mood: t > 9.2 && t < 9.6 ? 'wink' : 'happy', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "The ghost's | *first* date.", { top: 200, size: 118, accentSize: 176, at: T.h0, gap: 0.1, accentColor: PINK, wobble: true, fit: true })
  const H1 = popText(root, 'Not yet. | But *honest.*', { top: 200, size: 118, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ICE, fit: true })
  const H2 = popText(root, "Ready when | you're *ready.*", { top: 190, size: 118, accentSize: 180, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const flareK = t => t < T.flare ? 0 : Math.exp(-(t - T.flare) * 1.6) * 0.7 + 0.3

  function drawWindow(t, k) {
    if (k <= 0) return
    const { x0, x1, y0, y1 } = WIN
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28)
    x.fillStyle = '#3a2a5e'; x.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16)
    const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#120a32'); g.addColorStop(1, '#2a1650')
    x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    // generic city lights outside
    for (let i = 0; i < 12; i++) {
      const bx = x0 + i * 68, bh = 90 + 150 * hash(i, 3)
      x.fillStyle = '#0d0828'; x.fillRect(bx, y1 - bh, 58, bh)
      for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) if (hash(i * 31 + r * 3 + c, 5) > 0.55 && y1 - bh + 12 + r * 22 < y1 - 10) {
        x.fillStyle = rgba('#ffd98a', 0.35 + 0.3 * Math.sin(t * 0.8 + i + r)); x.fillRect(bx + 8 + c * 16, y1 - bh + 12 + r * 22, 9, 11)
      }
    }
    // a few stars, one of them gold (somebody up there is watching)
    for (let i = 0; i < 7; i++) drawPixelStar(x, x0 + 60 + i * 115, y0 + 40 + hash(i, 9) * 80, 16 + 8 * hash(i, 2), (i + Math.floor(t * 2)) % 3 ? 1 : 2, i === 4 ? GOLD : BONE)
    x.fillStyle = '#3a2a5e'; x.fillRect((x0 + x1) / 2 - 6, y0, 12, y1 - y0); x.fillRect(x0, (y0 + y1) / 2 - 5, x1 - x0, 10)
    x.restore()
  }

  function drawTable(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const y = TABLE_Y
    x.fillStyle = INK; x.fillRect(60, y - 6, 960, 50)
    x.fillStyle = '#7a4a3a'; x.fillRect(66, y, 948, 38)
    x.fillStyle = '#9a6248'; x.fillRect(66, y, 948, 8)
    x.fillStyle = '#5a3428'; x.fillRect(500, y + 44, 80, 120)
    // mugs
    for (const [mx, col] of [[400, LAV], [690, PINK]]) {
      x.fillStyle = INK; x.fillRect(mx - 34, y - 64, 68, 64); x.fillRect(mx + 30, y - 52, 22, 34)
      x.fillStyle = col; x.fillRect(mx - 28, y - 58, 56, 58); x.fillStyle = BONE; x.fillRect(mx - 28, y - 58, 56, 8)
      x.fillStyle = col; x.fillRect(mx + 34, y - 46, 12, 22)
      for (let s = 0; s < 3; s++) { const ph = (t * 0.6 + s / 3) % 1; x.globalAlpha = k * (1 - ph) * 0.5; x.fillStyle = BONE; x.fillRect(mx - 10 + s * 10 + Math.sin(ph * 6 + s) * 6, y - 80 - ph * 70, 6, 10) }
      x.globalAlpha = k
    }
    x.restore()
  }

  function drawCandle(t, k, part) {
    if (k <= 0) return
    const { x: cx, y } = CANDLE, f = flareK(t)
    const fl = 1 + 0.12 * Math.sin(t * 17) + 0.08 * Math.sin(t * 29 + 1) + 0.6 * f
    x.save(); x.globalAlpha = k
    // glow
    x.globalCompositeOperation = 'lighter'
    const R = 260 * (0.85 + 0.15 * fl)
    const g = x.createRadialGradient(cx, y - 120, 0, cx, y - 120, R)
    g.addColorStop(0, `rgba(255,190,110,${0.32 + 0.2 * f})`); g.addColorStop(1, 'rgba(255,190,110,0)')
    if (part === 'glow') { x.fillStyle = g; x.fillRect(cx - R, y - 120 - R, R * 2, R * 2); x.restore(); return }
    x.globalCompositeOperation = 'source-over'
    // the candle in a little jar
    x.fillStyle = INK; x.fillRect(cx - 34, y - 96, 68, 96)
    x.fillStyle = 'rgba(255,214,150,0.35)'; x.fillRect(cx - 28, y - 90, 56, 90)
    x.fillStyle = BONE; x.fillRect(cx - 18, y - 76, 36, 76)
    x.fillStyle = '#fff6e6'; x.fillRect(cx - 18, y - 76, 10, 76)
    x.fillStyle = INK; x.fillRect(cx - 2, y - 88, 4, 12)
    // the pixel flame
    const c = 6, h = Math.round(5 * fl), sway = Math.round(Math.sin(t * 7) * 1)
    for (let j = 0; j < h; j++) {
      const w = j < 1 ? 1 : j < h - 1 ? 3 : 2
      x.fillStyle = j < 2 ? '#fff3c4' : j < 3 ? '#ffd27a' : '#ff9a4a'
      x.fillRect(cx - (w * c) / 2 + (j > 2 ? sway * c : 0), y - 94 - (h - j) * c, w * c, c)
    }
    x.restore()
  }

  function drawGhost(t, k) {
    const gp = pop01(t, T.ghostIn, 0.4, 2) * k
    if (gp <= 0.02) return
    const st = ghostState(t)
    // the lift: the sheet rises a little and the star's two lower points peek out underneath, then it tugs it down
    const up = t < T.lift[0] ? 0 : t < T.down[0] ? ease.outCubic(prog(t, ...T.lift)) : 1 - ease.inOutCubic(prog(t, ...T.down))
    const shy = t > T.down[1] && t < LINES[1].t ? 0.04 * Math.sin((t - T.down[1]) * 9) : 0
    const bob = Math.sin(t * 2.1) * 6
    if (up > 0.02) {
      // the star underneath (only its lower points show below the hem)
      drawStarChar(x, G.x, G.y + 42 + bob, 256, t, { color: BONE, mood: 'neutral', look: [0, 0], blink: false, bob: 0, tips: false, glow: 0.3, seed: 21 })
    }
    x.save(); x.translate(G.x, G.y + bob - up * 58); x.scale(gp, gp)
    drawGhostSheet(x, t, 0, 0, G.cell, { look: st.look, wide: st.wide, blink: st.blink !== false, blush: st.blush, rot: shy })
    x.restore()
    // its hands gripping the hem during the lift
    if (up > 0.02) for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(G.x + s * 118 - 14, G.y + bob - up * 58 + 118, 28, 22); x.fillStyle = '#f4f7ff'; x.fillRect(G.x + s * 118 - 10, G.y + bob - up * 58 + 121, 20, 16) }
  }

  function drawDate(t, k) {
    const dp = pop01(t, T.dateIn, 0.38, 2) * k
    if (dp <= 0.02) return
    const nod = t > T.nod && t < T.nod + 0.7 ? 0.08 * Math.max(0, Math.sin((t - T.nod) * Math.PI / 0.3)) : 0
    drawStarChar(x, D.x, D.y, D.size, t, { color: THEM, ...dateState(t), hops: DATE_HOPS, squash: nod, seed: 6, pop: dp, glow: 1 })
  }

  function floatingHearts(t, cx, cy, t0, n, spread, cell) {
    for (let i = 0; i < n; i++) {
      const born = t0 + i * 0.28, p = (t - born) / 1.4
      if (p < 0 || p > 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + (hash(i, 7) - 0.5) * spread + Math.sin(p * 6 + i) * 10), Math.round(cy - p * 220), cell * (0.8 + 0.4 * Math.sin(Math.PI * Math.min(1, p * 1.6))), Math.sin(Math.PI * p))
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * 0.85 })
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), k = clamp(ok * 1.4)
      if (ok > 0) {
        const rk = ease.outCubic(prog(t, T.room, T.room + 0.5)) * k
        drawWindow(t, rk)
        drawCandle(t, rk, 'glow')      // its glow sits behind the two of them
        drawGhost(t, ok)
        drawDate(t, ok)
        drawTable(t, rk)
        drawCandle(t, rk, 'jar')
        // the ghost says how it feels: one heart floats up out of the sheet (and then the date's)
        if (t > T.heart) floatingHearts(t, G.x + 20, G.y - 210, T.heart, 1, 20, 9)
        if (t > T.nod) floatingHearts(t, D.x, D.y - 180, T.nod, 3, 140, 6)
        if (t > T.h2Land) floatingHearts(t, 545, 980, T.h2Land, 6, 420, 7)
        // the gasp: two little shock lines over the ghost
        if (t > T.gasp && t < T.gasp + 0.45) { x.fillStyle = BONE; for (const s of [-1, 1]) { x.fillRect(G.x + s * 70 - 4, G.y - 290, 8, 30); x.fillRect(G.x + s * 130 - 4, G.y - 262, 8, 24) } }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut: 4.15 (the sheet is back down → "Not yet. But honest."). End card flips at 10.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.022),
  ['whoosh', T.room, 0.5, 0.02], ['pop', T.ghostIn + 0.05, 659.25, 0.035, -0.3], ['pop', T.dateIn + 0.05, 880, 0.035, 0.3],
  ['pop', T.open, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [DATE_TAG]: 780, [GHOST_TAG]: 520 } }),
  ['pop', T.gasp, 440, 0.04, -0.3], ['tick', T.gasp, 0.04],
  ['whoosh', T.lift[0], 0.4, 0.02], ['pluck', T.lift[1] - 0.1, 1318.51, 0.03, 0.5, -0.3], ['whoosh', T.down[0], 0.3, 0.025], ['pop', T.down[1] - 0.05, 392, 0.035, -0.3],
  ...wordPops(T.h1, 3, 0.09, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.04, 0],
  ['pluck', T.heart, 1046.5, 0.04, 0.6, -0.3], ['bell', T.heart + 0.05, 1567.98, 0.02, 1.2, -0.3],
  ['pluck', T.nod, 1318.51, 0.03, 0.5, 0.3], ['glitter', T.nod, T.nod + 0.4],
  ...wordPops(T.h2, 3, 0.09, 1, 0.024), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['bell', T.flare, 1318.51, 0.03, 1.6, 0], ['glitter', T.h2Land, T.h2Land + 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
