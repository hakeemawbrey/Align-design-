// htxgameday · drawing kit (copied from htxtaste / htxrodeo): springy type, sparkle bursts, glowing ink, the pictogram fan.
// Pure functions of their args; no top-level document access.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', TEAL = '#1fcfa8', LAV = '#cfc3ec', VIOLET = '#c9a6ff', DUSK = '#2a2350'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const W = 1080, TAU = Math.PI * 2

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** pop-out: a little swell, then shrink to 0 */
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

// ── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `^word` = gold Inter, `|` = line break.
 *  The last `late` words pop at lateAt (bigger spring, optional wobble). */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*'), gold = w.startsWith('^')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (gold) Object.assign(style, { color: GOLD })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/[*^]/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** pictogram fan, feet at 0,0, ~280 tall, no face. A plain jersey: NO numbers, names or logos — one flat colour.
 *  jersey: colour; jfa: jersey fill alpha; body: head/arm/leg ink; hands: [[lx,ly],[rx,ry]] in local coords; flash 0–1 white rim */
export function fan(x, { jersey, jfa = 0.92, body = LAV, hands, flash = 0, a = 1 }) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // legs
  x.lineCap = 'round'
  for (const s of [-1, 1]) { x.beginPath(); x.moveTo(s * 20, -82); x.lineTo(s * 23, -8); ink(x, body, { w: 25, fa: 0, glow: 8 }) }
  // arms (behind the jersey)
  hands.forEach(([hx, hy], i) => {
    const s = i ? 1 : -1, sx = s * 48, sy = -168
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(hx, hy); ink(x, body, { w: 22, fa: 0, glow: 10 })
    x.beginPath(); x.arc(hx, hy, 15, 0, TAU); x.fillStyle = body; x.fill()
  })
  // the jersey: short sleeves, v-neck, plain colour
  x.beginPath()
  x.moveTo(-18, -196); x.lineTo(-52, -192); x.lineTo(-84, -164); x.lineTo(-68, -138); x.lineTo(-48, -150)
  x.lineTo(-46, -74); x.quadraticCurveTo(0, -66, 46, -74); x.lineTo(48, -150); x.lineTo(68, -138); x.lineTo(84, -164)
  x.lineTo(52, -192); x.lineTo(18, -196); x.lineTo(0, -172); x.closePath()
  const rim = flash > 0 ? mixHex(jersey, '#ffffff', flash * 0.8) : mixHex(jersey, '#ffffff', 0.25)
  ink(x, rim, { w: 7, fa: jfa, glow: 16 + 20 * flash, fill: jersey })
  // sleeve cuffs (plain bands)
  x.globalAlpha *= clamp(jfa)
  x.strokeStyle = rgba(BONE, 0.7); x.lineWidth = 5
  x.beginPath(); x.moveTo(-80, -158); x.lineTo(-66, -144); x.moveTo(80, -158); x.lineTo(66, -144); x.stroke()
  x.restore()
  // head
  x.save(); x.globalAlpha *= a
  x.beginPath(); x.arc(0, -238, 36, 0, TAU); ink(x, body, { w: 7, fa: 0.88, glow: 16 })
  x.restore()
}

/** a plump heart centred at 0,0 (~2s wide) */
export function heart(x, s, col, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.scale(s / 60, s / 60)
  x.beginPath(); x.moveTo(0, 42)
  x.bezierCurveTo(-70, -6, -46, -62, 0, -26)
  x.bezierCurveTo(46, -62, 70, -6, 0, 42)
  x.closePath(); ink(x, col, { w: 8, fa: 0.6, glow: 26 })
  x.restore()
}
