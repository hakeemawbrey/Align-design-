// nt2e91: INSTANT GREEN FLAG, "They Remembered Her Name" (13 s vertical, Star Talk Trends Vol. 2, music: dreamy · Db).
// Story 0–10.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeFlag):
//   0.0 hook: "When they…" with both stars mid-moment · 1.5 the kind thing · 3.3 heart eyes · 4.1 the green flag
//   springs up + INSTANT GREEN FLAG banner · 6.0 jump cut, THE STARS · 6.35 the last line. Pisces happy-cries in the back.
import * as K from '../../nt2e81/scenes/t2kit.js'

const { makeFlag } = K
const EP = makeFlag({
  id: 'nt2e91',
  sign: 'taurus', date: 'cancer',
  hook: 'When they remember your *sister’s name* after hearing it once.',
  line: 'wait, how’s Maya’s new job?', heroMood0: 'happy',
  // Taurus mid-story, holding up a photo of the sister
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    x.save(); x.translate(420, 880 - 6 * Math.sin(t * 3)); x.rotate(0.12); x.scale(k, k)
    K.box(x, -70, -85, 140, 170, K.BONE, { b: 6 }); K.R(x, '#bfe8ff', -56, -72, 112, 112)
    K.drawStarChar(x, 0, -6, 90, t, { color: '#e9b24a', mood: 'happy', seed: 9, glow: 0.4, tips: false })
    K.label(x, 'MAYA', 0, 64, { size: 20, col: K.INK, shadow: false })
    x.restore()
  },
  last: 'Small detail, *big* signal.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
