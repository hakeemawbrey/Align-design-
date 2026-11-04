// nt2e17: DELULU OR SOLULU: "see you around" (25 s vertical, Trends Vol. 2 format 4; row in
// promo/films/next30/b11.md; music chiptune · F). Format look: ../../nt2e16/scenes/delulukit.js.
//   0.0        hook (frame 0): "They said 'see you around'… | so we're *basically* engaged." Pisces mid-twirl under the
//              meter, already crying (the running gag, front and centre this time).
//   2.0 / 5.0 / 8.0  evidence: *they waved* · the wave lasted *a whole second* · said my name *right*.
//   11.0       card cut · THE STARS: "…or you could just *ask?*"
//   13.0       Pisces to Gemini: "around… like, Saturday?"  14.3 "Saturday works!"  15.2 SOLULU (happy fountains).
//   15.75      THE STARS: "Dream big, then *say* something."
import { makeDelulu, withProps, tearsCells, label, bubble, pop01, GOLD, BONE } from '../../nt2e16/scenes/delulukit.js'

const EP = makeDelulu({
  id: 'nt2e17', sign: 'pisces', crush: 'gemini', accent: '#7c74f0', heroIsPisces: true,
  claim: 'They said “see you around”… | so we’re *basically* engaged.',
  prop: (x, t, o) => withProps(x, t, o, () => tearsCells(x, t, t < 11 ? 2 : t < 15.2 ? 1 : 3)),
  ev: [
    { caption: '*they waved*', draw(x, t, S) { label(x, 'wave wave', 780, 1040, { size: 32, col: GOLD, alpha: pop01(t, S.t0 + 0.4, 0.2, 2), rot: 0.1 }) } },
    { caption: 'the wave lasted *a whole second*', draw(x, t, S) { label(x, '1.0 s', 780, 1040, { size: 44, col: GOLD, alpha: pop01(t, S.t0 + 0.4, 0.2, 2), rot: -0.1 }) } },
    { caption: 'said my name *right*', draw(x, t, S) { bubble(x, t, 780, 1030, S.t0 + 0.4, S.t1 - 0.2, '“bye, Pisces!”', { size: 30, col: '#c9f2d4' }) } },
  ],
  ask: 'around… like, Saturday?', answer: 'Saturday works!',
  last: 'Dream big, then *say* something.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
