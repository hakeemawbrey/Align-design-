// nvse06: SIGN VS SIGN, "Who says “I like you” first better?" ♒ Aquarius vs ♓ Pisces (18 s trial reel, b46,
// music: dreamy · Eb). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
// Pisces plays this one, so it cries on its own side (no corner Pisces).
//   hook: a heart beats between them, both blushing.
//   ROUND 1 ♒ "presents it like a *science fair.*" a HYPOTHESIS poster, then RESULTS. "hypothesis: I like you." → "results: still true."
//   ROUND 2 ♓ "writes a *whole poem* and sobs." a long poem, page 1 of 9, tears to fountains. "you’re my favourite—" → "*sob* sorry, keep going?"
//   VERDICT "BOTH. | *Said it out loud.*"  THE STARS: "Brave counts in any style. Just say it."
import { makeVersus, paper, drawProp, HEART, drawBits, pop01, SW, T } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse06', a: 'aquarius', b: 'pisces', accent: '#ff8fb1',
  hook: 'Who says | *“I like you”* first?',
  hookMoods: ['sparkle', 'sparkle'],
  hookDraw(x, t) { const b = 1 + 0.12 * Math.max(0, Math.sin(t * 9)); drawBits(x, HEART, { H: '#ff4f86' }, 540, 650, 13 * b) },
  rounds: [
    {
      caption: 'presents it like a *science fair.*', deep: '#2a7ab0',
      set: 'room', tint: '#1f2f4a', setOpts: { window: false },
      moods: ['neutral', 'sparkle'], fx: ['sparkle'],
      hero: { x: 820, y: 1010, s: 250 },
      draw(x, t, S) {
        paper(x, 330, 720, 440, 230, { title: 'HYPOTHESIS', lines: ['I like you.'], align: 'center', size: 40, k: pop01(t, S.t0 + 0.2), rot: -0.03 })
        const k = pop01(t, S.sw + 0.05, 0.3, 2.4)
        paper(x, 330, 990, 440, 210, { title: 'RESULTS', lines: ['still true. ♥'], align: 'center', size: 40, k, rot: 0.03, accent: '#2f9a5a' })
      },
      bubbles: ['hypothesis: I like you.', 'results: still true.'],
      bubblePos: [[780, 620, 0.3], [790, 740, 0.3]],
      cues: [['pop', 0.22, 987.77, 0.04, -0.3], ['pop', 1.8, 1318.51, 0.045, -0.3]],
    },
    {
      caption: 'writes a *whole poem* and sobs.', deep: '#6a4ab0',
      set: 'room', tint: '#2a2a5a',
      moods: ['sparkle', 'sparkle'], fx: ['hearts'],
      hero: { x: 800, y: 1000, s: 260 },
      pose: (u) => ({ tears: u > SW ? 3 : 2 }),
      draw(x, t, S) {
        paper(x, 320, 820, 420, 470, { title: 'FOR YOU', lines: ['you are the moon', 'and also the tea', 'and also my', 'favourite—', '(page 1 of 9)'], size: 28, k: pop01(t, S.t0 + 0.15), rot: -0.05, font: "'EB Garamond', serif" })
        drawProp(x, 'flower', 470, 1020, 8)
      },
      bubbles: ['you’re my favourite—', '*sob* sorry, keep going?'],
      bubblePos: [[760, 620, 0.2], [760, 730, 0.2]],
      cues: [['pluck', 1.8, 659.25, 0.03, 0.5, 0.3]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Said it out loud.*', late: 4,
    draw(x, t, S) { const b = 1 + 0.12 * Math.max(0, Math.sin(t * 9)); if (t > T.crown) drawBits(x, HEART, { H: '#ff4f86' }, 540, 700, 10 * b * S.ok * pop01(t, T.crown, 0.3, 2.4)) },
  },
  last: 'Brave counts in any style. Just say it.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
