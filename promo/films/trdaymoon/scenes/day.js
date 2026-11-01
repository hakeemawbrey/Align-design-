// A DAY IN THE LIFE OF… show kit: the shared vlog look of Star Talk Trends format 10 (trdaycard, trdaymoon, trdaytissues,
// trdayporch, trdayphone; promo/films/STARTALK-TRENDS.md §10). Every episode carries an identical copy of this file in its
// own folder, so the five films look like one format without touching another film's folder. Pure f(t) at update time;
// DOM / canvases are only made inside build-time helpers (nothing touches `document` at module top level: the sound
// build imports it through scenes/index.js in node).
//
//   buildBug(root, { at })                       the format bug, top-left 56 px: a blinking pixel REC dot + "A DAY IN THE LIFE"
//   buildClock(root, { stamps, at })             the timestamp overlay, top-right 56 px ("7:02 AM"); flips at each stamp
//   buildProgress(root, { end, marks, at })      the fake vlog progress bar under the bug/clock, chapter ticks at `marks`
//   buildSticker(root, { text, x, y, rot, at, out, bg, color, size })   a caption sticker (Inter 800 on a tilted card)
//   drawWash(x, t, { warm })                     the lofi wash: a warm lamp glow + soft vignette over the sky
//   handheld(t, k)                               a slow handheld-camera drift { dx, dy, rot }
//   pisces(x, t, P, tears, mood, look)           the running gag: Pisces, crying (tears 1 sniffle · 2 streams · 3 fountains)
//   clockCues / stickerCue / wordPops            matching sound cues
//   drawBits, sparkles, hearts, pop01, outK, popOut, starFrame, inSprite, tearsCells, colours
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', PEACH = '#ffb88a', REC = '#ff4f5e'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)            // the 108 bpm grid
export const FONTS = ["800 112px Inter", "600 30px Inter", "700 30px Inter", "800 40px Inter", "italic 500 150px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'"]
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0.01 || cell <= 0.01) return
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
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

export const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** little pixel hearts floating up from (cx, cy) from t0 for `life` s */
export function hearts(x, t, cx, cy, t0, { n = 6, life = 2.4, spread = 160, cell = 7, seed = 1, alpha = 1 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const born = t0 + i * (life / n) * 0.5
    const ph = (t - born) / 1.6
    if (ph < 0 || ph > 1 || t > t0 + life + 1.6) continue
    const sx = Math.sin(i * 2.7 + seed) * spread * 0.5
    drawBits(x, HEART, { H: i % 2 ? PINK : '#ff4f86', W: '#fff' }, cx + sx + Math.sin(ph * 6 + i) * 14, cy - ph * 260, cell * (0.6 + 0.4 * Math.min(1, ph * 4)), { alpha: alpha * (1 - ease.inQuad(ph)) })
  }
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
const PIS = signStar('pisces')
/** the running gag: Pisces crying somewhere in the background. P = { x, y, s, pop?, alpha?, hops? } */
export function pisces(x, t, P, tears = 1, mood = 'wide', look = [-1, 0]) {
  const opts = { color: PIS.color, glyph: P.s >= 120 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops }
  if (opts.pop <= 0.01 || opts.alpha <= 0.01) return
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (tears) { x.save(); x.globalAlpha *= opts.alpha; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
}

// ── the format bug: a blinking pixel REC dot + "A DAY IN THE LIFE" (Inter 800, letter-spaced small caps, peach)
export function buildBug(root, { at = 0.35 } = {}) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const dot = el('canvas', { width: '24px', height: '24px', imageRendering: 'pixelated' }, box)
  dot.width = 24; dot.height = 24
  drawBits(dot.getContext('2d'), ['.RRR.', 'RRRRR', 'RWRRR', 'RRRRR', '.RRR.'], { R: REC, W: '#ffd0d4' }, 12, 12, 3.6)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: PEACH, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'A&nbsp;DAY&nbsp;IN&nbsp;THE&nbsp;LIFE')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
      dot.style.opacity = Math.floor(t * 1.6) % 2 ? '0.35' : '1'
    },
  }
}

// ── the timestamp overlay: top-right, Space Mono on a dark pixel pill; the digits flip at each stamp
export function buildClock(root, { stamps, at = 0.4 }) {
  const box = el('div', { position: 'absolute', right: '56px', top: '50px', height: '56px', padding: '0 20px', display: 'none', alignItems: 'center', gap: '12px',
    background: 'rgba(12,7,30,0.72)', border: `3px solid ${BONE}`, borderRadius: '6px', boxShadow: `0 0 0 3px ${INK}, 0 6px 18px rgba(6,4,18,0.6)`, transformOrigin: '100% 50%', pointerEvents: 'none' }, root)
  const tx = el('div', { font: `700 34px ${MONO}`, color: BONE, letterSpacing: '0.04em', whiteSpace: 'nowrap', transformOrigin: '50% 50%', textShadow: '0 2px 0 rgba(6,4,18,0.9)' }, box, stamps[0].text)
  let cur = -1
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      if (k <= 0.01) return
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
      let i = 0
      for (let n = 0; n < stamps.length; n++) if (t >= stamps[n].t) i = n
      if (i !== cur) { tx.innerHTML = stamps[i].text.replace(/ /g, '&nbsp;'); cur = i }
      const p = prog(t, stamps[i].t, stamps[i].t + 0.3)
      const sy = i === 0 || p >= 1 ? 1 : 0.2 + 0.8 * easeOutBack(p, 2.6)
      tx.style.transform = `scaleY(${sy.toFixed(3)})`
      tx.style.color = i > 0 && p < 1 ? PEACH : BONE
    },
  }
}

// ── the fake vlog progress bar: one thin track, a peach fill, small chapter ticks
export function buildProgress(root, { end, marks = [], at = 0.4 }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '128px', width: '968px', height: '8px', background: 'rgba(239,230,214,0.2)', borderRadius: '4px', display: 'none', pointerEvents: 'none' }, root)
  const fillD = el('div', { position: 'absolute', left: 0, top: 0, bottom: 0, width: '0px', background: PEACH, borderRadius: '4px', boxShadow: '0 0 10px rgba(255,184,138,0.6)' }, box)
  for (const m of marks) el('div', { position: 'absolute', left: (968 * m / end - 2) + 'px', top: '-3px', width: '4px', height: '14px', background: 'rgba(239,230,214,0.55)' }, box)
  const knob = el('div', { position: 'absolute', top: '-6px', width: '20px', height: '20px', marginLeft: '-10px', background: BONE, borderRadius: '50%', boxShadow: '0 0 8px rgba(255,184,138,0.9)' }, box)
  return {
    update(t, out = 1) {
      const k = clamp(prog(t, at, at + 0.4)) * out
      box.style.display = k <= 0.01 ? 'none' : 'block'
      box.style.opacity = String(k)
      const w = 968 * clamp(t / end)
      fillD.style.width = w + 'px'; knob.style.left = w + 'px'
    },
  }
}

// ── a caption sticker: Inter 800 on a tilted card, pops in with a spring, pops out
export function buildSticker(root, { text, x, y, rot = -4, at, out, bg = BONE, color = INK, size = 40, accent = '#d6336c' }) {
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${Math.round(size * 1.25)}px ${SERIF};color:${accent}">$1</span>`)
  const e = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', padding: '8px 22px 10px', background: bg, color, font: `800 ${size}px ${INTER}`, letterSpacing: '-0.01em',
    borderRadius: '12px', border: `4px solid ${INK}`, boxShadow: '0 8px 0 rgba(6,4,18,0.55)', whiteSpace: 'nowrap', display: 'none', transformOrigin: '50% 50%', pointerEvents: 'none' }, root, html)
  return {
    update(t) {
      const k = pop01(t, at, 0.34, 2.6) * (out ? popOut(t, out) : 1)
      e.style.display = k <= 0.01 ? 'none' : 'block'
      if (k <= 0.01) return
      const wob = 3 * Math.sin((t - at) * 14) * Math.exp(-(t - at) * 4)
      e.style.opacity = String(clamp(k * 3))
      e.style.transform = `translate(-50%,-50%) rotate(${(rot + wob).toFixed(2)}deg) scale(${k.toFixed(4)})`
    },
  }
}

/** the lofi wash: a warm lamp glow in the middle + a soft edge darkening (drawn over the sky, under the props) */
export function drawWash(x, t, { warm = 1, cx = 540, cy = 980, r = 760, col = '255,190,140' } = {}) {
  if (warm <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${col},${(0.16 * warm).toFixed(3)})`); g.addColorStop(0.6, `rgba(${col},${(0.05 * warm).toFixed(3)})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
}
/** a slow handheld-camera drift */
export function handheld(t, k = 1) {
  return { dx: k * (5 * Math.sin(t * 0.9) + 2.5 * Math.sin(t * 2.3 + 1)), dy: k * (4 * Math.sin(t * 0.7 + 2) + 2 * Math.sin(t * 1.9)), rot: k * 0.004 * Math.sin(t * 0.6 + 0.5) }
}

// ── sound helpers (pitched SFX are shifted into the film's key by the engine)
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const stickerCue = (t, i = 0) => [['pop', +t.toFixed(3), NOTE[(i * 3 + 2) % 7] * 2, 0.035, i % 2 ? 0.3 : -0.3], ['tick', +(t + 0.04).toFixed(3), 0.03]]
export const clockCues = stamps => stamps.slice(1).flatMap(s => [['tick', +s.t.toFixed(3), 0.04], ['tick', +(s.t + 0.07).toFixed(3), 0.03], ['pluck', +(s.t + 0.1).toFixed(3), 1318.51, 0.025, 0.4, 0.5]])
