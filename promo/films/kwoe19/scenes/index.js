// kwoe19: WHICH ONE ARE YOU? · "The Group Chat Went Quiet" (trial reel, chiptune · G, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  glitch: the chat bubble "anyone up?" mid-send over the grid, Scorpio mid-squint (whip out of panel 2).
//   1 Gemini sends "?" · 2 Scorpio suspects a secret second chat · 3 Sagittarius didn't notice, out hiking ·
//   4 Libra sends a meme to fix the mood.  5 Pisces: cries when someone sends a heart.  Loops.
import { makeWhich, slam0, phone, chat, bubble, thought, label, glow, floor, drawBits, sweat, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  const j = t < 0.4 ? (Math.floor(t * 30) % 3 - 1) * 8 : 0
  x.save(); x.globalAlpha = a; x.translate(540 + j, 990); x.scale(s, s)
  box(x, -300, -70, 600, 140, '#5aa0ff', { b: 10 })
  x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('anyone up?', 0, 4)
  x.restore()
  if (t < 0.45) for (let i = 0; i < 5; i++) { const y = 430 + ((i * 331 + Math.floor(t * 40) * 113) % 1120); x.save(); x.globalAlpha = 0.3; R(x, i % 2 ? '#ff3c78' : '#3cdcff', 0, y, 1080, 12); x.restore() }
}
const group = (x, w, h, extra = []) => chat(x, w, h, [{ me: true, text: 'anyone up?' }, ...extra])

function p1(x, t, P) {   // Gemini: "?"
  floor(x)
  P.star(x, t, { x: 150, y: 340, s: 170, mood: 'wide', look: [1, 0] })
  const n = P.u < 0 ? 2 : Math.min(4, Math.floor(P.u * 3))
  phone(x, 350, 290, { s: 1.15, glowA: 0.3, screen: (x, w, h) => group(x, w, h, Array.from({ length: n }, () => ({ me: true, text: '?' }))) })
  bubble(x, t, 220, 100, P.turn[0] + 0.4, Infinity, '? ? ? ?', { size: 32 })
}

function p2(x, t, P) {   // Scorpio: a secret second chat? (frame-0 panel)
  // a little evidence board
  box(x, 220, 60, 230, 170, '#a07850', { b: 6 })
  for (let i = 0; i < 4; i++) R(x, BONE, 236 + (i % 2) * 110, 76 + Math.floor(i / 2) * 76, 90, 60)
  x.strokeStyle = '#e8344e'; x.lineWidth = 4; x.beginPath(); x.moveTo(280, 106); x.lineTo(390, 182); x.moveTo(390, 106); x.lineTo(280, 182); x.stroke()
  floor(x)
  P.star(x, t, { x: 150, y: 340, s: 180, mood: 'squint', look: [1, -0.3] })
  thought(x, t, 260, 300, P.turn[0] + 0.3, Infinity, 'is there ANOTHER chat?', { size: 22 })
}

function p3(x, t, P) {   // Sagittarius: out hiking
  // mountains
  x.fillStyle = '#3f6a5a'; x.beginPath(); x.moveTo(0, 400); x.lineTo(140, 150); x.lineTo(280, 400); x.fill()
  x.fillStyle = '#2f5a4a'; x.beginPath(); x.moveTo(180, 400); x.lineTo(360, 110); x.lineTo(520, 400); x.fill()
  R(x, BONE, 342, 110, 36, 20)
  R(x, '#2a4a3a', 0, 400, 480, 160)
  const b = Math.abs(Math.sin(t * 5)) * 12
  P.star(x, t, { x: 220, y: 380 - b, s: 170, mood: 'happy', look: [1, -0.5], bob: 0 })
  label(x, 'phone: in the bag', 240, 500, { size: 22, col: MINT })
  bubble(x, t, 240, 90, P.turn[0] + 0.35, Infinity, 'what a view!!', { size: 28 })
}

function p4(x, t, P) {   // Libra: a meme to fix the mood
  floor(x)
  P.star(x, t, { x: 140, y: 340, s: 170, mood: 'happy', look: [1, 0] })
  phone(x, 350, 290, { s: 1.15, glowA: 0.3, screen: (x, w, h) => {
    group(x, w, h - 60)
    if (P.u > 0.3 || P.u < 0) { R(x, BONE, 10, h - 60, w - 20, 54); drawBits(x, ['O...O', 'OOOOO', 'OWOWO', 'OOOOO', '.OOO.'], { O: '#ffb36b', W: INK }, w / 2, h - 36, 6) }
  } })
  bubble(x, t, 220, 100, P.turn[0] + 0.4, Infinity, 'a cat. fixes everything.', { size: 23 })
}

const EP = makeWhich({
  id: 'kwoe19', hero: 1, flash: '#3cdcff', deep: '#2a6fd0', fx,
  hook: 'You texted the group. | *Silence.*',
  freeze: '*crickets.*',
  panels: [
    { sign: 'gemini', bg: 'night', caption: 'sends *"?"*', draw: p1, cues: [['pop', 0.35, 1318.51, 0.03, 0], ['pop', 0.7, 1318.51, 0.03, 0], ['pop', 1.05, 1318.51, 0.03, 0]] },
    { sign: 'scorpio', bg: 'dark', caption: 'suspects *a secret second chat*', draw: p2, cues: [['bell', 0.3, 880, 0.02, 0.8, 0]] },
    { sign: 'sagittarius', bg: 'park', caption: 'didn’t notice. *Out hiking.*', draw: p3, cues: [['pluck', 0.3, 1174.66, 0.03, 0.4, 0]] },
    { sign: 'libra', bg: 'cafe', caption: 'sends *a meme* to fix it', draw: p4, cues: [['pop', 0.3, 987.77, 0.04, 0]] },
  ],
  pisces: 'cries when someone *sends a heart.*',
  ending: 'loop',
  cues: [['pop', 0.02, 1760, 0.04, 0], ['tick', 0.05, 0.06]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, sweat, osc, saw, prog, clamp, lerp, GOLD, PINK, BLUE]
