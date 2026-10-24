// ─────────────────────────────────────────────── F4 · EVERYONE GETS A CHANCE (10.68–15.3)
// Picks up f3's card exactly (f3 cardPose(t), same sky pan, same plateDim + grainOpacity) once "Face last." has gone
// (10.68). Juniper's veiled card (body 220px) sits in the middle of a clean three-row arc of 17 veiled mystery cards
// (6 · 5 · 6, bodies 180–200px, names on nameplates) dealt out of her deck at full opacity, face-up, with a drop shadow.
// The nebula dims gently (to 0.6) under them. 2px constellation lines join the cards; "Everyone gets a chance." types
// while a rim glow + 1→1.1 scale pulse sweeps left→right through every card in step with the letters; then the
// cards fold into pixel-star nodes at their centres — the deck has become a constellation.
// Copy: "No snap judgements." (10.85–12.15) → "Everyone gets a chance." (types 12.6–13.05, held to 14.85). On "chance" the
// WHOLE grid brightens together (rim glow + slight lift on every card = "everyone"), then settles and folds.
// Handoff to f5 (15.0): Juniper (veiled, card-profile-3) and your card (card-sign, Hakeem · Taurus) fly out of the
// constellation (from 14.2) onto f5's own entry motion (julPose / youPose from f5-stars.js), position AND velocity
// continuous across the cut; f4 keeps drawing them until 15.3 under f5's fade-in.
import { clamp, lerp, prog, ease, rng, noise1, el, C, PIXEL_PALETTE, TypeLine } from '../../src/lib.js'
import { W, H, A, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { getSky, drawSky, drawGrain, drawPixelStar, canvas, HANDOFF, cardPose, skyPan, GRAIN_OPACITY, plateDim, grainOpacity } from './f3-chart.js'
import * as F5 from './f5-stars.js'

const T0 = 10.68, T1 = 15.3
// card art: PNG size + opaque body box [l, t, r, b]
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116] }
const ART = {
  p1: { src: 'card-profile-1.png', ...PROF }, p2: { src: 'card-profile-2.png', ...PROF },
  p3: { src: 'card-profile-3.png', ...PROF }, p4: { src: 'card-profile-4.png', ...PROF },
  p5: { src: 'card-profile-5.png', ...PROF }, p6: { src: 'card-profile-6.png', ...PROF },
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227] },
  sign: { src: 'card-sign.png', iw: 848, ih: 1152, b: [120, 121, 727, 1032] },
}
const HUE = { p1: 40, p2: -50, p4: 70, p5: -40, p6: 110 }
const SEA = ['p1', 'p2', 'p4', 'p5', 'p6', 'p1h', 'p2h', 'p4h', 'p5h', 'p6h']   // 'h' = hue-shifted variant (more auras)

// ── the arc: three gently bowed rows (6 · 5 · 6). Juniper = middle row centre (f3's HANDOFF), you = middle row #1.
const J = { x: HANDOFF.cx, y: HANDOFF.cy, h: HANDOFF.bodyH }
const ROWS = [{ y: J.y - 210, n: 6, h: 180 }, { y: J.y, n: 5, h: 200 }, { y: J.y + 210, n: 6, h: 190 }]
const COL = 250                                    // column spacing (rows of 6 sit half a step off the row of 5)
const DEAL0 = 10.7, DEAL_STEP = 0.034, FLY = 0.5
const PULSE0 = 12.6, PULSE_STEP = 0.0235, PULSE_LEN = 0.36, PULSE_SCALE = 0.1   // sweep spans the 0.4s of typing
// "chance": every card at once — rim glow + lift, held, then settles before the fold
const ALL = { a: 12.8, full: 13.02, hold: 13.65, end: 14.1, glow: 0.6, lift: 7, scale: 0.04 }
const FOLD0 = 14.15, FOLD_STEP = 0.012, FOLD_LEN = 0.42
const PAIR = { a: 14.2, b: 15.0 }
const COPY = { a: 10.85, aOut: 12.15, b: 12.6, out: 14.85, perB: 0.0125, fadeB: 0.18 }   // B types in step with the pulse sweep
const LINE0 = 11.45, LINE_STEP = 0.03, LINE_LEN = 0.3
const NAMES = ['Maya, 24', 'Rio, 29', 'Ari, 31', 'Sol, 26', 'Kai, 28', 'Lena, 26', 'Noor, 25', 'Theo, 30', 'Ines, 27', 'Malik, 29', 'Wren, 24', 'Dev, 32', 'Ana, 28', 'Jonah, 26', 'Zuri, 25', 'Eli, 30']

function makeArc() {
  const r = rng(2026), cards = []
  ROWS.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const dx = (i - (row.n - 1) / 2) * COL
      const isJ = ri === 1 && i === 2, isYou = ri === 1 && i === 1
      const x = J.x + dx + (isJ ? 0 : (r() - 0.5) * 30)
      const y = row.y + 0.00008 * dx * dx + (isJ ? 0 : (r() - 0.5) * 20)
      cards.push({ ri, i, x, y, h: isJ ? J.h : row.h + (r() - 0.5) * 12, art: isJ ? 'p3' : isYou ? 'sign' : SEA[Math.floor(r() * SEA.length)],
        roll: isJ ? 0 : (r() - 0.5) * 0.09, ph: r() * 6.28, isJ, isYou, col: PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)] })
    }
  })
  // deal from Juniper outward
  const sea = cards.filter(c => !c.isJ).sort((a, b) => Math.hypot(a.x - J.x, a.y - J.y) - Math.hypot(b.x - J.x, b.y - J.y))
  sea.forEach((c, k) => { c.td = DEAL0 + k * DEAL_STEP; c.land = c.td + FLY })
  cards.filter(c => !c.isJ && !c.isYou).forEach((c, k) => { c.name = NAMES[k % NAMES.length] })
  cards.find(c => c.isJ).name = 'Juniper, 27'
  const jc = cards.find(c => c.isJ); jc.td = 0; jc.land = 0
  // glow pulse: a left → right sweep through every card (Juniper included)
  ;[...cards].sort((a, b) => a.x - b.x).forEach((c, k) => { c.pulse = PULSE0 + k * PULSE_STEP; c.fold = FOLD0 + k * FOLD_STEP })
  // constellation: each row a chain + alternate links between rows
  const at = (ri, i) => cards.find(c => c.ri === ri && c.i === i)
  const links = []
  ROWS.forEach((row, ri) => { for (let i = 0; i + 1 < row.n; i++) links.push([at(ri, i), at(ri, i + 1)]) })
  for (let i = 0; i < 5; i++) links.push(i % 2 ? [at(1, i), at(2, i + 1)] : [at(0, i), at(1, i)])
  links.push([at(0, 5), at(1, 4)], [at(1, 0), at(2, 0)], [at(1, 4), at(2, 5)])
  const mid = ([a, b]) => Math.hypot((a.x + b.x) / 2 - J.x, (a.y + b.y) / 2 - J.y)
  const L = links.map(l => ({ a: l[0], b: l[1], d: mid(l) })).sort((p, q) => p.d - q.d)
  L.forEach((l, k) => { l.t = Math.max(LINE0 + k * LINE_STEP, Math.max(l.a.land, l.b.land) + 0.05) })
  return { cards, links: L }
}
const ARC = makeArc()
const YOU = ARC.cards.find(c => c.isYou)

// ── the pair's f5 entry poses: [x, y, s (PNG px scale), ry, rz]
const juniperF5 = t => { const p = F5.julPose(t); return [p.x, p.y, p.s, p.ry, p.rz] }
function youF5(t) {
  let yp = null
  try { yp = typeof F5.youPose === 'function' ? F5.youPose : null } catch (_) { yp = null }
  if (yp) { const p = yp(t); return [p.x, p.y, p.s, p.ry, p.rz] }
  // fallback: a copy of f5-stars.js youPose (entry part) until f5 exports it
  const e = ease.outCubic(prog(t, 15.0, 15.95))
  return [lerp(380, 610, e), lerp(490, 440, e) + Math.sin((t - 15) * 2.0) * 6 * e, lerp(0.22, 0.30, e) * 2002 / 910, lerp(24, 9, e), lerp(-5, -1.2, e)]
}
/** Hermite from p0 (at PAIR.a) to f(PAIR.b) with f's velocity at PAIR.b; f itself after PAIR.b */
function pairPose(f, p0, t) {
  if (t >= PAIR.b) return f(t)
  const T = PAIR.b - PAIR.a, k = clamp((t - PAIR.a) / T)
  const p1 = f(PAIR.b), p2 = f(PAIR.b + 0.01), v = p1.map((x, i) => (p2[i] - x) / 0.01)
  const h00 = 2 * k ** 3 - 3 * k ** 2 + 1, h01 = -2 * k ** 3 + 3 * k ** 2, h11 = k ** 3 - k ** 2
  return p0.map((x, i) => h00 * x + h01 * p1[i] + h11 * T * v[i])
}
const bodyH = key => ART[key].b[3] - ART[key].b[1]
const SKY_PAN = skyPan(HANDOFF.cx, HANDOFF.cy)
/** sky pan: f3's (card-driven) pan until the handoff, then fixed — no jump at the cut */
const panAt = t => { if (t >= HANDOFF.t) return SKY_PAN; const p = cardPose(t); return skyPan(p.cx, p.cy) }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')
  getSky()

  // mip chains of pre-scaled card bitmaps (halving with high-quality smoothing → crisp at every size)
  const bmp = {}
  const loads = Object.entries(ART).map(([k, a]) => new Promise(res => {
    const im = new Image(); im.decoding = 'sync'
    im.onload = () => {
      const chain = (filter) => {
        const out = []
        let w = (k === 'p3' || k === 'sign') ? 1000 : 520, src = null
        while (w >= 60) {
          const h = Math.round(w * a.ih / a.iw), c = canvas(w, h), x = c.getContext('2d')
          x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'
          if (!src && filter) x.filter = filter
          x.drawImage(src || im, 0, 0, w, h)
          out.push(c); src = c; w = Math.round(w / 2)
        }
        return out
      }
      bmp[k] = { mips: chain(), a }
      if (HUE[k] != null) bmp[k + 'h'] = { mips: chain(`hue-rotate(${HUE[k]}deg)`), a }
      res()
    }
    im.onerror = res
    im.src = A + a.src
  }))
  /** smallest mip that is still ≥ 1.4× the on-screen width */
  const pick = (B, screenW) => { let c = B.mips[0]; for (const m of B.mips) if (m.width >= screenW * 1.4) c = m; return c }

  // copy (lower third)
  const pocket = el('div', { position: 'absolute', left: '260px', top: '770px', width: '1400px', height: '290px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(11,6,32,0.75), rgba(11,6,32,0.38) 60%, rgba(11,6,32,0) 100%)', opacity: 0 }, root)
  const stmt = { left: '50%', top: '836px', transform: 'translateX(-50%)', fontFamily: SERIF, fontStyle: 'italic', fontSize: '112px', lineHeight: '1', letterSpacing: '-0.01em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), -0.6px 0 0 rgba(232,98,138,0.3), 0.6px 0 0 rgba(140,170,255,0.25)' }
  const lineA = new TypeLine(root, 'No snap judgements.', stmt, { perChar: 0.03, fade: 0.3, accent: [C.rub, C.gold, C.violet] })
  const lineB = new TypeLine(root, 'Everyone gets a chance.', stmt, { perChar: COPY.perB, fade: COPY.fadeB, accent: [C.violet, C.gold, C.rub] })

  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: GRAIN_OPACITY, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')

  /** nameplate + rim glow, drawn in the card's PNG space (ctx already transformed so 1 unit = 1 PNG px) */
  function cardDressing(B, ox, oy, s, { name, nameA = 1, glow = 0 }) {
    const { a } = B
    if (name && nameA > 0.01 && B.plate) {
      // the printed name is ~7px at this size: cover it and set it again large enough to read (≈19px on screen)
      cx.globalAlpha = nameA
      cx.fillStyle = B.plate
      cx.beginPath(); cx.roundRect(ox + 175, oy + 150, 900, 175, 40); cx.fill()
      cx.font = `italic 500 190px ${SERIF}`; cx.fillStyle = '#efe6d6'; cx.textBaseline = 'alphabetic'
      cx.fillText(name, ox + 215, oy + 300, 880)
    }
    if (glow > 0.01) {
      // rim glow: a bright line on the body edge + soft bloom (no big haze sprites)
      const [l, t0, r, b] = a.b
      cx.globalCompositeOperation = 'lighter'
      cx.globalAlpha = glow
      cx.shadowColor = 'rgba(255,214,150,0.95)'; cx.shadowBlur = 18
      cx.strokeStyle = 'rgba(255,236,205,0.95)'; cx.lineWidth = 3 / s
      cx.beginPath(); cx.roundRect(ox + l + 10, oy + t0 + 10, r - l - 20, b - t0 - 20, 110); cx.stroke()
      cx.shadowBlur = 0; cx.shadowColor = 'transparent'
      cx.globalCompositeOperation = 'source-over'
    }
  }
  /** flat card: BODY centred at (x, y), body height h; yaw (rad) squeezes it like a 3D turn; glow = rim light-up */
  function drawCard(key, x, y, h, { yaw = 0, roll = 0, alpha = 1, glow = 0, name = null, nameA = 1, shadow = 1 } = {}) {
    const B = bmp[key]; if (!B || alpha <= 0.003 || h < 2) return
    const { a } = B
    const s = h / (a.b[3] - a.b[1])
    const bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
    const c = pick(B, a.iw * s)
    cx.save()
    cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high'
    cx.globalAlpha = alpha
    cx.translate(x, y); cx.rotate(roll)
    cx.transform(1, Math.sin(yaw) * 0.12, 0, 1, 0, 0)    // a hint of perspective shear on the turn
    cx.scale(s * Math.cos(yaw), s)
    if (shadow > 0) { cx.shadowColor = `rgba(4,2,14,${0.75 * shadow})`; cx.shadowBlur = 22; cx.shadowOffsetY = 10 }
    cx.drawImage(c, -bcx, -bcy, a.iw, a.ih)
    cx.shadowColor = 'transparent'; cx.shadowBlur = 0; cx.shadowOffsetY = 0
    if (glow > 0.01) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = alpha * glow * 0.3; cx.drawImage(c, -bcx, -bcy, a.iw, a.ih); cx.globalCompositeOperation = 'source-over' }
    cardDressing(B, -bcx, -bcy, s, { name, nameA: nameA * alpha, glow: glow * alpha })
    cx.restore()
  }
  await Promise.all(loads)
  // nameplate colour: the card's own header ink, sampled from each (hue-shifted) art
  for (const B of Object.values(bmp)) {
    const m = B.mips[B.mips.length - 1], k = m.width / B.a.iw
    const d = m.getContext('2d').getImageData(Math.round(620 * k), Math.round(200 * k), 1, 1).data
    B.plate = `rgb(${d[0]},${d[1]},${d[2]})`
  }
  /** CSS-matching 3D pose: translate(x,y) perspective(1600) rotateY(ry) rotate(rz) scale(s) about the PNG centre
   *  (as f5's holder). Drawn as thin vertical strips, each an affine map of its projected corners (true taper). */
  function drawCard3D(key, x, y, s, ryDeg, rzDeg, alpha = 1, glow = 0) {
    const Bm = bmp[key]; if (!Bm || alpha <= 0.003) return
    const { a } = Bm
    const c = pick(Bm, a.iw * s)
    const ox = a.iw / 2, oy = a.ih / 2
    const ry = ryDeg * Math.PI / 180, rz = rzDeg * Math.PI / 180, P = 1600
    const proj = (u, v) => {
      const X = (u * Math.cos(rz) - v * Math.sin(rz)) * s, Y = (u * Math.sin(rz) + v * Math.cos(rz)) * s
      const xr = X * Math.cos(ry), zr = -X * Math.sin(ry), f = P / (P - zr)
      return [x + xr * f, y + Y * f]
    }
    const k = c.width / a.iw, NS = Math.abs(ryDeg) < 0.05 ? 1 : 36, sw = a.iw / NS
    const pass = (al) => {
      cx.globalAlpha = al
      for (let i = 0; i < NS; i++) {
        const u0 = -ox + i * sw, u1 = u0 + sw, v0 = -oy, v1 = a.ih - oy
        const p00 = proj(u0, v0), p10 = proj(u1, v0), p01 = proj(u0, v1)
        const ax = (p10[0] - p00[0]) / (sw * k), ay = (p10[1] - p00[1]) / (sw * k)
        const bx2 = (p01[0] - p00[0]) / (a.ih * k), by2 = (p01[1] - p00[1]) / (a.ih * k)
        cx.setTransform(ax, ay, bx2, by2, p00[0], p00[1])
        cx.drawImage(c, i * sw * k, 0, sw * k + (NS > 1 ? 0.6 : 0), a.ih * k, 0, 0, sw * k + (NS > 1 ? 0.6 : 0), a.ih * k)
      }
    }
    cx.save(); cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high'
    pass(alpha)
    if (glow > 0.01) { cx.globalCompositeOperation = 'lighter'; pass(alpha * glow * 0.7) }
    cx.restore()
  }
  /** Juniper's nameplate + rim on her flat (ry≈0) pose: [x, y, s, ry, rz] about the PNG centre */
  function dressFlat(key, x, y, s, rzDeg, opts) {
    const B = bmp[key]; if (!B) return
    cx.save(); cx.translate(x, y); cx.rotate(rzDeg * Math.PI / 180); cx.scale(s, s)
    cardDressing(B, -B.a.iw / 2, -B.a.ih / 2, s, opts)
    cx.restore()
  }

  return {
    start: T0, end: T1, root, fadeIn: 0.08,
    update(t) {
      // sky: same plate + camera as f3; the nebula dims under the arc so the cards read
      // f3's dim (starts 10.4, gentle, to 0.6), back to full for f5; grain rises as the plate dims
      const dim = 1 - (1 - plateDim(t)) * (1 - ease.inOutQuad(prog(t, 14.3, 15.05)))
      drawSky(cx, t, { pan: panAt(t), dim })
      grainC.style.opacity = String(grainOpacity(dim))
      const endK = ease.inOutQuad(prog(t, 14.35, 15.0))                 // constellation steps back for f5
      const fr = Math.round(t * 30)

      // card states
      const st = ARC.cards.map(c => {
        if (c.isJ) return { c, x: J.x, y: J.y, h: J.h, a: 1, flying: false }
        const p = prog(t, c.td, c.land)
        if (p <= 0) return null
        const e = ease.outCubic(p)
        const lift = Math.sin(Math.PI * p) * 60
        const x = lerp(J.x, c.x, e), y = lerp(J.y, c.y, e) - lift
        const h = lerp(J.h * 0.9, c.h, e)                                  // never below half size
        const yaw = 0.45 * (1 - ease.outCubic(p)) * (c.x < J.x ? -1 : 1)    // face-up, a slight turn that settles
        const settle = Math.sin(t * 0.9 + c.ph) * 3 * e                  // gentle float once landed
        const fold = ease.inOutCubic(prog(t, c.fold, c.fold + FOLD_LEN)) * (c.isYou ? 0 : 1)
        // full opacity in flight: only the first 0.08s fades in (out from behind Juniper)
        return { c, x, y: y + settle, h: h * (1 - fold), a: prog(t, c.td, c.td + 0.08) * (1 - ease.inQuad(fold)), yaw, roll: c.roll * (0.4 + 0.6 * (1 - p)) + (1 - e) * 0.3, flying: p < 1, fold }
      })
      const S = new Map(st.filter(Boolean).map(s => [s.c, s]))

      // constellation lines: 2px, 0.7, centre to centre (behind the cards)
      cx.save(); cx.lineCap = 'round'; cx.lineWidth = 2
      for (const L of ARC.links) {
        const a = S.get(L.a), b = S.get(L.b)
        if (!a || !b) continue
        const q = ease.inOutQuad(prog(t, L.t, L.t + LINE_LEN))
        if (q <= 0) continue
        // once the pair leaves, their links let go
        const pairGone = (L.a.isJ || L.a.isYou || L.b.isJ || L.b.isYou) ? 1 - prog(t, PAIR.a, PAIR.a + 0.35) : 1
        cx.globalAlpha = 0.7 * (1 - endK * 0.6) * pairGone
        cx.strokeStyle = 'rgb(255,236,205)'
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(lerp(a.x, b.x, q), lerp(a.y, b.y, q)); cx.stroke()
      }
      cx.restore()

      // pulse envelope for "Everyone gets a chance."
      const sweep = c => { const p = prog(t, c.pulse, c.pulse + PULSE_LEN); return p > 0 && p < 1 ? Math.sin(Math.PI * p) ** 1.5 : 0 }
      // "chance": the whole grid together
      const allK = ease.outCubic(prog(t, ALL.a, ALL.full)) * (1 - ease.inOutCubic(prog(t, ALL.hold, ALL.end)))
      const pulse = c => Math.max(sweep(c), allK * ALL.glow)

      // sea cards (landed first, then the ones still in flight above them); Juniper + you drawn last
      const sea = [...S.values()].filter(s => !s.c.isJ && !(s.c.isYou && t >= PAIR.a)).sort((a, b) => (a.flying - b.flying) || (b.c.land - a.c.land))
      for (const s of sea) {
        const g = pulse(s.c)
        const nameA = ease.outQuad(prog(t, s.c.land - 0.1, s.c.land + 0.2)) * (1 - prog(s.fold, 0, 0.3))
        const sw = sweep(s.c)
        drawCard(s.c.art, s.x, s.y - ALL.lift * allK, s.h * (1 + PULSE_SCALE * sw + ALL.scale * allK), { yaw: s.yaw, roll: s.roll, alpha: s.a, glow: g, name: s.c.name, nameA, shadow: 1 - s.fold })
      }

      // pixel-star nodes: they grow out of the folding cards at their centres and stay (the constellation)
      cx.save(); cx.imageSmoothingEnabled = false
      ARC.cards.forEach((c, j) => {
        if (c.isJ || c.isYou) return
        const s = S.get(c); if (!s) return
        const n = ease.outCubic(prog(t, c.fold + FOLD_LEN * 0.4, c.fold + FOLD_LEN + 0.1))
        if (n <= 0) return
        const blink = ((fr >> 1) + j) & 3
        cx.globalAlpha = n * (blink === 0 ? 0.6 : 1) * (1 - endK * 0.55)
        drawPixelStar(cx, s.x, s.y, 14 + 14 * n, blink & 1 ? 0 : 1, c.col)
      })
      cx.restore()

      // Juniper: f3's pose (frame-exact) until the shrink lands → her slot → f5's entry motion
      const jc = ARC.cards.find(c => c.isJ)
      const jg = pulse(jc)
      let jp
      if (t < HANDOFF.t) { const p = cardPose(t); jp = [p.cx, p.cy + p.bob, p.h / bodyH('p3'), p.yaw, 0] }
      else if (t < PAIR.a) jp = [J.x, J.y, J.h / bodyH('p3'), 0, 0]
      else jp = pairPose(juniperF5, [J.x, J.y, J.h / bodyH('p3'), 0, 0], t)
      jp[2] *= 1 + PULSE_SCALE * sweep(jc) + ALL.scale * allK
      jp[1] -= ALL.lift * allK
      // your card: in the arc until the pair leaves, then onto f5's youPose
      if (t >= PAIR.a) {
        const ys = S.get(YOU)
        const p0 = [YOU.x, YOU.y + Math.sin(PAIR.a * 0.9 + YOU.ph) * 3, YOU.h / bodyH('sign'), 0, 0]
        const [x, y, s, ry, rz] = pairPose(youF5, p0, t)
        if (ys) drawCard3D('sign', x, y, s, ry, rz, 1)
      }
      drawCard3D('p3', jp[0], jp[1], jp[2], jp[3], jp[4], 1, jg * 0.3)
      const jName = ease.outQuad(prog(t, 10.85, 11.15)) * (1 - prog(t, PAIR.a, PAIR.a + 0.2))
      dressFlat('p3', jp[0], jp[1], jp[2], jp[4], { name: jc.name, nameA: jName, glow: jg })

      // copy
      const pk = ease.outQuad(prog(t, COPY.a - 0.2, COPY.a + 0.3)) * (1 - ease.inQuad(prog(t, COPY.out, COPY.out + 0.3)))
      pocket.style.opacity = String(pk)
      lineA.update(t - COPY.a, { out: COPY.aOut - COPY.a })
      lineB.update(t - COPY.b, { out: COPY.out - COPY.b })

      drawGrain(gx, t)
    },
  }
}

// ── sound: deal whoosh + landing ticks, line-draw chimes, the "everyone" light-up run, fold glitter, riser into f5
const SEA_CARDS = ARC.cards.filter(c => !c.isJ)
const LAND_TICKS = SEA_CARDS.filter((_, i) => i % 2 === 0).map(c => ['tick', +(c.land - 0.04).toFixed(3), 0.028])
const LINE_BELLS = ARC.links.filter((_, j) => j % 4 === 0).map((L, j) => ['bell', +(L.t + 0.05).toFixed(3), [1318.51, 1479.98, 1661.22, 1975.53][j % 4], 0.012, 0.8, (j % 2 ? 0.4 : -0.4)])
const PENTA = [739.99, 880, 987.77, 1108.73, 1318.51, 1479.98, 1661.22, 1975.53]
const PULSE_BELLS = [...ARC.cards].sort((a, b) => a.pulse - b.pulse).filter((_, k) => k % 3 === 0)
  .map((c, k, arr) => ['bell', +c.pulse.toFixed(3), PENTA[Math.min(PENTA.length - 1, k)], 0.016, 0.9, lerp(-0.6, 0.6, k / (arr.length - 1))])
export const cues = [
  ['whoosh', DEAL0 + 0.02, 0.6, 0.09],                // the deck deals out
  ['whoosh', 11.0, 0.6, 0.04],
  ['glitter', DEAL0 + 0.05, 11.7],
  ...LAND_TICKS,
  ...LINE_BELLS,
  ['bell', COPY.a, 587.33, 0.04, 1.6, 0],             // "No snap judgements."
  ['bell', COPY.b, 739.99, 0.045, 2.0, 0],            // "Everyone gets a chance."
  ['bell', COPY.b + 0.1, 1108.73, 0.03, 2.0, 0.2],
  ['glitter', PULSE0, PULSE0 + ARC.cards.length * PULSE_STEP + 0.2],   // every card lights in turn
  ...PULSE_BELLS,
  ['glitter', ALL.a, ALL.hold],                       // "chance": the whole grid lights together
  ['bell', ALL.a + 0.02, 1108.73, 0.035, 2.2, -0.3],
  ['bell', ALL.a + 0.04, 1479.98, 0.03, 2.2, 0.3],
  ['glitter', FOLD0 + 0.1, FOLD0 + 0.6],              // cards fold into stars
  ['riser', 14.1, 14.95, 0.06],                       // the pair drifts in
  ['whoosh', PAIR.a + 0.05, 0.8, 0.06],
  ['bell', 14.88, 880, 0.04, 1.8, -0.2],
  ['bell', 14.95, 1318.51, 0.035, 1.8, 0.2],
]
