// nhce20: HOT TAKE, COLD TAKE, "The Holiday Market" (14 s vertical star_advice trial reel, music: pop · F).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #20.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce20',
  hook: 'A cute stranger | at the *holiday market.*',
  hot: { sign: 'capricorn', take: 'Buy them the *entire* stall.', say: 'I own the mittens now.', prop: 'stall', propOpts: { sold: true }, propAt: [700, 880], propK: 0.85, at: [300, 1060] },
  cold: { sign: 'aries', take: 'Stare at candles until they *leave.*', say: 'these candles… so… wax.', prop: 'candles', propAt: [740, 1000], propK: 0.85, mood: 'wide', look: [1, 0.4] },
  last: 'Say *hi.* Compliment the hat.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
