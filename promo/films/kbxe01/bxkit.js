// BEFORE YOU TEXT YOUR EX: the shared look of kbxe01–kbxe20 (promo/films/month2/m20.md). Imported read-only by
// kbxe02–20. No end card, no card transition, no logo: the film ends on its last beat (hard cut) or loops to frame 0.
//
// The format: a thumb is about to hit SEND on a text to an ex. A giant STOP sign slams down in front of it (shake +
// freeze + record scratch). The sign flips: "3 QUESTIONS FIRST". THE STARS run a kind three-question check (one card at
// a time; the sign answers honestly; each gets a tick). Then what they did instead, and the last line.
//
//   makeBX(cfg) → { DURATION, SCENES, CUES, T }
//   A film is a list of segments on one clock (all times absolute, seconds):
//     { kind: 'draft', t0, t1, room(x,t,S), contact, clock, draft, typed: [a,b]?, stopAt, hero: {x,y,s,mood}, old: [..] }
//     { kind: 'check', t0, t1, qs: [{ q, a, at, mood }], hero: { x, y, s } }
//     { kind: 'scene', t0, t1, draw(x, t, S) }               (anything custom: the "instead", a chapter scene …)
//   plus cfg.hook (the hookkit slamTitle opts: the hook line, landed on frame 0), cfg.whip (frame-0 whip zoom opts),
//   cfg.heads (DOM headlines), cfg.boxes (dialogue boxes), cfg.pis(x, t, S) (Pisces, every film), cfg.cues,
//   cfg.shakes [hookkit screenShake opts], cfg.recs [hookkit recordScratch opts: the build freezes too],
//   cfg.kit [[hookkitFn, opts]] (notification, loadingBar, chapter, countdown …), cfg.flashes [t], cfg.ending 'cut' | 'loop'.
// Loop endings use the hookkit loopBack (the frame-0 picture cross-blends in over the last cfg.loopLen s).
// Everything is a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  loopBack, loopCues, notification, notificationCues, loadingBar, loadingBarCues, chapter, chapterCues, countdown, countdownCues,
  caught, caughtCues, incomingCall, incomingCallCues, glitch, glitchCues, achievement, achievementCues,
} from '../hookkit.js'
export { notification, loadingBar, chapter, countdown, caught, incomingCall, glitch, achievement }

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const STOPRED = '#d6263a', GREEN = '#5fd38a', SKYBLUE = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const win = (t, t0, t1, d = 0.3) => pop01(t, t0, d, 2) * outK(t, [t1 - 0.2, t1])
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el, talkHops }

// ─────────────────────────────────────────────── pixel drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
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
export const BROKEN = ['.HH.HH.', 'HHH.HHH', 'HHH.HHH', '.HH.HH.', '..H.H..', '...H...']
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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYBLUE, '#9fe6b0', BONE] } = {}) {
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
/** word-wrap for canvas text */
export function wrap(x, text, maxW) {
  const out = []; let cur = ''
  for (const w of String(text).split(' ')) { const tryS = cur ? cur + ' ' + w : w; if (x.measureText(tryS).width > maxW && cur) { out.push(cur); cur = w } else cur = tryS }
  if (cur) out.push(cur)
  return out
}
/** a pixel speech bubble (multi-line), popping at t0, gone by t1. tail −1…1 along the bottom; up: tail on top */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 36, tail = 0, up = false, maxW = 640, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW), lh = size * 1.18
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, h = lines.length * lh + 30
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  if (up) { x.fillStyle = INK; x.fillRect(tx - 14, -h / 2 - 16, 14, 12); x.fillRect(tx - 7, -h / 2 - 22, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, -h / 2 - 9, 9, 9) }
  else { x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8); x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -((lines.length - 1) * lh) / 2 + i * lh + 2))
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, k = 1 } = {}) {
  if (alpha <= 0 || k <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a little ink tag with text (role labels like "ROOMMATE", time chips) */
export function tag(x, text, cx, cy, { size = 26, col = INK, bg = GOLD, k = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 30, h = size + 18
  R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10); R(x, bg, -w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function glowAt(x, cx, cy, r, col = '255,214,150', a = 0.2) {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props (tears) sit on the sprite through hops
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

// ─────────────────────────────────────────────── the cast
const PIS = signStar('pisces')
/** a sign star. o: { x, y, s, mood, look, hops, pop, seed, glyph(bool) } */
export function sign(x, t, id, o) {
  const S = signStar(id)
  return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, seed: o.seed ?? 3, glow: 1.05, ...o })
}
/** Pisces, crying. o: { x, y, s, tears 1–3, mood, look, pop, role } */
export function pisces(x, t, o) {
  const opts = { color: PIS.color, mood: o.mood || 'sparkle', look: o.look, seed: 6, glow: 0.85, pop: o.pop ?? 1, alpha: o.alpha ?? 1, hops: o.hops, glyph: o.s >= 150 ? PIS.glyph : null }
  if ((o.pop ?? 1) <= 0.01) return
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  if (o.role) tag(x, o.role, o.x, o.y + o.s * 0.62, { size: Math.max(18, Math.round(o.s * 0.15)), bg: '#8fe3ff', k: o.pop ?? 1 })
  if (o.tissue) drawBits(x, ['WWW', 'WWW', 'WW.'], { W: '#ffffff' }, o.x + o.s * 0.42, o.y + o.s * 0.15, o.s * 0.06, { rot: 0.3 })
}
/** THE STARS: the warm gold narrator */
export function stars(x, t, o) { return drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.1, mood: 'happy', ...o }) }

// ─────────────────────────────────────────────── the phone, the thumb, the STOP sign
/** a big chat phone. P: { cx, cy, w, h, rot, contact, clock, old: [{ side, text }], draft, typedK (0…1), sentK, alpha } */
export function drawPhone(x, t, P) {
  const { cx, cy, w = 560, h = 820, rot = 0 } = P
  x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= P.alpha ?? 1
  // body
  R(x, INK, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  R(x, '#2b2350', -w / 2, -h / 2, w, h)
  R(x, '#120d26', -w / 2 + 18, -h / 2 + 30, w - 36, h - 60)
  R(x, '#3a3066', -36, -h / 2 + 10, 72, 10)
  const L = -w / 2 + 18, Tp = -h / 2 + 30, IW = w - 36
  // status bar + header
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(P.clock || '', L + 18, Tp + 24)
  x.textAlign = 'right'; x.fillText('▮▮▮', L + IW - 18, Tp + 24)
  R(x, '#1d1640', L, Tp + 46, IW, 86)
  // avatar: a dim star coin
  x.fillStyle = '#4a3f7a'; x.beginPath(); x.arc(L + 56, Tp + 89, 28, 0, Math.PI * 2); x.fill()
  drawPixelStar(x, L + 56, Tp + 89, 30, 2, P.avatar || '#9a8fc0')
  x.textAlign = 'left'; x.font = `800 32px ${INTER}`; x.fillStyle = BONE; x.fillText(P.contact || 'them', L + 100, Tp + 80)
  x.font = `600 19px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillText(P.sub || 'last seen a while ago', L + 100, Tp + 110)
  // old messages (grey, faded)
  let y = Tp + 170
  x.font = `600 28px ${INTER}`
  for (const m of P.old || []) {
    if (m.stamp) { x.textAlign = 'center'; x.font = `700 18px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.45)'; x.fillText(m.stamp, 0, y + 6); y += 40; x.font = `600 28px ${INTER}`; continue }
    const lines = wrap(x, m.text, IW * 0.62), bh = lines.length * 34 + 24
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 36
    const bx = m.side === 'R' ? L + IW - 20 - bw : L + 20
    R(x, m.side === 'R' ? '#5b4aa8' : '#2f2752', bx, y, bw, bh)
    x.fillStyle = 'rgba(239,230,214,0.8)'; x.textAlign = 'left'
    lines.forEach((l, i) => x.fillText(l, bx + 18, y + 28 + i * 34))
    y += bh + 16
  }
  // the draft in the input field (or sent)
  const typed = P.draft ? P.draft.slice(0, Math.round(P.draft.length * clamp(P.typedK ?? 1))) : ''
  x.font = `600 32px ${INTER}`
  const lines = wrap(x, typed || ' ', IW - 170), lh = 40
  const fh = Math.max(76, lines.length * lh + 30), fy = -h / 2 + h - 30 - 22 - fh
  R(x, INK, L + 12, fy - 4, IW - 150 + 8, fh + 8); R(x, '#f4eee4', L + 16, fy, IW - 150, fh)
  x.fillStyle = INK; x.textAlign = 'left'
  lines.forEach((l, i) => x.fillText(l, L + 34, fy + 38 + i * lh))
  if ((P.typedK ?? 1) < 1 || P.caret) { const lw = x.measureText(lines[lines.length - 1]).width; if (Math.floor(t * 3) % 2 === 0) R(x, '#5b4aa8', L + 36 + lw, fy + 18 + (lines.length - 1) * lh, 4, 32) }
  // SEND button
  const sx = L + IW - 122, sy = fy + fh - 76, pr = P.press || 0
  R(x, INK, sx - 5, sy - 5 + pr * 4, 120, 86 - pr * 4)
  R(x, P.sendCol || '#ff4f86', sx, sy + pr * 6, 110, 76 - pr * 6)
  x.font = `900 26px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('SEND', sx + 55, sy + 40 + pr * 3)
  x.restore()
  return { send: { x: cx + (sx + 55) * Math.cos(rot) - (sy + 38) * Math.sin(rot), y: cy + (sx + 55) * Math.sin(rot) + (sy + 38) * Math.cos(rot) }, fieldTop: cy + fy }
}
/** a big pixel thumb coming up from below; (tx, ty) is the thumb tip */
export function drawThumb(x, tx, ty, { s = 1, rot = -0.35, col = '#f2b48a', alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(tx, ty); x.rotate(rot); x.scale(s, s)
  // the thumb: a rounded column with a nail, then the hand going off-screen
  R(x, INK, -58, -10, 116, 560); R(x, INK, -48, -20, 96, 20)
  R(x, col, -48, -10, 96, 560); R(x, col, -38, -16, 76, 10)
  R(x, '#d9946c', 26, 20, 22, 530)
  R(x, INK, -32, 2, 64, 58); R(x, '#ffe0cc', -26, 6, 52, 48); R(x, '#fff3ea', -20, 10, 22, 14)
  R(x, '#d9946c', -48, 170, 96, 8)
  x.restore()
}
/** the STOP sign: an octagon on a post. k scales; flip 0…1 turns it to its back (text on the back) */
export function drawStop(x, cx, cy, s, { rot = 0, flip = 0, back = ['3 QUESTIONS', 'FIRST'], alpha = 1, post = true } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const fx = Math.cos(Math.PI * clamp(flip)), showBack = flip > 0.5
  if (post) { R(x, INK, -14, 0, 28, 900); R(x, '#8c86a8', -8, 0, 16, 900) }
  x.scale(Math.max(0.02, Math.abs(fx)), 1)
  const oct = rr => { x.beginPath(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath() }
  x.fillStyle = INK; oct(s * 1.06); x.fill()
  x.fillStyle = showBack ? '#2a1f55' : '#fff'; oct(s); x.fill()
  x.fillStyle = showBack ? GOLD : STOPRED; oct(s * 0.9); x.fill()
  if (showBack) { x.fillStyle = INK; oct(s * 0.84); x.fill() }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (!showBack) { x.font = `900 ${Math.round(s * 0.62)}px ${INTER}`; x.fillStyle = '#fff'; x.fillText('STOP', 0, s * 0.04) }
  else {
    x.fillStyle = GOLD; x.font = `900 ${Math.round(s * 0.62)}px ${INTER}`; x.fillText('3', 0, -s * 0.3)
    x.font = `800 ${Math.round(s * 0.2)}px ${INTER}`; x.fillStyle = BONE
    x.fillText(back[0], 0, s * 0.2); x.fillText(back[1], 0, s * 0.44)
  }
  x.restore()
}

// ─────────────────────────────────────────────── rooms (backdrops, drawn over the night sky)
/** a night bedroom: a window with the moon, a bed edge, a nightstand lamp */
export function roomBedroom(x, t, { wall = '#1c1538', lamp = true, a = 1 } = {}) {
  x.save(); x.globalAlpha *= a
  x.fillStyle = wall; x.globalAlpha *= 0.82; x.fillRect(0, 430, 1080, 1490); x.globalAlpha /= 0.82
  box(x, 90, 520, 300, 360, '#0d0a22', { b: 10 }); R(x, INK, 236, 520, 10, 360); R(x, INK, 90, 694, 300, 10)
  drawPixelStar(x, 160, 590, 18, 1, BONE); drawPixelStar(x, 320, 640, 14, 1, BONE); drawPixelStar(x, 300, 780, 12, 1, GOLD)
  x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(170, 790, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#0d0a22'; x.beginPath(); x.arc(184, 780, 30, 0, Math.PI * 2); x.fill()
  box(x, 0, 1420, 1080, 500, '#2a2148', { b: 8 }); R(x, '#3a2f66', 0, 1420, 1080, 40)
  if (lamp) { box(x, 900, 1270, 140, 150, '#3a2d66', { b: 6 }); box(x, 935, 1170, 70, 100, '#ffd98a', { b: 6 }); glowAt(x, 970, 1200, 260, '255,214,150', 0.22 + 0.02 * Math.sin(t * 2)) }
  x.restore()
}
/** a warm kitchen: tiles, a counter, a pot on the stove (optional steam) */
export function roomKitchen(x, t, { steam = 1, a = 1 } = {}) {
  x.save(); x.globalAlpha *= a
  R(x, '#2a1d3e', 0, 430, 1080, 1490)
  for (let j = 0; j < 8; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2) R(x, '#33244a', i * 120, 470 + j * 110, 120, 110)
  box(x, 0, 1330, 1080, 600, '#5a3d2a', { b: 8 }); R(x, '#7a553a', 0, 1330, 1080, 30)
  box(x, 700, 1210, 260, 120, '#8c86a8', { b: 6 }); box(x, 730, 1140, 200, 80, '#5a5470', { b: 6 })
  if (steam > 0) for (let i = 0; i < 4; i++) { const p = ((t * 0.5 + i / 4) % 1); x.save(); x.globalAlpha = 0.35 * (1 - p) * steam; R(x, '#e8e0f0', 800 + Math.sin(p * 6 + i) * 30, 1120 - p * 260, 26, 26); x.restore() }
  x.restore()
}
/** a café: a big window, a counter, string lights */
export function roomCafe(x, t, { a = 1 } = {}) {
  x.save(); x.globalAlpha *= a
  R(x, '#2d1f33', 0, 430, 1080, 1490)
  box(x, 60, 520, 960, 520, '#141030', { b: 10 }); R(x, INK, 530, 520, 12, 520)
  for (let i = 0; i < 14; i++) { const lx = 60 + i * 72, ly = 500 + 14 * Math.sin(i * 0.9); R(x, INK, lx - 2, ly - 2, 16, 16); R(x, i % 3 ? '#ffd98a' : PINK, lx, ly, 12, 12); glowAt(x, lx + 6, ly + 6, 40, '255,214,150', 0.12 + 0.05 * Math.sin(t * 3 + i)) }
  box(x, 0, 1360, 1080, 560, '#6a4a32', { b: 8 }); R(x, '#8a6442', 0, 1360, 1080, 26)
  x.restore()
}
/** a party: dark room, disco dots, tinsel */
export function roomParty(x, t, { a = 1 } = {}) {
  x.save(); x.globalAlpha *= a
  R(x, '#1a1030', 0, 430, 1080, 1490)
  for (let i = 0; i < 26; i++) { const px = (i * 173 + t * 60 * (i % 2 ? 1 : -1)) % 1180 - 50, py = 520 + ((i * 97) % 760); x.save(); x.globalAlpha = 0.25 + 0.2 * Math.sin(t * 4 + i); R(x, [PINK, GOLD, SKYBLUE, LAV][i % 4], px, py, 14, 14); x.restore() }
  for (let i = 0; i < 18; i++) { const tx = i * 64, ty = 470 + 22 * Math.abs(Math.sin(i * 0.7)); R(x, i % 2 ? GOLD : '#c9c2e8', tx, ty, 40, 10) }
  box(x, 0, 1420, 1080, 500, '#2a1f45', { b: 8 })
  x.restore()
}
/** a street at night: buildings with windows, a curb */
export function roomStreet(x, t, { a = 1 } = {}) {
  x.save(); x.globalAlpha *= a
  const B = [[0, 700, 260], [250, 600, 220], [460, 760, 240], [690, 640, 200], [880, 720, 220]]
  for (const [bx, by, bw] of B) { box(x, bx, by, bw, 1420 - by, '#1f1840', { b: 6 }); for (let j = 0; j < 8; j++) for (let i = 0; i < 3; i++) { const lit = ((bx + i * 7 + j * 13) % 5) < 2; if (by + 40 + j * 90 < 1380) R(x, lit ? '#ffd98a' : '#2c2456', bx + 30 + i * (bw - 60) / 3, by + 40 + j * 90, 34, 44) } }
  R(x, '#231c3c', 0, 1420, 1080, 500); R(x, '#8c86a8', 0, 1420, 1080, 18)
  x.restore()
}
/** a living room: couch, rug, a lamp */
export function roomLiving(x, t, { a = 1, couch = '#5b4aa8' } = {}) {
  x.save(); x.globalAlpha *= a
  R(x, '#211a3e', 0, 430, 1080, 1490)
  box(x, 680, 560, 280, 260, '#0d0a22', { b: 10 }); drawPixelStar(x, 760, 640, 14, 1, BONE); drawPixelStar(x, 880, 720, 12, 1, GOLD)
  box(x, 0, 1440, 1080, 480, '#3a2d58', { b: 8 })
  box(x, 60, 1220, 960, 200, couch, { b: 8 }); box(x, 40, 1140, 120, 300, couch, { b: 8 }); box(x, 920, 1140, 120, 300, couch, { b: 8 })
  R(x, 'rgba(255,255,255,0.12)', 60, 1220, 960, 24)
  x.restore()
}

// ─────────────────────────────────────────────── the check: three numbered cards
/** one question card. k = pop scale; tick 0…1 stamps the green tick on the badge */
export function drawCard(x, cx, cy, n, q, { k = 1, tick = 0, rot = 0, w = 900, size = 50, col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const lines = wrap(x, q, w - 230), lh = size * 1.16, h = Math.max(200, lines.length * lh + 80)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  R(x, INK, -w / 2 - 7, -h / 2 - 7, w + 14, h + 14); R(x, col, -w / 2, -h / 2, w, h)
  R(x, '#e2d6bf', -w / 2, h / 2 - 14, w, 14)
  // number badge
  const bx = -w / 2 + 92
  R(x, INK, bx - 62, -58, 124, 124); R(x, tick > 0.5 ? GREEN : GOLD, bx - 56, -52, 112, 112)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (tick <= 0.5) { x.font = `900 76px ${INTER}`; x.fillStyle = INK; x.fillText(String(n), bx, 8) }
  else { const tk = easeOutBack(clamp((tick - 0.5) * 2), 3); drawBits(x, ['.......T', '......TT', 'T....TT.', 'TT..TT..', '.TTTT...', '..TT....'], { T: '#fff' }, bx, 4, 11 * tk) }
  x.font = `800 ${size}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 190, -((lines.length - 1) * lh) / 2 + i * lh + 4))
  x.restore()
}
/** the three progress chips (① ② ③) along the top of the stage */
export function drawChips(x, cx, cy, ticks, k = 1) {
  if (k <= 0.01) return
  for (let i = 0; i < 3; i++) {
    const px = cx + (i - 1) * 120, on = ticks[i]
    x.save(); x.translate(px, cy); x.scale(k, k)
    R(x, INK, -44, -44, 88, 88); R(x, on ? GREEN : '#3a2f66', -38, -38, 76, 76)
    x.font = `900 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = on ? '#fff' : 'rgba(239,230,214,0.6)'
    x.fillText(on ? '✓' : String(i + 1), 0, 3)
    x.restore()
  }
}

// ─────────────────────────────────────────────── the episode engine
const BUG_ICON = ['.PPPPP.', 'PSSSSSP', 'PSRRRSP', 'PSRWRSP', 'PSRRRSP', 'PSSSSSP', 'PSSSSSP', '.PPPPP.']
function buildBug(root, { at = 0 }) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '48px', imageRendering: 'pixelated' }, b)
  ic.width = 40; ic.height = 48
  drawBits(ic.getContext('2d'), BUG_ICON, { P: '#2b2350', S: '#120d26', R: STOPRED, W: '#fff' }, 20, 24, 4.6)
  el('div', { font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'BEFORE&nbsp;YOU&nbsp;TEXT&nbsp;YOUR&nbsp;EX')
  return { update(t) { const k = t < at ? 0 : 1; b.style.display = k ? 'flex' : 'none' } }
}

/** the draft segment's picture at τ (pure). Exposed so films can reuse it (and the loop can return to it). */
function drawDraft(x, t, S, seg) {
  const u = t - seg.t0
  const pin = seg.t0 <= 0 ? 1 : easeOutBack(prog(t, seg.t0, seg.t0 + 0.35), 1.3)
  const pout = ease.inCubic(prog(t, seg.t1 - 0.35, seg.t1))
  if (seg.room) seg.room(x, t, S)
  const stopAt = seg.stopAt ?? seg.t0 + 0.35
  const ph = seg.phone || {}
  const P = { cx: ph.cx ?? 620, cy: (ph.cy ?? 1010) + (1 - pin) * 1100 + pout * 1100, w: ph.w ?? 560, h: ph.h ?? 820, rot: (ph.rot ?? 0.04) + 0.01 * Math.sin(t * 1.7) }
  // hero first (behind the phone's edge)
  if (seg.hero) {
    const H = seg.hero
    const mood = typeof H.mood === 'function' ? H.mood(t) : (t < stopAt ? (H.mood0 || 'squint') : (H.mood || 'wide'))
    sign(x, t, S.cfg.sign, { x: H.x ?? 190, y: (H.y ?? 1180) + pout * 600, s: H.s ?? 230, mood, look: H.look ?? (t < stopAt ? [1, 0.6] : [1, -0.4]), hops: [stopAt + 0.02, ...(H.hops || [])] })
  }
  const typedK = seg.typed ? prog(t, seg.typed[0], seg.typed[1]) : 1
  const thumbIn = t < stopAt
  const tp = thumbIn ? prog(t, stopAt - 0.9, stopAt) : 0
  const pr = t < stopAt ? clamp((tp - 0.92) * 12) : 0
  const info = drawPhone(x, t, { ...P, contact: seg.contact, sub: seg.sub, clock: seg.clock, old: seg.old, draft: seg.draft, typedK, press: pr, avatar: seg.avatar, alpha: 1 })
  // the thumb: plunging toward SEND until the slam, then yanked back down
  const back = ease.outCubic(prog(t, stopAt, stopAt + 0.45))
  const reach = ease.outCubic(prog(t, stopAt - 0.7, stopAt - 0.02))
  const tipX = info.send.x + 20, tipY = info.send.y + 6
  const ty = thumbIn ? lerp(tipY + 260, tipY, reach) : lerp(tipY + 40, 2100, back)
  if (ty < 2000 && pout < 1) drawThumb(x, tipX + (thumbIn ? 0 : back * 60), ty + pout * 900, { rot: -0.3 })
  // the STOP sign: drops from above, slams at stopAt, wobbles, then flips to "3 QUESTIONS FIRST"
  const dropA = stopAt - 0.5
  const st = seg.stop || {}
  const SX = st.x ?? 640, SY = st.y ?? 1080, SR = st.r ?? 230
  if (t > dropA && pout < 1) {
    let sy
    if (t < stopAt) { const p = prog(t, dropA, stopAt); sy = lerp(SY - 480, SY, Math.pow(p, 1.5)) }
    else { const d = t - stopAt; sy = SY - 40 * Math.exp(-d * 9) * Math.abs(Math.sin(d * 22)) }
    const wob = t > stopAt ? 0.12 * Math.exp(-(t - stopAt) * 5) * Math.sin((t - stopAt) * 18) : 0
    const flip = seg.flipAt != null ? ease.inOutCubic(prog(t, seg.flipAt, seg.flipAt + 0.4)) : 0
    // motion streaks while falling
    if (t < stopAt) { x.save(); x.globalAlpha = 0.5; for (let i = 0; i < 5; i++) R(x, '#fff', SX - 180 + i * 90, sy - SR - 160, 10, 140); x.restore() }
    drawStop(x, SX, sy + pout * 1100, SR, { rot: wob, flip, back: seg.back })
  }
  if (seg.extra) seg.extra(x, t, S, { P, info })
  void u
}

function drawCheck(x, t, S, seg) {
  const qs = seg.qs
  const k = win(t, seg.t0, seg.t1, 0.35)
  if (k <= 0.01) return
  if (seg.room) seg.room(x, t, S)
  const ticks = qs.map(q => t > q.at + (q.tick ?? 1.6) + 0.15)
  drawChips(x, 540, seg.chipsY ?? 500, ticks, k)
  const H = seg.hero || {}
  // the current card (slams in from the right; the previous one flies up into its chip)
  qs.forEach((q, i) => {
    const next = qs[i + 1]?.at ?? seg.t1
    if (t < q.at - 0.02 || t > next + 0.3) return
    const inK = easeOutBack(prog(t, q.at, q.at + 0.3), 1.6)
    const flyO = ease.inCubic(prog(t, next - 0.05, next + 0.25))
    const cx = lerp(1500, 540, inK) + flyO * ((i - 1) * 120 - 540 + 540)
    const cy = lerp(seg.cardY ?? 700, seg.chipsY ?? 500, flyO)
    const tick = prog(t, q.at + (q.tick ?? 1.6), q.at + (q.tick ?? 1.6) + 0.3)
    drawCard(x, cx, cy, i + 1, q.q, { k: lerp(1, 0.1, flyO), tick, rot: lerp(0.08, -0.015, inK) })
    if (t > q.at + (q.tick ?? 1.6)) sparkles(x, t, cx - 360, cy, q.at + (q.tick ?? 1.6) + 0.15, 8, 90, i, [GREEN, BONE, GOLD])
    if (q.a) bubble(x, t, H.bx ?? 540, H.by ?? 930, q.at + (q.aAt ?? 0.7), next - 0.05, q.a, { size: 48, tail: H.tail ?? 0, maxW: 800, col: q.aCol || BONE })
  })
  // the sign answering
  const cur = [...qs].reverse().find(q => t >= q.at) || qs[0]
  const mood = t < cur.at + (cur.aAt ?? 0.7) ? 'neutral' : (cur.mood || 'neutral')
  const hops = qs.map(q => q.at + (q.aAt ?? 0.7) + 0.02)
  sign(x, t, S.cfg.sign, { x: H.x ?? 540, y: H.y ?? 1200, s: (H.s ?? 270) * k, mood, look: cur.look ?? [0, -0.6], hops })
  if (seg.extra) seg.extra(x, t, S)
}

export function makeBX(cfg) {
  const D = cfg.duration
  const segs = cfg.segments
  const heads = cfg.heads || []
  const boxes = cfg.boxes || []
  const CPS = cfg.cps ?? 30
  const T = cfg.T || {}
  // the hook kit pieces every film uses: a frame-0 whip zoom, the slam title (the hook line, landed on frame 0), the
  // STOP slam's shake + record scratch freeze; plus any extra kit overlays the film asks for (cfg.kit: [[fn, opts]])
  const WHIP = cfg.whip === false ? null : { at: -0.1, from: 1.3, blur: 7, ...(cfg.whip || {}) }
  const HOOK = { at: -1, top: 215, size: 112, ...cfg.hook }
  const shakes = cfg.shakes || []
  const recs = cfg.recs || []

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "900 80px Inter", "600 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const S = { cfg, T, x }
    if (cfg.init) await cfg.init(S)
    const H = heads.map(h => ({ h, o: popText(root, h.text, { top: h.top ?? 160, size: h.size ?? 96, accentSize: h.accentSize ?? Math.round((h.size ?? 96) * 1.3), at: h.at, gap: h.gap ?? 0.07, late: h.late ?? 0, lateAt: h.lateAt ?? null, wobble: h.wobble ?? true, accentColor: h.accent ?? GOLD, color: h.color ?? BONE, fit: true }) }))
    const B = boxes.map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1430, open: b.open, close: b.close, cps: CPS, size: b.size ?? 46, height: b.height ?? 270 }))
    const bug = buildBug(root, { at: 0 })
    const fx = layerCanvas(root, { pointerEvents: 'none' }), f = fx.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: -1, end: D + 0.01, root,
      update(tt) {
        drawSky(x, tt, SKY_H)
        x.save()
        for (const sg of segs) {
          if (tt < sg.t0 - (sg.kind === 'draft' ? 0.6 : 0) || tt > sg.t1) continue
          if (sg.kind === 'draft') drawDraft(x, tt, S, sg)
          else if (sg.kind === 'check') drawCheck(x, tt, S, sg)
          else if (sg.draw) sg.draw(x, tt, S, sg)
        }
        if (cfg.pis) cfg.pis(x, tt, S)
        if (cfg.over) cfg.over(x, tt, S)
        x.restore()
        f.clearRect(0, 0, 1080, 1920)
        for (const t0 of cfg.flashes || []) { const d = tt - t0; if (d >= 0 && d < 0.25) { f.fillStyle = `rgba(255,255,255,${0.7 * (1 - d / 0.25)})`; f.fillRect(0, 0, 1080, 1920) } }
        if (cfg.fx) cfg.fx(f, tt, S)
        for (const { h, o } of H) o.update(tt, h.out ? outK(tt, h.out) : 1)
        for (const b of B) b.update(tt)
        bug.update(tt)
        drawGrain(gx, tt)
      },
    }
  }

  const MAIN = recs.length ? frozen(build, recs) : build
  const extra = (cfg.kit || []).map(([fn, o]) => fn(o))
  const front = [MAIN, ...(WHIP ? [whipZoom(WHIP)] : []), slamTitle(HOOK)]
  const SCENES = [...front, ...shakes.map(o => screenShake(o)), ...recs.map(o => recordScratch(o)), ...extra]
  if (cfg.ending === 'loop') SCENES.push(loopBack(front, { duration: D, len: cfg.loopLen ?? 0.45 }))

  // sound: the slam, the card slams + ticks, the talk blips, the headlines
  const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const cues = []
  if (WHIP) cues.push(...whipZoomCues(WHIP))
  cues.push(...slamTitleCues(HOOK))
  for (const o of shakes) cues.push(...shakeCues(o))
  for (const o of recs) cues.push(...recordScratchCues(o))
  const CUEF = { notification: notificationCues, loadingBar: loadingBarCues, chapter: chapterCues, countdown: countdownCues, caught: caughtCues, incomingCall: incomingCallCues, glitch: glitchCues, achievement: achievementCues }
  for (const [fn, o] of cfg.kit || []) { const cf = CUEF[fn.name]; if (cf) cues.push(...cf(o)) }
  for (const sg of segs) {
    if (sg.kind === 'draft') {
      const sAt = sg.stopAt ?? sg.t0 + 0.35
      if (sg.t0 > 0) cues.push(['whoosh', r3(sg.t0), 0.4, 0.04])
      cues.push(['whoosh', r3(Math.max(0, sAt - 0.4)), 0.4, 0.05], ['boom', r3(sAt), 0.35], ['tom', r3(sAt), 70, { gain: 0.34, decay: 0.4 }], ['crash', r3(sAt), { gain: 0.05, len: 1.4 }], ['tick', r3(sAt), 0.08])
      if (sg.flipAt != null) cues.push(['whoosh', r3(sg.flipAt), 0.3, 0.03], ['pop', r3(sg.flipAt + 0.22), 1318.51, 0.045, 0], ['bell', r3(sg.flipAt + 0.25), 1760, 0.025, 0.8, 0])
      if (sg.typed) for (let tt = sg.typed[0]; tt < sg.typed[1]; tt += 0.09) cues.push(['tick', r3(tt), 0.018])
    }
    if (sg.kind === 'check') {
      sg.qs.forEach((q, i) => {
        cues.push(['whoosh', r3(q.at), 0.3, 0.04], ['pop', r3(q.at + 0.2), NOTE[i * 2], 0.05, 0], ['tick', r3(q.at + 0.22), 0.06])
        const tk = q.at + (q.tick ?? 1.6)
        cues.push(['pop', r3(tk + 0.15), 1318.51, 0.05, -0.2], ['bell', r3(tk + 0.17), 1760 * (i === 2 ? 1.5 : 1), 0.028, 0.9, 0], ['glitter', r3(tk + 0.15), r3(tk + 0.4)])
        if (q.a) cues.push(['pop', r3(q.at + (q.aAt ?? 0.7)), 880, 0.03, 0.2])
      })
    }
  }
  for (const h of heads) {
    const n = h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
    if (h.at >= 0) cues.push(...wordPops(h.at, Math.min(6, n - (h.late || 0)), h.gap ?? 0.07, 0))
    if (h.late && h.lateAt != null) cues.push(['pop', r3(h.lateAt), 1318.51, 0.05, 0], ['pop', r3(h.lateAt + 0.08), 1760, 0.035, 0])
  }
  for (const b of boxes) cues.push(...talkCues(b.lines, { cps: CPS }))
  if (cfg.ending === 'loop') cues.push(...loopCues({ duration: D, len: cfg.loopLen ?? 0.45 }))
  cues.push(...(cfg.cues || []))
  const CUES = cues.filter(c => c[1] >= 0 && c[1] < D - 0.05)
  return { DURATION: D, SCENES, CUES, T, HOOK }
}

/** Pisces' tears on a schedule: [[t, level]…] → the level at t */
export const tearsAt = (t, sched) => { let k = 0; for (const [a, v] of sched) if (t >= a) k = v; return k }

/** the standard short: draft + STOP (0 → DE), the three-question check (QL s each), the instead, the last line.
 *  c: { id, sign, duration, ending, hook, rec, room(x,t,S), checkRoom, contact, sub, clock, draft, old, typed, hero,
 *       stop, phone, back, stars: [line1, line2], qs: [{ q, a, mood, look }], head (instead headline), lines (instead
 *       box lines, relative to I0), instead(x, t, S, I), pisRole, pisDraft, last, cues, kit, DE = 5.2, QL = 2.7, extra }
 *  I = the computed times { stop, flip, C0, q: [..], I0, last, land, D } (handed to instead() and returned as T). */
export function shortBX(c) {
  const D = c.duration, DE = c.DE ?? 5.2, QL = c.QL ?? 2.7
  const stop = 0.35, flip = c.flip ?? DE - 2.3
  const q = [0, 1, 2].map(i => +(DE + 0.2 + i * QL).toFixed(2))
  const I0 = +(DE + 0.2 + 3 * QL - 0.1).toFixed(2)
  const last = +(D - 2.0).toFixed(2), land = +(D - 0.95).toFixed(2)
  const I = { stop, flip, C0: DE, q, I0, last, land, D, ...(c.T || {}) }
  const tick = Math.min(1.9, QL - 0.75)
  const pis = (x, t, S) => {
    if (t < DE) {
      const P = c.pisDraft || { x: 985, y: 760, s: 150 }
      if (c.pisDoor !== false) { box(x, P.x - 85, P.y - 200, 200, 560, '#120d26', { b: 8 }); glowAt(x, P.x + 15, P.y, 200, '255,214,150', 0.16) }
      pisces(x, t, { ...P, tears: t < stop ? 1 : 2, mood: t < stop ? 'sparkle' : 'wide', look: [-1, 0.2], role: c.pisRole })
    } else if (t < I0) {
      pisces(x, t, { x: 960, y: 1440, s: 130, tears: tearsAt(t, [[0, 1], [q[1] + 1, 2], [q[2] + 1.2, 3]]), mood: 'sparkle', look: [-1, -0.6], pop: pop01(t, DE + 0.3, 0.3, 2) })
    }
    if (c.pis) c.pis(x, t, S, I)
  }
  return makeBX({
    id: c.id, sign: c.sign, duration: D, T: I, ending: c.ending, loopLen: c.loopLen,
    hook: c.hook, whip: c.whip,
    shakes: [{ at: stop, len: 0.5, amp: 30 }],
    recs: [{ at: stop + 0.07, len: 1.25, ...c.rec }],
    segments: [
      { kind: 'draft', t0: 0, t1: DE, stopAt: stop, flipAt: flip, room: c.room, contact: c.contact, sub: c.sub, clock: c.clock, draft: c.draft, old: c.old, typed: c.typed, back: c.back, stop: c.stop, phone: c.phone, avatar: c.avatar,
        hero: { x: 175, y: 1250, s: 220, mood0: 'squint', mood: 'wide', ...(c.hero || {}) }, extra: c.draftExtra },
      { kind: 'check', t0: DE, t1: I0, room: c.checkRoom || ((x, t, S) => c.room && c.room(x, t, S, 0.7)), hero: { x: 380, y: 1230, s: 250, bx: 540, by: 960 }, extra: c.checkExtra,
        qs: c.qs.map((o, i) => ({ ...o, at: q[i], tick })) },
      { kind: 'scene', t0: I0, t1: D + 0.1, draw: (x, t, S) => c.instead(x, t, S, I) },
    ],
    heads: [
      { text: c.checkHead || 'Before you send: | *three* questions.', at: DE + 0.05, out: [I0 - 0.25, I0 - 0.05], size: 88 },
      { text: c.head, at: I0 + 0.05, out: [last - 0.25, last - 0.05], size: 92 },
      { text: c.last, at: last, late: c.lastLate ?? 1, lateAt: land, size: 100, accent: c.lastAccent || GOLD },
    ],
    boxes: [
      { lines: [{ t: 1.9, speaker: 'THE STARS', text: c.stars[0] }, { t: +(flip + 0.5).toFixed(2), speaker: 'THE STARS', text: c.stars[1] }], open: 1.75, close: DE - 0.2 },
      ...(c.lines && c.lines.length ? [{ lines: c.lines.map(l => ({ speaker: 'THE STARS', ...l, t: +(I0 + l.t).toFixed(2) })), open: +(I0 + c.lines[0].t - 0.15).toFixed(2), close: last - 0.1 }] : []),
    ],
    pis, kit: c.kit, flashes: c.flashes, fx: c.fx, over: c.over,
    cues: typeof c.cues === 'function' ? c.cues(I) : (c.cues || []),
  })
}
