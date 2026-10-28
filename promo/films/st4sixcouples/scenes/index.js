// st4sixcouples (EP 090, 25 s vertical Align ad, Star Talk season 4, thread F: the six couples) · story 0–20.6, then the
// shared end card ("come" + the Align logo, CTA "SIGN UP TO VOTE YOUR CITY").
//   0.00–4.60  "Six couples, | one *sky.*"  The six real opposite pairs pop in across the sky, one row each, every star
//              glancing across at its opposite: ♈–♎, ♉–♏, ♊–♐, ♋–♑, ♌–♒, ♍–♓. On the drop (2.82) a line links each pair and
//              its Push / Pull / Align reading pops between them, row by row, bars filling (no numbers).
//   4.60–11.3  Box (THE STARS): "every sign has an *opposite.*"  "Fire meets *air.* | Earth meets *water.*" →
//              "opposites don't complete you. they *stretch* you."  On "stretch" every pair is pulled apart like an
//              elastic band, then springs back. The box pops shut.
//  11.50       card cut (flip).
//  11.6–15.6   "Same *mode.* | Opposite *side.*"  The readings are gone; between each pair its shared modality
//              (CARDINAL / FIXED / MUTABLE): opposites always share one. The pairs lean in.
//  15.8–20.5   "Stretch, don't | *settle.*"  The links glow gold and pulse; all twelve hop together on the beat. The ghost
//              peeks up from the bottom edge. Everything pops out by 20.5.
// One canvas (sky + links + chips + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 25
export const EP = 90
const CTA = 'SIGN UP TO VOTE YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', CYAN = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid

// ── the six couples (the real opposite pairs), each with its elements, shared modality and a reading (bar fills, no numbers)
const PAIRS = [
  { a: 'aries', b: 'libra', el: 'FIRE + AIR', mode: 'CARDINAL', r: [0.82, 0.58, 0.7] },
  { a: 'taurus', b: 'scorpio', el: 'EARTH + WATER', mode: 'FIXED', r: [0.66, 0.84, 0.62] },
  { a: 'gemini', b: 'sagittarius', el: 'AIR + FIRE', mode: 'MUTABLE', r: [0.58, 0.74, 0.86] },
  { a: 'cancer', b: 'capricorn', el: 'WATER + EARTH', mode: 'CARDINAL', r: [0.76, 0.62, 0.72] },
  { a: 'leo', b: 'aquarius', el: 'FIRE + AIR', mode: 'FIXED', r: [0.88, 0.7, 0.6] },
  { a: 'virgo', b: 'pisces', el: 'EARTH + WATER', mode: 'MUTABLE', r: [0.62, 0.86, 0.76] },
].map(P => ({ ...P, A: signStar(P.a), B: signStar(P.b), an: P.a.toUpperCase(), bn: P.b.toUpperCase() }))
const ROW = i => 578 + i * 146
const LX = 160, RX = 920, SS = 124

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.8, h0Out: [4.85, 5.05],
  pairIn: 0.45, pairGap: 0.2,
  links: BEAT(4), linkGap: 0.26,                               // 2.82
  open: 4.6, l1: 4.8,
  h1: 5.2, h1Land: 5.75, l2: 7.6, h1Out: [11.1, 11.3],
  close: 11.3, chipsOut: [11.0, 11.35],
  cut: 11.5,
  h2: 11.6, h2Land: 12.0, modes: 12.1, lean: [12.9, 13.6], h2Out: [15.45, 15.65], modesOut: [15.3, 15.6],
  h3: 15.8, h3Land: 16.25, glowIn: 16.3, party: [16.3, 19.9],
  ghost: 17.6,
  h3Out: [20.28, 20.5], out: [20.08, 20.48],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'every sign has an *opposite.*' },
  { t: T.l2, speaker: NARR, text: 'opposites don’t complete you. they *stretch* you.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const STRETCH_AT = LT[1].chars[LINES[1].text.replace(/\*/g, '').indexOf('stretch')] ?? T.l2 + 1.4
T.stretch = [STRETCH_AT, STRETCH_AT + 1.1]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b

// how far each star is pulled out (stretch: out then a springy snap back) and leaned in (the modality beat)
function pullAt(t, i) {
  const s0 = T.stretch[0] + i * 0.05
  const out = ease.outCubic(prog(t, s0, s0 + 0.45))
  const back = ease.spring(prog(t, s0 + 0.5, s0 + 1.4), 0.3)
  const lean = ease.inOutCubic(prog(t, T.lean[0], T.lean[1])) * (1 - ease.inOutCubic(prog(t, T.modesOut[0], T.h3)))
  return 70 * out * (1 - back) - 38 * lean
}
function starMood(t, i, side) {
  const look = [side, 0]
  if (t < T.links) return { mood: 'neutral', look }
  if (t < T.l1) return { mood: (i + (side > 0 ? 1 : 0)) % 3 ? 'sparkle' : 'happy', look }
  if (t < T.stretch[0]) return { mood: t < LT[0].done + 0.6 ? 'wide' : 'heart', look }
  if (t < T.stretch[0] + 0.5) return { mood: 'squint', look: [-side, 0], squash: -0.12 }
  if (t < T.cut) return { mood: 'wide', look }
  if (t < T.h3) return { mood: (i + (side > 0 ? 0 : 1)) % 2 ? 'happy' : 'sparkle', look }
  return { mood: Math.floor((t - T.h3) / (BL * 2) + i + (side > 0 ? 1 : 0)) % 2 ? 'happy' : 'heart', look: [0, 0] }
}
const PARTY_HOPS = (() => { const a = []; for (let k = T.party[0]; k < T.party[1]; k += BL * 2) a.push(+k.toFixed(3)); return a })()

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 20px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Six couples, | one *sky.*', { top: 196, size: 104, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.96 })
  const H1 = popText(root, 'Fire meets *air.* | Earth meets *water.*', { top: 216, size: 88, accentSize: 120, at: T.h1, late: 0, wobble: true, gap: 0.12, accentColor: CYAN, lineHeight: 1.0, fit: true })
  const H2 = popText(root, 'Same *mode.* | Opposite *side.*', { top: 210, size: 96, accentSize: 132, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: LAV, lineHeight: 1.0, fit: true })
  const H3 = popText(root, 'Stretch, don’t | *settle.*', { top: 196, size: 108, accentSize: 164, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, gap: 0.1, accentColor: PINK, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1462, width: 960, height: 260, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // the elastic link: a pixel-dot line that sags when slack and goes taut + bright when stretched
  function drawLink(t, i, xa, xb, y, a) {
    const k = ease.outCubic(prog(t, T.links + i * T.linkGap, T.links + i * T.linkGap + 0.35))
    if (k <= 0 || a <= 0) return
    const pull = pullAt(t, i), taut = clamp(pull / 70)
    const party = clamp(prog(t, T.glowIn, T.glowIn + 0.4))
    const beat = party > 0 ? 0.5 + 0.5 * Math.cos(((t - 0.6) / BL) * Math.PI * 2) : 0
    const col = party > 0 || taut > 0.2 ? GOLD : LAV
    const sag = 26 * (1 - taut) * (1 - party)
    const x0 = xa + SS * 0.42, x1 = lerp(x0, xb - SS * 0.42, k)
    x.save(); x.globalAlpha = a * (0.55 + 0.45 * Math.max(taut, party * (0.6 + 0.4 * beat)))
    if (party > 0 || taut > 0.2) glow((x0 + x1) / 2, y, 160, GOLD, 0.35 * Math.max(taut, party * beat))
    x.fillStyle = col
    const n = Math.max(2, Math.round((x1 - x0) / 14))
    for (let s = 0; s <= n; s++) { const u = s / n, px = lerp(x0, x1, u), py = y + Math.sin(Math.PI * u) * sag; x.fillRect(Math.round(px) - 3, Math.round(py) - 3, 6, 6) }
    x.restore()
  }

  // the reading chip: the pair's names + elements, then PUSH / PULL / ALIGN bars filling
  function drawChip(t, i, y, a) {
    const t0 = T.links + i * T.linkGap + 0.12
    const k = pop01(t, t0, 0.34, 2.2) * outK(t, T.chipsOut) * a
    if (k <= 0.01) return
    const P = PAIRS[i], w = 540, h = 118
    x.save(); x.translate(540, y); x.scale(k, k)
    x.fillStyle = 'rgba(16,9,38,0.92)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 14); x.fill()
    x.lineWidth = 2.5; x.strokeStyle = 'rgba(239,230,214,0.32)'; x.stroke()
    x.textBaseline = 'middle'
    x.font = `700 20px ${MONO}`; x.textAlign = 'left'
    x.fillStyle = BONE; x.fillText(`${P.an} × ${P.bn}`, -w / 2 + 20, -h / 2 + 22)
    x.textAlign = 'right'; x.fillStyle = LAV; x.fillText(P.el, w / 2 - 20, -h / 2 + 22)
    const rows = [['PUSH', READING.push], ['PULL', READING.pull], ['ALIGN', READING.align]]
    rows.forEach(([lab, col], r) => {
      const ry = -h / 2 + 50 + r * 24
      x.textAlign = 'left'; x.fillStyle = col; x.fillText(lab, -w / 2 + 20, ry)
      const bx = -w / 2 + 110, bw = w - 130
      x.fillStyle = 'rgba(239,230,214,0.1)'; x.fillRect(bx, ry - 6, bw, 12)
      const f = P.r[r] * ease.outCubic(prog(t, t0 + 0.2 + r * 0.12, t0 + 0.75 + r * 0.12))
      x.fillStyle = col; x.fillRect(bx, ry - 6, Math.round(bw * f / 8) * 8, 12)
    })
    x.restore()
  }
  // the modality tag (beat 2)
  function drawMode(t, i, y, a) {
    const k = pop01(t, T.modes + i * 0.12, 0.32, 2.4) * outK(t, T.modesOut) * a
    if (k <= 0.01) return
    const P = PAIRS[i], col = { CARDINAL: PINK, FIXED: GOLD, MUTABLE: CYAN }[P.mode]
    x.save(); x.translate(540, y - 4); x.scale(k, k)
    x.font = `700 26px ${MONO}`
    const w = x.measureText(P.mode).width + 44, h = 50
    x.fillStyle = 'rgba(16,9,38,0.94)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 25); x.fill()
    x.lineWidth = 3; x.strokeStyle = col; x.stroke()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(P.mode, 0, 2)
    x.restore()
  }
  function drawPair(t, i, a) {
    const P = PAIRS[i], y = ROW(i)
    const pull = pullAt(t, i)
    const xa = LX - pull, xb = RX + pull
    drawLink(t, i, xa, xb, y, a)
    const party = inR(t, ...T.party)
    const hopsA = [T.links + i * T.linkGap, T.stretch[0] + 1.0 + i * 0.05, T.h2Land + i * 0.06, ...(party ? PARTY_HOPS : [])]
    const hopsB = hopsA.map(h => h + 0.08)
    for (const [side, S, X, hops, seed] of [[1, P.A, xa, hopsA, i * 2 + 1], [-1, P.B, xb, hopsB, i * 2 + 2]]) {
      const pk = pop01(t, T.pairIn + i * T.pairGap + (side < 0 ? 0.08 : 0), 0.36, 2.2) * a
      if (pk <= 0.02) continue
      const st = starMood(t, i, side)
      drawStarChar(x, X, y, SS, t, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, squash: st.squash || 0, hops, seed, pop: pk, glow: 0.85 })
    }
    drawChip(t, i, y, a)
    drawMode(t, i, y, a)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const a = clamp(popOut(t, T.out))
        for (let i = 0; i < PAIRS.length; i++) drawPair(t, i, a)
        drawGhostCameo(x, t, { x: 860, y: 1893, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ...PAIRS.flatMap((_, i) => [['pop', +(T.pairIn + i * T.pairGap).toFixed(3), NOTE[i % 7], 0.022, -0.5], ['pop', +(T.pairIn + i * T.pairGap + 0.08).toFixed(3), NOTE[(i + 2) % 7], 0.022, 0.5]]),
  ...PAIRS.flatMap((_, i) => [['pluck', +(T.links + i * T.linkGap).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.025, 0.4, 0], ['tick', +(T.links + i * T.linkGap + 0.15).toFixed(3), 0.02]]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ...wordPops(T.h1, 6, 0.12, 2, 0.022),
  ['chip', T.stretch[0], 300, 0.45, { wave: 'tri', slide: 14, gain: 0.03 }], ['chip', T.stretch[0] + 0.5, 1200, 0.25, { wave: 'tri', slide: -20, gain: 0.03 }], ['whoosh', T.stretch[0] + 0.45, 0.3, 0.04],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.045, 0],
  ...PAIRS.map((_, i) => ['pop', +(T.modes + i * 0.12).toFixed(3), NOTE[(i + 3) % 7] * 2, 0.018, 0]),
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0],
  ['bell', T.glowIn, 1567.98, 0.035, 1.8, 0], ['glitter', T.glowIn, T.glowIn + 0.9],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
