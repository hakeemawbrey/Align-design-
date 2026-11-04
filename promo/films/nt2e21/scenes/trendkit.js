// Trends, Volume 2 · the shared core for batch b12 (nt2e21–nt2e40). Pure helpers and the film shell used by the four
// format kits: ./barekit.js (THE BARE MINIMUM), ../../nt2e26/scenes/pettykit.js (PETTY OR VALID),
// ../../nt2e31/scenes/saidkit.js (WHAT THEY SAID vs WHAT THEY MEANT) and ../../nt2e36/scenes/natkit.js (NATURE
// DOCUMENTARY NARRATOR). The drawing helpers mirror trtellleo/scenes/tellkit.js (copied, not imported, so no film
// depends on another batch's folder).
//
//   makeFilm(cfg) → { DURATION, SCENES, CUES, STORY_END }
//     cfg.duration, cfg.bug { main, dim }, cfg.hook { text, top, size, accentSize, color, out:[a,b] } (shown at t = 0),
//     cfg.paint(x, t) main canvas (after the sky), cfg.top(x, t) top canvas, cfg.dom(root) → [{ update(t) }],
//     cfg.lines / cfg.box { open, close, y } (dialogue box), cfg.cuts, cfg.cues, cfg.shake(t) → px, cfg.sky(t) → sky opts.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#4fd18b', SKYB = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_PINK = '#ff7eb6'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, el, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, talkHops, popText, ENDCARD_LEN, ENDCARD_SHORT_LEN }
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
export const article = id => (/^[aeiou]/i.test(NAMES[id]) ? 'an' : 'a')

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
export function confetti(x, t, t0, cx, cy, { n = 26, spread = 420, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
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
  void spread
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
/** a warm spotlight cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
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
/** pixel sunglasses over the eyes (sprite cells); up 0…1 pushes them onto the head */
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}


// ═══════════════════════════════════════════════════════════════ DOM pieces
/** the series bug: the format name in Inter 800 small caps, letter-spaced, top-left 56 px (a pink pip first) */
export function buildBug(root, { main, dim = '', at = -1, col = BUG_PINK }) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: col, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  const nb = s => s.replace(/ /g, '&nbsp;')
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: col, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    nb(main) + (dim ? `<span style="color:rgba(255,255,255,0.6)">&nbsp;${nb(dim)}</span>` : ''))
  return {
    update(t, out = 1) {
      const k = (t < at + 0.36 ? pop01(t, at, 0.36, 2.2) : 1) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * Math.min(1, k)).toFixed(4)})`
    },
  }
}

const accentHTML = (text, { size, col, font = SERIF }) => text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${size}px ${font};color:${col};letter-spacing:0">$1</span>`)

/** a tilted bone caption sticker with an optional round badge; `*accent*` in Garamond italic */
export function buildSticker(root, { badge = null, badgeCol = GOLD, text, deep = '#7a2a5a', at, out, tilt = -1.5, top = 1330, size = 50, bg = BONE, ink = INK, maxW = 940 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: maxW + 'px', padding: badge ? '18px 34px 20px 22px' : '18px 34px 20px', background: bg, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  if (badge !== null) el('div', { flex: '0 0 auto', minWidth: '74px', height: '74px', padding: '0 10px', boxSizing: 'border-box', borderRadius: '37px', background: badgeCol, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 ${String(badge).length > 2 ? 30 : 40}px ${INTER}`, color: INK, whiteSpace: 'nowrap' }, st, String(badge))
  el('div', { font: `800 ${size}px ${INTER}`, lineHeight: '1.1', color: ink, letterSpacing: '-0.01em', textAlign: badge !== null ? 'left' : 'center' }, st, accentHTML(text, { size: Math.round(size * 1.26), col: deep }))
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

/** a rubber-stamp imprint (DOM): `html` text in ink, double border, tilted; slams at `at`, pops out over `out` */
export function buildStamp(root, { text, ink = RED, at, out, top = 190, rot = -6, size = 130, maxW = 940 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '20px 48px 26px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', transformOrigin: '50% 50%',
    font: `800 ${size}px ${INTER}`, letterSpacing: '-0.02em', color: ink, lineHeight: '1', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.04)', textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap,
    accentHTML(text, { size: Math.round(size * 1.25), col: ink }))
  wrap.style.display = 'flex'
  const fitK = Math.min(1, maxW / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= at - 0.02 && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at - 0.02, at + 0.06), o = popOut(t, out)
      const sc = lerp(1.25, 1, ease.outCubic(p)) * (1 + 0.03 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(${rot}deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}
export function stampCues(at) {
  return [['whoosh', r3(at - 0.34), 0.32, 0.04], ['boom', at, 0.3], ['tom', at, 88, { gain: 0.28, decay: 0.3 }], ['tick', at, 0.08],
    ['bell', r3(at + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(at + 0.05), r3(at + 0.55)], ['whoosh', r3(at + 0.2), 0.3, 0.02]]
}
/** the rubber stamp tool (canvas): slams down to y = land at `at`, then lifts away */
export function drawStampTool(x, t, at, { ink = RED, land = 330, cx = 540 } = {}) {
  const a = at - 0.34
  if (t < a || t > at + 0.6) return
  let y, rot = -0.1
  if (t < at) { const p = ease.inCubic(prog(t, a, at)); y = lerp(-420, land, p); rot = lerp(-0.35, -0.1, p) }
  else { const q = ease.inOutCubic(prog(t, at + 0.1, at + 0.6)); y = lerp(land, -460, q); rot = lerp(-0.1, 0.25, q) }
  const sq = t >= at && t < at + 0.1 ? 0.12 * Math.sin(Math.PI * (t - at) / 0.1) : 0
  x.save(); x.translate(cx, y); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -330, -40, 660, 110, '#6b4a2f', { b: 8, hi: '#8a6440' }); R(x, ink, -330, 70, 660, 20)
  box(x, -50, -170, 100, 130, '#7b5634', { b: 8, hi: '#98704a' }); box(x, -110, -260, 220, 100, RED, { b: 8, hi: '#ff6b7f' })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════ cast
/** a sign star; o: { x, y, s, ... drawStarChar opts } */
export function star(x, t, id, o = {}) {
  const S = signStar(id)
  return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: o.seed ?? 3, glow: 1, ...o })
}
/** Pisces with tears (k: 1 sniffle · 2 streams · 3 fountains); returns the sprite frame */
export function pisces(x, t, P, tears = 1, mood = 'sparkle', look = [-1, -0.5]) {
  const PIS = signStar('pisces')
  const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** THE STARS (the gold narrator star) */
export function theStars(x, t, o) { return drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, mood: 'neutral', seed: 2, glow: 1.05, ...o }) }
/** a held card on a stick above (cx, top): text in Inter 800 */
export function heldCard(x, t, cx, top, k, text, { col = RED, bg = BONE, w = 170, size = 46 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const ww = Math.max(w, x.measureText(text).width + 40)
  box(x, -ww / 2, -50, ww, 100, bg, { b: 6 }); R(x, INK, -6, 50, 12, 70)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 4)
  x.restore()
}
/** a crowd of tiny stars (ids cycle) across [x0, x1] at y, cheering when cheer > 0 */
export function crowd(x, t, ids, x0, x1, y, s, { cheer = 0, mood = 'happy', seed = 20, look = [0, -1] } = {}) {
  ids.forEach((id, i) => {
    const px = ids.length > 1 ? lerp(x0, x1, i / (ids.length - 1)) : (x0 + x1) / 2
    const hop = cheer > 0 ? Math.abs(Math.sin(t * 9 + i * 1.7)) * s * 0.18 * cheer : 0
    star(x, t, id, { x: px, y: y - hop + (i % 2) * s * 0.18, s, mood, look, seed: seed + i, tips: false, glow: 0.6 })
  })
}

// ═══════════════════════════════════════════════════════════════ props (canvas, pixel-chunky, ink outlines)
export function phoneProp(x, cx, cy, { rot = 0, s = 1, lines = [], screen = '#14102a', textCol = BONE, head = null } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 }); R(x, screen, -58, -108, 116, 210)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.font = `700 16px ${MONO}`; x.fillStyle = '#9fe6b0'; x.fillText(head, 0, -90) }
  lines.forEach((L, i) => {
    const y = -60 + i * 46
    x.font = `800 17px ${INTER}`
    const w = Math.min(104, x.measureText(L).width + 18)
    R(x, i % 2 ? '#7c74f0' : '#efe6d6', (i % 2 ? 50 - w : -50), y - 16, w, 32)
    x.fillStyle = i % 2 ? '#ffffff' : INK; x.fillText(L, (i % 2 ? 50 - w / 2 : -50 + w / 2), y + 1)
  })
  void textCol
  x.restore()
}
/** a gold picture frame (w × h) around whatever inner() draws (inner gets a local box at 0,0) */
export function frameProp(x, cx, cy, w, h, inner, { rot = 0, col = GOLD } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2 - 22, -h / 2 - 22, w + 44, h + 44, col, { b: 7, hi: '#ffe7a0', lo: '#b8862a' })
  R(x, '#fff6e2', -w / 2, -h / 2, w, h)
  if (inner) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); inner(x); x.restore() }
  x.restore()
}
export function bookProp(x, cx, cy, { rot = 0, s = 1, col = '#d8577e', writing = 1, hearts: hk = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -95, 300, 190, col, { b: 7 }); R(x, '#fff6e2', -140, -86, 136, 172); R(x, '#fff6e2', 4, -86, 136, 172); R(x, INK, -4, -95, 8, 190)
  for (let i = 0; i < 5; i++) { const w = 110 * clamp(writing * 5 - i); if (w > 0) R(x, '#7a6a9a', -128, -64 + i * 30, w, 5) }
  if (hk > 0) for (let i = 0; i < 3; i++) drawBits(x, HEART, { H: '#ff5c8a' }, 40 + i * 34, -40 + (i % 2) * 40, 5 * clamp(hk * 3 - i), { outline: null })
  x.restore()
}
export function trophyProp(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -60, -120, 120, 90, GOLD, { b: 7, hi: '#ffe7a0' }); box(x, -90, -110, 22, 50, GOLD, { b: 6 }); box(x, 68, -110, 22, 50, GOLD, { b: 6 })
  box(x, -16, -30, 32, 40, '#d9a83a', { b: 6 }); box(x, -55, 10, 110, 30, '#6b4a2f', { b: 6 })
  drawPixelStar(x, 0, -76, 30, 2, '#fff6c8')
  x.restore()
}
export function roseProp(x, cx, cy, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -5, -4, 10, 64); R(x, '#3fae5a', -2, -2, 4, 60); R(x, INK, 2, 20, 18, 10); R(x, '#3fae5a', 4, 22, 14, 6)
  drawBits(x, ['.RRR.', 'RRrRR', 'RrRrR', '.RRR.'], { R: '#e8344e', r: '#ff6b7f' }, 0, -14, 7)
  x.restore()
}
export function bunting(x, t, x0, x1, y, { cols = [PINK, GOLD, '#7fd0ff', '#9fe6b0', LAV], n = 9, sag = 40, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 20; i++) { const p = i / 20, px = lerp(x0, x1, p), py = y + Math.sin(Math.PI * p) * sag; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n, px = lerp(x0, x1, p), py = y + Math.sin(Math.PI * p) * sag, sw = Math.sin(t * 5 + i) * 0.12
    x.save(); x.translate(px, py); x.rotate(sw); x.fillStyle = INK; x.beginPath(); x.moveTo(-24, -2); x.lineTo(24, -2); x.lineTo(0, 46 * clamp(k)); x.closePath(); x.fill()
    x.fillStyle = cols[i % cols.length]; x.beginPath(); x.moveTo(-18, 2); x.lineTo(18, 2); x.lineTo(0, 36 * clamp(k)); x.closePath(); x.fill(); x.restore()
  }
  x.restore()
}
export function goldStarSticker(x, cx, cy, s = 1, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); drawBits(x, ['...G...', '..GGG..', 'GGGWGGG', '.GGGGG.', '..GGG..', '.GG.GG.', 'GG...GG'], { G: GOLD, W: '#fff6c8' }, 0, 0, 12 * s); x.restore() }
export function paperProp(x, cx, cy, w, h, { rot = 0, col = '#fff6e2', title = null, big = null, bigCol = RED, lines = 0, font = INTER } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (title) { x.font = `700 ${Math.round(w * 0.085)}px ${MONO}`; x.fillStyle = INK; x.fillText(title, 0, -h / 2 + w * 0.1) }
  for (let i = 0; i < lines; i++) R(x, '#b8aed0', -w / 2 + 24, -h / 2 + (title ? w * 0.2 : 26) + i * 22, w - 48 - (i % 3) * 30, 5)
  if (big) { x.font = `800 ${Math.round(Math.min(w * 0.42, h * 0.5))}px ${font}`; x.fillStyle = bigCol; x.fillText(big, 0, h * 0.12) }
  x.restore()
}
export function clipboardProp(x, cx, cy, { rot = 0, s = 1, ticks = 3 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -80, -110, 160, 220, '#a07850', { b: 6 }); R(x, '#fff6e2', -66, -88, 132, 186); box(x, -34, -124, 68, 26, '#8c86a8', { b: 5 })
  for (let i = 0; i < ticks; i++) { R(x, INK, -52, -64 + i * 40, 18, 18); R(x, '#4fd18b', -49, -61 + i * 40, 12, 12); R(x, '#b8aed0', -24, -58 + i * 40, 76, 6) }
  x.restore()
}
export function whiteboardProp(x, cx, cy, w, h, text, { k = 1, col = '#3a6ad8', size = 40 } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#f6f3ec', { b: 8 }); R(x, '#8c86a8', cx - w / 2 + 20, cy + h / 2 + 8, 14, 120); R(x, '#8c86a8', cx + w / 2 - 34, cy + h / 2 + 8, 14, 120)
  if (k > 0) {
    x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w * clamp(k), h); x.clip()
    x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col
    String(text).split('|').forEach((L, i, a) => x.fillText(L, cx, cy + (i - (a.length - 1) / 2) * size * 1.15))
    x.restore()
  }
}
export function blanketProp(x, cx, cy, w, h, { col = '#d8577e', stripe = '#f2c75c', rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  for (let i = 1; i < 5; i++) R(x, stripe, -w / 2, -h / 2 + (h * i) / 5 - 4, w, 8)
  x.restore()
}
export function pillowProp(x, cx, cy, w, h, col = '#c9a6ff', rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -w / 2, -h / 2, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.3)' }); R(x, 'rgba(27,18,54,0.25)', -w / 2 + 10, -2, w - 20, 4); x.restore() }
export function cookieProp(x, cx, cy, s = 1) { drawBits(x, ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', '.CCCC.'], { C: '#d9a05a', d: '#6b3f1f' }, cx, cy, 9 * s) }
export function mugProp(x, cx, cy, { col = '#e8344e', s = 1, steam = 0, t = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -40, -50, 80, 90, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, INK, 40, -32, 26, 50); R(x, col, 46, -26, 14, 38); R(x, INK, 40, -20, 10, 20)
  if (steam > 0) for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = steam * (1 - ph) * 0.8; R(x, BONE, -20 + i * 18 + Math.sin(ph * 6 + i) * 6, -70 - ph * 60, 8, 16) }
  x.restore()
}
export function backpackProp(x, cx, cy, { col = '#4f7cd8', s = 1, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -50, -70, 100, 140, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); box(x, -36, 0, 72, 50, '#2e4a90', { b: 5 }); R(x, GOLD, -6, 10, 12, 10); box(x, -30, -96, 60, 22, col, { b: 5 })
  x.restore()
}
export function mapProp(x, cx, cy, { rot = 0, s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -110, -76, 220, 152, '#f2e2b8', { b: 6 }); R(x, 'rgba(27,18,54,0.18)', -38, -76, 4, 152); R(x, 'rgba(27,18,54,0.18)', 34, -76, 4, 152)
  x.strokeStyle = RED; x.lineWidth = 5; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-84, 40); x.bezierCurveTo(-40, -50, 20, 60, 70, -30); x.stroke(); x.setLineDash([])
  R(x, RED, 62, -44, 8, 28); R(x, RED, 52, -34, 28, 8)
  x.restore()
}
export function menuProp(x, cx, cy, title, { rot = 0, s = 1, col = '#2f6f5a' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -90, -130, 180, 260, col, { b: 6 }); R(x, '#fff6e2', -74, -112, 148, 224)
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(title, 0, -84)
  for (let i = 0; i < 6; i++) { R(x, '#b8aed0', -58, -50 + i * 28, 80 - (i % 3) * 14, 5); R(x, '#b8aed0', 36, -50 + i * 28, 22, 5) }
  x.restore()
}
export function laptopProp(x, cx, cy, { s = 1, screen = '#14102a', text = '' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -150, -190, 300, 190, '#3a3456', { b: 7 }); R(x, screen, -136, -176, 272, 162)
  if (text) { x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#9fe6b0'; String(text).split('|').forEach((L, i, a) => x.fillText(L, 0, -95 + (i - (a.length - 1) / 2) * 32)) }
  box(x, -190, 0, 380, 26, '#5a5470', { b: 6 })
  x.restore()
}
export function folderStack(x, cx, cy, n = 6, { w = 220 } = {}) { for (let i = 0; i < n; i++) box(x, cx - w / 2 + (i % 2) * 8, cy - i * 34, w, 26, ['#e9b24a', '#7fd0ff', '#9fe6b0', '#ff8fb1'][i % 4], { b: 5 }) }
export function plantProp(x, cx, cy, { s = 1, tag = null } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['..L.L..', '.LLLLL.', 'LLlLLlL', '.LLLLL.', '...S...'], { L: '#3fae5a', l: '#8fe08f', S: '#2f7a3a' }, 0, -70, 12)
  box(x, -48, -36, 96, 70, '#d9734a', { b: 6, hi: '#f0956a' })
  if (tag) { box(x, 30, -10, 110, 40, BONE, { b: 4 }); x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(tag, 85, 11) }
  x.restore()
}
export function starMapProp(x, cx, cy, { rot = 0, s = 1, k = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -130, -95, 260, 190, '#1f2a5a', { b: 6 })
  const P = [[-90, -50], [-40, -20], [10, -60], [60, -10], [95, 50], [20, 40], [-60, 50]]
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3; x.beginPath()
  P.forEach(([px, py], i) => { if (i / P.length > k) return; i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke()
  P.forEach(([px, py], i) => { if (i / P.length <= k) drawPixelStar(x, px, py, 18, 1, i % 2 ? GOLD : BONE) })
  drawBits(x, HEART, { H: '#ff5c8a' }, 100, -68, 4, { outline: null })
  x.restore()
}
export function jacketProp(x, cx, cy, { col = '#c45a3a', s = 1, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -90, -80, 180, 170, col, { b: 6, hi: 'rgba(255,255,255,0.2)' }); box(x, -140, -70, 50, 140, col, { b: 6 }); box(x, 90, -70, 50, 140, col, { b: 6 })
  R(x, INK, -4, -80, 8, 170); R(x, '#f2c75c', -16, -40, 8, 8); R(x, '#f2c75c', -16, 0, 8, 8); R(x, '#f2c75c', -16, 40, 8, 8)
  x.restore()
}
export function dumplingProp(x, cx, cy, s = 1) { drawBits(x, ['..WWW..', '.WwWwW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.'], { W: '#f6ecd8', w: '#d9c8a8' }, cx, cy, 10 * s) }
export function takeoutProp(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-76, -60); x.lineTo(76, -60); x.lineTo(58, 70); x.lineTo(-58, 70); x.closePath(); x.fill()
  x.fillStyle = '#f6f3ec'; x.beginPath(); x.moveTo(-66, -52); x.lineTo(66, -52); x.lineTo(50, 62); x.lineTo(-50, 62); x.closePath(); x.fill()
  R(x, RED, -40, -10, 80, 26); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-40, -60); x.quadraticCurveTo(0, -120, 40, -60); x.stroke()
  x.restore()
}
export function friesProp(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (let i = 0; i < 7; i++) { R(x, INK, -48 + i * 14, -78 + (i % 3) * 10, 12, 70); R(x, '#f2c75c', -46 + i * 14, -76 + (i % 3) * 10, 8, 66) }
  box(x, -56, -20, 112, 80, RED, { b: 6, hi: '#ff6b7f' })
  x.restore()
}
export function capeProp(x, t, cx, cy, s, swish = 0, col = '#5a1a3a') {
  x.save(); x.translate(cx, cy)
  const w = s * 0.9, h = s * 0.85, f = Math.sin(t * 6) * 0.08 + swish * 0.5
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w * 0.3, -h * 0.35); x.lineTo(w * 0.3, -h * 0.35); x.lineTo(w * (0.55 + f), h * 0.55); x.lineTo(-w * (0.55 - f), h * 0.55); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-w * 0.26, -h * 0.31); x.lineTo(w * 0.26, -h * 0.31); x.lineTo(w * (0.5 + f), h * 0.5); x.lineTo(-w * (0.5 - f), h * 0.5); x.closePath(); x.fill()
  x.restore()
}
/** a pixel hedge / bush (nature doc foreground, Libra's hedge) */
export function bushProp(x, t, cx, cy, w, h, { col = '#2f6a3a', hi = '#4f9a4f', sway = 1, seed = 0 } = {}) {
  const n = Math.max(3, Math.round(w / 70))
  for (let i = 0; i < n; i++) {
    const bx = cx - w / 2 + (i + 0.5) * (w / n), r = (w / n) * 0.75 + ((i * 37 + seed) % 3) * 8, by = cy - ((i * 53 + seed) % 4) * 10 + Math.sin(t * 1.3 + i + seed) * 3 * sway
    x.fillStyle = INK; x.beginPath(); x.arc(bx, by, r + 6, 0, Math.PI * 2); x.fill()
  }
  for (let i = 0; i < n; i++) {
    const bx = cx - w / 2 + (i + 0.5) * (w / n), r = (w / n) * 0.75 + ((i * 37 + seed) % 3) * 8, by = cy - ((i * 53 + seed) % 4) * 10 + Math.sin(t * 1.3 + i + seed) * 3 * sway
    x.fillStyle = col; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = hi; x.beginPath(); x.arc(bx - r * 0.3, by - r * 0.35, r * 0.4, 0, Math.PI * 2); x.fill()
  }
  R(x, col, cx - w / 2, cy, w, h)
}
export function binoculars(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -44, -20, 36, 44, '#3a3456', { b: 5 }); box(x, 8, -20, 36, 44, '#3a3456', { b: 5 }); R(x, INK, -8, -6, 16, 14)
  R(x, '#8fe3ff', -36, 14, 20, 8); R(x, '#8fe3ff', 16, 14, 20, 8)
  x.restore()
}
export function statueProp(x, cx, cy, text, { s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -90, -40, 180, 120, '#b8b0c8', { b: 7, hi: '#d8d0e8' }); box(x, -110, 80, 220, 30, '#8c86a8', { b: 6 })
  x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 96)
  box(x, -60, -170, 120, 120, '#b8b0c8', { b: 7, hi: '#d8d0e8' }); R(x, '#8c86a8', -40, -140, 80, 14); R(x, '#8c86a8', -40, -112, 56, 14)
  x.restore()
}
/** a hand-drawn "!!!" / "?" exclamation burst (Inter 800) */
export function shout(x, t, text, cx, cy, t0, { size = 72, col = GOLD, rot = -0.12, life = 1.4 } = {}) {
  const k = pop01(t, t0, 0.24, 3) * outK(t, [t0 + life - 0.2, t0 + life])
  if (k > 0.01 && t >= t0) label(x, text, cx, cy, { size: size * k, col, font: INTER, weight: 800, rot: rot + 0.05 * Math.sin(t * 12) })
}

// ═══════════════════════════════════════════════════════════════ the film shell
const CPS = 30
export { CPS }
export function makeFilm(cfg) {
  // cfg.duration is the slate length (story + the old 4.4 s card); the film now ends on the 2.4 s short end card
  // (CHANGE 4 Nov), so it runs 2.0 s shorter. No card-back cut plays: the old cut times get a white flash instead.
  const STORY_END = cfg.duration - ENDCARD_LEN, DURATION = +(STORY_END + ENDCARD_SHORT_LEN).toFixed(3)
  const CUTS = cfg.cuts || []
  const lines = cfg.lines || []
  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 17px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = cfg.hook
    const hook = H ? popText(root, H.text, { top: H.top ?? 158, size: H.size ?? 78, accentSize: H.accentSize ?? 112, at: H.at ?? -1.2, gap: 0.08, accentColor: H.color || GOLD, fit: true, wobble: true }) : null
    const top = layerCanvas(root), tx = top.getContext('2d')
    const doms = cfg.dom ? cfg.dom(root) : []
    const box1 = lines.length ? dialogueBox(root, { lines, y: cfg.box?.y ?? 1420, height: cfg.box?.h ?? 300, open: cfg.box?.open ?? lines[0].t - 0.22, close: cfg.box?.close ?? STORY_END - 0.5, cps: CPS }) : null
    const late = cfg.domLate ? cfg.domLate(root) : []
    const bug = buildBug(root, { ...cfg.bug })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const flashes = [...(cfg.flashes || []), ...CUTS.map(c => c.t)]
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, cfg.sky ? cfg.sky(t) : SKY_H)
        const sh = cfg.shake ? cfg.shake(t) : 0
        x.save(); x.translate(0, sh)
        cfg.paint(x, t)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) { tx.save(); tx.translate(0, sh); cfg.top(tx, t); tx.restore() }
        if (hook) hook.update(t, outK(t, H.out))
        for (const d of doms) d.update(t)
        if (box1) box1.update(t)
        for (const d of late) d.update(t)
        bug.update(t, outK(t, [STORY_END - 0.4, STORY_END - 0.1]))
        const fl = Math.max(0, ...flashes.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 })]
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ...(cfg.cues || []),
    ...[...(cfg.flashes || []), ...CUTS.map(c => c.t)].flatMap(c => [['whoosh', r3(c - 0.08), 0.28, 0.035], ['tick', c, 0.05]]),
    ...(lines.length ? talkCues(lines, { cps: CPS, pitch: cfg.pitch || {} }) : []),
    ['whoosh', r3(STORY_END - 0.5), 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  void NOTE
  return { DURATION, SCENES, CUES, STORY_END, CUTS }
}
export const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => { const N = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]; return Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), N[(b0 + i) % N.length], gain, (i % 2 ? 0.15 : -0.15)]) }
/** shift an episode's relative cue list ([kind, u, ...]) to absolute time a */
export const at = (a, cues) => (cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])
