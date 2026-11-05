// ktte04: THIS OR THAT: LOVE EDITION, "Left on Read: Spiral or Chill" (~10 s vertical, star advice trial reel, dreamy · D).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: a "Read 9:41 PM" bubble crashing past Cancer as it lunges into WAIT IT OUT; glitch.
//   DOUBLE TEXT vs WAIT IT OUT → WAIT · ASSUME THE WORST vs ASSUME THEY'RE BUSY → long hover → BUSY
//   COMFORT FOOD vs CALL A FRIEND → CALL A FRIEND (Pisces answers in the tissue cam, crying). A notification drops:
//   "sorry!! long day. call tmrw?" Last: "Busy is *not a verdict.*" Hard cut.
import { makeTT, bubble, ease, prog } from '../../ktte01/scenes/ttkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const EP = makeTT({
  id: 'ktte04', mode: 'solo', signs: ['cancer'],
  hook: 'LEFT ON READ: | *SPIRAL* OR CHILL?', accent: '#7fd0ff',
  brk: { kind: 'glitch', t: 0.12 },
  rounds: [
    { a: 'DOUBLE TEXT', b: 'WAIT IT OUT', ia: 'bubble', ib: 'clock', pick: 'b' },
    { a: 'ASSUME THE WORST', b: "ASSUME THEY'RE BUSY", ia: 'sweat', ib: 'cal', pick: 'b', d: 2.3, pickAt: 1.8, hover: true },
    { a: 'COMFORT FOOD', b: 'CALL A FRIEND', ia: 'fork', ib: 'phone', pick: 'b', d: 1.6 },
  ],
  last: 'Busy is | *not a verdict.*',
  ending: 'cut', fin: 2.6, finY: 930,
  mid(x, t, S) {
    // the "Read" receipt crashing past at frame 0
    if (S.v < 0.9) { const p = ease.inQuad(prog(S.v, -0.4, 0.9)); bubble(x, t, 760 - 600 * p, 1080 + 200 * p, -1, 0.9, 'Read 9:41 PM', { size: 46, col: '#d8d2ec' }) }
  },
  over(x, t, S) { const R2 = S.T.rounds[2]; const a = S.T.realOf(R2.slam); bubble(x, t, 760, 1395, a + 0.1, S.T.realOf(S.T.E) + 1.2, 'I got you!!', { size: 38, tail: 0.3, col: '#c9f2d4' }) },
  fx(T) {
    const N = { at: +(T.realOf(T.E) + 0.15).toFixed(3), out: [99, 99.2], title: 'messages', body: 'sorry!! long day. *call tmrw?*', glyph: '★', y: 455 }
    return { scenes: [notification(N)], cues: notificationCues(N) }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
