// ktte17: THIS OR THAT: LOVE EDITION, "Leo vs Aquarius: Post Us or Not" (~9 s vertical, star advice trial reel,
// funk · Eb). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Leo mid-lunge into POST TONIGHT, Aquarius mid-duck into KEEP IT OURS; a camera flash (the pattern break).
//   FACES vs NO FACES → Leo FACES, Aquarius NO FACES.
//   twist: a card drops: A PHOTO OF OUR SHOES; both slam it. Pisces cries at the shoes in the tissue cam.
//   Last: "Post the shoes. *Keep the faces.*" Seamless loop back to frame 0.
import { makeTT, R, INK, BONE, drawBits } from '../../ktte01/scenes/ttkit.js'

const SHOE = ['....KK', '...KCK', 'KKKCCK', 'KCCCCK', 'KKKKKK']
const EP = makeTT({
  id: 'ktte17', mode: 'duel', signs: ['leo', 'aquarius'],
  hook: 'OUR FIRST PHOTO: | *POST IT OR NOT?*', accent: '#f39a3a',
  brk: { kind: 'flash', t: 0.12 },
  rounds: [
    { a: 'POST TONIGHT', b: 'KEEP IT OURS', ia: 'cam', ib: 'heart', pick: ['a', 'b'] },
    { a: 'FACES', b: 'NO FACES', ia: 'star', ib: 'q', pick: ['a', 'b'], d: 1.5 },
    { a: 'POST IT ALL', b: 'POST NOTHING', ia: 'cam', ib: 'moon', pick: ['c', 'c'], c: { text: 'A PHOTO OF OUR SHOES', ic: 'cam', at: 0.9, tag: 'COMPROMISE' }, d: 2.3, pickAt: 1.6, hover: true },
  ],
  last: 'Post the shoes. | *Keep the faces.*',
  ending: 'loop', fin: 2.4, finSide: 'c',
  mid(x, t, S) {
    // the shoes photo pinned under the winner card in the finale
    if (S.v < S.T.E + 0.2) return
    x.save(); x.translate(540, 1300); x.rotate(-0.05)
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
