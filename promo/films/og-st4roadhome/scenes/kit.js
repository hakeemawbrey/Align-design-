// kit — small shared helpers (a copy of the Star Talk group-chat kit from stopposites); each Star Talk film folder
// carries its own identical copy, so no film depends on another film's folder.
// Pure f(t) everywhere; nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
export const D2R = Math.PI / 180

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break. colors[i] tints word i;
 *  times[i] overrides when word i pops; the last `late` words pop at lateAt. */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, colors = {}, times = null }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (colors[n]) style.color = colors[n]
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: colors[n] || accentColor, letterSpacing: '0' })
    const big = (late > 0 && n >= nW - late) || (times && acc)
    const tt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: tt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < ws[0].t ? 'none' : 'block'
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

/** draw a bitmap of cells (rows of chars; '.' = empty) with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sc = 1 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(sc, sc)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || cols.X || BONE; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a burst of pixel-star sparkles from (cx, cy) starting at t0 */
export function sparkles(x, t, cx, cy, t0, { n = 10, R = 120, size = 24, seed = 1, dur = 0.6, cols = [GOLD, BONE, PINK, LAV] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const p = ease.outCubic(tt / dur)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.5 + 0.7 * p), cy + Math.sin(a) * R * (0.5 + 0.7 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** soft additive glow */
export function glow(x, cx, cy, r, col, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, hexA(col, 0.55 * a)); g.addColorStop(0.45, hexA(col, 0.18 * a)); g.addColorStop(1, hexA(col, 0))
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
}

/** a pixel chat bubble with three bouncing dots, tail pointing down at (cx, cy) */
export function typingBubble(x, t, cx, cy, [a, b], col) {
  const k = pop01(t, a, 0.26, 2.4) * (1 - ease.inQuad(prog(t, b - 0.12, b)))
  if (k <= 0.01 || t > b) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const P = 6, w = 22 * P, h = 12 * P
  x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-w / 2 - P, -h - 3 * P - P, w + 2 * P, h + 2 * P)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h - 3 * P, w, h)
  x.fillStyle = BONE; x.fillRect(-P * 2, -3 * P, P * 3, P); x.fillRect(-P, -2 * P, P * 2, P); x.fillRect(-P, -P, P, P)
  for (let i = 0; i < 3; i++) {
    const up = Math.max(0, Math.sin((t - a) * 11 - i * 0.9)) * P * 1.5
    x.fillStyle = col; x.fillRect(-w / 2 + (4 + i * 6) * P, -h - 3 * P + 4 * P - up, P * 3, P * 3)
  }
  x.restore()
}

/** eye centres of a drawStarChar result r (the sprite is a 36-cell grid; eyes sit at cells 13.4 / 22.6, row 19.2) */
export function eyesOf(r) {
  const cell = r.size / 36
  return { l: [r.x - 4.6 * cell, r.y + 1.2 * cell], r: [r.x + 4.6 * cell, r.y + 1.2 * cell], cell }
}

// sound helpers (pitched SFX are shifted into the film's key by the engine)
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

/** pick the state whose start time is the latest ≤ t from [[t0, state], …] (sorted) */
export function at(t, list) { let s = list[0][1]; for (const [t0, v] of list) if (t >= t0) s = v; return s }
/** when word `w` of line i starts typing (times = lineTimes(lines)) */
export function wordT(times, lines, i, w) {
  const plain = lines[i].text.replace(/\*/g, '')
  const k = plain.indexOf(w)
  return k < 0 ? lines[i].t : times[i].chars[k]
}
/** sanity check (dev): every line readable ≥ minRead s before the next line / the close; logs problems, returns them */
export function checkLines(times, lines, close, minRead = 1.5) {
  const bad = []
  times.forEach((tm, i) => {
    const next = i + 1 < lines.length ? lines[i + 1].t : close
    if (next - tm.done < minRead - 1e-6) bad.push(`line ${i} "${lines[i].text}" done ${tm.done.toFixed(2)} → next ${next.toFixed(2)} (${(next - tm.done).toFixed(2)} s)`)
    if (lines[i].text.replace(/\*/g, '').length > 70) bad.push(`line ${i} too long`)
  })
  if (bad.length && typeof console !== 'undefined') console.warn('[readability]', bad.join(' | '))
  return bad
}
