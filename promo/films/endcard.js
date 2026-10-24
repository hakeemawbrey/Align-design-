// Shared vertical END CARD for the Houston series (1080×1920): "come" … the seed-of-life logo blooms … "Align".
//   import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
//   buildEndcard(stage, { start, cta })  — cta defaults to 'JOIN THE HOUSTON BETA'; other cities pass e.g. 'JOIN THE WAITLIST'
//   SCENES: [...yourScenes, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
//   CUES:   [...yourCues, ...endcardCues(DURATION - ENDCARD_LEN)]
// Contract: at `start` your film must be showing ONLY the plain sky H (drawSky(ctx,t,SKY_H) + grain GRAIN_H, from
// wheel.js). The end card is opaque from `start` (it draws that same sky itself, same layer recipe as dummies a), so the
// cut is invisible, and it runs to start + ENDCARD_LEN (= DURATION), ending on a black frame.
//
// The screen reads as one phrase: "come" pops in big, then glides down to its place on the line under the mark, the
// mark blooms, and the wordmark "Align" lands right after "come" → "come Align" (Align appears once; no tagline) and a quiet
// "JOIN THE HOUSTON BETA" line sits under it.
// Timeline (seconds after `start`):
//   0.00         plain sky H (identical to the film's hand-off frame)
//   0.06         "come" pops in big at the centre (Inter 800, bone, springy overshoot); readable to ~1.0
//   0.95–1.40    "come" glides down and shrinks onto the wordmark line, centred under the mark, and waits there
//   1.00         a single point of light appears at the mark's centre
//   1.18–1.52    the centre circle draws on out of the light
//   1.38 + k·0.13  the six petal circles bloom out one after another, rotating into place (each 0.42 s; done ≈2.45)
//   2.28–2.78    the outer circle draws round; the whole mark settles its rotation; a petal-fill shimmer passes
//   2.62         the bloom glow swells and then breathes
//   2.70 + i·0.06  the seven chakra dots light the column bottom → top (done ≈3.2)
//   2.92         "come" springs left as the wordmark "Align" slides in beside it (pair centred by eye) (de-blur, rise, tracking in) · 3.18–3.62 a light sweep across it
//   0.50–1.00    "JOIN THE HOUSTON BETA" (Space Mono, bone ~72%) fades up under the phrase at y 1440 and stays to the fade
//   3.70–4.40    fade to black (last frame black)
// Pure function of t; nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, tw, el, rng, hexToRgb } from '../src/lib.js'
import { W, H, fill } from '../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from './sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from './wheel.js'

export const ENDCARD_LEN = 4.4

const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', LAV = '#d9cdf0', VIOLET = '#9a7be0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BETA_FS = 34, BETA_Y = 1440, BETA_T = 0.5   // subtle line under the phrase; in once "come" has landed, stays to the fade
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

// beats, relative to start
const R = {
  come: 0.06, glide: [0.95, 1.4],
  spark: 1.0, centre: [1.18, 1.52],
  petal: 1.38, petalGap: 0.13, petalDur: 0.42,
  outer: [2.28, 2.78], settle: [1.3, 2.75], shimmer: 2.45,
  swell: 2.62,
  dots: 2.7, dotGap: 0.06,
  word: 2.92, sweep: [3.18, 3.62],
  out: 3.7,
}
// layout (vertical). Mark in viewBox units: petals r=20, outer r=40, chakra spacing 10.6 (matches align-mark.png).
const MARK_CX = 540, MARK_CY = 820, U = 6.2                 // px per unit → outer ring radius 248 px
const COME_FS0 = 200, COME_Y0 = 960                           // big "come", centred (baseline y)
const COME_FS = 124, WORD_FS = 204, LINE_Y = 1290, GAP = 30   // the "come Align" line, shared baseline
const RP = 20, RO = 40, DY = 10.6

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }

function makeBurst(seed, n, dist) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.5, d: dist * (0.6 + r() * 0.6), size: 14 + Math.round(r() * 2) * 6, kind: Math.floor(r() * 4), c: [GOLD, BONE, PINK, LAV][i % 4] }))
}
function drawBurst(x, parts, px, py, t, t0, dur = 0.75) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - ease.inQuad(p)) * (p < 0.12 ? p / 0.12 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, q.c)
  }
  x.restore()
}

export async function buildEndcard(stage, { start, cta = 'JOIN THE HOUSTON BETA' }) {   // cta: the quiet line under the phrase (e.g. 'JOIN THE WAITLIST', 'VOTE FOR YOUR CITY')
  const S = start, T = k => S + k, END = S + ENDCARD_LEN
  try {
    await Promise.all([`800 ${COME_FS0}px Inter`, `italic 400 ${WORD_FS}px 'EB Garamond'`, `700 ${BETA_FS}px 'Space Mono'`].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const bx = layerCanvas(root).getContext('2d')           // sky
  const mx = layerCanvas(root).getContext('2d')           // mark + type
  const fx = layerCanvas(root, { pointerEvents: 'none' }).getContext('2d')   // sparkles
  const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
  const black = el('div', { position: 'absolute', inset: '0', background: '#000', opacity: 0 }, root)

  // measure the "come Align" line once (canvas metrics; no layout reads)
  mx.font = `800 ${COME_FS}px ${INTER}`; const wCome = mx.measureText('come').width
  mx.font = `italic 400 ${WORD_FS}px ${SERIF}`; const wWord = mx.measureText('Align').width
  const x0 = W / 2 - (wCome + GAP + wWord) / 2 - 16   // optical nudge left: the italic's right overhang reads heavy
  const COME_X1 = x0 + wCome / 2, WORD_X = x0 + wCome + GAP + wWord / 2

  // wordmark scratch canvas (for the light sweep, clipped to the glyphs)
  const wc = document.createElement('canvas'); wc.width = Math.ceil(wWord + 160); wc.height = Math.ceil(WORD_FS * 1.6)
  const wx = wc.getContext('2d')

  const SPARKS = makeBurst(4411, 10, 300)
  const T_HOLD = T(R.swell + 0.3)

  // ── helpers (all in mark space: origin at the mark centre, 1 unit = U px)
  const ringStyle = (a, glowK = 1) => {
    mx.strokeStyle = rgba(LAV, 0.92 * a); mx.lineWidth = 1.05 * U; mx.lineCap = 'round'
    mx.shadowColor = rgba(VIOLET, 0.85 * a); mx.shadowBlur = 14 * glowK
  }
  const sphere = (cx, cy, r, c, a) => {
    const g = mx.createRadialGradient(cx - r * 0.25, cy - r * 0.3, r * 0.05, cx, cy, r)
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.35, c); g.addColorStop(1, c)
    mx.globalAlpha = a; mx.fillStyle = g; mx.beginPath(); mx.arc(cx, cy, r, 0, Math.PI * 2); mx.fill(); mx.globalAlpha = 1
  }

  function drawMark(t) {
    const settle = ease.outCubic(prog(t, T(R.settle[0]), T(R.settle[1])))
    const rot = (-32 * (1 - settle)) * Math.PI / 180
    const breathe = 1 + 0.012 * Math.sin((t - T_HOLD) * 2.2) * prog(t, T_HOLD, T_HOLD + 0.4)
    const swell = tw(t, [[T(R.swell), 0], [T(R.swell + 0.3), 1, ease.outQuad], [T(R.swell + 1.0), 0.35, ease.inOutQuad]])

    // the bloom glow behind the mark
    const gA = 0.55 * prog(t, T(R.centre[0]), T(R.outer[1])) + 0.45 * swell + 0.08 * Math.sin((t - T_HOLD) * 1.9) * prog(t, T_HOLD, T_HOLD + 0.4)
    if (gA > 0.003) {
      const gr = (RO + 26) * U * (1 + 0.06 * swell)
      const g = mx.createRadialGradient(MARK_CX, MARK_CY, 0, MARK_CX, MARK_CY, gr)
      g.addColorStop(0, `rgba(154,123,224,${0.36 * gA})`); g.addColorStop(0.55, `rgba(154,123,224,${0.13 * gA})`); g.addColorStop(1, 'rgba(154,123,224,0)')
      mx.fillStyle = g; mx.fillRect(MARK_CX - gr, MARK_CY - gr, gr * 2, gr * 2)
    }

    mx.save()
    mx.translate(MARK_CX, MARK_CY); mx.rotate(rot); mx.scale(breathe, breathe)

    // petal-fill shimmer (faint lavender fills; overlaps make the flower)
    for (let k = 0; k < 6; k++) {
      const bp = ease.outCubic(prog(t, T(R.petal + k * R.petalGap), T(R.petal + k * R.petalGap + R.petalDur)))
      if (bp <= 0) continue
      const sh = Math.exp(-Math.pow((t - T(R.shimmer + k * 0.07)) / 0.16, 2))
      const a = (0.035 + 0.11 * sh + 0.03 * swell) * bp
      const th = (-90 + k * 60) * Math.PI / 180 - (1 - bp) * 0.9
      mx.globalCompositeOperation = 'lighter'
      mx.fillStyle = rgba(LAV, a); mx.beginPath(); mx.arc(Math.cos(th) * RP * bp * U, Math.sin(th) * RP * bp * U, RP * (0.55 + 0.45 * bp) * U, 0, Math.PI * 2); mx.fill()
      mx.globalCompositeOperation = 'source-over'
    }

    // centre circle: draws round from the top, out of the point of light
    const cp = ease.inOutCubic(prog(t, T(R.centre[0]), T(R.centre[1])))
    if (cp > 0) { ringStyle(1); mx.beginPath(); mx.arc(0, 0, RP * U, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * cp); mx.stroke() }

    // petals: each centre swings out from the middle along a curling path; the ring draws from the inner point both ways
    for (let k = 0; k < 6; k++) {
      const p = prog(t, T(R.petal + k * R.petalGap), T(R.petal + k * R.petalGap + R.petalDur))
      if (p <= 0) continue
      const e = ease.outCubic(p), d = easeOutBack(p, 1.4)
      const th = (-90 + k * 60) * Math.PI / 180 - (1 - e) * 0.9
      const cx = Math.cos(th) * RP * d * U, cy = Math.sin(th) * RP * d * U
      const r = RP * (0.55 + 0.45 * e) * U
      const inner = th + Math.PI, span = Math.PI * ease.inOutQuad(p)
      ringStyle(clamp(p * 4), 1 + 0.8 * (1 - p))
      mx.beginPath(); mx.arc(cx, cy, r, inner - span, inner + span); mx.stroke()
    }

    // outer circle: draws round from the top
    const op = ease.inOutCubic(prog(t, T(R.outer[0]), T(R.outer[1])))
    if (op > 0) { ringStyle(1, 1.2); mx.beginPath(); mx.arc(0, 0, RO * U, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * op); mx.stroke() }
    mx.shadowBlur = 0
    mx.restore()

    // the point of light (unrotated), fading as the centre ring takes over
    const lp = tw(t, [[T(R.spark), 0], [T(R.spark + 0.16), 1, ease.outBack], [T(R.centre[1]), 0.5, ease.inOutQuad], [T(R.petal + 0.7), 0, ease.inOutQuad]])
    if (lp > 0.003) {
      mx.save(); mx.globalCompositeOperation = 'lighter'
      const gr = 70 * lp
      const g = mx.createRadialGradient(MARK_CX, MARK_CY, 0, MARK_CX, MARK_CY, gr)
      g.addColorStop(0, `rgba(255,250,240,${0.95 * clamp(lp)})`); g.addColorStop(0.18, `rgba(255,236,200,${0.6 * clamp(lp)})`); g.addColorStop(1, 'rgba(201,166,255,0)')
      mx.fillStyle = g; mx.fillRect(MARK_CX - gr, MARK_CY - gr, gr * 2, gr * 2)
      const fl = 120 * lp, spin = (t - T(R.spark)) * 0.6
      mx.strokeStyle = `rgba(255,246,228,${0.8 * clamp(lp)})`; mx.lineWidth = 3; mx.lineCap = 'round'
      for (let j = 0; j < 4; j++) {
        const a = spin + j * Math.PI / 2, f = j % 2 ? fl * 0.6 : fl
        mx.beginPath(); mx.moveTo(MARK_CX, MARK_CY); mx.lineTo(MARK_CX + Math.cos(a) * f, MARK_CY + Math.sin(a) * f); mx.stroke()
      }
      mx.restore()
    }

    // chakra dots: bottom → top (always upright: the column is the axis the rotation settles onto)
    for (let i = 0; i < 7; i++) {
      const t0 = T(R.dots + i * R.dotGap)
      const p = prog(t, t0, t0 + 0.2)
      if (p <= 0) continue
      const y = MARK_CY + (3 - i) * DY * U, br = 1 + 0.06 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      const hr = 12.5 * U * ease.outCubic(p) * br
      mx.globalCompositeOperation = 'lighter'
      const g = mx.createRadialGradient(MARK_CX, y, 0, MARK_CX, y, hr)
      g.addColorStop(0, rgba(CHK[i], 0.85)); g.addColorStop(0.45, rgba(CHK[i], 0.3)); g.addColorStop(1, rgba(CHK[i], 0))
      mx.fillStyle = g; mx.fillRect(MARK_CX - hr, y - hr, hr * 2, hr * 2)
      mx.globalCompositeOperation = 'source-over'
      sphere(MARK_CX, y, tw(p, [[0, 0], [0.55, 5.4], [1, 3.7]], ease.outQuad) * U, CHK[i], 1)
    }
  }

  function drawType(t) {
    mx.textAlign = 'center'; mx.textBaseline = 'alphabetic'
    // "come": big pop at the centre, then glides to its place on the line
    const pc = prog(t, T(R.come), T(R.come + 0.34))
    if (pc > 0) {
      const g = ease.inOutCubic(prog(t, T(R.glide[0]), T(R.glide[1])))
      const pop = 0.5 + 0.5 * easeOutBack(pc, 2.6)
      const sq = t > T(R.come) ? 0.05 * Math.sin((t - T(R.come)) * 17) * Math.exp(-(t - T(R.come)) * 5) : 0
      const fs = lerp(COME_FS0, COME_FS, g)
      const sl = easeOutBack(prog(t, T(R.word - 0.16), T(R.word + 0.26)), 1.5)   // waits centred, then springs left as Align lands
      const x = lerp(W / 2, COME_X1, sl), y = lerp(COME_Y0, LINE_Y, g) + (1 - ease.outCubic(pc)) * 40 - Math.sin(Math.PI * g) * 26
      mx.save(); mx.translate(x, y); mx.scale(pop * (1 + sq), pop * (1 - sq))
      mx.globalAlpha = clamp(pc * 3)
      mx.font = `800 ${fs}px ${INTER}`
      mx.shadowColor = 'rgba(6,4,18,0.9)'; mx.shadowBlur = 30; mx.shadowOffsetY = 4
      mx.fillStyle = BONE; mx.fillText('come', 0, 0)
      mx.restore()
    }
    // wordmark "Align": de-blurs, rises, tracks in; then a light sweep
    const wp = ease.outCubic(prog(t, T(R.word), T(R.word + 0.45)))
    if (wp > 0) {
      wx.clearRect(0, 0, wc.width, wc.height)
      wx.font = `italic 400 ${WORD_FS}px ${SERIF}`; wx.textAlign = 'center'; wx.textBaseline = 'alphabetic'
      wx.letterSpacing = `${lerp(0.1, 0, wp) * WORD_FS}px`
      wx.fillStyle = BONE; wx.globalCompositeOperation = 'source-over'
      const by = WORD_FS * 1.05
      wx.fillText('Align', wc.width / 2, by)
      const sw = prog(t, T(R.sweep[0]), T(R.sweep[1]))
      if (sw > 0 && sw < 1) {
        const sx = lerp(-0.3, 1.3, ease.inOutQuad(sw)) * wc.width
        const g = wx.createLinearGradient(sx - 90, 0, sx + 90, 0)
        g.addColorStop(0, 'rgba(255,236,190,0)'); g.addColorStop(0.5, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,236,190,0)')
        wx.globalCompositeOperation = 'source-atop'; wx.fillStyle = g; wx.fillRect(0, 0, wc.width, wc.height)
        wx.globalCompositeOperation = 'source-over'
      }
      mx.save()
      mx.globalAlpha = wp
      mx.filter = wp < 1 ? `blur(${lerp(9, 0, wp).toFixed(2)}px)` : 'none'
      mx.shadowColor = 'rgba(239,230,214,0.3)'; mx.shadowBlur = 36
      mx.drawImage(wc, WORD_X - wc.width / 2 + lerp(60, 0, wp), LINE_Y - by + lerp(24, 0, wp))
      mx.restore()
    }
  }

  // "JOIN THE HOUSTON BETA": quiet Space Mono line under the phrase, fades up once "come" is fully on screen and stays
  function drawBeta(t) {
    const p = ease.outCubic(prog(t, T(BETA_T), T(BETA_T + 0.5)))
    if (p <= 0) return
    mx.save()
    mx.textAlign = 'center'; mx.textBaseline = 'alphabetic'
    mx.font = `700 ${BETA_FS}px ${MONO}`; mx.letterSpacing = `${(0.3 * BETA_FS).toFixed(1)}px`
    mx.globalAlpha = 0.72 * p
    mx.shadowColor = 'rgba(6,4,18,0.9)'; mx.shadowBlur = 16
    mx.fillStyle = BONE
    mx.fillText(cta, W / 2 + 0.15 * BETA_FS, BETA_Y + (1 - p) * 14)   // + half the trailing letter-space so it centres by eye
    mx.restore()
  }

  return {
    start: S, end: END + 0.01, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      mx.clearRect(0, 0, W, H)
      drawMark(t)
      drawType(t)
      drawBeta(t)
      fx.clearRect(0, 0, W, H)
      drawBurst(fx, SPARKS, MARK_CX, MARK_CY, t, T(R.swell), 0.9)
      drawGrain(gx, t)
      black.style.opacity = String(t >= END - 0.035 ? 1 : ease.inOutQuad(prog(t, T(R.out), END)))
    },
  }
}

export function endcardCues(start) {
  const T = k => start + k
  const PET = [587.33, 659.25, 739.99, 880, 987.77, 1174.66]          // one soft rising chime per petal
  return [
    ['pop', T(R.come), 659.25, 0.06, 0],
    ['whoosh', T(R.glide[0]), 0.45, 0.04],
    ['bell', T(R.spark), 1760, 0.02, 1.4, 0],                          // the point of light
    ['bell', T(R.centre[0]), 293.66, 0.035, 2.4, 0],                   // centre ring
    ...PET.map((f, k) => ['bell', T(R.petal + k * R.petalGap), f, 0.03, 1.8, (k - 2.5) * 0.14]),
    ['riser', T(R.outer[0] - 0.3), T(R.swell), 0.025],
    ['glitter', T(R.outer[0]), T(R.swell + 0.5)],
    // warm swell as the mark completes
    ...[146.83, 220, 293.66, 369.99].map((f, i) => ['bell', T(R.swell + i * 0.015), f, 0.035, 3.0, (i - 1.5) * 0.15]),
    ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T(R.dots + i * R.dotGap), f, 0.045, 2.0, (i - 3) * 0.12]),
    ['bell', T(R.word + 0.02), 146.83, 0.04, 3.0, 0],
    ['glitter', T(R.sweep[0]), T(R.sweep[1])],
    ['boom', T(R.out + 0.05), 0.22],
    ['bell', T(R.out + 0.06), 73.42, 0.04, 3.0, 0],
  ]
}
