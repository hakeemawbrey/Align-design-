// st4tally (15 s vertical Align ad, Star Talk season 4 · EP 073, thread A: the vote) · story 0–10.6, then the shared end
// card ("come" + the Align logo, cta SIGN UP TO VOTE YOUR CITY).
//   0.00–5.60  "Virgo is counting | the *votes.*"  The ♍ Virgo star with its checklist clipboard (starvirgo). Envelopes drop
//              in one at a time; Virgo squints at each, ticks its row on the clipboard TWICE (✓✓), and the envelope hops onto
//              a perfectly neat stack. No numbers anywhere: rows say VOTE, the marks are ticks.
//              Drop (2.82): VIRGO: "i'll count every single one. *twice.*"
//   5.60–8.40  "More are | *coming.*"  THE STARS: "relax. no winner *yet.*" → an avalanche of envelopes rains in and buries
//              Virgo up to its eyes, which blink out of the pile, wide… then happy.
//   8.40 cut → "Every vote | *counts.*"  Virgo pops up on top of the heap, clipboard held high with one big ✓; envelopes
//              flutter round it, a wink. Pops out by 10.45; the end card takes over at 10.6.
// Easter eggs: the seed constellation (EP 73) top-left; the ghost peeks out from behind the neat stack's left edge.
// One canvas (sky + stage), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 73
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SAGE = '#3f9a5e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const VIR = signStar('virgo')
const ROSE = VIR.color

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.42, 5.6],
  virIn: 0.35, boardIn: 0.55,
  counts: [0.95, 1.55, 2.15, 3.15, 3.75, 4.35],   // each: drops in, gets ✓ then ✓ again, hops to the stack
  open: 2.62, l1: 2.82,
  h1: 5.66, h1Land: 6.06, l2: 5.8, ava: [6.0, 7.5], gulp: 6.2, peek: 7.55, smile: 7.95,
  close: 8.3, h1Out: [8.16, 8.34],
  cut: 8.4,
  h2: 8.45, h2Land: 8.86, raise: 8.75, bigTick: 9.1, wink: [9.55, 9.95], h2Out: [10.2, 10.42], out: [10.05, 10.45],
  ghost: 4.75,
}
const LINES = [
  { t: T.l1, speaker: '♍ VIRGO STAR', text: "i'll count every single one. *twice.*", color: '#ff9cc0' },
  { t: T.l2, speaker: 'THE STARS', text: 'relax. no winner *yet.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

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
const ENV = ['WWWWWWWWWWW', 'WfWWWWWWWfW', 'WWfWWWWWfWW', 'WWWffHffWWW', 'WWWWWHWWWWW', 'WWWWWWWWWWW', 'sssssssssss']
const ENV_C = { W: '#fbf6ea', f: '#c9bfae', s: '#ddd2bd', H: '#ef5c94' }
const ENV_C2 = { W: '#f3ead8', f: '#bfb39f', s: '#d4c8b2', H: '#f2c75c' }
const TICK = ['.....X', '....XX', 'X..XX.', 'XXXX..', '.XX...']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const VIRGO = { x: 470, y: 1060, size: 300 }
const TOP = { x: 520, y: 1150, size: 320 }        // beat 3: on top of the heap
const BOARD = { x: 820, y: 1060, w: 250, h: 330 }
const STACK = { x: 180, base: 1330, cell: 10, step: 50 }
const ROW_H = 38

// the avalanche heap: envelopes stacked in rows into a mound, bottom rows first
const HEAP = (() => {
  const out = []
  let n = 0
  for (let j = 0; j < 7; j++) {
    const y = 1385 - j * 40
    const half = 470 * Math.sqrt(Math.max(0, 1 - (j / 7.4) ** 2)) * (j > 4 ? 0.85 : 1)
    const cnt = Math.max(1, Math.round(half * 2 / 92))
    for (let i = 0; i < cnt; i++) {
      const xx = 540 - half + (i + 0.5) * (half * 2 / cnt) + (hash(n) - 0.5) * 24
      out.push({ x: xx, y: y + (hash(n + 7) - 0.5) * 10, rot: (hash(n + 3) - 0.5) * 0.7, pal: n % 3 === 0 ? 1 : 0, n })
      n++
    }
  }
  const N = out.length
  out.forEach((e, k) => { e.t0 = T.ava[0] + (k / N) * (T.ava[1] - T.ava[0]) })
  return out
})()

function virState(t) {
  if (t < T.counts[0]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.l1 + 1.3) {
    // eyes follow each envelope: up as it drops in, over to the clipboard for the ticks, left as it hops to the stack
    for (const c of T.counts) {
      if (t >= c - 0.05 && t < c + 0.18) return { mood: 'squint', look: [0.3, -1], blink: false }
      if (t >= c + 0.18 && t < c + 0.42) return { mood: 'squint', look: [1, 0], blink: false }
      if (t >= c + 0.42 && t < c + 0.62) return { mood: 'squint', look: [-1, 0.4], blink: false }
    }
    return { mood: 'squint', look: [0, 0], blink: false }
  }
  if (t < T.counts[5] + 0.7) {
    for (const c of T.counts) {
      if (t >= c - 0.05 && t < c + 0.18) return { mood: 'squint', look: [0.3, -1], blink: false }
      if (t >= c + 0.18 && t < c + 0.42) return { mood: 'squint', look: [1, 0], blink: false }
      if (t >= c + 0.42 && t < c + 0.62) return { mood: 'squint', look: [-1, 0.4], blink: false }
    }
    return { mood: 'happy' }
  }
  if (t < T.gulp) return { mood: 'happy' }
  if (t < T.peek) return { mood: 'wide', look: [0, -1], blink: false }      // …more?? up there??
  if (t < T.smile) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.cut) return { mood: 'happy' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  if (t < T.bigTick) return { mood: 'happy' }
  return { mood: 'sparkle', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Virgo is counting | the *votes.*', { top: 196, size: 108, accentSize: 190, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0 + 0.38, wobble: true, accentColor: ROSE, lineHeight: 1.0 })
  const H1 = popText(root, 'More are | *coming.*', { top: 196, size: 124, accentSize: 200, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Every vote | *counts.*', { top: 196, size: 130, accentSize: 220, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

  // the clipboard: header COUNTED, one row per envelope, each row ticked twice (✓ ✓). beat 3: one big ✓ held high
  function drawBoard(t, cx, cy, { k = 1, rot = 0, big = 0 } = {}) {
    if (k <= 0.01) return
    const { w, h } = BOARD, P = 6
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(k, k)
    const ox = -w / 2, oy = -h / 2
    x.fillStyle = INK; x.fillRect(ox - P, oy, w + 2 * P, h); x.fillRect(ox, oy - P, w, h + 2 * P)
    x.fillStyle = '#b0773f'; x.fillRect(ox, oy, w, h)
    x.fillStyle = '#c98f52'; x.fillRect(ox, oy, w, P); x.fillRect(ox, oy, P, h)
    x.fillStyle = '#8a5a2c'; x.fillRect(ox, oy + h - P, w, P)
    const px0 = ox + 16, pw = w - 32, py0 = oy + 30, ph = h - 46
    x.fillStyle = INK; x.fillRect(px0 - P / 2, py0 - P / 2, pw + P, ph + P)
    x.fillStyle = '#fbf6ea'; x.fillRect(px0, py0, pw, ph)
    x.textBaseline = 'middle'; x.textAlign = 'left'
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('COUNTED', px0 + 12, py0 + 24)
    x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillRect(px0 + 12, py0 + 40, pw - 24, 3)
    if (big > 0) {
      // one big tick fills the page
      drawBits(x, TICK, { X: SAGE }, 0, py0 + ph / 2 + 20, 26 * easeOutBack(clamp(big), 2.6), { outline: null })
    } else {
      x.font = `700 26px ${MONO}`
      T.counts.forEach((c, i) => {
        if (t < c + 0.12) return
        const ry = py0 + 70 + i * ROW_H
        x.fillStyle = 'rgba(120,150,210,0.35)'; x.fillRect(px0 + 8, ry + ROW_H / 2 - 2, pw - 16, 2)
        for (let b = 0; b < 2; b++) {
          const bx = px0 + 12 + b * 34
          x.fillStyle = INK; x.fillRect(bx, ry - 13, 26, 26); x.fillStyle = '#fbf6ea'; x.fillRect(bx + 3, ry - 10, 20, 20)
          if (t >= c + 0.2 + b * 0.14) TICK.forEach((r, j) => [...r].forEach((ch, ii) => { if (ch === 'X') { x.fillStyle = SAGE; x.fillRect(bx + 1 + ii * 4, ry - 9 + j * 4, 4, 4) } }))
        }
        x.fillStyle = INK; x.fillText('VOTE', px0 + 86, ry + 1)
      })
    }
    // the clip
    x.fillStyle = INK; x.fillRect(-56, oy - 20, 112, 48)
    x.fillStyle = '#c9cfd8'; x.fillRect(-50, oy - 14, 100, 36)
    x.fillStyle = '#eef2f6'; x.fillRect(-50, oy - 14, 100, 8)
    x.restore()
  }

  // one counted envelope: drops in over Virgo's head, waits for its two ticks, hops in an arc onto the stack
  function envPos(t, c, i) {
    const p0 = prog(t, c - 0.25, c), p1 = prog(t, c + 0.42, c + 0.7)
    const hx = VIRGO.x + 10, hy = 780
    const sx = STACK.x, sy = STACK.base - 30 - i * STACK.step
    if (p1 <= 0) return { x: hx, y: lerp(560, hy, ease.outCubic(p0)), rot: 0.1 * Math.sin(t * 9), live: p0 > 0 }
    const q = ease.inOutCubic(p1)
    return { x: lerp(hx, sx, q), y: lerp(hy, sy, q) - Math.sin(Math.PI * p1) * 160, rot: lerp(0.1, 0, q) - Math.sin(Math.PI * p1) * 0.6, live: true }
  }
  function drawStack(t, ok) {
    T.counts.forEach((c, i) => {
      const p = envPos(t, c, i)
      if (!p.live) return
      drawBits(x, ENV, ENV_C, Math.round(p.x), Math.round(p.y), STACK.cell, { rot: p.rot, alpha: ok })
    })
  }

  function drawHeap(t, ok, dy = 0) {
    for (const e of HEAP) {
      if (t < e.t0) continue
      const p = prog(t, e.t0, e.t0 + 0.32)
      const yy = lerp(Math.min(e.y - 300, 560), e.y, ease.inQuad(p)) + dy
      const bounce = p >= 1 ? -Math.abs(Math.sin((t - e.t0 - 0.32) * 14)) * 8 * Math.exp(-(t - e.t0 - 0.32) * 9) : 0
      drawBits(x, ENV, e.pal ? ENV_C2 : ENV_C, Math.round(e.x), Math.round(yy + bounce), 8, { rot: e.rot * (0.4 + 0.6 * p), alpha: ok })
    }
  }

  // beat 3: envelopes flutter up around Virgo like confetti
  function flutter(t, ok) {
    for (let i = 0; i < 9; i++) {
      const born = T.raise + i * 0.18, life = 1.6
      const tt = t - born
      if (tt < 0 || tt > life) continue
      const p = tt / life
      const side = (hash(i + 40) - 0.5) * 820
      drawBits(x, ENV, i % 2 ? ENV_C2 : ENV_C, Math.round(540 + side + Math.sin(p * 7 + i) * 26), Math.round(1180 - p * 640), 5, { rot: Math.sin(t * 6 + i) * 0.5, alpha: Math.sin(Math.PI * p) * ok })
    }
  }

  function drawStage(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const fin = t >= T.cut
    const hops = [T.virIn + 0.28, ...T.counts.map(c => c + 0.2), ...talkHops(LINES.slice(0, 1), LINES[0].speaker, { cps: CPS }).filter(h => h > 3.0), T.gulp, T.smile, T.h2Land, T.bigTick]
    const vk = pop01(t, T.virIn, 0.38, 2.2) * ok
    if (!fin) {
      // the neat stack (and the ghost peeking past its left edge), Virgo, the clipboard, then the avalanche on top
      drawStack(t, ok)
      drawGhostCameo(x, t, { x: STACK.x - 56 - 8, y: 1240, at: T.ghost, dur: 1.4, from: 'right', cell: 3 })
      if (vk > 0.02) {
        const gulp = t >= T.gulp && t < T.gulp + 0.5 ? -0.12 * Math.exp(-(t - T.gulp) * 7) * Math.cos((t - T.gulp) * 20) : 0
        const sink = 10 * ease.inOutCubic(prog(t, T.ava[0] + 0.6, T.ava[1]))
        drawStarChar(x, VIRGO.x, VIRGO.y + sink, VIRGO.size, t, { color: ROSE, glyph: VIR.glyph, ...virState(t), hops, pop: vk, squash: gulp, seed: 5, glow: 1.1 })
        const tap = T.counts.some(c => t >= c + 0.18 && t < c + 0.4) ? 0.03 * Math.sin(t * 50) : 0
        drawBoard(t, BOARD.x, BOARD.y + Math.sin(t * 2.2) * 5, { k: pop01(t, T.boardIn, 0.36, 2) * ok, rot: 0.06 + tap })
      }
      drawHeap(t, ok)
      if (t > T.smile) sparkles(t, VIRGO.x, 1000, T.smile, 10, 220, 1, [GOLD, ROSE, BONE])
    } else {
      // on top of the heap (which sits lower now that the box has gone)
      const lift = easeOutBack(prog(t, T.cut - 0.02, T.cut + 0.35), 1.8)
      drawHeap(t, ok, 180)
      flutter(t, ok)
      const r = drawStarChar(x, TOP.x, TOP.y + (1 - lift) * 160, TOP.size, t, { color: ROSE, glyph: VIR.glyph, ...virState(t), hops, pop: ok, seed: 5, glow: 1.25 })
      const rk = easeOutBack(prog(t, T.raise, T.raise + 0.4), 2)
      drawBoard(t, lerp(BOARD.x, 810, rk), lerp(1200, 900, rk), { k: ok, rot: lerp(0.06, -0.12, rk), big: prog(t, T.bigTick, T.bigTick + 0.3) })
      sparkles(t, r.x, r.y, T.h2Land, 12, 250, 2, [GOLD, ROSE, BONE, PINK])
      sparkles(t, 810, 900, T.bigTick + 0.1, 10, 190, 4, [GOLD, '#9ff3c4', BONE])
      if (t > T.bigTick + 0.4) {
        for (let i = 0; i < 5; i++) {
          const born = T.bigTick + 0.4 + i * 0.25, p = (t - born) / 1.2
          if (p < 0 || p >= 1) continue
          drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(TOP.x - 120 + i * 50 + Math.sin(p * 6 + i) * 12), Math.round(TOP.y - 140 - p * 200), 6, { alpha: Math.sin(Math.PI * p) * ok })
        }
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const shake = t > T.ava[0] && t < T.ava[1] + 0.2 ? Math.sin(t * 70) * 3 : 0
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, dy: shake })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.62 (H0 out → "More are coming.") and 8.40 (box shut → "Every vote counts.").
// cardfx keeps one for a 15 s film (the 8.40 one). End card flips at 10.6.
const CUTS = [5.62, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }),
  cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // virgo is counting: each envelope drops in, two ticks, a hop onto the stack
  ...wordPops(T.h0, 4, 0.08, 0, 0.026), ['pop', T.h0 + 0.38, 1174.66, 0.045, 0],
  ['pop', T.virIn + 0.05, 880, 0.045, 0], ['whoosh', T.boardIn, 0.3, 0.025], ['tick', T.boardIn + 0.2, 0.04],
  ...T.counts.flatMap((c, i) => [
    ['whoosh', +(c - 0.25).toFixed(3), 0.22, 0.014], ['tick', c, 0.03],
    ['pluck', +(c + 0.2).toFixed(3), 1318.51, 0.03, 0.3, 0.4], ['pluck', +(c + 0.34).toFixed(3), 1567.98, 0.03, 0.3, 0.4],
    ['pop', +(c + 0.7).toFixed(3), NOTE[i % 7], 0.03, -0.4],
  ]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.1, 1567.98, 0.012, -0.4],
  // more are coming: the avalanche
  ...wordPops(T.h1, 2, 0.08, 1, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gulp, 440, 0.04, 0],
  ...HEAP.filter((_, k) => k % 3 === 0).map((e, k) => ['tick', +(e.t0 + 0.32).toFixed(3), 0.022 + 0.008 * (k % 2)]),
  ['whoosh', T.ava[0], 1.4, 0.03], ['boom', T.ava[1], 0.1],
  ['pop', T.peek, 1318.51, 0.035, 0], ['pluck', T.smile, 1174.66, 0.035, 0.5, 0], ['glitter', T.smile, T.smile + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // every vote counts
  ...wordPops(T.h2, 2, 0.09, 2, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['whoosh', T.raise, 0.35, 0.025], ['pluck', T.bigTick, 1567.98, 0.05, 0.6, 0.3], ['bell', T.bigTick + 0.05, 2093, 0.022, 1.0, 0.3],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
