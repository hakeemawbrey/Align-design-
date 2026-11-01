// tam: the shared look of ME AT 2 PM vs ME AT 2 AM (Star Talk Trends, format 20, promo/films/STARTALK-TRENDS.md), used by
// all five episodes (tr2amcalm, tr2amconfidence, tr2amlove, tr2ambedtime, tr2amtext). Every episode carries an identical
// copy of this file in its own folder, so the five films look like one format without touching another folder.
//
// One 20 s format (story 0–15.6, then the shared end card, default CTA). Pure f(t); nothing touches `document` at module
// top level (the sound build imports this file in node). A stitched split screen, stacked:
//   0.12   heads.topic (the top caption). The 2 PM panel slides in on TOP: a bright afternoon room, a sun in the window,
//          a "2:00 PM" timestamp. The 2 PM self says something breezy (pm.say, a speech bubble); a small 2 PM gag at 2.82.
//   4.49   the drop. The 2 AM panel slams in BELOW: a midnight-blue room, neon trim, a phone glow, a ticking "2:00 AM".
//          Headline heads.spiral. The 2 AM self thinks am.say; three caption stickers slap on at the three gags
//          (rule of three, the third twisted) while the clock ticks on and the 2 PM self watches from above, horrified.
//   8.35   a hush…  8.93 the turn (each film's soft resolution starts).  9.49 the one card cut.
//  10.05   the stitch opens: the 2 PM panel slides away and the 2 AM room grows to fill the frame, revealing its upper half
//          (the window, the moon, Pisces crying, every episode). Headline heads.turn + one box line.
//  12.82   the last line (heads.last) and a neon sign flickers on in the room. Everything pops out by 15.45.
//
// makeTAM(cfg) → { DURATION, T, SCENES, CUES, CUTS, MUSIC }
//   cfg = { id, sign, heads: { topic, spiral, turn, last }, accents?, pm: { say }, am: { say }, stickers: [{ text, x?, y?,
//           rot? }]×3, neon, neonAt?: { y }, line: { who?: 'me' | 'stars' | signId, text }, clock?: { pm, am (string | t => string) },
//           dawnAt?, pmScene(x, t, W), amScene(x, t, W), pmMood?(t) → { mood, look }, overlay?(x, t, W), cues?(T) }
//   Both scenes draw in frame coordinates. 2 PM panel rows 456…1016. 2 AM panel rows 1040…1600 during the split; after
//   the stitch opens it shows rows 456…1600 (draw the upper room freely: it is clipped away until then).
//   W = { T, x, t, wk (stitch-open 0…1), dawn (0…1), px, bits, txt, star, me, pisces, stars, frame, inSprite, tears,
//         sparkles, bubble, phone, pop01, outK, popOut, … }
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
export const NEON = '#ff5fc8', CYAN = '#5ff2ff', SUN = '#ffd23a', NIGHT = '#141a46'
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
  h0: 0.12, h0Out: [4.2, 4.4], PMin: [0.3, 0.78], pmIn: 0.7, pmSay: BEAT(2), pmGag: BEAT(4),     // 1.711 · 2.822
  AMin: [4.36, 4.62], drop: BEAT(7), h1: 4.62, h1Out: [9.1, 9.3], amIn: 4.62, amSay: 4.95,
  gags: [BEAT(9), BEAT(11), BEAT(13)],                 // 5.600 · 6.711 · 7.822
  hush: [8.35, 8.9], turn: BEAT(15),                   // 8.933
  cut: BEAT(16),                                       // 9.489
  open: [10.05, 10.6], h2: 10.1, h2Out: [12.6, 12.8],
  line: 10.5, boxOpen: 10.3, boxClose: 13.25,
  h3: BEAT(22), neon: BEAT(23),                        // 12.823 · 13.379
  out: [15.05, 15.45], bugOut: [15.2, 15.5],
}
export const PM = { t: 456, b: 1016 }, AM = { t: 1040, b: 1600 }, PL = 24, PR = 1056
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
  /** a pixel speech (or thought) bubble; text rows split on '|'; the tail points at (tx, ty) */
  function bubble(t, cx, cy, t0, text, { t1 = 1e9, size = 36, col = '#fffaf0', ink = INK, think = false, tx = null, ty = null, font = INTER, weight = 800, italic = false } = {}) {
    const k = pop01(t, t0, 0.28, 2.4) * outK(t, [t1 - 0.18, t1])
    if (k <= 0.01) return
    const rows = text.split('|')
    x.save()
    x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`
    const w = Math.max(...rows.map(r => x.measureText(r).width)) + 48, lh = size * 1.18, h = rows.length * lh + 30
    x.translate(cx, cy); x.scale(k, k)
    // tail
    const dx = tx == null ? -w * 0.25 : (tx - cx) / k, dy = ty == null ? h / 2 + 40 : (ty - cy) / k
    if (think) {
      for (let i = 1; i <= 3; i++) {
        const f = 0.4 + i * 0.18, r = 18 - i * 4
        const bx = dx * f, by = dy * f
        x.fillStyle = ink; x.fillRect(bx - r - 4, by - r - 4, 2 * r + 8, 2 * r + 8); x.fillStyle = col; x.fillRect(bx - r, by - r, 2 * r, 2 * r)
      }
    } else {
      const sx0 = clamp(dx * 0.35, -w / 2 + 30, w / 2 - 30), sy0 = Math.sign(dy) * (h / 2 - 2)
      x.fillStyle = ink; x.beginPath(); x.moveTo(sx0 - 22, sy0); x.lineTo(sx0 + 22, sy0); x.lineTo(dx * 0.55, dy * 0.62 + Math.sign(dy) * 6); x.closePath(); x.fill()
      x.fillStyle = col; x.beginPath(); x.moveTo(sx0 - 14, sy0 - Math.sign(dy) * 6); x.lineTo(sx0 + 14, sy0 - Math.sign(dy) * 6); x.lineTo(dx * 0.55, dy * 0.62 - Math.sign(dy) * 4); x.closePath(); x.fill()
    }
    // body: stepped corners
    x.fillStyle = 'rgba(4,2,12,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
    x.fillStyle = ink; x.fillRect(-w / 2 - 6, -h / 2 + 6, w + 12, h - 12); x.fillRect(-w / 2 + 6, -h / 2 - 6, w - 12, h + 12)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2 + 6, w, h - 12); x.fillRect(-w / 2 + 6, -h / 2, w - 12, h)
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
    rows.forEach((r, i) => x.fillText(r, 0, -h / 2 + 15 + lh * (i + 0.5) + 2))
    x.restore()
  }
  /** a pixel phone (screen-up), its glow lighting the face above it */
  function phone(cx, cy, w, h, { rot = 0, glow = 1, screen = '#cfe9ff', body = '#2a2f4a', draw = null } = {}) {
    x.save(); x.translate(cx, cy); x.rotate(rot)
    if (glow > 0) {
      const g = x.createRadialGradient(0, -h * 0.2, 0, 0, -h * 0.2, h * 2.2); g.addColorStop(0, `rgba(170,220,255,${0.42 * glow})`); g.addColorStop(1, 'rgba(170,220,255,0)')
      x.fillStyle = g; x.fillRect(-h * 2.2, -h * 2.4, h * 4.4, h * 4.4)
    }
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
    x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = screen; x.fillRect(-w / 2 + 6, -h / 2 + 10, w - 12, h - 22)
    if (draw) draw(-w / 2 + 6, -h / 2 + 10, w - 12, h - 22)
    x.restore()
  }
  return { px, bits, txt, sparkles, bubble, phone }
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
/** a sweat drop beside the head (sprite cells) */
export function sweatCells(ctx, t) {
  const p = (t * 0.9) % 1
  ctx.fillStyle = INK; ctx.fillRect(28.6, 7 + p * 4 - 0.3, 3.2, 4.6); ctx.fillStyle = TEAR; ctx.fillRect(29, 7.4 + p * 4, 2.4, 3.6); ctx.fillStyle = '#fff'; ctx.fillRect(29.3, 7.8 + p * 4, 0.8, 0.8)
}

// ── the format bug: "2 PM / 2 AM" (Inter 800, letter-spaced small caps), top-left, 56 px from the edges
function buildBug(root, at) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none',
    font: `800 28px ${INTER}`, letterSpacing: '0.2em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)' }, root,
    `<span style="color:${SUN}">2 PM</span><span style="color:rgba(255,255,255,0.6)">&nbsp;/&nbsp;</span><span style="color:${NEON};text-shadow:0 0 14px rgba(255,95,200,0.8),0 2px 10px rgba(6,4,18,0.9)">2 AM</span>`)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

const STICK_DEF = [{ x: 770, y: 1112, rot: -0.06 }, { x: 790, y: 1194, rot: 0.05 }, { x: 760, y: 1276, rot: -0.04 }]
const SUN_BM = ['...y..y...', '.y......y.', '...SSSS...', '..SSSSSS..', 'y.SSsSSS.y', '..SSSSSS..', '...SSSS...', '.y......y.', '...y..y...']
const MOON_BM = ['..MMMM..', '.MMMMm..', 'MMMM....', 'MMM.....', 'MMM.....', 'MMMM....', '.MMMMm..', '..MMMM..']

export function makeTAM(cfg) {
  const ME = { id: cfg.sign, ...signStar(cfg.sign), name: cfg.sign.toUpperCase() }
  const L0 = cfg.line
  const sp = L0.who === 'stars' ? { speaker: 'THE STARS', color: GOLD } : { speaker: `${ME.glyph}︎ 2 AM ${ME.name}`, color: cfg.lineColor || PINK }
  const LINES = [{ t: T.line, ...sp, text: L0.text }]
  const ac = { topic: SUN, spiral: NEON, turn: CYAN, last: PINK, ...(cfg.accents || {}) }
  const amClock = cfg.clock?.am ?? (t => t < T.gags[0] ? '2:00 AM' : t < T.gags[1] ? '2:14 AM' : t < T.gags[2] ? '2:31 AM' : '2:47 AM')

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 34px Inter", "italic 800 34px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H = makeHelpers(x)
    const H0 = popText(root, cfg.heads.topic, { top: 160, size: 92, accentSize: 132, at: T.h0, gap: 0.08, accentColor: ac.topic, fit: true })
    const H1 = popText(root, cfg.heads.spiral, { top: 160, size: 92, accentSize: 132, at: T.h1, gap: 0.08, accentColor: ac.spiral, fit: true })
    const H2 = popText(root, cfg.heads.turn, { top: 160, size: 92, accentSize: 132, at: T.h2, gap: 0.08, accentColor: ac.turn, fit: true })
    const H3 = popText(root, cfg.heads.last, { top: 172, size: 112, accentSize: 156, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3 + 0.3, wobble: true, accentColor: ac.last, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
    const box = dialogueBox(root, { lines: LINES, y: 1618, height: 250, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // ── characters
    function star(P, X, Y, s, t, o = {}) {
      const opts = { color: P.color, glyph: s >= 120 ? P.glyph : null, seed: o.seed ?? 3, glow: o.glow ?? 0.9, ...o }
      drawStarChar(x, X, Y, s, t, opts)
      const F = starFrame(X, Y, s, t, opts)
      if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
      if (o.sweat) inSprite(x, F, () => sweatCells(x, t))
      if (o.prop) inSprite(x, F, () => o.prop(F))
      return F
    }
    const PIS = { ...signStar('pisces') }, SKYS = { color: STAR.sky, glyph: null }
    const W = { T, ME, x, ...H, t: 0, wk: 0, dawn: 0, pop01, outK, popOut, BEAT, ease, lerp, prog, clamp, r3, rng,
      me: (X, Y, s, o) => star(ME, X, Y, s, W.t, o),
      star: (id, X, Y, s, o) => star({ ...signStar(id) }, X, Y, s, W.t, o),
      stars: (X, Y, s, o) => star(SKYS, X, Y, s, W.t, { seed: 2, glow: 1.1, ...o }),
      pisces: (X, Y, s, tears = 2, mood = 'happy', o = {}) => star(PIS, X, Y, s, W.t, { seed: 6, mood, tears, ...o }),
      frame: starFrame, inSprite: (F, fn) => inSprite(x, F, fn), tears: k => tearsCells(x, W.t, k) }

    // ── room backdrops (frame coords)
    function pmRoom(t) {
      const { px, bits } = H
      const g = x.createLinearGradient(0, PM.t, 0, PM.b); g.addColorStop(0, '#fff3d9'); g.addColorStop(1, '#ffd7a6'); x.fillStyle = g; x.fillRect(PL, PM.t, PR - PL, PM.b - PM.t)
      // wallpaper stripes
      for (let X = PL + 20; X < PR; X += 64) px(X, PM.t, 18, PM.b - PM.t, 'rgba(255,196,140,0.22)')
      // the big sunny window (right)
      px(640, 516, 340, 300, INK); px(648, 524, 324, 284, '#8fd3ff')
      const sg = x.createLinearGradient(0, 524, 0, 808); sg.addColorStop(0, '#6fc3ff'); sg.addColorStop(1, '#c8ecff'); x.fillStyle = sg; x.fillRect(648, 524, 324, 284)
      bits(SUN_BM, { S: SUN, s: '#fff6c0', y: '#ffe98a' }, 880, 600 + 3 * Math.sin(t * 1.4), 9, { outline: null })
      bits(['..CCC.....', '.CCCCCC.C.', 'CCCCCCCCCC'], { C: '#ffffff' }, 730 + ((t * 14) % 60), 700, 8, { outline: null })
      px(806, 524, 8, 284, INK); px(648, 662, 324, 8, INK)
      // a sunbeam across the room
      x.save(); x.globalAlpha = 0.18 + 0.04 * Math.sin(t * 1.3); x.fillStyle = '#fff6c8'
      x.beginPath(); x.moveTo(648, 524); x.lineTo(972, 524); x.lineTo(560, PM.b); x.lineTo(120, PM.b); x.closePath(); x.fill(); x.restore()
      // floor + a plant
      px(PL, 946, PR - PL, 70, '#e8b884'); px(PL, 946, PR - PL, 6, '#c99460')
      bits(['.l.l.l.', 'llLlLll', '.lLlLl.', '..lLl..', '.PPPPP.', '.PpppP.', '..PPP..'], { l: '#4fae5a', L: '#7ed67f', P: '#d8723a', p: '#f0915a' }, 1000, 916, 10)
    }
    function amRoom(t) {
      const { px, bits } = H
      const d = W.dawn
      const g = x.createLinearGradient(0, PM.t, 0, AM.b)
      g.addColorStop(0, d > 0 ? mix('#141a46', '#ffb98a', d * 0.75) : '#141a46'); g.addColorStop(1, d > 0 ? mix('#0b0e2a', '#6a4a7a', d * 0.6) : '#0b0e2a')
      x.fillStyle = g; x.fillRect(PL, PM.t, PR - PL, AM.b - PM.t)
      // the window (upper left; revealed when the stitch opens) with the moon, or a sunrise
      px(90, 560, 330, 300, INK); const wg = x.createLinearGradient(0, 568, 0, 852)
      wg.addColorStop(0, mix('#0a0d30', '#ffcf8a', d)); wg.addColorStop(1, mix('#1d2a6a', '#ff8f9a', d)); x.fillStyle = wg; x.fillRect(98, 568, 314, 284)
      if (d < 1) bits(MOON_BM, { M: '#fff3d0', m: '#f2dca0' }, 190, 650, 9, { outline: null, alpha: 1 - d })
      if (d > 0) { bits(SUN_BM, { S: SUN, s: '#fff6c0', y: '#ffe98a' }, 300, lerp(880, 730, d), 9, { outline: null, alpha: d }) }
      for (let i = 0; i < 7; i++) { const R = rng(i * 7 + 3); const a = (0.5 + 0.5 * Math.sin(t * 2 + i)) * (1 - d); if (a > 0.1) px(110 + R() * 290, 580 + R() * 250, 6, 6, `rgba(255,246,216,${a})`) }
      px(251, 568, 8, 284, INK); px(98, 706, 314, 8, INK)
      // moonlight beam onto the bed
      x.save(); x.globalAlpha = 0.1 * (1 - d) + 0.16 * d; x.fillStyle = d > 0.5 ? '#ffe2b0' : '#b8c8ff'
      x.beginPath(); x.moveTo(98, 568); x.lineTo(412, 568); x.lineTo(860, AM.b); x.lineTo(300, AM.b); x.closePath(); x.fill(); x.restore()
      // a shelf (upper right) for Pisces and friends
      px(700, 930, 330, 14, INK); px(704, 932, 322, 8, '#3a3f78')
      // neon trim along the ceiling
      const fl = 0.85 + 0.15 * Math.sin(t * 31) * Math.sin(t * 7)
      x.save(); x.shadowColor = NEON; x.shadowBlur = 18; px(PL + 10, 500, PR - PL - 20, 6, `rgba(255,95,200,${0.7 * fl * (1 - d * 0.6)})`); x.restore()
      // the bed: headboard, mattress, pillow
      px(60, 1290, 720, 310, INK); px(68, 1298, 704, 60, '#5a3f8a'); px(68, 1298, 704, 10, '#7a5ab0')
      px(68, 1358, 704, 242, '#2b3170')
      // nightstand + lamp (right)
      px(820, 1390, 190, 210, INK); px(828, 1398, 174, 202, '#4a3f7a'); px(828, 1480, 174, 6, INK)
      const lampOn = cfg.lampOn ? cfg.lampOn(t) : 0.35
      if (lampOn > 0) { const lg = x.createRadialGradient(915, 1290, 0, 915, 1290, 260); lg.addColorStop(0, `rgba(255,200,120,${0.4 * lampOn})`); lg.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = lg; x.fillRect(655, 1030, 520, 520) }
      bits(['.LLLLLL.', 'LLLLLLLL', 'LLLLLLLL', '...ss...', '...ss...', '.bbbbbb.'], { L: lampOn > 0.2 ? '#ffd98a' : '#8a7ab0', s: '#c9cfdc', b: '#2a2050' }, 915, 1340, 11)
    }
    function blanket(t, col = '#4a6ad0', hi = '#6a8af0', y = 1440) {
      const { px } = H
      x.fillStyle = INK; x.beginPath(); x.moveTo(60, y - 14); for (let X = 60; X <= 780; X += 40) x.lineTo(X, y - 14 - 10 * Math.sin(X * 0.02 + t * 1.2)); x.lineTo(780, AM.b); x.lineTo(60, AM.b); x.closePath(); x.fill()
      x.fillStyle = col; x.beginPath(); x.moveTo(68, y - 6); for (let X = 68; X <= 772; X += 40) x.lineTo(X, y - 6 - 10 * Math.sin(X * 0.02 + t * 1.2)); x.lineTo(772, AM.b); x.lineTo(68, AM.b); x.closePath(); x.fill()
      for (let X = 100; X < 760; X += 80) px(X, y + 30, 40, AM.b - y - 30, hi + '55')
    }
    W.pmRoom = pmRoom; W.amRoom = amRoom; W.blanket = blanket

    // ── panel geometry
    function geo(t) {
      const pi = ease.outCubic(prog(t, ...T.PMin)), ai = easeOutBack(prog(t, ...T.AMin), 1.25)
      const o = ease.inOutCubic(prog(t, ...T.open))
      return {
        pm: { dx: (1 - pi) * -1100 - o * 1120, on: t >= T.PMin[0] && o < 1 },
        am: { dy: (1 - ai) * 940, top: lerp(AM.t, PM.t, o), on: t >= T.AMin[0] },
        o,
      }
    }
    function frameRect(l, r, top, bot, rim, P = 8, glow = null) {
      x.save()
      const ring = () => { x.beginPath(); x.moveTo(l + P * 1.5, top + P / 2); x.lineTo(r - P * 1.5, top + P / 2); x.lineTo(r - P / 2, top + P * 1.5); x.lineTo(r - P / 2, bot - P * 1.5); x.lineTo(r - P * 1.5, bot - P / 2)
        x.lineTo(l + P * 1.5, bot - P / 2); x.lineTo(l + P / 2, bot - P * 1.5); x.lineTo(l + P / 2, top + P * 1.5); x.closePath() }
      x.lineJoin = 'miter'; x.strokeStyle = INK; x.lineWidth = P + 10; ring(); x.stroke()
      if (glow) { x.shadowColor = glow; x.shadowBlur = 22 }
      x.strokeStyle = rim; x.lineWidth = P; ring(); x.stroke()
      x.restore()
    }
    function label(cx, y, text, kind, t) {
      const { px, bits, txt } = H
      if (kind === 'pm') {
        const lw = 230, lh = 58, lx = cx - lw / 2, ly = y - lh / 2
        px(lx + 6, ly - 4, lw - 12, lh + 8, INK); px(lx - 4, ly + 6, lw + 8, lh - 12, INK)
        px(lx + 6, ly, lw - 12, lh, SUN); px(lx, ly + 6, lw, lh - 12, SUN); px(lx + 10, ly + 4, lw - 20, 6, '#fff1c8')
        bits(['...y...', '.y.y.y.', '..SSS..', 'ySSsSSy', '..SSS..', '.y.y.y.', '...y...'], { S: '#ff9a3a', s: '#fff1c8', y: '#ff9a3a' }, lx + 44, y + 1, 5, { outline: null })
        txt(text, cx + 22, y + 2, { size: 30, font: INTER, weight: 800, color: INK, shadow: false, spacing: 3 })
      } else {
        const lw = 230, lh = 58, lx = cx - lw / 2, ly = y - lh / 2
        const fl = (t * 7) % 1 < 0.94 ? 1 : 0.55
        px(lx + 6, ly - 4, lw - 12, lh + 8, INK); px(lx - 4, ly + 6, lw + 8, lh - 12, INK)
        px(lx + 6, ly, lw - 12, lh, '#1a1240'); px(lx, ly + 6, lw, lh - 12, '#1a1240')
        x.save(); x.shadowColor = NEON; x.shadowBlur = 16 * fl; x.strokeStyle = NEON; x.lineWidth = 4; x.strokeRect(lx + 4, ly + 4, lw - 8, lh - 8); x.restore()
        bits(MOON_BM, { M: CYAN, m: CYAN }, lx + 44, y, 4, { outline: null })
        x.save(); x.shadowColor = NEON; x.shadowBlur = 14 * fl; txt(text, cx + 22, y + 2, { size: 30, font: INTER, weight: 800, color: '#ffd6f2', shadow: false, spacing: 3, alpha: 0.85 + 0.15 * fl }); x.restore()
      }
    }
    function clockChip(X, Y, s, kind, t) {
      const { px, txt } = H
      x.save(); x.font = `700 26px ${MONO}`; x.letterSpacing = '2px'; const w = x.measureText(s).width + 64; x.restore()
      px(X - 4, Y - 4, w + 8, 52, INK); px(X, Y, w, 44, kind === 'pm' ? 'rgba(255,250,240,0.92)' : 'rgba(16,10,40,0.92)')
      if (kind === 'am' && (t * 1.6) % 1 < 0.6) px(X + 16, Y + 14, 16, 16, '#ff5a5a')
      if (kind === 'pm') px(X + 16, Y + 14, 16, 16, '#ff9a3a')
      txt(s, X + 44, Y + 23, { size: 26, align: 'left', color: kind === 'pm' ? INK : BONE, shadow: kind !== 'pm', spacing: 2 })
    }

    function drawPM(t, g, k) {
      if (!g.pm.on || k <= 0.01) return
      x.save(); x.translate(g.pm.dx, 0)
      x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(PL + 14, PM.t + 18, PR - PL, PM.b - PM.t)
      x.save(); x.beginPath(); x.rect(PL, PM.t, PR - PL, PM.b - PM.t); x.clip()
      pmRoom(t); cfg.pmScene(x, t, W)
      // the 2 PM self watching the spiral below: dims a touch
      const dim = 0.25 * ease.inOutQuad(prog(t, T.AMin[1], T.AMin[1] + 0.5))
      if (dim > 0) { x.fillStyle = `rgba(40,30,70,${dim})`; x.fillRect(PL, PM.t, PR - PL, PM.b - PM.t) }
      x.restore()
      frameRect(PL, PR, PM.t, PM.b, '#fff6e0')
      clockChip(PL + 26, PM.b - 70, cfg.clock?.pm ?? '2:00 PM', 'pm', t)
      label(540, PM.t - 2, '2 PM', 'pm', t)
      x.restore()
    }
    function drawAM(t, g, k) {
      if (!g.am.on || k <= 0.01) return
      x.save(); x.translate(0, g.am.dy)
      const top = g.am.top
      x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(PL + 14, top + 18, PR - PL, AM.b - top)
      x.save(); x.beginPath(); x.rect(PL, top, PR - PL, AM.b - top); x.clip()
      amRoom(t); cfg.amScene(x, t, W)
      // a faint scanline wash (synthwave night)
      x.fillStyle = 'rgba(120,60,200,0.06)'; for (let Y = top; Y < AM.b; Y += 8) x.fillRect(PL, Y, PR - PL, 3)
      x.restore()
      frameRect(PL, PR, top, AM.b, NEON, 8, NEON)
      const ck = typeof amClock === 'function' ? amClock(t) : amClock
      clockChip(PL + 26, AM.b - 70, ck, 'am', t)
      label(540, top - 2, cfg.amLabel ? cfg.amLabel(t) : '2 AM', 'am', t)
      x.restore()
    }

    // ── caption stickers (screen space, over the 2 AM panel)
    function sticker(t, i, g) {
      const S = { ...STICK_DEF[i], ...(cfg.stickers[i] || {}) }
      const t0 = T.gags[i], k = pop01(t, t0, 0.3, 2.6) * outK(t, [T.hush[0] - 0.05, T.hush[0] + 0.15])
      if (k <= 0.01 || !S.text) return
      x.save(); x.translate(S.x, S.y + g.am.dy); x.rotate(S.rot); x.scale(k, k)
      x.font = `800 32px ${INTER}`; x.letterSpacing = '1px'
      const w = x.measureText(S.text).width + 40, h = 56
      x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(-w / 2 + 6, -h / 2 + 7, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
      x.fillStyle = S.bg || '#fffaf0'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = S.color || INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.text, 0, 2)
      x.restore()
    }

    // ── the neon sign (the last-line signature): flickers on, then hums
    function neon(t) {
      if (t < T.neon - 0.05 || !cfg.neon) return
      const k = popOut(t, T.out)
      if (k <= 0.01) return
      const dt = t - T.neon
      const fl = dt < 0 ? 0 : dt < 0.08 ? 1 : dt < 0.16 ? 0.15 : dt < 0.24 ? 1 : dt < 0.3 ? 0.3 : 0.92 + 0.08 * Math.sin(t * 40) * Math.sin(t * 9)
      const cy = cfg.neonAt?.y ?? 1030, cx = cfg.neonAt?.x ?? 540
      x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
      x.font = `italic 800 70px ${INTER}`; x.letterSpacing = '3px'
      const w = x.measureText(cfg.neon).width + 70, h = 116
      // backing board + mounting
      x.fillStyle = 'rgba(10,6,28,0.82)'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 + 20, -h / 2 - 40, 4, 40); x.fillRect(w / 2 - 24, -h / 2 - 40, 4, 40)
      x.globalAlpha = 0.25 + 0.75 * fl
      x.shadowColor = cfg.neonColor || NEON; x.shadowBlur = 30 * fl
      x.strokeStyle = cfg.neonColor || NEON; x.lineWidth = 5; x.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = cfg.neonColor || NEON; x.fillText(cfg.neon, 0, 4)
      x.shadowBlur = 8 * fl; x.fillStyle = '#fff0fb'; x.fillText(cfg.neon, 0, 4)
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        W.t = t
        const g = geo(t), k = popOut(t, T.out)
        W.wk = g.o; W.dawn = cfg.dawnAt ? ease.inOutQuad(prog(t, cfg.dawnAt, cfg.dawnAt + 1.4)) : 0
        drawSky(x, t, SKY_H)
        // the drop: a quick flash + shake
        const dd = t - T.AMin[1], shake = dd > 0 && dd < 0.4 ? 10 * Math.exp(-dd * 10) * Math.sin(dd * 55) : 0
        const dn = t - T.neon, shake2 = dn > 0.24 && dn < 0.6 ? 6 * Math.exp(-(dn - 0.24) * 10) * Math.sin(dn * 55) : 0
        x.save(); x.translate(0, shake + shake2)
        if (t < T.out[1] + 0.02) {
          x.save(); const sc = k; x.translate(540, 1028); x.scale(sc, sc); x.translate(-540, -1028)
          drawPM(t, g, k)
          drawAM(t, g, k)
          if (g.am.on) for (let i = 0; i < 3; i++) sticker(t, i, g)
          if (cfg.overlay) cfg.overlay(x, t, W)
          neon(t)
          x.restore()
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

  // one card cut, at the turn (between the soft resolution starting and the stitch opening)
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // the bright afternoon slides in
    ...wordPops(T.h0, 5, 0.08, 0), ['pop', r3(T.bug + 0.06), 880, 0.03, -0.4],
    ['whoosh', T.PMin[0], 0.45, 0.04], ['bell', r3(T.PMin[1]), 1760, 0.02, 1.4, -0.3], ['pop', r3(T.pmIn + 0.05), 987.77, 0.035, -0.2],
    ['pop', T.pmSay, 1174.66, 0.04, -0.2], ['pop', r3(T.pmSay + 0.07), 1567.98, 0.025, -0.2],
    // the 2 AM panel slams in (a tape-stop, a thud, a neon buzz)
    ['tapeStop', r3(T.AMin[0] - 0.06), 0.32], ['whoosh', T.AMin[0], 0.3, 0.05], ['tick', T.AMin[1], 0.08], ['tom', T.AMin[1], 96, { gain: 0.22, decay: 0.28 }],
    ...wordPops(T.h1, 4, 0.08, 2),
    ['pluck', T.amSay, 659.25, 0.03, 0.5, 0.2],
    // the three stickers slap on (and the clock ticks)
    ...T.gags.flatMap((g, i) => [['tick', g, 0.07], ['pop', g, NOTE[[1, 3, 5][i]], 0.045, 0.3], ['pop', r3(g + 0.05), NOTE[[3, 5, 6][i]] * 1.5, 0.025, 0.3], ['tick', r3(g + 0.18), 0.03]]),
    // the turn
    ['bell', r3(T.turn + 0.02), 1318.51, 0.03, 1.2, 0], ['glitter', T.turn, r3(T.turn + 0.4)],
    // the stitch opens + turn headline + line
    ['whoosh', T.open[0], 0.5, 0.045], ['glitter', r3(T.open[1] - 0.1), r3(T.open[1] + 0.4)],
    ...wordPops(T.h2, 5, 0.08, 1),
    ...talkCues(LINES, { cps: CPS }),
    // the last line + the neon sign flickers on
    ...wordPops(T.h3, 2, 0.1, 0, 0.026), ['pop', r3(T.h3 + 0.3), 1174.66, 0.045, 0], ['pop', r3(T.h3 + 0.4), 1567.98, 0.035, 0],
    ['tick', r3(T.neon), 0.05], ['tick', r3(T.neon + 0.16), 0.04], ['tick', r3(T.neon + 0.24), 0.05],
    ['boom', r3(T.neon + 0.24), 0.22], ['bell', r3(T.neon + 0.3), 1760, 0.03, 1.2, 0], ['glitter', r3(T.neon + 0.26), r3(T.neon + 0.7)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const MUSIC = { drop: T.drop, breakdown: [T.hush[0]], lift: [T.open[0]], outroAt: DURATION - ENDCARD_LEN }
  return { DURATION, T, SCENES, CUES, CUTS, MUSIC, LINES, ME, talkHops: s => talkHops(LINES, s, { cps: CPS }) }
}

// colour mix (hex, hex, 0…1) → rgb()
function mix(a, b, k) {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
  const A = p(a), B = p(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k))).join(',')})`
}
