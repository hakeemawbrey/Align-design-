// packkit: the STARTER PACK engine for Star Talk Trends, format 5 (promo/films/STARTALK-TRENDS.md §5).
// Every STARTER PACK film (trpacknerves, trpackastro, trpackromantic, trpackmatchmaker, trpackhomebody) carries an
// identical copy of this file in its own folder, so the five look like one format without sharing a module.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.1        the top caption pops ("First date nerves | *starter pack*") over a 2×2 grid of dashed empty slots;
//              slot 4 holds a pulsing "?".  The "STARTER PACK" bug sits top-left, 56 px in.
//   1.71 / 3.93 / 6.16   items 1–3 SLAP into their slots as die-cut stickers (cream border, dark mini-scene inside,
//              a cream label tag under each), each a tiny looping gag.  THE STARS (gold) and ♓ Pisces peek over the
//              dialogue box at the bottom; Pisces sniffles the whole time.
//   8.38       the breakdown: the "?" slot shakes, the music drops out, THE STARS: "…and the rare item."
//   9.49       the twist slaps in with a gold border, a heart sticker and sparkles (the heart of the pack).
//   11.16      the card cut → the payoff: the twist sticker fills the frame, a line in the box, then the last line
//              pops at the top and holds to the end card.  Pisces fountains.
//
//   makePack(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     caption, captionAccent,                 the top caption ('First date nerves | *starter pack*')
//     items: [ITEM, ITEM, ITEM], twist: ITEM,  ITEM = { label, tint, draw(x, t, lt, P) }  (twist may add payoff(x, t, pt, P))
//                                              draw paints the sticker's inside in local px (P.w × P.h = 440 × 360),
//                                              lt = t − the item's slap time; P.big is true in the payoff
//     lines: [L1, L2]                          THE STARS' two lines over the grid ({ speaker?, text, color? })
//     payoffLine: { speaker, text, color }     the line in the box after the cut (optional)
//     last, lastAccent,                        the last line (headline at the top, holds to the end card)
//     cues?(T)                                 film-specific sound cues
//   }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CREAM = '#f6efe2', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)        // the 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export const pulse = (t, f = 1) => 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * f)
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

/** a pixel speech bubble (k = pop scale), tail at the bottom centre (tail: -1 left, 1 right, 0 none) */
export function bubble(x, cx, cy, text, { k = 1, size = 26, col = BONE, ink = INK, tail = 0, weight = 800, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + size * 1.1, h = size + 22
  x.fillStyle = ink; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (tail) {
    const tx = tail * Math.min(w / 2 - 22, 40)
    x.fillStyle = ink; x.fillRect(tx - 10, h / 2 + 2, 14, 12); x.fillStyle = col; x.fillRect(tx - 6, h / 2 - 2, 8, 10)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

/** plain pixel text (Space Mono / Inter) with an ink drop */
export function label(x, text, cx, cy, { size = 24, col = BONE, font = MONO, weight = 700, align = 'center', alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, cx + 2, cy + 3); x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
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

// ── the bug: a 2×2 grid icon + "STARTER PACK" (Inter 800, letter-spaced small caps, gold)
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '44px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 44; ic.height = 44
  const c = ic.getContext('2d')
  const cols = [PINK, GOLD, '#8fd8f6', '#9fe6b0']
  ;[[4, 4], [24, 4], [4, 24], [24, 24]].forEach(([u, v], i) => { c.fillStyle = INK; c.fillRect(u - 2, v - 2, 20, 20); c.fillStyle = CREAM; c.fillRect(u, v, 16, 16); c.fillStyle = cols[i]; c.fillRect(u + 3, v + 3, 10, 10) })
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'STARTER&nbsp;PACK')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── layout
export const TW = 440, TH = 360, BORDER = 13
const COLS = [292, 788], ROWS = [612, 1062]
const SLOTS = [{ cx: COLS[0], cy: ROWS[0], rot: -2.4 }, { cx: COLS[1], cy: ROWS[0], rot: 2.0 }, { cx: COLS[0], cy: ROWS[1], rot: 1.6 }, { cx: COLS[1], cy: ROWS[1], rot: -1.8 }]
const BIG = { cx: 540, cy: 840, rot: -1.2, s: 2.0 }
const NAR = { x: 796, y: 1374, s: 124 }, PIS = { x: 952, y: 1370, s: 128 }
const CPS = 30

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = 20, STORY_END = D - ENDCARD_LEN
  const T = { D, STORY_END, cap: 0.12, bug: 0.3, slots: 0.3, items: [BEAT(2), BEAT(6), BEAT(10)], brk: BEAT(14), twist: BEAT(16), cut: BEAT(19) }
  T.capOut = [r3(T.cut - 0.25), r3(T.cut - 0.04)]
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  const SP = 'THE STARS'
  T.lines = [
    { t: r3(T.items[1] + 0.5), speaker: SP, ...cfg.lines[0] },
    { t: BEAT(13.4), speaker: SP, ...cfg.lines[1] },
  ]
  T.times = lineTimes(T.lines, { cps: CPS })
  T.box1 = { open: r3(T.lines[0].t - 0.22), close: r3(T.cut - 0.3) }
  T.pline = cfg.payoffLine ? [{ t: r3(T.cut + 0.4), ...cfg.payoffLine }] : []
  T.ptimes = lineTimes(T.pline, { cps: CPS })
  T.box2 = { open: r3(T.cut + 0.18), close: r3(T.out[0]) }
  T.last = r3(cfg.lastAt ?? Math.max(12.9, T.pline.length ? T.ptimes[0].done + 0.25 : 0))
  return T
}

export function makePack(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const ITEMS = [...cfg.items.map((it, i) => ({ ...it, at: T.items[i], slot: SLOTS[i] })), { ...cfg.twist, at: T.twist, slot: SLOTS[3], twist: true }]
  const SP = 'THE STARS'
  const NAR_HOPS = [T.items[0] + 0.1, ...talkHops(T.lines, SP, { cps: CPS }), T.twist + 0.05, T.last + 0.05]
  const PIS_HOPS = [T.twist + 0.1, T.twist + 0.6, T.last + 0.2]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "700 30px 'Space Mono'", "700 48px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const cap = popText(root, cfg.caption, { top: 150, size: 88, accentSize: 124, at: T.cap, gap: 0.08, late: 2, lateAt: 0.62, accentColor: cfg.captionAccent || GOLD, wobble: true, fit: true })
    const last = popText(root, cfg.last, { top: 160, size: 104, accentSize: 150, at: T.last, gap: 0.1, accentColor: cfg.lastAccent || PINK, wobble: true, fit: true })
    const box1 = dialogueBox(root, { lines: T.lines, y: 1420, height: 250, size: 46, ...T.box1, cps: CPS })
    const box2 = T.pline.length ? dialogueBox(root, { lines: T.pline, y: 1420, height: 250, size: 46, ...T.box2, cps: CPS }) : null
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // label measuring + fitting (canvas Inter 800)
    function tag(text, cx, cy, rot, k, { bg = CREAM, fg = INK, size = 32 } = {}) {
      if (k <= 0.01) return
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
      let s = size
      x.font = `800 ${s}px ${INTER}`
      let w = x.measureText(text).width
      if (w > 400) { s = Math.floor(s * 400 / w); x.font = `800 ${s}px ${INTER}`; w = x.measureText(text).width }
      const bw = w + 40, bh = s + 26
      x.fillStyle = 'rgba(4,2,12,0.45)'; x.fillRect(-bw / 2 + 6, -bh / 2 + 8, bw, bh)
      x.fillStyle = INK; x.fillRect(-bw / 2 - 4, -bh / 2, bw + 8, bh); x.fillRect(-bw / 2, -bh / 2 - 4, bw, bh + 8)
      x.fillStyle = bg; x.fillRect(-bw / 2, -bh / 2, bw, bh)
      x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
      x.restore()
    }

    function emptySlot(t, S, n, k) {
      if (k <= 0.01) return
      const isQ = n === 3
      let rot = S.rot * Math.PI / 180, dx = 0
      if (isQ && t > T.brk - 0.05 && t < T.twist) { const a = prog(t, T.brk, T.twist); dx = Math.sin(t * 46) * 9 * (0.4 + a); rot += Math.sin(t * 31) * 0.03 * (0.4 + a) }
      x.save(); x.translate(S.cx + dx, S.cy); x.rotate(rot); x.scale(k, k)
      const w = TW + BORDER * 2, h = TH + BORDER * 2
      x.fillStyle = 'rgba(20,12,48,0.55)'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = isQ ? 'rgba(242,199,92,0.85)' : 'rgba(239,230,214,0.5)'
      const d = 18
      for (let u = -w / 2; u < w / 2; u += d * 2) { x.fillRect(u, -h / 2, d, 5); x.fillRect(u, h / 2 - 5, d, 5) }
      for (let v = -h / 2; v < h / 2; v += d * 2) { x.fillRect(-w / 2, v, 5, d); x.fillRect(w / 2 - 5, v, 5, d) }
      x.font = `800 ${isQ ? 170 : 90}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const qk = isQ ? 1 + 0.06 * Math.sin(t * 5) : 1
      x.save(); x.scale(qk, qk)
      x.fillStyle = isQ ? GOLD : 'rgba(239,230,214,0.22)'
      x.fillText(isQ ? '?' : String(n + 1), 0, 8)
      x.restore()
      x.restore()
    }

    /** a die-cut sticker: cream border, ink outline, dark tinted inside with the item's mini-scene */
    function sticker(t, it, cx, cy, rot, s, k, big) {
      if (k <= 0.01) return
      const w = TW + BORDER * 2, h = TH + BORDER * 2
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s * k, s * k)
      x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
      x.fillStyle = it.twist ? GOLD : CREAM; x.fillRect(-w / 2, -h / 2, w, h)
      if (it.twist) { x.fillStyle = '#ffe9a8'; x.fillRect(-w / 2, -h / 2, w, 4); x.fillRect(-w / 2, -h / 2, 4, h) }
      x.fillStyle = INK; x.fillRect(-TW / 2 - 3, -TH / 2 - 3, TW + 6, TH + 6)
      x.save(); x.beginPath(); x.rect(-TW / 2, -TH / 2, TW, TH); x.clip()
      const g = x.createLinearGradient(0, -TH / 2, 0, TH / 2)
      g.addColorStop(0, it.tint || '#2a1f55'); g.addColorStop(1, '#100a26')
      x.fillStyle = g; x.fillRect(-TW / 2, -TH / 2, TW, TH)
      x.translate(-TW / 2, -TH / 2)
      const P = { w: TW, h: TH, big, T, assets }
      if (big && it.payoff) it.payoff(x, t, t - T.cut, P)
      else it.draw(x, t, t - it.at, P)
      x.restore()
      // a sheen line across the sticker
      x.fillStyle = 'rgba(255,255,255,0.07)'; x.beginPath(); x.moveTo(-TW / 2 + 40, -TH / 2); x.lineTo(-TW / 2 + 110, -TH / 2); x.lineTo(-TW / 2 + 10, TH / 2); x.lineTo(-TW / 2 - 60, TH / 2); x.closePath(); x.fill()
      if (it.twist) heart(x, w / 2 - 22, -h / 2 + 18, 6.5, { rot: 0.25 })
      x.restore()
    }

    function slapK(t, at) { return t < at ? 0 : easeOutBack(prog(t, at, at + 0.3), 1.6) }
    function slapPose(t, it) {
      const p = prog(t, it.at, it.at + 0.3)
      const sc = lerp(1.45, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - it.at - 0.3) * 9) * Math.sin((t - it.at) * 30) * (p >= 1 ? 1 : 0))
      const rot = (it.slot.rot + lerp(it.twist ? -14 : 12, 0, ease.outCubic(p))) * Math.PI / 180
      return { sc, rot, a: clamp(p * 4) }
    }

    function peekers(t, k, phase) {
      // THE STARS (left) and ♓ Pisces (right) peeking over the box
      if (k <= 0.01) return
      const nm = phase === 'payoff' ? (t > T.last ? 'sparkle' : 'happy') : t > T.twist ? 'sparkle' : t > T.brk ? 'wide' : 'happy'
      const nl = t > T.brk && t < T.twist ? [1, -1] : t > T.twist && phase !== 'payoff' ? [1, -1] : undefined
      drawStarChar(x, NAR.x, NAR.y, NAR.s, t, { color: STAR.sky, mood: nm, look: nl, hops: NAR_HOPS, pop: k, seed: 2, glow: 0.9 })
      const tears = phase === 'payoff' ? 3 : t > T.twist ? 2 : 1
      const pm = phase === 'payoff' ? 'happy' : t > T.twist ? 'sparkle' : t > T.brk ? 'wide' : 'sparkle'
      const pl = t > T.brk && t < T.twist ? [-1, -1] : undefined
      const opts = { color: signStar('pisces').color, mood: pm, look: pl, hops: PIS_HOPS, pop: k, seed: 6, glow: 0.9 }
      star(x, PIS.x, PIS.y, PIS.s, t, opts, { tears })
      // a tiny tissue in Pisces' hand-point
      const F = starFrame(PIS.x, PIS.y, PIS.s, t, opts)
      drawBits(x, ['WWW', 'WWW', 'WWW'], { W: '#ffffff' }, PIS.x - PIS.s * 0.42, F.cy + 6, 6 * k, { rot: Math.sin(t * 6) * 0.2 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const pre = t < T.cut
        const ok = outK(t, T.out)
        // slap bump (camera)
        let bump = 0
        for (const it of ITEMS) { const d = t - it.at - 0.18; if (d > 0 && d < 0.35) bump += (it.twist ? 16 : 8) * Math.exp(-d * 12) * Math.sin(d * 50) }
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 2.5))) })
        x.save(); x.translate(0, bump)
        if (pre) {
          // warm halo behind the grid
          const g = x.createRadialGradient(540, 840, 0, 540, 840, 760); g.addColorStop(0, 'rgba(255,190,220,0.13)'); g.addColorStop(1, 'rgba(255,190,220,0)')
          x.fillStyle = g; x.fillRect(0, 300, 1080, 1100)
          const sk = pop01(t, T.slots, 0.4, 1.8) * outK(t, [T.cut - 0.3, T.cut - 0.05])
          ITEMS.forEach((it, n) => {
            const S = it.slot, sk2 = pop01(t, T.slots + n * 0.08, 0.35, 1.8) * outK(t, [T.cut - 0.3, T.cut - 0.05])
            if (t < it.at + 0.12) emptySlot(t, S, n, sk2)
            if (t >= it.at) {
              const ps = slapPose(t, it)
              x.save(); x.globalAlpha *= ps.a
              sticker(t, it, S.cx, S.cy, ps.rot, ps.sc, sk, false)
              x.restore()
              const lk = pop01(t, it.at + 0.22, 0.3, 2.2) * sk
              tag(it.label, S.cx + (n % 2 ? -6 : 6), S.cy + TH / 2 + 42, -S.rot * Math.PI / 360, lk, it.twist ? { bg: GOLD } : {})
              sparkles(x, t, S.cx, S.cy, it.at + 0.2, it.twist ? 14 : 8, it.twist ? 280 : 230, n * 0.7, it.twist ? [GOLD, PINK, BONE] : [BONE, GOLD])
            }
          })
          void slapK
        } else {
          // the payoff: the twist sticker fills the frame
          const it = ITEMS[3]
          const g = x.createRadialGradient(540, 840, 0, 540, 840, 800); g.addColorStop(0, 'rgba(255,170,210,0.18)'); g.addColorStop(1, 'rgba(255,170,210,0)')
          x.fillStyle = g; x.fillRect(0, 200, 1080, 1300)
          const bk = pop01(t, T.cut - 0.05, 0.4, 1.4) * lerp(0.92, 1, ok)
          x.save(); x.globalAlpha *= ok
          sticker(t, it, BIG.cx, BIG.cy, BIG.rot * Math.PI / 180 + 0.01 * Math.sin(t * 1.3), BIG.s * lerp(0.94, 1, ease.outCubic(prog(t, T.cut, T.cut + 3.5))), bk, true)
          tag(it.label, BIG.cx, BIG.cy + TH * BIG.s / 2 + 66, 0.02, pop01(t, T.cut + 0.2, 0.3, 2), { bg: GOLD, size: 40 })
          x.restore()
          sparkles(x, t, 540, BIG.cy, T.last + 0.05, 16, 420, 0.4, [GOLD, PINK, BONE])
        }
        if (cfg.over) cfg.over(x, t, T, { pre, ok })
        x.save(); x.globalAlpha *= ok; peekers(t, pop01(t, T.items[0] + 0.15, 0.35, 2), pre ? 'grid' : 'payoff'); x.restore()
        x.restore()
        box1.update(t); if (box2) box2.update(t)
        cap.update(t, outK(t, T.capOut))
        last.update(t, ok)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate (a 20 s film): the cut into the payoff
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const pitch = { [SP]: 880 }
  const CUES = [
    ...wordPops(T.cap, 4, 0.08), ['pop', 0.62, 1318.51, 0.04, 0], ['pop', 0.72, 1567.98, 0.035, 0],
    ['pop', T.bug + 0.05, 987.77, 0.025, -0.4],
    ...[0, 1, 2, 3].map(n => ['tick', r3(T.slots + n * 0.08 + 0.05), 0.03]),
    // the slaps
    ...ITEMS.flatMap((it, n) => [
      ['whoosh', r3(it.at - 0.12), 0.25, 0.03],
      ['tom', r3(it.at + 0.18), it.twist ? 82 : 110 + n * 12, { gain: it.twist ? 0.3 : 0.2, decay: 0.2 }],
      ['tick', r3(it.at + 0.18), 0.07],
      ['pop', r3(it.at + 0.2), NOTE[(n * 2) % 7], 0.04, n % 2 ? 0.3 : -0.3],
      ['pop', r3(it.at + 0.3), NOTE[(n * 2 + 2) % 7], 0.025, n % 2 ? 0.3 : -0.3],
      ['glitter', r3(it.at + 0.2), r3(it.at + (it.twist ? 0.7 : 0.4))],
    ]),
    // the breakdown: the "?" rattles
    ...[0, 0.12, 0.24, 0.5, 0.62, 0.74].map(d => ['tick', r3(T.brk + d), 0.035]),
    ['riser', r3(T.brk + 0.3), r3(T.twist + 0.15), 0.035],
    ['boom', r3(T.twist + 0.18), 0.22], ['bell', r3(T.twist + 0.25), 1760, 0.03, 1.1, 0], ['bell', r3(T.twist + 0.35), 2349.32, 0.022, 1.0, 0.2],
    ...talkCues(T.lines, { cps: CPS, pitch }),
    ...talkCues(T.pline, { cps: CPS }),
    ...wordPops(T.last, 4, 0.1, 2, 0.03), ['pluck', r3(T.last + 0.45), 1318.51, 0.045, 0.6, 0], ['glitter', r3(T.last + 0.05), r3(T.last + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: T.D, SCENES, CUES, T }
}
