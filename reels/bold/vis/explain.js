// Explain visuals: fact cards, etymology, versus, checklists, gauges, flags, icon rows, timelines, clocks, hearts,
// scales, jokey rankings, calendars, ghosts, butterflies, bingo grids, notes and lock-screen notifications.
// Plus `icon(x, name, cx, cy, size, col, t)`: the shared neon line-art icon set (every name in SPEC's list; unknown → star).
//
// Params beyond SPEC (all optional):
//   fact      col, icon (an icon name in the corner), count (false: no count-up for numeric `big`)
//   word      means (a final "= …" line), col
//   versus    a/b.col, verdict also accepts "≈"; at (fraction the verdict lands)
//   checklist col; marks per item may also be "?" ; strike (false: no strike-through on ✕ items)
//   meter     value (big text under the hub, e.g. "MAX"), from (0–1 start), cols (arc gradient colours)
//   flags     (none)
//   icons     names (true: label each icon with its name), size (icon px), center (icon name or text for orbit)
//   timeline  layout row | col (default: row for ≤ 3 marks), col
//   clock     col, digital (false: hide the readout)
//   heart     col, to (fill level 0–1), at (fraction the action happens)
//   scale     ia, ib (icon names riding on the pans)
//   bars      items rows may add an icon: ["Coffee", 0.6, "coffee"]; crown (false: no crown on the top bar)
//   calendar  sub (small line under each page label), col
//   ghost     msg (the text bubble left on the phone), seen (status line, default "Seen")
//   butterflies from heart | jar
//   grid      mark dot | x | xo, bingo (stamp text when a line completes; false: none)
//   note      style note | letter, sign (letter sign-off)
//   notif     items rows may add an icon: ["Calendar", "Date night · 7 PM", "calendar"]; date (line over the time)
import {
  clamp, lerp, prog, ease, rng, TAU, BONE, GOLD, PINK, ROSE, BLUE, VIOLET, RED, GREEN, ORANGE, TEAL, MUTED, FIRE, EARTH,
  color, rgba, pop01, popOut, wob, stagger, easeOutBack, ink, line, rr, panel, label, para, pill, bubble, glyph, person,
  heart, heartPath, starPath, arrow, sparkle, twinkles, font, wrap, drawPixelStar,
} from '../kit.js'
import { stampAt } from './core.js'

const PAL = [BLUE, PINK, GOLD, VIOLET, GREEN, ORANGE, TEAL, ROSE]
const DARK = '#1a1033'
const PI = Math.PI

// ───────────────────────── small path helpers (icon space: a 100 × 100 box centred on 0,0)
const C = (x, cx, cy, r) => { x.beginPath(); x.arc(cx, cy, r, 0, TAU) }
const E = (x, cx, cy, rx, ry, rot = 0) => { x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, TAU) }
const R = (x, px, py, w, h, r) => { x.beginPath(); x.roundRect(px, py, w, h, r) }
const P = (x, pts, close = true) => { x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); if (close) x.closePath() }
const M = (x, ...segs) => { x.beginPath(); for (const s of segs) s.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)) }
function bubblePath(x, x0, y0, w, h, r, tx) {
  x.beginPath(); x.moveTo(x0 + r, y0); x.arcTo(x0 + w, y0, x0 + w, y0 + h, r); x.arcTo(x0 + w, y0 + h, x0, y0 + h, r)
  x.lineTo(tx + 8, y0 + h); x.lineTo(tx - 10, y0 + h + 16); x.lineTo(tx - 6, y0 + h)
  x.arcTo(x0, y0 + h, x0, y0, r); x.arcTo(x0, y0, x0 + w, y0, r); x.closePath()
}
function cloudPath(x) {
  x.beginPath(); x.moveTo(-30, 26)
  x.arc(-30, 10, 16, PI / 2, PI * 1.5)
  x.arc(-6, -2, 22, PI * 1.12, PI * 1.9)
  x.arc(24, 9, 17, PI * 1.38, PI * 2.5)
  x.closePath()
}
function crescent(x, Rr, dx, dy, r) {
  const d = Math.hypot(dx, dy), a = (Rr * Rr - r * r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, Rr * Rr - a * a)), ux = dx / d, uy = dy / d
  const p1 = [a * ux - h * uy, a * uy + h * ux], p2 = [a * ux + h * uy, a * uy - h * ux]
  x.beginPath(); x.arc(0, 0, Rr, Math.atan2(p1[1], p1[0]), Math.atan2(p2[1], p2[0]), false)
  x.arc(dx, dy, r, Math.atan2(p2[1] - dy, p2[0] - dx), Math.atan2(p1[1] - dy, p1[0] - dx), true); x.closePath()
}
function flame(x) {
  x.beginPath(); x.moveTo(0, 44)
  x.bezierCurveTo(-30, 44, -40, 14, -24, -8); x.quadraticCurveTo(-18, 4, -10, 4)
  x.bezierCurveTo(-14, -18, -2, -36, 8, -48); x.bezierCurveTo(10, -30, 34, -16, 32, 12)
  x.bezierCurveTo(32, 32, 18, 44, 0, 44); x.closePath()
}
function drop(x, px, py, s) { x.beginPath(); x.moveTo(px, py - 9 * s); x.quadraticCurveTo(px + 7 * s, py + 1 * s, px, py + 5 * s); x.quadraticCurveTo(px - 7 * s, py + 1 * s, px, py - 9 * s); x.closePath() }

// ───────────────────────── the icon set. Each entry: [default colour, draw(x, g)] where g = { c, t, F, S, D, lw }
//   F(col, fa, wMul) fill + glow stroke · S(col, wMul) stroke · D(col, a) a flat fill (no stroke)
const ICONS = {
  heart: [PINK, (x, g) => { const k = 1 + 0.05 * Math.max(0, Math.sin(g.t * 6)); x.scale(k, k); heartPath(x, 0, 4, 58); g.F(g.c, 0.38) }],
  'broken-heart': [PINK, (x, g) => {
    const k = 58 / 60, sp = 5 + 2 * Math.sin(g.t * 3), top = -26 * k + 4, bot = 42 * k + 4
    const zig = [[0, top], [-7, -6], [6, 8], [-5, 22], [0, bot]]
    x.save(); x.translate(-sp, 0); x.rotate(-0.09)
    x.beginPath(); x.moveTo(0, bot); x.bezierCurveTo(-70 * k, -6 * k + 4, -46 * k, -62 * k + 4, 0, top); zig.slice(1).forEach(p => x.lineTo(...p)); x.closePath(); g.F(g.c, 0.36); x.restore()
    x.save(); x.translate(sp, 0); x.rotate(0.09)
    x.beginPath(); x.moveTo(0, top); x.bezierCurveTo(46 * k, -62 * k + 4, 70 * k, -6 * k + 4, 0, bot); [...zig].reverse().slice(1).forEach(p => x.lineTo(...p)); x.closePath(); g.F(g.c, 0.36); x.restore()
  }],
  ghost: ['#efe6ff', (x, g) => {
    x.translate(0, Math.sin(g.t * 2.2) * 3); x.rotate(Math.sin(g.t * 1.6) * 0.05)
    x.beginPath(); x.moveTo(-34, 38); x.lineTo(-34, -8); x.arc(0, -8, 34, PI, 0); x.lineTo(34, 38)
    for (let i = 0; i < 4; i++) { const x0 = 34 - 17 * i; x.quadraticCurveTo(x0 - 8.5, 50 + 4 * Math.sin(g.t * 5 + i * 1.7), x0 - 17, 38) }
    x.closePath(); g.F(g.c, 0.32)
    E(x, -12, -10, 5, 7); g.D(DARK, 1); E(x, 12, -10, 5, 7); g.D(DARK, 1)
  }],
  phone: [BLUE, (x, g) => {
    R(x, -27, -46, 54, 92, 12); g.F(g.c, 0.22)
    R(x, -19, -34, 38, 62, 5); g.D(g.c, 0.22)
    M(x, [[-6, -40], [6, -40]], [[-8, 38], [8, 38]]); g.S(g.c, 0.6)
    R(x, -13, -26, 20, 9, 4); g.D(BONE, 0.7); R(x, -6, -12, 20, 9, 4); g.D(g.c, 0.9)
    const b = 1 + 0.15 * Math.max(0, Math.sin(g.t * 5)); C(x, 26, -44, 9 * b); g.F(PINK, 1, 0.5)
  }],
  chat: [VIOLET, (x, g) => {
    bubblePath(x, -44, -36, 88, 62, 20, -14); g.F(g.c, 0.26)
    for (let i = 0; i < 3; i++) { C(x, -18 + i * 18, -5 - Math.max(0, Math.sin(g.t * 7 - i * 0.9)) * 5, 5.5); g.D(BONE, 1) }
  }],
  coffee: [ORANGE, (x, g) => {
    x.translate(-4, 4)
    x.beginPath(); x.moveTo(-30, -14); x.lineTo(30, -14); x.lineTo(25, 30); x.quadraticCurveTo(24, 38, 16, 38); x.lineTo(-16, 38); x.quadraticCurveTo(-24, 38, -25, 30); x.closePath(); g.F(g.c, 0.32)
    x.beginPath(); x.arc(31, 6, 11, -PI / 2, PI / 2); g.S(g.c)
    M(x, [[-40, 46], [40, 46]]); g.S(g.c, 0.8)
    x.save(); x.globalAlpha *= 0.75
    for (const sx of [-10, 8]) { const o = Math.sin(g.t * 3 + sx) * 4; x.beginPath(); x.moveTo(sx, -22); x.bezierCurveTo(sx - 9 + o, -30, sx + 9 + o, -38, sx + o * 0.5, -48); g.S(BONE, 0.6) }
    x.restore()
  }],
  taco: [GOLD, (x, g) => {
    x.translate(0, -2)
    const r = rng(5)
    x.beginPath(); x.moveTo(-42, -4); for (let i = 0; i <= 12; i++) x.lineTo(-42 + i * 7, -4 - (i % 2 ? 14 : 4)); x.lineTo(42, 0); x.closePath(); g.F(GREEN, 0.5, 0.7)
    for (let i = 0; i < 4; i++) { C(x, -26 + i * 17, -8 - r() * 4, 6); g.F(RED, 0.7, 0.5) }
    x.beginPath(); x.arc(0, -4, 46, 0, PI); x.closePath(); g.F(g.c, 0.4)
    x.beginPath(); x.arc(0, -4, 34, 0.15, PI - 0.15); g.S(g.c, 0.45)
  }],
  kolache: [EARTH, (x, g) => {
    C(x, 0, 2, 42); g.F(g.c, 0.32)
    C(x, 0, 2, 21); g.F(PINK, 0.6, 0.8)
    const r = rng(9); for (let i = 0; i < 9; i++) { const a = (i / 9) * TAU + 0.3, d = 31 + r() * 3; C(x, Math.cos(a) * d, 2 + Math.sin(a) * d, 2.6); g.D(BONE, 0.9) }
    x.beginPath(); x.arc(-5, -3, 9, PI * 1.1, PI * 1.6); g.S(BONE, 0.5)
  }],
  crawfish: ['#ff5a3a', (x, g) => {
    x.rotate(-0.15)
    const cl = Math.sin(g.t * 4) * 0.12
    M(x, [[-18, -6], [-36, -20]], [[-18, 6], [-36, 20]]); g.S(g.c, 0.8)
    for (const sy of [-1, 1]) { x.save(); x.translate(-40, sy * 26); x.rotate(sy * (0.5 + cl)); x.beginPath(); x.moveTo(6, 0); x.quadraticCurveTo(-4, sy * -12, -18, -2 * sy); x.lineTo(-6, 0); x.lineTo(-18, 4 * sy); x.quadraticCurveTo(-4, sy * 12, 6, 0); x.closePath(); g.F(g.c, 0.45, 0.7); x.restore() }
    for (let i = 0; i < 3; i++) { M(x, [[-6 + i * 9, 10], [-10 + i * 9, 22]]); g.S(g.c, 0.5) }
    M(x, [[-20, -2], [-48, -40]], [[-20, 2], [-50, -16]]); g.S(g.c, 0.4)
    E(x, -4, 0, 20, 13); g.F(g.c, 0.4)
    const seg = [[18, 2, 9, 11], [30, 8, 8, 10], [38, 18, 7, 8]]
    seg.forEach(([a, b, rx, ry], i) => { E(x, a, b, rx, ry, 0.4 + i * 0.3); g.F(g.c, 0.4, 0.8) })
    P(x, [[40, 24], [32, 40], [46, 40], [52, 30]]); g.F(g.c, 0.45, 0.7)
  }],
  cake: [PINK, (x, g) => {
    M(x, [[-46, 42], [46, 42]]); g.S(BONE, 0.7)
    R(x, -38, -2, 76, 40, 6); g.F(g.c, 0.3)
    x.beginPath(); x.moveTo(-38, 6); for (let i = 0; i < 6; i++) { const a = -38 + i * 12.6; x.quadraticCurveTo(a + 3, 16, a + 6.3, 10); x.quadraticCurveTo(a + 9.5, 4, a + 12.6, 6) } g.S(BONE, 0.6)
    M(x, [[-36, 24], [36, 24]]); g.S(g.c, 0.4)
    R(x, -4, -26, 8, 24, 2); g.F(BLUE, 0.5, 0.6)
    x.save(); x.translate(0, -34); x.scale(0.22, 0.22 * (1 + 0.1 * Math.sin(g.t * 11))); flame(x); g.F(GOLD, 0.7, 2.6); x.restore()
  }],
  gift: [PINK, (x, g) => {
    x.rotate(Math.sin(g.t * 5) * 0.03)
    R(x, -36, -6, 72, 48, 6); g.F(g.c, 0.3)
    R(x, -42, -20, 84, 16, 5); g.F(g.c, 0.35)
    R(x, -6, -20, 12, 62, 1); g.F(GOLD, 0.55, 0.6)
    E(x, -14, -30, 14, 9, 0.45); g.F(GOLD, 0.35, 0.8); E(x, 14, -30, 14, 9, -0.45); g.F(GOLD, 0.35, 0.8)
  }],
  ring: [GOLD, (x, g) => {
    C(x, 0, 16, 28); g.F(g.c, 0, 1.3)
    P(x, [[-18, -20], [-10, -32], [10, -32], [18, -20], [0, -2]]); g.F(BLUE, 0.45, 0.8)
    M(x, [[-18, -20], [18, -20]], [[-4, -32], [-6, -20], [0, -2]], [[4, -32], [6, -20]]); g.S(BLUE, 0.4)
    x.save(); x.globalAlpha *= 0.5 + 0.5 * Math.sin(g.t * 4); drawPixelStar(x, 28, -38, 16, 0, '#fff3e0'); x.restore()
  }],
  rose: ['#ff4d6d', (x, g) => {
    x.beginPath(); x.moveTo(0, 6); x.quadraticCurveTo(-4, 26, 2, 48); g.S(GREEN, 0.8)
    x.beginPath(); x.moveTo(0, 30); x.quadraticCurveTo(18, 18, 26, 26); x.quadraticCurveTo(16, 36, 0, 30); g.F(GREEN, 0.4, 0.6)
    x.beginPath(); x.moveTo(-26, -28); x.quadraticCurveTo(-30, 6, 0, 8); x.quadraticCurveTo(30, 6, 26, -28); x.quadraticCurveTo(13, -42, 0, -30); x.quadraticCurveTo(-13, -42, -26, -28); x.closePath(); g.F(g.c, 0.38)
    x.beginPath(); x.arc(0, -16, 9, PI * 0.9, PI * 2.4); x.arc(2, -18, 15, PI * 0.4, PI * 1.1); g.S(g.c, 0.55)
  }],
  flower: [PINK, (x, g) => {
    x.beginPath(); x.moveTo(0, 6); x.quadraticCurveTo(4, 28, 0, 48); g.S(GREEN, 0.8)
    x.beginPath(); x.moveTo(1, 34); x.quadraticCurveTo(20, 20, 28, 30); x.quadraticCurveTo(16, 40, 1, 34); g.F(GREEN, 0.4, 0.6)
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU + g.t * 0.4; E(x, Math.cos(a) * 19, -14 + Math.sin(a) * 19, 14, 10, a); g.F(g.c, 0.35, 0.7) }
    C(x, 0, -14, 11); g.F(GOLD, 0.7, 0.7)
  }],
  plant: [GREEN, (x, g) => {
    const leaf = (a, len, w) => { x.save(); x.translate(0, 10); x.rotate(a + Math.sin(g.t * 1.8 + a * 3) * 0.06); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(w, -len / 2, 0, -len); x.quadraticCurveTo(-w, -len / 2, 0, 0); g.F(g.c, 0.38, 0.8); x.beginPath(); x.moveTo(0, -4); x.lineTo(0, -len + 8); g.S(g.c, 0.35); x.restore() }
    leaf(-0.75, 46, 15); leaf(0.75, 46, 15); leaf(0, 56, 16)
    P(x, [[-24, 16], [24, 16], [18, 46], [-18, 46]]); g.F(EARTH, 0.35)
    R(x, -29, 8, 58, 11, 3); g.F(EARTH, 0.4)
  }],
  sun: [GOLD, (x, g) => {
    x.save(); x.rotate(g.t * 0.4)
    for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; M(x, [[Math.cos(a) * 32, Math.sin(a) * 32], [Math.cos(a) * 46, Math.sin(a) * 46]]); g.S(g.c) }
    x.restore(); C(x, 0, 0, 22); g.F(g.c, 0.5)
  }],
  moon: ['#ffe39a', (x, g) => {
    x.rotate(-0.35 + Math.sin(g.t * 1.2) * 0.05); crescent(x, 40, 18, -10, 33); g.F(g.c, 0.4)
    x.save(); x.globalAlpha *= 0.4 + 0.6 * Math.abs(Math.sin(g.t * 2)); drawPixelStar(x, 30, 20, 16, 1, '#fff3e0'); x.restore()
  }],
  star: [GOLD, (x, g) => { x.rotate(Math.sin(g.t * 2) * 0.12); starPath(x, 0, 3, 48, 21); g.F(g.c, 0.42) }],
  cloud: ['#cfe3ff', (x, g) => { x.translate(Math.sin(g.t * 1.2) * 3, -4); cloudPath(x); g.F(g.c, 0.26) }],
  rain: [BLUE, (x, g) => {
    for (let i = 0; i < 3; i++) { const ph = (g.t * 1.3 + i * 0.37) % 1; x.save(); x.globalAlpha *= 1 - ph; drop(x, -20 + i * 20, 22 + ph * 26, 1.2); g.F(g.c, 0.5, 0.6); x.restore() }
    x.save(); x.translate(0, -16); x.scale(0.9, 0.9); cloudPath(x); g.F('#cfe3ff', 0.28); x.restore()
  }],
  umbrella: [BLUE, (x, g) => {
    x.rotate(Math.sin(g.t * 1.5) * 0.06); x.translate(0, 2)
    M(x, [[0, -8], [0, 34]]); g.S(BONE, 0.8); x.beginPath(); x.arc(-8, 34, 8, 0, PI); g.S(BONE, 0.8)
    x.beginPath(); x.arc(0, -4, 46, PI, 0); x.arc(30.7, -4, 15.3, 0, PI, true); x.arc(0, -4, 15.3, 0, PI, true); x.arc(-30.7, -4, 15.3, 0, PI, true); x.closePath(); g.F(g.c, 0.32)
    M(x, [[0, -50], [0, -56]]); g.S(g.c)
  }],
  snow: ['#cfeaff', (x, g) => {
    x.rotate(g.t * 0.3)
    for (let i = 0; i < 6; i++) { x.save(); x.rotate((i / 6) * TAU); M(x, [[0, 0], [0, -44]], [[-11, -34], [0, -24], [11, -34]], [[-8, -16], [0, -10], [8, -16]]); g.S(g.c, 0.9); x.restore() }
    C(x, 0, 0, 7); g.F(g.c, 0.4, 0.6)
  }],
  fire: [FIRE, (x, g) => {
    x.translate(0, 2); x.save(); x.scale(1 + 0.03 * Math.sin(g.t * 8), 1 + 0.06 * Math.sin(g.t * 11)); flame(x); g.F(g.c, 0.36); x.restore()
    x.save(); x.translate(0, 20); x.scale(0.5, 0.5 * (1 + 0.1 * Math.sin(g.t * 13))); flame(x); g.F(GOLD, 0.55, 1.6); x.restore()
  }],
  wave: ['#5fb0ff', (x, g) => {
    x.translate(Math.sin(g.t * 1.6) * 2, 0)
    x.beginPath(); x.moveTo(-48, 28); x.bezierCurveTo(-44, -8, -14, -38, 16, -34); x.bezierCurveTo(40, -30, 50, -6, 36, 6); x.bezierCurveTo(26, 14, 12, 6, 16, -6); x.bezierCurveTo(20, -16, 8, -18, 0, -12); x.bezierCurveTo(-14, -2, -16, 18, -8, 28); x.closePath(); g.F(g.c, 0.32)
    x.beginPath(); for (let i = 0; i <= 24; i++) { const px = -48 + i * 4; const py = 40 + Math.sin(i * 0.8 + g.t * 4) * 4; i ? x.lineTo(px, py) : x.moveTo(px, py) } g.S(g.c, 0.8)
  }],
  mountain: [VIOLET, (x, g) => {
    P(x, [[-48, 40], [-14, -30], [6, 2], [20, -14], [48, 40]]); g.F(g.c, 0.3)
    P(x, [[-24, -10], [-14, -30], [-4, -10], [-10, -14], [-14, -8], [-19, -14]]); g.F(BONE, 0.7, 0.6)
    P(x, [[14, -6], [20, -14], [27, -4], [22, -7], [18, -3]]); g.F(BONE, 0.7, 0.5)
  }],
  wind: ['#bfe6ff', (x, g) => {
    const o = (i) => Math.sin(g.t * 3 + i) * 4
    x.beginPath(); x.moveTo(-46 + o(0), -18); x.lineTo(18, -18); x.bezierCurveTo(36, -18, 38, -42, 22, -40); x.bezierCurveTo(14, -39, 14, -30, 20, -28); g.S(g.c)
    x.beginPath(); x.moveTo(-48 + o(1), 2); x.lineTo(30, 2); x.bezierCurveTo(48, 2, 50, -22, 34, -20); g.S(g.c)
    x.beginPath(); x.moveTo(-40 + o(2), 22); x.lineTo(8, 22); x.bezierCurveTo(26, 22, 28, 44, 12, 42); x.bezierCurveTo(4, 41, 4, 32, 10, 32); g.S(g.c)
  }],
  bolt: [GOLD, (x, g) => { x.globalAlpha *= 0.8 + 0.2 * Math.abs(Math.sin(g.t * 9)); P(x, [[10, -48], [-24, 4], [-2, 4], [-12, 48], [24, -10], [2, -10], [14, -48]]); g.F(g.c, 0.45) }],
  lightbulb: [GOLD, (x, g) => {
    const p = 0.5 + 0.5 * Math.sin(g.t * 3)
    x.save(); x.globalAlpha *= 0.4 + 0.6 * p
    for (let i = 0; i < 5; i++) { const a = PI + (i / 4) * PI; M(x, [[Math.cos(a) * 40, -14 + Math.sin(a) * 40], [Math.cos(a) * 50, -14 + Math.sin(a) * 50]]); g.S(g.c, 0.8) }
    x.restore()
    x.beginPath(); x.arc(0, -12, 28, PI * 0.78, PI * 0.22); x.lineTo(12, 20); x.lineTo(-12, 20); x.closePath(); g.F(g.c, 0.3 + 0.2 * p)
    R(x, -12, 24, 24, 14, 4); g.F(BONE, 0.3, 0.7); M(x, [[-8, 44], [8, 44]]); g.S(BONE, 0.7)
    x.beginPath(); x.moveTo(-6, 18); x.lineTo(-6, 2); x.lineTo(0, -6); x.lineTo(6, 2); x.lineTo(6, 18); g.S(g.c, 0.45)
  }],
  book: [VIOLET, (x, g) => {
    x.beginPath(); x.moveTo(0, -26); x.quadraticCurveTo(-20, -38, -46, -32); x.lineTo(-46, 30); x.quadraticCurveTo(-20, 24, 0, 36); x.closePath(); g.F(g.c, 0.28)
    x.beginPath(); x.moveTo(0, -26); x.quadraticCurveTo(20, -38, 46, -32); x.lineTo(46, 30); x.quadraticCurveTo(20, 24, 0, 36); x.closePath(); g.F(g.c, 0.28)
    for (let i = 0; i < 3; i++) { const y = -16 + i * 14; M(x, [[-36, y - 2], [-10, y + 3]], [[10, y + 3], [36, y - 2]]); g.S(BONE, 0.4) }
  }],
  music: [PINK, (x, g) => {
    x.translate(0, Math.sin(g.t * 4) * 3); x.rotate(Math.sin(g.t * 2) * 0.05)
    P(x, [[-9, -24], [37, -36], [37, -22], [-9, -10]]); g.F(g.c, 0.6, 0.8)
    M(x, [[-9, -24], [-9, 26]], [[37, -36], [37, 16]]); g.S(g.c)
    E(x, -21, 28, 14, 10, -0.4); g.F(g.c, 0.5); E(x, 25, 18, 14, 10, -0.4); g.F(g.c, 0.5)
  }],
  headphones: [VIOLET, (x, g) => {
    x.beginPath(); x.arc(0, 6, 38, PI, 0); g.S(g.c, 1.2)
    R(x, -48, 0, 20, 38, 9); g.F(g.c, 0.4); R(x, 28, 0, 20, 38, 9); g.F(g.c, 0.4)
    for (let i = 0; i < 2; i++) { const o = (g.t * 0.8 + i * 0.5) % 1; x.save(); x.globalAlpha *= 1 - o; drawPixelStar(x, 0, -14 - o * 30, 12, 2, PINK); x.restore() }
  }],
  plane: [BLUE, (x, g) => {
    x.translate(Math.sin(g.t * 1.5) * 2, Math.cos(g.t * 1.5) * 2); x.rotate(0.78)
    const h = [[0, -48], [7, -38], [7, -10], [46, 12], [46, 20], [7, 10], [5, 30], [18, 40], [18, 46], [0, 41]]
    P(x, [...h, ...h.slice(1, -1).reverse().map(([a, b]) => [-a, b])]); g.F(g.c, 0.3)
  }],
  car: [PINK, (x, g) => {
    x.translate(0, Math.abs(Math.sin(g.t * 7)) * -1.5)
    P(x, [[-46, 20], [-46, 4], [-36, -4], [-24, -6], [-14, -26], [16, -26], [28, -6], [42, -2], [48, 8], [48, 20]]); g.F(g.c, 0.3)
    M(x, [[-10, -20], [-18, -6], [0, -6], [0, -20], [-10, -20]], [[6, -20], [6, -6], [22, -6], [14, -20], [6, -20]]); g.S(BLUE, 0.5)
    for (const wx of [-26, 28]) { C(x, wx, 22, 11); g.F(BONE, 0.5, 0.9); C(x, wx, 22, 3); g.D(DARK, 1) }
  }],
  house: [GOLD, (x, g) => {
    R(x, 16, -40, 12, 22, 2); g.F(g.c, 0.3, 0.8)
    P(x, [[-38, 44], [-38, -2], [0, -38], [38, -2], [38, 44]]); g.F(g.c, 0.26)
    R(x, -10, 16, 20, 28, 4); g.F(g.c, 0.4, 0.7)
    const lit = 0.55 + 0.4 * Math.sin(g.t * 2.5); R(x, -28, 4, 14, 14, 2); g.F(GOLD, lit, 0.6); R(x, 14, 4, 14, 14, 2); g.F(GOLD, lit, 0.6)
  }],
  key: [GOLD, (x, g) => {
    x.rotate(-0.55 + Math.sin(g.t * 2) * 0.06)
    C(x, -26, 0, 17); g.F(g.c, 0.3); C(x, -26, 0, 6); g.D(DARK, 1); C(x, -26, 0, 6); g.S(g.c, 0.5)
    M(x, [[-9, 0], [46, 0]], [[30, 0], [30, 14]], [[42, 0], [42, 10]]); g.S(g.c, 1.1)
  }],
  lock: [GOLD, (x, g) => {
    x.beginPath(); x.moveTo(-20, -8); x.lineTo(-20, -20); x.arc(0, -20, 20, PI, 0); x.lineTo(20, -8); g.S(g.c, 1.1)
    R(x, -32, -10, 64, 54, 10); g.F(g.c, 0.32)
    C(x, 0, 12, 7); g.D(DARK, 1); P(x, [[-4, 14], [4, 14], [6, 30], [-6, 30]]); g.D(DARK, 1)
  }],
  clock: [BLUE, (x, g) => {
    C(x, 0, 0, 44); g.F(g.c, 0.18)
    for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU, r0 = i % 3 ? 36 : 32; M(x, [[Math.cos(a) * r0, Math.sin(a) * r0], [Math.cos(a) * 40, Math.sin(a) * 40]]); g.S(g.c, i % 3 ? 0.35 : 0.6) }
    const m = g.t * 1.2 - PI / 2, hh = g.t * 0.1 - PI / 2 - 1.2
    M(x, [[0, 0], [Math.cos(hh) * 20, Math.sin(hh) * 20]]); g.S(BONE, 1); M(x, [[0, 0], [Math.cos(m) * 32, Math.sin(m) * 32]]); g.S(BONE, 0.8)
    C(x, 0, 0, 5); g.D(BONE, 1)
  }],
  calendar: [PINK, (x, g) => {
    R(x, -40, -32, 80, 76, 10); g.F(BONE, 0.12)
    R(x, -40, -32, 80, 76, 10); g.S(g.c)
    R(x, -40, -32, 80, 22, [10, 10, 0, 0]); g.F(g.c, 0.55)
    M(x, [[-20, -44], [-20, -26]], [[20, -44], [20, -26]]); g.S(BONE, 0.9)
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { C(x, -24 + c * 16, 2 + r * 13, 3.2); g.D(BONE, 0.7) }
    const k = 0.5 + 0.5 * Math.sin(g.t * 3); E(x, 24, 28, 9 + k, 8 + k, -0.2); g.S(RED, 0.6)
  }],
  pin: ['#ff6a5a', (x, g) => {
    E(x, 0, 46, 14, 4); g.D(g.c, 0.3)
    x.translate(0, -Math.abs(Math.sin(g.t * 3)) * 5)
    x.beginPath(); x.moveTo(0, 44); x.bezierCurveTo(-10, 28, -32, 8, -32, -14); x.arc(0, -14, 32, PI, 0); x.bezierCurveTo(32, 8, 10, 28, 0, 44); x.closePath(); g.F(g.c, 0.32)
    C(x, 0, -14, 12); g.F(BONE, 0.5, 0.7)
  }],
  magnifier: [BLUE, (x, g) => {
    x.rotate(Math.sin(g.t * 1.4) * 0.08)
    M(x, [[14, 14], [40, 40]]); g.S(g.c, 1.8)
    C(x, -8, -8, 28); g.F(g.c, 0.18)
    x.beginPath(); x.arc(-8, -8, 18, PI * 1.1, PI * 1.45); g.S(BONE, 0.6)
  }],
  camera: [VIOLET, (x, g) => {
    R(x, -16, -34, 32, 14, 4); g.F(g.c, 0.3, 0.8)
    R(x, -44, -24, 88, 60, 10); g.F(g.c, 0.26)
    C(x, 0, 6, 20); g.F(BLUE, 0.25); C(x, 0, 6, 9); g.F(BLUE, 0.5, 0.6)
    const f = Math.sin(g.t * 2.2) > 0.94 ? 1 : 0.4; C(x, 30, -12, 5); g.D(GOLD, f)
  }],
  mirror: [GOLD, (x, g) => {
    R(x, -6, 26, 12, 22, 4); g.F(g.c, 0.4)
    E(x, 0, -8, 30, 38); g.F(BLUE, 0.2); E(x, 0, -8, 30, 38); g.S(g.c, 1.2)
    const o = Math.sin(g.t * 1.5) * 4; M(x, [[-14 + o, -22], [-2 + o, -34]], [[-14 + o, -8], [6 + o, -28]]); g.S(BONE, 0.6)
  }],
  bed: [VIOLET, (x, g) => {
    R(x, -46, -18, 10, 58, 4); g.F(g.c, 0.35, 0.8)
    R(x, -38, 6, 84, 20, 6); g.F(g.c, 0.3)
    R(x, -32, -6, 22, 12, 6); g.F(BONE, 0.4, 0.7)
    x.beginPath(); x.moveTo(-6, 6); x.quadraticCurveTo(14, -8, 46, 6); g.F(BLUE, 0.35, 0.7)
    M(x, [[-40, 26], [-40, 40]], [[42, 26], [42, 40]]); g.S(g.c, 0.9)
    for (let i = 0; i < 3; i++) { const o = (g.t * 0.6 + i / 3) % 1; label(x, 'z', 10 + i * 12 + o * 8, -14 - i * 12 - o * 10, { size: 14 + i * 4, weight: 900, color: BONE, alpha: Math.sin(o * PI), shadow: false }) }
  }],
  dog: [EARTH, (x, g) => {
    x.save(); x.translate(-30, 2); x.rotate(-0.5 + Math.sin(g.t * 10) * 0.35); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-6, -14, -2, -26); g.S(g.c, 0.9); x.restore()
    M(x, [[-22, 18], [-22, 40]], [[-10, 18], [-10, 40]], [[10, 18], [10, 40]], [[20, 18], [20, 40]]); g.S(g.c, 0.95)
    R(x, -32, -4, 56, 26, 13); g.F(g.c, 0.32)
    x.beginPath(); x.moveTo(16, -2); x.lineTo(22, -26); x.quadraticCurveTo(26, -34, 34, -32); x.lineTo(46, -24); x.quadraticCurveTo(50, -16, 42, -14); x.lineTo(34, -12); x.lineTo(28, 2); x.closePath(); g.F(g.c, 0.36)
    E(x, 24, -24, 5, 11, 0.35); g.F(g.c, 0.6, 0.6)
    C(x, 48, -21, 3); g.D(DARK, 1)
  }],
  cat: [VIOLET, (x, g) => {
    x.save(); x.translate(18, 40); x.rotate(Math.sin(g.t * 2.2) * 0.12); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(30, 2, 34, -20, 22, -34); g.S(g.c, 1); x.restore()
    x.beginPath(); x.moveTo(-12, -10); x.bezierCurveTo(-32, 8, -30, 42, -18, 42); x.lineTo(18, 42); x.bezierCurveTo(30, 42, 32, 8, 12, -10); x.closePath(); g.F(g.c, 0.3)
    x.beginPath(); x.moveTo(-17, -26); x.lineTo(-17, -48); x.lineTo(-5, -38); x.quadraticCurveTo(0, -40, 5, -38); x.lineTo(17, -48); x.lineTo(17, -26); x.arc(0, -24, 17, 0.1, PI - 0.1); x.closePath(); g.F(g.c, 0.36)
  }],
  briefcase: ['#d9a066', (x, g) => {
    R(x, -14, -32, 28, 16, 6); g.S(g.c, 0.9)
    R(x, -44, -18, 88, 58, 8); g.F(g.c, 0.3)
    M(x, [[-44, 4], [44, 4]]); g.S(g.c, 0.55); R(x, -7, -2, 14, 12, 3); g.F(GOLD, 0.6, 0.6)
  }],
  money: [GREEN, (x, g) => {
    x.rotate(-0.12 + Math.sin(g.t * 2) * 0.05)
    R(x, -40, -18, 88, 50, 8); g.F(g.c, 0.18, 0.7)
    R(x, -48, -28, 92, 52, 8); g.F(g.c, 0.3)
    C(x, -2, -2, 15); g.S(g.c, 0.6)
    label(x, '$', -2, 0, { size: 28, weight: 900, color: g.c, shadow: false })
    for (const [a, b] of [[-38, -18], [34, 14]]) { C(x, a, b, 3); g.D(g.c, 0.9) }
  }],
  dumbbell: [BLUE, (x, g) => {
    x.rotate(-0.2 + Math.sin(g.t * 3) * 0.08)
    M(x, [[-30, 0], [30, 0]]); g.S(BONE, 1.1)
    for (const d of [-1, 1]) { R(x, d * 36 - 6, -24, 12, 48, 4); g.F(g.c, 0.4, 0.9); R(x, d * 26 - 4, -16, 8, 32, 3); g.F(g.c, 0.4, 0.8) }
  }],
  game: [VIOLET, (x, g) => {
    x.beginPath(); x.moveTo(-26, -20); x.lineTo(26, -20); x.bezierCurveTo(44, -20, 50, 0, 48, 16); x.bezierCurveTo(46, 32, 32, 34, 24, 22); x.lineTo(16, 12); x.lineTo(-16, 12); x.lineTo(-24, 22); x.bezierCurveTo(-32, 34, -46, 32, -48, 16); x.bezierCurveTo(-50, 0, -44, -20, -26, -20); x.closePath(); g.F(g.c, 0.3)
    M(x, [[-30, -6], [-30, 10]], [[-38, 2], [-22, 2]]); g.S(BONE, 0.7)
    const b = Math.sin(g.t * 5) > 0; C(x, 26, -4, 5); g.D(b ? PINK : BONE, 1); C(x, 36, 6, 5); g.D(b ? BONE : GOLD, 1)
  }],
  popcorn: [RED, (x, g) => {
    const r = rng(4)
    for (let i = 0; i < 9; i++) { const a = -30 + (i % 5) * 15 + (i > 4 ? 7 : 0), b = (i > 4 ? -30 : -16) + Math.sin(g.t * 6 + i) * (i === 4 ? 2 : 0); C(x, a, b, 11 + r() * 3); g.F('#fff3d6', 0.45, 0.6) }
    P(x, [[-34, -12], [34, -12], [24, 44], [-24, 44]]); g.F(g.c, 0.2)
    M(x, [[-17, -12], [-12, 44]], [[0, -12], [0, 44]], [[17, -12], [12, 44]]); g.S(BONE, 0.7)
  }],
  ticket: [GOLD, (x, g) => {
    x.rotate(-0.18 + Math.sin(g.t * 1.6) * 0.04)
    x.beginPath(); x.moveTo(-46, -24); x.lineTo(46, -24); x.lineTo(46, -8); x.arc(46, 0, 8, -PI / 2, PI / 2, true); x.lineTo(46, 24); x.lineTo(-46, 24); x.lineTo(-46, 8); x.arc(-46, 0, 8, PI / 2, -PI / 2, true); x.closePath(); g.F(g.c, 0.3)
    x.save(); x.setLineDash([5, 7]); M(x, [[20, -18], [20, 18]]); g.S(g.c, 0.5); x.restore()
    starPath(x, -10, 0, 13, 6); g.F(g.c, 0.6, 0.6)
  }],
  compass: [BLUE, (x, g) => {
    C(x, 0, 0, 42); g.F(g.c, 0.15)
    for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU; M(x, [[Math.cos(a) * 32, Math.sin(a) * 32], [Math.cos(a) * 40, Math.sin(a) * 40]]); g.S(g.c, 0.6) }
    x.rotate(0.5 + Math.sin(g.t * 2.4) * 0.3 * Math.sin(g.t * 0.7))
    P(x, [[0, -30], [9, 0], [-9, 0]]); g.F(RED, 0.6, 0.7); P(x, [[0, 30], [9, 0], [-9, 0]]); g.F(BONE, 0.4, 0.7)
    C(x, 0, 0, 4); g.D(BONE, 1)
  }],
  telescope: [VIOLET, (x, g) => {
    M(x, [[0, 8], [-22, 46]], [[0, 8], [22, 46]], [[0, 8], [0, 46]]); g.S(BONE, 0.7)
    x.save(); x.rotate(-0.5); R(x, -34, -10, 62, 22, 6); g.F(g.c, 0.32); R(x, 28, -14, 14, 30, 4); g.F(g.c, 0.4, 0.8); R(x, -44, -6, 10, 14, 3); g.F(g.c, 0.4, 0.7); x.restore()
    x.save(); x.globalAlpha *= 0.5 + 0.5 * Math.sin(g.t * 3); drawPixelStar(x, 40, -42, 16, 0, GOLD); x.restore()
  }],
  rocket: [BONE, (x, g) => {
    x.translate(0, Math.sin(g.t * 6) * 2); x.rotate(0.5)
    x.save(); x.translate(0, 30); x.scale(0.3, 0.42 * (1 + 0.2 * Math.sin(g.t * 17))); x.rotate(PI); flame(x); g.F(ORANGE, 0.6, 2.6); x.restore()
    P(x, [[-14, 0], [-28, 22], [-14, 18]]); g.F(PINK, 0.5, 0.8); P(x, [[14, 0], [28, 22], [14, 18]]); g.F(PINK, 0.5, 0.8)
    x.beginPath(); x.moveTo(0, -48); x.bezierCurveTo(20, -32, 20, -6, 14, 20); x.lineTo(-14, 20); x.bezierCurveTo(-20, -6, -20, -32, 0, -48); x.closePath(); g.F(g.c, 0.26)
    C(x, 0, -14, 7); g.F(BLUE, 0.5, 0.7)
  }],
  crown: [GOLD, (x, g) => {
    x.translate(0, 4); x.rotate(Math.sin(g.t * 2) * 0.05)
    P(x, [[-40, 26], [-44, -22], [-20, 2], [0, -32], [20, 2], [44, -22], [40, 26]]); g.F(g.c, 0.36)
    M(x, [[-40, 14], [40, 14]]); g.S(g.c, 0.5)
    for (const [a, b] of [[-44, -26], [0, -36], [44, -26]]) { C(x, a, b, 5); g.F(PINK, 0.8, 0.5) }
  }],
  'flag-red': [RED, (x, g) => flagIcon(x, g)],
  'flag-green': [GREEN, (x, g) => flagIcon(x, g)],
  check: [GREEN, (x, g) => { C(x, 0, 0, 42); g.F(g.c, 0.2); P(x, [[-20, 0], [-6, 15], [22, -15]], false); g.S(g.c, 1.4) }],
  cross: [RED, (x, g) => { C(x, 0, 0, 42); g.F(g.c, 0.2); M(x, [[-16, -16], [16, 16]], [[16, -16], [-16, 16]]); g.S(g.c, 1.4) }],
  question: [GOLD, (x, g) => {
    x.rotate(Math.sin(g.t * 3) * 0.08); C(x, 0, 0, 42); g.F(g.c, 0.18)
    x.beginPath(); x.arc(0, -10, 14, PI * 1.05, PI * 2.25); x.quadraticCurveTo(0, 0, 0, 10); g.S(g.c, 1.3)
    C(x, 0, 25, 5); g.D(g.c, 1)
  }],
  hourglass: [GOLD, (x, g) => {
    const ph = (g.t * 0.25) % 1
    x.save(); x.rotate(ph > 0.92 ? PI * ease.inOutCubic((ph - 0.92) / 0.08) : 0)
    M(x, [[-30, -44], [30, -44]], [[-30, 44], [30, 44]]); g.S(g.c, 1.1)
    P(x, [[-24, -38], [24, -38], [4, 0], [24, 38], [-24, 38], [-4, 0]]); g.F(BLUE, 0.12, 0.8)
    const q = Math.min(1, ph / 0.9), top = 1 - q
    P(x, [[-20 * top, -4 - 26 * top], [20 * top, -4 - 26 * top], [0, -4]]); g.D(g.c, 0.85)
    P(x, [[-22, 36], [22, 36], [0, 36 - 26 * q]]); g.D(g.c, 0.85)
    if (q < 1) { M(x, [[0, -2], [0, 34]]); g.S(g.c, 0.3) }
    x.restore()
  }],
  battery: [GREEN, (x, g) => {
    const lv = 1 - ((g.t * 0.22) % 1), col = lv > 0.55 ? GREEN : lv > 0.28 ? GOLD : RED
    R(x, -42, -20, 76, 40, 8); g.F(BONE, 0.08); R(x, -42, -20, 76, 40, 8); g.S(BONE, 0.9)
    R(x, 36, -8, 8, 16, 3); g.F(BONE, 0.5, 0.7)
    if (lv > 0.28 || Math.sin(g.t * 10) > 0) { R(x, -35, -13, Math.max(4, 62 * lv), 26, 4); g.F(col, 0.75, 0.5) }
  }],
  wifi: [BLUE, (x, g) => {
    x.translate(0, 18); const on = Math.floor(g.t * 2.5) % 4
    C(x, 0, 14, 6); g.D(g.c, 1)
    for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha *= i < on ? 1 : 0.3; x.beginPath(); x.arc(0, 14, 20 + i * 16, PI * 1.25, PI * 1.75); g.S(g.c, 1.1); x.restore() }
  }],
  megaphone: [PINK, (x, g) => {
    x.rotate(-0.15)
    P(x, [[-26, -10], [26, -32], [26, 32], [-26, 10]]); g.F(g.c, 0.3)
    R(x, -40, -12, 14, 24, 4); g.F(g.c, 0.4, 0.8); M(x, [[-14, 10], [-8, 30]]); g.S(g.c, 0.9)
    for (let i = 0; i < 2; i++) { const o = (g.t * 1.4 + i * 0.5) % 1; x.save(); x.globalAlpha *= 1 - o; x.beginPath(); x.arc(28, 0, 12 + o * 22, -0.6, 0.6); g.S(g.c, 0.7); x.restore() }
  }],
  brain: ['#ff9cc2', (x, g) => {
    x.scale(1 + 0.02 * Math.sin(g.t * 3), 1)
    x.beginPath(); for (let i = 0; i <= 72; i++) { const a = (i / 72) * TAU, r = 1 + 0.07 * Math.sin(a * 9); const px = 46 * r * Math.cos(a), py = -2 + 37 * r * Math.sin(a); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.closePath(); g.F(g.c, 0.3)
    x.beginPath(); x.moveTo(0, -36); x.bezierCurveTo(8, -24, -8, -14, 0, -2); x.bezierCurveTo(8, 10, -8, 22, 0, 34); g.S(g.c, 0.6)
    for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 14, -20); x.quadraticCurveTo(d * 30, -24, d * 30, -8); x.moveTo(d * 12, 8); x.quadraticCurveTo(d * 28, 4, d * 32, 18); g.S(g.c, 0.5) }
  }],
  door: [GOLD, (x, g) => {
    R(x, -28, -46, 56, 92, 4); g.F(g.c, 0.42); R(x, -28, -46, 56, 92, 4); g.S(g.c)
    const o = 0.55 + 0.1 * Math.sin(g.t * 1.5)
    P(x, [[-28, -46], [-28 + 50 * o, -38], [-28 + 50 * o, 52], [-28, 46]]); g.F(VIOLET, 0.9, 0.9)
    C(x, -28 + 44 * o, 6, 4); g.D(GOLD, 1)
  }],
  suitcase: [ORANGE, (x, g) => {
    x.beginPath(); x.moveTo(-12, -24); x.lineTo(-12, -36); x.lineTo(12, -36); x.lineTo(12, -24); g.S(g.c, 0.9)
    R(x, -34, -24, 68, 64, 10); g.F(g.c, 0.3)
    M(x, [[-16, -24], [-16, 40]], [[16, -24], [16, 40]]); g.S(g.c, 0.5)
    for (const a of [-22, 22]) { C(x, a, 46, 4); g.D(BONE, 1) }
    starPath(x, 0, 6, 8, 3.5); g.F(GOLD, 0.8, 0.4)
  }],
  icecream: [PINK, (x, g) => {
    P(x, [[-22, 0], [22, 0], [0, 48]]); g.F(EARTH, 0.32)
    M(x, [[-12, 8], [6, 30]], [[2, 4], [12, 18]], [[12, 6], [-6, 30]], [[-2, 4], [-12, 18]]); g.S(EARTH, 0.4)
    x.beginPath(); x.moveTo(-26, 2); x.arc(0, -14, 26, PI * 0.82, PI * 0.18); x.quadraticCurveTo(26, 6, 20, 4); x.quadraticCurveTo(14, 14, 8, 4); x.closePath(); g.F(g.c, 0.4)
    C(x, 4, -42 + Math.sin(g.t * 4) * 1.5, 6); g.F(RED, 0.7, 0.6)
  }],
  hat: [EARTH, (x, g) => {
    x.rotate(Math.sin(g.t * 2) * 0.05); x.translate(0, 6)
    x.beginPath(); x.moveTo(-24, 4); x.bezierCurveTo(-26, -30, -14, -36, -6, -26); x.quadraticCurveTo(0, -32, 6, -26); x.bezierCurveTo(14, -36, 26, -30, 24, 4); x.closePath(); g.F(g.c, 0.34)
    x.beginPath(); x.moveTo(-50, -6); x.quadraticCurveTo(-42, 16, 0, 16); x.quadraticCurveTo(42, 16, 50, -6); x.quadraticCurveTo(36, 6, 0, 6); x.quadraticCurveTo(-36, 6, -50, -6); x.closePath(); g.F(g.c, 0.4)
    M(x, [[-23, -4], [23, -4]]); g.S(PINK, 0.7)
  }],
  boots: ['#d9a066', (x, g) => {
    x.translate(-4, 0)
    x.beginPath(); x.moveTo(-18, -46); x.lineTo(14, -46); x.lineTo(12, 10); x.bezierCurveTo(30, 10, 48, 18, 48, 32); x.lineTo(48, 38); x.lineTo(-4, 38); x.lineTo(-6, 32); x.lineTo(-18, 32); x.closePath(); g.F(g.c, 0.32)
    R(x, -18, 32, 14, 14, 2); g.F(g.c, 0.5, 0.8)
    x.beginPath(); x.moveTo(-8, -30); x.quadraticCurveTo(6, -24, -2, -14); x.quadraticCurveTo(-10, -4, 4, 2); g.S(GOLD, 0.5)
    M(x, [[-18, -38], [14, -38]]); g.S(g.c, 0.5)
  }],
  'taco-truck': [PINK, (x, g) => {
    x.translate(0, Math.abs(Math.sin(g.t * 6)) * -1)
    R(x, -48, -32, 70, 56, 6); g.F(g.c, 0.26)
    x.beginPath(); x.moveTo(22, -14); x.lineTo(38, -14); x.lineTo(48, 4); x.lineTo(48, 24); x.lineTo(22, 24); x.closePath(); g.F(g.c, 0.3)
    P(x, [[26, -9], [36, -9], [43, 4], [26, 4]]); g.F(BLUE, 0.4, 0.5)
    R(x, -40, -22, 50, 22, 3); g.F(GOLD, 0.45 + 0.15 * Math.sin(g.t * 3), 0.7)
    for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-35 + i * 10, -22, 5, 0, PI); g.F(i % 2 ? BONE : GOLD, 0.6, 0.5) }
    for (const a of [-30, 32]) { C(x, a, 26, 9); g.F(BONE, 0.5, 0.8) }
  }],
  bus: [GOLD, (x, g) => {
    x.translate(0, Math.abs(Math.sin(g.t * 5)) * -1.5)
    R(x, -46, -30, 92, 56, 10); g.F(g.c, 0.26)
    for (let i = 0; i < 4; i++) { R(x, -38 + i * 20, -22, 14, 16, 3); g.F(BLUE, 0.4, 0.5) }
    M(x, [[-46, 4], [46, 4]]); g.S(g.c, 0.5)
    for (const a of [-26, 26]) { C(x, a, 28, 9); g.F(BONE, 0.5, 0.8) }
  }],
  bike: [GREEN, (x, g) => {
    for (const wx of [-26, 26]) { C(x, wx, 16, 18); g.S(g.c, 0.9); x.save(); x.translate(wx, 16); x.rotate(g.t * 3); M(x, [[-16, 0], [16, 0]], [[0, -16], [0, 16]]); g.S(g.c, 0.3); x.restore() }
    M(x, [[-26, 16], [-6, 16], [14, -12], [-14, -12], [-26, 16]], [[-6, 16], [-16, -20]], [[14, -12], [26, 16]], [[14, -12], [10, -26], [20, -28]]); g.S(BONE, 0.85)
    M(x, [[-24, -22], [-10, -22]]); g.S(BONE, 1.2)
  }],
  sneaker: [BLUE, (x, g) => {
    x.rotate(Math.sin(g.t * 3) * 0.04)
    x.beginPath(); x.moveTo(-46, 28); x.lineTo(-46, -6); x.quadraticCurveTo(-42, -20, -28, -20); x.lineTo(-14, -20); x.quadraticCurveTo(-8, -6, 6, -4); x.lineTo(30, 4); x.quadraticCurveTo(46, 8, 46, 22); x.lineTo(46, 28); x.closePath(); g.F(g.c, 0.3)
    R(x, -48, 20, 96, 12, 5); g.F(BONE, 0.45, 0.8)
    M(x, [[-10, -12], [-2, -4]], [[-4, -14], [4, -6]], [[-30, 4], [20, 14]]); g.S(BONE, 0.5)
  }],
  paint: [EARTH, (x, g) => {
    x.beginPath(); x.moveTo(0, -36); x.bezierCurveTo(34, -36, 50, -12, 46, 10); x.bezierCurveTo(42, 32, 22, 26, 14, 30); x.bezierCurveTo(6, 34, 8, 42, -2, 42); x.bezierCurveTo(-30, 42, -48, 22, -46, 0); x.bezierCurveTo(-44, -22, -26, -36, 0, -36); x.closePath(); g.F(g.c, 0.26)
    C(x, 18, 10, 7); g.D(DARK, 1); C(x, 18, 10, 7); g.S(g.c, 0.5)
    const cols = [PINK, BLUE, GREEN, GOLD]; [[-24, -4], [-14, -22], [6, -24], [26, -12]].forEach(([a, b], i) => { C(x, a, b, 7 + Math.sin(g.t * 3 + i) * 0.8); g.F(cols[i], 0.85, 0.5) })
  }],
  mask: [VIOLET, (x, g) => {
    x.rotate(Math.sin(g.t * 1.6) * 0.06)
    x.beginPath(); x.moveTo(-46, -12); x.quadraticCurveTo(-24, -24, 0, -12); x.quadraticCurveTo(24, -24, 46, -12); x.quadraticCurveTo(48, 12, 30, 18); x.quadraticCurveTo(12, 22, 0, 8); x.quadraticCurveTo(-12, 22, -30, 18); x.quadraticCurveTo(-48, 12, -46, -12); x.closePath(); g.F(g.c, 0.38)
    E(x, -20, -2, 10, 6, 0.15); g.D(DARK, 1); E(x, 20, -2, 10, 6, -0.15); g.D(DARK, 1)
    x.beginPath(); x.moveTo(40, -14); x.quadraticCurveTo(44, -40, 30, -48); g.S(PINK, 0.8)
  }],
  balloon: [PINK, (x, g) => {
    x.rotate(Math.sin(g.t * 1.6) * 0.07); x.translate(0, Math.sin(g.t * 2) * 2)
    x.beginPath(); x.moveTo(0, 26); x.bezierCurveTo(-6, 34, 6, 40, -2, 48); g.S(BONE, 0.5)
    E(x, 0, -14, 28, 34); g.F(g.c, 0.36); P(x, [[0, 20], [-6, 28], [6, 28]]); g.F(g.c, 0.5, 0.6)
    x.beginPath(); x.arc(-4, -18, 18, PI * 1.05, PI * 1.4); g.S(BONE, 0.5)
  }],
  candle: [GOLD, (x, g) => {
    const f = 1 + 0.08 * Math.sin(g.t * 11) + 0.05 * Math.sin(g.t * 17)
    x.save(); const gr = x.createRadialGradient(0, -24, 0, 0, -24, 40); gr.addColorStop(0, rgba(GOLD, 0.35)); gr.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gr; x.fillRect(-50, -64, 100, 80); x.restore()
    R(x, -13, -4, 26, 48, 4); g.F(BONE, 0.3)
    x.beginPath(); x.moveTo(-13, 4); x.quadraticCurveTo(-8, 12, -4, 4); g.S(BONE, 0.5)
    M(x, [[0, -4], [0, -12]]); g.S(BONE, 0.5)
    x.save(); x.translate(0, -26); x.scale(0.26 * f, 0.36 * f); flame(x); g.F(g.c, 0.6, 2.4); x.restore()
  }],
  letter: [BONE, (x, g) => {
    x.rotate(-0.08 + Math.sin(g.t * 1.5) * 0.04)
    R(x, -44, -28, 88, 58, 6); g.F(g.c, 0.18)
    M(x, [[-42, -24], [0, 6], [42, -24]], [[-42, 28], [-12, -2]], [[42, 28], [12, -2]]); g.S(g.c, 0.6)
    heartPath(x, 0, 6, 12); g.F(PINK, 0.8, 0.6)
  }],
  hand: [GOLD, (x, g) => {
    x.translate(0, 8); x.rotate(Math.sin(g.t * 6) * 0.15)
    x.beginPath(); x.moveTo(-22, 0); x.lineTo(-22, -28); x.arc(-15, -28, 7, PI, 0); x.lineTo(-8, -36); x.arc(-1, -36, 7, PI, 0); x.lineTo(6, -32); x.arc(13, -32, 7, PI, 0); x.lineTo(20, -22); x.arc(27, -22, 7, PI, 0); x.lineTo(34, 8)
    x.bezierCurveTo(34, 30, 20, 40, 4, 40); x.bezierCurveTo(-14, 40, -22, 30, -30, 18); x.lineTo(-40, 2); x.quadraticCurveTo(-42, -6, -34, -6); x.lineTo(-22, 6); x.closePath(); g.F(g.c, 0.3)
    M(x, [[-8, -22], [-8, -4]], [[6, -22], [6, -4]], [[20, -14], [20, 0]]); g.S(g.c, 0.4)
  }],
  puzzle: [TEAL, (x, g) => {
    x.rotate(-0.1 + Math.sin(g.t * 1.8) * 0.06); x.scale(1.15, 1.15)
    x.beginPath(); x.moveTo(-32, -30); x.lineTo(-8, -30); x.arc(0, -36, 10, PI * 0.75, PI * 0.25); x.lineTo(30, -30); x.lineTo(30, -8); x.arc(36, 0, 10, PI * 1.25, PI * 0.75); x.lineTo(30, 30); x.lineTo(-32, 30); x.lineTo(-32, 8); x.arc(-26, 0, 10, PI * 0.75, PI * 1.25, true); x.closePath(); g.F(g.c, 0.32)
  }],
  anchor: [BLUE, (x, g) => {
    x.rotate(Math.sin(g.t * 1.4) * 0.07)
    C(x, 0, -38, 8); g.S(g.c)
    M(x, [[0, -30], [0, 42]], [[-18, -16], [18, -16]]); g.S(g.c)
    x.beginPath(); x.arc(0, 8, 34, PI * 0.12, PI * 0.88); g.S(g.c)
    P(x, [[-38, 6], [-30, 24], [-22, 12]]); g.F(g.c, 0.5, 0.8); P(x, [[38, 6], [30, 24], [22, 12]]); g.F(g.c, 0.5, 0.8)
  }],
  shell: ['#ffb08a', (x, g) => {
    x.translate(0, 6)
    R(x, -12, 30, 24, 12, 4); g.F(g.c, 0.4, 0.8)
    x.beginPath(); x.moveTo(-10, 32); x.lineTo(-44, -2)
    const n = 5; for (let i = 0; i < n; i++) { const a0 = PI + 0.2 + (i / n) * (PI - 0.4), a1 = PI + 0.2 + ((i + 1) / n) * (PI - 0.4), am = (a0 + a1) / 2; x.quadraticCurveTo(Math.cos(am) * 58, 32 + Math.sin(am) * 76 - 4, Math.cos(a1) * 46, 32 + Math.sin(a1) * 64) }
    x.lineTo(10, 32); x.closePath(); g.F(g.c, 0.32)
    for (let i = 1; i < n; i++) { const a = PI + 0.2 + (i / n) * (PI - 0.4); M(x, [[0, 30], [Math.cos(a) * 44, 32 + Math.sin(a) * 60]]); g.S(g.c, 0.45) }
  }],
}
const ALIAS = { 'heart-broken': 'broken-heart', broken: 'broken-heart', text: 'chat', message: 'chat', messages: 'chat', x: 'cross', no: 'cross', yes: 'check', tick: 'check', flag: 'flag-red', 'red-flag': 'flag-red', 'green-flag': 'flag-green', bulb: 'lightbulb', idea: 'lightbulb', search: 'magnifier', photo: 'camera', home: 'house', cash: 'money', gym: 'dumbbell', truck: 'taco-truck', shoe: 'sneaker', envelope: 'letter', mail: 'letter', boot: 'boots', alarm: 'clock', time: 'clock', snowflake: 'snow', lightning: 'bolt', flame: 'fire', ocean: 'wave', palette: 'paint' }
export const ICON_NAMES = Object.keys(ICONS)

function flagIcon(x, g) {
  M(x, [[-30, -46], [-30, 48]]); g.S(BONE, 1)
  C(x, -30, -48, 4); g.D(BONE, 1)
  x.beginPath(); x.moveTo(-30, -42)
  for (let i = 0; i <= 10; i++) { const u = i / 10; x.lineTo(-30 + u * 72, -42 + Math.sin(u * 5 - g.t * 6) * 6 * u) }
  for (let i = 10; i >= 0; i--) { const u = i / 10; x.lineTo(-30 + u * 72, -4 + Math.sin(u * 5 - g.t * 6) * 6 * u) }
  x.closePath(); g.F(g.c, 0.45)
}

/** draw a named icon as bold neon line art, centred at cx, cy, about `size` px across. col: a colour word or hex
 *  (default: the icon's own colour). t: the clock, for idle motion. Unknown names draw a star. */
function icon(x, name, cx, cy, size, col = null, t = 0, { alpha = 1, glow = null } = {}) {
  if (size <= 0 || alpha <= 0) return
  const key = ICONS[name] ? name : ALIAS[String(name || '').toLowerCase()] || String(name || '').toLowerCase()
  const D = ICONS[key] || ICONS.star
  const k = size / 100, W = clamp(size * 0.05, 5, 9) / k, gl = glow ?? clamp(size * 0.12, 8, 24)
  const c = col ? color(col, D[0]) : D[0]
  const g = {
    c, t, lw: W,
    F: (cc = c, fa = 0.3, wm = 1) => ink(x, cc, { w: W * wm, fa, glow: gl }),
    S: (cc = c, wm = 1) => ink(x, cc, { w: W * wm, fa: 0, glow: gl * 0.8 }),
    D: (cc = c, a = 1) => { x.save(); x.globalAlpha *= a; x.fillStyle = cc; x.shadowBlur = 0; x.fill(); x.restore() },
  }
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(k, k)
  D[1](x, g)
  x.restore()
}

// ───────────────────────── shared bits
/** when item i of n lands; items already shown by a chained previous beat land instantly */
function arrivals(p, prev, key, n, dur, from, to) {
  const prevN = prev && prev.k === p.k ? (prev[key] || []).length : 0, m = Math.max(1, n - prevN)
  return i => i < prevN ? -9 : stagger(i - prevN, m, dur, from, to)
}
const at01 = (s, f, d) => (f ?? d) * s.dur
/** a check mark drawn progressively (k 0–1) */
function checkMark(x, cx, cy, sz, col, k) {
  if (k <= 0) return
  const pts = [[-0.42, 0.02], [-0.12, 0.32], [0.46, -0.36]].map(([a, b]) => [cx + a * sz, cy + b * sz])
  const L1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), L2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]), d = (L1 + L2) * clamp(k)
  x.beginPath(); x.moveTo(...pts[0])
  if (d <= L1) x.lineTo(lerp(pts[0][0], pts[1][0], d / L1), lerp(pts[0][1], pts[1][1], d / L1))
  else { x.lineTo(...pts[1]); const u = (d - L1) / L2; x.lineTo(lerp(pts[1][0], pts[2][0], u), lerp(pts[1][1], pts[2][1], u)) }
  line(x, col, Math.max(8, sz * 0.14), 22)
}
function crossMark(x, cx, cy, sz, col, k) {
  if (k <= 0) return
  const a = clamp(k * 2), b = clamp(k * 2 - 1), h = sz * 0.36
  x.beginPath(); x.moveTo(cx - h, cy - h); x.lineTo(cx - h + 2 * h * a, cy - h + 2 * h * a)
  if (b > 0) { x.moveTo(cx + h, cy - h); x.lineTo(cx + h - 2 * h * b, cy - h + 2 * h * b) }
  line(x, col, Math.max(8, sz * 0.14), 22)
}
function fitFont(x, text, size, maxW, opts) { x.font = font(size, opts); const w = x.measureText(text).width; return w > maxW ? size * maxW / w : size }
const popScale = (x, px, py, k) => { x.translate(px, py); x.scale(k, k); x.translate(-px, -py) }

// ───────────────────────── fact: a big number / word card
function splitNum(big) {
  const m = String(big).match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!m) return null
  const raw = m[2], dec = (raw.split('.')[1] || '').length, n = parseFloat(raw.replace(/,/g, ''))
  return { pre: m[1], n, dec, commas: raw.includes(','), post: m[3] }
}
function fmtNum(v, N) { let s = v.toFixed(N.dec); if (N.commas) { const [a, b] = s.split('.'); s = a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b ? '.' + b : '') } return N.pre + s + N.post }
const fact = {
  min: p => 2.4 + (p.note ? 0.6 : 0),
  draw(x, p, s) {
    const col = color(p.col, GOLD)
    const w = Math.min(900, s.w), h = Math.min(s.h - 40, p.note ? 820 : 680)
    const x0 = s.cx - w / 2, y0 = s.cy - h / 2 + 20
    panel(x, x0, y0, w, h, { col, r: 48 })
    twinkles(x, s.cx, s.cy, s.t, { n: 7, R: w * 0.62, seed: 31, size: 24 })
    const tag = p.tag === false ? '' : String(p.tag ?? 'FUN FACT').toUpperCase()
    if (tag) pill(x, tag, s.cx, y0, { size: 36, family: 'mono', weight: 700, col, fg: col, glow: 16, bg: '#140a2e' })
    const N = p.count === false ? null : splitNum(p.big ?? '')
    const q = ease.outCubic(prog(s.lt, 0.15, 1.15))
    const text = N ? fmtNum(N.n * q, N) : String(p.big ?? '')
    const full = String(p.big ?? '')
    const bigY = y0 + h * (p.note ? 0.34 : 0.42) + (p.unit ? 0 : 30)
    const sz = fitFont(x, full, 300, w - 120, { weight: 900 })
    const k = pop01(s.lt, 0.12, 0.45, 2.2) * (1 + 0.04 * wob(s.lt, 1.15, 18, 5))
    x.save(); popScale(x, s.cx, bigY, k)
    label(x, text, s.cx, bigY, { size: sz, weight: 900, color: col, glow: 34 })
    x.restore()
    if (p.unit) { const ku = pop01(s.lt, 0.7, 0.4, 2.4); x.save(); popScale(x, s.cx, bigY + sz * 0.62, ku); label(x, p.unit, s.cx, bigY + sz * 0.62, { size: 88, weight: 500, family: 'serif', italic: true, color: BONE, maxW: w - 120, alpha: clamp(ku * 2) }); x.restore() }
    if (p.note) { const kn = clamp((s.lt - 1.0) / 0.4); x.save(); x.translate(0, (1 - ease.outCubic(kn)) * 30); para(x, p.note, s.cx, y0 + h * 0.8, { size: 44, weight: 700, color: BONE, maxW: w - 140, alpha: kn }); x.restore() }
    if (p.icon) { const ki = pop01(s.lt, 0.9, 0.4, 2.6); icon(x, p.icon, x0 + w - 70, y0 + 80, 150 * ki, null, s.t) }
    sparkle(x, s.cx, bigY, s.lt, 1.15, { n: 12, R: 300, seed: 17 })
  },
  cues(p, t0) {
    const c = [['pop', t0 + 0.12, 660, 0.05, 0]]
    if (splitNum(p.big ?? '') && p.count !== false) for (let i = 0; i < 8; i++) c.push(['tick', t0 + 0.2 + i * 0.11, 0.035])
    c.push(['bell', t0 + 1.15, 1318, 0.05, 1.8, 0])
    if (p.unit) c.push(['pop', t0 + 0.7, 988, 0.04, 0])
    if (p.icon) c.push(['pop', t0 + 0.9, 1175, 0.04, 0.3])
    return c
  },
}

// ───────────────────────── word: etymology, the word splits into its parts
const word = {
  min: p => 1.6 + (p.parts || []).length * 0.6 + (p.means ? 0.6 : 0),
  draw(x, p, s) {
    const parts = p.parts || [], n = parts.length
    const wy = s.cy - s.h * 0.3
    const k = pop01(s.lt, 0.1, 0.4, 2.2)
    const wsz = fitFont(x, p.word || '', 150, s.w - 40, { weight: 900 })
    x.save(); popScale(x, s.cx, wy, k); label(x, p.word || '', s.cx, wy, { size: wsz, weight: 900, color: BONE, glow: 0 }); x.restore()
    // underline sweep coloured by parts
    const at = i => stagger(i, n, s.dur, 0.3, p.means ? 0.6 : 0.72)
    // the parts row
    x.font = font(84, { weight: 500, family: 'serif', italic: true })
    const ws = parts.map(([a, b]) => { x.font = font(84, { weight: 500, family: 'serif', italic: true }); const wa = x.measureText(a).width; x.font = font(40, { weight: 700 }); const wb = x.measureText(`“${b}”`).width; return Math.max(wa, wb) + 70 })
    const plusW = 70, total = ws.reduce((a, b) => a + b, 0) + plusW * Math.max(0, n - 1)
    const sc = Math.min(1, (s.w - 20) / total)
    const py = s.cy + (p.means ? -10 : 40)
    let cx0 = s.cx - total * sc / 2
    x.save(); x.translate(s.cx, py); x.scale(sc, sc); x.translate(-s.cx, -py)
    let px = s.cx - total / 2
    parts.forEach(([a, b], i) => {
      const kc = pop01(s.lt, at(i), 0.4, 2.3), col = color((p.cols || [])[i], PAL[i % PAL.length])
      const cx = px + ws[i] / 2
      if (kc > 0) {
        // a thread from the word to the part
        x.save(); x.globalAlpha *= clamp(kc * 2) * 0.8; x.setLineDash([6, 12]); x.lineDashOffset = -s.t * 30
        x.beginPath(); x.moveTo(lerp(s.cx - wsz * 1.2, s.cx + wsz * 1.2, n > 1 ? i / (n - 1) : 0.5) / 1, wy + wsz * 0.55); x.lineTo(cx, py - 110); line(x, col, 5, 10); x.restore()
        x.save(); popScale(x, cx, py, kc); x.rotate(0)
        rr(x, cx - ws[i] / 2 + 6, py - 100, ws[i] - 12, 200, 30); x.fillStyle = 'rgba(16,10,40,0.9)'; x.fill()
        rr(x, cx - ws[i] / 2 + 6, py - 100, ws[i] - 12, 200, 30); ink(x, col, { w: 6, fa: 0.12, glow: 22 })
        label(x, a, cx, py - 28, { size: 84, weight: 500, family: 'serif', italic: true, color: col, glow: 14 })
        label(x, `“${b}”`, cx, py + 52, { size: 40, weight: 700, color: BONE })
        x.restore()
      }
      px += ws[i]
      if (i < n - 1) { const kp = pop01(s.lt, at(i) + 0.2, 0.3, 2.6); label(x, '+', px + plusW / 2, py, { size: 80 * kp, weight: 900, color: MUTED }); px += plusW }
    })
    x.restore()
    if (p.means) {
      const km = pop01(s.lt, at01(s, 0.7), 0.45, 2.3)
      x.save(); popScale(x, s.cx, s.cy + s.h * 0.24, km)
      label(x, `= ${p.means}`, s.cx, s.cy + s.h * 0.24, { size: fitFont(x, `= ${p.means}`, 76, s.w - 60, { weight: 500, family: 'serif', italic: true }), weight: 500, family: 'serif', italic: true, color: color(p.col, GOLD), glow: 18 })
      x.restore()
      sparkle(x, s.cx, s.cy + s.h * 0.24, s.lt, at01(s, 0.7) + 0.2, { n: 10, R: 260, seed: 41 })
    }
    if (p.lang) label(x, p.lang, s.cx, s.cy + s.h / 2 - 30, { size: 36, weight: 700, family: 'mono', color: MUTED, maxW: s.w - 40, alpha: clamp((s.lt - 0.6) / 0.4) })
  },
  cues(p, t0, dur) {
    const n = (p.parts || []).length, c = [['pop', t0 + 0.1, 660, 0.05, 0]]
    for (let i = 0; i < n; i++) c.push(['pluck', t0 + stagger(i, n, dur, 0.3, p.means ? 0.6 : 0.72), [740, 880, 988, 1175][i % 4], 0.05, 0.5, (i - (n - 1) / 2) * 0.3])
    if (p.means) c.push(['bell', t0 + 0.7 * dur + 0.2, 1318, 0.05, 1.8, 0])
    return c
  },
}

// ───────────────────────── versus: split screen
const versus = {
  min: () => 2.8,
  draw(x, p, s) {
    const A = p.a || {}, B = p.b || {}, v = p.verdict || 'vs'
    const gap = 60, pw = (Math.min(s.w, 940) - gap) / 2, ph = Math.min(s.h - 20, 780)
    const vt = at01(s, p.at, 0.55)
    const win = v === 'a' ? 0 : v === 'b' ? 1 : -1, wk = win >= 0 ? ease.outCubic(prog(s.lt, vt, vt + 0.4)) : 0
    ;[A, B].forEach((S, i) => {
      const at = i ? 0.35 : 0.1, k = ease.outBack ? 0 : 0
      const q = prog(s.lt, at, at + 0.45), e = easeOutBack(q, 1.6)
      if (q <= 0) return
      const col = color(S.col, i ? PINK : BLUE)
      const cx = s.cx + (i ? 1 : -1) * (pw / 2 + gap / 2) + (1 - e) * (i ? 1 : -1) * 500
      const cy = s.cy
      const lose = win >= 0 && win !== i, isW = win === i
      x.save(); x.globalAlpha *= clamp(q * 3) * (lose ? lerp(1, 0.45, wk) : 1)
      if (lose) { x.translate(cx, cy); x.rotate((i ? 1 : -1) * 0.05 * wk); x.scale(1 - 0.06 * wk, 1 - 0.06 * wk); x.translate(-cx, -cy) }
      if (isW) { x.translate(cx, cy); x.scale(1 + 0.05 * wk, 1 + 0.05 * wk); x.translate(-cx, -cy) }
      panel(x, cx - pw / 2, cy - ph / 2, pw, ph, { col, r: 40, w: isW ? 8 : 6, glow: isW ? 40 : 22 })
      const iy = cy - ph / 2 + (S.lines ? 170 : 250)
      icon(x, S.icon || (i ? 'heart' : 'star'), cx, iy, Math.min(210, pw * 0.5), S.icon ? S.col || null : col, s.t + i * 1.3)
      const ly = iy + 175
      const lsz = fitFont(x, S.label || '', 60, pw - 50, { weight: 900 })
      label(x, S.label || (i ? 'B' : 'A'), cx, ly, { size: lsz, weight: 900, color: BONE })
      ;(S.lines || []).slice(0, 4).forEach((l, j) => { const kj = clamp((s.lt - at - 0.3 - j * 0.15) / 0.3); label(x, l, cx, ly + 84 + j * 62, { size: 38, weight: 700, color: col, maxW: pw - 50, alpha: kj }) })
      x.restore()
      if (isW && wk > 0) icon(x, 'crown', cx, cy - ph / 2 - 10 - 20 * (1 - wk), 130 * easeOutBack(wk, 2.4), null, s.t)
    })
    // the verdict badge
    const kb = pop01(s.lt, win >= 0 ? 0.55 : vt, 0.4, 2.6)
    if (kb > 0) {
      const txt = v === 'a' || v === 'b' || v === 'vs' ? 'VS' : v, col = v === '=' || v === '≈' ? GREEN : v === '≠' ? RED : GOLD
      x.save(); popScale(x, s.cx, s.cy, kb); x.rotate(Math.sin(s.t * 2) * 0.06)
      C(x, s.cx, s.cy, 74); x.fillStyle = '#140a2e'; x.fill(); C(x, s.cx, s.cy, 74); ink(x, col, { w: 8, fa: 0.2, glow: 30 })
      label(x, txt, s.cx, s.cy + 4, { size: txt.length > 1 ? 58 : 96, weight: 900, color: col, shadow: false })
      x.restore()
    }
    if (win >= 0) sparkle(x, s.cx + (win ? 1 : -1) * (pw / 2 + gap / 2), s.cy - ph / 2, s.lt, vt + 0.1, { n: 12, R: 240, seed: 52 })
  },
  cues(p, t0, dur) {
    const v = p.verdict || 'vs', vt = t0 + (p.at ?? 0.55) * dur
    const c = [['whoosh', t0 + 0.1, 0.35, 0.05], ['whoosh', t0 + 0.35, 0.35, 0.05], ['boom', t0 + (v === 'a' || v === 'b' ? 0.55 : (p.at ?? 0.55) * dur), 0.1]]
    if (v === 'a' || v === 'b') c.push(['bell', vt + 0.1, 1318, 0.05, 2, v === 'a' ? -0.4 : 0.4])
    return c
  },
}

// ───────────────────────── checklist
const markOf = (p, i) => (Array.isArray(p.marks) ? p.marks[i] : typeof p.marks === 'string' ? p.marks : null) || '✓'
const checklist = {
  min: p => 1.2 + (p.items || []).length * 0.55,
  draw(x, p, s, ) {
    const items = p.items || [], n = items.length
    const rowH = Math.min(140, (s.h - (p.title ? 150 : 70)) / Math.max(1, n))
    const w = Math.min(920, s.w), h = Math.min(s.h, (p.title ? 140 : 60) + n * rowH + 30)
    const x0 = s.cx - w / 2, y0 = s.cy - h / 2, col = color(p.col, GOLD)
    panel(x, x0, y0, w, h, { col, r: 40 })
    if (p.title) label(x, p.title.toUpperCase(), s.cx, y0 + 70, { size: 38, weight: 700, family: 'mono', spacing: 0.16, color: col, maxW: w - 80 })
    const arr = arrivals(p, s.prev, 'items', n, s.dur, 0.12, 0.7)
    items.forEach((it, i) => {
      const at = arr(i), k = pop01(s.lt, at, 0.32, 2.2)
      if (k <= 0) return
      const y = y0 + (p.title ? 130 : 45) + rowH * (i + 0.5), bx = x0 + 80, bs = Math.min(70, rowH * 0.6)
      const mk = markOf(p, i), mcol = mk === '✕' ? RED : mk === '?' ? GOLD : GREEN
      const mt = at < 0 ? 9 : prog(s.lt, at + 0.28, at + 0.55)
      x.save(); x.globalAlpha *= clamp(k * 2); x.translate((1 - k) * -40, 0)
      rr(x, bx - bs / 2, y - bs / 2, bs, bs, 14); ink(x, mt >= 1 ? mcol : BONE, { w: 6, fa: mt >= 1 ? 0.18 : 0.06, glow: mt >= 1 ? 20 : 8 })
      const tsz = fitFont(x, it, 50, w - 200, { weight: 800 })
      const dim = mk === '✕' && p.strike !== false && mt >= 1
      label(x, it, bx + bs / 2 + 34, y + 2, { size: tsz, weight: 800, align: 'left', color: dim ? rgba(BONE, 0.55) : BONE })
      if (dim) { x.font = font(tsz, { weight: 800 }); const tw = x.measureText(it).width; const sk = clamp((s.lt - at - 0.55) / 0.25) || (at < 0 ? 1 : 0); x.beginPath(); x.moveTo(bx + bs / 2 + 30, y + 2); x.lineTo(bx + bs / 2 + 34 + (tw + 8) * sk, y + 2); line(x, RED, 6, 12) }
      x.restore()
      if (mk === '✕') crossMark(x, bx, y, bs * 1.25, mcol, mt)
      else if (mk === '?') { if (mt > 0) label(x, '?', bx, y + 2, { size: bs * 1.1 * easeOutBack(clamp(mt), 2.6), weight: 900, color: mcol, glow: 20 }) }
      else checkMark(x, bx + 6, y - 6, bs * 1.3, mcol, mt)
    })
  },
  cues(p, t0, dur, ctx = {}) {
    const items = p.items || [], arr = arrivals(p, ctx.prev, 'items', items.length, dur, 0.12, 0.7), c = []
    items.forEach((_, i) => { const at = arr(i); if (at < 0) return; c.push(['pop', t0 + at, 700 + i * 70, 0.04, 0]); const mk = markOf(p, i); c.push(mk === '✕' ? ['tick', t0 + at + 0.3, 0.08] : ['pluck', t0 + at + 0.3, [880, 988, 1175, 1318][i % 4], 0.05, 0.4, 0]) })
    return c
  },
}

// ───────────────────────── meter: a gauge with a swinging needle
const meter = {
  min: () => 2.4,
  draw(x, p, s) {
    const col = color(p.col, PINK)
    const Rr = Math.min(s.w * 0.4, s.h * 0.5, 380), cx = s.cx, cy = s.cy + Rr * 0.32
    const ticks = p.ticks || [], to = clamp(p.to ?? 0.85), from = clamp(p.from ?? 0)
    // track
    x.save()
    x.beginPath(); x.arc(cx, cy, Rr, PI, TAU); x.lineCap = 'round'; x.lineWidth = 60; x.strokeStyle = 'rgba(16,10,40,0.9)'; x.stroke()
    x.beginPath(); x.arc(cx, cy, Rr + 36, PI, TAU); line(x, rgba(col, 0.5), 3, 6)
    x.beginPath(); x.arc(cx, cy, Rr - 36, PI, TAU); line(x, rgba(col, 0.5), 3, 6)
    x.restore()
    // needle value
    const st = 0.35, q = prog(s.lt, st, st + 1.2)
    let v = lerp(from, to, easeOutBack(q, 1.4)) + 0.02 * wob(s.lt, st + 1.2, 14, 3) + (q >= 1 ? 0.006 * Math.sin(s.t * 9) : 0)
    v = clamp(v, -0.02, 1.04)
    // filled arc in a gradient
    const cols = (p.cols || [BLUE, VIOLET, col]).map(c => color(c))
    const gr = x.createLinearGradient(cx - Rr, 0, cx + Rr, 0); cols.forEach((c, i) => gr.addColorStop(i / Math.max(1, cols.length - 1), c))
    if (v > 0.001) { x.save(); x.beginPath(); x.arc(cx, cy, Rr, PI, PI + PI * clamp(v)); x.lineCap = 'round'; x.lineWidth = 40; x.strokeStyle = gr; x.shadowColor = col; x.shadowBlur = 30; x.stroke(); x.restore() }
    // tick marks + labels
    const nT = Math.max(ticks.length, 5)
    for (let i = 0; i < nT; i++) { const a = PI + PI * (i / (nT - 1)); x.beginPath(); x.moveTo(cx + Math.cos(a) * (Rr - 56), cy + Math.sin(a) * (Rr - 56)); x.lineTo(cx + Math.cos(a) * (Rr - 74), cy + Math.sin(a) * (Rr - 74)); line(x, rgba(BONE, 0.7), 5, 6) }
    ticks.forEach((tk, i) => {
      const f = ticks.length > 1 ? i / (ticks.length - 1) : 0.5, a = PI + PI * f
      const kk = pop01(s.lt, 0.1 + i * 0.1, 0.3, 2.2)
      let lx = cx + Math.cos(a) * (Rr + 80), ly = cy + Math.sin(a) * (Rr + 80)
      if (f < 0.12 || f > 0.88) ly = cy + 70
      x.font = font(38, { weight: 800 }); const tw = x.measureText(tk).width
      lx = clamp(lx, s.cx - s.w / 2 + tw / 2 + 6, s.cx + s.w / 2 - tw / 2 - 6)
      const lit = Math.abs(v - f) < 0.5 / Math.max(1, ticks.length - 1) && q > 0.5
      x.save(); popScale(x, lx, ly, kk)
      label(x, tk, lx, ly, { size: 38, weight: 800, color: lit ? col : MUTED, glow: lit ? 18 : 0 })
      x.restore()
    })
    // needle
    const na = PI + PI * v
    x.save(); x.translate(cx, cy); x.rotate(na)
    x.beginPath(); x.moveTo(-26, -12); x.lineTo(Rr - 30, 0); x.lineTo(-26, 12); x.closePath(); ink(x, BONE, { w: 6, fa: 0.9, glow: 20 })
    x.restore()
    C(x, cx, cy, 30); ink(x, col, { w: 7, fa: 0.8, glow: 24 })
    if (p.value) { const kv = pop01(s.lt, st + 1.2, 0.4, 2.6); x.save(); popScale(x, cx, cy - Rr * 0.38, kv); label(x, p.value, cx, cy - Rr * 0.38, { size: fitFont(x, p.value, 110, Rr * 1.2, { weight: 900 }), weight: 900, color: col, glow: 26 }); x.restore() }
    if (p.label) label(x, p.label, cx, cy + (ticks.length ? 160 : 100), { size: fitFont(x, p.label, 56, s.w - 40, { weight: 900 }), weight: 900, color: BONE, alpha: clamp((s.lt - 0.2) / 0.3) })
    if (to > 0.9) sparkle(x, cx + Math.cos(PI + PI * to) * Rr, cy + Math.sin(PI + PI * to) * Rr, s.lt, st + 1.0, { n: 12, R: 200, seed: 61 })
  },
  cues(p, t0) { const c = [['riser', t0 + 0.35, t0 + 1.3, 0.04], ['boom', t0 + 1.4, 0.08]]; for (let i = 0; i < 6; i++) c.push(['tick', t0 + 0.4 + i * 0.16, 0.03]); if ((p.to ?? 0.85) > 0.9) c.push(['bell', t0 + 1.4, 1318, 0.05, 1.8, 0.3]); return c },
}

// ───────────────────────── flags: waving red / green flags with their labels
const flags = {
  min: p => 1.2 + ((p.red || []).length + (p.green || []).length) * 0.5,
  draw(x, p, s) {
    const items = [...(p.red || []).map(t => ['flag-red', t, RED]), ...(p.green || []).map(t => ['flag-green', t, GREEN])]
    const n = items.length, rowH = Math.min(190, s.h / Math.max(1, n))
    const fs = Math.min(150, rowH * 0.85)
    x.font = font(50, { weight: 800 })
    const maxT = Math.max(0, ...items.map(([, t]) => x.measureText(t).width))
    const tsz = Math.min(50, 50 * (s.w - fs - 60) / Math.max(1, maxT))
    const blockW = fs + 30 + Math.min(maxT * tsz / 50, s.w - fs - 60), left = s.cx - blockW / 2
    const split = (p.red || []).length && (p.green || []).length ? 30 : 0
    items.forEach(([nm, t, col], i) => {
      const at = stagger(i, n, s.dur, 0.12, 0.66), k = prog(s.lt, at, at + 0.4)
      if (k <= 0) return
      const y = s.cy + (i - (n - 1) / 2) * rowH + (i >= (p.red || []).length ? split / 2 : -split / 2)
      const drop = (1 - easeOutBack(k, 2.2)) * -120
      x.save(); x.globalAlpha *= clamp(k * 3)
      icon(x, nm, left + fs / 2, y + drop, fs, null, s.t + i * 0.7)
      x.restore()
      const kt = clamp((s.lt - at - 0.15) / 0.3)
      x.save(); x.translate((1 - ease.outCubic(kt)) * 40, 0)
      label(x, t, left + fs + 30, y + 4, { size: tsz, weight: 800, align: 'left', color: BONE, alpha: kt })
      x.restore()
      x.beginPath(); x.moveTo(left + fs + 30, y + tsz * 0.75); x.lineTo(left + fs + 30 + Math.min(maxT * tsz / 50, 260) * ease.outCubic(kt) * 0.4, y + tsz * 0.75); line(x, col, 5, 12)
    })
  },
  cues(p, t0, dur) { const n = (p.red || []).length + (p.green || []).length, nr = (p.red || []).length; return Array.from({ length: n }, (_, i) => ['pluck', t0 + stagger(i, n, dur, 0.12, 0.66) + 0.1, i < nr ? 392 + i * 30 : 784 + (i - nr) * 60, 0.05, 0.45, 0]) },
}

// ───────────────────────── icons: a row / grid / orbit of line icons
const normItem = it => typeof it === 'string' ? { i: it } : { ...it, i: it.i || it.icon }
const iconsK = {
  min: p => 1.2 + (p.items || []).length * 0.3,
  draw(x, p, s) {
    const items = (p.items || []).map(normItem), n = items.length, layout = p.layout || (n > 4 ? 'grid' : 'row')
    const showL = it => it.label || (p.names ? it.i : '')
    const anyL = items.some(showL)
    const arr = arrivals(p, s.prev, 'items', n, s.dur, 0.1, 0.62)
    const drawOne = (it, i, px, py, size) => {
      const at = arr(i), k = pop01(s.lt, at, 0.38, 2.4)
      if (k <= 0) return
      const bob = Math.sin(s.t * 2 + i * 1.1) * 6
      x.save(); popScale(x, px, py, k); x.rotate(0)
      x.translate(px, py); x.rotate(0.25 * wob(s.lt, at, 14, 4)); x.translate(-px, -py)
      icon(x, it.i, px, py + bob - (anyL ? 26 : 0), size, it.col || null, s.t + i * 0.9)
      x.restore()
      const L = showL(it)
      if (L) label(x, L, px, py + size * 0.5 + 34, { size: p.names ? 36 : 42, weight: 800, family: p.names ? 'mono' : 'inter', color: BONE, maxW: size * 1.5 + 40, alpha: clamp(k * 2) })
    }
    if (layout === 'orbit') {
      const Rr = Math.min(s.w * 0.36, s.h * 0.36), size = p.size || Math.min(170, Rr * 0.6)
      if (p.center) { const kc = pop01(s.lt, 0.05, 0.4, 2.2); if (ICONS[p.center] || ALIAS[p.center]) icon(x, p.center, s.cx, s.cy, size * 1.3 * kc, null, s.t); else label(x, p.center, s.cx, s.cy, { size: fitFont(x, p.center, 70, Rr * 1.1, { weight: 900 }) * kc, weight: 900, color: GOLD, glow: 20 }) }
      x.save(); x.globalAlpha *= 0.4; C(x, s.cx, s.cy, Rr); x.setLineDash([4, 14]); line(x, VIOLET, 3, 8); x.restore()
      items.forEach((it, i) => { const a = -PI / 2 + (i / n) * TAU + s.t * 0.25; drawOne(it, i, s.cx + Math.cos(a) * Rr, s.cy + Math.sin(a) * Rr + (anyL ? 20 : 0), size) })
      return
    }
    const cols = layout === 'row' ? Math.min(n, 4) : n <= 4 ? 2 : n <= 9 ? 3 : 4
    const rows = Math.ceil(n / cols)
    const cw = s.w / cols, ch = s.h / rows
    const size = p.size || Math.min(220, cw * 0.62, (ch - (anyL ? 80 : 10)) * 0.85)
    items.forEach((it, i) => {
      const r = Math.floor(i / cols), inRow = r === rows - 1 ? n - cols * (rows - 1) : cols, c = i - r * cols
      const px = s.cx + (c - (inRow - 1) / 2) * cw, py = s.cy + (r - (rows - 1) / 2) * ch
      drawOne(it, i, px, py, size)
    })
  },
  cues(p, t0, dur, ctx = {}) { const items = p.items || [], arr = arrivals(p, ctx.prev, 'items', items.length, dur, 0.1, 0.62); return items.map((_, i) => arr(i) < 0 ? null : ['pop', t0 + arr(i), [660, 740, 880, 988, 1175][i % 5], 0.045, ((i % 3) - 1) * 0.3]).filter(Boolean) },
}

// ───────────────────────── timeline: marks along a strip; a dot travels; one can ding
const timeline = {
  min: p => 1.6 + (p.marks || []).length * 0.45,
  draw(x, p, s) {
    const marks = p.marks || [], n = Math.max(1, marks.length), ics = p.icons || []
    const row = (p.layout || (n <= 3 ? 'row' : 'col')) === 'row'
    const col = color(p.col, GOLD)
    const t0 = 0.12 * s.dur, t1 = 0.82 * s.dur
    const markT = i => n === 1 ? t0 : lerp(t0, t1, i / (n - 1))
    const pos = []
    if (row) { const span = s.w * 0.8; for (let i = 0; i < n; i++) pos.push([s.cx - span / 2 + (n === 1 ? span / 2 : span * i / (n - 1)), s.cy]) }
    else { const span = Math.min(s.h - 120, n * 190), lx = s.cx - s.w / 2 + 230; for (let i = 0; i < n; i++) pos.push([lx, s.cy - span / 2 + (n === 1 ? span / 2 : span * i / (n - 1))]) }
    // the strip
    const [a0, a1] = [pos[0], pos[n - 1]]
    x.save(); x.beginPath(); x.moveTo(...a0); x.lineTo(...a1); x.lineCap = 'round'; x.lineWidth = 16; x.strokeStyle = 'rgba(16,10,40,0.9)'; x.stroke(); line(x, rgba(BONE, 0.35), 4, 6); x.restore()
    // travel progress
    const q = prog(s.lt, t0, t1), seg = q * (n - 1), si = Math.min(n - 2, Math.floor(seg)), u = ease.inOutCubic(seg - Math.max(0, si))
    const dot = n === 1 ? a0 : [lerp(pos[Math.max(0, si)][0], pos[Math.max(0, si) + 1][0], u), lerp(pos[Math.max(0, si)][1], pos[Math.max(0, si) + 1][1], u)]
    if (q > 0) { x.save(); x.beginPath(); x.moveTo(...a0); x.lineTo(...dot); line(x, col, 10, 24); x.restore() }
    marks.forEach((m, i) => {
      const [px, py] = pos[i], mt = markT(i), lit = s.lt >= mt, ding = p.ding === i
      const k = pop01(s.lt, mt - 0.15, 0.35, 2.4), kl = clamp((s.lt - mt + 0.15) / 0.3)
      const dk = ding && lit ? 1 + 0.25 * wob(s.lt, mt, 14, 3) : 1
      const nc = ding && lit ? GOLD : lit ? col : MUTED
      C(x, px, py, (ding ? 28 : 20) * dk); ink(x, nc, { w: 7, fa: lit ? 0.7 : 0.2, glow: lit ? (ding ? 40 : 20) : 6 })
      if (ding && lit) { const rk = prog(s.lt, mt, mt + 0.7); x.save(); x.globalAlpha *= 1 - rk; C(x, px, py, 30 + rk * 90); line(x, GOLD, 6, 20); x.restore(); sparkle(x, px, py, s.lt, mt + 0.05, { n: 12, R: 200, seed: 70 + i }) }
      const isz = row ? Math.min(150, s.w * 0.8 / n * 0.75) : Math.min(130, (s.h / n) * 0.75)
      const ic = ics[i]
      if (row) {
        if (ic) icon(x, ic, px, py - 120 - (lit ? 6 : 0), isz * k * (ding && lit ? 1.15 : 1), lit ? null : MUTED, s.t + i)
        x.save(); x.globalAlpha *= 0.3 + 0.7 * kl
        para(x, m, px, py + 90, { size: 40, weight: 800, color: lit ? BONE : MUTED, maxW: s.w * 0.8 / n + 40 })
        x.restore()
      } else {
        if (ic) icon(x, ic, px - 120, py, isz * Math.max(0.6, k) * (ding && lit ? 1.15 : 1), lit ? null : MUTED, s.t + i, { alpha: 0.35 + 0.65 * kl })
        x.save(); x.translate((1 - ease.outCubic(kl)) * 30, 0)
        label(x, m, px + 60, py + 2, { size: fitFont(x, m, 50, s.cx + s.w / 2 - px - 70, { weight: 800 }), weight: 800, align: 'left', color: ding && lit ? GOLD : lit ? BONE : MUTED, alpha: 0.35 + 0.65 * kl, glow: ding && lit ? 16 : 0 })
        x.restore()
      }
    })
    // the travelling dot
    C(x, dot[0], dot[1], 16 + 3 * Math.sin(s.t * 8)); ink(x, BONE, { w: 6, fa: 1, glow: 30 })
  },
  cues(p, t0, dur) {
    const n = Math.max(1, (p.marks || []).length), c = []
    for (let i = 0; i < n; i++) { const t = t0 + (n === 1 ? 0.12 * dur : lerp(0.12 * dur, 0.82 * dur, i / (n - 1))); c.push(p.ding === i ? ['bell', t, 1318, 0.055, 2, 0] : ['pluck', t, 587 + i * 80, 0.045, 0.4, 0]) }
    return c
  },
}

// ───────────────────────── clock: hands spin from → to
function parseTime(str) {
  const m = String(str || '').trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
  if (!m) return { min: 0, ampm: '' }
  let h = +m[1] % 12; const ap = (m[3] || '').toUpperCase()
  if (ap === 'PM') h += 12
  return { min: h * 60 + (+m[2] || 0), ampm: ap, h12: !ap ? +m[1] : null }
}
function fmtTime(mins, ampm) {
  mins = ((Math.round(mins) % 1440) + 1440) % 1440
  let h = Math.floor(mins / 60), mm = mins % 60
  if (ampm) { const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${String(mm).padStart(2, '0')} ${ap}` }
  h = h % 12 || 12; return `${h}:${String(mm).padStart(2, '0')}`
}
const clock = {
  min: () => 2.6,
  draw(x, p, s) {
    const col = color(p.col, BLUE)
    const F = parseTime(p.from ?? '7:00'), T = parseTime(p.to ?? '7:45'), ampm = F.ampm || T.ampm
    let a = F.min, b = T.min; if (b < a) b += ampm ? 1440 : 720
    const Rr = Math.min(s.h * 0.33, s.w * 0.36, 320), cx = s.cx, cy = s.cy - (p.label ? 70 : 30) - (p.digital === false ? -30 : 20)
    const spinD = clamp((b - a) / 60 * 0.6, 0.8, Math.min(2.6, s.dur * 0.55))
    const q = ease.inOutCubic(prog(s.lt, 0.3, 0.3 + spinD)), m = lerp(a, b, q), done = s.lt > 0.3 + spinD
    const shake = done ? wob(s.lt, 0.3 + spinD, 30, 6) * 6 : 0
    x.save(); x.translate(shake, 0)
    // face
    C(x, cx, cy, Rr); x.fillStyle = 'rgba(16,10,40,0.9)'; x.fill(); C(x, cx, cy, Rr); ink(x, col, { w: 9, fa: 0.1, glow: 30 })
    // bells on top
    for (const d of [-1, 1]) { x.beginPath(); x.arc(cx + d * Rr * 0.62, cy - Rr * 0.86, Rr * 0.2, PI + (d < 0 ? 0.1 : -0.4), TAU + (d < 0 ? 0.4 : -0.1)); x.closePath(); ink(x, col, { w: 7, fa: 0.35, glow: 18 }) }
    // elapsed wedge (when under an hour)
    if (b - a <= 60 && q > 0) { const s0 = (a % 60) / 60 * TAU - PI / 2, s1 = s0 + (m - a) / 60 * TAU; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, Rr * 0.8, s0, s1); x.closePath(); x.fillStyle = rgba(color(p.wedge, GOLD), 0.22); x.fill() }
    for (let i = 0; i < 60; i++) { const an = (i / 60) * TAU, big = i % 5 === 0, r0 = Rr * (big ? 0.84 : 0.9); x.beginPath(); x.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0); x.lineTo(cx + Math.cos(an) * Rr * 0.95, cy + Math.sin(an) * Rr * 0.95); x.strokeStyle = rgba(BONE, big ? 0.85 : 0.35); x.lineWidth = big ? 6 : 3; x.stroke() }
    ;[[12, -PI / 2], [3, 0], [6, PI / 2], [9, PI]].forEach(([nn, an]) => label(x, String(nn), cx + Math.cos(an) * Rr * 0.68, cy + Math.sin(an) * Rr * 0.68 + 3, { size: Math.max(36, Rr * 0.16), weight: 900, color: BONE, shadow: false }))
    const ma = ((m % 60) / 60) * TAU - PI / 2, ha = (((m / 60) % 12) / 12) * TAU - PI / 2
    // motion trail on the minute hand while spinning
    if (q > 0 && q < 1) { const sp = Math.min(1.4, (b - a) / 60 * 0.9); x.save(); x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, Rr * 0.78, ma - sp * 0.6, ma); x.closePath(); x.fillStyle = rgba(BONE, 0.12); x.fill(); x.restore() }
    x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ha) * Rr * 0.48, cy + Math.sin(ha) * Rr * 0.48); line(x, BONE, 14, 14)
    x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ma) * Rr * 0.76, cy + Math.sin(ma) * Rr * 0.76); line(x, col, 9, 20)
    C(x, cx, cy, 14); ink(x, GOLD, { w: 5, fa: 1, glow: 16 })
    x.restore()
    let y = cy + Rr + 70
    if (p.digital !== false) { pill(x, fmtTime(m, ampm), cx, y, { size: 56, family: 'mono', weight: 700, col: done ? GOLD : col, fg: BONE, glow: done ? 26 : 14 }); y += 110 }
    if (p.label) label(x, p.label, cx, y, { size: fitFont(x, p.label, 52, s.w - 40, { weight: 900 }), weight: 900, color: BONE, alpha: clamp((s.lt - 0.2) / 0.3) })
    if (done) sparkle(x, cx, cy - Rr, s.lt, 0.3 + spinD, { n: 10, R: 200, seed: 81 })
  },
  cues(p, t0, dur) {
    const F = parseTime(p.from ?? '7:00'), T = parseTime(p.to ?? '7:45'); let a = F.min, b = T.min; if (b < a) b += (F.ampm || T.ampm) ? 1440 : 720
    const spinD = clamp((b - a) / 60 * 0.6, 0.8, Math.min(2.6, dur * 0.55)), c = []
    for (let t = 0.3; t < 0.3 + spinD; t += 0.09) c.push(['tick', t0 + t, 0.03])
    c.push(['bell', t0 + 0.3 + spinD, 1568, 0.05, 1.2, 0])
    return c
  },
}

// ───────────────────────── heart: beat / crack / heal / fill / lock / open
function heartHalves(x, cx, cy, S, col, sep, rot, { fa = 0.38, w = 9, seam = null } = {}) {
  const k = S / 60, top = cy - 26 * k, bot = cy + 42 * k
  const zig = [[cx, top], [cx - 8 * k, cy - 8 * k], [cx + 7 * k, cy + 6 * k], [cx - 6 * k, cy + 20 * k], [cx, bot]]
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * sep, Math.abs(sep) * 0.2); x.translate(cx, bot); x.rotate(d * rot); x.translate(-cx, -bot)
    x.beginPath()
    if (d < 0) { x.moveTo(cx, bot); x.bezierCurveTo(cx - 70 * k, cy - 6 * k, cx - 46 * k, cy - 62 * k, cx, top); zig.slice(1).forEach(q => x.lineTo(...q)) }
    else { x.moveTo(cx, top); x.bezierCurveTo(cx + 46 * k, cy - 62 * k, cx + 70 * k, cy - 6 * k, cx, bot); [...zig].reverse().slice(1).forEach(q => x.lineTo(...q)) }
    x.closePath(); ink(x, col, { w, fa, glow: 28 })
    x.restore()
  }
  if (seam) { x.beginPath(); zig.forEach((q, i) => i ? x.lineTo(...q) : x.moveTo(...q)); line(x, seam, 8, 26) }
  return zig
}
const heartK = {
  min: p => p.mode === 'beat' || !p.mode ? 2.2 : 2.8,
  draw(x, p, s) {
    const mode = p.mode || 'beat', col = color(p.col, mode === 'lock' || mode === 'open' ? GOLD : PINK)
    const S = Math.min(s.h * 0.3, s.w * 0.3, 300), cx = s.cx, cy = s.cy - (p.label ? 50 : 0) + (mode === 'lock' || mode === 'open' ? S * 0.3 : 0)
    const at = at01(s, p.at, mode === 'fill' ? 0.15 : 0.4)
    if (mode === 'beat') {
      // ECG line behind
      const span = s.w * 0.96, x0 = s.cx - span / 2, ph = (s.t * 0.9) % 1
      x.save(); x.beginPath()
      for (let i = 0; i <= 120; i++) { const u = i / 120, px = x0 + u * span, d = ((u - ph) % 1 + 1) % 1; let yy = 0; if (d > 0.42 && d < 0.58) { const e = (d - 0.42) / 0.16; yy = e < 0.25 ? -e * 4 * 50 : e < 0.5 ? -50 + (e - 0.25) * 4 * 150 : e < 0.75 ? 100 - (e - 0.5) * 4 * 140 : -40 + (e - 0.75) * 4 * 40 }; i ? x.lineTo(px, cy + yy) : x.moveTo(px, cy + yy) }
      x.globalAlpha *= 0.6; line(x, col, 6, 16); x.restore()
      const bt = (s.t * 1.25) % 1, pulse = 1 + 0.12 * Math.exp(-bt * 14) * (bt < 0.5 ? 1 : 0) + 0.08 * Math.exp(-Math.max(0, bt - 0.18) * 14) * (bt > 0.18 ? 1 : 0)
      heart(x, cx, cy, S * pulse, col, { fa: 0.45, w: 10 })
      for (let i = 0; i < 2; i++) { const rk = ((s.t * 1.25) + i * 0.5) % 1; x.save(); x.globalAlpha *= (1 - rk) * 0.5; heartPath(x, cx, cy, S * (1 + rk * 0.5)); line(x, col, 4, 12); x.restore() }
    } else if (mode === 'crack' || mode === 'heal') {
      const crack = mode === 'crack'
      const ck = crack ? prog(s.lt, at, at + 0.35) : 1
      const split = crack ? ease.outCubic(prog(s.lt, at + 0.4, at + 0.9)) : 1 - ease.inOutCubic(prog(s.lt, at, at + 0.8))
      const sep = split * S * 0.32, rot = split * 0.22
      if (crack && ck < 1) {
        const shake = ck > 0 ? Math.sin(s.t * 70) * 4 * (1 - ck) : 0
        heart(x, cx + shake, cy, S, col, { fa: 0.42, w: 10 })
        if (ck > 0) { const zig = heartHalves(x, cx + shake, cy, S, col, 0, 0, { fa: 0, w: 0.01 }); x.beginPath(); const nn = Math.max(1, Math.ceil(ck * 4)); zig.slice(0, nn + 1).forEach((q, i) => i ? x.lineTo(...q) : x.moveTo(...q)); line(x, BONE, 7, 18) }
      } else {
        const healed = !crack && split <= 0.001
        heartHalves(x, cx, cy, S, col, sep, rot, { fa: crack ? lerp(0.42, 0.22, split) : 0.42, w: 10, seam: healed ? GOLD : null })
        if (healed) sparkle(x, cx, cy, s.lt, at + 0.8, { n: 14, R: S * 1.6, seed: 91 })
        if (crack) for (let i = 0; i < 5; i++) { const r = rng(i + 3), fk = prog(s.lt, at + 0.4, at + 1.4); if (fk > 0 && fk < 1) { x.save(); x.globalAlpha *= 1 - fk; drawPixelStar(x, cx + (r() - 0.5) * 40, cy + fk * S * 1.4 + r() * 30, 18, 1, col); x.restore() } }
      }
    } else if (mode === 'fill') {
      const lv = clamp(p.to ?? 1) * ease.inOutCubic(prog(s.lt, at, at + Math.min(2.2, s.dur * 0.6)))
      const k = S / 60, top = cy - 46 * k, bot = cy + 42 * k, ly = lerp(bot, top, lv)
      heartPath(x, cx, cy, S); x.fillStyle = 'rgba(16,10,40,0.85)'; x.fill()
      x.save(); heartPath(x, cx, cy, S); x.clip()
      x.beginPath(); x.moveTo(cx - S * 1.3, bot + 10); for (let i = 0; i <= 40; i++) { const px = cx - S * 1.3 + i * S * 2.6 / 40; x.lineTo(px, ly + Math.sin(i * 0.6 + s.t * 5) * 10 * Math.min(1, lv * 8) * (1 - lv * 0.6)) } x.lineTo(cx + S * 1.3, bot + 10); x.closePath()
      const gr = x.createLinearGradient(0, bot, 0, top); gr.addColorStop(0, rgba(col, 0.9)); gr.addColorStop(1, rgba(GOLD, 0.8)); x.fillStyle = gr; x.fill()
      for (let i = 0; i < 6; i++) { const r = rng(i + 11), bk = (s.t * (0.5 + r()) + r()) % 1, by = lerp(bot, ly, bk); if (by > ly) { C(x, cx + (r() - 0.5) * S, by, 6 + r() * 6); line(x, rgba(BONE, 0.6), 3, 6) } }
      x.restore()
      heartPath(x, cx, cy, S); ink(x, col, { w: 10, fa: 0, glow: 30 })
      if (lv >= clamp(p.to ?? 1) - 0.001 && lv > 0.95) sparkle(x, cx, top, s.lt, at + Math.min(2.2, s.dur * 0.6), { n: 14, R: S * 1.4, seed: 93 })
    } else {
      // lock / open: a heart-shaped padlock
      const open = mode === 'open'
      const kk = ease.inOutCubic(prog(s.lt, at, at + 0.35))
      const lift = open ? kk : 1 - kk
      const sx = S * 0.55, shY = cy - S * 0.45 - lift * S * 0.42
      x.save(); x.translate(cx, shY); if (open) x.rotate(-0.35 * kk); x.translate(-cx, -shY)
      x.beginPath(); x.moveTo(cx - sx, shY + S * 0.3); x.lineTo(cx - sx, shY - S * 0.05); x.arc(cx, shY - S * 0.05, sx, PI, 0); x.lineTo(cx + sx, shY + S * (open ? 0.1 : 0.3)); line(x, BONE, 22, 18)
      x.restore()
      const thud = open ? 0 : wob(s.lt, at + 0.35, 24, 6) * 0.04
      x.save(); popScale(x, cx, cy, 1 + thud)
      heart(x, cx, cy, S, col, { fa: open ? 0.3 + 0.3 * kk : 0.42, w: 10 })
      C(x, cx, cy - S * 0.12, S * 0.12); x.fillStyle = DARK; x.fill(); P(x, [[cx - S * 0.06, cy - S * 0.08], [cx + S * 0.06, cy - S * 0.08], [cx + S * 0.09, cy + S * 0.24], [cx - S * 0.09, cy + S * 0.24]]); x.fill()
      x.restore()
      if (open) { sparkle(x, cx, cy - S * 0.4, s.lt, at + 0.35, { n: 14, R: S * 1.6, seed: 95 }); x.save(); x.globalAlpha *= kk * (0.5 + 0.2 * Math.sin(s.t * 4)); heartPath(x, cx, cy, S * 1.25); line(x, PINK, 4, 30); x.restore() }
    }
    if (p.label) { const kl = clamp((s.lt - 0.3) / 0.3); label(x, p.label, s.cx, s.cy + s.h / 2 - 40, { size: fitFont(x, p.label, 58, s.w - 40, { weight: 900 }), weight: 900, color: BONE, alpha: kl }) }
  },
  cues(p, t0, dur) {
    const mode = p.mode || 'beat', at = t0 + (p.at ?? (mode === 'fill' ? 0.15 : 0.4)) * dur
    if (mode === 'beat') { const c = []; for (let t = 0.1; t < dur; t += 0.8) c.push(['boom', t0 + t, 0.07], ['boom', t0 + t + 0.18, 0.05]); return c }
    if (mode === 'crack') return [['tick', at, 0.1], ['tick', at + 0.15, 0.1], ['boom', at + 0.4, 0.12]]
    if (mode === 'heal') return [['riser', at, at + 0.8, 0.04], ['bell', at + 0.8, 1318, 0.05, 2.2, 0], ['glitter', at + 0.8, at + 1.6]]
    if (mode === 'fill') return [['riser', at, at + Math.min(2.2, dur * 0.6), 0.04], ['bell', at + Math.min(2.2, dur * 0.6), 1175, 0.05, 2, 0]]
    if (mode === 'lock') return [['tick', at + 0.35, 0.12], ['boom', at + 0.36, 0.08]]
    return [['tick', at, 0.1], ['bell', at + 0.35, 1318, 0.05, 2, 0], ['glitter', at + 0.35, at + 1.1]]
  },
}

// ───────────────────────── scale: a balance
const scaleK = {
  min: () => 2.6,
  draw(x, p, s) {
    const L = Math.min(s.w * 0.84, 800), pivY = s.cy - s.h * 0.2, baseY = s.cy + s.h * 0.4
    const tilt = clamp(p.tilt ?? 0, -1, 1)
    const ang = tilt * 0.3 * easeOutBack(prog(s.lt, 0.5, 1.3), 1.8) + 0.03 * wob(s.lt, 1.3, 8, 2) + 0.012 * Math.sin(s.t * 1.7)
    // post + base
    x.beginPath(); x.moveTo(s.cx, pivY); x.lineTo(s.cx, baseY - 20); line(x, GOLD, 12, 18)
    P(x, [[s.cx - 130, baseY], [s.cx + 130, baseY], [s.cx + 70, baseY - 34], [s.cx - 70, baseY - 34]]); ink(x, GOLD, { w: 7, fa: 0.3, glow: 18 })
    // beam
    const ex = Math.cos(ang) * L / 2, ey = Math.sin(ang) * L / 2
    x.beginPath(); x.moveTo(s.cx - ex, pivY - ey); x.lineTo(s.cx + ex, pivY + ey); line(x, GOLD, 12, 22)
    C(x, s.cx, pivY, 20); ink(x, GOLD, { w: 6, fa: 0.8, glow: 20 })
    starPath(x, s.cx, pivY - 52, 24, 10); ink(x, GOLD, { w: 5, fa: 0.6, glow: 20 })
    ;[[p.a, p.ia, -1, BLUE], [p.b, p.ib, 1, PINK]].forEach(([txt, ic, d, col], i) => {
      const hx = s.cx + d * ex, hy = pivY + d * ey, sl = Math.min(220, s.h * 0.24), py = hy + sl
      x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx - 110, py); x.moveTo(hx, hy); x.lineTo(hx + 110, py); line(x, rgba(BONE, 0.7), 4, 6)
      x.beginPath(); x.moveTo(hx - 150, py); x.quadraticCurveTo(hx, py + 90, hx + 150, py); x.closePath(); ink(x, col, { w: 8, fa: 0.3, glow: 22 })
      const k = pop01(s.lt, 0.1 + i * 0.2, 0.4, 2.4)
      if (ic) icon(x, ic, hx, py - 80, 130 * k, null, s.t + i)
      if (txt) { x.save(); popScale(x, hx, py - (ic ? 170 : 50), k); pill(x, txt, hx, py - (ic ? 170 : 50), { size: Math.min(46, fitFont(x, txt, 46, L / 2 - 40, { weight: 800 })), col, fg: BONE, weight: 800, glow: 18 }); x.restore() }
    })
  },
  cues(p) { return [['pop', 0, 0, 0, 0]].slice(1) },
}
scaleK.cues = (p, t0) => [['pop', t0 + 0.1, 740, 0.045, -0.4], ['pop', t0 + 0.3, 880, 0.045, 0.4], ['whoosh', t0 + 0.5, 0.5, 0.04], ['boom', t0 + 1.0, Math.abs(p.tilt ?? 0) > 0.2 ? 0.1 : 0.05]]

// ───────────────────────── bars: a jokey ranking (no axes, no numbers)
const bars = {
  min: p => 1.4 + (p.items || []).length * 0.45,
  draw(x, p, s) {
    const items = p.items || [], n = items.length
    const titleH = p.title ? 110 : 0
    const rowH = Math.min(170, (s.h - titleH) / Math.max(1, n)), x0 = s.cx - s.w / 2 + 10, bw = s.w - 20
    const y0 = s.cy - (n * rowH + titleH) / 2
    if (p.title) label(x, p.title, s.cx, y0 + 40, { size: fitFont(x, p.title, 56, s.w - 20, { weight: 900 }), weight: 900, color: GOLD, glow: 14 })
    const maxV = Math.max(...items.map(r => r[1] ?? 0.5))
    const arr = arrivals(p, s.prev, 'items', n, s.dur, 0.12, 0.6)
    items.forEach(([name, v = 0.5, ic], i) => {
      const at = arr(i), q = prog(s.lt, at, at + 0.7), k = easeOutBack(q, 1.5)
      if (q <= 0) return
      const y = y0 + titleH + rowH * (i + 0.5), col = color((p.cols || [])[i], PAL[i % PAL.length])
      label(x, name, x0 + 6, y - rowH * 0.22, { size: fitFont(x, name, 44, bw * 0.9, { weight: 800 }), weight: 800, align: 'left', color: BONE, alpha: clamp(q * 4) })
      const by = y + rowH * 0.14, bh = Math.min(50, rowH * 0.3), full = (bw - (ic ? 90 : 20)) * clamp(v, 0.04, 1)
      rr(x, x0, by - bh / 2, bw - (ic ? 90 : 0), bh, bh / 2); x.fillStyle = 'rgba(16,10,40,0.85)'; x.fill()
      const ww = Math.max(bh, full * k)
      rr(x, x0, by - bh / 2, ww, bh, bh / 2); ink(x, col, { w: 6, fa: 0.55, glow: 22 })
      const top = v === maxV && p.crown !== false
      if (ic) icon(x, ic, x0 + ww + 50, by, 80 * clamp(q * 2), null, s.t + i)
      if (top && q >= 1) { const kc = pop01(s.lt, at + 0.7, 0.4, 2.6); icon(x, 'crown', x0 + ww - 30, by - bh / 2 - 34, 80 * kc, null, s.t); sparkle(x, x0 + ww, by, s.lt, at + 0.75, { n: 10, R: 160, seed: 101 }) }
    })
  },
  cues(p, t0, dur, ctx = {}) { const items = p.items || [], arr = arrivals(p, ctx.prev, 'items', items.length, dur, 0.12, 0.6), c = []; items.forEach(([, v = 0.5], i) => { const at = arr(i); if (at >= 0) c.push(['riser', t0 + at, t0 + at + 0.5, 0.025], ['pop', t0 + at + 0.5, 600 + v * 700, 0.045, 0]) }); return c },
}

// ───────────────────────── calendar: pages tear away; the last one gets circled
const calendar = {
  min: p => 1.6 + (p.pages || []).length * 0.4,
  draw(x, p, s) {
    const pages = p.pages?.length ? p.pages : ['MON', 'TUE', 'WED', 'THU', 'FRI'], n = pages.length
    const col = color(p.col, PINK)
    const w = Math.min(600, s.w * 0.66, s.h * 0.62), h = Math.min(w * 1.05, s.h - 120), x0 = s.cx - w / 2, y0 = s.cy - h / 2 - (typeof p.mark === 'string' ? 40 : 0)
    const head = h * 0.2, flipAt = i => stagger(i, Math.max(1, n - 1), s.dur, 0.12, 0.62)
    // back board
    x.save(); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; rr(x, x0, y0, w, h, 34); x.fillStyle = '#120a2c'; x.fill(); x.restore()
    const drawPage = (i, extraA = 1) => {
      rr(x, x0 + 14, y0 + head + 6, w - 28, h - head - 20, 18); x.fillStyle = '#1c1240'; x.fill(); ink(x, rgba(BONE, 0.5), { w: 3, fa: 0, glow: 0 })
      const txt = String(pages[i])
      label(x, txt, s.cx, y0 + head + (h - head) * 0.46, { size: fitFont(x, txt, 170, w - 90, { weight: 900 }), weight: 900, color: BONE, alpha: extraA })
      if (p.sub) label(x, Array.isArray(p.sub) ? p.sub[i] || '' : p.sub, s.cx, y0 + h - 60, { size: 36, weight: 700, family: 'mono', color: MUTED, alpha: extraA, maxW: w - 60 })
    }
    // current page index (pages flip away from the front)
    let cur = 0; for (let i = 0; i < n - 1; i++) if (s.lt >= flipAt(i) + 0.32) cur = i + 1
    drawPage(Math.min(n - 1, cur + (cur < n - 1 && s.lt >= flipAt(cur) ? 1 : 0)))
    if (cur < n - 1 && s.lt >= flipAt(cur) && s.lt < flipAt(cur) + 0.32) {
      const k = ease.inCubic(prog(s.lt, flipAt(cur), flipAt(cur) + 0.32))
      x.save(); x.translate(s.cx, y0 + head); x.rotate(-k * 0.6); x.translate(k * -120, -k * 140); x.scale(1, 1 - k * 0.85); x.globalAlpha *= 1 - k * 0.7; x.translate(-s.cx, -(y0 + head)); drawPage(cur); x.restore()
    } else if (cur < n - 1) drawPage(cur)
    // header band + rings
    rr(x, x0, y0, w, head, [34, 34, 0, 0]); ink(x, col, { w: 7, fa: 0.55, glow: 22 })
    rr(x, x0, y0, w, h, 34); ink(x, col, { w: 7, fa: 0, glow: 22 })
    for (const d of [-1, 1]) { rr(x, s.cx + d * w * 0.26 - 9, y0 - 30, 18, 56, 9); ink(x, BONE, { w: 5, fa: 0.6, glow: 10 }) }
    // the mark: a hand-drawn circle around the last page
    const mt = at01(s, p.markAt, 0.74)
    if (p.mark && s.lt > mt) {
      const k = prog(s.lt, mt, mt + 0.55), cy = y0 + head + (h - head) * 0.46
      x.save(); x.beginPath()
      for (let i = 0; i <= 80 * k; i++) { const u = i / 80, a = -PI * 0.6 + u * TAU * 1.12, rx = w * 0.42 * (1 + 0.04 * Math.sin(u * 9)), ry = (h - head) * 0.3 * (1 + 0.05 * Math.cos(u * 7)); const px = s.cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      line(x, RED, 10, 22); x.restore()
      if (typeof p.mark === 'string') stampAt(x, p.mark, s.cx, y0 + h + 60, s.lt, mt + 0.5, color(p.markCol, GOLD), { size: 56, rot: -0.06 })
      sparkle(x, s.cx, cy, s.lt, mt + 0.55, { n: 12, R: w * 0.6, seed: 111 })
    }
  },
  cues(p, t0, dur) { const n = (p.pages?.length ? p.pages.length : 5), c = []; for (let i = 0; i < n - 1; i++) c.push(['whoosh', t0 + stagger(i, Math.max(1, n - 1), dur, 0.12, 0.62), 0.25, 0.04]); if (p.mark) { const mt = t0 + (p.markAt ?? 0.74) * dur; c.push(['riser', mt, mt + 0.5, 0.03], ['bell', mt + 0.55, 1175, 0.05, 1.8, 0]); if (typeof p.mark === 'string') c.push(['boom', mt + 0.5, 0.12]) } return c },
}

// ───────────────────────── ghost: a ghost floats up out of a phone
const ghostK = {
  min: () => 2.4,
  draw(x, p, s) {
    const pw = Math.min(330, s.w * 0.36), ph = Math.min(pw * 1.7, s.h * 0.55)
    const px = s.cx, pyB = s.cy + s.h / 2 - (p.label ? 100 : 20), py0 = pyB - ph
    const at = at01(s, p.at, 0.25), q = prog(s.lt, at, at + 1.6), e = ease.outCubic(q)
    // phone
    x.save(); x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 40; rr(x, px - pw / 2, py0, pw, ph, 44); x.fillStyle = '#0d0822'; x.fill(); x.restore()
    rr(x, px - pw / 2, py0, pw, ph, 44); ink(x, VIOLET, { w: 7, fa: 0, glow: 24 })
    rr(x, px - 40, py0 + 16, 80, 22, 11); x.fillStyle = '#000'; x.fill()
    const msg = p.msg ?? 'hey! :)'
    x.save(); x.font = font(38, { weight: 700 }); const mw = Math.min(pw - 60, x.measureText(msg).width + 40); x.restore()
    rr(x, px + pw / 2 - 26 - mw, py0 + 90, mw, 64, 26); x.fillStyle = rgba(GOLD, 0.9); x.fill()
    label(x, msg, px + pw / 2 - 26 - mw / 2, py0 + 123, { size: 38, weight: 700, color: DARK, shadow: false, maxW: mw - 30 })
    label(x, p.seen ?? 'Seen', px + pw / 2 - 30, py0 + 184, { size: 36, weight: 700, family: 'mono', color: MUTED, align: 'right', alpha: clamp((s.lt - at - 0.6) / 0.3) })
    // glow seeping from the screen
    if (q > 0) { x.save(); const gr = x.createRadialGradient(px, py0 + ph * 0.55, 0, px, py0 + ph * 0.55, pw * 0.7); gr.addColorStop(0, rgba('#efe6ff', 0.3 * (1 - q * 0.5))); gr.addColorStop(1, rgba('#efe6ff', 0)); x.fillStyle = gr; rr(x, px - pw / 2 + 10, py0 + 10, pw - 20, ph - 20, 36); x.fill(); x.restore() }
    // the ghost
    const gs = Math.min(280, s.h * 0.32), gy0 = py0 + ph * 0.55, gy1 = s.cy - s.h / 2 + gs * 0.62
    const gx = px + Math.sin(s.t * 1.4) * 40 * e + e * 30, gy = lerp(gy0, gy1, e) + Math.sin(s.t * 2) * 10 * e
    if (q > 0) {
      for (let i = 0; i < 4; i++) { const u = (i + 1) / 5; x.save(); x.globalAlpha *= 0.35 * (1 - u) * clamp(q * 3); C(x, lerp(gx, px, u), lerp(gy + gs * 0.4, gy0, u), gs * 0.1 * (1 - u * 0.6)); x.fillStyle = '#efe6ff'; x.fill(); x.restore() }
      icon(x, 'ghost', gx, gy, gs * lerp(0.35, 1, e), null, s.t, { alpha: clamp(q * 3) })
    }
    if (p.label) label(x, p.label, s.cx, s.cy + s.h / 2 - 40, { size: fitFont(x, p.label, 56, s.w - 40, { weight: 900 }), weight: 900, color: BONE, alpha: clamp((s.lt - 0.4) / 0.3) })
  },
  cues(p, t0, dur) { const at = t0 + (p.at ?? 0.25) * dur; return [['whoosh', at, 1.2, 0.05], ['riser', at, at + 1.4, 0.03], ['tick', at + 0.6, 0.05]] },
}

// ───────────────────────── butterflies: burst out of a heart or a jar
function butterfly(x, px, py, sz, col, t, ph, rot) {
  const f = 0.25 + 0.75 * Math.abs(Math.cos(t * 13 + ph))
  x.save(); x.translate(px, py); x.rotate(rot)
  for (const d of [-1, 1]) {
    x.save(); x.scale(d * f, 1)
    x.beginPath(); x.moveTo(0, -2); x.bezierCurveTo(sz * 0.3, -sz * 0.9, sz * 1.05, -sz * 0.7, sz * 0.8, -sz * 0.1); x.quadraticCurveTo(sz * 0.5, sz * 0.1, 0, 0); ink(x, col, { w: 5, fa: 0.4, glow: 16 })
    x.beginPath(); x.moveTo(0, 2); x.bezierCurveTo(sz * 0.5, sz * 0.1, sz * 0.75, sz * 0.6, sz * 0.35, sz * 0.7); x.quadraticCurveTo(sz * 0.1, sz * 0.6, 0, 2); ink(x, col, { w: 5, fa: 0.3, glow: 14 })
    x.beginPath(); x.moveTo(0, -sz * 0.35); x.quadraticCurveTo(sz * 0.12, -sz * 0.6, sz * 0.25, -sz * 0.65); line(x, BONE, 3, 6)
    x.restore()
  }
  x.beginPath(); x.moveTo(0, -sz * 0.35); x.lineTo(0, sz * 0.45); line(x, BONE, 7, 10)
  x.restore()
}
const butterflies = {
  min: () => 2.6,
  draw(x, p, s) {
    const n = clamp(p.n ?? 7, 1, 16), jar = p.from === 'jar'
    const sx = s.cx, sy = s.cy + s.h * 0.24, bt = at01(s, p.at, 0.25)
    const burst = s.lt >= bt
    if (jar) {
      const jw = Math.min(260, s.w * 0.3), jh = jw * 1.15, lift = ease.outCubic(prog(s.lt, bt - 0.15, bt + 0.25))
      rr(x, sx - jw / 2, sy - jh / 2 + 30, jw, jh, 40); ink(x, BLUE, { w: 8, fa: 0.12, glow: 24 })
      x.beginPath(); x.moveTo(sx - jw * 0.3, sy - jh * 0.1); x.quadraticCurveTo(sx - jw * 0.36, sy + jh * 0.2, sx - jw * 0.28, sy + jh * 0.4); line(x, rgba(BONE, 0.5), 5, 6)
      x.save(); x.translate(sx + lift * 120, sy - jh / 2 + 10 - lift * 160); x.rotate(lift * 0.9); rr(x, -jw * 0.42, -24, jw * 0.84, 40, 10); ink(x, GOLD, { w: 7, fa: 0.4, glow: 20 }); x.restore()
    } else {
      const pulse = burst ? 1 + 0.12 * wob(s.lt, bt, 12, 3) : 1 + 0.06 * Math.abs(Math.sin(s.t * 9))
      heart(x, sx, sy, Math.min(180, s.h * 0.2) * pulse, PINK, { fa: 0.45, w: 10 })
    }
    if (burst) sparkle(x, sx, sy - 40, s.lt, bt, { n: 14, R: 260, seed: 121 })
    const r = rng(p.seed ?? 77)
    for (let i = 0; i < n; i++) {
      const tx = s.cx + (r() - 0.5) * s.w * 0.9, ty = s.cy - s.h * 0.42 + r() * s.h * 0.5, ph = r() * 10, col = PAL[(i + 1) % PAL.length], dl = r() * 0.5, sz = 46 + r() * 26
      const q = prog(s.lt, bt + dl, bt + dl + 1.3)
      if (q <= 0) continue
      const e = ease.outCubic(q), cx1 = lerp(sx, tx, 0.2) + (r() - 0.5) * 300
      const bx = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * cx1 + e * e * tx + Math.sin(s.t * 1.7 + ph) * 26 * e
      const by = (1 - e) * (1 - e) * (sy - 20) + 2 * (1 - e) * e * (sy - s.h * 0.4) + e * e * ty + Math.cos(s.t * 2.3 + ph) * 18 * e
      butterfly(x, bx, by, sz * lerp(0.3, 1, Math.min(1, q * 2)), col, s.t, ph, Math.sin(s.t * 2 + ph) * 0.25 + (1 - e) * 0.4 * (tx > sx ? 1 : -1))
    }
    if (p.label) label(x, p.label, s.cx, s.cy + s.h / 2 - 30, { size: fitFont(x, p.label, 54, s.w - 40, { weight: 900 }), weight: 900, color: BONE, alpha: clamp((s.lt - 0.4) / 0.3) })
  },
  cues(p, t0, dur) { const bt = t0 + (p.at ?? 0.25) * dur; return [['boom', bt, 0.08], ['glitter', bt, bt + 1.2], ['whoosh', bt, 0.8, 0.04]] },
}

// ───────────────────────── grid: a 3×3 bingo / tic-tac-toe card that stamps cells
const LINES3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const gridK = {
  min: p => 1.4 + (p.order || p.cells || []).length * 0.35,
  draw(x, p, s) {
    const cells = p.cells || [], order = p.order || cells.map((_, i) => i).filter(i => cells[i] != null)
    const titleH = p.title ? 100 : 0
    const c = Math.min((s.w - 40) / 3, (s.h - titleH - 30) / 3), gw = c * 3, x0 = s.cx - gw / 2, y0 = s.cy - (gw + titleH) / 2 + titleH
    if (p.title) label(x, p.title.toUpperCase(), s.cx, y0 - 58, { size: fitFont(x, p.title.toUpperCase(), 60, s.w - 20, { weight: 900 }), weight: 900, color: GOLD, glow: 16, spacing: 0.04 })
    panel(x, x0 - 12, y0 - 12, gw + 24, gw + 24, { col: VIOLET, r: 30 })
    for (let i = 1; i < 3; i++) { x.beginPath(); x.moveTo(x0 + c * i, y0 + 10); x.lineTo(x0 + c * i, y0 + gw - 10); x.moveTo(x0 + 10, y0 + c * i); x.lineTo(x0 + gw - 10, y0 + c * i); line(x, rgba(VIOLET, 0.8), 4, 8) }
    const mk = p.mark || 'dot', at = j => stagger(j, order.length, s.dur, 0.15, 0.72)
    const stampedAt = {}; order.forEach((ci, j) => { stampedAt[ci] = at(j) })
    for (let i = 0; i < 9; i++) {
      const cx = x0 + c * (i % 3 + 0.5), cy = y0 + c * (Math.floor(i / 3) + 0.5)
      const st = stampedAt[i], on = st != null && s.lt >= st
      x.save(); x.globalAlpha *= on ? 0.75 : 1
      if (cells[i] != null) para(x, String(cells[i]), cx, cy, { size: 36, weight: 800, maxW: c - 30, lh: 1.08, color: BONE })
      x.restore()
      if (on) {
        const j = order.indexOf(i), k = prog(s.lt, st, st + 0.18), sc = lerp(1.8, 1, ease.outCubic(k)) * (1 + 0.05 * wob(s.lt, st + 0.18, 30, 9))
        const r = rng(i + 5), col = mk === 'xo' ? (j % 2 ? PINK : BLUE) : mk === 'x' ? RED : PINK
        x.save(); x.translate(cx + (r() - 0.5) * 16, cy + (r() - 0.5) * 16); x.rotate((r() - 0.5) * 0.5); x.scale(sc, sc); x.globalAlpha *= clamp(k * 3)
        if (mk === 'dot') { C(x, 0, 0, c * 0.36); ink(x, col, { w: 7, fa: 0.32, glow: 20 }) }
        else if (mk === 'x' || (mk === 'xo' && j % 2 === 0)) { const h = c * 0.3; x.beginPath(); x.moveTo(-h, -h); x.lineTo(h, h); x.moveTo(h, -h); x.lineTo(-h, h); line(x, col, 14, 24) }
        else { C(x, 0, 0, c * 0.3); line(x, col, 14, 24) }
        x.restore()
      }
    }
    // a completed line → gold strike + BINGO stamp
    const done = LINES3.map(L => ({ L, t: Math.max(...L.map(i => stampedAt[i] ?? Infinity)) })).filter(o => o.t < Infinity).sort((a, b) => a.t - b.t)[0]
    if (done && s.lt > done.t + 0.25) {
      const k = ease.outCubic(prog(s.lt, done.t + 0.25, done.t + 0.6)), [a, , b] = done.L
      const A = [x0 + c * (a % 3 + 0.5), y0 + c * (Math.floor(a / 3) + 0.5)], B = [x0 + c * (b % 3 + 0.5), y0 + c * (Math.floor(b / 3) + 0.5)]
      const ext = 0.32, Ax = lerp(A[0], B[0], -ext), Ay = lerp(A[1], B[1], -ext), Bx = lerp(A[0], B[0], 1 + ext), By = lerp(A[1], B[1], 1 + ext)
      x.beginPath(); x.moveTo(Ax, Ay); x.lineTo(lerp(Ax, Bx, k), lerp(Ay, By, k)); line(x, GOLD, 14, 30)
      if (p.bingo !== false) stampAt(x, p.bingo || (mk === 'xo' ? 'WINNER' : 'BINGO!'), s.cx, s.cy + titleH / 2, s.lt, done.t + 0.65, GOLD, { size: 96, rot: -0.12 })
    }
  },
  cues(p, t0, dur) {
    const cells = p.cells || [], order = p.order || cells.map((_, i) => i), c = order.map((_, j) => ['boom', t0 + stagger(j, order.length, dur, 0.15, 0.72), 0.07])
    const st = {}; order.forEach((ci, j) => { st[ci] = stagger(j, order.length, dur, 0.15, 0.72) })
    const done = LINES3.map(L => Math.max(...L.map(i => st[i] ?? Infinity))).filter(t => t < Infinity).sort((a, b) => a - b)[0]
    if (done != null) { c.push(['bell', t0 + done + 0.3, 1318, 0.05, 2, 0]); if (p.bingo !== false) c.push(['boom', t0 + done + 0.65, 0.15]) }
    return c
  },
}

// ───────────────────────── note: a notes-app card / letter that types itself in
const note = {
  min: p => 1.4 + (p.lines || []).join(' ').length / 26,
  draw(x, p, s) {
    const letter = p.style === 'letter', lines = p.lines || []
    const FS = letter ? 50 : 46, fam = letter ? 'serif' : 'inter', it = letter, wt = letter ? 500 : 700
    const w = Math.min(880, s.w), innerW = w - 140
    x.font = font(FS, { weight: wt, family: fam, italic: it })
    const wrapped = lines.map(l => wrap(x, l.replace(/^- /, ''), innerW - (/^- /.test(l) ? 40 : 0)))
    const lh = FS * 1.45, bodyH = wrapped.reduce((a, b) => a + b.length, 0) * lh + Math.max(0, lines.length - 1) * 16
    const head = p.title ? 130 : 50, h = Math.min(s.h, head + bodyH + 90 + (letter && p.sign ? 80 : 0)), x0 = s.cx - w / 2, y0 = s.cy - h / 2
    const col = letter ? ROSE : GOLD
    if (letter) { x.save(); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; rr(x, x0, y0, w, h, 20); x.fillStyle = '#211543'; x.fill(); x.restore(); rr(x, x0, y0, w, h, 20); ink(x, col, { w: 6, fa: 0, glow: 22 }); rr(x, x0 + 16, y0 + 16, w - 32, h - 32, 12); x.strokeStyle = rgba(col, 0.35); x.lineWidth = 2; x.stroke() }
    else { panel(x, x0, y0, w, h, { col, r: 40 }); rr(x, x0, y0, w, 18, [40, 40, 0, 0]) }
    if (p.title) {
      if (!letter) { label(x, '‹ Notes', x0 + 50, y0 + 58, { size: 36, weight: 700, color: col, align: 'left', shadow: false }); label(x, '•••', x0 + w - 50, y0 + 56, { size: 36, weight: 900, color: col, align: 'right', shadow: false }) }
      label(x, p.title, letter ? x0 + 70 : x0 + 50, y0 + (letter ? 80 : 118), { size: letter ? 58 : 54, weight: letter ? 500 : 900, family: fam, italic: it, align: 'left', color: BONE, maxW: w - 100 })
    }
    // rule lines
    let y = y0 + head + 40
    const total = lines.reduce((a, l) => a + l.length, 0) || 1
    const span = Math.max(0.6, s.dur * 0.72 - 0.25), cps = Math.max(16, total / span)
    let tcur = 0.25
    const arr = arrivals(p, s.prev, 'lines', lines.length, s.dur, 0, 1)
    let caret = null
    lines.forEach((l, i) => {
      const bullet = /^- /.test(l), txt = l.replace(/^- /, ''), start = arr(i) < 0 ? -99 : tcur
      tcur += txt.length / cps + 0.12
      const shown = Math.floor(clamp((s.lt - start) * cps, 0, txt.length))
      let left = shown
      wrapped[i].forEach((wl, j) => {
        const lx = x0 + 70 + (bullet ? 40 : 0), ly = y + lh * 0.5
        if (!letter) { x.beginPath(); x.moveTo(x0 + 40, y + lh - 2); x.lineTo(x0 + w - 40, y + lh - 2); x.strokeStyle = rgba(BONE, 0.08); x.lineWidth = 2; x.stroke() }
        if (bullet && j === 0 && shown > 0) { C(x, x0 + 82, ly + 2, 8); ink(x, col, { w: 4, fa: 1, glow: 10 }) }
        const part = wl.slice(0, Math.max(0, left))
        if (part) label(x, part, lx, ly + 2, { size: FS, weight: wt, family: fam, italic: it, align: 'left', color: BONE, shadow: false })
        if (left > 0 && left <= wl.length && shown < txt.length) { x.font = font(FS, { weight: wt, family: fam, italic: it }); caret = [lx + x.measureText(part).width + 6, ly] }
        left -= wl.length + 1
        y += lh
      })
      if (shown === 0 && s.lt >= start - 0.3 && s.lt < start + 0.01 && i === lines.findIndex((_, k2) => true) - 0) caret = caret || null
      y += 16
    })
    if (!caret) { const last = lines.length - 1; if (s.lt < 0.25) caret = [x0 + 70, y0 + head + 40 + lh * 0.5] }
    if (caret && Math.sin(s.t * 12) > -0.2) { x.beginPath(); x.moveTo(caret[0], caret[1] - FS * 0.55); x.lineTo(caret[0], caret[1] + FS * 0.5); line(x, col, 5, 12) }
    if (letter && p.sign && s.lt > tcur) { const k = clamp((s.lt - tcur) / 0.4); label(x, p.sign, x0 + w - 80, y0 + h - 70, { size: 56, weight: 500, family: 'serif', italic: true, align: 'right', color: col, alpha: k, glow: 12 }); heart(x, x0 + w - 60, y0 + h - 120, 22 * pop01(s.lt, tcur + 0.2, 0.4, 2.6), PINK) }
  },
  cues(p, t0, dur) {
    const lines = p.lines || [], total = lines.reduce((a, l) => a + l.length, 0) || 1, span = Math.max(0.6, dur * 0.72 - 0.25), cps = Math.max(16, total / span), c = []
    let t = 0.25; lines.forEach(l => { const n = l.replace(/^- /, '').length; for (let i = 0; i < n; i += 3) c.push(['tick', t0 + t + i / cps, 0.02]); t += n / cps + 0.12 })
    return c
  },
}

// ───────────────────────── notif: a lock screen; notifications drop in
const APP_ICON = [[/calendar|date|plan/i, 'calendar'], [/alarm|clock|timer/i, 'clock'], [/weather|forecast/i, 'sun'], [/music|song|playlist/i, 'music'], [/mail|letter/i, 'letter'], [/map|direction/i, 'pin'], [/photo|camera|memor/i, 'camera'], [/call|phone/i, 'phone'],
  [/bank|money|pay/i, 'money'], [/fit|gym|step|health/i, 'dumbbell'], [/remind|todo|task/i, 'check'], [/note/i, 'book'], [/ride|car/i, 'car'], [/food|order|deliver/i, 'taco'], [/battery/i, 'battery'], [/horoscope|astro|star|align|deck|card/i, 'star'], [/moon/i, 'moon']]
const appIcon = (name) => (APP_ICON.find(([re]) => re.test(name)) || [0, 'chat'])[1]
const notif = {
  min: p => 1.4 + (p.items || []).length * 0.6,
  draw(x, p, s) {
    const items = p.items || [], n = items.length
    const pw = Math.min(720, s.w * 0.8), ph = Math.min(s.h, 1150), x0 = s.cx - pw / 2, y0 = s.cy - ph / 2
    x.save(); x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 60; rr(x, x0, y0, pw, ph, 64); x.fillStyle = '#0d0822'; x.fill(); x.restore()
    x.save(); rr(x, x0 + 8, y0 + 8, pw - 16, ph - 16, 58); x.clip()
    const gr = x.createLinearGradient(0, y0, 0, y0 + ph); gr.addColorStop(0, '#2a1760'); gr.addColorStop(1, '#120a2c'); x.fillStyle = gr; x.fillRect(x0, y0, pw, ph)
    twinkles(x, s.cx, y0 + ph * 0.6, s.t, { n: 8, R: pw * 0.5, seed: 141, size: 18 })
    // time
    label(x, p.date || 'Friday, June 13', s.cx, y0 + 120, { size: 36, weight: 700, color: rgba(BONE, 0.85) })
    label(x, p.time || '7:12', s.cx, y0 + 230, { size: 170, weight: 800, color: BONE })
    // notifications: newest on top, older ones get pushed down
    const arr = arrivals(p, s.prev, 'items', n, s.dur, 0.15, 0.7)
    const cardW = pw - 56, gap = 18
    x.font = font(40, { weight: 700 })
    const hs = items.map(([, txt]) => Math.min(3, wrap(x, txt || '', cardW - 70).length) * 50 + 104)
    const ins = items.map((_, i) => arr(i) < 0 ? 1 : easeOutBack(prog(s.lt, arr(i), arr(i) + 0.45), 1.5))
    items.forEach(([app, txt, ic], i) => {
      const k = ins[i]
      if (k <= 0) return
      let off = 0; for (let j = i + 1; j < n; j++) off += clamp(ins[j]) * (hs[j] + gap)
      const top = y0 + 350 + off - (1 - clamp(k)) * 120, cx0 = x0 + 28
      const shake = arr(i) < 0 ? 0 : wob(s.lt, arr(i) + 0.3, 40, 8) * 6
      x.save(); x.globalAlpha *= clamp(k * 2); x.translate(shake, 0); popScale(x, s.cx, top, lerp(0.9, 1, clamp(k)))
      rr(x, cx0, top, cardW, hs[i], 34); x.fillStyle = 'rgba(48,34,96,0.82)'; x.fill(); rr(x, cx0, top, cardW, hs[i], 34); ink(x, rgba(BONE, 0.35), { w: 2, fa: 0, glow: 0 })
      const name = ic || appIcon(app || '')
      rr(x, cx0 + 26, top + 22, 54, 54, 14); x.fillStyle = '#1a1033'; x.fill()
      icon(x, name, cx0 + 53, top + 49, 46, null, s.t + i)
      label(x, String(app || '').toUpperCase(), cx0 + 98, top + 50, { size: 34, weight: 800, align: 'left', color: rgba(BONE, 0.8), spacing: 0.04, maxW: cardW - 220, shadow: false })
      label(x, 'now', cx0 + cardW - 28, top + 50, { size: 34, weight: 700, align: 'right', color: rgba(BONE, 0.6), shadow: false })
      x.font = font(40, { weight: 700 })
      wrap(x, txt || '', cardW - 70).slice(0, 3).forEach((l, j) => label(x, l, cx0 + 28, top + 116 + j * 50, { size: 40, weight: 700, align: 'left', color: BONE, shadow: false }))
      x.restore()
    })
    x.restore()
    rr(x, x0, y0, pw, ph, 64); ink(x, color(p.col, VIOLET), { w: 7, fa: 0, glow: 26 })
    rr(x, s.cx - 70, y0 + 22, 140, 34, 17); x.fillStyle = '#000'; x.fill()
  },
  cues(p, t0, dur, ctx = {}) { const items = p.items || [], arr = arrivals(p, ctx.prev, 'items', items.length, dur, 0.15, 0.7); return items.map((_, i) => arr(i) < 0 ? null : ['bell', t0 + arr(i), [1318, 1175, 1568, 988][i % 4], 0.045, 0.9, 0]).filter(Boolean) },
}

export default {
  fact, word, versus, checklist, meter, flags, icons: iconsK, timeline, clock, heart: heartK, scale: scaleK, bars, calendar,
  ghost: ghostK, butterflies, grid: gridK, note, notif,
}
export { icon }
