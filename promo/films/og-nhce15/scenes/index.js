// og-nhce15: the social rework of nhce15, HOT TAKE, COLD TAKE, "The Forgotten Gift" (star_advice, lofi · Am).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (outline) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce15',
  hook: '',
  hot: { sign: 'scorpio', take: 'Write a *forty-verse* sad song. Perform it.', say: 'verse seven is about you.', prop: 'notes', text: ['SAD SONG', 'verse 1…', 'verse 7…', 'verse 40 (!!)'], propAt: [760, 900], propK: 0.9, mood: 'wide' },
  cold: { sign: 'cancer', take: 'Say “it’s fine.” Remember it *forever.*', say: 'it’s fine. :) (filed forever)', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'happy', still: true },
  last: 'Say it stung, *kindly.* Then let it go.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'They *forgot* | your gift.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
