// kwoe02: WHICH ONE ARE YOU? · "The Six-Minute Voice Note" (trial reel, cinematic · Dm, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  record-scratch energy: a giant voice-note bar "6:12" mid-slam over the grid, all four mid-gasp.
//   1 Scorpio replays one sigh · 2 Cancer listens as a blanket burrito · 3 Sagittarius plays it at 2× on a run ·
//   4 Libra plays it out loud for the friends.  5 Pisces: already cried. It was about a couch.  Hard cut.
import { makeWhich, slam0, phone, bubble, thought, label, glow, blanket, couch, windowFrame, speedStreaks, floor, drawStarChar, signStar, sweat, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER, MONO } from '../../kwoe01/scenes/wokit.js'

const wave = (x, X, Y, w, h, t, col = MINT, n = 14, played = 1) => { for (let i = 0; i < n; i++) { const a = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7 + 0.4) * Math.sin(t * 6 + i)); R(x, i / n < played ? col : 'rgba(239,230,214,0.35)', X + i * (w / n), Y + h / 2 - (h * a) / 2, w / n - 3, h * a) } }

// the big voice-note bar slamming at frame 0
function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 990); x.scale(s, s); x.rotate(-0.04)
  box(x, -400, -80, 800, 160, '#3a2d66', { b: 10 })
  x.fillStyle = INK; x.beginPath(); x.arc(-310, 0, 52, 0, Math.PI * 2); x.fill(); x.fillStyle = MINT; x.beginPath(); x.moveTo(-328, -28); x.lineTo(-328, 28); x.lineTo(-282, 0); x.fill()
  wave(x, -230, -50, 380, 100, t, MINT, 18, 0.05)
  x.font = `700 54px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('6:12', 380, 4)
  x.restore()
}

function p1(x, t, P) {   // Scorpio: rewind, the sigh
  windowFrame(x, 300, 50, 150, 130)
  floor(x)
  P.star(x, t, { x: 170, y: 330, s: 190, mood: P.u > 0.6 && P.u < 1.1 ? 'wide' : 'squint', look: [1, 0.2] })
  const loopP = saw(t, 1.2)
  phone(x, 350, 310, { s: 1.15, glowA: 0.3, screen: (x, w, h) => { wave(x, 6, 50, w - 12, 40, t, '#c9a6ff', 8, loopP); x.font = `700 12px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText('⟲ 2:47', w / 2, 112) } })
  label(x, '⟲ ⟲ ⟲', 350, 440, { size: 26, col: LAV(), alpha: 0.6 + 0.4 * osc(t, 2) })
  bubble(x, t, 240, 110, P.turn[0] + 0.3, Infinity, 'rewind. that sigh.', { size: 26 })
}
const LAV = () => '#c9a6ff'

function p2(x, t, P) {   // Cancer: a blanket burrito
  couch(x, 60, 520, 360, '#5a6ad0')
  P.star(x, t, { x: 240, y: 300, s: 180, mood: 'sparkle', look: [0, 0.4], bob: 3 })
  blanket(x, 240, 450, 320, 170, '#ffb36b')
  phone(x, 250, 420, { s: 0.55, glowA: 0.2, screen: (x, w, h) => wave(x, 6, 60, w - 12, 30, t, MINT, 6, saw(t * 0.1)) })
  bubble(x, t, 250, 90, P.turn[0] + 0.35, Infinity, "I'm fine. keep going.", { size: 25 })
}

function p3(x, t, P) {   // Sagittarius: 2× on a run
  R(x, '#2a3d66', 0, 380, 480, 180); R(x, '#3a4f80', 0, 470, 480, 90)
  for (let i = 0; i < 5; i++) R(x, 'rgba(239,230,214,0.4)', ((i * 120 - t * 500) % 600 + 600) % 600 - 60, 500, 60, 8)
  speedStreaks(x, t, 1)
  const bounce = Math.abs(Math.sin(t * 9)) * 26
  P.star(x, t, { x: 220, y: 320 - bounce, s: 190, mood: 'happy', look: [1, 0], bob: 0 })
  box(x, 330, 160, 110, 54, GOLD, { b: 5 }); x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('2×', 385, 188)
  bubble(x, t, 220, 90, P.turn[0] + 0.35, Infinity, 'cool cool cool cool', { size: 26 })
}

function p4(x, t, P) {   // Libra: out loud for the friends
  R(x, '#5a3a2a', 0, 420, 480, 30)
  for (const [fx_, sg, sd] of [[70, 'aries', 11], [410, 'taurus', 12]]) drawStarChar(x, fx_, 360, 110, t, { color: signStar(sg).color, mood: P.u > 0.6 ? 'wide' : 'neutral', look: [fx_ < 240 ? 1 : -1, 0], seed: sd, glow: 0.6 })
  P.star(x, t, { x: 240, y: 300, s: 180, mood: 'happy', look: [0, -0.2], hops: [P.turn[0] + 0.2, P.turn[0] + 0.7] })
  phone(x, 240, 140, { s: 0.75, rot: 0.1, glowA: 0.3, screen: (x, w, h) => wave(x, 6, 55, w - 12, 34, t, MINT, 7, saw(t * 0.2)) })
  for (let i = 0; i < 3; i++) { const p = saw(t * 1.4 + i / 3); x.save(); x.globalAlpha *= 1 - p; x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.arc(240, 140, 70 + p * 90, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(240, 140, 70 + p * 90, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore() }
  bubble(x, t, 240, 470, P.turn[0] + 0.35, Infinity, 'shh! listen to THIS', { size: 26 })
}

const EP = makeWhich({
  id: 'kwoe02', hero: 0, flash: '#7fd0ff', deep: '#7a3aa0', fx,
  hook: 'They sent a | *six-minute* voice note.',
  freeze: 'six. *minutes.*',
  panels: [
    { sign: 'scorpio', bg: 'dark', caption: 'replays *one sigh* on repeat', draw: p1, cues: [['tick', 0.4, 0.04], ['whoosh', 0.6, 0.15, 0.02]] },
    { sign: 'cancer', bg: 'bedroom', caption: 'listens as a *blanket burrito*', draw: p2, cues: [['whoosh', 0.2, 0.3, 0.02]] },
    { sign: 'sagittarius', bg: 'street', caption: 'plays it at *2×* on a run', draw: p3, cues: [['tick', 0.2, 0.04], ['tick', 0.4, 0.04], ['tick', 0.6, 0.04]] },
    { sign: 'libra', bg: 'cafe', caption: 'plays it *out loud* for the friends', draw: p4, cues: [['pop', 0.3, 880, 0.03, 0], ['pop', 0.6, 659.25, 0.03, 0]] },
  ],
  pisces: 'already cried. *It was about a couch.*',
  ending: 'cut',
  cues: [['boom', 0.02, 0.28], ['tom', 0.02, 80, { gain: 0.25, decay: 0.3 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, glow, sweat, prog, clamp, lerp, PINK, BLUE]
