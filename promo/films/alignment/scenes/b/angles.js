// alignment · part b (19.8–40.2): "Then read the angles between them." → Align 120° → Pull 60° → Push 90°.
// Starts exactly on H at 19.8 (sky + empty wheel, nothing else) and is back on exactly H from 39.6 (held to 40.2).
// Beat map (all times in film seconds):
//   20.2–21.3  both charts' placements return (yours on the outer track, hers on the inner), legend under the wheel
//   20.4–23.9  "Then read the angles between them."  21.4 a bone line is drawn, 22.4 its arc is measured → 120°
//   24.0–28.8  ALIGN · "Where it holds."  the line turns gold; Libra Rising ↔ Gemini Moon; "120°: same element. It flows."
//   29.0–33.4  PULL · "What draws you in."  #8fd8f6, her Libra Sun ↔ your Sagittarius Moon, 60°
//   33.6–38.0  PUSH · "Where you push back."  #f59cc4, your Taurus Sun ↔ her Aquarius Rising, 90°
//   37.9–39.6  everything clears back to H
import { clamp, lerp, prog, ease, el, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../../sky.js'
import { SIGNS, READING, WHEEL, SKY_H, GRAIN_H, angOf, ptOf, signMid, drawWheelH } from '../../../wheel.js'
import * as PartA from '../a/index.js'

export const T0 = 19.8, T1 = 40.2

// ── placements: part A's PLACEMENTS when it exports them, else sign midpoints on two tracks
const TINT = { you: '#ffd3a1', her: '#bfa9ff' }
const TRACK = { you: 300, her: 240 }
const FALLBACK = {
  you: { sun: 'taurus', moon: 'sagittarius', rising: 'libra' },
  her: { sun: 'libra', moon: 'gemini', rising: 'aquarius' },
}
const lonOf = v => typeof v === 'number' ? v : typeof v === 'string' ? signMid(v.toLowerCase()) : v && (v.lon ?? (v.sign != null ? signMid(String(v.sign).toLowerCase()) : null))
const SHARED = typeof PartA.drawOrb === 'function' && typeof PartA.PLACE === 'function'
const AKEY = { you: 'you', her: 'juniper' }
function placements() {
  const P = PartA.PLACEMENTS
  const out = {}
  for (const who of ['you', 'her']) {
    const src = P && (P[AKEY[who]] || P[who])
    out[who] = {}
    for (const body of ['sun', 'moon', 'rising']) {
      const v = src && src[body]
      out[who][body] = {
        lon: lonOf(v) ?? signMid(FALLBACK[who][body]),
        r: (PartA.TRACK && PartA.TRACK[AKEY[who]]) || TRACK[who],
        sign: (v && v.sign) || FALLBACK[who][body],
      }
    }
    out[who].tint = (PartA.TINT && PartA.TINT[AKEY[who]]) || TINT[who]
  }
  return out
}

const GLYPH = { sun: '☉', moon: '☽', rising: 'AC' }

// ── timings
const ORB_IN = { you: [20.2, 20.35, 20.5], her: [20.6, 20.75, 20.9] }, ORB_LEN = 0.7
const BODIES = ['sun', 'moon', 'rising']
const ASPECTS = [
  { key: 'align', color: READING.align, eyebrow: 'ALIGN', cap: 'Where it holds.', sub: '120°: same element. It flows.',
    a: ['you', 'rising'], b: ['her', 'moon'], pair: 'YOUR LIBRA RISING  ·  HER GEMINI MOON',
    // the demo line under "Then read the angles" is this same pair, drawn in bone first
    line: [21.4, 22.4], arc: [22.4, 23.4], tint: [23.9, 24.6], cap0: 24.0, cap1: 28.4, ghost: [28.4, 29.0] },
  { key: 'pull', color: READING.pull, eyebrow: 'PULL', cap: 'What draws you in.', sub: '60°: elements that feed each other.',
    a: ['her', 'sun'], b: ['you', 'moon'], pair: 'HER LIBRA SUN  ·  YOUR SAGITTARIUS MOON',
    line: [29.2, 30.2], arc: [30.1, 31.0], tint: null, cap0: 29.0, cap1: 33.0, ghost: [33.0, 33.6] },
  { key: 'push', color: READING.push, eyebrow: 'PUSH', cap: 'Where you push back.', sub: '90°: friction. Not a dealbreaker,\na thing to know.',
    a: ['you', 'sun'], b: ['her', 'rising'], pair: 'YOUR TAURUS SUN  ·  HER AQUARIUS RISING',
    line: [33.8, 34.8], arc: [34.7, 35.6], tint: null, cap0: 33.6, cap1: 37.6, ghost: [37.6, 38.0] },
]
const CLEAR = [37.9, 39.6]       // diagram → H
const INTRO = { cap: [20.4, 23.5] }
const FADE = 0.45

/** eased in/out window: 0 → 1 over [a, a+fi], 1 → 0 over [b, b+fo] */
const win = (t, a, b, fi = FADE, fo = FADE) => ease.inOutQuad(prog(t, a, a + fi)) * (1 - ease.inOutQuad(prog(t, b, b + fo)))

/** shortest signed sweep from lon a to lon b: returns [start, span] with span ∈ [0, 180] going counter-clockwise from start */
function sweep(la, lb) {
  const d = (((lb - la) % 360) + 360) % 360
  return d <= 180 ? [la, d] : [lb, 360 - d]
}

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`
}

function drawOrb(ctx, x, y, tint, body, k, glow = 0, glowColor = tint) {
  if (k <= 0.004) return
  const s = 0.6 + 0.4 * ease.outCubic(clamp(k))
  ctx.save()
  // halo
  const hr = 54 * s * (1 + 0.25 * glow)
  const g = ctx.createRadialGradient(x, y, 0, x, y, hr)
  g.addColorStop(0, rgba(tint, 0.42 * k)); g.addColorStop(0.45, rgba(tint, 0.14 * k)); g.addColorStop(1, rgba(tint, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  if (glow > 0) {
    ctx.globalAlpha = glow * k * 0.9
    ctx.strokeStyle = glowColor; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.arc(x, y, 34 * s, 0, Math.PI * 2); ctx.stroke()
  }
  // core
  const r = 24 * s
  ctx.globalAlpha = k
  const cg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 1, x, y, r)
  cg.addColorStop(0, '#fffaf0'); cg.addColorStop(0.55, tint); cg.addColorStop(1, rgba(tint, 0.9))
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  // glyph
  ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if (body === 'rising') { ctx.font = `bold ${Math.round(18 * s)}px 'Space Mono', monospace`; ctx.fillText('AC', x, y + 1) }
  else { ctx.font = `${Math.round(30 * s)}px 'DejaVu Sans', 'FreeSerif', sans-serif`; ctx.fillText(GLYPH[body] + '︎', x, y + 1) }
  // pixel glint
  ctx.globalAlpha = k * 0.95; ctx.fillStyle = '#fff3e0'
  const gx = Math.round(x + r * 0.78), gy = Math.round(y - r * 0.82), p = 3
  ctx.fillRect(gx - p / 2, gy - p * 1.5, p, p * 3); ctx.fillRect(gx - p * 1.5, gy - p / 2, p * 3, p)
  ctx.restore()
}

/** annular sector of a sign between rIn and rOut */
function wedge(ctx, signIdx, color, a) {
  if (a <= 0.003) return
  const { cx, cy, rIn, rOut } = WHEEL
  const a0 = angOf(signIdx * 30), a1 = angOf(signIdx * 30 + 30)
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color
  ctx.beginPath(); ctx.arc(cx, cy, rOut, a0, a1, true); ctx.arc(cx, cy, rIn, a1, a0, false); ctx.closePath(); ctx.fill()
  ctx.restore()
}

export default async function build(stage) {
  const P = placements()
  const pos = (who, body) => { const q = P[who][body]; return { ...ptOf(q.lon, q.r), lon: q.lon, r: q.r } }

  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')

  // ── type (above the grain)
  const shadow = '0 0 18px rgba(11,6,32,0.95), 0 0 4px rgba(11,6,32,0.8)'
  const capStyle = { position: 'absolute', left: '90px', right: '90px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', color: C.bone, opacity: 0, textShadow: shadow, whiteSpace: 'pre-line' }
  const eyeStyle = { position: 'absolute', left: '90px', right: '90px', textAlign: 'center', fontFamily: MONO, fontSize: '32px', letterSpacing: '0.3em', opacity: 0, textShadow: shadow }
  const intro = el('div', { ...capStyle, top: '268px', fontSize: '76px', lineHeight: '1.12' }, root, 'Then read the angles\nbetween them.')
  const beats = ASPECTS.map(A => ({
    eye: el('div', { ...eyeStyle, top: '262px', color: A.color }, root, A.eyebrow),
    cap: el('div', { ...capStyle, top: '316px', fontSize: '80px', lineHeight: '1.1' }, root, A.cap),
    pair: el('div', { ...eyeStyle, top: '1470px', fontSize: '26px', letterSpacing: '0.16em', color: A.color }, root, A.pair),
    sub: el('div', { ...capStyle, top: '1530px', fontSize: '50px', lineHeight: '1.18' }, root, A.sub),
  }))
  const legend = el('div', { position: 'absolute', left: '90px', right: '90px', top: '1400px', textAlign: 'center', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.2em', color: C.bone, opacity: 0, textShadow: shadow, whiteSpace: 'pre' }, root,
    `<span style="color:${P.you.tint}">●</span> YOU · OUTER      <span style="color:${P.her.tint}">●</span> JUNIPER · INNER`)

  const clearK = t => 1 - ease.inOutCubic(prog(t, CLEAR[0], CLEAR[1]))

  function drawAspect(t, A, i) {
    const pa = pos(...A.a), pb = pos(...A.b)
    const [s0, span] = sweep(pa.lon, pb.lon)
    const col = A.tint ? lerp(0, 1, ease.inOutQuad(prog(t, A.tint[0], A.tint[1]))) : 1
    const colorAt = a => col >= 1 ? rgba(A.color, a) : mixRgba('#efe6d6', A.color, col, a)
    const lineP = ease.inOutCubic(prog(t, A.line[0], A.line[1]))
    if (lineP <= 0) return
    const ghost = 1 - 0.68 * ease.inOutQuad(prog(t, A.ghost[0], A.ghost[1]))   // lines stay as faint ghosts
    const live = 1 - ease.inOutQuad(prog(t, A.ghost[0], A.ghost[1]))             // spokes, arc, number, wedges go
    const ck = clearK(t)
    const { cx, cy } = WHEEL
    bx.save(); bx.lineCap = 'round'
    // sign wedges of the two placements
    const wk = live * ck * ease.inOutQuad(prog(t, A.line[0] + 0.3, A.line[1] + 0.2)) * (A.tint ? col : 1)
    wedge(bx, Math.floor(pa.lon / 30) % 12, A.color, 0.16 * wk)
    if (Math.floor(pb.lon / 30) !== Math.floor(pa.lon / 30)) wedge(bx, Math.floor(pb.lon / 30) % 12, A.color, 0.16 * wk)
    // spokes from the centre to each orb (the two sides of the angle)
    const sk = live * ck * ease.inOutQuad(prog(t, A.arc[0] - 0.4, A.arc[0] + 0.2))
    if (sk > 0) {
      bx.setLineDash([6, 10]); bx.lineWidth = 2; bx.strokeStyle = colorAt(0.6 * sk)
      for (const p of [pa, pb]) {
        const u = { x: (p.x - cx) / p.r, y: (p.y - cy) / p.r }
        bx.beginPath(); bx.moveTo(cx + u.x * 112, cy + u.y * 112); bx.lineTo(cx + u.x * (p.r - 30), cy + u.y * (p.r - 30)); bx.stroke()
      }
      bx.setLineDash([])
    }
    // the line between the two placements
    const la = ghost * ck
    const ex = lerp(pa.x, pb.x, lineP), ey = lerp(pa.y, pb.y, lineP)
    bx.shadowColor = colorAt(0.8 * la); bx.shadowBlur = 14
    bx.strokeStyle = colorAt(0.95 * la); bx.lineWidth = 3.5
    bx.beginPath(); bx.moveTo(pa.x, pa.y); bx.lineTo(ex, ey); bx.stroke()
    bx.shadowBlur = 0
    // the arc measured around the centre, and its degree count
    const arcP = ease.inOutCubic(prog(t, A.arc[0], A.arc[1]))
    const ak = live * ck
    if (arcP > 0 && ak > 0) {
      const r = 100
      bx.strokeStyle = colorAt(0.95 * ak); bx.lineWidth = 3
      bx.beginPath(); bx.arc(cx, cy, r, angOf(s0), angOf(s0 + span * arcP), true); bx.stroke()
      // little end ticks
      bx.lineWidth = 2
      for (const l of [s0, s0 + span * arcP]) { const q = ptOf(l, r - 9), w = ptOf(l, r + 9); bx.beginPath(); bx.moveTo(q.x, q.y); bx.lineTo(w.x, w.y); bx.stroke() }
      const nk = ak * ease.inOutQuad(prog(t, A.arc[0], A.arc[0] + 0.3))
      bx.globalAlpha = nk
      bx.fillStyle = colorAt(1); bx.font = "italic 64px 'EB Garamond', serif"; bx.textAlign = 'center'; bx.textBaseline = 'middle'
      bx.shadowColor = 'rgba(11,6,32,0.9)'; bx.shadowBlur = 10
      bx.fillText(`${Math.round(span * arcP)}°`, cx + 6, cy + 2)
    }
    bx.restore()
    return { pa, pb, live: live * lineP, col }
  }

  function mixRgba(h1, h2, k, a) {
    const p = parseInt(h1.slice(1), 16), q = parseInt(h2.slice(1), 16)
    const m = s => Math.round(lerp(p >> s & 255, q >> s & 255, k))
    return `rgba(${m(16)},${m(8)},${m(0)},${a})`
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      drawWheelH(bx)
      const restoreK = ease.inOutQuad(prog(t, 20.2, 21.2)) * clearK(t)
      const focusAny = Math.max(...ASPECTS.map(A => ease.inOutQuad(prog(t, A.line[0], A.line[0] + 0.6)) * (1 - ease.inOutQuad(prog(t, A.ghost[0], A.ghost[1])))))
      if (SHARED && restoreK > 0) {
        for (const who of ['you', 'her']) {
          if (PartA.drawSignWash) for (const b of BODIES) PartA.drawSignWash(bx, P[who][b].sign, restoreK * 0.5 * (1 - focusAny))
          if (PartA.drawTrack) PartA.drawTrack(bx, AKEY[who], restoreK)
        }
      }
      // aspects (under the orbs)
      const focus = []
      ASPECTS.forEach((A, i) => { const f = drawAspect(t, A, i); if (f) focus.push({ A, ...f }) })
      // which orbs are in the current aspect (others dim back)
      const live = focus.filter(f => f.live > 0.001)
      const ck = clearK(t)
      for (const who of ['you', 'her']) BODIES.forEach((body, j) => {
        const p = pos(who, body)
        const kin = ease.outCubic(prog(t, ORB_IN[who][j], ORB_IN[who][j] + ORB_LEN))
        let dim = 0, glow = 0, gcol = P[who].tint
        for (const f of live) {
          const mine = (f.A.a[0] === who && f.A.a[1] === body) || (f.A.b[0] === who && f.A.b[1] === body)
          if (mine) { glow = Math.max(glow, f.live); gcol = f.col >= 0.5 ? f.A.color : C.bone } else dim = Math.max(dim, f.live)
        }
        const ok = kin * ck * (1 - 0.55 * dim)
        if (SHARED) {
          if (glow > 0) { bx.save(); bx.globalAlpha = glow * ok * 0.9; bx.strokeStyle = gcol; bx.lineWidth = 2.5; bx.beginPath(); bx.arc(p.x, p.y, 21, 0, Math.PI * 2); bx.stroke(); bx.restore() }
          PartA.drawOrb(bx, p.x, p.y, AKEY[who], { k: ok, s: 1 + 0.15 * glow, t, seed: (who === 'you' ? 10 : 20) + j })
          PartA.drawOrbLabel && PartA.drawOrbLabel(bx, AKEY[who], body, ok)
        } else drawOrb(bx, p.x, p.y, P[who].tint, body, ok, glow, gcol)
      })
      // grain
      drawGrain(gx, t)
      // type
      intro.style.opacity = String(win(t, INTRO.cap[0], INTRO.cap[1]))
      intro.style.transform = `translateY(${(1 - ease.outCubic(prog(t, INTRO.cap[0], INTRO.cap[0] + 0.6))) * 14}px)`
      ASPECTS.forEach((A, i) => {
        const b = beats[i]
        const k = win(t, A.cap0, A.cap1)
        b.eye.style.opacity = String(k)
        b.cap.style.opacity = String(win(t, A.cap0 + 0.15, A.cap1))
        b.cap.style.transform = `translateY(${(1 - ease.outCubic(prog(t, A.cap0 + 0.15, A.cap0 + 0.75))) * 14}px)`
        b.pair.style.opacity = String(win(t, A.tint ? A.tint[0] : A.line[0] + 0.3, A.cap1) * 0.95)
        b.sub.style.opacity = String(win(t, Math.max(A.arc[0] + 0.2, A.cap0 + 0.6), A.cap1) * 0.92)
      })
      legend.style.opacity = String(0.85 * ease.inOutQuad(prog(t, 20.7, 21.4)) * ck)
    },
  }
}

export const cues = [
  ['bell', 20.25, 659.25, 0.012, 1.6, -0.4], ['bell', 20.65, 739.99, 0.012, 1.6, 0.4],
  ...ASPECTS.flatMap((A, i) => [
    ['whoosh', A.line[0], 0.9, 0.022],
    ['tick', A.arc[1] - 0.05, 0.016],
    ['bell', A.cap0 + 0.15, [587.33, 739.99, 493.88][i], 0.026, 2.4, 0],
  ]),
  ['bell', 23.95, 880, 0.012, 1.8, 0],
  ['whoosh', CLEAR[0] + 0.1, 1.4, 0.02],
]
