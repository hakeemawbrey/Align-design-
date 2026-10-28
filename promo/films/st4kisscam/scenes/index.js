// st4kisscam (20 s vertical Align ad, Star Talk season 4, EP 032) · story 0–15.6, then the shared end card.
//   0.00–2.80  "The stars go | to a *ballgame.*"  A generic night stadium (light towers, a big screen, tiered stands full of
//              little sign stars; no team, league or brand marks anywhere). Two bone stars who just met sit in the front
//              row and smile shyly. 1.5: the big screen flips to KISS CAM and a pixel heart sweeps the crowd…
//   2.82 drop  …and lands on the two of them. Both FREEZE (wide eyes, sweat drops); the crowd goes "ooooh".
//              "The whole stadium | is *watching.*"  Box (THE STARS): "nobody should be pushed into a moment."
//              → "ask first. *always.*"  The left star turns: "high five?" The other: "yes!" They high-five
//              (star tips clap, a burst), laughing; the screen flips to HIGH FIVE CAM in gold.
//  10.60 cut → "Consent is | *cute.*"  The pair laughs and hops; the high-fives ripple through the crowd.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// Easter eggs (stlore.js): the EP 032 seed constellation (top-left), the EP numeral in the frame, and the ghost leaning
// out from behind the big screen's right edge (lore.json).
// One canvas (sky + stadium + crowd + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 32
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', HOT = '#ff4f86', INK = '#1b1236', SWEAT = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const LEFT_C = STAR.bone, RIGHT_C = '#f6d6e0'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [2.62, 2.8],
  shy: [0.5, 1.4], cam: 1.5, sweep: [1.6, 2.8], land: 2.82, ooh: [3.0, 4.6],
  h1: 2.9, h1Land: 3.3, open: 4.8, l1: 5.0, ghost: 6.45,
  l2: 8.2, turn: 8.7, askQ: [8.95, 10.2], yes: [9.45, 10.3], five: 9.95, hfCam: 10.0,
  close: 10.55, h1Out: [10.4, 10.58],
  cut: 10.6, h2: 10.65, h2Land: 11.05, ripple: [11.6, 14.2], h2Out: [15.15, 15.4], out: [15.0, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'nobody should be pushed into a moment.' },
  { t: T.l2, speaker: SPEAK, text: 'ask first. *always.*', color: PINK },
]
const CPS = 30

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const win = (t, [a, b], fi = 0.18, fo = 0.18) => clamp(Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b)))

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

// ── pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_OUT = [          // the kiss-cam reticle: a hollow pixel heart
  '..XXXX.....XXXX..',
  '.X....X...X....X.',
  'X......X.X......X',
  'X.......X.......X',
  'X...............X',
  '.X.............X.',
  '..X...........X..',
  '...X.........X...',
  '....X.......X....',
  '.....X.....X.....',
  '......X...X......',
  '.......X.X.......',
  '........X........',
]
const DROP = ['.d.', 'ddd', 'dDd', '.d.']

// ── layout
const SCREEN = { x: 540, y: 735, w: 600, h: 330 }
const SEAT_Y = 1300
const PAIR = { lx: 345, rx: 735, y: 1215, size: 280 }
const LOW = 120
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))
// the crowd: three tiers of little sign stars (deterministic)
const CROWD = []
{
  const rows = [{ y: 1000, n: 9, s: 74, x0: 70, x1: 1010 }, { y: 1075, n: 8, s: 84, x0: 110, x1: 970 }]
  let k = 0
  rows.forEach((r, j) => {
    for (let i = 0; i < r.n; i++) {
      const x = lerp(r.x0, r.x1, i / (r.n - 1)) + (j % 2 ? 0 : 12)
      CROWD.push({ x, y: r.y, size: r.s, color: SIGNS[(k * 5 + 3) % 12].color, seed: 11 + k, row: j, i })
      k++
    }
  })
  // front row neighbours (either side of the pair)
  CROWD.push({ x: 85, y: 1235, size: 120, color: SIGNS[4].color, seed: 40, row: 2, i: 0 })
  CROWD.push({ x: 995, y: 1235, size: 120, color: SIGNS[9].color, seed: 41, row: 2, i: 1 })
}

function leftState(t) {
  if (t < T.shy[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.shy[1]) return { mood: 'happy', look: [1, 0] }                                  // a shy little glance
  if (t < T.land) return { mood: 'neutral', look: [0.3, -1] }                                // what's on the screen?
  if (t < T.turn) return { mood: 'wide', look: [Math.sin(t * 3) > 0 ? 0.6 : 0, -1], blink: false }   // FROZEN
  if (t < T.five) return { mood: 'neutral', look: [1, 0] }                                   // turns and asks
  return { mood: 'happy' }
}
function rightState(t) {
  if (t < T.shy[0] + 0.3) return { mood: 'neutral', look: [0, 0] }
  if (t < T.shy[1] + 0.2) return { mood: 'happy', look: [-1, 0] }
  if (t < T.land) return { mood: 'neutral', look: [-0.3, -1] }
  if (t < T.askQ[0] + 0.2) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.yes[0]) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'happy' }
}
const LAUGH = [10.3, 10.75, 11.2, 11.95, 12.6, 13.4, 14.1]
const HOPS_L = [0.6, T.land + 0.05, T.turn, T.askQ[0] + 0.1, T.five - 0.25, ...LAUGH]
const HOPS_R = [0.95, T.land + 0.05, T.yes[0] + 0.05, T.five - 0.25, ...LAUGH.map(v => v + 0.2)]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The stars go | to a *ballgame.*', { top: 205, size: 116, accentSize: 168, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.5, lineHeight: 1.0 })
  const H1 = popText(root, 'The whole stadium | is *watching.*', { top: 215, size: 96, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Consent is | *cute.*', { top: 200, size: 136, accentSize: 220, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function burst(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.75) return
    const p = ease.outCubic(tt / 0.75)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.75)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  /** a pixel speech bubble with Space Mono text, tail pointing down at (tx, ty) */
  function bubble(t, text, cx, cy, a, { fill: f = '#fff6e6', ink = INK, size = 34, tail = 0 } = {}) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = Math.ceil(x.measureText(text).width) + 44, h = size + 30, sc = 0.6 + 0.4 * easeOutBack(clamp(a), 2.4)
    x.translate(cx, cy); x.scale(sc, sc)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
    x.fillStyle = f; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(tail - 12, h / 2 + 6, 24, 12); x.fillRect(tail - 6, h / 2 + 18, 12, 10)
    x.fillStyle = f; x.fillRect(tail - 6, h / 2, 12, 12)
    x.fillStyle = ink; x.fillText(text, 0, 2)
    x.restore()
  }
  function drawStadium(t, dy) {
    // the bowl's far rim + two light towers (generic, no marks)
    x.save()
    x.fillStyle = '#140d30'
    x.beginPath(); x.moveTo(0, 940 + dy); x.quadraticCurveTo(540, 820 + dy, 1080, 940 + dy); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
    x.fillStyle = '#1d1442'
    x.beginPath(); x.moveTo(0, 958 + dy); x.quadraticCurveTo(540, 842 + dy, 1080, 958 + dy); x.lineTo(1080, 970 + dy); x.quadraticCurveTo(540, 856 + dy, 0, 970 + dy); x.closePath(); x.fill()
    for (const s of [-1, 1]) {
      const tx = 540 + s * 445, ty = 520 + dy
      x.fillStyle = '#231a4e'; x.fillRect(tx - 7, ty + 40, 14, 480)
      // lamp bank glow
      const g = x.createRadialGradient(tx, ty + 20, 0, tx, ty + 20, 170)
      g.addColorStop(0, 'rgba(255,246,214,0.32)'); g.addColorStop(1, 'rgba(255,246,214,0)')
      x.fillStyle = g; x.fillRect(tx - 170, ty - 150, 340, 340)
      x.fillStyle = INK; x.fillRect(tx - 62, ty - 4, 124, 52)
      for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) {
        x.fillStyle = (i + j + Math.floor(t * 2)) % 7 === 0 ? '#ffffff' : '#fff1c8'
        x.fillRect(tx - 56 + i * 23, ty + 2 + j * 23, 19, 19)
      }
    }
    // seat tiers (stripes)
    for (let j = 0; j < 7; j++) {
      const y = 1010 + j * 74 + dy
      x.fillStyle = j % 2 ? '#2a1f5c' : '#241a52'; x.fillRect(0, y, 1080, 74)
      x.fillStyle = 'rgba(239,230,214,0.07)'; x.fillRect(0, y, 1080, 4)
    }
    x.restore()
  }
  function drawScreen(t, dy) {
    const { x: cx, w, h } = SCREEN, cy = SCREEN.y + dy
    const L = cx - w / 2, Tp = cy - h / 2
    x.save()
    x.fillStyle = '#231a4e'; x.fillRect(cx - 90, Tp + h, 22, 140); x.fillRect(cx + 68, Tp + h, 22, 140)
    x.fillStyle = INK; x.fillRect(L - 22, Tp - 22, w + 44, h + 44)
    x.fillStyle = '#3a2f6e'; x.fillRect(L - 14, Tp - 14, w + 28, h + 28)
    x.fillStyle = '#0a0720'; x.fillRect(L, Tp, w, h)
    // content, clipped to the screen
    x.beginPath(); x.rect(L, Tp, w, h); x.clip()
    const hf = t >= T.hfCam
    if (t < T.cam) {
      x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = Math.floor(t * 3) % 2 ? GOLD : BONE
      x.fillText('MAKE SOME NOISE', cx, cy - 10)
      for (let i = 0; i < 9; i++) { x.fillStyle = (i + Math.floor(t * 6)) % 3 ? '#3a2f6e' : GOLD; x.fillRect(L + 30 + i * 62, cy + 50, 34, 12) }
    } else {
      // the camera's view: the crowd panning, then the pair
      const pan = t < T.land ? lerp(-1, 0, ease.inOutCubic(prog(t, ...T.sweep))) : 0
      const zoomK = ease.outCubic(prog(t, T.land - 0.1, T.land + 0.35))
      x.fillStyle = '#211850'; x.fillRect(L, cy + 40, w, h)
      for (let i = -3; i <= 9; i++) {
        const mx = cx + (i - 3) * 120 + pan * 900
        if (Math.abs(mx - cx) < 130 && zoomK > 0.2) continue
        drawStarChar(x, mx, cy + 95, 100, t, { color: SIGNS[(i + 12) % 12].color, mood: hf ? 'happy' : 'neutral', look: [0, -1], seed: 30 + i, glow: 0.4, tips: false, hops: hf ? [10.4 + (i % 3) * 0.3, 11.5 + (i % 2) * 0.4] : null })
      }
      if (zoomK > 0) {
        const s = lerp(100, 150, zoomK)
        const L1 = leftState(t), R1 = rightState(t)
        drawStarChar(x, cx - 85, cy + 85, s, t, { color: LEFT_C, ...L1, seed: 3, glow: 0.5, tips: false, hops: HOPS_L })
        drawStarChar(x, cx + 85, cy + 85, s, t, { color: RIGHT_C, ...R1, seed: 6, glow: 0.5, tips: false, hops: HOPS_R })
        if (!hf) drawBits(x, HEART_OUT, { X: HOT }, cx, cy + 70, 15 * (1 + 0.05 * Math.sin(t * 8)), { outline: null, alpha: zoomK })
      }
      // the title bar
      x.fillStyle = 'rgba(10,7,32,0.85)'; x.fillRect(L, Tp, w, 78)
      x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const title = hf ? 'HIGH FIVE CAM' : 'KISS CAM'
      const blink = hf ? 1 : (Math.floor(t * 4) % 2 ? 1 : 0.75)
      x.globalAlpha = blink; x.fillStyle = hf ? GOLD : HOT
      x.fillText(title, cx, Tp + 41)
      x.globalAlpha = 1
      if (!hf) for (const s of [-1, 1]) drawBits(x, HEART, { H: HOT, W: '#ffd1de' }, cx + s * 175, Tp + 40, 6, { outline: null })
      else for (const s of [-1, 1]) drawPixelStar(x, cx + s * 220, Tp + 40, 30, 1, GOLD, '#fff6e6')
      // scanlines
      x.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = Tp; y < Tp + h; y += 6) x.fillRect(L, y, w, 2)
    }
    x.restore()
  }
  function drawReticle(t, dy) {
    if (t < T.sweep[0] || t > T.hfCam + 0.3) return
    const k = ease.inOutCubic(prog(t, ...T.sweep))
    const a = 1 - prog(t, T.hfCam, T.hfCam + 0.3)
    if (t < T.land) {   // the searching heart sweeps the crowd
      const cx = lerp(-60, 900, k) + Math.sin(k * 9) * 60 - (k > 0.75 ? (k - 0.75) * 4 * 360 : 0), cy = 1050 + Math.sin(k * 7) * 50
      drawBits(x, HEART_OUT, { X: HOT }, cx, cy, 13, { outline: INK, alpha: 0.9 })
      return
    }
    // landed: pink camera brackets lock around the pair (never over their faces)
    const p = easeOutBack(prog(t, T.land, T.land + 0.3), 2), pulse = 1 + 0.015 * Math.sin(t * 8)
    const cx = 540, cy = PAIR.y + dy - 10, hw = (430 + (1 - p) * 120) * pulse, hh = (215 + (1 - p) * 60) * pulse, L = 70, th = 12
    x.save(); x.globalAlpha = a * clamp(p * 2)
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const ex = cx + sx * hw, ey = cy + sy * hh
      for (const [col, o] of [[INK, 6], [HOT, 0]]) {
        x.fillStyle = col
        x.fillRect(Math.min(ex, ex - sx * L) - o, ey - th / 2 - o, L + 2 * o, th + 2 * o)
        x.fillRect(ex - th / 2 - o, Math.min(ey, ey - sy * L) - o, th + 2 * o, L + 2 * o)
      }
    }
    // REC dot + a little heart on top
    if (Math.floor(t * 2.5) % 2) { x.fillStyle = HOT; x.fillRect(cx - hw + 24, cy - hh + 24, 22, 22) }
    x.restore()
    drawBits(x, HEART, { H: HOT, W: '#ffd1de' }, cx, cy - hh - 4 + Math.sin(t * 5) * 5, 9 * pulse, { alpha: a * clamp(p * 2) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      drawStadium(t, dy * 0.5)
      if (ok > 0) {
        drawScreen(t, dy * 0.5)
        drawGhostCameo(x, t, { x: SCREEN.x + SCREEN.w / 2 + 22, y: SCREEN.y + 40, at: T.ghost, dur: 1.3, from: 'right', cell: 3 })
        // the crowd (back rows), cheering after the high-five
        const hf = t >= T.five
        for (const c of CROWD) {
          const wave = hf ? [T.five + 0.15 + c.i * 0.07, ...(t > T.ripple[0] ? [T.ripple[0] + c.i * 0.12 + c.row * 0.3, T.ripple[0] + 1.3 + c.i * 0.12 + c.row * 0.3] : [])] : (t > T.land ? [T.land + 0.1 + c.i * 0.04] : null)
          const mood = hf ? 'happy' : t > T.land ? 'wide' : t > T.cam ? 'neutral' : 'happy'
          drawStarChar(x, c.x, c.y + dy, c.size * ok, t, { color: c.color, mood, look: t > T.land && !hf ? [Math.sign(540 - c.x) * 0.8, 0.3] : [0, -0.6], seed: c.seed, glow: 0.45, hops: wave, tips: false })
        }
        // the pair (they lean in for the high-five)
        const fk = t < T.five ? ease.inCubic(prog(t, T.five - 0.3, T.five)) : 1 - ease.outCubic(prog(t, T.five, T.five + 0.5))
        const sq = t > T.five && t < T.five + 0.4 ? 0.18 * Math.exp(-(t - T.five) * 8) : 0
        const L = drawStarChar(x, PAIR.lx + 70 * fk, PAIR.y + dy, PAIR.size * ok, t, { color: LEFT_C, ...leftState(t), hops: HOPS_L, seed: 3, glow: 0.9, squash: sq })
        const R = drawStarChar(x, PAIR.rx - 70 * fk, PAIR.y + dy, PAIR.size * ok, t, { color: RIGHT_C, ...rightState(t), hops: HOPS_R, seed: 6, glow: 0.9, squash: sq })
        // the railing in front of the front row
        x.save(); x.globalAlpha = clamp(ok * 2)
        x.fillStyle = INK; x.fillRect(0, SEAT_Y + dy - 6, 1080, 30)
        x.fillStyle = '#4a3d86'; x.fillRect(0, SEAT_Y + dy, 1080, 18); x.fillStyle = '#6a5aa8'; x.fillRect(0, SEAT_Y + dy, 1080, 5)
        x.restore()
        // frozen: sweat drops
        if (t > T.land + 0.2 && t < T.turn) {
          const fall = ((t - T.land) * 0.9) % 1
          drawBits(x, DROP, { d: SWEAT, D: '#ffffff' }, L.x + L.size * 0.36, L.y - L.size * 0.25 + fall * 40, 8, { alpha: 1 - fall })
          drawBits(x, DROP, { d: SWEAT, D: '#ffffff' }, R.x - R.size * 0.36, R.y - R.size * 0.3 + ((fall + 0.45) % 1) * 40, 8, { alpha: 1 - (fall + 0.45) % 1 })
        }
        drawReticle(t, dy)
        burst(t, 540, PAIR.y + dy - 40, T.five, 12, 150, 0.3, [GOLD, BONE, PINK, '#ffffff'])
        // the crowd's "ooooh"
        const oa = win(t, T.ooh)
        if (oa > 0) { bubble(t, 'ooooh', 190, 925 + dy, oa, { size: 30 }); bubble(t, 'oooOOH', 880, 912 + dy, win(t, [T.ooh[0] + 0.25, T.ooh[1]]), { size: 30 }) }
        bubble(t, 'high five?', L.x + 20, L.top - 70, win(t, T.askQ), { tail: -60 })
        bubble(t, 'yes!', R.x + 10, R.top - 60, win(t, T.yes), { fill: '#ffe0ea', tail: -10 })
        if (t > T.ripple[0]) {
          for (let k = 0; k < 3; k++) burst(t, 220 + k * 320, 1010 + dy, T.ripple[0] + 0.25 + k * 0.45, 8, 90, k, [GOLD, BONE])
          for (let k = 0; k < 3; k++) burst(t, 380 + k * 320, 1075 + dy, T.ripple[0] + 1.4 + k * 0.4, 8, 90, k + 1, [GOLD, PINK])
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.84 (the kiss cam lands → "The whole stadium is watching") and 10.6 (box shut → the last line).
const CUTS = [2.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.09, 0, 0.026), ['pop', T.h0 + 0.5, 1174.66, 0.045, 0],
  ['pop', T.shy[0] + 0.1, 880, 0.02, -0.3], ['pop', T.shy[0] + 0.4, 987.77, 0.02, 0.3],
  ['bell', T.cam, 1318.51, 0.03, 0.8, 0], ['whoosh', T.sweep[0], 1.1, 0.03],
  ['pop', T.land, 1174.66, 0.05, 0], ['pop', T.land + 0.05, 1479.98, 0.04, 0], ['bell', T.land + 0.08, 1760, 0.03, 1.0, 0],
  ['whoosh', T.ooh[0], 1.0, 0.03], ['tick', T.land + 0.3, 0.03],
  ...wordPops(T.h1, 4, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0.5],
  ['pop', T.turn, 659.25, 0.03, -0.3], ['pop', T.askQ[0], 880, 0.035, -0.3], ['pop', T.yes[0], 1174.66, 0.04, 0.3],
  ['whoosh', T.five - 0.3, 0.3, 0.03], ['tick', T.five, 0.07], ['pop', T.five, 523.25, 0.05, 0], ['glitter', T.five, T.five + 0.6], ['bell', T.hfCam, 1567.98, 0.03, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ...LAUGH.map((v, i) => ['pop', v + 0.05, NOTE[(i * 2) % 7], 0.018, (i % 2 ? 0.3 : -0.3)]),
  ['glitter', T.ripple[0] + 0.25, T.ripple[0] + 1.0], ['glitter', T.ripple[0] + 1.4, T.ripple[0] + 2.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
