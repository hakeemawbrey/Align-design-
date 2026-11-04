// MEET THE FAMILY: the shared look of the star_advice series "Season 16: Meet the Family" (promo/films/next30/b21.md).
// Lives in nf16e01; every other episode imports it from here ('../../nf16e01/scenes/familykit.js'). Read-only for them.
//
// The format (30–45 s, story 0 … D − 4.4, then the shared end card):
//   hook      a bone "DEAR STARS," question sticker (the question in Inter 800 + one *italic* accent, signed "— a Libra…")
//             is already on screen at t = 0, with the asking sign star mid-hop below it (frame 0 is the thumbnail).
//   beats     2–4 situation beats on a holiday set (the front door in the snow, the dining table, the living room, the
//             car), each with an Inter 800 headline; THE STARS answer in the dialogue box.
//   lesson    40–45 s episodes land a ★ LESSON UNLOCKED (lesson.js) with a film-specific chip.
//   tie-in    optional and light: a real talk card (assets/card-talk-*.png) or tonight's deck lands in the last beat.
//   last      THE STARS say the last line. Never "Align" in the last 2 s.
// Pisces cries in every episode (the kit draws Pisces in every beat that asks for it, with a tissue box).
//
//   makeFamily(cfg) → { DURATION, SCENES, CUES }
//     cfg.D            duration (s, includes the 4.4 s end card)
//     cfg.asker        sign id of the sign who asks;  cfg.partner  sign id of their partner (optional)
//     cfg.q            { text, sign: '— a Libra, two weeks out', accent, out: [a, b] }   the question sticker
//     cfg.hook(x,t,S)  draws the cold-open set + the asker mid-action (until cfg.beats[0].t0)
//     cfg.beats        [{ t0, t1, head, accent, size, draw(x, t, S), stars: {x,y,s,mood} | null, pis: {x,y,s,tears,mood,look,noTissues} | null }]
//     cfg.boxes        [{ open, close, lines: [{ t, speaker, text, color }] }]   (speaker: K.STARS, K.tag('libra'), or any)
//     cfg.lesson       { at, out, text, chip, accentColor } (optional)
//     cfg.tie          { img: 'card-talk-5.png', at, out: [a, b], x, y, w, rot } (optional, drawn above the set)
//     cfg.cuts         card-cut candidates (cardfx keeps the middle one)
//     cfg.cues         the film's own sound cues (absolute times)
//   S (handed to hook / beat draws) = { u (t − t0), t0, t1, k (pop-in), asker(x,t,o), partner(x,t,o), rel(x,t,o), A, P }
// Pure f(t): DOM and canvases are made only inside build(); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const MINT = '#9fe6b0', SKYB = '#7fd0ff', WARM = '#ffcf8a', PINE = '#2f8a5c', BERRY = '#c2334f', WOOD = '#7b5634'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb36b'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d, 2) * outK(t, [b - 0.2, b])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

const CPS = 30
export const K = {
  STARS: 'THE STARS',
  tag: id => { const s = signStar(id); return `${s.glyph}︎ ${id.toUpperCase()}` },
  name: id => id[0].toUpperCase() + id.slice(1),
}

// ═══════════════════════════════════════════════ drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
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
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export const QMARK = ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '.....', '..Q..']
export const EXCL = ['E', 'E', 'E', 'E', '.', 'E']
export const SWEAT = ['.S.', 'SSS', 'SWS', '.S.']
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
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
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, down = true } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0 || t > t1) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40), sy = down ? 1 : -1
  x.fillStyle = INK; x.fillRect(tx - 14, sy * (h / 2 + 4) - (down ? 0 : 12), 14, 12); x.fillRect(tx - 7, sy * (h / 2 + 14) - (down ? 0 : 8), 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, down ? h / 2 : -h / 2 - 9, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** pixel label text on canvas, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** plain ink text on a prop (no shadow) */
export function ink(x, text, cx, cy, { size = 26, col = INK, align = 'center', font = MONO, weight = 700, rot = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glow(x, cx, cy, r, a, col = '255,214,150') {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
}
/** gentle pixel snowfall over a rect, pure f(t) */
export function snow(x, t, { n = 60, x0 = 0, x1 = 1080, y0 = 0, y1 = 1920, speed = 70, alpha = 0.8, seed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const h = Math.sin(i * 91.7 + seed * 13.1) * 43758.5453, fr = h - Math.floor(h)
    const sp = speed * (0.6 + fr * 0.8), H = y1 - y0
    const py = y0 + (((fr * H + t * sp) % H) + H) % H
    const px = x0 + ((i * 137.5 + seed * 59) % (x1 - x0)) + Math.sin(t * 1.3 + i) * 14
    const s = fr > 0.7 ? 8 : 5
    x.fillStyle = '#fffaf0'; x.fillRect(Math.round(px), Math.round(py), s, s)
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
// accessories in sprite cells (the 36-cell star: centre 18,19.6 · eyes ≈ 13.4 / 22.6, 17–20 · top tip ≈ 2)
export const ACC = {
  beanie(ctx, col = BERRY) {
    ctx.fillStyle = INK; ctx.fillRect(12.2, 1.4, 11.6, 6.2); ctx.fillRect(16.2, -1.8, 3.6, 3.6)
    ctx.fillStyle = col; ctx.fillRect(13, 2.2, 10, 4.6)
    ctx.fillStyle = BONE; ctx.fillRect(12.8, 5.4, 10.4, 1.8); ctx.fillRect(16.8, -1.2, 2.4, 2.4)
  },
  scarf(ctx, col = BERRY) {
    ctx.fillStyle = INK; ctx.fillRect(9.4, 24.4, 17.2, 3.6); ctx.fillRect(21.4, 26, 3.8, 7.6)
    ctx.fillStyle = col; ctx.fillRect(10, 25, 16, 2.4); ctx.fillRect(22, 26.6, 2.6, 6.4)
    ctx.fillStyle = BONE; for (let i = 0; i < 4; i++) ctx.fillRect(11 + i * 4, 25.6, 1.2, 1.2)
  },
  glasses(ctx, col = INK) {
    for (const ex of [13.4, 22.6]) { ctx.fillStyle = col; ctx.fillRect(ex - 3.4, 15.6, 6.8, 0.9); ctx.fillRect(ex - 3.4, 20.6, 6.8, 0.9); ctx.fillRect(ex - 3.4, 15.6, 0.9, 5.9); ctx.fillRect(ex + 2.5, 15.6, 0.9, 5.9) }
    ctx.fillStyle = col; ctx.fillRect(16.5, 16.6, 2.6, 0.9)
  },
  bow(ctx, col = RED) {
    ctx.fillStyle = INK; ctx.fillRect(19.6, 3.4, 9, 5.2)
    ctx.fillStyle = col; ctx.fillRect(20.2, 4, 3.4, 4); ctx.fillRect(24.6, 4, 3.4, 4)
    ctx.fillStyle = BONE; ctx.fillRect(23.4, 5, 1.4, 2)
  },
  apron(ctx, col = '#f7f0e2') {
    ctx.fillStyle = INK; ctx.fillRect(12.2, 22.4, 11.6, 11)
    ctx.fillStyle = col; ctx.fillRect(13, 23.2, 10, 9.4)
    ctx.fillStyle = BERRY; ctx.fillRect(13, 23.2, 10, 1.2); ctx.fillRect(15.6, 27, 4.8, 2.6)
  },
  tie(ctx, col = SKYB) {
    ctx.fillStyle = INK; ctx.fillRect(16.4, 23, 3.2, 9); ctx.fillStyle = col; ctx.fillRect(17, 23.6, 2, 7.8)
  },
}
/** draw an accessory list on a star sprite: acc = ['beanie', ['scarf', '#3fb08a'], 'glasses'] */
export function wear(x, F, acc) {
  if (!acc || !acc.length) return
  inSprite(x, F, () => { for (const a of acc) { const [n, c] = Array.isArray(a) ? a : [a]; ACC[n] && ACC[n](x, c) } })
}

// ═══════════════════════════════════════════════ the sets
/** the house at night: a front door with a wreath, warm windows, snow on the step. open 0…1 swings the door in. */
export function frontDoor(x, t, { cx = 540, floor = 1240, s = 1, open = 0, lit = 1 } = {}) {
  x.save(); x.translate(cx, floor); x.scale(s, s)
  // wall (siding) + trim
  R(x, INK, -470, -760, 940, 770); R(x, '#3b2f5e', -462, -752, 924, 752)
  for (let i = 0; i < 18; i++) R(x, 'rgba(10,6,30,0.25)', -462, -752 + i * 42, 924, 5)
  // windows either side, warm
  for (const wx of [-330, 330]) {
    box(x, wx - 90, -600, 180, 210, '#ffd890', { b: 8 })
    glow(x, wx, -495, 220, 0.25 * lit)
    R(x, INK, wx - 4, -600, 8, 210); R(x, INK, wx - 90, -500, 180, 8)
    R(x, '#e8b55a', wx - 90, -600, 180, 18)
    // a garland on the sill
    for (let i = 0; i < 6; i++) { R(x, PINE, wx - 100 + i * 34, -390, 30, 18); R(x, i % 2 ? RED : GOLD, wx - 88 + i * 34, -394, 8, 8) }
  }
  // the door frame + door
  box(x, -150, -560, 300, 560, '#5a3a24', { b: 10 })
  const spill = open
  if (spill > 0) { R(x, '#ffe1a6', -140, -550, 280, 550); glow(x, 0, -280, 420, 0.4 * spill) }
  const dw = 280 * (1 - 0.82 * ease.inOutCubic(open))
  x.save(); x.translate(-140, -550)
  box(x, 0, 0, dw, 550, '#8c2f3c', { b: 6, hi: '#a8414f' })
  if (dw > 120) {
    R(x, '#6e2230', dw * 0.12, 60, dw * 0.76, 170); R(x, '#6e2230', dw * 0.12, 290, dw * 0.76, 200)
    // knob
    box(x, dw - 46, 300, 18, 18, GOLD, { b: 4 })
    // wreath
    const wcx = dw / 2, wcy = 150
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; R(x, INK, wcx + Math.cos(a) * 58 - 16, wcy + Math.sin(a) * 58 - 16, 32, 32) }
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; R(x, i % 2 ? PINE : '#3fa56e', wcx + Math.cos(a) * 58 - 12, wcy + Math.sin(a) * 58 - 12, 24, 24) }
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + 0.4; R(x, RED, wcx + Math.cos(a) * 58 - 5, wcy + Math.sin(a) * 58 - 5, 10, 10) }
    drawBits(x, ['RR.RR', '.RRR.', '..R..'], { R: RED }, wcx, wcy + 62, 7)
  }
  x.restore()
  // porch light
  box(x, 190, -520, 40, 56, '#ffe9a8', { b: 5 }); glow(x, 210, -490, 160, 0.35 * lit, '255,236,170')
  // step + snow
  box(x, -230, 0, 460, 40, '#8d86a8', { b: 6 }); R(x, '#fffaf0', -230, -6, 460, 12)
  R(x, INK, -470, 40, 940, 10); R(x, '#eef3ff', -470, 46, 940, 120)
  // doormat
  box(x, -120, 10, 240, 22, '#b0703c', { b: 4 })
  x.restore()
}
/** a small house facade (two families' homes), lit windows, snowy roof */
export function house(x, cx, floor, s, { body = '#3b2f5e', door = '#8c2f3c', lit = 1, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, floor); x.scale(s, s)
  // roof
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, -300); x.lineTo(0, -470); x.lineTo(200, -300); x.closePath(); x.fill()
  x.fillStyle = '#5a3a4c'; x.beginPath(); x.moveTo(-180, -306); x.lineTo(0, -456); x.lineTo(180, -306); x.closePath(); x.fill()
  x.fillStyle = '#fffaf0'; x.beginPath(); x.moveTo(-60, -420); x.lineTo(0, -456); x.lineTo(60, -420); x.lineTo(0, -430); x.closePath(); x.fill()
  box(x, -170, -300, 340, 300, body, { b: 7 })
  box(x, -130, -250, 90, 90, '#ffd890', { b: 6 }); box(x, 40, -250, 90, 90, '#ffd890', { b: 6 })
  glow(x, 0, -200, 220, 0.25 * lit)
  box(x, -40, -140, 80, 140, door, { b: 6 })
  R(x, '#fffaf0', -200, -6, 400, 12)
  x.restore()
}
/** the dining room: warm wall, a snowy window with string lights, the long table with food. */
export function diningRoom(x, t, { top = 420, floor = 1300, window: win = true, lights = true } = {}) {
  R(x, INK, 0, top - 8, 1080, floor - top + 8); R(x, '#5b3140', 0, top, 1080, floor - top)
  for (let i = 0; i < 14; i++) R(x, 'rgba(255,220,180,0.06)', i * 80, top, 34, floor - top)
  R(x, '#3a1f2c', 0, floor - 120, 1080, 120); R(x, INK, 0, floor - 124, 1080, 6)
  if (win) {
    box(x, 340, top + 70, 400, 300, '#1c2a5c', { b: 10 })
    for (let i = 0; i < 26; i++) { const h = Math.sin(i * 77.1) * 999, fr = h - Math.floor(h); R(x, '#fffaf0', 350 + ((i * 53) % 380), top + 80 + (((fr * 290) + t * 40 * (0.6 + fr)) % 290), 6, 6) }
    R(x, INK, 536, top + 70, 8, 300); R(x, INK, 340, top + 214, 400, 8)
    R(x, '#fffaf0', 340, top + 340, 400, 30)
  }
  if (lights) {
    for (let i = 0; i < 22; i++) {
      const lx = 30 + i * 48, ly = top + 30 + 18 * Math.sin(i * 0.9) ** 2
      const on = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7)
      R(x, INK, lx - 2, ly - 12, 4, 12)
      box(x, lx - 7, ly, 14, 18, [GOLD, RED, MINT, SKYB, PINK][i % 5], { b: 3 })
      glow(x, lx, ly + 9, 34, 0.25 * on, '255,230,170')
    }
  }
}
/** the table: a long tablecloth, plates, a pie, bowls, a teapot, candles. dishes = subset of names */
export function table(x, t, { y = 1180, x0 = 60, x1 = 1020, cloth = '#f3e7d3', dishes = ['plates', 'pie', 'bowl', 'teapot', 'candles'], frost = 0 } = {}) {
  const w = x1 - x0
  // legs
  R(x, INK, x0 + 30, y + 40, 26, 170); R(x, INK, x1 - 56, y + 40, 26, 170)
  box(x, x0, y, w, 46, cloth, { b: 7, lo: '#d9c8ad' })
  R(x, '#c94a5a', x0, y + 34, w, 8)
  if (dishes.includes('plates')) for (let i = 0; i < 5; i++) { const px = x0 + 70 + i * (w - 140) / 4; box(x, px - 46, y - 14, 92, 14, '#ffffff', { b: 4 }); R(x, '#e4dcc8', px - 30, y - 12, 60, 6) }
  if (dishes.includes('pie')) { const px = x0 + w * 0.5; box(x, px - 70, y - 46, 140, 34, '#e3a05a', { b: 5, hi: '#f2c27e' }); for (let i = 0; i < 4; i++) R(x, '#b56a2a', px - 56 + i * 34, y - 40, 18, 6) }
  if (dishes.includes('bowl')) { const px = x0 + w * 0.26; box(x, px - 56, y - 50, 112, 38, '#7fb5e0', { b: 5 }); R(x, '#9fe6b0', px - 44, y - 50, 88, 10); for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.5)', px - 30 + i * 22, y - 80 - 10 * Math.sin(t * 3 + i), 6, 18) }
  if (dishes.includes('teapot')) { const px = x0 + w * 0.76; box(x, px - 40, y - 76, 80, 62, '#c9a6ff', { b: 5, hi: '#e0c8ff' }); box(x, px + 40, y - 62, 26, 12, '#c9a6ff', { b: 4 }); box(x, px - 10, y - 92, 20, 14, '#c9a6ff', { b: 4 }) }
  if (dishes.includes('candles')) for (const px of [x0 + w * 0.38, x0 + w * 0.62]) {
    box(x, px - 9, y - 96, 18, 82, BONE, { b: 4 })
    const fl = 1 + 0.15 * Math.sin(t * 13 + px)
    R(x, GOLD, px - 6, y - 118 * fl + 6, 12, 18 * fl); R(x, '#fff1c8', px - 3, y - 108, 6, 8)
    glow(x, px, y - 110, 70, 0.3)
  }
  if (frost > 0) {   // a frosty silence: ice creeps over the cloth edge
    x.save(); x.globalAlpha = clamp(frost)
    for (let i = 0; i < 24; i++) { const fx = x0 + i * w / 24, fh = 10 + 18 * ((i * 7) % 5) / 4; R(x, '#cfefff', fx, y - 6, w / 24 - 4, 10); R(x, '#eaf8ff', fx + 6, y + 40, 10, fh * frost) }
    x.restore()
  }
}
/** the living room: a warm wall, a tall pixel pine with lights, a couch */
export function livingRoom(x, t, { top = 420, floor = 1300, tree = true, couch: c = true, couchX = 540, couchW = 620 } = {}) {
  R(x, INK, 0, top - 8, 1080, floor - top + 8); R(x, '#2f3b5e', 0, top, 1080, floor - top)
  for (let i = 0; i < 10; i++) R(x, 'rgba(200,220,255,0.05)', 0, top + i * 90, 1080, 40)
  R(x, '#5a3a24', 0, floor - 40, 1080, 40); R(x, INK, 0, floor - 44, 1080, 6)
  if (tree) pine(x, t, 930, floor - 40, 1)
  if (c) couch(x, couchX, floor - 40, couchW)
}
export function pine(x, t, cx, floor, s = 1) {
  x.save(); x.translate(cx, floor); x.scale(s, s)
  box(x, -18, -60, 36, 60, WOOD, { b: 5 })
  const tiers = [[-60, 150], [-180, 120], [-290, 90], [-390, 60]]
  for (const [y, w] of tiers) { x.fillStyle = INK; x.beginPath(); x.moveTo(-w - 8, y + 6); x.lineTo(0, y - 150); x.lineTo(w + 8, y + 6); x.closePath(); x.fill(); x.fillStyle = PINE; x.beginPath(); x.moveTo(-w, y); x.lineTo(0, y - 140); x.lineTo(w, y); x.closePath(); x.fill() }
  for (let i = 0; i < 14; i++) { const ly = -80 - i * 26, lx = Math.sin(i * 2.4) * (130 - i * 8); const on = 0.5 + 0.5 * Math.sin(t * 4 + i); R(x, [GOLD, RED, SKYB, PINK][i % 4], lx - 6, ly - 6, 12, 12); glow(x, lx, ly, 30, 0.3 * on, '255,230,170') }
  drawBits(x, ['..G..', 'GGGGG', '.GGG.', 'G...G'], { G: GOLD }, 0, -540, 9)
  x.restore()
}
export function couch(x, cx, floor, w = 620, col = '#8a5a9e') {
  box(x, cx - w / 2, floor - 260, w, 130, col, { b: 7, hi: '#a777ba' })
  box(x, cx - w / 2 - 50, floor - 200, 70, 150, col, { b: 7 }); box(x, cx + w / 2 - 20, floor - 200, 70, 150, col, { b: 7 })
  box(x, cx - w / 2 + 20, floor - 140, w - 40, 90, '#9d6cb2', { b: 7, hi: '#b689c8' })
  R(x, INK, cx - w / 2 - 30, floor - 50, 20, 50); R(x, INK, cx + w / 2 + 10, floor - 50, 20, 50)
}
/** the car at night (two front seats, a dashboard glow, snow on the windshield) */
export function carInside(x, t, { top = 420, floor = 1300 } = {}) {
  R(x, INK, 0, top - 8, 1080, floor - top + 8); R(x, '#141a3a', 0, top, 1080, floor - top)
  snow(x, t, { n: 40, x0: 60, x1: 1020, y0: top + 20, y1: top + 420, speed: 160, seed: 4 })
  R(x, INK, 0, top + 420, 1080, 16); R(x, '#2a2148', 0, top + 436, 1080, floor - top - 436)
  box(x, 80, top + 440, 920, 70, '#3a3060', { b: 7 }); glow(x, 540, top + 470, 300, 0.2, '127,208,255')
}
/** a phone with a simple message thread. msgs: [{ at, side: 'L'|'R', text }] */
export function phone(x, t, { cx = 540, top = 520, w = 520, h = 760, title = '', msgs = [], typing = null, alpha = 1, rot = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, top + h / 2); x.rotate(rot); x.translate(-cx, -(top + h / 2))
  box(x, cx - w / 2, top, w, h, '#2a2148', { b: 8 }); R(x, '#120e26', cx - w / 2 + 16, top + 16, w - 32, h - 32)
  R(x, '#221a44', cx - w / 2 + 16, top + 16, w - 32, 70)
  ink(x, title, cx, top + 52, { size: 26, col: BONE })
  const shown = msgs.filter(m => t >= m.at)
  let y = top + h - 50 - (typing && t > typing[0] && t < typing[1] ? 70 : 0)
  const fs = 28
  x.font = `700 ${fs}px ${INTER}`
  const wrap = (s, maxW) => { const out = []; let cur = ''; for (const wd of s.split(' ')) { const nx = cur ? cur + ' ' + wd : wd; if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = wd } else cur = nx } if (cur) out.push(cur); return out }
  for (let i = shown.length - 1; i >= 0; i--) {
    const m = shown[i], L = wrap(m.text, w - 170), bh = L.length * 36 + 24
    y -= bh
    if (y < top + 96) break
    const bw = Math.max(...L.map(s => x.measureText(s).width)) + 36
    const k = pop01(t, m.at, 0.22, 2.2)
    const bx = m.side === 'L' ? cx - w / 2 + 36 : cx + w / 2 - 36 - bw
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + bh / 2))
    box(x, bx, y, bw, bh, m.side === 'L' ? '#3b3170' : (m.col || '#ff8fb1'), { b: 4 })
    x.font = `700 ${fs}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = m.side === 'L' ? BONE : INK
    L.forEach((s, j) => x.fillText(s, bx + 18, y + 30 + j * 36))
    x.restore()
    y -= 14
  }
  if (typing && t > typing[0] && t < typing[1]) {
    const by = top + h - 110
    box(x, cx - w / 2 + 36, by, 110, 52, '#3b3170', { b: 4 })
    for (let i = 0; i < 3; i++) R(x, BONE, cx - w / 2 + 58 + i * 26, by + 20 - 6 * Math.abs(Math.sin(t * 8 + i)), 12, 12)
  }
  x.restore()
}
/** a wall calendar page, days[] = filled cells (0-based in a 7×5 grid) with colour */
export function calendar(x, cx, cy, { w = 420, h = 380, title = 'DECEMBER', fills = [], rot = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, BONE, { b: 7 }); R(x, BERRY, -w / 2, -h / 2, w, 64)
  ink(x, title, 0, -h / 2 + 33, { size: 30, col: BONE })
  for (const rx of [-w / 4, w / 4]) { R(x, INK, rx - 6, -h / 2 - 22, 12, 34) }
  const cw = (w - 30) / 7, ch = (h - 90) / 5
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) {
    const X = -w / 2 + 15 + i * cw, Y = -h / 2 + 76 + j * ch, f = fills.find(q => q.i === j * 7 + i)
    R(x, 'rgba(27,18,54,0.14)', X + 2, Y + 2, cw - 4, ch - 4)
    if (f) { const k = clamp(f.k ?? 1); R(x, f.col || PINK, X + 2 + (cw - 4) * (1 - k) / 2, Y + 2 + (ch - 4) * (1 - k) / 2, (cw - 4) * k, (ch - 4) * k); if (f.mark && k > 0.6) ink(x, f.mark, X + cw / 2, Y + ch / 2, { size: 20 }) }
  }
  x.restore()
}
/** a wrapped gift box */
export function gift(x, cx, cy, s = 1, { col = BERRY, rib = GOLD, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -60, -40, 120, 90, col, { b: 6, hi: 'rgba(255,255,255,0.18)' }); box(x, -70, -62, 140, 28, col, { b: 6 })
  R(x, rib, -9, -62, 18, 112)
  drawBits(x, ['RR.RR', 'RRRRR', '..R..'], { R: rib }, 0, -76, 7)
  x.restore()
}
/** an envelope / invitation card with a short line of text */
export function invite(x, cx, cy, { w = 360, h = 230, text = '', text2 = '', rot = 0, col = BONE, k = 1, alpha = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, col, { b: 7 })
  R(x, BERRY, -w / 2, -h / 2, w, 14); R(x, BERRY, -w / 2, h / 2 - 14, w, 14)
  drawBits(x, HEART, { H: BERRY }, 0, -h / 2 + 46, 5)
  if (text) ink(x, text, 0, text2 ? 14 : 24, { size: 34, font: INTER, weight: 800 })
  if (text2) ink(x, text2, 0, 60, { size: 24 })
  x.restore()
}
/** a pixel clock face; hh:mm drives the hands */
export function clock(x, cx, cy, r, hh, mm, { face = BONE } = {}) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = face; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.sin(a) * r * 0.82 - 4, -Math.cos(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, L, w) => { x.save(); x.rotate(a); R(x, INK, -w / 2, -L, w, L); x.restore() }
  hand(((hh % 12) + mm / 60) / 12 * Math.PI * 2, r * 0.5, 10); hand(mm / 60 * Math.PI * 2, r * 0.78, 7)
  R(x, RED, -6, -6, 12, 12)
  x.restore()
}
/** a stack of index cards with handwriting (cue cards / flash cards) */
export function cueCard(x, cx, cy, { w = 300, h = 180, text = '', size = 30, rot = 0, k = 1, col = '#fffbea' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  for (let i = 0; i < 4; i++) R(x, 'rgba(127,176,255,0.45)', -w / 2 + 10, -h / 2 + 40 + i * 34, w - 20, 3)
  R(x, 'rgba(232,52,78,0.5)', -w / 2 + 30, -h / 2 + 6, 3, h - 12)
  const L = String(text).split('|')
  L.forEach((s, j) => ink(x, s.trim(), 8, (j - (L.length - 1) / 2) * (size + 8), { size, font: INTER, weight: 800, col: '#2a2a6a' }))
  x.restore()
}
/** a clipboard with a page count */
export function clipboard(x, cx, cy, { w = 300, h = 400, title = '', lines = 6, page = '', rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#a0703c', { b: 6 })
  box(x, -w / 2 + 18, -h / 2 + 30, w - 36, h - 48, BONE, { b: 3 })
  box(x, -50, -h / 2 - 14, 100, 34, '#c9c3dc', { b: 5 })
  if (title) ink(x, title, 0, -h / 2 + 74, { size: 30, font: INTER, weight: 800 })
  for (let i = 0; i < lines; i++) R(x, 'rgba(27,18,54,0.35)', -w / 2 + 40, -h / 2 + 116 + i * 38, (w - 80) * (0.6 + 0.4 * ((i * 5) % 3) / 2), 8)
  if (page) ink(x, page, w / 2 - 34, h / 2 - 40, { size: 22, align: 'right', col: RED })
  x.restore()
}
/** a mug / tea tin */
export function teaTin(x, cx, cy, s = 1, { col = PINE, label: lab = 'TEA' } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -44, -60, 88, 120, col, { b: 6, hi: 'rgba(255,255,255,0.2)' }); box(x, -50, -76, 100, 22, GOLD, { b: 5 })
  box(x, -32, -20, 64, 44, BONE, { b: 3 }); ink(x, lab, 0, 2, { size: 22 })
  x.restore()
}
/** a talk/plan "scale" (balance) tipping by tilt −1…1, with labelled pans */
export function balance(x, cx, cy, tilt, { L = 'YES', Rr = 'NOT YET', s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -14, -10, 28, 300, GOLD, { b: 5 }); box(x, -90, 280, 180, 30, GOLD, { b: 5 })
  x.save(); x.rotate(tilt * 0.35)
  box(x, -300, -24, 600, 18, GOLD, { b: 5 })
  x.restore()
  for (const d of [-1, 1]) {
    const px = d * 290 * Math.cos(tilt * 0.35), py = d * 290 * Math.sin(tilt * 0.35)
    R(x, INK, px - 3, py - 10, 6, 110)
    box(x, px - 110, py + 96, 220, 26, '#d9a441', { b: 5 })
    ink(x, d < 0 ? L : Rr, px, py + 150, { size: 30, col: BONE, font: INTER, weight: 800 })
  }
  x.restore()
}

// ═══════════════════════════════════════════════ DOM: the bug + the question sticker
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,107,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'MEET&nbsp;THE<span style="color:rgba(255,255,255,0.7)">&nbsp;FAMILY</span>')
  return {
    update(t, out = 1) {
      const k = at <= 0 ? 1 : pop01(t, at, 0.36, 2.2)
      const kk = k * out
      b.style.display = kk <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(kk * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}
/** the DEAR STARS question sticker: fully on screen at t = 0 (thumbnail), with a gentle wobble, out over q.out */
function buildQuestion(root, q, askerCol) {
  const wrap = el('div', { position: 'absolute', left: '0', top: (q.top ?? 140) + 'px', width: '1080px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { position: 'relative', width: '960px', boxSizing: 'border-box', padding: '26px 40px 30px', background: BONE, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: '12px 12px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  el('div', { font: `700 30px ${MONO}`, letterSpacing: '0.16em', color: BERRY, marginBottom: '10px' }, st, 'DEAR STARS,')
  const html = q.text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${q.accentSize || 118}px ${SERIF};color:${q.accent || askerCol};letter-spacing:0">$1</span>`).replace(/ \| /g, '<br>')
  el('div', { font: `800 ${q.size || 84}px ${INTER}`, lineHeight: '1.02', color: INK, letterSpacing: '-0.02em', textAlign: 'center' }, st, html)
  el('div', { font: `italic 500 38px ${SERIF}`, color: '#5a4a7a', textAlign: 'right', marginTop: '10px' }, st, q.sign)
  // a pin
  el('div', { position: 'absolute', left: '50%', top: '-22px', width: '34px', height: '34px', marginLeft: '-17px', background: RED, border: `6px solid ${INK}`, borderRadius: '50%' }, st)
  return {
    update(t) {
      const o = outK(t, q.out)
      const on = t < q.out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const rot = -1.6 + 0.6 * Math.sin(t * 1.7)
      st.style.opacity = String(clamp(o))
      st.style.transform = `translateY(${((1 - o) * -40).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${lerp(0.9, 1, o).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeFamily(cfg) {
  const DURATION = cfg.D, STORY_END = DURATION - ENDCARD_LEN
  const AS = signStar(cfg.asker), PA = cfg.partner ? signStar(cfg.partner) : null, PIS = signStar('pisces')
  const ATAG = K.tag(cfg.asker), PTAG = cfg.partner ? K.tag(cfg.partner) : null
  const ALL = cfg.boxes.flatMap(b => b.lines)
  const hopsOf = sp => talkHops(ALL, sp, { cps: CPS })
  const STARS_HOPS = hopsOf(K.STARS), A_HOPS = [-0.12, ...hopsOf(ATAG), ...(cfg.askerHops || [])], P_HOPS = PTAG ? [...hopsOf(PTAG), ...(cfg.partnerHops || [])] : []
  const OUT = [STORY_END - 0.5, STORY_END - 0.1]

  const asker = (x, t, o = {}) => {
    const opts = { color: AS.color, glyph: (o.s || 200) >= 150 ? AS.glyph : null, seed: 3, glow: 1.1, hops: A_HOPS, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts); wear(x, F, o.acc || cfg.askerAcc); if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return F
  }
  const partner = (x, t, o = {}) => {
    if (!PA) return null
    const opts = { color: PA.color, glyph: (o.s || 200) >= 150 ? PA.glyph : null, seed: 7, glow: 1, hops: P_HOPS, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts); wear(x, F, o.acc || cfg.partnerAcc); if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return F
  }
  /** a relative: any colour star with accessories (no glyph: relatives aren't labelled by sign) */
  const rel = (x, t, o = {}) => {
    const opts = { color: o.color || '#d9a0ff', glyph: null, seed: o.seed || 11, glow: 0.9, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts); wear(x, F, o.acc); if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return F
  }
  function pisces(x, t, P) {
    const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood: P.mood || 'wide', look: P.look || [-1, -0.5], seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    wear(x, F, P.acc)
    if (P.tears) inSprite(x, F, () => tearsCells(x, t, P.tears))
    return F
  }
  function tissues(x, cx, cy, s) {
    box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
    R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 84px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 118px 'EB Garamond'", "italic 500 38px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const tieImg = cfg.tie ? await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + cfg.tie.img }) : null
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const Q = buildQuestion(root, cfg.q, AS.color)
    const heads = cfg.beats.map(b => b.head ? { h: popText(root, b.head, { top: b.headTop || 168, size: b.size || 92, accentSize: b.accentSize || 124, at: b.t0 + 0.08, gap: 0.08, late: b.late || 0, lateAt: b.t0 + 0.5, wobble: !!b.late, accentColor: b.accent || GOLD, fit: true }), out: b.headOut || [b.t1 - 0.2, b.t1] } : null).filter(Boolean)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const boxes = cfg.boxes.map(b => dialogueBox(root, { lines: b.lines, y: b.y || 1420, open: b.open, close: b.close, cps: CPS }))
    const lesson = cfg.lesson ? buildLesson(root, cfg.lesson) : null
    const bug = buildBug(root, 0)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S0 = { asker, partner, rel, pisces, A: AS, P: PA }

    function starsNarrator(t, b) {
      const P = b.stars
      if (!P) return
      const k = pop01(t, b.t0 + (P.at ?? 0.3), 0.36, 2.1) * outK(t, [b.t1 - 0.2, b.t1])
      if (k <= 0.01) return
      drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood: P.mood || 'happy', look: P.look, hops: STARS_HOPS, pop: k, seed: 2, glow: 1.05 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
        drawSky(x, t, base)
        const shakeT = (cfg.shakes || []).find(s => t > s && t < s + 0.45)
        const sh = shakeT !== undefined ? 14 * Math.exp(-(t - shakeT) * 9) * Math.sin((t - shakeT) * 58) : 0
        x.save(); x.translate(0, sh)
        // cold open
        const h1 = cfg.beats[0].t0
        if (t < h1 && cfg.hook) {
          cfg.hook(x, t, { ...S0, u: t, t0: 0, t1: h1, k: 1 })
          if (cfg.hookPis) { const P = cfg.hookPis, pk = pop01(t, P.at ?? 0.8, 0.3, 2) * outK(t, [h1 - 0.15, h1]); if (pk > 0.01) { if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk)); pisces(x, t, { ...P, pop: pk }) } }
        }
        // the beats
        cfg.beats.forEach((b, i) => {
          if (t < b.t0 || t >= b.t1) return
          const punch = b.punch === false ? 1 : 1 + 0.06 * (1 - ease.outCubic(prog(t, b.t0, b.t0 + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          const k = popOutK(t, [OUT[0], OUT[1]])
          x.globalAlpha = clamp(k)
          b.draw(x, t, { ...S0, u: t - b.t0, t0: b.t0, t1: b.t1, k, i })
          x.restore()
          starsNarrator(t, b)
          if (b.pis) {
            const P = b.pis, pk = pop01(t, b.t0 + (P.at ?? 0.25), 0.3, 2) * outK(t, [b.t1 - 0.15, b.t1]) * popOutK(t, OUT)
            if (pk > 0.01) {
              if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
              pisces(x, t, { ...P, pop: pk })
            }
          }
        })
        x.restore()
        // top layer: the tie-in card
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.tie && tieImg && t >= cfg.tie.at && t < cfg.tie.out[1]) {
          const T2 = cfg.tie, k = easeOutBack(prog(t, T2.at, T2.at + 0.4), 1.4), o = outK(t, T2.out)
          const w = T2.w * o, h = w * tieImg.height / tieImg.width
          const cx = lerp(1300, T2.x, k), cy = lerp(T2.y - 300, T2.y, k), rot = lerp(0.8, T2.rot ?? 0.06, k) + 0.02 * Math.sin(t * 2)
          tx.save(); tx.translate(cx, cy); tx.rotate(rot)
          tx.fillStyle = 'rgba(6,4,18,0.45)'; tx.fillRect(-w / 2 + 18, -h / 2 + 22, w, h)
          tx.drawImage(tieImg, -w / 2, -h / 2, w, h)
          tx.restore()
          sparkles(tx, t, T2.x, T2.y, T2.at + 0.4, 10, T2.w * 0.7, 2, [GOLD, BONE, PINK])
        }
        if (cfg.top) cfg.top(tx, t, S0)
        Q.update(t)
        for (const h of heads) h.h.update(t, outK(t, h.out))
        boxes.forEach(b => b.update(t))
        if (lesson) lesson.update(t)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        const fl = Math.max(0, ...(cfg.flashes || []).map(c => (t >= c && t < c + 0.14) ? 1 - (t - c) / 0.14 : 0))
        flash.style.opacity = String(0.6 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = cfg.cuts
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.split(/\s+/).filter(w => w && w !== '|').length
  const CUES = [
    ['pluck', 0.05, 1174.66, 0.03, 0.5, 0], ['whoosh', r3(cfg.q.out[0]), 0.3, 0.03],
    ...cfg.beats.flatMap((b, i) => [
      ...(i > 0 || b.t0 > 0.5 ? [['whoosh', r3(b.t0 - 0.08), 0.28, 0.035], ['tick', r3(b.t0), 0.045]] : []),
      ...(b.head ? wordPops(b.t0 + 0.08, Math.min(8, nWords(b.head)), 0.08, i * 2) : []),
      ...(b.pis ? [['pluck', r3(b.t0 + 0.4), 2349.32, 0.012, 0.3, 0.6]] : []),
    ]),
    ...talkCues(ALL, { cps: CPS }),
    ...(cfg.lesson ? lessonCues(cfg.lesson.at, { text: cfg.lesson.text, chip: cfg.lesson.chip, key: cfg.key }) : []),
    ...(cfg.tie ? [['whoosh', cfg.tie.at, 0.4, 0.04], ['pluck', r3(cfg.tie.at + 0.4), 1318.51, 0.04, 0.6, 0.2], ['glitter', r3(cfg.tie.at + 0.35), r3(cfg.tie.at + 0.8)]] : []),
    ...(cfg.cues || []),
    ['whoosh', r3(OUT[0]), 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, OUT, CPS, AS, PA }
}
function popOutK(t, [a, b]) { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { popOutK as popOut }
