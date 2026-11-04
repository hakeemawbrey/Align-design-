// nhce13: HOT TAKE, COLD TAKE, "Cold Hands" (14 s vertical star_advice trial reel, music: pop · E).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #13.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce13',
  hook: 'Holding hands | *in the cold.*',
  hot: { sign: 'taurus', take: 'Gloves off. *Freeze* for love.', say: 'can’t feel my fingers. worth it.', prop: 'gloves', propAt: [540, 760], at: [540, 1010], sayAt: [540, 600], mood: 'heart' },
  cold: { sign: 'aquarius', take: 'Hands in your *own* pockets.', say: 'my pockets, my policy.', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'squint' },
  last: 'One glove each. *Share* a pocket.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
