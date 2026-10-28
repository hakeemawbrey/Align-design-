// st4fullmoon (20 s vertical Align ad, Star Talk season 4, EP 064, thread G: sky lessons) · story 0–15.6, then the end card.
//   0.00–5.50  "When the Moon | is *full…*"  Night over the West Texas desert: a huge pixel full moon rises behind the mesas,
//              the pale ☽ Moon star (stmoon) glowing in front of it. Six little sign stars sit along the ridge; as the
//              moonlight reaches them, every one of them gets emotional: wide eyes, teary, Aries outright sobbing.
//              Drop (2.82): ☽ THE MOON: "full moons bring things up."
//   5.50–9.40  "Sun and Moon, | *opposite.*"  (a full moon is the Moon opposite the Sun: it's true astrology)
//              THE MOON: "if something's bugging you, say it *gently*."  The tears slow; the stars calm down.
//   9.40–13.0  "Say it | *gently.*"  ♓ PISCES STAR, to the ♍ Virgo star: "hey. that joke stung a little. can we talk?"
//              Virgo softens, nods, and they scoot together. Box shuts. (Ghost: peeks over the right-hand mesa.)
//  13.10       card cut (flip).
//  13.20–15.4  "Gentle is | *brave.*"  Everyone calm under the full moon, Pisces and Virgo side by side. Out by 15.45.
// One canvas (sky + moon + mesas + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const EP = 64
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff', SKYBLUE = '#8fd8f6'

const T = {
  h0: 0.12, h0Out: [5.32, 5.5], rise: [0.2, 2.2], moonIn: 1.6, crowd: 0.9, feels: 2.2, sob: 3.1,
  open: 2.66, l1: 2.85,
  h1: 5.58, h1Land: 5.98, l2: 5.9, calm: 7.6, h1Out: [9.22, 9.4],
  h2: 9.46, h2Land: 9.86, l3: 9.6, virgoSoft: 11.6, nod: [11.7, 12.2], scoot: [12.1, 12.7], close: 13.0, h2Out: [12.92, 13.1],
  cut: 13.1, h3: 13.2, h3Land: 13.6, h3Out: [15.18, 15.42], out: [15.02, 15.45],
  ghost: 7.9,
}
const MOON_TAG = '☽ THE MOON', PISCES_TAG = '♓ PISCES STAR'
const LINES = [
  { t: T.l1, speaker: MOON_TAG, color: MOONLIGHT, text: 'full moons bring things up.' },
  { t: T.l2, speaker: MOON_TAG, color: MOONLIGHT, text: "if something's bugging you, say it *gently*." },
  { t: T.l3, speaker: PISCES_TAG, color: '#9fe3d0', text: 'hey. that joke stung a little. can we talk?' },
]
const CPS = 30

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
const DROP = ['.X.', 'XWX', 'XXX', '.X.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const MOON = { x: 540, y: 790, R: 250 }
const HORIZON = 1100, RIDGE = 1250
const CROWD = [
  { id: 'aries', x: 130 }, { id: 'taurus', x: 290 }, { id: 'pisces', x: 450 }, { id: 'virgo', x: 630 }, { id: 'gemini', x: 790 }, { id: 'scorpio', x: 950 },
].map((c, i) => ({ ...c, ...signStar(c.id), seed: 11 + i * 3 }))
const PIS = CROWD[2], VIR = CROWD[3]
const PIS_HOPS = [T.crowd + 0.35, ...talkHops(LINES.slice(2), PISCES_TAG, { cps: CPS }), T.scoot[0], T.h3Land]
const VIR_HOPS = [T.crowd + 0.45, T.nod[0] + 0.05, T.scoot[0] + 0.05, T.h3Land + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'When the Moon | is *full…*', { top: 200, size: 112, accentSize: 180, at: T.h0, gap: 0.1, accentColor: MOONLIGHT, wobble: true, late: 1, lateAt: T.h0 + 0.55 })
  const H1 = popText(root, 'Sun and Moon, | *opposite.*', { top: 200, size: 108, accentSize: 176, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Say it | *gently.*', { top: 200, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: '#9fe3d0' })
  const H3 = popText(root, 'Gentle is | *brave.*', { top: 200, size: 128, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the full moon: a pixel disc with craters, rising behind the mesas
  function moonDisc(t, ok) {
    const r = ease.outCubic(prog(t, ...T.rise))
    if (r <= 0) return null
    const cy = lerp(HORIZON + 160, MOON.y, r) + Math.sin(t * 0.9) * 4, R = MOON.R
    const a = clamp(r * 1.5) * ok
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(MOON.x, cy, R * 0.6, MOON.x, cy, R * 2.3)
    g.addColorStop(0, `rgba(188,210,255,${0.32 * a})`); g.addColorStop(1, 'rgba(188,210,255,0)')
    x.fillStyle = g; x.fillRect(0, cy - R * 2.3, 1080, R * 4.6); x.restore()
    const c = 10, n = Math.ceil(R / c)
    const CR = [[-9, -8, 4], [8, -12, 3], [10, 6, 5], [-6, 10, 3], [-16, 4, 2], [3, -2, 2], [15, -4, 2]]
    x.save(); x.globalAlpha = a
    for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
      const u = (i + 0.5) / n, v = (j + 0.5) / n, d = u * u + v * v
      if (d > 1) continue
      let col = d > 0.86 ? '#a9b5e4' : (-u - v) > 0.9 ? '#e8ecff' : '#cbd4f5'
      for (const [ci, cj, cr] of CR) { const dd = (i - ci) ** 2 + (j - cj) ** 2; if (dd <= cr * cr) col = dd >= (cr - 1) ** 2 ? '#9eaadc' : '#b8c3ee' }
      x.fillStyle = col; x.fillRect(MOON.x + i * c, cy + j * c, c + 0.5, c + 0.5)
    }
    x.restore()
    return { y: cy, a }
  }
  function mesas(t) {
    x.save()
    // far mesas (dusky) then near ridge (dark)
    x.fillStyle = '#3d2560'
    x.beginPath(); x.moveTo(0, HORIZON + 10)
    const far = [[0, 1060], [70, 1060], [100, 1020], [260, 1020], [290, 1070], [420, 1075], [450, HORIZON], [700, HORIZON], [720, 1060], [880, 1060], [900, 1040], [1080, 1040]]
    for (const [px, py] of far) x.lineTo(px, py)
    x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
    x.fillStyle = 'rgba(188,210,255,0.4)'
    for (const [a, b, y] of [[100, 260, 1020], [720, 880, 1060], [900, 1080, 1040]]) x.fillRect(a, y, b - a, 8)
    const g = x.createLinearGradient(0, HORIZON, 0, 1920); g.addColorStop(0, '#1a0f2e'); g.addColorStop(1, '#0a0614')
    x.fillStyle = g
    x.beginPath(); x.moveTo(0, RIDGE + 40)
    for (let i = 0; i <= 27; i++) x.lineTo(i * 40, RIDGE + 40 + (i % 3 === 0 ? -6 : 0) + Math.round(Math.sin(i * 0.7) * 6))
    x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
    // moonlight on the ridge
    x.fillStyle = 'rgba(188,210,255,0.22)'; x.fillRect(0, RIDGE + 34, 1080, 4)
    x.restore()
  }
  function yucca(px, py, c) {
    x.save(); x.fillStyle = '#120a22'
    x.fillRect(px - c, py - 10 * c, 2 * c, 10 * c)
    for (let k = -3; k <= 3; k++) for (let s = 0; s < 4; s++) x.fillRect(px + k * s * c * 0.7 - c / 2, py - 10 * c - s * c * 1.2 + Math.abs(k) * c * 0.4, c, c)
    x.restore()
  }
  function tears(t, ex, ey, t0, t1, seed, big = 1) {
    for (let i = 0; i < 12; i++) {
      const born = t0 + i * 0.24 / big + (seed % 3) * 0.08
      if (born > t1) break
      const d = t - born
      if (d < 0 || d > 0.6) continue
      const side = i % 2 ? 1 : -1
      drawBits(x, DROP, { X: SKYBLUE, W: '#e9f7ff' }, Math.round(ex + side * 26 * big + side * d * 24), Math.round(ey + 14 + d * 110 + d * d * 160), 4 * big, { alpha: 1 - d / 0.6 })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [MOONLIGHT, BONE, LAV, GOLD]) {
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

  function moonStar(t, md, ok) {
    const p = pop01(t, T.moonIn, 0.45, 1.8) * ok
    if (!md || p <= 0.02) return
    const mood = t < T.l1 ? 'happy' : t < T.l2 ? 'neutral' : t < T.calm ? 'sparkle' : t < T.cut ? 'happy' : 'heart'
    drawStarChar(x, MOON.x, md.y + 20, 230, t, { color: MOONC, glyph: '☽', mood, look: t > T.l3 && t < T.cut ? [0, 1] : [0, 0], pop: p, seed: 7, glow: 1.2, hops: talkHops(LINES.slice(0, 2), MOON_TAG, { cps: CPS }) })
  }
  function crowd(t, ok) {
    const sc = ease.inOutCubic(prog(t, ...T.scoot))
    for (const [n, c] of CROWD.entries()) {
      const p = pop01(t, T.crowd + n * 0.1, 0.36, 2.1) * ok
      if (p <= 0.02) continue
      const feel = t > T.feels + n * 0.12 && t < T.calm + n * 0.1
      const isP = c === PIS, isV = c === VIR, sob = c.id === 'aries'
      let cx = c.x
      if (isP) cx = lerp(c.x, 488, sc)
      if (isV) cx = lerp(c.x, 592, sc)
      let mood = 'happy', look = [0, -1], blink, squash = 0
      if (t < T.feels + n * 0.12) { mood = 'neutral'; look = [(MOON.x - c.x) > 0 ? 1 : -1, -1] }
      else if (feel) {
        mood = sob ? 'squint' : ['wide', 'sparkle', 'wide', 'sparkle', 'wide', 'squint'][n]; look = [0, -1]; blink = false
        if (sob && t > T.sob) squash = 0.05 * Math.sin(t * 30)
      } else if (t < T.l3) { mood = 'happy'; look = [0, -1] }
      if (t >= T.l3 && t < T.cut) {
        if (isP) { mood = t < T.scoot[1] ? 'neutral' : 'happy'; look = [1, 0] }
        else if (isV) { mood = t < T.virgoSoft ? 'squint' : t < T.scoot[1] ? 'sparkle' : 'happy'; look = [-1, 0]; if (t > T.nod[0] && t < T.nod[1]) squash = 0.07 * Math.max(0, Math.sin((t - T.nod[0]) * Math.PI / 0.17)) }
        else { mood = 'neutral'; look = [cx < 540 ? 1 : -1, 0] }
      }
      if (t >= T.cut) { mood = isP || isV ? 'heart' : 'happy'; look = [0, 0] }
      const dim = t >= T.l3 && t < T.cut && !isP && !isV ? 0.55 : 1
      const r = drawStarChar(x, cx, RIDGE - 26, isP || isV ? 156 : 140, t, { color: c.color, glyph: c.glyph, mood, look, blink, pop: p, seed: c.seed, glow: 0.9, alpha: dim, squash, hops: isP ? PIS_HOPS : isV ? VIR_HOPS : null })
      if (feel) tears(t, r.x, r.y - 6, T.feels + n * 0.12, T.calm - 0.3, n, sob ? 1.5 : 1)
    }
    sparkles(t, 540, RIDGE - 30, T.scoot[1], 10, 120, 1, [PINK, '#9fe3d0', BONE])
    if (t > T.h3Land) for (let i = 0; i < 6; i++) {
      const born = T.h3Land + i * 0.25, p = (t - born) / 1.2
      if (p <= 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(540 + (i % 2 ? 1 : -1) * (30 + i * 10)), Math.round(RIDGE - 110 - p * 200), 6, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.85 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        x.save(); if (t >= T.cut) x.translate(0, 120)          // box shut: the whole scene drops into the freed space (under the cut)
        const md = moonDisc(t, clamp(ok))
        moonStar(t, md, ok)
        mesas(t)
        // the ghost peeks over the right-hand mesa (the mesa is drawn first, so it hides the ghost's lower half)
        drawGhostCameo(x, t, { x: 990, y: 1040, at: T.ghost, dur: 1.35, from: 'below', cell: 3 })
        yucca(70, RIDGE + 40, 6); yucca(1020, RIDGE + 44, 5)
        crowd(t, ok)
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [5.52, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.022), ['pop', T.h0 + 0.55, 1108.73, 0.04, 0],
  ['whoosh', T.rise[0], 1.6, 0.03], ['bell', T.rise[1] - 0.4, 1661, 0.025, 1.6, 0],
  ...CROWD.map((c, n) => ['pop', +(T.crowd + n * 0.1 + 0.08).toFixed(3), NOTE[n], 0.022, (c.x - 540) / 540]),
  ['pop', T.moonIn + 0.1, 830.61, 0.035, 0],
  ...CROWD.map((c, n) => ['pluck', +(T.feels + n * 0.12).toFixed(3), NOTE[(n + 2) % 7], 0.022, 0.5, (c.x - 540) / 540]),
  ['pop', T.sob, 311, 0.03, -0.7], ['pop', T.sob + 0.3, 294, 0.025, -0.7],
  ['pop', T.open, 698.46, 0.035, 0], ['pop', T.open + 0.06, 932.33, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MOON_TAG]: 470, [PISCES_TAG]: 760 } }),
  ...wordPops(T.h1, 3, 0.1, 2, 0.022), ['pop', T.h1Land, 1244.51, 0.042, 0],
  ['glitter', T.calm, T.calm + 0.5], ['pop', T.ghost + 0.1, 1244.51, 0.014, 0.8],
  ...wordPops(T.h2, 2, 0.08, 1, 0.024), ['pop', T.h2Land, 1108.73, 0.045, 0],
  ['tick', T.nod[0] + 0.08, 0.025], ['tick', T.nod[0] + 0.25, 0.02],
  ['whoosh', T.scoot[0], 0.45, 0.03], ['pluck', T.scoot[1], 1244.51, 0.04, 0.6, 0], ['glitter', T.scoot[1], T.scoot[1] + 0.4],
  ['pop', T.close, 830.61, 0.03, 0], ['pop', T.close + 0.07, 554.37, 0.03, 0],
  ...wordPops(T.h3, 2, 0.08, 3, 0.026), ['pop', T.h3Land, 1244.51, 0.05, 0], ['bell', T.h3Land + 0.05, 1661, 0.024, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
