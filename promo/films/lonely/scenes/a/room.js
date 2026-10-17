// lonely · A1 + A3 · THE ROOM (0–4.0, then 12.9–15.2). 2am. A dark room, the only light a phone held low, lighting a
// face from below; behind him a tall window: distant city lights in the lower panes, the ONE moon in the upper right
// pane. A3 is the same room with the phone dark: the camera pushes through the moon's pane until the pane IS the frame,
// the cold sky warming into the Align sky. From 14.8 this scene paints exactly H: drawSky(zoom 1, dx 0, dy 0, dim 1,
// moon (1716,122) r52 phase .12) + grain 0.5, nothing else.
import { clamp, lerp, prog, ease, rng, noise1, el } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky } from '../../../sky.js'
import { T, MOON, cnv, canvasLayer, grain, faceCanvases } from './shared.js'

// ── the set, in room coordinates (camera scale 1 = the wide)
const WIN = { x0: 1080, y0: -90, x1: 1920, y1: 790 }                   // casing
const PANES = [[1120, -60, 1482, 393], [1506, -60, 1880, 393], [1120, 417, 1482, 756], [1506, 417, 1880, 756]]
const UR = PANES[1]
const HORIZON = 590
const FACE_AT = { x: 560, y: 600, k: 2.7 }    // p4 (168,142) lands here, photo drawn at 2.7×
const PHONE = { x: 552, y: 1075, w: 220, h: 300, rot: -0.07 }

// ── camera: screen = q + s·(room − q)
const PUSH_Q = { x: 1836, y: 120 }, PUSH_S = 6.6
function cam(t) {
  if (t < T.roomBack) {                          // A1: a slow creep toward his face
    const u = ease.inOutQuad(prog(t, 0, T.phoneIn))
    return { s: 1.1 + 0.055 * u, qx: 900, qy: 600 }
  }
  // A3: a held breath (a slow creep), then the push through the moon's pane, settling as the pane becomes the frame
  const f = 0.06 * ease.outQuad(prog(t, T.roomBack, 13.6)) + 0.94 * ease.inOutCubic(prog(t, 13.3, T.sky))
  return { s: Math.exp(Math.log(PUSH_S) * f), qx: PUSH_Q.x, qy: PUSH_Q.y }
}
/** how far the sky has turned from cold room-glass to the Align sky (0 → 1 by T.sky) */
const warm = t => t < T.roomBack ? 0 : ease.inOutQuad(prog(t, 13.75, T.sky))

// ── the city: a far skyline with a few hundred lit windows (pre-rendered 2×), lights that go out one by one
function buildCity() {
  const S = 2, x0 = 1100, x1 = 1900, w = (x1 - x0) * S, h = (800 - 400) * S
  const c = cnv(w, h), x = c.getContext('2d'), r = rng(8128)
  const Y = y => (y - 400) * S, X = v => (v - x0) * S
  // light-pollution haze glowing up from behind the skyline (cold, desaturated sodium)
  const g = x.createLinearGradient(0, Y(430), 0, Y(HORIZON + 30))
  g.addColorStop(0, 'rgba(70,80,104,0)'); g.addColorStop(0.6, 'rgba(96,100,116,0.35)'); g.addColorStop(1, 'rgba(132,120,108,0.6)')
  x.fillStyle = g; x.fillRect(0, 0, w, h)
  const lights = [], reds = []
  const LAYERS = [
    { base: HORIZON + 6, wMin: 22, wMax: 50, hMin: 30, hMax: 90, col: '#151a24', lw: 2, lh: 2.5, gx: 6, gy: 7, lit: 0.22, a: [0.25, 0.5] },
    { base: HORIZON + 40, wMin: 40, wMax: 80, hMin: 60, hMax: 170, col: '#0c1018', lw: 3, lh: 4, gx: 9, gy: 11, lit: 0.16, a: [0.3, 0.65] },
    { base: HORIZON + 120, wMin: 70, wMax: 130, hMin: 120, hMax: 260, col: '#06080c', lw: 5, lh: 6, gx: 14, gy: 17, lit: 0.1, a: [0.35, 0.8] },
  ]
  for (const L of LAYERS) {
    let bx = x0 - 30 + r() * 30
    while (bx < x1) {
      const bw = L.wMin + r() * (L.wMax - L.wMin)
      const bh = (L.hMin + r() * (L.hMax - L.hMin)) * (r() < 0.12 ? 1.5 : 1)
      const top = L.base - bh
      x.fillStyle = L.col
      x.fillRect(X(bx), Y(top), bw * S, (800 - top) * S)
      // a faint lit rim along the roofline (haze behind it)
      x.fillStyle = 'rgba(150,160,185,0.08)'; x.fillRect(X(bx), Y(top), bw * S, S)
      if (r() < 0.25) reds.push({ x: bx + bw / 2, y: top - 3, ph: r() * 6 })
      // windows on a regular grid: some buildings mostly asleep, a few floors still up
      const lit = r() < 0.25 ? 0.02 : L.lit * (0.4 + r() * 1.2)
      const warmBias = r()
      for (let wy = top + L.gy * 0.7; wy < 790; wy += L.gy) {
        const floorOn = r() < 0.7
        for (let wx = bx + L.gx * 0.5; wx < bx + bw - L.lw - 2; wx += L.gx) {
          if (!floorOn || r() > lit) continue
          const warmL = r() < 0.4 + warmBias * 0.5
          lights.push({ x: wx, y: wy, w: L.lw, h: L.lh, col: warmL ? [232, 196, 140] : [196, 210, 236], a: L.a[0] + r() * (L.a[1] - L.a[0]), off: r() < 0.05 ? 0.5 + r() * 3.3 : null })
        }
      }
      bx += bw + (r() < 0.35 ? 4 + r() * 18 : 0)
    }
  }
  return { draw(ctx, t, toScr, s) {
    const [cx, cy] = toScr(x0, 400)
    ctx.drawImage(c, cx, cy, (w / S) * s, (h / S) * s)
    for (const L of lights) {
      let a = L.a
      if (L.off != null) a *= 1 - prog(t, L.off, L.off + 0.08)   // a few windows go dark during A1 (and stay dark)
      if (a <= 0.01) continue
      const [sx, sy] = toScr(L.x, L.y)
      ctx.fillStyle = `rgba(${L.col[0]},${L.col[1]},${L.col[2]},${a.toFixed(3)})`
      ctx.fillRect(sx, sy, Math.max(1, L.w * s), Math.max(1, L.h * s))
    }
    for (const R of reds) {      // slow red beacons on the tallest roofs
      const a = 0.25 + 0.55 * Math.max(0, Math.sin(t * 2.2 + R.ph))
      const [sx, sy] = toScr(R.x, R.y)
      ctx.fillStyle = `rgba(220,70,60,${a.toFixed(3)})`; ctx.fillRect(sx - 1.5 * s, sy - 1.5 * s, 3 * s, 3 * s)
    }
  } }
}

export default async function build(stage) {
  const root = fill(stage, { background: '#05060a' })
  const main = canvasLayer(root), ctx = main.getContext('2d')
  const skyC = cnv(W, H), sx = skyC.getContext('2d')
  const face = await faceCanvases()
  const city = buildCity()
  const gr = grain(root, 0.5)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', opacity: 0, pointerEvents: 'none' }, root)

  function drawRoom(t) {
    const { s, qx, qy } = cam(t)
    const P = (x, y) => [qx + s * (x - qx), qy + s * (y - qy)]
    const R = (r) => { const [a, b] = P(r[0], r[1]); return [a, b, (r[2] - r[0]) * s, (r[3] - r[1]) * s] }
    const w = warm(t)
    const lit = t < T.roomBack ? 1 : 0   // the phone is on in A1, dark in A3

    // 1 · the sky behind the glass (screen-fixed: it is at infinity), cold → Align
    drawSky(sx, t, { zoom: lerp(0.965, 1, w), dx: 0, dy: 0, dim: lerp(0.8, 1, w), moon: MOON })
    ctx.save()
    ctx.filter = w >= 1 ? 'none' : `saturate(${lerp(0.16, 1, w).toFixed(3)}) brightness(${lerp(1, 1, w).toFixed(3)}) contrast(${lerp(1.08, 1, w).toFixed(3)})`
    ctx.drawImage(skyC, 0, 0)
    ctx.restore()
    if (w < 1) {        // a cold blue cast on the glass
      ctx.save(); ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = 0.4 * (1 - w)
      ctx.fillStyle = '#2c4a78'; ctx.fillRect(0, 0, W, H); ctx.restore()
    }

    // 2 · the city, seen through the two lower panes (parallax: further than the room)
    const sc = Math.pow(s, 0.8)
    const PC = (x, y) => [qx + s * (1060 - qx) + sc * (x - 1060), qy + s * (HORIZON - qy) + sc * (y - HORIZON)]
    ctx.save()
    ctx.beginPath(); for (const p of [PANES[2], PANES[3]]) { const [a, b, c2, d] = R(p); ctx.rect(a, b, c2, d) }
    ctx.clip()
    city.draw(ctx, t, PC, sc)
    ctx.restore()

    // 3 · the glass: faint cool sheen
    for (const p of PANES) {
      const [a, b, c2, d] = R(p)
      const g = ctx.createLinearGradient(a, b, a + c2, b + d)
      g.addColorStop(0, 'rgba(150,170,210,0.05)'); g.addColorStop(0.5, 'rgba(150,170,210,0.0)'); g.addColorStop(1, 'rgba(150,170,210,0.03)')
      ctx.fillStyle = g; ctx.fillRect(a, b, c2, d)
    }

    // 4 · the wall (everything but the panes), the casing, mullions, sill
    ctx.save()
    ctx.beginPath(); ctx.rect(-10, -10, W + 20, H + 20)
    for (const p of PANES) { const [a, b, c2, d] = R(p); ctx.rect(a, b, c2, d) }
    ctx.clip('evenodd')
    const [fx, fy] = P(560, 560)
    const wg = ctx.createRadialGradient(fx, fy, 40 * s, fx, fy, 1500 * s)
    wg.addColorStop(0, '#323c5a'); wg.addColorStop(0.5, '#232a3e'); wg.addColorStop(1, '#151925')
    ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H)
    // moonlight scattering around the window onto the wall
    const [mx, my] = P(1500, 360)
    const mg = ctx.createRadialGradient(mx, my, 200 * s, mx, my, 900 * s)
    mg.addColorStop(0, 'rgba(120,140,180,0.2)'); mg.addColorStop(1, 'rgba(120,140,180,0)')
    ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H)
    // casing + muntins
    const frame = (r, col) => { const [a, b, c2, d] = R(r); ctx.fillStyle = col; ctx.fillRect(a, b, c2, d) }
    ctx.globalAlpha = 1
    frame([WIN.x0, WIN.y0, WIN.x1, WIN.y1], 'rgba(18,22,30,0.9)')
    frame([1482, -90, 1506, 760], '#0f131a'); frame([1100, 393, 1900, 417], '#0f131a')
    // moonlit edges (top/left lips of the bars, the sill)
    ctx.fillStyle = 'rgba(170,190,228,0.16)'
    for (const r of [[1482, -90, 1484.5, 760], [1100, 393, 1900, 395.5], [1100, -90, 1120, 760]]) { const [a, b, c2, d] = R(r); ctx.fillRect(a, b, Math.max(1, c2), Math.max(1, d)) }
    frame([1060, 756, 1940, 792], '#141924')
    ctx.fillStyle = 'rgba(180,198,232,0.22)'; { const [a, b, c2] = R([1060, 756, 1940, 758.5]); ctx.fillRect(a, b, c2, Math.max(1.5, 2.5 * s)) }
    ctx.restore()

    // 5 · him. Phone light from below in A1 (with the scroll flicker), only the moon's rim in A3
    const [px, py] = P(FACE_AT.x, FACE_AT.y), k = FACE_AT.k * s
    const breathe = 1 + 0.004 * Math.sin(t * 1.7)
    const fw = 342 * k * breathe, fh = 366 * k * breathe
    const fx0 = px - 168 * k * breathe, fy0 = py - 142 * k * breathe
    const flick = 0.9 + 0.1 * noise1(t * 3.1, 7) + 0.06 * Math.max(0, noise1(t * 11, 3) - 0.5)
    ctx.globalAlpha = 1
    ctx.drawImage(face.dark, fx0, fy0, fw, fh)
    if (lit > 0) { ctx.globalAlpha = lit * flick; ctx.drawImage(face.lit, fx0, fy0, fw, fh); ctx.globalAlpha = 1 }

    // 6 · the phone, back to us, at his chest; its screen light spills up over his chin
    const [hx, hy] = P(PHONE.x, PHONE.y)
    if (lit > 0) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      const gg = ctx.createRadialGradient(hx, hy - 120 * s, 10 * s, hx, hy - 120 * s, 520 * s)
      gg.addColorStop(0, `rgba(96,140,230,${0.2 * flick})`); gg.addColorStop(0.45, `rgba(70,110,200,${0.07 * flick})`); gg.addColorStop(1, 'rgba(60,90,180,0)')
      ctx.fillStyle = gg; ctx.fillRect(hx - 600 * s, hy - 700 * s, 1200 * s, 1000 * s)
      ctx.restore()
    }
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(PHONE.rot); ctx.scale(s, s)
    const pg = ctx.createLinearGradient(-PHONE.w / 2, 0, PHONE.w / 2, 0)
    pg.addColorStop(0, '#0a0c11'); pg.addColorStop(0.5, '#060709'); pg.addColorStop(1, '#030405')
    ctx.fillStyle = pg; roundRect(ctx, -PHONE.w / 2, -PHONE.h / 2, PHONE.w, PHONE.h, 34); ctx.fill()
    ctx.strokeStyle = 'rgba(120,140,180,0.12)'; ctx.lineWidth = 2; roundRect(ctx, -PHONE.w / 2 + 1, -PHONE.h / 2 + 1, PHONE.w - 2, PHONE.h - 2, 33); ctx.stroke()
    if (lit > 0) {     // screen light catching the top rim
      ctx.strokeStyle = `rgba(150,185,255,${0.55 * flick})`; ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(-PHONE.w / 2 + 26, -PHONE.h / 2 + 1); ctx.lineTo(PHONE.w / 2 - 26, -PHONE.h / 2 + 1); ctx.stroke()
      // a feathered spill just above the top edge (no hard box)
      ctx.save(); ctx.translate(0, -PHONE.h / 2 - 8); ctx.scale(1, 0.5)
      const lg = ctx.createRadialGradient(0, 0, 0, 0, 0, 140)
      lg.addColorStop(0, `rgba(120,160,255,${0.12 * flick})`); lg.addColorStop(1, 'rgba(120,160,255,0)')
      ctx.fillStyle = lg; ctx.fillRect(-140, -140, 280, 280); ctx.restore()
    }
    ctx.restore()

    // 7 · lens: a soft vignette (fades out as the pane takes the frame)
    const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1150)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${0.4 * (1 - w)})`)
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H)
  }

  return {
    start: 0, end: T.end, root,
    update(t) {
      // the phone close-up covers 4.0–12.9; this scene only paints the room either side of it
      const vis = t < T.phoneIn || t >= T.roomBack
      main.style.display = vis ? 'block' : 'none'
      if (!vis) { gr.update(t); return }
      if (t >= T.sky) {
        // H: exactly the Align sky + grain 0.5, nothing else
        drawSky(ctx, t, { zoom: 1, dx: 0, dy: 0, dim: 1, moon: MOON })
        gr.update(t, 0.5)
        black.style.opacity = '0'
        return
      }
      drawRoom(t)
      gr.update(t, 0.5)
      // open from black (0–0.7)
      black.style.opacity = String(t < 1 ? 1 - ease.outQuad(prog(t, 0.05, 0.75)) : 0)
    },
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}
