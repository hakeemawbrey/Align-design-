// nhce17: HOT TAKE, COLD TAKE, "Shorter Texts" (14 s vertical star_advice trial reel, music: jazzy · Eb).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #17.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce17',
  hook: 'Their texts got *shorter* | this month.',
  hot: { sign: 'cancer', take: 'Ask what you did wrong. *Nine* times.', say: 'are we ok? are we ok?', prop: 'phone', text: ['busy week!', '>are we ok?', '>are we ok??', '>hello??'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'wide' },
  cold: { sign: 'libra', take: 'Match it. Shorter. *Colder.*', say: 'ok.', prop: 'phone', text: ['busy week!', '>ok.'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'neutral' },
  last: 'Busy month. Ask *“how’s your week?”*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
