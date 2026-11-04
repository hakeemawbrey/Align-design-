// amkit: the 3 AM IN WINTER engine (Next 30 · star_advice trial reels, promo/films/next30/b40.md).
// Lives in the first film's folder; n3ae02–n3ae12 import it from here ('../../n3ae01/amkit.js').
//
// The format (16 s, story 0–13.6, then the short 2.4 s end card, default CTA; no Align card transition):
//   0          frame 0 is the thumbnail: the hook caption is already up ("3 AM. First snow. | *Aries* is up."), the
//              "3 AM IN WINTER" bug top-left, a dark winter bedroom, the frosted window with snow falling, and the sign
//              mid-action. A digital clock on the nightstand reads 3:00. Across the street one other window is lit:
//              ♓ Pisces is awake too, crying (cfg.across swaps who is over there).
//   1.5 / 3.6 / 5.7   three thought bubbles pop over the sign (the third is the 3 AM spiral, accent pink); the clock
//              ticks on with each one.
//   7.5        the beat change (no card transition). THE STARS glow in the window and say one kind line in the box (8.1).
//   ~10.4      the caption pops out and the last line pops in at the top; it holds to 13.55.
//
//   makeAM(cfg) → { DURATION, SCENES, CUES, T, MUSIC }
//   cfg = {
//     sign,                                 'aries' … 'pisces' (the one awake)
//     caption, captionAccent,               the hook caption (top), e.g. '3 AM. First snow. | *Aries* is up.'
//     thoughts: [a, b, c],                  three thought-bubble lines (≤ 28 chars; *accent* allowed)
//     line,                                 THE STARS' line (≤ 64 chars, *accent* allowed)
//     last, lastAccent,                     the last line
//     me?: { x, y, s },                     where the sign stands (default by the bed)
//     mood?(t, T) → { mood, look, sweat, tears, hops? }   the sign's face over time (default: sparkle → wide → happy)
//     clock?: [c0, c1, c2, c3],             the four clock readings (3:00, 3:04, 3:11, 3:17)
//     across?: 'pisces' | signId,           who is in the window across the street (default 'pisces', crying)
//     meTears?,                             tears on the sign itself (Pisces' own episode)
//     under?(x, t, W), over?(x, t, W),      film props drawn under / over the sign (frame px)
//     cues?(T)                              film-specific sound cues
//   }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CREAM = '#f6efe2', TEAR = '#8fe3ff'
export const FROST = '#d8f1ff', WARM = '#ffcf7a', LED = '#7ff0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
export { drawStarChar, signStar, STAR, clamp, lerp, prog, ease, easeOutBack, drawPixelStar }

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
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
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

export const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export const heart = (x, cx, cy, cell, { alpha = 1, col = '#ff4f86', rot = 0 } = {}) => drawBits(x, HEART, { H: col, W: '#ffd0e0' }, cx, cy, cell, { alpha, rot })

/** text with *accent* runs, centred on (cx, cy) */
export function rich(x, text, cx, cy, { size = 44, col = INK, acc = '#e0306a', weight = 800, font = INTER, align = 'center' } = {}) {
  const parts = text.split('*')
  x.font = `${weight} ${size}px ${font}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  const w = parts.reduce((s, p) => s + x.measureText(p).width, 0)
  let u = align === 'center' ? cx - w / 2 : cx
  parts.forEach((p, i) => { x.fillStyle = i % 2 ? acc : col; x.fillText(p, u, cy); u += x.measureText(p).width })
  return w
}
export function richWidth(x, text, size = 44, weight = 800, font = INTER) {
  x.font = `${weight} ${size}px ${font}`
  return text.split('*').reduce((s, p) => s + x.measureText(p).width, 0)
}

/** a pixel speech bubble (k = pop scale), tail at the bottom (tail: -1 left, 1 right, 0 none) */
export function bubble(x, cx, cy, text, { k = 1, size = 34, col = BONE, ink = INK, tail = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = richWidth(x, text, size) + size * 1.1, h = size + 24
  x.fillStyle = ink; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (tail) {
    const tx = tail * Math.min(w / 2 - 22, 40)
    x.fillStyle = ink; x.fillRect(tx - 10, h / 2 + 2, 14, 12); x.fillStyle = col; x.fillRect(tx - 6, h / 2 - 2, 8, 10)
  }
  rich(x, text, 0, 2, { size, col: ink })
  x.restore()
}

/** plain pixel text with an ink drop */
export function label(x, text, cx, cy, { size = 24, col = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, rot = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, 2, 3); x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so tears and sweat sit on the sprite through hops and squash
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
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** sweat drops off the brow (sprite cells): nervous */
export function sweatCells(ctx, t, n = 2) {
  for (let q = 0; q < n; q++) {
    const ph = ((t * 1.3 + q / n) % 1 + 1) % 1
    const i = q % 2 ? 27.5 : 7.5, j = 9 + ph * 7
    ctx.globalAlpha = 1 - ph * 0.7
    ctx.fillStyle = INK; ctx.fillRect(i - 0.2, j - 0.2, 1.4, 2.2); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.8); ctx.fillStyle = '#fff'; ctx.fillRect(i, j, 0.5, 0.5)
  }
  ctx.globalAlpha = 1
}
/** a star with optional tears / sweat seated on it */
export function star(x, cx, cy, size, t, opts = {}, { tears = 0, sweat = 0 } = {}) {
  const r = drawStarChar(x, cx, cy, size, t, opts)
  if (tears || sweat) {
    const F = starFrame(cx, cy, size, t, opts)
    inSprite(x, F, () => { if (tears) tearsCells(x, t, tears); if (sweat) sweatCells(x, t, sweat) })
  }
  return r
}

// ── the bug: a crescent moon + "3 AM IN WINTER" (Inter 800, letter-spaced small caps)
function buildBug(root) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 40
  const c = ic.getContext('2d')
  const M = ['...MMMM.', '..MMM...', '.MMM....', '.MMM....', '.MMM....', '.MMM....', '..MMM...', '...MMMM.']
  M.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'M') { c.fillStyle = FROST; c.fillRect(i * 5, j * 5, 5, 5) } }))
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: FROST, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, '3&nbsp;AM&nbsp;IN&nbsp;WINTER')
  return { update(t, out = 1) { box.style.display = out <= 0.01 ? 'none' : 'flex'; box.style.opacity = String(out) } }
}

// ── layout (frame px)
export const WIN = { x: 250, y: 470, w: 580, h: 480 }
export const ACROSS = { x: 600, y: 812, w: 132, h: 112 }
export const STARS_AT = { x: 430, y: 640, s: 150 }
export const BED = { x: 40, y: 1330, w: 520, h: 200 }
export const STAND = { x: 790, y: 1350, w: 230, h: 190 }
export const CLOCK = { x: 905, y: 1306 }
const DEF_ME = { x: 330, y: 1228, s: 250 }
const BUB = { y: 1052 }
const CPS = 30

export function schedule(cfg) {
  const D = 16, STORY_END = D - ENDCARD_SHORT_LEN   // the short end card (2.4 s); no Align card transition
  const T = { D, STORY_END, th: [1.5, 3.6, 5.7], cut: 7.5, starsIn: 7.62 }
  T.thOut = [r3(T.cut - 0.3), r3(T.cut - 0.06)]
  T.lines = [{ t: 8.1, speaker: 'THE STARS', text: cfg.line }]
  T.times = lineTimes(T.lines, { cps: CPS })
  T.last = r3(cfg.lastAt ?? Math.max(10.4, T.times[0].done + 0.25))
  T.capOut = [r3(T.last - 0.3), r3(T.last - 0.08)]
  T.box = { open: r3(T.lines[0].t - 0.22), close: 13.15 }
  T.out = [13.15, 13.55]
  return T
}

export function makeAM(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const SG = signStar(cfg.sign)
  const ME = { ...DEF_ME, ...(cfg.me || {}) }
  const across = cfg.across || 'pisces'
  const CLK = cfg.clock || ['3:00', '3:04', '3:11', '3:17']
  const clockAt = t => t < T.th[1] ? CLK[0] : t < T.th[2] ? CLK[1] : t < T.cut ? CLK[2] : CLK[3]
  const STARS_HOPS = [T.starsIn + 0.05, ...talkHops(T.lines, 'THE STARS', { cps: CPS }), T.last + 0.05]
  const ME_HOPS = [0, 0.55, ...T.th.map(v => v + 0.02), T.cut + 0.2, T.last + 0.08, T.last + 0.5]

  function defMood(t) {
    if (t < T.th[0]) return { mood: 'sparkle', look: [1, -0.6] }
    if (t < T.th[2]) return { mood: 'wide', look: [1, -1] }
    if (t < T.cut) return { mood: 'wide', look: [1, -1], sweat: 2 }
    if (t < T.last) return { mood: 'neutral', look: [0.6, -1] }
    return { mood: 'happy' }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 30px Inter", "800 44px Inter", "700 30px 'Space Mono'", "700 58px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07061a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const cap = popText(root, cfg.caption, { top: 150, size: 80, accentSize: 116, at: -1, gap: 0.05, accentColor: cfg.captionAccent || FROST, wobble: true, fit: true })
    const last = popText(root, cfg.last, { top: 160, size: 104, accentSize: 150, at: T.last, gap: 0.1, accentColor: cfg.lastAccent || PINK, wobble: true, fit: true })
    const box = dialogueBox(root, { lines: T.lines, y: 1440, height: 250, size: 46, ...T.box, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    const W = { T, x, ME, SG, R, drawBits, bubble, label, star, heart, sparkles, rich, pop01, outK, starFrame, inSprite, hash }

    function room(t) {
      // wall
      const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0c0a26'); g.addColorStop(0.6, '#161340'); g.addColorStop(1, '#0a0820')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      // faint wallpaper: tiny snowflake dots
      x.fillStyle = 'rgba(216,241,255,0.05)'
      for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2 === 0) x.fillRect(30 + i * 92 + (j % 4) * 6, 440 + j * 52, 6, 6)
      // moonlight spill on the floor
      x.save(); x.globalAlpha = 0.09 + (t > T.cut ? 0.05 * clamp(prog(t, T.cut, T.cut + 0.8)) : 0)
      x.fillStyle = t > T.cut ? '#ffe7a8' : FROST
      x.beginPath(); x.moveTo(WIN.x + 40, 1560); x.lineTo(WIN.x + WIN.w - 40, 1560); x.lineTo(WIN.x + WIN.w + 160, 1920); x.lineTo(WIN.x - 120, 1920); x.closePath(); x.fill()
      x.restore()
      // floor + skirting
      R(x, '#0f0c2c', 0, 1560, 1080, 360); R(x, '#241d55', 0, 1552, 1080, 10)
      for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.03)', i * 130 + 20, 1600, 4, 320)
    }

    function windowView(t) {
      const { x: X, y: Y, w, h } = WIN
      // frame shadow + frame
      R(x, 'rgba(0,0,0,0.35)', X - 18, Y - 10, w + 44, h + 48)
      R(x, INK, X - 26, Y - 26, w + 52, h + 52); R(x, '#3a3170', X - 20, Y - 20, w + 40, h + 40)
      x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
      // sky
      const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#070d30'); g.addColorStop(1, '#1f2f6e')
      x.fillStyle = g; x.fillRect(X, Y, w, h)
      for (let i = 0; i < 26; i++) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.6 + hash(i) * 1.4) + i))
        x.globalAlpha = a; x.fillStyle = '#fffbea'
        const sx = X + hash(i + 3) * w, sy = Y + hash(i + 9) * h * 0.55
        x.fillRect(Math.round(sx), Math.round(sy), hash(i) > 0.8 ? 5 : 3, hash(i) > 0.8 ? 5 : 3)
      }
      x.globalAlpha = 1
      // moon
      const mx = X + w - 96, my = Y + 84
      x.fillStyle = 'rgba(255,240,200,0.12)'; x.beginPath(); x.arc(mx, my, 70, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff2c8'; x.beginPath(); x.arc(mx, my, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#e6d39a'; x.fillRect(mx - 14, my - 8, 10, 10); x.fillRect(mx + 8, my + 10, 8, 8)
      // the houses across the street
      R(x, '#0b0f2c', X, Y + 330, 300, 160); R(x, '#0e1336', X + 300, Y + 300, 300, 200)
      x.fillStyle = '#0b0f2c'; x.beginPath(); x.moveTo(X - 10, Y + 332); x.lineTo(X + 140, Y + 250); x.lineTo(X + 290, Y + 332); x.fill()
      x.fillStyle = '#0e1336'; x.beginPath(); x.moveTo(X + 290, Y + 302); x.lineTo(X + 450, Y + 220); x.lineTo(X + 610, Y + 302); x.fill()
      // snow on the roofs
      x.fillStyle = '#dfefff'
      for (let i = 0; i < 30; i++) { const u = i / 29; x.fillRect(X - 10 + u * 300, Y + 332 - (u < 0.5 ? u : 1 - u) * 164 - 8, 12, 8) }
      for (let i = 0; i < 32; i++) { const u = i / 31; x.fillRect(X + 290 + u * 320, Y + 302 - (u < 0.5 ? u : 1 - u) * 164 - 8, 12, 8) }
      // dark windows on the left house
      R(x, '#1a2050', X + 60, Y + 370, 60, 56); R(x, '#1a2050', X + 170, Y + 370, 60, 56)
      // the lit window across the street (warm), with the neighbour in it
      const A = ACROSS
      x.fillStyle = 'rgba(255,207,122,0.18)'; x.fillRect(A.x - 16, A.y - 16, A.w + 32, A.h + 32)
      R(x, '#2a1c10', A.x - 6, A.y - 6, A.w + 12, A.h + 12)
      const wg = x.createLinearGradient(0, A.y, 0, A.y + A.h); wg.addColorStop(0, '#ffe2a0'); wg.addColorStop(1, '#ffb45c')
      x.fillStyle = wg; x.fillRect(A.x, A.y, A.w, A.h)
      x.save(); x.beginPath(); x.rect(A.x, A.y, A.w, A.h); x.clip()
      const nb = signStar(across)
      const wave = across !== 'pisces' && t > T.th[2] + 0.3
      const nOpts = { color: nb.color, mood: across === 'pisces' ? (t > T.cut ? 'happy' : 'sparkle') : wave ? 'happy' : 'sleepy', zzz: false, look: [-1, 0.4], seed: 6, glow: 0.4, tips: false, hops: wave ? [T.th[2] + 0.35, T.th[2] + 0.8, T.cut + 0.3] : [T.cut + 0.3, T.last + 0.2] }
      star(x, A.x + A.w / 2, A.y + A.h / 2 + 18, 92, t, nOpts, { tears: across === 'pisces' ? (t > T.cut ? 3 : 2) : 0 })
      x.restore()
      // window cross + curtain edge on the neighbour window
      R(x, '#2a1c10', A.x + A.w / 2 - 3, A.y, 6, A.h)
      // the street and snow drifts
      R(x, '#e6f2ff', X, Y + h - 30, w, 30); R(x, '#c9dcf5', X, Y + h - 30, w, 6)
      // falling snow
      const heavy = t > T.cut ? 1.25 : 1
      for (let i = 0; i < 64 * heavy; i++) {
        const sp = 40 + hash(i + 1) * 70, sx0 = hash(i + 7) * (w + 60) - 30
        const yy = ((hash(i + 11) * (h + 40) + t * sp) % (h + 40)) - 20
        const xx = sx0 + Math.sin(t * (0.6 + hash(i) * 0.8) + i) * 14
        const s = hash(i + 5) > 0.7 ? 7 : 4
        x.globalAlpha = 0.55 + 0.45 * hash(i + 2); x.fillStyle = '#ffffff'
        x.fillRect(Math.round(X + xx), Math.round(Y + yy), s, s)
      }
      x.globalAlpha = 1
      // THE STARS in the window after the cut
      if (t > T.starsIn - 0.02) {
        const k = pop01(t, T.starsIn, 0.45, 1.8) * outK(t, T.out)
        x.fillStyle = `rgba(247,207,104,${0.22 * k})`; x.beginPath(); x.arc(STARS_AT.x, STARS_AT.y, 150 * k, 0, Math.PI * 2); x.fill()
        drawStarChar(x, STARS_AT.x, STARS_AT.y, STARS_AT.s, t, { color: STAR.sky, mood: t > T.last ? 'sparkle' : 'happy', look: [0.6, 1], hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
        sparkles(x, t, STARS_AT.x, STARS_AT.y, T.starsIn + 0.05, 10, 140, 0.3)
      }
      x.restore()
      // frost in the corners
      x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
      for (let c = 0; c < 4; c++) {
        const cx = c % 2 ? X + w : X, cy = c < 2 ? Y : Y + h
        for (let i = 0; i < 70; i++) {
          const rr = Math.pow(hash(c * 100 + i), 1.6) * 120, a = hash(c * 100 + i + 50) * Math.PI / 2
          const px = cx + (c % 2 ? -1 : 1) * Math.cos(a) * rr, py = cy + (c < 2 ? 1 : -1) * Math.sin(a) * rr
          x.globalAlpha = 0.55 * (1 - rr / 130); x.fillStyle = FROST
          const s = 4 + Math.round(hash(i + c) * 6)
          x.fillRect(Math.round(px / 4) * 4, Math.round(py / 4) * 4, s, s)
        }
      }
      x.globalAlpha = 1
      x.restore()
      // mullions
      R(x, INK, X + w / 2 - 7, Y, 14, h); R(x, '#3a3170', X + w / 2 - 4, Y, 8, h)
      R(x, INK, X, Y + h * 0.45 - 7, w, 14); R(x, '#3a3170', X, Y + h * 0.45 - 4, w, 8)
      // sill with snow outside-in
      R(x, INK, X - 40, Y + h + 14, w + 80, 30); R(x, '#4a3f8a', X - 36, Y + h + 18, w + 72, 22)
      // curtains
      for (const side of [-1, 1]) {
        const cx0 = side < 0 ? X - 90 : X + w + 26
        R(x, INK, cx0 - 4, Y - 60, 72, h + 120)
        for (let i = 0; i < 4; i++) R(x, i % 2 ? '#3d2a6a' : '#4a3380', cx0 + i * 16, Y - 56, 16, h + 112)
      }
      R(x, INK, X - 110, Y - 74, w + 220, 14)
    }

    function furniture(t) {
      // bed
      const B = BED
      R(x, INK, B.x - 6, B.y - 6, B.w + 12, B.h + 12)
      R(x, '#3b2b5c', B.x, B.y, B.w, B.h)
      R(x, '#5a6fd0', B.x, B.y + 40, B.w, B.h - 60)                 // blanket
      for (let i = 0; i < 7; i++) R(x, '#6c80e0', B.x + 20 + i * 72, B.y + 70, 34, 34)
      R(x, CREAM, B.x + 20, B.y + 6, 150, 46)                        // pillow
      R(x, INK, B.x - 14, B.y - 120, 24, B.h + 140)                  // headboard
      // nightstand + clock
      const S = STAND
      R(x, INK, S.x - 6, S.y - 6, S.w + 12, S.h + 12); R(x, '#4a3a6a', S.x, S.y, S.w, S.h); R(x, '#3a2c58', S.x + 20, S.y + 60, S.w - 40, 8)
      R(x, '#5a4a82', S.x + S.w / 2 - 10, S.y + 100, 20, 10)
      const C = CLOCK, s = clockAt(t)
      R(x, INK, C.x - 106, C.y - 46, 212, 92); R(x, '#05060e', C.x - 100, C.y - 40, 200, 80)
      x.save(); x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = LED; x.shadowBlur = 18; x.fillStyle = LED
      const blink = (t % 1) < 0.5
      x.fillText(blink ? s : s.replace(':', ' '), C.x, C.y + 3)
      x.restore()
      label(x, 'AM', C.x + 86, C.y - 26, { size: 16, col: LED })
      // a mug of cocoa on the windowsill
      const mx = WIN.x + WIN.w - 70, my = WIN.y + WIN.h - 18
      R(x, INK, mx - 4, my - 4, 54, 56); R(x, '#d86a6a', mx, my, 46, 48); R(x, '#5a3020', mx + 2, my + 2, 42, 8); R(x, INK, mx + 46, my + 12, 14, 24); R(x, '#d86a6a', mx + 46, my + 18, 8, 12)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = 0.4 * Math.sin(Math.PI * ph); R(x, '#ffffff', mx + 10 + i * 10 + Math.sin(t * 2 + i) * 4, my - 14 - ph * 50, 6, 10) }
      x.globalAlpha = 1
    }

    /** thought bubble (cloud) with trailing puffs toward the sign's head */
    function thought(t, text, i) {
      const t0 = T.th[i], t1 = i < 2 ? T.th[i + 1] - 0.04 : T.thOut[1]
      if (t < t0 || t > t1) return
      const k = pop01(t, t0, 0.32, 2.2) * (i < 2 ? 1 : outK(t, T.thOut))
      const size = 46, w = Math.min(960, richWidth(x, text, size) + 90), h = 104
      const cx = clamp(540 + (i - 1) * 12, w / 2 + 30, 1050 - w / 2), cy = BUB.y + (i === 2 ? -6 : 0)
      x.save(); x.translate(cx, cy); x.rotate((i - 1) * 0.012); x.scale(k, k)
      // cloud: a few bumps on the top/bottom edges
      const spiral = i === 2
      const fillC = spiral ? '#fff1f6' : BONE
      x.fillStyle = INK
      x.fillRect(-w / 2 - 6, -h / 2 + 10, w + 12, h - 20); x.fillRect(-w / 2 + 10, -h / 2 - 6, w - 20, h + 12)
      for (let b = 0; b < Math.floor(w / 120); b++) { const bx = -w / 2 + 50 + b * 120; x.fillRect(bx - 6, -h / 2 - 20, 72, 24); x.fillRect(bx + 54, h / 2 - 4, 66, 24) }
      x.fillStyle = fillC
      x.fillRect(-w / 2, -h / 2 + 10, w, h - 20); x.fillRect(-w / 2 + 10, -h / 2, w - 20, h)
      for (let b = 0; b < Math.floor(w / 120); b++) { const bx = -w / 2 + 50 + b * 120; x.fillRect(bx, -h / 2 - 14, 60, 18); x.fillRect(bx + 60, h / 2 - 4, 54, 18) }
      rich(x, text, 0, 3, { size, col: INK, acc: '#e0306a' })
      x.restore()
      // puffs toward the head
      const F = starFrame(ME.x, ME.y, ME.s, t, { hops: ME_HOPS, seed: 3 })
      const hx = ME.x + 40, hy = F.cy - ME.s * 0.52
      ;[[0.35, 20], [0.62, 14]].forEach(([u, s], n) => {
        const px = lerp(hx, cx - w * 0.1, 1 - u), py = lerp(hy, cy + h / 2 + 10, 1 - u)
        const kk = pop01(t, t0 + 0.06 * (n + 1), 0.25, 2) * (i < 2 ? 1 : outK(t, T.thOut))
        R(x, INK, px - s / 2 * kk - 4, py - s / 2 * kk - 4, s * kk + 8, s * kk + 8); R(x, fillC, px - s / 2 * kk, py - s / 2 * kk, s * kk, s * kk)
      })
      sparkles(x, t, cx, cy, t0 + 0.05, spiral ? 10 : 6, w * 0.45, i, spiral ? [PINK, BONE, GOLD] : [FROST, BONE])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, T.out)
        x.save()
        room(t)
        windowView(t)
        x.save(); x.globalAlpha *= ok
        furniture(t)
        if (cfg.under) cfg.under(x, t, W)
        const m = { ...defMood(t), ...(cfg.mood ? cfg.mood(t, T) : {}) }
        const opts = { color: SG.color, glyph: SG.glyph, mood: m.mood, look: m.look, hops: m.hops || ME_HOPS, seed: 3, glow: 0.9 }
        star(x, ME.x, ME.y, ME.s, t, opts, { tears: m.tears || (cfg.meTears ? (t > T.cut ? 3 : 2) : 0), sweat: m.sweat || 0 })
        if (cfg.over) cfg.over(x, t, W)
        cfg.thoughts.forEach((s, i) => thought(t, s, i))
        x.restore()
        x.restore()
        box.update(t)
        cap.update(t, outK(t, T.capOut))
        last.update(t, ok)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        drawGrain(gx, t)
      },
    }
  }

  // no Align card transition (owner change, 4 Nov): T.cut is the film's own beat change
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  const NOTE = [440, 493.88, 523.25, 587.33, 659.25, 783.99, 880]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['pop', 0.05, 880, 0.03, 0], ['bell', 0.1, 1318.51, 0.018, 1.2, 0.3],
    // the clock: a soft tick every second until the cut
    ...Array.from({ length: 7 }, (_, i) => ['tick', r3(0.5 + i), 0.018]),
    // the thoughts
    ...T.th.flatMap((v, i) => [['whoosh', r3(v - 0.1), 0.2, 0.02], ['pop', r3(v + 0.04), NOTE[i * 2], 0.04, 0.2], ['pop', r3(v + 0.14), NOTE[i * 2 + 2], 0.03, 0.2], ['glitter', r3(v + 0.05), r3(v + 0.35)]]),
    ['riser', r3(T.th[2] + 0.5), r3(T.cut - 0.05), 0.03],
    // THE STARS arrive
    ['bell', r3(T.starsIn + 0.05), 1760, 0.03, 1.2, 0], ['bell', r3(T.starsIn + 0.18), 2349.32, 0.02, 1.0, 0.2], ['glitter', r3(T.starsIn), r3(T.starsIn + 0.6)],
    ...talkCues(T.lines, { cps: CPS, pitch: { 'THE STARS': 880 } }),
    ...wordPops(T.last, 4, 0.1, 2, 0.03), ['pluck', r3(T.last + 0.45), 1318.51, 0.045, 0.6, 0], ['glitter', r3(T.last + 0.05), r3(T.last + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END, { short: true }),
  ]
  const MUSIC = { drop: T.th[0], breakdown: [T.th[2]], lift: [T.cut], outroAt: T.D - ENDCARD_SHORT_LEN }
  return { DURATION: T.D, SCENES, CUES, T, MUSIC }
}
