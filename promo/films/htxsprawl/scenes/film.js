// htxsprawl (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.00   HOOK  "Houston is | *huge.*" — a city map grows tile by tile around a pin-person ("YOU"), ring roads
//               (610, Beltway 8, Grand Parkway) draw on, neighbourhood chips pop; on the drop (2.82) the camera zooms
//               way out ("It just keeps *going.*"), new suburbs pop at the edges, the pin-person ends up tiny
//   5.20–10.80  "So how do you find | *your* person | in all this?" — a magnifying glass scans the sprawl: three
//               stops, three crowds of identical pictograms, a "?" each time
//  11.20–15.30  "Align reads | your *sky.*" — the camera slides; the city's lights float up and become stars, the
//               stars gather into two zodiac charts that bloom on the map, far apart: yours and someone's
//  15.45–20.75  "…and finds who | *lines up* with it." — a glowing gold arc launches from your chart across the
//               sprawl and lands in theirs; light pulses run along it
//  21.00–25.30  "Somewhere out there, | *someone's sky* | lines up with yours." — the camera pulls out, the map
//               dissolves, the two charts shrink to a gold-linked pair of stars, then fade
//  25.35–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, ROSE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb, person, pin, magnifier, shield, chip } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const hop = (t, a, h = 1) => t > a && t < a + 0.45 ? h * Math.sin(Math.PI * (t - a) / 0.45) : 0

// ── beats
export const T = {
  // hook
  eye: 0.08, h0: 0.12, huge: BEAT(0), drop: BEAT(4), sub0: BEAT(4) + 0.12, still1: BEAT(5), still2: BEAT(6.5), h0Out: 4.85,
  inner: [1.15, 1.4, 1.65, 1.9, 2.15], outer: [3.55, 3.7, 3.85, 4.0, 4.15, 4.3, 4.45, 4.6], labelsOut: 5.3,
  // search
  h1: 5.2, h1Your: BEAT(10), h1End: BEAT(11), stops: [BEAT(12), BEAT(14), BEAT(16)], lensIn: 6.55, lensOut: [10.0, 10.75], h1Out: 10.65,
  // sky
  pan: [10.5, 11.7], h2: 11.15, sky: BEAT(20), lift: [11.05, 12.0], wA: BEAT(22), wB: BEAT(23), h2Out: 15.2,
  // lines up
  h3: 15.45, linesUp: BEAT(28), arc: [BEAT(29.5), BEAT(31)], h3Out: 20.75,
  // somewhere out there
  h4: 21.0, h4Sky: BEAT(38), h4Lines: BEAT(39), zoom4: [21.0, 24.8], twinkle: 24.3, h4Out: 24.95, pairOut: [24.75, 25.3],
}

// ── the map: world units, one tile = TS
const TS = 180, BLOCK = 150
const AX0 = 540, AY0 = 1110
const camZ = t => {
  if (t < T.drop) return lerp(1.3, 0.85, ease.inOutQuad(prog(t, 0.2, T.drop)))
  if (t < 4.75) return Math.exp(lerp(Math.log(0.85), Math.log(0.245), ease.inOutCubic(prog(t, T.drop, 4.75))))
  if (t < T.zoom4[0]) return lerp(0.245, 0.24, prog(t, 4.75, 10.5))
  return Math.exp(lerp(Math.log(0.24), Math.log(0.05), ease.inOutCubic(prog(t, ...T.zoom4))))
}
// after the pan: you (world 0,0) sit at screen A, them at screen B; M is the midpoint, kept at the anchor
const ZP = 0.24
const SA = { x: 280, y: 860 }, SB = { x: 800, y: 1330 }
const MW = { x: (AX0 - SA.x) / ZP, y: (AY0 - SA.y) / ZP }
const BW = { x: 2 * MW.x, y: 2 * MW.y }
const CW = { x: MW.x + (930 - AX0) / ZP, y: MW.y + (600 - AY0) / ZP }      // the arc's control point
function cam(t) {
  const p = ease.inOutCubic(prog(t, ...T.pan)), q = ease.inOutCubic(prog(t, ...T.zoom4))
  return { z: camZ(t), fx: MW.x * p, fy: MW.y * p, ax: AX0, ay: lerp(AY0, 960, q) }
}
const scr = (c, wx, wy) => ({ x: c.ax + (wx - c.fx) * c.z, y: c.ay + (wy - c.fy) * c.z })

// sprawl radius (tiles) over time; a tile appears when the radius passes it
const RAD = t => 0.55 + 2.9 * ease.outCubic(prog(t, 0.15, 2.6)) + 15 * ease.inOutCubic(prog(t, 2.75, 5.0))
const KINDS = ['houses', 'houses', 'houses', 'tower', 'park', 'lot', 'houses', 'tower']
const TILES = (() => {
  const r = rng(11), out = []
  for (let j = -14; j <= 18; j++) for (let i = -16; i <= 20; i++) {
    const d = Math.hypot(i, j) + (i || j ? r() * 0.9 : 0)
    let tA = 99
    for (let s = 0; s <= 1500; s++) { const tt = s / 250; if (RAD(tt) >= d) { tA = tt; break } }
    const kind = (i === 0 && j === 0) ? 'tower' : KINDS[Math.floor(r() * KINDS.length)]
    const lights = []
    const nL = kind === 'park' ? 1 : 2
    for (let k = 0; k < nL; k++) lights.push({ dx: (r() - 0.5) * 120, dy: (r() - 0.5) * 120, col: r() < 0.7 ? '#ffd98a' : r() < 0.6 ? BLUE : PINK, seed: r() * 100, tl: r(), up: r(), drift: r() - 0.5, kind: Math.floor(r() * 3), sz: r() })
    out.push({ i, j, tA, kind, tint: r(), lights, rot: Math.floor(r() * 4) })
  }
  return out
})()
// highways (radials) and ring roads
const HWY = [Math.PI, 0, -Math.PI / 2 - 0.22, 0.62, -2.35, 2.6, -0.98, Math.PI / 2 + 0.06]
const RINGS = [{ r: 2.6, col: GOLD, label: '610', ang: 0.62 + 0.38 }, { r: 6.3, col: BLUE, label: '8', ang: 2.25 }, { r: 11.3, col: ROSE, label: '99', ang: -0.55 }]
const bayouY = x => 52 * Math.sin(x / 260) + 26 * Math.sin(x / 97 + 1) - 120

// neighbourhood chips (tile coords, roughly where they sit relative to downtown)
const INNER = [['THE HEIGHTS', -1.2, -2.2], ['EADO', 1.9, 0.25], ['MONTROSE', -1.9, 1.15], ['THIRD WARD', 1.45, 2.2], ['MIDTOWN', 0.15, 1.35]]
const OUTER = [['KATY', -9.6, -0.6], ['THE WOODLANDS', -0.6, -8.2], ['SUGAR LAND', -6.6, 4.6], ['KINGWOOD', 6.2, -6.4], ['PEARLAND', 1.6, 6.6], ['CYPRESS', -7.4, -5.0], ['CLEAR LAKE', 7.4, 5.4], ['GALLERIA', -3.4, 0.7]]

// ── the lens
const STOPS = [{ x: 300, y: 1210 }, { x: 780, y: 930 }, { x: 430, y: 820 }]
const LENS_IN = { x: 1350, y: 1350 }, LENS_OUT = { x: -380, y: 1500 }
const CROWD = [[LAV, BLUE, ROSE], [GOLD, LAV, BLUE], [ROSE, GOLD, LAV]]
function lensPos(t) {
  const legs = [[LENS_IN, STOPS[0], T.lensIn, T.stops[0]], [STOPS[0], STOPS[1], T.stops[0] + 0.5, T.stops[1]], [STOPS[1], STOPS[2], T.stops[1] + 0.5, T.stops[2]], [STOPS[2], LENS_OUT, ...T.lensOut]]
  for (const [a, b, t0, t1] of legs) {
    if (t <= t1) { const p = ease.inOutCubic(prog(t, t0, t1)); return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p) - Math.sin(Math.PI * p) * 90 } }
  }
  return LENS_OUT
}

// ── the charts
const WS = 0.43   // wheel scale (rOut 460 → ≈198 px)
const WHEEL0 = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.95 }
const FORM = (() => {   // stars that fly in to build each wheel
  const r = rng(5), out = []
  for (const [w, tW] of [[0, T.wA], [1, T.wB]]) for (let k = 0; k < 24; k++) {
    const ang = (k / 24) * TAU, rad = k % 2 ? 368 : 460
    const sa = r() * TAU, sd = 140 + r() * 260
    out.push({ w, tW, tx: Math.cos(ang) * rad, ty: Math.sin(ang) * rad, sx: Math.cos(sa) * sd, sy: Math.sin(sa) * sd - 180, t0: tW - 0.62 + r() * 0.12, kind: Math.floor(r() * 3), col: [GOLD, PINK, BLUE, '#fff3e0'][k % 4] })
  }
  return out
})()
const PLANETS = [[{ a: 0.4, c: GOLD }, { a: 2.5, c: '#e3ecff' }, { a: 4.3, c: PINK }], [{ a: 1.2, c: GOLD }, { a: 3.4, c: '#e3ecff' }, { a: 5.2, c: BLUE }]]

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  `times` gives each word's time (else at + n·gap); `big` lists word indices that pop large (with optional wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02, boost = null, plainAccent = false }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (acc && plainAccent) Object.assign(style, { fontFamily: INTER, fontStyle: 'normal', fontWeight: 800, letterSpacing: '-0.03em' })
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        let sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        if (w.big && boost) sc *= boost(t)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const mapC = document.createElement('canvas'); mapC.width = W; mapC.height = H
  const m = mapC.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const hugeBoost = t => 1 + 0.16 * Math.exp(-Math.max(0, t - T.drop) * 5) * Math.sin(Math.max(0, t - T.drop) * 16) + 0.06 * ease.outCubic(prog(t, T.drop, T.drop + 0.4))
  const H0 = popText(root, 'Houston is | *huge.*', { top: 200, size: 124, accentSize: 250, times: [T.h0, T.h0 + 0.1, T.huge], big: [2], wobble: true, accentColor: PINK, lineHeight: 0.95, boost: hugeBoost, plainAccent: true })
  const S0 = popText(root, 'It just keeps *going.*', { top: TYPE.subY + 40, size: 66, weight: 700, accentSize: 80, at: T.sub0, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'So how do you find | *your* person | in all this?', { top: 200, size: 92, accentSize: 132, accentColor: GOLD,
    times: [T.h1, T.h1 + 0.08, T.h1 + 0.16, T.h1 + 0.24, T.h1 + 0.32, T.h1Your, T.h1Your + 0.1, T.h1End, T.h1End + 0.08, T.h1End + 0.16], big: [5], wobble: true })
  const H2 = popText(root, 'Align reads | your *sky.*', { top: 205, size: 120, accentSize: 190, accentColor: BLUE, times: [T.h2, T.h2 + 0.1, T.h2 + 0.2, T.sky], big: [3], wobble: true, lineHeight: 0.98 })
  const H3 = popText(root, '…and finds who | *lines_up* with it.', { top: 205, size: 100, accentSize: 150, accentColor: GOLD,
    times: [T.h3, T.h3 + 0.08, T.h3 + 0.16, T.linesUp, T.linesUp + 0.3, T.linesUp + 0.38], big: [3], wobble: true, lineHeight: 1.0 })
  const H4 = popText(root, 'Somewhere out there, | *someone’s_sky* | lines up with yours.', { top: 200, size: 82, accentSize: 132, accentColor: PINK,
    times: [T.h4, T.h4 + 0.08, T.h4 + 0.16, T.h4Sky, T.h4Lines, T.h4Lines + 0.08, T.h4Lines + 0.16, T.h4Lines + 0.24], big: [3], wobble: true, lineHeight: 1.06 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the map band mask (fades out behind the headline and at the bottom)
  const MASK = [[560, 0], [740, 1], [1520, 1], [1770, 0]]
  const maskAt = y => y <= MASK[0][0] ? 0 : y >= MASK[3][0] ? 0 : y < MASK[1][0] ? (y - MASK[0][0]) / (MASK[1][0] - MASK[0][0]) : y <= MASK[2][0] ? 1 : 1 - (y - MASK[2][0]) / (MASK[3][0] - MASK[2][0])
  const lightLift = (L, t) => ease.inOutCubic(prog(t, T.lift[0] + L.up * 0.75, T.lift[0] + L.up * 0.75 + 1.3))

  // ── the map (drawn into mapC, masked, then composited)
  function drawMap(t, c, mapA) {
    m.setTransform(1, 0, 0, 1, 0, 0); m.globalAlpha = 1; m.globalCompositeOperation = 'source-over'
    m.clearRect(0, 0, W, H)
    const z = c.z, ts = TS * z, detail = ts > 70
    const R = RAD(t)
    // streets: a faint grid glow under the tiles (only inside the sprawl)
    // tiles
    for (const tl of TILES) {
      if (t < tl.tA) continue
      const p = scr(c, tl.i * TS, tl.j * TS)
      if (p.x < -ts || p.x > W + ts || p.y < MASK[0][0] - ts || p.y > MASK[3][0] + ts) continue
      const k = easeOutBack(prog(t, tl.tA, tl.tA + 0.34), 2.2)
      const b = BLOCK * z * k
      if (b < 1) continue
      m.save(); m.translate(p.x, p.y)
      m.beginPath(); m.roundRect(-b / 2, -b / 2, b, b, Math.max(2, 14 * z * k))
      m.fillStyle = tl.kind === 'park' ? 'rgba(40,70,60,0.85)' : tl.tint < 0.5 ? 'rgba(30,22,66,0.92)' : 'rgba(24,26,70,0.92)'; m.fill()
      m.strokeStyle = tl.kind === 'park' ? 'rgba(110,220,160,0.75)' : rgba(tl.tint < 0.5 ? VIOLET : '#7f8fe0', 0.85); m.lineWidth = Math.max(1.2, 4 * z); m.stroke()
      if (detail) {
        const u = z * k, lw = Math.max(1.2, 3.5 * z)
        m.lineWidth = lw
        if (tl.kind === 'houses') {
          for (const [hx, hy] of [[-34, -34], [34, -34], [-34, 34], [34, 34]]) {
            m.beginPath(); m.roundRect((hx - 22) * u, (hy - 22) * u, 44 * u, 44 * u, 5 * u)
            m.fillStyle = 'rgba(201,166,255,0.22)'; m.fill(); m.strokeStyle = rgba(LAV, 0.8); m.stroke()
            m.beginPath(); m.moveTo((hx - 22) * u, hy * u); m.lineTo((hx + 22) * u, hy * u); m.stroke()
          }
        } else if (tl.kind === 'tower') {
          m.beginPath(); m.roundRect(-52 * u, -52 * u, 104 * u, 104 * u, 6 * u); m.fillStyle = 'rgba(143,216,246,0.14)'; m.fill(); m.strokeStyle = rgba(BLUE, 0.8); m.stroke()
          m.beginPath(); m.roundRect(-28 * u, -28 * u, 56 * u, 56 * u, 4 * u); m.stroke()
        } else if (tl.kind === 'park') {
          for (const [hx, hy, rr] of [[-30, -24, 26], [30, -10, 32], [-8, 36, 22]]) { m.beginPath(); m.arc(hx * u, hy * u, rr * u, 0, TAU); m.fillStyle = 'rgba(110,220,160,0.3)'; m.fill(); m.strokeStyle = 'rgba(130,235,175,0.85)'; m.stroke() }
        } else {
          m.strokeStyle = rgba(BONE, 0.45)
          for (let s = -2; s <= 2; s++) { m.beginPath(); m.moveTo(s * 24 * u, -50 * u); m.lineTo(s * 24 * u, -10 * u); m.moveTo(s * 24 * u, 10 * u); m.lineTo(s * 24 * u, 50 * u); m.stroke() }
        }
      }
      m.restore()
      // window / street lights (until they float up)
      for (const L of tl.lights) {
        if (lightLift(L, t) > 0) continue
        const lx = p.x + L.dx * z * k, ly = p.y + L.dy * z * k
        const tw = 0.55 + 0.45 * noise1(t * 1.3 + L.seed, L.seed)
        const s = Math.max(3, 9 * z)
        m.fillStyle = rgba(L.col, 0.25 * tw * k); m.fillRect(lx - s, ly - s, 2 * s, 2 * s)
        m.fillStyle = rgba(L.col, tw * clamp(k)); m.fillRect(lx - s / 2.5, ly - s / 2.5, s / 1.25, s / 1.25)
      }
    }
    // Buffalo Bayou (a winding blue line through the middle)
    const span = Math.min(R, 20) * TS
    if (span > 60) {
      m.beginPath()
      for (let wx = -span; wx <= span; wx += 30) { const p = scr(c, wx, bayouY(wx)); wx === -span ? m.moveTo(p.x, p.y) : m.lineTo(p.x, p.y) }
      m.lineCap = 'round'; m.lineJoin = 'round'; m.shadowColor = '#6aa8ff'; m.shadowBlur = 14
      m.strokeStyle = 'rgba(106,168,255,0.85)'; m.lineWidth = clamp(22 * z, 3, 13); m.stroke(); m.shadowBlur = 0
    }
    // freeways: radials out to the sprawl's edge, with car lights
    const o = scr(c, 0, 0)
    HWY.forEach((a, hi) => {
      const len = Math.max(0, R - 0.8) * TS
      if (len <= 0) return
      const e = scr(c, Math.cos(a) * len, Math.sin(a) * len)
      const s0 = scr(c, Math.cos(a) * 0.62 * TS, Math.sin(a) * 0.62 * TS)
      m.beginPath(); m.moveTo(s0.x, s0.y); m.lineTo(e.x, e.y)
      m.lineCap = 'round'; m.shadowColor = AMBER; m.shadowBlur = 12; m.strokeStyle = rgba(AMBER, 0.85); m.lineWidth = clamp(20 * z, 3, 13); m.stroke(); m.shadowBlur = 0
      m.strokeStyle = 'rgba(20,12,40,0.8)'; m.lineWidth = Math.max(1, 5 * z); m.setLineDash([Math.max(4, 26 * z), Math.max(4, 26 * z)]); m.stroke(); m.setLineDash([])
      for (let k = 0; k < 7; k++) {
        const u = 0.62 * TS + ((t * (0.05 + 0.01 * (hi % 3)) + k / 7 + hi * 0.13) % 1) * Math.max(0, len - 0.62 * TS)
        const cp = scr(c, Math.cos(a) * u, Math.sin(a) * u), s = Math.max(2.5, 9 * z)
        m.fillStyle = k % 2 ? '#ff5a5a' : '#fff3e0'; m.fillRect(cp.x - s / 2, cp.y - s / 2, s, s)
      }
    })
    // ring roads draw on as the sprawl reaches them
    RINGS.forEach((rg, ri) => {
      const t0 = (() => { for (let s = 0; s <= 1500; s++) if (RAD(s / 250) >= rg.r + 0.4) return s / 250; return 99 })()
      const p = ease.inOutCubic(prog(t, t0, t0 + 0.7))
      if (p <= 0) return
      m.beginPath(); m.arc(o.x, o.y, rg.r * TS * z, rg.ang - Math.PI * p, rg.ang + Math.PI * p)
      m.lineCap = 'round'; m.shadowColor = rg.col; m.shadowBlur = 16; m.strokeStyle = rgba(rg.col, 0.95); m.lineWidth = Math.max(3.5, 20 * z); m.stroke(); m.shadowBlur = 0
    })
    // mask
    m.globalCompositeOperation = 'destination-in'
    const g = m.createLinearGradient(0, 0, 0, H)
    MASK.forEach(([y, a]) => g.addColorStop(y / H, `rgba(0,0,0,${a})`))
    m.fillStyle = g; m.fillRect(0, 0, W, H)
    m.globalCompositeOperation = 'source-over'
    // composite: a soft glow pass, then the crisp map
    x.save()
    x.globalAlpha = 0.5 * mapA; x.globalCompositeOperation = 'lighter'; x.filter = 'blur(7px)'; x.drawImage(mapC, 0, 0)
    x.filter = 'none'; x.globalCompositeOperation = 'source-over'; x.globalAlpha = mapA; x.drawImage(mapC, 0, 0)
    x.restore()
    // freeway shields (screen-size), once the ring is drawn
    RINGS.forEach((rg, ri) => {
      const t0 = (() => { for (let s = 0; s <= 1500; s++) if (RAD(s / 250) >= rg.r + 0.4) return s / 250; return 99 })()
      const k = pop01(t, t0 + 0.45, 0.4, 2.2)
      if (k <= 0) return
      const rr = rg.r * TS * c.z, sx = o.x + Math.cos(rg.ang) * rr, sy = o.y + Math.sin(rg.ang) * rr
      shield(x, sx, sy, 58 * k, rg.label, rg.col, mapA * maskAt(sy) * outK(t, T.h1Out, 0.4))
    })
  }

  // ── the floating lights → stars
  function drawRising(t, c) {
    if (t < T.lift[0] || t > T.zoom4[0] + 1.2) return
    const fade = 1 - prog(t, T.zoom4[0], T.zoom4[0] + 1.1)
    for (const tl of TILES) {
      const p0 = scr(c, tl.i * TS, tl.j * TS)
      if (p0.x < -200 || p0.x > W + 200 || p0.y < 400 || p0.y > 1800) continue
      for (const L of tl.lights) {
        const l = lightLift(L, t)
        if (l <= 0) continue
        const lx = p0.x + L.dx * c.z + L.drift * 160 * l, ly = p0.y + L.dy * c.z - l * (260 + 760 * L.up)
        const tw = 0.55 + 0.45 * noise1(t * 2 + L.seed, L.seed)
        const a = lerp(maskAt(p0.y), 1, clamp(l * 2)) * tw * fade * (1 - 0.45 * prog(t, 13.5, 15))
        if (a <= 0.02) continue
        x.globalAlpha = a
        drawPixelStar(x, lx, ly, lerp(6, 10 + 12 * L.sz, l), L.kind, L.col)
      }
    }
    x.globalAlpha = 1
  }

  // ── the pin-person (you at world 0,0; them at BW)
  function pinPerson(px, py, s, body, pinCol, t, a = 1, sq = 1) {
    person(x, px, py, s, { body, a, sq, w: Math.max(5, 8 * Math.min(1, s * 2)) })
    pin(x, px, py - 300 * s * sq - 14 * s + 6 * Math.sin(t * 4) * s, 42 * s, pinCol, a)
  }
  const youScale = (t, c) => {
    const base = Math.max(0.17, c.z * 0.55)
    const grow = lerp(base, 0.3, ease.outCubic(prog(t, T.wA - 0.1, T.wA + 0.3)))
    return grow * (1 - ease.inCubic(prog(t, 21.3, 22.4)))
  }

  function drawPeople(t, c) {
    const A = scr(c, 0, 0), s = youScale(t, c)
    // ping rings when tiny
    if (t > 3.6 && t < 11.2) {
      const pa = prog(t, 3.6, 4.0) * outK(t, 10.9, 0.3)
      for (let k = 0; k < 2; k++) {
        const ph = ((t - BEAT(0) + k * 0.5556) % 1.1112) / 1.1112
        x.save(); x.globalAlpha = pa * (1 - ph) * 0.9; x.beginPath(); x.ellipse(A.x, A.y, 20 + 90 * ph, (20 + 90 * ph) * 0.45, 0, 0, TAU); ink(x, PINK, { w: 5, fa: 0, glow: 14 }); x.restore()
      }
    }
    const sq = 1 + 0.12 * Math.exp(-Math.max(0, t - T.drop) * 6) * Math.sin(Math.max(0, t - T.drop) * 20) * (t > T.drop ? 1 : 0)
    const hy = hop(t, T.arc[1] + 0.1, 40) + hop(t, T.wA, 24)
    const ka = pop01(t, 0.15, 0.45, 1.8)
    if (s > 0) pinPerson(A.x, A.y - hy, s * ka, LAV, PINK, t, 1, sq)
    // "YOU"
    const yk = pop01(t, 0.5, 0.36) * outK(t, T.h1Out, 0.3)
    if (yk > 0) chip(x, A.x, A.y + 26 + 30 * Math.min(1, s * 2), 'YOU', yk * Math.max(0.75, Math.min(1, s * 2)), { size: 26, col: PINK, edge: PINK })
    // them
    const B = scr(c, BW.x, BW.y)
    const kb = pop01(t, T.wB + 0.05, 0.45, 2) * (1 - ease.inCubic(prog(t, 21.3, 22.4)))
    if (kb > 0) pinPerson(B.x, B.y - hop(t, T.arc[1], 46), 0.3 * kb, '#7fc6ee', BLUE, t, 1)
  }

  // ── the magnifier scan
  function drawLens(t) {
    if (t < T.lensIn || t > T.lensOut[1]) return
    const P = lensPos(t)
    let si = 0
    for (let k = 0; k < 3; k++) if (t > T.stops[k] - 0.3) si = k
    const bump = T.stops.reduce((acc, s) => acc + (t > s ? 0.07 * Math.exp(-(t - s) * 7) * Math.sin((t - s) * 22) : 0), 0)
    magnifier(x, P.x, P.y, 150, 1 + bump, ctx => {
      ctx.beginPath(); ctx.moveTo(-160, 80); ctx.lineTo(160, 80); ink(ctx, LAV, { w: 5, fa: 0, glow: 8 })
      CROWD[si].forEach((col, k) => person(ctx, (k - 1) * 82 + 6 * Math.sin(t * 3 + k), 82, 0.36, { body: col, w: 7 }))
      ctx.beginPath(); for (let k = -1; k <= 1; k++) ctx.rect((k - 1) * 82 + 120, 96, 1, 1)
    })
    // a "?" pops above the lens at each stop
    T.stops.forEach((s, k) => {
      const q = pop01(t, s + 0.05, 0.38, 3) * outK(t, (T.stops[k + 1] ?? T.lensOut[0]) - 0.15, 0.2)
      if (q <= 0) return
      const sp = STOPS[k]
      x.save(); x.translate(sp.x + 120, sp.y - 160); x.scale(q, q); x.rotate(0.15 * Math.sin((t - s) * 10) * Math.exp(-(t - s) * 3))
      x.font = "italic 500 150px 'EB Garamond', serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = PINK; x.shadowBlur = 26; x.fillStyle = PINK; x.fillText('?', 0, 0); x.shadowBlur = 0
      x.restore()
      sparkle(x, sp.x + 120, sp.y - 160, t, s + 0.05, { n: 7, R: 110, seed: 70 + k, size: 22, dur: 0.6 })
    })
  }

  // ── the two charts + the gold arc
  function wheelAt(cx, cy, s, rot, k, col, t, tW) {
    if (k <= 0 || s <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
    // dark hub so the map underneath calms down
    x.beginPath(); x.arc(0, 0, 460, 0, TAU); x.fillStyle = `rgba(10,6,28,${0.72 * k})`; x.fill()
    drawWheelH(x, { W: WHEEL0, k })
    x.restore()
    x.save(); x.globalAlpha = k; x.beginPath(); x.arc(cx, cy, 460 * s + 4, 0, TAU); ink(x, col, { w: 6, fa: 0, glow: 26 }); x.restore()
    // flash ring on bloom
    const fk = prog(t, tW, tW + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(cx, cy, 460 * s * (1 + 0.35 * ease.outCubic(fk)), 0, TAU); ink(x, col, { w: 12 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore() }
  }
  function arcPt(c, u) {
    const a = scr(c, 0, 0), b = scr(c, BW.x, BW.y), q = scr(c, CW.x, CW.y)
    return { x: (1 - u) ** 2 * a.x + 2 * u * (1 - u) * q.x + u * u * b.x, y: (1 - u) ** 2 * a.y + 2 * u * (1 - u) * q.y + u * u * b.y }
  }
  function drawCharts(t, c) {
    if (t < T.wA - 0.8 || t > T.pairOut[1]) return
    const rel = c.z / ZP
    const shrink = 1 - ease.inCubic(prog(t, 22.2, 23.6))
    const fin = 1 - prog(t, ...T.pairOut)
    const A = scr(c, 0, 0), B = scr(c, BW.x, BW.y)
    ;[[A, T.wA, PINK, 0], [B, T.wB, BLUE, 1]].forEach(([P, tW, col, w]) => {
      const k = clamp(prog(t, tW, tW + 0.25)) * shrink
      const s = WS * rel * lerp(0.75, 1, easeOutBack(prog(t, tW, tW + 0.5), 2.2))
      const land = t > T.arc[1] ? 0.08 * Math.exp(-(t - T.arc[1]) * 5) * Math.sin((t - T.arc[1]) * 18) : 0
      wheelAt(P.x, P.y, s * (1 + land), (w ? -1 : 1) * (t - tW) * 0.12, k, col, t, tW)
      // planets
      PLANETS[w].forEach((pl, i) => {
        const pk = pop01(t, tW + 0.25 + i * 0.09, 0.34, 2.2) * shrink
        const ang = pl.a + (w ? -1 : 1) * (t - tW) * 0.12, rr = 290 * s
        orb(x, P.x + Math.cos(ang) * rr, P.y + Math.sin(ang) * rr, 11 * pk * Math.min(1, rel * 1.2), pl.c, clamp(pk * 2))
      })
      sparkle(x, P.x, P.y, t, tW, { n: 14, R: 300, seed: 12 + w, size: 30 })
      // the bright core star these become
      const st = prog(t, 21.6, 22.8)
      if (st > 0) orb(x, P.x, P.y, (8 + 10 * st) * (1 + 0.25 * Math.sin(t * 5 + w)), w ? BLUE : PINK, st * fin, 4)
    })
    // forming stars
    for (const f of FORM) {
      if (t < f.t0 || t > f.tW + 0.15) continue
      const P = f.w ? B : A
      const p = ease.inOutCubic(prog(t, f.t0, f.tW))
      const px = P.x + lerp(f.sx, f.tx * WS, p), py = P.y + lerp(f.sy, f.ty * WS, p)
      x.globalAlpha = clamp((t - f.t0) * 6) * (1 - prog(t, f.tW, f.tW + 0.15))
      drawPixelStar(x, px, py, lerp(16, 22, p), f.kind, f.col)
    }
    x.globalAlpha = 1
    // the arc
    const ap = ease.inOutQuad(prog(t, ...T.arc))
    if (ap > 0) {
      const N = Math.ceil(90 * ap)
      const done = t >= T.arc[1]
      const pulse = done ? 1 + 0.5 * Math.exp(-(t - T.arc[1]) * 3) : 1
      x.save(); x.globalAlpha = fin
      x.beginPath(); for (let i = 0; i <= N; i++) { const p = arcPt(c, (i / N) * ap); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
      ink(x, GOLD, { w: Math.max(4, 12 * Math.min(1, rel)) * pulse, fa: 0, glow: 34 })
      x.strokeStyle = '#fff3e0'; x.lineWidth = Math.max(1.5, 3.5 * Math.min(1, rel)); x.stroke()
      x.restore()
      if (!done) {
        const h = arcPt(c, ap)
        orb(x, h.x, h.y, 16, GOLD, 1, 4)
        for (let k = 1; k < 8; k++) { const q = arcPt(c, Math.max(0, ap - k * 0.025)); x.globalAlpha = 1 - k / 8; drawPixelStar(x, q.x + Math.sin(k * 2.3) * 10, q.y + Math.cos(k * 1.7) * 10, 18 - k, k % 3, k % 2 ? GOLD : PINK) }
        x.globalAlpha = 1
      } else if (t < T.h3Out + 0.3) {
        // light pulses running both ways
        for (let k = 0; k < 2; k++) {
          const ph = ((t - T.arc[1] + k * 0.55) % 1.1) / 1.1
          const u = k ? 1 - ph : ph
          const q = arcPt(c, ease.inOutQuad(u))
          orb(x, q.x, q.y, 10, k ? BLUE : PINK, Math.sin(Math.PI * ph) * outK(t, T.h3Out, 0.3), 3.5)
        }
      }
    }
    sparkle(x, B.x, B.y, t, T.arc[1], { n: 18, R: 320, seed: 33, size: 34, dur: 0.9 })
    sparkle(x, A.x, A.y, t, T.arc[1] + 0.1, { n: 12, R: 240, seed: 34, size: 28, dur: 0.8 })
    // the final twinkle on the pair
    const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }
    sparkle(x, M.x, M.y, t, T.twinkle, { n: 16, R: 260, seed: 90, size: 28, dur: 0.85 })
  }

  // ── neighbourhood chips
  function drawChips(t, c) {
    const conv = outK(t, T.drop + 0.25, 0.35)
    INNER.forEach(([name, i, j], k) => {
      const kk = pop01(t, T.inner[k], 0.36, 2.4) * conv
      if (kk <= 0) return
      const p = scr(c, i * TS, j * TS)
      chip(x, p.x, p.y, name, kk)
    })
    OUTER.forEach(([name, i, j], k) => {
      const kk = pop01(t, T.outer[k], 0.36, 2.4) * outK(t, T.labelsOut + k * 0.03, 0.3)
      if (kk <= 0) return
      const p = scr(c, i * TS, j * TS)
      chip(x, clamp(p.x, 150, W - 150), p.y, name, kk, { size: 24 })
    })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const c = cam(t)
        const mapA = (1 - 0.62 * ease.inOutQuad(prog(t, 11.0, 12.6))) * (1 - ease.inOutQuad(prog(t, 21.3, 23.4)))
        if (mapA > 0.005) drawMap(t, c, mapA)
        drawChips(t, c)
        drawRising(t, c)
        drawCharts(t, c)
        drawPeople(t, c)
        drawLens(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      // eyebrow
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out))
      eyebrow.textContent = t < T.still1 ? 'HOUSTON, TX' : t < T.still2 ? 'STILL HOUSTON' : 'YEP. STILL HOUSTON.'
      H0.update(t, outK(t, T.h0Out)); S0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into Em)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.028) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const tilePops = (() => {   // the first tiles popping in (deduped, before the drop)
  const out = []
  let last = -1
  for (const tl of [...TILES].filter(q => q.tA < T.drop - 0.1).sort((a, b) => a.tA - b.tA)) {
    if (tl.tA - last < 0.13) continue
    last = tl.tA
    out.push(['pop', r3(tl.tA), NOTE[(out.length * 2) % NOTE.length] / 2, 0.022, ((out.length % 3) - 1) * 0.4])
  }
  return out
})()
export const CUES = [
  // hook
  ...wordPops([T.h0, T.h0 + 0.1], 0, 0.03),
  ['boom', T.huge, 0.1], ['pluck', T.huge, 1174.66, 0.055, 0.6, 0], ['pop', T.huge, 1318.51, 0.05, 0],
  ...tilePops,
  ...T.inner.map((s, i) => ['pop', r3(s), NOTE[(i + 2) % 7], 0.03, (i % 2 ? 0.3 : -0.3)]),
  ['riser', r3(T.drop - 0.75), T.drop, 0.05], ['whoosh', T.drop, 1.8, 0.06], ['boom', T.drop, 0.12], ['glitter', r3(T.drop + 0.6), 4.7],
  ...wordPops([T.sub0, T.sub0 + 0.1, T.sub0 + 0.2, T.sub0 + 0.3], 2, 0.025),
  ['tick', T.still1, 0.045], ['tick', T.still2, 0.045], ['tick', r3(T.still2 + 0.08), 0.035],
  ...T.outer.map((s, i) => ['pop', r3(s), NOTE[(i + 3) % 7] * 2, 0.022, ((i % 3) - 1) * 0.4]),
  // search
  ['whoosh', r3(T.h0Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h1, T.h1 + 0.08, T.h1 + 0.16, T.h1 + 0.24, T.h1 + 0.32], 1, 0.026),
  ['pluck', T.h1Your, 880, 0.055, 0.6, 0], ['pop', T.h1Your, 1174.66, 0.045, 0],
  ...wordPops([T.h1End, T.h1End + 0.08, T.h1End + 0.16], 3, 0.026),
  ['whoosh', T.lensIn, 0.6, 0.04],
  ...T.stops.map((s, i) => ['whoosh', r3(s - 0.45), 0.4, 0.03]),
  ...T.stops.map((s, i) => ['pluck', r3(s + 0.05), [440, 493.88, 587.33][i], 0.05, 0.5, (i - 1) * 0.4]),
  ...T.stops.map((s, i) => ['pop', r3(s + 0.05), [987.77, 1174.66, 1318.51][i], 0.045, (i - 1) * 0.4]),
  ['whoosh', T.lensOut[0], 0.6, 0.04],
  // sky
  ...wordPops([T.h2, T.h2 + 0.1, T.h2 + 0.2], 2, 0.026),
  ['riser', r3(T.sky - 0.7), T.sky, 0.045], ['bell', T.sky, 1174.66, 0.05, 2.2, 0], ['glitter', T.lift[0], r3(T.lift[1] + 1.2)],
  ['whoosh', T.pan[0], 1.2, 0.04],
  ['bell', T.wA, 880, 0.05, 2.0, -0.4], ['pop', T.wA, 1318.51, 0.04, -0.4], ['glitter', T.wA, r3(T.wA + 0.6)],
  ['bell', T.wB, 1174.66, 0.05, 2.0, 0.4], ['pop', T.wB, 1479.98, 0.04, 0.4],
  ...[0, 1, 2].map(i => ['pop', r3(T.wA + 0.25 + i * 0.09), NOTE[i + 1], 0.026, -0.4]),
  ...[0, 1, 2].map(i => ['pop', r3(T.wB + 0.25 + i * 0.09), NOTE[i + 3], 0.026, 0.4]),
  // lines up
  ...wordPops([T.h3, T.h3 + 0.08, T.h3 + 0.16], 0, 0.026),
  ['pluck', T.linesUp, 1174.66, 0.055, 0.6, 0], ['pop', T.linesUp, 1318.51, 0.045, 0],
  ...wordPops([T.linesUp + 0.3, T.linesUp + 0.38], 4, 0.024),
  ['riser', T.arc[0], T.arc[1], 0.05], ['whoosh', T.arc[0], 0.9, 0.05], ['glitter', T.arc[0], T.arc[1]],
  ['boom', T.arc[1], 0.12], ['bell', T.arc[1], 880, 0.05, 2.4, 0.3], ['bell', r3(T.arc[1] + 0.06), 1174.66, 0.045, 2.4, 0], ['bell', r3(T.arc[1] + 0.12), 1760, 0.03, 2.2, -0.3],
  // somewhere out there
  ...wordPops([T.h4, T.h4 + 0.08, T.h4 + 0.16], 1, 0.026),
  ['pluck', T.h4Sky, 880, 0.055, 0.6, 0], ['pop', T.h4Sky, 1174.66, 0.045, 0],
  ...wordPops([T.h4Lines, T.h4Lines + 0.08, T.h4Lines + 0.16, T.h4Lines + 0.24], 3, 0.024),
  ['whoosh', T.zoom4[0], 2.4, 0.045],
  ['bell', T.twinkle, 1318.51, 0.04, 2.0, -0.2], ['bell', r3(T.twinkle + 0.08), 1760, 0.03, 2.0, 0.2], ['glitter', T.twinkle, r3(T.twinkle + 0.7)],
]
