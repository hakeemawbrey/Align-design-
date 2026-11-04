// nt2e06: UNPOPULAR OPINION: plans are romantic (15 s vertical, Trends Vol. 2 format 2; row in
// promo/films/next30/b11.md; music jazzy · C). Format look: ./opinionkit.js (shared with nt2e07–nt2e10).
//   0.0        hook (frame 0): "UNPOPULAR OPINION:" · "Making plans is *romantic*." Capricorn mid-step onto the crate,
//              holding a little planner.
//   1.2        GASP (Leo, Gemini, Sagittarius).  2.5 Leo: "…valid."  3.9 Gemini: "…I'd love a Saturday."
//   5.3        twist + card cut: Sagittarius, who hates plans, pulls out its own planner: "…mine's colour-coded."
//   7.0        stamp POPULAR, ACTUALLY. · THE STARS: "Planning is *flirting* with the future."
import { makeOpinion, withProps, box, R, bubble, label, pop01, sparkles, INK, BONE, GOLD } from './opinionkit.js'

function planner(x, cx, cy, col, k = 1, rot = -0.12) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -60, -76, 120, 152, col, { b: 6 }); R(x, BONE, -46, -60, 92, 120)
  for (let i = 0; i < 4; i++) R(x, ['#e8344e', '#7fd0ff', '#9fe6b0', GOLD][i], -38, -48 + i * 28, 76, 12)
  R(x, INK, -66, -64, 8, 128)
  x.restore()
}

const EP = makeOpinion({
  id: 'nt2e06', sign: 'capricorn', accent: '#2fc79a',
  opinion: 'Making plans is *romantic.*',
  prop: (x, t, o) => planner(x, o.x + 150, o.y - 10, '#2fc79a', 1, 0.15 + 0.05 * Math.sin(t * 4)),
  crowd: [{ sign: 'leo', text: '…valid.' }, { sign: 'gemini', text: '…I’d love a Saturday.' }, { sign: 'sagittarius', text: '' }],
  twist(x, t, S) {
    S.S(x, t, { x: S.X, y: S.Y, s: 170, mood: S.u > 0.4 ? 'sparkle' : 'wide', look: [-1, -0.6], hops: [S.t0 + 0.4] })
    planner(x, S.X - 120, S.Y - 40, '#a35cf0', pop01(t, S.t0 + 0.4, 0.3, 2.6), -0.2)
    sparkles(x, t, S.X - 120, S.Y - 40, S.t0 + 0.42, 8, 100, 2)
    bubble(x, t, 780, 1380, S.t0 + 0.6, S.t1, '…mine’s colour-coded.', { size: 32, col: '#c9f2d4' })
  },
  twistCues: [['pop', 0.4, 1318.51, 0.045, 0.4], ['glitter', 0.42, 0.8], ['pluck', 0.62, 1567.98, 0.03, 0.4, 0]],
  last: 'Planning is *flirting* with the future.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [withProps, label, GOLD]
