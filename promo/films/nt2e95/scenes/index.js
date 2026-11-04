// nt2e95: INSTANT GREEN FLAG, "Excited About Your Thing" (15 s vertical, Star Talk Trends Vol. 2, music: dreamy · Ab).
// Story 0–10.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeFlag):
//   0.0 hook: "When they…" with both stars mid-moment · 1.5 the kind thing · 3.3 heart eyes · 4.1 the green flag
//   springs up + INSTANT GREEN FLAG banner · 6.0 card cut, THE STARS · 6.35 the last line. Pisces happy-cries in the back.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeFlag } = K
const EP = makeFlag({
  id: 'nt2e95',
  sign: 'aquarius', date: 'gemini',
  hook: 'When they get excited about *your* thing.', heroMood0: 'sparkle',
  line: 'wait, show me the sparkly one again!', lineSize: 31,
  // Aquarius mid-explanation, holding up a rock from the collection
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    const up = t > S.LINE + 0.8 ? 1 : 0
    K.box(x, 120, 1150, 360, 40, '#5a4a8a', { b: 5 })
    K.icon(x, 'rock', 170, 1130, 7, { alpha: k }); K.icon(x, 'rock', 420, 1132, 6, { alpha: k })
    K.icon(x, 'rock', 445, 880 - 60 * up - 6 * Math.sin(t * 4), 10, { alpha: k })
    if (up) K.sparkles(x, t, 445, 820, S.LINE + 0.85, 8, 70, 1, ['#7fd0ff', K.BONE, K.GOLD])
  },
  last: 'Your joy, *their* joy.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
