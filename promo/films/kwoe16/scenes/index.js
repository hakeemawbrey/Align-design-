// kwoe16: WHICH ONE ARE YOU? · "The Risky Text" (trial reel, house · C, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 1: a phone mid-flight across a bed, Aries mid-throw.
//   1 Aries sends it and throws the phone · 2 Libra drafts ten versions · 3 Scorpio waits for exactly 11:11 ·
//   4 Taurus hands the phone to a friend.  5 Pisces: cries when they reply "same."  Hard cut.
import { makeWhich, phone, chat, bubble, label, glow, floor, bed, pillow, clock, card, actionLines, drawStarChar, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, INTER } from '../../kwoe01/scenes/wokit.js'

function p1(x, t, P) {   // Aries: send + throw (frame-0 panel)
  bed(x, 10, 480, 460, { col: '#f0603a' })
  pillow(x, 380, 420, 120, 56)
  const ph = saw(t + 0.25, 1.5), fly = clamp(ph / 0.5)
  P.star(x, t, { x: 140, y: 320, s: 180, mood: ph < 0.5 ? 'wide' : 'squint', look: [1, -0.3], squash: ph < 0.1 ? 0.1 : 0 })
  const px = lerp(220, 420, ease.outCubic(fly)), py = lerp(260, 400, fly) - 160 * Math.sin(Math.PI * fly)
  phone(x, px, py, { s: 0.6, rot: fly * 9 })
  if (fly < 1) actionLines(x, t, px, py, 40, 70, 6, BONE, 0.6)
  bubble(x, t, 220, 90, P.turn[0] + 0.3, Infinity, 'SENT. bye phone.', { size: 27 })
}

function p2(x, t, P) {   // Libra: ten drafts
  floor(x)
  P.star(x, t, { x: 130, y: 340, s: 170, mood: 'squint', look: [1, 0] })
  const n = Math.min(10, 2 + Math.floor((t * 3) % 9))
  for (let i = 0; i < n; i++) card(x, 320 + (i % 3) * 8, 380 - i * 28, 220, 46, ['hey :)', 'hey!', 'hi…', 'heyyy', 'hello you'][i % 5] + `  v${i + 1}`, { size: 20, rot: (i % 2 ? 0.04 : -0.04) })
  bubble(x, t, 220, 100, P.turn[0] + 0.4, Infinity, 'draft ten. or eleven?', { size: 25 })
}

function p3(x, t, P) {   // Scorpio: exactly 11:11
  floor(x)
  const tick = P.u > 0.9
  clock(x, 320, 130, tick ? '11:11' : '11:10', { col: tick ? GOLD : '#ff6b7f', s: 1.1 })
  if (tick) glow(x, 320, 130, 150, '255,230,150', 0.4)
  P.star(x, t, { x: 170, y: 340, s: 180, mood: tick ? 'sparkle' : 'squint', look: [1, -0.4], blink: false })
  phone(x, 340, 360, { s: 0.85, rot: 0.1, screen: (x, w, h) => chat(x, w, h, [{ me: true, text: tick ? 'hi (sent)' : 'hi' }]) })
  bubble(x, t, 200, 470, P.turn[0] + 0.3, Infinity, 'not yet… not yet…', { size: 25 })
}

function p4(x, t, P) {   // Taurus: hands it to a friend
  floor(x)
  P.star(x, t, { x: 130, y: 340, s: 170, mood: 'squint', look: [1, 0], tears: 0 })
  drawStarChar(x, 380, 340, 150, t, { color: '#c9a6ff', mood: P.u > 0.8 ? 'happy' : 'neutral', look: [-1, 0.3], seed: 51, glow: 0.6 })
  const hand = ease.inOutCubic(clamp(prog(P.u, 0.2, 0.6)))
  phone(x, lerp(210, 320, P.u < 0 ? 0.5 : hand), 360, { s: 0.6, rot: 0.2 })
  bubble(x, t, 240, 100, P.turn[0] + 0.3, Infinity, 'you press send.', { size: 28 })
}

const EP = makeWhich({
  id: 'kwoe16', hero: 0, flash: '#ff6b7f', deep: '#c0587a',
  hook: 'About to send | *the risky text.*',
  freeze: 'thumb *hovering.*',
  panels: [
    { sign: 'aries', bg: 'bedroom', caption: 'sends it and *throws the phone*', draw: p1, cues: [['whoosh', 0.25, 0.3, 0.04], ['tom', 0.75, 130, { gain: 0.15, decay: 0.12 }]] },
    { sign: 'libra', bg: 'night', caption: 'drafts *ten versions*', draw: p2, cues: [['tick', 0.2, 0.04], ['tick', 0.5, 0.04], ['tick', 0.8, 0.04], ['tick', 1.1, 0.04]] },
    { sign: 'scorpio', bg: 'dark', caption: 'waits for *exactly 11:11*', draw: p3, cues: [['tick', 0.4, 0.05], ['bell', 0.9, 1760, 0.03, 0.8, 0]] },
    { sign: 'taurus', bg: 'kitchen', caption: 'hands the phone *to a friend*', draw: p4, cues: [['whoosh', 0.2, 0.3, 0.02], ['pop', 0.8, 880, 0.03, 0]] },
  ],
  pisces: 'cries when they reply *"same."*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [label, box, R, osc, PINK, MINT, INTER]
