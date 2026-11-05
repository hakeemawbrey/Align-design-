// kwoe03: WHICH ONE ARE YOU? · "The Crush Walks In" (trial reel, funk · E, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 2: Taurus frozen mid-bite, a snack halfway in.
//   1 Aries marches straight over · 2 Taurus freezes mid-bite · 3 Aquarius studies a wall poster "intensely" ·
//   4 Virgo fixes their hair in the phone camera.  5 Pisces: cries because they said "hi."  Loops.
import { makeWhich, phone, bubble, thought, label, glow, sandwich, floor, actionLines, sweat, sparkles, drawStarChar, signStar, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const door = (x, X) => { box(x, X, 150, 110, 320, '#6b4a2f', { b: 6, hi: '#8a6440' }); R(x, GOLD, X + 88, 310, 12, 12) }
const crush = (x, t, X, look = -1) => drawStarChar(x, X, 340, 120, t, { color: '#7fe3d0', mood: 'happy', look: [look, 0], seed: 9, glow: 0.8 })

function p1(x, t, P) {   // Aries: marches straight over
  floor(x, '#4a2a3a')
  door(x, 360); crush(x, t, 410)
  const k = ease.inOutCubic(prog(P.u, 0.1, 0.9))
  const ax = lerp(90, 260, Math.max(0, k)), step = Math.abs(Math.sin(t * 10)) * 14
  P.star(x, t, { x: ax, y: 340 - step, s: 170, mood: 'sparkle', look: [1, 0], bob: 0 })
  actionLines(x, t, ax - 100, 320, 10, 40, 5, BONE, 0.5, 2.2)
  bubble(x, t, 220, 110, P.turn[0] + 0.5, Infinity, "hi! I'm Aries.", { size: 28, tail: 0.3 })
}

function p2(x, t, P) {   // Taurus: frozen mid-bite (frame-0 panel)
  R(x, '#5a3a2a', 0, 410, 480, 40); floor(x, '#3f2a2a', 450)
  P.star(x, t, { x: 200, y: 310, s: 200, mood: 'wide', look: [1, 0], bob: 0, blink: false })
  sandwich(x, 300, 352, 1.0)
  // "freeze" ticks around
  for (let i = 0; i < 4; i++) R(x, BONE, 330 + i * 30, 170 + (i % 2) * 14, 14, 4)
  crush(x, t, 420, -1)
  label(x, '. . .', 230, 120, { size: 40 })
  bubble(x, t, 220, 470, P.turn[0] + 0.4, Infinity, '(still chewing)', { size: 26 })
}

function p3(x, t, P) {   // Aquarius: studies a poster intensely
  box(x, 220, 60, 220, 260, '#1d2a5c', { b: 6 })
  for (let i = 0; i < 9; i++) R(x, [BONE, GOLD, PINK][i % 3], 240 + (i * 47) % 180, 80 + (i * 61) % 150, 6, 6)
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('NEBULAS!', 330, 290)
  floor(x)
  P.star(x, t, { x: 140, y: 340, s: 180, mood: 'squint', look: [1, -0.6] })
  sweat(x, t, 210, 240)
  crush(x, t, 420, -1)
  thought(x, t, 150, 110, P.turn[0] + 0.35, Infinity, "don't look don't look", { size: 22 })
}

function p4(x, t, P) {   // Virgo: hair check in the phone camera
  floor(x, '#2a2148')
  P.star(x, t, { x: 180, y: 330, s: 190, mood: P.u > 0.9 ? 'happy' : 'squint', look: [1, -0.2], hops: [P.turn[0] + 0.9] })
  phone(x, 350, 290, { s: 1.15, rot: -0.1, glowA: 0.3, screen: (x, w, h) => { R(x, '#3a2d66', 0, 0, w, h); drawStarChar(x, w / 2, h / 2 + 10, 70, t, { color: signStar('virgo').color, mood: 'squint', look: [0, 0], glow: 0, tips: false }) } })
  // the hand fixing a tuft
  const tuft = osc(t, 3)
  R(x, INK, 170 + 10 * tuft, 160, 20, 26); R(x, '#ffd98a', 174 + 10 * tuft, 164, 12, 18)
  sparkles(x, t, 180, 200, P.turn[0] + 0.9, 8, 90, 0.2)
  bubble(x, t, 240, 100, P.turn[0] + 0.35, Infinity, 'ok. ok. ok. ok.', { size: 26 })
}

const EP = makeWhich({
  id: 'kwoe03', hero: 1, flash: '#ffd98a', deep: '#c0587a',
  hook: 'Your *crush* | just walked in.',
  freeze: 'they’re *here.*',
  panels: [
    { sign: 'aries', bg: 'cafe', caption: 'marches *straight over*', draw: p1, cues: [['tick', 0.2, 0.04], ['tick', 0.35, 0.04], ['tick', 0.5, 0.04], ['tick', 0.65, 0.04], ['pop', 0.5, 1174.66, 0.03, 0]] },
    { sign: 'taurus', bg: 'kitchen', caption: 'freezes *mid-bite*', draw: p2, cues: [['bell', 0.2, 1318.51, 0.02, 0.6, 0]] },
    { sign: 'aquarius', bg: 'blue', caption: 'studies a poster *very intensely*', draw: p3, cues: [['pluck', 0.3, 739.99, 0.03, 0.4, 0]] },
    { sign: 'virgo', bg: 'night', caption: 'fixes their hair *in the phone camera*', draw: p4, cues: [['glitter', 0.9, 1.3]] },
  ],
  pisces: 'cries because they said *"hi."*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, clamp, MINT, BLUE]
