// kwoe09: WHICH ONE ARE YOU? · 'They Replied "k"' (trial reel, chiptune · E, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  glitch flash: a giant lowercase "k" slamming over the grid, Scorpio mid-stare (whip out of panel 4).
//   1 Taurus shrugs and makes a sandwich · 2 Gemini replies "K." with a capital, then panics · 3 Cancer studies the k
//   under a magnifying glass · 4 Scorpio stares at it without blinking.  5 Pisces: cries. One letter. So cold.  Hard cut.
import { makeWhich, slam0, phone, chat, bubble, thought, label, glow, floor, desk, sandwich, sweat, actionLines, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER, SERIF } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 1000); x.scale(s, s)
  x.font = `800 520px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const j = Math.floor(t * 30) % 3
  x.fillStyle = 'rgba(255,60,120,0.7)'; x.fillText('k', -14 + j * 4, 0)
  x.fillStyle = 'rgba(60,220,255,0.7)'; x.fillText('k', 14 - j * 4, 6)
  x.fillStyle = INK; x.fillText('k', 8, 14); x.fillStyle = BONE; x.fillText('k', 0, 0)
  x.restore()
  // glitch slices
  if (t < 0.5) for (let i = 0; i < 6; i++) { const y = 420 + ((i * 263 + Math.floor(t * 40) * 97) % 1140); x.save(); x.globalAlpha = 0.35; R(x, i % 2 ? '#ff3c78' : '#3cdcff', 0, y, 1080, 10 + (i % 3) * 6); x.restore() }
}
const kScreen = (x, w, h, extra = []) => chat(x, w, h, [{ me: true, text: 'had SO much fun!!' }, { me: false, text: 'k' }, ...extra])

function p1(x, t, P) {   // Taurus: shrug, sandwich
  desk(x, 30, 430, 420, '#5a3a2a')
  sandwich(x, 340, 410, 1.2)
  P.star(x, t, { x: 170, y: 320, s: 190, mood: 'happy', look: [1, 0.3] })
  phone(x, 80, 420, { s: 0.55, rot: -1.4 })
  bubble(x, t, 220, 100, P.turn[0] + 0.35, Infinity, 'k. cool. lunch.', { size: 27 })
}

function p2(x, t, P) {   // Gemini: "K." then panic
  floor(x)
  const panic = P.u > 0.7
  P.star(x, t, { x: 160, y: 330, s: 180, mood: panic ? 'wide' : 'squint', look: [1, 0], squash: panic ? 0.08 * Math.sin(t * 30) : 0 })
  if (panic) sweat(x, t, 230, 230)
  phone(x, 350, 290, { s: 1.15, glowA: 0.3, screen: (x, w, h) => kScreen(x, w, h, P.u > 0.35 ? [{ me: true, text: 'K.' }] : []) })
  bubble(x, t, 220, 100, P.turn[0] + 0.75, Infinity, 'why did I CAPITALISE', { size: 24 })
}

function p3(x, t, P) {   // Cancer: the magnifying glass
  floor(x)
  P.star(x, t, { x: 150, y: 340, s: 170, mood: 'squint', look: [1, -0.3] })
  phone(x, 340, 300, { s: 1.2, screen: (x, w, h) => kScreen(x, w, h) })
  const mx = 330 + 10 * osc(t, 0.8), my = 340 + 8 * osc(t, 0.6)
  x.save(); x.lineWidth = 9; x.strokeStyle = INK; x.beginPath(); x.arc(mx, my, 54, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 5; x.stroke()
  x.fillStyle = 'rgba(191,232,255,0.35)'; x.fill()
  x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('k', mx, my)
  x.translate(mx + 40, my + 40); x.rotate(-0.8); R(x, INK, -9, 0, 18, 70); R(x, '#8a6440', -5, 4, 10, 62); x.restore()
  thought(x, t, 200, 100, P.turn[0] + 0.35, Infinity, 'what does k MEAN', { size: 24 })
}

function p4(x, t, P) {   // Scorpio: the unblinking stare (frame-0 panel)
  floor(x)
  P.star(x, t, { x: 240, y: 330, s: 220, mood: 'wide', look: [0, 0.6], blink: false, bob: 0 })
  phone(x, 240, 470, { s: 0.9, glowA: 0.4, screen: (x, w, h) => kScreen(x, w, h) })
  for (let i = 0; i < 2; i++) { const ex = 205 + i * 70; glow(x, ex, 300, 60, '255,80,120', 0.2 + 0.1 * osc(t, 2)) }
  label(x, `${Math.floor(10 + t * 7)}s without blinking`, 240, 90, { size: 22, col: PINK })
}

const EP = makeWhich({
  id: 'kwoe09', hero: 3, flash: '#3cdcff', deep: '#2a6fd0', fx,
  hook: 'They replied | with just *"k."*',
  freeze: 'just *k.*',
  panels: [
    { sign: 'taurus', bg: 'kitchen', caption: 'shrugs and *makes a sandwich*', draw: p1, cues: [['pop', 0.4, 659.25, 0.03, 0]] },
    { sign: 'gemini', bg: 'night', caption: 'replies *"K."*, then panics', draw: p2, cues: [['tick', 0.35, 0.05], ['pop', 0.36, 1318.51, 0.03, 0], ['whoosh', 0.7, 0.2, 0.03]] },
    { sign: 'cancer', bg: 'bedroom', caption: 'studies the k *under a magnifier*', draw: p3, cues: [['pluck', 0.3, 739.99, 0.03, 0.4, 0]] },
    { sign: 'scorpio', bg: 'dark', caption: 'stares at it *without blinking*', draw: p4, cues: [['bell', 0.2, 1760, 0.02, 0.8, 0]] },
  ],
  pisces: 'cries. One letter. *So cold.*',
  ending: 'cut',
  cues: [['boom', 0.02, 0.26], ['pop', 0.04, 1760, 0.04, 0], ['pop', 0.08, 880, 0.04, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [actionLines, saw, prog, clamp, lerp, MINT, BLUE, SERIF]
