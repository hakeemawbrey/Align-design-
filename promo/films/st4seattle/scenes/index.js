// st4seattle (15 s vertical, Star Talk season 4 · EP 082 · thread C, the ghost) · story 0–10.6, then the shared end card.
//   0.00–5.55  "Dear | *Seattle.*"  Rain on a coffee-shop window (a generic shop, "COFFEE" painted on the glass). Inside,
//              the ghost sits alone at the window table with a latte, a book held up to its eye holes: hiding.
//              Drop (2.82): the box opens. THE STARS: "cozy is good. *hiding* forever isn't." → the ghost's eyes go wide
//              and it sinks lower behind the book.
//   5.62–8.55  "Look | *up.*"  THE STARS: "say hi to the one who's *also* reading." → a bone star at the next table, also
//              behind a book. The ghost lowers its book a little and peeks over; the other reader glances back. Both blush.
//   8.62       card cut (flip), the box has shut.
//   8.66–10.45 "Say *hi.*"  The ghost puts the book down: "hi." The other star: "hi :)". The rain eases, a heart pops.
//              Everything pops out by 10.45; the end card takes over at 10.6.
// The ghost is the star here (drawGhostSheet); lore.json records its window seat. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 82
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', GHOSTC = '#cfe3ff', RAIN = '#a9c8ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const THEM = STAR.bone

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.35, 5.55],
  in: 0.3, sip: [1.3, 1.9],
  open: 2.66, l1: BEAT(4) + 0.02,                                         // the drop: 2.82
  sink: [3.5, 3.9],
  l2: 5.62, h1: 5.68, h1Land: 6.0, themIn: 6.4, peek: [6.7, 7.1], glance: 7.4, blush: 7.75,
  close: 8.55, h1Out: [8.36, 8.54],
  cut: 8.62,
  h2: 8.66, h2Land: 8.98, bookDown: [8.75, 9.05], hiG: 9.1, hiT: 9.62, heart: 9.95, h2Out: [10.2, 10.42], out: [10.08, 10.45],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'cozy is good. *hiding* forever isn’t.' },
  { t: T.l2, speaker: NARR, text: 'say hi to the one who’s *also* reading.' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, k = 1) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s) }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
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
    x.fillStyle = cols[ch] || cols.X; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── layout: the window, the table, the ghost's seat and the other reader's seat
const WIN = { x: 80, y: 560, w: 920, h: 760 }
const MULL_X = 590, TRANSOM_Y = 700
const TABLE_Y = 1190
const GH = { x: 340, y: 1010, c: 9 }                       // ghost centre + cell (sheet ≈ 261 × 315)
const RD = { x: 815, y: 1040, size: 230 }                  // the other reader

function ghostState(t) {
  if (t < T.l1) return { look: [0, 1] }                                         // reading
  if (t < LT[0].done + 0.6) return { look: [0, 0], wide: true }                 // …hiding? me?
  if (t < T.peek[0]) return { look: [-1, 1] }
  if (t < T.glance) return { look: [1, 0], wide: true }                         // peeks at the other reader
  if (t < T.blush) return { look: [1, 0] }
  if (t < T.bookDown[1]) return { look: [-1, 1], blush: 1 }                     // caught looking
  if (t < T.hiT + 0.2) return { look: [1, 0], blush: 1 }
  return { look: [0, 0], blush: 1, wide: t < T.heart }
}
function readerState(t) {
  if (t < T.glance) return { mood: 'neutral', look: [0, 1] }
  if (t < T.blush) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.hiT) return { mood: 'neutral', look: [-1, 0], blush: 0.8 }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "600 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 56px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear | *Seattle.*', { top: 170, size: 120, accentSize: 196, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: RAIN, lineHeight: 0.98, fit: true })
  const H1 = popText(root, 'Look | *up.*', { top: 170, size: 124, accentSize: 200, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Say *hi.*', { top: 250, size: 150, accentSize: 230, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
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
  const rainK = t => lerp(1, 0.25, ease.inOutCubic(prog(t, T.hiG, T.heart + 0.3)))

  // ── the shop interior (warm), behind the glass
  function drawInterior(t, a) {
    const { x: wx, y: wy, w, h } = WIN
    x.save(); x.globalAlpha = a
    const g = x.createLinearGradient(0, wy, 0, wy + h)
    g.addColorStop(0, '#3a2440'); g.addColorStop(0.55, '#5a3446'); g.addColorStop(1, '#7a4a3c')
    x.fillStyle = g; x.fillRect(wx, wy, w, h)
    // pendant lamps (warm pools)
    for (const lx of [330, 810]) {
      x.fillStyle = '#20141e'; x.fillRect(lx - 3, wy, 6, 70)
      x.fillStyle = '#e0a14a'; x.fillRect(lx - 34, wy + 70, 68, 22); x.fillStyle = '#ffe2a8'; x.fillRect(lx - 18, wy + 92, 36, 8)
      glow(lx, wy + 110, 300, '#ffb35c', 0.55)
    }
    // a shelf with mugs on the back wall
    x.fillStyle = '#2a1a22'; x.fillRect(wx + 30, wy + 300, w - 60, 10)
    for (let k = 0; k < 9; k++) { const mx = wx + 70 + k * 96; x.fillStyle = ['#e9dcc4', '#c96b4a', '#8fb7c9'][k % 3]; x.fillRect(mx, wy + 268, 34, 32); x.fillRect(mx + 34, wy + 276, 8, 14) }
    // the table / window counter
    x.fillStyle = INK; x.fillRect(wx, TABLE_Y - 6, w, 6)
    x.fillStyle = '#9a6238'; x.fillRect(wx, TABLE_Y, w, 22)
    x.fillStyle = '#c98a4a'; x.fillRect(wx, TABLE_Y, w, 6)
    x.fillStyle = '#5a3420'; x.fillRect(wx, TABLE_Y + 22, w, wy + h - TABLE_Y - 22)
    x.restore()
  }

  // a latte with pixel steam
  function drawCup(t, cx, a) {
    const c = 6, cy = TABLE_Y
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(cx - 7 * c, cy - 10 * c, 14 * c, 10 * c); x.fillRect(cx + 6 * c, cy - 8 * c, 4 * c, 5 * c)
    x.fillStyle = '#f4ead8'; x.fillRect(cx - 6 * c, cy - 9 * c, 12 * c, 9 * c); x.fillRect(cx + 6 * c, cy - 7 * c, 3 * c, 3 * c)
    x.fillStyle = '#8a5a34'; x.fillRect(cx - 5 * c, cy - 9 * c, 10 * c, 2 * c)
    x.fillStyle = '#fff6e6'; x.fillRect(cx - 1 * c, cy - 9 * c, 2 * c, c)
    for (let k = 0; k < 3; k++) {
      const ph = (t * 0.5 + k / 3) % 1
      x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.7
      x.fillStyle = '#fff1e0'
      for (let s = 0; s < 4; s++) x.fillRect(cx + (k - 1) * 3 * c + Math.round(Math.sin(ph * 6 + s + k) * 1.2) * c, cy - 12 * c - ph * 60 - s * c * 1.4, c, c)
    }
    x.restore()
  }

  // a book held up (cover facing us): cell c, centred (cx, cy), tilt rot
  function drawBook(cx, cy, c, rot, cover, { title = false } = {}) {
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    const w = 18, h = 13
    x.fillStyle = INK; x.fillRect(-w / 2 * c - c, -h / 2 * c - c, (w + 2) * c, (h + 2) * c)
    x.fillStyle = '#f4ead8'; x.fillRect(-w / 2 * c, -h / 2 * c, w * c, h * c)                   // page edges peeking
    x.fillStyle = cover; x.fillRect(-w / 2 * c, -h / 2 * c, w * c, (h - 1) * c)
    x.fillStyle = 'rgba(0,0,0,0.28)'; x.fillRect(-c / 2, -h / 2 * c, c, (h - 1) * c)              // spine crease
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(-w / 2 * c, -h / 2 * c, w * c, c)
    if (title) {
      // a little gold star on each half of the cover
      for (const s of [-1, 1]) drawPixelStar(x, s * 4.5 * c, -0.5 * c, c * 4.2, 1, GOLD, '#fff6e6')
    } else {
      x.fillStyle = 'rgba(255,241,200,0.7)'; for (const s of [-1, 1]) { x.fillRect(s * 4.5 * c - 2.5 * c, -2 * c, 5 * c, c); x.fillRect(s * 4.5 * c - 2 * c, 0, 4 * c, c) }
    }
    x.restore()
  }

  // rain: streaks behind/over the glass and drops sliding down the pane
  function drawRain(t, a) {
    const { x: wx, y: wy, w, h } = WIN, k = rainK(t) * a
    if (k <= 0) return
    x.save()
    x.beginPath(); x.rect(wx, wy, w, h); x.clip()
    // glass tint
    x.fillStyle = `rgba(90,120,170,${0.16 * a})`; x.fillRect(wx, wy, w, h)
    // falling streaks
    x.fillStyle = rgba(RAIN, 0.45 * k)
    for (let i = 0; i < 70; i++) {
      if (hash(i, 9) > rainK(t) + 0.05) continue
      const sp = 900 + hash(i, 2) * 500, ph = (t * sp / h + hash(i, 3)) % 1
      const rx = wx + hash(i, 1) * (w + 80) - ph * 80, ry = wy + ph * (h + 120) - 60
      x.save(); x.translate(rx, ry); x.rotate(0.12); x.fillRect(0, 0, 3, 34 + hash(i, 4) * 22); x.restore()
    }
    // drops on the pane: slide, pause, slide (pixel blobs + trails)
    for (let i = 0; i < 26; i++) {
      if (hash(i, 19) > rainK(t) + 0.15) continue
      const dx = wx + 20 + hash(i, 11) * (w - 40), period = 2.4 + hash(i, 12) * 2
      const ph = ((t + hash(i, 13) * period) / period) % 1
      const dy = wy + 20 + (hash(i, 14) * 0.4 + ease.inQuad(ph) * 0.7) * (h - 40)
      const s = 5 + Math.round(hash(i, 15) * 3)
      x.fillStyle = `rgba(200,225,255,${0.22 * k})`; x.fillRect(dx + s / 2 - 1, dy - 60 * ph, 2, 60 * ph)
      x.fillStyle = `rgba(220,236,255,${0.7 * k})`; x.fillRect(dx, dy, s, s + 2)
      x.fillStyle = `rgba(255,255,255,${0.8 * k})`; x.fillRect(dx + 1, dy + 1, 2, 2)
    }
    x.restore()
  }

  // the window frame (dark painted wood) + "COFFEE" on the glass
  function drawFrame(t, a) {
    const { x: wx, y: wy, w, h } = WIN, F = 22
    x.save(); x.globalAlpha = a
    x.fillStyle = '#1d1630'
    x.fillRect(wx - F, wy - F, w + 2 * F, F); x.fillRect(wx - F, wy + h, w + 2 * F, F + 10)
    x.fillRect(wx - F, wy - F, F, h + 2 * F); x.fillRect(wx + w, wy - F, F, h + 2 * F)
    x.fillRect(MULL_X - 8, wy, 16, h); x.fillRect(wx, TRANSOM_Y - 8, w, 16)
    x.fillStyle = '#3a2f58'
    x.fillRect(wx - F, wy - F, w + 2 * F, 4); x.fillRect(MULL_X - 8, wy, 4, h); x.fillRect(wx, TRANSOM_Y - 8, w, 4)
    // sill
    x.fillStyle = '#2a2142'; x.fillRect(wx - F - 16, wy + h + F, w + 2 * F + 32, 16)
    // gold lettering on the transom pane
    x.font = `700 56px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.letterSpacing = '18px'
    x.fillStyle = 'rgba(20,10,30,0.6)'; x.fillText('COFFEE', 540 + 9 + 3, (wy + TRANSOM_Y - 8) / 2 + 4)
    x.fillStyle = GOLD; x.fillText('COFFEE', 540 + 9, (wy + TRANSOM_Y - 8) / 2)
    x.letterSpacing = '0px'
    x.restore()
  }

  function bubble(cx, cy, text, { side = -1, k = 1, a = 1, fill = 'rgba(70,52,130,0.95)', ink = BONE, size = 40 } = {}) {
    if (k <= 0.01 || a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(k, k)
    x.font = `600 ${size}px ${INTER}`
    const tw = x.measureText(text).width, w = tw + 60, h = size + 44
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, h / 2 + 5); x.fill()
    x.fillStyle = fill; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill()
    x.beginPath(); x.moveTo(side * (w / 2 - 50), h / 2 - 6); x.lineTo(side * (w / 2 - 18), h / 2 + 22); x.lineTo(side * (w / 2 - 80), h / 2 - 2); x.fill()
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, GHOSTC]) {
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

  function drawScene(t) {
    const ok = popOut(t, T.out), sa = clamp(prog(t, 0.15, 0.5)) * ok
    if (sa <= 0) return
    drawInterior(t, sa)
    // ── the other reader (next table)
    const rp = pop01(t, T.themIn, 0.38, 2.1) * ok
    if (rp > 0.02) {
      const rs = readerState(t)
      const r = drawStarChar(x, RD.x, RD.y, RD.size, t, { color: THEM, ...rs, pop: rp, seed: 7, glow: 0.8, hops: [T.themIn + 0.3, T.glance, T.hiT, T.heart] })
      drawCup(t, RD.x + 130, sa * clamp(rp))
      // their book: up, then lowered to the table for "hi :)"
      const dn = ease.inOutCubic(prog(t, T.hiT - 0.3, T.hiT))
      drawBook(r.x, lerp(r.y + RD.size * 0.3, TABLE_Y - 30, dn), 6 * rp, lerp(0, 0.08, dn), '#3f8f7c')
    }
    // ── the ghost: shimmies in, reads with the book up to its eye holes
    const gp = pop01(t, T.in, 0.45, 1.7) * ok
    if (gp > 0.02) {
      const st = ghostState(t)
      const sink = ease.inOutCubic(prog(t, ...T.sink)) * (1 - ease.inOutCubic(prog(t, T.peek[0], T.peek[1])))
      const rise = ease.inOutCubic(prog(t, T.peek[0], T.peek[1])) * 0.4 + ease.inOutCubic(prog(t, ...T.bookDown)) * 0.6
      const hiHop = t > T.hiG && t < T.hiG + 0.4 ? Math.sin(Math.PI * (t - T.hiG) / 0.4) * 24 : 0
      const c = GH.c * gp
      const gy = GH.y + sink * 40 - hiHop + Math.sin(t * 2.2) * 5
      glow(GH.x, gy - 40, 300, GHOSTC, 0.35 * gp)
      drawGhostSheet(x, t, GH.x, gy, c, { ...st, blush: st.blush || 0 })
      drawCup(t, GH.x - 175, sa * clamp(gp))
      // the book: held right under the eye holes (hiding) → a little lower (peeking) → down on the table
      const holdY = gy + 6.6 * GH.c, peekY = gy + 9.5 * GH.c
      const by = t < T.bookDown[0] ? lerp(holdY, peekY, rise / 0.4 * 0.4 + 0) : lerp(peekY, TABLE_Y - 34, ease.inOutCubic(prog(t, ...T.bookDown)))
      const sipLift = Math.sin(Math.PI * prog(t, ...T.sip)) * 10
      drawBook(GH.x, (t < T.peek[0] ? holdY : by) - sipLift, 9 * gp, lerp(-0.04, 0.05, prog(t, ...T.bookDown)), '#6a5ad0', { title: true })
    }
    drawRain(t, sa)
    drawFrame(t, sa)
    // bubbles + payoff (on top of the glass)
    const hk = pop01(t, T.hiG, 0.3, 2.4) * ok, tk = pop01(t, T.hiT, 0.3, 2.4) * ok
    bubble(GH.x + 40, 720 + 70, 'hi.', { side: -1, k: hk, fill: 'rgba(207,227,255,0.97)', ink: INK, size: 52 })
    bubble(RD.x - 20, 790, 'hi :)', { side: 1, k: tk, fill: 'rgba(242,199,92,0.97)', ink: INK, size: 52 })
    if (t > T.heart && t < T.out[0]) {
      const p = clamp((t - T.heart) / 0.9)
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round((GH.x + RD.x) / 2 + 20), Math.round(900 - p * 120), 12 * pop01(t, T.heart, 0.3, 2.6), { alpha: 1 - ease.inQuad(prog(t, T.heart + 0.5, T.out[0])) })
    }
    sparkles(t, (GH.x + RD.x) / 2 + 20, 900, T.heart, 12, 160, 2)
    sparkles(t, RD.x, RD.y, T.themIn + 0.15, 8, 160, 1, [GOLD, BONE])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.55, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * 0.8, moon: null })
      drawSeedConstellation(x, t, EP)
      // rain outside the shop, too (the whole sky), lighter
      x.save(); x.fillStyle = rgba(RAIN, 0.22 * rainK(t))
      for (let i = 0; i < 60; i++) { const ph = (t * (1.1 + hash(i, 5) * 0.6) + hash(i, 6)) % 1; x.fillRect(hash(i, 7) * 1100 - ph * 60, ph * 2000 - 60, 2, 30) }
      x.restore()
      if (t < T.out[1] + 0.05) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.58 (H0 out → "Look up.") and 8.62 (box shut → "Say hi."). cardfx keeps 8.62.
const CUTS = [5.58, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// soft rain taps on the glass (fewer once it eases)
const DRIPS = Array.from({ length: 40 }, (_, i) => +(0.4 + i * 0.25 + hash(i, 31) * 0.2).toFixed(3)).filter(v => v < 10.2 && (v < T.hiG || hash(Math.round(v * 10), 2) < 0.35))
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ...DRIPS.map((v, i) => ['tick', v, 0.008 + 0.006 * hash(i, 4)]),
  ['chip', T.in + 0.3, 520, 0.45, { wave: 'tri', vib: 0.03, slide: -3, gain: 0.018 }],
  ['pop', T.sip[0] + 0.2, 392, 0.025, -0.3], ['pop', T.sip[0] + 0.35, 440, 0.02, -0.3],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['pop', T.sink[0] + 0.1, 392, 0.03, 0], ['pop', T.sink[0] + 0.24, 330, 0.03, 0],
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['pop', T.themIn + 0.08, 739.99, 0.04, 0.4], ['tick', T.peek[0] + 0.2, 0.025],
  ['pluck', T.glance, 1318.51, 0.03, 0.5, 0.3], ['pluck', T.blush, 1174.66, 0.035, 0.6, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['tick', T.bookDown[1], 0.04],
  ['pop', T.hiG, 880, 0.045, -0.3], ['pop', T.hiG + 0.09, 1174.66, 0.035, -0.3],
  ['pop', T.hiT, 987.77, 0.045, 0.3], ['pop', T.hiT + 0.09, 1318.51, 0.035, 0.3],
  ['bell', T.heart, 1567.98, 0.03, 1.4, 0], ['glitter', T.heart, T.heart + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
