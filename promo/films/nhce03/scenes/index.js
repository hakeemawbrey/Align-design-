// nhce03: HOT TAKE, COLD TAKE, "The Plus-One" (16 s vertical star_advice trial reel, music: jazzy · Bb).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #3.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce03',
  hook: 'The party invite says | *“plus one?”*',
  hot: { sign: 'sagittarius', take: 'Bring someone you met *this morning.*', say: 'we bonded at the bus stop!', prop: 'partyhat', at: [400, 1010] },
  cold: { sign: 'aquarius', take: 'Go alone. Stand by the snacks. *Leave.*', say: 'i’m observing.', prop: 'snacks', propAt: [740, 980], mood: 'neutral' },
  last: 'Bring someone who’d *enjoy* it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
