// nt2e08: UNPOPULAR OPINION: the same movie again (15 s vertical, Trends Vol. 2 format 2; row in
// promo/films/next30/b11.md; music jazzy · Eb). Format look: ../../nt2e06/scenes/opinionkit.js.
//   0.0        hook (frame 0): "UNPOPULAR OPINION:" · "Rewatching the same comfort movie is a *perfect* date."
//              Taurus mid-step onto the crate with a big popcorn bowl.
//   1.2        GASP (Cancer, Aquarius, Leo).  2.5 Cancer: "…valid."  3.9 Aquarius: "…I know every line."
//   5.3        twist + card cut: a couch slides in under the whole crowd; Leo, under a blanket: "…scoot over."
//   7.0        stamp POPULAR, ACTUALLY. · THE STARS: "Repeats are how *traditions* start."
import { makeOpinion, box, R, bubble, pop01, prog, ease, lerp, INK, BONE } from '../../nt2e06/scenes/opinionkit.js'

function popcorn(x, cx, cy, t) {
  box(x, cx - 60, cy - 30, 120, 80, '#e8344e', { b: 6 })
  for (let i = -48; i <= 48; i += 24) R(x, BONE, cx + i - 4, cy - 30, 8, 80)
  for (let i = 0; i < 7; i++) box(x, cx - 54 + i * 16, cy - 50 - (i % 2) * 10 - 3 * Math.sin(t * 6 + i), 16, 16, '#fff1c8', { b: 3 })
}

const EP = makeOpinion({
  id: 'nt2e08', sign: 'taurus', accent: '#e9b24a',
  opinion: 'Rewatching the same comfort movie | is a *perfect* date.',
  prop: (x, t, o) => popcorn(x, o.x + 160, o.y + 30, t),
  crowd: [{ sign: 'cancer', text: '…valid.' }, { sign: 'aquarius', text: '…I know every line.' }, { sign: 'leo', text: '' }],
  twist(x, t, S) {
    const k = ease.outCubic(prog(S.u, 0.0, 0.4))
    S.S(x, t, { x: S.X, y: S.Y, s: 170, mood: 'happy', look: [-1, -0.6], hops: [S.t0 + 0.4] })
    // a couch slides in under the whole crowd
    const cx = lerp(-700, 540, k)
    box(x, cx - 470, 1300, 940, 44, '#7b4f8e', { b: 7, hi: '#9a6aae' })
    box(x, cx - 510, 1250, 60, 100, '#6a427c', { b: 7 }); box(x, cx + 450, 1250, 60, 100, '#6a427c', { b: 7 })
    // Leo's blanket
    const bk = pop01(t, S.t0 + 0.5, 0.3, 2.2)
    if (bk > 0.01) { x.save(); x.translate(S.X, S.Y + 50); x.scale(bk, bk); box(x, -110, -30, 220, 60, '#5aa9e6', { b: 5 }); for (let i = -100; i < 110; i += 40) R(x, '#8fcaf5', i, -30, 18, 60); x.restore() }
    bubble(x, t, 820, 1135, S.t0 + 0.6, S.t1, '…scoot over.', { size: 32, col: '#c9f2d4' })
  },
  twistCues: [['whoosh', 0.0, 0.4, 0.035], ['tom', 0.4, 100, { gain: 0.2, decay: 0.2 }], ['pop', 0.5, 1174.66, 0.04, 0.4], ['pluck', 0.62, 1567.98, 0.03, 0.4, 0]],
  last: 'Repeats are how *traditions* start.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
