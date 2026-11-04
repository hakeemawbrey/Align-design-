// nhce11: HOT TAKE, COLD TAKE, "The Skating Date" (14 s vertical star_advice trial reel, music: chiptune · B).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #11.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce11',
  hook: 'Ice skating date. | *You can’t skate.*',
  hot: { sign: 'leo', take: 'Pretend you’re a pro. Go *fast.*', say: 'I’m a natural!! (help)', prop: 'skates', wobble: true, at: [480, 1010], mood: 'wide' },
  cold: { sign: 'pisces', take: 'Suggest a museum. *Every* time.', say: 'the art is indoors…', prop: 'frame', propAt: [760, 880], mood: 'wide' },
  last: 'Say *“I’m new at this.”* Hold the wall together.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
