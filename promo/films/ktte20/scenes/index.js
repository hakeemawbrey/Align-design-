// ktte20: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: Plan or Surprise" (~9 s vertical, star advice trial reel,
// pop · E). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: the 12 signs mid-dash toward PLAN THE DATE and SURPRISE ME; freeze frame "split down the middle."
//   the vote splits evenly, two undecided (Libra, Pisces): BZZT "TIE!"
//   tiebreaker: everyone turns to Pisces, who cries and can't choose: BZZT.
//   twist: a card drops: ASK WHAT THEY'D LIKE. All 12 run to it.
//   Last: "The best surprise *is asking.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

//            ari  tau  gem  can  leo  vir  lib  sco  sag  cap  aqu  pis
const VOTE = ['b', 'a', 'b', 'a', 'b', 'a', null, 'a', 'b', 'a', 'b', null]
const EP = makeTT({
  id: 'ktte20', mode: 'crowd',
  hook: 'PLAN THE DATE | OR *SURPRISE ME?*', accent: '#ff8fb1',
  brk: { kind: 'scratch', t: 0.3, len: 0.5, cap: 'split *down the middle.*' },
  r0: -0.4,
  rounds: [
    { a: 'PLAN THE DATE', b: 'SURPRISE ME', ia: 'cal', ib: 'spark', pick: VOTE, d: 2.2, pickAt: 0.35, stagger: 0.06 },
    { a: 'PLAN THE DATE', b: 'SURPRISE ME', ia: 'cal', ib: 'spark', pick: null, buzz: true, alarm: 'TIE!', d: 1.7, pickAt: 1.0, hover: true,
      extra(x, t, S) { bubble(x, t, 540, 1080, S.T.realOf(S.r.t0 + 0.15), S.T.realOf(S.r.t0 + 1.0), 'tiebreaker: PISCES', { size: 44 }) } },
    { a: 'PLAN THE DATE', b: 'SURPRISE ME', ia: 'cal', ib: 'spark', pick: Array(12).fill('c'), c: { text: 'ASK WHAT THEY’D LIKE', ic: 'q', at: 0.15, tag: 'OR…' }, d: 1.9, pickAt: 0.55, stagger: 0.04 },
  ],
  last: 'The best surprise | *is asking.*',
  ending: 'cut', fin: 2.3, finY: 760,
  over(x, t, S) { const R2 = S.T.rounds[1]; bubble(x, t, 830, 1390, S.T.realOf(R2.t0 + 0.6), S.T.realOf(R2.t1), 'I CAN’T PICK', { size: 44, tail: 0.6 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
