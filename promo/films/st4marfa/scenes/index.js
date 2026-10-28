// st4marfa (EP 054, 20 s vertical, Star Talk season 4, thread A: the Texas road trip) · story 0–15.6, then the end card.
//   0.00–5.20  "Near *Marfa,* there are | mystery lights."  High desert at night: a low mountain ridge, a last pink band
//              of dusk, a viewing-area rail. Little glowing orbs bob, drift, split and fade on the dark horizon (the real,
//              unexplained Marfa lights). ♈ Aries (gloves on) and ♎ Libra squint. ARIES: "who ARE they?"
//   5.20–11.6  "Real. Unexplained. | *Very* Texas."  THE STARS: "some mysteries are fun." One light dims... and the ghost
//              rises from behind the ridge right where it was, blinks, and ducks back (the episode's ghost cameo); the
//              light comes back on. The stars go wide. THE STARS: "your date shouldn't be one. *say* what you mean."
//   11.6 cut → "Be clear, | not *mysterious.*"  Aries turns to Libra: a plain bubble, "i like you. dinner?" Libra: heart
//              eyes. Out by 15.4; end card at 15.6 (JOIN THE TEXAS BETA).
// Easter eggs: seed constellation (EP 54) top-left, EP 054 in the frame cartouche, the ghost is one of the lights.
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

export const DURATION = 20
const EP = 54
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const ARI = signStar('aries'), LIB = signStar('libra')
const ACC = '#ff9ad5'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.05, 5.22],
  lights: 0.6, squint: 1.5, open: 2.3, l1: 2.5,
  h1: 5.28, h1Land: 5.9, l2: 4.9, ghost: 6.25, l3: 7.9, close: 11.5, h1Out: [11.4, 11.6],
  cut: 11.7,
  h2: 11.75, h2Land: 12.2, said: 12.7, heart: 13.4, out: [15.0, 15.4], h2Out: [15.15, 15.4],
}
const ARIES = '♈ ARIES STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ARIES, text: 'who *ARE* they?', color: ARI.color },
  { t: T.l2, speaker: SPEAK, text: 'some mysteries are *fun*.', color: ACC },
  { t: T.l3, speaker: SPEAK, text: "your date shouldn't be one. *say* what you mean.", color: ACC },
]
const CPS = 28

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const GLOVE = ['.RRRR..', 'RRRRRR.', 'RRRRRRR', 'RRRRRRR', 'hRRRRRR', '.RRRRR.', '.WWWWW.', '.WWWWW.']

function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, rot = 0, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
function bubble(x, cx, cy, text, { size = 34, fill = BONE, k = 1, side = 'left' } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `700 ${size}px 'Space Mono', monospace`
  const tw = x.measureText(text).width, P = 6
  const w = Math.round((tw + 44) / P) * P, h = Math.round((size + 32) / P) * P
  x.translate(Math.round(cx), Math.round(cy)); x.scale(k, k)
  const ox = -w / 2, oy = -h / 2
  const slab = (o, col) => { x.fillStyle = col; x.fillRect(ox - o + P, oy - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(ox - o, oy - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  slab(P, INK); slab(0, fill)
  const tx = side === 'left' ? ox + 3 * P : ox + w - 5 * P, dir = side === 'left' ? -1 : 1
  x.fillStyle = INK; x.fillRect(tx - P, oy + h, 4 * P, 2 * P); x.fillRect(tx + (dir < 0 ? -P : 2 * P), oy + h + 2 * P, 2 * P, 2 * P)
  x.fillStyle = fill; x.fillRect(tx, oy + h - P, 2 * P, 2 * P); x.fillRect(tx + (dir < 0 ? 0 : P), oy + h + P, P, P)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── layout
const RIDGE_Y = 1080
const ridgeAt = px => RIDGE_Y - 40 - 46 * Math.max(0, Math.sin(px * 0.006 + 0.6)) - 20 * Math.sin(px * 0.021 + 1.3) - 10 * Math.sin(px * 0.053)
const ridge = px => Math.round(ridgeAt(px) / 6) * 6
// the lights: base x, height over the ridge, colour, phase. #2 is the ghost.
const LIGHTS = [
  { x: 150, h: 60, c: '#ffe7b0', ph: 0.0 }, { x: 330, h: 110, c: '#ffb36b', ph: 1.7 }, { x: 620, h: 70, c: '#fff4d8', ph: 3.1 },
  { x: 790, h: 140, c: '#ff7a5c', ph: 4.4 }, { x: 940, h: 50, c: '#ffd98a', ph: 2.2 },
]
const GHOST_L = 2
const ARIS = { x: 300, y: 1310, size: 280 }, LIBS = { x: 790, y: 1300, size: 270 }
const FIN = { ari: 360, lib: 730 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Near *Marfa,* there are | mystery lights.', { top: 235, size: 92, accentSize: 132, at: T.h0, gap: 0.09, accentColor: ACC, wobble: true, fit: true })
  const H1 = popText(root, 'Real. Unexplained. | *Very* Texas.', { top: 225, size: 92, accentSize: 140, at: T.h1, late: 0, wobble: true, gap: 0.12, accentColor: ACC, fit: true })
  const H2 = popText(root, 'Be clear, | not *mysterious.*', { top: 200, size: 132, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: ACC, lineHeight: 0.98, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const ARI_HOPS = [...talkHops(LINES, ARIES, { cps: CPS }), T.said, T.h2Land]

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

  // synthwave dusk: a pink-to-violet band low in the sky, behind the ridge
  function dusk(k) {
    const g = x.createLinearGradient(0, 760, 0, RIDGE_Y)
    g.addColorStop(0, 'rgba(255,90,170,0)'); g.addColorStop(0.65, `rgba(255,96,160,${0.28 * k})`); g.addColorStop(1, `rgba(255,170,120,${0.42 * k})`)
    x.fillStyle = g; x.fillRect(0, 760, 1080, RIDGE_Y - 760)
  }
  // the lights: soft orbs that bob, drift, pulse and sometimes split in two
  function lightPos(L, t) {
    const bx = L.x + Math.sin(t * 0.7 + L.ph) * 40, by = ridge(L.x) - L.h - Math.sin(t * 1.3 + L.ph * 2) * 34
    return [bx, by]
  }
  function lights(t, k) {
    LIGHTS.forEach((L, i) => {
      let a = clamp((t - T.lights - i * 0.22) * 2) * k * (0.55 + 0.45 * Math.sin(t * 2.1 + L.ph))
      if (i === GHOST_L) a *= 1 - prog(t, T.ghost - 0.35, T.ghost) + prog(t, T.ghost + 1.4, T.ghost + 1.8)
      if (a <= 0.01) return
      const [bx, by] = lightPos(L, t)
      const split = i === 3 ? 22 * Math.max(0, Math.sin(t * 0.9)) : 0
      for (const dx of split > 2 ? [-split, split] : [0]) {
        const g = x.createRadialGradient(bx + dx, by, 0, bx + dx, by, 120)
        g.addColorStop(0, hexA(L.c, 0.8 * a)); g.addColorStop(0.3, hexA(L.c, 0.3 * a)); g.addColorStop(1, hexA(L.c, 0))
        x.fillStyle = g; x.fillRect(bx + dx - 120, by - 120, 240, 240)
        x.globalAlpha = a; x.fillStyle = '#fffaf0'; x.fillStyle = L.c; x.fillRect(Math.round(bx + dx) - 15, Math.round(by) - 6, 30, 12); x.fillRect(Math.round(bx + dx) - 6, Math.round(by) - 15, 12, 30); x.fillRect(Math.round(bx + dx) - 12, Math.round(by) - 12, 24, 24); x.fillStyle = '#fffaf0'; x.fillRect(Math.round(bx + dx) - 6, Math.round(by) - 6, 12, 12)
        x.globalAlpha = 1
      }
    })
  }
  const hexA = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a.toFixed(3)})` }

  // the ridge (pixel silhouette) and the desert floor with scrub, a viewing-area rail
  function land(t, k) {
    x.save(); x.globalAlpha = k
    for (let px = 0; px < 1080; px += 6) { const ry = ridge(px); x.fillStyle = '#120a26'; x.fillRect(px, ry, 6, RIDGE_Y - ry + 2); x.fillStyle = 'rgba(255,140,190,0.45)'; x.fillRect(px, ry, 6, 4) }
    const g = x.createLinearGradient(0, RIDGE_Y, 0, 1920)
    g.addColorStop(0, '#1d1233'); g.addColorStop(1, '#3a2340')
    x.fillStyle = g; x.fillRect(0, RIDGE_Y, 1080, 1920 - RIDGE_Y)
    // synthwave grid on the desert floor
    x.fillStyle = 'rgba(255,110,190,0.22)'
    for (let r = 0; r < 12; r++) { const u = ((r + (t * 0.25) % 1) / 12), yy = RIDGE_Y + u * u * (1920 - RIDGE_Y); x.fillRect(0, Math.round(yy), 1080, 3) }
    for (let c = -10; c <= 10; c++) for (let s = 0; s < 80; s++) { const u = s / 80, yy = RIDGE_Y + u * u * (1920 - RIDGE_Y); x.fillRect(Math.round(540 + c * 60 * (0.1 + u * u * 4)), Math.round(yy), 3, 3) }
    // scrub bushes
    for (let i = 0; i < 9; i++) {
      const sx = (i * 131 + 40) % 1080, sy = RIDGE_Y + 30 + (i * 47) % 80
      x.fillStyle = '#0d0820'; x.fillRect(sx - 18, sy - 12, 36, 12); x.fillRect(sx - 9, sy - 21, 18, 9)
    }
    // the viewing-area rail
    x.fillStyle = '#5e4f86'; x.fillRect(0, 1206, 1080, 8)
    for (let px = 30; px < 1080; px += 150) x.fillRect(px, 1206, 10, 70)
    x.fillStyle = '#8f80b8'; x.fillRect(0, 1206, 1080, 2)
    x.restore()
  }

  function drawGlove(t, r, size, k) {
    if (k <= 0.01) return
    drawBits(x, GLOVE, { R: '#e8433a', h: '#ffb0a0', W: BONE }, r.x - size * 0.5, r.y + size * 0.12 + Math.sin(t * 3) * 4, size / 30 * k, { rot: -0.3 })
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const lk = ease.outCubic(prog(t, 0.05, 0.6))
    dusk(lk)
    lights(t, lk * ok)
    // the ghost: one of the lights was it all along — it rises over the ridge where the light hovered
    const [gxp] = lightPos(LIGHTS[GHOST_L], T.ghost)
    if (t > T.ghost - 0.1 && t < T.ghost + 1.6) {
      const g = x.createRadialGradient(gxp, ridge(gxp) - 30, 0, gxp, ridge(gxp) - 30, 110)
      const a = 0.35 * Math.sin(Math.PI * prog(t, T.ghost, T.ghost + 1.4))
      g.addColorStop(0, `rgba(255,244,216,${a})`); g.addColorStop(1, 'rgba(255,244,216,0)')
      x.fillStyle = g; x.fillRect(gxp - 110, ridge(gxp) - 140, 220, 220)
    }
    land(t, lk)
    drawGhostCameo(x, t, { x: gxp, y: ridge(gxp), at: T.ghost, dur: 1.4, from: 'below', cell: 5 })
    // the two at the rail
    const turn = ease.inOutCubic(prog(t, T.cut - 0.1, T.cut + 0.35))
    const pk = easeOutBack(prog(t, 0.25, 0.6), 2) * ok
    const ghostSeen = t > T.ghost + 0.2 && t < T.ghost + 2.2
    const aMood = t < T.squint ? { mood: 'neutral', look: [0.5, -1] } : t < T.l2 ? { mood: 'squint', look: [0.5, -1] } : ghostSeen ? { mood: 'wide', look: [1, -1], blink: false } : t < T.cut ? { mood: 'neutral', look: [0.5, -1] } : t < T.heart ? { mood: 'happy', look: [1, 0] } : { mood: 'sparkle', look: [1, 0] }
    const lMood = t < T.squint + 0.2 ? { mood: 'neutral', look: [-0.5, -1] } : t < T.l2 ? { mood: 'squint', look: [-1, -1] } : ghostSeen ? { mood: 'wide', look: [-1, -1], blink: false } : t < T.cut ? { mood: 'neutral', look: [-0.5, -1] } : t < T.said + 0.4 ? { mood: 'wide', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }
    const r = drawStarChar(x, lerp(ARIS.x, FIN.ari, turn), ARIS.y, ARIS.size, t, { color: ARI.color, glyph: ARI.glyph, ...aMood, pop: pk, squash: t < T.l2 && t > T.squint ? -0.04 : 0, hops: ARI_HOPS, seed: 2, glow: 1.1 })
    drawGlove(t, r, ARIS.size, pk)
    drawStarChar(x, lerp(LIBS.x, FIN.lib, turn), LIBS.y, LIBS.size, t, { color: LIB.color, glyph: LIB.glyph, ...lMood, pop: pk, hops: [T.ghost + 0.25, T.heart], seed: 6, glow: 1.1 })
    const bk = easeOutBack(prog(t, T.said, T.said + 0.3), 2.4) * ok
    if (bk > 0.01) bubble(x, 520, ARIS.y - 260 + Math.sin(t * 3) * 3, 'i like you. dinner?', { size: 42, k: bk, side: 'left' })
    const hk = easeOutBack(prog(t, T.heart, T.heart + 0.3), 2.6) * ok
    if (hk > 0.01) drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, FIN.lib + 90, LIBS.y - 170 + Math.sin(t * 2.2) * 6, 11 * hk * (1 + 0.08 * Math.max(0, Math.sin((t - T.heart) * 7))))
    sparkles(t, FIN.lib, LIBS.y, T.heart, 10, 200, 2)
    sparkles(t, gxp, ridge(gxp) - 40, T.ghost + 1.3, 8, 70, 1, ['#fff4d8', BONE, GOLD])
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

// card-motif candidates: 5.24 (H0 out → "Real. Unexplained.") and 11.7 (box shut → "Be clear, not mysterious.").
const CUTS = [5.24, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 6, 0.09, 0, 0.022),
  ...LIGHTS.map((L, i) => ['bell', +(T.lights + i * 0.22).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.012, 1.6, (L.x - 540) / 600]),
  ['tick', T.squint, 0.03],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 4, 0.12, 1, 0.022),
  ['whoosh', T.ghost - 0.3, 0.5, 0.02], ['pluck', T.ghost + 0.2, 1318.51, 0.03, 0.8, 0.1], ['pop', T.ghost + 0.3, 330, 0.04, 0], ['pop', T.ghost + 1.3, 1174.66, 0.02, 0.1],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.said, 880, 0.045, -0.2], ['pluck', T.heart, 1174.66, 0.045, 0.6, 0.2], ['bell', T.heart + 0.05, 1760, 0.026, 1.2, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
