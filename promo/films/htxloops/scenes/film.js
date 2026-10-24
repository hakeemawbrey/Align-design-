// htxloops (30s, vertical): "Inside the Loop. Outside the Beltway." A stylised map of three ring roads (610, Beltway 8,
// Grand Parkway) with neighbourhood pins → the rings spin and morph into a zodiac wheel → two glowing dots on opposite
// sides of the city connect with a gold line → "Align reads both charts" → back to the map → "Whatever side of the Loop
// you're on…" → the dots meet in the middle and everything clears to the plain sky H by 25.3 (end card at 25.6).
// One canvas, DOM type above it, grain on top. Pure f(t); no document access at module top level.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

export const BEAT = n => 0.6 + n * 0.5556
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', INK = '#1a1430'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const VS = '︎'

// ── geometry: the map and the wheel share a centre
const CX = 540, CY = 1010
const RM = [215, 320, 425]          // map: 610 Loop, Beltway 8, Grand Parkway
const RW = [150, 368, 460]          // wheel: hub, band inner, band outer (WHEEL rIn/rOut)
const RING_COL = [GOLD, BLUE, ROSE]

// ── timeline
export const T = {
  eye: 0.15, h0: 0.3, loopWord: BEAT(0.5), outside: BEAT(2), beltway: BEAT(2.5),
  ring: [0.4, BEAT(2), BEAT(3)], ringDur: 0.6,
  bayou: 2.0, labels0: BEAT(4), labelGap: 0.13,
  cars: 2.1,
  s1: BEAT(7), aOut: [7.05, 7.25],
  morph: [7.4, 8.6], spin: [7.3, 9.3], spokes: [8.3, 8.75], glyph0: BEAT(14.5), glyphGap: 0.055,
  h1: BEAT(16), dotA: BEAT(17), dotB: BEAT(17.5), s2: BEAT(18), line: [BEAT(19), BEAT(20)], yours: BEAT(20), bOut: [13.85, 14.05],
  h2: BEAT(24.5), charts: [BEAT(25), BEAT(25.5)], s3: BEAT(26.5), cOut: [18.45, 18.65],
  back: [18.6, 19.6], relabel: 19.3, h3: BEAT(34.5), dOut: [24.2, 24.4],
  meet: [24.3, 24.95], clear: [24.3, 24.72], settle: 25.3,
}
export const START = 0, END = 25.61

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }
const polar = (ang, r) => ({ x: CX + Math.cos(ang) * r, y: CY + Math.sin(ang) * r })

// morph 0 = map, 1 = wheel
const mIn = t => easeOutBack(prog(t, ...T.morph), 1.3)
const mOut = t => ease.inOutCubic(prog(t, ...T.back))
const morphAt = t => mIn(t) * (1 - mOut(t))
const ringR = (i, t) => lerp(RM[i], RW[i], morphAt(t))
/** map a map-radius onto the current morph (piecewise between the ring radii) */
function radAt(rMap, t) {
  const m = morphAt(t), mapR = [0, ...RM], whR = [0, ...RW]
  for (let i = 1; i < 4; i++) if (rMap <= mapR[i] || i === 3) { const f = (rMap - mapR[i - 1]) / (mapR[i] - mapR[i - 1]); return lerp(lerp(mapR[i - 1], mapR[i], f), lerp(whR[i - 1], whR[i], f), m) }
}
// wheel spin (radians): a full turn while it morphs, then a slow drift
const spinAt = t => -TAU * ease.inOutCubic(prog(t, ...T.spin)) + 0.035 * Math.max(0, t - T.spin[1]) - 0.035 * Math.max(0, t - T.back[1])

function orb(x, px, py, r, color, a, halo = 3.6) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.55 * a)); g.addColorStop(0.3, rgba(color, 0.18 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.9))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
  drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.9))
  x.restore()
}
function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * TAU + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
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
const SPARK = ['#ffd98a', GOLD, PINK, '#c9a6ff', BLUE, '#fff3e0']

/** springy word-by-word type: `*word*` = accent, `|` = line break; `times` overrides per-word pop times; lastAt pops the last word big */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = null, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.12) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    const big = isLast && lastAt != null
    ws.push({ t: times ? times[n] : big ? lastAt : t0 + n * gap, big: big || (times && acc), e: el('span', style, box, w.replace(/\*/g, '')) })
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
const head = (root, text, t0, opts = {}) => popText(root, text, { top: 200, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...opts })
const sub = (root, text, t0, opts = {}) => popText(root, text, { top: 1540, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 72, ...opts })

// ── the map: neighbourhood pins (stylised positions; inside the Loop / out past the Beltway)
const P = (dx, dy) => ({ x: CX + dx, y: CY + dy })
export const LABELS = [
  // inside the Loop
  { name: 'the Heights', ...P(-80, -135), side: 'up' },
  { name: 'EaDo', ...P(118, -18), side: 'right' },
  { name: 'Midtown', ...P(-10, 66), side: 'left' },
  { name: 'Montrose', ...P(-140, 26), side: 'up' },
  { name: 'Third Ward', ...P(77, 92), side: 'down', key: 'B' },
  { name: 'Rice Village', ...P(-98, 158), side: 'down' },
  { name: 'Galleria', ...P(-190, -52), side: 'up' },
  // out past the Beltway
  { name: 'Katy', ...P(-372, 70), side: 'down', out: true },
  { name: 'Cypress', ...P(-238, -283), side: 'up', key: 'A', out: true },
  { name: 'Kingwood', ...P(250, -300), side: 'up', out: true },
  { name: 'Pearland', ...P(150, 345), side: 'down', out: true },
  { name: 'Sugar Land', ...P(-262, 278), side: 'down', out: true },
]
LABELS.forEach((l, i) => { l.ang = Math.atan2(l.y - CY, l.x - CX); l.r = Math.hypot(l.x - CX, l.y - CY); l.i = i })
const LBL_A = LABELS.find(l => l.key === 'A'), LBL_B = LABELS.find(l => l.key === 'B')
const labelT = i => T.labels0 + i * T.labelGap

// ring shields: plain shield, number, caption
const SHIELDS = [
  { ring: 0, ang: -38 * D2R, num: '610', cap: 'THE LOOP' },
  { ring: 1, ang: 16 * D2R, num: '8', cap: 'BELTWAY' },
  { ring: 2, ang: 118 * D2R, num: '99', cap: 'GRAND PKWY' },
]

// cars: a few per ring, opposite directions per ring
const CARS = (() => { const r = rng(7); const out = []; [4, 5, 6].forEach((n, ring) => { for (let i = 0; i < n; i++) out.push({ ring, ph: (i / n) * TAU + r() * 0.5, sp: (0.22 + r() * 0.08) * (ring % 2 ? -1 : 1) * (ring === 0 ? 1.25 : 1), col: [GOLD, BLUE, ROSE, PINK][Math.floor(r() * 4)] }) }); return out })()
const carBoost = t => 9 * ease.inOutCubic(prog(t, 7.2, 8.4))
const carAng = (c, t) => c.ph + c.sp * t + Math.sign(c.sp) * carBoost(t) * (1 + c.ring * 0.15)

// ── the two dots (A = pink, out past the Beltway; B = blue, inside the Loop)
const DOT_R_WHEEL = 262
const dotPos = (L, t) => polar(L.ang, lerp(L.r, DOT_R_WHEEL, morphAt(t)))

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "800 30px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '128px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const H0 = head(root, 'Inside the *Loop.* | Outside | the Beltway.', T.h0, { times: [T.h0, T.h0 + 0.07, T.loopWord, T.outside, T.beltway - 0.07, T.beltway], wobble: true })
  const S1 = sub(root, 'Same city. | Different *orbits.*', T.s1, { accentColor: BLUE })
  const H1 = head(root, 'Somewhere in | this *city…*', T.h1, { accentColor: GOLD })
  const S2 = sub(root, "…someone's sky | lines up with *yours.*", T.s2, { accentColor: PINK, lastAt: T.yours, wobble: true })
  const H2 = head(root, 'Align reads | *both* charts', T.h2, { accentColor: BLUE })
  const S3 = sub(root, 'before you ever meet.', T.s3)
  const H3 = head(root, 'Whatever side | of the *Loop* | you’re on…', T.h3, { gap: 0.09 })
  const TYPES = [[H0, T.aOut], [S1, T.aOut], [H1, T.bOut], [S2, T.bOut], [H2, T.cOut], [S3, T.cOut], [H3, T.dOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(300 + k, n, d)
  const B_RING = [0, 1, 2].map(i => B(i, 10, 110)), B_LBL = LABELS.map((_, i) => B(10 + i, 6, 60))
  const B_GLY = SIGNS.map((_, i) => B(30 + i, 6, 70)), B_DOT = [B(50, 10, 120), B(51, 10, 120)], B_LINE = B(52, 16, 200), B_MEET = B(53, 20, 300)

  // ── road rings (map style), fading as the morph takes over
  function drawRoads(t) {
    const m = morphAt(t), clr = 1 - ease.inCubic(prog(t, ...T.clear))
    const a = (1 - clamp(m * 1.4)) * clr
    if (a <= 0.01) return
    for (let i = 2; i >= 0; i--) {
      const d = ease.inOutCubic(prog(t, T.ring[i], T.ring[i] + T.ringDur))
      if (d <= 0) continue
      const r = ringR(i, t) * lerp(1, 0.6, ease.inCubic(prog(t, ...T.clear)))
      const a0 = -Math.PI / 2 + i * 0.9, a1 = a0 + TAU * d
      x.save(); x.globalAlpha = a
      // asphalt
      x.strokeStyle = 'rgba(16,12,36,0.88)'; x.lineWidth = 34; x.lineCap = 'round'
      x.beginPath(); x.arc(CX, CY, r, a0, a1); x.stroke()
      // glowing edges in the ring's colour
      glowStroke(x, RING_COL[i], 5, 18)
      for (const o of [-16, 16]) { x.beginPath(); x.arc(CX, CY, r + o, a0, a1); x.stroke() }
      // dashed centre line, marching
      x.shadowBlur = 0; x.strokeStyle = rgba(BONE, 0.75); x.lineWidth = 3; x.lineCap = 'butt'
      x.setLineDash([14, 18]); x.lineDashOffset = -t * 40 * (i % 2 ? -1 : 1)
      x.beginPath(); x.arc(CX, CY, r, a0, a1); x.stroke(); x.setLineDash([])
      x.restore()
      // the drawing head
      if (d > 0 && d < 1) { const p = polar(a1, r); orb(x, p.x, p.y, 12, RING_COL[i], 1, 3) }
      drawBurst(x, B_RING[i], polar(a0, r).x, polar(a0, r).y, t, T.ring[i] + T.ringDur, RING_COL[i], 0.6)
    }
  }

  // Buffalo Bayou: a wiggly blue line west → downtown → east
  function drawBayou(t) {
    const m = morphAt(t)
    const d = ease.inOutCubic(prog(t, T.bayou, T.bayou + 0.9)), a = (1 - clamp(m * 2)) * (1 - prog(t, T.clear[0], T.clear[0] + 0.2))
    if (d <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a * 0.85
    glowStroke(x, '#4fb3f0', 7, 14)
    x.beginPath()
    const N = 80
    for (let k = 0; k <= N * d; k++) {
      const u = k / N, px = lerp(CX - 445, CX + 445, u)
      const py = CY + 10 - 30 * Math.sin(u * Math.PI) + 14 * Math.sin(u * 19) + 8 * Math.sin(u * 41 + 1)
      k ? x.lineTo(px, py) : x.moveTo(px, py)
    }
    x.stroke(); x.restore()
  }

  // downtown: a little generic skyline silhouette in the middle of the Loop
  const TOWERS = [[-46, 50, 18], [-26, 78, 20], [-4, 104, 22], [20, 86, 18], [40, 62, 18], [56, 40, 14]]
  function drawDowntown(t) {
    const k = pop01(t, T.h0 + 0.15, 0.45) * (1 - clamp(morphAt(t) * 1.6)) * outScale(t, T.clear[0])
    if (k <= 0) return
    x.save(); x.translate(CX, CY - 4); x.scale(k, k)
    x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 24
    x.fillStyle = '#2a2050'
    for (const [dx, h, w] of TOWERS) { x.beginPath(); x.roundRect(dx - w / 2, -h, w, h, [4, 4, 0, 0]); x.fill() }
    x.shadowBlur = 0
    glowStroke(x, GOLD, 3.5, 12)
    for (const [dx, h, w] of TOWERS) { x.beginPath(); x.roundRect(dx - w / 2, -h, w, h, [4, 4, 0, 0]); x.stroke() }
    // lit windows
    x.fillStyle = rgba('#ffd98a', 0.9); x.shadowBlur = 0
    TOWERS.forEach(([dx, h, w], j) => { for (let yy = -h + 12; yy < -6; yy += 14) if ((yy * 7 + j * 3) % 3) x.fillRect(dx - 3, yy, 6, 5) })
    x.restore()
  }

  function shieldPath(w, h) {
    x.beginPath(); x.moveTo(-w / 2, -h / 2 + 8); x.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + 8, -h / 2)
    x.quadraticCurveTo(0, -h / 2 + 10, w / 2 - 8, -h / 2); x.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + 8)
    x.lineTo(w / 2, h * 0.05); x.quadraticCurveTo(w / 2, h * 0.38, 0, h / 2); x.quadraticCurveTo(-w / 2, h * 0.38, -w / 2, h * 0.05); x.closePath()
  }
  function drawShields(t) {
    SHIELDS.forEach((s, i) => {
      const t0 = T.ring[s.ring] + T.ringDur - 0.1
      const k = pop01(t, t0, 0.42, 2.4) * (1 - clamp(morphAt(t) * 2)) * outScale(t, T.clear[0] + 0.05 * i)
      if (k <= 0 || t < t0) return
      const r = ringR(s.ring, t), p = polar(s.ang, r)
      const wob = 7 * Math.sin((t - t0) * 12) * Math.exp(-(t - t0) * 3.5)
      x.save(); x.translate(p.x, p.y); x.rotate(wob * D2R); x.scale(k, k)
      const w = s.num.length > 2 ? 92 : 74, h = 84
      x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 18
      shieldPath(w, h); x.fillStyle = BONE; x.fill()
      x.shadowBlur = 0; glowStroke(x, RING_COL[s.ring], 6, 16); shieldPath(w, h); x.stroke()
      x.shadowBlur = 0; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `900 ${s.num.length > 2 ? 36 : 42}px ${INTER}`; x.fillText(s.num, 0, -4)
      // caption pill below
      x.font = `700 24px ${MONO}`; const cw = x.measureText(s.cap).width + 26
      x.fillStyle = 'rgba(14,10,32,0.9)'; x.beginPath(); x.roundRect(-cw / 2, h / 2 + 8, cw, 38, 19); x.fill()
      x.strokeStyle = RING_COL[s.ring]; x.lineWidth = 2.5; x.stroke()
      x.fillStyle = RING_COL[s.ring]; x.fillText(s.cap, 0, h / 2 + 28)
      x.restore()
    })
  }

  // a pin + a pill label; `hi` brightens it (the dots' neighbourhoods)
  function drawLabel(l, t, k, hi = 0) {
    if (k <= 0) return
    const r = radAt(l.r, t), p = polar(l.ang, r)
    const col = hi ? (l.key === 'A' ? PINK : BLUE) : l.out ? BLUE : GOLD
    x.save(); x.translate(p.x, p.y); x.scale(k, k); x.globalAlpha = clamp(k * 2)
    // pin
    x.fillStyle = col; x.shadowColor = rgba(col, 0.9); x.shadowBlur = 12
    x.beginPath(); x.arc(0, 0, 7, 0, TAU); x.fill(); x.shadowBlur = 0
    x.strokeStyle = BONE; x.lineWidth = 2.5; x.beginPath(); x.arc(0, 0, 11, 0, TAU); x.stroke()
    // pill
    x.font = `800 ${hi ? 34 : 29}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(l.name).width, pw = tw + 30, ph = hi ? 50 : 44
    const off = { up: [0, -40], down: [0, 40], right: [pw / 2 + 16, 0], left: [-pw / 2 - 16, 0] }[l.side]
    x.translate(off[0], off[1])
    x.fillStyle = 'rgba(14,10,32,0.9)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
    x.strokeStyle = rgba(col, hi ? 1 : 0.85); x.lineWidth = hi ? 4 : 2.5; x.shadowColor = rgba(col, 0.6); x.shadowBlur = hi ? 16 : 8; x.stroke(); x.shadowBlur = 0
    x.fillStyle = hi ? '#fffaf0' : BONE; x.fillText(l.name, 0, 2)
    x.restore()
  }
  function drawLabels(t) {
    LABELS.forEach((l, i) => {
      const t0 = labelT(i)
      if (t < t0) return
      // first appearance: until the morph; second appearance (only A and B bright, the rest faint) after the morph back
      const k1 = pop01(t, t0, 0.34, 2.2) * outScale(t, T.morph[0] - 0.15 + i * 0.025, 0.28)
      if (k1 > 0) { drawLabel(l, t, k1); drawBurst(x, B_LBL[i], polar(l.ang, l.r).x, polar(l.ang, l.r).y, t, t0, l.out ? BLUE : GOLD, 0.5) }
      const t2 = T.relabel + (l.key ? 0.25 : 0.03 * i)
      if (t >= t2) {
        const k2 = pop01(t, t2, 0.36, 2.2) * outScale(t, T.clear[0] + 0.02 * i, 0.26) * (l.key ? 1 : 0.5)
        drawLabel(l, t, l.key ? k2 : k2 * 1.6, l.key ? 1 : 0)
      }
    })
  }

  function drawCars(t) {
    const vis = t < 12 ? clamp((t - T.cars) / 0.4) * (1 - prog(t, 8.0, 8.5)) : prog(t, T.back[1] - 0.3, T.back[1] + 0.2) * (1 - prog(t, T.clear[0], T.clear[0] + 0.3))
    if (vis <= 0) return
    for (const c of CARS) {
      const r = ringR(c.ring, t) + (Math.sign(c.sp) > 0 ? 7 : -7)
      const a = carAng(c, t), aPrev = carAng(c, t - 0.06)
      // speed trail during the spin-up
      const da = a - aPrev
      if (Math.abs(da) > 0.03) {
        x.save(); x.globalAlpha = vis * clamp(Math.abs(da) * 4); glowStroke(x, c.col, 7, 14)
        x.beginPath(); x.arc(CX, CY, r, Math.min(a, a - da * 4), Math.max(a, a - da * 4)); x.stroke(); x.restore()
      }
      const p = polar(a, r)
      x.save(); x.translate(p.x, p.y); x.rotate(a + Math.PI / 2 * Math.sign(c.sp)); x.globalAlpha = vis
      x.fillStyle = c.col; x.shadowColor = rgba(c.col, 0.9); x.shadowBlur = 12
      x.beginPath(); x.roundRect(-15, -8, 30, 16, 7); x.fill()
      x.shadowBlur = 0; x.fillStyle = 'rgba(16,12,36,0.7)'; x.fillRect(-2, -6, 8, 12)
      x.fillStyle = '#fffaf0'; x.beginPath(); x.arc(14, -4, 2.6, 0, TAU); x.arc(14, 4, 2.6, 0, TAU); x.fill()
      x.restore()
    }
  }

  // ── the wheel (the morphed rings): sign washes in the band, spokes, glyphs
  function drawWheel(t) {
    const m = clamp(morphAt(t)), dim = 1 - 0.42 * prog(t, T.dotA - 0.2, T.dotA + 0.4) + 0.42 * prog(t, T.back[0] - 0.2, T.back[0] + 0.2)
    if (m <= 0.02) return
    const sp = spinAt(t), r0 = ringR(0, t), r1 = ringR(1, t), r2 = ringR(2, t)
    const A = clamp((m - 0.25) / 0.6) * dim
    x.save()
    // band washes
    SIGNS.forEach((s, i) => {
      const a0 = Math.PI - (i * 30) * D2R + sp, a1 = Math.PI - (i * 30 + 30) * D2R + sp
      x.globalAlpha = 0.26 * A; x.fillStyle = s.color
      x.beginPath(); x.arc(CX, CY, r2, a1, a0); x.arc(CX, CY, r1, a0, a1, true); x.closePath(); x.fill()
    })
    // rings (inherit the road colours, warming to bone)
    ;[r0, r1, r2].forEach((r, i) => {
      x.globalAlpha = clamp(m * 1.2) * dim; glowStroke(x, i === 0 ? GOLD : BONE, i === 0 ? 3 : 4.5, 18)
      if (i === 0) x.setLineDash([6, 12])
      x.beginPath(); x.arc(CX, CY, r, 0, TAU); x.stroke(); x.setLineDash([])
    })
    // spokes grow outward
    const sk = ease.outCubic(prog(t, ...T.spokes))
    if (sk > 0) {
      x.globalAlpha = A; glowStroke(x, BONE, 3.5, 10)
      for (let i = 0; i < 12; i++) {
        const a = Math.PI - i * 30 * D2R + sp, c = Math.cos(a), s = Math.sin(a)
        x.beginPath(); x.moveTo(CX + c * r1, CY + s * r1); x.lineTo(CX + c * lerp(r1, r2, sk), CY + s * lerp(r1, r2, sk)); x.stroke()
      }
    }
    x.restore()
    // glyphs pop one by one
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const t0 = T.glyph0 + i * T.glyphGap
      const k = pop01(t, t0, 0.36, 2.6) * clamp(m * 1.5) * dim
      if (k <= 0) return
      const a = Math.PI - (i * 30 + 15) * D2R + sp, rr = (r1 + r2) / 2
      const px = CX + Math.cos(a) * rr, py = CY + Math.sin(a) * rr
      x.save(); x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.shadowColor = s.color; x.shadowBlur = 20; x.fillStyle = s.color; x.font = `bold 62px ${GLYPH_FONT}`
      x.fillText(s.glyph + VS, 0, 0); x.restore()
      if (t < t0 + 1) drawBurst(x, B_GLY[i], px, py, t, t0, s.color, 0.5)
    })
    x.restore()
    // the hub: downtown collapses into a pulsing gold star
    const hk = pop01(t, T.morph[0] + 0.7, 0.4, 2.4) * clamp(m) * dim
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); drawPixelStar(x, CX, CY, Math.round(30 * hk * (1 + 0.08 * Math.sin(t * 5))), 1, GOLD); x.restore() }
  }

  // a small natal chart blooming around a dot
  function miniChart(px, py, k, t, lit, seedRot) {
    if (k <= 0) return
    const rIn = 62, rOut = 104, sp = seedRot + t * 0.5
    x.save()
    SIGNS.forEach((s, i) => {
      const kk = clamp(k * 1.4 - i * 0.03)
      if (kk <= 0) return
      const a0 = sp + i * 30 * D2R + 0.03, a1 = sp + (i + 1) * 30 * D2R - 0.03, mid = (rIn + rOut) / 2, half = (rOut - rIn) / 2 * kk
      const L = i === lit ? 0.6 + 0.4 * Math.sin(t * 6) : 0
      x.globalAlpha = clamp(kk * 2)
      x.beginPath(); x.arc(px, py, mid + half, a0, a1); x.arc(px, py, mid - half, a1, a0, true); x.closePath()
      x.fillStyle = rgba(s.color, 0.35 + 0.5 * L); x.fill()
      glowStroke(x, i === lit ? s.color : BONE, i === lit ? 4 : 2, 8 + 16 * L); x.stroke()
      x.shadowBlur = 0
      const g = { x: px + Math.cos((a0 + a1) / 2) * mid, y: py + Math.sin((a0 + a1) / 2) * mid }
      x.fillStyle = i === lit ? '#fffaf0' : s.color; x.font = `bold ${i === lit ? 30 : 24}px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(s.glyph + VS, g.x, g.y)
    })
    x.restore()
  }

  function drawDots(t) {
    if (t < T.dotA) return
    const clr = T.meet
    const pa0 = dotPos(LBL_A, t), pb0 = dotPos(LBL_B, t)
    // the meet: both slide along the gold line to the middle
    const mt = ease.inOutCubic(prog(t, ...clr)), mid = { x: (pa0.x + pb0.x) / 2, y: (pa0.y + pb0.y) / 2 }
    const pa = { x: lerp(pa0.x, mid.x, mt), y: lerp(pa0.y, mid.y, mt) }, pb = { x: lerp(pb0.x, mid.x, mt), y: lerp(pb0.y, mid.y, mt) }
    const gone = prog(t, clr[1] - 0.02, clr[1] + 0.05)
    // mini charts around the dots
    const ck = (i) => ease.outCubic(prog(t, T.charts[i], T.charts[i] + 0.5)) * (1 - ease.inCubic(prog(t, T.back[0], T.back[0] + 0.45)))
    miniChart(pa.x, pa.y, ck(0), t, 4, 0.4)
    miniChart(pb.x, pb.y, ck(1), t, 8, 2.1)
    // the gold line
    const lk = ease.inOutCubic(prog(t, ...T.line))
    if (lk > 0 && gone < 1) {
      x.save(); glowStroke(x, GOLD, 7 + 3 * prog(t, T.yours, T.yours + 0.2) * (1 - prog(t, T.yours + 0.2, T.yours + 0.8)), 24)
      x.beginPath(); x.moveTo(pa.x, pa.y); x.lineTo(lerp(pa.x, pb.x, lk), lerp(pa.y, pb.y, lk)); x.stroke()
      x.restore()
      if (lk < 1) orb(x, lerp(pa.x, pb.x, lk), lerp(pa.y, pb.y, lk), 10, GOLD, 1, 3)
      // light pulses running both ways once connected
      if (lk >= 1 && t < clr[0]) for (let j = 0; j < 2; j++) {
        const u = ((t - T.yours) * 0.55 + j * 0.5) % 1, uu = j ? 1 - u : u
        const q = { x: lerp(pa.x, pb.x, uu), y: lerp(pa.y, pb.y, uu) }
        x.save(); x.globalAlpha = Math.sin(Math.PI * u); drawPixelStar(x, Math.round(q.x), Math.round(q.y), 18, 0, '#fff3e0'); x.restore()
      }
      drawBurst(x, B_LINE, (pa.x + pb.x) / 2, (pa.y + pb.y) / 2, t, T.yours, SPARK, 0.9)
    }
    if (gone >= 1) { drawBurst(x, B_MEET, mid.x, mid.y, t, clr[1], SPARK, 0.9); return }
    // the dots themselves, with ripples
    ;[[pa, PINK, T.dotA, 0], [pb, BLUE, T.dotB, 1]].forEach(([p, col, t0, j]) => {
      if (t < t0) return
      const k = pop01(t, t0, 0.42, 2.4)
      for (let w = 0; w < 2; w++) {
        const u = ((t - t0) * 0.7 + w * 0.5) % 1
        x.save(); x.globalAlpha = (1 - u) * 0.7 * clamp(k); glowStroke(x, col, 3, 10)
        x.beginPath(); x.arc(p.x, p.y, 18 + 50 * u, 0, TAU); x.stroke(); x.restore()
      }
      orb(x, p.x, p.y, 22 * k * (1 + 0.06 * Math.sin(t * 5 + j)), col, clamp(k * 2), 3.4)
      drawBurst(x, B_DOT[j], p.x, p.y, t, t0, col, 0.6)
    })
    // flash at the meet
    const fl = prog(t, clr[1] - 0.12, clr[1])
    if (fl > 0) orb(x, mid.x, mid.y, 34 * ease.outCubic(fl), GOLD, 1 - gone, 5)
  }

  return {
    start: START, end: END, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.settle) { drawBayou(t); drawRoads(t); drawWheel(t); drawDowntown(t); drawCars(t); drawShields(t); drawLabels(t); drawDots(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.45)))
      const ep = ease.outCubic(prog(t, T.eye, T.eye + 0.35))
      eyebrow.style.opacity = String(ep * outK(t, T.aOut)); eyebrow.style.transform = `translateY(${((1 - ep) * 16).toFixed(2)}px)`
      for (const [h, o] of TYPES) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound (108 bpm grid)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', T.h0, 740, 0.03, -0.15], ['pop', T.h0 + 0.07, 880, 0.03, 0.15],
  ['pluck', T.loopWord, 1174.66, 0.05, 0.6, 0], ['pop', T.loopWord, 1318.51, 0.05, 0],
  ['pop', T.outside, 740, 0.035, -0.2], ['pop', T.beltway - 0.07, 880, 0.03, 0.2], ['pluck', T.beltway, 987.77, 0.045, 0.5, 0.1],
  ...T.ring.map((tr, i) => ['whoosh', r3(tr), T.ringDur, 0.03]),
  ...T.ring.map((tr, i) => ['pop', r3(tr + T.ringDur - 0.1), [587.33, 739.99, 880][i], 0.055, (i - 1) * 0.3]),
  ['whoosh', T.bayou, 0.8, 0.02],
  ...LABELS.map((l, i) => ['pop', r3(labelT(i)), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1174.66, 1318.51, 1396.91][i], 0.026, (i % 2 ? 0.25 : -0.25)]),
  ...wordPops(T.s1, 4, 0.06, 2, 0.025),
  // the spin + morph
  ['whoosh', 7.25, 0.5, 0.035], ['riser', 7.3, 8.5, 0.022], ['whoosh', T.morph[0] + 0.2, 1.0, 0.04],
  ['boom', 8.55, 0.05],
  ...SIGNS.map((_, i) => ['pop', r3(T.glyph0 + i * T.glyphGap), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22, 1760, 1975.53][i], 0.022, (i % 2 ? 0.2 : -0.2)]),
  ['glitter', T.glyph0, T.glyph0 + 0.9],
  ...wordPops(T.h1, 4, 0.07, 1),
  ['pop', T.dotA, 880, 0.06, -0.4], ['pop', T.dotB, 1174.66, 0.06, 0.4],
  ...wordPops(T.s2, 5, 0.06, 3, 0.022),
  ['whoosh', T.line[0], T.line[1] - T.line[0], 0.035],
  ['pluck', T.yours, 880, 0.055, 0.8, 0], ['pop', T.yours, 1318.51, 0.06, 0], ['bell', T.yours + 0.02, 1760, 0.03, 1.6, 0], ['glitter', T.yours, T.yours + 0.9],
  ...wordPops(T.h2, 4, 0.07, 0),
  ['glitter', T.charts[0], T.charts[0] + 0.5], ['pop', T.charts[0], 987.77, 0.045, -0.4], ['glitter', T.charts[1], T.charts[1] + 0.5], ['pop', T.charts[1], 1318.51, 0.045, 0.4],
  ...wordPops(T.s3, 4, 0.06, 2, 0.022),
  // back to the map
  ['whoosh', T.back[0], 0.9, 0.04],
  ['pop', T.relabel + 0.25, 880, 0.05, -0.4], ['pop', T.relabel + 0.25, 1174.66, 0.04, 0.4],
  ...wordPops(T.h3, 7, 0.09, 1),
  // meet in the middle
  ['whoosh', T.meet[0], 0.6, 0.04], ['pop', T.meet[1], 1318.51, 0.06, 0], ['bell', T.meet[1] + 0.02, 1174.66, 0.035, 2.0, 0], ['glitter', T.meet[1], T.meet[1] + 0.8],
]
