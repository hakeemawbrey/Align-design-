// st4bbq (EP 055, 15 s vertical, Star Talk season 4, thread F: Aries × Libra) · story 0–10.6, then the end card.
//   0.00–4.70  "Texas BBQ | takes *hours.*"  A backyard pit at night under string lights and a wooden fence: an offset
//              smoker (barrel, firebox, chimney puffing smoke, a temperature dial). ♈ Aries, gloves on, taps and taps
//              beside it. ARIES: "is it ready *YET?*"  THE STARS: "brisket can't be *rushed*."
//   4.70–9.00  "Hour | *twelve.*"  Aries has slumped, sleepy. The lid swings open: the brisket, dark bark and a pink smoke
//              ring, steam curling. Aries wakes up heart-eyed. THE STARS: "neither can *trust*."
//   9.00 cut → "Low and | *slow.*"  Aries and ♎ Libra side by side, the board between them. Out by 10.45.
// Easter eggs: seed constellation (EP 55) top-left, EP 055 in the frame cartouche, the ghost pops up out of the chimney.
// One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const EP = 55
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const ARI = signStar('aries'), LIB = signStar('libra')
const ACC = '#ffb36b'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.55, 4.72],
  open: 1.55, l1: 1.75, l2: 4.05,
  h1: 4.78, h1Land: 5.15, slump: 4.75, lid: [6.3, 6.75], wake: 6.75, l3: 6.6, close: 8.85, h1Out: [8.7, 8.9],
  cut: 9.0,
  h2: 9.05, h2Land: 9.4, libIn: 9.2, out: [10.05, 10.45], h2Out: [10.2, 10.42],
  ghost: 2.75,
}
const ARIES = '♈ ARIES STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ARIES, text: 'is it ready *YET?*', color: ARI.color },
  { t: T.l2, speaker: SPEAK, text: "brisket can't be *rushed*.", color: ACC },
  { t: T.l3, speaker: SPEAK, text: 'neither can *trust*.', color: ACC },
]
const CPS = 28

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const GLOVE = ['.RRRR..', 'RRRRRR.', 'RRRRRRR', 'RRRRRRR', 'hRRRRRR', '.RRRRR.', '.WWWWW.', '.WWWWW.']

function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, rot = 0 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

// ── layout
const GROUND = 1250
const SMK = { x: 620, y: 1130, w: 470, h: 180 }           // barrel centre
const CHIM = { x: SMK.x - SMK.w / 2 + 40, top: 880 }
const BOX = { x: SMK.x + SMK.w / 2 + 80, y: SMK.y + 30, s: 150 }
const ARIS = { x: 215, y: 1290, size: 260 }
const FIN = { ari: { x: 200, y: 1300 }, lib: { x: 900, y: 1300 } }
// Aries taps: quick little hops, faster and faster, until it gives up
const TAPS = (() => { const out = []; let tt = 0.5, g = 0.42; while (tt < 4.6) { out.push(+tt.toFixed(3)); tt += g; g = Math.max(0.2, g * 0.94) } return out })()

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Texas BBQ | takes *hours.*', { top: 225, size: 120, accentSize: 180, at: T.h0, gap: 0.1, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.45, lineHeight: 0.98 })
  const H1 = popText(root, 'Hour | *twelve.*', { top: 215, size: 120, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: ACC, lineHeight: 0.95 })
  const H2 = popText(root, 'Low and | *slow.*', { top: 200, size: 150, accentSize: 240, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: ACC, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
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

  // backyard: a wooden fence, string lights, the dirt yard
  function yard(t, k) {
    x.save(); x.globalAlpha = k
    // string lights swag
    for (let s = 0; s < 3; s++) {
      const x0 = s * 360, x1 = x0 + 360
      for (let n = 0; n <= 36; n++) { const u = n / 36, px = lerp(x0, x1, u), py = 700 + Math.sin(Math.PI * u) * 60; x.fillStyle = '#1a1230'; x.fillRect(Math.round(px), Math.round(py), 6, 4) }
      for (let b = 1; b < 6; b++) {
        const u = b / 6, px = lerp(x0, x1, u), py = 704 + Math.sin(Math.PI * u) * 60
        const tw = 0.7 + 0.3 * Math.sin(t * 3 + s * 2 + b)
        const g = x.createRadialGradient(px, py + 12, 0, px, py + 12, 40)
        g.addColorStop(0, `rgba(255,210,130,${0.45 * tw})`); g.addColorStop(1, 'rgba(255,210,130,0)')
        x.fillStyle = g; x.fillRect(px - 40, py - 28, 80, 80)
        x.fillStyle = '#ffe3a8'; x.fillRect(Math.round(px) - 6, Math.round(py) + 4, 12, 16)
      }
    }
    // fence
    for (let px = 0; px < 1080; px += 54) {
      const h = 250 + ((px / 54) % 2) * 12
      x.fillStyle = '#1c1226'; x.fillRect(px, GROUND - h - 6, 54, h + 6)
      x.fillStyle = (px / 54) % 3 ? '#4a3242' : '#55394a'; x.fillRect(px + 4, GROUND - h, 46, h)
      x.fillStyle = 'rgba(255,210,150,0.12)'; x.fillRect(px + 4, GROUND - h, 8, h)
    }
    x.fillStyle = '#2e1f33'; x.fillRect(0, GROUND - 190, 1080, 14); x.fillRect(0, GROUND - 70, 1080, 14)
    const g = x.createLinearGradient(0, GROUND, 0, 1920)
    g.addColorStop(0, '#3a2a2a'); g.addColorStop(1, '#22161e')
    x.fillStyle = g; x.fillRect(0, GROUND, 1080, 1920 - GROUND)
    x.fillStyle = 'rgba(0,0,0,0.25)'
    for (let i = 0; i < 40; i++) x.fillRect((i * 173) % 1080, GROUND + 20 + (i * 61) % 600, 12, 6)
    x.restore()
  }

  function smoke(t, k) {
    for (let i = 0; i < 9; i++) {
      const ph = (t * 0.32 + i / 9) % 1
      const px = CHIM.x + Math.sin(ph * 6 + i) * 20 + ph * 90, py = CHIM.top - 20 - ph * 520
      const r = 18 + ph * 46
      x.globalAlpha = k * 0.5 * Math.sin(Math.PI * ph)
      x.fillStyle = '#cfc6d8'
      x.fillRect(Math.round((px - r) / 6) * 6, Math.round((py - r * 0.6) / 6) * 6, Math.round(r * 2 / 6) * 6, Math.round(r * 1.2 / 6) * 6)
      x.fillRect(Math.round((px - r * 0.6) / 6) * 6, Math.round((py - r) / 6) * 6, Math.round(r * 1.2 / 6) * 6, Math.round(r * 2 / 6) * 6)
    }
    x.globalAlpha = 1
  }

  // the offset smoker: barrel on legs, firebox on the right glowing through its vent, chimney on the left, a dial on the lid
  function smoker(t, k, lidOpen) {
    if (k <= 0.01) return
    const { x: cx, y: cy, w, h } = SMK
    x.save()
    // chimney
    x.fillStyle = INK; x.fillRect(CHIM.x - 26, CHIM.top - 6, 52, cy - CHIM.top)
    x.fillStyle = '#3d3646'; x.fillRect(CHIM.x - 20, CHIM.top, 40, cy - CHIM.top - 10); x.fillStyle = '#5f566c'; x.fillRect(CHIM.x - 20, CHIM.top, 8, cy - CHIM.top - 10)
    x.fillStyle = INK; x.fillRect(CHIM.x - 34, CHIM.top - 14, 68, 18); x.fillStyle = '#4b4356'; x.fillRect(CHIM.x - 30, CHIM.top - 10, 60, 10)
    // legs + wheels
    x.fillStyle = INK
    for (const lx of [cx - w / 2 + 40, cx + w / 2 - 40]) { x.fillRect(lx - 8, cy + h / 2 - 10, 16, GROUND - cy - h / 2 + 30) }
    x.fillRect(cx - w / 2 + 20, GROUND + 6, w - 40, 10)
    // firebox
    x.fillStyle = INK; x.fillRect(BOX.x - BOX.s / 2 - 6, BOX.y - BOX.s / 2 - 6, BOX.s + 12, BOX.s + 12)
    x.fillStyle = '#332c3c'; x.fillRect(BOX.x - BOX.s / 2, BOX.y - BOX.s / 2, BOX.s, BOX.s)
    const fl = 0.6 + 0.4 * Math.sin(t * 11) * Math.sin(t * 7.3)
    const g = x.createRadialGradient(BOX.x, BOX.y + 30, 0, BOX.x, BOX.y + 30, 160)
    g.addColorStop(0, `rgba(255,140,60,${0.35 * fl})`); g.addColorStop(1, 'rgba(255,140,60,0)')
    x.fillStyle = g; x.fillRect(BOX.x - 160, BOX.y - 130, 320, 320)
    for (let v = 0; v < 4; v++) { x.fillStyle = v % 2 ? '#ff8a3a' : '#ffcf6a'; x.fillRect(BOX.x - 44 + v * 24, BOX.y + 26, 14, 30) }
    // barrel (bottom half fixed, lid on a hinge at the back)
    const rows = h / 6
    for (let j = 0; j < rows; j++) {
      const v = (j + 0.5) / rows * 2 - 1, half = Math.sqrt(1 - v * v * 0.35) * w / 2
      if (j < rows / 2) continue
      x.fillStyle = INK; x.fillRect(cx - half - 6, cy - h / 2 + j * 6, half * 2 + 12, 6)
      x.fillStyle = j > rows * 0.8 ? '#231e2b' : '#2f2938'; x.fillRect(cx - half, cy - h / 2 + j * 6, half * 2, 6)
    }
    // the brisket inside (visible when the lid is up)
    if (lidOpen > 0.05) {
      x.fillStyle = '#120c14'; x.fillRect(cx - w / 2 + 16, cy - 12, w - 32, 18)
      const bw = 300, bh = 72
      x.fillStyle = INK; x.fillRect(cx - bw / 2 - 6, cy - bh - 2, bw + 12, bh + 10)
      x.fillStyle = '#2a140e'; x.fillRect(cx - bw / 2, cy - bh + 4, bw, bh)                 // bark
      x.fillStyle = '#3d1d12'; x.fillRect(cx - bw / 2 + 6, cy - bh + 4, bw - 12, 12)
      x.fillStyle = '#d0485c'; x.fillRect(cx + bw / 2 - 64, cy - bh + 10, 10, bh - 12)       // the cut end: smoke ring
      x.fillStyle = '#c98060'; x.fillRect(cx + bw / 2 - 54, cy - bh + 10, 48, bh - 12)
      x.fillStyle = 'rgba(255,240,220,0.35)'; for (let s = 0; s < 5; s++) x.fillRect(cx - bw / 2 + 24 + s * 40, cy - bh + 8, 12, 6)
      for (let s = 0; s < 4; s++) {                                                          // steam
        const ph = (t * 0.6 + s / 4) % 1
        x.globalAlpha = lidOpen * 0.6 * Math.sin(Math.PI * ph); x.fillStyle = '#f4eef8'
        x.fillRect(Math.round(cx - 90 + s * 60 + Math.sin(ph * 8 + s) * 12), Math.round(cy - bh - 20 - ph * 160), 12, 24)
        x.globalAlpha = 1
      }
    }
    // the lid: the top half, swinging up and back on its hinge
    x.save(); x.translate(cx, cy - h / 2 + 10 - 150 * lidOpen); x.rotate(-0.22 * lidOpen); x.translate(-cx, -(cy - h / 2 + 10))
    for (let j = 0; j < rows / 2; j++) {
      const v = (j + 0.5) / rows * 2 - 1, half = Math.sqrt(1 - v * v * 0.35) * w / 2 * (j === 0 ? 0.82 : 1)
      x.fillStyle = INK; x.fillRect(cx - half - 6, cy - h / 2 + j * 6 - (j === 0 ? 6 : 0), half * 2 + 12, j === 0 ? 12 : 6)
      x.fillStyle = j < 3 ? '#5a5168' : '#3f384c'; x.fillRect(cx - half, cy - h / 2 + j * 6, half * 2, 6)
    }
    x.fillStyle = INK; x.fillRect(cx - w / 2 + 6, cy - 6, w - 12, 8)
    // handle + dial
    x.fillStyle = INK; x.fillRect(cx - 70, cy - 26, 140, 14); x.fillStyle = '#c9a274'; x.fillRect(cx - 64, cy - 22, 128, 6)
    const dx = cx + 110, dy = cy - h / 2 + 30
    x.fillStyle = INK; x.fillRect(dx - 24, dy - 24, 48, 48); x.fillStyle = BONE; x.fillRect(dx - 18, dy - 18, 36, 36)
    const ang = -2.2 + 0.25 * prog(t, 0, T.lid[0]) + Math.sin(t * 9) * 0.03
    x.fillStyle = '#d8344f'
    for (let r = 0; r < 14; r += 3) x.fillRect(Math.round(dx + Math.cos(ang) * r) - 2, Math.round(dy + Math.sin(ang) * r) - 2, 5, 5)
    x.restore()
    x.restore()
  }

  function drawGlove(t, r, size, k, tapping) {
    if (k <= 0.01) return
    drawBits(x, GLOVE, { R: '#e8433a', h: '#ffb0a0', W: BONE }, r.x - size * 0.52, r.y + size * 0.12 + (tapping ? Math.abs(Math.sin(t * 14)) * -10 : 4), size / 30 * k, { rot: -0.3 })
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const lk = ease.outCubic(prog(t, 0.05, 0.5))
    yard(t, lk)
    smoke(t, lk)
    const sk = easeOutBack(prog(t, 0.15, 0.5), 1.8) * ok
    const lid = easeOutBack(prog(t, ...T.lid), 1.6)
    x.save(); x.translate(SMK.x, GROUND); x.scale(sk, sk); x.translate(-SMK.x, -GROUND)
    smoker(t, sk, lid)
    x.restore()
    // the ghost pops up out of the chimney, among the smoke
    drawGhostCameo(x, t, { x: CHIM.x, y: CHIM.top - 14, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
    if (t < T.cut) {
      const tapping = t < T.slump
      const st = t < T.l1 ? { mood: 'neutral', look: [1, 0] } : t < T.l2 ? { mood: 'squint', look: [1, -1] } : t < T.slump ? { mood: 'eyeroll' } : t < T.wake ? { mood: 'sleepy' } : { mood: 'heart', look: [1, 0] }
      const pk = easeOutBack(prog(t, 0.2, 0.55), 2) * ok
      const r = drawStarChar(x, ARIS.x, ARIS.y + (t > T.slump && t < T.wake ? 20 : 0), ARIS.size, t, { color: ARI.color, glyph: ARI.glyph, ...st, pop: pk, squash: t > T.slump && t < T.wake ? 0.12 : 0, hops: tapping ? TAPS : [T.wake + 0.05], seed: 2, glow: 1.1, bob: tapping ? 2 : undefined })
      drawGlove(t, r, ARIS.size, pk, tapping)
      sparkles(t, SMK.x, SMK.y - 60, T.lid[1], 12, 220, 1)
    } else {
      const pk = easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) * ok
      const r = drawStarChar(x, FIN.ari.x, FIN.ari.y, ARIS.size, t, { color: ARI.color, glyph: ARI.glyph, mood: 'happy', pop: pk, hops: [T.h2Land], seed: 2, glow: 1.2 })
      drawGlove(t, r, ARIS.size, pk, false)
      const lp = easeOutBack(prog(t, T.libIn, T.libIn + 0.35), 2) * ok
      drawStarChar(x, FIN.lib.x, FIN.lib.y - (1 - ease.outCubic(prog(t, T.libIn - 0.1, T.libIn + 0.22))) * 380, 250, t, { color: LIB.color, glyph: LIB.glyph, mood: 'heart', look: [-1, 0], pop: lp, hops: [T.libIn + 0.24], seed: 6, glow: 1.15 })
      sparkles(t, 540, 1240, T.h2Land, 12, 320, 4)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.74 (H0 out → "Hour twelve.") and 9.0 (box shut → "Low and slow.").
const CUTS = [4.74, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0 + 0.45, 1174.66, 0.045, 0],
  ...TAPS.map((tt, i) => ['tick', tt + 0.3, 0.02 + 0.001 * i]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.1, 1318.51, 0.012, -0.2],
  ...wordPops(T.h1, 1, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.slump + 0.1, 440, 0.03, 0.6, -0.4],
  ['whoosh', T.lid[0], 0.4, 0.035], ['boom', T.lid[1], 0.08], ['tick', T.lid[1], 0.05], ['glitter', T.lid[1], T.lid[1] + 0.5], ['bell', T.wake + 0.05, 1568, 0.024, 1.2, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.libIn + 0.05, 659.25, 0.045, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
