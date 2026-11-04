// THE MAKE-UP TALK: the shared look of The Make-Up Talk episodes 13–24 (nmue13…nmue24, promo/films/next30/b32.md).
// Every episode imports this file from promo/films/nmue13/scenes/makeupkit.js.
//
// The format (30 s, story 0–25.6, then the shared end card):
//   0.00–6.60   THE FIGHT   frame 0 = the hook headline (already landed) + the two stars mid-fight (one mid-hop, the first
//                           fight bubble up). Three fight bubbles volley; a red tension squiggle wiggles between them.
//   6.60–12.80  UNDER IT    what the fight is really about: the episode's own set piece (cfg.under.draw).
//   12.80       the card cut (cardfx keeps the middle candidate).
//   12.80–21.60 THE TALK    THE STARS name the skill in the dialogue box, a TRY SAYING card shows the words, the partner answers.
//   21.60–25.50 MADE UP     the repair gesture (cfg.made.draw), the last line as the closing headline, Pisces fountains.
// A chapter tab + a 4-segment progress bar sit under the bug. Pisces cries in every chapter (happy tears at the end).
//
//   makeMakeUp(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.a, cfg.b           sign ids ('virgo', 'sagittarius'); a stands left, b right.
//     cfg.hook               the hook headline ('“You said sorry | *last time* too.”'), cfg.hookColor accent colour
//     cfg.fight              { lines: [[who 'a'|'b', text] ×3], moods?: { a, b }, draw?(x,t,S) behind, front?(x,t,S), cues?: [] }
//     cfg.under              { head, color?, draw(x,t,S), cues?: [] }          S.u = t − 6.6
//     cfg.talk               { head, color?, stars, script, reply: [who, text], draw?(x,t,S) behind the pair }
//     cfg.made               { draw?(x,t,S) behind, front?(x,t,S), cues?: [], pair?: false to draw the pair yourself }
//     cfg.last               the last line headline ('Morning you | is *kinder*.')
//     cfg.chapters           optional chapter-tab names (default THE FIGHT · UNDER IT · THE TALK · MADE UP)
//   Section cue times in cfg.*.cues are relative to the section start.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb39a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, ASSETS }

// ── the fixed timeline (same in every episode)
export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN          // 25.6
export const T = {
  bug: -1, bar: -1,
  secs: [[0, 6.6], [6.6, 12.8], [12.8, 21.6], [21.6, 25.5]],
  h0: -1.2, h0Out: [6.38, 6.58],
  fight: [-0.3, 1.85, 3.9],
  h1: 6.72, h1Out: [12.55, 12.75],
  cut: 12.8,
  h2: 12.9, h2Out: [21.35, 21.55],
  stars: 13.4, script: 15.75, reply: 18.25, boxOpen: 13.15, boxClose: 21.3,
  h3: 21.75,
  out: [25.08, 25.48], bugOut: [25.2, 25.5],
}
export const CPS = 30

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1. spiky: a jagged fight bubble */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, spiky = false, shake = 0, tailUp = false } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  const sh = shake ? shake * Math.exp(-(t - t0) * 5) * Math.sin((t - t0) * 70) : 0
  x.save(); x.translate(cx + sh, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  if (spiky) {
    // jagged spikes around the box
    const sp = (px, py, dx, dy) => { x.beginPath(); x.moveTo(px - dy * 16, py + dx * 16); x.lineTo(px + dx * 26, py + dy * 26); x.lineTo(px + dy * 16, py - dx * 16); x.closePath(); x.fill() }
    for (const pass of [0, 1]) {
      x.fillStyle = pass ? col : INK
      const g = pass ? 0 : 6
      for (let i = 0; i < 5; i++) { const px = -w / 2 + (i + 0.5) * w / 5; sp(px, -h / 2 - g * 0.2, 0, -1 - g / 26); sp(px, h / 2 + g * 0.2, 0, 1 + g / 26) }
      sp(-w / 2 - g * 0.2, 0, -1 - g / 26, 0); sp(w / 2 + g * 0.2, 0, 1 + g / 26, 0)
    }
  }
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (!spiky) {
    const tx = tail * (w / 2 - 40), d = tailUp ? -1 : 1, by = d * h / 2
    x.fillStyle = INK; x.fillRect(tx - 14, by + (d > 0 ? 4 : -16), 14, 12); x.fillRect(tx - 7, by + (d > 0 ? 14 : -22), 8, 8)
    x.fillStyle = col; x.fillRect(tx - 9, by + (d > 0 ? 0 : -9), 9, 9)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** pixel label text on canvas (Space Mono), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** plain ink text on a prop (no shadow) */
export function ink(x, text, cx, cy, { size = 28, col = INK, align = 'center', font = INTER, weight = 800, rot = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a warm glow pool */
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
/** a pixel phone (screen colour + optional lines of text) */
export function phone(x, cx, cy, { w = 170, h = 300, rot = 0, screen = '#14102a', alpha = 1 } = {}, fn) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 7 })
  R(x, screen, -w / 2 + 12, -h / 2 + 18, w - 24, h - 40)
  if (fn) fn(x, w, h)
  x.restore()
}
/** steam puffs rising off a head (anger) */
export function steam(x, t, cx, cy, amt = 1) {
  if (amt <= 0) return
  for (let i = 0; i < 4; i++) {
    const p = ((t * 1.3 + i / 4) % 1), sx = cx + (i % 2 ? 1 : -1) * (40 + 30 * p), sy = cy - p * 120
    x.save(); x.globalAlpha = amt * 0.75 * (1 - p)
    drawBits(x, ['.WW.', 'WWWW', 'WWWW', '.WW.'], { W: '#e9e4f4' }, sx, sy, 7 + 6 * p, { outline: null })
    x.restore()
  }
}
/** a pixel couch */
export function couch(x, cx, by, w = 760, col = '#6b4fa8') {
  box(x, cx - w / 2, by - 210, w, 120, col, { b: 7, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx - w / 2 - 50, by - 150, 70, 150, col, { b: 7, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx + w / 2 - 20, by - 150, 70, 150, col, { b: 7, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx - w / 2 + 20, by - 95, w - 40, 75, col, { b: 7, lo: 'rgba(0,0,0,0.2)' })
  R(x, INK, cx - w / 2, by - 20, 20, 30); R(x, INK, cx + w / 2 - 20, by - 20, 20, 30)
}
/** a kitchen counter strip along the bottom of the set */
export function counter(x, y, col = '#8a6a4a') {
  R(x, INK, 0, y - 8, 1080, 10); R(x, col, 0, y, 1080, 36); R(x, 'rgba(255,255,255,0.15)', 0, y, 1080, 8)
  R(x, '#3a2d5c', 0, y + 36, 1080, 260); for (let i = 0; i < 4; i++) { R(x, INK, 40 + i * 270, y + 70, 200, 6); box(x, 110 + i * 270, y + 110, 60, 12, '#c9b48a', { b: 4 }) }
}
/** a window with a winter night behind it */
export function windowFrame(x, cx, cy, w, h, t) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#1d2a52', { b: 10 })
  for (let i = 0; i < 14; i++) { const sx = cx - w / 2 + ((i * 97) % w), sy = cy - h / 2 + ((t * 40 + i * 53) % h); R(x, 'rgba(255,255,255,0.85)', sx, sy, 6, 6) }
  R(x, INK, cx - 5, cy - h / 2, 10, h); R(x, INK, cx - w / 2, cy - 5, w, 10)
}
/** a talk card image (if loaded) drawn at (cx, cy) */
export function drawCard(x, img, cx, cy, w, rot = 0, alpha = 1) {
  if (!img || alpha <= 0) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
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
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
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
/** a scarf / prop strip across a sprite's lower body (sprite cells) */
export function scarfCells(ctx, col, t, flap = 1) {
  ctx.fillStyle = INK; ctx.fillRect(8.5, 24.5, 19, 4)
  ctx.fillStyle = col; ctx.fillRect(9, 25, 18, 3)
  const f = Math.sin(t * 9) * flap
  ctx.fillStyle = INK; ctx.fillRect(23.5, 27.5, 4, 7 + f); ctx.fillStyle = col; ctx.fillRect(24, 28, 3, 6 + f)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(10 + i * 4.5, 25, 1.5, 3)
}

// ── the bug: "THE MAKE-UP TALK" in Inter 800 small caps, letter-spaced, top-left 56 px; a chapter tab under it
const CHAPTERS = ['THE FIGHT', 'UNDER IT', 'THE TALK', 'MADE UP']
const CH_COL = ['#ff7a6b', '#c9a6ff', '#f2c75c', '#ff8fb1']
const BUG_ICON = ['.HH.HH.', 'HHHHHHH', 'HPPPPPH', 'HPPPPPH', '.HHHHH.', '..HHH..', '...H...']
function buildBug(root, chapters = CHAPTERS) {
  // identical to the episodes 1–12 bug (promo/films/nmue01/scenes/mukit.js): a pixel heart with a plaster, rose gold
  const b = el('div', { position: 'absolute', left: '56px', top: '52px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '44px', height: '44px', imageRendering: 'pixelated' }, b)
  ic.width = 44; ic.height = 44
  drawBits(ic.getContext('2d'), BUG_ICON, { H: '#f04a6e', P: '#f6d6b8' }, 22, 22, 4.6)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    'THE&nbsp;<span style="color:#ffd9c9">MAKE-UP</span>&nbsp;TALK')
  const tab = el('div', { position: 'absolute', right: '56px', top: '54px', height: '40px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '10px', border: `4px solid ${INK}`, borderRadius: '8px',
    font: `700 22px ${MONO}`, letterSpacing: '0.12em', color: INK, pointerEvents: 'none', boxShadow: '6px 6px 0 rgba(6,4,18,0.6)' }, root)
  return {
    update(t, out = 1) {
      b.style.opacity = String(clamp(out)); b.style.display = out <= 0.01 ? 'none' : 'flex'
      const i = T.secs.findIndex(([a, z]) => t >= a && t < z)
      if (i < 0 || out <= 0.01) { tab.style.display = 'none'; return }
      tab.style.display = 'flex'
      const k = i === 0 ? 1 : easeOutBack(prog(t, T.secs[i][0], T.secs[i][0] + 0.3), 2.4)
      tab.style.background = CH_COL[i]
      tab.innerHTML = `<span style="font-weight:700;opacity:.7">${i + 1}/4</span>&nbsp;${chapters[i]}`
      tab.style.opacity = String(clamp(out))
      tab.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)}) rotate(${i % 2 ? 1.5 : -1.5}deg)`
      tab.style.transformOrigin = '100% 50%'
    },
  }
}
// the 4-segment progress bar under the bug
function drawBar(x, t) {
  const k = outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = 4, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 116, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  T.secs.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.22)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, CH_COL[i], sx, Y, w * f, Hh)
  })
  x.restore()
}

// ── the TRY SAYING card (DOM): a bone card, a mono label, the words in Inter 800 with one *italic* accent
function buildScript(root, { text, deep }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '470px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { maxWidth: '860px', padding: '22px 34px 26px', background: BONE, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: '12px 12px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  el('div', { font: `700 26px ${MONO}`, letterSpacing: '0.18em', color: '#8a5a2e', marginBottom: '8px' }, st, '♡ TRY SAYING')
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 62px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 50px ${INTER}`, lineHeight: '1.12', color: INK, letterSpacing: '-0.01em' }, st, `“${html}”`)
  return {
    update(t) {
      const on = t >= T.script && t < T.h2Out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, T.script, T.script + 0.36), 2.6), o = outK(t, T.h2Out)
      st.style.opacity = String(clamp(prog(t, T.script, T.script + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(-1.6deg)`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeMakeUp(cfg) {
  const SA = signStar(cfg.a), SB = signStar(cfg.b), PIS = signStar('pisces')
  const NAME = id => id === 'sagittarius' ? 'SAGITTARIUS' : id.toUpperCase()
  const SPK = { a: `${SA.glyph}︎ ${NAME(cfg.a)}`, b: `${SB.glyph}︎ ${NAME(cfg.b)}` }
  const COLS = { a: SA.color, b: SB.color }
  const SPEAK = 'THE STARS'
  const [rw, rtext] = cfg.talk.reply
  const LINES = [
    { t: T.stars, speaker: SPEAK, text: cfg.talk.stars },
    { t: T.reply, speaker: SPK[rw], color: cfg.talk.replyColor || '#9fe6b0', text: rtext },
  ]
  const STARS_HOPS = [T.secs[2][0] + 0.35, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const RHOPS = talkHops(LINES, SPK[rw], { cps: CPS })
  const fightHops = w => cfg.fight.lines.map((l, i) => l[0] === w ? T.fight[i] : null).filter(v => v !== null).flatMap(v => [v, v + 0.4])

  const drawA = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: SA.color, glyph: o.s >= 150 ? SA.glyph : null, seed: 3, glow: 1.05, ...o })
  const drawB = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: SB.color, glyph: o.s >= 150 ? SB.glyph : null, seed: 7, glow: 1.05, ...o })

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  function tissues(x, cx, cy, s) {
    box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
    R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const imgs = {}
    for (const n of cfg.images || []) imgs[n] = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + n })

    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 168, size: 92, accentSize: 124, at: T.h0, gap: 0.05, accentColor: cfg.hookColor || '#ff7a6b', fit: true })
    const H1 = popText(root, cfg.under.head, { top: 172, size: 84, accentSize: 116, at: T.h1, gap: 0.08, accentColor: cfg.under.color || LAV, fit: true })
    const H2 = popText(root, cfg.talk.head, { top: 172, size: 84, accentSize: 116, at: T.h2, gap: 0.08, accentColor: cfg.talk.color || GOLD, fit: true })
    const H3 = popText(root, cfg.last, { top: 200, size: 104, accentSize: 150, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3 + 0.55, wobble: true, accentColor: cfg.lastColor || PINK, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
    const script = buildScript(root, { text: cfg.talk.script, deep: cfg.talk.deep || '#b8325a' })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, cfg.chapters || CHAPTERS)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    const S0 = { drawA, drawB, SA, SB, imgs, top: tx, pisces, tissues }

    // ── 1 THE FIGHT
    function fight(t) {
      const [a, z] = T.secs[0]
      if (t >= z) return
      const S = { ...S0, u: t - a, t0: a, t1: z }
      if (cfg.fight.draw) cfg.fight.draw(x, t, S)
      const heat = clamp(0.5 + t / 5)
      const mA = cfg.fight.moods?.a || 'squint', mB = cfg.fight.moods?.b || 'wide'
      const PA = cfg.fight.posA || { x: 285, y: 1130, s: 280 }, PB = cfg.fight.posB || { x: 795, y: 1130, s: 280 }
      if (!cfg.fight.noPair) {
        shadow(x, PA.x, PA.y + 165, 240); shadow(x, PB.x, PB.y + 165, 240)
        drawA(x, t, { ...PA, mood: typeof mA === 'function' ? mA(t) : mA, look: [1, 0], hops: [-0.12, ...fightHops('a')] })
        drawB(x, t, { ...PB, mood: typeof mB === 'function' ? mB(t) : mB, look: [-1, 0], hops: fightHops('b') })
        if (!cfg.fight.noSteam) { steam(x, t, PA.x, PA.y - 165, heat * 0.9); steam(x, t + 0.4, PB.x, PB.y - 165, heat * 0.6) }
        // the tension squiggle between them
        if (!cfg.fight.noSquiggle) {
          x.save(); x.globalAlpha = 0.9
          for (let i = 0; i < 9; i++) {
            const px = 440 + i * 25, py = PA.y - 10 + ((i % 2) ? -1 : 1) * (14 + 8 * Math.sin(t * 18 + i))
            R(x, INK, px - 4, py - 4, 20, 20); R(x, i % 3 ? '#ff5c6b' : GOLD, px, py, 12, 12)
          }
          x.restore()
        }
      }
      // the bubbles volley
      cfg.fight.lines.forEach(([w, text], i) => {
        const P = cfg.fight.bubbleAt?.[i] || [[300, 860], [770, 745], [340, 630]][i]
        bubble(x, t, P[0], P[1], T.fight[i], z - 0.05, text, { size: i === 2 ? 40 : 36, spiky: i !== 1 || !!cfg.fight.allSpiky, shake: 10, col: i % 2 ? '#ffe9e4' : BONE, tail: w === 'a' ? -0.5 : 0.5 })
      })
      if (cfg.fight.front) cfg.fight.front(x, t, S)
      // Pisces, sniffling behind a tissue box
      const P = cfg.fight.pis || { x: 940, y: 1640, s: 130 }
      tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5)
      pisces(x, t, { ...P, hops: [1.9, 4.0] }, 1, 'wide', [-1, -0.6])
    }

    // ── 2 UNDER IT
    function under(t) {
      const [a, z] = T.secs[1]
      if (t < a || t >= z) return
      const punch = 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
      x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
      cfg.under.draw(x, t, { ...S0, u: t - a, t0: a, t1: z })
      x.restore()
      const P = cfg.under.pis || { x: 940, y: 1640, s: 130 }
      const pk = pop01(t, a + 0.3, 0.3, 2)
      if (!P.none && pk > 0.01) {
        tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
        pisces(x, t, { ...P, pop: pk, hops: [a + 0.6] }, 2, 'wide', [-1, -0.6])
      }
    }

    // ── 3 THE TALK
    function talk(t) {
      const [a, z] = T.secs[2]
      if (t < a || t >= z) return
      const S = { ...S0, u: t - a, t0: a, t1: z }
      if (cfg.talk.draw) cfg.talk.draw(x, t, S)
      const PA = { x: 250, y: 1150, s: 200 }, PB = { x: 830, y: 1150, s: 200 }
      const kA = pop01(t, a + 0.05, 0.36, 2), kB = pop01(t, a + 0.15, 0.36, 2)
      const soft = t > T.script + 0.5
      const mA = cfg.talk.moods?.a ? cfg.talk.moods.a(t) : (t < T.script ? 'neutral' : soft ? 'happy' : 'sparkle')
      const mB = cfg.talk.moods?.b ? cfg.talk.moods.b(t) : (t < T.reply ? 'neutral' : 'happy')
      shadow(x, PA.x, PA.y + 120, 180); shadow(x, PB.x, PB.y + 120, 180)
      drawA(x, t, { ...PA, pop: kA, mood: mA, look: t < T.stars + 1.6 ? [0.5, -1] : [1, 0], hops: [a + 0.4, ...(rw === 'a' ? RHOPS : []), T.script + 0.2] })
      drawB(x, t, { ...PB, pop: kB, mood: mB, look: t < T.stars + 1.6 ? [-0.5, -1] : [-1, 0], hops: [a + 0.5, ...(rw === 'b' ? RHOPS : [])] })
      // THE STARS, between them
      const sk = pop01(t, a + 0.25, 0.4, 2.1)
      glow(x, 540, 1060, 260, sk)
      drawStarChar(x, 540, 1080, 170, t, { color: STAR.sky, mood: t > T.reply ? 'happy' : 'neutral', look: [0, 0], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.1 })
      if (t > T.reply + 0.8) hearts(x, t, T.reply + 0.8, rw === 'a' ? PA.x : PB.x, 960, { n: 4 })
      // Pisces, streaming, on the right edge under the headline
      const P = { x: 975, y: 880, s: 100 }
      pisces(x, t, { ...P, pop: pop01(t, a + 0.5, 0.3, 2), hops: [T.script + 0.1, T.reply + 0.2] }, 2, 'sparkle', [-1, 0.6])
    }

    // ── 4 MADE UP
    function made(t) {
      const [a] = T.secs[3]
      if (t < a || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { ...S0, u: t - a, t0: a, t1: T.out[0], ok }
      if (cfg.made.draw) cfg.made.draw(x, t, S)
      if (cfg.made.pair !== false) {
        const PA = cfg.made.posA || { x: 410, y: 1060, s: 270 }, PB = cfg.made.posB || { x: 670, y: 1060, s: 270 }
        shadow(x, (PA.x + PB.x) / 2, PA.y + 160, 480 * ok)
        drawA(x, t, { ...PA, pop: ok, mood: t > a + 1.6 ? 'heart' : 'happy', look: [1, 0], hops: [a + 0.1, a + 1.6, a + 2.6] })
        drawB(x, t, { ...PB, pop: ok, mood: t > a + 1.8 ? 'heart' : 'happy', look: [-1, 0], hops: [a + 0.2, a + 1.8, a + 2.8] })
        hearts(x, t, a + 1.6, (PA.x + PB.x) / 2, PA.y - 180, { n: 6, cell: 7 })
      }
      if (cfg.made.front) cfg.made.front(x, t, S)
      // Pisces: happy-tear fountains
      const pk = pop01(t, a + 0.4, 0.36, 2.2) * ok
      if (pk > 0.01) pisces(x, t, { x: 900, y: 1620, s: 150, pop: pk, hops: [a + 0.7, a + 1.7, a + 2.7] }, 3, 'sparkle', [-1, -1])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        fight(t); under(t); talk(t); made(t)
        drawBar(x, t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, { ...S0 })
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        script.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the hard cut into UNDER IT and into MADE UP (the card cut handles THE TALK)
        const fl = Math.max(0, ...[T.secs[1][0], T.secs[3][0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates (cardfx keeps the middle one: 12.8, into THE TALK)
  const CUTS = [T.secs[1][0], { t: T.cut, kind: 'flip' }, T.secs[3][0]]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)]).filter(c => c[1] >= 0)
  const words = s => s.replace(/[|*]/g, ' ').split(/\s+/).filter(Boolean).length
  const rel = (list, a) => (list || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])
  const CUES = [
    // the fight: three bubble slams + the volley
    ...cfg.fight.lines.flatMap(([w], i) => T.fight[i] < 0 ? [] : [['pop', T.fight[i], w === 'a' ? 659.25 : 880, 0.05, w === 'a' ? -0.3 : 0.3], ['tick', r3(T.fight[i] + 0.02), 0.06], ['whoosh', r3(T.fight[i] - 0.05), 0.2, 0.025]]),
    ['tom', 0.02, 110, { gain: 0.2, decay: 0.25 }],
    ...rel(cfg.fight.cues, T.secs[0][0]),
    // into UNDER IT
    ['whoosh', r3(T.secs[1][0] - 0.1), 0.3, 0.04], ['tick', T.secs[1][0], 0.06], ['pop', r3(T.secs[1][0] + 0.05), 1174.66, 0.035, 0],
    ...wordPops(T.h1, words(cfg.under.head), 0.08, 1),
    ['pluck', r3(T.secs[1][0] + 0.6), 2349.32, 0.012, 0.3, 0.6],
    ...rel(cfg.under.cues, T.secs[1][0]),
    // THE TALK
    ...wordPops(T.h2, words(cfg.talk.head), 0.08, 2),
    ['pop', r3(T.secs[2][0] + 0.3), 739.99, 0.035, 0], ['glitter', r3(T.secs[2][0] + 0.3), r3(T.secs[2][0] + 0.7)],
    ['whoosh', r3(T.script - 0.05), 0.3, 0.035], ['pop', T.script, 1174.66, 0.045, 0.1], ['pop', r3(T.script + 0.08), 1567.98, 0.03, -0.1], ['tick', r3(T.script + 0.02), 0.05],
    ['pluck', r3(T.reply + 0.8), 1174.66, 0.03, 0.5, 0.2], ['pluck', r3(T.reply + 0.92), 1567.98, 0.028, 0.5, 0.2],
    ...talkCues(LINES, { cps: CPS }),
    ...rel(cfg.talk.cues, T.secs[2][0]),
    // MADE UP
    ['whoosh', r3(T.secs[3][0] - 0.1), 0.3, 0.035], ['bell', r3(T.secs[3][0] + 0.05), 1760, 0.03, 1.0, 0],
    ...wordPops(T.h3, words(cfg.last) - 1, 0.1, 0), ['pop', r3(T.h3 + 0.55), 1174.66, 0.05, 0], ['pop', r3(T.h3 + 0.62), 1567.98, 0.04, 0], ['glitter', r3(T.h3 + 0.55), r3(T.h3 + 0.95)],
    ['pluck', r3(T.secs[3][0] + 1.6), 1174.66, 0.035, 0.5, -0.2], ['pluck', r3(T.secs[3][0] + 1.72), 1567.98, 0.03, 0.5, 0.2],
    ...rel(cfg.made.cues, T.secs[3][0]),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
