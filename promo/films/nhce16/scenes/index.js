// nhce16: HOT TAKE, COLD TAKE, "Snow Day" (14 s vertical star_advice trial reel, music: chiptune · G).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #16.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce16',
  hook: 'Snow day. | They’re *free all day.*',
  hot: { sign: 'aries', take: 'A fourteen-hour date. *Itinerary* attached.', say: 'stop 9: sledding!', prop: 'clipboard', text: ['8AM pancakes', '9AM snow walk', '11AM skating', '1PM cocoa', '3PM sledding', '…14 stops'], propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'virgo', take: 'Text “enjoy your day.” Clean the *closet.*', say: 'the closet needed me.', prop: 'folded', propOpts: { tag: '✓ TIDY' }, propAt: [760, 900], mood: 'neutral', still: true },
  last: 'Ask for *one* cozy hour.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
