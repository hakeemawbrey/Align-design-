// staries (15 s vertical Align ad, Star Talk batch 3) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–5.10  "Dear *Aries…*"  The ♈ star (Mars-ruled, fire) sprints in from the left in a red pixel boxing glove pair,
//              skids to a stop and starts shadow-boxing nobody: jab, jab, POW into thin air, sweat flying.
//              Drop (2.82): the box opens. THE STARS: "you don't have to win the first date." → it freezes mid-jab, wide-eyed.
//   5.10–8.40  "Ruled by Mars, | not a *stopwatch.*"  THE STARS: "it's not a race. it's a *conversation.*" → the gloves
//              slip off and thud to the floor, the star plops down to sit (squash), wide eyes → soft sparkle eyes.
//   8.45 cut → "Slow is | *hot.*"  The star sits front and centre, calm, the gloves on the floor beside it; slow hearts
//              drift up, a wink. Everything pops out by 10.45; the end card takes over at 10.6.
// One canvas (sky + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const ARIES = signStar('aries')
const RED = '#ff6a4a'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.92, 5.1],
  run: [0.22, 0.62], skid: 0.62, jabs: [0.98, 1.3, 1.58, 1.86, 2.14, 2.42, 2.95, 3.3, 3.65],
  open: 2.36, l1: 2.55, freeze: 4.0,
  h1: 5.16, h1Land: 5.6, l2: 5.3, drop: 6.05, sit: 6.5, soft: 7.15, close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.92, wink: [9.55, 9.95], h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you don't have to win the *first date.*", color: RED },
  { t: T.l2, speaker: SPEAK, text: "it's not a race. it's a *conversation.*", color: RED },
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
// a red boxing glove, knuckles to the right, white cuff + lace on the left
const GLOVE = [
  '....hhhhhh...',
  '..hhRRRRRRR..',
  '.hRRRRRRRRRR.',
  'WWRRRRRRRRRRR',
  'WWRRRRRRRRRRR',
  'WWRhRRRRRRRRR',
  'WWRRhhRRRRRRd',
  'WWRRRRhRRRRRd',
  'WW.RRRRRRRRd.',
  '....dddddd...',
]
const GLOVE_C = { R: '#e8382c', h: '#ff8a6a', d: '#9c1d1d', W: '#f3ead8' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
const POW = ['X.....X', '.X...X.', '...X...', '..XXX..', '...X...', '.X...X.', 'X.....X']

// ── layout
const HERO = { x: 520, y: 1040, size: 372 }
const FINAL = { x: 610, y: 1120, size: 430 }
const FLOOR = 1230                     // where the gloves land (beat 2)

function heroState(t) {
  if (t < T.skid) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.freeze) return { mood: 'squint', look: [1, 0], blink: false }       // fighting nobody, very focused
  if (t < T.l2 + 0.25) return { mood: 'wide', look: [0, 0], blink: false }       // "…win the first date?" oh.
  if (t < T.drop) return { mood: 'neutral', look: [0, 0] }
  if (t < T.soft) return { mood: 'wide', look: [0, 1], blink: false }            // the gloves thud down; it sits
  if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.h2Land + 0.1) return { mood: 'happy' }
  return { mood: 'heart' }
}

// jab: 0 → 1 → 0 over 0.26 s (fast out, slower back)
function jabAt(t) {
  let best = 0, idx = -1
  T.jabs.forEach((j, i) => {
    const d = t - j
    if (d < 0 || d > 0.26) return
    const v = d < 0.07 ? ease.outCubic(d / 0.07) : 1 - ease.inOutQuad((d - 0.07) / 0.19)
    if (v > best) { best = v; idx = i }
  })
  return { k: best, idx }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear *Aries…*', { top: 250, size: 140, accentSize: 200, at: T.h0, gap: 0.12, accentColor: RED, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Ruled by Mars, | not a *stopwatch.*', { top: 220, size: 96, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: RED })
  const H2 = popText(root, 'Slow is | *hot.*', { top: 200, size: 150, accentSize: 250, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: RED, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, RED]) {
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

  // speed lines + dust while it sprints in, and a skid puff
  function speed(t, hx, hy) {
    if (t < T.run[0] || t > T.skid + 0.5) return
    const a = t < T.skid ? 1 : 1 - prog(t, T.skid, T.skid + 0.3)
    x.save(); x.globalAlpha = a * 0.85
    for (let i = 0; i < 7; i++) {
      const yy = hy - 120 + i * 40 + (i % 2) * 6, len = 120 + (i * 53) % 110, off = ((t * 900 + i * 70) % 160)
      x.fillStyle = i % 3 ? '#ffd2a8' : BONE
      x.fillRect(Math.round(hx - 220 - off - len), Math.round(yy), len, 8)
    }
    x.restore()
    const pk = t - T.skid
    if (pk > 0 && pk < 0.55) {
      x.save(); x.globalAlpha = 1 - pk / 0.55
      for (let i = 0; i < 6; i++) {
        const r = 10 + pk * 60 + (i % 3) * 8
        x.fillStyle = i % 2 ? 'rgba(239,230,214,0.7)' : 'rgba(255,190,150,0.6)'
        const px = hx - 40 - i * 34 - pk * 120, py = hy + 150 - Math.sin(i) * 12 - pk * 40
        x.fillRect(Math.round(px - r), Math.round(py - r), Math.round(r * 2), Math.round(r * 2))
      }
      x.restore()
    }
  }

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const fin = t >= T.cut
    const P = fin ? FINAL : HERO
    // sprint in from off-screen left
    let hx = P.x, hy = P.y
    if (!fin) {
      const rk = ease.outCubic(prog(t, ...T.run))
      hx = lerp(-260, P.x, rk)
    }
    const st = heroState(t)
    // squash: run lean, skid, jab recoil, freeze jolt, sit
    let sq = 0
    if (t < T.skid) sq = -0.08
    const sk = t - T.skid
    if (sk > 0 && sk < 0.6) sq += 0.2 * Math.exp(-sk * 7) * Math.cos(sk * 22)
    const jb = jabAt(t)
    if (!fin && t < T.freeze) sq += 0.04 * jb.k
    if (t > T.freeze && t < T.freeze + 0.6) sq += -0.12 * Math.exp(-(t - T.freeze) * 7) * Math.cos((t - T.freeze) * 20)
    const sitK = fin ? 0.6 : easeOutBack(prog(t, T.sit, T.sit + 0.3), 2.2)
    sq += 0.17 * sitK
    if (t > T.sit && t < T.sit + 0.6) sq += 0.08 * Math.exp(-(t - T.sit) * 8) * Math.sin((t - T.sit) * 26)
    const bob = t > T.sit || fin ? 3 : 10
    // breathing: in the final beat a slow, relaxed in-out
    if (fin) sq += 0.03 * Math.sin((t - T.cut) * 2.4)
    const pk = (fin ? easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) : 1) * ok
    const r = drawStarChar(x, hx, hy, P.size, t, { color: ARIES.color, glyph: ARIES.glyph, ...st, pop: pk, squash: sq, bob, seed: 4, glow: 1.15 + (fin ? 0.2 : 0) })
    speed(t, hx, hy)
    return { r, hx, hy, P, sq, pk, jb }
  }

  // gloves: on the two side points while fighting; slip off at T.drop and thud to the floor
  function drawGloves(t, h) {
    if (!h) return
    const { hx, hy, P, jb, pk } = h
    const c = Math.round(P.size / 36), cell = c
    // side points of the sprite (cells from centre): ±16.7, −3.8 (incl. the sprite's 1.6-cell drop)
    const sq = h.sq
    const pyBase = hy + Math.sin(t * 2.2 + 4 * 2.1) * (t > T.sit ? 3 : 10)
    const sideY = pyBase - 3.8 * c * (1 - sq * 0.9)
    const sideX = 16.7 * c * (1 + sq)
    const gc = cell * 0.95
    if (t < T.cut) {
      const fall = prog(t, T.drop, T.drop + 0.42)
      // left glove guards near the cheek, right glove jabs
      const jab = t < T.freeze ? jb.k : 0
      const guard = Math.sin(t * 9) * 4 * (t < T.freeze ? 1 : 0)
      const glovesAt = [
        { gx: hx - sideX - 6 + jab * -10, gy: sideY - 20 + guard, flip: true, rot: -0.25 },
        { gx: hx + sideX + 10 + jab * 120, gy: sideY - 10 - jab * 16, flip: false, rot: -0.1 + jab * 0.12 },
      ]
      glovesAt.forEach((g, i) => {
        let gx = g.gx, gy = g.gy, rot = g.rot
        if (fall > 0) {
          const land = FLOOR + i * 10
          const f = ease.inQuad(fall)
          gx += (i ? 40 : -40) * fall; gy = lerp(g.gy, land, f); rot += (i ? 0.9 : -0.9) * fall
          // a little bounce after landing
          const lb = t - (T.drop + 0.42)
          if (lb > 0) gy = land - Math.abs(Math.sin(lb * 12)) * 26 * Math.exp(-lb * 7)
        }
        drawBits(x, GLOVE, GLOVE_C, Math.round(gx), Math.round(gy), gc, { flip: g.flip, rot, alpha: clamp(pk) })
      })
      // impact bursts on each jab (into thin air)
      if (t < T.freeze && jb.k > 0.85 && jb.idx >= 0) {
        const ix = hx + sideX + 10 + 120 + 70, iy = sideY - 26
        drawBits(x, POW, { X: jb.idx % 2 ? '#ffd76a' : '#fff1c8' }, Math.round(ix), Math.round(iy), 9, { outline: null, rot: jb.idx * 0.4 })
      }
      // sweat flying off the top
      for (const s0 of [1.45, 2.3, 3.55]) {
        const d = t - s0
        if (d < 0 || d > 0.6 || t > T.freeze) continue
        drawBits(x, DROP, { X: '#8fd3ff', W: '#e9f7ff' }, Math.round(hx - 120 - d * 160), Math.round(h.r.top + 40 - d * 120 + d * d * 300), 7, { alpha: 1 - d / 0.6 })
      }
    } else {
      // final beat: the gloves rest on the floor to the left, a little stack
      const ok = popOut(t, T.out)
      drawBits(x, GLOVE, GLOVE_C, 215, FINAL.y + 170, gc, { flip: true, rot: 0.5, alpha: ok })
      drawBits(x, GLOVE, GLOVE_C, 300, FINAL.y + 200, gc, { flip: false, rot: -0.15, alpha: ok })
    }
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.22, life = 1.6
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 300 + Math.sin(p * 4 + i) * 16, hy = cy - 80 - p * 260
      drawBits(x, HEART, { H: '#ff4f6e', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      // a tiny camera shake on each jab (fighting the air hard)
      const jb = t < T.freeze ? jabAt(t).k : 0
      const shake = jb > 0.9 ? 3 : 0
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) + shake } : { ...SKY_H, dy: shake })
      if (t < T.out[1] + 0.02) {
        const h = drawHero(t)
        drawGloves(t, h)
        if (h && t > T.soft && t < T.cut) sparkles(t, h.hx, h.hy, T.soft, 10, 240, 1)
        if (h && t >= T.cut) { sparkles(t, h.hx, h.hy, T.h2Land, 12, 290, 5); if (t > T.h2Land + 0.1) floatHearts(t, h.hx, h.hy - 40, T.h2Land + 0.1, T.out[0], 3, 10) }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "Ruled by Mars") and 8.45 (box shut → "Slow is hot.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear aries: headline, the sprint in + skid, shadow-boxing
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['whoosh', T.run[0], 0.45, 0.045], ['tick', T.skid, 0.05], ['boom', T.skid, 0.1],
  ...T.jabs.filter(j => j < T.freeze).map((j, i) => ['pop', +(j + 0.06).toFixed(3), i % 3 === 2 ? 220 : 293.66, 0.045, 0.35]),
  ...T.jabs.filter(j => j < T.freeze).map(j => ['tick', +(j + 0.06).toFixed(3), 0.04]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.freeze, 1318.51, 0.045, 0], ['bell', T.freeze + 0.02, 1760, 0.022, 0.8, 0],
  // ruled by mars: the gloves drop, it sits
  ...wordPops(T.h1, 4, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ['whoosh', T.drop, 0.3, 0.03], ['boom', T.drop + 0.42, 0.12], ['tick', T.drop + 0.44, 0.05], ['tick', T.drop + 0.58, 0.03],
  ['pop', T.sit, 440, 0.04, 0], ['pop', T.sit + 0.1, 330, 0.03, 0],
  ['glitter', T.soft, T.soft + 0.45], ['bell', T.soft + 0.05, 1318.51, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // slow is hot
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
