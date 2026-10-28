// st4ghosted (15 s vertical Align ad, Star Talk season 4, EP 024, thread C2: the ghost's redemption) · story 0–10.6, then the end card.
//   0.00–6.35  "The ghost got | *ghosted.*"  The ghost (stghost's sheet) waits at a coffee-shop table under a pendant lamp: its cup
//              steams, the cup across from it doesn't. Three texts go out, each marked DELIVERED: "hey! i'm here :)",
//              "grabbed us a table", "…still coming?". A typing bubble appears, then vanishes. The wall clock spins. Nobody shows.
//              Box (GHOST): "oh. *THIS* is how it feels."  (it sinks; one tear)
//   6.40       card cut (flip): THE STARS' star is sitting in the empty chair. The ghost blushes.
//   6.50–10.45 THE STARS: "now you know why a kind goodbye *matters.*"  Headline: "Be the *kind* | you wanted."  Box shuts 9.75.
// The ghost is the star of this episode, so there's no extra cameo; lore.json records where it sits.
// One canvas (sky + constellation + café + ghost), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 24
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', ICE = '#bcd8ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.55, h0Out: [6.2, 6.38],
  sceneIn: [0.05, 0.45], texts: [1.0, 1.9, 2.8], typing: [3.15, 3.75], sink: [3.4, 4.6], tear: 4.4,
  open: 3.45, l1: 3.62,
  cut: 6.4, sit: 6.45, l2: 6.55, blush: 7.2,
  h1: 6.5, h1Land: 6.95, close: 9.75, out: [10.05, 10.45], h1Out: [10.15, 10.4],
}
const GH = 'GHOST', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: GH, color: ICE, text: 'oh. *THIS* is how it feels.' },
  { t: T.l2, speaker: SPEAK, text: 'now you know why a kind goodbye *matters.*' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })
const TEXTS = ["hey! i'm here :)", 'grabbed us a table', '…still coming?']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; word bigIdx pops big at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, bigIdx = -1, lateAt = null, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = n === bigIdx
    ws.push({ t: big ? lateAt : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.H.H. HWHHH HHHHH .HHH. ..H..`)
const DROP = BMP(`..X.. .XXX. XXWXX XXXXX .XXX.`)
function bits(x, bm, cx, cy, cell, cols, { a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect(Math.round(cx + (i - w / 2) * cell), Math.round(cy + (j - h / 2) * cell), Math.ceil(cell), Math.ceil(cell)) }))
  x.restore()
}

// ── layout
const GHOST = { x: 300, y: 1060, cell: 8 }
const SEAT = { x: 785, y: 1075, s: 230 }
const TABLE_Y = 1180
const CLOCK = { x: 190, y: 655, r: 62 }
const STAR_HOPS = [T.sit + 0.25, ...talkHops(LINES, SPEAK, { cps: CPS }), T.h1Land + 0.2]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 38px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The ghost got | *ghosted.*', { top: 200, size: 118, accentSize: 190, at: T.h0, bigIdx: 3, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: ICE, lineHeight: 0.98 })
  const H1 = popText(root, 'Be the *kind* | you wanted.', { top: 200, size: 118, accentSize: 180, at: T.h1, bigIdx: 2, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out]]
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

  // ── the café: a pendant lamp over the table, a wall clock, two chairs, two cups
  function lamp(t, lx, a) {
    x.save(); x.globalAlpha = a
    x.strokeStyle = rgba(BONE, 0.45); x.lineWidth = 3; { const cg = x.createLinearGradient(0, 470, 0, 820); cg.addColorStop(0, rgba(BONE, 0)); cg.addColorStop(1, rgba(BONE, 0.5)); x.strokeStyle = cg; x.beginPath(); x.moveTo(lx, 470); x.lineTo(lx, 820); x.stroke() }
    glow(lx, 900, 380, '#ffc978', 0.55 + 0.05 * Math.sin(t * 3))
    x.fillStyle = INK; x.beginPath(); x.moveTo(lx - 74, 878); x.lineTo(lx - 30, 814); x.lineTo(lx + 30, 814); x.lineTo(lx + 74, 878); x.closePath(); x.fill()
    x.fillStyle = '#c98b3a'; x.beginPath(); x.moveTo(lx - 64, 872); x.lineTo(lx - 26, 820); x.lineTo(lx + 26, 820); x.lineTo(lx + 64, 872); x.closePath(); x.fill()
    x.fillStyle = '#fff1c8'; x.fillRect(lx - 22, 872, 44, 10)
    x.restore()
  }
  function clock(t, a) {
    if (a <= 0) return
    // spins fast while waiting (time passing), then settles
    const spin = t < T.cut ? (t < T.texts[0] ? 0 : (t - T.texts[0]) * (t < T.typing[1] ? 3.2 : 1.6)) : 0
    const { x: cx, y: cy, r } = CLOCK
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#f4ecdc'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; x.fillRect(cx + Math.cos(an) * (r - 12) - 3, cy + Math.sin(an) * (r - 12) - 3, 6, 6) }
    const hand = (an, L, w) => { x.save(); x.translate(cx, cy); x.rotate(an); x.fillRect(-w / 2, -L, w, L); x.restore() }
    hand(0.4 + spin * 0.08, r * 0.5, 9); hand(-0.2 + spin, r * 0.78, 6)
    x.fillStyle = '#e05a4a'; x.beginPath(); x.arc(cx, cy, 7, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function chair(cx, a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(cx - 118, 930, 236, 30); x.fillRect(cx - 108, 940, 22, 260); x.fillRect(cx + 86, 940, 22, 260)
    x.fillStyle = '#6a3f2a'; x.fillRect(cx - 110, 936, 220, 18); x.fillRect(cx - 102, 946, 12, 250); x.fillRect(cx + 90, 946, 12, 250)
    x.fillStyle = '#8a5a3a'; x.fillRect(cx - 96, 990, 192, 14); x.fillRect(cx - 96, 1040, 192, 14)
    x.restore()
  }
  function table(a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = 'rgba(6,4,18,0.5)'; x.beginPath(); x.ellipse(540, 1380, 380, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(100, TABLE_Y - 8, 880, 46); x.fillRect(500, TABLE_Y + 30, 80, 180)
    x.fillStyle = '#7a4a2e'; x.fillRect(108, TABLE_Y, 864, 30)
    x.fillStyle = '#a06a44'; x.fillRect(108, TABLE_Y, 864, 8)
    x.fillStyle = '#5a3420'; x.fillRect(510, TABLE_Y + 38, 60, 170)
    x.restore()
  }
  function cup(cx, t, steam, a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(cx - 46, TABLE_Y - 92, 92, 92); x.fillRect(cx + 40, TABLE_Y - 74, 30, 46)
    x.fillStyle = '#f4ecdc'; x.fillRect(cx - 38, TABLE_Y - 84, 76, 80); x.fillStyle = '#d9cdb6'; x.fillRect(cx + 20, TABLE_Y - 84, 18, 80)
    x.fillStyle = INK; x.fillRect(cx + 46, TABLE_Y - 66, 16, 30); x.fillStyle = '#f4ecdc'; x.fillRect(cx + 46, TABLE_Y - 60, 10, 18)
    x.fillStyle = '#6a3f2a'; x.fillRect(cx - 38, TABLE_Y - 84, 76, 10)
    x.fillStyle = 'rgba(6,4,18,0.6)'; x.fillRect(cx - 60, TABLE_Y - 6, 120, 6)
    if (steam > 0) for (let k = 0; k < 3; k++) {
      const ph = (t * 0.7 + k / 3) % 1
      x.globalAlpha = a * steam * Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE
      for (let j = 0; j < 5; j++) x.fillRect(Math.round(cx - 16 + k * 16 + Math.sin(ph * 6 + j + k) * 7), Math.round(TABLE_Y - 110 - ph * 90 - j * 9), 6, 6)
    }
    x.restore()
  }

  // ── the texts: three sent bubbles, each DELIVERED, no reply (a typing bubble teases, then vanishes)
  function texts(t) {
    const ok = outK(t, [T.cut - 0.2, T.cut])
    if (ok <= 0) return
    x.save(); x.font = `700 38px ${INTER}`
    TEXTS.forEach((s, i) => {
      const k = pop01(t, T.texts[i], 0.34, 2.3) * ok
      if (k <= 0.01) return
      const tw = x.measureText(s).width, bw = tw + 60, bh = 78, bx = 1010 - bw, by = 520 + i * 118
      x.save(); x.translate(bx + bw, by); x.scale(k, k); x.translate(-bw, 0)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-6, -6, bw + 12, bh + 12, 36); x.fill()
      x.fillStyle = '#3a7bff'; x.beginPath(); x.roundRect(0, 0, bw, bh, 30); x.fill()
      x.fillStyle = '#ffffff'; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText(s, 30, bh / 2 + 2)
      x.restore()
      // DELIVERED moves down to the newest bubble
      const last = i === TEXTS.length - 1 || t < T.texts[i + 1]
      if (last && t > T.texts[i] + 0.3) {
        x.save(); x.globalAlpha = ok * clamp((t - T.texts[i] - 0.3) * 4); x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.7); x.textAlign = 'right'; x.letterSpacing = '0.14em'
        x.fillText('DELIVERED', 1006, by + bh + 26); x.letterSpacing = '0px'; x.restore()
      }
    })
    // typing… then nothing
    const tk = pop01(t, T.typing[0], 0.25, 2.4) * (1 - ease.inCubic(prog(t, T.typing[1] - 0.12, T.typing[1]))) * ok
    if (tk > 0.01 && t < T.typing[1]) {
      const bx = 520, by = 860
      x.save(); x.translate(bx, by); x.scale(tk, tk)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-6, -6, 142, 82, 36); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.roundRect(0, 0, 130, 70, 30); x.fill()
      for (let d = 0; d < 3; d++) { x.fillStyle = INK; x.globalAlpha = 0.4 + 0.6 * (Math.sin(t * 10 - d) > 0 ? 1 : 0); x.fillRect(30 + d * 28, 30 + (Math.sin(t * 10 - d) > 0 ? -4 : 0), 14, 14) }
      x.restore()
    }
    x.restore()
  }

  function drawGhost(t, ok) {
    const sink = ease.inOutCubic(prog(t, ...T.sink)) * (t < T.cut ? 1 : 1 - ease.outCubic(prog(t, T.sit, T.sit + 0.6)))
    const bob = Math.sin(t * 2.1) * 6
    let look = [1, -1], wide = false
    if (t < T.texts[0]) look = [1, -1]
    else if (t < T.typing[1]) look = [1, -1]
    else if (t < T.cut) { look = [0, 1]; wide = t > T.typing[1] && t < T.typing[1] + 0.5 }
    else look = t < T.sit + 0.4 ? [1, 0] : [1, 0]
    if (t > T.typing[0] && t < T.typing[1]) wide = true
    const blush = t >= T.cut ? clamp(prog(t, T.blush - 0.3, T.blush + 0.3)) : 0
    drawGhostSheet(x, t, GHOST.x, GHOST.y + sink * 34 + bob, GHOST.cell * clamp(ok), { look, wide, blush, rot: -0.06 * sink + (t > T.blush ? 0.04 * Math.sin((t - T.blush) * 5) * Math.exp(-(t - T.blush)) : 0) })
    // one tear
    const d = t - T.tear
    if (d > 0 && d < 1.1 && t < T.cut) bits(x, DROP, GHOST.x - 4.5 * GHOST.cell + 4, GHOST.y + sink * 34 + bob + d * 120, 6, { X: '#8fd8f6', W: '#ffffff' }, { a: 1 - d / 1.1 })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ICE]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.3, life = 1.5
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * 360 + Math.sin(p * 4 + i) * 16, cy - p * 200, 7 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { H: '#ff4f6e', W: '#ffd1de' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), ink = easeOutBack(prog(t, ...T.sceneIn), 1.5)
      if (t < T.out[1] + 0.02) {
        const a = clamp(ink) * clamp(ok)
        lamp(t, 540, a)
        clock(t, a)
        chair(GHOST.x, a); chair(SEAT.x, a)
        drawGhost(t, ok * clamp(ink))
        if (t >= T.cut) drawStarChar(x, SEAT.x, SEAT.y, SEAT.s * pop01(t, T.cut + 0.02, 0.36, 2.2) * ok, t, {
          color: STAR.sky, mood: t < LT[1].done ? 'happy' : t < T.close - 0.6 ? 'neutral' : 'wink', look: [-1, 0], hops: STAR_HOPS, seed: 5, glow: 1.1 })
        table(a)
        cup(GHOST.x + 90, t, 1, a)
        cup(SEAT.x - 90, t, t >= T.cut ? 1 : 0, a)      // the empty seat's coffee goes cold… until someone sits there
        texts(t)
        sparkles(t, SEAT.x, SEAT.y, T.cut + 0.1, 10, 190, 1)
        if (t > T.blush) floatHearts(t, 540, 960, T.blush, T.out[0] - 0.4, 2)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 6.4 (the texts clear; THE STARS' star appears in the empty chair). Plays.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['bell', T.h0Land + 0.02, 1318.51, 0.018, 1.2, 0],
  ...T.texts.flatMap((s, i) => [['whoosh', +(s - 0.08).toFixed(3), 0.16, 0.025], ['pop', s, [1174.66, 987.77, 880][i], 0.045, 0.35]]),
  ['pop', T.typing[0], 739.99, 0.03, -0.2], ['pop', T.typing[1] - 0.1, 587.33, 0.03, -0.2],
  ['tick', 1.4, 0.02], ['tick', 1.9, 0.02], ['tick', 2.4, 0.02], ['tick', 2.9, 0.02], ['tick', 3.4, 0.02],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GH]: 587.33 } }),
  ['pluck', T.tear, 1318.51, 0.025, 0.8, -0.3],
  ['pop', T.sit + 0.05, 987.77, 0.045, 0.3], ['glitter', T.sit + 0.05, T.sit + 0.5],
  ...wordPops(T.h1, 2, 0.1, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.055, 0], ['pluck', T.h1Land, 1174.66, 0.045, 0.7, 0],
  ['bell', T.blush, 1760, 0.02, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
