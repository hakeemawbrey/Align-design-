// tvn: the shared look of THEN vs NOW (Star Talk Then vs Now, promo/films/STARTALK-THENNOW.md), Block E
// (yr2006texts, yr2006mixtape, yr2006notes, yr2010status, yr2010webcam). Every film carries an identical copy of this file
// in its own folder, so the five match without touching another folder.
//
// One 20 s format (story 0–15.6, then the shared end card, default CTA). Pure f(t); nothing touches `document` at module
// top level (the sound build imports this file in node).
//   0.12   THEN: big top caption heads.then ("[Thing] in *2006*"). The THEN world is drawn on an offscreen canvas and
//          composited as an "old phone video": over-saturated, slightly blurry, a warm cast, faded blacks, a soft
//          vignette, speckle + scanlines, jittery framing, and an orange pixel-font date stamp bottom-right.
//          The year sticker (right, under the caption) reads the old year. Era gags play (caption stickers welcome).
//   7.267  the ONE card cut (flip) on the switch to NOW.
//   7.37   NOW: heads.now ("[Thing] in *2026*", the year pops late, on the sticker flip at 7.822). Clean and crisp,
//          the current pixel-star look; the 2026 version of the same thing.
//  12.267  PAYOFF: a small THEN polaroid (a freeze of the THEN world) flies in top-left, NOW stays big. One THE STARS box
//          line (a small gold narrator star pops in bottom-right) and the last line as a big headline (12.823, the
//          accent lands at 13.379). Everything pops out by 15.45.
//
// makeTVN(cfg) → { DURATION, T, SCENES, CUES, CUTS, MUSIC, LINES }
//   cfg = { id, year: '2006', lastLate?: n (how many last words of heads.last pop late, default 1), date: string | t => string ('03·14·2006'), heads: { then, now, last }, accents?: { … },
//           line: 'THE STARS payoff line', lines?: [{ t, speaker, text, color? }] (extra box lines, THEN or NOW half),
//           stickers?: [{ text, at, out?, x, y, rot?, bg?, color?, size? }] (caption stickers, screen space),
//           thenWorld(x, t, W), nowWorld(x, t, W), freeze: t (the THEN moment on the polaroid),
//           crop?: [sx, sy, size] (square of the THEN frame on the polaroid), cues?(T) }
//   Worlds draw in frame coordinates (1080 × 1920; keep the action in rows ~440…1540: the caption sits above, the box
//   below). W = { T, t, pay, x, px, bits, txt, sparkles, star, pisces, frame, inSprite, tears, bangs, phoneBits, … }
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN        // 15.6
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', HOT = '#ff4f86', TEAR = '#8fe3ff'
export const STAMP = '#ffa62b'                         // the camcorder date-stamp orange
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)  // the 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, signStar, STAR, drawPixelStar, rng }

// ── the shared timeline
export const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12,
  cut: BEAT(12),                                       // 7.267  the one card cut: THEN → NOW
  h1: BEAT(12) + 0.1, flip: BEAT(13),                  // 7.367 · 7.822  the year sticker flips to 2026
  pay: BEAT(21), payIn: [BEAT(21), BEAT(21) + 0.5],    // 12.267  payoff: the polaroid flies in
  line: BEAT(21) + 0.3, boxOpen: BEAT(21) + 0.1, boxClose: 15.2,
  h2: BEAT(22), h2Late: BEAT(23),                      // 12.823 · 13.379
  out: [15.05, 15.45], bugOut: [15.2, 15.5],
}
T.h0Out = [T.cut - 0.25, T.cut - 0.05]
T.h1Out = [T.pay - 0.2, T.pay]
export const CPS = 30
const STICKER = { x: 912, y: 536, r: 80 }

// ── pixel font (3×5) for the date stamp
const PF = {
  '0': ['111', '101', '101', '101', '111'], '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'],
  '3': ['111', '001', '111', '001', '111'], '4': ['101', '101', '111', '001', '001'], '5': ['111', '100', '111', '001', '111'],
  '6': ['111', '100', '111', '101', '111'], '7': ['111', '001', '001', '010', '010'], '8': ['111', '101', '111', '101', '111'],
  '9': ['111', '101', '111', '001', '111'], '·': ['0', '0', '1', '0', '0'], ':': ['0', '1', '0', '1', '0'], ' ': ['00', '00', '00', '00', '00'],
  'A': ['010', '101', '111', '101', '101'], 'P': ['110', '101', '110', '100', '100'], 'M': ['10001', '11011', '10101', '10001', '10001'],
}
export function pixText(ctx, s, X, Y, cell, color, { align = 'right', shadow = 'rgba(40,10,0,0.75)', alpha = 1 } = {}) {
  const gs = [...s].map(c => PF[c] || PF[' '])
  const w = gs.reduce((a, g) => a + (g[0].length + 1) * cell, -cell)
  let x0 = align === 'right' ? X - w : align === 'center' ? X - w / 2 : X
  ctx.save(); ctx.globalAlpha *= alpha
  for (const pass of [0, 1]) {
    let cx = x0
    ctx.fillStyle = pass ? color : shadow
    const o = pass ? 0 : cell * 0.5
    for (const g of gs) {
      for (let j = 0; j < 5; j++) for (let i = 0; i < g[0].length; i++) if (g[j][i] === '1') ctx.fillRect(cx + i * cell + o, Y + j * cell + o, cell, cell)
      cx += (g[0].length + 1) * cell
    }
  }
  ctx.restore()
  return w
}

// ── pixel helpers (bound to one canvas)
export function makeHelpers(x) {
  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  /** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
  function bits(bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
    if (alpha <= 0.01 || Math.abs(sx * sy) < 1e-4) return
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
      x.fillStyle = cols[ch] || '#ff00ff'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
    }
    x.restore()
  }
  function txt(s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1, shadow = true, rot = 0, spacing = 0, italic = false } = {}) {
    if (alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot)
    x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    x.letterSpacing = spacing ? spacing + 'px' : '0px'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, 0, Math.max(2, size * 0.08)) }
    x.fillStyle = color; x.fillText(s, 0, 0); x.restore()
  }
  /** a ring of pixel sparkles bursting out at t0 */
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  /** a chunky pixel speech/bubble rect with an ink rim */
  function panel(X, Y, w, h, col, { rim = INK, P = 6 } = {}) {
    px(X + P, Y - P, w - 2 * P, h + 2 * P, rim); px(X - P, Y + P, w + 2 * P, h - 2 * P, rim); px(X, Y, w, h, rim)
    px(X + P, Y, w - 2 * P, h, col); px(X, Y + P, w, h - 2 * P, col)
  }
  return { px, bits, txt, sparkles, panel }
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
/** the sprite frame of a drawStarChar call (same args) — cell = one sprite pixel; inSprite draws in 0…36 cell coords */
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
/** side-swept era bangs over the left eye (sprite cells) */
const BANGS = [[12, 11, 26], [10, 12, 27], [9, 13, 27], [8, 14, 25], [8, 15, 21], [8, 16, 18], [8, 17, 16], [8, 18, 14], [9, 19, 13], [10, 20, 12]]
export function bangsCells(ctx, col = '#2b1838', hi = '#6b4a86') {
  for (const [a, j, b] of BANGS) { ctx.fillStyle = INK; ctx.fillRect(a - 0.6, j - 0.6, b - a + 1.2, 1.2) }
  for (const [a, j, b] of BANGS) { ctx.fillStyle = col; ctx.fillRect(a, j, b - a, 1) }
  ctx.fillStyle = hi
  for (const [a, j, b] of BANGS) if (b - a > 4) ctx.fillRect(a + Math.round((b - a) * 0.55), j, 2, 1)
}

// ── the format bug: "THEN vs NOW" (Inter 800, letter-spaced small caps), top-left, 56 px from the edges
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none',
    font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)' }, root,
    `<span style="color:${STAMP}">THEN</span><span style="color:rgba(255,255,255,0.6)">&nbsp;vs&nbsp;</span><span style="color:${BONE}">NOW</span>`)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

export function makeTVN(cfg) {
  const ac = { then: STAMP, now: '#7fe0ff', last: HOT, ...(cfg.accents || {}) }
  const extra = cfg.lines || []
  const PAYLINE = { t: T.line, speaker: 'THE STARS', text: cfg.line }
  const LINES = [...extra, PAYLINE]
  const nar = talkHops([PAYLINE], 'THE STARS', { cps: CPS })
  const dateAt = t => typeof cfg.date === 'function' ? cfg.date(t) : cfg.date

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 34px Inter", "italic 500 150px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the THEN world renders here first, then gets the old-video treatment on the way to the main canvas
    const oc = document.createElement('canvas'); oc.width = 1080; oc.height = 1920
    const ox = oc.getContext('2d')
    const HM = makeHelpers(x), HO = makeHelpers(ox)
    const H0 = popText(root, cfg.heads.then, { top: 160, size: 92, accentSize: 132, at: T.h0, gap: 0.08, accentColor: ac.then, fit: true })
    const H1 = popText(root, cfg.heads.now, { top: 160, size: 92, accentSize: 132, at: T.h1, gap: 0.08, late: 1, lateAt: T.flip, wobble: true, accentColor: ac.now, fit: true })
    const H2 = popText(root, cfg.heads.last, { top: 168, size: 104, accentSize: 150, at: T.h2, gap: 0.1, late: cfg.lastLate ?? 1, lateAt: T.h2Late, wobble: true, accentColor: ac.last, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
    // boxes: one per half that has lines, plus the payoff box
    const seg = (a, b) => LINES.filter(L => L.t >= a && L.t < b)
    const boxes = []
    const tl = seg(0, T.cut), nl = seg(T.cut, T.pay)
    if (tl.length) boxes.push(dialogueBox(root, { lines: tl, y: 1556, open: tl[0].t - 0.22, close: T.cut - 0.12, cps: CPS }))
    if (nl.length) boxes.push(dialogueBox(root, { lines: nl, y: 1556, open: nl[0].t - 0.22, close: T.pay - 0.08, cps: CPS }))
    boxes.push(dialogueBox(root, { lines: [PAYLINE], y: 1556, open: T.boxOpen, close: T.boxClose, cps: CPS }))
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // ── characters (bound to a canvas)
    function starOn(ctx) {
      return function star(P, X, Y, s, t, o = {}) {
        const S = typeof P === 'string' ? (P === 'stars' ? { color: STAR.sky, glyph: null } : signStar(P)) : P
        const opts = { color: S.color, glyph: s >= 120 ? S.glyph : null, seed: o.seed ?? 3, glow: o.glow ?? 0.9, ...o }
        drawStarChar(ctx, X, Y, s, t, opts)
        const F = starFrame(X, Y, s, t, opts)
        if (o.bangs) inSprite(ctx, F, () => bangsCells(ctx, o.bangs === true ? undefined : o.bangs))
        if (o.tears) inSprite(ctx, F, () => tearsCells(ctx, t, o.tears))
        if (o.prop) inSprite(ctx, F, () => o.prop(F))
        return F
      }
    }
    function makeW(ctx, H) {
      const star = starOn(ctx)
      const W = { T, x: ctx, ...H, t: 0, pay: 0, live: true, pop01, outK, popOut, BEAT, ease, lerp, prog, clamp, r3, pixText: (...a) => pixText(ctx, ...a),
        star: (P, X, Y, s, o) => star(P, X, Y, s, W.t, o),
        pisces: (X, Y, s, tears = 2, mood = 'happy', o = {}) => star('pisces', X, Y, s, W.t, { seed: 6, mood, tears, ...o }),
        frame: starFrame, inSprite: (F, fn) => inSprite(ctx, F, fn), tears: k => tearsCells(ctx, W.t, k), bangs: (c, h) => bangsCells(ctx, c, h) }
      return W
    }
    const WT = makeW(ox, HO), WN = makeW(x, HM)

    // ── the THEN world → the old-video look
    function renderThen(t, live) {
      WT.t = t; WT.live = live
      drawSky(ox, t, { ...SKY_H, dim: 0.78, moon: { ...SKY_H.moon, alpha: 0.9 } })
      ox.save(); cfg.thenWorld(ox, t, WT); ox.restore()
    }
    function oldVideo(t, k) {
      const jx = 2.6 * Math.sin(t * 13.1) + 1.6 * Math.sin(t * 7.3 + 1) + (Math.sin(t * 2.1) > 0.97 ? 7 : 0)
      const jy = 2.2 * Math.sin(t * 11.7 + 2) + 1.4 * Math.sin(t * 5.9)
      const rot = 0.0035 * Math.sin(t * 4.3)
      x.save()
      x.translate(540 + jx, 960 + jy); x.rotate(rot); x.scale(1.03, 1.03); x.translate(-540, -960)
      x.filter = 'saturate(1.75) contrast(1.06) blur(1.5px)'
      x.drawImage(oc, 0, 0)
      x.filter = 'none'
      x.restore()
      // warm cast + faded blacks
      x.save()
      x.globalCompositeOperation = 'overlay'; x.fillStyle = 'rgba(255,150,60,0.38)'; x.fillRect(0, 0, 1080, 1920)
      x.globalCompositeOperation = 'screen'; x.fillStyle = 'rgba(70,40,20,0.55)'; x.fillRect(0, 0, 1080, 1920)
      x.globalCompositeOperation = 'source-over'
      // soft vignette
      const v = x.createRadialGradient(540, 980, 360, 540, 980, 1180); v.addColorStop(0, 'rgba(30,12,0,0)'); v.addColorStop(1, 'rgba(30,12,0,0.62)')
      x.fillStyle = v; x.fillRect(0, 0, 1080, 1920)
      // speckle, scanlines, a slow tracking band
      const R = rng(7 + Math.floor(t * 15))
      for (let i = 0; i < 90; i++) { x.fillStyle = R() < 0.5 ? 'rgba(255,240,220,0.16)' : 'rgba(0,0,0,0.18)'; x.fillRect(R() * 1080, R() * 1920, 2 + R() * 4, 2 + R() * 2) }
      x.fillStyle = 'rgba(0,0,0,0.07)'; for (let y = 0; y < 1920; y += 6) x.fillRect(0, y, 1080, 2)
      const band = ((t * 0.23) % 1) * 2400 - 240
      const bg = x.createLinearGradient(0, band - 60, 0, band + 60); bg.addColorStop(0, 'rgba(255,255,255,0)'); bg.addColorStop(0.5, 'rgba(255,240,220,0.09)'); bg.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = bg; x.fillRect(0, band - 60, 1080, 120)
      x.restore()
      // the date stamp
      pixText(x, dateAt(t), 1020, 1566, 7, STAMP, { alpha: k })
    }

    // ── the year sticker (a pixel starburst; flips old year → 2026)
    function yearSticker(t) {
      const kIn = pop01(t, 0.55, 0.36, 2.6), kOut = outK(t, [T.pay - 0.15, T.pay + 0.1])
      if (kIn * kOut <= 0.01) return
      const f = prog(t, T.flip - 0.14, T.flip), g = easeOutBack(prog(t, T.flip, T.flip + 0.32), 3)
      const now = t >= T.flip
      const sx = now ? g : 1 - ease.inQuad(f)
      const pulse = now ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T.flip) / 0.3)) : 1
      const { x: X, y: Y, r } = STICKER
      x.save(); x.translate(X, Y); x.rotate(now ? 0.1 : -0.12); x.scale(Math.max(0.001, sx) * kIn * kOut * pulse, kIn * kOut * pulse)
      const burst = (R0, col) => { x.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, rr = i % 2 ? R0 * 0.84 : R0; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fillStyle = col; x.fill() }
      x.fillStyle = 'rgba(4,2,12,0.5)'; x.save(); x.translate(7, 9); burst(r, 'rgba(4,2,12,0.5)'); x.restore()
      burst(r + 7, INK); burst(r, now ? HOT : STAMP); burst(r * 0.78, now ? '#ff8fb1' : '#ffc874')
      x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0px'
      x.fillStyle = INK; x.fillText(now ? '2026' : cfg.year, 0, 3)
      x.restore()
      if (now) HM.sparkles(t, X, Y, T.flip, 10, 120, 1, [GOLD, BONE, HOT])
    }

    // ── caption stickers (screen space)
    function stickers(t) {
      for (const S of cfg.stickers || []) {
        const out = S.out ?? (S.at < T.cut ? T.cut - 0.1 : T.pay - 0.05)
        const k = pop01(t, S.at, 0.3, 2.6) * outK(t, [out - 0.2, out])
        if (k <= 0.01) continue
        x.save(); x.translate(S.x, S.y); x.rotate(S.rot ?? -0.05); x.scale(k, k)
        x.font = `800 ${S.size || 36}px ${INTER}`; x.letterSpacing = '1px'
        const w = x.measureText(S.text).width + 40, h = (S.size || 36) + 26
        x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(-w / 2 + 6, -h / 2 + 7, w, h)
        x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
        x.fillStyle = S.bg || '#fffaf0'; x.fillRect(-w / 2, -h / 2, w, h)
        x.fillStyle = S.color || INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.text, 0, 2)
        x.restore()
      }
    }

    // ── the payoff polaroid (a freeze of the THEN world)
    const PC = { x: 236, y: 640, w: 300 }
    function polaroid(t) {
      if (t < T.payIn[0]) return
      const p = easeOutBack(prog(t, ...T.payIn), 1.5), k = popOut(t, T.out)
      if (k <= 0.01) return
      renderThen(cfg.freeze, false)
      const [sx, sy, ss] = cfg.crop || [140, 560, 800]
      const W2 = PC.w, ph = W2 - 36, H2 = W2 + 52
      const cx = lerp(-260, PC.x, p), cy = lerp(280, PC.y, p), rot = lerp(-0.6, -0.075, p)
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
      x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(-W2 / 2 + 12, -H2 / 2 + 16, W2, H2)
      x.fillStyle = '#f6f0e2'; x.fillRect(-W2 / 2, -H2 / 2, W2, H2)
      const iy = -H2 / 2 + 18
      x.save(); x.beginPath(); x.rect(-ph / 2, iy, ph, ph); x.clip()
      x.filter = 'saturate(1.7) contrast(1.05) blur(0.8px)'
      x.drawImage(oc, sx, sy, ss, ss, -ph / 2, iy, ph, ph)
      x.filter = 'none'
      x.globalCompositeOperation = 'overlay'; x.fillStyle = 'rgba(255,150,60,0.4)'; x.fillRect(-ph / 2, iy, ph, ph)
      x.globalCompositeOperation = 'screen'; x.fillStyle = 'rgba(70,40,20,0.5)'; x.fillRect(-ph / 2, iy, ph, ph)
      x.globalCompositeOperation = 'source-over'
      const v = x.createRadialGradient(0, iy + ph / 2, ph * 0.25, 0, iy + ph / 2, ph * 0.75); v.addColorStop(0, 'rgba(30,12,0,0)'); v.addColorStop(1, 'rgba(30,12,0,0.55)')
      x.fillStyle = v; x.fillRect(-ph / 2, iy, ph, ph)
      pixText(x, dateAt(cfg.freeze).slice(-4), ph / 2 - 10, iy + ph - 28, 3, STAMP)
      x.restore()
      // marker label + tape
      x.font = `italic 600 44px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
      x.fillText(cfg.year, 0, H2 / 2 - 30)
      x.save(); x.translate(0, -H2 / 2 - 4); x.rotate(0.06); x.fillStyle = 'rgba(233,222,190,0.9)'; x.fillRect(-60, -18, 120, 36); x.restore()
      x.restore()
    }

    function narrator(t) {
      const k = pop01(t, T.boxOpen + 0.1, 0.36, 2.1) * popOut(t, T.out)
      if (k <= 0.01) return
      WN.star('stars', 930, 1490, 128, { pop: k, mood: t > T.h2Late ? 'sparkle' : 'happy', hops: [T.boxOpen + 0.45, ...nar], seed: 2, glow: 1.05 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        WN.t = t
        WN.pay = ease.inOutCubic(prog(t, ...T.payIn))
        const k = popOut(t, T.out)
        if (t < T.cut) {
          renderThen(t, true)
          oldVideo(t, 1)
        } else {
          drawSky(x, t, SKY_H)
          if (t < T.out[1] + 0.02) { x.save(); cfg.nowWorld(x, t, WN); x.restore() }
        }
        if (t < T.out[1] + 0.02) {
          stickers(t)
          yearSticker(t)
          polaroid(t)
          narrator(t)
          if (cfg.overlay) cfg.overlay(x, t, WN)
        }
        void k
        for (const b of boxes) b.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // the one card cut, on the switch to NOW
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // THEN: the camcorder clicks on
    ['tick', 0.1, 0.06], ['tick', 0.18, 0.04], ...wordPops(T.h0, 5, 0.08, 0), ['pop', r3(T.bug + 0.06), 880, 0.03, -0.4],
    ['pop', 0.6, 739.99, 0.035, 0.4], ['pop', 0.66, 1108.73, 0.02, 0.4],
    // NOW: the headline, the year sticker flips (whoosh, pop, bell, glitter)
    ...wordPops(T.h1, 4, 0.08, 2),
    ['whoosh', r3(T.flip - 0.16), 0.2, 0.03], ['pop', T.flip, 1174.66, 0.05, 0.4], ['pop', r3(T.flip + 0.06), 1567.98, 0.035, 0.4],
    ['bell', r3(T.flip + 0.08), 2349.32, 0.025, 1.0, 0.4], ['glitter', T.flip, r3(T.flip + 0.4)],
    // PAYOFF: the polaroid (shutter clack + whoosh), the narrator, the line, the last headline
    ['tick', r3(T.payIn[0] - 0.06), 0.07], ['tick', r3(T.payIn[0]), 0.05], ['whoosh', T.payIn[0], 0.4, 0.04], ['pluck', r3(T.payIn[0] + 0.42), 1318.51, 0.035, 0.5, -0.4],
    ['pop', r3(T.boxOpen + 0.12), 880, 0.035, 0.4],
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.h2, 3, 0.1, 0, 0.026), ['pop', T.h2Late, 1174.66, 0.045, 0], ['pop', r3(T.h2Late + 0.1), 1567.98, 0.035, 0],
    ['bell', r3(T.h2Late + 0.12), 1760, 0.028, 1.2, 0], ['glitter', T.h2Late, r3(T.h2Late + 0.45)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const MUSIC = { drop: T.cut, build: 8, lift: [T.pay], outroAt: DURATION - ENDCARD_LEN }
  return { DURATION, T, SCENES, CUES, CUTS, MUSIC, LINES }
}
