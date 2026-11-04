// nvse13: SIGN VS SIGN, "Who handles a snow day date better?" ♈ Aries vs ♋ Cancer (16 s trial reel, b46,
// music: pop · D). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: snow falls on both of them.
//   ROUND 1 ♈ "races to build the *tallest snowman.*" the snowman grows past Aries. "go go go!" → "it’s taller than us!"
//   ROUND 2 ♋ "brings *two thermoses* and spare mittens." the shivering date warms up. "your hands are cold. take these." → "cocoa or tea?"
//   VERDICT "CANCER. | *Warm hands.*" Aries laughs and gives its scarf to the snowman.  THE STARS: "Notice who's cold. Hand them the mittens."
import { makeVersus, drawStarChar, drawProp, snowfall, pop01, prog, lerp, clamp, SW, T } from '../../nvse01/scenes/versuskit.js'

const DATE = '#ffc7a6'
const date = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE, seed: 13, glow: 0.8, ...o })

const EP = makeVersus({
  id: 'nvse13', a: 'aries', b: 'cancer', accent: '#c9ecfb',
  hook: 'Who handles | a *snow day date* better?',
  hookMoods: ['sparkle', 'happy'],
  hookBack(x, t) { snowfall(x, t, 0.8, { n: 50 }) },
  rounds: [
    {
      caption: 'races to build the *tallest snowman.*', deep: '#c0392b',
      set: 'snow',
      moods: ['sparkle', 'wide'], fx: ['sparkle'],
      hero: { x: 330, y: 1000, s: 250 },
      look: [1, -0.4],
      pose: (u) => ({ x: 330 + 50 * Math.sin(u * 9) * (u < SW ? 1 : 0) }),
      draw(x, t, S) {
        const cell = lerp(6, 27, clamp(prog(S.u, 0.2, SW + 0.2)))
        drawProp(x, 'snowman', 760, 1180 - 6 * cell, cell)
      },
      bubbles: ['go go go!', 'it’s taller than us!'],
      bubblePos: [[320, 640, 0], [330, 760, 0]],
      cues: [['riser', 0.2, 1.95, 0.025], ['pop', 1.95, 1318.51, 0.045, 0.3]],
    },
    {
      caption: 'brings *two thermoses* and spare mittens.', deep: '#2f6fb0',
      set: 'snow',
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 320, y: 1000, s: 250 },
      look: [1, 0],
      draw(x, t, S) {
        const warm = S.u > SW
        date(x, t, { x: 770, y: 1010, s: 230, mood: warm ? 'happy' : 'squint', look: [-1, 0], squash: warm ? 0 : 0.03 * Math.sin(t * 50) })
        if (warm) { drawProp(x, 'mitten', 640, 1060, 8); drawProp(x, 'mitten', 900, 1060, 8, { sx: -1 }) }
      },
      front(x, t, S) {
        drawProp(x, 'thermos', 470, 1100, 9); drawProp(x, 'thermos', 530, 1110, 9)
        if (S.u < SW) { const k = pop01(t, S.t0 + 0.6); drawProp(x, 'mitten', 520, 940, 8 * k); drawProp(x, 'mitten', 590, 950, 8 * k, { sx: -1 }) }
      },
      bubbles: ['your hands are cold. take these.', 'cocoa or tea?'],
      bubblePos: [[400, 640, -0.2], [350, 760, 0]],
      cues: [['pop', 0.62, 987.77, 0.04, 0.2], ['pluck', 1.8, 1174.66, 0.04, 0.5, 0.3]],
    },
  ],
  verdict: {
    who: 'b', text: 'CANCER. | *Warm hands.*', late: 2,
    back(x, t) { snowfall(x, t, 0.5, { n: 30 }) },
    draw(x, t, S) { const k = pop01(t, T.crown + 0.6, 0.3, 2.2) * S.ok; if (k > 0.01) { drawProp(x, 'snowman', 470, 1030, 7 * k); drawProp(x, 'scarf', 470, 1010, 4 * k) } },
  },
  last: 'Notice who’s cold. Hand them the mittens.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
