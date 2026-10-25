// htxstars (45 s vertical) · "In Houston, you can barely see the stars." → "We'll show you yours." (Hakeem's chart blooms:
// Sun Taurus, Moon Sagittarius, Rising Libra) → "Your chart says more than any selfie." → quick feature tour (mystery card,
// tonight's deck, talk cards, the Push/Pull/Align reading) → "The stars are still up there. Look up." → plain sky H from
// 40.35, the shared end card takes over at 40.6. One canvas, DOM type above it, grain on top. Pure f(t), no top-level DOM.
//
// Beat map (108 bpm, B(n) = 0.6 + n·0.5556):
//   0.25  "In Houston, | you can barely | see the stars." (stars on B1), orange city haze, skyline, a pictogram looking up
//   1.5   the person pops · 1.95 one weak star flickers · B4 2.82 "Just one sad star. | Hi, buddy."    (out 5.5)
//   5.9   "We'll show you yours." (yours on B10) · 6.2–7.6 the haze clears, the stars flood back
//   6.16  the sad star swells gold · 6.75–7.27 it flies to the centre · B12 7.27 the wheel blooms
//   B15/B16/B17  Sun ♉ / Moon ♐ / Rising ♎ pop onto the chart, their signs light       (head out 10.45)
//   10.75 "Your chart says more | than any selfie." (B19) · 11.71 a selfie phone pops · 12.27 flash · B23 13.38 it gets
//         flicked away · "No offense, selfie."                                            (out 15.0) · 14.85–15.4 all out
//   features, 9 beats each from B27 15.6 / B36 20.6 / B45 25.6 / B54 30.6:
//     01 mystery card (card-profile-3 drops, CHART / FACE stickers)  02 tonight's deck (card backs deal into a fan)
//     03 talk cards ("hey" bubble deflates, card-talk-1 flips in)     04 the reading (two wheels, Push/Pull/Align lines)
//   B63 35.6 skyline rises, "The stars are still | up there." · B67 37.82 "Look up." + star bursts, the arm points up
//   39.5–40.3 everything sinks/pops out → plain H (drawSky(SKY_H) + grain) from 40.35
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../src/lib.js'
import { W, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, READING, easeOutBack, drawWheelH } from '../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SILVER = '#e3ecff', INK = '#120a2a', SMOG = '#ff9a4a', BLUE = '#8fd8f6'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const VS = '︎'
export const BEAT = n => 0.6 + n * 0.5556
const D2R = Math.PI / 180
const sign = id => SIGNS.find(s => s.id === id)
const TAU = sign('taurus'), SAG = sign('sagittarius'), LIB = sign('libra')
const angOf = lon => Math.PI - lon * D2R
const at = (cx, cy, lon, r) => ({ x: cx + Math.cos(angOf(lon)) * r, y: cy + Math.sin(angOf(lon)) * r })

export const END = 40.61, CLEAR = 40.35
// ── beats
export const T = {
  h0: 0.25, h0Last: BEAT(1), h0Out: [5.5, 5.7],
  person: 1.5, star: 1.95, s0: BEAT(4), s0Out: [5.5, 5.7],
  h1: 5.9, h1Last: BEAT(10), h1Out: [10.45, 10.65],
  haze: [6.2, 7.6], swell: BEAT(10), fly: [6.75, BEAT(12)], bloom: BEAT(12),
  planets: [BEAT(15), BEAT(16), BEAT(17)], tri: 10.4,
  h2: 10.75, h2Last: BEAT(19), h2Out: [15.0, 15.2],
  phone: BEAT(20), flash: BEAT(21), flick: BEAT(23), s2: BEAT(23), s2Out: [15.0, 15.2],
  chartOut: 14.85, cityOut: [14.9, 15.5],
  feat: [BEAT(27), BEAT(36), BEAT(45), BEAT(54)],
  fin: BEAT(63), finRise: [BEAT(63) - 0.1, BEAT(63) + 0.7], lookUp: BEAT(67), finOut: [39.7, 39.95], cityOut2: [39.45, 40.3],
}
const FEAT_SUB = 2.25, FEAT_OUT = 4.55   // offsets inside each 5-second feature

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

/** a glowing orb: big soft halo, shaded sphere, a pixel-star glint */
function orb(x, px, py, r, color, a, halo = 3.6) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.9))
  x.restore()
}
function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last word may pop late with a wobble */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, tintColor = null, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*'), tint = w.startsWith('~') || w.endsWith('~')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (tint) style.color = tintColor || accentColor
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/[*~]/g, '')) })
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
    words: () => ws.map(w => w.t),
  }
}
const head = (root, text, t0, opts = {}) => popText(root, text, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...opts })
const sub = (root, text, t0, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 68, ...opts })

function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}

// ── the city: a generic skyline silhouette (no landmarks), lit windows, a ground ledge
const TOWERS = (() => {
  const r = rng(77), out = []
  const spec = [[-20, 150, 300], [110, 120, 440], [215, 95, 330], [300, 150, 600, 'spire'], [440, 110, 470, 'step'], [540, 135, 690, 'peak'],
    [665, 100, 410], [755, 150, 540, 'step'], [895, 95, 360, 'spire'], [980, 130, 470]]
  for (const [x0, w, h, kind] of spec) {
    const wins = []
    for (let yy = 40; yy < h - 30; yy += 46) for (let xx = 22; xx < w - 22; xx += 34) if (r() < 0.42) wins.push({ x: xx, y: yy, s: r() * 10, on: r() })
    out.push({ x0, w, h, kind, wins })
  }
  return out
})()
const GROUND = 1800
function drawCity(x, t, { dy = 0, ledge = dy, haze = 0, a = 1 }) {
  if (a <= 0 || ledge > 900) return
  x.save(); x.globalAlpha = a; x.translate(0, dy)
  const edge = haze > 0.5 ? SMOG : BONE
  for (const b of TOWERS) {
    const top = GROUND - b.h
    x.beginPath()
    if (b.kind === 'step') { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top + 60); x.lineTo(b.x0 + b.w * 0.2, top + 60); x.lineTo(b.x0 + b.w * 0.2, top); x.lineTo(b.x0 + b.w * 0.8, top); x.lineTo(b.x0 + b.w * 0.8, top + 60); x.lineTo(b.x0 + b.w, top + 60); x.lineTo(b.x0 + b.w, GROUND) }
    else if (b.kind === 'peak') { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top + 70); x.lineTo(b.x0 + b.w / 2, top - 20); x.lineTo(b.x0 + b.w, top + 70); x.lineTo(b.x0 + b.w, GROUND) }
    else { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top); x.lineTo(b.x0 + b.w, top); x.lineTo(b.x0 + b.w, GROUND) }
    x.fillStyle = '#100a22'; x.fill()
    glowStroke(x, edge, 5, 14); x.globalAlpha = a * 0.75; x.stroke(); x.globalAlpha = a
    if (b.kind === 'spire') { x.beginPath(); x.moveTo(b.x0 + b.w / 2, top); x.lineTo(b.x0 + b.w / 2, top - 70); x.stroke()
      const blink = Math.sin(t * 4 + b.x0) > 0.3 ? 1 : 0.25
      x.shadowBlur = 0; x.fillStyle = rgba('#ff5a5a', blink); x.beginPath(); x.arc(b.x0 + b.w / 2, top - 74, 7, 0, Math.PI * 2); x.fill() }
    x.shadowBlur = 0
    for (const w of b.wins) {
      const fl = 0.55 + 0.45 * Math.sin(t * 0.7 + w.s)
      x.fillStyle = rgba('#ffcf7a', (w.on > 0.3 ? 0.55 : 0.18) * fl)
      x.fillRect(b.x0 + w.x, top + w.y, 14, 20)
    }
  }
  x.restore()
  // ground ledge (the rooftop the person stands on): it dips less than the towers
  x.save(); x.globalAlpha = a; x.translate(0, ledge)
  x.fillStyle = '#0b0718'; x.fillRect(0, GROUND, W, 400)
  glowStroke(x, edge, 6, 16); x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); x.stroke()
  x.restore()
}

/** pictogram person (no face), feet at (px, py). look 0..1 leans back with the head tipped up; point 0..1 raises an arm at the sky */
function person(x, px, py, s, a, { look = 0.6, point = 0, t = 0 } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(px, py); x.scale(s, s); x.rotate(-0.1 * look)
  glowStroke(x, BONE, 8, 16)
  x.beginPath(); x.moveTo(-18, 0); x.lineTo(0, -40); x.lineTo(18, 0)           // legs
  x.moveTo(0, -40); x.lineTo(-2, -84)                                            // body
  x.moveTo(-1, -72); x.lineTo(-24, -48)                                          // back arm down
  const ang = lerp(0.9, -0.75, point) + 0.05 * Math.sin(t * 5) * point          // front arm: hangs → points up-right
  x.moveTo(-1, -72); x.lineTo(-1 + Math.cos(ang) * 52, -72 + Math.sin(ang) * 52); x.stroke()
  x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16; x.fillStyle = BONE
  x.beginPath(); x.ellipse(-9 * look, -104, 16, 18, -0.5 * look, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** the haze: an orange city-glow wash, strongest at the horizon, with slow smog bands */
function drawHaze(x, t, k) {
  if (k <= 0.002) return
  x.save()
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, rgba('#6b3a3a', 0.42 * k)); g.addColorStop(0.45, rgba('#b8603a', 0.5 * k)); g.addColorStop(0.85, rgba('#ff8a42', 0.72 * k)); g.addColorStop(1, rgba('#ffae5c', 0.85 * k))
  x.fillStyle = g; x.fillRect(0, 0, W, 1920)
  x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 4; i++) {
    const yy = 700 + i * 260 + 30 * Math.sin(t * 0.4 + i), xx = 540 + 260 * Math.sin(t * 0.13 + i * 1.7)
    const r = x.createRadialGradient(xx, yy, 0, xx, yy, 560)
    r.addColorStop(0, rgba(SMOG, 0.12 * k)); r.addColorStop(1, rgba(SMOG, 0))
    x.fillStyle = r; x.beginPath(); x.ellipse(xx, yy, 700, 180, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

// ── chart geometry
const WC = { cx: 540, cy: 1000, rOut: 380, rIn: 300, rGlyph: 340, alpha: 0.92 }
const PLACE = [
  { role: 'SUN', s: TAU, lon: 51, col: GOLD, r: 30 },
  { role: 'MOON', s: SAG, lon: 255, col: SILVER, r: 26 },
  { role: 'RISING', s: LIB, lon: 192, col: LIB.color, r: 24 },
].map((p, i) => ({ ...p, t0: T.planets[i], ...at(WC.cx, WC.cy, p.lon, p.lon === 192 ? 180 : 200), b: makeBurst(300 + i, 10, 120) }))
const STAR0 = { x: 790, y: 700 }

/** pill label: a small mono role over a big sign name (with glyph) */
function label(x, px, py, role, s, k, roleCol) {
  if (k <= 0) return
  x.save(); x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(k * 2)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 40px ${INTER}`
  const name = s.name.toUpperCase(), w = x.measureText(name).width + 70
  x.fillStyle = 'rgba(12,8,30,0.82)'; x.beginPath(); x.roundRect(-w / 2, -26, w, 58, 29); x.fill()
  glowStroke(x, s.color, 4, 14); x.stroke(); x.shadowBlur = 0
  x.fillStyle = s.color; x.font = `bold 40px ${GLYPH_FONT}`; x.fillText(s.glyph + VS, -w / 2 + 34, 4)
  x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.fillText(name, 14, 4)
  x.fillStyle = roleCol; x.font = `700 30px ${MONO}`; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 10; x.fillText(role, 0, -50)
  x.restore()
}

/** a sticker: a coloured rounded tag with dark text, stamped on with a squash */
function sticker(x, px, py, txt, col, t, t0, rot, k) {
  if (t < t0 || k <= 0) return
  const p = prog(t, t0, t0 + 0.32), sq = p < 1 ? lerp(1.6, 1, easeOutBack(p, 2.6)) : 1
  x.save(); x.translate(px, py); x.rotate(rot * D2R); x.scale(sq * k, k / sq); x.globalAlpha = clamp(p * 4)
  x.font = `800 44px ${INTER}`; const w = x.measureText(txt).width + 56
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 24; x.shadowOffsetY = 8
  x.fillStyle = col; x.beginPath(); x.roundRect(-w / 2, -40, w, 80, 18); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0; x.strokeStyle = 'rgba(255,255,255,0.65)'; x.lineWidth = 4; x.stroke()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 4)
  x.restore()
}

/** draw an image centred at (cx, cy), width w, with a coloured glow */
function card(x, im, cx, cy, w, rot, a, glowCol, scaleX = 1) {
  if (!im || a <= 0) return
  const h = w * im.height / im.width
  x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(scaleX, 1); x.globalAlpha = clamp(a)
  x.shadowColor = rgba(glowCol, 0.75); x.shadowBlur = 50
  x.drawImage(im, -w / 2, -h / 2, w, h)
  x.shadowBlur = 0; x.drawImage(im, -w / 2, -h / 2, w, h)
  x.restore()
}

/** a mini chart wheel: ring with coloured sign washes, glyphs, three planet dots */
function miniWheel(x, cx, cy, r, k, rot, dots, t) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.globalAlpha = clamp(k * 2)
  const ri = r * 0.74
  SIGNS.forEach((s, i) => {
    const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
    x.fillStyle = rgba(s.color, 0.3); x.beginPath(); x.arc(0, 0, r, a1, a0); x.arc(0, 0, ri, a0, a1, true); x.closePath(); x.fill()
  })
  glowStroke(x, BONE, 5, 14)
  x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.lineWidth = 3; x.beginPath(); x.arc(0, 0, ri, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = angOf(i * 30); x.beginPath(); x.moveTo(Math.cos(a) * ri, Math.sin(a) * ri); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.shadowBlur = 0; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 30px ${GLYPH_FONT}`
  SIGNS.forEach((s, i) => { const a = angOf(i * 30 + 15), rr = (r + ri) / 2; x.fillStyle = s.color; x.fillText(s.glyph + VS, Math.cos(a) * rr, Math.sin(a) * rr) })
  x.restore()
  for (const d of dots) { const p = { x: cx + Math.cos(angOf(d.lon) + rot) * ri * 0.62 * k, y: cy + Math.sin(angOf(d.lon) + rot) * ri * 0.62 * k }; orb(x, p.x, p.y, 13 * k, d.col, clamp(k * 2), 3); d.p = p }
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [imProfile, imBack, imTalk] = await Promise.all(['card-profile-3.png', 'card-back.png', 'card-talk-1.png'].map(f => loadImage(A + f)))
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = (txt, col = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: col, textShadow: SHADOW, opacity: 0 }, root, txt)
  const F = T.feat
  const EYES = [
    [eyebrow('HOUSTON, TX · TONIGHT', SMOG), 0.1, T.h0Out],
    [eyebrow('01 · THE MYSTERY CARD', PINK), F[0], [F[0] + FEAT_OUT, F[0] + FEAT_OUT + 0.2]],
    [eyebrow("02 · TONIGHT'S DECK"), F[1], [F[1] + FEAT_OUT, F[1] + FEAT_OUT + 0.2]],
    [eyebrow('03 · TALK CARDS', BLUE), F[2], [F[2] + FEAT_OUT, F[2] + FEAT_OUT + 0.2]],
    [eyebrow('04 · THE READING'), F[3], [F[3] + FEAT_OUT, F[3] + FEAT_OUT + 0.2]],
  ]
  const H0 = head(root, 'In Houston, | you can barely | see the *stars.*', T.h0, { accentColor: GOLD, lastAt: T.h0Last, wobble: true, gap: 0.06 })
  const H1 = head(root, "We'll show you | *yours.*", T.h1, { accentColor: GOLD, lastAt: T.h1Last, wobble: true, accentSize: 150 })
  const H2 = head(root, 'Your chart | says more than | any *selfie.*', T.h2, { size: 100, accentSize: 116, accentColor: PINK, lastAt: T.h2Last, wobble: true })
  const HF = [
    head(root, 'Card *first.* | Face last.', F[0] + 0.05, { accentColor: PINK }),
    head(root, 'A new *deck,* | every night.', F[1] + 0.05, { accentColor: GOLD }),
    head(root, 'Skip the | *small talk.*', F[2] + 0.05, { accentColor: BLUE, accentSize: 128 }),
    head(root, 'See how | you *fit.*', F[3] + 0.05, { accentColor: GOLD, accentSize: 128 }),
  ]
  const H3 = head(root, 'The stars are | still up there.', T.fin)
  const LOOK = popText(root, '*Look* *up.*', { top: 610, size: 170, font: INTER, weight: 800, accentColor: GOLD, accentSize: 200, at: T.lookUp, gap: 0.12 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], ...HF.map((h, i) => [h, [F[i] + FEAT_OUT, F[i] + FEAT_OUT + 0.2]]), [H3, T.finOut], [LOOK, T.finOut]]
  const S0 = popText(root, 'Just one sad star. | Hi, buddy.', { top: 880, size: TYPE.subSize, font: INTER, weight: 700, at: T.s0, gap: 0.06 })
  const S2 = sub(root, 'No offense, *selfie.*', T.s2, { accentColor: PINK, top: 1445 })
  const SF = [
    sub(root, 'No photo until | you *both* align.', F[0] + FEAT_SUB, { accentColor: PINK }),
    sub(root, 'Dealt from the *stars.*', F[1] + FEAT_SUB),
    sub(root, 'Questions worth | *answering.*', F[2] + FEAT_SUB, { accentColor: BLUE }),
    sub(root, 'Where you ~click.~ | Where you clash.', F[3] + FEAT_SUB, { tintColor: GOLD }),
  ]
  const SUBS = [[S0, T.s0Out], [S2, T.s2Out], ...SF.map((s, i) => [s, [F[i] + FEAT_OUT, F[i] + FEAT_OUT + 0.2]])]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(500 + k, n, d)

  // ── haze level, city offset, person
  const hazeK = t => 1 - ease.inOutCubic(prog(t, ...T.haze))
  const cityDy = t => {
    if (t < T.fin - 1) {
      const lower = 430 * ease.inOutCubic(prog(t, 6.6, 8.0))                       // dips a little as the chart blooms
      return lower + 900 * ease.inCubic(prog(t, ...T.cityOut))
    }
    return 900 * (1 - ease.outCubic(prog(t, ...T.finRise))) + 900 * ease.inCubic(prog(t, ...T.cityOut2))
  }

  // ── act 1: the sad star
  const B_STAR = B(1, 10, 110)
  function drawSadStar(t) {
    if (t < T.star || t > T.bloom + 0.05) return
    const k = pop01(t, T.star, 0.5)
    const fl = 0.35 + 0.3 * noise1(t * 6, 4) + 0.2 * Math.max(0, Math.sin(t * 2.3))       // sputters
    const sw = ease.outCubic(prog(t, T.swell, T.swell + 0.4))
    const fp = ease.inCubic(prog(t, ...T.fly))
    const px = lerp(STAR0.x, WC.cx, fp), py = lerp(STAR0.y, WC.cy, fp) - 120 * Math.sin(Math.PI * fp)
    const size = lerp(35, 56, sw) * k
    x.save()
    if (sw > 0) { x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py, 0, px, py, 150 * sw); g.addColorStop(0, rgba(GOLD, 0.55)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.beginPath(); x.arc(px, py, 150 * sw, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'source-over' }
    x.globalAlpha = lerp(fl, 1, sw) * clamp(k * 2)
    x.imageSmoothingEnabled = false
    drawPixelStar(x, Math.round(px), Math.round(py), Math.round(size), 0, lerp(0, 1, sw) > 0.5 ? GOLD : '#d9c9b0')
    x.imageSmoothingEnabled = true
    x.restore()
    drawBurst(x, B_STAR, px, py, t, T.swell, GOLD, 0.7)
    // dashed line of sight from the person's head (fades as the haze clears)
    const lk = clamp(k) * outK(t, [T.swell - 0.2, T.swell + 0.1]) * prog(t, T.star + 0.3, T.star + 0.8)
    if (lk > 0) {
      x.save(); glowStroke(x, BONE, 4, 6); x.globalAlpha = 0.45 * lk; x.setLineDash([12, 16]); x.lineDashOffset = -t * 30
      const hx = 145, hy = GROUND - 2.5 * 104
      x.beginPath(); x.moveTo(hx + 40, hy - 40); x.lineTo(lerp(hx + 40, STAR0.x - 40, lk), lerp(hy - 40, STAR0.y + 40, lk)); x.stroke(); x.restore()
    }
  }

  // ── act 2: the chart blooms
  const B_BLOOM = B(2, 16, 260)
  const wheelXf = t => {
    const b = prog(t, T.bloom, T.bloom + 0.75)
    const o = prog(t, T.chartOut, T.chartOut + 0.5)
    return { s: easeOutBack(b, 1.6) * (1 - ease.inCubic(o)) + 0 * o, rot: (1 - ease.outCubic(b)) * -1.6 + ease.inCubic(o) * 1.2, a: clamp(b * 3) * (1 - ease.inQuad(o)) }
  }
  function drawChart(t) {
    if (t < T.bloom - 0.01 || t > T.chartOut + 0.55) return
    const { s, rot, a } = wheelXf(t)
    if (s <= 0.01) return
    x.save(); x.translate(WC.cx, WC.cy); x.rotate(rot); x.scale(s, s); x.translate(-WC.cx, -WC.cy); x.globalAlpha = a
    // inner disc
    x.fillStyle = 'rgba(10,7,26,0.55)'; x.beginPath(); x.arc(WC.cx, WC.cy, WC.rIn, 0, Math.PI * 2); x.fill()
    // lit segments for the three placements
    PLACE.forEach(p => {
      const L = ease.outCubic(prog(t, p.t0, p.t0 + 0.3)) * (0.75 + 0.25 * Math.sin((t - p.t0) * 5))
      if (L <= 0) return
      const i = SIGNS.indexOf(p.s), a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
      x.save(); x.globalAlpha = a * 0.55 * L; x.fillStyle = p.s.color
      x.beginPath(); x.arc(WC.cx, WC.cy, WC.rOut, a1, a0); x.arc(WC.cx, WC.cy, WC.rIn, a0, a1, true); x.closePath(); x.fill(); x.restore()
    })
    x.globalAlpha = 1
    drawWheelH(x, { k: a, W: WC })
    // spokes from the centre to each placement, then the triangle that joins them
    x.save(); x.globalAlpha = a
    PLACE.forEach(p => {
      const k = ease.outCubic(prog(t, p.t0 - 0.1, p.t0 + 0.15))
      if (k <= 0) return
      glowStroke(x, p.s.color, 3, 10); x.globalAlpha = a * 0.5; x.setLineDash([8, 10])
      x.beginPath(); x.moveTo(WC.cx, WC.cy); x.lineTo(lerp(WC.cx, p.x, k), lerp(WC.cy, p.y, k)); x.stroke(); x.setLineDash([])
    })
    const tk = ease.inOutCubic(prog(t, T.tri, T.tri + 0.6))
    if (tk > 0) {
      glowStroke(x, GOLD, 4, 18); x.globalAlpha = a * 0.85
      x.beginPath()
      for (let i = 0; i < 3; i++) { const p0 = PLACE[i], p1 = PLACE[(i + 1) % 3], e = clamp(tk * 3 - i); if (e <= 0) break; x.moveTo(p0.x, p0.y); x.lineTo(lerp(p0.x, p1.x, e), lerp(p0.y, p1.y, e)) }
      x.stroke()
    }
    x.restore()
    // centre spark
    x.save(); x.globalAlpha = a; x.imageSmoothingEnabled = false; drawPixelStar(x, WC.cx, WC.cy, 28, 0, GOLD); x.restore()
    // the planets + labels
    PLACE.forEach((p, i) => {
      if (t < p.t0) return
      const k = pop01(t, p.t0, 0.4)
      const bob = 5 * Math.sin((t - p.t0) * 2.6 + i)
      orb(x, p.x, p.y + bob, p.r * k, p.col, clamp(k * 2) * a, 3.4)
      label(x, p.x, p.y + 92, p.role, p.s, pop01(t, p.t0 + 0.08, 0.38) * a, p.col)
      drawBurst(x, p.b, p.x, p.y, t, p.t0, p.s.color, 0.7)
    })
    x.restore()
    drawBurst(x, B_BLOOM, WC.cx, WC.cy, t, T.bloom, GOLD, 0.9)
  }

  // ── the selfie phone (gets flicked away)
  const B_FLICK = B(3, 10, 120)
  function drawPhone(t) {
    if (t < T.phone || t > T.flick + 0.9) return
    const k = pop01(t, T.phone, 0.42)
    const f = ease.inCubic(prog(t, T.flick, T.flick + 0.6))
    const px = 880 + 900 * f, py = 1400 - 500 * f + 900 * f * f, rot = 12 + 540 * f
    x.save(); x.translate(px, py); x.rotate(rot * D2R); x.scale(k, k)
    x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30
    x.fillStyle = '#17112e'; x.beginPath(); x.roundRect(-95, -165, 190, 330, 32); x.fill()
    x.shadowBlur = 0
    x.fillStyle = rgba(PINK, 0.25); x.beginPath(); x.roundRect(-78, -140, 156, 270, 18); x.fill()
    glowStroke(x, BONE, 7, 16); x.beginPath(); x.roundRect(-95, -165, 190, 330, 32); x.stroke()
    // head-and-shoulders silhouette, no face, plus a peace-sign-ish raised hand
    x.shadowBlur = 0; x.fillStyle = rgba(BONE, 0.85)
    x.beginPath(); x.arc(0, -30, 34, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.moveTo(-62, 120); x.quadraticCurveTo(-60, 20, 0, 18); x.quadraticCurveTo(60, 20, 62, 120); x.closePath(); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${MONO}`; x.textAlign = 'center'; x.fillText('●', 0, -148)
    // flash
    const fl = Math.sin(Math.PI * prog(t, T.flash, T.flash + 0.35))
    if (fl > 0) { x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -60, 0, 0, -60, 320); g.addColorStop(0, `rgba(255,255,255,${0.9 * fl})`); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(0, -60, 320, 0, Math.PI * 2); x.fill() }
    x.restore()
    drawBurst(x, B_FLICK, 880, 1400, t, T.flick, PINK, 0.6)
  }

  // ── features
  const featK = (t, i) => { const s = F[i]; return t < s ? 0 : outScale(t, s + FEAT_OUT - 0.05, 0.35) }
  const B_F = [0, 1, 2, 3].map(i => B(10 + i, 12, 150))
  // 01 · the mystery card + CHART / FACE stickers
  function feat1(t) {
    const s = F[0]; if (t < s || t > s + 5) return
    const k = featK(t, 0); if (k <= 0) return
    const d = prog(t, s + 0.3, s + 0.85), e = easeOutBack(d, 1.6)
    const cy = lerp(-500, 1000, e) + 8 * Math.sin((t - s) * 2.2), rot = lerp(-18, -3, e) + 3 * Math.sin((t - s) * 1.7)
    x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
    card(x, imProfile, 540, cy, 450, rot, clamp(d * 4), LIB.color)
    x.restore()
    drawBurst(x, B_F[0], 540, 1000, t, s + 0.8, LIB.color, 0.7)
    sticker(x, 270, 800, 'FACE: LAST', PINK, t, s + 1.15, -9, k)
    sticker(x, 815, 1110, 'CARD: FIRST', GOLD, t, s + 1.55, 7, k)
  }
  // 02 · tonight's deck: card backs deal into a fan
  const FAN = [-2, -1, 0, 1, 2].map(j => ({ j, x: 540 + j * 150, y: 1060 + Math.abs(j) * 34 + j * j * 6, rot: j * 11 }))
  function feat2(t) {
    const s = F[1]; if (t < s || t > s + 5) return
    const k = featK(t, 1); if (k <= 0) return
    const order = [0, 4, 1, 3, 2]
    order.forEach((fi, n) => {
      const c = FAN[fi], t0 = s + 0.3 + n * 0.16, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5)
      const cx = lerp(1250, c.x, e), cy = lerp(-300, c.y, e) - (c.j === 0 ? 30 * ease.outCubic(prog(t, s + 1.4, s + 1.8)) : 0)
      const rot = lerp(70, c.rot, e) + 1.5 * Math.sin((t - s) * 2 + c.j)
      x.save(); x.translate(540, 1060); x.scale(k, k); x.translate(-540, -1060)
      card(x, imBack, cx, cy, 300, rot, clamp(p * 4), c.j === 0 ? GOLD : '#9a7be0')
      x.restore()
    })
    drawBurst(x, B_F[1], 540, 1000, t, s + 1.4, GOLD, 0.7)
  }
  // 03 · talk cards: a "hey" bubble deflates, a talk card flips in
  const B_HEY = B(20, 8, 90)
  function feat3(t) {
    const s = F[2]; if (t < s || t > s + 5) return
    const k = featK(t, 2); if (k <= 0) return
    // the "hey" bubble
    const hp = pop01(t, s + 0.3, 0.36), df = ease.inOutCubic(prog(t, s + 0.95, s + 1.45))
    if (hp > 0 && df < 1) {
      x.save(); x.translate(540, 940 + 120 * df); x.rotate((-6 + 22 * df) * D2R); x.scale(hp * (1 - 0.65 * df), hp * (1 - 0.85 * df)); x.globalAlpha = clamp(hp * 2) * (1 - df)
      x.fillStyle = 'rgba(40,30,80,0.9)'; x.beginPath(); x.roundRect(-190, -95, 380, 190, 70); x.moveTo(-110, 90); x.lineTo(-150, 150); x.lineTo(-50, 92); x.fill()
      glowStroke(x, BONE, 7, 14); x.beginPath(); x.roundRect(-190, -95, 380, 190, 70); x.stroke()
      x.shadowBlur = 0; x.fillStyle = BONE; x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hey', 0, 0)
      x.restore()
    }
    drawBurst(x, B_HEY, 540, 1000, t, s + 1.3, BONE, 0.5)
    // the talk card flips in (scaleX from 0)
    const cp = prog(t, s + 1.2, s + 1.65)
    if (cp > 0) {
      const sx = easeOutBack(cp, 2.2), cy = 1040 + 8 * Math.sin((t - s) * 2.1)
      x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
      card(x, imTalk, 540, cy, 400, 4 + 2 * Math.sin((t - s) * 1.6), clamp(cp * 4), GOLD, Math.max(0.02, sx))
      x.restore()
      drawBurst(x, B_F[2], 540, 1040, t, s + 1.55, GOLD, 0.7)
    }
  }
  // 04 · the reading: two wheels, Push / Pull / Align lines between them, chips pop
  const DOTS_A = [{ lon: 51, col: GOLD }, { lon: 255, col: SILVER }, { lon: 192, col: LIB.color }]
  const DOTS_B = [{ lon: 195, col: GOLD }, { lon: 75, col: SILVER }, { lon: 315, col: '#38c4ec' }]
  const LINES = [
    { name: 'PULL', col: READING.pull, a: 1, b: 1, t: 1.0 },
    { name: 'PUSH', col: READING.push, a: 0, b: 2, t: 1.25 },
    { name: 'ALIGN', col: READING.align, a: 2, b: 0, t: 1.5 },
  ]
  function feat4(t) {
    const s = F[3]; if (t < s || t > s + 5) return
    const k = featK(t, 3); if (k <= 0) return
    const slide = ease.inOutCubic(prog(t, s + 0.55, s + 0.95))
    const ka = pop01(t, s + 0.3, 0.42) * k, kb = pop01(t, s + 0.42, 0.42) * k
    const ax = lerp(250, 300, slide), bx = lerp(830, 780, slide), cy = 960
    miniWheel(x, ax, cy, 195, ka, (t - s) * 0.12, DOTS_A, t)
    miniWheel(x, bx, cy, 195, kb, -(t - s) * 0.12, DOTS_B, t)
    // names under each wheel
    x.save(); x.textAlign = 'center'; x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
    x.globalAlpha = clamp(ka * 2); x.fillText('YOU', ax, cy - 230); x.globalAlpha = clamp(kb * 2); x.fillText('THEM', bx, cy - 230); x.restore()
    LINES.forEach((L, i) => {
      const p = ease.inOutCubic(prog(t, s + L.t, s + L.t + 0.4)) * clamp(k)
      if (p <= 0) return
      const a = DOTS_A[L.a].p, b = DOTS_B[L.b].p
      if (!a || !b) return
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + (i - 1) * 90
      x.save(); glowStroke(x, L.col, 7, 22); x.globalAlpha = clamp(k * 2)
      x.beginPath()
      const N = 24
      for (let j = 0; j <= N * p; j++) { const u = j / N, qx = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mx + u * u * b.x, qy = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * my + u * u * b.y; j ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
      x.stroke(); x.restore()
    })
    // chips
    LINES.forEach((L, i) => {
      const ck = pop01(t, s + L.t + 0.2, 0.36) * k
      if (ck <= 0) return
      const cx = 540 + (i - 1) * 290, yy = 1290
      x.save(); x.translate(cx, yy); x.scale(ck, ck); x.globalAlpha = clamp(ck * 2)
      x.fillStyle = rgba(L.col, 0.22); x.beginPath(); x.roundRect(-125, -42, 250, 84, 42); x.fill()
      glowStroke(x, L.col, 5, 18); x.stroke(); x.shadowBlur = 0
      x.fillStyle = L.col; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.name, 0, 3)
      x.restore()
      drawBurst(x, B(30 + i, 8, 90), cx, yy, t, s + L.t + 0.2, L.col, 0.55)
    })
  }

  // ── finale: the star bursts on "Look up."
  const POPS = (() => { const r = rng(808); return Array.from({ length: 9 }, (_, i) => ({ x: 120 + r() * 840, y: 470 + r() * 900, t: T.lookUp + 0.05 + i * 0.11, c: [GOLD, PINK, BLUE, BONE][i % 4], b: makeBurst(900 + i, 8, 70) })) })()
  function drawFinale(t) {
    if (t < T.lookUp || t > CLEAR) return
    const out = outK(t, [T.cityOut2[0], T.cityOut2[0] + 0.5])
    for (const p of POPS) {
      if (t < p.t) continue
      const k = pop01(t, p.t, 0.4) * out
      x.save(); x.globalAlpha = clamp(k) * (0.75 + 0.25 * Math.sin(t * 5 + p.x)); x.imageSmoothingEnabled = false
      drawPixelStar(x, Math.round(p.x), Math.round(p.y + 6 * Math.sin(t * 2 + p.y)), Math.round(28 * k), 0, p.c); x.restore()
      drawBurst(x, p.b, p.x, p.y, t, p.t, p.c, 0.6)
    }
  }

  return {
    start: 0, end: END, root,
    update(t) {
      const hz = hazeK(t)
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      const cam = t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, { ...cam, stars: lerp(1, 0.06, hz), dim: lerp(SKY_H.dim, 0.3, hz) })
      if (t < CLEAR) {
        drawHaze(x, t, hz)
        drawSadStar(t)
        drawChart(t)
        // the city + the person (act 1–2, then again in the finale)
        const dy = cityDy(t)
        const ledge = t < T.fin - 1 ? dy - 380 * ease.inOutCubic(prog(t, 6.6, 8.0)) : dy
        drawCity(x, t, { dy, ledge, haze: hz })
        const pk = t < T.fin - 1 ? pop01(t, T.person, 0.45) : pop01(t, T.finRise[0] + 0.35, 0.45)
        const point = ease.outCubic(prog(t, T.lookUp - 0.1, T.lookUp + 0.3))
        const bounce = 1 + 0.06 * Math.sin(Math.PI * prog(t, T.lookUp - 0.1, T.lookUp + 0.3))
        person(x, 170, GROUND + ledge, 2.5 * pk * bounce, clamp(pk * 2), { look: 1, point: t < T.fin - 1 ? 0.75 * ease.outCubic(prog(t, T.star + 0.4, T.star + 0.8)) : lerp(0.75, 1, point), t })
        drawPhone(t)
        feat1(t); feat2(t); feat3(t); feat4(t)
        drawFinale(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.35)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const F = T.feat
export const CUES = [
  // hook
  ...wordPops(T.h0, 7, 0.06, 0),
  ['pluck', T.h0Last, 1174.66, 0.05, 0.6, 0], ['pop', T.h0Last, 1318.51, 0.05, 0],
  ['pop', T.person, 587.33, 0.05, -0.4],
  ['tick', T.star, 0.03], ['tick', T.star + 0.45, 0.02], ['tick', T.star + 1.3, 0.025],
  ...wordPops(T.s0, 6, 0.06, 2, 0.022),
  // turn
  ...wordPops(T.h1, 3, 0.07, 1),
  ['pluck', T.h1Last, 880, 0.055, 0.8, 0], ['pop', T.h1Last, 1174.66, 0.06, 0.2], ['glitter', T.swell, T.swell + 0.8],
  ['riser', T.haze[0], T.bloom, 0.04], ['whoosh', T.fly[0], 0.5, 0.035],
  ['boom', T.bloom, 0.1], ['bell', T.bloom + 0.02, 587.33, 0.035, 2.0, 0], ['glitter', T.bloom, T.bloom + 1.2],
  ...T.planets.map((tp, i) => ['pop', +tp.toFixed(3), [740, 880, 1108.73][i], 0.06, [-0.3, 0.1, 0.35][i]]),
  ...T.planets.map((tp, i) => ['pluck', +(tp + 0.02).toFixed(3), [587.33, 739.99, 880][i], 0.04, 0.5, 0]),
  ['glitter', T.tri, T.tri + 0.6],
  ...wordPops(T.h2, 6, 0.07, 0),
  ['pluck', T.h2Last, 1318.51, 0.05, 0.6, 0],
  ['pop', T.phone, 987.77, 0.05, 0.4], ['tick', T.flash, 0.05], ['glitter', T.flash, T.flash + 0.3],
  ['whoosh', T.flick, 0.45, 0.045], ['pop', T.flick + 0.02, 1318.51, 0.06, 0.5],
  ...wordPops(T.s2, 3, 0.06, 3, 0.022),
  ['whoosh', T.chartOut, 0.6, 0.04],
  // 01 mystery card
  ...wordPops(F[0] + 0.05, 4, 0.07, 0), ['whoosh', F[0] + 0.3, 0.5, 0.035], ['pop', F[0] + 0.8, 740, 0.06, 0], ['glitter', F[0] + 0.8, F[0] + 1.4],
  ['pop', F[0] + 1.15, 880, 0.06, -0.4], ['tick', F[0] + 1.16, 0.04], ['pop', F[0] + 1.55, 1174.66, 0.06, 0.4], ['tick', F[0] + 1.56, 0.04],
  ...wordPops(F[0] + FEAT_SUB, 6, 0.06, 2, 0.022), ['whoosh', F[0] + FEAT_OUT, 0.5, 0.03],
  // 02 deck
  ...wordPops(F[1] + 0.05, 5, 0.07, 1),
  ...[0, 1, 2, 3, 4].map(n => ['tick', +(F[1] + 0.3 + n * 0.16 + 0.3).toFixed(3), 0.04]),
  ...[0, 1, 2, 3, 4].map(n => ['whoosh', +(F[1] + 0.3 + n * 0.16).toFixed(3), 0.25, 0.02]),
  ['pluck', F[1] + 1.4, 880, 0.05, 0.6, 0], ['glitter', F[1] + 1.4, F[1] + 2.0],
  ...wordPops(F[1] + FEAT_SUB, 4, 0.06, 3, 0.022), ['whoosh', F[1] + FEAT_OUT, 0.5, 0.03],
  // 03 talk cards
  ...wordPops(F[2] + 0.05, 4, 0.07, 2),
  ['pop', F[2] + 0.3, 659.25, 0.05, -0.2], ['whoosh', F[2] + 0.95, 0.5, 0.03], ['pop', F[2] + 1.35, 440, 0.04, 0],
  ['whoosh', F[2] + 1.2, 0.35, 0.03], ['pop', F[2] + 1.55, 1174.66, 0.06, 0.2], ['glitter', F[2] + 1.55, F[2] + 2.1],
  ...wordPops(F[2] + FEAT_SUB, 3, 0.06, 0, 0.022), ['whoosh', F[2] + FEAT_OUT, 0.5, 0.03],
  // 04 reading
  ...wordPops(F[3] + 0.05, 4, 0.07, 3),
  ['pop', F[3] + 0.3, 740, 0.05, -0.4], ['pop', F[3] + 0.42, 880, 0.05, 0.4],
  ...LINES_T().map((lt, i) => ['pluck', +(F[3] + lt + 0.2).toFixed(3), [880, 987.77, 1174.66][i], 0.045, 0.5, 0]),
  ...LINES_T().map((lt, i) => ['pop', +(F[3] + lt + 0.2).toFixed(3), [1174.66, 1318.51, 1479.98][i], 0.05, (i - 1) * 0.4]),
  ...wordPops(F[3] + FEAT_SUB, 6, 0.06, 1, 0.022), ['whoosh', F[3] + FEAT_OUT, 0.5, 0.03],
  // finale
  ['whoosh', T.finRise[0], 0.7, 0.035],
  ...wordPops(T.fin, 6, 0.07, 0),
  ['riser', T.lookUp - 1.0, T.lookUp, 0.035],
  ['pluck', T.lookUp, 587.33, 0.06, 1.2, 0], ['pop', T.lookUp, 1174.66, 0.06, 0], ['pop', T.lookUp + 0.12, 1318.51, 0.06, 0.2],
  ['bell', T.lookUp + 0.02, 880, 0.035, 2.2, 0], ['glitter', T.lookUp, T.lookUp + 1.2],
  ['whoosh', T.cityOut2[0], 0.7, 0.035],
]
function LINES_T() { return [1.0, 1.25, 1.5] }
