// st4swimhole (EP 047 · 15 s vertical · Star Talk season 4, drop 5 "Road trip", thread F) · story 0–10.6, then the
// shared end card (cta JOIN THE TEXAS BETA).
//   0.00–6.95  "A Hill Country | *swimming hole.*"  A limestone ledge over a spring-fed pool under bald cypress. The yellow ♊
//              Gemini star (nervous, looking down) and the purple ♐ Sagittarius star (thrilled; its backpack set down on
//              the rock) count two hops and JUMP. Two splashes. They bob up wide-eyed, shivering, snowflakes popping round
//              them. GEMINI: "it's FREEZING."  SAG (grinning): "we said we'd try new things."
//   6.95 cut → "Opposite signs. | Same *splash.*"  Warm now: floating, happy. THE STARS: "the cold part passes. the *memory*
//              stays." A pixel snapshot of the splash pops up between them and stays.
//   8.70       "Every first | is a little *cold.*"  (the last line), both heart-eyed. Everything pops out by 10.45.
// Easter eggs: seed constellation (EP 47) top-left, "EP 047" in the frame, the ghost leans out from behind the ledge.
// HELLO TEXAS: this last line is the E. One canvas, DOM type + the box on top. Pure f(t).
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

export const DURATION = 15
export const EP = 47
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GEM = signStar('gemini'), SAG = signStar('sagittarius')
const GEM_TAG = `${GEM.glyph} GEMINI STAR`, SAG_TAG = `${SAG.glyph} SAG STAR`, SKY_TAG = 'THE STARS'
const ICE = '#8fe3ff', SAGL = '#c9a6ff'

const T = {
  h0: 0.12, h0Out: [6.6, 6.85],
  in: 0.3, hop1: 0.85, hop2: 1.25, jump: [1.62, 2.12], splash: 2.12, surface: 2.3,
  l1: 2.32, l2: 4.45, grin: 4.5, cold: [2.3, 6.9],
  cut: 6.95, h1: 7.1, h1Land: 7.46, h1Out: [8.42, 8.62], l3: 7.08, snap: 8.0,
  ghost: 4.9,
  h2: 8.7, h2Land: 9.12, hearts: 9.2, close: 10.18, h2Out: [10.2, 10.42], out: [10.08, 10.45],
}
const LINES = [
  { t: T.l1, speaker: GEM_TAG, color: GEM.color, text: "it's *FREEZING.*" },
  { t: T.l2, speaker: SAG_TAG, color: SAGL, text: "we said we'd try *new* things." },
  { t: T.l3, speaker: SKY_TAG, text: 'the cold part passes. the *memory* stays.' },
]
const CPS = 34

const PACK = ['...SSSSSS...', '..S......S..', '.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PppppppppppP', 'PPPPPPPPPPPP', 'PPPFFFFFFPPP', 'PPPFffffFPPP', 'PPPFFFFFFPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const PACK_C = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
const FLAKE = ['..X..', 'X.X.X', '.XXX.', 'X.X.X', '..X..']

// ── layout
const LEDGE = { x1: 430, top: 860, bot: 1060 }
const WATER_Y = 1080
const GEM_L = { x: 150, y: 790, size: 170 }, SAG_L = { x: 320, y: 790, size: 176 }
const GEM_W = { x: 440, y: 1210, size: 250 }, SAG_W = { x: 720, y: 1215, size: 256 }
const SNAP = { x: 580, y: 930 }
const GHOST = { x: LEDGE.x1, y: 990, at: T.ghost, dur: 1.4, from: 'left', cell: 3 }

function gemState(t) {
  if (t < T.jump[0]) return { mood: 'wide', look: [1, 1], blink: false }      // that's… high
  if (t < T.surface) return { mood: 'squint' }
  if (t < T.l2 + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.cut) return { mood: 'squint', look: [1, 0] }
  if (t < T.snap) return { mood: 'happy' }
  if (t < T.hearts) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'heart' }
}
function sagState(t) {
  if (t < T.jump[0]) return { mood: 'happy' }
  if (t < T.surface) return { mood: 'squint' }
  if (t < T.grin) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.snap) return { mood: 'happy' }
  if (t < T.hearts) return { mood: 'sparkle', look: [-1, -1] }
  return { mood: 'heart' }
}
const GEM_HOPS = [T.hop1, T.hop2, T.l1, T.l1 + 0.3, T.cut + 0.1, T.h2Land]
const SAG_HOPS = [T.hop1, T.hop2, T.l2, T.l2 + 0.4, T.l2 + 0.8, T.snap, T.hearts]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'A Hill Country | *swimming hole.*', { top: 214, size: 108, accentSize: 160, at: T.h0, gap: 0.1, accentColor: ICE, wobble: true, late: 2, lateAt: T.h0 + 0.36, lateGap: 0.12, fit: true })
  const H1 = popText(root, 'Opposite signs. | Same *splash.*', { top: 214, size: 108, accentSize: 160, at: T.h1, gap: 0.07, late: 1, lateAt: T.h1Land, wobble: true, accentColor: SAGL, fit: true })
  const H2 = popText(root, 'Every first | is a little *cold.*', { top: 214, size: 120, accentSize: 176, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ICE, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the static set: limestone ledge, far bank, cypress
  const set = document.createElement('canvas'); set.width = W; set.height = 1920
  const sx = set.getContext('2d')
  {
    const c = 10, s = sx
    const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h >>> 8) / 16777216 }
    // far bank: low limestone + scrub, across the back of the pool
    for (let xx = 0; xx < W; xx += c) {
      const hgt = 70 + Math.round(18 * Math.sin(xx * 0.011) + 10 * Math.sin(xx * 0.037))
      for (let y = WATER_Y - hgt; y < WATER_Y; y += c) {
        const top = y < WATER_Y - hgt + 3 * c
        s.fillStyle = top ? (hash(xx / c, y / c) < 0.5 ? '#2f5a3a' : '#24472f') : (Math.floor(y / 20) % 2 ? '#8a8068' : '#7a705a')
        s.fillRect(xx, y, c, c)
      }
    }
    // the ledge (left): layered limestone shelves
    for (let y = LEDGE.top; y < 1920; y += c) {
      const k = (y - LEDGE.top) / 200
      const wdt = y < LEDGE.bot ? LEDGE.x1 - Math.round(8 * Math.sin(y * 0.05)) : lerp(LEDGE.x1, 160, clamp((y - LEDGE.bot) / 140))
      for (let xx = 0; xx < wdt; xx += c) {
        const shelf = Math.floor((y - LEDGE.top) / 40)
        const lip = (y - LEDGE.top) % 40 < c
        let col = lip ? '#e9dfc2' : shelf % 2 ? '#c9b994' : '#bba985'
        if (hash(xx / c, y / c) > 0.9) col = '#a8966f'
        if (xx > wdt - c) col = '#8a7a58'
        s.fillStyle = col; s.fillRect(xx, y, c, c)
      }
      void k
    }
    // a little moss on the ledge top
    for (let xx = 0; xx < LEDGE.x1 - 20; xx += c) if (hash(xx, 3) < 0.4) { s.fillStyle = '#4f8a4a'; s.fillRect(xx, LEDGE.top - c, c, c) }
    // bald cypress: right bank, roots in the water, foliage high
    const tx = 980, top = 520
    for (let y = top + 80; y < WATER_Y + 20; y += c) {
      const k = (y - top) / (WATER_Y - top), wdt = lerp(30, 110, k ** 4)
      s.fillStyle = '#4a3a2e'; s.fillRect(Math.round((tx - wdt / 2) / c) * c, y, Math.round(wdt / c) * c, c)
      s.fillStyle = '#6a5442'; s.fillRect(Math.round((tx - wdt / 2) / c) * c, y, c, c)
    }
    const blobs = [[0, 0, 130], [-90, 80, 100], [70, 120, 100], [-30, 210, 100], [-120, 200, 70]]
    for (let y = top - 150; y < top + 330; y += c) for (let xx = tx - 260; xx < W + 20; xx += c) {
      let on = false
      for (const [bx, by, br] of blobs) if ((xx - tx - bx) ** 2 + ((y - top - by) * 1.15) ** 2 < br * br) { on = true; break }
      if (!on) continue
      const h = hash(Math.round(xx / c), Math.round(y / c))
      s.fillStyle = h < 0.12 ? '#3c7a52' : h < 0.55 ? '#1f4a36' : '#173a2c'; s.fillRect(xx, y, c, c)
    }
  }

  function drawWater(t, warm) {
    const g = x.createLinearGradient(0, WATER_Y, 0, 1920)
    g.addColorStop(0, warm > 0 ? '#3fd6c2' : '#36c6d0'); g.addColorStop(0.3, '#1a8c9a'); g.addColorStop(1, '#073848')
    x.fillStyle = g; x.fillRect(0, WATER_Y, W, 1920 - WATER_Y)
    // caustic shimmer
    x.save()
    for (let j = 0; j < 26; j++) {
      const yy = WATER_Y + 10 + j * 18 + j * j * 0.5
      if (yy > 1920) break
      x.fillStyle = j % 2 ? 'rgba(220,255,250,0.16)' : 'rgba(143,227,255,0.14)'
      for (let k = 0; k < 6; k++) {
        const xx = ((k * 211 + j * 83 + t * (10 + j)) % 1240) - 80
        x.fillRect(Math.round(xx), Math.round(yy), 20 + j, 3)
      }
    }
    x.restore()
    // pebbles visible on the bottom (clear spring water)
    x.save(); x.globalAlpha = 0.25
    for (let k = 0; k < 14; k++) { x.fillStyle = k % 2 ? '#cfc4a0' : '#9a8f72'; x.fillRect(80 + (k * 137) % 920, 1300 + (k * 53) % 120, 16 + (k % 3) * 6, 10) }
    x.restore()
  }
  /** a ring ripple around (cx, cy) from t0 */
  function ripple(t, cx, cy, t0, R = 220) {
    for (let r = 0; r < 3; r++) {
      const p = prog(t, t0 + r * 0.18, t0 + r * 0.18 + 1.2)
      if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = (1 - p) * 0.7; x.strokeStyle = '#e8fffb'; x.lineWidth = 6
      x.beginPath(); x.ellipse(cx, cy, 40 + p * R, (40 + p * R) * 0.22, 0, 0, Math.PI * 2); x.stroke(); x.restore()
    }
  }
  function splash(t, cx, cy, t0, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 1.1) return
    for (let i = 0; i < 18; i++) {
      const a = -Math.PI / 2 + ((i / 17) - 0.5) * 2.2 + Math.sin(i * 7 + seed) * 0.15
      const v = 620 + ((i * 53 + seed) % 7) * 70
      const px = cx + Math.cos(a) * v * tt * 0.7, py = cy + Math.sin(a) * v * tt + 900 * tt * tt
      if (py > cy + 20) continue
      const s = 14 - (i % 3) * 3
      x.fillStyle = i % 3 ? '#e8fffb' : ICE; x.fillRect(Math.round(px), Math.round(py), s, s)
    }
    // the column
    const k = Math.sin(Math.PI * clamp(tt / 0.55))
    if (k > 0) { x.fillStyle = 'rgba(232,255,251,0.85)'; for (let j = 0; j < 6; j++) x.fillRect(Math.round(cx - 30 + j * 10), Math.round(cy - k * (120 + (j % 3) * 40)), 12, Math.round(k * (120 + (j % 3) * 40))) }
  }
  function snapshot(t, ok) {
    const p = pop01(t, T.snap, 0.4, 2.4) * ok
    if (p <= 0.01) return
    const cx = SNAP.x, cy = SNAP.y + Math.sin(t * 2.2) * 6, rot = -0.08 + 0.02 * Math.sin(t * 1.6)
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(p, p)
    x.fillStyle = INK; x.fillRect(-118, -128, 236, 256)
    x.fillStyle = '#fbf6ea'; x.fillRect(-110, -120, 220, 240)
    x.fillStyle = '#1b1236'; x.fillRect(-94, -104, 188, 170)
    x.fillStyle = '#36c6d0'; x.fillRect(-94, -10, 188, 76)
    x.fillStyle = '#c9b994'; x.fillRect(-94, -40, 60, 106)
    // two little stars mid-air + the splash
    drawPixelStar(x, -10, -60, 40, 2, GEM.color, '#fff6e6'); drawPixelStar(x, 40, -50, 40, 2, SAG.color, '#f0e6ff')
    x.fillStyle = '#e8fffb'; for (let k = 0; k < 7; k++) x.fillRect(-20 + k * 12, -18 - (k % 3) * 12, 10, 10 + (k % 3) * 12)
    x.fillStyle = '#b9b0c8'; x.fillRect(-60, 82, 120, 10)
    x.restore()
    sparkles(x, t, cx, cy, T.snap, 10, 170, 1, [GOLD, ICE, BONE])
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const warm = prog(t, T.cut, T.cut + 0.5)
    const jp = prog(t, ...T.jump)
    const pin = pop01(t, T.in, 0.36, 2) * ok, sin_ = pop01(t, T.in + 0.12, 0.36, 2) * ok
    // the backpack stays on the ledge
    drawBits(x, PACK, PACK_C, 380, LEDGE.top - 58, 9, { alpha: clamp(sin_ * 2) * ok, rot: -0.05 })
    const pos = (L, Wt, sp) => {
      if (t < T.jump[0]) return { ...L }
      if (t < T.surface) {
        const e = ease.inOutQuad(jp)
        return { x: lerp(L.x, Wt.x, e), y: lerp(L.y, Wt.y + 30, e) - Math.sin(Math.PI * Math.min(1, jp * 1.15)) * 260, size: lerp(L.size, Wt.size, e), under: t > T.splash }
      }
      const rise = ease.outBack(prog(t, T.surface, T.surface + 0.4))
      return { x: Wt.x, y: lerp(Wt.y + 150, Wt.y, rise), size: Wt.size * sp, rise }
    }
    const shiver = t > T.cold[0] && t < T.cold[1] ? Math.sin(t * 70) * 4 * (1 - warm) : 0
    const G = pos(GEM_L, GEM_W, 1), S = pos(SAG_L, SAG_W, 1)
    const rG = !G.under ? drawStarChar(x, G.x + shiver, G.y, G.size, t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: GEM_HOPS, pop: pin, seed: 2, glow: 1.1 }) : null
    const rS = !S.under ? drawStarChar(x, S.x - shiver, S.y, S.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, pop: sin_, seed: 6, glow: 1.1 }) : null
    // the water line in front of the floating stars (they sit half in the pool)
    if (t >= T.surface) {
      for (const P of [GEM_W, SAG_W]) {
        const wy = P.y + P.size * 0.18
        const g = x.createLinearGradient(0, WATER_Y, 0, 1920)
        g.addColorStop(0, warm > 0 ? '#3fd6c2' : '#36c6d0'); g.addColorStop(0.3, '#1a8c9a'); g.addColorStop(1, '#073848')
        x.save(); x.fillStyle = g
        const rows = 12, rh = P.size * 0.5 / rows
        for (let j = 0; j < rows; j++) { x.globalAlpha = 0.9 - 0.25 * (j / rows); const hw = P.size * (0.62 - 0.12 * Math.abs(Math.sin(j * 0.9 + t))); x.fillRect(Math.round(P.x - hw), Math.round(wy + j * rh), Math.round(2 * hw), Math.ceil(rh) + 1) }
        x.restore()
        x.fillStyle = 'rgba(232,255,251,0.8)'
        for (let k = 0; k < 9; k++) x.fillRect(Math.round(P.x - P.size * 0.55 + k * P.size * 0.13), Math.round(wy - 2 + Math.sin(t * 6 + k) * 3), Math.round(P.size * 0.08), 5)
      }
    }
    // splashes + ripples
    splash(t, GEM_W.x, GEM_W.y + 40, T.splash - 0.04, 1); splash(t, SAG_W.x, SAG_W.y + 40, T.splash + 0.04, 5)
    ripple(t, GEM_W.x, GEM_W.y + 46, T.splash); ripple(t, SAG_W.x, SAG_W.y + 46, T.splash + 0.06)
    if (t > T.cut) { ripple(t, GEM_W.x, GEM_W.y + 46, T.cut + 0.1, 160); ripple(t, SAG_W.x, SAG_W.y + 46, T.snap, 160) }
    // cold: snowflakes pop round them; !! on surfacing
    if (t > T.surface && t < T.cut) {
      for (let i = 0; i < 10; i++) {
        const ph = (t * 0.7 + i * 0.137) % 1, P = i % 2 ? SAG_W : GEM_W
        const fx = P.x + Math.cos(i * 2.4) * P.size * 0.7, fy = P.y - P.size * 0.2 + Math.sin(i * 1.7) * P.size * 0.4 - ph * 40
        drawBits(x, FLAKE, { X: i % 3 ? '#e8fffb' : ICE }, Math.round(fx), Math.round(fy), 5, { alpha: Math.sin(Math.PI * ph) * (1 - warm) })
      }
    }
    if (rG) mark(x, t, '!!', rG.x, rG.top - 34, T.surface + 0.1, 0.8, 10, '#fff1c8')
    if (rS) mark(x, t, '!!', rS.x, rS.top - 34, T.surface + 0.16, 0.8, 10, '#fff1c8')
    if (rG && rS && t > T.hearts) floatHearts(x, t, (rG.x + rS.x) / 2, rG.y - 20, T.hearts, T.out[0] - 0.2, 4, 7, 320)
    snapshot(t, ok)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      drawWater(t, prog(t, T.cut, T.cut + 0.5))
      x.drawImage(set, 0, 0)
      drawGhostCameo(x, t, GHOST)        // leans out from behind the ledge's edge
      if (t < T.out[1] + 0.02) drawStars(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.95 (the cold beat clears → warm, between SAG's line and THE STARS). 15 s → one cut.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.36, 1174.66, 0.045, 0], ['pop', T.h0 + 0.48, 1318.51, 0.04, 0],
  ['pop', T.in + 0.05, 739.99, 0.035, -0.3], ['pop', T.in + 0.17, 880, 0.035, -0.2],
  ['pop', T.hop1, 880, 0.04, -0.2], ['pop', T.hop2, 987.77, 0.045, -0.2],
  ['whoosh', T.jump[0], 0.5, 0.05], ['riser', T.jump[0], T.splash],
  ['boom', T.splash, 0.18], ['whoosh', T.splash, 0.6, 0.06], ['tick', T.splash + 0.02, 0.05], ['glitter', T.splash, T.splash + 0.6],
  ['pop', T.surface + 0.1, 1318.51, 0.04, -0.2], ['pop', T.surface + 0.16, 1567.98, 0.04, 0.2],
  ...talkCues(LINES, { cps: CPS, pitch: { [GEM_TAG]: 987.77, [SAG_TAG]: 739.99 } }),
  ['pop', T.ghost + 0.1, 1567.98, 0.012, -0.6],
  ...wordPops(T.h1, 3, 0.07, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['bell', T.cut + 0.1, 1318.51, 0.03, 1.4, 0],
  ['pop', T.snap, 1318.51, 0.04, 0], ['tick', T.snap + 0.02, 0.04], ['glitter', T.snap, T.snap + 0.4], ['pluck', T.snap + 0.1, 1567.98, 0.04, 0.6, 0],
  ...wordPops(T.h2, 5, 0.08, 1, 0.024), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['bell', T.hearts, 1760, 0.025, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
