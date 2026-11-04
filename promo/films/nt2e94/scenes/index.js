// nt2e94: INSTANT GREEN FLAG, "Bragging Out Loud" (15 s vertical, Star Talk Trends Vol. 2, music: dreamy · Gb).
// Story 0–10.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeFlag):
//   0.0 hook: "When they…" with both stars mid-moment · 1.5 the kind thing · 3.3 heart eyes · 4.1 the green flag
//   springs up + INSTANT GREEN FLAG banner · 6.0 card cut, THE STARS · 6.35 the last line. Pisces happy-cries in the back.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeFlag } = K
const EP = makeFlag({
  id: 'nt2e94',
  sign: 'virgo', date: 'aries',
  hook: 'When they introduce you like they’ve been *bragging* about you.', heroMood0: 'neutral',
  line: 'this is the one I keep telling you about!', lineSize: 29, lineY: 800,
  // two of the date's friends in the back go FINALLY!
  extra(x, t, S) {
    const k = K.pop01(t, S.LINE + 1.0, 0.3, 2.2) * K.outK(t, [S.END + 3.8, S.END + 4.1]); if (k <= 0.01) return
    K.sign(x, t, 'gemini', { x: 170, y: 650, s: 110, pop: k, mood: 'sparkle', hops: [S.LINE + 1.1, S.LINE + 1.5], seed: 8 })
    K.sign(x, t, 'cancer', { x: 310, y: 640, s: 110, pop: k, mood: 'happy', hops: [S.LINE + 1.2, S.LINE + 1.6], seed: 9 })
    K.bubble(x, t, 240, 540, S.LINE + 1.15, S.END - 0.1, 'FINALLY!!', { size: 34, col: '#ffe08a', tail: 0 })
  },
  cues: [['clap', 2.55, { gain: 0.12, pan: 0.2 }], ['clap', 2.85, { gain: 0.12, pan: -0.2 }]],
  last: 'Proud of you, *out loud*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
