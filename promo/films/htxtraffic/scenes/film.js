// htxtraffic (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come Align.").
//   0.00–2.95  HOOK  "An hour on the | Katy Freeway…"  A wide six-lane freeway at dusk, a sea of brake lights, our gold
//              pictogram car inching along (stop-and-go rock), a clock rising behind a generic skyline, hands spinning.
//   3.00–5.25  "…for a date who | just says “hey.”"  A chat bubble pops out of the car, inflates, then deflates like a
//              sad balloon (wrinkles, leak puffs) and flops to the road.
//   5.25–8.30  ON ALIGN  "Dealbreakers, | up front."  A DEALBREAKERS card pops in; a red stamp slams "✕ ONE-WORD TEXTS"
//              (5.98). A real talk card ("What's a hill you will die on?") deals in (6.45). "And a real question, | not “hey.”"
//   8.30–10.55 "Know before | you drive."  The freeway returns, empty; the gold car zooms off to a star on the horizon.
//   10.55→     plain sky only (SKY_H + grain), the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

const W = 1080, H = 1920
const BONE = '#efe6d6', GOLD = '#f2c75c', RED = '#ff3d3d', FIRE = '#f0603a', PINK = '#ff8fb1', INK = '#1a1430', DULL = '#c4bfdc', SILVER = '#e3ecff'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const D2R = Math.PI / 180
export const BEAT = n => 0.6 + n * 0.5556

export const STORY_END = 10.6
// ── the timeline
export const T = {
  hook: 0.08, hookLand: BEAT(0) + 0.05, hookOut: [2.75, 2.95],
  road: 0.0, clock: 0.35,
  hey: 3.0, heyLand: 3.5, bubble: 3.3, bubbleBig: [3.3, 3.75], deflate: [4.35, 4.95], flop: [4.95, 5.25], heyOut: [5.05, 5.25], roadDim: [3.05, 3.5], roadGone: [5.0, 5.35],
  turn: 5.3, turnLand: 5.65, dcard: 5.35, stamp: BEAT(9.7), tcard: 6.45, sub: 6.6, turnOut: [8.1, 8.3],
  end: 8.3, endLand: BEAT(14.6), roadBack: [8.3, 8.65], zoom: [8.75, 9.75], star: 9.75, endOut: [10.32, 10.55], roadEnd: [10.05, 10.5],
}

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

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
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws.map(w => w.t),
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

// ── the freeway: perspective from a vanishing point; world depth z ≥ 1 (1 = bottom of frame)
const VP = { x: 540, y: 735 }, ROAD_K = (H - VP.y), HALF = 1180, LANES = 6
const yOf = z => VP.y + ROAD_K / z
const xOf = (u, z) => VP.x + (u * HALF) / z            // u: −1 (left edge) … +1 (right edge)
const laneU = l => -1 + (2 * (l + 0.5)) / LANES          // lane centre
const HERO_LANE = 3, HERO_Z = 1.42
// traffic: [lane, z]; they crawl with us, jittering a little relative to us
const CARS = (() => {
  const r = rng(77), out = []
  for (let l = 0; l < LANES; l++) {
    let z = l === HERO_LANE ? HERO_Z + 0.95 : 1.12 + r() * 0.5
    while (z < 26) { out.push({ l, z, ph: r() * 6, col: r() }); z += (l === HERO_LANE ? 0.85 : 0.75) * z * (0.55 + r() * 0.3) + 0.3 }
  }
  return out.sort((a, b) => b.z - a.z)
})()
// stop-and-go crawl: distance travelled (monotonic), used for lane dashes
const crawl = t => 0.32 * t + 0.09 * Math.sin(t * 3.1)
const braking = t => 0.6 + 0.4 * Math.max(0, Math.sin(t * 3.1 + 1.2))   // brake lights pulse with the stop-and-go

/** a car seen from behind, centred at (cx, by = bottom), width w */
function drawCar(x, cx, by, w, { body = '#2a2148', line = BONE, lw = 4, brake = 1, glow = 0, a = 1, hero = false }) {
  const h = w * 0.62, r = w * 0.12
  x.save(); x.globalAlpha = a
  // tyres
  x.fillStyle = '#0a0716'
  x.fillRect(cx - w * 0.42, by - h * 0.12, w * 0.16, h * 0.14); x.fillRect(cx + w * 0.26, by - h * 0.12, w * 0.16, h * 0.14)
  // cabin (trapezoid) + body
  x.beginPath()
  x.moveTo(cx - w * 0.5, by - h * 0.1)
  x.lineTo(cx - w * 0.5, by - h * 0.5)
  x.lineTo(cx - w * 0.36, by - h * 0.56)
  x.lineTo(cx - w * 0.28, by - h * 0.95)
  x.quadraticCurveTo(cx, by - h * 1.02, cx + w * 0.28, by - h * 0.95)
  x.lineTo(cx + w * 0.36, by - h * 0.56)
  x.lineTo(cx + w * 0.5, by - h * 0.5)
  x.lineTo(cx + w * 0.5, by - h * 0.1)
  x.quadraticCurveTo(cx + w * 0.5, by, cx + w * 0.5 - r, by)
  x.lineTo(cx - w * 0.5 + r, by)
  x.quadraticCurveTo(cx - w * 0.5, by, cx - w * 0.5, by - h * 0.1)
  x.closePath()
  x.fillStyle = body; x.fill()
  if (lw > 0) { glowStroke(x, line, lw, hero ? 22 : 6 + 8 * glow); x.stroke(); x.shadowBlur = 0 }
  // rear window
  x.fillStyle = hero ? rgba(GOLD, 0.25) : 'rgba(10,7,22,0.85)'
  x.beginPath(); x.moveTo(cx - w * 0.25, by - h * 0.62); x.lineTo(cx - w * 0.2, by - h * 0.88); x.lineTo(cx + w * 0.2, by - h * 0.88); x.lineTo(cx + w * 0.25, by - h * 0.62); x.closePath(); x.fill()
  // brake lights: glowing red bars
  const bw = w * 0.2, bh = h * 0.13, ly = by - h * 0.42
  x.globalCompositeOperation = 'lighter'
  for (const sx of [-1, 1]) {
    const lx = cx + sx * (w * 0.5 - bw * 0.5 - w * 0.04)
    const gr = x.createRadialGradient(lx, ly, 0, lx, ly, w * 0.5)
    gr.addColorStop(0, rgba(RED, 0.55 * brake * a)); gr.addColorStop(1, rgba(RED, 0))
    x.fillStyle = gr; x.beginPath(); x.arc(lx, ly, w * 0.5, 0, Math.PI * 2); x.fill()
  }
  x.globalCompositeOperation = 'source-over'
  for (const sx of [-1, 1]) {
    const lx = cx + sx * (w * 0.5 - bw * 0.5 - w * 0.04)
    x.fillStyle = brake > 0.75 ? '#ffd2d2' : RED; x.globalAlpha = a * (0.45 + 0.55 * brake)
    x.beginPath(); x.roundRect(lx - bw / 2, ly - bh / 2, bw, bh, bh * 0.4); x.fill()
  }
  x.restore()
}

/** the clock rising behind the skyline; hands spin (minute hand ≈ one turn every 0.55 s) */
function drawClock(x, cx, cy, R, t, k, a = 1) {
  if (k <= 0 || a <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha = a
  x.fillStyle = 'rgba(20,14,44,0.92)'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  glowStroke(x, GOLD, 10, 30); x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke()
  x.shadowBlur = 0
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2, r0 = R * (i % 3 ? 0.8 : 0.72)
    x.strokeStyle = BONE; x.lineWidth = i % 3 ? 5 : 9
    x.beginPath(); x.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); x.lineTo(Math.cos(a) * R * 0.88, Math.sin(a) * R * 0.88); x.stroke()
  }
  const spin = Math.max(0, t - T.clock)
  const mA = spin * 11.5 - Math.PI / 2, hA = spin * 11.5 / 12 - Math.PI / 2 + 0.6
  glowStroke(x, BONE, 12, 10); x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(hA) * R * 0.45, Math.sin(hA) * R * 0.45); x.stroke()
  glowStroke(x, GOLD, 8, 14); x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(mA) * R * 0.74, Math.sin(mA) * R * 0.74); x.stroke()
  // motion smear behind the minute hand
  x.globalAlpha = 0.25 * a; x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, R * 0.74, mA - 1.1, mA); x.closePath(); x.fill()
  x.globalAlpha = a; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 13, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** a generic skyline silhouette along the horizon */
const TOWERS = (() => {
  const r = rng(12), out = []
  let px = 120
  while (px < 960) { const w = 34 + r() * 46, h = 40 + r() * (Math.abs(px - 540) < 260 ? 190 : 80); out.push({ x: px, w, h, spire: r() < 0.25, lit: r() }); px += w + 4 + r() * 10 }
  return out
})()
function drawSkyline(x, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (const b of TOWERS) {
    x.fillStyle = '#120c2a'; x.fillRect(b.x, VP.y - b.h, b.w, b.h + 2)
    x.strokeStyle = rgba(PINK, 0.45); x.lineWidth = 2; x.strokeRect(b.x, VP.y - b.h, b.w, b.h + 2)
    if (b.spire) { x.beginPath(); x.moveTo(b.x + b.w / 2 - 6, VP.y - b.h); x.lineTo(b.x + b.w / 2, VP.y - b.h - 36); x.lineTo(b.x + b.w / 2 + 6, VP.y - b.h); x.fillStyle = '#120c2a'; x.fill(); x.stroke() }
    // a few warm windows
    x.fillStyle = rgba(GOLD, 0.55)
    for (let wy = VP.y - b.h + 14; wy < VP.y - 10; wy += 22) for (let wx = b.x + 8; wx < b.x + b.w - 10; wx += 16) if (noise1(wx * 0.31 + wy * 0.17, 3) > 0.62 + 0.2 * b.lit) x.fillRect(wx, wy, 6, 9)
  }
  x.restore()
}

/** road surface, edges and moving lane dashes. dist = distance travelled (world units) */
function drawRoad(x, a, dist, { dashA = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  // asphalt
  const g = x.createLinearGradient(0, VP.y, 0, H)
  g.addColorStop(0, 'rgba(26,18,52,0.55)'); g.addColorStop(1, 'rgba(14,10,30,0.96)')
  x.fillStyle = g; x.beginPath(); x.moveTo(VP.x, VP.y); x.lineTo(xOf(-1, 0.9), H + 40); x.lineTo(xOf(1, 0.9), H + 40); x.closePath(); x.fill()
  // edges (solid, glowing)
  glowStroke(x, BONE, 7, 18)
  for (const u of [-1, 1]) { x.beginPath(); x.moveTo(xOf(u, 60), yOf(60)); x.lineTo(xOf(u, 0.9), yOf(0.9)); x.stroke() }
  // lane dashes: world spacing 1.6, length 0.7, scrolling toward us
  x.shadowBlur = 8; x.strokeStyle = BONE
  for (let l = 1; l < LANES; l++) {
    const u = -1 + (2 * l) / LANES
    for (let s = 1 - (dist % 1.6); s < 40; s += 1.6) {
      const z0 = Math.max(0.95, s), z1 = s + 0.7
      if (z1 < 0.95) continue
      x.globalAlpha = a * dashA * clamp(1.4 - s / 30)
      x.lineWidth = Math.max(1.5, 16 / z0)
      x.beginPath(); x.moveTo(xOf(u, z0), yOf(z0)); x.lineTo(xOf(u, z1), yOf(z1)); x.stroke()
    }
  }
  x.restore()
}

/** chat bubble with a tail at bottom-left; deflate 0..1 (wrinkly sag), text inside */
function drawBubble(x, cx, cy, w, h, defl, a) {
  if (a <= 0 || w < 2) return
  x.save(); x.globalAlpha = a; x.translate(cx, cy)
  const rr = Math.min(h / 2, 130)
  const wob = (px) => defl * 10 * Math.sin(px * 0.045 + defl * 9)
  // body (top edge sags and wrinkles as it deflates)
  x.beginPath()
  const N = 22
  x.moveTo(-w / 2 + rr, -h / 2 + wob(0))
  for (let i = 1; i <= N; i++) { const px = -w / 2 + rr + (w - 2 * rr) * i / N; x.lineTo(px, -h / 2 + wob(px) + defl * 24 * Math.sin(Math.PI * i / N)) }
  x.arcTo(w / 2, -h / 2, w / 2, 0, rr)
  x.arcTo(w / 2, h / 2, 0, h / 2, rr)
  x.lineTo(-w / 2 + rr * 1.4, h / 2)
  // tail
  x.lineTo(-w / 2 + rr * 0.5, h / 2 + h * 0.32 * (1 - defl * 0.5))
  x.lineTo(-w / 2 + rr * 0.55, h / 2 - rr * 0.1)
  x.arcTo(-w / 2, h / 2, -w / 2, 0, rr * 0.6)
  x.arcTo(-w / 2, -h / 2, 0, -h / 2, rr)
  x.closePath()
  x.fillStyle = lerpColor('#d8d4ea', '#8f8aa6', defl); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; x.shadowOffsetY = 14; x.fill()
  x.shadowOffsetY = 0
  glowStroke(x, BONE, 6, 20 * (1 - defl)); x.stroke()
  x.shadowBlur = 0
  // "hey"
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 ${Math.round(h * 0.6)}px ${INTER}`
  x.save(); x.scale(1, 1 - defl * 0.25); x.fillText('hey', 0, h * 0.02); x.restore()
  x.restore()
}
function lerpColor(a, b, k) { const A1 = hexToRgb(a), B1 = hexToRgb(b); return `rgb(${A1.map((v, i) => Math.round(lerp(v, B1[i], k))).join(',')})` }

/** an illustrated DEALBREAKERS card (not app UI): dark glass, gold rim, three blank chip rows */
function drawDealCard(x, w, h, t) {
  const rim = GOLD
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.92)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.fill()
  x.shadowOffsetY = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(FIRE, 0.22)); gr.addColorStop(1, rgba(FIRE, 0.03))
  x.fillStyle = gr; x.fill()
  glowStroke(x, rim, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.stroke()
  x.shadowBlur = 0; x.lineWidth = 2; x.globalAlpha *= 0.4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 24); x.stroke(); x.globalAlpha /= 0.4
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = rim; x.font = `700 34px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 66)
  // a big red ✕ icon
  glowStroke(x, FIRE, 14, 20)
  x.beginPath(); x.moveTo(-46, -h / 2 + 130); x.lineTo(46, -h / 2 + 222); x.moveTo(46, -h / 2 + 130); x.lineTo(-46, -h / 2 + 222); x.stroke()
  x.shadowBlur = 0
  // three blank chip rows
  const cw = [w * 0.7, w * 0.56, w * 0.64]
  cw.forEach((c, i) => {
    const y = -h / 2 + 300 + i * 92
    x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 4; x.beginPath(); x.roundRect(-c / 2, y - 30, c, 60, 30); x.stroke()
    x.fillStyle = rgba(BONE, 0.18); x.beginPath(); x.roundRect(-c / 2 + 28, y - 7, c - 56, 14, 7); x.fill()
  })
}

/** the rubber stamp "✕ ONE-WORD | TEXTS" */
function drawStamp(x, a) {
  x.save(); x.globalAlpha *= a
  const w = 520, h = 230
  x.strokeStyle = RED; x.lineWidth = 12; x.shadowColor = rgba(RED, 0.75); x.shadowBlur = 26
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22); x.stroke()
  x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 14); x.stroke()
  x.fillStyle = 'rgba(255,61,61,0.14)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22); x.fill()
  x.shadowBlur = 14; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 64px ${INTER}`; x.fillText('✕ ONE-WORD', 0, -36)
  x.font = `900 84px ${INTER}`; x.fillText('TEXTS', 0, 50)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const talk = new Image(); talk.src = A + 'card-talk-1.png'
  try { await talk.decode() } catch (_) { /* drawn only when loaded */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON, TX'), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.turn, T.turnOut]]
  const head = (text, t0, o = {}) => popText(root, text, { top: 205, size: 116, font: INTER, weight: 800, accentSize: 128, at: t0, ...o })
  const H0 = head('An hour on the | *Katy* *Freeway…*', T.hook, { gap: 0.06, accentColor: FIRE, lastAt: T.hookLand, wobble: true })
  const H1 = head('…for a date | who just says | *“hey.”*', T.hey, { gap: 0.07, accentColor: DULL, accentSize: 150, lastAt: T.heyLand, wobble: true })
  const H2 = head('Dealbreakers, | *up front.*', T.turn, { gap: 0.08, accentColor: GOLD, lastAt: T.turnLand, wobble: true })
  const S2 = popText(root, 'And a real question, | not *“hey.”*', { top: 1530, size: 64, font: INTER, weight: 700, accentSize: 74, accentColor: PINK, at: T.sub, gap: 0.06 })
  const H3 = head('Know before | you *drive.*', T.end, { size: 140, accentSize: 158, gap: 0.08, accentColor: GOLD, lastAt: T.endLand, wobble: true, top: 190 })
  const HEADS = [[H0, T.hookOut], [H1, T.heyOut], [H2, T.turnOut], [S2, T.turnOut], [H3, T.endOut]]
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const B_CLOCK = makeBurst(3, 10, 150), B_HERO = makeBurst(5, 8, 110), B_BUB = makeBurst(7, 10, 260), B_FLOP = makeBurst(8, 6, 120)
  const B_CARD = makeBurst(9, 10, 260), B_STAMP = makeBurst(10, 14, 330), B_TALK = makeBurst(11, 10, 250), B_STAR = makeBurst(12, 12, 170)

  const heroX = () => xOf(laneU(HERO_LANE), HERO_Z)
  const heroW = 300 / HERO_Z * 1.05

  function drawFreeway(t) {
    // visibility: full during the hook, dimmed under the bubble, gone for the turn; back, empty, for the end
    const hookA = t < T.roadGone[1] ? lerp(1, 0.32, ease.inOutQuad(prog(t, ...T.roadDim))) * outK(t, T.roadGone) : 0
    const endA = t >= T.roadBack[0] ? ease.outCubic(prog(t, ...T.roadBack)) * outK(t, T.roadEnd) : 0
    const a = Math.max(hookA, endA)
    if (a <= 0) return
    const rise = 1 - ease.outCubic(prog(t, 0, 0.6))                 // the road rises into place at the open
    x.save(); x.translate(0, rise * 120)
    if (t < T.roadGone[1]) {
      // clock rising behind the skyline (clipped at the horizon)
      const ck = pop01(t, T.clock, 0.55)
      const cy = VP.y - 20 - 112 * ease.outCubic(prog(t, T.clock, T.clock + 0.7))
      const backA = hookA * outK(t, T.roadDim)
      x.save(); x.beginPath(); x.rect(0, 0, W, VP.y); x.clip()
      drawClock(x, VP.x, cy, 124, t, ck, backA); x.restore()
      drawBurst(x, B_CLOCK, VP.x, VP.y - 132, t, T.clock + 0.3, GOLD, 0.7)
      drawSkyline(x, backA)
      drawRoad(x, hookA, crawl(t))
      // traffic, far → near; brake lights pulse with stop-and-go and a wave rolling toward us
      for (const c of CARS) {
        const z = c.z + 0.05 * Math.sin(t * 2.2 + c.ph)
        if (z < 1.02) continue
        const w = 300 / z, by = yOf(z) + 8 / z
        const wave = 0.5 + 0.5 * Math.sin(t * 4.2 - z * 0.9 + c.ph * 0.3)
        const brake = clamp(braking(t) * (0.55 + 0.45 * wave))
        const k = pop01(t, 0.15 + clamp((26 - z) / 26) * 0.0 + (c.l % 3) * 0.03 + Math.min(0.5, z * 0.02), 0.35)
        drawCar(x, xOf(laneU(c.l), z), by, w * k, { body: c.col < 0.5 ? '#2a2148' : '#33264f', lw: Math.max(1.5, 7 / z), brake, a: hookA * clamp(k * 2) * clamp(1.6 - z / 18) })
      }
      // our gold car (rocks with stop-and-go)
      const hk = pop01(t, 0.2, 0.45)
      const rock = 6 * Math.sin(t * 3.1) * (t < T.roadDim[0] ? 1 : 0.3)
      x.save(); x.translate(heroX(), yOf(HERO_Z)); x.rotate(rock * 0.15 * D2R); x.scale(hk, hk * (1 + 0.02 * Math.sin(t * 6.2)))
      drawCar(x, 0, 0, heroW, { body: rgba(GOLD, 0.32), line: GOLD, lw: 8, brake: braking(t), a: hookA, hero: true })
      x.restore()
      drawBurst(x, B_HERO, heroX(), yOf(HERO_Z) - 90, t, 0.35, GOLD, 0.6)
    }
    if (endA > 0) {
      // the end: empty road; our car zooms off to a star on the horizon
      const zp = ease.inCubic(prog(t, ...T.zoom))
      const dist = crawl(T.roadBack[0]) + 9 * zp * zp + 1.2 * prog(t, T.roadBack[0], T.zoom[0])
      drawSkyline(x, endA * 0.8)
      drawRoad(x, endA, dist, { dashA: 1 })
      // speed lines
      if (zp > 0 && zp < 1) {
        x.save(); x.globalAlpha = endA * Math.sin(Math.PI * zp) * 0.8; glowStroke(x, GOLD, 4, 14)
        for (let i = 0; i < 10; i++) {
          const u = (i < 5 ? -1 : 1) * (1.05 + (i % 5) * 0.22), s = ((t * 9 + i * 0.37) % 1)
          const z0 = 1 + s * 4, z1 = z0 + 1.2
          x.beginPath(); x.moveTo(xOf(u, z0), yOf(z0) - 60 / z0); x.lineTo(xOf(u, z1), yOf(z1) - 60 / z1); x.stroke()
        }
        x.restore()
      }
      const z = HERO_Z * Math.pow(60 / HERO_Z, zp)
      const sq = 1 - 0.08 * Math.sin(Math.PI * prog(t, T.zoom[0] - 0.15, T.zoom[0] + 0.15))
      if (z < 55) {
        x.save(); x.translate(xOf(laneU(HERO_LANE) * (1 - zp), z), yOf(z)); x.scale(HERO_Z / z / sq, HERO_Z / z * sq)
        drawCar(x, 0, 0, heroW, { body: rgba(GOLD, 0.32), line: GOLD, lw: 8, brake: 0, a: endA * clamp((55 - z) / 10), hero: true })
        x.restore()
      }
      // the star on the horizon
      const sk = pop01(t, T.star, 0.45)
      if (sk > 0) {
        const pulse = 1 + 0.12 * Math.sin((t - T.star) * 7)
        x.save(); x.globalAlpha = endA
        x.globalCompositeOperation = 'lighter'
        const gr = x.createRadialGradient(VP.x, VP.y - 30, 0, VP.x, VP.y - 30, 200 * sk)
        gr.addColorStop(0, rgba(GOLD, 0.7)); gr.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = gr; x.beginPath(); x.arc(VP.x, VP.y - 30, 200 * sk, 0, Math.PI * 2); x.fill()
        x.globalCompositeOperation = 'source-over'
        drawPixelStar(x, VP.x, VP.y - 30, Math.round(36 * sk * pulse / 4) * 4 || 4, 0, '#fff3d0')
        x.restore()
        drawBurst(x, B_STAR, VP.x, VP.y - 30, t, T.star, GOLD, 0.8)
      }
    }
    x.restore()
  }

  function drawHey(t) {
    if (t < T.bubble || t > T.flop[1] + 0.05) return
    const hx = heroX(), hy = yOf(HERO_Z) - 170
    const grow = easeOutBack(prog(t, ...T.bubbleBig), 1.6)
    const d = ease.inOutQuad(prog(t, ...T.deflate))                      // 0 → 1 deflating
    const f = ease.inCubic(prog(t, ...T.flop))                           // flop onto the road
    const cx = lerp(hx, 540, ease.outCubic(prog(t, ...T.bubbleBig))) + 30 * Math.sin(d * 9) * d
    const cy = lerp(hy, 1080, ease.outCubic(prog(t, ...T.bubbleBig))) + d * 260 + f * 380
    const w = 640 * grow * lerp(1, 0.62, d) * lerp(1, 1.25, f)
    const h = 400 * grow * lerp(1, 0.42, d) * lerp(1, 0.25, f)
    const rot = (-4 + 16 * d * Math.sin(d * 5) + 8 * f) * D2R
    // leak puffs from the tail while deflating
    if (d > 0 && d < 1) {
      x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * d)
      for (let i = 0; i < 5; i++) {
        const s = ((t - T.deflate[0]) * 2.6 + i * 0.2) % 1
        x.strokeStyle = BONE; x.lineWidth = 5; x.lineCap = 'round'
        const px = cx - w * 0.42 - 40 - s * 120, py = cy + h * 0.6 + 20 + s * 70 + (i - 2) * 18
        x.beginPath(); x.arc(px, py, 10 + 24 * s, 0, Math.PI * 2); x.stroke()
      }
      x.restore()
    }
    x.save(); x.translate(cx, cy); x.rotate(rot)
    drawBubble(x, 0, 0, w, h, d, clamp(grow * 3) * (1 - prog(t, T.flop[0] + 0.12, T.flop[1])))
    x.restore()
    drawBurst(x, B_BUB, 540, 1080, t, T.bubbleBig[0] + 0.3, BONE, 0.6)
    drawBurst(x, B_FLOP, cx, cy, t, T.flop[0] + 0.1, DULL, 0.5)
  }

  function drawTurn(t) {
    if (t < T.dcard - 0.05 || t > T.turnOut[1] + 0.1) return
    const o = prog(t, T.turnOut[0] - 0.05, T.turnOut[1] + 0.05), oe = ease.inCubic(o)
    // DEALBREAKERS card: pops in, gets thumped by the stamp
    const dk = pop01(t, T.dcard, 0.45)
    const thump = t > T.stamp ? Math.sin((t - T.stamp) * 26) * Math.exp(-(t - T.stamp) * 7) : 0
    const shift = ease.inOutCubic(prog(t, T.tcard - 0.1, T.tcard + 0.35))
    const dcx = lerp(540, 330, shift) - 400 * oe, dcy = 1010 + 12 * Math.sin((t - T.dcard) * 2.2) + 8 * thump
    const dw = 470, dh = 640
    if (dk > 0) {
      x.save(); x.translate(dcx, dcy); x.rotate((lerp(0, -6, shift) - 20 * oe) * D2R); x.scale(dk * (1 - 0.05 * thump), dk * (1 + 0.05 * thump)); x.globalAlpha = clamp(dk * 3) * (1 - o)
      drawDealCard(x, dw, dh, t)
      // the stamp: drops from big, slams, settles (with a little ink bloom)
      if (t >= T.stamp - 0.18) {
        const sp = prog(t, T.stamp - 0.18, T.stamp)
        const sc = lerp(2.4, 1, ease.inCubic(sp)) * (t > T.stamp ? 1 + 0.08 * Math.sin((t - T.stamp) * 30) * Math.exp(-(t - T.stamp) * 9) : 1)
        x.save(); x.translate(0, 120); x.rotate(-12 * D2R); x.scale(sc, sc)
        drawStamp(x, clamp(sp * 2.5))
        x.restore()
      }
      x.restore()
      drawBurst(x, B_CARD, dcx, dcy, t, T.dcard + 0.2, GOLD, 0.6)
      drawBurst(x, B_STAMP, dcx, dcy + 120, t, T.stamp, RED, 0.75)
    }
    // the talk card: deals in from the right with a spin
    if (t >= T.tcard && talk.complete && talk.naturalWidth) {
      const p = prog(t, T.tcard, T.tcard + 0.5), e = easeOutBack(p, 1.7)
      const tw = 420, th = tw * talk.naturalHeight / talk.naturalWidth
      const tcx = lerp(1350, 770, e) + 400 * oe, tcy = lerp(1300, 1040, e) + 10 * Math.sin((t - T.tcard) * 2.4 + 1) - 300 * oe
      x.save(); x.translate(tcx, tcy); x.rotate((lerp(40, 7, e) + 25 * oe) * D2R); x.globalAlpha = clamp(p * 4) * (1 - o)
      x.shadowColor = rgba(PINK, 0.55); x.shadowBlur = 50
      x.drawImage(talk, -tw / 2, -th / 2, tw, th)
      x.restore()
      drawBurst(x, B_TALK, 770, 1040, t, T.tcard + 0.3, PINK, 0.7)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.8))
      drawSky(x, t, t < 2.8 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.roadEnd[1]) { drawFreeway(t); drawHey(t); drawTurn(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.4)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.hook, 4, 0.06, 0), ['pop', T.hook + 0.24, 987.77, 0.035, 0.1],
  ['pluck', T.hookLand, 1174.66, 0.05, 0.6, 0], ['pop', T.hookLand, 1318.51, 0.05, 0],
  ['pop', 0.2, 587.33, 0.05, 0.2], ['whoosh', 0.3, 0.5, 0.03], ['pop', T.clock + 0.3, 880, 0.05, 0], ['glitter', T.clock + 0.3, T.clock + 0.7],
  ...[0, 1, 2, 3].map(i => ['tick', +(1.1 + i * 0.5556).toFixed(3), 0.05]),          // the clock ticking on the beat
  ...[0, 1, 2].map(i => ['pluck', +(1.0 + i * 0.6).toFixed(3), 196, 0.03, 0.25, (i - 1) * 0.4]),  // honk-ish low plucks
  // hey
  ...wordPops(T.hey, 6, 0.07, 2, 0.025),
  ['pop', T.bubble, 740, 0.06, -0.2], ['whoosh', T.bubble, 0.4, 0.035], ['pop', T.heyLand, 1174.66, 0.05, 0],
  // the sad deflate: a falling pluck line
  ...[880, 783.99, 659.25, 554.37, 440].map((f, i) => ['pluck', +(T.deflate[0] + i * 0.12).toFixed(3), f, 0.045, 0.3, -0.3 + i * 0.05]),
  ['whoosh', T.deflate[0], 0.6, 0.03], ['tick', T.flop[0] + 0.15, 0.05], ['pop', T.flop[0] + 0.15, 330, 0.04, -0.2],
  // turn
  ...wordPops(T.turn, 1, 0.08, 3), ['pop', T.turnLand, 1318.51, 0.05, 0], ['pluck', T.turnLand, 987.77, 0.045, 0.6, 0],
  ['pop', T.dcard, 880, 0.055, -0.2], ['whoosh', T.stamp - 0.2, 0.2, 0.04], ['boom', T.stamp, 0.16], ['tick', T.stamp, 0.09], ['bell', T.stamp + 0.04, 587.33, 0.04, 1.0, 0],
  ['whoosh', T.tcard - 0.05, 0.35, 0.035], ['pop', T.tcard + 0.3, 1108.73, 0.055, 0.3], ['glitter', T.tcard + 0.3, T.tcard + 0.9],
  ...wordPops(T.sub, 5, 0.06, 1, 0.02),
  // end line
  ...wordPops(T.end, 3, 0.08, 2, 0.03), ['pop', T.endLand, 1318.51, 0.055, 0], ['pluck', T.endLand, 1174.66, 0.05, 0.7, 0],
  ['riser', T.zoom[0] - 0.2, T.zoom[1], 0.05], ['whoosh', T.zoom[0] + 0.2, 0.7, 0.05],
  ['bell', T.star, 1174.66, 0.05, 1.4, 0], ['bell', T.star + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.star, T.star + 0.6],
]
