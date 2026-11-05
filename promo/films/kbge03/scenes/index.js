// kbge03: BIO GLOW-UP, "The bio that needs a scroll bar" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Gemini's bio mid-scroll, a wall of text pouring past, the scroll thumb a sliver; hook "This bio needs | a *scroll bar.*"
//   0.35  screen shake · 0.9 the bio keeps scrolling · 1.0 loading bar "reading bio…" stalls at 4% · 1.35 circle "9 hobbies"
//   2.9   strike · 3.4 the glow-up: "Talks fast, listens faster. Ask about my *three* hobbies this week."
//   glow: Pisces sobs "it fits!" · 8.5 last line · 9.55–10 loop back into the pouring wall (frame 0).
import { makeBio, signStar, R, KIT, prog, ease, lerp, GREY } from '../../kbge01/biokit.js'
const LOAD = { at: 0.9, len: 1.9, label: 'reading bio…', stallAt: 4, error: null, y: 1480 }
const EP = makeBio({
  id: 'kbge03', sign: 'gemini', name: 'Gemini', age: 25, D: 10,
  hook: 'This bio needs | a *scroll bar.*', hookColor: '#ffe27a',
  bad: 'Podcasts, puns, 9 hobbies, 3 theories, my ranking of every soup, my morning routine, my evening routine, my',
  bioSize: 36, goodSize: 52, badCol: '#5d5575',
  circle: { word: '9 hobbies', label: 'TOO MUCH' },
  good: 'Talks fast, listens faster. Ask about my *three* hobbies this week.',
  fx: 'shake', end: 'loop', cps: 30,
  T: { circle: 1.5, strike: [2.9, 3.4], swap: 3.55 },
  kit: [[KIT.loadingBar, KIT.loadingBarCues, LOAD]],
  // the wall keeps scrolling (it pours in from below) until the strike, with a shrinking scroll thumb
  over: (x, t, S) => {
    if (t > S.T.swap) return
    const { CARD } = S
    const thumb = lerp(70, 18, ease.outCubic(prog(t, 0, 2.5)))
    const pos = (t * 140) % (CARD.h - 700 - thumb)
    R(x, '#e4dccd', CARD.x + CARD.w - 22, CARD.y + 620, 10, CARD.h - 660)
    R(x, GREY, CARD.x + CARD.w - 22, CARD.y + 620 + pos, 10, thumb)
    // ghost lines of more text sliding under the card bottom
    x.save(); x.globalAlpha = 0.45 * (1 - prog(t, S.T.strike[0], S.T.swap))
    for (let i = 0; i < 3; i++) R(x, '#b9b0c8', CARD.x + 54, CARD.y + CARD.h - 34 + i * 4 - ((t * 60) % 4), 520 - i * 120, 3)
    x.restore()
  },
  last: 'One great line | beats *forty.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
