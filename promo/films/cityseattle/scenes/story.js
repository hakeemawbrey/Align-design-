// cityseattle (30 s vertical) · "Seattle: cloudy, rainy… You can never see the stars." → a star peeks, a cloud covers it
// ("Sky status: nope.") → "We'll show you yours." (the clouds part, the umbrella folds, a chart blooms: Sun Pisces, Moon
// Cancer, Rising Scorpio — "All water signs. Very Seattle.") → "Then we find who lines up." (two charts, Push/Pull/Align)
// → "Chart first. Face last." (mystery card) → "The stars are still up there." → plain sky H from 25.45; the shared
// end card (cta 'VOTE FOR YOUR CITY') takes over at 25.6. One canvas, DOM type above it, grain on top. Pure f(t).
//
// Beat map (108 bpm, B(n) = 0.6 + n·0.5556):
//   0.2 "Seattle:" · B1 1.16 "cloudy," + the cloud bank slams in · B2 1.71 "rainy…" + rain · B3 2.27 umbrella fwump
//   3.4 "You can never | see the stars." (stars on B6) · 4.3 a star peeks · B8 5.04 a cloud slides over it, "nope."
//   6.6 "We'll show you | yours." (B12) · 6.9–8.2 the clouds part, the rain stops, the umbrella folds
//   B13 7.82 the chart blooms · B15/B16/B17 Sun ♓ / Moon ♋ / Rising ♏ · 10.45 "All water signs. Very Seattle."
//   12.3 the chart slides left · 12.6 "Then we find | who lines up." · B24 their chart · B25 Push/Pull/Align
//   B27 15.6 "Align matches you by the stars you were born under."                       (out 18.9)
//   B34 19.49 "Chart first. Face last." mystery card drops, FACE: LAST / CHART: FIRST stickers   (out 22.35)
//   22.7 the city rises, the clouds drift back · "The stars are still | up there." (B41) stars pop through
//   24.7–25.4 everything sinks out → plain H from 25.45
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../src/lib.js'
import { W, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, READING, easeOutBack, drawWheelH } from '../../wheel.js'

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SILVER = '#e3ecff', INK = '#120a2a', RAIN = '#9fc2ff', BLUE = '#8fd8f6', SLATE = '#9aa6cf'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const VS = '︎'
export const BEAT = n => 0.6 + n * 0.5556
const D2R = Math.PI / 180
const sign = id => SIGNS.find(s => s.id === id)
const PIS = sign('pisces'), CAN = sign('cancer'), SCO = sign('scorpio'), TAU = sign('taurus'), VIR = sign('virgo'), CAP = sign('capricorn')
const angOf = lon => Math.PI - lon * D2R
const at = (cx, cy, lon, r) => ({ x: cx + Math.cos(angOf(lon)) * r, y: cy + Math.sin(angOf(lon)) * r })

export const END = 25.61, CLEAR = 25.45
// ── beats
export const T = {
  h0: 0.2, h0Words: [0.2, BEAT(1), BEAT(2)], h0Out: [3.1, 3.3],
  clouds: BEAT(1), rain: BEAT(2), person: 1.45, umbrella: BEAT(3),
  h0b: 3.4, h0bLast: BEAT(6), h0bOut: [6.3, 6.5],
  peek: 4.3, cover: [4.8, BEAT(8)], s0: 4.75, s0Last: BEAT(8), s0Out: [6.3, 6.5],
  h1: 6.6, h1Last: BEAT(12), h1Out: [12.2, 12.4],
  part: [6.9, 8.2], rainOff: [6.7, 7.4], fold: [7.0, 7.5], dip: [7.2, 8.6],
  bloom: BEAT(13), planets: [BEAT(15), BEAT(16), BEAT(17)], tri: 10.3,
  s1: 10.45, s1Last: BEAT(19), s1Out: [12.2, 12.4],
  labelsOut: [12.05, 12.3], slide: [12.3, 12.9], cityOut: [12.1, 12.8],
  h2: 12.6, h2Last: BEAT(23), them: BEAT(24), lines: [BEAT(25), BEAT(25) + 0.25, BEAT(25) + 0.5],
  s2: BEAT(27), out2: [18.9, 19.1], chartsOut: 18.85,
  m0: BEAT(34), s3: 20.6, out3: [22.35, 22.55],
  fin: 22.7, finRise: [22.55, 23.3], cloudsBack: [22.6, 23.6], finLast: BEAT(41), finOut: [24.95, 25.15], cityOut2: [24.7, 25.4],
}

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

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

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `~word~` = tint, `|` = line break.
 *  times: explicit pop time per word (else t0 + n·gap); the last word may pop late (lastAt) with a wobble */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, tintColor = null, accentSize, gap = 0.07, at: t0, times = null, lastAt = null, wobble = false, color = BONE }) {
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
    const tw = times ? times[n] : isLast && lastAt != null ? lastAt : t0 + n * gap
    const big = (times && acc) || (isLast && lastAt != null)
    ws.push({ t: tw, big, e: el('span', style, box, w.replace(/[*~]/g, '')) })
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
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}
const head = (root, text, t0, opts = {}) => popText(root, text, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...opts })
const sub = (root, text, t0, opts = {}) => popText(root, text, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 68, ...opts })

function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}

// ── the city: a generic skyline (towers + a slender saucer-topped observation tower), a snow-capped mountain behind
const TOWERS = (() => {
  const r = rng(91), out = []
  const spec = [[-20, 140, 330], [105, 115, 470, 'step'], [205, 100, 360], [290, 140, 620, 'peak'], [420, 115, 500], [520, 130, 700, 'slant'],
    [640, 105, 420], [930, 150, 520, 'step']]
  for (const [x0, w, h, kind] of spec) {
    const wins = []
    for (let yy = 40; yy < h - 30; yy += 46) for (let xx = 22; xx < w - 22; xx += 34) if (r() < 0.42) wins.push({ x: xx, y: yy, s: r() * 10, on: r() })
    out.push({ x0, w, h, kind, wins })
  }
  return out
})()
const GROUND = 1800
const NEEDLE = { x: 830, h: 860 }
function drawMountain(x, t, a) {
  x.save(); x.globalAlpha = a * 0.9
  const base = GROUND, px = 610, py = GROUND - 1010
  x.beginPath(); x.moveTo(-60, base); x.lineTo(250, base - 520); x.lineTo(px - 70, py + 90); x.lineTo(px, py); x.lineTo(px + 90, py + 110); x.lineTo(860, base - 560); x.lineTo(1140, base); x.closePath()
  x.fillStyle = '#16112e'; x.fill()
  glowStroke(x, SLATE, 5, 12); x.globalAlpha = a * 0.55; x.stroke()
  // snowcap
  x.globalAlpha = a * 0.85; x.shadowBlur = 0
  x.beginPath(); x.moveTo(px - 150, py + 190); x.lineTo(px - 70, py + 90); x.lineTo(px, py); x.lineTo(px + 90, py + 110); x.lineTo(px + 175, py + 205)
  x.lineTo(px + 110, py + 175); x.lineTo(px + 60, py + 225); x.lineTo(px + 10, py + 170); x.lineTo(px - 45, py + 230); x.lineTo(px - 95, py + 175); x.closePath()
  x.fillStyle = rgba('#dfe6ff', 0.32); x.fill()
  glowStroke(x, BONE, 4, 10); x.globalAlpha = a * 0.6; x.stroke()
  x.restore()
}
function drawNeedle(x, t, edge) {
  const cx = NEEDLE.x, top = GROUND - NEEDLE.h, sy = top + 90
  x.fillStyle = '#100a22'
  // legs: two tapering lines that pinch at the waist then flare to the saucer
  x.beginPath(); x.moveTo(cx - 58, GROUND); x.quadraticCurveTo(cx - 6, GROUND - 420, cx - 26, sy + 40); x.lineTo(cx + 26, sy + 40); x.quadraticCurveTo(cx + 6, GROUND - 420, cx + 58, GROUND); x.closePath(); x.fill()
  glowStroke(x, edge, 5, 14); x.stroke()
  // the saucer
  x.beginPath(); x.ellipse(cx, sy, 112, 26, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  x.beginPath(); x.moveTo(cx - 70, sy - 14); x.lineTo(cx - 52, sy - 44); x.lineTo(cx + 52, sy - 44); x.lineTo(cx + 70, sy - 14); x.fill(); x.stroke()
  // spire + blinker
  x.beginPath(); x.moveTo(cx, sy - 44); x.lineTo(cx, top - 40); x.stroke()
  const blink = Math.sin(t * 4) > 0.3 ? 1 : 0.25
  x.shadowBlur = 0; x.fillStyle = rgba('#ff5a5a', blink); x.beginPath(); x.arc(cx, top - 44, 8, 0, Math.PI * 2); x.fill()
  // saucer windows
  for (let i = -3; i <= 3; i++) { x.fillStyle = rgba('#ffcf7a', 0.5 + 0.3 * Math.sin(t * 0.8 + i)); x.fillRect(cx + i * 26 - 6, sy - 6, 12, 10) }
}
function drawCity(x, t, { dy = 0, ledge = dy, a = 1 }) {
  if (a <= 0 || ledge > 900) return
  x.save(); x.globalAlpha = a; x.translate(0, dy * 1.6)
  drawMountain(x, t, a)
  x.restore()
  x.save(); x.globalAlpha = a; x.translate(0, dy)
  const edge = BONE
  drawNeedle(x, t, edge)
  for (const b of TOWERS) {
    const top = GROUND - b.h
    x.beginPath()
    if (b.kind === 'step') { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top + 60); x.lineTo(b.x0 + b.w * 0.2, top + 60); x.lineTo(b.x0 + b.w * 0.2, top); x.lineTo(b.x0 + b.w * 0.8, top); x.lineTo(b.x0 + b.w * 0.8, top + 60); x.lineTo(b.x0 + b.w, top + 60); x.lineTo(b.x0 + b.w, GROUND) }
    else if (b.kind === 'peak') { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top + 70); x.lineTo(b.x0 + b.w / 2, top - 20); x.lineTo(b.x0 + b.w, top + 70); x.lineTo(b.x0 + b.w, GROUND) }
    else if (b.kind === 'slant') { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top + 80); x.lineTo(b.x0 + b.w, top); x.lineTo(b.x0 + b.w, GROUND) }
    else { x.moveTo(b.x0, GROUND); x.lineTo(b.x0, top); x.lineTo(b.x0 + b.w, top); x.lineTo(b.x0 + b.w, GROUND) }
    x.fillStyle = '#100a22'; x.fill()
    glowStroke(x, edge, 5, 14); x.globalAlpha = a * 0.75; x.stroke(); x.globalAlpha = a
    x.shadowBlur = 0
    for (const w of b.wins) {
      const fl = 0.55 + 0.45 * Math.sin(t * 0.7 + w.s)
      x.fillStyle = rgba('#ffcf7a', (w.on > 0.3 ? 0.55 : 0.18) * fl)
      x.fillRect(b.x0 + w.x, top + w.y, 14, 20)
    }
  }
  x.restore()
  x.save(); x.globalAlpha = a; x.translate(0, ledge)
  x.fillStyle = '#0b0718'; x.fillRect(0, GROUND, W, 400)
  glowStroke(x, edge, 6, 16); x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); x.stroke()
  x.restore()
}

// ── the grey: a slate wash over the sky, and a bank of flat-fill line-art clouds that slams in and later parts
function drawGrey(x, k) {
  if (k <= 0.002) return
  x.save()
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, rgba('#2a2f48', 0.78 * k)); g.addColorStop(0.5, rgba('#3a405e', 0.7 * k)); g.addColorStop(1, rgba('#4a5072', 0.6 * k))
  x.fillStyle = g; x.fillRect(0, 0, W, 1920)
  x.restore()
}
const CLOUDS = (() => {
  const r = rng(404), out = []
  const rows = [[340, 6, 1.05], [560, 5, 1.2], [780, 6, 1.0], [960, 4, 0.85]]
  rows.forEach(([y, n, s], ri) => {
    for (let i = 0; i < n; i++) {
      const cx = -80 + (i + 0.5) * (1240 / n) + (r() - 0.5) * 60
      out.push({ x: cx, y: y + (r() - 0.5) * 50, s: s * (0.85 + r() * 0.35), side: cx < 540 ? -1 : 1, delay: r() * 0.3, drift: 10 + r() * 16, ph: r() * 6, row: ri,
        tone: ['#3b4060', '#454b6e', '#353a58'][Math.floor(r() * 3)] })
    }
  })
  return out
})()
/** one cloud: overlapping puffs on a flat base, flat fill + glowing slate edge, a pale top highlight */
function cloud(x, cx, cy, s, a, tone) {
  if (a <= 0) return
  x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha = a
  const P = [[-120, 10, 62], [-60, -30, 82], [20, -48, 96], [100, -14, 74], [150, 16, 54]]
  x.beginPath()
  for (const [px, py, pr] of P) { x.moveTo(px + pr, py); x.arc(px, py, pr, 0, Math.PI * 2) }
  x.rect(-170, 10, 340, 60)
  x.fillStyle = tone; x.shadowColor = 'rgba(6,4,18,0.5)'; x.shadowBlur = 30; x.fill()
  // outline: the outer silhouette, drawn as arcs + base line
  x.shadowBlur = 0
  glowStroke(x, SLATE, 5, 12); x.globalAlpha = a * 0.8
  x.beginPath(); x.moveTo(-172, 70); x.lineTo(172, 70); x.stroke()
  x.beginPath(); x.arc(-120, 10, 62, Math.PI * 0.62, Math.PI * 1.42); x.stroke()
  x.beginPath(); x.arc(-60, -30, 82, Math.PI * 1.08, Math.PI * 1.62); x.stroke()
  x.beginPath(); x.arc(20, -48, 96, Math.PI * 1.22, Math.PI * 1.86); x.stroke()
  x.beginPath(); x.arc(100, -14, 74, Math.PI * 1.55, Math.PI * 2.05); x.stroke()
  x.beginPath(); x.arc(150, 16, 54, Math.PI * 1.75, Math.PI * 2.32); x.stroke()
  x.shadowBlur = 0; x.globalAlpha = a * 0.22; x.fillStyle = '#c9d2f2'
  x.beginPath(); x.ellipse(10, -92, 52, 14, -0.1, 0, Math.PI * 2); x.fill()
  x.restore()
}

// ── rain: deterministic streaks; drops under the umbrella canopy are skipped
const DROPS = (() => { const r = rng(55); return Array.from({ length: 150 }, () => ({ x: r() * 1300 - 110, y: r() * 2100, v: 1700 + r() * 600, l: 34 + r() * 30, a: 0.35 + r() * 0.45 })) })()
function drawRain(x, t, k, shelter) {
  if (k <= 0.002) return
  x.save(); x.lineCap = 'round'
  for (const d of DROPS) {
    const yy = ((d.y + t * d.v) % 2100) - 90, xx = d.x - (yy * 0.16)
    if (shelter && Math.abs(xx - shelter.x) < shelter.w && yy > shelter.y && yy < GROUND + 40) continue
    x.strokeStyle = rgba(RAIN, d.a * k); x.lineWidth = 4
    x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx - d.l * 0.16, yy + d.l); x.stroke()
  }
  // splash rings on the ground
  for (let i = 0; i < 9; i++) {
    const per = 0.55, ph = (t + i * 0.137) % per / per, n = Math.floor((t + i * 0.137) / per)
    const sx = (((i * 97 + n * 211) % 1000) + 40)
    if (shelter && Math.abs(sx - shelter.x) < shelter.w) continue
    x.strokeStyle = rgba(RAIN, (1 - ph) * 0.6 * k); x.lineWidth = 3
    x.beginPath(); x.ellipse(sx, GROUND + 26, 8 + 30 * ph, 3 + 7 * ph, 0, 0, Math.PI * 2); x.stroke()
  }
  x.restore()
}

/** pictogram person (no face) with an umbrella. feet at (px, py).
 *  open 0..1 (canopy), up 1 = umbrella held overhead / 0 = closed umbrella hanging from the back hand; point raises the free arm */
function person(x, px, py, s, a, { look = 0.6, point = 0, open = 1, up = 1, t = 0, splashT = null } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(px, py); x.scale(s, s)
  // body leans back a touch to look up
  x.rotate(-0.08 * look)
  glowStroke(x, BONE, 8, 16)
  x.beginPath(); x.moveTo(-18, 0); x.lineTo(0, -40); x.lineTo(18, 0)
  x.moveTo(0, -40); x.lineTo(-2, -84); x.stroke()
  // umbrella arm (front, right side) — overhead: hand at (34,-92); hanging: the back hand at (-26,-46)
  if (up > 0.5) {
    x.beginPath(); x.moveTo(-1, -72); x.lineTo(34, -92); x.stroke()
    // free arm hangs or points
    const ang = lerp(2.3, -2.2, point)
    x.beginPath(); x.moveTo(-1, -72); x.lineTo(-1 + Math.cos(ang) * 50, -72 + Math.sin(ang) * 50); x.stroke()
    umbrella(x, 34, -92, 0.28, open, t, splashT)
  } else {
    x.beginPath(); x.moveTo(-1, -72); x.lineTo(-26, -46); x.stroke()
    const ang = lerp(0.9, -0.75, point) + 0.05 * Math.sin(t * 5) * point
    x.beginPath(); x.moveTo(-1, -72); x.lineTo(-1 + Math.cos(ang) * 52, -72 + Math.sin(ang) * 52); x.stroke()
    x.save(); x.translate(-26, -46); x.scale(0.62, 0.62); umbrella(x, 0, 0, Math.PI + 0.12, 0, t, null, true); x.restore()
  }
  x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16; x.fillStyle = BONE
  x.beginPath(); x.ellipse(-9 * look, -104, 16, 18, -0.5 * look, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** umbrella: hand at (hx, hy), shaft along angle tilt (0 = straight up). open 0..1. hanging=true flips it (tip down) */
function umbrella(x, hx, hy, tilt, open, t, splashT, hanging = false) {
  x.save(); x.translate(hx, hy); x.rotate(tilt)
  // shaft (local up = -y): handle hook at the hand, canopy top at -150
  glowStroke(x, BONE, 6, 12)
  x.beginPath(); x.moveTo(0, -112); x.lineTo(0, 6); x.arc(-10, 6, 10, 0, Math.PI * 0.9); x.stroke()
  // canopy
  const o = ease.inOutCubic(clamp(open))
  const tipY = lerp(-128, -136, o), rimY = lerp(-56, -86, o), hw = lerp(10, 76, o)
  const ribs = 4
  x.beginPath(); x.moveTo(-hw, rimY)
  x.quadraticCurveTo(-hw * 0.9, tipY + 10 * o, 0, tipY)
  x.quadraticCurveTo(hw * 0.9, tipY + 10 * o, hw, rimY)
  for (let i = ribs; i > 0; i--) { const xa = hw - (2 * hw / ribs) * (ribs - i), xb = hw - (2 * hw / ribs) * (ribs - i + 1); x.quadraticCurveTo((xa + xb) / 2, rimY - 16 * o, xb, rimY) }
  x.closePath()
  x.shadowBlur = 0; x.fillStyle = PINK; x.globalAlpha *= 1; x.fill()
  glowStroke(x, BONE, 6, 14); x.stroke()
  // rib lines
  if (o > 0.2) {
    x.lineWidth = 3; x.globalAlpha *= 0.7
    for (let i = 1; i < ribs; i++) { const xr = -hw + (2 * hw / ribs) * i; x.beginPath(); x.moveTo(0, tipY); x.quadraticCurveTo(xr * 0.7, tipY + 10, xr, rimY - 18 * o); x.stroke() }
  }
  x.restore()
}

// ── chart geometry
const WC = { cx: 540, cy: 1000, rOut: 380, rIn: 300, rGlyph: 340, alpha: 0.92 }
const mkPlaces = (list, t0s) => list.map((p, i) => ({ ...p, t0: t0s[i], off: at(0, 0, p.lon, p.rad || 200), b: makeBurst(300 + i + (t0s[0] | 0), 10, 120) }))
const YOU = mkPlaces([
  { role: 'SUN', s: PIS, lon: 345, col: GOLD, r: 30 },
  { role: 'MOON', s: CAN, lon: 105, col: SILVER, r: 26 },
  { role: 'RISING', s: SCO, lon: 225, col: SCO.color, r: 24, rad: 190 },
], null || [BEAT(15), BEAT(16), BEAT(17)])
const THEM = mkPlaces([
  { role: 'SUN', s: VIR, lon: 165, col: GOLD, r: 30 },
  { role: 'MOON', s: TAU, lon: 45, col: SILVER, r: 26 },
  { role: 'RISING', s: CAP, lon: 285, col: CAP.color, r: 24, rad: 190 },
], [BEAT(24) + 0.15, BEAT(24) + 0.25, BEAT(24) + 0.35])
// placement screen point for a chart drawn at (cx, cy), scale s, rotation rot
const ppt = (p, cx, cy, s, rot) => { const c = Math.cos(rot), sn = Math.sin(rot); return { x: cx + (p.off.x * c - p.off.y * sn) * s, y: cy + (p.off.x * sn + p.off.y * c) * s } }

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

function card(x, im, cx, cy, w, rot, a, glowCol) {
  if (!im || a <= 0) return
  const h = w * im.height / im.width
  x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = clamp(a)
  x.shadowColor = rgba(glowCol, 0.75); x.shadowBlur = 50
  x.drawImage(im, -w / 2, -h / 2, w, h)
  x.shadowBlur = 0; x.drawImage(im, -w / 2, -h / 2, w, h)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [imProfile] = await Promise.all(['card-profile-5.png'].map(f => loadImage(A + f)))
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = (txt, col = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: col, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [
    [eyebrow('SEATTLE, WA · TONIGHT', BLUE), 0.1, T.h0Out],
    [eyebrow('FORECAST · 100% STARS', GOLD), T.bloom, T.s1Out],
  ]
  const H0 = head(root, 'Seattle: | cloudy, | *rainy…*', T.h0, { size: 132, accentSize: 170, accentColor: BLUE, times: T.h0Words, wobble: true })
  const H0b = head(root, 'You can never | see the *stars.*', T.h0b, { accentColor: GOLD, lastAt: T.h0bLast, wobble: true, accentSize: 132 })
  const H1 = head(root, "We'll show you | *yours.*", T.h1, { accentColor: GOLD, lastAt: T.h1Last, wobble: true, accentSize: 150 })
  const H2 = head(root, 'Then we find | who *lines up.*', T.h2, { accentColor: GOLD, times: [T.h2, T.h2 + 0.07, T.h2 + 0.14, T.h2 + 0.21, T.h2Last, T.h2Last + 0.12], wobble: true, accentSize: 128 })
  const H3 = head(root, 'Card *first.* | Face last.', T.m0 + 0.05, { accentColor: PINK })
  const H4 = head(root, 'The stars are | still *up there.*', T.fin, { times: [T.fin, T.fin + 0.07, T.fin + 0.14, T.fin + 0.21, T.finLast, T.finLast + 0.14], accentColor: GOLD, accentSize: 140, wobble: true })
  const HEADS = [[H0, T.h0Out], [H0b, T.h0bOut], [H1, T.h1Out], [H2, T.out2], [H3, T.out3], [H4, T.finOut]]
  const S0 = sub(root, 'Sky status: *nope.*', T.s0, { accentColor: PINK, lastAt: T.s0Last, wobble: true, top: 880, size: 72, accentSize: 92 })
  const S1 = sub(root, 'All water signs. | Very *Seattle.*', T.s1, { accentColor: BLUE, lastAt: T.s1Last, wobble: true, top: 1450, accentSize: 76 })
  const S2 = sub(root, 'Align matches you | by the stars you were | *born under.*', T.s2, { accentColor: GOLD, top: 1440 })
  const S3 = sub(root, 'Let your *stars* | do the talking.', T.s3, { accentColor: GOLD, top: 1520 })
  const SUBS = [[S0, T.s0Out], [S1, T.s1Out], [S2, T.out2], [S3, T.out3]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(500 + k, n, d)

  // ── levels
  const cloudIn = t => (t < T.fin - 1 ? ease.outCubic(prog(t, T.clouds - 0.1, T.clouds + 0.35)) : 0)
  const partK = t => ease.inOutCubic(prog(t, ...T.part))
  const greyK = t => t < T.fin - 1 ? clamp(prog(t, T.clouds - 0.1, T.clouds + 0.4)) * (1 - partK(t)) : 0.55 * ease.inOutCubic(prog(t, ...T.cloudsBack)) * outK(t, T.cityOut2)
  const rainK = t => t < T.fin - 1 ? clamp(prog(t, T.rain, T.rain + 0.25)) * outK(t, T.rainOff) : 0
  const cityDy = t => {
    if (t < T.fin - 1) return 640 * ease.inOutCubic(prog(t, ...T.dip)) + 900 * ease.inCubic(prog(t, ...T.cityOut))
    return 900 * (1 - ease.outCubic(prog(t, ...T.finRise))) + 900 * ease.inCubic(prog(t, ...T.cityOut2))
  }
  const PX = 210

  // ── the cloud bank (hook) and the drift-back clouds (finale)
  const B_CLOUD = B(1, 12, 160)
  function drawClouds(t) {
    if (t < T.fin - 1) {
      const kin = cloudIn(t), pk = partK(t)
      if (kin <= 0 || pk >= 1) return
      CLOUDS.forEach((c, i) => {
        const pp = ease.inCubic(clamp((pk - c.delay * 0.4) / 0.75))
        const drop = (1 - kin) * -420 * (1 + c.row * 0.3)
        const xx = c.x + c.drift * Math.sin(t * 0.5 + c.ph) + c.side * 900 * pp
        const yy = c.y + drop + 6 * Math.sin(t * 0.8 + c.ph) - 120 * pp
        const sq = 1 + 0.1 * Math.sin(Math.PI * prog(t, T.clouds + 0.2, T.clouds + 0.5)) // landing squash
        cloud(x, xx, yy, c.s * sq, clamp(kin * 1.5), c.tone)
      })
      return
    }
    // finale: a loose, lighter layer drifts back in from the sides (still cloudy — but now you know)
    const k = ease.outCubic(prog(t, ...T.cloudsBack)) * outK(t, T.cityOut2)
    if (k <= 0) return
    CLOUDS.filter(c => c.row === 1 || c.row === 2).forEach((c, i) => {
      if (i % 2) return
      const xx = c.x + c.side * 700 * (1 - k) + c.drift * Math.sin(t * 0.5 + c.ph), yy = c.y + 120
      cloud(x, xx, yy, c.s * 0.95, 0.85 * k, c.tone)
    })
  }

  // ── the star that peeks, then gets covered
  const PEEK = { x: 760, y: 700 }
  const B_PEEK = B(2, 8, 80)
  function drawPeek(t) {
    if (t < T.peek || t > T.cover[1] + 0.6) return
    const k = pop01(t, T.peek, 0.4)
    const cov = ease.inOutCubic(prog(t, ...T.cover))
    x.save(); x.globalAlpha = clamp(k) * (1 - prog(t, T.cover[1] - 0.05, T.cover[1] + 0.05))
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(PEEK.x, PEEK.y, 0, PEEK.x, PEEK.y, 150); g.addColorStop(0, rgba(GOLD, 0.5)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.beginPath(); x.arc(PEEK.x, PEEK.y, 150, 0, Math.PI * 2); x.fill()
    x.globalCompositeOperation = 'source-over'; x.imageSmoothingEnabled = false
    drawPixelStar(x, PEEK.x, PEEK.y, Math.round(50 * k * (0.9 + 0.1 * Math.sin(t * 9))), 0, GOLD)
    x.restore()
    drawBurst(x, B_PEEK, PEEK.x, PEEK.y, t, T.peek, GOLD, 0.6)
    // the cloud that shuffles over it
    const cx = lerp(1260, PEEK.x + 10, cov), sq = 1 + 0.12 * Math.sin(Math.PI * prog(t, T.cover[1] - 0.05, T.cover[1] + 0.3))
    cloud(x, cx, PEEK.y + 10, 0.95 * sq, clamp(prog(t, T.cover[0] - 0.05, T.cover[0] + 0.1)) * outK(t, [T.part[0] + 0.2, T.part[0] + 0.8]), '#4a5072')
    if (t > T.part[0]) return
  }
  function drawCoverCloudPart(t) { /* covered cloud exits with the bank (handled by outK above) */ }

  // ── act 2: the chart (drawn generically so it can slide into the two-chart match)
  const B_BLOOM = B(3, 16, 260)
  function drawChartAt(t, places, cx, cy, s, rot, a, labelK) {
    if (s <= 0.01 || a <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.translate(-WC.cx, -WC.cy); x.globalAlpha = a
    x.fillStyle = 'rgba(10,7,26,0.55)'; x.beginPath(); x.arc(WC.cx, WC.cy, WC.rIn, 0, Math.PI * 2); x.fill()
    places.forEach(p => {
      const L = ease.outCubic(prog(t, p.t0, p.t0 + 0.3)) * (0.75 + 0.25 * Math.sin((t - p.t0) * 5))
      if (L <= 0) return
      const i = SIGNS.indexOf(p.s), a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
      x.save(); x.globalAlpha = a * 0.55 * L; x.fillStyle = p.s.color
      x.beginPath(); x.arc(WC.cx, WC.cy, WC.rOut, a1, a0); x.arc(WC.cx, WC.cy, WC.rIn, a0, a1, true); x.closePath(); x.fill(); x.restore()
    })
    x.globalAlpha = 1
    drawWheelH(x, { k: a, W: WC })
    x.save(); x.globalAlpha = a
    places.forEach(p => {
      const k = ease.outCubic(prog(t, p.t0 - 0.1, p.t0 + 0.15))
      if (k <= 0) return
      glowStroke(x, p.s.color, 3, 10); x.globalAlpha = a * 0.5; x.setLineDash([8, 10])
      x.beginPath(); x.moveTo(WC.cx, WC.cy); x.lineTo(WC.cx + p.off.x * k, WC.cy + p.off.y * k); x.stroke(); x.setLineDash([])
    })
    const tk = ease.inOutCubic(prog(t, places[2].t0 + 0.25, places[2].t0 + 0.85))
    if (tk > 0) {
      glowStroke(x, GOLD, 4, 18); x.globalAlpha = a * 0.85
      x.beginPath()
      for (let i = 0; i < 3; i++) { const p0 = places[i].off, p1 = places[(i + 1) % 3].off, e = clamp(tk * 3 - i); if (e <= 0) break; x.moveTo(WC.cx + p0.x, WC.cy + p0.y); x.lineTo(WC.cx + lerp(p0.x, p1.x, e), WC.cy + lerp(p0.y, p1.y, e)) }
      x.stroke()
    }
    x.restore()
    x.save(); x.globalAlpha = a; x.imageSmoothingEnabled = false; drawPixelStar(x, WC.cx, WC.cy, 28, 0, GOLD); x.restore()
    x.restore()
    // planets (+ labels) drawn in screen space so they stay round and upright
    places.forEach((p, i) => {
      if (t < p.t0) return
      const k = pop01(t, p.t0, 0.4)
      const q = ppt(p, cx, cy, s, rot), bob = 5 * Math.sin((t - p.t0) * 2.6 + i)
      orb(x, q.x, q.y + bob, p.r * k * Math.max(0.62, s), p.col, clamp(k * 2) * a, 3.4)
      if (labelK > 0) label(x, q.x, q.y + 92, p.role, p.s, pop01(t, p.t0 + 0.08, 0.38) * a * labelK, p.col)
      drawBurst(x, p.b, q.x, q.y, t, p.t0, p.s.color, 0.7)
      p.q = { x: q.x, y: q.y + bob }
    })
  }
  const SMALL = 0.56, LX = 290, RX = 790, MY = 1000
  function drawCharts(t) {
    if (t < T.bloom - 0.01 || t > T.chartsOut + 0.5) return
    const b = prog(t, T.bloom, T.bloom + 0.75), sl = ease.inOutCubic(prog(t, ...T.slide)), o = prog(t, T.chartsOut, T.chartsOut + 0.4)
    const outS = 1 - ease.inCubic(o)
    const s = lerp(easeOutBack(b, 1.6), SMALL, sl) * outS
    const rot = (1 - ease.outCubic(b)) * -1.6 + (t - T.bloom) * 0.04 + ease.inCubic(o) * 1.2
    const a = clamp(b * 3) * (1 - ease.inQuad(o))
    drawChartAt(t, YOU, lerp(WC.cx, LX, sl), lerp(WC.cy, MY, sl), s, rot, a, outK(t, T.labelsOut))
    drawBurst(x, B_BLOOM, WC.cx, WC.cy, t, T.bloom, GOLD, 0.9)
    if (t < T.them) return
    // their chart
    const kb = pop01(t, T.them, 0.45) * outS
    drawChartAt(t, THEM, RX, MY, SMALL * kb, -(t - T.them) * 0.05 - (1 - clamp(kb)) * 1.2, clamp(kb * 2) * (1 - ease.inQuad(o)), 0)
    // YOU / THEM tags
    x.save(); x.textAlign = 'center'; x.font = `700 36px ${MONO}`; x.fillStyle = BONE; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
    x.globalAlpha = clamp(prog(t, T.slide[1] - 0.2, T.slide[1] + 0.2)) * (1 - o); x.fillText('YOU', LX, MY - 240)
    x.globalAlpha = clamp(kb * 2) * (1 - o); x.fillText('THEM', RX, MY - 240); x.restore()
    // Push / Pull / Align lines
    LINES.forEach((L, i) => {
      const p = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.4)) * outS
      if (p <= 0) return
      const pa = YOU[L.a].q, pb = THEM[L.b].q
      if (!pa || !pb) return
      const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2 + (i - 1) * 110
      x.save(); glowStroke(x, L.col, 7, 22); x.globalAlpha = clamp(outS * 2)
      x.beginPath()
      const N = 24
      for (let j = 0; j <= N * p; j++) { const u = j / N, qx = (1 - u) * (1 - u) * pa.x + 2 * (1 - u) * u * mx + u * u * pb.x, qy = (1 - u) * (1 - u) * pa.y + 2 * (1 - u) * u * my + u * u * pb.y; j ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
      x.stroke(); x.restore()
    })
    LINES.forEach((L, i) => {
      const ck = pop01(t, T.lines[i] + 0.2, 0.36) * outS
      if (ck <= 0) return
      const cx = 540 + (i - 1) * 290, yy = 1300
      x.save(); x.translate(cx, yy); x.scale(ck, ck); x.globalAlpha = clamp(ck * 2)
      x.fillStyle = rgba(L.col, 0.22); x.beginPath(); x.roundRect(-125, -42, 250, 84, 42); x.fill()
      glowStroke(x, L.col, 5, 18); x.stroke(); x.shadowBlur = 0
      x.fillStyle = L.col; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.name, 0, 3)
      x.restore()
      drawBurst(x, B(30 + i, 8, 90), cx, yy, t, T.lines[i] + 0.2, L.col, 0.55)
    })
  }
  const LINES = [
    { name: 'PULL', col: READING.pull, a: 1, b: 1 },
    { name: 'PUSH', col: READING.push, a: 2, b: 2 },
    { name: 'ALIGN', col: READING.align, a: 0, b: 0 },
  ]

  // ── the mystery card
  const B_CARD = B(10, 12, 150)
  function drawMystery(t) {
    const s = T.m0; if (t < s || t > T.out3[1] + 0.2) return
    const k = outScale(t, T.out3[0] - 0.05, 0.35); if (k <= 0) return
    const d = prog(t, s + 0.3, s + 0.85), e = easeOutBack(d, 1.6)
    const cy = lerp(-500, 980, e) + 8 * Math.sin((t - s) * 2.2), rot = lerp(-18, -3, e) + 3 * Math.sin((t - s) * 1.7)
    x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
    card(x, imProfile, 540, cy, 540, rot, clamp(d * 4), BLUE)
    x.restore()
    drawBurst(x, B_CARD, 540, 980, t, s + 0.8, BLUE, 0.7)
    sticker(x, 250, 720, 'FACE: LAST', PINK, t, s + 1.15, -9, k)
    sticker(x, 830, 1180, 'CARD: FIRST', GOLD, t, s + 1.55, 7, k)
  }

  // ── finale: stars pop through the clouds
  const POPS = (() => { const r = rng(808); return Array.from({ length: 10 }, (_, i) => ({ x: 120 + r() * 840, y: 560 + r() * 560, t: T.finLast + 0.05 + i * 0.1, c: [GOLD, PINK, BLUE, BONE][i % 4], b: makeBurst(900 + i, 8, 70) })) })()
  function drawFinale(t) {
    if (t < T.finLast || t > CLEAR) return
    const out = outK(t, [T.cityOut2[0], T.cityOut2[0] + 0.5])
    for (const p of POPS) {
      if (t < p.t) continue
      const k = pop01(t, p.t, 0.4) * out
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, 70 * k); g.addColorStop(0, rgba(p.c, 0.4 * k)); g.addColorStop(1, rgba(p.c, 0))
      x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, 70 * k, 0, Math.PI * 2); x.fill(); x.restore()
      x.save(); x.globalAlpha = clamp(k) * (0.75 + 0.25 * Math.sin(t * 5 + p.x)); x.imageSmoothingEnabled = false
      drawPixelStar(x, Math.round(p.x), Math.round(p.y + 6 * Math.sin(t * 2 + p.y)), Math.round(28 * k), 0, p.c); x.restore()
      drawBurst(x, p.b, p.x, p.y, t, p.t, p.c, 0.6)
    }
  }

  const B_UMB = B(4, 10, 130)
  return {
    start: 0, end: END, root,
    update(t) {
      const gk = greyK(t)
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      const cam = t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const starsK = t < T.fin - 1 ? lerp(1, 0.05, clamp(prog(t, T.clouds - 0.1, T.clouds + 0.4)) * (1 - partK(t))) : lerp(1, 0.45, gk / 0.55)
      drawSky(x, t, { ...cam, stars: starsK, dim: lerp(SKY_H.dim, 0.3, gk), moon: { ...SKY_H.moon, alpha: lerp(1, 0, Math.min(1, gk * 1.5)) } })
      if (t < CLEAR) {
        drawGrey(x, gk)
        drawClouds(t)
        drawPeek(t)
        drawCharts(t)
        const dy = cityDy(t)
        const ledge = t < T.fin - 1 ? dy - 590 * ease.inOutCubic(prog(t, ...T.dip)) : dy
        drawCity(x, t, { dy, ledge })
        // the person: umbrella opens on B3, folds when the clouds part; in the finale it hangs closed and the free arm points up
        const fin = t >= T.fin - 1
        const pk = fin ? pop01(t, T.finRise[0] + 0.35, 0.45) : pop01(t, T.person, 0.45)
        const open = fin ? 0 : easeOutBack(prog(t, T.umbrella, T.umbrella + 0.35), 2.2) * (1 - ease.inOutCubic(prog(t, ...T.fold)))
        const point = fin ? ease.outCubic(prog(t, T.finLast - 0.1, T.finLast + 0.3)) : 0.9 * easeOutBack(prog(t, T.fold[1], T.fold[1] + 0.4), 2)
        const bounce = 1 + 0.06 * Math.sin(Math.PI * prog(t, fin ? T.finLast - 0.1 : T.umbrella, (fin ? T.finLast - 0.1 : T.umbrella) + 0.4))
        const look = fin ? 1 : lerp(0.5, 1, ease.outCubic(prog(t, T.h0b, T.h0b + 0.5)))
        const sc = 2.5
        const shelter = !fin && open > 0.5 ? { x: PX + 34 * sc + 40, w: 76 * sc, y: GROUND + ledge - 92 * sc - 90 * sc } : null
        drawRain(x, t, rainK(t), shelter)
        person(x, PX, GROUND + ledge, sc * pk * bounce, clamp(pk * 2), { look, point, open, up: fin || t > T.fold[1] ? 0 : 1, t })
        if (!fin) drawBurst(x, B_UMB, PX + 140, GROUND + ledge - 520, t, T.umbrella, PINK, 0.6)
        drawMystery(t)
        drawFinale(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
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
const NOTE = [554.37, 659.25, 739.99, 830.61, 880, 1108.73, 1318.51]   // F# minor-ish (the engine re-keys pitched SFX anyway)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const rainTicks = (() => { const out = []; for (let t = BEAT(2) + 0.1; t < 6.9; t += 0.37) out.push(['tick', +t.toFixed(3), 0.012 + 0.006 * ((t * 7) % 1)]); return out })()
export const CUES = [
  // hook
  ['pop', T.h0Words[0], 739.99, 0.05, 0],
  ['whoosh', T.clouds - 0.25, 0.45, 0.04], ['pop', T.clouds, 554.37, 0.06, -0.2], ['boom', T.clouds + 0.02, 0.05],
  ['pop', T.rain, 880, 0.06, 0.2], ['pluck', T.rain, 1108.73, 0.045, 0.5, 0],
  ...rainTicks,
  ['pop', T.person, 659.25, 0.04, -0.4],
  ['pop', T.umbrella, 830.61, 0.06, -0.3], ['whoosh', T.umbrella - 0.05, 0.25, 0.03], ['glitter', T.umbrella, T.umbrella + 0.4],
  ...wordPops(T.h0b, 5, 0.07, 0),
  ['pluck', T.h0bLast, 1108.73, 0.05, 0.6, 0], ['pop', T.h0bLast, 1318.51, 0.05, 0],
  ['pop', T.peek, 1318.51, 0.04, 0.4], ['glitter', T.peek, T.peek + 0.4],
  ...wordPops(T.s0, 2, 0.06, 2, 0.022),
  ['whoosh', T.cover[0], 0.35, 0.03], ['pop', T.s0Last, 440, 0.05, 0.3],
  // turn
  ...wordPops(T.h1, 3, 0.07, 1),
  ['pluck', T.h1Last, 880, 0.055, 0.8, 0], ['pop', T.h1Last, 1108.73, 0.06, 0.2],
  ['whoosh', T.part[0], 0.9, 0.045], ['riser', T.h1, T.bloom, 0.04], ['glitter', T.part[0] + 0.3, T.part[1]],
  ['pop', T.fold[0] + 0.3, 659.25, 0.04, -0.4],
  ['boom', T.bloom, 0.1], ['bell', T.bloom + 0.02, 554.37, 0.035, 2.0, 0], ['glitter', T.bloom, T.bloom + 1.2],
  ...T.planets.map((tp, i) => ['pop', +tp.toFixed(3), [739.99, 880, 1108.73][i], 0.06, [-0.3, 0.1, 0.35][i]]),
  ...T.planets.map((tp, i) => ['pluck', +(tp + 0.02).toFixed(3), [554.37, 739.99, 880][i], 0.04, 0.5, 0]),
  ['glitter', T.tri, T.tri + 0.6],
  ...wordPops(T.s1, 4, 0.06, 2, 0.022), ['pluck', T.s1Last, 1318.51, 0.045, 0.5, 0],
  // match
  ['whoosh', T.slide[0], 0.6, 0.04],
  ...wordPops(T.h2, 4, 0.07, 0), ['pluck', T.h2Last, 1108.73, 0.05, 0.6, 0], ['pop', T.h2Last + 0.12, 1318.51, 0.05, 0.2],
  ['pop', T.them, 880, 0.06, 0.4], ['whoosh', T.them - 0.1, 0.35, 0.03],
  ...T.lines.map((lt, i) => ['pluck', +(lt + 0.2).toFixed(3), [880, 987.77, 1108.73][i], 0.045, 0.5, 0]),
  ...T.lines.map((lt, i) => ['pop', +(lt + 0.2).toFixed(3), [1108.73, 1318.51, 1479.98][i], 0.05, (i - 1) * 0.4]),
  ['glitter', T.lines[2] + 0.2, T.lines[2] + 0.9],
  ...wordPops(T.s2, 9, 0.06, 1, 0.02),
  ['whoosh', T.chartsOut, 0.5, 0.035],
  // mystery card
  ...wordPops(T.m0 + 0.05, 4, 0.07, 0), ['whoosh', T.m0 + 0.3, 0.5, 0.035], ['pop', T.m0 + 0.8, 739.99, 0.06, 0], ['glitter', T.m0 + 0.8, T.m0 + 1.4],
  ['pop', T.m0 + 1.15, 880, 0.06, -0.4], ['tick', T.m0 + 1.16, 0.04], ['pop', T.m0 + 1.55, 1108.73, 0.06, 0.4], ['tick', T.m0 + 1.56, 0.04],
  ...wordPops(T.s3, 6, 0.06, 2, 0.022), ['whoosh', T.out3[0], 0.5, 0.03],
  // finale
  ['whoosh', T.finRise[0], 0.7, 0.035],
  ...wordPops(T.fin, 4, 0.07, 0),
  ['riser', T.finLast - 0.8, T.finLast, 0.035],
  ['pluck', T.finLast, 554.37, 0.06, 1.2, 0], ['pop', T.finLast, 1108.73, 0.06, 0], ['pop', T.finLast + 0.14, 1318.51, 0.06, 0.2],
  ['bell', T.finLast + 0.02, 880, 0.035, 2.2, 0], ['glitter', T.finLast, T.finLast + 1.2],
  ['whoosh', T.cityOut2[0], 0.7, 0.035],
]
