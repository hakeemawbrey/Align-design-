// kit — the "Ask the Stars" pieces (promo/films/STARTALK12.md, Season 1 extra), copied into each ask<sign> folder so every
// film stays self-contained: the DM question card, the springy headline, the real-astrology chip, pixel bitmaps and the
// little talk card. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const FONTS = ["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "400 28px 'Space Mono'", "bold 58px 'EB Garamond'"]
export async function loadFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word headline: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

/** rich text for the DM question: `*word*` → Garamond italic accent */
function richHTML(text, accent, accentScale = 1.12) {
  return text.split(' ').map(w => {
    if (w === '|') return '<br>'
    const acc = w.startsWith('*') || w.endsWith('*')
    const s = w.replace(/\*/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    return acc ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${accentScale}em;color:${accent};letter-spacing:0">${s}</span>` : s
  }).join(' ').replace(/ <br> /g, '<br>')
}

// 9×7 pixel envelope for the DM header
const ENV = ['GGGGGGGGG', 'GBGGGGGBG', 'GBBGGGBBG', 'GBGBGBGBG', 'GBBGBGBBG', 'GBBBBBBBG', 'GGGGGGGGG']

/** the viewer's question as a phone DM notification. Settled (but buzzing) from `at`; out 1→0 slides it up and away. */
export function dmCard(parent, { question, accent = GOLD, at = -0.6, top = 170, size = 96, height }) {
  const root = el('div', { position: 'absolute', left: '60px', top: top + 'px', width: (W - 120) + 'px', transformOrigin: '50% 0%', display: 'none' }, parent)
  el('div', { position: 'absolute', inset: '0', borderRadius: '40px', background: 'linear-gradient(180deg, rgba(38,26,78,0.94), rgba(20,13,46,0.94))',
    border: '3px solid rgba(239,230,214,0.28)', boxShadow: '0 18px 60px rgba(4,2,14,0.75), inset 0 2px 0 rgba(255,255,255,0.08)' }, root)
  const head = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '18px', padding: '30px 40px 0 40px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: GOLD }, root)
  const ic = el('canvas', { width: '63px', height: '49px', imageRendering: 'pixelated', flex: '0 0 auto' }, head)
  ic.width = 63; ic.height = 49
  { const c = ic.getContext('2d'); ENV.forEach((r, j) => [...r].forEach((ch, i) => { c.fillStyle = ch === 'G' ? GOLD : '#2a1d5c'; c.fillRect(i * 7, j * 7, 7, 7) })) }
  el('div', { flex: '1 1 auto' }, head, 'NEW MESSAGE')
  el('div', { font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, head, 'now')
  el('div', { position: 'relative', padding: '6px 40px 0 121px', font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, root, 'asked anonymously')
  el('div', { position: 'relative', padding: '18px 44px 44px 44px', fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight: 1.04, color: BONE, letterSpacing: '-0.015em',
    textShadow: '0 3px 0 rgba(6,4,18,0.7)', minHeight: height ? height + 'px' : undefined }, root, richHTML(question, accent))
  return {
    root,
    update(t, out = 1) {
      const show = t >= at && out > 0
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.4), 2)
      const buzz = t - at < 1.4 ? Math.sin((t - at) * 46) * 7 * Math.exp(-(t - at) * 1.6) : 0    // the phone buzz
      const sc = lerp(0.7, 1, p) * lerp(0.86, 1, out)
      root.style.opacity = String(clamp(p * 2) * out)
      root.style.transform = `translate(${buzz.toFixed(2)}px, ${((1 - out) * -60).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${(buzz * 0.08).toFixed(2)}deg)`
    },
  }
}

/** the real-astrology note: a small pill. text rows separated by '|' */
export function noteChip(parent, { text, color = GOLD, top = 1250, at, size = 30 }) {
  const root = el('div', { position: 'absolute', left: '0', width: W + 'px', top: top + 'px', display: 'none', justifyContent: 'center' }, parent)
  const pill = el('div', { padding: '14px 30px 13px', borderRadius: '999px', background: 'rgba(16,10,38,0.9)', border: `3px solid ${color}`, boxShadow: `0 0 26px ${color}55, 0 8px 30px rgba(4,2,14,0.7)`,
    font: `700 ${size}px ${MONO}`, letterSpacing: '0.06em', color: BONE, textAlign: 'center', lineHeight: 1.3, transformOrigin: '50% 50%' }, root,
    text.split('|').join('<br>').replace(/^(\S+)/, `<span style="font-family:${GLYPH};font-size:1.25em;color:${color};margin-right:0.3em;vertical-align:-0.06em">$1</span>`))
  return {
    update(t, out = 1) {
      const show = t >= at && out > 0
      root.style.display = show ? 'flex' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.36), 2.6)
      pill.style.opacity = String(clamp(p * 3) * out)
      pill.style.transform = `scale(${(lerp(0.4, 1, p) * lerp(0.8, 1, out)).toFixed(4)}) rotate(${((1 - p) * -5).toFixed(2)}deg)`
    },
  }
}

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flipX = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flipX) x.scale(-1, 1)
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

/** word-wrap helper for canvas text */
function wrap(x, text, maxW) {
  const out = []
  for (const para of text.split('\n')) {
    let line = ''
    for (const w of para.split(' ')) { const tryL = line ? line + ' ' + w : w; if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL }
    out.push(line)
  }
  return out
}

/** a little Align talk card on the canvas. flip 0 = face up, 1 = back. kicker on top (mono), text in the middle (serif). */
export function drawTalkCard(x, cx, cy, w, { rot = 0, flip = 0, kicker = 'TALK CARD', text = '', color = GOLD, alpha = 1, scale = 1, foot = '', textScale = 1 } = {}) {
  if (alpha <= 0 || scale <= 0) return
  const h = w * 1.42, r = w * 0.08
  const sx = Math.cos(Math.PI * clamp(flip))
  const back = flip > 0.5
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale * Math.max(0.02, Math.abs(sx)), scale)
  x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  const rr = () => { x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r) }
  rr(); x.fillStyle = back ? '#241653' : '#f5eedf'; x.fill()
  x.shadowColor = 'transparent'
  x.lineWidth = w * 0.022; x.strokeStyle = back ? GOLD : color; rr(); x.stroke()
  if (back) {
    // seed-of-life-ish rosette in gold
    x.strokeStyle = 'rgba(242,199,92,0.85)'; x.lineWidth = w * 0.012
    const R = w * 0.16
    for (let i = 0; i < 7; i++) { const a = i * Math.PI / 3; const ox = i === 6 ? 0 : Math.cos(a) * R, oy = i === 6 ? 0 : Math.sin(a) * R; x.beginPath(); x.arc(ox, oy - h * 0.04, R, 0, Math.PI * 2); x.stroke() }
    if (text) { x.fillStyle = BONE; x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, h * 0.34) }
  } else {
    x.fillStyle = color; x.font = `700 ${Math.round(w * 0.07)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'top'
    x.fillText(kicker, 0, -h / 2 + w * 0.1)
    x.fillStyle = INK; x.font = `italic 500 ${Math.round(w * 0.135 * textScale)}px ${SERIF}`; x.textBaseline = 'middle'
    const ls = wrap(x, text, w * 0.82), lh = w * 0.15 * textScale
    ls.forEach((l, i) => x.fillText(l, 0, (i - (ls.length - 1) / 2) * lh + h * 0.02))
    if (foot) { x.fillStyle = '#7a6aa8'; x.font = `700 ${Math.round(w * 0.058)}px ${MONO}`; x.textBaseline = 'bottom'; x.fillText(foot, 0, h / 2 - w * 0.09) }
  }
  x.restore()
}

/** comic pixel burst with a word (e.g. "POP!") */
export function drawBurst(x, cx, cy, R, t, t0, { word = 'POP!', color = '#ffd34d', ink = INK, life = 0.7, size = 64 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = easeOutBack(clamp(tt / 0.18), 3), a = 1 - ease.inQuad(prog(tt, life * 0.6, life))
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(-0.12); x.scale(p, p)
  const n = 12
  x.beginPath()
  for (let i = 0; i < n * 2; i++) { const rr = i % 2 ? R * 0.62 : R * (0.95 + 0.08 * Math.sin(i * 7.3)); const ang = i * Math.PI / n; x.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr) }
  x.closePath(); x.fillStyle = color; x.fill(); x.lineWidth = 8; x.strokeStyle = ink; x.stroke()
  x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, 4)
  x.restore()
}

/** sparkle ring of pixel stars (uses the sky's drawPixelStar passed in) */
export function sparkles(x, drawPixelStar, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ── sound helpers
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
