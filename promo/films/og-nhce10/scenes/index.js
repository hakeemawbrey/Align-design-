// og-nhce10: the social rework of nhce10, HOT TAKE, COLD TAKE, "Happy Holidays, Ex" (star_advice, dreamy · F).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (box) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce10',
  hook: '',
  hot: { sign: 'gemini', take: 'Reply in *four parts.* Twin two adds notes.', say: 'part 1 of 4 (twin edits pending)', prop: 'phone', text: ['happy holidays!', '>part 1 of 4: so, about last winter, and also the thing with the scarf, and', '>part 2 of 4:'], propOpts: { title: 'ex' }, propAt: [770, 880] },
  cold: { sign: 'libra', take: 'Draft forty replies. Send *none.*', say: 'draft 41 is almost perfect.', prop: 'phone', text: ['happy holidays!'], propOpts: { title: 'ex', status: 'seen · 40 drafts' }, propAt: [770, 880], mood: 'neutral' },
  last: 'A kind reply is fine. So is *none.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Your ex texts | *“happy holidays.”*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
