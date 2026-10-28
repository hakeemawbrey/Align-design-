// st4report1 (25 s vertical Align ad, Star Talk season 4, EP 020 · thread A: the landing → Texas) · story 0–20.6, then the end card.
//   0.00–7.50  "The stars' Houston | *report card.*"  Over a generic Houston skyline, THE STARS (the gold narrator star) reads
//              off a clipboard. Three stamps land, each a callback, and its couple pops up at the bottom to cheer:
//              "✓ bring a jacket" (EP 003, Capricorn + Cancer) · "✓ share the last kolache" (EP 004, Taurus + Scorpio) ·
//              "✓ take the exit" (EP 002, Gemini + Sagittarius). (The ghost peeks over the clipboard.)
//   7.60–15.2  Box (THE STARS): "we came to give Houston advice." → "Houston's been teaching *us*."  "Plot | *twist.*"
//              The clipboard flips: it's the stars' own report card, graded by Houston: "STILL LEARNING ♥".
//   15.3–20.4  "Show *up,* | Houston."  The skyline's windows light up, a big gold ✓ stamps over it, and everyone hops.
//              Everything pops out by 20.45.
// One canvas (sky + skyline + clipboard + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 25
const EP = 20
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', GREEN = '#2f8f5b'
const MONO = "'Space Mono', ui-monospace, monospace"

// ── the timeline
const T = {
  h0: 0.12, h0Out: [7.3, 7.48],
  city: 0.2, narr: 0.45, board: 0.7,
  stamps: [1.8, 3.6, 5.4], ghost: 6.0,
  open: 7.65, l1: 7.85, l2: 11.2, flip: [11.45, 11.9], grade: 12.35,
  h1: 11.3, h1Land: 11.65, close: 14.85, h1Out: [14.75, 14.92],
  h2: 15.3, h2Land: 15.7, lights: [15.6, 17.4], check: 17.0, h2Out: [20.15, 20.4], out: [20.05, 20.45],
}
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: 'we came to give Houston advice.' },
  { t: T.l2, speaker: 'THE STARS', text: "Houston's been teaching *us*." },
]
const CPS = 28
const ROWS = [
  { text: 'bring a jacket', ep: 'EP 003', pair: ['capricorn', 'cancer'] },
  { text: 'share the last kolache', ep: 'EP 004', pair: ['taurus', 'scorpio'] },
  { text: 'take the exit', ep: 'EP 002', pair: ['gemini', 'sagittarius'] },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const JACKET = ['..bb.bb..', '.BBbwbBB.', 'BBBbwbBBB', 'BB.BwB.BB', 'BB.BwB.BB', 'BB.BBB.BB', '...BBB...']
const JACKET_C = { B: '#5a7fd8', b: '#3d5ab0', w: '#efe6d6' }
const KOLACHE = ['..kkkkk..', '.kKKKKKk.', 'kKKrrrKKk', 'kKrRrrKKk', 'kKKrrrKKk', '.kKKKKKk.', '..kkkkk..']
const KOLACHE_C = { k: '#c98a3a', K: '#f2c47a', r: '#c8324a', R: '#ff7a8a' }
const CHECK = ['.........GG', '........GGG', '.......GGG.', 'GG....GGG..', 'GGG..GGG...', '.GGGGGG....', '..GGGG.....']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const NARR = { x: 245, y: 1135, size: 270 }
const BOARD = { x: 680, y: 905, w: 600, h: 650 }
const CROWD_Y = 1345, CROWD_S = 112
const SLOTS = [[100, 210], [455, 565], [810, 920]]
const SKY_TOP = 1180

// generic skyline: [x, w, h, top style]  (no landmarks, no logos)
const TOWERS = [[0, 70, 150, 0], [62, 60, 230, 1], [118, 84, 190, 0], [196, 54, 300, 2], [246, 80, 250, 0], [320, 64, 380, 1], [380, 92, 330, 3], [466, 58, 270, 0],
  [520, 76, 420, 2], [592, 66, 350, 0], [654, 88, 300, 1], [736, 60, 400, 3], [792, 82, 260, 0], [868, 58, 330, 2], [922, 80, 210, 0], [996, 84, 170, 1]]

const NARR_HOPS = [T.narr + 0.3, ...T.stamps.map(s => s + 0.05), ...talkHops(LINES, 'THE STARS', { cps: CPS }), T.grade + 0.1, T.h2Land, T.check + 0.1, 18.3, 19.1]

function narrState(t) {
  if (t < T.board + 0.3) return { mood: 'happy' }
  if (t < T.stamps[2] + 1.0) return { mood: T.stamps.some(s => t > s && t < s + 0.45) ? 'wink' : 'squint', look: [1, -1], blink: false }
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0] }
  if (t < T.grade) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.h2) return { mood: 'sparkle', look: [0, 0] }
  return { mood: t < T.check ? 'happy' : 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "The stars' Houston | *report card.*", { top: 175, size: 98, accentSize: 156, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0 + 0.45, lineHeight: 1.0 })
  const H1 = popText(root, 'Plot | *twist.*', { top: 175, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.95 })
  const H2 = popText(root, 'Show *up,* | Houston.', { top: 190, size: 128, accentSize: 196, at: T.h2, gap: 0.1, late: 0, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  // ── the skyline (rises in, windows light up for the last line)
  function drawSkyline(t) {
    const k = ease.outCubic(prog(t, T.city, T.city + 0.9)) * (1 - ease.inCubic(prog(t, ...T.out)))
    if (k <= 0) return
    const base = 1920, rise = (1 - k) * 420
    TOWERS.forEach(([tx, w, h, sty], i) => {
      const top = 1650 - h * 0.9 + rise
      x.fillStyle = i % 2 ? '#1c1440' : '#231a4e'
      x.fillRect(tx, top, w, base - top)
      x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(tx, top, 4, base - top)
      // simple generic tops
      if (sty === 1) { x.fillStyle = i % 2 ? '#1c1440' : '#231a4e'; x.fillRect(tx + w * 0.3, top - 24, w * 0.4, 24) }
      if (sty === 2) { x.fillStyle = i % 2 ? '#1c1440' : '#231a4e'; x.fillRect(tx + w * 0.15, top - 18, w * 0.7, 18); x.fillRect(tx + w * 0.35, top - 36, w * 0.3, 18) }
      if (sty === 3) { x.fillStyle = '#ff6a6a'; x.fillRect(tx + w / 2 - 3, top - 30, 6, 30); if (Math.sin(t * 3 + i) > 0) { x.fillStyle = '#ff9a9a'; x.fillRect(tx + w / 2 - 5, top - 36, 10, 8) } }
      // windows: dim, then they light up one by one for "Show up, Houston."
      for (let r = 0; r < 30; r++) for (let c = 0; c < Math.floor((w - 12) / 16); c++) {
        const wy = top + 16 + r * 22
        if (wy > base - 10) break
        const id = (i * 131 + r * 17 + c * 7) % 100
        const on = id < 22 || (t > T.lights[0] && prog(t, ...T.lights) * 100 > id)
        x.fillStyle = on ? (id % 3 ? 'rgba(255,217,138,0.7)' : 'rgba(255,240,200,0.8)') : 'rgba(239,230,214,0.05)'
        x.fillRect(tx + 8 + c * 16, wy, 7, 9)
      }
    })
    const lg = ease.inOutCubic(prog(t, ...T.lights))
    if (lg > 0) { const g = x.createLinearGradient(0, 1200, 0, 1920); g.addColorStop(0, 'rgba(255,200,110,0)'); g.addColorStop(1, `rgba(255,200,110,${0.22 * lg})`); x.fillStyle = g; x.fillRect(0, 1200, 1080, 720) }
  }

  // ── the clipboard: front = Houston's report card; back = the stars' own
  function boardState(t) {
    const k = pop01(t, T.board, 0.45, 1.6) * popOut(t, T.out)
    const fp = prog(t, ...T.flip), ang = ease.inOutCubic(fp) * Math.PI
    return { k, back: ang > Math.PI / 2, sx: Math.max(0.02, Math.abs(Math.cos(ang))), fp }
  }
  function drawBoard(t) {
    const b = boardState(t)
    if (b.k <= 0.01) return
    const { w, h } = BOARD, cy = BOARD.y + (1 - b.k) * 500 + Math.sin(t * 1.4) * 5
    x.save(); x.translate(BOARD.x, cy); x.rotate(0.04 + 0.015 * Math.sin(t * 1.1)); x.scale(b.sx * b.k, b.k * (1 + 0.04 * Math.sin(Math.PI * b.fp)))
    // board
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#a8763e'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#c99556'; x.fillRect(-w / 2, -h / 2, w, 8)
    // paper
    const pw = w - 50, ph = h - 70, pt = -h / 2 + 50
    x.fillStyle = '#f6efe0'; x.fillRect(-pw / 2, pt, pw, ph)
    x.fillStyle = 'rgba(27,18,54,0.08)'; for (let i = 0; i < 9; i++) x.fillRect(-pw / 2 + 20, pt + 150 + i * 52, pw - 40, 2)
    // clip
    x.fillStyle = INK; x.fillRect(-80, -h / 2 - 22, 160, 64)
    x.fillStyle = '#c9c0dc'; x.fillRect(-72, -h / 2 - 14, 144, 48); x.fillStyle = '#ffffff'; x.fillRect(-72, -h / 2 - 14, 144, 8)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    if (!b.back) {
      x.font = `700 26px ${MONO}`; x.letterSpacing = '0.14em'; x.fillText('REPORT CARD', 0, pt + 52); x.letterSpacing = '0px'
      x.font = `700 40px ${MONO}`; x.fillStyle = '#5a3fa0'; x.fillText('HOUSTON', 0, pt + 100)
      ROWS.forEach((r, i) => {
        const s0 = T.stamps[i], p = prog(t, s0, s0 + 0.2), yy = pt + 200 + i * 130
        // the icon
        const ic = pop01(t, s0 + 0.15, 0.3, 2.4)
        if (ic > 0) {
          if (i === 0) drawBits(x, JACKET, JACKET_C, -pw / 2 + 52, yy + 2, 6 * ic)
          if (i === 1) drawBits(x, KOLACHE, KOLACHE_C, -pw / 2 + 52, yy + 2, 6 * ic)
          if (i === 2) { x.save(); x.translate(-pw / 2 + 52, yy + 2); x.scale(ic, ic); x.fillStyle = INK; x.fillRect(-36, -24, 72, 48); x.fillStyle = GREEN; x.fillRect(-32, -20, 64, 40); x.fillStyle = '#ffffff'; x.font = `700 20px ${MONO}`; x.fillText('EXIT', 0, 2); x.restore() }
        }
        x.globalAlpha = clamp(prog(t, s0 + 0.1, s0 + 0.35))
        x.textAlign = 'left'; x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.fillText(r.text, -pw / 2 + 96, yy - 8)
        x.font = `700 20px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.5)'; x.fillText(r.ep, -pw / 2 + 98, yy + 26)
        x.globalAlpha = 1; x.textAlign = 'center'
        // the ✓ stamp
        if (p > 0) {
          const s = lerp(2.2, 1, ease.outCubic(p)) + 0.08 * Math.sin(Math.PI * clamp((t - s0 - 0.2) / 0.2))
          drawBits(x, CHECK, { G: '#2fae6b' }, pw / 2 - 38, yy - 4, 5 * s, { alpha: clamp(p * 2), rot: -0.08 })
        }
      })
    } else {
      x.font = `700 26px ${MONO}`; x.letterSpacing = '0.14em'; x.fillText('REPORT CARD', 0, pt + 52); x.letterSpacing = '0px'
      x.font = `700 40px ${MONO}`; x.fillStyle = '#5a3fa0'; x.fillText('THE STARS', 0, pt + 100)
      x.font = `700 24px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillText('graded by: HOUSTON', 0, pt + 150)
      const g = prog(t, T.grade, T.grade + 0.22)
      if (g <= 0) { x.setLineDash([10, 10]); x.lineWidth = 3; x.strokeStyle = 'rgba(27,18,54,0.25)'; x.strokeRect(-pw / 2 + 40, pt + 220, pw - 80, 220); x.setLineDash([]) }
      else {
        const s = lerp(2.0, 1, ease.outCubic(g)) + 0.07 * Math.sin(Math.PI * clamp((t - T.grade - 0.22) / 0.2))
        x.save(); x.translate(0, pt + 330); x.rotate(-0.08); x.scale(s, s); x.globalAlpha = clamp(g * 2)
        x.lineWidth = 7; x.strokeStyle = '#e8445a'; x.strokeRect(-200, -86, 400, 172)
        x.fillStyle = '#e8445a'; x.font = `700 42px ${MONO}`; x.fillText('STILL', 0, -32); x.fillText('LEARNING', 0, 22)
        x.restore()
        drawBits(x, HEART, { H: '#e8445a', W: '#ffd1de' }, 0, pt + 490, 9 * clamp(g * 1.5))
      }
    }
    x.restore()
  }

  function drawNarrator(t) {
    const k = pop01(t, T.narr, 0.38, 2.2) * popOut(t, T.out)
    const r = drawStarChar(x, NARR.x, NARR.y, NARR.size, t, { color: STAR.sky, ...narrState(t), hops: NARR_HOPS, pop: k, seed: 1, glow: 1.15 })
    sparkles(t, r.x, r.y, T.grade + 0.2, 10, 190, 2)
  }

  function drawCrowd(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    ROWS.forEach((r, i) => r.pair.forEach((id, j) => {
      const t0 = T.stamps[i] + 0.25 + j * 0.12, k = pop01(t, t0, 0.35, 2.4) * ok
      if (k <= 0.01) return
      const s = signStar(id)
      const cheer = t < t0 + 1.2 || t > T.h2 ? [t0 + 0.2, t0 + 0.6, T.h2Land + 0.1 + (i + j) * 0.08, T.check + 0.1 + i * 0.07, 18.4 + j * 0.2 + i * 0.1, 19.2 + i * 0.1] : [t0 + 0.2, t0 + 0.6]
      const mood = t < t0 + 1.0 ? 'happy' : t > T.l2 && t < T.h2 ? 'sparkle' : t > T.check ? 'heart' : 'happy'
      drawStarChar(x, SLOTS[i][j], CROWD_Y, CROWD_S, t, { color: s.color, glyph: null, mood, look: [0, 0], hops: cheer, pop: k, seed: 3 + i * 2 + j, glow: 0.8 })
    }))
  }

  function drawBigCheck(t) {
    const p = prog(t, T.check, T.check + 0.25)
    if (p <= 0) return
    const ok = popOut(t, T.out)
    const s = lerp(3, 1, ease.outCubic(p)) + 0.1 * Math.sin(Math.PI * clamp((t - T.check - 0.25) / 0.25))
    const g = x.createRadialGradient(540, 860, 0, 540, 860, 360); g.addColorStop(0, `rgba(242,199,92,${0.35 * ok})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.fillRect(180, 500, 720, 720)
    drawBits(x, CHECK, { G: GOLD }, 560, 860, 30 * s * ok, { alpha: clamp(p * 2) * ok, rot: -0.1 })
    const dt = t - T.check - 0.22
    if (dt > 0 && dt < 0.5) { x.save(); x.globalAlpha = 1 - dt / 0.5; x.fillStyle = BONE; for (let q = 0; q < 12; q++) { const a = q / 12 * Math.PI * 2; x.fillRect(560 + Math.cos(a) * (200 + dt * 300) - 5, 860 + Math.sin(a) * (150 + dt * 220) - 5, 10, 10) } x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-22, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawSkyline(t)
        // the board slides away for the last line, leaving room for the big ✓
        if (t < T.h2 + 0.4) {
          const away = ease.inCubic(prog(t, T.h2 - 0.1, T.h2 + 0.3))
          x.save(); x.translate(away * 800, 0)
          drawBoard(t)
          drawGhostCameo(x, t, { x: BOARD.x + 170, y: BOARD.y - BOARD.h / 2 - 8, at: T.ghost, dur: 1.3, from: 'below', cell: 4 })
          x.restore()
        }
        drawBigCheck(t)
        drawNarrator(t)
        drawCrowd(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.5 (the stamps → the box) and 15.0 (box shut → "Show up, Houston.").
const CUTS = [7.52, { t: 15.0, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0), ['pop', T.h0 + 0.45, 1046.5, 0.045, 0], ['pop', T.h0 + 0.55, 1174.66, 0.04, 0],
  ['whoosh', T.city, 0.9, 0.035], ['pop', T.narr + 0.05, 783.99, 0.04, -0.3], ['whoosh', T.board - 0.05, 0.4, 0.03], ['tick', T.board + 0.3, 0.04],
  ...T.stamps.flatMap((s, i) => [['boom', s + 0.18, 0.13], ['tick', s + 0.18, 0.07], ['pop', s + 0.22, NOTE[3 + i], 0.04, 0.2],
    ['pop', s + 0.27, 880, 0.03, -0.2 + i * 0.2], ['pop', s + 0.39, 1046.5, 0.03, -0.1 + i * 0.2], ['glitter', s + 0.3, s + 0.7]]),
  // the advice + the twist
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 1, 0.1, 2), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.flip[0], 0.45, 0.035], ['tick', T.flip[1], 0.04], ['boom', T.grade + 0.18, 0.14], ['tick', T.grade + 0.18, 0.07], ['bell', T.grade + 0.25, 1318.51, 0.03, 1.4, 0.2],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  // last line
  ['whoosh', T.h2 - 0.1, 0.4, 0.03], ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['pluck', T.h2 + 0.1, 1046.5, 0.045, 0.7, 0],
  ['riser', T.lights[0], T.check, 0.05], ['glitter', T.lights[0] + 0.3, T.lights[0] + 1.2],
  ['boom', T.check + 0.2, 0.2], ['bell', T.check + 0.22, 1567.98, 0.04, 1.8, 0], ['glitter', T.check + 0.2, T.check + 0.8],
  ['pop', 18.4, 880, 0.02, -0.3], ['pop', 18.6, 1046.5, 0.02, 0.3], ['pop', 19.2, 880, 0.02, 0], ['bell', 19.3, 1318.51, 0.02, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
