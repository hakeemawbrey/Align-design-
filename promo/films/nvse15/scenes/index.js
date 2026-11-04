// nvse15: SIGN VS SIGN, "Who picks the movie better?" ♊ Gemini vs ♎ Libra (18 s trial reel, b46, music: jazzy · C).
// Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js. (Generic movies only: no titles.)
//   hook: a remote spins in the air between them.
//   ROUND 1 ♊ "plays *every trailer* at once." the screen splits into four flashing trailers. "this one! no, THIS one!" → "what if we watch all of them?"
//   ROUND 2 ♎ "makes *pros and cons* for each." the list grows, an hour passes. "an hour later…" → "still on column B."
//   VERDICT "THE DATE. | *Picked in five seconds.*" the date star takes the remote: "this one."  THE STARS: "Sometimes the kindest choice is just choosing."
import { makeVersus, drawStarChar, starFrame, crownOn, drawProp, screenBox, couch, paper, label, bubble, R, pop01, SW, T, MINT } from '../../nvse01/scenes/versuskit.js'

const DATE = '#ffc7a6'

const EP = makeVersus({
  id: 'nvse15', a: 'gemini', b: 'libra', accent: '#c9a6ff',
  hook: 'Who picks | the *movie* better?',
  hookMoods: ['sparkle', 'neutral'],
  hookDraw(x, t) { drawProp(x, 'remote', 540, 650 + 20 * Math.sin(t * 4), 10, { rot: t * 4 }) },
  rounds: [
    {
      caption: 'plays *every trailer* at once.', deep: '#b8860b',
      set: 'room', tint: '#1a1a3a', setOpts: { window: false },
      moods: ['sparkle', 'wide'], fx: ['sparkle'],
      hero: { x: 540, y: 1000, s: 240 },
      draw(x, t, S) {
        screenBox(x, 540, 600, 560, 280, { col: '#14102a' })
        const cols = ['#c45a8a', '#4f7cd8', '#3fb08a', '#d9a03a']
        for (let i = 0; i < 4; i++) { const on = Math.sin(t * 9 + i * 2.1) > -0.4; R(x, on ? cols[i] : '#2a2148', 274 + (i % 2) * 268, 474 + Math.floor(i / 2) * 128, 260, 120); label(x, `TRAILER ${i + 1}`, 404 + (i % 2) * 268, 534 + Math.floor(i / 2) * 128, { size: 20 }) }
        couch(x, 540, 1160, 600)
      },
      bubbles: ['this one! no, THIS one!', 'what if we watch all of them?'],
      bubblePos: [[320, 800, 0.3], [700, 870, -0.3]],
      cues: [0.4, 0.7, 1.0, 1.3].map(c => ['tick', c, 0.05]),
    },
    {
      caption: 'makes *pros and cons* for each.', deep: '#a03a8a',
      set: 'room', tint: '#1a1a3a', setOpts: { window: false },
      moods: ['neutral', 'sleepy'], fx: [],
      hero: { x: 780, y: 1000, s: 240 },
      draw(x, t, S) {
        const n = Math.min(5, 1 + Math.floor(S.u / 0.4))
        paper(x, 330, 760, 440, 420, { title: 'PROS  |  CONS', lines: ['A: cozy | long', 'B: funny | sad?', 'C: …', 'D: …', 'E: …'].slice(0, n), size: 28, rot: -0.03, k: pop01(t, S.t0 + 0.1) })
        if (S.u > SW) label(x, '1 HOUR LATER', 330, 1020, { size: 32, col: MINT })
        couch(x, 640, 1160, 560)
      },
      bubbles: ['an hour later…', 'still on column B.'],
      bubblePos: [[760, 660, 0], [760, 770, 0]],
      cues: [0.4, 0.8, 1.2, 1.6].map(c => ['tick', c, 0.04]).concat([['pluck', 1.76, 659.25, 0.03, 0.6, 0]]),
    },
  ],
  verdict: {
    who: 'none', text: 'THE DATE. | *Picked in five seconds.*', late: 4,
    draw(x, t, S) {
      const k = pop01(t, T.crown + 0.1, 0.3, 2.2) * S.ok
      if (k <= 0.01) return
      const o = { color: DATE, seed: 13, glow: 0.9, mood: 'sparkle', pop: k, hops: [T.crown + 0.3, T.crown + 1.2] }
      drawStarChar(x, 540, 1130, 140, t, o)
      crownOn(x, starFrame(540, 1130, 140, t, o), k)
      drawProp(x, 'remote', 610, 1150, 5)
      bubble(x, t, 540, 690, T.crown + 0.6, 13.4, 'this one.', { size: 30, col: '#ffe9b0' })
    },
  },
  last: 'Sometimes the kindest choice is just choosing.',
  cues: [['pop', 10.2, 1318.51, 0.04, 0], ['tick', 10.7, 0.06]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
