// samesky half a (0–15.2): Houston at night. "Two people. Same city." → two lit windows open into two rooms,
// "Same moon." → back to their phones, "Never met." → the windows go dark one by one, the city pulls wide,
// "A city full of people you'll never meet." → the camera cranes up into the sky and lands on the handoff H:
// drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12), skyline gone, grain 0.5 — held 14.8–15.2.
import { el, clamp, lerp, prog, ease, tw, noise1, C } from '../../../../src/lib.js'
import { W, H, IMG, PEOPLE, SERIF, MONO } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, GRAIN_OPACITY } from '../../../sky.js'
import { CITY, HERO, bakeCity, drawLayer, drawFreeway, drawStreetLamps, camLayer, winRect, rgba } from './city.js'
export { CITY, HERO, bakeCity, drawLayer, camLayer }
import { makeRoom, RW, RH } from './rooms.js'

export const T = {
  hookA: 0.95, hookB: 1.75, hookOut: 3.7,
  glintA: 3.2, glintB: 3.45,
  openA: 4.1, openB: 4.28, OPEN: 0.9,
  moon: 5.35, moonOut: 7.65,
  phoneA: 7.95, phoneB: 8.1,
  never: 8.2, neverOut: 11.4,
  closeA: 9.0, closeB: 9.1, CLOSE: 0.7,
  city1: 12.05, city2: 12.5, cityOut: 14.05,
  tilt0: 13.3, tilt1: 14.75, H: 14.8, end: 15.2,
}
const SWIPES_A = [8.42, 8.74], SWIPES_B = [8.56, 8.86]
const MOON = { x: 1716, y: 122, r: 52, phase: 0.12 }

// ── camera (pure)
export function cam(t) {
  const Z = tw(t, [[0, 1.0], [4.1, 1.07, ease.inOutQuad], [10.5, 1.09, ease.linear], [12.7, 0.82, ease.inOutCubic], [14.8, 0.8, ease.outQuad]])
  const pan = tw(t, [[0, -26], [12.7, 26, ease.linear]])
  const tilt = tw(t, [[T.tilt0, 0], [T.tilt1, 940, ease.inOutCubic]])
  return { Z, F: [960, 660], pan, tilt }
}
export function skyCam(t) {
  const k = ease.inOutCubic(prog(t, T.tilt0, T.tilt1))
  const zoom = lerp(lerp(0.88, 0.9, prog(t, 0, T.tilt0)), 1, k)
  const dy = lerp(-90, 0, k)
  return { zoom, dx: 0, dy, dim: lerp(0.8, 1, ease.inOutQuad(prog(t, T.tilt0 + 0.3, T.tilt1 - 0.05))), desat: lerp(0.42, 0, ease.inOutQuad(prog(t, T.tilt0 + 0.2, T.tilt1 - 0.1))),
    moon: { x: 960 + (MOON.x - 960) * zoom, y: 540 + (MOON.y - 540) * zoom + dy, r: MOON.r * zoom, phase: MOON.phase, alpha: 1 } }
}
/** the hero windows' screen rects (layer 'down'), drawn a bit larger than their neighbours */
export function heroRect(t, which) {
  const w = which === 'A' ? CITY.HA : CITY.HB
  const c = cam(t), L = CITY.layers[2], Tr = camLayer(c, L.f)
  const cx = (w.x + w.w / 2) * Tr.s + Tr.ox, cy = (w.y + w.h / 2) * Tr.s + Tr.oy
  const ww = 9 * Tr.s, hh = 10.5 * Tr.s
  return { x: cx - ww / 2, y: cy - hh / 2, w: ww, h: hh, cx, cy, s: Tr.s }
}
const ROOM_A = { x: 300, y: 470, w: RW, h: RH }, ROOM_B = { x: 1250, y: 450, w: RW, h: RH }
const WARM_W = [255, 198, 132], COLD_W = [176, 194, 255]

// ── sound
const typeTicks = (txt, t0, per, g) => [...txt].map((ch, i) => ch === ' ' ? null : ['tick', +(t0 + i * per).toFixed(3), g]).filter(Boolean)
export const CUES = [
  ['whoosh', 0.0, 1.6, 0.035],
  ...typeTicks('HOUSTON, 11:48 PM', 0.45, 0.04, 0.022),
  ['bell', T.hookA, 392, 0.04, 2.0, -0.25],
  ['bell', T.hookB, 587.33, 0.04, 2.0, 0.2],
  ['bell', T.glintA, 1174.66, 0.025, 1.4, -0.5],
  ['bell', T.glintB, 1396.91, 0.025, 1.4, 0.5],
  ['whoosh', T.openA - 0.05, 1.0, 0.06],
  ['bell', T.moon + 0.05, 659.25, 0.05, 2.6, 0.35],
  ['glitter', T.moon, T.moon + 0.9],
  ['bell', T.never, 220, 0.045, 2.4, 0],
  ...SWIPES_A.map(s => ['whoosh', s, 0.28, 0.022]), ...SWIPES_B.map(s => ['whoosh', s, 0.28, 0.02]),
  ['whoosh', T.closeA, 0.8, 0.045],
  ...CITY.dyn.filter((d, i) => d.li === 3).filter((d, i) => i % 3 === 0).slice(0, 16).map((d, i) => ['tick', +d.off.toFixed(3), 0.018]),
  ['bell', T.city1, 293.66, 0.035, 2.2, -0.2],
  ['riser', T.tilt0 - 0.3, T.H, 0.045],
  ['whoosh', T.tilt0, 1.5, 0.05],
]

export const SCENES = [async (stage) => {
  bakeCity(); getSky()
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: C.void }, stage)
  const canvas = (style = {}) => { const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', ...style }, root); c.width = W; c.height = H; return c }
  const skyC = canvas(), sx = skyC.getContext('2d')
  const cityC = canvas(), cx = cityC.getContext('2d')
  const rooms = el('div', { position: 'absolute', inset: 0 }, root)
  const roomA = makeRoom(rooms, { src: IMG + 'juniper.jpg', pos: '48% 34%', zoom: 1.5, mask: 'radial-gradient(36% 40% at 52% 56%, #000 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.12) 100%)', warm: true, phoneSide: 'r', seed: 11, cards: [PEOPLE[3], PEOPLE[8], PEOPLE[5], PEOPLE[1], PEOPLE[6]] })
  const roomB = makeRoom(rooms, { src: IMG + 'people/p6.jpg', pos: '55% 22%', zoom: 1.3, mirror: true, warm: false, phoneSide: 'l', seed: 23, cards: [PEOPLE[2], PEOPLE[11], PEOPLE[4], PEOPLE[0], PEOPLE[6]] })
  const fxC = canvas(), fx = fxC.getContext('2d')     // hero glints, over the rooms
  const grainC = canvas({ mixBlendMode: 'overlay', opacity: GRAIN_OPACITY, pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── type (above the grain)
  const shade = '0 2px 30px rgba(11,6,32,0.9), 0 0 60px rgba(11,6,32,0.55)'
  const stmt = (txt, style) => el('div', { position: 'absolute', fontFamily: SERIF, fontStyle: 'italic', lineHeight: '1', letterSpacing: '-0.01em', color: C.bone, whiteSpace: 'nowrap', opacity: 0, textShadow: shade, ...style }, root, txt)
  const pocket = (style) => el('div', { position: 'absolute', opacity: 0, background: 'radial-gradient(50% 50% at 50% 50%, rgba(11,6,32,0.55), rgba(11,6,32,0.25) 60%, rgba(11,6,32,0) 100%)', ...style }, root)
  const pk1 = pocket({ left: '20px', top: '110px', width: '980px', height: '480px' })
  const eyebrow = el('div', { position: 'absolute', left: '152px', top: '206px', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 12px rgba(11,6,32,0.9)', whiteSpace: 'pre' }, root)
  const EB = 'HOUSTON, 11:48 PM'
  const ebChars = [...EB].map(ch => el('span', { opacity: 0 }, eyebrow, ch))
  const two = stmt('Two people.', { left: '142px', top: '256px', fontSize: '124px' })
  const city = stmt('Same city.', { left: '142px', top: '388px', fontSize: '124px' })
  const pk2 = pocket({ left: '560px', top: '40px', width: '800px', height: '300px' })
  const same = stmt('Same moon.', { left: '0', width: W + 'px', textAlign: 'center', top: '118px', fontSize: '112px' })
  const never = stmt('Never met.', { left: '0', width: W + 'px', textAlign: 'center', top: '118px', fontSize: '112px' })
  const pk3 = pocket({ left: '20px', top: '60px', width: '1100px', height: '420px' })
  const full1 = stmt('A city full of people', { left: '148px', top: '150px', fontSize: '100px' })
  const full2 = stmt('you’ll never meet.', { left: '148px', top: '262px', fontSize: '100px' })
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }, root)

  const fadeLine = (e, t, t0, t1, rise = 18) => {
    const a = ease.outCubic(prog(t, t0, t0 + 0.55)) * (1 - ease.inQuad(prog(t, t1, t1 + 0.28)))
    e.style.opacity = String(a)
    e.style.transform = `translateY(${(1 - ease.outCubic(prog(t, t0, t0 + 0.7))) * rise}px)`
    e.style.filter = `blur(${(1 - ease.outCubic(prog(t, t0, t0 + 0.45))) * 6}px)`
    return a
  }

  // ── the city
  function drawCity(t, c) {
    cx.clearRect(0, 0, W, H)
    const Ls = CITY.layers
    // light pollution glow behind the skyline (far-layer space)
    {
      const Tr = camLayer(c, Ls[0].f), y = (v) => v * Tr.s + Tr.oy
      const g = cx.createLinearGradient(0, y(430), 0, y(860))
      g.addColorStop(0, 'rgba(110,80,180,0)'); g.addColorStop(0.55, 'rgba(118,86,186,0.2)'); g.addColorStop(0.85, 'rgba(150,104,170,0.34)'); g.addColorStop(1, 'rgba(196,120,120,0.3)')
      cx.fillStyle = g; cx.fillRect(0, y(430), W, y(860) - y(430))
      // warm sky glow behind downtown
      const gx0 = 960 * Tr.s + Tr.ox, gy0 = 720 * Tr.s + Tr.oy, gr = 700 * Tr.s
      const wg = cx.createRadialGradient(gx0, gy0, 0, gx0, gy0, gr)
      wg.addColorStop(0, 'rgba(255,170,140,0.18)'); wg.addColorStop(0.5, 'rgba(255,150,140,0.07)'); wg.addColorStop(1, 'rgba(255,150,140,0)')
      cx.fillStyle = wg; cx.fillRect(gx0 - gr, gy0 - gr, gr * 2, gr * 2)
    }
    const band = (L, a) => {
      const Tr = camLayer(c, L.f), y0 = (L.base - 150) * Tr.s + Tr.oy, y1 = (L.base + 30) * Tr.s + Tr.oy
      const g = cx.createLinearGradient(0, y0, 0, y1)
      g.addColorStop(0, rgba(L.haze, 0)); g.addColorStop(0.75, rgba(L.haze, a)); g.addColorStop(1, rgba(L.haze, a * 0.6))
      cx.fillStyle = g; cx.fillRect(0, y0, W, y1 - y0)
    }
    drawLayer(cx, c, Ls[0]); drawDynamic(t, c, [0]); band(Ls[0], 0.4)
    drawLayer(cx, c, Ls[1]); band(Ls[1], 0.3)
    drawLayer(cx, c, Ls[2]); band(Ls[2], 0.22)
    drawDynamic(t, c, [1, 2])
    drawLayer(cx, c, Ls[3])
    drawDynamic(t, c, [3])
    drawFreeway(cx, c, t)
    { // ground fog between the near blocks and the foreground
      const Tr = camLayer(c, Ls[3].f), y0 = 880 * Tr.s + Tr.oy, y1 = 1000 * Tr.s + Tr.oy
      const g = cx.createLinearGradient(0, y0, 0, y1)
      g.addColorStop(0, 'rgba(150,120,200,0)'); g.addColorStop(0.55, 'rgba(150,120,200,0.25)'); g.addColorStop(1, 'rgba(150,120,200,0.12)')
      cx.fillStyle = g; cx.fillRect(0, y0, W, y1 - y0)
    }
    drawLayer(cx, c, Ls[4])
    drawStreetLamps(cx, c, t)
  }
  // windows that live: flickering screens, the ones that go dark one by one, aviation beacons
  function drawDynamic(t, c, lis) {
    for (const d of CITY.flick) if (lis.includes(d.li)) {
      const on = 1 - prog(t, d.off, d.off + 0.18)
      if (on <= 0) continue
      const r = winRect(c, d.li, d.w), n = noise1(t * d.sp, d.seed)
      cx.fillStyle = rgba([150 + 60 * n, 170 + 50 * n, 255], (0.45 + 0.4 * n) * on); cx.fillRect(r.x, r.y, r.w, r.h)
    }
    for (const d of CITY.dyn) if (lis.includes(d.li)) {
      const r = winRect(c, d.li, d.w)
      const on = 1 - ease.inQuad(prog(t, d.off, d.off + 0.18))
      if (on > 0) {
        const a = d.w.a * [0.6, 0.8, 0.9, 0.95][d.li] * on
        if (d.li >= 2) { const m = r.w * 0.6; cx.fillStyle = rgba(d.w.col, a * 0.12); cx.fillRect(r.x - m, r.y - m, r.w + 2 * m, r.h + 2 * m) }
        cx.fillStyle = rgba(d.w.col, a); cx.fillRect(r.x, r.y, r.w, r.h)
        if (d.w.person) { const px = r.x + r.w * (0.5 + 0.18 * d.w.person), py = r.y + r.h
          cx.fillStyle = `rgba(14,9,30,${0.82 * on})`
          cx.beginPath(); cx.arc(px, py - r.h * 0.56, r.w * 0.13, 0, Math.PI * 2); cx.fill()
          cx.beginPath(); cx.ellipse(px, py, r.w * 0.26, r.h * 0.34, 0, Math.PI, 0); cx.fill() }
      }
      if (d.phone && t > d.off) { const n = noise1(t * 6, d.off * 100); cx.fillStyle = rgba([140, 165, 255], (0.18 + 0.2 * n) * prog(t, d.off + 0.15, d.off + 0.6)); cx.fillRect(r.x + r.w * 0.2, r.y + r.h * 0.45, r.w * 0.6, r.h * 0.5) }
    }
    for (const b of CITY.beacons) if (lis.includes(b.li)) {
      const on = ((t + b.ph * 2.4) % 2.4) < 0.5 ? Math.sin(Math.PI * (((t + b.ph * 2.4) % 2.4) / 0.5)) : 0
      if (on <= 0) continue
      const Tr = camLayer(c, CITY.layers[b.li].f), x = b.x * Tr.s + Tr.ox, y = b.y * Tr.s + Tr.oy, R = 7 * Tr.s
      const g = cx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, `rgba(255,90,90,${0.75 * on})`); g.addColorStop(0.3, `rgba(255,60,70,${0.25 * on})`); g.addColorStop(1, 'rgba(255,60,70,0)')
      cx.fillStyle = g; cx.fillRect(x - R, y - R, R * 2, R * 2)
    }
    if (lis.includes(2)) { drawHero(t, 'A'); drawHero(t, 'B') }
  }
  // hero windows: A warm lamp, B cold; after the rooms close, both glow only with a phone's cold light
  const heroCol = (t, which) => {
    const cold = ease.inOutQuad(prog(t, which === 'A' ? T.phoneA : T.phoneB, (which === 'A' ? T.phoneA : T.phoneB) + 0.8))
    const base = which === 'A' ? WARM_W : [214, 222, 255]
    return base.map((v, i) => Math.round(lerp(v, COLD_W[i], cold)))
  }
  function drawHero(t, which) {
    const r = heroRect(t, which), col = heroCol(t, which)
    const lift = ease.inOutQuad(prog(t, 2.5, 3.6))          // the two windows find us
    const after = prog(t, 10.6, 11.4)
    const breath = 0.85 + 0.15 * Math.sin(t * 2.2 + (which === 'A' ? 0 : 1.7))
    const a = (0.88 + 0.12 * lift) * (1 - 0.1 * after) * (after > 0 ? breath : 1)
    const halo = 1 - prog(t, T.openA, T.openA + 0.4) * (1 - prog(t, (which === 'A' ? T.closeA : T.closeB) + 0.3, (which === 'A' ? T.closeA : T.closeB) + T.CLOSE))
    const G = r.w * (2.6 + 3 * lift + 1.5 * after)
    const g = cx.createRadialGradient(r.cx, r.cy, 0, r.cx, r.cy, G)
    g.addColorStop(0, rgba(col, (0.45 + 0.25 * after) * a * halo)); g.addColorStop(0.3, rgba(col, 0.14 * a * halo)); g.addColorStop(1, rgba(col, 0))
    cx.fillStyle = g; cx.fillRect(r.cx - G, r.cy - G, G * 2, G * 2)
    cx.fillStyle = rgba(col, a); cx.fillRect(r.x, r.y, r.w, r.h)
    // a figure in the window
    cx.fillStyle = 'rgba(16,10,32,0.7)'
    const px = r.x + r.w * (which === 'A' ? 0.62 : 0.38), py = r.y + r.h
    cx.beginPath(); cx.arc(px, py - r.h * 0.55, r.w * 0.13, 0, Math.PI * 2); cx.fill()
    cx.beginPath(); cx.ellipse(px, py, r.w * 0.24, r.h * 0.32, 0, Math.PI, 0); cx.fill()
  }
  // a gold glint (the only gold in this half)
  function glint(ctx, x, y, t, t0, size) {
    const p = prog(t, t0, t0 + 0.7)
    if (p <= 0 || p >= 1) return
    const a = Math.sin(Math.PI * p), s = size * (0.6 + 0.6 * a)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(p * 0.5)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.5); g.addColorStop(0, `rgba(255,236,190,${0.9 * a})`); g.addColorStop(0.3, `rgba(242,199,92,${0.35 * a})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    ctx.fillStyle = g; ctx.fillRect(-s, -s, s * 2, s * 2)
    for (const [dx, dy] of [[1, 0], [0, 1]]) {
      const l = ctx.createLinearGradient(-dx * s, -dy * s, dx * s, dy * s)
      l.addColorStop(0, 'rgba(242,199,92,0)'); l.addColorStop(0.5, `rgba(255,232,170,${0.85 * a})`); l.addColorStop(1, 'rgba(242,199,92,0)')
      ctx.fillStyle = l; dx ? ctx.fillRect(-s, -1, s * 2, 2) : ctx.fillRect(-1, -s, 2, s * 2)
    }
    ctx.restore()
  }

  const roomState = (t, which) => {
    const tO = which === 'A' ? T.openA : T.openB, tC = which === 'A' ? T.closeA : T.closeB
    const openP = ease.inOutCubic(prog(t, tO, tO + T.OPEN)), closeP = ease.inOutCubic(prog(t, tC, tC + T.CLOSE))
    const open = openP * (1 - closeP)
    const hr = heroRect(t, which), fin = which === 'A' ? ROOM_A : ROOM_B
    // the box grows from the lit window to the room (outCubic on size, a slight arc on position)
    const rect = { x: lerp(hr.x, fin.x, open), y: lerp(hr.y, fin.y, open), w: lerp(hr.w, fin.w, open), h: lerp(hr.h, fin.h, open) }
    const visible = t >= tO && t < tC + T.CLOSE
    const alpha = visible ? Math.min(clamp((t - tO) / 0.25), 1 - prog(t, tC + T.CLOSE - 0.06, tC + T.CLOSE)) : 0
    const tp = which === 'A' ? T.phoneA : T.phoneB
    return {
      rect, open, alpha,
      phoneIn: prog(t, tp, tp + 0.55),
      phoneLight: which === 'A' ? ease.inOutQuad(prog(t, tp, tp + 0.7)) : 0.38 + 0.62 * ease.inOutQuad(prog(t, tp, tp + 0.7)),
      lampOn: which === 'A' ? 1 - 0.65 * ease.inOutQuad(prog(t, tp + 0.2, tp + 1.2)) : 1,
      swipes: which === 'A' ? SWIPES_A : SWIPES_B,
      push: prog(t, tO, tC),
      washCol: rgba(heroCol(t, which), 1),
      rise: ease.inOutQuad(prog(t, T.moon - 0.15, T.moon + 1.3)),
    }
  }

  return {
    start: 0, end: T.end, root,
    update(t) {
      const sc = skyCam(t), c = cam(t)
      // sky (opaque) — exactly drawSky at H; a cold, desaturated city sky before the crane-up
      drawSky(sx, t, { zoom: sc.zoom, dx: sc.dx, dy: sc.dy, dim: sc.dim, moon: sc.moon })
      if (sc.desat > 0.001) {
        sx.save(); sx.globalCompositeOperation = 'saturation'; sx.globalAlpha = sc.desat; sx.fillStyle = '#808080'; sx.fillRect(0, 0, W, H)
        sx.globalCompositeOperation = 'source-over'; sx.globalAlpha = sc.desat * 0.35; sx.fillStyle = '#0a0a2a'; sx.fillRect(0, 0, W, H); sx.restore()
        // keep the moon itself bright and clean over the dimming
        if (sc.moon) { sx.save(); sx.beginPath(); sx.arc(sc.moon.x, sc.moon.y, sc.moon.r * 1.02, 0, Math.PI * 2); sx.clip(); drawSky(sx, t, { zoom: sc.zoom, dx: sc.dx, dy: sc.dy, dim: sc.dim, moon: sc.moon }); sx.restore() }
      }
      // "Same moon.": the moon is featured with a soft glow
      const mg = ease.inOutQuad(prog(t, T.moon - 0.2, T.moon + 0.6)) * (1 - ease.inOutQuad(prog(t, T.moonOut - 0.05, T.moonOut + 0.6)))
      if (mg > 0) {
        const m = sc.moon, R = m.r * 4, g = sx.createRadialGradient(m.x, m.y, m.r * 0.8, m.x, m.y, R)
        g.addColorStop(0, `rgba(244,234,216,${0.35 * mg})`); g.addColorStop(0.3, `rgba(214,200,240,${0.12 * mg})`); g.addColorStop(1, 'rgba(201,188,228,0)')
        sx.save(); sx.globalCompositeOperation = 'screen'; sx.fillStyle = g; sx.fillRect(m.x - R, m.y - R, R * 2, R * 2); sx.restore()
      }
      // city
      const rooms = Math.max(ease.inOutQuad(prog(t, T.openA, T.openA + T.OPEN)) * (1 - ease.inOutQuad(prog(t, T.closeA, T.closeB + T.CLOSE))), 0)
      const findUs = ease.inOutQuad(prog(t, 2.6, 3.7)) * (1 - prog(t, T.openA, T.openA + 0.6))
      if (t < T.H) {
        cityC.style.display = 'block'
        drawCity(t, c)
        cityC.style.filter = `brightness(${(1 - 0.3 * rooms - 0.12 * findUs).toFixed(3)}) blur(${(0.8 * rooms).toFixed(2)}px)`
      } else cityC.style.display = 'none'
      // rooms
      roomA.update(t, roomState(t, 'A')); roomB.update(t, roomState(t, 'B'))
      // glints over the two windows as they find us
      fx.clearRect(0, 0, W, H)
      if (t < T.openA + 0.2) { const a = heroRect(t, 'A'), b = heroRect(t, 'B'); glint(fx, a.cx, a.cy, t, T.glintA, 46); glint(fx, b.cx, b.cy, t, T.glintB, 46) }
      // grain
      gx.clearRect(0, 0, W, H); drawGrain(gx, t)
      // a finer grain on the two faces while the rooms are open (the faces must read)
      for (const [which, R] of [['A', ROOM_A], ['B', ROOM_B]]) {
        const st = roomState(t, which), k = st.open * st.alpha
        if (k <= 0.01) continue
        const cxr = R.x + R.w * 0.5, cyr = R.y + R.h * 0.5, rr = R.h * 0.55
        const g = gx.createRadialGradient(cxr, cyr, 0, cxr, cyr, rr)
        g.addColorStop(0, `rgba(0,0,0,${0.5 * k})`); g.addColorStop(0.6, `rgba(0,0,0,${0.4 * k})`); g.addColorStop(1, 'rgba(0,0,0,0)')
        gx.save(); gx.globalCompositeOperation = 'destination-out'; gx.fillStyle = g; gx.fillRect(cxr - rr, cyr - rr, rr * 2, rr * 2); gx.restore()
      }
      // type
      ebChars.forEach((s, i) => { s.style.opacity = String(ease.outQuad(prog(t, 0.45 + i * 0.04, 0.45 + i * 0.04 + 0.2)) * (1 - prog(t, T.hookOut, T.hookOut + 0.28))) })
      const h1 = fadeLine(two, t, T.hookA, T.hookOut), h2 = fadeLine(city, t, T.hookB, T.hookOut + 0.04)
      pk1.style.opacity = String(Math.max(h1, h2, prog(t, 0.3, 0.8) * (1 - prog(t, T.hookOut, T.hookOut + 0.3))))
      const s1 = fadeLine(same, t, T.moon, T.moonOut), s2 = fadeLine(never, t, T.never, T.neverOut)
      pk2.style.opacity = String(Math.max(s1, s2))
      const f1 = fadeLine(full1, t, T.city1, T.cityOut), f2 = fadeLine(full2, t, T.city2, T.cityOut + 0.04)
      pk3.style.opacity = String(Math.max(f1, f2) * 0.9)
      black.style.opacity = String(1 - ease.outQuad(prog(t, 0, 0.45)))
    },
  }
}]
