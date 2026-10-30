// guideleo2 (15 s vertical Align ad, Star Talk "Your Star Guide", note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.20  "What you *need*, Leo."  ♌ your star in its crown points a giant #1 foam finger at… itself. A mint star
//              stands beside it with a foam finger of its own, lowered.
//   2.40–5.30  YOUR STAR: "someone who cheers loud for you…"  The friend thrusts its finger up: "GO LEO!" Confetti.
//              Chip: Leo, natural ruler of the 5th house (romance, play).
//   5.30–8.05  YOUR STAR: "and you cheer even louder back."  Leo swings its finger round to the friend: "GO YOU!!"
//              Twice the confetti, both stars glowing.
//   8.12–10.6  card flip · "Be *celebrated*. Celebrate back."  Two foam fingers, pointed at each other.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm } from './guidefilm.js'
import { INK, drawBits } from './kit.js'

const T = {
  hookOut: [1.9, 2.2], open: 2.2, l1: 2.35, cheer: 3.0, fact: [4.05, 3.4],
  l2: 5.3, swing: 5.9, back: 6.2, close: 8.05, cut: 8.12, last: 8.2, lastLand: 8.65, out: [10.1, 10.45],
}
export const CPS = 32
const HERO = { x: 330, y: 1060, size: 300 }
const PAL = { x: 830, y: 1110, size: 210, c: '#7fe0b0' }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const CONF = ['#f7c948', '#ff4f86', '#5fd0ff', '#7fe0b0', '#f39a3a', '#c9b8f0']

/** a giant foam finger; rot 0 = pointing straight up; (cx, cy) = the palm centre */
function foamFinger(x, cx, cy, s, rot, color, text) {
  if (s <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const shape = () => {
    x.beginPath(); x.roundRect(-80, -70, 160, 170, 30)            // the mitt
    x.roundRect(-74, -235, 62, 190, 28)                           // the index finger
    x.roundRect(-14, 110, 28, 130, 6)                             // the stick
  }
  x.fillStyle = INK; x.save(); x.translate(0, 0); x.lineWidth = 16; x.strokeStyle = INK; shape(); x.stroke(); x.restore()
  shape(); x.fillStyle = color; x.fill()
  x.fillStyle = 'rgba(255,255,255,0.28)'; x.beginPath(); x.roundRect(-66, -222, 18, 160, 9); x.fill()
  x.fillStyle = 'rgba(0,0,0,0.16)'; x.fillRect(-80, 60, 160, 40)
  x.fillStyle = '#8a6a2e'; x.fillRect(-14, 110, 28, 130)
  x.rotate(-rot)
  x.fillStyle = '#fff8e6'; x.font = `800 ${text.length > 3 ? 46 : 60}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 2, 18)
  x.restore()
}

/** a confetti burst from (cx, cy) at t0: pixel squares with gravity */
function confetti(x, t, t0, cx, cy, n = 26, power = 1) {
  const tt = t - t0
  if (tt < 0 || tt > 1.8) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(prog(tt, 1.1, 1.8))
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i * 0.618) % 1 - 0.5) * 2.4, v = (520 + (i * 97) % 380) * power
    const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt + 900 * tt * tt
    const sz = 12 + (i % 3) * 4
    x.fillStyle = CONF[i % CONF.length]
    x.save(); x.translate(px, py); x.rotate(tt * (6 + i % 5)); x.fillRect(-sz / 2, -sz / 3, sz, sz * 0.66); x.restore()
  }
  x.restore()
}

// big shout words
function shout(x, t, t0, t1, word, cx, cy, color, size) {
  const p = easeOutBack(prog(t, t0, t0 + 0.25), 3), a = 1 - prog(t, t1 - 0.2, t1)
  if (p <= 0 || a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(-0.08 + 0.03 * Math.sin(t * 9)); x.scale(p, p)
  x.font = `800 ${size}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = 14; x.strokeStyle = INK; x.strokeText(word, 0, 0); x.fillStyle = color; x.fillText(word, 0, 0)
  x.restore()
}

function mood(t) {
  if (t < T.cheer) return { mood: 'heart', look: [-1, 0] }
  if (t < T.swing) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'happy' }
}

// Leo's finger: pointing back at itself → swung round to the friend
const leoFingerRot = t => lerp(-1.9, 1.45, easeOutBack(prog(t, T.swing, T.swing + 0.4), 1.8)) + 0.05 * Math.sin(t * 7)
const palFingerRot = t => lerp(0.9, -0.15, easeOutBack(prog(t, T.cheer, T.cheer + 0.3), 2)) + (t > T.cheer ? 0.12 * Math.sin((t - T.cheer) * 10) : 0) - (t > T.swing ? 0.75 : 0) * ease.inOutQuad(prog(t, T.swing + 0.2, T.swing + 0.6))

const film = guideFilm({
  duration: 15, sign: 'leo', n: 2, seed: 3, side: -1, cps: CPS,
  hook: 'What you *need,* | Leo.',
  lines: [{ t: T.l1, text: 'someone who cheers *loud* for you…' }, { t: T.l2, text: 'and you cheer *even louder* back.' }],
  T, fact: 'LEO IS THE NATURAL RULER OF THE|5TH HOUSE (ROMANCE, PLAY)', factY: 1310,
  last: 'Be *celebrated.* | Celebrate back.', lastLate: 0, lastSize: 112, lastAccent: 150, hero: HERO, mood,
  hops: [T.cheer + 0.1, T.swing + 0.2, T.back + 0.3],
  back(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    drawStarChar(x, PAL.x, PAL.y, PAL.size, t, { color: PAL.c, mood: t < T.cheer ? 'neutral' : t < T.back ? 'happy' : 'heart', look: [-1, 0], seed: 6, glow: t > T.back ? 1.1 : 0.7, pop: ok, hops: [T.cheer, T.cheer + 0.4, T.back + 0.1] })
  },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    const cell = Math.round(HERO.size / 36)
    drawBits(x, CROWN, CROWN_C, r.x, r.top + cell * 0.6, cell, { rot: -0.2 + 0.04 * Math.sin(t * 3), alpha: ok })
    foamFinger(x, r.x + 200, r.y - 130, 0.85 * ok, leoFingerRot(t), '#f39a3a', t < T.swing + 0.2 ? '#1' : 'YOU')
    foamFinger(x, PAL.x + 40, PAL.y - 150, 0.72 * ok, palFingerRot(t), '#3fbf8a', t < T.swing + 0.4 ? 'LEO' : 'YOU')
    shout(x, t, T.cheer + 0.05, T.l2 - 0.1, 'GO LEO!', 720, 690, '#7fe0b0', 96)
    shout(x, t, T.back, T.close - 0.05, 'GO YOU!!', 560, 680, '#f7c948', 132)
    confetti(x, t, T.cheer + 0.05, PAL.x + 40, PAL.y - 330, 26, 1)
    confetti(x, t, T.back, 560, 720, 34, 1.15)
    confetti(x, t, T.back + 0.25, r.x + 260, r.y - 260, 30, 1.1)
  },
  cues: [
    ['pluck', 0.3, 1174.66, 0.035, 0.5, 0],
    ['whoosh', T.cheer - 0.05, 0.3, 0.03], ['boom', T.cheer + 0.05, 0.1], ['pop', T.cheer + 0.05, 880, 0.045, 0.3], ['glitter', T.cheer, T.cheer + 0.9],
    ['whoosh', T.swing, 0.35, 0.03], ['boom', T.back, 0.13], ['pop', T.back, 1174.66, 0.05, 0], ['pop', T.back + 0.25, 1318.51, 0.04, -0.3], ['glitter', T.back, T.back + 1.2],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
void clamp
