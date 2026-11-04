// nvse02: SIGN VS SIGN, "Who handles meeting the friends better?" ♊ Gemini vs ♋ Cancer (18 s trial reel, b46,
// music: pop · C). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: three friend stars peek in between the two: "hi!!"
//   ROUND 1 ♊ "learns *everyone’s name* in a minute." name tags fly round the room. "wait, you ALSO knit??" → "group photo!"
//   ROUND 2 ♋ "brings *homemade cookies.*" the tin opens, cookies fly to the friends. "I made extra." → "…do they like me?"
//   VERDICT "BOTH. | *Different charm.*"  THE STARS: "Be curious about their people. That's the whole trick."
import { makeVersus, drawStarChar, drawProp, paper, hearts, pop01, prog, lerp, ease, label, SW, T } from '../../nvse01/scenes/versuskit.js'

const FR = ['#9fd8f6', '#c9a6ff', '#9fe6b0', '#ffc7a6']
const friend = (x, t, i, fx, fy, s, o = {}) => drawStarChar(x, fx, fy, s, t, { color: FR[i % 4], mood: 'happy', seed: 11 + i, glow: 0.7, tips: false, ...o })
const TAGS = ['PIP', 'ROO', 'DEV', 'KAI', 'MO']

const EP = makeVersus({
  id: 'nvse02', a: 'gemini', b: 'cancer', accent: '#ffe27a',
  hook: 'Who handles | *meeting the friends* better?',
  hookMoods: ['sparkle', 'wide'],
  hookDraw(x, t) {
    for (let i = 0; i < 3; i++) friend(x, t, i, 430 + i * 110, 640 + 8 * Math.sin(t * 4 + i), 90, { look: [0, 1], hops: [-0.2 + i * 0.3, 1.2 + i * 0.2] })
    label(x, 'hi!!', 540, 545, { size: 40, col: '#ffe27a', font: "Inter, sans-serif", weight: 800 })
  },
  rounds: [
    {
      caption: 'learns *everyone’s name* in a minute.', deep: '#b8860b',
      set: 'party', tint: '#3a1f4a',
      moods: ['happy', 'sparkle'], fx: ['confetti'],
      hero: { x: 540, y: 960, s: 280 },
      draw(x, t, S) {
        friend(x, t, 0, 180, 1080, 130, { look: [1, -0.3] }); friend(x, t, 1, 900, 1080, 130, { look: [-1, -0.3] })
        friend(x, t, 2, 330, 1150, 110, { look: [1, -0.5] }); friend(x, t, 3, 760, 1150, 110, { look: [-1, -0.5] })
      },
      front(x, t, S) {
        TAGS.forEach((nm, i) => {
          const born = S.t0 + 0.4 + i * 0.22, k = pop01(t, born, 0.3, 2.2)
          if (k <= 0.01) return
          const a = (t - born) * 1.6 + i * 1.26, R = 300
          paper(x, 540 + Math.cos(a) * R, 900 + Math.sin(a) * R * 0.55, 150, 74, { lines: [nm], align: 'center', size: 34, k, rot: 0.15 * Math.sin(a), col: '#ffffff' })
        })
      },
      bubbles: ['wait, you ALSO knit??', 'group photo!'],
      bubblePos: [[540, 600, 0], [540, 700, 0]],
      cues: [0.4, 0.62, 0.84, 1.06, 1.28].map(c => ['pop', c, 1318.51, 0.025, 0]).concat([['tick', 1.85, 0.08], ['pop', 1.9, 1760, 0.04, 0]]),
    },
    {
      caption: 'brings *homemade cookies.*', deep: '#2f6fb0',
      set: 'party', tint: '#2a2a55',
      moods: ['happy', 'wide'], fx: [],
      hero: { x: 540, y: 950, s: 280 },
      draw(x, t, S) {
        const lov = t > S.sw + 0.4
        friend(x, t, 0, 180, 1080, 130, { look: [1, -0.3], mood: lov ? 'heart' : 'neutral' }); friend(x, t, 1, 900, 1080, 130, { look: [-1, -0.3], mood: lov ? 'heart' : 'neutral' })
        if (lov) { hearts(x, t, S.sw + 0.4, 180, 960, { n: 4 }); hearts(x, t, S.sw + 0.5, 900, 960, { n: 4 }) }
      },
      front(x, t, S) {
        drawProp(x, 'tin', 540, 1120, 12)
        for (let i = 0; i < 6; i++) {
          const p = ease.outCubic(prog(t, S.t0 + 0.6 + i * 0.12, S.t0 + 1.2 + i * 0.12))
          if (p <= 0) continue
          const tx = i % 2 ? 900 : 180
          drawProp(x, 'cookie', lerp(540, tx, p), lerp(1080, 1000, p) - 220 * Math.sin(Math.PI * p), 6)
        }
      },
      bubbles: ['I made extra.', '…do they like me?'],
      bubblePos: [[540, 620, 0], [540, 720, 0]],
      cues: [['tick', 0.5, 0.06], ...[0.6, 0.72, 0.84, 0.96, 1.08, 1.2].map(c => ['whoosh', c, 0.15, 0.015]), ['pluck', 2.2, 1174.66, 0.04, 0.5, 0]],
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Different charm.*', late: 2,
    draw(x, t, S) { for (let i = 0; i < 3; i++) friend(x, t, i, 430 + i * 110, 650, 80 * S.ok * pop01(t, T.crown + 0.2 + i * 0.1), { mood: 'heart', hops: [T.crown + 0.3 + i * 0.1] }) },
  },
  last: 'Be curious about their people. That’s the whole trick.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void SW
