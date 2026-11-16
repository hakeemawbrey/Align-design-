// og-nhce05: social rework of nhce05 (static HOOK outline 0–2.4 over the split screen, no animated hook title / series bug /
// white flashes, thermometer + Pisces + stickers + dialogue box in the safe zone, both signs pushed further; kit copy ./hckit.js).
// Was: nhce05: HOT TAKE, COLD TAKE, "The Three-Week Gift" (14 s vertical star_advice trial reel, music: chiptune · A).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #5.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce05',
  was: 'Three weeks in. | *What’s the gift?*',
  hot: { sign: 'taurus', take: 'A robe. A candle. A *whole tree.*', say: 'it’s a starter kit! for life!', prop: 'gifts', n: 7, propAt: [760, 900], propK: 0.95 },
  cold: { sign: 'gemini', take: 'Nothing. Pretend it’s not a *holiday.*', say: 'holidays? never met her.', prop: 'none', at: [540, 1010], mood: 'eyeroll', sayAt: [540, 640] },
  last: 'Three weeks? Go *small and sweet.*',
})

export const HOOK = "Three weeks in. | *What’s the gift?*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
export const STORY_END = 11.6
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
