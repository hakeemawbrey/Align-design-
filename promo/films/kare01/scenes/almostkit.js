// almostkit — THE ALMOST RELATIONSHIP (Month 2 boost, batch m19, star_advice posts; promo/films/month2/m19.md).
// Built with kare01. Every kare film imports it read-only from '../../kare01/scenes/almostkit.js'.
// No end card, no card transition, no logo, no brand name: DURATION is the story length.
//
// ═══════════════════════════════════════ makeAlmost(cfg) → { DURATION, SCENES, CUES } ═══════════════════════════════════════
//   cfg.id, cfg.duration
//   cfg.ending  'cut' (the last frame is the last story frame) | 'loop' (the last cfg.loopLen s cross-blend into frame 0: HK.loopBack)
//   cfg.hook    the hook line ('*' accent, ' | ' break): the kit's slamTitle, landed on frame 0. cfg.hookOut [a, b] fades it.
//               cfg.hookTop (px, default 230), cfg.hookSize (default 112), cfg.hookColor (accent colour)
//   cfg.fx      hook-kit effects: [['whipZoom', opts], ['recordScratch', opts], ['caught', opts], ['chapter', opts]…]
//               (scene + cues added; a recordScratch also freezes the story with HK.frozen). Loops use HK.loopBack.
//   cfg.shots   [{ a, b, draw(ctx, t, S) }]  the canvas story, back to front. S = { u: t - a, a, b, D }.
//               A shot draws the WHOLE frame (its set + cast). Shot 0 at t = 0 is the thumbnail.
//   cfg.cam(t)  → { z, fx, fy, dx, dy, rot } optional camera on the story canvas (zoom about fx, fy).
//   cfg.hookPlate [y0, y1] optional dark band behind the hook title (busy sets); fades with hookOut.
//   cfg.ui(ctx, t)  optional: drawn on the top canvas above the story (phones, HUDs, stamps, hook-kit effects).
//   cfg.captions  [{ text, at, out, top, kicker, size }] mid-film captions (popText + an optional mono kicker pill)
//   cfg.boxes   [{ lines, open, close, y }] extra dialogue boxes (one per advice moment in long films)
//   cfg.lines   dialogue box lines [{ t, speaker, text }] (THE STARS etc.); cfg.box { open, close, y }
//   cfg.dom(root) optional → { update(t, loopK) } for film-only DOM (chapter stickers, etc.)
//   cfg.cues    extra sound cues; cfg.hookCues = false to drop the default frame-0 hit.
//   The bug "THE ALMOST RELATIONSHIP" sits top-left all film. Grain on top.
//
// ═══════════════════════════════════════ cast + sets (re-exported from the Moonlight kit, read-only) ═══════════════════
//   star(ctx, sign, x, y, size, t, opts)  any sign (drawSign: Pisces gets tears + a tissue box; opts.tears 0…3,
//        opts.box false hides the box). THE STARS: stars(ctx, x, y, size, t, opts) (warm gold narrator).
//   drawApartment / APT, drawCafe / drawCafeTable / CAFE, drawLane / LANE, standY, drawPhone, drawBubble, sparkles
//   + props here: bigPhone, calendarPage, loadingBar, stamp, tag, snow, mirror, partyRoom, shopAisle, bench, split
// Pure f(t); DOM only inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../../startalk.js'
import * as HK from '../../hookkit.js'
import {
  BONE, INK, PINK, GOLD, LAV, CYAN, MINT, ML_GOLD, INTER, MONO, SERIF, r3, pop01, outK, popOut, inR, bump, rgba, mixHex,
  drawSign, drawPisces, standY, drawLane, LANE, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  drawPhone, drawBubble, sparkles, drawMysteryCard, starFrame, inSprite, tearsCells, buildCaption, captionCues, popCues, drawIcon, drawPastry,
} from '../../mlpilot/scenes/mlkit.js'

export {
  clamp, lerp, prog, ease, easeOutBack, BONE, INK, PINK, GOLD, LAV, CYAN, MINT, ML_GOLD, INTER, MONO, SERIF, r3, pop01, outK, popOut, inR, bump,
  rgba, mixHex, drawSign, drawPisces, standY, drawLane, LANE, drawCafe, drawCafeTable, CAFE, drawApartment, APT, drawPhone, drawBubble,
  sparkles, drawMysteryCard, starFrame, inSprite, tearsCells, drawStarChar, signStar, STAR, drawPixelStar, drawIcon, popCues, drawPastry,
}

export const RED = '#e8344e'
export const BUG_COL = '#ffb3c7'
export const CPS = 30
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]

// ── drawing basics
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0, shadow = true } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha *= a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ── the cast
/** any sign; Pisces cries by default (tears 2) */
export function star(ctx, sign, x, y, size, t, opts = {}) { return drawSign(ctx, sign, x, y, size, t, { seed: sign.length * 3 + 1, ...opts }) }
/** THE STARS, the warm gold narrator */
export function stars(ctx, x, y, size, t, opts = {}) { return drawStarChar(ctx, x, y, size, t, { color: STAR.sky, seed: 2, glow: 1.1, ...opts }) }
export const speaker = sign => `${signStar(sign).glyph}︎ ${sign.toUpperCase()}`

// ── props
/** a big phone held up to the lens: a chat thread (msgs: [{ at, side: 'L'|'R', text }]) */
export function bigPhone(x, t, cx, cy, { w = 560, h = 900, title = '', msgs = [], typing = null, rot = 0, k = 1, alpha = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.translate(-cx, -cy)
  drawPhone(x, cx, cy, w, h, t, { title, msgs, typing, alpha })
  x.restore()
}
/** a phone lock screen with one notification (or none), lit in the dark */
export function lockPhone(x, t, cx, cy, { w = 420, h = 760, time = '12:47', note = null, noteAt = 0, k = 1, rot = 0, glow = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 60, 0, 0, w * 1.3); g.addColorStop(0, `rgba(150,170,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(150,170,255,0)'); x.fillStyle = g; x.fillRect(-w * 1.3, -w * 1.3, w * 2.6, w * 2.6); x.restore() }
  box(x, -w / 2, -h / 2, w, h, '#2a2050', { b: 9 })
  const g2 = x.createLinearGradient(0, -h / 2, 0, h / 2); g2.addColorStop(0, '#3b3b8f'); g2.addColorStop(1, '#151033')
  x.fillStyle = g2; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
  R(x, INK, -40, -h / 2 + 24, 80, 12)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.font = `800 ${Math.round(w * 0.26)}px ${INTER}`; x.fillText(time, 0, -h * 0.26)
  if (note) {
    const nk = easeOutBack(prog(t, noteAt, noteAt + 0.35), 2)
    if (nk > 0.01) {
      x.save(); x.translate(0, lerp(-h * 0.5, -h * 0.02, nk))
      box(x, -w / 2 + 30, -50, w - 60, 120, '#efe9fb', { b: 5 })
      x.textAlign = 'left'; x.fillStyle = '#5a4e80'; x.font = `700 22px ${MONO}`; x.fillText(note.from, -w / 2 + 52, -22)
      x.fillStyle = INK; x.font = `700 32px ${INTER}`; x.fillText(note.text, -w / 2 + 52, 26)
      x.restore()
    }
  }
  x.restore()
}
/** a wall-calendar page */
export function calendarPage(x, cx, cy, w, { month = 'OCT', day = '1', rot = 0, alpha = 1, mark = null } = {}) {
  if (alpha <= 0) return
  const h = w * 1.15
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, '#fbf6ea', { b: 6 })
  R(x, RED, -w / 2, -h / 2, w, h * 0.24)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = '#fff'; x.font = `800 ${Math.round(w * 0.16)}px ${INTER}`; x.fillText(month, 0, -h / 2 + h * 0.12)
  x.fillStyle = INK; x.font = `800 ${Math.round(w * 0.42)}px ${INTER}`; x.fillText(day, 0, h * 0.1)
  if (mark) { x.fillStyle = RED; x.font = `700 ${Math.round(w * 0.1)}px ${MONO}`; x.fillText(mark, 0, h * 0.38) }
  R(x, '#9a8a70', -w * 0.3, -h / 2 - 14, 14, 26); R(x, '#9a8a70', w * 0.3 - 14, -h / 2 - 14, 14, 26)
  x.restore()
}
/** a chunky loading bar with a label; p 0…1 */
export function loadingBar(x, cx, cy, w, p, text, { col = PINK, k = 1, size = 34, sub = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 56
  box(x, -w / 2, -h / 2, w, h, '#1d1540', { b: 7 })
  R(x, col, -w / 2 + 6, -h / 2 + 6, (w - 12) * clamp(p), h - 12)
  for (let i = 1; i < 10; i++) R(x, 'rgba(27,18,54,0.35)', -w / 2 + i * w / 10, -h / 2 + 6, 4, h - 12)
  label(x, text, 0, -h / 2 - 34, { size, col: BONE, font: INTER, weight: 800 })
  if (sub) label(x, sub, 0, h / 2 + 30, { size: 26, col: col })
  x.restore()
}
/** a rubber-stamp imprint (canvas), slams at t0 */
export function stamp(x, t, t0, cx, cy, text, { col = RED, size = 70, rot = -0.12, out = null } = {}) {
  if (t < t0) return
  const p = prog(t, t0, t0 + 0.09), o = out ? outK(t, out) : 1
  if (o <= 0) return
  const s = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - t0) * 9) * Math.sin((t - t0) * 40))
  x.save(); x.globalAlpha *= clamp(p * 2) * o; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + size * 0.8, h = size * 1.45
  x.strokeStyle = col; x.lineWidth = size * 0.12; x.strokeRect(-w / 2, -h / 2, w, h)
  x.lineWidth = size * 0.05; x.strokeRect(-w / 2 - size * 0.16, -h / 2 - size * 0.16, w + size * 0.32, h + size * 0.32)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, size * 0.05)
  x.restore()
}
/** an evidence tag: a numbered bone sticker on canvas, pops at t0 */
export function tag(x, t, t0, cx, cy, text, { n = null, col = BONE, ink = INK, size = 40, rot = -0.04, out = null, badge = PINK } = {}) {
  const k = pop01(t, t0, 0.28, 2.4) * (out ? outK(t, out) : 1)
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const tw = x.measureText(text).width, bw = n !== null ? size * 1.4 : 0, w = tw + bw + size * 1.0, h = size * 1.75
  R(x, 'rgba(6,4,18,0.6)', -w / 2 + 10, -h / 2 + 10, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  if (n !== null) {
    x.fillStyle = INK; x.beginPath(); x.arc(-w / 2 + size * 0.5 + bw / 2, 0, bw / 2 + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = badge; x.beginPath(); x.arc(-w / 2 + size * 0.5 + bw / 2, 0, bw / 2 - 2, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), -w / 2 + size * 0.5 + bw / 2, 2)
  }
  x.fillStyle = ink; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, -w / 2 + size * 0.5 + bw + (n !== null ? size * 0.25 : 0), 2)
  x.restore()
}
/** falling pixel snow (deterministic), alpha a; freeze ≥ 0 stops it at that time */
export function snow(x, t, { n = 70, a = 0.9, freeze = null, y0 = 0, y1 = 1920, seed = 3 } = {}) {
  const tt = freeze !== null ? Math.min(t, freeze) : t
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < n; i++) {
    const r1 = ((i * 9301 + seed * 49297) % 233280) / 233280, r2 = ((i * 7919 + seed * 104729) % 1000) / 1000
    const sp = 60 + 90 * r2, sz = 6 + Math.round(r1 * 2) * 3
    const yy = y0 + ((r1 * (y1 - y0) + tt * sp) % (y1 - y0))
    const xx = (r2 * 1180 - 50 + Math.sin(tt * 0.9 + i) * 24)
    R(x, '#f4f2ff', xx, yy, sz, sz)
  }
  x.restore()
}
/** a standing mirror (frame + glass); draw what's "in" it with inside(ctx) (clipped) */
export function mirror(x, cx, cy, w, h, inside = null) {
  box(x, cx - w / 2 - 18, cy - h / 2 - 18, w + 36, h + 36, '#c9a25e', { b: 7, hi: '#e8c47a' })
  const g = x.createLinearGradient(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2); g.addColorStop(0, '#5a6aa8'); g.addColorStop(1, '#2a2f66')
  x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  if (inside) { x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); inside(x); x.restore() }
  x.save(); x.globalAlpha = 0.18; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(cx - w / 2 + 30, cy - h / 2); x.lineTo(cx - w / 2 + 110, cy - h / 2); x.lineTo(cx - w / 2, cy - h / 2 + 200); x.lineTo(cx - w / 2, cy - h / 2 + 120); x.fill(); x.restore()
}
/** a party room: dark wall, string lights, balloons, a snack table */
export function partyRoom(x, t, { lights = 1 } = {}) {
  R(x, '#2a1a4a', 0, 0, 1080, 1920)
  for (let i = 0; i < 1080; i += 90) R(x, '#2f1f52', i, 0, 44, 1300)
  R(x, '#3a2552', 0, 1300, 1080, 620)
  for (let y = 1300; y < 1920; y += 64) for (let xx = ((y - 1300) / 64 % 2) * 64; xx < 1080; xx += 128) R(x, '#43305e', xx, y, 64, 64)
  // string lights
  for (let row = 0; row < 2; row++) {
    const yb = 330 + row * 230
    for (let i = 0; i <= 24; i++) {
      const xx = i * 45, yy = yb + 60 * Math.sin(Math.PI * i / 24)
      R(x, '#1a1030', xx, yy, 6, 6)
      if (i % 2 === 0) {
        const on = lights * (0.6 + 0.4 * Math.sin(t * 3 + i * 1.7 + row))
        const c = [GOLD, PINK, CYAN, MINT][(i / 2 + row) % 4]
        x.save(); x.globalAlpha *= on; R(x, c, xx - 6, yy + 6, 16, 20); x.globalAlpha *= 0.3; R(x, c, xx - 16, yy - 4, 36, 40); x.restore()
      }
    }
  }
  // balloons
  ;[[110, 760, PINK], [190, 700, GOLD], [960, 740, CYAN], [890, 800, LAV]].forEach(([bx, by, c], i) => {
    const yy = by + 10 * Math.sin(t * 1.6 + i)
    R(x, '#1a1030', bx - 2, yy + 60, 4, 260)
    box(x, bx - 40, yy - 50, 80, 100, c, { b: 5 }); R(x, 'rgba(255,255,255,0.5)', bx - 24, yy - 34, 14, 22)
  })
  // snack table
  box(x, 680, 1180, 380, 26, '#a0584a', { b: 6 }); R(x, '#7a4030', 700, 1206, 18, 120); R(x, '#7a4030', 1022, 1206, 18, 120)
  ;[[740, '#ffd98a'], [830, PINK], [920, MINT], [1000, '#ffd98a']].forEach(([bx, c]) => { box(x, bx - 26, 1150, 52, 30, c, { b: 4 }) })
}
/** a gift-shop aisle: shelves with pixel gift boxes, warm lights */
export function shopAisle(x, t) {
  R(x, '#3a2a5a', 0, 0, 1080, 1920)
  R(x, '#4a3468', 0, 0, 1080, 160)
  for (let i = 0; i < 6; i++) { const c = 0.7 + 0.3 * Math.sin(t * 2 + i); x.save(); x.globalAlpha = c; R(x, '#ffe7a8', 60 + i * 180, 120, 90, 14); x.restore() }
  for (let s = 0; s < 4; s++) {
    const y = 380 + s * 240
    R(x, '#6b4a2f', 0, y + 150, 1080, 22); R(x, '#4a3020', 0, y + 172, 1080, 10)
    for (let i = 0; i < 9; i++) {
      const bx = 20 + i * 120 + (s % 2) * 40, bw = 80 + ((i * 7 + s * 3) % 3) * 12, bh = 70 + ((i * 5 + s) % 4) * 18
      const c = [RED, MINT, GOLD, PINK, CYAN, LAV][(i + s * 2) % 6]
      box(x, bx, y + 150 - bh, bw, bh, c, { b: 4 })
      R(x, BONE, bx + bw / 2 - 5, y + 150 - bh, 10, bh); R(x, BONE, bx, y + 150 - bh / 2 - 5, bw, 10)
    }
  }
  R(x, '#2c1f46', 0, 1340, 1080, 580)
  for (let y = 1340; y < 1920; y += 70) R(x, '#33254f', 0, y, 1080, 6)
}
/** a park bench (front view), seat at y */
export function bench(x, cx, y, w = 640) {
  R(x, INK, cx - w / 2 - 6, y - 96, w + 12, 120); R(x, '#8a5a3a', cx - w / 2, y - 90, w, 26); R(x, '#8a5a3a', cx - w / 2, y - 54, w, 26)
  R(x, INK, cx - w / 2 - 6, y - 6, w + 12, 34); R(x, '#a06a44', cx - w / 2, y, w, 22)
  R(x, INK, cx - w / 2 + 20, y + 22, 24, 110); R(x, INK, cx + w / 2 - 44, y + 22, 24, 110)
}
/** draw fn into the left/right half (clipped), with a divider */
export function split(x, left, right, { at = 540, divider = BONE, labels = null } = {}) {
  x.save(); x.beginPath(); x.rect(0, 0, at, 1920); x.clip(); left(x); x.restore()
  x.save(); x.beginPath(); x.rect(at, 0, 1080 - at, 1920); x.clip(); right(x); x.restore()
  R(x, INK, at - 9, 0, 18, 1920); R(x, divider, at - 4, 0, 8, 1920)
  if (labels) { tag(x, 1, 0, at / 2, 330, labels[0], { size: 40, rot: -0.03 }); tag(x, 1, 0, at + (1080 - at) / 2, 330, labels[1], { size: 40, rot: 0.03 }) }
}
/** a cosy bedroom at night: the apartment, dim, with a bed in front */
export function bedroom(x, t, { lamp = 0.15 } = {}) {
  drawApartment(x, t, { lamp, time: 'late' })
  R(x, 'rgba(10,8,30,0.45)', 0, 0, 1080, 1920)
  box(x, 80, 1380, 920, 260, '#5a4a8a', { b: 8, hi: '#7a6ab0' })
  box(x, 120, 1300, 260, 110, '#efe6f6', { b: 6 })
  R(x, '#3a2e66', 80, 1640, 920, 280)
}
/** a pixel heart */
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, outline = INK } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4 } = {}) {
  const cols = ['#ff5c8a', '#ff8fb1', GOLD]
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % 3] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 200, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** a thought cloud with text (canvas) */
export function thought(x, t, cx, cy, t0, t1, text, { size = 34, col = BONE, tx = 0, ty = 1 } = {}) {
  const k = pop01(t, t0, 0.28, 2.2) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + size * 1.4, h = size * 2
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, h / 2 + 6); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill()
  for (const [d, r] of [[1, 16], [2, 10]]) { x.fillStyle = INK; x.beginPath(); x.arc(tx * d * 30, h / 2 + d * 30 * ty, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(tx * d * 30, h / 2 + d * 30 * ty, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a speech bubble that pops at t0 and goes at t1 (wraps mlkit drawBubble) */
export function say(x, t, cx, cy, t0, t1, text, { size = 36, col = BONE, tail = 'down' } = {}) {
  if (t < t0) return
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  drawBubble(x, cx, cy, text, { size, col, k, tail })
}

// ═══════════════════════════════════════ the bug ═══════════════════════════════════════
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '16px', height: '16px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,199,0.7)` }, b)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, fontVariantCaps: 'all-small-caps', textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, b,
    'The&nbsp;Almost<span style="color:rgba(255,255,255,0.62)">&nbsp;Relationship</span>')
  return { update(a = 1) { b.style.opacity = String(a); b.style.display = a > 0.01 ? 'flex' : 'none' } }
}

// ═══════════════════════════════════════ the engine ═══════════════════════════════════════
export const FONTS = ['800 112px Inter', '800 84px Inter', '800 50px Inter', '800 30px Inter', '700 36px Inter', '600 28px Inter', "italic 500 150px 'EB Garamond'", "italic 500 118px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"]
export function makeAlmost(cfg) {
  const D = cfg.duration, LOOP = cfg.ending === 'loop', LL = cfg.loopLen ?? 0.45
  const hookOut = cfg.hookOut || [2.6, 2.9]
  const lines = cfg.lines || []

  async function build(stage) {
    try { await Promise.all([...FONTS, ...(cfg.fonts || [])].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const caps = (cfg.captions || []).map(c => buildCaption(root, { size: 76, accentColor: cfg.hookColor || BUG_COL, ...c }))
    const dbox = lines.length ? dialogueBox(root, { lines, y: cfg.box?.y ?? 1450, cps: CPS, open: cfg.box?.open, close: cfg.box?.close ?? (cfg.ending === 'cut' ? D + 5 : undefined) }) : null
    // cfg.boxes: extra dialogue boxes [{ lines, open, close, y }] (long films: one box per advice moment)
    const xboxes = (cfg.boxes || []).map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1450, cps: CPS, open: b.open, close: b.close ?? (cfg.ending === 'cut' ? D + 5 : undefined) }))
    const extra = cfg.dom ? cfg.dom(root) : null
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: cfg.flashCol || '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // the canvas story at time t into ctx (camera + shots) and the ui canvas
    function paintStory(c, t) {
      c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'
      R(c, '#05040c', 0, 0, 1080, 1920)
      const cam = cfg.cam ? cfg.cam(t) || {} : {}
      const z = cam.z ?? 1, fx = cam.fx ?? 540, fy = cam.fy ?? 960
      c.save(); c.translate(fx + (cam.dx || 0), fy + (cam.dy || 0)); c.rotate(cam.rot || 0); c.scale(z, z); c.translate(-fx, -fy)
      for (const s of cfg.shots) if (t >= s.a && t < s.b) s.draw(c, t, { u: t - s.a, a: s.a, b: s.b, D })
      c.restore()
    }
    function paintUI(c, t) {
      c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 1080, 1920)
      // cfg.hookPlate: a dark glass plate behind the hook title over busy sets ([y0, y1] screen px)
      if (cfg.hookPlate) { const a = outK(t, hookOut); if (a > 0) { c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(10,6,30,0.72)'; c.fillRect(0, cfg.hookPlate[0], 1080, cfg.hookPlate[1] - cfg.hookPlate[0]); c.restore() } }
      if (cfg.ui) { c.save(); cfg.ui(c, t); c.restore() }
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const lk = LOOP ? HK.loopK(t, D, LL) : 0
        paintStory(x, t)
        paintUI(tx, t)
        caps.forEach(c => { c.update(t) })
        if (dbox) { dbox.update(t); dbox.root.style.opacity = String(1 - lk) }
        xboxes.forEach(b => { b.update(t); b.root.style.opacity = String(1 - lk) })
        if (extra) extra.update(t, lk)
        bug.update(1)
        const fl = cfg.flash ? cfg.flash(t) : 0
        flash.style.opacity = String(clamp(fl))
        drawGrain(gx, t)
      },
    }
  }

  // the hook kit: the slam title (landed on frame 0), the film's effects, the freeze, the loop
  const HOOK = { at: -1, text: cfg.hook, out: hookOut, top: cfg.hookTop ?? 230, size: cfg.hookSize ?? 112, accentColor: cfg.hookColor || BUG_COL }
  const FX = cfg.fx || []
  const wins = FX.filter(f => f[0] === 'recordScratch').map(f => f[1])
  const main = wins.length ? HK.frozen(build, wins) : build
  const cueName = k => k === 'screenShake' ? 'shakeCues' : k + 'Cues'
  const SCENES = [main, HK.slamTitle(HOOK), ...FX.map(([k, o]) => HK[k](o))]
  // the loop layer rebuilds frame 0: the story, the title and every kit overlay already up at t = 0
  const at0 = FX.filter(([k, o]) => o.at <= 0 && k !== 'recordScratch' && k !== 'whipZoom' && k !== 'screenShake').map(([k, o]) => HK[k](o))
  if (LOOP) SCENES.push(HK.loopBack([main, HK.slamTitle(HOOK), ...at0], { duration: D, len: LL }))
  const CUES = [
    ...(cfg.hookCues === false ? [] : [['boom', 0, 0.22], ['tick', 0, 0.06]]),
    ...FX.flatMap(([k, o]) => HK[cueName(k)](o)),
    ...(LOOP ? HK.loopCues({ duration: D, len: LL }) : []),
    ...(cfg.captions || []).flatMap(c => captionCues({ size: 76, ...c })),
    ...talkCues(lines, { cps: CPS }),
    ...(cfg.boxes || []).flatMap(b => talkCues(b.lines, { cps: CPS })),
    ...(cfg.cues || []),
  ].map(c => [c[0], r3(c[1]), ...c.slice(2)])
  return { DURATION: D, SCENES, CUES }
}
