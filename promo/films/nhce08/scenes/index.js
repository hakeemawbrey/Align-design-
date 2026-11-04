// nhce08: HOT TAKE, COLD TAKE, "The Winter Playlist" (14 s vertical star_advice trial reel, music: lofi · Em).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #8.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce08',
  hook: 'They made you | a *winter playlist.*',
  hot: { sign: 'libra', take: 'Make one back. *Nine hours* long.', say: 'vol. 1 of 6.', prop: 'phone', text: ['>WINTER VOL. 1 (9 hrs)', '>VOL. 2 (9 hrs)', '>VOL. 3 loading…'], propOpts: { title: 'playlists' }, propAt: [770, 880] },
  cold: { sign: 'cancer', take: 'Listen once. Reply *“nice.”*', say: 'nice.', prop: 'phone', text: ['made you a winter playlist!', '>nice.'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'neutral' },
  last: 'Tell them which song you *replayed.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
