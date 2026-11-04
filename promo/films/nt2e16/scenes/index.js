// nt2e16: DELULU OR SOLULU: they laughed at my joke (25 s vertical, Trends Vol. 2 format 4; row in
// promo/films/next30/b11.md; music chiptune · E). Format look: ./delulukit.js (shared with nt2e17–nt2e20).
//   0.0        hook (frame 0): "They laughed at my joke… | so they're in *love*." Leo mid-hop under the meter.
//   2.0 / 5.0 / 8.0  evidence: *laughed twice* · said *"you're funny"* · *retold the joke* to a friend. The needle
//              swings further to DELULU each time; Leo's eyes go to hearts.
//   11.0       card cut · THE STARS: "…or you could just *ask?*"
//   13.0       Leo to Aquarius: "dinner Friday?"  14.3 "yes! you're so funny."  15.2 the needle slams to SOLULU.
//   15.75      THE STARS: "Hope is great. *Asking* is better."
import { makeDelulu, label, bubble, pop01, INK, GOLD } from './delulukit.js'

const EP = makeDelulu({
  id: 'nt2e16', sign: 'leo', crush: 'aquarius', accent: '#f39a3a',
  claim: 'They laughed at my joke… | so they’re in *love.*',
  ev: [
    { caption: '*laughed twice*', draw(x, t, S) { if (S.u > 0.4) { label(x, 'ha!', 300, 1040, { size: 46, col: GOLD, rot: -0.2, alpha: pop01(t, S.t0 + 0.4, 0.2, 2) }); label(x, 'ha!', 780, 1000, { size: 46, col: GOLD, rot: 0.2, alpha: pop01(t, S.t0 + 0.6, 0.2, 2) }) } }, cues: [['pop', 0.4, 1318.51, 0.03, -0.4], ['pop', 0.6, 1318.51, 0.03, 0.4]] },
    { caption: 'said *“you’re funny”*', draw(x, t, S) { bubble(x, t, 780, 1020, S.t0 + 0.4, S.t1 - 0.2, '“you’re funny”', { size: 30, col: '#c9f2d4' }) } },
    { caption: '*retold the joke* to a friend', draw(x, t, S) { bubble(x, t, 780, 1020, S.t0 + 0.4, S.t1 - 0.2, '(it got a laugh again)', { size: 26 }) } },
  ],
  ask: 'dinner Friday?', answer: 'yes! you’re so funny.',
  last: 'Hope is great. *Asking* is better.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
