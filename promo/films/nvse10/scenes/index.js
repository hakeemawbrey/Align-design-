// nvse10: SIGN VS SIGN, "Who handles running late better?" ♍ Virgo vs ♐ Sagittarius (18 s trial reel, b46,
// music: chiptune · B). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a clock between them ticks past seven.
//   ROUND 1 ♍ "texts ahead the *moment it knows.*" the phone: "running 5 late, so sorry!", then the ETA updates. "running 5 late, so sorry!" → "ETA updated. again."
//   ROUND 2 ♐ "turns the detour into an *adventure.*" a bakery, a SHORTCUT? sign. "ooh, a bakery!" → "we found a shortcut! (we didn’t.)"
//   VERDICT "VIRGO. | *Texted ahead.*" Sag arrives with a pastry for the date anyway.  THE STARS: "Running late? A quick heads-up is the kind part."
import { makeVersus, drawProp, phone, paper, label, pop01, SW, T, MINT, INTER } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse10', a: 'virgo', b: 'sagittarius', accent: '#ffe27a',
  hook: 'Who handles | *running late* better?',
  hookMoods: ['wide', 'sparkle'],
  hookDraw(x, t) { drawProp(x, 'clock', 540, 650, 13, { rot: 0.06 * Math.sin(t * 12) }); label(x, '7:05 PM', 540, 555, { size: 30, col: MINT }) },
  rounds: [
    {
      caption: 'texts ahead the *moment it knows.*', deep: '#c0306a',
      set: 'street', setOpts: { snow: 0.3 },
      moods: ['wide', 'neutral'], fx: ['sweat0'],
      hero: { x: 320, y: 990, s: 260 },
      pose: (u) => ({ squash: 0.05 * Math.abs(Math.sin(u * 12)) }),
      front(x, t, S) { phone(x, 790, 960, 0.85, { title: 'SENT', msgs: [{ text: 'running 5 late, sorry!', size: 17 }, ...(t > S.sw ? [{ text: 'ETA: 7:09 (for real)', size: 17 }] : [])], k: pop01(t, S.t0 + 0.2) }) },
      bubbles: ['running 5 late, so sorry!', 'ETA updated. again.'],
      bubblePos: [[340, 600, 0], [360, 710, 0]],
      cues: [['whoosh', 0.55, 0.2, 0.02], ['whoosh', 1.8, 0.2, 0.02]],
    },
    {
      caption: 'turns the detour into an *adventure.*', deep: '#6a3ab0',
      set: 'street', setOpts: { snow: 0.3 },
      moods: ['sparkle', 'happy'], fx: ['sparkle'],
      hero: { x: 400, y: 990, s: 260 },
      pose: (u) => ({ x: 400 + 80 * Math.sin(u * 4) }),
      draw(x, t, S) {
        paper(x, 800, 760, 300, 90, { title: 'BAKERY', titleSize: 44, accent: '#c45a12', k: pop01(t, S.t0 + 0.4) })
        drawProp(x, 'pastry', 760, 900, 10); drawProp(x, 'cookie', 880, 900, 7)
        const k = pop01(t, S.sw, 0.3, 2.4)
        if (k > 0.01) paper(x, 230, 860, 250, 74, { lines: ['SHORTCUT? →'], align: 'center', size: 30, k, rot: -0.12, col: '#fff1c8' })
      },
      bubbles: ['ooh, a bakery!', 'we found a shortcut! (we didn’t.)'],
      bubblePos: [[420, 600, 0], [500, 700, -0.1]],
      cues: [['pop', 0.42, 1318.51, 0.04, 0.3], ['pluck', 1.76, 987.77, 0.03, 0.4, -0.3]],
    },
  ],
  verdict: {
    who: 'a', text: 'VIRGO. | *Texted ahead.*', late: 2,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.5, 0.3, 2.4) * S.ok; if (k > 0.01) { drawProp(x, 'pastry', 900, 1060, 8 * k); label(x, 'for you!', 900, 1130, { size: 26 * k, col: '#ffe27a', font: INTER, weight: 800 }) } },
  },
  last: 'Running late? A quick heads-up is the kind part.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
