// nhce19: HOT TAKE, COLD TAKE, "Winter Blues" (16 s vertical star_advice trial reel, music: dreamy · Db).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #19.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce19',
  hook: 'Winter blues. | *You feel low.*',
  hot: { sign: 'aquarius', take: 'Text *everyone* you’ve ever met.', say: 'hi, whole contact list!', prop: 'phone', text: ['>hi!!', '>hi!!', '>hi!!', '>hi!! (to everyone)'], propOpts: { title: 'everyone' }, propAt: [770, 880], mood: 'wide' },
  cold: { sign: 'gemini', take: 'Ignore it. Push *through.*', say: 'I’m FINE. (I’m not.)', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'happy' },
  last: 'Tell *one* person how you really feel.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
