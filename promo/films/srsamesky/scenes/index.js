// srsamesky — "Same moon. Never met." (Star Talk Remix of promo/films/samesky, 30 s vertical) · story 0–25.6, then the end card.
//   0.0–3.9   "Two people. Same city."  Houston at night (HOUSTON · 11:48 PM · STILL 84°F): a pixel skyline, two lit windows
//             far apart, one person alone in each. The gold star (THE STARS) looks from one to the other.
//   4.0–8.7   "Same moon."  Both look up at the moon at the same moment and sigh. ♌ LEO STAR (over the left window): "mine just
//             sighed at the moon." ♎ LIBRA STAR (over the right one): "...mine TOO." Double-take.
//   8.8–13.8  "Never met."  Both go back to swiping; the city's windows go dark one by one. LEO: "LOOK RIGHT!!" Both curtains
//             close at the same moment. Womp. Pisces cries on a rooftop. THE STARS: "fine. we'll do it."
//  13.93      card cut (flip).
//  14.0–20.85 "So the stars drew a line."  A chart wheel blooms round each window; little gold stars fly up into an arc from
//             Leo to Libra and a constellation line draws across the sky. "Push. Pull. Align." chips pop under it.
//             THE STARS: "the pull is real. the push? workable."
//  20.95–23.1 "Look up."  Both curtains open, both look up at the line, both windows turn gold. Heart eyes, happy sobbing.
//  23.15–25.5 "They might be, too."  The gold star winks; everything pops out by 25.5; the end card at 25.6.
// One canvas (sky + skyline + stars), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawTears } from './props.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)

export const T = {
  black: [0, 0.3],
  h1: 0.25, h1Land: 0.9, h1Out: [3.7, 3.9], chip: 0.7, chipOut: [8.5, 8.7],
  h2: 4.05, h2Land: 4.3, h2Out: [8.5, 8.7], lookUp: [4.2, 4.5], sigh: 4.6, lookDown: [8.6, 8.9], dbl: [6.95, 7.3],
  l2: 4.75, l3: 6.45, closeA: 8.7,
  h3: 8.85, h3Land: 9.15, h3Out: [13.55, 13.75], swipe: [8.95, 10.5], dark: [9.0, 11.2],
  l4: 9.2, curtain: [10.55, 10.9], womp: 10.9, l5: 11.35, closeB: 13.8, crick: [11.0, 12.9],
  cut1: BEAT(24),                                   // 13.933
  h4: 14.0, h4Land: 14.6, h4Out: [17.05, 17.25],
  wheels: 14.25, fly: [14.45, 15.0], line: [15.0, 16.4], lock: 16.45,
  h5: 17.3, h5Land: 18.5, h5Out: [20.6, 20.8], chips: [17.45, 17.95, 18.5], chipsOut: [20.45, 20.75],
  l7: 17.4, closeC: 20.85,
  h6: 20.95, h6Land: 21.25, h6Out: [22.9, 23.1], open: [20.95, 21.3], lookUp2: [21.35, 21.6], gold: 21.65, hearts: 21.95,
  h7: 23.15, h7Land: 23.7, h7Out: [25.2, 25.45], wink: 24.3,
  out: [25.05, 25.45],
}

// ── the dialogue
const STARS = 'THE STARS', LEO = '♌ LEO STAR', LIB = '♎ LIBRA STAR'
const LEOC = '#ffb35a', LIBC = '#f08ae6'
const LA_ = [
  { t: T.l2, speaker: LEO, color: LEOC, text: 'mine just sighed at the *moon.*' },
  { t: T.l3, speaker: LIB, color: LIBC, text: '...mine *TOO.*' },
]
const LB_ = [
  { t: T.l4, speaker: LEO, color: LEOC, text: 'LOOK *RIGHT!!*' },
  { t: T.l5, speaker: STARS, text: "fine. we'll *do it.*" },
]
const LC_ = [{ t: T.l7, speaker: STARS, text: 'the pull is *real.* the push? workable.' }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_]
const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const HOPS_OF = sp => talkHops(ALL_LINES, sp, { cps: CPS })
void LT

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the city: two hero windows, towers, little windows
const WL = { x: 250, y: 1095, w: 150, h: 170, lamp: '#ffb46a' }, WR = { x: 835, y: 1120, w: 150, h: 170, lamp: '#7fb0ff' }
const TOWERS = [[0, 135, 1290], [130, 372, 905], [380, 470, 1245], [470, 640, 1165], [640, 712, 1300], [714, 958, 935], [952, 1080, 1225]]
const SMALLWIN = (() => {
  const r = rng(4242), out = []
  for (const [a, b, top] of TOWERS) for (let y = top + 40; y < 1900; y += 58) for (let x = a + 18; x + 22 < b - 8; x += 40) {
    const hero = [WL, WR].some(H => Math.abs(x + 11 - H.x) < H.w / 2 + 26 && Math.abs(y + 15 - H.y) < H.h / 2 + 26)
    if (hero || r() < 0.45) continue
    out.push({ x, y, warm: r() < 0.6, off: T.dark[0] + r() * (T.dark[1] - T.dark[0]), back: T.open[0] + r() * 1.4 })
  }
  return out
})()

// ── the cast
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  leo: { ...signStar('leo'), seed: 11 },
  lib: { ...signStar('libra'), seed: 17 },
  pis: { ...signStar('pisces'), seed: 29 },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['pis', 'leo', 'lib', 'g0']
const LAY = {
  A: { g0: [540, 650, 196], pis: [556, 1105, 100] },
  B: { g0: [540, 640, 168], leo: [250, 830, 150], lib: [840, 868, 150], pis: [556, 1105, 100] },
  D: { g0: [545, 680, 150], leo: [250, 820, 140], lib: [840, 860, 140], pis: [556, 1105, 100] },
}
const SEG = [{ t: 0, L: LAY.A }, { t: T.h2, L: LAY.B, anim: 0.4 }, { t: T.cut1, L: LAY.D }]
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.03
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (cur && prev) { const e = ease.inOutCubic(p); return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 50, lerp(prev[2], cur[2], e)], pk: 1 } }
    if (cur) return { p: cur, pk: pop01(t, t0, 0.34, 2.2) }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, k === 'g0' ? 0.45 : 1.6, 0.4, 1.8)
  return { p: cur, pk }
}
// the constellation arc: Leo → the gold star → Libra (a quadratic Bézier)
const ARC = { a: [250, 820], c: [545, 520], b: [840, 860] }
const arcAt = u => [lerp(lerp(ARC.a[0], ARC.c[0], u), lerp(ARC.c[0], ARC.b[0], u), u), lerp(lerp(ARC.a[1], ARC.c[1], u), lerp(ARC.c[1], ARC.b[1], u), u)]
const MINI = [0.17, 0.33, 0.67, 0.83]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = (text, o) => popText(root, text, { wobble: true, late: 1, fit: true, ...o })
  const H1 = H('Two people. | Same *city.*', { top: 190, size: 112, accentSize: 156, at: T.h1, lateAt: T.h1Land, accentColor: GOLD })
  const H2 = H('Same *moon.*', { top: 215, size: 132, accentSize: 180, at: T.h2, lateAt: T.h2Land, accentColor: '#fff1c8' })
  const H3 = H('Never *met.*', { top: 215, size: 132, accentSize: 180, at: T.h3, lateAt: T.h3Land, accentColor: '#9aa3c7' })
  const H4 = H('So the stars | drew a *line.*', { top: 190, size: 108, accentSize: 150, at: T.h4, lateAt: T.h4Land, accentColor: GOLD })
  const H5 = H('Push. Pull. *Align.*', { top: 215, size: 108, accentSize: 150, at: T.h5, lateAt: T.h5Land, accentColor: GOLD, gap: 0.5 })
  const H6 = H('Look *up.*', { top: 215, size: 140, accentSize: 190, at: T.h6, lateAt: T.h6Land, accentColor: GOLD })
  const H7 = H('They might be, | *too.*', { top: 190, size: 116, accentSize: 170, at: T.h7, lateAt: T.h7Land, accentColor: GOLD, gap: 0.09 })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const chip = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '448px', textAlign: 'center', display: 'none' }, root)
  const chipIn = el('span', { display: 'inline-block', font: `700 28px ${MONO}`, letterSpacing: '0.12em', color: BONE, background: 'rgba(16,10,38,0.75)', padding: '8px 22px', border: '2px solid rgba(242,199,92,0.7)' }, chip, 'HOUSTON · 11:48 PM · STILL 84°F')
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1430, width: 960, height: 290, close, cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the skyline
  const lookUpK = t => clamp(prog(t, ...T.lookUp) - prog(t, ...T.lookDown) + prog(t, ...T.lookUp2))
  const curtainK = t => ease.inOutCubic(prog(t, ...T.curtain)) * (1 - ease.inOutCubic(prog(t, ...T.open)))
  const goldK = t => clamp(prog(t, T.gold, T.gold + 0.5))
  function drawCity(t) {
    // tower bodies
    for (const [a, b, top] of TOWERS) {
      const g = x.createLinearGradient(0, top, 0, 1920)
      g.addColorStop(0, '#1a1438'); g.addColorStop(1, '#0b0820')
      x.fillStyle = g; x.fillRect(a, top, b - a, 1920 - top)
      x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(a, top, b - a, 4)
    }
    // antenna on the tall left tower, blinking red
    x.fillStyle = '#2a2250'; x.fillRect(248, 820, 6, 86)
    if (Math.floor(t * 1.4) % 2 === 0) { x.fillStyle = '#ff4d6d'; x.fillRect(244, 812, 14, 14) }
    // little windows: lit, then going dark one by one, then back on at the end (gold)
    for (const w of SMALLWIN) {
      const on = t < w.off ? 1 : t >= w.back ? clamp((t - w.back) * 4) : 0
      x.fillStyle = on > 0 ? rgba(t >= w.back ? '#ffd27a' : w.warm ? '#ffc477' : '#8fb6ff', 0.25 + 0.5 * on) : 'rgba(40,32,80,0.6)'
      x.fillRect(w.x, w.y, 22, 30)
    }
    // freeway light trails along the bottom
    for (let i = 0; i < 26; i++) {
      const ph = (t * 0.22 + i / 26) % 1, xx = i % 2 ? ph * 1200 - 60 : 1140 - ph * 1200
      x.fillStyle = i % 2 ? 'rgba(255,90,90,0.75)' : 'rgba(255,240,200,0.8)'
      x.fillRect(xx, i % 2 ? 1858 : 1876, 46, 5)
    }
    heroWindow(t, WL, -1); heroWindow(t, WR, 1)
  }
  function heroWindow(t, Wn, side) {
    const { x: cx, y: cy, w, h } = Wn, X0 = cx - w / 2, Y0 = cy - h / 2
    const gk = goldK(t)
    // glow spill
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 260)
    const lamp = gk > 0 ? '#ffd27a' : Wn.lamp
    g.addColorStop(0, rgba(lamp, 0.22 + 0.25 * gk)); g.addColorStop(1, rgba(lamp, 0))
    x.fillStyle = g; x.fillRect(cx - 260, cy - 260, 520, 520)
    x.save(); x.beginPath(); x.rect(X0, Y0, w, h); x.clip()
    const bg = x.createLinearGradient(0, Y0, 0, Y0 + h)
    bg.addColorStop(0, rgba(lamp, 0.95)); bg.addColorStop(1, rgba(side < 0 ? '#c46a3a' : '#3a4fa8', 0.95))
    x.fillStyle = bg; x.fillRect(X0, Y0, w, h)
    // the person: head + shoulders, looking up when the moon's out
    const up = lookUpK(t), sighK = pulse(t, T.sigh, 0.6)
    const hx = cx + side * -8, hy = cy + 22 - up * 14 - sighK * 6
    x.fillStyle = '#1b1236'
    x.beginPath(); x.ellipse(cx, Y0 + h + 6, 54, 62, 0, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.arc(hx, hy, 27, 0, Math.PI * 2); x.fill()
    // phone glow while swiping
    const sw = t >= T.swipe[0] && t < T.swipe[1] ? 1 : 0
    if (sw) {
      x.fillStyle = rgba('#cfe0ff', 0.7 + 0.3 * Math.sin(t * 30)); x.fillRect(cx - 12, Y0 + h - 44, 24, 34)
      const g2 = x.createRadialGradient(cx, Y0 + h - 30, 0, cx, Y0 + h - 30, 70); g2.addColorStop(0, 'rgba(180,210,255,0.5)'); g2.addColorStop(1, 'rgba(180,210,255,0)'); x.fillStyle = g2; x.fillRect(X0, Y0, w, h)
    }
    // curtains
    const ck = curtainK(t)
    if (ck > 0) {
      x.fillStyle = side < 0 ? '#6b2a4a' : '#2a3a6b'
      x.fillRect(X0, Y0, w / 2 * ck, h); x.fillRect(X0 + w - w / 2 * ck, Y0, w / 2 * ck, h)
      x.fillStyle = 'rgba(0,0,0,0.25)'
      for (let i = 1; i < 4; i++) { x.fillRect(X0 + (w / 2 * ck) * i / 4, Y0, 3, h); x.fillRect(X0 + w - (w / 2 * ck) * i / 4, Y0, 3, h) }
    }
    x.restore()
    // frame
    x.strokeStyle = gk > 0 ? rgba(GOLD, 0.6 + 0.4 * gk) : '#2a2250'; x.lineWidth = 8; x.strokeRect(X0, Y0, w, h)
    x.fillStyle = gk > 0 ? GOLD : '#2a2250'; x.fillRect(cx - 3, Y0, 6, h); x.fillRect(X0, cy - 3, w, 6)
    // the sigh: a little puff rising
    const sp = prog(t, T.sigh, T.sigh + 1.0)
    if (sp > 0 && sp < 1) {
      x.save(); x.globalAlpha = Math.sin(Math.PI * sp) * 0.9; x.fillStyle = BONE
      for (let k = 0; k < 3; k++) { const s = 8 + k * 4; x.fillRect(Math.round(cx + side * 20 + k * 10 * side), Math.round(Y0 - 20 - sp * 70 - k * 22), s, s) }
      x.restore()
    }
  }

  // ─────────────────────────────── the charts, the arc, the reading chips
  function drawWheels(t) {
    const p = easeOutBack(prog(t, T.wheels, T.wheels + 0.6), 1.5)
    if (p <= 0) return
    const a = clamp(p) * (0.55 + 0.45 * goldK(t)) * popOut(t, T.out)
    for (const [Wn, rot] of [[WL, 1], [WR, -1]]) {
      x.save(); x.globalAlpha = a; x.translate(Wn.x, Wn.y); x.rotate(rot * t * 0.12); x.scale(p, p)
      x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 3
      x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.stroke()
      x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.stroke()
      for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(an) * 124, Math.sin(an) * 124); x.lineTo(Math.cos(an) * 150, Math.sin(an) * 150); x.stroke() }
      for (let i = 0; i < 4; i++) { const an = i * 1.7 + (rot > 0 ? 0.4 : 1.1); x.fillStyle = [GOLD, PINK, LAV, '#8fd8f6'][i]; x.fillRect(Math.cos(an) * 137 - 6, Math.sin(an) * 137 - 6, 12, 12) }
      x.restore()
    }
  }
  function drawArc(t) {
    const lp = ease.inOutCubic(prog(t, ...T.line))
    if (lp <= 0) return
    const k = popOut(t, T.out)
    x.save(); x.globalAlpha = k
    x.strokeStyle = rgba(GOLD, 0.9); x.lineWidth = 6; x.setLineDash([2, 14]); x.lineCap = 'round'
    x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 16 + 20 * pulse(t, T.lock, 0.6)
    x.beginPath()
    for (let i = 0; i <= 60; i++) { const u = i / 60 * lp, [px, py] = arcAt(u); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    x.setLineDash([])
    // spark at the leading end
    if (lp < 1) { const [px, py] = arcAt(lp); drawPixelStar(x, px, py, 36, 2, '#fff1c8') }
    x.restore()
  }
  function drawMini(t) {
    const k = popOut(t, T.out)
    MINI.forEach((u, i) => {
      const t0 = T.fly[0] + i * 0.1, p = prog(t, t0, t0 + 0.45)
      if (p <= 0) return
      const [tx, ty] = arcAt(u), e = ease.outCubic(p)
      const px = lerp(545, tx, e), py = lerp(680, ty, e) - Math.sin(Math.PI * p) * 80
      const lit = t >= T.line[0] + u * (T.line[1] - T.line[0])
      drawStarChar(x, px, py, 64, t, { color: ['#ffe08a', '#f5b85a', '#ffe08a', '#f5b85a'][i], mood: t >= T.hearts ? 'heart' : lit ? 'happy' : 'wide', look: [0, 0], seed: 40 + i, pop: easeOutBack(clamp(p * 1.4), 2) * k, hops: [T.lock + i * 0.05, T.gold + i * 0.04], glow: 0.9 })
    })
  }
  const CHIPS = [['PUSH', READING.push], ['PULL', READING.pull], ['ALIGN', READING.align]]
  function drawChips(t) {
    const o = 1 - prog(t, ...T.chipsOut)
    if (o <= 0 || t < T.chips[0]) return
    CHIPS.forEach(([txt, col], i) => {
      const p = easeOutBack(prog(t, T.chips[i], T.chips[i] + 0.35), 2.4)
      if (p <= 0) return
      const cx = 300 + i * 240, cy = 1330
      x.save(); x.translate(cx, cy); x.scale(p * o, p * o)
      x.font = `700 40px ${MONO}`; const tw = x.measureText(txt).width
      x.fillStyle = '#140c2c'; x.fillRect(-tw / 2 - 26, -36, tw + 52, 72)
      x.fillStyle = col; x.fillRect(-tw / 2 - 20, -30, tw + 40, 60)
      x.fillStyle = '#1b1236'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4]) }
    x.restore()
  }

  // ─────────────────────────────── the cast
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  const HOPS = {
    g0: [...HOPS_OF(STARS), T.lock, T.gold, T.h7Land],
    leo: [...HOPS_OF(LEO), T.l4 + 0.25, T.l4 + 0.55, T.lock, T.gold],
    lib: [...HOPS_OF(LIB), T.l4 + 0.3, T.lock + 0.05, T.gold + 0.05],
    pis: [T.gold + 0.1, T.h7Land],
  }
  function stateOf(k, t, p) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0
    if (t < T.h2) {                                    // two windows: the gold star looks from one to the other
      look = t < 1.8 ? [-1, 1] : t < 2.9 ? [1, 1] : [0, 0]
      if (k === 'g0' && t >= 2.9) mood = 'squint'
    } else if (t < T.h3) {                             // same moon
      look = k === 'leo' ? toward(p, WL.x, WL.y) : k === 'lib' ? toward(p, WR.x, WR.y) : [1, -1]
      if (t >= T.lookUp[0] && t < T.l2) { look = [1, -1]; mood = 'sparkle' }
      if (k === 'leo' && t >= T.l2 && t < T.l3) { look = [0, 0]; mood = 'sparkle' }
      if (t >= T.dbl[0]) { mood = 'wide'; blink = false; look = k === 'leo' ? [1, 0] : k === 'lib' ? [-1, 0] : [0, 0] }
      if (k === 'g0' && t >= T.l3) { mood = 'heart' }
      if (t >= T.dbl[0] + 0.6 && (k === 'leo' || k === 'lib')) { mood = 'heart'; blink = undefined }
    } else if (t < T.cut1) {                           // never met
      look = k === 'leo' ? toward(p, WL.x, WL.y) : k === 'lib' ? toward(p, WR.x, WR.y) : [0, 1]
      mood = 'squint'
      if (k === 'leo' && t >= T.l4 && t < T.curtain[0]) { mood = 'wide'; look = [1, 0]; dx = 30 * Math.sin((t - T.l4) * 18) * Math.exp(-(t - T.l4) * 1.5) }
      if (k === 'lib' && t >= T.l4 && t < T.curtain[0]) { mood = 'wide'; look = [-1, 0] }
      if (t >= T.womp) { mood = 'neutral'; look = [0, 0]; squash = 0.22 * Math.exp(-(t - T.womp) * 3) + 0.06; for (const c of T.crick) { const b = t - (c + p[0] / W * 0.3); if (b >= 0 && b < 0.13) blink = 1 } }
      if (k === 'g0' && t >= T.l5) { mood = 'squint'; look = [0, 0]; squash = 0 }
      if (k === 'pis') tears = t >= T.womp ? 1 : 0.4
    } else if (t < T.h6) {                             // the line
      look = [0, 0]; mood = t < T.lock ? 'wide' : 'happy'
      if (k === 'leo') look = [1, -1]
      if (k === 'lib') look = [-1, -1]
      if (k === 'g0' && t >= T.l7) { mood = 'wink' }
      if (k === 'pis') tears = 0.5
    } else {                                           // look up
      look = k === 'leo' ? toward(p, WL.x, WL.y) : k === 'lib' ? toward(p, WR.x, WR.y) : [0, 1]
      mood = 'wide'
      if (t >= T.hearts + p[0] / W * 0.15) mood = 'heart'
      if (t >= T.h7) { mood = 'happy'; look = [0, 0] }
      if (k === 'g0' && t >= T.wink) mood = 'wink'
      if (k === 'pis') tears = t >= T.gold ? 1 : 0.5
    }
    return { mood, look, blink, squash, dx, dy, tears }
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) {
      const P = place(k, t)
      if (!P) continue
      const p = P.p, pk = P.pk * ok
      if (pk <= 0.02) continue
      const C = CAST[k], st = stateOf(k, t, p)
      const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * 0.04 })
      if (st.tears > 0) { const S = R.size, ey = R.y + S * 0.07, exo = S * 0.17; drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears }) }
    }
  }

  function drawWorld(t) {
    const moonK = pulse(t, T.lookUp[0], 4.2)
    drawSky(x, t, { ...SKY_H, moon: { ...SKY_H.moon, r: SKY_H.moon.r * (1 + 0.5 * moonK) }, dim: lerp(0.4, SKY_H.dim, clamp(prog(t, T.cut1 - 0.1, T.cut1 + 0.2))) })
    if (moonK > 0) { const m = SKY_H.moon, g = x.createRadialGradient(m.x, m.y, 0, m.x, m.y, 360); g.addColorStop(0, rgba('#fff1c8', 0.3 * moonK)); g.addColorStop(1, rgba('#fff1c8', 0)); x.fillStyle = g; x.fillRect(m.x - 360, m.y - 360, 720, 720) }
    // the city haze
    const g = x.createLinearGradient(0, 900, 0, 1920); g.addColorStop(0, 'rgba(255,150,120,0)'); g.addColorStop(1, 'rgba(255,150,120,0.12)'); x.fillStyle = g; x.fillRect(0, 900, W, 1020)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      drawArc(t)
      drawCity(t)
      drawWheels(t)
      if (t < T.out[1] + 0.02) {
        drawCast(t)
        drawMini(t)
        drawChips(t)
        sparkles(t, 545, 680, T.lock, 14, 360, 0.3, 0.8, 30)
        sparkles(t, WL.x, WL.y, T.gold, 10, 200, 0.2, 0.7, 24)
        sparkles(t, WR.x, WR.y, T.gold + 0.05, 10, 200, 1.2, 0.7, 24)
      }
      const cO = t < T.chip ? 0 : outK(t, T.chipOut)
      chip.style.display = cO > 0 ? 'block' : 'none'
      if (cO > 0) { const p = easeOutBack(prog(t, T.chip, T.chip + 0.35), 2); chipIn.style.transform = `scale(${(0.5 + 0.5 * p).toFixed(3)})`; chip.style.opacity = String(clamp(p * 3) * cO) }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the middle one: 13.93 flip). 3.95 and 20.9 stay inert.
export const CUTS = [3.95, { t: T.cut1, kind: 'flip' }, 20.9]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are moved into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, gap = 0.07) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.02) => [['pop', r3(t0), 659.25, gain, 0], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, 0], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, 0]]
const womp = t0 => [['pop', r3(t0), 392, 0.04, 0], ['pop', r3(t0 + 0.18), 369.99, 0.036, 0], ['pop', r3(t0 + 0.36), 349.23, 0.034, 0], ['pluck', r3(t0 + 0.54), 293.66, 0.04, 1.2, 0]]
const PITCH = { [STARS]: 880, [LEO]: 659.25, [LIB]: 987.77 }

export const CUES = [
  ...head(T.h1, 3, T.h1Land, 0), ['tick', T.chip, 0.03],
  ...head(T.h2, 1, T.h2Land, 2), ['bell', T.lookUp[0], 1318.51, 0.035, 2.2, 0.3], ['glitter', T.lookUp[0], r3(T.lookUp[0] + 0.8)],
  ['whoosh', T.sigh, 0.5, 0.03],
  ['whoosh', r3(T.dbl[0] + 0.02), 0.12, 0.05], ['whoosh', r3(T.dbl[0] + 0.18), 0.1, 0.04], ['pop', T.dbl[1], 1174.66, 0.04, 0], ['bell', r3(T.dbl[1] + 0.02), 1318.51, 0.02, 0.6, 0],
  ...head(T.h3, 1, T.h3Land, 4),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.swipe[0] + 0.1 + i * 0.15), 0.016]),
  ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.dark[0] + i * 0.27), 300 - i * 12, 0.012, (i % 2 ? 0.4 : -0.4)]),
  ['whoosh', T.curtain[0], 0.35, 0.05], ['tick', T.curtain[1], 0.05], ...womp(T.womp),
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.011)]),
  ...sob(r3(T.womp + 0.6)),
  ...head(T.h4, 4, T.h4Land, 0),
  ['bell', T.wheels, 880, 0.03, 1.4, -0.3], ['bell', r3(T.wheels + 0.08), 1174.66, 0.03, 1.4, 0.3],
  ...MINI.map((_, i) => ['pop', r3(T.fly[0] + i * 0.1 + 0.3), NOTE[i + 2], 0.03, (i - 1.5) * 0.25]),
  ['riser', T.line[0], T.lock, 0.03], ['glitter', T.line[0], T.line[1]],
  ['boom', T.lock, 0.15], ['bell', T.lock, 1760, 0.04, 2, 0], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['pluck', r3(T.lock + i * 0.01), f, 0.03, 1.2, (i - 1.5) * 0.2]),
  ...head(T.h5, 2, T.h5Land, 1, 0.026, 0.5),
  ...T.chips.map((c, i) => ['pop', c, NOTE[2 + i * 2], 0.04, (i - 1) * 0.3]),
  ['whoosh', T.chipsOut[0], 0.3, 0.03],
  ...head(T.h6, 1, T.h6Land, 3), ['whoosh', T.open[0], 0.35, 0.04],
  ['bell', T.gold, 1318.51, 0.04, 1.6, -0.3], ['bell', r3(T.gold + 0.05), 1567.98, 0.04, 1.6, 0.3], ['glitter', T.gold, r3(T.gold + 0.6)],
  ['whoosh', r3(T.hearts + 0.3), 0.6, 0.04], ...sob(r3(T.hearts + 0.3), 0.016),
  ...head(T.h7, 3, T.h7Land, 1), ['bell', r3(T.h7Land + 0.02), 1760, 0.03, 1.6, 0],
  ['tick', T.wink, 0.04], ['pluck', r3(T.wink + 0.02), 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
