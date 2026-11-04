// nvse07: SIGN VS SIGN, "Who handles an awkward pause better?" ♈ Aries vs ♊ Gemini (16 s trial reel, b46,
// music: synthwave · F#m). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: ". . ." floats between them, a cricket chirps.
//   ROUND 1 ♈ "turns it into a *staring contest.*" across a café table; the date blinks. "first to blink pays!" → "…you blinked."
//   ROUND 2 ♊ "fills it with a *question storm.*" question marks orbit, the date's eyes spin. "first pet? fave soup? why is the sky—" → "sorry. one at a time."
//   VERDICT "TIE. | *Quiet is okay.*" the date star: "I like quiet too."  THE STARS: "Not every quiet moment needs fixing."
import { makeVersus, drawStarChar, cafeTable, label, bubble, questions, drawProp, pop01, prog, SW, T, INTER } from '../../nvse01/scenes/versuskit.js'

const DATE = '#ffc7a6'
const date = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE, seed: 13, glow: 0.8, ...o })

const EP = makeVersus({
  id: 'nvse07', a: 'aries', b: 'gemini', accent: '#7fd0ff',
  hook: 'Who handles | an *awkward pause* better?',
  hookMoods: ['squint', 'wide'],
  hookDraw(x, t) { label(x, '. . .', 540, 650 + 6 * Math.sin(t * 3), { size: 80, font: INTER, weight: 800, col: '#efe6d6' }); label(x, '* chirp *', 540, 740, { size: 26, col: '#9fe6b0', alpha: 0.5 + 0.5 * Math.sin(t * 6) }) },
  rounds: [
    {
      caption: 'turns it into a *staring contest.*', deep: '#c0392b',
      set: 'room', tint: '#2a1f3a', setOpts: { lampX: 940 },
      moods: ['wide', 'sparkle'], fx: ['sparkle'],
      hero: { x: 310, y: 940, s: 250 },
      look: [1, 0],
      draw(x, t, S) {
        const bl = S.u > SW && S.u < SW + 0.3 ? 1 : false
        date(x, t, { x: 780, y: 950, s: 230, mood: S.u > SW + 0.3 ? 'happy' : 'wide', blink: bl, look: [-1, 0] })
        if (S.u > SW) label(x, 'BLINK!', 780, 760, { size: 40 * pop01(t, S.sw, 0.25, 2.6), col: '#ffe27a', font: INTER, weight: 800 })
      },
      front(x, t) { cafeTable(x, 540, 1090, 640); drawProp(x, 'mug', 400, 1050, 8); drawProp(x, 'mug', 680, 1050, 8) },
      bubbles: ['first to blink pays!', '…you blinked.'],
      bubblePos: [[320, 620, 0], [330, 730, 0]],
      cues: [['riser', 0.6, 1.7, 0.02], ['tick', 1.76, 0.08]],
    },
    {
      caption: 'fills it with a *question storm.*', deep: '#b8860b',
      set: 'room', tint: '#1f2a4a', setOpts: { lampX: 940 },
      moods: ['sparkle', 'wide'], fx: [],
      hero: { x: 310, y: 940, s: 250 },
      look: [1, 0],
      draw(x, t, S) { date(x, t, { x: 780, y: 950, s: 230, mood: S.u > SW ? 'happy' : 'eyeroll', look: [-1, 0] }) },
      front(x, t, S) { cafeTable(x, 540, 1090, 640); drawProp(x, 'mug', 400, 1050, 8); drawProp(x, 'mug', 680, 1050, 8); if (S.u < SW + 0.2) questions(x, t, 780, 930, S.t0 + 0.4, { n: 6, Rr: 170 }) },
      bubbles: ['first pet? fave soup? why is the sky—', 'sorry. one at a time.'],
      bubblePos: [[540, 620, -0.4], [330, 730, 0]],
      cues: [0.45, 0.6, 0.75, 0.9, 1.05, 1.2].map(c => ['pop', c, 1567.98, 0.02, 0.3]),
    },
  ],
  verdict: {
    who: 'none', text: 'TIE. | *Quiet is okay.*', late: 3,
    draw(x, t, S) {
      const k = pop01(t, T.crown + 0.2, 0.3, 2.2) * S.ok
      if (k > 0.01) date(x, t, { x: 540, y: 1150, s: 130, pop: k, mood: 'happy', hops: [T.crown + 0.5] })
      bubble(x, t, 540, 690, T.crown + 0.6, 13.4, 'I like quiet too.', { size: 30, col: '#ffe9b0' })
      void prog
    },
  },
  last: 'Not every quiet moment needs fixing.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
