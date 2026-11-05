// kwoe08: WHICH ONE ARE YOU? · "Single at the Wedding" (trial reel, pop · C, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 3: Aries mid-dive for the bouquet.
//   1 Sagittarius owns the dance floor · 2 Virgo straightens the centrepieces · 3 Aries dives for the bouquet ·
//   4 Aquarius talks to the caterer about space.  5 Pisces: cries at the vows. Every vow.  Loops.
import { makeWhich, bubble, thought, label, glow, floor, confetti, sparkles, actionLines, drawBits, drawStarChar, signStar, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const FLOWER = ['.P.P.', 'PPPPP', '.PYP.', 'PPPPP', '.P.P.']
function bouquet(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -8, 0, 16, 44); R(x, '#4a9a5a', -4, 0, 8, 40)
  drawBits(x, FLOWER, { P: PINK, Y: GOLD }, -14, -8, 5); drawBits(x, FLOWER, { P: BONE, Y: GOLD }, 14, -10, 5); drawBits(x, FLOWER, { P: '#ff6b7f', Y: GOLD }, 0, -26, 5)
  x.restore()
}
function table(x, cx, y, w = 220) { box(x, cx - w / 2, y, w, 18, BONE, { b: 5 }); R(x, 'rgba(239,230,214,0.6)', cx - w / 2 + 10, y + 18, w - 20, 70) }

function p1(x, t, P) {   // Sagittarius: owns the dance floor
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) R(x, (i + j + Math.floor(t * 4)) % 2 ? '#7a3aa0' : '#ff8fb1', i * 120, 440 + j * 60, 120, 60)
  for (let i = 0; i < 6; i++) glow(x, 40 + i * 80, 70, 80, ['255,140,200', '140,200,255', '255,220,140'][i % 3], 0.2 + 0.15 * osc(t, 2, i * 0.3))
  const b = Math.abs(Math.sin(t * 8)) * 30
  P.star(x, t, { x: 240 + 50 * Math.sin(t * 4), y: 320 - b, s: 190, mood: 'happy', look: [Math.sin(t * 4), -0.4], bob: 0, squash: 0.1 * Math.sin(t * 16) })
  actionLines(x, t, 240 + 50 * Math.sin(t * 4), 300, 110, 150, 8, GOLD, 0.5)
  bubble(x, t, 240, 90, P.turn[0] + 0.35, Infinity, 'DJ, one more!!', { size: 28 })
}

function p2(x, t, P) {   // Virgo: straightens the centrepieces
  floor(x, '#4a2f4a', 440)
  table(x, 300, 360, 280)
  // the vase tilts, then snaps straight
  const fix = clamp(prog(P.u, 0.4, 0.6)), tilt = lerp(0.35, 0, fix)
  x.save(); x.translate(300, 360); x.rotate(tilt); box(x, -18, -60, 36, 60, '#7fd0ff', { b: 4 }); bouquet(x, 0, -76, 0.9); x.restore()
  if (fix >= 1) label(x, '✓ centred', 300, 440, { size: 24, col: MINT, alpha: clamp(1 - (P.u - 0.6) * 0.8) })
  P.star(x, t, { x: 120, y: 330, s: 170, mood: fix >= 1 ? 'happy' : 'squint', look: [1, 0.3] })
  bubble(x, t, 200, 100, P.turn[0] + 0.35, Infinity, '2 mm to the left.', { size: 26 })
}

function p3(x, t, P) {   // Aries: the bouquet dive (frame-0 panel)
  floor(x, '#4a2f4a')
  const ph = saw(t + 0.3, 1.6)
  const dive = ease.outCubic(clamp(ph / 0.5))
  const ax = lerp(120, 300, dive), ay = lerp(330, 300, Math.sin(Math.PI * clamp(ph / 0.5)))
  bouquet(x, lerp(420, 330, clamp(ph / 0.45)), lerp(120, 250, clamp(ph / 0.45)), 1.4, ph * 6)
  P.star(x, t, { x: ax, y: ay, s: 180, mood: ph < 0.5 ? 'wide' : 'sparkle', look: [1, -0.6], squash: ph < 0.5 ? -0.18 : 0, bob: 0 })
  actionLines(x, t, ax - 80, ay, 10, 60, 5, BONE, 0.5, 2.6)
  if (ph > 0.5) sparkles(x, t, 320, 250, t - (ph - 0.5) * 1.6, 8, 90, 0.3)
  bubble(x, t, 240, 90, P.turn[0] + 0.3, Infinity, 'MINE!!', { size: 34 })
}

function p4(x, t, P) {   // Aquarius: the caterer and space
  floor(x, '#4a2f4a', 450)
  table(x, 330, 370, 200)
  for (let i = 0; i < 3; i++) R(x, [GOLD, PINK, MINT][i], 270 + i * 42, 352, 30, 18)
  drawStarChar(x, 380, 300, 120, t, { color: '#cfc8e8', mood: P.u > 0.6 ? 'sleepy' : 'neutral', look: [-1, 0], seed: 13, glow: 0.4, zzz: false })
  P.star(x, t, { x: 150, y: 320, s: 180, mood: 'sparkle', look: [1, 0], hops: [0.2, 0.7, 1.2].map(v => P.turn[0] + v) })
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'so, about black holes…', { size: 25 })
}

const EP = makeWhich({
  id: 'kwoe08', hero: 2, flash: '#ffd98a', deep: '#7a3aa0',
  hook: 'Single at *the wedding.* | Which one?',
  freeze: 'the *bouquet.*',
  panels: [
    { sign: 'sagittarius', bg: 'party', caption: 'owns the *dance floor*', draw: p1, cues: [['clap', 0.2, { gain: 0.1 }], ['clap', 0.6, { gain: 0.1 }], ['clap', 1.0, { gain: 0.1 }]] },
    { sign: 'virgo', bg: 'wedding', caption: 'straightens *the centrepieces*', draw: p2, cues: [['tick', 0.5, 0.06], ['pop', 0.55, 1318.51, 0.03, 0]] },
    { sign: 'aries', bg: 'wedding', caption: '*dives* for the bouquet', draw: p3, cues: [['whoosh', 0.0, 0.4, 0.04], ['pop', 0.8, 1174.66, 0.04, 0]] },
    { sign: 'aquarius', bg: 'wedding', caption: 'tells the caterer *about space*', draw: p4, cues: [['pluck', 0.3, 739.99, 0.03, 0.4, 0]] },
  ],
  pisces: 'cries at the vows. *Every vow.*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, confetti, signStar, BLUE, INTER]
