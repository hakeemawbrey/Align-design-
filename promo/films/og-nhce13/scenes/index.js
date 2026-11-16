// og-nhce13: the social rework of nhce13, HOT TAKE, COLD TAKE, "Cold Hands" (star_advice, pop · E).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (outline) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce13',
  hook: '',
  hot: { sign: 'taurus', take: 'Gloves off. Fingers *turn blue.* Worth it.', say: 'can’t feel my hands. still holding.', prop: 'gloves', propAt: [540, 760], at: [540, 1010], sayAt: [540, 600], mood: 'heart' },
  cold: { sign: 'aquarius', take: 'Own pockets. *Wrote a policy.*', say: 'pocket policy, section 4: no.', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'squint' },
  last: 'One glove each. *Share* a pocket.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Holding hands | when it’s *freezing.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
