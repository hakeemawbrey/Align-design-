// st4newmoon (EP 091, 20 s vertical, Star Talk season 4, thread G: sky lessons) · story 0–15.6, then the shared end card.
//   0.00–5.90  "Every new moon | is a *fresh start.*"  The pale Moon star floats in front of its big pixel moon. The lit
//              crescent shrinks away until the disc is dark (a new moon: only a faint earthshine rim). The star leans in
//              and whispers. Box (☽ THE MOON, whispering): "new moons are for *starting* things."
//   6.00–11.5  "One wish. | *One* line."  Box: "write what you want in love. *one* line."  The moon scoots to the corner
//              and a blank card rises: WHAT I WANT IN LOVE. A pixel pencil writes, on one ruled line,
//              "someone who shows up."  The star goes heart-eyed. (Ghost: leans out past the card's left edge.)
//  11.75       card cut (flip).
//  11.85–15.5  "Start with | *one* line."  The moon is back, and a thin new crescent starts to glow on its right side
//              (the waxing begins); the card floats in the star's lap. Everything pops out by 15.5.
// Astrology: the new moon (Sun and Moon conjunct, about once a month) is the traditional time to set an intention.
// One canvas (sky + moon + card + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 91
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [5.7, 5.9],
  moonIn: 0.2, starIn: 0.45, dark: [1.0, 2.6], lean: [2.45, 2.85], open: 2.66, l1: BEAT(4),     // 2.82
  h1: 6.0, h1Land: 6.4, l2: BEAT(10),                                                            // 6.16
  scoot: [7.75, 8.25], cardUp: [7.85, 8.4], write: [8.65, 10.15], done: 10.25, close: 10.6,
  ghost: 10.0, cardOut: [11.25, 11.55], h1Out: [11.35, 11.55],
  cut: 11.75,
  h2: 11.85, h2Land: 12.25, wax: [12.3, 13.6], heart: 13.7, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const MOON_TAG = '☽ THE MOON (WHISPERING)'
const LINES = [
  { t: T.l1, speaker: MOON_TAG, color: MOONLIGHT, text: 'new moons are for *starting* things.' },
  { t: T.l2, speaker: MOON_TAG, color: MOONLIGHT, text: 'write what you want in love. *one* line.' },
]
const CPS = 26                                  // a whisper: a touch slower
const LT = lineTimes(LINES, { cps: CPS })
const WISH = ['someone who', 'shows up.']
const WISH_N = WISH.join('').length

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
// the pencil (points down-left): Y = body, P = pink eraser, W = wood, L = lead
const PENCIL = BMP(`......PP ......PP .....YY. ....YY.. ...YY... ..YY.... .WW..... LW......`)
function bits(x, bm, cx, cy, cell, col, { a = 1, cols = {} } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy))
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || col; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// placements
const HOME = { x: 540, y: 930, s: 1 }, CORNER = { x: 190, y: 700, s: 0.42 }
const MOON_R = 250
const STAR_OFF = { x: 0, y: 70, size: 290 }
const CARD = { x: 610, y: 960, w: 560, h: 760 }
const LAP = { x: 700, y: 1470, w: 400 }          // the card in the last beat
const STAR_HOPS = [T.starIn + 0.4, ...talkHops(LINES, MOON_TAG, { cps: CPS }), T.done + 0.05, T.h2Land, T.heart + 0.1]

// lit fraction of the moon (0 = new). Before: a waning crescent lit on the LEFT; after the cut: a waxing one on the RIGHT.
function phase(t) {
  if (t < T.cut) return { f: 0.32 * (1 - ease.inOutCubic(prog(t, ...T.dark))), side: -1 }
  return { f: 0.14 * ease.outCubic(prog(t, ...T.wax)), side: 1 }
}

function starState(t) {
  if (t < T.dark[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.dark[1] - 0.2) return { mood: 'wide', look: [-1, -1] }               // watches the light go out
  if (t < T.l1) return { mood: 'squint', look: [0, 0] }                           // leans in: psst
  if (t < LT[0].done + 0.3) return { mood: 'squint', look: [0, 0] }
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (t < LT[1].done) return { mood: 'neutral', look: [0, 0] }
  if (t < T.scoot[0]) return { mood: 'wink', look: [0, 0] }
  if (t < T.done) return { mood: 'wide', look: [1, 1] }                          // watches the pencil
  if (t < T.cut) return { mood: 'heart' }
  if (t < T.heart) return { mood: t < T.wax[0] + 0.4 ? 'wide' : 'sparkle', look: [1, -1] }
  return { mood: t < T.heart + 1.0 ? 'heart' : 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 116px Inter", "800 44px Inter", "italic 500 170px 'EB Garamond'", "italic 500 70px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Every new moon | is a *fresh start.*', { top: 200, size: 108, accentSize: 150, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: MOONLIGHT })
  const H1 = popText(root, 'One wish. | *One* line.', { top: 210, size: 124, accentSize: 176, at: T.h1, late: 0, wobble: true, gap: 0.12, accentColor: GOLD })
  const H2 = popText(root, 'Start with | *one* line.', { top: 200, size: 130, accentSize: 186, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: MOONLIGHT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function place(t) {
    if (t >= T.cut) return HOME
    const e = ease.inOutCubic(prog(t, ...T.scoot))
    return { x: lerp(HOME.x, CORNER.x, e), y: lerp(HOME.y, CORNER.y, e) - Math.sin(Math.PI * e) * 80, s: lerp(HOME.s, CORNER.s, e) }
  }

  // ── the moon: a 30-cell pixel disc. Lit cells past the terminator; the rest dark, with an earthshine rim.
  const CG = 30
  const CRATERS = [[-0.42, -0.2, 0.16], [0.3, 0.38, 0.13], [0.12, -0.5, 0.1], [-0.18, 0.55, 0.09], [0.52, -0.1, 0.08]]
  function drawMoonDisc(t, cx, cy, R) {
    const { f, side } = phase(t)
    const c = Math.max(2, Math.round(2 * R / CG)), h = CG / 2
    const ox = Math.round(cx - h * c), oy = Math.round(cy - h * c)
    // halo: bright while lit, a faint lavender ring when new
    glow(cx, cy, R * 1.9, MOONLIGHT, 0.25 + 1.6 * f)
    x.save(); x.strokeStyle = rgba(LAV, 0.35 + 0.15 * Math.sin(t * 1.7)); x.lineWidth = 3
    x.beginPath(); x.arc(cx, cy, R + c * 0.9, 0, Math.PI * 2); x.stroke(); x.restore()
    for (let j = -1; j <= CG; j++) for (let i = -1; i <= CG; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) {
        if (d < 1 + 1.4 / h) { x.fillStyle = '#2a1f5a'; x.fillRect(ox + i * c, oy + j * c, c, c) }
        continue
      }
      const term = Math.sqrt(Math.max(0, 1 - v * v)) * (1 - 2 * f)
      const lit = f > 0.004 && (side > 0 ? u > term : u < -term)
      const crater = CRATERS.some(([a, b, r]) => Math.hypot(u - a, v - b) < r)
      let col
      if (lit) col = crater ? '#d6cdf2' : (u * side > 0.75 && v < 0 ? '#fffbea' : '#f1ecff')
      else {
        col = crater ? '#130e2c' : '#1b1540'
        if (d > 0.9) col = '#2e2566'                                  // earthshine on the rim
        else if (u + v < -0.9) col = '#241c4f'
      }
      x.fillStyle = col; x.fillRect(ox + i * c, oy + j * c, c, c)
    }
  }
  function drawMoon(t) {
    const ok = popOut(t, T.out)
    let pk = pop01(t, T.moonIn, 0.5, 1.6)
    if (t >= T.cut) pk = pop01(t, T.cut + 0.1, 0.42, 1.8)
    pk *= ok
    if (pk <= 0.01) return
    const P = place(t), bob = Math.sin(t * 1.6) * 10 * P.s
    const cx = P.x, cy = P.y + bob - 40 * P.s
    drawMoonDisc(t, cx, cy, MOON_R * P.s * pk)
    // the star in front of it
    const st = starState(t)
    const lean = t > T.lean[0] && t < T.lean[1] + 2.4 ? 0.07 * Math.sin(Math.PI * clamp(prog(t, T.lean[0], T.lean[1]))) : 0
    const dim = t < T.cut ? lerp(1.1, 0.7, ease.inOutCubic(prog(t, ...T.dark))) : 1.1
    const sk = drawStarChar(x, cx + STAR_OFF.x * P.s, cy + STAR_OFF.y * P.s, STAR_OFF.size * P.s * pk, t, { color: MOONC, glyph: P.s > 0.6 ? '☽' : null, ...st, squash: lean, hops: STAR_HOPS, seed: 7, glow: dim, blush: st.mood === 'happy' || st.mood === 'heart' || st.mood === 'squint' ? 1 : undefined })
    // the whisper: three soft dots puff up from the star's side while it says the first line
    if (t > T.l1 - 0.1 && t < LT[0].done + 0.6 && P.s > 0.8) {
      for (let i = 0; i < 3; i++) {
        const p = ((t - T.l1) * 0.9 + i / 3) % 1
        x.fillStyle = rgba(MOONLIGHT, 0.75 * Math.sin(Math.PI * p))
        const q = 8 + i * 3
        x.fillRect(Math.round(cx + 165 + p * 70), Math.round(sk.top + 70 - p * 90 - i * 14), q, q)
      }
    }
  }

  // ── the card: WHAT I WANT IN LOVE, one ruled line, written in by a pencil
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function wishShown(t) { return Math.floor(clamp(prog(t, ...T.write)) * WISH_N + 0.001) }
  function drawFace(t, w, h, { pencil = true } = {}) {
    const s = w / CARD.w
    x.save(); x.shadowColor = rgba(MOONLIGHT, 0.55); x.shadowBlur = 50 * s
    rr(-w / 2, -h / 2, w, h, 28 * s); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1858'); g.addColorStop(1, '#160c34'); x.fillStyle = g; x.fill()
    x.restore()
    x.lineWidth = 5 * s; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 28 * s); x.stroke()
    x.lineWidth = 2 * s; x.strokeStyle = rgba(BONE, 0.35); rr(-w / 2 + 16 * s, -h / 2 + 16 * s, w - 32 * s, h - 32 * s, 18 * s); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    // a tiny new moon at the top
    x.fillStyle = '#1b1540'; x.strokeStyle = rgba(LAV, 0.8); x.lineWidth = 3 * s
    x.beginPath(); x.arc(0, -h / 2 + 92 * s, 30 * s, 0, Math.PI * 2); x.fill(); x.stroke()
    x.font = `700 ${Math.round(26 * s)}px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.letterSpacing = `${Math.round(5 * s)}px`
    x.fillText('WHAT I WANT', 3 * s, -h / 2 + 170 * s); x.fillText('IN LOVE', 3 * s, -h / 2 + 208 * s); x.letterSpacing = '0px'
    // the ruled lines (only the first one matters)
    const lines = [-h / 2 + 360 * s, -h / 2 + 460 * s, -h / 2 + 560 * s]
    lines.forEach((ly, i) => { x.fillStyle = rgba(i === 0 ? GOLD : BONE, i === 0 ? 0.7 : 0.16); x.fillRect(-w / 2 + 56 * s, ly, w - 112 * s, 3 * s) })
    x.font = `700 ${Math.round(22 * s)}px ${MONO}`; x.fillStyle = rgba(GOLD, 0.8); x.textAlign = 'left'
    x.fillText('1.', -w / 2 + 50 * s, lines[0] - 110 * s)
    // the handwriting
    const n = wishShown(t)
    x.font = `italic 500 ${Math.round(70 * s)}px ${SERIF}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    const a = WISH[0].slice(0, n), b = WISH[1].slice(0, Math.max(0, n - WISH[0].length))
    x.fillText(a, 0, lines[0] - 64 * s)
    x.fillText(b, 0, lines[0] - 8 * s)
    // pencil tip follows the last letter
    if (pencil && t > T.write[0] - 0.3 && t < T.done + 0.5) {
      const row = n > WISH[0].length ? 1 : 0, str = row ? b : a, full = WISH[row]
      x.font = `italic 500 ${Math.round(70 * s)}px ${SERIF}`
      const fw = x.measureText(full).width, pw = x.measureText(str).width
      const wig = t < T.write[1] ? Math.sin(t * 40) * 4 : 0
      const px = -fw / 2 + pw + 26, py = lines[0] - (row ? 8 : 64) * s - 40 + wig
      bits(x, PENCIL, px + 22, py - 20, 7 * s, '#ffd24a', { a: clamp(prog(t, T.write[0] - 0.3, T.write[0])) * (1 - prog(t, T.done + 0.2, T.done + 0.5)), cols: { P: PINK, W: '#e8c49a', L: INK } })
    }
    // a little ✓ once it's written
    const ck = pop01(t, T.done, 0.3, 2.4)
    if (ck > 0.01 && pencil) {
      x.save(); x.translate(w / 2 - 92 * s, h / 2 - 110 * s); x.scale(ck, ck); x.rotate(-0.12)
      x.font = `700 ${Math.round(24 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lbl = 'ONE LINE ✓', tw = x.measureText(lbl).width + 34 * s
      rr(-tw / 2, -26 * s, tw, 52 * s, 26 * s); x.fillStyle = 'rgba(16,40,30,0.92)'; x.fill(); x.lineWidth = 3 * s; x.strokeStyle = '#7fe0b8'; x.stroke()
      x.fillStyle = '#7fe0b8'; x.fillText(lbl, 0, 2 * s); x.restore()
    }
  }
  function cardBox(t) {
    if (t < T.cut) {
      if (t < T.cardUp[0] || t > T.cardOut[1]) return null
      const up = easeOutBack(prog(t, ...T.cardUp), 1.3), o = ease.inCubic(prog(t, ...T.cardOut))
      return { cx: CARD.x, cy: lerp(2300, CARD.y, up) + Math.sin(t * 1.8) * 6 - o * 180, w: CARD.w * (1 - 0.7 * o), rot: lerp(0.1, -0.03, up), a: 1 - o }
    }
    const k = pop01(t, T.h2Land + 0.3, 0.45, 1.7) * popOut(t, T.out)
    if (k <= 0.01) return null
    return { cx: LAP.x, cy: LAP.y + Math.sin(t * 2) * 8, w: LAP.w * k, rot: 0.08, a: 1 }
  }
  function drawCard(t) {
    const B = cardBox(t)
    if (!B) return null
    const h = B.w * CARD.h / CARD.w
    x.save(); x.translate(B.cx, B.cy); x.rotate(B.rot); x.globalAlpha = B.a
    drawFace(t >= T.cut ? T.done + 1 : t, B.w, h, { pencil: t < T.cut })
    x.restore()
    return { left: B.cx - B.w / 2, top: B.cy - h / 2, h }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MOONLIGHT, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.18, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * 360 + Math.sin(p * 7 + i) * 14, cy - p * 260, 6 + (i % 3), [PINK, '#ff4f86', MOONLIGHT][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        if (t < T.cut) { drawMoon(t); const C = drawCard(t); if (C) drawGhostCameo(x, t, { x: C.left + 4, y: C.top + C.h * 0.56, at: T.ghost, dur: 1.25, from: 'right', cell: 3 }) }
        else { drawMoon(t); drawCard(t) }
        sparkles(t, CARD.x, CARD.y, T.done, 12, 320, 2)
        sparkles(t, HOME.x, HOME.y - 40, T.wax[0] + 0.6, 12, 300, 3, [GOLD, BONE, MOONLIGHT])
        floatHearts(t, HOME.x, HOME.y + 60, T.heart, T.heart + 0.9)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.8 (inert: the moon scoots aside on its own as the card rises), 11.75 (box shut → last line).
const CUTS = [7.8, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.1, 0, 0.022), ['pop', T.h0Land, 1046.5, 0.045, 0], ['pop', T.h0Land + 0.14, 1174.66, 0.04, 0], ['bell', T.h0Land, 1567.98, 0.025, 1.6, 0],
  ['glitter', T.moonIn, T.moonIn + 0.6],
  // the light goes out: a slow falling run
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.dark[0] + i * 0.27).toFixed(3), NOTE[6 - i], 0.016, 0]),
  ['whoosh', T.dark[0] + 0.2, 1.2, 0.02],
  ['tick', T.lean[0] + 0.1, 0.025],
  ['pop', T.open, 659.25, 0.03, 0], ['pop', T.open + 0.06, 880, 0.024, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MOON_TAG]: 700 }, gain: 0.012 }),
  ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  // the card
  ['whoosh', T.scoot[0], 0.45, 0.032], ['whoosh', T.cardUp[0], 0.4, 0.03], ['bell', T.cardUp[1], 1318.51, 0.03, 1.4, 0],
  ...Array.from({ length: WISH_N }, (_, i) => ['tick', +(T.write[0] + (i + 0.5) * (T.write[1] - T.write[0]) / WISH_N).toFixed(3), 0.022]),
  ['pluck', T.done, 1567.98, 0.04, 0.7, 0], ['glitter', T.done, T.done + 0.5], ['pop', T.done + 0.05, 1046.5, 0.035, 0],
  ['pop', T.close, 880, 0.028, 0], ['pop', T.close + 0.07, 587.33, 0.028, 0],
  ['tick', T.ghost + 0.05, 0.014],
  ['whoosh', T.cardOut[0], 0.3, 0.028],
  // start with one line: the crescent comes back
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pop', T.h2Land + 0.12, 1174.66, 0.045, 0], ['pluck', T.h2Land, 1046.5, 0.04, 0.7, 0],
  ['bell', T.wax[0] + 0.6, 1318.51, 0.035, 2.0, 0], ['glitter', T.wax[0] + 0.6, T.wax[0] + 1.2],
  ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.heart + i * 0.18 + 0.3).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.012, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
