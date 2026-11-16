// og-nt2e92: the social rework of nt2e92, INSTANT GREEN FLAG, "Take Your Time" (Star Talk Trends Vol. 2). Same set, cast and story; static HOOK (box) from
// frame 0 instead of the animated caption, no series bug, crazier lines. The look lives in ./t2kit.js (og social copy
// of ../../nt2e81/scenes/t2kit.js); the film ends on THE STARS' last line.
import * as K from './t2kit.js'

export const HOOK = 'Libra vs. two menus. | They said *no rush.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const { makeFlag } = K
const EP = makeFlag({
  id: 'og-nt2e92',
  sign: 'libra', date: 'capricorn',
  hook: '',
  line: 'no rush. I cleared my whole evening.', lineSize: 31, lineX: 520, lineY: 700, heroMood0: 'wide',
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
  last: 'Libra needed that *so badly.*',
})
export const DURATION = EP.DURATION
export const STORY_END = EP.STORY_END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
