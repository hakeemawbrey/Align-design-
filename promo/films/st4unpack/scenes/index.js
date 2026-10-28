// st4unpack (15 s vertical Align ad, Star Talk season 4, EP 028, thread F: Gemini × Sagittarius) · story 0–10.6, then the end card.
//   0.00–5.20  "Dear Sagittarius: | you're *staying?*"  A Houston apartment at night: a window on a generic skyline, a rug.
//              The purple ♐ star (Jupiter-ruled, mutable fire) sets its starsag backpack down and unpacks: a shirt, a
//              sock, the passport. Across the room the yellow ♊ Gemini star hangs a framed map of Houston (tap, tap).
//              Drop (2.82): ♐ SAGITTARIUS: "i don't usually *unpack.*" …and it sneaks the passport back into the bag.
//              (The ghost peeks out of the backpack, 3.95–5.25.)
//   5.20–8.45  "A whole city | to *explore.*"  THE STARS: "adventure can be *local.* explore together." Pins drop onto the
//              map one by one (no labels, no stats: just places to go); Sag goes sparkle-eyed and the passport comes back out.
//   8.50 cut → "Stay *curious,* | together."  The pinned map, centred; Sag and Gemini hop in sync, a heart between them.
//              Everything pops out by 10.45; the end card takes over at 10.6.
// Place: generic skyline, the 610 Loop and Beltway 8 drawn as plain rings, Buffalo Bayou as a blue line; no logos.
// One canvas (sky + constellation + room + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 28
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SAG = signStar('sagittarius'), GEM = signStar('gemini')
const PURP = SAG.color, ACC = '#c9a6ff'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.72, h0Out: [4.98, 5.16],
  sagIn: 0.3, gemIn: 0.45, packDown: 0.6, items: [1.0, 1.35, 1.7], mapIn: 0.85, taps: [1.25, 1.55, 1.85],
  open: 2.62, s1: 2.84, sneak: [3.2, 3.65], caught: 3.8,
  ghost: 3.95,
  h1: 5.22, h1Land: 5.6, s2: 5.3, pins0: 6.0, passBack: [6.9, 7.35],
  close: 8.42, h1Out: [8.26, 8.44],
  cut: 8.5, h2: 8.56, h2Land: 8.92, heart: 9.35, h2Out: [10.18, 10.42], out: [10.05, 10.45],
}
const LINES = [
  { t: T.s1, speaker: '♐ SAGITTARIUS', text: "i don't usually *unpack.*", color: ACC },
  { t: T.s2, speaker: 'THE STARS', text: 'adventure can be *local.* explore together.', color: GOLD },
]
const CPS = 30
// pin positions on the map in map units (−1…1), roughly where real places sit around the Loop; unlabeled
const PINS = [[-0.05, -0.1], [0.3, 0.2], [-0.5, -0.45], [0.62, -0.35], [-0.2, 0.62], [-0.85, 0.18], [0.45, 0.72], [0.92, 0.05]]
const PIN_T = PINS.map((_, i) => +(T.pins0 + i * 0.2).toFixed(3))
const PIN_COL = [PINK, GOLD, CYAN, PINK, GOLD, '#7dffb0', PINK, GOLD]

const outBounce = u => { const n = 7.5625, d = 2.75; if (u < 1 / d) return n * u * u; if (u < 2 / d) return n * (u -= 1.5 / d) * u + 0.75; if (u < 2.5 / d) return n * (u -= 2.25 / d) * u + 0.9375; return n * (u -= 2.625 / d) * u + 0.984375 }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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

// ── pixel props (the backpack + passport are starsag's)
const PACK = ['...SSSSSS...', '..S......S..', '.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PppppppppppP', 'PPPPPPPPPPPP', 'PPPFFFFFFPPP', 'PPPFffffFPPP', 'PPPFFFFFFPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const PACK_C = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
const PASSPORT = ['NNNNNNN', 'NNgggNN', 'NgNgNgN', 'NgggggN', 'NgNgNgN', 'NNgggNN', 'NNNNNNN', 'NNggg.N', 'NNNNNNN']
const PASS_C = { N: '#1f3a7a', g: '#f2c75c' }
const SHIRT = ['TT..TT', 'TTTTTT', '.TTTT.', '.TwwT.', '.TTTT.']
const SHIRT_C = { T: '#ff6f8f', w: '#fff1c8' }
const SOCK = ['.WW', '.WW', '.RR', '.WW', 'WWW', 'WW.']
const SOCK_C = { W: '#efe6d6', R: '#5a7bd8' }
const HAMMER = ['HHHH', 'HHHH', '.w..', '.w..', '.w..', '.w..']
const HAMMER_C = { H: '#9aa3b8', w: '#8a5a2a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── layout
const FLOOR_Y = 1290
const SAG_P = { x: 360, y: 1165, size: 280 }, GEM_P = { x: 800, y: 1165, size: 260 }
const PACK_P = { x: 140, y: 1236, cell: 11 }          // on the floor, left of Sag
const PACK_TOP = PACK_P.y - 6 * PACK_P.cell + 22      // the opening the ghost peeks out of
const ITEMS = [{ bm: SHIRT, c: SHIRT_C, x: 560, y: 1262, cell: 9 }, { bm: SOCK, c: SOCK_C, x: 640, y: 1262, cell: 8 }, { bm: PASSPORT, c: PASS_C, x: 520, y: 1210, cell: 8 }]
const WIN = { x0: 70, y0: 560, x1: 450, y1: 900 }
const MAP_A = { cx: 770, cy: 735, w: 440, h: 360 }, MAP_F = { cx: 540, cy: 790, w: 600, h: 470 }
const SAG_F = { x: 290, y: 1250, size: 270 }, GEM_F = { x: 790, y: 1250, size: 260 }
const GHOST = { at: T.ghost, x: PACK_P.x, y: PACK_TOP, from: 'below', where: "peeking out of Sagittarius's half-unpacked backpack" }

function sagState(t) {
  if (t < T.items[0]) return { mood: 'happy' }
  if (t < T.s1) return { mood: 'neutral', look: [1, 1] }               // unpacking, carefully
  if (t < T.sneak[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.caught) return { mood: 'squint', look: [-1, 1], blink: false } // …sneaks the passport back
  if (t < T.s2) return { mood: 'wide', look: [1, 0], blink: false }      // caught
  if (t < T.pins0) return { mood: 'neutral', look: [1, -1] }
  if (t < T.cut) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function gemState(t) {
  if (t < T.taps[2] + 0.2) return { mood: 'squint', look: [1, -1] }      // hanging the map just so
  if (t < T.sneak[1]) return { mood: 'happy' }
  if (t < T.s2) return { mood: 'eyeroll' }                                 // saw that.
  if (t < T.cut) return { mood: 'happy', look: [-1, 0] }
  if (t < T.heart) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'sparkle', look: [-1, 0] }
}
const SAG_HOPS = [T.sagIn + 0.3, ...talkHops(LINES, '♐ SAGITTARIUS', { cps: CPS }), T.caught, ...PIN_T.filter((_, i) => i % 3 === 0).map(k => k + 0.1), T.h2Land, T.heart, 10.0]
const GEM_HOPS = [T.gemIn + 0.3, ...T.taps, T.passBack[1], T.h2Land + 0.05, T.heart + 0.15, 10.05]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Dear Sagittarius: | you're *staying?*", { top: 200, size: 90, accentSize: 140, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC, lineHeight: 1.08 })
  const H1 = popText(root, 'A whole city | to *explore.*', { top: 200, size: 104, accentSize: 150, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const H2 = popText(root, 'Stay *curious,* | together.', { top: 190, size: 128, accentSize: 180, at: T.h2, gap: 0.1, late: 0, wobble: true, accentColor: PINK, lineHeight: 1.0 })
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
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function panel(x0, y0, w, h, border, fillC, P = 6) {
    x.fillStyle = INK; x.fillRect(x0 - P, y0 - P, w + 2 * P, h + 2 * P)
    x.fillStyle = border; x.fillRect(x0, y0, w, h)
    x.fillStyle = fillC; x.fillRect(x0 + P, y0 + P, w - 2 * P, h - 2 * P)
  }

  // ── the room
  function drawRoom(t, ok) {
    const k = ease.outCubic(prog(t, 0.1, 0.5)) * ok
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    // floor + rug
    x.fillStyle = INK; x.fillRect(0, FLOOR_Y - 8, 1080, 8)
    x.fillStyle = '#4a2e22'; x.fillRect(0, FLOOR_Y, 1080, 160)
    x.fillStyle = '#5e3a2a'; for (let i = 0; i < 9; i++) x.fillRect(i * 130 + (i % 2) * 40, FLOOR_Y + 30 + (i % 3) * 40, 90, 6)
    x.fillStyle = INK; x.fillRect(200, FLOOR_Y + 14, 680, 70)
    x.fillStyle = '#6a4fb0'; x.fillRect(206, FLOOR_Y + 20, 668, 58)
    x.fillStyle = '#c9a6ff'; for (let i = 0; i < 12; i++) x.fillRect(226 + i * 54, FLOOR_Y + 44, 26, 10)
    x.restore()
  }
  function drawWindow(t, ok) {
    const k = easeOutBack(prog(t, 0.2, 0.6), 1.6) * ok
    if (k <= 0.01) return
    const { x0, y0, x1, y1 } = WIN, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    panel(x0, y0, x1 - x0, y1 - y0, '#d8cbe8', '#120a2c', 10)
    x.save(); x.beginPath(); x.rect(x0 + 10, y0 + 10, x1 - x0 - 20, y1 - y0 - 20); x.clip()
    // night gradient + generic towers with lit windows
    const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#1a1048'); g.addColorStop(1, '#4a2a6a')
    x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    const towers = [[0.04, 0.42, 0.13], [0.18, 0.22, 0.12], [0.31, 0.5, 0.1], [0.42, 0.14, 0.13], [0.56, 0.34, 0.11], [0.68, 0.06, 0.12], [0.81, 0.4, 0.14]]
    const W0 = x1 - x0, H0 = y1 - y0
    towers.forEach(([u, top, w], i) => {
      const tx = x0 + u * W0, ty = y0 + top * H0 + 40, tw = w * W0
      x.fillStyle = '#0d0826'; x.fillRect(tx, ty, tw, y1 - ty)
      if (i === 5) { x.fillRect(tx + tw / 2 - 3, ty - 30, 6, 30) }       // a plain spire
      for (let yy = ty + 14; yy < y1 - 10; yy += 20) for (let xx = tx + 8; xx < tx + tw - 8; xx += 14) {
        const on = ((xx * 7 + yy * 13 + i * 31) % 5) < 2 && Math.sin(t * 0.7 + xx + yy) > -0.6
        if (on) { x.fillStyle = (xx + yy) % 3 ? '#ffd98a' : '#9fd8ff'; x.fillRect(xx, yy, 6, 8) }
      }
    })
    x.restore()
    // muntins
    x.fillStyle = '#d8cbe8'; x.fillRect(cx - 4, y0, 8, y1 - y0); x.fillRect(x0, cy - 4, x1 - x0, 8)
    x.restore()
  }

  // ── the map of Houston (a framed print): the Loop + Beltway as rings, the bayou, the freeways; pins drop in
  function drawMap(t, ok) {
    const pre = t < T.cut
    const M = pre ? MAP_A : MAP_F
    const k = pre ? easeOutBack(prog(t, T.mapIn, T.mapIn + 0.45), 1.8) * ok : pop01(t, T.cut + 0.05, 0.4, 1.8) * ok
    if (k <= 0.01) return
    let tilt = pre ? 0.08 * (1 - ease.outCubic(prog(t, T.taps[0] - 0.2, T.taps[2] + 0.2))) : -0.02
    for (const tp of T.taps) { const u = t - tp; if (pre && u > 0 && u < 0.25) tilt += 0.015 * Math.sin(u * 40) * (1 - u / 0.25) }
    const { cx, cy, w, h } = M
    x.save(); x.translate(cx, cy); x.rotate(tilt); x.scale(k, k)
    // nail + string
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-w * 0.3, -h / 2); x.lineTo(0, -h / 2 - 50); x.lineTo(w * 0.3, -h / 2); x.stroke()
    x.fillStyle = '#9aa3b8'; x.fillRect(-6, -h / 2 - 56, 12, 12)
    panel(-w / 2, -h / 2, w, h, '#8a5a34', '#f3ead6', 12)
    const s = (h - 80) / 2 * 0.95, my = 24
    x.save(); x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28); x.clip()
    // title
    x.font = `700 ${Math.round(s * 0.2)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#5e3a20'
    x.fillText('HOUSTON', 0, -h / 2 + 38)
    // beltway ring (big, rounded), the Loop (small), freeways crossing
    x.lineJoin = 'round'
    const ring = (rx, ry, col, lw) => { x.strokeStyle = col; x.lineWidth = lw; x.beginPath(); x.roundRect(-rx, my - ry, rx * 2, ry * 2, rx * 0.5); x.stroke() }
    ring(s * 1.05, s * 0.88, '#d7c7a6', 10); ring(s * 1.05, s * 0.88, '#b89a6a', 4)
    ring(s * 0.42, s * 0.4, '#d7c7a6', 10); ring(s * 0.42, s * 0.4, '#c47a3a', 5)
    x.strokeStyle = '#c9b68f'; x.lineWidth = 5
    x.beginPath(); x.moveTo(-s * 1.6, my - s * 0.05); x.lineTo(s * 1.6, my + s * 0.02); x.stroke()        // east–west
    x.beginPath(); x.moveTo(-s * 0.15, my - s * 1.3); x.lineTo(s * 0.25, my + s * 1.3); x.stroke()        // north–south
    // the bayou: a wiggly blue line running west to east through downtown
    x.strokeStyle = '#5aa0d8'; x.lineWidth = 6; x.beginPath()
    for (let i = 0; i <= 40; i++) { const u = i / 40, bx = lerp(-s * 1.6, s * 1.6, u), by = my + s * 0.12 + Math.sin(u * 13) * s * 0.06 + (u - 0.5) * s * 0.1; i ? x.lineTo(bx, by) : x.moveTo(bx, by) }
    x.stroke()
    // downtown: a little cluster
    x.fillStyle = '#7a6f98'; for (let i = 0; i < 4; i++) x.fillRect(-s * 0.1 + i * s * 0.06, my - s * 0.12 - (i % 2) * s * 0.06, s * 0.045, s * 0.12 + (i % 2) * s * 0.06)
    x.restore()
    // pins
    PINS.forEach(([u, v], i) => {
      const pt = PIN_T[i]
      if (t < pt && pre) return
      const pk = pre ? prog(t, pt, pt + 0.25) : 1
      const px = u * s * 1.05, py = my + v * s * 0.88
      const drop = (1 - outBounce(pk)) * -120
      x.save(); x.globalAlpha = clamp(pk * 4)
      x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(px - 6, py - 2, 14, 6)
      x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py + drop); x.lineTo(px, py - 22 + drop); x.stroke()
      x.fillStyle = INK; x.beginPath(); x.arc(px, py - 28 + drop, 13, 0, Math.PI * 2); x.fill()
      x.fillStyle = PIN_COL[i]; x.beginPath(); x.arc(px, py - 28 + drop, 9, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffffff'; x.fillRect(px - 5, py - 33 + drop, 4, 4)
      x.restore()
      if (pre) sparkles(t, cx + px * k, cy + (py - 28) * k, pt + 0.2, 5, 34, i, [PIN_COL[i], BONE])
    })
    x.restore()
  }

  // ── Sagittarius's unpacking
  function drawPack(t, ok) {
    const k = outBounce(prog(t, T.packDown, T.packDown + 0.45)) * ok
    if (t < T.packDown || t >= T.cut) return
    const y = lerp(PACK_P.y - 260, PACK_P.y, k)
    drawBits(x, PACK, PACK_C, PACK_P.x, Math.round(y), PACK_P.cell, { rot: -0.05, alpha: clamp(prog(t, T.packDown, T.packDown + 0.1)) * ok })
  }
  function itemPos(t, i) {
    const it = ITEMS[i], t0 = T.items[i]
    const p = prog(t, t0, t0 + 0.4)
    const sx = PACK_P.x, sy = PACK_TOP - 10
    let ix = lerp(sx, it.x, p), iy = lerp(sy, it.y, p) - Math.sin(Math.PI * p) * 220, rot = (1 - p) * 4
    if (i === 2) {
      // the passport sneaks back into the pack, then comes back out with the pins
      const b = prog(t, ...T.sneak), r = prog(t, ...T.passBack)
      if (b > 0 && r <= 0) { ix = lerp(it.x, sx, b); iy = lerp(it.y, sy, b) - Math.sin(Math.PI * b) * 120; rot = b * 3 }
      if (r > 0) { const tx = 480, ty = 1100; ix = lerp(sx, tx, r); iy = lerp(sy, ty, r) - Math.sin(Math.PI * r) * 160; rot = (1 - r) * 3 + 0.1 }
      if (b >= 1 && r <= 0) return null
    }
    return { ix, iy, rot, it }
  }
  function drawItems(t, ok) {
    if (t >= T.cut) return
    for (let i = 0; i < 3; i++) {
      if (t < T.items[i]) continue
      const P = itemPos(t, i)
      if (!P) continue
      const bob = i === 2 && t > T.passBack[1] ? Math.sin(t * 5) * 6 : 0
      drawBits(x, P.it.bm, P.it.c, Math.round(P.ix), Math.round(P.iy + bob), P.it.cell, { rot: P.rot, alpha: ok })
    }
  }
  function drawHammer(t, r, ok) {
    if (t < T.gemIn + 0.2 || t > T.taps[2] + 0.5) return
    let sw = 0
    for (const tp of T.taps) { const u = t - tp + 0.15; if (u > 0 && u < 0.3) sw = Math.max(sw, Math.sin(u / 0.3 * Math.PI)) }
    const a = clamp(prog(t, T.gemIn + 0.2, T.gemIn + 0.4)) * (1 - clamp(prog(t, T.taps[2] + 0.25, T.taps[2] + 0.5)))
    drawBits(x, HAMMER, HAMMER_C, Math.round(r.x - r.size * 0.35), Math.round(r.y - r.size * 0.55 - sw * 20), 10, { rot: -0.6 - sw * 0.7, alpha: a * ok })
    for (const tp of T.taps) { const u = t - tp; if (u > 0 && u < 0.25) { x.save(); x.globalAlpha = 1 - u / 0.25; x.fillStyle = BONE; for (let q = 0; q < 4; q++) { const ang = q * Math.PI / 2 + 0.6, R = 20 + u * 140; x.fillRect(Math.round(MAP_A.cx - MAP_A.w / 2 + 20 + Math.cos(ang) * R), Math.round(MAP_A.cy + MAP_A.h / 2 - 10 + Math.sin(ang) * R), 8, 8) } x.restore() } }
  }
  function floatHeart(t, cx, cy, ok) {
    const k = pop01(t, T.heart, 0.35, 2.4) * ok
    if (k <= 0.02) return
    drawBits(x, HEART, HEART_C, cx, Math.round(cy + Math.sin(t * 3) * 10), 13 * k * (1 + 0.08 * Math.sin(t * 8)))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const pre = t < T.cut
      if (ok > 0) {
        drawRoom(t, ok)
        if (pre) drawWindow(t, ok)
        drawMap(t, ok)
        drawPack(t, ok)
        if (pre) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, from: GHOST.from, dur: 1.3, cell: 4 })
        const G = pre ? GEM_P : GEM_F, S = pre ? SAG_P : SAG_F
        const gp = pop01(t, pre ? T.gemIn : T.cut + 0.1, 0.36, 2.2) * ok
        const sp = pop01(t, pre ? T.sagIn : T.cut + 0.05, 0.36, 2.2) * ok
        if (gp > 0.02) {
          const r = drawStarChar(x, G.x, G.y, G.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: GEM_HOPS, pop: gp, seed: 4, glow: 1.05 })
          if (pre) drawHammer(t, r, ok)
        }
        if (sp > 0.02) {
          const r = drawStarChar(x, S.x, S.y, S.size, t, { color: PURP, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, pop: sp, seed: 7, glow: 1.1 })
          if (pre) sparkles(t, r.x, r.y, T.pins0 + 0.1, 10, 190, 0.3)
        }
        drawItems(t, ok)
        if (!pre) { floatHeart(t, 540, 1150, ok); sparkles(t, 540, 1150, T.heart, 10, 120, 1.1) }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.2 (→ "A whole city to explore") and 8.5 (box shut → "Stay curious, together."). cardfx keeps 8.5.
const CUTS = [5.2, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.sagIn + 0.05, 739.99, 0.04, -0.3], ['pop', T.gemIn + 0.05, 880, 0.04, 0.3],
  ['boom', T.packDown + 0.2, 0.1], ['tick', T.packDown + 0.2, 0.05],
  ...T.items.map((k, i) => ['pop', k, NOTE[(i * 2) % NOTE.length], 0.03, -0.3]), ...T.items.map(k => ['tick', +(k + 0.4).toFixed(3), 0.03]),
  ['whoosh', T.mapIn, 0.3, 0.02], ...T.taps.map(k => ['tick', k, 0.07]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.sneak[0], 0.3, 0.02], ['tick', T.sneak[1], 0.04], ['pop', T.caught, 440, 0.035, 0.3],
  ['pop', T.ghost + 0.05, 1318.51, 0.012, -0.5],
  ...wordPops(T.h1, 4, 0.08, 2, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...PIN_T.map((k, i) => ['pop', +(k + 0.12).toFixed(3), NOTE[(i + 1) % NOTE.length] * (i % 2 ? 1 : 2), 0.03, (i % 2 ? 0.3 : -0.3)]),
  ['glitter', T.pins0, T.pins0 + 1.6], ['whoosh', T.passBack[0], 0.3, 0.02], ['pluck', T.passBack[1], 1174.66, 0.04, 0.6, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['pluck', T.h2 + 0.1, 1318.51, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
