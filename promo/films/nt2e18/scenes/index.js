// nt2e18: DELULU OR SOLULU: we both like hiking (25 s vertical, Trends Vol. 2 format 4; row in
// promo/films/next30/b11.md; music chiptune · F#). Format look: ../../nt2e16/scenes/delulukit.js.
//   0.0        hook (frame 0): "We both like hiking… | so we're *soulmates*." Sagittarius mid-stride with a backpack.
//   2.0 / 5.0 / 8.0  evidence: *the same trail* · *the same snack* · *the same sunrise* photo.
//   11.0       card cut · THE STARS: "…or you could just *ask?*"
//   13.0       Sag to Taurus: "hike together Sunday?"  14.3 "only if you bring the snacks."  15.2 SOLULU.
//   15.75      THE STARS: "Common ground is a *start*, not a sign."
import { makeDelulu, withProps, box, R, label, bubble, pop01, INK, GOLD, BONE } from '../../nt2e16/scenes/delulukit.js'

function pack(x) { R(x, INK, -1, 14, 9, 16); R(x, '#d86a5a', 0, 15, 7, 14); R(x, '#f2c75c', 1, 20, 5, 2) }
function mountain(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-90, 50); x.lineTo(0, -70); x.lineTo(90, 50); x.fill(); x.fillStyle = '#6f8fd8'; x.beginPath(); x.moveTo(-78, 44); x.lineTo(0, -58); x.lineTo(78, 44); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(-22, -28); x.lineTo(0, -58); x.lineTo(22, -28); x.fill(); x.restore() }
function snack(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -40, -50, 80, 100, '#9fe6b0', { b: 5 }); R(x, '#5a9e6a', -40, -50, 80, 18); R(x, '#f2c75c', -20, -4, 40, 30); x.restore() }
function sunrise(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -80, -60, 160, 120, BONE, { b: 5 }); R(x, '#ffb07a', -68, -48, 136, 80); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 32, 30, Math.PI, 0); x.fill(); x.restore() }

const EP = makeDelulu({
  id: 'nt2e18', sign: 'sagittarius', crush: 'taurus', accent: '#a35cf0',
  claim: 'We both like hiking… | so we’re *soulmates.*',
  prop: (x, t, o) => withProps(x, t, o, () => pack(x)),
  ev: [
    { caption: '*the same trail*', draw(x, t, S) { mountain(x, 820, 1080, pop01(t, S.t0 + 0.4, 0.3, 2.2)) } },
    { caption: '*the same snack*', draw(x, t, S) { snack(x, 820, 1080, pop01(t, S.t0 + 0.4, 0.3, 2.2)) } },
    { caption: '*the same sunrise* photo', draw(x, t, S) { sunrise(x, 820, 1080, pop01(t, S.t0 + 0.4, 0.3, 2.2)); label(x, 'x2', 900, 1000, { size: 34, col: GOLD, alpha: S.u > 0.8 ? 1 : 0 }) } },
  ],
  ask: 'hike together Sunday?', answer: 'only if you bring snacks.',
  last: 'Common ground is a *start*, not a sign.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void bubble
