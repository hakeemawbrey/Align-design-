// nt2e09: UNPOPULAR OPINION: early nights (15 s vertical, Trends Vol. 2 format 2; row in
// promo/films/next30/b11.md; music jazzy · F). Format look: ../../nt2e06/scenes/opinionkit.js.
//   0.0        hook (frame 0): "UNPOPULAR OPINION:" · "Being home by ten is a *great* date." Virgo mid-step onto the
//              crate in a nightcap, holding a little clock at 9:30.
//   1.2        GASP (Capricorn, Cancer, Sagittarius).  2.5 Capricorn: "…efficient."  3.9 Cancer: "…cozy."
//   5.3        twist + card cut: Sagittarius, the night owl, yawns a huge yawn: "…okay, yes." and dozes off.
//   7.0        stamp POPULAR, ACTUALLY. · THE STARS: "Home by ten, *heart* full."
import { makeOpinion, withProps, box, R, bubble, label, INK, BONE, GOLD, MONO } from '../../nt2e06/scenes/opinionkit.js'

function clock(x, cx, cy) {
  box(x, cx - 70, cy - 40, 140, 80, '#14102a', { b: 6 })
  x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('9:30', cx, cy + 2)
  R(x, INK, cx - 60, cy + 40, 12, 14); R(x, INK, cx + 48, cy + 40, 12, 14)
}
function nightcap(x) {
  // sprite cells: a striped cap flopping to the right, with a pom-pom
  const rows = [[11, 25, 6], [13, 23, 4], [15, 22, 2], [17, 22, 0], [19, 24, -2], [22, 26, -3]]
  rows.forEach(([a, b, y], j) => { R(x, INK, a - 1, y - 1, b - a + 2, 3); R(x, j % 2 ? BONE : '#5aa9e6', a, y, b - a, 2) })
  R(x, INK, 25, -5, 4, 4); R(x, BONE, 26, -4, 2, 2)
}

const EP = makeOpinion({
  id: 'nt2e09', sign: 'virgo', accent: '#ef5c94',
  opinion: 'Being home by ten | is a *great* date.',
  prop: (x, t, o) => { withProps(x, t, o, () => nightcap(x)); clock(x, o.x + 170, o.y + 30) },
  crowd: [{ sign: 'capricorn', text: '…efficient.' }, { sign: 'cancer', text: '…cozy.' }, { sign: 'sagittarius', text: '' }],
  twist(x, t, S) {
    const mood = S.u < 0.35 ? 'neutral' : S.u < 1.0 ? 'squint' : 'sleepy'
    S.S(x, t, { x: S.X, y: S.Y, s: 170, mood, look: [-1, -0.6], hops: [S.t0 + 0.35], squash: S.u > 0.35 && S.u < 1.0 ? -0.08 : 0 })
    if (S.u > 0.35 && S.u < 1.0) label(x, 'YAWN', S.X, S.Y - 130, { size: 40, col: BONE, font: "Inter, sans-serif", weight: 800, rot: 0.1 })
    bubble(x, t, 800, 1135, S.t0 + 0.6, S.t1, '…okay, yes.', { size: 32, col: '#c9f2d4' })
  },
  twistCues: [['whoosh', 0.35, 0.5, 0.03], ['pluck', 0.62, 1174.66, 0.03, 0.4, 0], ['pop', 1.0, 659.25, 0.03, 0.4]],
  last: 'Home by ten, *heart* full.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
