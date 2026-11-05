// khse03: ZODIAC HOT SEAT, "Gemini gave two answers" (trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Gemini mid-split into a twin blur, two answer bubbles ("CALL!" / "TEXT!") colliding mid-air; the
//         hook "Gemini gave *two* answers. Again." landed. 0.3 glitch.
//   Q1 "Call or text?" → "call. no. text."  Q2 "Morning or night?" → "yes."
//   the last question (silence): "Why so many drafts?" → "…I want them to like the real one."
//   THE STARS: "Send *the real one.*"  Loops back to the colliding bubbles.
import { makeHotSeat, bubbleK, sparkles, lerp, ease, prog, GOLD, PINK, BONE } from '../../khse01/scenes/hotkit.js'

const EP = makeHotSeat({
  id: 'khse03', sign: 'gemini', name: 'Gemini', accent: '#ffd85c',
  hook: 'Gemini gave *two* | answers. Again.',
  breakFx: 'glitch', breakAt: 0.3,
  hero0: { x: 540, y: 1036, s: 290, mood: 'wide' },
  heroDraw(x, t, S, o) {
    // the twin blur: a ghost copy on each side, merging as the show starts (and once more on Q1's answer)
    const split = Math.max(1 - ease.inOutCubic(prog(t, S.T.settle[0], S.T.settle[1])), t > S.T.qs[0] + 0.5 && t < S.T.qs[1] ? 0.5 * (1 - prog(t, S.T.qs[0] + 0.5, S.T.qs[1])) : 0)
    if (split > 0.01) for (const d of [-1, 1]) { x.save(); x.globalAlpha = 0.45 * split; S.hero(x, t + d * 0.3, { ...o, x: o.x + d * 110 * split, mood: d < 0 ? 'happy' : 'squint' }); x.restore() }
    S.hero(x, t, o)
  },
  frame0(x, t, S) {
    const k = S.k, c = ease.outCubic(prog(t, -0.6, 0.6))
    bubbleK(x, lerp(220, 400, c), 700, k, 'CALL!', { size: 70, tail: 0.5, col: '#ffe9a8' })
    bubbleK(x, lerp(860, 690, c), 760, k, 'TEXT!', { size: 70, tail: -0.5, col: '#c9f2d4' })
    sparkles(x, t + 0.25, 545, 730, 0, 10, 120, 2, [GOLD, PINK, BONE])
  },
  qs: [
    { q: 'Call or *text?*', a: 'call. no. text.', mood: 'squint' },
    { q: 'Morning or *night?*', a: 'yes.', mood: 'happy', size: 64 },
  ],
  final: { q: 'Why so many *drafts?*', a: '…I want them to like the real one.', mood: 'neutral', endMood: 'happy', size: 46 },
  last: 'Send *the real one.*',
  ending: 'loop',
  music: { style: 'pop', key: 'G', seed: 3503 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
