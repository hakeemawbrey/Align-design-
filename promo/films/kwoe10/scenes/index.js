// kwoe10: WHICH ONE ARE YOU? · "The Friend Who Asks for Advice" (trial reel, jazzy · F, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 1: Capricorn mid-click on a slideshow, a chart flying in.
//   1 Capricorn makes a slideshow · 2 Libra sees both sides forever · 3 Aquarius: "just be weird about it" ·
//   4 Leo makes it about their own story.  5 Pisces: cries harder than the friend.  Loops.
import { makeWhich, bubble, thought, label, glow, floor, couch, sparkles, actionLines, drawStarChar, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const friend = (x, t, X, Y = 360, mood = 'wide', look = -1, s = 110) => drawStarChar(x, X, Y, s, t, { color: '#9fd8f6', mood, look: [look, 0], seed: 21, glow: 0.6 })

function p1(x, t, P) {   // Capricorn: the slideshow
  box(x, 150, 50, 310, 210, BONE, { b: 6 })
  const slide = Math.floor(t / 0.8) % 3
  x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK; x.fillText(['YOUR CRUSH: A PLAN', 'OPTION A vs B', 'NEXT STEPS'][slide], 168, 84)
  for (let i = 0; i < 4; i++) { const h = 30 + ((i * 37 + slide * 23) % 90); R(x, [PINK, MINT, BLUE, GOLD][i], 180 + i * 64, 240 - h, 44, h) }
  const fly = ease.outCubic(saw(t, 0.8)); if (fly < 1) { x.save(); x.globalAlpha = 1 - fly; R(x, GOLD, 300 + 200 * fly, 140 - 60 * fly, 50, 30); x.restore() }
  floor(x)
  P.star(x, t, { x: 110, y: 350, s: 160, mood: 'neutral', look: [1, -0.5] })
  friend(x, t, 400, 380, 'sleepy', -1)
  bubble(x, t, 260, 300, P.turn[0] + 0.35, Infinity, 'slide 14 of 40.', { size: 26 })
}

function p2(x, t, P) {   // Libra: both sides, forever
  floor(x)
  const sw = Math.sin(t * 3)
  P.star(x, t, { x: 240, y: 330, s: 190, mood: 'squint', look: [sw, 0], squash: 0.05 * sw })
  label(x, 'on one hand…', 110, 210, { size: 22, alpha: sw < 0 ? 1 : 0.3 })
  label(x, '…on the other', 370, 210, { size: 22, alpha: sw > 0 ? 1 : 0.3 })
  // a balance scale above
  x.save(); x.translate(240, 110); R(x, INK, -4, 0, 8, 40); x.rotate(0.25 * sw); R(x, INK, -110, -4, 220, 8); R(x, GOLD, -130, 4, 40, 10); R(x, GOLD, 90, 4, 40, 10); x.restore()
  friend(x, t, 410, 400, 'sleepy', -1, 90)
  bubble(x, t, 240, 470, P.turn[0] + 0.5, Infinity, 'but ALSO…', { size: 28 })
}

function p3(x, t, P) {   // Aquarius: just be weird about it
  floor(x)
  P.star(x, t, { x: 170, y: 330, s: 180, mood: 'sparkle', look: [1, 0] })
  // tiny antenna on the head, bobbing
  const ax = 170, ay = 220
  R(x, INK, ax - 3, ay - 40 + 4 * osc(t, 2), 6, 40); R(x, MINT, ax - 9, ay - 52 + 4 * osc(t, 2), 18, 18)
  friend(x, t, 380, 370, P.u > 0.6 ? 'happy' : 'wide', -1, 120)
  bubble(x, t, 240, 100, P.turn[0] + 0.3, Infinity, 'just be weird about it.', { size: 25 })
}

function p4(x, t, P) {   // Leo: about their own story
  const spot = clamp(prog(P.u, 0.2, 0.5))
  glow(x, 180, 300, 200, '255,236,180', 0.35 * Math.max(spot, P.u < 0 ? 1 : 0))
  floor(x)
  P.star(x, t, { x: 180, y: 330, s: 190, mood: 'sparkle', look: [0, -0.3], hops: [0.3, 0.8, 1.3].map(v => P.turn[0] + v) })
  actionLines(x, t, 180, 310, 110, 140, 8, GOLD, 0.5)
  friend(x, t, 400, 400, 'neutral', -1, 90)
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'that reminds me of ME', { size: 25 })
}

const EP = makeWhich({
  id: 'kwoe10', hero: 0, flash: '#9fe6b0', deep: '#2a6fd0',
  hook: 'Your friend needs | *dating advice.*',
  freeze: 'you’re *the expert.*',
  panels: [
    { sign: 'capricorn', bg: 'office', caption: 'makes a *slideshow*', draw: p1, cues: [['tick', 0.1, 0.05], ['tick', 0.9, 0.05]] },
    { sign: 'libra', bg: 'cafe', caption: 'sees *both sides* forever', draw: p2, cues: [['pluck', 0.3, 659.25, 0.03, 0.4, -0.4], ['pluck', 0.8, 659.25, 0.03, 0.4, 0.4]] },
    { sign: 'aquarius', bg: 'blue', caption: '"just be *weird* about it"', draw: p3, cues: [['pop', 0.3, 1174.66, 0.03, 0]] },
    { sign: 'leo', bg: 'stage', caption: 'makes it about *their own story*', draw: p4, cues: [['glitter', 0.2, 0.6]] },
  ],
  pisces: 'cries *harder than the friend.*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, couch, sparkles, lerp, PINK]
