// nt2e92: INSTANT GREEN FLAG, "Take Your Time" (15 s vertical, Star Talk Trends Vol. 2, music: dreamy · Eb).
// Story 0–10.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeFlag):
//   0.0 hook: "When they…" with both stars mid-moment · 1.5 the kind thing · 3.3 heart eyes · 4.1 the green flag
//   springs up + INSTANT GREEN FLAG banner · 6.0 card cut, THE STARS · 6.35 the last line. Pisces happy-cries in the back.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeFlag } = K
const EP = makeFlag({
  id: 'nt2e92',
  sign: 'libra', date: 'capricorn',
  hook: 'When they say *take your time* and actually mean it.',
  line: 'no rush. I like watching you decide.', lineSize: 31, heroMood0: 'wide',
  // Libra frozen between two menus
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    for (const [dx, r, c] of [[-135, -0.2, '#e163d6'], [135, 0.2, '#7fd0ff']]) {
      x.save(); x.translate(300 + dx, 900 + 8 * Math.sin(t * 4 + dx)); x.rotate(r); x.scale(k, k)
      K.box(x, -55, -75, 110, 150, K.BONE, { b: 5 }); K.R(x, c, -55, -75, 110, 26)
      for (let i = 0; i < 4; i++) K.R(x, '#b8aecb', -40, -30 + i * 24, 80 - (i % 2) * 22, 8)
      x.restore()
    }
  },
  last: 'Patience looks *good* on you.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
