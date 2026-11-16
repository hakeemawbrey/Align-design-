// og-nhce07: the social rework of nhce07, HOT TAKE, COLD TAKE, "Too Cold to Go Out" (star_advice, pop · D).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (outline) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce07',
  hook: '',
  hot: { sign: 'pisces', take: 'Walk there. No coat. *Sob the whole way.*', say: 'my tears froze. still coming.', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'heart' },
  cold: { sign: 'leo', take: 'Cancel from bed: *“too cold lol.”*', say: 'the sofa crowned me king.', prop: 'sofa', propAt: [540, 1120], at: [540, 960], mood: 'sleepy', still: true, sayAt: [540, 640] },
  last: 'Can’t go out? *Call* and stay in together.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Too cold to go out. | You *had plans.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
