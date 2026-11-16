// og-ktte19 (og social cut of ktte19): static HOOK (box) replaces the slammed title; no series bug; no whip zoom;
// no loop (ends on the voice-note line); the cards are louder; the crowd stays clear of the app buttons.
// ktte19: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: Call or Text" (~9 s vertical, star advice trial reel,
// chiptune · A). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
// All 12 signs vote by running to a card (no counts, no stats: it's characters, not a survey).
//   frame 0: the stampede already on (signs mid-dash toward CALL and TEXT); whip zoom.
//   CALL vs TEXT: the signs split; Pisces stays in the middle, crying: "voice note??"
//   twist: a third card slams down: VOICE NOTE. Everyone stampedes to it.
//   Last: "Everyone secretly *loves a voice note.*" Seamless loop back to frame 0.
import { makeTT, bubble } from './ttkit.js'

//            ari  tau  gem  can  leo  vir  lib  sco  sag  cap  aqu  pis
const VOTE = ['a', 'b', 'b', 'a', 'a', 'b', 'b', 'a', 'b', 'a', 'b', null]
const EP = makeTT({
  id: 'og-ktte19', mode: 'crowd',
  hook: '12 SIGNS. ONE QUESTION. | *CHAOS.*', accent: '#9fe6b0',
  hookUntil: 3.2,
  r0: -0.4,
  rounds: [
    { a: 'CALL. RIGHT NOW.', b: 'TEXT. AFTER 9 DRAFTS.', ia: 'phone', ib: 'bubble', pick: VOTE, d: 2.6, pickAt: 0.4, stagger: 0.07 },
    { a: 'CALL. RIGHT NOW.', b: 'TEXT. AFTER 9 DRAFTS.', ia: 'phone', ib: 'bubble', pick: Array(12).fill('c'), c: { text: 'VOICE NOTE', ic: 'bubble', at: 0.15, tag: 'WAIT—' }, d: 1.9, pickAt: 0.55, stagger: 0.04 },
  ],
  last: 'Everyone secretly | *loves a voice note.*',
  ending: 'cut', fin: 2.4, finY: 760,
  over(x, t, S) { const R1 = S.T.rounds[0]; bubble(x, t, 690, 1390, S.T.realOf(R1.t0 + 1.3), S.T.realOf(R1.t1), 'voice note?? (sobbing)', { size: 36, tail: 0.6 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = 'Call or text? | *12 signs. Chaos.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +EP.T.realOf(EP.HOOK_UNTIL).toFixed(2)
