// st4fortworth (EP 048 · 20 s vertical · Star Talk season 4, drop 5 "Road trip", thread F) · story 0–15.6, then the
// shared end card (cta JOIN THE TEXAS BETA).
//   0.00–5.70  "Dear | *Fort Worth.*"  A brick street lined with old false-front storefronts (generic, no signs). A pixel
//              cattle drive of longhorns ambles slowly across. On the boardwalk: the gold ♉ Taurus star (Venus-ruled fixed
//              earth, the bull) in its blanket cape with its snack bag, and its date, the ♏ Scorpio star, still veiled.
//              Taurus sees the herd, gasps. Drop (2.82): TAURUS: "MY PEOPLE." (heart-eyed hops). The veiled Scorpio laughs.
//   5.70–12.7  "Fixed earth. | Very *fixed.*"  THE STARS: "slow and steady. you're *built* for loyalty." (Taurus glows,
//              proud). Then both reach for the last snack and tug (squints). THE STARS: "just don't be stubborn about the
//              small stuff." Taurus lets go, splits it in two, hands half over.
//   12.7 cut → "Xs and Os, | *y'all.*"  Pixel X's and O's float up between them; both heart-eyed as the herd ambles on.
// Easter eggs: seed constellation (EP 48) top-left, "EP 048" in the frame, the ghost peeks out of a boardwalk barrel.
// HELLO TEXAS: this last line is the X. One canvas, DOM type + the box on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, drawBits, sparkles, floatHearts, mark, NOTE, wordPops } from './kit.js'

export const DURATION = 20
export const EP = 48
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const TAU_ = signStar('taurus'), SCO = signStar('scorpio')
const TAU_TAG = `${TAU_.glyph} TAURUS STAR`, SKY_TAG = 'THE STARS'
const VEIL = '#c9a6ff'

const T = {
  h0: 0.12, h0Out: [5.45, 5.68],
  tIn: 0.4, sIn: 0.55, herd: 0.6, see: 1.7, gasp: 2.1,
  open: 2.66, l1: BEAT(4) + 0.02, laugh: [3.5, 4.6],
  h1: 5.86, h1Land: 6.3, l2: 5.95, proud: 7.4,
  ghost: 6.9,
  reach: 8.3, tug: [8.7, 10.6], l3: 9.4, split: 10.9, hand: 11.3,
  close: 12.62, h1Out: [12.42, 12.6],
  h2: 12.78, h2Land: 13.18, xo: 13.2, hearts: 13.6, h2Out: [15.15, 15.42], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: TAU_TAG, color: TAU_.color, text: 'MY *PEOPLE.*' },
  { t: T.l2, speaker: SKY_TAG, text: "slow and steady. you're *built* for loyalty." },
  { t: T.l3, speaker: SKY_TAG, text: "just don't be stubborn about the *small* stuff." },
]
const CPS = 30

// ── a pixel longhorn, side-on, walking left (two leg frames), built once
function makeLonghorn(f, spots) {
  const g = Array.from({ length: 14 }, () => Array(28).fill('.'))
  const r = (x0, y0, x1, y1, ch) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g[y] && x >= 0 && x < 28) g[y][x] = ch }
  r(0, 2, 12, 2, 'h'); r(0, 0, 0, 1, 'h'); r(12, 0, 12, 1, 'h'); r(1, 1, 1, 1, 'h'); r(11, 1, 11, 1, 'h')   // the horns
  r(8, 3, 25, 10, 'W'); r(9, 2, 14, 2, 'W')                                                               // body + hump
  for (const [a, b, c, d] of spots) r(a, b, c, d, 'b')
  r(3, 3, 8, 8, 'b'); r(2, 6, 4, 8, 'm'); r(5, 4, 5, 4, 'e'); r(2, 7, 2, 7, 'n')                           // head
  r(26, 4, 26, 8, 'b'); r(27, 8, 27, 9, 'b')                                                              // tail
  const legs = f ? [9, 14, 20, 25] : [10, 13, 21, 24]
  for (const L of legs) { r(L, 11, L, 12, 'W'); r(L, 13, L, 13, 'k') }
  return g.map(row => row.join(''))
}
const HORN_C = { h: '#f3e6c4', W: '#f1ebdf', b: '#9a5a2e', m: '#d9a98a', e: '#1b1236', n: '#5a2e1e', k: '#3a2a1e' }
const SPOTS = [[[12, 4, 15, 6], [19, 6, 23, 9]], [[10, 7, 13, 10], [17, 3, 21, 5], [23, 7, 25, 10]], [[14, 5, 18, 8]], [[11, 3, 13, 5], [20, 4, 24, 7]]]
const HERD = SPOTS.map(s => [makeLonghorn(0, s), makeLonghorn(1, s)])
const SNACK = ['.KKKK.', 'KYYYYK', 'KYOOYK', 'KYYYYK', 'KYOOYK', 'KYYYYK', '.KKKK.']
const SNACK_C = { K: '#c98a1f', Y: '#f7c948', O: '#ff9a52' }
const BUN = ['.yyyy.', 'yYYYYy', 'YYrYYY', 'YYYYrY', '.YYYY.']
const BUN_C = { y: '#fff1c8', Y: '#e8b26a', r: '#c96a3a' }
const HALF = ['.yy', 'yYY', 'YrY', 'YYY', '.YY']
const XBM = ['X...X', '.X.X.', '..X..', '.X.X.', 'X...X'], OBM = ['.XXX.', 'X...X', 'X...X', 'X...X', '.XXX.']
const PLAID = { A: '#c8443a', B: '#f1e3c4', C: '#8a2a2a' }

// ── layout
const STREET_Y = 1010, WALK_Y = 1250
const TAU0 = { x: 330, y: 1300, size: 260 }, SCO0 = { x: 760, y: 1305, size: 250 }
const LOW = 110, lowK = t => ease.inOutCubic(prog(t, 12.63, 12.73))
const BARREL = { x: 960, top: 930 }
const GHOST = { x: BARREL.x, y: BARREL.top, at: T.ghost, dur: 1.45, from: 'below', cell: 3 }

function tauState(t) {
  if (t < T.see) return { mood: 'happy' }
  if (t < T.l1) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.laugh[1] + 0.4) return { mood: 'heart' }
  if (t < T.l2) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.proud) return { mood: 'happy' }
  if (t < T.reach) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.l3 + 0.6) return { mood: 'squint', look: [1, 0] }
  if (t < T.split) return { mood: 'wide', look: [0, 0], blink: false }      // …oh. the small stuff.
  if (t < T.hearts) return { mood: 'happy' }
  return { mood: 'heart' }
}
function scoState(t) {
  if (t < T.l1 + 0.3) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.laugh[1]) return { mood: 'happy' }
  if (t < T.reach) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.split) return { mood: 'squint', look: [-1, 0] }
  if (t < T.hearts) return { mood: 'happy', blush: 1 }
  return { mood: 'heart' }
}
const TAU_HOPS = [T.tIn + 0.3, T.gasp, T.l1, T.l1 + 0.3, T.l1 + 0.65, T.proud, T.split, T.h2Land]
const SCO_HOPS = [T.sIn + 0.3, 3.5, 3.72, 3.94, 4.16, 4.38, T.hand + 0.1, T.hearts]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Dear | *Fort Worth.*', { top: 222, size: 128, accentSize: 180, at: T.h0, gap: 0.14, accentColor: TAU_.color, wobble: true, late: 2, lateAt: T.h0 + 0.26, lateGap: 0.12, fit: true })
  const H1 = popText(root, 'Fixed earth. | Very *fixed.*', { top: 214, size: 112, accentSize: 166, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, fit: true })
  const H2 = popText(root, "Xs and Os, | *y'all.*", { top: 214, size: 132, accentSize: 200, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the static set: storefronts, boardwalk, brick street
  const set = document.createElement('canvas'); set.width = W; set.height = 1920
  {
    const s = set.getContext('2d'), c = 10
    const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h >>> 8) / 16777216 }
    const FRONTS = [
      { x0: -20, x1: 300, top: 600, wall: '#8a3b2e', trim: '#e2d2ac', kind: 'brick' },
      { x0: 300, x1: 640, top: 650, wall: '#c9a26a', trim: '#5a3a1e', kind: 'wood' },
      { x0: 640, x1: 1100, top: 580, wall: '#6e4a8a', trim: '#e2d2ac', kind: 'brick' },
    ]
    for (const F of FRONTS) {
      for (let y = F.top; y < 980; y += c) for (let xx = F.x0; xx < F.x1; xx += c) {
        let col = F.wall
        if (F.kind === 'brick') { const row = Math.floor((y - F.top) / c), off = row % 2 ? 2 : 0; if (row % 3 === 2 || (Math.floor(xx / c) + off) % 4 === 0) col = '#4a2420'; else if (hash(xx, y) > 0.85) col = '#9e4a3a' }
        else { if (Math.floor(xx / c) % 4 === 0) col = '#9a7a4a' }
        s.fillStyle = col; s.fillRect(xx, y, c, c)
      }
      // cornice + stepped false front
      s.fillStyle = F.trim; s.fillRect(F.x0, F.top, F.x1 - F.x0, 2 * c); s.fillRect(F.x0, F.top + 5 * c, F.x1 - F.x0, c)
      // windows (warm, lit)
      const n = Math.max(2, Math.floor((F.x1 - F.x0) / 120))
      for (let k = 0; k < n; k++) {
        const wx = F.x0 + (k + 0.5) * (F.x1 - F.x0) / n - 30
        s.fillStyle = INK; s.fillRect(wx - c, F.top + 9 * c, 80, 120)
        s.fillStyle = hash(k, F.x0) > 0.4 ? '#ffd27a' : '#e8a64a'; s.fillRect(wx, F.top + 10 * c, 60, 100)
        s.fillStyle = INK; s.fillRect(wx + 25, F.top + 10 * c, c, 100); s.fillRect(wx, F.top + 14 * c, 60, c)
      }
    }
    // the awning over the boardwalk
    for (let xx = 0; xx < W; xx += c) { s.fillStyle = Math.floor(xx / 40) % 2 ? '#5a3a1e' : '#6e4a2a'; s.fillRect(xx, 880, c, 3 * c) }
    for (const px of [40, 300, 640, 1040]) { s.fillStyle = '#5a3a1e'; s.fillRect(px, 900, 2 * c, 110); s.fillStyle = '#7a5a34'; s.fillRect(px, 900, c, 110) }
    // boardwalk
    for (let xx = 0; xx < W; xx += c) for (let y = 970; y < STREET_Y; y += c) { s.fillStyle = Math.floor(xx / 60) % 2 ? '#8a6a3e' : '#7a5a34'; s.fillRect(xx, y, c, c) }
    s.fillStyle = '#4a3220'; s.fillRect(0, STREET_Y - c, W, c)
    // the brick street (rows of red brick, a little perspective)
    for (let y = STREET_Y; y < 1920; y += c) {
      const row = Math.floor((y - STREET_Y) / (2 * c)), bw = 4 + Math.floor((y - STREET_Y) / 200)
      for (let xx = 0; xx < W; xx += c) {
        const i = Math.floor(xx / c) + (row % 2 ? Math.floor(bw / 2) : 0)
        const mort = (y - STREET_Y) % (2 * c) === 0 || i % bw === 0
        s.fillStyle = mort ? '#3a2228' : ['#9a4a3a', '#8a3e32', '#a85a44'][Math.floor(hash(Math.floor(i / bw), row) * 3)]
        s.fillRect(xx, y, c, c)
      }
    }
    // night wash over the street, darker toward us
    s.save(); s.globalCompositeOperation = 'multiply'
    const g = s.createLinearGradient(0, 580, 0, 1920); g.addColorStop(0, '#8a86c8'); g.addColorStop(0.45, '#9a90b8'); g.addColorStop(1, '#3a3260')
    s.fillStyle = g; s.fillRect(0, 580, W, 1340); s.restore()
    // the barrel on the boardwalk (the ghost hides in it)
    for (let y = BARREL.top; y < BARREL.top + 90; y += c) for (let xx = BARREL.x - 40; xx < BARREL.x + 40; xx += c) {
      const k = (y - BARREL.top) / 90, half = 32 + 8 * Math.sin(Math.PI * k)
      if (Math.abs(xx + c / 2 - BARREL.x) > half) continue
      const hoop = (y - BARREL.top) % 30 < c
      s.fillStyle = hoop ? '#3a3a4a' : (Math.floor(xx / c) % 2 ? '#8a5a34' : '#7a4a2a'); s.fillRect(xx, y, c, c)
    }
    s.fillStyle = '#2a1a12'; s.fillRect(BARREL.x - 30, BARREL.top, 60, c)
  }

  function drawHerd(t) {
    // the herd walks left, slowly; drawn behind the stars
    for (let k = 0; k < 9; k++) {
      const hx = 1240 + k * 360 - 100 * Math.max(0, t - T.herd)
      if (hx < -260 || hx > 1340) continue
      const f = Math.floor((t * 2.4 + k * 0.5)) % 2, bob = f ? -3 : 0
      const sp = HERD[k % HERD.length][f]
      // a long soft shadow
      x.fillStyle = 'rgba(10,6,24,0.35)'; x.fillRect(Math.round(hx - 140), STREET_Y + 170, 290, 16)
      drawBits(x, sp, HORN_C, Math.round(hx), STREET_Y + 92 + bob + (k % 2) * 12, 11)
    }
  }
  function cape(r, size, ok) {
    // the blanket cape behind the shoulders: plaid pixel wings peeking out on both sides
    const c = Math.max(4, Math.round(size / 36)), cy = r.y + size * 0.02
    x.save(); x.globalAlpha = clamp(ok * 2)
    for (const sd of [-1, 1]) for (let j = 0; j < 9; j++) for (let i = 0; i < 4; i++) {
      const px = r.x + sd * (size * 0.36 + i * c) - (sd < 0 ? c : 0), py = cy + j * c - 2 * c + i * c * 0.6
      x.fillStyle = (i + j) % 3 === 0 ? PLAID.C : (i + j) % 2 ? PLAID.A : PLAID.B
      x.fillRect(Math.round(px), Math.round(py), c, c)
    }
    x.restore()
  }
  function veil(t, r, size, ok, lift = 0) {
    // the mystery veil: translucent lavender gauze with drifting sparkles, eyes peeking through
    x.save(); x.globalAlpha = 0.5 * clamp(ok * 2) * (1 - lift)
    const c = Math.max(4, Math.round(size / 30)), top = r.top - c * 2
    for (let j = 0; j < 30; j++) {
      const yy = top + j * c, k = j / 30, hw = size * (0.14 + 0.42 * Math.min(1, k * 1.6)) + Math.sin(j * 0.8 + t * 2) * c * 0.5
      x.fillStyle = j % 4 === 0 ? '#e7d8ff' : VEIL
      x.fillRect(Math.round(r.x - hw), Math.round(yy), Math.round(2 * hw), c)
    }
    x.restore()
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.5 + i * 0.21) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9 * clamp(ok * 2)
      drawPixelStar(x, r.x + Math.cos(i * 2.3) * size * 0.4, r.y + Math.sin(i * 1.7) * size * 0.3 - ph * 30, 16, 2, '#fff', '#e7d8ff')
      x.restore()
    }
  }
  function snacks(t, rT, rS, ok) {
    // the bag by Taurus; the last bun gets tugged, then split
    drawBits(x, SNACK, SNACK_C, Math.round(rT.x - 175), Math.round(rT.y + 40), 11, { alpha: clamp(ok * 2) })
    const rp = ease.outCubic(prog(t, T.reach, T.reach + 0.4))
    if (rp <= 0) return
    const mid = (rT.x + rS.x) / 2, WALK_Y = rT.y + 30
    const tug = t > T.tug[0] && t < T.tug[1] ? Math.sin((t - T.tug[0]) * 9) * 26 : 0
    if (t < T.split) {
      drawBits(x, BUN, BUN_C, Math.round(lerp(rT.x - 170, mid, rp) + tug), Math.round(lerp(WALK_Y - 10, WALK_Y - 40, rp)), 11, { alpha: clamp(ok * 2) })
      if (t > T.tug[0]) mark(x, t, '!', Math.round(mid + tug), WALK_Y - 140, T.tug[0], 0.8, 8)
      return
    }
    const sp = ease.outBack(prog(t, T.split, T.split + 0.4)), hp = ease.inOutCubic(prog(t, T.hand, T.hand + 0.5))
    drawBits(x, HALF, BUN_C, Math.round(mid - 30 - sp * 60 - hp * 40), Math.round(WALK_Y - 40), 11, { alpha: clamp(ok * 2) })
    drawBits(x, HALF, BUN_C, Math.round(mid + 30 + sp * 60 + hp * 40), Math.round(WALK_Y - 40), 11, { alpha: clamp(ok * 2), flip: true })
    sparkles(x, t, mid, WALK_Y - 40, T.split, 8, 90, 2, [GOLD, BONE, PINK])
  }
  function xoFloat(t, cx, cy) {
    for (let i = 0; i < 10; i++) {
      const born = T.xo + i * 0.2, p = (t - born) / 1.5
      if (p <= 0 || p >= 1 || born > T.out[0] - 0.4) continue
      const side = ((i * 37) % 7) / 6 - 0.5
      drawBits(x, i % 2 ? OBM : XBM, { X: i % 3 ? PINK : GOLD }, Math.round(cx + side * 420 + Math.sin(p * 6 + i) * 16), Math.round(cy - 40 - p * 300), 8, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const tp = pop01(t, T.tIn, 0.38, 2) * ok, sp = pop01(t, T.sIn, 0.38, 2) * ok
    const dyL = LOW * lowK(t)
    const lean = t > T.hand ? 26 * ease.inOutCubic(prog(t, T.hand, T.hand + 0.5)) : 0
    const tug = t > T.tug[0] && t < T.split ? Math.sin((t - T.tug[0]) * 9) * 0.05 : 0
    const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
    const proud = t > T.proud && t < T.reach ? -0.05 : 0
    // Taurus's cape goes behind it
    const pre = { x: TAU0.x + lean, y: TAU0.y + dyL, top: TAU0.y + dyL - TAU0.size / 2 }
    cape(pre, TAU0.size * tp, tp)
    const rT = drawStarChar(x, TAU0.x + lean, TAU0.y + dyL, TAU0.size, t, { color: TAU_.color, glyph: TAU_.glyph, ...tauState(t), hops: TAU_HOPS, pop: tp, seed: 5, squash: gasp + proud + tug, glow: 1.1 + (t > T.proud && t < T.reach ? 0.35 : 0) })
    const rS = drawStarChar(x, SCO0.x - lean, SCO0.y + dyL, SCO0.size, t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), hops: SCO_HOPS, pop: sp, seed: 11, squash: -tug, glow: 0.9 })
    veil(t, rS, SCO0.size * sp, sp)
    snacks(t, rT, rS, ok)
    mark(x, t, '!!', rT.x + 40, rT.top - 30, T.gasp - 0.05, 0.8, 9)
    sparkles(x, t, rT.x, rT.y, T.proud, 10, 210, 1, [GOLD, BONE, TAU_.color])
    if (t > T.l1 && t < T.laugh[1] + 0.4) floatHearts(x, t, rT.x, rT.y, T.l1 + 0.1, T.laugh[0], 1, 7, 200)
    if (t > T.xo) xoFloat(t, (rT.x + rS.x) / 2, rT.y - 60)
    if (t > T.hearts) floatHearts(x, t, (rT.x + rS.x) / 2, rT.y - 40, T.hearts, T.out[0] - 0.3, 6, 6, 200)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      x.drawImage(set, 0, 0)
      drawGhostCameo(x, t, GHOST)        // pops up out of the barrel
      if (t < T.out[1] + 0.02) { drawHerd(t); drawStars(t) }
      else drawHerd(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.78 (H0 → H1) and 12.68 (box shut → the last line). cardfx keeps the 12.68 flip.
const CUTS = [5.78, { t: 12.68, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 1, 0.14, 0, 0.026), ['pop', T.h0 + 0.26, 1174.66, 0.045, 0], ['pop', T.h0 + 0.38, 1318.51, 0.04, 0],
  ['pop', T.tIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.sIn + 0.05, 739.99, 0.035, 0.3],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.herd + 0.4 + i * 0.42).toFixed(3), 0.012 + (i % 2) * 0.006]),   // hooves on brick
  ['tick', T.see, 0.025], ['pop', T.gasp, 440, 0.04, -0.2], ['pop', T.gasp + 0.08, 523.25, 0.035, -0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [TAU_TAG]: 587.33 } }),
  ['pluck', T.l1 + 0.2, 1174.66, 0.04, 0.5, -0.2], ['glitter', T.l1 + 0.1, T.l1 + 0.6],
  ...[3.5, 3.72, 3.94, 4.16, 4.38].map((tt, i) => ['pop', tt, NOTE[(i * 2) % 7] * 1.5, 0.022, 0.3]),   // the veiled laugh
  ...wordPops(T.h1, 3, 0.07, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['bell', T.proud, 1318.51, 0.03, 1.2, -0.2], ['glitter', T.proud, T.proud + 0.4],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.6],
  ['whoosh', T.reach, 0.35, 0.025], ['tick', T.tug[0], 0.03], ['tick', T.tug[0] + 0.35, 0.03], ['tick', T.tug[0] + 0.7, 0.03], ['tick', T.tug[0] + 1.05, 0.03],
  ['pop', T.split, 1318.51, 0.045, 0], ['tick', T.split + 0.02, 0.04], ['glitter', T.split, T.split + 0.4], ['pluck', T.hand, 1174.66, 0.04, 0.6, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.xo + i * 0.4).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.014, ((i % 3) - 1) * 0.3]),
  ['bell', T.hearts, 1760, 0.025, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
