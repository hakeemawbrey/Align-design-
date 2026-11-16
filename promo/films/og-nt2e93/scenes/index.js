// og-nt2e93: the social rework of nt2e93, INSTANT GREEN FLAG, "Home Safe?" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (outline) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = '“home safe?” | and they *waited up.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const { makeFlag } = K
const EP = makeFlag({
  id: 'og-nt2e93',
  sign: 'sagittarius', date: 'leo',
  hook: '', heroMood0: 'happy',
  phoneAt: -1, phoneName: 'LEO',
  phone: [{ text: 'home safe?', at: -1 }, { text: 'yep! just walked in', me: true, at: 1.4 }, { text: 'good. I was NOT pacing.', at: 2.5 }],
  // Sagittarius just through the front door; Leo is still up, waiting for the answer
  prop(x, t, S) {
    const k = K.outK(t, [S.FLAG - 0.1, S.FLAG + 0.15]); if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    K.box(x, 90, 760, 170, 420, '#6b4a2f', { b: 7, hi: '#8a6440' }); K.R(x, K.GOLD, 230, 970, 14, 14)
    x.restore()
  },
  last: 'Sagittarius is *not* cool about it.',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
