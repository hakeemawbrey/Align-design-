// nvse05: SIGN VS SIGN, "Who buys a gift on a budget better?" ♐ Sagittarius vs ♑ Capricorn (16 s trial reel, b46,
// music: jazzy · Bb). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a small wallet between them, BUDGET: SMALL.
//   ROUND 1 ♐ "plans a *day out* instead of a thing." a DAY TRIP ticket. "a trip! somewhere new!" → "the bus leaves at six."
//   ROUND 2 ♑ "keeps a list of *things they mentioned.*" the list ticks, UNDER BUDGET. "column D: things they said." → "under budget. ahead of time."
//   VERDICT "BOTH. | *They listened.*"  THE STARS: "Small budget, big attention."
import { makeVersus, paper, drawProp, label, pop01, SW, T, MINT } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse05', a: 'sagittarius', b: 'capricorn', accent: '#c9a6ff',
  hook: 'Who buys a gift | on a *budget* better?',
  hookMoods: ['sparkle', 'neutral'],
  hookDraw(x, t) { drawProp(x, 'wallet', 540, 660, 11, { rot: 0.1 * Math.sin(t * 3) }); label(x, 'BUDGET: SMALL', 540, 560, { size: 28, col: MINT }) },
  rounds: [
    {
      caption: 'plans a *day out* instead of a thing.', deep: '#6a3ab0',
      set: 'street', setOpts: { snow: 0.4 },
      moods: ['sparkle', 'happy'], fx: ['confetti'],
      hero: { x: 380, y: 990, s: 280 },
      front(x, t, S) {
        paper(x, 790, 900, 320, 190, { title: 'DAY TRIP', lines: ['somewhere new', 'bus · 6:00 AM'], align: 'center', size: 28, k: pop01(t, S.t0 + 0.4, 0.3, 2.4), rot: 0.07, col: '#fff1c8' })
      },
      bubbles: ['a trip! somewhere new!', 'the bus leaves at six.'],
      bubblePos: [[400, 620, 0], [420, 730, 0]],
      cues: [['pop', 0.42, 1318.51, 0.04, 0.3]],
    },
    {
      caption: 'keeps a list of *things they mentioned.*', deep: '#4a5a6a',
      set: 'room', tint: '#1f2a3a',
      moods: ['neutral', 'sparkle'], fx: ['sparkle'],
      hero: { x: 800, y: 1000, s: 250 },
      draw(x, t, S) {
        const ticks = Math.max(0, Math.min(3, Math.floor((S.u - 0.3) / 0.45) + 1))
        paper(x, 320, 800, 450, 330, { title: 'THINGS THEY SAID', lines: ['“my hands are cold”', '“I miss that tea”', '“lost my scarf”'], ticks, size: 28, rot: -0.04, k: pop01(t, S.t0 + 0.1) })
        const k = pop01(t, S.sw + 0.1, 0.3, 2.6)
        if (k > 0.01) label(x, 'UNDER BUDGET ✓', 320, 1010, { size: 34 * k, col: MINT, rot: -0.05 })
      },
      bubbles: ['column D: things they said.', 'under budget. ahead of time.'],
      bubblePos: [[720, 590, 0.2], [700, 700, 0.2]],
      cues: [['tick', 0.35, 0.05], ['tick', 0.8, 0.05], ['tick', 1.25, 0.05], ['pop', 1.86, 1567.98, 0.04, -0.3]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *They listened.*', late: 2,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.4, 0.3, 2.4) * S.ok; if (k > 0.01) { drawProp(x, 'ticket', 280, 1110, 6 * k); drawProp(x, 'scarf', 800, 1110, 7 * k) } },
  },
  last: 'Small budget, big attention.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
