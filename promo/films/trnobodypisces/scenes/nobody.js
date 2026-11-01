// NOBODY: kit — the shared look of the Star Talk Trends "NOBODY:" meme format (promo/films/STARTALK-TRENDS.md §2).
// trnobodygemini, trnobodycancer, trnobodycap, trnobodyaqua and trnobodypisces each carry an identical copy of this file,
// so the five films look like one format without touching another folder. Pure f(t); nothing touches `document` at
// module top level (the sound build imports this through scenes/index.js in node).
//
// The format (15 s = 10.6 s story + the shared 4.4 s end card):
//   0.00–2.72  the cold open: a blank white meme card reading "Nobody:" with a blinking caret. Silence: crickets, a pixel
//              tumbleweed rolls across the night. The NOBODY: bug pops top-left.
//   2.72       the one card cut (cardfx), then the drop (2.82): the card is docked at the top as the meme caption,
//              "Nobody:" small and grey, then "[Sign] …:" pops in big. Below it, the sign doing the most (the film's scene).
//   ~5.5       one escalation (the film's own), a dialogue-box line or two.
//   7.75       the payoff: the last line as a big Inter 800 headline with one italic accent.
//   10.1–10.5  everything pops out; the end card takes over.
//
//   makeNobody(cfg) → { DURATION, STORY_END, T, SCENES, CUES }
//   cfg = {
//     caption: 'Gemini at *2 AM:*', capAccent,      the caption's sign line (one *accent*, Garamond italic)
//     last: 'Which one are we *doing?*', lastAccent,
//     lines: [{ t, speaker, text, color }],         dialogue-box lines (≥ 1.5 s hold is checked here)
//     boxY = 1400, boxClose = T.P - 0.2,
//     scene(x, t, T, k)                             the film's canvas scene (k = 1 → 0 as the story pops out)
//     front?(x, t, T, k)                            drawn over the scene (still under the DOM type)
//     build?(root)                                  extra DOM (returns { update(t) } or nothing)
//     cues(T) → extra sound cues
//   }
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MEME = '#fbf8f1'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)            // the 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

export const DURATION = 15
export const STORY_END = DURATION - ENDCARD_LEN           // 10.6
export const T = {
  black: [0, 0.3], bug: 0.3,
  card0: 0.14, nob: 0.42, weed: [0.95, 2.62], crick: [1.32, 2.02],
  coldOut: [2.5, 2.74], cut: 2.72, drop: BEAT(4),
  cap: 2.76, capW: 2.86,
  P: 7.75, PLate: 8.2,
  out: [10.12, 10.48], bugOut: [10.24, 10.5],
}

// ─────────────────────────────────────────────── pixel helpers
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
/** a pixel ring (cells on a grid), e.g. a wheel or a clock face */
export function pixelRing(x, cx, cy, r, cell, col, w = 1) {
  x.fillStyle = col
  const n = Math.ceil(r / cell) + 1
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i * cell, j * cell)
    if (Math.abs(d - r) < cell * 0.55 * w) x.fillRect(Math.round(cx + i * cell - cell / 2), Math.round(cy + j * cell - cell / 2), cell, cell)
  }
}
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
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** little pixel hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, cx, cy, t0, n = 5, seed = 1, col = '#ff4f86') {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.22, ph = (t - b) / 1.6
    if (ph < 0 || ph > 1) continue
    const xx = cx + Math.sin(i * 2.3 + seed) * 70 + Math.sin(ph * 6 + i) * 14, yy = cy - ph * 220
    drawBits(x, HEART, { H: col }, xx, yy, 6 * (0.7 + 0.3 * Math.sin(i + seed)), { alpha: 1 - ph * ph })
  }
}

// a sticker: a slightly tilted label (white pill, ink outline, Inter 800), popping in at t0
export function sticker(x, t, t0, cx, cy, text, { bg = MEME, fg = INK, size = 30, rot = -0.05, out = 1, accent = null, pad = 22 } = {}) {
  const k = pop01(t, t0, 0.34, 2.4) * out
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.08 * (1 - clamp(k))); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + pad * 2, h = size + 26
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 8, -h / 2 + 10, w, h)
  R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  R(x, bg, -w / 2, -h / 2, w, h)
  if (accent) R(x, accent, -w / 2, -h / 2, 10, h)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, accent ? 5 : 0, 2)
  x.restore()
}

// a little speech bubble (Inter 700 on bone), popping in at t0
export function speech(x, t, t0, cx, cy, text, { col = BONE, size = 30, until = 99, tail = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [until - 0.15, until])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(text).width + 40, h = size + 30
  R(x, INK, -w / 2 - 4, -h / 2, w + 8, h); R(x, INK, -w / 2, -h / 2 - 4, w, h + 8)
  R(x, col, -w / 2, -h / 2, w, h)
  R(x, INK, tail - 12, h / 2 + 4, 12, 10); R(x, col, tail - 8, h / 2, 8, 8)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
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
/** a star with optional tears: returns the sprite frame (for props) */
export function star(x, t, P, o = {}) {
  const opts = { color: o.color, glyph: o.glyph ?? null, mood: o.mood ?? 'neutral', look: o.look, seed: o.seed ?? 1, glow: o.glow ?? 1, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: o.hops, squash: o.squash ?? 0, blink: o.blink, tips: o.tips }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (o.tears && (P.pop ?? 1) > 0.05 && (P.alpha ?? 1) > 0.05) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}
const PIS = signStar('pisces')
/** the running gag: Pisces crying somewhere in the back */
export const pisces = (x, t, P, tears = 2, mood = 'sparkle', look = [0, 0], extra = {}) => star(x, t, P, { color: PIS.color, mood, look, seed: 6, glow: 0.8, tears, ...extra })
/** a pixel tissue (white puff) */
export const TISSUE = ['..W.W..', '.WWWWW.', 'WWWWWWW', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB']

// ─────────────────────────────────────────────── the cold open: tumbleweed + crickets
const WEED = ['...ddd...', '.dd.b.dd.', '.d.bbb.d.', 'd.b.d.b.d', 'dbbd.dbbd', 'd.b.d.b.d', '.d.bbb.d.', '.dd.b.dd.', '...ddd...']
function tumbleweed(x, t) {
  const p = prog(t, ...T.weed)
  if (p <= 0 || p >= 1) return
  const cx = lerp(-80, 1160, p)
  const hop = Math.abs(Math.sin(p * Math.PI * 4.2)) * 70 * (1 - p * 0.4)
  drawBits(x, WEED, { d: '#b8925a', b: '#8a6a3c' }, cx, 1440 - hop, 11, { rot: p * 14 })
  // a little dust where it lands
  const ph = (p * 4.2) % 1
  if (ph < 0.25) { x.save(); x.globalAlpha = 0.5 * (1 - ph * 4); R(x, '#cdb58c', cx - 50, 1492, 18, 8); R(x, '#cdb58c', cx - 80, 1500, 12, 6); x.restore() }
}
function crickets(x, t) {
  for (const c of T.crick) {
    const a = Math.sin(Math.PI * prog(t, c, c + 0.6))
    if (a <= 0) continue
    x.save(); x.globalAlpha = a; x.font = `700 32px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'
    x.fillText('* chirp *', c === T.crick[0] ? 300 : 780, 1640 - 20 * prog(t, c, c + 0.6)); x.restore()
  }
}

// ─────────────────────────────────────────────── DOM type
function tokens(text) {
  const out = []; let open = false
  for (const tok of String(text).trim().split(/\s+/)) {
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 })
    if (stars % 2) open = !open
  }
  return out
}
export const wordCount = text => tokens(text).filter(k => !k.br).length
/** caption word times: plain words every 0.09 s from t0, the accent word(s) pop big 0.22 s after the last plain one */
export function capTimes(text, t0) {
  const ws = tokens(text).filter(k => !k.br)
  let n = 0
  const plain = ws.filter(w => !w.accent).length
  return ws.map(w => (w.accent ? r3(t0 + plain * 0.09 + 0.13 + 0.1 * (n++)) : r3(t0 + ws.filter(v => !v.accent).indexOf(w) * 0.09)))
}
function memeLine(parent, text, { size, accentSize, accentColor, top, left = 0, color = INK }) {
  const box = el('div', { position: 'absolute', left: left + 'px', right: '0px', top: top + 'px', font: `800 ${size}px ${INTER}`, lineHeight: '1.04', color, letterSpacing: '-0.015em', whiteSpace: 'nowrap' }, parent)
  const ws = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const st = { display: 'inline-block', marginRight: '0.24em', opacity: 0, transformOrigin: '30% 90%' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: accentSize + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ accent: tk.accent, e: el('span', st, box, tk.w) })
  }
  return { box, ws }
}
function popWords(ws, times, t, out = 1) {
  ws.forEach((w, i) => {
    const big = w.accent, p = prog(t, times[i], times[i] + (big ? 0.4 : 0.26))
    const sc = big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
    const rot = big && t > times[i] ? 8 * Math.sin((t - times[i]) * 14) * Math.exp(-(t - times[i]) * 3.2) : 0
    w.e.style.opacity = String(clamp(p * 3) * out)
    w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 26).toFixed(2)}px) scale(${sc.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
  })
}

function buildBug(root) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', display: 'none', transformOrigin: '0% 50%', pointerEvents: 'none',
    font: `800 30px ${INTER}`, fontVariant: 'all-small-caps', letterSpacing: '0.22em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, root, 'NOBODY:')
  return {
    update(t, out = 1) {
      const k = pop01(t, T.bug, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'block'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

function cardShell(root, { left, top, width, height }) {
  const c = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px', display: 'none', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
  el('div', { position: 'absolute', left: '14px', top: '16px', width: '100%', height: '100%', background: 'rgba(6,4,18,0.5)', borderRadius: '10px' }, c)
  el('div', { position: 'absolute', inset: '0', background: MEME, borderRadius: '10px', boxShadow: `0 0 0 6px ${INK}` }, c)
  return c
}

// ─────────────────────────────────────────────── the film
export function makeNobody(cfg) {
  const LINES = cfg.lines || []
  const CPS = 30
  const boxClose = cfg.boxClose ?? r3(T.P - 0.2)
  // readability: every line holds ≥ 1.5 s after it finishes typing
  const tm = lineTimes(LINES, { cps: CPS })
  tm.forEach((m, i) => {
    const next = LINES[i + 1] ? LINES[i + 1].t : boxClose
    if (next - m.done < 1.5 - 1e-6) throw new Error(`line ${i} ("${LINES[i].text}") holds only ${(next - m.done).toFixed(2)} s`)
    if (LINES[i].text.replace(/\*/g, '').length > 46) throw new Error(`line ${i} is longer than 46 characters`)
  })
  const CAP_T = capTimes(cfg.caption, T.capW)
  const NOB_T = [T.nob]
  const LAST_N = wordCount(cfg.last)

  async function build(stage) {
    try {
      await Promise.all(["800 132px Inter", "800 30px Inter", "700 30px Inter", "800 104px Inter", "italic 500 140px 'EB Garamond'", "italic 500 100px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const extra = cfg.build ? await cfg.build(root, x) : null

    // the cold-open card
    const C0 = { left: 90, top: 720, width: 900, height: 420 }
    const card0 = cardShell(root, C0)
    const nob0 = memeLine(card0, 'Nobody:', { size: 132, accentSize: 132, accentColor: INK, top: 58, left: 64 })
    const caret = el('div', { position: 'absolute', left: '70px', top: '238px', width: '12px', height: '118px', background: INK }, card0)
    // the docked caption card
    const C1 = { left: 70, top: 150, width: 940, height: 300 }
    const card1 = cardShell(root, C1)
    el('div', { position: 'absolute', left: '52px', top: '34px', font: `800 60px ${INTER}`, color: 'rgba(27,18,54,0.5)', letterSpacing: '-0.01em' }, card1, 'Nobody:')
    const cap = memeLine(card1, cfg.caption, { size: 88, accentSize: 104, accentColor: cfg.capAccent || '#7a4fd0', top: 152, left: 52 })
    // a long sign line shrinks (never grows) to fit the card
    { card1.style.display = 'block'; const wd = cap.box.scrollWidth, maxW = C1.width - 104; card1.style.display = 'none'
      if (wd > maxW) { const f = maxW / wd; cap.box.style.fontSize = (88 * f) + 'px'; cap.box.style.top = (152 + 40 * (1 - f)) + 'px'; for (const w of cap.ws) if (w.accent) w.e.style.fontSize = (104 * f) + 'px' } }

    const box = LINES.length ? dialogueBox(root, { lines: LINES, y: cfg.boxY ?? 1400, close: boxClose, cps: CPS }) : null
    const last = popText(root, cfg.last, { top: cfg.lastTop ?? 1500, size: 104, accentSize: 140, at: T.P, late: 1, lateAt: T.PLate, wobble: true, accentColor: cfg.lastAccent || GOLD, fit: true })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        // the sky: a slow push in during the silence, steady after the cut
        const ss = ease.inOutCubic(prog(t, 0, T.cut))
        const base = t < T.cut ? { ...SKY_H, zoom: lerp(1.75, 1.55, ss), dim: lerp(0.4, 0.5, ss) } : { ...SKY_H, ...(cfg.sky || {}) }
        drawSky(x, t, base)
        const k = popOut(t, T.out)
        if (t < T.cut + 0.05) { tumbleweed(x, t); crickets(x, t) }
        if (t >= T.cut - 0.05 && t < T.out[1]) {
          cfg.scene(x, t, T, k)
          if (cfg.front) cfg.front(x, t, T, k)
        }
        // cold card
        const c0 = pop01(t, T.card0, 0.4, 2.0) * outK(t, T.coldOut)
        card0.style.display = c0 > 0.01 && t < T.coldOut[1] ? 'block' : 'none'
        card0.style.opacity = String(clamp(c0 * 2))
        card0.style.transform = `scale(${(0.7 + 0.3 * c0).toFixed(4)})`
        popWords(nob0.ws, NOB_T, t)
        caret.style.opacity = t > T.nob + 0.3 && ((t - T.nob) % 0.9) < 0.48 ? '1' : '0'
        // docked caption
        const c1 = pop01(t, T.cap, 0.34, 2.0) * outK(t, T.out)
        card1.style.display = c1 > 0.01 && t >= T.cap ? 'block' : 'none'
        card1.style.opacity = String(clamp(c1 * 2))
        card1.style.transform = `translateY(${((1 - c1) * -40).toFixed(1)}px) scale(${(0.85 + 0.15 * c1).toFixed(4)})`
        popWords(cap.ws, CAP_T, t)
        if (box) box.update(t)
        last.update(t, outK(t, T.out))
        if (extra && extra.update) extra.update(t)
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // the one card cut: between the silence and the reveal
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const chirp = c => [0, 0.09, 0.3, 0.39].map(d => ['pluck', r3(c + d), 2637, 0.013, 0.1, 0.3])
  const CUES = [
    // the silence
    ['pop', T.card0 + 0.05, 659.25, 0.03, 0], ['pop', T.nob, 1174.66, 0.04, -0.1], ['pop', T.bug + 0.06, 880, 0.025, -0.4],
    ['tick', r3(T.nob + 0.3), 0.012], ['tick', r3(T.nob + 1.2), 0.012], ['tick', r3(T.nob + 2.1), 0.012],
    ...chirp(T.crick[0]), ...chirp(T.crick[1]),
    ['whoosh', T.weed[0], 1.4, 0.018], ...[0.24, 0.48, 0.72].map(f => ['tick', r3(lerp(...T.weed, f)), 0.02]),
    // the reveal
    ['pop', T.cap + 0.02, 739.99, 0.035, 0],
    ...CAP_T.map((c, i) => ['pop', c, NOTE[(i * 2) % 7] * (i === CAP_T.length - 1 ? 1.5 : 1), i === CAP_T.length - 1 ? 0.045 : 0.026, ((i % 3) - 1) * 0.2]),
    ...talkCues(LINES, { cps: CPS }),
    // the payoff
    ...Array.from({ length: LAST_N - 1 }, (_, i) => ['pop', r3(T.P + i * 0.07), NOTE[(i + 1) % 7], 0.026, (i % 2 ? 0.15 : -0.15)]),
    ['pop', T.PLate, 1174.66, 0.05, 0], ['pop', r3(T.PLate + 0.08), 1567.98, 0.035, 0], ['glitter', T.PLate, r3(T.PLate + 0.4)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, STORY_END, T, SCENES, CUES }
}
