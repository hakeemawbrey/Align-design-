// kwoe17: WHICH ONE ARE YOU? · "A Sunday With No Plans" (trial reel, lofi · Eb, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  shake: Virgo mid-vacuum, dust flying at the lens (whip out of panel 3).
//   1 Taurus naps on a legendary level · 2 Sagittarius hops on a random train · 3 Virgo cleans the whole flat ·
//   4 Gemini calls everybody they know.  5 Pisces: cries at a sunset. A normal one.  Loops.
import { makeWhich, phone, bubble, label, glow, floor, couch, sparkles, speedStreaks, drawBits, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function p1(x, t, P) {   // Taurus: a legendary nap
  couch(x, 60, 520, 360, '#8a6440')
  P.star(x, t, { x: 240, y: 380, s: 180, mood: 'sleepy', look: [0, 0], bob: 2, squash: 0.1 })
  // a tiny gold medal
  if (P.u > 0.5 || P.u < 0) { R(x, '#e8344e', 312, 380, 10, 40); x.fillStyle = INK; x.beginPath(); x.arc(317, 430, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(317, 430, 17, 0, Math.PI * 2); x.fill() }
  label(x, 'NAP LEVEL: LEGEND', 240, 110, { size: 24, col: GOLD })
}

function p2(x, t, P) {   // Sagittarius: a random train
  // the window with the world sliding by
  box(x, 40, 70, 400, 220, '#7fd0ff', { b: 8 })
  x.save(); x.beginPath(); x.rect(40, 70, 400, 220); x.clip()
  for (let i = 0; i < 6; i++) { const X = ((i * 150 - t * 400) % 900 + 900) % 900 - 100; R(x, '#3fb08a', X, 200, 90, 90); R(x, '#2f8a6a', X + 20, 150, 50, 60) }
  R(x, '#ffd98a', 360, 90, 40, 40)
  x.restore()
  speedStreaks(x, t, 0.4)
  R(x, '#3a2d66', 0, 300, 480, 260)
  P.star(x, t, { x: 220, y: 400, s: 170, mood: 'sparkle', look: [0.5, -0.6] })
  bubble(x, t, 240, 500, P.turn[0] + 0.35, Infinity, 'where does this go?!', { size: 25 })
}

function p3(x, t, P) {   // Virgo: cleans the whole flat (frame-0 panel)
  floor(x)
  const sw = Math.sin(t * 6)
  P.star(x, t, { x: 170, y: 330, s: 180, mood: 'happy', look: [1, 0.4] })
  // the vacuum
  x.save(); x.translate(300 + 50 * sw, 470); box(x, -60, -14, 120, 24, '#e8344e', { b: 5 }); R(x, INK, -4, -150, 8, 140); x.restore()
  for (let i = 0; i < 8; i++) { const p = saw(t * 2 + i / 8); x.save(); x.globalAlpha *= 1 - p; R(x, '#cfc8e8', 300 + 50 * sw + (i - 4) * 18 * p, 460 - 120 * p, 8, 8); x.restore() }
  sparkles(x, t, 380, 300, Math.floor(t / 0.7) * 0.7, 6, 50, 0.1, [BONE, MINT])
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'just a LITTLE tidy', { size: 26 })
}

function p4(x, t, P) {   // Gemini: calls everybody
  floor(x)
  P.star(x, t, { x: 150, y: 340, s: 170, mood: 'sparkle', look: [1, 0], hops: [0.1, 0.5, 0.9, 1.3].map(v => P.turn[0] + v) })
  phone(x, 260, 300, { s: 0.75, rot: 0.2, glowA: 0.3 })
  const names = ['mum', 'Sam', 'Jo', 'Ari', 'Kit']
  names.forEach((n, i) => { const on = P.u < 0 || P.u > i * 0.3; if (on) label(x, `☏ ${n}`, 380, 110 + i * 60, { size: 26, col: [PINK, MINT, GOLD, BLUE, BONE][i] }) })
  bubble(x, t, 200, 470, P.turn[0] + 0.4, Infinity, 'who wants to hang?!', { size: 25 })
}

const EP = makeWhich({
  id: 'kwoe17', hero: 2, flash: '#9fe6b0', deep: '#2a6fd0',
  hook: 'A Sunday with | *zero plans.*',
  freeze: 'nothing *to do.*',
  panels: [
    { sign: 'taurus', bg: 'bedroom', caption: 'naps on a *legendary* level', draw: p1, cues: [['pluck', 0.5, 587.33, 0.03, 0.6, 0]] },
    { sign: 'sagittarius', bg: 'blue', caption: 'hops on *a random train*', draw: p2, cues: [['whoosh', 0.1, 0.6, 0.03]] },
    { sign: 'virgo', bg: 'kitchen', caption: 'cleans *the whole flat*', draw: p3, cues: [['glitter', 0.3, 0.6]] },
    { sign: 'gemini', bg: 'party', caption: 'calls *everybody* they know', draw: p4, cues: [['pop', 0.0, 880, 0.03, 0], ['pop', 0.3, 987.77, 0.03, 0], ['pop', 0.6, 1174.66, 0.03, 0], ['pop', 0.9, 1318.51, 0.03, 0]] },
  ],
  pisces: 'cries at a sunset. *A normal one.*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, drawBits, osc, prog, clamp, lerp, INTER]
