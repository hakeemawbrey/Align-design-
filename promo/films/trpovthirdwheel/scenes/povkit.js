// POV kit: the shared look of the POV format (Star Talk Trends §9, promo/films/STARTALK-TRENDS.md):
// trpovthirdwheel, trpovguess, trpovmoon, trpovshoulder, trpovtalkcard. Every episode carries an identical copy of this
// file in its own folder, so the five films look like one series without touching another film's folder.
//
// The look: second-person camera (a slow handheld sway + punch-ins), a synthwave set (a striped pixel sun sinking into
// the horizon, a neon grid floor scrolling toward you), a white "POV: …" caption sticker on top, sticker captions for the
// beats, a fake progress bar along the bottom, a soft lens vignette, the "● POV" bug top-left (56 px), the Star Talk
// dialogue box, a big last line, the shared end card and one cardfx cut.
//
//   makePOV(cfg) → { DURATION, SCENES, CUES }
//     cfg = { id, duration = 20, caption, lines, boxes: [{ from, to, open, close, y }], stickers: [{ at, out, text, x, y,
//             rot, size, kind: 'light' | 'dark' | 'you' }], last: { at, text, top, size, color }, cuts, punch: [{ at, dur,
//             z, x, y }], horizon, sunX, preload: async () => imgs, scene(x, t, K), front(x, t, K), cues: [], pitch }
//     scene() draws inside the camera (on top of the set), front() on top of the vignette (no camera). K = { imgs, SE }.
//   Helpers: R, drawBits, sparkles, pop01, outK, popOut, starFrame, inSprite, tearsCells, pisces, drawArm, drawImg,
//            bubble, colours. Everything is a pure function of t; nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', HOT = '#ff4fa8', CYAN = '#5ff0ff', LAV = '#c9a6ff', MINT = '#7dffb0'
export const YOU = '#b9a4ff'                       // "you" (the camera): a soft lavender
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export { drawStarChar, signStar, lerp, prog, ease, clamp, easeOutBack, A }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
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
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, HOT]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** the running gag: Pisces somewhere in the back, crying (tears 1–3) */
export function pisces(x, t, { x: X, y: Y, s = 130, tears = 2, mood = 'wide', look = [0, 0], pop = 1, hops = null, seed = 6 }) {
  if (pop <= 0.01) return
  const opts = { color: PIS.color, glyph: s >= 120 ? PIS.glyph : null, mood, look, seed, glow: 0.8, pop, hops }
  drawStarChar(x, X, Y, s, t, opts)
  inSprite(x, starFrame(X, Y, s, t, opts), () => tearsCells(x, t, tears))
}

/** "your" arm + mitten hand reaching up from the bottom edge (the viewer is a lavender star) */
export function drawArm(x, bx, hx, hy, { r = 46, col = YOU, rot = 0, by = 2000 } = {}) {
  x.save(); x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = r * 1.25 + 12; x.beginPath(); x.moveTo(bx, by); x.lineTo(hx, hy); x.stroke()
  x.strokeStyle = col; x.lineWidth = r * 1.25; x.stroke()
  x.translate(hx, hy); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(-r * 0.35, -r * 0.35, r * 0.28, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** an image (card art etc.) centred, rotated, with a soft drop shadow */
export function drawImg(x, img, cx, cy, w, { rot = 0, alpha = 1, sx = 1 } = {}) {
  if (!img || alpha <= 0 || w <= 0) return
  const h = w * img.height / img.width
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  x.drawImage(img, -w / 2, -h / 2, w, h)
  x.restore()
}

/** a pixel speech bubble on the canvas (small asides) */
export function bubble(x, t, cx, cy, t0, text, { col = BONE, fg = INK, size = 30, out = null, tail = 'down' } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * (out ? outK(t, out) : 1)
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  R(x, INK, -w / 2 - 4, -h / 2, w + 8, h); R(x, INK, -w / 2, -h / 2 - 4, w, h + 8); R(x, col, -w / 2, -h / 2, w, h)
  if (tail === 'down') { R(x, INK, -12, h / 2 + 4, 12, 10); R(x, col, -8, h / 2, 8, 8) }
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── the synthwave set: a striped pixel sun sinking into the horizon + a neon grid floor scrolling toward you
const SUN_TOP = [255, 214, 106], SUN_BOT = [255, 61, 139]
export function drawSet(x, t, { hor = 1060, sunX = 540, sunR = 250, alpha = 1, sunDy = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const cy = hor - 70 + sunDy
  // glow
  const g = x.createRadialGradient(sunX, cy, 0, sunX, cy, sunR * 2.2)
  g.addColorStop(0, 'rgba(255,90,160,0.42)'); g.addColorStop(0.5, 'rgba(255,90,160,0.12)'); g.addColorStop(1, 'rgba(255,90,160,0)')
  x.fillStyle = g; x.fillRect(sunX - sunR * 2.3, cy - sunR * 2.3, sunR * 4.6, sunR * 2.3 + (hor - cy) + 4)
  // the sun, in 10 px rows, with stripes widening toward the horizon
  const P = 10
  for (let y = cy - sunR; y < hor; y += P) {
    const dy = y + P / 2 - cy
    if (Math.abs(dy) > sunR) continue
    const q = (y - (cy - sunR)) / (2 * sunR)
    if (y > cy - sunR * 0.15) { const band = 46, gap = 4 + 16 * prog(y, cy - sunR * 0.15, hor); if (((y - (cy - sunR * 0.15)) % band) < gap) continue }
    const hw = Math.round(Math.sqrt(sunR * sunR - dy * dy) / P) * P
    const c = SUN_TOP.map((v, i) => Math.round(lerp(v, SUN_BOT[i], clamp(q * 1.1))))
    R(x, `rgb(${c})`, sunX - hw, y, hw * 2, P)
  }
  // floor
  const fg = x.createLinearGradient(0, hor, 0, 1920)
  fg.addColorStop(0, '#2a0d4a'); fg.addColorStop(1, '#0b0418')
  x.fillStyle = fg; x.fillRect(-120, hor, 1320, 2100 - hor)
  // grid: rays to the vanishing point + rows scrolling toward the camera
  x.lineWidth = 3
  for (let i = -14; i <= 14; i++) {
    x.strokeStyle = `rgba(255,79,216,${0.55 - Math.abs(i) * 0.012})`
    x.beginPath(); x.moveTo(540 + i * 22, hor); x.lineTo(540 + i * 210, 2000); x.stroke()
  }
  const N = 9, ph = (t * 0.55) % 1
  for (let k = 0; k < N; k++) {
    const p = (k + ph) / N, y = hor + (2000 - hor) * Math.pow(p, 2.3)
    x.strokeStyle = `rgba(255,79,216,${0.15 + 0.6 * p})`; x.lineWidth = 2 + 3 * p
    x.beginPath(); x.moveTo(-120, y); x.lineTo(1200, y); x.stroke()
  }
  // horizon line
  x.fillStyle = 'rgba(95,240,255,0.35)'; x.fillRect(-120, hor - 6, 1320, 12)
  x.fillStyle = CYAN; x.fillRect(-120, hor - 2, 1320, 4)
  x.restore()
}

// ── stickers (DOM): the white "POV: …" caption and the beat captions
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
function stickerHTML(text, accent, size) {
  let open = false
  return esc(text).replace(/\*/g, () => { open = !open; return open ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${Math.round(size * 1.18)}px;color:${accent};letter-spacing:0">` : '</span>' })
}
const KINDS = {
  light: { bg: '#fff8ef', fg: '#140a28', accent: '#e0287e', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
  dark: { bg: 'rgba(20,10,40,0.92)', fg: BONE, accent: GOLD, shadow: '0 8px 0 rgba(6,3,16,0.6), 0 0 0 4px rgba(255,79,168,0.75)' },
  you: { bg: YOU, fg: '#140a28', accent: '#7a1f6e', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
  hot: { bg: HOT, fg: '#fff8ef', accent: '#fff2a8', shadow: '0 8px 0 rgba(10,4,24,0.55)' },
}
export function buildSticker(root, { text, at, out, x = 540, y = 600, rot = -2, size = 46, kind = 'light', maxW = 900, prefix = null }) {
  const K = KINDS[kind] || KINDS.light
  const pre = prefix ? `<span style="color:${prefix.color};margin-right:0.28em">${esc(prefix.text)}</span>` : ''
  const e = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', maxWidth: maxW + 'px', width: 'max-content', padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.55)}px ${Math.round(size * 0.36)}px`, background: K.bg, color: K.fg,
    font: `800 ${size}px ${INTER}`, lineHeight: '1.08', letterSpacing: '-0.01em', textAlign: 'center', borderRadius: Math.round(size * 0.32) + 'px', boxShadow: K.shadow, display: 'none', transformOrigin: '50% 60%', pointerEvents: 'none' }, root, pre + stickerHTML(text, K.accent, size))
  return {
    update(t) {
      const k = pop01(t, at, 0.34, 2.6) * (out ? outK(t, out) : 1)
      e.style.display = k > 0.01 && t >= at ? 'block' : 'none'
      if (e.style.display === 'none') return
      const wob = 3 * Math.sin((t - at) * 16) * Math.exp(-(t - at) * 4)
      e.style.opacity = String(clamp(k * 2))
      e.style.transform = `translate(-50%, 0) scale(${k.toFixed(4)}) rotate(${(rot + wob).toFixed(2)}deg)`
    },
  }
}

function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '40px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const dot = el('div', { width: '18px', height: '18px', background: '#ff3b5c', boxShadow: '0 0 12px rgba(255,59,92,0.9)' }, box)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.3em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', fontVariant: 'small-caps' }, box, 'POV')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
      dot.style.opacity = (t % 1.1) < 0.7 ? '1' : '0.25'
    },
  }
}

// ── the camera: handheld sway + punch-ins
function applyCam(x, t, punch) {
  let z = 1, cx = 540, cy = 960
  for (const p of punch) {
    const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
    if (k <= 0) continue
    const jolt = Math.sin((t - p.at) * 70) * 6 * (1 - prog(t, p.at, p.at + 0.25))
    z *= 1 + p.z * k; cx = lerp(cx, p.x ?? 540, k) + jolt; cy = lerp(cy, p.y ?? 960, k)
  }
  const sx = 7 * Math.sin(t * 1.3) + 3 * Math.sin(t * 2.9 + 1), sy = 6 * Math.sin(t * 1.7 + 1), rot = 0.005 * Math.sin(t * 1.1)
  x.translate(540 + sx, 960 + sy); x.rotate(rot); x.scale(z * 1.02, z * 1.02); x.translate(-cx, -cy)
}

function vignette(x, k) {
  if (k <= 0) return
  const g = x.createRadialGradient(540, 960, 520, 540, 960, 1180)
  g.addColorStop(0, 'rgba(6,3,16,0)'); g.addColorStop(1, `rgba(6,3,16,${0.6 * k})`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
}
function progressBar(x, t, SE, k) {
  if (k <= 0) return
  const p = clamp(t / SE), X0 = 100, W = 880, Y = 1806
  x.save(); x.globalAlpha *= k
  R(x, 'rgba(255,255,255,0.2)', X0, Y, W, 8)
  const g = x.createLinearGradient(X0, 0, X0 + W, 0); g.addColorStop(0, HOT); g.addColorStop(1, GOLD)
  x.fillStyle = g; x.fillRect(X0, Y, Math.round(W * p), 8)
  R(x, BONE, X0 + W * p - 8, Y - 6, 16, 20)
  x.restore()
}

// ═══════════════════════════════════════ the episode engine
export function makePOV(cfg) {
  const DURATION = cfg.duration ?? 20
  const SE = DURATION - ENDCARD_LEN
  const CPS = 28
  const OUT = [SE - 0.45, SE - 0.05]
  const CAP_AT = cfg.captionAt ?? 0.15
  const lines = cfg.lines || [], boxes = cfg.boxes || [], stickers = cfg.stickers || [], punch = cfg.punch || []
  const last = cfg.last

  async function build(stage) {
    try { await Promise.all(['800 112px Inter', '800 46px Inter', "italic 500 150px 'EB Garamond'", "italic 500 54px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + src })
    const imgs = {}
    for (const [k, v] of Object.entries(cfg.images || {})) imgs[k] = await load(v)
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const K = { imgs, SE, root }
    const cap = buildSticker(root, { text: cfg.caption, at: CAP_AT, out: OUT, x: 540, y: 140, rot: -1.5, size: cfg.captionSize ?? 50, kind: 'light', maxW: 940, prefix: { text: 'POV:', color: HOT } })
    const sts = stickers.map(s => buildSticker(root, { out: s.out ?? OUT, ...s }))
    const bx = boxes.map(b => dialogueBox(root, { lines: lines.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
    const lastT = last ? popText(root, last.text, { top: last.top ?? 1440, size: last.size ?? 120, accentSize: last.accentSize ?? 170, at: last.at, gap: 0.09, accentColor: last.color ?? HOT, wobble: true, late: 1, lateAt: last.at + 0.35, fit: true }) : null
    const bug = buildBug(root, 0.3)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
    return {
      start: 0, end: SE + 0.01, root,
      update(t) {
        const k = outK(t, OUT)
        drawSky(x, t, SKY_H)
        if (k > 0) {
          x.save(); x.globalAlpha = k
          applyCam(x, t, punch)
          drawSet(x, t, { hor: cfg.horizon ?? 1060, sunX: cfg.sunX ?? 540, sunDy: cfg.sunDy ? cfg.sunDy(t) : 0 })
          cfg.scene(x, t, K)
          x.restore()
          x.save(); x.globalAlpha = k
          vignette(x, 1)
          if (cfg.front) cfg.front(x, t, K)
          progressBar(x, t, SE, 1)
          x.restore()
        }
        cap.update(t)
        for (const s of sts) s.update(t)
        for (const b of bx) b.update(t)
        if (lastT) lastT.update(t, outK(t, OUT))
        bug.update(t, outK(t, OUT))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = cfg.cuts
  const SCENES = [build, (stage) => buildEndcard(stage, { start: SE }), cardFrame({ start: 0, end: SE, corners: 'tr bl br' }), cardCuts(CUTS)]
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['pop', r3(CAP_AT + 0.02), 1046.5, 0.045, 0], ['tick', r3(CAP_AT + 0.05), 0.04], ['pop', 0.33, 880, 0.03, -0.4],
    ...stickers.flatMap((s, i) => [['pop', r3(s.at + 0.02), NOTE[(i * 3 + 2) % 7] * (s.kind === 'you' ? 0.75 : 1), 0.04, (i % 2 ? 0.25 : -0.25)], ['tick', r3(s.at + 0.06), 0.03]]),
    ...punch.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.022], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...boxes.map(b => ['pop', r3(b.open ?? lines[b.from].t - 0.22), 739.99, 0.035, 0]),
    ...(lines.length ? talkCues(lines, { cps: CPS, pitch: cfg.pitch || {} }) : []),
    ...(last ? [...wordPops(last.at, 3, 0.09, 2), ['pop', r3(last.at + 0.37), 1174.66, 0.05, 0], ['bell', r3(last.at + 0.4), 1567.98, 0.028, 1.2, 0], ['glitter', r3(last.at + 0.35), r3(last.at + 0.9)]] : []),
    ['whoosh', r3(OUT[0]), 0.35, 0.025],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(SE),
  ]
  return { DURATION, SE, SCENES, CUES, CPS }
}
