// st4cats (20 s vertical Align ad, Star Talk season 4, EP 097) · story 0–15.6, then the shared end card.
//   Virgo and Pisces, date #20, at home on a pixel couch. The callback: Pisces' date-#1 daydream (starpisces) had a
//   wedding, two cats and a cottage; now the two cats are real.
//   0.00–5.70  "Virgo and Pisces, | *date #20.*"  Virgo's old clipboard slides in ("DATE #20 ☐ ☐ ☐"); Virgo squints at it,
//              then flicks it away: no checklist. Pisces' daydream bubble rises: just the two of them on a couch, and two
//              cats. Drop (2.82): PISCES: "this is the *dream.*" The bubble pops and two real cats drop in: the orange one
//              onto the coffee table, the grey one onto the back of the couch.
//   5.80–10.6  "The cats | are *real.*"  The orange cat paws the mug off the table: crash. VIRGO (squinting at the
//              mess): "it's not *perfect.*" → PISCES leans in: "it's *ours.*" Virgo melts; heart eyes.
//   10.8 cut → "Not perfect. | *Ours.*"  The two lean together, the cats curl up asleep (z's), the lamp glows.
//              (The ghost peeks over the back of the couch.) Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + room + couch + cats + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const EP = 97
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const PIS = signStar('pisces'), VIR = signStar('virgo')
const ACC = '#b9b3ff'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [5.5, 5.7],
  room: 0.25, stars: 0.4, clip: 1.0, clipLook: 1.35, flick: [1.9, 2.5],
  bubble: 2.35, open: 2.66, l1: 2.82, bubPop: 4.4, cat1: 4.5, cat2: 4.68,
  h1: 5.8, h1Land: 6.25, swipe: [5.95, 6.2], fall: [6.2, 6.55], l2: 6.15, mess: 6.6,
  l3: 8.4, lean: [8.9, 9.4], melt: 9.15, close: 10.6, h1Out: [10.45, 10.65],
  cut: 10.8,
  h2: 10.88, h2Land: 11.4, sleep: 11.6, ghost: 12.2, h2Out: [15.1, 15.35], out: [15.0, 15.45],
}
const PISN = '♓ PISCES', VIRN = '♍ VIRGO'
const LINES = [
  { t: T.l1, speaker: PISN, text: 'this is the *dream.*', color: ACC },
  { t: T.l2, speaker: VIRN, text: 'it’s not *perfect.*', color: PINK },
  { t: T.l3, speaker: PISN, text: 'it’s *ours.*', color: ACC },
]
const CPS = 26

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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

// ── pixel props: the daydream cats from starpisces, now one at a time and real
const CAT = [
  'O...O..',
  'OO.OO..',
  'OOOOO..',
  'OeOeO..',
  'OOpOO..',
  '.OOO...',
  'OOOOO..',
  'OOOOOO.',
  'OOOOO.O',
  'OOOOOOO',
]
const CAT_SLEEP = [
  '.......',
  '.......',
  'O...O..',
  'OO.OO..',
  'OOOOO..',
  'OeOeO..',
  'OOpOOOO',
  'OOOOOOO',
  'OOOOOOO',
  '.OOOOO.',
]
const CAT_O = { O: '#f2a65a', e: INK, p: '#ff8fb1' }, CAT_O_Z = { O: '#f2a65a', e: '#b8692a', p: '#ff8fb1' }
const CAT_G = { O: '#8a82a8', e: INK, p: '#ff8fb1' }, CAT_G_Z = { O: '#8a82a8', e: '#5b5470', p: '#ff8fb1' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const MUG = ['MMMM.', 'MWMMM', 'MMMM.M', 'MMMMM', '.MMM.'].map(r => r.padEnd(6, '.').slice(0, 6))
const MUG_C = { M: '#fbf1dc', W: '#ff8fb1' }

// ── layout
const COUCH = { x0: 120, x1: 960, back: 950, seat: 1150, base: 1296, arm: 1056 }
const FLOOR = 1316
const TABLE = { x0: 380, x1: 720, y: 1262 }
const VIR0 = { x: 375, y: 1035, size: 290 }, PIS0 = { x: 705, y: 1035, size: 290 }
const CAT1 = { x: 530, y: TABLE.y - 72, cell: 14 }                  // on the coffee table
const CAT2 = { x: 540, y: COUCH.back - 72, cell: 14 }               // on the back of the couch, between them
const MUG0 = { x: 640, y: TABLE.y - 26 }
const BUB = { x: 600, y: 700, w: 600, h: 300 }
const LAMP = { x: 990, y: FLOOR }
export const GHOST = { at: T.ghost, x: 838, y: COUCH.back, where: 'peeking over the back of the couch' }

function virState(t) {
  if (t < T.clipLook) return { mood: 'happy', look: [1, 0] }
  if (t < T.flick[0]) return { mood: 'squint', look: [-1, -1], blink: false }
  if (t < T.flick[1]) return { mood: 'wink' }
  if (t < T.cat1) return { mood: 'happy', look: [1, -0.5] }
  if (t < T.cat1 + 0.6) return { mood: 'wide', look: [0.5, 1], blink: false }
  if (t < T.mess) return { mood: 'happy', look: [0.5, 1] }
  if (t < T.l3) return { mood: 'squint', look: [1, 1], blink: false }      // the mess
  if (t < T.melt) return { mood: 'wide', look: [1, 0], blink: false }      // "it's ours."
  if (t < T.cut) return { mood: 'happy', blush: 1 }
  if (t < T.sleep + 0.6) return { mood: 'heart' }
  return { mood: 'sparkle', look: [1, 0] }
}
function pisState(t) {
  if (t < T.flick[0]) return { mood: 'happy', look: [-1, 0] }
  if (t < T.bubble) return { mood: 'heart' }
  if (t < T.bubPop) return { mood: 'sparkle', look: [-0.3, -1], blink: false }
  if (t < T.cat1 + 0.6) return { mood: 'wide', look: [-0.5, 1], blink: false }
  if (t < T.fall[1]) return { mood: 'happy' }
  if (t < T.l3) return { mood: 'wide', look: [-0.5, 1], blink: false }
  if (t < T.melt) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}
const VIR_HOPS = [T.stars + 0.3, T.flick[0], T.cat1 + 0.1, T.l2, T.l2 + 0.4, T.mess + 0.05, T.melt, T.h2Land]
const PIS_HOPS = [T.stars + 0.4, T.flick[0] + 0.1, T.l1, T.l1 + 0.4, T.cat2 + 0.1, T.l3, T.l3 + 0.35, T.h2Land + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Virgo and Pisces, | *date #20.*', { top: 200, size: 100, accentSize: 170, at: T.h0, gap: 0.09, accentColor: PINK, wobble: true, late: 2, lateAt: T.h0Land, lateGap: 0.12, fit: true })
  const H1 = popText(root, 'The cats | are *real.*', { top: 200, size: 124, accentSize: 186, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Not perfect. | *Ours.*', { top: 200, size: 120, accentSize: 220, at: T.h2, gap: 0.12, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ACC, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6, spread = 200) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * spread + Math.sin(p * 7 + i) * 14, hy = cy - 30 - p * 200
      drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  /** a pixel cloud: union of cell-snapped circles (starpisces' daydream bubble) */
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
  /** a little couch (cells), used big for the room and tiny inside the daydream */
  function couch(x0, x1, back, seat, base, arm, c, part) {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
    if (part !== 'front') {
      R(x0 + 2 * c, back - c, x1 - x0 - 4 * c, seat - back + c, INK)
      R(x0 + 3 * c, back, x1 - x0 - 6 * c, seat - back, '#3f7f8f')
      R(x0 + 3 * c, back, x1 - x0 - 6 * c, c, '#5fa8b8')
      const mid = (x0 + x1) / 2
      R(mid - c / 2, back + 2 * c, c, seat - back - 2 * c, '#2f5f6b')
    }
    if (part !== 'back') {
      R(x0 + c, seat - c, x1 - x0 - 2 * c, base - seat + c, INK)
      R(x0 + 2 * c, seat, x1 - x0 - 4 * c, base - seat - c, '#4a96a8')
      R(x0 + 2 * c, seat, x1 - x0 - 4 * c, c, '#7cc4d2')
      // the arms
      for (const [a, s] of [[x0, 1], [x1 - 4 * c, -1]]) {
        R(a - c, arm - c, 5 * c, base - arm + c, INK)
        R(a, arm, 3 * c, base - arm - c, '#3f7f8f'); R(a, arm, 3 * c, c, '#7cc4d2')
      }
      // little feet
      R(x0 + 3 * c, base, 2 * c, c * 1.5, INK); R(x1 - 5 * c, base, 2 * c, c * 1.5, INK)
    }
  }
  function drawRoom(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    // floor + rug
    x.fillStyle = INK; x.fillRect(0, FLOOR - 6, 1080, 6)
    x.fillStyle = '#6b4a3a'; x.fillRect(0, FLOOR, 1080, 60); x.fillStyle = '#7d5845'; for (let i = 0; i < 1080; i += 90) x.fillRect(i, FLOOR + 6, 60, 6)
    x.fillStyle = '#c56b8a'; x.fillRect(250, FLOOR - 2, 580, 14); x.fillStyle = '#e39ab2'; for (let i = 260; i < 820; i += 30) x.fillRect(i, FLOOR + 2, 14, 6)
    // floor lamp (right)
    const L = LAMP, glow = 0.85 + 0.15 * Math.sin(t * 2.3)
    x.fillStyle = INK; x.fillRect(L.x - 6, 880, 12, L.y - 880); x.fillRect(L.x - 40, L.y - 12, 80, 12)
    const g = x.createRadialGradient(L.x, 880, 0, L.x, 880, 300)
    g.addColorStop(0, `rgba(255,214,150,${0.32 * glow})`); g.addColorStop(1, 'rgba(255,214,150,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(L.x - 300, 580, 600, 600); x.restore()
    x.fillStyle = INK; x.beginPath(); x.moveTo(L.x - 54, 900); x.lineTo(L.x + 54, 900); x.lineTo(L.x + 34, 820); x.lineTo(L.x - 34, 820); x.closePath(); x.fill()
    x.fillStyle = '#ffd98a'; x.beginPath(); x.moveTo(L.x - 46, 894); x.lineTo(L.x + 46, 894); x.lineTo(L.x + 29, 826); x.lineTo(L.x - 29, 826); x.closePath(); x.fill()
    x.restore()
  }
  function drawTable(t, k) {
    if (k <= 0) return
    const { x0, x1, y } = TABLE
    x.save(); x.globalAlpha = clamp(k)
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 6, x1 - x0 + 12, 30); x.fillRect(x0 + 14, y, 18, FLOOR - y); x.fillRect(x1 - 32, y, 18, FLOOR - y)
    x.fillStyle = '#a8724a'; x.fillRect(x0, y, x1 - x0, 18); x.fillStyle = '#c98f5f'; x.fillRect(x0, y, x1 - x0, 6)
    x.fillStyle = '#8a5a34'; x.fillRect(x0 + 20, y + 24, 6, FLOOR - y - 24); x.fillRect(x1 - 26, y + 24, 6, FLOOR - y - 24)
    x.restore()
  }
  function drawMug(t) {
    const sw = ease.inOutQuad(prog(t, ...T.swipe)), fl = prog(t, ...T.fall)
    if (t >= T.fall[1]) {
      // the crash: a puddle and a broken mug on the floor, steam gone
      const sp = prog(t, T.fall[1], T.fall[1] + 0.3)
      x.fillStyle = '#7a4a2a'; x.fillRect(MUG0.x + 100 - 70 * sp, FLOOR + 2, 140 * sp + 50, 12)
      drawBits(x, ['MM..MM', 'MMM.MM'], MUG_C, MUG0.x + 140, FLOOR - 8, 9)
      return
    }
    const mx = MUG0.x + sw * 70 + fl * 70, my = MUG0.y + ease.inQuad(fl) * (FLOOR - 20 - MUG0.y)
    drawBits(x, MUG, MUG_C, Math.round(mx), Math.round(my), 9, { rot: fl * 2.6 })
    if (t < T.swipe[0]) { // steam
      x.save(); x.globalAlpha = 0.5
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.fillStyle = BONE; x.fillRect(mx - 8 + i * 8 + Math.sin(ph * 6 + i) * 4, my - 30 - ph * 40, 5, 5) }
      x.restore()
    }
  }
  function drawCat(t, c, cols, colsZ, t0, fromY, { paw = null } = {}) {
    const p = prog(t, t0, t0 + 0.35)
    if (p <= 0) return
    const land = ease.inQuad(p), sq = t > t0 + 0.35 && t < t0 + 0.6 ? 0.25 * Math.sin(Math.PI * (t - t0 - 0.35) / 0.25) : 0
    const y = lerp(fromY, c.y, land)
    const asleep = t > T.sleep
    const bm = asleep ? CAT_SLEEP : CAT
    const blink = !asleep && ((t * 1.3 + c.x) % 3.3 < 0.12)
    const pal = asleep || blink ? colsZ : cols
    x.save(); x.translate(c.x, y + 5 * c.cell); x.scale(1 + sq * 0.5, 1 - sq); x.translate(-c.x, -(y + 5 * c.cell))
    drawBits(x, bm, pal, c.x, y, c.cell)
    if (paw) { // a paw reaching out to the right
      x.fillStyle = INK; x.fillRect(c.x + 2.5 * c.cell, y + 1.5 * c.cell - paw * 4, (2 + 3 * paw) * c.cell, 2.2 * c.cell)
      x.fillStyle = cols.O; x.fillRect(c.x + 2.5 * c.cell, y + 1.8 * c.cell - paw * 4, (1.6 + 3 * paw) * c.cell, 1.6 * c.cell)
    }
    x.restore()
    if (asleep) {
      x.save(); x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'
      for (let i = 0; i < 2; i++) { const ph = (t * 0.5 + i * 0.5 + c.x * 0.001) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillText('z', c.x + 40 + ph * 30, y - 30 - ph * 50) }
      x.restore()
    }
  }
  function drawClipboard(t) {
    const pin = pop01(t, T.clip, 0.35, 2.0), fl = prog(t, ...T.flick)
    if (pin <= 0.01 || fl >= 1) return
    const cx = lerp(220, -200, ease.inCubic(fl)), cy = 830 - Math.sin(Math.PI * fl) * 160 + (1 - pin) * 120
    x.save(); x.translate(cx, cy); x.rotate(-0.12 - fl * 5); x.scale(pin, pin)
    x.fillStyle = INK; x.fillRect(-86, -110, 172, 226)
    x.fillStyle = '#a8724a'; x.fillRect(-80, -104, 160, 214)
    x.fillStyle = '#fbf6ec'; x.fillRect(-66, -78, 132, 176)
    x.fillStyle = '#c9c2b0'; x.fillRect(-30, -116, 60, 26); x.fillStyle = INK; x.fillRect(-30, -116, 60, 4)
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#c2365e'; x.fillText('DATE #20', 0, -56)
    for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-50, -26 + i * 36, 22, 22); x.fillStyle = '#fbf6ec'; x.fillRect(-46, -22 + i * 36, 14, 14); x.fillStyle = '#c9c2b0'; x.fillRect(-18, -18 + i * 36, 64, 8) }
    x.restore()
  }
  function drawBubble(t, from) {
    const bin = pop01(t, T.bubble, 0.4, 2.0), pk = prog(t, T.bubPop, T.bubPop + 0.16)
    if (bin <= 0.01 || pk >= 1) return
    const s = bin * (1 + 0.22 * Math.sin(Math.PI * pk)) * (1 - pk)
    const bob = Math.sin(t * 2.1) * 8
    const dots = [[0.22, 14], [0.48, 20], [0.74, 28]]
    dots.forEach(([f, r], i) => {
      if (t < T.bubble - 0.2 + i * 0.1) return
      const dx = lerp(from.x, BUB.x + 120, f), dy = lerp(from.y, BUB.y + BUB.h * 0.42, f) + bob * f
      x.save(); x.globalAlpha = 1 - pk
      x.fillStyle = 'rgba(185,179,255,0.9)'; x.fillRect(Math.round(dx - r / 2) - 4, Math.round(dy - r / 2) - 4, r + 8, r + 8)
      x.fillStyle = '#f4f2ff'; x.fillRect(Math.round(dx - r / 2), Math.round(dy - r / 2), r, r)
      x.restore()
    })
    x.save(); x.translate(BUB.x, BUB.y + bob); x.scale(s, s)
    cloud(0, 0, BUB.w, BUB.h, 12, '#f4f2ff', '#b9b3ff')
    // the daydream: just the two of them on a couch, and two cats
    couch(-170, 170, -20, 40, 84, 14, 6)
    drawStarChar(x, -62, 6, 96, t, { color: VIR.color, mood: 'happy', glow: 0.3, bob: 0, tips: false, seed: 11 })
    drawStarChar(x, 62, 6, 96, t, { color: PIS.color, mood: 'heart', glow: 0.3, bob: 0, tips: false, seed: 12 })
    couch(-170, 170, -20, 40, 84, 14, 6, 'front')
    drawBits(x, CAT, CAT_O, -215, 40, 6); drawBits(x, CAT, CAT_G, 215, 40, 6, { flip: true })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const rk = ease.outCubic(prog(t, T.room, T.room + 0.4)) * ok
      if (rk > 0) {
        drawRoom(t, rk)
        x.save(); x.globalAlpha = clamp(rk)
        couch(COUCH.x0, COUCH.x1, COUCH.back, COUCH.seat, COUCH.base, COUCH.arm, 10, 'back')
        x.restore()
        // the ghost peeks over the couch back (behind the stars)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'below', cell: 3 })
        drawCat(t, CAT2, CAT_G, CAT_G_Z, T.cat2, BUB.y)
        // the stars, sitting (their bottoms tucked behind the seat front); Pisces leans in
        const ln = ease.inOutCubic(prog(t, ...T.lean))
        const vp = pop01(t, T.stars, 0.38, 2.2) * ok, pp = pop01(t, T.stars + 0.1, 0.38, 2.2) * ok
        const gasp = t >= T.fall[1] && t < T.fall[1] + 0.5 ? -0.12 * Math.exp(-(t - T.fall[1]) * 7) * Math.cos((t - T.fall[1]) * 20) : 0
        let rP = null, rV = null
        if (vp > 0.02) rV = drawStarChar(x, VIR0.x + 18 * ln, VIR0.y, VIR0.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: VIR_HOPS, pop: vp, squash: gasp, seed: 2, glow: 1.0 })
        if (pp > 0.02) rP = drawStarChar(x, PIS0.x - 70 * ln, PIS0.y + 6 * ln, PIS0.size, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, pop: pp, seed: 6, glow: 1.15 })
        x.save(); x.globalAlpha = clamp(rk)
        couch(COUCH.x0, COUCH.x1, COUCH.back, COUCH.seat, COUCH.base, COUCH.arm, 10, 'front')
        x.restore()
        drawTable(t, rk)
        if (rk > 0.5) drawMug(t)
        const paw = t > T.swipe[0] - 0.15 && t < T.fall[0] + 0.2 ? Math.sin(Math.PI * prog(t, T.swipe[0] - 0.15, T.fall[0] + 0.2)) : null
        drawCat(t, CAT1, CAT_O, CAT_O_Z, T.cat1, BUB.y, { paw })
        drawClipboard(t)
        if (rP && t < T.bubPop + 0.2) drawBubble(t, { x: rP.x - 20, y: rP.top - 10 })
        sparkles(t, BUB.x, BUB.y, T.bubPop, 14, 280, 1, [ACC, PINK, GOLD, BONE])
        sparkles(t, MUG0.x + 140, FLOOR - 10, T.fall[1], 8, 70, 2, [BONE, '#c98f5f', GOLD])
        sparkles(t, 120, 820, T.flick[0] + 0.1, 8, 90, 3, [PINK, BONE, GOLD])
        if (rV && rP && t > T.melt) floatHearts(t, (rV.x + rP.x) / 2, rV.y - 140, T.melt, T.out[0] - 0.6, 4, 6, 260)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.75 (H0 out → "The cats are real.") and 10.8 (box shut → "Not perfect. Ours."). cardfx keeps 10.8.
const CUTS = [5.75, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.12, 1318.51, 0.045, 0],
  ['pop', T.stars + 0.05, 739.99, 0.04, -0.3], ['pop', T.stars + 0.15, 659.25, 0.035, 0.3],
  ['whoosh', T.clip - 0.05, 0.3, 0.03], ['tick', T.clip + 0.2, 0.03], ['tick', T.clipLook, 0.025],
  ['whoosh', T.flick[0], 0.5, 0.04], ['pluck', T.flick[0] + 0.05, 1318.51, 0.035, 0.5, -0.4],
  ['glitter', T.bubble, T.bubble + 0.5], ['pop', T.bubble + 0.1, 880, 0.03, 0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [PISN]: 760, [VIRN]: 620 } }),
  ['pop', T.bubPop, 1318.51, 0.06, 0.2], ['glitter', T.bubPop, T.bubPop + 0.45],
  ['pop', T.cat1 + 0.35, 987.77, 0.04, -0.2], ['pop', T.cat2 + 0.35, 1174.66, 0.04, 0.1], ['pluck', T.cat2 + 0.4, 1567.98, 0.03, 0.5, 0],
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['tick', T.swipe[0], 0.03], ['whoosh', T.fall[0], 0.3, 0.025], ['boom', T.fall[1], 0.1], ['tick', T.fall[1], 0.07], ['tick', T.fall[1] + 0.05, 0.05],
  ['pop', T.melt, 880, 0.03, 0], ['pluck', T.melt + 0.05, 1174.66, 0.04, 0.6, 0], ['bell', T.melt + 0.1, 1567.98, 0.022, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.12, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['bell', T.sleep + 0.1, 1318.51, 0.02, 1.2, 0], ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
