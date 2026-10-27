// starsag (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.80  "Dear | *Sagittarius…*"  The purple ♐ star (Jupiter-ruled, mutable fire) ZIPS in from the left wearing a
//              big pixel backpack, a passport waving over its head, and skids to a stop half out of frame on the right.
//              It glances back at you. Drop (2.82): THE STARS: "we know. adventure. freedom. planes." It bounces on the
//              spot, sparkle-eyed, itching to go.
//   5.80–9.05  "Ruled by Jupiter. | Packed by *noon.*"  THE STARS: "the right one *comes with you.*" → wide eyes; it backs
//              into frame, and the yellow ♊ Gemini star (Sagittarius' opposite sign) hops in from the left with its OWN
//              backpack. They look at each other: sparkle eyes, a hop together.
//   9.12 cut → "Bring a | *plus one.*"  The pair, lower now, hop in sync; a little pixel plane crosses behind them with a
//              dotted trail and a heart. Sag goes heart-eyed. Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + plane + packs + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const SAG = signStar('sagittarius'), GEM = signStar('gemini')
const PURP = SAG.color, ACC = '#c9a6ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.62, 5.8],
  zip: [0.4, 0.82], skid: 0.82, glance: 1.35,
  open: 2.4, l1: 2.6, bounce: [3.0, 5.6],
  h1: 5.9, h1Land: 6.3, l2: 6.06, gasp: 6.15, back: [6.6, 7.3], gemIn: 7.15, meet: 7.75, duo: 8.1,
  close: 9.0, h1Out: [8.86, 9.04],
  cut: 9.12, h2: 9.18, h2Land: 9.55, plane: [9.4, 11.2], heart: 10.15, h2Out: [11.15, 11.4], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'we know. adventure. freedom. planes.' },
  { t: T.l2, speaker: SPEAK, text: 'the right one *comes with you.*', color: ACC },
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
const PACK = [
  '...SSSSSS...',
  '..S......S..',
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'PppppppppppP',
  'PPPPPPPPPPPP',
  'PPPFFFFFFPPP',
  'PPPFffffFPPP',
  'PPPFFFFFFPPP',
  'PPPPPPPPPPPP',
  'PPPPPPPPPPPP',
  '.PPPPPPPPPP.',
]
const PACK_SAG = { R: '#3fb6a0', r: '#2a8a78', S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
const PACK_GEM = { R: '#ff6f8f', r: '#c94a6a', S: '#3a2a5e', P: '#4a7bd6', p: '#2f569e', F: '#7fa8f0', f: '#fff1c8' }
const PASSPORT = ['NNNNNNN', 'NNgggNN', 'NgNgNgN', 'NgggggN', 'NgNgNgN', 'NNgggNN', 'NNNNNNN', 'NNggg.N', 'NNNNNNN']
const PASS_C = { N: '#1f3a7a', g: '#f2c75c' }
const PLANE = [
  '.......W.....',
  '......WW.....',
  'WWWWWWWWWWWb.',
  '.bWWWWWWWWWWW',
  '......WW.....',
  '.......W.....',
]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const EDGE = { x: 985, y: 1080, size: 390 }   // half out of frame
const SAG2 = { x: 745, y: 1090, size: 350 }
const GEM2 = { x: 320, y: 1100, size: 330 }
const LOW = 150
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function sagPos(t) {
  if (t < T.skid) { const k = ease.inCubic(prog(t, ...T.zip)); return { x: lerp(-260, EDGE.x, k), y: EDGE.y, size: EDGE.size } }
  if (t < T.back[0]) return EDGE
  const k = ease.inOutCubic(prog(t, ...T.back))
  return { x: lerp(EDGE.x, SAG2.x, k), y: EDGE.y, size: lerp(EDGE.size, SAG2.size, k) }
}
function sagState(t) {
  if (t < T.skid) return { mood: 'happy' }
  if (t < T.glance) return { mood: 'squint', look: [1, 0], blink: false }                // skid
  if (t < T.l1 + 0.3) return { mood: 'neutral', look: [-1, 0] }                           // glances back at you
  if (t < T.bounce[1]) return { mood: 'sparkle', look: [1, -0.4] }                         // itching to go
  if (t < T.gasp) return { mood: 'happy' }
  if (t < T.back[1]) return { mood: 'wide', look: [0, 0], blink: false }                   // "the right one…"
  if (t < T.meet) return { mood: 'wide', look: [-1, 0], blink: false }                     // who's this?
  if (t < T.cut) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function gemState(t) {
  if (t < T.meet) return { mood: 'happy' }
  if (t < T.cut) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'happy', blush: 1 }
}
const BOUNCES = []
for (let b = T.bounce[0]; b < T.bounce[1]; b += 0.556) BOUNCES.push(+b.toFixed(3))
const SYNC = [9.6, 10.15, 10.7]
const SAG_HOPS = [T.skid + 0.15, ...BOUNCES, T.gasp, T.duo, ...SYNC]
const GEM_HOPS = [T.gemIn + 0.35, T.gemIn + 0.75, T.duo, ...SYNC]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *Sagittarius…*', { top: 200, size: 128, accentSize: 150, at: T.h0, gap: 0.12, accentColor: '#b98af7', wobble: true, late: 1, lateAt: T.h0 + 0.24, lineHeight: 1.0 })
  const H1 = popText(root, 'Ruled by Jupiter. | Packed by *noon.*', { top: 190, size: 100, accentSize: 156, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ACC })
  const H2 = popText(root, 'Bring a | *plus one.*', { top: 200, size: 132, accentSize: 200, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
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
  // speed lines behind the zip
  function speedLines(t, sx, sy) {
    const k = prog(t, T.zip[0], T.skid + 0.3)
    if (k <= 0 || k >= 1) return
    x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * k)
    x.fillStyle = BONE
    for (let i = 0; i < 6; i++) {
      const yy = sy - 140 + i * 56, len = 160 + (i * 53) % 120
      x.fillRect(Math.round(sx - 260 - len - (i % 3) * 40), Math.round(yy), len, 8)
    }
    x.restore()
  }
  // skid dust at the stop
  function dust(t, cx, cy, t0) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    x.save(); x.globalAlpha = 1 - tt / 0.6
    for (let i = 0; i < 9; i++) {
      x.fillStyle = i % 3 ? '#d8cbe8' : BONE
      const c = 12 - tt * 12
      x.fillRect(Math.round(cx - 60 - i * 26 - tt * 200 * (1 + i * 0.1)), Math.round(cy - (i % 4) * 16 - tt * 90 * ((i % 3) + 1) + 140 * tt * tt), c, c)
    }
    x.restore()
  }
  function drawPlane(t, dy) {
    const k = prog(t, ...T.plane)
    if (k <= 0 || k >= 1) return
    const px = lerp(1240, -200, k), py = 660 + dy * 0.3 - Math.sin(k * Math.PI) * 50
    // dotted trail
    x.save()
    for (let i = 1; i < 26; i++) {
      const tx = px + 70 + i * 34
      if (tx > 1100) break
      x.globalAlpha = 0.75 * (1 - i / 26)
      x.fillStyle = i % 2 ? BONE : PINK
      x.fillRect(Math.round(tx), Math.round(py - Math.sin((k + i * 0.012) * Math.PI) * 0 + 4 + Math.sin(i * 0.6 + k * 9) * 3), 12, 8)
    }
    x.restore()
    drawBits(x, PLANE, { W: '#f5f1ff', b: '#7fdcff' }, Math.round(px), Math.round(py), 9)
    // a little heart puffed from the trail
    if (k > 0.35 && k < 0.8) drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(lerp(1240, -200, 0.35) + 60), Math.round(py - 10 - (k - 0.35) * 80), 7, { alpha: Math.sin(Math.PI * (k - 0.35) / 0.45) })
  }
  /** a traveller: backpack behind its left side, then the star, returns the star rect */
  function traveller(t, P, opts, pack, pp) {
    const s = P.size * opts.pop
    const sway = Math.sin(t * 6 + (opts.seed || 1)) * 0.05
    const px = P.x - s * 0.33, py = P.y - s * 0.02
    drawBits(x, PACK, pack, Math.round(px), Math.round(py), s / 21, { rot: -0.14 + sway, alpha: clamp(opts.pop * 2) })
    const r = drawStarChar(x, P.x, P.y, P.size, t, opts)
    // shoulder strap over the star's left side (so it reads as worn)
    x.save(); x.globalAlpha = clamp(opts.pop * 2)
    const c = Math.max(4, Math.round(s / 42)), y0 = r.y - s * 0.12, y1 = r.y + s * 0.26
    x.lineCap = 'butt'
    x.beginPath(); x.moveTo(r.x - s * 0.37, y0); x.lineTo(r.x - s * 0.21, y1)
    x.strokeStyle = INK; x.lineWidth = c * 3.4; x.stroke()
    x.strokeStyle = pack.S; x.lineWidth = c * 2; x.stroke()
    x.fillStyle = '#f2c75c'; x.fillRect(Math.round(lerp(r.x - s * 0.37, r.x - s * 0.21, 0.55) - c), Math.round(lerp(y0, y1, 0.55) - c), c * 2, c * 2)   // buckle
    x.restore()
    // passport held up / waved
    if (pp) drawBits(x, PASSPORT, PASS_C, Math.round(P.x + s * 0.06 + pp.dx), Math.round(r.top - s * 0.13 + pp.dy), s / 28, { rot: pp.rot, alpha: clamp(opts.pop * 2) })
    return r
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      drawPlane(t, dy)
      if (ok > 0) {
        const P = sagPos(t)
        const skidSq = t >= T.skid && t < T.skid + 0.5 ? 0.22 * Math.exp(-(t - T.skid) * 7) * Math.cos((t - T.skid) * 16) : 0
        const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
        speedLines(t, P.x, P.y)
        dust(t, EDGE.x - 40, EDGE.y + 120, T.skid)
        // Gemini hops in from the left
        if (t > T.gemIn - 0.3) {
          const k = ease.outCubic(prog(t, T.gemIn - 0.3, T.gemIn + 0.35))
          const G = { x: lerp(-220, GEM2.x, k), y: GEM2.y + dy - Math.sin(Math.PI * k) * 160, size: GEM2.size }
          traveller(t, G, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: GEM_HOPS, pop: ok, seed: 4, glow: 1.1 }, PACK_GEM,
            { dx: 0, dy: Math.sin(t * 5) * 6, rot: 0.2 })
        }
        const wave = t > T.l1 && t < T.bounce[1] ? Math.sin(t * 11) * 0.35 : 0.1 * Math.sin(t * 3)
        const r = traveller(t, { x: P.x, y: P.y + dy, size: P.size }, { color: PURP, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, pop: ok, squash: skidSq + gasp, seed: 7, glow: 1.15 }, PACK_SAG,
          { dx: -P.size * 0.12, dy: -10 + Math.abs(Math.sin(t * 5.5)) * -12, rot: -0.25 + wave })
        sparkles(t, (r.x + GEM2.x) / 2, r.y, T.meet, 12, 300, 4, [GOLD, GEM.color, BONE, ACC])
        if (t > T.heart) floatHearts(t, r.x, r.y - 40, T.heart, T.out[0], 5, 6)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.84 (H0 out → "Ruled by Jupiter") and 9.12 (box shut → "Bring a plus one."). cardfx keeps 9.12.
const CUTS = [5.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['whoosh', T.zip[0] - 0.05, 0.45, 0.05], ['tick', T.skid, 0.06], ['pop', T.skid + 0.02, 523.25, 0.035, 0.5], ['whoosh', T.skid, 0.25, 0.025],
  ['tick', T.glance, 0.025],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...BOUNCES.map((b, i) => ['tick', +(b + 0.31).toFixed(3), 0.015 + (i % 2) * 0.006]),
  ...wordPops(T.h1, 5, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gasp, 440, 0.035, 0], ['whoosh', T.back[0], 0.5, 0.025],
  ['whoosh', T.gemIn - 0.3, 0.4, 0.03], ['pop', T.gemIn + 0.35, 659.25, 0.045, -0.4], ['bell', T.meet, 1318.51, 0.03, 1.2, 0], ['glitter', T.meet, T.meet + 0.5],
  ['pop', T.duo + 0.05, 880, 0.03, -0.2], ['pop', T.duo + 0.06, 1108.73, 0.03, 0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.plane[0] + 0.2, 1.4, 0.03],
  ...SYNC.map(s => ['pop', s + 0.05, 987.77, 0.025, 0]),
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
