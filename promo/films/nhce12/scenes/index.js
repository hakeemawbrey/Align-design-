// nhce12: HOT TAKE, COLD TAKE, "When December Is Hard" (16 s vertical star_advice trial reel, music: dreamy · Ab).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #12.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce12',
  hook: 'They say December | is *hard* for them.',
  hot: { sign: 'virgo', take: 'Plan twelve cheer-up events. *Laminated.*', say: 'event 1 starts at 7 AM.', prop: 'clipboard', text: ['1. 7AM cocoa', '2. 8AM lights', '3. 9AM sledding', '4. 10AM carols', '5. …'], propOpts: { laminated: true }, propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'taurus', take: 'Change the subject. *Fast.*', say: 'so… snacks?', prop: 'snacks', propAt: [740, 980], mood: 'wide' },
  last: 'Ask what *helps.* Then do that.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
