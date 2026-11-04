// nt2e10: UNPOPULAR OPINION: "what are we?" (15 s vertical, Trends Vol. 2 format 2; row in
// promo/films/next30/b11.md; music jazzy · G). Format look: ../../nt2e06/scenes/opinionkit.js.
//   0.0        hook (frame 0): "UNPOPULAR OPINION:" · "Asking 'what are we?' is *not* scary." Scorpio mid-step onto the
//              crate, very calm, holding a mug of tea.
//   1.2        GASP (Taurus, Gemini, Cancer).  2.5 Taurus: "…true."  3.9 Gemini: "…I've asked twice today."
//   5.3        twist + card cut: Cancer, the crush, raises a hand: "…I'd like to know too." Scorpio blushes; hearts.
//   7.0        stamp POPULAR, ACTUALLY. · THE STARS: "A clear answer is *a warm one*."
import { makeOpinion, box, R, bubble, hearts, pop01, prog, ease, lerp, INK, BONE } from '../../nt2e06/scenes/opinionkit.js'

function mug(x, t, cx, cy) {
  box(x, cx - 40, cy - 40, 80, 80, '#e2cfff', { b: 6 }); R(x, INK, cx + 40, cy - 22, 22, 40); R(x, '#e2cfff', cx + 46, cy - 16, 10, 28)
  for (let s = 0; s < 3; s++) { const p = ((t * 0.7 + s / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, cx - 20 + s * 16 + Math.sin(t * 3 + s) * 5, cy - 60 - p * 70, 7, 16); x.restore() }
}

const EP = makeOpinion({
  id: 'nt2e10', sign: 'scorpio', accent: '#e23d66',
  opinion: 'Asking “what are we?” | is *not* scary.',
  heroHops: [5.9],
  heroMood: t => t > 5.9 && t < 7.0 ? 'heart' : null,
  prop: (x, t, o) => mug(x, t, o.x + 160, o.y + 30),
  crowd: [{ sign: 'taurus', text: '…true.' }, { sign: 'gemini', text: '…I’ve asked twice today.' }, { sign: 'cancer', text: '' }],
  twist(x, t, S) {
    const up = ease.outCubic(prog(S.u, 0.2, 0.5))
    S.S(x, t, { x: S.X, y: S.Y - 40 * up, s: 170, mood: S.u > 0.5 ? 'happy' : 'neutral', look: [-1, -0.8], hops: [S.t0 + 0.2], blush: S.u > 0.5 ? 1 : 0 })
    // a raised hand (a little pixel mitten)
    const hk = pop01(t, S.t0 + 0.3, 0.25, 2.4)
    if (hk > 0.01) { x.save(); x.translate(S.X + 105, S.Y - 70); x.scale(hk, hk); R(x, INK, -6, 0, 12, 70); box(x, -22, -40, 44, 44, '#ffd0d8', { b: 5 }); x.restore() }
    hearts(x, t, S.t0 + 0.7, 540, 720, { n: 7 })
    bubble(x, t, 780, 1135, S.t0 + 0.55, S.t1, '…I’d like to know too.', { size: 30, col: '#c9f2d4' })
  },
  twistCues: [['pop', 0.3, 1174.66, 0.04, 0.4], ['pluck', 0.56, 1318.51, 0.03, 0.4, 0], ['pluck', 0.72, 1567.98, 0.035, 0, 0.3]],
  last: 'A clear answer is *a warm one*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void lerp
