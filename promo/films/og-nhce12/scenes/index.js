// og-nhce12: the social rework of nhce12, HOT TAKE, COLD TAKE, "When December Is Hard" (star_advice, dreamy · Ab).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (box) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce12',
  hook: '',
  hot: { sign: 'virgo', take: 'Plan *thirty* cheer-up events. Laminated.', say: 'event 1 starts at 6 AM. sharp.', prop: 'clipboard', text: ['1. 6AM cocoa', '2. 6:15 lights', '3. 6:30 sledding', '4. 6:45 carols', '5–30. see back'], propOpts: { laminated: true }, propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'taurus', take: 'Change the subject. *To snacks.* Forever.', say: 'so… have you tried this dip?', prop: 'snacks', propAt: [740, 980], mood: 'wide' },
  last: 'Ask what *helps.* Then do that.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'They say December | is *hard* for them.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
