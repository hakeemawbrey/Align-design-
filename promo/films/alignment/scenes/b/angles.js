// alignment v2 · part b (19.8–40.2): "Then measure the angles." → 120°: easy. → 60°: they click. → 90°: spicy.
// Starts exactly on H at 19.8 (sky + v2 wheel, nothing else) and is back on exactly H from 39.6 (held to 40.2).
// Key hits land on the 108 bpm beat grid (t = 0.6 + n·0.5556). Beat map:
//   20.04  "Then measure the angles." pops in word by word; 20.6–21.4 the six placements pop back (overshoot)
//   21.71  a fat bone line shoots Libra Rising → Gemini Moon; 22.27–23.17 the protractor sweeps, the number counts to 120°
//   23.38  ALIGN · "120°: easy."  line turns gold + sparkles · 23.93 "Same element." → 26.16 "You read rooms the same way."
//   28.38  PULL · "60°: they click."  #8fd8f6 · 28.93 "Different, but they feed each other." → 31.16 "She answers like you do."
//   33.38  PUSH · "90°: spicy."  #f59cc4, jittery zap · 33.93 "Friction. Not a dealbreaker." → 36.16 "You want the last word. She wants silence."
//   38.2–39.5  everything pops back out → H
import { clamp, lerp, prog, ease, el, noise1, rng, C } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, READING, WHEEL, SKY_H, GRAIN_H, TYPE, angOf, ptOf, signMid, drawWheelH, easeOutBack } from '../../../wheel.js'
import * as PartA from '../a/index.js'

export const T0 = 19.8, T1 = 40.2
const BEAT = n => 0.6 + n * (60 / 108)
const BONE = '#efe6d6'

// ── placements: part A's PLACEMENTS / TRACK / TINT when exported, else sign midpoints on the v2 tracks
const AKEY = { you: 'you', her: 'juniper' }
const FALL = {
  track: { you: 500, her: 320 }, tint: { you: '#ffb072', her: '#a08cff' },
  sign: { you: { sun: 'taurus', moon: 'sagittarius', rising: 'libra' }, her: { sun: 'libra', moon: 'gemini', rising: 'aquarius' } },
}
const BODIES = ['sun', 'moon', 'rising']
function placements() {
  const PL = PartA.PLACEMENTS, TR = PartA.TRACK, TI = PartA.TINT
  const out = {}
  for (const who of ['you', 'her']) {
    const src = PL && PL[AKEY[who]]
    out[who] = { tint: (TI && TI[AKEY[who]]) || FALL.tint[who], r: (TR && TR[AKEY[who]]) || FALL.track[who] }
    // keep the tracks clear of the ring even if part A still carries older numbers
    if (who === 'you') out[who].r = Math.max(out[who].r, WHEEL.rOut + 40)
    else out[who].r = Math.min(out[who].r, WHEEL.rIn - 48)
    for (const b of BODIES) {
      const v = src && src[b]
      const sign = (v && v.sign) || FALL.sign[who][b]
      out[who][b] = { sign, lon: (v && typeof v.lon === 'number') ? v.lon : signMid(sign) }
    }
  }
  return out
}
const P = placements()
const pos = (who, body) => { const q = P[who][body], r = P[who].r; return { ...ptOf(q.lon, r), lon: q.lon, r } }
const SIGN_NAME = id => SIGNS.find(s => s.id === id).name.toUpperCase()

// ── timings
const ORB_IN = { you: [BEAT(36), BEAT(36) + 0.14, BEAT(36) + 0.28], her: [BEAT(37), BEAT(37) + 0.14, BEAT(37) + 0.28] }
const ORB_POP = 0.42
const INTRO = { head: BEAT(35), out: 23.1 }
const ASPECTS = [
  { key: 'align', color: READING.align, eyebrow: 'ALIGN', head: ['120°:', '*easy.'], deg: 120,
    a: ['you', 'rising'], b: ['her', 'moon'],
    p1: 'Same element.', p2: 'You read rooms the *same *way.',
    line: BEAT(38), arc: BEAT(39), tint: BEAT(41), head0: BEAT(41), p1t: BEAT(42), p2t: BEAT(46), out: 28.1 },
  { key: 'pull', color: READING.pull, eyebrow: 'PULL', head: ['60°:', 'they', '*click.'], deg: 60,
    a: ['her', 'sun'], b: ['you', 'moon'],
    p1: 'Different, but they feed each other.', p2: 'She answers *like *you *do.',
    line: BEAT(50) + 0.28, arc: BEAT(50) + 0.7, tint: null, head0: BEAT(50), p1t: BEAT(51), p2t: BEAT(55), out: 33.1 },
  { key: 'push', color: READING.push, eyebrow: 'PUSH', head: ['90°:', '*spicy.'], deg: 90,
    a: ['you', 'sun'], b: ['her', 'rising'], zap: true,
    p1: 'Friction. Not a dealbreaker.', p2: 'You want the last word.\nShe wants *silence.',
    line: BEAT(59) + 0.28, arc: BEAT(59) + 0.7, tint: null, head0: BEAT(59), p1t: BEAT(60), p2t: BEAT(64), out: 38.2 },
]
const LINE_LEN = 0.42, ARC_LEN = 0.9
const CLEAR = [38.2, 39.5]
const OUT_LEN = 0.28

const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})` }
const mixHex = (h1, h2, k) => {
  const p = parseInt(h1.slice(1), 16), q = parseInt(h2.slice(1), 16)
  const m = s => Math.round(lerp(p >> s & 255, q >> s & 255, clamp(k)))
  return '#' + ((m(16) << 16) | (m(8) << 8) | m(0)).toString(16).padStart(6, '0')
}
const sweep = (la, lb) => { const d = (((lb - la) % 360) + 360) % 360; return d <= 180 ? [la, d] : [lb, 360 - d] }

// ── word-pop text (DOM). Words starting with * are accent words (EB Garamond italic in `accent` colour).
function popText(parent, text, { style, accent, accentStyle, at, gap = 0.07, big = false }) {
  const box = el('div', { position: 'absolute', left: '70px', right: '70px', textAlign: 'center', whiteSpace: 'normal', ...style }, parent)
  const ws = []
  let i = 0
  text.split('\n').forEach((line, li) => {
    if (li) el('br', {}, box)
    line.split(' ').forEach(raw => {
      const acc = raw.startsWith('*'), w = acc ? raw.slice(1) : raw
      const e = el('span', { display: 'inline-block', margin: '0 0.16em', opacity: 0, transformOrigin: '50% 80%', ...(acc ? { color: accent, ...accentStyle } : {}) }, box, w)
      ws.push({ e, t: at + i++ * gap })
    })
  })
  return {
    box,
    update(t, outT) {
      const o = 1 - ease.inQuad(prog(t, outT, outT + OUT_LEN))
      const so = 1 - 0.08 * ease.inQuad(prog(t, outT, outT + OUT_LEN))
      for (const w of ws) {
        const p = prog(t, w.t, w.t + 0.28)
        const s = p <= 0 ? 0.6 : 0.6 + 0.4 * easeOutBack(p, 2.4)
        w.e.style.opacity = String(clamp(p / 0.4) * o)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30).toFixed(1)}px) scale(${(s * so).toFixed(3)})`
      }
    },
  }
}

// ── sparkles: pixel stars bursting from a point (deterministic)
function sparkles(ctx, t, t0, x, y, color, seed, n = 9, dist = 120) {
  const p = prog(t, t0, t0 + 0.8)
  if (p <= 0 || p >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.6, d = dist * (0.6 + 0.5 * r()) * ease.outCubic(p)
    const sz = 14 + Math.round(r() * 3) * 7
    ctx.globalAlpha = (1 - ease.inQuad(p)) * 0.95
    drawPixelStar(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, sz, Math.floor(r() * 3), i % 3 ? color : '#fff3e0', '#fffaf0')
  }
  ctx.restore()
}

// ── a big glowing orb with its glyph
const GLYPH = { sun: '☉︎', moon: '☽︎', rising: 'AC' }
function drawOrb(ctx, x, y, tint, body, k, s, ring = 0, ringColor = tint) {
  if (k <= 0.004 || s <= 0.01) return
  ctx.save()
  const hr = 92 * s
  const g = ctx.createRadialGradient(x, y, 0, x, y, hr)
  g.addColorStop(0, rgba(tint, 0.55 * k)); g.addColorStop(0.38, rgba(tint, 0.2 * k)); g.addColorStop(1, rgba(tint, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  if (ring > 0) {
    ctx.globalAlpha = ring * k; ctx.strokeStyle = ringColor; ctx.lineWidth = 5
    ctx.shadowColor = ringColor; ctx.shadowBlur = 18
    ctx.beginPath(); ctx.arc(x, y, 46 * s, 0, Math.PI * 2); ctx.stroke()
    ctx.shadowBlur = 0
  }
  const r = 36 * s
  ctx.globalAlpha = k
  const cg = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, 1, x, y, r)
  cg.addColorStop(0, '#fffaf0'); cg.addColorStop(0.5, tint); cg.addColorStop(1, mixHex(tint, '#2a1a4a', 0.25))
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if (body === 'rising') { ctx.font = `800 ${Math.round(34 * s)}px Inter, sans-serif`; ctx.fillText('AC', x, y + 2 * s) }
  else { ctx.font = `bold ${Math.round(46 * s)}px 'DejaVu Sans', 'FreeSerif', sans-serif`; ctx.fillText(GLYPH[body], x, y + 2 * s) }
  ctx.globalAlpha = k; ctx.imageSmoothingEnabled = false
  drawPixelStar(ctx, x + r * 0.78, y - r * 0.82, 21, 2, rgba(tint, 1), '#fffaf0')
  ctx.restore()
}

function wedge(ctx, signIdx, color, a) {
  if (a <= 0.003) return
  const { cx, cy, rIn, rOut } = WHEEL
  const a0 = angOf(signIdx * 30), a1 = angOf(signIdx * 30 + 30)
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color
  ctx.beginPath(); ctx.arc(cx, cy, rOut, a0, a1, true); ctx.arc(cx, cy, rIn, a1, a0, false); ctx.closePath(); ctx.fill()
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')

  // ── type (above the grain)
  const shadow = '0 4px 30px rgba(5,4,14,0.9), 0 0 3px rgba(5,4,14,0.75)'
  const headStyle = { top: `${TYPE.headY - 30}px`, font: TYPE.head, lineHeight: String(TYPE.headLine), color: BONE, textShadow: shadow, letterSpacing: '-0.01em' }
  const accStyle = { font: TYPE.accent, letterSpacing: '0' }
  const subStyle = { top: '1585px', font: TYPE.sub, lineHeight: '1.12', color: BONE, textShadow: shadow, letterSpacing: '-0.005em' }
  const intro = popText(root, 'Then measure the *angles.', { style: headStyle, accent: READING.align, accentStyle: accStyle, at: INTRO.head })
  const beats = ASPECTS.map(A => ({
    eye: popText(root, A.eyebrow, { style: { top: `${TYPE.eyebrowY - 34}px`, font: TYPE.eyebrow, letterSpacing: '0.25em', color: A.color, textShadow: shadow }, at: A.head0 - 0.1 }),
    head: popText(root, A.head.join(' '), { style: { ...headStyle, top: `${TYPE.headY - 10}px` }, accent: A.color, accentStyle: accStyle, at: A.head0 + 0.05, gap: 0.09 }),
    pair: popText(root, `${A.a[0] === 'you' ? 'YOUR' : 'HER'} ${SIGN_NAME(P[A.a[0]][A.a[1]].sign)} ${A.a[1].toUpperCase()}  ×  ${A.b[0] === 'you' ? 'YOUR' : 'HER'} ${SIGN_NAME(P[A.b[0]][A.b[1]].sign)} ${A.b[1].toUpperCase()}`,
      { style: { top: '1500px', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: A.color, textShadow: shadow, whiteSpace: 'pre' }, at: (A.tint || A.line) + 0.15, gap: 0.03 }),
    p1: popText(root, A.p1, { style: subStyle, accent: A.color, accentStyle: { color: A.color }, at: A.p1t, gap: 0.06 }),
    p2: popText(root, A.p2, { style: subStyle, accent: A.color, accentStyle: { color: A.color }, at: A.p2t, gap: 0.06 }),
  }))

  const clearK = t => 1 - ease.inOutCubic(prog(t, CLEAR[0] + 0.3, CLEAR[1]))

  function drawAspect(t, A, i) {
    if (t < A.line) return null
    const pa = pos(...A.a), pb = pos(...A.b)
    const [s0, span] = sweep(pa.lon, pb.lon)
    const colK = A.tint ? ease.inOutQuad(prog(t, A.tint, A.tint + 0.35)) : 1
    const col = mixHex(BONE, A.color, colK)
    const lineP = ease.outCubic(prog(t, A.line, A.line + LINE_LEN))
    const live = 1 - ease.inOutQuad(prog(t, A.out, A.out + 0.4))
    const ghost = 1 - 0.7 * ease.inOutQuad(prog(t, A.out, A.out + 0.4))
    const ck = clearK(t)
    const { cx, cy } = WHEEL
    bx.save(); bx.lineCap = 'round'; bx.lineJoin = 'round'
    // the two signs' bands light up
    const wk = live * ck * ease.inOutQuad(prog(t, A.line + 0.2, A.line + 0.6)) * colK
    wedge(bx, Math.floor(pa.lon / 30) % 12, A.color, 0.34 * wk)
    if (Math.floor(pb.lon / 30) !== Math.floor(pa.lon / 30)) wedge(bx, Math.floor(pb.lon / 30) % 12, A.color, 0.34 * wk)
    // protractor: the angle's wedge, its sides, a fat arc with ticks, and the big number
    const arcP = ease.inOutCubic(prog(t, A.arc, A.arc + ARC_LEN))
    const ak = live * ck
    const R = 165
    if (arcP > 0 && ak > 0) {
      const a0 = angOf(s0), a1 = angOf(s0 + span * arcP)
      // filled wedge
      bx.globalAlpha = 0.2 * ak; bx.fillStyle = col
      bx.beginPath(); bx.moveTo(cx, cy); bx.arc(cx, cy, R, a0, a1, true); bx.closePath(); bx.fill()
      // sides out to the orbs
      bx.globalAlpha = 0.75 * ak; bx.strokeStyle = col; bx.lineWidth = 3; bx.setLineDash([10, 12])
      const o0 = Math.abs(((pa.lon - s0) % 360 + 360) % 360) < 0.01 ? pa : pb, o1 = o0 === pa ? pb : pa
      const lonEnd = s0 + span * arcP
      const rEnd = lerp(R + 40, o1.r - 44, ease.inOutQuad(arcP))
      for (const [lon, rr] of [[s0, o0.r - 44], [lonEnd, rEnd]]) {
        const q = ptOf(lon, rr)
        bx.beginPath(); bx.moveTo(cx, cy); bx.lineTo(q.x, q.y); bx.stroke()
      }
      bx.setLineDash([])
      // arc + ticks every 10°
      bx.globalAlpha = ak; bx.lineWidth = 8; bx.shadowColor = col; bx.shadowBlur = 20
      bx.beginPath(); bx.arc(cx, cy, R, a0, a1, true); bx.stroke()
      bx.shadowBlur = 0; bx.lineWidth = 3
      for (let d = 0; d <= span * arcP + 0.01; d += 10) {
        const long = d % 30 === 0, q1 = ptOf(s0 + d, R + 6), q2 = ptOf(s0 + d, R + (long ? 30 : 18))
        bx.beginPath(); bx.moveTo(q1.x, q1.y); bx.lineTo(q2.x, q2.y); bx.stroke()
      }
      // number pops and counts
      const np = prog(t, A.arc, A.arc + 0.3)
      const ns = (0.6 + 0.4 * easeOutBack(np, 2.4)) * (1 + 0.12 * Math.sin(Math.PI * prog(t, A.arc + ARC_LEN, A.arc + ARC_LEN + 0.3)))
      bx.save(); bx.translate(cx, cy); bx.scale(ns, ns)
      bx.globalAlpha = ak * clamp(np / 0.4)
      bx.font = "800 104px Inter, sans-serif"; bx.textAlign = 'center'; bx.textBaseline = 'middle'
      bx.shadowColor = 'rgba(5,4,14,0.95)'; bx.shadowBlur = 16
      bx.fillStyle = col; bx.fillText(`${Math.round(span * arcP)}°`, 10, 4)
      bx.restore()
    }
    // the fat line between the two placements (jittery for Push)
    const la = ghost * ck
    const ex = lerp(pa.x, pb.x, lineP), ey = lerp(pa.y, pb.y, lineP)
    const len = Math.hypot(ex - pa.x, ey - pa.y)
    const nx = -(pb.y - pa.y) / Math.hypot(pb.x - pa.x, pb.y - pa.y), ny = (pb.x - pa.x) / Math.hypot(pb.x - pa.x, pb.y - pa.y)
    const f = Math.round(t * 30)
    const zapAmp = A.zap ? live * (10 * (1 - ease.outCubic(prog(t, A.line + LINE_LEN, A.line + LINE_LEN + 0.7))) + (f % 17 < 3 ? 4 : 0.8)) : 0
    const path = () => {
      bx.beginPath(); bx.moveTo(pa.x, pa.y)
      const N = zapAmp > 0 ? Math.max(2, Math.round(len / 26)) : 1
      for (let j = 1; j <= N; j++) {
        const u = j / N, off = j < N ? (noise1(j * 1.7 + f * 0.9, 31 + i) - 0.5) * 2 * zapAmp * Math.sin(Math.PI * u) : 0
        bx.lineTo(lerp(pa.x, ex, u) + nx * off, lerp(pa.y, ey, u) + ny * off)
      }
    }
    bx.globalAlpha = la
    bx.shadowColor = col; bx.shadowBlur = 30
    bx.strokeStyle = rgba(col, 0.85); bx.lineWidth = 10; path(); bx.stroke()
    bx.shadowBlur = 0
    bx.strokeStyle = rgba(mixHex(col, '#ffffff', 0.55), 0.95); bx.lineWidth = 3.5; path(); bx.stroke()
    // spark at the moving tip
    if (lineP > 0 && lineP < 1) { bx.imageSmoothingEnabled = false; drawPixelStar(bx, ex, ey, 28, 0, col, '#fffaf0') }
    bx.restore()
    // sparkles when the line lands, and when it turns gold
    const land = A.line + LINE_LEN
    sparkles(bx, t, land, pb.x, pb.y, col, 101 + i * 7)
    if (A.tint) { sparkles(bx, t, A.tint + 0.1, pa.x, pa.y, A.color, 211, 10, 140); sparkles(bx, t, A.tint + 0.1, pb.x, pb.y, A.color, 223, 10, 140) }
    else sparkles(bx, t, land, pa.x, pa.y, col, 131 + i * 7, 6, 90)
    return { pa, pb, live: live * lineP, col, land }
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      drawWheelH(bx)
      const focus = []
      ASPECTS.forEach((A, i) => { const r = drawAspect(t, A, i); if (r) focus.push({ A, ...r }) })
      const ck = clearK(t)
      for (const who of ['you', 'her']) BODIES.forEach((body, j) => {
        const p = pos(who, body)
        const t0 = ORB_IN[who][j]
        const pin = prog(t, t0, t0 + ORB_POP)
        // pop out, staggered, during the clear
        const t1 = CLEAR[0] + (who === 'you' ? 0 : 0.18) + j * 0.12
        const pout = prog(t, t1, t1 + 0.32)
        let s = pin <= 0 ? 0 : (0.2 + 0.8 * easeOutBack(pin, 2.6))
        s *= (1 + 0.15 * Math.sin(Math.PI * prog(t, t1 - 0.14, t1))) * (1 - 0.8 * ease.inQuad(pout))
        let k = clamp(pin / 0.3) * (1 - ease.inQuad(pout))
        let dim = 0, ring = 0, rc = P[who].tint, bump = 0
        for (const fo of focus) {
          if (fo.live <= 0.001) continue
          const mine = (fo.A.a[0] === who && fo.A.a[1] === body) || (fo.A.b[0] === who && fo.A.b[1] === body)
          if (mine) {
            ring = Math.max(ring, fo.live); rc = fo.col
            bump = Math.max(bump, Math.sin(Math.PI * prog(t, fo.land, fo.land + 0.35)), fo.A.tint ? Math.sin(Math.PI * prog(t, fo.A.tint, fo.A.tint + 0.35)) : 0)
          } else dim = Math.max(dim, fo.live)
        }
        drawOrb(bx, p.x, p.y, P[who].tint, body, k * (1 - 0.6 * dim), Math.max(0, s) * (1 + 0.22 * bump), ring, rc)
      })
      drawGrain(gx, t)
      // type
      intro.update(t, INTRO.out)
      ASPECTS.forEach((A, i) => {
        const b = beats[i]
        b.eye.update(t, A.out); b.head.update(t, A.out); b.pair.update(t, A.out)
        b.p1.update(t, A.p2t - 0.3); b.p2.update(t, A.out)
      })
    },
  }
}

// ── sound: pops for every pop-in (a little melody), plucks when lines land, glitter on sparkles
const POPS = [659.25, 739.99, 880, 987.77, 1108.73, 1318.51]
export const cues = [
  ...[0, 1, 2, 3].map(j => ['pop', INTRO.head + j * 0.07, POPS[j], 0.04, 0]),
  ...['you', 'her'].flatMap((w, wi) => ORB_IN[w].map((t0, j) => ['pop', t0 + 0.05, POPS[wi * 3 + j], 0.05, wi ? 0.35 : -0.35])),
  ...ASPECTS.flatMap((A, i) => [
    ['whoosh', A.line - 0.05, 0.5, 0.025],
    ['pluck', A.line + LINE_LEN, [587.33, 739.99, 493.88][i], 0.05, 0.5, 0],
    ['tick', A.arc + ARC_LEN, 0.02],
    ['pop', A.arc + ARC_LEN, [1174.66, 1479.98, 987.77][i], 0.05, 0],
    ['pop', A.head0 + 0.05, [880, 987.77, 783.99][i], 0.05, 0],
    ['pop', A.head0 + 0.05 + 0.09 * (A.head.length - 1), [1318.51, 1479.98, 1174.66][i], 0.06, 0],
    ['pop', A.p1t, 740, 0.035, -0.2], ['pop', A.p2t, 880, 0.035, 0.2],
    ...(A.tint ? [['glitter', A.tint + 0.1, A.tint + 0.8], ['bell', A.tint + 0.05, 1174.66, 0.02, 1.6, 0]] : [['glitter', A.line + LINE_LEN, A.line + LINE_LEN + 0.6]]),
    ...(A.zap ? [['tick', A.line + LINE_LEN + 0.1, 0.03], ['tick', A.line + LINE_LEN + 0.22, 0.025]] : []),
  ]),
  ...[0, 1, 2, 3, 4, 5].map(j => ['pop', CLEAR[0] + 0.05 + j * 0.12, POPS[5 - j], 0.03, 0]),
  ['whoosh', CLEAR[0] + 0.3, 0.9, 0.02],
]
