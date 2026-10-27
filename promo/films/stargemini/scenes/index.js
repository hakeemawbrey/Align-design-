// stargemini (15 s vertical Align ad, Star Talk batch 3) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–5.10  "Dear *Gemini…*"  The ♊ star (Mercury-ruled, mutable air) bounces in and chat bubbles pop up over its head,
//              one after another, until twelve of them are stacked up, all typing "…" at once. Its eyes dart between them.
//              Drop (2.82): the box opens. THE STARS: "you have 47 tabs open on 12 people." → caught, wide-eyed.
//   5.10–8.40  "Ruled by Mercury. | Chronically *online.*"  THE STARS: "close the tabs. *pick one* chat." → the bubbles pop,
//              pop, pop, until one is left; it floats down to the star, which goes sparkle-eyed.
//   8.45 cut → "Depth over | *dopamine.*"  The one chat, big now: "tell me more?" The star leans in, heart-eyed.
//              Everything pops out by 10.45; the end card takes over at 10.6.
// One canvas (sky + star + bubbles), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SKYBLUE = '#8fd3ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GEM = signStar('gemini')
const LEMON = '#ffe066'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.92, 5.1],
  star: 0.22, bub0: 0.55, bubGap: 0.15,
  open: 2.36, l1: 2.55, caught: 3.85,
  h1: 5.16, h1Land: 5.6, l2: 5.3, pop0: 5.95, popGap: 0.085, gather: [7.0, 7.45], sparkle: 7.45, close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.92, msg: 9.15, lean: 9.3, h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you have 47 tabs open on *12 people.*', color: LEMON },
  { t: T.l2, speaker: SPEAK, text: 'close the tabs. *pick one* chat.', color: LEMON },
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
const HERO = { x: 540, y: 1130, size: 330 }
const FINAL = { x: 470, y: 1200, size: 420 }
const KEEP = 7                                         // the chat that survives
// twelve bubbles stacked over its head (centre x, y, tilt) — jittered rows, sign-coloured contact dots
const BUBS = Array.from({ length: 12 }, (_, i) => {
  const row = Math.floor(i / 3), col = i % 3
  const jx = [[-20, 30, -10], [25, -15, 20], [-30, 10, 35], [15, -25, 0]][row][col]
  return { x: 250 + col * 290 + jx + (row % 2 ? 40 : -20), y: 905 - row * 104 - (col === 1 ? 22 : 0), rot: ((i * 37) % 9 - 4) * 0.02, color: SIGNS[i].color }
})
// pop order (KEEP last, never popped)
const POP_ORDER = [11, 0, 5, 9, 2, 6, 10, 1, 4, 8, 3]

function heroState(t) {
  if (t < T.bub0) return { mood: 'happy' }
  if (t < T.caught) {
    // eyes dart from bubble to bubble
    const k = Math.floor((t - T.bub0) / 0.19)
    const L = [[-1, -1], [1, -1], [0, -1], [1, -1], [-1, -1], [1, 0], [-1, 0]][k % 7]
    return { mood: t < T.open ? 'wide' : 'neutral', look: L, blink: false }
  }
  if (t < T.l2 + 0.3) return { mood: 'wide', look: [0, 0], blink: false }       // caught.
  if (t < T.pop0) return { mood: 'neutral', look: [0, -1] }
  if (t < T.sparkle) return { mood: 'squint', look: [0, -1], blink: false }      // concentrating: pop, pop, pop
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.msg + 0.15) return { mood: 'happy' }
  return { mood: 'heart', look: [1, -1] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Gemini…*', { top: 260, size: 118, accentSize: 166, at: T.h0, gap: 0.12, accentColor: LEMON, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Ruled by Mercury. | Chronically *online.*', { top: 210, size: 92, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: LEMON })
  const H2 = popText(root, 'Depth over | *dopamine.*', { top: 190, size: 136, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: LEMON, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LEMON]) {
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

  // one typing bubble: a bone pixel balloon with a contact dot and the bouncing "…" (or a message once `text` is set)
  function chat(t, cx, cy, k, { color, rot = 0, scale = 1, seed = 0, text = null, textK = 0 }) {
    if (k <= 0.01) return
    const c = 7 * scale, h = 13
    let w = 24
    if (text) { x.save(); x.font = `700 ${Math.round(c * 4.6)}px 'Space Mono', monospace`; w = Math.ceil(x.measureText(text).width / c) + 14; x.restore() }
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(k, k)
    const ox = -w * c / 2, oy = -h * c / 2
    x.fillStyle = INK; x.fillRect(ox, oy - c, w * c, (h + 2) * c); x.fillRect(ox - c, oy, (w + 2) * c, h * c)
    x.fillStyle = BONE; x.fillRect(ox + c, oy, (w - 2) * c, h * c); x.fillRect(ox, oy + c, w * c, (h - 2) * c)
    // tail (down-left)
    x.fillStyle = INK; x.fillRect(ox + 3 * c, oy + h * c, 4 * c, 2 * c); x.fillRect(ox + 2 * c, oy + (h + 2) * c, 2 * c, 2 * c)
    x.fillStyle = BONE; x.fillRect(ox + 4 * c, oy + (h - 1) * c, 2 * c, 2 * c); x.fillRect(ox + 3 * c, oy + (h + 1) * c, c, c)
    // contact dot
    x.fillStyle = INK; x.fillRect(ox + 2 * c, oy + 3 * c, 7 * c, 7 * c)
    x.fillStyle = color; x.fillRect(ox + 3 * c, oy + 4 * c, 5 * c, 5 * c)
    if (text && textK > 0) {
      x.globalAlpha *= textK
      x.fillStyle = INK; x.font = `700 ${Math.round(c * 4.6)}px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText(text, ox + 10.5 * c, 1)
    } else {
      // "…" typing dots, each bouncing out of phase
      for (let i = 0; i < 3; i++) {
        const up = Math.floor(((t * 3.4 + seed * 0.37 - i * 0.28) % 1 + 1) % 1 * 2) === 0 ? c : 0
        x.fillStyle = i === 1 ? '#6a5a8e' : '#4a3d70'
        x.fillRect(ox + (11 + i * 4.5) * c, oy + 5 * c - up, 3 * c, 3 * c)
      }
    }
    x.restore()
  }

  function bubbleState(t, i) {
    const born = T.bub0 + i * T.bubGap
    let k = easeOutBack(prog(t, born, born + 0.24), 2.6)
    const b = BUBS[i]
    let cx = b.x + Math.sin(t * 2.6 + i) * 6, cy = b.y + Math.sin(t * 3.1 + i * 1.7) * 5, rot = b.rot, popped = null
    const pi = POP_ORDER.indexOf(i)
    if (pi >= 0) {
      const pt = T.pop0 + pi * T.popGap
      if (t >= pt) { popped = pt; k = 0 } else if (t > pt - 0.06) k *= 1 + 0.25 * prog(t, pt - 0.06, pt)
    } else if (t >= T.gather[0]) {
      // the survivor floats down to the star, straightens up and grows a little
      const g = ease.inOutCubic(prog(t, ...T.gather))
      cx = lerp(cx, HERO.x + 120, g); cy = lerp(cy, HERO.y - 300, g); rot = lerp(rot, 0, g)
      k *= lerp(1, 1.25, g)
    }
    return { k, cx, cy, rot, popped }
  }

  function poof(t, cx, cy, t0, color) {
    const d = t - t0
    if (d < 0 || d > 0.4) return
    const p = d / 0.4
    x.save(); x.globalAlpha = 1 - p
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + t0 * 3, r = 30 + p * 90, s = Math.round(14 * (1 - p)) + 4
      x.fillStyle = i % 2 ? BONE : color
      x.fillRect(Math.round(cx + Math.cos(a) * r - s / 2), Math.round(cy + Math.sin(a) * r * 0.7 - s / 2), s, s)
    }
    x.restore()
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = heroState(t)
    if (t < T.cut) {
      const pin = easeOutBack(prog(t, T.star, T.star + 0.4), 2) * ok
      // bouncy while the bubbles stack (fast, chatty), a jolt when caught
      const hops = [T.star + 0.3, ...Array.from({ length: 6 }, (_, i) => T.bub0 + 0.1 + i * 0.45), T.sparkle]
      let sq = 0
      if (t > T.caught && t < T.caught + 0.6) sq += -0.14 * Math.exp(-(t - T.caught) * 7) * Math.cos((t - T.caught) * 20)
      drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: GEM.color, glyph: GEM.glyph, ...st, pop: pin, squash: sq, hops, seed: 2, glow: 1.15 })
      // bubbles: back rows first so the front ones overlap them
      for (let i = 11; i >= 0; i--) {
        const s = bubbleState(t, i)
        if (s.popped !== null) { poof(t, s.cx, s.cy, s.popped, BUBS[i].color); continue }
        chat(t, s.cx, s.cy, s.k * ok, { color: BUBS[i].color, rot: s.rot, seed: i })
      }
      if (t > T.sparkle) { const s = bubbleState(t, KEEP); sparkles(t, s.cx, s.cy, T.sparkle, 10, 200, 1) }
    } else {
      const pk = easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) * ok
      const lean = 18 * ease.inOutCubic(prog(t, T.lean, T.lean + 0.4))
      drawStarChar(x, FINAL.x + lean, FINAL.y, FINAL.size, t, { color: GEM.color, glyph: GEM.glyph, ...st, pop: pk, hops: [T.h2Land, T.msg + 0.2], seed: 2, glow: 1.3 })
      const tk = prog(t, T.msg, T.msg + 0.12)
      chat(t, 600, 840 + Math.sin(t * 2.4) * 6, pk, { color: BUBS[KEEP].color, scale: 1.3, text: tk > 0 ? 'tell me more?' : null, textK: tk, seed: KEEP })
      sparkles(t, 600, 840, T.msg, 10, 280, 3)
      sparkles(t, FINAL.x, FINAL.y, T.h2Land, 12, 280, 5)
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

// card-motif candidates: 5.12 (H0 out → "Ruled by Mercury") and 8.45 (box shut → "Depth over dopamine.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear gemini: the star bounces in, twelve bubbles pop up
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.star + 0.08, 739.99, 0.04, 0],
  ...BUBS.map((b, i) => ['pop', +(T.bub0 + i * T.bubGap + 0.04).toFixed(3), NOTE[i % 7] * (i > 6 ? 2 : 1), 0.024, +((b.x - 540) / 600).toFixed(2)]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.caught, 1318.51, 0.045, 0], ['bell', T.caught + 0.02, 1760, 0.022, 0.8, 0],
  // ruled by mercury: pop pop pop
  ...wordPops(T.h1, 3, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ...POP_ORDER.map((i, k) => ['pop', +(T.pop0 + k * T.popGap).toFixed(3), NOTE[(10 - k) % 7] * 2, 0.03, +((BUBS[i].x - 540) / 600).toFixed(2)]),
  ['whoosh', T.gather[0], 0.4, 0.03], ['glitter', T.sparkle, T.sparkle + 0.45], ['bell', T.sparkle + 0.05, 1318.51, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // depth over dopamine
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.msg, 1567.98, 0.04, 0.3], ['pluck', T.msg + 0.2, 1174.66, 0.04, 0.5, -0.2], ['bell', T.msg + 0.25, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
