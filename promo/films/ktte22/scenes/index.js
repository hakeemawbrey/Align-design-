// ktte22: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: Single at Midnight" (~9 s vertical, star advice trial reel,
// house · F). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: the 12 signs mid-jump under frozen confetti, a 3-2-1 countdown to midnight starting.
//   SAD vs SPARKLY: 11 signs run to SPARKLY; Pisces alone at SAD, crying.
//   twist: STAY SAD ALONE vs LEAVE EARLY → the friends drop a third card, JOIN THE CONFETTI, and pull Pisces in:
//   all 12 at JOIN THE CONFETTI, happy tears.
//   Last: "Single at midnight. *Never alone.*" Seamless loop back to frame 0.
import { makeTT, confetti } from '../../ktte01/scenes/ttkit.js'
import { countdown, countdownCues } from '../../hookkit.js'

const VOTE = [...Array(11).fill('b'), 'a']
const EP = makeTT({
  id: 'ktte22', mode: 'crowd',
  hook: 'SINGLE AT MIDNIGHT: | *SAD OR SPARKLY?*', accent: '#f2c75c',
  brk: { kind: 'flash', t: 0.12 },
  r0: -0.3,
  rounds: [
    { a: 'SAD', b: 'SPARKLY', ia: 'moon', ib: 'spark', pick: VOTE, d: 3.0, pickAt: 1.4, stagger: 0.04 },
    { a: 'STAY SAD ALONE', b: 'LEAVE EARLY', ia: 'moon', ib: 'house', pick: Array(12).fill('c'), c: { text: 'JOIN THE CONFETTI', ic: 'spark', at: 0.3, tag: 'FRIENDS SAY' }, d: 2.0, pickAt: 0.85, stagger: 0.03 },
  ],
  last: 'Single at midnight. | *Never alone.*',
  ending: 'loop', fin: 2.5, finY: 760,
  mid(x, t, S) {
    confetti(x, t, -0.6, 540, 1000, { n: 30 })
    confetti(x, t, S.T.realOf(S.T.rounds[0].t0 + 1.35), 790, 900, { n: 34 })
    confetti(x, t, S.T.realOf(S.T.E - 0.2), 540, 760, { n: 40 })
  },
  fx(T) { const C = { at: 0.15, from: 3, gap: 0.38, go: 'MIDNIGHT!', y: 1110 }; return { scenes: [countdown(C)], cues: countdownCues(C) } },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
