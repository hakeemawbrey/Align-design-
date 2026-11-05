// GUESS THE SIGN — the shared look of the m30 batch (kgse01–kgse24, star_advice trial reels). Owned by kgse01; the
// other 23 films import it read-only:  import { makeGuess, makeGuessLong, ... } from '../../kgse01/scenes/guesskit.js'
//
// The format: a game-show stage at night. A black SILHOUETTE of a sign star (rim light, a big "?" on its chest) is caught
// mid-action doing one relatable thing. Clue chips drop in, a 3·2·1 countdown runs, and the silhouette floods with its
// colour, glyph and name slam. One warm last line, then a seamless loop back to frame 0 (or a hard cut on the line).
// Pisces is the contestant at the buzzer (bottom right), crying in every film; it always buzzes "PISCES?".
// No end card, no card cut, no logo. Everything is canvas, a pure function of t.
//
//   makeGuess(cfg) → { DURATION, SCENES, CUES, T }                       (short, 6–12 s)
//     cfg.id, cfg.sign ('virgo'), cfg.D (seconds), cfg.ending 'loop' | 'cut'
//     cfg.hook   the frame-0 line, ≤ 7 words: '*' accents, '|' forces a break
//     cfg.brk    the first-second pattern break: 'scratch' | 'whip' | 'flash' | 'silence'  (at T.brk, ≈ 0.35 s)
//     cfg.draw(x, S)   the action. S = { t, u (scene time: frozen during a scratch / silence), rv (0…1 reveal),
//                      sil(o) draws THE hero (silhouette → revealed), star(sign, o) a normal star, D, R, ... }
//     cfg.bg(x, S)     optional backdrop instead of the stage (sky is always under it)
//     cfg.clues  ['a label maker', 'a 14-step checklist'] (1 or 2)
//     cfg.last   the last line ('*' accents)    cfg.pisLine  the contestant's buzz line (default 'PISCES?')
//     cfg.cues   [[kind, t, ...]] the action's own sound cues (absolute t)
//   makeGuessLong(cfg) → the same, 60 s, six rounds: cfg.rounds = [{ sign, title, draw, clues, last, cues }] × 6.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, glitch, glitchCues, countdown, countdownCues, chapter, chapterCues, loopBack, loopCues } from '../../hookkit.js'
export { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, glitch, glitchCues, countdown, countdownCues, chapter, chapterCues, loopBack, loopCues }

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', CYAN = '#7fe3ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SIL = '#0a0614', RIM = '#7fe3ff'
export const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const wob = (t, f = 6, a = 1) => a * Math.sin(t * f)
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ─────────────────────────────────────────────── drawing helpers (canvas, pixel-chunky)
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 200, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
export function confetti(x, t, t0, cx, cy, { n = 30, life = 2.0, cols = [GOLD, PINK, CYAN, MINT, BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.6, v = 560 + 280 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 700 * tt * tt, sz = 12 + (i % 3) * 4
    x.fillStyle = cols[i % cols.length]; x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble popping at t0, gone by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4); x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a chunky phone, centred, screen drawn by fn(x, w, h) in screen-local coords (0,0 top-left) */
export function phone(x, cx, cy, { w = 200, h = 360, rot = 0, scr = '#14102a', fn = null, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 7 })
  const sw = w - 24, sh = h - 44
  R(x, scr, -sw / 2, -sh / 2 + 4, sw, sh)
  if (fn) { x.save(); x.translate(-sw / 2, -sh / 2 + 4); x.beginPath(); x.rect(0, 0, sw, sh); x.clip(); fn(x, sw, sh); x.restore() }
  R(x, '#14102a', -18, -h / 2 + 8, 36, 7)
  x.restore()
}
/** a chat bubble inside a phone screen (left = them, right = me) */
export function chat(x, text, X, Y, { me = false, w = 0, size = 22, col } = {}) {
  x.font = `700 ${size}px ${INTER}`
  const tw = Math.max(w, x.measureText(text).width + 26), h = size + 18
  const bx = me ? X - tw : X
  R(x, col || (me ? '#7c74f0' : '#3a3160'), bx, Y, tw, h)
  x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, bx + 13, Y + h / 2 + 1)
  return h
}
/** tears from a star's eyes; o is the drawStarChar opts used for it (x, y, s) */
export function tears(x, t, o, k = 2) {
  const s = o.s, ex = [o.x - s * 0.21, o.x + s * 0.21], ey = o.y - s * 0.02 + Math.sin(t * 2.2 + (o.seed || 1) * 2.1) * s * 0.035
  const n = k >= 3 ? 7 : k >= 2 ? 4 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.8, cell = Math.max(5, s / 17)
  for (const [i, X] of ex.entries()) {
    const d = i ? 1 : -1
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + i * 0.13) % 1 + 1) % 1
      const px = k >= 3 ? X + d * s * 0.42 * ph : X + d * s * 0.06 * ph, py = k >= 3 ? ey - s * 0.12 * ph + s * 0.7 * ph * ph : ey + s * 0.5 * ph * ph
      R(x, INK, px - cell * 0.2, py - cell * 0.2, cell * 1.4, cell * 1.8); R(x, '#8fe3ff', px, py, cell, cell * 1.4); R(x, '#ffffff', px, py, cell * 0.45, cell * 0.45)
    }
    R(x, '#8fe3ff', X - s * 0.08, ey + s * 0.05, s * 0.16, cell * 0.8)
  }
}

// ─────────────────────────────────────────────── rich text on canvas: '*accent*' words (serif italic), '|' breaks
function tokens(text) {
  const out = []
  for (const part of text.split('|')) {
    if (out.length) out.push({ br: true })
    for (const m of part.trim().matchAll(/\*([^*]+)\*|(\S+)/g)) {
      if (m[1]) for (const w of m[1].split(/\s+/)) out.push({ w, acc: true })
      else out.push({ w: m[2], acc: false })
    }
  }
  return out
}
/** lays out and draws rich text centred on cx, top at y; returns the block height. k = scale pop, alpha */
export function richText(x, text, cx, y, { size = 84, acc = 1.3, width = 940, col = BONE, accCol = GOLD, weight = 800, lh = 1.06, k = 1, alpha = 1, shadowCol = 'rgba(6,4,18,0.9)', draw = true } = {}) {
  const tk = tokens(text), lines = [[]]
  const fontOf = tok => tok.acc ? `italic 600 ${Math.round(size * acc)}px ${SERIF}` : `${weight} ${size}px ${INTER}`
  const sp = size * 0.26
  let fit = 1
  for (let pass = 0; pass < 6; pass++) {
    lines.length = 0; lines.push([])
    let lw = 0
    for (const tok of tk) {
      if (tok.br) { lines.push([]); lw = 0; continue }
      x.font = fontOf(tok).replace(/(\d+)px/, (_, n) => `${Math.round(n * fit)}px`)
      const w = x.measureText(tok.w).width
      if (lw > 0 && lw + sp * fit + w > width) { lines.push([]); lw = 0 }
      lines[lines.length - 1].push({ ...tok, w0: w }); lw += (lw > 0 ? sp * fit : 0) + w
    }
    const widest = Math.max(...lines.map(l => l.reduce((a, b, i) => a + b.w0 + (i ? sp * fit : 0), 0)))
    if (lines.length <= 3 && widest <= width) break
    fit *= 0.9
  }
  const lineH = size * fit * lh * 1.12
  if (!draw) return lines.length * lineH
  x.save(); x.globalAlpha *= alpha
  x.translate(cx, y + lines.length * lineH / 2); x.scale(k, k); x.translate(-cx, -(y + lines.length * lineH / 2))
  x.textBaseline = 'alphabetic'; x.textAlign = 'left'
  lines.forEach((l, j) => {
    const lw = l.reduce((a, b, i) => a + b.w0 + (i ? sp * fit : 0), 0)
    let X = cx - lw / 2
    const Y = y + (j + 0.82) * lineH
    for (const tok of l) {
      x.font = fontOf(tok).replace(/(\d+)px/, (_, n) => `${Math.round(n * fit)}px`)
      x.lineWidth = Math.max(6, size * fit * 0.14); x.lineJoin = 'round'; x.strokeStyle = INK
      x.fillStyle = shadowCol; x.fillText(tok.w, X + 4, Y + 6)
      x.strokeText(tok.w, X, Y)
      x.fillStyle = tok.acc ? accCol : col; x.fillText(tok.w, X, Y)
      X += tok.w0 + sp * fit
    }
  })
  x.restore()
  return lines.length * lineH
}

// ─────────────────────────────────────────────── the silhouette renderer (offscreen boxes, made in build)
function makeSil() {
  const A = document.createElement('canvas'), K = document.createElement('canvas'), M = document.createElement('canvas')
  const a = A.getContext('2d'), k = K.getContext('2d'), m = M.getContext('2d')
  const size = B => { if (A.width !== B) for (const c of [A, K, M]) { c.width = B; c.height = B } }
  const render = (ctx, B, t, o, glow, glyph) => {
    ctx.clearRect(0, 0, B, B); ctx.save(); ctx.translate(B / 2, B / 2); ctx.rotate(o.rot || 0); ctx.scale(o.flip ? -1 : 1, 1)
    drawStarChar(ctx, 0, 0, o.s, t, { ...o, glow, glyph, tips: glow > 0 && o.tips !== false })
    ctx.restore()
  }
  const tint = (dst, col) => { dst.globalCompositeOperation = 'source-over'; dst.clearRect(0, 0, A.width, A.width); dst.drawImage(K, 0, 0); dst.globalCompositeOperation = 'source-in'; dst.fillStyle = col; dst.fillRect(0, 0, A.width, A.width); dst.globalCompositeOperation = 'source-over' }
  /** draws the star at o (x, y, s, mood, hops, rot, squash, ...) as a silhouette blended to its colours by rv */
  return function sil(x, t, o, rv, { color, glyph, rim = RIM, q = 1 } = {}) {
    const B = Math.ceil(o.s * 1.9 / 2) * 2
    size(B)
    const X = o.x - B / 2, Y = o.y - B / 2
    const base = { ...o, color, look: o.look || [0, 0] }
    if (rv < 1) {
      render(k, B, t, { ...base, blink: false }, 0, null)
      tint(m, rim)
      x.save(); x.globalAlpha *= (1 - rv) * 0.95
      for (const [dx, dy] of [[-7, -6], [6, -4], [0, 7]]) x.drawImage(M, X + dx, Y + dy)
      x.restore()
    }
    if (rv > 0) { render(a, B, t, base, 1.1, glyph); x.drawImage(A, X, Y) }
    if (rv < 1) {
      tint(m, SIL)
      x.save(); x.globalAlpha *= (1 - rv); x.drawImage(M, X, Y); x.restore()
      // the big "?" on the chest
      if (q > 0) {
        x.save(); x.globalAlpha *= (1 - rv) * q; x.translate(o.x, o.y + o.s * 0.08); x.rotate(o.rot || 0)
        const pulse = 1 + 0.06 * Math.sin(t * 9)
        x.scale(pulse, pulse); x.font = `900 ${Math.round(o.s * 0.42)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = rim; x.shadowColor = rim; x.shadowBlur = 24; x.fillText('?', 0, 0); x.restore()
      }
    }
  }
}

// ─────────────────────────────────────────────── the stage (default backdrop)
const BULB = (x, cx, cy, on) => { R(x, INK, cx - 9, cy - 9, 18, 18); R(x, on ? '#fff3c4' : '#6a5a3a', cx - 6, cy - 6, 12, 12); if (on) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,220,140,0.18)'; x.beginPath(); x.arc(cx, cy, 22, 0, Math.PI * 2); x.fill(); x.restore() } }
export function drawStage(x, t, { hue = '#3a1f6e', spot = 1, flash = 0, beam = [540, 1180] } = {}) {
  // back wall glow
  const g = x.createRadialGradient(540, 980, 60, 540, 980, 900); g.addColorStop(0, 'rgba(120,70,200,0.35)'); g.addColorStop(1, 'rgba(10,6,20,0)')
  x.fillStyle = g; x.fillRect(0, 300, 1080, 1300)
  // giant marquee "?" arch of bulbs
  const N = 26
  for (let i = 0; i <= N; i++) {
    const a = Math.PI + (i / N) * Math.PI, X = 540 + Math.cos(a) * 470, Y = 1010 + Math.sin(a) * 520
    BULB(x, X, Y, ((i + Math.floor(t * 8)) % 3) !== 0)
  }
  // floor
  R(x, INK, 0, 1250, 1080, 8)
  const fg = x.createLinearGradient(0, 1258, 0, 1920); fg.addColorStop(0, hue); fg.addColorStop(1, '#0d0820')
  x.fillStyle = fg; x.fillRect(0, 1258, 1080, 662)
  for (let i = 0; i < 9; i++) { x.fillStyle = 'rgba(255,255,255,0.05)'; x.beginPath(); x.moveTo(540, 1258); x.lineTo(i * 135 - 60, 1920); x.lineTo(i * 135 - 20, 1920); x.closePath(); x.fill() }
  // the spotlight cone onto the hero
  if (spot > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const [bx, by] = beam
    const cg = x.createLinearGradient(0, 300, 0, by); cg.addColorStop(0, `rgba(255,236,190,${0.04 * spot})`); cg.addColorStop(1, `rgba(255,236,190,${0.2 * spot})`)
    x.fillStyle = cg; x.beginPath(); x.moveTo(bx - 40, 300); x.lineTo(bx + 40, 300); x.lineTo(bx + 260, by); x.lineTo(bx - 260, by); x.closePath(); x.fill()
    x.fillStyle = `rgba(255,236,190,${0.24 * spot})`; x.beginPath(); x.ellipse(bx, by, 260, 34, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  if (flash > 0) { x.save(); x.globalAlpha = flash; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
}

// the contestant podium + Pisces (bottom right). state: tears 1…3, buzz times, line, mood
const PIS = signStar('pisces')
function podium(x, t, cx, cy, { buzzAt = [], away = false } = {}) {
  // buzzer dome
  const pressed = buzzAt.some(b => t >= b && t < b + 0.18)
  const dy = pressed ? 8 : 0
  box(x, cx - 40, cy - 98, 80, 18, '#4a4060', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy - 98 + dy, 40, 30, 0, Math.PI, 0); x.fill()
  x.fillStyle = pressed ? '#ff6b7f' : RED; x.beginPath(); x.ellipse(cx, cy - 100 + dy, 33, 24, 0, Math.PI, 0); x.fill()
  R(x, '#ff9aa8', cx - 16, cy - 116 + dy, 12, 6)
  // podium block
  box(x, cx - 110, cy - 80, 220, 170, '#5a3fa0', { b: 7, hi: '#7d63c8' })
  R(x, GOLD, cx - 110, cy - 32, 220, 10)
  x.font = `900 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = away ? BONE : GOLD
  x.fillText(away ? 'BRB' : '♓', cx, cy + 30)
  if (away) { x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.fillText('(tissues)', cx, cy + 70) }
}
/** Pisces behind the podium: returns the opts used (for tears / bubbles) */
export function contestant(x, t, { cx = 905, cy = 1640, tearsK = 1, mood = 'wide', hops = [], buzzAt = [], k = 1, away = false, look = [-1, -0.5] } = {}) {
  if (k <= 0.01) return null
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  let o = null
  if (!away) {
    o = { x: cx, y: cy - 215, s: 180, seed: 6 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: PIS.color, mood, look, seed: 6, glow: 0.8, hops, tips: false })
    tears(x, t, o, tearsK)
  }
  podium(x, t, cx, cy, { buzzAt, away })
  x.restore()
  return o
}

// ─────────────────────────────────────────────── chrome: bug, round timer, clue chips, countdown, name slam, last line
export function drawBug(x, text = 'GUESS THE SIGN', a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  R(x, INK, 52, 66, 26, 26); R(x, CYAN, 56, 70, 18, 18)
  x.font = `800 28px ${INTER}`; x.letterSpacing = '0.2em'; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, 96, 82); x.fillStyle = CYAN; x.fillText(text, 94, 80)
  x.letterSpacing = '0px'; x.restore()
}
/** top-right: a "?" disc whose ring drains until the reveal at R, then a tick */
export function drawTimer(x, t, t0, R0, a = 1) {
  if (a <= 0) return
  const cx = 984, cy = 82, r = 40, f = clamp(1 - prog(t, t0, R0))
  x.save(); x.globalAlpha *= a
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(239,230,214,0.2)'; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, r - 2, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = f < 0.3 ? RED : CYAN; x.beginPath(); x.arc(cx, cy, r - 2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * f); x.stroke()
  x.font = `900 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = t >= R0 ? MINT : BONE
  x.fillText(t >= R0 ? '✓' : '?', cx, cy + 2)
  x.restore()
}
/** a clue chip (tilted bone tag) popping at t0, sliding out at t1. slot 0/1 stacks them */
export function drawClue(x, t, t0, t1, n, text, slot = 0) {
  const k = pop01(t, t0, 0.3, 2.6) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  const cy = 1330 + slot * 108, cx = slot ? 400 : 360
  x.save(); x.translate(cx, cy); x.rotate(slot ? 0.035 : -0.04); x.scale(k, k)
  x.font = `800 40px ${INTER}`
  const w = Math.min(640, x.measureText(text).width) + 170, h = 84
  box(x, -w / 2, -h / 2, w, h, BONE, { b: 6 })
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 6, h / 2 + 6, w, 8)
  box(x, -w / 2 + 14, -h / 2 + 12, 116, h - 24, CYAN, { b: 4 })
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(`CLUE ${n}`, -w / 2 + 72, 2)
  x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.fillText(text, -w / 2 + 148, 3, 640)
  x.restore()
}
/** the 3·2·1 over the stage before the reveal at R0 (0.3 s per number) */
export function drawCountdown(x, t, R0, cy = 700) {
  const s = R0 - 0.9
  if (t < s || t >= R0) return
  const i = Math.floor((t - s) / 0.3), u = (t - s) / 0.3 - i
  const n = 3 - i, k = lerp(1.7, 1, ease.outCubic(Math.min(1, u * 2.5)))
  x.save(); x.globalAlpha = 1 - 0.6 * ease.inQuad(clamp((u - 0.6) / 0.4)); x.translate(540, cy); x.scale(k, k)
  x.font = `900 240px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = 22; x.lineJoin = 'round'; x.strokeStyle = INK; x.strokeText(String(n), 0, 0)
  x.fillStyle = [RED, GOLD, CYAN][i]; x.fillText(String(n), 0, 0)
  x.restore()
}
/** the reveal: "IT'S…" kicker + the sign's name, slamming in at R0 */
export function drawNameSlam(x, t, R0, sign, { cy = 300, a = 1 } = {}) {
  if (t < R0 || a <= 0) return
  const S = signStar(sign), nm = NAMES[sign].toUpperCase()
  const p = prog(t, R0, R0 + 0.16), sc = lerp(2.3, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - R0) * 7) * Math.sin((t - R0) * 38))
  x.save(); x.globalAlpha *= a * clamp(p * 3)
  x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.3em'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('IT’S…', 543, cy - 112); x.fillStyle = BONE; x.fillText('IT’S…', 540, cy - 115)
  x.letterSpacing = '0px'
  x.translate(540, cy); x.scale(sc, sc)
  let fs = 190
  x.font = `900 ${fs}px ${INTER}`
  const w = x.measureText(nm).width
  if (w > 960) { fs = Math.floor(fs * 960 / w); x.font = `900 ${fs}px ${INTER}` }
  x.lineWidth = 26; x.lineJoin = 'round'; x.strokeStyle = INK; x.strokeText(nm, 0, 6)
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(nm, 6, 14)
  x.fillStyle = S.color; x.fillText(nm, 0, 6)
  x.font = `600 ${Math.round(fs * 0.5)}px ${"'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"}`; x.fillStyle = BONE
  x.restore()
}
/** the last line: a bone sticker with a tiny gold star, popping at t0 */
export function drawLast(x, t, t0, text, { cy = 1420, cx = 400, a = 1 } = {}) {
  if (t < t0 || a <= 0) return
  const k = easeOutBack(prog(t, t0, t0 + 0.32), 2.4)
  const h = richText(x, text, 540, 0, { size: 54, acc: 1.25, width: 620, draw: false })
  const H = h + 56, W = 700
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(-0.012); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.7)', -W / 2 + 12, -H / 2 + 12, W, H)
  box(x, -W / 2, -H / 2, W, H, BONE, { b: 7 })
  drawPixelStar(x, -W / 2 + 10, -H / 2 + 8, 54, 2, GOLD)
  richText(x, text, 0, -h / 2, { size: 54, acc: 1.25, width: 620, col: INK, accCol: '#7a3fd0', shadowCol: 'rgba(0,0,0,0)' })
  x.restore()
}

// ─────────────────────────────────────────────── shared sound helpers
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export function roundCues({ R0, clueTs = [], buzzAt = [], lastAt }) {
  return [
    ...clueTs.flatMap(c => [['whoosh', r3(c - 0.06), 0.22, 0.03], ['pop', r3(c + 0.02), 1174.66, 0.045, -0.2], ['tick', r3(c + 0.04), 0.05]]),
    ...buzzAt.flatMap(b => [['pop', r3(b), 220, 0.09, 0.4], ['pop', r3(b + 0.06), 196, 0.07, 0.4], ['pop', r3(b + 0.3), 987.77, 0.03, 0.4]]),
    ['riser', r3(R0 - 0.9), r3(R0), 0.05],
    ['boom', r3(R0), 0.34], ['crash', r3(R0), { gain: 0.07, len: 1.6 }], ['bell', r3(R0 + 0.05), 1760, 0.035, 1.4, 0], ['glitter', r3(R0 + 0.04), r3(R0 + 0.7)],
    ['pop', r3(lastAt), 1318.51, 0.045, 0.1], ['pop', r3(lastAt + 0.07), 1760, 0.03, -0.1],
  ]
}

// ═══════════════════════════════════════════════════════════════════════════ the short episode
/** the first-second pattern break, built from the hook kit. Returns { wins (freeze windows), scenes, cues, draw(x, t) } */
export function patternBreak(kind, at, { caption = 'wait. *who is this?*', col = PINK } = {}) {
  if (kind === 'scratch') { const REC = { at, len: 0.9, caption, top: 1530 }; return { wins: [REC], scenes: [recordScratch(REC)], cues: recordScratchCues(REC) } }
  if (kind === 'silence') {
    const W = { at, len: 0.6 }
    return { wins: [W], scenes: [], cues: [['tapeStop', at, 0.3], ['tick', at, 0.06]],
      draw(x, t) { if (t < at || t >= at + 0.6) return; x.save(); x.globalAlpha = 0.4; x.fillStyle = '#000'; x.fillRect(0, 0, 1080, 1920); x.restore(); label(x, '…', 540, 1180, { size: 140, col: BONE, font: INTER, weight: 900 }) } }
  }
  if (kind === 'whip') { const WH = { at, len: 0.45, from: 1.55 }; return { wins: [], scenes: [whipZoom(WH)], cues: whipZoomCues(WH) } }
  if (kind === 'glitch') { const G = { at, len: 0.7, dialog: false, amp: 0.9 }; return { wins: [], scenes: [glitch(G)], cues: glitchCues(G) } }
  // flash: a colour flash + a screen shake
  const SH = { at, len: 0.45, amp: 26 }
  return { wins: [], scenes: [screenShake(SH)], cues: [...shakeCues(SH), ['pop', r3(at), 1567.98, 0.05, 0], ['boom', r3(at), 0.16]],
    draw(x, t) { if (t < at || t >= at + 0.18) return; x.save(); x.globalAlpha = 0.75 * (1 - (t - at) / 0.18); x.fillStyle = col; x.fillRect(0, 0, 1080, 1920); x.restore() } }
}

/** puts a ' | ' break near the middle of a hook (between words, never inside an *accent*) unless it has one */
export function splitHook(text) {
  if (text.includes('|')) return text
  const ws = text.split(' '); let inA = false; const ok = []
  ws.forEach((w, i) => { if (w.startsWith('*')) inA = true; if (!inA && i < ws.length - 1) ok.push(i); if (w.endsWith('*') || w.endsWith('*?') || /\*[.,!?…]*$/.test(w)) inA = false })
  const half = text.length / 2; let best = ok[0] ?? 0, bd = 1e9, acc = 0
  ws.forEach((w, i) => { acc += w.length + 1; if (ok.includes(i) && Math.abs(acc - half) < bd) { bd = Math.abs(acc - half); best = i } })
  return ws.slice(0, best + 1).join(' ') + ' | ' + ws.slice(best + 1).join(' ')
}

export function makeGuess(cfg) {
  const D = cfg.D, LOOP = cfg.ending !== 'cut'
  const R0 = r3(D - (LOOP ? 2.45 : 2.05))
  const C1 = r3(Math.max(2.2, Math.min(R0 - 1.9, D * 0.32)))
  const C2 = cfg.clues && cfg.clues.length > 1 ? r3(Math.min(C1 + 1.2, R0 - 1.15)) : null
  const BUZZ = r3((C2 ?? C1) + 0.55 < R0 - 1.0 ? (C2 ?? C1) + 0.55 : C1 + 0.5)
  const LAST = r3(R0 + 0.38)
  const BRK = cfg.brkAt ?? 0.35
  const LOOP_LEN = 0.42
  const PB = patternBreak(cfg.brk, BRK, { caption: cfg.scratchCap, col: cfg.flashCol })
  const T = { D, R: R0, C1, C2, BUZZ, LAST, BRK, LOOP, LOOP_LEN, wins: PB.wins }
  const HERO = signStar(cfg.sign)
  const isPis = cfg.sign === 'pisces'
  const pisLine = cfg.pisLine || (isPis ? 'IT’S ME?!' : 'PISCES?')
  const HOOK = { at: -1, text: splitHook(cfg.hook), top: cfg.hookTop || 165, size: cfg.hookSize || 96, out: [r3(R0 - 0.16), R0] }
  const CD = { at: r3(R0 - 0.9), from: 3, gap: 0.3, go: null, y: 960, color: GOLD }

  function frame(x, t, sil) {
    const u = t
    const rv = ease.outCubic(prog(t, R0, R0 + 0.28))
    let shx = 0, shy = 0
    const dR = t - R0; if (dR > 0 && dR < 0.5) { shx = 16 * Math.exp(-dR * 9) * Math.sin(dR * 70); shy = 12 * Math.exp(-dR * 9) * Math.cos(dR * 55) }
    const ss = ease.inOutCubic(prog(t, 0, 2.5))
    drawSky(x, t, { ...SKY_H, zoom: lerp(1.75, SKY_H.zoom, ss), dim: 0.5 })
    x.save(); x.translate(shx, shy)
    const S = {
      t, u, rv, D, R: R0, T, HERO,
      sil: (o, opt = {}) => sil(x, u, o, rv, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, ...opt }),
      star: (sign, o) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, u, { color: s.color, glyph: o.s >= 150 ? s.glyph : null, ...o }) },
    }
    if (cfg.bg) cfg.bg(x, S); else drawStage(x, u, { spot: 1 })
    if (t >= R0) {
      const p = ease.outCubic(prog(t, R0, R0 + 0.5))
      x.save(); x.globalCompositeOperation = 'lighter'
      const c = cfg.burst || [540, 980]
      const g = x.createRadialGradient(c[0], c[1], 20, c[0], c[1], 200 + 520 * p); g.addColorStop(0, HERO.color + 'aa'); g.addColorStop(1, HERO.color + '00')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      x.restore()
    }
    cfg.draw(x, S)
    confetti(x, t, R0 + 0.02, 540, 900)
    x.restore()
    // the contestant (Pisces, always crying)
    const pMood = t >= R0 ? (isPis ? 'sparkle' : 'wide') : t >= BUZZ ? 'squint' : 'wide'
    const P = contestant(x, t, { tearsK: t >= R0 ? 3 : 2, mood: pMood, hops: [BUZZ, R0 + 0.05, R0 + 0.5], buzzAt: [BUZZ], look: t >= R0 ? [-1, -1] : [-1, -0.6] })
    if (P) bubble(x, t, 860, 1250, BUZZ + 0.04, isPis ? D + 1 : R0, pisLine, { size: 34, col: isPis ? '#c8f5d4' : BONE, tail: 0.5, rot: 0.03 })
    if (P && !isPis && t >= R0 - 0.05 && t < R0 + 0.9) label(x, '✗', 1010, 1240, { size: 74, col: RED, font: INTER, weight: 900, alpha: outK(t, [R0 + 0.7, R0 + 0.9]) })
    // chrome
    drawNameSlam(x, t, R0, cfg.sign, { cy: 330 })
    drawClue(x, t, C1, R0 - 0.1, 1, cfg.clues[0], 0)
    if (C2 != null) drawClue(x, t, C2, R0 - 0.1, 2, cfg.clues[1], 1)
    drawLast(x, t, LAST, cfg.last, { cy: 1400 })
    drawBug(x)
    drawTimer(x, t, 0, R0)
    if (PB.draw) PB.draw(x, t)
    if (t >= R0 && t < R0 + 0.14) { x.save(); x.globalAlpha = 0.8 * (1 - (t - R0) / 0.14); x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }

  async function build(stage) {
    try { await Promise.all(['800 82px Inter', '900 190px Inter', 'italic 600 105px "EB Garamond"', '700 30px "Space Mono"', '800 28px Inter'].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const sil = makeSil()
    return { start: 0, end: D + 1, root, update(t) { frame(x, t, sil); drawGrain(gx, t) } }
  }

  // cfg.scenes: extra hook-kit overlays (e.g. caught()); cfg.scenes0: the ones visible at t = 0 (copied for the loop)
  const SCENES = [PB.wins.length ? frozen(build, PB.wins) : build, ...(cfg.scenes || []), slamTitle(HOOK), ...PB.scenes, countdown(CD),
    ...(LOOP ? [loopBack([build, ...(cfg.scenes0 || []), slamTitle(HOOK)], { duration: D, len: LOOP_LEN })] : [])]
  const CUES = [
    ['crash', 0, { gain: 0.06, len: 1.2 }], ['whoosh', 0, 0.3, 0.04],
    ...slamTitleCues({ ...HOOK, at: 0 }).filter(c => c[1] < 0.6).slice(0, 4),
    ...PB.cues,
    ...countdownCues(CD),
    ...roundCues({ R0, clueTs: [C1, ...(C2 != null ? [C2] : [])], buzzAt: [BUZZ], lastAt: LAST }),
    ...(LOOP ? loopCues({ duration: D, len: LOOP_LEN }) : []),
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
  ].filter(c => c[1] >= 0 && c[1] < D)
  return { DURATION: D, SCENES, CUES, T }
}

/** cues.js helper for the short films */
export function guessMusic(id, { style, key, seed, D, T, ending }) {
  return { id, duration: D, music: { style, key, seed, sections: { drop: r3(T.BRK + (T.wins.length ? T.wins[0].len : 0.45) + 0.05), lift: [T.R], outroAt: r3(D - (ending === 'cut' ? 0.9 : 1.2)) }, hits: [T.R] } }
}
void [el, LAV, MONO, STAR]
