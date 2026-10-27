// starvirgo (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.10  "Dear *Virgo…*"  The ♍ star (Mercury-ruled, mutable earth) holds a clipboard, squinting, and the checklist
//              keeps getting longer: rows tick and cross themselves ("texts back" ✓, "the shoes" ✗, "chews loud" ?…) until
//              the paper unrolls off the bottom of the board. Drop (2.82): the box opens.
//              THE STARS: "their shoes were wrong. we heard."
//   5.10–9.20  "Mutable earth. | Immutable | *standards.*"  THE STARS: "a person isn't a project. let them be *a little*
//              messy." → wide eyes, then the star scrunches the whole list into a paper ball and tosses it.
//   9.20 cut → "Done is better | than *perfect.*"  A fresh page with one line: "date #2" — ticked. Happy hops.
//              Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + star + clipboard), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 16
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 11.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SAGE = '#5fbf7a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const VIR = signStar('virgo')
const ROSE = '#ff7fae'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.92, 5.1],
  star: 0.22, row0: 0.6, rowGap: 0.24,
  open: 2.27, l1: 2.45, nod: 3.55,
  h1: 5.16, h1Land: 5.62, l2: 5.3, gasp: 6.15, crumple: [7.05, 7.5], toss: [7.55, 8.05], relief: 7.6, close: 9.1, h1Out: [8.95, 9.13],
  cut: 9.2,
  h2: 9.25, h2Land: 9.7, tick: 10.15, h2Out: [11.2, 11.42], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'their shoes were wrong. *we heard.*', color: ROSE },
  { t: T.l2, speaker: SPEAK, text: "a person isn't a project. let them be *a little* messy.", color: ROSE },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
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

// ── pixel bits
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy); flip = mirror horizontally */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
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
/** a bone pixel speech bubble with text, tail on `side` ('left' | 'right' | null), centred on (cx, cy) */
function bubble(x, cx, cy, text, { size = 34, fill = BONE, ink = INK, k = 1, side = 'left', font = "'Space Mono', monospace", weight = 700, padX = 22, padY = 16 } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const tw = x.measureText(text).width, P = 6
  const w = Math.round((tw + padX * 2) / P) * P, h = Math.round((size + padY * 2) / P) * P
  x.translate(Math.round(cx), Math.round(cy)); x.scale(k, k)
  const ox = -w / 2, oy = -h / 2
  const slab = (o, col) => { x.fillStyle = col; x.fillRect(ox - o + P, oy - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(ox - o, oy - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  slab(P, INK); slab(0, fill)
  if (side) {
    const tx = side === 'left' ? ox + 3 * P : ox + w - 5 * P, dir = side === 'left' ? -1 : 1
    x.fillStyle = INK; x.fillRect(tx - P, oy + h, 4 * P, 2 * P); x.fillRect(tx + (dir < 0 ? -P : 2 * P), oy + h + 2 * P, 2 * P, 2 * P)
    x.fillStyle = fill; x.fillRect(tx, oy + h - P, 2 * P, 2 * P); x.fillRect(tx + (dir < 0 ? 0 : P), oy + h + P, P, P)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 2)
  x.restore()
}

// ── layout
const HERO = { x: 330, y: 1060, size: 340 }
const FINAL = { x: 290, y: 1160, size: 380 }
const BOARD = { x: 745, y: 880, w: 300, h: 380 }
const ROWS = [
  ['v', 'texts back'], ['v', 'owns a plant'], ['x', 'the shoes'], ['v', 'tips well'], ['?', 'chews loud'],
  ['x', 'font in bio'], ['?', '3 min late'], ['x', 'cilantro??'], ['?', 'sock colour'], ['x', 'too nice??'],
]
const ROW_H = 40
const MARK = {
  v: { bm: ['.....X', '....XX', 'X..XX.', 'XXXX..', '.XX...'], col: SAGE },
  x: { bm: ['X...X', '.X.X.', '..X..', '.X.X.', 'X...X'], col: '#e0403a' },
  '?': { bm: ['.XXX.', '...X.', '..X..', '.....', '..X..'], col: '#d18b1f' },
}

function heroState(t) {
  if (t < T.row0) return { mood: 'neutral', look: [1, 0] }
  if (t < T.l1) return { mood: 'squint', look: [1, 0], blink: false }                    // reviewing. judging.
  if (t < T.nod) return { mood: 'squint', look: [0, 0], blink: false }                   // "their shoes were wrong."
  if (t < T.l2) return { mood: 'eyeroll' }                                               // "we heard." (they were.)
  if (t < T.gasp) return { mood: 'squint', look: [1, 1] }
  if (t < T.crumple[0]) return { mood: 'wide', look: [0, 0], blink: false }              // a person isn't a project?!
  if (t < T.relief) return { mood: 'squint', look: [1, 0], blink: false }                // scrunch
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.tick + 0.15) return { mood: 'neutral', look: [1, 0] }
  return { mood: 'sparkle', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Virgo…*', { top: 262, size: 124, accentSize: 178, at: T.h0, gap: 0.12, accentColor: ROSE, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Mutable earth. | Immutable | *standards.*', { top: 180, size: 96, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: ROSE })
  const H2 = popText(root, 'Done is better | than *perfect.*', { top: 190, size: 124, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: ROSE, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ROSE]) {
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

  // the clipboard. rows = list of [mark, text, bornAt]; the paper grows past the board when the list gets long.
  function drawClipboard(t, cx, cy, rows, { k = 1, rot = 0, squeeze = 0 } = {}) {
    if (k <= 0.01) return
    const { w, h } = BOARD, P = 6
    const shown = rows.filter(r => t >= r[2])
    const need = 70 + shown.length * ROW_H + 24
    const paperH = Math.max(h - 40, need)
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(k * (1 - squeeze * 0.6), k * (1 - squeeze * 0.75))
    const ox = -w / 2, oy = -h / 2
    // board
    x.fillStyle = INK; x.fillRect(ox - P, oy, w + 2 * P, h); x.fillRect(ox, oy - P, w, h + 2 * P)
    x.fillStyle = '#b0773f'; x.fillRect(ox, oy, w, h)
    x.fillStyle = '#c98f52'; x.fillRect(ox, oy, w, P); x.fillRect(ox, oy, P, h)
    x.fillStyle = '#8a5a2c'; x.fillRect(ox, oy + h - P, w, P)
    // paper (may run long past the board, with a curl at the end)
    const px0 = ox + 18, pw = w - 36, py0 = oy + 34
    x.fillStyle = INK; x.fillRect(px0 - P / 2, py0 - P / 2, pw + P, paperH + P)
    x.fillStyle = '#fbf6ea'; x.fillRect(px0, py0, pw, paperH)
    if (paperH > h - 40) { x.fillStyle = '#e4dcc8'; x.fillRect(px0, py0 + paperH - 2 * P, pw, 2 * P) }
    // ruled lines + rows
    x.font = `700 25px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    shown.forEach(([m, text, born], i) => {
      const ry = py0 + 66 + i * ROW_H
      x.fillStyle = 'rgba(120,150,210,0.35)'; x.fillRect(px0 + 8, ry + ROW_H / 2 - 2, pw - 16, 2)
      const a = clamp((t - born) / 0.12)
      x.globalAlpha = a
      // checkbox + mark
      x.fillStyle = INK; x.fillRect(px0 + 14, ry - 13, 26, 26)
      x.fillStyle = '#fbf6ea'; x.fillRect(px0 + 17, ry - 10, 20, 20)
      if (m && t >= born + 0.1) {
        const M = MARK[m], mc = 4
        M.bm.forEach((r, j) => [...r].forEach((ch, ii) => { if (ch === 'X') { x.fillStyle = M.col; x.fillRect(px0 + 17 + ii * mc - (r.length * mc - 20) / 2, ry - 10 + j * mc, mc, mc) } }))
      }
      x.fillStyle = INK; x.fillText(text, px0 + 50, ry + 1)
      x.globalAlpha = 1
    })
    // header
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(rows.header || 'CHECKLIST', px0 + 14, py0 + 26)
    x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillRect(px0 + 14, py0 + 42, pw - 28, 3)
    // the clip
    x.fillStyle = INK; x.fillRect(-62, oy - 22, 124, 52)
    x.fillStyle = '#c9cfd8'; x.fillRect(-56, oy - 16, 112, 40)
    x.fillStyle = '#eef2f6'; x.fillRect(-56, oy - 16, 112, 8)
    x.fillStyle = INK; x.fillRect(-20, oy - 34, 40, 18); x.fillStyle = '#9aa3b0'; x.fillRect(-14, oy - 28, 28, 10)
    x.restore()
  }

  const LIST = ROWS.map(([m, s], i) => [m, s, T.row0 + i * T.rowGap])
  LIST.header = 'DATE #1 REVIEW'
  const FRESH = [['v', 'date #2', T.tick]]
  FRESH.header = 'TONIGHT'

  // the paper ball: a crumpled pixel blob, tossed off to the right
  function drawBall(t) {
    if (t < T.crumple[1] || t > T.toss[1]) return
    const p = prog(t, ...T.toss)
    const bx = lerp(BOARD.x, 1240, p), by = lerp(BOARD.y + 40, BOARD.y - 120, p) - Math.sin(Math.PI * p) * 260
    const BALL = ['..XXX..', '.XWXXX.', 'XXXWXdX', 'XWXXXXX', 'XXdXWXX', '.XXXXd.', '..XXX..']
    drawBits(x, BALL, { X: '#fbf6ea', W: '#ffffff', d: '#cfc6b0' }, Math.round(bx), Math.round(by), 9, { rot: p * 8 })
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = heroState(t)
    if (t < T.cut) {
      const pin = easeOutBack(prog(t, T.star, T.star + 0.4), 2) * ok
      let sq = 0
      if (t > T.gasp && t < T.gasp + 0.5) sq += -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20)
      if (t > T.crumple[0] && t < T.crumple[1]) sq += 0.08 * Math.abs(Math.sin((t - T.crumple[0]) * 30))
      drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: VIR.color, glyph: VIR.glyph, ...st, pop: pin, squash: sq, hops: [T.star + 0.3, T.nod, T.relief, T.relief + 0.45], bob: 6, seed: 7, glow: 1.15 })
      // clipboard: shown until the crumple; then the scrunched ball flies off
      const cp = prog(t, ...T.crumple)
      if (cp < 1) {
        const jit = cp > 0 ? Math.sin(t * 60) * 6 : 0
        drawClipboard(t, BOARD.x + jit - cp * 60, BOARD.y + Math.sin(t * 2) * 5, LIST, { k: 1.2 * easeOutBack(prog(t, T.star + 0.1, T.star + 0.45), 2) * ok, rot: 0.06 + cp * 0.4, squeeze: ease.inCubic(cp) })
      }
      drawBall(t)
      if (t > T.relief) sparkles(t, HERO.x, HERO.y, T.relief, 10, 230, 1)
    } else {
      const pk = easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) * ok
      drawStarChar(x, FINAL.x, FINAL.y, FINAL.size, t, { color: VIR.color, glyph: VIR.glyph, ...st, pop: pk, hops: [T.h2Land, T.tick + 0.15, T.tick + 0.55], seed: 7, glow: 1.3 })
      drawClipboard(t, 745, 1010 + Math.sin(t * 2) * 5, FRESH, { k: 1.45 * pk, rot: 0.04 })
      sparkles(t, 700, 1010 - 130, T.tick + 0.1, 10, 220, 2, [GOLD, BONE, SAGE])
      sparkles(t, FINAL.x, FINAL.y, T.h2Land, 12, 270, 5)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "Mutable earth") and 9.2 (box shut → "Done is better than perfect.").
// cardfx keeps one for this film (the 9.2 one). End card flips at 11.6.
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear virgo: the clipboard, ten rows ticking and crossing
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.star + 0.08, 739.99, 0.04, -0.2], ['tick', T.star + 0.3, 0.035],
  ...ROWS.map(([m], i) => m === 'v' ? ['pluck', +(T.row0 + i * T.rowGap + 0.1).toFixed(3), 1174.66, 0.024, 0.3, 0.3] : m === 'x' ? ['pop', +(T.row0 + i * T.rowGap + 0.1).toFixed(3), 293.66, 0.03, 0.3] : ['tick', +(T.row0 + i * T.rowGap + 0.1).toFixed(3), 0.03]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.nod, 0.03],
  // mutable earth: gasp, scrunch, toss
  ...wordPops(T.h1, 3, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ['pop', T.gasp, 1318.51, 0.04, 0],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.crumple[0] + i * 0.07).toFixed(3), 0.035]),
  ['whoosh', T.toss[0], 0.4, 0.035], ['pop', T.toss[1] - 0.1, 440, 0.025, 0.8],
  ['glitter', T.relief, T.relief + 0.45], ['bell', T.relief + 0.05, 1318.51, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // done is better than perfect
  ...wordPops(T.h2, 4, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pluck', T.tick + 0.1, 1567.98, 0.045, 0.5, 0.3], ['bell', T.tick + 0.12, 1760, 0.028, 1.0, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
