// nhce02: HOT TAKE, COLD TAKE, "The Borrowed Scarf" (14 s vertical star_advice trial reel, music: lofi · Dm).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #2.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce02',
  hook: 'They lent you | *their scarf.*',
  hot: { sign: 'leo', take: 'Wear it forever. You’re *engaged* now.', say: 'it’s basically a ring.', prop: 'scarf', col: '#e8344e', col2: '#efe6d6', mood: 'heart', propAt: [760, 860] },
  cold: { sign: 'virgo', take: 'Wash it. Fold it. Return it in an *hour.*', say: 'laundered. returned.', prop: 'folded', propAt: [760, 900], mood: 'neutral' },
  last: 'It’s a scarf. Ask what it *means.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
