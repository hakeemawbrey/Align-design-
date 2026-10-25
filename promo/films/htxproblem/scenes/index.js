// htxproblem (15 s, vertical) — "Houston, we have a problem."
//   0.0–2.8   HOOK: Mission-Control console (red beacon, "LOVE LIFE ▲ CRITICAL" readout), COMMS eyebrow, "Houston, we have a problem."
//   2.9–5.6   "Your dating life." — a phone of generic faceless profile cards swiped away faster and faster. "Swipe. Swipe. Swipe."
//   5.6–8.6   TURN: Align's mystery card (card-profile-1, aura veil) drops in on a glow, a ring of zodiac glyphs around it.
//             "The chart comes first." / "The face comes last."
//   8.6–10.45 The console returns and flips to green: "Houston, we have a solution."  → plain sky H from 10.5, end card at 10.6.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, RED, GREEN, SHADOW, MONO, GLYPH_FONT, D2R, rgba, pop01, outScale, outK, glowStroke, makeBurst, drawBurst,
  popText, drawConsole, drawController, drawGenericCard, drawPhone, CARD_HUES } from './illus.js'

export const DURATION = 15
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky H is on screen

const T = {
  hook: 0.12, hookLast: 0.7, console: 0.28, consoleOut: 2.45, hookOut: [2.6, 2.78],
  life: 2.9, phone: 2.95, phoneOut: 5.38, lifeOut: [5.42, 5.6],
  card: 5.6, land: 6.02, ring: 6.2, chart: 5.95, face: 6.9, cardOut: 8.3, chartOut: [8.36, 8.54],
  sol: 8.66, solLast: 9.0, console2: 8.62, green: 9.0, console2Out: 10.0, solOut: [10.22, 10.44],
}
// accelerating swipes
const GAPS = [0.42, 0.42, 0.34, 0.28, 0.23, 0.19, 0.16, 0.14]
const SWIPES = GAPS.reduce((a, g) => [...a, a.at(-1) + g], [3.35])
const DIRS = [-1, 1, -1, -1, 1, -1, 1, -1, -1]

async function build(stage) {
  try {
    await Promise.all(["800 150px Inter", "800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  // the mystery card art, pre-shrunk once for clean downsampling
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-1.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 900; c.height = Math.round(900 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const eyebrow = (txt, col) => {
    const e = el('div', { position: 'absolute', left: 0, width: '1080px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
      letterSpacing: '0.25em', color: col, textShadow: SHADOW, opacity: 0 }, root)
    const dot = el('span', { display: 'inline-block', width: '26px', height: '26px', borderRadius: '50%', background: col, boxShadow: `0 0 18px ${col}`, marginRight: '18px', verticalAlign: '-3px' }, e)
    el('span', {}, e, txt)
    return { e, dot }
  }
  const EYES = [[eyebrow('COMMS · CH 1', RED), 0.05, T.hookOut, true], [eyebrow('COMMS · ALL CLEAR', GREEN), T.console2, T.solOut, false]]
  const big = (text, t0, o) => popText(root, text, { top: 232, size: 150, weight: 800, accentSize: 168, at: t0, gap: 0.08, wobble: true, ...o })
  const H0 = big('Houston, | we have a | *problem.*', T.hook, { accentColor: RED, lastAt: T.hookLast })
  const H1 = popText(root, 'Your *dating* | life.', { top: 215, size: TYPE.headSize, weight: 800, at: T.life, accentColor: PINK })
  const S1 = popText(root, 'Swipe. Swipe. *Swipe.*', { top: 1615, size: TYPE.subSize, weight: 700, at: SWIPES[0], gap: 0.42, accentSize: 72, accentColor: PINK })
  const H2 = popText(root, 'The *card* | comes first.', { top: 215, size: TYPE.headSize, weight: 800, at: T.chart, accentColor: GOLD })
  const S2 = popText(root, 'The face comes *last.*', { top: 1600, size: TYPE.subSize, weight: 700, at: T.face, gap: 0.07, accentSize: 72, accentColor: PINK })
  const H3 = big('Houston, | we have a | *solution.*', T.sol, { accentColor: GREEN, lastAt: T.solLast })
  const TEXTS = [[H0, T.hookOut], [H1, T.lifeOut], [S1, T.lifeOut], [H2, T.chartOut], [S2, T.chartOut], [H3, T.solOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(500 + k, n, d)
  const B_BEACON = B(1, 10, 150), B_PROB = B(2, 10, 170), B_LAND = B(3, 14, 260), B_GREEN = B(4, 12, 200), B_SOL = B(5, 12, 200)
  const B_SW = SWIPES.map((_, i) => B(10 + i, 6, 80))

  // ── 1 + 4: the console
  function drawConsoles(t) {
    const drop = t0 => { const p = prog(t, t0, t0 + 0.42); return { dy: 1150 * ease.inCubic(p), rot: 7 * ease.inQuad(p) } }
    if (t < T.console2 - 0.05) {
      const k = pop01(t, T.console, 0.5)
      const d = drop(T.consoleOut), jolt = t > T.hookLast ? 18 * Math.sin((t - T.hookLast) * 40) * Math.exp(-(t - T.hookLast) * 6) : 0
      if (d.dy > 1100) return
      x.save(); x.translate(jolt, d.dy); x.translate(540, 1400); x.rotate(-d.rot * D2R); x.translate(-540, -1400)
      drawConsole(x, t, { k, g: 0, top: 860 })
      x.restore()
      x.save(); x.translate(0, d.dy * 1.2)
      drawController(x, t, { k: pop01(t, T.console + 0.25, 0.5), g: 0 })
      x.restore()
      drawBurst(x, B_BEACON, 540, 820, t, T.console + 0.1, RED, 0.7)
      drawBurst(x, B_PROB, 540, 610, t, T.hookLast + 0.1, RED, 0.7)
    } else {
      const k = pop01(t, T.console2, 0.45), d = drop(T.console2Out)
      const g = ease.outCubic(prog(t, T.green, T.green + 0.25))
      if (d.dy > 1100) return
      x.save(); x.translate(0, d.dy); x.translate(540, 1400); x.rotate(d.rot * D2R); x.translate(-540, -1400)
      drawConsole(x, t, { k, g, top: 860 })
      x.restore()
      x.save(); x.translate(0, d.dy * 1.2)
      drawController(x, t, { k: pop01(t, T.console2 + 0.1, 0.45), g })
      x.restore()
      drawBurst(x, B_GREEN, 540, 820, t, T.green, GREEN, 0.8)
      drawBurst(x, B_SOL, 540, 610, t, T.solLast + 0.1, GREEN, 0.7)
    }
  }

  // ── 2: the swipe phone
  const PH = { cx: 540, cy: 1060, w: 580, h: 1000 }
  function drawSwipes(t) {
    if (t < T.phone - 0.05 || t > T.phoneOut + 0.45) return
    const k = pop01(t, T.phone, 0.45) * outScale(t, T.phoneOut, 0.34)
    if (k <= 0) return
    x.save(); x.translate(PH.cx, PH.cy); x.scale(k, k); x.rotate(-3 * D2R * Math.sin(Math.max(0, t - T.phone) * 2)); x.translate(-PH.cx, -PH.cy)
    const s = drawPhone(x, PH.cx, PH.cy, PH.w, PH.h, clamp(k * 2))
    x.save(); x.beginPath(); x.roundRect(s.x, s.y, s.w, s.h, s.r); x.fillStyle = '#120d24'; x.fill(); x.clip()
    // which card is on top
    let top = 0
    while (top < SWIPES.length && t > SWIPES[top] + 0.34) top++
    const cw = 440, ch = 690, ccx = PH.cx, ccy = PH.cy + 10
    // the next card underneath (grows in as the top one leaves)
    const next = top + 1
    const sp = top < SWIPES.length ? ease.outCubic(prog(t, SWIPES[top], SWIPES[top] + 0.25)) : 1
    x.save(); x.translate(ccx, ccy + lerp(26, 0, sp)); x.scale(lerp(0.92, 1, sp), lerp(0.92, 1, sp)); x.globalAlpha = lerp(0.6, 1, sp)
    drawGenericCard(x, cw, ch, CARD_HUES[next % CARD_HUES.length]); x.restore()
    // the top card, flicked away with ghost trails (motion blur)
    if (top < SWIPES.length) {
      const dur = Math.min(0.34, (GAPS[top] ?? 0.14) * 1.2)
      const dir = DIRS[top]
      for (let j = 4; j >= 0; j--) {
        const p = ease.inCubic(prog(t - j * 0.018, SWIPES[top], SWIPES[top] + dur))
        if (j > 0 && p <= 0.02) continue
        x.save(); x.globalAlpha = j ? 0.22 : 1
        x.translate(ccx + dir * 760 * p, ccy - 60 * p); x.rotate(dir * 30 * p * D2R)
        drawGenericCard(x, cw, ch, CARD_HUES[top % CARD_HUES.length])
        // the swipe stamp: ✕ (left) / ♥ (right)
        const sk = clamp(prog(t, SWIPES[top] - 0.05, SWIPES[top] + 0.06))
        if (!j && sk > 0) {
          x.rotate(-dir * 14 * D2R); x.globalAlpha = sk
          const col = dir < 0 ? RED : GREEN
          x.font = `800 120px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 24
          x.fillText(dir < 0 ? '✕' : '♥', -dir * 110, -ch * 0.28)
        }
        x.restore()
      }
    }
    x.restore()
    x.restore()
    SWIPES.forEach((s0, i) => drawBurst(x, B_SW[i], PH.cx + DIRS[i] * 330, PH.cy - 80, t, s0 + 0.12, DIRS[i] < 0 ? RED : GREEN, 0.5))
  }

  // ── 3: the mystery card on its aura, a ring of zodiac glyphs around it
  const CARD = { cx: 540, cy: 1060, h: 860 }
  function drawMystery(t) {
    if (t < T.card || t > T.cardOut + 0.5) return
    const out = outScale(t, T.cardOut, 0.36)
    if (out <= 0) return
    const dp = prog(t, T.card, T.land)
    const y = lerp(-700, CARD.cy, easeOutBack(dp, 1.4)) + 10 * Math.sin((t - T.land) * 2.2) * clamp((t - T.land) * 2)
    const sinceLand = t - T.land
    const squash = sinceLand > 0 && sinceLand < 0.35 ? 1 - 0.09 * Math.sin(Math.PI * sinceLand / 0.35) : 1
    // aura glow
    const ak = ease.outCubic(prog(t, T.land - 0.15, T.land + 0.5)) * out
    if (ak > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const R = 620 * (0.85 + 0.15 * ak) * (1 + 0.04 * Math.sin(t * 3))
      const g = x.createRadialGradient(CARD.cx, CARD.cy, 40, CARD.cx, CARD.cy, R)
      g.addColorStop(0, rgba('#ff6fa8', 0.55 * ak)); g.addColorStop(0.4, rgba('#b45cf0', 0.24 * ak)); g.addColorStop(1, rgba('#7c74f0', 0))
      x.fillStyle = g; x.beginPath(); x.arc(CARD.cx, CARD.cy, R, 0, Math.PI * 2); x.fill()
      // slow rays
      x.translate(CARD.cx, CARD.cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(Math.PI / 6)
        const rg = x.createLinearGradient(0, 0, 0, -760); rg.addColorStop(0, rgba(GOLD, 0.16 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-18, 0); x.lineTo(-70, -760); x.lineTo(70, -760); x.lineTo(18, 0); x.fill()
      }
      x.restore()
    }
    // ring of glyphs (the chart comes first)
    const RR = 440
    const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * out
    if (ringK > 0) {
      x.save(); glowStroke(x, BONE, 3, 10); x.globalAlpha = 0.45 * ringK; x.beginPath(); x.arc(CARD.cx, CARD.cy, RR, 0, Math.PI * 2); x.stroke(); x.restore()
    }
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 66px ${GLYPH_FONT}`
    SIGNS.forEach((s, i) => {
      const k = pop01(t, T.ring + i * 0.045, 0.36) * out
      if (k <= 0) return
      const a = (i * 30 + 15) * D2R + t * 0.18
      const px = CARD.cx + Math.cos(a) * RR, py = CARD.cy + Math.sin(a) * RR
      x.save(); x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
    })
    x.restore()
    // the card
    if (cardBmp) {
      const h = CARD.h * out, w = h * cardBmp.width / cardBmp.height
      x.save(); x.translate(CARD.cx, y - (1 - out) * 200); x.rotate(lerp(-14, 0, ease.outCubic(dp)) * D2R + (1 - out) * 0.2)
      x.scale(1 / squash, squash); x.globalAlpha = clamp(out * 2)
      x.drawImage(cardBmp, -w / 2, -h / 2, w, h)
      x.restore()
    }
    drawBurst(x, B_LAND, CARD.cx, CARD.cy, t, T.land, GOLD, 0.9)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) { drawConsoles(t); drawSwipes(t); drawMystery(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [{ e, dot }, t0, o, blinks] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.3)), k = p * outK(t, o)
        e.style.display = k <= 0 ? 'none' : 'block'
        e.style.opacity = String(k); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
        dot.style.opacity = String(blinks ? (Math.sin(t * Math.PI * 2 * 2.2) > -0.1 ? 1 : 0.2) : 1)
      }
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   2.84 hook console gone (2.78) → "Your dating life." (2.9)       · 5.58 phone shrinking out → the mystery card drops (5.6)
//   8.60 mystery card out (8.66) → the console returns (8.62)       · the end card does its own card flip at 10.6
const CUTS = [{ t: 2.84, kind: 'flip' }, { t: 5.58, kind: 'deal' }, { t: 8.6, kind: 'fan' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (D major pentatonic-ish pops on the 108 bpm grid)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const beeps = (a, b) => { const o = []; for (let k = Math.ceil(a * 2.2); k / 2.2 < b; k++) o.push(['bell', r3(k / 2.2 + 0.02), k % 2 ? 784 : 988, 0.022, 0.25, 0]); return o }
export const CUES = [
  // hook
  ...wordPops(T.hook, 4, 0.08, 0),
  ['boom', T.hookLast, 0.22], ['pop', T.hookLast, 440, 0.06, 0], ['pluck', T.hookLast, 293.66, 0.05, 0.6, 0],
  ['pop', T.console, 587.33, 0.05, 0],
  ...beeps(0.3, 2.5),
  ['whoosh', T.consoleOut, 0.4, 0.035],
  // dating life
  ...wordPops(T.life, 3, 0.07, 2),
  ['pop', T.phone, 880, 0.05, 0],
  ...SWIPES.map((s, i) => ['whoosh', r3(s), 0.22, 0.03 + 0.002 * i]),
  ...SWIPES.map((s, i) => ['tick', r3(s + 0.04), 0.035]),
  ...[0, 1, 2].map(i => ['pop', r3(SWIPES[0] + i * 0.42), NOTE[3 + i], 0.045, (i - 1) * 0.3]),
  ['whoosh', T.phoneOut, 0.35, 0.035],
  // the turn
  ['whoosh', T.card, 0.42, 0.045],
  ['pop', T.land, 587.33, 0.07, 0], ['pluck', T.land, 880, 0.055, 0.8, 0], ['bell', T.land + 0.05, 1174.66, 0.04, 1.6, 0], ['glitter', T.land, T.land + 0.7],
  ...wordPops(T.chart, 4, 0.07, 1, 0.026),
  ...SIGNS.map((_, i) => ['pop', r3(T.ring + i * 0.045), NOTE[i % NOTE.length] * 1.5, 0.018, (i % 2 ? 0.25 : -0.25)]),
  ...wordPops(T.face, 4, 0.07, 3, 0.026),
  ['pluck', T.face + 0.21, 1318.51, 0.045, 0.6, 0.2],
  ['whoosh', T.cardOut, 0.45, 0.04],
  // solution
  ['riser', 7.6, T.solLast, 0.05],
  ['pop', T.console2, 587.33, 0.05, 0],
  ...wordPops(T.sol, 4, 0.08, 2),
  ['bell', T.solLast, 587.33, 0.06, 2.0, -0.2], ['bell', T.solLast + 0.06, 739.99, 0.05, 2.0, 0], ['bell', T.solLast + 0.12, 880, 0.05, 2.0, 0.2],
  ['pluck', T.solLast, 1174.66, 0.055, 0.8, 0], ['glitter', T.solLast, T.solLast + 0.8],
  ['whoosh', T.console2Out, 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
