// nhce05: HOT TAKE, COLD TAKE, "The Three-Week Gift" (14 s vertical star_advice trial reel, music: chiptune · A).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #5.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce05',
  hook: 'Three weeks in. | *What’s the gift?*',
  hot: { sign: 'taurus', take: 'A robe. A candle. A *whole tree.*', say: 'it’s a starter kit!', prop: 'gifts', n: 7, propAt: [760, 900], propK: 0.95 },
  cold: { sign: 'gemini', take: 'Nothing. Pretend it’s not a *holiday.*', say: 'holidays? never heard of them.', prop: 'none', at: [540, 1010], mood: 'eyeroll', sayAt: [540, 640] },
  last: 'Three weeks? Go *small and sweet.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
