// nepkit — the PLANET TALK: NEPTUNE episode engine (batch p09, promo/films/planets/p09.md). Owned by kpnee01; kpnee02–12
// import it read-only. Built on planetkit.js (the cast, space, bubbles, entrances) and hookkit.js (hooks, loop-back).
//
// Neptune is the romance-movie fan, so every episode is shot like a film: a projector-beam glow, film-strip edges on
// the daydreams, and ♓ Pisces in a front-row cinema-seat bubble with a popcorn tub, crying at every romantic beat.
//
// ═══════════════════════════════════════ API ═══════════════════════════════════════
//   import { episode, P } from '../../kpnee01/scenes/nepkit.js'
//   const E = episode(SPEC);  export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
//
// SPEC = {
//   sign: 'aries', duration: 24, ending: 'cut' | 'loop', bug: 'PLANET TALK',
//   entrance: { kind: 'crash', at: -0.3, x, y, size },      planetkit entrance for Neptune at frame 0 (shot 0 pose after)
//   hook: { text, top, size, out: [a, b] },                 hookkit slamTitle at −1 (on frame 0). Part of the loop frame.
//   caps: [{ at, text, out, top, size, accentColor }],      later slam captions (each a slamTitle)
//   fx: [{ kind: 'whip' | 'rec' | 'glitch' | 'shake' | 'caught' | 'chapter' | 'notif' | 'loading', ...opts }]
//   shots: [{ a, b,                                         time window (s); poses ease in over `tr` (0.4 s) at a
//     bg(x, t, S)      backdrop (default: drawSpace neptune, optional horizon)
//     back(x, t, S)    props behind the cast          front(x, t, S)  props in front of the cast
//     nep: { x, y, size, mood, glasses, rot, alpha } | null     sign: { x, y, size, mood, look, tears } | null
//     pis: { x, y, r } | false                                 Pisces' cinema-seat bubble (default top-right)
//   }],
//   lines: [{ t0, t1, who, text, x, y, tail, tailUp, size, maxW }]   planetkit speech bubbles (who: 'neptune' | sign)
//   cry: [[t, level, mood?]…]     Pisces' tears over time (0…3), stepwise.   pisMood: default 'sparkle'
//   cues: [...]                   extra sound cues
// }
// mood / glasses / look / tears values may be a constant or a step list [[t, value], …] (absolute times).
// S (passed to draw fns) = { t, u (0…1 within shot), a, b, nep: pose, sign: pose, spec }
// Helpers for props: P.* (screen, reel, popcorn, thought, phone, heart, glasses, filmEdge, rays, txt, box…).
// Everything is a pure function of t.
// ═══════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, glitch, glitchCues,
  screenShake, shakeCues, caught, caughtCues, chapter, chapterCues, notification, notificationCues, loadingBar,
  loadingBarCues, loopBack, loopCues, drawRich,
} from '../../hookkit.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, planetSize, aboveHorizon, colorOf } from '../../planetkit.js'

export { clamp, lerp, prog, ease, easeOutBack, drawPlanet, drawSign, drawSpace, drawRich, drawPixelStar, planetSize, colorOf, rng }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', NEP = '#4f7ff0', ROSE = '#ff8fb1', SEA = '#7fe0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
export const outK = (t, out) => (out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1)
export const win = (t, a, b, fi = 0.25, fo = 0.25) => clamp(Math.min(pop01(t, a, fi, 1.8), 1 - prog(t, b - fo, b)))
export const step = (v, t, d) => {
  if (!Array.isArray(v) || (v.length && !Array.isArray(v[0]))) return v ?? d
  let cur = d
  for (const [tt, val] of v) if (t >= tt) cur = val
  return cur
}

// ─────────────────────────────────────────────── prop helpers
export const P = {
  rgba,
  /** rounded panel */
  box(x, cx, cy, w, h, fillc, { r = 26, stroke = INK, lw = 8, rot = 0, alpha = 1, shadow = true } = {}) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= alpha
    if (shadow) { x.shadowColor = 'rgba(6,4,18,0.5)'; x.shadowBlur = 24; x.shadowOffsetY = 10 }
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.fillStyle = fillc; x.fill()
    x.shadowColor = 'transparent'
    if (lw) { x.lineWidth = lw; x.strokeStyle = stroke; x.stroke() }
    x.restore()
  },
  /** plain text (Inter 800 / *accent* serif via drawRich) */
  txt(x, text, cx, y, { size = 44, color = BONE, accentColor = GOLD, maxW = 900, alpha = 1, rot = 0, shadow = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.translate(cx, y); x.rotate(rot)
    drawRich(x, text, 0, 0, { size, color, accentColor, maxW, shadow })
    x.restore()
  },
  mono(x, text, cx, y, { size = 30, color = BONE, alpha = 1, align = 'center' } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 10; x.fillText(text, cx, y); x.restore()
  },
  glow(x, cx, cy, r, col, a = 0.5) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); x.restore()
  },
  /** a projector beam from (sx, sy) widening to a target rect centre (cx, cy) of width w */
  beam(x, sx, sy, cx, cy, w, a = 0.22, col = '#dfe9ff') {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(sx, sy, cx, cy); g.addColorStop(0, rgba(col, a * 1.6)); g.addColorStop(1, rgba(col, a * 0.25))
    x.fillStyle = g; x.beginPath(); x.moveTo(sx, sy - 10); x.lineTo(cx - w / 2, cy); x.lineTo(cx + w / 2, cy); x.lineTo(sx, sy + 10); x.closePath(); x.fill()
    x.restore()
  },
  /** the film-strip sprocket edges (a "this is a movie" frame) */
  filmEdge(x, t, { alpha = 1, speed = 120, w = 70 } = {}) {
    if (alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha
    for (const ex of [0, 1080 - w]) {
      x.fillStyle = '#0b0818'; x.fillRect(ex, 0, w, 1920)
      const off = (t * speed) % 80
      x.fillStyle = 'rgba(239,230,214,0.75)'
      for (let y = -80 + off; y < 1940; y += 80) { x.beginPath(); x.roundRect(ex + w / 2 - 16, y, 32, 44, 8); x.fill() }
    }
    x.restore()
  },
  /** a cinema screen (curtains + glowing panel); inner(x) draws the picture, clipped */
  screen(x, cx, cy, w, h, inner, { curtain = 0, glowc = '#9fc0ff', crack = 0, alpha = 1 } = {}) {
    x.save(); x.globalAlpha *= alpha
    P.glow(x, cx, cy, Math.max(w, h) * 0.75, glowc, 0.18)
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28)
    x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
    x.fillStyle = '#e9eefc'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    if (inner) inner(x)
    x.restore()
    if (crack > 0) {
      x.save(); x.strokeStyle = INK; x.lineWidth = 7; x.lineCap = 'round'
      const R = rng(9)
      for (let i = 0; i < 9; i++) {
        const a = R() * TAU, L = (90 + R() * 260) * crack
        x.beginPath(); x.moveTo(cx, cy); let px = cx, py = cy
        for (let k = 1; k <= 3; k++) { px += Math.cos(a + (R() - 0.5) * 0.6) * L / 3; py += Math.sin(a + (R() - 0.5) * 0.6) * L / 3; x.lineTo(px, py) }
        x.stroke()
      }
      x.restore()
    }
    // velvet curtains
    const cw = lerp(90, w / 2 + 40, curtain)
    for (const s of [-1, 1]) {
      const ex = cx + s * (w / 2 + 50)
      const g = x.createLinearGradient(ex - s * cw, 0, ex, 0); g.addColorStop(0, '#c2304f'); g.addColorStop(1, '#6e1430')
      x.fillStyle = g; x.beginPath(); x.moveTo(ex, cy - h / 2 - 60); x.lineTo(ex - s * cw, cy - h / 2 - 60)
      x.quadraticCurveTo(ex - s * cw * 0.8, cy, ex - s * cw * 1.05, cy + h / 2 + 50); x.lineTo(ex, cy + h / 2 + 50); x.closePath(); x.fill()
      x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 6
      for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(ex - s * cw * k / 4, cy - h / 2 - 60); x.lineTo(ex - s * cw * k / 4 * 1.05, cy + h / 2 + 50); x.stroke() }
    }
    x.fillStyle = '#8a1a38'; x.fillRect(cx - w / 2 - 70, cy - h / 2 - 90, w + 140, 50)
    x.restore()
  },
  /** popcorn kernels flying from (cx, cy) since t0 */
  popcorn(x, t, t0, cx, cy, { n = 26, spread = 900, up = 1300, seed = 3, life = 2.4 } = {}) {
    if (t < t0 || t > t0 + life) return
    const R = rng(seed), d = t - t0
    for (let i = 0; i < n; i++) {
      const vx = (R() - 0.5) * spread, vy = -(0.4 + R() * 0.6) * up, rot = R() * 6, sz = 18 + R() * 16
      const px = cx + vx * d, py = cy + vy * d + 1500 * d * d
      if (py > 2000) continue
      x.save(); x.translate(px, py); x.rotate(rot + d * 6)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, sz * 0.62, 0, TAU); x.fill()
      x.fillStyle = '#fff4d0'; for (const [ox, oy] of [[-0.25, -0.1], [0.22, -0.18], [0, 0.2]]) { x.beginPath(); x.arc(ox * sz, oy * sz, sz * 0.36, 0, TAU); x.fill() }
      x.fillStyle = '#f5c75a'; x.beginPath(); x.arc(0.05 * sz, 0.05 * sz, sz * 0.12, 0, TAU); x.fill()
      x.restore()
    }
  },
  /** striped popcorn tub */
  tub(x, cx, cy, s = 1) {
    x.save(); x.translate(cx, cy); x.scale(s, s)
    x.fillStyle = '#fff4d0'; for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(-34 + i * 11, -40 - (i % 2) * 8, 14, 0, TAU); x.fill() }
    x.beginPath(); x.moveTo(-42, -38); x.lineTo(42, -38); x.lineTo(32, 40); x.lineTo(-32, 40); x.closePath()
    x.fillStyle = BONE; x.fill(); x.lineWidth = 6; x.strokeStyle = INK; x.stroke()
    x.save(); x.clip(); x.fillStyle = '#e04a5f'; for (let i = -3; i <= 3; i += 2) x.fillRect(i * 12 - 6, -40, 12, 82); x.restore()
    x.restore()
  },
  /** a pixel heart */
  heart(x, cx, cy, s, col = ROSE, { alpha = 1, rot = 0, outline = true } = {}) {
    if (s <= 0.5) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= alpha
    const path = () => { x.beginPath(); x.moveTo(0, s * 0.35); x.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.45, -s * 1.05, 0, -s * 0.45); x.bezierCurveTo(s * 0.45, -s * 1.05, s * 1.1, -s * 0.35, 0, s * 0.35); x.closePath() }
    if (outline) { path(); x.lineWidth = Math.max(4, s * 0.16); x.strokeStyle = INK; x.stroke() }
    path(); x.fillStyle = col; x.fill()
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.arc(-s * 0.38, -s * 0.42, s * 0.14, 0, TAU); x.fill()
    x.restore()
  },
  /** floating hearts rising since t0 */
  hearts(x, t, t0, cx, cy, { n = 10, spread = 500, seed = 5, life = 3, col = ROSE, size = 30 } = {}) {
    if (t < t0) return
    const R = rng(seed)
    for (let i = 0; i < n; i++) {
      const born = t0 + R() * life * 0.6, d = t - born, ox = (R() - 0.5) * spread, sp = 120 + R() * 160, sz = size * (0.6 + R() * 0.8)
      if (d < 0 || d > life) continue
      P.heart(x, cx + ox + Math.sin(d * 3 + i) * 30, cy - d * sp, sz * pop01(t, born, 0.3), col, { alpha: 1 - prog(d, life * 0.7, life) })
    }
  },
  /** rose-tinted heart glasses (for a sign) */
  glasses(x, cx, cy, s, { alpha = 1, rot = 0 } = {}) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= alpha
    x.lineWidth = s * 0.07; x.strokeStyle = INK
    x.beginPath(); x.moveTo(-s * 0.18, -s * 0.05); x.quadraticCurveTo(0, -s * 0.16, s * 0.18, -s * 0.05); x.stroke()
    for (const sx of [-1, 1]) P.heart(x, sx * s * 0.36, 0, s * 0.3, 'rgba(255,120,170,0.82)')
    x.restore()
  },
  /** a dream/thought cloud; inner(x) drawn clipped inside */
  thought(x, cx, cy, w, h, inner, { k = 1, from = null, edge = true } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const blobs = [[0, 0, 0.5, 0.5]]
    const shape = (ins) => {
      x.beginPath()
      const n = 12
      for (let i = 0; i < n; i++) { const a = i / n * TAU; x.moveTo(Math.cos(a) * w * 0.44 + w * 0.13 + ins, Math.sin(a) * h * 0.4); x.arc(Math.cos(a) * w * 0.44, Math.sin(a) * h * 0.4, w * 0.13 + ins, 0, TAU) }
      x.rect(-w * 0.45, -h * 0.42, w * 0.9, h * 0.84)
    }
    x.fillStyle = INK; shape(8); x.fill()
    x.fillStyle = '#f4f0ff'; shape(0); x.fill()
    x.save(); x.beginPath(); x.roundRect(-w * 0.44, -h * 0.4, w * 0.88, h * 0.8, 30); x.clip()
    if (inner) inner(x, w * 0.88, h * 0.8)
    x.restore()
    x.restore()
    if (from) for (let i = 0; i < 3; i++) {
      const q = (i + 1) / 4, r = (10 + i * 8) * k
      const px = lerp(from[0], cx, q * 0.75), py = lerp(from[1], cy + h * 0.45, q * 0.75)
      x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 6, 0, TAU); x.fill(); x.fillStyle = '#f4f0ff'; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
    }
    void blobs; void edge
  },
  /** a phone with chat bubbles. msgs: [{ at, side: 'L'|'R', text }] */
  phone(x, t, cx, cy, { w = 520, h = 820, msgs = [], title = 'messages', k = 1, rot = 0, typingAt = null } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    P.box(x, 0, 0, w + 36, h + 36, '#15112e', { r: 60, lw: 8 })
    x.fillStyle = '#231c4a'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 44); x.fill()
    x.fillStyle = '#0b0818'; x.beginPath(); x.roundRect(-70, -h / 2 + 16, 140, 30, 15); x.fill()
    x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 82)
    let y = -h / 2 + 140
    const shown = msgs.filter(m => t >= m.at)
    for (const m of shown) {
      const p = pop01(t, m.at, 0.25, 2)
      x.font = `700 32px ${INTER}`
      const lines = wrap(x, m.text, w - 150)
      const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 44, bh = lines.length * 40 + 30
      const bx = m.side === 'R' ? w / 2 - 24 - bw : -w / 2 + 24
      x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(p, p)
      x.fillStyle = m.side === 'R' ? NEP : '#efe6ff'; x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 22); x.fill()
      x.fillStyle = m.side === 'R' ? '#fff' : INK; x.textAlign = 'left'
      lines.forEach((l, i) => x.fillText(l, -bw / 2 + 22, -bh / 2 + 34 + i * 40))
      x.restore()
      y += bh + 18
    }
    if (typingAt != null && t >= typingAt) {
      x.fillStyle = '#efe6ff'; x.beginPath(); x.roundRect(-w / 2 + 24, y, 120, 54, 22); x.fill()
      for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.35 + 0.65 * Math.max(0, Math.sin(t * 8 - i)); x.beginPath(); x.arc(-w / 2 + 56 + i * 28, y + 27, 8, 0, TAU); x.fill() }
      x.globalAlpha = 1
    }
    x.restore()
  },
  /** a sparkly burst of pixel stars since t0 */
  sparkle(x, t, t0, cx, cy, { n = 10, dist = 220, life = 0.9, col = '#fff6dc', seed = 2, size = 22 } = {}) {
    if (t < t0 || t > t0 + life) return
    const R = rng(seed), d = prog(t, t0, t0 + life)
    for (let i = 0; i < n; i++) { const a = R() * TAU, r = dist * (0.4 + R() * 0.6) * ease.outCubic(d); drawPixelStar(x, cx + Math.cos(a) * r, cy + Math.sin(a) * r, size * (1 - d), 1, col) }
  },
  /** speed lines from the edges toward (cx, cy) */
  speed(x, t, cx, cy, { a = 1, n = 40, seed = 8, col = '#ffffff' } = {}) {
    if (a <= 0.01) return
    const R = rng(seed)
    x.save(); x.strokeStyle = rgba(col, 0.6 * a); x.lineCap = 'round'
    for (let i = 0; i < n; i++) {
      const ang = R() * TAU, r0 = 600 + R() * 500, len = 200 + R() * 300, ph = (t * 3 + R()) % 1
      const r1 = r0 - ph * 300
      x.lineWidth = 3 + R() * 6
      x.beginPath(); x.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1); x.lineTo(cx + Math.cos(ang) * (r1 + len), cy + Math.sin(ang) * (r1 + len)); x.stroke()
    }
    x.restore()
  },
  /** a sticker label (tilted pill) */
  sticker(x, text, cx, cy, { k = 1, rot = -0.05, col = GOLD, size = 40, fg = INK } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.font = `800 ${size}px ${INTER}`
    const w = x.measureText(text).width + 50, h = size + 34
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 + 6, -h / 2 + 8, w, h, 18); x.fill()
    x.fillStyle = col; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 18); x.fill()
    x.lineWidth = 5; x.strokeStyle = INK; x.stroke()
    x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
    x.restore()
  },
  wrap: (x, text, maxW) => wrap(x, text, maxW),
}
function wrap(x, text, maxW) {
  const words = String(text).split(' '), lines = ['']
  for (const w of words) {
    const tryL = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + w : w
    if (x.measureText(tryL).width > maxW && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = tryL
  }
  return lines
}

// ─────────────────────────────────────────────── Pisces' front-row cinema-seat bubble
export function pisSeat(x, t, { x: cx = 910, y: cy = 560, r = 122, tears = 2, mood = 'sparkle', k = 1, hops } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  // glass bubble
  x.fillStyle = 'rgba(20,14,52,0.72)'; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill()
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip()
  // seat back
  x.fillStyle = '#9e1f3c'; x.beginPath(); x.roundRect(cx - r * 0.62, cy - r * 0.35, r * 1.24, r * 1.3, 24); x.fill()
  x.fillStyle = '#c2304f'; x.beginPath(); x.roundRect(cx - r * 0.5, cy - r * 0.25, r * 1.0, r * 1.1, 20); x.fill()
  drawSign(x, 'pisces', cx, cy + r * 0.05, r * 1.15, t, { mood, tears, look: [-0.6, -0.2], seed: 12, glow: 0.7, hops })
  P.tub(x, cx + r * 0.42, cy + r * 0.62, r / 160)
  // big readable tears: two jets of drops arcing out from the eyes (level 1 drips, 2 streams, 3 fountains)
  if (tears > 0) {
    const n = tears >= 3 ? 9 : tears >= 2 ? 6 : 3, sp = tears >= 3 ? 1.5 : tears >= 2 ? 1.05 : 0.5
    for (const sd of [-1, 1]) for (let i = 0; i < n; i++) {
      const ph = ((t * 1.6 + i / n) % 1)
      const ex = cx + sd * r * 0.2, ey = cy - r * 0.02
      const dx = ex + sd * ph * r * 0.75 * sp, dy = ey - Math.sin(ph * Math.PI) * r * 0.32 * sp + ph * ph * r * 0.9
      const rr = r * 0.06 * (1 - ph * 0.4)
      x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, rr + 3, 0, TAU); x.fill()
      x.fillStyle = '#8fe3ff'; x.beginPath(); x.arc(dx, dy, rr, 0, TAU); x.fill()
    }
  }
  x.restore()
  x.lineWidth = 7; x.strokeStyle = 'rgba(239,230,214,0.85)'; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke()
  x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(cx, cy, r * 0.8, -2.5, -1.7); x.stroke()
  x.restore()
}

// ─────────────────────────────────────────────── the bug
function buildBug(root, label) {
  const box = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none', zIndex: 5 }, root)
  el('div', { width: '22px', height: '22px', borderRadius: '50%', background: NEP, boxShadow: `0 0 14px ${NEP}` }, box)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: BONE, fontVariant: 'small-caps', textShadow: '0 2px 10px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, box, label.replace(/ /g, '&nbsp;'))
  return box
}

// ─────────────────────────────────────────────── poses
const POSE_KEYS = ['x', 'y', 'size', 'rot', 'alpha']
function poseAt(shots, key, t, tr = 0.4) {
  let i = shots.findIndex(s => t >= s.a && t < s.b)
  if (i < 0) i = t < shots[0].a ? 0 : shots.length - 1
  const cur = shots[i][key]
  if (!cur) return null
  const prev = i > 0 ? shots[i - 1][key] : null
  const k = prev && shots[i].cut !== true ? ease.inOutCubic(prog(t, shots[i].a, shots[i].a + (shots[i].tr ?? tr))) : 1
  const out = { ...cur }
  if (prev && k < 1) for (const kk of POSE_KEYS) if (prev[kk] != null && cur[kk] != null) out[kk] = lerp(prev[kk], cur[kk], k)
  return { ...out, i }
}

// ─────────────────────────────────────────────── the episode
export function episode(spec) {
  const D = spec.duration
  const shots = spec.shots
  const lines = (spec.lines || []).map(l => ({ size: 50, maxW: 760, cps: 30, ...l }))
  const nepLines = lines.filter(l => l.who === 'neptune').map(l => ({ t: l.t0, who: 'neptune', text: l.text }))
  const signHops = lines.filter(l => l.who === spec.sign).flatMap(l => { const n = Math.min(6, Math.ceil(l.text.length / 12)); return Array.from({ length: n }, (_, i) => l.t0 + 0.1 + i * 0.42) })
  const pisHops = lines.filter(l => l.who === 'pisces').map(l => l.t0 + 0.1)
  const IN = spec.entrance ? { ...spec.entrance } : null
  const land = IN ? entrance(IN.kind, 0, IN).land : -1
  const HOOK = { at: -1, top: 250, size: 112, ...spec.hook }
  const CAPS = (spec.caps || []).map(c => ({ top: 250, size: 104, ...c }))
  const FX = spec.fx || []
  const REC = FX.filter(f => f.kind === 'rec')

  async function build(stage) {
    try { await Promise.all(['800 60px Inter', '700 30px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07041a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const bug = buildBug(root, spec.bug || 'PLANET TALK')
    return {
      start: 0, end: D + 1, root,
      update(t) {
        let i = shots.findIndex(s => t >= s.a && t < s.b); if (i < 0) i = t < shots[0].a ? 0 : shots.length - 1
        const sh = shots[i]
        const nep = poseAt(shots, 'nep', t), sg = poseAt(shots, 'sign', t)
        const S = { t, u: prog(t, sh.a, sh.b), a: sh.a, b: sh.b, i, nep, sign: sg, spec, x }
        x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.filter = 'none'
        if (sh.bg) sh.bg(x, t, S); else drawSpace(x, t, { planet: 'neptune', seed: 3 + i, horizon: sh.horizon ? { y: sh.horizon } : null })
        if (sh.back) sh.back(x, t, S)
        // Neptune
        if (nep) {
          let px = nep.x, py = nep.y, ps = nep.size, rot = nep.rot ?? 0, squash = 0, alpha = nep.alpha ?? 1
          const entering = IN && i === 0 && t < land + 0.5
          if (entering) {
            const E = entrance(IN.kind, t, IN)
            const mix = ease.inOutCubic(prog(t, land, land + 0.5))
            px = lerp(E.x, nep.x, mix); py = lerp(E.y, nep.y, mix); ps = lerp(E.size, nep.size, mix); rot = E.rot ?? 0; squash = E.squash ?? 0; alpha = E.alpha ?? 1
          }
          const draw = () => {
            if (entering) drawEntranceFx(x, 'neptune', IN.kind, t, IN)
            drawPlanet(x, 'neptune', px, py, ps, t, {
              rot, squash, alpha, mood: step(nep.mood, t, 'love'), roseGlasses: !!step(nep.glasses, t, false), tears: step(nep.tears, t, 0),
              lines: nepLines, cps: 30, seed: 9, look: step(nep.look, t, undefined), hops: nep.hops,
            })
          }
          if (sh.horizon) aboveHorizon(x, sh.horizon, draw); else draw()
        }
        if (sh.mid) sh.mid(x, t, S)
        if (sg) {
          drawSign(x, spec.sign, sg.x, sg.y, sg.size, t, {
            mood: step(sg.mood, t, 'neutral'), look: step(sg.look, t, undefined), tears: step(sg.tears, t, 0), hops: signHops,
            seed: 4, shadow: sg.shadow ?? false, squash: sg.squash ?? 0, alpha: sg.alpha ?? 1, rot: sg.rot,
          })
          if (sg.glasses && step(sg.glasses, t, false)) P.glasses(x, sg.x, sg.y - sg.size * 0.02, sg.size * 0.62)
        }
        if (sh.front) sh.front(x, t, S)
        // Pisces' seat
        if (sh.pis !== false && spec.seat !== false) {
          const pp = { ...(spec.pis || {}), ...(sh.pis || {}) }
          pisSeat(x, t, { ...pp, tears: step(spec.cry, t, 2), mood: step(spec.pisMood, t, 'sparkle'), hops: pisHops, k: pp.k ?? 1 })
        }
        for (const l of lines) speech(x, t, l)
        if (spec.over) spec.over(x, t, S)
        bug.style.display = 'flex'
        drawGrain(gx, t)
      },
    }
  }

  const main = REC.length ? frozen(build, REC) : build
  const scenes = [main]
  const cues = []
  for (const f of FX) {
    const o = { ...f }
    if (f.kind === 'whip') { scenes.push(whipZoom(o)); cues.push(...whipZoomCues(o)) }
    if (f.kind === 'rec') { scenes.push(recordScratch(o)); cues.push(...recordScratchCues(o)) }
    if (f.kind === 'glitch') { scenes.push(glitch(o)); cues.push(...glitchCues(o)) }
    if (f.kind === 'shake') { scenes.push(screenShake(o)); cues.push(...shakeCues(o)) }
    if (f.kind === 'caught') { scenes.push(caught(o)); cues.push(...caughtCues(o)) }
    if (f.kind === 'chapter') { scenes.push(chapter(o)); cues.push(...chapterCues(o)) }
    if (f.kind === 'notif') { scenes.push(notification(o)); cues.push(...notificationCues(o)) }
    if (f.kind === 'loading') { scenes.push(loadingBar(o)); cues.push(...loadingBarCues(o)) }
  }
  scenes.push(slamTitle(HOOK)); cues.push(...slamTitleCues(HOOK).map(c => (c[1] < 0 ? null : c)).filter(Boolean))
  for (const c of CAPS) { scenes.push(slamTitle(c)); cues.push(...slamTitleCues(c)) }
  if (spec.ending === 'loop') { scenes.push(loopBack([build, slamTitle(HOOK)], { duration: D, len: spec.loopLen ?? 0.45 })); cues.push(...loopCues({ duration: D, len: spec.loopLen ?? 0.45 })) }
  if (IN) cues.push(...entranceCues(IN.kind, IN).filter(c => c[1] >= 0))
  cues.push(...speechCues(lines))
  // Pisces sobs: a wobbly falling pluck each time the tears go up
  let prevLv = 0
  for (const [tt, lv] of spec.cry || []) { if (lv > prevLv && tt > 0) cues.push(['pluck', +tt.toFixed(2), 1046.5, 0.03, 0.5, 0.35], ['pluck', +(tt + 0.14).toFixed(2), 880, 0.028, 0.5, 0.35], ['pluck', +(tt + 0.3).toFixed(2), 698.46, 0.026, 0.6, 0.35]); prevLv = lv }
  cues.push(...(spec.cues || []))
  const CUES = cues.filter(c => c && c[1] >= 0 && c[1] <= D).sort((a, b) => a[1] - b[1])
  return { DURATION: D, SCENES: scenes, CUES }
}
