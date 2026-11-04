// nvse16: SIGN VS SIGN, "Who keeps a surprise better?" ♌ Leo vs ♐ Sagittarius (18 s trial reel, b46, music: house · A).
// Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: a half-hidden gift between them: "shh!"
//   ROUND 1 ♌ "drops *hints* all week." the week's hints tick down a list. "no reason. just… friday." → "wear something nice. no reason."
//   ROUND 2 ♐ "blurts it out on *day one.*" to the birthday star's face. "we’re NOT throwing you a party." → "…oh no."
//   VERDICT "THE BIRTHDAY STAR. | *Loved it anyway.*" the birthday star in a crown, confetti, a gift.  THE STARS: "The surprise matters less than who shows up."
import { makeVersus, drawStarChar, starFrame, crownOn, drawProp, paper, label, confetti, pop01, SW, T, INTER } from '../../nvse01/scenes/versuskit.js'

const BDAY = '#f7a8c8'
const bday = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: BDAY, seed: 19, glow: 0.9, ...o })

const EP = makeVersus({
  id: 'nvse16', a: 'leo', b: 'sagittarius', accent: '#ff8fb1',
  hook: 'Who keeps | a *surprise* better?',
  hookMoods: ['wink', 'wide'],
  hookDraw(x, t) { drawProp(x, 'gift', 540, 680, 12, { rot: 0.05 * Math.sin(t * 5) }); label(x, 'shh!', 540, 570, { size: 40, font: INTER, weight: 800, col: '#ffe27a' }) },
  rounds: [
    {
      caption: 'drops *hints* all week.', deep: '#c45a12',
      set: 'room', tint: '#3a1f3a',
      moods: ['wink', 'sparkle'], fx: ['sparkle'],
      hero: { x: 790, y: 1000, s: 260 },
      draw(x, t, S) {
        const ticks = Math.max(0, Math.min(3, Math.floor((S.u - 0.3) / 0.55) + 1))
        paper(x, 255, 800, 380, 330, { title: 'THIS WEEK', lines: ['MON: “no reason”', 'WED: “nice shoes?”', 'THU: “7 PM. no reason.”'], ticks, size: 24, rot: -0.04, k: pop01(t, S.t0 + 0.1) })
      },
      bubbles: ['no reason. just… friday.', 'wear something nice. no reason.'],
      bubblePos: [[760, 620, 0.2], [760, 730, 0.2]],
      cues: [['tick', 0.32, 0.05], ['tick', 0.87, 0.05], ['tick', 1.42, 0.05]],
    },
    {
      caption: 'blurts it out on *day one.*', deep: '#6a3ab0',
      set: 'room', tint: '#2a1f4a',
      moods: ['sparkle', 'wide'], fx: ['sweat'],
      hero: { x: 320, y: 990, s: 260 },
      look: [1, 0],
      draw(x, t, S) {
        bday(x, t, { x: 780, y: 1000, s: 230, mood: S.u > SW ? 'sparkle' : 'neutral', look: [-1, 0] })
        if (S.u > SW) label(x, 'OOPS.', 320, 760, { size: 60 * pop01(t, S.sw, 0.25, 2.6), font: INTER, weight: 800, col: '#ff8fa0', rot: -0.1 })
      },
      bubbles: ['we’re NOT throwing you a party.', '…oh no.'],
      bubblePos: [[480, 620, -0.4], [320, 870, 0]],
      cues: [['pop', 1.76, 440, 0.05, -0.3], ['pluck', 1.9, 330, 0.03, 0.6, -0.3]],
    },
  ],
  verdict: {
    who: 'none', text: 'THE BIRTHDAY STAR. | *Loved it anyway.*', late: 3,
    draw(x, t, S) {
      const k = pop01(t, T.crown, 0.3, 2.2) * S.ok
      if (k <= 0.01) return
      const o = { color: BDAY, seed: 19, glow: 0.9, mood: 'heart', pop: k, hops: [T.crown + 0.3, T.crown + 1.1] }
      drawStarChar(x, 540, 1130, 150, t, o); crownOn(x, starFrame(540, 1130, 150, t, o), k)
      confetti(x, t, T.crown + 0.05, 540, 1000)
      drawProp(x, 'gift', 640, 1180, 6 * k)
    },
  },
  last: 'The surprise matters less than who shows up.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
