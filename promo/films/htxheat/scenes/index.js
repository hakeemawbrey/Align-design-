// htxheat (15 s, vertical) — "Houston summer: you sweat walking to the car."
//   0.0–3.3   HOOK: a hot, orange-tinted sky; a big sun in sunglasses bobs smugly on the beat over a heat-shimmer street.
//             A gold pictogram walks to a parked car, sweat flying, slowly melting; touches the door handle (sizzle!) and
//             collapses into a puddle. "Houston summer: | you sweat | walking to the car."
//   3.38–5.42 "Too hot to waste a night | on the wrong person." The sun sets (its sunglasses pop off and fly away); a café
//             table at dusk: our gold person waits while a grey date stares at a phone and replies "k." The candle melts.
//   5.45–8.38 TURN (ON ALIGN): "Dealbreakers | come first." A DEALBREAKERS card pops in; two red stamps slam on the beat:
//             "✕ FLAKY PLANS", "✕ ONE-WORD TEXTS". "Said before the first date."
//   8.42–10.45 "Save your | evenings." Night. The puddle springs back up into our person, the sunglasses fall from the sky
//             onto their head, and a pink pictogram pops in beside them with a little gold spark between.
//   10.5→      plain sky H only; the end card ("come" + the seed-of-life logo + Align) takes over at 10.6.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, CYAN, INTER, MONO, SHADOW, D2R, rgba, mixHex, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText } from './kit.js'

export const DURATION = 15
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky H is on screen
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const RED = '#ff4d4a', FIRE = '#ff7a3a', SUN = '#ffc93a', DARK = '#140f2a', GREY = '#8d88a8', INK = '#1a1430'

export const T = {
  summer: 0.08, hook: 0.42, hookLast: beat(1.5), hookOut: [3.12, 3.3],
  sun: 0.15, walk: [0.35, 2.4], touch: 2.45, melt: [2.5, 3.05], hookIllOut: [3.0, 3.35],
  waste: 3.38, wasteLast: 3.86, set: [3.3, 4.05], glassesOff: 3.55, dusk: [3.3, 5.0],
  table: 3.75, date: 3.85, k: beat(6.5), kTwo: beat(8), wasteOut: [5.24, 5.42], tableOut: 5.1,
  turn: 5.45, turnLast: 5.82, card: 5.5, stamp1: beat(9.5), stamp2: beat(11), sub: 6.98, cardOut: 8.1, turnOut: [8.2, 8.38],
  save: 8.42, saveLast: beat(14.5), rise: [8.55, 9.05], glassesOn: 9.32, partner: 9.6, spark: 9.85, endOut: 10.08, saveOut: [10.15, 10.42],
}
const HS = 0.84                            // the hook walker's scale
const GY = 1700                               // the street's kerb line
const SUN0 = { x: 540, y: 1005, R: 118 }
const CAR = { x: 850, w: 440 }
const NOTE = [493.88, 587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]   // B minor pentatonic

// ── shapes
function dropPath(x, cx, cy, r) {           // a teardrop, point up
  x.beginPath(); x.moveTo(cx, cy - r * 2.1)
  x.bezierCurveTo(cx + r * 0.4, cy - r * 1.2, cx + r, cy - r * 0.6, cx + r, cy)
  x.arc(cx, cy, r, 0, Math.PI); x.bezierCurveTo(cx - r, cy - r * 0.6, cx - r * 0.4, cy - r * 1.2, cx, cy - r * 2.1); x.closePath()
}
function drawDrop(x, cx, cy, r, col = CYAN, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; dropPath(x, cx, cy, r); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 14; x.fill()
  x.shadowBlur = 0; x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.15, r * 0.25, 0, Math.PI * 2); x.fill(); x.restore()
}

/** sunglasses, centred at (0,0), ~2·R wide */
function drawShades(x, R, a = 1) {
  x.save(); x.globalAlpha *= a
  const lw = R * 0.68, lh = R * 0.46, gap = R * 0.12
  x.strokeStyle = INK; x.lineWidth = R * 0.1; x.lineCap = 'round'
  x.beginPath(); x.moveTo(-gap - 4, -lh * 0.28); x.quadraticCurveTo(0, -lh * 0.5, gap + 4, -lh * 0.28); x.stroke()
  x.beginPath(); x.moveTo(-gap - lw, -lh * 0.32); x.lineTo(-gap - lw - R * 0.2, -lh * 0.5); x.moveTo(gap + lw, -lh * 0.32); x.lineTo(gap + lw + R * 0.2, -lh * 0.5); x.stroke()
  for (const sd of [-1, 1]) {
    x.save(); x.translate(sd * (gap + lw / 2), 0)
    x.beginPath(); x.moveTo(-lw / 2, -lh / 2); x.lineTo(lw / 2, -lh / 2); x.quadraticCurveTo(lw / 2 + 2, lh * 0.4, lw * 0.1, lh / 2); x.quadraticCurveTo(-lw / 2, lh * 0.55, -lw / 2, -lh / 2); x.closePath()
    x.fillStyle = '#0c0818'; x.fill(); x.lineWidth = R * 0.07; x.strokeStyle = '#000'; x.stroke()
    x.save(); x.clip(); x.fillStyle = rgba(PINK, 0.55); x.beginPath(); x.moveTo(-lw * 0.3, -lh); x.lineTo(-lw * 0.05, -lh); x.lineTo(-lw * 0.45, lh); x.lineTo(-lw * 0.7, lh); x.fill()
    x.fillStyle = rgba(CYAN, 0.35); x.beginPath(); x.moveTo(lw * 0.05, -lh); x.lineTo(lw * 0.16, -lh); x.lineTo(-lw * 0.24, lh); x.lineTo(-lw * 0.35, lh); x.fill(); x.restore()
    x.restore()
  }
  x.restore()
}

/** the sun: rays rotating and pumping on the beat; glasses optional (drawn separately when they fly) */
function drawSun(x, cx, cy, R, t, { a = 1, shades = true, hot = 1 } = {}) {
  if (a <= 0) return
  const u = (t - B0) / BEAT, ph = u - Math.floor(u)
  const pump = 1 + 0.06 * Math.exp(-ph * 5) * (t > B0 ? 1 : 0)
  x.save(); x.translate(cx, cy); x.globalAlpha *= a
  // glow
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 3.4); g.addColorStop(0, rgba(SUN, 0.5 * hot)); g.addColorStop(0.45, rgba(FIRE, 0.18 * hot)); g.addColorStop(1, rgba(FIRE, 0))
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R * 3.4, 0, Math.PI * 2); x.fill(); x.restore()
  // rays
  x.save(); x.rotate(t * 0.5)
  for (let i = 0; i < 12; i++) {
    const a0 = (i / 12) * Math.PI * 2, long = i % 2 === 0
    const r0 = R * 1.22, r1 = R * (long ? 1.72 : 1.5) * pump
    glowStroke(x, long ? SUN : FIRE, long ? 22 : 16, 18)
    x.beginPath(); x.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0); x.lineTo(Math.cos(a0) * r1, Math.sin(a0) * r1); x.stroke()
  }
  x.restore()
  // body
  x.scale(pump, 1 / pump)
  const bg = x.createRadialGradient(-R * 0.3, -R * 0.35, R * 0.1, 0, 0, R)
  bg.addColorStop(0, '#fff2a8'); bg.addColorStop(0.55, SUN); bg.addColorStop(1, FIRE)
  x.fillStyle = bg; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  glowStroke(x, BONE, 8, 24); x.stroke(); x.shadowBlur = 0
  if (shades) { x.save(); x.translate(0, -R * 0.12); x.rotate(-6 * D2R + 5 * D2R * Math.sin(Math.PI * Math.min(1, ph * 2))); drawShades(x, R); x.restore() }
  // a smug little smirk is a face — so no mouth; just a highlight
  x.restore()
}

/** a pictogram person (no face). Units: feet at 0, head centre −510. pose: walk | stand | phone | cross | joy */
function drawPerson(x, { px, gy, s = 1, col = GOLD, pose = 'stand', phase = 0, melt = 0, a = 1, k = 1, lean = 0 }) {
  if (k <= 0 || a <= 0) return
  const m = clamp(melt)
  x.save(); x.translate(px, gy)
  x.scale(s * k * (1 + 0.55 * m), s * k * (1 - 0.86 * m))
  x.rotate(lean * D2R)
  x.globalAlpha *= a * clamp(k * 2) * (1 - clamp((m - 0.82) / 0.18))
  const walkA = pose === 'walk' ? 0.42 * Math.sin(phase) : 0
  const bob = pose === 'walk' ? -12 * Math.abs(Math.sin(phase)) : 0
  x.translate(0, bob)
  const hipY = -230, shY = -425, headY = -510
  const legs = [-1, 1].map(sd => { const an = sd * walkA; return { hip: { x: sd * 30, y: hipY }, ft: { x: sd * 30 + Math.sin(an) * 200, y: hipY + Math.cos(an) * 200 } } })
  let arms
  if (pose === 'phone') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 82, y: shY + 140 }, { x: sd * 22, y: shY + 92 }] }))
  else if (pose === 'cross') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 86, y: shY + 112 }, { x: -sd * 40, y: shY + 100 }] }))
  else if (pose === 'joy') arms = [-1, 1].map(sd => ({ pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 120, y: shY - 70 }, { x: sd * 150, y: shY - 170 }] }))
  else arms = [-1, 1].map(sd => { const an = -sd * walkA * 1.1; return { pts: [{ x: sd * 56, y: shY + 20 }, { x: sd * 64 + Math.sin(an) * 100, y: shY + 20 + Math.cos(an) * 100 }, { x: sd * 64 + Math.sin(an * 1.3) * 190, y: shY + 20 + Math.cos(an * 1.3) * 186 }] } })
  for (const pass of [0, 1]) {
    x.save()
    const grow = pass ? 0 : 7
    if (!pass) { x.strokeStyle = BONE; x.fillStyle = BONE; x.shadowColor = rgba(col, 0.8); x.shadowBlur = 18 } else { x.strokeStyle = DARK; x.fillStyle = DARK }
    x.lineCap = 'round'; x.lineJoin = 'round'
    x.lineWidth = 46 + grow * 2
    for (const l of legs) { x.beginPath(); x.moveTo(l.hip.x, l.hip.y); x.lineTo(l.ft.x, l.ft.y - 20); x.stroke() }
    const drawArms = () => { x.lineWidth = 36 + grow * 2; for (const ar of arms) { x.beginPath(); x.moveTo(ar.pts[0].x, ar.pts[0].y); for (const p of ar.pts.slice(1)) x.lineTo(p.x, p.y); x.stroke() } }
    if (pose !== 'cross' && pose !== 'phone') drawArms()
    if (pass) x.fillStyle = col
    x.beginPath(); x.roundRect(-70 - grow, shY - grow, 140 + grow * 2, hipY - shY + 30 + grow * 2, [50 + grow, 50 + grow, 20 + grow, 20 + grow]); x.fill()
    if (pass) x.fillStyle = DARK
    x.beginPath(); x.arc(0, headY, 52 + grow, 0, Math.PI * 2); x.fill()
    if (pose === 'cross' || pose === 'phone') drawArms()
    x.restore()
  }
  if (pose === 'phone') {        // the phone's cold glow
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, shY + 70, 4, 0, shY + 40, 150); g.addColorStop(0, rgba(CYAN, 0.6)); g.addColorStop(1, rgba(CYAN, 0))
    x.fillStyle = g; x.beginPath(); x.arc(0, shY + 40, 150, 0, Math.PI * 2); x.fill(); x.restore()
    x.fillStyle = '#dff6ff'; x.shadowColor = CYAN; x.shadowBlur = 20; x.beginPath(); x.roundRect(-22, shY + 52, 44, 70, 8); x.fill(); x.shadowBlur = 0
  }
  x.restore()
}

/** the puddle a melted person leaves */
function drawPuddle(x, cx, gy, w, col, a = 1) {
  if (a <= 0 || w <= 1) return
  x.save(); x.globalAlpha *= a
  x.beginPath(); x.ellipse(cx, gy - 4, w, w * 0.16 + 6, 0, 0, Math.PI * 2)
  x.fillStyle = mixHex(col, DARK, 0.15); x.fill(); glowStroke(x, BONE, 5, 16); x.stroke(); x.shadowBlur = 0
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(cx - w * 0.35, gy - 8, w * 0.18, 4, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** a parked car, side view, nose left, sitting on gy */
function drawCar(x, cx, gy, w, t, a = 1, sizzle = 0) {
  if (a <= 0) return
  const h = w * 0.42
  x.save(); x.translate(cx, gy); x.globalAlpha *= a
  x.beginPath()
  x.moveTo(-w * 0.5, -h * 0.25); x.quadraticCurveTo(-w * 0.5, -h * 0.55, -w * 0.38, -h * 0.58)
  x.lineTo(-w * 0.22, -h * 0.62); x.quadraticCurveTo(-w * 0.12, -h * 1.0, w * 0.06, -h * 1.0); x.lineTo(w * 0.24, -h * 1.0)
  x.quadraticCurveTo(w * 0.36, -h * 0.98, w * 0.42, -h * 0.62); x.quadraticCurveTo(w * 0.52, -h * 0.58, w * 0.5, -h * 0.25)
  x.lineTo(w * 0.5, -h * 0.12); x.lineTo(-w * 0.5, -h * 0.12); x.closePath()
  x.fillStyle = '#3a2150'; x.fill(); glowStroke(x, PINK, 7, 18); x.stroke(); x.shadowBlur = 0
  // windows
  x.fillStyle = rgba(CYAN, 0.28)
  x.beginPath(); x.moveTo(-w * 0.18, -h * 0.64); x.quadraticCurveTo(-w * 0.1, -h * 0.9, w * 0.04, -h * 0.9); x.lineTo(w * 0.04, -h * 0.64); x.closePath(); x.fill()
  x.beginPath(); x.moveTo(w * 0.09, -h * 0.64); x.lineTo(w * 0.09, -h * 0.9); x.lineTo(w * 0.23, -h * 0.9); x.quadraticCurveTo(w * 0.32, -h * 0.88, w * 0.36, -h * 0.64); x.closePath(); x.fill()
  // a heat glare streak on the roof
  x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(-w * 0.02, -h * 0.94); x.lineTo(w * 0.18, -h * 0.94); x.stroke()
  // door handle (glows red hot when touched)
  x.fillStyle = sizzle > 0 ? mixHex(BONE, RED, sizzle) : BONE
  if (sizzle > 0) { x.shadowColor = RED; x.shadowBlur = 30 * sizzle }
  x.beginPath(); x.roundRect(-w * 0.12, -h * 0.5, w * 0.1, 10, 5); x.fill(); x.shadowBlur = 0
  // wheels
  for (const wx of [-w * 0.3, w * 0.3]) {
    x.fillStyle = '#0a0716'; x.beginPath(); x.arc(wx, -h * 0.12, h * 0.25, 0, Math.PI * 2); x.fill()
    glowStroke(x, BONE, 5, 10); x.stroke(); x.shadowBlur = 0
    x.fillStyle = GREY; x.beginPath(); x.arc(wx, -h * 0.12, h * 0.1, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

/** wavy heat-shimmer lines rising from a band */
function drawShimmer(x, x0, x1, yBase, t, a, n = 5, rise = 260) {
  if (a <= 0) return
  x.save(); x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const s = ((t * 0.55 + i / n) % 1)
    const y = yBase - s * rise
    x.globalAlpha = a * Math.sin(Math.PI * s) * 0.55
    x.strokeStyle = i % 2 ? rgba(SUN, 1) : rgba(BONE, 1); x.lineWidth = 5
    x.beginPath()
    for (let px = x0; px <= x1; px += 12) { const yy = y + 9 * Math.sin(px * 0.035 + t * 6 + i * 1.7); px === x0 ? x.moveTo(px, yy) : x.lineTo(px, yy) }
    x.stroke()
  }
  x.restore()
}

/** a chat bubble with a tail at bottom-right */
function drawChat(x, cx, cy, w, h, text, k, fillC = '#d8d4ea') {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  x.moveTo(w * 0.22, h / 2 - 2); x.lineTo(w * 0.36, h / 2 + h * 0.42); x.lineTo(w * 0.05, h / 2 - 2)
  x.fillStyle = fillC; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
  glowStroke(x, BONE, 5, 14); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.stroke(); x.shadowBlur = 0
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${Math.round(h * 0.56)}px ${INTER}`; x.fillText(text, 0, 2)
  x.restore()
}

/** the illustrated DEALBREAKERS card (not app UI): dark glass, gold rim, two chip rows */
function drawDealCard(x, w, h) {
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.94)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.fill()
  x.shadowOffsetY = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(FIRE, 0.24)); gr.addColorStop(1, rgba(FIRE, 0.03))
  x.fillStyle = gr; x.fill()
  glowStroke(x, GOLD, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.stroke()
  x.shadowBlur = 0; x.lineWidth = 2; x.globalAlpha *= 0.4; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 26); x.stroke(); x.globalAlpha /= 0.4
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 74)
  x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.3, -h / 2 + 118); x.lineTo(w * 0.3, -h / 2 + 118); x.stroke()
  for (const [y, cw] of [[-60, w * 0.74], [150, w * 0.68]]) {
    x.strokeStyle = rgba(BONE, 0.45); x.lineWidth = 4; x.beginPath(); x.roundRect(-cw / 2, y - 44, cw, 88, 44); x.stroke()
    x.fillStyle = rgba(BONE, 0.16); x.beginPath(); x.roundRect(-cw / 2 + 34, y - 8, cw - 68, 16, 8); x.fill()
  }
}

/** a rubber stamp "✕ TEXT" */
function drawStamp(x, text, a) {
  x.save(); x.globalAlpha *= a
  x.font = `900 60px ${INTER}`
  const tw = x.measureText(text).width, w = tw + 90, h = 128
  x.strokeStyle = RED; x.lineWidth = 11; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 26
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.stroke()
  x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); x.stroke()
  x.fillStyle = 'rgba(30,8,20,0.82)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.fill()
  x.shadowBlur = 14; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 3)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 130px Inter", "800 150px Inter", "900 60px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "italic 500 180px 'EB Garamond'", "700 38px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: '1080px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('ON ALIGN'), T.turn, T.turnOut]]

  // ── type
  const H0a = popText(root, 'Houston *summer:*', { top: 176, size: 104, weight: 800, accentSize: 120, accentColor: SUN, at: T.summer, gap: 0.12 })
  const H0 = popText(root, 'you sweat | *walking* | *to* *the* *car.*', { top: 300, size: 132, weight: 800, accentSize: 150, accentColor: FIRE, at: T.hook, gap: 0.09, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'Too hot to waste | a night on the | *wrong* *person.*', { top: 190, size: 108, weight: 800, accentSize: 132, accentColor: PINK, at: T.waste, gap: 0.05, lastAt: T.wasteLast, wobble: true })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 210, size: 120, weight: 800, accentSize: 150, accentColor: GOLD, at: T.turn, gap: 0.1, lastAt: T.turnLast, wobble: true })
  const S2 = popText(root, 'Said *before* the first date.', { top: 1555, size: 64, weight: 700, accentSize: 78, accentColor: PINK, at: T.sub, gap: 0.07 })
  const H3 = popText(root, 'Save your | *evenings.*', { top: 230, size: 150, weight: 800, accentSize: 190, accentColor: GOLD, at: T.save, gap: 0.1, lastAt: T.saveLast, wobble: true })
  const TEXTS = [[H0a, T.hookOut], [H0, T.hookOut], [H1, T.wasteOut], [H2, T.turnOut], [S2, T.turnOut], [H3, T.saveOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(900 + k, n, d)
  const B_SUN = B(1, 10, 240), B_HOOK = B(2, 10, 200), B_SIZZ = B(3, 10, 140), B_SPLAT = B(4, 12, 220), B_OFF = B(5, 9, 150)
  const B_K = B(6, 8, 120), B_CARD = B(7, 10, 300), B_ST1 = B(8, 14, 330), B_ST2 = B(9, 14, 330), B_RISE = B(10, 12, 220), B_COOL = B(11, 10, 160), B_PART = B(12, 8, 140), B_SPARK = B(13, 12, 180)

  // ── the backdrop: heat tint over the night sky, then dusk, then night
  function drawTint(t) {
    const heat = 1 - ease.inOutQuad(prog(t, T.dusk[0], T.dusk[1] - 0.5))
    const dusk = Math.sin(Math.PI * prog(t, T.dusk[0], T.dusk[1] + 0.3))
    if (heat > 0.01) {
      const g = x.createLinearGradient(0, 0, 0, 1920)
      g.addColorStop(0, rgba('#ff7a3a', 0.22 * heat)); g.addColorStop(0.55, rgba('#ff8a3a', 0.42 * heat)); g.addColorStop(1, rgba('#ffb347', 0.5 * heat))
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    }
    if (dusk > 0.01) {
      const g = x.createLinearGradient(0, 700, 0, 1920)
      g.addColorStop(0, rgba('#c04a9a', 0)); g.addColorStop(0.7, rgba('#e0507a', 0.42 * dusk)); g.addColorStop(1, rgba('#ff8a4a', 0.5 * dusk))
      x.fillStyle = g; x.fillRect(0, 700, 1080, 1220)
    }
  }
  // the street: kerb line, asphalt, dashes; shimmer while it's hot
  function streetK(t) {
    const inK = ease.outCubic(prog(t, 0.0, 0.45))
    const turnDim = 1 - 0.75 * ease.inOutQuad(prog(t, T.tableOut, T.turn)) + 0.75 * ease.inOutQuad(prog(t, T.turnOut[0], T.save + 0.2))
    return inK * turnDim * outK(t, [T.endOut, T.saveOut[1]])
  }
  function drawStreet(t) {
    const k = streetK(t)
    if (k <= 0) return
    const rise = (1 - ease.outCubic(prog(t, 0, 0.5))) * 140
    x.save(); x.translate(0, rise); x.globalAlpha = k
    const g = x.createLinearGradient(0, GY, 0, 1920); g.addColorStop(0, '#2a1a3e'); g.addColorStop(1, '#120b24')
    x.fillStyle = g; x.fillRect(0, GY, 1080, 1920 - GY + 160)
    glowStroke(x, BONE, 7, 18); x.beginPath(); x.moveTo(0, GY); x.lineTo(1080, GY); x.stroke(); x.shadowBlur = 0
    x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 3; x.beginPath(); x.moveTo(0, GY + 40); x.lineTo(1080, GY + 40); x.stroke()
    x.strokeStyle = rgba(SUN, 0.8); x.lineWidth = 12; x.lineCap = 'round'
    const off = (t * 40) % 220
    for (let px = -off; px < 1180; px += 220) { x.beginPath(); x.moveTo(px, 1830); x.lineTo(px + 110, 1830); x.stroke() }
    x.restore()
    const heat = 1 - prog(t, T.dusk[0], T.dusk[0] + 1)
    drawShimmer(x, 40, 1040, GY - 10 + rise, t, heat * k, 5, 300)
    drawShimmer(x, 40, 1040, 1900 + rise, t + 0.4, heat * k * 0.7, 3, 160)
  }

  // ── 1: the sun + the walk to the car
  function sunPos(t) {
    const sp = ease.inCubic(prog(t, ...T.set))
    return { x: SUN0.x, y: lerp(SUN0.y + (1 - ease.outCubic(prog(t, T.sun, T.sun + 0.6))) * 500, GY + 260, sp), sp }
  }
  function drawSunLayer(t) {
    if (t > T.set[1] + 0.05) return
    const k = pop01(t, T.sun, 0.5)
    if (k <= 0) return
    const { x: sx, y: sy, sp } = sunPos(t)
    const shadesOn = t < T.glassesOff
    x.save(); x.beginPath(); x.rect(0, 0, 1080, GY); x.clip()
    drawSun(x, sx, sy, SUN0.R * k * lerp(1, 1.25, sp), t, { shades: shadesOn, hot: 1 - sp * 0.4 })
    x.restore()
    drawBurst(x, B_SUN, sx, sy, t, T.sun + 0.3, SUN, 0.7)
  }
  // the sunglasses' own trip: pop off the setting sun, fly up and away; fall back down at the end onto our person
  function drawFlyingShades(t) {
    if (t >= T.glassesOff && t < T.glassesOff + 0.75) {
      const p = prog(t, T.glassesOff, T.glassesOff + 0.75)
      const { x: sx, y: sy } = sunPos(T.glassesOff)
      const gx0 = sx + 620 * ease.outCubic(p), gy0 = sy - SUN0.R * 0.15 - 260 * Math.sin(Math.PI * p * 0.7) - 500 * p * p
      x.save(); x.translate(gx0, gy0); x.rotate(720 * p * D2R); drawShades(x, SUN0.R * 1.1); x.restore()
      drawBurst(x, B_OFF, sx, sy - 20, t, T.glassesOff, SUN, 0.6)
    }
  }

  const walkX = t => lerp(130, 570, ease.inOutQuad(prog(t, ...T.walk)))
  function drawWalk(t) {
    if (t > T.hookIllOut[1] + 0.05) return
    const out = outK(t, T.hookIllOut)
    const carK = pop01(t, 0.25, 0.45) * out
    const sizz = t > T.touch ? Math.exp(-(t - T.touch) * 3) : 0
    // heat waves off the car roof
    drawCar(x, CAR.x, GY, CAR.w, t, clamp(carK * 2), sizz)
    drawShimmer(x, CAR.x - 120, CAR.x + 140, GY - 180, t + 0.2, carK * 0.9 * (1 - prog(t, T.dusk[0], T.dusk[0] + 0.5)), 3, 180)
    const k = pop01(t, 0.2, 0.42) * out
    if (k <= 0) return
    const px = walkX(t)
    const walking = t < T.walk[1]
    const phase = (t - T.walk[0]) * 9.4
    const melt = 0.22 * ease.inQuad(prog(t, T.walk[0] + 0.3, T.touch)) + 0.78 * ease.inCubic(prog(t, ...T.melt))
    const wob = Math.sin(t * 14) * 3 * prog(t, 1.2, T.touch)
    const pose = walking ? 'walk' : 'stand'
    drawPuddle(x, px, GY, (40 + 220 * melt) * HS * (melt > 0.05 ? 1 : 0), GOLD, k)
    drawPerson(x, { px, gy: GY, s: HS, col: GOLD, pose, phase, melt, k, lean: wob + (walking ? 6 : 0) })
    // sweat: drops fly off the head, more as it gets hotter
    const headY = GY - 520 * HS * (1 - 0.86 * melt)
    for (let i = 0; i < 10; i++) {
      const t0 = 0.6 + i * 0.24
      const p = prog(t, t0, t0 + 0.55)
      if (p <= 0 || p >= 1) continue
      const sd = i % 2 ? 1 : -1, v = 0.8 + (i % 3) * 0.25
      const dx = sd * (60 + 150 * p * v), dy = -90 * Math.sin(Math.PI * p * 0.8) * v + 260 * p * p
      drawDrop(x, walkX(t0) + dx * 0.9, headY + dy, 13, CYAN, (1 - p) * k)
    }
    // the sizzle on the door handle + steam
    if (t > T.touch - 0.02) {
      const hx = CAR.x - CAR.w * 0.07, hy = GY - CAR.w * 0.42 * 0.5
      drawBurst(x, B_SIZZ, hx, hy, t, T.touch, RED, 0.5)
      for (let i = 0; i < 4; i++) {
        const p = prog(t, T.touch + i * 0.08, T.touch + 0.7 + i * 0.08)
        if (p <= 0 || p >= 1) continue
        x.save(); x.globalAlpha = (1 - p) * 0.8 * out; glowStroke(x, BONE, 6, 10)
        x.beginPath(); x.arc(hx - 30 + i * 22 + 20 * Math.sin(p * 8 + i), hy - 40 - 160 * p, 14 + 26 * p, 0, Math.PI * 2); x.stroke(); x.restore()
      }
    }
    drawBurst(x, B_SPLAT, px, GY - 20, t, T.melt[1] - 0.12, GOLD, 0.7)
    drawBurst(x, B_HOOK, 540, 560, t, T.hookLast + 0.12, FIRE, 0.7)
  }

  // ── 2: café table at dusk; a grey date on their phone ("k."), the candle melting
  const TB = { x: 540, top: 1480, w: 640 }
  function drawTable(t) {
    if (t < T.table || t > T.tableOut + 0.4) return
    const out = outScale(t, T.tableOut, 0.3)
    const tk = pop01(t, T.table, 0.4) * out
    if (tk <= 0) return
    const ka = pop01(t, T.date, 0.42) * out, kb = pop01(t, T.date + 0.12, 0.42) * out
    // the two of them (bodies behind the table)
    const sigh = Math.sin(Math.max(0, t - T.kTwo) * 6) * Math.exp(-Math.max(0, t - T.kTwo) * 2) * 8
    drawPerson(x, { px: 300, gy: 1640, s: 0.8, col: GOLD, pose: 'cross', k: ka, lean: t > T.kTwo ? -4 + sigh : 0 })
    drawPerson(x, { px: 780, gy: 1640, s: 0.8, col: GREY, pose: 'phone', k: kb, lean: 8 })
    // the table: top + cloth
    x.save(); x.translate(TB.x, TB.top); x.scale(tk, tk); x.globalAlpha = clamp(tk * 2)
    x.fillStyle = '#2c1f4a'; x.beginPath(); x.moveTo(-TB.w / 2 + 20, 20); x.lineTo(TB.w / 2 - 20, 20); x.lineTo(TB.w / 2 + 30, GY - TB.top); x.lineTo(-TB.w / 2 - 30, GY - TB.top); x.closePath(); x.fill()
    glowStroke(x, PINK, 5, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = '#3d2c63'; x.beginPath(); x.roundRect(-TB.w / 2, -10, TB.w, 34, 14); x.fill(); glowStroke(x, BONE, 6, 16); x.stroke(); x.shadowBlur = 0
    // candle: melts while they wait
    const mp = prog(t, T.table + 0.3, T.tableOut)
    const ch = lerp(120, 40, mp)
    x.fillStyle = '#f4ead8'; x.beginPath(); x.roundRect(-22, -10 - ch, 44, ch, 8); x.fill()
    x.fillStyle = '#f4ead8'; for (const [dx, dl] of [[-16, 30], [10, 44]]) { x.beginPath(); x.roundRect(dx, -10 - ch, 12, Math.min(ch, 14 + dl * mp), 6); x.fill() }
    x.beginPath(); x.ellipse(0, -10, 30 + 30 * mp, 9, 0, 0, Math.PI * 2); x.fill()
    const fl = 1 + 0.15 * Math.sin(t * 23)
    x.save(); x.translate(0, -18 - ch); x.scale(fl, 1 / fl)
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, -20, 2, 0, -20, 90); g.addColorStop(0, rgba(SUN, 0.65)); g.addColorStop(1, rgba(FIRE, 0)); x.fillStyle = g; x.beginPath(); x.arc(0, -20, 90, 0, Math.PI * 2); x.fill()
    x.globalCompositeOperation = 'source-over'; dropPath(x, 0, 0, 12); x.fillStyle = SUN; x.fill()
    x.restore()
    // two glasses
    for (const sd of [-1, 1]) {
      x.save(); x.translate(sd * 200, -12)
      x.fillStyle = rgba(FIRE, 0.7); x.beginPath(); x.moveTo(-26, -70); x.lineTo(26, -70); x.lineTo(18, -10); x.lineTo(-18, -10); x.closePath(); x.fill()
      glowStroke(x, BONE, 5, 10); x.beginPath(); x.moveTo(-30, -96); x.lineTo(30, -96); x.lineTo(20, -6); x.lineTo(-20, -6); x.closePath(); x.stroke()
      x.restore()
    }
    x.restore()
    // the replies: "k." then "…"
    const bk = pop01(t, T.k, 0.36) * out
    const bubY = 1070 - 6 * Math.sin((t - T.k) * 3)
    drawChat(x, 800, bubY, 210, 132, 'k.', bk)
    drawBurst(x, B_K, 800, bubY, t, T.k + 0.05, CYAN, 0.6)
    const sk = pop01(t, T.kTwo, 0.3) * out
    if (sk > 0) {
      // our person's thought: an exasperated "…" puffs up
      drawChat(x, 300, 1070, 190, 110, '…', sk, '#f2c75c')
    }
  }

  // ── 3: the DEALBREAKERS card + stamps
  const CARD = { x: 540, y: 1060, w: 700, h: 760 }
  const STAMPS = [{ at: T.stamp1, y: -60, rot: -5, text: '✕ FLAKY PLANS', burst: B_ST1 }, { at: T.stamp2, y: 150, rot: 4, text: '✕ ONE-WORD TEXTS', burst: B_ST2 }]
  function drawTurn(t) {
    if (t < T.card || t > T.cardOut + 0.5) return
    const out = outScale(t, T.cardOut, 0.36)
    const k = pop01(t, T.card, 0.45) * out
    if (k <= 0) return
    let thump = 0
    for (const s of STAMPS) if (t > s.at) thump += Math.sin((t - s.at) * 26) * Math.exp(-(t - s.at) * 7)
    const cy = CARD.y + 10 * Math.sin((t - T.card) * 2.2) + 10 * thump
    // a cool glow behind it (the heat's gone)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(CARD.x, cy, 60, CARD.x, cy, 640); g.addColorStop(0, rgba(GOLD, 0.28 * k)); g.addColorStop(0.5, rgba('#b45cf0', 0.14 * k)); g.addColorStop(1, rgba('#7c74f0', 0))
    x.fillStyle = g; x.beginPath(); x.arc(CARD.x, cy, 640, 0, Math.PI * 2); x.fill(); x.restore()
    x.save(); x.translate(CARD.x, cy); x.rotate((lerp(-10, 0, ease.outCubic(prog(t, T.card, T.card + 0.5))) + 2 * thump) * D2R)
    x.scale(k * (1 - 0.04 * thump), k * (1 + 0.04 * thump)); x.globalAlpha = clamp(k * 3)
    drawDealCard(x, CARD.w, CARD.h)
    for (const s of STAMPS) {
      if (t < s.at - 0.18) continue
      const sp = prog(t, s.at - 0.18, s.at)
      const sc = lerp(2.5, 1, ease.inCubic(sp)) * (t > s.at ? 1 + 0.08 * Math.sin((t - s.at) * 30) * Math.exp(-(t - s.at) * 9) : 1)
      x.save(); x.translate(0, s.y); x.rotate(s.rot * D2R); x.scale(sc, sc); drawStamp(x, s.text, clamp(sp * 2.5)); x.restore()
    }
    x.restore()
    drawBurst(x, B_CARD, CARD.x, cy, t, T.card + 0.2, GOLD, 0.6)
    for (const s of STAMPS) drawBurst(x, s.burst, CARD.x, cy + s.y, t, s.at, RED, 0.75)
  }

  // ── 4: night; the puddle springs back up, the shades drop on, a pink partner pops in, a spark between
  const ME = { x: 370 }, YOU = { x: 710 }, ES = 0.95
  function drawEnd(t) {
    if (t < T.save || t > T.endOut + 0.5) return
    const outA = outScale(t, T.endOut, 0.34), outB = outScale(t, T.endOut + 0.06, 0.34)
    const pk = ease.outCubic(prog(t, T.save, T.rise[0])) * outA
    const r = prog(t, ...T.rise)
    const melt = 1 - easeOutBack(r, 2.2)
    if (r < 1) drawPuddle(x, ME.x, GY, (40 + 220 * clamp(melt)) * ES, GOLD, pk)
    const since = t - T.glassesOn
    const squash = since > 0 && since < 0.3 ? 1 - 0.06 * Math.sin(Math.PI * since / 0.3) : 1
    if (r > 0) {
      x.save(); x.translate(ME.x, GY); x.scale(1 / squash, squash); x.translate(-ME.x, -GY)
      drawPerson(x, { px: ME.x, gy: GY, s: ES, col: GOLD, pose: t > T.spark ? 'joy' : 'stand', melt: Math.max(0, melt), k: outA })
      x.restore()
    }
    drawBurst(x, B_RISE, ME.x, GY - 200, t, T.rise[0] + 0.25, GOLD, 0.7)
    // the shades fall from the sky onto the head
    const headY = GY - 510 * ES * squash * outA
    if (t > T.glassesOn - 0.45 && outA > 0) {
      const f = ease.inQuad(prog(t, T.glassesOn - 0.45, T.glassesOn))
      const settle = since > 0 ? 8 * Math.sin(since * 14) * Math.exp(-since * 4) : 0
      x.save(); x.translate(ME.x + (1 - f) * 120, lerp(-200, headY - 4, f)); x.rotate((settle + (1 - f) * 260) * D2R); x.scale(outA, outA)
      drawShades(x, 62); x.restore()
      if (since > 0) {
        // a glint
        const gp = prog(t, T.glassesOn + 0.1, T.glassesOn + 0.5)
        if (gp > 0 && gp < 1) { x.save(); x.globalAlpha = Math.sin(Math.PI * gp); x.translate(ME.x - 40, headY - 14); x.rotate(gp * 1.2); x.fillStyle = '#fff'; x.shadowColor = '#fff'; x.shadowBlur = 20
          for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.beginPath(); x.moveTo(0, -30); x.lineTo(5, 0); x.lineTo(-5, 0); x.fill() } x.restore() }
      }
      drawBurst(x, B_COOL, ME.x, headY, t, T.glassesOn, CYAN, 0.6)
    }
    // the partner
    const yk = pop01(t, T.partner, 0.42) * outB
    if (yk > 0) drawPerson(x, { px: YOU.x, gy: GY, s: ES * 0.97, col: PINK, pose: t > T.spark ? 'joy' : 'stand', k: yk })
    drawBurst(x, B_PART, YOU.x, GY - 300, t, T.partner + 0.1, PINK, 0.6)
    // the spark between them
    const sk = pop01(t, T.spark, 0.4) * outB
    if (sk > 0) {
      const cx = (ME.x + YOU.x) / 2, cy = GY - 640 + 8 * Math.sin((t - T.spark) * 5)
      x.save(); x.translate(cx, cy); x.scale(sk, sk); x.rotate((t - T.spark) * 1.5)
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(0, 0, 4, 0, 0, 140); g.addColorStop(0, rgba(GOLD, 0.8)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = '#fff3c8'; x.shadowColor = GOLD; x.shadowBlur = 30
      x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? 16 : 56; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fill()
      x.restore()
      drawBurst(x, B_SPARK, cx, cy, t, T.spark, GOLD, 0.8)
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        drawTint(t)
        drawSunLayer(t)
        drawStreet(t)
        drawWalk(t)
        drawTable(t)
        drawFlyingShades(t)
        drawTurn(t)
        drawEnd(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   3.26 the walker's puddle / hook line leaving (3.12–3.3) → "Too hot to waste a night" (3.38) · 5.38 café table out → "Dealbreakers" (5.45)
//   8.35 the DEALBREAKERS card out (8.38) → "Save your evenings." (8.42)                · the end card does its own card flip at 10.6
const CUTS = [{ t: 3.26, kind: 'shuffle' }, { t: 5.38, kind: 'flip' }, { t: 8.35, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (B minor pentatonic pops on the 108 bpm grid; the funk score is arranged by the style engine)
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const STEPS = []
for (let n = 0; n < 8; n++) { const tb = T.walk[0] + 0.17 + n * (Math.PI / 9.4); if (tb < T.walk[1]) STEPS.push(r3(tb)) }
export const CUES = [
  // hook
  ...wordPops(T.summer, 2, 0.12, 0),
  ...wordPops(T.hook, 5, 0.09, 2, 0.028),
  ['pop', T.hookLast, 1174.66, 0.06, 0], ['pluck', T.hookLast, 493.88, 0.05, 0.6, 0],
  ['pop', T.sun + 0.3, 739.99, 0.055, 0], ['glitter', T.sun + 0.3, T.sun + 0.8], ['whoosh', T.sun, 0.45, 0.035],
  ['pop', 0.3, 587.33, 0.04, 0.4],
  ...STEPS.map((s, j) => ['tick', s, 0.03 + (j % 2) * 0.008]),
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(0.95 + i * 0.48), 1318.51, 0.018, (i % 2 ? 0.3 : -0.3)]),   // sweat drips
  ['whoosh', T.touch - 0.04, 0.25, 0.04], ['glitter', T.touch, T.touch + 0.35], ['pluck', T.touch, 987.77, 0.04, 0.3, 0.4],
  ...[880, 739.99, 587.33, 493.88].map((f, i) => ['pluck', r3(T.melt[0] + 0.05 + i * 0.12), f, 0.04, 0.3, -0.1 + i * 0.05]),
  ['pop', r3(T.melt[1] - 0.1), 293.66, 0.06, 0],
  // too hot to waste a night
  ...wordPops(T.waste, 8, 0.05, 0, 0.022),
  ['pop', T.wasteLast, 987.77, 0.06, 0], ['bell', T.wasteLast + 0.03, 1318.51, 0.03, 1.2, 0],
  ['whoosh', T.set[0], 0.9, 0.035], ['pop', T.glassesOff, 1174.66, 0.05, 0.3], ['whoosh', T.glassesOff, 0.5, 0.04],
  ['pop', T.table, 587.33, 0.05, 0], ['pop', T.date, 659.25, 0.04, -0.4], ['pop', T.date + 0.12, 739.99, 0.04, 0.4],
  ['tick', T.k, 0.06], ['pop', T.k, 493.88, 0.05, 0.4],
  ['pluck', T.kTwo, 246.94, 0.045, 0.5, -0.4],
  ['whoosh', T.tableOut, 0.35, 0.035],
  // the turn
  ...wordPops(T.turn, 3, 0.1, 3), ['pop', T.turnLast, 1318.51, 0.06, 0], ['pluck', T.turnLast, 987.77, 0.045, 0.6, 0],
  ['whoosh', T.card - 0.05, 0.4, 0.04], ['pop', T.card + 0.2, 739.99, 0.06, 0],
  ...[T.stamp1, T.stamp2].flatMap((s, i) => [['whoosh', r3(s - 0.2), 0.2, 0.04], ['boom', s, i ? 0.16 : 0.12], ['tick', s, 0.09], ['bell', r3(s + 0.04), i ? 739.99 : 587.33, 0.04, 1.0, 0]]),
  ...wordPops(T.sub, 5, 0.07, 1, 0.02),
  ['whoosh', T.cardOut, 0.45, 0.04],
  // save your evenings
  ['riser', 8.0, T.rise[1], 0.04],
  ...wordPops(T.save, 2, 0.1, 2), ['pop', T.saveLast, 1174.66, 0.06, 0],
  ['pluck', T.rise[0] + 0.2, 493.88, 0.05, 0.6, -0.2], ['glitter', T.rise[0] + 0.25, T.rise[0] + 0.7],
  ['whoosh', T.glassesOn - 0.4, 0.35, 0.035], ['pop', T.glassesOn, 987.77, 0.055, -0.2], ['bell', T.glassesOn + 0.1, 1760, 0.03, 1.0, -0.3],
  ['pop', T.partner, 739.99, 0.055, 0.3],
  ['bell', T.spark, 987.77, 0.05, 1.6, 0], ['bell', T.spark + 0.07, 1318.51, 0.04, 1.6, 0.2], ['glitter', T.spark, T.spark + 0.6],
  ['whoosh', T.endOut, 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
