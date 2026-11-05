// RANKING THE SIGNS: FULL COUNTDOWN — the shared look of the six long star_talk posts kxrke01–kxrke06
// (promo/films/month2/m43.md). Each episode folder holds only its data and imports this kit read-only.
// It continues the nrke01–24 look (twelve-row leaderboard, THE STARS with a clipboard on the left, Pisces sniffling
// into a tissue box on the right, gold / silver / bronze chips, crown and confetti for #1), at full length.
// No end card, no card transition, no logo (Month 2 rules); DURATION is the story.
//
// The format (DURATION ≈ 88 s, hard cut):
//   0.00–4.20   hook. Frame 0: the twelve "? ? ?" plates frozen mid-flight off the board (record-scratch freeze),
//               the episode's hook prop mid-slam in the middle, the question big at the top, Pisces mid-sob.
//               0.5 the plates fly back into their slots; 1.2 the promise sticker "WAIT FOR #1"; 3.6 the prop exits.
//   4.20–70.20  ranks #12 → #2, one every 6 s. Each: the row slams in, the sign hops centre stage and says its line
//               in a bubble (+0.5), then its prop gag pops (+3.0) with a label, then a whoosh out (+5.7).
//               Chapter stickers: THE BOTTOM FOUR (4.2) · THE MIDDLE (28.2) · THE PODIUM (52.2) · NUMBER ONE (70.2).
//   70.20–73.60 drumroll: the #1 slot shakes, Pisces can't look.
//   73.60–80.00 #1 slams in gold: crown, confetti, the sign centre stage, its line and gag.
//   80.00–84.20 the twist (pays off the promise): a voice from off the board, a big prop, the whole board reacts.
//   84.40–      THE STARS say the last line in the dialogue box; hard cut ≈ 1 s after it is readable.
// Pisces cries in every film (tears all film; streams when its own row lands; fountains at #1 and the twist).
//
//   makeRankFull(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hook ('Left on read. | Who *spirals* worst?'), cfg.hookProp (a gag, see drawGag), cfg.promise,
//     cfg.ranks: 12 × { sign, tag (board, ≤ 30 chars), say (bubble, ≤ 28 chars), gag: { kind, ... }, mood? }, #1 first
//     cfg.twist: { who, say, gag, cheer, mood?, dim? }   cfg.last (THE STARS, ≤ 44 chars, *accent*)
//     cfg.fx: optional hookkit-style helpers { whip(t) → zoom, ... } (wired in index files once hookkit is in)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, screenShake, shakeCues, chapter, chapterCues, countdown, countdownCues } from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e'
export const SILVER = '#cfd6e6', BRONZE = '#d9925a', MINT = '#9fe6b0', SKYB = '#8fd3ff', LAV = '#c9a6ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inBack = p => { const c = 1.70158; return (c + 1) * p * p * p - c * p * p }
export const outBack = p => easeOutBack(p, 1.70158)
export { clamp, lerp, prog, ease, easeOutBack }

// ── the fixed timeline (same in all six films)
const LAND = {}
for (let r = 12; r >= 2; r--) LAND[r] = r3(4.2 + (12 - r) * 6.0)
LAND[1] = 73.6
export const T = {
  land: LAND, drum: [70.2, 73.6], reveal: 73.6, twist: 80.0, twistEnd: 84.2,
  chapters: [[4.2, 'THE BOTTOM FOUR'], [28.2, 'THE MIDDLE'], [52.2, 'THE PODIUM'], [70.2, 'NUMBER ONE']],
  starsTalk: 84.6, boxOpen: 84.4,
}
const CPS = 30
const spanEnd = r => r === 2 ? T.drum[0] : r === 1 ? T.twist : LAND[r - 1]

// ── layout
const BX = 56, BW = 968, BY = 352, PITCH = 64, RH = 56
const rowY = r => BY + (r - 1) * PITCH
const CENTER = { x: 540, y: 1450 }
const STARS_AT0 = { x: 160, y: 1450, s: 170 }
const PIS_AT0 = { x: 924, y: 1458, s: 150 }
const BUBBLE_Y = 1250
const LIFT = t => 150 * ease.inOutCubic(prog(t, T.boxOpen - 0.5, T.boxOpen))   // the cast steps up above the dialogue box

// ── drawing helpers (the nrke pixel language)
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 5 } = {}) { R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h) }
export function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, rot = 0 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const CROWN = ['G..G..G', 'GG.G.GG', 'GGGGGGG', 'GRGGGRG', 'GGGGGGG']
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.6, 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
function confetti(x, t, t0, cx, cy, { n = 34, life = 2.4, cols = [GOLD, PINK, '#7fd0ff', MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.8, v = 560 + 300 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 700 * tt * tt
    const sz = 11 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
function hearts(x, t, t0, cx, cy, { n = 6, cell = 6, spread = 160, life = 1.5 } = {}) {
  const cols = ['#ff5c8a', PINK, GOLD]
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.14, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % 3] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 220, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** pixel speech bubble centred on (cx, cy); k = pop scale; tail = -1…1 along the bottom edge */
export function bubble(x, cx, cy, text, k, { col = BONE, size = 36, tail = 0, who = null, whoCol = GOLD, maxW = 900 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  let s = size, w0 = x.measureText(text).width
  if (w0 > maxW - 48) { s = Math.floor(size * (maxW - 48) / w0); x.font = `800 ${s}px ${INTER}`; w0 = x.measureText(text).width }
  const w = w0 + 48, h = s + 34
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  if (who) {
    x.font = `700 22px ${MONO}`
    const ww = x.measureText(who).width + 24
    R(x, INK, -w / 2 + 10, -h / 2 - 26, ww + 8, 34); R(x, whoCol, -w / 2 + 14, -h / 2 - 22, ww, 26)
    x.fillStyle = INK; x.textAlign = 'left'; x.fillText(who, -w / 2 + 26, -h / 2 - 8)
  }
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
function card(x, cx, cy, w, h, lines, { col = BONE, ink = INK, size = 34, rot = 0, font = INTER, weight = 800, gap = 1.18 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `${weight} ${size}px ${font}`
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * gap + 2))
  x.restore()
}

// ── the prop gags. drawGag(x, t, g, cx, cy, k, t0): g.kind picks the prop; t0 = when it popped (for its motion)
function phone(x, t, cx, cy, s, { text = '', sub = '', glow = 0, col = '#2a2148' } = {}) {
  const w = 150 * s, h = 270 * s
  box(x, cx - w / 2, cy - h / 2, w, h, col, { b: 7 })
  R(x, glow ? '#3d6fbf' : '#162a52', cx - w / 2 + 10 * s, cy - h / 2 + 26 * s, w - 20 * s, h - 60 * s)
  if (glow) { x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(cx, cy, 10, cx, cy, h * 0.8); gg.addColorStop(0, `rgba(143,211,255,${0.3 * glow})`); gg.addColorStop(1, 'rgba(143,211,255,0)'); x.fillStyle = gg; x.fillRect(cx - h, cy - h, h * 2, h * 2); x.restore() }
  R(x, '#0d0a1c', cx - 18 * s, cy + h / 2 - 22 * s, 36 * s, 8 * s)
  if (text) {
    x.save(); x.font = `800 ${Math.round(30 * s)}px ${INTER}`
    const tw = Math.min(w - 26 * s, x.measureText(text).width + 22 * s)
    R(x, INK, cx - tw / 2 - 3, cy - 40 * s - 3, tw + 6, 50 * s + 6); R(x, BONE, cx - tw / 2, cy - 40 * s, tw, 50 * s)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    const fs = Math.min(30 * s, 30 * s * (w - 40 * s) / Math.max(1, x.measureText(text).width))
    x.font = `800 ${Math.round(fs)}px ${INTER}`; x.fillText(text, cx, cy - 14 * s)
    x.restore()
  }
  if (sub) label(x, sub, cx, cy + 46 * s, { size: Math.round(20 * s), col: SKYB })
}
function clockFace(x, cx, cy, r, h, m, { col = BONE } = {}) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * r * 0.82 - 4, cy - Math.cos(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, len, wd) => { x.save(); x.translate(cx, cy); x.rotate(a); R(x, INK, -wd / 2, -len, wd, len); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 10); hand(m / 60 * Math.PI * 2, r * 0.76, 7)
  R(x, RED, cx - 6, cy - 6, 12, 12)
  x.restore()
}
function tissueBox(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4 }); R(x, '#c9ecfb', cx - s / 2, cy - s * 0.3, s, s * 0.12)
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
const CAP = s => s.toUpperCase()
export function drawGag(x, t, g, cx, cy, k, t0 = 0) {
  if (!g || k <= 0.01) return
  const u = Math.max(0, t - t0)
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  const L = g.label
  switch (g.kind) {
    case 'phone': {      // { text, sub, buzz }
      const bz = g.buzz ? Math.sin(u * 60) * 6 * Math.exp(-((u % 1.2)) * 3) : 0
      phone(x, t, cx + bz, cy, g.s || 0.8, { text: g.text, sub: g.sub, glow: g.glow ? 1 : 0.4 })
      if (g.typing) for (let i = 0; i < 3; i++) R(x, BONE, cx - 30 + i * 24, cy + 60 + (Math.floor(u * 4 + i) % 3 === 0 ? -6 : 0), 14, 14)
      break
    }
    case 'clock': {      // { h, m, spin }
      const m = g.spin ? g.m + u * g.spin : g.m
      clockFace(x, cx, cy, 80, g.h + Math.floor(m / 60), m % 60)
      break
    }
    case 'stamp': {      // { text, col }
      const p = clamp(u / 0.18), sc = lerp(2.2, 1, ease.outCubic(p))
      x.save(); x.translate(cx, cy); x.rotate(-0.16); x.scale(sc, sc); x.globalAlpha *= clamp(p * 2)
      x.font = `900 ${g.size || 70}px ${INTER}`
      const w = x.measureText(g.text).width + 50, h = (g.size || 70) + 30
      x.strokeStyle = g.col || RED; x.lineWidth = 10; x.strokeRect(-w / 2, -h / 2, w, h)
      x.fillStyle = g.col || RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g.text, 0, 4)
      x.restore()
      break
    }
    case 'meter': {      // { to (0..1), label }
      const v = (g.to ?? 1) * outBack(clamp(u / 0.8)) + (g.to >= 1 ? 0.04 * Math.sin(u * 30) : 0)
      box(x, cx - 150, cy - 90, 300, 150, '#241a46', { b: 6 })
      for (let i = 0; i < 10; i++) { const a = Math.PI + i / 9 * Math.PI; R(x, i > 6 ? RED : i > 3 ? GOLD : MINT, cx + Math.cos(a) * 105 - 8, cy + 40 + Math.sin(a) * 105 - 8, 16, 16) }
      x.save(); x.translate(cx, cy + 40); x.rotate(-Math.PI / 2 + clamp(v, 0, 1.05) * Math.PI - Math.PI / 2); R(x, BONE, -4, -95, 8, 95); x.restore()
      R(x, INK, cx - 12, cy + 28, 24, 24)
      break
    }
    case 'tissues': {
      tissueBox(x, cx, cy + 30, 150)
      for (let i = 0; i < 5; i++) { const p = ((u * 1.4 + i / 5) % 1); x.save(); x.globalAlpha *= 1 - p; x.translate(cx + Math.sin(i * 2.1) * 120 * p, cy - 40 - p * 200); x.rotate(p * 4 + i); R(x, INK, -22, -16, 44, 32); R(x, '#ffffff', -19, -13, 38, 26); x.restore() }
      break
    }
    case 'note': {       // { lines, col }
      card(x, cx, cy, g.w || 360, (g.lines.length * 44 + 60), g.lines, { col: g.col || '#fffaf0', size: 36, rot: -0.05 + 0.02 * Math.sin(u * 3), font: SERIF, weight: 'italic 600' })
      break
    }
    case 'heart': {      // { crack, beat }
      const b = 1 + 0.12 * Math.max(0, Math.sin(u * 9))
      drawBits(x, HEART, { H: '#ff5c8a' }, cx, cy, 24 * b)
      if (g.crack) { x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy - 60); x.lineTo(cx - 18, cy - 20); x.lineTo(cx + 14, cy + 6); x.lineTo(cx - 6, cy + 50); x.stroke(); x.restore() }
      break
    }
    case 'slide': {      // { title, bars }
      box(x, cx - 190, cy - 120, 380, 230, '#fffaf0', { b: 6 })
      label(x, g.title, cx, cy - 86, { size: 26, col: INK, font: INTER, weight: 800 })
      const bars = g.bars || [0.4, 0.7, 1]
      bars.forEach((v, i) => { const hh = 120 * v * outBack(clamp((u - i * 0.18) / 0.4)); R(x, [SKYB, PINK, GOLD][i % 3], cx - 130 + i * 100, cy + 90 - hh, 60, hh) })
      R(x, INK, cx - 160, cy + 90, 320, 6)
      break
    }
    case 'calendar': {   // { text, sub }
      box(x, cx - 130, cy - 120, 260, 230, BONE, { b: 6 }); R(x, RED, cx - 130, cy - 120, 260, 60)
      label(x, g.sub || 'PLANNED', cx, cy - 90, { size: 24, col: BONE })
      label(x, g.text, cx, cy + 10, { size: g.size || 64, col: INK, font: INTER, weight: 900 })
      break
    }
    case 'ticket': {     // { text, sub }
      x.save(); x.translate(cx, cy); x.rotate(-0.08 + 0.03 * Math.sin(u * 2))
      box(x, -190, -80, 380, 160, '#fff1c8', { b: 6 }); R(x, PINK, -190, -80, 380, 34)
      for (let i = 0; i < 6; i++) R(x, INK, 110, -60 + i * 24, 6, 12)
      label(x, g.sub || 'BOARDING PASS', -40, -63, { size: 20, col: INK })
      label(x, g.text, -40, 14, { size: 44, col: INK, font: INTER, weight: 900 })
      x.restore()
      break
    }
    case 'mirror': {     // { col (reflection colour) }
      x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 120, 160, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#c8a46a'; x.beginPath(); x.ellipse(cx, cy, 112, 152, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#a9d6ef'; x.beginPath(); x.ellipse(cx, cy, 94, 134, 0, 0, Math.PI * 2); x.fill(); x.restore()
      drawStarChar(x, cx, cy + 10, 130, t, { color: g.col || PINK, mood: 'happy', look: [0, 0], tips: false, glow: 0.4, seed: 11 })
      x.save(); x.globalAlpha *= 0.5; R(x, '#ffffff', cx - 60, cy - 100, 18, 70); x.restore()
      break
    }
    case 'megaphone': {  // { text }
      x.save(); x.translate(cx - 60, cy); x.rotate(-0.2 + 0.05 * Math.sin(u * 20))
      x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -36); x.lineTo(80, -90); x.lineTo(80, 90); x.lineTo(-70, 36); x.closePath(); x.fill()
      x.fillStyle = RED; x.beginPath(); x.moveTo(-62, -28); x.lineTo(72, -80); x.lineTo(72, 80); x.lineTo(-62, 28); x.closePath(); x.fill()
      R(x, INK, -100, -26, 40, 52); R(x, BONE, -94, -20, 30, 40)
      x.restore()
      if (g.text) label(x, g.text, cx + 110, cy - 4 + 4 * Math.sin(u * 25), { size: 46, col: GOLD, font: INTER, weight: 900, rot: -0.12 })
      break
    }
    case 'snack': {      // a plate with cookies (bites taken over time)
      x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy + 40, 150, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4efe6'; x.beginPath(); x.ellipse(cx, cy + 36, 140, 40, 0, 0, Math.PI * 2); x.fill(); x.restore()
      for (let i = 0; i < 3; i++) { const X = cx - 70 + i * 70; x.save(); x.fillStyle = INK; x.beginPath(); x.arc(X, cy + 10, 42, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a35a'; x.beginPath(); x.arc(X, cy + 10, 36, 0, Math.PI * 2); x.fill(); x.restore(); R(x, '#5a3420', X - 10, cy, 8, 8); R(x, '#5a3420', X + 8, cy + 14, 8, 8) }
      break
    }
    case 'camera': {     // a selfie flash
      box(x, cx - 120, cy - 70, 240, 150, '#3a3352', { b: 6 }); R(x, '#5a5470', cx - 60, cy - 92, 70, 22)
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy + 6, 52, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fb3e0'; x.beginPath(); x.arc(cx, cy + 6, 40, 0, Math.PI * 2); x.fill(); x.restore()
      const f = 1 - clamp(((u % 1.1)) / 0.25)
      if (f > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,250,235,${0.6 * f})`; x.beginPath(); x.arc(cx + 80, cy - 50, 120 * f + 20, 0, Math.PI * 2); x.fill(); x.restore() }
      break
    }
    case 'moon': {
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4ecd2'; x.beginPath(); x.arc(cx, cy, 88, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#d9cfb0'; for (const [a, b, r] of [[-30, -20, 18], [24, 30, 14], [10, -40, 10]]) { x.beginPath(); x.arc(cx + a, cy + b, r, 0, Math.PI * 2); x.fill() }
      x.restore()
      for (let i = 0; i < 6; i++) drawPixelStar(x, cx + Math.cos(i + u) * 150, cy + Math.sin(i * 1.7 + u) * 110, 18, 1, GOLD)
      break
    }
    case 'hoodie': {
      x.save(); x.translate(cx, cy); x.rotate(0.05 * Math.sin(u * 2))
      box(x, -110, -70, 220, 190, g.col || '#6a7fc0', { b: 6 }); box(x, -160, -60, 50, 150, g.col || '#6a7fc0', { b: 6 }); box(x, 110, -60, 50, 150, g.col || '#6a7fc0', { b: 6 })
      R(x, INK, -50, -96, 100, 36); R(x, '#4a5f9a', -42, -90, 84, 26); R(x, '#4a5f9a', -60, 40, 120, 50); R(x, BONE, -20, -60, 6, 50); R(x, BONE, 14, -60, 6, 50)
      x.restore()
      break
    }
    case 'map': {
      x.save(); x.translate(cx, cy); x.rotate(-0.05)
      box(x, -190, -120, 380, 240, '#f3e3b8', { b: 6 })
      x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath(); x.moveTo(-150, 70); x.bezierCurveTo(-60, -90, 40, 90, 140, -70); x.stroke(); x.setLineDash([])
      for (const [a, b] of [[-150, 70], [0, 10], [140, -70]]) { R(x, INK, a - 12, b - 12, 24, 24); R(x, RED, a - 8, b - 8, 16, 16) }
      x.restore()
      break
    }
    case 'plant': {
      box(x, cx - 60, cy + 20, 120, 90, '#c0643a', { b: 6 })
      for (let i = 0; i < 5; i++) { x.save(); x.translate(cx, cy + 20); x.rotate(-0.9 + i * 0.45 + 0.05 * Math.sin(u * 3 + i)); box(x, -12, -120, 24, 110, i % 2 ? '#3fa862' : '#2f8a4e', { b: 4 }); x.restore() }
      break
    }
    case 'list': {       // { lines }  a to-do list getting longer
      const n = Math.min(g.lines.length, 1 + Math.floor(u * 3))
      box(x, cx - 170, cy - 140, 340, 280, '#fffaf0', { b: 6 })
      for (let i = 0; i < n; i++) { R(x, INK, cx - 140, cy - 108 + i * 50, 22, 22); R(x, '#fffaf0', cx - 136, cy - 104 + i * 50, 14, 14); label(x, g.lines[i], cx - 104, cy - 96 + i * 50, { size: 26, col: INK, align: 'left', font: INTER, weight: 700 }) }
      break
    }
    case 'sign': {       // { text, col } a hand-held placard on a stick
      R(x, INK, cx - 8, cy, 16, 150); R(x, '#a0703f', cx - 4, cy, 8, 150)
      card(x, cx, cy - 30, g.w || 300, 120, [g.text], { col: g.col || GOLD, size: g.size || 54, rot: 0.06 * Math.sin(u * 5), font: INTER, weight: 900 })
      break
    }
    case 'charger': {    // phones asleep on chargers
      for (let i = 0; i < 3; i++) { phone(x, t, cx - 130 + i * 130, cy, 0.45, {}); R(x, INK, cx - 130 + i * 130 - 3, cy + 64, 6, 60); label(x, 'Zz', cx - 120 + i * 130, cy - 90 - 8 * Math.sin(u * 3 + i), { size: 28, col: SKYB }) }
      R(x, INK, cx - 200, cy + 120, 400, 10)
      break
    }
    case 'big': {        // { text, col } a huge bold word bouncing
      const b = 1 + 0.06 * Math.sin(u * 10)
      label(x, g.text, cx, cy, { size: Math.round((g.size || 96) * b), col: g.col || GOLD, font: INTER, weight: 900, rot: -0.06 })
      break
    }
    default: break
  }
  x.restore()
  if (L) label(x, CAP(L), cx, cy + (g.labelDy ?? 150) * k, { size: 30, col: g.labelCol || GOLD, alpha: clamp(k) })
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so tears sit on the sprite through hops
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** Pisces' paws over its eyes (sprite cells) */
function pawsCells(ctx) {
  for (const X of [7.5, 20.5]) { ctx.fillStyle = INK; ctx.fillRect(X - 0.6, 17.4, 9.2, 6.2); ctx.fillStyle = '#c9b8ff'; ctx.fillRect(X, 18, 8, 5) }
}

// ── the bug: "RANKING THE SIGNS" in Inter 800 small caps, letter-spaced, top-left (on from frame 0)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: GOLD, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(242,199,92,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'RANKING<span style="color:rgba(255,255,255,0.62)">&nbsp;THE&nbsp;SIGNS</span>')
  return { update() {} }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeRankFull(cfg) {
  if (!cfg.ranks || cfg.ranks.length !== 12) throw new Error(`${cfg.id}: needs 12 ranks`)
  const K = cfg.kit || {}             // hookkit helpers (optional): see the index files
  const RANKS = cfg.ranks.map((o, i) => ({ r: i + 1, ...o, ...signStar(o.sign), name: o.sign.toUpperCase(), at: LAND[i + 1] }))
  const PIS = signStar('pisces')
  const pisRank = RANKS.find(o => o.sign === 'pisces').r
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.starsTalk, speaker: SPEAK, text: cfg.last }]
  const lineDone = T.starsTalk + cfg.last.replace(/\*/g, '').length / CPS + 0.4
  const DURATION = r3(Math.max(lineDone + 1.6, 87.6))
  const boxClose = DURATION + 1                // never closes on screen: the hard cut lands on the held line
  const STARS_HOPS = [-0.12, 1.25, ...T.chapters.map(c => c[0] + 0.05), T.reveal + 0.06, T.twist + 1.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const PIS_HOPS = [-0.18, 0.6, LAND[pisRank] + 0.02, T.reveal + 0.1, T.reveal + 0.55, T.twist + 2.3, T.twist + 2.7]
  const order = [...RANKS].sort((a, b) => a.at - b.at)
  const current = t => { let c = null; for (const o of order) if (t >= o.at) c = o; return (t >= T.drum[0] && t < T.reveal) || t >= T.twist ? null : c }
  // the hook plates: each "? ? ?" plate starts frozen mid-flight at a scattered spot
  const PLATES = Array.from({ length: 12 }, (_, i) => {
    const a = i * 2.39996 + 0.7
    return { r: i + 1, x: 540 + Math.cos(a) * (260 + (i * 53) % 220), y: 760 + Math.sin(a) * (420 + (i * 37) % 240), rot: ((i * 0.77) % 1.6) - 0.8 }
  })
  const PLATE_BACK = [0.5, 1.25]
  // hookkit: the slam title is already landed on frame 0; the whip zoom as the plates fly home; a shake as they land
  const HOOK = { at: -1, text: cfg.hook, top: 132, size: 92, width: 980 }
  const WHIP = { at: 0.42, len: 0.45, from: 1.45 }
  const SHAKE = { at: 1.27, len: 0.45, amp: 22 }
  const SHAKE1 = { at: T.reveal, len: 0.5, amp: 26 }
  const CHAPS = T.chapters.map(([at, title], i) => ({ at, out: [at + 1.55, at + 1.75], n: i + 1, title, x: 70, y: 620, color: i === 3 ? GOLD : PINK }))
  const COUNT = { at: 71.0, from: 3, gap: 0.8, go: null, y: 760 }

  async function build(stage) {
    try {
      await Promise.all(["800 76px Inter", "900 70px Inter", "800 30px Inter", "800 28px Inter", "600 27px Inter", "700 30px Inter", "italic 500 104px 'EB Garamond'", "italic 600 36px 'EB Garamond'", "700 26px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1500, open: T.boxOpen, close: boxClose, cps: CPS })
    const bug = buildBug(root)
    const fxc = layerCanvas(root, { pointerEvents: 'none' }), fx = fxc.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    const TAG_X = 420, TAG_W = 1004 - TAG_X
    for (const o of RANKS) {
      x.font = `600 27px ${INTER}`
      o.tagSize = Math.min(27, Math.floor(27 * TAG_W / Math.max(1, x.measureText(o.tag).width)))
      x.font = `800 30px ${INTER}`
      o.nameSize = Math.min(30, Math.floor(30 * 172 / Math.max(1, x.measureText(o.name).width)))
    }
    const chipCol = r => r === 1 ? GOLD : r === 2 ? SILVER : r === 3 ? BRONZE : BONE
    const cheer = t => t >= T.twist + 2.2 && t < T.twistEnd + 1.5

    function plate(x, X, Y, r, rot, t) {
      x.save(); x.translate(X + BW / 2, Y + RH / 2); x.rotate(rot); x.translate(-BW / 2, -RH / 2)
      const hk = t < PLATE_BACK[1] + 0.2
      box(x, 0, 0, BW, RH, hk ? '#3a2a6e' : 'rgba(22,14,48,0.9)', { b: 4 })
      if (hk) R(x, GOLD, 0, 0, 10, RH)
      x.font = `700 26px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      x.fillStyle = hk ? BONE : 'rgba(239,230,214,0.5)'; x.fillText(`#${r}`, 22, RH / 2 + 1)
      x.fillStyle = r === 1 && t >= T.drum[0] ? GOLD : hk ? GOLD : 'rgba(239,230,214,0.32)'; x.textAlign = 'center'
      x.fillText('? ? ?', BW / 2 + 40, RH / 2 + 1)
      x.restore()
    }

    function board(t) {
      for (let r = 12; r >= 1; r--) {
        const o = RANKS[r - 1], y = rowY(r)
        const landed = t >= o.at
        const p = landed ? easeOutBack(prog(t, o.at, o.at + (r <= 3 ? 0.34 : 0.26)), r <= 3 ? 1.8 : 1.5) : 0
        const dx = landed ? (1 - p) * 420 : 0
        let shake = 0
        if (r === 1 && t >= T.drum[0] && t < T.reveal) shake = 9 * Math.sin(t * 70) * prog(t, T.drum[0], T.reveal)
        const punch = landed && r <= 3 ? 1 + 0.08 * Math.exp(-(t - o.at) * 7) : 1
        const hop = cheer(t) ? -Math.abs(Math.sin((t - T.twist) * 7 + r * 0.6)) * 14 : 0
        // hook: plates fly from their frozen mid-air spots back into the slots
        if (!landed && t < PLATE_BACK[1] + 0.3) {
          const P = PLATES[r - 1]
          const q = t < PLATE_BACK[0] ? 0 : easeOutBack(prog(t, PLATE_BACK[0] + (12 - r) * 0.03, PLATE_BACK[1] + (12 - r) * 0.03), 1.4)
          plate(x, lerp(P.x - BW / 2, BX, q), lerp(P.y, y, q), r, lerp(P.rot, 0, q), t)
          continue
        }
        x.save()
        x.translate(BX + BW / 2 + dx + shake, y + RH / 2 + hop); x.scale(punch, punch); x.translate(-(BX + BW / 2), -(y + RH / 2))
        if (!landed || p < 0.6) plate(x, BX, y, r, 0, t)
        if (landed) {
          const glow = r === 1 ? 0.5 + 0.2 * Math.sin(t * 6) : 0
          if (r === 1) { x.save(); x.shadowColor = 'rgba(242,199,92,0.9)'; x.shadowBlur = 30 * glow; box(x, BX, y, BW, RH, '#2a1d4f', { b: 6 }); x.restore() }
          const isCur = current(t) === o
          box(x, BX, y, BW, RH, r === 1 ? '#3a2766' : isCur ? 'rgba(58,40,110,0.98)' : 'rgba(34,24,70,0.95)', { b: r === 1 ? 6 : 4 })
          R(x, o.color, BX, y, 10, RH)
          box(x, BX + 22, y + 8, 76, RH - 16, chipCol(r), { b: 3 })
          x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
          x.fillText(`#${r}`, BX + 60, y + RH / 2 + 1)
          const mood = cfg.twist?.mood && t >= T.twist + 2.2 ? cfg.twist.mood : r === 1 ? 'sparkle' : cheer(t) ? 'happy' : o.sign === 'pisces' ? 'wide' : 'happy'
          drawStarChar(x, BX + 140, y + RH / 2 + 2, 52, t, { color: o.color, mood, seed: r, glow: 0.6, bob: 1.2, tips: false })
          if (o.sign === 'pisces') { const F = starFrame(BX + 140, y + RH / 2 + 2, 52, t, { seed: r, bob: 1.2 }); inSprite(x, F, () => tearsCells(x, t, 2)) }
          x.font = `800 ${o.nameSize}px ${INTER}`; x.textAlign = 'left'
          x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(o.name, BX + 178 + 2, y + RH / 2 + 3)
          x.fillStyle = o.color; x.fillText(o.name, BX + 178, y + RH / 2 + 1)
          x.font = `600 ${o.tagSize}px ${INTER}`; x.fillStyle = BONE
          x.fillText(o.tag, TAG_X, y + RH / 2 + 2)
          const fl = 1 - prog(t, o.at, o.at + 0.25)
          if (fl > 0) { x.fillStyle = `rgba(255,248,230,${0.55 * fl})`; x.fillRect(BX, y, BW, RH) }
          if (isCur && r > 1) { x.save(); x.strokeStyle = `rgba(242,199,92,${0.5 + 0.3 * Math.sin(t * 8)})`; x.lineWidth = 4; x.strokeRect(BX - 9, y - 9, BW + 18, RH + 18); x.restore() }
          if (r === 1) drawBits(x, CROWN, { G: GOLD, R: RED }, BX + 60, y - 6 - 3 * Math.sin(t * 5), 5)
        }
        x.restore()
        if (landed && r <= 3) sparkles(x, t, BX + BW / 2, y + RH / 2, o.at + 0.05, r === 1 ? 16 : 10, r === 1 ? 520 : 420, r, r === 1 ? [GOLD, BONE, PINK] : [r === 2 ? SILVER : BRONZE, BONE])
      }
    }

    function clipboard(x, F, t) {
      const cx = F.ox + F.S * 0.42, cy = F.cy + F.S * 0.05
      x.save(); x.translate(cx, cy); x.rotate(-0.12)
      box(x, -30, -40, 60, 80, '#c08a52', { b: 4 }); R(x, BONE, -24, -30, 48, 64); R(x, '#8a8a9a', -12, -46, 24, 10)
      for (let i = 0; i < 4; i++) R(x, 'rgba(27,18,54,0.55)', -18, -20 + i * 13, 36 - (i % 2) * 10, 4)
      const sc = t < T.drum[0] ? 1 : 0
      const px = -6 + sc * 12 * Math.sin(t * 17), py = -10 + sc * 8 * Math.sin(t * 11)
      x.save(); x.translate(px, py); x.rotate(0.6); R(x, INK, -4, -34, 8, 40); R(x, GOLD, -2, -32, 4, 34); x.restore()
      x.restore()
    }
    function stars(t) {
      const STARS_AT = { ...STARS_AT0, y: STARS_AT0.y - LIFT(t) }
      const F = starFrame(STARS_AT.x, STARS_AT.y, STARS_AT.s, t, { hops: STARS_HOPS, seed: 2 })
      let mood = 'neutral', look = [1, -1]
      if (t < 1.2) { mood = 'wide'; look = [0.6, -0.6] }
      else if (t >= T.drum[0] && t < T.reveal) { mood = 'wide'; look = [1, -1] }
      else if (t >= T.twist) { mood = t >= T.twist + 2.2 ? 'happy' : 'wide'; look = [1, -0.3] }
      else if (t >= T.reveal) { mood = 'sparkle'; look = [1, -0.2] }
      else { const c = current(t); if (c && t - c.at > 3.0) { mood = 'squint'; look = [1, 0] } }
      shadow(x, STARS_AT.x, STARS_AT.y + 96, 140)
      drawStarChar(x, STARS_AT.x, STARS_AT.y, STARS_AT.s, t, { color: STAR.sky, mood, look, hops: STARS_HOPS, seed: 2, glow: 1.05 })
      if (t < T.reveal + 0.3) clipboard(x, F, t)
    }
    function pisces(t, P, tears, mood, look, paws = false) {
      const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.85, pop: P.pop ?? 1, hops: P.hops, tips: false }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts)
      if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
      if (paws) inSprite(x, F, () => pawsCells(x))
      return F
    }

    function hookProp(t) {
      if (t > 3.9 || !cfg.hookProp) return
      // frame 0: mid-slam (overshoot + tilt), settles by 0.6, shrinks away at 3.4–3.9
      const k = t < 0.5 ? 1.18 - 0.08 * Math.sin(t * 30) * (1 - t / 0.5) : 1 + 0.03 * Math.sin(t * 6)
      const out = 1 - inBack(prog(t, 3.4, 3.9))
      const g = cfg.hookProp
      x.save(); x.translate(540, 1300); x.rotate((t < 0.5 ? -0.12 : -0.04) * out); x.translate(-540, -1300)
      drawGag(x, t, g, 540, 1300, k * out * (g.k || 1.15), -0.3)
      x.restore()
    }

    function stage_(t) {
      const c = current(t)
      const pisCentre = c && c.sign === 'pisces'
      const drum = t >= T.drum[0] && t < T.reveal
      const tears = t >= T.twist + 2.2 ? 3 : t >= T.reveal ? 3 : drum ? 1 : t >= LAND[pisRank] && t < LAND[pisRank] + 6 ? 3 : t < 1.2 ? 3 : 2
      const PIS_AT = { ...PIS_AT0, y: PIS_AT0.y - LIFT(t) }
      if (!pisCentre && !(t >= T.reveal && t < T.twist && pisRank === 1)) {
        tissueBox(x, PIS_AT.x - 104, PIS_AT.y + 66, 66)
        shadow(x, PIS_AT.x, PIS_AT.y + 90, 132)
        const pm = drum ? 'wide' : t >= T.reveal ? 'sparkle' : 'wide'
        pisces(t, { ...PIS_AT, hops: PIS_HOPS }, drum ? 0 : tears, pm, [-1, -0.6], drum)
      }
      if (t < 4.2) hookProp(t)
      // the twist
      if (t >= T.twist && t < DURATION + 1) twist(t)
      if (!c) return
      const one = c.r === 1, top = c.r <= 3
      const s = one ? 250 : top ? 220 : 196
      const end = spanEnd(c.r)
      const outP = one ? 1 : 1 - inBack(prog(t, end - 0.3, end))
      const k = pop01(t, c.at, one ? 0.42 : 0.3, one ? 2.4 : 2.0) * outP
      if (k <= 0.01) return
      const y = CENTER.y
      const hops = [c.at + 0.02, c.at + 0.55, c.at + 3.0, ...(one ? [T.reveal + 1.0, T.reveal + 3.6] : [])]
      shadow(x, CENTER.x, y + s * 0.5, s * 0.8 * k)
      if (one) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(CENTER.x, y, 20, CENTER.x, y, 300); g.addColorStop(0, `rgba(255,236,180,${0.22 * k})`); g.addColorStop(1, 'rgba(255,236,180,0)'); x.fillStyle = g; x.fillRect(CENTER.x - 300, y - 300, 600, 600); x.restore() }
      const gagOn = t >= c.at + 3.0
      const mood = c.mood && !gagOn ? c.mood : (c.mood2 && gagOn ? c.mood2 : one ? 'sparkle' : top ? 'heart' : ['happy', 'wink', 'sparkle', 'squint'][c.r % 4])
      // the gag sits beside the sign (left of centre) so the bubble stays above
      const gk = pop01(t, c.at + 3.0, 0.3, 2.2) * outP
      if (pisCentre) pisces(t, { x: CENTER.x, y, s, pop: k, hops }, 3, mood === 'heart' ? 'wide' : mood, [0, -0.3])
      else drawStarChar(x, CENTER.x, y, s, t, { color: c.color, glyph: c.glyph, mood, look: gagOn ? [0, -0.4] : [0, 0], hops, pop: k, seed: 3 + c.r, glow: 1.1 })
      if (one) {
        const F = starFrame(CENTER.x, y, s, t, { pop: k, hops, seed: 3 + c.r })
        drawBits(x, CROWN, { G: GOLD, R: RED }, CENTER.x, F.cy - F.S * 0.47, F.cell * 1.4)
      }
      sparkles(x, t, CENTER.x, y, c.at + 0.02, 8, 170, c.r, [c.color, BONE, GOLD])
      // the line, then the gag (gag replaces the bubble in the same spot above the sign)
      const bk = pop01(t, c.at + 0.45, 0.25, 2.4) * (1 - ease.inQuad(prog(t, c.at + 2.85, c.at + 3.05)))
      bubble(x, CENTER.x, BUBBLE_Y, c.say, bk, { size: 38, who: c.name, whoCol: c.color })
      if (gk > 0.01) drawGag(x, t, c.gag, CENTER.x, BUBBLE_Y - 10, gk * (c.gag.k || 0.8), c.at + 3.0)
    }

    function twist(t) {
      const tw = cfg.twist, u = t - T.twist
      const s1 = pop01(t, T.twist + 0.15, 0.28, 2.4) * (1 - ease.inQuad(prog(t, T.twist + 2.05, T.twist + 2.25)))
      const gk = pop01(t, T.twist + 0.2, 0.36, 2.2)
      const fade = 1 - ease.inQuad(prog(t, T.starsTalk - 0.3, T.starsTalk + 0.2))
      drawGag(x, t, tw.gag, 540, 1560 - LIFT(t) * 1.4, gk * (tw.gag.k || 1.0) * lerp(0.75, 1, fade), T.twist + 0.2)
      if (tw.say) bubble(x, 540, BUBBLE_Y, tw.say, s1, { size: 40, who: tw.who, whoCol: tw.whoCol || PINK, col: '#ffe1ea' })
      const s2 = pop01(t, T.twist + 2.2, 0.3, 2.6) * (1 - ease.inQuad(prog(t, T.starsTalk - 0.4, T.starsTalk - 0.1)))
      bubble(x, 540, 1380, tw.cheer, s2, { size: 46, who: 'EVERYONE', whoCol: GOLD })
      confetti(x, t, T.twist + 2.2, 540, 900, { n: 44 })
      hearts(x, t, T.twist + 2.3, 540, 1180, { n: 8, spread: 400 })
      void u
    }

    function promise(t) {
      const t0 = 1.2, t1 = 4.1
      if (t < t0 || t > t1) return
      const k = pop01(t, t0, 0.3, 2.8) * (1 - inBack(prog(t, t1 - 0.35, t1)))
      fx.save(); fx.translate(800, 1040); fx.rotate(0.08 + 0.03 * Math.sin(t * 7)); fx.scale(k, k)
      const txt = cfg.promise || 'WAIT FOR #1'
      fx.font = `900 48px ${INTER}`
      const w = fx.measureText(txt).width + 60
      R(fx, INK, -w / 2 - 7, -46, w + 14, 92); R(fx, GOLD, -w / 2, -39, w, 78)
      fx.fillStyle = INK; fx.textAlign = 'center'; fx.textBaseline = 'middle'; fx.fillText(txt, 0, 3)
      fx.restore()
    }
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        // camera: punch on each landing, whip at each chapter
        let zoom = 1, cy = 0
        for (const o of RANKS) { const d = t - o.at; if (d >= 0 && d < 0.35) zoom = Math.max(zoom, 1 + 0.025 * Math.exp(-d * 10) * (o.r <= 3 ? 2 : 1)) }
        for (const [t0] of T.chapters) { const d = t - t0; if (d >= 0 && d < 0.4) { zoom = Math.max(zoom, 1 + 0.12 * (1 - ease.outCubic(d / 0.4))) } }
        const shake = 0
        const sk = 0
        drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + (zoom - 1) * 0.5) })
        x.save(); x.translate(540 + sk, 960 + shake + cy); x.scale(zoom, zoom); x.translate(-540, -960)
        board(t)
        stars(t)
        stage_(t)
        confetti(x, t, T.reveal + 0.02, 540, rowY(1) + 40)
        x.restore()
        fx.clearRect(0, 0, 1080, 1920)
        promise(t)
        if (K.overlay) K.overlay(fx, t)
        box1.update(t)
        bug.update(t)
        let fl = 0
        if (t >= T.reveal && t < T.reveal + 0.14) fl = 1 - (t - T.reveal) / 0.14
        if (t >= T.twist + 2.2 && t < T.twist + 2.32) fl = Math.max(fl, 0.7)
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    // frame 0: the scratch freeze, then the plates fly home
    ['whoosh', 0.02, 0.3, 0.04],
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(1.0 + i * 0.03), 0.03]),
    ['boom', 1.25, 0.18], ['pop', 1.22, 1318.51, 0.045, 0.3], ['glitter', 1.22, 1.6],
    ['whoosh', 3.4, 0.3, 0.025],
    // chapters
    ...CHAPS.flatMap(c => chapterCues(c)),
    // ranks #12 → #2
    ...RANKS.filter(o => o.r >= 2).flatMap(o => {
      const i = 12 - o.r, top = o.r <= 3
      return [
        ['whoosh', r3(o.at - 0.08), 0.2, 0.026], ['pop', o.at, NOTE[i % 7] * (i >= 7 ? 2 : 1), top ? 0.055 : 0.045, (i % 2 ? 0.2 : -0.2)], ['tick', r3(o.at + 0.02), 0.045],
        ...(top ? [['bell', r3(o.at + 0.04), o.r === 3 ? 1318.51 : 1567.98, 0.028, 0.8, 0], ['glitter', r3(o.at + 0.02), r3(o.at + 0.3)]] : []),
        ['pop', r3(o.at + 0.45), 987.77, 0.025, 0],                         // the bubble
        ['pop', r3(o.at + 3.0), 1318.51, 0.035, 0.1], ['tick', r3(o.at + 3.02), 0.04],   // the gag
        ['whoosh', r3(spanEnd(o.r) - 0.3), 0.25, 0.02],
      ]
    }),
    ['pluck', r3(LAND[pisRank] + 0.1), 2349.32, 0.014, 0.4, 0.5],
    // drumroll → #1
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.drum[0] + 0.07 * i), 0.03 + 0.002 * i]),
    ...countdownCues(COUNT),
    ['riser', T.drum[0] + 0.6, T.drum[1], 0.03],
    ['boom', T.reveal, 0.32], ['tom', T.reveal, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.reveal, 0.08],
    ['bell', r3(T.reveal + 0.06), 1760, 0.035, 1.2, 0], ['glitter', r3(T.reveal + 0.04), r3(T.reveal + 0.6)],
    ['pop', r3(T.reveal + 0.1), 1318.51, 0.04, -0.3], ['pop', r3(T.reveal + 0.18), 1760, 0.035, 0.3],
    ['clap', r3(T.reveal + 0.35), { gain: 0.1, pan: -0.3 }], ['clap', r3(T.reveal + 0.6), { gain: 0.1, pan: 0.3 }],
    ['pop', r3(T.reveal + 0.45), 987.77, 0.025, 0], ['pop', r3(T.reveal + 3.0), 1318.51, 0.035, 0.1],
    // the twist
    ['pop', r3(T.twist + 0.15), 1174.66, 0.04, 0], ['whoosh', T.twist, 0.3, 0.03],
    ['boom', r3(T.twist + 2.2), 0.2], ['glitter', r3(T.twist + 2.2), r3(T.twist + 2.9)],
    ...[0, 0.18, 0.36, 0.54, 0.72].map((d, i) => ['clap', r3(T.twist + 2.3 + d), { gain: 0.09, pan: (i % 2 ? 0.3 : -0.3) }]),
    ...talkCues(LINES, { cps: CPS }),
    ...slamTitleCues(HOOK), ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...shakeCues(SHAKE1),
    ...(cfg.extraCues || []),
  ]
  const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHAKE1), slamTitle(HOOK), ...CHAPS.map(c => chapter(c)), countdown(COUNT), ...(cfg.scenes || [])]
  return { DURATION, SCENES, CUES, T }
}
