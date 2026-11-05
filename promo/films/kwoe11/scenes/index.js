// kwoe11: WHICH ONE ARE YOU? · 'The "What Are We?" Talk' (trial reel, cinematic · Gm, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  record-scratch energy: Aries mid-shout "SO WHAT ARE WE?", the others mid-flinch (whip out of panel 1).
//   1 Aries asks first, very loudly · 2 Virgo rehearses with flashcards · 3 Sagittarius changes the subject to a trip ·
//   4 Taurus brings it up over dessert.  5 Pisces: cries "we're US."  Hard cut.
import { makeWhich, bubble, thought, label, glow, floor, desk, card, mug, actionLines, sweat, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const date = (x, t, X, mood = 'wide', look = -1, s = 120, Y = 360) => drawStarChar(x, X, Y, s, t, { color: '#f7a6c8', mood, look: [look, 0], seed: 23, glow: 0.6 })

function p1(x, t, P) {   // Aries: loudly
  floor(x)
  P.star(x, t, { x: 160, y: 320, s: 190, mood: 'wide', look: [1, 0], squash: 0.06 * Math.sin(t * 24) })
  actionLines(x, t, 160, 300, 110, 170, 12, '#ff6b7f', 0.6)
  date(x, t, 400, 'wide', -1, 110, 380)
  bubble(x, t, 230, 100, -10, Infinity, 'SO WHAT ARE WE?!', { size: 32, col: '#ffe0a8' })
}

function p2(x, t, P) {   // Virgo: flashcards
  floor(x)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: 'squint', look: [1, 0] })
  const c = Math.floor(t / 0.6) % 3
  card(x, 350, 300, 190, 120, ['"so… um…"', '"I value us"', '"define us?"'][c], { size: 24, rot: 0.08 * osc(t, 1) })
  card(x, 360, 312, 190, 120, '', { rot: 0.12 }); card(x, 350, 300, 190, 120, ['"so… um…"', '"I value us"', '"define us?"'][c], { size: 24, rot: 0.04 })
  label(x, `take ${7 + Math.floor(t / 0.6)}`, 350, 420, { size: 22, col: GOLD })
  bubble(x, t, 220, 110, P.turn[0] + 0.35, Infinity, 'from the top.', { size: 28 })
}

function p3(x, t, P) {   // Sagittarius: a trip!
  box(x, 240, 60, 210, 150, '#ffb36b', { b: 6 })
  R(x, '#7fd0ff', 252, 72, 186, 80); R(x, '#f2c75c', 400, 84, 26, 26); R(x, '#3fb08a', 252, 130, 186, 22)
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('LISBON?', 345, 192)
  floor(x)
  P.star(x, t, { x: 150, y: 330, s: 180, mood: 'sparkle', look: [1, -0.4], hops: [P.turn[0] + 0.3] })
  date(x, t, 400, 'squint', -1, 100, 400)
  bubble(x, t, 200, 250, P.turn[0] + 0.35, Infinity, 'anyway… road trip?', { size: 25 })
}

function p4(x, t, P) {   // Taurus: over dessert
  desk(x, 30, 400, 420, '#6b3a4a')
  // a cake slice
  x.save(); x.translate(240, 380); R(x, INK, -50, -50, 100, 54); R(x, '#ffe9c8', -46, -46, 92, 46); R(x, PINK, -46, -46, 92, 12); R(x, '#e8344e', -8, -64, 16, 16); x.restore()
  P.star(x, t, { x: 110, y: 300, s: 160, mood: 'happy', look: [1, 0] })
  date(x, t, 380, P.u > 0.8 ? 'heart' : 'happy', -1, 130, 300)
  bubble(x, t, 240, 100, P.turn[0] + 0.35, Infinity, 'so… are we a thing?', { size: 26 })
}

const EP = makeWhich({
  id: 'kwoe11', hero: 0, flash: '#ff6b7f', deep: '#c0587a',
  hook: 'Time for the | *"what are we"* talk.',
  freeze: 'here *it comes.*',
  panels: [
    { sign: 'aries', bg: 'cafe', caption: 'asks first, *very loudly*', draw: p1, cues: [['boom', 0.1, 0.12]] },
    { sign: 'virgo', bg: 'bedroom', caption: 'rehearses *with flashcards*', draw: p2, cues: [['tick', 0.2, 0.04], ['tick', 0.8, 0.04], ['tick', 1.4, 0.04]] },
    { sign: 'sagittarius', bg: 'street', caption: 'changes the subject *to a trip*', draw: p3, cues: [['whoosh', 0.3, 0.3, 0.03]] },
    { sign: 'taurus', bg: 'cafe', caption: 'brings it up *over dessert*', draw: p4, cues: [['pop', 0.4, 880, 0.03, 0], ['glitter', 0.8, 1.1]] },
  ],
  pisces: 'cries *"we’re US."*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, glow, mug, sweat, saw, prog, clamp, lerp, BONE, MINT, BLUE]
