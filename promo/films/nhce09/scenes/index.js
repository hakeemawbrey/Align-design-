// nhce09: HOT TAKE, COLD TAKE, "Drew Your Crush" (14 s vertical star_advice trial reel, music: jazzy · C).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #9.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce09',
  hook: 'Gift exchange: | you drew *your crush.*',
  hot: { sign: 'scorpio', take: 'Spend the *whole* month’s budget.', say: 'I hand-knit your portrait.', prop: 'frame', propOpts: { portrait: 'taurus' }, propAt: [760, 880], mood: 'heart' },
  cold: { sign: 'aries', take: 'Gift a pen. Stay *mysterious.*', say: 'it’s a pen. enjoy.', prop: 'pen', propAt: [740, 880], mood: 'squint' },
  last: 'Get the thing they *mentioned* once.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
