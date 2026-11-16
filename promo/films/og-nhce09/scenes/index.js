// og-nhce09: the social rework of nhce09, HOT TAKE, COLD TAKE, "Drew Your Crush" (star_advice, jazzy · C).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (outline) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce09',
  hook: '',
  hot: { sign: 'scorpio', take: 'Spend a *year’s* budget. Knit their face.', say: 'I knit your portrait. from memory.', prop: 'frame', propOpts: { portrait: 'taurus' }, propAt: [760, 880], mood: 'heart' },
  cold: { sign: 'aries', take: 'Hand them a pen. *Sprint away.*', say: 'it’s a pen. bye!!', prop: 'pen', propAt: [740, 880], mood: 'squint' },
  last: 'Get the thing they *mentioned* once.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Gift exchange. | You drew *your crush.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
