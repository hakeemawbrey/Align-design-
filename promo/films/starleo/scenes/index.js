// starleo (15 s vertical Align ad, Star Talk #3) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–5.80  "Dear *Leo…*"  A spotlight clunks on. The ♌ star pops into it wearing a tiny pixel crown, a little hand
//              mirror floats in, the star turns to its reflection and goes heart-eyed at itself (pixel hearts float up).
//              Drop (2.82): the box opens. THE STARS: "you're amazing. we know. we made you." → sparkle, proud hops, wink.
//   5.80–8.60  "Love is a | *duet.*"  THE STARS: "now let them talk about *their* day." → wide eyes, the mirror poofs, the
//              spotlight widens, an ♒ Aquarius star (Leo's opposite sign) drops in beside it. The Aquarius star talks
//              (a pixel "…" bubble) and the Leo star listens and nods.
//   8.60–10.5  box shut · "Share the | *spotlight.*"  The Leo star hops its crown over onto the other star's head, then
//              goes heart-eyed at THEM. Both glow. Everything pops out by 10.45.
//   10.45→     plain sky; the end card takes over at 10.6.
// One canvas (sky + spotlight + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LEO = signStar('leo'), AQU = signStar('aquarius')
const ORANGE = LEO.color

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.6, 5.78],
  spot: 0.3, leoIn: 0.5, glint: 1.0, mirrorIn: 1.05, glance: 1.4, heart: 1.62,
  open: 2.66, l1: BEAT(4) + 0.02,                                       // the drop: 2.82
  sparkle: 3.35, proud: 3.75, wink: [4.25, 4.75],
  h1: 5.86, h1Land: 6.28, l2: 6.0, gasp: 6.62, poof: 6.95, widen: [7.05, 7.75], aquIn: 7.35, meet: 7.75,
  chat: [8.0, 8.5], nods: [8.06, 8.36], close: 8.5, h1Out: [8.36, 8.54],
  h2: 8.66, h2Land: 9.06, crown: [9.3, 9.78], blushAqu: 9.8, heartAt: 9.88, h2Out: [10.2, 10.42], out: [10.08, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you're amazing. we know. we made you." },
  { t: T.l2, speaker: SPEAK, text: 'now let them talk about *their* day.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
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
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── pixel bits (crown, mirror, hearts, speech bubble), drawn as cells
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// the star's own squash (mirrors startalk's hop/breathe maths) so the crown stays seated on the tip
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** where the upper tip of a drawStarChar really is this frame (with its squash) */
function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 }) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

// ── layout
const SOLO = { x: 540, y: 1000, size: 336 }
const DUO_L = { x: 330, y: 1010, size: 300 }, DUO_R = { x: 760, y: 1010, size: 288 }
const POOL_Y = 1250, LOW = 190            // after the box shuts (under the 8.62 cut) the stage drops into the freed space
const lowK = t => ease.inOutCubic(prog(t, 8.57, 8.67))
const MIRROR = { x: 845, y: 925 }

const LEO_HOPS = [T.leoIn + 0.3, ...talkHops(LINES.slice(0, 1), SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3), T.h2Land, T.crown[0]]
const AQU_HOPS = [T.aquIn + 0.24, 8.04, 8.3, T.blushAqu]

function leoState(t) {
  if (t < T.glance) return { mood: 'happy', look: [0, 0] }
  if (t < T.heart) return { mood: 'neutral', look: [1, 0], blink: false }
  if (t < T.l1 + 0.1) return { mood: 'heart' }
  if (t < T.sparkle) return { mood: 'wide', look: [0, -1], blink: false }        // "you're amazing" … oh?
  if (t < T.wink[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.gasp) return { mood: 'happy' }
  if (t < T.poof + 0.15) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.meet) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.h2) return { mood: 'neutral', look: [1, 0] }
  if (t < T.heartAt) return { mood: 'happy' }
  return { mood: 'heart' }
}
function aquState(t) {
  if (t < T.meet) return { mood: 'neutral', look: [-1, 0], blink: false }
  if (t < T.chat[1] + 0.1) return { mood: 'happy' }
  if (t < T.blushAqu) return { mood: 'neutral', look: [-1, -1] }   // looks up at the crown arriving
  return { mood: 'happy', blush: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Leo…*', { top: 250, size: 140, accentSize: 200, at: T.h0, gap: 0.12, accentColor: ORANGE, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Love is a | *duet.*', { top: 200, size: 124, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#7fdcff' })
  const H2 = popText(root, 'Share the | *spotlight.*', { top: 200, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // spotlight: on (with a flicker), widens for two, fades at the end
  function spotState(t) {
    const k = t - T.spot
    let on = k < 0 ? 0 : k < 0.05 ? 1 : k < 0.1 ? 0.25 : k < 0.16 ? 1 : 1
    on *= 1 - ease.inQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
    const wd = easeOutBack(prog(t, ...T.widen), 1.4)
    return { on, R: lerp(250, 520, wd), wd }
  }
  function drawSpot(t) {
    const { on, R } = spotState(t)
    if (on <= 0) return
    const top = -140, tw = lerp(60, 110, R / 520), PY = POOL_Y + LOW * lowK(t)
    x.save(); x.globalCompositeOperation = 'lighter'
    // beam
    const g = x.createLinearGradient(0, top, 0, PY + 40)
    g.addColorStop(0, `rgba(255,236,190,${0.2 * on})`); g.addColorStop(0.55, `rgba(255,214,150,${0.1 * on})`); g.addColorStop(0.9, `rgba(255,190,120,${0.13 * on})`); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g
    x.beginPath(); x.moveTo(540 - tw, top); x.lineTo(540 + tw, top); x.lineTo(540 + R * 1.03, PY + 40); x.lineTo(540 - R * 1.03, PY + 40); x.closePath(); x.fill()
    // soft inner core
    const g2 = x.createLinearGradient(0, top, 0, PY)
    g2.addColorStop(0, `rgba(255,246,220,${0.12 * on})`); g2.addColorStop(1, `rgba(255,230,180,0)`)
    x.fillStyle = g2
    x.beginPath(); x.moveTo(540 - tw * 0.4, top); x.lineTo(540 + tw * 0.4, top); x.lineTo(540 + R * 0.45, PY); x.lineTo(540 - R * 0.45, PY); x.closePath(); x.fill()
    // the pool
    x.translate(540, PY); x.scale(1, 0.2)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, R * 1.05)
    p.addColorStop(0, `rgba(255,214,150,${0.42 * on})`); p.addColorStop(0.7, `rgba(255,190,120,${0.2 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, R * 1.05, 0, Math.PI * 2); x.fill()
    x.restore()
    // dust motes drifting in the beam
    x.save(); x.globalAlpha = 0.55 * on
    for (let i = 0; i < 16; i++) {
      const ph = (t * (0.05 + (i % 5) * 0.012) + i * 0.137) % 1
      const yy = lerp(60, PY - 30, ph), half = lerp(tw, R, (yy - top) / (PY - top)) * 0.85
      const xx = 540 + Math.sin(i * 12.9898 + t * 0.4) * half
      x.fillStyle = i % 3 ? '#ffe7b8' : '#ffffff'; x.fillRect(Math.round(xx), Math.round(yy), 4, 4)
    }
    x.restore()
  }

  function drawMirror(t) {
    const pin = pop01(t, T.mirrorIn, 0.4, 2), poof = prog(t, T.poof, T.poof + 0.16)
    if (pin <= 0.01 || poof >= 1) return null
    const s = pin * (1 + 0.25 * Math.sin(Math.PI * poof)) * (1 - poof)
    const cx = MIRROR.x + (1 - pin) * 140, cy = MIRROR.y + Math.sin(t * 2.4 + 1) * 8
    const c = 9 * s                                                     // mirror cell
    const RX = 7.5, RY = 9.5, hcx = 0, hcy = -2
    x.save(); x.translate(cx, cy); x.rotate(-0.12 + 0.05 * Math.sin(t * 1.7))
    // handle
    x.fillStyle = INK; x.fillRect(-2 * c, (hcy + RY - 0.5) * c, 4 * c, 7 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-1 * c, (hcy + RY) * c, 2 * c, 6 * c); x.fillStyle = '#f7c948'; x.fillRect(-1 * c, (hcy + RY) * c, 1 * c, 6 * c)
    // frame + glass (cells)
    for (let j = -11; j <= 9; j++) for (let i = -9; i <= 9; i++) {
      const u = (i + 0.5 - hcx) / RX, v = (j + 0.5 - hcy) / RY, d = u * u + v * v
      const col = d <= 0.62 ? null : d <= 0.86 ? (u + v < -0.2 ? '#fff1c8' : '#f7c948') : d <= 1.0 ? '#c98a1f' : d <= 1.2 ? INK : undefined
      if (col === undefined) continue
      x.fillStyle = col || '#2a1f55'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    // the reflection: a mini Leo, mirrored, also heart-eyed (clipped to the glass)
    x.save()
    x.beginPath(); x.ellipse((hcx) * c, (hcy) * c, RX * Math.sqrt(0.62) * c, RY * Math.sqrt(0.62) * c, 0, 0, Math.PI * 2); x.clip()
    const gl = x.createLinearGradient(0, -RY * c, 0, RY * c); gl.addColorStop(0, '#3a2c74'); gl.addColorStop(1, '#1d1440')
    x.fillStyle = gl; x.fillRect(-RX * c, (hcy - RY) * c, 2 * RX * c, 2 * RY * c)
    x.scale(-1, 1)
    const st = leoState(t)
    drawStarChar(x, 0, (hcy + 1.2) * c, 110 * s, t, { color: ORANGE, ...st, mood: st.mood === 'heart' ? 'heart' : st.mood === 'neutral' ? 'neutral' : 'happy', look: [1, 0], seed: 3, glow: 0.4, bob: 0, tips: false })
    x.restore()
    // glass shine
    x.fillStyle = 'rgba(255,255,255,0.55)'
    for (let k = 0; k < 4; k++) x.fillRect((-4 + k) * c, (hcy - 4 + k) * c - 0 * c, c, c)
    x.fillRect(-5 * c, (hcy - 3) * c, c, c)
    x.restore()
    return { x: cx, y: cy }
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 260 + Math.sin(p * 7 + i) * 18, hy = cy - 60 - p * 260
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ORANGE]) {
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

  function drawBubble(t, cx, cy) {
    const a = pop01(t, T.chat[0], 0.25, 2.4) * (1 - prog(t, T.chat[1] + 0.15, T.chat[1] + 0.3))
    if (a <= 0.01) return
    const c = 8 * a, w = 13, h = 7
    x.save(); x.translate(cx, cy)
    const BUB = []
    for (let j = 0; j < h; j++) { let r = ''; for (let i = 0; i < w; i++) { const corner = (j === 0 || j === h - 1) && (i === 0 || i === w - 1); r += corner ? '.' : 'B' } BUB.push(r) }
    BUB.push('...BB........'.slice(0, w), '..B..........'.slice(0, w))
    drawBits(x, BUB, { B: BONE }, 0, 0, c)
    const n = 1 + Math.floor((t - T.chat[0]) / 0.12) % 3
    const by = -(h + 2) * c / 2 + (h / 2 - 1) * c             // middle row of the balloon
    x.fillStyle = INK
    for (let k = 0; k < n; k++) x.fillRect((-5.5 + k * 4) * c, by, 3 * c, 2 * c)
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const wd = spotState(t).wd, lk = lowK(t)
    // Leo slides from solo → duo-left as the spotlight widens
    const L = { x: lerp(SOLO.x, DUO_L.x, wd), y: lerp(SOLO.y, DUO_L.y, wd) + LOW * lk, size: lerp(SOLO.size, DUO_L.size, clamp(wd)) * (1 + 0.14 * lk) }
    const lp = pop01(t, T.leoIn, 0.38, 2.2) * ok
    if (lp <= 0.02) return
    const st = leoState(t)
    const nod = t >= T.nods[0] && t < T.nods[1] + 0.25 ? 0.07 * Math.max(0, Math.sin((t - T.nods[0]) * Math.PI / 0.15)) : 0
    const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
    const proud = t >= T.sparkle && t < T.wink[0] ? -0.05 : 0          // puffs up a little (stretch tall)
    const glowL = 1.1 + (t > T.meet ? 0.25 : 0) + (t > T.heartAt ? 0.15 : 0)
    const lOpts = { color: ORANGE, glyph: LEO.glyph, ...st, hops: LEO_HOPS, pop: lp, squash: nod + gasp + proud, seed: 3, glow: glowL }

    // Aquarius drops into the beam
    let A = null, aOpts = null
    const ap = pop01(t, T.aquIn, 0.36, 2.0) * ok
    if (ap > 0.02) {
      const drop = 1 - ease.outCubic(prog(t, T.aquIn - 0.12, T.aquIn + 0.2))
      A = { x: DUO_R.x, y: DUO_R.y - drop * 420 + LOW * lk, size: DUO_R.size * (1 + 0.14 * lk) }
      aOpts = { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 8, glow: 1.15 + (t > T.blushAqu ? 0.2 : 0) }
    }
    const rL = drawStarChar(x, L.x, L.y, L.size, t, lOpts)
    const rA = A ? drawStarChar(x, A.x, A.y, A.size, t, aOpts) : null

    // the crown: on Leo's tip → hops over in an arc → on Aquarius's tip
    const tl = tipOf(t, rL, L.size, lp, lOpts)
    const cp = prog(t, ...T.crown)
    let cx = tl.x, cy = tl.y, cell = tl.cell * 0.95, rot = -0.2 + 0.04 * Math.sin(t * 3)
    if (cp > 0 && rA) {
      const ta = tipOf(t, rA, A.size, ap, aOpts)
      const e = ease.inOutCubic(cp)
      cx = lerp(tl.x, ta.x, e); cy = lerp(tl.y, ta.y, e) - Math.sin(Math.PI * cp) * 190
      rot = lerp(-0.2, 0.18, e) - Math.sin(Math.PI * 2 * cp) * 0.5        // a tumbling tilt mid-air
      cell = lerp(tl.cell, ta.cell, e) * 0.95
    }
    if (cp >= 1 && rA) { const ta = tipOf(t, rA, A.size, ap, aOpts); cx = ta.x; cy = ta.y; rot = 0.18 + 0.04 * Math.sin(t * 3 + 1); cell = ta.cell * 0.95 }
    // seat the crown so the tip pokes into its band
    const ch = CROWN.length * cell
    x.save(); x.globalAlpha = clamp(lp)
    drawBits(x, CROWN, CROWN_C, Math.round(cx), Math.round(cy - ch * 0.12), cell, { rot })
    x.restore()
    // crown glint
    const gt = t - T.glint
    if (gt > 0 && gt < 0.45) { x.save(); x.globalAlpha = Math.sin(Math.PI * gt / 0.45); drawPixelStar(x, cx + cell * 3.2, cy - ch * 0.75, 30 + 20 * Math.sin(Math.PI * gt / 0.45), 2, '#fffbe8'); x.restore() }
    if (cp >= 1) sparkles(t, cx, cy - ch * 0.4, T.crown[1], 8, 70, 2, [GOLD, '#7fdcff', BONE])

    // effects
    if (t > T.heart && t < T.l1 + 0.4) floatHearts(t, rL.x, rL.y, T.heart, T.l1 - 0.5, 1)
    if (t > T.heartAt) floatHearts(t, rL.x + 60, rL.y, T.heartAt, T.out[0], 5, 6)
    sparkles(t, rL.x, rL.y, T.sparkle, 10, 230, 1)
    if (rA) { sparkles(t, (rL.x + rA.x) / 2, rL.y, T.meet, 12, 300, 4, [GOLD, '#7fdcff', BONE, ORANGE]); drawBubble(t, rA.x + 70, rA.y - A.size * 0.6) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sp = spotState(t)
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * lerp(1, 0.55, sp.on) })
      drawSpot(t)
      if (t < T.out[1] + 0.02) {
        drawMirror(t)
        if (t > T.poof && t < T.poof + 0.7) sparkles(t, MIRROR.x, MIRROR.y, T.poof, 8, 80, 3, [BONE, GOLD])
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.82 (H0 out → "Love is a duet.") and 8.62 (box shut → "Share the spotlight.").
// cardfx keeps one for a 15 s film (the 8.62 one). End card flips at 10.6.
const CUTS = [5.82, { t: 8.62, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: headline, the spotlight clunks on, Leo pops in, crown glint, mirror, heart-eyes
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['boom', T.spot, 0.16], ['tick', T.spot, 0.06], ['tick', T.spot + 0.11, 0.035],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, 0], ['pop', T.leoIn + 0.3, 987.77, 0.03, 0],
  ['bell', T.glint, 2093, 0.022, 0.9, 0.2],
  ['whoosh', T.mirrorIn - 0.05, 0.35, 0.03], ['pop', T.mirrorIn + 0.2, 1318.51, 0.03, 0.4],
  ['tick', T.glance, 0.025],
  ['pluck', T.heart, 1174.66, 0.045, 0.5, 0], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', T.heart, T.heart + 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', T.sparkle, T.sparkle + 0.4], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  // love is a duet: gasp, mirror poof, spotlight widens, Aquarius drops in, chats
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gasp, 440, 0.035, 0], ['pop', T.poof, 1318.51, 0.035, 0.4], ['tick', T.poof + 0.04, 0.03],
  ['whoosh', T.widen[0], 0.6, 0.04], ['pop', T.aquIn + 0.05, 659.25, 0.045, 0.3], ['bell', T.meet, 1318.51, 0.03, 1.2, 0],
  ['pop', 8.04, 1174.66, 0.022, 0.3], ['pop', 8.17, 1318.51, 0.02, 0.3], ['pop', 8.3, 1174.66, 0.022, 0.3],
  ['tick', T.nods[0] + 0.07, 0.02], ['tick', T.nods[1] + 0.07, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // share the spotlight: crown hop → heart-eyes at them
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.crown[0], 0.45, 0.03], ['pluck', T.crown[1], 1567.98, 0.045, 0.6, 0.3], ['glitter', T.crown[1], T.crown[1] + 0.4],
  ['pluck', T.heartAt, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heartAt + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
