// htxeta (15 s vertical Align ad) · story 0–10.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–3.95  HOOK  a chat thread from someone who is "on the way": "10 minutes away." → "5 min" → "almost there!" →
//              "parking" → "ok 10 more min". Each bubble pops in on the beat and pushes the thread up; the timestamps jump
//              (6:40 PM → 8:20 PM). A big line-art clock spins through it, a pictogram taps their foot, and the sky
//              goes from late-afternoon blue through sunset to night (the skyline's windows light up).
//   3.95–5.80  "*Houston* minutes." — the thread whooshes away, the clock spins wildly.
//   5.80–8.40  ON ALIGN  a plain dark phone rises: "Make the wait | *worth it.*" A card back drops onto the screen and
//              flips into a real talk card ("Morning person or night owl?"). "Ask something real | *while you wait.*"
//   8.40–10.45 the phone drops away; the talk card floats up big with the clock (now calm) as a halo:
//              "Talk like | you *mean it.*"
//   10.45→     plain sky only (SKY_H + grain), the end card takes over at 10.6.
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

export const STORY_END = 10.6
const H = 1920
const BEAT = n => 0.6 + n * 0.5556
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SUN = '#ffb36b', VIOLET = '#c9a6ff', BLUE = '#8fd8f6', MINT = '#7fe0a8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const r3 = v => +v.toFixed(3)

// ── the timeline
const MSGS = [
  { t: 0.1, txt: '10 minutes away.', time: '6:40 PM', col: VIOLET },
  { t: r3(BEAT(0.6)), txt: '5 min', time: '7:05 PM', col: BLUE },
  { t: r3(BEAT(2)), txt: 'almost there!', time: '7:31 PM', col: MINT },
  { t: r3(BEAT(3.4)), txt: 'parking', time: '7:58 PM', col: SUN },
  { t: r3(BEAT(4.8)), txt: 'ok 10 more min', time: '8:20 PM', col: PINK },
]
export const T = {
  open: 0.0, clock: 0.25, person: 0.4, threadOut: [3.64, 3.88],
  hou: 3.86, houLate: 4.14, spinFast: [3.9, 5.6], houOut: [5.62, 5.8], clockOut: [5.55, 5.95],
  phone: [5.72, 6.2], turn: 5.86, turnLate: 6.18, cardDrop: 6.3, flip: [6.62, 6.88], sub: 6.62, turnOut: [8.24, 8.42],
  phoneOut: [8.2, 8.6], lift: [8.25, 8.75], end: 8.5, endOut: [10.25, 10.45], sceneOut: [10.1, 10.45],
}
// clock time (minutes after 6:00 PM) as a function of t: follows the timestamps, then races
function clockMin(t) {
  // keyframes from the timestamps
  const K = [[0, 34], [MSGS[0].t, 40], [MSGS[1].t, 65], [MSGS[2].t, 91], [MSGS[3].t, 118], [MSGS[4].t, 140]]
  let m
  if (t <= K[K.length - 1][0]) {
    let i = 0
    while (i < K.length - 2 && t > K[i + 1][0]) i++
    const [t0, m0] = K[i], [t1, m1] = K[i + 1]
    m = lerp(m0, m1, ease.inOutCubic(prog(t, t0, t1)))
  } else {
    // keeps racing during "Houston minutes", then eases to a stop
    const dt = t - K[K.length - 1][0]
    m = 140 + Math.min(dt, 1.9) * 260
  }
  return m
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
        w.e.style.opacity = String(clamp(p * 3) * out)
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

// ── a generic skyline along the bottom (no real tower outlines)
const TOWERS = (() => {
  const r = rng(77), out = []
  let px = -20
  while (px < W + 20) {
    const mid = 1 - Math.min(1, Math.abs(px - 640) / 520)
    const w = 58 + r() * 70, h = 90 + r() * 90 + mid * (80 + r() * 170)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat'][Math.floor(r() * 5)], seed: r() * 100 })
    px += w + 4 + r() * 16
  }
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 22); x.lineTo(m - 7, y + 8); x.lineTo(m, y - 46); x.lineTo(m + 7, y + 8); x.lineTo(r, y + 22); break
    case 'slant': x.lineTo(l, y + 36); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 32); x.lineTo(l + b.w * 0.25, y + 32); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 32); x.lineTo(r, y + 32); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

/** a chat bubble (incoming, tail bottom-left). (lx, by) = left edge, bottom edge. Returns its size. */
function bubble(x, lx, by, txt, { size = 86, k = 1, a = 1, col = VIOLET, sq = 0 } = {}) {
  x.font = `800 ${size}px ${INTER}`
  const tw = x.measureText(txt).width
  const bw = tw + size * 1.05, bh = size * 1.62, r = bh * 0.42
  if (k <= 0 || a <= 0) return { bw, bh }
  x.save()
  x.translate(lx + 30, by); x.scale(k * (1 + sq), k * (1 - sq)); x.translate(-30, 0)
  x.globalAlpha *= a
  x.beginPath()
  x.moveTo(r, -bh); x.lineTo(bw - r, -bh); x.quadraticCurveTo(bw, -bh, bw, -bh + r); x.lineTo(bw, -r); x.quadraticCurveTo(bw, 0, bw - r, 0)
  x.lineTo(60, 0); x.quadraticCurveTo(26, 22, -6, 26); x.quadraticCurveTo(14, 4, 12, -14)
  x.quadraticCurveTo(0, -24, 0, -r); x.lineTo(0, -bh + r); x.quadraticCurveTo(0, -bh, r, -bh); x.closePath()
  x.fillStyle = '#1a1236'; x.fill()
  ink(x, col, { w: 7, fa: 0.2, glow: 22 })
  x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = BONE
  x.fillText(txt, size * 0.52, -bh / 2 + size * 0.04)
  x.restore()
  return { bw, bh }
}

/** a big line-art wall clock at (cx, cy), radius R; min = minutes after 6:00 PM */
function clockFace(x, cx, cy, R, min, t, { k = 1, a = 1, blur = 0, col = BONE, rim = GOLD } = {}) {
  if (k <= 0 || a <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= a
  // face
  x.beginPath(); x.arc(0, 0, R, 0, TAU)
  x.fillStyle = '#140e2c'; x.fill()
  ink(x, rim, { w: 14, fa: 0.12, glow: 30 })
  x.beginPath(); x.arc(0, 0, R - 26, 0, TAU); x.strokeStyle = rgba(rim, 0.35); x.lineWidth = 3; x.stroke()
  // ticks
  for (let i = 0; i < 12; i++) {
    const an = i / 12 * TAU, big = i % 3 === 0
    const r0 = R - (big ? 64 : 50), r1 = R - 34
    x.beginPath(); x.moveTo(Math.sin(an) * r0, -Math.cos(an) * r0); x.lineTo(Math.sin(an) * r1, -Math.cos(an) * r1)
    x.strokeStyle = rgba(col, big ? 0.95 : 0.6); x.lineWidth = big ? 12 : 7; x.lineCap = 'round'; x.stroke()
  }
  // hands: hour (6 o'clock + min) and minute; motion-blur smear when racing
  const hourA = ((6 * 60 + min) / 720) * TAU, minA = (min / 60) * TAU
  const hand = (an, len, w, c) => {
    x.beginPath(); x.moveTo(-Math.sin(an) * 22, Math.cos(an) * 22); x.lineTo(Math.sin(an) * len, -Math.cos(an) * len)
    x.strokeStyle = c; x.lineWidth = w; x.lineCap = 'round'; x.shadowColor = c; x.shadowBlur = 16; x.stroke(); x.shadowBlur = 0
  }
  if (blur > 0) {
    // a sweeping fan behind the minute hand
    x.save(); x.globalAlpha *= 0.32 * clamp(blur)
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, R * 0.74, minA - Math.PI / 2 - 1.6 * clamp(blur), minA - Math.PI / 2); x.closePath()
    x.fillStyle = PINK; x.fill(); x.restore()
  }
  hand(hourA, R * 0.46, 18, col)
  hand(minA, R * 0.72, 11, PINK)
  x.beginPath(); x.arc(0, 0, 16, 0, TAU); x.fillStyle = GOLD; x.fill()
  x.restore()
}

/** a pictogram person, front-ish silhouette with no face, checking a phone. (px, py) = feet, s = scale (≈ 330 px tall at 1).
 *  tap: foot-tap phase 0..1 (right foot lifts), glance: 0 looking at phone → 1 looking up/around */
function waiter(x, px, py, s, { tap = 0, glance = 0, a = 1, col = VIOLET, line = BONE, glow = 14 } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  // legs (left planted, right tapping)
  x.beginPath(); x.moveTo(-18, -120); x.lineTo(-24, -6); ink(x, line, { w: 26, fa: 0, glow: glow * 0.6 })
  const lift = 18 * tap
  x.beginPath(); x.moveTo(18, -120); x.lineTo(30, -6 - lift); ink(x, line, { w: 26, fa: 0, glow: glow * 0.6 })
  // body
  x.beginPath(); x.moveTo(-46, -112); x.lineTo(-40, -224); x.quadraticCurveTo(-40, -256, 0, -258); x.quadraticCurveTo(40, -256, 40, -224); x.lineTo(46, -112); x.closePath()
  x.fillStyle = '#1c1238'; x.fill()
  ink(x, line, { w: 9, fa: 0.34, fill: col, glow })
  // left arm hangs; right arm bent, holding the phone up
  x.beginPath(); x.moveTo(-42, -226); x.lineTo(-58, -140); ink(x, line, { w: 16, fa: 0, glow: glow * 0.5 })
  x.beginPath(); x.moveTo(42, -226); x.lineTo(70, -168); x.lineTo(38, -196); ink(x, line, { w: 16, fa: 0, glow: glow * 0.5 })
  // the phone: a small glowing slab
  x.save(); x.translate(34, -206); x.rotate(-0.25)
  x.beginPath(); x.roundRect(-14, -26, 28, 46, 6); x.fillStyle = '#0d0a1c'; x.fill()
  x.strokeStyle = BLUE; x.lineWidth = 4; x.shadowColor = BLUE; x.shadowBlur = 16; x.stroke(); x.shadowBlur = 0
  x.restore()
  // head: tilted down at the phone, or up looking around
  const hx = lerp(10, -6 * Math.sin(glance * 9), glance), hy = lerp(-284, -296, glance)
  x.beginPath(); x.arc(hx, hy, 33, 0, TAU)
  ink(x, line, { w: 9, fa: 0.85, fill: line, glow })
  x.restore()
}

/** a plain dark phone: bezel + pill notch. Returns the screen rect */
function drawPhone(x, cx, cy, w, h, a = 1) {
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 50; x.shadowOffsetY = 20
  x.fillStyle = '#0d0a1c'; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 70); x.fill()
  x.shadowOffsetY = 0
  x.lineWidth = 8; x.strokeStyle = BONE; x.shadowColor = rgba(VIOLET, 0.9); x.shadowBlur = 22; x.stroke(); x.shadowBlur = 0
  x.fillStyle = '#000'; x.beginPath(); x.roundRect(cx - 70, cy - h / 2 + 26, 140, 34, 17); x.fill()
  x.restore()
  return { x: cx - w / 2 + 22, y: cy - h / 2 + 22, w: w - 44, h: h - 44, r: 50 }
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 86px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const back = new Image(); back.src = A + 'card-back.png'
  const talk = new Image(); talk.src = A + 'card-talk-2.png'
  try { await Promise.all([back.decode(), talk.decode()]) } catch (_) { /* drawn only when loaded */ }
  const ok = im => im.complete && im.naturalWidth > 0

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON, TX', SUN), 0.05, T.threadOut], [eyebrow('ON ALIGN'), T.turn, T.turnOut]]
  const H1 = popText(root, '*Houston* | minutes.', { top: 250, size: 170, accentSize: 200, at: T.hou, late: 1, lateAt: T.houLate, wobble: true, accentColor: SUN, lineHeight: 0.98 })
  const H2 = popText(root, 'Make the wait | *worth* *it.*', { top: 205, size: 108, accentSize: 140, at: T.turn, gap: 0.07, late: 2, lateAt: T.turnLate, lateGap: 0.1, wobble: true, accentColor: GOLD })
  const S2 = popText(root, 'Ask something real | *while* *you* *wait.*', { top: 1590, size: 64, weight: 700, accentSize: 84, at: T.sub, gap: 0.07, accentColor: PINK })
  const H3 = popText(root, 'Talk like | you *mean* *it.*', { top: 205, size: 116, accentSize: 150, at: T.end, gap: 0.07, accentColor: PINK, wobble: true })
  const HEADS = [[H1, T.houOut], [H2, T.turnOut], [S2, T.turnOut], [H3, T.endOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const dayK = t => 1 - ease.inOutQuad(prog(t, 0.3, 4.2))          // late-afternoon blue → night
  const duskK = t => Math.sin(Math.PI * clamp(prog(t, 0.6, 4.6)))  // the sunset band peaks mid-hook

  // ── the sky going from day to night (drawn over the nebula, fading away)
  function drawDaySky(t) {
    const d = dayK(t), dk = duskK(t)
    if (d > 0) {
      const g = x.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, rgba('#3f7fd0', 0.95 * d)); g.addColorStop(0.55, rgba('#7fb3e8', 0.9 * d)); g.addColorStop(1, rgba('#ffd6a0', 0.95 * d))
      x.fillStyle = g; x.fillRect(0, 0, W, H)
    }
    if (dk > 0) {
      const g = x.createLinearGradient(0, 700, 0, H)
      g.addColorStop(0, rgba('#e8628a', 0)); g.addColorStop(0.5, rgba('#e8628a', 0.38 * dk)); g.addColorStop(1, rgba(SUN, 0.7 * dk))
      x.fillStyle = g; x.fillRect(0, 700, W, H - 700)
    }
    // the sun: sinks behind the skyline on the right
    const sp = prog(t, 0, 4.0)
    if (sp < 1) {
      const sx = 965, sy = lerp(1000, 1820, ease.inQuad(sp)), sr = 110 * pop01(t, 0.05, 0.5, 1.6)
      if (sr > 0) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const hg = x.createRadialGradient(sx, sy, sr * 0.5, sx, sy, sr * 3)
        hg.addColorStop(0, rgba(SUN, 0.5)); hg.addColorStop(1, rgba(SUN, 0))
        x.fillStyle = hg; x.beginPath(); x.arc(sx, sy, sr * 3, 0, TAU); x.fill()
        x.restore()
        const sg = x.createLinearGradient(0, sy - sr, 0, sy + sr)
        sg.addColorStop(0, '#ffe58a'); sg.addColorStop(1, lerpC('#ffb35a', '#ff5f7e', sp))
        x.beginPath(); x.arc(sx, sy, sr, 0, TAU); x.fillStyle = sg; x.fill()
      }
    }
  }

  // ── the skyline + the waiting person + the clock (the hook stage), slides down at the turn
  const stageDY = t => 900 * ease.inCubic(prog(t, ...T.clockOut))
  function drawCity(t) {
    const dy = stageDY(t)
    if (dy >= 900) return
    const night = 1 - dayK(t)
    x.save(); x.translate(0, dy)
    const BASE = H + 10
    TOWERS.forEach((b, i) => {
      const k = pop01(t, 0.05 + Math.abs(b.x - 540) * 0.0006 + (i % 3) * 0.04, 0.45, 1.6)
      if (k <= 0) return
      const h = b.h * k
      x.save(); x.translate(0, BASE)
      towerPath(x, b, h); x.fillStyle = lerpC('#3a3270', '#140c2e', night); x.fill()
      x.save(); x.clip()
      for (let wy = -h + 22; wy < -12; wy += 28) for (let wx = b.x + 10; wx < b.x + b.w - 14; wx += 20) {
        const lit = noise1(wx * 0.37 + wy * 0.21, 4 + b.seed)
        if (lit > 0.85 - 0.45 * night) { x.fillStyle = rgba('#ffd98a', (0.15 + 0.75 * night) * (0.7 + 0.3 * noise1(t * 0.7 + wx, wy))); x.fillRect(wx, wy, 9, 13) }
      }
      x.restore()
      towerPath(x, b, h); x.strokeStyle = rgba(night > 0.5 ? VIOLET : PINK, 0.8); x.lineWidth = 4; x.shadowColor = PINK; x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0
      x.restore()
    })
    // ground strip
    x.fillStyle = '#0c0720'; x.fillRect(0, BASE - 10, W, 400)

    // the clock
    const m = clockMin(t)
    const ck = pop01(t, T.clock, 0.5, 2.2)
    const racing = clamp((t - MSGS[4].t) / 0.6) * (1 - prog(t, 5.3, 5.6))
    const bounce = t > 0.6 ? 1 + 0.035 * Math.exp(-((t - 0.6) % 0.5556) * 10) : 1     // a little thump on every beat
    const shake = racing > 0 ? 6 * racing * Math.sin(t * 70) : 0
    clockFace(x, 660 + shake, 1390, 210, m, t, { k: ck * bounce * (1 + 0.12 * ease.outCubic(prog(t, 3.85, 4.3))), blur: racing })
    sparkle(x, 660, 1390, t, T.clock + 0.2, { n: 10, R: 280, seed: 9, size: 26 })

    // the waiting person, tapping a foot on the beat (faster and faster)
    const pk = pop01(t, T.person, 0.45, 2.2)
    const tapRate = lerp(1, 2.6, prog(t, 0.6, 4.2))
    const ph = ((t - 0.6) / 0.5556) * tapRate
    const tap = t > 0.6 ? Math.max(0, Math.sin(ph * Math.PI)) : 0
    const glance = clamp(Math.sin((t - 1.2) * 3.1)) * clamp(prog(t, 1.3, 1.6))
    waiter(x, 230, 1860, 1.12 * pk, { tap, glance })
    // impatience: little pixel "…" puffs over their head at each new message
    MSGS.forEach((mm, i) => {
      if (i === 0) return
      const p = prog(t, mm.t, mm.t + 0.7)
      if (p <= 0 || p >= 1) return
      x.save(); x.globalAlpha = 1 - ease.inQuad(p)
      for (let d = 0; d < 3; d++) drawPixelStar(x, 190 + d * 40, 1470 - 70 * ease.outCubic(p) - 6 * Math.sin(p * 9 + d), 16, 2, [GOLD, PINK, BLUE][d])
      x.restore()
    })
    x.restore()
  }

  // ── the chat thread (the hook). Newest at the bottom; each new bubble pushes the stack up.
  const ANCHOR = 1050, SLOT = 196, LEFT = 72
  function drawThread(t) {
    const out = ease.inCubic(prog(t, ...T.threadOut))
    if (out >= 1) return
    x.save(); x.translate(0, -1100 * out); x.globalAlpha = 1 - out * 0.6
    MSGS.forEach((mm, i) => {
      if (t < mm.t) return
      let up = 0
      for (let j = i + 1; j < MSGS.length; j++) up += SLOT * easeOutBack(prog(t, MSGS[j].t - 0.02, MSGS[j].t + 0.3), 1.4)
      const by = ANCHOR - up
      if (by < 340) return
      const fadeTop = clamp((by - 340) / 110)
      const k = pop01(t, mm.t, 0.34, 2.6)
      // the first message starts big (it IS the hook) and settles as the thread grows
      const big = i === 0 ? lerp(1.0, 1, ease.inOutCubic(prog(t, MSGS[1].t - 0.05, MSGS[1].t + 0.3))) : 1
      const sq = t > mm.t + 0.2 ? 0.06 * Math.exp(-(t - mm.t - 0.2) * 9) * Math.sin((t - mm.t - 0.2) * 30) : 0
      const isNew = i === MSGS.length - 1 || t < MSGS[i + 1].t
      const { bh } = bubble(x, LEFT, by, mm.txt, { size: 88, k: k * big, a: fadeTop * (isNew ? 1 : 0.78), col: mm.col, sq })
      // timestamp under the bubble
      x.save(); x.globalAlpha *= fadeTop * clamp(prog(t, mm.t + 0.15, mm.t + 0.4))
      x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'top'
      x.fillStyle = rgba(mm.col, 0.95); x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 10
      x.fillText(mm.time, LEFT + 66, by + 10)
      x.restore()
      if (i > 0) sparkle(x, LEFT + 260, by - bh * 0.5, t, mm.t + 0.05, { n: 8, R: 200, seed: 20 + i, size: 22, cols: [mm.col, '#fff3e0', GOLD] })
    })
    x.restore()
  }

  // ── the turn: phone + a card back that flips into a real talk card
  const PH = { cx: 540, cy: 1040, w: 620, h: 1060 }
  const CARD_W = 470, cardH = w => w * (ok(talk) ? talk.naturalHeight / talk.naturalWidth : 1.6)
  function drawTurn(t) {
    if (t < T.phone[0] || t > T.sceneOut[1]) return
    // phone rises, then drops away
    const rise = easeOutBack(prog(t, ...T.phone), 1.3)
    const drop = ease.inCubic(prog(t, ...T.phoneOut))
    const py = PH.cy + (1 - rise) * 1300 + drop * 1400
    if (drop < 1) {
      const s = drawPhone(x, PH.cx, py, PH.w, PH.h)
      // on screen: a dim chat header + the old "parking" bubble, a callback
      x.save(); x.beginPath(); x.roundRect(s.x, s.y, s.w, s.h, s.r); x.clip()
      const sg = x.createLinearGradient(0, s.y, 0, s.y + s.h); sg.addColorStop(0, '#1b1440'); sg.addColorStop(1, '#0b0820')
      x.fillStyle = sg; x.fillRect(s.x, s.y, s.w, s.h)
      x.globalAlpha = 0.55 * (1 - clamp(prog(t, T.cardDrop, T.cardDrop + 0.3)) * 0.6)
      bubble(x, s.x + 34, s.y + 230, 'parking', { size: 46, col: SUN })
      bubble(x, s.x + 34, s.y + 350, 'ok 10 more min', { size: 46, col: PINK })
      x.restore()
    }
    // the card: drops onto the screen as a card back, flips into the talk card, then lifts big for the last line
    if (t < T.cardDrop) return
    const dk = easeOutBack(prog(t, T.cardDrop, T.cardDrop + 0.36), 1.8)
    const fp = prog(t, ...T.flip)
    const lift = ease.inOutCubic(prog(t, ...T.lift))
    const out = ease.inCubic(prog(t, ...T.sceneOut))
    let cx = 540, cy = lerp(lerp(-500, py + 40, dk), 1130, lift)
    const w = lerp(CARD_W, 680, lift) * (1 - 0.5 * out)
    const hh = cardH(w)
    const flipX = Math.abs(Math.cos(fp * Math.PI))
    const face = fp >= 0.5
    const land = t > T.cardDrop + 0.3 ? 0.05 * Math.exp(-(t - T.cardDrop - 0.3) * 8) * Math.cos((t - T.cardDrop - 0.3) * 26) : 0
    const bob = 10 * Math.sin((t - T.flip[1]) * 2.4) * clamp(prog(t, T.flip[1], T.flip[1] + 0.4))
    const rot = (lerp(-14, 0, dk) + 3 * Math.sin((t - T.lift[0]) * 1.8) * lift) * D2R
    cy += bob - out * 120
    // glow behind once flipped
    const gk = clamp(prog(t, T.flip[1] - 0.05, T.flip[1] + 0.3)) * (1 - out)
    if (gk > 0) {
      const pulse = 1 + 0.07 * Math.sin((t - T.flip[1]) * 6.3)
      x.save(); x.globalCompositeOperation = 'lighter'
      const R = 520 * gk * pulse * lerp(1, 1.2, lift)
      const ag = x.createRadialGradient(cx, cy, 40, cx, cy, R)
      ag.addColorStop(0, rgba(GOLD, 0.55)); ag.addColorStop(0.5, rgba(PINK, 0.2)); ag.addColorStop(1, rgba(PINK, 0))
      x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
      x.translate(cx, cy); x.rotate((t - T.flip[1]) * 0.35)
      const rg = x.createRadialGradient(0, 0, 140, 0, 0, 700)
      rg.addColorStop(0, rgba('#ffd98a', 0.3 * gk)); rg.addColorStop(1, rgba('#ffd98a', 0))
      x.fillStyle = rg
      for (let r = 0; r < 10; r++) { x.rotate(TAU / 10); x.beginPath(); x.moveTo(0, 0); x.lineTo(-38, -700); x.lineTo(38, -700); x.closePath(); x.fill() }
      x.restore()
    }
    // a calm little clock halo orbiting the card at the end (the wait, now worth it)
    if (lift > 0) {
      const ck = easeOutBack(prog(t, T.lift[0] + 0.2, T.lift[0] + 0.6), 2) * (1 - out)
      clockFace(x, cx + w / 2 - 6, cy - hh / 2 + 10, 92, 140 + 380 + 6 * (t - T.lift[0]), t, { k: ck, a: clamp(ck * 2) })
      sparkle(x, cx + w / 2 - 6, cy - hh / 2 + 10, t, T.lift[0] + 0.3, { n: 8, R: 150, seed: 71, size: 22 })
    }
    const im = face ? talk : back
    if (ok(im) && out < 1) {
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(flipX * (1 + land), 1 - land)
      x.globalAlpha = clamp(prog(t, T.cardDrop, T.cardDrop + 0.08)) * (1 - out)
      x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 34; x.shadowOffsetY = 14
      const bw = face ? w : w * 0.93, bh2 = face ? hh : cardH(w) * 0.98
      x.drawImage(im, -bw / 2, -bh2 / 2, bw, bh2)
      x.restore()
    }
    sparkle(x, cx, cy, t, T.flip[1], { n: 14, R: 380, seed: 44, size: 30 })
    sparkle(x, cx, cy + 300, t, T.cardDrop + 0.3, { n: 9, R: 220, seed: 31, size: 24 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.sceneOut[1]) {
        drawDaySky(t)
        drawCity(t)
        drawThread(t)
        drawTurn(t)
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
function lerpC(a, b, k) { const A1 = h2r(a), B1 = h2r(b); return `rgb(${A1.map((v, i) => Math.round(lerp(v, B1[i], clamp(k)))).join(',')})` }

export const SCENES = [build]

// ── sound (pitched SFX are shifted into the film's key by the sound engine)
const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: each message lands with a bright two-note "ding", climbing
  ['whoosh', 0.04, 0.5, 0.03], ['glitter', 0.25, 0.9],
  ...MSGS.map((m, i) => ['pop', m.t, [783.99, 880, 987.77, 1046.5, 1174.66][i], 0.06, -0.2]),
  ...MSGS.map((m, i) => ['pluck', r3(m.t + 0.07), [1174.66, 1318.51, 1479.98, 1567.98, 1760][i], 0.04, 0.4, -0.2]),
  ...[1, 2, 3, 4, 5, 6].map(n => ['tick', r3(BEAT(n)), 0.03]),                                   // the clock, on the beat
  ...[0, 1, 2, 3, 4, 5].map(n => ['tick', r3(BEAT(6) + 0.04 + n * 0.14), 0.022]),               // ...then racing
  // Houston minutes
  ['whoosh', T.threadOut[0], 0.45, 0.045], ['pop', T.hou, 659.25, 0.05, 0],
  ['pluck', T.houLate, 783.99, 0.06, 0.6, 0], ['pop', T.houLate, 1046.5, 0.06, 0], ['glitter', T.houLate, r3(T.houLate + 0.6)],
  // the turn
  ['whoosh', T.phone[0], 0.5, 0.04], ...wordPops(T.turn, 3, 0.07, 2, 0.025),
  ['pluck', T.turnLate, 1046.5, 0.05, 0.6, 0], ['pop', r3(T.turnLate + 0.1), 1174.66, 0.05, 0.1],
  ['whoosh', r3(T.cardDrop - 0.2), 0.3, 0.03], ['pop', r3(T.cardDrop + 0.3), 523.25, 0.05, 0],
  ['whoosh', T.flip[0], 0.25, 0.035],
  ['bell', T.flip[1], 1046.5, 0.05, 2.0, 0], ['bell', r3(T.flip[1] + 0.07), 1567.98, 0.03, 2.0, 0.2], ['glitter', T.flip[1], r3(T.flip[1] + 0.8)],
  ...wordPops(T.sub + 0.1, 6, 0.07, 1, 0.02),
  // talk like you mean it
  ['whoosh', T.phoneOut[0], 0.45, 0.035], ...wordPops(T.end, 5, 0.07, 0, 0.026),
  ['bell', r3(T.end + 0.3), 783.99, 0.045, 1.8, 0], ['pop', r3(T.lift[0] + 0.25), 1318.51, 0.04, 0.3],
]
