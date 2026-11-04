// nt2e93: INSTANT GREEN FLAG, "Home Safe?" (15 s vertical, Star Talk Trends Vol. 2, music: dreamy · F).
// Story 0–10.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeFlag):
//   0.0 hook: "When they…" with both stars mid-moment · 1.5 the kind thing · 3.3 heart eyes · 4.1 the green flag
//   springs up + INSTANT GREEN FLAG banner · 6.0 card cut, THE STARS · 6.35 the last line. Pisces happy-cries in the back.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeFlag } = K
const EP = makeFlag({
  id: 'nt2e93',
  sign: 'sagittarius', date: 'leo',
  hook: 'When they text *home safe?* and wait up for the answer.', heroMood0: 'happy',
  phoneAt: -1, phoneName: 'LEO',
  phone: [{ text: 'home safe?', at: -1 }, { text: 'yep! just walked in', me: true, at: 1.4 }, { text: 'good. sleep well :)', at: 2.5 }],
  // Sagittarius just through the front door; Leo is still up, waiting for the answer
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    K.box(x, 90, 760, 170, 420, '#6b4a2f', { b: 7, hi: '#8a6440' }); K.R(x, K.GOLD, 230, 970, 14, 14)
    x.restore()
  },
  last: 'Care that *checks in*, not up.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
