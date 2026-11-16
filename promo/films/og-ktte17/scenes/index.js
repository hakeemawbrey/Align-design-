// og-ktte17 (og social cut of ktte17): THIS OR THAT: LOVE EDITION, "Leo vs Aquarius: Post Us or Not".
// Format: ./ttkit.js (the og social copy of ../../ktte01/scenes/ttkit.js).
// og: static HOOK (box) replaces the slammed title; no series bug; no camera-flash break; no loop (ends on the shoes);
// Leo wants a full photoshoot posted tonight, Aquarius wants nobody to ever know; the shoes photo sits under the
// tissue cam, above the app caption.
//   frame 0: Leo mid-lunge into POST TONIGHT, Aquarius mid-duck into KEEP IT OURS.
//   FACES vs NO FACES → Leo FACES, Aquarius NO FACES.
//   twist: a card drops: A PHOTO OF OUR SHOES; both slam it. Pisces cries at the shoes in the tissue cam.
//   Last: "Post the shoes. *Keep the faces.*" Hard cut.
import { makeTT, bubble, R, INK, BONE, drawBits } from './ttkit.js'

const SHOE = ['....KK', '...KCK', 'KKKCCK', 'KCCCCK', 'KKKKKK']
const EP = makeTT({
  id: 'og-ktte17', mode: 'duel', signs: ['leo', 'aquarius'],
  hook: 'OUR FIRST PHOTO: | *POST IT OR NOT?*', accent: '#f39a3a', hookUntil: 3.2,
  rounds: [
    { a: 'POST ALL 12 TONIGHT', b: 'TELL NO ONE. EVER.', ia: 'cam', ib: 'heart', pick: ['a', 'b'] },
    { a: 'FACES (MOSTLY LEO’S)', b: 'NO FACES. NO NAMES.', ia: 'star', ib: 'q', pick: ['a', 'b'], d: 1.5 },
    { a: 'POST IT ALL', b: 'POST NOTHING', ia: 'cam', ib: 'moon', pick: ['c', 'c'], c: { text: 'A PHOTO OF OUR SHOES', ic: 'cam', at: 0.9, tag: 'COMPROMISE' }, d: 2.3, pickAt: 1.6, hover: true },
  ],
  last: 'Post the shoes. | *Keep the faces.*',
  ending: 'cut', fin: 2.4, finSide: 'c',
  mid(x, t, S) {
    const R0 = S.T.rounds[0]
    bubble(x, t, 230, 1450, S.T.realOf(R0.t0 + 0.9), S.T.realOf(R0.t1 + 0.6), 'golden hour, NOW', { size: 34, tail: -0.2 })
    bubble(x, t, 790, 1450, S.T.realOf(R0.t0 + 1.0), S.T.realOf(R0.t1 + 0.6), 'delete the camera', { size: 34, tail: 0.2 })
    // the shoes photo pinned under the tissue cam in the finale (og: smaller, above the app caption)
    if (S.v < S.T.E + 0.2) return
    x.save(); x.translate(540, 1478); x.rotate(-0.05); x.scale(0.62, 0.62)
    R(x, INK, -160, -110, 320, 220); R(x, BONE, -150, -100, 300, 200); R(x, '#3a2d66', -134, -84, 268, 150)
    drawBits(x, SHOE, { K: INK, C: '#f39a3a' }, -55, 0, 12, { outline: null })
    drawBits(x, SHOE, { K: INK, C: '#38c4ec' }, 55, 0, 12, { outline: null })
    x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('us :)', 0, 86)
    x.restore()
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = 'Our first photo. | *Post it or not?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +EP.T.realOf(EP.HOOK_UNTIL).toFixed(2)
