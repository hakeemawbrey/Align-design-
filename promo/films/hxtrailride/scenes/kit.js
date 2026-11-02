// kit — small pure drawing + sound helpers shared by this film's scene (copied per film; no shared state).
//   R / bitmap / shade / rgba                       pixel rects, char-bitmaps, colour helpers
//   pop01 / outK / popOut / inW / bump / keyed / S_  timing helpers (pure f(t))
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue   the small stuff
//   makeFx(ctx) → { ono, sparkleRing, tears }      onomatopoeia, sparkle bursts, tear arcs
//   drawCardBack / drawTalkCard / drawAnswerCard    code-drawn app cards (no numerals on them)
//   SND                                             sound-cue helpers (pop runs, headline pops, sobs, womp, gasp…)
// Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const OUT = '#1a1030'
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', SUN = '#ffb347', SKYBLUE = '#7fd0f0', MINT = '#7dffb0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid

export const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
export function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k)))
  return '#' + c.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const inW = (t, a, b) => t >= a && t < b
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
export const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
/** a 0…1 window value: eases in over d after a, out over d before b */
export const win = (t, a, b, d = 0.25) => ease.outCubic(prog(t, a, a + d)) * (1 - ease.inCubic(prog(t, b - d, b)))

// ─────────────────────────────── the small stuff
export function drawBubble(ctx, x, y, w, h, { tail = 'down', tailX = 40, px = 5, fill = '#fffaf0', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(Math.round(x + 2 * px - o), Math.round(y - o), Math.round(w - 4 * px + 2 * o), Math.round(h + 2 * o))
    ctx.fillRect(Math.round(x - o), Math.round(y + 2 * px - o), Math.round(w + 2 * o), Math.round(h - 4 * px + 2 * o))
    ctx.fillRect(Math.round(x + px - o), Math.round(y + px - o), Math.round(w - 2 * px + 2 * o), Math.round(h - 2 * px + 2 * o))
  }
  step(px, OUT)
  const tx = x + tailX
  for (let k = 0; k < 4; k++) {
    const ty = tail === 'down' ? y + h + k * px : y - (k + 1) * px
    R(ctx, tx - (4 - k) * px * 0.5 - px, ty - (tail === 'down' ? px : 0), (4 - k) * px + 2 * px, px * 2, OUT)
  }
  for (let k = 0; k < 3; k++) {
    const ty = tail === 'down' ? y + h - px + k * px : y - k * px
    R(ctx, tx - (3 - k) * px * 0.5, ty, (3 - k) * px, px, fill)
  }
  step(0, fill)
  ctx.restore()
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..O..', '.OSO.', '.OSO.', 'OSWSO', 'OSSSO', '.OOO.'], { O: '#1f3a6e', S: '#7fd6ff', W: '#ffffff' }, x - 2.5 * px, y - 3 * px, px)
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}

// ─────────────────────────────── effects bound to a context
export function makeFx(x) {
  /** an onomatopoeia popping up and drifting, dark-outlined so it reads anywhere */
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 46, ticks = true, font = MONO, weight = 700 } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
    if (ticks) {
      const w = x.measureText(text).width / 2 + size * 0.3, q = prog(k, 0, 0.3)
      x.fillStyle = color; x.globalAlpha *= 1 - q
      for (const [dx, dy, a] of [[-w, -size * 0.45, -0.6], [w, -size * 0.45, 0.6], [-w - 6, size * 0.25, -2.6], [w + 6, size * 0.25, 2.6]]) {
        x.save(); x.translate(dx * (1 + 0.2 * q), dy); x.rotate(a); x.fillRect(-3, -size * 0.28, 6, size * 0.32); x.restore()
      }
    }
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, Rr, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  /** tears arcing out of both eyes from t0 to t1 (pure f(t)) */
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (110 + ((k * 37) % 5) * 24) * spread * size / 200, vy = -(150 + ((k * 53) % 4) * 36) * size / 200
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }
  /** horizontal speed streaks for a whip-pan (k 0…1 strength) */
  function streaks(t, k, { y0 = 300, y1 = 1500, n = 26, dir = 1 } = {}) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha = 0.55 * k
    for (let i = 0; i < n; i++) {
      const yy = y0 + ((i * 97.3) % (y1 - y0)), len = 200 + ((i * 53) % 5) * 90, xx = ((i * 211 + t * 4000 * dir) % 1400) - 160
      x.fillStyle = i % 3 ? 'rgba(239,230,214,0.5)' : 'rgba(242,199,92,0.5)'
      x.fillRect(Math.round(xx), Math.round(yy), len, 6)
    }
    x.restore()
  }
  return { ono, sparkleRing, tears, streaks }
}

// ─────────────────────────────── code-drawn app cards (no numerals)
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
function seedOfLife(x, cx, cy, r, col, lw = 3) {
  x.save(); x.strokeStyle = col; x.lineWidth = lw
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r, 0, Math.PI * 2); x.stroke() }
  x.beginPath(); x.arc(cx, cy, r * 2, 0, Math.PI * 2); x.stroke()
  x.restore()
}
/** a face-down card (the app's card back: deep violet, gold rim, the seed-of-life). (cx, cy) = centre, w = width */
export function drawCardBack(x, cx, cy, w, { rot = 0, sx = 1, alpha = 1 } = {}) {
  if (alpha <= 0 || Math.abs(sx) < 0.01) return
  const h = w * 1.55
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.save(); x.shadowColor = 'rgba(3,1,12,0.55)'; x.shadowBlur = 24; x.shadowOffsetY = 10
  rr(x, -w / 2, -h / 2, w, h, w * 0.08); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3a2178'); g.addColorStop(1, '#1a0d40'); x.fillStyle = g; x.fill(); x.restore()
  x.lineWidth = Math.max(3, w * 0.025); x.strokeStyle = GOLD; rr(x, -w / 2, -h / 2, w, h, w * 0.08); x.stroke()
  x.lineWidth = 1.5; x.strokeStyle = 'rgba(242,199,92,0.5)'; rr(x, -w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14, w * 0.04); x.stroke()
  seedOfLife(x, 0, -h * 0.05, w * 0.12, 'rgba(242,199,92,0.85)', Math.max(1.5, w * 0.012))
  x.restore()
}
/** a talk card face: "TALK CARD" header, the question in Garamond (| = line break, *…* = gold accent) */
export function drawTalkCard(x, cx, cy, w, question, { rot = 0, sx = 1, alpha = 1, glow = 1 } = {}) {
  if (alpha <= 0 || Math.abs(sx) < 0.01) return
  const h = w * 1.55
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.save(); x.shadowColor = `rgba(201,166,255,${0.55 * glow})`; x.shadowBlur = 40
  rr(x, -w / 2, -h / 2, w, h, w * 0.07); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#fbf3e4'); g.addColorStop(1, '#efe0c6'); x.fillStyle = g; x.fill(); x.restore()
  x.lineWidth = Math.max(3, w * 0.02); x.strokeStyle = '#b8862e'; rr(x, -w / 2, -h / 2, w, h, w * 0.07); x.stroke()
  x.lineWidth = 1.5; x.strokeStyle = 'rgba(184,134,46,0.6)'; rr(x, -w / 2 + w * 0.06, -h / 2 + w * 0.06, w * 0.88, h - w * 0.12, w * 0.035); x.stroke()
  x.fillStyle = '#7a5520'; x.font = `700 ${Math.round(w * 0.05)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  if ('letterSpacing' in x) x.letterSpacing = `${Math.round(w * 0.012)}px`
  x.fillText('TALK CARD', 0, -h / 2 + w * 0.16)
  if ('letterSpacing' in x) x.letterSpacing = '0px'
  drawPixelStar(x, 0, -h / 2 + w * 0.3, w * 0.09, 1, '#c8932f')
  const lines = question.split('|').map(s => s.trim())
  const fs = Math.round(w * 0.118), lh = fs * 1.12, y0 = -lh * (lines.length - 1) / 2 + h * 0.06
  lines.forEach((ln, i) => {
    // split into accent / plain runs and centre the whole line
    const runs = ln.split('*').map((s, j) => ({ s, acc: j % 2 === 1 })).filter(r => r.s)
    const fontOf = r => `${r.acc ? 'italic 600' : '500'} ${fs}px ${SERIF}`
    let tw = 0; for (const r of runs) { x.font = fontOf(r); tw += x.measureText(r.s).width }
    let xx = -tw / 2
    x.textAlign = 'left'
    for (const r of runs) { x.font = fontOf(r); x.fillStyle = r.acc ? '#b0302f' : '#2a1838'; x.fillText(r.s, xx, y0 + i * lh); xx += x.measureText(r.s).width }
  })
  x.restore()
}
/** a played answer, face up: "ANSWER", the text, a heart, an optional ✓ stamp (stampK 0…1) */
export function drawAnswerCard(x, cx, cy, w, text, { rot = 0, sx = 1, alpha = 1, stampK = 0 } = {}) {
  if (alpha <= 0 || Math.abs(sx) < 0.01) return
  const h = w * 1.52
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
  rr(x, -w / 2, -h / 2, w, h, 20); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
  x.lineWidth = 6; x.strokeStyle = GOLD; rr(x, -w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(x, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); x.stroke()
  x.fillStyle = GOLD; x.font = `700 ${Math.round(w * 0.093)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ANSWER', 0, -h / 2 + w * 0.22)
  x.fillStyle = BONE
  const lines = text.split('|').map(s => s.trim()), fs = Math.round(w * 0.2)
  x.font = `italic 500 ${fs}px ${SERIF}`
  lines.forEach((ln, i) => x.fillText(ln, 0, -h / 2 + w * 0.6 + i * fs * 1.05))
  drawPixelHeart(x, 0, -h / 2 + w * 0.6 + lines.length * fs * 1.05 + w * 0.08, Math.max(4, Math.round(w / 32)))
  if (stampK > 0) {
    const k = easeOutBack(clamp(stampK), 2.6)
    x.save(); x.translate(0, h / 2 - w * 0.27); x.rotate(-0.18); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-15, 2); x.lineTo(-4, 13); x.lineTo(17, -12); x.stroke()
    x.restore()
  }
  x.restore()
}

// ─────────────────────────────── sound helpers (pop / pluck / bell are re-keyed by the engine from its D palette)
const N_ = { A3: 220, D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, B5: 987.77, D6: 1174.66, E6: 1318.51 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const POPN = [N_.A4, N_.B4, N_.D5, N_.E5, N_.Fs5, N_.A5, N_.D6]
export const SND = {
  N: N_, FX,
  wordPops: (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), POPN[(base + i) % POPN.length], gain, (i % 2 ? 0.15 : -0.15)]),
  head: (t0, n, land, base = 0, gain = 0.026) => [...SND.wordPops(t0, n, 0.07, base, gain), ['pop', +land.toFixed(3), N_.A5, 0.05, 0], ['pluck', +land.toFixed(3), N_.A5, 0.04, 0.6, 0]],
  gasp: (t, g = 0.06, f = 440) => [['whoosh', +(t - 0.04).toFixed(3), 0.22, g], ['pop', +t.toFixed(3), f, 0.045, 0], ['pop', +(t + 0.05).toFixed(3), f * 1.5, 0.03, 0]],
  womp: t => [['chip', +t.toFixed(3), N_.E4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 277.18, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]],
  sob: (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }]),
  cheers: (t0, t1, n = 14) => { const out = [['swell', +t0.toFixed(3), +t1.toFixed(3), { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out },
  sparkle: (t, len = 0.6) => [['glitter', +t.toFixed(3), +(t + len).toFixed(3)], ['bell', +(t + 0.02).toFixed(3), N_.E6, 0.03, 1.2, 0]],
  thud: (t, g = 0.12, f = 110) => [['tom', +t.toFixed(3), f, { ...FX, gain: g, decay: 0.15 }]],
}
