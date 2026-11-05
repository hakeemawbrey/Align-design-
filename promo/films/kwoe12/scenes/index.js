// kwoe12: WHICH ONE ARE YOU? · "Plans Got Cancelled" (trial reel, funk · A, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  colour flash: a big red CANCELLED stamp mid-slam, Cancer mid-dive into pyjamas (whip out of panel 3).
//   1 Capricorn: relieved, laptop open · 2 Gemini books three new plans · 3 Cancer is in pyjamas in two seconds ·
//   4 Leo, dressed up, does a photoshoot anyway.  5 Pisces: cries, then orders soup.  Loops.
import { makeWhich, slam0, phone, bubble, label, glow, floor, desk, laptop, bed, pillow, sparkles, actionLines, drawBits, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a * 0.95; x.translate(540, 990); x.scale(s, s); x.rotate(-0.12)
  x.strokeStyle = '#e8344e'; x.lineWidth = 16; x.strokeRect(-380, -95, 760, 190); x.lineWidth = 6; x.strokeRect(-360, -75, 720, 150)
  x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8344e'; x.fillText('CANCELLED', 0, 8)
  x.restore()
}

function p1(x, t, P) {   // Capricorn: relieved
  desk(x, 30, 420, 420)
  laptop(x, 320, 420, { s: 1.05, screen: (x, w, h) => { R(x, '#1f2f4a', 0, 0, w, h); for (let i = 0; i < 4; i++) R(x, MINT, 10, 10 + i * 15, 40 + ((i * 31) % 60), 8) } })
  const exhale = P.u > 0.3
  P.star(x, t, { x: 140, y: 300, s: 170, mood: exhale ? 'happy' : 'neutral', look: [1, 0.3], squash: exhale ? 0.06 : 0 })
  if (exhale) for (let i = 0; i < 3; i++) { const p = saw(t * 1.2 + i / 3); x.save(); x.globalAlpha *= 1 - p; R(x, BONE, 210 + p * 60, 280 - i * 8, 26, 6); x.restore() }
  bubble(x, t, 220, 100, P.turn[0] + 0.4, Infinity, '(exhales) finally.', { size: 26 })
}

function p2(x, t, P) {   // Gemini: books three new plans
  floor(x)
  P.star(x, t, { x: 140, y: 340, s: 170, mood: 'sparkle', look: [1, -0.3], hops: [0.2, 0.6, 1.0].map(v => P.turn[0] + v) })
  const plans = ['7pm  karaoke', '8pm  tacos', '9pm  bowling']
  plans.forEach((s, i) => {
    const k = P.u < 0 ? 1 : clamp(ease.outBack(prog(P.u, 0.2 + i * 0.4, 0.45 + i * 0.4)))
    if (k <= 0.01) return
    x.save(); x.translate(340, 120 + i * 90); x.scale(k, k); box(x, -110, -30, 220, 60, [PINK, MINT, GOLD][i], { b: 5 })
    x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(s, 0, 2); x.restore()
  })
  bubble(x, t, 240, 470, P.turn[0] + 1.2, Infinity, 'who’s free?!', { size: 26 })
}

function p3(x, t, P) {   // Cancer: pyjamas in two seconds (frame-0 panel)
  bed(x, 20, 470, 440, { col: '#3f7cf0' })
  const ph = saw(t + 0.15, 1.6), dive = ease.outCubic(clamp(ph / 0.4))
  const X = lerp(120, 260, dive), Y = lerp(250, 390, dive) - 80 * Math.sin(Math.PI * clamp(ph / 0.4))
  pillow(x, 380, 410, 120, 56, BONE, 0.1)
  P.star(x, t, { x: X, y: Y, s: 170, mood: ph < 0.4 ? 'wide' : 'sleepy', look: [1, 0.3], bob: 0 })
  // nightcap
  x.save(); x.translate(X - 10, Y - 95); x.rotate(-0.4); R(x, INK, -34, -4, 68, 22); R(x, '#7fd0ff', -30, 0, 60, 14); R(x, INK, -20, -40, 40, 40); R(x, '#7fd0ff', -16, -36, 32, 36); R(x, BONE, 10, -54, 18, 18); x.restore()
  if (ph < 0.4) actionLines(x, t, X - 60, Y, 10, 50, 5, BONE, 0.5, 3.4)
  bubble(x, t, 240, 90, P.turn[0] + 0.35, Infinity, 'pyjamas: ON.', { size: 30 })
}

function p4(x, t, P) {   // Leo: photoshoot anyway
  for (let i = 0; i < 5; i++) glow(x, 50 + i * 100, 60, 70, '255,210,150', 0.2)
  floor(x)
  const pose = Math.floor(saw(t, 1.2) * 3)
  P.star(x, t, { x: 220, y: 320, s: 190, mood: ['sparkle', 'wink', 'happy'][pose], look: [[-1, 0, 1][pose], -0.2], squash: [0.05, -0.05, 0][pose] })
  // a bow tie
  drawBits(x, ['G...G', 'GG.GG', 'GGGGG', 'GG.GG', 'G...G'], { G: '#e8344e' }, 220, 390, 6)
  phone(x, 410, 230, { s: 0.75, rot: -0.2, col: '#f39a3a' })
  const f = saw(t, 0.4); if (f < 0.15) { glow(x, 410, 230, 240, '255,255,240', 0.55 * (1 - f / 0.15)) }
  sparkles(x, t, 220, 300, P.turn[0] + 0.2, 8, 140, 0.3)
  bubble(x, t, 220, 100, P.turn[0] + 0.35, Infinity, 'outfit can’t go to waste', { size: 23 })
}

const EP = makeWhich({
  id: 'kwoe12', hero: 2, flash: '#e8344e', deep: '#c0587a', fx,
  hook: 'They *cancelled.* | How do you take it?',
  freeze: 'plans *are off.*',
  panels: [
    { sign: 'capricorn', bg: 'office', caption: 'relieved. *Laptop open.*', draw: p1, cues: [['whoosh', 0.3, 0.5, 0.02]] },
    { sign: 'gemini', bg: 'party', caption: 'books *three new plans*', draw: p2, cues: [['pop', 0.25, 880, 0.04, 0], ['pop', 0.65, 1046.5, 0.04, 0], ['pop', 1.05, 1318.51, 0.04, 0]] },
    { sign: 'cancer', bg: 'bedroom', caption: 'in pyjamas *in two seconds*', draw: p3, cues: [['whoosh', 0.1, 0.3, 0.03], ['tom', 0.5, 120, { gain: 0.15, decay: 0.15 }]] },
    { sign: 'leo', bg: 'stage', caption: 'does *a photoshoot* anyway', draw: p4, cues: [['pop', 0.1, 1760, 0.035, 0.3], ['pop', 0.5, 1760, 0.035, 0.3], ['pop', 0.9, 1760, 0.035, 0.3]] },
  ],
  pisces: 'cries, then *orders soup.*',
  ending: 'loop',
  cues: [['boom', 0.02, 0.3], ['tom', 0.02, 90, { gain: 0.25, decay: 0.25 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [label, osc, BLUE]
