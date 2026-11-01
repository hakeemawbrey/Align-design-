// yrkit: the THEN vs NOW engine for Star Talk Then vs Now (promo/films/STARTALK-THENNOW.md, "The shared look").
// Every Block D film (yroutfit, yrsigns, yrcrush, yrgettingover, yrcompat) carries an identical copy of this file in its
// own folder, so the five look like one format without sharing a module.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.12       the "THEN vs NOW" bug (top-left, 56 px) and the big top caption "[Thing] | in *2016*".
//   0–6.71     THEN: the film's scene filmed on an "old phone": over-saturated, slightly blurry, warm cast, soft
//              vignette, heavy speckle, handheld jitter, a pixel date stamp bottom-right ("08·14·2016"), and a
//              tilted year sticker top-right ("2016").  The era's gags play here.
//   6.71       THE card cut (the only candidate) lands on the switch.
//   6.71–12.27 NOW: clean, crisp, the pixel-star sky; the caption re-pops "[Thing] | in *2026*" and the year sticker
//              flips 2016 → 2026 with a pop.
//   12.27      payoff: the THEN frame drops in as a small polaroid top-left, the NOW scene eases down-right,
//              THE STARS say one line in the box, and the last line pops as the big headline (13.38 → end card).
//
//   makeThenNow(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     thing, thenYear, stamp,             'Date outfit', '2016', '08·14·2016'
//     thenAccent?, nowAccent?             caption accent colours
//     thenBack?(x, t)                     the THEN backdrop (default: the sky, which the old-phone look warms)
//     then(x, t, lt, P)                   the THEN scene, full-frame px (scene area ≈ y 440–1400; keep the top-right
//                                         sticker spot ≈ 760–1040 × 400–520 clear)
//     now(x, t, lt, P)                    the NOW scene (P.pt = t − payoff start, < 0 before the payoff)
//     snap: { at, cx, cy, size }          the polaroid: the THEN frame at time `at`, a size×size crop around (cx, cy)
//     lines: [{ t, speaker, text, color }]  box lines; t < cut → THEN box, cut ≤ t < pay → NOW box
//     starsLine: '…'                      THE STARS' payoff line
//     last, lastAccent                    the last line (headline, holds to the end card)
//     cues?(T)                            film-specific sound cues
//   }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CREAM = '#f6efe2', TEAR = '#8fe3ff', AMBER = '#ffb347'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)        // the 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export { drawStarChar, signStar, STAR, clamp, lerp, prog, ease, easeOutBack, drawPixelStar, rng }

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

/** a pixel speech bubble (k = pop scale); tail: -1 left, 1 right, 0 none */
export function bubble(x, cx, cy, text, { k = 1, size = 26, col = BONE, ink = INK, tail = 0, weight = 800, font = INTER, maxW = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  let tw = x.measureText(text).width
  if (maxW && tw > maxW) { size = Math.floor(size * maxW / tw); x.font = `${weight} ${size}px ${font}`; tw = x.measureText(text).width }
  const w = tw + size * 1.1, h = size + 22
  x.fillStyle = ink; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (tail) {
    const tx = tail * Math.min(w / 2 - 22, 40)
    x.fillStyle = ink; x.fillRect(tx - 10, h / 2 + 2, 14, 12); x.fillStyle = col; x.fillRect(tx - 6, h / 2 - 2, 8, 10)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

/** plain text with an ink drop */
export function label(x, text, cx, cy, { size = 24, col = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, rot = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, 2, 3); x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}

// ── a 3×5 pixel font (the camcorder date stamp)
const PF = {
  0: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], 1: ['.X.', 'XX.', '.X.', '.X.', 'XXX'], 2: ['XXX', '..X', 'XXX', 'X..', 'XXX'], 3: ['XXX', '..X', '.XX', '..X', 'XXX'],
  4: ['X.X', 'X.X', 'XXX', '..X', '..X'], 5: ['XXX', 'X..', 'XXX', '..X', 'XXX'], 6: ['XXX', 'X..', 'XXX', 'X.X', 'XXX'], 7: ['XXX', '..X', '.X.', '.X.', '.X.'],
  8: ['XXX', 'X.X', 'XXX', 'X.X', 'XXX'], 9: ['XXX', 'X.X', 'XXX', '..X', 'XXX'], '·': ['...', '...', '.X.', '...', '...'], ':': ['...', '.X.', '...', '.X.', '...'],
  ' ': ['...', '...', '...', '...', '...'], A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'], P: ['XX.', 'X.X', 'XX.', 'X..', 'X..'], M: ['X.X', 'XXX', 'XXX', 'X.X', 'X.X'],
  R: ['XX.', 'X.X', 'XX.', 'X.X', 'X.X'], E: ['XXX', 'X..', 'XX.', 'X..', 'XXX'], C: ['XXX', 'X..', 'X..', 'X..', 'XXX'], '-': ['...', '...', 'XXX', '...', '...'],
}
/** pixel text, right/left/centre aligned at (x0, y0) top, cell px per pixel */
export function pixText(x, text, x0, y0, cell, { col = AMBER, shadow = 'rgba(30,8,0,0.85)', align = 'left', alpha = 1 } = {}) {
  const chars = [...String(text)], adv = 4 * cell, wTot = chars.length * adv - cell
  let ox = align === 'right' ? x0 - wTot : align === 'center' ? x0 - wTot / 2 : x0
  x.save(); x.globalAlpha *= alpha
  for (const pass of [0, 1]) {
    x.fillStyle = pass ? col : shadow
    const d = pass ? 0 : cell * 0.5
    chars.forEach((ch, n) => {
      const g = PF[ch] || PF[' ']
      g.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'X') x.fillRect(Math.round(ox + n * adv + i * cell + d), Math.round(y0 + j * cell + d), Math.ceil(cell), Math.ceil(cell)) }))
    })
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
/** a star with optional tears / sweat seated on it; returns the sprite frame */
export function star(x, cx, cy, size, t, opts = {}, { tears = 0, sweat = 0 } = {}) {
  drawStarChar(x, cx, cy, size, t, opts)
  const F = starFrame(cx, cy, size, t, opts)
  if (tears || sweat) inSprite(x, F, () => { if (tears) tearsCells(x, t, tears); if (sweat) sweatCells(x, t, sweat) })
  return F
}
/** the star body outline in sprite cells (for clipping clothes to the star, inside inSprite) */
export function bodyPath(ctx, grow = 0) {
  ctx.beginPath()
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = (k % 2 ? 9.0 : 17.0) + grow
    const px = 18 + Math.cos(a) * rr, py = 19.6 + Math.sin(a) * rr
    k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.closePath()
}
/** ♓ Pisces in the background, crying (with a tiny tissue) */
export function pisces(x, t, cx, cy, size, { tears = 1, mood = 'sparkle', look, hops, pop = 1, alpha = 1, tissue = true } = {}) {
  if (pop <= 0.01 || alpha <= 0.01) return
  const opts = { color: signStar('pisces').color, mood, look, hops, pop, alpha, seed: 6, glow: 0.8 }
  const F = star(x, cx, cy, size, t, opts, { tears })
  if (tissue) drawBits(x, ['WWW', 'WWW', 'WWW'], { W: '#ffffff' }, cx - size * 0.42, F.cy + size * 0.05, Math.max(3, size * 0.045) * pop, { rot: Math.sin(t * 6) * 0.2, alpha })
}

// ── the bug: "THEN vs NOW" (Inter 800, letter-spaced small caps)
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '0.34em', transformOrigin: '0% 50%', pointerEvents: 'none',
    font: `800 32px ${INTER}`, letterSpacing: '0.2em', fontVariant: 'small-caps', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)' }, root)
  el('span', { color: AMBER }, box, 'THEN')
  el('span', { color: BONE, opacity: '0.6' }, box, 'vs')
  el('span', { color: GOLD }, box, 'NOW')
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
const STICK = { cx: 902, cy: 462, rot: 7 }
const POLA = { cx: 262, cy: 618, rot: -7, w: 330, ph: 300 }
const CPS = 30

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = 20, STORY_END = D - ENDCARD_LEN
  const T = { D, STORY_END, cap: 0.12, capYear: 0.62, bug: 0.3, stick: 0.9, brk: BEAT(10), cut: BEAT(11), pay: BEAT(21), last: BEAT(23) }
  T.cap2 = r3(T.cut + 0.14); T.cap2Year = r3(T.cut + 0.5); T.flip = r3(T.cut + 0.42)
  T.capOut = [r3(T.cut - 0.25), r3(T.cut - 0.04)]
  T.cap2Out = [r3(T.last - 0.3), r3(T.last - 0.06)]
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  const all = cfg.lines || []
  T.thenLines = all.filter(L => L.t < T.cut)
  T.nowLines = all.filter(L => L.t >= T.cut && L.t < T.pay)
  T.payLines = [{ t: r3(T.pay + 0.2), speaker: 'THE STARS', text: cfg.starsLine }]
  T.thenTimes = lineTimes(T.thenLines, { cps: CPS }); T.nowTimes = lineTimes(T.nowLines, { cps: CPS }); T.payTimes = lineTimes(T.payLines, { cps: CPS })
  T.boxA = { open: T.thenLines.length ? r3(T.thenLines[0].t - 0.22) : 0, close: r3(T.cut - 0.3) }
  T.boxB = { open: T.nowLines.length ? r3(T.nowLines[0].t - 0.22) : 0, close: r3(T.pay - 0.28) }
  T.boxC = { open: r3(T.pay), close: T.out[0] }
  return T
}

export function makeThenNow(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const NAR_HOPS = [T.pay + 0.2, ...talkHops(T.payLines, 'THE STARS', { cps: CPS }), T.last + 0.05]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 32px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 400 40px 'EB Garamond'", "700 30px 'Space Mono'", "700 46px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the THEN footage is painted off-screen, then "filmed" onto the main canvas
    const oc = document.createElement('canvas'); oc.width = 1080; oc.height = 1920
    const ox = oc.getContext('2d')
    const capTxt = y => `${cfg.thing} | in *${y}*`
    const cap1 = popText(root, capTxt(cfg.thenYear), { top: 150, size: 88, accentSize: 124, at: T.cap, gap: 0.08, late: 1, lateAt: T.capYear, accentColor: cfg.thenAccent || AMBER, wobble: true, fit: true })
    const cap2 = popText(root, capTxt('2026'), { top: 150, size: 88, accentSize: 124, at: T.cap2, gap: 0.06, late: 1, lateAt: T.cap2Year, accentColor: cfg.nowAccent || '#8fe3ff', wobble: true, fit: true })
    const last = popText(root, cfg.last, { top: 160, size: 104, accentSize: 150, at: T.last, gap: 0.1, accentColor: cfg.lastAccent || PINK, wobble: true, fit: true })
    const P0 = { T, assets, root }
    const boxA = T.thenLines.length ? dialogueBox(root, { lines: T.thenLines, y: 1420, height: 250, size: 46, ...T.boxA, cps: CPS }) : null
    const boxB = T.nowLines.length ? dialogueBox(root, { lines: T.nowLines, y: 1420, height: 250, size: 46, ...T.boxB, cps: CPS }) : null
    const boxC = dialogueBox(root, { lines: T.payLines, y: 1420, height: 250, size: 46, ...T.boxC, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    /** paint the THEN scene at t into the off-screen canvas */
    function paintThen(t) {
      ox.save()
      if (cfg.thenBack) cfg.thenBack(ox, t, P0)
      else drawSky(ox, t, { ...SKY_H, zoom: lerp(1.66, 1.56, prog(t, 0, T.cut)), dim: 0.7 })
      cfg.then(ox, t, t, P0)
      ox.restore()
    }
    /** the old-phone look: saturated, soft, warm, vignetted, speckled, jittery */
    function film(dst, src, t, { jitter = 1, w = 1080, h = 1920, dx = 0, dy = 0 } = {}) {
      const fr = Math.floor(t * 15), r = rng(fr * 7 + 3)
      const jx = jitter * (Math.sin(t * 1.7) * 7 + Math.sin(t * 5.3) * 3 + (r() - 0.5) * 5)
      const jy = jitter * (Math.cos(t * 1.3) * 6 + (r() - 0.5) * 5)
      const sc = 1 + 0.035 * jitter
      dst.save()
      dst.beginPath(); dst.rect(dx, dy, w, h); dst.clip()
      dst.filter = 'saturate(1.75) contrast(1.1) brightness(1.04) blur(1.7px)'
      dst.drawImage(src, dx + w / 2 - (w * sc) / 2 + jx, dy + h / 2 - (h * sc) / 2 + jy, w * sc, h * sc)
      dst.filter = 'none'
      // warm cast + a little faded lift in the blacks
      dst.globalCompositeOperation = 'overlay'; dst.fillStyle = 'rgba(255,128,40,0.38)'; dst.fillRect(dx, dy, w, h)
      dst.globalCompositeOperation = 'screen'; dst.fillStyle = 'rgba(70,30,10,0.22)'; dst.fillRect(dx, dy, w, h)
      dst.globalCompositeOperation = 'source-over'
      // soft vignette
      const g = dst.createRadialGradient(dx + w / 2, dy + h / 2, Math.min(w, h) * 0.32, dx + w / 2, dy + h / 2, Math.max(w, h) * 0.62)
      g.addColorStop(0, 'rgba(20,6,0,0)'); g.addColorStop(1, 'rgba(20,6,0,0.62)')
      dst.fillStyle = g; dst.fillRect(dx, dy, w, h)
      // speckle + a rolling soft band
      const n = Math.round(w * h / 9000)
      for (let i = 0; i < n; i++) { const v = r(); dst.fillStyle = v > 0.5 ? 'rgba(255,236,200,0.16)' : 'rgba(30,10,0,0.18)'; dst.fillRect(dx + r() * w, dy + r() * h, 2 + (v > 0.9 ? 2 : 0), 2) }
      const by = dy + ((t * 0.23) % 1) * (h + 200) - 100
      const bg = dst.createLinearGradient(0, by - 60, 0, by + 60); bg.addColorStop(0, 'rgba(255,220,180,0)'); bg.addColorStop(0.5, 'rgba(255,220,180,0.07)'); bg.addColorStop(1, 'rgba(255,220,180,0)')
      dst.fillStyle = bg; dst.fillRect(dx, by - 60, w, 120)
      dst.restore()
    }

    // the polaroid snapshot (the THEN frame at cfg.snap.at, filmed once, cached)
    let snapC = null
    function snapshot() {
      if (snapC) return snapC
      const s = cfg.snap
      paintThen(s.at)
      const big = document.createElement('canvas'); big.width = 1080; big.height = 1920
      film(big.getContext('2d'), oc, s.at, { jitter: 0 })
      snapC = document.createElement('canvas'); snapC.width = 400; snapC.height = 400
      snapC.getContext('2d').drawImage(big, s.cx - s.size / 2, s.cy - s.size / 2, s.size, s.size, 0, 0, 400, 400)
      return snapC
    }
    function polaroid(t) {
      const k = prog(t, T.pay, T.pay + 0.45)
      if (k <= 0) return
      const e = easeOutBack(k, 1.3), ok = outK(t, T.out)
      const cx = lerp(-260, POLA.cx, e), cy = lerp(POLA.cy - 140, POLA.cy, e), rot = (POLA.rot + lerp(-24, 0, e) + 1.2 * Math.sin(t * 1.4)) * Math.PI / 180
      const W2 = POLA.w, ph = POLA.ph, Hh = ph + 30 + 74
      x.save(); x.globalAlpha *= ok; x.translate(cx, cy); x.rotate(rot)
      x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-W2 / 2 + 12, -Hh / 2 + 16, W2, Hh)
      x.fillStyle = '#fbf6ea'; x.fillRect(-W2 / 2, -Hh / 2, W2, Hh)
      x.fillStyle = '#e9dfca'; x.fillRect(-W2 / 2, Hh / 2 - 6, W2, 6)
      const pw = W2 - 30
      x.drawImage(snapshot(), -pw / 2, -Hh / 2 + 15, pw, ph)
      // develop: the photo fades up from milky
      const dev = 1 - prog(t, T.pay + 0.1, T.pay + 1.0)
      if (dev > 0) { x.fillStyle = `rgba(250,244,230,${0.85 * dev})`; x.fillRect(-pw / 2, -Hh / 2 + 15, pw, ph) }
      x.font = `italic 400 44px ${SERIF}`; x.fillStyle = '#5a3a28'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(`${cfg.thenYear}  ♡︎`, 0, Hh / 2 - 40)
      // tape
      x.fillStyle = 'rgba(255,236,190,0.75)'; x.save(); x.translate(0, -Hh / 2); x.rotate(0.06); x.fillRect(-55, -16, 110, 32); x.restore()
      x.restore()
    }

    function sticker(t) {
      const k = pop01(t, T.stick, 0.4, 2.2) * outK(t, T.out)
      if (k <= 0.01) return
      // the flip: squash to a line, swap the year, spring back
      const f1 = prog(t, T.flip - 0.14, T.flip), f2 = prog(t, T.flip, T.flip + 0.38)
      const now = t >= T.flip
      let sy = 1
      if (t > T.flip - 0.14 && t < T.flip) sy = 1 - ease.inCubic(f1)
      else if (now && f2 < 1) sy = easeOutBack(f2, 2.6)
      const year = now ? '2026' : cfg.thenYear
      const bg = now ? GOLD : '#ffcf8a', fg = INK
      const bump = now ? 1 + 0.12 * Math.sin(Math.PI * Math.min(1, f2 * 1.4)) * (f2 < 1 ? 1 : 0) : 1
      x.save(); x.translate(STICK.cx, STICK.cy); x.rotate((STICK.rot + (now ? -14 * (1 - ease.outCubic(f2)) : 0)) * Math.PI / 180); x.scale(k * bump, k * bump * Math.max(0.02, sy))
      const w = 236, h = 104
      x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
      x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = bg; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
      // a peeled corner
      x.fillStyle = INK; x.beginPath(); x.moveTo(w / 2 - 34, h / 2); x.lineTo(w / 2, h / 2 - 34); x.lineTo(w / 2, h / 2); x.closePath(); x.fill()
      x.fillStyle = '#d8ccb4'; x.beginPath(); x.moveTo(w / 2 - 30, h / 2 - 4); x.lineTo(w / 2 - 4, h / 2 - 30); x.lineTo(w / 2 - 30, h / 2 - 30); x.closePath(); x.fill()
      x.font = `800 70px ${INTER}`; x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(year, -4, 4)
      x.restore()
      if (now) sparkles(x, t, STICK.cx, STICK.cy, T.flip + 0.02, 10, 150, 0.3, [GOLD, BONE, '#8fe3ff'])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, T.out)
        if (t < T.cut) {
          paintThen(t)
          x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920)
          film(x, oc, t)
          // the date stamp (camcorder pixel font), bottom-right, above the frame label
          const blink = Math.floor(t * 2) % 2 === 0
          pixText(x, cfg.stamp, 1000, 1716, 7, { align: 'right' })
          pixText(x, cfg.clock || 'PM 7:42', 1000, 1770, 5, { align: 'right', alpha: 0.85 })
          // a tiny REC dot top-right under the sticker spot
          if (blink) { R(x, '#3a0a00', 803, 547, 18, 18); R(x, '#ff4a2e', 800, 544, 18, 18) }
          pixText(x, 'REC', 830, 542, 4.4, { col: '#ffd9b0' })
        } else {
          drawSky(x, t, SKY_H)
          // a clean flash of light on the switch
          const fl = 1 - prog(t, T.cut + 0.18, T.cut + 0.7)
          if (fl > 0) { const g = x.createRadialGradient(540, 900, 0, 540, 900, 900); g.addColorStop(0, `rgba(190,230,255,${0.22 * fl})`); g.addColorStop(1, 'rgba(190,230,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
          const pk = ease.inOutCubic(prog(t, T.pay, T.pay + 0.55))
          const sc = lerp(1, cfg.payScale ?? 0.86, pk), ddx = lerp(0, cfg.payDx ?? 70, pk), ddy = lerp(0, cfg.payDy ?? 90, pk)
          x.save(); x.globalAlpha *= ok
          x.translate(540 + ddx, 920 + ddy); x.scale(sc, sc); x.translate(-540, -920)
          cfg.now(x, t, t - T.cut, { ...P0, pt: t - T.pay })
          x.restore()
          polaroid(t)
          sparkles(x, t, 540, 980, T.last + 0.05, 16, 420, 0.4, [GOLD, PINK, BONE])
          // THE STARS peek over the box in the payoff
          const nk = pop01(t, T.pay + 0.05, 0.35, 2) * ok
          if (nk > 0.01) drawStarChar(x, 900, 1386, 130, t, { color: STAR.sky, mood: t > T.last ? 'sparkle' : 'happy', hops: NAR_HOPS, pop: nk, seed: 2, glow: 0.9 })
        }
        sticker(t)
        if (cfg.over) cfg.over(x, t, T, P0)
        if (boxA) boxA.update(t); if (boxB) boxB.update(t); boxC.update(t)
        cap1.update(t, outK(t, T.capOut))
        cap2.update(t, outK(t, T.cap2Out))
        last.update(t, ok)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate (a 20 s film): the switch from THEN to NOW
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nw = String(cfg.thing).split(/\s+/).length + 1
  const CUES = [
    ...wordPops(T.cap, nw, 0.08), ['pop', T.capYear, 1318.51, 0.04, 0], ['pluck', r3(T.capYear + 0.05), 783.99, 0.03, 0.4, 0],
    ['pop', T.bug + 0.05, 987.77, 0.025, -0.4],
    ['pop', T.stick, 1174.66, 0.03, 0.4], ['tick', r3(T.stick + 0.02), 0.04],
    // the old-phone record beep
    ['bell', 0.4, 2093, 0.012, 0.25, 0.4],
    // the breakdown: a tape-stop whoosh into the switch
    ['whoosh', r3(T.brk + 0.1), 0.4, 0.02], ['riser', r3(T.brk + 0.2), r3(T.cut - 0.02), 0.03],
    // NOW: caption re-pops, the year sticker flips
    ...wordPops(T.cap2, nw, 0.06, 2), ['pop', T.cap2Year, 1567.98, 0.04, 0],
    ['tick', r3(T.flip - 0.12), 0.05], ['pop', T.flip, 1318.51, 0.05, 0.4], ['pop', r3(T.flip + 0.08), 1760, 0.035, 0.4], ['bell', r3(T.flip + 0.1), 2349.32, 0.022, 0.9, 0.4], ['glitter', r3(T.flip), r3(T.flip + 0.4)],
    ...talkCues(T.thenLines, { cps: CPS }), ...talkCues(T.nowLines, { cps: CPS }), ...talkCues(T.payLines, { cps: CPS, pitch: { 'THE STARS': 880 } }),
    // the payoff: polaroid shutter + whoosh
    ['whoosh', T.pay, 0.35, 0.03], ['tick', r3(T.pay + 0.02), 0.06], ['tick', r3(T.pay + 0.07), 0.04], ['pluck', r3(T.pay + 0.4), 987.77, 0.03, 0.5, -0.4],
    ...wordPops(T.last, 4, 0.1, 2, 0.03), ['pluck', r3(T.last + 0.45), 1318.51, 0.045, 0.6, 0], ['glitter', r3(T.last + 0.05), r3(T.last + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: T.D, SCENES, CUES, T }
}

/** music sections for cues.js (drop on the first gag, breakdown before the switch, lift on it, hit on the last line) */
export function musicFor(T, { key, seed }) {
  return { style: 'funk', key, seed, sections: { drop: BEAT(2), breakdown: [T.brk], lift: [T.cut], outroAt: T.D - 4.4 }, hits: [T.last] }
}
