// nhce23: HOT TAKE, COLD TAKE, "Crush in Town" (14 s vertical star_advice trial reel, music: chiptune · E).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #23.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce23',
  hook: 'Your crush is in town | *for the holidays.*',
  hot: { sign: 'pisces', take: 'Plan their *whole* ten-day trip.', say: 'day 4: we cry at the lights.', prop: 'clipboard', text: ['DAY 1: cocoa', 'DAY 2: skating', 'DAY 3: market', 'DAY 4: cry at', '  the lights', 'DAY 5: …'], propAt: [760, 880], propK: 0.9, mood: 'heart' },
  cold: { sign: 'leo', take: 'Wait for *them* to text first.', say: 'they’ll text me. probably.', prop: 'phone', text: [], propOpts: { title: 'crush', status: 'no new messages' }, propAt: [770, 880], mood: 'neutral', still: true },
  last: 'Text *“free for cocoa?”* Keep it simple.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
