// nhce18: HOT TAKE, COLD TAKE, "New Year’s Eve Plans" (16 s vertical star_advice trial reel, music: funk · A).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #18.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce18',
  hook: 'New Year’s Eve. | *No plans yet.*',
  hot: { sign: 'libra', take: 'Book a rooftop, a band *and* a boat.', say: 'and a second boat?', prop: 'tickets', propAt: [760, 900], propK: 1.15 },
  cold: { sign: 'taurus', take: 'Asleep by ten. *Earplugs* in.', say: 'happy new year. zzz.', prop: 'blanket', mood: 'sleepy', still: true, at: [480, 1010] },
  last: 'Ask what *they’d* love. Plan that.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
