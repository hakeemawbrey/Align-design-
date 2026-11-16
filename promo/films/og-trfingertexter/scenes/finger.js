// PUT A FINGER DOWN kit: the shared look of Star Talk Trends format 8 (trfingeroverthink, trfingerromantic,
// trfingertexter, trfingerfirst, trfingerplanner; promo/films/STARTALK-TRENDS.md §8). Every episode carries an identical
// copy of this file in its own folder, so the five films look like one format without touching another folder.
// Pure functions of their arguments; DOM is only made inside build-time helpers (nothing touches `document` at module top
// level: the sound build imports this in node).
//
//   fingerState(toggles)                      10 fingers, each a list of toggle times [down, up, down, …] →
//                                             { fold(i, t) 0…1, count(t), changedAt(t), downs (all down times) }
//   drawHand(x, cx, cy, cell, t, { side, folds, color, alpha, jolt })   one chunky pixel hand, palm to camera, 5 fingers
//                                             (side −1 = the hand on the left of frame: pinky far left, thumb toward the star)
//   drawHands(x, t, F, { lx, rx, y, cell, color, pop, shake })          both hands for a fingerState (fingers 0–4 left
//                                             hand pinky→thumb, 5–9 right hand thumb→pinky), with a jolt on every drop
//   buildBug(root, { at })                    the format bug: pixel hand + "PUT A FINGER DOWN" (Inter 800, top-left 56 px)
//   buildSticker(root, { text, top, at })     the bold top caption sticker ("put a finger down if…")
//   buildCounter(root, { top })               the big finger counter ("10 / FINGERS UP"), update(t, F, out)
//   buildProgress(root, { end })              the fake progress bar along the very top
//   drawBubble(x, t, { cx, cy, text, at, out, side, col, size, rot })   a chat / thought bubble sticker
//   fingerCues(F, { from, notes })            the finger-drop sound: tick + a falling marimba-ish pop per finger
//   starFrame / inSprite / tearsCells / drawBits / sparkles / pop01 / outK / popOut / BEAT / colours
import { clamp, lerp, prog, ease, el, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#7dffb0', CYAN = '#7fe0ff'
export const HOT = '#ff5f8f'          // the format's accent (the bug's hand, the counter's zero, the sticker's tape)
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)            // the 108 bpm grid
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const shade = (c, k) => { const [r, g, b] = hexToRgb(c); return k < 0 ? hex(r * (1 + k), g * (1 + k), b * (1 + k)) : hex(r + (255 - r) * k, g + (255 - g) * k, b + (255 - b) * k) }

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

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK], size = 26) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
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

// ═══════════════════════════════════════════ the fingers
const FOLD_D = 0.2
/** toggles: 10 arrays of times (first = down, then up, down, …). Pure. */
export function fingerState(toggles) {
  const T = toggles.map(a => [...(a || [])].sort((p, q) => p - q))
  const last = (i, t) => { let k = -1; for (let j = 0; j < T[i].length; j++) if (T[i][j] <= t) k = j; return k }
  const fold = (i, t) => {
    const k = last(i, t)
    if (k < 0) return 0
    const p = easeOutBack(prog(t, T[i][k], T[i][k] + FOLD_D), 2.4)
    return k % 2 === 0 ? p : 1 - p                 // even toggle → going down; odd → coming back up
  }
  const isDown = (i, t) => last(i, t) % 2 === 0
  const count = t => T.reduce((n, _, i) => n + (isDown(i, t) ? 0 : 1), 0)
  const changes = T.flat().sort((p, q) => p - q)
  const changedAt = t => { let c = -1e9; for (const v of changes) if (v <= t) c = v; return c }
  const downs = T.flatMap(a => a.filter((_, j) => j % 2 === 0)).sort((p, q) => p - q)
  const ups = T.flatMap(a => a.filter((_, j) => j % 2 === 1)).sort((p, q) => p - q)
  return { toggles: T, fold, isDown, count, changedAt, changes, downs, ups }
}

// finger layout in cells (palm is 11 × 9, origin = palm top-left); x = left column (2 wide); len above the palm
const FINGERS = [{ x: 0, len: 5 }, { x: 3, len: 7 }, { x: 6, len: 8 }, { x: 9, len: 7 }]     // pinky, ring, middle, index (left hand)
/** one pixel hand, palm to the camera, centred on (cx, cy) (= the palm's centre). folds: [pinky, ring, middle, index, thumb] 0…1 */
export function drawHand(x, cx, cy, cell, t, { side = -1, folds = [0, 0, 0, 0, 0], color = GOLD, alpha = 1, sx = 1, sy = 1 } = {}) {
  const light = shade(color, 0.45), base = color, dark = shade(color, -0.28), nail = shade(color, 0.7)
  const rects = []                                         // [x, y, w, h, colour] in cells, palm-local, left-hand orientation
  // palm (rounded at the wrist)
  rects.push([0, 0, 11, 7, base], [1, 7, 9, 2, base], [9, 0, 2, 7, dark], [8, 7, 2, 2, dark], [0, 0, 1, 7, light])
  // fingers
  FINGERS.forEach((f, k) => {
    const fd = clamp(folds[k] ?? 0, -0.2, 1.15)
    const L = Math.max(0, Math.round(f.len * (1 - fd)))
    if (L > 0) {
      rects.push([f.x, -L, 2, L, base], [f.x + 1, -L, 1, L, dark], [f.x, -L, 1, 1, nail])
    }
    if (fd > 0.5) rects.push([f.x, 0, 2, 2, dark], [f.x, 0, 1, 1, light])          // the folded knuckle on the palm
  })
  // the thumb (sticks out toward the star, up and out)
  const tf = clamp(folds[4] ?? 0, -0.2, 1.15)
  if (tf < 0.6) {
    const L = Math.max(1, Math.round(5 * (1 - tf)))
    rects.push([11, 2, 1, 4, base], [12, 4 - L, 2, L + 1, base], [13, 4 - L, 1, L + 1, dark], [12, 4 - L, 1, 1, nail])
  } else rects.push([7, 3, 4, 2, dark], [7, 3, 3, 1, light])                      // thumb tucked across the palm
  // wrist cuff (a little sleeve)
  rects.push([1, 9, 9, 2, '#3a2d74'], [1, 9, 9, 1, '#5b48a8'])
  const W0 = 11, H0 = 9
  x.save(); x.globalAlpha *= alpha
  x.translate(Math.round(cx), Math.round(cy)); x.scale(sx * side * -1, sy)           // side 1 mirrors (thumb points left)
  x.translate(-W0 / 2 * cell, -H0 / 2 * cell)
  x.fillStyle = INK
  for (const [a, b, w, h] of rects) x.fillRect((a - 1) * cell, (b - 1) * cell, (w + 2) * cell, (h + 2) * cell)
  for (const [a, b, w, h, c] of rects) { x.fillStyle = c; x.fillRect(a * cell, b * cell, w * cell + 0.5, h * cell + 0.5) }
  x.restore()
}
/** both hands for a fingerState. Fingers 0–4: left hand pinky → thumb; 5–9: right hand thumb → pinky. */
export function drawHands(x, t, F, { lx = 200, rx = 880, y = 900, cell = 12, color = GOLD, pop = 1, alpha = 1, shake = null, lift = 0, sway = 1 } = {}) {
  if (pop <= 0.01 || alpha <= 0.01) return
  const ch = F.changedAt(t), dj = t - ch
  const jolt = dj >= 0 && dj < 0.5 ? Math.exp(-dj * 9) * Math.sin(dj * 30) : 0
  const tr = shake && t > shake[0] && t < shake[1] ? Math.sin(t * 70) * 4 : 0
  const fl = i => F.fold(i, t)
  for (const side of [-1, 1]) {
    const folds = side < 0 ? [fl(0), fl(1), fl(2), fl(3), fl(4)] : [fl(9), fl(8), fl(7), fl(6), fl(5)]
    const cx = side < 0 ? lx : rx
    const by = y + Math.sin(t * 2.4 + (side + 1)) * 8 * sway - 16 * jolt - lift
    drawHand(x, cx + tr, by, cell * pop, t, { side, folds, color, alpha, sx: 1 + 0.05 * jolt, sy: 1 - 0.05 * jolt })
  }
}

// ═══════════════════════════════════════════ DOM: bug, sticker, counter, progress
const HAND_ICON = ['P.P.P..', 'P.P.P..', 'PPPPP.P', 'PPPPPPP', 'PPPPPP.', '.PPPP..']
export function buildBug(root, { at = 0.3 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '44px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 44; ic.height = 44
  drawBits(ic.getContext('2d'), HAND_ICON, { P: HOT }, 22, 22, 5)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'PUT&nbsp;A&nbsp;FINGER&nbsp;DOWN')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

/** the bold sticker caption (Inter 800 ink on bone, tilted, a strip of pink tape) */
export function buildSticker(root, { text = 'put a finger down if…', top = 150, at = 2.8, size = 46, rot = -2.5 } = {}) {
  const wrap = el('div', { position: 'absolute', left: 0, width: '1080px', top: top + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { position: 'relative', padding: '14px 34px 16px', background: BONE, color: INK, font: `800 ${size}px ${INTER}`, letterSpacing: '-0.01em', borderRadius: '10px',
    boxShadow: `0 6px 0 ${INK}, 0 14px 30px rgba(6,4,18,0.55)`, whiteSpace: 'nowrap', transformOrigin: '50% 50%' }, wrap, text)
  el('div', { position: 'absolute', left: '50%', top: '-16px', width: '120px', height: '30px', marginLeft: '-60px', background: 'rgba(255,95,143,0.78)', transform: 'rotate(4deg)' }, st)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.38, 2.6) * out
      wrap.style.display = k <= 0.01 || t < at ? 'none' : 'flex'
      st.style.opacity = String(clamp(k * 2.5))
      st.style.transform = `rotate(${(rot + (1 - clamp(k)) * -10).toFixed(2)}deg) scale(${(0.5 + 0.5 * k).toFixed(4)})`
    },
  }
}

/** the big finger counter: the number (Space Mono 700) over "FINGERS UP"; bumps on each change, goes pink at zero */
export function buildCounter(root, { top = 1180, left = 540, label = 'FINGERS UP', size = 120 } = {}) {
  const box = el('div', { position: 'absolute', left: (left - 200) + 'px', width: '400px', top: top + 'px', display: 'none', textAlign: 'center', pointerEvents: 'none', transformOrigin: '50% 40%' }, root)
  const num = el('div', { font: `700 ${size}px ${MONO}`, lineHeight: '1', color: BONE, textShadow: `0 6px 0 ${INK}, 0 0 30px rgba(6,4,18,0.8)` }, box, '10')
  const lab = el('div', { font: `700 26px ${MONO}`, letterSpacing: '0.22em', color: 'rgba(239,230,214,0.75)', marginTop: '6px', textShadow: '0 2px 8px rgba(6,4,18,0.95)' }, box, label)
  let last = null
  return {
    update(t, F, k = 1, { at = 0, override = null } = {}) {
      const on = k > 0.01 && t >= at
      box.style.display = on ? 'block' : 'none'
      if (!on) return
      const n = override ?? F.count(t)
      if (n !== last) { num.textContent = String(n); last = n }
      const dj = t - F.changedAt(t)
      const bump = dj >= 0 && dj < 0.4 ? 0.35 * Math.exp(-dj * 8) * Math.cos(dj * 22) : 0
      num.style.color = n === 0 ? HOT : BONE
      lab.style.color = n === 0 ? 'rgba(255,95,143,0.9)' : 'rgba(239,230,214,0.75)'
      box.style.opacity = String(clamp(k * 2))
      box.style.transform = `scale(${(k * (1 + bump)).toFixed(4)})`
    },
  }
}

/** the fake progress bar along the top edge (generic, no platform marks) */
export function buildProgress(root, { end, start = 0 }) {
  const track = el('div', { position: 'absolute', left: '0', top: '0', width: '1080px', height: '8px', background: 'rgba(239,230,214,0.16)', pointerEvents: 'none' }, root)
  const bar = el('div', { position: 'absolute', left: '0', top: '0', height: '8px', width: '0px', background: 'rgba(239,230,214,0.85)', boxShadow: '0 0 10px rgba(239,230,214,0.5)' }, track)
  return {
    update(t) {
      const on = t >= start && t < end
      track.style.display = on ? 'block' : 'none'
      if (on) bar.style.width = (1080 * prog(t, start, end)).toFixed(1) + 'px'
    },
  }
}

/** a pixel chat / thought bubble sticker with Inter text. side 'L' | 'R' (tail), 'T' (thought dots). */
export function drawBubble(x, t, { cx, cy, text, at, out = null, side = 'L', col = BONE, ink = INK, size = 34, rot = 0, weight = 700, font = INTER, k: kk = null }) {
  const k = kk ?? pop01(t, at, 0.28, 2.3) * (out ? popOut(t, out) : 1)
  if (k <= 0.01 || t < at) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = String(text).split('\n')
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, lh = size * 1.22, h = lines.length * lh + 30
  const P = 6
  const body = (o, c) => { x.fillStyle = c; x.fillRect(-w / 2 - o + P, -h / 2 - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(-w / 2 - o, -h / 2 - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  body(5, ink); body(0, col)
  if (side === 'L' || side === 'R') {
    const d = side === 'L' ? -1 : 1, tx = d * (w / 2 - 40)
    x.fillStyle = ink; x.fillRect(tx - 14, h / 2 - 2, 28, 22); x.fillRect(tx + d * 6 - 8, h / 2 + 14, 22, 18)
    x.fillStyle = col; x.fillRect(tx - 9, h / 2 - 6, 18, 22); x.fillRect(tx + d * 6 - 3, h / 2 + 14, 12, 12)
  } else if (side === 'T') {
    for (const [dx, dy, r] of [[-w / 2 + 50, h / 2 + 24, 13], [-w / 2 + 26, h / 2 + 52, 8]]) { x.fillStyle = ink; x.fillRect(dx - r - 5, dy - r - 5, 2 * r + 10, 2 * r + 10); x.fillStyle = col; x.fillRect(dx - r, dy - r, 2 * r, 2 * r) }
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + lh * (i + 0.5) + 2))
  x.restore()
}

// ═══════════════════════════════════════════ sound
const SCALE = [1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46, 659.25, 587.33]  // falls as fingers drop
/** per finger change: a tick + a pop pitched by the count (falls a scale step per finger down, rises per finger up) */
export function fingerCues(F, { gain = 0.05 } = {}) {
  const out = []
  for (const tt of F.changes) {
    if (tt < 0) continue
    const isUp = F.ups.includes(tt)
    const n = F.count(tt + 0.001)
    out.push(['tick', +tt.toFixed(3), isUp ? 0.03 : 0.06])
    out.push(['pop', +(tt + 0.01).toFixed(3), SCALE[10 - clamp(n, 0, 10)] || 587.33, gain * (isUp ? 0.7 : 1), n % 2 ? 0.25 : -0.25])
  }
  return out
}
