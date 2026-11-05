// ktte19: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: Call or Text" (~9 s vertical, star advice trial reel,
// chiptune · A). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
// All 12 signs vote by running to a card (no counts, no stats: it's characters, not a survey).
//   frame 0: the stampede already on (signs mid-dash toward CALL and TEXT); whip zoom.
//   CALL vs TEXT: the signs split; Pisces stays in the middle, crying: "voice note??"
//   twist: a third card slams down: VOICE NOTE. Everyone stampedes to it.
//   Last: "Everyone secretly *loves a voice note.*" Seamless loop back to frame 0.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

//            ari  tau  gem  can  leo  vir  lib  sco  sag  cap  aqu  pis
const VOTE = ['a', 'b', 'b', 'a', 'a', 'b', 'b', 'a', 'b', 'a', 'b', null]
const EP = makeTT({
  id: 'ktte19', mode: 'crowd',
  hook: '12 SIGNS. ONE QUESTION. | *CHAOS.*', accent: '#9fe6b0',
  brk: { kind: 'whip', t: 0.12 },
  r0: -0.4,
  rounds: [
    { a: 'CALL', b: 'TEXT', ia: 'phone', ib: 'bubble', pick: VOTE, d: 2.6, pickAt: 0.4, stagger: 0.07 },
    { a: 'CALL', b: 'TEXT', ia: 'phone', ib: 'bubble', pick: Array(12).fill('c'), c: { text: 'VOICE NOTE', ic: 'bubble', at: 0.15, tag: 'WAIT—' }, d: 1.9, pickAt: 0.55, stagger: 0.04 },
  ],
  last: 'Everyone secretly | *loves a voice note.*',
  ending: 'loop', fin: 2.4, finY: 760,
  over(x, t, S) { const R1 = S.T.rounds[0]; bubble(x, t, 830, 1390, S.T.realOf(R1.t0 + 1.3), S.T.realOf(R1.t1), 'voice note??', { size: 44, tail: 0.6 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
