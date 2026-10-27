// starlibra (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.75  "Dear *Libra…*"  The pink ♎ star (Venus-ruled air) pops in under a big pixel balance scale that drops in
//              above it: a bowl of noodles ("THAI?") on one pan, nigiri ("SUSHI?") on the other. The scale see-saws and
//              the star's eyes dart after whichever side dips. Drop (2.82): THE STARS: "it's been 40 minutes. it's dinner."
//              The scale keeps wobbling; the star goes sheepish (blush, eyes down).
//   5.75–9.05  "Ruled by Venus, | not by *maybe.*"  THE STARS: "your opinion is *attractive*. use it." → wide eyes, then
//              sparkle eyes, then a determined squint… the scale CLUNKS down on the noodle side (dust + sparkles).
//   9.12 cut → "Just | *pick.*"  The stage drops into the freed space; the star hops, heart-eyed at its noodles; the sushi
//              pan gets a little wave goodbye.  Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + scale + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'

export const DURATION = 16
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 11.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const LIB = signStar('libra')                  // { color: '#e163d6', glyph: '♎' }
const MAG = LIB.color, ACC = '#ff9ff0'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.55, 5.73],
  star: 0.35, scale: 0.6, wob: 0.95,
  open: 2.62, l1: 2.84, sheep: 4.75,
  h1: 5.8, h1Land: 6.2, l2: 5.96, gasp: 6.05, spark: 6.75, decide: 7.75, clunk: 8.05,
  close: 9.0, h1Out: [8.86, 9.04],
  cut: 9.12, h2: 9.18, h2Land: 9.52, heart: 9.85, wave: [10.2, 10.9], h2Out: [11.15, 11.4], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "it's been 40 minutes. it's dinner." },
  { t: T.l2, speaker: SPEAK, text: 'your opinion is *attractive.* use it.', color: ACC },
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

// ── pixel props
const NOODLES = [
  '.....c...c...',
  '......c.c....',
  '..yYyYyYyYy..',
  '.yYyYyYyYyYy.',
  'RRRRRRRRRRRRR',
  '.RRWRRWRRWRR.',
  '..RRRRRRRRR..',
  '....RRRRR....',
]
const NOODLE_C = { c: '#d9a35c', y: '#ffe08a', Y: '#f2b84b', R: '#e8445a', W: '#ffd1d8' }
const SUSHI = [
  '.OOOOO.OOOOO.',
  'OoOoOOOoOoOOO',
  'OOOOOOOOOOOOO',
  'WWkWW.WWWkWW.',
  'WWkWW.WWWkWW.',
  'WWWWW.WWWWWW.',
]
const SUSHI_C = { O: '#ff8a5c', o: '#ffd0b8', W: '#fbf6ec', k: '#24323a' }
const PAN = ['BBBBBBBBBBBBBBBBB', '.BbbbbbbbbbbbbbB.', '..BBBBBBBBBBBBB..']
const PAN_C = { B: '#f7c948', b: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const STAR0 = { x: 540, y: 1150, size: 330 }
const PIVOT = { x: 540, y: 690 }             // top of the post, where the beam pivots
const ARM = 290                               // half-beam length
const HANG = 150                              // string length to the pan
const LOW = 150                               // after the box shuts the stage drops into the freed space
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

// the beam angle (+ = right side down). Pure f(t): indecisive see-saw, then the clunk to the noodle (left) side.
function beamAngle(t) {
  if (t < T.wob) return 0.0
  if (t < T.decide) {
    // swaps sides every ~0.75 s, with a little overshoot each time
    const per = 0.74, k = (t - T.wob) / per, n = Math.floor(k), f = k - n
    const side = n % 2 === 0 ? 1 : -1
    const prev = n === 0 ? 0 : -side
    const e = easeOutBack(clamp(f / 0.45), 2.4)
    return lerp(prev, side, e) * 0.2
  }
  if (t < T.clunk) {                          // hovers level, trembling…
    const per = 0.74, k = (T.decide - T.wob) / per, n = Math.floor(k), side = n % 2 === 0 ? 1 : -1
    const from = side * 0.2
    return lerp(from, 0, ease.outCubic(prog(t, T.decide, T.decide + 0.15))) + 0.025 * Math.sin(t * 60)
  }
  const d = t - T.clunk                       // …CLUNK: left (noodles) down, a heavy bounce
  return -0.34 + 0.09 * Math.exp(-d * 6) * Math.cos(d * 22) + 0.34 * Math.max(0, 1 - d / 0.08) * 1
}
const sideOf = a => a > 0.05 ? 1 : a < -0.05 ? -1 : 0

function starState(t) {
  const a = beamAngle(t)
  if (t < T.scale + 0.2) return { mood: 'happy' }
  if (t < T.wob) return { mood: 'neutral', look: [0, -1] }
  if (t < T.sheep) return { mood: 'wide', look: [sideOf(a), 0.4], blink: false }                   // darting eyes
  if (t < T.l2) return { mood: 'neutral', look: [sideOf(a) * 0.6, 1], blush: 1, blink: false }      // sheepish
  if (t < T.spark) return { mood: 'wide', look: [0, 0], blink: false }                              // "your opinion is…"
  if (t < T.decide) return { mood: 'sparkle', look: [0, 0] }                                         // "…attractive"
  if (t < T.clunk + 0.25) return { mood: 'squint', look: [-1, -0.4], blink: false }                 // decides
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Libra…*', { top: 250, size: 128, accentSize: 186, at: T.h0, gap: 0.12, accentColor: MAG, wobble: true, late: 1, lateAt: T.h0 + 0.24 })
  const H1 = popText(root, 'Ruled by Venus, | not by *maybe.*', { top: 190, size: 104, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ACC })
  const H2 = popText(root, 'Just | *pick.*', { top: 210, size: 150, accentSize: 250, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const HOPS = [T.star + 0.3, T.wob + 0.74 * 2, T.wob + 0.74 * 4, T.gasp, T.clunk + 0.1, T.h2Land, T.heart, 10.45]

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, MAG]) {
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
  function dust(t, cx, cy, t0) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    x.save(); x.globalAlpha = 1 - tt / 0.6
    for (let i = 0; i < 8; i++) {
      const s = i % 2 ? 1 : -1, sp = 120 + (i * 37) % 90
      x.fillStyle = i % 3 ? '#d8cbe8' : BONE
      const c = 10 - tt * 10
      x.fillRect(Math.round(cx + s * (30 + sp * tt * 1.4) + (i - 4) * 8), Math.round(cy - 10 - (i % 4) * 14 * tt * 3 + 60 * tt * tt), c, c)
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
  function label(text, cx, cy, col, alpha, sc = 1) {
    if (alpha <= 0.01) return
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.scale(sc, sc)
    x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(text).width + 30
    x.fillStyle = 'rgba(13,8,32,0.88)'; x.fillRect(-w / 2, -30, w, 60)
    x.fillStyle = col; x.fillRect(-w / 2, -30, w, 5); x.fillRect(-w / 2, 25, w, 5); x.fillRect(-w / 2, -30, 5, 60); x.fillRect(w / 2 - 5, -30, 5, 60)
    x.fillStyle = col; x.fillText(text, 0, 2)
    x.restore()
  }

  // the balance scale. returns the pan positions.
  function drawScale(t, ok, dy, footY) {
    const pin = pop01(t, T.scale, 0.42, 1.8) * ok
    if (pin <= 0.01) return
    const drop = (1 - ease.outCubic(prog(t, T.scale - 0.1, T.scale + 0.3))) * -520
    const px = PIVOT.x, py = PIVOT.y + drop + dy
    const a = beamAngle(t)
    const c = 10
    x.save(); x.globalAlpha = clamp(pin * 1.4)
    // post (behind the star), base hidden by the star body
    const postH = Math.max(40, footY - py)
    x.fillStyle = INK; x.fillRect(px - 2.5 * c, py - c, 5 * c, postH + 2 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(px - 1.5 * c, py, 3 * c, postH); x.fillStyle = '#f7c948'; x.fillRect(px - 1.5 * c, py, c, postH)
    // a little foot plate balanced on the star's head
    x.fillStyle = INK; x.fillRect(px - 5 * c, py + postH - c, 10 * c, 3 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(px - 4 * c, py + postH, 8 * c, c); x.fillStyle = '#f7c948'; x.fillRect(px - 4 * c, py + postH - 0, 8 * c, c / 2)
    // finial
    drawBits(x, ['.y.', 'yYy', '.y.'], { y: '#f7c948', Y: '#fff1c8' }, px, py - 2.2 * c, c)
    // beam (rotated, chunky cells)
    x.save(); x.translate(px, py); x.rotate(a)
    x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
    x.fillStyle = '#fff1c8'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, 4)
    // end knobs
    x.fillStyle = '#c98a1f'; x.fillRect(-ARM - c, -c, 2 * c, 2 * c); x.fillRect(ARM - c, -c, 2 * c, 2 * c)
    x.restore()
    // the pans hang straight down from the beam ends
    const ends = [-1, 1].map(s => ({ x: px + Math.cos(a) * ARM * s, y: py + Math.sin(a) * ARM * s, s }))
    const pans = ends.map(e => {
      const sway = Math.sin(t * 5 + e.s) * 0.04 * (t < T.clunk ? 1 : Math.exp(-(t - T.clunk) * 3))
      const bx = e.x + Math.sin(sway) * HANG, by = e.y + HANG
      // strings (pixel steps)
      x.fillStyle = 'rgba(255,241,200,0.85)'
      for (let k = 0; k <= 12; k++) {
        const f = k / 12
        x.fillRect(Math.round(lerp(e.x, bx - 70, f)) - 2, Math.round(lerp(e.y, by - 10, f)), 4, 6)
        x.fillRect(Math.round(lerp(e.x, bx + 70, f)) - 2, Math.round(lerp(e.y, by - 10, f)), 4, 6)
      }
      return { x: bx, y: by, s: e.s }
    })
    // the food sits in the pans, then the pans in front
    const [L, R] = pans
    const won = t > T.clunk ? 1 : 0
    drawBits(x, NOODLES, NOODLE_C, L.x, L.y - 40, c, { rot: Math.sin(t * 4) * 0.02 })
    drawBits(x, SUSHI, SUSHI_C, R.x, R.y - 32, c, { rot: Math.sin(t * 4 + 1) * 0.02 })
    drawBits(x, PAN, PAN_C, L.x, L.y + 4, c)
    drawBits(x, PAN, PAN_C, R.x, R.y + 4, c)
    // steam over the noodles
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.8 + i * 0.33) % 1
      x.fillStyle = `rgba(239,230,214,${0.5 * Math.sin(Math.PI * ph)})`
      x.fillRect(Math.round(L.x - 30 + i * 30 + Math.sin(ph * 6 + i) * 8), Math.round(L.y - 100 - ph * 70), 8, 8)
    }
    // labels under the pans (the winner gets a gold label + bounce; the other dims)
    const la = clamp(prog(t, T.scale + 0.35, T.scale + 0.6)) * pin
    const bump = won ? 1 + 0.25 * Math.exp(-(t - T.clunk) * 5) * Math.sin((t - T.clunk) * 18) : 1
    label(won ? 'THAI!' : 'THAI?', L.x, L.y + 70, won ? GOLD : BONE, la, bump)
    label('SUSHI?', R.x, R.y + 70, BONE, la * (won ? 0.45 : 1))
    x.restore()
    return { L, R }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const ok = popOut(t, T.out), lk = lowK(t), dy = LOW * lk
      if (ok > 0) {
        // star (drawn after the post so it covers the post's foot) — but the pans are in front of everything
        const sp = pop01(t, T.star, 0.38, 2.2) * ok
        const st = starState(t)
        const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
        const flinch = t >= T.clunk && t < T.clunk + 0.4 ? 0.14 * Math.exp(-(t - T.clunk) * 9) : 0
        let r = null
        if (sp > 0.02) r = drawStarChar(x, STAR0.x, STAR0.y + dy, STAR0.size, t, { color: MAG, glyph: LIB.glyph, ...st, hops: HOPS, pop: sp, squash: gasp + flinch, seed: 5, glow: 1.15 })
        // the scale balances on the star's head (its post rides the hops)
        const pans = drawScale(t, ok, dy + (r ? r.top + 30 - (STAR0.y + dy - STAR0.size * 0.5 + 30) : 0), r ? r.top + 30 : STAR0.y + dy - 150)
        if (r) {
          sparkles(t, r.x, r.y, T.spark, 10, 210, 1)
          if (t > T.heart) floatHearts(t, r.x - 80, r.y - 40, T.heart, T.out[0], 3, 6)
        }
        if (pans) {
          dust(t, pans.L.x, pans.L.y + 20, T.clunk)
          sparkles(t, pans.L.x, pans.L.y - 50, T.clunk + 0.05, 8, 110, 2, [GOLD, BONE, '#ffe08a'])
          // a little "bye" wave over the sushi in the last beat
          const wv = prog(t, ...T.wave)
          if (wv > 0 && wv < 1) {
            x.save(); x.globalAlpha = Math.sin(Math.PI * wv)
            x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE
            x.fillText('bye ~', pans.R.x + Math.sin(wv * 18) * 10, pans.R.y - 120 - wv * 40)
            x.restore()
          }
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.76 (H0 out → "Ruled by Venus") and 9.12 (box shut → "Just pick."). cardfx keeps the 9.12 one.
const CUTS = [5.76, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const WOB_TICKS = []
for (let k = 1; T.wob + k * 0.74 < T.decide; k++) WOB_TICKS.push(['tick', +(T.wob + k * 0.74).toFixed(3), 0.03], ['pop', +(T.wob + k * 0.74 + 0.02).toFixed(3), k % 2 ? 659.25 : 880, 0.018, k % 2 ? -0.4 : 0.4])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.star + 0.05, 739.99, 0.045, 0], ['pop', T.star + 0.3, 987.77, 0.03, 0],
  ['whoosh', T.scale - 0.1, 0.35, 0.035], ['tick', T.scale + 0.22, 0.05], ['bell', T.scale + 0.25, 1760, 0.02, 0.8, 0],
  ['tick', T.wob, 0.03], ...WOB_TICKS,
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.sheep, 523.25, 0.022, 0],
  ...wordPops(T.h1, 4, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gasp, 440, 0.035, 0], ['glitter', T.spark, T.spark + 0.45],
  ['tick', T.decide, 0.03], ['tick', T.decide + 0.1, 0.025],
  ['boom', T.clunk, 0.2], ['tick', T.clunk, 0.07], ['pluck', T.clunk + 0.05, 1318.51, 0.045, 0.6, -0.3], ['glitter', T.clunk + 0.05, T.clunk + 0.45],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['pop', T.wave[0] + 0.1, 987.77, 0.018, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
