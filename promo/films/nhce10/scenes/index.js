// nhce10: HOT TAKE, COLD TAKE, "Happy Holidays, Ex" (14 s vertical star_advice trial reel, music: dreamy · F).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #10.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce10',
  hook: 'Your ex texts | *“happy holidays.”*',
  hot: { sign: 'gemini', take: 'Reply with a *three-page* essay.', say: 'part 1 of 4:', prop: 'phone', text: ['happy holidays!', '>part 1 of 4: so, about last winter, and also the thing with the scarf, and', '>part 2 of 4:'], propOpts: { title: 'ex' }, propAt: [770, 880] },
  cold: { sign: 'libra', take: 'Leave it on read *till spring.*', say: 'seen.', prop: 'phone', text: ['happy holidays!'], propOpts: { title: 'ex', status: 'seen' }, propAt: [770, 880], mood: 'neutral' },
  last: 'A kind reply is fine. So is *none.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
