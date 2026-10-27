// starpisces (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.75  "Dear *Pisces…*"  First date at a tiny pixel café table (a "DATE #1" tent card). The lavender ♓ star (mutable
//              water; Jupiter-ruled, Neptune in modern astrology) gazes up, sparkle-eyed, at a dreamy thought bubble that fills
//              up thing by thing: a wedding ring, two cats, a cottage. Across the table the pink ♍ Virgo star (its opposite
//              sign) waits, then blinks at it. Drop (2.82): THE STARS: "it's the first date, babe."
//   5.75–9.10  "Neptune-ruled. | Already *married.*"  THE STARS: "fall for who they *are,* not who you *imagined.*" → the
//              bubble POPS into sparkles; wide eyes; the Pisces star turns to its date and they both smile.
//   9.16 cut → "Stay *here.* | It's nice."  Just the two of them at the table, lower now; Pisces goes heart-eyed at the
//              real one. Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + table + bubble + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const PIS = signStar('pisces'), VIR = signStar('virgo')
const LAV = PIS.color, ACC = '#b9b3ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.55, 5.73],
  stars: 0.3, table: 0.45, bubble: 0.95, ring: 1.3, cats: 1.75, house: 2.2,
  open: 2.62, l1: 2.84, virBlink: 3.6, virLook: 4.2,
  h1: 5.78, h1Land: 6.2, l2: 5.9, pop: 7.6, turn: 7.85, smile: 8.15,
  close: 9.06, h1Out: [8.92, 9.1],
  cut: 9.16, h2: 9.22, h2Land: 9.66, heart: 10.05, h2Out: [11.15, 11.4], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "it's the first date, *babe.*", color: PINK },
  { t: T.l2, speaker: SPEAK, text: 'fall for who they *are,* not who you *imagined.*', color: ACC },
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


// ── pixel props (the daydream)
const RING = [
  '....DDD....',
  '...DWWWD...',
  '....DDD....',
  '...GGGGG...',
  '..GG...GG..',
  '.GG.....GG.',
  '.G.......G.',
  '.GG.....GG.',
  '..GG...GG..',
  '...GGGGG...',
]
const RING_C = { D: '#8fe3ff', W: '#ffffff', G: '#f2c75c' }
const CATS = [
  'O...O...K...K.',
  'OO.OO...KK.KK.',
  'OOOOO...KKKKK.',
  'OeOeO...KeKeK.',
  'OOpOO...KKpKK.',
  '.OOO.....KKK..',
  'OOOOO...KKKKK.',
  'OOOOOO..KKKKKK',
  'OOOOO.O.KKKKK.',
]
const CATS_C = { O: '#f2a65a', K: '#5b5470', e: '#1b1236', p: '#ff8fb1' }
const HOUSE = [
  '......RR.....',
  '.....RRRR.c..',
  '....RRRRRRc..',
  '...RRRRRRRR..',
  '..RRRRRRRRRR.',
  '.RRRRRRRRRRRR',
  '..WWWWWWWWW..',
  '..WbbWWWbbW..',
  '..WbbWWWbbW..',
  '..WWWddWWWW..',
  '..WWWddWWWW..',
  'gggggddgggggg',
]
const HOUSE_C = { R: '#e8445a', c: '#9a8a8a', W: '#fbf1dc', b: '#8fd3ff', d: '#8a5a34', g: '#4fbf6a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const PIS0 = { x: 765, y: 1140, size: 320 }
const VIR0 = { x: 305, y: 1150, size: 290 }
const TABLE = { x: 535, y: 1268, w: 330 }
const BUB = { x: 620, y: 760, w: 640, h: 300 }
const LOW = 130
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function pisState(t) {
  if (t < T.bubble) return { mood: 'happy' }
  if (t < T.pop) return { mood: 'sparkle', look: [-0.4, -1], blink: false }      // lost in the daydream
  if (t < T.turn) return { mood: 'wide', look: [0, -1], blink: false }          // pop!
  if (t < T.smile) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function virState(t) {
  if (t < T.virBlink) return { mood: 'happy', look: [1, 0] }
  if (t < T.virLook) return { mood: 'neutral', look: [1, -1] }                    // …what are you looking at?
  if (t < T.pop) return { mood: 'squint', look: [1, -1], blink: false }
  if (t < T.smile) return { mood: 'neutral', look: [1, 0] }
  return { mood: 'happy', look: [1, 0], blush: 1 }
}
const PIS_HOPS = [T.stars + 0.3, T.ring + 0.05, T.house + 0.05, T.pop + 0.05, T.smile, T.h2Land, T.heart]
const VIR_HOPS = [T.stars + 0.4, T.virLook, T.smile + 0.1, T.h2Land + 0.1, 10.7]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Pisces…*', { top: 250, size: 128, accentSize: 186, at: T.h0, gap: 0.12, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Neptune-ruled. | Already *married.*', { top: 190, size: 96, accentSize: 136, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Stay *here.* | It’s nice.', { top: 200, size: 140, accentSize: 200, at: T.h2, gap: 0.12, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ACC]) {
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
      const hx = cx + side * 200 + Math.sin(p * 7 + i) * 18, hy = cy - 40 - p * 220
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  /** a pixel cloud: union of cell-snapped circles */
  function cloud(cx, cy, w, h, c, fillC, edge) {
    const blobs = [[0, 0.08, 0.5], [-0.28, 0.12, 0.42], [0.28, 0.12, 0.42], [-0.12, -0.18, 0.42], [0.16, -0.2, 0.4], [-0.4, 0.2, 0.3], [0.4, 0.2, 0.3]]
    const inside = (px, py) => blobs.some(([bx, by, br]) => { const dx = px - bx * w, dy = py - by * h, r = br * h; return dx * dx + dy * dy <= r * r })
    const nx = Math.ceil(w / c / 2) + 2, ny = Math.ceil(h / c / 2) + 3
    for (const pass of [0, 1]) for (let j = -ny; j <= ny; j++) for (let i = -nx; i <= nx; i++) {
      const px = i * c, py = j * c, on = inside(px, py)
      if (pass === 0) { if (!on && (inside(px + c, py) || inside(px - c, py) || inside(px, py + c) || inside(px, py - c))) { x.fillStyle = edge; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) } }
      else if (on) { x.fillStyle = j < -ny * 0.35 ? '#ffffff' : fillC; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) }
    }
  }
  function drawBubble(t, from) {
    const bin = pop01(t, T.bubble, 0.4, 2.0), pk = prog(t, T.pop, T.pop + 0.16)
    if (bin <= 0.01 || pk >= 1) return
    const s = bin * (1 + 0.22 * Math.sin(Math.PI * pk)) * (1 - pk)
    const bob = Math.sin(t * 2.1) * 8
    // trailing dots from the star's head
    const dots = [[0.22, 14], [0.48, 20], [0.74, 28]]
    dots.forEach(([f, r], i) => {
      if (t < T.bubble - 0.2 + i * 0.1) return
      const dx = lerp(from.x - 20, BUB.x + 60, f), dy = lerp(from.y - 10, BUB.y + BUB.h * 0.42, f) + bob * f
      x.save(); x.globalAlpha = 1 - pk
      x.fillStyle = 'rgba(185,179,255,0.9)'; x.fillRect(Math.round(dx - r / 2) - 4, Math.round(dy - r / 2) - 4, r + 8, r + 8)
      x.fillStyle = '#f4f2ff'; x.fillRect(Math.round(dx - r / 2), Math.round(dy - r / 2), r, r)
      x.restore()
    })
    x.save(); x.translate(BUB.x, BUB.y + bob); x.scale(s, s)
    cloud(0, 0, BUB.w, BUB.h, 12, '#f4f2ff', '#b9b3ff')
    // the daydream, one thing at a time
    const items = [[RING, RING_C, -205, T.ring, 9], [CATS, CATS_C, 0, T.cats, 9], [HOUSE, HOUSE_C, 205, T.house, 9]]
    for (const [bm, cols, ox, t0, c] of items) {
      const p = pop01(t, t0, 0.3, 2.6)
      if (p <= 0.01) continue
      drawBits(x, bm, cols, ox, 18 + Math.sin(t * 3 + ox) * 4, c * p, { rot: Math.sin(t * 2 + ox) * 0.05 })
    }
    // little hearts floating inside the dream
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.6 + i * 0.33) % 1
      if (t < T.house) break
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, -140 + i * 140, -80 - ph * 50, 5, { alpha: Math.sin(Math.PI * ph) })
    }
    x.restore()
  }
  function drawTable(t, dy, ok) {
    const tin = ease.outCubic(prog(t, T.table, T.table + 0.35)) * ok
    if (tin <= 0.01) return
    const y = TABLE.y + dy + (1 - tin) * 400, x0 = TABLE.x - TABLE.w / 2
    x.save(); x.globalAlpha = clamp(tin * 2)
    // stem + foot
    x.fillStyle = INK; x.fillRect(TABLE.x - 18, y, 36, 150); x.fillRect(TABLE.x - 80, y + 140, 160, 22)
    x.fillStyle = '#8a5a34'; x.fillRect(TABLE.x - 12, y, 24, 144); x.fillRect(TABLE.x - 74, y + 144, 148, 12)
    // top
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 26, TABLE.w + 12, 34)
    x.fillStyle = '#efe6d6'; x.fillRect(x0, y - 20, TABLE.w, 22); x.fillStyle = '#ff8fb1'; for (let i = 0; i < TABLE.w; i += 44) x.fillRect(x0 + i, y - 20, 22, 22)
    // tent card "DATE #1"
    const cx = TABLE.x + 10, cw = 170, ch = 74
    x.fillStyle = INK; x.fillRect(cx - cw / 2 - 5, y - 20 - ch - 5, cw + 10, ch + 5)
    x.fillStyle = '#fbf6ec'; x.fillRect(cx - cw / 2, y - 20 - ch, cw, ch)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#c2365e'
    x.fillText('DATE #1', cx, y - 20 - ch / 2 + 2)
    // a candle
    const fx = x0 + 40
    x.fillStyle = INK; x.fillRect(fx - 9, y - 70, 18, 52); x.fillStyle = '#fbf1dc'; x.fillRect(fx - 5, y - 66, 10, 46)
    const fl = Math.sin(t * 13) > 0 ? 1 : 0
    x.fillStyle = '#ffb347'; x.fillRect(fx - 5, y - 88 - fl * 3, 10, 16); x.fillStyle = '#fff1c8'; x.fillRect(fx - 2, y - 82 - fl * 3, 4, 8)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        const vp = pop01(t, T.stars + 0.1, 0.38, 2.2) * ok, pp = pop01(t, T.stars, 0.38, 2.2) * ok
        const gasp = t >= T.pop && t < T.pop + 0.5 ? -0.14 * Math.exp(-(t - T.pop) * 7) * Math.cos((t - T.pop) * 20) : 0
        let rP = null
        if (vp > 0.02) drawStarChar(x, VIR0.x, VIR0.y + dy, VIR0.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: VIR_HOPS, pop: vp, seed: 2, glow: 1.0 })
        if (pp > 0.02) rP = drawStarChar(x, PIS0.x, PIS0.y + dy, PIS0.size, t, { color: LAV, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, pop: pp, squash: gasp, seed: 6, glow: 1.2 })
        drawTable(t, dy, ok)
        if (rP && t < T.cut) drawBubble(t, { x: rP.x - 30, y: rP.top - 10 })
        sparkles(t, BUB.x, BUB.y, T.pop, 14, 260, 1, [ACC, PINK, GOLD, BONE])
        sparkles(t, (VIR0.x + PIS0.x) / 2, PIS0.y + dy - 40, T.smile, 10, 260, 3, [GOLD, VIR.color, LAV, BONE])
        if (rP && t > T.heart) floatHearts(t, rP.x - 40, rP.y - 40, T.heart, T.out[0], 5, 6)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.76 (H0 out → "Neptune-ruled") and 9.16 (box shut → "Stay here."). cardfx keeps 9.16.
const CUTS = [5.76, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.stars + 0.05, 739.99, 0.04, 0.3], ['pop', T.stars + 0.15, 659.25, 0.035, -0.3], ['tick', T.table + 0.3, 0.04],
  ['glitter', T.bubble, T.bubble + 0.5], ['pop', T.bubble + 0.1, 880, 0.03, 0.2],
  ['pluck', T.ring, 1318.51, 0.035, 0.6, -0.3], ['pluck', T.cats, 1174.66, 0.035, 0.6, 0], ['pluck', T.house, 1567.98, 0.035, 0.6, 0.3], ['bell', T.house + 0.1, 1760, 0.02, 1.0, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.virBlink, 0.02], ['tick', T.virLook, 0.025],
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.pop, 1318.51, 0.06, 0.2], ['tick', T.pop, 0.06], ['glitter', T.pop, T.pop + 0.45],
  ['pop', T.turn, 659.25, 0.03, 0.3], ['pluck', T.smile, 1174.66, 0.04, 0.6, 0], ['bell', T.smile + 0.05, 1318.51, 0.025, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.12, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pop', T.h2Land + 0.14, 1567.98, 0.05, 0], ['pluck', T.h2Land + 0.14, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
