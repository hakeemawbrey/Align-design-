// st4bayou (20 s vertical Align ad, Star Talk season 4 · EP 005, thread F: Virgo × Pisces) · story 0–15.6.
//   0.00–6.10  "Buffalo Bayou | at *night.*"  A generic Houston skyline over dark water, its lit windows shimmering in the
//              reflection; trees and lamps glide past on the near bank. The ♍ Virgo star (clipboard under its arm) and
//              the ♓ Pisces star walk the trail side by side. Pisces gazes at Virgo… and its daydream bubble fills again:
//              the ring, two cats, the cottage. Drop (3.38): ♍ VIRGO STAR: "you're doing the wedding thing again."
//              Virgo hops and taps the bubble with its pencil: POP.
//   6.10–9.10  "Dreamer, | meet *planner.*"  ♓ PISCES STAR: "sorry. i'm *here*." (bashful, then happy)
//   9.10–12.1  "Quiet is a | *date*, too."  THE STARS: "slow walks beat loud bars." Both happy; Pisces bumps Virgo.
//              The ghost leans out from behind a tree on the bank (8.9–10.25).
//   12.2 cut → "Walk. Talk. | *Repeat.*"  Still walking, heart-eyed, a word per step. Out by 15.45.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 5
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', ACC = '#b9b3ff', MINT = '#7dffb0'
const PIS = signStar('pisces'), VIR = signStar('virgo')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, walkIn: [0.2, 1.4], gaze: 1.5, bubble: 1.75, ring: 2.1, cats: 2.5, house: 2.9,
  open: 3.16, l1: 3.38, tap: 5.0, pop: 5.18, h0Out: [5.95, 6.12],
  l2: 6.3, h1: 6.22, h1Land: 6.62, bashful: 6.3, smile: 7.4, h1Out: [8.92, 9.08],
  l3: 9.1, h1b: 9.12, h1bLand: 9.5, bump: 10.4, ghost: 8.9, close: 12.05, h1bOut: [11.9, 12.08],
  cut: 12.15, h2: 12.2, steps: [12.2, 12.75, 13.3], heart: 13.6, h2Out: [15.15, 15.4], out: [15.05, 15.45],
}
const VIR_TAG = `${VIR.glyph} VIRGO STAR`, PIS_TAG = `${PIS.glyph} PISCES STAR`, SKY_TAG = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: VIR_TAG, color: VIR.color, text: "you're doing the *wedding thing* again." },
  { t: T.l2, speaker: PIS_TAG, color: ACC, text: "sorry. i'm *here*." },
  { t: T.l3, speaker: SKY_TAG, text: 'slow walks beat *loud bars*.' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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
// the daydream (as in starpisces)
const RING = ['....DDD....', '...DWWWD...', '....DDD....', '...GGGGG...', '..GG...GG..', '.GG.....GG.', '.G.......G.', '.GG.....GG.', '..GG...GG..', '...GGGGG...']
const RING_C = { D: '#8fe3ff', W: '#ffffff', G: '#f2c75c' }
const CATS = ['O...O...K...K.', 'OO.OO...KK.KK.', 'OOOOO...KKKKK.', 'OeOeO...KeKeK.', 'OOpOO...KKpKK.', '.OOO.....KKK..', 'OOOOO...KKKKK.', 'OOOOOO..KKKKKK', 'OOOOO.O.KKKKK.']
const CATS_C = { O: '#f2a65a', K: '#5b5470', e: '#1b1236', p: '#ff8fb1' }
const HOUSE = ['......RR.....', '.....RRRR.c..', '....RRRRRRc..', '...RRRRRRRR..', '..RRRRRRRRRR.', '.RRRRRRRRRRRR', '..WWWWWWWWW..', '..WbbWWWbbW..', '..WbbWWWbbW..', '..WWWddWWWW..', '..WWWddWWWW..', 'gggggddgggggg']
const HOUSE_C = { R: '#e8445a', c: '#9a8a8a', W: '#fbf1dc', b: '#8fd3ff', d: '#8a5a34', g: '#4fbf6a' }
// Virgo's clipboard (side-on, tucked under its arm) + pencil
const CLIP = ['..ss..', 'BBssBB', 'BPPPPB', 'BPkPPB', 'BPPPPB', 'BPkPPB', 'BPPPPB', 'BPkPPB', 'BBBBBB']
const CLIP_C = { s: '#c9cfd8', B: '#b0773f', P: '#fbf6ea', k: '#4fbf6a' }
const PENCIL = ['y', 'Y', 'Y', 'Y', 'Y', 'p', 'k']
const PENCIL_C = { y: '#ff8fb1', Y: '#f7c948', p: '#f1e3c4', k: INK }

// ── layout
const VIR0 = { x: 360, y: 1210, size: 250 }
const PIS0 = { x: 700, y: 1214, size: 260 }
const HORIZON = 920, BANK = 1210, PATH = 1300
const BUB = { x: 600, y: 700, w: 600, h: 270 }
const SPEED = 70                                   // near-bank px/s (the walk)
// generic skyline across the far bank (wider than the frame; slow parallax)
const TOWERS = (() => {
  const r = rng(505), out = []
  let xx = -200
  while (xx < 1500) {
    const w = 52 + Math.floor(r() * 5) * 14
    const mid = Math.exp(-((((xx + w / 2) - 620) / 300) ** 2))
    const h = Math.round((60 + r() * 120 + mid * (200 + r() * 160)) / 12) * 12
    out.push({ x: xx, w, h, roof: Math.floor(r() * 4), seed: Math.floor(r() * 9999) })
    xx += w + 4 + Math.floor(r() * 3) * 8
  }
  return out
})()
const treeX = (t, k) => 960 + SPEED * (T.ghost + 0.6 - t) + k * 560
const walkStep = (t, ph = 0) => Math.abs(Math.sin((t * 2.4 + ph) * Math.PI))

function virState(t) {
  if (t < T.gaze) return { mood: 'happy', look: [1, 0] }
  if (t < T.l1 - 0.1) return { mood: 'neutral', look: [1, -1] }
  if (t < T.pop + 0.1) return { mood: 'eyeroll' }
  if (t < T.smile) return { mood: 'neutral', look: [1, 0] }
  if (t < T.heart) return { mood: 'happy', blush: t > T.bump ? 0.9 : 0 }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.gaze) return { mood: 'happy' }
  if (t < T.pop) return { mood: 'sparkle', look: [-0.4, -1], blink: false }
  if (t < T.bashful) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.smile) return { mood: 'neutral', look: [-1, 0], blush: 0.8 }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
const VIR_HOPS = [...talkHops(LINES, VIR_TAG, { cps: CPS }), T.tap, T.smile + 0.1, T.bump + 0.1, ...T.steps.map(s => s + 0.05)]
const PIS_HOPS = [T.gaze, T.ring + 0.05, T.house + 0.05, T.pop + 0.05, ...talkHops(LINES, PIS_TAG, { cps: CPS }), T.bump, ...T.steps]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Buffalo Bayou | at *night.*', { top: 196, size: 112, accentSize: 176, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Dreamer, | meet *planner.*', { top: 196, size: 112, accentSize: 168, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: VIR.color })
  const H1b = popText(root, 'Quiet is a | *date,* too.', { top: 196, size: 112, accentSize: 168, at: T.h1b, gap: 0.1, late: 0, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Walk. Talk. | *Repeat.*', { top: 200, size: 132, accentSize: 200, at: T.h2, gap: 0.55, late: 1, lateAt: T.steps[2], wobble: true, accentColor: MINT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
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
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.17, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 420 + Math.sin(p * 7 + i) * 18), Math.round(cy - 40 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the bayou: skyline, its reflection, the water, the near bank and trail
  function drawBayou(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const off = -t * 8
    // skyline
    for (const tw of TOWERS) {
      const tx = Math.round(tw.x + off), top = HORIZON - tw.h
      if (tx > 1100 || tx + tw.w < -20) continue
      x.fillStyle = '#2a2156'; x.fillRect(tx - 3, top - 3, tw.w + 6, tw.h + 3)
      x.fillStyle = '#151034'; x.fillRect(tx, top, tw.w, tw.h)
      x.fillStyle = '#1d1645'; x.fillRect(tx, top, Math.round(tw.w * 0.3), tw.h)
      if (tw.roof === 2) { x.fillStyle = '#2a2156'; x.fillRect(tx + tw.w / 2 - 3, top - 54, 6, 54); if (Math.sin(t * 3 + tw.seed) > 0.2) { x.fillStyle = '#ff5c6e'; x.fillRect(tx + tw.w / 2 - 5, top - 62, 10, 10) } }
      if (tw.roof === 3) { x.fillStyle = '#151034'; for (let k = 0; k < 4; k++) x.fillRect(tx + k * 6, top - (4 - k) * 8, tw.w - k * 12, 8) }
      const r = rng(tw.seed)
      for (let wy = top + 12; wy < HORIZON - 12; wy += 20) for (let wx = tx + 8; wx < tx + tw.w - 10; wx += 14) {
        const v = r(); if (v > 0.38) continue
        x.fillStyle = v < 0.08 ? '#ffe9b0' : v < 0.2 ? '#f7cf68' : '#c99a4a'; x.fillRect(wx, wy, 7, 9)
      }
    }
    // water
    const g = x.createLinearGradient(0, HORIZON, 0, BANK)
    g.addColorStop(0, '#0e1030'); g.addColorStop(1, '#070818')
    x.fillStyle = g; x.fillRect(0, HORIZON, 1080, BANK - HORIZON)
    // the reflection: mirrored towers, rows shimmering sideways, windows as streaks
    for (const tw of TOWERS) {
      const tx = tw.x + off
      if (tx > 1100 || tx + tw.w < -20) continue
      const depth = Math.min(tw.h * 0.8, BANK - HORIZON - 10)
      for (let j = 0; j < depth; j += 8) {
        const k = j / depth, sh = Math.round(Math.sin(t * 2.2 + j * 0.09 + tw.seed) * (2 + k * 8))
        x.globalAlpha = a * (0.45 - 0.35 * k)
        x.fillStyle = '#231d52'; x.fillRect(Math.round(tx + sh), HORIZON + j, tw.w, 6)
        if ((j / 8 + tw.seed) % 3 === 0) { x.globalAlpha = a * (0.55 - 0.45 * k) * (0.6 + 0.4 * Math.sin(t * 3 + j)); x.fillStyle = '#f7cf68'; x.fillRect(Math.round(tx + 8 + sh), HORIZON + j + 2, tw.w - 16, 3) }
      }
    }
    x.globalAlpha = a
    // a few glints on the water
    for (let k = 0; k < 14; k++) {
      const gx2 = ((k * 173 - t * 30) % 1180 + 1180) % 1180 - 50, gy = HORIZON + 30 + (k * 53) % (BANK - HORIZON - 60)
      if (Math.sin(t * 4 + k * 2.1) > 0.3) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(Math.round(gx2), gy, 14 + (k % 3) * 8, 3) }
    }
    // near bank: grass edge, the trail, the low wall
    x.fillStyle = INK; x.fillRect(0, BANK - 6, 1080, 8)
    x.fillStyle = '#16302a'; x.fillRect(0, BANK, 1080, 60)
    x.fillStyle = '#1f4234'; for (let i = 0; i < 1100; i += 12) { const xx = ((i - t * SPEED) % 1104 + 1104) % 1104 - 12, h = 6 + ((i * 7) % 5) * 3; x.fillRect(Math.round(xx), BANK - h + 4, 6, h) }
    x.fillStyle = '#3a3658'; x.fillRect(0, BANK + 60, 1080, 120)
    x.fillStyle = '#4a4670'; for (let i = 0; i < 1200; i += 90) { const xx = ((i - t * SPEED) % 1170 + 1170) % 1170 - 90; x.fillRect(Math.round(xx), BANK + 116, 46, 6) }
    x.fillStyle = '#122620'; x.fillRect(0, BANK + 180, 1080, 1920 - BANK - 180)
    x.restore()
  }
  // trees and lamps on the near bank (behind the walkers)
  function drawTreesLamps(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    for (let k = -2; k <= 2; k++) {
      const tx = treeX(t, k)
      if (tx < -200 || tx > 1280) continue
      // trunk
      x.fillStyle = INK; x.fillRect(Math.round(tx) - 4, BANK - 210, 48, 220)
      x.fillStyle = '#4a3220'; x.fillRect(Math.round(tx), BANK - 206, 40, 216)
      x.fillStyle = '#5a3e28'; x.fillRect(Math.round(tx), BANK - 206, 12, 216)
      // canopy (cells)
      const c = 14
      for (let j = -9; j <= 4; j++) for (let i = -9; i <= 10; i++) {
        const u = i / 9.5, v = j / 7
        if (u * u + v * v > 1 + 0.15 * Math.sin(i * 1.3 + j * 2.1 + k)) continue
        x.fillStyle = (u + v < -0.6) ? '#2f6a4e' : (u - v > 0.8) ? '#123020' : '#1d4a36'
        x.fillRect(Math.round(tx + 20 + i * c), BANK - 290 + j * c, c, c)
      }
      // a lamp post halfway to the next tree
      const lx = Math.round(tx + 280)
      x.fillStyle = INK; x.fillRect(lx - 5, BANK - 240, 10, 250)
      x.fillStyle = '#4a4d6e'; x.fillRect(lx - 2, BANK - 236, 4, 246)
      x.fillStyle = INK; x.fillRect(lx - 18, BANK - 262, 36, 28)
      x.fillStyle = '#ffe9b0'; x.fillRect(lx - 12, BANK - 256, 24, 18)
      const lg = x.createRadialGradient(lx, BANK - 246, 0, lx, BANK - 246, 110)
      lg.addColorStop(0, 'rgba(255,220,150,0.28)'); lg.addColorStop(1, 'rgba(255,220,150,0)')
      x.fillStyle = lg; x.fillRect(lx - 110, BANK - 356, 220, 220)
    }
    x.restore()
  }

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
    const dots = [[0.25, 14], [0.5, 20], [0.75, 28]]
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
    const items = [[RING, RING_C, -190, T.ring], [CATS, CATS_C, 0, T.cats], [HOUSE, HOUSE_C, 190, T.house]]
    for (const [bm, cols, ox, t0] of items) {
      const p = pop01(t, t0, 0.3, 2.6)
      if (p <= 0.01) continue
      drawBits(x, bm, cols, ox, 18 + Math.sin(t * 3 + ox) * 4, 9 * p, { rot: Math.sin(t * 2 + ox) * 0.05 })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const scene = clamp(prog(t, 0.05, 0.45)) * outK(t, T.out)
      const LOWY = 150 * ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))
      x.save(); x.translate(0, LOWY)
      drawBayou(t, scene)
      drawTreesLamps(t, scene)
      // the ghost leans out from behind a tree trunk (left edge), moving with the bank
      drawGhostCameo(x, t, { x: Math.round(treeX(t, 0)) - 4, y: BANK - 110, at: T.ghost, dur: 1.35, from: 'right', cell: 3 })
      const ok = popOut(t, T.out)
      if (ok > 0) {
        const wi = ease.outCubic(prog(t, ...T.walkIn))
        const vp = pop01(t, T.walkIn[0], 0.38, 2.0) * ok, pp = pop01(t, T.walkIn[0] + 0.1, 0.38, 2.0) * ok
        const vs = walkStep(t), ps = walkStep(t, 0.5)
        const bumpK = t > T.bump && t < T.bump + 0.5 ? Math.sin(Math.PI * prog(t, T.bump, T.bump + 0.5)) : 0
        const vx = lerp(-140, VIR0.x, wi) + bumpK * 14, px = lerp(-140 - 300, PIS0.x, wi) - bumpK * 40
        // Virgo's clipboard (behind it) and pencil
        const rV = drawStarChar(x, vx, VIR0.y - vs * 14, VIR0.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: VIR_HOPS, pop: vp, seed: 2, glow: 1.0, squash: vs * 0.03 - bumpK * 0.05 })
        drawBits(x, CLIP, CLIP_C, Math.round(rV.x - VIR0.size * 0.42), Math.round(rV.y + VIR0.size * 0.12), VIR0.size * vp / 30, { rot: -0.25, alpha: clamp(vp * 2) })
        const tapK = t > T.tap - 0.25 && t < T.pop + 0.35 ? Math.sin(Math.PI * prog(t, T.tap - 0.25, T.pop + 0.35)) : 0
        drawBits(x, PENCIL, PENCIL_C, Math.round(rV.x + VIR0.size * 0.45 + tapK * 120), Math.round(rV.y - VIR0.size * 0.05 - tapK * 280), VIR0.size * vp / 30, { rot: 0.5 + tapK * 0.5, alpha: clamp(vp * 2) })
        const rP = drawStarChar(x, px, PIS0.y - ps * 14, PIS0.size, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, pop: pp, seed: 6, glow: 1.2, squash: ps * 0.03 })
        if (t < T.cut) drawBubble(t, { x: rP.x - 40, y: rP.top - 10 })
        sparkles(t, BUB.x, BUB.y, T.pop, 14, 260, 1, [ACC, PINK, GOLD, BONE])
        sparkles(t, (rV.x + rP.x) / 2, rP.y - 40, T.smile, 10, 240, 3, [GOLD, VIR.color, PIS.color, BONE])
        if (t > T.heart) floatHearts(t, (rV.x + rP.x) / 2, rP.y - 60, T.heart, T.out[0], 5, 6)
      }
      x.restore()
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.18 (H0 out → "Dreamer, meet planner.") and 12.15 (box shut → "Walk. Talk. Repeat.").
const CUTS = [6.18, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.walkIn[0] + 0.05, 739.99, 0.035, -0.3], ['pop', T.walkIn[0] + 0.15, 659.25, 0.03, -0.2],
  ['glitter', T.gaze, T.gaze + 0.4], ['pop', T.bubble + 0.1, 880, 0.03, 0.2],
  ['pluck', T.ring, 1318.51, 0.035, 0.6, -0.3], ['pluck', T.cats, 1174.66, 0.035, 0.6, 0], ['pluck', T.house, 1567.98, 0.035, 0.6, 0.3], ['bell', T.house + 0.1, 1760, 0.02, 1.0, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.tap - 0.2, 0.3, 0.025], ['pop', T.pop, 1318.51, 0.06, 0.2], ['tick', T.pop, 0.06], ['glitter', T.pop, T.pop + 0.45],
  ...wordPops(T.h1, 2, 0.1, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pluck', T.smile, 1174.66, 0.04, 0.6, 0], ['bell', T.smile + 0.05, 1318.51, 0.025, 1.0, 0],
  ['pop', T.ghost + 0.1, 1318.51, 0.018, 0.4],
  ...wordPops(T.h1b, 4, 0.1, 1, 0.025),
  ['pop', T.bump, 659.25, 0.035, 0], ['tick', T.bump + 0.05, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...T.steps.map((s, i) => ['pop', s, [1174.66, 1318.51, 1567.98][i], 0.05, 0]), ['pluck', T.steps[2], 1174.66, 0.05, 0.7, 0], ['glitter', T.steps[2], T.steps[2] + 0.5],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
