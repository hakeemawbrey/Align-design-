// og-ktte04: social rework of ktte04 "Left on Read: Spiral or Chill" (static HOOK outline over a longer opening; no series
// bug, slam title or glitch; Cancer pushed to full mourning; ends on the last line under the "call tmrw?" text).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte04: THIS OR THAT: LOVE EDITION, "Left on Read: Spiral or Chill" (~10 s vertical, star advice trial reel, dreamy · D).
//   frame 0: a "Read 9:41 PM" bubble drifting past Cancer as it hovers between the first two cards.
//   SEND 14 TEXTS vs WAIT IT OUT → WAIT · WRITE THE BREAKUP SPEECH vs ASSUME THEY'RE BUSY → long hover → BUSY
//   SOUP IN THE DARK vs CALL A FRIEND → CALL A FRIEND (Pisces answers in the tissue cam, crying). A notification drops:
//   "sorry!! long day. call tmrw?" Last: "Busy is *not a verdict.*" Hard cut.
import { makeTT, bubble, ease, prog } from './ttkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const EP = makeTT({
  id: 'og-ktte04', mode: 'solo', signs: ['cancer'],
  hook: '', accent: '#7fd0ff',
  rounds: [
    { a: 'SEND 14 TEXTS', b: 'WAIT IT OUT', ia: 'bubble', ib: 'clock', pick: 'b', hover: true },
    { a: 'WRITE THE BREAKUP SPEECH', b: "ASSUME THEY'RE BUSY", ia: 'sweat', ib: 'cal', pick: 'b', d: 2.4, pickAt: 1.9, hover: true,
      extra(x, t, S) { bubble(x, t, 470, 1085, S.T.realOf(S.r.t0 + 0.3), S.T.realOf(S.r.t0 + 1.8), "it's been 4 minutes.\nI'm in mourning.", { size: 38 }) } },
    { a: 'SOUP IN THE DARK', b: 'CALL A FRIEND', ia: 'fork', ib: 'phone', pick: 'b', d: 1.7 },
  ],
  last: 'Busy is | *not a verdict.*',
  ending: 'cut', fin: 2.6, finY: 1010,
  mid(x, t, S) {
    // the "Read" receipt drifting past Cancer through the opening
    if (S.v < 1.9) { const p = ease.inQuad(prog(S.v, -0.4, 1.9)); bubble(x, t, 760 - 600 * p, 1080 + 200 * p, -1, 1.9, 'Read 9:41 PM', { size: 46, col: '#d8d2ec' }) }
  },
  over(x, t, S) { const R2 = S.T.rounds[2]; const a = S.T.realOf(R2.slam); bubble(x, t, 795, 1205, a + 0.1, S.T.realOf(S.T.E) + 1.2, 'I got you!!', { size: 38, tail: 0.3, col: '#c9f2d4' }) },
  fx(T) {
    const N = { at: +(T.realOf(T.E) + 0.15).toFixed(3), out: [99, 99.2], title: 'messages', body: 'sorry!! long day. *call tmrw?*', glyph: '★', y: 520 }
    return { scenes: [notification(N)], cues: notificationCues(N) }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Left on read. | Cancer *is grieving.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.6
