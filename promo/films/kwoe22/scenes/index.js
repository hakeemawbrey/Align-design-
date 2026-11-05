// kwoe22: WHICH ONE ARE YOU? · "Midnight on New Year's Eve" (trial reel, house · F, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  colour flash + a countdown "3…" mid-slam, confetti mid-air, Sagittarius mid-jump (whip out of panel 2).
//   1 Leo leads the countdown · 2 Sagittarius is on a rooftop with strangers · 3 Capricorn is asleep by ten ·
//   4 Libra hugs everyone in the room.  5 Pisces: cries at "happy new year."  Loops.
import { makeWhich, slam0, bubble, label, glow, floor, bed, confetti, sparkles, actionLines, hearts, clock, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER, SERIF } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 990); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 190, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 175, 0, Math.PI * 2); x.fill()
  x.font = `italic 500 300px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('3', 0, 14)
  x.restore()
  confetti(x, t, -0.4, 540, 990, { n: 30, v0: 900, g: 900, life: 1.4 })
}
const stranger = (x, t, X, Y, c, sd) => drawStarChar(x, X, Y, 100, t, { color: c, mood: 'happy', look: [0, -0.5], seed: sd, glow: 0.5, tips: false })

function p1(x, t, P) {   // Leo: leads the countdown
  for (let i = 0; i < 5; i++) glow(x, 50 + i * 100, 60, 70, '255,220,150', 0.2 + 0.1 * osc(t, 2, i * 0.2))
  floor(x)
  const n = 10 - Math.floor(t % 10)
  P.star(x, t, { x: 180, y: 330, s: 190, mood: 'sparkle', look: [0.3, -0.3], hops: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => v + 0.05) })
  // microphone
  R(x, INK, 262, 300, 12, 90); x.fillStyle = INK; x.beginPath(); x.arc(268, 292, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9aa4c0'; x.beginPath(); x.arc(268, 292, 17, 0, Math.PI * 2); x.fill()
  label(x, String(n), 380, 220, { size: 110, col: GOLD, font: INTER, weight: 800 })
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'EVERYBODY! FIVE!', { size: 27 })
}

function p2(x, t, P) {   // Sagittarius: rooftop with strangers (frame-0 panel)
  for (let i = 0; i < 8; i++) R(x, ['#ffd98a', '#9fe6b0', '#ff8fb1'][i % 3], 20 + i * 58, 260 + (i % 3) * 30, 30, 140)
  R(x, '#1a1436', 0, 400, 480, 160); R(x, '#3a2d66', 0, 400, 480, 10)
  stranger(x, t, 70, 360, '#7fd0ff', 61); stranger(x, t, 410, 360, '#ffb36b', 62)
  const b = Math.abs(Math.sin(t * 6)) * 40
  P.star(x, t, { x: 240, y: 320 - b, s: 180, mood: 'happy', look: [0, -0.5], bob: 0, squash: b > 30 ? -0.1 : 0.05 })
  sparkles(x, t, 360, 120, Math.floor(t / 0.8) * 0.8, 10, 70, 0.2, [GOLD, PINK, MINT])
  sparkles(x, t, 120, 90, Math.floor(t / 0.8) * 0.8 + 0.4, 10, 60, 0.6, [BLUE, BONE, GOLD])
  bubble(x, t, 240, 500, P.turn[0] + 0.35, Infinity, 'new best friends!!', { size: 26 })
}

function p3(x, t, P) {   // Capricorn: asleep by ten
  bed(x, 10, 480, 460, { col: '#3fb08a' })
  clock(x, 360, 90, '10:02', { col: MINT, s: 0.8 })
  P.star(x, t, { x: 200, y: 380, s: 170, mood: 'sleepy', look: [0, 0], bob: 2, squash: 0.08 })
  label(x, 'see you next year', 240, 200, { size: 22, alpha: 0.85 })
}

function p4(x, t, P) {   // Libra: hugs everyone
  floor(x)
  const who = Math.floor(t / 0.7) % 3
  const cols = ['#7fd0ff', '#ffb36b', '#c9a6ff']
  P.star(x, t, { x: 200, y: 330, s: 180, mood: 'heart', look: [1, 0], squash: 0.05 })
  drawStarChar(x, 330, 340, 140, t, { color: cols[who], mood: 'happy', look: [-1, 0], seed: 70 + who, glow: 0.5 })
  hearts(x, t, 0, 260, 230, { n: 4, loop: 0.7, rise: 100 })
  label(x, `hugs: ${4 + Math.floor(t / 0.7)}`, 240, 480, { size: 24, col: PINK })
  bubble(x, t, 240, 100, P.turn[0] + 0.3, Infinity, 'come here, you!', { size: 28 })
}

const EP = makeWhich({
  id: 'kwoe22', hero: 1, flash: '#f2c75c', deep: '#7a3aa0', fx,
  hook: 'New Year’s Eve. | *Ten seconds* left.',
  freeze: 'wait for *it.*',
  panels: [
    { sign: 'leo', bg: 'stage', caption: 'leads *the countdown*', draw: p1, cues: [['tick', 0.2, 0.05], ['tick', 0.7, 0.05], ['tick', 1.2, 0.05]] },
    { sign: 'sagittarius', bg: 'night', caption: 'on a rooftop *with strangers*', draw: p2, cues: [['glitter', 0.2, 0.6], ['pop', 0.6, 1567.98, 0.03, 0]] },
    { sign: 'capricorn', bg: 'dark', caption: 'asleep *by ten*', draw: p3, cues: [['pluck', 0.4, 587.33, 0.025, 0.6, 0]] },
    { sign: 'libra', bg: 'party', caption: 'hugs *everyone* in the room', draw: p4, cues: [['pop', 0.0, 880, 0.03, 0], ['pop', 0.7, 987.77, 0.03, 0], ['pop', 1.4, 1174.66, 0.03, 0]] },
  ],
  pisces: 'cries at *"happy new year."*',
  ending: 'loop',
  cues: [['boom', 0.02, 0.3], ['bell', 0.02, 1760, 0.04, 0.8, 0], ['glitter', 0.02, 0.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [actionLines, box, saw, prog, clamp, lerp]
