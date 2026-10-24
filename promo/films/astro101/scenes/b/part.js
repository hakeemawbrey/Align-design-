// ─────────────────────────────────────────────── ASTRO101 v2 part b · ELEMENTS → CHARACTERS → SNAP! (19.8–40.2)
// Starts on H exactly (drawSky(SKY_H) + drawWheelH + grain at GRAIN_H) and holds it still to 20.2.
// Ends on H exactly: every layer added here is at zero by 39.6. Key hits sit on the 108 bpm beat B(n) = 0.6 + n·0.5556.
//
// Beat map:
//   20.32–20.6  "Every sign gets an element." pops in word by word (accent "element" lands on B36 = 20.6), out 26.45–26.7
//   21.16 22.27 23.38 24.49 (B37/39/41/43)  fire, earth, air, water triangles SNAP in (0.3 s, fat glowing lines, a width
//          bounce), sparkle bursts on their corners, their three glyphs bounce and bands flash. Punchlines stack under the
//          wheel, one per triangle: "Fire: go go go." · "Earth: build it." · "Air: talk it out." · "Water: feel everything."
//          (out 26.5–26.75; the last is readable ≈24.8–26.5). Triangles out 26.3–26.9.
//   27.06–27.27 "Planets are the characters." (accent on B48), out 33.05–33.3 · wheel dims to 0.3 (27.3–27.9)
//   28.38 28.93 29.49 30.05 30.6 (B50–54)  five rows drop in with a squash-and-bounce: Sun: main character · Moon: your
//          feelings · Mercury: your texts · Venus: your crush · Mars: your temper. 31.16–32.82 the orbs hop on the beat.
//          Row text out 33.1–33.35.
//   33.2–33.9 wheel back to full · 33.3–34.3 orbs lift onto their lanes and spin up like a slot machine
//   33.45–34.0 "Your chart = the sky the second you were born." (out 38.6–38.85)
//   34.45 bold pill pops in · 34.6–35.55 types "May 12, 1998 · 5:00 PM · Tulsa"
//   35.6 (B63) SNAP: every planet stops dead in its 1998 sign with a tiny spring (Sun 21°48′ Taurus, Mars 21° Taurus —
//          conjunct the Sun that day — Mercury 27° Aries, Venus 9° Aries, Moon 7° Sagittarius); soft white pulse, rings,
//          ticks to the ring, the signs light up. Pill pops out 36.65–36.85.
//   36.85 / 37.27 (B66)  "Basically a baby photo." / "Of space." (out 39.1–39.35)
//   39.0–39.5 orbs pop out, glows fade → plain H from 39.6
import { clamp, lerp, prog, ease, el, C, rng } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, ELEMENT_COLOR, WHEEL, SKY_H, GRAIN_H, TYPE, easeOutBack, ptOf, angOf, signMid, drawWheelH } from '../../../wheel.js'

const T0 = 19.8, T1 = 40.2
const BEAT = 60 / 108, B = n => 0.6 + n * BEAT
const io = ease.inOutCubic, iq = ease.inOutQuad
const GLYPH_FONT = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', sans-serif"
const SIGN_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const VS = '︎'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif", GARA = "'EB Garamond', Georgia, serif", MONO_F = "'Space Mono', monospace"

// ── beat 1: elements
const HEAD1 = { words: ['Every', 'sign', 'gets', 'an', ['element.', ELEMENT_COLOR.fire]], at: B(36) - 4 * 0.07, out: [26.45, 26.7] }
const ELS = [
  { el: 'fire', word: 'Fire:', rest: 'go go go.', at: B(37) },
  { el: 'earth', word: 'Earth:', rest: 'build it.', at: B(39) },
  { el: 'air', word: 'Air:', rest: 'talk it out.', at: B(41) },
  { el: 'water', word: 'Water:', rest: 'feel', accent: 'everything.', at: B(43) },
]
const SNAP_LEN = 0.3, TRI_OUT = [26.3, 26.9], TRI_R = WHEEL.rIn - 10, PUNCH1_OUT = [26.5, 26.75]

// ── beat 2: characters
const HEAD2 = { words: ['Planets', 'are', 'the', ['characters.', '#f2c75c']], at: B(48) - 3 * 0.07, out: [33.05, 33.3] }
const DIM = { in: [27.3, 27.9], out: [33.2, 33.9], k: 0.3 }
const PLANETS = [
  { id: 'sun', name: 'Sun:', glyph: '☉', what: 'main character', col: ['#fff4cf', '#f6c45a', '#b9731f'], row: B(50), lon: 51.8, lane: 285, rw: 31, V: 240 },
  { id: 'moon', name: 'Moon:', glyph: '☽', what: 'your feelings', col: ['#ffffff', '#dcd6f2', '#8a82b4'], row: B(51), lon: 247.2, lane: 334, rw: 27, V: 420 },
  { id: 'mercury', name: 'Mercury:', glyph: '☿', what: 'your texts', col: ['#f2fbff', '#9fd2e8', '#4f7f9a'], row: B(52), lon: 27.2, lane: 180, rw: 23, V: 330 },
  { id: 'venus', name: 'Venus:', glyph: '♀', what: 'your crush', col: ['#fff0f6', '#f59cc4', '#a8507a'], row: B(53), lon: 9.4, lane: 132, rw: 24, V: 300 },
  { id: 'mars', name: 'Mars:', glyph: '♂', what: 'your temper', col: ['#ffe2d6', '#f0603a', '#8f2a14'], row: B(54), lon: 51.4, lane: 230, rw: 24, V: 200 },
]
const ROW_Y = i => WHEEL.cy + (i - 2) * 132, ORB_X = 150, ORB_R = 36, TXT_X = 214
const DROP = 0.42, ROW_OUT = [33.1, 33.35], HOPS = [B(55), B(56), B(57), B(58)]

// ── beat 3: snap
const HEAD3 = { words: ['Your', 'chart', '=', 'the', 'sky', 'the', ['second', '#f2c75c'], 'you', 'were', 'born.'], at: 33.45, out: [38.6, 38.85] }
const LIFT = [33.3, 34.3], RAMP = [33.4, 34.3], SNAP = B(63)
const PILL = { y: 1585, w: 940, h: 124, fs: 50, pad: 46, in: 34.45, out: [36.65, 36.85] }
const TEXT = 'May 12, 1998 · 5:00 PM · Tulsa'
const CHUNKS = [[0, 12, 34.6, 35.05], [12, 22, 35.15, 35.36], [22, 30, 35.42, 35.55]]
const TYPED_AT = (() => {
  const r = rng(512), out = []
  for (const [a, b, t0, t1] of CHUNKS) {
    const w = []; let acc = 0
    for (let i = a; i < b; i++) { acc += 0.6 + r() * 0.8 + (TEXT[i] === ' ' ? 0.5 : 0); w.push(acc) }
    w.forEach(v => out.push(t0 + (v - w[0]) / Math.max(1e-6, acc - w[0]) * (t1 - t0)))
  }
  return out
})()
const PUNCH3 = { l1: 36.85, l2: B(66), out: [39.1, 39.35] }
const ORB_OUT = 39.0, GLOW_OUT = [39.0, 39.5]

const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
/** pop-in: [scale, alpha, rise px] for a thing that pops at t0 (0.6 → ~1.05 → 1, rises 30 px, over `d`) */
const pop = (t, t0, d = 0.28) => { const x = prog(t, t0, t0 + d); return [lerp(0.6, 1, easeOutBack(x)), clamp(x * 3), 30 * (1 - ease.outCubic(x))] }
/** pop-out multiplier: [scale, alpha] */
const popOut = (t, [a, b]) => { const x = prog(t, a, b); return [1 - 0.25 * ease.inQuad(x), 1 - iq(x)] }

/** a glowing planet orb: big soft halo, lit sphere, ink glyph, pixel-star glint; sx/sy squash */
function drawOrb(ctx, x, y, r, p, a, t, { glow = 1, sx = 1, sy = 1 } = {}) {
  if (a <= 0.002 || r <= 0.5) return
  const [hi, mid, lo] = p.col
  ctx.save()
  ctx.globalAlpha = a
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * (3.8 + 0.3 * Math.sin(t * 2.3 + r))
  const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, hr)
  g.addColorStop(0, hexA(mid, 0.5 * glow)); g.addColorStop(0.4, hexA(mid, 0.16 * glow)); g.addColorStop(1, hexA(mid, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.translate(x, y); ctx.scale(sx, sy)
  const b = ctx.createRadialGradient(-r * 0.38, -r * 0.42, r * 0.08, 0, 0, r)
  b.addColorStop(0, hi); b.addColorStop(0.45, mid); b.addColorStop(1, lo)
  ctx.fillStyle = b; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  ctx.lineWidth = 2; ctx.strokeStyle = hexA(hi, 0.6); ctx.stroke()
  ctx.font = `bold ${Math.round(r * 1.18)}px ${GLYPH_FONT}`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(28,14,48,0.85)'
  ctx.fillText(p.glyph + VS, 0, r * 0.05)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const tw = 0.55 + 0.45 * Math.sin(t * 3.1 + r * 1.7)
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = a * tw
  ctx.imageSmoothingEnabled = false
  drawPixelStar(ctx, x + r * 0.62 * sx, y - r * 0.66 * sy, Math.max(7, Math.round(r * 0.55)), 1, hi, '#ffffff')
  ctx.imageSmoothingEnabled = true
  ctx.restore()
}

/** a burst of pixel stars flying out from (x, y) at t0 */
const BURSTS = new Map()
function burst(ctx, x, y, t0, t, cols, { n = 8, dist = 80, seed = 1, len = 0.65 } = {}) {
  const p = prog(t, t0, t0 + len)
  if (p <= 0 || p >= 1) return
  let parts = BURSTS.get(seed)
  if (!parts) { const r = rng(seed * 97 + 13); parts = Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), s: 10 + Math.round(r() * 2) * 4, k: Math.floor(r() * 3) })); BURSTS.set(seed, parts) }
  ctx.save(); ctx.imageSmoothingEnabled = false; ctx.globalCompositeOperation = 'lighter'
  parts.forEach((q, i) => {
    const d = q.d * ease.outCubic(p)
    ctx.globalAlpha = (1 - p) * (1 - p) * 0.95
    drawPixelStar(ctx, x + Math.cos(q.a) * d, y + Math.sin(q.a) * d, q.s, q.k === 0 ? 0 : q.k, cols[i % cols.length], '#fff6ea')
  })
  ctx.restore()
}

/** a wedge of the ring (between rIn and rOut) for sign i */
function wedge(ctx, i, r0 = WHEEL.rIn, r1 = WHEEL.rOut) {
  const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
  ctx.beginPath(); ctx.arc(WHEEL.cx, WHEEL.cy, r1, a0, a1, true); ctx.arc(WHEEL.cx, WHEEL.cy, r0, a1, a0, false); ctx.closePath()
}

/** a sign glyph lit (and scaled) on top of drawWheelH's */
function glowGlyph(ctx, i, k, sc = 1) {
  if (k <= 0.002) return
  const s = SIGNS[i], p = ptOf(i * 30 + 15, WHEEL.rGlyph)
  ctx.save()
  ctx.font = `bold ${Math.round(58 * sc)}px ${SIGN_FONT}`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = s.color; ctx.shadowBlur = 26 * k
  ctx.globalAlpha = k; ctx.fillStyle = s.color
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.shadowBlur = 0
  ctx.globalAlpha = 0.3 * k; ctx.fillStyle = '#fff6ea'
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  await Promise.all([`800 108px Inter`, `700 62px Inter`, `600 50px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`].map(f => document.fonts.load(f).catch(() => {})))

  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // ── headlines: Inter 800, one coloured EB Garamond accent word, popping in word by word
  function headline(spec) {
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '196px', textAlign: 'center', font: TYPE.head, lineHeight: String(TYPE.headLine), letterSpacing: '-0.02em', color: C.bone, textShadow: shadow, display: 'none' }, root)
    const words = spec.words.map((w, i) => {
      const acc = Array.isArray(w)
      const s = el('span', { display: 'inline-block', margin: '0 0.13em', transformOrigin: '50% 75%', opacity: 0, ...(acc ? { font: TYPE.accent, lineHeight: '0.86', color: w[1], letterSpacing: '0', textShadow: `0 0 26px ${hexA(w[1], 0.45)}, ${shadow}` } : {}) }, box, acc ? w[0] : w)
      return s
    })
    return {
      update(t) {
        const on = t > spec.at - 0.05 && t < spec.out[1]
        box.style.display = on ? 'block' : 'none'
        if (!on) return
        const [os, oa] = popOut(t, spec.out)
        words.forEach((s, i) => {
          const [sc, a, ry] = pop(t, spec.at + i * 0.07)
          s.style.opacity = String(a * oa)
          s.style.transform = `translateY(${ry}px) scale(${sc * os})`
        })
      },
    }
  }
  const heads = [headline(HEAD1), headline(HEAD2), headline(HEAD3)]

  // ── element punchlines (Inter 700, stacked under the wheel)
  const sub = { position: 'absolute', left: '70px', width: (W - 140) + 'px', textAlign: 'center', font: TYPE.sub, letterSpacing: '-0.01em', color: C.bone, textShadow: shadow, whiteSpace: 'pre', transformOrigin: '50% 60%', opacity: 0 }
  const punch1 = ELS.map((e, i) => {
    const d = el('div', { ...sub, top: (1500 + i * 76) + 'px' }, root)
    const col = ELEMENT_COLOR[e.el]
    el('span', { color: col, textShadow: `0 0 20px ${hexA(col, 0.5)}, ${shadow}` }, d, e.word)
    el('span', {}, d, ' ' + e.rest)
    if (e.accent) el('span', { font: "italic 500 72px 'EB Garamond', serif", color: col, textShadow: `0 0 20px ${hexA(col, 0.5)}, ${shadow}` }, d, ' ' + e.accent)
    return d
  })

  // ── planet rows (text; orbs on the canvas)
  const rows = PLANETS.map((p, i) => {
    const r = el('div', { position: 'absolute', left: TXT_X + 'px', top: (ROW_Y(i) - 40) + 'px', height: '80px', lineHeight: '80px', whiteSpace: 'pre', font: '700 60px ' + INTER, letterSpacing: '-0.01em', color: C.bone, opacity: 0, textShadow: shadow, transformOrigin: '0 50%' }, root)
    el('span', { color: p.col[1], textShadow: `0 0 20px ${hexA(p.col[1], 0.5)}, ${shadow}` }, r, p.name)
    el('span', {}, r, ' ' + p.what)
    return r
  })

  // ── bold birth-data pill (film 1 S4 / birthtime hook recipe, re-laid for vertical, bigger)
  const pill = el('div', {
    position: 'absolute', left: (W / 2 - PILL.w / 2) + 'px', top: (PILL.y - PILL.h / 2) + 'px', width: PILL.w + 'px', height: PILL.h + 'px', borderRadius: '999px',
    background: 'linear-gradient(180deg, rgba(62,36,128,0.9) 0%, rgba(44,22,98,0.92) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 3px rgba(242,199,92,0.55), 0 0 40px rgba(242,199,92,0.18), 0 26px 70px rgba(11,6,32,0.6)',
    backdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden', opacity: 0, transformOrigin: '50% 50%',
  }, root)
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0))', pointerEvents: 'none' }, pill)
  const pglint = el('div', { position: 'absolute', top: '-30px', width: '150px', height: (PILL.h + 60) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.12), rgba(255,255,255,0))', transform: 'skewX(-22deg)', pointerEvents: 'none' }, pill)
  const field = el('div', { position: 'absolute', left: PILL.pad + 'px', top: '50%', transform: 'translateY(-50%)', font: `600 ${PILL.fs}px ${INTER}`, color: C.bone, whiteSpace: 'pre', letterSpacing: '-0.01em' }, pill)
  const caret = el('span', { display: 'inline-block', width: '4px', height: Math.round(PILL.fs * 1.08) + 'px', background: '#f2c75c', marginLeft: '3px', verticalAlign: '-9px' }, null)
  const sendD = PILL.h - 32
  el('div', {
    position: 'absolute', right: '16px', top: '16px', width: sendD + 'px', height: sendD + 'px', borderRadius: '999px',
    background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 42px ${INTER}`,
  }, pill, '↑')

  // ── "Basically a baby photo. / Of space."
  const p3a = el('div', { ...sub, top: '1530px' }, root, 'Basically a baby photo.')
  const p3b = el('div', { ...sub, top: '1610px', font: "italic 500 84px 'EB Garamond', serif", color: '#f2c75c', textShadow: `0 0 26px rgba(242,199,92,0.45), ${shadow}` }, root, 'Of space.')

  const C_ = { x: WHEEL.cx, y: WHEEL.cy }
  const triPts = e => [0, 4, 8].map(k => ptOf(signMid(SIGNS.findIndex(s => s.el === e)) + k * 30, TRI_R))

  // ── slot-machine spin: speed ramps up (smoothstep) over RAMP, constant after, and the planet reaches its natal lon
  // exactly at SNAP, where it stops dead with a tiny damped spring. The list → lane correction blends away during LIFT.
  const G = t => { const D = RAMP[1] - RAMP[0], x = prog(t, RAMP[0], RAMP[1]); return D * (x * x * x - x * x * x * x / 2) + Math.max(0, t - RAMP[1]) }
  PLANETS.forEach((p, i) => {
    const dx = ORB_X - C_.x, dy = ROW_Y(i) - C_.y
    p.rL = Math.hypot(dx, dy)
    p.lonL = 180 - Math.atan2(dy, dx) * 180 / Math.PI
    const off0 = -p.V * (G(SNAP) - G(LIFT[0]))
    p.fix = ((p.lonL - (p.lon + off0)) % 360 + 540) % 360 - 180      // shortest correction
  })
  const lonAt = (p, t) => {
    if (t >= SNAP) { const tau = t - SNAP; return p.lon + 7 * Math.sin(tau * Math.PI * 2 * 3) * Math.exp(-tau / 0.13) }
    return p.lon - p.V * (G(SNAP) - G(t)) + p.fix * (1 - io(prog(t, LIFT[0], LIFT[1])))
  }
  const speedAt = (p, t) => (t >= SNAP ? 0 : p.V * clamp(prog(t, RAMP[0], RAMP[1])) ** 2)

  return {
    start: T0, end: T1, root,
    update(t) {
      const ctx = bx
      // ── sky + wheel (exactly H at both edges; dimmed under the character list)
      drawSky(bx, t, SKY_H)
      const wk = 1 - (1 - DIM.k) * iq(prog(t, DIM.in[0], DIM.in[1])) * (1 - iq(prog(t, DIM.out[0], DIM.out[1])))
      drawWheelH(bx, { k: wk })
      const glyph = new Array(12).fill(0).map(() => [0, 1])     // [glow k, scale]
      const lift = (i, k, sc = 1) => { if (k > glyph[i][0]) glyph[i] = [k, sc] }

      // ── beat 1: element triangles snap in
      const triOut = 1 - iq(prog(t, TRI_OUT[0], TRI_OUT[1]))
      if (t > 21 && t < TRI_OUT[1]) {
        ELS.forEach((e, ei) => {
          const p = prog(t, e.at, e.at + SNAP_LEN)
          if (p <= 0 || triOut <= 0) return
          const col = ELEMENT_COLOR[e.el], pts = triPts(e.el), si = SIGNS.findIndex(x => x.el === e.el)
          // bands flash softly, then rest at a gentle tint
          const flash = Math.exp(-Math.max(0, t - e.at) / 0.35)
          ctx.save()
          for (let s = 0; s < 3; s++) { wedge(ctx, si + s * 4); ctx.globalAlpha = (0.14 + 0.3 * flash) * triOut; ctx.fillStyle = SIGNS[si + s * 4].color; ctx.fill() }
          ctx.restore()
          const d = ease.outCubic(p) * 3
          const path = () => {
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
            for (let s = 0; s < 3; s++) { const f = clamp(d - s); if (f <= 0) break; const a = pts[s], b = pts[(s + 1) % 3]; ctx.lineTo(lerp(a.x, b.x, f), lerp(a.y, b.y, f)) }
            if (d >= 3) ctx.closePath()
          }
          const wob = 1 + 0.9 * Math.sin(Math.PI * 2 * 2 * Math.max(0, t - e.at - SNAP_LEN)) * Math.exp(-Math.max(0, t - e.at - SNAP_LEN) / 0.18) * (t > e.at + SNAP_LEN ? 1 : 0)
          ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'
          if (d >= 3) { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); ctx.closePath(); ctx.globalAlpha = 0.08 * triOut; ctx.fillStyle = col; ctx.fill() }
          ctx.globalAlpha = 0.6 * triOut; ctx.strokeStyle = col; ctx.lineWidth = 14 * wob; ctx.shadowColor = col; ctx.shadowBlur = 34
          path(); ctx.stroke()
          ctx.shadowBlur = 0
          ctx.globalAlpha = triOut; ctx.lineWidth = 6 * wob; path(); ctx.stroke()
          ctx.globalAlpha = 0.6 * triOut; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 2; path(); ctx.stroke()
          pts.forEach((q, s) => {
            const tv = e.at + SNAP_LEN * (s / 3)
            const vk = clamp(prog(t, tv - 0.02, tv + 0.08)) * triOut
            if (vk <= 0) return
            ctx.globalCompositeOperation = 'lighter'
            const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 40)
            g.addColorStop(0, hexA(col, 0.95 * vk)); g.addColorStop(0.35, hexA(col, 0.4 * vk)); g.addColorStop(1, hexA(col, 0))
            ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 40, 0, Math.PI * 2); ctx.fill()
            ctx.globalCompositeOperation = 'source-over'
            ctx.globalAlpha = vk; ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.arc(q.x, q.y, 7, 0, Math.PI * 2); ctx.fill()
            const bk = t - tv, sc = 1 + 0.38 * Math.sin(Math.min(Math.PI, Math.max(0, bk) * Math.PI / 0.32)) * (bk < 0.32 ? 1 : 0)
            lift(si + s * 4, vk, sc)
          })
          ctx.restore()
          pts.forEach((q, s) => burst(ctx, q.x, q.y, e.at + SNAP_LEN * (s / 3), t, [col, '#fff3e0', SIGNS[si + s * 4].color], { seed: ei * 3 + s + 1, dist: 90 }))
        })
      }

      // ── beat 3 extras under the orbs: lanes while spinning, occupied signs + ticks after the snap
      const glowOut = 1 - iq(prog(t, GLOW_OUT[0], GLOW_OUT[1]))
      const laneK = iq(prog(t, 33.6, 34.3)) * (1 - iq(prog(t, SNAP + 0.3, SNAP + 1.4)))
      if (laneK > 0) {
        ctx.save(); ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 11])
        for (const p of PLANETS) { ctx.globalAlpha = 0.22 * laneK; ctx.beginPath(); ctx.arc(C_.x, C_.y, p.lane, 0, Math.PI * 2); ctx.stroke() }
        ctx.restore()
      }
      const occK = clamp(prog(t, SNAP, SNAP + 0.12)) * glowOut
      if (occK > 0) {
        const flash = Math.exp(-(t - SNAP) / 0.4)
        ctx.save()
        ;[1, 8, 0].forEach(i => { wedge(ctx, i); ctx.globalAlpha = (0.2 + 0.25 * flash) * occK; ctx.fillStyle = SIGNS[i].color; ctx.fill() })
        ctx.restore()
        const bsc = 1 + 0.35 * Math.sin(Math.min(Math.PI, (t - SNAP) * Math.PI / 0.34)) * (t - SNAP < 0.34 ? 1 : 0)
        lift(1, occK, bsc); lift(8, occK, bsc); lift(0, 0.75 * occK, bsc)
        const tk = ease.outCubic(prog(t, SNAP, SNAP + 0.35))
        PLANETS.forEach(p => {
          const a = ptOf(p.lon, p.lane + p.rw + 10), b = ptOf(p.lon, WHEEL.rIn)
          ctx.save(); ctx.globalAlpha = 0.7 * occK; ctx.strokeStyle = p.col[1]; ctx.lineWidth = 3; ctx.lineCap = 'round'
          ctx.shadowColor = p.col[1]; ctx.shadowBlur = 10
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(lerp(a.x, b.x, tk), lerp(a.y, b.y, tk)); ctx.stroke()
          ctx.restore()
        })
      }
      glyph.forEach(([k, sc], i) => glowGlyph(ctx, i, k, sc))

      // ── planets: rows (drop + squash) → hops → lift → slot-machine spin → SNAP
      const liftK = io(prog(t, LIFT[0], LIFT[1]))
      PLANETS.forEach((p, i) => {
        if (t < p.row) return
        // pop out at the end, staggered
        const ox = prog(t, ORB_OUT + i * 0.06, ORB_OUT + i * 0.06 + 0.3)
        if (ox >= 1) return
        const outS = ox > 0 ? (ox < 0.35 ? 1 + 0.15 * Math.sin(ox / 0.35 * Math.PI / 2) : 1.15 * (1 - ease.inCubic((ox - 0.35) / 0.65))) : 1
        // drop in from above with a bounce + squash on landing
        const dp = prog(t, p.row, p.row + DROP)
        const fall = dp < 0.5 ? -110 * (1 - ease.inQuad(dp / 0.5)) : 0
        const land = dp >= 0.5 ? (dp - 0.5) / 0.5 : 0
        let sq = dp >= 0.5 ? Math.sin(land * Math.PI * 2) * Math.exp(-land * 3) * 0.28 : -0.12 * (dp / 0.5)
        // hops on the beat while the list holds
        let hop = 0
        HOPS.forEach(h => { const hp = prog(t, h + i * 0.06, h + i * 0.06 + 0.38); if (hp > 0 && hp < 1) { hop -= 26 * Math.sin(hp * Math.PI); sq += hp > 0.85 ? 0.12 * Math.sin((hp - 0.85) / 0.15 * Math.PI) : -0.05 * Math.sin(hp * Math.PI) } })
        const ap = clamp(dp * 4)
        // polar path: at liftK 0 this is exactly the row spot (ORB_X, ROW_Y)
        const lane = ptOf(lonAt(p, t), lerp(p.rL, p.lane, liftK))
        const px = lane.x, py = lane.y + (fall + hop) * (1 - liftK)
        const r = lerp(ORB_R, p.rw, liftK) * outS
        // spin streak (slot-machine blur)
        const v = speedAt(p, t)
        if (v > 20 && liftK > 0) {
          const L = v * 0.12, lon = lonAt(p, t), rr = lerp(p.rL, p.lane, liftK)
          ctx.save(); ctx.lineCap = 'round'
          for (let s = 0; s < 6; s++) {
            const a0 = angOf(lon - L * (s / 6)), a1 = angOf(lon - L * ((s + 1) / 6))
            ctx.globalAlpha = 0.55 * (1 - s / 6) * clamp(v / 150); ctx.strokeStyle = p.col[1]; ctx.lineWidth = r * 1.5 * (1 - s / 7)
            ctx.beginPath(); ctx.arc(C_.x, C_.y, rr, a0, a1, false); ctx.stroke()
          }
          ctx.restore()
        }
        // snap ring
        const sr = prog(t, SNAP, SNAP + 0.5)
        if (sr > 0 && sr < 1) { ctx.save(); ctx.globalAlpha = 0.85 * (1 - sr); ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py, r + 8 + 50 * ease.outCubic(sr), 0, Math.PI * 2); ctx.stroke(); ctx.restore() }
        drawOrb(ctx, px, py, r, p, ap, t, { glow: 1 + 0.8 * Math.exp(-Math.max(0, t - SNAP) / 0.3) * (t >= SNAP ? 1 : 0), sx: 1 + sq * (1 - liftK), sy: 1 - sq * (1 - liftK) })
        if (dp > 0.5) burst(ctx, ORB_X, ROW_Y(i) + 10, p.row + DROP * 0.5, t, [p.col[1], '#fff3e0'], { seed: 40 + i, n: 7, dist: 70, len: 0.5 })
        if (t >= SNAP) burst(ctx, px, py, SNAP, t, [p.col[1], '#fff3e0', '#f2c75c'], { seed: 60 + i, n: 8, dist: 85 })
      })
      // soft white snap pulse (a swell, not a strobe)
      const sp = prog(t, SNAP - 0.03, SNAP + 0.5)
      if (sp > 0 && sp < 1) {
        const k = Math.sin(Math.PI * Math.min(1, sp * 4)) * (sp < 0.25 ? 1 : 0) + (sp >= 0.25 ? (1 - (sp - 0.25) / 0.75) ** 2 : 0)
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        const g = ctx.createRadialGradient(C_.x, C_.y, 0, C_.x, C_.y, WHEEL.rOut * 1.2)
        g.addColorStop(0, `rgba(255,248,236,${0.22 * k})`); g.addColorStop(0.6, `rgba(255,248,236,${0.1 * k})`); g.addColorStop(1, 'rgba(255,248,236,0)')
        ctx.fillStyle = g; ctx.fillRect(0, C_.y - WHEEL.rOut * 1.2, W, WHEEL.rOut * 2.4)
        ctx.restore()
      }

      // ── grain
      drawGrain(gx, t)

      // ── type
      heads.forEach(h => h.update(t))
      const [p1s, p1a] = popOut(t, PUNCH1_OUT)
      punch1.forEach((d, i) => {
        const [sc, a, ry] = pop(t, ELS[i].at + 0.12, 0.32)
        d.style.opacity = String(a * p1a); d.style.transform = `translateY(${ry}px) scale(${sc * p1s})`
      })
      const [rs, ra] = popOut(t, ROW_OUT)
      rows.forEach((r, i) => {
        const [sc, a, ry] = pop(t, PLANETS[i].row + 0.12, 0.3)
        r.style.opacity = String(a * ra); r.style.transform = `translateY(${ry * 0.6}px) scale(${sc * rs})`
      })
      // pill
      const [ps, pa] = pop(t, PILL.in, 0.34), [pos, poa] = popOut(t, PILL.out)
      pill.style.opacity = String(pa * poa)
      pill.style.transform = `translateY(${ry0(t)}px) scale(${ps * pos})`
      const n = TYPED_AT.filter(v => v <= t).length
      field.textContent = TEXT.slice(0, n)
      caret.style.opacity = (t < SNAP || Math.floor((t - SNAP) * 2.4) % 2 === 1) ? '1' : '0'
      field.appendChild(caret)
      pglint.style.left = lerp(-200, PILL.w + 80, prog(t, SNAP, SNAP + 0.7)) + 'px'
      // baby photo
      const [o3s, o3a] = popOut(t, PUNCH3.out)
      ;[[p3a, PUNCH3.l1], [p3b, PUNCH3.l2]].forEach(([d, at]) => {
        const [sc, a, ry] = pop(t, at, 0.32)
        d.style.opacity = String(a * o3a); d.style.transform = `translateY(${ry}px) scale(${sc * o3s})`
      })
    },
  }
  function ry0(t) { return 30 * (1 - ease.outCubic(prog(t, PILL.in, PILL.in + 0.34))) }
}

const D5 = 587.33, E5 = 659.25, FS5 = 739.99, A5 = 880, B5 = 987.77, D6 = 1174.66
export const cues = [
  // headlines: a pop per word, rising
  ...HEAD1.words.map((_, i) => ['pop', HEAD1.at + i * 0.07, [D5, E5, FS5, A5, D6][i], i === 4 ? 0.06 : 0.035, 0]),
  ...ELS.flatMap((e, i) => [['pluck', e.at, [293.66, 329.63, 369.99, 440][i], 0.05, 0.5, [-0.4, 0.4, -0.25, 0.25][i]], ['pop', e.at + 0.12, [A5, B5, D6, 1318.51][i], 0.05, [-0.3, 0.3, -0.2, 0.2][i]]]),
  ['whoosh', TRI_OUT[0], 0.6, 0.02],
  ...HEAD2.words.map((_, i) => ['pop', HEAD2.at + i * 0.07, [E5, FS5, A5, D6][i], i === 3 ? 0.06 : 0.035, 0]),
  ...PLANETS.flatMap((p, i) => [['pop', p.row + DROP * 0.5, [D6, B5, A5, FS5, E5][i], 0.055, [-0.3, 0.3, -0.15, 0.15, 0][i]], ['tick', p.row + DROP * 0.5, 0.012]]),
  ...HOPS.map((h, j) => ['pluck', h, [440, 554.37, 659.25, 880][j], 0.03, 0.3, 0]),
  ...HEAD3.words.map((_, i) => ['pop', HEAD3.at + i * 0.07, [D5, E5, FS5, A5, B5, A5, D6, B5, A5, D6][i], i === 6 ? 0.055 : 0.03, 0]),
  ['riser', LIFT[0], SNAP, 0.03],
  ['pop', PILL.in, 740, 0.05, 0],
  // slot-machine rattle on 16ths
  ...Array.from({ length: Math.floor((SNAP - 34.0) / (BEAT / 4)) }, (_, k) => ['tick', SNAP - (k + 1) * (BEAT / 4), 0.008 + 0.004 * (k % 2)]),
  ['tick', SNAP, 0.04], ['boom', SNAP, 0.04], ['glitter', SNAP, SNAP + 0.9], ['bell', SNAP, 1479.98, 0.018, 1.8, 0],
  ['pop', PILL.out[0], 600, 0.03, 0],
  ['pop', PUNCH3.l1, A5, 0.045, 0], ['pop', PUNCH3.l2, D6, 0.06, 0],
  ...PLANETS.map((_, i) => ['pop', ORB_OUT + i * 0.06, [D6, B5, A5, FS5, E5][i], 0.03, 0]),
]
