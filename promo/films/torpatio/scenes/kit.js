// torpatio · drawing kit (springy type, bursts, pictograms, the dealbreakers card; adapted from htxheat / dummies v2).
// Pure functions of t; no top-level document access.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W } from '../../../src/scenes/common.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff4d4a', INK = '#1a1430', CYAN = '#8fd8f6',
  ICE = '#bfe9ff', SNOW = '#f4f8ff', WARM = '#ffb35c', CORAL = '#ff7a5c', DARK = '#140f2a', GREY = '#8d88a8', LAKE = '#3b7fd6'
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const D2R = Math.PI / 180
export const TAU = Math.PI * 2

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }
export const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
export const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

export function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * TAU + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
export function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7, scale = 1) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size * scale, q.kind, Array.isArray(color) ? color[q.kind % color.length] : color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, accentColor), `~word~` = second accent (accent2),
 *  `|` = line break. times[i] overrides word i's pop time; bigs = word indices that pop big with a wobble;
 *  fx(i, t) → { dx, dy, rot } adds a per-word jiggle. */
export function popText(parent, text, { top, size, font = INTER, weight, accentColor = GOLD, accent2 = ICE, accentSize, gap = 0.07, at: t0,
  lastAt = null, wobble = false, color = BONE, times = null, bigs = null, fx = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const nWords = toks.filter(w => w !== '|').length
  const ws = []
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const a1 = w.startsWith('*') || w.endsWith('*'), a2 = w.startsWith('~') || w.endsWith('~')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (a1 || a2) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: a1 ? accentColor : accent2, letterSpacing: '0' })
    const isLast = n === nWords - 1
    const big = (isLast && lastAt != null) || (bigs && bigs.includes(n))
    const wt = times && times[n] != null ? times[n] : isLast && lastAt != null ? lastAt : t0 + n * gap
    ws.push({ i: n, t: wt, big, e: el('span', style, box, w.replace(/[*~]/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        let rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        let dx = 0, dy = 0
        if (fx) { const f = fx(w.i, t); if (f) { dx = f.dx || 0; dy = f.dy || 0; rot += f.rot || 0 } }
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translate(${dx.toFixed(2)}px, ${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10 + dy).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** a pictogram person (no face). Units: feet at 0, head centre −510. pose: stand | phone | slump | joy | toast */
export function drawPerson(x, { px, gy, s = 1, col = GOLD, pose = 'stand', a = 1, k = 1, lean = 0, slump = 0, toast = 0, dir = 1 }) {
  if (k <= 0 || a <= 0) return
  x.save(); x.translate(px, gy)
  x.scale(s * k, s * k)
  x.rotate(lean * D2R)
  x.globalAlpha *= a * clamp(k * 2)
  const hipY = -230, shY = -425 + 40 * slump, headY = -510 + 70 * slump
  const legs = [-1, 1].map(sd => ({ hip: { x: sd * 30, y: hipY }, ft: { x: sd * 30, y: 0 } }))
  let arms
  if (pose === 'phone') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 82, y: shY + 140 }, { x: sd * 22, y: shY + 92 }] }))
  else if (pose === 'joy') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 120, y: shY - 70 }, { x: sd * 150, y: shY - 170 }] }))
  else if (pose === 'slump') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 70, y: shY + 130 }, { x: sd * 60, y: shY + 220 }] }))
  else arms = [-1, 1].map(sd => {
    const r = sd === dir ? clamp(toast) : 0    // the arm on side `dir` reaches out and up to raise a glass (hand ends at dir·260, shY+30)
    return { pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * lerp(70, 160, r), y: shY + lerp(120, 100, r) }, { x: sd * lerp(66, 260, r), y: shY + lerp(210, 30, r) }] }
  })
  for (const pass of [0, 1]) {
    x.save()
    const grow = pass ? 0 : 7
    if (!pass) { x.strokeStyle = BONE; x.fillStyle = BONE; x.shadowColor = rgba(col, 0.8); x.shadowBlur = 18 } else { x.strokeStyle = DARK; x.fillStyle = DARK }
    x.lineCap = 'round'; x.lineJoin = 'round'
    x.lineWidth = 46 + grow * 2
    for (const l of legs) { x.beginPath(); x.moveTo(l.hip.x, l.hip.y); x.lineTo(l.ft.x, l.ft.y - 20); x.stroke() }
    const drawArms = () => { x.lineWidth = 36 + grow * 2; for (const ar of arms) { x.beginPath(); x.moveTo(ar.pts[0].x, ar.pts[0].y); for (const p of ar.pts.slice(1)) x.lineTo(p.x, p.y); x.stroke() } }
    if (pose !== 'phone') drawArms()
    if (pass) x.fillStyle = col
    x.beginPath(); x.roundRect(-70 - grow, shY - grow, 140 + grow * 2, hipY - shY + 30 + grow * 2, [50 + grow, 50 + grow, 20 + grow, 20 + grow]); x.fill()
    if (pass) x.fillStyle = DARK
    x.beginPath(); x.arc(0, headY, 52 + grow, 0, TAU); x.fill()
    if (pose === 'phone') drawArms()
    x.restore()
  }
  if (pose === 'phone') {        // the phone's cold glow
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, shY + 70, 4, 0, shY + 40, 150); g.addColorStop(0, rgba(CYAN, 0.6)); g.addColorStop(1, rgba(CYAN, 0))
    x.fillStyle = g; x.beginPath(); x.arc(0, shY + 40, 150, 0, TAU); x.fill(); x.restore()
    x.fillStyle = '#dff6ff'; x.shadowColor = CYAN; x.shadowBlur = 20; x.beginPath(); x.roundRect(-22, shY + 52, 44, 70, 8); x.fill(); x.shadowBlur = 0
  }
  x.restore()
}

/** a chat bubble; tail at bottom (tail = -1 left, 1 right) */
export function drawChat(x, cx, cy, w, h, text, k, { fillC = '#d8d4ea', tail = 1, size = 0.5 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  x.moveTo(tail * w * 0.12, h / 2 - 2); x.lineTo(tail * w * 0.3, h / 2 + h * 0.42); x.lineTo(tail * w * 0.0, h / 2 - 2)
  x.fillStyle = fillC; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
  glowStroke(x, BONE, 5, 14); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.stroke(); x.shadowBlur = 0
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${Math.round(h * size)}px ${INTER}`; x.fillText(text, 0, 2)
  x.restore()
}

/** the illustrated DEALBREAKERS card (not app UI): dark glass, gold rim, two chip rows */
export function drawDealCard(x, w, h) {
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.fill()
  x.shadowOffsetY = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(WARM, 0.22)); gr.addColorStop(1, rgba(PINK, 0.04))
  x.fillStyle = gr; x.fill()
  glowStroke(x, GOLD, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.stroke()
  x.shadowBlur = 0; x.lineWidth = 2; x.globalAlpha *= 0.4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 26); x.stroke(); x.globalAlpha /= 0.4
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 74)
  x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.3, -h / 2 + 118); x.lineTo(w * 0.3, -h / 2 + 118); x.stroke()
  for (const [y, cw] of [[-60, w * 0.74], [150, w * 0.68]]) {
    x.strokeStyle = rgba(BONE, 0.45); x.lineWidth = 4; x.beginPath(); x.roundRect(-cw / 2, y - 44, cw, 88, 44); x.stroke()
    x.fillStyle = rgba(BONE, 0.16); x.beginPath(); x.roundRect(-cw / 2 + 34, y - 8, cw - 68, 16, 8); x.fill()
  }
}

/** a rubber stamp "✕ TEXT" */
export function drawStamp(x, text, a) {
  x.save(); x.globalAlpha *= a
  x.font = `900 60px ${INTER}`
  const tw = x.measureText(text).width, w = tw + 90, h = 128
  x.strokeStyle = RED; x.lineWidth = 11; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 26
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); x.stroke()
  x.fillStyle = 'rgba(30,8,20,0.85)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.fill()
  x.shadowBlur = 14; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 3)
  x.restore()
}
