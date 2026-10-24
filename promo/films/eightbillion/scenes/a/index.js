// eightbillion half a (0–15.2): the problem of scale, as ONE continuous pull-back.
//   one woman alone in a lit window, cold phone light on her face — "8 billion people."
//   → her building → the city at night → the horizon bends into the Earth at night (city-light clusters, a dawn rim)
//   → "So why does it feel like no one?" → the Earth shrinks to a pale dot and is gone → only the sky.
// Handoff H (14.8–15.2): drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12), grain 0.5, nothing else.
//
// One log-distance U(t) drives everything (C¹, so the pull-back never jerks):
//   U ∈ [0, U1]  the dolly: camera distance zc = Z0·e^U through a layered city (city.js; hero tower drawn here)
//   U > U1       the city, frozen at zc1, is shrunk as a picture onto the limb of a globe of radius R0·e^(U1−U)
import { el, clamp, lerp, prog, ease, rng, noise1, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, GRAIN_OPACITY } from '../../../sky.js'
import { CITY, bakeCity, drawLayer, drawFreeway, drawStreetLamps, camLayer, rgba } from './city.js'
import { bakeGlobe, drawGlobe, viewMatrix, HOME } from './globe.js'
import { personCanvas, FACE } from './person.js'

const MOON = { x: 1716, y: 122, r: 52, phase: 0.12 }
export const T = {
  hook: 0.3, hookOut: 5.05,          // "8 billion people."
  q1: 8.55, q2: 9.05, qOut: 14.2,   // "So why does it feel" / "like no one?"
  H: 14.8, end: 15.2,
}

// ── the pull-back: U(t) as a C¹ Hermite spline through (t, U, dU/dt)
const Z0 = 0.0175, ZC1 = 1.4, U1 = Math.log(ZC1 / Z0)     // the dolly ends at zc 1.4 (U ≈ 4.38)
const R0 = 30000, RD = 420, UD = U1 + Math.log(R0 / RD)    // the globe is a full disc (R 420) at UD ≈ 8.65
const UE = UD + Math.log(RD / 3)                             // R 3: a dot
const UK = [[0, 0, 0.3], [4.75, U1, 0.85], [6.45, U1 + 1.55, 1.05], [8.45, UD - 0.06, 0.4], [9.7, UD + 0.36, 0.4], [13.5, UE - 1.0, 1.0], [14.6, UE, 0]]
export function U(t) {
  if (t <= UK[0][0]) return UK[0][1]
  for (let i = 1; i < UK.length; i++) {
    const [t0, u0, m0] = UK[i - 1], [t1, u1, m1] = UK[i]
    if (t <= t1) {
      const h = t1 - t0, s = (t - t0) / h, s2 = s * s, s3 = s2 * s
      return (2 * s3 - 3 * s2 + 1) * u0 + (s3 - 2 * s2 + s) * h * m0 + (-2 * s3 + 3 * s2) * u1 + (s3 - s2) * h * m1
    }
  }
  return UK[UK.length - 1][1]
}
const GC = [1290, 588]                                       // where the Earth settles (and dwindles to a dot)

// ── the hero tower (world base px at zc 1, depth 0 = the nearest thing in the city)
const HB = { x0: 248, x1: 518, top: 362, base: 1600, cw: 27, ch: 33, ww: 16, wh: 21, cols: 10 }
const HERO_C = 3, HERO_R = 7
const winX = (c) => HB.x0 + (HB.x1 - HB.x0 - HB.cols * HB.cw) / 2 + c * HB.cw + (HB.cw - HB.ww) / 2
const winY = (r) => HB.top + 30 + r * HB.ch
const HW = { x: winX(HERO_C), y: winY(HERO_R), w: HB.ww, h: HB.wh }
const HWC = [HW.x + HW.w / 2, HW.y + HW.h / 2]
const HERO_WINS = (() => {
  const r = rng(5150), out = []
  for (let row = 0; row * HB.ch + 30 < HB.base - HB.top; row++) for (let c = 0; c < HB.cols; c++) {
    const near = Math.abs(c - HERO_C) <= 1 && Math.abs(row - HERO_R) <= 1
    const hero = c === HERO_C && row === HERO_R
    const u = r(), k = r()
    out.push({ c, row, x: winX(c), y: winY(row), hero, lit: !hero && !near && u < 0.16,
      col: k < 0.55 ? [255, 196, 128] : k < 0.8 ? [255, 170, 104] : [168, 186, 255], a: 0.55 + 0.4 * r(), blind: r(), tv: k >= 0.8 })
  }
  return out
})()

// ── camera
const H0 = [1180, 532]                                // the hero window's screen centre at t = 0
export function cam(t) {
  const u = Math.min(U(t), U1), zc = Z0 * Math.exp(u), p = ease.inOutQuad(u / U1)
  const s = 1 / zc                                    // hero tower scale (depth 0)
  const O = [lerp(H0[0], 960, p), lerp(H0[1], 862, p)]
  const sEnd = 1 / ZC1, Hend = [960 + (HWC[0] - 960) * sEnd, 862 + (HWC[1] - 862) * sEnd]
  const Hs = [lerp(H0[0], Hend[0], p), lerp(H0[1], Hend[1], p)]
  // tiny handheld breath early on (fades as the camera gets far)
  const br = (1 - p) * 1.0
  Hs[0] += br * 3 * (noise1(t * 0.6, 4) - 0.5); Hs[1] += br * 3 * (noise1(t * 0.5, 9) - 0.5)
  return { zc, cx: HWC[0] - (Hs[0] - O[0]) / s, cy: HWC[1] - (Hs[1] - O[1]) / s, O, s }
}
const CAM1 = { zc: ZC1, cx: 960, cy: 862, O: [960, 862], s: 1 / ZC1 }
const ANCHOR0 = [960, 884]                            // the city's ground line at CAM1 — where it meets the limb
const ELEV1 = 34 * Math.PI / 180
/** globe state for U > U1 */
export function globe(t) {
  const u = U(t), R = R0 * Math.exp(U1 - u)
  const q = clamp((u - U1) / (UD - U1)), e = ease.inOutCubic(q), e2 = ease.inOutQuad(q)
  const elev = lerp(Math.PI / 2 - 0.004, ELEV1, e)
  const Aend = [GC[0], GC[1] - RD * Math.sin(ELEV1)]
  const A = [lerp(ANCHOR0[0], Aend[0], e2), lerp(ANCHOR0[1], Aend[1], e)]
  // after the disc forms the anchor rides the shrinking globe: keep the centre at GC
  let cx = A[0], cy = A[1] + R * Math.sin(elev)
  if (u > UD) { cx = GC[0]; cy = GC[1] }
  const roll = lerp(0, -0.12, e) - 0.05 * prog(u, UD, UE)
  const M = viewMatrix(elev, roll, HOME.lon - 6 * prog(t, 6, 14), HOME.lat)
  return { R, cx, cy, M, A, q, u }
}

// ── sound
export const CUES = [
  ['whoosh', 0.0, 1.8, 0.03],
  ['bell', T.hook + 0.15, 220, 0.045, 2.6, -0.15],
  ['riser', 1.2, 4.6, 0.035],
  ['whoosh', 4.3, 1.6, 0.05],
  ['riser', 5.2, 8.2, 0.04],
  ['whoosh', 6.9, 1.4, 0.045],
  ['bell', T.q1 + 0.1, 196, 0.04, 2.8, 0.15],
  ['bell', T.q2 + 0.1, 146.83, 0.035, 3.0, -0.1],
  ['riser', 11.0, 14.5, 0.035],
  ['whoosh', 12.4, 1.8, 0.04],
  ['glitter', 14.0, 14.8],
  ['bell', 14.45, 1174.66, 0.018, 1.8, 0.4],
]

export const SCENES = [async (stage) => {
  bakeCity(); getSky(); bakeGlobe()
  const person = await personCanvas()
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: C.void }, stage)
  const canvas = (style = {}, w = W, h = H) => { const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', ...style }, root); c.width = w; c.height = h; return c }
  const off = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
  const skyC = canvas(), sx = skyC.getContext('2d')
  const globeC = canvas(), gx2 = globeC.getContext('2d')
  const cityC = canvas(), cx = cityC.getContext('2d')
  const BW = 3840, BH = 1700, BX = 960
  const cbuf = off(BW, BH), bx = cbuf.getContext('2d')
  const gbuf = off(W, H), gbx = gbuf.getContext('2d')
  const dotC = canvas(), dx = dotC.getContext('2d')
  const grainC = canvas({ mixBlendMode: 'overlay', opacity: GRAIN_OPACITY, pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── type (above the grain)
  const shade = '0 2px 30px rgba(8,6,22,0.92), 0 0 64px rgba(8,6,22,0.6)'
  const stmt = (txt, style) => el('div', { position: 'absolute', fontFamily: SERIF, fontStyle: 'italic', lineHeight: '1', letterSpacing: '-0.01em', color: C.bone, whiteSpace: 'nowrap', opacity: 0, textShadow: shade, ...style }, root, txt)
  const pocket = (style) => el('div', { position: 'absolute', opacity: 0, background: 'radial-gradient(50% 50% at 50% 50%, rgba(8,6,22,0.6), rgba(8,6,22,0.28) 60%, rgba(8,6,22,0) 100%)', ...style }, root)
  const pk1 = pocket({ left: '-60px', top: '20px', width: '1060px', height: '330px' })
  const hook = stmt('8 billion people.', { left: '128px', top: '118px', fontSize: '120px' })
  const pk2 = pocket({ left: '-40px', top: '330px', width: '1080px', height: '420px' })
  const q1 = stmt('So why does it feel', { left: '128px', top: '418px', fontSize: '104px' })
  const q2 = stmt('like no one?', { left: '128px', top: '534px', fontSize: '104px' })
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }, root)

  const fadeLine = (e, t, t0, t1, rise = 16) => {
    const a = ease.outCubic(prog(t, t0, t0 + 0.55)) * (1 - ease.inQuad(prog(t, t1, t1 + 0.32)))
    e.style.opacity = String(a)
    e.style.transform = `translateY(${(1 - ease.outCubic(prog(t, t0, t0 + 0.7))) * rise}px)`
    e.style.filter = `blur(${(1 - ease.outCubic(prog(t, t0, t0 + 0.45))) * 6}px)`
    return a
  }

  // ── the city (copied structure from samesky): layers far → near, then the hero tower in front
  function drawCity(ctx, t, c, X = 0) {
    ctx.save(); ctx.translate(X, 0)
    const Ls = CITY.layers, LW0 = -X - 40, LW = ctx.canvas.width + 80
    {
      const Tr = camLayer(c, Ls[0].f), y = (v) => v * Tr.s + Tr.oy
      const g = ctx.createLinearGradient(0, y(430), 0, y(860))
      g.addColorStop(0, 'rgba(100,80,170,0)'); g.addColorStop(0.55, 'rgba(104,84,170,0.18)'); g.addColorStop(0.85, 'rgba(128,100,166,0.3)'); g.addColorStop(1, 'rgba(160,112,130,0.26)')
      ctx.fillStyle = g; ctx.fillRect(LW0, y(430), LW, y(860) - y(430))
      const gx0 = 960 * Tr.s + Tr.ox, gy0 = 720 * Tr.s + Tr.oy, gr = 900 * Tr.s
      const wg = ctx.createRadialGradient(gx0, gy0, 0, gx0, gy0, gr)
      wg.addColorStop(0, 'rgba(255,170,140,0.14)'); wg.addColorStop(0.5, 'rgba(255,150,140,0.05)'); wg.addColorStop(1, 'rgba(255,150,140,0)')
      ctx.fillStyle = wg; ctx.fillRect(gx0 - gr, gy0 - gr, gr * 2, gr * 2)
    }
    const band = (L, a) => {
      const Tr = camLayer(c, L.f), y0 = (L.base - 150) * Tr.s + Tr.oy, y1 = (L.base + 30) * Tr.s + Tr.oy
      const g = ctx.createLinearGradient(0, y0, 0, y1)
      g.addColorStop(0, rgba(L.haze, 0)); g.addColorStop(0.75, rgba(L.haze, a)); g.addColorStop(1, rgba(L.haze, a * 0.6))
      ctx.fillStyle = g; ctx.fillRect(LW0, y0, LW, y1 - y0)
    }
    drawLayer(ctx, c, Ls[0]); beacons(ctx, t, c, [0]); band(Ls[0], 0.4)
    drawLayer(ctx, c, Ls[1]); band(Ls[1], 0.3); beacons(ctx, t, c, [1])
    drawLayer(ctx, c, Ls[2]); band(Ls[2], 0.22); beacons(ctx, t, c, [2])
    drawLayer(ctx, c, Ls[3]); beacons(ctx, t, c, [3])
    drawFreeway(ctx, c, t)
    {
      const Tr = camLayer(c, Ls[3].f), y0 = 880 * Tr.s + Tr.oy, y1 = 1000 * Tr.s + Tr.oy
      const g = ctx.createLinearGradient(0, y0, 0, y1)
      g.addColorStop(0, 'rgba(150,120,200,0)'); g.addColorStop(0.55, 'rgba(150,120,200,0.22)'); g.addColorStop(1, 'rgba(150,120,200,0.1)')
      ctx.fillStyle = g; ctx.fillRect(LW0, y0, LW, y1 - y0)
    }
    drawLayer(ctx, c, Ls[4])
    drawStreetLamps(ctx, c, t)
    drawHeroTower(ctx, t, c)
    ctx.restore()
  }
  function beacons(ctx, t, c, lis) {
    for (const b of CITY.beacons) if (lis.includes(b.li)) {
      const ph = (t + b.ph * 2.4) % 2.4, on = ph < 0.5 ? Math.sin(Math.PI * ph / 0.5) : 0
      if (on <= 0) continue
      const Tr = camLayer(c, CITY.layers[b.li].f), x = b.x * Tr.s + Tr.ox, y = b.y * Tr.s + Tr.oy, R = 7 * Tr.s
      const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, `rgba(255,90,90,${0.75 * on})`); g.addColorStop(0.3, `rgba(255,60,70,${0.25 * on})`); g.addColorStop(1, 'rgba(255,60,70,0)')
      ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2)
    }
  }

  // ── the hero tower, vector at any scale
  const COLD = [150, 178, 255]
  function drawHeroTower(ctx, t, c) {
    const Tr = camLayer(c, { z: 0 }), s = Tr.s
    const X = (v) => v * s + Tr.ox, Y = (v) => v * s + Tr.oy
    const x0 = X(HB.x0), x1 = X(HB.x1), y0 = Y(HB.top), y1 = Y(HB.base)
    const vw = ctx.canvas.width, vh = ctx.canvas.height
    // body
    const bg = ctx.createLinearGradient(0, y0, 0, y1)
    bg.addColorStop(0, '#120d2a'); bg.addColorStop(0.35, '#0f0b24'); bg.addColorStop(1, '#0b081c')
    ctx.fillStyle = bg; ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
    // moon-side rim on the right edge + parapet + a roof tank
    const rim = ctx.createLinearGradient(x1 - 8 * s, 0, x1, 0)
    rim.addColorStop(0, 'rgba(190,180,255,0)'); rim.addColorStop(1, 'rgba(196,186,255,0.12)')
    ctx.fillStyle = rim; ctx.fillRect(x1 - 8 * s, y0, 8 * s, y1 - y0)
    ctx.fillStyle = '#0d0a22'; ctx.fillRect(x0 - 2 * s, y0 - 4 * s, x1 - x0 + 4 * s, 5 * s)
    ctx.fillRect(X(300), Y(HB.top - 22), 26 * s, 18 * s); ctx.fillRect(X(304), Y(HB.top - 4), 2 * s, 4 * s); ctx.fillRect(X(320), Y(HB.top - 4), 2 * s, 4 * s)
    ctx.fillRect(X(470), Y(HB.top - 40), 1.6 * s, 36 * s)
    { const ph = (t + 0.3) % 2.4, on = ph < 0.5 ? Math.sin(Math.PI * ph / 0.5) : 0
      if (on > 0) { const bx0 = X(470.8), by0 = Y(HB.top - 41), R = 7 * s; const g = ctx.createRadialGradient(bx0, by0, 0, bx0, by0, R); g.addColorStop(0, `rgba(255,90,90,${0.8 * on})`); g.addColorStop(0.3, `rgba(255,60,70,${0.25 * on})`); g.addColorStop(1, 'rgba(255,60,70,0)'); ctx.fillStyle = g; ctx.fillRect(bx0 - R, by0 - R, 2 * R, 2 * R) } }
    // floor slabs: a faint lighter line under each row of windows (reads at close range)
    if (s > 1.2) {
      ctx.fillStyle = `rgba(150,140,220,${0.05 * clamp((s - 1.2) / 3)})`
      for (let row = 0; winY(row) < HB.base; row++) { const y = Y(winY(row) + HB.wh + 4); if (y < -20 || y > vh + 20) continue; ctx.fillRect(x0, y, x1 - x0, Math.max(1, 1.4 * s)) }
    }
    // spill of the hero window's cold light onto the facade
    const hx = X(HWC[0]), hy = Y(HWC[1])
    { const R = 34 * s, g = ctx.createRadialGradient(hx, hy + 4 * s, 0, hx, hy + 4 * s, R)
      g.addColorStop(0, 'rgba(120,150,240,0.16)'); g.addColorStop(0.45, 'rgba(110,130,230,0.05)'); g.addColorStop(1, 'rgba(110,130,230,0)')
      ctx.fillStyle = g; ctx.fillRect(hx - R, hy - R + 4 * s, 2 * R, 2 * R) }
    // windows
    for (const w of HERO_WINS) {
      const rx = X(w.x), ry = Y(w.y), rw = HB.ww * s, rh = HB.wh * s
      if (rx > vw + 10 || rx + rw < -10 || ry > vh + 10 || ry + rh < -10) continue
      if (w.hero) { drawHeroWindow(ctx, t, rx, ry, rw, rh, s); continue }
      if (w.lit) {
        const a = w.a * (w.tv ? 0.75 + 0.25 * noise1(t * 5, w.c * 7 + w.row) : 1)
        if (rw > 6) {
          const g = ctx.createLinearGradient(0, ry, 0, ry + rh)
          g.addColorStop(0, rgba(w.col.map(v => v * 0.55), a)); g.addColorStop(1, rgba(w.col, a))
          ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh)
          // blinds / curtains
          ctx.fillStyle = 'rgba(30,18,40,0.35)'; ctx.fillRect(rx, ry, rw, rh * (0.15 + 0.4 * w.blind))
          ctx.fillStyle = 'rgba(12,8,24,0.55)'; ctx.fillRect(rx, ry, rw * 0.16, rh); ctx.fillRect(rx + rw * 0.84, ry, rw * 0.16, rh)
          if (rw > 20) { ctx.fillStyle = '#0d0a22'; ctx.fillRect(rx + rw * 0.48, ry, rw * 0.04, rh) }
        } else { ctx.fillStyle = rgba(w.col, a * 0.85); ctx.fillRect(rx, ry, rw, rh) }
      } else {
        ctx.fillStyle = '#07051a'; ctx.fillRect(rx, ry, rw, rh)
        if (rw > 6) {   // a faint sky reflection on the glass
          const g = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh)
          g.addColorStop(0, 'rgba(120,110,200,0.09)'); g.addColorStop(0.5, 'rgba(120,110,200,0.02)'); g.addColorStop(1, 'rgba(120,110,200,0.06)')
          ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh)
          if (rw > 20) { ctx.fillStyle = '#0e0b24'; ctx.fillRect(rx + rw * 0.3, ry, rw * 0.035, rh) }
        }
      }
      if (rw > 14) {  // sill
        ctx.fillStyle = 'rgba(150,140,220,0.07)'; ctx.fillRect(rx - rw * 0.05, ry + rh, rw * 1.1, Math.max(1, rh * 0.05))
      }
    }
  }
  // her window: the dark room, her face lit by the phone, the glass, the frame
  function drawHeroWindow(ctx, t, rx, ry, rw, rh, s) {
    if (rw < 4) {   // far away: a cold point of light
      ctx.fillStyle = rgba(COLD, 0.9); ctx.fillRect(rx, ry, rw, rh)
      const R = rw * 3.5, g = ctx.createRadialGradient(rx + rw / 2, ry + rh / 2, 0, rx + rw / 2, ry + rh / 2, R)
      g.addColorStop(0, rgba(COLD, 0.35)); g.addColorStop(1, rgba(COLD, 0))
      ctx.fillStyle = g; ctx.fillRect(rx + rw / 2 - R, ry + rh / 2 - R, 2 * R, 2 * R)
      return
    }
    ctx.save()
    ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip()
    // the room: cold dark, a faint wash from the phone below
    ctx.fillStyle = '#0b0d22'; ctx.fillRect(rx, ry, rw, rh)
    const flick = 0.9 + 0.1 * noise1(t * 3, 21)
    { const px = rx + rw * 0.6, py = ry + rh * 1.02, R = rh * 0.9
      const g = ctx.createRadialGradient(px, py, 0, px, py, R)
      g.addColorStop(0, `rgba(120,150,235,${0.42 * flick})`); g.addColorStop(0.5, `rgba(80,100,190,${0.14 * flick})`); g.addColorStop(1, 'rgba(60,70,160,0)')
      ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh) }
    // a lamp-less back wall corner and a curtain on the left pane
    ctx.fillStyle = 'rgba(40,46,90,0.25)'; ctx.fillRect(rx + rw * 0.06, ry, rw * 0.004 + 1, rh)
    { const cg = ctx.createLinearGradient(rx, 0, rx + rw * 0.22, 0)
      cg.addColorStop(0, 'rgba(26,30,62,0.95)'); cg.addColorStop(0.35, 'rgba(42,50,96,0.8)'); cg.addColorStop(0.6, 'rgba(24,28,60,0.9)'); cg.addColorStop(0.85, 'rgba(46,56,104,0.6)'); cg.addColorStop(1, 'rgba(30,36,76,0)')
      ctx.fillStyle = cg; ctx.fillRect(rx, ry, rw * 0.22, rh) }
    // her: face at (0.6w, 0.47h), photo height 1.02 × window height
    const ph = rh * 1.02, pw = ph * FACE.w / FACE.h
    const fx = rx + rw * 0.6, fy = ry + rh * 0.47
    const ix = fx - pw * FACE.fx / FACE.w, iy = fy - ph * FACE.fy / FACE.h
    ctx.globalAlpha = flick * 0.95 + 0.05
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(person, ix, iy, pw, ph)
    ctx.globalAlpha = 1
    // the phone's edge glow just below the sill line
    { const px = rx + rw * 0.58, py = ry + rh * 0.985, Rw = rw * 0.22
      const g = ctx.createRadialGradient(px, py, 0, px, py, Rw)
      g.addColorStop(0, `rgba(200,220,255,${0.55 * flick})`); g.addColorStop(0.25, `rgba(140,170,255,${0.2 * flick})`); g.addColorStop(1, 'rgba(120,150,255,0)')
      ctx.fillStyle = g; ctx.fillRect(px - Rw, py - Rw, 2 * Rw, 2 * Rw) }
    // the glass: a diagonal sheen and blurred city reflections
    { const g = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh)
      g.addColorStop(0, 'rgba(150,150,230,0.07)'); g.addColorStop(0.42, 'rgba(150,150,230,0.0)'); g.addColorStop(0.62, 'rgba(170,170,240,0.06)'); g.addColorStop(0.7, 'rgba(150,150,230,0.0)')
      ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh) }
    if (rw > 60) {
      ctx.globalCompositeOperation = 'lighter'
      const r = rng(77)
      for (let i = 0; i < 26; i++) {
        const u = r(), v = r(), col = r() < 0.7 ? [255, 190, 130] : [180, 190, 255]
        const bxp = rx + rw * u, byp = ry + rh * (0.55 + 0.45 * v), R = rw * (0.012 + 0.03 * r())
        const a = 0.05 + 0.08 * r()
        const g = ctx.createRadialGradient(bxp, byp, 0, bxp, byp, R)
        g.addColorStop(0, rgba(col, a)); g.addColorStop(0.7, rgba(col, a * 0.7)); g.addColorStop(1, rgba(col, 0))
        ctx.fillStyle = g; ctx.fillRect(bxp - R, byp - R, 2 * R, 2 * R)
      }
      ctx.globalCompositeOperation = 'source-over'
    }
    ctx.restore()
    // frame: outer frame, a mullion splitting off the left pane, a transom
    const fw = Math.max(1, rw * 0.035)
    ctx.fillStyle = '#100c26'
    ctx.fillRect(rx - fw, ry - fw, rw + 2 * fw, fw * 1.6); ctx.fillRect(rx - fw, ry + rh - fw * 0.4, rw + 2 * fw, fw * 1.4)
    ctx.fillRect(rx - fw, ry, fw * 1.6, rh); ctx.fillRect(rx + rw - fw * 0.6, ry, fw * 1.6, rh)
    ctx.fillRect(rx + rw * 0.27, ry, fw * 0.9, rh)
    ctx.fillRect(rx, ry + rh * 0.19, rw * 0.27, fw * 0.8)
    if (rw > 30) {   // cold light catching the inner edges of the frame + the sill
      ctx.fillStyle = 'rgba(150,175,255,0.18)'
      ctx.fillRect(rx + rw * 0.27 + fw * 0.9, ry, Math.max(1, fw * 0.15), rh)
      ctx.fillRect(rx - fw * 1.6, ry + rh + fw, rw + fw * 3.2, Math.max(1, fw * 0.5))
      ctx.fillStyle = 'rgba(10,8,24,0.9)'; ctx.fillRect(rx - fw * 1.6, ry + rh + fw * 1.5, rw + fw * 3.2, fw * 1.2)
    }
  }

  // ── the sky: cold and desaturated, settling to exactly drawSky at H
  function skyState(t) {
    const u = U(t), k = ease.inOutQuad(prog(u, 0, 14))
    const zoom = lerp(1.08, 1, k)
    const desat = lerp(0.5, 0, ease.inOutQuad(prog(t, 13.4, 14.8)))
    const dim = lerp(0.8, 1, ease.inOutQuad(prog(t, 13.4, 14.8)))
    return { zoom, desat, dim, moon: { x: 960 + (MOON.x - 960) * zoom, y: 540 + (MOON.y - 540) * zoom, r: MOON.r * zoom, phase: MOON.phase, alpha: 1 } }
  }

  return {
    start: 0, end: T.end, root,
    update(t) {
      const u = U(t), sk = skyState(t)
      drawSky(sx, t, { zoom: sk.zoom, dx: 0, dy: 0, dim: sk.dim, moon: sk.moon })
      if (sk.desat > 0.001) {
        sx.save(); sx.globalCompositeOperation = 'saturation'; sx.globalAlpha = sk.desat; sx.fillStyle = '#808080'; sx.fillRect(0, 0, W, H)
        sx.globalCompositeOperation = 'source-over'; sx.globalAlpha = sk.desat * 0.35; sx.fillStyle = '#0a0a2a'; sx.fillRect(0, 0, W, H); sx.restore()
        sx.save(); sx.beginPath(); sx.arc(sk.moon.x, sk.moon.y, sk.moon.r * 1.02, 0, Math.PI * 2); sx.clip(); drawSky(sx, t, { zoom: sk.zoom, dx: 0, dy: 0, dim: sk.dim, moon: sk.moon }); sx.restore()
      }

      // the city
      cx.clearRect(0, 0, W, H)
      if (u <= U1) {
        drawCity(cx, t, cam(t), 0)
      } else {
        const k = Math.exp(U1 - u)
        const ca = 1 - ease.inOutQuad(prog(k, 0.32, 0.06))
        if (ca > 0.002) {
          bx.clearRect(0, 0, BW, BH)
          drawCity(bx, t, CAM1, BX)
          // soften the picture's edges (they come into view as it shrinks)
          bx.save(); bx.globalCompositeOperation = 'destination-in'
          const g = bx.createLinearGradient(0, 0, BW, 0)
          g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.2, 'rgba(0,0,0,1)'); g.addColorStop(0.8, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
          bx.fillStyle = g; bx.fillRect(0, 0, BW, BH)
          const v = bx.createLinearGradient(0, 0, 0, BH)
          const m = ease.inOutQuad(prog(k, 1, 0.55)), yf = lerp(1500, 900, m) / BH, yz = Math.min(1, lerp(1700, 1010, m) / BH)
          v.addColorStop(0, 'rgba(0,0,0,1)'); v.addColorStop(yf, 'rgba(0,0,0,1)'); v.addColorStop(yz, 'rgba(0,0,0,0)'); if (yz < 1) v.addColorStop(1, 'rgba(0,0,0,0)')
          bx.fillStyle = v; bx.fillRect(0, 0, BW, BH)
          bx.restore()
          const G = globe(t)
          cx.save(); cx.globalAlpha = ca
          cx.translate(G.A[0], G.A[1]); cx.scale(k, k); cx.translate(-(ANCHOR0[0] + BX), -ANCHOR0[1])
          cx.drawImage(cbuf, 0, 0)
          cx.restore()
        }
      }
      cityC.style.filter = 'saturate(0.72)'

      // the Earth
      gx2.clearRect(0, 0, W, H); dx.clearRect(0, 0, W, H)
      if (u > U1) {
        const G = globe(t)
        const ga = ease.inOutQuad(prog(u, U1, U1 + 0.5))
        const dotK = prog(G.R, 7, 3)               // tiny → hand over to a soft dot
        const fadeAll = 1 - ease.inOutQuad(prog(t, 14.3, 14.75))
        if (G.R >= 3 && dotK < 1) {
          const sc = G.R > 900 ? 0.5 : 1
          if (sc < 1) { gbx.clearRect(0, 0, W, H); drawGlobe(gbx, { ...G, alpha: 1 }, sc); gx2.globalAlpha = ga * fadeAll; gx2.imageSmoothingQuality = 'high'; gx2.drawImage(gbuf, 0, 0, W * sc, H * sc, 0, 0, W, H); gx2.globalAlpha = 1 }
          else drawGlobe(gx2, { ...G, alpha: ga * fadeAll * (1 - dotK) }, 1)
        }
        // the pale dot: as the disc gets tiny it becomes a point of light among the stars, then it is gone
        if (G.R < 30 && fadeAll > 0) {
          const a = fadeAll * ease.inOutQuad(prog(G.R, 30, 8)), R = 7 + Math.min(G.R, 14) * 0.8
          const g = dx.createRadialGradient(GC[0], GC[1], 0, GC[0], GC[1], R)
          g.addColorStop(0, `rgba(222,234,255,${a})`); g.addColorStop(0.22, `rgba(150,185,255,${0.5 * a})`); g.addColorStop(1, 'rgba(120,160,255,0)')
          dx.fillStyle = g; dx.fillRect(GC[0] - R, GC[1] - R, 2 * R, 2 * R)
        }
        globeC.style.filter = `saturate(${lerp(0.8, 1, prog(t, 12, 14.5)).toFixed(3)})`
      }

      // grain (a little finer over her face while we are close)
      gx.clearRect(0, 0, W, H); drawGrain(gx, t)
      if (u < 2.2) {
        const c = cam(t), Tr = camLayer(c, { z: 0 })
        const fx = (HW.x + HW.w * 0.6) * Tr.s + Tr.ox, fy = (HW.y + HW.h * 0.45) * Tr.s + Tr.oy, rr = HW.h * Tr.s * 0.5
        const kk = 1 - prog(u, 1.2, 2.2)
        const g = gx.createRadialGradient(fx, fy, 0, fx, fy, rr)
        g.addColorStop(0, `rgba(0,0,0,${0.45 * kk})`); g.addColorStop(0.6, `rgba(0,0,0,${0.3 * kk})`); g.addColorStop(1, 'rgba(0,0,0,0)')
        gx.save(); gx.globalCompositeOperation = 'destination-out'; gx.fillStyle = g; gx.fillRect(fx - rr, fy - rr, rr * 2, rr * 2); gx.restore()
      }

      // type
      const h1 = fadeLine(hook, t, T.hook, T.hookOut)
      pk1.style.opacity = String(h1 * 0.95)
      const a1 = fadeLine(q1, t, T.q1, T.qOut), a2 = fadeLine(q2, t, T.q2, T.qOut + 0.05)
      pk2.style.opacity = String(Math.max(a1, a2) * 0.9)
      black.style.opacity = String(0.7 * (1 - ease.outQuad(prog(t, 0, 0.35))))
    },
  }
}]
