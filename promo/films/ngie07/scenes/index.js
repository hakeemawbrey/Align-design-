// ngie07: THE SIGNS AS WINTER GIFTS, "Libra as a winter gift" (14 s vertical trial reel, music: dreamy · Db).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Libra* were a | winter gift:" — Libra mid-tug on the ribbon of a pink box: "wait. is the bow
//             centred?"
//   2.4–5.2   1 "wrapping so pretty you *can't* open it." The box stays shut; extra bows bloom on it; everyone
//             just admires it.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "inside: a card that says *'you pick.'*" The lid finally lifts: a card, "you pick. (date night.)"
//   8.0–11.6  THE STARS: "Choosing *together* is the romantic part."
import { makeEp, bubble, shadow, sparkles, note, giftBox, drawBits, BOX, giftHook, hookCuesGift, prog, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

const BOW = ['BB.....BB', 'BBB...BBB', 'BBBBKBBBB', 'BBB...BBB', 'BB.....BB']

const EP = makeEp({
  id: 'ngie07', series: 'gifts', sign: 'libra', name: 'Libra', boxCol: '#ff8fb1', ribbon: GOLD, finGift: (x, t, cx, cy, k) => note(x, cx, cy, ['you pick.'], { k: k * 1.6, w: 300, size: 46 }),
  hook(x, t, S) { giftHook(x, t, S, { line: 'wait. is the bow centred?' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'wrapping so pretty you *can’t* open it.',
      draw(x, t, S) {
        const { u, hero } = S
        shadow(x, BOX.cx, BOX.base, BOX.w * 1.1)
        giftBox(x, t, BOX.cx, BOX.base, BOX.w, BOX.h, '#ff8fb1', GOLD, { bow: 1 })
        const bows = [[520, 980, 0.3], [760, 1020, 0.9], [640, 1060, 1.5], [560, 900, 2.0]]
        bows.forEach(([bx, by, at], i) => { const k = ease.outCubic(prog(u, at * 0.8, at * 0.8 + 0.25)); if (k > 0) drawBits(x, BOW, { B: [BONE, '#7fd0ff', GOLD, '#e163d6'][i], K: '#ffffff' }, bx, by, 8 * k) })
        sparkles(x, t, BOX.cx, 950, S.t0 + 0.3, 10, 220, 1, [GOLD, BONE, PINK])
        shadow(x, 270, 1125, 210)
        hero(x, t, { x: 270, y: 970, s: 220, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.6, S.t0 + 1.8] })
        bubble(x, t, 420, 620, S.t0 + 1.2, S.t1, 'ugh, it’s SO pretty.', { size: 34 })
      },
      cues: [['pop', 0.24, 1174.66, 0.03, -0.3], ['pop', 0.72, 1318.51, 0.03, 0.3], ['pop', 1.2, 1479.98, 0.03, 0], ['pop', 1.6, 1760, 0.035, -0.2], ['glitter', 0.3, 0.8]] },
    { caption: 'inside: a card that says *‘you pick.’*',
      draw(x, t, S) {
        const { u, hero } = S
        const lf = ease.outCubic(prog(u, 0, 0.45))
        shadow(x, BOX.cx, BOX.base, BOX.w * 1.1)
        giftBox(x, t, BOX.cx, BOX.base, BOX.w, BOX.h, '#ff8fb1', GOLD, { open: true, bow: 0, lidDx: 620 * lf, lidDy: -820 * lf, lidRot: 1.4 * lf })
        note(x, 640, 760, ['you pick.', '(date night.)'], { k: ease.outCubic(prog(u, 0.3, 0.7)), rot: -0.03 })
        shadow(x, 270, 1125, 210)
        hero(x, t, { x: 270, y: 970, s: 220, mood: u > 0.8 ? 'happy' : 'wide', look: [1, -0.5], hops: [S.t0 + 0.8] })
        bubble(x, t, 400, 580, S.t0 + 1.2, S.t1, 'okay, we pick together.', { size: 32 })
      },
      cues: [['whoosh', 0.0, 0.35, 0.03], ['pop', 0.6, 1318.51, 0.04, 0], ['pop', 1.2, 880, 0.035, 0]] },
  ],
  last: 'Choosing *together* is the romantic part.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
