// nhce06: HOT TAKE, COLD TAKE, "Two Weeks Apart" (14 s vertical star_advice trial reel, music: funk · E).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #6.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce06',
  hook: 'They’re going home | *for two weeks.*',
  hot: { sign: 'cancer', take: 'Pack a bag. Go *with* them.', say: 'I packed snacks for two!', prop: 'suitcase', propAt: [760, 1000] },
  cold: { sign: 'sagittarius', take: 'Two weeks, zero texts. *Freedom!*', say: 'off the grid!', prop: 'phone', text: [], propOpts: { title: 'phone', status: 'off until jan' }, propAt: [770, 880], mood: 'happy' },
  last: 'Pick a *call time.* Then enjoy your people.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
