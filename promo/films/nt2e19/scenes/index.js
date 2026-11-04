// nt2e19: DELULU OR SOLULU: they held the door (25 s vertical, Trends Vol. 2 format 4; row in
// promo/films/next30/b11.md; music chiptune · G). Format look: ../../nt2e16/scenes/delulukit.js.
//   0.0        hook (frame 0): "They held the door… | so they want to meet my *mom*." Cancer mid-hop with a photo album.
//   2.0 / 5.0 / 8.0  evidence: *held the door* · *smiled* while doing it · said *"after you"*.
//   11.0       card cut · THE STARS: "…or you could just *ask?*"
//   13.0       Cancer to Libra: "coffee sometime?"  14.3 "I'd like that."  15.2 SOLULU.
//   15.75      THE STARS: "Kindness is a *clue*, not a contract."
import { makeDelulu, box, R, label, bubble, pop01, INK, GOLD, BONE, INTER } from '../../nt2e16/scenes/delulukit.js'

function album(x, cx, cy, t) { x.save(); x.translate(cx, cy); x.rotate(0.12 + 0.05 * Math.sin(t * 4)); box(x, -60, -70, 120, 140, '#8a5a3c', { b: 6, hi: '#a8724e' }); R(x, BONE, -40, -46, 80, 54); x.font = `800 18px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('FAMILY', 0, 40); x.restore() }
function door(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -70, -130, 140, 260, '#3a2d66', { b: 6 }); box(x, -60, -120, 80, 240, '#a8724e', { b: 5 }); R(x, GOLD, 6, 0, 10, 10); x.restore() }

const EP = makeDelulu({
  id: 'nt2e19', sign: 'cancer', crush: 'libra', accent: '#3fb6f0',
  claim: 'They held the door… | so they want to meet my *mom.*',
  prop: (x, t, o) => { if (t < 11) album(x, o.x + 150, o.y, t) },
  ev: [
    { caption: '*held the door*', draw(x, t, S) { door(x, 910, 1100, pop01(t, S.t0 + 0.4, 0.3, 2.2)) } },
    { caption: '*smiled* while doing it', draw(x, t, S) { label(x, ':)', 880, 1060, { size: 70, col: GOLD, font: INTER, weight: 800, alpha: pop01(t, S.t0 + 0.4, 0.2, 2) }) } },
    { caption: 'said *“after you”*', draw(x, t, S) { bubble(x, t, 800, 1030, S.t0 + 0.4, S.t1 - 0.2, '“after you.”', { size: 32, col: '#c9f2d4' }) } },
  ],
  ask: 'coffee sometime?', answer: 'I’d like that.',
  last: 'Kindness is a *clue*, not a contract.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
