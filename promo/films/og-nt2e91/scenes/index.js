// og-nt2e91: the social rework of nt2e91, INSTANT GREEN FLAG, "They Remembered Her Name" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (outline) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Said her name once. | They *remembered.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const { makeFlag } = K
const EP = makeFlag({
  id: 'og-nt2e91',
  sign: 'taurus', date: 'cancer',
  hook: '',
  line: 'how’s Maya’s new job? I made her a card.', lineSize: 31, lineX: 520, lineY: 700, heroMood0: 'happy',
  // Taurus mid-story, holding up a photo of the sister
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    x.save(); x.translate(420, 880 - 6 * Math.sin(t * 3)); x.rotate(0.12); x.scale(k, k)
    K.box(x, -70, -85, 140, 170, K.BONE, { b: 6 }); K.R(x, '#bfe8ff', -56, -72, 112, 112)
    K.drawStarChar(x, 0, -6, 90, t, { color: '#e9b24a', mood: 'happy', seed: 9, glow: 0.4, tips: false })
    K.label(x, 'MAYA', 0, 64, { size: 20, col: K.INK, shadow: false })
    x.restore()
  },
  last: 'Taurus will *never* recover.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
