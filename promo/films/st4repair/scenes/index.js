// st4repair (20 s vertical Align ad, Star Talk season 4, EP 061, thread B6) · story 0–15.6, then the shared end card.
//   0.00–5.50  "Leo and Aquarius | make *up.*"  After Dallas: the ♌ Leo star (crown) and the ♒ Aquarius star (pink
//              headphones) sit at opposite ends of a pixel couch, arms crossed, looking away from each other. A "…" bubble
//              hangs in the gap; they sneak a glance, catch each other, snap away (huff puffs).
//              Drop (2.82): THE STARS: "somebody has to go first."  Both peek… and look away again. (Ghost: it rises
//              from behind the couch back, right in the awkward gap, and ducks.)
//   5.60–8.50  "Sorry. Need. | *Listen.*"  THE STARS: "say sorry. say what you need. then *listen*."  Leo looks down, thinks,
//              then uncrosses its arms and takes a breath.
//   8.60–12.7  "Leo goes | *first.*"  LEO: "sorry about Dallas. i just need to feel *chosen*."  Aquarius turns, takes the
//              headphones off (it's listening), uncrosses its arms, and they scoot together to the middle. Box shuts.
//  12.85       card cut (flip).
//  12.95–15.5  "Repair is | *romantic.*"  Side by side in the middle of the couch, heart-eyed, hearts floating up.
//              Everything pops out by 15.45; the end card ("JOIN THE TEXAS BETA") takes over at 15.6.
// One canvas (sky + constellation + couch + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 61
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const LEO = signStar('leo'), AQU = signStar('aquarius')
const ORANGE = LEO.color, CYAN = AQU.color, HOT = '#ff4fd8'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.38, 5.56],
  couch: 0.25, leoIn: 0.45, aquIn: 0.6, dots: [1.0, 2.55], peek: [1.75, 2.15], huff: 2.2,
  open: 2.66, l1: 2.85, peek2: [4.0, 4.55], ghost: 4.05,
  h1: 5.62, h1Land: 6.02, l2: 5.7, think: 6.2, eyesUp: 7.7, uncrossL: [8.0, 8.35], breath: 8.4, h1Out: [8.32, 8.5],
  h2: 8.58, h2Land: 8.98, l3: 8.9, aquTurn: 9.5, phonesOff: [10.2, 10.75], uncrossA: [10.6, 10.95],
  scoot: [11.25, 12.05], heartAqu: 11.9, heartLeo: 12.1, close: 12.5, h2Out: [12.5, 12.7],
  cut: 12.85, h3: 12.95, h3Land: 13.35, h3Out: [15.18, 15.42], out: [15.02, 15.45],
}
const SPEAK = 'THE STARS', LEOTAG = '♌ LEO STAR'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'somebody has to go first.' },
  { t: T.l2, speaker: SPEAK, text: 'say sorry. say what you need. then *listen*.' },
  { t: T.l3, speaker: LEOTAG, text: 'sorry about Dallas. i just need to feel *chosen*.', color: ORANGE },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const PUFF = ['.WW.', 'WWWW', 'WWWW', '.WW.']
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

// the couch: built once as a bitmap (B back, b back shade, A arm, S seat, s seam, F front, L legs, h highlight)
const COUCH = (() => {
  const Wc = 84, rows = []
  for (let j = 0; j < 24; j++) {
    let r = ''
    for (let i = 0; i < Wc; i++) {
      const arm = i < 7 || i >= Wc - 7, ai = i < 7 ? i : Wc - 1 - i
      let ch = '.'
      if (j >= 22) ch = (i >= 3 && i <= 5) || (i >= Wc - 6 && i <= Wc - 4) ? 'L' : '.'
      else if (arm) {
        if (j >= 7) ch = (j === 7 || (j === 8 && (ai === 0 || ai === 6))) ? (ai === 0 || ai === 6 ? (j === 7 ? '.' : 'A') : 'h') : ai === 6 ? 'b' : 'A'
        if (j === 7 && (ai === 0 || ai === 6)) ch = '.'
      } else if (j < 12) {
        if (j === 0 && (i < 9 || i > Wc - 10)) ch = '.'
        else ch = j === 0 || (j === 1 && (i === 7 || i === Wc - 8)) ? 'h' : (i === Wc / 2 || i === Wc / 2 - 1) ? 'b' : 'B'
        if (j === 0 && (i === 7 || i === 8 || i === Wc - 8 || i === Wc - 9)) ch = '.'
      } else if (j < 17) ch = j === 12 ? 'h' : (i === Wc / 2 || i === Wc / 2 - 1) ? 's' : 'S'
      else ch = j === 21 ? 'b' : 'F'
      r += ch
    }
    rows.push(r)
  }
  return rows
})()
const COUCH_C = { B: '#7b3f96', b: '#5a2a73', A: '#8b4aa8', S: '#9a58b8', s: '#6c3488', F: '#6a3386', L: '#2a1a40', h: '#c08ad8' }
const CC = 10                                    // couch cell (px)
const COUCH_X = 540, COUCH_Y = 1100              // centre of the couch bitmap
const SEAT_Y = COUCH_Y + (12 - 12) * CC          // top of the seat cushions (row 12; bitmap centre is row 12)
const BACK_Y = COUCH_Y - 12 * CC                 // top edge of the couch back

// ── the star's own squash (mirrors startalk's hop maths), so the crown and headphones stay seated
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 }) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

// ── layout
const SIZE = 250
const STAR_Y = SEAT_Y - 92
const LEO_X = [250, 440], AQU_X = [830, 640]     // ends of the couch → the middle

const LEO_HOPS = [T.leoIn + 0.3, T.huff, T.breath, ...talkHops(LINES.slice(2), LEOTAG, { cps: CPS }), T.scoot[0], T.h3Land]
const AQU_HOPS = [T.aquIn + 0.3, T.huff + 0.05, T.phonesOff[1], T.scoot[0] + 0.05, T.heartAqu, T.h3Land + 0.1]

function leoState(t) {
  if (t < T.peek[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.peek[1]) return { mood: 'neutral', look: [1, 0], blink: false }
  if (t < T.peek2[0]) return { mood: 'squint', look: [-1, -1] }
  if (t < T.peek2[1]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.think) return { mood: 'squint', look: [-1, 0] }
  if (t < T.eyesUp) return { mood: 'neutral', look: [0, 1] }                // "say sorry…" it looks down, thinking
  if (t < T.l3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.heartLeo) return { mood: t < T.aquTurn + 0.6 ? 'wide' : 'sparkle', look: [1, 0], blink: false }
  return { mood: 'heart' }
}
function aquState(t) {
  if (t < T.peek[0] + 0.08) return { mood: 'squint', look: [1, 0] }
  if (t < T.peek[1]) return { mood: 'neutral', look: [-1, 0], blink: false }
  if (t < T.peek2[0] + 0.1) return { mood: 'eyeroll' }
  if (t < T.peek2[1]) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.aquTurn) return { mood: 'squint', look: [1, -1] }
  if (t < T.phonesOff[1]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.heartAqu) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Leo and Aquarius | make *up.*', { top: 236, size: 96, accentSize: 170, at: T.h0, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.h0 + 0.5 })
  const H1 = popText(root, 'Sorry. Need. | *Listen.*', { top: 236, size: 118, accentSize: 186, at: T.h1, gap: 0.12, late: 1, lateAt: T.h1Land, wobble: true, accentColor: CYAN })
  const H2 = popText(root, 'Leo goes | *first.*', { top: 236, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ORANGE })
  const H3 = popText(root, 'Repair is | *romantic.*', { top: 236, size: 128, accentSize: 196, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // a warm living-room lamp glow behind the couch
  function drawRoom(t, ok) {
    const k = clamp(pop01(t, T.couch, 0.5, 1.2)) * ok
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const warm = 0.16 + (t > T.scoot[0] ? 0.08 * ease.outCubic(prog(t, ...T.scoot)) : 0)
    const g = x.createRadialGradient(540, COUCH_Y - 40, 0, 540, COUCH_Y - 40, 560)
    g.addColorStop(0, `rgba(255,190,140,${warm * k})`); g.addColorStop(1, 'rgba(255,190,140,0)')
    x.fillStyle = g; x.fillRect(0, COUCH_Y - 600, 1080, 1200)
    x.restore()
    // floor line + rug
    x.save(); x.globalAlpha = 0.85 * k
    x.fillStyle = 'rgba(12,7,30,0.75)'; x.fillRect(0, COUCH_Y + 12 * CC, 1080, 8)
    x.translate(540, COUCH_Y + 13 * CC + 20); x.scale(1, 0.13)
    const r = x.createRadialGradient(0, 0, 0, 0, 0, 520); r.addColorStop(0, 'rgba(255,143,177,0.32)'); r.addColorStop(1, 'rgba(255,143,177,0)')
    x.fillStyle = r; x.beginPath(); x.arc(0, 0, 520, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function drawCouch(t, ok) {
    const k = pop01(t, T.couch, 0.4, 1.6) * ok
    if (k <= 0.01) return
    drawBits(x, COUCH, COUCH_C, COUCH_X, COUCH_Y + (1 - k) * 60, CC * clamp(k, 0, 1.2))
  }

  // two little stub arms folded across the star's belly (k: 1 crossed → 0 uncrossed, dropped down the sides)
  function arms(r, size, col, shade, k, flip) {
    if (k <= 0.01) return
    const c = Math.max(4, Math.round(size / 34))
    const BAR = ['AAAAAAAAAA', 'sAAAAAAAAs']
    const cy = r.y + size * 0.16, sp = (1 - k) * size * 0.22
    x.save(); x.globalAlpha *= clamp(k * 1.6)
    drawBits(x, BAR, { A: col, s: shade }, r.x - sp, cy + (1 - k) * size * 0.06, c, { rot: flip * (0.42 + (1 - k) * 0.9) })
    drawBits(x, BAR, { A: col, s: shade }, r.x + sp, cy + (1 - k) * size * 0.06, c, { rot: -flip * (0.42 + (1 - k) * 0.9) })
    x.restore()
  }
  /** staraqua's pink headphones on a star: k = 0 on the head, 1 lifted off */
  function headphones(r, s, k) {
    if (k >= 1) return
    const c = Math.max(4, Math.round(s / 30))
    const lift = ease.outCubic(k)
    const cupY = r.y - s * 0.06 - lift * s * 0.55, cupX = s * 0.4 * (1 + 0.25 * lift), ry = -s * 0.44
    x.save(); x.globalAlpha *= 1 - ease.inQuad(k)
    for (const [col, w] of [[INK, 1.5], ['#3a2a6e', 1]]) for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = col; x.fillRect(Math.round(bx - c * w), Math.round(by - c * w), c * 2 * w, c * 2 * w)
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
      x.fillStyle = '#b02a98'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
    }
    x.restore()
  }

  // the awkward "…" bubble in the gap
  function drawDots(t) {
    const a = pop01(t, T.dots[0], 0.28, 2.2) * (1 - prog(t, T.dots[1] - 0.15, T.dots[1]))
    if (a <= 0.01) return
    const c = 9 * a, w = 15, h = 7, BUB = []
    for (let j = 0; j < h; j++) { let r = ''; for (let i = 0; i < w; i++) r += (j === 0 || j === h - 1) && (i === 0 || i === w - 1) ? '.' : 'B'; BUB.push(r) }
    BUB.push('......BB.......', '.......B.......')
    const cx = 540, cy = 820 + Math.sin(t * 2) * 6
    drawBits(x, BUB, { B: BONE }, cx, cy, c)
    const n = 1 + Math.floor((t - T.dots[0]) / 0.3) % 3
    x.fillStyle = INK
    for (let k = 0; k < n; k++) x.fillRect(cx + (-6 + k * 4.5) * c, cy - (h + 2) * c / 2 + 2.5 * c, 3 * c, 2 * c)
  }
  function huffs(t, cx, cy, t0, dir) {
    const tt = t - t0
    if (tt < 0 || tt > 0.8) return
    for (let i = 0; i < 3; i++) {
      const p = clamp((tt - i * 0.08) / 0.6)
      if (p <= 0 || p >= 1) continue
      drawBits(x, PUFF, { W: '#e8e4f8' }, cx + dir * (30 + p * 120) + i * dir * 18, cy - p * 60 - i * 22, 7 * (1 - 0.4 * p), { alpha: 1 - p, outline: null })
    }
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7, spread = 260) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 18), Math.round(cy - 60 - p * 280), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYAN]) {
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

  function drawStars(t, ok) {
    const sc = ease.inOutCubic(prog(t, ...T.scoot)), hop = Math.sin(Math.PI * sc) * 40
    const lp = pop01(t, T.leoIn, 0.38, 2.2) * ok, ap = pop01(t, T.aquIn, 0.38, 2.2) * ok
    // the post-cut beat: the pair a little bigger, side by side
    const big = t >= T.cut ? 1.1 : 1
    const L = { x: lerp(LEO_X[0], LEO_X[1], sc), y: STAR_Y - hop, size: SIZE * big }
    const A = { x: lerp(AQU_X[0], AQU_X[1], sc), y: STAR_Y - hop, size: SIZE * big }
    const breath = t > T.breath && t < T.breath + 0.6 ? -0.08 * Math.sin(Math.PI * prog(t, T.breath, T.breath + 0.6)) : 0
    const lOpts = { color: ORANGE, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, squash: breath, seed: 3, glow: 1 + (t > T.heartLeo ? 0.3 : 0) }
    const aOpts = { color: CYAN, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 8, glow: 1 + (t > T.heartAqu ? 0.3 : 0) }
    const lean = t >= T.cut ? 1 : 0
    let rL = null, rA = null
    if (lp > 0.02) rL = drawStarChar(x, L.x + lean * 6, L.y, L.size, t, lOpts)
    if (ap > 0.02) rA = drawStarChar(x, A.x - lean * 6, A.y, A.size, t, aOpts)
    if (rL) {
      arms(rL, L.size * lp, '#ffd08a', '#d98a2c', 1 - ease.inOutCubic(prog(t, ...T.uncrossL)), 1)
      const tl = tipOf(t, rL, L.size, lp, lOpts)
      drawBits(x, CROWN, CROWN_C, Math.round(tl.x), Math.round(tl.y - CROWN.length * tl.cell * 0.12), tl.cell * 0.95, { rot: -0.2 + 0.04 * Math.sin(t * 3), alpha: clamp(lp) })
      huffs(t, rL.x - 40, rL.y - 60, T.huff, -1)
    }
    if (rA) {
      arms(rA, A.size * ap, '#b6f4ff', '#3fb4d0', 1 - ease.inOutCubic(prog(t, ...T.uncrossA)), -1)
      headphones(rA, A.size * ap, prog(t, ...T.phonesOff))
      huffs(t, rA.x + 40, rA.y - 60, T.huff + 0.05, 1)
    }
    if (rL && rA) {
      sparkles(t, A.x, A.y - 120, T.phonesOff[1], 8, 110, 1, [HOT, '#ffb3f0', BONE])
      sparkles(t, 540, STAR_Y, T.scoot[1], 12, 280, 4, [GOLD, CYAN, ORANGE, PINK])
      if (t > T.heartAqu) floatHearts(t, 540, STAR_Y - 40, T.heartAqu, T.out[0] - 0.6, 2, 7, 330)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        x.save(); if (t >= T.cut) x.translate(0, 170)          // box shut: the couch drops into the freed space (under the cut)
        drawRoom(t, ok)
        drawCouch(t, ok)
        // the ghost rises from behind the couch back, right in the awkward gap
        drawGhostCameo(x, t, { x: 540, y: BACK_Y, at: T.ghost, dur: 1.35, from: 'below', cell: 3 })
        drawDots(t)
        drawStars(t, ok)
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.6 (hook → "Sorry. Need. Listen.") and 12.85 (box shut → "Repair is romantic."); cardfx keeps the 12.85 flip.
const CUTS = [5.6, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the couch lands, both stars plop down at opposite ends, the "…" bubble, a sneaky glance, huffs
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0 + 0.5, 1318.51, 0.045, 0],
  ['boom', T.couch + 0.2, 0.12], ['pop', T.leoIn + 0.1, 659.25, 0.04, -0.4], ['pop', T.aquIn + 0.1, 830.61, 0.04, 0.4],
  ['tick', T.dots[0] + 0.3, 0.03], ['tick', T.dots[0] + 0.6, 0.03], ['tick', T.dots[0] + 0.9, 0.03], ['tick', T.dots[0] + 1.2, 0.03],
  ['pluck', T.peek[0], 1318.51, 0.035, 0.4, 0], ['whoosh', T.peek[1] - 0.05, 0.2, 0.03],
  ['whoosh', T.huff, 0.3, 0.025], ['whoosh', T.huff + 0.08, 0.3, 0.02],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEOTAG]: 640 } }),
  ['pop', T.peek2[0], 440, 0.03, 0], ['whoosh', T.peek2[1] - 0.05, 0.2, 0.03],
  ['pop', T.ghost + 0.1, 1479.98, 0.018, 0], ['pop', T.ghost + 1.15, 987.77, 0.014, 0],
  // sorry. need. listen.
  ...wordPops(T.h1, 2, 0.12, 2, 0.025), ['pop', T.h1Land, 1108.73, 0.045, 0],
  ['tick', T.uncrossL[0] + 0.1, 0.03], ['whoosh', T.breath, 0.4, 0.025],
  // Leo goes first: Aquarius turns, headphones off, arms down, the scoot
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0],
  ['pop', T.aquTurn, 830.61, 0.025, 0.4], ['whoosh', T.phonesOff[0], 0.4, 0.03], ['glitter', T.phonesOff[1], T.phonesOff[1] + 0.35],
  ['whoosh', T.scoot[0], 0.6, 0.035], ['pluck', T.scoot[1], 1318.51, 0.045, 0.6, 0], ['glitter', T.scoot[1], T.scoot[1] + 0.4],
  ['pluck', T.heartAqu, 1108.73, 0.04, 0.5, 0.3], ['pluck', T.heartLeo, 1479.98, 0.04, 0.5, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // repair is romantic
  ...wordPops(T.h3, 2, 0.08, 3, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['bell', T.h3Land + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
