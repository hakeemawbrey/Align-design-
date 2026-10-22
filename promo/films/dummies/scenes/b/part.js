// ─────────────────────────────────────────────── DUMMIES part b · Q3 RISING → Q4 MERCURY → Q5 CUSP (19.8–40.2)
// v2 style (adapted from astro101 part b v2). Starts on H exactly (drawSky(SKY_H) + drawWheelH + grain at GRAIN_H), held
// still to 20.2; every added layer is at zero by 39.6 and the wheel is unrotated from 27.0, so the end is exactly H.
// Key hits sit on the 108 bpm beat B(n) = 0.6 + n·0.5556.
//
// Beat map:
//   Q3  20.3  eyebrow "Q3" + "What's a Rising sign?" pops word by word ("Rising", Libra colour, on B36 = 20.6), out 26.2–26.45
//       20.7–21.1 a bold gold horizon line draws across the wheel at 9–3 o'clock, "AC" pops at the left (B37)
//       21.15–23.4 the sky turns clockwise (the way it really turns) 0→192°, so 12° Libra climbs up over the left horizon
//       like a sunrise: warm glow above the line, Libra's band and glyph light up, a sparkle burst as it crosses (≈22.8)
//       22.27 (B39) "The sign coming up over the horizon / when you were born." (out 24.25–24.45)
//       24.49 (B43) "Your first impression." (out 26.2–26.45)
//       25.9–27.0 the wheel keeps turning to 360° (a full day) → back to the H orientation; horizon + glow out 25.9–26.6
//   Q4  26.55 "Q4" + "Why's everyone blaming Mercury?" ("Mercury" on B47 = 26.71), out 33.0–33.25
//       27.82 (B49) Mercury pops in at the top of the wheel · 28.1–31.4 it moves forward, slows, loops BACKWARDS
//       (≈29.3–30.3, a "℞" pops beside it) and forward again, leaving a glowing pretzel trail
//       28.93 (B51) "Retrograde: it looks like / it's moving backwards." (out 30.85–31.05)
//       31.16 (B55) "It isn't. Happens ~3× a year." (out 33.0–33.25) · Mercury + trail out 32.85–33.3
//   Q5  33.45 "Q5" + "Am I a cusp?" ("cusp" gold), out 39.15–39.4
//       33.94 (B60) the Sun pops onto the Aries|Taurus line (the line glows) · 34.2–35.55 it teeters, wobbling harder
//       35.6 (B63) it hops cleanly into Taurus (lands ≈36.05 with a squash, sparkles, Taurus lights up)
//       35.6 (B63) "Nope. The Sun is in / one sign at a time." (out 37.3–37.5)
//       37.27 (B66) "Your birth time settles it." (out 39.3–39.5) · Sun pops out 39.1–39.45 → plain H from 39.6
import { clamp, lerp, prog, ease, el, C, rng } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, easeOutBack, ptOf, angOf, drawWheelH } from '../../../wheel.js'

const T0 = 19.8, T1 = 40.2
const BEAT = 60 / 108, B = n => 0.6 + n * BEAT
const io = ease.inOutCubic, iq = ease.inOutQuad
const GLYPH_FONT = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', sans-serif"
const SIGN_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const VS = '︎'
const GOLD = '#f2c75c', LIBRA = SIGNS[6].color, TAURUS = SIGNS[1].color
const MERC = { col: ['#f2fbff', '#9fd2e8', '#4f7f9a'], glyph: '☿' }
const SUN = { col: ['#fff4cf', '#f6c45a', '#b9731f'], glyph: '☉' }

// ── Q3 rising
const Q3 = { eb: 'Q3', words: ["What's", 'a', ['Rising', LIBRA], 'sign?'], at: B(36) - 2 * 0.07, out: [26.2, 26.45] }
const HORIZ = { in: [20.7, 21.1], out: [25.9, 26.6], ac: B(37) }
const RISE = [21.15, 23.4], ASC = 192            // 12° Libra
const SPIN = [25.9, 27.0]                        // on round to 360° → H orientation
const P3 = [{ at: B(39), out: [24.25, 24.45] }, { at: B(43), out: [26.2, 26.45] }]

// ── Q4 mercury retrograde
const Q4 = { eb: 'Q4', words: ["Why's", 'everyone', 'blaming', ['Mercury?', MERC.col[1]]], at: B(47) - 3 * 0.07, out: [33.0, 33.25] }
const MPOP = B(49), MPATH = [28.1, 31.4], MOUT = [32.85, 33.3]
const P4 = [{ at: B(51), out: [30.85, 31.05] }, { at: B(55), out: [33.0, 33.25] }]
/** Mercury's apparent path (u 0..1): forward, a backward stretch on an inner loop, forward again */
const mPath = u => {
  const c = Math.cos(2 * Math.PI * (u - 0.5))
  return { lon: 226 + 88 * u - 30 * Math.sin(2 * Math.PI * (u - 0.5)), r: 245 - 62 * c }
}

// ── Q5 cusp
const Q5 = { eb: 'Q5', words: ['Am', 'I', 'a', ['cusp?', GOLD]], at: 33.45, out: [39.15, 39.4] }
const SPOP = B(60), TEETER = [34.2, 35.55], HOP = [B(63), B(63) + 0.45], SOUT = 39.1
const SUN_R = 40, SUN_LANE = WHEEL.rIn - 62, LINE_LON = 30, LAND_LON = 44
const P5 = [{ at: B(63), out: [37.3, 37.5] }, { at: B(66), out: [39.3, 39.5] }]

const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
const pop = (t, t0, d = 0.28) => { const x = prog(t, t0, t0 + d); return [lerp(0.6, 1, easeOutBack(x)), clamp(x * 3), 30 * (1 - ease.outCubic(x))] }
const popOut = (t, [a, b]) => { const x = prog(t, a, b); return [1 - 0.25 * ease.inQuad(x), 1 - iq(x)] }

/** the H wheel turned clockwise by `rot` degrees (the sky's daily turn); glyphs stay upright. rot 0 → drawWheelH itself. */
function drawWheelRot(ctx, rot) {
  if (Math.abs(rot % 360) < 1e-6) { drawWheelH(ctx); return }
  const R = rot * Math.PI / 180, Wl = WHEEL
  const P = (lon, r) => { const a = angOf(lon) + R; return { x: Wl.cx + Math.cos(a) * r, y: Wl.cy + Math.sin(a) * r } }
  ctx.save()
  SIGNS.forEach((s, i) => {
    const a0 = angOf(i * 30) + R, a1 = angOf(i * 30 + 30) + R
    ctx.globalAlpha = 0.16; ctx.fillStyle = s.color
    ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, a1, a0); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
  })
  ctx.globalAlpha = Wl.alpha; ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 4
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) { const a = P(i * 30, Wl.rIn), b = P(i * 30, Wl.rOut); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
  ctx.restore()
  ctx.save()
  ctx.font = "bold 58px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((s, i) => { const p = P(i * 30 + 15, Wl.rGlyph); ctx.globalAlpha = 1; ctx.fillStyle = s.color; ctx.fillText(s.glyph + '︎', p.x, p.y) })
  ctx.restore()
}
const ptRot = (lon, r, rot) => { const a = angOf(lon) + rot * Math.PI / 180; return { x: WHEEL.cx + Math.cos(a) * r, y: WHEEL.cy + Math.sin(a) * r } }

function wedgeRot(ctx, i, rot) {
  const R = rot * Math.PI / 180, a0 = angOf(i * 30) + R, a1 = angOf(i * 30 + 30) + R
  ctx.beginPath(); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rOut, a0, a1, true); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rIn, a1, a0, false); ctx.closePath()
}
function glowGlyph(ctx, i, k, sc = 1, rot = 0) {
  if (k <= 0.002) return
  const s = SIGNS[i], p = ptRot(i * 30 + 15, WHEEL.rGlyph, rot)
  ctx.save()
  ctx.font = `bold ${Math.round(58 * sc)}px ${SIGN_FONT}`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = s.color; ctx.shadowBlur = 26 * k
  ctx.globalAlpha = k; ctx.fillStyle = s.color
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.shadowBlur = 0; ctx.globalAlpha = 0.3 * k; ctx.fillStyle = '#fff6ea'
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.restore()
}

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
    drawPixelStar(ctx, x + Math.cos(q.a) * d, y + Math.sin(q.a) * d, q.s, q.k, cols[i % cols.length], '#fff6ea')
  })
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  await Promise.all([`800 108px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))

  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // ── question headline: gold "Qn" eyebrow + Inter 800 words popping in, one coloured Garamond accent
  function question(spec) {
    const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '128px', textAlign: 'center', textIndent: '0.25em', font: TYPE.eyebrow, letterSpacing: '0.25em', color: GOLD, textShadow: `0 0 18px rgba(242,199,92,0.4), ${shadow}`, opacity: 0, display: 'none' }, root, spec.eb)
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '196px', textAlign: 'center', font: TYPE.head, lineHeight: String(TYPE.headLine), letterSpacing: '-0.02em', color: C.bone, textShadow: shadow, display: 'none' }, root)
    const words = spec.words.map(w => {
      const acc = Array.isArray(w)
      return el('span', { display: 'inline-block', margin: '0 0.13em', transformOrigin: '50% 75%', opacity: 0, ...(acc ? { font: TYPE.accent, lineHeight: '0.86', color: w[1], letterSpacing: '0', textShadow: `0 0 26px ${hexA(w[1], 0.45)}, ${shadow}` } : {}) }, box, acc ? w[0] : w)
    })
    return {
      update(t) {
        const on = t > spec.at - 0.2 && t < spec.out[1]
        box.style.display = eb.style.display = on ? 'block' : 'none'
        if (!on) return
        const [os, oa] = popOut(t, spec.out)
        const [es, ea, ery] = pop(t, spec.at - 0.14)
        eb.style.opacity = String(ea * oa); eb.style.transform = `translateY(${ery}px) scale(${es * os})`
        words.forEach((s, i) => {
          const [sc, a, ry] = pop(t, spec.at + i * 0.07)
          s.style.opacity = String(a * oa); s.style.transform = `translateY(${ry}px) scale(${sc * os})`
        })
      },
    }
  }
  const qs = [question(Q3), question(Q4), question(Q5)]

  // ── punchlines (Inter 700 under the wheel, max 2 lines)
  const subStyle = { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '1520px', textAlign: 'center', font: TYPE.sub, lineHeight: '1.14', letterSpacing: '-0.01em', color: C.bone, textShadow: shadow, whiteSpace: 'pre', transformOrigin: '50% 40%', opacity: 0 }
  const accent = (txt, col, size = 72) => `<span style="font: italic 500 ${size}px 'EB Garamond', serif; color:${col}; text-shadow: 0 0 22px ${hexA(col, 0.45)}, ${shadow}">${txt}</span>`
  const mk = html => { const d = el('div', subStyle, root); d.innerHTML = html; return d }
  const punches = [
    [mk(`<span style="font-size:58px">The sign coming up over the\nhorizon when you were born.</span>`), P3[0]],
    [mk(`Your ${accent('first impression.', LIBRA, 76)}`), P3[1]],
    [mk(`Retrograde: it ${accent('looks', MERC.col[1])} like\nit's moving backwards.`), P4[0]],
    [mk(`It isn't. Happens ~3× a year.`), P4[1]],
    [mk(`Nope. The Sun is in\none sign at a time.`), P5[0]],
    [mk(`Your ${accent('birth time', GOLD, 76)} settles it.`), P5[1]],
  ]

  const C_ = { x: WHEEL.cx, y: WHEEL.cy }

  // wheel rotation (deg, clockwise): rises to 192 (12° Libra on the AC), then rounds on to 360 = H
  const rotAt = t => t < RISE[0] ? 0 : t < SPIN[0] ? ASC * ease.inOutCubic(prog(t, RISE[0], RISE[1])) : t < SPIN[1] ? lerp(ASC, 360, io(prog(t, SPIN[0], SPIN[1]))) : 0
  // when 12° Libra crosses the horizon (screen angle π)
  const crossT = (() => { let lo = RISE[0], hi = RISE[1]; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; const a = 192 * ease.inOutCubic(prog(m, RISE[0], RISE[1])); if (a < 180 - 0) lo = m; else hi = m } return lo })()

  return {
    start: T0, end: T1, root,
    update(t) {
      const ctx = bx
      drawSky(bx, t, SKY_H)
      const rot = rotAt(t)

      // ── Q3: sunrise glow above the horizon (under the wheel)
      const hzIn = ease.outCubic(prog(t, HORIZ.in[0], HORIZ.in[1])), hzOut = 1 - iq(prog(t, HORIZ.out[0], HORIZ.out[1]))
      const sunrise = iq(prog(t, RISE[0] + 0.6, crossT + 0.3)) * hzOut
      if (sunrise > 0) {
        ctx.save()
        ctx.beginPath(); ctx.rect(0, 0, W, C_.y); ctx.clip()
        ctx.globalCompositeOperation = 'lighter'
        const sx = WHEEL.cx - WHEEL.rOut, R = 620 + 40 * Math.sin(t * 1.7)
        const g = ctx.createRadialGradient(sx, C_.y, 0, sx, C_.y, R)
        g.addColorStop(0, `rgba(255,190,110,${0.42 * sunrise})`); g.addColorStop(0.35, `rgba(240,120,150,${0.16 * sunrise})`); g.addColorStop(1, 'rgba(240,120,150,0)')
        ctx.fillStyle = g; ctx.fillRect(0, C_.y - R, W, R)
        ctx.restore()
      }

      drawWheelRot(ctx, rot)

      // horizon line + AC
      if (hzIn > 0 && hzOut > 0) {
        const k = hzOut, half = (W / 2 - 20) * hzIn
        ctx.save(); ctx.lineCap = 'round'
        ctx.globalAlpha = 0.55 * k; ctx.strokeStyle = GOLD; ctx.lineWidth = 12; ctx.shadowColor = GOLD; ctx.shadowBlur = 26
        ctx.beginPath(); ctx.moveTo(C_.x - half, C_.y); ctx.lineTo(C_.x + half, C_.y); ctx.stroke()
        ctx.shadowBlur = 0; ctx.globalAlpha = k; ctx.lineWidth = 5
        ctx.beginPath(); ctx.moveTo(C_.x - half, C_.y); ctx.lineTo(C_.x + half, C_.y); ctx.stroke()
        ctx.globalAlpha = 0.6 * k; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(C_.x - half, C_.y); ctx.lineTo(C_.x + half, C_.y); ctx.stroke()
        // AC tag (inside the ring, left) and HORIZON tag (right)
        const [as, aa] = pop(t, HORIZ.ac, 0.3)
        ctx.globalAlpha = aa * k
        ctx.translate(WHEEL.cx - WHEEL.rIn + 62, C_.y - 44); ctx.scale(as, as)
        ctx.font = "700 46px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillStyle = GOLD; ctx.shadowColor = 'rgba(11,6,32,0.9)'; ctx.shadowBlur = 14
        ctx.fillText('AC', 0, 0)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        const [hs, ha] = pop(t, HORIZ.ac + 0.14, 0.3)
        ctx.globalAlpha = 0.85 * ha * k
        ctx.translate(WHEEL.cx + WHEEL.rIn - 190, C_.y - 34); ctx.scale(hs, hs)
        ctx.font = "700 28px 'Space Mono', monospace"; ctx.letterSpacing = '4px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillStyle = '#efe6d6'; ctx.shadowColor = 'rgba(11,6,32,0.9)'; ctx.shadowBlur = 14
        ctx.fillText('HORIZON', 0, 0)
        ctx.restore()
      }
      // Libra's band + glyph light up as it rises
      const libK = iq(prog(t, crossT - 0.5, crossT + 0.2)) * (1 - iq(prog(t, 25.6, 26.4)))
      if (libK > 0) {
        ctx.save(); wedgeRot(ctx, 6, rot); ctx.globalAlpha = (0.28 + 0.2 * Math.exp(-Math.max(0, t - crossT) / 0.4)) * libK; ctx.fillStyle = LIBRA; ctx.fill(); ctx.restore()
        const bk = t - crossT, sc = 1 + 0.4 * (bk > 0 && bk < 0.34 ? Math.sin(bk * Math.PI / 0.34) : 0)
        glowGlyph(ctx, 6, libK, sc, rot)
      }
      if (t > crossT) { const p = ptRot(192, WHEEL.rGlyph, rot); burst(ctx, p.x, p.y, crossT, t, [LIBRA, GOLD, '#fff3e0'], { seed: 3, n: 10, dist: 100 }) }

      // ── Q4: Mercury's retrograde pretzel
      const mOut = 1 - iq(prog(t, MOUT[0], MOUT[1]))
      if (t >= MPOP && mOut > 0) {
        const u = clamp(prog(t, MPATH[0], MPATH[1]))
        // trail
        if (u > 0) {
          const N = Math.ceil(u * 140)
          const pts = []; for (let k = 0; k <= N; k++) { const q = mPath(Math.min(u, k / 140)); pts.push(ptOf(q.lon, q.r)) }
          ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'
          ctx.globalAlpha = 0.5 * mOut; ctx.strokeStyle = MERC.col[1]; ctx.lineWidth = 14; ctx.shadowColor = MERC.col[1]; ctx.shadowBlur = 26
          ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke()
          ctx.shadowBlur = 0; ctx.globalAlpha = 0.95 * mOut; ctx.lineWidth = 5; ctx.stroke()
          ctx.globalAlpha = 0.6 * mOut; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke()
          // little direction chevrons along the trail
          for (const cu of [0.12, 0.5, 0.88]) {
            if (u < cu + 0.04) continue
            const a = mPath(cu - 0.01), b = mPath(cu + 0.01), pa = ptOf(a.lon, a.r), pb = ptOf(b.lon, b.r)
            const ang = Math.atan2(pb.y - pa.y, pb.x - pa.x), m = ptOf(mPath(cu).lon, mPath(cu).r)
            ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(ang); ctx.globalAlpha = mOut * clamp((u - cu - 0.04) * 10)
            ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-9, -12); ctx.lineTo(5, 0); ctx.lineTo(-9, 12); ctx.stroke(); ctx.restore()
          }
          ctx.restore()
        }
        const q = mPath(u), p = ptOf(q.lon, q.r)
        const [ms, ma] = pop(t, MPOP, 0.34)
        // backwards: a ℞ pops beside the loop
        const back = prog(t, lerp(MPATH[0], MPATH[1], 0.36), lerp(MPATH[0], MPATH[1], 0.36) + 0.3)
        if (back > 0) {
          const [rs, ra] = pop(t, lerp(MPATH[0], MPATH[1], 0.36), 0.32)
          const rp = ptOf(270, 120)
          ctx.save(); ctx.globalAlpha = ra * mOut; ctx.translate(rp.x, rp.y); ctx.scale(rs, rs); ctx.rotate(0.08 * Math.sin(t * 5))
          ctx.font = `bold 88px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillStyle = MERC.col[1]; ctx.shadowColor = MERC.col[1]; ctx.shadowBlur = 24
          ctx.fillText('℞', 0, 0); ctx.restore()
        }
        drawOrb(ctx, p.x, p.y, 34 * ms, MERC, ma * mOut, t)
        burst(ctx, p.x, p.y, MPOP, t, [MERC.col[1], '#fff3e0'], { seed: 11, n: 8, dist: 80 })
      }

      // ── Q5: the Sun on the cusp
      const sOut = prog(t, SOUT, SOUT + 0.35)
      if (t >= SPOP && sOut < 1) {
        // the boundary line glows while the Sun teeters
        const lk = ease.outCubic(prog(t, SPOP, SPOP + 0.3)) * (1 - iq(prog(t, HOP[0] + 0.2, HOP[0] + 0.8)))
        if (lk > 0) {
          const a = ptOf(LINE_LON, SUN_LANE - 70), b = ptOf(LINE_LON, WHEEL.rOut + 30)
          ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#fff6ea'; ctx.shadowColor = GOLD; ctx.shadowBlur = 22
          ctx.globalAlpha = lk; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.restore()
        }
        const tk = iq(prog(t, HOP[1] - 0.05, HOP[1] + 0.35)) * (1 - iq(prog(t, SOUT - 0.1, SOUT + 0.35)))
        if (tk > 0) { ctx.save(); wedgeRot(ctx, 1, 0); ctx.globalAlpha = (0.24 + 0.24 * Math.exp(-Math.max(0, t - HOP[1]) / 0.4)) * tk; ctx.fillStyle = TAURUS; ctx.fill(); ctx.restore() }
        const lb = t - HOP[1]
        glowGlyph(ctx, 1, tk, 1 + 0.4 * (lb > 0 && lb < 0.34 ? Math.sin(lb * Math.PI / 0.34) : 0))
        // teeter (growing wobble about the line) → hop
        let lon = LINE_LON, sx = 1, sy = 1, lift = 0
        const tp = prog(t, TEETER[0], TEETER[1])
        if (t < HOP[0]) {
          const amp = 1.5 + 5.5 * tp * tp
          lon = LINE_LON + (tp > 0 ? amp * Math.sin((t - TEETER[0]) * Math.PI * 2 * 2.6) : 0)
          const sq = tp > 0 ? 0.06 * Math.sin((t - TEETER[0]) * Math.PI * 2 * 5.2) : 0
          sx = 1 + sq; sy = 1 - sq
          // a tiny "uh-oh" crouch before the hop
          const cr = prog(t, HOP[0] - 0.18, HOP[0]); sx += 0.14 * cr; sy -= 0.14 * cr
          lon = lerp(lon, LINE_LON - 2, cr)
        } else {
          const hp = prog(t, HOP[0], HOP[1])
          lon = lerp(LINE_LON - 2, LAND_LON, ease.inOutQuad(hp))
          lift = 90 * Math.sin(Math.PI * hp)
          const st = hp < 0.4 ? 0.14 * (1 - hp / 0.4) : 0
          sx = 1 - st; sy = 1 + st
          const land = prog(t, HOP[1], HOP[1] + 0.5)
          if (land > 0) { const sq = 0.22 * Math.sin(land * Math.PI * 2) * Math.exp(-land * 3.5); sx = 1 + sq; sy = 1 - sq }
        }
        const base = ptOf(lon, SUN_LANE), out = ptOf(lon, SUN_LANE + lift)
        const [ss, sa] = pop(t, SPOP, 0.34)
        const so = sOut > 0 ? (sOut < 0.35 ? 1 + 0.15 * Math.sin(sOut / 0.35 * Math.PI / 2) : 1.15 * (1 - ease.inCubic((sOut - 0.35) / 0.65))) : 1
        drawOrb(ctx, out.x, out.y, SUN_R * ss * so, SUN, sa, t, { sx, sy, glow: 1.2 })
        burst(ctx, base.x, base.y, SPOP, t, [GOLD, '#fff3e0'], { seed: 21, n: 8, dist: 90 })
        burst(ctx, ptOf(LAND_LON, SUN_LANE).x, ptOf(LAND_LON, SUN_LANE).y, HOP[1], t, [GOLD, TAURUS, '#fff3e0'], { seed: 22, n: 10, dist: 110 })
      }

      drawGrain(gx, t)

      qs.forEach(q => q.update(t))
      punches.forEach(([d, s]) => {
        const [sc, a, ry] = pop(t, s.at, 0.32), [os, oa] = popOut(t, s.out)
        d.style.opacity = String(a * oa); d.style.transform = `translateY(${ry}px) scale(${sc * os})`
        d.style.display = t > s.at - 0.05 && t < s.out[1] ? 'block' : 'none'
      })
    },
  }
}

const D5 = 587.33, E5 = 659.25, FS5 = 739.99, A5 = 880, B5 = 987.77, D6 = 1174.66
const qCues = (q, tones) => [['pop', q.at - 0.14, 1318.51, 0.03, 0], ...q.words.map((w, i) => ['pop', q.at + i * 0.07, tones[i], Array.isArray(w) ? 0.06 : 0.035, 0])]
export const cues = [
  ...qCues(Q3, [D5, E5, A5, FS5]),
  ['whoosh', HORIZ.in[0], 0.5, 0.02], ['pop', HORIZ.ac, 740, 0.045, -0.4],
  ['riser', RISE[0], 22.8, 0.025], ['bell', 22.8, 1174.66, 0.02, 2.0, -0.3], ['glitter', 22.75, 23.5],
  ['pop', P3[0].at, A5, 0.045, 0], ['pop', P3[1].at, D6, 0.05, 0],
  ['whoosh', SPIN[0], 1.0, 0.025],
  ...qCues(Q4, [E5, FS5, A5, D6]),
  ['pop', MPOP, B5, 0.055, 0.2],
  ['pluck', 28.6, 659.25, 0.04, 0.4, 0.2], ['pluck', 29.4, 587.33, 0.04, 0.4, 0], ['pluck', 29.9, 493.88, 0.04, 0.4, -0.2], ['pluck', 30.5, 587.33, 0.04, 0.4, 0], ['pluck', 31.1, 739.99, 0.04, 0.4, 0.2],
  ['pop', P4[0].at, A5, 0.045, 0], ['pop', P4[1].at, D6, 0.05, 0],
  ...qCues(Q5, [D5, FS5, A5, D6]),
  ['pop', SPOP, A5, 0.05, -0.3],
  ...Array.from({ length: 5 }, (_, k) => ['tick', TEETER[0] + k * 0.27, 0.01 + k * 0.003]),
  ['pop', HOP[0], 600, 0.05, -0.2], ['pop', HOP[1], 1318.51, 0.06, 0.2], ['tick', HOP[1], 0.02], ['glitter', HOP[1], HOP[1] + 0.6],
  ['pop', P5[1].at, D6, 0.05, 0],
  ['pop', SOUT, E5, 0.03, 0],
]
