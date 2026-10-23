// twelvesigns (60 s, vertical): "All 12 signs in 60 seconds."
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). Each sign owns 8 beats (≈4.44 s, two bars).
//   0.00–0.40  fade up; the title pops word by word from 0.12; 12 glyphs EXPLODE out of a stopwatch on beat 0 (0.60)
//   1.10       small note "Dates shift a day some years."
//   3.38 + 4.444·i  sign i (♈ → ♓) lands on its downbeat. Each one arrives with its own full-screen wipe in the sign colour
//              (slash · iris · twin slide · wave · starburst · blinds · pendulum swing · keyhole · arrow · peaks · pixels · bubbles),
//              then: glyph sticker bounces in (beat 0), name, date pill (beat 1), prop (beat 2), quip (beat 3), prop gag (beats 4–6)
//   56.72      "Tag your sign." (Pisces spins away) + all 12 glyphs raining down
//   59.30–60   fade to black (last frame black)
// One canvas, everything drawn on it (so wipes can clip whole scenes), moon on top, grain overlay, black div.
import { clamp, lerp, prog, ease, rng, C } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar, drawMoon } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { B, BONE, GOLD, VOID, tint, hexA, ink, pistol, snacks, tabs, house, stage, sheet, scales, keyhole, backpack, peak, bulb, fishes } from './props.js'

export const DURATION = 60
const beat = n => 0.6 + n * B
const TAU = Math.PI * 2
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', serif"
const MONO = "'Space Mono', monospace"
const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const VS = '︎'
const SHADOW = 'rgba(11,6,32,0.9)'

// ── timeline
const S = SIGNS.map((_, i) => beat(5 + 8 * i))         // sign downbeats
const E0 = beat(101)                                     // end line downbeat (56.72)
const T_OUT = 59.3, T_END = 60.0
const KIND = ['slash', 'iris', 'twin', 'wave', 'star', 'blinds', 'swing', 'keyhole', 'arrow', 'peaks', 'pixels', 'bubbles', 'spin']
const DUR = { slash: 0.4, iris: 0.42, twin: 0.4, wave: 0.46, star: 0.44, blinds: 0.44, swing: 0.55, keyhole: 0.46, arrow: 0.36, peaks: 0.48, pixels: 0.5, bubbles: 0.5, spin: 0.55 }
// layer k: 0 = hook, 1..12 = signs, 13 = end. WIPE[k] = when layer k starts covering layer k-1 (its midpoint lands on the beat)
const WIPE = [0, ...S.map((s, i) => s - DUR[KIND[i]] * 0.5), E0 - DUR.spin * 0.5]

// ── copy
const INFO = [
  { dates: 'MAR 21 – APR 19', quip: ['Goes', 'first.', '\n', 'Asks', 'questions', { w: 'later.' }], acc: '#ffd36b', prop: pistol },
  { dates: 'APR 20 – MAY 20', quip: ['Comfort', 'is', 'a', '\n', { w: 'lifestyle.' }], acc: '#fff0c2', prop: snacks },
  { dates: 'MAY 21 – JUN 20', quip: ['Forty', 'tabs', 'open.', '\n', 'All', { w: 'important.' }], acc: '#fff4b8', prop: tabs },
  { dates: 'JUN 21 – JUL 22', quip: ['Home', 'is', 'the', 'whole', '\n', { w: 'personality.' }], acc: '#bfeaff', prop: house },
  { dates: 'JUL 23 – AUG 22', quip: [{ w: 'Main character' }, '\n', 'energy.'], acc: '#ffe08a', prop: stage },
  { dates: 'AUG 23 – SEP 22', quip: ['Has', 'a', { w: 'spreadsheet' }, '\n', 'for', 'that.'], acc: '#ffc2d8', prop: sheet },
  { dates: 'SEP 23 – OCT 22', quip: ['Can’t', 'pick', 'a', 'restaurant.', '\n', 'Looks', { w: 'great' }, 'deciding.'], acc: '#ffc8f4', prop: scales },
  { dates: 'OCT 23 – NOV 21', quip: ['Already', 'knows', '\n', 'your', { w: 'secret.' }], acc: '#ffb3c3', prop: keyhole },
  { dates: 'NOV 22 – DEC 21', quip: ['Packed', 'a', 'bag', '\n', { w: 'mid-sentence.' }], acc: '#e0c8ff', prop: backpack },
  { dates: 'DEC 22 – JAN 19', quip: ['Five-year', 'plan.', '\n', 'Since', 'age', { w: 'five.' }], acc: '#b5f5df', prop: peak },
  { dates: 'JAN 20 – FEB 18', quip: ['Liked', 'it', 'before', '\n', 'it', 'was', { w: 'cool.' }], acc: '#c4f1ff', prop: bulb },
  { dates: 'FEB 19 – MAR 20', quip: ['Cries', 'at', 'commercials.', '\n', { w: 'Lovingly.' }], acc: '#d6d2ff', prop: fishes },
]

// ── layout
const L = { eyeY: 178, nameY: 352, pillY: 440, gx: 540, gy: 735, gR: 200, propY: 1190, quipTop: 1530 }

// ── sparkles (pixel-star bursts)
const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ── canvas word pops. items: string | '\n' | { w, col?, accent? (default true: EB Garamond italic) }
function words(ctx, items, { cx = 540, top, size = 62, weight = 700, accSize = Math.round(size * 1.12), lh = 1.14, col = BONE, accCol = GOLD }, t, t0, { step = 0.07, dur = 0.28, back = 1.9, wobbleLast = false } = {}) {
  const lines = [[]]
  for (const it of items) { if (it === '\n') lines.push([]); else lines.at(-1).push(it) }
  const gap = size * 0.26
  let k = 0
  lines.forEach((ln, li) => {
    const ws = ln.map(it => {
      const o = typeof it === 'object', acc = o && it.accent !== false
      const font = acc ? `italic 500 ${accSize}px ${SERIF}` : `${weight} ${size}px ${INTER}`
      ctx.font = font; ctx.letterSpacing = acc ? '0px' : `${-0.02 * size}px`
      return { txt: o ? it.w : it, font, ls: ctx.letterSpacing, col: o ? (it.col || accCol) : col, w: ctx.measureText(o ? it.w : it).width, acc }
    })
    const total = ws.reduce((a, w) => a + w.w, 0) + gap * (ws.length - 1)
    let x = cx - total / 2
    const base = top + size * lh * li + size * 0.86
    ws.forEach(w => {
      const i = k++, a = t0 + i * step
      const p = prog(t, a, a + dur)
      if (p > 0) {
        const sc = lerp(0.6, 1, easeOutBack(p, back)), tt = t - a
        const rot = wobbleLast && i === lines.flat().length - 1 && tt > 0 ? 0.16 * Math.exp(-tt * 4) * Math.sin(tt * 18) : 0
        ctx.save(); ctx.translate(x + w.w / 2, base - size * 0.32 + lerp(30, 0, ease.outCubic(p))); ctx.rotate(rot); ctx.scale(sc, sc)
        ctx.globalAlpha *= Math.min(1, p * 3)
        ctx.font = w.font; ctx.letterSpacing = w.ls; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
        ctx.shadowColor = SHADOW; ctx.shadowBlur = 28; ctx.shadowOffsetY = 4
        if (w.acc || w.col !== col) { ctx.shadowColor = hexA(w.col.length === 7 ? w.col : '#000000', 0.45); ctx.shadowBlur = 26; ctx.shadowOffsetY = 0; ctx.fillStyle = w.col; ctx.fillText(w.txt, 0, size * 0.32); ctx.shadowColor = SHADOW; ctx.shadowBlur = 24; ctx.shadowOffsetY = 4 }
        ctx.fillStyle = w.col; ctx.fillText(w.txt, 0, size * 0.32)
        ctx.restore()
      }
      x += w.w + gap
    })
  })
  ctx.letterSpacing = '0px'
}
function mono(ctx, txt, x, y, size, col, a = 1, ls = 0.25) {
  if (a <= 0.003) return
  ctx.save(); ctx.globalAlpha *= a; ctx.font = `700 ${size}px ${MONO}`; ctx.letterSpacing = `${size * ls}px`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = SHADOW; ctx.shadowBlur = 16; ctx.fillStyle = col; ctx.fillText(txt, x + size * ls / 2, y); ctx.restore()
}
function glyphText(ctx, g, size, col, { outline = 0 } = {}) {
  ctx.font = `bold ${size}px ${GLYPH}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if (outline) { ctx.lineJoin = 'round'; ctx.lineWidth = outline; ctx.strokeStyle = hexA(VOID, 0.55); ctx.strokeText(g + VS, 0, size * 0.04) }
  ctx.shadowColor = col; ctx.shadowBlur = 30; ctx.fillStyle = col; ctx.fillText(g + VS, 0, size * 0.04); ctx.shadowBlur = 0
}

// ── the glyph's entrance, different per sign (u = seconds since the downbeat)
function glyphPose(i, u) {
  const p = prog(u, -0.05, 0.4), e = easeOutBack(p, 2.0), w = (a, f = 16, k = 5) => u > 0.3 ? a * Math.exp(-(u - 0.3) * k) * Math.sin((u - 0.3) * f) : 0
  const P = { dx: 0, dy: 0, s: 1, sx: 1, sy: 1, rot: 0, a: 1, twin: 0 }
  switch (i) {
    case 0: P.dy = lerp(900, 0, e); P.sy = 1 + 0.35 * (1 - p) + w(0.12); P.sx = 1 / P.sy; break                                   // rocket up
    case 1: { const f = ease.inQuad(prog(u, -0.1, 0.22)); P.dy = lerp(-900, 0, f); const sq = u > 0.22 ? 0.3 * Math.exp(-(u - 0.22) * 6) * Math.cos((u - 0.22) * 18) : 0; P.sx = 1 + sq; P.sy = 1 - sq; break }  // drop + squash
    case 2: P.twin = 1 - ease.outCubic(prog(u, -0.05, 0.35)); P.s = e; break                                                       // twins merge
    case 3: P.dy = lerp(600, 0, e); P.rot = w(0.25, 10, 3); break                                                                    // bob up
    case 4: P.s = e; P.rot = (1 - ease.outCubic(p)) * -TAU; break                                                                    // spin
    case 5: P.s = lerp(2.4, 1, ease.inQuad(prog(u, -0.1, 0.18))) + w(0.08, 30, 8); P.a = prog(u, -0.1, 0.05); break                 // slam
    case 6: P.rot = u < 0.05 ? -1.0 : -1.0 * Math.exp(-(u - 0.05) * 4) * Math.cos((u - 0.05) * 11); P.pivot = -520; break        // pendulum
    case 7: P.s = e; P.rot = lerp(-1.2, 0, ease.outCubic(p)); break                                                                 // zoom twist
    case 8: P.dx = lerp(-1100, 0, ease.outCubic(prog(u, -0.1, 0.25))) + w(30, 20, 6); P.sx = 1 + 0.4 * (1 - prog(u, -0.1, 0.3)) + w(0.1, 20, 6); break // arrow in
    case 9: { const st = Math.min(3, Math.floor(prog(u, -0.1, 0.35) * 4)); P.dy = lerp(500, 0, easeOutBack(st / 3, 1.5)); P.s = 0.6 + 0.4 * (st / 3) + w(0.06); break } // climb in steps
    case 10: P.a = u < 0 ? 0 : u < 0.06 ? 1 : u < 0.12 ? 0.2 : u < 0.17 ? 1 : u < 0.21 ? 0.3 : 1; P.s = lerp(0.85, 1, easeOutBack(prog(u, 0.17, 0.45), 3)); break // flicker on
    case 11: P.dy = lerp(700, 0, ease.outCubic(prog(u, -0.1, 0.5))); P.rot = 0.25 * Math.sin(u * 5) * Math.exp(-u * 1.2) + 0.04 * Math.sin(u * 2); break // float
  }
  return P
}

// ── wipe masks (path on ctx, p 0→1 covers the screen). Returns an edge-stroke callback.
const PIX = (() => { const r = rng(4242), o = []; for (let gy = 0; gy < 18; gy++) for (let gx = 0; gx < 10; gx++) { const x = gx * 108 + 54, y = gy * 108 + 54; o.push({ x, y, d: Math.hypot(x - 540, y - 735) / 1300 * 0.62 + r() * 0.14 }) } return o })()
const BUB = (() => { const r = rng(777), o = []; for (let gy = 0; gy < 8; gy++) for (let gx = 0; gx < 5; gx++) { const x = gx * 270 + (gy % 2) * 135 - 40 + (r() - 0.5) * 60, y = gy * 280 - 20 + (r() - 0.5) * 60; o.push({ x, y, d: (1 - y / H) * 0.45 + r() * 0.12, R: 250 + r() * 60 }) } return o })()
function maskPath(ctx, kind, p) {
  ctx.beginPath()
  switch (kind) {
    case 'slash': { const D = lerp(-950, 1150, ease.inOutCubic(p)); ctx.moveTo(-60, -60); ctx.lineTo(D - 27, -60); ctx.lineTo(D + 890, 1980); ctx.lineTo(-60, 1980); ctx.closePath(); return () => { ctx.beginPath(); ctx.moveTo(D - 27, -60); ctx.lineTo(D + 890, 1980) } }
    case 'iris': { const R = 2300 * ease.inOutQuad(p); ctx.arc(540, 1190, R, 0, TAU); return () => { ctx.beginPath(); ctx.arc(540, 1190, R, 0, TAU) } }
    case 'wave': { const Y = lerp(H + 140, -160, ease.inOutQuad(p)), f = x => Y + 60 * Math.sin(x / 110 + p * 14); ctx.moveTo(-20, H + 20); for (let x = -20; x <= W + 20; x += 20) ctx.lineTo(x, f(x)); ctx.lineTo(W + 20, H + 20); ctx.closePath(); return () => { ctx.beginPath(); for (let x = -20; x <= W + 20; x += 20) x === -20 ? ctx.moveTo(x, f(x)) : ctx.lineTo(x, f(x)) } }
    case 'star': { const R = 2500 * ease.inOutQuad(p), rot = p * 1.6, n = 12; const draw = () => { for (let k = 0; k < n * 2; k++) { const a = rot + (k / (n * 2)) * TAU, r = k % 2 ? R * 0.6 : R; k ? ctx.lineTo(540 + Math.cos(a) * r, L.gy + Math.sin(a) * r) : ctx.moveTo(540 + Math.cos(a) * r, L.gy + Math.sin(a) * r) } ctx.closePath() }; draw(); return () => { ctx.beginPath(); draw() } }
    case 'blinds': { const n = 12, h = H / n; const draw = () => { for (let k = 0; k < n; k++) { const q = ease.outCubic(prog(p, k * 0.05, k * 0.05 + 0.45)), hh = h * q; if (hh > 0) ctx.rect(k % 2 ? W * (1 - q) : 0, k * h, W * q + 1, h + 1) } }; draw(); return () => { ctx.beginPath(); for (let k = 0; k < n; k++) { const q = ease.outCubic(prog(p, k * 0.05, k * 0.05 + 0.45)); if (q > 0 && q < 1) { const x = k % 2 ? W * (1 - q) : W * q; ctx.moveTo(x, k * h); ctx.lineTo(x, k * h + h) } } } }
    case 'keyhole': { const k = 6200 * ease.inCubic(p), cx = 540, cy = 1000; const draw = () => { ctx.arc(cx, cy - 0.35 * k, 0.5 * k, 0, TAU); ctx.moveTo(cx - 0.22 * k, cy - 0.2 * k); ctx.lineTo(cx + 0.22 * k, cy - 0.2 * k); ctx.lineTo(cx + 0.5 * k, cy + 0.9 * k); ctx.lineTo(cx - 0.5 * k, cy + 0.9 * k); ctx.closePath() }; draw(); return () => { ctx.beginPath(); ctx.arc(cx, cy - 0.35 * k, 0.5 * k, Math.PI * 0.62, Math.PI * 2.38); ctx.lineTo(cx + 0.5 * k, cy + 0.9 * k); ctx.lineTo(cx - 0.5 * k, cy + 0.9 * k); ctx.closePath() } }
    case 'arrow': { const X = lerp(-120, 2000, ease.inQuad(p)); ctx.moveTo(-60, -60); ctx.lineTo(X - 700, -60); ctx.lineTo(X, 960); ctx.lineTo(X - 700, 1980); ctx.lineTo(-60, 1980); ctx.closePath(); return () => { ctx.beginPath(); ctx.moveTo(X - 700, -60); ctx.lineTo(X, 960); ctx.lineTo(X - 700, 1980) } }
    case 'peaks': { const Y = lerp(H + 420, -120, ease.inOutCubic(p)), pts = []; for (let k = 0; k <= 9; k++) pts.push([-60 + k * 150, Y - (k % 2 ? 380 : 0) - (k % 4 === 1 ? 120 : 0)]); ctx.moveTo(-60, H + 60); pts.forEach(q => ctx.lineTo(...q)); ctx.lineTo(W + 80, H + 60); ctx.closePath(); return () => { ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(...q) : ctx.moveTo(...q)) } }
    case 'pixels': { const draw = () => { for (const c of PIX) { const q = clamp(easeOutBack(prog(p, c.d, c.d + 0.2), 1.6), 0, 1.15), s = 110 * q; if (s > 0) ctx.rect(c.x - s / 2, c.y - s / 2, s, s) } }; draw(); return () => { ctx.beginPath(); for (const c of PIX) { const q = prog(p, c.d, c.d + 0.2); if (q > 0 && q < 1) { const s = 110 * q; ctx.rect(c.x - s / 2, c.y - s / 2, s, s) } } } }
    case 'bubbles': { const draw = () => { for (const b of BUB) { const q = easeOutBack(prog(p, b.d, b.d + 0.4), 1.4), r = b.R * Math.max(0, q); if (r > 0) { ctx.moveTo(b.x + r, b.y); ctx.arc(b.x, b.y, r, 0, TAU) } } }; draw(); return () => { ctx.beginPath(); for (const b of BUB) { const q = prog(p, b.d, b.d + 0.4); if (q > 0 && q < 1) { const r = b.R * easeOutBack(q, 1.4); ctx.moveTo(b.x + r, b.y); ctx.arc(b.x, b.y, r, 0, TAU) } } } }
  }
  return () => ctx.beginPath()
}

// ── raining glyphs at the end
const RAIN = (() => { const r = rng(9090), o = []; for (let i = 0; i < 44; i++) { const s = SIGNS[i % 12]; o.push({ g: s.glyph, col: s.color, x: 60 + r() * 960, d: (i / 44) * 2.3 + r() * 0.15, v: 250 + r() * 350, size: 80 + r() * 70, spin: (r() - 0.5) * 4, ph: r() * 6.28 }) } return o })()
// ── the hook: glyphs explode out of the stopwatch to a ring
const HOOK_C = { x: 540, y: 1080 }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  await Promise.all([`800 108px Inter`, `900 100px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 1 })
  const SKY = { ...SKY_H, moon: null }

  // ───────── layers
  function hook(t) {
    drawSky(x, t, SKY)
    const T0 = beat(0)
    // stopwatch
    const sw = easeOutBack(prog(t, 0.05, 0.45), 2.2)
    if (sw > 0.01) {
      const kick = t > T0 ? 0.18 * Math.exp(-(t - T0) * 6) * Math.sin((t - T0) * 22) : 0
      x.save(); x.translate(HOOK_C.x, HOOK_C.y); x.scale(sw * (1 + kick), sw * (1 - kick))
      const g = x.createRadialGradient(0, 0, 10, 0, 0, 330); g.addColorStop(0, hexA(GOLD, 0.25)); g.addColorStop(1, hexA(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, 330, 0, TAU); x.fill()
      x.beginPath(); x.arc(0, 0, 165, 0, TAU); ink(x, GOLD, { w: 10, fa: 0.18 })
      x.beginPath(); x.roundRect(-30, -232, 60, 44, 10); ink(x, GOLD, { w: 8, fa: 0.3 })
      x.beginPath(); x.moveTo(0, -188); x.lineTo(0, -168); ink(x, GOLD, { w: 10, fa: 0 })
      x.beginPath(); for (let k = 0; k < 12; k++) { const a = k * TAU / 12; x.moveTo(Math.cos(a) * 128, Math.sin(a) * 128); x.lineTo(Math.cos(a) * 146, Math.sin(a) * 146) } ink(x, GOLD, { w: 6, fa: 0, glow: 8 })
      x.font = `900 92px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.shadowColor = SHADOW; x.shadowBlur = 20; x.fillText('60', 0, 8); x.shadowBlur = 0
      const ha = -Math.PI / 2 + Math.max(0, t - 0.3) * TAU * 0.9
      x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 112, Math.sin(ha) * 112); ink(x, '#f0603a', { w: 8, fa: 0, glow: 14 })
      x.beginPath(); x.arc(0, 0, 11, 0, TAU); ink(x, '#f0603a', { w: 4, fa: 1 })
      x.restore()
    }
    // the explosion: glyphs fly out to a ring that keeps slowly turning
    if (t >= T0 - 0.02) {
      const tt = t - T0
      SIGNS.forEach((s, i) => {
        const fly = easeOutBack(prog(tt, 0.02 * i, 0.02 * i + 0.5), 1.7)
        const a = -Math.PI / 2 + i * TAU / 12 + tt * 0.25 + (1 - fly) * 1.2, r = lerp(40, 360, fly)
        const gxp = HOOK_C.x + Math.cos(a) * r, gyp = HOOK_C.y + Math.sin(a) * r * 1.08
        x.save(); x.translate(gxp, gyp + 8 * Math.sin(t * 3 + i)); x.rotate((1 - fly) * 3 + 0.12 * Math.sin(t * 2 + i)); const sc = lerp(0.3, 1, Math.min(1, fly)) * (1 + 0.08 * Math.exp(-((((t - 0.6) % B) + B) % B) * 7)); x.scale(sc, sc)
        glyphText(x, s.glyph, 120, s.color)
        x.restore()
      })
      sparkle(x, HOOK_C.x, HOOK_C.y, t, T0 + 0.05, { n: 16, rad: 430, seed: 7, size: 36 })
      sparkle(x, HOOK_C.x, HOOK_C.y, t, T0 + 0.25, { n: 12, rad: 300, seed: 8, size: 28 })
    }
    words(x, ['All', '12', 'signs', '\n', 'in', { w: '60 seconds.', col: GOLD }], { top: 200, size: 132, weight: 800, accSize: 146, lh: 1.04 }, t, 0.12, { step: 0.065, back: 2.2 })
    mono(x, 'DATES SHIFT A DAY SOME YEARS', 540, 1690, 28, BONE, 0.75 * ease.outQuad(prog(t, 1.1, 1.5)), 0.18)
  }

  function sign(i, t) {
    const s = SIGNS[i], inf = INFO[i], u = t - S[i], col = s.color
    drawSky(x, t, SKY)
    // the colour wash
    const g = x.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, hexA(tint(col, VOID, 0.42), 0.9)); g.addColorStop(0.45, hexA(tint(col, VOID, 0.2), 0.8)); g.addColorStop(1, hexA(tint(col, VOID, 0.55), 0.92))
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    // sunburst rays behind the glyph
    x.save(); x.translate(L.gx, L.gy); x.rotate(t * 0.25 + i)
    x.globalCompositeOperation = 'lighter'
    for (let k = 0; k < 16; k++) { const a0 = k * TAU / 16; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1500, a0, a0 + TAU / 32); x.closePath(); x.fillStyle = hexA(tint(col, '#ffffff', 0.3), 0.07); x.fill() }
    x.restore()
    const rg = x.createRadialGradient(L.gx, L.gy, 20, L.gx, L.gy, 560); rg.addColorStop(0, hexA(tint(col, '#ffffff', 0.2), 0.42)); rg.addColorStop(1, hexA(col, 0))
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rg; x.fillRect(0, 0, W, H); x.restore()
    // a darker band behind the quip for readability
    const qb = x.createLinearGradient(0, 1430, 0, 1860); qb.addColorStop(0, hexA(VOID, 0)); qb.addColorStop(0.35, hexA(VOID, 0.35)); qb.addColorStop(0.75, hexA(VOID, 0.35)); qb.addColorStop(1, hexA(VOID, 0))
    x.fillStyle = qb; x.fillRect(0, 1430, W, 430)

    // glyph sticker
    const P = glyphPose(i, u), bump = 1 + 0.045 * Math.exp(-((((t - 0.6) % B) + B) % B) * 7) * prog(u, 0.5, 0.8)
    const drawG = (dx, a) => {
      x.save(); x.globalAlpha *= a * P.a
      if (P.pivot) { x.translate(L.gx, L.gy + P.pivot); x.rotate(P.rot); x.translate(0, -P.pivot) } else { x.translate(L.gx + P.dx + dx, L.gy + P.dy); x.rotate(P.rot) }
      x.scale(P.s * P.sx * bump, P.s * P.sy * bump)
      x.beginPath(); x.arc(0, 0, L.gR, 0, TAU); ink(x, tint(col, '#ffffff', 0.25), { w: 10, fa: 0.0, glow: 30 })
      x.fillStyle = hexA(tint(col, VOID, 0.5), 0.75); x.fill()
      x.beginPath(); x.arc(0, 0, L.gR - 22, 0, TAU); x.setLineDash([4, 18]); ink(x, tint(col, '#ffffff', 0.5), { w: 5, fa: 0, glow: 0 }); x.setLineDash([])
      glyphText(x, s.glyph, 330, tint(col, '#ffffff', 0.72), { outline: 0 })
      x.restore()
    }
    if (P.twin > 0.001) { drawG(-420 * P.twin, 0.9); drawG(420 * P.twin, 0.9) } else drawG(0, 1)
    sparkle(x, L.gx, L.gy, t, S[i] + 0.22, { n: 12, rad: 300, seed: 30 + i, size: 32, cols: [col, tint(col, '#ffffff', 0.5), '#fff3e0', GOLD] })

    // eyebrow + name + date pill
    mono(x, `${String(i + 1).padStart(2, '0')} / 12`, 540, L.eyeY, 32, GOLD, ease.outQuad(prog(u, 0.0, 0.25)))
    const name = s.name.toUpperCase()
    x.font = `800 150px ${INTER}`; x.letterSpacing = '-3px'
    const nsz = Math.min(150, Math.floor(150 * 930 / x.measureText(name).width)); x.letterSpacing = '0px'
    words(x, [name], { top: L.nameY - nsz * 0.86 - 2, size: nsz, weight: 800 }, t, S[i] + 0.1, { back: 2.6, dur: 0.32 })
    const pp = easeOutBack(prog(u, B, B + 0.35), 2.4)
    if (pp > 0.01) {
      x.save(); x.translate(540, L.pillY); x.scale(pp, pp)
      x.font = `700 40px ${MONO}`; x.letterSpacing = '4px'; const tw = x.measureText(inf.dates).width
      x.beginPath(); x.roundRect(-tw / 2 - 34, -38, tw + 68, 76, 38); ink(x, tint(col, '#ffffff', 0.45), { w: 5, fa: 0.0, glow: 14 }); x.fillStyle = hexA(VOID, 0.55); x.fill()
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(inf.dates, 2, 3); x.letterSpacing = '0px'
      x.restore()
    }

    // prop
    const prp = easeOutBack(prog(u, 2 * B, 2 * B + 0.42), 2.2)
    if (prp > 0.01) inf.prop(x, 540, L.propY + 8 * Math.sin(t * 2.2), 1.1 * prp, u, tint(col, '#ffffff', 0.38))
    sparkle(x, 540, L.propY, t, S[i] + 2 * B + 0.1, { n: 10, rad: 280, seed: 60 + i, size: 28 })

    // quip
    words(x, inf.quip, { top: L.quipTop, size: 66, weight: 700, accSize: 78, lh: 1.12, accCol: inf.acc }, t, S[i] + 3 * B, { step: 0.065 })
  }

  function end(t) {
    drawSky(x, t, SKY)
    const u = t - E0
    // a warm glow
    const wa = ease.outQuad(prog(u, 0, 0.6))
    const g = x.createRadialGradient(540, 860, 0, 540, 860, 760); g.addColorStop(0, `rgba(242,199,92,${0.18 * wa})`); g.addColorStop(1, 'rgba(232,98,138,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore()
    // raining glyphs
    for (const r of RAIN) {
      const tau = u - r.d
      if (tau <= 0) continue
      const y = -120 + r.v * tau + 0.5 * 1100 * tau * tau
      if (y > H + 150) continue
      x.save(); x.translate(r.x + 30 * Math.sin(tau * 2 + r.ph), y); x.rotate(r.spin * tau + r.ph); const sc = easeOutBack(prog(tau, 0, 0.25), 2.2); x.scale(sc, sc)
      x.globalAlpha *= 0.95; glyphText(x, r.g, r.size, r.col)
      x.restore()
    }
    // a soft dark halo so the line reads over the rain
    const hg = x.createRadialGradient(540, 900, 60, 540, 900, 560); hg.addColorStop(0, hexA(VOID, 0.6 * wa)); hg.addColorStop(1, hexA(VOID, 0))
    x.fillStyle = hg; x.fillRect(0, 300, W, 1200)
    // line
    words(x, ['Tag', 'your', '\n', { w: 'sign.', col: GOLD }], { top: 640, size: 170, weight: 800, accSize: 230, lh: 1.0 }, t, E0 + 0.05, { step: 0.12, back: 2.4, dur: 0.34, wobbleLast: true })
    // underline swoosh under "sign."
    const sw = ease.inOutCubic(prog(u, 0.62, 0.95))
    if (sw > 0) {
      x.save(); x.beginPath()
      for (let k = 0; k <= 30 * sw; k++) { const v = k / 30, xx = lerp(330, 760, v), yy = 1090 + 26 * Math.sin(v * Math.PI * 1.6 + 0.4) - 10 * v; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      ink(x, GOLD, { w: 12, fa: 0, glow: 22 }); x.restore()
    }
    sparkle(x, 540, 960, t, E0 + 0.5, { n: 16, rad: 360, seed: 99, size: 38 })
    sparkle(x, 760, 1080, t, E0 + 0.95, { n: 10, rad: 160, seed: 98, size: 28 })
  }

  const LAYERS = [hook, ...SIGNS.map((_, i) => t => sign(i, t)), end]
  const tint2 = k => k >= 1 && k <= 12 ? tint(SIGNS[k - 1].color, '#ffffff', 0.45) : GOLD

  function transition(k, p, t) {
    const kind = KIND[k - 1], newL = LAYERS[k], oldL = LAYERS[k - 1], ec = tint2(k)
    oldL(t)
    const edgeA = Math.sin(Math.PI * clamp(p))
    if (kind === 'twin') {
      const e = ease.outCubic(p), off = (1 - e) * 600
      ;[[0, -off], [540, off]].forEach(([cx, dx]) => { x.save(); x.beginPath(); x.rect(cx + dx, 0, 540, H); x.clip(); x.translate(dx, 0); newL(t); x.restore() })
      x.save(); x.globalAlpha = edgeA; x.beginPath(); x.moveTo(540 - off, 0); x.lineTo(540 - off, H); x.moveTo(540 + off, 0); x.lineTo(540 + off, H); ink(x, ec, { w: 14, fa: 0, glow: 30 }); x.restore()
      return
    }
    if (kind === 'swing') {
      const ang = lerp(-1.2, 0, easeOutBack(p, 1.8))
      const tr = () => { x.translate(540, -700); x.rotate(ang); x.translate(-540, 700) }
      x.save(); tr(); x.beginPath(); x.rect(0, 0, W, H); x.clip(); newL(t); x.restore()
      x.save(); tr(); x.globalAlpha = edgeA; x.beginPath(); x.rect(0, 0, W, H); ink(x, ec, { w: 16, fa: 0, glow: 30 }); x.restore()
      return
    }
    if (kind === 'spin') {
      newL(t)
      const e = ease.inCubic(p), sc = 1 - e, rot = e * 2.2
      if (sc > 0.01) {
        const tr = () => { x.translate(540, 960); x.rotate(rot); x.scale(sc, sc); x.translate(-540, -960) }
        x.save(); tr(); x.beginPath(); x.roundRect(0, 0, W, H, 60 * e + 1); x.clip(); oldL(t); x.restore()
        x.save(); tr(); x.beginPath(); x.roundRect(0, 0, W, H, 60 * e + 1); ink(x, tint(SIGNS[11].color, '#ffffff', 0.45), { w: 16 / Math.max(0.2, sc), fa: 0, glow: 30 }); x.restore()
      }
      return
    }
    x.save(); const edge = maskPath(x, kind, p); x.clip(); newL(t); x.restore()
    x.save(); x.globalAlpha = edgeA; edge(); ink(x, ec, { w: kind === 'pixels' ? 6 : 14, fa: 0, glow: 30 }); x.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      let k = 0
      for (let j = 0; j < WIPE.length; j++) if (t >= WIPE[j]) k = j
      const p = k > 0 ? (t - WIPE[k]) / DUR[KIND[k - 1]] : 1
      x.save()
      if (p < 1) transition(k, p, t); else LAYERS[k](t)
      x.restore()
      const onWash = k >= 1 && k <= 12 ? (k === 1 ? p : 1) : k === 13 ? 1 - clamp(p) : 0
      drawMoon(x, SKY_H.moon.x, SKY_H.moon.y, SKY_H.moon.r, SKY_H.moon.phase, { alpha: 1, glow: 3, earthshine: 1, darkAlpha: lerp(0.62, 0.12, clamp(onWash)) })
      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : t < 0.4 ? 1 - ease.inOutQuad(prog(t, 0, 0.4)) : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

// ── sound
const MEL = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]              // D major pentatonic-ish pops
const BASS = [146.83, 164.81, 185, 196, 220, 246.94, 277.18, 293.66, 329.63, 369.99, 392, 440]  // a rising line, one per sign
const count = items => items.filter(w => w !== '\n').length
export const cues = [
  // hook
  ...[0, 1, 2, 3, 4].map(i => ['pop', 0.12 + i * 0.065, [784, 880, 988, 1175, 1318][i], 0.05, (i - 2) * 0.15]),
  ['whoosh', beat(0) - 0.15, 0.4, 0.04], ['boom', beat(0), 0.1], ['glitter', beat(0), beat(0) + 0.9],
  ...SIGNS.map((_, i) => ['pop', beat(0) + 0.02 * i + 0.25, MEL[i % 7] * (i < 7 ? 1 : 1), 0.025, (i / 11 - 0.5) * 1.2]),
  ...[1, 2, 3].map(n => ['tick', beat(n), 0.05]),
  ['riser', beat(3), WIPE[1] + 0.2, 0.025],
  // signs
  ...SIGNS.flatMap((s, i) => {
    const t = S[i], nq = count(INFO[i].quip), o = []
    o.push(['whoosh', WIPE[i + 1] - 0.05, DUR[KIND[i]] + 0.1, 0.045])
    o.push(['pop', t, MEL[(i * 2) % 7] , 0.065, 0], ['pluck', t, BASS[i], 0.06, 0.7, 0])
    o.push(['pop', t + 0.12, MEL[(i * 2 + 2) % 7], 0.045, 0.2])
    o.push(['pop', t + B, MEL[(i + 3) % 7], 0.045, -0.2])
    o.push(['pop', t + 2 * B, MEL[(i + 4) % 7] * 0.75, 0.055, 0], ['glitter', t + 2 * B, t + 2 * B + 0.4])
    for (let w = 0; w < nq; w++) o.push(['pop', t + 3 * B + w * 0.065, MEL[(i + w) % 7], 0.035, (w - nq / 2) * 0.1])
    return o
  }),
  // prop gags
  ['boom', S[0] + 4 * B, 0.07], ['pop', S[0] + 4 * B, 1318.51, 0.06, 0.3], ['glitter', S[0] + 4 * B, S[0] + 4 * B + 0.5],
  ...[2, 2.5, 3, 3.5].map(b => ['pop', S[1] + b * B + 0.3, [659.25, 739.99, 880, 987.77][b * 2 - 4], 0.04, 0]),
  ...Array.from({ length: 9 }, (_, k) => ['pop', S[2] + 2 * B + k * 0.5 * B, 880 + k * 40, 0.03, (k % 3 - 1) * 0.4]),
  ['bell', S[3] + 3 * B, 1174.66, 0.025, 1.2, 0], ['pop', S[3] + 4 * B, 1318.51, 0.05, 0],
  ['pop', S[4] + 3 * B, 880, 0.05, 0], ['bell', S[4] + 4 * B, 1567.98, 0.03, 1.4, 0], ['glitter', S[4] + 4 * B, S[4] + 4 * B + 0.5],
  ...[0, 1, 2, 3].map(r => ['tick', S[5] + 2.5 * B + r * 0.5 * B, 0.07]),
  ...[3, 4, 5, 6].map(b => ['pluck', S[6] + b * B, b % 2 ? 392 : 329.63, 0.035, 0.4, b % 2 ? 0.4 : -0.4]),
  ['pop', S[7] + 4 * B, 659.25, 0.05, 0.3], ['bell', S[7] + 3 * B, 987.77, 0.02, 1.4, 0],
  ['whoosh', S[8] + 2.5 * B, 1.2, 0.03],
  ['bell', S[9] + 4 * B, 1174.66, 0.03, 1.4, 0.2], ['pop', S[9] + 4 * B, 1318.51, 0.05, 0.2],
  ...[3, 3.25, 3.6].map(b => ['tick', S[10] + b * B, 0.05]), ['bell', S[10] + 4 * B, 1567.98, 0.035, 1.6, 0], ['glitter', S[10] + 4 * B, S[10] + 4 * B + 0.6],
  ['glitter', S[11] + 2.4 * B, S[11] + 3.2 * B],
  // end
  ['whoosh', WIPE[13] - 0.05, 0.65, 0.05],
  ...[0, 1, 2].map(i => ['pop', E0 + 0.05 + i * 0.12, [880, 988, 1318.51][i], 0.06, (i - 1) * 0.2]),
  ['bell', E0 + 0.3, 1318.51, 0.035, 1.8, 0], ['boom', E0, 0.09], ['glitter', E0 + 0.3, E0 + 2.2],
  ...Array.from({ length: 10 }, (_, k) => ['pop', E0 + 0.5 + k * 0.22, MEL[(k * 3) % 7], 0.025, (k % 2 ? 0.5 : -0.5)]),
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.4, 0],
]
