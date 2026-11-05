// kwoe06: WHICH ONE ARE YOU? · "I Like You" (trial reel, dreamy · A, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  a giant speech bubble "I like you" mid-pop over the grid, all four mid-blush (whip out of panel 4).
//   1 Taurus: "cool. want snacks?" · 2 Aquarius: "define 'like.'" · 3 Cancer is already planning a picnic ·
//   4 Gemini: "me too!! wait, LIKE like?"  5 Pisces: cries "I like you too!!"  Loops.
import { makeWhich, slam0, bubble, thought, label, glow, hearts, card, floor, drawBits, HEART, sparkles, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, INTER, SERIF } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 990); x.scale(s, s); x.rotate(-0.05)
  box(x, -330, -95, 660, 190, BONE, { b: 10 }); R(x, INK, -60, 95, 40, 40); R(x, BONE, -50, 90, 24, 30)
  x.font = `800 96px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('I like ', -70, 6)
  x.font = `italic 500 116px ${SERIF}`; x.fillStyle = '#e8344e'; x.fillText('you.', 170, 4)
  drawBits(x, HEART, { H: '#ff5c8a' }, 300, -90, 8)
  x.restore()
}

function p1(x, t, P) {   // Taurus: snacks
  floor(x, '#3a2a2a')
  P.star(x, t, { x: 180, y: 320, s: 190, mood: 'happy', look: [1, 0], blush: 1 })
  // a snack bowl offered
  x.save(); x.translate(350, 350 + 6 * osc(t, 1.5))
  R(x, INK, -70, -10, 140, 60); R(x, '#ffb36b', -64, -6, 128, 50)
  for (let i = 0; i < 6; i++) R(x, ['#f2c75c', '#e9b24a'][i % 2], -50 + i * 18, -22 - (i % 2) * 8, 16, 16)
  x.restore()
  bubble(x, t, 230, 110, P.turn[0] + 0.35, Infinity, 'cool. want snacks?', { size: 27 })
}

function p2(x, t, P) {   // Aquarius: define "like"
  box(x, 220, 60, 240, 170, '#1f3a2a', { b: 7 })
  x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'left'; x.fillStyle = BONE
  ;['like (v):', '1. enjoy?', '2. LIKE like?', '3. ???'].forEach((s, i) => { if (P.u > i * 0.25 || P.u < 0) x.fillText(s, 236, 92 + i * 36) })
  floor(x)
  P.star(x, t, { x: 140, y: 340, s: 180, mood: 'squint', look: [1, -0.5], blush: 0.6 })
  bubble(x, t, 260, 300, P.turn[0] + 0.35, Infinity, "define 'like.'", { size: 28 })
}

function p3(x, t, P) {   // Cancer: planning the picnic already
  R(x, '#2f5a3a', 0, 380, 480, 180)
  // the checkered blanket
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) R(x, (i + j) % 2 ? '#e8344e' : BONE, 60 + i * 60, 430 + j * 40, 60, 40)
  box(x, 330, 360, 90, 60, '#a07850', { b: 5 }); R(x, INK, 350, 340, 50, 8)
  P.star(x, t, { x: 180, y: 300, s: 180, mood: 'heart', look: [1, 0] })
  card(x, 360, 200, 150, 120, 'PICNIC\n✓ snacks\n✓ playlist', { size: 20, rot: 0.08 })
  hearts(x, t, P.turn[0] + 0.2, 180, 200, { n: 6, loop: 1.4 })
  bubble(x, t, 180, 80, P.turn[0] + 0.4, Infinity, 'saturday? I packed.', { size: 25 })
}

function p4(x, t, P) {   // Gemini: me too… wait
  floor(x)
  const second = P.u > 0.75
  P.star(x, t, { x: 240, y: 330, s: 200, mood: second ? 'wide' : 'heart', look: [0, 0], blush: 1, hops: [0.1, 0.4, 0.75].map(v => P.turn[0] + v) })
  bubble(x, t, 240, 100, P.turn[0] + 0.1, P.turn[0] + 0.75, 'me too!!', { size: 34 })
  bubble(x, t, 240, 100, P.turn[0] + 0.75, Infinity, 'wait, LIKE like?', { size: 30, col: '#ffe9a8' })
  sparkles(x, t, 240, 300, P.turn[0] + 0.1, 8, 140, 0.2)
  if (P.u < 0) hearts(x, t, 0, 240, 220, { n: 5, loop: 1.2 })
}

const EP = makeWhich({
  id: 'kwoe06', hero: 3, flash: '#ff8fb1', deep: '#c0587a', fx,
  hook: 'Someone just said | *"I like you."*',
  freeze: 'say *something.*',
  panels: [
    { sign: 'taurus', bg: 'kitchen', caption: '"cool. *want snacks?*"', draw: p1, cues: [['pop', 0.4, 880, 0.03, 0]] },
    { sign: 'aquarius', bg: 'office', caption: '"define *like.*"', draw: p2, cues: [['tick', 0.25, 0.04], ['tick', 0.5, 0.04], ['tick', 0.75, 0.04]] },
    { sign: 'cancer', bg: 'park', caption: 'already *planning a picnic*', draw: p3, cues: [['glitter', 0.2, 0.6]] },
    { sign: 'gemini', bg: 'party', caption: '"me too!! wait, *LIKE like?*"', draw: p4, cues: [['pop', 0.12, 1318.51, 0.04, 0], ['pop', 0.77, 659.25, 0.04, 0]] },
  ],
  pisces: 'cries *"I like you too!!"*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, label, glow, saw, prog, clamp, lerp, GOLD, PINK, MINT]
