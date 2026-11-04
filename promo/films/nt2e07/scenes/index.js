// nt2e07: UNPOPULAR OPINION: "I'm not sure yet" (15 s vertical, Trends Vol. 2 format 2; row in
// promo/films/next30/b11.md; music jazzy · D). Format look: ../../nt2e06/scenes/opinionkit.js.
//   0.0        hook (frame 0): "UNPOPULAR OPINION:" · "'I'm not sure yet' is an *honest* answer." Libra mid-step onto
//              the crate, its little scales wobbling.
//   1.2        GASP (Virgo, Aries, Taurus).  2.5 Virgo: "…fair."  3.9 Aries: "…better than a fake yes."
//   5.3        twist + card cut: Taurus was slow to react… and is now crying too: "that's so brave." (Pisces, on
//              the side, hands it a tissue.)
//   7.0        stamp POPULAR, ACTUALLY. · THE STARS: "*Unsure* is an answer too."
import { makeOpinion, box, R, bubble, tearsCells, withProps, tissues, pop01, INK, GOLD } from '../../nt2e06/scenes/opinionkit.js'

function scales(x, t, cx, cy, tilt) {
  x.save(); x.translate(cx, cy)
  R(x, INK, -6, -90, 12, 100); R(x, GOLD, -3, -88, 6, 96)
  x.save(); x.rotate(tilt)
  R(x, INK, -90, -96, 180, 10); R(x, GOLD, -88, -94, 176, 6)
  for (const d of [-1, 1]) { R(x, INK, d * 80 - 3, -90, 6, 40); box(x, d * 80 - 34, -50, 68, 14, GOLD, { b: 4 }) }
  x.restore(); x.restore()
}

const EP = makeOpinion({
  id: 'nt2e07', sign: 'libra', accent: '#e163d6',
  opinion: '“I’m not sure yet” is an *honest* answer.',
  prop: (x, t, o) => scales(x, t, o.x + 170, o.y + 40, 0.25 * Math.sin(t * 2.6)),
  crowd: [{ sign: 'virgo', text: '…fair.' }, { sign: 'aries', text: '…better than a fake yes.' }, { sign: 'taurus', text: '' }],
  twist(x, t, S) {
    const o = { x: S.X, y: S.Y, s: 170, mood: S.u > 0.4 ? 'happy' : 'neutral', look: [-1, -0.6], hops: [S.t0 + 0.4] }
    S.S(x, t, o)
    if (S.u > 0.4) withProps(x, t, o, () => tearsCells(x, t, 2))
    if (S.u > 0.9) tissues(x, S.X - 130, S.Y + 40, 60 * pop01(t, S.t0 + 0.9, 0.25, 2.2))
    bubble(x, t, 780, 1380, S.t0 + 0.55, S.t1, 'that’s so brave.', { size: 32, col: '#c9f2d4' })
  },
  twistCues: [['pop', 0.4, 1318.51, 0.04, 0.4], ['pluck', 0.56, 1567.98, 0.03, 0.4, 0], ['pop', 0.9, 880, 0.03, -0.2]],
  last: '*Unsure* is an answer too.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
