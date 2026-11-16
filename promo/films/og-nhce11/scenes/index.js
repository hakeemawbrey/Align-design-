// og-nhce11: the social rework of nhce11, HOT TAKE, COLD TAKE, "The Skating Date" (star_advice, chiptune · B).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (outline) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce11',
  hook: '',
  hot: { sign: 'leo', take: 'Claim you’re a pro. *Attempt a spin.*', say: 'I’m a natural!! (call someone)', prop: 'skates', wobble: true, at: [480, 1010], mood: 'wide' },
  cold: { sign: 'pisces', take: 'Suggest a museum. *Weep* at the rink.', say: 'the ice looked so lonely…', prop: 'frame', propAt: [760, 880], mood: 'wide' },
  last: 'Say *“I’m new at this.”* Hold the wall together.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Ice skating date. | *You can’t skate.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
