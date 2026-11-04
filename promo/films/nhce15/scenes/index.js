// nhce15: HOT TAKE, COLD TAKE, "The Forgotten Gift" (14 s vertical star_advice trial reel, music: lofi · Am).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #15.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce15',
  hook: 'They *forgot* | your gift.',
  hot: { sign: 'scorpio', take: 'Write a twelve-verse *sad song.*', say: 'verse seven is the saddest.', prop: 'notes', propAt: [760, 900], propK: 0.9, mood: 'wide' },
  cold: { sign: 'cancer', take: 'Say “it’s fine.” It’s *not* fine.', say: 'it’s fine. :)', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'happy', still: true },
  last: 'Say it stung, *kindly.* Then let it go.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
