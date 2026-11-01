// RATING MY DATE, HONESTLY: the shared look of the five Star Talk Trends films trratefirst, trratecooked,
// trratefriends, trrategoodbye and trratemix (promo/films/STARTALK-TRENDS.md §14). Every episode carries an identical
// copy of this file in its own folder, so the five films look like one format without touching another film's folder.
//
// The format (30 s, story 0–25.5, then the shared end card at 25.6):
//   0.00–2.60   hook: the bold top caption "Rating my <thing>, | *honestly.*" pops word by word. Inside the "clip" (a
//               framed vertical-video window with a REC dot + timestamp) the rater star holds a clipboard and says
//               something to the lens. Below, THE STARS sit at a judges' desk (three gold stars) with blank scorecards;
//               Pisces has the fourth seat, a tissue box and a soggy heart card. A fake 5-segment progress bar runs
//               under the bug; the RATING meter (0–10) stands to the right of the clip.
//   2.60–19.2   three moments (rule of three, the third twisted), each a jump cut: the caption "n · The *thing.*", the
//               clip plays the moment, then at u = 3.0 THE STARS raise their scorecards (joke ratings only) and the meter
//               fills to the moment's level; the rater comments in the dialogue box. Moment 3 overflows the meter (11).
//               The card cut sits on the swap into moment 3 (13.4).
//   19.2–25.5   the final score: a drumroll while the judges huddle, the cards flip, the meter overfills and SHATTERS,
//               a red rubber-stamp imprint lands on the clip, THE STARS say the last line; Pisces fountains.
//
//   makeRate(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.hero / cfg.date (sign ids), cfg.title (hook caption), cfg.hookTime, cfg.hookSay, cfg.hook(x, t, S)
//     cfg.moments: [{ caption, time, draw(x, t, S), cards: [a, b, c], level, line, cues: [] (u-relative) }] × 3
//     cfg.final: { caption, time, cards, stamp, draw(x, t, S), cues }      cfg.last: THE STARS' last line
//   S = { u, t0, t1, reveal, hero(x, t, o), date(x, t, o), pisces(...), HERO, DATE }
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
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
export const BUG_COL = '#ffcf4a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all five films)
export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN          // 25.6
export const REVEAL = 3.0                                 // the scorecards flip at u = REVEAL in every moment
export const T = {
  black: [0, 0.3], bug: 0.35, bar: 0.3,
  h0: 0.12, h0Out: [2.42, 2.6],
  heroIn: 0.35, say: 1.0, judgesIn: 0.75, pisIn: 1.1,
  ms: [[2.6, 8.0], [8.0, 13.4], [13.4, 19.2]],
  cut: 13.4,
  fin: 19.2, drum: [19.55, 20.9], finFlip: 20.95, overfill: [21.0, 21.3], shatter: 21.3, stamp: 21.4,
  last: 21.95, boxClose: 25.15,
  out: [25.1, 25.5], bugOut: [25.2, 25.5],
}
const CPS = 30
const LINE_U = 3.55                                       // the rater's line, u-relative

// ── layout
export const CLIP = { x: 60, y: 404, w: 840, h: 636 }    // the framed clip window (scenes draw inside, clipped)
export const CX = CLIP.x + CLIP.w / 2, FLOOR = CLIP.y + CLIP.h - 92        // 480, 948
const METER = { x: 934, y: 452, w: 82, h: 560 }
const JUDGES = [{ x: 190, s: 150 }, { x: 410, s: 150 }, { x: 630, s: 150 }]
const JY = 1300, DESK_Y = 1336, CARD_Y = 1132
const PIS = { x: 880, y: 1296, s: 128 }

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
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
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
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a simple room inside the clip: wall, a wainscot stripe, floor */
export function room(x, wall, floor, { stripe = null, floorY = FLOOR + 40 } = {}) {
  R(x, wall, CLIP.x, CLIP.y, CLIP.w, CLIP.h)
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.035)', CLIP.x + i * 100 + 30, CLIP.y, 40, floorY - CLIP.y)
  if (stripe) R(x, stripe, CLIP.x, floorY - 70, CLIP.w, 14)
  R(x, INK, CLIP.x, floorY - 6, CLIP.w, 8); R(x, floor, CLIP.x, floorY + 2, CLIP.w, CLIP.y + CLIP.h - floorY)
  for (let i = 0; i < 6; i++) R(x, 'rgba(6,4,18,0.18)', CLIP.x + i * 160 + (i % 2) * 40, floorY + 30 + (i % 3) * 22, 90, 6)
}
/** a pixel window with the night sky in it */
export function nightWindow(x, cx, cy, w, h, t) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#1d2a5c', { b: 8 })
  for (let i = 0; i < 7; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); R(x, `rgba(255,241,200,${0.4 + 0.6 * tw})`, cx - w / 2 + 14 + ((i * 53) % (w - 28)), cy - h / 2 + 12 + ((i * 37) % (h - 24)), 5, 5) }
  R(x, INK, cx - 4, cy - h / 2, 8, h); R(x, INK, cx - w / 2, cy - 4, w, 8)
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
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
/** a clipboard + pencil held at the sprite's right side (sprite cells) */
export function clipboardCells(ctx, scribble = 0) {
  ctx.save(); ctx.translate(30, 18); ctx.rotate(0.12)
  ctx.fillStyle = INK; ctx.fillRect(-1, -1, 12, 15); ctx.fillStyle = '#a07850'; ctx.fillRect(0, 0, 10, 13)
  ctx.fillStyle = BONE; ctx.fillRect(1, 2, 8, 10)
  ctx.fillStyle = '#8c86a8'; ctx.fillRect(3, -1, 4, 2)
  ctx.fillStyle = INK; for (let j = 0; j < 4; j++) ctx.fillRect(2, 4 + j * 2, j === 3 ? 3 : 6, 0.6)
  ctx.fillStyle = RED; ctx.fillRect(2 + (scribble % 1) * 4, 10.6, 1, 0.6)
  ctx.restore()
}

// ── the format bug: a tiny gold scorecard + "HONEST RATINGS" (Inter 800 small caps, letter-spaced), top-left 56 px
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '26px', height: '20px', background: BONE, boxShadow: `0 0 0 4px ${INK}, 0 0 14px rgba(255,207,74,0.6)`, font: `800 15px ${INTER}`, color: INK, display: 'grid', placeItems: 'center', lineHeight: '1' }, b, '10')
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HONEST<span style="color:rgba(255,255,255,0.6)">&nbsp;RATINGS</span>')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the stamp imprint (DOM): red ink, a double border, tilted, centred over the clip
function buildStamp(root, { text, ink }) {
  const wrap = el('div', { position: 'absolute', left: CLIP.x + 'px', top: (CLIP.y + 150) + 'px', width: CLIP.w + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 128px ${SERIF};letter-spacing:0">$1</span>`)
  const st = el('div', { padding: '18px 40px 24px', border: `11px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '9px', borderRadius: '10px', transformOrigin: '50% 50%',
    font: `800 96px ${INTER}`, letterSpacing: '-0.01em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', textAlign: 'center', background: 'rgba(255,246,234,0.9)', boxShadow: '0 10px 30px rgba(6,4,18,0.6)' }, wrap, html)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, (CLIP.w - 60) / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= T.stamp - 0.02 && t < T.out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, T.stamp - 0.02, T.stamp + 0.07), o = popOut(t, T.out)
      const sc = lerp(1.35, 1, ease.outCubic(p)) * (1 + 0.035 * Math.exp(-(t - T.stamp) * 8) * Math.sin((t - T.stamp) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(-7deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}

// ── the fake progress bar: 5 segments (hook, three moments, final) under the bug
const SEGS = [[0, 2.6], ...T.ms, [T.fin, 25.1]]
function drawBar(x, t) {
  const k = pop01(t, T.bar, 0.3, 1.6) * outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === 4 ? BUG_COL : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ── the clip window frame (drawn after the scene): ink border, rounded pixel corners, REC dot + timestamp
function clipFrame(x, t, time, k) {
  const { x: X, y: Y, w, h } = CLIP
  x.save(); x.globalAlpha *= k
  R(x, INK, X - 10, Y - 10, w + 20, 10); R(x, INK, X - 10, Y + h, w + 20, 10); R(x, INK, X - 10, Y, 10, h); R(x, INK, X + w, Y, 10, h)
  R(x, 'rgba(239,230,214,0.55)', X, Y, w, 3); R(x, 'rgba(239,230,214,0.25)', X, Y + h - 3, w, 3)
  for (const [cx, cy] of [[X, Y], [X + w - 12, Y], [X, Y + h - 12], [X + w - 12, Y + h - 12]]) R(x, INK, cx, cy, 12, 12)
  if (time) {
    const blink = Math.floor(t * 2) % 2 === 0
    x.font = `700 30px ${MONO}`
    const tw = x.measureText(time).width
    R(x, 'rgba(10,6,24,0.72)', X + 24, Y + 24, tw + 78, 50)
    if (blink) R(x, RED, X + 40, Y + 40, 18, 18)
    x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(time, X + 74, Y + 50)
  }
  x.restore()
}

// ── the RATING meter: 10 cells in a pixel tube, "/10" on top; >10 pushes the cap off; broken: shards
function drawMeter(x, t, level, k, broken) {
  if (k <= 0.01) return
  const { x: X, y: Y, w, h } = METER, n = 10, ch = h / n
  x.save(); x.globalAlpha *= clamp(k)
  x.translate(X + w / 2, Y + h); x.scale(k, k); x.translate(-(X + w / 2), -(Y + h))
  R(x, INK, X - 8, Y - 8, w + 16, h + 16); R(x, '#2a1f55', X, Y, w, h)
  const over = Math.max(0, level - 10)
  for (let i = 0; i < n; i++) {
    const f = clamp(level - i)
    if (f <= 0 || (broken && i > 2)) continue
    const col = i < 4 ? '#5fd38a' : i < 7 ? GOLD : i < 9 ? '#ff9a4a' : RED
    const hh = (ch - 8) * f
    R(x, col, X + 8, Y + h - (i + 1) * ch + 4 + (ch - 8 - hh), w - 16, hh)
    R(x, 'rgba(255,255,255,0.3)', X + 8, Y + h - (i + 1) * ch + 4 + (ch - 8 - hh), 10, hh)
  }
  // overflow cells stacking out of the top, cap knocked off
  if (over > 0 && !broken) {
    for (let i = 0; i < Math.ceil(over); i++) {
      const f = clamp(over - i), wob = 6 * Math.sin(t * 9 + i)
      R(x, INK, X + 2 + wob, Y - (i + 1) * ch - 2, w - 4, (ch - 4) * f + 4)
      R(x, i % 2 ? '#ff5c8a' : RED, X + 8 + wob, Y - (i + 1) * ch + 2, w - 16, (ch - 8) * f)
    }
  }
  // the cap with "/10"
  if (!broken) {
    const lift = Math.min(28, over * 28), rot = Math.min(0.5, over * 0.4)
    x.save(); x.translate(X + w / 2, Y - 18 - lift - Math.ceil(over) * ch); x.rotate(rot)
    box(x, -w / 2 - 8, -26, w + 16, 40, BONE, { b: 6 })
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('/10', 0, -5)
    x.restore()
  } else {
    // jagged broken top
    x.fillStyle = INK
    for (let i = 0; i < 6; i++) x.fillRect(X - 8 + i * (w + 16) / 6, Y - 8, (w + 16) / 6, 8 + ((i * 37) % 5) * 28)
    for (let i = 0; i < 3; i++) R(x, '#fff1c8', X + 10 + i * 22, Y + 40 + i * 60 + 10 * Math.sin(t * 7 + i), 6, 6)
  }
  x.restore()
}
// the shatter: meter cells fly out at T.shatter
function shards(x, t) {
  const tt = t - T.shatter
  if (tt < 0 || tt > 1.6) return
  const cols = [RED, '#ff9a4a', GOLD, '#5fd38a', BONE, '#ff5c8a']
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 1.6)
  for (let i = 0; i < 26; i++) {
    const a = -Math.PI / 2 + ((i * 0.618) % 1 - 0.5) * 2.8, v = 700 + 500 * ((i * 7) % 5) / 4
    const px = METER.x + METER.w / 2 + Math.cos(a) * v * tt, py = METER.y + 80 + (i % 5) * 60 + Math.sin(a) * v * tt + 900 * tt * tt
    const sz = 14 + (i % 4) * 6
    x.save(); x.translate(px, py); x.rotate(tt * (5 + i % 4) + i)
    x.fillStyle = INK; x.fillRect(-sz / 2 - 3, -sz / 2 - 3, sz + 6, sz + 6); x.fillStyle = cols[i % cols.length]; x.fillRect(-sz / 2, -sz / 2, sz, sz)
    x.restore()
  }
  x.restore()
}

// ── a judge's scorecard on a paddle stick: rises (back showing), flips (face), lowers
function scorecard(x, cx, baseY, text, t, { up, flip, down }, { w = 176, h = 116, seed = 0, face = BONE, ink = INK } = {}) {
  const rise = ease.outBack(prog(t, up, up + 0.32)), fall = ease.inCubic(prog(t, down, down + 0.28))
  const lift = rise * (1 - fall)
  if (lift <= 0.01) return
  const cy = lerp(baseY + 120, CARD_Y, lift) + 3 * Math.sin(t * 4 + seed)
  const fp = prog(t, flip, flip + 0.22), sx = Math.abs(Math.cos(Math.PI * fp)), shown = fp >= 0.5
  x.save(); x.translate(cx, cy); x.rotate(0.04 * Math.sin(t * 2.3 + seed * 2))
  R(x, INK, -8, h / 2 - 4, 16, 130); R(x, '#a07850', -4, h / 2, 8, 126)
  x.scale(Math.max(0.04, sx), 1)
  if (!shown) {
    box(x, -w / 2, -h / 2, w, h, '#3a2d66', { b: 6 })
    drawPixelStar(x, 0, 0, 40, 2, GOLD)
  } else {
    box(x, -w / 2, -h / 2, w, h, face, { b: 6 })
    let size = 76
    x.font = `800 ${size}px ${INTER}`
    const mw = x.measureText(text).width
    if (mw > w - 24) { size = Math.max(22, size * (w - 24) / mw) }
    const lines = text.includes('|') ? text.split('|') : [text]
    if (lines.length > 1) size = Math.min(size, 34)
    x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink
    lines.forEach((ln, i) => {
      let s2 = size; x.font = `800 ${s2}px ${INTER}`
      const lw = x.measureText(ln).width; if (lw > w - 20) { s2 = s2 * (w - 20) / lw; x.font = `800 ${s2}px ${INTER}` }
      x.fillText(ln, 0, 4 + (i - (lines.length - 1) / 2) * (size + 6))
    })
  }
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeRate(cfg) {
  const HERO = signStar(cfg.hero), PISC = signStar('pisces'), DATE = signStar(cfg.date)
  const SPEAK = 'THE STARS', HSP = `${HERO.glyph}︎ ${cfg.heroName}`
  const LINES = [
    ...cfg.moments.map((m, i) => ({ t: r3(T.ms[i][0] + LINE_U), speaker: HSP, color: cfg.heroInk || HERO.color, text: m.line })),
    { t: T.last, speaker: SPEAK, text: cfg.last },
  ]
  const JUDGE_HOPS = [T.judgesIn + 0.3, ...T.ms.map(([a]) => a + REVEAL + 0.02), T.finFlip, T.shatter + 0.05, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const reveals = T.ms.map(([a]) => a + REVEAL)

  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const date = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE.color, glyph: o.s >= 150 ? DATE.glyph : null, seed: 7, glow: 1, ...o })
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PISC.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
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

  // the meter level at t
  function levelAt(t) {
    let lv = 0
    cfg.moments.forEach((m, i) => { const p = ease.outCubic(prog(t, reveals[i] + 0.15, reveals[i] + 0.85)); lv = lerp(lv, m.level, p) })
    lv += ease.inCubic(prog(t, ...T.overfill)) * 6
    return lv
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 76px Inter", "800 30px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 128px 'EB Garamond'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const acc = cfg.accent || HERO.color
    const H0 = popText(root, cfg.title, { top: 166, size: 84, accentSize: 118, at: T.h0, gap: 0.07, accentColor: acc, fit: true })
    const HM = cfg.moments.map((m, i) => popText(root, `${i + 1} · ${m.caption}`, { top: 196, size: 92, accentSize: 128, at: T.ms[i][0] + 0.08, gap: 0.08, accentColor: acc, fit: true }))
    const HF = popText(root, cfg.final.caption, { top: 196, size: 92, accentSize: 128, at: T.fin + 0.08, gap: 0.08, accentColor: GOLD, fit: true, wobble: true })
    const HEADS = [[H0, T.h0Out], ...HM.map((h, i) => [h, [T.ms[i][1] - 0.18, T.ms[i][1]]]), [HF, T.out]]
    const stamp = buildStamp(root, { text: cfg.final.stamp, ink: cfg.stampInk || RED })
    const box1 = dialogueBox(root, { lines: LINES, y: 1478, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // the clip content for t
    function clipContent(t) {
      if (t < T.ms[0][0]) {
        // hook: the rater, clipboard in hand, to camera
        R(x, cfg.hookWall || '#2b2150', CLIP.x, CLIP.y, CLIP.w, CLIP.h)
        nightWindow(x, 250, 600, 220, 180, t)
        R(x, '#3b2e66', CLIP.x, FLOOR + 40, CLIP.w, CLIP.h)
        const k = pop01(t, T.heroIn, 0.42, 2.3)
        if (k > 0.01) {
          const o = { x: 560, y: 820, s: 300, pop: k, mood: t > T.say + 0.6 ? 'squint' : 'happy', look: [0, 0], hops: [T.heroIn + 0.35, T.say] }
          shadow(x, 560, FLOOR + 40, 260 * k)
          hero(x, t, o)
          inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => clipboardCells(x, t * 3))
        }
        bubble(x, t, 470, 560, T.say, T.ms[0][0] + 0.2, cfg.hookSay, { size: 38, tail: 0.3 })
        if (cfg.hook) cfg.hook(x, t, { hero, date, pisces, HERO, DATE })
        return cfg.hookTime
      }
      for (let i = 0; i < 3; i++) {
        const [a, b] = T.ms[i]
        if (t < a || t >= b) continue
        const punch = 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.3)))
        x.save(); x.translate(CX, CLIP.y + CLIP.h / 2); x.scale(punch, punch); x.translate(-CX, -(CLIP.y + CLIP.h / 2))
        cfg.moments[i].draw(x, t, { u: t - a, t0: a, t1: b, reveal: a + REVEAL, hero, date, pisces, HERO, DATE, i })
        x.restore()
        return cfg.moments[i].time
      }
      const ok = popOut(t, T.out)
      cfg.final.draw(x, t, { u: t - T.fin, t0: T.fin, t1: T.out[1], ok, hero, date, pisces, HERO, DATE })
      return cfg.final.time
    }

    function judges(t) {
      const ok = popOut(t, T.out)
      const dk = pop01(t, T.judgesIn - 0.15, 0.4, 1.8) * ok
      if (dk <= 0.01) return
      // judges (behind the desk)
      const huddle = Math.sin(Math.PI * prog(t, T.drum[0], T.finFlip))
      JUDGES.forEach((J, j) => {
        const k = pop01(t, T.judgesIn + j * 0.1, 0.36, 2.2) * ok
        if (k <= 0.01) return
        let mood = 'neutral', look = [0, -1]
        const rv = reveals.findIndex(r => t >= r - 0.6 && t < r + 2.3)
        if (rv >= 0) mood = t < reveals[rv] ? 'squint' : rv === 2 ? 'heart' : j === 1 ? 'wide' : 'sparkle'
        if (t >= T.drum[0] && t < T.finFlip) { mood = 'squint'; look = [j === 0 ? 1 : j === 2 ? -1 : 0, 0] }
        if (t >= T.finFlip) { mood = t >= T.shatter ? (j === 1 ? 'heart' : 'wide') : 'sparkle'; look = [0, -1] }
        if (t >= T.last + 1.6) { mood = 'happy'; look = undefined }
        const hx = J.x + huddle * (j === 0 ? 60 : j === 2 ? -60 : 0)
        drawStarChar(x, hx, JY, J.s, t, { color: STAR.sky, mood, look, hops: JUDGE_HOPS.map(h => h + j * 0.05), pop: k, seed: 2 + j * 3, glow: 1.0, blink: mood === 'wide' ? false : undefined })
      })
      // Pisces, the fourth seat
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const tears = t >= T.shatter ? 3 : t >= reveals[1] ? 2 : 1
        pisces(x, t, { x: PIS.x, y: PIS.y, s: PIS.s, pop: pk, hops: [T.pisIn + 0.3, ...reveals.map(r => r + 0.1), T.shatter + 0.1] }, tears, t >= T.shatter ? 'happy' : 'wide', [-1, -1])
      }
      // scorecards: the three moments, then the final
      JUDGES.forEach((J, j) => {
        cfg.moments.forEach((m, i) => scorecard(x, J.x, JY, m.cards[j], t, { up: reveals[i] - 0.55 + j * 0.05, flip: reveals[i] + j * 0.12, down: T.ms[i][1] - 0.45 }, { seed: j, face: i === 2 && j === 2 ? '#ffe0ea' : BONE, ink: i === 2 && j === 2 ? RED : INK }))
        scorecard(x, J.x + huddle * (j === 0 ? 60 : j === 2 ? -60 : 0) * (t < T.finFlip ? 1 : 0), JY, cfg.final.cards[j], t, { up: T.finFlip - 0.5 + j * 0.05, flip: T.finFlip + j * 0.1, down: T.out[0] - 0.05 }, { seed: j, face: '#fff1c8', ink: RED })
      })
      // Pisces' soggy heart card (every round)
      const pRounds = [...reveals.map((r, i) => [r - 0.55, r + 0.3, T.ms[i][1] - 0.45]), [T.finFlip - 0.45, T.finFlip + 0.35, T.out[0] - 0.05]]
      for (const [up, flipAt, down] of pRounds) {
        const rise = ease.outBack(prog(t, up, up + 0.32)) * (1 - ease.inCubic(prog(t, down, down + 0.28)))
        if (rise <= 0.01) continue
        const cy = lerp(PIS.y + 120, CARD_Y + 20, rise), sx = Math.abs(Math.cos(Math.PI * prog(t, flipAt, flipAt + 0.22))), shown = t >= flipAt + 0.11
        x.save(); x.translate(PIS.x + 6, cy + 4 * Math.sin(t * 5)); x.rotate(-0.08 + 0.05 * Math.sin(t * 3))
        R(x, INK, -7, 40, 14, 110); R(x, '#a07850', -3, 44, 6, 104)
        x.scale(Math.max(0.04, sx), 1)
        box(x, -60, -44, 120, 88, shown ? '#cfe9f7' : '#3a2d66', { b: 5 })
        if (shown) {
          drawBits(x, HEART, { H: '#ff5c8a' }, 0, -2, 9)
          for (let q = 0; q < 3; q++) { const ph = (t * 0.8 + q / 3) % 1; R(x, '#8fe3ff', -40 + q * 34, -30 + ph * 70, 6, 10) }
        } else drawPixelStar(x, 0, 0, 30, 2, GOLD)
        x.restore()
      }
      // the desk
      x.save(); x.globalAlpha *= clamp(dk)
      box(x, 70, DESK_Y, 940, 92, '#5a3d8a', { b: 8, hi: '#7a58b0', lo: '#3f2a66' })
      box(x, 340, DESK_Y + 22, 220, 48, GOLD, { b: 5 })
      x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('THE STARS', 450, DESK_Y + 47)
      tissues(x, 975, DESK_Y - 22, 62)
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const dS = t - T.shatter, shake = dS > 0 && dS < 0.5 ? 20 * Math.exp(-dS * 8) * Math.sin(dS * 60) : 0
        const ck = pop01(t, 0.05, 0.4, 1.6) * popOut(t, T.out)
        x.save(); x.translate(shake * 0.6, shake)
        // the clip
        if (ck > 0.01) {
          x.save()
          x.translate(CX, CLIP.y + CLIP.h / 2); x.scale(ck, ck); x.translate(-CX, -(CLIP.y + CLIP.h / 2))
          x.save(); x.beginPath(); x.rect(CLIP.x, CLIP.y, CLIP.w, CLIP.h); x.clip()
          const time = clipContent(t)
          x.restore()
          clipFrame(x, t, time, 1)
          x.restore()
        }
        // the meter
        const mk = pop01(t, 0.55, 0.36, 2) * popOut(t, T.out)
        drawMeter(x, t, levelAt(t), mk, t >= T.shatter)
        reveals.forEach((r, i) => sparkles(x, t, METER.x + METER.w / 2, METER.y + METER.h - cfg.moments[i].level * METER.h / 10, r + 0.85, 8, 70, i, [GOLD, BONE, PINK]))
        shards(x, t)
        judges(t)
        x.restore()
        sparkles(x, t, CX, CLIP.y + 300, T.stamp + 0.02, 14, 380, 1, [GOLD, BONE, PINK])
        confetti(x, t, T.stamp + 0.05, CX, CLIP.y + 300)
        drawBar(x, t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        stamp.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the hard cuts (not the card cut)
        const fl = Math.max(0, ...[T.ms[0][0], T.ms[1][0], T.fin].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), t >= T.shatter && t < T.shatter + 0.1 ? 0.7 * (1 - (t - T.shatter) / 0.1) : 0)
        flash.style.opacity = String(0.5 * fl)
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates: cardfx keeps the middle one (13.4, the swap into the twisted third moment)
  const CUTS = [T.ms[1][0], { t: T.cut, kind: 'flip' }, T.fin]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const flips = (t0, n, gap, b0) => Array.from({ length: n }, (_, j) => [['tick', r3(t0 + j * gap), 0.045], ['pop', r3(t0 + j * gap + 0.05), NOTE[(b0 + j * 2) % 7] * 1.5, 0.04, (j - 1) * 0.35]]).flat()
  const words = s => s.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const CUES = [
    ...wordPops(T.h0, words(cfg.title), 0.07, 0), ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['whoosh', 0.05, 0.35, 0.03],
    ['pop', T.heroIn + 0.05, 987.77, 0.045, 0], ['pop', T.heroIn + 0.12, 1318.51, 0.03, 0], ['pop', T.say, 1174.66, 0.035, 0.1],
    ['pop', T.judgesIn, 739.99, 0.03, -0.4], ['pop', T.judgesIn + 0.1, 880, 0.03, -0.1], ['pop', T.judgesIn + 0.2, 987.77, 0.03, 0.2], ['pluck', T.pisIn + 0.1, 2349.32, 0.012, 0.3, 0.6],
    ...cfg.moments.flatMap((m, i) => {
      const [a] = T.ms[i], rv = a + REVEAL
      return [
        ...(i < 2 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ...wordPops(a + 0.08, words(m.caption) + 2, 0.08, i * 2),
        ['tick', r3(rv - 0.5), 0.03], ['tick', r3(rv - 0.38), 0.03], ['tick', r3(rv - 0.26), 0.035], ['tick', r3(rv - 0.14), 0.04],
        ...flips(rv, 3, 0.12, i), ['riser', r3(rv + 0.15), r3(rv + 0.85), 0.02], ['bell', r3(rv + 0.85), 1760 * (i === 2 ? 1.5 : 1), 0.03, 1.0, 0.6], ['glitter', r3(rv + 0.85), r3(rv + 1.2)],
        ['pluck', r3(rv + 0.32), 2349.32, 0.014, 0.3, 0.6],
        ...(m.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    // the final: drumroll, flip, overfill, SHATTER, stamp
    ['whoosh', r3(T.fin - 0.08), 0.28, 0.035], ['tick', T.fin, 0.05], ...wordPops(T.fin + 0.08, words(cfg.final.caption), 0.08, 3),
    ...Array.from({ length: 22 }, (_, i) => ['tick', r3(T.drum[0] + (T.drum[1] - T.drum[0]) * Math.sqrt(i / 22)), 0.02 + 0.03 * i / 22]),
    ['riser', T.drum[0], T.finFlip, 0.03],
    ...flips(T.finFlip, 3, 0.1, 4), ['riser', T.overfill[0], T.shatter, 0.04],
    ['boom', T.shatter, 0.34], ['glitter', T.shatter, r3(T.shatter + 0.6)], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.shatter + 0.02 + i * 0.05), 0.05 - i * 0.004]),
    ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08], ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)],
    ['pluck', r3(T.shatter + 0.2), 1174.66, 0.035, 0.5, 0.6], ['pluck', r3(T.shatter + 0.32), 1567.98, 0.03, 0.5, 0.6],
    ...(cfg.final.cues || []).map(c => [c[0], r3(c[1] + T.fin), ...c.slice(2)]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS, LINES }
}
