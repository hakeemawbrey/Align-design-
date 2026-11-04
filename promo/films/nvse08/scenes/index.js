// nvse08: SIGN VS SIGN, "Who handles a party where they know nobody?" ♉ Taurus vs ♌ Leo (18 s trial reel, b46,
// music: house · G). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a row of strangers with question marks between them.
//   ROUND 1 ♉ "finds the *snack table* and one friend." the dip, a stranger who likes it too. "you like the dip too?" → "we’re friends now."
//   ROUND 2 ♌ "is *hosting* the room in ten minutes." the crowd gathers, a spotlight. "everyone! gather round!" → "wait, whose party is this?"
//   VERDICT "TAURUS. | *Found one friend.*" Leo cheers and finds one too.  THE STARS: "Find one friendly face. The rest follows."
import { makeVersus, drawStarChar, cafeTable, drawProp, label, hearts, spotlight, pop01, prog, clamp, SW, T, INTER } from '../../nvse01/scenes/versuskit.js'

const FR = ['#9fd8f6', '#c9a6ff', '#9fe6b0', '#ffc7a6', '#f7a8c8', '#b0e0a0']
const guest = (x, t, i, gx, gy, s, o = {}) => drawStarChar(x, gx, gy, s, t, { color: FR[i % FR.length], mood: 'neutral', seed: 21 + i, glow: 0.6, tips: false, ...o })

const EP = makeVersus({
  id: 'nvse08', a: 'taurus', b: 'leo', accent: '#ffe27a',
  hook: 'Who handles a party | where they *know nobody?*',
  hookMoods: ['wide', 'sparkle'],
  hookDraw(x, t) { for (let i = 0; i < 3; i++) { guest(x, t, i, 430 + i * 110, 660, 80, { look: [0, 1] }); label(x, '?', 430 + i * 110, 580 + 6 * Math.sin(t * 4 + i), { size: 40, font: INTER, weight: 800, col: '#ffe27a' }) } },
  rounds: [
    {
      caption: 'finds the *snack table* and one friend.', deep: '#2f8a5a',
      set: 'party', tint: '#2f2a4a',
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 360, y: 930, s: 260 },
      look: [1, 0],
      draw(x, t, S) { guest(x, t, 0, 770, 950, 210, { mood: S.u > SW ? 'heart' : 'wide', look: [-1, 0.3] }); if (S.u > SW) hearts(x, t, S.sw + 0.1, 770, 820, { n: 4 }) },
      front(x, t) { cafeTable(x, 560, 1080, 720); drawProp(x, 'dip', 560, 1050, 10); drawProp(x, 'cookie', 400, 1055, 6); drawProp(x, 'cookie', 720, 1055, 6) },
      bubbles: ['you like the dip too?', 'we’re friends now.'],
      bubblePos: [[360, 620, 0], [720, 700, -0.2]],
      cues: [['pluck', 1.8, 1174.66, 0.04, 0.5, 0.2]],
    },
    {
      caption: 'is *hosting* the room in ten minutes.', deep: '#c45a12',
      set: 'party', tint: '#3a1f3a',
      moods: ['sparkle', 'wide'], fx: ['confetti'],
      hero: { x: 540, y: 900, s: 270 },
      draw(x, t, S) {
        spotlight(x, 540, 340, 540, 1080, 360, clamp(prog(t, S.t0 + 0.3, S.t0 + 0.45)))
        const pos = [[150, 1120], [300, 1170], [450, 1200], [630, 1200], [780, 1170], [930, 1120]]
        pos.forEach(([gx, gy], i) => { const k = pop01(t, S.t0 + 0.3 + i * 0.12, 0.3, 2.2); if (k > 0.01) guest(x, t, i, gx, gy, 120, { pop: k, mood: S.u > SW ? 'wide' : 'happy', look: [gx < 540 ? 1 : -1, -1] }) })
      },
      bubbles: ['everyone! gather round!', 'wait, whose party is this?'],
      bubblePos: [[540, 590, 0], [540, 700, 0]],
      cues: [0.3, 0.42, 0.54, 0.66, 0.78, 0.9].map(c => ['pop', c, 987.77, 0.025, 0]).concat([['tick', 0.32, 0.07]]),
    },
  ],
  verdict: {
    who: 'a', text: 'TAURUS. | *Found one friend.*', late: 3,
    draw(x, t, S) { const k = pop01(t, T.crown + 0.7, 0.3, 2.2) * S.ok; if (k > 0.01) { guest(x, t, 1, 960, 1010, 110, { pop: k, mood: 'heart', look: [-1, 0] }); hearts(x, t, T.crown + 0.8, 900, 900, { n: 4 }) } },
  },
  last: 'Find one friendly face. The rest follows.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
