// srtorpatio · props: springy type, pixel bitmaps, bursts, chat bubbles, the DEALBREAKERS card + stamps, and the star
// accessories (toque, scarf, sunglasses). Pure functions of t; no top-level document access.
// (The Group 28 Toronto remixes srtorsubway and srtorworld import the generic helpers from here too.)
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const W = 1080
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff4d4a', INK = '#1b1236', CYAN = '#8fd8f6',
  ICE = '#bfe9ff', SNOW = '#f4f8ff', WARM = '#ffb35c', CORAL = '#ff7a5c', NIGHT = '#1b1440', VIOLET = '#c9a6ff', GREY = '#9aa3c0'
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const TAU = Math.PI * 2, D2R = Math.PI / 180
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
export const r3 = v => +v.toFixed(3)

export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = color.startsWith('#') ? rgba(color, 0.7) : color; x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

/** springy word-by-word type: `*word*` = accent (EB Garamond italic, accentColor), `|` = line break.
 *  The last `late` words pop big at lateAt (lateGap apart). times[i] overrides word i's pop time. */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, color = BONE, times = null }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    const wt = times && times[n] != null ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big: big || (times && acc), e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    words: ws,
    update(t, out = 1, fx = null) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      ws.forEach((w, i) => {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        let rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        let dx = 0
        if (fx) { const f = fx(i, t); if (f) { dx = f.dx || 0; rot += f.rot || 0 } }
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translate(${dx.toFixed(2)}px, ${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      })
    },
  }
}

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  if (alpha <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
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

export function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * TAU + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 12 + Math.round(r() * 2) * 5, kind: Math.floor(r() * 4) }))
}
export function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, Array.isArray(color) ? color[q.kind % color.length] : color)
  }
  x.restore()
}

/** a chat bubble; tail at bottom (tail = -1 left, 1 right) */
export function drawChat(x, cx, cy, w, h, text, k, { fillC = '#d8d4ea', tail = 1, size = 0.5, ink = INK } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  x.moveTo(tail * w * 0.12, h / 2 - 2); x.lineTo(tail * w * 0.3, h / 2 + h * 0.42); x.lineTo(tail * w * 0.0, h / 2 - 2)
  x.fillStyle = fillC; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
  glowStroke(x, BONE, 5, 14); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.stroke(); x.shadowBlur = 0
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${Math.round(h * size)}px ${INTER}`; x.fillText(text, 0, 2)
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
  x.fillStyle = GOLD; x.font = `700 40px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 74)
  x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.3, -h / 2 + 118); x.lineTo(w * 0.3, -h / 2 + 118); x.stroke()
  for (const [y, cw] of [[-40, w * 0.78], [140, w * 0.78]]) {
    x.strokeStyle = rgba(BONE, 0.45); x.lineWidth = 4; x.beginPath(); x.roundRect(-cw / 2, y - 44, cw, 88, 44); x.stroke()
    x.fillStyle = rgba(BONE, 0.16); x.beginPath(); x.roundRect(-cw / 2 + 34, y - 8, cw - 68, 16, 8); x.fill()
  }
}

/** a rubber stamp "✕ TEXT" */
export function drawStamp(x, text, a, size = 56) {
  x.save(); x.globalAlpha *= a
  x.font = `900 ${size}px ${INTER}`
  const tw = x.measureText(text).width, w = tw + 80, h = size * 2.1
  x.strokeStyle = RED; x.lineWidth = 11; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 26
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); x.stroke()
  x.fillStyle = 'rgba(30,8,20,0.85)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.fill()
  x.shadowBlur = 14; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 3)
  x.restore()
}

// ── star accessories (bitmaps; cells scale with the star: cell = size / 36)
export const TOQUE = [
  '.......PP.......',
  '......PWWP......',
  '.......PP.......',
  '.....RRRRRR.....',
  '...RRRRRRRRRR...',
  '..RRWWRRRRWWRR..',
  '.RRRRRRRRRRRRRR.',
  '.RRRRRRRRRRRRRR.',
  'CCCCCCCCCCCCCCCC',
  'cCcCcCcCcCcCcCcC',
]
export const TOQUE_C = { P: '#f4f8ff', W: '#ffffff', R: '#e8473a', C: '#f3ead8', c: '#cbbfa8' }
export const SCARF = [
  'SSSSSSSSSSSSSSSSSSSS',
  'sSSSsSSSsSSSsSSSsSSS',
  '..............SSS...',
  '..............sSS...',
  '..............SSs...',
  '..............SSS...',
  '..............f.f...',
]
export const SCARF_C = { S: '#e8473a', s: '#f3ead8', f: '#f3ead8' }
export const SHADES = [
  'KKKKKKKKKKKKKKKKKKKKKKKK',
  'KkkkkkkKK......KKkkkkkkK',
  '.KkkkkhKK......KKkkkkhK.',
  '.KkkkhkK........KkkkhkK.',
  '..KKKKK..........KKKKK..',
]
export const SHADES_C = { K: '#120c24', k: '#2b2350', h: '#8fd8f6' }
export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const HEART_C = { H: '#ff4f6e', W: '#ffd1de' }
export const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
export const DROP_C = { X: '#8fd3ff', W: '#e9f7ff' }

/** a little falling tear drop pair from a star's eyes (crying gag) */
export function drawTears(x, r, t, t0, t1, cell = 6) {
  if (t < t0 || t > t1) return
  const c = r.size / 36
  for (let k = 0; k < 4; k++) {
    const ph = ((t - t0) * 1.6 + k * 0.5) % 1
    const side = k % 2 ? 1 : -1
    drawBits(x, DROP, DROP_C, Math.round(r.x + side * (4.6 * c + 4 + ph * 22)), Math.round(r.y + 2.6 * c + ph * 90), cell, { alpha: 1 - ph })
  }
}

/** floating hearts rising from (cx, cy) */
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 8, spread = 260) {
  for (let i = 0; i < 9; i++) {
    const born = t0 + i * 0.2, life = 1.5
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    drawBits(x, HEART, HEART_C, Math.round(cx + side * spread + Math.sin(p * 4 + i) * 14), Math.round(cy - 60 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
  }
}
