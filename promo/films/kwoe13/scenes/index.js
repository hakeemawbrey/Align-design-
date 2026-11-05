// kwoe13: WHICH ONE ARE YOU? · "The Cute Couple" (trial reel, dreamy · D, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 4: Aries mid-thumb-slam on send.
//   The same cute couple (two little stars sharing fries) sits in the back of every panel.
//   1 Scorpio rolls their eyes, then smiles · 2 Aquarius wonders if robots fall in love · 3 Libra rates their matching
//   outfits · 4 Aries texts their crush "hi" right now.  5 Pisces: cries "they're sharing fries!"  Loops.
import { makeWhich, phone, chat, bubble, thought, label, glow, floor, hearts, actionLines, card, drawBits, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function couple(x, t, X = 360, Y = 250, s = 90) {
  R(x, '#a07850', X - 90, Y + 40, 180, 12)
  drawStarChar(x, X - 40, Y, s, t, { color: '#ffb36b', mood: 'happy', look: [1, 0], seed: 31, glow: 0.5, tips: false })
  drawStarChar(x, X + 40, Y, s, t, { color: '#7fd0ff', mood: 'heart', look: [-1, 0], seed: 32, glow: 0.5, tips: false })
  // the fries box between them
  R(x, INK, X - 16, Y + 4, 32, 36); R(x, '#e8344e', X - 12, Y + 8, 24, 28); for (let i = 0; i < 4; i++) R(x, GOLD, X - 12 + i * 7, Y - 10 - (i % 2) * 6, 4, 18)
  hearts(x, t, 0, X, Y - 40, { n: 3, cell: 4, rise: 70, loop: 1.2, spread: 60 })
}

function p1(x, t, P) {   // Scorpio: eye-roll, then a smile
  couple(x, t); floor(x)
  const smile = P.u > 0.8
  P.star(x, t, { x: 140, y: 360, s: 180, mood: smile ? 'happy' : 'eyeroll', look: [1, -0.2] })
  bubble(x, t, 160, 140, P.turn[0] + 0.85, Infinity, '…ok that’s cute.', { size: 25 })
}

function p2(x, t, P) {   // Aquarius: do robots fall in love?
  couple(x, t); floor(x)
  P.star(x, t, { x: 140, y: 360, s: 180, mood: 'sparkle', look: [1, -0.6] })
  thought(x, t, 170, 110, P.turn[0] + 0.3, Infinity, 'do robots fall in love?', { size: 22 })
  // a tiny robot in the cloud
  if (P.u > 0.5 || P.u < 0) drawBits(x, ['.A.', 'BBB', 'BWB', 'BBB', 'B.B'], { A: PINK, B: '#9aa4c0', W: MINT }, 330, 120, 7)
}

function p3(x, t, P) {   // Libra: rates the matching outfits
  couple(x, t); floor(x)
  P.star(x, t, { x: 140, y: 360, s: 180, mood: 'heart', look: [1, -0.2] })
  if (P.u > 0.4 || P.u < 0) card(x, 160, 170, 160, 90, '10/10\nmatching', { size: 24, col: BONE, rot: -0.08 + 0.04 * osc(t, 1) })
}

function p4(x, t, P) {   // Aries: texts the crush, right now (frame-0 panel)
  couple(x, t, 380, 230, 80); floor(x)
  const ph = saw(t + 0.2, 1.2)
  P.star(x, t, { x: 150, y: 350, s: 180, mood: 'wide', look: [1, 0.4], squash: ph < 0.15 ? 0.12 : 0 })
  phone(x, 300, 400, { s: 0.95, rot: 0.1, glowA: 0.35, screen: (x, w, h) => chat(x, w, h, [{ me: true, text: 'hi' }, ...(ph > 0.2 ? [{ me: true, text: 'hi!!' }] : [])]) })
  // the thumb slam
  R(x, INK, 300 - 14, 360 - 40 * (1 - Math.min(1, ph / 0.15)), 28, 34); R(x, '#f0603a', 300 - 10, 364 - 40 * (1 - Math.min(1, ph / 0.15)), 20, 26)
  if (ph < 0.25) actionLines(x, t, 300, 380, 40, 80, 8, BONE, 0.7)
  label(x, 'SENT.', 420, 480, { size: 26, col: MINT, alpha: ph > 0.15 ? 1 : 0 })
}

const EP = makeWhich({
  id: 'kwoe13', hero: 3, flash: '#ff8fb1', deep: '#c0587a',
  hook: 'Watching a couple | be *cute.*',
  freeze: 'they’re *sharing.*',
  panels: [
    { sign: 'scorpio', bg: 'cafe', caption: 'rolls their eyes, *then smiles*', draw: p1, cues: [['whoosh', 0.2, 0.3, 0.02], ['pop', 0.85, 1174.66, 0.03, 0]] },
    { sign: 'aquarius', bg: 'cafe', caption: 'wonders if *robots fall in love*', draw: p2, cues: [['pop', 0.5, 1567.98, 0.03, 0], ['pop', 0.6, 1318.51, 0.03, 0]] },
    { sign: 'libra', bg: 'cafe', caption: 'rates *their matching outfits*', draw: p3, cues: [['tick', 0.4, 0.05], ['glitter', 0.4, 0.7]] },
    { sign: 'aries', bg: 'cafe', caption: 'texts their crush *"hi" right now*', draw: p4, cues: [['tick', 0.0, 0.06], ['pop', 0.02, 1318.51, 0.04, 0], ['tick', 1.2, 0.06]] },
  ],
  pisces: 'cries *"they’re sharing fries!"*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, box, prog, clamp, lerp, PINK, BLUE, INTER]
