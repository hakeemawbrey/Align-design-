// nvse22: SIGN VS SIGN, "Who handles meeting their pet better?" ♋ Cancer vs ♐ Sagittarius (16 s trial reel, b46,
// music: jazzy · Eb). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a dog's tail wags between them.
//   ROUND 1 ♋ "brings the cat a *tiny sweater.*" the cat, then the cat in a sweater. "I knitted it." → "she hates it. she loves it."
//   ROUND 2 ♐ "is on the floor playing *fetch* in seconds." the ball flies, the dog bounces. "who’s a good boy!" → "I’m a good boy too!"
//   VERDICT "THE PETS. | *Won everyone.*" the cat and the dog in crowns.  THE STARS: "Be kind to what they love. It shows."
import { makeVersus, drawProp, hearts, pop01, prog, ease, lerp, SW, T } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse22', a: 'cancer', b: 'sagittarius', accent: '#ffc7a6',
  hook: 'Who handles | *meeting their pet?*',
  hookMoods: ['sparkle', 'sparkle'],
  hookDraw(x, t) { drawProp(x, 'dog', 540, 660, 9, { rot: 0.04 * Math.sin(t * 14) }) },
  rounds: [
    {
      caption: 'brings the cat a *tiny sweater.*', deep: '#2f6fb0',
      set: 'room', tint: '#2a2a50', setOpts: { lampX: 120 },
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 330, y: 980, s: 250 },
      look: [1, 0.5],
      draw(x, t, S) {
        drawProp(x, S.u > SW ? 'catSweater' : 'cat', 760, 1110, 14, { sx: -1, rot: S.u > SW + 0.6 ? 0.03 * Math.sin(t * 10) : 0 })
        if (S.u > SW + 0.6) hearts(x, t, S.sw + 0.6, 760, 1020, { n: 4 })
      },
      bubbles: ['I knitted it.', 'she hates it. she loves it.'],
      bubblePos: [[330, 640, 0], [640, 760, 0.1]],
      cues: [['pop', 1.76, 987.77, 0.04, 0.3], ['pluck', 2.4, 1318.51, 0.03, 0.4, 0.3]],
    },
    {
      caption: 'is on the floor playing *fetch* in seconds.', deep: '#6a3ab0',
      set: 'room', tint: '#2a1f4a', setOpts: { lampX: 120 },
      moods: ['sparkle', 'happy'], fx: ['confetti'],
      hero: { x: 340, y: 1040, s: 240 },
      look: [1, 0],
      draw(x, t, S) {
        const ph = (S.u * 0.9) % 1, bp = ease.inOutQuad(ph)
        drawProp(x, 'ball', lerp(420, 860, bp), 1080 - 380 * Math.sin(Math.PI * ph), 7)
        drawProp(x, 'dog', 760 + 40 * Math.sin(S.u * 3), 1110 - 30 * Math.abs(Math.sin(t * 8)), 13, { sx: -1 })
      },
      bubbles: ['who’s a good boy!', 'I’m a good boy too!'],
      bubblePos: [[360, 660, 0], [380, 770, 0]],
      hops: [0.8, 1.2, 2.2, 2.6],
      cues: [0.3, 1.4, 2.5].map(c => ['whoosh', c, 0.2, 0.02]),
    },
  ],
  verdict: {
    who: 'none', text: 'THE PETS. | *Won everyone.*', late: 2,
    draw(x, t, S) {
      const k = pop01(t, T.crown, 0.3, 2.4) * S.ok
      if (k <= 0.01) return
      drawProp(x, 'catSweater', 430, 1140, 12 * k); drawProp(x, 'crown', 480, 1068, 8 * k)
      drawProp(x, 'dog', 660, 1140, 12 * k, { sx: -1 }); drawProp(x, 'crown', 610, 1068, 8 * k)
      hearts(x, t, T.crown + 0.2, 540, 1060, { n: 5 })
    },
  },
  last: 'Be kind to what they love. It shows.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void prog
