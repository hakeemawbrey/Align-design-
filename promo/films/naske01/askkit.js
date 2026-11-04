// askkit — the shared look of "Ask the Stars, Volume 2" (naske01–naske36, promo/films/next30/b25.md).
// The Volume 1 format (askaries… askpisces, promo/films/STARTALK12.md) refreshed for winter: a snowy night sky, the
// "ASK THE STARS" bug, an anonymous DM question, one sign's star answering in three box lines, a real-astrology chip,
// a little ♓ Pisces who always ends up crying (happy tears), one card cut and the last line as a big headline.
//
//   import { askFilm, … } from '../../naske01/askkit.js'
//   const F = askFilm({
//     id, sign: 'aries', question: 'How do I *slow down*…?', lines: [l1, l2, l3], chip: '♈ CARDINAL FIRE · RULED BY MARS',
//     last: 'Fast heart. | *Slow* steps.', late: 2,            // the last `late` words pop on the landing beat
//     tie: null,                                              // optional mono caption under the last line (app tie-in)
//     hero: { x: 540, y: 1000, size: 360 },                   // the answering star
//     state(t, T) → { mood, look, squash, dx, dy, blink, pop }   // optional pose per time
//     back(x, t, T, H), front(x, t, T, H)                      // the gag, drawn behind / in front of the star
//     cues(T) → []                                            // the gag's sound cues
//     pisces: { x, y, size } | false,  tears(t, T) → 0…3       // the cameo (false when Pisces is the hero)
//   })
//   export const { DURATION, SCENES, CUES, T } = F
// T (the computed timeline): open, l[3] (line starts), done[3], chip, dmOut, close, cut, h2, h2Land, h2Out, out, end.
// Pure f(t): DOM and canvases are made only inside build; nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../startalk.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0', ICE = '#bfe6ff', SNOW = '#f4f8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const FONTS = ["800 112px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "400 28px 'Space Mono'"]
async function loadFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const wob = (t, t0, f = 18, d = 4, a = 0.2) => (t < t0 ? 0 : a * Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d))
export { clamp, lerp, prog, ease, easeOutBack, drawPixelStar, drawStarChar, signStar }

// ── springy word-by-word headline: `*word*` = accent (Garamond italic, colour), `|` = line break
function popText(parent, text, { top, size, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.12, lineHeight = 1.0 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.includes('*')
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
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)})`
      }
    },
  }
}

function richHTML(text, accent, accentScale = 1.12) {
  return text.split(' ').map(w => {
    if (w === '|') return '<br>'
    const acc = w.includes('*')
    const s = w.replace(/\*/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    return acc ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:${accentScale}em;color:${accent};letter-spacing:0">${s}</span>` : s
  }).join(' ').replace(/ <br> /g, '<br>')
}

// ── the viewer's question as a DM notification (frosted for winter). Buzzing from `at`; out 1→0 slides it up and away.
const ENV = ['GGGGGGGGG', 'GBGGGGGBG', 'GBBGGGBBG', 'GBGBGBGBG', 'GBBGBGBBG', 'GBBBBBBBG', 'GGGGGGGGG']
function dmCard(parent, { question, accent = GOLD, at = -0.6, top = 150, size = 88 }) {
  const root = el('div', { position: 'absolute', left: '60px', top: top + 'px', width: (W - 120) + 'px', transformOrigin: '50% 0%', display: 'none' }, parent)
  el('div', { position: 'absolute', inset: '0', borderRadius: '40px', background: 'linear-gradient(180deg, rgba(40,34,92,0.95), rgba(20,15,52,0.95))',
    border: '3px solid rgba(214,236,255,0.38)', boxShadow: '0 18px 60px rgba(4,2,14,0.75), inset 0 2px 0 rgba(255,255,255,0.1)' }, root)
  // a frost rim along the top edge of the card
  el('div', { position: 'absolute', left: '26px', right: '26px', top: '-9px', height: '18px', borderRadius: '9px',
    background: 'repeating-linear-gradient(90deg, #eef7ff 0 22px, #cfe6ff 22px 30px, #eef7ff 30px 44px, transparent 44px 52px)', opacity: '0.9' }, root)
  const head = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '18px', padding: '32px 40px 0 40px', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: GOLD }, root)
  const ic = el('canvas', { width: '63px', height: '49px', imageRendering: 'pixelated', flex: '0 0 auto' }, head)
  ic.width = 63; ic.height = 49
  { const c = ic.getContext('2d'); ENV.forEach((r, j) => [...r].forEach((ch, i) => { c.fillStyle = ch === 'G' ? GOLD : '#2a1d5c'; c.fillRect(i * 7, j * 7, 7, 7) })) }
  el('div', { flex: '1 1 auto' }, head, 'NEW QUESTION')
  el('div', { font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, head, 'now')
  el('div', { position: 'relative', padding: '6px 40px 0 121px', font: `400 28px ${MONO}`, color: LAV, letterSpacing: '0.04em' }, root, 'asked anonymously')
  el('div', { position: 'relative', padding: '16px 44px 42px 44px', fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight: 1.04, color: BONE, letterSpacing: '-0.015em',
    textShadow: '0 3px 0 rgba(6,4,18,0.7)' }, root, richHTML(question, accent))
  return {
    update(t, out = 1) {
      const show = t >= at && out > 0
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      const p = easeOutBack(prog(t, at, at + 0.4), 2)
      const buzz = t - at < 1.6 ? Math.sin((t - at) * 46) * 7 * Math.exp(-(t - at) * 1.5) : 0
      const sc = lerp(0.7, 1, p) * lerp(0.86, 1, out)
      root.style.opacity = String(clamp(p * 2) * out)
      root.style.transform = `translate(${buzz.toFixed(2)}px, ${((1 - out) * -60).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${(buzz * 0.08).toFixed(2)}deg)`
    },
  }
}

// ── the real-astrology note: a small pill. Rows separated by '|'
function noteChip(parent, { text, color = GOLD, top = 1300, at, size = 29 }) {
  const root = el('div', { position: 'absolute', left: '0', width: W + 'px', top: top + 'px', display: 'none', justifyContent: 'center' }, parent)
  const pill = el('div', { padding: '13px 30px 12px', borderRadius: '999px', background: 'rgba(16,10,38,0.92)', border: `3px solid ${color}`, boxShadow: `0 0 26px ${color}55, 0 8px 30px rgba(4,2,14,0.7)`,
    font: `700 ${size}px ${MONO}`, letterSpacing: '0.06em', color: BONE, textAlign: 'center', lineHeight: 1.3, transformOrigin: '50% 50%', whiteSpace: 'nowrap' }, root,
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

// ── the series bug: a pixel snowflake-star + "ASK THE STARS" (Inter 800, letter-spaced small caps), top-left 56 px
const BUG_IC = ['...W...', '.W.G.W.', '..GGG..', 'WGGGGGW', '..GGG..', '.W.G.W.', '...W...']
function buildBug(root, { at = -0.5 }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '42px', height: '42px', imageRendering: 'pixelated' }, box)
  ic.width = 42; ic.height = 42
  { const c = ic.getContext('2d'); BUG_IC.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; c.fillStyle = ch === 'G' ? GOLD : SNOW; c.fillRect(i * 6, j * 6, 6, 6) })) }
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'ASK&nbsp;THE&nbsp;STARS')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── pixel helpers
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flipX = false, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(flipX ? -sx : sx, sy)
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
export const HEART = ['.RR.RR.', 'RRWRRRR', 'RWRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...']
export const HEART_C = { R: '#ff5d8f', W: '#ffd0de' }
export const MUG = ['.WWWWWW..', '.WCCCCW..', '.WWWWWWWW', '.WWWWWW.W', '.WWWWWWWW', '..WWWW...']
export const MUG_C = { W: '#f5eedf', C: '#7a4a2a' }
export const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..']

/** a pixel placard / sign with mono text (canvas). Lines split by '\n'. */
export function drawSign(x, cx, cy, text, { w = 360, size = 30, color = GOLD, paper = '#f5eedf', ink = INK, rot = 0, alpha = 1, scale = 1, font = MONO, weight = 700, pad = 22, lh = 1.25, align = 'center' } = {}) {
  if (alpha <= 0 || scale <= 0) return
  const rows = text.split('\n')
  const h = rows.length * size * lh + pad * 2
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = color; x.fillRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6)
  x.fillStyle = paper; x.fillRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6)
  x.fillStyle = ink; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  const tx = align === 'left' ? -w / 2 + pad : 0
  rows.forEach((r, i) => x.fillText(r, tx, -h / 2 + pad + (i + 0.5) * size * lh))
  x.restore()
}

/** a rounded speech bubble with a tail toward (tx, ty) */
export function drawBubble(x, cx, cy, text, { tx = null, ty = null, size = 40, font = INTER, weight = 800, color = INK, fillC = '#f5eedf', alpha = 1, scale = 1, rot = 0, pad = 26, maxW = 640 } = {}) {
  if (alpha <= 0 || scale <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.font = `${weight} ${size}px ${font}`
  const rows = text.split('\n'), w = Math.min(maxW, Math.max(...rows.map(r => x.measureText(r).width)) + pad * 2), h = rows.length * size * 1.15 + pad * 1.6
  x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26)
  if (tx !== null) { const lx = (tx - cx) / scale, ly = (ty - cy) / scale; x.moveTo(-18, h / 2 - 2); x.lineTo(lx, ly); x.lineTo(18, h / 2 - 2) }
  x.fillStyle = fillC; x.fill(); x.lineWidth = 6; x.strokeStyle = INK; x.stroke()
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * size * 1.15 + 2))
  x.restore()
}

/** a pixel snowball (chunky circle with shading) */
export function drawSnowball(x, cx, cy, r, { alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0 || r <= 1) return
  const c = Math.max(2, Math.round(r / 5))
  x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  const n = Math.ceil(r / c)
  for (let j = -n - 1; j <= n; j++) for (let i = -n - 1; i <= n; i++) {
    const px = (i + 0.5) * c, py = (j + 0.5) * c, d = Math.hypot(px, py)
    if (d > r + c * 0.9) continue
    if (d > r) { x.fillStyle = INK } else { const lit = (-px - py) / (r * 1.4); x.fillStyle = lit > 0.35 ? '#ffffff' : lit > -0.25 ? SNOW : '#c7d8f2' }
    x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
  }
  x.restore()
}

/** comic pixel burst with a word (e.g. "SKRRT!") */
export function drawBurst(x, cx, cy, R, t, t0, { word = 'POP!', color = '#ffd34d', ink = INK, life = 0.8, size = 60 } = {}) {
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

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** a small floating heart that pops at t0 and drifts up */
export function floatHeart(x, t, t0, cx, cy, { cell = 7, life = 1.6, drift = 120 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = tt / life, k = pop01(t, t0, 0.3, 2.6)
  drawBits(x, HEART, HEART_C, cx + Math.sin(tt * 5) * 10, cy - drift * ease.outCubic(p), cell * k, { alpha: 1 - ease.inQuad(prog(p, 0.6, 1)) })
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
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
/** sprite-cell → canvas point (for props held by the star) */
export const spritePt = (F, u, v) => ({ x: F.ox + (u - G / 2) * F.cell * F.sx, y: F.oy + (v - G / 2 - F.base / F.cell) * F.cell * F.sy })
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
/** chunky canvas-space tear drops (readable at phone size) from a sprite frame's eyes; k 1…3 */
export function bigTears(x, t, F, k, alpha = 1) {
  if (k <= 0 || alpha <= 0.05) return
  const n = k >= 3 ? 4 : k >= 2 ? 3 : 1, px = Math.max(6, Math.round(F.cell * 1.6))
  x.save(); x.globalAlpha *= alpha
  for (const [u, d] of [[11, -1], [25, 1]]) {
    const e = spritePt(F, u, 21)
    for (let q = 0; q < n; q++) {
      const ph = ((t * (0.8 + k * 0.35) + q / n + (d > 0 ? 0.37 : 0)) % 1 + 1) % 1
      const sx = e.x + d * (k >= 3 ? 70 : 14) * ph, sy = e.y + (k >= 3 ? -30 * ph + 160 * ph * ph : 90 * ph * ph)
      x.fillStyle = '#1b1236'; x.fillRect(Math.round(sx - 2), Math.round(sy - 2), px + 4, px * 1.4 + 4)
      x.fillStyle = '#8fe3ff'; x.fillRect(Math.round(sx), Math.round(sy), px, px * 1.4)
      x.fillStyle = '#ffffff'; x.fillRect(Math.round(sx), Math.round(sy), px / 2, px / 2)
    }
  }
  x.restore()
}
/** any star with optional tears; returns the frame */
export function crier(x, t, P, opts, tears = 0) {
  drawStarChar(x, P.x, P.y, P.size, t, opts)
  const F = starFrame(P.x, P.y, P.size, t, opts)
  if (tears > 0) inSprite(x, F, () => tearsCells(x, t, Math.round(tears)))
  return F
}

// ── winter: falling pixel snow (deterministic) and a soft snow bank
function drawSnow(x, t, { n = 46, alpha = 1 } = {}) {
  x.save()
  for (let i = 0; i < n; i++) {
    const r1 = ((i * 7919) % 1000) / 1000, r2 = ((i * 104729) % 1000) / 1000, r3 = ((i * 15485863) % 1000) / 1000
    const sp = 40 + r2 * 70, sz = r3 > 0.8 ? 8 : r3 > 0.4 ? 6 : 4
    const y = ((r1 * 2000 + t * sp) % 2000) - 40
    const xx = (r2 * 1180 - 50 + Math.sin(t * (0.6 + r3) + i) * 26) % 1180
    x.globalAlpha = alpha * (0.35 + 0.5 * r3)
    x.fillStyle = SNOW
    x.fillRect(Math.round(xx), Math.round(y), sz, sz)
  }
  x.restore()
}
function drawBank(x, y, alpha = 1) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha = alpha
  const g = x.createLinearGradient(0, y - 40, 0, 1920)
  g.addColorStop(0, 'rgba(226,236,255,0.9)'); g.addColorStop(0.08, 'rgba(178,196,236,0.55)'); g.addColorStop(0.4, 'rgba(60,62,120,0.25)'); g.addColorStop(1, 'rgba(20,16,50,0)')
  x.fillStyle = g
  x.beginPath(); x.moveTo(0, 1920); x.lineTo(0, y + 10)
  for (let i = 0; i <= 27; i++) { const px = i * 40; x.lineTo(px, Math.round((y + Math.sin(i * 0.9) * 14 + Math.sin(i * 2.3) * 6) / 6) * 6) }
  x.lineTo(1080, 1920); x.closePath(); x.fill()
  x.restore()
}

// ── the film
const CPS = 30
const STAR_NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }

export function askFilm(S) {
  const DURATION = 20, STORY_END = DURATION - ENDCARD_LEN       // 15.6
  const SG = signStar(S.sign), COL = S.color || SG.color, PIS = signStar('pisces')
  const SPEAK = `${SG.glyph}︎ ${STAR_NAME[S.sign]} STAR`
  const HERO = { x: 540, y: 1000, size: 360, ...(S.hero || {}) }
  // the timeline: three lines, each readable ≥ 1.5 s after it finishes typing
  const T = { open: 2.3, l: [], done: [] }
  let at = 2.5
  for (const text of S.lines) {
    const [lt] = lineTimes([{ t: at, speaker: SPEAK, text }], { cps: CPS })
    T.l.push(at); T.done.push(lt.done)
    at = lt.done + 1.7
  }
  T.chip = 3.4
  T.dmOut = [T.l[1] - 0.4, T.l[1] - 0.12]
  T.close = T.done[2] + 1.55
  T.cut = T.close + 0.08
  T.h2 = T.cut + 0.1
  const nW = S.last.split(' ').filter(w => w !== '|').length, late = S.late ?? 2
  T.h2Land = T.h2 + (nW - late) * 0.08 + 0.32
  T.out = [STORY_END - 0.5, STORY_END - 0.1]
  T.h2Out = [STORY_END - 0.45, STORY_END - 0.15]
  T.end = STORY_END
  if (T.h2Land + 1.9 > T.out[0]) throw new Error(`${S.id}: the last line lands at ${T.h2Land.toFixed(2)} s, too late (lines too long)`)
  Object.assign(T, S.extraT ? S.extraT(T) : {})

  const LINES = S.lines.map((text, i) => ({ t: T.l[i], speaker: SPEAK, text, color: i === 1 ? (S.color2 || COL) : COL }))
  const HOPS = [...talkHops(LINES, SPEAK, { cps: CPS }), T.h2Land]
  const PC = S.pisces === false ? null : { x: 132, y: 1150, size: 210, ...(S.pisces || {}) }
  const tearsOf = S.tears || ((t) => (t < T.l[2] ? 1 : t < T.h2Land ? 2 : 3))

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const bug = buildBug(root, {})
    const DM = dmCard(root, { question: S.question, accent: COL, size: S.qSize || 88 })
    const CHIP = noteChip(root, { text: S.chip, color: COL, at: T.chip, top: S.chipTop || 1300 })
    const H2 = popText(root, S.last, { top: S.lastTop || 1335, size: S.lastSize || 120, accentSize: S.lastAccent || 170, at: T.h2, late, lateAt: T.h2Land, accentColor: COL })
    const TIE = S.tie ? el('div', { position: 'absolute', left: 0, width: W + 'px', top: (S.tieTop || 1650) + 'px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none', lineHeight: 1.35 }, root, S.tie) : null
    const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const sub = S.build ? await S.build(root, T) : null

    function hero(t) {
      const ok = popOut(t, T.out)
      if (ok <= 0) return null
      const st = S.state ? S.state(t, T) || {} : {}
      const P = { x: HERO.x + (st.dx || 0), y: HERO.y + (st.dy || 0), size: HERO.size }
      const opts = { color: COL, glyph: SG.glyph, mood: st.mood || 'happy', look: st.look, blink: st.blink, hops: st.hops === false ? null : HOPS, squash: st.squash || 0, seed: 4, glow: 1.1, pop: ok * (st.pop ?? 1), bob: st.bob, alpha: st.alpha ?? 1 }
      const H = { ...P, ok, st, opts, T }
      if (S.back) S.back(x, t, T, H)
      H.F = crier(x, t, P, opts, S.pisces === false ? tearsOf(t, T) : 0)
      if (S.pisces === false) bigTears(x, t, H.F, tearsOf(t, T), ok)
      if (S.front) S.front(x, t, T, H)
      return H
    }
    function cameo(t) {
      if (!PC) return
      const k = pop01(t, -0.4, 0.4, 2) * popOut(t, [T.out[0] - 0.05, T.out[1]])
      if (k <= 0.01) return
      const tl = tearsOf(t, T)
      const mood = t < T.h2Land ? 'sparkle' : 'happy'
      const hop = t >= T.h2Land ? [T.h2Land, T.h2Land + 0.65, T.h2Land + 1.3] : [T.chip + 0.3]
      const PF = crier(x, t, PC, { color: PIS.color, glyph: PIS.glyph, mood, look: [1, -1], seed: 9, glow: 0.8, pop: k, hops: hop }, tl)
      bigTears(x, t, PF, tl, k)
      // a tissue in its tip from the sniffles
      if (t > 1.0) drawBits(x, ['WWW', 'WWW', '.W.'], { W: '#ffffff' }, PC.x + PC.size * 0.42, PC.y + PC.size * 0.05 + Math.sin(t * 3) * 4, 7 * k, { rot: 0.3 })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.78 })
        drawSnow(x, t, { alpha: 0.9 })
        if (S.ground !== false) drawBank(x, HERO.y + 205, popOut(t, T.out))
        if (S.scene) S.scene(x, t, T)
        cameo(t)
        if (t < T.out[1] + 0.02) hero(t)
        if (S.over) S.over(x, t, T)
        if (TIE) { const k = pop01(t, T.h2Land + 0.25, 0.3, 2) * outK(t, T.h2Out); TIE.style.display = k > 0.01 && t >= T.h2 ? 'block' : 'none'; TIE.style.opacity = String(clamp(k * 2)); TIE.style.transform = `scale(${lerp(0.8, 1, clamp(k)).toFixed(3)})` }
        bug.update(t, outK(t, [T.out[0] + 0.1, T.out[1]]))
        DM.update(t, outK(t, T.dmOut))
        CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
        box.update(t)
        H2.update(t, outK(t, T.h2Out))
        if (sub) sub.update(t)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 }), cardCuts(CUTS)]
  const r3 = v => +v.toFixed(3)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    // the DM buzz on frame 0
    ['pop', 0.02, 987.77, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
    ['pop', T.open, 739.99, 0.04, 0], ['pop', r3(T.open + 0.06), 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
    ['whoosh', T.dmOut[0], 0.3, 0.03],
    ['pop', r3(T.close), 880, 0.03, 0], ['pop', r3(T.close + 0.07), 587.33, 0.03, 0],
    // the last line
    ...Array.from({ length: nW - late }, (_, i) => ['pop', r3(T.h2 + i * 0.08), NOTE[i % 7], 0.028, i % 2 ? 0.15 : -0.15]),
    ['pop', r3(T.h2Land), 1318.51, 0.05, 0], ['pluck', r3(T.h2Land), 1174.66, 0.05, 0.7, 0], ['bell', r3(T.h2Land + 0.3), 1760, 0.022, 1.0, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(S.cues ? S.cues(T) : []).map(c => c.map((v, i) => (i === 1 && typeof v === 'number' ? r3(v) : v))),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, LINES, DROP: T.l[0] }
}

export function askCues(id, F, { style, key, seed }) {
  return { id, duration: F.DURATION, music: { style, key, seed, sections: { drop: F.DROP, outroAt: F.DURATION - 4.4 } }, cues: F.CUES }
}
