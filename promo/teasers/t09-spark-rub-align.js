// 09 — "Some spark. Some rub. Some align." Compatibility readings, told by two sign auras (Libra × Taurus)
// orbiting each other in space. Three beats, three colours (the app's reading colours), three motion languages:
//   SPARK  0.0–3.0  #7fd8b0 · quick orbit, electric arcs jump the gap, pixel sparks fly          (ticks + glitter)
//   RUB    3.0–6.0  #e8628a · orbs grind together, friction sparks, repel with a glitch, shake   (booms + glitch ticks)
//   ALIGN  6.0–8.9  #f2c75c · orbit slows, they settle side by side, chakra column streaks in and locks (riser → boom + bells)
//   SCREEN 8.9–10.2 the two orbs fly into the real Cosmic Alignment screen (match cut onto its aura pair)
//   END TAG 10.2–12.6
import { W, H, IMG, A, SERIF, MONO, el, fill, img, prog, ease, lerp, clamp, rng, noise1, spaceBackdrop, starField, pixelStar, endTag, BONE, GOLD, HOT, CHAKRAS } from './kit.js'

const DURATION = 12.6
const END = 10.2
const SPARK = '#7fd8b0', RUB = '#e8628a', ALIGNC = '#f2c75c'
const B1 = 3.0, B2 = 6.0, B3 = 8.9 // beat boundaries
const CX = 540, CY = 840 // orbit centre
const R = 290 // orb sprite radius

// spark arc bursts (start times) and rub collisions / glitches
const ARCS = [0.45, 0.85, 1.12, 1.5, 1.78, 2.1, 2.32, 2.62]
const GRIND = [[3.55, 4.35], [4.95, 5.6]]
const GLITCH = [[4.38, 4.62], [5.62, 5.86], [3.02, 3.12]]
const LOCK = 7.7

const lit = (s, a, b, fi = 0.08, fo = 0.25) => prog(s, a, a + fi) * (1 - prog(s, b - fo, b))
function hexA(h, a) { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})` }

async function loadImg(src) { const i = new Image(); i.src = src; await i.decode().catch(() => {}); return i }
/** aura photo → soft circular sprite (figure centred) */
function orbSprite(im) {
  const c = document.createElement('canvas'); c.width = c.height = R * 2
  const g = c.getContext('2d')
  const s = (R * 2.3) / Math.min(im.width, im.height)
  g.drawImage(im, R - im.width * s / 2, R - im.height * s * 0.55, im.width * s, im.height * s)
  g.globalCompositeOperation = 'destination-in'
  const m = g.createRadialGradient(R, R, R * 0.35, R, R, R)
  m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(0.6, 'rgba(0,0,0,0.75)'); m.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = m; g.fillRect(0, 0, R * 2, R * 2)
  return c
}

// angular velocity of the orbit (rad/s) for the spark + rub beats
const omega = (t) => lerp(2.3, 0.55, ease.inOutQuad(prog(t, 2.7, 3.4))) + 0.25 * Math.sin(t * 5.1) * prog(t, 3.2, 3.6)
function rawTheta(t) {
  const dt = 1 / 120
  let a = -0.35
  for (let s = 0; s < t; s += dt) a += omega(s) * Math.min(dt, t - s)
  return a
}
const RUB_TH = Math.round(rawTheta(3.45) / Math.PI) * Math.PI // rub: face off side by side
function theta(t) {
  const a = rawTheta(Math.min(t, B2))
  if (t <= B2) return lerp(a, RUB_TH + 0.06 * Math.sin(t * 9), ease.inOutCubic(prog(t, 3.0, 3.45)))
  // align: a slow half/whole turn into the final pose (multiple of 2π → Libra left, Taurus right)
  const a0 = RUB_TH + 0.06 * Math.sin(B2 * 9)
  const target = Math.ceil((a0 + 0.6) / (2 * Math.PI)) * 2 * Math.PI
  return lerp(a0, target, ease.inOutCubic(prog(t, B2, 7.2)))
}
// half separation
function halfSep(t) {
  if (t < B1) return 250 + 18 * Math.sin(t * 3.1)
  if (t < B2) {
    let h = 250
    h = lerp(h, 165, ease.inCubic(prog(t, 3.15, 3.55)))
    h += (noise1(t * 22, 3) - 0.5) * 26 * prog(t, 3.55, 3.6) * (1 - prog(t, 4.3, 4.36))
    h = lerp(h, 330, ease.outExpo(prog(t, 4.36, 4.7)))
    h = lerp(h, 170, ease.inCubic(prog(t, 4.62, 4.95)))
    h += (noise1(t * 24, 7) - 0.5) * 28 * prog(t, 4.95, 5.0) * (1 - prog(t, 5.55, 5.6))
    h = lerp(h, 300, ease.outExpo(prog(t, 5.6, 5.95)))
    return h
  }
  return lerp(300, 235, ease.inOutCubic(prog(t, B2, 7.1)))
}
// a jagged lightning path between two points (seeded)
function bolt(x0, y0, x1, y1, seed, n = 12, amp = 40) {
  const r = rng(seed), pts = [[x0, y0]]
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L
  for (let i = 1; i < n; i++) { const k = i / n, o = (r() - 0.5) * amp * Math.sin(Math.PI * k) * 2; pts.push([x0 + dx * k + nx * o, y0 + dy * k + ny * o]) }
  pts.push([x1, y1]); return pts
}

export default {
  id: '09-spark-rub-align', title: 'Some spark. Some rub. Some align.', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, B1, [146.83, 220, 293.66, 369.99, 440, 659.25]],           // D add9 — bright, electric
      [B1, B2, [123.47, 185, 246.94, 293.66, 349.23, 523.25]],        // B dim-ish rub — friction
      [B2, END, [98, 196, 293.66, 369.99, 440, 587.33]],              // G maj9 — settling
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    bpm: 120, beatFrom: 0.45, beatTo: 5.95, pulseGain: 0.2,
  },
  cues: [
    ['whoosh', 0.3, 0.6, 0.07],
    ...ARCS.flatMap((a, i) => [['tick', a, 0.12], ['bell', a + 0.01, [1318.5, 1567.98, 1760, 2093][i % 4], 0.03, 0.5, (i % 2 ? 0.4 : -0.4)]]),
    ['glitter', 0.45, 0.8], ['glitter', 1.5, 1.8], ['glitter', 2.32, 2.7],
    ['whoosh', 3.15, 0.45, 0.12], ['boom', 3.55, 0.3], ['tick', 3.03, 0.14], ['tick', 3.07, 0.1],
    ...[4.38, 4.42, 4.47, 4.53, 4.58, 5.62, 5.66, 5.71, 5.77, 5.82].map(t => ['tick', t, 0.16]),
    ['boom', 4.38, 0.22], ['whoosh', 4.62, 0.35, 0.1], ['boom', 4.95, 0.32], ['boom', 5.62, 0.22],
    ['riser', 6.1, LOCK, 0.08],
    ...CHAKRAS.map((_, i) => ['bell', 7.0 + i * 0.09, [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25][i], 0.035, 1.6, (i - 3) * 0.12]),
    ['boom', LOCK, 0.42], ['bell', LOCK, 587.33, 0.08, 3.0], ['bell', LOCK + 0.02, 880, 0.05, 3.0, 0.2], ['bell', LOCK + 0.04, 1174.66, 0.03, 3.0, -0.2],
    ['glitter', LOCK + 0.05, LOCK + 0.6],
    ['whoosh', 9.05, 0.6, 0.1], ['bell', 9.6, 1318.5, 0.03, 1.4],
  ],
  async build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bgs = [spaceBackdrop(root, 'teal', { seed: 9 }), spaceBackdrop(root, 'rose', { seed: 10 }), spaceBackdrop(root, 'amber', { seed: 11 })]
    const wash = fill(root, { mixBlendMode: 'screen' })
    const [libra, taurus] = await Promise.all([loadImg(IMG + 'aura/libra.jpg'), loadImg(IMG + 'aura/taurus.jpg')])
    const spr = [orbSprite(libra), orbSprite(taurus)]
    const GLOW = [[201, 140, 255], [170, 230, 120]]

    // orb layer (own canvas, screen-blended onto the nebula) + offscreen for glitch slicing
    const shake = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    const oc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen' }, shake)
    oc.width = W; oc.height = H
    const og = oc.getContext('2d')
    const off = document.createElement('canvas'); off.width = W; off.height = H
    const fg = off.getContext('2d')

    // phone (real screen) for the match cut
    const PW = 560, PH = Math.round(PW * 2532 / 1170), PT = 330
    const phone = el('div', { position: 'absolute', left: (W / 2 - PW / 2) + 'px', top: PT + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '64px', overflow: 'hidden', opacity: 0,
      boxShadow: '0 0 0 2px rgba(239,230,214,0.55), 0 0 0 9px rgba(20,10,46,0.9), 0 0 0 10.5px rgba(242,199,92,0.45), 0 40px 120px rgba(242,199,92,0.28), 0 30px 80px rgba(4,2,14,0.7)' }, root)
    img(phone, A + 'screen-alignment.png', { left: 0, top: 0, width: '100%', height: '100%' })
    const pAura = [[W / 2 - PW * 0.068, PT + PH * 0.217], [W / 2 + PW * 0.068, PT + PH * 0.217]]

    // type
    const top = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '300px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.3em', color: BONE, opacity: 0 }, root, 'LIBRA&nbsp;&nbsp;×&nbsp;&nbsp;TAURUS')
    const BEATS = [
      { word: 'Some spark.', col: SPARK, eb: 'SPARK · WHERE IT LIGHTS', dots: 4, t0: 0.25, t1: B1 },
      { word: 'Some rub.', col: RUB, eb: 'RUB · WHERE IT CATCHES', dots: 2, t0: 3.2, t1: B2 },
      { word: 'Some align.', col: ALIGNC, eb: 'ALIGN · WHERE IT HOLDS', dots: 5, t0: 6.45, t1: B3 },
    ].map(b => {
      const box = el('div', { position: 'absolute', left: 0, top: '1250px', width: W + 'px', height: '300px', opacity: 0 }, root)
      const dots = [0, 1, 2, 3, 4].map(i => `<span style="display:inline-block;width:14px;height:14px;border-radius:50%;margin-left:10px;background:${i < b.dots ? b.col : 'rgba(239,230,214,0.18)'};box-shadow:${i < b.dots ? `0 0 10px ${b.col}` : 'none'}"></span>`).join('')
      const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', top: 0, textAlign: 'center', fontFamily: MONO, fontSize: '27px', letterSpacing: '0.26em', color: b.col, whiteSpace: 'nowrap' }, box, `${b.eb}&nbsp;&nbsp;${dots}`)
      const mk = (color, extra = {}) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: '58px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '150px', lineHeight: 1.1, color, ...extra }, box, b.word)
      const ghostA = mk(RUB, { mixBlendMode: 'screen', opacity: 0 }), ghostB = mk('#5fe0e6', { mixBlendMode: 'screen', opacity: 0 })
      const word = mk(BONE, { textShadow: `0 0 50px ${hexA(b.col, 0.45)}, 0 2px 24px rgba(11,6,32,0.6)` })
      return { ...b, box, eb, word, ghostA, ghostB }
    })
    const tag = endTag(stage, { start: END, end: DURATION })

    function orbPos(t) {
      const th = theta(t), h = halfSep(t)
      return [0, 1].map(i => {
        const a = th + (i ? 0 : Math.PI)
        const depth = Math.sin(a)
        return { x: CX + Math.cos(a) * h, y: CY + depth * h * 0.5 * (1 - prog(t, 6.9, 7.3)), s: 1 + 0.16 * depth, depth }
      })
    }
    function glitchAmt(t) { return Math.max(...GLITCH.map(([a, b]) => lit(t, a, b, 0.02, 0.08))) }
    function shakeAt(t) {
      const k = Math.max(...GRIND.map(([a, b]) => lit(t, a, b, 0.05, 0.1))) * 0.6 + glitchAmt(t)
      return [(noise1(t * 40, 1) - 0.5) * 22 * k, (noise1(t * 37, 2) - 0.5) * 16 * k]
    }

    function drawOrbs(g, t) {
      g.clearRect(0, 0, W, H)
      const P = orbPos(t)
      // to the phone: shrink into the screen's aura pair
      const go = ease.inOutCubic(prog(t, B3, 9.6))
      const out = 1 - prog(t, 9.45, 9.85)
      if (out <= 0) return P
      const order = [0, 1].sort((a, b) => P[a].depth - P[b].depth)
      const beatCol = t < B1 ? SPARK : t < B2 ? RUB : ALIGNC
      for (const i of order) {
        const p = P[i]
        const x = lerp(p.x, pAura[i][0], go), y = lerp(p.y, pAura[i][1], go)
        const sc = lerp(p.s, 0.2, go) * (t < 0.6 ? ease.outCubic(prog(t, 0, 0.6)) * 0.3 + 0.7 : 1)
        const rr = R * sc
        // halo in the sign's own colour, tinted toward the beat colour
        g.globalCompositeOperation = 'lighter'
        const [cr, cg, cb] = GLOW[i]
        const hg = g.createRadialGradient(x, y, rr * 0.2, x, y, rr * 1.6)
        hg.addColorStop(0, `rgba(${cr},${cg},${cb},${0.2 * out})`); hg.addColorStop(0.5, hexA(beatCol, 0.12 * out)); hg.addColorStop(1, 'rgba(0,0,0,0)')
        g.fillStyle = hg; g.fillRect(x - rr * 1.6, y - rr * 1.6, rr * 3.2, rr * 3.2)
        g.globalCompositeOperation = 'source-over'
        g.globalAlpha = out * (0.88 + 0.12 * Math.sin(t * 3 + i))
        g.drawImage(spr[i], x - rr, y - rr, rr * 2, rr * 2)
        g.globalAlpha = 1
      }
      g.globalCompositeOperation = 'source-over'
      return P
    }

    function drawArcs(g, t, P) {
      if (t > B1 + 0.1) return
      g.globalCompositeOperation = 'lighter'
      ARCS.forEach((a, k) => {
        const lt = t - a
        if (lt < 0 || lt > 0.22) return
        const f = Math.round(t * 30)
        const k0 = 1 - lt / 0.22
        const [p0, p1] = P
        const dx = p1.x - p0.x, dy = p1.y - p0.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L
        const e0 = 95 * p0.s, e1 = 95 * p1.s
        for (let s = 0; s < 3; s++) {
          const pts = bolt(p0.x + ux * e0, p0.y + uy * e0 + (s - 1) * 14, p1.x - ux * e1, p1.y - uy * e1 + (s - 1) * 10, k * 97 + f * 13 + s * 7, 14, 46 + s * 10)
          for (const [w, c] of [[22, hexA(SPARK, 0.16 * k0)], [6, hexA(SPARK, 0.7 * k0)], [1.8, `rgba(255,255,255,${0.95 * k0})`]]) {
            g.strokeStyle = c; g.lineWidth = w * (s ? 0.6 : 1); g.lineJoin = 'round'
            g.beginPath(); pts.forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke()
          }
        }
        // flash at the contact points
        for (const [p, e, sg] of [[p0, e0, 1], [p1, e1, -1]]) {
          const x = p.x + ux * e * sg, y = p.y + uy * e * sg
          const fl = g.createRadialGradient(x, y, 0, x, y, 90)
          fl.addColorStop(0, `rgba(220,255,240,${0.6 * k0})`); fl.addColorStop(1, 'rgba(127,216,176,0)')
          g.fillStyle = fl; g.fillRect(x - 90, y - 90, 180, 180)
        }
      })
      g.globalCompositeOperation = 'source-over'
    }

    function drawColumn(g, t, P) {
      if (t < 6.8 || t > 9.7) return
      const out = 1 - prog(t, 9.0, 9.5)
      const gap = 50, x = CX
      const r = rng(77)
      g.globalCompositeOperation = 'lighter'
      // the alignment axis: a fine gold hairline that draws through the column
      const ax = ease.outCubic(prog(t, LOCK - 0.1, LOCK + 0.6))
      if (ax > 0) {
        const len = 520 * ax
        const lg = g.createLinearGradient(0, CY - len, 0, CY + len)
        lg.addColorStop(0, 'rgba(242,199,92,0)'); lg.addColorStop(0.5, `rgba(255,228,160,${0.7 * out})`); lg.addColorStop(1, 'rgba(242,199,92,0)')
        g.fillStyle = lg; g.fillRect(x - 1, CY - len, 2, len * 2)
      }
      // lock bloom
      const bl = lit(t, LOCK - 0.02, LOCK + 0.9, 0.06, 0.8)
      if (bl > 0) {
        const bg = g.createRadialGradient(x, CY, 0, x, CY, 520)
        bg.addColorStop(0, `rgba(255,236,190,${0.55 * bl})`); bg.addColorStop(0.25, `rgba(242,199,92,${0.25 * bl})`); bg.addColorStop(1, 'rgba(242,199,92,0)')
        g.fillStyle = bg; g.fillRect(x - 520, CY - 520, 1040, 1040)
      }
      CHAKRAS.forEach((c, i) => {
        const ty = CY + (3 - i) * gap
        const a0 = r() * Math.PI * 2, d0 = 380 + r() * 260
        const s0 = 6.85 + i * 0.09
        const p = ease.outCubic(prog(t, s0, s0 + 0.55))
        if (p <= 0) return
        const sx = x + Math.cos(a0) * d0, sy = CY + Math.sin(a0) * d0 * 1.2
        const px = lerp(sx, x, p) + (1 - p) * Math.sin(t * 6 + i) * 30, py = lerp(sy, ty, p)
        // streak tail
        if (p < 1) {
          const q = ease.outCubic(prog(t - 0.08, s0, s0 + 0.55)), qx = lerp(sx, x, q), qy = lerp(sy, ty, q)
          g.strokeStyle = hexA(c, 0.5 * out); g.lineWidth = 3; g.beginPath(); g.moveTo(qx, qy); g.lineTo(px, py); g.stroke()
        }
        const pulse = 1 + 0.5 * lit(t, LOCK + i * 0.03, LOCK + 0.5 + i * 0.03, 0.05, 0.4)
        const hr = 34 * pulse
        const hg = g.createRadialGradient(px, py, 0, px, py, hr)
        hg.addColorStop(0, hexA(c, 0.9 * out)); hg.addColorStop(0.45, hexA(c, 0.32 * out)); hg.addColorStop(1, hexA(c, 0))
        g.fillStyle = hg; g.fillRect(px - hr, py - hr, hr * 2, hr * 2)
        g.globalAlpha = out
        g.fillStyle = '#fff'; g.beginPath(); g.arc(px, py, 5 * Math.min(1, pulse), 0, 6.283); g.fill()
        g.globalAlpha = 1
      })
      // gold ring enclosing both auras
      const rp = ease.inOutCubic(prog(t, LOCK, LOCK + 0.75))
      if (rp > 0) {
        g.strokeStyle = `rgba(242,199,92,${0.65 * out})`; g.lineWidth = 2
        g.beginPath(); g.ellipse(x, CY, 400, 300, 0, -Math.PI / 2, -Math.PI / 2 + rp * Math.PI * 2); g.stroke()
        g.strokeStyle = `rgba(242,199,92,${0.22 * out})`; g.lineWidth = 1
        g.beginPath(); g.ellipse(x, CY, 430, 325, 0, Math.PI / 2, Math.PI / 2 + rp * Math.PI * 2); g.stroke()
      }
      g.globalCompositeOperation = 'source-over'
    }

    function glitchSlice(dst, src, t) {
      const k = glitchAmt(t)
      dst.clearRect(0, 0, W, H)
      if (k <= 0) { dst.drawImage(src, 0, 0); return }
      const f = Math.round(t * 30), r = rng(f * 31 + 5)
      // chromatic split
      dst.globalAlpha = 1; dst.drawImage(src, 0, 0)
      dst.globalCompositeOperation = 'lighter'; dst.globalAlpha = 0.5 * k
      dst.drawImage(src, 18 * k, 0); dst.drawImage(src, -14 * k, 4 * k)
      dst.globalCompositeOperation = 'source-over'; dst.globalAlpha = 1
      // displaced bands
      for (let i = 0; i < 9; i++) {
        const y = 460 + r() * 680, h = 8 + r() * 60, dx = (r() - 0.5) * 220 * k
        dst.clearRect(0, y, W, h)
        dst.drawImage(src, 0, y, W, h, dx, y, W, h)
        if (r() < 0.4) { dst.fillStyle = hexA(r() < 0.5 ? RUB : '#5fe0e6', 0.22 * k); dst.fillRect(0, y, W, h * 0.4) }
      }
    }

    return {
      update(t) {
        bgs.forEach((b, i) => {
          const o = i === 0 ? 1 - prog(t, B1 - 0.15, B1 + 0.25) : i === 1 ? prog(t, B1 - 0.15, B1 + 0.25) * (1 - prog(t, B2 - 0.1, B2 + 0.5)) : prog(t, B2 - 0.1, B2 + 0.5)
          b.root.style.opacity = String(o); b.root.style.display = o > 0.001 ? 'block' : 'none'
          if (o > 0.001) b.update(t)
        })
        const bc = t < B1 ? SPARK : t < B2 ? RUB : ALIGNC
        const wk = t < B2 ? 0.16 : 0.12 + 0.18 * lit(t, LOCK, LOCK + 1.2, 0.05, 0.9)
        wash.style.background = `radial-gradient(60% 34% at 50% 44%, ${hexA(bc, wk)}, rgba(0,0,0,0) 70%)`
        wash.style.opacity = String(1 - prog(t, B3, B3 + 0.4))
        const [sx, sy] = shakeAt(t)
        shake.style.transform = `translate(${sx}px, ${sy}px)`
        // orbs + arcs + column → offscreen → glitch slices → visible layer
        const P = drawOrbs(fg, t)
        drawArcs(fg, t, P)
        drawColumn(fg, t, P)
        glitchSlice(og, off, t)
        // phone match cut
        const pp = ease.outCubic(prog(t, 9.15, 9.75))
        phone.style.opacity = String(pp * (1 - prog(t, END - 0.05, END + 0.2)))
        phone.style.transform = `translateY(${lerp(60, 0, pp)}px) scale(${lerp(0.94, 1, pp) + 0.015 * prog(t, 9.75, END)})`
        top.style.opacity = String(ease.outQuad(prog(t, 0.15, 0.6)) * (1 - prog(t, B3 - 0.2, B3 + 0.1)))
        // words — each with its own entrance
        BEATS.forEach((b, i) => {
          const lt = t - b.t0
          const on = prog(t, b.t0, b.t0 + 0.12) * (1 - prog(t, b.t1 - 0.25, b.t1 - 0.02))
          b.box.style.display = on > 0 ? 'block' : 'none'
          if (!on) return
          b.eb.style.opacity = String(ease.outQuad(prog(lt, 0.1, 0.45)))
          b.ghostA.style.opacity = b.ghostB.style.opacity = '0'
          b.word.style.filter = 'none'; b.word.style.clipPath = 'none'
          if (i === 0) {
            // spark: flickers on like a struck filament
            const f = Math.round(t * 30), fl = lt < 0.4 ? (rng(f * 3 + 1)() > 0.45 ? 1 : 0.15) : 1
            b.word.style.opacity = String(fl)
            b.word.style.transform = `translateY(${lerp(16, 0, ease.outCubic(prog(lt, 0, 0.4)))}px)`
            b.word.style.textShadow = `0 0 ${lt < 0.5 ? 70 : 46}px ${hexA(SPARK, lt < 0.5 ? 0.85 : 0.45)}, 0 2px 24px rgba(11,6,32,0.6)`
          } else if (i === 1) {
            // rub: slides in grinding, RGB ghosts on each glitch
            const p = ease.outExpo(prog(lt, 0, 0.5))
            const g = Math.max(glitchAmt(t), 1 - prog(lt, 0, 0.3))
            const f = Math.round(t * 30), r = rng(f * 7 + 3)
            b.word.style.opacity = String(p)
            b.word.style.transform = `translateX(${lerp(-90, 0, p) + (r() - 0.5) * 30 * g}px)`
            b.ghostA.style.opacity = b.ghostB.style.opacity = String(0.8 * g)
            b.ghostA.style.transform = `translateX(${lerp(-90, 0, p) + 14 * g}px)`; b.ghostB.style.transform = `translateX(${lerp(-90, 0, p) - 14 * g}px)`
            if (g > 0.05) { const y0 = r() * 60, y1 = y0 + 10 + r() * 30; b.word.style.clipPath = `polygon(0 0, 100% 0, 100% ${y0}%, 0 ${y0}%, 0 ${y1}%, 100% ${y1}%, 100% 100%, 0 100%)` }
          } else {
            // align: arrives slowly out of a blur, letter-spacing settles; gold flare at lock
            const p = ease.outCubic(prog(lt, 0, 1.0))
            b.word.style.opacity = String(p)
            b.word.style.filter = `blur(${lerp(14, 0, p)}px)`
            b.word.style.letterSpacing = lerp(0.08, 0, p) + 'em'
            b.word.style.transform = 'none'
            const fl = lit(t, LOCK, LOCK + 1.0, 0.06, 0.8)
            b.word.style.textShadow = `0 0 ${50 + 40 * fl}px ${hexA(ALIGNC, 0.4 + 0.45 * fl)}, 0 2px 24px rgba(11,6,32,0.6)`
          }
          b.box.style.opacity = String(on)
        })
        tag.update(t)
      },
      fx(ctx, t) {
        if (t > END + 0.25) return
        const fade = 1 - prog(t, END - 0.1, END + 0.2)
        ctx.globalAlpha = fade
        starField(ctx, t, { seed: 19, sprites: 18, dots: 50, alpha: 0.85 * fade, keepOut: [[90, 1250, 900, 260]] })
        const P = orbPos(t)
        // spark particles from each arc burst
        ARCS.forEach((a, k) => {
          const r = rng(k * 71 + 3)
          const mx = (P[0].x + P[1].x) / 2, my = (P[0].y + P[1].y) / 2
          for (let i = 0; i < 16; i++) {
            const ang = r() * Math.PI * 2, sp = 260 + r() * 520, life = 0.35 + r() * 0.4, ox = (r() - 0.5) * 120
            const lt = t - a
            if (lt < 0 || lt > life) continue
            const x = mx + ox + Math.cos(ang) * sp * lt, y = my + Math.sin(ang) * sp * lt + 300 * lt * lt
            ctx.globalAlpha = fade * (1 - lt / life)
            pixelStar(ctx, x, y, 3, lt < 0.12 ? 0 : 2, SPARK, '#ffffff')
          }
        })
        // rub friction sparks: tangential spray from the contact point while grinding
        GRIND.forEach(([g0, g1], w) => {
          for (let k = 0; ; k++) {
            const s0 = g0 + k * 0.025
            if (s0 > g1) break
            const lt = t - s0
            if (lt < 0) break
            const r = rng(w * 1000 + k * 13 + 1), life = 0.3 + r() * 0.35
            if (lt > life) continue
            const p = orbPos(s0)
            const mx = (p[0].x + p[1].x) / 2, my = (p[0].y + p[1].y) / 2
            const dx = p[1].x - p[0].x, dy = p[1].y - p[0].y, L = Math.hypot(dx, dy) || 1
            const side = r() < 0.5 ? 1 : -1, spread = (r() - 0.5) * 0.9
            const tx = -dy / L * side, ty = dx / L * side
            const vx = (tx + dx / L * spread) * (300 + r() * 500), vy = (ty + dy / L * spread) * (300 + r() * 500)
            const x = mx + vx * lt, y = my + vy * lt + 500 * lt * lt
            ctx.globalAlpha = fade * (1 - lt / life)
            ctx.fillStyle = r() < 0.3 ? HOT : RUB
            const sz = r() < 0.25 ? 9 : 5
            ctx.fillRect(Math.round(x - sz / 2), Math.round(y - sz / 2), sz, sz)
            ctx.fillStyle = hexA(RUB, 0.35 * (1 - lt / life)); ctx.fillRect(Math.round(x - vx * 0.02), Math.round(y - vy * 0.02), 3, 3)
          }
        })
        // gold glints drifting up after the lock
        if (t > LOCK) {
          const r = rng(555)
          for (let i = 0; i < 26; i++) {
            const t0 = LOCK + r() * 1.2, life = 1.0 + r() * 0.8, x0 = CX + (r() - 0.5) * 820, y0 = CY + (r() - 0.5) * 500
            const lt = t - t0
            if (lt < 0 || lt > life) continue
            const tw = Math.sin(Math.PI * lt / life)
            ctx.globalAlpha = fade * tw
            pixelStar(ctx, x0, y0 - 60 * lt, 3, tw > 0.8 ? 0 : 2, GOLD, HOT)
          }
        }
        ctx.globalAlpha = 1
      },
    }
  },
}
