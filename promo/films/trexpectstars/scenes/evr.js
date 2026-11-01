// evr: the shared look of EXPECTATION vs REALITY (Star Talk Trends, format 3, promo/films/STARTALK-TRENDS.md), used by
// all five episodes (trexpectpicnic, trexpectcook, trexpectstars, trexpectdance, trexpectoutfit). Every episode carries an
// identical copy of this file in its own folder, so the five films look like one format without touching another folder.
//
// One 20 s format (story 0–15.6, then the shared end card, default CTA). Pure f(t); nothing touches `document` at module
// top level (the sound build imports this file in node).
//   0.12   EXPECTATION: the glossy LEFT panel slides in (gold frame, blush gradient, sheen, sparkles). Headline: heads.expect.
//   4.49   the drop. A record-scratch and REALITY slams in on the RIGHT (taped-on, tilted, handheld, speckled, a timestamp).
//          Headline: heads.reality. Three caption stickers slap on at the three gags (rule of three, the third twisted).
//   8.35   a hush: the two look at each other…  8.93 they crack up (the turn: reality is better).
//   9.49   the one card cut.  10.05 the divider swipes: REALITY pushes EXPECTATION off and fills the frame, revealing
//          the rest of the scene (Pisces, crying, every episode). Headline: heads.turn + one box line.
//  12.82   the last line (heads.last) and a rubber stamp THUNKs onto the reality panel. Everything pops out by 15.45.
//
// makeEVR(cfg) → { DURATION, T, SCENES, CUES, CUTS }
//   cfg = { id, pair: [signId, signId], heads: { expect, reality, turn, last }, accents?: { … }, stickers: [{ text, x?, y?,
//           rot?, strike? }]×3, stamp, clock: { expect, reality (string | t => string) }, line: { who: 0|1, text },
//           gloss: [top, bottom] colours, real: [top, bottom] colours, glossy(x, t, W), scrappy(x, t, W), cues?(T) }
//   glossy / scrappy draw their world in frame coordinates as if the panel were the full width, centred on x = 540
//   (panel rows 520…1600; the world is shifted down by WDY = 200, so world rows 320…1400 show). During the split only x ≈ 288…792 shows; after the widen the whole reality world shows.
//   W = { T, wk, px, bits, txt, star, pisces, frame, inSprite, tears, sparkles, pop01, outK, popOut, laughHops, … }
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
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)  // the 108 bpm grid
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, signStar, STAR, drawPixelStar }

// ── the shared timeline
export const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Out: [4.2, 4.4], Lin: [0.3, 0.78],
  Rin: [4.36, 4.62], drop: BEAT(7), h1: 4.62, h1Out: [9.1, 9.3],
  gags: [BEAT(9), BEAT(11), BEAT(13)],                 // 5.600 · 6.711 · 7.822
  hush: [8.35, 8.9], laugh: BEAT(15),                  // 8.933
  cut: BEAT(16),                                       // 9.489
  widen: [10.05, 10.6], h2: 10.1, h2Out: [12.6, 12.8],
  line: 10.5, boxOpen: 10.3, boxClose: 13.25,
  h3: BEAT(22), stamp: BEAT(23),                       // 12.823 · 13.379
  out: [15.05, 15.45], bugOut: [15.2, 15.5],
}
export const PT = 520, PB = 1600                       // panel rows
export const WDY = 200                                 // the world is drawn 200 px lower (world rows 320…1400)
const SPLIT = { L: [24, 528], R: [552, 1056] }
export const CPS = 30

// ── pixel helpers
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
  function txt(s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1, shadow = true, rot = 0, spacing = 0 } = {}) {
    if (alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot)
    x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (spacing) x.letterSpacing = spacing + 'px'
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
  return { px, bits, txt, sparkles }
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

// ── the format bug: "EXPECTATION / REALITY" (Inter 800, letter-spaced small caps), top-left, 56 px from the edges
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none',
    font: `800 28px ${INTER}`, letterSpacing: '0.2em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)' }, root,
    `<span style="color:${GOLD}">EXPECTATION</span><span style="color:rgba(255,255,255,0.6)">&nbsp;/&nbsp;</span><span style="color:${BONE}">REALITY</span>`)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

const STICK_DEF = [{ x: 0, y: 600, rot: -0.07 }, { x: 0, y: 690, rot: 0.05 }, { x: 0, y: 780, rot: -0.04 }]

export function makeEVR(cfg) {
  const PAIR = cfg.pair.map(id => ({ id, ...signStar(id), name: id.toUpperCase() }))
  const L0 = cfg.line, who = PAIR[L0.who]
  const LINES = [{ t: T.line, speaker: `${who.glyph}︎ ${who.name}`, color: cfg.lineColor || '#ffd98a', text: L0.text }]
  const laughHops = [0, 0.28, 0.56, 0.84, 1.12, 1.45].map(d => r3(T.laugh + d))
  const ac = { expect: GOLD, reality: '#9fe6ff', turn: PINK, last: HOT, ...(cfg.accents || {}) }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 34px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = makeHelpers(x)
    const H0 = popText(root, cfg.heads.expect, { top: 160, size: 92, accentSize: 132, at: T.h0, gap: 0.08, accentColor: ac.expect, fit: true })
    const H1 = popText(root, cfg.heads.reality, { top: 160, size: 92, accentSize: 132, at: T.h1, gap: 0.08, accentColor: ac.reality, fit: true })
    const H2 = popText(root, cfg.heads.turn, { top: 160, size: 92, accentSize: 132, at: T.h2, gap: 0.08, accentColor: ac.turn, fit: true })
    const H3 = popText(root, cfg.heads.last, { top: 172, size: 112, accentSize: 156, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3 + 0.3, wobble: true, accentColor: ac.last, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
    const box = dialogueBox(root, { lines: LINES, y: 1556, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // ── characters (world coords; the panel transform is already applied)
    function star(i, X, Y, s, t, o = {}) {
      const P = i === 'pisces' ? { ...signStar('pisces') } : PAIR[i]
      const opts = { color: P.color, glyph: s >= 120 ? P.glyph : null, seed: o.seed ?? (i === 'pisces' ? 6 : 3 + i * 5), glow: o.glow ?? 0.9, ...o }
      drawStarChar(x, X, Y, s, t, opts)
      const F = starFrame(X, Y, s, t, opts)
      if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
      if (o.prop) inSprite(x, F, () => o.prop(F))
      return F
    }
    const pisces = (X, Y, s, t, tears = 2, mood = 'happy', o = {}) => star('pisces', X, Y, s, t, { mood, tears, ...o })
    const W = { T, PAIR, x, ...H, star: (i, X, Y, s, o) => star(i, X, Y, s, W.t, o), pisces: (X, Y, s, tears, mood, o) => pisces(X, Y, s, W.t, tears, mood, o),
      frame: starFrame, inSprite: (F, fn) => inSprite(x, F, fn), tears: k => tearsCells(x, W.t, k), pop01, outK, popOut, laughHops, BEAT, ease, lerp, prog, clamp, t: 0, wk: 0 }

    // ── panels
    function rects(t) {
      const li = ease.outCubic(prog(t, ...T.Lin)), ri = easeOutBack(prog(t, ...T.Rin), 1.25)
      const w = ease.inOutCubic(prog(t, ...T.widen))
      const sl = (1 - li) * -620 - w * 560
      const R = { l: lerp(SPLIT.R[0], 24, w) + (1 - ri) * 640, r: SPLIT.R[1] + (1 - ri) * 640 }
      return { L: { l: SPLIT.L[0] + sl, r: SPLIT.L[1] + sl, on: t >= T.Lin[0] && w < 1 }, R: { ...R, on: t >= T.Rin[0] }, w }
    }
    // a stepped pixel frame (outer ink, colour rim, inner hairline)
    function frame(l, r, rim, hair, P = 8) {
      const w = r - l, h = PB - PT
      x.save()
      const ring = () => { x.beginPath(); x.moveTo(l + P * 1.5, PT + P / 2); x.lineTo(r - P * 1.5, PT + P / 2); x.lineTo(r - P / 2, PT + P * 1.5); x.lineTo(r - P / 2, PB - P * 1.5); x.lineTo(r - P * 1.5, PB - P / 2)
        x.lineTo(l + P * 1.5, PB - P / 2); x.lineTo(l + P / 2, PB - P * 1.5); x.lineTo(l + P / 2, PT + P * 1.5); x.closePath() }
      x.lineJoin = 'miter'; x.strokeStyle = INK; x.lineWidth = P + 10; ring(); x.stroke()
      x.strokeStyle = rim; x.lineWidth = P; ring(); x.stroke()
      if (hair) { x.strokeStyle = hair; x.lineWidth = 2; x.strokeRect(l + P * 2, PT + P * 2, w - P * 4, h - P * 4) }
      x.restore()
    }
    function drawPanel(kind, rc, t, k) {
      const { l, r } = rc
      if (r - l < 6 || k <= 0.01) return
      const cx = (l + r) / 2, cy = (PT + PB) / 2, gl = kind === 'L'
      const jit = gl ? [0, 0] : [1.6 * Math.sin(t * 11.3) + 1.1 * Math.sin(t * 6.7 + 1), 1.4 * Math.sin(t * 9.1 + 2) + 0.9 * Math.sin(t * 5.3)]
      const rot = gl ? 0 : -0.012 * (1 - 0.6 * rc.wk)
      x.save(); x.translate(cx + jit[0], cy + jit[1]); x.rotate(rot); x.scale(k, k); x.translate(-cx, -cy)
      // drop shadow
      x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(l + 16, PT + 22, r - l, PB - PT)
      // the world, clipped
      x.save(); x.beginPath(); x.rect(l, PT, r - l, PB - PT); x.clip()
      const [c0, c1] = gl ? (cfg.gloss || ['#ffd3e6', '#f8b98f']) : (cfg.real || ['#6d7090', '#3a3650'])
      const g = x.createLinearGradient(0, PT, 0, PB); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(l, PT, r - l, PB - PT)
      x.save(); x.translate(cx - 540, WDY)
      if (gl) cfg.glossy(x, t, W); else cfg.scrappy(x, t, W)
      x.restore()
      if (gl) {
        // glossy: a sheen band sweeps every 2.6 s, twinkles, a warm vignette
        const ph = ((t - 0.8) / 2.6) % 1
        if (t > 0.8 && t < T.laugh) {
          const sx = lerp(l - 300, r + 300, ease.inOutQuad(ph))
          x.save(); x.globalAlpha = 0.28 * Math.sin(Math.PI * ph); x.translate(sx, cy); x.rotate(0.45)
          const sg = x.createLinearGradient(-90, 0, 90, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, 'rgba(255,255,255,1)'); sg.addColorStop(1, 'rgba(255,255,255,0)')
          x.fillStyle = sg; x.fillRect(-90, -900, 180, 1800); x.restore()
        }
        for (let i = 0; i < 9; i++) {
          const q = (t * 0.55 + i * 0.37) % 1, a = Math.sin(Math.PI * q)
          const R = rng(i * 13 + 5); const X = l + 30 + R() * (r - l - 60), Y = PT + 40 + R() * (PB - PT - 80)
          x.save(); x.globalAlpha = 0.85 * a * a; drawPixelStar(x, X, Y, 20 + 10 * a, i % 2 ? 1 : 2, i % 3 ? '#fff6d8' : GOLD); x.restore()
        }
        // after the laugh the glossy dream dims (reality wins)
        const dim = 0.42 * ease.inOutQuad(prog(t, T.laugh, T.laugh + 0.6))
        if (dim > 0) { x.fillStyle = `rgba(30,22,52,${dim})`; x.fillRect(l, PT, r - l, PB - PT) }
      } else {
        // scrappy: a dull wash, speckle, a timestamp
        x.fillStyle = 'rgba(70,70,92,0.12)'; x.fillRect(l, PT, r - l, PB - PT)
        const R = rng(1 + Math.floor(t * 12))
        for (let i = 0; i < 70; i++) { x.fillStyle = R() < 0.5 ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)'; x.fillRect(l + R() * (r - l), PT + R() * (PB - PT), 3 + R() * 3, 3) }
      }
      x.restore()
      // frames + labels
      if (gl) {
        frame(l, r, GOLD, 'rgba(255,246,216,0.75)')
        // the gold label pill, straddling the top edge
        const lw = 330, lh = 58, lx = cx - lw / 2, ly = PT - lh / 2 - 6
        H.px(lx + 6, ly - 4, lw - 12, lh + 8, INK); H.px(lx - 4, ly + 6, lw + 8, lh - 12, INK)
        H.px(lx + 6, ly, lw - 12, lh, GOLD); H.px(lx, ly + 6, lw, lh - 12, GOLD); H.px(lx + 10, ly + 4, lw - 20, 6, '#fff1c8')
        H.txt('✦ EXPECTATION', cx, ly + lh / 2 + 2, { size: 27, font: INTER, weight: 800, color: INK, shadow: false, spacing: 3 })
        const ck = cfg.clock?.expect
        if (ck) H.txt(ck, l + 34, PB - 40, { size: 24, align: 'left', color: '#fff6e0', spacing: 2 })
      } else {
        frame(l, r, '#efe6d6', null, 6)
        // masking tape on two corners + the REALITY tape label
        const tape = (X, Y, w, h, a) => { x.save(); x.translate(X, Y); x.rotate(a); x.fillStyle = 'rgba(233,222,190,0.88)'; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = 'rgba(160,140,100,0.25)'; for (let i = -w / 2; i < w / 2; i += 12) x.fillRect(i, -h / 2, 3, 4), x.fillRect(i + 6, h / 2 - 4, 3, 4); x.restore() }
        tape(l + 26, PT + 14, 120, 40, -0.7); tape(r - 26, PB - 14, 120, 40, -0.7)
        x.save(); x.translate(cx, PT - 4); x.rotate(-0.045)
        x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-140 + 8, -30 + 8, 280, 60)
        x.fillStyle = '#ede3c4'; x.fillRect(-140, -30, 280, 60)
        x.fillStyle = 'rgba(160,140,100,0.3)'; for (let i = -140; i < 140; i += 14) { x.fillRect(i, -30, 4, 5); x.fillRect(i + 7, 25, 4, 5) }
        x.restore()
        H.txt('REALITY', cx, PT - 4, { size: 34, color: INK, shadow: false, rot: -0.045, spacing: 6 })
        const ck = typeof cfg.clock?.reality === 'function' ? cfg.clock.reality(t) : cfg.clock?.reality
        if (ck) {
          const blink = (t * 1.6) % 1 < 0.6
          if (blink) { H.px(l + 30, PB - 50, 16, 16, '#ff5a5a') }
          H.txt(ck, l + 58, PB - 41, { size: 24, align: 'left', color: BONE, spacing: 2 })
        }
      }
      x.restore()
    }

    // ── caption stickers (screen space, over the reality panel)
    function sticker(t, i, rc) {
      const S = { ...STICK_DEF[i], ...(cfg.stickers[i] || {}) }
      const t0 = T.gags[i], k = pop01(t, t0, 0.3, 2.6) * outK(t, [T.cut - 0.25, T.cut - 0.05])
      if (k <= 0.01 || !S.text) return
      const cx = (rc.l + rc.r) / 2 + S.x, cy = S.y
      x.save(); x.translate(cx, cy); x.rotate(S.rot); x.scale(k, k)
      x.font = `800 34px ${INTER}`; x.letterSpacing = '1px'
      const w = x.measureText(S.text).width + 40, h = 58
      x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(-w / 2 + 6, -h / 2 + 7, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
      x.fillStyle = S.bg || '#fffaf0'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = S.color || INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.text, 0, 2)
      // the twist: a red strike + the correction
      if (S.strike && t > S.strike.at) {
        const p = ease.outCubic(prog(t, S.strike.at, S.strike.at + 0.18))
        x.fillStyle = '#e8324a'; x.fillRect(-w / 2 + 8, -3, (w - 16) * p, 7)
        const q = pop01(t, S.strike.at + 0.2, 0.3, 2.6)
        if (q > 0.01) {
          x.save(); x.translate(w / 2 - 20, h / 2 + 30); x.rotate(0.08); x.scale(q, q)
          x.font = `italic 600 46px ${SERIF}`; x.letterSpacing = '0px'; x.textAlign = 'right'
          x.fillStyle = INK; x.fillText(S.strike.text, 3, 3); x.fillStyle = '#ff5a6e'; x.fillText(S.strike.text, 0, 0)
          x.restore()
        }
      }
      x.restore()
    }

    // ── the rubber stamp
    function stamp(t, rc) {
      if (t < T.stamp - 0.25) return 0
      const p = prog(t, T.stamp - 0.25, T.stamp), k = popOut(t, T.out)
      const sc = lerp(2.6, 1, ease.inCubic(p)) * k, a = clamp(p * 2.5) * k
      if (a <= 0.01) return 0
      const cx = (rc.l + rc.r) / 2 + (cfg.stampAt?.x ?? 0), cy = cfg.stampAt?.y ?? 700
      x.save(); x.translate(cx, cy); x.rotate(-0.13); x.scale(sc, sc); x.globalAlpha *= a
      x.font = `800 64px ${INTER}`; x.letterSpacing = '4px'
      const w = x.measureText(cfg.stamp).width + 60, h = 104
      x.fillStyle = 'rgba(255,236,242,0.82)'; x.fillRect(-w / 2, -h / 2, w, h)
      x.strokeStyle = HOT; x.lineWidth = 9; x.strokeRect(-w / 2, -h / 2, w, h); x.lineWidth = 3; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
      x.fillStyle = HOT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cfg.stamp, 0, 4)
      // ink speckle knock-outs (a real stamp is patchy)
      const R = rng(77); x.fillStyle = 'rgba(255,236,242,0.5)'
      for (let i = 0; i < 26; i++) x.fillRect(-w / 2 + R() * w, -h / 2 + R() * h, 4 + R() * 6, 3)
      x.restore()
      const dt = t - T.stamp
      return dt > 0 && dt < 0.4 ? 12 * Math.exp(-dt * 10) * Math.sin(dt * 55) : 0
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        W.t = t
        drawSky(x, t, SKY_H)
        const rc = rects(t), k = popOut(t, T.out)
        W.wk = rc.w; rc.R.wk = rc.w; rc.L.wk = 0
        const dtS = t - T.stamp, shake = dtS > 0 && dtS < 0.4 ? 12 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
        x.save(); x.translate(0, shake)
        if (t < T.out[1] + 0.02) {
          if (rc.L.on) drawPanel('L', rc.L, t, k)
          if (rc.R.on) drawPanel('R', rc.R, t, k)
          if (rc.R.on) for (let i = 0; i < 3; i++) sticker(t, i, rc.R)
          if (cfg.overlay) cfg.overlay(x, t, W, rc)
          stamp(t, rc.R)
        }
        x.restore()
        box.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // one card cut, at the turn (between the laugh and the widen)
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // the glossy dream slides in
    ...wordPops(T.h0, 5, 0.08, 0), ['pop', r3(T.bug + 0.06), 880, 0.03, -0.4],
    ['whoosh', T.Lin[0], 0.45, 0.04], ['glitter', T.Lin[1] - 0.1, T.Lin[1] + 0.5], ['bell', r3(T.Lin[1]), 1760, 0.02, 1.4, -0.3],
    // the record scratch + reality slams in
    ['tapeStop', r3(T.Rin[0] - 0.06), 0.32], ['whoosh', T.Rin[0], 0.3, 0.05], ['tick', T.Rin[1], 0.08], ['tom', T.Rin[1], 110, { gain: 0.2, decay: 0.25 }],
    ...wordPops(T.h1, 4, 0.08, 2),
    // the three stickers slap on
    ...T.gags.flatMap((g, i) => [['tick', g, 0.07], ['pop', g, NOTE[[1, 3, 5][i]], 0.045, 0.3], ['pop', r3(g + 0.05), NOTE[[3, 5, 6][i]] * 1.5, 0.025, 0.3]]),
    // the laugh: a giggle run
    ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.laugh + i * 0.11), NOTE[[2, 4, 3, 5, 4, 6, 5, 6][i]] * 1.5, 0.03, i % 2 ? 0.3 : -0.3]),
    // the widen + turn headline + line
    ['whoosh', T.widen[0], 0.5, 0.045], ['glitter', r3(T.widen[1] - 0.1), r3(T.widen[1] + 0.4)],
    ...wordPops(T.h2, 5, 0.08, 1),
    ...talkCues(LINES, { cps: CPS }),
    // the last line + the stamp THUNK
    ...wordPops(T.h3, 2, 0.1, 0, 0.026), ['pop', r3(T.h3 + 0.3), 1174.66, 0.045, 0], ['pop', r3(T.h3 + 0.4), 1567.98, 0.035, 0],
    ['whoosh', r3(T.stamp - 0.25), 0.25, 0.03], ['boom', T.stamp, 0.28], ['tom', T.stamp, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.07],
    ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.5)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const MUSIC = { drop: T.drop, breakdown: [T.hush[0]], lift: [T.widen[0]], outroAt: DURATION - ENDCARD_LEN }
  return { DURATION, T, SCENES, CUES, CUTS, MUSIC, LINES, PAIR, talkHops: sp => talkHops(LINES, sp, { cps: CPS }) }
}
