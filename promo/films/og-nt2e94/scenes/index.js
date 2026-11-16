// og-nt2e94: the social rework of nt2e94, INSTANT GREEN FLAG, "Bragging Out Loud" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (box) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Their friends | yelled *FINALLY.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const { makeFlag } = K
const EP = makeFlag({
  id: 'og-nt2e94',
  sign: 'virgo', date: 'aries',
  hook: '', heroMood0: 'neutral',
  line: 'THIS IS THE ONE. I made a slideshow!', lineSize: 30, lineY: 800,
  // two of the date's friends in the back go FINALLY!
  extra(x, t, S) {
    const k = K.pop01(t, S.LINE + 1.0, 0.3, 2.2) * K.outK(t, [S.END + 9, S.END + 9.3]); if (k <= 0.01) return
    K.sign(x, t, 'gemini', { x: 170, y: 650, s: 110, pop: k, mood: 'sparkle', hops: [S.LINE + 1.1, S.LINE + 1.5], seed: 8 })
    K.sign(x, t, 'cancer', { x: 310, y: 640, s: 110, pop: k, mood: 'happy', hops: [S.LINE + 1.2, S.LINE + 1.6], seed: 9 })
    K.bubble(x, t, 240, 540, S.LINE + 1.15, S.END - 0.1, 'FINALLY!! we know EVERYTHING', { size: 32, col: '#ffe08a', tail: 0 })
  },
  cues: [['clap', 2.55, { gain: 0.12, pan: 0.2 }], ['clap', 2.85, { gain: 0.12, pan: -0.2 }]],
  last: 'Virgo is blushing *in real time.*',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
