// cityatlanta (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–4.75  HOOK  "Atlanta: | a city in a | *forest.*" — a generic skyline springs up, then a canopy of line-art trees
//              grows over it row by row, dogwood blossoms pop (2.5).
//   4.55–5.35  the camera drops down through the canopy to the forest floor.
//   4.90–7.35  "So many *trees.*" — trunks keep popping in (on the beat) while a pictogram wanders between them.
//   7.40–10.25 "So hard to find | *the one.*" — the walker stops, looks left/right, a big "?" pops, little ones bubble.
//   10.3–15.2  "Tonight's deck is | dealt from the | *stars.*" — five card backs fall through the canopy like leaves
//              (knocking leaves loose), settle in a fan; the centre card lifts and glows (13.55).
//   15.1–20.1  the glowing card flips to a veiled mystery card on an aura, a ring of zodiac glyphs: "Chart first. | *Face last.*"
//   19.9–25.4  the card shrinks to a star and falls into the forest; a gold figure appears; the walker goes to them;
//              a heart pops and the canopy blooms. "Find your one | *in the forest.*"
//   25.4→      plain sky only (SKY_H + grain), the end card takes over at 25.6.
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, SIGNS, easeOutBack } from '../../wheel.js'

export const STORY_END = 25.6
const H = 1920
const BEAT = n => 0.6 + n * 0.5556
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', VIOLET = '#c9a6ff', BLUE = '#8fd8f6', LEAF = '#7fe0a8', TEAL = '#5fe3c8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.95), 0 0 6px rgba(6,4,18,0.7)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const inOutSine = v => -(Math.cos(Math.PI * clamp(v)) - 1) / 2
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── the timeline
export const T = {
  hook: 0.1, hookLate: BEAT(2), sky: 0.15, trees: 0.55, bloom: 2.55, hookOut: [4.55, 4.75],
  descend: [4.55, 5.35],
  many: 5.0, manyLate: BEAT(9), manyOut: [7.15, 7.35],
  one: 7.42, oneLate: BEAT(13) + 0.05, stop: [7.4, 7.8], look: 7.9, q: BEAT(14), oneOut: [10.05, 10.25],
  turn: 10.32, turnLate: BEAT(19) + 0.05, fall: [10.6, 10.95, 11.3, 11.65, 12.0], fallDur: 1.5, glow: BEAT(23) + 0.15, turnOut: [15.0, 15.2],
  sidesOut: 14.75, flip: [15.1, 15.6], chart: 15.4, chartLate: BEAT(28) + 0.05, ring: 16.0, chartOut: [19.9, 20.1],
  shrink: [19.9, 20.45], starFall: [20.35, 21.05], figure: 21.05, walk2: [21.3, 22.5], heart: BEAT(39) + 0.05, bloom2: 22.75,
  end: 20.25, endLate: BEAT(36) + 0.05, endOut: [24.9, 25.2], sceneOut: [24.85, 25.4],
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    const wt = big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(t < w.t ? 0 : clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** fill the current path at fa, then stroke it thick with a glow */
function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, Math.max(4, Math.round(size * (1 - 0.35 * p) / 4) * 4), kind, col)
  }
  x.restore()
}

// ── leaves
function leaf(x, px, py, s, rot, col, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  x.beginPath(); x.moveTo(0, -22); x.quadraticCurveTo(15, 0, 0, 22); x.quadraticCurveTo(-15, 0, 0, -22); x.closePath()
  x.fillStyle = col; x.fill()
  x.strokeStyle = 'rgba(10,30,20,0.6)'; x.lineWidth = 2.5; x.beginPath(); x.moveTo(0, -18); x.lineTo(0, 18); x.stroke()
  x.restore()
}
const LEAF_COLS = ['#7fe0a8', '#5fc98a', '#a8f0a0', '#ffb36b', '#ff8fb1']
/** a burst of leaves knocked loose at (px, py) at t0; they spray out and flutter down */
function leafBurst(x, px, py, t, t0, { n = 9, seed = 1, R = 140, dur = 1.6 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const a = r() * TAU, sp = R * (0.5 + 0.7 * r()), col = LEAF_COLS[Math.floor(r() * 4)], ph = r() * TAU
    const k = 1 - Math.exp(-tt * 4)
    const lx = px + Math.cos(a) * sp * k + 26 * Math.sin(tt * 5 + ph)
    const ly = py + Math.sin(a) * sp * 0.6 * k + 170 * tt * tt
    leaf(x, lx, ly, 0.9 + 0.5 * r(), ph + tt * 4 * (r() - 0.5) * 2, col, 1 - prog(tt, dur * 0.55, dur))
  }
}

/** a cloud-shaped tree crown: union of circles with a clean glowing outline (stroke all, then fill all on top) */
const PAL = {
  back: { line: '#4fb08a', fill: '#11283a', hi: '#173a44' },
  mid: { line: '#6fd29a', fill: '#123a30', hi: '#1a5040' },
  front: { line: '#9af0b8', fill: '#15452f', hi: '#226046' },
}
const BLOBS = [[0, 0, 1], [-0.62, 0.18, 0.72], [0.62, 0.16, 0.74], [-0.32, -0.46, 0.7], [0.36, -0.42, 0.68], [0.02, 0.38, 0.66]]
function crown(x, cx, cy, r, seed, pal, { k = 1, bloom = 0, t = 0, lw = 6, glow = 14 } = {}) {
  if (k <= 0 || r <= 0) return
  const rr = rng(seed)
  const cs = BLOBS.map(([ox, oy, s]) => [cx + (ox + (rr() - 0.5) * 0.14) * r * k, cy + (oy + (rr() - 0.5) * 0.14) * r * k, s * r * k * (0.92 + rr() * 0.16)])
  x.save()
  x.shadowColor = pal.line; x.shadowBlur = glow
  x.strokeStyle = pal.line; x.lineWidth = lw * 2
  for (const [px, py, pr] of cs) { x.beginPath(); x.arc(px, py, pr, 0, TAU); x.stroke() }
  x.shadowBlur = 0
  x.fillStyle = pal.fill
  for (const [px, py, pr] of cs) { x.beginPath(); x.arc(px, py, pr, 0, TAU); x.fill() }
  x.fillStyle = pal.hi
  for (const [px, py, pr] of cs) { x.beginPath(); x.arc(px - pr * 0.16, py - pr * 0.2, pr * 0.62, 0, TAU); x.fill() }
  x.restore()
  // dogwood blossoms (little 4-petal flowers) on some crowns
  if (bloom > 0 && rr() < 0.75) {
    const nb = 3 + Math.floor(rr() * 4)
    for (let i = 0; i < nb; i++) {
      const c = cs[Math.floor(rr() * cs.length)], a = rr() * TAU, d = rr() * c[2] * 0.7
      const bk = easeOutBack(clamp((bloom - i * 0.08) * 2.2), 2.6)
      if (bk <= 0) continue
      const bx = c[0] + Math.cos(a) * d, by = c[1] + Math.sin(a) * d, bs = (7 + rr() * 5) * (r / 170 + 0.35) * bk
      x.save(); x.translate(bx, by); x.rotate(a + t * 0.3)
      x.fillStyle = rr() < 0.5 ? '#ffd3e2' : '#fff3e0'
      for (let p = 0; p < 4; p++) { x.rotate(TAU / 4); x.beginPath(); x.ellipse(0, -bs, bs * 0.62, bs, 0, 0, TAU); x.fill() }
      x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(0, 0, bs * 0.38, 0, TAU); x.fill()
      x.restore()
    }
  }
}

/** a pictogram person seen from behind (no face). (px, py) = feet, s = scale (≈ 300 px tall at 1). */
function person(x, px, py, s, { step = 0, amp = 1, look = 0, a = 1, col = VIOLET, line = BONE, glow = 14, fa = 0.32 } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  const sw = Math.sin(step) * amp, bob = Math.abs(Math.cos(step)) * amp * 6
  x.translate(0, -bob)
  ;[-1, 1].forEach(d => {
    const kx = d * 18 + sw * d * 22
    x.beginPath(); x.moveTo(d * 18, -120); x.lineTo(kx, -6 + Math.max(0, sw * d) * 6)
    ink(x, line, { w: 26, fa: 0, glow: glow * 0.6 })
  })
  x.beginPath(); x.moveTo(-44, -112); x.lineTo(-38, -222); x.quadraticCurveTo(-38, -254, 0, -256); x.quadraticCurveTo(38, -254, 38, -222); x.lineTo(44, -112); x.closePath()
  x.fillStyle = '#1c1238'; x.fill()
  ink(x, line, { w: 9, fa, fill: col, glow })
  ;[-1, 1].forEach(d => {
    x.beginPath(); x.moveTo(d * 40, -226); x.lineTo(d * 54 - sw * d * 16, -140)
    ink(x, line, { w: 16, fa: 0, glow: glow * 0.5 })
  })
  x.beginPath(); x.arc(look * 8, -292, 32, 0, TAU)
  ink(x, line, { w: 9, fa: 0.85, fill: line, glow })
  x.restore()
}

/** the "?" glyph */
function qmark(x, px, py, s, col, a = 1, rot = 0) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 150px ${INTER}`
  x.shadowColor = col; x.shadowBlur = 24
  x.lineWidth = 10; x.strokeStyle = 'rgba(12,8,30,0.9)'; x.lineJoin = 'round'; x.strokeText('?', 0, 0)
  x.fillStyle = col; x.fillText('?', 0, 0)
  x.restore()
}
function heart(x, px, py, s, col, a = 1) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  x.beginPath(); x.moveTo(0, 30)
  x.bezierCurveTo(-70, -20, -42, -78, 0, -40); x.bezierCurveTo(42, -78, 70, -20, 0, 30); x.closePath()
  ink(x, '#ffe7a8', { w: 7, fa: 1, fill: col, glow: 30 })
  x.restore()
}

// ── the hook: a generic skyline, then a canopy grows over it
const HZ = 1200
const TOWERS = (() => {
  const r = rng(41), out = []
  let px = 170
  while (px < 910) {
    const mid = 1 - Math.min(1, Math.abs(px - 560) / 400)
    const w = 34 + r() * 46, h = 70 + r() * 70 + mid * (120 + r() * 230)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat', 'dome'][Math.floor(r() * 6)], seed: r() * 100 })
    px += w + 4 + r() * 14
  }
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 16); x.lineTo(m - 5, y + 6); x.lineTo(m, y - 40); x.lineTo(m + 5, y + 6); x.lineTo(r, y + 16); break
    case 'slant': x.lineTo(l, y + 28); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 26); x.lineTo(l + b.w * 0.25, y + 26); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 26); x.lineTo(r, y + 26); break
    case 'dome': x.lineTo(l, y + 14); x.quadraticCurveTo(m, y - 30, r, y + 14); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}
// hook trees: rows from the skyline's feet toward us, plus two tall framing trees
const HOOK_TREES = (() => {
  const r = rng(7), out = []
  const rows = [
    { base: 1290, cy: 1215, R: 66, step: 92, pal: 'back', t0: 0.55 },
    { base: 1460, cy: 1335, R: 92, step: 135, pal: 'back', t0: 0.85 },
    { base: 1680, cy: 1500, R: 124, step: 190, pal: 'mid', t0: 1.15 },
    { base: 2000, cy: 1740, R: 168, step: 255, pal: 'front', t0: 1.45 },
  ]
  rows.forEach((rw, ri) => {
    for (let px = -40 + r() * rw.step * 0.5; px < 1120; px += rw.step * (0.85 + r() * 0.3)) {
      out.push({ x: px, base: rw.base, cy: rw.cy + (r() - 0.5) * 30, R: rw.R * (0.85 + r() * 0.3), pal: rw.pal, seed: Math.floor(r() * 1e4),
        t0: rw.t0 + Math.abs(px - 540) * 0.0011 + r() * 0.12, row: ri })
    }
  })
  out.push({ x: 40, base: 2000, cy: 900, R: 150, pal: 'front', seed: 901, t0: 1.9, row: 4 })
  out.push({ x: 1045, base: 2000, cy: 950, R: 150, pal: 'front', seed: 902, t0: 2.0, row: 4 })
  return out
})()

// ── the forest floor (world x scrolls with camX × parallax)
const GROUND = 1770
const LAYERS = [
  { pf: 0.45, step: 150, w: 16, cy: 830, R: 100, pal: 'back', col: '#6a5aa8', a: 0.55, seed: 11 },
  { pf: 0.72, step: 200, w: 30, cy: 770, R: 125, pal: 'mid', col: '#9a86d6', a: 0.85, seed: 23 },
  { pf: 1.0, step: 330, w: 52, cy: 690, R: 150, pal: 'front', col: '#c9b6f6', a: 1, seed: 37 },
].map(L => {
  const r = rng(L.seed), trunks = []
  for (let wx = -300 + r() * 60; wx < 1080 + 1100 * L.pf + 300; wx += L.step * (0.8 + r() * 0.4)) {
    const late = r() < 0.55
    if (L.pf === 1 && wx > 1290 && wx < 1810) continue   // a clearing where the walker ends up
    trunks.push({ wx, seed: Math.floor(r() * 1e4), lean: (r() - 0.5) * 0.05, R: L.R * (0.85 + r() * 0.3), cy: L.cy + (r() - 0.5) * 50,
      popT: late ? 5.35 + r() * 1.7 : 0, bloom: r() < 0.6 })
  }
  return { ...L, trunks }
})
const camX = t => 1000 * inOutSine(prog(t, 4.7, 7.8))
const walkerX = t => lerp(230, 540, inOutSine(prog(t, 4.9, 7.75))) - 110 * inOutSine(prog(t, ...T.walk2))
const WALKER_S = 0.95
const LAND = { x: 660, y: GROUND }

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 150px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "bold 60px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [back, face] = await Promise.all([load('card-back.png'), load('card-profile-6.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 40) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('ATLANTA, GA', LEAF), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.turn, T.turnOut]]
  const H0 = popText(root, 'Atlanta: | a city in a | *forest.*', { top: 190, size: 118, accentSize: 210, at: T.hook, gap: 0.08, late: 1, lateAt: T.hookLate, wobble: true, accentColor: LEAF, lineHeight: 1.0 })
  const H1 = popText(root, 'So many | *trees.*', { top: 210, size: 150, accentSize: 200, at: T.many, gap: 0.1, late: 1, lateAt: T.manyLate, wobble: true, accentColor: LEAF, lineHeight: 0.98 })
  const H2 = popText(root, 'So hard to find | *the* *one.*', { top: 210, size: 112, accentSize: 176, at: T.one, gap: 0.08, late: 2, lateAt: T.oneLate, lateGap: 0.12, wobble: true, accentColor: PINK })
  const H3 = popText(root, "Tonight's deck is | dealt from the | *stars.*", { top: 190, size: 100, accentSize: 150, at: T.turn, gap: 0.07, late: 1, lateAt: T.turnLate, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H4 = popText(root, 'Card first. | *Face* *last.*', { top: 200, size: 136, accentSize: 176, at: T.chart, gap: 0.1, late: 2, lateAt: T.chartLate, lateGap: 0.12, wobble: true, accentColor: TEAL, lineHeight: 0.98 })
  const H5 = popText(root, 'Find your one | *in* *the* *forest.*', { top: 210, size: 116, accentSize: 150, at: T.end, gap: 0.08, late: 3, lateAt: T.endLate, lateGap: 0.1, wobble: true, accentColor: LEAF })
  const HEADS = [[H0, T.hookOut], [H1, T.manyOut], [H2, T.oneOut], [H3, T.turnOut], [H4, T.chartOut], [H5, T.endOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const descK = t => ease.inOutCubic(prog(t, ...T.descend))

  // ── 1: hook
  function drawHook(t) {
    const dk = descK(t)
    if (dk >= 1) return
    x.save(); x.translate(0, -1920 * dk)
    // skyline springing up tower by tower
    TOWERS.forEach((b, i) => {
      const k = pop01(t, T.sky + Math.abs(b.x - 540) * 0.0008 + (i % 3) * 0.03, 0.42, 1.6)
      if (k <= 0) return
      const h = b.h * k
      x.save(); x.translate(0, HZ)
      towerPath(x, b, h); x.fillStyle = '#140c2e'; x.fill()
      x.save(); x.clip()
      for (let wy = -h + 20; wy < -10; wy += 24) for (let wx = b.x + 8; wx < b.x + b.w - 9; wx += 16) {
        const lit = noise1(wx * 0.37 + wy * 0.21, 4 + b.seed)
        if (lit > 0.5) { x.fillStyle = rgba('#ffd98a', 0.55 * (0.7 + 0.3 * noise1(t * 0.7 + wx, wy))); x.fillRect(wx, wy, 6, 10) }
      }
      x.restore()
      towerPath(x, b, h); x.strokeStyle = rgba(VIOLET, 0.85); x.lineWidth = 3.5; x.shadowColor = VIOLET; x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0
      x.restore()
    })
    // the canopy grows over it, row by row (back → front)
    const bloom = prog(t, T.bloom, T.bloom + 1.2)
    for (const tr of HOOK_TREES) {
      const k = pop01(t, tr.t0, 0.5, 2.0)
      if (k <= 0) continue
      const sway = 4 * Math.sin(t * 1.3 + tr.seed)
      const cyK = lerp(tr.base, tr.cy, k)
      x.beginPath(); x.moveTo(tr.x, tr.base); x.lineTo(tr.x + sway * 0.3, cyK)
      ink(x, '#a994e0', { w: tr.R * 0.18, fa: 0, glow: 6 })
      crown(x, tr.x + sway, cyK, tr.R, tr.seed, PAL[tr.pal], { k: clamp(k, 0, 1.2), bloom: tr.row > 0 ? bloom : 0, t, lw: tr.row > 2 ? 7 : 5 })
      sparkle(x, tr.x, tr.cy, t, tr.t0 + 0.15, { n: 6, R: tr.R * 1.3, seed: tr.seed, size: 20, cols: [LEAF, '#fff3e0', PINK] })
    }
    x.restore()
  }

  // ── 2–5: the forest floor
  function drawLayer(L, t, cam, dy, part, bloomK) {
    for (const tr of L.trunks) {
      const sx = tr.wx - cam * L.pf
      if (sx < -260 || sx > 1340) continue
      const k = tr.popT ? pop01(t, tr.popT, 0.4, 2.0) : 1
      if (k <= 0) continue
      const top = lerp(GROUND, tr.cy, k), sway = 3 * Math.sin(t * 1.2 + tr.seed)
      if (part === 'trunk') {
        x.save(); x.translate(0, dy); x.globalAlpha = L.a
        const w0 = L.w, w1 = L.w * 0.7
        x.beginPath(); x.moveTo(sx - w0 / 2, GROUND); x.lineTo(sx - w1 / 2 + sway, top); x.lineTo(sx + w1 / 2 + sway, top); x.lineTo(sx + w0 / 2, GROUND); x.closePath()
        x.fillStyle = '#1a1030'; x.fill()
        ink(x, L.col, { w: L.pf > 0.9 ? 6 : 4, fa: 0.12, fill: L.col, glow: 8 })
        // a little bark
        if (L.pf > 0.6) {
          x.strokeStyle = rgba(L.col, 0.4); x.lineWidth = 3
          for (let b = 0; b < 3; b++) { const by = lerp(GROUND - 80, top + 60, (b + 0.5) / 3); x.beginPath(); x.moveTo(sx - w0 * 0.2, by); x.quadraticCurveTo(sx, by - 12, sx + w0 * 0.15, by - 4); x.stroke() }
        }
        x.restore()
        if (tr.popT) sparkle(x, sx, top + dy, t, tr.popT + 0.1, { n: 6, R: 110, seed: tr.seed, size: 18, cols: [LEAF, '#fff3e0'] })
      } else {
        x.save(); x.translate(0, dy); x.globalAlpha = L.a
        crown(x, sx + sway, top, tr.R, tr.seed, PAL[L.pal], { k: clamp(k, 0, 1.15), bloom: tr.bloom ? bloomK : 0, t, lw: L.pf > 0.9 ? 7 : 5 })
        x.restore()
      }
    }
  }

  function drawForestBack(t) {
    const dk = descK(t)
    if (dk <= 0) return null
    const dy = 1920 * (1 - dk), cam = camX(t), bloomK = prog(t, T.bloom2, T.bloom2 + 1.0)
    // floor
    x.save(); x.translate(0, dy)
    const gg = x.createLinearGradient(0, GROUND, 0, H)
    gg.addColorStop(0, '#1e1238'); gg.addColorStop(1, '#0a0618')
    x.fillStyle = gg; x.fillRect(0, GROUND, W, H - GROUND + 40)
    x.strokeStyle = LEAF; x.lineWidth = 4; x.shadowColor = LEAF; x.shadowBlur = 14
    x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); x.stroke(); x.shadowBlur = 0
    // grass tufts scroll with the front layer
    x.strokeStyle = rgba(LEAF, 0.7); x.lineWidth = 4; x.lineCap = 'round'
    for (let g = 0; g < 26; g++) {
      const gx0 = ((g * 97 - cam) % 1300 + 1300) % 1300 - 110
      for (let b = -1; b <= 1; b++) { x.beginPath(); x.moveTo(gx0 + b * 8, GROUND); x.quadraticCurveTo(gx0 + b * 12, GROUND - 14, gx0 + b * 20, GROUND - 26 + Math.abs(b) * 6); x.stroke() }
    }
    x.restore()
    for (const L of LAYERS.slice(0, 2)) { drawLayer(L, t, cam, dy, 'trunk', bloomK); drawLayer(L, t, cam, dy, 'crown', bloomK) }
    return { dy, cam, bloomK }
  }

  function drawWalker(t, dy) {
    const wx = walkerX(t), wy = GROUND + dy
    const amp = (1 - ease.inOutQuad(prog(t, ...T.stop))) + ease.inOutQuad(prog(t, T.walk2[0], T.walk2[0] + 0.25)) * (1 - ease.inOutQuad(prog(t, T.walk2[1] - 0.25, T.walk2[1])))
    const look = t > T.look && t < 10.4 ? Math.sin((t - T.look) * 4.2) * clamp((t - T.look) * 3) * (1 - prog(t, 9.9, 10.3)) : 0
    const k = pop01(t, 4.75, 0.4, 2.0)
    person(x, wx, wy, WALKER_S * k, { step: (t - 0.6) * 5.655, amp, look, col: VIOLET })
    // "?" during "the one"
    if (t > T.q - 0.1 && t < T.oneOut[1] + 0.3) {
      const out = 1 - prog(t, T.oneOut[0], T.oneOut[1] + 0.2)
      const qk = pop01(t, T.q, 0.42, 3.0)
      const qy = wy - 330 * WALKER_S - 120 + 10 * Math.sin((t - T.q) * 4)
      qmark(x, wx, qy, 1.35 * qk * out, PINK, clamp(qk * 3) * out, 8 * D2R * Math.sin((t - T.q) * 3))
      sparkle(x, wx, qy, t, T.q, { n: 10, R: 190, seed: 12, size: 26, cols: [PINK, '#fff3e0', VIOLET] })
      for (let q = 0; q < 6; q++) {
        const t0 = T.look + 0.1 + q * 0.3
        const p = prog(t, t0, t0 + 1.2)
        if (p <= 0 || p >= 1) continue
        const qx = wx + (q % 2 ? 1 : -1) * (180 + (q % 3) * 50) + 20 * Math.sin(p * 6 + q), qyy = wy - 300 - 300 * ease.outCubic(p)
        qmark(x, qx, qyy, 0.45 * easeOutBack(clamp(p * 4), 2.5), [VIOLET, BLUE, LEAF][q % 3], (1 - ease.inQuad(p)) * out)
      }
    }
    // the end: a gold figure out in the forest; a heart between them
    if (t > T.figure - 0.05) {
      const fk = pop01(t, T.figure, 0.45, 2.4)
      const pulse = 1 + 0.08 * Math.sin((t - T.figure) * 6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(LAND.x, LAND.y - 150, 0, LAND.x, LAND.y - 150, 300 * fk * pulse)
      gr.addColorStop(0, rgba(GOLD, 0.5)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(LAND.x, LAND.y - 150, 300 * fk * pulse, 0, TAU); x.fill()
      x.restore()
      person(x, LAND.x, LAND.y + dy, WALKER_S * fk, { amp: 0, look: -0.6, col: GOLD, line: '#ffe7a8', glow: 24, fa: 0.6 })
      sparkle(x, LAND.x, LAND.y - 150, t, T.figure, { n: 12, R: 200, seed: 61, size: 28 })
      const hk = pop01(t, T.heart, 0.45, 3.0)
      const hx = (wx + LAND.x) / 2, hy = GROUND - 470 + 12 * Math.sin((t - T.heart) * 3)
      heart(x, hx, hy, 1.8 * hk * (1 + 0.07 * Math.sin((t - T.heart) * 7)), PINK, clamp(hk * 3))
      sparkle(x, hx, hy, t, T.heart, { n: 14, R: 260, seed: 71, size: 30 })
    }
  }

  // ── the deck: card backs fall through the canopy like leaves and settle in a fan
  const CW = 250, CH = Math.round(250 * 2347 / 1528)
  const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 150, y: 1180 + Math.abs(i - 2) * 26, rot: (i - 2) * 10 }))
  const FALL_ORDER = [1, 3, 0, 4, 2]
  function cardPose(ci, t) {
    const k = FALL_ORDER.indexOf(ci), t0 = T.fall[k], F = FAN[ci]
    const p = prog(t, t0, t0 + T.fallDur)
    const pe = inOutSine(p)
    const sw = Math.sin(p * Math.PI * 3 + ci) * (1 - p)
    return { k, t0, p, landed: p >= 1, cx: F.x + 150 * sw + (ci - 2) * -40 * (1 - pe), cy: lerp(-320, F.y, pe), rot: F.rot + 34 * Math.sin(p * Math.PI * 3 + ci + 0.6) * (1 - p) }
  }
  function drawImg(im, cx, cy, w, h, rot, a = 1, sx = 1) {
    if (a <= 0 || !im) return
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.drawImage(im, -w / 2, -h / 2, w, h); x.restore()
  }
  /** pass 'falling' draws cards still in the air (under the front canopy), 'landed' the rest (over it) */
  function drawDeck(t, pass, dy) {
    if (t < T.fall[0] || t > T.flip[0] + 0.01) return
    for (const ci of FALL_ORDER) {
      const P = cardPose(ci, t)
      if (P.p <= 0) continue
      if ((pass === 'falling') === P.landed) continue
      let { cx, cy, rot } = P
      cy += dy
      const td = P.t0 + T.fallDur
      const land = t > td ? 0.05 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      let a = 1, sc = 1
      if (ci !== 2) {
        const o = ease.inCubic(prog(t, T.sidesOut + P.k * 0.05, T.sidesOut + P.k * 0.05 + 0.5))
        if (o >= 1) continue
        cx += (ci - 2) * 260 * o + 60 * Math.sin(o * 5); cy += 560 * o; rot += (ci - 2) * 40 * o; a = 1 - o
        drawImg(back, cx, cy, CW * (1 + land), CH * (1 - land), rot, a)
      } else {
        const g = heroGlow(t, cx, cy, rot)
        drawImg(back, g.cx, g.cy, CW * g.sc * (1 + land), CH * g.sc * (1 - land), g.rot, a)
        if (g.gk > 0) {
          x.save(); x.translate(g.cx, g.cy); x.rotate(g.rot * D2R); x.globalAlpha = g.gk * (0.55 + 0.35 * Math.sin((t - T.glow) * 6.3))
          const rw = CW * g.sc * 0.87, rh = CH * g.sc * 0.895
          x.beginPath(); x.roundRect(-rw / 2, -rh / 2, rw, rh, 20 * g.sc); ink(x, GOLD, { w: 7, fa: 0, glow: 34 })
          x.restore()
        }
      }
      sparkle(x, FAN[ci].x, FAN[ci].y - 40 + dy, t, td, { n: 8, R: 160, seed: 30 + ci, size: 24 })
    }
  }
  function heroGlow(t, cx, cy, rot) {
    const lp = easeOutBack(prog(t, T.glow, T.glow + 0.45), 1.6)
    return { cx, cy: cy - 140 * lp, sc: 1 + 0.28 * lp, rot: lerp(rot, 0, clamp(lp)), gk: clamp(prog(t, T.glow, T.glow + 0.35)) }
  }
  function drawGlowRays(t, cx, cy, gk, R0 = 470, col = GOLD, col2 = PINK) {
    if (gk <= 0) return
    const pulse = 1 + 0.08 * Math.sin((t - T.glow) * 6.3)
    x.save(); x.globalCompositeOperation = 'lighter'
    const R = R0 * gk * pulse
    const ag = x.createRadialGradient(cx, cy, 30, cx, cy, R)
    ag.addColorStop(0, rgba(col, 0.55)); ag.addColorStop(0.45, rgba(col2, 0.22)); ag.addColorStop(1, rgba(col2, 0))
    x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
    x.translate(cx, cy); x.rotate((t - T.glow) * 0.35)
    const rg = x.createRadialGradient(0, 0, 120, 0, 0, 680)
    rg.addColorStop(0, rgba('#ffd98a', 0.3 * gk)); rg.addColorStop(1, rgba('#ffd98a', 0))
    x.fillStyle = rg
    for (let r = 0; r < 12; r++) { x.rotate(TAU / 12); x.beginPath(); x.moveTo(-14, 0); x.lineTo(-40, -680); x.lineTo(40, -680); x.lineTo(14, 0); x.closePath(); x.fill() }
    x.restore()
  }
  // the glow behind the hero card (drawn before the cards)
  function drawHeroGlow(t, dy) {
    if (t < T.glow || t > T.flip[0] + 0.01) return
    const P = cardPose(2, t), g = heroGlow(t, P.cx, P.cy + dy, P.rot)
    drawGlowRays(t, g.cx, g.cy, g.gk)
    sparkle(x, g.cx, g.cy, t, T.glow + 0.1, { n: 14, R: 340, seed: 44, size: 30 })
  }
  // leaves knocked loose as each card punches through the canopy
  function drawCardLeaves(t, dy) {
    T.fall.forEach((t0, k) => {
      const ci = FALL_ORDER[k], F = FAN[ci]
      const tc = t0 + T.fallDur * 0.42
      leafBurst(x, F.x + (ci - 2) * -20, 720 + dy, t, tc, { n: 10, seed: 80 + k, R: 170 })
    })
  }
  // ambient falling leaves in the forest
  function drawAmbientLeaves(t, dy) {
    for (let i = 0; i < 12; i++) {
      const r = rng(200 + i), sp = 70 + r() * 50, ph = r() * 30
      const y = ((t * sp + ph * 60) % 1500) + 520
      const lx = (r() * 1080 + 40 * Math.sin(t * 1.3 + i) - camX(t) * 0.8 % 1080 + 2160) % 1080
      leaf(x, lx, y + dy, 0.8 + r() * 0.5, t * (r() - 0.5) * 3 + ph, LEAF_COLS[i % 5], 0.75 * clamp((1720 - y) / 200))
    }
  }

  // ── 4: the flip → mystery card on its aura, ring of glyphs
  const CARD = { cx: 540, cy: 1080, h: 820 }
  function heroCardRect(t) {
    // from the glowing card's spot to the big centred card
    const P = cardPose(2, T.flip[0]), g = heroGlow(T.flip[0], P.cx, P.cy, P.rot)
    const gp = ease.inOutCubic(prog(t, T.flip[0], T.flip[1] + 0.15))
    const h0 = CH * g.sc, h1 = CARD.h
    return { cx: lerp(g.cx, CARD.cx, gp), cy: lerp(g.cy, CARD.cy, gp), h: lerp(h0, h1, gp), rot: lerp(g.rot, 0, gp) }
  }
  function drawMystery(t, dy) {
    if (t < T.flip[0] || t > T.starFall[1] + 0.05) return
    const R = heroCardRect(t)
    const fp = prog(t, ...T.flip)
    const sx = Math.abs(Math.cos(Math.PI * fp))
    const showFace = fp >= 0.5
    const after = ease.outCubic(prog(t, T.flip[0] + 0.25, T.flip[1] + 0.3))
    const sh = prog(t, ...T.shrink), shE = ease.inCubic(sh)
    const fallP = prog(t, ...T.starFall)
    const bob = 8 * Math.sin((t - T.flip[1]) * 2.2) * clamp((t - T.flip[1]) * 2)
    const cy = R.cy + dy + bob
    // aura + rays
    const auraK = (showFace ? after : 1 - fp * 2) * (1 - shE)
    if (!showFace) drawGlowRays(t, R.cx, cy, 1 - fp)
    else drawGlowRays(t, R.cx, cy, auraK * 1.25, 560, TEAL, '#7c74f0')
    // ring of glyphs
    const RR = 470
    if (showFace && sh < 1) {
      const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * (1 - shE)
      if (ringK > 0) { x.save(); x.strokeStyle = rgba(BONE, 0.4 * ringK); x.lineWidth = 3; x.shadowColor = BONE; x.shadowBlur = 10; x.beginPath(); x.arc(R.cx, cy, RR * (1 - 0.6 * shE), 0, TAU); x.stroke(); x.restore() }
      x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 64px ${GLYPH_FONT}`
      SIGNS.forEach((s, i) => {
        const k = pop01(t, T.ring + i * 0.05, 0.36) * (1 - shE)
        if (k <= 0) return
        const a = (i * 30 + 15) * D2R + (t - T.ring) * 0.2
        const px = R.cx + Math.cos(a) * RR * (1 - 0.6 * shE), py = cy + Math.sin(a) * RR * (1 - 0.6 * shE)
        x.save(); x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(k * 2)
        x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
      })
      x.restore()
    }
    // the card itself (flipping, then shrinking + spinning into a star)
    if (sh < 1) {
      const ss = 1 - shE
      const im = showFace ? face : back
      const h = R.h * ss, w = h * (showFace && face ? face.width / face.height : 1528 / 2347)
      const land = t > T.flip[1] ? 0.04 * Math.exp(-(t - T.flip[1]) * 7) * Math.cos((t - T.flip[1]) * 24) : 0
      drawImg(im, R.cx, cy, w * (1 + land), h * (1 - land), R.rot + 200 * shE, sh > 0.85 ? 1 - (sh - 0.85) / 0.15 : 1, Math.max(0.02, sx))
    }
    sparkle(x, R.cx, cy, t, T.flip[1] - 0.05, { n: 16, R: 420, seed: 52, size: 32, cols: [TEAL, GOLD, '#fff3e0', VIOLET] })
    // the star: falls in an arc into the forest, where the gold figure appears
    if (sh > 0.6) {
      const fe = ease.inOutCubic(fallP)
      const tx = LAND.x, ty = LAND.y - 150 + dy
      const px = lerp(R.cx, tx, fe), py = lerp(cy, ty, ease.inCubic(fallP)) - 180 * Math.sin(Math.PI * fallP)
      const sz = Math.round((44 + 18 * Math.sin(t * 12)) / 4) * 4
      x.save(); x.globalAlpha = clamp((sh - 0.6) * 4) * (1 - prog(fallP, 0.92, 1))
      x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(px, py, 0, px, py, 130)
      gr.addColorStop(0, rgba(GOLD, 0.85)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(px, py, 130, 0, TAU); x.fill()
      x.globalCompositeOperation = 'source-over'
      drawPixelStar(x, px, py, sz, 0, '#fff3d0')
      x.restore()
      for (let k = 1; k < 7 && fallP > 0 && fallP < 1; k++) {
        const fq = prog(t - k * 0.045, ...T.starFall)
        if (fq <= 0) break
        const qx = lerp(R.cx, tx, ease.inOutCubic(fq)), qy = lerp(cy, ty, ease.inCubic(fq)) - 180 * Math.sin(Math.PI * fq)
        x.save(); x.globalAlpha = (1 - k / 7) * 0.9; drawPixelStar(x, qx, qy, 12, k % 3, k % 2 ? GOLD : PINK); x.restore()
      }
    }
  }

  // fireflies at the end
  function drawFireflies(t) {
    const k = prog(t, T.figure, T.figure + 0.8)
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 18; i++) {
      const r = rng(500 + i)
      const fx = r() * 1080 + 40 * Math.sin(t * (0.6 + r()) + i), fy = 1000 + r() * 650 + 30 * Math.sin(t * (0.8 + r()) + i * 2)
      const tw = 0.5 + 0.5 * Math.sin(t * (2 + r() * 3) + i)
      const gr = x.createRadialGradient(fx, fy, 0, fx, fy, 26)
      gr.addColorStop(0, rgba('#ffe7a8', 0.9 * tw * k)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(fx, fy, 26, 0, TAU); x.fill()
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.sceneOut[1]) {
        const sa = outK(t, T.sceneOut)
        x.save(); x.globalAlpha = sa
        drawHook(t)
        const F = drawForestBack(t)
        if (F) {
          const { dy, cam, bloomK } = F
          drawHeroGlow(t, dy)
          drawWalker(t, dy)
          drawLayer(LAYERS[2], t, cam, dy, 'trunk', bloomK)
          drawDeck(t, 'falling', dy)
          drawLayer(LAYERS[2], t, cam, dy, 'crown', bloomK)
          drawCardLeaves(t, dy)
          drawAmbientLeaves(t, dy)
          drawDeck(t, 'landed', dy)
          drawMystery(t, dy)
          drawFireflies(t)
          // leaves rush past during the descent
          if (t > T.descend[0] && t < T.descend[1] + 0.4) for (let i = 0; i < 16; i++) {
            const r = rng(300 + i), p = prog(t, T.descend[0] + r() * 0.2, T.descend[1] + 0.2 + r() * 0.2)
            if (p <= 0 || p >= 1) continue
            leaf(x, r() * 1080, lerp(2100, -200, p), 1.4 + r(), r() * 6 + p * 8, LEAF_COLS[i % 4], 0.9)
          }
        }
        x.restore()
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound (pitched SFX are shifted into the film's key by the sound engine)
const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const latePops = (t0, n, gap, freqs, gain = 0.05) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), freqs[i % freqs.length], gain, (i - (n - 1) / 2) * 0.2])
const trunkPops = (() => {
  const ts = []
  LAYERS.forEach((L, li) => L.trunks.forEach(tr => { if (tr.popT && tr.popT < 7.2) ts.push([tr.popT, li]) }))
  ts.sort((a, b) => a[0] - b[0])
  const out = []
  let last = -1
  for (const [s, li] of ts) { if (s - last < 0.14) continue; last = s; out.push(['pop', r3(s + 0.05), NOTE[(out.length * 3) % NOTE.length] * (li === 2 ? 0.5 : 1), 0.022, ((out.length % 3) - 1) * 0.4]) }
  return out
})()
export const CUES = [
  // hook: skyline + canopy grows
  ['glitter', 0.15, 0.9], ...wordPops(T.hook, 5, 0.08, 0, 0.026),
  ['pluck', T.hookLate, 880, 0.05, 0.7, 0], ['pop', T.hookLate, 1046.5, 0.055, 0],
  ...[0.6, 0.9, 1.2, 1.5, 1.95].map((s, i) => ['pluck', r3(s + 0.1), [392, 523.25, 587.33, 659.25, 783.99][i], 0.03, 0.5, ((i % 2) - 0.5) * 0.6]),
  ['glitter', T.bloom, T.bloom + 1.0], ['bell', T.bloom + 0.1, 1567.98, 0.025, 1.5, 0.3],
  // descend
  ['whoosh', T.descend[0] - 0.1, 0.8, 0.05],
  // so many trees
  ...wordPops(T.many, 2, 0.1, 2, 0.026), ['pluck', T.manyLate, 783.99, 0.05, 0.6, 0], ['pop', T.manyLate, 1174.66, 0.05, 0],
  ...trunkPops,
  ...[10, 11, 12].map(n => ['tick', r3(BEAT(n)), 0.022]),
  // the one
  ...wordPops(T.one, 4, 0.08, 1, 0.025), ...latePops(T.oneLate, 2, 0.12, [880, 1174.66], 0.05), ['pluck', T.oneLate, 659.25, 0.04, 0.6, 0],
  ['pluck', T.q, 1046.5, 0.05, 0.5, 0], ['pop', T.q, 1318.51, 0.05, 0], ['glitter', T.q, T.q + 0.5],
  ...[0, 1, 2, 3, 4, 5].map(k => ['pop', r3(T.look + 0.12 + k * 0.3), [880, 987.77, 1046.5, 1174.66, 987.77, 880][k], 0.02, k % 2 ? 0.4 : -0.4]),
  // deck through the canopy
  ['riser', 9.7, T.turn, 0.035],
  ...wordPops(T.turn, 6, 0.07, 2, 0.024), ['pluck', T.turnLate, 1046.5, 0.05, 0.7, 0], ['pop', T.turnLate, 1567.98, 0.045, 0],
  ...T.fall.map(s => ['whoosh', r3(s + 0.4), 0.5, 0.025]),
  ...T.fall.map((s, i) => ['tick', r3(s + T.fallDur * 0.42), 0.03]),
  ...T.fall.map((s, i) => ['pop', r3(s + T.fallDur), [523.25, 587.33, 659.25, 783.99, 880][i], 0.045, ((i % 2) - 0.5) * 0.4]),
  ['bell', T.glow, 1046.5, 0.05, 2.0, 0], ['bell', r3(T.glow + 0.07), 1567.98, 0.03, 2.0, 0.2], ['glitter', T.glow, r3(T.glow + 0.8)],
  // flip → mystery card
  ['whoosh', T.sidesOut, 0.5, 0.035], ['whoosh', T.flip[0], 0.4, 0.04], ['boom', r3(T.flip[1] - 0.05), 0.1],
  ['bell', T.flip[1], 783.99, 0.05, 2.0, 0], ['bell', r3(T.flip[1] + 0.08), 1174.66, 0.035, 2.0, -0.2],
  ...wordPops(T.chart, 2, 0.1, 0, 0.028), ...latePops(T.chartLate, 2, 0.12, [880, 1046.5], 0.055), ['pluck', T.chartLate, 659.25, 0.045, 0.6, 0],
  ['glitter', T.ring, T.ring + 0.7], ...SIGNS.map((_, i) => ['tick', r3(T.ring + i * 0.05), 0.012]),
  // star falls into the forest; the meet
  ['whoosh', T.shrink[0], 0.5, 0.04], ['glitter', T.starFall[0], T.starFall[1]],
  ...wordPops(T.end, 3, 0.08, 0, 0.026), ...latePops(T.endLate, 3, 0.1, [783.99, 880, 1046.5], 0.045), ['pluck', T.endLate, 659.25, 0.04, 0.6, 0],
  ['bell', T.figure, 783.99, 0.05, 1.8, 0], ['bell', r3(T.figure + 0.08), 1174.66, 0.035, 1.8, 0.2], ['pop', T.figure, 1046.5, 0.045, 0],
  ...[0, 1, 2, 3].map(k => ['tick', r3(T.walk2[0] + 0.1 + k * 0.28), 0.02]),
  ['bell', T.heart, 1046.5, 0.05, 2.2, 0], ['pop', T.heart, 1318.51, 0.05, 0], ['glitter', T.heart, r3(T.heart + 0.9)],
  ['glitter', T.bloom2, T.bloom2 + 1.0], ['pluck', r3(T.bloom2 + 0.1), 1567.98, 0.025, 0.8, 0.3],
]
