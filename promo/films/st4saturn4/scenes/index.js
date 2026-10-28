// st4saturn4 (EP 058, 20 s vertical Align ad, Star Talk season 4, thread D4: Saturn's class) · story 0–15.6, then the
// shared end card ("come" + the Align logo, JOIN THE TEXAS BETA).
//   0.00–5.00  "Saturn's class: | *boundaries.*"  Saturn the teacher (stsaturn: ringed, round glasses, pointer) floats over
//              the ♉ Taurus star's tiny pixel garden. A bone "them" star bounds over, about to stomp the tomatoes. On the drop
//              (2.27) a brick WALL slams up around the whole garden; Taurus vanishes behind it, the visitor bonks off it.
//              The ghost peeks over the wall (2.6). Box (♄ SATURN): "a boundary isn't a wall."  A red ✕ stamps the wall; it
//              crumbles.
//   5.00–8.25  Box: "it's a gate with *rules.* say them kindly."  Saturn's pointer draws a picket fence with a gate and a
//              little sign: "PLEASE KNOCK ♥". The visitor knocks (TOK TOK), Taurus swings the gate open, the visitor tiptoes
//              in on the path. Both go happy.
//   8.35–12.4  ★ LESSON UNLOCKED: "Kind boundaries | keep love *close.*"  (the shared lesson.js banner)
//  12.5        card cut (flip).
//  12.6–15.5   "Boundaries are | *love,* too."  The two stars side by side inside the gate, hearts; Saturn winks.
// Astrology: Saturn rules structure, limits and responsibility; Taurus is Venus-ruled fixed earth (it loves its garden).
// One canvas, DOM type + the dialogue box + the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 58
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', MINT = '#7dffb0'
const SAT = '#e8c27a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const TAU_ = signStar('taurus')
const KEY = 'Dm'

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [8.15, 8.35],
  satIn: [0.3, 1.2], tauIn: 0.4, visIn: [1.1, 2.0], wall: BEAT(3), bonk: 2.45,          // 2.27: the drop
  ghost: 2.6, open: 2.25, s1: 2.45, stamp: 3.75, crumble: [4.05, 4.75],
  s2: 5.0, fence: [5.15, 6.4], sign: 6.5, knock: [6.95, 7.35], gate: [7.5, 7.85], walk: [7.8, 8.4], close: 8.25,
  cut: 12.5,
  h2: 12.6, h2Land: 12.95, wink: [14.2, 14.7], h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const LESSON = { at: 8.35, out: [12.2, 12.4], text: 'Kind boundaries | keep love *close.*' }
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'a boundary isn’t a *wall.*' },
  { t: T.s2, speaker: ST, color: SAT, text: 'it’s a gate with *rules.* say them kindly.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const CROSS = BMP(`XX....XX XXX..XXX .XXXXXX. ..XXXX.. ..XXXX.. .XXXXXX. XXX..XXX XX....XX`)
const TOMATO = BMP(`..g.. .gGg. RRRRR RRWRR RRRRR .RRR.`)
const FLOWER = BMP(`.P.P. PPYPP .PPP. ..g.. .gg.. ..g..`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1, outline = true } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  if (outline) {
    x.fillStyle = 'rgba(14,8,32,0.88)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = typeof cols === 'string' ? cols : (cols[ch] || cols.X); x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout
const SAT_P = { x: 800, y: 740, r: 120 }
const GROUND = 1270                                   // the soil line the garden + stars stand on
const GARDEN = { x0: 110, x1: 640 }
const FENCE = { y: GROUND + 14, h: 78, gate: [470, 590] }
const WALL = { x0: 92, x1: 660, top: 930 }
const TAU_P = { x: 300, y: GROUND - 140, s: 264 }
const VIS_A = { x: 850, y: GROUND - 120, s: 236 }, VIS_IN = { x: 545, y: GROUND - 138, s: 236 }
const VIS_F = { x: 530, y: GROUND - 140, s: 250 }, TAU_F = { x: 270, y: GROUND - 140, s: 264 }
const PLANTS = [[150, 'T'], [205, 'F'], [380, 'T'], [425, 'F'], [610, 'F'], [175, 'F'], [430, 'T']].map(([px, k], i) => ({ x: px + (i > 4 ? 20 : 0), k, y: GROUND - 20 - (i > 4 ? 26 : 0) }))

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "800 88px Inter", "800 40px Inter", "italic 500 150px 'EB Garamond'", "700 54px 'Space Mono'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 28px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Saturn’s class: | *boundaries.*', { top: 196, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: SAT })
  const H2 = popText(root, 'Boundaries are | *love,* too.', { top: 196, size: 104, accentSize: 160, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── Saturn (stsaturn's teacher: banded disc, tilted ring, round glasses, a pointer)
  const RC = 11
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function satMood(t) {
    if (t < T.wall) return { eyes: 'open', look: [-1, 1] }
    if (t < T.crumble[1]) return { eyes: 'stern', look: [-1, 1] }
    if (t < T.walk[1]) return { eyes: 'open', look: [-1, 1] }
    if (t < T.cut) return { eyes: 'happy', look: [0, 0] }
    if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink', look: [0, 0] }
    return { eyes: 'happy', look: [0, 0] }
  }
  /** where the pointer tip is (the fence drawing follows it) */
  function pointerTip(t) {
    const fp = prog(t, ...T.fence)
    if (fp > 0 && fp < 1) return { x: lerp(GARDEN.x0, GARDEN.x1, fp), y: FENCE.y - FENCE.h * 0.6 + Math.sin(fp * Math.PI * 9) * 18, drawing: true }
    let tap = 0
    for (const t0 of [T.s1 + 0.2, T.stamp - 0.1, T.s2 + 0.1, T.sign]) { const u = t - t0; if (u > 0 && u < 0.6) tap = Math.max(tap, Math.abs(Math.sin(u / 0.6 * Math.PI * 3)) * (1 - u / 0.6)) }
    return { x: 600 - tap * 16, y: 1000 + tap * 24, drawing: false }
  }
  function drawSaturn(t) {
    const p = prog(t, ...T.satIn), e = ease.outCubic(p), ok = popOut(t, T.out)
    if (t < T.satIn[0] || ok <= 0.01) return
    const P = { x: lerp(1350, SAT_P.x, e), y: SAT_P.y - Math.abs(Math.sin(p * Math.PI * 2)) * 50 * (1 - p), r: SAT_P.r * ok, roll: (1 - e) * -2.2 }
    const c = Math.max(2, Math.round(P.r / RC)), R = RC
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 6)
    // the pointer first (it comes out from behind Saturn)
    const tip = pointerTip(t), bx = cx - P.r * 0.55, by = cy + P.r * 0.75
    x.save(); x.globalAlpha = clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * ok; x.lineCap = 'round'
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tip.x, tip.y); x.stroke()
    x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tip.x, tip.y); x.stroke()
    x.fillStyle = BONE; x.beginPath(); x.arc(tip.x, tip.y, 8, 0, Math.PI * 2); x.fill()
    if (tip.drawing) drawPixelStar(x, tip.x, tip.y, 30 + 8 * Math.sin(t * 30), 2, '#fff1c8')
    x.restore()
    glow(cx, cy, P.r * 3, SAT, 0.7 * ok)
    const tilt = -0.32 + P.roll * 0.15 + 0.04 * Math.sin(t * 1.3)
    const ct = Math.cos(tilt), sn = Math.sin(tilt)
    const ringCell = (i, j) => {
      const u = (i + 0.5) * ct + (j + 0.5) * sn, v = -(i + 0.5) * sn + (j + 0.5) * ct
      const e1 = (u / (2.15 * R)) ** 2 + (v / (0.6 * R)) ** 2, e2 = (u / (1.42 * R)) ** 2 + (v / (0.36 * R)) ** 2
      return e1 <= 1 && e2 > 1 ? { v, edge: e1 > 0.82 } : null
    }
    const drawRing = back => {
      for (let j = -Math.ceil(1.3 * R); j <= Math.ceil(1.3 * R); j++) for (let i = -Math.ceil(2.3 * R); i <= Math.ceil(2.3 * R); i++) {
        const q = ringCell(i, j)
        if (!q || (q.v < 0) !== back) continue
        x.fillStyle = q.edge ? '#b07a3a' : back ? '#c99a5a' : '#f3d9a2'
        x.fillRect(cx + i * c, cy + j * c, c, c)
      }
    }
    x.save()
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(cx + c / 2, cy + c / 2, (R + 1.2) * c, 0, Math.PI * 2); x.fill()
    drawRing(true)
    for (let j = -R; j < R; j++) for (let i = -R; i < R; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5)
      if (d > R) continue
      const band = BANDS[clamp(Math.floor(((j + R) / (2 * R)) * BANDS.length), 0, BANDS.length - 1)]
      x.fillStyle = d > R - 1 && i + j > 0 ? '#b07a3a' : (i + j < -R * 0.9 && d < R - 1 ? '#fff1c8' : band)
      x.fillRect(cx + i * c, cy + j * c, c, c)
    }
    const M = satMood(t), [lx, ly] = M.look
    const blinkT = (t + 0.7) % 3.7 < 0.13
    for (const s of [-1, 1]) {
      const ex = cx + s * 4 * c, ey = cy - 1 * c
      x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
      x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK
      const ee = M.eyes === 'wink' && s > 0 ? 'happy' : M.eyes
      if (blinkT && ee !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
      else if (ee === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
      else if (ee === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c, ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c, 4 * c, c * 0.8) }
      else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
    }
    x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)
    const g = t - T.wall
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
  }

  // ── the garden: soil, tomatoes and flowers, a little path to the gate
  function drawGround(t, fade) {
    x.save(); x.globalAlpha = fade
    const g = x.createLinearGradient(0, GROUND, 0, 1920)
    g.addColorStop(0, '#2f5a3a'); g.addColorStop(0.08, '#24462f'); g.addColorStop(1, '#14261e')
    x.fillStyle = g; x.fillRect(0, GROUND, W, 1920 - GROUND)
    x.fillStyle = '#3f7a4a'; x.fillRect(0, GROUND, W, 10)
    // the soil bed
    x.fillStyle = '#5a3a2a'; x.fillRect(GARDEN.x0, GROUND - 6, GARDEN.x1 - GARDEN.x0, 30)
    x.fillStyle = '#6e4a34'; for (let px = GARDEN.x0 + 10; px < GARDEN.x1; px += 46) x.fillRect(px, GROUND - 2, 22, 6)
    // the path (stepping stones out of the gate)
    x.fillStyle = '#8a8098'; for (let k = 0; k < 4; k++) x.fillRect(FENCE.gate[0] + 20 + k * 110, GROUND + 40 + k * 10, 70, 18)
    x.restore()
  }
  function drawPlants(t, fade) {
    PLANTS.forEach((p, i) => {
      const k = pop01(t, T.tauIn + 0.1 + i * 0.06, 0.3, 2.4) * fade
      const sway = Math.sin(t * 2.4 + i) * 0.08
      if (p.k === 'T') bits(x, TOMATO, p.x, p.y - 4, 8 * k, { g: '#5fd06a', G: '#3a9a4a', R: '#ff5a5a', W: '#ffd0d0' }, { rot: sway })
      else bits(x, FLOWER, p.x, p.y - 8, 8 * k, { P: [PINK, LAV, GOLD][i % 3], Y: '#fff1c8', g: '#5fd06a' }, { rot: sway })
    })
  }

  // ── the wall: slams up on the drop, gets the ✕, crumbles brick by brick
  function drawWall(t) {
    if (t < T.wall || t > T.crumble[1] + 0.6) return
    const up = easeOutBack(prog(t, T.wall, T.wall + 0.22), 1.3)
    const bw = 76, bh = 38
    const cols = Math.ceil((WALL.x1 - WALL.x0) / bw), rows = Math.ceil((GROUND + 30 - WALL.top) / bh)
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const off = j % 2 ? bw / 2 : 0
      let bx = WALL.x0 + i * bw - off, by = WALL.top + j * bh
      const fall = t - (T.crumble[0] + hash(i * 31 + j, 2) * 0.4 + (rows - j) * 0.02)
      let a = 1, rot = 0
      if (fall > 0) { by += 900 * fall * fall + 30 * fall; bx += (hash(i + j * 7, 3) - 0.5) * 220 * fall; rot = (hash(i, j) - 0.5) * 4 * fall; a = 1 - clamp(fall / 0.7) }
      if (a <= 0) continue
      const w0 = Math.min(bx + bw, WALL.x1) - Math.max(bx, WALL.x0)
      if (w0 <= 4) continue
      const x0 = Math.max(bx, WALL.x0)
      x.save(); x.globalAlpha = a
      x.translate(x0 + w0 / 2, GROUND + 30 - (GROUND + 30 - by - bh / 2) * up); x.rotate(rot)
      x.fillStyle = INK; x.fillRect(-w0 / 2, -bh / 2, w0, bh)
      x.fillStyle = (i + j) % 3 ? '#b8543a' : '#a0462f'; x.fillRect(-w0 / 2 + 3, -bh / 2 + 3, w0 - 6, bh - 6)
      x.fillStyle = 'rgba(255,220,190,0.25)'; x.fillRect(-w0 / 2 + 3, -bh / 2 + 3, w0 - 6, 5)
      x.restore()
    }
    // the ✕ stamp
    const sk = pop01(t, T.stamp, 0.25, 2.6) * (1 - clamp((t - T.crumble[0]) / 0.25))
    if (sk > 0.01) bits(x, CROSS, (WALL.x0 + WALL.x1) / 2, (WALL.top + GROUND) / 2, 30 * sk, RED, { rot: -0.08 })
  }

  // ── the fence: pickets appear as the pointer passes; a gate that swings open; the sign
  function drawFence(t) {
    const fp = prog(t, ...T.fence), fade = popOut(t, T.out)
    if (fp <= 0 || fade <= 0.01) return
    const reach = lerp(GARDEN.x0, GARDEN.x1, fp)
    x.save(); x.globalAlpha = clamp(fade)
    // rails
    const railTo = Math.min(reach, GARDEN.x1)
    for (const ry of [FENCE.y - FENCE.h * 0.7, FENCE.y - FENCE.h * 0.3]) {
      x.fillStyle = INK; x.fillRect(GARDEN.x0 - 4, ry - 4, railTo - GARDEN.x0 + 8, 18)
      x.fillStyle = '#e9e0cc'
      x.fillRect(GARDEN.x0, ry, Math.min(railTo, FENCE.gate[0]) - GARDEN.x0, 10)
      if (railTo > FENCE.gate[1]) x.fillRect(FENCE.gate[1], ry, railTo - FENCE.gate[1], 10)
    }
    const picket = (px, h, col = '#f3ead6') => {
      const k = easeOutBack(clamp((reach - px) / 40), 2.2)
      if (k <= 0) return
      const hh = h * k
      x.fillStyle = INK; x.fillRect(px - 15, FENCE.y - hh - 12, 30, hh + 14)
      x.fillStyle = col; x.fillRect(px - 11, FENCE.y - hh - 2, 22, hh + 2)
      x.fillRect(px - 5, FENCE.y - hh - 10, 10, 8)
      x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(px + 4, FENCE.y - hh - 2, 7, hh + 2)
    }
    for (let px = GARDEN.x0 + 10; px <= GARDEN.x1; px += 44) { if (px > FENCE.gate[0] - 10 && px < FENCE.gate[1] + 10) continue; picket(px, FENCE.h) }
    // the gate: a frame of pickets that swings open (scales toward its hinge on the left)
    if (reach > FENCE.gate[0]) {
      const op = ease.inOutCubic(prog(t, ...T.gate)) * (1 - ease.inOutCubic(prog(t, T.walk[1] + 0.2, T.walk[1] + 0.6)))
      const gw = FENCE.gate[1] - FENCE.gate[0], sx = 1 - 0.82 * op
      x.save(); x.translate(FENCE.gate[0], 0); x.scale(sx, 1)
      const k = easeOutBack(clamp((reach - FENCE.gate[0]) / 60), 2)
      x.fillStyle = INK; x.fillRect(0, FENCE.y - FENCE.h * k - 14, gw, FENCE.h * k + 16)
      x.fillStyle = '#ffd98a'; x.fillRect(6, FENCE.y - FENCE.h * k - 6, gw - 12, FENCE.h * k + 4)
      x.fillStyle = '#c98f4a'; for (let k2 = 1; k2 < 4; k2++) x.fillRect(k2 * gw / 4 - 3, FENCE.y - FENCE.h * k - 6, 6, FENCE.h * k + 4)
      x.restore()
      // posts either side of the gate
      for (const px of FENCE.gate) { x.fillStyle = INK; x.fillRect(px - 12, FENCE.y - FENCE.h - 30, 24, FENCE.h + 32); x.fillStyle = '#c98f4a'; x.fillRect(px - 8, FENCE.y - FENCE.h - 26, 16, FENCE.h + 26) }
    }
    x.restore()
    // the sign on the left post of the gate
    const sk = pop01(t, T.sign, 0.34, 2.4) * fade
    if (sk > 0.01) {
      x.save(); x.translate(FENCE.gate[0] - 140, FENCE.y - FENCE.h * 0.45); x.rotate(-0.06 + 0.03 * Math.sin(t * 2)); x.scale(sk, sk)
      x.fillStyle = INK; x.fillRect(-140, -40, 280, 80)
      x.fillStyle = '#f3e6c8'; x.fillRect(-134, -34, 268, 68)
      x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLEASE KNOCK', -14, 2)
      bits(x, HEART, 112, 0, 4, PINK, { outline: false })
            x.restore()
    }
  }

  // ── the stars
  function tauState(t) {
    if (t < T.visIn[0]) return { mood: 'happy', look: [0, 1] }                 // tending the garden
    if (t < T.wall) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.crumble[1]) return { mood: 'squint', look: [1, 0] }
    if (t < T.knock[0]) return { mood: 'neutral', look: [1, -1] }
    if (t < T.gate[0]) return { mood: 'wide', look: [1, 0] }
    if (t < T.cut) return { mood: 'happy', look: [1, 0] }
    return { mood: t > T.h2Land + 0.4 ? 'heart' : 'sparkle', look: [1, 0] }
  }
  function visState(t) {
    if (t < T.wall) return { mood: 'happy', look: [-1, 0] }
    if (t < T.bonk + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < T.crumble[1]) return { mood: 'eyeroll' }
    if (t < T.sign) return { mood: 'neutral', look: [-1, -1] }
    if (t < T.knock[1]) return { mood: 'squint', look: [-1, 0] }
    if (t < T.cut) return { mood: 'happy', look: [-1, 0] }
    return { mood: 'sparkle', look: [-1, 0] }
  }
  function visPos(t) {
    if (t >= T.cut) return VIS_F
    const e = ease.outCubic(prog(t, ...T.visIn))
    let px = lerp(1250, VIS_A.x, e), py = VIS_A.y - Math.abs(Math.sin(e * Math.PI * 3)) * 70 * (1 - e * 0.5)
    // charging at the garden, then bonk off the wall
    const ch = prog(t, T.visIn[1], T.wall + 0.1)
    px -= ease.inQuad(ch) * 120
    const bk = prog(t, T.bonk - 0.1, T.bonk + 0.5)
    if (bk > 0) { px -= 120 * (1 - bk) * 0; px += Math.sin(Math.PI * bk) * 90 + 0; py -= Math.sin(Math.PI * bk) * 60 }
    if (t > T.bonk + 0.5) px = VIS_A.x - 120 + 90 * 0
    // back to the gate to knock, then walk in on the path
    const toGate = ease.inOutCubic(prog(t, T.sign - 0.3, T.knock[0] - 0.05))
    px = lerp(px, FENCE.gate[1] + 110, toGate)
    const w = ease.inOutCubic(prog(t, ...T.walk))
    px = lerp(px, VIS_IN.x, w); py = lerp(py, VIS_IN.y, w) - Math.abs(Math.sin(w * Math.PI * 3)) * 26
    return { x: px, y: py, s: VIS_A.s }
  }
  function drawStars(t) {
    const ok = popOut(t, T.out)
    const beat3 = t >= T.cut
    const tp = (beat3 ? pop01(t, T.cut + 0.1, 0.34, 2) : pop01(t, T.tauIn, 0.36, 2)) * ok
    const P = beat3 ? TAU_F : TAU_P
    const tauHops = [T.tauIn + 0.4, T.tauIn + 1.0, T.crumble[0] + 0.2, T.gate[0], T.walk[1], T.h2Land, 13.8, 14.6]
    if (tp > 0.02) drawStarChar(x, P.x, P.y, P.s, t, { color: TAU_.color, glyph: TAU_.glyph, ...tauState(t), hops: tauHops, seed: 4, pop: tp, glow: 1.1 })
    const V = visPos(t)
    const vp = (beat3 ? pop01(t, T.cut + 0.16, 0.34, 2) : (t >= T.visIn[0] ? 1 : 0)) * ok
    let sq = 0
    const bk = t - T.bonk
    if (bk > 0 && bk < 0.4) sq = 0.25 * Math.sin(Math.PI * bk / 0.4)
    const visHops = [T.knock[0], T.knock[0] + 0.22, T.walk[0] + 0.1, T.walk[0] + 0.35, T.h2Land + 0.1, 14.0, 14.8]
    if (vp > 0.02) {
      const r = drawStarChar(x, V.x, V.y, V.s, t, { color: STAR.bone, ...visState(t), hops: visHops, seed: 12, pop: vp, squash: sq, glow: 1 })
      // bonk stars
      if (bk > 0 && bk < 1.1) for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; drawPixelStar(x, V.x + Math.cos(a) * 80, r.top - 10 + Math.sin(a) * 18, 26, 1, [GOLD, BONE, PINK][i]) }
      // TOK TOK
      for (const [i, t0] of T.knock.entries()) {
        const k = pop01(t, t0, 0.2, 2.6) * (1 - clamp((t - t0 - 0.5) / 0.3))
        if (k <= 0.01) continue
        x.save(); x.translate(FENCE.gate[1] + 40 + i * 60, FENCE.y - FENCE.h - 70 - i * 40); x.rotate(-0.12 + i * 0.2); x.scale(k, k)
        x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('TOK', 0, 0); x.fillStyle = GOLD; x.fillText('TOK', 0, 0)
        x.restore()
      }
    }
    if (beat3 && t > T.h2Land + 0.4) floatHearts(t, (TAU_F.x + VIS_F.x) / 2, TAU_F.y - 150, T.h2Land + 0.4, 15.0, 360)
  }

  function floatHearts(t, cx, cy, t0, t1, spread = 300) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.22, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 7 + i) * 14, cy - p * 240, 5 + (i % 3), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const fade = 1 - ease.inOutQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
      drawGround(t, fade)
      drawSaturn(t)
      drawPlants(t, fade)
      drawStars(t)
      drawWall(t)
      drawGhostCameo(x, t, { x: 560, y: WALL.top, at: T.ghost, dur: 1.2, from: 'below', cell: 3 })
      drawFence(t)
      sparkles(t, (WALL.x0 + WALL.x1) / 2, 1100, T.crumble[0], 14, 300, 1, [GOLD, BONE, '#ffb070'])
      sparkles(t, FENCE.gate[0] + 60, FENCE.y - 60, T.gate[1], 12, 160, 2, [MINT, GOLD, BONE])
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 8.3 (inert: the box shuts under the lesson), 12.5 (the lesson out → the last line, the one that plays).
const CUTS = [8.3, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.satIn[0], 0.6, 0.04], ['pop', T.satIn[1], 523.25, 0.035, 0.3],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', +(T.tauIn + 0.1 + i * 0.06).toFixed(3), NOTE[i], 0.014, -0.4]),
  ['whoosh', T.visIn[0], 0.5, 0.03],
  // the wall slams up, the bonk, the ✕, the crumble
  ['boom', T.wall, 0.22], ['tick', T.wall, 0.06], ['bell', T.wall + 0.05, 1567.98, 0.025, 1.2, 0.3],
  ['pop', T.bonk, 330, 0.05, 0.3], ['pop', T.bonk + 0.08, 262, 0.035, 0.3],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 523.25 } }),
  ['tick', T.stamp, 0.06], ['pop', T.stamp, 392, 0.045, -0.2],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.crumble[0] + i * 0.07).toFixed(3), 0.025 - i * 0.0015]), ['whoosh', T.crumble[0], 0.5, 0.03],
  // the fence draws, the sign, the knock, the gate
  ...Array.from({ length: 12 }, (_, i) => ['pop', +(T.fence[0] + i * (T.fence[1] - T.fence[0]) / 12).toFixed(3), NOTE[i % 7], 0.016, -0.6 + i * 0.1]),
  ['pop', T.sign + 0.1, 1174.66, 0.04, -0.1],
  ['tick', T.knock[0], 0.07], ['tick', T.knock[1], 0.07],
  ['whoosh', T.gate[0], 0.35, 0.025], ['bell', T.gate[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.gate[1], T.gate[1] + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // boundaries are love, too
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.045, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
