// nhce14: HOT TAKE, COLD TAKE, "Family Dinner, Month One" (16 s vertical star_advice trial reel, music: funk · G).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #14.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce14',
  hook: 'Their family invited you. | *Month one.*',
  hot: { sign: 'sagittarius', take: 'Say yes. Bring gifts for *every* cousin.', say: 'I learned everyone’s birthdays!', prop: 'gifts', n: 7, propAt: [760, 900], propK: 0.95 },
  cold: { sign: 'capricorn', take: 'Say you’re booked *until spring.*', say: 'my calendar is full. of nothing.', prop: 'calendar', n: 0, propAt: [760, 880], propK: 0.9, propOpts: { title: 'BOOKED', col: '#2a2148' }, mood: 'neutral' },
  last: 'Go if you’re ready. *Ask* who’ll be there.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
