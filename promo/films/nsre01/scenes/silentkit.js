// SILENT REVIEW kit, Volume 2 (star_advice trial reels nsre01–nsre12, promo/films/next30/b47.md).
// Adapted from the Volume 1 kit (trsilentletter/scenes/silentkit.js) for trial reels: FRAME 0 IS THE THUMBNAIL, so there
// is no fade from black; the hook headline, bug, bar and reviewer are on screen at t = 0 and the giver is mid-slide with
// the gift. All twelve episodes import this one file from nsre01.
// Extra cfg: noPis (the reviewer is Pisces: no background Pisces anywhere).
//
// The format (20 s, story 0–15.6, then the shared end card): a star reviews a gift or gesture with FACES ONLY. Nobody
// says a word: the reviewer has no dialogue box, only closed captions describing their face ("[ raises one eyebrow ]").
//   0.00–2.10   hook: the bold top caption "Silent review: | *<the gift>.*" pops word by word. The reviewer sits behind a
//               little review desk (fairy lights, a lamp, a plant), poker-faced, a muted-speaker badge by its head. The
//               giver pops in, slides the gift across the desk and ducks behind the desk edge to watch. CC: "[ respectful
//               silence ]". A fake 4-segment progress bar runs under the bug.
//   2.10–11.40  three reactions (rule of three, the third twisted): eyebrow → slow nod → the single tear. Each is a jump
//               cut that pushes the camera closer to the face (white flash on the first two, the one card cut on the third,
//               7.9). The closed captions narrate the face.
//   11.40–15.5  the camera pulls back, THE VERDICT score card rises with three joke ratings and a stamped total; the
//               last line lands as the top caption. The giver pops up with heart eyes; Pisces fountains.
// Pisces cries in the background of every beat (behind the plant, then leaning in from the edge, then at the verdict).
//
//   makeSilent(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.reviewer / cfg.giver (sign ids), cfg.gift (headline accent, e.g. 'a handwritten note.'), cfg.accent
//     cfg.beats: [{ cc: [[u, '[ text ]'], …], cues: [[kind, u, …]] }] × 3   (u = seconds into the beat)
//     cfg.face(t, P, base) → face state (see FACE below) for the reaction beats; the kit handles hook + verdict faces
//     cfg.desk(x, t, P, S) draws the gift on the desk (world space, inside the camera). S = { gift, k } helpers.
//     cfg.wear(ctx, t, P, face) optional: draw an accessory in sprite cells (glasses, headphones…)
//     cfg.score: { rows: [[label, 0…5 stars | '*text*'] × 3], total: '10/10' }, cfg.last: the last line
//     cfg.plate: the desk nameplate text, e.g. 'CAPRICORN · CRITIC'
//     cfg.over(x, t, P) optional: screen-space extras on the top canvas.
// FACE = { mood, look, blink, blush, brows: { l, r, sl, sr } (raise −1…1, slant: + = inner end up), mouth ('flat' |
//          'smile' | 'grin' | 'o' | 'wobble' | 'tight' | null), tears (0–3), tear (t0 of a single tear, or [t0…]),
//          nod: [{ at, n, period, amp }], tilt (rad), shake (px), squash, hops }
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** eased value from v0 to v1 over [a, b] */
export const ramp = (t, a, b, v0, v1) => lerp(v0, v1, ease.inOutCubic(prog(t, a, b)))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all five films)
export const DURATION = 18                               // story 15.6 + the short end card (2.4 s)
export const STORY_END = DURATION - ENDCARD_SHORT_LEN          // 15.6
export const T = {
  black: [-1, -0.9], bug: -1, bar: -1,
  h0: -1, h0Out: [11.2, 11.4],
  revIn: -1, mute: 0.7, giverIn: [-0.35, 0.3], giftIn: [-0.3, 0.8], giverDuck: [1.65, 1.95], hookCC: 1.0,
  beats: [[2.1, 5.0], [5.0, 7.9], [7.9, 11.4]],
  cut: 7.9,
  score: 11.4, cam: [11.4, 11.85], cardIn: [11.45, 11.9], h1: 11.6, rows: [12.0, 12.4, 12.8], total: 13.25,
  pisIn: 11.75, giverUp: 11.95,
  out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const BAR_SEGS = [[2.1, 5.0], [5.0, 7.9], [7.9, 11.4], [11.4, 15.1]]

/** which part of the film t is in: { ph: 'hook' | 0 | 1 | 2 | 'score', i, u, t0, t1 } */
export function phaseAt(t) {
  if (t < T.beats[0][0]) return { ph: 'hook', i: -1, u: t, t0: 0, t1: T.beats[0][0] }
  for (let i = 0; i < 3; i++) if (t < T.beats[i][1]) return { ph: i, i, u: t - T.beats[i][0], t0: T.beats[i][0], t1: T.beats[i][1] }
  return { ph: 'score', i: 3, u: t - T.score, t0: T.score, t1: STORY_END }
}

// ── the world (camera space; the camera zooms around the face at (540, 880))
export const REV = { x: 540, y: 900, s: 360 }
export const DESK = { back: 1040, front: 1300, lip: 1334 }
export const GIFT = { x: 540, y: 1172 }
const FACE_Y = 912
const PIS_W = { x: 912, y: 930, s: 118 }          // behind the plant
const GIV_PEEK = { x: 112, y: 1010, s: 150 }       // ducked behind the desk's left end

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
export const NOTE_BM = ['..NNN', '..N.N', '..N..', 'NNN..', 'NNN..']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, rise = 200, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel label text on canvas, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a soft additive glow */
export function glow(x, cx, cy, r, rgb, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so overlays sit on the sprite through hops and squash
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
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = SKYB; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = SKYB; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** THE single tear: wells up in the left eye at t0, rolls slowly down the cheek (sprite cells) */
export function singleTear(ctx, t, t0) {
  const u = t - t0
  if (u < 0 || u > 3.2) return
  const well = clamp(u / 0.35), roll = ease.inOutQuad(clamp((u - 0.35) / 1.9))
  const x0 = 10.4, y0 = 21.6, y = y0 + roll * 10.5, xx = x0 - roll * 1.2
  const a = 1 - clamp((u - 2.6) / 0.6)
  ctx.save(); ctx.globalAlpha *= a
  // the wet streak it leaves
  if (roll > 0) { ctx.fillStyle = 'rgba(143,227,255,0.55)'; ctx.fillRect(xx + 0.2, y0 + 0.6, 0.8, y - y0) }
  const w = 1.4 + 0.9 * well, h = 1.6 + 1.4 * well
  ctx.fillStyle = INK; ctx.fillRect(xx - 0.35, y - 0.35, w + 0.7, h + 0.7)
  ctx.fillStyle = SKYB; ctx.fillRect(xx, y, w, h)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(xx + 0.2, y + 0.2, 0.6, 0.6)
  ctx.restore()
}
/** eyebrows (sprite cells): raise −1…1, slant + = inner end up (touched / worried), − = inner end down (skeptical) */
export function browsCells(ctx, { l = 0, r = 0, sl = 0, sr = 0 } = {}) {
  for (const side of [-1, 1]) {
    const raise = side < 0 ? l : r, slant = side < 0 ? sl : sr
    for (let k = 0; k < 5; k++) {
      const inner = k / 4
      const cx = side < 0 ? 11.2 + k * 1.05 : 24.8 - k * 1.05
      const cy = 13.1 - raise * 2.0 - slant * 1.7 * (inner - 0.5)
      ctx.fillStyle = INK; ctx.fillRect(cx - 0.75, cy - 0.85, 1.55, 1.8)
    }
  }
}
/** a little mouth (sprite cells) */
export function mouthCells(ctx, t, kind) {
  if (!kind) return
  const p = (i, j, c = INK) => { ctx.fillStyle = c; ctx.fillRect(i, j, 1, 1) }
  if (kind === 'flat') { ctx.fillStyle = INK; ctx.fillRect(16, 25.3, 4, 1) }
  else if (kind === 'tight') { ctx.fillStyle = INK; ctx.fillRect(16.6, 25.4, 2.8, 0.75) }
  else if (kind === 'smile') { for (const [i, j] of [[15, 24.8], [16, 25.8], [17, 26.2], [18, 26.2], [19, 25.8], [20, 24.8]]) p(i, j) }
  else if (kind === 'grin') { ctx.fillStyle = INK; ctx.fillRect(15, 24.6, 6, 2.6); ctx.fillStyle = '#fff6ea'; ctx.fillRect(15.8, 25, 4.4, 0.9); ctx.fillStyle = '#c4405e'; ctx.fillRect(16.4, 26.1, 3.2, 0.7) }
  else if (kind === 'o') { ctx.fillStyle = INK; ctx.fillRect(16.5, 24.6, 3, 3); ctx.fillStyle = '#7a2340'; ctx.fillRect(17.2, 25.3, 1.6, 1.6) }
  else if (kind === 'wobble') { for (let k = 0; k < 5; k++) p(15.5 + k, 25.4 + 0.55 * Math.sin(t * 26 + k * 1.9)) }
}

// ── the format bug: "SILENT REVIEW" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SILENT<span style="color:rgba(255,255,255,0.6)">&nbsp;REVIEW</span>')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── closed captions: a dark CC strip, Space Mono, "[ … ]", one at a time
function buildCC(root, items) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1540px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 30px 16px', background: 'rgba(6,4,18,0.9)', borderRadius: '8px', font: `700 44px ${MONO}`, color: BONE, letterSpacing: '0.01em', whiteSpace: 'nowrap', boxShadow: '0 0 0 3px rgba(239,230,214,0.12)', transformOrigin: '50% 50%' }, wrap)
  let cur = null
  return {
    update(t) {
      const it = items.find(c => t >= c.a && t < c.b)
      wrap.style.display = it ? 'flex' : 'none'
      if (!it) return
      if (cur !== it) { st.innerHTML = it.text.replace(/\*([^*]+)\*/g, `<span style="color:${GOLD}">$1</span>`); cur = it }
      const k = prog(t, it.a, it.a + 0.08), o = outK(t, [it.b - 0.08, it.b])
      st.style.opacity = String(clamp(k) * o)
      st.style.transform = `scale(${(0.94 + 0.06 * ease.outCubic(k)).toFixed(4)})`
    },
  }
}

// ── the fake progress bar: 4 segments (three reactions + the verdict) under the bug
function drawBar(x, t, col) {
  const k = pop01(t, T.bar, 0.3, 1.6) * outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 980, GAP = 10, n = BAR_SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  BAR_SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === 3 ? col : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ── the set: fairy lights, the desk, a lamp, a plant, a tissue box
function fairyLights(x, t) {
  const pts = 15
  x.save()
  x.strokeStyle = 'rgba(27,18,54,0.9)'; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = -20 + u * 1120, Y = 545 + 70 * Math.sin(Math.PI * u); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke()
  for (let i = 0; i < pts; i++) {
    const u = (i + 0.5) / pts, X = -20 + u * 1120, Y = 545 + 70 * Math.sin(Math.PI * u) + 14
    const col = [GOLD, PINK, '#9fe6b0', LAV][i % 4], tw = 0.75 + 0.25 * Math.sin(t * 2.4 + i * 1.7)
    glow(x, X, Y, 46, i % 4 === 1 ? '255,143,177' : '242,199,92', 0.16 * tw)
    R(x, INK, X - 9, Y - 12, 18, 26); R(x, col, X - 6, Y - 6, 12, 17); R(x, '#fff6ea', X - 4, Y - 4, 4, 4)
    R(x, '#3a2d66', X - 5, Y - 14, 10, 7)
  }
  x.restore()
}
function desk(x) {
  // the top surface (a gentle trapezoid), plank seams, then the front lip and the front panel
  x.save()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-60, DESK.back - 8); x.lineTo(1140, DESK.back - 8); x.lineTo(1220, DESK.front + 4); x.lineTo(-140, DESK.front + 4); x.closePath(); x.fill()
  x.fillStyle = '#8a5a3a'; x.beginPath(); x.moveTo(-52, DESK.back); x.lineTo(1132, DESK.back); x.lineTo(1210, DESK.front); x.lineTo(-130, DESK.front); x.closePath(); x.fill()
  x.fillStyle = '#9c6a45'; x.beginPath(); x.moveTo(-52, DESK.back); x.lineTo(1132, DESK.back); x.lineTo(1140, DESK.back + 18); x.lineTo(-60, DESK.back + 18); x.closePath(); x.fill()
  x.fillStyle = 'rgba(27,18,54,0.25)'
  for (const v of [0.22, 0.47, 0.73]) { const yy = lerp(DESK.back, DESK.front, v); x.fillRect(lerp(-52, -130, v), yy, lerp(1184, 1340, v), 3) }
  x.restore()
  R(x, INK, -400, DESK.front, 1880, DESK.lip - DESK.front + 8)
  R(x, '#b07a4f', -400, DESK.front + 4, 1880, DESK.lip - DESK.front - 6)
  R(x, '#c98e5e', -400, DESK.front + 4, 1880, 6)
  R(x, '#4a2e22', -400, DESK.lip + 2, 1880, 1400)
  // panel insets
  for (const [px, pw] of [[-420, 440], [60, 440], [580, 440], [1100, 440]]) { R(x, '#3c2419', px, DESK.lip + 40, pw, 600); R(x, '#553527', px + 8, DESK.lip + 48, pw - 16, 584) }
}
function lamp(x, t, on = 1) {
  x.save(); x.translate(0, 60)
  glow(x, 170, 760, 260, '255,214,150', 0.2 * on)
  R(x, INK, 162, 768, 16, 250); R(x, '#d9c9a8', 166, 768, 8, 246)
  box(x, 112, 1004, 116, 28, '#3a2d66', { b: 6, hi: '#5a4a8a' })
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(104, 790); x.lineTo(236, 790); x.lineTo(206, 690); x.lineTo(134, 690); x.closePath(); x.fill()
  x.fillStyle = '#f7d48e'; x.beginPath(); x.moveTo(114, 782); x.lineTo(226, 782); x.lineTo(200, 698); x.lineTo(140, 698); x.closePath(); x.fill(); x.restore()
  R(x, '#fff1c8', 140, 772, 60, 8)
  x.restore()
  void t
}
function plant(x, t) {
  const sw = 0.05 * Math.sin(t * 1.6)
  const leaf = (cx, cy, a, len) => { x.save(); x.translate(cx, cy); x.rotate(a + sw); R(x, INK, -14, -len - 6, 28, len + 8); R(x, '#4fae6a', -9, -len, 18, len); R(x, '#7fd38a', -9, -len, 7, len * 0.8); x.restore() }
  for (const [dx, a, len] of [[-30, -0.55, 96], [28, 0.5, 100], [-12, -0.2, 128], [14, 0.18, 118], [0, 0, 84]]) leaf(915 + dx, 1050, a, len)
  box(x, 862, 1040, 106, 84, '#c96f4a', { b: 6, hi: '#e08a62' })
}
// a brass nameplate on the desk front: who is reviewing
function nameplate(x, text) {
  if (!text) return
  x.save(); x.font = `800 34px ${INTER}`
  const w = x.measureText(text).width * 1.0 + 0.22 * 34 * text.length + 70, cy = DESK.lip + 92
  box(x, 540 - w / 2, cy - 34, w, 68, '#d9a94a', { b: 7, hi: '#f2cf7a', lo: '#a87a2c' })
  x.letterSpacing = '0.22em'
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 540 + 0.11 * 34, cy + 2)
  x.restore()
}
function tissueBox(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 5, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.2 - 4, cy - s * 0.3 - 4, s * 0.4 + 8, 8)
  R(x, INK, cx - s * 0.14 - 4, cy - s * 0.3 - s * 0.36 - 4, s * 0.28 + 8, s * 0.38 + 4)
  R(x, '#ffffff', cx - s * 0.14, cy - s * 0.3 - s * 0.36, s * 0.28, s * 0.38)
}
// a muted-speaker badge: the reviewer isn't allowed to talk
function muteBadge(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -40, -40, 80, 80); R(x, BONE, -34, -34, 68, 68)
  drawBits(x, ['..S.....', '.SS.X..X', 'SSS..XX.', 'SSS..XX.', '.SS.X..X', '..S.....'], { S: INK, X: RED }, 0, 0, 7, { outline: null })
  x.restore()
}

// ── the verdict card stars
const RSTAR = ['...S...', '..SSS..', 'SSSSSSS', '.SSSSS.', '.SS.SS.', 'SS...SS']

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeSilent(cfg) {
  const REVS = signStar(cfg.reviewer), PIS = signStar('pisces'), GIV = signStar(cfg.giver || 'libra')
  const SC = cfg.score
  // the CC timeline (absolute times): the hook line, then each beat's lines (each held until the next / beat end)
  const CC = [{ a: T.hookCC, b: T.beats[0][0] - 0.05, text: cfg.hookCC || '[ respectful silence ]' }]
  cfg.beats.forEach((bt, i) => {
    const [a, b] = T.beats[i]
    bt.cc.forEach(([u, text], j) => CC.push({ a: r3(a + u), b: r3(j + 1 < bt.cc.length ? a + bt.cc[j + 1][0] - 0.04 : b - 0.08), text }))
  })

  const giver = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: GIV.color, glyph: o.s >= 150 ? GIV.glyph : null, seed: 7, glow: 1, ...o })

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  // the reviewer's face for this frame
  const BASE = { mood: 'neutral', look: [0, 0], brows: { l: 0, r: 0, sl: 0, sr: 0 }, mouth: 'flat', tears: 0 }
  function faceAt(t, P) {
    if (P.ph === 'hook') {
      // poker face; a tiny "ready" nod at the lens when the gift lands
      return { ...BASE, look: t > T.giftIn[0] && t < T.giverDuck[1] ? [-0.6, 0.8] : [0, 0], hops: [T.revIn + 0.35], nod: [{ at: T.giftIn[1] + 0.05, n: 1, period: 0.5, amp: 12 }] }
    }
    if (P.ph === 'score') {
      const f = { ...BASE, mood: t > T.total + 0.1 ? 'sparkle' : 'happy', look: [0, 0], brows: { l: 0.35, r: 0.35, sl: 0.6, sr: 0.6 }, mouth: 'smile', tears: t > T.total ? 2 : 1, hops: [T.total + 0.05, T.total + 0.5] }
      return cfg.scoreFace ? cfg.scoreFace(t, P, f) : f
    }
    return cfg.face(t, P, { ...BASE, brows: { ...BASE.brows } })
  }

  function drawReviewer(x, t, P, F) {
    let dy = 0, sq = F.squash || 0
    for (const nd of F.nod || []) {
      const u = t - nd.at
      if (u < 0 || u > nd.n * nd.period) continue
      const w = (1 - Math.cos(2 * Math.PI * (u / nd.period))) / 2
      dy += nd.amp * w; sq += 0.03 * w
    }
    const dx = F.shake ? F.shake * Math.sin(t * 57) : 0
    x.save(); x.translate(REV.x + dx, REV.y + dy); x.rotate(F.tilt || 0); x.translate(-REV.x, -REV.y)
    const opts = { color: REVS.color, glyph: REVS.glyph, mood: F.mood, look: F.look, blink: F.blink, blush: F.blush, hops: F.hops, squash: sq, seed: 3, glow: 1.1, pop: F.pop ?? 1, zzz: false }
    drawStarChar(x, REV.x, REV.y, REV.s, t, opts)
    const SF = starFrame(REV.x, REV.y, REV.s, t, opts)
    inSprite(x, SF, () => {
      if (F.brows) browsCells(x, F.brows)
      mouthCells(x, t, F.mouth)
      if (F.tears) tearsCells(x, t, F.tears)
      for (const t0 of [].concat(F.tear ?? [])) singleTear(x, t, t0)
      if (cfg.wear) cfg.wear(x, t, P, F)
    })
    x.restore()
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 42px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 44px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const H0 = popText(root, `Silent review: | *${cfg.gift}*`, { top: 158, size: 84, accentSize: 116, at: T.h0, gap: 0.09, accentColor: cfg.accent || REVS.color, fit: true })
    const H1 = popText(root, cfg.last, { top: 176, size: 104, accentSize: 136, at: T.h1, gap: 0.11, accentColor: cfg.accent || REVS.color, fit: true, wobble: true })
    const cc = buildCC(root, CC)
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // camera: zooms around the face; each reaction is a jump cut closer
    function cam(t, P) {
      let z = 1, fy = FACE_Y
      if (P.ph === 'hook') z = 1
      else if (P.i === 0) z = 1.06 + 0.03 * prog(P.u, 0, 2.9)
      else if (P.i === 1) z = 1.18 + 0.04 * prog(P.u, 0, 2.9)
      else if (P.i === 2) z = 1.3 + 0.12 * ease.inOutCubic(prog(P.u, 0.3, 3.3))
      else { const k = ease.inOutCubic(prog(t, ...T.cam)); z = lerp(1.42, 0.9, k); fy = lerp(FACE_Y, 742, k) }
      return { z, fy }
    }

    function world(t, P) {
      const S = { gift: ease.outCubic(prog(t, ...T.giftIn)), assets, REVS, GIV }
      // warm key light behind the reviewer
      glow(x, 540, 820, 520, '255,220,170', 0.16)
      fairyLights(x, t)
      // the giver: pops in from the left, slides the gift over, ducks behind the desk's end to watch
      if (P.ph !== 'score') {
        const inK = ease.outCubic(prog(t, ...T.giverIn)), duck = ease.inOutCubic(prog(t, ...T.giverDuck))
        const gx0 = lerp(-140, 250, inK), G2 = { x: lerp(gx0, GIV_PEEK.x, duck), y: lerp(965, GIV_PEEK.y, duck), s: lerp(190, GIV_PEEK.s, duck) }
        const nervous = P.ph !== 'hook'
        const gm = cfg.giverMood ? cfg.giverMood(t, P) : nervous ? (P.i === 2 ? 'wide' : 'neutral') : 'happy'
        giver(x, t, { ...G2, mood: gm, look: nervous ? [1, -0.3] : [1, 0.6], hops: [T.giverIn[0] + 0.3, T.giftIn[1], T.beats[1][0] + 0.4, T.beats[2][0] + 0.5] })
        if (nervous && P.i === 1) label(x, '?', GIV_PEEK.x + 70, GIV_PEEK.y - 110 - 6 * Math.sin(t * 6), { size: 44, col: BONE, font: INTER, weight: 800 })
      }
      // Pisces behind the plant, sniffling more each beat
      const pk = cfg.noPis || P.ph === 'score' || P.i === 2 ? 0 : pop01(t, 1.1, 0.35, 2)
      if (pk > 0.01) pisces(x, t, { ...PIS_W, pop: pk }, P.ph === 'hook' ? 1 : P.i + 1, P.i >= 1 ? 'sparkle' : 'wide', [-1, 0.6])
      drawReviewer(x, t, P, faceAt(t, P))
      desk(x)
      if (P.ph === 'hook') nameplate(x, cfg.plate)      // only in the wide shot (the close-ups put it under the captions)
      lamp(x, t)
      plant(x, t)
      tissueBox(x, 1000, 1124, 74)
      if (cfg.desk) cfg.desk(x, t, P, S)
      // the muted-speaker badge by the reviewer's head
      const mk = pop01(t, T.mute, 0.3, 2.4) * outK(t, [T.score, T.score + 0.3])
      muteBadge(x, 800, 720, mk * (1 + 0.05 * Math.sin(t * 4)))
    }

    // the verdict card (screen space)
    const CARD = { cx: 540, cy: 1345, w: 800, h: 450 }
    function verdict(t) {
      if (t < T.cardIn[0] || t > T.out[1]) return
      const k = easeOutBack(prog(t, ...T.cardIn), 1.25), o = popOut(t, T.out)
      if (o <= 0) return
      const cy = lerp(CARD.cy + 900, CARD.cy, k)
      tx.save(); tx.translate(CARD.cx, cy); tx.rotate(-0.025); tx.scale(o, o)
      const W2 = CARD.w / 2, H2 = CARD.h / 2
      tx.fillStyle = 'rgba(6,4,18,0.5)'; tx.fillRect(-W2 + 16, -H2 + 20, CARD.w, CARD.h)
      box(tx, -W2, -H2, CARD.w, CARD.h, BONE, { b: 8 })
      R(tx, '#e4d8c2', -W2, H2 - 18, CARD.w, 18)
      // header
      tx.textBaseline = 'middle'; tx.textAlign = 'center'
      tx.font = `700 30px ${MONO}`; tx.fillStyle = INK; tx.fillText('★  T H E   V E R D I C T  ★', 0, -H2 + 46)
      R(tx, RED, -W2 + 40, -H2 + 78, CARD.w - 80, 5)
      // rows
      SC.rows.forEach(([lab, val], i) => {
        const at = T.rows[i], rk = pop01(t, at, 0.28, 2.2)
        if (rk <= 0.01) return
        const ry = -H2 + 132 + i * 78
        tx.save(); tx.globalAlpha = clamp(rk * 1.5)
        tx.textAlign = 'left'; tx.font = `800 42px ${INTER}`; tx.fillStyle = INK; tx.fillText(lab, -W2 + 44, ry)
        if (typeof val === 'number') {
          for (let s = 0; s < 5; s++) {
            const sk = pop01(t, at + 0.12 + s * 0.07, 0.2, 2.6)
            const sx = W2 - 268 + s * 54
            drawBits(tx, RSTAR, { S: '#d8ccb6' }, sx, ry, 6.2, { outline: '#bfb19a' })
            if (s < val && sk > 0.01) drawBits(tx, RSTAR, { S: GOLD }, sx, ry, 6.2 * sk)
          }
        } else {
          const txt = val.replace(/\*/g, '')
          tx.textAlign = 'right'; tx.font = `italic 500 52px ${SERIF}`; tx.fillStyle = RED
          const sc = Math.min(1, 380 / Math.max(1, tx.measureText(txt).width))
          tx.save(); tx.translate(W2 - 40, ry + 2); tx.scale(sc * (0.6 + 0.4 * clamp(rk)), sc * (0.6 + 0.4 * clamp(rk))); tx.fillText(txt, 0, 0); tx.restore()
        }
        R(tx, 'rgba(27,18,54,0.18)', -W2 + 40, ry + 36, CARD.w - 80, 3)
        tx.restore()
      })
      // total: a red stamp
      const sk = prog(t, T.total - 0.04, T.total + 0.06)
      if (sk > 0) {
        tx.textAlign = 'left'; tx.font = `800 42px ${INTER}`; tx.fillStyle = INK; tx.fillText('TOTAL', -W2 + 44, H2 - 70)
        const sc = lerp(1.7, 1, ease.outCubic(sk)) * (1 + 0.04 * Math.exp(-(t - T.total) * 8) * Math.sin((t - T.total) * 40))
        tx.save(); tx.translate(W2 - 175, H2 - 72); tx.rotate(-0.12); tx.scale(sc, sc); tx.globalAlpha = clamp(sk * 2)
        tx.font = `800 76px ${INTER}`; tx.textAlign = 'center'
        const tw = tx.measureText(SC.total).width + 44
        tx.strokeStyle = RED; tx.lineWidth = 7; tx.strokeRect(-tw / 2, -50, tw, 100)
        tx.fillStyle = RED; tx.fillText(SC.total, 0, 4)
        tx.restore()
      }
      tx.restore()
      sparkles(tx, t, CARD.cx + 230, CARD.cy + 150, T.total + 0.02, 12, 170, 1, [GOLD, RED, BONE])
    }

    function verdictCast(t) {
      if (t < T.score || t > T.out[1]) return
      const ok = popOut(t, T.out)
      // the giver pops up from the bottom-left: heart eyes, relieved hops
      const gk = pop01(t, T.giverUp, 0.36, 2.2) * ok
      if (gk > 0.01) {
        giver(tx, t, { x: 150, y: 1700, s: 150, pop: gk, mood: t > T.total + 0.1 ? 'heart' : 'wide', look: [1, -1], hops: [T.giverUp + 0.3, T.total + 0.08, T.total + 0.45, T.total + 0.8] })
        hearts(tx, t, T.total + 0.15, 150, 1600, { n: 6, rise: 240 })
      }
      // Pisces bottom-right: inconsolable (happily)
      const pk = cfg.noPis ? 0 : pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        pisces(tx, t, { x: 935, y: 1700, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.total + 0.03, T.total + 0.6] }, 3, 'sparkle', [-1, -1])
        tissueBox(tx, 1010, 1820, 70)
        label(tx, '[ sobbing ]', 905, 1612, { size: 26, col: BONE, alpha: clamp(prog(t, T.total + 0.4, T.total + 0.6)) * ok })
      }
    }

    // Pisces leaning in from the right edge during the close-up beat (the plant is off camera)
    function pisLean(t, P) {
      if (P.i !== 2 || cfg.noPis) return
      const k = ease.outBack(prog(P.u, 0.5, 0.9)) * outK(t, [T.beats[2][1] - 0.2, T.beats[2][1]])
      if (k <= 0.01) return
      pisces(tx, t, { x: lerp(1180, 990, k), y: 1180, s: 170, hops: [T.beats[2][0] + 1.0, T.beats[2][0] + 2.2] }, P.u > 1.6 ? 3 : 2, 'sparkle', [-1, -0.8])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const P = phaseAt(t)
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.25, SKY_H.zoom, ss), dy: lerp(-12, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const dS = t - T.total, shake = dS > 0 && dS < 0.45 ? 14 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        const C = cam(t, P)
        x.save(); x.translate(540, C.fy + shake); x.scale(C.z, C.z); x.translate(-540, -FACE_Y)
        world(t, P)
        x.restore()
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        pisLean(t, P)
        tx.save(); tx.translate(0, shake * 0.5); verdict(t); tx.restore()
        verdictCast(t)
        if (cfg.over) cfg.over(tx, t, P)
        H0.update(t, outK(t, T.h0Out))
        H1.update(t, outK(t, T.out))
        cc.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the jump cuts (not the card cut)
        const fl = Math.max(0, ...[T.beats[0][0], T.beats[1][0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), t >= T.total && t < T.total + 0.1 ? 0.5 * (1 - (t - T.total) / 0.1) : 0)
        flash.style.opacity = String(0.5 * fl)
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the jump into the third (twisted) reaction
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.replace(/\|/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ...wordPops(T.h0, nWords(`Silent review: ${cfg.gift}`), 0.09, 0), ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ['pop', T.revIn + 0.05, 987.77, 0.04, 0], ['pop', T.revIn + 0.12, 1318.51, 0.028, 0],
    ['whoosh', T.giverIn[0], 0.35, 0.03], ['pop', T.giverIn[1], 739.99, 0.035, -0.4],
    ['whoosh', T.giftIn[0], 0.42, 0.035], ['tick', T.giftIn[1], 0.05], ['pop', T.giftIn[1] + 0.02, 1174.66, 0.03, 0],
    ['pop', T.mute, 1567.98, 0.03, 0.3], ['tick', T.mute + 0.04, 0.03],
    ['whoosh', T.giverDuck[0], 0.25, 0.02],
    // the closed captions: a soft key-tick each
    ...CC.map(c => ['tick', r3(c.a), 0.035]),
    // the beats: jump-cut whoosh + tick, then the beat's own face sounds
    ...cfg.beats.flatMap((bt, i) => {
      const a = T.beats[i][0]
      return [
        ...(i < 2 ? [['whoosh', r3(a - 0.08), 0.26, 0.03], ['tick', a, 0.05]] : []),
        ['pluck', r3(a + 0.5), 2349.32, 0.01, 0.3, 0.6],
        ...(bt.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    // the verdict
    ['whoosh', T.cam[0], 0.45, 0.035], ['whoosh', T.cardIn[0], 0.4, 0.04], ['tick', T.cardIn[1], 0.05],
    ...wordPops(T.h1, nWords(cfg.last.replace(/\*/g, '')), 0.11, 2, 0.026),
    ...SC.rows.flatMap(([, val], i) => [
      ['pop', T.rows[i], 880, 0.04, -0.2],
      ...(typeof val === 'number' ? Array.from({ length: val }, (_, s) => ['pop', r3(T.rows[i] + 0.12 + s * 0.07), NOTE[(s + 2) % 7] * 2, 0.022, -0.3 + s * 0.15]) : [['pluck', r3(T.rows[i] + 0.1), 1174.66, 0.04, 0.6, 0.3], ['glitter', r3(T.rows[i] + 0.1), r3(T.rows[i] + 0.4)]]),
    ]),
    ['boom', T.total, 0.3], ['tom', T.total, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.total, 0.08],
    ['bell', r3(T.total + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.total + 0.05), r3(T.total + 0.55)],
    ['pop', T.giverUp + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pluck', r3(T.total + 0.15), 1174.66, 0.035, 0.5, -0.4], ['pluck', r3(T.total + 0.27), 1567.98, 0.03, 0.5, -0.4],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ].filter(c => c[1] >= 0)
  return { DURATION, SCENES, CUES, T, CUTS }
}

// ── Volume 2 helpers
/** the standard three-beat face (the Vol. 1 letter's performance): eyebrow + inspect · three nods + "wow" · the tear.
 *  opts: { inspect: [u0, u1] squint window in beat 0, wow: u of the beat-1 surprise, tear: u of the single tear } */
export function stdFace(opts = {}) {
  const ins = opts.inspect || [1.6, 2.8], wowU = opts.wow ?? 1.9, tearU = opts.tear ?? 1.5
  return (t, P, f) => {
    const u = P.u
    if (P.i === 0) {
      f.look = u < 0.3 ? [0, 0] : [0, 1]
      f.brows = { l: ramp(u, 0.55, 0.85, 0, 1), r: ramp(u, 0.55, 0.85, 0, -0.25), sl: ramp(u, 0.55, 0.85, 0, -0.7), sr: -0.3 }
      if (u > ins[0] && u < ins[1]) { f.mood = 'squint'; f.look = [lerp(-1, 1, prog(u, ins[0] + 0.1, ins[1] - 0.2)), 1] }
      f.mouth = 'flat'
    } else if (P.i === 1) {
      f.look = [0, 1]
      f.nod = [{ at: P.t0 + 0.55, n: 3, period: 0.9, amp: 24 }]
      const wow = u > wowU
      f.brows = wow ? { l: ramp(u, wowU, wowU + 0.15, 0.3, 0.95), r: ramp(u, wowU, wowU + 0.15, 0.3, 0.95), sl: 0.2, sr: 0.2 } : { l: 0.3, r: 0.3, sl: 0, sr: 0 }
      if (wow && u < wowU + 0.55) { f.mood = 'wide'; f.look = [0.6, 1] }
      f.mouth = wow ? (u < wowU + 0.55 ? 'o' : 'tight') : 'flat'
    } else {
      f.look = u < 1.3 ? [0, 1] : [0, 0]
      if (u > 0.9 && u < 1.3) f.mood = 'wide'
      const touched = ramp(u, 1.2, 1.5, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 1.25 ? 'wobble' : 'flat'
      f.tear = P.t0 + tearU
      f.shake = u > 1.3 ? 1.6 : 0
      f.blush = u > 1.3 ? 0.7 : 0
    }
    return f
  }
}
/** the standard beat sounds (eyebrow pluck + loupe pops · three nod toms + the wow · glitter, the tear's bell) */
export const STD_CUES = [
  [['tick', 0.32, 0.04], ['whoosh', 0.3, 0.4, 0.03], ['tick', 0.75, 0.035], ['pluck', 0.62, 659.25, 0.04, 0.35, 0], ['pluck', 0.74, 1318.51, 0.035, 0.4, 0],
    ['tick', 1.62, 0.03], ['pop', 1.8, 880, 0.02, -0.4], ['pop', 2.15, 987.77, 0.02, 0], ['pop', 2.5, 1174.66, 0.02, 0.4]],
  [['tom', 1.0, 72, { gain: 0.12, decay: 0.22 }], ['tom', 1.9, 70, { gain: 0.12, decay: 0.22 }], ['tom', 2.8, 68, { gain: 0.12, decay: 0.22 }],
    ['pluck', 1.9, 1567.98, 0.04, 0.5, 0.3], ['pop', 1.95, 1174.66, 0.035, 0.3], ['glitter', 1.9, 2.3]],
  [['whoosh', 0.3, 0.45, 0.025], ['glitter', 0.75, 1.0], ['pop', 0.92, 659.25, 0.03, 0],
    ['bell', 1.5, 2637.02, 0.026, 1.8, -0.2], ['pluck', 1.9, 1318.51, 0.02, 0.6, -0.2], ['whoosh', 2.2, 0.6, 0.02], ['glitter', 2.3, 2.7]],
]
/** where the gift sits on the desk: slides from the giver (left) to the middle as S.gift goes 0 → 1 */
export const giftPos = S => ({ x: lerp(250, 540, S.gift), y: 1170, rot: lerp(-0.3, -0.02, S.gift) })
/** a small handwritten tag / note text (serif italic) on the canvas */
export function scrawl(x, text, cx, cy, { size = 30, col = '#2a2a6a', align = 'center', alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.font = `italic 500 ${size}px ${SERIF}`; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(text, cx, cy); x.restore()
}
/** a pointing pixel arrow (for "look here" moments), tip at (cx, cy), pointing down */
export function arrowDown(x, t, cx, cy, k, col = GOLD) {
  if (k <= 0.01) return
  drawBits(x, ['.AAA.', '.AAA.', '.AAA.', 'AAAAA', '.AAA.', '..A..'], { A: col }, cx, cy - 30 - 8 * Math.abs(Math.sin(t * 7)), 8 * k)
}
