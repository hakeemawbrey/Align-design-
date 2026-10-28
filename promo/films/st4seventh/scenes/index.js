// st4seventh (15 s vertical Align ad, Star Talk season 4, EP 035, thread G: sky lessons) · story 0–10.6, then the end card.
//   0.00–2.70  "Your *7th house* | is open."  The birth chart drawn as a generic Houston high-rise: twelve floors, one per
//              house, each with its real meaning on a tiny plaque (1 SELF … 7 PARTNERS … 12 DREAMS). A bone "you" star on
//              the sidewalk looks up; DING: the 7th floor lights up lavender and its door glows open.
//   2.82 drop  Box (THE STARS): "the 7th house is partnership."
//   5.20–8.60  "The sign on | the *door.*"  The camera rises to the 7th floor; the plate on the door spins through all
//              twelve glyphs. THE STARS: "the sign on its door shows what you're *drawn* to."  It lands on a gold "?".
//   8.65 cut → "Who's on your | *7th* floor?"  Wide again: a mystery star peeks out of the 7th-floor door with a heart;
//              the you-star goes heart-eyed. Everything pops out by 10.45; the end card takes over at 10.6.
// Kept generic so EP 036 (st4fifth, the 5th floor of the same idea) can share the building.
// Easter eggs (stlore.js): the EP 035 seed constellation (top-left), the EP numeral in the frame, and the ghost rising
// from behind the high-rise's roof crown (lore.json).
// One canvas (sky + tower + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
export const EP = 35
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.12, 5.3], tower: 0.15, you: 0.55, ding: 1.25, door: [1.3, 1.6], ghost: 1.75,
  open: 2.55, l1: 2.72,
  h1: 5.35, h1Land: 5.75, zoom: [5.15, 5.8], l2: 5.35, spin: [5.8, 7.25],
  close: 8.6, h1Out: [8.45, 8.62],
  cut: 8.65, h2: 8.7, h2Land: 9.05, peek: 8.85, heart: 9.2, h2Out: [10.2, 10.45], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'the 7th house is *partnership.*', color: LAV },
  { t: T.l2, speaker: SPEAK, text: "the sign on its door shows what you're *drawn* to.", color: LAV },
]
const CPS = 32

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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── the tower (world px; the camera rises to floor 7 for beat 2)
const TW = { x0: 300, x1: 780, ground: 1400, fh: 62, n: 12 }
const floorTop = f => TW.ground - f * TW.fh
const HOUSES = ['SELF', 'MONEY', 'TALK', 'HOME', 'FUN', 'ROUTINE', 'PARTNERS', 'INTIMACY', 'TRAVEL', 'CAREER', 'FRIENDS', 'DREAMS']
const DOOR = { cx: 540, w: 112, h: 54 }
const F7 = { x: 540, y: floorTop(7) + TW.fh / 2 }
const ROOF = floorTop(12) - 84                   // top of the crown
const YOU = { x: 165, y: 1325, size: 175 }
function cam(t) {
  if (t >= T.cut - 0.06) {          // last beat (the box is shut): closer, the street at the bottom of the frame
    const e = ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))
    return { z: lerp(2.3, 1.22, e), fx: lerp(F7.x, 500, e), fy: lerp(F7.y, 1400, e), sx: 540, sy: lerp(960, 1790, e) }
  }
  if (t < T.zoom[0]) return { z: 1, fx: 540, fy: 1000, sx: 540, sy: 1000 }
  const e = ease.inOutCubic(prog(t, ...T.zoom))
  return { z: lerp(1, 2.3, e), fx: lerp(540, F7.x, e), fy: lerp(1000, F7.y, e), sx: 540, sy: lerp(1000, 960, e) }
}
// the door plate: cycles through the twelve glyphs, then lands on "?"
function plate(t) {
  if (t < T.spin[0]) return { ch: '♎', col: LAV, land: 0 }
  if (t < T.spin[1]) {
    const p = prog(t, ...T.spin), step = Math.floor(Math.pow(p, 0.6) * 26)
    return { ch: SIGNS[step % 12].glyph, col: SIGNS[step % 12].color, land: 0 }
  }
  return { ch: '?', col: GOLD, land: pop01(t, T.spin[1], 0.35, 2.6) }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Your *7th house* | is open.', { top: 205, size: 116, accentSize: 164, at: T.h0, gap: 0.09, accentColor: LAV, wobble: true, lineHeight: 1.0 })
  const H1 = popText(root, 'The sign on | the *door.*', { top: 205, size: 116, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, "Who's on your | *7th* floor?", { top: 205, size: 112, accentSize: 168, at: T.h2, gap: 0.06, late: 0, wobble: true, accentColor: LAV, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, LAV, PINK]) {
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
  // the tower in world space (call inside the camera transform)
  function drawTower(t, ok) {
    const W0 = TW.x0, W1 = TW.x1
    // dim neighbours (generic skyline)
    ;[[40, 250, 430], [830, 1040, 360], [-60, 110, 280], [960, 1140, 250]].forEach(([a, b, h], i) => {
      const k = pop01(t, T.tower + 0.05 * i, 0.45, 1.5)
      if (k <= 0) return
      x.fillStyle = '#0f0a26'; x.fillRect(a, TW.ground - h * k, b - a, h * k + 40)
      x.fillStyle = rgba(LAV, 0.16); x.fillRect(a, TW.ground - h * k, b - a, 4)
      for (let r = 0; r < Math.floor(h * k / 40) - 1; r++) for (let c = 0; c < Math.floor((b - a) / 40); c++) {
        if (hash(r * 13 + c + i * 101, 3) > 0.4) continue
        x.fillStyle = rgba(hash(r + c * 7, 5) > 0.5 ? '#ffd98a' : '#bfe6ff', 0.3)
        x.fillRect(a + 14 + c * 40, TW.ground - h * k + 22 + r * 40, 14, 18)
      }
    })
    // the street
    x.fillStyle = '#120c2e'; x.fillRect(-200, TW.ground, 1480, 200)
    x.fillStyle = rgba(LAV, 0.25); x.fillRect(-200, TW.ground, 1480, 4)
    const lit7 = clamp(prog(t, T.ding, T.ding + 0.25))
    for (let f = 1; f <= TW.n; f++) {
      const k = pop01(t, T.tower + f * 0.05, 0.3, 1.6)
      if (k <= 0) continue
      const y0 = floorTop(f), h = TW.fh
      x.save(); x.translate(540, y0 + h); x.scale(1, k); x.translate(-540, -(y0 + h))
      x.fillStyle = f === 7 ? `rgb(${Math.round(lerp(22, 52, lit7))},${Math.round(lerp(16, 34, lit7))},${Math.round(lerp(58, 104, lit7))})` : '#16103a'
      x.fillRect(W0, y0, W1 - W0, h)
      x.fillStyle = '#2a2156'; x.fillRect(W0, y0 + h - 6, W1 - W0, 6)
      for (let c = 0; c < 6; c++) {
        const wx = W0 + 22 + c * 76, wy = y0 + 12, ww = 58, wh = 36
        if (f === 7 && (c === 2 || c === 3)) continue                  // the door lives here
        let col = hash(f * 17 + c, 2) > 0.45 ? '#ffd98a' : '#bfe6ff', a = 0.22 + 0.4 * hash(f * 5 + c * 3, 9)
        if (f === 7) { col = LAV; a = lerp(a, 0.75 + 0.2 * Math.sin(t * 3 + c), lit7) }
        x.fillStyle = rgba(col, a); x.fillRect(wx, wy, ww, wh)
        x.fillStyle = rgba('#ffffff', 0.12 * a); x.fillRect(wx, wy, ww, 6)
      }
      x.restore()
      if (k > 0.6) {
        // floor number (left) and the house plaque (right)
        x.font = `700 ${f === 7 ? 30 : 24}px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
        x.fillStyle = f === 7 && lit7 > 0 ? LAV : rgba(BONE, 0.5)
        x.fillText(String(f), W0 - 14, y0 + h / 2)
        x.font = `700 ${f === 7 ? 27 : 23}px ${MONO}`; x.textAlign = 'left'
        x.fillStyle = f === 7 && lit7 > 0 ? LAV : rgba(BONE, 0.55)
        x.fillText(HOUSES[f - 1], W1 + 14, y0 + h / 2)
      }
    }
    // crown (generic stepped top) + aircraft light
    const kc = pop01(t, T.tower + 13 * 0.05, 0.35, 1.6)
    if (kc > 0) {
      const top = floorTop(12)
      x.fillStyle = '#1c1446'
      x.fillRect(W0 + 40, top - 34 * kc, W1 - W0 - 80, 34 * kc)
      x.fillRect(W0 + 100, top - 62 * kc, W1 - W0 - 200, 28 * kc)
      x.fillRect(W0 + 170, top - 84 * kc, W1 - W0 - 340, 22 * kc)
      x.fillStyle = rgba(LAV, 0.5); x.fillRect(W0 + 40, top - 34 * kc, W1 - W0 - 80, 3)
      if (Math.sin(t * 4) > 0.2) { x.fillStyle = '#ff5a5a'; x.fillRect(536, top - 96 * kc, 8, 8) }
    }
    if (pop01(t, T.tower + 0.5, 0.4, 1.4) > 0.5) { x.strokeStyle = rgba(LAV, 0.5); x.lineWidth = 4; x.strokeRect(W0, floorTop(12), W1 - W0, TW.ground - floorTop(12)) }
    // the 7th-floor door: glows, swings open, carries the sign plate
    if (lit7 > 0) {
      const dy0 = floorTop(7) + 6, dx0 = DOOR.cx - DOOR.w / 2, open = ease.outCubic(prog(t, ...T.door))
      glow(DOOR.cx, dy0 + DOOR.h / 2, 150, LAV, 0.4 * lit7 * (0.85 + 0.15 * Math.sin(t * 3)))
      x.fillStyle = INK; x.fillRect(dx0 - 4, dy0 - 4, DOOR.w + 8, DOOR.h + 8)
      x.fillStyle = '#fff1ff'; x.fillRect(dx0, dy0, DOOR.w, DOOR.h)                       // light spilling out
      // the mystery star peeking out (last beat), behind the door leaf
      if (t > T.peek) {
        const pk = ease.outBack(prog(t, T.peek, T.peek + 0.4))
        x.save(); x.beginPath(); x.rect(dx0, dy0, DOOR.w, DOOR.h); x.clip()
        drawStarChar(x, dx0 + DOOR.w * 0.62 + (1 - pk) * 50, dy0 + DOOR.h * 0.78, 80, t, { color: '#2a2156', mood: t > T.heart ? 'heart' : 'happy', glow: 0.2, tips: false, seed: 44, blush: 0.8 })
        x.restore()
      }
      // the door leaf, swung half open, with the plate
      const lw = DOOR.w * lerp(1, 0.42, open)
      x.fillStyle = '#7a5ab8'; x.fillRect(dx0, dy0, lw, DOOR.h)
      x.fillStyle = '#5a3e94'; x.fillRect(dx0 + lw - 4, dy0, 4, DOOR.h)
      x.fillStyle = GOLD; x.fillRect(dx0 + lw - 10, dy0 + DOOR.h * 0.55, 4, 4)            // knob
      const P = plate(t), pr = 15 * (1 + 0.25 * P.land * Math.sin(Math.PI * Math.min(1, prog(t, T.spin[1], T.spin[1] + 0.4))))
      const px = dx0 + lw / 2, py = dy0 + 18
      x.fillStyle = INK; x.beginPath(); x.arc(px, py, pr + 3, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff6e6'; x.beginPath(); x.arc(px, py, pr, 0, Math.PI * 2); x.fill()
      x.font = `700 ${Math.round(pr * 1.5)}px ${P.ch === '?' ? MONO : SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = P.ch === '?' ? '#b8862a' : P.col; x.fillText(P.ch === '?' ? '?' : P.ch + '︎', px, py + 1)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = 0
      if (ok > 0) {
        const C = cam(t)
        x.save()
        x.beginPath(); x.rect(0, 470, 1080, 1450); x.clip()                 // never over the headline
        x.translate(C.sx, C.sy); x.scale(C.z * lerp(0.9, 1, ok), C.z * lerp(0.9, 1, ok)); x.translate(-C.fx, -C.fy)
        x.globalAlpha = clamp(ok * 2)
        drawTower(t, ok)
        // the you-star on the sidewalk (in world space: it leaves the frame when the camera rises)
        const yk = pop01(t, T.you, 0.4, 1.8) * ok
        if (yk > 0.01) {
          const mood = t < T.ding ? { mood: 'neutral', look: [1, -1] } : t < T.l1 ? { mood: 'wide', look: [1, -1], blink: false } : t < T.cut ? { mood: 'sparkle', look: [1, -1] } : t < T.heart ? { mood: 'wide', look: [1, -1], blink: false } : { mood: 'heart' }
          const r = drawStarChar(x, YOU.x, YOU.y, YOU.size, t, { color: STAR.bone, ...mood, pop: yk, seed: 2, glow: 0.9, hops: [T.you + 0.4, T.ding + 0.05, T.l1 + 0.3, T.heart, 9.75] })
          if (t > T.heart) for (let i = 0; i < 6; i++) {
            const born = T.heart + i * 0.17, p = (t - born) / 1.1
            if (p < 0 || p >= 1) continue
            drawBits(x, HEART, { H: i % 2 ? LAV : '#ff4f86', W: '#ffd1de' }, r.x + Math.sin(p * 6 + i) * 30 + (i % 3 - 1) * 40, r.top - p * 200, 6, { alpha: Math.sin(Math.PI * p) })
          }
        }
        x.globalAlpha = 1
        x.restore()
        // the ghost rises behind the roof crown (wide shot only)
        if (C.z === 1) drawGhostCameo(x, t, { x: 540, y: ROOF + 1000 - 1000 + dy, at: T.ghost, dur: 1.2, from: 'below', cell: 3 })
        sparkles(t, 540, floorTop(7) + 30, T.ding, 10, 160, 1)
        if (t > T.spin[1] && t < T.cut) { const C2 = cam(t); sparkles(t, C2.sx, C2.sy - 2.3 * 12, T.spin[1], 12, 140, 2, [GOLD, '#fff6e6', LAV]) }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.32 (H0 out → the door close-up) and 8.65 (box shut → the last line). cardfx keeps 8.65.
const CUTS = [5.32, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.09, 0, 0.026),
  ...Array.from({ length: 12 }, (_, f) => ['tick', +(T.tower + (f + 1) * 0.05 + 0.1).toFixed(3), 0.012 + f * 0.001]),
  ['pop', T.you + 0.2, 659.25, 0.03, -0.5],
  ['bell', T.ding, 1318.51, 0.04, 1.2, 0], ['bell', T.ding + 0.12, 1046.5, 0.035, 1.2, 0], ['whoosh', T.door[0], 0.3, 0.02], ['glitter', T.ding, T.ding + 0.6],
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.zoom[0], 0.6, 0.03],
  ...wordPops(T.h1, 4, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.spin[0] + Math.pow(i / 14, 1 / 0.6) * (T.spin[1] - T.spin[0])).toFixed(3), 0.02]),
  ['pop', T.spin[1], 1174.66, 0.05, 0], ['bell', T.spin[1] + 0.05, 1567.98, 0.03, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 5, 0.06, 1, 0.028), ['pop', T.h2 + 0.36, 1318.51, 0.05, 0],
  ['pop', T.peek + 0.2, 880, 0.03, 0.2], ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.3], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
