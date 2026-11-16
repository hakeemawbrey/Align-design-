// og-nt2e95: the social rework of nt2e95, INSTANT GREEN FLAG, "Excited About Your Thing" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (outline) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'They asked to see | my rocks *again.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const { makeFlag } = K
const EP = makeFlag({
  id: 'og-nt2e95',
  sign: 'aquarius', date: 'gemini',
  hook: '', heroMood0: 'sparkle',
  line: 'wait, show me the sparkly one AGAIN!', lineSize: 31, lineX: 520, lineY: 700,
  // Aquarius mid-explanation, holding up a rock from the collection
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    const up = t > S.LINE + 0.8 ? 1 : 0
    K.box(x, 120, 1150, 360, 40, '#5a4a8a', { b: 5 })
    K.icon(x, 'rock', 170, 1130, 7, { alpha: k }); K.icon(x, 'rock', 420, 1132, 6, { alpha: k })
    K.icon(x, 'rock', 445, 880 - 60 * up - 6 * Math.sin(t * 4), 10, { alpha: k })
    if (up) K.sparkles(x, t, 445, 820, S.LINE + 0.85, 8, 70, 1, ['#7fd0ff', K.BONE, K.GOLD])
  },
  last: 'Aquarius is naming a rock *after them.*',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
