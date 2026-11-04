// nhce07: HOT TAKE, COLD TAKE, "Too Cold to Go Out" (16 s vertical star_advice trial reel, music: pop · D).
// Story 0–11.6, then the shared end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · card cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #7.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce07',
  hook: 'It’s *too cold* | to go out tonight.',
  hot: { sign: 'pisces', take: 'Go anyway. No coat. *For love.*', say: 'my heart is my coat.', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'heart' },
  cold: { sign: 'leo', take: 'Cancel by text: *“too cold lol.”*', say: 'the sofa chose me.', prop: 'sofa', propAt: [540, 1120], at: [540, 960], mood: 'sleepy', still: true, sayAt: [540, 640] },
  last: 'Can’t go out? *Call* and stay in together.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
