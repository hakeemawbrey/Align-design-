// st4jacket (15 s vertical Align ad, Star Talk season 4 · EP 003, thread F: Cancer × Capricorn) · story 0–10.6.
//   0.00–5.50  "Houston rule: | bring a jacket *indoors.*"  A restaurant date. The AC vent above the ♑ Capricorn star (tie on)
//              grows pixel icicles and blows snow; a little wall panel reads "AC: MAX"; outside the window the night air
//              shimmers with heat. Capricorn shivers, frost on its points. Across the table the ♋ Cancer star (shell on its
//              head, a mustard cardigan on) notices. The ghost peeks over the table edge between them (1.0–2.35).
//              Drop (2.84): THE STARS: "notice when they're cold."
//   5.55–8.50  "Moon-ruled. | Notices *everything.*"  THE STARS: "offer the *jacket*." Cancer shrugs its cardigan off and it
//              flies over onto Capricorn's shoulders: the frost melts, Capricorn sparkles, then goes heart-eyed.
//   8.60 cut → "Small care is | *big* care."  The two of them, cozy, hearts floating. Out by 10.45.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 3
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', ICE = '#bfe8ff', MUST = '#e0a63a'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAP = signStar('capricorn'), CAN = signStar('cancer')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.8, stars: 0.3, table: 0.4, vent: 0.5, ice: [0.6, 1.4], shiver: 0.9, ghost: 1.0, notice: 1.7, concern: 2.4,
  open: 2.62, l1: 2.84, h0Out: [5.38, 5.54],
  l2: 5.58, h1: 5.6, h1Land: 6.05, shrug: 6.35, toss: [6.5, 7.0], warm: [7.0, 7.6], sparkle: 7.05, heart: 7.45,
  close: 8.5, h1Out: [8.36, 8.54],
  cut: 8.6, h2: 8.66, h2Land: 9.1, h2Out: [10.15, 10.4], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "notice when they're *cold*.", color: ICE },
  { t: T.l2, speaker: SPEAK, text: 'offer the *jacket*.', color: MUST },
]
const CPS = 26

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
// a mustard cardigan, open at the front
const JACKET = [
  '..JJJ....JJJ..',
  '.JJJJk..kJJJJ.',
  'JJJJJk..kJJJJJ',
  'JJjJJk..kJJjJJ',
  'JJjJJo..oJJjJJ',
  'JJjJJk..kJJjJJ',
  '.JjJJo..oJJjJ.',
  '.JJJJk..kJJJJ.',
  '.JJJJo..oJJJJ.',
  '.ddddd..ddddd.',
]
const JACKET_C = { J: MUST, j: '#c98a2a', k: '#f6d27a', o: '#6a3f1a', d: '#a06a1e' }
const FLAKE = ['.W.', 'WWW', '.W.']

// ── layout
const CAP0 = { x: 290, y: 1110, size: 290 }
const CAN0 = { x: 790, y: 1120, size: 290 }
const TABLE = { x: 540, y: 1290, w: 420 }
const VENT = { x: 290, y: 560, w: 280, h: 64 }
const LOW = 120
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function capState(t) {
  if (t < T.shiver) return { mood: 'neutral', look: [0, -1] }
  if (t < T.l1) return { mood: 'squint' }
  if (t < T.l1 + 0.6) return { mood: 'wide', look: [1, 0], blink: false }       // …they noticed?
  if (t < T.warm[0]) return { mood: 'squint' }
  if (t < T.heart) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart' }
}
function canState(t) {
  if (t < T.notice) return { mood: 'happy' }
  if (t < T.concern) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.shrug) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'happy', look: [-1, 0], blush: t > T.heart ? 1 : 0.6 }
}
const shiverK = t => clamp(prog(t, T.shiver, T.shiver + 0.5)) * (1 - prog(t, T.warm[0], T.warm[1]))
const CAP_HOPS = [T.stars + 0.3, T.l1 + 0.05, T.sparkle, T.h2Land]
const CAN_HOPS = [T.stars + 0.4, T.notice, T.shrug, T.heart + 0.1, T.h2Land + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston rule: | bring a jacket *indoors.*', { top: 196, size: 88, accentSize: 140, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ICE })
  const H1 = popText(root, 'Moon-ruled. | Notices *everything.*', { top: 196, size: 92, accentSize: 132, at: T.h1, gap: 0.08, late: 0, wobble: true, accentColor: MUST })
  const H2 = popText(root, 'Small care is | *big* care.', { top: 200, size: 124, accentSize: 190, at: T.h2, gap: 0.09, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, MUST]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 7 + i) * 18), Math.round(cy - 40 - p * 220), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the room: a warm wall band, a window onto the hot night, the AC panel
  function drawRoom(t, ok) {
    const a = clamp(prog(t, 0.05, 0.4)) * outK(t, T.out)
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // window (right): night street, heat shimmer
    const wx = 790, wy = 720, ww = 230, wh = 210
    x.fillStyle = INK; x.fillRect(wx - ww / 2 - 10, wy - wh / 2 - 10, ww + 20, wh + 20)
    x.fillStyle = '#8a5a34'; x.fillRect(wx - ww / 2 - 5, wy - wh / 2 - 5, ww + 10, wh + 10)
    x.fillStyle = '#3a1f4e'; x.fillRect(wx - ww / 2, wy - wh / 2, ww, wh)
    x.fillStyle = '#5a2f5e'; x.fillRect(wx - ww / 2, wy + 20, ww, wh / 2 - 20)
    x.fillStyle = '#ffb347'
    for (let k = 0; k < 4; k++) for (let s = 0; s < 5; s++) {
      const hx = wx - 90 + k * 56 + Math.round(Math.sin(t * 3 + s * 0.9 + k) * 6)
      x.globalAlpha = a * 0.55; x.fillRect(hx, wy + 70 - s * 16, 6, 10)
    }
    x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(wx - 4, wy - wh / 2, 8, wh); x.fillRect(wx - ww / 2, wy - 4, ww, 8)
    // AC panel
    const px = 560, py = 650
    x.fillStyle = INK; x.fillRect(px - 76, py - 40, 152, 80)
    x.fillStyle = '#d9e4ef'; x.fillRect(px - 70, py - 34, 140, 68)
    x.fillStyle = '#1d3a5a'; x.fillRect(px - 60, py - 24, 120, 48)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = Math.sin(t * 5) > -0.3 ? '#7fe0ff' : '#4aa0c0'; x.fillText('AC:MAX', px, py + 2)
    x.restore()
  }

  // the vent: grille, icicles that grow, cold air + snow falling on Capricorn
  function drawVent(t) {
    const a = clamp(prog(t, 0.05, 0.4)) * outK(t, T.out)
    if (a <= 0) return
    const { x: vx, y: vy, w, h } = VENT
    x.save(); x.globalAlpha = a
    // cold air (behind the grille)
    const air = clamp(prog(t, T.vent, T.vent + 0.4)) * (t > T.cut ? 0.6 : 1)
    if (air > 0) {
      for (let k = 0; k < 14; k++) {
        const ph = (t * 0.9 + k * 0.071) % 1, lx = vx - w / 2 + 20 + (k * 53) % (w - 40)
        x.globalAlpha = a * air * Math.sin(Math.PI * ph) * 0.5
        x.fillStyle = '#d6f0ff'
        for (let s = 0; s < 4; s++) x.fillRect(Math.round(lx + Math.sin(ph * 6 + s) * 10), Math.round(vy + h / 2 + ph * 380 + s * 14), 6, 10)
      }
      for (let k = 0; k < 10; k++) {
        const ph = (t * 0.45 + k * 0.1) % 1, fx = vx - 130 + ((k * 97) % 260) + Math.sin(t * 2 + k) * 24
        x.globalAlpha = a * air * Math.min(1, Math.sin(Math.PI * ph) * 2)
        drawBits(x, FLAKE, { W: '#ffffff' }, Math.round(fx), Math.round(vy + h / 2 + 20 + ph * 420), 5, { outline: null })
      }
      x.globalAlpha = a
    }
    x.fillStyle = INK; x.fillRect(vx - w / 2 - 8, vy - h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#c8cfe0'; x.fillRect(vx - w / 2, vy - h / 2, w, h)
    x.fillStyle = '#6b7290'; for (let k = 0; k < 6; k++) x.fillRect(vx - w / 2 + 14, vy - h / 2 + 8 + k * 9, w - 28, 4)
    // icicles (cells), staggered growth
    const g = ease.outCubic(prog(t, ...T.ice))
    for (let k = 0; k < 9; k++) {
      const len = Math.round((3 + ((k * 5) % 4) * 1.6) * g)
      const ix = vx - w / 2 + 16 + k * 31
      for (let j = 0; j < len; j++) {
        const wd = Math.max(1, 3 - Math.floor(j * 3 / Math.max(1, len)))
        x.fillStyle = INK; x.fillRect(ix - 2, vy + h / 2 + j * 8, wd * 8 + 4, 8)
        x.fillStyle = j === 0 ? '#ffffff' : ICE; x.fillRect(ix, vy + h / 2 + j * 8, wd * 8, 8)
      }
      if (len > 2 && Math.sin(t * 2.3 + k * 1.9) > 0.85) { x.fillStyle = '#9fd0ff'; x.fillRect(ix + 2, vy + h / 2 + len * 8 + ((t * 120 + k * 30) % 40), 6, 8) }
    }
    x.restore()
  }

  function drawTable(t, dy, ok) {
    const tin = ease.outCubic(prog(t, T.table, T.table + 0.35)) * ok
    if (tin <= 0.01) return
    const y = TABLE.y + dy + (1 - tin) * 400, x0 = TABLE.x - TABLE.w / 2
    x.save(); x.globalAlpha = clamp(tin * 2)
    x.fillStyle = INK; x.fillRect(TABLE.x - 18, y, 36, 150); x.fillRect(TABLE.x - 80, y + 140, 160, 22)
    x.fillStyle = '#8a5a34'; x.fillRect(TABLE.x - 12, y, 24, 144); x.fillRect(TABLE.x - 74, y + 144, 148, 12)
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 26, TABLE.w + 12, 34)
    x.fillStyle = BONE; x.fillRect(x0, y - 20, TABLE.w, 22); x.fillStyle = '#7fb6d6'; for (let i = 0; i < TABLE.w; i += 44) x.fillRect(x0 + i, y - 20, 22, 22)
    // two glasses of iced water (of course)
    for (const gx2 of [x0 + 70, x0 + TABLE.w - 90]) {
      x.fillStyle = INK; x.fillRect(gx2 - 4, y - 84, 44, 66)
      x.fillStyle = '#cfe9ff'; x.fillRect(gx2, y - 80, 36, 58)
      x.fillStyle = '#ffffff'; x.fillRect(gx2 + 6, y - 66, 10, 10); x.fillRect(gx2 + 20, y - 54, 10, 10)
    }
    x.restore()
  }

  // a frosted coat on the star's five points
  function drawFrost(r, k) {
    if (k <= 0.01) return
    const s = r.size, c = Math.max(3, Math.round(s / 36))
    const tips = [[0, -0.44], [-0.44, -0.1], [0.44, -0.1], [-0.28, 0.4], [0.28, 0.4]]
    x.save(); x.globalAlpha = k
    tips.forEach(([u, v], i) => {
      const tx = r.x + u * s, ty = r.y + v * s
      for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [0, 1]]) { x.fillStyle = (a + b + i) % 2 ? ICE : '#ffffff'; x.fillRect(Math.round(tx + a * c), Math.round(ty + b * c), c, c) }
    })
    x.restore()
  }
  function drawShellHat(r, pop) {
    const s = r.size, c = Math.max(2, Math.round(s / 40))
    const RX = 9, RY = 6, cx = r.x, rim = r.top + s * 0.17
    x.save(); x.globalAlpha = clamp(pop * 2)
    for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
      const inside = (ii, jj) => { const u = (ii + 0.5) / RX, v = (jj + 0.5) / RY; return jj >= 0 && u * u + v * v <= 1 }
      const on = inside(i, j), edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
      if (!on && !edge) continue
      let col = INK
      if (on) { const u = (i + 0.5) / RX, v = (j + 0.5) / RY, lit = -u * 0.6 + v * 0.8; col = lit > 0.7 ? '#ffd2b0' : lit > 0.25 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'; if (j === 0) col = (i + 40) % 3 === 0 ? INK : '#8f2f2a' }
      x.fillStyle = col; x.fillRect(Math.round(cx + i * c), Math.round(rim - (j + 1) * c), c, c)
    }
    x.restore()
  }

  function drawStars(t, dy, ok) {
    const cp = pop01(t, T.stars, 0.38, 2.2) * ok, np = pop01(t, T.stars + 0.1, 0.38, 2.2) * ok
    const sh = shiverK(t)
    const jit = sh * (Math.floor(t * 30) % 2 ? 4 : -4)
    let rC = null, rN = null
    if (cp > 0.02) {
      rC = drawStarChar(x, CAP0.x + jit, CAP0.y + dy, CAP0.size, t, { color: CAP.color, glyph: CAP.glyph, ...capState(t), hops: CAP_HOPS, pop: cp, seed: 5, glow: lerp(1, 0.6, sh), squash: sh * 0.03 * Math.sin(t * 40) })
      drawBits(x, TIE, TIE_C, Math.round(rC.x), Math.round(rC.y + CAP0.size * cp * 0.27), CAP0.size * cp / 26, { rot: Math.sin(t * 3) * 0.03, alpha: clamp(cp * 2) })
      drawFrost(rC, sh)
    }
    if (np > 0.02) {
      rN = drawStarChar(x, CAN0.x, CAN0.y + dy, CAN0.size, t, { color: CAN.color, glyph: CAN.glyph, ...canState(t), hops: CAN_HOPS, pop: np, seed: 8, glow: 1.0 })
      drawShellHat(rN, np)
    }
    // the cardigan: on Cancer → shrugged off → flies over → on Capricorn's shoulders
    if (rC && rN) {
      const p = prog(t, ...T.toss), e = ease.inOutCubic(p)
      const onCan = { x: rN.x, y: rN.y + CAN0.size * np * 0.36, c: CAN0.size * np / 25 }
      const onCap = { x: rC.x, y: rC.y + CAP0.size * cp * 0.36, c: CAP0.size * cp / 25 }
      const lift = ease.outCubic(prog(t, T.shrug, T.toss[0])) * 30
      const jx = lerp(onCan.x, onCap.x, e), jy = lerp(onCan.y - lift, onCap.y, e) - Math.sin(Math.PI * p) * 260
      const rot = Math.sin(Math.PI * 2 * p) * 0.4
      const land = t > T.toss[1] ? 0.08 * Math.exp(-(t - T.toss[1]) * 8) * Math.cos((t - T.toss[1]) * 30) : 0
      drawBits(x, JACKET, JACKET_C, Math.round(jx), Math.round(jy), lerp(onCan.c, onCap.c, e) * (1 + land), { rot })
    }
    return { rC, rN }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: base.dim * 0.8 })
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      drawRoom(t, ok)
      drawVent(t)
      if (ok > 0) {
        const { rC, rN } = drawStars(t, dy, ok)
        drawTable(t, dy, ok)
        drawGhostCameo(x, t, { x: TABLE.x, y: TABLE.y - 26, at: T.ghost, dur: 1.35, from: 'below', cell: 3 })
        if (rC) sparkles(t, rC.x, rC.y, T.sparkle, 12, 200, 1, [MUST, GOLD, BONE, PINK])
        if (rC && t > T.heart) floatHearts(t, rC.x + 30, rC.y - 60, T.heart, T.out[0], 3, 6)
        if (rN && t > T.notice && t < T.notice + 0.6) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.notice, T.notice + 0.6)); x.font = `700 72px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('!', rN.x + 120, rN.top - 10); x.restore() }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 8.6 (box shut → "Small care is big care."). End card flips at 10.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.08, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.stars + 0.05, 739.99, 0.04, -0.3], ['pop', T.stars + 0.15, 659.25, 0.035, 0.3], ['tick', T.table + 0.3, 0.04],
  ['whoosh', T.vent, 1.6, 0.04], ['bell', T.ice[0] + 0.2, 2093, 0.02, 0.6, -0.3], ['bell', T.ice[0] + 0.5, 2349.32, 0.018, 0.6, -0.3], ['glitter', T.ice[0], T.ice[1]],
  ['tick', T.shiver, 0.03], ['tick', T.shiver + 0.08, 0.03], ['tick', T.shiver + 0.16, 0.03],
  ['pop', T.ghost + 0.1, 1318.51, 0.018, 0],
  ['pluck', T.notice, 1318.51, 0.035, 0.4, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.08, 2, 0.025),
  ['whoosh', T.toss[0], 0.5, 0.035], ['pop', T.toss[1], 659.25, 0.04, -0.3], ['tick', T.toss[1], 0.04],
  ['glitter', T.sparkle, T.sparkle + 0.5], ['pluck', T.sparkle, 1174.66, 0.04, 0.6, -0.2], ['bell', T.heart, 1760, 0.025, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.09, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pop', T.h2Land + 0.14, 1567.98, 0.05, 0], ['pluck', T.h2Land + 0.14, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
