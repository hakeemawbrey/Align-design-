// srl07orbit (20 s vertical, Star Talk Remix of the L07 "Orbit" loop) · story 0–15.6, then the shared end card.
// The original: Taurus and Libra aura orbs dance a binary orbit and line up once per loop (the chakra column ignites).
// The remix: the ♉ Taurus star and the ♎ Libra star are two crushes stuck in orbit round each other.
//   0.00–5.80  "Some crushes just | *orbit.*"  They circle a shared centre (dashed orbit, light trails), pretending not to
//              look. Rule of three: peek → caught → look away (blush); peek → caught → look away; peek → BOTH heart-eyed →
//              look away so hard they speed up. Drop (2.82): THE STARS: "you two have been circling for *weeks.*"
//   5.86–8.90  "Round and round | and *round.*"  The orbit whips up to a dizzy spin (eye-rolling pupils, swirl streaks).
//              ♓ Pisces pops up in the corner, sobbing, holding a "SAY HI" sign. THE STARS: "both ruled by *Venus.* just say hi."
//   8.93       They slow and lock into a vertical line (Taurus over Libra) — the original's align moment: the chakra column
//              ignites bottom → top between them. "Then they | *lined up.*"  PUSH · PULL · ALIGN chips light up.
//              ♉: "...hi."  (silence)  ♎: "hi!! hello! *hi.*"  Pisces' sign flips to "!!!!" (happy tears).
//   13.52 cut  "Stop circling. | *Say hi.*"  The two stars sit side by side, heart-eyed, hearts floating. Out by 15.45.
// One canvas (sky + orbit + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556
const TAU = Math.PI * 2
const TAU_S = signStar('taurus'), LIB = signStar('libra'), PIS = signStar('pisces')
const CHAKRAS = ['#e8384f', '#f08a3a', '#f2c75c', '#5fc77a', '#3fa7e8', '#5b5be0', '#a65fe0']   // root → crown

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.62, 5.8],
  in: 0.3,
  peeks: [[1.3, 1.72, 2.3], [3.3, 3.7, 4.25], [4.55, 4.95, 5.7]],   // [peek, caught, look away until]
  open: 2.66, l1: BEAT(4),                                       // the drop: 2.82
  h1: 5.86, h1Land: 6.3, l2: 5.9, spin: [5.8, 6.6], fast: 7.9, lock: BEAT(15), h1Out: [8.5, 8.68],   // lock 8.93
  pisIn: 6.5, pisFlip: 9.25, pisOut: [13.1, 13.4],
  h1b: 9.0, h1bLand: 9.4, h1bOut: [13.25, 13.45],
  l3: 9.0, l4: 10.8, chips: [9.6, 9.85, 10.1], chipsOut: [13.0, 13.3],
  close: 13.5, cut: 13.52, side: [13.38, 13.62],
  h2: 13.6, h2Land: 13.95, hop2: 14.4, h2Out: [15.18, 15.42], out: [15.1, 15.45],
}
const SPEAK = 'THE STARS', TS = '♉ TAURUS STAR', LS = '♎ LIBRA STAR'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you two have been circling for *weeks.*' },
  { t: T.l2, speaker: SPEAK, text: 'both ruled by *Venus.* just say hi.', color: PINK },
  { t: T.l3, speaker: TS, text: '...hi.', color: TAU_S.color },
  { t: T.l4, speaker: LS, text: 'hi!! hello! *hi.*', color: LIB.color },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── the orbit: angular speed w(t) (rad/s), integrated in closed form so θ is a pure f(t)
const W0 = 2.6, W1 = 6.4
function F(t) {          // ∫0..t w
  const [a, b] = T.spin, c = T.fast, d = T.lock
  let s = W0 * Math.min(t, a)
  if (t > a) { const u = Math.min(t, b) - a; s += W0 * u + (W1 - W0) * u * u / (2 * (b - a)) }
  if (t > b) s += W1 * (Math.min(t, c) - b)
  if (t > c) { const u = Math.min(t, d) - c, D = d - c; s += W1 * u - W1 * u * u / (2 * D) }
  return s
}
const TH0 = Math.PI / 2 - F(T.lock)                       // so Taurus lands exactly on top at the lock
function theta(t) {
  let th = TH0 + F(t)
  if (t > T.lock) th += 0.07 * Math.sin((t - T.lock) * 13) * Math.exp(-(t - T.lock) * 5)   // settle wobble
  return th
}
const wNow = t => (F(t + 0.01) - F(t - 0.01)) / 0.02
const CX = 540, CY = 1005, R = 250, SIZE = 210
const SIDE = { tau: { x: 370, y: 1060 }, lib: { x: 710, y: 1060 }, size: 270 }
function orbitPos(i, t) {
  const a = theta(t) + i * Math.PI
  return { x: CX + Math.cos(a) * R, y: CY - Math.sin(a) * R, a }
}

// pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, outline = INK } = {}) {
  const w = bm[0].length, h = bm.length, ox = cx - w * cell / 2, oy = cy - h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.save(); x.globalAlpha *= alpha
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

const TAU_HOPS = [T.in + 0.3, ...talkHops(LINES, TS, { cps: CPS }), T.h2Land, T.hop2]
const LIB_HOPS = [T.in + 0.4, ...talkHops(LINES, LS, { cps: CPS, gap: 0.22 }), T.h2Land + 0.08, T.hop2 + 0.1]

/** mood + look for star i (0 = Taurus, 1 = Libra); `to` = unit look toward the other star */
function starState(i, t, to) {
  const away = [-to[0], -to[1]]
  for (const [p, c, e] of T.peeks) {
    const third = T.peeks[2][0] === p, hold = third ? 0.5 : 0.22
    if (t >= p && t < c) return { mood: 'neutral', look: to, blink: false }
    if (t >= c && t < c + hold) return { mood: third ? 'heart' : 'wide', look: to, blink: false }
    if (t >= c + hold && t < e) return { mood: 'squint', look: away, blush: 1 }
  }
  if (t < T.spin[0]) return { mood: 'neutral', look: [away[0] * 0.6, -0.6] }               // whistling, looking at nothing
  if (t < T.fast) return { mood: 'eyeroll', blink: false }                                  // dizzy
  if (t < T.lock) return { mood: 'squint', look: [0, 0] }
  if (t < T.lock + 0.5) return { mood: 'wide', look: to, blink: false }
  if (i === 0 && t < T.l4) return { mood: 'happy', look: to, blush: 1 }                    // "...hi."
  if (i === 1 && t < T.l3 + 0.6) return { mood: 'wide', look: to, blink: false }
  if (t < T.side[0]) return { mood: i === 1 ? 'sparkle' : 'heart', look: to }
  if (t < T.h2Land) return { mood: 'happy', look: to }
  return { mood: 'heart', look: to }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Some crushes | just *orbit.*', { top: 200, size: 120, fit: true, accentSize: 200, at: T.h0, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.h0 + 0.42 })
  const H1 = popText(root, 'Round and round | and *round.*', { top: 210, size: 110, fit: true, accentSize: 180, at: T.h1, gap: 0.07, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H1b = popText(root, 'Then they | *lined up.*', { top: 170, size: 112, accentSize: 170, at: T.h1b, late: 2, lateAt: T.h1bLand, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Stop circling. | *Say hi.*', { top: 250, size: 124, accentSize: 210, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const orbitK = t => pop01(t, T.in, 0.5, 1.6) * (1 - prog(t, T.side[0], T.side[1]))
  const sideK = t => ease.inOutCubic(prog(t, ...T.side))

  function drawOrbitPath(t) {
    const k = orbitK(t)
    if (k <= 0.01) return
    x.save(); x.globalAlpha = 0.28 * k; x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([4, 16]); x.lineDashOffset = -t * 30
    x.beginPath(); x.arc(CX, CY, R, 0, TAU); x.stroke(); x.restore()
    // barycentre: a tiny pixel star breathing
    x.save(); x.globalAlpha = 0.7 * k; drawPixelStar(x, CX, CY, 18 + 4 * Math.sin(t * 6), 1, GOLD); x.restore()
  }

  function trails(t) {
    const k = orbitK(t)
    if (k <= 0.01 || t > T.lock + 0.6) return
    const w = wNow(t), len = clamp(w / W1)
    x.save(); x.globalCompositeOperation = 'lighter'; x.lineCap = 'round'
    for (const [i, col] of [[0, TAU_S.color], [1, LIB.color]]) {
      let prev = orbitPos(i, t)
      const N = 22, span = 0.18 + 0.32 * len
      for (let s = 1; s <= N; s++) {
        const P = orbitPos(i, t - (s / N) * span), f = 1 - s / N
        x.strokeStyle = col; x.globalAlpha = k * (0.1 + 0.25 * len) * f; x.lineWidth = 70 * f + 10
        x.beginPath(); x.moveTo(prev.x, prev.y); x.lineTo(P.x, P.y); x.stroke()
        x.strokeStyle = '#fff6ea'; x.globalAlpha = k * 0.35 * f * f; x.lineWidth = 6 * f + 1
        x.beginPath(); x.moveTo(prev.x, prev.y); x.lineTo(P.x, P.y); x.stroke()
        prev = P
      }
    }
    // dizzy swirl streaks at full spin
    const sw = clamp((w - 3.5) / 2.5) * k
    if (sw > 0.02) {
      x.strokeStyle = BONE; x.lineWidth = 5
      for (let j = 0; j < 5; j++) {
        const a0 = theta(t) * 0.8 + j * TAU / 5, rr = R * (1.55 + 0.12 * (j % 2))
        x.globalAlpha = sw * 0.35; x.beginPath(); x.arc(CX, CY, rr, a0, a0 + 0.55); x.stroke()
      }
    }
    x.restore()
  }

  function column(t, A, B) {
    const al = prog(t, T.lock - 0.05, T.lock + 0.2) * (1 - prog(t, T.side[0] - 0.1, T.side[0] + 0.1))
    if (al <= 0.01) return
    const y0 = A.y + SIZE * 0.5, y1 = B.y - SIZE * 0.42, cx = (A.x + B.x) / 2
    const ign = prog(t, T.lock, T.lock + 0.42)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, y1, 0, y0)
    CHAKRAS.forEach((c, i) => g.addColorStop(i / 6, c))
    for (const [w, a] of [[54, 0.14], [16, 0.38], [4, 0.95]]) {
      x.globalAlpha = a * al * ign; x.strokeStyle = w === 4 ? '#fff6ea' : g; x.lineWidth = w
      x.beginPath(); x.moveTo(cx, y1); x.lineTo(cx, lerp(y1, y0, ign)); x.stroke()
    }
    for (let i = 0; i < 7; i++) {
      const y = lerp(y1 - 10, y0 + 10, i / 6), lit = clamp(ign * 7 - i) * al
      if (lit <= 0) continue
      const pulse = 1 + 0.15 * Math.sin(t * 8 - i)
      const rg = x.createRadialGradient(cx, y, 0, cx, y, 46 * pulse)
      rg.addColorStop(0, CHAKRAS[i]); rg.addColorStop(0.4, CHAKRAS[i] + '66'); rg.addColorStop(1, CHAKRAS[i] + '00')
      x.globalAlpha = lit; x.fillStyle = rg; x.beginPath(); x.arc(cx, y, 46 * pulse, 0, TAU); x.fill()
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = CHAKRAS[i]; x.fillRect(Math.round(cx - 9), Math.round(y - 9), 18, 18)
      x.fillStyle = '#fff'; x.fillRect(Math.round(cx - 4), Math.round(y - 4), 8, 8)
      x.globalCompositeOperation = 'lighter'
    }
    // burst rings on the lock
    const pr = prog(t, T.lock, T.lock + 1.2)
    if (pr > 0 && pr < 1) for (const [P, c] of [[A, TAU_S.color], [B, LIB.color]]) {
      x.globalAlpha = (1 - pr) * 0.6; x.strokeStyle = c; x.lineWidth = 4
      x.beginPath(); x.arc(P.x, P.y, 120 + pr * 360, 0, TAU); x.stroke()
    }
    x.restore()
  }

  // the Push / Pull / Align chips (the reading), over the stars
  function chips(t) {
    const out = outK(t, T.chipsOut)
    if (t < T.chips[0] || out <= 0) return
    const defs = [['PUSH', READING.push, 0.45], ['PULL', READING.pull, 0.8], ['ALIGN', READING.align, 1]]
    const ws = [200, 200, 230], gap = 26, tot = ws.reduce((a, b) => a + b) + gap * 2
    let left = 1000 - tot
    x.save(); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    defs.forEach(([label, col, lit], i) => {
      const k = pop01(t, T.chips[i], 0.34, i === 2 ? 2.8 : 2) * out, w = ws[i], h = 74, cx = left + w / 2, cy = 590
      left += w + gap
      if (k <= 0.01) return
      x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha = clamp(k) * out
      if (i === 2) { x.shadowColor = col; x.shadowBlur = 30 + 10 * Math.sin(t * 6) }
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
      x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
      x.shadowBlur = 0
      x.fillStyle = 'rgba(16,9,38,' + (1 - lit * 0.15) + ')'; x.fillRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12)
      x.fillStyle = col; x.globalAlpha *= lit; x.fillText((i === 2 ? '★ ' : '') + label, 0, 3)
      x.restore()
    })
    x.restore()
  }

  // ♓ Pisces in the corner: sobbing, holding a sign
  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.4, 2.2) * popOut(t, T.pisOut)
    if (k <= 0.01) return
    const px = 150, py = 760 + (1 - clamp(k)) * 120
    const flipped = t >= T.pisFlip
    const r = drawStarChar(x, px, py, 150, t, { color: PIS.color, glyph: null, mood: flipped ? 'heart' : 'squint', look: [1, -1], pop: k, seed: 11, hops: [T.pisIn + 0.3, T.pisFlip, T.pisFlip + 0.4, T.pisFlip + 0.8], glow: 0.8 })
    // tears: little pixel drops falling from both eyes
    x.save()
    for (let i = 0; i < 6; i++) {
      const ph = ((t * 1.6 + i / 6) % 1), side = i % 2 ? 1 : -1
      x.globalAlpha = clamp(k) * (1 - ph) * 0.95
      x.fillStyle = '#9fe0ff'
      x.fillRect(Math.round(r.x + side * (30 + ph * 40)), Math.round(r.y - 6 + ph * 90), 8, 10)
    }
    x.restore()
    // the sign, held up above it on a stick
    const sx = px, sy = r.top - 70, flipK = prog(t, T.pisFlip - 0.1, T.pisFlip + 0.1)
    const sc = Math.abs(Math.cos(Math.PI * flipK)) * clamp(k)
    x.save(); x.translate(sx, sy); x.rotate(0.06 * Math.sin(t * 5))
    x.fillStyle = '#8a5a2b'; x.fillRect(-4, 0, 8, 60)
    x.scale(sc, clamp(k))
    x.fillStyle = INK; x.fillRect(-92, -44, 184, 88)
    x.fillStyle = BONE; x.fillRect(-86, -38, 172, 76)
    x.fillStyle = flipK < 0.5 ? '#c4304d' : '#d9437a'; x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(flipK < 0.5 ? 'SAY HI' : '!!!!', 0, 3)
    x.restore()
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 420 + Math.sin(p * 7 + i) * 18), Math.round(cy - 80 - p * 280), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function sparkles(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out), pin = pop01(t, T.in, 0.4, 2)
    if (ok <= 0 || pin <= 0.01) return
    const sk = sideK(t)
    const A0 = orbitPos(0, t), B0 = orbitPos(1, t)
    const A = { x: lerp(A0.x, SIDE.tau.x, sk), y: lerp(A0.y, SIDE.tau.y, sk) }, B = { x: lerp(B0.x, SIDE.lib.x, sk), y: lerp(B0.y, SIDE.lib.y, sk) }
    const size = lerp(SIZE, SIDE.size, sk)
    const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1, to = [dx / d, dy / d]
    column(t, A, B)
    const sq = t > T.lock && t < T.lock + 0.4 ? 0.14 * Math.exp(-(t - T.lock) * 8) * Math.cos((t - T.lock) * 24) : 0
    const draw = (i, P) => drawStarChar(x, P.x, P.y, size, t, {
      color: i ? LIB.color : TAU_S.color, glyph: i ? LIB.glyph : TAU_S.glyph, ...starState(i, t, i ? [-to[0], -to[1]] : to),
      hops: i ? LIB_HOPS : TAU_HOPS, pop: pin * ok, seed: i ? 6 : 2, squash: sq, glow: 1.1 + (t > T.lock ? 0.25 : 0),
    })
    // far one first (whichever is lower on screen is "nearer")
    if (A.y > B.y) { draw(1, B); draw(0, A) } else { draw(0, A); draw(1, B) }
    // the caught moments: a tiny "!" pop over each
    for (const [, c] of T.peeks) {
      const k = pop01(t, c, 0.2, 3) * (1 - prog(t, c + 0.35, c + 0.5))
      if (k <= 0.01) continue
      for (const P of [A, B]) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE; x.fillRect(P.x + 70, P.y - 150, 14 * k, 34 * k); x.fillRect(P.x + 70, P.y - 108, 14 * k, 12 * k); x.restore() }
    }
    if (t > T.peeks[2][1]) floatHearts(t, (A.x + B.x) / 2, Math.min(A.y, B.y) + 60, T.peeks[2][1], T.peeks[2][1] + 0.25, 3, 6)
    sparkles(t, A.x, A.y, T.lock, 10, 170, 1, [GOLD, TAU_S.color, BONE])
    sparkles(t, B.x, B.y, T.lock + 0.08, 10, 170, 2, [GOLD, LIB.color, BONE])
    if (t > T.h2Land) floatHearts(t, 540, 1000, T.h2Land, T.out[0] - 0.5, 5, 7)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        drawOrbitPath(t)
        trails(t)
        pisces(t)
        drawStars(t)
        chips(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cut candidates: 5.84 (the spin starts) and 13.52 (box shut → the last line). A 20 s film keeps one (13.52).
const CUTS = [5.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0 + 0.42, 1174.66, 0.045, 0],
  ['pop', T.in + 0.05, 739.99, 0.04, -0.3], ['pop', T.in + 0.12, 987.77, 0.04, 0.3], ['whoosh', T.in, 0.6, 0.03],
  // the peeks: caught! (a pop + tick each), the third one a heart pluck
  ...T.peeks.flatMap(([p, c], i) => [['tick', p, 0.02], ['pop', c, i === 2 ? 1318.51 : 880, 0.04, 0], ['whoosh', c + 0.22, 0.25, 0.02]]),
  ['pluck', T.peeks[2][1], 1174.66, 0.045, 0.6, 0], ['glitter', T.peeks[2][1], T.peeks[2][1] + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // spin up
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['riser', T.spin[0], T.fast, 0.05], ['whoosh', 6.6, 0.5, 0.05], ['whoosh', 7.2, 0.5, 0.05], ['whoosh', 7.75, 0.6, 0.05],
  ['pop', T.pisIn + 0.05, 587.33, 0.035, -0.5], ['pop', T.pisIn + 0.35, 523.25, 0.025, -0.5],
  // the lock: boom + chakra chimes up the column
  ['boom', T.lock, 0.2],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', +(T.lock + 0.02 + i * 0.06).toFixed(3), f, 0.03, 1.8, (i - 3) * 0.12]),
  ['glitter', T.lock + 0.1, T.lock + 0.7],
  ...wordPops(T.h1b, 2, 0.08, 1, 0.025), ['pop', T.h1bLand, 1318.51, 0.045, 0],
  ['pop', T.chips[0], 659.25, 0.03, -0.3], ['pop', T.chips[1], 739.99, 0.03, 0], ['pluck', T.chips[2], 1174.66, 0.045, 0.7, 0.3], ['bell', T.chips[2] + 0.04, 1760, 0.02, 1, 0.3],
  ['pop', T.pisFlip, 1318.51, 0.035, -0.5], ['glitter', T.pisFlip, T.pisFlip + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // the last line
  ...wordPops(T.h2, 2, 0.08, 0, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pop', T.hop2, 987.77, 0.03, -0.2], ['pop', T.hop2 + 0.1, 1174.66, 0.03, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
