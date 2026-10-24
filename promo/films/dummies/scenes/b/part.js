// ─────────────────────────────────────────────── DUMMIES v2 part b · Q3 RISING → Q4 MERCURY → Q5 CUSP (19.8–40.2)
// v2: one illustration per question (no chart wheel). Starts on the new H exactly (drawSky(SKY_H) + grain at GRAIN_H, nothing
// else), held still to 20.2; every added layer is at zero by 39.6. Key hits on the 108 bpm beat B(n) = 0.6 + n·0.5556.
// Style: bold friendly line art, thick glowing bone strokes, flat 20–40% fills, no faces.
//
// Beat map:
//   Q3  20.3  eyebrow "Q3" + "What's a Rising sign?" pops word by word ("Rising", Libra pink, on B36), out 26.2–26.45
//       20.6–21.2 dawn hills draw in along the lower third · 21.16 (B37) a pin-person "you, born here" pops on a hill (✦)
//       21.4–23.6 a big ♎ disc rises over the hills on the left (east) like a sunrise: rays, gold horizon glow
//       22.27 (B39) "The sign coming up over the / horizon when you were born." (out 24.25–24.45)
//       24.49 (B43) a HELLO name-tag slaps on: "HELLO · my Rising is · ♎ LIBRA" + "Your first impression." (out 26.2–26.45)
//       26.1–26.6 the landscape sinks away
//   Q4  26.55 "Q4" + "Why's everyone blaming Mercury?" ("Mercury" on B47), out 33.0–33.25
//       27.0–27.6 top-down race track: zodiac band panels pop round, the Sun, two lanes · 27.82 (B49) Earth + Mercury pop
//       28.0 line of sight Earth → Mercury → band, with a marker on the band. 28.0→ both orbit (Mercury 4.15× faster);
//       Mercury overtakes on the inside (inferior conjunction, Earth on the left, at 29.8): the marker slides BACKWARDS
//       (≈29.3–30.3, pink arrow, "℞" pops), then forwards again
//       28.93 (B51) "Retrograde: it looks like / it's moving backwards." (out 30.85–31.05)
//       31.16 (B55) "It isn't. Happens ~3× a year." + three calendar ticks pop (31.4 / 31.62 / 31.84) (out 33.0–33.25)
//       32.85–33.3 the track pops away
//   Q5  33.45 "Q5" + "Am I a cusp?" ("cusp" gold), out 39.15–39.4
//       33.6–34.0 the date strip pops in: ♈ ARIES (red) | ♉ TAURUS (gold), APR 19 · APR 20 · APR 21, bold line between
//       33.94 (B60) the Sun pops onto the line with a balance pole · 34.2–35.55 teeters harder · 35.6 (B63) hops into Taurus
//       35.6 (B63) "Nope. The Sun is in / one sign at a time." (out 37.3–37.5)
//       37.27 (B66) a clock pops onto the line; its hand ticks 37.6/37.9/38.2 and settles → Taurus flashes, ✓ by the Sun
//       37.27 "Your birth time settles it." (out 39.3–39.5) · 39.0–39.5 the strip, Sun and clock pop out → plain H from 39.6
import { clamp, lerp, prog, ease, el, C, rng } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../../wheel.js'

const T0 = 19.8, T1 = 40.2
const BEAT = 60 / 108, B = n => 0.6 + n * BEAT
const iq = ease.inOutQuad, oc = ease.outCubic
const GLYPH_FONT = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', sans-serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif", MONO_F = "'Space Mono', monospace"
const VS = '︎'
const BONE = '#efe6d6', GOLD = '#f2c75c', PINKP = '#f59cc4', INK = '#120a2a'
const sg = id => SIGNS.find(s => s.id === id)
const LIBRA = sg('libra').color, ARIES = sg('aries').color, TAURUS = sg('taurus').color
const MERC = { col: ['#f2fbff', '#9fd2e8', '#4f7f9a'], glyph: '☿' }
const SUN = { col: ['#fff4cf', '#f6c45a', '#b9731f'], glyph: '☉' }
const EARTH = { col: ['#e6f6ff', '#5aa0f0', '#1d4a9a'], glyph: '' }

// ── Q3
const Q3 = { eb: 'Q3', words: ["What's", 'a', ['Rising', LIBRA], 'sign?'], at: B(36) - 2 * 0.07, out: [26.2, 26.45] }
const HILLS = [20.6, 21.2], PIN = B(37), RISE = [21.4, 23.6], TAG = B(43), LAND_OUT = [26.1, 26.6]
const P3 = [{ at: B(39), out: [24.25, 24.45] }, { at: B(43), out: [26.2, 26.45] }]
const backHill = x => 1318 + 36 * Math.sin(x / 165 + 1.1) + 22 * Math.sin(x / 83 + 0.4)
const frontHill = x => 1392 + 46 * Math.sin(x / 205 + 2.6) + 16 * Math.sin(x / 66 + 1.3)
const PIN_X = 790

// ── Q4
const Q4 = { eb: 'Q4', words: ["Why's", 'everyone', 'blaming', ['Mercury?', MERC.col[1]]], at: B(47) - 3 * 0.07, out: [33.0, 33.25] }
const TRACK = { cx: 540, cy: 1010, rSun: 56, rM: 150, rE: 285, rB0: 372, rB1: 452, rG: 412 }
const BAND_IN = [27.0, 27.6], BODIES = B(49), LOS_IN = 28.0, MOVE0 = 28.0, RAMP = 0.5, TC = 29.8, Q4_OUT = [32.85, 33.3]
const WE = 22, WM = WE * 4.15                // deg/s; Mercury laps ~4.15× per Earth orbit (88 d vs 365 d)
const P4 = [{ at: B(51), out: [30.85, 31.05] }, { at: B(55), out: [33.0, 33.25] }]
const CAL = [31.4, 31.62, 31.84]

// ── Q5
const Q5 = { eb: 'Q5', words: ['Am', 'I', 'a', ['cusp?', GOLD]], at: 33.45, out: [39.15, 39.4] }
const STRIP = { x0: 90, x1: 990, y: 1180, h: 112, in: 33.6 }, LINE_X = 540
const SPOP = B(60), TEETER = [34.2, 35.55], HOP = [B(63), B(63) + 0.45], LAND_X = 790
const CLOCK = { x: 540, y: 800, r: 112, in: B(66), ticks: [37.6, 37.9, 38.2] }, DECIDE = 38.25, Q5_OUT = 39.0
const P5 = [{ at: B(63), out: [37.3, 37.5] }, { at: B(66), out: [39.3, 39.5] }]

const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
const pop = (t, t0, d = 0.28) => { const x = prog(t, t0, t0 + d); return [lerp(0.6, 1, easeOutBack(x)), clamp(x * 3), 30 * (1 - oc(x))] }
const popOut = (t, [a, b]) => { const x = prog(t, a, b); return [1 - 0.25 * ease.inQuad(x), 1 - iq(x)] }
/** pop-out at t0 for canvas things: a little swell then shrink to nothing → scale (0 = gone) */
const vanish = (t, t0, d = 0.32) => { const x = prog(t, t0, t0 + d); return x <= 0 ? 1 : x < 0.35 ? 1 + 0.12 * Math.sin(x / 0.35 * Math.PI / 2) : 1.12 * (1 - ease.inCubic((x - 0.35) / 0.65)) }

/** thick glowing stroke of the current path */
function glow(ctx, col, w = 7, a = 1, blur = 22) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.globalAlpha = 0.45 * a; ctx.strokeStyle = col; ctx.lineWidth = w * 2.2; ctx.shadowColor = col; ctx.shadowBlur = blur; ctx.stroke()
  ctx.shadowBlur = 0; ctx.globalAlpha = a; ctx.lineWidth = w; ctx.stroke()
  ctx.restore()
}

function drawOrb(ctx, x, y, r, p, a, t, { glow: gk = 1, sx = 1, sy = 1 } = {}) {
  if (a <= 0.002 || r <= 0.5) return
  const [hi, mid, lo] = p.col
  ctx.save()
  ctx.globalAlpha = a
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * (3.6 + 0.3 * Math.sin(t * 2.3 + r))
  const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, hr)
  g.addColorStop(0, hexA(mid, 0.5 * gk)); g.addColorStop(0.4, hexA(mid, 0.16 * gk)); g.addColorStop(1, hexA(mid, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.translate(x, y); ctx.scale(sx, sy)
  const b = ctx.createRadialGradient(-r * 0.38, -r * 0.42, r * 0.08, 0, 0, r)
  b.addColorStop(0, hi); b.addColorStop(0.45, mid); b.addColorStop(1, lo)
  ctx.fillStyle = b; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  ctx.lineWidth = 2.5; ctx.strokeStyle = hexA(hi, 0.7); ctx.stroke()
  if (p.glyph) {
    ctx.font = `bold ${Math.round(r * 1.18)}px ${GLYPH_FONT}`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(28,14,48,0.85)'
    ctx.fillText(p.glyph + VS, 0, r * 0.05)
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const tw = 0.55 + 0.45 * Math.sin(t * 3.1 + r * 1.7)
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = a * tw
  ctx.imageSmoothingEnabled = false
  drawPixelStar(ctx, x + r * 0.62 * sx, y - r * 0.66 * sy, Math.max(7, Math.round(r * 0.5)), 1, hi, '#ffffff')
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
    const d = q.d * oc(p)
    ctx.globalAlpha = (1 - p) * (1 - p) * 0.95
    drawPixelStar(ctx, x + Math.cos(q.a) * d, y + Math.sin(q.a) * d, q.s, q.k, cols[i % cols.length], '#fff6ea')
  })
  ctx.restore()
}

function text(ctx, s, x, y, font, col, { a = 1, align = 'center', ls = 0, shadow = true } = {}) {
  ctx.save(); ctx.globalAlpha = a; ctx.font = font; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.letterSpacing = ls + 'px'
  if (shadow) { ctx.shadowColor = 'rgba(8,4,22,0.9)'; ctx.shadowBlur = 16 }
  ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore()
}

/** pictogram person (no face) standing with feet at (x, y) */
function person(ctx, x, y, s, a) {
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s)
  ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(0, -34); ctx.lineTo(16, 0)            // legs
  ctx.moveTo(0, -34); ctx.lineTo(0, -72)                                                  // body
  ctx.moveTo(-22, -50); ctx.lineTo(0, -64); ctx.lineTo(22, -50)                           // arms
  glow(ctx, BONE, 7, 1, 14)
  ctx.beginPath(); ctx.arc(0, -90, 14, 0, Math.PI * 2); ctx.fillStyle = BONE; ctx.shadowColor = BONE; ctx.shadowBlur = 14; ctx.fill()
  ctx.restore()
}

// ── Q4 geometry (math angles, ccw +; screen y flips)
const tau4 = t => { const x = t - MOVE0; return x <= 0 ? 0 : x < RAMP ? x * x / (2 * RAMP) : x - RAMP / 2 }
const angE = t => 180 + WE * (tau4(t) - tau4(TC))
const angM = t => 180 + WM * (tau4(t) - tau4(TC))
const P4pt = (deg, r) => ({ x: TRACK.cx + r * Math.cos(deg * Math.PI / 180), y: TRACK.cy - r * Math.sin(deg * Math.PI / 180) })
/** where the line of sight from Earth through Mercury meets the band (radius R) → {x, y, deg} */
function losHit(t, R = TRACK.rG) {
  const e = P4pt(angE(t), TRACK.rE), m = P4pt(angM(t), TRACK.rM)
  const ex = e.x - TRACK.cx, ey = e.y - TRACK.cy
  let dx = m.x - e.x, dy = m.y - e.y; const L = Math.hypot(dx, dy); dx /= L; dy /= L
  const bdot = ex * dx + ey * dy, s = -bdot + Math.sqrt(bdot * bdot - (ex * ex + ey * ey) + R * R)
  const x = ex + s * dx, y = ey + s * dy
  return { x: x + TRACK.cx, y: y + TRACK.cy, deg: Math.atan2(-y, x) * 180 / Math.PI, e, m }
}
// retrograde window: where the marker's (unwrapped) longitude decreases
const RETRO = (() => {
  let prev = null, acc = 0, start = null, end = null
  for (let t = MOVE0 + 0.05; t < 33.3; t += 1 / 120) {
    const d = losHit(t).deg
    if (prev !== null) { let dd = d - prev; dd = ((dd + 540) % 360) - 180; if (dd < 0 && start === null) start = t; if (dd >= 0 && start !== null && end === null) end = t }
    prev = d
  }
  return [start ?? 29.3, end ?? 30.3]
})()

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  await Promise.all([`800 108px Inter`, `800 72px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))
  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

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
        words.forEach((s, i) => { const [sc, a, ry] = pop(t, spec.at + i * 0.07); s.style.opacity = String(a * oa); s.style.transform = `translateY(${ry}px) scale(${sc * os})` })
      },
    }
  }
  const qs = [question(Q3), question(Q4), question(Q5)]

  const subStyle = { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: '1520px', textAlign: 'center', font: TYPE.sub, lineHeight: '1.14', letterSpacing: '-0.01em', color: C.bone, textShadow: shadow, whiteSpace: 'pre', transformOrigin: '50% 40%', opacity: 0 }
  const accent = (txt, col, size = 72) => `<span style="font: italic 500 ${size}px 'EB Garamond', serif; color:${col}; text-shadow: 0 0 22px ${hexA(col, 0.45)}, ${shadow}">${txt}</span>`
  const mk = (html, top = 1520) => { const d = el('div', { ...subStyle, top: top + 'px' }, root); d.innerHTML = html; return d }
  const punches = [
    [mk(`<span style="font-size:58px">The sign coming up over the\nhorizon when you were born.</span>`, 1540), P3[0]],
    [mk(`Your ${accent('first impression.', LIBRA, 76)}`, 1540), P3[1]],
    [mk(`Retrograde: it ${accent('looks', MERC.col[1])} like\nit's moving backwards.`, 1530), P4[0]],
    [mk(`It isn't. Happens ~3× a year.`, 1505), P4[1]],
    [mk(`Nope. The Sun is in\none sign at a time.`, 1430), P5[0]],
    [mk(`Your ${accent('birth time', GOLD, 76)} settles it.`, 1440), P5[1]],
  ]

  // ─────────── Q3 · dawn landscape
  function drawQ3(ctx, t) {
    if (t < HILLS[0] || t > LAND_OUT[1]) return
    const out = iq(prog(t, LAND_OUT[0], LAND_OUT[1])), dy = 120 * out, ka = 1 - out
    const rise = oc(prog(t, RISE[0], RISE[1]))
    ctx.save(); ctx.translate(0, dy)
    // dawn glow above the hills (east = left)
    const gk = iq(prog(t, RISE[0] - 0.2, RISE[0] + 1.4)) * ka
    if (gk > 0) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient(330, 1340, 0, 330, 1340, 780)
      g.addColorStop(0, `rgba(255,196,110,${0.5 * gk})`); g.addColorStop(0.3, `rgba(245,140,120,${0.22 * gk})`); g.addColorStop(0.65, `rgba(200,110,200,${0.08 * gk})`); g.addColorStop(1, 'rgba(200,110,200,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 560, W, 900); ctx.restore()
    }
    // the ♎ sun: rays + disc, rising up and a little right
    if (t > RISE[0]) {
      const x = lerp(300, 395, rise), y = lerp(1500, 1000, rise), R = 118
      ctx.save(); ctx.globalAlpha = ka
      const rk = iq(prog(t, RISE[0] + 0.5, RISE[1]))
      ctx.translate(x, y); ctx.rotate(t * 0.35)
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6, l0 = R + 26, l1 = R + 70 + 14 * Math.sin(t * 4 + i)
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * l0, Math.sin(a) * l0); ctx.lineTo(Math.cos(a) * l1 * lerp(0.7, 1, rk), Math.sin(a) * l1 * lerp(0.7, 1, rk))
        glow(ctx, GOLD, 8, rk, 18)
      }
      ctx.setTransform(1, 0, 0, 1, 0, dy)
      ctx.globalCompositeOperation = 'lighter'
      const hg = ctx.createRadialGradient(x, y, R * 0.6, x, y, R * 3)
      hg.addColorStop(0, hexA(LIBRA, 0.45)); hg.addColorStop(0.4, 'rgba(242,199,92,0.14)'); hg.addColorStop(1, 'rgba(242,199,92,0)')
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, y, R * 3, 0, Math.PI * 2); ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      const dg = ctx.createRadialGradient(x - R * 0.3, y - R * 0.35, R * 0.1, x, y, R)
      dg.addColorStop(0, '#ffe9f6'); dg.addColorStop(0.5, LIBRA); dg.addColorStop(1, '#7a2a78')
      ctx.globalAlpha = ka * 0.95; ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); glow(ctx, GOLD, 7, ka, 26)
      text(ctx, '♎' + VS, x, y + 6, `bold 132px ${GLYPH_FONT}`, '#fff6ea', { a: ka })
      ctx.restore()
    }
    // hills (draw in from left to right), dark fill covers the rising disc
    const hp = oc(prog(t, HILLS[0], HILLS[1]))
    const hill = (f, fill, col, a) => {
      const xEnd = lerp(-20, W + 20, hp)
      ctx.save()
      ctx.beginPath(); ctx.moveTo(-20, f(-20)); for (let x = -20; x <= xEnd; x += 12) ctx.lineTo(x, f(x))
      const path = new Path2D(); path.moveTo(-20, f(-20)); for (let x = -20; x <= xEnd; x += 12) path.lineTo(x, f(x))
      ctx.lineTo(xEnd, 1620); ctx.lineTo(-20, 1620); ctx.closePath()
      const g = ctx.createLinearGradient(0, 1250, 0, 1620); g.addColorStop(0, fill); g.addColorStop(0.7, fill); g.addColorStop(1, 'rgba(10,6,28,0)')
      ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fill()
      ctx.beginPath(); ctx.stroke(path); ctx.restore()
      ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'
      ctx.globalAlpha = 0.45 * a; ctx.strokeStyle = col; ctx.lineWidth = 14; ctx.shadowColor = col; ctx.shadowBlur = 22; ctx.stroke(path)
      ctx.shadowBlur = 0; ctx.globalAlpha = a; ctx.lineWidth = 6; ctx.stroke(path); ctx.restore()
    }
    hill(backHill, 'rgba(46,26,84,0.96)', '#c9a6ff', 0.85 * ka)
    hill(frontHill, 'rgba(22,12,48,0.98)', BONE, ka)
    // the person on the front hill + ✦ + label
    if (t > PIN) {
      const [s, a] = pop(t, PIN, 0.34), y = frontHill(PIN_X)
      person(ctx, PIN_X, y + 2, 1.5 * s, a * ka)
      ctx.save(); ctx.imageSmoothingEnabled = false; ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * ka * (0.7 + 0.3 * Math.sin(t * 5))
      drawPixelStar(ctx, PIN_X, y - 185, 21, 0, GOLD, '#fff6ea'); ctx.restore()
      const [ls, la] = pop(t, PIN + 0.15, 0.3)
      ctx.save(); ctx.translate(PIN_X, y - 235); ctx.scale(ls, ls)
      text(ctx, 'you, born here', 0, 0, `700 38px ${INTER}`, BONE, { a: la * ka }); ctx.restore()
      burst(ctx, PIN_X, y - 40, PIN, t, [GOLD, '#fff3e0'], { seed: 1, n: 8, dist: 80 })
    }
    ctx.restore()
    // HELLO name tag
    if (t > TAG) {
      const x = prog(t, TAG, TAG + 0.24)
      const sc = x < 1 ? lerp(1.55, 1, ease.inQuad(x)) : 1 + 0.07 * Math.sin((t - TAG - 0.24) * Math.PI * 2 * 3) * Math.exp(-(t - TAG - 0.24) / 0.15)
      const rot = lerp(-15, -5, oc(x)) + 1.2 * Math.sin(t * 1.6)
      const a = clamp(x * 4) * (1 - iq(prog(t, 26.15, 26.45)))
      const w = 600, h = 340
      ctx.save(); ctx.globalAlpha = a; ctx.translate(610, 760); ctx.rotate(rot * Math.PI / 180); ctx.scale(sc, sc)
      ctx.shadowColor = 'rgba(4,2,14,0.7)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16
      ctx.fillStyle = '#f6efe2'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.clip()
      ctx.fillStyle = LIBRA; ctx.fillRect(-w / 2, -h / 2, w, 140)
      ctx.fillRect(-w / 2, h / 2 - 26, w, 26)
      ctx.restore()
      ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); glow(ctx, '#ffffff', 4, 0.9, 16)
      text(ctx, 'HELLO', 0, -h / 2 + 56, `800 74px ${INTER}`, '#ffffff', { shadow: false, ls: 2 })
      text(ctx, 'my Rising is', 0, -h / 2 + 112, `700 32px ${INTER}`, '#ffffff', { shadow: false })
      text(ctx, '♎' + VS, -150, 42, `bold 100px ${GLYPH_FONT}`, LIBRA, { shadow: false })
      text(ctx, 'LIBRA', 50, 46, `800 96px ${INTER}`, '#7a2a78', { shadow: false })
      ctx.restore()
      burst(ctx, 610, 760, TAG + 0.22, t, [LIBRA, GOLD, '#fff3e0'], { seed: 5, n: 12, dist: 360, len: 0.7 })
    }
  }

  // ─────────── Q4 · race track
  const calIcon = (ctx, x, y, s, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s)
    ctx.fillStyle = 'rgba(239,230,214,0.18)'; ctx.beginPath(); ctx.roundRect(-44, -40, 88, 84, 12); ctx.fill()
    ctx.save(); ctx.clip(); ctx.fillStyle = hexA(MERC.col[1], 0.85); ctx.fillRect(-44, -40, 88, 22); ctx.restore()
    ctx.beginPath(); ctx.roundRect(-44, -40, 88, 84, 12); glow(ctx, BONE, 5, 1, 12)
    ctx.beginPath(); ctx.moveTo(-18, 10); ctx.lineTo(-4, 24); ctx.lineTo(22, -6); glow(ctx, GOLD, 7, 1, 14)
    ctx.restore()
  }
  function drawQ4(ctx, t) {
    if (t < BAND_IN[0] || t > Q4_OUT[1] + 0.05) return
    const { cx, cy } = TRACK
    const vs = vanish(t, Q4_OUT[0], 0.42)
    if (vs <= 0) return
    ctx.save(); ctx.translate(cx, cy); ctx.scale(vs, vs); ctx.translate(-cx, -cy)
    // zodiac band: 12 panels popping round (Aries at left, counter-clockwise like a chart)
    SIGNS.forEach((s, i) => {
      const [ps, pa] = pop(t, BAND_IN[0] + i * 0.045, 0.3)
      if (pa <= 0) return
      const a0 = (180 + i * 30) * Math.PI / 180, a1 = (180 + i * 30 + 30) * Math.PI / 180
      const rm = (TRACK.rB0 + TRACK.rB1) / 2, hw = (TRACK.rB1 - TRACK.rB0) / 2 * ps
      ctx.save(); ctx.globalAlpha = pa
      ctx.beginPath(); ctx.arc(cx, cy, rm + hw, -a0, -a1, true); ctx.arc(cx, cy, rm - hw, -a1, -a0, false); ctx.closePath()
      ctx.fillStyle = hexA(s.color, 0.3); ctx.fill()
      ctx.strokeStyle = hexA(BONE, 0.75); ctx.lineWidth = 3; ctx.stroke()
      const g = P4pt(180 + i * 30 + 15, TRACK.rG)
      text(ctx, s.glyph + VS, g.x, g.y + 2, `bold ${Math.round(46 * ps)}px ${GLYPH_FONT}`, s.color, { shadow: false })
      ctx.restore()
    })
    const ringK = iq(prog(t, BAND_IN[0] + 0.3, BAND_IN[1] + 0.2))
    if (ringK > 0) { for (const r of [TRACK.rB0, TRACK.rB1]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); glow(ctx, BONE, 4, ringK * 0.9, 14) } }
    // lanes
    const lk = iq(prog(t, 27.4, 27.9))
    if (lk > 0) {
      ctx.save(); ctx.setLineDash([4, 14]); ctx.lineCap = 'round'
      for (const r of [TRACK.rM, TRACK.rE]) { ctx.globalAlpha = 0.45 * lk; ctx.strokeStyle = BONE; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke() }
      ctx.restore()
    }
    // sun
    const [ss, sa] = pop(t, 27.3, 0.36)
    if (sa > 0) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.5)
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 72 * ss, Math.sin(a) * 72 * ss); ctx.lineTo(Math.cos(a) * (92 + 6 * Math.sin(t * 5 + i)) * ss, Math.sin(a) * (92 + 6 * Math.sin(t * 5 + i)) * ss); glow(ctx, GOLD, 6, sa, 14) }
      ctx.restore()
      drawOrb(ctx, cx, cy, TRACK.rSun * ss, SUN, sa, t, { glow: 1.3 })
    }
    if (t < BODIES) { ctx.restore(); return }
    const hit = losHit(t), { e, m } = hit
    // line of sight Earth → Mercury → band
    const lo = oc(prog(t, LOS_IN, LOS_IN + 0.4))
    if (lo > 0) {
      ctx.save(); ctx.setLineDash([16, 12]); ctx.lineDashOffset = -t * 60
      ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.lineTo(lerp(e.x, hit.x, lo), lerp(e.y, hit.y, lo)); glow(ctx, '#fff6ea', 4, 0.9, 12)
      ctx.restore()
    }
    // marker on the band + recent trail + direction arrow
    const retro = t > RETRO[0] && t < RETRO[1]
    if (lo >= 1) {
      ctx.save(); ctx.lineCap = 'round'
      for (let k = 1; k <= 10; k++) { const p = losHit(t - k * 0.05); ctx.globalAlpha = 0.5 * (1 - k / 11); ctx.fillStyle = retro ? PINKP : GOLD; ctx.beginPath(); ctx.arc(p.x, p.y, 13 - k * 0.8, 0, Math.PI * 2); ctx.fill() }
      ctx.restore()
    }
    if (lo > 0.9) {
      const mk = retro ? PINKP : GOLD
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient(hit.x, hit.y, 0, hit.x, hit.y, 56); g.addColorStop(0, hexA(mk, 0.9)); g.addColorStop(0.4, hexA(mk, 0.35)); g.addColorStop(1, hexA(mk, 0))
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hit.x, hit.y, 56, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      ctx.beginPath(); ctx.arc(hit.x, hit.y, 15, 0, Math.PI * 2); ctx.fillStyle = '#fff6ea'; ctx.fill(); glow(ctx, mk, 5, 1, 16)
      // arrow along the band showing which way the marker is going (outside the band)
      const d0 = hit.deg, dir = retro ? -1 : 1, R = TRACK.rB1 + 30
      const arrowK = retro ? 1 : 0.7
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      const a0 = d0 - dir * 4, a1 = d0 + dir * 16
      ctx.beginPath(); for (let k = 0; k <= 10; k++) { const p = P4pt(lerp(a0, a1, k / 10), R); k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y) }
      glow(ctx, mk, 7, arrowK, 16)
      const tip = P4pt(a1, R), pre = P4pt(a1 - dir * 3, R), ang = Math.atan2(tip.y - pre.y, tip.x - pre.x)
      ctx.translate(tip.x, tip.y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(-18, -14); ctx.lineTo(2, 0); ctx.lineTo(-18, 14); glow(ctx, mk, 7, arrowK, 16)
      ctx.restore()
    }
    // ℞ pops at the start of the backwards slide
    if (t > RETRO[0]) {
      const [rs, ra] = pop(t, RETRO[0], 0.32), ro = 1 - iq(prog(t, P4[0].out[0], P4[0].out[1]))
      const p = P4pt(hit.deg, TRACK.rB0 - 70)
      ctx.save(); ctx.translate(p.x, p.y); ctx.scale(rs, rs); ctx.rotate(0.1 * Math.sin(t * 6))
      text(ctx, '℞', 0, 0, `bold 96px ${GLYPH_FONT}`, PINKP, { a: ra * ro }); ctx.restore()
      burst(ctx, p.x, p.y, RETRO[0], t, [PINKP, '#fff3e0'], { seed: 9, n: 8, dist: 80 })
    }
    // Earth + Mercury
    const [bs, ba] = pop(t, BODIES, 0.34)
    drawOrb(ctx, e.x, e.y, 28 * bs, EARTH, ba, t)
    ctx.save(); ctx.globalAlpha = ba * 0.9; ctx.strokeStyle = 'rgba(160,230,170,0.85)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(e.x - 4, e.y - 3, 10 * bs, 0.3, 2.6); ctx.stroke(); ctx.restore()
    drawOrb(ctx, m.x, m.y, 21 * bs, MERC, ba, t)
    const la = ba * (1 - iq(prog(t, 32.4, 32.8)))
    text(ctx, 'EARTH', e.x, e.y + 54, `800 30px ${INTER}`, '#9ccaff', { a: la, ls: 2 })
    text(ctx, 'you', e.x, e.y + 86, `700 26px ${INTER}`, BONE, { a: la * 0.85 })
    text(ctx, 'MERCURY', m.x, m.y - 44, `800 26px ${INTER}`, MERC.col[1], { a: la, ls: 2 })
    burst(ctx, e.x, e.y, BODIES, t, ['#5aa0f0', '#fff3e0'], { seed: 12, n: 7, dist: 70 })
    burst(ctx, m.x, m.y, BODIES + 0.05, t, [MERC.col[1], '#fff3e0'], { seed: 13, n: 7, dist: 60 })
    ctx.restore()
    // three calendar ticks (~3× a year)
    CAL.forEach((c, i) => {
      if (t < c) return
      const [s, a] = pop(t, c, 0.3), o = 1 - iq(prog(t, 33.0, 33.25))
      calIcon(ctx, 400 + i * 140, 1680, s, a * o)
      burst(ctx, 400 + i * 140, 1680, c, t, [GOLD, '#fff3e0'], { seed: 30 + i, n: 6, dist: 60, len: 0.5 })
    })
  }

  // ─────────── Q5 · date strip + tightrope Sun + clock
  function drawQ5(ctx, t) {
    if (t < STRIP.in || t > Q5_OUT + 0.6) return
    const { x0, x1, y, h } = STRIP
    const vs = vanish(t, Q5_OUT, 0.4)
    if (vs <= 0) return
    ctx.save(); ctx.translate(540, y); ctx.scale(vs, vs); ctx.translate(-540, -y)
    const [ss, sa] = pop(t, STRIP.in, 0.34)
    const decide = iq(prog(t, DECIDE, DECIDE + 0.3)), dflash = t > DECIDE ? Math.exp(-(t - DECIDE) / 0.4) : 0
    const landed = clamp(prog(t, HOP[1], HOP[1] + 0.2))
    ctx.save(); ctx.translate(540, y); ctx.scale(ss, ss); ctx.translate(-540, -y); ctx.globalAlpha = sa
    // halves
    ctx.fillStyle = hexA(ARIES, 0.32); ctx.beginPath(); ctx.roundRect(x0, y - h / 2, LINE_X - x0, h, [22, 0, 0, 22]); ctx.fill()
    ctx.fillStyle = hexA(TAURUS, 0.32 + 0.14 * landed + 0.3 * dflash); ctx.beginPath(); ctx.roundRect(LINE_X, y - h / 2, x1 - LINE_X, h, [0, 22, 22, 0]); ctx.fill()
    ctx.beginPath(); ctx.roundRect(x0, y - h / 2, x1 - x0, h, 22); glow(ctx, BONE, 6, 1, 18)
    text(ctx, '♈' + VS + ' ARIES', (x0 + LINE_X) / 2, y + 2, `800 50px ${INTER}`, '#ffd2c4', { ls: 1 })
    text(ctx, '♉' + VS + ' TAURUS', (LINE_X + x1) / 2 + (landed ? 0 : 0), y + 2, `800 50px ${INTER}`, '#fff0c8', { ls: 1 })
    // date ticks under the strip
    ;[['APR 19', 240], ['APR 20', 540], ['APR 21', 840]].forEach(([s, x], i) => {
      ctx.beginPath(); ctx.moveTo(x, y + h / 2); ctx.lineTo(x, y + h / 2 + 22); glow(ctx, BONE, 5, 1, 10)
      text(ctx, s, x, y + h / 2 + 62, `700 38px ${MONO_F}`, BONE, { ls: 2 })
    })
    ctx.restore()
    // the boundary line (bold, glowing) — from above the strip down through it
    const lk = oc(prog(t, STRIP.in + 0.2, STRIP.in + 0.5))
    if (lk > 0) { ctx.beginPath(); ctx.moveTo(LINE_X, y + h / 2 + 6); ctx.lineTo(LINE_X, lerp(y + h / 2, y - h / 2 - 40, lk)); glow(ctx, '#ffffff', 8, sa, 24) }
    // the Sun: teeter on the line with a balance pole, then hop into Taurus
    if (t > SPOP) {
      const base = y - h / 2 - 40          // stands on top of the line's tip
      let x = LINE_X, lift = 0, tilt = 0, sx = 1, sy = 1
      const tp = prog(t, TEETER[0], TEETER[1])
      if (t < HOP[0]) {
        const amp = 3 + 13 * tp * tp
        tilt = tp > 0 ? amp * Math.sin((t - TEETER[0]) * Math.PI * 2 * 1.9) : 0
        const cr = prog(t, HOP[0] - 0.16, HOP[0]); sx = 1 + 0.12 * cr; sy = 1 - 0.12 * cr
      } else {
        const hp = prog(t, HOP[0], HOP[1])
        x = lerp(LINE_X, LAND_X, iq(hp)); lift = 170 * Math.sin(Math.PI * hp)
        tilt = lerp(0, 18, Math.sin(Math.PI * hp))
        const land = prog(t, HOP[1], HOP[1] + 0.5)
        if (land > 0) { const sq = 0.22 * Math.sin(land * Math.PI * 2) * Math.exp(-land * 3.5); sx = 1 + sq; sy = 1 - sq; tilt = 10 * Math.sin(land * Math.PI * 3) * Math.exp(-land * 4) }
      }
      const R = 58, [ps, pa] = pop(t, SPOP, 0.34)
      const groundY = t < HOP[0] ? base : (t < HOP[1] ? lerp(base, y - h / 2, iq(prog(t, HOP[0], HOP[1]))) : y - h / 2)
      // rotate about the foot point
      const footX = x, footY = groundY - lift
      const th = tilt * Math.PI / 180
      const cxS = footX + Math.sin(th) * R * sy, cyS = footY - Math.cos(th) * R * sy
      // balance pole
      ctx.save(); ctx.translate(cxS, cyS); ctx.rotate(-th * 1.4); ctx.globalAlpha = pa
      ctx.beginPath(); ctx.moveTo(-175 * ps, 6 + 18); ctx.quadraticCurveTo(0, -6, 175 * ps, 6 + 18); glow(ctx, BONE, 6, 1, 12)
      for (const sxp of [-1, 1]) { ctx.beginPath(); ctx.arc(sxp * 175 * ps, 24, 13 * ps, 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill(); glow(ctx, GOLD, 3, 1, 10) }
      ctx.restore()
      drawOrb(ctx, cxS, cyS, R * ps, SUN, pa, t, { sx, sy, glow: 1.25 })
      burst(ctx, LINE_X, base - R, SPOP, t, [GOLD, '#fff3e0'], { seed: 21, n: 8, dist: 90 })
      burst(ctx, LAND_X, y - h / 2 - 10, HOP[1], t, [GOLD, TAURUS, '#fff3e0'], { seed: 22, n: 10, dist: 120 })
      // ✓ by the Sun once the clock decides
      if (t > DECIDE) {
        const [cs, ca] = pop(t, DECIDE, 0.3)
        ctx.save(); ctx.translate(LAND_X + 98, y - h / 2 - 120); ctx.scale(cs, cs); ctx.globalAlpha = ca
        ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-6, 18); ctx.lineTo(26, -20); glow(ctx, GOLD, 9, 1, 18); ctx.restore()
        burst(ctx, LAND_X + 98, y - h / 2 - 120, DECIDE, t, [GOLD, '#fff3e0'], { seed: 24, n: 8, dist: 70 })
      }
    }
    // the clock that decides
    if (t > CLOCK.in) {
      const [cs, ca] = pop(t, CLOCK.in, 0.36), { x, y: cy, r } = CLOCK
      ctx.save(); ctx.translate(x, cy); ctx.scale(cs, cs); ctx.globalAlpha = ca
      ctx.fillStyle = 'rgba(30,18,64,0.78)'; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); glow(ctx, BONE, 7, 1, 20)
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78); ctx.lineTo(Math.cos(a) * r * (i % 3 ? 0.86 : 0.9), Math.sin(a) * r * (i % 3 ? 0.86 : 0.9)); ctx.strokeStyle = BONE; ctx.lineWidth = i % 3 ? 3 : 6; ctx.lineCap = 'round'; ctx.stroke() }
      // minute hand whirls, hour hand ticks in steps, both settle
      const mAng = -Math.PI / 2 + Math.PI * 2 * 3.2 * ease.outCubic(prog(t, CLOCK.in, DECIDE))
      let step = 0; CLOCK.ticks.forEach((tk, k) => { step += easeOutBack(prog(t, tk, tk + 0.16)) })
      const hAng = -Math.PI / 2 + (step * 26) * Math.PI / 180
      ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(mAng) * r * 0.72, Math.sin(mAng) * r * 0.72); glow(ctx, BONE, 6, 1, 12)
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(hAng) * r * 0.5, Math.sin(hAng) * r * 0.5); glow(ctx, GOLD, 10, 1, 16)
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill()
      ctx.restore()
      burst(ctx, x, cy, CLOCK.in, t, [BONE, GOLD], { seed: 26, n: 8, dist: 150 })
    }
    ctx.restore()
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      const ctx = bx
      drawSky(bx, t, SKY_H)
      drawQ3(ctx, t)
      drawQ4(ctx, t)
      drawQ5(ctx, t)
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
  // Q3
  ...qCues(Q3, [D5, E5, A5, FS5]),
  ['whoosh', HILLS[0], 0.6, 0.02], ['pop', PIN, 740, 0.05, 0.4],
  ['riser', RISE[0], 22.6, 0.025], ['bell', 22.3, 1174.66, 0.02, 2.0, -0.3], ['glitter', 22.2, 23.2],
  ['pop', P3[0].at, A5, 0.045, 0],
  ['tick', TAG + 0.22, 0.04], ['boom', TAG + 0.22, 0.03], ['pop', TAG + 0.24, D6, 0.06, 0],
  ['whoosh', LAND_OUT[0], 0.7, 0.02],
  // Q4
  ...qCues(Q4, [E5, FS5, A5, D6]),
  ...SIGNS.map((_, i) => ['pop', BAND_IN[0] + i * 0.045, [D5, E5, FS5, A5, B5, D6][i % 6], 0.02, ((i % 4) - 1.5) * 0.3]),
  ['pop', 27.3, A5, 0.04, 0], ['pop', BODIES, B5, 0.05, -0.2], ['pop', BODIES + 0.05, D6, 0.045, 0.2],
  ['pop', P4[0].at, A5, 0.04, 0],
  ['pluck', RETRO[0], 739.99, 0.045, 0.4, 0.3], ['pluck', RETRO[0] + 0.28, 659.25, 0.045, 0.4, 0.3], ['pluck', RETRO[0] + 0.56, 587.33, 0.045, 0.4, 0.3], ['pluck', RETRO[1], 880, 0.045, 0.4, 0.3],
  ['pop', P4[1].at, D6, 0.045, 0],
  ...CAL.map((c, i) => ['pop', c, [A5, B5, D6][i], 0.05, (i - 1) * 0.4]),
  ['whoosh', Q4_OUT[0], 0.6, 0.02],
  // Q5
  ...qCues(Q5, [D5, FS5, A5, D6]),
  ['pop', STRIP.in, 660, 0.045, 0], ['pop', SPOP, A5, 0.05, 0],
  ...Array.from({ length: 5 }, (_, k) => ['tick', TEETER[0] + k * 0.27, 0.01 + k * 0.003]),
  ['pop', HOP[0], 600, 0.05, -0.2], ['pop', HOP[1], 1318.51, 0.06, 0.2], ['tick', HOP[1], 0.02], ['glitter', HOP[1], HOP[1] + 0.6],
  ['pop', CLOCK.in, E5, 0.05, 0],
  ...CLOCK.ticks.map(tk => ['tick', tk, 0.03]),
  ['bell', DECIDE, 1479.98, 0.02, 1.6, 0.2], ['pop', DECIDE, D6, 0.05, 0.2],
  ['pop', Q5_OUT, E5, 0.03, 0],
]
