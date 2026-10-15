// ─────────────────────────────────────────────── F4 · EVERYONE GETS A CHANCE (10.5–15.2)
// Picks up f3's last frame exactly: Juniper's veiled card, body 322×515 centred at (960, 540), same sky.
// The card becomes the top of a deck that deals a sea of veiled mystery cards out across the sky: each one
// leaves face-down (card-back), flips to its aura veil mid-flight and settles into a slowly turning 3D spiral
// galaxy. Constellation hairlines draw between neighbours as they land; pixel stars twinkle on the joints.
// No faces anywhere. Copy: "No snap judgements." → "Everyone gets a chance."
// Handoff to f5 (15.0): the galaxy dims and recedes; two cards drift to centre and face each other —
// Juniper (veiled, card-profile-3) body centre (790, 480), body 263×420, yaw +8°; your card (card-sign, Hakeem ·
// Taurus) body centre (1130, 480), body 280×420, yaw −8°; a gold hairline joins them with a pixel star at (960, 480).
import { clamp, lerp, prog, ease, rng, noise1, el, C, PIXEL_PALETTE, TypeLine } from '../../src/lib.js'
import { W, H, A, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { getSky, drawSky, drawGrain, drawPixelStar, canvas, HANDOFF } from './f3-chart.js'
import { julPose } from './f5-stars.js'

const T0 = 10.5, T1 = 15.2
// card art: PNG size + opaque body box [l, t, r, b]
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116] }
const ART = {
  p1: { src: 'card-profile-1.png', ...PROF }, p2: { src: 'card-profile-2.png', ...PROF },
  p3: { src: 'card-profile-3.png', ...PROF }, p4: { src: 'card-profile-4.png', ...PROF },
  p5: { src: 'card-profile-5.png', ...PROF }, p6: { src: 'card-profile-6.png', ...PROF },
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227] },
  sign: { src: 'card-sign.png', iw: 848, ih: 1152, b: [120, 121, 727, 1032] },
}
const SEA = ['p1', 'p2', 'p4', 'p5', 'p6', 'p1h', 'p2h', 'p4h', 'p5h', 'p6h']   // 'h' = hue-shifted variant (more auras)

// ── galaxy (pure maths — also used by the sound cues in node)
const N = 74
const F = 1300                       // focal length (px)
const CORE_Y = 470                   // screen y of the galaxy core (Juniper rides here)
const BETA = 0.92                    // disc tilt toward camera
const CARD_H = 200                   // world body height of a sea card
const DEAL0 = 10.64, DEAL_STEP = 0.028, FLY = 0.86
const camD = t => lerp(2500, 3150, ease.inOutQuad(prog(t, 10.5, 15.2)))
const spin = t => (t - 10.5) * 0.09
function makeGalaxy() {
  const r = rng(2024)
  const cards = []
  for (let i = 0; i < N; i++) {
    const arm = i % 3
    const u = Math.pow((i + r() * 0.8) / N, 0.85)
    const rad = 300 + u * 2200 + (r() - 0.5) * 160
    const th = arm * (Math.PI * 2 / 3) + rad * 0.0019 + (r() - 0.5) * 0.5
    cards.push({ rad, th, y: (r() - 0.5) * 140, art: SEA[Math.floor(r() * SEA.length)], roll: (r() - 0.5) * 0.22, ph: r() * 6.28, star: r() })
  }
  cards.sort((a, b) => a.rad - b.rad)                     // deal from the core outward → the spiral fills in
  cards.forEach((c, i) => { c.td = DEAL0 + i * DEAL_STEP; c.land = c.td + FLY })
  // constellation links: each card to its nearest (rest-position) neighbour among those dealt before it
  const rest = c => [c.rad * Math.cos(c.th), c.rad * Math.sin(c.th)]
  const links = []
  cards.forEach((c, i) => {
    if (i === 0) return
    const [x, z] = rest(c)
    const d = cards.slice(0, i).map((o, j) => { const [ox, oz] = rest(o); return [Math.hypot(ox - x, oz - z), j] }).sort((a, b) => a[0] - b[0])
    links.push({ a: d[0][1], b: i, t: c.land - 0.06 })
    if (i % 3 === 0 && d[1] && d[1][0] < 700) links.push({ a: d[1][1], b: i, t: c.land + 0.12 })
  })
  return { cards, links }
}
const GAL = makeGalaxy()

/** world → screen for a card at polar (rad, th, y) at time t */
function project(rad, th, y, t) {
  const a = th + spin(t)
  const x = rad * Math.cos(a), z = rad * Math.sin(a)
  const yy = y * Math.cos(BETA) - z * Math.sin(BETA)
  const zz = y * Math.sin(BETA) + z * Math.cos(BETA)
  const depth = zz + camD(t)
  const k = F / Math.max(260, depth)
  return { x: W / 2 + x * k, y: CORE_Y + yy * k, k, depth }
}

// Juniper's track (screen-space body centre + body height)
// Hand-off to f5 (15.0): the two cards arrive ON f5's own entry motion — Juniper follows f5's exported julPose(t),
// your card a copy of f5's youPose — so position AND velocity are continuous across the cut. Before 15.0 each card
// rides a Hermite curve from its sea pose to f5's 15.0 pose, ending with f5's 15.0 velocity.
// f5 at 15.0: Juniper (1540, 480) body h 440, rotateY −24°, rotate 5°; your card (380, 490) body h 440, rotateY 24°, rotate −5°.
const JUN = [[10.5, HANDOFF.cx, HANDOFF.cy, 515], [11.25, 960, CORE_Y, 300], [13.8, 960, CORE_Y, 288]]
const PAIR = { a: 13.8, b: 15.0 }
const juniperF5 = t => { const p = julPose(t); return [p.x, p.y, 2002 * p.s, p.ry, p.rz] }
function youF5(t) {           // copy of f5-stars.js youPose (entry part)
  const e = ease.outCubic(prog(t, 15.0, 15.95))
  return [lerp(380, 610, e), lerp(490, 440, e) + Math.sin((t - 15) * 2.0) * 6 * e, 2002 * lerp(0.22, 0.30, e), lerp(24, 9, e), lerp(-5, -1.2, e)]
}
/** Hermite from p0 (at PAIR.a) to f(PAIR.b) with f's velocity at PAIR.b; f itself after PAIR.b */
function pairPose(f, p0, t) {
  if (t >= PAIR.b) return f(t)
  const T = PAIR.b - PAIR.a, k = clamp((t - PAIR.a) / T)
  const p1 = f(PAIR.b), p2 = f(PAIR.b + 0.01), v = p1.map((x, i) => (p2[i] - x) / 0.01)
  const h00 = 2 * k ** 3 - 3 * k ** 2 + 1, h01 = -2 * k ** 3 + 3 * k ** 2, h11 = k ** 3 - k ** 2
  return p0.map((x, i) => h00 * x + h01 * p1[i] + h11 * T * v[i])
}
function track(keys, t) {
  if (t <= keys[0][0]) return keys[0].slice(1)
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) {
    const a = keys[i - 1], b = keys[i], k = ease.inOutCubic((t - a[0]) / (b[0] - a[0]))
    return [1, 2, 3].map(j => lerp(a[j], b[j], k))
  }
  return keys[keys.length - 1].slice(1)
}
const COPY = { a: 11.15, aOut: 12.55, b: 12.82, out: 14.3 }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')
  getSky()

  // pre-scaled card bitmaps (built once the PNGs decode)
  const bmp = {}
  const loads = Object.entries(ART).map(([k, a]) => new Promise(res => {
    const im = new Image(); im.decoding = 'sync'
    im.onload = () => {
      const big = k === 'p3' || k === 'sign'
      const w = big ? 900 : 420, h = Math.round(w * a.ih / a.iw)
      const mk = (filter) => { const c = canvas(w, h), x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; if (filter) x.filter = filter; x.drawImage(im, 0, 0, w, h); return c }
      bmp[k] = { c: mk(), a }
      if (k.startsWith('p') && k !== 'p3') bmp[k + 'h'] = { c: mk(`hue-rotate(${({ p1: 40, p2: -50, p4: 70, p5: -40, p6: 110 })[k]}deg)`), a }
      res()
    }
    im.onerror = res
    im.src = A + a.src
  }))

  // copy (lower third)
  const pocket = el('div', { position: 'absolute', left: '260px', top: '760px', width: '1400px', height: '300px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(11,6,32,0.72), rgba(11,6,32,0.35) 60%, rgba(11,6,32,0) 100%)', opacity: 0 }, root)
  const stmt = { left: '50%', top: '836px', transform: 'translateX(-50%)', fontFamily: SERIF, fontStyle: 'italic', fontSize: '112px', lineHeight: '1', letterSpacing: '-0.01em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), -0.6px 0 0 rgba(232,98,138,0.3), 0.6px 0 0 rgba(140,170,255,0.25)' }
  const lineA = new TypeLine(root, 'No snap judgements.', stmt, { perChar: 0.03, fade: 0.3, accent: [C.rub, C.gold, C.violet] })
  const lineB = new TypeLine(root, 'Everyone gets a chance.', stmt, { perChar: 0.03, fade: 0.32, accent: [C.violet, C.gold, C.rub] })

  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: 0.62, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')

  /** draw a card bitmap so its BODY is centred at (x, y) with body height h; yaw (rad) squeezes it like a 3D turn */
  function drawCard(key, x, y, h, { yaw = 0, roll = 0, alpha = 1, shade = 0 } = {}) {
    const B = bmp[key]; if (!B || alpha <= 0.003 || h < 2) return
    const { a, c } = B
    const s = h / (a.b[3] - a.b[1])                      // screen px per PNG px
    const bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
    const sx = s * Math.cos(yaw)
    cx.save()
    cx.globalAlpha = alpha
    cx.translate(x, y); cx.rotate(roll)
    cx.transform(1, Math.sin(yaw) * 0.12, 0, 1, 0, 0)    // a hint of perspective shear on the turn
    cx.scale(sx, s)
    const k = c.width / a.iw
    cx.drawImage(c, -bcx, -bcy, a.iw, a.ih)
    if (shade > 0.01) {
      cx.globalCompositeOperation = 'source-atop'
      cx.fillStyle = `rgba(11,6,32,${shade})`; cx.fillRect(-bcx, -bcy, a.iw, a.ih)
    }
    cx.restore()
    void k
  }

  await Promise.all(loads)
  /** CSS-matching 3D pose: translate(x,y) perspective(1600) rotateY(ry) rotate(rz) scale — body centred at (x,y), body height h.
   *  Drawn as thin vertical strips, each an affine map of its projected corners (true perspective taper). */
  function drawCard3D(key, x, y, h, ryDeg, rzDeg, alpha = 1) {
    const Bm = bmp[key]; if (!Bm || alpha <= 0.003) return
    const { a, c } = Bm
    const s = h / (a.b[3] - a.b[1]), ox = a.iw / 2, oy = a.ih / 2      // anchor = PNG centre (as f5's holder)
    const ry = ryDeg * Math.PI / 180, rz = rzDeg * Math.PI / 180, P = 1600
    const proj = (u, v) => {       // u, v in PNG px about the anchor
      const X = (u * Math.cos(rz) - v * Math.sin(rz)) * s, Y = (u * Math.sin(rz) + v * Math.cos(rz)) * s
      const xr = X * Math.cos(ry), zr = -X * Math.sin(ry), f = P / (P - zr)
      return [x + xr * f, y + Y * f]
    }
    const k = c.width / a.iw, NS = 36, sw = a.iw / NS
    cx.save(); cx.globalAlpha = alpha
    for (let i = 0; i < NS; i++) {
      const u0 = -ox + i * sw, u1 = u0 + sw, v0 = -oy, v1 = a.ih - oy
      const p00 = proj(u0, v0), p10 = proj(u1, v0), p01 = proj(u0, v1)
      // map source strip (i*sw*k .. , 0 .. ih*k) → parallelogram p00, p10, p01
      const ax = (p10[0] - p00[0]) / (sw * k), ay = (p10[1] - p00[1]) / (sw * k)
      const bx2 = (p01[0] - p00[0]) / (a.ih * k), by2 = (p01[1] - p00[1]) / (a.ih * k)
      cx.setTransform(ax, ay, bx2, by2, p00[0], p00[1])
      cx.drawImage(c, i * sw * k, 0, sw * k + 0.6, a.ih * k, 0, 0, sw * k + 0.6, a.ih * k)
    }
    cx.restore()
  }

  return {
    start: T0, end: T1, root, fadeIn: 0.1,
    update(t) {
      drawSky(cx, t, { pan: [0, (HANDOFF.cy - 470) * -0.03] })
      const D = camD(t)
      // the end: everything but the pair dims and recedes
      const endK = ease.inOutQuad(prog(t, 13.8, 14.9))
      // core glow behind Juniper (the deck's heart)
      {
        const g = cx.createRadialGradient(960, CORE_Y, 0, 960, CORE_Y, 520)
        const a = 0.22 * ease.outQuad(prog(t, 10.6, 11.4)) * (1 - endK * 0.6)
        g.addColorStop(0, `rgba(201,166,255,${a})`); g.addColorStop(0.4, `rgba(180,92,255,${a * 0.4})`); g.addColorStop(1, 'rgba(180,92,255,0)')
        cx.globalCompositeOperation = 'lighter'; cx.fillStyle = g; cx.fillRect(0, 0, W, H); cx.globalCompositeOperation = 'source-over'
      }

      // card states
      const st = GAL.cards.map((c, i) => {
        const p = prog(t, c.td, c.td + FLY)
        if (p <= 0) return null
        const e = ease.outCubic(p)
        const rad = lerp(40, c.rad, e), th = c.th - (1 - e) * 1.5, y = lerp(0, c.y, e) - Math.sin(Math.PI * p) * 160
        const P = project(rad, th, y, t)
        // wobble once settled
        const wob = Math.sin(t * 0.8 + c.ph) * 0.15
        const yaw = Math.PI * (1 - ease.inOutCubic(prog(p, 0.08, 0.72))) + wob * 0.6
        const fadeNear = clamp((P.depth - 420) / 500)             // fly past the lens softly
        const fog = clamp(1.25 - P.depth / 3600)                   // deep cards sink into the sky
        return { i, c, p, ...P, h: CARD_H * P.k, yaw, alpha: ease.outQuad(prog(p, 0, 0.12)) * fadeNear * (1 - endK * 0.7), shade: (1 - fog) * 0.65 + endK * 0.25 }
      })

      // constellation hairlines (behind the cards)
      cx.save(); cx.lineCap = 'round'
      for (const L of GAL.links) {
        const a = st[L.a], b = st[L.b]
        if (!a || !b) continue
        const q = ease.inOutQuad(prog(t, L.t, L.t + 0.38))
        if (q <= 0) continue
        const al = 0.6 * Math.min(a.alpha, b.alpha) * (1 - endK * 0.75)
        const ex = lerp(a.x, b.x, q), ey = lerp(a.y, b.y, q)
        const gr = cx.createLinearGradient(a.x, a.y, ex, ey)
        gr.addColorStop(0, `rgba(242,220,180,${al})`); gr.addColorStop(1, `rgba(255,236,205,${al * 1.4})`)
        cx.strokeStyle = gr; cx.lineWidth = 1.5
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(ex, ey); cx.stroke()
      }
      cx.restore()

      // depth-sorted cards; Juniper sits in the sort at the deck's depth
      const [jx, jy, jh] = track(JUN, t)
      const jBob = Math.sin(t * 1.3) * 3 * (1 - endK)
      const items = st.filter(Boolean).map(s => ({ d: s.depth, draw: () => drawCard(s.c.art, s.x, s.y, s.h, { yaw: Math.cos(s.yaw) < 0 ? 0 : s.yaw, roll: s.c.roll * (0.4 + 0.6 * (1 - s.p)), alpha: s.alpha, shade: s.shade, _back: Math.cos(s.yaw) < 0 }), s }))
      if (t < PAIR.a) items.push({ d: D - 1, draw: () => drawCard3D('p3', jx, jy + jBob, jh, 0, 0) })
      else { const [x, y, h, ry, rz] = pairPose(juniperF5, [960, CORE_Y + Math.sin(PAIR.a * 1.3) * 3, 288, 0, 0], t); items.push({ d: D - 1, draw: () => drawCard3D('p3', x, y, h, ry, rz) }) }
      // your card: rises out of the far side of the sea and comes to meet her
      if (t >= PAIR.a) {
        const P = project(1250, Math.PI * 0.62 - spin(PAIR.a), -40, PAIR.a)
        const [x, y, h, ry, rz] = pairPose(youF5, [P.x, P.y, CARD_H * P.k, 0, 0], t)
        items.push({ d: lerp(P.depth, D - 2, ease.inOutQuad(prog(t, PAIR.a, PAIR.a + 0.6))), draw: () => drawCard3D('sign', x, y, h, ry, rz, ease.outQuad(prog(t, PAIR.a, PAIR.a + 0.25))) })
      }
      items.sort((a, b) => b.d - a.d)
      for (const it of items) {
        if (it.s && Math.cos(it.s.yaw) < 0) {
          // face-down half of the flip: card back, mirrored squeeze
          const s = it.s
          drawCard('back', s.x, s.y, s.h, { yaw: Math.PI - s.yaw, roll: s.c.roll, alpha: s.alpha, shade: s.shade })
        } else it.draw()
      }

      // pixel stars: on link joints as they land, plus the tether star
      cx.save(); cx.imageSmoothingEnabled = false
      const tick = Math.round(t * 30) >> 1
      GAL.links.forEach((L, j) => {
        if (j % 2) return
        const a = st[L.a], b = st[L.b]
        if (!a || !b) return
        const q = prog(t, L.t + 0.3, L.t + 0.6)
        if (q <= 0) return
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
        const blink = (tick + j) & 3
        cx.globalAlpha = Math.min(a.alpha, b.alpha) * (blink === 0 ? 0.5 : 1) * (1 - endK * 0.8)
        drawPixelStar(cx, mx, my, 10 + 12 * b.k, q < 1 ? 0 : (blink & 1 ? 2 : 1), PIXEL_PALETTE[j % PIXEL_PALETTE.length])
      })
      cx.restore()

      // copy
      const pk = ease.outQuad(prog(t, COPY.a - 0.2, COPY.a + 0.3)) * (1 - ease.inQuad(prog(t, COPY.out, COPY.out + 0.3)))
      pocket.style.opacity = String(pk)
      lineA.update(t - COPY.a, { out: COPY.aOut - COPY.a })
      lineB.update(t - COPY.b, { out: COPY.out - COPY.b })

      drawGrain(gx, t)
    },
  }
}

// ── sound: deal whooshes + landing ticks, line-draw chimes, copy bells, riser into f5
const LAND_TICKS = GAL.cards.filter((_, i) => i % 3 === 0).map(c => ['tick', +(c.land - 0.1).toFixed(3), 0.03])
const LINE_BELLS = GAL.links.filter((_, j) => j % 6 === 0).slice(0, 10).map((L, j) => ['bell', +(L.t + 0.05).toFixed(3), [1318.51, 1479.98, 1661.22, 1975.53][j % 4], 0.012, 0.8, (j % 2 ? 0.4 : -0.4)])
export const cues = [
  ['whoosh', 10.58, 0.7, 0.1],                        // the deck bursts open
  ['whoosh', 11.2, 0.9, 0.05],
  ['whoosh', 12.0, 0.9, 0.04],
  ['glitter', 10.7, 12.9],
  ...LAND_TICKS,
  ...LINE_BELLS,
  ['bell', COPY.a, 587.33, 0.04, 1.6, 0],             // "No snap judgements."
  ['bell', COPY.b, 739.99, 0.045, 2.0, 0],            // "Everyone gets a chance."
  ['bell', COPY.b + 0.1, 1108.73, 0.03, 2.0, 0.2],
  ['riser', 13.9, 14.95, 0.06],                       // the pair drifts in
  ['whoosh', 13.95, 0.9, 0.06],
  ['bell', 14.88, 880, 0.04, 1.8, -0.2],              // the tether lands
  ['bell', 14.95, 1318.51, 0.035, 1.8, 0.2],
]
