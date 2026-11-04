// nvse17: SIGN VS SIGN, "Who handles a sad movie better?" ♏ Scorpio vs ♓ Pisces (16 s trial reel, b46,
// music: cinematic · Cm). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
// Pisces plays this one, so it cries on its own side (no corner Pisces). Generic movie only: no titles.
//   hook: a screen glows blue between them.
//   ROUND 1 ♏ "doesn’t cry. *(cries.)*" on the couch, then one single tear. "I’m fine. it’s dusty." → "…ok, one tear."
//   ROUND 2 ♓ "cries *before the movie starts.*" OPENING TITLES, fountains, Scorpio beside it. "the music is so sad!!" → "babe, it’s the opening titles."
//   VERDICT "THE TISSUE BOX. | *MVP.*" a crowned tissue box.  THE STARS: "Crying together still counts as a great date."
import { makeVersus, screenBox, couch, drawProp, label, pop01, SW, T } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse17', a: 'scorpio', b: 'pisces', accent: '#7fd0ff',
  hook: 'Who handles | a *sad movie* better?',
  hookMoods: ['neutral', 'sparkle'],
  hookDraw(x) { screenBox(x, 540, 640, 220, 130, { col: '#1d3b6a', glow: 1.2 }) },
  rounds: [
    {
      caption: 'doesn’t cry. *(cries.)*', deep: '#8a1f3a',
      set: 'room', tint: '#141a3a', setOpts: { window: false },
      moods: ['neutral', 'squint'], fx: [],
      hero: { x: 540, y: 1010, s: 250 },
      pose: (u) => ({ tears: u > SW ? 1 : 0 }),
      draw(x) { screenBox(x, 540, 590, 520, 260, { col: '#1d3b6a', glow: 1.3 }); couch(x, 540, 1160, 560) },
      bubbles: ['I’m fine. it’s dusty.', '…ok, one tear.'],
      bubblePos: [[540, 790, 0], [560, 860, 0]],
      cues: [['pluck', 1.8, 659.25, 0.03, 0.8, 0]],
    },
    {
      caption: 'cries *before the movie starts.*', deep: '#6a4ab0',
      set: 'room', tint: '#141a3a', setOpts: { window: false },
      moods: ['sparkle', 'sparkle'], fx: [],
      hero: { x: 400, y: 1010, s: 250 },
      tears: 3,
      draw(x, t, S) {
        screenBox(x, 540, 590, 520, 260, { col: '#1d3b6a', glow: 1.3, text: 'OPENING TITLES', size: 32 })
        couch(x, 540, 1160, 600)
        S.other({ x: 720, y: 1020, s: 210, mood: S.u > SW ? 'happy' : 'neutral', look: [-1, 0] })
        for (let i = 0; i < 5; i++) { const k = pop01(t, S.t0 + 0.4 + i * 0.3, 0.25, 2.2); if (k > 0.01) drawProp(x, 'tissue', 170 + i * 38, 1090 - (i % 2) * 20, 5 * k) }
      },
      bubbles: ['the music is so sad!!', 'babe, it’s the opening titles.'],
      bubblePos: [[400, 790, 0], [680, 870, 0]],
      cues: [0.4, 0.7, 1.0, 1.3, 1.6].map(c => ['pop', c, 1174.66, 0.02, -0.3]),
    },
  ],
  verdict: {
    who: 'none', text: 'THE TISSUE BOX. | *MVP.*', late: 1,
    draw(x, t, S) {
      const k = pop01(t, T.crown, 0.3, 2.4) * S.ok
      if (k <= 0.01) return
      drawProp(x, 'tissue', 540, 1130 - 8 * Math.sin(t * 4), 15 * k)
      drawProp(x, 'crown', 540, 1050 - 8 * Math.sin(t * 4), 12 * k)
      label(x, 'MVP', 540, 1190, { size: 30 * k, col: '#ffe27a' })
    },
  },
  last: 'Crying together still counts as a great date.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
