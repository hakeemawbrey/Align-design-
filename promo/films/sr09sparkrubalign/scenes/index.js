// sr09sparkrubalign (20 s vertical Align ad, Star Talk Remix of teaser 09 "Spark · Rub · Align") · story 0–15.6, then the end card.
//   0.00–5.10  "Some *spark.*"  ♎ Libra and ♉ Taurus orbit each other fast; pixel lightning zaps the gap on the beat and
//              both go heart-eyed. Drop (2.82): THE STARS: "two stars. both ruled by *venus.*"
//   5.20–10.40 "Some *rub.*"  The orbit stops; they rush in and BONK (screen glitch, squash). Taurus plants itself and
//              steams; Libra's little scales tip back and forth. THE STARS: "taurus won't budge. libra can't *decide.*"
//              A second bonk, another glitch.
//   10.45 cut → "Some *align.*"  Side by side; seven chakra stars drop into a column between them and lock with a flash
//              and a gold ring; heart-eyes. The reading chips pop: PULL · PUSH · ALIGN (gone by 12.9).
//   13.10      "Put your faith | in the *stars.*"  Both hop. Everything pops out by 15.45; the end card at 15.6.
// One canvas (sky + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556
const LIB = signStar('libra'), TAU = signStar('taurus')
const SPARKC = '#7fd8b0', RUBC = '#e8628a'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.9, 5.08], libIn: 0.3, tauIn: 0.45, heart: 1.45,
  open: 2.66, l1: BEAT(4) + 0.02,                    // the drop: 2.82
  stop: [5.1, 5.6], h1: 5.2, h1Land: 5.6,
  bonk1: 6.05, l2: 6.6, bonk2: 8.62, steam: [6.3, 10.3], close: 10.2, h1Out: [10.2, 10.38],
  cut: 10.45,
  h2: 10.55, h2Land: 10.9, col: 11.0, lock: 11.75, chips: 11.95, h2Out: [12.85, 13.05],
  h3: 13.1, h3Land: 13.6, out: [15.05, 15.45],
}
const ZAPS = [1.15, 1.71, 2.27, 2.82, 3.38, 3.93, 4.49]
const BONKS = [T.bonk1, T.bonk2]
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'two stars. both ruled by *venus.*' },
  { t: T.l2, speaker: SPEAK, text: "taurus won't budge. libra can't *decide.*", color: RUBC },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = n => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s) }

// ── motion: orbit angle (Libra at c − d, Taurus at c + d), half-separation, centre
const C = { x: 540, y: 1000 }
function theta(t) {
  const free = -0.4 + 2.1 * Math.min(t, T.stop[0])
  const target = Math.ceil(free / (2 * Math.PI)) * 2 * Math.PI             // Libra left, Taurus right
  return lerp(free + 2.1 * Math.max(0, Math.min(t, T.stop[1]) - T.stop[0]) * 0.5, target, ease.inOutCubic(prog(t, ...T.stop)))
}
function halfSep(t) {
  if (t < T.stop[0]) return 230 + 16 * Math.sin(t * 3.1)
  if (t < T.cut) {
    let s = lerp(230 + 16 * Math.sin(T.stop[0] * 3.1), 300, ease.inOutCubic(prog(t, ...T.stop)))
    for (const b of BONKS) {
      if (t >= b - 0.32 && t < b) s = lerp(300, 128, ease.inCubic(prog(t, b - 0.32, b)))
      else if (t >= b && t < b + 0.6) s = lerp(128, 300, easeOutBack(prog(t, b, b + 0.6), 2.4))
    }
    return s
  }
  return 230
}
const centreY = t => t < T.cut ? C.y : 1170

function libState(t) {
  if (t < T.heart) return { mood: 'happy' }
  if (t < T.stop[0]) return { mood: 'heart' }
  if (t < T.bonk1 - 0.3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.bonk1 + 0.35) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < 7.1) return { mood: 'eyeroll' }
  if (t < T.bonk2 - 0.3) return { mood: 'wide', look: [-1, -1], blink: false }   // "can't decide" — caught
  if (t < T.bonk2 + 0.35) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.cut) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.lock) return { mood: 'neutral', look: [1, -1] }
  if (t < T.lock + 0.35) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.h3) return { mood: 'heart' }
  return { mood: 'happy' }
}
function tauState(t) {
  if (t < T.heart + 0.12) return { mood: 'happy' }
  if (t < T.stop[0]) return { mood: 'heart' }
  if (t < T.bonk1 - 0.3) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.bonk1 + 0.35) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.cut) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.lock) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.lock + 0.35) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.h3) return { mood: 'heart' }
  return { mood: 'happy' }
}
const LIB_HOPS = [T.libIn + 0.3, 2.27, 3.38, T.lock + 0.05, T.h3Land, T.h3Land + 0.5, T.h3Land + 1.0]
const TAU_HOPS = [T.tauIn + 0.3, 2.82, 3.93, T.lock + 0.12, T.h3Land + 0.25, T.h3Land + 0.75, T.h3Land + 1.25]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Some *spark.*', { top: 250, size: 140, accentSize: 210, at: T.h0, gap: 0.1, wobble: true, late: 1, lateAt: T.h0 + 0.3, accentColor: SPARKC })
  const H1 = popText(root, 'Some *rub.*', { top: 250, size: 140, accentSize: 210, at: T.h1, gap: 0.1, wobble: true, late: 1, lateAt: T.h1Land, accentColor: RUBC })
  const H2 = popText(root, 'Some *align.*', { top: 250, size: 140, accentSize: 210, at: T.h2, gap: 0.1, wobble: true, late: 1, lateAt: T.h2Land, accentColor: GOLD })
  const H3 = popText(root, 'Put your faith | in the *stars.*', { top: 240, size: 112, accentSize: 172, at: T.h3, gap: 0.08, wobble: true, late: 1, lateAt: T.h3Land, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, SPARKC]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  /** a chunky pixel lightning bolt between two points (jagged, deterministic per seed) */
  function zap(ax, ay, bx, by, a, seed, col = SPARKC) {
    if (a <= 0) return
    const n = 7, P = 9, pts = []
    for (let i = 0; i <= n; i++) {
      const k = i / n, j = i === 0 || i === n ? 0 : (hash(seed * 13 + i) - 0.5) * 70
      pts.push([lerp(ax, bx, k) - (by - ay) / Math.hypot(bx - ax, by - ay) * j, lerp(ay, by, k) + (bx - ax) / Math.hypot(bx - ax, by - ay) * j])
    }
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < n; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / P)
      for (let s = 0; s <= steps; s++) {
        const px = Math.round(lerp(x0, x1, s / steps) / P) * P, py = Math.round(lerp(y0, y1, s / steps) / P) * P
        x.fillStyle = col; x.fillRect(px - P, py - P, P * 2, P * 2)
        x.fillStyle = '#f4fff9'; x.fillRect(px - P / 2, py - P / 2, P, P)
      }
    }
    x.restore()
  }

  /** Libra's little pixel scales, tipping (tilt in rad) */
  function scales(cx, cy, tilt, a) {
    if (a <= 0) return
    const P = 10
    x.save(); x.globalAlpha = a; x.translate(cx, cy)
    x.fillStyle = INK; x.fillRect(-P * 1.5, -P, P * 3, P * 9); x.fillStyle = GOLD; x.fillRect(-P / 2, 0, P, P * 8)
    x.fillStyle = GOLD; x.fillRect(-P * 3, P * 8, P * 6, P)
    x.rotate(tilt)
    x.fillStyle = INK; x.fillRect(-P * 9, -P * 1.5, P * 18, P * 3)
    x.fillStyle = '#ffe08a'; x.fillRect(-P * 8.5, -P, P * 17, P * 2)
    for (const s of [-1, 1]) {
      x.save(); x.translate(s * P * 7.5, 0); x.rotate(-tilt)
      x.fillStyle = 'rgba(242,199,92,0.8)'; x.fillRect(-P / 2, 0, P / 2, P * 4); x.fillRect(0, 0, P / 2, P * 4)
      x.fillStyle = INK; x.fillRect(-P * 3.5, P * 4 - P / 2, P * 7, P * 2.5)
      x.fillStyle = GOLD; x.fillRect(-P * 3, P * 4, P * 6, P * 1.5)
      x.restore()
    }
    x.restore()
  }

  /** steam puffs rising off Taurus */
  function steam(t, cx, cy, a) {
    if (a <= 0) return
    for (let k = 0; k < 4; k++) {
      const ph = (t * 0.9 + k / 4) % 1, P = Math.round(6 + 6 * ph)
      const sx = cx + (k % 2 ? 1 : -1) * (40 + 30 * ph), sy = cy - ph * 120
      x.save(); x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.85; x.fillStyle = '#f3e9ff'
      x.fillRect(sx - P, sy - P * 2, P * 2, P * 4); x.fillRect(sx - P * 2, sy - P, P * 4, P * 2)
      x.restore()
    }
  }

  function glitch(t) {
    for (const b of BONKS) {
      const k = t - b
      if (k < 0 || k > 0.26) continue
      const f = Math.floor(t * 30)
      for (let i = 0; i < 7; i++) {
        const y = Math.floor(hash(f * 7 + i) * 1500) + 300, h = 20 + Math.floor(hash(f * 11 + i) * 70), dx = (hash(f * 3 + i) - 0.5) * 90
        x.drawImage(cv, 0, y, 1080, h, dx, y, 1080, h)
      }
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(232,98,138,${0.18 * (1 - k / 0.26)})`; x.fillRect(0, 0, 1080, 1920); x.restore()
    }
  }

  function drawColumn(t) {
    const ok = 1 - prog(t, T.h2Out[0], T.h2Out[1] + 0.3) * 0.0
    const cx = 540, top = 880, gap = 56
    const lockK = prog(t, T.lock, T.lock + 0.5)
    if (t > T.lock) {          // the gold line through them
      x.save(); x.globalAlpha = 0.7 * ease.outCubic(lockK) * popOut(t, T.out); x.fillStyle = GOLD
      x.fillRect(cx - 3, top - 40, 6, gap * 6 + 80); x.restore()
    }
    CHAKRAS.forEach((col, i) => {
      const t0 = T.col + (6 - i) * 0.1, p = ease.outCubic(prog(t, t0, t0 + 0.45))
      if (p <= 0) return
      const a = popOut(t, T.out) * ok
      const fromX = cx + (i % 2 ? 1 : -1) * (180 + i * 30), fromY = top - 300 - i * 40
      const px = lerp(fromX, cx, p), py = lerp(fromY, top + i * gap, p)
      const pulse = 1 + 0.5 * Math.sin(Math.PI * prog(t, T.lock + i * 0.04, T.lock + 0.3 + i * 0.04))
      x.save(); x.globalAlpha = a
      x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(px, py, 0, px, py, 46 * pulse); g.addColorStop(0, col + '88'); g.addColorStop(1, col + '00'); x.fillStyle = g; x.fillRect(px - 50 * pulse, py - 50 * pulse, 100 * pulse, 100 * pulse)
      x.globalCompositeOperation = 'source-over'; drawPixelStar(x, px, py, 64 * pulse, 1, col); x.restore()
    })
    // the lock: a flash and a gold ring around the pair
    if (t > T.lock) {
      const fk = prog(t, T.lock, T.lock + 0.4)
      if (fk < 1) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, top + 160, 0, cx, top + 160, 520); g.addColorStop(0, `rgba(255,240,200,${0.55 * (1 - fk)})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 400, 1080, 1300); x.restore() }
      const rk = easeOutBack(prog(t, T.lock, T.lock + 0.6), 1.6)
      x.save(); x.globalAlpha = 0.75 * popOut(t, T.out); x.strokeStyle = GOLD; x.lineWidth = 4
      x.beginPath(); x.ellipse(cx, top + 170, 470 * rk, 260 * rk, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      sparkles(t, cx, top + 160, T.lock, 12, 330, 0.3, [GOLD, BONE, ...CHAKRAS.slice(2, 5)])
    }
  }

  function chips(t) {
    const LBL = [['PULL', READING.pull], ['PUSH', READING.push], ['ALIGN', READING.align]]
    LBL.forEach(([s, col], i) => {
      const p = pop01(t, T.chips + i * 0.14, 0.34, 2.4) * outK(t, [T.h2Out[0] - 0.1, T.h2Out[0] + 0.12])
      if (p <= 0.01) return
      const cx = 230 + i * 310, cy = 1520, w = 270, h = 92
      x.save(); x.translate(cx, cy); x.scale(p, p)
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 + 6, w + 12, h - 12); x.fillRect(-w / 2 + 6, -h / 2 - 6, w - 12, h + 12)
      x.fillStyle = 'rgba(24,14,56,0.97)'; x.fillRect(-w / 2, -h / 2 + 6, w, h - 12); x.fillRect(-w / 2 + 6, -h / 2, w - 12, h)
      x.fillStyle = col; x.fillRect(-w / 2 + 6, -h / 2, w - 12, 5); x.fillRect(-w / 2 + 6, h / 2 - 5, w - 12, 5); x.fillRect(-w / 2, -h / 2 + 6, 5, h - 12); x.fillRect(w / 2 - 5, -h / 2 + 6, 5, h - 12)
      x.fillRect(-w / 2 + 30, -9, 18, 18)
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
      x.fillText(s, 18, 2)
      x.restore()
    })
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const th = theta(t), s = halfSep(t), cy = centreY(t)
    const dx = Math.cos(th) * s, dy = Math.sin(th) * s * 0.42
    const L = { x: C.x - dx, y: cy - dy, z: -Math.sin(th) }, R = { x: C.x + dx, y: cy + dy, z: Math.sin(th) }
    const size = t < T.cut ? 300 : 270
    const bonk = BONKS.reduce((q, b) => q + (t >= b && t < b + 0.5 ? 0.22 * Math.exp(-(t - b) * 8) * Math.cos((t - b) * 26) : 0), 0)
    const lp = pop01(t, T.libIn, 0.36, 2.1) * ok, tp = pop01(t, T.tauIn, 0.36, 2.1) * ok
    const plant = t > T.bonk1 + 0.4 && t < T.cut ? 0.08 : 0                       // Taurus digs in (squat)
    const draws = [
      () => drawStarChar(x, L.x, L.y, size * (1 + 0.08 * L.z * (t < T.stop[1] ? 1 : 0)), t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, pop: lp, squash: bonk, seed: 4 }),
      () => drawStarChar(x, R.x, R.y, size * (1 + 0.08 * R.z * (t < T.stop[1] ? 1 : 0)), t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), hops: TAU_HOPS, pop: tp, squash: bonk + plant, seed: 7 }),
    ]
    let rL, rR
    if (L.z < R.z) { rL = draws[0](); rR = draws[1]() } else { rR = draws[1](); rL = draws[0]() }
    // spark: zaps on the beat
    for (const z of ZAPS) { const k = t - z; if (k >= 0 && k < 0.22) zap(rL.x + 60, rL.y, rR.x - 60, rR.y, 1 - k / 0.22, z * 10) }
    for (const z of ZAPS) sparkles(t, (rL.x + rR.x) / 2, (rL.y + rR.y) / 2, z, 6, 70, z)
    // rub: bonk stars, scales, steam
    for (const b of BONKS) if (t >= b && t < b + 0.6) { sparkles(t, C.x, cy - 20, b, 10, 110, b, [RUBC, BONE, GOLD]) }
    const rubA = prog(t, T.bonk1 + 0.2, T.bonk1 + 0.5) * (1 - prog(t, T.close, T.close + 0.2))
    const indecisive = t > 7.25 ? 0.42 : 0.2
    scales(rL.x, rL.top - 150, Math.sin((t - T.bonk1) * (t > 7.25 ? 7 : 3)) * indecisive, rubA)
    steam(t, rR.x, rR.top - 10, rubA)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        if (t > T.cut) drawColumn(t)
        drawStars(t)
        if (t > T.cut) chips(t)
        glitch(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut: 10.45 (box shut → "Some align."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51, 1396.91]
const wordPops = (t0, n, gap, b = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(b + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0 + 0.3, 1244.51, 0.045, 0],
  ['pop', T.libIn + 0.05, 698.46, 0.045, -0.3], ['pop', T.tauIn + 0.05, 932.33, 0.045, 0.3],
  ...ZAPS.flatMap(z => [['tick', z, 0.06], ['glitter', z, z + 0.18]]),
  ['pluck', T.heart, 1244.51, 0.04, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // rub
  ['whoosh', T.stop[0], 0.45, 0.04],
  ...wordPops(T.h1, 1, 0.1, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...BONKS.flatMap(b => [['whoosh', b - 0.32, 0.3, 0.05], ['boom', b, 0.24], ['tick', b + 0.03, 0.08], ['tick', b + 0.12, 0.06], ['pop', b + 0.05, 440, 0.04, 0]]),
  ['tick', 7.3, 0.03], ['tick', 7.55, 0.03], ['tick', 7.8, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 622.25, 0.03, 0],
  // align
  ...wordPops(T.h2, 1, 0.1, 1, 0.025), ['pop', T.h2Land, 1244.51, 0.045, 0],
  ...CHAKRAS.map((_, i) => ['pop', +(T.col + (6 - i) * 0.1 + 0.4).toFixed(3), NOTE[i], 0.026, 0]),
  ['riser', T.col, T.lock, 0.05],
  ['boom', T.lock, 0.22], ['bell', T.lock, 622.25, 0.06, 2.4, -0.3], ['bell', T.lock + 0.05, 783.99, 0.05, 2.4, 0.3], ['bell', T.lock + 0.1, 932.33, 0.04, 2.2, 0], ['glitter', T.lock, T.lock + 0.7],
  ['pop', T.chips, 783.99, 0.035, -0.4], ['pop', T.chips + 0.14, 932.33, 0.035, 0], ['pop', T.chips + 0.28, 1244.51, 0.04, 0.4],
  // last line
  ...wordPops(T.h3, 3, 0.08, 1, 0.028), ['pop', T.h3Land, 1244.51, 0.055, 0], ['pluck', T.h3Land, 1046.5, 0.05, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
