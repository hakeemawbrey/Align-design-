// stmoon (20 s vertical Align ad, Star Talk batch 3) · story 0–15.6, then the shared end card ("come" + the Align logo).
//   0.00–2.70  "Your *Moon* | sign knows."  A pale moon star naps in the curve of a big pixel crescent (z's drifting up).
//              It flutters awake and looks straight at you.
//   2.82–8.10  Box (☽ THE MOON, soft): "your Sun is who you *show.*" (a little pixel sun pops up, all shine) →
//              "your Moon is what you *need.*" (the crescent glows; the star snuggles into it, happy).
//   8.10–11.6  "Sun. *Moon.* Rising."  The moon star scoots to the corner; a card rises and flips: YOUR BIG THREE,
//              Sun / Moon / Rising, the Moon row lit. Box: "date someone who meets your Moon, too."  Box pops shut.
//  11.75       card cut (flip).
//  11.85–15.5  "Feed your | *Moon.*"  The moon star back on its crescent, heart-eyed; little hearts float into the curve.
//              Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + crescent + sun + card + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.6, h0Out: [7.85, 8.05],
  starIn: 0.3, wake: [1.9, 2.35], open: 2.66, l1: BEAT(4),                  // 2.82
  sun: 3.15, sunOut: [5.25, 5.5], l2: 5.5, glow: 6.4, snug: [6.9, 7.8],
  scoot: [7.95, 8.45], h1: 8.1, l3: 8.3, cardUp: [8.1, 8.6], flip: [8.7, 9.1], moonRow: 9.3,
  close: 11.55, h1Out: [11.35, 11.55], cardOut: [11.3, 11.6],
  cut: 11.75,
  h2: 11.85, h2Land: 12.2, hearts: 12.6, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const MOON_TAG = '☽ THE MOON'
const LINES = [
  { t: T.l1, speaker: MOON_TAG, color: MOONLIGHT, text: 'your Sun is who you *show.*' },
  { t: T.l2, speaker: MOON_TAG, color: MOONLIGHT, text: 'your Moon is what you *need.*' },
  { t: T.l3, speaker: MOON_TAG, color: MOONLIGHT, text: 'date someone who meets your *Moon,* too.' },
]
const CPS = 27                                  // the Moon talks softly (a touch slower)
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  late > 0: the last `late` words pop big at lateAt; late < 0: the accented words pop big at lateAt. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = (late > 0 && n >= nW - late) || (late < 0 && acc)
    ws.push({ t: big && lateAt != null ? lateAt + (late > 0 ? (n - (nW - late)) * lateGap : 0) : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const SHADES = BMP(`XXXXX.XXXXX XWXXXXXWXXX XXXXX.XXXXX .XXX...XXX.`)
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1, col2 = '#ffffff' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? col2 : col; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// placements: the crescent + the star sitting in its curve
const HOME = { x: 540, y: 1010, s: 1 }, CORNER = { x: 180, y: 1190, s: 0.42 }
const STAR_OFF = { x: 70, y: 40, size: 300 }           // the star relative to the crescent centre (in its hollow)
const SUN = { x: 210, y: 650 }
const CARD = { x: 610, y: 940, w: 490 }                 // card body width (px)
const STAR_HOPS = [T.starIn + 0.4, T.wake[1] + 0.05, ...talkHops(LINES, MOON_TAG, { cps: CPS }), T.h2Land, T.hearts + 1.2]

function starState(t) {
  if (t < T.wake[0]) return { mood: 'sleepy', look: [0, 0] }
  if (t < T.wake[1]) { const k = prog(t, ...T.wake); return { mood: 'neutral', look: [0, 0], blink: k < 0.3 ? 1 : k < 0.5 ? 0.3 : k < 0.65 ? 1 : 0 } }
  if (t < T.l1) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.sun + 0.3) return { mood: 'neutral', look: [0, 0] }
  if (t < LT[0].done + 0.3) return { mood: 'neutral', look: [-1, -1] }        // glances at the sun
  if (t < T.l2) return { mood: 'squint', look: [-1, -1] }                      // "all shine…"
  if (t < T.glow) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.scoot[0]) return { mood: 'happy', look: [0, 0] }                    // snuggles into the crescent
  if (t < T.flip[1]) return { mood: 'wide', look: [1, -1] }
  if (t < T.close) return { mood: t < T.moonRow + 0.3 ? 'wide' : 'sparkle', look: [1, -1] }
  if (t < T.hearts) return { mood: 'happy', look: [0, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 600)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Your *Moon* | sign knows.', { top: 200, size: 124, accentSize: 180, at: T.h0, late: -1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: MOONLIGHT })
  const H1 = popText(root, 'Sun. *Moon.* Rising.', { top: 240, size: 100, accentSize: 140, at: T.h1, late: -1, lateAt: T.h1 + 0.22, wobble: true, gap: 0.12, accentColor: MOONLIGHT })
  const H2 = popText(root, 'Feed your | *Moon.*', { top: 200, size: 136, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: MOONLIGHT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // crescent sprite: a 34-cell disc minus an offset disc (opening to the right), shaded + craters
  const CG = 34
  const cres = document.createElement('canvas'); cres.width = cres.height = CG + 2
  {
    const o = cres.getContext('2d'), h = CG / 2
    const on = (i, j) => { const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h; return Math.hypot(u, v) <= 1 && Math.hypot(u - 0.62, v + 0.1) > 0.78 }
    for (let j = -1; j <= CG; j++) for (let i = -1; i <= CG; i++) {
      if (on(i, j)) {
        const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h
        let c = u + v < -0.5 ? '#fffbea' : u * 0.3 + v > 0.45 ? '#c9bfe6' : '#f1ecff'
        if ([[-0.62, -0.1, 0.12], [-0.4, 0.5, 0.09], [-0.25, -0.62, 0.08]].some(([a, b, r]) => Math.hypot(u - a, v - b) < r)) c = '#d6cdf2'
        o.fillStyle = c; o.fillRect(i + 1, j + 1, 1, 1)
      } else if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) { o.fillStyle = '#3a2a6e'; o.fillRect(i + 1, j + 1, 1, 1) }
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function place(t) {
    if (t >= T.cut) return HOME
    const e = ease.inOutCubic(prog(t, ...T.scoot))
    return { x: lerp(HOME.x, CORNER.x, e), y: lerp(HOME.y, CORNER.y, e) - Math.sin(Math.PI * e) * 80, s: lerp(HOME.s, CORNER.s, e) }
  }
  function drawMoon(t) {
    const ok = popOut(t, T.out)
    let pk = pop01(t, T.starIn - 0.1, 0.5, 1.6)
    if (t >= T.cut) pk = pop01(t, T.cut + 0.1, 0.42, 1.8)
    pk *= ok
    if (pk <= 0.01) return
    const P = place(t), bob = Math.sin(t * 1.6) * 10 * P.s
    const cx = P.x - 60 * P.s, cy = P.y + bob, R = 250 * P.s * pk
    const gl = 0.6 + (t > T.glow && t < T.scoot[0] ? 0.6 * pop01(t, T.glow, 0.4, 1.4) : 0) + (t > T.hearts ? 0.4 : 0)
    glow(cx, cy, R * 1.9, MOONLIGHT, gl)
    const cell = Math.max(2, Math.round(2 * R / CG))
    x.save(); x.imageSmoothingEnabled = false
    x.translate(Math.round(cx), Math.round(cy)); x.rotate(-0.18)
    x.drawImage(cres, -cell * (CG / 2 + 1), -cell * (CG / 2 + 1), cell * (CG + 2), cell * (CG + 2))
    x.restore()
    // the star in the hollow
    const st = starState(t)
    const snug = t > T.snug[0] && t < T.snug[1] ? 0.08 * Math.sin(Math.PI * prog(t, ...T.snug)) : 0
    drawStarChar(x, P.x + STAR_OFF.x * P.s, cy + STAR_OFF.y * P.s, STAR_OFF.size * P.s * pk, t, { color: MOONC, glyph: P.s > 0.6 ? '☽' : null, ...st, squash: snug, hops: STAR_HOPS, seed: 7, glow: 1.1, blush: st.mood === 'happy' || st.mood === 'heart' ? 1 : undefined })
  }

  // the little sun: "who you show" (rays spin, shades on)
  function drawSun(t) {
    const k = pop01(t, T.sun, 0.36, 2.2) * (1 - ease.inCubic(prog(t, ...T.sunOut)))
    if (k <= 0.01) return
    const cx = SUN.x, cy = SUN.y + Math.sin(t * 2.4) * 6, r = 64 * k
    glow(cx, cy, r * 3, GOLD, 0.9)
    x.save(); x.translate(cx, cy); x.rotate(t * 0.8)
    for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); x.fillStyle = 'rgba(14,8,32,0.85)'; x.fillRect(-10 * k, -r * 1.62, 20 * k, r * 0.5); x.fillStyle = '#ffd24a'; x.fillRect(-6 * k, -r * 1.58, 12 * k, r * 0.42) }
    x.restore()
    x.fillStyle = 'rgba(14,8,32,0.85)'; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd24a'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.3, 0, Math.PI * 2); x.fill()
    bits(x, SHADES, cx, cy - r * 0.05, 9 * k, '#140c2c', { col2: '#8fd8f6' })
    // label
    x.save(); x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.globalAlpha = clamp(k); x.letterSpacing = '0.18em'
    x.fillText('SUN', cx + 4, cy + r * 2.1 + 12); x.restore()
  }

  // ── the big-three card: card back rises, flips to a drawn face
  function drawFace(w, h, t) {
    const rr = (X, Y, ww, hh, r) => { x.beginPath(); x.roundRect(X, Y, ww, hh, r) }
    x.save(); x.shadowColor = rgba(LAV, 0.6); x.shadowBlur = 50
    rr(-w / 2, -h / 2, w, h, 28); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1858'); g.addColorStop(1, '#170d36'); x.fillStyle = g; x.fill()
    x.restore()
    x.lineWidth = 5; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 28); x.stroke()
    x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.35); rr(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 18); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.75); x.letterSpacing = '0.2em'; x.fillText('YOUR BIG THREE', 4, -h / 2 + 64); x.letterSpacing = '0px'
    const rows = [
      { g: '☉', name: 'SUN', sub: 'who you show', col: GOLD },
      { g: '☽', name: 'MOON', sub: 'what you need', col: MOONLIGHT },
      { g: '↑', name: 'RISING', sub: 'your first hello', col: PINK },
    ]
    const lit = pop01(t, T.moonRow, 0.4, 1.8)
    rows.forEach((r, i) => {
      const y = -h / 2 + h * 0.235 + i * h * 0.225, moon = i === 1
      if (moon && lit > 0) {
        x.save(); x.shadowColor = MOONLIGHT; x.shadowBlur = 30 * lit
        rr(-w / 2 + 26, y - 72, w - 52, 144, 20); x.fillStyle = rgba(MOONLIGHT, 0.2 * lit); x.fill(); x.lineWidth = 3; x.strokeStyle = rgba(MOONLIGHT, lit); x.stroke(); x.restore()
      }
      x.textAlign = 'left'
      x.font = `700 64px ${SYM}`; x.fillStyle = r.col; x.fillText(r.g + '︎', -w / 2 + 54, y + 2)
      x.font = `800 48px ${INTER}`; x.fillStyle = BONE; x.fillText(r.name, -w / 2 + 136, y - 20)
      x.font = `italic 500 42px ${SERIF}`; x.fillStyle = rgba(r.col, 0.95); x.fillText(r.sub, -w / 2 + 136, y + 26)
    })
    x.textAlign = 'center'; x.font = `700 20px ${MONO}`; x.fillStyle = rgba(BONE, 0.45); x.letterSpacing = '0.2em'; x.fillText('ALIGN · TONIGHT', 4, h / 2 - 40); x.letterSpacing = '0px'
  }
  function drawCard(t) {
    if (t < T.cardUp[0] || t > T.cardOut[1]) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4), o = prog(t, ...T.cardOut)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const w = CARD.w * (1 - 0.8 * ease.inCubic(o)), h = w / 0.6265
    const cx = CARD.x, cy = lerp(2300, CARD.y, up) - ease.inCubic(o) * 200 + Math.sin(t * 1.8) * 6
    const halo = up * (1 - o)
    glow(cx, cy, 560, MOONLIGHT, 0.5 * halo * (f > 0.5 ? 1 : 0.4))
    x.save(); x.translate(cx, cy); x.rotate(lerp(0.12, -0.03, up)); x.globalAlpha = 1 - o
    if (sx > 0) { x.scale(sx, 1); if (BACK) { const bw = w / BACK_BODY, bh = bw * BACK.height / BACK.width; x.drawImage(BACK, -bw / 2, -bh / 2, bw, bh) } }
    else { x.scale(-sx, 1); drawFace(w, h, t) }
    x.restore()
    if (f > 0.5) sparkles(t, cx, cy, T.flip[1] - 0.1, 12, 330, 2, [GOLD, BONE, MOONLIGHT, LAV])
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MOONLIGHT, LAV]) {
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
  // hearts drift in from the sides and land in the crescent's curve ("feeding" the Moon)
  function feedHearts(t) {
    if (t < T.hearts || t > T.out[0]) return
    for (let i = 0; i < 10; i++) {
      const born = T.hearts + i * 0.24, life = 1.0
      if (t < born) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = i % 2 ? 1 : -1
      const sx0 = 540 + side * (420 + (i * 23) % 80), sy0 = 1350 - (i * 47) % 260
      const tx = HOME.x + 30, ty = HOME.y + 40
      const e = ease.inOutCubic(p)
      bits(x, HEART, lerp(sx0, tx, e), lerp(sy0, ty, e) - Math.sin(Math.PI * p) * 160, 10 * (1 - 0.4 * e), [PINK, '#ff4f86', GOLD, MOONLIGHT][i % 4], { a: Math.min(1, (1 - p) * 4) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      if (t < T.out[1] + 0.02) {
        drawSun(t)
        drawCard(t)
        drawMoon(t)
        feedHearts(t)
        sparkles(t, HOME.x, HOME.y, T.wake[1], 10, 260, 1)
        sparkles(t, HOME.x, HOME.y, T.h2Land, 12, 300, 3)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 8.05 (inert: the star scoots aside on its own as the card rises), 11.75 (box shut → last line).
const CUTS = [8.0, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.045, 0], ['bell', T.h0Land, 1567.98, 0.025, 1.6, 0],
  ['glitter', T.starIn, T.starIn + 0.6],
  ['tick', T.wake[0] + 0.1, 0.03], ['tick', T.wake[0] + 0.25, 0.025], ['bell', T.wake[1], 1318.51, 0.03, 1.4, 0],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MOON_TAG]: 740 }, gain: 0.015 }),
  ['pop', T.sun + 0.1, 880, 0.04, -0.4], ['pluck', T.sun + 0.15, 1318.51, 0.035, 0.6, -0.4],
  ['whoosh', T.sunOut[0], 0.3, 0.025],
  ['bell', T.glow, 1046.5, 0.035, 2.0, 0], ['glitter', T.glow, T.glow + 0.6],
  // the big three
  ['whoosh', T.scoot[0], 0.45, 0.035], ...wordPops(T.h1, 3, 0.12, 2, 0.026),
  ['whoosh', T.cardUp[0], 0.4, 0.03], ['tick', T.flip[0] + 0.05, 0.05], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[1] - 0.1, T.flip[1] + 0.5],
  ['pluck', T.moonRow, 1567.98, 0.035, 0.7, 0],
  ['whoosh', T.cardOut[0], 0.3, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // feed your moon
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.hearts + i * 0.24 + 0.95).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.014, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
