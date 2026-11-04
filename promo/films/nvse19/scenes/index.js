// nvse19: SIGN VS SIGN, "Who handles a small disagreement better?" ♈ Aries vs ♎ Libra (18 s trial reel, b46,
// music: lofi · Bm). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a "!" and a "?" bounce between them.
//   ROUND 1 ♈ "wants it solved *right now.*" a timer ticks beside the partner. "let’s fix it. now. go." → "why is this taking three minutes?"
//   ROUND 2 ♎ "agrees with *every side,* even the lamp’s." looks left, right, at the lamp. "you’re right. I’m right." → "the lamp makes a fair point."
//   VERDICT "BOTH. | *Came back to talk.*" a talk card: "What do you need right now?"  THE STARS: "Take a breath, then talk it through together."
import { makeVersus, drawStarChar, drawProp, label, paper, pop01, SW, T, MINT, INTER, GOLD } from '../../nvse01/scenes/versuskit.js'

const PART = '#9fd8f6'
const partner = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: PART, seed: 17, glow: 0.7, ...o })

const EP = makeVersus({
  id: 'nvse19', a: 'aries', b: 'libra', accent: '#ffb35c',
  hook: 'Who handles | a *small disagreement?*',
  hookMoods: ['wide', 'neutral'],
  hookDraw(x, t) { label(x, '!', 490, 640 - 20 * Math.abs(Math.sin(t * 5)), { size: 90, font: INTER, weight: 800, col: '#ff8a5a' }); label(x, '?', 590, 640 - 20 * Math.abs(Math.sin(t * 5 + 1.5)), { size: 90, font: INTER, weight: 800, col: '#c9a6ff' }) },
  rounds: [
    {
      caption: 'wants it solved *right now.*', deep: '#c0392b',
      set: 'room', tint: '#2a1f3a', setOpts: { lampX: 950 },
      moods: ['wide', 'squint'], fx: ['sweat'],
      hero: { x: 320, y: 990, s: 260 },
      look: [1, 0],
      pose: (u) => ({ squash: 0.04 * Math.abs(Math.sin(u * 10)) }),
      draw(x, t, S) {
        partner(x, t, { x: 760, y: 1000, s: 220, mood: 'neutral', look: [-1, 0] })
        const sec = Math.floor(S.u * 50) % 60, min = S.u > SW ? 3 : 0
        label(x, `⏱ ${min}:${String(sec).padStart(2, '0')}`, 760, 790, { size: 40, col: MINT })
      },
      bubbles: ['let’s fix it. now. go.', 'why is this taking three minutes?'],
      bubblePos: [[340, 620, 0], [520, 720, -0.3]],
      cues: Array.from({ length: 12 }, (_, i) => ['tick', 0.3 + i * 0.25, 0.025]),
    },
    {
      caption: 'agrees with *every side,* even the lamp’s.', deep: '#a03a8a',
      set: 'room', tint: '#2a1f3a', setOpts: { lampX: 950 },
      moods: ['happy', 'wide'], fx: [],
      hero: { x: 400, y: 990, s: 260 },
      look: [1, 0],
      pose: (u) => ({ look: [u > SW ? 1 : Math.sign(Math.sin(u * 5)) || 1, u > SW ? -0.5 : 0] }),
      draw(x, t, S) {
        partner(x, t, { x: 720, y: 1000, s: 200, mood: S.u > SW ? 'eyeroll' : 'neutral', look: [-1, 0] })
        if (S.u > SW) label(x, '(the lamp)', 950, 780, { size: 26, col: GOLD })
      },
      bubbles: ['you’re right. I’m right.', 'the lamp makes a fair point.'],
      bubblePos: [[400, 620, 0], [560, 720, 0.2]],
      cues: [['pop', 1.8, 880, 0.04, 0.5]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Came back to talk.*', late: 4,
    draw(x, t, S) { paper(x, 540, 680, 380, 130, { title: 'TALK CARD', lines: ['What do you need right now?'], align: 'center', size: 24, titleSize: 28, k: pop01(t, T.crown + 0.4, 0.3, 2.4) * S.ok, rot: -0.03 }) },
  },
  last: 'Take a breath, then talk it through together.',
  cues: [['pop', 10.5, 1318.51, 0.04, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void [drawProp, SW]
