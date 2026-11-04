// nhce21: HOT TAKE, COLD TAKE, "The Holiday Card" (14 s vertical star_advice trial reel, music: lofi · Bm).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #21.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce21',
  hook: 'The holiday card: | *both names?*',
  hot: { sign: 'virgo', take: 'Both names, a photo and a *crest.*', say: 'I designed us a crest.', prop: 'card', text: ['LOVE,', 'US (EST. NOV)'], propOpts: { crest: true }, propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'scorpio', take: 'Sign it *“regards.”*', say: 'regards, me.', prop: 'card', text: ['Regards.'], propAt: [760, 880], propK: 0.9, mood: 'squint' },
  last: 'Ask first. *Together* is a choice.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
